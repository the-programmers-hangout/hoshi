const { Command } = require("discord-akairo");

class AboutCommand extends Command {
  constructor() {
    super("about", {
      aliases: ["about", "info"],
      category: "general",
      clientPermissions: ["EMBED_LINKS"],
      description: { content: "Shows information about Hoshi." }
    });
  }

  exec(message) {
    const prefix = this.handler.prefix(message);
    const embed = this.client.util
      .embed()
      .setColor(0xffac33)
      .setTitle("About Hoshi")
      .setDescription([
        `Hoshi is developed by **1Computer#7852** and **vszGrey#1124**.`,
        "",
        "Hoshi uses the **[Discord.js](https://discord.js.org)** library and the **[Akairo](https://1computer1.github.io/discord-akairo)** framework.",
        "You can find the Github repo for Hoshi **[here](https://github.com/1Computer1/hoshi)**.",
        "",
        `Use \`${prefix}stats\` for statistics and \`${prefix}invite\` for an invite link.`
      ]);

    return message.util.send({ embed });
  }
}

module.exports = AboutCommand;
