<template>
	<input type="text" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" :placeholder="placeholder">
</template>

<script setup>
	const { placeholder } = defineProps({
		modelValue: {
  	  type: [String, Number],
  	  default: ''
  	},
		placeholder: {
			type: String,
			required: false,
		}
	})

	defineEmits(['update:modelValue'])
</script>

<style lang="scss" scoped>
	input {
		padding: 6px 12px;
		background: none;
		border: none;
		color: #fff;
		border-bottom: 2px solid #fff;
		&::placeholder {
			color: #fff;
		}
	}
</style>