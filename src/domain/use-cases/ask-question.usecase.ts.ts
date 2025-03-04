import pc from 'picocolors';
import readline from "node:readline";
import { stdin as input, stdout as output } from "node:process";

const rl = readline.createInterface({ input, output });

export class AskQuestion {

  static async execute(): Promise<string> {
    return new Promise((resolve) => {
      rl.question(pc.cyan("message: "), (answer) => {
        resolve(answer);
      });
    });
  }

}