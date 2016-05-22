import React from 'react';
import { Component } from 'react';
import ReactMixin from 'react-mixin';

import GameQuestions from './GameQuestions';
import GameScoreboard from './GameScoreboard.jsx';

@ReactMixin.decorate(ReactMeteorData)
export default class QuizMain extends Component {
    state = {
        currentTurn : 'start'
    };

    getMeteorData(){
        var gameId = this.props.params.gameId;
    }

    render(){
        return (
            <div className='container ui grid'>
                <div className='twelve wide column'>
                    <GameLogin />
                    <GameQuestions />
                </div>
                <div className='four wide column'>
                    <GameScoreboard />
                </div>
            </div>
        );
    }
}