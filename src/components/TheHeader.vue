<script setup>
import { useStore } from '../store/notesStore'
import LoginModal from './LoginModal.vue'
import NewNoteModal from './NewNoteModal.vue'
import BaseTooltip from './lib/BaseTooltip.vue'

import { ref } from 'vue'
import {
    PencilSquareIcon,
    UserCircleIcon,
    ArrowLeftStartOnRectangleIcon,
} from '@heroicons/vue/24/solid'

const store = useStore()
const showSignIn = ref(false)
const showSignUp = ref(false)
const showNewNote = ref(false)
const errorMsg = ref('')
const showTooltipLogout = ref(false)
const showTooltipNewNote = ref(false)

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
    <div class="header-container">
        <div class="item">
            <a class="logo" href="#">NOTES</a>
        </div>
        <div class="item links-container" v-if="store.isLoggedIn()">
            <div class="search-container">
                <input
                    class="search"
                    placeholder="Search"
                    v-model="store.filter"
                />
            </div>
            <BaseTooltip
                class="logout-btn"
                placement="bottom"
                :visible="showTooltipLogout"
                content="Sign out"
            >
                <button
                    class="logout-btn"
                    @mouseenter="showTooltipLogout = true"
                    @mouseleave="showTooltipLogout = false"
                    @click="store.logout()"
                >
                    <ArrowLeftStartOnRectangleIcon />

                    <!-- logout :::
                <p class="logout">{{ store.username }}</p> -->
                </button>
            </BaseTooltip>

            <BaseTooltip
                class="logout-btn"
                placement="bottom"
                :visible="showTooltipNewNote"
                content="New note"
            >
                <button
                    class="new-note-btn"
                    @mouseenter="showTooltipNewNote = true"
                    @mouseleave="showTooltipNewNote = false"
                    @click="showNewNote = true"
                >
                    <PencilSquareIcon />
                </button>
            </BaseTooltip>
        </div>
        <div class="item links-container" v-else>
            <button class="sign-in-up-button" @click="showSignIn = true">
                Sign in
            </button>
            <button class="sign-in-up-button" @click="showSignUp = true">
                Sign up
            </button>
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
.search {
    color: rgb(51, 51, 52);
    border: 1px solid rgba(51, 51, 52, 0.601);
    border-radius: 5px;
    padding: 0.5rem;
}

.search:focus {
    outline: none !important;
    color: rgb(0, 104, 104);
}

.header-container {
    background-color: rgb(231, 231, 231);
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

.sign-in-up-button {
    background-color: rgb(231, 231, 231);
    padding: 0.6rem 0.7rem;
    text-decoration: none;
    color: rgb(51, 51, 52);
    border: 2px solid rgba(51, 51, 52, 0.601);
    border-radius: 5px;
}

.logout-btn,
.new-note-btn {
    display: flex;
    padding: 0.01rem;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border: none;
    background-color: rgb(231, 231, 231);
    color: rgba(51, 51, 52, 0.802);
    width: 1.7rem;
    height: 1.7rem;
    margin-right: 1rem;
}

.logout-btn {
    margin-left: 1rem;
}

.sign-in-up-button:hover {
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
