
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
      document.getElementById('error').style.color = '#e52330'
      document.getElementById('error').style.display = 'block'
      document.getElementById('error').innerText = 'Não foi possível obter a localização do usuário.'
      setTimeout(() => {
        resetMessage()
      }, 10000);
    });
  } else {
    document.getElementById('error').style.color = '#e52330'
    document.getElementById('error').style.display = 'block'
    document.getElementById('error').innerText = 'Geolocalização não suportada pelo navegador.'
    setTimeout(() => {
      resetMessage()
    }, 10000);
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

      document.getElementById('error').style.color = '#4CAF50'
      document.getElementById('error').style.display = 'block'
      document.getElementById('error').innerText = 'CEP encontrado com sucesso'
      setTimeout(() => {
        resetMessage()
      }, 5000);
    } else {
      document.getElementById('error').style.color = '#e52330'
      document.getElementById('error').style.display = 'block'
      document.getElementById('error').innerText = 'Não foi possível encontrar o endereço para o CEP fornecido.'
      setTimeout(() => {
        resetMessage()
      }, 5000);
    }
  });

  function resetMessage() {
    document.getElementById('error').style.color = '#e52330'
    document.getElementById('error').style.display = 'none'
    document.getElementById('error').innerText = ''
  }
}