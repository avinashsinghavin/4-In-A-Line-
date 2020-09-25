window.onload = function() {
    const url = "http://localhost:3000/";
    fetch(url)
    .then(response => response.text())
    .then(contents => console.log('erase'))
    .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))
}

var i = true;//true = yellow false = red
Red = [];
Yellow = [];
async function onhovercolor(id){
    if(i) {
        document.getElementById(id).style.backgroundColor = 'yellow';
        document.getElementById('playermove').value = "Yellow's turn";
    }
    else {
        document.getElementById(id).style.backgroundColor = 'Red';
        document.getElementById('playermove').value = "Red's turn";
    }
}
async function offhovercolor(id) {
    //alert('asd');
    document.getElementById(id).style.backgroundColor = 'aquamarine';
}
async function clickedhrader(id) {
    var k = id.length;
    var value = id[k-1], j = 0;
    const url = "http://localhost:3000/move/"+value;
    fetch(url)
    .then(response => response.text())
    .then(contents => correctApi(contents, id))
    .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))
}
async function correctApi(Apidata, id) {
    console.log(Apidata);
    apiresponse = JSON.parse(Apidata); 
    var data = apiresponse.respond[0].response, j = 0;
    i = !i;
    var k = id.length;
    var value = id[k-1], j = 0;
    console.log(data);
    if(apiresponse.respond[0].data === 'Yellow Won'){
        alert(apiresponse.respond[0].data);
    }
    else if(apiresponse.respond[0].data === 'Red Won'){
        alert(apiresponse.respond[0].data);
    }
    else if(apiresponse.respond[0].data === 'Game Over'){
        alert(apiresponse.respond[0].data);
    }
    else if(data === 'success'){
        onhovercolor(id);
        for(j = 1;  j < 7 && (document.getElementById('r'+j+'c'+value).style.backgroundColor === 'white'); j++);
        console.log(j-1);
        if(i) {
            Red.push(value);
            document.getElementById('r'+(j-1) + 'c'+value).style.backgroundColor = "red";
            document.getElementById('moveinred').innerHTML = Red;
        }
        else {
            Yellow.push(value);
            document.getElementById('r'+(j-1) + 'c'+value).style.backgroundColor = "yellow";
            document.getElementById('moveinyellow').innerHTML = Yellow;
        }
    } 
    else {
        alert('In Valid Move');
    }
}
function startnewgame(){
    const url = "http://localhost:3000/clear/";
    fetch(url)
    .then(response => response.text())
    .then(contents => location.reload())
    .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))
}