<script lang="ts">
	import type { RouteDefinition } from '$lib/api/models/routes';
	import { Valhalla } from '@routingjs/valhalla';
	import { GeoJSON } from 'svelte-leafletjs';

	export let solution: number[] | undefined;
	export let route_definition: RouteDefinition;

	const path_geojson: GeoJSON.FeatureCollection<GeoJSON.LineString> = {
		type: 'FeatureCollection',
		features: []
	};

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
			const features = response.directions.map((direction) => {
				return direction.feature;
			});
			console.log(features);
			path_geojson.features = features;
		});
	}
</script>

{#if solution}
	<GeoJSON data={path_geojson} />
{/if}
