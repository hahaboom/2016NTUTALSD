app.controller("InvoiceController", ['$scope', '$state', '$timeout', '$rootScope',
    function($scope, $state, $timeout, $rootScope) {

        var changeInvoiceType = function(type) {
            $scope.isCompanyIdNotFinished = false;
            $scope.isCompanyIdError = false;
            $scope.isCompanyIdSuccess = false;

            $scope.isCompanyEmpty = false;
            $scope.isCompanyIdEmpty = false;
            $scope.isSalesDollarEmpty = false;
            $scope.isTotalDollarEmpty = false;
            $scope.isItemNameEmpty = false;
            $scope.isItemNumberEmpty = false;
            $scope.isItemDollarEmpty = false;
            $scope.invoiceType = type;
            if (type == "THREE") {
                $scope.isResultShow = $scope.isDoubleResultShow;
                $scope.data.salesDollar = Math.round($scope.data.totalDollar / (($scope.data.taxRate + 100) / 100));
                $scope.data.businessTax = $scope.data.totalDollar - $scope.data.salesDollar;
                $scope.data.itemDollar = $scope.data.salesDollar;
                $scope.data.itemTotalDollar = $scope.data.itemNumber * $scope.data.itemDollar;
                getNumWordArray($scope.data.totalDollar);
            } else {
                $scope.data.company = "";
                $scope.isDoubleResultShow = $scope.isResultShow;
                $scope.data.itemTotalDollar = $scope.data.totalDollar;
                $scope.data.itemDollar = $scope.data.totalDollar;
            }
            $scope.data.totalDollar;
        }

        var setTodayString = function() {
            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth() + 1;
            var yyyy = today.getFullYear() - 1911;
            $scope.today = "中華民國 " + yyyy + " 年 " + mm + " 月 " + dd + " 日";
            $scope.todayDD = dd;
            $scope.todayMM = mm;
            $scope.todayYY = yyyy;
            var dateWord = ['O', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'];
            if (mm == 1 || mm == 2) {
                $scope.invoiceMonth = dateWord[1] + "、" + dateWord[2];
            } else if (mm == 3 || mm == 4) {
                $scope.invoiceMonth = dateWord[3] + "、" + dateWord[4];
            } else if (mm == 5 || mm == 6) {
                $scope.invoiceMonth = dateWord[5] + "、" + dateWord[6];
            } else if (mm == 7 || mm == 8) {
                $scope.invoiceMonth = dateWord[7] + "、" + dateWord[8];
            } else if (mm == 9 || mm == 10) {
                $scope.invoiceMonth = dateWord[9] + "、" + dateWord[10];
            } else if (mm == 11 || mm == 12) {
                $scope.invoiceMonth = dateWord[11] + "、" + dateWord[12];
            }
            var yyArray = yyyy.toString().split("");
            $scope.invoiceYear = dateWord[yyArray[0]] + " " + dateWord[yyArray[1]] + " " + dateWord[yyArray[2]];
        }

        var showInvoiceResult = function() {

            if ($scope.data.company == "") {
                $scope.isCompanyEmpty = true;
            } else {
                $scope.isCompanyEmpty = false;
            }

            if ($scope.data.companyid == "") {
                $scope.isCompanyIdEmpty = true;
            } else {
                $scope.isCompanyIdEmpty = false;
            }

            if (!$scope.data.salesDollar) {
                $scope.isSalesDollarEmpty = true;
            } else {
                $scope.isSalesDollarEmpty = false;
            }

            if (!$scope.data.totalDollar) {
                $scope.isTotalDollarEmpty = true;
            } else {
                $scope.isTotalDollarEmpty = false;
            }

            if ($scope.data.itemName == "") {
                $scope.isItemNameEmpty = true;
            } else {
                $scope.isItemNameEmpty = false;
            }

            if (!$scope.data.itemNumber) {
                $scope.isItemNumberEmpty = true;
            } else {
                $scope.isItemNumberEmpty = false;
            }

            if (!$scope.data.itemDollar) {
                $scope.isItemDollarEmpty = true;
            } else {
                $scope.isItemDollarEmpty = false;
            }

            if ($scope.isCompanyEmpty || $scope.isCompanyIdEmpty || $scope.isCompanyIdError ||
                $scope.isCompanyIdNotFinished || $scope.isSalesDollarEmpty || $scope.isTotalDollarEmpty ||
                $scope.isItemNameEmpty || $scope.isItemNumberEmpty ||
                $scope.isItemDollarEmpty) {
                return;
            } else {
                $scope.isResultShow = true;
            }
        }

        var showDoubleInvoiceResult = function() {
            if ($scope.data.itemName == "") {
                $scope.isItemNameEmpty = true;
            } else {
                $scope.isItemNameEmpty = false;
            }

            if (!$scope.data.itemNumber) {
                $scope.isItemNumberEmpty = true;
            } else {
                $scope.isItemNumberEmpty = false;
            }

            if (!$scope.data.totalDollar) {
                $scope.isTotalDollarEmpty = true;
            } else {
                $scope.isTotalDollarEmpty = false;
            }

            if (!$scope.data.itemDollar) {
                $scope.isItemDollarEmpty = true;
            } else {
                $scope.isItemDollarEmpty = false;
            }

            if ($scope.isCompanyEmpty || $scope.isItemNameEmpty || $scope.isItemNumberEmpty || $scope.isItemDollarEmpty) {
                return;
            } else {
                $scope.isDoubleResultShow = true;
            }
        }



        var clearInvoiceResult = function() {
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
                itemTotalDollar: undefined
            }
            $scope.isResultShow = false;
            $scope.isCompanyIdNotFinished = false;
            $scope.isCompanyIdError = false;
            $scope.isCompanyIdSuccess = false;

            $scope.isCompanyEmpty = false;
            $scope.isCompanyIdEmpty = false;
            $scope.isSalesDollarEmpty = false;
            $scope.isTotalDollarEmpty = false;
            $scope.isItemNameEmpty = false;
            $scope.isItemNumberEmpty = false;
            $scope.isItemDollarEmpty = false;
            $scope.isDoubleResultShow = false;
            clearTotalWord();
        }

        var onCompanyIdChange = function() {
            $scope.data.companyidArray = $scope.data.companyid.split("");
            if ($scope.data.companyid.length == 0) {
                $scope.isCompanyIdSuccess = false;
                $scope.isCompanyIdNotFinished = false;
                $scope.isCompanyIdError = false;
            } else if ($scope.data.companyid.length < 8) {
                $scope.isCompanyIdSuccess = false;
                $scope.isCompanyIdError = false;
                $scope.isCompanyIdNotFinished = true;
            } else if ($scope.data.companyid.length == 8) {
                $scope.isCompanyIdNotFinished = false;
                if (!isNumber($scope.data.companyid)) {
                    $scope.isCompanyIdError = true;
                } else {
                    $scope.isCompanyIdSuccess = true
                }
            } else {
                $scope.data.companyid = $scope.data.companyid.substring(0, 8);
            }
        }

        var onSalesDollarChange = function() {
            if ($scope.data.salesDollar == "") {
                $scope.data.salesDollar = undefined;
                $scope.data.totalDollar = undefined;
                $scope.data.businessTax = 0;
                clearTotalWord();
                return;
            }
            if ($scope.data.salesDollar.length > 9) {
                $scope.data.salesDollar = $scope.data.salesDollar.substring(0, 9);
                return;
            }
            if (!isNumber($scope.data.salesDollar)) {
                $timeout(function() {
                    var errorNumString = $scope.data.salesDollar.toString();
                    var rightNumString = errorNumString.substring(0, errorNumString.length - 1);
                    $scope.data.salesDollar = parseInt(rightNumString);
                }, 100);
            } else {
                $scope.data.itemDollar = Math.round($scope.data.salesDollar / $scope.data.itemNumber);
                $scope.data.businessTax = Math.round($scope.data.salesDollar * $scope.data.taxRate / 100);
                $scope.data.totalDollar = parseInt($scope.data.businessTax) + parseInt($scope.data.salesDollar);
                $scope.data.itemTotalDollar = $scope.data.salesDollar;
                getNumWordArray($scope.data.totalDollar);
            }
        }

        var onTotalDollarChange = function() {
            if ($scope.data.totalDollar == "") {
                $scope.data.salesDollar = undefined;
                $scope.data.totalDollar = undefined;
                $scope.data.businessTax = 0;
                clearTotalWord();
                return;
            }
            if ($scope.data.totalDollar.length > 9) {
                $scope.data.totalDollar = $scope.data.totalDollar.substring(0, 9);
                return;
            }
            if (!isNumber($scope.data.totalDollar)) {
                $timeout(function() {
                    var errorNumString = $scope.data.totalDollar.toString();
                    var rightNumString = errorNumString.substring(0, errorNumString.length - 1);
                    $scope.data.totalDollar = parseInt(rightNumString);
                }, 100);
            } else {
                $scope.data.salesDollar = Math.round($scope.data.totalDollar / (($scope.data.taxRate + 100) / 100));
                $scope.data.businessTax = $scope.data.totalDollar - $scope.data.salesDollar;
                $scope.data.itemDollar = $scope.data.salesDollar;
                $scope.data.itemTotalDollar = $scope.data.itemNumber * $scope.data.itemDollar;
                getNumWordArray($scope.data.totalDollar);
            }
        }

        var onDoubleTotalDollarChange = function() {
            if ($scope.data.totalDollar == "") {
                $scope.data.totalDollar = undefined;
                $scope.data.itemTotalDollar = undefined;
                $scope.data.itemDollar = undefined;
                clearTotalWord();
                return;
            }
            if ($scope.data.totalDollar.length > 9) {
                $scope.data.totalDollar = $scope.data.totalDollar.substring(0, 9);
                return;
            }
            if (!isNumber($scope.data.totalDollar)) {
                $timeout(function() {
                    var errorNumString = $scope.data.totalDollar.toString();
                    var rightNumString = errorNumString.substring(0, errorNumString.length - 1);
                    $scope.data.totalDollar = parseInt(rightNumString);
                }, 100);
            } else {
                $scope.data.itemTotalDollar = $scope.data.totalDollar;
                $scope.data.itemNumber = 1;
                $scope.data.itemDollar = $scope.data.totalDollar;
                getNumWordArray($scope.data.totalDollar);
            }
        }


        var onTaxRateChange = function() {
            if (!isNumber($scope.data.taxRate)) {
                $timeout(function() {
                    var errorNumString = $scope.data.taxRate.toString();
                    var rightNumString = errorNumString.substring(0, errorNumString.length - 1);
                    $scope.data.taxRate = parseInt(rightNumString);
                }, 100);
            } else {
                $scope.data.businessTax = Math.round($scope.data.salesDollar * $scope.data.taxRate / 100);
                $scope.data.totalDollar = parseInt($scope.data.businessTax) + parseInt($scope.data.salesDollar);
                getNumWordArray($scope.data.totalDollar);
            }
            if ($scope.data.taxRate == "") {
                $scope.data.totalDollar = $scope.data.salesDollar;
                $scope.data.businessTax = 0;
                getNumWordArray($scope.data.totalDollar);
            }
        }

        var getNumWordArray = function(num) {
            clearTotalWord();
            var cWord = ['零', '壹', '貳', '參', '肆', '伍', '陸', '柒', '捌', '玖'];
            var numArray = num.toString().split("");

            var wordCt = $scope.totalWord.length - 1;
            for (var i = numArray.length - 1; i >= 0; i--) {
                $scope.totalWord[wordCt].numberWord = cWord[numArray[i]];
                wordCt--;
            }
        };

        var clearTotalWord = function() {
            for (var i = 0; i < $scope.totalWord.length; i++) {
                $scope.totalWord[i].numberWord = "";
            }
        }

        var onItemChange = function() {
            if ($scope.data.itemDollar && $scope.data.itemDollar.length > 9) {
                $scope.data.itemDollar = $scope.data.itemDollar.substring(0, 9);
                return;
            }
            if (!isNumber($scope.data.itemDollar)) {
                $timeout(function() {
                    var errorNumString = $scope.data.itemDollar.toString();
                    var rightNumString = errorNumString.substring(0, errorNumString.length - 1);
                    $scope.data.itemDollar = parseInt(rightNumString);
                }, 100);
            }
            if (!isNumber($scope.data.itemNumber)) {
                $timeout(function() {
                    var errorNumString = $scope.data.itemNumber.toString();
                    var rightNumString = errorNumString.substring(0, errorNumString.length - 1);
                    $scope.data.itemNumber = parseInt(rightNumString);
                }, 100);
            }
            if ($scope.data.itemNumber && $scope.data.itemDollar) {
                $scope.data.itemTotalDollar = $scope.data.itemNumber * $scope.data.itemDollar;
                $scope.data.salesDollar = $scope.data.itemTotalDollar;
                $scope.data.businessTax = Math.round($scope.data.salesDollar * $scope.data.taxRate / 100);
                $scope.data.totalDollar = parseInt($scope.data.businessTax) + parseInt($scope.data.salesDollar);
                if ($scope.data.totalDollar.toString().length > 9) {
                    $scope.data.itemDollar = $scope.data.itemDollar.substring(0, 8);
                    $scope.data.itemTotalDollar = $scope.data.itemNumber * $scope.data.itemDollar;
                    $scope.data.salesDollar = $scope.data.itemTotalDollar;
                    $scope.data.businessTax = Math.round($scope.data.salesDollar * $scope.data.taxRate / 100);
                    $scope.data.totalDollar = parseInt($scope.data.businessTax) + parseInt($scope.data.salesDollar);
                }
                getNumWordArray($scope.data.totalDollar);
            } else {
                $scope.data.itemTotalDollar = undefined;
                $scope.data.businessTax = 0;
                $scope.data.salesDollar = undefined;
                $scope.data.totalDollar = undefined;
                clearTotalWord();
            }
        }

        var onDoubleItemChange = function() {
            if ($scope.data.itemNumber && $scope.data.itemDollar) {
                if ($scope.data.itemDollar.length > 9) {
                    $scope.data.itemDollar = $scope.data.itemDollar.substring(0, 9);
                    return
                }
                if (!isNumber($scope.data.itemDollar)) {
                    $timeout(function() {
                        var errorNumString = $scope.data.itemDollar.toString();
                        var rightNumString = errorNumString.substring(0, errorNumString.length - 1);
                        $scope.data.itemDollar = parseInt(rightNumString);
                    }, 100);
                }
                if (!isNumber($scope.data.itemNumber)) {
                    $timeout(function() {
                        var errorNumString = $scope.data.itemNumber.toString();
                        var rightNumString = errorNumString.substring(0, errorNumString.length - 1);
                        $scope.data.itemNumber = parseInt(rightNumString);
                    }, 100);
                }
                $scope.data.itemTotalDollar = $scope.data.itemNumber * $scope.data.itemDollar;
                $scope.data.totalDollar = $scope.data.itemTotalDollar;
                getNumWordArray($scope.data.itemTotalDollar);
            } else {
                $scope.data.itemTotalDollar = undefined;
                $scope.data.totalDollar = undefined;
            }
        }

        var companyNameService = {
            API_URL: 'http://company.g0v.ronny.tw/api/',
            getSingleCompanyName: function(companyData) {
                if (typeof companyData['公司名稱'] === 'string') {
                    return companyData['公司名稱'];
                }

                if (typeof companyData['名稱'] === 'string') {
                    return companyData['名稱'];
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

        var getCompanyNameIdWidget = function getCompanyNameIdWidget(config) {
            this.config = config = config || {};
            config.companyIdElement =
                config.companyIdElement || document.getElementById('companyid');
            config.companyNameElement =
                config.companyNameElement || document.getElementById('companyName');

            config.companyIdElement.addEventListener('input', this);
            config.companyIdElement.addEventListener('blur', this);

            this.companyNameTimer = undefined;
            this.apiRequestId = 0;
        }

        getCompanyNameIdWidget.prototype.handleEvent = function(evt) {
            this.checkCompanyId(evt.type === 'blur');
        }

        getCompanyNameIdWidget.prototype.checkCompanyId = function(blur) {
            var $id = $(this.config.companyIdElement);
            var $name = $(this.config.companyNameElement);
            var $checking = $(this.config.checkingElement);
            var val = $.trim($id.val());

            clearTimeout(this.companyNameTimer);
            this.apiRequestId++;

            var apiRequestId = this.apiRequestId;

            companyNameService.getCompanyFromId(val, function(info) {

                if (apiRequestId !== this.apiRequestId) {
                    $scope.data.company = "";
                    return;
                }

                if (typeof(info) === "undefined") {
                    return;
                }

                if ($name.val() !== info.name) {
                    $name.val(info.name);
                    $scope.data.company = info.name;
                }
            }.bind(this));
        }

        var openDatePicker = function() {
            $scope.isDatePickerOpen = true;
        }
        var onDateTimeChange = function() {
            var dd = $scope.data.time.getDate();
            var mm = $scope.data.time.getMonth() + 1;
            var yyyy = $scope.data.time.getFullYear() - 1911;
            $scope.todayDD = dd;
            $scope.todayMM = mm;
            $scope.todayYY = yyyy;
            var dateWord = ['O', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'];
            if (mm == 1 || mm == 2) {
                $scope.invoiceMonth = dateWord[1] + "、" + dateWord[2];
            } else if (mm == 3 || mm == 4) {
                $scope.invoiceMonth = dateWord[3] + "、" + dateWord[4];
            } else if (mm == 5 || mm == 6) {
                $scope.invoiceMonth = dateWord[5] + "、" + dateWord[6];
            } else if (mm == 7 || mm == 8) {
                $scope.invoiceMonth = dateWord[7] + "、" + dateWord[8];
            } else if (mm == 9 || mm == 10) {
                $scope.invoiceMonth = dateWord[9] + "、" + dateWord[10];
            } else if (mm == 11 || mm == 12) {
                $scope.invoiceMonth = dateWord[11] + "、" + dateWord[12];
            }
            var yyArray = yyyy.toString().split("");
            $scope.invoiceYear = dateWord[yyArray[0]] + " " + dateWord[yyArray[1]] + " " + dateWord[yyArray[2]];
        }

        var init = function() {
            new getCompanyNameIdWidget();
            setTodayString();
        }


        /*==========================
            Events
        ==========================*/

        /*==========================
            Members
        ==========================*/

        $scope.invoiceType = "THREE";
        $scope.today;
        $scope.todayDD = "";
        $scope.todayMM = "";
        $scope.todayYY = ""
        $scope.invoiceMonth = "";
        $scope.invoiceYear = ""
        $scope.isResultShow = false;
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

        $scope.isCompanyIdNotFinished = false;
        $scope.isCompanyIdError = false;
        $scope.isCompanyIdSuccess = false;

        $scope.isCompanyEmpty = false;
        $scope.isCompanyIdEmpty = false;
        $scope.isSalesDollarEmpty = false;
        $scope.isTotalDollarEmpty = false;
        $scope.isItemNameEmpty = false;
        $scope.isItemNumberEmpty = false;
        $scope.isItemDollarEmpty = false;

        $scope.isDatePickerOpen = false;
        $scope.format = 'yyyy 年 MM 月 dd 日';
        $scope.dateOptions = {
            locale: 'ru'
        };
        /*==========================
             Methods
        ==========================*/

        $scope.changeInvoiceType = changeInvoiceType;
        $scope.showInvoiceResult = showInvoiceResult;
        $scope.showDoubleInvoiceResult = showDoubleInvoiceResult;
        $scope.clearInvoiceResult = clearInvoiceResult;

        $scope.onCompanyIdChange = onCompanyIdChange;
        $scope.onSalesDollarChange = onSalesDollarChange;
        $scope.onTotalDollarChange = onTotalDollarChange;
        $scope.onDoubleTotalDollarChange = onDoubleTotalDollarChange;

        $scope.onTaxRateChange = onTaxRateChange;
        $scope.onItemChange = onItemChange;
        $scope.onDoubleItemChange = onDoubleItemChange;

        $scope.openDatePicker = openDatePicker;
        $scope.onDateTimeChange = onDateTimeChange;

        /*==========================
             init
        ==========================*/

        init();

    }
]);
