<script lang="ts">
	import { enhance } from '$app/forms';
	import type { Directions } from '@routingjs/core';
	import type { ValhallaRouteResponse } from '@routingjs/valhalla';
	import { Valhalla } from '@routingjs/valhalla';
	import type { GeoJSON } from 'svelte-leafletjs';
	import type { ActionData, PageData } from './$types';
	import Map from './Map.svelte';

	export let data: PageData;
	export let form: ActionData;

	$: {
		if (form && form.solution) {
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
					...form.solution.map(
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
			});
		}
	}
	let optimalPath: Directions<ValhallaRouteResponse, ValhallaRouteResponse> | undefined;
</script>

{#if data.routing_problem}
	<Map problemData={data.routing_problem.problem} {optimalPath} />

	<br />

	<form method="POST" action="?/solve" use:enhance>
		<button type="submit">Solve</button>
	</form>

	{#if form && optimalPath}
		<h3>Optimal route</h3>

		{#if optimalPath?.raw.trip}
			<p>
				Total distance: {Math.round(optimalPath.raw.trip.summary.length)} km
				<br />
				Total time: {Math.round(optimalPath.raw.trip.summary.time / 60)} minutes
			</p>
		{/if}

		<ul>
			{#each form.solution as customer_id}
				{#if data.routing_problem.problem.customers[customer_id - 1]}
					<li>{data.routing_problem.problem.customers[customer_id - 1]?.name}</li>
				{/if}
			{/each}
		</ul>
	{/if}
{:else}
	Loading...
{/if}
