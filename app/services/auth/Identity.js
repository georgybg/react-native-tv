import decode from 'jwt-decode';
import storage from "../storage";
import { SESSION_TOKEN_KEY } from "../../constants";

export const isGuest = () => {
    return !isLogged();
};

export const getToken = async () => {
    return storage.load(SESSION_TOKEN_KEY).then((ret) => {
        return ret;
    });
};

export const isLogged = () => {
    let token = false;

    storage.load(SESSION_TOKEN_KEY).then((ret) => {
        token = ret;
    }).catch((err) => {
        switch (err.name) {
            case 'NotFoundError':
                return true;
            case 'ExpiredError':
                return true;
        }
    });

    return !!token && !isSessionExpired(token);
};

const isSessionExpired = (accessToken) => {
    try {
        const decoded = decode(accessToken);

        return (decoded.exp < Date.now() / 1000);
    } catch (err) {
        console.log('Expired token! Logout...');
        return false;
    }
};
