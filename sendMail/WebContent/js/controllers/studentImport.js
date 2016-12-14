app.controller('StudentImportController', ['$scope', '$state', '$timeout', '$rootScope', 'StudentInfoService', 'CourseService',
    function($scope, $state, $timeout, $rootScope, StudentInfoService, CourseService) {

        var getCourseList = function() {
            $scope.isCourseLoading = true;
            CourseService.getCourseSimpleList().then(function(result) {
                $scope.isCourseLoading = false;
                if (result.length > 0) {
                    for (var i = 0; i < result.length; i++) {
                        $scope.courseList.push(result[i]);
                    }
                    getStudentList($scope.courseList[0]);
                } else {
                    $scope.isCourseEmpty = true;
                }
            }, function(error) {
                $scope.isCourseLoading = false;
                $scope.isCourseLoadError = true;
            })
        }

        var changeCurrentCourse = function(course) {
            $scope.studentList.length = 0;
            $scope.currentCourse = undefined;
            getStudentList(course);
        }

        var getStudentList = function(course) {
            $scope.isCourseLoading = true;
            StudentInfoService.getStudentListByCourseId(course.courseId_).then(function(result) {
                $scope.isCourseLoading = false;
                $scope.currentCourse = course;
                for (var i = 0; i < result.length; i++) {
                    $scope.studentList.push(result[i]);
                }
            }, function(error) {
                $scope.isCourseLoading = false;
            })
        }

        var fileChanged = function(files) {
            clearFile();
            $scope.excelFile = files;
            StudentInfoService.readFile($scope.excelFile, $scope.showPreview, $scope.showJSONPreview)
                .then(function(xlsxData) {
                    $scope.sheets = xlsxData.sheets;
                    $scope.items = $scope.sheets[Object.keys($scope.sheets)[0]]
                    updateItems();
                });
        };

        // cell data handle
        var updateItems = function() {
            $scope.terms = (Object.keys($scope.items[0]));
            $scope.showData = $scope.items;

            for (arr1 = 0; arr1 <= $scope.items.length; arr1++) {
                for (arr2 = 0; arr2 < $scope.terms.length; arr2++) {
                    $scope.showData[arr1][arr2] = $scope.items[arr1][$scope.terms[arr2]];
                    delete $scope.showData[arr1][$scope.terms[arr2]];
                }
            }
        }

        // transfer data to server
        var uploadFile = function() {
            if (!$scope.excelFile) {
                $scope.isFileEmpty = true;
                return;
            } else {
                $scope.isFileEmpty = false;
            }
            if ($scope.isCourseEmpty) {
                return;
            }
            $scope.isUploadFail = false;
            $scope.isUploadSuccess = false;
            $scope.isUploading = true;
            StudentInfoService.uploadStudentFile($scope.excelFile, $scope.currentCourse.courseId_).then(function(result) {
                StudentInfoService.saveStudentFile($scope.excelFile, $scope.currentCourse.courseId_).then(function(result) {
                    $scope.isUploading = false;
                    if (result.status) {
                        $scope.isUploadSuccess = true;
                        $scope.items = [];
                        $scope.sheets = [];
                        $scope.excelFile = undefined;
                        $scope.showData = undefined;
                        alert("上傳成功！");
                    } else {
                        $scope.isUploadFail = true;
                    }
                });
            }, function(error) {
                $scope.isUploading = false;
                $scope.isUploadFail = true;
            });
        };

        var clearFile = function() {
            $scope.isUploading = false;
            $scope.isUploadSuccess = false;
            $scope.isUploadFail = false;
            $scope.showPreview = false;
            $scope.items = [];
            $scope.sheets = [];
            $scope.excelFile = undefined;
        }

        var init = function() {
            getCourseList();
        }

        /*==========================
            Events
        ==========================*/

        /*==========================
            Members
        ==========================*/

        $scope.isCourseEmpty = false;
        $scope.isUploading = false;
        $scope.isUploadSuccess = true;
        $scope.isUploadFail = false;
        $scope.isAlreadyUpload = false;
        $scope.showPreview = false;
        $scope.showJSONPreview = true;
        $scope.isFileEmpty = false;
        $scope.excelFile = undefined;
        $scope.items = [];
        $scope.sheets = [];
        $scope.courseList = [];
        $scope.studentList = [];
        $scope.currentCourse;
        $scope.isCourseLoading = false;

        /*==========================
             Methods
        ==========================*/

        $scope.fileChanged = fileChanged;
        $scope.updateItems = updateItems;
        $scope.uploadFile = uploadFile;
        $scope.changeCurrentCourse = changeCurrentCourse;

        /*==========================
             init
        ==========================*/

        init();

    }
]);
