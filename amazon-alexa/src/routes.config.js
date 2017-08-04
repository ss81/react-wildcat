import React from "react";
import {IndexRoute, Redirect, Route} from "react-router";

import ApplicationContext from "./components/Application/ApplicationContext.js";

import * as indexExampleRoutes from "./routes/IndexExample/routes.js";
import * as errorExampleRoutes from "./routes/ErrorExample/routes.js";
import * as helmetExampleRoutes from "./routes/HelmetExample/routes.js";

const ApplicationRoutes = (
    <Route component={ApplicationContext} path="/">
        <IndexRoute {...indexExampleRoutes} />

        <Route {...errorExampleRoutes} />
        <Route {...helmetExampleRoutes} />

        <Redirect from="/redirect" to="/flexbox-example" />
    </Route>
);

export default ApplicationRoutes;
