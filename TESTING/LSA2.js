//  LSA 1.0.5
//  -- Wait for Danky to publish the Direction update of lootmaps before removing old code (lines 38 to 54)
// Uncouple the Towers and Lights form the Lootmap storage

var LSACountLine = [] ; //used to store  LSA Line draws
var LSACountPoly = [] ; //used to store  LSA Poly draws

var LSACountInter = [] ; //used to store LSA Poly Intersecting draws

var LSAPolyArry = [] ; //used to store the polygon points


var LSAdirection;
var LSAmin;
var LSAmax;
var LSAOriginX;
var LSAOriginY;
var LSADeg;
var LSAOutputstring ="";
var LSADivide = 50;  // section of side line
var LSADivDegree = 45 / LSADivide;

//main function
//translate ingame event message to a direction and distance
function LSA (gpsmessage,eventmessage)
{
 	//make sure the report is empty when user clicks the button
	document.getElementById("LSARO").innerHTML = LSAOutputstring;

	//x and y is ar read from gpsmessage
	//other values are read from eventmessage
	var eventstr = eventmessage;
	var gpsstr = gpsmessage;
	
	
		//get direction from eventmessage
		//Note the order is odd due to the fact that that some eventstrings contain the same words
		if (eventstr.includes("ahead of you to the right")==true){
			LSAdirection=315;
		}else if (eventstr.includes("behind you to the right")==true){
			LSAdirection=45;
		}else if (eventstr.includes("behind you to the left")==true){
			LSAdirection=135;
		}else if (eventstr.includes("ahead of you to the left")==true){
			LSAdirection=225;
		}else if (eventstr.includes("in front of you")==true){
			LSAdirection=270;
		}else if (eventstr.includes("right of you")==true){
			LSAdirection=0;
		}else if (eventstr.includes("behind you")==true){
			LSAdirection=90;
		}else if (eventstr.includes("left of you")==true){
			LSAdirection=180;
		}
				
		//Dual MODE for switchover , remove old code above after switchover 
		
		if (eventstr.includes("north")==true && eventstr.includes("northwest")==false && eventstr.includes("northeast")==false){
			LSAdirection=270;
		} else if (eventstr.includes("northeast")==true){
			LSAdirection=315;
		} else if (eventstr.includes("east")==true && eventstr.includes("northeast")==false && eventstr.includes("southeast")==false)
			{LSAdirection=0;
		} else if (eventstr.includes("southeast")==true)
			{LSAdirection=45;
		} else if (eventstr.includes("south")==true && eventstr.includes("southeast")==false && eventstr.includes("southwest")==false)
			{LSAdirection=90;
		} else if (eventstr.includes("southwest")==true)
			{LSAdirection=135;
		} else if (eventstr.includes("west")==true && eventstr.includes("northwest")==false && eventstr.includes("southwest")==false)
			{LSAdirection=180;
		} else if (eventstr.includes("northwest")==true)
			{LSAdirection=225;
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
        //get x and y from gpsmessage
		//TODO : add checks for X : Y: vs Weblink versions of the message
if (gpsstr.includes("http://andistyr.github.io/wu-map")==true)
	{
		//[10:32:57]  http://andistyr.github.io/wu-map/14901/#1464_2271
		var gpssplit = gpsstr.split("#").pop();
		LSAOriginX = parseInt(gpssplit.split('_')[0]);
		LSAOriginY = parseInt(gpssplit.split('_')[1]);
		console.log("LSAREPORT : LSA Origin X: " + LSAOriginX + " LSA Origin Y: " + LSAOriginY);
		LSADraw (LSAOriginX,LSAOriginY,LSAdirection,LSAmin,LSAmax);	
	}
else if(gpsstr.includes("Your current coordinates are:")==true)
	{
		// [10:32:57] Your current coordinates are: x: 1464   y: 2271
        var gpssplit = gpsstr.split("x:").pop();
        LSAOriginX = parseInt(gpssplit.split('y')[0]);
        LSAOriginY = parseInt(gpssplit.split('y:')[1]);
		console.log("LSAREPORT : LSA Origin X: " + LSAOriginX + " LSA Origin Y: " + LSAOriginY);
        LSADraw (LSAOriginX,LSAOriginY,LSAdirection,LSAmin,LSAmax);	
	}
else
{
	LSAOutputstring = "Please check your GPS link it needs to be the /gps link containing 'Your current coordinates are:' or the website link";
	document.getElementById("LSARO").innerHTML = LSAOutputstring;
 	LSAOutputstring ="";

}

}

function LSADraw (LSAOriginX,LSAOriginY,LSAdirection,LSAmin,LSAmax)	
{
// convert degrees to radians
var LSAcenterX = LSAOriginX + ((LSAmax-LSAmin)/2) * Math.cos(LSAdirection * Math.PI / 180);
var LSAcenterY = LSAOriginY + ((LSAmax-LSAmin)/2) * Math.sin(LSAdirection * Math.PI / 180);

LSAOutputstring = LSAOutputstring.concat("Area has been drawn without issue, check the map.");
document.getElementById("LSARO").innerHTML = LSAOutputstring;
LSAOutputstring ="";

LSADeg = LSAdirection - 22.5; // angle of A line from centre

//draw min arch from Amin to Bmin
LSAMindraw();
for (let i = 0; i <= LSADivide; i++)
    {
		LSADeg = LSADeg + LSADivDegree;
		if (LSADeg > 360) {LSADeg = LSADeg - 360;}
		if (LSADeg < 0) {LSADeg = LSADeg + 360;}
		LSAMindraw();
    }

// draw B side
var LSAdiflenght = (LSAmax - LSAmin) / LSADivide;

LSAdif = LSAmin
for (let i = 0; i < LSADivide; i++)
    {
    LSAdif = LSAdif  + LSAdiflenght;
	LSASides(LSAdif);
    }

LSADeg = LSAdirection + 22.5; // angle of B line from centre
// draw Max arch from BMax to AMax


LSAMaxdraw();
for (let i = 0; i <= LSADivide; i++)
    {
		LSADeg = LSADeg - LSADivDegree;
		if (LSADeg > 360) {LSADeg = LSADeg - 360;}
		if (LSADeg < 0) {LSADeg = LSADeg + 360;}
		LSAMaxdraw();
    }

// draw A side
LSAdif = LSAmax
for (let i = 0; i < LSADivide; i++) 
    {
    LSAdif = LSAdif - LSAdiflenght;
	LSASides(LSAdif);
    }

LSAPolygon();
LSADrawline (LSAOriginX,LSAOriginY,LSAOriginX+1,LSAOriginY+1,"#FF0000"); //start point

}

function LSAMindraw()
{
	var LSAMinx = LSAOriginX + LSAmin * Math.cos(LSADeg * Math.PI / 180);
    var LSAMiny = LSAOriginY + LSAmin * Math.sin(LSADeg * Math.PI / 180);
var LSACoordsMinlat = projection.fromPointToLatLng(projection.fromCoords({
	x: LSAMinx, 
	y: LSAMiny 
}));

LSAPolyArry.push(LSACoordsMinlat);
}

function LSASides(LSAdif)
{
	var LSADifx = LSAOriginX + LSAdif * Math.cos(LSADeg * Math.PI / 180);
    var LSADify = LSAOriginY + LSAdif * Math.sin(LSADeg * Math.PI / 180);
var LSACoordsDiflat = projection.fromPointToLatLng(projection.fromCoords({
	x: LSADifx, 
	y: LSADify 
}));

LSAPolyArry.push(LSACoordsDiflat);
}

function LSAMaxdraw()
{
var LSAMaxx = LSAOriginX + LSAmax * Math.cos(LSADeg * Math.PI / 180);
var LSAMaxy = LSAOriginY + LSAmax * Math.sin(LSADeg * Math.PI / 180);
var LSACoordsMaxlat = projection.fromPointToLatLng(projection.fromCoords({
	x: LSAMaxx, 
	y: LSAMaxy 
}));
LSAPolyArry.push(LSACoordsMaxlat);

}

let LSAPoly
function LSAPolygon()
{

	LSAPoly = new google.maps.Polygon({
        paths: LSAPolyArry,
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
		fillColor: "red",
		fillOpacity: 0.01,
		clickable: false,
        editable: false,
        dragable: false

    });
    LSAPoly.setMap(map);
    LSACountPoly.push(LSAPoly);

//draw overlaps if they need to be drawn.
	if (LSACountPoly.length > 1)
	{
		LSAIntersectionCalc();
	}
	LSAPolyArry.length = 0;
}

function createJstsPolygon(geometryFactory, polygon) {
	var path = polygon.getPath();
	var coordinates = path.getArray().map(function name(coord) {
	  return new jsts.geom.Coordinate(coord.lat(), coord.lng());
	});
	if(coordinates[0].compareTo(coordinates[coordinates.length-1]) != 0) 
		coordinates.push(coordinates[0]);
	var shell = geometryFactory.createLinearRing(coordinates);
	return geometryFactory.createPolygon(shell);
}


function LSAIntersectionCalc()
{
var geometryFactory = new jsts.geom.GeometryFactory();
	var LSAOnePolygon = createJstsPolygon(geometryFactory, LSACountPoly[0]);
	var LSATwoPolygon = createJstsPolygon(geometryFactory, LSACountPoly[1]);
	var LSAintersection = LSAOnePolygon.intersection(LSATwoPolygon);
	
	for (i=2; i<LSACountPoly.length; i++)
	if (LSACountPoly.length > i)
		{
			for (j=0; j<LSACountInter.length; j++)
				{
					LSACountInter [j].setMap(null);
				}
				var LSANextPolygon = createJstsPolygon(geometryFactory, LSACountPoly[i]);
				LSAintersection = LSAintersection.intersection(LSANextPolygon);	
		}

		LSAdrawIntersectionArea(map, LSAintersection);

}

function LSAdrawIntersectionArea(map, polygon) {
	var coords = polygon.getCoordinates().map(function (coord) {
		return { lat: coord.x, lng: coord.y };
	});

	var LSAintersectionArea = new google.maps.Polygon({
	  paths: coords,
	  strokeColor: '#00FF00',
	  strokeOpacity: 0.8,
	  strokeWeight: 3,
	  fillColor: '#00FF00',
	  fillOpacity: 0.1,
	  clickable: false,
	  editable: false,
	  dragable: false
	});
	LSAintersectionArea.setMap(map);
	LSACountInter.push(LSAintersectionArea);

// calc "rough" centre of intersection area
	var LSAInterbounds = new google.maps.LatLngBounds();
	var iib;
	
	for (iib = 0; iib < coords.length; iib++) {
		LSAInterbounds.extend(coords[iib]);
	}
	
		console.log("LSAReport : Intersection Centre Lat: " + LSAInterbounds.getCenter().lat() + " Intersection Centre Lng: " + LSAInterbounds.getCenter().lng() );



		var LSATravelstart = projection.fromPointToLatLng(projection.fromCoords({
			x: LSAOriginX, 
			y: LSAOriginY 
		}));


	var LSATravelend = new google.maps.LatLng(LSAInterbounds.getCenter().lat(),LSAInterbounds.getCenter().lng());

	var LSATravelDirection =   LSAcalculateStraightLineDirection(LSATravelstart, LSATravelend);    
	console.log("LSA Report : Straight line direction : ", LSATravelDirection); 

//	N	=	0	->	22,5
//	NE	=	45	->	67,5
//	E	=	90	->	112,5
//	SE	=	135	->	157,5
//	S	=	180	->	202,5
//	SW	=	225	->	247,5
//	W	=	270	->	292,5
//	NW	=	315	->	337,5

if (LSATravelDirection <= 0)
{
	LSATravelDirection  = LSATravelDirection  + 360;
}
console.log("LSA Report : Straight line direction after + 360: ", LSATravelDirection); 


	// BUG : Reporting all wrong... 

var LSATravelDirectionText = "";
	if ( LSATravelDirection <= 22.5)
		{
			LSATravelDirectionText = "N";
		}
	else if ( 22.5 <= LSATravelDirection && LSATravelDirection <= 67.5)
		{
			LSATravelDirectionText = "NE";
		}
	else if ( 67.5 <= LSATravelDirection && LSATravelDirection <=112.5)
		{
			LSATravelDirectionText = "E";
		}
	else if ( 112.5 <= LSATravelDirection && LSATravelDirection <= 157.5)
		{
			LSATravelDirectionText = "SE";
		}
	else if ( 157.5 <= LSATravelDirection && LSATravelDirection <= 202.5)
		{
				LSATravelDirectionText = "S";
		}
	else if ( 202.5 <= LSATravelDirection && LSATravelDirection <= 247.5)
		{
				LSATravelDirectionText = "SW";
		}
	else if ( 247.5 <= LSATravelDirection && LSATravelDirection <=292.5)
		{
			LSATravelDirectionText = "W";
		}
	else if ( 292.5 <= LSATravelDirection && LSATravelDirection <= 337.5)
		{
			LSATravelDirectionText = "NW";
		}
	else
	{}
		console.log("LSA Report : Straight line direction : ", LSATravelDirectionText); 


//convert lat long back to x y
	var LSAInterboundsCenx = (LSAInterbounds.getCenter().lng() + 180) / 360 * projection.size;
	var LSAInterboundsCeny = ((1 - Math.log(Math.tan(LSAInterbounds.getCenter().lat() * Math.PI / 180) + 1 / Math.cos(LSAInterbounds.getCenter().lat() * Math.PI / 180)) / Math.PI) / 2 * Math.pow(2, 0)) * projection.size;
	console.log("LSAReport : Intersection Centre X : " + LSAInterboundsCenx + " Centre Y : " + LSAInterboundsCeny );
	


	LSAInterboundsCenx = Math.round(LSAInterboundsCenx);
	LSAInterboundsCeny = Math.round(LSAInterboundsCeny);
	LSAOutputstring = LSAOutputstring.concat("Search Area has been narrowed down. Head ", LSATravelDirectionText , " towards the centre of the search area that is now X: " , LSAInterboundsCenx , " Y: " , LSAInterboundsCeny);
	document.getElementById("LSARO").innerHTML = LSAOutputstring;
	console.log("LSAReport : Intersection output : ",LSAOutputstring );
 	LSAOutputstring ="";
}

function LSAcalculateStraightLineDirection(startLatlng, endLatlng) {
	// Assuming you have already initialized your Google Map
  	var heading = google.maps.geometry.spherical.computeHeading(startLatlng, endLatlng);
  	return heading; // Returns the straight line direction in degrees
}

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

for (i=0; i<LSACountInter.length; i++)
		{
		LSACountInter [i].setMap(null);
		}
    LSACountLine.length = 0;
    LSACountPoly.length = 0;

    LSAOutputstring = "Map has been cleared, ready for next loot map?";
    console.log("LSAREPORT : Map cleared.");
    document.getElementById("LSARO").innerHTML = LSAOutputstring;
}


