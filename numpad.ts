import { KarabinerRules, KeyCode, To, Modifiers, ConsumerKeyCode, Conditions } from './types';
import { deactivateTypingMode, deviceAppRule, deviceRule, toAbletonHotkey, toShiftHotkey, toCombo, toHyper, toSuperHyper, toPassThroughHotKey } from './acw';

// deviceRule(vendor_id: number, product_id: number, key_code: KeyCode, to: To[], modifiers: Modifiers = {}):
function numpadRule(key_code: KeyCode, to: To[], modifiers: Modifiers = {}): KarabinerRules {
  return {
    description: "numpad: " + key_code,
    manipulators: deviceRule(12815, 20565, key_code, to, modifiers),
  }
}

function numpadAbletonRule(key_code: KeyCode, to: To[], modifiers: Modifiers = {}): KarabinerRules {
  return {
    description: "numpad ableton: " + key_code,
    manipulators: deviceAppRule(["com.ableton.live"], 12815, 20565, key_code, to, modifiers),
  }
}

function consumerKeyRule(key_code: ConsumerKeyCode, to: To[], modifiers: Modifiers = { mandatory: [] }, conditions: Conditions[] = []): KarabinerRules {
  return {
    description: "ableton consumer key: " + key_code,
    manipulators: [
      {
        type: "basic",
        from: {
          consumer_key_code: key_code,
          modifiers: modifiers,
        },
        conditions: conditions,
        to: to,
      }
    ]
  }
}

function abletonConsumerKeyRule(key_code: ConsumerKeyCode, to: To[], modifiers: Modifiers = { mandatory: [] }): KarabinerRules {
  return consumerKeyRule(key_code, to, modifiers, [
    {
      type: "frontmost_application_if",
      bundle_identifiers: ["com.ableton.live"],
    },
  ])
}


const passThrough: To[] = [{ key_code: "escape" }]
const closeWindow: To[] = [{ key_code: "w", modifiers: ["left_command"] }]
const spaceLeft: To[] = [{ key_code: "left_arrow", modifiers: ["left_control"] }]
const spaceRight: To[] = [{ key_code: "right_arrow", modifiers: ["left_control"] }]
const toMissionControl: To[] = [{ key_code: "up_arrow", modifiers: ["left_control"] }]

export const globalNumpadRules: KarabinerRules[] = [
  // Ableton hotkeys
  numpadAbletonRule("keypad_hyphen"      , toCombo([toSuperHyper('w'), deactivateTypingMode])), // hide all panels
  numpadAbletonRule("keypad_asterisk"    , toAbletonHotkey("r")) ,
  numpadAbletonRule("keypad_slash"       , toAbletonHotkey("i")) ,
  numpadAbletonRule("keypad_num_lock"    , toAbletonHotkey("s")) ,
  numpadAbletonRule("keypad_plus"        , toShiftHotkey("tab")),
  numpadAbletonRule("keypad_enter"       , toAbletonHotkey("b")) , // toggle browser

  // scrubbing row
  consumerKeyRule("volume_decrement", toSuperHyper("e")) ,
  consumerKeyRule("volume_increment", toSuperHyper("t")) ,
  consumerKeyRule("mute", toSuperHyper("r")) ,
  numpadRule("tab"           , toSuperHyper("s")) ,
  numpadRule("delete_forward", toSuperHyper("a")) ,
  numpadRule("delete_or_backspace", toSuperHyper("a")) ,

  // Regular hotkeys
  numpadRule("keypad_0"                  , toSuperHyper("2", false)) , // bounce window
  numpadRule("keypad_period"             , toSuperHyper("2")) , // bounce mouse
  numpadRule("keypad_4"                  , spaceLeft)   , // navigate spaces left
  numpadRule("keypad_5"                  , toHyper("4")) , // fullscreen toggle
  numpadRule("keypad_6"                  , spaceRight)  , // navigate spaces right
  numpadRule("keypad_1"                  , toHyper("h")), // snap left
  numpadRule("keypad_2"                  , toHyper("1")), // maximize
  numpadRule("keypad_3"                  , toHyper("l")), // snap right
  numpadRule("keypad_7"                  , toHyper("5")), // focus secondary screen (left)
  numpadRule("keypad_8"                  , toHyper("u")), // bounce window
  numpadRule("keypad_9"                  , toHyper("6")), // focus primary screen (right)
  numpadRule("keypad_hyphen"             , closeWindow) , // close window
  numpadRule("keypad_enter"              , toMissionControl) , // mission control
  numpadRule("keypad_plus"               , toHyper("4")), // fullscreen toggle
  numpadRule("equal_sign"                , passThrough) ,
  numpadRule("escape"                    , passThrough) ,
  numpadRule("delete_or_backspace"       , passThrough) ,
  numpadRule("comma"                     , passThrough) ,
  numpadRule("al_calculator"             , passThrough) ,
  numpadRule("5"                         , passThrough  , { mandatory: ["left_shift"] }) ,
  numpadRule("0"                         , passThrough  , { mandatory: ["left_shift"] }) ,
  numpadRule("9"                         , passThrough  , { mandatory: ["left_shift"] }) ,
]
