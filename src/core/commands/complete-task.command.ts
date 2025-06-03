import { Command } from "./command.interface";
import { TaskManager } from "./task-manager";

// Concrete Command: Implements an action using the Receiver
export class CompleteTaskCommand implements Command {
  private wasSuccessfullyExecuted: boolean = false;

  constructor(
    private taskManager: TaskManager, // The Receiver
    private taskId: string // Parameter for the action
  ) {}

  execute(): void {
    this.wasSuccessfullyExecuted = this.taskManager.completeTask(this.taskId);
  }

  undo(): void {
    if (this.wasSuccessfullyExecuted) {
      this.taskManager.uncompleteTask(this.taskId);
    }
  }
}
