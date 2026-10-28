import { KarabinerRules, KeyCode, To, Modifiers, ConsumerKeyCode } from './types';
import { toPassThroughHotKey, toCmdHotkey, toCmdShiftHotkey } from './acw';
import { numpadAppRule, numpadAppManipulators, consumerKeyAppRule } from './numpad';

const photoshopBundleIds = ["com.adobe.Photoshop"]

function numpadPhotoshopRule(key_code: KeyCode, to: To[], modifiers: Modifiers = {}): KarabinerRules {
  return numpadAppRule("photoshop", photoshopBundleIds, key_code, to, modifiers)
}

function photoshopConsumerKeyRule(key_code: ConsumerKeyCode, to: To[], modifiers: Modifiers = { mandatory: [] }): KarabinerRules {
  return consumerKeyAppRule("photoshop", photoshopBundleIds, key_code, to, modifiers)
}

// Photoshop's default tool shortcuts. Tools pass through as plain held keys,
// so holding a numpad key gives the spring-loaded tool (release to switch back).
const photoshopTool: { [tool: string]: KeyCode } = {
  lasso: "l",
  brush: "b",
  eraser: "e",
  spotHealing: "j",
  cloneStamp: "s",
  pen: "p",
  swapColors: "x",
  hand: "spacebar",
  brushSmaller: "open_bracket",
  brushBigger: "close_bracket",
}

// Tap a tool key to pick its tool (hold it for the spring-loaded version). Tap it
// again within doubleTapDelayMs to cycle to the next tool in its group (Shift+key,
// Photoshop's default with "Use Shift Key for Tool Switch" on); keep tapping to keep cycling.
const doubleTapDelayMs = 300

function numpadPhotoshopToolRule(key_code: KeyCode, tool: KeyCode): KarabinerRules {
  const tapped = "photoshop_numpad_tapped_" + key_code
  const resetTapped: To[] = [{ set_variable: { name: tapped, value: 0 } }]
  const cycle = numpadAppManipulators(photoshopBundleIds, key_code, [{ key_code: tool, modifiers: ["left_shift"] }])
  const select = numpadAppManipulators(photoshopBundleIds, key_code, [{ set_variable: { name: tapped, value: 1 } }, { key_code: tool }])

  for (const manipulator of [...cycle, ...select]) {
    manipulator.to_delayed_action = { to_if_invoked: resetTapped, to_if_canceled: resetTapped }
    manipulator.parameters = { "basic.to_delayed_action_delay_milliseconds": doubleTapDelayMs }
  }
  for (const manipulator of cycle) {
    manipulator.conditions?.push({ type: "variable_if", name: tapped, value: 1 })
  }

  return {
    description: "numpad photoshop tool: " + key_code,
    manipulators: [...cycle, ...select],
  }
}

export const photoshopRules: KarabinerRules[] = [
  // Scrubbing row resizes the brush
  photoshopConsumerKeyRule("volume_decrement", toPassThroughHotKey(photoshopTool.brushSmaller)) ,
  photoshopConsumerKeyRule("volume_increment", toPassThroughHotKey(photoshopTool.brushBigger)) ,

  // Top row: history + zoom
  numpadPhotoshopRule("keypad_num_lock" , toCmdHotkey("z")) , // undo
  numpadPhotoshopRule("keypad_slash"    , toCmdShiftHotkey("z")) , // redo
  numpadPhotoshopRule("keypad_asterisk" , toCmdHotkey("0")) , // fit on screen
  numpadPhotoshopRule("keypad_hyphen"   , toCmdHotkey("1")) , // 100% zoom
  // Row above home row: selection + painting (double tap cycles the tool group)
  numpadPhotoshopToolRule("keypad_7"    , photoshopTool.lasso) ,
  numpadPhotoshopToolRule("keypad_8"    , photoshopTool.brush) ,
  numpadPhotoshopToolRule("keypad_9"    , photoshopTool.eraser) ,
  // Home row: retouching (double tap cycles, e.g. spot healing -> remove -> healing brush -> patch)
  numpadPhotoshopToolRule("keypad_4"    , photoshopTool.spotHealing) ,
  numpadPhotoshopToolRule("keypad_5"    , photoshopTool.cloneStamp) ,
  numpadPhotoshopToolRule("keypad_6"    , photoshopTool.pen) ,
  // Row below home row: brush size + colors
  numpadPhotoshopRule("keypad_1"        , toPassThroughHotKey(photoshopTool.brushSmaller)) ,
  numpadPhotoshopRule("keypad_2"        , toPassThroughHotKey(photoshopTool.brushBigger)) ,
  numpadPhotoshopRule("keypad_3"        , toPassThroughHotKey(photoshopTool.swapColors)) ,
  // Bottom row
  numpadPhotoshopRule("keypad_0"        , toPassThroughHotKey(photoshopTool.hand)) ,
  numpadPhotoshopRule("keypad_period"   , toPassThroughHotKey("left_command")) , // hold for cmd
  // Big keys
  numpadPhotoshopRule("keypad_plus"     , [{ pointing_button: "button2" }]) , // right click
  numpadPhotoshopRule("keypad_enter"    , toPassThroughHotKey("left_option")) , // hold for alt (clone source, sample, subtract, ...)
]