function LSADrawTowers ()
{
		for (i=0;i<guard_towers.length; i++)
	{
		LSADrawline (guard_towers[i].x - 51,guard_towers[i].y - 51,guard_towers[i].x + 51,guard_towers[i].y - 51,"DodgerBlue");
		LSADrawline (guard_towers[i].x + 51,guard_towers[i].y - 51,guard_towers[i].x + 51,guard_towers[i].y + 51,"DodgerBlue");
		LSADrawline (guard_towers[i].x + 51,guard_towers[i].y + 51,guard_towers[i].x - 51,guard_towers[i].y + 51,"DodgerBlue");
		LSADrawline (guard_towers[i].x - 51,guard_towers[i].y + 51,guard_towers[i].x - 51,guard_towers[i].y - 51,"DodgerBlue");
	}
}

function LSADrawLights ()
{
		for (i=0;i<poi.length; i++)
	{
		if(poi[i].name == "Altar of Three")
			{
				console.log("Altar of Three" , poi[i].name , i , poi[i].x , poi[i].y);		
				LSADrawline (poi[i].x - 21,poi[i].y - 21,poi[i].x + 21,poi[i].y - 21,"White");
				LSADrawline (poi[i].x + 21,poi[i].y - 21,poi[i].x + 21,poi[i].y + 21,"White");
				LSADrawline (poi[i].x + 21,poi[i].y + 21,poi[i].x - 21,poi[i].y + 21,"White");
				LSADrawline (poi[i].x - 21,poi[i].y + 21,poi[i].x - 21,poi[i].y - 21,"White");
			}
		else if (poi[i].name == "Bone Altar")
			{
				console.log("Bone Altar" , poi[i].name , i , poi[i].x , poi[i].y);
				LSADrawline (poi[i].x - 21,poi[i].y - 21,poi[i].x + 21,poi[i].y - 21,"Black");
				LSADrawline (poi[i].x + 21,poi[i].y - 21,poi[i].x + 21,poi[i].y + 21,"Black");
				LSADrawline (poi[i].x + 21,poi[i].y + 21,poi[i].x - 21,poi[i].y + 21,"Black");
				LSADrawline (poi[i].x - 21,poi[i].y + 21,poi[i].x - 21,poi[i].y - 21,"Black");
				
			}
		
		
		
	}
}	