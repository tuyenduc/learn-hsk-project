import mappingss from './../../assets/jsons/maping-phat-am.json' assert { type: 'json' };
$(document).ready(function () {
    $("body").on("click", ".table-item-call-listen", function () {
        console.log("Show modal");
    });
    LoadTable();
    function LoadTable() {
        let htmlContent = "";
        let ArrMappings = mappingss.Mappings;
        ArrMappings.map(item => {
            htmlContent += `<ul class="table-row"><li class="table-item bg-info text-white">${item.VanMau}</li>`;
            let arrmaps = item.ThanhVanMau;
            arrmaps.map(tm => {
                htmlContent += `<li class="table-item ${(tm != "" ? "table-item-call-listen" : "")}">${tm}</li>`;
            });
            htmlContent += "</ul>";
        });
        $(".table-phat-am").append(htmlContent);
    }
});