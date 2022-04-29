function download_and_compile {
	curl $1 -o $2.txt
	deno run -A cord_parse.js $2.txt $2.gcode
}

download_and_compile https://cdn.discordapp.com/attachments/805055812376330241/959832841359880223/erika.txt erika
download_and_compile https://cdn.discordapp.com/attachments/805055812376330241/959832841548611615/katyusha.txt katyusha
download_and_compile https://cdn.discordapp.com/attachments/805055812376330241/959832841737363517/rickroll.txt rickroll
download_and_compile https://cdn.discordapp.com/attachments/805055812376330241/959852424330375193/amogus.txt amogus
download_and_compile https://cdn.discordapp.com/attachments/805055812376330241/959852424523288646/shinzou_wo_sasageyo.txt shinzou_wo_sasageyo
download_and_compile https://cdn.discordapp.com/attachments/805055812376330241/959852424779149452/this_game.txt this_game
download_and_compile https://cdn.discordapp.com/attachments/805055812376330241/959852424997249114/westerwald.txt westerwald
