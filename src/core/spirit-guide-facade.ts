import * as AnimalFactory from "./animal-factory";
import { CommandInvoker } from "./commands/command.invoker";
import { CompleteTaskCommand } from "./commands/complete-task.command";
import { CreateAnimalCommand } from "./commands/create-animal.command";
import { GenerateTasksCommand } from "./commands/generate-tasks.command";
import { TaskManager, Task } from "./commands/task-manager";
import { AITaskGenerator } from "./services/ai-task-generator";
import {
  SpiritAnimal,
  AnimalType,
  NormalAnimalParams,
  LegendaryAnimalParams,
  GhostAnimalParams,
  UserNeedsParams,
} from "./types";

export class SpiritGuideFacade {
  public invoker: CommandInvoker;
  private taskManager: TaskManager;
  private aiTaskGenerator: AITaskGenerator;
  private animals: SpiritAnimal[] = [];

  constructor(openaiApiKey: string) {
    this.invoker = new CommandInvoker();
    this.taskManager = new TaskManager([]);
    this.aiTaskGenerator = new AITaskGenerator(openaiApiKey);
  }

  createAnimal(
    type: AnimalType,
    params: NormalAnimalParams | LegendaryAnimalParams | GhostAnimalParams
  ): SpiritAnimal | null {
    let createdAnimalRef: SpiritAnimal | null = null;

    const command = new CreateAnimalCommand(
      AnimalFactory,
      params,
      type,
      (newAnimal) => {
        this.animals.push(newAnimal);
        createdAnimalRef = newAnimal;
      },
      (animalId) => {
        this.animals = this.animals.filter((a) => a.id !== animalId);
      }
    );
    this.invoker.executeCommand(command);
    return createdAnimalRef;
  }

  async generateTasksForAnimal(
    animalId: string,
    userNeeds: string[]
  ): Promise<void> {
    const animal = this.animals.find((a) => a.id === animalId);
    if (!animal) {
      return;
    }
    const command = new GenerateTasksCommand(
      this.aiTaskGenerator,
      this.taskManager,
      animal,
      userNeeds
    );
    await this.invoker.executeCommand(command);
  }

  completeTask(taskId: string): void {
    const command = new CompleteTaskCommand(this.taskManager, taskId);
    this.invoker.executeCommand(command);
  }

  undoLastAction(): void {
    this.invoker.undoLastCommand();
  }

  getAnimalById(animalId: string): SpiritAnimal | undefined {
    return this.animals.find((a) => a.id === animalId);
  }

  getAllAnimals(): SpiritAnimal[] {
    return [...this.animals];
  }

  getAllTasks(): Task[] {
    return this.taskManager.getTasks();
  }

  getTasksForAnimal(animalId: string): Task[] {
    return this.taskManager.getTasks();
  }
}
