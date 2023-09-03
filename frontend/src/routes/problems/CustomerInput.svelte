<script lang="ts">
	import { geolocate } from '$lib/geolocating';
	import type { Customer } from '$lib/interfaces';

	export let customer: Customer;
	export let maximum_capacity: number | null;
	export let time_windows: boolean;
	export let syncCustomers: () => void;

	async function findLocation(event: FocusEvent) {
		const element = event.currentTarget as HTMLInputElement;
		let address = element.value;

		if (address == '' || address == null) {
			customer.location = null;
		} else {
			customer.location = await geolocate(address);
		}
		syncCustomers();
	}
</script>

<label>
	Address:
	<input
		type="text"
		name="address"
		required
		on:change={(e) => {
			customer.address = e.currentTarget.value;
			syncCustomers();
		}}
		on:focusout={findLocation}
	/>

	{#if customer.location == null}
		❌
	{:else if customer.location != undefined}
		✅
	{/if}
</label>

{#if maximum_capacity}
	<label>
		Demand:
		<input
			type="number"
			name="demand"
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
			required
			on:change={(e) => {
				customer.latest_time = new Date(e.currentTarget.value);
				syncCustomers();
			}}
		/>
	</label>
{/if}
