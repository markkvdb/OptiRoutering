<script lang="ts">
	import { createServerClient } from '$lib/api';
	import Map from './Map.svelte';

	export let data;

	let solution: number[] | undefined = undefined;

	const solveProblem = async () => {
		const client = createServerClient(fetch);

		const response = await client.POST('/routes/{id}/solve', {
			params: { path: { id: data.route_definition.id } }
		});

		if (response.data) {
			solution = response.data;
		} else {
			alert('Something went wrong: ' + response.error);
		}
	};
</script>

{#if data.route_definition}
	<h2>{data.route_definition.depot.address}</h2>

	<h3>Depot</h3>

	<p>Address: {data.route_definition.depot.address}</p>

	<h3>Customers</h3>

	{#each data.route_definition.customers as customer}
		<h4>{customer.name}</h4>
		<p>Address: {customer.location.address}</p>
	{/each}

	<br />

	<button on:click={() => solveProblem()}>Solve</button>

	<Map route_definition={data.route_definition} {solution} />

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
