angular.module('app').directive('verbiage', function() {
  return {
		restrict: 'E',
transclude: true,
		scope: {
				word: '@',
		 },
    templateUrl: 'directives/Garage',
		link: function(scope){
			scope.formatTime = function(time){
				if(!time) return "(Never Used)";
				return moment(new Date(time)).fromNow();
			};
		}
  };
});