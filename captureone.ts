import { KarabinerRules, KeyCode, To, Modifiers, ConsumerKeyCode } from './types';
import { toPassThroughHotKey, toCmdHotkey } from './acw';
import { numpadAppRule, consumerKeyAppRule } from './numpad';

const captureOneBundleIds = ["com.captureone.captureone16"]

function numpadCaptureOneRule(key_code: KeyCode, to: To[], modifiers: Modifiers = {}): KarabinerRules {
  return numpadAppRule("capture one", captureOneBundleIds, key_code, to, modifiers)
}

function captureOneConsumerKeyRule(key_code: ConsumerKeyCode, to: To[], modifiers: Modifiers = { mandatory: [] }): KarabinerRules {
  return consumerKeyAppRule("capture one", captureOneBundleIds, key_code, to, modifiers)
}

// Capture One's own keyboard shortcuts for the Adjustments tool
// (Capture One > Preferences > Keyboard > Adjustments Tool). Edit here if you
// change a shortcut in Capture One, or look here to see what a numpad key does.
const captureOneAdjustment: { [action: string]: KeyCode } = {
  exposure: "q",
  contrast: "w",
  brightness: "e",
  saturation: "r",
  highlight: "a",
  shadow: "s",
  white: "d",
  black: "f",
  kelvin: "1",
  tint: "2",
  dehaze: "b",
  clarity: "z",
  structure: "m",
  sharpening: "g",
  rgbHighlight: "v",
  rgbShadow: "x",
  rgbMidtone: "c",
  vignetting: "n",
}

export const captureOneRules: KarabinerRules[] = [
  // Scrubbing row navigates the photo selection
  captureOneConsumerKeyRule("volume_decrement", toCmdHotkey("left_arrow")) , // previous photo
  captureOneConsumerKeyRule("volume_increment", toCmdHotkey("right_arrow")) , // next photo

  // Speed editing (hold numpad key, drag mouse to adjust)
  // Big keys: the two most-used adjustments
  numpadCaptureOneRule("keypad_enter"    , toPassThroughHotKey(captureOneAdjustment.exposure)) ,
  numpadCaptureOneRule("keypad_plus"     , toPassThroughHotKey(captureOneAdjustment.contrast)) ,
  // Home row: HDR recovery (top half)
  numpadCaptureOneRule("keypad_4"        , toPassThroughHotKey(captureOneAdjustment.highlight)) ,
  numpadCaptureOneRule("keypad_5"        , toPassThroughHotKey(captureOneAdjustment.shadow)) ,
  numpadCaptureOneRule("keypad_6"        , toPassThroughHotKey(captureOneAdjustment.white)) ,
  // Row above home row: HDR recovery (bottom half) + remaining basic adjustments
  numpadCaptureOneRule("keypad_7"        , toPassThroughHotKey(captureOneAdjustment.black)) ,
  numpadCaptureOneRule("keypad_8"        , toPassThroughHotKey(captureOneAdjustment.brightness)) ,
  numpadCaptureOneRule("keypad_9"        , toPassThroughHotKey(captureOneAdjustment.saturation)) ,
  // Row below home row: creative/look adjustments
  numpadCaptureOneRule("keypad_1"        , toPassThroughHotKey(captureOneAdjustment.clarity)) ,
  numpadCaptureOneRule("keypad_2"        , toPassThroughHotKey(captureOneAdjustment.dehaze)) ,
  numpadCaptureOneRule("keypad_3"        , toPassThroughHotKey(captureOneAdjustment.vignetting)) ,
  // Bottom row: White balance
  numpadCaptureOneRule("keypad_0"        , toPassThroughHotKey(captureOneAdjustment.kelvin)) ,
  numpadCaptureOneRule("keypad_period"   , toPassThroughHotKey(captureOneAdjustment.tint)) ,
  // Top row: RGB levels (fine, less frequent adjustments)
  numpadCaptureOneRule("keypad_num_lock" , toPassThroughHotKey(captureOneAdjustment.rgbHighlight)) ,
  numpadCaptureOneRule("keypad_slash"    , toPassThroughHotKey(captureOneAdjustment.rgbShadow)) ,
  numpadCaptureOneRule("keypad_asterisk" , toPassThroughHotKey(captureOneAdjustment.rgbMidtone)) ,
  numpadCaptureOneRule("keypad_hyphen"   , toPassThroughHotKey(captureOneAdjustment.sharpening)) ,
]
