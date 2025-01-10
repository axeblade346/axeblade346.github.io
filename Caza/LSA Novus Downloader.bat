	@echo Started downloads
	@echo Getting custom files
	
	
	@echo Getting needed files from Orginal webmap
	curl https://andistyr.github.io/wu-map/14818//index.html --output index.html --ssl-no-revoke
	curl https://andistyr.github.io/wu-map/14818//map.js --output map.js --ssl-no-revoke
	curl https://andistyr.github.io/wu-map/14818//removegoogle.js --output removegoogle.js --ssl-no-revoke
	curl https://andistyr.github.io/wu-map/14818//style.css --output style.css --ssl-no-revoke
md CSS	
cd CSS	
	curl https://andistyr.github.io/wu-map/14818/css/roboto.css --output roboto.css --ssl-no-revoke
cd ..	
md images	
cd images	
	curl https://andistyr.github.io/wu-map/14818/images/deed_large.png --output deed_large.png --ssl-no-revoke
	curl https://andistyr.github.io/wu-map/14818/images/deed_small.png --output deed_small.png --ssl-no-revoke
	curl https://andistyr.github.io/wu-map/14818/images/deed_solo.png --output deed_solo.png --ssl-no-revoke
	curl https://andistyr.github.io/wu-map/14818/images/guard_tower.png --output guard_tower.png --ssl-no-revoke
	curl https://andistyr.github.io/wu-map/14818/images/poi.png --output poi.png --ssl-no-revoke
cd..	
md scripts	
cd scripts	
	curl https://andistyr.github.io/wu-map/14818/scipts/cookies.min.js --output cookies.min.js --ssl-no-revoke
	curl https://andistyr.github.io/wu-map/14818/scipts/jquery.min.js --output jquery.min.js --ssl-no-revoke
	curl https://andistyr.github.io/wu-map/14818/scipts/transparency.min.js --output transparency.min.js --ssl-no-revoke
cd..	   
@echo Downloads complete	
@echo press any key to exit	
pause	
