import {
  AutocompleteInteraction,
  ChatInputCommandInteraction,
  Emoji,
} from "discord.js";

export default {
  run: async (interaction: ChatInputCommandInteraction) => {
    interaction.reply({
      content: `${interaction.options.getString("emoji")}`,
    });
  },

  autocomplete: async (interaction: AutocompleteInteraction) => {
    const { items } = (await interaction.client.rest.get(
      `/applications/${interaction.client.user.id}/emojis`,
    )) as { items: Emoji[] };

    const focusedValue = interaction.options.getFocused();
    const emojis = items
      .filter((e) => e.name.startsWith(focusedValue))
      .slice(0, 25);

    await interaction.respond(
      emojis.map((e) => ({
        name: e.name,
        value: e.animated ? `<a:${e.name}:${e.id}>` : `<:${e.name}:${e.id}>`,
      })),
    );
  },
};
