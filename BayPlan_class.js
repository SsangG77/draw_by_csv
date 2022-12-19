import Slot from "./Slot_class.js";
import BayPlan from "./BayPlan_class.js";
import Hatchplan from "./HatchPlan_class.js";
import HatchplanList from "./HatchPlanList_class.js";

let SlotType = {
  FWD20: 0,
  FORTY: 1,
  AFT20: 2,
};

let deckrow = [];
let holdrow = [];
let decktier = [];
let holdtier = [];

export default class BayPlan {
  constructor() {
    this.deckSlots = []; //List<Slot> deckSlots = new List<Slot>();
    this.holdSlots = []; //List<Slot> holdSlots = new List<Slot>();
    this.slotType = SlotType.FORTY;
    this.grandParent; //public HatchplanList grandParent;
    this.hatchNo = 0;
    this.bayNo = 0;
    //픽셀
    this.padding = 2;
    this.gap = 2;
    this.space = 4; //upper deck와 lower deck 간격

    this.slotWidth = 100;
    this.slotHeight = 100;
  }

  BayPlan(planlist) {
    this.grandParent = planlist;
  }

  ProcessLine(line) {
    let tks = line.split("^");
    //console.log(tks[0])
    let idx = 7;
    let ii = 0;

    this.bayNo = tks[0];
    this.hatchNo = tks[1];

    for (let i = 0; i < this.grandParent.MaxDeckRow; i++) {
      ii = idx + 4 * i;
      deckrow[i] = tks[ii];
    }
    idx = ii + 4;

    for (let i = 0; i < this.grandParent.MaxHoldRow; i++) {
      ii = idx + 4 * i;
      holdrow[i] = tks[ii];
    }
    idx = ii + 4;

    for (let i = 0; i < this.grandParent.MaxDeckTier; i++) {
      ii = idx + 3 * i;
      decktier[i] = tks[ii];
    }
    idx = ii + 3;

    for (let i = 0; i < this.grandParent.MaxHoldTier; i++) {
      ii = idx + 3 * i;
      holdtier[i] = tks[ii];
    }

    // Deck Slot Creation
    for (let i = 0; i < this.grandParent.MaxDeckRow; i++) {
      if (deckrow[i] != "") {
        for (let j = 0; j < this.grandParent.MaxDeckTier; j++) {
          if (decktier[j] != "") {
            let slot = new Slot(this, i, j, deckrow[i], decktier[j], false);
            this.deckSlots.push(slot);
          }
        }
      }
    }

    //Hold Slot Creation
    for (let i = 0; i < this.grandParent.MaxHoldRow; i++) {
      if (holdrow[i] != "") {
        for (let j = 0; j < this.grandParent.MaxHoldTier; j++) {
          if (holdtier[j] != "") {
            let slot = new Slot(this, i, j, holdrow[i], holdtier[j], true);
            this.holdSlots.push(slot);
          }
        }
      }
    }
  }
}
