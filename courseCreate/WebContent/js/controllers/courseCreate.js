app.controller("CourseCreateController", ['$scope', '$state', '$timeout', '$rootScope', '$q',
    function($scope, $state, $timeout, $rootScope, $q, UploadAttachmentService) {
        var vm = this;
        var showCcList = [];
        var ticketTypeList = [];
        var ticketPriceList = [];
        var showticketList = [];
        var updateticketsList = [];
        var showDateList = [];

        var courseNameSelected = '';
        var locationSelected = '';
        var ccAddressSelected = '';
        var typeSelected = '';
        var ticketTypeSelected = '';

        var Course = function(courseName, courseCode) {
            this.name = courseName;
            this.code = courseCode;
            this.readableName = courseName;
        };

        //set CourseName dropdownList
        vm.selectedDropdownCourseNameItem = null;
        vm.dropdownCourseNameItems = [
            new Course('Scrum敏捷方法實作班', 'SC0'),
            new Course('看板方法與精實開發實作班', 'KB0'),
            new Course('軟體重構入門實作班', 'RF1'),
            new Course('敏捷產品經理實作班', 'PO0'),
            new Course('Design Patterns入門實作班', 'DP1'),
            new Course('Design Patterns進階實作班', 'DP2'),
            new Course('單元測試與持續整合實作班', 'UT0'),
            new Course('例外處理設計與重構實作班', 'EH0')
        ];

        vm.itemLocationSelected = function(item) {
            locationSelected = item;
        }

        vm.filterCourseNameList = function(userInput) {
            courseNameSelected = new Course(userInput, '');
            document.getElementById('Code').readOnly = false;
            var filter = $q.defer();
            var normalisedInput = userInput.toLowerCase();
            var filteredArray = vm.dropdownCourseNameItems.filter(function(courseName) {
                var matchCourseName = courseName.name.toLowerCase().indexOf(normalisedInput) === 0;
                return matchCourseName;
            });
            filter.resolve(filteredArray);
            return filter.promise;
        };

        vm.itemCourseNameSelected = function(item) {
            courseNameSelected = item;
            $scope.data.code = item.code;
            document.getElementById('Code').readOnly = true;
        };

        //set Type dropdownList
        vm.selectedDropdownTypeItem = null;
        vm.dropdownTypeItems = ['公開班', '企業內訓', '演講'];

        vm.filterTypeList = function(userInput) {
            typeSelected = userInput;
            var filter = $q.defer();
            var normalisedInput = userInput.toLowerCase();
            var filteredArray = vm.dropdownTypeItems.filter(function(type) {
                return type.toLowerCase().indexOf(normalisedInput) == 0;
            });
            filter.resolve(filteredArray);
            return filter.promise;
        };

        vm.itemTypeSelected = function(item) {
            typeSelected = item;
        };

        //set TicketType dropdownList
        vm.selectedDropdownTicketTypeItem = null;
        vm.dropdownTicketTypeItems = ['原價', '早鳥', '泰迪之友', '四人團報'];

        vm.filterTicketTypeList = function(userInput) {
            ticketTicketTypeSelected = userInput;
            var filter = $q.defer();
            var normalisedInput = userInput.toLowerCase();
            var filteredArray = vm.dropdownTicketTypeItems.filter(function(ticketType) {
                return ticketType.toLowerCase().indexOf(normalisedInput) == 0;
            });
            filter.resolve(filteredArray);
            return filter.promise;
        };

        vm.itemTicketTypeSelected = function(item) {
            ticketTicketTypeSelected = item;
        };

        //set CcAddress dropdownList
        vm.selectedDropdownCcAddressItem = null;
        vm.dropdownCcAddressItems = ['service@teddysoft.tw', 'teddy@teddysoft.tw', 'erica@teddysoft.tw'];

        vm.filterCcAddressList = function(userInput) {
            ccAddressSelected = userInput;
            var filter = $q.defer();
            var normalisedInput = userInput.toLowerCase();
            var filteredArray = vm.dropdownCcAddressItems.filter(function(ccAddress) {
                return ccAddress.toLowerCase().indexOf(normalisedInput) == 0;
            });
            filter.resolve(filteredArray);
            return filter.promise;
        };

        vm.itemCcAddressSelected = function(item) {
            ccAddressSelected = item;
        };

        //set Location dropdownList
        vm.selectedDropdownLocationItem = null;
        vm.dropdownLocationItems = ['延平南路12號4樓', '北科科研1622室', '北科育成305室', '北科育成201室'];

        vm.filterLocationList = function(userInput) {
            locationSelected = userInput;
            var filter = $q.defer();
            var normalisedInput = userInput.toLowerCase();
            var filteredArray = vm.dropdownLocationItems.filter(function(location) {
                return location.toLowerCase().indexOf(normalisedInput) == 0;
            });
            filter.resolve(filteredArray);
            return filter.promise;
        };

        vm.dropdownStatusItems = ['準備中', '報名中', '取消', '確定開課', '停止報名', '上課中', '課程結束'];
        vm.selectedDropdownStatusItem = vm.dropdownStatusItems[0];

        function changeloadType(type) {
            $scope.loadType = type;
        }

        function addCourse() {
            var data = new Object();
            data.courseName_ = courseNameSelected.name;
            data.courseCode_ = $scope.data.code;
            data.batch_ = $scope.data.batch;
            data.dates_ = $scope.showDateList;
            data.duration_ = parseInt($scope.data.duration);
            data.ticketTypes_ = $scope.ticketTypeList;
            data.prices_ = $scope.ticketPriceList;
            data.location_ = locationSelected;
            data.lecturer_ = $scope.data.lecturer;
            data.hyperlink_ = $scope.data.hyperlink;
            data.ccAddresses_ = $scope.showCcList;
            data.type_ = typeSelected;
            data.status_ = vm.selectedDropdownStatusItem;
            $.post("/SLM2016/CourseManagerServlet",
                JSON.stringify(data)).done(function(response) {
                if (response == "Success") {
                    window.alert("開課成功");
                    deleteData();
                    $.ajax({
                        url: "/SLM2016/CourseManagerServlet",
                        type: "POST",
                        data: JSON.stringify(data),
                        headers: {
                            "GetId": true
                        },
                        success: function(data) {
                            $state.go(STATES.COURSEINFO_STUDENT, {
                                courseId: data
                            })
                        }
                    })
                } else {
                    window.alert("開課失敗" + response);
                }
            });
            setTimeout(function() {
                $scope.$apply(function() {
                    $scope.time = new Date();
                });
            }, 500);
        }

        function clickAddTicketButton() {
            var regex = /^[a-zA-Z]+$/;
            if (((ticketTicketTypeSelected) == null) || (($scope.data.price) == null) || (($scope.data.price.length) == 0) | ((ticketTicketTypeSelected.length) == 0)) {
                window.alert("課程票價或票種請修正");
            } else {
                if ((($scope.data.price).match(regex))) {
                    window.alert("票價需要為數字");
                } else {
                    if ((($scope.data.price) > 2147483647) || (($scope.data.price) < 0)) {
                        window.alert("課程金額過大");
                    } else {
                        $scope.ticketTypeList.push(ticketTicketTypeSelected);
                        $scope.ticketPriceList.push($scope.data.price);
                        $scope.showticketList.push(ticketTicketTypeSelected + "  $" + $scope.data.price);
                        ticketTicketTypeSelected = null;
                        $scope.data.price = null;
                    }
                }
            }
        }

        function clickAddCcButton() {
            var lastAtPos = (ccAddressSelected).lastIndexOf('@');
            var lastDotPos = (ccAddressSelected).lastIndexOf('.');
            if (((ccAddressSelected) == null) || ((ccAddressSelected) == 0)) {
                window.alert("請輸入副本收件者地址");
            } else {
                if (lastAtPos < lastDotPos && lastAtPos > 0 && (ccAddressSelected).indexOf('@@') == -1 && lastDotPos > 2 && ((ccAddressSelected).length - lastDotPos) > 2) {
                    $scope.showCcList.push(ccAddressSelected);
                    ccAddressSelected = null;
                } else {
                    window.alert("副本收件者地址請修正");
                }
            }
        }

        function clickAddDateButton() {
            if ((($scope.data.dateAddresses) == null)) {
                window.alert("請輸入日期");
            } else {
                if ((($scope.data.dateAddresses.length) != 0)) {
                    $scope.data.dateAddresses.setMinutes($scope.data.dateAddresses.getMinutes() - $scope.data.dateAddresses.getTimezoneOffset());
                    $scope.showDateList.push($scope.data.dateAddresses.toISOString().substring(0, 10));
                    $scope.data.dateAddresses = null;
                } else {
                    window.alert("請輸入日期");
                }
            }
        }

        function clickAddCourseButton() {
            if (confirm("是否確認開課!?") == true) {
                checkInput();
            } else {

            }
        }

        function checkInput() {
            if (((courseNameSelected) == null)) {
                window.alert("課程名稱欄位不可為空白");
                return;
            }
            if ((($scope.data.code) == null) || (($scope.data.code).length == 0)) {
                window.alert("課程代碼欄位不可為空白");
                return;
            }
            if (((vm.selectedDropdownStatusItem) == null)) {
                window.alert("狀態欄位不可為空白");
                return;
            }
            if (((courseNameSelected) == 0)) {
                window.alert("課程名稱欄位不可為空白");
                return;
            }
            if (((vm.selectedDropdownStatusItem) == 0)) {
                window.alert("狀態欄位不正確");
                return;
            }
            if ((($scope.data.batch) == null) || (($scope.data.batch).length == 0)) {
                window.alert("梯次欄位不正確");
                return;
            }
            var regex = /^\d+/;
            if ((($scope.data.duration) != null)) {
                var x = $scope.data.duration;
                if (!(String(x).match(regex))) {
                    window.alert("課程時間需要為數字");
                    return;
                }
            }
            addCourse();
        }

        function deleteTicket(index) {
            $scope.showticketList.splice(index, '1');
            $scope.ticketTypeList.splice(index, '1');
            $scope.ticketPriceList.splice(index, '1');

        }

        function deleteDate(index) {
            $scope.showDateList.splice(index, '1');
        }

        function deleteCc(index) {
            $scope.showCcList.splice(index, '1');
        }

        function fileChanged(files) {
            $scope.fileName = files;
        };

        function openDatePicker() {
            $scope.isDatePickerOpen = true;
        }

        function deleteData() {
            $scope.data.code = "";
            $scope.data.batch = "";
            $scope.showDateList = [];
            $scope.data.duration = 0;
            $scope.ticketTypeList = [];
            $scope.ticketPriceList = [];
            $scope.data.lecturer = "";
            $scope.data.hyperlink = "";
            $scope.showCcList = [];
            $scope.showticketList = [];
            $scope.data.price = 0;
            document.forms['courseName'].reset();
            document.forms['type'].reset();
            document.forms['ticketType'].reset();
            document.forms['location'].reset();
            document.forms['ccAddress'].reset();
            vm.selectedDropdownStatusItem = vm.dropdownStatusItems[0];
            courseNameSelected = '';
            locationSelected = '';
            ccAddressSelected = '';
            typeSelected = '';
            ticketTypeSelected = '';
            document.getElementById('Code').readOnly = false;
        }

        var init = function() {
            $scope.data = {
                price: 0,
                code: "",
                batch: "",
                duration: 0,
                lecturer: "",
                hyperlink: ""
            };
            typeSelected = "";
        }

        /*
         * ========================== Events ==========================
         */

        /*
         * ========================== Members ==========================
         */
        $scope.loadType = "Upload";
        $scope.courseList = [];
        $scope.ticketTypeList = [];
        $scope.ticketPriceList = [];
        $scope.showticketList = [];
        $scope.showCcList = [];
        $scope.showDateList = [];
        $scope.updateticketsList = [];
        $scope.isDatePickerOpen = false;
        $scope.format = 'yyyy 年 MM 月 dd 日';
        $scope.dateOptions = {
            locale: 'ru'
        };
        /*
         * ========================== Methods ==========================
         */

        /*
         * ========================== init ==========================
         */

        $scope.selectedValue;
        $scope.fileChanged = fileChanged;
        $scope.clickAddCourseButton = clickAddCourseButton;
        $scope.clickAddTicketButton = clickAddTicketButton;
        $scope.clickAddDateButton = clickAddDateButton;
        $scope.clickAddCcButton = clickAddCcButton;
        $scope.changeloadType = changeloadType;
        $scope.deleteTicket = deleteTicket;
        $scope.deleteDate = deleteDate;
        $scope.deleteCc = deleteCc;
        $scope.openDatePicker = openDatePicker;
        $scope.deleteData = deleteData;
        init();
    }
]);
