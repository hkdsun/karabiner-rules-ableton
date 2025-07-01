import { Manipulator } from "./types";

// Helper to generate rules for each number key
function renoiseNumberRule(numKey: string, numpadKey: string, fKey: string) {
  // With right_shift + right_alt: number key -> numpad key
  const toNumpad: Manipulator = {
    type: "basic",
    from: {
      key_code: numKey as any,
      modifiers: { mandatory: ["right_shift", "right_option"] },
    },
    to: [{ key_code: numpadKey as any, modifiers: ["right_shift", "right_option"] }],
    conditions: [
      {
        type: "frontmost_application_if",
        bundle_identifiers: ["com.renoise.renoise"],
      },
    ],
  };

  // With right_shift: number key -> number key (with right_shift)
  const toNumber: Manipulator = {
    type: "basic",
    from: {
      key_code: numKey as any,
      modifiers: { mandatory: ["right_shift"] },
    },
    to: [{ key_code: numKey as any, modifiers: [] }],
    conditions: [
      {
        type: "frontmost_application_if",
        bundle_identifiers: ["com.renoise.renoise"],
      },
    ],
  };

  // Default: number key -> F key (no right_shift)
  const toFKey: Manipulator = {
    type: "basic",
    from: {
      key_code: numKey as any,
      modifiers: { optional: ["any"] },
    },
    to: [{ key_code: fKey as any }],
    conditions: [
      {
        type: "frontmost_application_if",
        bundle_identifiers: ["com.renoise.renoise"],
      },
    ],
  };

  return [toNumpad, toNumber, toFKey];
}

const numberToNumpadAndFKey = [
  { num: "1", pad: "keypad_1", f: "f1" },
  { num: "2", pad: "keypad_2", f: "f2" },
  { num: "3", pad: "keypad_3", f: "f3" },
  { num: "4", pad: "keypad_4", f: "f4" },
  { num: "5", pad: "keypad_5", f: "f9" },
  { num: "6", pad: "keypad_6", f: "f10" },
  { num: "7", pad: "keypad_7", f: "f11" },
  { num: "8", pad: "keypad_8", f: "f12" },
  { num: "9", pad: "keypad_9", f: "f13" },
  { num: "0", pad: "keypad_0", f: "f14" },
];

export const renoiseRules = numberToNumpadAndFKey.map(({ num, pad, f }) => ({
  description: `renoise: ${num} to ${f} (default), right_shift for ${num}, right_shift+right_alt for ${pad}`,
  manipulators: renoiseNumberRule(num, pad, f),
}));
