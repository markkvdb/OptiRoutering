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

<h2>Update user</h2>

<form method="POST" use:enhance>
	<label>
		Name<br />
		<input
			name="name"
			aria-invalid={$errors.name ? 'true' : undefined}
			bind:value={$form.name}
			{...$constraints.name}
		/>
		{#if $errors.name}<span class="invalid">{$errors.name}</span>{/if}
	</label>

	<button>Submit</button>
	{#if $delayed}Working...{/if}
</form>

<style>
	.invalid {
		color: red;
	}
</style>
