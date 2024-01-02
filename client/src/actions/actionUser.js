import * as api from "../api";

export const userLogin = async(user) => {
    try {
        const result = await api.userLogin(user)
            .then(({ data }) => data )
            .catch(({ response: { data }}) => data);
        return result;
    } catch (e) {
        console.log(e);
    }
}

export const userSignup = async(user) => {
    try {
        const result = await api.userSignup(user)
            .then(({ data }) => data )
            .catch(({ response: { data }}) => data);
        return result;
    } catch (e) {
        console.log(e);
    }
}

