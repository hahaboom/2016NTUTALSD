app.controller('StudentManageController', ['$q', '$scope', '$state', '$timeout', '$rootScope', 'StudentInfoService', 'CourseService', '$stateParams', 'Upload',
    function($q, $scope, $state, $timeout, $rootScope, StudentInfoService, CourseService, $stateParams, Upload) {

        var getStudentList = function() {

            StudentInfoService.getStudentListByCourseId($scope.courseId).then(function(result) {
                $scope.isStudentLoading = false;
                for (var i = 0; i < result.length; i++) {
                    result[i].isSelected = false;
                }
                console.log(result)
                $scope.studentList = result;
                calStudentMeal();
                if ($scope.studentList.length > 0)
                    $scope.isStudentListEmpty = false;
            }, function(error) {
                $scope.isStudentLoading = false;
                $scope.isStudentLoadError = true;
            })
        }

        var calStudentMeal = function() {
            for (var i = 0; i < $scope.studentList.length; i++) {
                if($scope.studentList[i].vege_meat == "素食") {
                    $scope.vageNum++;
                }
                else {
                    $scope.meatNum++;
                }
            }
        }

        var getStudentNumByCourseId = function() {

            StudentInfoService.getStudentNumByCourseId($scope.courseId).then(function(result) {
                $scope.studentNum = parseInt(result[0].student_num);
            }, function(error) {
                $scope.isStudentLoading = false;
                $scope.isStudentLoadError = true;
            })
        }

        var getCourseInfo = function() {
            $scope.isStudentLoading = true;

            CourseService.getCourseById($scope.courseId).then(function(result) {
                $scope.currentCourse = result[0];
                getStudentList();
                getStudentNumByCourseId();
            }, function(error) {
                $scope.isStudentLoading = false;
                $scope.isStudentLoadError = true;
            })
        }

        var clearSelectedStudent = function() {
            for (var j = 0; j < $scope.studentList.length; j++) {
                if ($scope.studentList[j].isSelected) {
                    $scope.studentList[j].isSelected = false;
                }
            }
        }

        var selectAllStudent = function() {
            for (var j = 0; j < $scope.studentList.length; j++) {
                $scope.studentList[j].isSelected = true;
            }
        }

        var selectStudents = function() {
            if (!$scope.isStudentLoading) {
                var selectedStudents = getSelectedStudent();
                if (selectedStudents.length != $scope.studentList.length &&
                    selectedStudents.length != 0) {
                    clearSelectedStudent();
                } else if (getSelectedStudent().length == $scope.studentList.length) {
                    clearSelectedStudent();
                } else {
                    selectAllStudent();
                }
            } else {
                return
            }

        }

        var getSelectedStudent = function() {
            var selectedStudents = [];

            for (var i = 0; i < $scope.studentList.length; i++) {
                if ($scope.studentList[i].isSelected) {
                    selectedStudents.push($scope.studentList[i]);
                }
            }

            return selectedStudents;
        }

        var toggleSelectStudent = function(student, index, $event) {
            if ($event.ctrlKey) {
                student.isSelected = !student.isSelected;
                $scope.lastSelectIndex = index;
            } else if ($event.shiftKey) {
                clearSelectedStudent();
                if (index > $scope.lastSelectIndex) {
                    for (var i = $scope.lastSelectIndex; i <= index; i++) {
                        $scope.studentList[i].isSelected = true;
                    }
                } else if (index == $scope.lastSelectIndex) {
                    student.isSelected = false;
                } else {
                    for (var i = index; i <= $scope.lastSelectIndex; i++) {
                        $scope.studentList[i].isSelected = true;
                    }
                }
            } else {
                clearSelectedStudent();
                student.isSelected = !student.isSelected;
                $scope.lastSelectIndex = index;
            }


        }

        var deleteStudent = function() {
            var selectedStudents = getSelectedStudent();
            console.log(selectedStudents);
            var studentIds = "",
                studentName = "";
            for (var i = 0; i < selectedStudents.length; i++) {
                if (i == selectedStudents.length - 1) {
                    studentIds += "'" + selectedStudents[i].id + "'";
                    studentName += selectedStudents[i].name;
                } else {
                    studentIds += "'" + selectedStudents[i].id + "',";
                    studentName += selectedStudents[i].name + "、";
                }
            }
            console.log(studentIds);
            var ans = confirm('確定刪除 ' + studentName + '?');
            if (ans) {
                StudentInfoService.deleteSelectStudent(studentIds).then(function(result) {
                    getCourseInfo();
                    alert("學員刪除成功");
                }, function(error) {
                    alert("學員刪除失敗");
                })
            }
        }

        var sendMailData = function() {
            var mailData = [];
            var i = 0;

            for (var j = 0; j < $scope.studentList.length; j++) {
                if ($scope.studentList[j].isSelected) {
                    mailData[i] = new Object();
                    mailData[i].studentId = $scope.studentList[j].id;
                    mailData[i].studentName = $scope.studentList[j].name;
                    mailData[i].courseId = $scope.studentList[j].fk_course_info_id;
                    mailData[i].address = $scope.studentList[j].email;
                    mailData[i].certificationId = $scope.studentList[j].certification_id;
                    i++;
                }
            }

            if (mailData.length != 0) {
                StudentInfoService.putStudentSendMailData(mailData);
                $state.go(STATES.COURSEINFO_SENDMAIL, {
                    courseId: $scope.courseId
                });
            } else {
                return;
            }

        }

        var changeStudentStatus = function(student, num) {
            student.isSelected = !student.isSelected;
            console.log(student);
            if (num == 0)
                student.payment_status = "免繳費";
            else if (num == 1)
                student.payment_status = "未繳費";
            else if (num == 2)
                student.payment_status = "課後再繳費";
            else if (num == 3)
                student.payment_status = "已繳費";

            StudentInfoService.updateStudentReceiptStatus(student.receipt_EIN, student.payment_status, student.receipt_status, student.id).then(function(result) {
                for (var i = 0; i < $scope.studentList.length; i++) {
                    if ($scope.studentList[i].id == student.id) {
                        $scope.studentList[i].receipt_EIN = student.receipt_EIN;
                        $scope.studentList[i].payment_status = student.payment_status;
                        $scope.studentList[i].receipt_status = student.receipt_status;
                        break;
                    }
                }
                console.log(result);
            }, function(error) {
                console.log(error);
            })
        }

        var changeCertificationBackground = function(file) {
            clearFile();
            var previewBackground = document.getElementById("previewBackground");
            document.getElementById("uploadpreviewBackground").style.display = "none";
            document.getElementById("viewBackground").style.display = "none";
            $scope.isViewing = false;
            document.getElementById("viewTempResult_button").value = "預覽套用結果";

            $scope.imgFile = file;
            if ($scope.imgFile != null) {
                previewBackground.style.display = "none";
                uploadpreviewBackground.style.display = "";
                document.getElementById('statusLabel').innerHTML = '已選擇證書底圖預覽';
                checkImageSize(file);
                document.getElementById("uploadbackground_button").style.visibility = "visible";
                document.getElementById("viewTempResult_button").disabled = true;
            } else
                previewBackground.style.display = "";
        }

        var clearFile = function() {
            $scope.imgFile = null;
        }

        var getBackgound = function() {
            $scope.isViewing = false;
            $scope.isInfoOpen = !$scope.isInfoOpen;
            clearFile();
            document.getElementById('statusLabel').innerHTML = '目前證書底圖預覽';
            document.getElementById("warningMessage").style.display = "none";
            document.getElementById("uploadbackground_button").style.visibility = "hidden";
            document.getElementById("viewTempResult_button").disabled = false;
            var uploadpreviewBackground = document.getElementById("uploadpreviewBackground");
            var previewBackground = document.getElementById("previewBackground");
            var loadingBackground = document.getElementById("loadingBackground");
            var viewBackground = document.getElementById("viewBackground");
            loadingBackground.style.display = "";
            uploadpreviewBackground.style.display = "none";
            previewBackground.style.display = "none";
            viewBackground.style.display = "none";
            $scope.isViewing = false;
            document.getElementById("viewTempResult_button").value = "預覽套用結果";

            var data = new Object();
            data.id_ = "";
            data.owner_ = "";
            data.date_ = "";
            data.courceDate_ = "";
            data.courceName_ = "";
            data.courceDuration_ = "";
            data.courceId_ = $scope.currentCourse.courseId_;
            $.post("/SLM2016/CertificationServlet", JSON.stringify(data))
                .done(function(data) {
                    loadingBackground.style.display = "none";
                    document.getElementById("blah").setAttribute('src', 'data:image/png;base64,' + data);
                    var previewBackground = document.getElementById("previewBackground");
                    previewBackground.style.display = "";
                });
        }

        function checkImageSize(file) {
            var img = new Image();
            img.src = window.URL.createObjectURL(file);
            setTimeout(function() {
                if (img.naturalWidth != 1754 || img.naturalHeight != 1240) {
                    document.getElementById("warningMessage").style.display = "";
                } else {
                    document.getElementById("warningMessage").style.display = "none";
                }
            }, 300);
        }

        var uploadBackground = function() {
            if (!$scope.imgFile) {
                window.alert("請選取檔案");
                return;
            }
            if (document.getElementById("warningMessage").style.display == "") {
                if (confirm("圖片大小不符合！！！是否確認上傳!?") == false) {
                    return;
                } else {

                }
            } else {
                if (confirm("是否確認上傳!?") == false) {
                    return;
                } else {

                }
            }
            var loadingBackground = document.getElementById("loadingBackground");
            loadingBackground.style.display = "";
            var defer = $q.defer();
            Upload.upload({
                url: '/SLM2016/UpdateCertificationBackgroundServlet',
                withCredential: true,
                data: {
                    courseId: $scope.currentCourse.courseId_
                },
                file: $scope.imgFile
            }).success(function(data) {
                if (data.status == "true") {
                    window.alert("上傳成功");
                    getBackgound();
                    document.getElementById("uploadbackground_button").style.visibility = "hidden";
                    document.getElementById("viewTempResult_button").disabled = false;
                } else {
                    window.alert("上傳失敗");
                    console.log(data.status);
                }
            }).error(function(error) {
                window.alert("上傳失敗");
                console.log(error);
            });
        }

        var viewTempResult = function() {
            if ($scope.isViewing) {
                document.getElementById("viewTempResult_button").value = "預覽套用結果";
                document.getElementById('statusLabel').innerHTML = '目前證書底圖預覽';
                clearFile();
                document.getElementById("previewBackground").style.display = "";
                document.getElementById("viewBackground").style.display = "none";
            } else {
                document.getElementById("viewTempResult_button").value = "預覽當前底圖";
                document.getElementById('statusLabel').innerHTML = '完整證書預覽';
                clearFile();
                var uploadpreviewBackground = document.getElementById("uploadpreviewBackground");
                var previewBackground = document.getElementById("previewBackground");
                var loadingBackground = document.getElementById("loadingBackground");
                var viewBackground = document.getElementById("viewBackground");
                loadingBackground.style.display = "";
                uploadpreviewBackground.style.display = "none";
                previewBackground.style.display = "none";
                viewBackground.style.display = "none";


                var data = new Object();
                data.id_ = "SC01603-33";
                data.owner_ = "陳泰迪";
                data.date_ = "2016 年 4 月 23 日";
                data.courceDate_ = " 於  2016 年 4 月 16、17、23 日 ";
                data.courceName_ = "Design Patterns 這樣學就會了：入門實作班";
                data.courceDuration_ = "全期共十八小時研習期滿，特此證明";
                data.courceId_ = $scope.currentCourse.courseId_;

                $.post("/SLM2016/CertificationServlet", JSON.stringify(data))
                    .done(function(data) {
                        loadingBackground.style.display = "none";
                        document.getElementById("viewImg").setAttribute('src', 'data:image/png;base64,' + data);
                        var viewBackground = document.getElementById("viewBackground");
                        viewBackground.style.display = "";
                    });
            }
            $scope.isViewing = !$scope.isViewing;
        }

        var openInvoiceModal = function() {
            $rootScope.$broadcast("OPEN_INVOICE_MODAL", {
                list: getSelectedStudent(),
                course: $scope.currentCourse
            });
        }

        var fileChanged = function(files) {
            if ($scope.isUploading) {
                return;
            }
            if (!files) {
                return;
            }
            $scope.isUploading = true;
            var uploadConfirm = confirm("是否要上傳\"" + files.name + "\"?")
            console.log(files);
            if (uploadConfirm) {
                StudentInfoService.uploadStudentFile(files, $scope.currentCourse.courseId_).then(function(result) {
                    StudentInfoService.saveStudentFile(files, $scope.currentCourse.courseId_).then(function(result) {
                        $scope.isUploading = false;
                        if (result.status) {
                            alert("上傳成功！");
                            getStudentList();
                            getStudentNumByCourseId();
                        } else {
                            alert('上傳失敗，請稍後再試')
                        }
                    });
                }, function(error) {
                    $scope.isUploading = false;
                    alert('上傳失敗，請稍後再試')
                });
            }
        };

        var goCourseManage = function() {
            $state.go(STATES.COURSEINFO_MANAGE)
        }

        var generatecertificationId = function() {
            var courseId = $scope.currentCourse.courseId_;
            $scope.isInfoOpen = !$scope.isInfoOpen;
            StudentInfoService.generateCertificationId(courseId);
        }

        var changeCourseStatus = function(status) {
            CourseService.updateCourseStatus($scope.currentCourse.courseId_, status).then(function() {
                $scope.currentCourse.status_ = status;
            })
        }

        var toggleCourseInfo = function() {
            $scope.isInfoOpen = !$scope.isInfoOpen;
        }

        var gotoCourseUrl = function() {
            var url = $scope.currentCourse.hyperlink_;

            if (!url.includes("http")) {
                url = "https://" + url
            }
            // $window.location.href = url;
            var newWindow = window.open(url);
            newWindow.focus();
        }

        var init = function() {
            getCourseInfo();
        }

        /*==========================
            Events
        ==========================*/

        /*==========================
            Members
        ==========================*/
        $scope.isViewing = false;
        $scope.isCourseEmpty = false;
        $scope.isStudentLoadError = false;
        $scope.isStudentLoading = false;
        $scope.studentList = [];
        $scope.sendMailData = sendMailData;
        $scope.courseList = [];
        $scope.currentCourse;
        $scope.courseId = $stateParams.courseId;
        $scope.lastSelectIndex = 0;
        $scope.searchName = "";
        $scope.isStudentListEmpty = true;
        $scope.studentNum = 0;
        $scope.isInfoOpen = false;
        $scope.isUploading = false;
        $scope.vageNum = 0;
        $scope.meatNum = 0;

        /*==========================
             Methods
        ==========================*/
        $scope.viewTempResult = viewTempResult;
        $scope.uploadBackground = uploadBackground;
        $scope.getBackgound = getBackgound;
        $scope.changeCertificationBackground = changeCertificationBackground;
        $scope.toggleSelectStudent = toggleSelectStudent;
        $scope.changeStudentStatus = changeStudentStatus;
        $scope.openInvoiceModal = openInvoiceModal;
        $scope.goCourseManage = goCourseManage;
        $scope.getSelectedStudent = getSelectedStudent;
        $scope.selectAllStudent = selectAllStudent;
        $scope.selectStudents = selectStudents;
        $scope.fileChanged = fileChanged;
        $scope.generatecertificationId = generatecertificationId;
        $scope.getStudentList = getStudentList;
        $scope.changeCourseStatus = changeCourseStatus;
        $scope.toggleCourseInfo = toggleCourseInfo;
        $scope.gotoCourseUrl = gotoCourseUrl;
        $scope.deleteStudent = deleteStudent;
        /*==========================
             init
        ==========================*/

        init();

    }
]);
