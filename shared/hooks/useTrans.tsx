import { useRouter } from "next/router";
import { en, vi } from "@shared/lang";
import { useState } from "react";

const useTrans = () => {
    const router = useRouter();
    const { pathname, asPath, query } = router;

    const trans = router.locale === "vi" ? vi : en;
    const changeLang = (e: string) => {
        console.log("change lang: " + e);
        console.log(router.locale);

        router.push({ pathname, query }, asPath, { locale: e });
    };
    return { trans, changeLang };
};

export default useTrans;
