<script lang="ts">
	export let data;

	function openPage(event: Event) {
		const element = event.currentTarget as HTMLSelectElement;
		const index = element.value;

		if (index == '') return;

		window.location.href = `/problems/` + index;
	}
</script>

<h2>Select definition</h2>

<!-- select existing route definition or create new one -->
Select an existing route or create a new one:

{#if data.route_definitions === undefined || data.route_definitions.length == 0}
	<p>No route definitions found.</p>
{:else}
	<select on:change={openPage}>
		<option value="" selected>Select a route definition</option>
		{#each data.route_definitions as route_definition, i}
			<option value={i}>{route_definition.depot.address}</option>
		{/each}
	</select>
{/if}

<a href="/problems/new"><button>New</button></a>
