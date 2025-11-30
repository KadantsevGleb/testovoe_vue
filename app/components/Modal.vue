<template>
	<div class="modal" v-if="props.show" @click="hideModal">
		<div @click.stop class="modal__content">
			<div class="modal__close" @click="hideModal">x</div>
			<slot></slot>
		</div>
	</div>
</template>

<script setup>
	const props = defineProps({
		show: {
			type: Boolean,
			required: true,
			default: false
		},
	})

	const emit = defineEmits(['update:show'])

	const hideModal = () => {
		emit('update:show', false)
	}
</script>

<style lang="scss" scoped>
	.modal {
		position: absolute;
		z-index: 2;
		width: 100vw;
		height: 100vh;
		top: 0;
		left: 0;
		background: rgba(0, 0, 0, 0.6);
		display: flex;
		justify-content: center;
		align-items: center;
		&__content {
			background: #fff;
			padding: 20px;
			max-width: 900px;
			max-height: 80vh;
			border-radius: 10px;
			overflow-y: auto;
			display: flex;
			flex-direction: column;
		}
		&__close {
			align-self: flex-end;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 14px;
			height: 30px;
			width: 30px;
			margin-bottom: 20px;
			background: #000;
			color: #fff;
			border-radius: 50%;
			cursor: pointer;
		}
	}
</style>