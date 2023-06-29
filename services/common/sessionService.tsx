import { useState, useEffect } from "react";
import {
    SessionService,
    UserAuthenticate,
} from "@/models/common/user-auth.model";

export class SessionKey {
    static CURRENT_SELECT_LANG = "CURRENT_SELECT_LANG";
    static ROLE = "ROLE";
    static USER = "USER";
}

export const useSessionService = (): SessionService => {
    const [loggedInUser, setLoggedInUser] = useState<UserAuthenticate | null>(
        JSON.parse(localStorage.getItem(SessionKey.USER) || "null")
    );

    useEffect(() => {
        if (loggedInUser) {
            localStorage.setItem(SessionKey.USER, JSON.stringify(loggedInUser));
        } else {
            localStorage.removeItem(SessionKey.USER);
        }
    }, [loggedInUser]);

    const saveSession = (userAuth: UserAuthenticate): void => {
        setLoggedInUser(userAuth);
        localStorage.setItem(SessionKey.USER, JSON.stringify(userAuth));
    };

    const clearSession = (): void => {
        setLoggedInUser(null);
    };

    const isLoggedIn = !!loggedInUser;

    return {
        loggedInUser,
        isLoggedIn,
        setLoggedInUser,
        clearSession,
        saveSession,
    };
};
