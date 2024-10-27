import { KarabinerRules, KeyCode, To, Modifiers } from './types';
import { deviceRule } from './acw';

// deviceRule(vendor_id: number, product_id: number, key_code: KeyCode, to: To[], modifiers: Modifiers = {}):
function numpadRule(key_code: KeyCode, to: To[], modifiers: Modifiers = {}): KarabinerRules {
  return {
    description: "numpad: " + key_code,
    manipulators: deviceRule(14, 13330, key_code, to, modifiers),
  }
}

export const globalNumpadRules: KarabinerRules[] = [
  numpadRule("keypad_4", [{ key_code: "escape" }]),
  numpadRule("keypad_6", [{ key_code: "escape" }]),
  numpadRule("keypad_8", [{ key_code: "escape" }]),
  numpadRule("keypad_2", [{ key_code: "escape" }]),
  numpadRule("keypad_7", [{ key_code: "escape" }]),
  numpadRule("keypad_1", [{ key_code: "escape" }]),
  numpadRule("keypad_9", [{ key_code: "escape" }]),
  numpadRule("keypad_3", [{ key_code: "escape" }]),
  numpadRule("keypad_5", [{ key_code: "escape" }]),
]
