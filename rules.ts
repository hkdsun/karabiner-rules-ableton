import fs from "fs";
import { KarabinerRules, Manipulator, Modifiers } from "./types";
import { globals } from "./globals";
import { abletonRules } from "./ableton";
import { biduleRules } from "./bidule";
import { globalNumpadRules } from "./numpad";


const hyperKey: Manipulator[] = [{
    type: "basic",
    from: {
      key_code: "right_command",
      modifiers: { mandatory: []},
    },
    to: [{ key_code: "left_command", modifiers: ["left_control", "left_option"] }],
}]

const rules: KarabinerRules[] = [
  { description: "hyper key",  manipulators: hyperKey },
  ...biduleRules,
  ...globalNumpadRules,
  ...abletonRules,
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
