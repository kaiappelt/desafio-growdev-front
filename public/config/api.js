const baseURL = "https://api-curriculo.herokuapp.com";

const api = axios.create({
    baseURL,
    headers: {
        "Accept": "application/json",
        "Content": "application/json"
    }
});