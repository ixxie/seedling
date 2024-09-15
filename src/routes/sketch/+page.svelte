<script lang="ts">
	import { enhance } from '$app/forms';

	let files: FileList | undefined = $state();

	const photo = $derived(files ? URL.createObjectURL(files[0]) : undefined);

	const path = $derived(files ? `/svgs/${files[0].name}.svg` : undefined);

	$inspect(photo);
</script>

<h1>Sketch Experiment</h1>

<form method="post" use:enhance enctype="multipart/form-data">
	<div class="group">
		<label for="image"> Take your best shot</label>
		<input
			bind:files
			type="file"
			id="image"
			name="image"
			accept="image/*"
			capture="environment"
			required
		/>
	</div>
	{#if path}
		<i>Preview:</i>
		<img src={path} alt="upload preview" />
	{/if}
	<button type="submit">Submit</button>
</form>

<style>
	img {
		max-width: 100%;
	}
</style>
