var STATES = {
    HOME: "home",

    COURSEINFO: "courseInfo",
    COURSEINFO_CREATE: "courseInfo.create",
    COURSEINFO_MANAGE: "courseInfo.manage",
    COURSEINFO_STUDENT: "courseInfo.student",
    COURSEINFO_SENDMAIL: "courseInfo.Sendmail",
    
    OTHERS: "others",
    OTHERS_CERTIFICATION: "others.certification",
    OTHERS_SENDMAIL: "others.sendMail",
    OTHERS_INVOICE: "others.invoice"
}

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
        
        .state(STATES.HOME, {
          url: "/",
          views: {
              'home': {
            	  templateUrl: "templates/certificationPage.html",
                  controller: 'CertificationController',
              }
          }
      })

//
//        .state(STATES.OTHERS, {
//            url: "/others",
//            views: {
//                'others@': {
//                    template: "<div ui-view=\"content\"></div>"
//                }
//            }
//        })

//        .state(STATES.OTHERS_CERTIFICATION, {
//            url: "/",
//            views: {
//                'home': {
//                    templateUrl: "templates/certificationPage.html",
//                    controller: 'CertificationController',
//                }
//            }
//        })

	}
])

.controller("RootController",['$scope', '$state', '$timeout', '$rootScope',
	function($scope, $state, $timeout, $rootScope){

        var isHomeView = function() {
            return $state.includes(STATES.HOME);
        }

        var isCourseInfoView = function() {
            return $state.includes(STATES.COURSEINFO);
        }

        var isOthersView = function() {
            return $state.includes(STATES.OTHERS);
        }

        var isStudentInfoView = function() {
            return $state.includes(STATES.STUDENTINFO);
        }        

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

        $scope.isHomeView = isHomeView;
        $scope.isCourseInfoView = isCourseInfoView;
        $scope.isOthersView = isOthersView;
        $scope.isStudentInfoView = isStudentInfoView;

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