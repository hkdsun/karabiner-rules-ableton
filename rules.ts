import fs from "fs";
import { KarabinerRules, Manipulator, Modifiers } from "./types";
import {
 abletonHoldTypingMode,
 abletonRule,
 toCmdHotkey,
 toCmdShiftHotkey,
 toAbletonHotkey,
 toPassThroughHotKey,
 abletonToggleTypingMode,
 globals,
 activateTypingMode,
 deactivateTypingMode,
 toShiftHotkey,
} from "./acw";


function hyperKeyRule(): Manipulator[] {
  return [{
    type: "basic",
    from: {
      key_code: "right_command",
      modifiers: { mandatory: []},
    },
    to: [{ key_code: "left_command", modifiers: ["left_control", "left_option"] }],
  }]
}

const abletonSearch = abletonRule("t", [
  ...toCmdHotkey("f"),
  ...activateTypingMode,
])

const abletonSearchEnd = abletonRule("backslash", [
  ...toAbletonHotkey("5"),
  ...deactivateTypingMode,
], {}, true)

const abletonRename = abletonRule("r", [
  ...toCmdHotkey("r"),
  ...activateTypingMode,
], { mandatory: ["left_command"] }, true)

const abletonRenameEnd = abletonRule("return_or_enter", [
  ...deactivateTypingMode,
  { key_code: "return_or_enter" },
], {}, true)

const abletonEscape = abletonRule("escape", [
  ...deactivateTypingMode,
  { key_code: "escape" },
], {}, true)

const abletonCmdF = abletonRule("f", [
  ...toCmdHotkey("f"),
  ...activateTypingMode,
], { mandatory: ["left_command"] }, true)


const rules: KarabinerRules[] = [
  { description: "hyper key",  manipulators: hyperKeyRule() },
  { description: "ableton: right_control to ableton prefix", manipulators: abletonRule("right_control", [{ key_code: "left_command", modifiers: ["left_option"] }], {}, true)},
  { description: "ableton: typing mode hold (shift)", manipulators: abletonHoldTypingMode()},
  { description: "ableton: typing mode toggle (control)", manipulators: abletonToggleTypingMode()},
  { description: "ableton: typing mode escape", manipulators: abletonEscape},
  { description: "ableton: rename", manipulators: abletonRename },
  { description: "ableton: end rename", manipulators: abletonRenameEnd },
  { description: "ableton: search", manipulators: abletonSearch },
  { description: "ableton: cmd-f", manipulators: abletonCmdF },
  { description: "ableton: end search / toggle browser", manipulators: abletonSearchEnd },
  { description: "ableton: split", manipulators: abletonRule("e", toCmdHotkey("e")) },
  { description: "ableton: clip", manipulators: abletonRule("open_bracket", toAbletonHotkey("3")) },
  { description: "ableton: fullclip", manipulators: abletonRule("quote", toAbletonHotkey("e")) },
  { description: "ableton: device", manipulators: abletonRule("close_bracket", toAbletonHotkey("4")) },
  { description: "ableton: mixer", manipulators: abletonRule("equal_sign", toAbletonHotkey("m")) },
  { description: "ableton: plugin", manipulators: abletonRule("hyphen", toAbletonHotkey("p")) },
  { description: "ableton: narrow grid", manipulators: abletonRule("2", toCmdHotkey("1")) },
  { description: "ableton: widen grid", manipulators: abletonRule("1", toCmdHotkey("2")) },
  { description: "ableton: triplets", manipulators: abletonRule("3", toCmdHotkey("3")) },
  { description: "ableton: snap-to-grid", manipulators: abletonRule("4", toCmdHotkey("4")) },
  { description: "ableton: delete", manipulators: abletonRule("d", toPassThroughHotKey("delete_forward")) },
  { description: "ableton: duplicate", manipulators: abletonRule("f", toCmdHotkey("d")) },
  { description: "ableton: quantize", manipulators: abletonRule("u", toCmdHotkey("u")) },
  { description: "ableton: undo", manipulators: abletonRule("z", toCmdHotkey("z")) },
  { description: "ableton: redo", manipulators: abletonRule("x", toCmdShiftHotkey("z")) },
  { description: "ableton: sends", manipulators: abletonRule("q", toAbletonHotkey("s")) },
  { description: "ableton: inputs", manipulators: abletonRule("w", toAbletonHotkey("i")) },
  { description: "ableton: crop", manipulators: abletonRule("c", toCmdShiftHotkey("j")) },
  { description: "ableton: join", manipulators: abletonRule("v", toCmdHotkey("j")) },
  { description: "ableton: loop", manipulators: abletonRule("l", toCmdHotkey("l")) },
  { description: "ableton: arm", manipulators: abletonRule("r", toPassThroughHotKey("c")) },
  { description: "ableton: insert midi clip", manipulators: abletonRule("o", toCmdShiftHotkey("m")) },
  { description: "ableton: new audio track", manipulators: abletonRule("i", toCmdHotkey("t")) },
  { description: "ableton: new midi track", manipulators: abletonRule("i", toCmdShiftHotkey("t"), { mandatory: ["command"] }) },
  { description: "ableton: resize left", manipulators: abletonRule("comma", [{key_code: "left_arrow", modifiers:["shift"]}]) },
  { description: "ableton: resize right", manipulators: abletonRule("period", [{key_code: "right_arrow", modifiers:["shift"]}]) },
  { description: "ableton: set clip start marker", manipulators: abletonRule("5", toCmdHotkey("f9")) },
  { description: "ableton: set clip loop start", manipulators: abletonRule("6", toCmdHotkey("f10")) },
  { description: "ableton: set clip loop end", manipulators: abletonRule("7", toCmdHotkey("f11")) },
  { description: "ableton: set clip end marker", manipulators: abletonRule("8", toCmdHotkey("f12")) },
  { description: "ableton: scale", manipulators: abletonRule("9", toShiftHotkey("f")) },
  { description: "ableton: fold", manipulators: abletonRule("0", toShiftHotkey("g")) },
];

fs.writeFileSync(
  "karabiner.json",
  JSON.stringify(
    {
      global: {
        show_in_menu_bar: true,
      },
      profiles: [
        {
          name: "Default profile",
          complex_modifications: {
            rules,
          },
          ...globals,
        },
      ],
    },
    null,
    2
  )
);
