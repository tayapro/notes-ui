import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

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
        const res = await axios.post(
            'http://localhost:3001/api/login',
            {
                username: uname,
                password,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        )

        username.value = res.data.username
        accessToken = res.data.accessToken
        await getAllNotes()
    }

    async function signUp(uname, password) {
        notes.value = []
        const res = await axios.post(
            'http://localhost:3001/api/register',
            {
                username: uname,
                password,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        )

        username.value = res.data.username
        accessToken = res.data.accessToken
        await getAllNotes()
    }

    async function getAllNotes() {
        const res = await axios.get('http://localhost:3000/notes', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })

        for (let n of res.data) {
            notes.value.push(n)
        }
    }

    async function addNote(title, text, tags) {
        const res = await axios.post(
            'http://localhost:3000/notes',
            {
                title,
                text,
                tags,
            },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        )
        const newNote = { id: res.data, title, text, tags }
        notes.value.push(newNote)
    }

    async function deleteNote(id) {
        await axios.delete(`http://localhost:3000/notes/${id}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })
        notes.value = notes.value.filter((data) => data.id !== id)
    }

    async function updateNote(id, title, text) {
        await axios.put(
            `http://localhost:3000/notes/${id}`,
            { title, text },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        )
    }

    return {
        username,
        notes,
        isLoggedIn,
        logout,
        signIn,
        signUp,
        addNote,
        deleteNote,
        updateNote,
    }
})
