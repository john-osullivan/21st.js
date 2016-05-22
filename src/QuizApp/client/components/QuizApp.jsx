import React from 'react';
import { Component } from 'react';
import ReactMixin from 'react-mixin';

import QuizQuestions from './QuizQuestions';
import QuizSetup from './QuizSetup.jsx';

@ReactMixin.decorate(ReactMeteorData)
export default class QuizMain extends Component {
    state = {
        currentTurn : 'start'
    };

    render(){
        return (
            <div className='container ui grid'>
                <div className='twelve wide column'>
                    <GameLogin />
                    <QuizQuestions />
                </div>
                <div className='four wide column'>
                    <QuizSetup />
                </div>
            </div>
        );
    }
}