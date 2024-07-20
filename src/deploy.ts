import "dotenv/config";
import { fileURLToPath } from "url";
import { ApplicationCommandData, REST } from "discord.js";
import { readdirSync, readFileSync } from "fs";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

console.log("Starting deploy");

const rest = new REST().setToken(process.env.BOT_TOKEN);

const commands = [];

const categories = readdirSync(`${__dirname}/commands`);

for (const category of categories) {
  const data: ApplicationCommandData & {
    integration_types?: number[];
    contexts?: number[];
  } = JSON.parse(
    readFileSync(`${__dirname}/commands/${category}/commands.json`, {
      encoding: "utf-8",
    }),
  );

  for (const command of data) {
    command.integration_types = [1];
    command.contexts = [0, 1, 2];

    commands.push(command);
  }
}

console.log(commands);

await rest.put(`/applications/${process.env.CLIENT_ID}/commands`, {
  body: commands,
});

console.log("Deploy done");
