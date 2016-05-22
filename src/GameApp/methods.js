import { Meteor } from 'meteor/meteor';
import Games from 'GameApp/collections/Games';

Meteor.methods({
    createGame : function(gameName){
        Games.insert({
            name : gameName,
            players : [{
                userId : Meteor.user()._id,
                username : Meteor.user().username,
                drinks : 0
            }],
            currentQuestion : 'start',
            currentTeam : 'red'
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