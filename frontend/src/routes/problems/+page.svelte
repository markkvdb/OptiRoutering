<script lang="ts">
	import { goto } from '$app/navigation';
	import type { PageServerData } from './$types';

	export let data: PageServerData;

	function openPage(event: Event) {
		const element = event.currentTarget as HTMLSelectElement;
		const index = element.value;

		if (index == '') return;

		goto(`/problems/${index}`);
	}
</script>

<h2 class="text-lg font-bold my-3">Problems</h2>

{#if data.route_definitions === undefined || data.route_definitions.length == 0}
	<div class="alert">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			class="stroke-info shrink-0 w-6 h-6"
			><path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
			/></svg
		>
		<span>No route problems found. Get started by creating a new one.</span>
	</div>
{:else}
	<select on:change={openPage} class="select select-bordered w-full max-w-xs">
		<option value="" disabled selected>Select a route definition</option>
		{#each data.route_definitions as route_definition}
			<option value={route_definition.id}>{route_definition.problem.depot.address}</option>
		{/each}
	</select>
{/if}

<a href="/problems/new"><button class="btn btn-primary my-2">New</button></a>
