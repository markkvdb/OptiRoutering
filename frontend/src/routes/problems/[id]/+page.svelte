<script lang="ts">
	import type { Directions } from '@routingjs/core';
	import type { ValhallaRouteResponse } from '@routingjs/valhalla';
	import { Valhalla } from '@routingjs/valhalla';
	import { GeoJSON } from 'svelte-leafletjs';
	import type { PageData } from './$types';
	import Map from './Map.svelte';

	export let data: PageData;

	let solution: number[] | undefined = undefined;
	let optimal_path: Directions<ValhallaRouteResponse, ValhallaRouteResponse> | undefined;

	const solveProblem = async () => {
		const response = await fetch(`/problems/${data.route_definition.id}/solve`, {
			method: 'POST'
		});

		if (!response.ok) {
			alert('Something went wrong: ' + response.error);
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
				[data.route_definition.depot.coordinates.lat, data.route_definition.depot.coordinates.lng],
				...solution.map(
					(customer_id) =>
						[
							data.route_definition.customers[customer_id - 1].location.coordinates.lat,
							data.route_definition.customers[customer_id - 1].location.coordinates.lng
						] as GeoJSON.Position
				),
				[data.route_definition.depot.coordinates.lat, data.route_definition.depot.coordinates.lng]
			],
			'auto'
		).then((response) => {
			optimal_path = response;
		});
	};
</script>

{#if data.route_definition}
	<h2>{data.route_definition.depot.address}</h2>

	<Map route_definition={data.route_definition} {optimal_path} />

	<br />

	<button on:click={() => solveProblem()}>Solve</button>

	{#if solution}
		<h3>Optimal route</h3>

		<ul>
			{#each solution as customer_id}
				{#if data.route_definition.customers[customer_id - 1]}
					<li>{data.route_definition.customers[customer_id - 1]?.name}</li>
				{/if}
			{/each}
		</ul>
	{/if}
{:else}
	Loading...
{/if}
