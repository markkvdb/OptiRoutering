<script lang="ts">
	import type { Customer } from '$lib/interfaces';

	export let customer: Customer;
	export let capacited: boolean = false;
	export let time_window: boolean = false;
</script>

<label>
	Name:
	<input type="text" name="customer" required bind:value={customer.name} />
</label>
<label>
	Address:
	<input type="text" name="address" required bind:value={customer.address} />
</label>
{#if capacited}
	<label>
		Demand:
		<input type="number" name="demand" required bind:value={customer.demand} />
	</label>
{/if}
{#if time_window}
	<label>
		Earliest time:
		<input type="time" name="earliest_time" required bind:value={customer.earliest_time} />
	</label>
	<label>
		Latest time:
		<input type="time" name="latest_time" required bind:value={customer.latest_time} />
	</label>
{/if}
