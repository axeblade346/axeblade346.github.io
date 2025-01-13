// Locate Soul Assitant (LSA for short) for Wurm Unlimited.
// Originaly Made by MrBannaner, Updates and GUI by Axeblade346 
//____________________________________________________________

// Please feel free to use this code as you wish, but please give credit where due.
//____________________________________________________________

//For ease of use always look North when getting the direction message
//This code will work with most locate soul messages, but its set to loot maps as used Sklotopolis servers.
//____________________________________________________________

// Message to SERVER OWNERS from Axeblade346
// Programs / Scripts like this has been around since I originaly made the searchable Delevirance map website back in late 2011.
// I used tansparent image overlays to mark the deeds, others basicly used my code and just overlay images of archs.
// I have seen it pop up on a russian site for another games web map (and their code works on our webmaps with a few oddities) and a few days later MrBannaner showed me his version that worked on Kenabil Web Map via Canvas.
// As this can`t be deteced and can`t be stopped I deciced to level the playing field and make an easy to use public version so that all the players can be on a level playing field.
//____________________________________________________________

// Players can copy the code and run it via the build in consoles (Google Chrome, Firefox, Edge) or via a userscript manager like GreaseMonkey or TamperMonkey.
// They can also self host it on thier PC or on a webpage host
// Server owners can use this code to make thier own version of the Locate Soul Assistant for thier server and web map.
//____________________________________________________________


// Thanks to The Scallywag server (Owner : Killem) for allowing me test the Kenabil web map on their server and the players for thier feedback.
// Thanks to the Players of KangaWu server (Owner: Budda) for your support in development 
//____________________________________________________________


//Version Notes.
//K1 - Base code done - MrBannaner
//K2 - Updated it from a GreaseMonkey to Javascript for use in chrome - Axeblade346
//K3 - Added usage comments and guide - Axeblade346
//K4 - Added the ls funtion so only X Y and event message is needed - Axeblade346
//K5 - Intergration into the Kenabil Web Map with UI - Axeblade346 (not this version, its an option on Kenabils map linked above)
//----------------
//S0.5 - Rewrite to work on Andistyr Web Map to add support for Skotopolis servers & other using it, Note it Removes all support for the now missing Kenabil Web Map (there is backups of the K versions , please ask if you need it)
//s0.6 - added connection lines between Min and Max points - Axeblade346 
//     - (note: A to B Lines are suppose to arc according to the raduis but cant be added atm with google maps api limitations , need to write custom code)
//     - fixed a small bug at pretty close by distance - Axeblade346
//____________________________________________________________


//
var LSACountLine = [] ; //used to count the number of LSA Line draws
var LSACountPoly = [] ; //used to count the number of LSA Poly draws

//main function
//translate ingame event message to a direction and distance
function LSA (gpsmessage,eventmessage)
{
	//x and y is ar read from gpsmessage
	//other values are read from eventmessage
	let eventstr = eventmessage;
	var LSAdirection = 0;
	var LSAmin = 0;
	var LSAmax = 0;
	
		//get direction from eventmessage
		//Note the order is odd due to the fact that that some eventstrings contain the same words
		if (eventstr.includes("ahead of you to the right")==true){
			LSAdirection=1;
		}else if (eventstr.includes("behind you to the right")==true){
			LSAdirection=3;
		}else if (eventstr.includes("behind you to the left")==true){
			LSAdirection=5;
		}else if (eventstr.includes("ahead of you to the left")==true){
			LSAdirection=7;
		}else if (eventstr.includes("in front of you")==true){
			LSAdirection=0;
		}else if (eventstr.includes("right of you")==true){
			LSAdirection=2;
		}else if (eventstr.includes("behind you")==true){
			LSAdirection=4;
		}else if (eventstr.includes("left of you")==true){
			LSAdirection=6;
		}
		
		//get distance from eventmessage
		//Note the order is odd due to the fact that that some eventstrings contain the same words
		if (eventstr.includes("practically standing")==true){
			LSAmin=0;
			LSAmax=0;
		}else if (eventstr.includes("stone's throw away")==true){
			LSAmin=1;
			LSAmax=3;
		}else if (eventstr.includes("very close")==true){
			LSAmin=4;
			LSAmax=5;
		}else if (eventstr.includes("pretty close by")==true){
			LSAmin=6;
			LSAmax=9;
		}else if (eventstr.includes("fairly close by")==true){
			LSAmin=10;
			LSAmax=19;
		}else if (eventstr.includes("quite some distance")==true){
			LSAmin=50;
			LSAmax=199;
		}else if (eventstr.includes("rather a long distance")==true){
			LSAmin=200;
			LSAmax=499;
		}else if (eventstr.includes("pretty far away")==true){
			LSAmin=500;
			LSAmax=999;
		}else if (eventstr.includes("very far away")==true){
			LSAmin=2000;
			LSAmax=10000;
		}else if (eventstr.includes("some distance")==true){
			LSAmin=20;
			LSAmax=49;
		}else if (eventstr.includes("far away")==true){
			LSAmin=1000;
			LSAmax=1999;
		}
LSAtoGMA(gpsmessage,LSAdirection,LSAmin,LSAmax)		
}

