import { Page } from "@/types/types";
import React, { useContext, useState } from "react";
import AppConfig from "@/layout/AppConfig";
const somepage: Page = () => {
  const [state, setState] = useState();
  return (
    <div>
      <p>lol</p>
    </div>
  );
};
somepage.getLayout = function getLayout(page) {
  return (
    <React.Fragment>
      {page}
      <AppConfig simple />
    </React.Fragment>
  );
};
export default somepage;
