const END_POINT = 'http://localhost:3000';

export function* doFetch({
    method,
    url,
    data,
                         })
{
    const fullPath = END_POINT + url;

    try {
        let response = yield fetch(fullPath, {
            method: method,
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data)
        });
        response = yield response.json()

        return {data: response};
    } catch (error) {
        return error;
    }
}