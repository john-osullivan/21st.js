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
    addPlayer(gameId, userId, username){
        Games.update({
                _id : gameId
            },
            {
                $addToSet: {
                players : {
                    userId : userId,
                    username : username,
                    drinks : 0
                }
            }
        })
    },
    assignDrinks : function(gameId, userId, drinkCount){

    },
    transitionTurn : function(gameId){

    },
    heartbeat : function(gameId, userId){

    }
});