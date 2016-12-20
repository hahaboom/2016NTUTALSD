var BASELINE = {
    //傳JSON，待修改
    postJSON : function() {
        $.ajax({
            url : "http://" + _controllertHost + ":" + _controllertPort + "/stats/flowentry/add",
            type : "POST",
            //dataType: return data的資料型態
            dataType : "json",
            data : JSON.stringify(flow),
            beforeSend : console.log(JSON.stringify(flow)),
            statusCode: {
                404: function() {
                    alert("page not found");
                },
                200: function() {
                    alert("200");
                },
                400: function() {
                    alert("SyntaxError");
                },
                501: function() {
                    alert("Unsupported OF protocol");
                },
                500: function() {
                    alert("Unsupported OF protocol");
                }
            },
            complete: function(jqXHR, textStatus) {
                if (textStatus == "error") {
                    var status = jqXHR.status;
                    console.log(status);
                } else {
                    $( "#flowForm" ).find("input[type=text], textarea").val("");
                    $( "#matchFieldDiv" ).children("div").remove();
                    $( "#InstructionsDiv" ).children("div").remove();
                }
            }
        });
    },
};
