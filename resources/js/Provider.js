import ClientsReducer from "./reducers/clientsReducer";
import ClientsContext from "./contexts/clientsContext";
import React, { createContext, useReducer } from "react";

export const AppContext = createContext({});

const StateProvider = props => {
    const [clientState, clientDispatch] = useReducer(
        ClientsReducer,
        ClientsContext
    );

    return (
        <AppContext.Provider
            value={{
                state: {
                    ...clientState
                },
                dispatch: { clientDispatch }
            }}
        >
            {props.children}
        </AppContext.Provider>
    );
};

export default StateProvider;
