import idApi from '../api/idApi.js'
import { jwtDecode } from 'jwt-decode'

function setLocalStore(username, accessToken, refreshToken) {
    localStorage.setItem('username', username)
    localStorage.setItem('accessToken', accessToken)
    localStorage.setItem('refreshToken', refreshToken)
}

function clearLocalStore() {
    localStorage.removeItem('username')
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
}

function getLocalStore() {
    const username = localStorage.getItem('username')
    const accessToken = localStorage.getItem('accessToken')
    const refreshToken = localStorage.getItem('refreshToken')

    return { username, accessToken, refreshToken }
}

export async function getCurrentSession() {
    try {
        let session = getLocalStore()

        // check if user was logged in before
        if (
            session.username === null ||
            session.accessToken === null ||
            session.refreshToken === null
        ) {
            return null
        }

        if (isTokenExpired(session.accessToken)) {
            await refresh()
            session = getLocalStore()
        }

        return session
    } catch (e) {
        return null
    }
}

function isTokenExpired(token) {
    const exp = jwtDecode(token).exp
    const timeNow = Date.now() / 1000
    if (exp <= timeNow) {
        console.log('Your token is expired')
        return true
    }
    console.log('Your token is not expired')
    return false
}

export async function login(username, password) {
    const res = await idApi.login(username, password)

    if (res.status !== 200) {
        clearLocalStore()
        throw new Error('Login error')
    }

    setLocalStore(res.username, res.accessToken, res.refreshToken)
}

export async function register(username, password) {
    const res = await idApi.register(username, password)
    if (res.status !== 200) {
        clearLocalStore()
        throw new Error('Register error')
    }

    setLocalStore(res.username, res.accessToken, res.refreshToken)
}

async function refresh() {
    const { refreshToken } = getLocalStore()
    const res = await idApi.refresh(refreshToken)
    if (res.status !== 200) {
        clearLocalStore()
        throw new Error('Refresh error')
    }

    setLocalStore(res.username, res.accessToken, res.refreshToken)
}

export async function logout() {
    const res = await idApi.logout()
    if (res.status !== 204) {
        throw new Error('Refresh error')
    }

    clearLocalStore()
}

export default {
    getCurrentSession,
    login,
    register,
    logout,
}
