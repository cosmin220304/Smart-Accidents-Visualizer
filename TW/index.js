window.onload = init; // se apeleaza dupa ce s-a incarcat pagina

function init(){
  const map = new ol.Map({
    view: new ol.View({
      center: [0,0],
      zoom:2
    }),
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM()
      })
    ],
    target: js-map
  })
}
