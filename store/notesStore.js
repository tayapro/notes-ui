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

    function signIn(uname, password) {
        username.value = uname
    }

    function signUp(uname, password) {
        username.value = uname
    }

    return { username, isLoggedIn, logout, signIn, signUp }
})
