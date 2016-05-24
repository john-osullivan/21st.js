import { Meteor } from 'meteor/meteor';
import Games from 'GameApp/collections/Games';

Meteor.methods({
    createGame : function(gameArgs){
        Games.insert({
            name : gameArgs.name,
            players : gameArgs.players,
            currentChallenge : gameArgs.currentChallenge,
            currentTeam : gameArgs.currentTeam
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
    assignDrinks : function(gameId, userId, drinkCount){

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
    heartbeat : function(gameId, userId){

    }
});