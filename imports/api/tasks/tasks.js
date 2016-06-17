// definition of the Tasks collection
import {Mongo} from 'meteor/mongo';
import {check} from 'meteor/check';

export const Tasks = new Mongo.Collection('tasks');

Tasks.allow({
    'insert': function (userId) {
        /* Check that the current user is the logged in user*/
        return Meteor.userId() == userId;
    },
    'update': function (userId) {
        /* Check that the current user is the logged in user*/
        return Meteor.userId() == userId;
    },
});


Tasks.attachSchema(new SimpleSchema({
    name: {
        type: String,
        label: "Name",
        max: 50,
    },
    type: {
        type: String,
        label: "Type",
        allowedValues: ['POMODORO', 'COUNTDOWN', 'TIMER'],
        autoform: {
            options: [
                {label: "Pomodoro", value: "POMODORO"},
                {label: "Countdown", value: "COUNTDOWN"},
                {label: "Timer", value: "TIMER"}
            ]
        }
    },
    description: {
        type: String,
        label: "Description",
        max: 220,
    },
    hours: {
        type: Number,
        label: "Hours",
        min: 0,
        optional: true,
    },
    minutes: {
        type: Number,
        label: "Minutes",
        min: 0,
        max: 59,
        optional: true,
    },
    seconds: {
        type: Number,
        min: 0,
        max: 59,
        optional: true,
    },
    estimatedPomodoros: {
        type: Number,
        label: "Estimated Pomodoro's",
        min: 1,
        optional: true,
    },
    owner: {
        type: String,
        label: "Owner",
        autoValue: function () {
            return Meteor.userId();
        },
    },
    createdAt: {
        type: Date,
        autoValue: function(){
            return new Date();
        },
    },

}));


Meteor.methods({
    'tasks.remove'(taskId) {
        check(taskId, String);

        const task = Tasks.findOne(taskId);
        if (task.owner !== this.userId) {
            // If the task is private, make sure only the owner can delete it
            throw new Meteor.Error('not-authorized');
        }

        Tasks.remove(taskId);
    },
});
