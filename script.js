const canvas = document.getElementById("cvs");
const ctx = canvas.getContext("2d");

const border = [
    [0,0,1000,4],
    [0,496,1000,4],
    [0,0,4,500],
    [996,0,4,20], //kapu
    [996,50,4,449],
];

const lines = [
    // bal-fent
    [0,100,250,2],
    [40,150,210,2],
    [40,150,2,100],
    [250,0,2,30],
    [250,70,2,82],
    [400,0,2,125],
    // bal-lent
    [0,400,250,2],
    [250,400,2,20],
    [250,480,2,20],
    [400,360,20,2],
    [480,360,20,2],
    [400,360,2,70],
    // közép
    [500,0,2,150],
    [500,250,2,250],
    // jobb-fent
    [600,0,2,45],
    [542,45,60,2],
    [540,45,2,60],
    [800,0,2,45],
    [800,80,2,50],
    [800,128,50,2],
    [950,128,50,2],
    // jobb-lent
    [750,460,125,2],
    [750,460,2,40],
    [875,460,2,40],
    [750,350,152,2],
    [900,250,100,2],
    [900,250,2,100],
];

var moveable = [
    [426,380,50,50],
    [600,320,50,50],
];

var gates = [
    [250,30,2,40,"green",false], //bool - active
    [400,430,2,66,"purple",false],
    [500,150,2,100,"orange",false],
    [800,45,2,35,"teal",true],
    [850,128,100,2,"brown",true],
    [900,352,2,108,"pink",true],
    [502,50,38,2,"yellow",true],
];

var circles = [
    [50,325,25,"green",false], //bool - pressed
    [200,114,25,"purple",false],
    [438,25,55,"orange",false],
    [760,25,25,"teal",false],
    [938,270,25,"teal",false],
    [850,80,25,"brown",false],
    [560,12,25,"pink",false],
    [800,250,55,"yellow",false],
];

var characters = [
    {
        x: 70,
        y: 423,
        size: 50,
        radius: 15,
        color: "red"
    },
    {
        x: 70,
        y: 39,
        size: 30,
        radius: 11,
        color: "blue"
    }
];

const moveConst = 10;
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
    for (let i = 0; i < moveable.length; i++) {
        var current = moveable[i];
        ctx.fillStyle = colormap("darkred");
        ctx.fillRect(current[0], current[1], current[2], current[3]);
    }
    for (let i = 0; i < gates.length; i++) {
        var current = gates[i];
        if(current[5]){
            ctx.fillStyle = colormap(current[4]);
            ctx.fillRect(current[0], current[1], current[2], current[3]);
        }
        
    }
    for (let i = 0; i < circles.length; i++) {
        var current = circles[i];
        ctx.fillStyle = colormap(current[3]);
        ctx.beginPath();
        ctx.arc(current[0] + current[2] / 2, current[1] + current[2] / 2, current[2] / 2, 0, 2*Math.PI);

        ctx.fill();
        
    }
    for (let i = 0; i < characters.length; i++) {
        var current = characters[i];
        ctx.fillStyle = colormap(current.color);
        roundedRect(ctx, current.x, current.y, current.size, current.size, current.radius);
        if(characterId==i){
            ctx.fillStyle = colormap("orange");
            ctx.beginPath();
            ctx.arc(current.x + current.size / 2, current.y + current.size / 2, current.size / 8, 0, 2*Math.PI);

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
            return "#f78aff";
        case "teal":
            return "#2debc1";
        case "yellow":
            return "#f5f125";
        case "brown":
            return "#99660e";
        case "darkred":
            return "#5c0105";
        default:
            return color;
    }
    
}

