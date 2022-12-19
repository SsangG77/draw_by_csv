import Slot from "./Slot_class.js";
import BayPlan from "./BayPlan_class.js";
import Hatchplan from "./HatchPlan_class.js";
import HatchplanList from "./HatchPlanList_class.js";

export default class Slot {
    constructor(bayPlan, aRow, aTier, rowName, tierName, isHold) {
      this.parent = bayPlan;
      this.row = aRow;
      this.tier = aTier;
      this.rowName = rowName;
      this.tierName = tierName;
      this.isHold = isHold;
      this.width = 5;
      this.height = 5;
    }
  }