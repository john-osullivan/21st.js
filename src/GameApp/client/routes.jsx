import React from 'react';
import { Route } from 'react-router';
import GameApp from './components/GameApp';
import GameLobby from './components/GameLobby';

export default (
    <Route>
        <Route path="/game" component={GameLobby} />
        <Route path="/game/:gameId" component={GameApp} />
    </Route>
);
