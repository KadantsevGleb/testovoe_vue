<template>
	<div class="main">
		<h1 class="main__title">Редактирование заметки</h1>
		<div class="main__content content">
			<UIMyInput placeholder="Новая заметка" v-model="noteToChange.title" class="content__title" />
			<div class="content__todos">
				<div v-for="todo in noteToChange.todos" class="content__todo" :key="todo.id">
					<input type="checkbox" v-model="todo.checked">
					<UIMyInput placeholder="Введите текст задачи" type="text" v-model="todo.content" />
					<button @click="deleteTodo(todo.id)">Удалить</button>
				</div>
			</div>
		</div>
		<div class="main__btns">
			<div class="main__left-btns">
				<UIMyButton color="brown" v-if="snapshot.length > 0" @click="cancelChange">Отменить изменение</UIMyButton>
				<UIMyButton color="#ea4335" v-if="redoStack.length > 0" @click="redoChange">Повторить изменение</UIMyButton>
				<UIMyButton color="crimson" @click="confirmCancel = true">Отменить редактирование</UIMyButton>
				<UIMyButton color="red" @click="confirmDelete = true">Удалить</UIMyButton>
				<UIMyButton color="mediumseagreen" @click="saveChanges">Сохранить изменения</UIMyButton>
			</div>
			<UIMyButton color="dodgerblue" @click="addTodo" class="main__right-btns">Добавить todo</UIMyButton>
		</div>
	</div>

	<Modal v-model:show="confirmCancel">
		<div class="modal">
			<p class="modal__text">Вы уверены, что хотите выйти?</p>
			<div class="modal__btns">
				<UIMyButton @click="cancelEdit" color="red" class="modal__confirm">Выйти</UIMyButton>
				<UIMyButton @click="confirmCancel = false" color="mediumseagreen" class="modal__decline">Отменить</UIMyButton>
			</div>
		</div>
	</Modal>

	<Modal v-model:show="confirmDelete">
		<div class="modal">
			<p class="modal__text">Вы уверены, что хотите удалить заметку?</p>
			<div class="modal__btns">
				<UIMyButton @click="deleteNote" color="red" class="modal__confirm">Удалить</UIMyButton>
				<UIMyButton @click="confirmDelete = false" color="mediumseagreen" class="modal__decline">Отменить</UIMyButton>
			</div>
		</div>
	</Modal>
</template>

<script setup>
	import { useNote } from '../stores/note'


	const store = useNote()
	const route = useRoute()

	const originalNote = store.findNoteById(Number(route.params.id))
	const noteToChange = reactive(structuredClone(toRaw(originalNote)))
	const snapshot = ref([])
	const redoStack = ref([])
	const shouldSaveSnap = ref(true)

	const confirmCancel = ref(false)
	const confirmDelete = ref(false)


	const clonedNote = computed(() => JSON.parse(JSON.stringify(noteToChange)))


	const addTodo = function() {
		noteToChange.todos.unshift({
			checked: false,
			content: '',
			id: Date.now()
		})
	}

	const deleteTodo = function(id) {
		noteToChange.todos = noteToChange.todos.filter(todo => todo.id !== id)
	}

	const saveChanges = async function() {
		Object.assign(originalNote, JSON.parse(JSON.stringify(toRaw(noteToChange))))

		await navigateTo('/')
	}

	const cancelEdit = async function() {
		await navigateTo('/')
	}

	const deleteNote = async function() {
		store.deleteNote(Number(route.params.id))

		await navigateTo('/')
	}

	const cancelChange = function() {
		shouldSaveSnap.value = false

		redoStack.value.push(JSON.parse(JSON.stringify(toRaw(noteToChange))))
		Object.assign(noteToChange, snapshot.value.pop())

		nextTick(() => {
			shouldSaveSnap.value = true
		})
	}

	const redoChange = function() {
		shouldSaveSnap.value = false

		Object.assign(noteToChange, redoStack.value.pop())

		nextTick(() => {
			shouldSaveSnap.value = true
		})
	}


	watch(clonedNote, (newNote, oldNote) => {
		if (shouldSaveSnap.value) {
			if (snapshot.value.length >= 30) {
				snapshot.value.shift()
				snapshot.value.push(oldNote)
			} else {
				snapshot.value.push(oldNote)
			}
		}
	})
</script>

<style lang="scss" scoped>
	.main {
		max-width: 1000px;
		margin: 20px auto 0;
		&__title {
			margin-bottom: 12px;
			font-weight: 900;
		}
		&__content {
			margin-bottom: 30px;
		}
		&__btns {
			display: flex;
			align-items: center;
			justify-content: space-between;
			gap: 20px;
			flex-wrap: wrap;
		}
		&__left-btns {
			display: flex;
			align-items: center;
			gap: 10px;
			flex-wrap: wrap;
			max-width: 600px;
		}
		&__right-btns {
			align-self: start;
		}
	}

	.content {
		&__title {
			width: 100%;
			margin-bottom: 10px;
			font-size: 20px;
		}
		&__todos {
			display: flex;
			flex-direction: column;
			row-gap: 6px;
		}
		&__todo {
			display: flex;
			align-items: center;
			gap: 10px;
			& > input[type="text"] {
				flex: 1;
				font-size: 16px;
			}
			& > button {
				border: none;
				color: red;
				background: none;
				cursor: pointer;
			}
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
</style>