//translates the gpsmessage to XY + work out Length of lines to draw
function LSAtoGMA (gpsmessage,LSAdirection,LSAmin,LSAmax)	
{
	//convert gpsmessage to x and y
	// Format : [06:43:59] Your current coordinates are: x: 1456   y: 2287

	let gpsstr = gpsmessage;
	let gpssplit = gpsstr.split("x:").pop();
	let LSAgpsx = parseInt(gpssplit.split('y')[0])
	let LSAgpsy = parseInt(gpssplit.split('y:')[1])
	LSAArchcalc (LSAgpsx,LSAgpsy,LSAdirection,LSAmin,LSAmax);
}

//Translate the direction to a degree , Google maps uses East (+ X) as 0 Degrees and goes clockwise
function LSAArchcalc (LSAgpsx,LSAgpsy,LSAdirection,LSAmin,LSAmax)
{
	var LSAarchdeg = 0;
/* 
0	270 - NORTH
1	315 - NE
2	0  - EAST
3	45 - SE
4	90 - SOUTH
5	135 - SW
6	180 - WEST
7	225 - NW
*/

if (LSAdirection==0) { LSAarchdeg=270; }
else if (LSAdirection==1) { LSAarchdeg=315; }
else if (LSAdirection==2) { LSAarchdeg=0; }
else if (LSAdirection==3) { LSAarchdeg=45; }
else if (LSAdirection==4) { LSAarchdeg=90; }
else if (LSAdirection==5) { LSAarchdeg=135; }
else if (LSAdirection==6) { LSAarchdeg=180; }
else if (LSAdirection==7) { LSAarchdeg=225; }

LSADraw (LSAgpsx,LSAgpsy,LSAarchdeg,LSAmin,LSAmax)	
}

// converts the angle and distance to points on the map and draws the lines
function LSADraw (LSAgpsx,LSAgpsy,LSAarchdeg,LSAmin,LSAmax)	
{
var LSAOriginX = LSAgpsx;
var LSAOriginY = LSAgpsy;
var LSAarchdegA = LSAarchdeg - 22.5; // angle of A line from centre
var LSAarchdegB = LSAarchdeg + 22.5;  // angle of B line from centre
// convert degrees to radians
var LSAminAX = LSAOriginX + LSAmin * Math.cos(LSAarchdegA * Math.PI / 180);
var LSAminAY = LSAOriginY + LSAmin * Math.sin(LSAarchdegA * Math.PI / 180);
var LSAmaxAX = LSAOriginX + LSAmax * Math.cos(LSAarchdegA * Math.PI / 180);
var LSAmaxAY = LSAOriginY + LSAmax * Math.sin(LSAarchdegA * Math.PI / 180);
var LSAminBX = LSAOriginX + LSAmin * Math.cos(LSAarchdegB * Math.PI / 180);
var LSAminBY = LSAOriginY + LSAmin * Math.sin(LSAarchdegB * Math.PI / 180);
var LSAmaxBX = LSAOriginX + LSAmax * Math.cos(LSAarchdegB * Math.PI / 180);
var LSAmaxBY = LSAOriginY + LSAmax * Math.sin(LSAarchdegB * Math.PI / 180);


/*-
//draws the lines and orgin dot on the map
//REMEMBER to send the color value too
LSADrawline (LSAOriginX,LSAOriginY,LSAOriginX+1,LSAOriginY+1,"#FF0000"); //start point
LSADrawline (LSAminAX,LSAminAY,LSAmaxAX,LSAmaxAY,"#2196f3"); //side A
LSADrawline (LSAminBX,LSAminBY,LSAmaxBX,LSAmaxBY,"#2196f3"); //side B
LSADrawline (LSAminAX,LSAminAY,LSAminBX,LSAminBY,"#FFC300"); //Connect mins
LSADrawline (LSAmaxAX,LSAmaxAY,LSAmaxBX,LSAmaxBY,"#FFC300"); //Connect mins
*/
//draws the lines and orgin dot on the map 
// REMEMBER to send the color value too
LSADrawline (LSAOriginX,LSAOriginY,LSAOriginX+1,LSAOriginY+1,"#FF0000"); //start point

//draws the polygon for the search area
LSAPolygon (LSAminAX,LSAminAY,LSAminBX,LSAminBY,LSAmaxAX,LSAmaxAY,LSAmaxBX,LSAmaxBY,"#2196f3","#FF0000"); //draw the polygon
}


