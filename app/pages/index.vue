<template>
	<div class="main">
		<UIMyButton
			color="dodgerblue"
			style="font-size: 24px;"
			@click="createNote"
			class="main__create"
		>
			Создать новую заметку
		</UIMyButton>
		<p v-if="store.notes.length === 0" class="main__nonotes">Доска заметок пока пустая :(</p>
		<div class="main__notes">
			<div v-for="note in store.notes" :key="note.id" class="main__note note">
				<h2 class="note__title">{{ note.title }}</h2>
				<ul class="note__todos">
					<li v-for="todo in note.todos.slice(0, 2)" :key="todo.id" class="note__todo">{{ truncate(todo.content) }}</li>
				</ul>
				<div class="note__btns">
					<NuxtLink :to="{ name: 'id', params: { id: note.id } }">
						<UIMyButton color="lightslategray" class="note__edit">Редактировать</UIMyButton>
					</NuxtLink>
					<UIMyButton color="orangered" @click="confirmDelete(note.id)">Удалить</UIMyButton>
				</div>
			</div>
		</div>
	</div>

	<Modal v-model:show="showModal">
		<div class="modal">
			<p class="modal__text">Вы уверены, что хотите удалить эту заметку?</p>
			<div class="modal__btns">
				<UIMyButton @click="deleteNote" color="red" class="modal__confirm">Удалить</UIMyButton>
				<UIMyButton @click="showModal = false" color="mediumseagreen" class="modal__decline">Отменить</UIMyButton>
			</div>
		</div>
	</Modal>
</template>

<script setup>
	import { useNote } from '../stores/note'

	// data
	const store = useNote()
	const showModal = ref(false)
	let noteId = 0

	// computed

	// methods
	const createNote = function() {
		store.createNote()

		navigateTo({
			name: 'id',
			params: {
				id: store.index - 1
			}
		})
	}

	const confirmDelete = function(id) {
		noteId = id
		showModal.value = true
	}

	const deleteNote = function() {
		store.deleteNote(noteId)
		showModal.value = false
	}

	const truncate = function(text) {
		const wordsArr = text.split(' ')
		const wordsMaxAmount = 8

		if (wordsArr.length > wordsMaxAmount) {
			return wordsArr.slice(0, wordsMaxAmount).join(' ') + '...'
		}

		return text
	}
	// watch

</script>

<style lang="scss" scoped>
	.main {
		max-width: 1000px;
		margin: 20px auto;
		display: flex;
		flex-direction: column;
		row-gap: 30px;
		min-height: calc(100vh - 40px);
		&__create {
			font-weight: 900;
			align-self: flex-end;
		}
		&__notes {
			display: flex;
			align-items: flex-start;
			flex-wrap: wrap;
			gap: 20px;
			padding: 20px;
			background: lightsalmon;
			border-radius: 20px;
		}
		&__nonotes{
			color: darkred;
			font-size: 20px;
		}
	}

	.note {
		padding: 20px;
		border: 2px solid crimson;
		width: 280px;
		color: snow;
		border-radius: 10px;
		&__title {
			text-transform: capitalize;
		}
		&__todos {
			list-style-type: '— ';
			margin: 0 0 16px 14px;
		}
		&__todo {
			font-weight: 500;
		}
		&__btns {
			display: flex;
			justify-content: space-around;
		}
	}

	.modal {
		display: flex;
		flex-direction: column;
		gap: 20px;
		&__btns {
			display: flex;
			align-items: center;
			justify-content: center;
			gap: 10px;
		}
	}

	@media screen and (max-width: 1040px) {
		.main {
			padding: 0 20px;
		}
	}

	@media screen and (max-width: 960px) {
		.main {
			&__notes {
				justify-content: center;
			}
		}
	}
</style>