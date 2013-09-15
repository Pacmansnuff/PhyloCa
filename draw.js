///////////////////////////////////////
// PhyloCC, Guillaume Ardaud, 2011
//
// This file should be distributed with 
// a LICENSE file detailing under which 
// clauses it is shared.
//
// http://github.com/gardaud/phylocc
///////////////////////////////////////

// draw.js
//This file contains the functions that are used to draw
//the card creator on screen.

function draw() {
    var canvas = document.getElementById("canvas");
    if (canvas.getContext) {
        var ctx = canvas.getContext("2d");
    }

	if(getType() == "Organism") {
		//get values
		var commonName=getCommonName();
		var latinName=getLatinName();
		var evolutionaryTree=getEvolutionaryTree();
		var pointValue=getPointValue();
		var scale=getScale();
		var foodchainNum=getFoodchainNum();
		var artistName=getArtistName();
		var artistWebsite=getArtistWebsite();
		var dietType=getDietType();
		var climates=getClimates();
		var special=getSpecial();
		var desc=getDescription();
		var terrains= getTerrains();
		
		//draw
		drawTerrains(ctx, terrains);
		drawBackground(ctx, color);
		drawImage(ctx);
		drawTitle(ctx, commonName);
		drawSubtitle(ctx, latinName);
		drawDietCircle(ctx, dietType);
		drawEvolutionaryTree(ctx, evolutionaryTree);
		drawPointValue(ctx,pointValue);
		drawScale(ctx, scale);
		drawFoodchainNum(ctx, foodchainNum);
		drawArtistName(ctx, artistName);
		drawArtistWebsite(ctx, artistWebsite);
		drawCCMentions(ctx);
		drawClimate(ctx, climates);
		drawSpecial(ctx, special);
		drawDescription(ctx, desc);*/
	}
	else if(getType() == "Event") {
		var eventName=getEventName();
		var artistName=getArtistName();
		var artistWebsite=getArtistWebsite();
		var play=getPlay();
		var effect=getEffect();
		
		drawBackground(ctx, color);
		drawImage(ctx);
		drawTitle(ctx, eventName);
		drawSubtitle(ctx, "Event Card");
		drawEvolutionaryTree(ctx, "Event");
		drawArtistName(ctx, artistName);
		drawArtistWebsite(ctx, artistWebsite);
		drawSpecial(ctx, play);
		drawDescription(ctx, effect);
		drawCCMentions(ctx);
	}
	
	else if(getType() == "Home") {
		var homeName=getHomeName();
		
		drawBackground(ctx, color);
		drawImage(ctx);
		drawTitle(ctx, "Home Card");
		drawSubtitle(ctx, homeName);
		drawEvolutionaryTree(ctx, "Starter");
		drawArtistName(ctx, artistName);
		drawArtistWebsite(ctx, artistWebsite);
		drawSpecial(ctx, ["This is a HOME card. The game starts with", "each player having a HOME card played on the", "table next to each other."]);
		drawDescription(ctx, ["Home cards represent all TERRAIN", "and CLIMATE values."]);
		drawCCMentions(ctx);
    }
}

function hex2rgb(hex) { //needs to be moved to utilities.js
	if(hex.charAt(0) == "#") hex = hex.slice(1); //Remove the '#' char - if there is one.
	hex = hex.toUpperCase();
	var hex_alphabets = "0123456789ABCDEF";
	var value = new Array(3);
	var k = 0;
	var int1,int2;
	for(var i=0;i<6;i+=2) {
		int1 = hex_alphabets.indexOf(hex.charAt(i));
		int2 = hex_alphabets.indexOf(hex.charAt(i+1)); 
		value[k] = (int1 * 16) + int2;
		k++;
	}
	return ("rgb("+value[0]+","+value[1]+","+value[2]+")");
}

function drawBackground(context, color){
    context.fillStyle = "rgb(0,0,0)"; //draws border of card
    context.fillRect(0,0,270,410);

    var rgbColor=hex2rgb(color); //we convert to RGB, otherwise Gecko is a pain.
    context.fillStyle = rgbColor;
    context.fillRect(10, 10, 250, 390);
}

function drawImage(context){
    var image = new Image();
    image.src = getImagePath(image); //we get the path from the html input
    image.onload = function() {
        context.drawImage(image, 10, 60, 250, 153);
    };
}

function drawTitle(context, title){
    context.fillStyle = "rgb(0,0,0)"; //draw title
    
    var fontSize=20;
    var size=300;
    //determine font size for string (needs to be moved in a function)
    while (size>180){
        context.font = 'bold '+fontSize+'px sans-serif';
        size=Math.round(context.measureText(title).width);
        fontSize--;
    }


    context.textBaseline = 'top';
    context.fillText  (title, 15, 35-fontSize);
}

function drawSubtitle(context, subtitle){
    context.fillStyle = "rgb(0,0,0)"; //draw subtitle
    context.font         = 'italic 12px sans-serif';
    context.textBaseline = 'top';
    context.fillText(subtitle, 15, 40);
}

