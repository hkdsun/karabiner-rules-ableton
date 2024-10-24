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
  { set_variable: { name: "ableton_typing_mode", value: 1 } },
])

const abletonSearchEnd = abletonRule("backslash", [
  ...toAbletonHotkey("5"),
  { set_variable: { name: "ableton_typing_mode", value: 0 } },
], {}, true)


const rules: KarabinerRules[] = [
  { description: "hyper key",  manipulators: hyperKeyRule() },
  { description: "ableton: right_control to ableton prefix", manipulators: abletonRule("right_control", [{ key_code: "left_command", modifiers: ["left_option"] }], {}, true)},
  { description: "ableton: typing mode hold (shift)", manipulators: abletonHoldTypingMode()},
  { description: "ableton: typing mode toggle (control)", manipulators: abletonToggleTypingMode()},
  { description: "ableton: search", manipulators: abletonSearch },
  { description: "ableton: end search / toggle browser", manipulators: abletonSearchEnd },
  { description: "ableton: split", manipulators: abletonRule("e", toCmdHotkey("e")) },
  { description: "ableton: clip", manipulators: abletonRule("open_bracket", toAbletonHotkey("3")) },
  { description: "ableton: fullclip", manipulators: abletonRule("quote", toAbletonHotkey("e")) },
  { description: "ableton: device", manipulators: abletonRule("close_bracket", toAbletonHotkey("4")) },
  { description: "ableton: mixer", manipulators: abletonRule("equal_sign", toAbletonHotkey("m")) },
  { description: "ableton: plugin", manipulators: abletonRule("page_up", toAbletonHotkey("p")) },
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
  { description: "ableton: create midi clip", manipulators: abletonRule("m", toCmdShiftHotkey("m")) },
  { description: "ableton: resize left", manipulators: abletonRule("comma", [{key_code: "left_arrow", modifiers:["shift"]}]) },
  { description: "ableton: resize right", manipulators: abletonRule("period", [{key_code: "right_arrow", modifiers:["shift"]}]) },
  { description: "ableton: set clip start marker", manipulators: abletonRule("5", toCmdHotkey("f9")) },
  { description: "ableton: set clip loop start", manipulators: abletonRule("6", toCmdHotkey("f10")) },
  { description: "ableton: set clip loop end", manipulators: abletonRule("7", toCmdHotkey("f11")) },
  { description: "ableton: set clip end marker", manipulators: abletonRule("8", toCmdHotkey("f12")) },
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
