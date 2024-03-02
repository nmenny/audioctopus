# AudiOctopus

A Discord bot to play music in audio channels.

## Installation

### Requirements

The project relies on **node v20**.

### Install

To install the dependencies, run the following command :

```bash
npm ci
```

### Setup

To setup the bot, you must define a `.env` file containing the following variables :

```txt
TOKEN=<token of your Discord bot>
CLIENT_ID=<id of the application>
GUILD_ID=<id of the development guild> (mandatory if ENV is not "deployment")
ENV=<"development" or "deployment"> (default is "deployment")
```

For the `ENV` variable, if its value is "development" the commands are only updated in the Discord Server with the id `GUILD_ID` otherwise the commands are updated in all the Discord Servers where the bot can execute / (SLASH) commands.

The `GUILD_ID` and `ENV` must be defined only if you want to deploy in "development" mode.

### Start

Firstly, the commands must be deployed in the target servers. To do so, execute the script `deploy-commands.js` using the following command :

```bash
node deploy-commands.js
```

And then, the Bot can be started with the following command :

```bash
node .
```

## Available commands for audio

### /connect

Connects to an audio channel.

Usage: `/connect channel`

Details:   
- `channel`: the audio channel to connect to. If the bot is already connected, this connexion replaces the old one.

Result:    

The command returns a message to notice whether the bot has been able to connect or not.

### /disconnect

Disconnects the bot from the current audio channel.

Usage `/disconnect`

Result:

The commands informs the user if the bot has been successfully disconnected or not.

### /play from-file

Plays an audio file in a discord channel.

Usage: `/play from-file file [loop]`

Details:
- `file`: a file to play. Must be one of .mp3, .webm or .ogg
- `loop`: (**optional**) if <tt>true</tt> plays the audio in a loop.

Warnings: The bot must be connected to a channel in order for it to work.

Result:

The commands tells the name of the playing file. 

### /play from-youtube

Plays a Youtube music in a discord channel.

Usage: `/play from-youtube link [loop]`

Details:
- `link`: a link to a youtube video.
- `loop`: (**optional**) if <tt>true</tt> plays the audio in a loop.

Warnings: The bot must be connected to a channel in order for it to work.

Result:

The commands tells the name of the playing video. 

### /hyperloop

Activates/Deactivated the loopback function for the music.

Usage: `/hyperloop activated`

Details:
- `activated`: if <tt>true</tt>, the loopback is activated

Warnings: The bot must be connected to a channel in order for it to work.

Result:

The commands tells the new status of the loopback function.

### /pause

Pauses the currently playing music.

Usage: `/pause`

Warnings: The bot must be connected to a channel in order for it to work.

Result:

The commands tells if it has successfully paused the music.

### /continue

Continues to play the current music.

Usage: `/continue`

Warnings: The bot must be connected to a channel in order for it to work.

Result:

The commands tells if it has successfully unpaused the music.

### /stop

Stops to play the current music.

Usage: `/stop`

Warnings: The bot must be connected to a channel in order for it to work.

Result:

The commands tells if it has successfully stopped the music.

### /status

Display information about the current music.

Usage: `/status`

Warnings: The bot must be connected to a channel in order for it to work.

Result:

The name and the status of the loopback function is indicated (on or off).

## Available commands for playlists

### /create-playlist

Creates a new playlist to store musics.

Usage: `/create-playlist playlistName`

Details:
- `playlistName`: the name of the playlist to create.

Result:

The commands tells if the playlist has been successfully created or if it already exists.