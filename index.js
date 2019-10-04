const Discord = require('discord.js');
var { prefix, token } = require('./config.json');
const client = new Discord.Client();
const snekfetch = require("snekfetch");
const randomPuppy = require('random-puppy')
const YTDL = require("ytdl-core")
const getYouTubeID = require("get-youtube-id")
const fetchVideoInfo = require("youtube-info")
const servers = require("net")

function play(connection, message) {
  var server = servers[message.guild.id];
  server.dispatcher = connection.playStream(YTDL(server.queue[0], { filter: "audioonly" }));

  server.queue.shift();

  server.dispatcher.on("end", function () {
    if (server.queue[0]) play(connection, message);
    else connection.disconnect();

  })
}


client.once('ready', () => {
  console.log('Aurora is ready to go.');
  client.user.setActivity('In beta (1.1.2)', {
    type: 'PLAYING'
  });
})


client.on('message', message => {
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  let member = message.member

   if (message.content === `${prefix}ping`) {

  // USEFUL COMMAND AREA  
  // USEFUL COMMAND AREA
  // USEFUL COMMAND AREA


  // ping command
  if (message.content === `${prefix}ping`) {
    message.channel.send('Pinging...').then(m => {
      let ping = m.createdTimestamp - message.createdTimestamp

      m.edit(`My ping is ${ping}.`)
    });

  }
  else if (message.content === `${prefix}help`) {
    const help = new Discord.RichEmbed()
    .setFooter(`Requested by ${message.author.tag}`)
    .setColor("#a500ff")
    .setTimestamp()
    .addField("Helpful Commands", `~ping    | Pong?
    ~help    | Sends you this message.
    ~av      | Fetches your avatar, or someone you mention.`)
    .addField("Fun Commands", `~8ball   | Let the Magic 8-ball answer your life questions.
    ~kiss    | Give someone a kiss!
    ~kill    | Kill someone!`)
    .addField(`Media Commands`, `~meme    | Fetches you a random dank meme.`)
      .setFooter(`Requested by ${message.author.tag}`)
      .setColor("#a500ff")
      .setTimestamp()
      .addField("Helpful Commands", `~ping  | Pong?
    ~help  | Sends you this message.
    ~av    | Fetches your avatar, or someone you mention.`)
      .addField("Fun Commands", `~8ball | Let the Magic 8-ball answer your life questions.
    ~kiss  | Give someone a kiss!
    ~kill  | Kill someone!`)
      .addField(`Media Commands`, `~meme | Fetches you a random dank meme.
      ~play | Plays Music!
      ~stop | Makes bot leave VC`)
    message.channel.send("Sent.");
    message.member.send(help);
  }

  // fun commands

  // 8ball command
  else if (message.content.startsWith(`${prefix}8ball`)) {

    if (!args[2]) {
      const eightballerror = new Discord.RichEmbed()
        .setFooter(`Requested by ${message.author.tag}`)
        .setTitle('Error')
        .setDescription("Ask a longer question.")
        .setColor("#a500ff")
        .setTimestamp()
      return message.channel.send(eightballerror)
    }

    let replies = ["Yes.", "No.", "Hell no.", "Hell yeah!", "I don't know", "I really don't know.", "Ask again."]

    let result = Math.floor((Math.random() * replies.length));
    let question = args.slice(1).join(" ")

    const eightball = new Discord.RichEmbed()
      .setTitle('Magic 8-Ball Results')

      .setColor("#a500ff")
      .setTimestamp()
      .addField("Question", question)
      .addField("Answer", replies[result])
    message.channel.send(eightball)
  }

else if (message.content.startsWith(`${prefix}kiss`)) {
  var kissuser = message.mentions.members.first()
            if(!kissuser){
              const kisserror = new Discord.RichEmbed()
              .setTitle('Error')
              .setDescription(`Mention the user you would like to kiss!`)
              .setColor("#a500ff")
              .setTimestamp()
              return message.channel.send(kisserror)
            }
            const kissembed = new Discord.RichEmbed()
            .setFooter(`Requested by ${message.author.tag}`)
            .setTimestamp()
            .setColor("#a500ff")
            .setDescription(`${message.author} gave **${kissuser}** a kiss!`)
            message.channel.send(kissembed)
}

else if (message.content.startsWith(`${prefix}kill`)) {
  var killuser = message.mentions.members.first()
            if(!killuser){
              const killerror = new Discord.RichEmbed()
              .setTitle('Error')
              .setDescription(`Mention the user you would like to kill!`)
              .setColor("#a500ff")
              .setTimestamp()
               return message.channel.send(killerror)
            }
            const killembed = new Discord.RichEmbed()
            .setTimestamp()
            .setFooter(`Requested by ${message.author.tag}`)
            .setColor("#a500ff")
            .setDescription(`${message.author} killed **${killuser}**.`)
            message.channel.send(killembed)
}
  // kiss command
  else if (message.content.startsWith(`${prefix}kiss`)) {
    var kissuser = message.mentions.members.first()
    if (!kissuser) {
      const kisserror = new Discord.RichEmbed()
        .setTitle('Error')
        .setDescription(`Mention the user you would like to kiss!`)
        .setColor("#a500ff")
        .setTimestamp()
      return message.channel.send(kisserror)
    }
    const kissembed = new Discord.RichEmbed()
      .setFooter(`Requested by ${message.author.tag}`)
      .setTimestamp()
      .setColor("#a500ff")
      .setDescription(`${message.author} gave **${kissuser}** a kiss!`)
    message.channel.send(kissembed)
  }

  // kill command
  else if (message.content.startsWith(`${prefix}kill`)) {
    var killuser = message.mentions.members.first()
    if (!killuser) {
      const killerror = new Discord.RichEmbed()
        .setTitle('Error')
        .setDescription(`Mention the user you would like to kill!`)
        .setColor("#a500ff")
        .setTimestamp()
      return message.channel.send(killerror)
    }
    const killembed = new Discord.RichEmbed()
      .setTimestamp()
      .setFooter(`Requested by ${message.author.tag}`)
      .setColor("#a500ff")
      .setDescription(`${message.author} killed **${killuser}**.`)
    message.channel.send(killembed)
  }

  else if (message.content.startsWith(`${prefix}meme`)) {
    randomPuppy(sub)
    var subreddits = [
      'dankmemes',
      'edgymemes'
    ]

    var sub = subreddits[Math.round(Math.random() * (subreddits.length - 1))];

    randomPuppy(sub)
      .then(url => {
        const memeembed = new Discord.RichEmbed()
          .setColor("#a500ff")
          .setTitle(`Provided by r/${sub}`)
          .setURL(`https://reddit.com/r/${sub}`)
          .setFooter(`Requested by ${message.author.tag}`)
          .setTimestamp()
          .setImage(url);
        message.channel.send(memeembed)

      })
  }

  else if (message.content.startsWith(`${prefix}av`)) {
    regex = /\?=size[0-9]{1,45}$/g;
    memberMention = null;
    if (message.mentions.members) {
      memberMention = message.mentions.members.first()
    }
    if (message.mentions.users) {
      userMention = message.mentions.users.first()
    }
    if (!memberMention) {
      if (message.author.displayAvatarURL.indexOf(/\.gif\?size=[0-9]{1,49}$/g)) {
        const av = new Discord.RichEmbed()
          .setAuthor(`${message.author.username}'s Avatar`)
          .setColor("#a500ff")
          .setImage(message.author.avatarURL)
          .setTimestamp()
        return message.channel.send(av)
      }
      return message.channel.send(message.author.displayAvatarURL)
    }
    if (memberMention.user.displayAvatarURL.indexOf(/\.gif\?size=[0-9]{1,49}$/g)) {
      const mentionav = new Discord.RichEmbed()
        .setAuthor(`${memberMention.user.username}'s Avatar`)
        .setColor(`#a500ff`)
        .setImage(memberMention.user.avatarURL)
        .setTimestamp()

      return message.channel.send(mentionav)
    }
    message.channel.send(memberMention.user.displayAvatarURL)
  }
  // play command 

  else if (message.content.startsWith(`${prefix}play`)) {
    if (!args[1]) {
      var server = servers[message.guild.id];
      message.channel.send("Please Provide a Link")
      return;
    }

    if (!message.member.voiceChannel) {
      message.channel.send("You must be in a voice channel ")
      return;
    }

    if (!servers[message.guild.id]) servers[message.guild.id] = {
      queue: []
    };
    var server = servers[message.guild.id];

    server.queue.push(args[1]);

    if (!message.guild.voiceConnection) message.member.voiceChannel.join().then(function (connection) {
      play(connection, message)
      message.channel.send("Ok playing requested song")
    });
    // SKIP COMMAND currently broken
    else if (message.content.startsWith(`${prefix}skip`)) {
      var server = servers[message.guild.id];
      message.channel.send("Ok Skipped")
      if (server.dispatcher) server.dispatcher.end();
    }
  }
  //STOP COMMAND
  else if (message.content.startsWith(`${prefix}stop`)) {
    var server = servers[message.guild.id];
    if (message.guild.voiceConnection) message.guild.voiceConnection.disconnect();
    message.channel.send("Ok Stopped")
  }
}

});
client.login(token);