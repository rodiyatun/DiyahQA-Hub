export const ids=["132"];export const modules={41229:function(e,t,i){i.r(t),i.d(t,{RecordingPlayer:()=>D});var r=i(52322),n=i(7184),o=i(50341),s=i(77938),a=i(76524),l=i(82790),d=i(2784),c=i(28351),u=i(90608);let h=e=>{let{markers:t,duration:i,height:n}=e;if(0===t.length||!i)return null;let o=(0,s.Lr)(t.map(e=>({...e,timestamp:e.elapsedMs})),150);return(0,r.jsx)(u.oX,{inTrimmingContext:e.inTrimmingContext??!1,height:n,children:o.map(e=>(0,r.jsx)(m,{markerGroup:e,duration:i},e[0].timestamp))})},m=e=>{let t=e.markerGroup[0],i=100*(0,c.km)(t.timestamp/e.duration)+"%";if("videoAnnotation"===t.type)return(0,r.jsx)(u.zk,{style:{left:i},children:(0,r.jsx)(u.Lo,{children:(0,r.jsx)(l.z,{size:14})})});let n="network"===t.type?t.status??"xhr":"err";return(0,r.jsx)(u.zk,{style:{left:i},children:(0,r.jsx)(u.Je,{children:(0,r.jsx)("span",{children:n})})})};var f=i(49255);function p(e){return(0,r.jsx)(x,{className:e.className,children:(0,r.jsx)(g,{color:e.color??"black"})})}let x=n.Z.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 8px 12px;
`,g=n.Z.div`
  position: relative;
  margin: 0 auto;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: ${e=>f.O[e.color]};
  animation: dotFlashing 800ms infinite linear alternate;
  animation-delay: 0.4s;

  &::before,
  &::after {
    content: "";
    display: inline-block;
    position: absolute;
    top: 0;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: ${e=>f.O[e.color]};
    animation: dotFlashing 800ms infinite alternate;
  }

  &::before {
    left: -10px;
    animation-delay: 0s;
  }

  &::after {
    left: 10px;
    animation-delay: 800ms;
  }

  @keyframes dotFlashing {
    0% {
      opacity: 1;
    }
    75%,
    100% {
      opacity: 0.5;
    }
  }
`;var v=i(6663),b=i(70621),j=i(49710),y=i(75958),k=i(28128),w=i(20004),E=i(37079),R=i(29128),T=i(16140);let D=(0,y.Pi)(e=>{var t;let{videoDraftEvents:i,videoTrimStore:n}=e,[l,c]=(0,d.useState)(null),m=function(){let[e,t]=(0,d.useState)(null);return(0,d.useEffect)(()=>{let e=e=>{b.k.error("Detected CSP violation",{error:e}),t(e)};return document.addEventListener("securitypolicyviolation",e),()=>{document.removeEventListener("securitypolicyviolation",e)}},[]),e}(),f=(0,k.MU)(),x=(0,k.EO)(),[g,v]=function(e){let[t,i]=(0,d.useState)(null);return[t,(0,d.useCallback)(e=>{i(e)},[])]}(null),{trigger:y}=(0,k._T)(),D=(0,k.dR)(),z=(0,k.Pn)(),L=0===(t=e.successfulRecordingDetails).width||0===t.height?"16 / 9":`${t.width} / ${t.height}`,P=(0,w.k)(j.K8.Video);(0,d.useEffect)(()=>{if(g){let t=P();n.initializePlaybackForVideo(g,e.successfulRecordingDetails.duration,t),n.audio.setRawVideoHasAudio(D.preferences.recording.audio.on)}},[g,P,n,e.successfulRecordingDetails.duration]),(0,d.useEffect)(()=>{x.video.setVideoRef(g),b.k.debug("Writing video ref for posterImage capture",{videoEl:g}),y()},[g,x.video,y]);let V=d.useRef(!1);(0,d.useEffect)(()=>{if(V.current||!e.localBlobUrl)return;let{type:t,duration:i}=e.successfulRecordingDetails;b.k.info("video-recording-render",{type:t,duration:i}),V.current=!0},[V,e.localBlobUrl]);let A=(0,s.lh)(i),M=i.filter(s.IE.video.isAnnotationEvent),$=A?.filter(e=>e.error),G=(0,s.XE)(i)??[],I=z.teamId,J=D.user?.teams.find(e=>e.id===I),O=J?.featureFlags.includes(o.J5.DisableCloudflareStream);return(0,r.jsx)(R.Z,{onSubmit:e=>(0,T.Z)({broker:f,data:e,captureType:j.K8.Video}),children:l||m?(0,r.jsxs)(d.Fragment,{children:[(0,r.jsx)(a.c,{cspViolationEvent:m??void 0,mediaError:l??void 0,verbose:!1,center:!0}),(0,r.jsx)(Z,{})]}):(0,r.jsx)(d.Fragment,{children:e.localBlobUrl?(0,r.jsxs)(C,{children:[(0,r.jsx)(S,{children:(0,r.jsx)(B,{ref:v,src:e.localBlobUrl,aspectRatio:L,onError:t=>{let i=t.currentTarget.error;i&&(c(i),b.k.error("Can't load video in the preview modal",{error:i,videoBlobUrl:e.localBlobUrl}))}})}),(0,r.jsxs)(F,{children:[(0,r.jsx)(U,{children:e.videoDraftMarkers.length>0?(0,r.jsx)(h,{inTrimmingContext:!0,markers:e.videoDraftMarkers,duration:e.successfulRecordingDetails.duration}):(0,r.jsx)(u.hM,{inTrimmingContext:!0,networkErrors:$,consoleErrors:G,videoAnnotationEvents:M,duration:e.successfulRecordingDetails.duration,startTimestamp:e.successfulRecordingDetails.startTimestamp})}),(0,r.jsx)(E.u,{videoTrimStore:e.videoTrimStore,showAudioButton:!1,isRewind:!1,disableTrimming:O})]})]}):(0,r.jsx)(a.d,{icon:(0,r.jsx)(p,{color:"darkGrey"}),title:"Loading preview",body:"Processing video data..."})})})}),Z=()=>{let e=n.Z.div`
    position: absolute;
    bottom: 40px;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    text-align: center;
  `;return(0,r.jsxs)(e,{children:[(0,r.jsx)(v.x,{as:"span",weight:"bold",children:"To view the video, simply\xa0"}),(0,r.jsx)(v.x,{as:"span",weight:"bold",color:"darkLeaf",children:"create this Jam"})]})},C=n.Z.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 20px;
  justify-content: space-between;
  min-height: 0;
  min-width: 0;
  height: 100%;
`,S=n.Z.div`
  display: flex;
  flex: 1;
  justify-content: center;
  min-height: 0;
`,B=n.Z.video`
  max-width: 100%;
  max-height: 100%;
  height: auto;
  // this is super important, otherwise video will bleed out of the container
  // flex by default has min-height that is equal to the size of its content
  min-height: 0;
  aspect-ratio: ${({aspectRatio:e})=>e};
  align-self: center;
  border-radius: 12px;
  mask: linear-gradient(white, white);
`,F=n.Z.div`
  width: 100%;
`,U=n.Z.div`
  width: 100%;
  // this is necessary to align timeline events with trim controls
  padding-left: 72px;
  padding-right: 24px;
`}};
//# sourceMappingURL=video-draft.js.map