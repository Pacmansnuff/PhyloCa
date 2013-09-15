///////////////////////////////////////
// PhyloCC, Guillaume Ardaud, 2011
//
// This file should be distributed with 
// a LICENSE file detailing under which 
// clauses it is shared.
//
// http://github.com/gardaud/phylocc
///////////////////////////////////////

// dynamic.js
//This file contains the functions that are used to fetch dynamically the
//data entered by the user

function getCommonName(){
	var commonName = document.getElementById('common-name');
    return commonName.value;
}

function getEventName(){
	var eventName = document.getElementById('event-name');
    return eventName.value;
}

function getHomeName(){
	var homeName = document.getElementById('home-name');
    return homeName.value;
}

function getLatinName(){
	var latinName = document.getElementById('latin-name');
    return latinName.value;
}

function getPointValue(){ //calculate points
	var pointValue = document.getElementById('point-value');
	
	var points = 0; //create variable
	var foodChain = document.getElementById('diet-type');
    var foodChainNum = foodChain.options[foodChain.selectedIndex].value;
	switch(foodChainNum) { //starting score is based on diet
		case "1": //autotroph
		case "2": //mineral
			points = 2;
			break;
		case "3": //herbivore
			points = 4;
			break;
		case "4": //omnivore
			points = 3;
			break;
		case "5": //carnivore
		case "6":
			points = 7;
			break;
	}
	var climateCount = -2; //2 climates is free, each additional costs a point
	if (document.getElementById('hot').checked)
        climateCount++;
    if (document.getElementById('warm').checked)
		climateCount++;
    if (document.getElementById('cool').checked)
		climateCount++;
    if (document.getElementById('cold').checked)
		climateCount++;
	points -= climateCount;
	var habitatCount = -2; //2 habitats is free, each additonal costs a point
	for (i=0;i<7;i++){
        if(document.getElementById('terrain'+(i+1)).checked)
			habitatCount++;
    }
	points -= habitatCount;
	var travelDistance = document.getElementById('travel-distance'); //subtract 1 for movement greater than 2
	var travelDistanceValue = travelDistance.options[travelDistance.selectedIndex].value;
	if(travelDistanceValue == "3" || travelDistanceValue == "4" || travelDistanceValue == "5")
		points--;
	if(document.getElementById('invasive').checked)
		points--;
	if(document.getElementById('specific-diet').checked)
		points++;
    return points;
}

function getScale(){
    var scale = document.getElementById('scale');
    return scale.options[scale.selectedIndex].value;
}

function getEvolutionaryTree(){
    var evolutionaryTree = document.getElementById('evolutionary-tree');
    return evolutionaryTree.value;
}

function getArtistName(){
    var artistName = document.getElementById('artist-name');
    return artistName.value;
}

function getArtistWebsite(){
    var artistWebsite = document.getElementById('artist-website');
    return artistWebsite.value;
}

function getImagePath(image){
	var input = document.getElementById('image2');
    if (input.files && input.files[0]) {
		var reader = new FileReader();
		reader.onloadend = function() {
			image.src = reader.result;
        }
		reader.readAsDataURL(input.files[0]);
		return "";
	}
	else
		return "resources/default_image.jpg";
	
}

function getFoodchainNum(){
    var foodChain = document.getElementById('diet-type');
    var foodChainNum = foodChain.options[foodChain.selectedIndex].value;
    if(foodChainNum == 1 || foodChainNum == 2) //autotorphs and mineral consumers get 1
    	return 1;
    else if(foodChainNum == 3 || foodChainNum == 4) //herbivores and omnivores get 2
    	return 2;
    else if(foodChainNum == 5) //carnivores get 3
    	return 3;
    else //apex predators get 4
    	return 4;
}

function getDietType(){
    var dietType = document.getElementById('diet-type');
    return dietType.options[dietType.selectedIndex].value;
}

function getClimates(){
    var climates=0
    var flag_hot=0x1
    var flag_warm=0x2
    var flag_cool=0x4
    var flag_cold=0x8
    
    if (document.getElementById('hot').checked){
        climates= climates | flag_hot
    }
    
    if (document.getElementById('warm').checked){
        climates= climates | flag_warm
    }

    if (document.getElementById('cool').checked){
        climates= climates | flag_cool
    }

    if (document.getElementById('cold').checked){
        climates= climates | flag_cold
    }

    return climates;
}

function getDescription(){
    var description= new Array();

    for (i=0;i<3;i++){
        description[i]=document.getElementById('desc'+(i+1)).value;
    }

    return description;
}

function getEffect(){
    var description= new Array();

    for (i=0;i<4;i++){
        description[i]=document.getElementById('event-desc'+(i+1)).value;
    }
	
	description[0] = "Effect: " + description[0];

    return description;
}

function getSpecial(){
    var special= new Array();
	
	var travelType = document.getElementById('travel-type');
	var travelDistance = document.getElementById('travel-distance');
	if(travelType.options[travelType.selectedIndex].value != "IMMOBILE")
		special[0] = "Play: " +  getLatinName() + " has a " + travelType.options[travelType.selectedIndex].value + " of " + travelDistance.options[travelDistance.selectedIndex].value + "."
	else
		special[0] = "";
    for (i=1;i<4;i++){
        special[i]=document.getElementById('special'+(i+1)).value;
    }

    return special;
}

function getPlay(){
    var special= new Array();
	
    for (i=0;i<4;i++){
        special[i]=document.getElementById('event-special'+(i+1)).value;
    }
	
	special[0] = "Play: " + special[0];

    return special;
}


function saveAsPNG(){
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
    var img     = canvas.toDataURL("image/png");

    document.write('<img src="'+img+'"/>');
}

function getTerrains(){
    var terrains= new Array();

    for (i=0;i<7;i++){
        terrains[i]=document.getElementById('terrain'+(i+1)).checked;
    }
    

    return buildTerrainArray(terrains);
}


function setColor(hex){
    color=hex;
}

function getColor(){
    color="";
    
    return color;
}

function buildTerrainArray(terrains){
    atlas= new Array("desert", "forest", "freshwater", "grasslands", "ocean", "tundra", "urban")
    array= new Array("forest", "forest", "forest");
    
    count=0
    for (i=0; i<7; i++){
        if (terrains[i]==true){
            array[count]=atlas[i];
            count++;
        }
    }
    
    if (count==0){ //if nothing is selected, everything defaults to forest
        array[0]="forest"
        count++;
    }
    
    if (count==1){ //if only one terrain is selected, the second one is the same
        array[1]=array[0]
        count++;
    }

    if (count==2){ //if only 2 terrains are selected, the third one will be the same as first.
        array[2]=array[0]
        count++;
    }

    return array;
}

function switchForm() {
	if(document.getElementById('organism').checked)
		document.getElementById('Organism').style.display = "block";
	else
		document.getElementById('Organism').style.display = "none";
	if(document.getElementById('event').checked)
		document.getElementById('Event').style.display = "block";
	else
		document.getElementById('Event').style.display = "none";
	if(document.getElementById('home').checked)
		document.getElementById('Home').style.display = "block";
	else
		document.getElementById('Home').style.display = "none";
}

function getType() {
	if(document.getElementById('organism').checked)
		return "Organism";
	if(document.getElementById('event').checked)
		return "Event";
	if(document.getElementById('home').checked)
		return "Home";
}
