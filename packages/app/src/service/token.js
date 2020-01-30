
const TOKEN_KEY = "WIKI_TOKEN"

export const saveToken = (token) => {
    localStorage.setItem(TOKEN_KEY, token);
    window.location.reload();
}

export const savedToken = () => {
    return localStorage.getItem(TOKEN_KEY);
}

export const clearSavedToken = () => {
    localStorage.clear(TOKEN_KEY);
}
