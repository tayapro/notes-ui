<script setup>
import { useStore } from './store/notesStore'
import TheHeader from './components/TheHeader.vue'
import TheFooter from './components/TheFooter.vue'
import Note from './components/Note.vue'
import { ref } from 'vue'

const imgUrl = new URL(
    './assets/colorful-floral-background-with-poppy-illustration-remixed-from-public-domain-artworks.jpg',
    // '../assets/colorful-floral-background-with-poppy-illustration-remixed-from-public-domain-artworks.jpg',
    import.meta.url
).href

console.log(imgUrl)

const store = useStore()
let filter = ref('')

function getFilteredNotes() {
    let filteredNotes = []
    for (let note of store.notes) {
        if (
            note.title.includes(filter.value) ||
            note.text.includes(filter.value)
        )
            filteredNotes.push(note)
    }
    const filteredNotesByUpdateTime = filteredNotes
        .sort((a, b) => a.updatedAt - b.updatedAt)
        .reverse()
    return filteredNotesByUpdateTime
}
</script>

<template>
    <TheHeader />
    <div class="main-container">
        <div class="search">
            <input placeholder="Search" v-model="filter" />
        </div>
        <div v-for="(item, index) in getFilteredNotes()" :key="item.id">
            <Note :note="item" :filter="filter" />
            <hr />
        </div>
    </div>
    <TheFooter />
</template>

<style scoped>
.main-container {
    display: flex;
    justify-content: center;
    flex-direction: column;
    position: relative;
    top: 4rem;
    font-family: Montserrat;
}
</style>
