<script setup>
import { onMounted, watch, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useStore } from '../store/notesStore'
import TheHeader from '../components/TheHeader.vue'
import TheFooter from '../components/TheFooter.vue'
import Note from '../components/Note.vue'
import noteMiddleware from '../middleware/notes'
import sessionMiddleware from '../middleware/session'

const store = useStore()
const { isLoggedIn } = storeToRefs(store)

watch(isLoggedIn, async () => {
    if (store.isLoggedIn === false) {
        return
    }
    console.log('Loading notes here')
    const res = await noteMiddleware.listNotes()
    store.notes = res.notes
})

onMounted(async () => {
    const session = await sessionMiddleware.getCurrentSession()
    if (session === null) {
        return
    }
    store.isLoggedIn = true
})

function getFilteredNotes() {
    let filteredNotes = []
    for (let note of store.notes) {
        // console.log(note)
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
                <Note
                    :note="item"
                    :filter="store.filter"
                    :edit="item.id.startsWith('NEWNOTE_')"
                />
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
}

.main-container {
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
}
</style>
