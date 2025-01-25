var LSAmapsize = 4096

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
        var gpssplit = gpsstr.split("x:").pop();
        LSAOriginX = parseInt(gpssplit.split('y')[0]);
        LSAOriginY = parseInt(gpssplit.split('y:')[1]);
		console.log("LSAREPORT : LSA Origin X: " + LSAOriginX + " LSA Origin Y: " + LSAOriginY);
        LSADraw (LSAOriginX,LSAOriginY,LSAdirection,LSAmin,LSAmax);	
}


function LSADraw (LSAOriginX,LSAOriginY,LSAdirection,LSAmin,LSAmax)	
{
// convert degrees to radians
var LSAcenterX = LSAOriginX + ((LSAmax-LSAmin)/2) * Math.cos(LSAdirection * Math.PI / 180);
var LSAcenterY = LSAOriginY + ((LSAmax-LSAmin)/2) * Math.sin(LSAdirection * Math.PI / 180);

LSAOutputstring = LSAOutputstring.concat("Area has been drawn without issue, check the map.", " The centre of the added area is X: " , LSAcenterX , " Y: " , LSAcenterY);



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
	console.log("LSAREPORT : LSA dif: " + LSAdif); 
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
console.log("LSAREPORT LSAPolyArry :" + LSAPolyArry );

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
