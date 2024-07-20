import "dotenv/config";
import { UserUtils } from "#classes/UserUtils.js";
import { readdirSync } from "fs";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

const client = new UserUtils();

const eventFiles = readdirSync(`${__dirname}/events`).filter((f) =>
  f.endsWith(".js"),
);

for (const file of eventFiles) {
  const { default: event } = await import(`#events/${file}`);
  const eventName = file.split(".")[0];

  console.log(`Loading "${eventName}" event`);

  if (event.once) {
    client.once(eventName, event.run);
  } else {
    client.on(eventName, event.run);
  }
}

const categories = readdirSync(`${__dirname}/commands`);

for (const category of categories) {
  const commandFiles = readdirSync(`${__dirname}/commands/${category}`).filter(
    (f) => f.endsWith(".js"),
  );

  for (const file of commandFiles) {
    const { default: command } = await import(`#commands/${category}/${file}`);
    const commandName = file.split(".")[0];

    console.log(`Loading "${commandName}" command`);

    client.commands.set(commandName, command);
  }
}

client.login(process.env.BOT_TOKEN);
