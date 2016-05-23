import React from 'react';
import { Route } from 'react-router';
import GameApp from './components/GameApp';
import GameLobby from './components/GameLobby';
import GameWrapper from './components/GameWrapper';

export default (
    <Route component={GameWrapper}>
        <Route path="/game" component={GameLobby} />
        <Route path="/game/:gameId" component={GameApp} />
    </Route>
);
