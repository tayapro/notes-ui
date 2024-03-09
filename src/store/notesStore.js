import { defineStore } from 'pinia'
import { ref } from 'vue'
import idApi from '../../api/idApi.js'
import notesApi from '../../api/notesApi.js'

export const useStore = defineStore('notes', () => {
    const username = ref('')
    const notes = ref([])
    let accessToken = ''

    function isLoggedIn() {
        return username.value !== ''
    }

    function logout() {
        username.value = ''
        notes.value = []
    }

    async function signIn(uname, password) {
        notes.value = []
        const res = await idApi.login(uname, password)

        username.value = res.username
        accessToken = res.accessToken
        await getAllNotes(accessToken)
    }

    async function signUp(uname, password) {
        notes.value = []
        const res = await idApi.register(uname, password)

        username.value = res.username
        accessToken = res.accessToken
        await getAllNotes(accessToken)
    }

    async function getAllNotes() {
        const res = await notesApi.listNotes(accessToken)

        for (let n of res.notes) {
            notes.value.push(n)
        }
    }

    async function addNote(newNote) {
        const result = await notesApi.addNote(accessToken, newNote)
        if (result.status === 200) {
            notes.value.push(result.note)
        }
    }

    async function deleteNote(id) {
        await notesApi.deleteNote(accessToken, id)
        notes.value = notes.value.filter((data) => data.id !== id)
    }

    async function updateNote(id, updatedData) {
        const { note: serverNote } = await notesApi.updateNote(
            accessToken,
            id,
            updatedData
        )

        let vueNote = getNoteByID(id)
        vueNote.title = serverNote.title
        vueNote.text = serverNote.text
        vueNote.tags = serverNote.tags
        vueNote.updatedAt = serverNote.updatedAt
    }

    function getNoteByID(id) {
        for (let n of notes.value) {
            if (n.id === id) {
                return n
            }
        }
        return undefined
    }

    return {
        username,
        notes,
        isLoggedIn,
        logout,
        signIn,
        signUp,
        getAllNotes,
        addNote,
        deleteNote,
        updateNote,
    }
})
