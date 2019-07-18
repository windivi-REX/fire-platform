<template>
  <div class="gis-map-container">
    <baidu-map
      class="bm-view"
      :ak="mapToken"
      :center="startPoint"
      :zoom="startZoom"
      :scroll-wheel-zoom="scrollWheelZoom"
      @ready="afterMapInit"
      :mapStyle="mapStyle"
      :mapType="mapType"
      :mapClick="false"
      @click="mapClick"
      @moving="syncCenterAndZoom"
      @moveend="syncCenterAndZoom"
      @zoomend="syncCenterAndZoom"
    >
      <bm-control class="search-container" anchor="BMAP_ANCHOR_TOP_LEFT">
        <svg-icon class="search-icon" icon-class="search"></svg-icon>
        <input type="text" placeholder="请输入搜索关键字" />
      </bm-control>
      <bm-control class="display-group-container" anchor="BMAP_ANCHOR_TOP_LEFT">
        <div class="display-box-container" v-for="(item,key) in displayMap" :key="key">
          <span
            :style="{fontFamily:'lcd',color: item.color, fontSize: '42px',lineHeight: '34px'}"
          >{{item.value}}</span>
          <span :style="{color:'#fff',fontSize: '14px'}">{{item.text}}</span>
          <div class="anchor left-top"></div>
          <div class="anchor left-bottom"></div>
          <div class="anchor right-top"></div>
          <div class="anchor right-bottom"></div>
        </div>
      </bm-control>
      <bm-marker
        v-for="(marker, markerKey) in markerMap"
        :key="markerKey"
        :position="{lng: marker.lng, lat: marker.lat}"
        :dragging="marker.dragable"
        :icon="marker.icon"
        animation="BMAP_ANIMATION_BOUNCE"
        @click="markerClick($event,marker)"
      >
        <bm-overlay
          pane="floatPane"
          :class="{customPopup: true, active: marker.popupActive}"
          @draw="draw($event,marker)"
          @mouseover.native="popupOnHover($event,marker)"
          @mouseleave.native="popupOnLeave($event,marker)"
        >
          <el-button type="text" @click="closePopup($event,marker)">关闭</el-button>
          <el-button type="text" @click="toggleIcon($event,marker)">切换图标</el-button>
        </bm-overlay>
      </bm-marker>
      <!-- <bm-control class="bottom-list-container" anchor="BMAP_ANCHOR_BOTTOM_RIGHT">
        <div class="button-group-container">
          <button class="custom-button" @click="realTimeClick">
            <span>实时消息</span>
          </button>
          <button class="custom-button" @click="deviceListClick">
            <span>设备列表</span>
          </button>
          <button class="custom-button" @click="warningClick">
            <span>报警</span>
          </button>
          <button class="custom-button" @click="breakdownClick">
            <span>故障</span>
          </button>
          <button class="custom-button" @click="offlineClick">
            <span>离线</span>
          </button>
        </div>
      </bm-control>-->
    </baidu-map>
  </div>
