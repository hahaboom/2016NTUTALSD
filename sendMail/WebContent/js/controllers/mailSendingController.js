app.controller("MailSendingController", ['$scope', '$state', '$timeout', '$rootScope',
    function($scope, $state, $timeout, $rootScope) {

        var selectedIndexCount = 0;

        function e_mail_preview(Name, Course) {
            var temp_name = document.createElement('temp');
            temp.previewBox.value = 'Hi ' + Name + ',\n' + ' 您好，歡迎報名' + Course + '，以下是您的上課通知，請參考。\n' + '若有任何問題，歡迎隨時聯絡我們。\n' + '泰迪軟體 Erica'
        }

        function getClasses() {
            $.get("/sendMail/SendGmailServlet", function(responseText) {
                classArray = responseText.classes_;
                for (i = 0; i < classArray.length; i++) {
                    document.myForm.courseCheckbox.options[i] = new Option(classArray[i].className_, i);
                }
            });
        }

        function setCCAddressCheckList() {
            for (i = 0; i < ccAddresses.length; i++) {
                var ccCheckList = document.getElementById("carbonCopyName");
                var ccCheckbox = document.createElement("input");
                ccCheckbox.type = "checkbox";
                ccCheckbox.name = "ccCheckboxName";
                ccCheckbox.value = i;
                ccCheckbox.checked = true;
                ccCheckList.appendChild(ccCheckbox);
                var label = document.createElement('label')
                label.appendChild(document.createTextNode(ccAddresses[i]));
                ccCheckList.appendChild(label);
                ccCheckList.appendChild(document.createElement("br"));
            }
        }

        function getStudentnameByClassIndex() {
            var data = document.myForm.courseCheckbox.selectedIndex;

            $.ajax({
                url: "/sendMail/SendGmailServlet",
                type: "POST",
                data: JSON.stringify(data),
                async: false,
                cache: false,
                headers: {
                    "isSend": false
                },
                success: function(data) {
                    studentNameArray = [];
                    mailArray = [];
                    for (i = 0; i < data.studentInfomation_.studentsName_.length; i++) {
                        studentNameArray.push(data.studentInfomation_.studentsName_[i]);
                        mailArray.push(data.studentInfomation_.mailAddresses_[i]);
                    }
                }
            })
        }

        var updateStudentCheckList = function() {
            //---------------------------------
            getStudentnameByClassIndex();
            //---------------------------------
            var index = 0;
            var studentCheckList = document.getElementById("studentName");
            var preview_submit_disable = document.getElementById("preview_submit");
            var send_submit_disable = document.getElementById("send_submit");
            studentCheckList.innerHTML = "";
            preview_submit_disable.disabled = "";
            send_submit_disable.disabled = "disabled";
            for (i = 0; i < studentNameArray.length; i++) {
                var studentName = studentNameArray[i];
                var checkbox = document.createElement("input");
                checkbox.type = "checkbox";
                checkbox.name = "checkbox_name";
                checkbox.value = studentName;
                checkbox.checked = true;
                studentCheckList.appendChild(checkbox);

                var label = document.createElement('label')
                label.htmlFor = studentName;
                label.appendChild(document.createTextNode(studentName));

                var Mail_Address = mailArray[i];
                var Mail_Address_label = document.createElement('Mail_Address_label')
                Mail_Address_label.htmlFor = Mail_Address;
                Mail_Address_label.appendChild(document.createTextNode(Mail_Address));

                studentCheckList.appendChild(label);
                studentCheckList.appendChild(document.createTextNode(" : "));
                studentCheckList.appendChild(Mail_Address_label);
                studentCheckList.appendChild(document.createElement("br"));
            }
            var temp_name = document.createElement('temp');
            temp.previewBox.value = '請按下產生';
            document.temp.member.options.length = 0;
        }

        // Trigger event when user click student name for preview input
        var updateMailContent = function() {
            var classIndex = document.getElementById("courseCheckbox").value;
            // check which one student be choose by user
            for (i = 0; i < selectedIndexCount; i++) {
                if (document.temp.member.options[i].selected)
                // Call function to update e-mail preview content
                    e_mail_preview(document.temp.member.options[i].value, classArray[classIndex].className_);
            }
        }

        var generatePreviewMail = function() {
            selectedIndexCount = 0;
            var studentCheckList = document.getElementById("studentName").childNodes[1].firstChild;
            var inpText_Name = studentCheckList.parentNode;
            var send_submit_disable = document.getElementById("send_submit");
            send_submit_disable.disabled = "";
            // Get students name
            var inptext_name = inpText_Name.parentNode.innerText;
            // Import students name into array for mail preview purpose
            var array_name = inptext_name.split('\n');
            var checkbox_list = document.getElementsByName('checkbox_name');
            document.temp.member.length = 0;
            for (i = 0; i < array_name.length - 1; i++) {
                if (checkbox_list[i].checked) {
                    document.temp.member.options[selectedIndexCount] = new Option(
                        checkbox_list[i].value, checkbox_list[i].value);
                    selectedIndexCount = selectedIndexCount + 1;
                }
            }
            var temp_name = document.createElement('temp');
            temp.previewBox.value = '請透過選取下方名單來預覽信件';
        }

        function sendMail() {
            var data = new Object();
            var data_buffer = [];
            var studentCheckList = document.getElementById("studentName").childNodes[1].firstChild;
            var inpText_Name = studentCheckList.parentNode;
            var inptext_name = inpText_Name.parentNode.innerText;
            var array_name = inptext_name.split('\n');
            var checkbox_list = document.getElementsByName('checkbox_name');
            // Return index to back end
            var checked = 0;
            for (i = 0; i < array_name.length - 1; i++) {
                if (checkbox_list[i].checked) {
                    data_buffer.push(i);
                    checked = 1;
                }
            }
            if (checked == 1) {
                data.classIndex_ = parseInt(document.getElementById("courseCheckbox").value);
                data.indexes_ = data_buffer;

                //prepare ccAddresses
                var ccCheckList = document.getElementsByName('carbonCopyName');
                var checkbox_list = document.getElementsByName('ccCheckboxName');
                var ccAddressesString = "";
                for (i = 0; i < ccAddresses.length; i++) {
                    if (checkbox_list[i].checked) {
                        ccAddressesString += ccAddresses[i];
                        ccAddressesString += ",";
                    }
                }
                ccAddressesString = ccAddressesString.substr(0, ccAddressesString.length - 1);
                data.ccAddresses_ = ccAddressesString;
                $.post("/sendMail/SendGmailServlet",
                    JSON.stringify(data)).done(function(data) {
                    window.alert(data);
                });
            }
            if (checked == 0)
                window.alert("Please choose Recipient!!");
            generatePreviewMail();
        }

        var clickSendMailButton = function() {
            if (confirm("是否確認寄送!?") == true) {
                sendMail();
            } else {

            }
        }

        var init = function() {
            classArray = new Array();
            studentNameArray = new Array();
            mailArray = new Array();
            ccAddresses = ["teddy@teddysoft.tw", "erica@teddysoft.tw", "service@teddysoft.tw"];
            getClasses();
            setCCAddressCheckList();
        }

        $scope.selectedValue1;
        $scope.selectedValue2;
        $scope.generatePreviewMail = generatePreviewMail;
        $scope.clickSendMailButton = clickSendMailButton;
        $scope.updateMailContent = updateMailContent;
        $scope.updateStudentCheckList = updateStudentCheckList;
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
