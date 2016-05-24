import React from 'react';
import { Component } from 'react';
import ReactMixin from 'react-mixin';
import { Link } from 'react-router';

import GameLogin from './GameLogin';
import GameChallenges from './GameChallenges';
import GameScoreboard from './GameScoreboard.jsx';

import Games from 'GameApp/collections/Games';
import Modal from 'react-modal';

const REWARDS = [

];

const PENALTIES = [

];

const customStyles = {
    content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)'
    }
};

@ReactMixin.decorate(ReactMeteorData)
export class GameApp extends Component {
    constructor(props){
        super(props);
        this.addNewPlayer = this.addNewPlayer.bind(this);
        this.makePenalty = this.makePenalty.bind(this);
        this.makeReward = this.makeReward.bind(this);
        this.nextChallenge = this.nextChallenge.bind(this);
        this.lastChallenge = this.lastChallenge.bind(this);
        this.challengeFails = this.challengeFails.bind(this);
        this.challengeSucceeds = this.challengeSucceeds.bind(this);
    }

    state = {
        currentTurn : 'start',
        deliveringReward : false,
        deliveringPenalty: false
    };

    getMeteorData(){
        var gameId = this.props.params.gameId;
        var gameHandle = Meteor.subscribe('game', gameId);
        if (!gameHandle.ready()){
            return {
                loading : true
            };
        } else {
            var thisGame = Games.find({ _id : gameId}).fetch()[0];
            return {
                loading : false,
                game : thisGame,
                name : thisGame.name,
                players : thisGame.players,
                currentChallenge : thisGame.currentChallenge,
                currentTeam : thisGame.currentTeam
            };
        }

    }

    addNewPlayer(){
        var thisUser = Meteor.user();
        Meteor.call('addPlayer', this.data.game._id, thisUser._id, thisUser.username, 'spectator');
    }

    makePenalty(team){
        var receivingTeam = team === 'red' ? 'Blue' : 'Red';
        return (
            <Modal></Modal>
        )
    }

    makeReward(team){
        var receivingTeam = team === 'red' ? 'Red' : 'Blue';
        return (
            <Modal></Modal>
        )
    }44

    challengeSucceeds(){
        console.log("Answer was correct!");
    }

    challengeFails(){
        console.log("Answer was incorrect.");
    }

    nextChallenge(){
        Meteor.call('nextChallenge', this.data.game._id);
    }

    lastChallenge(){
        Meteor.call('lastChallenge', this.data.game._id);
    }

    render(){
        console.log("this.data in GameApp.render(): ",this.data);
        if (this.data.loading){
            return (
                <div className='ui message'>
                    <div className='header'>One Moment Please...</div>
                    <div>
                        The server is fetching you the game.
                    </div>
                </div>
            );
        } else {
            var thisUser = Meteor.user();
            if (Meteor.user() !== null &&_.find(this.data.players, function(player){
                    return player.userId === thisUser._id;
                }) === undefined) {
                console.log("Current user isn't a player, adding now.");
                this.addNewPlayer();
            }

            return (
                <div className='ui grid'>
                    <div className='sixteen wide column'>
                        <GameLogin /> {" | "} <Link to='/game'>Back to Lobby</Link>
                    </div>
                    <div className='sixteen wide column'>
                        <button className='ui button'>Deliver Penalty</button>
                        <button className='ui button'>Deliver Reward</button>
                        <button className='ui button' onClick={this.lastChallenge}>
                            Last Challenge
                        </button>
                        <button className='ui button' onClick={this.nextChallenge}>
                            Next Challenge
                        </button>
                    </div>
                    <div className='twelve wide column'>
                        <GameChallenges
                            currentChallenge={this.data.currentChallenge}
                            makePenalty={this.makePenalty}
                            makeReward={this.makeReward}
                            nextChallenge={this.nextChallenge}
                            challengeSucceeds={this.challengeSucceeds}
                            challengeFails={this.challengeFails}
                            />
                        {  }
                    </div>
                    <div className='four wide column'>
                        <GameScoreboard
                            name={this.data.name}
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