
	@echo Switching to Map : Infinity4
md Infinity4
cd Infinity4	
	@echo Started downloads
	@echo Getting needed files from Orginal webmap
	@echo -- Not updated-- curl https://andistyr.github.io/wu-map/14902//index.html --output index.html --ssl-no-revoke
	curl https://andistyr.github.io/wu-map/14902//map.js --output map.js --ssl-no-revoke
	curl https://andistyr.github.io/wu-map/14902//removegoogle.js --output removegoogle.js --ssl-no-revoke
	curl https://andistyr.github.io/wu-map/14902//style.css --output style.css --ssl-no-revoke
md CSS	
cd CSS	
	curl https://andistyr.github.io/wu-map/14902/css/roboto.css --output roboto.css --ssl-no-revoke
cd ..	
md images	
cd images	
curl https://andistyr.github.io/wu-map/14902/images/deed_large.png  --output   deed_large.png --ssl-no-revoke
curl https://andistyr.github.io/wu-map/14902/images/deed_large_icon.png  --output   deed_large_icon.png --ssl-no-revoke
curl https://andistyr.github.io/wu-map/14902/images/deed_small.png  --output   deed_small.png --ssl-no-revoke
curl https://andistyr.github.io/wu-map/14902/images/deed_small_icon.png  --output   deed_small_icon.png --ssl-no-revoke
curl https://andistyr.github.io/wu-map/14902/images/deed_solo.png  --output   deed_solo.png --ssl-no-revoke
curl https://andistyr.github.io/wu-map/14902/images/deed_solo_icon.png  --output   deed_solo_icon.png --ssl-no-revoke
curl https://andistyr.github.io/wu-map/14902/images/feature_harbour.png  --output   feature_harbour.png --ssl-no-revoke
curl https://andistyr.github.io/wu-map/14902/images/feature_inn.png  --output   feature_inn.png --ssl-no-revoke
curl https://andistyr.github.io/wu-map/14902/images/feature_mailbox.png  --output   feature_mailbox.png --ssl-no-revoke
curl https://andistyr.github.io/wu-map/14902/images/feature_market.png  --output   feature_market.png --ssl-no-revoke
curl https://andistyr.github.io/wu-map/14902/images/feature_merchant.png  --output   feature_merchant.png --ssl-no-revoke
curl https://andistyr.github.io/wu-map/14902/images/feature_trader.png  --output   feature_trader.png --ssl-no-revoke
curl https://andistyr.github.io/wu-map/14902/images/guard_tower.png  --output   guard_tower.png --ssl-no-revoke
curl https://andistyr.github.io/wu-map/14902/images/guard_tower_icon.png  --output   guard_tower_icon.png --ssl-no-revoke
curl https://andistyr.github.io/wu-map/14902/images/harbour.png  --output   harbour.png --ssl-no-revoke
curl https://andistyr.github.io/wu-map/14902/images/home_hover.png  --output   home_hover.png --ssl-no-revoke
curl https://andistyr.github.io/wu-map/14902/images/home_off.png  --output   home_off.png --ssl-no-revoke
curl https://andistyr.github.io/wu-map/14902/images/home_on.png  --output   home_on.png --ssl-no-revoke
curl https://andistyr.github.io/wu-map/14902/images/inn.png  --output   inn.png --ssl-no-revoke
curl https://andistyr.github.io/wu-map/14902/images/location_icon.png  --output   location_icon.png --ssl-no-revoke
curl https://andistyr.github.io/wu-map/14902/images/market.png  --output   market.png --ssl-no-revoke
curl https://andistyr.github.io/wu-map/14902/images/merchant_icon.png  --output   merchant_icon.png --ssl-no-revoke
curl https://andistyr.github.io/wu-map/14902/images/mine.png  --output   mine.png --ssl-no-revoke
curl https://andistyr.github.io/wu-map/14902/images/mine_icon.png  --output   mine_icon.png --ssl-no-revoke
curl https://andistyr.github.io/wu-map/14902/images/not_the_coords.png  --output   not_the_coords.png --ssl-no-revoke
curl https://andistyr.github.io/wu-map/14902/images/poi.png  --output   poi.png --ssl-no-revoke
curl https://andistyr.github.io/wu-map/14902/images/poi_bridge.png  --output   poi_bridge.png --ssl-no-revoke
curl https://andistyr.github.io/wu-map/14902/images/poi_bridge_icon.png  --output   poi_bridge_icon.png --ssl-no-revoke
curl https://andistyr.github.io/wu-map/14902/images/poi_fountain.png  --output   poi_fountain.png --ssl-no-revoke
curl https://andistyr.github.io/wu-map/14902/images/poi_fountain_icon.png  --output   poi_fountain_icon.png --ssl-no-revoke
curl https://andistyr.github.io/wu-map/14902/images/poi_icon.png  --output   poi_icon.png --ssl-no-revoke
curl https://andistyr.github.io/wu-map/14902/images/poi_statue.png  --output   poi_statue.png --ssl-no-revoke
curl https://andistyr.github.io/wu-map/14902/images/poi_statue_icon.png  --output   poi_statue_icon.png --ssl-no-revoke
curl https://andistyr.github.io/wu-map/14902/images/resource.png  --output   resource.png --ssl-no-revoke
curl https://andistyr.github.io/wu-map/14902/images/resource_icon.png  --output   resource_icon.png --ssl-no-revoke
curl https://andistyr.github.io/wu-map/14902/images/ruins.png  --output   ruins.png --ssl-no-revoke
curl https://andistyr.github.io/wu-map/14902/images/ruins_icon.png  --output   ruins_icon.png --ssl-no-revoke
curl https://andistyr.github.io/wu-map/14902/images/trader_icon.png  --output   trader_icon.png --ssl-no-revoke
curl https://andistyr.github.io/wu-map/14902/images/tree.png  --output   tree.png --ssl-no-revoke
curl https://andistyr.github.io/wu-map/14902/images/tree_harvest.png  --output   tree_harvest.png --ssl-no-revoke
curl https://andistyr.github.io/wu-map/14902/images/tree_icon.png  --output   tree_icon.png --ssl-no-revoke

cd..	
md scripts	
cd scripts	
	curl https://andistyr.github.io/wu-map/14902/scipts/cookies.min.js --output cookies.min.js --ssl-no-revoke
	curl https://andistyr.github.io/wu-map/14902/scipts/jquery.min.js --output jquery.min.js --ssl-no-revoke
	curl https://andistyr.github.io/wu-map/14902/scipts/transparency.min.js --output transparency.min.js --ssl-no-revoke
cd..	   
cd..	