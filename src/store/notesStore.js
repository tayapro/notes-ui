import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useStore = defineStore('notes', () => {
    const notes = ref([])
    const filter = ref('')
    const isLoggedIn = ref(false)

    return {
        notes,
        filter,
        isLoggedIn,
    }
})
