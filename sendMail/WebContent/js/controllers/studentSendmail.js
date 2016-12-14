app.controller('StudentSendmailController', ['$scope', '$state', '$timeout', '$rootScope', 'StudentInfoService', 'CourseService', '$stateParams',
    function ($scope, $state, $timeout, $rootScope, StudentInfoService, CourseService, $stateParams) {  

			function getcontext(){
			  				  
			   var saveData = $.ajax({
			        url: "http://httpbin.org/post",
			        type: "POST",
			        data: { emailcontent:g, method: "example" },
			        dataType: "json"
			    });
			}
			function setcontent(d){
				var kk=getcontent();
				CKEDITOR.instances.editor1.setData(kk+d+'<br>');
			
			}
			function getcontent() {
			  	  return CKEDITOR.instances.editor1.getData();
			}
			function removeemailcontent() {
				
			}
			function howManydays(D){			
				var res = String(D).split("、");
				return res.length;
			}
			function setemailcontent(){				
				var con="Hi "+
				parseMailData[index].studentName+",<br><br>"+
				"很開心這次和大家一起進行了"+howManydays(parseMailData[index].courseDate)+"天的課程，希望透過上課的講解與實作練習能對"+parseMailData[index].courseName+"有更深的瞭解與應用的機會。<br><br>"+
				"附件為本次課程證書，請參考。<br><br>"+
				"課程照片將放在："+'<a href="https://www.facebook.com/groups/ezScrum/">https://www.facebook.com/groups/ezScrum/</a>'+"<br><br>"+
				
				"我們也會持續舉辦C.C. Agile每月聚會或不定期舉辦泰迪軟體學員同樂會，歡迎和我們保持聯絡，課後任何有疑問都可以來聊聊。<br><br>"+
				"更多消息可參考："+"<br>"+
				"搞笑談軟工FB社團"+ '<a href="https://www.facebook.com/groups/teddy.tw/">https://www.facebook.com/groups/teddy.tw/</a>'+"<br>"+
				"泰迪軟體敏捷開發課程社團"+ '<a href="https://www.facebook.com/groups/ezScrum/">https://www.facebook.com/groups/ezScrum/</a>'+"<br>";
				CK=CKEDITOR.instances['editor1'];
				if (CK) {
					   CKEDITOR.remove(CKEDITOR.instances['editor1']); //Does the same as line below
					   CKEDITOR.add(CK);
				 }
				CKEDITOR.instances.editor1.setData(con);
			}


		
			var Send =function(){	
				if(!parseMailData[index].hasSent){
					var mailData = new Object();
					mailData.id_ = parseMailData[index].studentId;
					mailData.courseName_ = parseMailData[index].courseName;
					mailData.addresses_ = parseMailData[index].address;
					mailData.text_ = getcontent();

					if (confirm("是否確認寄送!?") == true){
						parseMailData[index].hasSent = true;
						$.ajax({
							url: 'SendGmailServlet',
							type: 'post',
							data: JSON.stringify(mailData),
							headers: {
								isSendCertification: 1
							},
							dataType: 'json',
							success: function (data) {		   
								var parseData = JSON.parse(JSON.stringify(data));
								// $('#sendMailSuccess').show();
								// $('#sendMailAlert').html('<div class="alert alert alert-success alert-dismissible"><a class="close" data-dismiss="alert">×</a><span>'+parseData.studentName+" "+parseData.result+'</span></div>')
                                alert('寄送成功，' + parseData.studentName + " " + parseData.result);								
							}
						});				
					}
				}
				else{
					alert('此學員的證書已寄送過了!')
				}
			}
	  
		var setValue = function(){ 		
			$scope.isCertificationLoading = true;
			
			if(parseMailData[index].hasSent){
				alert('此學員的證書已寄送過了!');
			}
			
			$scope.courseName = parseMailData[index].courseName;
			$scope.studentName = parseMailData[index].studentName;
			$scope.date = parseMailData[index].courseDate;
            $scope.studentId = parseMailData[index].certificationId;
    		$scope.couresDuration = parseMailData[index].couresDuration;
    		$scope.address = parseMailData[index].address;

            makeCertification();
		}
		
		var numberChar = ["零","一","二","三","四","五","六","七","八","九"];
        var unitChar = ["","十"];
        
        function numberToChinese(number){
            var result = '';

            if (number === 0) {
                return numberChar[0];
            }

            while (number > 0) {
                var section = number % 100;
                result = sectionToChinese(section);
                number = Math.floor(number / 100);
            }
            if ((result.length >= 2) && (result.indexOf("一") == 0)) {
                result = result.replace("一", "");
            }

            return result;
        }

        function sectionToChinese(section) {
            var tempChar = '',
                result = '';
            var unitCharIndex = 0;
            while (section > 0) {
                var numberCharIndex = section % 10;
                if (numberCharIndex !== 0) {
                    tempChar = numberChar[numberCharIndex];
                    tempChar += unitChar[unitCharIndex]
                    result = tempChar + result;
                }

                unitCharIndex++;
                section = Math.floor(section / 10);
            }

            return result;
        }

        var makeCertification = function() {
            console.log("製作證書PNG中");
            var data = new Object();
            data.id_ = parseMailData[index].certificationId;
            data.owner_ = parseMailData[index].studentName;
            data.date_ = parseMailData[index].certificateDate;
            data.courceDate_ = " 於 " + parseMailData[index].courseDate;
            data.courceName_ = parseMailData[index].courseName;
            data.courceDuration_ = "全期共" + parseMailData[index].couresDuration + "小時研習期滿，特此證明";
            data.courceId_ = parseMailData[index].courseId;

            $.post("/SLM2016/CertificationServlet", JSON.stringify(data))
                .done(function(imgData) {
                    document.getElementById("certificationImg").setAttribute('src', 'data:image/png;base64,' + imgData);

                    var saveData = new Object();
                    saveData.saveDB = "save";
                    saveData.studentId = parseMailData[index].studentId;
                    $.post("/SLM2016/CertificationServlet", JSON.stringify(saveData))
                        .done(function(pdfData) {
                            console.log("save");
                            $scope.isCertificationLoading = false;
                            $scope.$apply();
                        });
                });
        }

        var ClickNextButton = function() {

            if (++index <= parseMailData.length - 1) {
                previousButton.disabled = "";
                setValue();
            }
            if (index == parseMailData.length - 1) {
                nextButton.disabled = "disabled";
            }

            setemailcontent();
        }

        var ClickPreviousButton = function() {

            if (--index >= 0) {
                nextButton.disabled = "";
                setValue();
            }
            if (index == 0) {
                previousButton.disabled = "disabled";
            }

            setemailcontent();
        }

        var init = function() {
            getCourseInfo();
            $scope.isCertificationLoading = true;
            parseMailData = JSON.parse(StudentInfoService.getStudentSendMailData());

            CourseService.getCourseList().then(function(courseData) {
                var courseIndex;
                for (var i = 0; i < courseData.length; i++) {
                    if (parseMailData[0].courseId == courseData[i].courseId_) {
                        courseIndex = i;
                        break;
                    }
                }

                var duration = Number(courseData[courseIndex].duration_);
                var couresDuration = numberToChinese(duration);
                var date = new Date(courseData[courseIndex].dates_[0]);
                var dateInterval = courseData[courseIndex].dates_.length;

                for (var i = 0; i < parseMailData.length; i++) {
                    parseMailData[i].hasSent = false;
                    parseMailData[i].courseName = courseData[courseIndex].courseName_;
                    parseMailData[i].couresDuration = couresDuration;
                    parseMailData[i].courseDate = date.getFullYear() + " 年 " + (date.getMonth() + 1) + " 月 ";
                    for (var j = 0; j < dateInterval; j++) {
                        var date = new Date(courseData[courseIndex].dates_[j]);
                        if (j != dateInterval - 1) {
                            parseMailData[i].courseDate += date.getDate() + "、";
                        } else {
                            parseMailData[i].courseDate += date.getDate() + " 日 ";
                            parseMailData[i].certificateDate = date.getFullYear() + " 年 " + (date.getMonth() + 1) + " 月 " + date.getDate() + " 日 ";
                        }
                    }
                }
                setValue();
                setemailcontent();
            }, function(error) {
                console.log('Get DB Data Has Error');
            })

            if (parseMailData.length - 1 > 0) {
                nextButton.disabled = "";
            }
        }

        var getCourseInfo = function() {
            $scope.isStudentLoading = true;

            CourseService.getCourseById($scope.courseId).then(function(result) {
                $scope.currentCourse = result[0];
            }, function(error) {
            })
        }

        var goCourseManage = function() {
            $state.go(STATES.COURSEINFO_MANAGE)
        }

        var goStudentManage = function() {
            $state.go(STATES.COURSEINFO_STUDENT, {
                courseId: $scope.courseId
            })
        }

        /*==========================
            Events
        ==========================*/

        /*==========================
            Members
        ==========================*/

        $scope.isCertificationLoading = false;
        $scope.courseId = $stateParams.courseId;
        $scope.currentCourse;

        /*==========================
             Methods
        ==========================*/

        $scope.goCourseManage = goCourseManage;
        $scope.goStudentManage = goStudentManage;

        /*==========================
             init
        ==========================*/

        var parseMailData;
        var index = 0;

        var nextButton = document.getElementById("next");
        var previousButton = document.getElementById("previous");

        var sendButton = document.getElementById("send");

        CKEDITOR.replace('editor1');


        $scope.Send = Send;
        $scope.ClickNextButton = ClickNextButton;
        $scope.ClickPreviousButton = ClickPreviousButton;


        init();

    }
]);