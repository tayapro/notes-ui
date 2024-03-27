import { defineStore } from 'pinia'
import { ref } from 'vue'
import idApi from '../../api/idApi.js'
import notesApi from '../../api/notesApi.js'

export const useStore = defineStore('notes', () => {
    const username = ref('')
    const notes = ref([])
    let accessToken = ''
    const filter = ref('')

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
        if (res.status !== 200) {
            throw new Error('Username or password is not correct')
        }

        username.value = res.username
        accessToken = res.accessToken
        await getAllNotes(accessToken)
    }

    async function signUp(uname, password) {
        notes.value = []
        const res = await idApi.register(uname, password)
        if (res.status !== 200) {
            throw new Error('Ooops... something happened')
        }

        username.value = res.username
        accessToken = res.accessToken
        await getAllNotes(accessToken)
    }

    async function getAllNotes() {
        const res = await notesApi.listNotes(accessToken)
        if (res.status !== 200) {
            throw new Error('Ooops... something happened')
        }

        for (let n of res.notes) {
            notes.value.push(n)
        }
    }

    async function addNote(newNote) {
        const res = await notesApi.addNote(accessToken, newNote)
        if (res.status !== 200) {
            throw new Error('Ooops... something happened')
        }
        notes.value.push(res.note)
    }

    async function deleteNote(id) {
        const res = await notesApi.deleteNote(accessToken, id)
        if (res.status !== 204) {
            throw new Error('Ooops... something happened')
        }
        notes.value = notes.value.filter((data) => data.id !== id)
    }

    async function updateNote(id, updatedData) {
        const res = await notesApi.updateNote(accessToken, id, updatedData)
        if (res.status !== 200) {
            throw new Error('Ooops... something happened')
        }

        let vueNote = getNoteByID(id)
        vueNote.title = res.note.title
        vueNote.text = res.note.text
        vueNote.tags = res.note.tags
        vueNote.updatedAt = res.note.updatedAt
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
        filter,
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
