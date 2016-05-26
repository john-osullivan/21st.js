import React from 'react';
import { Component } from 'react';
var ChallengeJSON = require('./../json/CHALLENGES.json');
var Markdown = require('react-markdown');
import MultipleChoice from "./MultipleChoice";

export default class GameChallenges extends Component {
    constructor(props){
        super(props);
        this.buildChallengeContent = this.buildChallengeContent.bind(this);
        this.buildChallengeAction = this.buildChallengeAction.bind(this);
    }

    buildChallengeContent(thisChallenge){
        var challengeContent = null;
        switch(this.props.currentChallenge){
            case (0):
                challengeContent = (
                    <div className='ui top attached segment'>
                        <h3 className='ui header'>The Rules</h3>
                        <div className='ui bulleted list'>
                            <div className='item'>The team with fewer people goes first.
                                If they have the same number of members, then it's chosen randomly.</div>
                            <div className='item'>
                                The challenges will alternate between batches of Javascript trivia/history questions
                                and Javascript programming questions, 3 challenges per batch.
                            </div>
                            <div className='item'>
                                If
                            </div>
                        </div>
                    </div>
                );
                break;
            case (22):
                challengeContent = (
                    <div className='ui top attached segment'>
                        <h3 className='ui header'>Congratulations, you made it!</h3>

                    </div>
                );
                break;
            default:
                challengeContent = (
                    <div className='ui top attached segment'>
                        <Markdown source={thisChallenge.text} />
                    </div>
                );
                break;
        }
        return challengeContent;
    }

    buildChallengeAction(thisChallenge){
        var challengeAction = null;

        switch(this.props.currentChallenge){
            case(0):
                challengeAction = (
                    <div className='ui bottom attached segment one column grid'>
                        <div className='column'>
                            <button onClick={this.props.advanceTurn} className='ui right floated positive button'>
                                Begin 21.js
                            </button>
                        </div>
                    </div>
                );
                break;
            case(22):
                challengeAction = (
                    <div className='ui bottom attached segment one column grid'>
                        <div className='column'>
                            <button onClick={this.props.restartGame} className='ui right floated positive button'>
                                Restart 21.js
                            </button>
                        </div>
                    </div>
                );
                break;
                break;
            default:
                challengeAction = (
                    <div className='ui bottom attached segment'>
                        <MultipleChoice
                            options={thisChallenge.options}
                            correctIndex={thisChallenge['correctIndex']}
                            challengeSucceeds={this.props.challengeSucceeds}
                            challengeFails={this.props.challengeFails}
                            />
                    </div>);
                break;
        }
        return challengeAction;
    }

    render(){
        console.log("Challenges: ",ChallengeJSON);
        var challenge = ChallengeJSON[this.props.currentChallenge];
        console.log("This challenge:",challenge);
        var challengeContent = this.buildChallengeContent(challenge);
        var challengeAction = this.buildChallengeAction(challenge);
        return (
            <div>
                <h2 className='ui dividing header'>
                    Challenge {this.props.currentChallenge}
                </h2>
                {challengeContent}
                {challengeAction}
            </div>
        );
    }
}