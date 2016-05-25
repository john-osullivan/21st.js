import { Meteor } from 'meteor/meteor';
import Games from 'GameApp/collections/Games';

Meteor.methods({
    createGame : function(gameArgs){
        Games.insert({
            name : gameArgs.name,
            players : gameArgs.players,
            currentChallenge : gameArgs.currentChallenge,
            currentTeam : gameArgs.currentTeam,
            red : {
                score : 0,
                effects : []
            },
            blue : {
                score : 0,
                effects : []
            }
        })
    },
    addPlayer: function(gameId, userId, username, team){
        console.log("Receiving addPlayer with: ",gameId, userId, username, team);
        Games.update({
                _id : gameId
            },
            {
                $addToSet: {
                players : {
                    userId : userId,
                    username : username,
                    drinks : 0,
                    team : team
                }
            }
        })
    },
    nextChallenge : function(gameId){
        var game = Games.findOne({_id : gameId});
        if (game.currentChallenge < 22){
            Games.update({
                _id : gameId
            }, {
                $inc : { currentChallenge : 1 }
            });
        } else {
            console.log("Tried to go to the challenge after 22, no can do.");
        }
    },
    lastChallenge : function(gameId){
        var game = Games.findOne({_id : gameId});
        if (game.currentChallenge > 0){
            Games.update({
                _id : gameId
            }, {
                $inc : { currentChallenge : -1}
            });
        } else {
            console.log("Tried to go to challenge before 0, no can do.")
        }
    },
    changeCurrentTeam : function(gameId){
        var game = Games.findOne({_id : gameId});
        var newVal = game.currentTeam === 'red' ? 'blue' : 'red';
        Games.update({
            _id : gameId
        }, {
            $set : {
                currentTeam : newVal
            }
        })
    },
    incrementScore : function(gameId, team){
        var game = Games.findOne({_id : gameId});
        if (team === 'red'){
            Games.update({
                _id : gameId
            },{
                $inc : { "red.score" : 1}
            })
        } else {
            Games.update({
                _id : gameId
            },{
                $inc : { "blue.score" : 1}
            })
        }

    },
    decrementScore : function(gameId, team){

    }
});