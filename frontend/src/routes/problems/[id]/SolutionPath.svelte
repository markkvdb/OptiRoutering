<script lang="ts">
	import type { Directions } from '@routingjs/core';
	import type { ValhallaRouteResponse } from '@routingjs/valhalla';
	import { GeoJSON } from 'svelte-leafletjs';

	export let optimal_path: Directions<ValhallaRouteResponse, ValhallaRouteResponse>;
</script>

{#each optimal_path.directions as directions}
	<GeoJSON data={directions.feature} />
{/each}
