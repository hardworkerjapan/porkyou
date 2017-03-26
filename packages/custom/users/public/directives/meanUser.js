'use strict';
angular.module('mean.users')
  .controller('dateSelectorController', ['$scope', 'dateService', function($scope, dateService) {
    // For Date Pick Up Select Box
    $scope.years = dateService.getYears();
    $scope.months = dateService.getMonths();
    // When Changing Year And Month Newly Set Days
    $scope.setDays = function() {
      $scope.days = dateService.getDays($scope.year, $scope.month, $scope.day);
      var lastDay = $scope.days[$scope.days.length - 1];
      if($scope.day > lastDay) {
        $scope.day = lastDay;
      }
      // Set Date To ng-model
      $scope.ngModel = '';
      if($scope.month !== undefined && $scope.day !== undefined && $scope.year !== undefined) {
        $scope.ngModel = $scope.month + '/' + $scope.day + '/' + $scope.year;
      }
    }
    $scope.setDays();
  }])
  .service('dateService', function() {

    var DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    /** Get Years
     *
     * @returns {Array}
     */
    this.getYears = function() {
      var today = new Date();
      var thisYear = today.getFullYear();
      var years = [];
      var i = 0;
      while(i < 100) {
        years.push(thisYear - i);
        i++;
      }
      return years;
    }

    /** Get Months
     *
     * @returns {[number,number,number,number,number,number,number,number,number,number,number,number]}
     */
    this.getMonths = function() {
      var months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
      return months;
    }

    /**
     * Get Days
     *
     * @param year
     * @param month
     * @returns Array or null
     */
    this.getDays = function(year, month) {
      var days = [];
      var thisDay = 1;
      var endOfDay = 31;
      if(year && month) {
        endOfDay = (month === 2 && year % 4 === 0 &&
        (year % 100 !== 0 || year % 400 === 0)) ? 29 : DAYS_IN_MONTH[month-1];
      }
      while(thisDay <= endOfDay) {
        days.push(thisDay);
        thisDay++;
      }
      //noinspection JSValidateTypes
      return days;
    }

  })
  .directive('dateSelector', function() {
      return {
        template:
        // '<input type="input" ng-model="ngModel">' +
        '<md-input-container>' +
        '<label translate="MONTH"></label>' +
        '<md-select ng-model="month" md-on-close="setDays()">' +
        '<md-option translate="NONE"></md-option>' +
        '<md-option ng-repeat="month in months" ng-value="month">' +
        '{{month}}' +
        '</md-option>' +
        '</md-select>' +
        '</md-input-container>' +
        '<md-input-container>' +
        '<label translate="DAY"></label>' +
        '<md-select ng-model="day" md-on-close="setDays()">' +
        '<md-option translate="NONE"></md-option>' +
        '<md-option ng-repeat="day in days" ng-value="day">' +
        '{{day}}' +
        '</md-option>' +
        '</md-select>' +
        '</md-input-container>' +
        '<md-input-container>' +
        '<label translate="YEAR"></label>' +
        '<md-select ng-model="year" md-on-close="setDays()">' +
        '<md-option translate="NONE"></md-option>' +
        '<md-option ng-repeat="year in years" ng-value="year">' +
        '{{year}}' +
        '</md-option>' +
        '</md-select>' +
        '</md-input-container>',
        scope: {
          ngModel: '=',
        },
        // require: ['dateSelector'],
        restrict: 'EA',
        controller: 'dateSelectorController'
      };
    })
