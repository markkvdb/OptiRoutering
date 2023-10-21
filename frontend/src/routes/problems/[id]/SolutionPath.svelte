<script lang="ts">
	import type { Directions } from '@routingjs/core';
	import type { ValhallaRouteResponse } from '@routingjs/valhalla';
	import { GeoJSON } from 'svelte-leafletjs';

	export let optimalPath: Directions<ValhallaRouteResponse, ValhallaRouteResponse>;
</script>

{#each optimalPath.directions as directions}
	<GeoJSON data={directions.feature} />
{/each}
