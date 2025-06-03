import { Task } from "../commands/task-manager";
import OpenAI from "openai";

export class AITaskGenerator {
  private openai: OpenAI;

  constructor(apiKey: string) {
    this.openai = new OpenAI({
      apiKey: apiKey,
    });
  }

  async generateTaskIdeas(
    userNeeds: string[],
    animalType?: string
  ): Promise<Omit<Task, "id" | "status">[]> {
    const needsString = userNeeds.join(", ");
    const prompt = `You are a helpful assistant that generates tasks for spiritual growth.
Based on the following user needs: "${needsString}"${
      animalType ? ` and spirit animal type: "${animalType}"` : ""
    },
please generate 3-5 relevant tasks. Each task should be a short, actionable phrase.
Return the tasks as a JSON array of strings, like this: ["Task 1", "Task 2", "Task 3"]
Do not include any other text or explanation outside the JSON array.`;

    try {
      const completion = await this.openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "You are an assistant that provides tasks as a JSON array of strings.",
          },
          { role: "user", content: prompt },
        ],
        temperature: 0.7,
      });

      const content = completion.choices[0]?.message?.content;
      if (!content) {
        return [];
      }

      let taskNames: string[] = [];
      try {
        const startIndex = content.indexOf("[");
        const endIndex = content.lastIndexOf("]");
        if (startIndex !== -1 && endIndex !== -1 && endIndex > startIndex) {
          const jsonString = content.substring(startIndex, endIndex + 1);
          taskNames = JSON.parse(jsonString);
          if (
            !Array.isArray(taskNames) ||
            !taskNames.every((task) => typeof task === "string")
          ) {
            return [];
          }
        } else {
          return [];
        }
      } catch (parseError) {
        return [];
      }

      const generatedTaskIdeas: Omit<Task, "id" | "status">[] = taskNames.map(
        (name) => ({ name })
      );
      return generatedTaskIdeas;
    } catch (error) {
      return [];
    }
  }
}
