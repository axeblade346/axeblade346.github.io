@echo Started downloads

@echo Getting custom files
 curl https://github.com/axeblade346/LMASKLO/blob/main/Infinity2/LSA.js --output LSA.js --ssl-no-revoke
curl https://github.com/axeblade346/LMASKLO/blob/main/Infinity2/index.html --output index.html --ssl-no-revoke
@echo Getting needed files from Orginal webmap
	curl https://andistyr.github.io/wu-map/14901/map.js --output map.js --ssl-no-revoke
	curl https://andistyr.github.io/wu-map/14901/removegoogle.js --output removegoogle.js --ssl-no-revoke
	curl https://andistyr.github.io/wu-map/14901/style.css --output style.css --ssl-no-revoke
md CSS	    
cd CSS	    
	curl https://andistyr.github.io/wu-map/14901/css/roboto.css --output roboto.css --ssl-no-revoke
cd ..	    
md images	    
cd images	    
	curl https://andistyr.github.io/wu-map/14901/images/deed_large.png --output deed_large.png --ssl-no-revoke
	curl https://andistyr.github.io/wu-map/14901/images/deed_small.png --output deed_small.png --ssl-no-revoke
	curl https://andistyr.github.io/wu-map/14901/images/deed_solo.png --output deed_solo.png --ssl-no-revoke
	curl https://andistyr.github.io/wu-map/14901/images/guard_tower.png --output guard_tower.png --ssl-no-revoke
	curl https://andistyr.github.io/wu-map/14901/images/poi.png --output poi.png --ssl-no-revoke
cd..	    
md scripts	    
cd scripts	    
	curl https://andistyr.github.io/wu-map/scripts/cookies.min.js --output cookies.min.js --ssl-no-revoke
	curl https://andistyr.github.io/wu-map/scripts/jquery.min.js --output jquery.min.js --ssl-no-revoke
	curl https://andistyr.github.io/wu-map/scripts/transparency.min.js --output transparency.min.js --ssl-no-revoke
cd..	   
@echo Downloads complete
@echo press any key to exit
pause
