import { Component, PropTypes } from 'react';

export default class TodoItem extends Component {
  static propTypes = {
    task: PropTypes.object.isRequired
  };

  handleChecked(e) {
    // Set the checked property to the opposite of its current value
    Meteor.call('setChecked', this.props.task._id, e.target.checked);
  }

  handleDelete() {
    Meteor.call('deleteTask', this.props.task._id);
  }

  handleSetPrivate() {
    Meteor.call('setChoice1', this.props.task._id, !this.props.task.private);
  }
  handleChoice2() {
    Meteor.call('setChoice2', this.props.task._id, !this.props.task.choice2);
  }
  handleChoice3() {
    Meteor.call('setChoice3', this.props.task._id, !this.props.task.choice3);
  }
  handleChoice4() {
    Meteor.call('setChoice4', this.props.task._id, !this.props.task.choice4);
  }

  renderAnswerChoices() {
    if (Meteor.userId() !== this.props.task.owner) {
      return null;
    }

    return (
      
      <div id="quizzie">
                <ul class="quiz-step step1 current">
      
                    <li class="quiz-answer low-value" data-quizIndex="2">
                        <div class="answer-wrap"> 
                            <button className="togglePrivate answer-text" onClick={this.handleSetPrivate.bind(this)}>
        {this.props.task.private ? 'This Thing' : 'WRONG'}
                  

                            </button> 
                        </div>
                    </li>
                    <li class="quiz-answer high-value" data-quizIndex="4">
                        <div class="answer-wrap"> 
                        <button className="toggleChoice2 answer-text" onClick={this.handleChoice2.bind(this)}>
        {this.props.task.choice2 ? 'That Thing' : 'RIGHT!'}
      </button>
                            
                        </div>
                    </li>
                    <li class="quiz-answer high-value" data-quizIndex="4">
                        <div class="answer-wrap"> 
                        <button className="toggleChoice3 answer-text" onClick={this.handleChoice3.bind(this)}>
        {this.props.task.choice3 ? 'That OTHER Thing' : 'WRONG!'}
      </button>
                            
                        </div>
                    </li>
                    <li class="quiz-answer high-value" data-quizIndex="4">
                        <div class="answer-wrap"> 
                        <button className="toggleChoice4 answer-text" onClick={this.handleChoice4.bind(this)}>
        {this.props.task.choice4 ? 'That Thing' : 'WRONG!'}
      </button>
                            
                        </div>
                    </li>
                </ul>
      </div>
    );
  }
  renderQuestion() {
    if (Meteor.userId() !== this.props.task.owner) {
      return null;
    }

    return (
      <ul class="quiz-step step1 ">
        <li class="question">
            <div class="question-wrap">
                <h2>{this.props.task.text}</h2>
            </div>
        </li>
      </ul>
    );
  }



  render() {
    let itemClass = '';

    if (this.props.task.checked) {
      itemClass += 'checked';
    }

    if (this.props.task.private) {
      itemClass += ' private';
    }
    if (this.props.task.choice2) {
      itemClass += ' choice2';
    }
    if (this.props.task.choice3) {
      itemClass += ' choice3';
    }
    if (this.props.task.choice4) {
      itemClass += ' choice4';
    }
    

    return (
      <li className={itemClass}>
        {this.renderQuestion()}
         {this.renderAnswerChoices()}


        <button className="delete" onClick={this.handleDelete.bind(this)}>&times;</button>
        <input type="checkbox" checked={this.props.task.checked} onChange={this.handleChecked.bind(this)} className="toggleChecked" />
       
        //<span className="text"><strong>{this.props.task.username}</strong> - {this.props.task.text}</span>
      </li>
    );
  }
}
