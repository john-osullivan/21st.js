import React from 'react';
import { Component } from 'react';
import ReactMixin from 'react-mixin';


@ReactMixin.decorate(ReactMeteorData)
export default class GameLobby extends Component {
    state = {
        currentTurn : 'start'
    };

    getMeteorData(){

    }

    render(){
        return;
    }
}