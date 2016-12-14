app.factory("StudentInfoService", [ '$q', '$rootScope', '$http', 'Upload',
	function($q, $rootScope, $http, Upload) {
		
		var factory = this;
		var studentSendmailDataArray;

		// 讀取Excel檔並轉成Json格式
        var readFile = function(file, readCells, toJSON) {
            var deferred = $q.defer();

            XLSXReader(file, readCells, toJSON, function(data) {
                $rootScope.$apply(function() {
                    deferred.resolve(data);
                });
            });
            return deferred.promise;
        }
        
        // 上傳學員資料並存入DB
		var uploadStudentFile = function (file, courseId) {
		    var defer = $q.defer();
				
		    Upload.upload({
		        url: '/SLM2016/StudentAction',
		        withCredential: true,
		        data: {
		            op: 1,
                    courseId: courseId
		        },
		        file: file
		    }).success(function(file) {
		        defer.resolve(file);
			}).error(function(error) {
				defer.reject(error);
				console.error("status : " + status);
			});

		    return defer.promise;
		};

		// 取得學員列表
		var getStudentList = function() {
            var defer = $q.defer();

            $http({
                url: "/SLM2016/StudentAction",
                method: "GET",
                params: {
                    op: 2
                }
            }).success(function(data) {
                defer.resolve(data);
            }).error(function(data, status, headers, config) {
                console.error("status : " + status);
            });

            return defer.promise;
        }
		
		var getCertificationInfo = function(studentId) {
            var defer = $q.defer();

            $http({
                url: "/SLM2016/StudentAction",
                method: "GET",
                params: {
                    op: 7,
                    studentId: studentId
                }
            }).success(function(certificationData) {
                defer.resolve(certificationData);
            }).error(function(certificationData, status, headers, config) {
                console.error("status : " + status);
            });

            return defer.promise;
        }
		
		var putStudentSendMailData = function(data){
			studentSendmailDataArray = data;
		}
		
		var getStudentSendMailData = function(){
			return JSON.stringify(studentSendmailDataArray);
		} 

        var getStudentListByCourseId = function(courseId) {
            var defer = $q.defer();

            $http({
                url: "/SLM2016/StudentAction",
                method: "GET",
                params: {
                    op: 5,
                    courseId: courseId
                }
            }).success(function(data) {
                defer.resolve(data);
            }).error(function(data, status, headers, config) {
                console.error("status : " + status);
            });

            return defer.promise;
        }

        var saveStudentFile = function(file, courseId) {
            var defer = $q.defer();
                
            Upload.upload({
                url: '/SLM2016/StudentAction',
                withCredential: true,
                data: {
                    op: 4,
                    courseId: courseId
                },
                file: file
            }).success(function(file) {
                defer.resolve(file);
            }).error(function(error) {
                defer.reject(error);
                console.error("status : " + status);
            });

            return defer.promise;
        }

        var updateStudentReceiptStatus = function(receiptNumber,payStatus,receiptStatus,studentId)
        {

            var defer = $q.defer();

            $http({
                url: "/SLM2016/StudentAction",
                method: "POST",
                params: {
                    op: 6,
                    studentId: studentId,
                    receiptEIN: receiptNumber,
                    receiptStatus: receiptStatus,
                    paymentStatus: payStatus
                }
            }).success(function(data) {
                defer.resolve(data);
            }).error(function(data, status, headers, config) {
                console.error("status : " + status);
            });

            return defer.promise;
        }
        
        var updateStudentReceiptCompanyInfo = function(company_EIN,company_EIN_Name,studentId)
        {

            var defer = $q.defer();

            $http({
                url: "/SLM2016/StudentAction",
                method: "POST",
                params: {
                    op: 8,
                    studentId: studentId,
                    receipt_company_EIN: company_EIN,
                    receipt_company_name: company_EIN_Name
                }
            }).success(function(data) {
                defer.resolve(data);
            }).error(function(data, status, headers, config) {
                console.error("status : " + status);
            });

            return defer.promise;
        }

        var deleteSelectStudent = function(studentIds)
        {
            var defer = $q.defer();

            $http({
                url: "/SLM2016/StudentAction",
                method: "POST",
                params: {
                    op: 9,
                    studentIds: studentIds
                }
            }).success(function(data) {
                defer.resolve(data);
            }).error(function(data, status, headers, config) {
                console.error("status : " + status);
            });

            return defer.promise;
        }

        var generateCertificationId = function(courseId)
        {
            var defer = $q.defer();
            var createCertificationIdConfirm = confirm("是否要產生證書編號?");
            if(createCertificationIdConfirm){
	            $http({
	                url: "/SLM2016/StudentAction",
	                method: "POST",
	                params: {
	                    op: 11,
	                    courseId: courseId
	                }
	            }).success(function(data) {
	            	defer.resolve(data);
	            	if(data.status == "true"){
	            		location.reload(true);
	            		alert("產生成功");}
	            	else if(data.status == "incorrect")
	                    alert("已經有證書編號");
	            	else if(data.status == "noDate")
	            		alert("沒有課程日期，產生失敗");
	            	else 
	            		alert("課程內無學員，產生失敗");
	            }).error(function(data, status, headers, config) {
	                console.error("status : " + status);
	                alert("產生失敗");
	            });
	            return defer.promise;
            }
            
        }
        
        var getStudentNumByCourseId = function(courseId) {
            var defer = $q.defer();

            $http({
                url: "/SLM2016/StudentAction",
                method: "GET",
                params: {
                    op: 10,
                    courseId: courseId
                }
            }).success(function(data) {
                defer.resolve(data);
            }).error(function(data, status, headers, config) {
                console.error("status : " + status);
            });

            return defer.promise;
        }

		/*==========================
            Members
        ==========================*/

        /*==========================
            Methods
        ==========================*/

        factory.readFile = readFile;
        factory.uploadStudentFile = uploadStudentFile;
        factory.getStudentList = getStudentList;
        factory.putStudentSendMailData = putStudentSendMailData;
        factory.getStudentSendMailData = getStudentSendMailData;
        factory.getStudentListByCourseId = getStudentListByCourseId;
        factory.saveStudentFile = saveStudentFile;
        factory.updateStudentReceiptStatus = updateStudentReceiptStatus;
        factory.updateStudentReceiptCompanyInfo = updateStudentReceiptCompanyInfo;
        factory.getCertificationInfo = getCertificationInfo;       
        factory.generateCertificationId = generateCertificationId;
        factory.getStudentNumByCourseId = getStudentNumByCourseId;
        factory.deleteSelectStudent = deleteSelectStudent;
        /*==========================
            init
        ==========================*/

        return factory;
    }
]);