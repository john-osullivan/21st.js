import React from 'react';
import { Route } from 'react-router';
import { ReactRouterSSR } from 'meteor/reactrouter:react-router-ssr';
import todoRoutes from 'TodoApp/client/routes';
import quizRoutes from 'GameApp/client/routes';

ReactRouterSSR.Run(
  <Route>
    {todoRoutes}
    {quizRoutes}
  </Route>
);
