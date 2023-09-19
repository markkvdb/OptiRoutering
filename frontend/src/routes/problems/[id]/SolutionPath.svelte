<script lang="ts">
	import type { RouteDefinition } from '$lib/api/models/routes';
	import type { Directions } from '@routingjs/core';
	import type { ValhallaRouteResponse } from '@routingjs/valhalla';
	import { Valhalla } from '@routingjs/valhalla';
	import { GeoJSON } from 'svelte-leafletjs';

	export let solution: number[] | undefined;
	export let route_definition: RouteDefinition;

	let optimal_path: Directions<ValhallaRouteResponse, ValhallaRouteResponse> | undefined;

	$: if (solution) {
		const v = new Valhalla({
			userAgent: null
		});
		v.directions(
			[
				[route_definition.depot.coordinates.lat, route_definition.depot.coordinates.lng],
				...solution.map(
					(customer_id) =>
						[
							route_definition.customers[customer_id - 1].location.coordinates.lat,
							route_definition.customers[customer_id - 1].location.coordinates.lng
						] as GeoJSON.Position
				),
				[route_definition.depot.coordinates.lat, route_definition.depot.coordinates.lng]
			],
			'auto'
		).then((response) => {
			optimal_path = response;
		});
	}
</script>

{#if optimal_path}
	{#each optimal_path.directions as directions}
		<GeoJSON data={directions.feature} />
	{/each}
{/if}
