<script lang="ts">
	export let data;

	function openPage(event: Event) {
		const element = event.currentTarget as HTMLSelectElement;
		const index = element.value;

		if (index == 'new') {
			window.location.href = '/problems/new';
		} else {
			window.location.href = `/problems/` + index;
		}
	}
</script>

<h2>Select definition</h2>

<!-- select existing route definition or create new one -->
<select on:change={openPage}>
	<option value="new">Create new route definition</option>
	{#each data.route_definitions as route_definition, i}
		<option value={i}>{route_definition.depot.address}</option>
	{/each}
</select>
