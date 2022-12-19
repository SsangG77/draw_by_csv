import Slot from "./Slot_class.js";
import BayPlan from "./BayPlan_class.js";
import Hatchplan from "./HatchPlan_class.js";
import HatchplanList from "./HatchPlanList_class.js";



export default class Hatchplan {
    constructor() {
      this.parent;
      this.hatchNo;
      this.bayplans = [];
    }
  
    Hatchplan(planlist, hatchNo) {
      this.parent = planlist;
      this.hatchNo = hatchNo;
      return this;
    }
  }