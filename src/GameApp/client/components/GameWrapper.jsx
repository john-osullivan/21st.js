import React from 'react';
import { Component } from 'react';

import 'GameApp/client/css/GameApp.import.css'

export default class GameApp extends Component {
    render(){
        return (
            <div id='gameContainer' className='ui container'>
                {this.props.children}
            </div>
        );
    }
}