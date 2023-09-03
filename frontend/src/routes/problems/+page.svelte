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

	const constructProblem = (e) => {
		// compute the distance matrix
	};

	$: result = JSON.stringify({
		...route_definition
	});
</script>

<h2>Define problem</h2>

<ProblemForm bind:route_definition />

<br />

<button type="submit" on:click|preventDefault={constructProblem}>Construct problem</button>

<h2>Result</h2>

<p>
	{result}
</p>
