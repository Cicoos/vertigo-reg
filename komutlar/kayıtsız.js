const { MessageEmbed } = require("discord.js");
const ms = require("ms");
const ayarlar = require('../ayarlar.json');
const moment = require('moment')
const prefix = ayarlar.prefix;

module.exports.run = async (client, message, args) => {

if(![(ayarlar.yetkilirol)].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) 
return message.reply(`Bu işlemi sadece yetkililer yapabilir!!!`).then(x => x.delete({timeout:5000}))
  
let kayıtsız = message.guild.roles.cache.find(r => r.id === ayarlar.kayıtsızrol)

let kullanici = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));
if(!kullanici) return message.channel.send(new MessageEmbed().setDescription(`${message.author}, Bir kullanıcı etiketlemelisin.`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('PURPLE').setTimestamp()).then(x => x.delete({timeout: 5000}));
if(message.member.roles.highest.position <= kullanici.roles.highest.position) return message.channel.send(new MessageEmbed().setDescription(`${message.author}, Etiketlenen kullanıcı sizden üst/aynı pozisyondadır.`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('PURPLE').setTimestamp()).then(x => x.delete({timeout: 5000}));
if(kullanici.id === message.author.id)return message.channel.send(new MessageEmbed().setDescription(`${message.author}, Kendini kayıtsıza atamazsın.`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('PURPLE').setTimestamp()).then(x => x.delete({timeout: 5000}));
if(kullanici.id === client.user.id)return message.channel.send(new MessageEmbed().setDescription(`${message.author}, Bir bot Kayıtsıza atılamaz.`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('PURPLE').setTimestamp()).then(x => x.delete({timeout: 5000}));
if(kullanici.id === message.guild.OwnerID) return message.channel.send(new MessageEmbed().setDescription(`${message.author}, Sunucu sahibini Kayıtsıza atamazsın.`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('PURPLE').setTimestamp()).then(x => x.delete({timeout: 5000}));

message.channel.send(new MessageEmbed().setDescription(`${kullanici} Adlı kullanıcıya ${kayıtsız} Rolü Verildi`).setColor('PURPLE').setFooter(message.author.tag, message.author.avatarURL({dynamic: true})).setTimestamp()) 

kullanici.roles.set([kayıtsız])
moment.locale("tr");
message.react('✅')
        

  
}
  exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['kayıtsız','unreg'],
    permLevel: 0,
}

exports.help = {
      name: "unregister"  
  
}