<script setup>
import { ref } from 'vue'
import HighlightText from './HighlightText.vue'
import { useStore } from '../store/notesStore'
import noteMiddleware from '../middleware/notes'

const props = defineProps(['note', 'filter', 'edit'])

const store = useStore()

const titleInput = ref(null)
const textInput = ref(null)
const editMode = ref(props.edit || false)

async function onSave() {
    const noteID = props.note.id
    let res = {}
    if (noteID.startsWith('NEWNOTE_')) {
        res = await noteMiddleware.addNote({
            title: titleInput.value.value,
            text: textInput.value.value,
        })
    } else {
        res = await noteMiddleware.updateNote(noteID, {
            title: titleInput.value.value,
            text: textInput.value.value,
        })
    }
    for (let i = 0; i < store.notes.length; i++) {
        if (store.notes[i].id === noteID) {
            store.notes[i] = res.note
        }
    }

    editMode.value = false
}

function onEdit() {
    editMode.value = true
}

function onCancel() {
    const id = props.note.id
    if (id.startsWith('NEWNOTE_')) {
        store.notes = store.notes.filter((data) => data.id !== id)
    }
    editMode.value = false
}

async function onDelete() {
    const id = props.note.id

    await noteMiddleware.deleteNote(id)
    store.notes = store.notes.filter((data) => data.id !== id)
}

function getHumanTime(timeStamp) {
    const date = new Date(timeStamp)
    return date.toLocaleString()
}
</script>

<template>
    <div class="container">
        <div class="note-updated-time">
            <p>
                {{ getHumanTime(props.note.updatedAt) }}
            </p>
        </div>
        <div v-if="editMode">
            <div>
                <input
                    class="edit-note"
                    ref="titleInput"
                    :value="props.note.title"
                    placeholder="add title"
                />
            </div>
            <div>
                <textarea
                    class="edit-note"
                    ref="textInput"
                    rows="10"
                    :value="props.note.text"
                    placeholder="add text"
                />
            </div>
            <div class="note-buttons">
                <button class="btns" @click="onSave()">Save note</button>
                <button class="btns" @click="onCancel()">Cancel</button>
            </div>
        </div>
        <div class="note" v-else>
            <h2>
                <HighlightText
                    :prop_text="props.note.title"
                    :prop_match="props.filter"
                />
            </h2>
            <HighlightText
                :prop_text="props.note.text"
                :prop_match="props.filter"
            />
            <div class="note-buttons">
                <button class="btns" @click="onEdit()">Edit</button>
                <button class="btns" @click="onDelete()">Delete note</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.edit-note {
    border: 1px solid rgba(51, 51, 52, 0.601);
    border-radius: 5px;
    padding: 10px;
    width: 100%;
    margin-top: 0.3rem;
    box-sizing: border-box;
    resize: none;
}

.note-buttons {
    display: flex;
    justify-content: end;
    align-items: center;
    gap: 0.5rem;
    margin-top: 0.8rem;
}

.btns {
    border-radius: 5px;
    border-color: rgba(36, 36, 255, 0.65);
    background-color: rgba(36, 36, 255, 0.65);
    color: aliceblue;
    padding: 0.5rem;
    border: none;
    cursor: pointer;
}

.btns:hover {
    background-color: rgba(31, 31, 220, 0.65);
    border: none;
    border-color: rgba(31, 31, 220, 0.65);
}

.note-updated-time {
    font-size: 0.8rem;
    display: flex;
    justify-content: end;
}

.container {
    padding: 1rem;
    box-shadow: 3px 3px 0px 0px rgba(0, 0, 0, 0.25);
    background-color: #e2e2e2;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4'%3E%3Cpath fill='%2392ac9c' fill-opacity='0.46' d='M1 3h1v1H1V3zm2-2h1v1H3V1z'%3E%3C/path%3E%3C/svg%3E");
}
</style>
