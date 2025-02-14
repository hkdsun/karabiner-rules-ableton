import {
  toCmdHotkey,
  toCmdShiftHotkey,
  toPassThroughHotKey,
  toShiftHotkey,
  toAbletonHotkey,
  activateTypingMode,
  deactivateTypingMode,
  toSuperHyper,
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

function abletonDoubleTapRule(key_code: KeyCode, toSingleTap: To[] = [], toDoubleTap: To[] = [], modifiers: Modifiers = {}, delayMs: number = 500, bypass_typing_mode = false): Manipulator[] {
  const modifiersString = modifiers.mandatory ? modifiers.mandatory.join("_") : "";
  const conditionVarName = `double_tap_${key_code}_${modifiersString}`;
  var manipulators: Manipulator[] = [
    {
      type: "basic",
      from: {
        key_code,
        modifiers: modifiers,
      },
      conditions: [
        {
          type: "variable_if",
          name: conditionVarName,
          value: 1
        },
        {
          type: "frontmost_application_if",
          bundle_identifiers: ["com.ableton.live"],
        },
      ],
      to: toDoubleTap,
    },
    {
      type: "basic",
      from: {
        key_code,
        modifiers: modifiers,
      },
      conditions: [
        {
          type: "variable_unless",
          name: conditionVarName,
          value: 1
        },
        {
          type: "frontmost_application_if",
          bundle_identifiers: ["com.ableton.live"],
        },
      ],
      to: [
        {
          set_variable: {
            name: conditionVarName,
            value: 1
          }
        }
      ],
      to_delayed_action: {
        to_if_canceled: [
          {
            set_variable: {
              name: conditionVarName,
              value: 0
            }
          }
        ],
        to_if_invoked: [
          {
            set_variable: {
              name: conditionVarName,
              value: 0
            }
          },
          ...toSingleTap
        ]
      },
      parameters: {
        "basic.to_delayed_action_delay_milliseconds": delayMs
      }
    }
  ];

  if (!bypass_typing_mode) {
    if (manipulators[0].conditions) {
      manipulators[0].conditions.push({
        type: "variable_if",
        name: "ableton_typing_mode",
        value: 0,
      });
    }
    if (manipulators[1].conditions) {
      manipulators[1].conditions.push({
        type: "variable_if",
        name: "ableton_typing_mode",
        value: 0,
      });
    }
  }

  return manipulators;
}


const abletonSearch = abletonRule("t", [
  ...toCmdHotkey("f"),
  ...activateTypingMode,
])

const toHidePanels = [
  ...deactivateTypingMode,
  ...toSuperHyper("w"),
  // ...toAbletonHotkey("p"),
]

const abletonHidePanels = abletonRule("backslash", toHidePanels, {}, true)

const abletonRename = abletonRule("r", [
  ...toCmdHotkey("r"),
  ...activateTypingMode,
], { mandatory: ["left_command"] }, true)

const abletonRenameEnd = abletonRule("return_or_enter", [
  ...deactivateTypingMode,
  { key_code: "return_or_enter" },
], {}, true)

const abletonEscape = abletonDoubleTapRule("escape", [
  { key_code: "escape" },
], [
  ...deactivateTypingMode,
], {}, 200, true)

const abletonCmdF = abletonRule("f", [
  ...toCmdHotkey("f"),
  ...activateTypingMode,
], { mandatory: ["left_command"] }, true)

const abletonCmdSpace = abletonRule("spacebar", [
  ...toCmdHotkey("spacebar"),
  ...activateTypingMode,
], { mandatory: ["left_command"] }, true)

const abletonLetterI = abletonRule("i", [...activateTypingMode])

const abletonCmdS = abletonRule("s", [
  ...toCmdHotkey("s"),
  ...activateTypingMode,
], { mandatory: ["left_command"] }, true)

const abletonCmdShiftS = abletonRule("s", [
  ...toCmdShiftHotkey("s"),
  ...activateTypingMode,
], { mandatory: ["left_command", "left_shift"] }, true)


const abletonRender = abletonRule("r", [
  ...toCmdShiftHotkey("r"),
  ...activateTypingMode,
], { mandatory: ["left_command", "left_shift"] }, true)


const cutRule = abletonDoubleTapRule("q", toCmdHotkey("c"), toCmdHotkey("x"), {}, 200)

const tildaRule = abletonDoubleTapRule("grave_accent_and_tilde", toShiftHotkey("tab"), toAbletonHotkey("b"), {}, 200)

export const abletonRules = [
  { description: "ableton: right_control to ableton prefix", manipulators: abletonRule("right_control", [{ key_code: "left_command", modifiers: ["left_option"] }], {}, true)},
  { description: "ableton: insert (enter typing mode)", manipulators: abletonLetterI},
  { description: "ableton: escape (exits typing mode)", manipulators: abletonEscape},
  { description: "ableton: device/clip", manipulators: tildaRule },
  { description: "ableton: hidePanels (cmd+tilda)", manipulators: abletonRule("grave_accent_and_tilde", toHidePanels, { mandatory: ["shift"] }) },
  { description: "ableton: hide/esc", manipulators: abletonHidePanels },
  { description: "ableton: render", manipulators: abletonRender },
  // { description: "ableton: save", manipulators: abletonCmdS },
  { description: "ableton: save as", manipulators: abletonCmdShiftS },
  { description: "ableton: rename", manipulators: abletonRename },
  { description: "ableton: enter (exits typing mode)", manipulators: abletonRenameEnd },
  { description: "ableton: search", manipulators: abletonSearch },
  { description: "ableton: cmd-f", manipulators: abletonCmdF },
  { description: "ableton: cmd-space", manipulators: abletonCmdSpace },
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
  { description: "ableton: toggle follow", manipulators: abletonRule("f", toPassThroughHotKey("f"), { mandatory: ["shift"]}) },
  { description: "ableton: quantize", manipulators: abletonRule("u", toCmdHotkey("u")) },
  { description: "ableton: undo", manipulators: abletonRule("z", toCmdHotkey("z")) },
  { description: "ableton: null", manipulators: abletonRule("x", toPassThroughHotKey("0")) },
  { description: "ableton: cut and paste", manipulators: cutRule },
  { description: "ableton: paste", manipulators: abletonRule("w", toCmdHotkey("v")) },
  { description: "ableton: returns", manipulators: abletonRule("semicolon", toAbletonHotkey("r")) },
  { description: "ableton: crop", manipulators: abletonRule("c", toCmdShiftHotkey("j")) },
  { description: "ableton: join", manipulators: abletonRule("v", toCmdHotkey("j")) },
  { description: "ableton: loop", manipulators: abletonRule("l", toCmdHotkey("l")) },
  { description: "ableton: arm", manipulators: abletonRule("r", toPassThroughHotKey("c")) },
  { description: "ableton: insert midi clip", manipulators: abletonRule("o", toCmdShiftHotkey("m")) },
  { description: "ableton: new audio track", manipulators: abletonRule("k", toCmdHotkey("t")) },
  { description: "ableton: new midi track", manipulators: abletonRule("k", toCmdShiftHotkey("t"), { mandatory: ["shift"] }) },
  { description: "ableton: resize left", manipulators: abletonRule("comma", [{key_code: "left_arrow", modifiers:["shift"]}]) },
  { description: "ableton: resize right", manipulators: abletonRule("period", [{key_code: "right_arrow", modifiers:["shift"]}]) },
  { description: "ableton: set clip start marker", manipulators: abletonRule("5", toCmdHotkey("f9")) },
  { description: "ableton: set clip loop start", manipulators: abletonRule("6", toCmdHotkey("f10")) },
  { description: "ableton: set clip loop end", manipulators: abletonRule("7", toCmdHotkey("f11")) },
  { description: "ableton: set clip end marker", manipulators: abletonRule("8", toCmdHotkey("f12")) },
  { description: "ableton: fold", manipulators: abletonRule("9", toShiftHotkey("f")) },
  { description: "ableton: scale", manipulators: abletonRule("delete_or_backspace", toCmdShiftHotkey("delete_or_backspace"), { mandatory: ["shift"]}) },
]
