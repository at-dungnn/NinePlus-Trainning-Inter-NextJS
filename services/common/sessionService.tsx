import { useState, useEffect } from "react";
import {
    SessionService,
    UserAuthenticate,
} from "@/models/common/user-auth.model";
// store token dưới dạng localStorage.setItem("USER",token) !!!
export class SessionKey {
    static CURRENT_SELECT_LANG = "CURRENT_SELECT_LANG";
    static ROLE = "ROLE";
    static USER = "USER";
}

export const useSessionService = (): SessionService => {
    const loggedInUser: UserAuthenticate | null = (() => {
        try {
            const value = JSON.parse(
                localStorage.getItem(SessionKey.USER) || "false",
            );
            return value;
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

    const isLoggedIn = !!loggedInUser;

    return {
        loggedInUser,
        isLoggedIn,
        saveSession,
    };
};
