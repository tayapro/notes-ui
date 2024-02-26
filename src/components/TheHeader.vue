<script setup>
import { useStore } from '../store/notesStore'
import LoginModal from './LoginModal.vue'
import NewNoteModal from './NewNoteModal.vue'

import { ref } from 'vue'

const store = useStore()
const showSignIn = ref(false)
const showSignUp = ref(false)
const showNewNote = ref(false)

async function onSignInSubmit(username, password) {
    try {
        await store.signIn(username, password)
    } catch (e) {
        console.error(`ERROR: ${e}`)
    }
    showSignIn.value = false
}

async function onSignUpSubmit(username, password) {
    try {
        await store.signUp(username, password)
    } catch (e) {
        console.error(`ERROR: ${e}`)
    }
    showSignUp.value = false
}

async function onAddNote(title, text, tags) {
    try {
        await store.addNote({ title, text, tags })
    } catch (e) {
        console.error(`ERROR: ${e}`)
    }
    showNewNote.value = false
}
</script>

<template>
    <div class="container">
        <div class="item">
            <a class="logo" href="#">NOTES</a>
        </div>
        <div class="item links-container" v-if="store.isLoggedIn()">
            <button class="link" @click="store.logout()">
                logout ::: {{ store.username }}
            </button>
            <button class="link" @click="showNewNote = true">New Note</button>
        </div>
        <div class="item links-container" v-else>
            <button class="link" @click="showSignIn = true">Sign in</button>
            <button class="link" @click="showSignUp = true">Sign up</button>
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

<style scoped>
.container {
    background-color: azure;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 100;
    align-items: center;
    display: flex;
    padding-top: 10px;
    padding-bottom: 10px;
}

.logo {
    font-family: Lilita One;
    font-size: 2rem;
    padding: 0 0.5rem;
    text-decoration: none;
    color: rgb(51, 51, 52);
    margin-left: 10px;
}
.item {
    flex-grow: 1;
}

.link {
    background-color: azure;
    padding: 0.6rem 0.7rem;
    text-decoration: none;
    font-family: Montserrat;
    color: rgb(51, 51, 52);
    border: 1px solid rgba(51, 51, 52, 0.601);
    border-radius: 5px;
}

.link:hover {
    background-color: rgb(212, 225, 225);
}

.links-container {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-right: 10px;
    gap: 5px;
}
</style>
