// definition of the Tasks collection
import {Mongo} from 'meteor/mongo';
import {check} from 'meteor/check';

export const Tasks = new Mongo.Collection('tasks');

Tasks.allow({
    'insert': function (userId, doc) {
        /* user and doc checks ,
         return true to allow insert */
        return true;
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
    userId: {
        type: String,
        label: "Owner",
        autoValue: function(){
            return Meteor.userId();
        },
    },
}));


/*
 Meteor.methods({
 'tasks.insert'(text) {
 check(text, String);

 // Make sure the user is logged in before inserting a task
 if (! this.userId) {
 throw new Meteor.Error('not-authorized');
 }

 Tasks.insert({
 text,
 createdAt: new Date(),
 owner: this.userId,
 username: Meteor.users.findOne(this.userId).username,
 });
 },
 'tasks.remove'(taskId) {
 check(taskId, String);

 const task = Tasks.findOne(taskId);
 if (task.private && task.owner !== this.userId) {
 // If the task is private, make sure only the owner can delete it
 throw new Meteor.Error('not-authorized');
 }

 Tasks.remove(taskId);
 },
 'tasks.setChecked'(taskId, setChecked) {
 check(taskId, String);
 check(setChecked, Boolean);

 const task = Tasks.findOne(taskId);
 if (task.private && task.owner !== this.userId) {
 // If the task is private, make sure only the owner can check it off
 throw new Meteor.Error('not-authorized');
 }

 Tasks.update(taskId, { $set: { checked: setChecked } });
 },
 'tasks.setPrivate'(taskId, setToPrivate) {
 check(taskId, String);
 check(setToPrivate, Boolean);

 const task = Tasks.findOne(taskId);

 // Make sure only the task owner can make a task private
 if (task.owner !== this.userId) {
 throw new Meteor.Error('not-authorized');
 }

 Tasks.update(taskId, { $set: { private: setToPrivate } });
 },
 });*/
