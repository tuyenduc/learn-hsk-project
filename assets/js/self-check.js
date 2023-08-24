import AllNewWords from './../../assets/jsons/tu-vung.json' assert { type: 'json' };
$(document).ready(function () {
    var ArrayCheckeds = [];
    let itemCheck = { "STT": 0, "SimplifiedChinese": "", "Pinyin": "", "Category": "", "SinoVietnamese": "", "Meaning": "", "HSK": 0 };
    let typeCheck = 1;
    // LoadQuestions();
    var btnenter = "#self-check-btn-check";
    function LoadQuestions() {
        $("#self-check-notify").parent().addClass("d-none");
        let arrCheckeds = ArrayCheckeds.map(it => it.STT)
        let arrChecks = AllNewWords.filter(it => arrCheckeds.indexOf(it.STT) == -1);
        let numindex = Math.floor(Math.random() * arrChecks.length);
        itemCheck = arrChecks[numindex];
        ArrayCheckeds.push(itemCheck);
        $("#self-check-input").val("");
        $("#self-check-btn-next").addClass("d-none");
        $("#self-check-btn-check").removeClass("d-none");
        typeCheck = Math.floor(Math.random() * (2) + 1);
        $("#self-check-pinyin-suggestion").addClass("d-none");
        if (typeCheck == 1) {
            $("#self-check-question").text(itemCheck.SimplifiedChinese);
            $("#self-check-input").attr("placeholder", "Nhập nghĩa tiếng Việt");
            $("#self-check-pinyin-suggestion").text(` (${itemCheck.Pinyin})`);
        }
        else if (typeCheck == 2) {
            $("#self-check-question").text(itemCheck.Meaning);
            $("#self-check-input").attr("placeholder", "Nhập tiếng Trung");
            $("#self-check-pinyin-suggestion").text(` (${itemCheck.Pinyin})`);
        }
        else {
            $("#self-check-question").text(itemCheck.SimplifiedChinese);
            $("#self-check-input").attr("placeholder", "Nhập Pinyin");
            $("#self-check-pinyin-suggestion").text(` (${itemCheck.Pinyin})`);
        }
    }

    $("body").on("click", "#self-check-question", function (event) {
        if ($("#self-check-pinyin-suggestion").attr("class").indexOf("d-none") > -1)
            $("#self-check-pinyin-suggestion").removeClass("d-none");
        else
            $("#self-check-pinyin-suggestion").addClass("d-none");
    });

    $("body").on("click", "#btn-start", function (event) {
        $(this).parents("div.form-self-check").addClass("d-none");
        $(".card-body").find(".form-self-check").first().removeClass("d-none");
        LoadQuestions();
    });

    $("body").on("keypress", "#self-check-input", function (event) {
        if (event.which == 13 || event.key == "Enter") {
            $(btnenter).click();
        }
    });

    $("body").on("click", "#self-check-btn-check", function (event) {
        CheckQuestion();
    });

    function CheckQuestion() {
        let checkvalue = CheckValueSetEmpty($("#self-check-input").val()).toLowerCase();
        let checkalert = { Status: false, Message: "" };
        if (checkvalue == "") {
            checkalert.Message == "Nhập tiếng Trung, Hán Việt hoặc nghĩa tiếng Việt";
        }
        else {
            let arrMeaning = itemCheck.Meaning.toLowerCase().split(",").map(it => it.trim());
            if ((typeCheck == 1 && arrMeaning.includes(checkvalue)) || (typeCheck == 2 && itemCheck.SimplifiedChinese.toLowerCase() == checkvalue)) {
                checkalert.Status = true;
                checkalert.Message = "Đáp án chính xác!";
            }
            else {
                checkalert.Message = "Đáp án không chính xác!";
            }
        }
        $("#self-check-notify").parent().removeClass("d-none");
        if (checkalert.Status) {
            $("#self-check-btn-check").addClass("d-none");
            if (ArrayCheckeds.length < AllNewWords.length) {
                $("#self-check-btn-next").removeClass("d-none");
                btnenter = "#self-check-btn-next";
            }
            $("#self-check-notify").text(checkalert.Message).removeClass("text-danger");
        }
        else {
            $("#self-check-notify").text(checkalert.Message).addClass("text-danger");
        }
    }

    $("body").on("click", "#self-check-btn-next", function (event) {
        LoadQuestions();
        btnenter = "#self-check-btn-check";
    });
});