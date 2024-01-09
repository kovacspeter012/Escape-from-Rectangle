const canvas = document.getElementById("cvs");
const ctx = canvas.getContext("2d");

const border = [
    [0,0,1000,4],
    [0,496,1000,4],
    [0,0,4,500],
    [996,0,4,20], //kapu
    [996,50,4,449],
];

var lines = [
    [0,0,10,10]
];

var gates = [
    [10,10,100,10,"orange",true],
    [11,10,1000,100,"green",true],
];

var characters = [
    {
        x: 500,
        y: 50,
        size: 50,
        radius: 15,
        color: "red"
    },
    {
        x: 200,
        y: 10,
        size: 30,
        radius: 11,
        color: "blue"
    }
];

var characterId = 0;




window.addEventListener('keydown', keyboard);


writeMap();

//#region FUNCTIONS

function writeMap(){
    ctx.clearRect(0,0,1000,500);
    ctx.fillStyle = "#000";

    for (let i = 0; i < border.length; i++) {
        var current = border[i];
        ctx.fillRect(current[0], current[1], current[2], current[3]);
    }
    for (let i = 0; i < lines.length; i++) {
        var current = lines[i];
        ctx.fillRect(current[0], current[1], current[2], current[3]);
    }
    for (let i = 0; i < gates.length; i++) {
        var current = gates[i];
        if(current[5]){
            ctx.fillStyle = colormap(current[4]);
            ctx.fillRect(current[0], current[1], current[2], current[3]);
        }
        
    }
    for (let i = 0; i < characters.length; i++) {
        var current = characters[i];
        ctx.fillStyle = colormap(current.color);
        roundedRect(ctx, current.x, current.y, current.size, current.size, current.radius);
        if(characterId==i){
            ctx.fillStyle = colormap("orange");
            ctx.arc(current.x + current.size / 2, current.y + current.size / 2, current.size / 6, 0, 2*Math.PI);

            ctx.fill();
        }
    }
}

function colormap(color) {
    switch (color) {
        case "orange":
            return "#fca103";
        case "red":
            return "#fc0303";
        case "purple":
            return "#df03fc";
        case "green":
            return "#0ddb02";
        case "pink":
            return "#ff26ed";
        case "teal":
            return "#2debc1";
        case "yellow":
            return "#f5f125";
        case "brown":
            return "#99660e";
        default:
            return color;
    }
    
}

function keyboard(event) {
    if(event.key == " "){
        characterId = characterId == 0 ? 1 : 0;
        writeMap();
    }
}

function roundedRect(ctx, x, y, width, height, radius) {
    ctx.beginPath();
    ctx.moveTo(x, y + radius);
    ctx.arcTo(x, y + height, x + radius, y + height, radius);
    ctx.arcTo(x + width, y + height, x + width, y + height - radius, radius);
    ctx.arcTo(x + width, y, x + width - radius, y, radius);
    ctx.arcTo(x, y, x, y + radius, radius);
    // ctx.stroke();
    ctx.fill();
}

//#endregion