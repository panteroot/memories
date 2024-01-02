import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export const useAuthContext = () => {
    const context = useContext(AuthContext);

    if(!context)
        throw Error('useUserContext must be inside UserContextProvider (check index.js)');

    return context;
}