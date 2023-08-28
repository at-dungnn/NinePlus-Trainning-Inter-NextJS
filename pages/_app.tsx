import type { AppProps } from "next/app";
import type { Page } from "@/types/types";
import React from "react";
import { LayoutProvider } from "@/layout/context/LayoutContext";
import { AppContextProvider } from "@/shared/context";
import "@/public/demo/css/style.css";

import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import "primeicons/primeicons.css";
import "@/styles/layout/layout.scss";
import "@/styles/page/page.scss";
import "@/styles/demo/Demos.scss";
import { ErrorBoundary } from "@/shared/error";
import ErrorPage from "./auth/error";
import { useRouter } from "next/router";
import globalRouter from "@/shared/tools/globalRouter";
import ManageLayout from "@/layout/manageLayout/layout";

type Props = AppProps & {
    Component: Page;
};

export default function MyApp({
    Component,
    pageProps,
}: Props): React.ReactNode {
    const router = useRouter();
    globalRouter.navigate = router;
    if (Component.getLayout) {
        return (
            <AppContextProvider>
                <LayoutProvider>
                    <ErrorBoundary fallback={<ErrorPage />}>
                        {Component.getLayout(
                            <ErrorBoundary fallback={<ErrorPage />}>
                                <Component {...pageProps} />
                            </ErrorBoundary>,
                        )}
                    </ErrorBoundary>
                </LayoutProvider>
            </AppContextProvider>
        );
    } else {
        return (
            <AppContextProvider>
                <LayoutProvider>
                    <ManageLayout>
                        <ErrorBoundary fallback={<ErrorPage />}>
                            <Component {...pageProps} />
                        </ErrorBoundary>
                    </ManageLayout>
                </LayoutProvider>
            </AppContextProvider>
        );
    }
}
