
module.exports = {
    name: "guess",
    description: "Guess a word!",
    requiresGame: true,
    requiresTurn: true,
    usage: "-guess [words...]\n-guess plane\n-guess plane bird bomb",
    exe(message, args, handler, game, player) {
        if (player.team.guesses === false) return message.channel.send("**✖ | The spymaster hasn't given the clue!**");
        if (player.team.spymaster.user.id == message.author.id) return message.channel.send("**✖ | The spymaster cannot use this command!**");
        if (!args.length) return message.channel.send("**✖ | You need to provide at least 1 word!**");
       if (args[0].includes(" | ")) args = args[0].split(" | ");
        if (!args.length) return message.channel.send("**✖ | You need to provide at least 1 word!**");
        if (args.length > player.team.guesses) return message.channel.send("**✖ | You cannot guess this many words!**");
        let res = '';
        let sent = false;
        for (let wordA of args) {
            let og = game.words.find(w => w.word == wordA.toLowerCase());
            if (player.team.guesses === 0) {
                sent = true;
                return message.channel.send(res);
            }
            const word = player.team.guess(wordA);
             if (!og && !res.includes(`**✖ | \`${wordA}\` isn't on the board!**\n`)) res += `**✖ | \`${wordA}\` isn't on the board!**\n`;
             else if (word === 1 && !res.includes(`**✖ | The word \`${wordA}\` has already been guessed!**`)) res += `**✖ | The word \`${wordA}\` has already been guessed!**`;
             else if (word === false) {
                sent = true;
                 res += `**${og.emoji} | The word \`${og.word}\` is a${og.clearType.startsWith("a") ? "n":""} \`${og.clearType}\`!**\n`;
                message.channel.send(res);
                return player.team.guesses = 0;
             }else {
                 res += `**${og.emoji} | The word \`${og.word}\` is a \`${og.clearType}\`! You have \`${player.team.guesses}\` guesses left!**\n`;
             }
        }
        if (!sent) return message.channel.send(res);
    }
}
