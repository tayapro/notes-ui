<script setup>
import { useStore } from './store/notesStore'
import TheHeader from './components/TheHeader.vue'
import TheFooter from './components/TheFooter.vue'
import Note from './components/Note.vue'
import { ref } from 'vue'

// const imgUrl = new URL(
//     './assets/colorful-floral-background-with-poppy-illustration-remixed-from-public-domain-artworks.jpg',
//     import.meta.url
// ).href

const store = useStore()
let filter = ref('')

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
    const filteredNotesByUpdateTime = filteredNotes
        .sort((a, b) => a.updatedAt - b.updatedAt)
        .reverse()
    return filteredNotesByUpdateTime
}
</script>

<template>
    <TheHeader />
    <div>
        <h3>Notes</h3>
        <div class="search">
            <input placeholder="Search" v-model="filter" />
        </div>
        <div v-for="(item, index) in getFilteredNotes()" :key="item.id">
            <Note :note="item" :filter="filter" />
            <hr />
        </div>
        <!-- <img :src="imgUrl" /> -->
    </div>
    <TheFooter />
</template>

<style scoped></style>
