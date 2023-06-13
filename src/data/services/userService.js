import * as api from "../api";

const endpoints = {
    register: '/users/register',
    login: '/users/login',
    logout: '/users/logout'
}

export function register(user) {
    return api.post(endpoints.register, user)
}

export function login(user) {
    return api.post(endpoints.login, user)
}

export async function logout() {
    await api.get(endpoints.logout)
}