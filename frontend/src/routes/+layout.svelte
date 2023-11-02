<script>
	import { page } from '$app/stores';
	import { signOut } from '@auth/sveltekit/client';
</script>

<h1>OptiRoutering</h1>

<p>
	{#if $page.data.session}
		{#if $page.data.session.user?.image}
			<span style="background-image: url('{$page.data.session.user.image}')" class="avatar" />
		{/if}
		<span class="signedInText">
			<small>Signed in as</small><br />
			<strong>{$page.data.session.user?.name ?? 'Anonymous'}</strong>
		</span>
		<button on:click={() => signOut()} class="button">Sign out</button>
	{:else}
		<span class="notSignedInText">You are not signed in</span>
		<a href="/auth/signin"><button type="button">Sign in</button></a>
	{/if}
</p>

<!-- menu if logged in -->

{#if $page.data.session}
	<nav>
		<a href="/">Home</a>
		<a href="/problems">Problems</a>
		<a href="/me">Profile</a>
	</nav>
{/if}

<slot />
