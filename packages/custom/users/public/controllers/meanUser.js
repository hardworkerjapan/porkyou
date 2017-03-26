'use strict';

angular.module('mean.users')
  .controller('AuthCtrl', ['$scope', '$rootScope', '$http', '$state', 'Global',
    function($scope, $rootScope, $http, $state, Global) {
      // This object will contain list of available social buttons to authorize
      $scope.socialButtonsCounter = 0;
      $scope.global = Global;
      $scope.$state = $state;

      $http.get('/api/get-config')
        .then(function(response) {
          var config = response.data;
          if(config.hasOwnProperty('local')) delete config.local; // Only non-local passport strategies
          $scope.socialButtons = config;
          $scope.socialButtonsCounter = Object.keys(config).length;
        });
    }
  ])
  .controller('LoginCtrl', ['$rootScope', 'MeanUser',
    function($rootScope, MeanUser) {
      var vm = this;

      // This object will be filled by the form
      vm.user = {};

      vm.input = {
        type: 'password',
        placeholder: 'Password',
        confirmPlaceholder: 'Repeat Password',
        iconClass: '',
        tooltipText: 'Show password'
      };

      vm.togglePasswordVisible = function() {
        vm.input.type = vm.input.type === 'text' ? 'password' : 'text';
        vm.input.placeholder = vm.input.placeholder === 'Password' ? 'Visible Password' : 'Password';
        vm.input.iconClass = vm.input.iconClass === 'icon_hide_password' ? '' : 'icon_hide_password';
        vm.input.tooltipText = vm.input.tooltipText === 'Show password' ? 'Hide password' : 'Show password';
      };

      $rootScope.$on('loginfailed', function(){
        vm.loginError = MeanUser.loginError;
      });

      // Register the login() function
      vm.login = function() {
        MeanUser.login(this.user);
      };
    }
  ])
  .controller('RegisterCtrl', ['$rootScope', 'MeanUser',
    function($rootScope, MeanUser) {
      var vm = this;


      // // For Date Pick Up Select Box
      // var DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      // $rootScope.years = MeanUser.getYears();
      // $rootScope.months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
      // $rootScope.days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
      // function getDaysInMonth(year, month) {
      //   return month === 1 && year % 4 === 0 &&
      //   (year % 100 !== 0 || year % 400 === 0) ? 29 : DAYS_IN_MONTH[month];
      // }
      //
      // vm.years = [2000, 2001, 2002];

      vm.user = {};

      vm.registerForm = MeanUser.registerForm = true;

      vm.input = {
        type: 'password',
        placeholder: 'Password',
        placeholderConfirmPass: 'Repeat Password',
        iconClassConfirmPass: '',
        tooltipText: 'Show password',
        tooltipTextConfirmPass: 'Show password'
      };

      vm.togglePasswordVisible = function() {
        vm.input.type = vm.input.type === 'text' ? 'password' : 'text';
        vm.input.placeholder = vm.input.placeholder === 'Password' ? 'Visible Password' : 'Password';
        vm.input.iconClass = vm.input.iconClass === 'icon_hide_password' ? '' : 'icon_hide_password';
        vm.input.tooltipText = vm.input.tooltipText === 'Show password' ? 'Hide password' : 'Show password';
      };
      vm.togglePasswordConfirmVisible = function() {
        vm.input.type = vm.input.type === 'text' ? 'password' : 'text';
        vm.input.placeholderConfirmPass = vm.input.placeholderConfirmPass === 'Repeat Password' ? 'Visible Password' : 'Repeat Password';
        vm.input.iconClassConfirmPass = vm.input.iconClassConfirmPass === 'icon_hide_password' ? '' : 'icon_hide_password';
        vm.input.tooltipTextConfirmPass = vm.input.tooltipTextConfirmPass === 'Show password' ? 'Hide password' : 'Show password';
      };

      // Register the register() function
      vm.register = function() {
        MeanUser.register(this.user);
      };

      $rootScope.$on('registerfailed', function(){
        vm.registerError = MeanUser.registerError;
      });
    }
  ])
  .controller('ForgotPasswordCtrl', ['MeanUser', '$rootScope',
    function(MeanUser, $rootScope) {
      var vm = this;
      vm.user = {};
      vm.registerForm = MeanUser.registerForm = false;
      vm.forgotpassword = function() {
        MeanUser.forgotpassword(this.user);
      };
      $rootScope.$on('forgotmailsent', function(event, args){
        vm.response = args;
      });
    }
  ])
  .controller('ResetPasswordCtrl', ['MeanUser',
    function(MeanUser) {
      var vm = this;
      vm.user = {};
      vm.registerForm = MeanUser.registerForm = false;
      vm.resetpassword = function() {
        MeanUser.resetpassword(this.user);
      };
    }
  ]);
