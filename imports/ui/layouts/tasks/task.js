import {Meteor} from "meteor/meteor";
import {Template} from "meteor/templating";
import {ReactiveDict} from "meteor/reactive-dict";
import {Tasks} from "../../../api/tasks/tasks.js";
import "./task.html";

window.Tasks = Tasks;

function getTasks(instance){
    if (instance.state.get('hideCompleted')) {
        // If hide completed is checked, filter tasks
        return Tasks.find({ completed: { $ne: true } }, { sort: { createdAt: -1 } });
    }
    // Otherwise, return all of the tasks
    return Tasks.find({}, { sort: { createdAt: -1 } });
}

Template.currentTasks.onCreated(function bodyOnCreated() {
    Meteor.subscribe('tasks');
    this.state = new ReactiveDict;
    this.state.set('hideCompleted', false);
});

Template.currentTasks.helpers({
    tasks() {
        const instance = Template.instance();
        return getTasks(instance);
    },
    findDoc() {
        return Session.get("updateId");
    },
    mode(){
        return Session.get("mode");
    },
    tasksExist(){
        const instance = Template.instance();
        return getTasks(instance).count() > 0;
    }
});

Template.currentTasks.events({
    'click #addTask'(){
        Session.set("updateId", null);
        Session.set("mode", "insert");
        $('#updateRecordModal').openModal();
    },
    'change #completedSwitch'(event, instance){
        instance.state.set('hideCompleted', event.target.checked);
    }
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
    'click .markCompleted'(event){
        Meteor.call('tasks.setCompleted', this._id, event.target.checked);
    }
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




