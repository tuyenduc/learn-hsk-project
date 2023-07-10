import AllNewWords from './../../assets/jsons/tu-vung.json' assert { type: 'json' };
$(document).ready(function () {
    var ArrayCheckeds = [];
    let itemCheck = { "STT": 0, "SimplifiedChinese": "", "Pinyin": "", "Category": "", "SinoVietnamese": "", "Meaning": "", "HSK": 0 };
    let typeCheck = 1;
    LoadQuestions();

    function LoadQuestions() {
        let arrCheckeds = ArrayCheckeds.map(it => it.STT)
        let arrChecks = AllNewWords.filter(it => arrCheckeds.indexOf(it.STT) == -1);
        let numindex = Math.floor(Math.random() * arrChecks.length);
        itemCheck = arrChecks[numindex];
        ArrayCheckeds.push(itemCheck);
        $("#self-check-input").val("");
        $("#self-check-btn-next").addClass("d-none");
        $("#self-check-btn-check").removeClass("d-none");
        typeCheck = Math.floor(Math.random() * (2) + 1);
        if (typeCheck == 1) {
            $("#self-check-label").html(itemCheck.SimplifiedChinese);
            $("#self-check-input").attr("placeholder", "Enter Vietnamese Meaning to check");
        }
        else if (typeCheck == 2) {
            $("#self-check-label").html(itemCheck.Meaning);
            $("#self-check-input").attr("placeholder", "Enter Simplified Chinese to check");
        }
        else {
            $("#self-check-label").html(itemCheck.SimplifiedChinese);
            $("#self-check-input").attr("placeholder", "Enter Pinyin to check");
        }
    }

    $("body").on("keypress", "#self-check-input", function (event) {
        let inputvalue = CheckValueSetEmpty($(this).val()).toLowerCase();
        if (event.which == 13 || event.key == "Enter") {
            CheckQuestion(inputvalue);
        }
    });

    $("body").on("click", "#self-check-btn-check", function (event) {
        let inputvalue = CheckValueSetEmpty($("#self-check-input").val()).toLowerCase();
        CheckQuestion(inputvalue);
    });

    function CheckQuestion(checkvalue) {
        let checkalert = { Status: false, Message: "" };
        if (checkvalue == "") {
            checkalert.Message == "Please Enter Simplified Chinese, Pinyin, Sino-Vietnamese or Vietnamese Meaning to check";
        }
        else {
            let arrMeaning = itemCheck.Meaning.toLowerCase().split(",").map(it => it.trim());
            // || (typeCheck == 2 && itemCheck.Pinyin.toLowerCase() == checkvalue)
            if ((typeCheck == 1 && arrMeaning.includes(checkvalue)) || (typeCheck == 2 && itemCheck.SimplifiedChinese.toLowerCase() == checkvalue)) {
                checkalert.Status = true;
                checkalert.Message = "Correct answer!";
            }
            else {
                checkalert.Message = "Incorrect answer!";
            }
        }
        if (checkalert.Status) {
            $("#self-check-btn-check").addClass("d-none");
            if (ArrayCheckeds.length < AllNewWords.length)
                $("#self-check-btn-next").removeClass("d-none");
        }
        alert(checkalert.Message);
    }

    $("body").on("click", "#self-check-btn-next", function (event) {
        LoadQuestions();
    });
});