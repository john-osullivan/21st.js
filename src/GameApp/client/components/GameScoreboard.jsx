import React from 'react';
import { Component } from 'react';

export default class GameScoreboard extends Component {
    constructor(props){
        super(props);
    }

    buildPlayerItem(player){
        var drinkTally = '';
        return (
            <div className='item'>
                <div className='header'>
                    {'@'+player.username}
                </div>
            </div>
        )
    }

    render(){
        var teams = _.groupBy(this.props.players, function(player){return player.team});
        console.log("teams: ",teams);
        var redPlayers = _.map(teams.red,
            function(player){return this.buildPlayerItem(player)}.bind(this));
        var bluePlayers = _.map(teams.blue,
            function(player){return this.buildPlayerItem(player)}.bind(this));
        var spectators = _.map(teams.spectator,
            function(player){return this.buildPlayerItem(player)}.bind(this));
        console.log("redPlayers: ",redPlayers);
        console.log("bluePlayers: ",bluePlayers);
        return (
            <div>
                <h2 className='ui dividing header'>
                    {this.props.name}
                </h2>
                <table className='two column table celled ui'>
                    <thead><tr><th className='redHeading'>Red Team</th><th className='blueHeading'>Blue Team</th></tr></thead>
                    <tbody><tr><td>redscore</td><td>bluescore</td></tr></tbody>
                </table>
                Current Turn: Team {this.props.currentTeam}
                <h3 className='ui header inverted red'>Red Team</h3>
                <div className='ui divided horizontal list'>
                    {redPlayers}
                </div>
                <h3 className='ui header inverted blue'>Blue Team</h3>
                <div className='ui divided horizontal list'>
                    {bluePlayers}
                </div>
                <h3 className='ui violet inverted header'>Spectators</h3>
                <div className='ui divided horizontal list'>
                    {spectators}
                </div>
            </div>
        );
    }
}