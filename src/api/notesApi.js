import axios from 'axios'

const myAxios = axios.create({
    baseURL: `${import.meta.env.VITE_BASE_BE_URL}`,
})

async function addNote(accessToken, addData) {
    try {
        const { status, data } = await myAxios({
            url: '/notes',
            method: 'post',
            data: {
                title: addData.title,
                text: addData.text,
                tags: addData.tags,
            },
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })
        return {
            status,
            note: data,
        }
    } catch (e) {
        return { status: e.response.status }
    }
}

async function listNotes(accessToken) {
    try {
        const { status, data } = await myAxios({
            url: '/notes',
            method: 'get',
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })
        return {
            status,
            notes: data,
        }
    } catch (e) {
        return { status: e.response.status }
    }
}

async function getNote(accessToken, noteID) {
    try {
        const { status, data } = await myAxios({
            url: `/notes/${noteID}`,
            method: 'get',
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })
        return {
            status,
            note: data,
        }
    } catch (e) {
        return { status: e.response.status }
    }
}

async function deleteNote(accessToken, noteID) {
    try {
        const { status } = await myAxios({
            url: `/notes/${noteID}`,
            method: 'delete',
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })
        return {
            status,
        }
    } catch (e) {
        return { status: e.response.status }
    }
}

async function updateNote(accessToken, noteID, updatedData) {
    try {
        const { status, data } = await myAxios({
            url: `/notes/${noteID}`,
            method: 'put',
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            data: {
                title: updatedData.title,
                text: updatedData.text,
                tag: updatedData.tag,
            },
        })

        return {
            status,
            note: data,
        }
    } catch (e) {
        return { status: e.response.status }
    }
}

export default {
    addNote,
    listNotes,
    getNote,
    deleteNote,
    updateNote,
}
