import { Mongo } from 'meteor/mongo';
const Games = new Mongo.Collection("games");

const GameSchema = new SimpleSchema({
    name : {
        type : String
    },
    players : {
        type : Array
    },
    "players.$" : {
        type : Object
    },
    "players.$.userId" : {
        type : String
    },
    "players.$.username" : {
        type : String
    },
    "players.$.drinks" : {
        type : Number,
        min : 0
    },
    "players.$.team" : {
        type : String,
        allowedValues : ['red', 'blue', 'spectator']
    },
    currentChallenge : {
        type : Number,
        min : 0,
        max : 22
    },
    currentTeam : {
        type : String,
        allowedValues : ['red', 'blue']
    },
    updatedAt : {
        type: Date,
        autoValue: function(){
            if (this.isInsert){
                return new Date();
            } else if (this.isUpdate) {
                return new Date();
            } else if (this.isUpsert){
                return new Date();
            } else {
                return new Date();
            }
        }
    }
});

Games.attachSchema(GameSchema);

export default Games;