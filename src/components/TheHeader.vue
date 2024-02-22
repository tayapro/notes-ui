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
    <div v-if="store.isLoggedIn()">
        <div>
            <button @click="store.logout()">
                logout ::: {{ store.username }}
            </button>
            <button @click="showNewNote = true">New Note</button>
        </div>
    </div>
    <div v-else>
        <button @click="showSignIn = true">Sign in</button>
        <button @click="showSignUp = true">Sign up</button>
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
.logo {
    font-family: Lilita One;
    font-size: 2rem;
    border: 1px solid black;
    border-radius: 5px;
    padding: 0 0.5rem;
    text-decoration: none;
    color: indigo;
}
.item {
    /* border: 1px solid indigo; */
    flex-grow: 1;
}

.link {
    background-color: rgb(34, 34, 193);
    /* border-radius: 5px; */
    padding: 0.6rem 0.7rem;
    text-decoration: none;
    font-family: Montserrat;
    color: aliceblue;
}

#first-link {
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
}

#last-link {
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
}

.link:hover {
    background-color: rgb(29, 29, 157);
}

.links-container {
    display: flex;
    justify-content: flex-end;
    align-items: center;
}

.container {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
</style>
