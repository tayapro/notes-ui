<script setup>
import { useStore } from '../store/notesStore'
import LoginModal from './components/LoginModal.vue'
import NewNoteModal from './components/NewNoteModal.vue'
import { ref } from 'vue'

const store = useStore()
const showSignIn = ref(false)
const showSignUp = ref(false)
const showNewNote = ref(false)

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

async function onAddNote(title, text, tags) {
    try {
        console.log(title, text, tags)
        await store.addNote(title, text, tags)
    } catch (e) {
        console.error(`ERROR: ${e}`)
    }
    showNewNote.value = false
}

async function deleteNote(id) {
    try {
        await store.deleteNote(id)
    } catch (e) {
        console.error(`ERROR: ${e}`)
    }
}
</script>

<template>
    <div v-if="store.isLoggedIn()">
        <button @click="store.logout()">logout ::: {{ store.username }}</button>
        <button @click="showNewNote = true">New Note</button>
    </div>
    <div v-else>
        <button @click="showSignIn = true">Sign in</button>
        <button @click="showSignUp = true">Sign up</button>
    </div>

    <div>
        <h3>Notes</h3>
        <div v-for="n in store.notes" :key="n.id">
            <div>{{ n.title }}</div>
            <div>{{ n.text }}</div>
            <button @click="deleteNote(n.id)">delete note</button>
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

    <NewNoteModal
        greeting="Create a new note"
        :visible="showNewNote"
        @cancel="showNewNote = false"
        @submit="onAddNote"
    />
</template>

<style scoped></style>
