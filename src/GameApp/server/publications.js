import { Meteor } from 'meteor/meteor';
import Games from 'GameApp/collections/Games';

console.log("Running our publications.js...");

Meteor.publish('games', function(){
    console.log("Somebody must've subscribed to 'games' just now.");
    return Games.find({}, {fields : {name : 1, players : 1}});
});

Meteor.publish('game', function(gameId){
    console.log("Somebody must've subscribed to 'game' just now.");
    return Games.find({
        _id : gameId
    })
});