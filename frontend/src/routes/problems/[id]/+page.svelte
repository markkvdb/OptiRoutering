<script lang="ts">
	import type { Directions } from '@routingjs/core';
	import type { ValhallaRouteResponse } from '@routingjs/valhalla';
	import { Valhalla } from '@routingjs/valhalla';
	import type { GeoJSON } from 'svelte-leafletjs';
	import type { PageData } from './$types';
	import Map from './Map.svelte';

	export let data: PageData;

	let solution: number[] | undefined = undefined;
	let optimalPath: Directions<ValhallaRouteResponse, ValhallaRouteResponse> | undefined;

	async function solveProblem(event: { currentTarget: EventTarget & HTMLFormElement }) {
		const data = new FormData(event.currentTarget);

		const response = await fetch(event.currentTarget.action, {
			method: 'POST',
			body: data
		});

		const result = await response.json();

		if (result.type === 'success') {
			// rerun all `load` functions, following the successful update
			await invalidateAll();
		}
	}

	const solveProblem = async () => {
		const response = await fetch(`/problems/${data.routing_problem.id}/solve`, {
			method: 'POST'
		});

		if (!response.ok) {
			alert('Something went wrong: ' + response.error());
			return;
		}

		// get optimal route
		solution = await response.json();

		// find directions
		const v = new Valhalla({
			userAgent: null
		});
		v.directions(
			[
				[
					data.routing_problem.problem.depot.coordinates.lat,
					data.routing_problem.problem.depot.coordinates.lng
				],
				...solution.map(
					(customer_id) =>
						[
							data.routing_problem.problem.customers[customer_id - 1].location.coordinates.lat,
							data.routing_problem.problem.customers[customer_id - 1].location.coordinates.lng
						] as GeoJSON.Position
				),
				[
					data.routing_problem.problem.depot.coordinates.lat,
					data.routing_problem.problem.depot.coordinates.lng
				]
			],
			'auto'
		).then((response) => {
			optimalPath = response;
			console.log(optimalPath);
		});
	};
</script>

{#if data.routing_problem}
	<Map problemData={data.routing_problem.problem} {optimalPath} />

	<br />

	<button on:click={() => solveProblem()}>Solve</button>

	{#if solution}
		<h3>Optimal route</h3>

		{#if optimalPath?.raw.trip}
			<p>
				Total distance: {Math.round(optimalPath.raw.trip.summary.length)} km
				<br />
				Total time: {Math.round(optimalPath.raw.trip.summary.time / 60)} minutes
			</p>
		{/if}

		<ul>
			{#each solution as customer_id}
				{#if data.routing_problem.problem.customers[customer_id - 1]}
					<li>{data.routing_problem.problem.customers[customer_id - 1]?.name}</li>
				{/if}
			{/each}
		</ul>
	{/if}
{:else}
	Loading...
{/if}
