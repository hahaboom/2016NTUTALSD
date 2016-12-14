app.directive('invoiceModal', ['$rootScope', 'StudentInfoService', 
    function($rootScope,StudentInfoService) {
        return {
            restrict: "E",
            scope: true,
            templateUrl: "templates/directives/invoice-modal.html",
            link: function(scope, element, attrs) {},
            controller: ['$scope', '$state', '$timeout', 'Mousetrap', function($scope, $state, $timeout, Mousetrap) {

                var setTodayString = function() {
                    var today = new Date();
                    var dd = today.getDate();
                    var mm = today.getMonth() + 1;
                    var yyyy = today.getFullYear() - 1911;
                    $scope.today = "中華民國 " + yyyy + " 年 " + mm + " 月 " + dd + " 日";
                    $scope.todayDD = dd;
                    $scope.todayMM = mm;
                    $scope.todayYY = yyyy;
                    var dateWord = ['O','一','二','三','四','五','六','七','八','九','十','十一','十二'];
                    if(mm == 1 || mm == 2) {
                        $scope.invoiceMonth = dateWord[1] + "、" + dateWord[2];
                    }
                    else if(mm == 3 || mm == 4) {
                        $scope.invoiceMonth = dateWord[3] + "、" + dateWord[4];
                    }
                    else if(mm == 5 || mm == 6) {
                        $scope.invoiceMonth = dateWord[5] + "、" + dateWord[6];
                    }
                    else if(mm == 7 || mm == 8) {
                        $scope.invoiceMonth = dateWord[7] + "、" + dateWord[8];
                    }
                    else if(mm == 9 || mm == 10) {
                        $scope.invoiceMonth = dateWord[9] + "、" + dateWord[10];
                    }
                    else if(mm == 11 || mm == 12) {
                        $scope.invoiceMonth = dateWord[11] + "、" + dateWord[12];
                    }
                    var yyArray = yyyy.toString().split("");
                    $scope.invoiceYear = dateWord[yyArray[0]]  + " " + dateWord[yyArray[1]] + " " + dateWord[yyArray[2]];
                }

                var onDateTimeChange = function() {
                    var dd = $scope.data.time.getDate();
                    var mm = $scope.data.time.getMonth() + 1;
                    var yyyy = $scope.data.time.getFullYear() - 1911;
                    $scope.todayDD = dd;
                    $scope.todayMM = mm;
                    $scope.todayYY = yyyy;
                    var dateWord = ['O','一','二','三','四','五','六','七','八','九','十','十一','十二'];
                    if(mm == 1 || mm == 2) {
                        $scope.invoiceMonth = dateWord[1] + "、" + dateWord[2];
                    }
                    else if(mm == 3 || mm == 4) {
                        $scope.invoiceMonth = dateWord[3] + "、" + dateWord[4];
                    }
                    else if(mm == 5 || mm == 6) {
                        $scope.invoiceMonth = dateWord[5] + "、" + dateWord[6];
                    }
                    else if(mm == 7 || mm == 8) {
                        $scope.invoiceMonth = dateWord[7] + "、" + dateWord[8];
                    }
                    else if(mm == 9 || mm == 10) {
                        $scope.invoiceMonth = dateWord[9] + "、" + dateWord[10];
                    }
                    else if(mm == 11 || mm == 12) {
                        $scope.invoiceMonth = dateWord[11] + "、" + dateWord[12];
                    }
                    var yyArray = yyyy.toString().split("");
                    $scope.invoiceYear = dateWord[yyArray[0]]  + " " + dateWord[yyArray[1]] + " " + dateWord[yyArray[2]];
                }

                var openDatePicker = function() {
                    $scope.isDatePickerOpen = true;
                }

                var nextStudent = function() {
                    if($scope.currentIndex < $scope.studentList.length - 1) {
                        $scope.currentIndex++;
                        $scope.currentStudent = $scope.studentList[$scope.currentIndex];
                        getCompanyNameIdWidget();
                        getStudentData();
                    }
                    else {
                        return;
                    }
                }

                var notHasNext = function() {
                    if ($scope.currentIndex == $scope.studentList.length - 1) {
                        return true;
                    }
                    else {
                        return false;
                    }
                }

                var prevStudent = function() {
                    if($scope.currentIndex >= 1) {
                        $scope.currentIndex--;
                        $scope.currentStudent = $scope.studentList[$scope.currentIndex];
                        getCompanyNameIdWidget();
                        getStudentData();
                    }
                    else {
                        return;
                    }
                }

                var notHasPrev = function() {
                    if ($scope.currentIndex == 0) {
                        return true;
                    }
                    else {
                        return false;
                    }
                }

                var onTaxRateChange = function() 
                {
                    if(!/^\d+[.]?\d*$/.test($scope.data.taxRate)) {
                        $timeout(function() {
                            var errorNumString = $scope.data.taxRate.toString();
                            var rightNumString = errorNumString.substring(0, errorNumString.length - 1);
                            $scope.data.taxRate = parseFloat(rightNumString);
                        }, 100);
                    }
                    else
                        getStudentData();
                }

                var getAllPriceToInt = function(num)
                {
                    var numArray = num.toString().split("");
                    var priceNum = 0;
                    for(var i = 0 ; i <= numArray.length-1 ; i++)
                    {
                        if(numArray[i] != ",")
                        {
                            priceNum *= 10;
                            priceNum += parseFloat(numArray[i]);
                        }    
                    }
                    return priceNum;
                }

                var getAllPriceToString = function(num)
                {
                    var numArray = num.toString().split("");
                    var priceNumString = "";
                    var index = numArray.length % 3;
                    if(index != 0 && numArray.length > 3)
                    {
                        for(var i = 0 ; i <= numArray.length-1 ; i++)
                        {
                            if(index == 0)
                            {
                                priceNumString += ",";
                                index = 3;
                            }
                            priceNumString += numArray[i];
                            index--;
                        }
                    }
                    else
                        for(var i = 0 ; i <= numArray.length-1 ; i++)
                            priceNumString += numArray[i];

                    return priceNumString;
                }

                var getStudentPaid = function()
                {
                    console.log($scope.currentStudent.payment_status);
                    if($scope.currentStudent.payment_status == "已繳費")
                    {
                        return true;
                    }
                    return false;
                }


                var getStudentReceiptStatus = function()
                {
                    if($scope.currentStudent.receipt_status == "已開立"){
                        $scope.data.radioStatus = "已開立";
                    }
                    else
                        $scope.data.radioStatus = "未開立";
                }

                var getStudentData = function()
                {
                    $scope.isInvoiceNumberEmpty = false;
                    if($scope.currentStudent.receipt_type.indexOf("三聯式") > -1 || $scope.currentStudent.receipt_company_name != "" || $scope.currentStudent.receipt_company_EIN != ""){
                        var number = 0;
                        $scope.invoiceType = "THREE"
                        $scope.isThreeInvoice = true;
                        $scope.data.receipt_type = "公司報帳用（三聯式）";
                        $scope.data.company = $scope.currentStudent.receipt_company_name;
                        $scope.isStudentPaid = getStudentPaid();
                        getStudentReceiptStatus();
                        $scope.data.companyid = $scope.currentStudent.receipt_company_EIN;
                        $scope.data.companyidArray = $scope.data.companyid.toString().split("");
                        $scope.data.itemDollar = $scope.currentStudent.ticket_price;
                        $scope.data.itemTotalDollar = $scope.currentStudent.ticket_price;
                        $scope.data.salesDollar = getAllPriceToInt($scope.currentStudent.ticket_price);
                        $scope.data.businessTax = Math.round($scope.data.salesDollar * $scope.data.taxRate / 100);
                        $scope.data.totalDollar = $scope.data.salesDollar;
                        $scope.data.invoiceNumber = $scope.currentStudent.receipt_EIN;
                        $scope.data.salesDollar = getAllPriceToString($scope.data.salesDollar - $scope.data.businessTax);
                        $scope.data.businessTax = getAllPriceToString($scope.data.businessTax);
                        $scope.data.totalDollar = getAllPriceToString($scope.data.totalDollar);
                        getNumWordArray($scope.data.totalDollar);
                    }
                    else 
                    {
                        $scope.invoiceType = "TWO";
                        $scope.isThreeInvoice = false;
                        $scope.data.receipt_type = "個人（二聯式）";
                        $scope.data.company = $scope.currentStudent.name;
                        $scope.isStudentPaid = getStudentPaid();
                        getStudentReceiptStatus();
                        $scope.data.itemDollar = $scope.currentStudent.ticket_price;
                        $scope.data.invoiceNumber = $scope.currentStudent.receipt_EIN;
                        $scope.data.itemTotalDollar = $scope.currentStudent.ticket_price;
                        getNumWordArray($scope.data.itemTotalDollar);
                    }                                    
                }

                var saveStudentReceiptStatus = function()
                {
                    if($scope.data.invoiceNumber == "") {
                        $scope.isInvoiceNumberEmpty = true;
                        return;
                    }
                    else {
                        $scope.isInvoiceNumberEmpty = false;
                    }

                    StudentInfoService.updateStudentReceiptStatus($scope.data.invoiceNumber,$scope.currentStudent.payment_status,"已開立",$scope.currentStudent.id).then(function(result) 
                    {
                        var index = 0;
                        for (var i = 0; i < $scope.studentList.length; i++) {
                            if($scope.studentList[i].id == $scope.currentStudent.id) {
                                $scope.studentList[i].receipt_EIN = $scope.data.invoiceNumber;
                                $scope.studentList[i].payment_status = $scope.currentStudent.payment_status;
                                $scope.studentList[i].receipt_status = "已開立";
                                index = i;
                                break;
                            }
                        }
                        $scope.currentStudent = $scope.studentList[i];
                        alert("發票編號儲存成功");
                        $scope.data.radioStatus = "已開立";
                        $scope.$apply();
                        console.log($scope.currentStudent);
                        console.log(result);
                    }, function(error) {
                        console.log(error);
                        alert("發票編號儲存失敗");
                    })
                }

                var onInvoiceNumberChange = function()
                {
                    if(!isInvoiceNumber($scope.data.invoiceNumber)) {
                        $timeout(function() {
                            var errorNumString = $scope.data.invoiceNumber.toString();
                            var rightNumString = errorNumString.substring(0, errorNumString.length - 1);
                            $scope.data.invoiceNumber = parseInt(rightNumString);
                        }, 100);
                    }
                }

                var getNumWordArray = function(num) {
                    clearTotalWord();
                    var cWord = ['零','壹','貳','參','肆','伍','陸','柒','捌','玖'];
                    var numArray = num.toString().split("");

                    var wordCt = $scope.totalWord.length - 1;
                    for (var i = numArray.length - 1; i >= 0; i--) {
                        if(numArray[i] != ",")
                        {
                            $scope.totalWord[wordCt].numberWord = cWord[numArray[i]];
                            wordCt--;
                        }
                    }
                }

                var clearTotalWord = function() {
                    for (var i = 0; i < $scope.totalWord.length; i++) {
                        $scope.totalWord[i].numberWord = "";
                    }
                }



                var onCompanyIdChange = function() {
                    $scope.data.companyidArray = $scope.data.companyid.split("");                   
                    if($scope.data.companyid.length == 0) {
                        $scope.isCompanyidError = true;
                        $scope.isCompanyidSuccess = false;
                        $scope.isCompanyError = true;
                        $scope.isCompanySuccess = false;
                        $scope.isCompanyStatus = false;
                    }
                    else if($scope.data.companyid.length < 8) {
                        $scope.isCompanyidError = true;
                        $scope.isCompanyidSuccess = false;
                        $scope.isCompanyError = true;
                        $scope.isCompanySuccess = false;
                        $scope.isCompanyStatus = false;
                        $scope.data.company = "";
                    }
                    else if($scope.data.companyid.length == 8) {
                        if(!isNumber($scope.data.companyid)) {
                            $scope.isCompanyidError = true;
                            $scope.isCompanyidSuccess = false;
                        }
                        else {
                            $scope.currentStudent.receipt_company_name = $scope.data.company;
                            $scope.currentStudent.receipt_company_EIN = $scope.data.companyid;
                            getCompanyNameIdWidget();
                        }
                    }
                    else {
                        $scope.data.companyid = $scope.data.companyid.substring(0, 8);
                    }
                }


                var companyNameService = {
                    API_URL: 'http://company.g0v.ronny.tw/api/',
                    getSingleCompanyName: function(companyData) {
                        if (typeof companyData['公司名稱'] === 'string') {
                            return companyData['公司名稱'];
                        }
                        return 'Can\'t found any company.';
                    },
                    getCompanyFromId: function(companyId, callback) {
                        $.getJSON(
                            this.API_URL + 'show/' + companyId,
                            function(res) {
                                if (!res || !res.data) {
                                    callback();
                                    return;
                                }

                                var companyInfo = {
                                    name: this.getSingleCompanyName(res.data),
                                    fdi: !!res.data['在中華民國境內營運資金'],
                                    id: companyId
                                };

                            callback(companyInfo);
                            }.bind(this)
                        );
                    }
                }
                
                var getCompanyNameIdWidget = function()
                {
                    var companyId = $scope.currentStudent.receipt_company_EIN;
                    var companyName = $scope.currentStudent.receipt_company_name;
                    console.log(companyId);
                    console.log(companyName);
                    $scope.isCompanyLoading = true;
                    $scope.isCompanyidError = false;
                    $scope.isCompanyidSuccess = false;
                    $scope.isCompanyError = false;
                    $scope.isCompanySuccess = false;
                    companyNameService.getCompanyFromId(companyId, function(info) {
                        $scope.isCompanyLoading = false;
                        console.log($scope.isCompanyLoading);            
                        if (typeof(info) === "undefined"){
                            $scope.isCompanyidError = true;
                            $scope.isCompanyidSuccess = false;
                            $scope.isCompanyError = true;
                            $scope.isCompanySuccess = false;
                            $scope.isCompanyStatus = false;
                        }
                        else if(info.id === "")
                        {
                            $scope.isCompanyidError = true;
                            $scope.isCompanyidSuccess = false;
                            $scope.isCompanyError = true;
                            $scope.isCompanySuccess = false;
                            $scope.isCompanyStatus = false;
                        }
                        else if (companyName !== info.name) {

                            $scope.isCompanyidError = false;
                            $scope.isCompanyidSuccess = true;
                            $scope.isCompanyError = true;
                            $scope.isCompanySuccess = false;
                            $scope.isCompanyStatus = true;
                            $scope.data.correctCompany = info.name; 
                        }
                        else
                        {
                            $scope.isCompanyidError = false;
                            $scope.isCompanyidSuccess = true;
                            $scope.isCompanyError = false;
                            $scope.isCompanySuccess = true;
                            $scope.isCompanyStatus = false;
                        }
                        $scope.$apply();
                    });
                }



                var changeCompanyData = function()
                {   
                    StudentInfoService.updateStudentReceiptCompanyInfo($scope.data.companyid,$scope.data.correctCompany,$scope.currentStudent.id).then(function(result) 
                    {
                        $scope.isCompanyidError = false;
                        $scope.isCompanyidSuccess = true;
                        $scope.isCompanyError = false;
                        $scope.isCompanySuccess = true;
                        $scope.currentStudent.receipt_company_name = $scope.data.correctCompany;
                        $scope.data.company = $scope.data.correctCompany;
                        alert("統一編號與公司名稱儲存成功");
                    }, function(error) {
                        console.log(error);
                        alert("統一編號與公司名稱儲存失敗");
                    })
                }

                var init = function() {
                    setTodayString();
                }

                /*==========================
                    Events
                ==========================*/

                $scope.$on("OPEN_INVOICE_MODAL", function(event, data) {
                    console.log(data.course)
                    $scope.studentList = data.list;
                    $scope.course = data.course;
                    $scope.currentStudent = $scope.studentList[0];
                    $scope.isCompanyLoading = true;
                    $scope.isCompanyidError = false;
                    $scope.isCompanyidSuccess = false;
                    $scope.isCompanySuccess = false;
                    $scope.isCompanyError = false;
                    getCompanyNameIdWidget();
                    getStudentData();
                    Mousetrap.reset();
                    Mousetrap.bind('left', function() { 
                        $scope.$apply(function() {
                            console.log("left")
                            prevStudent(); 
                        })
                    });
                    Mousetrap.bind('right', function() { 
                        $scope.$apply(function() {
                            console.log("right")
                            nextStudent();
                        })
                    });
                })

                /*==========================
                    Members
                ==========================*/
                $scope.studentList = [];
                $scope.currentIndex = 0;
                $scope.currentStudent;
                $scope.course;
                $scope.invoiceType = "THREE";

                $scope.today;
                $scope.todayDD = "";
                $scope.todayMM = "";
                $scope.todayYY = ""
                $scope.invoiceMonth = "";
                $scope.invoiceYear = "";
                $scope.isStudentPaid = false;
                $scope.isResultShow = false;
                $scope.isCompanyidError = false;
                $scope.isCompanyidSuccess = false;
                $scope.isCompanySuccess = false;
                $scope.isCompanyError = false;
                $scope.isCompanyLoading = false;
                $scope.isThreeInvoice = false;
                $scope.isCompanyStatus = false;
                $scope.data = {
                    company: "",
                    companyid: "",
                    companyidArray: [],
                    salesDollar: undefined,
                    taxRate: 5,
                    businessTax: undefined,
                    totalDollar: undefined,
                    itemName: "教育訓練",
                    itemNumber: 1,
                    itemDollar: undefined,
                    itemTotalDollar: undefined,
                    receipt_type: undefined,
                    radioStatus: undefined,
                    invoiceNumber: "",
                    correctCompany: "",
                    time: new Date()
                }
                $scope.totalWord = [{
                    numberWord: "",
                    unit: "億"
                }, {
                    numberWord: "",
                    unit: "仟"
                }, {
                    numberWord: "",
                    unit: "佰"
                }, {
                    numberWord: "",
                    unit: "拾"
                }, {
                    numberWord: "",
                    unit: "萬"
                }, {
                    numberWord: "",
                    unit: "仟"
                }, {
                    numberWord: "",
                    unit: "佰"
                }, {
                    numberWord: "",
                    unit: "拾"
                }, {
                    numberWord: "",
                    unit: "元"
                }]

                $scope.format = 'yyyy 年 MM 月 dd 日';
                $scope.isDatePickerOpen = false;
                $scope.dateOptions = {
                    locale: 'ru'
                };

                $scope.isInvoiceNumberEmpty = false;


                /*==========================
                    Methods
                ==========================*/

                $scope.openDatePicker = openDatePicker;
                $scope.onDateTimeChange = onDateTimeChange;
                $scope.nextStudent = nextStudent;
                $scope.notHasNext = notHasNext;
                $scope.prevStudent = prevStudent;
                $scope.notHasPrev = notHasPrev;
                $scope.onTaxRateChange = onTaxRateChange;
                $scope.saveStudentReceiptStatus = saveStudentReceiptStatus;
                $scope.onInvoiceNumberChange = onInvoiceNumberChange;
                $scope.onCompanyIdChange = onCompanyIdChange;
                $scope.changeCompanyData = changeCompanyData;
                /*==========================
                    init
                ==========================*/

                init();
                /*==========================
                    init
                ==========================*/

                init();
            }]
        }
    }
]);
