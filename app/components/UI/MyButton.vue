<template>
	<button :style="{background: color}">
		<slot></slot>
	</button>
</template>

<script setup>
	const { color } = defineProps({
		color: {
			type: String,
			required: true,
		}
	})
</script>

<style scoped>
	button {
		padding: 6px 12px;
		border: none;
		cursor: pointer;
		color: #fff;
		font-size: 16px;
		border-radius: 5px;
	}
</style>