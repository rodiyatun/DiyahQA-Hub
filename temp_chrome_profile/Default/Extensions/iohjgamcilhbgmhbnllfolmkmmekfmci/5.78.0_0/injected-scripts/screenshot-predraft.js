export const ids=["892"];export const modules={86499:function(e){e.exports="data:image/svg+xml;charset=utf-8;base64,PHN2ZyB3aWR0aD0iMzUiIGhlaWdodD0iMzUiIHZpZXdCb3g9IjAgMCAzNSAzNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggb3BhY2l0eT0iMC4xNSIgZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0yMyAxNy41QzIzIDIwLjUzNyAyMC41MzcgMjMgMTcuNSAyM0MxNC40NjIgMjMgMTIgMjAuNTM3IDEyIDE3LjVDMTIgMTQuNDYyIDE0LjQ2MiAxMiAxNy41IDEyQzIwLjUzNyAxMiAyMyAxNC40NjIgMjMgMTcuNVoiIGZpbGw9IiMyMzFGMjAiLz4KPHBhdGggb3BhY2l0eT0iMC4zIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTIzIDE3LjVDMjMgMjAuNTM3IDIwLjUzNyAyMyAxNy41IDIzQzE0LjQ2MiAyMyAxMiAyMC41MzcgMTIgMTcuNUMxMiAxNC40NjIgMTQuNDYyIDEyIDE3LjUgMTJDMjAuNTM3IDEyIDIzIDE0LjQ2MiAyMyAxNy41VjE3LjVaIiBzdHJva2U9IiMyMzFGMjAiLz4KPHBhdGggb3BhY2l0eT0iMC44NSIgZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik02IDE4SDE3LjAwMlYxN0g2VjE4WiIgZmlsbD0iIzIzMUYyMCIvPgo8cGF0aCBvcGFjaXR5PSIwLjg1IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTE4IDE4SDI5VjE3SDE4VjE4WiIgZmlsbD0iIzIzMUYyMCIvPgo8cGF0aCBvcGFjaXR5PSIwLjg1IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTE3IDE3SDE4VjZIMTdWMTdaIiBmaWxsPSIjMjMxRjIwIi8+CjxwYXRoIG9wYWNpdHk9IjAuODUiIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMTcgMjlIMThWMThIMTdWMjlaIiBmaWxsPSIjMjMxRjIwIi8+Cjwvc3ZnPgo="},63018:function(e,t,n){n.r(t),n.d(t,{onError:()=>ed,PreDraftScreenshot:()=>ec});var i=n(52322),o=n(19381),r=n(13884),s=n(85859),a=n(59460),c=n(80781),d=n(84921),l=n(76628),u=n(75958),h=n(2784),p=n(3331),L=n(91991),x=n(78393),g=n(12957),w=n.n(g),M=n(28316),y=n(52040),v=n(86573);function I(e){return"touches"in e}var m=n(28165),j=n(86499),f=n.n(j);let C=()=>(0,i.jsx)(m.xB,{styles:(0,m.iv)`
        * {
          cursor: url(${f()}) 17.5 17.5, pointer !important;
        }
      `});var b=n(7184),D=n(46778);let S=(0,u.Pi)(function(e){let t=(0,p.oV)(),n=t?.position,{dragToScreenshot:o}=e,r=(0,h.useRef)(null);if((0,h.useEffect)(()=>t.bind(),[t]),!n)return null;let{x:s,y:a}=n,c=o.startPoint,d=o.currentPoint;if(c&&d&&!o.isDragging)return null;let l=e.tooltip;d&&c&&(l=function(e){let t=e?.startPoint,n=e?.currentPoint;if(!t||!n)return"";let i=Math.abs(Math.round(n.x-t.x)),o=Math.abs(Math.round(n.y-t.y));return 0===i&&0===o?null:`${i}x${o}`}(o));let u=r.current?.getBoundingClientRect()??{width:0,x:0,height:0,y:0},L=s+u?.width>=window.innerWidth?u?.width:0,x=a+u?.height>=window.innerHeight?u?.height:0;return l?(0,i.jsx)(Z,{ref:r,style:{left:s-L+5,top:a-x+5},children:l}):null}),Z=b.Z.span`
  font-family: Inter, sans-serif;
  font-weight: semibold;
  position: fixed;
  font-size: 12px;
  display: inline-block;
  white-space: pre;
  letter-spacing: normal;
  overflow: visible;
  font-size: 14px;
  line-height: 20px;
  color: ${D.O.white};
  background: rgba(42, 54, 50, 0.6);
  border-radius: 40px;
  padding: 8px 12px;
  user-select: none;
`,T=(0,u.Pi)(function(e){let{currentPoint:t,startPoint:n,isDragging:o}=e.dragToScreenshot;if(!o||!n||!t)return null;let r=Math.abs(t.y-n.y),s=Math.abs(t.x-n.x);return(0,i.jsx)(E,{style:{left:Math.min(t.x,n.x),top:Math.min(t.y,n.y),width:s,height:r}})}),E=b.Z.div`
  position: absolute;
  background-color: ${function(e,t){let n=Number.parseInt(e.slice(1,3),16),i=Number.parseInt(e.slice(3,5),16),o=Number.parseInt(e.slice(5,7),16);return`rgba(${n}, ${i}, ${o}, 0.5)`}(D.O.leaf,0)};
`,B=e=>{var t,n;let[o,r]=(0,h.useState)(!1),a=(0,p.z3)(),c=(0,h.useContext)(x.R),d=(0,p.MU)(),l=e.dragToScreenshotStore,u=(0,y.T)();return((0,h.useEffect)(()=>{d.send({eventName:"FreezeClickEvents",dest:{component:s.wA.HostScript,location:s.Ye.HostScripts.AdditionalHooks,tabId:a},data:!0})},[d,a]),(0,v.q)(u),t=c,n={onMouseMove:w()(z)(l),onMouseDown:w()(k)(l),onMouseUp:w()(A)(l,e.isDelayed)(async t=>{(0,M.flushSync)(()=>{r(!0)}),await new Promise(requestAnimationFrame),e.onFinished(t)})},(0,h.useEffect)(()=>{if(t)return n.onMouseMove&&(t.addEventListener("pointermove",n.onMouseMove,{passive:!0}),t.addEventListener("touchmove",n.onMouseMove,{passive:!0})),n.onMouseDown&&(t.addEventListener("mousedown",n.onMouseDown,{passive:!0}),t.addEventListener("touchstart",n.onMouseDown,{passive:!0})),n.onMouseUp&&(t.addEventListener("mouseup",n.onMouseUp,{passive:!0}),t.addEventListener("touchend",n.onMouseUp,{passive:!0})),()=>{n.onMouseMove&&(t.removeEventListener("pointermove",n.onMouseMove),t.removeEventListener("touchmove",n.onMouseMove)),n.onMouseDown&&(t.removeEventListener("mousedown",n.onMouseDown),t.removeEventListener("touchstart",n.onMouseDown)),n.onMouseUp&&(t.removeEventListener("mouseup",n.onMouseUp),t.removeEventListener("touchend",n.onMouseUp))}},[t,n]),o)?(0,i.jsx)("div",{}):(0,i.jsxs)("div",{children:[(0,i.jsx)(C,{}),(0,i.jsx)(S,{tooltip:e.tooltip,dragToScreenshot:l}),(0,i.jsx)(T,{dragToScreenshot:l})]})};function k(e,t){if(e.startPoint)return;let n=I(t)?t.touches.item(0):t;n&&(e.setIsDragging(!0),e.setStartPoint(n.clientX,n.clientY))}function z(e,t){if(!e.isDragging)return;let n=I(t)?t.changedTouches.item(0):t;n&&e.setCurrentPoint(n.clientX,n.clientY)}function A(e,t,n,i){if(e.wasItClickEvent()){n({variant:t?"fullscreen_delayed":"fullscreen"});return}if(e.startPoint&&e.currentPoint){if(!(I(i)?i.changedTouches.item(0):i))return;let{currentPoint:o,startPoint:r}=e,s={x:Math.min(o.x,r.x),y:Math.min(o.y,r.y),width:Math.round(Math.abs(o.x-r.x)),height:Math.round(Math.abs(o.y-r.y))};e.setIsDragging(!1),n({variant:t?"cropped_delayed":"cropped",boundaries:s});return}}var N=n(19046),$=n(12614),P=n(2943);let G=(0,u.Pi)(e=>(0,i.jsx)(U,{x:e.x,y:e.y,width:e.width,height:e.height,onClick:e.onClick,children:e.children})),U=b.Z.button`
  position: fixed;
  left: ${e=>e.x}px;
  top: ${e=>e.y}px;
  width: ${e=>e.width}px;
  height: ${e=>e.height}px;
  display: flex;
  gap: 4px;
  justify-content: center;
  align-items: center;
  background: rgba(30, 38, 36, 0.4);
  border-radius: 16px;
  color: ${D.O.white};
  cursor: pointer;
  pointer-events: auto;
  &:hover {
    background: rgba(30, 38, 36, 0.3);
  }
`,W=104,V=32,F={size:69},H={x:32,y:32};var X=n(37394);let Y=e=>"Esc"===e.key,Q=e=>(0,i.jsx)("svg",{width:e.width??"120",height:e.height??"120",viewBox:"0 0 120 120",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:(0,i.jsx)("path",{d:"M60 0L64.1835 12.1827L70.4189 0.911533L72.4233 13.6356L80.5212 3.61844L80.2857 16.4972L90 8.03848L87.5317 20.6807L98.5673 14.0373L93.9411 26.0589L105.963 21.4327L99.3193 32.4683L111.962 30L103.503 39.7143L116.382 39.4788L106.364 47.5767L119.088 49.5811L107.817 55.8165L120 60L107.817 64.1835L119.088 70.4189L106.364 72.4233L116.382 80.5212L103.503 80.2857L111.962 90L99.3193 87.5317L105.963 98.5673L93.9411 93.9411L98.5673 105.963L87.5317 99.3193L90 111.962L80.2857 103.503L80.5212 116.382L72.4233 106.364L70.4189 119.088L64.1835 107.817L60 120L55.8165 107.817L49.5811 119.088L47.5767 106.364L39.4788 116.382L39.7143 103.503L30 111.962L32.4683 99.3193L21.4327 105.963L26.0589 93.9411L14.0373 98.5673L20.6807 87.5317L8.03848 90L16.4972 80.2857L3.61844 80.5212L13.6356 72.4233L0.911533 70.4189L12.1827 64.1835L0 60L12.1827 55.8165L0.911533 49.5811L13.6356 47.5767L3.61844 39.4788L16.4972 39.7143L8.03848 30L20.6807 32.4683L14.0373 21.4327L26.0589 26.0589L21.4327 14.0373L32.4683 20.6807L30 8.03848L39.7143 16.4972L39.4788 3.61844L47.5767 13.6356L49.5811 0.911533L55.8165 12.1827L60 0Z",fill:D.O.darkGrape})},"starburst-0"),O=e=>(0,i.jsx)("svg",{width:e.width??"120",height:e.height??"120",viewBox:"0 0 120 120",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:(0,i.jsx)("path",{d:"M60 0L64.1835 12.1827L70.4189 0.911533L72.4233 13.6356L80.5212 3.61844L80.2857 16.4972L90 8.03848L87.5317 20.6807L98.5673 14.0373L93.9411 26.0589L105.963 21.4327L99.3193 32.4683L111.962 30L103.503 39.7143L116.382 39.4788L106.364 47.5767L119.088 49.5811L107.817 55.8165L120 60L107.817 64.1835L119.088 70.4189L106.364 72.4233L116.382 80.5212L103.503 80.2857L111.962 90L99.3193 87.5317L105.963 98.5673L93.9411 93.9411L98.5673 105.963L87.5317 99.3193L90 111.962L80.2857 103.503L80.5212 116.382L72.4233 106.364L70.4189 119.088L64.1835 107.817L60 120L55.8165 107.817L49.5811 119.088L47.5767 106.364L39.4788 116.382L39.7143 103.503L30 111.962L32.4683 99.3193L21.4327 105.963L26.0589 93.9411L14.0373 98.5673L20.6807 87.5317L8.03848 90L16.4972 80.2857L3.61844 80.5212L13.6356 72.4233L0.911533 70.4189L12.1827 64.1835L0 60L12.1827 55.8165L0.911533 49.5811L13.6356 47.5767L3.61844 39.4788L16.4972 39.7143L8.03848 30L20.6807 32.4683L14.0373 21.4327L26.0589 26.0589L21.4327 14.0373L32.4683 20.6807L30 8.03848L39.7143 16.4972L39.4788 3.61844L47.5767 13.6356L49.5811 0.911533L55.8165 12.1827L60 0Z",fill:"#73E5BF"})},"starburst-1"),J=e=>(0,i.jsx)("svg",{width:e.width??"114",height:e.height??"114",viewBox:"0 0 114 114",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:(0,i.jsx)("path",{d:"M51.211 2.98853C54.0653 -0.950313 59.9347 -0.950311 62.789 2.98853C64.9822 6.01503 69.1365 6.84138 72.321 4.88455C76.4653 2.33784 81.8879 4.58394 83.0176 9.31526C83.8857 12.9507 87.4075 15.3039 91.0984 14.7147C95.9019 13.9478 100.052 18.0981 99.2853 22.9016C98.6961 26.5925 101.049 30.1143 104.685 30.9824C109.416 32.1121 111.662 37.5347 109.115 41.679C107.159 44.8635 107.985 49.0178 111.011 51.211C114.95 54.0653 114.95 59.9347 111.011 62.789C107.985 64.9822 107.159 69.1365 109.115 72.321C111.662 76.4653 109.416 81.8879 104.685 83.0176C101.049 83.8857 98.6961 87.4075 99.2853 91.0984C100.052 95.9019 95.9019 100.052 91.0984 99.2853C87.4075 98.6961 83.8857 101.049 83.0176 104.685C81.8879 109.416 76.4653 111.662 72.321 109.115C69.1365 107.159 64.9822 107.985 62.789 111.011C59.9347 114.95 54.0653 114.95 51.211 111.011C49.0178 107.985 44.8635 107.159 41.679 109.115C37.5347 111.662 32.1121 109.416 30.9824 104.685C30.1143 101.049 26.5925 98.6961 22.9016 99.2853C18.0981 100.052 13.9478 95.9019 14.7147 91.0984C15.3039 87.4075 12.9507 83.8857 9.31526 83.0176C4.58394 81.8879 2.33785 76.4653 4.88455 72.321C6.84138 69.1365 6.01503 64.9822 2.98853 62.789C-0.95031 59.9347 -0.950313 54.0653 2.98853 51.211C6.01503 49.0178 6.84138 44.8635 4.88455 41.679C2.33784 37.5347 4.58394 32.1121 9.31526 30.9824C12.9507 30.1143 15.3039 26.5925 14.7147 22.9016C13.9478 18.0981 18.0981 13.9478 22.9016 14.7147C26.5925 15.3039 30.1143 12.9507 30.9824 9.31526C32.1121 4.58394 37.5347 2.33784 41.679 4.88455C44.8635 6.84138 49.0178 6.01503 51.211 2.98853Z",fill:"#73E5BF"})},"starburst-2"),R=e=>(0,i.jsx)("svg",{width:e.width??"108",height:e.height??"108",viewBox:"0 0 108 108",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:(0,i.jsx)("circle",{cx:"54",cy:"54",r:"54",fill:"#73E5BF"})},"starburst-3");function _(e){let t=[{key:0,component:(0,i.jsx)(O,{width:e.width,height:e.height},"1")},{key:1,component:(0,i.jsx)(J,{width:e.width,height:e.height},"2")},{key:2,component:(0,i.jsx)(R,{width:e.width,height:e.height},"3")}],n=t.length,o=Math.abs(n-e.second)%n,r=t.find(e=>e.key===o),[s,a]=(0,h.useState)(!1),c=e.onCancel?"pointer":"auto";(0,X.W)("keydown",Y,()=>e.onCancel?.());let d=e.cancelText??(0,i.jsx)(P.x,{font:"heading",size:"heading3",color:"white",children:"Cancel"});return s&&e.onCancel?(0,i.jsxs)(q,{onMouseLeave:()=>{a(!1)},onClick:e.onCancel,onMouseDown:e=>{e.preventDefault()},cursor:c,children:[(0,i.jsx)(Q,{width:e.width,height:e.height}),(0,i.jsx)(K,{children:d})]}):(0,i.jsxs)(q,{onMouseOver:()=>a(!0),onMouseEnter:()=>a(!0),cursor:c,children:[r?.component,(0,i.jsx)(K,{children:(0,i.jsx)(P.x,{...e.textProps,children:e.paused?"‖":e.second})})]})}let q=b.Z.div`
  pointer-events: auto;
  position: relative;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    cursor: ${e=>e.cursor};
  }
`,K=b.Z.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`,ee=(0,u.Pi)(e=>e.countdownSec<N.p?null:(0,i.jsx)(et,{x:e.x,y:e.y,children:(0,i.jsx)(_,{second:e.countdownSec,paused:e.paused,cancelText:(0,i.jsx)($.A,{size:20,style:{color:D.O.white}}),width:F.size,height:F.size,textProps:{as:"h2",color:"black",weight:"regular"}})})),et=b.Z.div`
  position: fixed;
  width: 78px;
  height: 78px;
  left: ${e=>e.x}px;
  top: ${e=>e.y}px;
  display: flex;
  align-items: center;
  justify-content: center;
  justify-content: center;
  pointer-events: none;
`,en=(0,u.Pi)(e=>{let{countdownSec:t,delay:n,cropBoundaries:o}=e,r=o.y<40,s=o.x<40,a=r?o.height:0,c=ei({countdownSec:t,delay:n}),d=eo({countdownSec:t,delay:n});return(0,i.jsxs)("div",{children:[(0,i.jsx)(er,{cropBoundaries:o,backgroundOpacity:c,borderOpacity:d}),(0,i.jsx)(ee,{countdownSec:t,paused:e.paused,x:o.x+(s?-5:-30),y:o.y+a+(r?-12:-56)}),(0,i.jsxs)(G,{x:o.x+o.width-W,y:o.y+a+(r?8:-40),width:W,height:V,onClick:e.onCancelCounting,children:[(0,i.jsx)($.A,{size:24,style:{color:D.O.white}}),(0,i.jsx)(P.x,{color:"white",size:"bodySmall",weight:"regular",children:"Cancel"})]})]})}),ei=e=>{let t=.3/e.delay;return .2+e.countdownSec*t},eo=e=>{let t=Math.abs(-.4)/e.delay;return .8-e.countdownSec*t},er=b.Z.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, ${e=>e.backgroundOpacity});
  backdrop-filter: grayscale(1);
  transition: background 0.2s cubic-bezier(0.5, 0, 0.75, 0);

  ${e=>(0,m.iv)`
    clip-path: polygon(
      0 0,
      0 ${window.innerHeight}px,
      ${e.cropBoundaries.x}px ${window.innerHeight}px,
      ${e.cropBoundaries.x}px ${e.cropBoundaries.y}px,
      ${e.cropBoundaries.x+e.cropBoundaries.width}px
        ${e.cropBoundaries.y}px,
      ${e.cropBoundaries.x+e.cropBoundaries.width}px
        ${e.cropBoundaries.y+e.cropBoundaries.height}px,
      ${e.cropBoundaries.x}px
        ${e.cropBoundaries.y+e.cropBoundaries.height}px,
      ${e.cropBoundaries.x}px ${window.innerHeight}px,
      ${window.innerWidth}px ${window.innerHeight}px,
      ${window.innerWidth}px 0
    );
  `};

  &:before {
    content: "";
    background-color: rgba(0, 0, 0, ${e=>e.borderOpacity});
    display: block;
    position: relative;
    height: ${e=>e.cropBoundaries.height+4}px;
    width: ${e=>e.cropBoundaries.width+4}px;
    top: ${e=>e.cropBoundaries.y-2}px;
    left: ${e=>e.cropBoundaries.x-2}px;
    clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
  }
`,es=(0,u.Pi)(e=>(0,i.jsxs)("div",{children:[(0,i.jsx)(ee,{countdownSec:e.countdownSec,x:H.x,y:window.innerHeight-(F.size+H.y),paused:e.paused}),(0,i.jsxs)(G,{x:window.innerWidth-(H.x+W),y:window.innerHeight-(H.y+V),width:W,height:V,onClick:e.onCancelCounting,children:[(0,i.jsx)($.A,{size:24,style:{color:D.O.white}}),(0,i.jsx)(P.x,{color:"white",weight:"regular",children:"Cancel"})]})]})),ea=(0,u.Pi)(e=>{let[t,n]=(0,h.useState)(!1),{captureDetails:o,delay:r}=e,s=(0,y.T)(),{second:a,paused:c}=(0,N.a)({from:r/1e3,async onComplete(){n(!0)}});return((0,h.useEffect)(()=>{t&&window.requestAnimationFrame(()=>{e.onFinished()})},[t]),(0,v.q)(s),t)?null:o&&"fullscreen_delayed"===o.variant?(0,i.jsx)(es,{onCancelCounting:e.onCancelled,countdownSec:a,paused:c}):o&&"cropped_delayed"===o.variant?(0,i.jsx)(en,{onCancelCounting:e.onCancelled,cropBoundaries:o.boundaries,delay:r,countdownSec:a,paused:c}):null}),ec=(0,u.Pi)(function(e){let{setAllowSiteInteraction:t}=e,n=function(e){let{setAllowSiteInteraction:t}=e,[n,i]=(0,h.useState)(null),o=(0,p.dR)(),r=o.captureStateScreenshotDelay,a=(0,p.MU)(),c=(0,p.EO)().screenshot;(0,h.useEffect)(()=>(t(!!n||c.screenshotIsCaptured),()=>t(!0)),[n,t,c.screenshotIsCaptured]);let d=async e=>r>0?i(e):await el(a,o.currentTab.id,e);return o.capture.type!==l.K8.Screenshot||o.capture.type===l.K8.Screenshot&&"selecting_mode"!==o.capture.state.name?{state:"draft"}:n?{state:"countdown",delay:r,captureDetails:n,onFinished:()=>el(a,o.currentTab.id,n),onCancelled:()=>{a.send({eventName:"Dismiss",dest:{component:s.wA.Main,location:void 0},data:{}})}}:{state:"crosshairs",store:c.dragToScreenshot,onDragFinished:d,tooltip:r>0?`click or drag to start ${r/1e3}s timer`:"click or drag to screenshot",isDelayed:r>0}}({setAllowSiteInteraction:t});return((0,a.Q)({interaction:"screenshot_start",variant:"success",policy:{when:"onCondition",condition:["crosshairs","countdown"].includes(n.state)}}),"crosshairs"===n.state)?(0,i.jsx)(B,{tooltip:n.tooltip,dragToScreenshotStore:n.store,onFinished:n.onDragFinished,isDelayed:n.isDelayed}):"countdown"===n.state?(0,i.jsx)(ea,{delay:n.delay,captureDetails:n.captureDetails,onFinished:n.onFinished,onCancelled:n.onCancelled}):(n.state,null)});function ed(e,t,n){d.k.error("PreDraftScreenshot: failed to launch draft UI",{error:n,checkpoint:t}),e.send({eventName:"Dismiss",dest:{component:s.wA.Main,location:void 0},data:{}}),L.h.enqueue({title:"Couldn't crop screenshot. Try again",icon:"error",dismissable:!0,ttl:o.eq("3s")}),(0,c.Y)().finalize("screenshot_capture","failure",{error:(0,r.VK)(n)})}async function el(e,t,n){d.k.debug("handleCapture",{captureDetails:n});try{let e=await (0,c.Y)().create("screenshot_capture",{createTimeout:o.eq("1s"),traceTimeout:o.eq("1m"),tags:{variant:n.variant}});d.k.debug("screenshot_capture trace result",{traceResult:e})}catch(e){d.k.error("screenshot_capture trace error",{error:e})}let i="fullscreen"===n.variant,{dataUrl:a}=await e.send({eventName:"CaptureScreenshot",dest:{component:s.wA.Main,location:void 0},timeout:o.eq("15s"),data:{variant:i?"fullscreen":"cropped"}});try{let i=await e.send({eventName:"SetScreenshotCaptureDetails",dest:{component:s.wA.Iframe,location:s.Ye.Iframes.JamUi,tabId:t},data:{...n,originalScreenshotDataURL:a}});i.ok||ed(e,"SetScreenshotCaptureDetails",i)}catch(t){ed(e,"SetScreenshotCaptureDetails",(0,r.LT)(t))}}}};
//# sourceMappingURL=screenshot-predraft.js.map