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
            "product_id": 20518,
            "vendor_id": 12625
        },
        "simple_modifications": [
            {
                "from": { "key_code": "escape" },
                "to": [{ "key_code": "grave_accent_and_tilde" }]
            }
        ]
    },
    {
        "identifiers": {
            "is_keyboard": true,
            "product_id": 20519,
            "vendor_id": 12625
        },
        "ignore": false,
        "simple_modifications": [
            {
                "from": { "key_code": "escape" },
                "to": [{ "key_code": "grave_accent_and_tilde" }]
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
    },
    {
        "identifiers": {
            "is_keyboard": true,
            "is_pointing_device": true,
            "product_id": 20565,
            "vendor_id": 12815
        },
        "ignore": false,
        "manipulate_caps_lock_led": false,
        "simple_modifications": []
    },
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
