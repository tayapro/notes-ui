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
    await store.updateNote(
        props.note.id,
        titleInput.value.value,
        textInput.value.value
    )

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
</script>

<template>
    <div>
        <p>{{ props.note.id }}</p>
        <div v-if="editMode">
            <div><input ref="titleInput" :value="props.note.title" /></div>
            <div>
                <textarea ref="textInput" rows="10" :value="props.note.text" />
            </div>
            <button @click="onSave()">Save note</button>
            <button @click="onCancel()">Cancel</button>
        </div>
        <div v-else>
            <HighlightText
                :prop_text="props.note.title"
                :prop_match="props.filter"
            />
            <HighlightText
                :prop_text="props.note.text"
                :prop_match="props.filter"
            />
            <!-- <div>{{ props.note.title }}</div>
            <div>{{ props.note.text }}</div> -->
            <button @click="onEdit()">Edit</button>
        </div>
        <button @click="onDelete()">delete note</button>
    </div>
</template>

<style scoped></style>
