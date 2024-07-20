import { UserContextMenuCommandInteraction } from "discord.js";

export default {
  name: "User info",
  run: async (interaction: UserContextMenuCommandInteraction) => {
    const user = interaction.targetUser;

    const embed = {
      title: "User info",
      thumbnail: {
        url: user.avatar
          ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`
          : interaction.client.rest.cdn.defaultAvatar(
              user.discriminator ? user.discriminator % 5 : (user.id >> 22) % 6,
            ),
      },
      fields: [
        {
          name: "Username",
          value: user.username,
          inline: true,
        },
        {
          name: "ID",
          value: user.id,
          inline: true,
        },
        {
          name: "Bot?",
          value: user.bot ? "✅ Yes" : "❌ No",
        },
      ],
    };

    interaction.reply({
      embeds: [embed],
      ephemeral: true,
    });
  },
};
