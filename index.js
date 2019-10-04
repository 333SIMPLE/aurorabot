const Discord = require('discord.js');
var { prefix, token } = require('./config.json');
const client = new Discord.Client();
const snekfetch = require("snekfetch");
const randomPuppy = require('random-puppy')

client.once('ready', () => {
  console.log('Sunset is ready to go.');
  client.user.setActivity('in beta.', {
    type: 'PLAYING'
  });
}) 


client.on('message', message => {
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  let member = message.member


// USEFUL COMMAND AREA  
// USEFUL COMMAND AREA
// USEFUL COMMAND AREA


// ping command
   if (message.content === `${prefix}ping`) {
    message.channel.send('Pinging...').then(m => {
      let ping = m.createdTimestamp - message.createdTimestamp

      m.edit(`My ping is ${ping}.`)
});
    console.log(`COMMAND: ${message.member.displayName} issued ping command.`);


    //info command
  } else if (message.content === `${prefix}info`) {
    const info = new Discord.RichEmbed()
    .setTitle('Server Info')
    .setAuthor(`${member.user.username}`, member.user.avatarURL)

    .setColor("RED")
    .setTimestamp()
    .addField("Server Name :", message.guild.name)
    .addField("Member Count :", message.guild.memberCount)
    message.channel.send(info);
    console.log(`COMMAND: ${message.member.displayName} issued info command.`);


    //help command
  } else if (message.content === `${prefix}help`) {
    console.log(`COMMAND: ${message.member.displayName} issued help command.`);
    const help = new Discord.RichEmbed()
    .setAuthor(`Sunset Help`, message.author.avatarURL)

    .setColor("RED")
    .setTimestamp()
    .addField("Helpful Commands 👍", `~ping  | Pong?
    ~info  | Tells you about the server.
    ~help  | Sends you this message.`)
    .addField("Fun Commands 😄", `~8ball | Let the Magic 8-ball answer your life questions.
    ~kiss  | Give someone a kiss!
    ~kill  | Kill someone!`)
    .addField(`Media Commands 👀`, `~meme | Fetches you a random dank meme.
    ~edgymeme | Fetches you a random edgy meme.`)
    .addField(`NSFW Commands 🔞`, `~porngif | Fetches you Porn GIFS.
    ~nudes | Fetches you UHD nudes.
    ~boobs | Fetches you boobs.
    ~pussy | Fetches you pussy.
    
    `)
    message.channel.send("Sent.");
    message.member.send(help);
  }

// FUN COMMAND SECTION
// FUN COMMAND SECTION
// FUN COMMAND SECTION


// 8ball command
  else if (message.content.startsWith(`${prefix}8ball`)) {
    console.log(`COMMAND: ${message.member.displayName} issued 8ball command.`);
    
    if(!args[2]) return message.channel.send("Ask a full question.")
    let replies = ["Yes.", "No.", "Hell no.", "Hell yeah!", "I don't know", "I really don't know.", "Ask again."]

    let result = Math.floor((Math.random() * replies.length));
    let question = args.slice(1).join(" ")

    const eightball = new Discord.RichEmbed()
    .setTitle('Magic 8-Ball Results')
    .setAuthor(`${member.user.username}`, member.user.avatarURL)

    .setColor("RED")
    .setTimestamp()
    .addField("Question", question)
    .addField("Answer", replies[result])
    message.channel.send(eightball)
  }

// kiss command
else if (message.content.startsWith(`${prefix}kiss`)) {
console.log(`COMMAND: ${message.member.displayName} issued kiss command.`);
  var kissuser = message.mentions.members.first()
            if(!kissuser){
              const kisserror = new Discord.RichEmbed()
              .setTitle('Error')
              .setAuthor(`${member.user.username}`, member.user.avatarURL)
              .setDescription(`Mention the user you would like to kiss!`)
              .setColor("RED")
              .setTimestamp()
                message.channel.send(kisserror)
            }
            const kissembed = new Discord.RichEmbed()
            .setTimestamp()
            .setColor("RED")
            .setDescription(`${message.author} gave **${kissuser}** a kiss! 💋`)
            message.channel.send(kissembed)
}

// kill command
else if (message.content.startsWith(`${prefix}kill`)) {
  console.log(`COMMAND: ${message.member.displayName} issued kill command.`);
  var killuser = message.mentions.members.first()
            if(!killuser){
              const killerror = new Discord.RichEmbed()
              .setTitle('Error')
              .setAuthor(`${member.user.username}`, member.user.avatarURL)
              .setDescription(`Mention the user you would like to kill!`)
              .setColor("RED")
              .setTimestamp()
                message.channel.send(killerror)
            }
            const killembed = new Discord.RichEmbed()
            .setTimestamp()
            .setColor("RED")
            .setDescription(`${message.author} killed **${killuser}**. 🔪`)
            message.channel.send(killembed)
}

// MEME COMMAND SECTION
// MEME COMMAND SECTION
// MEME COMMAND SECTION

//meme
else if (message.content.startsWith(`${prefix}meme`)) {
  console.log(`COMMAND: ${message.member.displayName} issued meme command.`);
  randomPuppy(sub)
var subreddits = [
  'dankmemes'
]

var sub = subreddits[Math.round(Math.random() * (subreddits.length - 1))];

randomPuppy(sub)
   .then(url => {
       const memeembed = new Discord.RichEmbed()
           .setColor("RED")
           .setTitle("Provided by r/dankmemes")
           .setURL("https://reddit.com/r/dankmemes")
           .setFooter(`Meme requested by ${message.author.tag}.`)
           .setTimestamp()
           .setImage(url);
       message.channel.send(memeembed)
   })
  }


  // edgymeme
  else if (message.content.startsWith(`${prefix}edgymeme`)) {
    console.log(`COMMAND: ${message.member.displayName} issued edgymeme command.`);
    randomPuppy(sub)
  var subreddits2 = [
    'edgymemes'
  ]
  
  var sub2 = subreddits2[Math.round(Math.random() * (subreddits2.length - 1))];
  
  randomPuppy(sub2)
     .then(url => {
         const meme2embed = new Discord.RichEmbed()
         .setColor("RED")
         .setTitle("Provided by r/EdgyMemes")
         .setURL("https://reddit.com/r/edgymemes")
         .setFooter(`Meme requested by ${message.author.tag}.`)
         .setTimestamp()
         .setImage(url);
         message.channel.send(meme2embed)
     })
    }


// NSFW SECTION
// NSFW SECTION
// NSFW SECTION


else if (message.content.startsWith(`${prefix}porngif`)) {
  const nsfwchannelerror = new Discord.RichEmbed()
  .setTitle('Error')
  .setDescription(`You can only use this command in NSFW channels!`)
  .setColor("RED")
  .setTimestamp()
if (!message.channel.nsfw) return message.channel.send(nsfwchannelerror);

  var nsfwgifsubreddits = [
    'porngifs',
]
var nsfwgifsub = nsfwgifsubreddits[Math.round(Math.random() * (nsfwgifsubreddits.length - 1))];

randomPuppy(nsfwgifsub)
        .then(url => {
            const nsfwgifembed = new Discord.RichEmbed()
                .setColor("RED")
                .setAuthor(`Requested by ${message.author.tag}`, message.author.avatarURL)
                .setFooter("Provided by r/porngifs")
                .setTimestamp()
                .setImage(url);
            message.channel.send(nsfwgifembed)
  })
}

// hdporn
else if (message.content.startsWith(`${prefix}nudes`)) {
if (!message.channel.nsfw) return message.channel.send(nsfwchannelerror);

  var nsfwhdsubreddits = [
    'UHDnsfw',
]
var nsfwhdsub = nsfwhdsubreddits[Math.round(Math.random() * (nsfwhdsubreddits.length - 1))];

randomPuppy(nsfwhdsub)
        .then(url => {
          const nsfwhdembed = new Discord.RichEmbed()
          .setColor("RED")
          .setAuthor(`Requested by ${message.author.tag}`, message.author.avatarURL)
          .setFooter("Provided by r/UHDnsfw")
          .setTimestamp()
          .setImage(url);
            message.channel.send(nsfwhdembed)
  })
}


else if (message.content.startsWith(`${prefix}boobs`)) {
  if (!message.channel.nsfw) return message.channel.send(nsfwchannelerror);
  
    var boobsubreddits = [
      'boobies',
  ]
  var boobsub = boobsubreddits[Math.round(Math.random() * (boobsubreddits.length - 1))];
  
  randomPuppy(boobsub)
          .then(url => {
            const boobembed = new Discord.RichEmbed()
            .setColor("RED")
            .setAuthor(`Requested by ${message.author.tag}`, message.author.avatarURL)
            .setFooter("Provided by r/boobies")
            .setTimestamp()
            .setImage(url);
              message.channel.send(boobembed)
    })
  }


  else if (message.content.startsWith(`${prefix}pussy`)) {
    if (!message.channel.nsfw) return message.channel.send(nsfwchannelerror);
    
      var pussysubreddits = [
        'pussy',
    ]
    var pussysub = pussysubreddits[Math.round(Math.random() * (pussysubreddits.length - 1))];
    
    randomPuppy(pussysub)
            .then(url => {
              const pussyembed = new Discord.RichEmbed()
              .setColor("RED")
              .setAuthor(`Requested by ${message.author.tag}`, message.author.avatarURL)
              .setFooter("Provided by r/pussy")
              .setTimestamp()
              .setImage(url);
                message.channel.send(pussyembed)
      })
    }

    else if (message.content.startsWith(`${prefix}boobs`)) {
      if (!message.channel.nsfw) return message.channel.send(nsfwchannelerror);
      
        var boobsubreddits = [
          'boobies',
      ]
      var boobsub = boobsubreddits[Math.round(Math.random() * (boobsubreddits.length - 1))];
      
      randomPuppy(boobsub)
              .then(url => {
                const boobembed = new Discord.RichEmbed()
                .setColor("RED")
                .setAuthor(`Requested by ${message.author.tag}`, message.author.avatarURL)
                .setFooter("Provided by r/boobies")
                .setTimestamp()
                .setImage(url);
                  message.channel.send(boobembed)
        })
      }
});
client.login(token);