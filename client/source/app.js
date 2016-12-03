"use strict";

// Declare app level module which depends on views, and components
angular.module('app', [
  'ui.router',
  'ngAnimate'
]).config(function($stateProvider, $urlRouterProvider) {


  var navigation = {
    name: 'navigation',
    templateUrl: 'navigation/nav'
  };

  $urlRouterProvider.otherwise("/");
  $stateProvider

    .state(navigation)


    .state('home', {
      url: "/",
      templateUrl: "home/home",
      parent: navigation
    })

    .state('drills',{
      url: "/drills",
      templateUrl: "drill/drills",
      parent: navigation

    })

    .state('settings',{
      url: "/settings",
      templateUrl: "settings/settings",
      parent: navigation
    })


    .state('schools',{
      url: "/schools",
      templateUrl: "school/schools",
      parent: navigation
    })

    .state('school',{
      url: "/school",
      templateUrl: "school/school",
      parent: navigation
    })

    .state('login',{
      url: "/login",
      templateUrl: "login/login"
          })



    ;



  })


.run(function($rootScope, $animate){
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){

         //below are routes where animation is off
        if(toState.name=='login' || fromState.name=='login')
            $animate.enabled(false);            
        else
            $animate.enabled(true);

    });
 })

.controller('rootController', function($scope){



  });
