const host = 'http://localhost:3030'

export const tokenValue = {
    token: null
}

async function request(method, url, body) {
    const options = {
        method,
        headers: {}
    }
    if (body) {

        options.body = JSON.stringify(body)
    }
    if (tokenValue.token) options.headers['X-Authorization'] = tokenValue.token
    try {
        const res = await fetch(host + url, options)

        if (!res.ok) throw new Error((await res.json()).message)
        try {
            return res.json()
        } catch (error) {
            return res
        }
    } catch (error) {
        //alert(error)
        console.log(error);
        throw error
    }
}

export const get = request.bind(null, 'get')
export const post = request.bind(null, 'post')
export const put = request.bind(null, 'put')
export const del = request.bind(null, 'delete')