// Spirit Animal Creator - Design Patterns Demo

// Factory Pattern exports
export {
  createSpiritAnimal,
  createNormalAnimal,
  createLegendaryAnimal,
  createGhostAnimal,
} from "./core/animal-factory";

// Command Pattern exports
export { Command } from "./core/commands/command.interface";
export { CommandInvoker } from "./core/commands/command.invoker";
export { CompleteTaskCommand } from "./core/commands/complete-task.command";
export { CreateAnimalCommand } from "./core/commands/create-animal.command";
export { GenerateTasksCommand } from "./core/commands/generate-tasks.command";
export { TaskManager, Task } from "./core/commands/task-manager";

// Services exports
export { AITaskGenerator } from "./core/services/ai-task-generator";

// Facade Pattern exports
export { SpiritGuideFacade } from "./core/spirit-guide-facade";

// Models exports
export { SimpleSpiritAnimal } from "./models/spirit-animal";

// Core types and data
export * from "./core/types";
export * from "./core/animal-data";
