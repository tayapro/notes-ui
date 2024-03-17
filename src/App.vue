<script setup>
import { useStore } from './store/notesStore'
import TheHeader from './components/TheHeader.vue'
import TheFooter from './components/TheFooter.vue'
import Note from './components/Note.vue'
import { ref } from 'vue'

const store = useStore()

function getFilteredNotes() {
    let filteredNotes = []
    console.log('hello', store.filter)
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
        <div class="content">
            <div v-for="(item, index) in getFilteredNotes()" :key="item.id">
                <Note :note="item" :filter="store.filter" />
            </div>
        </div>
        <TheFooter />
    </div>
</template>

<style scoped>
.content {
    flex: 1;
    overflow: auto;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding-left: 10px;
    padding-right: 10px;
    /* border: 2px solid black; */
}

.main-container {
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
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
