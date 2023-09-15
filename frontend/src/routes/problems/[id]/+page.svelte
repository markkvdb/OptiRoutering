<script lang="ts">
	export let data;
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
{:else}
	Loading...
{/if}
