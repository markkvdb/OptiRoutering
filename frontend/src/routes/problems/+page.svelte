<script lang="ts">
	import type { RouteDefinition } from '$lib/interfaces';
	import ProblemForm from './ProblemForm.svelte';

	export let data;
	let route_definition: RouteDefinition | undefined;

	$: result = JSON.stringify({
		...route_definition
	});

	function createEmptyRouteDefinition(): RouteDefinition {
		return {
			depot: {
				address: '',
				coordinates: undefined
			},
			customers: [
				{
					name: '',
					location: {
						address: '',
						coordinates: undefined
					},
					demand: undefined,
					earliest_time: undefined,
					latest_time: undefined
				}
			],
			maximum_capacity: null,
			time_windows: false
		};
	}
</script>

<h2>Define problem</h2>

<!-- select existing route definition or create new one -->
<select bind:value={route_definition}>
	<option value={createEmptyRouteDefinition()}>Create new route definition</option>
	{#each data.route_definitions as route_definition}
		<option value={route_definition}>{route_definition.depot.address}</option>
	{/each}
</select>

{#if route_definition}
	<ProblemForm bind:route_definition />
{/if}

<h2>Result</h2>

<p>
	{result}
</p>
