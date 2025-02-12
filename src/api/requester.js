async function request(method, url, data) {

    const option = {
        method,
        headers: {}
    };

    if (data) {
        option.headers['Content-Type'] = 'application/json',
            option.body = JSON.stringify(data);
    };

    try {
        const response = await fetch(url, option);

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message);
        }

        if (response.status === 204) {
            return response;
        }

        return response.json();

    } catch (error) {
        // TODO Make changes if the BONUS is for error notifications
        alert(error.message);
        throw error;
    };
};

export const get = (url) => request('GET', url);
export const post = (url, data) => request('POST', url, data);
export const put = (url, data) => request('PUT', url, data);
export const del = (url) => request('DELETE', url);