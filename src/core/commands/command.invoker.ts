import { Command } from "./command.interface";

export class CommandInvoker {
  private history: Command[] = [];

  async executeCommand(command: Command): Promise<void> {
    await command.execute();
    this.history.push(command);
  }

  undoLastCommand(): void {
    const command = this.history.pop();
    if (command) {
      command.undo();
    }
  }

  getHistorySize(): number {
    return this.history.length;
  }
}
