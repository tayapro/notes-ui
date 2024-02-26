<script setup>
import { ref } from 'vue'
import HighlightText from './HighlightText.vue'
import { useStore } from '../store/notesStore'

const props = defineProps(['note', 'filter'])

const store = useStore()

const titleInput = ref(null)
const textInput = ref(null)
const editMode = ref(false)

async function onSave() {
    await store.updateNote(props.note.id, {
        title: titleInput.value.value,
        text: textInput.value.value,
    })

    editMode.value = false
}

function onEdit() {
    editMode.value = true
}

function onCancel() {
    editMode.value = false
}

async function onDelete() {
    await store.deleteNote(props.note.id)
}

function getHumanTime(timeStamp) {
    const date = new Date(timeStamp)
    return date.toLocaleString()
}
</script>

<template>
    <div class="container">
        <p class="note-updated-time">
            {{ getHumanTime(props.note.updatedAt) }}
        </p>
        <div v-if="editMode">
            <div><input ref="titleInput" :value="props.note.title" /></div>
            <div>
                <textarea ref="textInput" rows="10" :value="props.note.text" />
            </div>
            <button @click="onSave()">Save note</button>
            <button @click="onCancel()">Cancel</button>
        </div>
        <div class="note" v-else>
            <HighlightText
                :prop_text="props.note.title"
                :prop_match="props.filter"
            />
            <HighlightText
                :prop_text="props.note.text"
                :prop_match="props.filter"
            />
            <div class="note-buttons">
                <button @click="onEdit()">Edit</button>
                <button @click="onDelete()">Delete note</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.note-buttons {
    display: flex;
    justify-content: left;
    align-items: center;
    gap: 1rem;
    margin-top: 0.8rem;
}
.note-updated-time {
    font-size: 0.8rem;
    margin: 0px;
    padding: 0px;
    margin-top: 5px;
    margin-bottom: 5px;
}

.container {
    padding-left: 10px;
    padding-right: 10px;
}
</style>