// code to draws the lines on the map
// REMEMBER to send the color value too
let LSAPath;
function LSADrawline (LSAxs,LSAys,LSAxe,LSAye,LSALinecolor)
{
	//convert X Y to Lat Long for google maps API
	var LSAstartCoordinates = projection.fromPointToLatLng(projection.fromCoords({
        x: LSAxs, 
        y: LSAys 
    }));

var LSAendCoordinates = projection.fromPointToLatLng(projection.fromCoords({
		x: LSAxe,
        y: LSAye 
    }));

var LSACoordinates = [
		{lat: LSAstartCoordinates.lat(), lng: LSAstartCoordinates.lng()},
		{lat: LSAendCoordinates.lat(), lng: LSAendCoordinates.lng()}
    ];


LSAPath = new google.maps.Polyline({
	  path: LSACoordinates,
	  geodesic: false,
	  strokeColor: LSALinecolor,
	  strokeOpacity: 0.8,
	  strokeWeight: 5
	});
	LSACountLine.push(LSAPath);
LSAPath.setMap(map);
}

let LSAPoly
function LSAPolygon (LSAminAX,LSAminAY,LSAminBX,LSAminBY,LSAmaxAX,LSAmaxAY,LSAmaxBX,LSAmaxBY,LSAPolyLinecolor,LSAPolyFillcolor)
{
	//convert X Y to Lat Long for google maps API
	
	//Min A
	var LSAstartCoordinates = projection.fromPointToLatLng(projection.fromCoords({
        x: LSAminAX, 
        y: LSAminAY 
    }));

	//Min B
	var LSAendCoordinates = projection.fromPointToLatLng(projection.fromCoords({	
		x: LSAminBX, 
        y: LSAminBY 
    }));

	//Max A
	var LSAstartCoordinates2 = projection.fromPointToLatLng(projection.fromCoords({
		x: LSAmaxAX, 
		y: LSAmaxAY 
	}));
	//max B
	var LSAendCoordinates2 = projection.fromPointToLatLng(projection.fromCoords({
		x: LSAmaxBX,
		y: LSAmaxBY
	}));

  // Define the LatLng coordinates for the polygon's path.
  var triangleCoords = [
	LSAstartCoordinates, LSAendCoordinates, LSAendCoordinates2, LSAstartCoordinates2
  ];
  // Construct the polygon.
	LSAPoly  = new google.maps.Polygon({
    paths: triangleCoords,
    strokeColor: LSAPolyLinecolor,
    strokeOpacity: 0.8,
    strokeWeight: 5,
    fillColor: LSAPolyFillcolor,
    fillOpacity: 0.1,
  });
  LSACountPoly.push(LSAPoly);
  LSAPoly.setMap(map);
}

//remove all the drawings and set arays to 0 to empty them
function LSAClearFunc() {
			for (i=0; i<LSACountLine.length; i++)
			{
			LSACountLine[i].setMap(null);
		}

		for (i=0; i<LSACountPoly.length; i++)
			{
			LSACountPoly [i].setMap(null);
			}
			LSACountLine.length = 0;
			LSACountPoly.length = 0;
  }
