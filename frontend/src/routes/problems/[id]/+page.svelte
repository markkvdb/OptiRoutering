<script lang="ts">
	import { enhance } from '$app/forms';
	import type { Directions } from '@routingjs/core';
	import type { ValhallaRouteResponse } from '@routingjs/valhalla';
	import { Valhalla } from '@routingjs/valhalla';
	import type { GeoJSON } from 'svelte-leafletjs';
	import type { ActionData, PageData } from './$types';
	import Map from './Map.svelte';

	export let data: PageData;
	export let form: ActionData;

	// get user location from geolocation API
	let userLocation: GeoJSON.Position | undefined;

	$: {
		if (form && form.solution) {
			// find directions
			const v = new Valhalla({
				userAgent: null
			});
			v.directions(
				[
					[
						data.routing_problem.problem.depot.coordinates.lat,
						data.routing_problem.problem.depot.coordinates.lng
					],
					...form.solution.map(
						(customer_id) =>
							[
								data.routing_problem.problem.customers[customer_id - 1].location.coordinates.lat,
								data.routing_problem.problem.customers[customer_id - 1].location.coordinates.lng
							] as GeoJSON.Position
					),
					[
						data.routing_problem.problem.depot.coordinates.lat,
						data.routing_problem.problem.depot.coordinates.lng
					]
				],
				'auto'
			).then((response) => {
				optimalPath = response;
			});
		}
	}
	let optimalPath: Directions<ValhallaRouteResponse, ValhallaRouteResponse> | undefined;
</script>

{#if data.routing_problem}
	<Map problemData={data.routing_problem.problem} {optimalPath} />

	<br />

	<form method="POST" action="?/solve" use:enhance>
		<button type="submit" class="btn btn-primary">Solve</button>
	</form>

	{#if form && optimalPath}
		<div class="mt-4">
			<h3 class="text-lg font-medium">Optimal route</h3>

			{#if optimalPath?.raw.trip}
				<div class="stats shadow my-4">
					<div class="stat">
						<div class="stat-title">Total distance</div>
						<div class="stat-value text-primary">
							{Math.round(optimalPath.raw.trip.summary.length)} km
						</div>
					</div>

					<div class="stat">
						<div class="stat-title">Total time</div>
						<div class="stat-value text-primary">
							{Math.round(optimalPath.raw.trip.summary.time / 60)} minutes
						</div>
					</div>
				</div>
			{/if}

			<div class="overflow-x-auto mb-4">
				<table class="table">
					<!-- head -->
					<thead>
						<tr>
							<th>Stop</th>
							<th>Name</th>
							<th>Address</th>
						</tr>
					</thead>

					<tbody>
						<!-- row 1 -->
						{#each form.solution as customer_id, i}
							{#if data.routing_problem.problem.customers[customer_id - 1]}
								<tr>
									<th>{i + 1}</th>
									<td>{data.routing_problem.problem.customers[customer_id - 1]?.name}</td>
									<td
										>{data.routing_problem.problem.customers[customer_id - 1]?.location.address}</td
									>
								</tr>
							{/if}
						{/each}
					</tbody>
				</table>
			</div>
		</div>
	{/if}
{:else}
	Loading...
{/if}
