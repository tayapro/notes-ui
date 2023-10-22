import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export const useStore = defineStore('notes', () => {
    const username = ref('')

    function isLoggedIn() {
        return username.value !== ''
    }

    function logout() {
        username.value = ''
    }

    async function signIn(uname, password) {
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
        console.log(res)
    }

    async function signUp(uname, password) {
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
        console.log(res)
    }

    return { username, isLoggedIn, logout, signIn, signUp }
})
