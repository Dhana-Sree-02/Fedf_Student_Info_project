
// Automatically use localhost for local development, and Render backend for GitHub Pages production
export const APIURL = import.meta.env.DEV ? "http://localhost:5000/" : "https://p007backend.onrender.com/";
export const IMGURL = import.meta.env.BASE_URL;

export function callApi(rmethod, url, data, responseHandler) {
    let options = (rmethod === "GET" || rmethod === "DELETE") ? { method: rmethod, headers: { 'Content-Type': 'application/json' } } : { method: rmethod, headers: { 'Content-Type': 'application/json' }, body: data };
    fetch(url, options)
        .then((response) => {
            if (!response.ok)
                throw new Error(response.status + ": " + response.statusText);
            return response.json();
        })
        .then((res) => responseHandler(res))
        .catch((err) => alert(err.message));
}