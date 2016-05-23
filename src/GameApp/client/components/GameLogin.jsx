import React from 'react';
import { Component } from 'react';
import ReactMixin from 'react-mixin';

import { BlazeToReact } from 'meteor/thereactivestack:blazetoreact';

const LoginButtons = BlazeToReact('loginButtons');


@ReactMixin.decorate(ReactMeteorData)
export default class GameApp extends Component {

    render(){
        if (Meteor.user() !== null){
            return null;
        } else {
            return (
                <div>
                    <div className='ui attached message'>
                        <div className='header'>
                            Welcome!
                        </div>
                        Please pick a username and sign in so we can add you to the game.
                    </div>
                    <div className='ui form'>
                        {LoginButtons}
                    </div>
                </div>
            )
        }
    }
}