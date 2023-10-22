<script setup>
import { useStore } from '../store/notesStore'

const store = useStore()
</script>

<template>
    <button v-if="store.isLoggedIn()" @click="store.logout()">
        logout ::: {{ store.username }}
    </button>
    <div v-else>
        <button @click="store.signIn()">Sign in</button>
        <button @click="store.signUp()">Sign up</button>
    </div>
</template>

<style scoped></style>
