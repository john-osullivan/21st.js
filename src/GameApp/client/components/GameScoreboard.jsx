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
        var redCellClass = this.props.currentTeam === 'red' ? 'active' : null;
        var blueCellClass = this.props.currentTeam === 'blue' ? 'active' : null;
        return (
            <div>
                <h2 className='ui dividing header'>
                    {this.props.name}
                </h2>
                <table className='two column table celled ui'>
                    <thead><tr><th className='redHeading'>Red Team</th><th className='blueHeading'>Blue Team</th></tr></thead>
                    <tbody><tr>
                        <td className={redCellClass}>
                            <div className='ui large horizontal statistic'>
                                <div className='value'>{this.props.game.red.score}</div>
                                <div className='label'>points</div>
                            </div>
                        </td>
                        <td className={blueCellClass}>
                            <div className='ui large horizontal statistic'>
                                <div className='value'>{this.props.game.blue.score}</div>
                                <div className='label'>points</div>
                            </div>
                        </td></tr>
                    </tbody>
                </table>
                <h3>Your Team</h3>
                <select value={this.props.playerTeam} onChange={this.props.updateTeam}>
                    <option value='red' onChange={()=>{this.props.updateTeam('red')}}>Red</option>
                    <option value='blue' onChange={()=>{this.props.updateTeam('blue')}}>Blue</option>
                    <option value='spectator' onChange={()=>{this.props.updateTeam('spectator')}}>Spectator</option>
                </select>
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