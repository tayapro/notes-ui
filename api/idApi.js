import axios from 'axios'

const myAxios = axios.create({
    baseURL: `${import.meta.env.VITE_BASE_ID_URL}/api`,
})

async function login(username, password) {
    try {
        const { status, data } = await myAxios({
            url: '/login',
            method: 'post',
            data: {
                username,
                password,
            },
        })
        return {
            status,
            refreshToken: data.refreshToken,
            accessToken: data.accessToken,
            username: data.username,
        }
    } catch (e) {
        return { status: e.response.status, refreshToken: '', accessToken: '' }
    }
}

async function register(username, password) {
    try {
        const { status, data } = await myAxios({
            url: '/register',
            method: 'post',
            data: {
                username,
                password,
            },
        })
        return {
            status,
            username: data.username,
            refreshToken: data.refreshToken,
            accessToken: data.accessToken,
        }
    } catch (e) {
        return { status: e.response.status, refreshToken: '', accessToken: '' }
    }
}

export default {
    login,
    register,
}
