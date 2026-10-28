import { KarabinerRules, KeyCode, To, Modifiers, ConsumerKeyCode, Manipulator } from './types';
import { deviceAppRule } from './acw';

// Numpad keys, only while one of the given apps is frontmost
export function numpadAppManipulators(bundle_identifiers: string[], key_code: KeyCode, to: To[], modifiers: Modifiers = {}): Manipulator[] {
  return deviceAppRule(bundle_identifiers, 12815, 20565, key_code, to, modifiers)
}

export function numpadAppRule(name: string, bundle_identifiers: string[], key_code: KeyCode, to: To[], modifiers: Modifiers = {}): KarabinerRules {
  return {
    description: `numpad ${name}: ${key_code}`,
    manipulators: numpadAppManipulators(bundle_identifiers, key_code, to, modifiers),
  }
}

// Consumer keys (e.g. the volume/scrubbing row), only while one of the given apps is frontmost
export function consumerKeyAppRule(name: string, bundle_identifiers: string[], key_code: ConsumerKeyCode, to: To[], modifiers: Modifiers = { mandatory: [] }): KarabinerRules {
  return {
    description: `${name} consumer key: ${key_code}`,
    manipulators: [
      {
        type: "basic",
        from: {
          consumer_key_code: key_code,
          modifiers: modifiers,
        },
        conditions: [
          {
            type: "frontmost_application_if",
            bundle_identifiers: bundle_identifiers,
          },
        ],
        to: to,
      }
    ]
  }
}
