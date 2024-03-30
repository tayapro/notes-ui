import { defineStore } from 'pinia'
import { ref } from 'vue'
import { jwtDecode } from 'jwt-decode'
import idApi from '../api/idApi.js'
// import notesApi from '../api/notesApi.js'
import notesMiddleware from '../middleware/notes.js'

export const useStore = defineStore('notes', () => {
    const notes = ref([])
    const filter = ref('')
    const isLoggedIn = ref(false)

    function getNoteByID(id) {
        for (let n of notes.value) {
            if (n.id === id) {
                return n
            }
        }
        return undefined
    }

    return {
        notes,
        filter,
        isLoggedIn,
    }
})
