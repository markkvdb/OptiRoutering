<script lang="ts">
	import { page } from '$app/stores';
	import { geolocate } from '$lib/geolocating';
	import { superForm } from 'sveltekit-superforms/client';
	import type { PageData } from './$types';

	export let data: PageData;

	const { form, errors, constraints, enhance, delayed, message } = superForm(data.form, {
		dataType: 'json'
	});

	async function findCoordinates(event: FocusEvent) {
		const element = event.currentTarget as HTMLInputElement;
		let address = element.value;

		if (address == '' || address == null) {
			return null;
		} else {
			return await geolocate(address);
		}
	}
</script>

{#if $message}
	<h3 class:invalid={$page.status >= 400}>{$message}</h3>
{/if}

<h2 class="text-lg font-bold my-3">Create new problem</h2>

<form method="POST" class="w-full max-w-lg" use:enhance>
	<div class="border-b border-gray-900/10 pb-6">
		<h2 class="text-base font-semibold leading-7">Depot</h2>
		<div>
			<label class="label" for="start_address">
				<span class="label-text">Start address</span>
			</label>
			<input
				type="text"
				class="input input-bordered w-full max-w-xs"
				aria-invalid={$errors.depot?.address}
				bind:value={$form.depot.address}
				on:focusout={(e) =>
					findCoordinates(e).then((result) =>
						form.update(
							($form) => {
								$form.depot.coordinates = result;
								return $form;
							},
							{ taint: false }
						)
					)}
			/>

			<input
				type="hidden"
				aria-invalid={$errors.depot?.coordinates}
				bind:value={$form.depot.coordinates}
			/>
			{#if $form?.depot?.coordinates}
				✅
			{:else if $form?.depot?.address}
				❌
			{/if}
		</div>
	</div>

	<div class="border-b border-gray-900/10 pb-1">
		<h2 class="text-base font-semibold leading-7">Customers</h2>

		{#each $form.customers as _, i}
			<div class="flex flex-wrap -mx-3 mb-4">
				<div class="w-full md:w-1/2 px-3 mb-4 md:mb-0">
					<label class="label">
						<span class="label-text">Name</span>
					</label>
					<input
						type="text"
						class="input input-bordered w-full max-w-xs"
						data-invalid={$errors.customers?.[i]?.name}
						bind:value={$form.customers[i].name}
					/>
				</div>

				<div class="w-full md:w-1/2 px-3 mb-4 md:mb-0">
					<label class="label">
						<span class="label-text">Address</span>
					</label>
					<input
						type="text"
						class="input input-bordered w-full max-w-xs"
						data-invalid={$errors.customers?.[i]?.location?.address}
						bind:value={$form.customers[i].location.address}
						on:focusout={(e) =>
							findCoordinates(e).then((result) =>
								form.update(
									($form) => {
										$form.customers[i].location.coordinates = result;
										return $form;
									},
									{ taint: false }
								)
							)}
					/>
					{#if $form.customers[i].location.coordinates}
						✅
					{:else if $form.customers[i].location.address}
						❌
					{/if}
				</div>
			</div>
		{/each}
	</div>

	<!-- Add customer -->
	<button
		type="button"
		class="btn"
		on:click={() =>
			form.update(
				($form) => {
					$form.customers.push({ name: '', location: { address: '', coordinates: null } });
					return $form;
				},
				{ taint: false }
			)}
	>
		Add customer
	</button>

	<br />

	<button type="submit" class="btn btn-primary mt-4">Submit</button>
	{#if $delayed}Working...{/if}
</form>

<style>
	.invalid {
		color: red;
	}
</style>
