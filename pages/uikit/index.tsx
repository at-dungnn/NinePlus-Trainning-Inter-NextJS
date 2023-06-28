import { ErrorBoundary } from "@/shared/error";
import { Page, childNode } from "@/types/layout";
import React from "react";

const uiKitPage = ({ children }: childNode) => {
  return (
    <>
      <ErrorBoundary>
        <h1>this is Uikit</h1>
        {children}
      </ErrorBoundary>
    </>
  );
};
export default uiKitPage;
