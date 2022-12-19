import fs from "fs";
//const path = require("path");

//class
import Slot from "./Slot_class.js";
import BayPlan from "./BayPlan_class.js";
import Hatchplan from "./HatchPlan_class.js";
import HatchplanList from "./HatchPlanList_class.js";

//read csv
import { readCSV_demo } from "./readCSV_demo.js";

let container_arr = readCSV_demo();
let hatchplan_result;

let vsm = fs.readFileSync("MV03.VSM", {
  encoding: "utf-8",
  flag: "r",
});

let hatchplanList = new HatchplanList();
hatchplan_result = hatchplanList.InitHatchplanList(vsm);

console.log(container_arr);
console.log(hatchplan_result);

let sample = 0;

//===================================================================================
let width = 20;

let canvas1 = document.getElementById("canvas1");
let canvas2 = document.getElementById("canvas2");
let canvas3 = document.getElementById("canvas3");

var ctx1 = canvas1.getContext("2d");
var ctx2 = canvas2.getContext("2d");
var ctx3 = canvas3.getContext("2d");

let hatchNumber = 0;

function drawHatch(hatchplan_result, hatchNumber, containers) {
  let bayPlans = hatchplan_result[hatchNumber].bayplans;
  let bayPlan1 = hatchplan_result[hatchNumber].bayplans[0];
  let bayPlan2 = hatchplan_result[hatchNumber].bayplans[1];
  let bayPlan3 = hatchplan_result[hatchNumber].bayplans[2];

  if (bayPlans.length == 1) {
    drawBay(bayPlan1, ctx2, canvas2, containers);
  } else {
    drawBay(bayPlan1, ctx1, canvas1, containers);
    drawBay(bayPlan2, ctx2, canvas2, containers);
    drawBay(bayPlan3, ctx3, canvas3, containers);
  }
}

//베이 한개를 그리는 함수
function drawBay(bayplan, ctx, canvas, containers) {
  let MaxDeckRow = bayplan.grandParent.MaxDeckRow;
  let MaxDeckTier = bayplan.grandParent.MaxDeckTier;
  let MaxHoldRow = bayplan.grandParent.MaxHoldRow;
  let MaxHoldTier = bayplan.grandParent.MaxHoldTier;

  let deckSlots = bayplan.deckSlots;
  //console.log(deckSlots)
  let holdSlots = bayplan.holdSlots;
  let dif = (MaxDeckRow - MaxHoldRow) / 2;

  drawDeckBack(MaxDeckRow, MaxDeckTier, ctx, canvas);
  drawDeck(deckSlots, ctx, canvas, containers);

  drawHoldBack(MaxHoldRow, MaxHoldTier, MaxDeckTier, dif, ctx, canvas);
  drawHold(holdSlots, MaxDeckTier, dif, ctx, canvas, containers);
}

function drawDeck(deckSlots, ctx, canvas, containers) {
  for (let i = 0; i < deckSlots.length; i++) {
    if (deckSlots[i].rowName != "") {
      let slot = deckSlots[i];
      //let width = slot.width * 10;
      let row = Number(slot.row);
      let tier = Number(slot.tier);
      if (canvas.getContext) {
        if (slot.tierName != undefined) {
          // ctx.fillStyle = "#cb65d6";
          // ctx.fillRect(row * width, tier * width, width, width);
          ctx.strokeStyle = "#000000";
          ctx.lineWidth = "1";
          ctx.strokeRect(row * width, tier * width, width, width);

          for (let j = 0; j < containers.length; j++) {
            let container = containers[j];

            if (
              slot.rowName == container.row &&
              slot.tierName == container.tier &&
              slot.parent.bayNo == container.bay
            ) {
              ctx.lineWidth = "1";
              ctx.strokeRect(row * width, tier * width, width, width);
              ctx.strokeStyle = "#000000";

              let pod = container.pod;
              switch (pod) {
                case "CNHKG":
                  ctx.fillStyle = "#ff6554";
                  ctx.fillRect(row * width, tier * width, width, width);
                  break;
                case "MYPKG":
                  ctx.fillStyle = "#5465ff";
                  ctx.fillRect(row * width, tier * width, width, width);
                  break;
                case "CNSHA":
                  ctx.fillStyle = "#a39e34";
                  ctx.fillRect(row * width, tier * width, width, width);
                  break;
                case "TWTPE":
                  ctx.fillStyle = "#a33493";
                  ctx.fillRect(row * width, tier * width, width, width);
                  break;
                case "DEHAM":
                  ctx.fillStyle = "#3489a3";
                  ctx.fillRect(row * width, tier * width, width, width);
                  break;
                case "GRPIR":
                  ctx.fillStyle = "#3a34a3";
                  ctx.fillRect(row * width, tier * width, width, width);
                  break;
                case "NLRTM":
                  ctx.fillStyle = "#a33434";
                  ctx.fillRect(row * width, tier * width, width, width);
                  break;
                case "FRLEH":
                  ctx.fillStyle = "#ff5e00";
                  ctx.fillRect(row * width, tier * width, width, width);
                  break;
              }

              if (container.hgt == "H") {
                ctx.beginPath(); // Start a new path
                ctx.moveTo(row * width, tier * width); // Move the pen to (30, 50)
                ctx.lineTo(row * width + width, tier * width + width); // Draw a line to (150, 100)
                ctx.lineWidth = 5;
                ctx.strokeStyle = "#54ff79";
                ctx.stroke(); // Render the path
              } else {
                ctx.fillStyle = "#548aff";
                ctx.fillRect(row * width, tier * width, width, width);
              }
              //drawArea(ctx, row * width, tier * width, width, "#ff6554");
            }
          }
        }
      }
    }
  }
}

