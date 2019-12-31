const Discord = require("discord.js");

const prefix = "tn+";

const client = new Discord.Client();

client.on("ready", () => {

  console.log("ready to online");
  
client.user.setActivity("With TheNeel Gaming");
        
});

client.on("message", (message) => {

  if (message.content.startsWith("Hi")) {

    message.channel.send("Hello Buddy");

  }

});

client.on("guildMemberAdd", (member) => {

  const guild = member.guild;

  if (!newUsers[guild.id]) newUsers[guild.id] = new Discord.Collection();

  newUsers[guild.id].set(member.id, member.user);

  if (newUsers[guild.id].size > 10) {

    const userlist = newUsers[guild.id].map(u => u.toString()).join(" ");

    guild.channels.find(channel => channel.name === "🌀general-chats").send("Welcome Buddy Our Server" + userlist);

    newUsers[guild.id].clear();

  }

});

client.on("guildMemberRemove", (member) => {

  const guild = member.guild;

  if (newUsers[guild.id].has(member.id)) newUsers.delete(member.id);

});
const bannedwords = "fuck,shit,slut,whore,chutiya,abe,bc,bsdk,kamina,cutiya,fuc,fuk,fak,boobs,hot,porn,pon,pornhub,sex,sexy,madarcod,madarchod,loure,louda,loura,loude,loure,lode,lore,khanki,kutta,maagi,Maagi,Betichode,betichod,codna,chodna".split(",");

client.on("message", msg => {

  if (msg.guild === null) return;

  for (i=0;i<bannedwords.length;i++) {

    if (msg.content.toLowerCase().includes(bannedwords[i])) {

      msg.delete();

      msg.reply("Please Don't Use This Word Again Buddy.");

      return;

    }

  }

  if (msg.author.bot) return;

  if (!msg.member.hasPermission("ADMINISTRATOR")) return;

  if (!msg.content.toLowerCase().startsWith(prefix)) return;

  msg.delete();

  if (msg.content.toLowerCase().startsWith(prefix + "kick ")) {

    const mem = msg.mentions.members.first();

    mem.kick().then(() => {

      msg.channel.send(mem.displayName + " has successfully been kicked by " + msg.author.username + "!");

    }).catch(e => {

      msg.channel.send("An error occured!");

    });

  }

  if (msg.content.toLowerCase().startsWith(prefix + "ban ")) {

    const mem = msg.mentions.members.first();

    const mc = msg.content.split(" ")[2];

    mem.ban(mc).then(() => {

      msg.channel.send(mem.displayName + " has successfully been banned by " + msg.author.username + " for " + mc + " days!");

    }).catch(e => {

      msg.channel.send("An error occured!");

    });

  }

  if (msg.content.toLowerCase().startsWith(prefix + "mute")) {

    const mem = msg.mentions.members.first();

    if (msg.guild.roles.find("name", "Muted")) {

      mem.addRole(msg.guild.roles.find("name", "Muted")).then(() => {

        msg.channel.send(mem.displayName + " has successfully been muted!");

      }).catch(e => {

        msg.channel.send("An error occured!");

        console.log(e);

      });

    }

  }

  if (msg.content.toLowerCase().startsWith(prefix + "unmute")) {

    const mem = msg.mentions.members.first();

    if (msg.guild.roles.find("name", "Muted")) {

      mem.removeRole(msg.guild.roles.find("name", "Muted")).then(() => {

        msg.channel.send(mem.displayName + " has successfully been unmuted!");

      }).catch(e => {

        msg.channel.send("An error occured!");

        console.log(e);

      });

    }

  }

  if (msg.content.toLowerCase().startsWith(prefix + "purge")) {

    const mc = msg.content.split(" ")[1];

    msg.channel.bulkDelete(mc);

  }

  if (msg.content.toLowerCase().startsWith(prefix + "eval")) {

    const sc = msg.content.substring(msg.content.indexOf(" "));

    eval(sc);

  }

  if (msg.content.toLowerCase().startsWith(prefix + "calc")) {

    const ca = msg.content.substring(msg.content.indexOf(" "));

    msg.reply(ca + " is " + eval(ca).toFixed(2));

  }

});

client.login(process.env.token);

