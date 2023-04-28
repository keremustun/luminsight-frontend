export function useFetch(url) {
    return fetch(url)
        .then((res) => res.json())
}
