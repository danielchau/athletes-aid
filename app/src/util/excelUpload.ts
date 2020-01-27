import * as XLSX from "xlsx";

export var ExcelToJSON = function(data: any) {
    var workbook = XLSX.read(data, {
        type: "binary"
    });

    return XLSX.utils.sheet_to_json(workbook.Sheets["Sheet1"], { raw: false });
};
