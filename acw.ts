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


export function abletonHoldTypingMode(): Manipulator[] {
  return [{
    type: "basic",
    from: {
      key_code: "left_shift",
    },
    to: [
      ...activateTypingMode,
      { key_code: "left_shift" },
    ], 
    to_after_key_up: [
      ...deactivateTypingMode,
    ],
    conditions: [
      {
        type: "frontmost_application_if",
        bundle_identifiers: ["com.ableton.live"],
      },
    ],
  }]
}

export function abletonToggleTypingMode(): Manipulator[] {
  return [{
    type: "basic",
    from: {
      key_code: "left_control",
    },
    conditions: [
      {
        type: "frontmost_application_if",
        bundle_identifiers: ["com.ableton.live"],
      },
      {
        type: "variable_if",
        name: "ableton_typing_mode",
        value: 0,
      }
    ],
    to_if_alone: [
      ...activateTypingMode,
    ],
  },
  {
    type: "basic",
    from: {
      key_code: "left_control",
    },
    conditions: [
      {
        type: "frontmost_application_if",
        bundle_identifiers: ["com.ableton.live"],
      },
      {
        type: "variable_if",
        name: "ableton_typing_mode",
        value: 1,
      }
    ],
    to_if_alone: [
      ...deactivateTypingMode,
    ],
  }]
}


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

