import { Command } from "./command.interface";
import * as AnimalFactory from "../animal-factory";
import {
  SpiritAnimal,
  AnimalType,
  NormalAnimalParams,
  LegendaryAnimalParams,
  GhostAnimalParams,
} from "../types";

export class CreateAnimalCommand implements Command {
  private createdAnimal: SpiritAnimal | null = null;

  constructor(
    private factory: typeof AnimalFactory,
    private params:
      | NormalAnimalParams
      | LegendaryAnimalParams
      | GhostAnimalParams,
    private type: AnimalType,
    private addAnimalToStoreCallback: (animal: SpiritAnimal) => void,
    private removeAnimalFromStoreCallback: (animalId: string) => void
  ) {}

  execute(): void {
    try {
      this.createdAnimal = this.factory.createSpiritAnimal(
        this.type,
        this.params
      );

      if (this.createdAnimal) {
        this.addAnimalToStoreCallback(this.createdAnimal);
      }
    } catch (error) {
      this.createdAnimal = null;
    }
  }

  undo(): void {
    if (this.createdAnimal && this.createdAnimal.id) {
      this.removeAnimalFromStoreCallback(this.createdAnimal.id);
      this.createdAnimal = null;
    }
  }
}
