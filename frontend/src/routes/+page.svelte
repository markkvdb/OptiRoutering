<script lang="ts">
	import type { Customer } from '$lib/interfaces';
	import CustomerInput from './CustomerInput.svelte';

	let depot: string = '';
	let customers: Customer[] = [
		{
			name: '',
			address: '',
			location: null,
			demand: undefined,
			earliest_time: undefined,
			latest_time: undefined
		}
	];
	let capacited: boolean = false;
	let time_window: boolean = false;
	let max_capacity: number | null = null;

	const solve = () => {};
	const addCustomer = () => {
		customers = [
			...customers,
			{
				name: '',
				address: '',
				location: null,
				demand: undefined,
				earliest_time: undefined,
				latest_time: undefined
			}
		];
	};
</script>

<h1>OptiRoutering</h1>

<p>
	OptiRoutering is a tool to solve vehicle routing problems (VRPs). VRPs aim to find the best routes
	for a fleet of vehicles to serve a set of customers. The routes are subject to constraints such as
	the capacity of the vehicles and the time windows of the customers.
</p>

<h2>Define problem</h2>

<form on:submit|preventDefault={solve}>
	<!-- define select options for capacited and time window constraints -->
	<label>
		Capacited:
		<input type="checkbox" id="capacited" name="capacited" bind:checked={capacited} />
	</label>

	<br />

	<label>
		Time window:
		<input type="checkbox" id="time_window" name="time_window" bind:checked={time_window} />
	</label>

	<br />

	{#if capacited}
		<!-- define maximum capacity -->
		<label>
			Maximum capacity:
			<input type="number" name="max_capacity" required bind:value={max_capacity} />
		</label>

		<br />
	{/if}

	<label>
		Start address:
		<input type="text" name="start" required bind:value={depot} />
	</label>

	<br />

	Customers:
	<br />

	{#each customers as customer, i}
		<CustomerInput {customer} {capacited} {time_window} />
		<br />
	{/each}

	<button type="button" on:click={addCustomer}>Add customer</button>

	<br />

	<button type="submit">Solve</button>
</form>

<h2>Result</h2>

<p>
	{JSON.stringify({ depot, customers, capacited, time_window, max_capacity })}
</p>
