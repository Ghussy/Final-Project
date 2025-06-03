export interface Task {
  id: string;
  name: string;
  status: "pending" | "completed";
}

export class TaskManager {
  private tasks: Task[] = [];

  constructor(initialTasks: Task[] = []) {
    this.tasks = initialTasks.map((task) => ({ ...task }));
  }

  completeTask(taskId: string): boolean {
    const task = this.tasks.find((t) => t.id === taskId);
    if (task && task.status === "pending") {
      task.status = "completed";
      return true;
    }
    if (task && task.status === "completed") {
      return false;
    }
    return false;
  }

  uncompleteTask(taskId: string): boolean {
    const task = this.tasks.find((t) => t.id === taskId);
    if (task && task.status === "completed") {
      task.status = "pending";
      return true;
    }
    if (task && task.status === "pending") {
      return false;
    }
    return false;
  }

  getTaskStatus(taskId: string): Task["status"] | undefined {
    const task = this.tasks.find((t) => t.id === taskId);
    return task?.status;
  }

  getTasks(): Task[] {
    return JSON.parse(JSON.stringify(this.tasks));
  }

  addTasks(newTasks: Task[]): Task[] {
    const addedTasks: Task[] = [];
    for (const newTaskStub of newTasks) {
      if (!newTaskStub.name) {
        continue;
      }
      const fullTask: Task = {
        id:
          newTaskStub.id ||
          `task_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
        name: newTaskStub.name,
        status: newTaskStub.status || "pending",
      };
      this.tasks.push(fullTask);
      addedTasks.push(fullTask);
    }
    return addedTasks;
  }

  removeTasks(taskIds: string[]): void {
    let initialLength = this.tasks.length;
    this.tasks = this.tasks.filter((task) => !taskIds.includes(task.id));
    let removedCount = initialLength - this.tasks.length;
  }
}
