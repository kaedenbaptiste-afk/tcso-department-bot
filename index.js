const { 
  Client, 
  GatewayIntentBits, 
  EmbedBuilder, 
  ButtonBuilder, 
  ButtonStyle, 
  ActionRowBuilder,
  Events
} = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.once(Events.ClientReady, () => {
  console.log(`TCSO Department Bot Online as ${client.user.tag}`);
});

client.on(Events.InteractionCreate, async interaction => {

  // Slash Command
  if (interaction.isChatInputCommand()) {

    if (interaction.commandName === "setup") {

      const embed = new EmbedBuilder()
        .setTitle("Tarrant County Sheriff's Office")
        .setDescription(
          "We are currently accepting applications for the Cadet Program.\n\n" +
          "**Requirements:**\n" +
          "• Age 15–18\n" +
          "• Must read the TCSO Handbook\n" +
          "• Must complete training & ride-along\n\n" +
          "Click the button below to apply."
        )
        .setColor(0x1f1f1f);

      const button = new ButtonBuilder()
        .setCustomId("start_application")
        .setLabel("Apply Now")
        .setStyle(ButtonStyle.Primary);

      const row = new ActionRowBuilder().addComponents(button);

      await interaction.reply({ embeds: [embed], components: [row] });
    }
  }

  // Button Click
  if (interaction.isButton()) {

    if (interaction.customId === "start_application") {
      try {
        await interaction.user.send("Welcome to the TCSO Application Portal. Please answer each question professionally.");
        await interaction.reply({ content: "Check your DMs to begin your application.", ephemeral: true });
      } catch {
        await interaction.reply({ content: "Please enable Direct Messages to apply.", ephemeral: true });
      }
    }

  }

});

client.login(process.env.DISCORD_TOKEN);
