属性名	             类型	     默认值	  描述
ak	                String		        百度地图开发者平台申请的密钥，仅在局部注册组件时声明。
center	            Point,      String		定位, 可使用如“广州市海珠区”的地区字符串，也可以使用对象如 {lng: 116.404, lat: 39.915} 表示经纬度
zoom	            Number		        缩放等级
min-zoom	        Number		        最小缩放级别
max-zoom	        Number		        最大缩放级别
high-resolution	    Boolean	    true	高分屏模式 该项仅在地图组件挂载时加载一次
map-click	        Boolean	    true	允许点击 该项仅在地图组件挂载时加载一次
map-type	        String	    global.BMAP_NORMAL_MAP	地图类型
dragging	        Boolean	    true	允许拖拽
scroll-wheel-zoom	Boolean	    false	允许鼠标滚轮缩放
double-click-zoom	Boolean	    true	允许双击缩放
keyboard	        Boolean	    true	允许键盘操作
inertial-dragging	Boolean	    false	允许惯性拖拽
continuous-zoom	    Boolean	    false	允许无级缩放
pinch-to-zoom	    Boolean	    true	允许双指缩放
auto-resize	        Boolean	    true	允许自适应容器尺寸
mapStyle	        MapStyle		    自定义地图样式主题
theme	            Array		        自定义主题，是 mapStyle.styleJson 属性的别名，可能会在下一个主版本中 移除 ，不推荐使用


事件
事件名	参数	描述
click	        {type, target, point, pixel, overlay}	左键单击地图时触发此事件。 当双击时，产生的事件序列为： click click dblclick
dblclick	    {type, target, pixel, point}	鼠标双击地图时会触发此事件
rightclick	    {type, target, point, pixel, overlay}	右键单击地图时触发此事件。 当双击时，产生的事件序列为： rightclick rightclick rightdblclick
rightdblclick	{type, target, point, pixel, overlay}	右键双击地图时触发此事件
maptypechange	{type, target}	地图类型发生变化时触发此事件
mousemove	    {type, target, point, pixel, overlay}	鼠标在地图区域移动过程中触发此事件
mouseover	    {type, target}	鼠标移入地图区域时触发此事件
mouseout	    {type, target}	鼠标移出地图区域时触发此事件
movestart	    {type, target}	地图移动开始时触发此事件
moving	        {type, target}	地图移动过程中触发此事件
moveend	        {type, target}	地图移动结束时触发此事件
zoomstart	    {type, target}	地图更改缩放级别开始时触发触发此事件
zoomend	        {type, target}	地图更改缩放级别结束时触发触发此事件
addoverlay	    {type, target}	当使用Map.addOverlay()方法向地图中添加单个覆盖物时会触发此事件
addcontrol	    {type, target}	当使用Map.addControl()方法向地图中添加单个控件时会触发此事件
removecontrol	{type, target}	当使用Map.removeControl()方法移除单个控件时会触发此事件
removeoverlay	{type, target}	当使用Map.removeOverlay()方法移除单个覆盖物时会触发此事件
clearoverlays	{type, target}	当使用Map.clearOverlays()方法一次性移除全部覆盖物时会触发此事件
dragstart	    {type, target, pixel, point}	开始拖拽地图时触发
dragging	    {type, target, pixel, point}	拖拽地图过程中触发
dragend	        {type, target, pixel, point}	停止拖拽地图时触发
addtilelayer	{type, target}	添加一个自定义地图图层时触发此事件
removetilelayer	{type, target}	移除一个自定义地图图层时触发此事件
load	        {type, target, pixel, point, zoom}	调用Map.centerAndZoom()方法时会触发此事件。这表示位置、缩放层级已经确定，但可能还在载入地图图块
resize	        {type, target, size}	地图可视区域大小发生变化时会触发此事件
hotspotclick	{type, target, spots}	点击热区时触发此事件
hotspotover	    {type, target, spots}	鼠标移至热区时触发此事件
hotspotout	    {type, target, spots}	鼠标移出热区时触发此事件
tilesloaded	    {type, target}	当地图所有图块完成加载时触发此事件
touchstart	    {type, target, point,pixel}	触摸开始时触发此事件，仅适用移动设备
touchmove	    {type, target, point,pixel}	触摸移动时触发此事件，仅适用移动设备
touchend	    {type, target, point,pixel}	触摸结束时触发此事件，仅适用移动设备
longpress	    {type, target, point,pixel}	长按事件，仅适用移动设备
