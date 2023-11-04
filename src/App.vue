<script setup>
import { useStore } from './store/notesStore'
import LoginModal from './components/LoginModal.vue'
import NewNoteModal from './components/NewNoteModal.vue'
import Note from './components/Note.vue'
import { ref } from 'vue'

const store = useStore()
let filter = ref('')
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

function getFilteredNotes() {
    let filteredNotes = []
    // TODO: why store.notes but not store.notes.value
    for (let note of store.notes) {
        if (
            note.title.includes(filter.value) ||
            note.text.includes(filter.value)
        )
            filteredNotes.push(note)
    }
    return filteredNotes
}

async function reReadNotes() {
    store.notes = []
    await store.getAllNotes()
}
</script>

<template>
    <div v-if="store.isLoggedIn()">
        <div>
            <button @click="store.logout()">
                logout ::: {{ store.username }}
            </button>
            <button @click="showNewNote = true">New Note</button>
            <button @click="reReadNotes()">Re-read notes</button>
        </div>
        <div class="search">
            <input placeholder="Search" v-model="filter" />
        </div>
    </div>
    <div v-else>
        <button @click="showSignIn = true">Sign in</button>
        <button @click="showSignUp = true">Sign up</button>
    </div>

    <div>
        <h3>Notes</h3>
        <div v-for="(item, index) in getFilteredNotes()" :key="item.id">
            <Note :note="item" :filter="filter" />
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
