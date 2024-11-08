import { appRule, toHyper, toSuperHyper } from "./acw";

const zoom100 = appRule(["de.rme-audio.TotalmixFX"], "1", toSuperHyper("u"))
const zoom135 = appRule(["de.rme-audio.TotalmixFX"], "2", toSuperHyper("o"))
const hideControlStrip = appRule(["de.rme-audio.TotalmixFX"], "3", toSuperHyper("y"))
const toggleFullscreen = appRule(["de.rme-audio.TotalmixFX"], "4", toHyper("4"))
const switchWindow = appRule(["de.rme-audio.TotalmixFX"], "tab", toSuperHyper("2", false))

export const totalmixRules = [
  { description: "totalmix: 100%", manipulators: zoom100 },
  { description: "totalmix: 135%", manipulators: zoom135 },
  { description: "totalmix: hide control strip", manipulators: hideControlStrip },
  { description: "totalmix: toggle fullscreen", manipulators: toggleFullscreen },
  { description: "totalmix: switch window", manipulators: switchWindow },
]
