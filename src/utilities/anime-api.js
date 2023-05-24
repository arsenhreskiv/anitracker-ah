import sendRequest from "./send-request";

const BASE_URL = '/api/anime'

export function getAnimeId(id) {
    return sendRequest(`${BASE_URL}/${id}`)
}