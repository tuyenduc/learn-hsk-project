import AllNewWords from './../../assets/jsons/tu-vung.json' assert { type: 'json' };

$(document).ready(function () {
    LoadNewWords("");

    function LoadNewWords(strSearch) {
        let htmlContent = "";
        let arrDisplays = AllNewWords;
        if (strSearch != "") {
            arrDisplays = AllNewWords.filter(it => it.SimplifiedChinese.includes(strSearch) || it.Pinyin.includes(strSearch) || it.Category.includes(strSearch) || it.SinoVietnamese.includes(strSearch) || it.Meaning.includes(strSearch))
        }

        arrDisplays.map(item => {
            htmlContent += `<ul class="table-row">`;
            htmlContent += `<li class="table-item">${item.SimplifiedChinese}</li>`;
            htmlContent += `<li class="table-item">${item.Pinyin}</li>`;
            htmlContent += `<li class="table-item">${item.Category}</li>`;
            htmlContent += `<li class="table-item">${item.SinoVietnamese}</li>`;
            htmlContent += `<li class="table-item">${item.Meaning}</li>`;
            htmlContent += `<li class="table-item">${item.HSK}</li>`;
            htmlContent += "</ul>";
        });
        $("#table_new_words").html(htmlContent);
    }

    $("body").on("change", ".search-input", function (event) {
        let searchValue = CheckValueSetEmpty($(this).val());
        LoadNewWords(searchValue);
    });
    
    $("body").on("click", ".search-btn", function (event) {
        let searchValue = CheckValueSetEmpty($(".search-input").val());
        LoadNewWords(searchValue);
    });

    function IsValuable(str) {
        return str !== null && str !== undefined && str !== "";
    }

    function CheckValueSetEmpty(str) {
        if (!IsValuable(str)) {
            return "";
        } else {
            return str;
        }
    }

    function CheckValueSetZero(str) {
        try {
            if (!IsValuable(str)) {
                return 0;
            } else if (isNaN(str)) {
                return 0;
            } else {
                return Number(str);
            }
        } catch (e) {
            return 0;
        }
    }

    function getRandomDifferent(arr, last = undefined) {
        if (arr.length === 0) {
          return null;
        } else if (arr.length === 1) {
          return arr[0];
        } else {
          let num = 0;
          do {
            num = Math.floor(Math.random() * arr.length);
          } while (arr[num] === last);
          return arr[num];
        }
      }
});