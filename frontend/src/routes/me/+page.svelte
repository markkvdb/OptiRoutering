<script lang="ts">
	import { page } from '$app/stores';
	import { superForm } from 'sveltekit-superforms/client';
	import type { PageData } from './$types';

	export let data: PageData;

	const { form, errors, constraints, enhance, delayed, message } = superForm(data.form);
</script>

{#if $message}
	<h3 class:invalid={$page.status >= 400}>{$message}</h3>
{/if}

<h2 class="text-lg font-bold">Profile</h2>

<form method="POST" use:enhance>
	<div>
		<label class="label" for="name">
			<span class="label-text">Name</span>
		</label>
		<input
			name="name"
			class="input input-bordered w-full max-w-xs"
			aria-invalid={$errors.name ? 'true' : undefined}
			bind:value={$form.name}
			{...$constraints.name}
		/>
		{#if $errors.name}<span class="invalid">{$errors.name}</span>{/if}
	</div>

	<button class="btn btn-primary my-4">Submit</button>
	{#if $delayed}Working...{/if}
</form>

<style>
	.invalid {
		color: red;
	}
</style>