function drawHold(holdSlots, maxDeckTier, dif, ctx, canvas, containers) {
  for (let i = 0; i < holdSlots.length; i++) {
    let slot = holdSlots[i];
    if (slot.rowName != "") {
      //let width = slot.width * 10;
      let row = Number(slot.row) + dif;
      let tier = Number(slot.tier) + maxDeckTier + 1;
      if (canvas.getContext) {
        if (slot.tierName != "") {
          // ctx.fillStyle = "#569469"; // color of fill
          // ctx.fillRect(row * width, tier * width, width, width);
          ctx.strokeStyle = "#000000";
          ctx.lineWidth = "1";
          ctx.strokeRect(row * width, tier * width, width, width);

          for (let j = 0; j < containers.length; j++) {
            let container = containers[j];
            if (
              slot.rowName == container.row &&
              slot.tierName == container.tier &&
              slot.parent.bayNo == container.bay
            ) {
              let pod = container.pod;
              switch (pod) {
                case "CNHKG":
                  ctx.fillStyle = "#ff6554";
                  ctx.fillRect(row * width, tier * width, width, width);
                  break;
                case "MYPKG":
                  ctx.fillStyle = "#5465ff";
                  ctx.fillRect(row * width, tier * width, width, width);
                  break;
                case "CNSHA":
                  ctx.fillStyle = "#a39e34";
                  ctx.fillRect(row * width, tier * width, width, width);
                  break;
                case "TWTPE":
                  ctx.fillStyle = "#a33493";
                  ctx.fillRect(row * width, tier * width, width, width);
                  break;
                case "DEHAM":
                  ctx.fillStyle = "#3489a3";
                  ctx.fillRect(row * width, tier * width, width, width);
                  break;
                case "GRPIR":
                  ctx.fillStyle = "#3a34a3";
                  ctx.fillRect(row * width, tier * width, width, width);
                  break;
                case "NLRTM":
                  ctx.fillStyle = "#a33434";
                  ctx.fillRect(row * width, tier * width, width, width);
                  break;
                case "FRLEH":
                  ctx.fillStyle = "#ff5e00";
                  ctx.fillRect(row * width, tier * width, width, width);
                  break;
              }
              if (container.hgt == "N") {
                ctx.fillStyle = "#ff6554";
                ctx.fillRect(row * width, tier * width, width, width);
                ctx.beginPath(); // Start a new path
                ctx.moveTo(row * width, tier * width); // Move the pen to (30, 50)
                ctx.lineTo(row * width + width, tier * width + width); // Draw a line to (150, 100)
                ctx.lineWidth = 5;
                ctx.strokeStyle = "#54ff79";
                ctx.stroke(); // Render the path
              } else {
                ctx.fillStyle = "#548aff";
                ctx.fillRect(row * width, tier * width, width, width);
              }
            }
          }
        }
      }
    }
  }
}

function drawDeckBack(maxDeckRow, maxDeckTier, ctx, canvas) {
  for (let i = 0; i < maxDeckRow; i++) {
    for (let j = 0; j < maxDeckTier; j++) {
      //let width = 50;
      if (canvas.getContext) {
        ctx.strokeStyle = "#a6a6a6";
        ctx.lineWidth = "1";
        ctx.strokeRect(i * width, j * width, width, width);
      }
    }
  }
}

function drawHoldBack(maxHoldRow, MaxHoldTier, maxDeckTier, dif, ctx, canvas) {
  for (let i = 0; i < maxHoldRow; i++) {
    for (let j = 0; j < MaxHoldTier; j++) {
      //let width = 50;
      if (canvas.getContext) {
        ctx.strokeStyle = "#a6a6a6";
        ctx.lineWidth = "1";
        ctx.strokeRect(
          (i + dif) * width,
          (j + maxDeckTier + 1) * width,
          width,
          width
        );
      }
    }
  }
}

//======================================================

let dropdown = document.getElementById("select_hatch");
let set_option = document.createElement("option");
set_option.innerHTML = "Choose Hatch";
dropdown.appendChild(set_option);
for (let i = 0; i < 20; i++) {
  addDropdown(i + 1);
}

function addDropdown(hatch_no) {
  let new_option = document.createElement("option");
  new_option.setAttribute("value", hatch_no);
  new_option.innerHTML = "hatch No " + hatch_no;
  dropdown.appendChild(new_option);
}

dropdown.onchange = function (e) {
  ctx1.clearRect(0, 0, canvas1.width, canvas1.height);
  ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
  ctx3.clearRect(0, 0, canvas3.width, canvas3.height);
  let option_value = e.target.options[e.target.selectedIndex].value;
  hatchNumber = option_value - 1;
  drawHatch(hatchplan_result, hatchNumber, container_arr);
};
