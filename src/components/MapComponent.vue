<template>
    <div>
      <card class="card-map" title="Google Maps">
        <div class="map">
          <div id="map"></div>
        </div>
      </card>
      <div class="col-12">
        <label for="destino" class="form-label">Destino:</label>
        <input type="text" class="form-control" id="destino" :value="getDestination()" readonly>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      formData: Object
    },
    data() {
      return {
        map: null,
        marker: null
      };
    },
    mounted() {
      this.initMap();
    },
    methods: {
      initMap() {
        var myLatlng = new window.google.maps.LatLng(-17.783770238058192, -63.181008760700166);
        var mapOptions = {
          zoom: 13,
          center: myLatlng,
          scrollwheel: false,
          styles: []
        };
  
        this.map = new window.google.maps.Map(document.getElementById("map"), mapOptions);
  
        this.map.addListener('click', (event) => {
          this.onMapClick(event);
        });
      },
      onMapClick(event) {
        if (this.marker) {
          this.marker.setMap(null); // Elimina el marcador anterior si existe
        }
  
        this.marker = new window.google.maps.Marker({
          position: event.latLng,
          map: this.map,
          title: "Destino"
        });
  
        // Actualiza las coordenadas en formData
        this.formData.latitud = event.latLng.lat();
        this.formData.longitud = event.latLng.lng();
      },
      getDestination() {
        // Retorna la concatenación de latitud y longitud para mostrar en el input
        if (this.formData.latitud && this.formData.longitud) {
          return `${this.formData.latitud}, ${this.formData.longitud}`;
        }
        return '';
      }
    }
  };
  </script>
  
  <style scoped>
  .map-container {
    height: 400px;
    width: 100%;
    margin-bottom: 20px;
  }
  </style>
  