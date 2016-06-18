import {Meteor} from "meteor/meteor";
import {Template} from "meteor/templating";
import {ReactiveDict} from "meteor/reactive-dict";
import {Tasks} from "../../../api/tasks/tasks.js";
import "./task.html";

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
    findDoc() {
        console.log(Session.get("updateId"));
        return Session.get("updateId");
    },
    mode(){
        return Session.get("mode");
    },
});

Template.currentTasks.events({
    'click #addTask'(){
        Session.set("updateId", null);
        Session.set("mode", "insert");
        $('#updateRecordModal').openModal();
    },
});

Template.task.events({
    'click .delete'() {
        Meteor.call('tasks.remove', this._id);
    },
    'click .update'(){
        Session.set("updateId", Tasks.findOne(this._id));
        Session.set("mode", "update");
        $('#updateRecordModal').openModal();
    },
    'click .select'(){
        event.preventDefault();
        alert("Add time to Timer");
    },
});

Template.tasksForm.events({
    'click .btn-floating'(){
        $('#updateRecordModal').closeModal();
    }
});

Template.manage_tasks.rendered = function insertTasksFormCreated(){
    $(document).ready(function(){
        $('.collapsible').collapsible({
            accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
        });
    });
};




