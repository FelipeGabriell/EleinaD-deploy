(function(a,b,c){"use strict";function d(b,c){this.element=b,this.$context=a(b).data("api",this),this.$layers=this.$context.find(".layer");var d={calibrateX:this.$context.data("calibrate-x")||null,calibrateY:this.$context.data("calibrate-y")||null,invertX:this.$context.data("invert-x")||null,invertY:this.$context.data("invert-y")||null,limitX:parseFloat(this.$context.data("limit-x"))||null,limitY:parseFloat(this.$context.data("limit-y"))||null,scalarX:parseFloat(this.$context.data("scalar-x"))||null,scalarY:parseFloat(this.$context.data("scalar-y"))||null,frictionX:parseFloat(this.$context.data("friction-x"))||null,frictionY:parseFloat(this.$context.data("friction-y"))||null,originX:parseFloat(this.$context.data("origin-x"))||null,originY:parseFloat(this.$context.data("origin-y"))||null,pointerEvents:this.$context.data("pointer-events")||!0,precision:parseFloat(this.$context.data("precision"))||1};for(var e in d)null===d[e]&&delete d[e];a.extend(this,f,c,d),this.calibrationTimer=null,this.calibrationFlag=!0,this.enabled=!1,this.depthsX=[],this.depthsY=[],this.raf=null,this.bounds=null,this.ex=0,this.ey=0,this.ew=0,this.eh=0,this.ecx=0,this.ecy=0,this.erx=0,this.ery=0,this.cx=0,this.cy=0,this.ix=0,this.iy=0,this.mx=0,this.my=0,this.vx=0,this.vy=0,this.onMouseMove=this.onMouseMove.bind(this),this.onDeviceOrientation=this.onDeviceOrientation.bind(this),this.onOrientationTimer=this.onOrientationTimer.bind(this),this.onCalibrationTimer=this.onCalibrationTimer.bind(this),this.onAnimationFrame=this.onAnimationFrame.bind(this),this.onWindowResize=this.onWindowResize.bind(this),this.initialise()}var e=30,f={relativeInput:!1,clipRelativeInput:!1,calibrationThreshold:100,calibrationDelay:500,supportDelay:500,calibrateX:!1,calibrateY:!0,invertX:!0,invertY:!0,limitX:!1,limitY:!1,scalarX:10,scalarY:10,frictionX:.1,frictionY:.1,originX:.5,originY:.5,pointerEvents:!0,precision:1};d.prototype.transformSupport=function(a){for(var d=c.createElement("div"),e=!1,f=null,g=!1,h=null,j=null,k=0,m=this.vendors.length;k<m;k++)if(null===this.vendors[k]?(h="transform",j="transform"):(h=this.vendors[k][0]+"transform",j=this.vendors[k][1]+"Transform"),void 0!==d.style[j]){e=!0;break}switch(a){case"2D":g=e;break;case"3D":if(e){var l=c.body||c.createElement("body"),n=c.documentElement,o=n.style.overflow,p=!1;c.body||(p=!0,n.style.overflow="hidden",n.appendChild(l),l.style.overflow="hidden",l.style.background=""),l.appendChild(d),d.style[j]="translate3d(1px,1px,1px)",f=b.getComputedStyle(d).getPropertyValue(h),g=f!==void 0&&0<f.length&&"none"!==f,n.style.overflow=o,l.removeChild(d),p&&(l.removeAttribute("style"),l.parentNode.removeChild(l))}}return g},d.prototype.ww=null,d.prototype.wh=null,d.prototype.wcx=null,d.prototype.wcy=null,d.prototype.wrx=null,d.prototype.wry=null,d.prototype.portrait=null,d.prototype.desktop=!navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|BB10|mobi|tablet|opera mini|nexus 7)/i),d.prototype.vendors=[null,["-webkit-","webkit"],["-moz-","Moz"],["-o-","O"],["-ms-","ms"]],d.prototype.motionSupport=!!b.DeviceMotionEvent,d.prototype.orientationSupport=!!b.DeviceOrientationEvent,d.prototype.orientationStatus=0,d.prototype.transform2DSupport=d.prototype.transformSupport("2D"),d.prototype.transform3DSupport=d.prototype.transformSupport("3D"),d.prototype.propertyCache={},d.prototype.initialise=function(){"static"===this.$context.css("position")&&this.$context.css({position:"relative"}),this.pointerEvents||this.$context.css({pointerEvents:"none"}),this.accelerate(this.$context),this.updateLayers(),this.updateDimensions(),this.enable(),this.queueCalibration(this.calibrationDelay)},d.prototype.updateLayers=function(){this.$layers=this.$context.find(".layer"),this.depthsX=[],this.depthsY=[],this.$layers.css({position:"absolute",display:"block",left:0,top:0}),this.$layers.first().css({position:"relative"}),this.accelerate(this.$layers),this.$layers.each(a.proxy(function(b,c){var d=a(c).data("depth")||0;this.depthsX.push(a(c).data("depth-x")||d),this.depthsY.push(a(c).data("depth-y")||d)},this))},d.prototype.updateDimensions=function(){this.ww=b.innerWidth,this.wh=b.innerHeight,this.wcx=this.ww*this.originX,this.wcy=this.wh*this.originY,this.wrx=Math.max(this.wcx,this.ww-this.wcx),this.wry=Math.max(this.wcy,this.wh-this.wcy)},d.prototype.updateBounds=function(){this.bounds=this.element.getBoundingClientRect(),this.ex=this.bounds.left,this.ey=this.bounds.top,this.ew=this.bounds.width,this.eh=this.bounds.height,this.ecx=this.ew*this.originX,this.ecy=this.eh*this.originY,this.erx=Math.max(this.ecx,this.ew-this.ecx),this.ery=Math.max(this.ecy,this.eh-this.ecy)},d.prototype.queueCalibration=function(a){clearTimeout(this.calibrationTimer),this.calibrationTimer=setTimeout(this.onCalibrationTimer,a)},d.prototype.enable=function(){this.enabled||(this.enabled=!0,this.orientationSupport?(this.portrait=null,b.addEventListener("deviceorientation",this.onDeviceOrientation),setTimeout(this.onOrientationTimer,this.supportDelay)):(this.cx=0,this.cy=0,this.portrait=!1,b.addEventListener("mousemove",this.onMouseMove)),b.addEventListener("resize",this.onWindowResize),this.raf=requestAnimationFrame(this.onAnimationFrame))},d.prototype.disable=function(){this.enabled&&(this.enabled=!1,this.orientationSupport?b.removeEventListener("deviceorientation",this.onDeviceOrientation):b.removeEventListener("mousemove",this.onMouseMove),b.removeEventListener("resize",this.onWindowResize),cancelAnimationFrame(this.raf))},d.prototype.calibrate=function(a,b){this.calibrateX=a===void 0?this.calibrateX:a,this.calibrateY=b===void 0?this.calibrateY:b},d.prototype.invert=function(a,b){this.invertX=a===void 0?this.invertX:a,this.invertY=b===void 0?this.invertY:b},d.prototype.friction=function(a,b){this.frictionX=a===void 0?this.frictionX:a,this.frictionY=b===void 0?this.frictionY:b},d.prototype.scalar=function(a,b){this.scalarX=a===void 0?this.scalarX:a,this.scalarY=b===void 0?this.scalarY:b},d.prototype.limit=function(a,b){this.limitX=a===void 0?this.limitX:a,this.limitY=b===void 0?this.limitY:b},d.prototype.origin=function(a,b){this.originX=a===void 0?this.originX:a,this.originY=b===void 0?this.originY:b},d.prototype.clamp=function(a,b,c){return a=Math.max(a,b),a=Math.min(a,c),a},d.prototype.css=function(b,c,d){var e=this.propertyCache[c];if(!e)for(var f=0,g=this.vendors.length;f<g;f++)if(e=null===this.vendors[f]?c:a.camelCase(this.vendors[f][1]+"-"+c),void 0!==b.style[e]){this.propertyCache[c]=e;break}b.style[e]=d},d.prototype.accelerate=function(a){for(var b,c=0,d=a.length;c<d;c++)b=a[c],this.css(b,"transform","translate3d(0,0,0)"),this.css(b,"transform-style","preserve-3d"),this.css(b,"backface-visibility","hidden")},d.prototype.setPosition=function(a,b,c){b+="px",c+="px",this.transform3DSupport?this.css(a,"transform","translate3d("+b+","+c+",0)"):this.transform2DSupport?this.css(a,"transform","translate("+b+","+c+")"):(a.style.left=b,a.style.top=c)},d.prototype.onOrientationTimer=function(){this.orientationSupport&&0===this.orientationStatus&&(this.disable(),this.orientationSupport=!1,this.enable())},d.prototype.onCalibrationTimer=function(){this.calibrationFlag=!0},d.prototype.onWindowResize=function(){this.updateDimensions()},d.prototype.onAnimationFrame=function(){this.updateBounds();var a=this.ix-this.cx,b=this.iy-this.cy;(Math.abs(a)>this.calibrationThreshold||Math.abs(b)>this.calibrationThreshold)&&this.queueCalibration(0),this.portrait?(this.mx=this.calibrateX?b:this.iy,this.my=this.calibrateY?a:this.ix):(this.mx=this.calibrateX?a:this.ix,this.my=this.calibrateY?b:this.iy),this.mx*=this.ew*(this.scalarX/100),this.my*=this.eh*(this.scalarY/100),isNaN(parseFloat(this.limitX))||(this.mx=this.clamp(this.mx,-this.limitX,this.limitX)),isNaN(parseFloat(this.limitY))||(this.my=this.clamp(this.my,-this.limitY,this.limitY)),this.vx+=(this.mx-this.vx)*this.frictionX,this.vy+=(this.my-this.vy)*this.frictionY;for(var c=0,d=this.$layers.length;c<d;c++){var e=this.depthsX[c],f=this.depthsY[c],g=this.$layers[c],h=this.vx*(e*(this.invertX?-1:1)),j=this.vy*(f*(this.invertY?-1:1));this.setPosition(g,h,j)}this.raf=requestAnimationFrame(this.onAnimationFrame)},d.prototype.onDeviceOrientation=function(a){if(!this.desktop&&null!==a.beta&&null!==a.gamma){this.orientationStatus=1;var c=(a.beta||0)/e,d=(a.gamma||0)/e,f=b.innerHeight>b.innerWidth;this.portrait!==f&&(this.portrait=f,this.calibrationFlag=!0),this.calibrationFlag&&(this.calibrationFlag=!1,this.cx=c,this.cy=d),this.ix=c,this.iy=d}},d.prototype.onMouseMove=function(a){var b=a.clientX,c=a.clientY;!this.orientationSupport&&this.relativeInput?(this.clipRelativeInput&&(b=Math.max(b,this.ex),b=Math.min(b,this.ex+this.ew),c=Math.max(c,this.ey),c=Math.min(c,this.ey+this.eh)),this.ix=(b-this.ex-this.ecx)/this.erx,this.iy=(c-this.ey-this.ecy)/this.ery):(this.ix=(b-this.wcx)/this.wrx,this.iy=(c-this.wcy)/this.wry)};var g={enable:d.prototype.enable,disable:d.prototype.disable,updateLayers:d.prototype.updateLayers,calibrate:d.prototype.calibrate,friction:d.prototype.friction,invert:d.prototype.invert,scalar:d.prototype.scalar,limit:d.prototype.limit,origin:d.prototype.origin};a.fn.parallax=function(b){var c=arguments;return this.each(function(){var e=a(this),f=e.data("parallax");f||(f=new d(this,b),e.data("parallax",f)),g[b]&&f[b].apply(f,Array.prototype.slice.call(c,1))})}})(window.jQuery||window.Zepto,window,document),function(){for(var a=0,b=["ms","moz","webkit","o"],c=0;c<b.length&&!window.requestAnimationFrame;++c)window.requestAnimationFrame=window[b[c]+"RequestAnimationFrame"],window.cancelAnimationFrame=window[b[c]+"CancelAnimationFrame"]||window[b[c]+"CancelRequestAnimationFrame"];window.requestAnimationFrame||(window.requestAnimationFrame=function(b){var c=new Date().getTime(),d=Math.max(0,16-(c-a)),e=window.setTimeout(function(){b(c+d)},d);return a=c+d,e}),window.cancelAnimationFrame||(window.cancelAnimationFrame=function(a){clearTimeout(a)})}();