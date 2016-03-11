app.directive('attendance', function(){
    'use strict';
    return {
        restrict: 'E',
        scope:{
            reason:'@',
            category:'@',
            url:'@',
            slug:'@',
            stripping:'@',
            na:'@',
            fontcolor:'@',
            pagetitle:'@',
            eventdate:'@',
            description:'@'
        },
        template:'<div uib-popover-template="url" popover-trigger="mouseenter" popover-placement="right" class="grid-item {{slug}} {{stripping}} {{na}}"></div>'
    };
});

app.directive('listAttendance',function(locale){
    'use strict';
    return{
        restrict:'E',
        scope:{
            url:'@',
            label:'@',
            info:'@',
            attendanceacademicyear:'@',
            lastmonthattendance:'@',
            risklevel:'@',
            trend:'@'
        },
        template:'<div uib-popover-template="url"  popover-trigger="mouseenter" popover-placement="left"><span class="{{label}}">{{info}}</span></div>',
        link:function(scope,elm,attrs){
            var lastTermsDay = "";
            var currAcademicDay = "";
            if(attrs.attendanceacademicyear == 1){
                currAcademicDay = locale.getString('general.attendance_day');
            }else if(attrs.attendanceacademicyear >= 0){
                currAcademicDay = locale.getString('general.attendance_days');
            }
            if(attrs.lastmonthattendance == 1){
                lastTermsDay = locale.getString('general.attendance_day');
            }else if(attrs.lastmonthattendance >= 0){
                lastTermsDay = locale.getString('general.attendance_days');
            }
            scope.first_message = locale.getString('general.attendance_latest_term_message',[attrs.lastmonthattendance,lastTermsDay]);
            scope.second_message = locale.getString('general.attendance_current_academic_message',[attrs.attendanceacademicyear,currAcademicDay]);

        }
    }
});

app.directive('listBehavior',function(locale){
    'use strict';
    return{
        restrict:'E',
        scope:{
            url:'@',
            label:'@',
            info:'@',
            incidentacademicyear:'@',
            lastmonthincident:'@'
        },
        template:'<div uib-popover-template="url"  popover-trigger="mouseenter" popover-placement="left"><span class="{{label}}">{{info}}</span></div>',
        link:function(scope,elm,attrs){
           var lastTermsIncident = "";
           var currAcademicIncident = "";
            if(attrs.incidentacademicyear == 1){
                currAcademicIncident = locale.getString('general.behavior_incident');
            }else if(attrs.incidentacademicyear >= 0){
                currAcademicIncident = locale.getString('general.behavior_incidents');
            }
            if(attrs.lastmonthincident == 1){
                lastTermsIncident = locale.getString('general.behavior_incident');
            }else if(attrs.lastmonthincident >= 0){
                lastTermsIncident = locale.getString('general.behavior_incidents');
            }
            scope.first_message = locale.getString('general.latest_term_message',[attrs.lastmonthincident,lastTermsIncident]);
            scope.second_message = locale.getString('general.current_academic_message',[attrs.incidentacademicyear,currAcademicIncident]);
        }
    }
});

app.directive('lastupdatelist',function(){
    'use strict';
    return{
        restrict:'E',
        scope:{
            url:'@',
            data:'=listData'
        },
        template:'<div uib-popover-template="url" popover-trigger="mouseenter" popover-placement="left"><span class="glyphicon glyphicon-time" aria-hidden="true"></span></div>'
    }
});

app.directive('studentlastupdate',function(){
    'use strict';
    return{
        restrict:'E',
        scope:{
            url:'@',
            lastupdate:'@'
        },
        template:'<div uib-popover-template="url" class="student_last_update" popover-trigger="mouseenter" popover-placement="right"><span class="glyphicon glyphicon-time" aria-hidden="true"></span></div>'
    }
});

app.directive('legend', function(){
    'use strict';
    return {
        restrict: 'E',
        scope:{
            url:'@',
            pagetitle:'@',
            description:'@',
            fontcolor:'@',
            type:'@'
        },
        template:'<li uib-popover-template="url" popover-trigger="mouseenter" popover-placement="left" class="list-group-item {{type}} uppercase">{{type}}</li>'

    };
});

