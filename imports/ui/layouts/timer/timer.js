import {Template} from "meteor/templating";
import {ReactiveDict} from "meteor/reactive-dict";
import "../tasks/task.js";
import "./timer.html";

var interval;
const initialOffset = '0';

function formatTime(remainingTime) {
    let minutes = Math.floor(remainingTime / 60);
    let seconds = remainingTime % 60;
    return addZeroToFront(minutes) + ':' + addZeroToFront(seconds);
}

function addZeroToFront(value) {
    return value > 9 ? value : '0' + value;
}

function getInstanceValue(key){
    return Template.instance().state.get(key);
}

function convertTimeToSeconds(minutes, seconds) {
    return parseInt(seconds, 10) + (parseInt(minutes, 10) * 60);
}

function restartTimer(time){
    clearInterval(interval);
    startTimer(time);
    const instance = Template.instance();
    instance.state.set('isPlaying', false);
    $('.circle_animation').css('stroke-dashoffset', initialOffset);
}

function startTimer(time){
    const instance = Template.instance();
    instance.state.set('isPlaying', true);
    instance.state.set('isFinished', false);
    instance.state.set('remainingTime', formatTime(time));


    const radius = parseInt($('.circle_animation').css('stroke-dasharray'), 10);
    let i = 1;
    interval = setInterval(function () {
        if (instance.state.get('isPlaying')){
            $('.circle_animation').css('stroke-dashoffset', initialOffset - (i * (radius / time)));
            instance.state.set('remainingTime', formatTime(time - i));
            if (i == time) {
                clearInterval(interval);
                instance.state.set('isFinished', true);
            }
            i++;
        }
    }, 1000);
}

$('#show-modal').leanModal();

Template.timer.onCreated(function () {
    this.state = new ReactiveDict;
});

Template.timer.rendered = function () {
    startTimer(10);
    const instance = Template.instance();
    instance.state.set('isPlaying', false);
};

Template.timer.helpers({
    calculateSizes(){
        $('main').css('height', (parseInt($('body').css('height')) - (parseInt($('header').css('height')) + parseInt($('footer').css('height')))));
        console.log('Body Height: ' + $('body').css('height'));
        console.log('Header Height: ' + $('header').css('height'));
        console.log('Footer Height: ' + $('footer').css('height'));
        console.log('Main Height: ' + (parseInt($('body').css('height')) - (parseInt($('header').css('height')) + parseInt($('footer').css('height')))));
    },
    isPlaying(){
        return getInstanceValue('isPlaying');
    },
    isFinished(){
        return getInstanceValue('isFinished');
    },
    getRemainingTime(){
        return getInstanceValue('remainingTime');
    }
});

Template.timer.events({
    'click #playPauseButton':function(event, instance) {
        event.preventDefault();
        if (instance.state.get('isFinished')){
            startTimer(15);
        } else {
            instance.state.set('isPlaying', !instance.state.get('isPlaying'));
        }
    },
    'click #timerText': function (event) {
        event.preventDefault();
        $('#setTimeModal').openModal();
    },
    'click #submit-time': function (event) {
        event.preventDefault();
        var minutesInput = $('#timer-input-minutes');
        var secondsInput = $('#timer-input-seconds');
        restartTimer(convertTimeToSeconds(minutesInput.val(),secondsInput.val()));
        minutesInput.val('');
        secondsInput.val('');

        $('#setTimeModal').closeModal();
    },
});

