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

function getLatinName(){
	var latinName = document.getElementById('latin-name');
    return latinName.value;
}

function getPointValue(){
	var pointValue = document.getElementById('point-value');
    return pointValue.value;
}

function getScale(){
    var scale= document.getElementById('scale');
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

function getImagePath(){
    var image = document.getElementById('image');
    return image.value;
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
    var dietTypeNum = dietType.options[dietType.selectedIndex].value;
    if(dietTypeNum == 6) //Apex Predators are carnivores and should just get color 5
    	return 5;
    else
    	return dietTypeNum;
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

function getSpecial(){
    var special= new Array();

    for (i=0;i<5;i++){
        special[i]=document.getElementById('special'+(i+1)).value;
    }

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
