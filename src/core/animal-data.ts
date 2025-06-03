export const NORMAL_ANIMALS: { [key: string]: string } = {
  patience: "Turtle",
  focus: "Hawk",
  courage: "Lion",
  wisdom: "Owl",
  compassion: "Deer",
  strength: "Bear",
  default: "Wolf",
};

export const LEGENDARY_ANIMALS: {
  [key: string]: { name: string; trait: string };
} = {
  "mountain-climb": { name: "Phoenix", trait: "resilience" },
  "deep-meditation": { name: "Dragon", trait: "insight" },
  "community-service": { name: "Unicorn", trait: "purity" },
  default: { name: "Griffin", trait: "majesty" },
};
