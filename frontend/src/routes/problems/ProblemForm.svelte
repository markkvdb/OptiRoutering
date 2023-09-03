<script lang="ts">
	import { geolocate } from '$lib/geolocating';
	import type { RouteDefinition } from '$lib/interfaces';
	import CustomerInput from './CustomerInput.svelte';

	export let route_definition: RouteDefinition;

	const addCustomer = () => {
		route_definition.customers = [
			...route_definition.customers,
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
		];
	};
	const syncCustomers = () => {
		route_definition.customers = [...route_definition.customers];
	};
	async function findCoordinates(event: FocusEvent) {
		const element = event.currentTarget as HTMLInputElement;
		let address = element.value;

		if (address == '' || address == null) {
			route_definition.depot.coordinates = null;
		} else {
			route_definition.depot.coordinates = await geolocate(address);
		}
		syncCustomers();
	}
</script>

<form>
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
		<input
			type="text"
			name="start"
			required
			bind:value={route_definition.depot.address}
			on:focusout={findCoordinates}
		/>

		{#if route_definition.depot.coordinates == null}
			❌
		{:else if route_definition.depot.coordinates != undefined}
			✅
		{/if}
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
</form>