</template>
<script>
// 经度:104.073058,纬度:30.595474
import BaiduMap from 'vue-baidu-map/components/map/Map.vue';
import { BmControl, BmOverlay, BmMarker, BmLabel } from 'vue-baidu-map';
import DistanceTool from 'bmaplib.distancetool';
export default {
  components: {
    BaiduMap,
    BmControl,
    BmOverlay,
    BmMarker,
    BmLabel,
  },
  data() {
    return {
      startPoint: { lng: 104.073058, lat: 30.595474 },
      distanceToolRef: null,
      mapRef: null,
      BmapRef: null,
      startZoom: 20,
      scrollWheelZoom: true,
      mapType: 'BMAP_NORMAL_MAP',
      mapToken: 'f56cipYUkXBAbVVW1WMsgc6hd3Gpgjnz',
      displayMap: {
        customers: { value: 1593, color: 'dodgerblue', text: '客户总数' },
        warnings: { value: 454564, color: 'orange', text: '告警总数' },
        onlineDevices: { value: 34566, color: 'yellow', text: '在线设备数' },
      },
      popupActive: false,
      mapStyle: {
        styleJson: [
          {
            featureType: 'all',
            elementType: 'geometry',
            stylers: {
              //   hue: '#0a3a6a',
              //   saturation: 89,
            },
          },
          //   {
          //     featureType: 'water',
          //     elementType: 'all',
          //     stylers: {
          //       color: '#0a3a6a',
          //     },
          //   },
        ],
      },
      BMapRef: null,
      mapRef: null,
      markerMap: {
        default: {
          lng: 104.073058,
          lat: 30.595474,
          popupElement: null,
          showPopup: false,
          popupActive: false,
          dragable: false,
          icon: {
            url: require('../../assets/image/road.png'),
            size: { width: '128', height: '128' },
            // opts: {
            //   anchor: { width: '100', height: '100' },
            //   imageOffset: { width: '100', height: '100' },
            //   imageSize: { width: '100', height: '100' },
            //   infoWindowAnchor: { width: '100', height: '100' },
            //   printImageUrl: String,
            // },
          },
          popupPoint: {
            lng: 104.073058,
            lat: 30.595474,
            offsetX: '0',
            offsetY: '80',
          },
        },
      },
    };
  },
  methods: {
    mapClick(e) {
      console.log(`经度:${e.point.lng},纬度:${e.point.lat}`);
      for (const attr in this.markerMap) {
        this.closePopup(e.domEvent, this.markerMap[attr]);
      }
    },
    draw({ el, BMap, map }, marker) {
      const { lat, lng, showPopup } = marker;
      const { lat: plat, lng: plng, offsetX, offsetY } = marker.popupPoint;
      const pixel = map.pointToOverlayPixel(new BMap.Point(plng, plat));
      if (!marker.popupElement) {
        marker.popupElement = el;
      }
      el.style.left = pixel.x - offsetX + 'px';
      el.style.top = pixel.y - offsetY + 'px';
      if (showPopup) {
        el.style.display = 'flex';
      } else {
        el.style.display = 'none';
      }
    },
    togglePopup(marker) {
      this.$set(marker, 'showPopup', !marker.showPopup);
      this.draw(
        {
          el: marker.popupElement,
          BMap: this.BMapRef,
          map: this.mapRef,
        },
        marker,
      );
    },
    afterMapInit({ BMap, map }) {
      this.BMapRef = BMap;
      this.mapRef = map;
    },
    unmount() {},
    syncCenterAndZoom(e) {
      const { lng, lat } = e.target.getCenter();
      this.startPoint.lng = lng;
      this.startPoint.lat = lat;
      this.startZoom = e.target.getZoom();
    },
    markerClick(e, marker) {
      e.domEvent.stopPropagation();
      this.togglePopup(marker);
    },
    closePopup(e, marker) {
      e.stopPropagation();
      marker.showPopup = false;
      marker.popupElement.style.display = 'none';
    },
    toggleIcon(e, marker) {
      e.stopPropagation();
      marker.icon.url = require('../../assets/image/M.png');
    },
    popupOnHover(e, marker) {
      e.stopPropagation();
      marker.popupActive = true;
    },
    popupOnLeave(e, marker) {
      e.stopPropagation();
      marker.popupActive = false;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/font/lcd/lcd.css';
.gis-map-container {
  width: 100%;
  .bm-view {
    width: 100%;
    height: calc(100vh - 186px);
    padding: 4px;
    box-shadow: 0 2px 2px rgba(10, 16, 20, 0.24), 0 0 2px rgba(10, 16, 20, 0.12);
  }
}
.search-container {
  border: 1px solid #fff;
  border-radius: 16px;
  @include flex(row, center, center);
  left: 16px !important;
  top: 16px !important;
  background-color: #a9a6dc6e;
  .search-icon {
    color: #fff;
    margin: 5px 0 5px 8px;
  }
  input {
    border-style: none;
    border-width: 0;
    background: transparent;
    color: #fff;
    padding: 5px 64px 5px 8px;
    &::placeholder {
      color: #fff;
    }
    &:focus {
      outline: none;
      outline-offset: 0;
      color: #fff;
      &::placeholder {
        color: transparent;
      }
    }
  }
}
.display-group-container {
  top: 80px !important;
  left: 20px !important;
  @include flex(column, space-between, space-between);
  height: 15.625rem;
  .display-box-container {
    position: relative;
    width: 180px;
    flex-basis: 20%;
    background-color: #a9a6dc6e;
    padding: 10px 0;
    @include flex(column, center, center);
    .anchor {
      position: absolute;
      &.left-top {
        border-top: 1px solid #fff;
        border-left: 1px solid #fff;
        width: 20px;
        height: 10px;
        left: -1px;
        top: -1px;
      }
      &.left-bottom {
        border-bottom: 1px solid #fff;
        border-left: 1px solid #fff;
        width: 20px;
        height: 10px;
        left: -1px;
        bottom: -1px;
      }
      &.right-top {
        border-right: 1px solid #fff;
        border-top: 1px solid #fff;
        width: 20px;
        height: 10px;
        right: -1px;
        top: -1px;
      }
      &.right-bottom {
        border-right: 1px solid #fff;
        border-bottom: 1px solid #fff;
        width: 20px;
        height: 10px;
        right: -1px;
        bottom: -1px;
      }
    }
  }
}
.customPopup {
  width: 280px;
  height: 160px;
  line-height: 40px;
  background: rgba(0, 0, 0, 0.5);
  @include flex(column, center, center);
  overflow: hidden;
  box-shadow: 0 0 5px #000;
  color: #fff;
  position: absolute;
}
.customPopup.active {
  background: rgba(0, 0, 0, 0.75);
  color: #fff;
}
// .bottom-list-container {
//   bottom: 0 !important;
//   left: 0 !important;
//   @include flex(column, space-between, space-between);
// }
// .custom-button {
//   min-width: 90px;
//   font-size: 1rem;
//   background-color: #a9a6dc6e;
//   border: 2px solid #fff;
//   border-radius: 0;
//   padding: 6px 10px;
// }
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