app.directive('dropdownMultiselect', function($document){
    'use strict';
    return {
        restrict: 'E',
        scope:{
            model: '=',
            options: '=',
            title:'@'
        },

        template: "<div class='multiselect'>"+
        "<button class='button filter-btn' ng-click='toggleSelect()'>{{title}}<span class='filter-caret caret'></span></button>"+
        "<ul  class='filter-btn popup' ng-show='isPopupVisible'>" +
        "<li class='list-dropdown-padding' data-ng-repeat='option in options' data-ng-click='setSelectedItem()'>{{option.name}}<span data-ng-class='isChecked(option.id)'></span></li>" +
        "</ul>" +
        "</div>",
        link:function(scope,element,attr){

            scope.isPopupVisible = false;
            scope.toggleSelect = function(){
                scope.isPopupVisible = !scope.isPopupVisible;
            };
            $document.bind('click', function(event){
                var isClickedElementChildOfPopup = element
                        .find(event.target)
                        .length > 0;

                if (isClickedElementChildOfPopup)
                {return;}

                scope.isPopupVisible = false;
                scope.$apply();
            });
        },
        controller: function($scope){
            $scope.setSelectedItem = function(){
                var id = this.option.id;
                if (_.contains($scope.model, id)) {
                    $scope.model = _.without($scope.model, id);
                } else {
                    $scope.model.push(id);
                }
                return false;
            };
            $scope.isChecked = function (id) {
                if (_.contains($scope.model, id)) {
                    return 'icon-ok pull-right';
                }
                return false;
            };
        }
    };
});

app.directive('filterMultiselect', function($document){
    'use strict';
    return {
        restrict: 'E',
        scope:{
            model: '=',
            options: '=',
            title:'@'
        },

        template: "<div class='multiselect'>"+
        "<button class='button fltr-graph filter-btn' ng-click='toggleSelect()'>{{title}}<span class='filter-caret caret'></span></button>"+
        "<ul  class='filter-btn popup' ng-show='isPopupVisible'>" +
        "<li class='list-dropdown-padding' data-ng-repeat='option in options' data-ng-click='setSelectedItem()'>{{option.name}}<span data-ng-class='isChecked(option.id)'></span></li>" +
        "</ul>" +
        "</div>",
        link:function(scope,element,attr){

            scope.isPopupVisible = false;
            scope.toggleSelect = function(){
                scope.isPopupVisible = !scope.isPopupVisible;
            };
            $document.bind('click', function(event){
                var isClickedElementChildOfPopup = element
                        .find(event.target)
                        .length > 0;

                if (isClickedElementChildOfPopup)
                {return;}

                scope.isPopupVisible = false;
                scope.$apply();
            });
        },
        controller: function($scope){

            var unselected_items = [];
            var selected_items = [];
            var temp = [];
            var chart;
            $scope.setSelectedItem = function(){
                var id = this.option.id;
                if (_.contains($scope.model, id)) {
                    $scope.model = _.without($scope.model, id);
                    if($scope.model.length >0){
                        for(var i=0;i<selected_items.length;i++){
                            var id = _.get($scope.model[i],'id');
                            unselected_items.splice(id,1);
                        }
                    }
                    angular.forEach(unselected_items,function(v){
                        chart.xAxis[0].removePlotBand(v.id);
                    });
                } else {
                    $scope.model.push(id);
                }
                chart = $('#student-graph').highcharts();
                angular.forEach($scope.model,function(v){
                    chart.xAxis[0].addPlotBand(v);
                    temp.push(v);
                    unselected_items = _.uniq(temp,'id');
                    selected_items = unselected_items;
                });
                return false;
            };
            $scope.isChecked = function (id) {
                if (_.contains($scope.model, id)) {
                    return 'icon-ok pull-right';
                }
                return false;
            };
        }
    };
});

app.directive('ngConfirmClick', [
    function () {
        'use strict';
        return {
            link: function (scope, element, attr) {
                var msg = attr.ngConfirmClick || "Are you sure?";
                var clickAction = attr.confirmedClick;
                element.bind('click', function (event) {
                    if (window.confirm(msg)) {
                        scope.$eval(clickAction);
                    }
                });
            }
        };
    }]);

