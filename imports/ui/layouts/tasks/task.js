import {Meteor} from 'meteor/meteor';
import {Template} from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import {Tasks} from '../../../api/tasks/tasks.js';

import './task.html';

window.Tasks = Tasks;

Template.currentTasks.onCreated(function bodyOnCreated() {
    Meteor.subscribe('tasks');
    this.state = new ReactiveDict;
    this.state.set('updateID', null);
});

Template.currentTasks.helpers({
    tasks() {
        return Tasks.find({});
    },
});

Template.task.events({
    'click .delete'() {
        Meteor.call('tasks.remove', this._id);
    },
    'click .update'(){
        event.preventDefault();
        Session.set("updateId", Tasks.findOne(this._id));
        $('#updateRecordModal').openModal();
    },
});

Template.tasksForm.events({
    'click .btn-floating'(){
        $('#updateRecordModal').closeModal();
    }
})

Template.currentTasks.helpers({
    findDoc() {
        console.log(Session.get("updateId"));
        return Session.get("updateId");
    },
});

Template.manage_tasks.rendered = function insertTasksFormCreated(){
    $(document).ready(function(){
        $('.collapsible').collapsible({
            accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
        });
    });
};




