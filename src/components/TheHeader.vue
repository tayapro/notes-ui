<script setup>
import { useStore } from '../store/notesStore'
import LoginModal from './LoginModal.vue'
import NewNoteModal from './NewNoteModal.vue'

import { ref } from 'vue'

const store = useStore()
const showSignIn = ref(false)
const showSignUp = ref(false)
const showNewNote = ref(false)
const errorMsg = ref('')

async function onSignInSubmit(username, password) {
    try {
        await store.signIn(username, password)
        showSignIn.value = false
        errorMsg.value = ''
    } catch (e) {
        console.error(`ERROR: ${e}`)
        errorMsg.value = e.message
    }
}

async function onSignUpSubmit(username, password) {
    try {
        await store.signUp(username, password)
        showSignUp.value = false
        errorMsg.value = ''
    } catch (e) {
        console.error(`ERROR: ${e}`)
        errorMsg.value = e.message
    }
}

async function onAddNote(title, text, tags) {
    try {
        await store.addNote({ title, text, tags })
    } catch (e) {
        console.error(`ERROR: ${e}`)
    }
    showNewNote.value = false
}

function onCancel() {
    showSignIn.value = false
    showSignUp.value = false
    errorMsg.value = ''
}
</script>

<template>
    <div class="container">
        <div class="item">
            <a class="logo" href="#">NOTES</a>
        </div>
        <div class="item links-container" v-if="store.isLoggedIn()">
            <button class="link" @click="store.logout()">
                logout :::
                <p class="logout">{{ store.username }}</p>
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
        @cancel="onCancel()"
        @submit="onSignInSubmit"
        :errorMsg="errorMsg"
    />

    <LoginModal
        greeting="Sign Up"
        :visible="showSignUp"
        @cancel="onCancel()"
        @submit="onSignUpSubmit"
        :errorMsg="errorMsg"
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
    width: 100%;
    z-index: 10;
    align-items: center;
    display: flex;
    padding-top: 10px;
    padding-bottom: 10px;
    overflow: hidden;
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
    padding-right: 0.5rem;
    gap: 5px;
}

p {
    all: unset;
}

.logout {
    font-weight: 700;
}
</style>
