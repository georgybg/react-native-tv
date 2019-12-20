import { apiFetch } from "../api";
import storage from "../storage";
import Router from "next/router";
import { AUTHENTICATE } from "../../redux/types";
import { SESSION_TOKEN_KEY } from "../../constants";

export const authenticate = ({ email, password }, type) => {
    if (type !== 'signin' && type !== 'signup') {
        throw new Error('Wrong API call!');
    }

    return (dispatch) => {
        apiFetch('/vktv/auth/signin').then((response) => {

            storage.save({
                key: SESSION_TOKEN_KEY, // Note: Do not use underscore("_") in key!
                data: response.token,

                // if expires not specified, the defaultExpires will be applied instead.
                // if set to null, then it will never expire.
                expires: 1000 * 3600
            });

            Router.push('/');
            dispatch({type: AUTHENTICATE, token: response.token});
        }).catch((error) => {
            throw new Error(err);
        });
    }
};
