import {
  toCmdHotkey,
  toCmdShiftHotkey,
  toPassThroughHotKey,
  toShiftHotkey,
  toAbletonHotkey,
  activateTypingMode,
  deactivateTypingMode,
} from "./acw"
import { KeyCode, Conditions, To, Manipulator, Modifiers } from "./types";


function abletonRule(key_code: KeyCode, to: To[], modifiers: Modifiers = {}, bypass_typing_mode = false): Manipulator[] {
  var conditions: Conditions[] = [
    {
      type: "frontmost_application_if",
      bundle_identifiers: ["com.ableton.live"],
    },
  ];
  if (!bypass_typing_mode) {
    conditions.push({
      type: "variable_if",
      name: "ableton_typing_mode",
      value: 0,
    });
  }

  var fromModifiers: Modifiers = { mandatory: [] };
  if (modifiers.optional) {
    fromModifiers.optional = modifiers.optional;
  }
  if (modifiers.mandatory) {
    fromModifiers.mandatory = modifiers.mandatory;
  }

  return [
    {
      type: "basic",
      from: {
        key_code,
        modifiers: fromModifiers
      },
      conditions: conditions,
      to: to,
    }
  ];
}



const abletonSearch = abletonRule("t", [
  ...toCmdHotkey("f"),
  ...activateTypingMode,
])

const abletonBrowserToggle = abletonRule("backslash", [
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
  // ...toAbletonHotkey("5"),
], {}, true)

const abletonCmdF = abletonRule("f", [
  ...toCmdHotkey("f"),
  ...activateTypingMode,
], { mandatory: ["left_command"] }, true)

const abletonLeftControl = abletonRule("left_control", [
  ...deactivateTypingMode,
  { key_code: "left_control" },
  ...toAbletonHotkey("5"),
], {}, true)

const abletonLetterI = abletonRule("i", [...activateTypingMode])

export const abletonRules = [
  { description: "ableton: right_control to ableton prefix", manipulators: abletonRule("right_control", [{ key_code: "left_command", modifiers: ["left_option"] }], {}, true)},
  { description: "ableton: insert (enter typing mode)", manipulators: abletonLetterI},
  { description: "ableton: control (exits typing mode)", manipulators: abletonLeftControl},
  { description: "ableton: escape (exits typing mode)", manipulators: abletonEscape},
  { description: "ableton: rename", manipulators: abletonRename },
  { description: "ableton: enter (exits typing mode)", manipulators: abletonRenameEnd },
  { description: "ableton: search", manipulators: abletonSearch },
  { description: "ableton: cmd-f", manipulators: abletonCmdF },
  { description: "ableton: end search / toggle browser", manipulators: abletonBrowserToggle },
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
  { description: "ableton: returns", manipulators: abletonRule("semicolon", toAbletonHotkey("r")) },
  { description: "ableton: inputs", manipulators: abletonRule("w", toAbletonHotkey("i")) },
  { description: "ableton: crop", manipulators: abletonRule("c", toCmdShiftHotkey("j")) },
  { description: "ableton: join", manipulators: abletonRule("v", toCmdHotkey("j")) },
  { description: "ableton: loop", manipulators: abletonRule("l", toCmdHotkey("l")) },
  { description: "ableton: arm", manipulators: abletonRule("r", toPassThroughHotKey("c")) },
  { description: "ableton: insert midi clip", manipulators: abletonRule("o", toCmdShiftHotkey("m")) },
  { description: "ableton: new audio track", manipulators: abletonRule("k", toCmdHotkey("t")) },
  { description: "ableton: new midi track", manipulators: abletonRule("k", toCmdShiftHotkey("t"), { mandatory: ["command"] }) },
  { description: "ableton: resize left", manipulators: abletonRule("comma", [{key_code: "left_arrow", modifiers:["shift"]}]) },
  { description: "ableton: resize right", manipulators: abletonRule("period", [{key_code: "right_arrow", modifiers:["shift"]}]) },
  { description: "ableton: set clip start marker", manipulators: abletonRule("5", toCmdHotkey("f9")) },
  { description: "ableton: set clip loop start", manipulators: abletonRule("6", toCmdHotkey("f10")) },
  { description: "ableton: set clip loop end", manipulators: abletonRule("7", toCmdHotkey("f11")) },
  { description: "ableton: set clip end marker", manipulators: abletonRule("8", toCmdHotkey("f12")) },
  { description: "ableton: fold", manipulators: abletonRule("9", toShiftHotkey("f")) },
  // { description: "ableton: scale", manipulators: abletonRule("0", toShiftHotkey("g")) },
]
