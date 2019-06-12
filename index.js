//https://discordapp.com/oauth2/authorize?client_id=583090616708366346&scope=bot

const Discord = require('discord.js');
const client = new Discord.Client();
const botconfig = require('./config.json');

//user = message.member;
//user = user.toString();

var Queue = [];
var total = 0;

client.once('ready', () => {

    console.log(`${client.user.username} is online!`);
    client.user.setActivity("$Help", {type: "LISTENING"});
});

client.on('message', message => {

    let prefix = botconfig.prefix;
    let msgArray = message.content.split(" ");
    let cmd = msgArray[0];
    let args = msgArray.slice(1);

    if(message.channel.type == "dm"){

        return;
    }

    if(message.content.startsWith(`$clear`)){

        if(message.member.hasPermission("CHANGE_NICKNAME") == 0){

            message.channel.send("Bu komutu kullanmak için yetkiniz yok!");

            return;
        }

        for(let i = 0;  i < total;  i++){

            delete(Queue[i]);
        }

        total = 0;

        message.channel.send("Sıra resetlendi!");
    }

    if(message.content.startsWith(`$list`)){

        if(total == 0){

            message.channel.send("Sırada kimse yok");
        }
        else{

            var msg = "**Town of Salem Sırası**";
            var printUser;

            for(let i = 0;  i < total;  i++){
                
                printUser = Queue[i].username;
                msg = msg + `\n[${i+1}] - ${printUser}`;
            }

            message.channel.send(msg);
        }
    }

    if(message.content.startsWith(`$apply`)){

        var check = 0;
        let newPerson = message.member.user;

        for(let i = 0;  i < total;  i++){
        
            check = 0;

            if(Queue[i] == newPerson){

                message.channel.send(`Zaten sıradasınız!`);
                check = 1;
                break;
            }
        }

        if(check == 0){

            Queue[total] = newPerson;
            total++;
            message.channel.send(`${newPerson} sıraya eklendi!`);
        }
        
    }

    if(message.content.startsWith(`$leave`)){

        let delPerson = message.member.user;
        var z = 0;

        for(let i = 0;  i < total;  i++){
    
            z = 0;

            if(Queue[i] == delPerson){
                
                if(i+1 == total){
                    
                    delete(Queue[i]);
                    total--;
                }
                else{
                    
                    for(let k = i;  k < total;  k++){
                        
                        Queue[k] = Queue[k+1]
                    }
                    
                    total--;
                }

                z = 1;
                break;
            }
        }

        if(z == 0){

            message.channel.send(`Zaten sırada değilsiniz!`);
        }

        if(z == 1){

            message.channel.send(`${delPerson} sıradan çıkarıldı!`);
        }
    }

    if(message.content.startsWith(`$call`)){

        if(message.member.hasPermission("CHANGE_NICKNAME") == 0){

            message.channel.send("Bu komutu kullanmak için yetkiniz yok!");

            return;
        }

        if(total == 0){

            message.channel.send("Sırada çağrılacak kimse yok!");
        }
        else{

            let sendUser = Queue[0];
            message.channel.send(`${sendUser} adlı kullanıcıya mesaj gönderildi!`);
            sendUser.send("Town of Salem'de sıra sizde");
        }
    }

    if(message.content.startsWith(`$help`)){

        var msg = "```Salem Bot\nEmre Turan (aka Riacti0n, Joseph Kerr, FL0W) tarafından geliştirilen bir bot```"
        var msg2 = "```Komutlar\n$apply - Sıraya girmenizi sağlar\n$leave - Sıradan ayrılmanızı sağlar\n$list - Sırayı yazdırır\n$clear - Sırayı temizler[*]\n$call - Sıradaki kişiye bir çağırma mesajı gönderir[*]\n$pop - 1.kişiyi sıradan çıkarır[*]\n\n[*] -> Sadece yetkililerin kullanabileceği komutlar```";
        
        message.channel.send(msg);
        message.channel.send(msg2);
    }

    if(message.content.startsWith(`$pop`)){

        if(message.member.hasPermission("CHANGE_NICKNAME") == 0){

            message.channel.send("Bu komutu kullanmak için yetkiniz yok!");

            return;
        }

        if(total == 0){

            message.channel.send("Sıra zaten boş!");
        }
        else{

            for(let i = 0;  i < total;  i++){

                Queue[i] = Queue[i+1];
            }

            total--;

            message.channel.send("Sıra güncellendi!");
        }
    }
});

client.login('NTgzMDkwNjE2NzA4MzY2MzQ2.XO3cpw.EdotQVasZvTvtT9AJyGNxUSHTsI');