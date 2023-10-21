<script lang="ts">
	import type { ProblemData } from '$lib/server/schema';
	import type { Directions } from '@routingjs/core';
	import type { ValhallaRouteResponse } from '@routingjs/valhalla';
	import type { LatLngTuple } from 'leaflet';
	import { onMount } from 'svelte';
	import { LeafletMap, Marker, Popup, TileLayer, Tooltip } from 'svelte-leafletjs';
	import SolutionPath from './SolutionPath.svelte';

	export let problemData: ProblemData;
	export let optimalPath: Directions<ValhallaRouteResponse, ValhallaRouteResponse> | undefined;

	const mapOptions = {
		center: [problemData.depot.coordinates.lat, problemData.depot.coordinates.lng],
		zoom: 10
	};
	const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
	const tileLayerOptions = {
		minZoom: 0,
		maxZoom: 20,
		maxNativeZoom: 19,
		attribution: '© OpenStreetMap contributors'
	};

	let leafletMap: LeafletMap;

	onMount(() => {
		const locations: LatLngTuple[] = [
			[problemData.depot.coordinates.lat, problemData.depot.coordinates.lng],
			...problemData.customers.map<[number, number]>((customer) => [
				customer.location.coordinates.lat,
				customer.location.coordinates.lng
			])
		];

		let map: L.Map = leafletMap.getMap();

		map.fitBounds(locations);
		map.addOneTimeEventListener('zoomend', function () {
			map.setMaxBounds(map.getBounds());
			map.options.minZoom = map.getZoom();
		});
	});
</script>

<div class="map">
	<LeafletMap bind:this={leafletMap} options={mapOptions}>
		<TileLayer url={tileUrl} options={tileLayerOptions} />

		{#if problemData}
			{#if problemData.depot.coordinates}
				<Marker latLng={[problemData.depot.coordinates.lat, problemData.depot.coordinates.lng]} />
			{/if}

			{#each problemData.customers as customer}
				{#if customer.location.coordinates}
					<Marker latLng={[customer.location.coordinates.lat, customer.location.coordinates.lng]}>
						<Popup>{customer.name} - {customer.location.address}</Popup>
						<Tooltip>{customer.name}</Tooltip>
					</Marker>
				{/if}
			{/each}
		{/if}

		{#if optimalPath}
			<SolutionPath {optimalPath} />
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
	}
</style>
