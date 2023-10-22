import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useStore = defineStore('notes', () => {
    const username = ref('')

    function isLoggedIn() {
        return username.value !== ''
    }

    function logout() {
        username.value = ''
    }

    function signIn() {
        username.value = 'bro'
    }

    function signUp() {
        username.value = 'bro2'
    }

    return { username, isLoggedIn, logout, signIn, signUp }
})
