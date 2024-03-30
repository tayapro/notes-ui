import notesApi from '../api/notesApi.js'
import sessionMiddleware from './session.js'

export async function addNote(newNote) {
    const session = await sessionMiddleware.getCurrentSession()
    if (session === null) {
        throw new Error('User not logged in')
    }

    const res = await notesApi.addNote(session.accessToken, newNote)
    if (res.status !== 200) {
        throw new Error('Add new note error')
    }

    return res
}

export async function listNotes() {
    const session = await sessionMiddleware.getCurrentSession()
    if (session === null) {
        throw new Error('User not logged in')
    }

    const res = await notesApi.listNotes(session.accessToken)
    if (res.status !== 200) {
        throw new Error('List notes error')
    }
    return res
}

export async function getNote(noteID) {
    const session = await sessionMiddleware.getCurrentSession()
    if (session === null) {
        throw new Error('User not logged in')
    }

    const res = await notesApi.getNote(session.accessToken, noteID)
    if (res.status !== 200) {
        throw new Error('Get note error')
    }
    return res
}

export async function updateNote(noteID, updatedData) {
    const session = await sessionMiddleware.getCurrentSession()
    if (session === null) {
        throw new Error('User not logged in')
    }

    const res = await notesApi.updateNote(
        session.accessToken,
        noteID,
        updatedData
    )
    if (res.status !== 200) {
        throw new Error('Update note error')
    }
    return res
}

export async function deleteNote(noteID) {
    const session = await sessionMiddleware.getCurrentSession()
    if (session === null) {
        throw new Error('User not logged in')
    }

    const res = await notesApi.deleteNote(session.accessToken, noteID)
    if (res.status !== 204) {
        throw new Error('Delete note error')
    }
    return res
}

export default {
    addNote,
    listNotes,
    getNote,
    updateNote,
    deleteNote,
}
