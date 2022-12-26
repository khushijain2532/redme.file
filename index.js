/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */
var jpdbBaseURL = "http://api.login2explore.com:5577";
var jpdbIRL = "/api/irl";
var jpdbIML = "/api/iml";
var stuDBname = "STU-DB";
var stuRelationName = "StuData";
var connToken = "90938273|-31949273803393511|90952670";

$("#stuid").focus();
 

function saveRecNo2LS(jsonObj) {
    var lvData = JSON.parse(jsonObj.data);
    localStorage.setItem("recno", lvData.rec_no);
}

function getStuIdAsJsonObj() {
    var stuid = $("#stuid").val();
    var jsonStr = {
        id: stuid
    };
    return JSON.stringify(jsonStr);
}

function fillData(jsonObj) {
    saveRecNo2LS(jsonObj);
    var data = JSON.parse(jsonObj.data).record;
    $("#stuname").val(data.name);
    $("#stuclass").val(data.class);
    $("#birthdate").val(data.birthdate);
    $("#address").val(data.address);
    $("#enrolldate").val(data.enrolldate);
}

function resetForm(){
    $("#stuid").val("");
    $("#stuname").val("");
    $("#stuclass").val("");
    $("#birthdate").val("");
    $("#address").val("");
    $("#enrolldate").val("");
    $("#stuid").prop("disabled", false);
    $("#save").prop("disabled", true);
    $("#update").prop("disabled", true);
    $("#reset").prop("disabled", true);
    $("#stuid").focus();
    
}

function validateData() {
    var stuid, stuname, stuclass, birthdate, address, enrolldate;
    stuid = $("#stuid").val();
    stuname = $("#stuname").val();
    stuclass = $("#stuclass").val();
    birthdate = $("#birthdate").val();
    address = $("#address").val();
    enrolldate = $("#enrolldate").val();
    
    if (stuid === "") {
        alert("Student Enrollment is missing");
        $("#stuid").focus();
        return "";
    }
    if (stuname === "") {
        alert("Student Name is missing");
        $("#stuname").focus();
        return "";
    }
    if (stuclass === "") {
        alert("Student Class is missing");
        $("#stuclass").focus();
        return "";
    }
    if (birthdate === "") {
        alert("Student Birth Date is missing");
        $("#birthdate").focus();
        return "";
    }
    if (address === "") {
        alert("Student Address is missing");
        $("#address").focus();
        return "";
    }
    if (enrolldate === "") {
        alert("Student Enrollment Date is missing");
        $("#enrolldate").focus();
        return "";
    }
    
    var jsonStrObj = {
        id: stuid,
        name: stuname,
        class: stuclass,
        birthdate: birthdate,
        address: address,
        enrolldate: enrolldate
    };
    return JSON.stringify(jsonStrObj);
}

function getStu() {
    var stuIdJsonObj = getStuIdAsJsonObj();
    var getRequest = createGET_BY_KEYRequest(connToken, stuRelationName, stuIdJsonObj);
    jQuery.ajaxSetup({async: false});
    var resJsonObj = executeCommandAtGivenBaseUrl(getRequest, jpdbBaseURL, jpdbIRL);
    jQuery.ajaxSetup({async: true});
    if (resJsonObj.status === 400){
        $("#save").prop("disabled", false);
        $("#reset").prop("disabled", false);
        $("stuname").focus();
    }else if (resJsonObj.status === 200) {
        $("#stuid").prop("disabled", true);
        fillData(resJsonObj);
        
        $("#update").prop("disabled", false);
        $("#reset").prop("disabled", false);
        $("#stuname").focus();
    }
        
    }
    
    function saveData(){
        var jsonStrObj = validateData();
        if (jsonStrObj === "") {
            return "";
        }
        var putRequest = createPUTRequest(connToken, jsonStrObj, stuDBName, stuRelationName);
        jQuery.ajaxSetup({async: false});
        var resJsonObj = executeCommandAtGivenBaseUrl(putRequest, jpdbBaseURL, jpdbIML);
        jQuery.ajaxSetup({async: true});
        resetForm();
        $("#stuid").focus();
    }
    
    function updateData() {
        $("#update").prop("disabled", true);
        jsonChg = validateData();
        var updateRequest = createUPDATERecordRequest(connToken, jsonUpd, stuDBName, stuRelationName, localStorage.getItem("recno"));
        jQuery.ajaxSetup({async: false});
        var resJsonObj = executeCommandAtGivenBaseUrl(updateRequest, jpdbBaseURL, jpdbIML);
        jQuery.ajaxSetup({async: true});
        console.log(resJsonObj);
        resetForm();
        $("#stuid").focus();
        
    }