export function abletonRule(key_code: KeyCode, to: To[], modifiers: Modifiers = {}, bypass_typing_mode = false): Manipulator[] {
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

export function toIfAlone(key_code: KeyCode, to: To[], extra_conditions: Conditions[] = []): Manipulator[] {
}

export function doubleTap(
  key_code: KeyCode,
  to: To[],
  extra_conditions: Conditions[] = [],
  delay = 200
): Manipulator[] {
  const variable_if = `double_tap_${key_code}`;
  const secondPress: Manipulator = {
    type: "basic",
    from: {
      key_code,
      modifiers: {
        mandatory: [],
      },
    },
    to: to,
    parameters: {
      "basic.to_delayed_action_delay_milliseconds": delay,
    },
    conditions:
      [
        {
          type: "variable_if",
          name: variable_if,
          value: 1,
        },
        ...extra_conditions,
      ],
  }
  const firstPress: Manipulator = {
    type: "basic",
    conditions: extra_conditions,
    from: {
      key_code,
      modifiers: {
        mandatory: [],
      },
    },
    to: [
      {
        set_variable: {
          name: variable_if,
          value: 1,
        },
      },
    ],
    to_delayed_action: {
      to_if_invoked: [
        {
          set_variable: {
            name: variable_if,
            value: 0,
          },
        },
      ],
      to_if_canceled: [
        {
          set_variable: {
            name: variable_if,
            value: 0,
          },
        },
      ],
    },
  };
  return [secondPress,firstPress];
}

export const globals = {
  "devices": [
    {
        "identifiers": {
            "is_keyboard": true,
            "product_id": 26,
            "vendor_id": 9494
        },
        "manipulate_caps_lock_led": false,
        "simple_modifications": [
            {
                "from": { "key_code": "left_command" },
                "to": [{ "key_code": "left_option" }]
            },
            {
                "from": { "key_code": "left_option" },
                "to": [{ "key_code": "left_command" }]
            },
            {
                "from": { "key_code": "right_option" },
                "to": [{ "key_code": "right_command" }]
            }
        ]
    },
    {
        "identifiers": {
            "is_keyboard": true,
            "product_id": 24577,
            "vendor_id": 1204
        },
        "manipulate_caps_lock_led": false,
        "simple_modifications": [
            {
                "from": { "key_code": "left_command" },
                "to": [{ "key_code": "left_option" }]
            },
            {
                "from": { "key_code": "left_option" },
                "to": [{ "key_code": "left_command" }]
            },
            {
                "from": { "key_code": "right_option" },
                "to": [{ "key_code": "right_command" }]
            }
        ]
    },
    {
        "identifiers": {
            "is_keyboard": true,
            "is_pointing_device": true,
            "product_id": 24577,
            "vendor_id": 1204
        },
        "ignore": false,
        "manipulate_caps_lock_led": false,
        "simple_modifications": [
            {
                "from": { "key_code": "left_command" },
                "to": [{ "key_code": "left_option" }]
            },
            {
                "from": { "key_code": "left_option" },
                "to": [{ "key_code": "left_command" }]
            },
            {
                "from": { "key_code": "right_option" },
                "to": [{ "key_code": "right_command" }]
            }
        ]
    },
    {
        "identifiers": {
            "is_keyboard": true,
            "product_id": 50475,
            "vendor_id": 1133
        },
        "manipulate_caps_lock_led": false
    },
    {
        "identifiers": {
            "is_keyboard": true,
            "product_id": 24577,
            "vendor_id": 1204
        },
        "manipulate_caps_lock_led": false
    },
    {
        "identifiers": {
            "is_keyboard": true,
            "is_pointing_device": true,
            "product_id": 24577,
            "vendor_id": 1204
        },
        "ignore": false,
        "manipulate_caps_lock_led": false
    },
    {
        "identifiers": {
            "is_keyboard": true,
            "product_id": 4137,
            "vendor_id": 39658
        },
        "simple_modifications": [
            {
                "from": { "key_code": "escape" },
                "to": [{ "key_code": "grave_accent_and_tilde" }]
            },
            {
                "from": { "key_code": "home" },
                "to": [{ "key_code": "delete_forward" }]
            },
            {
                "from": { "key_code": "delete_forward" },
                "to": [{ "key_code": "home" }]
            },
            {
                "from": { "key_code": "left_command" },
                "to": [{ "key_code": "left_option" }]
            },
            {
                "from": { "key_code": "left_option" },
                "to": [{ "key_code": "left_command" }]
            },
            {
                "from": { "key_code": "right_option" },
                "to": [{ "key_code": "right_command" }]
            }
        ]
    },
    {
        "identifiers": {
            "is_keyboard": true,
            "product_id": 592,
            "vendor_id": 1452
        },
        "ignore": true
    },
    {
        "identifiers": {
            "is_keyboard": true,
            "product_id": 6,
            "vendor_id": 27129
        },
        "ignore": true
    }
  ],
  "fn_function_keys": [
      {
          "from": { "key_code": "f1" },
          "to": [{ "key_code": "display_brightness_decrement" }]
      },
      {
          "from": { "key_code": "f2" },
          "to": [{ "key_code": "display_brightness_increment" }]
      },
      {
          "from": { "key_code": "f3" },
          "to": [{ "key_code": "mission_control" }]
      },
      {
          "from": { "key_code": "f4" },
          "to": [{ "key_code": "launchpad" }]
      },
      {
          "from": { "key_code": "f5" },
          "to": [{ "key_code": "illumination_decrement" }]
      },
      {
          "from": { "key_code": "f6" },
          "to": [{ "key_code": "illumination_increment" }]
      },
      {
          "from": { "key_code": "f7" },
          "to": [{ "key_code": "rewind" }]
      },
      {
          "from": { "key_code": "f8" },
          "to": [{ "key_code": "play_or_pause" }]
      },
      {
          "from": { "key_code": "f9" },
          "to": [{ "key_code": "fastforward" }]
      },
      {
          "from": { "key_code": "f10" },
          "to": [{ "key_code": "mute" }]
      },
      {
          "from": { "key_code": "f11" },
          "to": [{ "key_code": "volume_decrement" }]
      },
      {
          "from": { "key_code": "f12" },
          "to": [{ "key_code": "volume_increment" }]
      }
  ],
  "one_to_many_mappings": { "right_command": ["left_control", "left_option", "left_command"] },
  "selected": true,
  "simple_modifications": [
      {
          "from": { "key_code": "caps_lock" },
          "to": [{ "key_code": "escape" }]
      }
  ],
  "virtual_hid_keyboard": {
      "caps_lock_delay_milliseconds": 0,
      "keyboard_type": "ansi",
      "keyboard_type_v2": "ansi",
      "standalone_keys_delay_milliseconds": 0
  }
};
