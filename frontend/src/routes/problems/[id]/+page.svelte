<script lang="ts">
	import { createServerClient } from '$lib/api';
	import type L from 'leaflet';
	import { LeafletMap, Marker, TileLayer } from 'svelte-leafletjs';

	export let data;

	let solution: number[] | undefined = undefined;

	const solveProblem = async () => {
		const client = createServerClient(fetch);

		const response = await client.POST('/routes/{id}/solve', {
			params: { path: { id: data.route_definition.id } }
		});

		if (response.data) {
			solution = response.data;
			console.log(solution);
		} else {
			alert('Something went wrong: ' + response.error);
		}
	};

	const mapOptions = {
		center: [1.364917, 103.822872],
		zoom: 11
	};
	const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
	const tileLayerOptions = {
		minZoom: 0,
		maxZoom: 20,
		maxNativeZoom: 19,
		attribution: '© OpenStreetMap contributors'
	};

	let leafletMap: L.Map | undefined = undefined;

	function setBounding(data) {
		if (!data.route_definition) return;
		if (!leafletMap) return;

		let coordinates = [];
		data.route_definition.customers.forEach((customer) => {
			coordinates.push([customer.location.coordinates.lat, customer.location.coordinates.lng]);
		});
		coordinates.push([
			data.route_definition.depot.coordinates.lat,
			data.route_definition.depot.coordinates.lng
		]);

		console.log(coordinates);
		console.log(leafletMap);
		leafletMap.fitBounds(coordinates);
	}

	$: setBounding(data);
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

	<br />

	<button on:click={() => solveProblem()}>Solve</button>

	{#if solution}
		<h3>Optimal route</h3>

		<ul>
			{#each solution as customer_id}
				<li>{data.route_definition.customers[customer_id - 1].name}</li>
			{/each}
		</ul>
	{/if}
{:else}
	Loading...
{/if}

<button on:click={() => setBounding(data)}>Back</button>

<div class="map">
	<LeafletMap bind:this={leafletMap} options={mapOptions}>
		<TileLayer url={tileUrl} options={tileLayerOptions} />

		{#if data.route_definition}
			{#if data.route_definition.depot.coordinates}
				<Marker
					latLng={[
						data.route_definition.depot.coordinates.lat,
						data.route_definition.depot.coordinates.lng
					]}
				/>
			{/if}

			{#each data.route_definition.customers as customer}
				{#if customer.location.coordinates}
					<Marker latLng={[customer.location.coordinates.lat, customer.location.coordinates.lng]} />
				{/if}
			{/each}
		{/if}
	</LeafletMap>
</div>

<link
	rel="stylesheet"
	href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
	integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
	crossorigin=""
/>

<style>
	.map {
		height: 500px;
		width: 80%;
		align: center;
	}
</style>
