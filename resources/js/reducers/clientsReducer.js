import { fetchData } from "../axios";

export default function ClientsReducer(state, action) {
    switch (action.type) {
        case "GET_CLIENTS":
            fetchData("GET", "clients").then(res => {
                if (res.success) {
                    return {
                        ...state,
                        clients: res.data
                    };
                }
            });
        case "SAVE_CLIENTS":
            return {
                ...state,
                clients: action.payload
            };
        default:
            return state;
    }
}
