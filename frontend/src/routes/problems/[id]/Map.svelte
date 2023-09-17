<script lang="ts">
	import type { RouteDefinition } from '$lib/api/models/routes';
	import type L from 'leaflet';
	import { onMount } from 'svelte';
	import { LeafletMap, Marker, TileLayer } from 'svelte-leafletjs';
	import SolutionPath from './SolutionPath.svelte';

	export let route_definition: RouteDefinition;
	export let solution: number[] | undefined = undefined;

	const mapOptions = {
		center: [route_definition.depot.coordinates.lat, route_definition.depot.coordinates.lng],
		zoom: 10
	};
	const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
	const tileLayerOptions = {
		minZoom: 0,
		maxZoom: 20,
		maxNativeZoom: 19,
		attribution: '© OpenStreetMap contributors'
	};

	let leafletMap: L.Map;

	onMount(() => {
		const locations = [
			[route_definition.depot.coordinates.lat, route_definition.depot.coordinates.lng],
			...route_definition.customers.map((customer) => [
				customer.location.coordinates.lat,
				customer.location.coordinates.lng
			])
		];
		leafletMap.fitBounds(locations);
	});
</script>

<div class="map">
	<LeafletMap bind:this={leafletMap} options={mapOptions}>
		<TileLayer url={tileUrl} options={tileLayerOptions} />

		{#if route_definition}
			{#if route_definition.depot.coordinates}
				<Marker
					latLng={[route_definition.depot.coordinates.lat, route_definition.depot.coordinates.lng]}
				/>
			{/if}

			{#each route_definition.customers as customer}
				{#if customer.location.coordinates}
					<Marker latLng={[customer.location.coordinates.lat, customer.location.coordinates.lng]} />
				{/if}
			{/each}
		{/if}

		{#if solution}
			<SolutionPath {solution} {route_definition} />
		{/if}
	</LeafletMap>
</div>

<link
	rel="stylesheet"
	href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
	integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
	crossorigin=""
/>

<style>
	.map {
		height: 500px;
		width: 80%;
		align: center;
	}
</style>
