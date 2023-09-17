<script lang="ts">
	import type { RouteDefinition } from '$lib/api/models/routes';
	import { GeoJSON } from 'svelte-leafletjs';

	export let solution: number[] | undefined;
	export let route_definition: RouteDefinition;

	const path_geojson: GeoJSON.FeatureCollection<GeoJSON.LineString> = {
		type: 'FeatureCollection',
		features: []
	};

	$: if (solution) {
		path_geojson.features = [
			{
				type: 'Feature',
				properties: {},
				geometry: {
					type: 'LineString',
					coordinates: [
						[route_definition.depot.coordinates.lng, route_definition.depot.coordinates.lat],
						...solution.map(
							(customer_id) =>
								[
									route_definition.customers[customer_id - 1].location.coordinates.lng,
									route_definition.customers[customer_id - 1].location.coordinates.lat
								] as GeoJSON.Position
						),
						[route_definition.depot.coordinates.lng, route_definition.depot.coordinates.lat]
					]
				}
			}
		];
	}
</script>

{#if solution}
	<GeoJSON data={path_geojson} />
{/if}
