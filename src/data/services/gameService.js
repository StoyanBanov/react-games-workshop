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

export function createGame(game) {
    return api.post(endpoints.games, game)
}

export function editGameById(id, game) {
    return api.put(`${endpoints.games}/${id}`, game)
}

export function deleteGameById(id) {
    return api.del(`${endpoints.games}/${id}`)
}

export function getCommentsByGameId(gameId) {
    return api.get(`${endpoints.comments}?where=gameId%3D%22${gameId}%22`)
}

export function createComment(gameId, comment) {
    return api.post(`${endpoints.comments}`, { gameId, comment })
}