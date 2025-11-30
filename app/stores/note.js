export const useNote = defineStore('note', () => {
  const notes = ref([])
  const index = ref(1)

  const createNote = function() {
    notes.value.unshift({
      title: 'Новая заметка',
      todos: [],
      id: index.value++
    })
  }

  const findNoteById = function(id) {
    return notes.value.find(note => note.id === id)
  }

  const deleteNote = function(id) {
    notes.value = notes.value.filter(note => note.id !== id)
  }

  return { notes, index, createNote, findNoteById, deleteNote }
}, {
    persist: {
      storage: piniaPluginPersistedstate.localStorage(),
      pick: ['notes', 'index']
    }
})