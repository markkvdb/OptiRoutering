<script lang="ts">
	import type { RouteDefinition } from '$lib/interfaces';
	import CustomerInput from './CustomerInput.svelte';

	let route_definition: RouteDefinition = {
		depot: {
			address: '',
			location: undefined
		},
		customers: [
			{
				address: '',
				location: undefined,
				demand: undefined,
				earliest_time: undefined,
				latest_time: undefined
			}
		],
		maximum_capacity: null,
		time_windows: false
	};

	const solve = () => {};
	const addCustomer = () => {
		route_definition.customers = [
			...route_definition.customers,
			{
				address: '',
				location: undefined,
				demand: undefined,
				earliest_time: undefined,
				latest_time: undefined
			}
		];
	};
	const syncCustomers = () => {
		route_definition.customers = [...route_definition.customers];
	};

	$: result = JSON.stringify({
		...route_definition
	});
</script>

<h2>Define problem</h2>

<form on:submit|preventDefault={solve}>
	<label>
		Maximum capacity:
		<input type="number" name="maximum_capacity" bind:value={route_definition.maximum_capacity} />
	</label>

	<br />

	<label>
		Time windows:
		<input
			type="checkbox"
			id="time_windows"
			name="time_window"
			bind:checked={route_definition.time_windows}
		/>
	</label>

	<br />

	<label>
		Start address:
		<input type="text" name="start" required bind:value={route_definition.depot.address} />
	</label>

	<br />

	Customers:
	<br />

	{#each route_definition.customers as customer}
		<CustomerInput
			{customer}
			{syncCustomers}
			maximum_capacity={route_definition.maximum_capacity}
			time_windows={route_definition.time_windows}
		/>
		<br />
	{/each}

	<button type="button" on:click={addCustomer}>Add customer</button>

	<br />

	<button type="submit">Solve</button>
</form>

<h2>Result</h2>

<p>
	{result}
</p>
