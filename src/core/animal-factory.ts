import {
  SpiritAnimal,
  NormalAnimalParams,
  LegendaryAnimalParams,
  GhostAnimalParams,
} from "./types";
import { SimpleSpiritAnimal } from "../models/spirit-animal";
import { NORMAL_ANIMALS, LEGENDARY_ANIMALS } from "./animal-data";

type ContentType = "task" | "quote";


export function createNormalAnimal(
  params: NormalAnimalParams,
  contentType: ContentType = "task"
): SimpleSpiritAnimal {
  const primaryTrait = params.userNeeds[0];
  const animalName = NORMAL_ANIMALS[primaryTrait] || "Wolf";

  return new SimpleSpiritAnimal(
    `normal_${Date.now()}`,
    animalName,
    "normal",
    primaryTrait,
    contentType
  );
}

export function createLegendaryAnimal(
  params: LegendaryAnimalParams,
  contentType: ContentType = "task"
): SimpleSpiritAnimal {
  if (params.groupSize < 3) {
    throw new Error("Legendary animals require group challenges (3+ people)");
  }

  const animalData =
    LEGENDARY_ANIMALS[params.challengeType] ||
    LEGENDARY_ANIMALS["mountain-climb"];

  return new SimpleSpiritAnimal(
    `legendary_${Date.now()}`,
    animalData.name,
    "legendary",
    animalData.trait,
    contentType
  );
}

export function createGhostAnimal(
  params: GhostAnimalParams,
  contentType: ContentType = "quote"
): SimpleSpiritAnimal {
  return new SimpleSpiritAnimal(
    `ghost_${params.baseAnimal.id}`,
    `Ghost ${params.baseAnimal.name}`,
    "ghost",
    params.baseAnimal.primaryTrait,
    contentType
  );
}

// Main factory function with optional content type specification
export function createSpiritAnimal(
  type: "normal" | "legendary" | "ghost",
  params: NormalAnimalParams | LegendaryAnimalParams | GhostAnimalParams,
  contentType?: ContentType
): SimpleSpiritAnimal {
  switch (type) {
    case "normal":
      return createNormalAnimal(params as NormalAnimalParams, contentType);
    case "legendary":
      return createLegendaryAnimal(
        params as LegendaryAnimalParams,
        contentType
      );
    case "ghost":
      return createGhostAnimal(params as GhostAnimalParams, contentType);
    default:
      throw new Error(`Unknown animal type: ${type}`);
  }
}
