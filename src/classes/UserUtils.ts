import { Client, Collection } from "discord.js";

export class UserUtils extends Client {
  commands: Collection<string, string>;

  constructor() {
    super({ intents: [] });

    this.commands = new Collection();
  }
}
