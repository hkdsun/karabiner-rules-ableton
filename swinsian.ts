import { appRule, toCmdAltHotkey, toHyper, toSuperHyper } from "./acw";

const stepForwards = appRule(["com.swinsian.Swinsian"], "page_down", toCmdAltHotkey("right_arrow"), {})
const stepBackwards = appRule(["com.swinsian.Swinsian"], "page_up", toCmdAltHotkey("left_arrow"), {})

export const swinsianRules = [
  { description: "swinsian: step forwards", manipulators: stepForwards},
  { description: "swinsian: step backwards", manipulators: stepBackwards},
]
