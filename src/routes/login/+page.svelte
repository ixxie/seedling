<script lang="ts">
	import { enhance } from '$app/forms';

	import type { ActionData } from './$types';

	export let form: ActionData;
</script>

<h1>Log in</h1>
<form method="post" use:enhance>
	<label>
		<span>Username</span>
		<input name="username" id="username" />
	</label>
	<label>
		<span>Password</span>
		<input type="password" name="password" id="password" />
	</label>
	<div class="row">
		{#if form?.message}
			<span>{form.message}</span>
		{:else}
			<span>Don't have an account? <a href="/join">Create one!</a></span>
		{/if}
		<button>Continue</button>
	</div>
</form>