app.directive('contenteditable', function () {
    'use strict';
    return {
        require: 'ngModel',
        link: function (scope, elm, attrs, ctrl) {
            // view -> model
            var clickAction = attrs.confirmedAction;
            elm.bind('blur', function () {
                var html = elm.html();
                scope.$apply(function () {
                    ctrl.$setViewValue(elm.html());
                });
                elm.html(html);
                scope.$eval(clickAction);
            });

            ctrl.render = function (value) {
                elm.html(value);
            };

            // load init value from DOM
            ctrl.$setViewValue(elm.html());

            elm.bind('keydown', function (event) {
                var esc = event.which === 27,
                    el = event.target;

                if (esc) {
                    ctrl.$setViewValue(elm.html());
                    el.blur();
                    event.preventDefault();
                }

            });

        }
    };
});

app.directive(
    "bnDocumentClick",
    function( $document, $parse ){
        'use strict';
        var linkFunction = function( $scope, $element, $attributes ){

            var scopeExpression = $attributes.bnDocumentClick;

            var invoker = $parse( scopeExpression );

            $document.on(
                "click",
                function( event ){

                    $scope.$apply(
                        function(){

                            invoker(
                                $scope,
                                {
                                    $event: event
                                }
                            );
                        }
                    );
                }
            );

        };
        // Return the linking function.
        return( linkFunction );
    }
);

app.directive('phonenumberDirective', ['$filter', function ($filter) {
    'use strict';
    function link(scope, element, attributes) {
        'use strict';
        // scope.inputValue is the value of input element used in template
        scope.inputValue = scope.phonenumberModel;
        console.log(scope.phonenumberModel);
        scope.$watch('inputValue', function (value, oldValue) {

            value = String(value);
            var number = value.replace(/[^0-9]+/g, '');
            scope.phonenumberModel = number;
            scope.inputValue = $filter('phonenumber')(number);
        });
    }

    return {
        link: link,
        restrict: 'E',
        scope: {
            phonenumberPlaceholder: '=placeholder',
            phonenumberModel: '=model'
        },
        //templateUrl: '/static/phonenumberModule/template.html',
        template: '<input ng-model="inputValue" type="tel" class="phonenumber form-control" placeholder="{{phonenumberPlaceholder}}" title="Phonenumber (Format: (999) 9999-9999)">'
    };
}]);


app.directive('a', function () {
    'use strict';
    return {
        restrict: 'E',
        link: function (scope, elem, attrs) {
            if (attrs.ngClick || attrs.href === '' || attrs.href === '#') {
                elem.on('click', function (e) {
                    e.preventDefault();
                });
            }
        }
    };
});

app.directive('listItem',function(){
    'use strict';
    return {
        restrict: 'E',
        scope:{
            data:'=',
            slug:'=',
            event:'=',
            title:'='
        },

        template:'<div class="grid-item {{slug}}" tooltip-html="data"></div>'


    };


});

app.directive('datepicker', function () {
    'use strict';
    return {
        restrict: 'E',
        transclude: true,
        scope: {
            date: '='
        },
        link: function (scope, element, attrs) {
            element.datepicker({
                dateFormat: 'mm/dd/yy',
                onSelect: function (dateText, datepicker) {
                    scope.date = dateText;
                    scope.$apply();
                }
            });
        },
        template: '<input type="text" class="form-control" ng-model="date"/>',
        replace: true
    };

});

app.directive('studentSchoolDistrictPie', function () {
    'use strict';
    return {
        restrict: 'C',
        replace: true,
        scope: {
            districts: '=',
            schools: '='
        },
        controller: function($scope, $element, $attrs) {

        },
        template: '<div id="student-school-district-pie" style="margin: 20px auto">not working</div>',
        link: function(scope, element, attrs) {
            var chart = new Highcharts.Chart({
                credits: {
                    enabled: false
                },
                chart: {
                    renderTo: 'student-school-district-pie',
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false
                },
                title: {
                    text: 'Students by District and School'
                },
                tooltip: {
                    headerFormat: '<b>{point.key}</b><br/>',
                    pointFormat: '<small style="font-size: 11px;">{series.name}: {point.y}</small>',
                    percentageDecimals: 1
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: false,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: true,
                            color: '#000000',
                            connectorColor: '#000000'
                        }
                    }
                },
                series: [
                    {
                        type: 'pie',
                        name: 'Total',
                        size: '50%',
                        dataLabels: {
                            color: '#ffffff',
                            distance: -30
                        },
                        data: scope.districts
                    },
                    {
                        type: 'pie',
                        name: 'Total',
                        size: '100%',
                        innerSize: '53%',
                        dataLabels: {
                            formatter: function () {
                                // display only if larger than 1
                                return this.y >= 1 ? this.point.name + ': ' + this.y : null;
                            }
                        },
                        data: scope.schools
                    }
                ]
            });

            scope.$watch("districts", function(newValue) {
                chart.series[0].setData(newValue, true);
            }, true);

            scope.$watch("schools", function(newValue) {
                chart.series[1].setData(newValue, true);
            }, true);

        }
    }

});


