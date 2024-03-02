/**
 * AudiOctopus
 * Copyright (C) 2024  Nathan Menny
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

const fs = require("fs");
const path = require("path");

const { SlashCommandBuilder } = require("discord.js");

const { createFolderName } = require(path.join(__dirname, "..", "..", "utils", "playlistUtils.js"));

const command = new SlashCommandBuilder()
    .setName("playlist-info")
    .setDescription("Displays information about the playlist.")
    .addStringOption(opt =>
        opt.setName("playlist-name")
            .setDescription("The name of the playlist.")
            .setMaxLength(30)
            .setRequired(true)
    )
    .addIntegerOption(opt =>
        opt.setName("from")
            .setDescription("The index in the playlist to start the listing. (starts at 1)")
    )

async function execute(interact) {
    const folderName = createFolderName(interact.guildId);
    const fileName = interact.options.getString("playlist-name");
    const completePath = path.join(folderName, fileName + ".json");

    if(!fs.existsSync(completePath)) {
        await interact.reply({ content: `Playlist "${fileName}" already exists.`, ephemeral: true });
        return;
    }

    const playlist = require(completePath);

    await interact.deferReply();

    const playlistInArray = Object.keys(playlist);
    let playlistContent = "";
    let musicIdx = interact.options.getInteger("from") ?? 1;
    if(musicIdx <= 0 || musicIdx > playlistInArray.length) musicIdx = 1;
    
    for(; musicIdx <= playlistInArray.length; musicIdx++) {
        const music = playlist[playlistInArray[musicIdx-1]];

        playlistContent += `\n${musicIdx}) _${music}_`;
    }

    await interact.editReply({ content: `Playlist "${fileName}" contains: ${playlistContent}`, ephemeral: true });
}

module.exports = {
    data: command,
    execute,
}