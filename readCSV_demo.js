import fs from "fs";

let demo = fs.readFileSync("MV03_demo.csv", { encoding: "utf-8" }).toString();

//csv 파일을 읽어서 객체배열로 반환
export function readCSV_demo() {
  let lines = demo.replace(/\"/gi, "").split("\r\n");
  console.log(lines[0]);
  console.log(lines[1]);
  console.log(lines[2]);
  console.log(lines[3]);
  console.log(lines[4]);

  let container_arr = [];
  for (let i = 1; i < lines.length; i++) {
    let split_line = lines[i].split(",");
    //console.log(split_line);

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

    let pol = split_line[4];
    let pod = split_line[5];
    let len = split_line[7];
    let hgt = split_line[8];
    let wgt = split_line[9];
    let bay = split_line[0];
    let row = split_line[1] + "";
    let tier = split_line[2] + "";
    let gubun = split_line[8];

    container.pol = pol;
    container.pod = pod;
    container.len = len;
    container.hgt = hgt;
    container.wgt = wgt;
    if (bay.length == 1) {
      container.bay = "0" + bay;
    } else {
      container.bay = bay;
    }
    if (row.length == 1) {
      container.row = "0" + row;
    } else {
      container.row = row;
    }
    if (tier.length == 1) {
      container.tier = "0" + tier;
    } else {
      container.tier = tier;
    }
    container.gubun = gubun;
    container_arr.push(container);
  }

  return container_arr;
}
