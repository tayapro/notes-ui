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
        // console.log(res)
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
        // console.log(res)
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
        console.log(notes.value[0])
    }

    return { username, notes, isLoggedIn, logout, signIn, signUp }
})
