import { appRule } from "./acw";

const biduleRename = appRule(["com.plogue.bidule"], "r", [{ key_code: "f2" }], { mandatory: ["left_command"] }) // Cmd-R to F2
const biduleDelete = appRule(["com.plogue.bidule"], "d", [{ key_code: "delete_forward" }], { mandatory: [] }) // D to Delete
const biduleDeleteOptionD = appRule(["com.plogue.bidule"], "d", [{ key_code: "d" }], { mandatory: ["left_option"] }) // Option-D to letter D

export const biduleRules = [
  { description: "bidule: rename", manipulators: biduleRename },
  { description: "bidule: delete", manipulators: biduleDelete },
  { description: "bidule: delete (option-d)", manipulators: biduleDeleteOptionD },
]
