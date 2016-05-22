import React from 'react';
import { Component, PropTypes } from 'react';
import { BlazeToReact } from 'meteor/thereactivestack:blazetoreact';

const LoginButtons = BlazeToReact('loginButtons');

export default class TodoHeader extends Component {
  static propTypes = {
    hideCompleted: PropTypes.bool,
    toggleHideCompleted: PropTypes.func.isRequired,
    incompleteCount: PropTypes.number.isRequired
  };

  handleSubmit(event) {
    // Prevent default browser form submit
    event.preventDefault();
    console.log("ohhshitwhatup")
     console.log(event.target.A1.value);
    // Get value from form element
    var text = event.target.text.value;
    var A1 = event.target.A1.value;
    var A2 = event.target.A2.value;
    var A3 = event.target.A3.value;
    var A4 = event.target.A4.value;
    console.log(A4);
    // Insert a task into the collection
    Meteor.call('addTask', text, A1, A2, A3, A4);

    // Clear form
    event.target.text.value = '';
  }

  render() {
    let form = null;

    if (Meteor.userId()) {
      form = (
        <div>
        <form className="newTask" onSubmit={this.handleSubmit.bind(this)} id ="form1">
          <input type="text" name="text" placeholder="Type to add a new question" />
          <input type="A1" name="A1" placeholder="Type to add a new answer" />
          <input type="A2" name="A2" placeholder="Type to add a new answer" />
          <input type="A3" name="A3" placeholder="Type to add a new answer" />
          <input type="A4" name="A4" placeholder="Type to add a new answer" />
        </form>
        <button type="submit" form="form1" value="Submit">Submit</button>
        </div>
      );
    }

    return (
      <header>
        <h1>
          <img src={require('TodoApp/client/img/check.png')} alt="" />
           21.JS ({this.props.incompleteCount})
        </h1>

        <label className="hideCompleted">
          <input type="checkbox" checked={this.props.hideCompleted} onChange={this.props.toggleHideCompleted} />
          
        </label>

        <LoginButtons />

        {form}
      </header>
    );
  }
}
