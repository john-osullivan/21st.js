import React from 'react';
import { Component } from 'react';


export default class MultipleChoice extends Component {
    constructor(props){
        super(props);
        this.updateAnswer = this.updateAnswer.bind(this);
        this.buildAnswers = this.buildAnswers.bind(this);
        this.checkAnswer = this.checkAnswer.bind(this);
    }

    state = {
        selectedAnswer : 'none'
    };

    checkAnswer(){
        if (this.state.selectedAnswer === this.props.options[this.props.correctIndex]){
            this.props.challengeSucceeds();
        } else {
            this.props.challengeFails();
        }
    };

    buildAnswers(){
        if (_.has(this.state, 'optionOrder')){
            return _.map(this.state.optionOrder, function(optionIndex, key){
                var option = this.props.options[optionIndex];
                var optionClasses = this.state.selectedAnswer === option ?
                    'ui green basic button' :
                    'ui basic button';
                return (
                    <button className={optionClasses} key={key} onClick={()=>{this.updateAnswer(option)}}>
                        {option}
                    </button>
                );
            }.bind(this))
        } else {
            return _.shuffle(_.map(this.props.options, function(option, key){
                var optionClasses = this.state.selectedAnswer === option ?
                    'ui green basic button' :
                    'ui basic button';
                return (
                    <button className={optionClasses} key={key} onClick={()=>{this.updateAnswer(option)}}>
                        {option}
                    </button>
                );
            }.bind(this)));
        }

    }

    componentDidMount(){
        var optionOrder = _.shuffle(_.range(this.props.options.length));
        this.setState({
            optionOrder : optionOrder
        });
        console.log('this.state after componentDidMount()');
    }

    updateAnswer(option){
        this.setState({
            selectedAnswer : option
        })
    }

    render(){
        var answers = _.has(this.state, 'options') ? this.state.options : this.buildAnswers();
        var submitClasses = this.state.selectedAnswer !== 'none' ?
            'ui right floated fluid positive button' :
            'ui right floated fluid positive disabled button';
        return (
            <div className='ui form grid'>
                <div className='twelve wide column'>
                    <div className='two ui basic buttons'>
                        {answers.slice(0, 2)}
                    </div>
                    <div className='two ui basic buttons'>
                        {answers.slice(2)}
                    </div>
                </div>
                <div className='four wide column'>
                    <button className={submitClasses} onClick={this.checkAnswer}>Submit Answer</button>
                </div>
            </div>
        );
    }
}