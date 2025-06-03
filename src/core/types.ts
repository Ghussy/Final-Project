import { Task as CommandTask } from "./commands/task-manager";

export type Trait =
  | "patience"
  | "courage"
  | "wisdom"
  | "compassion"
  | "strength";

export type AnimalType = "normal" | "legendary" | "ghost";

export interface Task {
  id: string;
  title: string;
  description: string;
  category: "meditation" | "exercise" | "journaling" | "kindness";
  starsReward: number;
  estimatedMinutes: number;
}

export interface SpiritAnimal {
  id: string;
  name: string;
  type: AnimalType;
  primaryTrait: string;
  tasks?: CommandTask[];
}

export interface UserProfile {
  id: string;
  name: string;
  preferredTrait: Trait;
}

export interface UserNeedsParams {
  userNeeds: string[];
}

export interface NormalAnimalParams extends UserNeedsParams {
  element?: string;
  journalAnalysis?: string;
}

export interface LegendaryAnimalParams {
  challengeType: string;
  groupSize: number;
  duration?: string;
  completionProof?: any;
}

export interface GhostAnimalParams {
  baseAnimal: SpiritAnimal;
  streakLength: number;
  activityType?: string;
}

export interface CoreTrait {
  name: string;
  description: string;
}