function drawDietCircle(context, type){
    //type 1 is photosynthetic, yellow
    //type 2 is molecular, black
    //type 3 is herbivore, green
    //type 4 is omnivore, brown
    //type 5 is carnivore, red
    switch(type){
        case "1":
            context.fillStyle = "rgb(223,192,0)";
            break;
        case "2":
            context.fillStyle = "rgb(0,0,0)";
            break;
        case "3":
            context.fillStyle = "rgb(49,159,0)";
            break;
        case "4":
            context.fillStyle = "rgb(127,59,0)";
            break;
        case "5":
		case "6":
            context.fillStyle = "rgb(255,0,0)";
            break;
    }
    
    context.arc(240, 30, 12, 0, Math.PI*2, true); 
    context.closePath();
    context.fill();
    
}

function drawFoodchainNum(context, num){
    context.fillStyle = "rgb(255,255,255)";
    context.font         = 'bold 24px serif';
    context.textBaseline = 'top';
    context.fillText(num, 233, 17);  
}

function drawScale(context, scale){
    context.fillStyle = "rgb(0,0,0)";
    context.font         = 'bold 24px serif';
    context.textBaseline = 'top';
    context.fillText(scale, 205, 17);   
}

function drawClimate(context, climates){
    //flags indicate climate (hot, warm, cool, cold)
    //Order on card: cold, cool // warm, hot
    var climateCount=0; //this variable is used to determine whether a comma will be inserted or not
    var bottomLine=0; //this variable is used to determine if cold/cool are displayed on the lower or upper line

    context.fillStyle = "rgb(0,0,0)";
    context.font         = 'bold 12px sans-serif';
    context.textBaseline = 'top';

    if (climates & 0x1){
        context.fillText("Hot", 230, 385); 
        climateCount++;
        bottomLine=1;
    }

    if (climates & 0x2){
        if (climateCount==1){
            context.fillText(",", 224, 385); 
            context.fillText("Warm", 190, 385);
        } else {
            context.fillText("Warm", 220, 385);
        }
        bottomLine=1;
    }

    climateCount=0
    if (climates & 0x4){
        context.fillText("Cool", 225, 385-bottomLine*15); 
        climateCount++;
    }

    if (climates & 0x8){
        if (climateCount==1){
            context.fillText(",", 220, 385-bottomLine*15); 
            context.fillText("Cold", 193, 385-bottomLine*15); 
        } else {
            context.fillText("Cold", 225, 385-bottomLine*15); 
        }
    }
}

function drawPointValue(context, points){
    context.fillStyle = "rgb(0,0,0)";
    context.font         = 'bold 11px sans-serif';
    context.textBaseline = 'top';
    context.fillText(points+" POINTS", 195, 230);   
}

function drawTerrains(context, terrains){
    var left = new Image();
    left.src = "resources/"+terrains[0]+".png";
    
    var center = new Image();
    center.src = "resources/"+terrains[1]+".png";
    
    var right = new Image();
    right.src = "resources/"+terrains[2]+".png";

    left.onload = function() {
        context.drawImage(left, 10, 345);
    };

    right.onload = function() {
        context.drawImage(right, 178, 345);
    };

    center.onload = function() {
        context.drawImage(center, 94, 345);
    };
}

function drawEvolutionaryTree(context, names){
    context.fillStyle = "rgb(9,83,168)";
    context.font         = '8px courier';
    context.textBaseline = 'top';
    size=context.measureText(names);
    context.fillText(names, 255-Math.round(size.width), 215); 
}

function drawArtistName(context, artistName){
    context.fillStyle = "rgb(0,0,0)";
    context.font         = '11px sans-serif';
    context.textBaseline = 'top';
    context.fillText("Image by ", 15, 370);    

    context.font         = 'italic 11px sans-serif';
    context.textBaseline = 'top';
    context.fillText(artistName, 62, 370);    
}

function drawArtistWebsite(context, artistWebsite){
    context.fillStyle = "rgb(9,83,168)";
    context.font         = '11px sans-serif';
    context.textBaseline = 'top';
    context.fillText(artistWebsite, 15, 385);
}

function drawCCMentions(context){
    var image = new Image();
    image.src = "resources/creative-commons.png";
    image.onload = function() {
        context.drawImage(image, 15, 215);
    };
}

function drawSpecial(context, special){
    context.fillStyle = "rgb(0,0,0)";
    context.font         = '11px sans-serif';
    context.textBaseline = 'top';

    for (i=0;i<special.length;i++){
        context.fillText(special[i], 15, 250+i*12);
    }        
}

function drawDescription(context, description){
    context.fillStyle = "rgb(0,0,0)";
    context.font         = 'italic 11px sans-serif';
    context.textBaseline = 'top';
  
    for (i=0;i<description.length;i++){
        context.fillText(description[i], 15, 315+i*12);
    }        
}
