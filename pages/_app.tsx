import type { AppProps } from "next/app";
import type { Page } from "@/types/types";
import React from "react";
import { LayoutProvider } from "@/layout/context/LayoutContext";
import Layout from "@/layout/layout";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import "primeicons/primeicons.css";
import "@/styles/layout/layout.scss";
import "@/styles/page/page.scss";
import "@/styles/demo/Demos.scss";
import { ErrorBoundary } from "@/shared/error";
import ErrorPage from "./auth/error";

type Props = AppProps & {
    Component: Page;
};

export default function MyApp({
    Component,
    pageProps,
}: Props): React.ReactNode {
    if (Component.getLayout) {
        return (
            <LayoutProvider>
                <ErrorBoundary fallback={<ErrorPage />}>
                    {Component.getLayout(
                        <ErrorBoundary fallback={<ErrorPage />}>
                            <Component {...pageProps} />
                        </ErrorBoundary>
                    )}
                </ErrorBoundary>
            </LayoutProvider>
        );
    } else {
        return (
            <LayoutProvider>
                <Layout>
                    <ErrorBoundary fallback={"error"}>
                        <Component {...pageProps} />
                    </ErrorBoundary>
                </Layout>
            </LayoutProvider>
        );
    }
}
