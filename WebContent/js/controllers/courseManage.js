app.controller("CourseManageController", ['$scope', '$state', '$timeout', '$rootScope', '$q', 'CourseService',
    function($scope, $state, $timeout, $rootScope, $q, CourseService) {

        var getTopCourse = function() {
            CourseService.getTopCourse().then(function(result) {
                $scope.topCourseList.courseList = result;
                for (var i = 0; i < $scope.topCourseList.courseList.length; i++) {
                    convertCourseDate($scope.topCourseList.courseList[i]);
                }
            }, function(error) {
            });
        }

        var getTeddyCourseData = function() {
            $scope.isCourseLoading = true;
            $scope.courseGroupList = [];
            console.log("getTeddyCourseData");
            CourseService.getCourseList().then(function(result) {
                for (var i = 0; i < result.length; i++) {
                    if (!isInCourseGroup(result[i])) {
                        var courseGroup = {
                            name: result[i].courseName_,
                            courseList: [],
                            isOpen: false,
                            isShow: true
                        }
                        for (var j = 0; j < result.length; j++) {
                            if (courseGroup.name == result[j].courseName_) {
                                result[j].isShow = true;
                                courseGroup.courseList.push(result[j]);
                            }
                        }
                        $scope.courseGroupList.push(courseGroup);
                    }
                }
                $scope.isCourseLoading = false;
                for (var i = 0; i < $scope.courseGroupList.length; i++) {
                    for (var j = 0; j < $scope.courseGroupList[i].courseList.length; j++) {
                        convertCourseDate($scope.courseGroupList[i].courseList[j]);
                    }
                }
                console.log($scope.courseGroupList)
            }, function(error) {
                $scope.isCourseLoading = false;
            });
        }

        var convertCourseDate = function(course) {
            for (var z = 0; z < course.dates_.length; z++) {
                var day = moment(course.dates_[z], "MM-DD-YYYY E");
                var dayString = day.toString();
                var weekDay = dayString.split(" ")[0].split("")[1];
                course.dates_[z] = course.dates_[z] +  "(" + weekDay +  ")";
            }
        }

        var isInCourseGroup = function(course) {
            var isInGroup = false
            for (var i = 0; i < $scope.courseGroupList.length; i++) {
                if ($scope.courseGroupList[i].name == course.courseName_) {
                    isInGroup = true;
                    break;
                }
            }
            return isInGroup;
        }

        var deleteRow = function(id) {
            $.ajax({
                url: "/SLM2016/CourseManagerServlet",
                type: "POST",
                data: id,
                dataType: "text",
                headers: {
                    Delete: true
                },
                success: function() {
                    getTeddyCourseData();
                }
            })
            setTimeout(function() {
                $scope.$apply(function() {
                    $scope.time = new Date();
                });
            }, 500);
        }
        var openGroupLevel = function(group) {
            group.isOpen = !group.isOpen;
        }
        var goStudentManage = function(courseId) {
            $state.go(STATES.COURSEINFO_STUDENT, {
                courseId: courseId
            })
        }

        var changeStatusFilter = function(status) {
            resetCourseGroupList();
            $scope.searchKey.status = status;
            for (var i = 0; i < $scope.courseGroupList.length; i++) {
                var isGroupOpen = false;
                var courseList = $scope.courseGroupList[i].courseList;
                for (var j = 0; j < courseList.length; j++) {
                    if(courseList[j].status_.includes(status)) {
                        if($scope.searchKey.batch != '') {
                            if(courseList[j].batch_.includes($scope.searchKey.batch)) {
                                $scope.topCourseList.isShow = false;
                                isGroupOpen = true;
                                courseList[j].isShow = true;
                            }
                        }
                        else {
                            if(status != '') {
                                $scope.topCourseList.isShow = false;
                                isGroupOpen = true;
                                courseList[j].isShow = true;
                            }
                        }
                    }
                }
                $scope.courseGroupList[i].isShow = isGroupOpen;
                $scope.courseGroupList[i].isOpen = isGroupOpen;
            }
            if($scope.searchKey.status != '' || $scope.searchKey.batch != '') {
                $scope.topCourseList.isShow = false;
            }
        }

        var isBatchSearchChange = function() {
            resetCourseGroupList();
            for (var i = 0; i < $scope.courseGroupList.length; i++) {
                var isGroupOpen = false;
                var courseList = $scope.courseGroupList[i].courseList;
                for (var j = 0; j < courseList.length; j++) {
                    if(courseList[j].batch_.includes($scope.searchKey.batch)) {
                        if($scope.searchKey.status != '') {
                            if(courseList[j].status_ == $scope.searchKey.status) {
                                isGroupOpen = true;
                                courseList[j].isShow = true;
                            }
                        }
                        else {
                            if($scope.searchKey.batch != '') {
                                isGroupOpen = true;
                                courseList[j].isShow = true;
                            }
                        }
                    }
                }
                $scope.courseGroupList[i].isShow = isGroupOpen;
                $scope.courseGroupList[i].isOpen = isGroupOpen;
            }
            if($scope.searchKey.status != '' || $scope.searchKey.batch != '') {
                $scope.topCourseList.isShow = false;
            }
        }

        var isGroupEmpty = function() {
            var isEmpty = true;

            if ($scope.searchKey.batch != "" || $scope.searchKey.status != "") {
                for (var i = 0; i < $scope.courseGroupList.length; i++) {
                    if($scope.courseGroupList[i].isShow) {
                        isEmpty = false;
                        break;
                    }
                }
            }
            else {
                isEmpty = false;
            }
                
            return isEmpty;
        }

        var resetCourseGroupList = function() {
            $scope.topCourseList.isShow = true;
            for (var i = 0; i < $scope.courseGroupList.length; i++) {
                $scope.courseGroupList[i].isShow = true;
                $scope.courseGroupList[i].isOpen = false;
                var courseList = $scope.courseGroupList[i].courseList;
                for (var j = 0; j < courseList.length; j++) {
                    courseList[j].isShow = false;
                }
            }
        }

        var changeCourseStatus = function(status, course) {
            CourseService.updateCourseStatus(course.courseId_, status).then(function() {
                course.status_ = status;
            })
        }

        var isCourseShow = function(course) {
            if ($scope.searchKey.batch != "" || $scope.searchKey.status != "") 
                return course.isShow
            else 
                return true;
        }

        var isCourseGroupShow = function(group) {
            if ($scope.searchKey.batch != "" || $scope.searchKey.status != "") 
                return group.isShow
            else 
                return true;
            
        }

        var init = function() {
            getTopCourse();
            getTeddyCourseData();
        }

        /*==========================
            Members
        ==========================*/

        $scope.courseGroupList = [];
        $scope.topCourseList = {
            courseList: [],
            isOpen: true,
            isShow: true
        };
        $scope.isCourseLoading = false;
        $scope.searchKey = {
            batch: "",
            status:""
        }

        /*==========================
            Methods
        ==========================*/

        $scope.deleteRow = deleteRow;
        $scope.goStudentManage = goStudentManage;
        $scope.openGroupLevel = openGroupLevel;
        $scope.changeStatusFilter = changeStatusFilter;
        $scope.changeCourseStatus = changeCourseStatus;
        $scope.isCourseShow = isCourseShow;
        $scope.isCourseGroupShow = isCourseGroupShow;
        $scope.isGroupEmpty = isGroupEmpty;
        $scope.isBatchSearchChange = isBatchSearchChange;

        /*==========================
            Init
        ==========================*/

        init();
    }
]);
