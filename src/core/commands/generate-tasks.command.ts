import { Command } from "./command.interface";
import { AITaskGenerator } from "../services/ai-task-generator";
import { TaskManager, Task } from "./task-manager";
import { SpiritAnimal } from "../types";

export class GenerateTasksCommand implements Command {
  private generatedTasks: Task[] = [];

  constructor(
    private aiTaskGenerator: AITaskGenerator,
    private taskManager: TaskManager,
    private animal: SpiritAnimal,
    private userNeeds: string[]
  ) {}

  async execute(): Promise<void> {
    try {
      const taskIdeas = await this.aiTaskGenerator.generateTaskIdeas(
        this.userNeeds,
        this.animal.type
      );

      if (taskIdeas.length === 0) {
        return;
      }

      const tasksToCreate: Task[] = taskIdeas.map((idea) => ({
        ...idea,
        id: `task_${Date.now()}_${Math.random().toString(36).substring(2, 10)}`,
        status: "pending",
      }));

      this.generatedTasks = this.taskManager.addTasks(tasksToCreate);
    } catch (error) {
      this.generatedTasks = [];
    }
  }

  undo(): void {
    if (this.generatedTasks.length > 0) {
      const taskIdsToRemove = this.generatedTasks.map((task) => task.id);
      this.taskManager.removeTasks(taskIdsToRemove);
      this.generatedTasks = [];
    }
  }
}
