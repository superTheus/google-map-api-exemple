
var map;
var userMarker;
var lojaMarker;

function initMap() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      var userLocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: userLocation
      });

      userMarker = new google.maps.Marker({
        position: userLocation,
        map: map,
        title: 'Sua Localização'
      });

      var lojaLocation = { lat: -3.031007782430381, lng: -59.97750489523658 };
      lojaMarker = new google.maps.Marker({
        position: lojaLocation,
        map: map,
        title: 'Loja 1'
      });
    }, function () {
      console.error("Não foi possível obter a localização do usuário.");
    });
  } else {
    console.error("Geolocalização não suportada pelo navegador.");
  }
}


function buscarEnderecoPorCep() {
  var cepInput = document.getElementById('cepInput').value.replace(/\D/g, '');

  var geocoder = new google.maps.Geocoder();

  geocoder.geocode({ 'address': cepInput }, function (results, status) {
    if (status == 'OK' && results[0]) {
      var enderecoLocation = results[0].geometry.location;
      map.setCenter(enderecoLocation);

      if (userMarker) userMarker.setMap(null);
      userMarker = new google.maps.Marker({
        position: enderecoLocation,
        map: map,
        title: 'Endereço Encontrado'
      });

    } else {
      console.error('Não foi possível encontrar o endereço para o CEP fornecido.');
    }
  });
}