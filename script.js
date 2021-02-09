let mapid = document.getElementById('mapid');
let initCoordinate = data.initCoordinate;
let mymap;
let selectObject = document.createElement("select");    
selectObject.id = "selectObject";
document.body.appendChild(selectObject);

let init = (e) => {
    mymap = L.map('mapid').setView(e, 13);

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 19,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoiYWxleGV5emh1bWFldiIsImEiOiJja2t4dWt5YjUwOTRkMm9vNGx0YTY1YzUxIn0.nUKkS2k3N6Ad_BwG1d01Cg'
    }).addTo(mymap);
}
init(initCoordinate);

let reInit = (e) => {
    mymap.setView(e, 17);    
}

for (let i=0; i<data.coordinates.length; i++) {
    let marker = L.marker(data.coordinates[i]).addTo(mymap);
    marker.bindPopup(data.markerDescription[i]).openPopup();
    

    let option = document.createElement("option");
    option.value = i;
    option.id = i;
    option.text = data.objectName[i];
    selectObject.appendChild(option);

    marker.on('click', () => {
        option.selected = true;
    });

    selectObject.addEventListener('change', () => {
        if (selectObject.value == i) {            
            reInit(data.coordinates[i]);       
        }    
    });
}