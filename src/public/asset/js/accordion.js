var transcriptTab;
var graphTab;
var programTab;
var attendanceTab;
var tabPanel;
$(document).ready(function(){
    tabPanel = $(".tabpanel");
    attendanceTab = $("#attendance_and_behavior");
    programTab = $("#program_participation");
    graphTab = $("#graph");
    transcriptTab = $("#transcript");
    if($(window).outerWidth()<972){
        if(attendanceTab.hasClass("tab-pane")){
            attendanceTab. removeClass("tab-pane");
            attendanceTab. addClass("panel-collapse collapse");

        }
        if(transcriptTab.hasClass("tab-pane")){
            transcriptTab. removeClass("tab-pane");
            transcriptTab. addClass("panel-collapse collapse");

        }
        if(programTab.hasClass("tab-pane")){
            programTab. removeClass("tab-pane");
            programTab. addClass("panel-collapse collapse");

        }
        if(graphTab.hasClass("tab-pane")){
            graphTab. removeClass("tab-pane");
            graphTab. addClass("panel-collapse collapse");

        }
    }else{
        if(attendanceTab.hasClass("panel-collapse")){
            attendanceTab. addClass("tab-pane");
            attendanceTab. removeClass("panel-collapse collapse");
        }
        if(transcriptTab.hasClass("panel-collapse")){
            transcriptTab. addClass("tab-pane");
            transcriptTab. removeClass("panel-collapse collapse");
        }
        if(programTab.hasClass("panel-collapse")){
            programTab. addClass("tab-pane");
            programTab. removeClass("panel-collapse collapse");
        }
        if(graphTab.hasClass("panel-collapse")){
            graphTab. addClass("tab-pane");
            graphTab. removeClass("panel-collapse collapse");
        }
    }
});
$(window).resize(function(){
    if($(window).outerWidth()<972){
        if(attendanceTab.hasClass("tab-pane")){
            attendanceTab. removeClass("tab-pane");
            attendanceTab. addClass("panel-collapse collapse");

        }
        if(transcriptTab.hasClass("tab-pane")){
            transcriptTab. removeClass("tab-pane");
            transcriptTab. addClass("panel-collapse collapse");

        }
        if(programTab.hasClass("tab-pane")){
            programTab. removeClass("tab-pane");
            programTab. addClass("panel-collapse collapse");

        }
        if(graphTab.hasClass("tab-pane")){
            graphTab. removeClass("tab-pane");
            graphTab. addClass("panel-collapse collapse");

        }
    }else{
        if(attendanceTab.hasClass("panel-collapse")){
            attendanceTab. addClass("tab-pane");
            attendanceTab. removeClass("panel-collapse collapse");
        }
        if(transcriptTab.hasClass("panel-collapse")){
            transcriptTab. addClass("tab-pane");
            transcriptTab. removeClass("panel-collapse collapse");
        }
        if(programTab.hasClass("panel-collapse")){
            programTab. addClass("tab-pane");
            programTab. removeClass("panel-collapse collapse");
        }
        if(graphTab.hasClass("panel-collapse")){
            graphTab. addClass("tab-pane");
            graphTab. removeClass("panel-collapse collapse");
        }
    }
});