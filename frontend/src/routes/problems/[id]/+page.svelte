<script lang="ts">
	export let data;
</script>

<h2>{data.route_definition}</h2>

<h3>Depot</h3>

<p>Address: {data.route_definition.depot.address}</p>
<p>Coordinates: {data.route_definition.depot.coordinates}</p>

<h3>Customers</h3>

{#each data.route_definition.customers as customer}
	<p>Address: {customer.location.address}</p>
	<p>Coordinates: {customer.location.coordinates}</p>
{/each}
