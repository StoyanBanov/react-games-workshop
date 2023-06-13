import * as api from "../api"

const endpoints = {
    games: '/data/games',
    comments: '/data/comments'
}

export function getAllGames() {
    return api.get(`${endpoints.games}?sortBy=_createdOn%20desc`)
}

export function getGameById(id) {
    return api.get(`${endpoints.games}/${id}`)
}

export function createGameBy(game) {
    return api.post(endpoints.games, game)
}

export function editGameById(id, game) {
    return api.put(`${endpoints.games}/${id}`, game)
}

export function deleteGameById(id) {
    return api.del(`${endpoints.games}/${id}`)
}