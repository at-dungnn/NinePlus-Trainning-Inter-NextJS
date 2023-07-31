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
    // const [loggedInUser, setLoggedInUser] = useState<UserAuthenticate | null>(
    //     () => {
    //         try {
    //             const value = JSON.parse(
    //                 localStorage.getItem(SessionKey.USER) || "false"
    //             );
    //             return value === "false" ? value : null;
    //         } catch (e) {
    //             console.log(e);
    //         }
    //     }
    // );
    const loggedInUser: UserAuthenticate | null = (() => {
        try {
            const value = JSON.parse(
                localStorage.getItem(SessionKey.USER) || "false"
            );
            return value === "false" ? value : null;
        } catch (e) {
            console.log(e);
        }
    })();

    if (loggedInUser) {
        localStorage.setItem(SessionKey.USER, JSON.stringify(loggedInUser));
    } else {
        localStorage.removeItem(SessionKey.USER);
    }

    const saveSession = (userAuth: UserAuthenticate): void => {
        localStorage.setItem(SessionKey.USER, JSON.stringify(userAuth));
    };

    const clearSession = (): void => {
        localStorage.removeItem(SessionKey.USER);
    };

    const isLoggedIn = !!loggedInUser;

    return {
        loggedInUser,
        isLoggedIn,
        clearSession,
        saveSession,
    };
};
