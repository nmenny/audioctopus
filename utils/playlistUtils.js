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

const crypto = require('crypto')
const fs = require('fs')
const path = require('path')

function createFolderName(gid) {
    return path.join(__dirname, '..', 'playlist', hash(gid))
}

function getPlaylistPath(gid, playlistName) {
    const folderName = createFolderName(gid)
    return path.join(folderName, playlistName + '.json')
}

function checkPlaylistUser(hashed, uid) {
    return hashed === hash(uid)
}

function createPlaylistStructure(uid) {
    return { list: [], owner: hash(uid) }
}

function playlistExists(gid, playlistName) {
    return fs.existsSync(getPlaylistPath(gid, playlistName))
}

function loadPlaylist(gid, playlistName) {
    const completePath = getPlaylistPath(gid, playlistName)

    if (!fs.existsSync(completePath)) {
        return undefined
    }

    const playlist = require(completePath)

    return playlist
}

function savePlaylist(gid, playlistName, playlist) {
    const completePath = getPlaylistPath(gid, playlistName)

    try {
        fs.writeFileSync(completePath, JSON.stringify(playlist), 'utf8')
        return true
    } catch (err) {
        return false
    }
}

function removePlaylist(gid, playlistName) {
    const completePath = getPlaylistPath(gid, playlistName)
    try {
        fs.rmSync(completePath)
        return true
    } catch (err) {
        return false
    }
}

function hash(clear) {
    return crypto.createHash('RSA-SHA3-256').update(`${clear}`).digest('hex')
}

module.exports = {
    playlistExists,
    createFolderName,
    createPlaylistStructure,
    checkPlaylistUser,
    loadPlaylist,
    savePlaylist,
    removePlaylist,
}
