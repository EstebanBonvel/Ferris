curl -o steam.json http://api.steampowered.com/ISteamApps/GetAppList/v0002/?key=STEAMKEY&format=json
echo "Updated on the $(date +"%d-%m-%Y") at $(date +"%T")" >> ./infos.txt
exit