<script lang="ts">
	import { page } from '$app/stores';
	import { geolocate } from '$lib/geolocating';
	import { superForm } from 'sveltekit-superforms/client';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	const { form, errors, constraints, enhance, delayed, message } = superForm(data.form, {
		dataType: 'json'
	});

	console.log($errors);

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

<h2>Create route problem</h2>

<SuperDebug data={$form} /><br />
<SuperDebug data={$errors} /><br />

<form method="POST" use:enhance>
	<label>
		Start address:
		<input
			type="text"
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
		{:else}
			❌
		{/if}
	</label>

	{#each $form.customers as _, i}
		<div>
			Name
			<input
				type="text"
				data-invalid={$errors.customers?.[i]?.name}
				bind:value={$form.customers[i].name}
			/>
			Address
			<input
				type="text"
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
			{:else}
				❌
			{/if}
			<br />
		</div>
	{/each}

	<button>Submit</button>
	{#if $delayed}Working...{/if}
</form>

<style>
	.invalid {
		color: red;
	}
</style>
