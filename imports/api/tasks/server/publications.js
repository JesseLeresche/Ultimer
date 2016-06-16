//all task-related publications
import {Tasks} from '../../../api/tasks/tasks.js';

if (Meteor.isServer) {
    // This code only runs on the server
    // Only publish tasks that are public or belong to the current user
    Meteor.publish('tasks', function tasksPublication() {
        /*return Tasks.find({
            $or: [
                { private: { $ne: true } },
                { owner: this.userId },
            ],
        });*/
        return Tasks.find();
    });
};

/*
Meteor.publishComposite("tasks", function() {
    return {
        find: function() {
            return Tasks.find({});
        }
        // ,
        // children: [
        //   {
        //     find: function(item) {
        //       return [];
        //     }
        //   }
        // ]
    }
});
*/
