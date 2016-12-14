
var app = angular.module('app', [
    'ui.router',
    'ct.ui.router.extras',
    'ngScrollbar',
    'ngFileUpload',
    'ui.bootstrap',
    'angular-mousetrap',
    'ngDropdown',
    'inputDropdown'
])

.config(['$sceProvider', '$stateProvider', '$urlRouterProvider', '$locationProvider', '$animateProvider', '$stickyStateProvider',
	function($sceProvider, $stateProvider, $urlRouterProvider, $locationProvider, $animateProvider, $stickyStateProvider) {


		// ng-bind-html word
        $sceProvider.enabled(false);

        // Start Page
        $urlRouterProvider.otherwise("/");

        $stickyStateProvider.enableDebug(false);

        // ui view setting
        $stateProvider
        .state("contacts", {
            url: "/",
            views: {
                'home': {
                    templateUrl: "templates/courseCreate.html",
                    controller: 'CourseCreateController as ctrl',
                }
            }
        })
	}
])

.controller("RootController",['$scope', '$state', '$timeout', '$rootScope',
	function($scope, $state, $timeout, $rootScope){

        var init = function() {
            
        }


        /*==========================
            Events
        ==========================*/

        /*==========================
            Members
        ==========================*/
        
        /*==========================
             Methods
        ==========================*/

        /*==========================
             init
        ==========================*/

        init();

	}
]);

app.directive('loading',  ['$timeout', function($timeout){
  return {
        restrict: 'E',
        templateUrl: "templates/directives/loading.html"
    };
}]);

app.directive('spin',  ['$timeout', function($timeout){
  return {
        restrict: 'E',
        template: '<div class="spin"></div>',
        link: function(scope, element, attrs, ctrls) {

            var spinSize = attrs.spinSize;
            switch (spinSize) {
                case "large": 
                    element.children().addClass("spin-large");
                    break;
                case "medium": 
                    element.children().addClass("spin-medium");
                    break;
                case "small": 
                    element.children().addClass("spin-small");
                    break;
                default:
                    element.children().addClass("spin-small");
                    break;
            }
        }
    };
}]);