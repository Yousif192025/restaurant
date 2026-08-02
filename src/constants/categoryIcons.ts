import { Beef, Pizza, Drumstick, Flame, Salad, IceCream, CupSoda, Coffee, UtensilsCrossed } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export const categoryIconMap: Record<string, LucideIcon> = {
  Beef,
  Pizza,
  Drumstick,
  Flame,
  Salad,
  IceCream,
  CupSoda,
  Coffee,
};

export function getCategoryIcon(name: string): LucideIcon {
  return categoryIconMap[name] ?? UtensilsCrossed;
}
