<script lang="ts">
	import type { RouteDefinition } from '$lib/interfaces';
	import ProblemForm from './ProblemForm.svelte';

	let route_definition: RouteDefinition = {
		depot: {
			address: '',
			coordinates: undefined
		},
		customers: [
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
		],
		maximum_capacity: null,
		time_windows: false
	};
</script>

<h2>Define problem</h2>

<ProblemForm bind:route_definition />
