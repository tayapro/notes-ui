<script setup>
import { useStore } from './store/notesStore'
import TheHeader from './components/TheHeader.vue'
import TheFooter from './components/TheFooter.vue'
import Note from './components/Note.vue'

const store = useStore()

function getFilteredNotes() {
    let filteredNotes = []
    for (let note of store.notes) {
        if (
            note.title.includes(store.filter) ||
            note.text.includes(store.filter)
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
    <div class="main-container">
        <TheHeader />
        <div class="content-container">
            <div v-for="(item, index) in getFilteredNotes()" :key="item.id">
                <Note :note="item" :filter="store.filter" />
            </div>
        </div>
        <TheFooter />
    </div>
</template>

<style scoped>
.content-container {
    flex: 1;
    overflow: auto;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding-left: 3rem;
    padding-right: 3rem;
    padding-top: 1.7rem;
}

.main-container {
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
}
</style>
