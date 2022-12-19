import fs from "fs";

let demo = fs
  .readFileSync("OptiStow_Result.csv", { encoding: "utf-8" })
  .toString();

//csv 파일을 읽어서 객체배열로 반환
export function readCSV_optistow_result() {
  let lines = demo.replace(/\"/gi, "").split("\r\n");

  let container_arr = [];
  for (let i = 1; i < lines.length; i++) {
    let split_line = lines[i].split(",");

    let container = {
      row: "",
      tier: "",
      bay: "",
      pol: 0,
      pod: "",
      len: "",
      hgt: "",
      wgt: "",
      gubun: "",
    };

    let pol = split_line[0];
    let pod = split_line[1];
    let len = split_line[2];
    let hgt = split_line[3];
    let wgt = split_line[4];
    let bay;
    let split_line_bay = split_line[5] + "";
    if (split_line_bay.length == 1) {
      bay = "0" + split_line_bay;
    } else {
      bay = split_line_bay;
    }

    let row;
    let split_line_row = split_line[6] + "";
    if (split_line_row.length == 1) {
      row = "0" + split_line_row;
    } else {
      row = split_line_row;
    }

    let tier;
    let split_line_tier = split_line[7] + "";
    if (split_line_tier.length == 1) {
      tier = "0" + split_line_tier;
    } else {
      tier = split_line_tier;
    }
    let gubun = split_line[8];

    container.pol = pol;
    container.pod = pod;
    container.len = len;
    container.hgt = hgt;
    container.wgt = wgt;
    container.bay = bay.substring(0, 3);
    container.row = row.substring(0, 3);
    container.tier = tier.substring(0, 4);
    container.gubun = gubun;
    if (pol == "CNSHA") {
      container_arr.push(container);
    }
  }
  return container_arr;
}
