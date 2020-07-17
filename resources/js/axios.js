export async function fetchData(method, url, data = []) {
    let apiUrl = `${window.location.origin}/`;
    // test
    let response;
    switch (method) {
        case "POST_FILE":
            response = await axios.post(`${apiUrl}${url}`, data, {
                headers: {
                    Authorization: "Bearer " + localStorage.token,
                    "Content-Type": "multipart/form-data"
                }
            });

            return await response.data;
            break;
        case "POST":
            response = await axios.post(`${apiUrl}${url}`, data, {
                headers: {
                    Authorization: "Bearer " + localStorage.token
                }
            });

            return await response.data;
            break;
        case "UPDATE":
            response = await axios.put(`${apiUrl}${url}`, data, {
                headers: { Authorization: "Bearer " + localStorage.token }
            });

            return await response.data;
            break;
        case "DELETE":
            response = await axios.delete(`${apiUrl}${url}`, {
                headers: { Authorization: "Bearer " + localStorage.token }
            });

            return await response.data;
            break;
        case "GET":
            response = await axios.get(`${apiUrl}${url}`, {
                headers: { Authorization: "Bearer " + localStorage.token }
            });

            return await response.data;
            break;

        default:
            break;
    }
}
