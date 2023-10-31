<script lang="ts">
	import { browser } from '$app/environment';
	import type { ProblemData } from '$lib/server/schema';
	import type { Directions } from '@routingjs/core';
	import type { ValhallaRouteResponse } from '@routingjs/valhalla';
	import type { LeafletMap } from 'svelte-leafletjs';
	import SolutionPath from './SolutionPath.svelte';

	const svelteLeafletJS = browser ? import('svelte-leafletjs') : new Promise(() => {});

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
</script>

<div class="map">
	{#await svelteLeafletJS}
		<p>Loading...</p>
	{:then Leaflet}
		<Leaflet.LeafletMap bind:this={leafletMap} options={mapOptions}>
			<Leaflet.TileLayer url={tileUrl} options={tileLayerOptions} />

			{#if problemData}
				{#if problemData.depot.coordinates}
					<Leaflet.Marker
						latLng={[problemData.depot.coordinates.lat, problemData.depot.coordinates.lng]}
					/>
				{/if}

				{#each problemData.customers as customer}
					{#if customer.location.coordinates}
						<Leaflet.Marker
							latLng={[customer.location.coordinates.lat, customer.location.coordinates.lng]}
						>
							<Leaflet.Popup>{customer.name} - {customer.location.address}</Leaflet.Popup>
							<Leaflet.Tooltip>{customer.name}</Leaflet.Tooltip>
						</Leaflet.Marker>
					{/if}
				{/each}
			{/if}

			{#if optimalPath}
				<SolutionPath {optimalPath} />
			{/if}
		</Leaflet.LeafletMap>
	{:catch error}
		<p>Something went wrong: {error.message}</p>
	{/await}
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
