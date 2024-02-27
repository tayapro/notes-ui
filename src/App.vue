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
    <div class="search">
        <input placeholder="Search" v-model="filter" />
    </div>
    <div class="main-container">
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
    top: 6rem;
}

.search {
    display: flex;
    justify-content: end;
    padding-right: 0.5rem;
    margin-top: 5px;
    position: fixed;
    top: 4rem;
    right: 0;
    width: 100%;
    z-index: 10;
}

input {
    border: 1px solid rgba(51, 51, 52, 0.601);
    border-radius: 5px;
    padding: 10px;
}

input:focus {
    outline: none;
    border: 1px solid rgba(51, 51, 52, 0.781);
}
</style>
