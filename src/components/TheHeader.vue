<script setup>
import { useStore } from '../store/notesStore'
import { useRouter } from 'vue-router'
import sessionMiddleware from '../middleware/session'
import LoginModal from './LoginModal.vue'
import BaseTooltip from './lib/BaseTooltip.vue'

import { ref } from 'vue'
import {
    PencilSquareIcon,
    ArrowLeftStartOnRectangleIcon,
} from '@heroicons/vue/24/solid'

const store = useStore()
const router = useRouter()

const errorMsg = ref('')
const showSignIn = ref(false)
const showSignUp = ref(false)
const showTooltipLogout = ref(false)
const showTooltipNewNote = ref(false)

async function onSignInSubmit(username, password) {
    try {
        await sessionMiddleware.login(username, password)
        showTooltipLogout.value = false
        store.isLoggedIn = true
        showSignIn.value = false
        errorMsg.value = ''
    } catch (e) {
        console.error(`ERROR: ${e}`)
        errorMsg.value = e.message
    }
}

async function onSignUpSubmit(username, password) {
    try {
        await sessionMiddleware.register(username, password)
        showTooltipLogout.value = false
        store.isLoggedIn = true
        showSignUp.value = false
        errorMsg.value = ''
    } catch (e) {
        console.error(`ERROR: ${e}`)
        errorMsg.value = e.message
    }
}

function onAddNewNote() {
    store.notes.push({
        title: '',
        text: '',
        tag: [],
        createdAt: Date.now(),
        updatedAt: Date.now(),
        id: `NEWNOTE_${Math.random()}`,
    })
}

function isNewNoteDisabled() {
    for (let i = 0; i < store.notes.length; i++) {
        if (store.notes[i].id.startsWith('NEWNOTE_')) {
            return true
        }
    }
    return false
}

function onCancel() {
    showSignIn.value = false
    showSignUp.value = false
    errorMsg.value = ''
}

const onLogout = async () => {
    await sessionMiddleware.logout()
    store.notes = []
    store.isLoggedIn = false
    router.push('/')
}
</script>

<template>
    <div class="header-container">
        <div class="item">
            <img class="logo-picture" src="../assets/TheNotesLogo.png" />
        </div>
        <div class="item links-container" v-if="store.isLoggedIn">
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
                    @click="onLogout"
                >
                    <ArrowLeftStartOnRectangleIcon />
                </button>
            </BaseTooltip>

            <BaseTooltip
                class="new-note-btn"
                placement="bottom"
                :visible="showTooltipNewNote"
                content="New note"
            >
                <button
                    class="new-note-btn"
                    @mouseenter="showTooltipNewNote = true"
                    @mouseleave="showTooltipNewNote = false"
                    @click="onAddNewNote()"
                    :disabled="isNewNoteDisabled()"
                >
                    <PencilSquareIcon class="icn" />
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
</template>

<style scoped>
.logo-picture {
    height: 6rem;
    margin-left: 0.5rem;
}

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
    width: 100%;
    z-index: 10;
    align-items: center;
    display: flex;
    padding-top: 0.5rem;
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
    background-color: rgb(51, 51, 51);
    color: rgb(231, 231, 231);
    border: 2px solid rgba(231, 231, 231, 0.601);
    padding: 0.8rem 1.4rem;
    text-decoration: none;
    border-radius: 5px;
    font-size: 0.9rem;
}

.sign-in-up-button:hover {
    background-color: rgba(51, 51, 51, 0.8);
}

.logout-btn,
.new-note-btn {
    display: flex;
    padding: 0.01rem;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border: none;
    color: rgba(51, 51, 51, 0.9);
    width: 2rem;
    height: 2rem;
    margin-right: 1rem;
    background-color: transparent;
}

.new-note-btn:disabled {
    color: rgba(124, 124, 124, 0.802);
}

.logout-btn {
    margin-left: 1rem;
}

.links-container {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-right: 2rem;
    gap: 1.5rem;
}

p {
    all: unset;
}

.logout {
    font-weight: 700;
}
</style>