function keyboard(event) {
    if(event.key == " "){
        characterId = characterId == 0 ? 1 : 0;
        writeMap();
        return;
    }
    var x = characters[characterId].x;
    var y = characters[characterId].y;
    var r = characters[characterId].size;
    if(event.key == "w" || event.key == "W"){
        for (let i = 0; i < moveConst; i++) {
            if(!collidedObject(x + 1,y - 1 + 1,r - 2, 0)){
                characters[characterId].y -= 1;
                y-=1;
            }
        }
        
    }
    else if(event.key == "s" || event.key == "S"){
        for (let i = 0; i < moveConst; i++) {
            if(!collidedObject(x + 1,y + 1 + 1,r - 2, 1)){
                characters[characterId].y += 1;
                y+=1;
            }
        }
    }
    else if(event.key == "a" || event.key == "A"){
        for (let i = 0; i < moveConst; i++) {
            if(!collidedObject(x - 1 + 1,y + 1,r - 2, 2)){
                characters[characterId].x -= 1;
                x-=1;
            }
        }
    }
    else if(event.key == "d" || event.key == "D"){
        for (let i = 0; i < moveConst; i++) {
            if(!collidedObject(x + 1 + 1,y + 1,r - 2, 3)){
                characters[characterId].x += 1;
                x+=1;
            }
        }
    }
    testCircle(x,y,r)
    writeMap()
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

function collidedObject(x, y, r, direction, isCharacter = true){
    var privChar = {
        x: x,
        y: y,
        w: r,
        h: r
    }
    for (let i = 0; i < border.length; i++) {
        var current = border[i];
        if (collision(privChar, {x: current[0], y: current[1], w: current[2], h: current[3]}))
        {
            return true;
        }
    }
    for (let i = 0; i < lines.length; i++) {
        var current = lines[i];
        if (collision(privChar, {x: current[0], y: current[1], w: current[2], h: current[3]}))
        {
            return true;
        }
    }
    for (let i = 0; i < gates.length; i++) {
        var current = gates[i];
        if (collision(privChar, {x: current[0], y: current[1], w: current[2], h: current[3]}))
        {
            if(current[5]){
                return true;
            }
            
        }
    }

    if (isCharacter) {
        for (let i = 0; i < moveable.length; i++) {
            var current = moveable[i];
            if (collision(privChar, {x: current[0], y: current[1], w: current[2], h: current[3]}))
            {
                // console.log(current);
                if (characterId != 0){
                    return true;
                }
                if (direction == 0 && !collidedObject(current[0] + 1, current[1] + 1 - 1, current[2] - 2, 123, false)) {
                    current[1] -= 1;
                }
                else if (direction == 1 && !collidedObject(current[0] + 1, current[1] + 1 + 1, current[2] - 2, 123, false)) {
                    current[1] += 1;
                }
                else if (direction == 2 && !collidedObject(current[0] + 1 - 1, current[1] + 1, current[2] - 2, 123, false)) {
                    current[0] -= 1;
                }
                else if (direction == 3 && !collidedObject(current[0] + 1 + 1, current[1] + 1, current[2] - 2, 123, false)) {
                    current[0] += 1;
                }
                else{
                    return true
                }
                // if (){
                //     console.log(current);
                //     
                // }
                moveable[i][0] = current[0];
                moveable[i][1] = current[1];
                
            }
        }
    }
    



    return false;
}

function collision(A, B) {
    return !(((A.y+A.h)<(B.y))||(A.y>(B.y+B.h))||((A.x+A.w)<B.x)||(A.x>(B.x+B.w)));
}

function testCircle(x,y,r) {
    // green
    if (Math.abs((circles[0][0] + 16) - (x + 25)) < Math.abs(r/2) && Math.abs((circles[0][1] + 16) - (y + 25)) < Math.abs(r/2)){
        circles[0][4] = true;
        gates[0][5] = false;
    }
    else{
        circles[0][4] = false;
        gates[0][5] = true;
    }
    //purple
    if (Math.abs((circles[1][0] + 16) - (x + 25)) < Math.abs(r/2) && Math.abs((circles[1][1] + 16) - (y + 25)) < Math.abs(r/2)){
        circles[1][4] = true;
        gates[1][5] = false;
    }
    //orange

    //teal1
    if (Math.abs((circles[3][0] + 16) - (x + 25)) < Math.abs(r/2) && Math.abs((circles[3][1] + 16) - (y + 25)) < Math.abs(r/2)){
        circles[3][4] = true;
    }
    //teal2
    if (Math.abs((circles[4][0] + 16) - (x + 25)) < Math.abs(r/2) && Math.abs((circles[4][1] + 16) - (y + 25)) < Math.abs(r/2)){
        circles[4][4] = true;
    }

    if (circles[3][4] && circles[4][4]){
        gates[3][5]
    }

    //brown
    if (Math.abs((circles[5][0] + 16) - (x + 25)) < Math.abs(r/2) && Math.abs((circles[5][1] + 16) - (y + 25)) < Math.abs(r/2)){
        circles[5][4] = true;
        gates[4][5] = false;
    }
    //pink
    if (Math.abs((circles[6][0] + 16) - (x + 25)) < Math.abs(r/2) && Math.abs((circles[6][1] + 16) - (y + 25)) < Math.abs(r/2)){
        circles[6][4] = true;
        gates[5][5] = false;
    }
    //yellow

}

//#endregion