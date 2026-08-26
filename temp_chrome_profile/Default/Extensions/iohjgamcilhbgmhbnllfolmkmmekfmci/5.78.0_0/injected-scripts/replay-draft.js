export const ids=["378"];export const modules={6891:function(e,t,i){i.d(t,{Q:()=>o});var n=i(2784),r=i(25171);function o(e){let{interaction:t,variant:i,tags:o,policy:a}=e,s="onMount"===a.when?[]:[a.condition],l=n.useRef(!1);n.useEffect(()=>{!l.current&&("onCondition"!==a.when||a.condition)&&(l.current=!0,"failure"===i?(0,r.Y)().finalize(t,"failure",{error:e.error,tags:o}):(0,r.Y)().finalize(t,i,{tags:o}))},s)}},65192:function(e,t,i){i.r(t),i.d(t,{Rewind:()=>U});var n=i(52322),r=i(7184),o=i(77938),a=i(90608),s=i(76524),l=i(63403),d=i(6891),c=i(70621),h=i(49710),u=i(75958),p=i(2784),f=i(94938),w=i(28128),m=i(61525),g=i(92487),v=i(20004);function y(e,t){let i=e.current?.querySelector("iframe");if(t){let e=i?.getBoundingClientRect();return{height:e?.height?e.height+"px":"100%",width:e?.width?e.width+"px":"100%"}}return{height:i?.scrollHeight?i.scrollHeight+"px":"100%",width:i?.scrollWidth?i.scrollWidth+"px":"100%"}}let x=e=>{let t=Number.parseFloat(e.width),i=Number.parseFloat(e.height);return isNaN(t)||isNaN(i)||0===i?16/9:t/i},j=e=>{let t=e.iframe.contentDocument;if(t)for(let e of Array.from(t.querySelectorAll("audio")))e?.pause()},b=e=>{let{events:t,initializeStoreWithReplayer:i}=e,r=(0,p.useRef)(null),o=(0,p.useRef)(null),[a,s]=(0,p.useState)(null),[l,d]=(0,p.useState)(y(o)),c=(0,p.useCallback)(e=>{!function(e,t){e.style.position="absolute",e.style.left="50%",e.style.top="50%";let i=t?{width:window.innerWidth,height:window.innerHeight}:{width:e.parentElement?.clientWidth??window.innerWidth,height:e.parentElement?.clientHeight??window.innerHeight},n={width:e.scrollWidth,height:e.scrollHeight},r=function(e,t){let i=e.height/t.height;return Math.min(e.width/t.width,i)}(t?{width:window.innerWidth,height:window.innerHeight}:i,n);e.style.transform=`scale(${r}) translate(-50%, -50%)`}(e.wrapper,!1),d(y(o))},[]);(0,p.useEffect)(()=>{if(!o.current)return;o.current.childNodes.forEach(e=>e.remove());let e=new f.xB(t,{UNSAFE_replayCanvas:!0,speed:1,root:o.current,unpackFn:void 0,mouseTail:!1,skipInactive:!1,triggerFocus:!1,showDebug:!1,showWarning:!1});if(s(e),e)return j(e),e.iframe.setAttribute("sandbox",""),()=>e.pause()},[t]),(0,p.useEffect)(()=>{if(!a||!r.current)return;let e=new ResizeObserver(()=>{requestAnimationFrame(()=>{c(a)})});return e.observe(r.current),()=>e.disconnect()},[a,c]),(0,p.useEffect)(()=>{i?.(a??void 0)},[a,i]);let h=x(l);return(0,n.jsx)(R,{ref:r,$aspectRatio:h,children:(0,n.jsx)(S,{children:(0,n.jsx)(E,{ref:o,className:"rr-block session-player"})})})},S=r.Z.div`
  width: 100%;
  height: 100%;
`,R=r.Z.div`
  position: relative;
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
  margin-bottom: 16px;
  outline: none;
  user-select: none;
  overflow: hidden;
  aspect-ratio: ${e=>e.$aspectRatio};
`,E=r.Z.div`
  position: relative;
  width: 100%;
  height: 100%;

  // rounded corners for the iframe wrapper
  > div:first-child {
    border-radius: 12px;
    -webkit-mask: linear-gradient(white, white);
    mask: linear-gradient(white, white);
  }

  iframe {
    background: var(--white);
  }
`;function k(e){let{status:t,loading:i,...r}=e,o=r.events;return"Uploading"===t?(0,n.jsx)(F,{children:(0,n.jsx)(N,{children:"Uploading your session..."})}):"Failed"===t?(0,n.jsx)(F,{children:(0,n.jsx)(N,{children:"Failed to upload your session..."})}):i?(0,n.jsx)(F,{children:(0,n.jsx)(N,{children:"Loading your session..."})}):o.length<2?(0,n.jsx)(F,{children:(0,n.jsx)(N,{children:"There is nothing to play \uD83D\uDE33 "})}):(0,n.jsx)(A,{children:(0,n.jsx)(b,{...r})})}let A=r.Z.div`
  position: relative;
  min-width: 100%;
  min-height: 100%;
  max-height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`,F=r.Z.div`
  position: relative;
  display: flex;
  align-items: center;
  align-self: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`,N=r.Z.div`
  text-align: center;
  font-size: 16px;
  color: #333;
`;var T=i(37079);let Z=(0,u.Pi)(function(e){let t=e.captureDataStore.rewind.replayEvents??[],i=(0,v.k)(g.K8O.Replay);return(0,n.jsxs)(C,{children:[(0,n.jsx)(H,{children:(0,n.jsx)(k,{events:t,loading:!e.captureDataStore.rewind.replayEvents,initializeStoreWithReplayer:t=>t&&e.videoTrimStore.initializePlaybackForSessionReplay(t,i())})}),e.errorComponent??null,(0,n.jsx)(T.u,{videoTrimStore:e.videoTrimStore,isRewind:!0})]})}),C=r.Z.div`
  display: flex;
  flex-direction: column;
  height: 80vh;

  ${m.w.tabletLandscape} {
    min-width: unset;
    min-height: unset;
  }
  ${m.w.tablet} {
    width: 100%;
    align-items: unset;
    height: 400px;
  }
`,H=r.Z.div`
  display: flex;
  flex-grow: 1;
  min-width: 0;
  min-height: 0;
`;var D=i(29128),W=i(16140),z=i(82608),M=i(25171);let U=(0,u.Pi)(function(e){let t=(0,w.z3)(),i=(0,w.dR)(),r=i.capture,u=r.type===h.K8.Replay&&("draft"===r.state.name||"pre_draft"===r.state.name)&&r.state.payload.atTabId===t,m=(0,p.useRef)(!1),g=(0,w.EO)(),v=(0,w.MU)(),y=function(e,t){let[i,n]=(0,p.useState)(null),r=(0,w.MU)(),o=(0,p.useRef)(!1);return(0,p.useEffect)(()=>{let i=async()=>{let t;try{t=await r.send({eventName:"GenerateRewind",dest:{component:l.wA.Main,location:void 0},data:{events:"all"},timeout:z.eq("30s")})}catch(e){c.k.error("unexpected error generating rewind",{error:e}),await r.send({eventName:"Dismiss",dest:{component:l.wA.Main,location:void 0},data:{storeDraft:!0}});return}let{events:i,fullscreenDataUrl:o}=t,a=Array.isArray(i)?i:[];e.rewind.setReplayEvents(a),e.rewind.setFullscreenDataUrl(o),n({events:a,fullscreenDataUrl:o})};return!o.current&&t&&(0,M.Y)().span("instant_replay_capture","get-events",i),()=>{o.current=!0}},[e.rewind,r,t]),i}(g,u),x=y?.events??[],j=(0,o.XE)(x),b=o.lh(x)?.filter(e=>e.error),S=y?.events.some(e=>e.type===f.tw.FullSnapshot);(0,p.useEffect)(()=>{m.current||"boolean"!=typeof S||c.k.info("replay draft render",{success:S}),m.current=!0},[S]);let R=!!S&&!i.isResumedDraft();return((0,d.Q)({interaction:"instant_replay_capture",variant:"success",policy:{when:"onCondition",condition:R}}),y)?(0,n.jsx)(D.Z,{onSubmit:e=>(v.send({eventName:"FreezeClickEvents",dest:{component:l.wA.HostScript,location:l.Ye.HostScripts.AdditionalHooks,tabId:t},data:!1}),(0,W.Z)({broker:v,data:e,captureType:h.K8.Replay})),children:S?(0,n.jsx)(Z,{videoTrimStore:e.videoTrimStore,captureDataStore:g,errorComponent:(0,n.jsx)($,{children:(0,n.jsx)(a.hM,{inTrimmingContext:!0,consoleErrors:j,networkErrors:b,videoAnnotationEvents:void 0,startTimestamp:(0,o.Cy)(x)??0,duration:e.videoTrimStore.playback.duration})})}):(0,n.jsx)(s.d,{title:"Instant replay error",body:"Sorry we weren't able to capture an instant replay. Please try again after refreshing the page you wish to capture."})}):null}),$=r.Z.div`
  padding-left: 72px;
  padding-right: 24px;
`}};
//# sourceMappingURL=replay-draft.js.map