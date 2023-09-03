<script lang="ts">
	import { geolocate } from '$lib/geolocating';
	import type { Customer } from '$lib/interfaces';

	export let customer: Customer;
	export let maximum_capacity: number | null;
	export let time_windows: boolean;
	export let syncCustomers: () => void;

	async function findCoordinates(event: FocusEvent) {
		const element = event.currentTarget as HTMLInputElement;
		let address = element.value;

		if (address == '' || address == null) {
			customer.location.coordinates = null;
		} else {
			customer.location.coordinates = await geolocate(address);
		}
		syncCustomers();
	}
</script>

<label>
	Name:
	<input
		type="text"
		name="name"
		value={customer.name}
		required
		on:change={(e) => {
			customer.name = e.currentTarget.value;
			syncCustomers();
		}}
	/>
</label>

<label>
	Address:
	<input
		type="text"
		name="address"
		value={customer.location.address}
		required
		on:change={(e) => {
			customer.location.address = e.currentTarget.value;
			syncCustomers();
		}}
		on:focusout={findCoordinates}
	/>

	{#if customer.location.coordinates == null}
		❌
	{:else if customer.location.coordinates != undefined}
		✅
	{/if}
</label>

{#if maximum_capacity}
	<label>
		Demand:
		<input
			type="number"
			name="demand"
			value={customer.demand}
			required
			on:change={(e) => {
				customer.demand = parseInt(e.currentTarget.value);
				syncCustomers();
			}}
		/>
	</label>
{/if}

{#if time_windows}
	<label>
		Earliest time:
		<input
			type="time"
			name="earliest_time"
			value={customer.earliest_time}
			required
			on:change={(e) => {
				customer.earliest_time = new Date(e.currentTarget.value);
				syncCustomers();
			}}
		/>
	</label>
	<label>
		Latest time:
		<input
			type="time"
			name="latest_time"
			value={customer.latest_time}
			required
			on:change={(e) => {
				customer.latest_time = new Date(e.currentTarget.value);
				syncCustomers();
			}}
		/>
	</label>
{/if}
