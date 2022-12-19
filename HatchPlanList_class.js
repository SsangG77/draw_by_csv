import Slot from "./Slot_class.js";
import BayPlan from "./BayPlan_class.js";
import Hatchplan from "./HatchPlan_class.js";
import HatchplanList from "./HatchPlanList_class.js";

export default class HatchplanList {
  constructor() {
    this.parent;
    this.vesselCode = "";
    this.hatchplans = [];
    this.MaxDeckRow = 0;
    this.MaxDeckTier = 0;
    this.MaxHoldRow = 0;
    this.MaxHoldTier = 0;

    this.totalBays = 0;
    this.totalHatches = 0;

    this.padding = 2;
    this.gap = 10;
    this.space = 10;

    this.fnt;
    this.pen;
  }
  InitHatchplanList(data) {
    let hatchplan_result;
    //파일 전체를 줄단위로 나눠서 배열로 생성
    let arr = data.toString().split("\r\n");
    //console.log(arr[0]);
    try {
      //문자열의 첫번째줄이 F01이 포함되어있는지 확인
      for (let i = 1; i < arr.length; i++) {
        let line = arr[i];
        let tokens = line.split("=");
        //console.log(tokens)
        if (tokens[0] === "F02") {
          let tks = tokens[1].split("^");
          this.vesselCode = tks[0];
          this.MaxDeckRow = Number(tks[6]);
          this.MaxHoldRow = Number(tks[7]);
          this.MaxDeckTier = Number(tks[8]);
          this.MaxHoldTier = Number(tks[9]);
          this.totalBays = Number(tks[10]);
          //console.log(this.totalBays);
          this.totalHatches = Number(tks[11]);
          //console.log(this.totalHatches)
          if (this.totalHatches != 0) {
            for (let i = 0; i < this.totalHatches; i++) {
              let hatchplan = new Hatchplan();
              let result = hatchplan.Hatchplan(this, i + 1);
              this.hatchplans.push(result);
              //this.parent.AddCombo(i);
            }
          }
        }
        if (tokens[0] === "F05") {
          let plan = new BayPlan();
          plan.BayPlan(this);
          plan.ProcessLine(tokens[1]);
          let hatchplans = this.hatchplans;
          let result;
          for (let i = 0; i < hatchplans.length; i++) {
            if (hatchplans[i].hatchNo === Number(plan.hatchNo)) {
              result = hatchplans[i];
            }
          }
          if (result != null) {
            result.bayplans.push(plan);
          }
        }
      }
      for (let i = 1; i < arr.length; i++) {
        let line = arr[i];
        let tokens = line.split("=");
        //console.log(tokens);
        if (tokens[0] === "General Particular") {
          let tks = tokens[1].split("^");
          this.vesselCode = tks[0];
          console.log("vessel code : ", this.vesselCode);
          this.MaxDeckRow = Number(tks[6]);
          console.log("Max Deck Row : ", this.MaxDeckRow);
          this.MaxHoldRow = Number(tks[7]);
          console.log("Max Hold Row : ", this.MaxHoldRow);
          this.MaxDeckTier = Number(tks[8]);
          this.MaxHoldTier = Number(tks[9]);
          this.totalBays = Number(tks[10]);
          //console.log(this.totalBays);
          this.totalHatches = Number(tks[11]);
          //console.log(this.totalHatches)
          if (this.totalHatches != 0) {
            for (let i = 0; i < this.totalHatches; i++) {
              let hatchplan = new Hatchplan();
              let result = hatchplan.Hatchplan(this, i + 1);
              this.hatchplans.push(result);
              //this.parent.AddCombo(i);
            }
          }
        }
        if (tokens[0] === "Bay") {
          let plan = new BayPlan();
          plan.BayPlan(this);
          plan.ProcessLine(tokens[1]);
          let hatchplans = this.hatchplans;
          let result;
          for (let i = 0; i < hatchplans.length; i++) {
            if (hatchplans[i].hatchNo === Number(plan.hatchNo)) {
              result = hatchplans[i];
            }
          }
          if (result != null) {
            result.bayplans.push(plan);
          }
        }
      }

      hatchplan_result = this.hatchplans;
      return hatchplan_result;
    } catch (e) {
      console.log(e);
      return hatchplan_result;
    }
  }
}
