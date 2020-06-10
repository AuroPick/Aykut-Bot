const Discord = require("discord.js");
const client = new Discord.Client();
const prefix = "?";
const ownerID = "231457748422885378";

client.on("message", message => {
    
    let args = message.content.slice(prefix.length).trim().split(" ");
    let cmd = args.shift().toLowerCase();

    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;

    try {

        delete require.cache[require.resolve(`./commands/${cmd}.js`)];

        let ops = {
            ownerID: ownerID
        }

        let commandFile = require(`./commands/${cmd}.js`);
        commandFile.run(client, message, args, ops);

    } catch (e) {
        console.log(e);
    }
})

client.on("ready", () => {
    console.log(`${client.user.username} basarili bir sekilde baglandi!`)
	client.user.setActivity(`Prefix: "${prefix}" | ${prefix}yardim | ${client.user.username} Online!`)
})

client.login(process.env.token);