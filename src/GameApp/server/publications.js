import { Meteor } from 'meteor/meteor';
import Games from 'GameApp/collections/Games';

Meteor.publish('games', function(){
    return Games.find({}, {fields : {name : 1, players : 1}});
});

Meteor.publish('game', function(gameId){
    return Games.find({
        _id : gameId
    })
});