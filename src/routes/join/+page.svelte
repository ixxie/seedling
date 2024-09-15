<script lang="ts">
	import { enhance } from '$app/forms';

	import type { ActionData } from './$types';

	export let form: ActionData;
</script>

<h1>Sign up</h1>
<form method="post" use:enhance>
	<label>
		<span>Username</span>
		<input name="username" id="username" />
	</label>
	<label>
		<span>Email</span>
		<input type="email" name="email" id="email" />
	</label>
	<label>
		<span>Password</span>
		<input type="password" name="password" id="password" />
	</label>
	<div class="row">
		{#if form?.message}
			<span>{form.message}</span>
		{:else}
			<span>Already have an account? <a href="/login">Sign in</a></span>
		{/if}
		<button>Sign up</button>
	</div>
</form>
