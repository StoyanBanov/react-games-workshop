const host = 'http://localhost:3030'

async function request(method, url, body) {
    const options = {
        method,
        headers: {}
    }
    if (body) {
        options.headers['Content-Type'] = 'application/json'
        options.body = JSON.stringify(body)
    }

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