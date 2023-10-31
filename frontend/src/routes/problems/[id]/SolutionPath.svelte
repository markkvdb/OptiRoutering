<script lang="ts">
	import { browser } from '$app/environment';
	import type { Directions } from '@routingjs/core';
	import type { ValhallaRouteResponse } from '@routingjs/valhalla';

	const svelteLeafletJS = browser ? import('svelte-leafletjs') : new Promise(() => {});

	export let optimalPath: Directions<ValhallaRouteResponse, ValhallaRouteResponse>;
</script>

{#await svelteLeafletJS}
	<p>Loading...</p>
{:then Leaflet}
	{#each optimalPath.directions as directions}
		<Leaflet.GeoJSON data={directions.feature} />
	{/each}
{:catch error}
	<p>Something went wrong: {error.message}</p>
{/await}
