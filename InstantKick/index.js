/// <reference types="../CTAutocomplete" />

import PogObject from "PogData";

const data = new PogObject("InstantKick", {
  INSTAnames: []
});
data.save();

function hasIGN(ign) {
  let returnBool = false
  for (let i = 0;i<data.INSTAnames.length;i++) {
      if (data.INSTAnames[i] == ign) {
          returnBool = true
      }
  }
  return returnBool
}

register("Chat", (event) => {
  let unformattedMessage = ChatLib.removeFormatting(ChatLib.getChatMessage(event))
  unformattedMessage = unformattedMessage.replace(/ /g, "").toLowerCase()

  let name = ""
  for (let i = 0; i < unformattedMessage.indexOf("joinedthedungeongroup"); i++) {
      if (i > unformattedMessage.indexOf(">")) {
          name = name + unformattedMessage[i]
      }
  }

  if (hasIGN(name)) {
    ChatLib.command("p kick " + name)
  }

});

register("command", (...args) => {
  if (args[0]) {
    if (!hasIGN(args[0].toLowerCase())) {
      data.INSTAnames.push(args[0])
      data.save()
      ChatLib.chat("§aAdded " + args[0] + " to the kick list.")
    } else {
      ChatLib.chat("§cThat name is already in the list.")
    }
  } else {
    ChatLib.chat("§cUsage: /instantadd <ign>")
  }
}).setName("instantadd")

register("command", (...args) => {
  if (args[0]) {
    if (hasIGN(args[0].toLowerCase())) {
      data.INSTAnames.splice(data.INSTAnames.indexOf(args[0].toLowerCase()),1)
      data.save()
      ChatLib.chat("§aRemoved " + args[0] + " from the kick list.")
    } else {
      ChatLib.chat("§cThat name isn't currently in the list.")
    }
  } else {
    ChatLib.chat("§cUsage: /instantadd <ign>")
  }
}).setName("instantremove")

register("command", () => {
  string = "§2Mod currently checks for:\n"
  for (let i = 0; i < data.INSTAnames.length; i++) {
      if (i != data.INSTAnames.length - 1) {
          string = string + "§a" + data.INSTAnames[i] + ", "
      } else {
          string = string + "§a" + data.INSTAnames[i]
      }
  }
  ChatLib.chat(string)
}).setName("instantlist")