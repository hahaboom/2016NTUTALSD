angular.module("ngScrollbar", [])
/**
 * http://noraesae.github.io/perfect-scrollbar/
 *
 * ngScrollbar 元件，主要建立假的scroll bar
 *
 * 需要scroll bar的地方不能使用padding的css，不然位置會計算錯誤
 */
.directive('ngScrollbar', ['$parse',
    function($parse) {

        var psOptions = [
            'wheelSpeed', 'wheelPropagation', 'minScrollbarLength', 'useBothWheelAxes',
            'useKeyboard', 'suppressScrollX', 'suppressScrollY', 'scrollXMarginOffset',
            'scrollYMarginOffset', 'includePadding', 'infiniteScroll', 'scrollBarShow'
        ];

        return {
            restrict: 'A',
            transclude: true,
            template: '<div><div ng-transclude></div></div>',
            replace: false,
            link: function($scope, $elem, $attr) {

                var options = {};
                var raw = $elem[0]; // infiniteScroll @param
                var enableInfiniteScroll = false;

                for (var i = 0, l = psOptions.length; i < l; i++) {
                    var opt = psOptions[i];
                    if ($attr[opt] != undefined) {
                        options[opt] = $parse($attr[opt])();
                    }
                }

                $elem.perfectScrollbar(options);

                if ($attr.refreshOnChange) {
                    $scope.$watchCollection($attr.refreshOnChange, function() {
                        $scope.$evalAsync(function() {
                            $elem.perfectScrollbar('update');
                        });
                    });
                }

                $elem.bind('$destroy', function() {
                    $elem.perfectScrollbar('destroy');
                });

                if ($attr.infiniteScrollDisabled != null) {
                    $scope.$watch($attr.infiniteScrollDisabled, function (value) {
                        enableInfiniteScroll = !value;
                        if(enableInfiniteScroll){
                            $elem.perfectScrollbar('update');
                            if (raw.scrollTop + raw.offsetHeight >= raw.scrollHeight && enableInfiniteScroll) {
                                ($attr.innerInfiniteScroll) && $attr.innerInfiniteScroll;
                            }
                        }
                    });
                }

                // infiniteScroll active
                $elem.bind('scroll mousewheel', function(e) {
                    if($elem.find('.ps-scrollbar-y-rail').css('display') !== 'none'){
                        e.stopPropagation();
                        e.preventDefault();
                    }

                    if (raw.scrollTop + raw.offsetHeight >= raw.scrollHeight && enableInfiniteScroll) {
                        ($attr.innerInfiniteScroll) && $scope.$apply($attr.innerInfiniteScroll);
                    }
                    if($attr.onScroll)
                        $scope.$apply($attr.onScroll);
                });
            }
        };
    }
]);

// .directive('scrollToWhere', function() {
//     return {
//       link: function(scope, element, attrs) {

//         var value = attrs.scrollToWhere;

//         element.click(function() {

//           scope.$apply(function() {

//             var selector = "[scroll-to-here='"+ value +"']",
//                 $element = $(selector),
//                 adjust = 100, // 減100，只是單純不想直接到'每個元素'的最頂端
//                 $container = $("[ng-scrollbar]").has(element);

//             if($element.length){

//               var scrollMoveHere = $element.offset().top - adjust;
//               $container.animate({scrollTop: scrollMoveHere }, 500);

//             }
//           });
//         });
//       }
//     };
// })

// .directive('autoSrcoll', function() {
//     return {
//       link: function(scope, element, attrs) {
//         scope.$on("AUTO_SCROLL", function (e, data) {
//             if(data && data.postid){
//                 var $item = element.find('[auto-scroll-item="' + data.postid + '"]').last();
//                 if($item.length > 0){
//                     var position = $item.position();
//                     if(position.top < 0){
//                         element.stop().animate({scrollTop: position.top + element.scrollTop()}, 300);
//                     }else if(position.top + $item.height() > element.height()){
//                         element.stop().animate({scrollTop: position.top + element.scrollTop() - element.height() + $item.outerHeight() }, 300);
//                     }
//                 }
//             }
//         });
//       }
//     };
// });