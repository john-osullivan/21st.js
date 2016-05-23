import React from 'react';
import { Component } from 'react';
import ReactMixin from 'react-mixin';
import { Link } from 'react-router';
import Games from './../../collections/Games';


import { BlazeToReact } from 'meteor/thereactivestack:blazetoreact';

const LoginButtons = BlazeToReact('loginButtons');


@ReactMixin.decorate(ReactMeteorData)
export default class GameLobby extends Component {
    constructor(props){
        super(props);
        this.updateGameName = this.updateGameName.bind(this);
        this.submitNewGame = this.submitNewGame.bind(this);
    }


    state = {
        currentTurn : 'start',
        newGameName : ''
    };

    getMeteorData(){
        var gamesHandle = Meteor.subscribe('games');
        console.log("is gamesHandle.ready()? :",gamesHandle.ready());
        if (gamesHandle.ready()){
            var allGames = Games.find({}).fetch();
            return {
                loading : false,
                games : allGames
            }
        } else {
            return {
                loading : true
            }
        }
    }

    submitNewGame(){
        var thisUser = Meteor.user();
        if (thisUser !== null){
            var gameArgs = {
                name : this.state.newGameName,
                players : [{
                    userId : thisUser._id,
                    username : thisUser.username,
                    drinks : 0,
                    team : 'none'
                }],
                currentChallenge : 0,
                currentTeam : 'red'
            };
            console.log("making game with args: ",gameArgs);
            Meteor.call('createGame', gameArgs);
        } else {

        }
        this.setState({newGameName : ''});
    }

    updateGameName(event){
        this.setState({
            newGameName : event.target.value
        })
    }

    render(){
        if (this.data.loading){
            return (
                <div className='ui message'>
                    <div className='header'>One Moment Please...</div>
                    The server will finish lobbing you the lobbies in just an instant.
                </div>
            );
        } else {
            var gameElts = _.map(this.data.games, function(game, key){
                var visibleUsers;
                var remainingUserCount = 0;
                if (game.players.length > 6){
                    visibleUsers = game.players.slice(0, 6);
                    remainingUserCount = game.players.length - 6;
                } else {
                    visibleUsers = game.players;
                }
                var usersString = _.reduce(visibleUsers, function(userString, nextUser){
                    var returnString = userString;
                    if (userString.length > 0){
                        returnString += ', ';
                    }
                    return returnString + nextUser.username;
                }, '');
                var othersString = remainingUserCount > 0 ?
                ' and ' + remainingUserCount + ' others.' : '.';
                var descriptionString = usersString + othersString;
                return (
                    <div className='item' key={key}>
                        <div className='content'>
                            <Link className='header' to={'/game/'+game._id}>
                                Game #:{game._id}
                            </Link>
                            <div className='description'>
                                {descriptionString}
                            </div>
                        </div>
                    </div>
                );
            }.bind(this));
            var createGame = Meteor.user() !== null ?
                (<div className='ui action fluid input'>
                    <input type='text' value={this.state.newGameName} onChange={this.updateGameName} />
                    <button className='ui button' onClick={this.submitNewGame}>
                        Create New Game
                    </button>
                </div>) :
                (<LoginButtons />);
            return (
                <div className='ui two column centered grid'>
                    <div className='sixteen wide column'>
                        <h1 className='ui center aligned gameHeader header'>
                            21st.js {' | '}
                            <small> A drinking game in honor of Javascript's 21st birthday.</small>
                        </h1>
                    </div>
                    <div className='three wide column' />
                    <div className='ten wide column'>
                        <div className='ui form'>
                            {createGame}
                        </div>
                    </div>
                    <div className='three wide column' />
                    <div className='column'>
                        <h2 className='ui header'>Games</h2>
                        <div className='ui relaxed divided list'>
                            {gameElts}
                        </div>
                    </div>
                </div>
            )
        }
    }
}