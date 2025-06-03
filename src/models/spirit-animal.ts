import { SpiritAnimal, AnimalType } from "../core/types";
import { Task } from "../core/commands/task-manager";

export class SimpleSpiritAnimal implements SpiritAnimal {
  id: string;
  name: string;
  type: AnimalType;
  primaryTrait: string;
  tasks: Task[];
  public contentType?: string;

  constructor(
    id: string,
    name: string,
    type: AnimalType,
    primaryTrait: string,
    contentType?: string
  ) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.primaryTrait = primaryTrait;
    this.tasks = [];
    this.contentType = contentType;
  }

  getTasks(): Task[] {
    return [...this.tasks];
  }
}
