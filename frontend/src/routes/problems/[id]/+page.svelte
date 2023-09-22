<script lang="ts">
	import type { PageData } from './$types';
	import Map from './Map.svelte';

	export let data: PageData;

	let solution: number[] | undefined = undefined;

	const solveProblem = async () => {
		const response = await fetch(`/problems/${data.route_definition.id}/solve`, {
			method: 'POST'
		});

		if (response.ok) {
			solution = await response.json();
		} else {
			alert('Something went wrong: ' + response.error);
		}
	};
</script>

{#if data.route_definition}
	<h2>{data.route_definition.depot.address}</h2>

	<Map route_definition={data.route_definition} {solution} />

	<br />

	<button on:click={() => solveProblem()}>Solve</button>

	{#if solution}
		<h3>Optimal route</h3>

		<ul>
			{#each solution as customer_id}
				<li>{data.route_definition.customers[customer_id - 1].name}</li>
			{/each}
		</ul>
	{/if}
{:else}
	Loading...
{/if}
