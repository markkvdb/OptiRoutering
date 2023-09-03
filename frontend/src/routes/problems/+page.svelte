<script lang="ts">
	import type { Customer } from '$lib/interfaces';
	import CustomerInput from './CustomerInput.svelte';

	let depot: string = '';
	let customers: Customer[] = [
		{
			address: '',
			location: undefined,
			demand: undefined,
			earliest_time: undefined,
			latest_time: undefined
		}
	];
	let capacitated: boolean = false;
	let time_window: boolean = false;
	let max_capacity: number | null = null;

	const solve = () => {};
	const addCustomer = () => {
		customers = [
			...customers,
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
		customers = [...customers];
	};

	$: result = JSON.stringify({ depot, customers, capacitated, time_window, max_capacity });
</script>

<h2>Define problem</h2>

<form on:submit|preventDefault={solve}>
	<label>
		Capacitated:
		<input type="checkbox" id="capacitated" name="capacitated" bind:checked={capacitated} />
	</label>

	<br />

	<label>
		Time window:
		<input type="checkbox" id="time_window" name="time_window" bind:checked={time_window} />
	</label>

	<br />

	{#if capacitated}
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

	{#each customers as customer}
		<CustomerInput {customer} {capacitated} {time_window} {syncCustomers} />
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
