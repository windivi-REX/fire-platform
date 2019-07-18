<template>
  <div class="gis-map-container">
    <baidu-map
      class="bm-view"
      :ak="mapToken"
      :center="center"
      :zoom="zoom"
      :scroll-wheel-zoom="scrollWheelZoom"
      @ready="handler"
      :mapStyle="mapStyle"
      :mapType="mapType"
      @moving="syncCenterAndZoom"
      @moveend="syncCenterAndZoom"
      @zoomend="syncCenterAndZoom"
    >
      <bml-marker-clusterer anchor="BMAP_ANCHOR_TOP_LEFT"></bml-marker-clusterer>
      <bm-map-type
        :map-types="['BMAP_NORMAL_MAP', 'BMAP_HYBRID_MAP', 'BMAP_SATELLITE_MAP']"
        anchor="BMAP_ANCHOR_TOP_LEFT"
      ></bm-map-type>
      <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true"></bm-geolocation>
      <bm-control anchor="BMAP_ANCHOR_TOP_RIGHT" offset="1">
        <el-button type="primary" @click="openDistanceTool">开启测距</el-button>
      </bm-control>
    </baidu-map>
  </div>
</template>

<script>
import BaiduMap from 'vue-baidu-map/components/map/Map.vue';
import {
  BmlMarkerClusterer,
  BmGeolocation,
  BmMapType,
  BmControl,
} from 'vue-baidu-map';
import DistanceTool from 'bmaplib.distancetool';
export default {
  components: {
    BaiduMap,
    BmlMarkerClusterer,
    BmGeolocation,
    BmMapType,
    BmControl,
  },
  data() {
    return {
      center: { lng: 0, lat: 0 },
      distanceToolRef: null,
      mapRef: null,
      BmapRef: null,
      zoom: 3,
      scrollWheelZoom: true,
      mapType: 'BMAP_SATELLITE_MAP',
      mapToken: 'f56cipYUkXBAbVVW1WMsgc6hd3Gpgjnz',
      mapStyle: {
        styleJson: [
          {
            featureType: 'all',
            elementType: 'geometry',
            stylers: {
              hue: '#007fff',
              saturation: 89,
            },
          },
          {
            featureType: 'water',
            elementType: 'all',
            stylers: {
              color: '#ffffff',
            },
          },
        ],
      },
    };
  },
  methods: {
    handler({ BMap, map }) {
      console.log('地图实例', BMap, map);
      this.center.lng = 116.404;
      this.center.lat = 39.915;
      this.zoom = 15;
      this.distanceToolRef = new DistanceTool(map, { lineStroke: 2 });
    },
    unmount() {
      distanceToolRef && distanceToolRef.close();
    },
    syncCenterAndZoom(e) {
      const { lng, lat } = e.target.getCenter();
      this.center.lng = lng;
      this.center.lat = lat;
      this.zoom = e.target.getZoom();
    },
    setDistanceToolInstance({ map }) {
      this.distanceToolRef = new DistanceTool(map, { lineStroke: 2 });
    },
    openDistanceTool(e) {
      const { distanceToolRef } = this;
      distanceToolRef && distanceToolRef.open();
    },
  },
};
</script>

<style lang="scss" scoped>
.gis-map-container {
  width: 100%;
  .bm-view {
    width: 100%;
    height: calc(100vh - 186px);
    padding: 4px;
    box-shadow: 0 2px 2px rgba(10, 16, 20, 0.24), 0 0 2px rgba(10, 16, 20, 0.12);
  }
}
</style>
<style lang="scss">
.gis-map-container {
  .BMap_cpyCtrl.BMap_noprint.anchorBL {
    display: none;
  }
  .anchorBL {
    display: none;
  }
}
</style>
