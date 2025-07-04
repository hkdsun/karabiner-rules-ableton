import fs from "fs";
import { KarabinerRules, Manipulator, Modifiers } from "./types";
import { globals } from "./globals";
import { abletonRules } from "./ableton";
import { biduleRules } from "./bidule";
import { globalNumpadRules } from "./numpad";
import { totalmixRules } from "./totalmix";
import { swinsianRules } from "./swinsian";
import { renoiseRules } from "./renoise";

const hyperKey: Manipulator[] = [{
    type: "basic",
    from: {
      key_code: "right_command",
      modifiers: { mandatory: []},
    },
    to: [{ key_code: "left_command", modifiers: ["left_control", "left_option"] }],
}]

const superHyperKey: Manipulator[] = [{
    type: "basic",
    from: {
      key_code: "right_command",
      modifiers: { mandatory: ["left_shift"]},
    },
    to: [{ key_code: "left_command", modifiers: ["left_control", "left_option", "left_shift"] }],
}]

const rules: KarabinerRules[] = [
  { description: "hyper key",  manipulators: hyperKey },
  { description: "super hyper key",  manipulators: superHyperKey },
  ...biduleRules,
  ...globalNumpadRules,
  ...abletonRules,
  ...totalmixRules,
  ...renoiseRules,
  ...swinsianRules,
];

fs.writeFileSync(
  "karabiner.json",
  JSON.stringify(
    {
      global: {
        show_in_menu_bar: true,
      },
      profiles: [
        {
          name: "Default profile",
          complex_modifications: {
            rules,
          },
          ...globals,
        },
      ],
    },
    null,
    2
  )
);