app.directive('studentGradeGradPie', function () {
    'use strict';
    return {
        restrict: 'C',
        replace: true,
        scope: {
            grade: '='
        },
        controller: function($scope, $element, $attrs) {

        },
        template: '<div id="student-grade-grad-pie" style="margin: 20px auto">not working</div>',
        link: function(scope, element, attrs) {
            var chart2 = new Highcharts.Chart({
                credits: {
                    enabled: false
                },
                chart: {
                    renderTo: 'student-grade-grad-pie',
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false
                },
                title: {
                    text: 'Students by Grade Level'
                },
                tooltip: {
                    headerFormat: '<b>{point.key}</b><br/>',
                    pointFormat: '<small style="font-size: 11px;">{series.name}: {point.y}</small>',
                    percentageDecimals: 1
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: true,
                            color: '#000000',
                            connectorColor: '#000000'
                        }
                    }
                },
                series: [
                    {
                        type: 'pie',
                        name: 'Total',
                        size: '100%',
                        data: scope.grade
                    }
                ]
            });

            scope.$watch("grade", function(newValue) {
                chart2.series[0].setData(newValue, true);
            }, true);

        }
    }

});


app.directive('studentRaceEthnicityPie', function () {
    'use strict';
    return {
        restrict: 'C',
        replace: true,
        scope: {
            ethnicity: '='
        },
        controller: function($scope, $element, $attrs) {

        },
        template: '<div id="student-race-ethnicity-pie" style="margin: 20px auto">not working</div>',
        link: function(scope, element, attrs) {
            var chart3 = new Highcharts.Chart({
                credits: {
                    enabled: false
                },
                chart: {
                    renderTo: 'student-race-ethnicity-pie',
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false
                },
                title: {
                    text: 'Students by Race/Ethnicity'
                },
                tooltip: {
                    headerFormat: '<b>{point.key}</b><br/>',
                    pointFormat: '<small style="font-size: 11px;">{series.name}: {point.y}</small>',
                    percentageDecimals: 1
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: true,
                            color: '#000000',
                            connectorColor: '#000000'
                        }
                    }
                },
                series: [
                    {
                        type: 'pie',
                        name: 'Total',
                        size: '100%',
                        data: scope.ethnicity
                    }
                ]
            });

            scope.$watch("ethnicity", function(newValue) {
                chart3.series[0].setData(newValue, true);
            }, true);

        }
    }

});



app.directive('studentGenderPie', function () {
    'use strict';
    return {
        restrict: 'C',
        replace: true,
        scope: {
            gender: '='
        },
        controller: function($scope, $element, $attrs) {

        },
        template: '<div id="student-gender-pie" style="margin: 20px auto">not working</div>',
        link: function(scope, element, attrs) {
            var chart4 = new Highcharts.Chart({
                credits: {
                    enabled: false
                },
                chart: {
                    renderTo: 'student-gender-pie',
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false
                },
                title: {
                    text: 'Students by Gender'
                },
                tooltip: {
                    headerFormat: '<b>{point.key}</b><br/>',
                    pointFormat: '<small style="font-size: 11px;">{series.name}: {point.y}</small>',
                    percentageDecimals: 1
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: true,
                            color: '#000000',
                            connectorColor: '#000000'
                        }
                    }
                },
                series: [
                    {
                        type: 'pie',
                        name: 'Total',
                        size: '100%',
                        data: scope.gender
                    }
                ]
            });

            scope.$watch("gender", function(newValue) {
                chart4.series[0].setData(newValue, true);
            }, true);

        }
    }

});

