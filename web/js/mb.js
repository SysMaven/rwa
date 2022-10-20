mapboxgl.accessToken = 'pk.eyJ1Ijoic3lzbWF2ZW4iLCJhIjoiY2w5aG9lMmMxMDQ4bDNycXE0MTQ3MW5qNCJ9.xGcWjmp2JnceX2KhkpZduA';

const map = new mapboxgl.Map({
    container: 'map',
    //style: 'mapbox://styles/mapbox/streets-v11'
    style: 'mapbox://styles/sysmaven/cl9holwo3000215tdmovsxn75', // style URL
    center: [-117.62050599942361, 33.419478757059736], // starting position [lng, lat]
    zoom: 14, // starting zoom
    pitch: 85,
    bearing: 100
});

map.on('load', () => {
    
    map.addSource('mapbox-dem', {
        'type': 'raster-dem',
        'url': 'mapbox://mapbox.mapbox-terrain-dem-v1',
        'tileSize': 512,
        'maxzoom': 14
    });
    
    // add the DEM source as a terrain layer with exaggerated height
    map.setTerrain({ 'source': 'mapbox-dem', 'exaggeration': 1.5 });
    
    // add sky styling with `setFog` that will show when the map is highly pitched
    map.setFog({
        'horizon-blend': 0.3,
        'color': '#f8f0e3',
        'high-color': '#add8e6',
        'space-color': '#d8f2ff',
        'star-intensity': 0.0
    });

});