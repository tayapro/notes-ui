<script setup>
import { useStore } from '../store/notesStore'
import LoginModal from './components/LoginModal.vue'
import { ref } from 'vue'

const store = useStore()
const showSignIn = ref(false)
const showSignUp = ref(false)

async function onSignInSubmit(username, password) {
    console.log(username, password)
    try {
        await store.signIn(username, password)
    } catch (e) {
        console.error(`ERROR: ${e}`)
    }
    showSignIn.value = false
}

async function onSignUpSubmit(username, password) {
    console.log(username, password)
    try {
        await store.signUp(username, password)
    } catch (e) {
        console.error(`ERROR: ${e}`)
    }
    showSignUp.value = false
}
</script>

<template>
    <button v-if="store.isLoggedIn()" @click="store.logout()">
        logout ::: {{ store.username }}
    </button>
    <div v-else>
        <button @click="showSignIn = true">Sign in</button>
        <button @click="showSignUp = true">Sign up</button>
    </div>

    <div>
        <h3>Notes</h3>
        <div v-for="n in store.notes" :key="n.id">
            <div>{{ n.title }}</div>
            <div>{{ n.text }}</div>
            <hr />
        </div>
    </div>

    <LoginModal
        greeting="Sign In"
        :visible="showSignIn"
        @cancel="showSignIn = false"
        @submit="onSignInSubmit"
    />

    <LoginModal
        greeting="Sign Up"
        :visible="showSignUp"
        @cancel="showSignUp = false"
        @submit="onSignUpSubmit"
    />
</template>

<style scoped></style>
