import React from 'react';
import { Component } from 'react';
import ReactMixin from 'react-mixin';
import { Link } from 'react-router';

import GameLogin from './GameLogin';
import GameChallenges from './GameChallenges';
import GameScoreboard from './GameScoreboard.jsx';

import Games from 'GameApp/collections/Games';
import Modal from 'react-modal';
import Markdown from 'react-markdown';

const REWARDS = require('./../json/REWARDS.json');
const PENALTIES = require('./../json/PENALTIES.json');

const customStyles = {
    content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        width                 : '50%',
        transform             : 'translate(-50%, -50%)',
        backgroundColor       : 'white'
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
        this.deliverPenalty = this.deliverPenalty.bind(this);
        this.deliverReward = this.deliverReward.bind(this);
        this.advanceTurn = this.advanceTurn.bind(this);
        this.restartGame = this.restartGame.bind(this);
        this.updateTeam = this.updateTeam.bind(this);
    }

    state = {
        currentTurn : 'start',
        deliveringReward : false,
        deliveringPenalty: false,
        devMode : false
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
            var thisPlayer = _.find(thisGame.players, function(player){
                return player.userId === Meteor.user()._id
            });
            return {
                loading : false,
                game : thisGame,
                _id : thisGame._id,
                name : thisGame.name,
                players : thisGame.players,
                currentChallenge : thisGame.currentChallenge,
                currentTeam : thisGame.currentTeam,
                playerTeam : thisPlayer.team
            };
        }

    }

    updateTeam(event){
        console.log("Calling setPlayerTeam with gameId, userId, value: ", this.data._id, Meteor.user()._id, event.target.value);
        Meteor.call('setPlayerTeam', this.data._id, Meteor.user()._id, event.target.value)
    }

    makePenalty(team){
        var receivingTeam = team === 'red' ? 'Blue' : 'Red';
        var penalty = _.sample(_.values(PENALTIES));
        return (
            <Modal
                isOpen={this.state.deliveringPenalty}
                style={customStyles}
                >
                <div className='ui one column grid'>
                    Incorrect :(
                </div>
                <Markdown source={penalty.text} />
                <button className='ui right floated positive button' onClick={this.advanceTurn}>
                    Next Challenge
                </button>
            </Modal>
        )
    }

    makeReward(team){
        var receivingTeam = team === 'red' ? 'Red' : 'Blue';
        console.log("REWARDS['1']: ",REWARDS["1"].text);
        console.log("REWARDS: ",REWARDS);
        var reward = _.sample(_.values(REWARDS));
        return (
            <Modal
                isOpen = {this.state.deliveringReward}
                style = {customStyles}
                >
                <div className='ui one column grid'>
                    <div className='column'>
                        <div className='ui header'>
                            Correct!
                            </div>
                        <Markdown source={reward.text} />
                    </div>
                    <div className='column'>
                        <button className='ui right floated positive button' onClick={this.advanceTurn}>
                            Next Challenge
                        </button>
                    </div>
                </div>
            </Modal>
        )
    }

    challengeSucceeds(){
        Meteor.call('incrementScore', this.data.game._id, this.data.currentTeam);
        this.deliverReward();
    }

    challengeFails(){
        this.deliverPenalty();
    }

    deliverReward(){
        console.log("deliveringReward");
        this.setState({
            deliveringReward : true
        })
    }

    deliverPenalty(){
        this.setState({
            deliveringPenalty : true
        })
    }

    nextChallenge(){
        Meteor.call('nextChallenge', this.data.game._id);
    }

    lastChallenge(){
        Meteor.call('lastChallenge', this.data.game._id);
    }

    addNewPlayer(){
        var thisUser = Meteor.user();
        Meteor.call('addPlayer', this.data.game._id, thisUser._id, thisUser.username, 'spectator');
    }

    advanceTurn(){
        this.setState({
            deliveringPenalty : false,
            deliveringReward : false
        });
        this.nextChallenge();
        Meteor.call('changeCurrentTeam', this.data.game._id);
    }

    restartGame(){
        Meteor.call('restartGame', this.data.game._id);
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

            var renderingModal = null;
            if (this.state.deliveringPenalty){
                renderingModal = this.makePenalty(this.data.currentTeam);
            } else if (this.state.deliveringReward){
                renderingModal = this.makeReward(this.data.currentTeam);
            }

            var devButtons = (
                <div className='sixteen wide column'>
                    <button className='ui button' onClick={this.deliverPenalty}>
                        Deliver Penalty
                    </button>
                    <button className='ui button' onClick={this.deliverReward}>
                        Deliver Reward
                    </button>
                    <button className='ui button' onClick={this.lastChallenge}>
                        Last Challenge
                    </button>
                    <button className='ui button' onClick={this.nextChallenge}>
                        Next Challenge
                    </button>
                </div>
            );
            console.log('renderingModal: ',renderingModal);

            return (
                <div className='ui grid'>
                    <div className='sixteen wide column'>
                        <GameLogin /> {" | "} <Link to='/game'>Back to Lobby</Link>
                    </div>

                    <div className='twelve wide column'>
                        {renderingModal}
                        <GameChallenges
                            currentChallenge={this.data.currentChallenge}
                            makePenalty={this.makePenalty}
                            makeReward={this.makeReward}
                            nextChallenge={this.nextChallenge}
                            challengeSucceeds={this.challengeSucceeds}
                            challengeFails={this.challengeFails}
                            advanceTurn={this.advanceTurn}
                            restartGame={this.restartGame}
                            />
                        {  }
                    </div>
                    <div className='four wide column'>
                        <GameScoreboard
                            game={this.data.game}
                            name={this.data.name}
                            players={this.data.players}
                            currentChallenge={this.data.currentChallenge}
                            currentTeam={this.data.currentTeam}
                            updateTeam={this.updateTeam}
                            playerTeam={this.data.playerTeam}
                            />
                    </div>
                </div>
            );
        }
    }
}