import { Key } from "readline";
import { To, KeyCode, Conditions, Manipulator, KarabinerRules, Modifiers } from "./types";

export const activateTypingMode: To[] = [
  { set_variable: { name: "ableton_typing_mode", value: 1 } },
  { key_code: "7", modifiers: ["left_command", "left_option", "left_control"] },
];

export const deactivateTypingMode: To[] = [
  { set_variable: { name: "ableton_typing_mode", value: 0 } },
  { key_code: "8", modifiers: ["left_command", "left_option", "left_control"] },
];

export function toAbletonHotkey(key_code: KeyCode): To[] {
  return [
    {
      key_code,
      modifiers: ["left_command", "left_option"],
    },
  ];
}

export function toCmdHotkey(key_code: KeyCode): To[] {
  return [
    {
      key_code,
      modifiers: ["left_command"],
    },
  ];
}

export function toCmdAltHotkey(key_code: KeyCode): To[] {
  return [
    {
      key_code,
      modifiers: ["left_command", "left_option"],
    },
  ];
}

export function toCmdShiftHotkey(key_code: KeyCode): To[] {
  return [
    {
      key_code,
      modifiers: ["left_command", "left_shift"],
    },
  ];
}

export function toShiftHotkey(key_code: KeyCode): To[] {
  return [
    {
      key_code,
      modifiers: ["left_shift"],
    },
  ];
}

export function toPassThroughHotKey(key_code: KeyCode): To[] {
  return [
    {
      key_code,
    },
  ];
}


export function toHyper(key_code: KeyCode): To[] {
  return [{ key_code, modifiers: ["left_control", "left_option", "left_command"] }]
}

export function toSuperHyper(key_code: KeyCode, repeat?: boolean): To[] {
  return [{ key_code, modifiers: ["left_control", "left_option", "left_command", "left_shift"], repeat: repeat ?? true },]
}

export function toCombo(arg0: To[][]): To[] {
  return arg0.flat()
}

export function appRule(bundle_identifiers: string[], key_code: KeyCode, to: To[], modifiers: Modifiers = {}): Manipulator[] {
  var conditions: Conditions[] = [
    {
      type: "frontmost_application_if",
      bundle_identifiers: bundle_identifiers,
    },
  ];

  return [
    {
      type: "basic",
      from: {
        key_code,
        modifiers: modifiers,
      },
      conditions: conditions,
      to: to,
    }
  ];
}

export function deviceRule(vendor_id: number, product_id: number, key_code: KeyCode, to: To[], modifiers: Modifiers = {}): Manipulator[] {
  var conditions: Conditions[] = [
    {
      type: "device_if",
      identifiers: [{
        vendor_id: vendor_id,
        product_id: product_id,
      }],
    },
  ];

  return [
    {
      type: "basic",
      from: {
        key_code,
        modifiers: modifiers,
      },
      conditions: conditions,
      to: to,
    }
  ];
}

export function deviceAppRule(bundle_identifiers: string[], vendor_id: number, product_id: number, key_code: KeyCode, to: To[], modifiers: Modifiers = {}): Manipulator[] {
  var conditions: Conditions[] = [
    {
      type: "frontmost_application_if",
      bundle_identifiers: bundle_identifiers,
    },
    {
      type: "device_if",
      identifiers: [{
        vendor_id: vendor_id,
        product_id: product_id,
      }],
    },
  ];

  return [
    {
      type: "basic",
      from: {
        key_code,
        modifiers: modifiers,
      },
      conditions: conditions,
      to: to,
    }
  ];
}
