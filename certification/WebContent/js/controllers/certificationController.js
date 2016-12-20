app.controller("CertificationController", ['$scope', '$state', '$timeout', '$rootScope',
    function($scope, $state, $timeout, $rootScope) {

        var ClickGenerateButton = function() {
            var studentName = document.getElementById('studentName').value;
            var certificationId = document.getElementById('certificationId').value;
            var courceDate = document.getElementById('courceDate').value;
            var courceName = document.getElementById('courceName').value;
            var courceDuration = document.getElementById('courceDuration').value;
            var certificationDate = document.getElementById('certificationDate').value;

            var data = new Object();
            data.id_ = certificationId;
            data.owner_ = studentName;
            data.date_ = certificationDate;
            data.courceDate_ = courceDate;
            data.courceName_ = courceName;
            data.courceDuration_ = courceDuration;

            $.post("/Certification/CertificationServlet", JSON.stringify(data))
                .done(function(data) {
                    document.getElementById("someImg").setAttribute('src', 'data:image/png;base64,' + data);
                });
        }

        var ClickDownloadButton = function() {
            var imgData = document.getElementById("someImg").getAttribute('src');
            if (imgData != null) {
                var link = document.createElement('a');
                link.href = imgData;
                link.download = "Download.png";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        }

        var ClickDownloadPDFButton = function() {
            var imgData = document.getElementById("someImg").getAttribute('src');

            if (imgData != null) {
                $.post("/Certification/CertificationServlet")
                    .done(function(data) {
                        var link = document.createElement('a');
                        link.href = 'data:application/pdf;base64,' + data;
                        link.download = document.getElementById("certificationId").value + " " + document.getElementById("studentName").value + ".pdf";
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                    });
            }
        }

        var init = function() {}

        $scope.ClickGenerateButton = ClickGenerateButton;
        $scope.ClickDownloadButton = ClickDownloadButton;
        $scope.ClickDownloadPDFButton = ClickDownloadPDFButton;
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
