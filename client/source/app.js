"use strict";

// Declare app level module which depends on views, and components
angular.module('app', [
  'ui.router'
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



    ;



  }).controller('rootController', function($scope){



  });
