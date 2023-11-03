<script>
	import { page } from '$app/stores';
</script>

<div class="hero min-h-screen bg-base-200">
	<div class="hero-content text-center">
		<div class="max-w-md">
			<p class="py-6">
				OptiRoutering is a tool to solve vehicle routing problems (VRPs). VRPs aim to find the best
				routes for a fleet of vehicles to serve a set of customers. The routes are subject to
				constraints such as the capacity of the vehicles and the time windows of the customers.
			</p>
			{#if $page.data.session}
				<a href="/problems"><button class="btn btn-primary">Get Started</button></a>
			{:else}
				<a href="/auth/sigin"><button class="btn btn-primary">Get Started</button></a>
			{/if}
		</div>
	</div>
</div>
