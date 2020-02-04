import * as XLSX from "xlsx";

/**
 * Transforms file data into JSON structure with excel contents.
 * @param data
 */
export var ExcelToJSON = function(data: any) {
    var workbook = XLSX.read(data, {
        type: "binary"
    });

    return XLSX.utils.sheet_to_json(workbook.Sheets["Sheet1"], { raw: false });
};
