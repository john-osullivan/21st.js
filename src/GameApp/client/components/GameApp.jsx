import React from 'react';
import { Component } from 'react';
import ReactMixin from 'react-mixin';

import GameLogin from './GameLogin';
import GameQuestions from './GameChallenges';
import GameScoreboard from './GameScoreboard.jsx';

import Games from 'GameApp/collections/Games';

@ReactMixin.decorate(ReactMeteorData)
export default class GameApp extends Component {
    state = {
        currentTurn : 'start'
    };

    getMeteorData(){
        var gameId = this.props.params.gameId;
        var gameHandle = Meteor.subscribe('game', gameId);
        if (gameHandle.ready()){
            var thisGame = Games.findOne({ _id : gameId});
            console.log('thisGame: ',thisGame);
            return {
                game : thisGame,
                name : thisGame.name,
                players : thisGame.players,
                currentChallenge : thisGame.currentChallenge,
                currentTeam : thisGame.currentTeam
            }
        } else {
            return {loading : true}
        }
    }

    render(){
        if (this.data.loading){
            return (
                <div className='ui message'>
                    <div className='header'>One Moment Please...</div>
                    The server is fetching you the game.
                </div>
            );
        } else {
            return (
                <div className='ui grid'>
                    <div className='sixteen wide column'>
                        <h1 className='ui header'>
                            {this.data.game.name}
                            <small>21st.js</small>
                        </h1>
                    </div>
                    <div className='twelve wide column'>
                        <GameLogin />
                        <GameQuestions />
                    </div>
                    <div className='four wide column'>
                        <GameScoreboard
                            game={this.data.game}
                            players={this.data.players}
                            currentChallenge={this.data.currentChallenge}
                            currentTeam={this.data.currentTeam}
                            />
                    </div>
                </div>
            );
        }
    }
}