import {Meteor} from 'meteor/meteor';
import {Template} from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import {Tasks} from '../../../api/tasks/tasks.js';

import './task.html';

window.Tasks = Tasks;

Template.currentTasks.onCreated(function bodyOnCreated() {
    Meteor.subscribe('tasks');
});

Template.currentTasks.helpers({
    tasks() {
        return Tasks.find({});
    },
});

Template.insertTasksForm.onCreated(function insertTasksFormCreated(){
    this.state = new ReactiveDict;
    this.state.set('newTaskIcon','add');
    this.state.set('newTaskFormClass','hide');
});

Template.insertTasksForm.events({
    'click #toggleNewTasks': function (event, instance) {
        event.preventDefault();
        instance.state.set('newTaskIcon', instance.state.get('newTaskIcon') == 'add' ? 'clear_all' : 'add');
        instance.state.set('newTaskFormClass', instance.state.get('newTaskFormClass') == 'hide' ? 'show' : 'hide');
    },
});

Template.insertTasksForm.helpers({
    getNewTaskIcon(){
        return Template.instance().state.get('newTaskIcon');
    },
    getNewTaskFormClass(){
        return Template.instance().state.get('newTaskFormClass');
    },
});

Template.manage_tasks.rendered = function insertTasksFormCreated(){
    $(document).ready(function(){
        $('.collapsible').collapsible({
            accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
        });
    });
};




