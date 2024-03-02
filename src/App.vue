<script setup>
import { useStore } from './store/notesStore'
import TheHeader from './components/TheHeader.vue'
import TheFooter from './components/TheFooter.vue'
import Note from './components/Note.vue'
import { ref } from 'vue'

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
    <div class="main-container">
        <TheHeader />
        <div class="content">
            <div>
                <div v-for="(item, index) in getFilteredNotes()" :key="item.id">
                    <Note :note="item" :filter="filter" />
                    <hr />
                </div>
            </div>
        </div>
        <TheFooter />
    </div>
    <div class="search">
        <input placeholder="Search" v-model="filter" />
    </div>
</template>

<style scoped>
.main-container {
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.content {
    flex: 1;
    overflow: auto;
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
