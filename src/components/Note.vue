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
            <div>
                <input
                    class="edit-note"
                    ref="titleInput"
                    :value="props.note.title"
                />
            </div>
            <div>
                <textarea
                    class="edit-note"
                    ref="textInput"
                    rows="10"
                    :value="props.note.text"
                />
            </div>
            <div class="note-buttons">
                <button @click="onSave()">Save note</button>
                <button @click="onCancel()">Cancel</button>
            </div>
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
.edit-note {
    border: 1px solid rgba(51, 51, 52, 0.601);
    border-radius: 5px;
    padding: 10px;
    width: 70%;
    margin-top: 0.3rem;
    box-sizing: border-box;
    resize: none;
}

.note-buttons {
    display: flex;
    justify-content: left;
    align-items: center;
    gap: 0.5rem;
    margin-top: 0.8rem;
}

button {
    border-radius: 5px;
    border-color: rgba(36, 36, 255, 0.65);
    background-color: rgba(36, 36, 255, 0.65);
    color: aliceblue;
    padding: 0.5rem;
    border: none;
    cursor: pointer;
}

button:hover {
    background-color: rgba(31, 31, 220, 0.65);
    border: none;
    border-color: rgba(31, 31, 220, 0.65);
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
