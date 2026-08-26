export const ids=["280"];export const modules={77938:function(e,t,r){r.d(t,{Cy:()=>k,Lr:()=>T,IE:()=>c,WZ:()=>j,XE:()=>C,lh:()=>E});var i,n,o,s,a,l,d,c,u,h=r(7117),p=r(14598),m=r(16865),g=((i={}).FAILED="FAILED",i.ABORTED="ABORTED",i.BLOCKED_BY_CLIENT="BLOCKED_BY_CLIENT",i);let f="net::ERR_";function v(e){return e.startsWith(f)}var x=((n={})[n.UnknownHttp=-1]="UnknownHttp",n[n.ChromeInternal=-2]="ChromeInternal",n);let y=new Map([[300,"Multiple Choices"],[301,"Moved Permanently"],[302,"Found"],[303,"See Other"],[304,"Not Modified"],[305,"Use Proxy"],[307,"Temporary Redirect"],[308,"Permanent Redirect"],[400,"Bad Request"],[401,"Unauthorized"],[402,"Payment Required"],[403,"Forbidden"],[404,"Not Found"],[405,"Method Not Allowed"],[406,"Not Acceptable"],[408,"Request Timeout"],[409,"Conflict"],[410,"Gone"],[411,"Length Required"],[413,"Payload Too Large"],[414,"URI Too Long"],[415,"Unsupported Media Type"],[416,"Range Not Satisfiable"],[417,"Expectation Failed"],[418,"I'm a teapot"],[421,"Misdirected Request"],[422,"Unprocessable Entity"],[425,"Too Early"],[426,"Upgrade Required"],[428,"Precondition Required"],[429,"Too Many Requests"],[431,"Request Header Fields Too Large"],[451,"Unavailable For Legal Reasons"],[500,"Internal Server Error"],[501,"Not Implemented"],[502,"Bad Gateway"],[503,"Service Unavailable"],[504,"Gateway Timeout"],[520,"Unknown Error"],[521,"Web Server Down"],[522,"Connection Timed Out"],[523,"Origin Unreachable"],[524,"Timeout Occurred"],[525,"SSL Handshake Failed"],[526,"SSL Invalid Certificate"],[527,"SSL Invalid Certificate"],[1e3,"Prohibited IP"],[1001,"Resolution Error"],[1002,"Restricted"],[1003,"IP Not Allowed"],[1004,"Host Not Configured"],[1005,"ANS Banned"],[1006,"IP Banned"],[1007,"IP Banned"],[1008,"IP Banned"],[1009,"Region Banned"],[1010,"Browser Banned"],[1011,"Hotlinking Denied"],[1012,"Access Denied"],[1013,"Hostname Mismatch"],[1014,"Cross-User Banned"],[1015,"Rate Limit"],[1016,"Origin DNS Error"],[1018,"Host Not Found"],[1019,"Server Error"],[1020,"Access Denied"],[1023,"Host Not Found"],[1025,"Check Back Later"],[1033,"Tunnel Error"],[1034,"Edge IP Restricted"],[1035,"Invalid Request Rewrite"],[1036,"Invalid Request Rewrite"],[1037,"Invalid Rewrite Rule"],[1040,"Invalid Request Rewrite"],[1041,"Invalid Request Rewrite"],[1101,"Rendering Error"],[1102,"Rendering Error"],[1104,"Resource Exists"],[1200,"Cache Connection Limit"]]);function w(e){return y.get(e??-1)??"Unknown"}function b(e){try{let t=JSON.parse(e);if("string"==typeof t)return t;return e}catch{return e}}function j(e){let{payload:t}=e;if(Array.isArray(t))return t.filter(e=>null!=e).map(b);if("string"==typeof t)try{let e=JSON.parse(t);if(Array.isArray(e))return e.filter(e=>null!=e).map(b)}catch{return[b(t)]}throw Error("Invalid payload")}function k(e){for(let t of e)if("number"==typeof t.timestamp)return t.timestamp}function E(e){let t=e?.map((e,t)=>({...e,id:t,tab:e.tabInfo?.title??""})).filter(e=>e.type===m.tw.Plugin&&"jam/network@1"===e.data.plugin);return t?.map(e=>({...e,error:function(e){if(e.fetchDetails){let t=function(e){for(let[t,r]of Object.entries({cors:A,chromium_net_error:D,graphql:L,client:O,server:S}))if(r(e))return t}(e);if(t)return function(e,t){switch(e){case"cors":return function(e){let t=u.findCorsError(e),r=t?u.translateCorsErrorToMessage(e,t):"Unknown CORS error";return{status:{method:e.fetchDetails.method,code:x.ChromeInternal,text:"CORS error",name:w(e.fetchDetails?.status)},message:"(CORS error)",category:"cors",detailedMessage:r}}(t);case"chromium_net_error":return function(e){let t=e.fetchDetails.error,r=t&&v(t)?function(e){let t=v(e)?e.split(f)[1]:e;switch(t){case"ABORTED":return"(cancelled)";case"BLOCKED_BY_CLIENT":return"(blocked:other)";case"FAILED":return"(failed:internal)";default:return`(${t})`}}(t):void 0;return{status:{method:e.fetchDetails.method,code:x.ChromeInternal,text:r??e.fetchDetails.statusText??R,name:w(e.fetchDetails.status)},message:t??"",category:"chromium_net_error"}}(t);case"graphql":return function(e){let t="";try{let r=JSON.parse(e.fetchDetails?.responseBody??"");t=M(r?.errors?.[0]?.message)}catch{t="GraphQL Error"}return{status:{method:e.fetchDetails.method,code:e.fetchDetails?.status??x.UnknownHttp,text:e.fetchDetails.statusText??"Request could not be sent due to CORS",name:w(e.fetchDetails?.status)},message:t,category:"graphql"}}(t);case"client":case"server":return function(e){let t;if(e.fetchDetails?.responseBody&&e.fetchDetails?.responseBody.length>0){try{let r=JSON.parse(e.fetchDetails.responseBody);t=M(r?.errors?.[0]?.message??r?.error?.message?.message??r?.error?.message??r?.error??r?.message?.message??r?.message??r?.errorMessage)}catch{}t||(t=M(e.fetchDetails?.responseBody))}else t="";return{status:{method:e.fetchDetails.method,code:e.fetchDetails?.status??x.UnknownHttp,text:e.fetchDetails.statusText??R,name:w(e.fetchDetails?.status)},message:t,category:O(e)?"client":"server"}}(t)}}(t,e)}}(e.data.payload)}))}function T(e,t){let r=[];for(let i of e){let e=0===r.length?void 0:r[r.length-1][0],n=e&&Math.abs(i.timestamp-e.timestamp)<t,o=e&&"videoAnnotation"===e.type==("videoAnnotation"===i.type);e&&n&&o?r[r.length-1].push(i):r.push([i])}return r}function C(e){let t=e.filter(e=>{var t;return(t=e).type===m.tw.Plugin&&t.data.plugin===p.E||e.type===m.tw.Meta});return t?.filter(e=>!("href"in e.data)&&"error"===e.data.payload.level)}(s=(o=c||(c={})).MarkBase||(o.MarkBase={})).Start="start",s.Stop="stop",(a=o.MarkVideo||(o.MarkVideo={})).Pause="pause",a.Resume="resume",a.Annotation="annotation",(l=o.video||(o.video={})).isStartEvent=function(e){return e.type===m.tw.Custom&&"start-recording"==e.data.tag||"captureEvent"===e.jamType&&e.data.payload.captureMode===h.TG.Video&&"start"===e.data.payload.mark},l.isPauseEvent=function(e){return e.type===m.tw.Custom&&"resume-recording"==e.data.tag||"captureEvent"===e.jamType&&e.data.payload.captureMode===h.TG.Video&&"pause"===e.data.payload.mark},l.isResumeEvent=function(e){return e.type===m.tw.Custom&&"resume-recording"==e.data.tag||"captureEvent"===e.jamType&&e.data.payload.captureMode===h.TG.Video&&"resume"===e.data.payload.mark},l.isStopEvent=function(e){return e.type===m.tw.Custom&&"stop-recording"==e.data.tag||"captureEvent"===e.jamType&&e.data.payload.captureMode===h.TG.Video&&"stop"===e.data.payload.mark},l.isAnnotationEvent=function(e){return"captureEvent"===e.jamType&&e.data.payload.captureMode===h.TG.Video&&"annotation"===e.data.payload.mark},(d=o.rewind||(o.rewind={})).isStartEvent=function(e){return"captureEvent"===e.jamType&&e.data.payload.captureMode===h.TG.Rewind&&"start"===e.data.payload.mark},d.isStopEvent=function(e){return"captureEvent"===e.jamType&&e.data.payload.captureMode===h.TG.Rewind&&"stop"===e.data.payload.mark},function(e){var t,r;function i(e){let t=n(e,"origin",!0)??"";if(0===t.length)return"invalid-security-origin";let r=n(e,"Access-Control-Allow-Origin")??"",i="*"===r,o="true"===n(e,"Access-Control-Allow-Credentials"),s=n(e,"Access-Control-Allow-Methods")??"";return i&&o?"no-wildcard-with-credentials":r!==t?0===r.length?"empty-allowed-origin-header":r.includes(",")?"multiple-origins-specified":e.fetchDetails?.status!==200?"bad-response-status":"invalid-origin":s.length>0&&!s.split(",").map(e=>e.trim()).includes(e.fetchDetails?.method??"")?"invalid-method":void 0}function n(e,t,r=!1){return new Headers(e.fetchDetails?.[r?"requestHeaders":"responseHeaders"]??void 0).get(t)??void 0}function o(t){return!!t.fetchDetails?.requestHeaders&&(Object.values(e.AccessControlHeaders).some(e=>void 0!==n(t,e))||s(t))}function s(t){return"cors"===n(t,e.SecFetchModeHeader,!0)}(t=e.AccessControlHeaders||(e.AccessControlHeaders={})).Credentials="Access-Control-Allow-Credentials",t.Origin="Access-Control-Allow-Origin",t.Headers="Access-Control-Allow-Headers",t.Method="Access-Control-Allow-Methods",e.SecFetchModeHeader="Sec-Fetch-Mode",(r=e.CorsErrorType||(e.CorsErrorType={})).WildcardOriginWithCredentialsSet="no-wildcard-with-credentials",r.EmptyOriginHeader="empty-allowed-origin-header",r.MultipleOrigins="multiple-origins-specified",r.InvalidOrigin="invalid-origin",r.InvalidSecurityOrigin="invalid-security-origin",r.BadResponseStatus="bad-response-status",r.InvalidMethod="invalid-method",e.isCorsNetworkError=function(e){return e?.category==="cors"},e.hasPreflightRequest=function(e){return!!e.corsOptionsRequest},e.translateCorsErrorToMessage=function(e,t){let r=e.entry.name,i=n(e.corsOptionsRequest??e,"origin",!0),o=n(e.corsOptionsRequest??e,"Access-Control-Allow-Origin"),s=[`Access to fetch at '${r}' from origin '${i}' has been blocked by CORS policy:`,e.corsOptionsRequest?" Response to preflight request doesn't pass access control check:":""].join(" ");switch(t){case"empty-allowed-origin-header":return`${s} No 'Access-Control-Allow-Origin' header was sent by the server, or the header was empty`;case"bad-response-status":return`${s} The response had HTTP status code: ${e.corsOptionsRequest?.fetchDetails?.status??e.fetchDetails?.status??"Unknown"}`;case"invalid-origin":return`${s} The 'Access-Control-Allow-Origin' header has a value "${o}" that is not equal to "${i}"`;case"invalid-security-origin":return`${s} An 'Origin' header was not found on the original request`;case"multiple-origins-specified":return`${s} The 'Access-Control-Allow-Origin' header contains multiple values "${o}", but only one is allowed`;case"no-wildcard-with-credentials":return`${s} A wildcard '*' cannot be used in the 'Access-Control-Allow-Origin' header when the 'Access-Control-Allow-Credentials' header is set to 'true'`;case"invalid-method":return`${s} Did not find method "${e.fetchDetails?.method??"Unknown"}" in the 'Access-Control-Allow-Methods' header of the HTTP response`}},e.findCorsError=function(e){var t;let{fetchDetails:r}=e;return r?.error&&r.error===(t=g.FAILED,`${f}${t}`)&&(e.corsOptionsRequest||o(e))?e.corsOptionsRequest?i(e.corsOptionsRequest):i(e):void 0},e.checkForCorsError=i,e.getHeader=n,e.hasAnyCorsHeaders=o,e.eventHasSecFetchModeSetToCors=s}(u||(u={}));let R="Response has no status";function O(e){let t=e.fetchDetails?.status;return!!t&&t>=400&&t<500}function S(e){let t=e.fetchDetails?.status;return!!t&&t>=500}function A(e){return!!u.findCorsError(e)}function D(e){return!!e.fetchDetails.error}function L(e){let{responseBody:t,responseHeaders:r}=e.fetchDetails,{name:i}=e.entry;if(!t||!r||!i||!Object.entries(r).some(e=>{let[t,r]=e;return"content-type"===t.toLowerCase().trim()&&r.toLowerCase().trim().includes("application/json")})||!i.includes("graphql"))return!1;try{let e=JSON.parse(t??"");return e&&Array.isArray(e.errors)&&e.errors.length>0}catch{return!1}}function M(e){switch(typeof e){case"string":return e;case"object":try{return JSON.stringify(e)}catch{return"{}"}case"function":return e?.toString()??"function";case"bigint":case"boolean":case"number":case"symbol":case"undefined":return String(e)}}},82790:function(e,t,r){r.d(t,{z:()=>n});var i=r(52322);r(2784);let n=e=>(0,i.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",width:e.size??20,height:e.size??20,fill:"none",viewBox:"0 0 24 24",strokeWidth:36/(e.size??20),...e,children:(0,i.jsx)("path",{stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",d:"M21 20.9998h-8m-10.5.5 5.5493-2.1343c.355-.1365.5324-.2048.6984-.2939a3 3 0 0 0 .4203-.2732c.149-.1155.2834-.25.5523-.5189L21 6.9998c1.1046-1.1045 1.1046-2.8954 0-4s-2.8954-1.1046-4 0L5.7203 14.2795c-.269.2689-.4034.4034-.519.5523a3 3 0 0 0-.273.4203c-.0892.166-.1574.3435-.294.6985zm0 0 2.0581-5.351c.1473-.3829.221-.5744.3472-.6621a.5.5 0 0 1 .379-.0804c.151.0288.296.1739.5862.464l2.259 2.2591c.2902.2901.4352.4351.464.5861a.5.5 0 0 1-.0804.379c-.0876.1263-.2791.1999-.662.3472z"})})},76524:function(e,t,r){r.d(t,{c:()=>d,d:()=>c});var i=r(52322);r(2784);var n=r(7184),o=r(75818),s=r(92622),a=r(49255),l=r(6663);function d(e){let t=(0,i.jsx)(s.J,{style:{color:a.O.darkGrey,width:50,height:50}}),r=(()=>{let t=(()=>{if(e.mediaError)switch(e.mediaError?.code){case e.mediaError.MEDIA_ERR_NETWORK:return"Video preview unavailable due to mysterious internet connection issues.";case e.mediaError.MEDIA_ERR_ABORTED:return"Video preview unavailable due to mysterious internet connection issues with downloading";case e.mediaError.MEDIA_ERR_DECODE:return`Video preview unavailable. Error from your computer: ${e.mediaError?.message??"unknown reason"}`;case e.mediaError.MEDIA_ERR_SRC_NOT_SUPPORTED:return`Video preview is unavailable. Error from your computer: ${e.mediaError?.message??"unknown reason"}`;default:return"Video preview could not be loaded."}})();switch(!0){case void 0!==e.cspViolationEvent:return(0,i.jsxs)("div",{children:[(0,i.jsx)(l.x,{as:"h2",size:"bodyRegular",weight:"bold",font:"body",children:"Your video is saved"}),(0,i.jsx)(l.x,{as:"p",children:"Video preview unavailable due to this website's content policy."}),e.verbose&&(0,i.jsx)(l.x,{as:"p",font:"mono",color:"strawberry",children:`Violated "${e.cspViolationEvent?.violatedDirective}" from content-security-policy: ${e.cspViolationEvent?.originalPolicy}`})]});case!!t:return(0,i.jsxs)("div",{children:[(0,i.jsx)(l.x,{as:"h2",size:"bodyRegular",weight:"bold",font:"body",children:"Your video is saved"}),(0,i.jsx)(l.x,{as:"p",children:t}),e.verbose&&(0,i.jsx)(l.x,{as:"p",font:"mono",color:"strawberry",children:e.mediaError?.message})]});default:return(0,i.jsxs)("div",{children:[(0,i.jsx)(l.x,{as:"h2",size:"bodyRegular",weight:"bold",font:"body",children:"Your video is saved"}),(0,i.jsx)(l.x,{as:"p",children:"Video preview unavailable at this time."})]})}})();return(0,i.jsxs)(u,{$center:e.center,children:[t,r]})}let c=e=>(0,i.jsxs)(u,{$center:!0,children:[e.icon??(0,i.jsx)(o.u,{style:{color:a.O.darkGrey,width:50,height:50}}),(0,i.jsxs)("div",{children:[(0,i.jsx)(l.x,{as:"h2",size:"bodyRegular",weight:"bold",font:"body",children:e.title}),(0,i.jsx)(l.x,{as:"p",size:"bodySmall",weight:"regular",children:e.body})]})]}),u=n.Z.div`
  height: 100%;
  width: 100%;
  max-height: 255px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: ${e=>e.$center?"center":"flex-end"};
  text-align: center;
  gap: 14px;
  padding: 20px;
  background-color: ${a.O.mediumGrey};
  border-radius: 8px;
`},90608:function(e,t,r){r.d(t,{Lo:()=>f,oX:()=>x,Je:()=>g,zk:()=>m,hM:()=>u});var i=r(52322),n=r(7184),o=r(77938),s=r(82790);r(2784);var a=r(49255),l=r(25149),d=r(6663),c=r(28351);let u=e=>{let{networkErrors:t,consoleErrors:r,videoAnnotationEvents:n,duration:s,startTimestamp:a,height:l}=e,d=e.inTrimmingContext??!1;if(!t?.length&&!r?.length&&!n?.length||!s||!a)return null;let u=(0,c.i8)(t,r,n,a),h=(0,o.Lr)(u,150);return(0,i.jsx)(x,{inTrimmingContext:d,height:l,children:h.map(e=>(0,i.jsx)(p,{eventGroup:e,duration:s},e[0].timestamp))})},h=e=>{let t=e.eventGroup.length,r=e.eventGroup[0].type,n=`${t} ${r} ${1===t?"error":"errors"}`;return(0,i.jsxs)(v,{className:"preview",children:[(0,i.jsx)(d.x,{as:"h2",size:"bodyXSmall",font:"body",weight:"bold",color:"white",truncate:!0,children:n}),(0,i.jsx)("ul",{children:e.eventGroup.map(e=>{if("console"===e.type){let t=(0,c.LS)(e);return(0,i.jsx)("li",{children:(0,i.jsxs)(d.x,{as:"span",size:"bodyXSmall",color:"white",children:["• ",t]})},e.timestamp)}let t=e.raw.data.payload.fetchDetails,r=(t?.error?.trim()??t?.statusText?.trim())||e.raw.error?.message?.trim();return(0,i.jsx)("li",{children:(0,i.jsxs)(d.x,{as:"span",size:"bodyXSmall",color:"white",truncate:!0,children:["• ",r]})},e.timestamp)})})]})},p=e=>{let{eventGroup:t,duration:r}=e,n=t[0],o=n.timestamp/r,a=100*(0,c.km)(o)+"%";if("videoAnnotation"===n.type)return(0,i.jsx)(m,{style:{left:a},children:(0,i.jsx)(f,{children:(0,i.jsx)(s.z,{size:14})})});let l=(0,c.YZ)(n);return(0,i.jsx)(m,{style:{left:a},children:(0,i.jsxs)(g,{children:[(0,i.jsx)(h,{eventGroup:t}),(0,i.jsx)("span",{children:l})]})})},m=n.Z.div`
  position: relative;
`,g=n.Z.div`
  top: 4px;
  user-select: none;
  background-color: ${a.O.darkStrawberry};
  transform: translateX(-50%);
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 1px solid ${a.O.white};
  position: absolute;
  font-family: ${l.V.mono};
  font-size: 8px;
  justify-content: center;
  display: flex;
  align-items: center;
  color: white;

  &:hover .preview {
    opacity: 1;
    pointer-events: all;
  }
`,f=n.Z.div`
  top: 4px;
  position: absolute;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--purple-11);
  border: 1px solid var(--gray-1);
  color: var(--gray-1);

  svg {
    width: 12px;
    stroke-width: 1;
  }
`,v=n.Z.div`
  opacity: 0;
  pointer-events: none;
  position: absolute;
  bottom: calc(100% + 4px);
  left: 0;
  border-radius: 4px;
  padding: 8px;
  background-color: ${a.O.black};
  max-width: 240px;
  overflow: hidden;
  width: max-content;

  ul li {
    overflow: hidden;
    text-overflow: ellipsis;
  }
`,x=n.Z.div`
  --timeline-bar-height: ${e=>e.height??30}px;
  --timeline-bar-vertical-gutter: ${e=>e.verticalGutter??10}px;

  background-color: ${e=>e.inTrimmingContext?a.O.transparent:a.O.white};
  padding: 0;
  height: var(--timeline-bar-height);
  display: flex;
  position: relative;
`},28351:function(e,t,r){r.d(t,{LS:()=>a,YZ:()=>s,i8:()=>o,km:()=>n});var i=r(77938);function n(e){return Math.min(Math.max(e,0),100)}function o(e,t,r,i){return[...(t??[]).map(e=>({type:"console",timestamp:e?.elapsedMs??e.timestamp-i,raw:e})),...(e??[]).map(e=>({type:"network",timestamp:e.elapsedMs??e.data.payload.entry.absoluteStart-i,raw:e})),...(r??[]).map(e=>({type:"videoAnnotation",timestamp:e.elapsedMs??e.timestamp-i}))].sort((e,t)=>e.timestamp-t.timestamp)}function s(e){switch(e.type){case"console":return"err";case"network":return e.raw.data.payload.fetchDetails?.status??"xhr";case"videoAnnotation":return"annotation"}}function a(e){let t=e.raw.data;return"payload"in t?(0,i.WZ)(t.payload).join(" "):""}},37079:function(e,t,r){r.d(t,{u:()=>I});var i=r(52322),n=r(97370);function o(e,t,r){return r?(0,n.Z)(e,r,(e,i)=>{let n=t(e,i);return r.consume&&(e.preventDefault(),e.stopPropagation()),n}):(0,n.Z)(e,t),{unsubscribe:()=>n.Z.unbind(e,t)}}var s=r(7184),a=r(2784);let l=e=>(0,i.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",width:e.size??20,height:e.size??20,fill:"none",viewBox:"0 0 24 24",strokeWidth:36/(e.size??20),...e,children:(0,i.jsx)("path",{stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",d:"m22.7 13.5-1.9995-2-2.0005 2M21 12c0 4.9706-4.0294 9-9 9s-9-4.0294-9-9 4.0294-9 9-9c3.3019 0 6.1885 1.7781 7.7545 4.429M12 7v5l3 2"})});var d=r(60351),c=r(32016);let u=e=>(0,i.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",width:e.size??20,height:e.size??20,fill:"none",viewBox:"0 0 24 24",strokeWidth:36/(e.size??20),...e,children:(0,i.jsx)("path",{stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",d:"M9.5 15V9m5 6V9m7.5 3c0 5.5228-4.4772 10-10 10S2 17.5228 2 12 6.4772 2 12 2s10 4.4772 10 10"})}),h=e=>(0,i.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",width:e.size??20,height:e.size??20,fill:"none",viewBox:"0 0 24 24",strokeWidth:36/(e.size??20),...e,children:(0,i.jsx)("path",{stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",d:"M5 4.9895c0-.9711 0-1.4567.2025-1.7244a1 1 0 0 1 .7379-.395c.335-.02.739.2494 1.5471.7881l10.5156 7.0104c.6677.4451 1.0015.6677 1.1178.9482a1 1 0 0 1 0 .7662c-.1163.2805-.4501.503-1.1178.9482L7.4875 20.3415c-.808.5387-1.212.8081-1.5471.7881a1 1 0 0 1-.738-.3949C5 20.467 5 19.9814 5 19.0103z"})}),p=e=>(0,i.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",width:e.size??20,height:e.size??20,fill:"none",viewBox:"0 0 24 24",strokeWidth:36/(e.size??20),...e,children:(0,i.jsx)("path",{stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",d:"m22 9-6 5.9999m0-6 6 6M9.6343 4.3656 6.4686 7.5313c-.173.173-.2594.2594-.3603.3213a1 1 0 0 1-.289.1197c-.1152.0276-.2374.0276-.482.0276H3.6c-.56 0-.84 0-1.054.109a1 1 0 0 0-.437.437C2 8.76 2 9.04 2 9.6v4.8c0 .5601 0 .8401.109 1.054a1 1 0 0 0 .437.437C2.76 16 3.04 16 3.6 16h1.7373c.2446 0 .3668 0 .482.0277.102.0245.1995.0649.289.1197.1009.0618.1874.1483.3603.3213l3.1657 3.1656c.4284.4284.6426.6426.8265.6571a.5.5 0 0 0 .4194-.1738C11 19.9773 11 19.6744 11 19.0686V4.9313c0-.6058 0-.9087-.1198-1.049a.5.5 0 0 0-.4194-.1737c-.1839.0145-.3981.2286-.8265.657"})});var m=r(66337),g=r(59087),f=r(6663),v=r(89825),x=r(49255),y=r(75951),w=r.n(y),b=r(75958),j=r(28165);let k=e=>(0,i.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",width:e.size??20,height:e.size??20,fill:"none",viewBox:"0 0 24 24",strokeWidth:36/(e.size??20),...e,children:(0,i.jsx)("path",{stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",d:"M12 13c.5523 0 1-.4477 1-1s-.4477-1-1-1-1 .4477-1 1 .4477 1 1 1m0-7c.5523 0 1-.4477 1-1s-.4477-1-1-1-1 .4477-1 1 .4477 1 1 1m0 14c.5523 0 1-.4477 1-1s-.4477-1-1-1-1 .4477-1 1 .4477 1 1 1"})});var E=r(2493);let T=(0,b.Pi)(e=>{let t=e.videoTrimStore,{snapToFullSecondOnMove:r,snapToFullSecondOnRelease:n}=e,[o,s]=(0,a.useState)(null);(0,a.useEffect)(()=>{if(!o)return;let e=new ResizeObserver(()=>{window.requestAnimationFrame(()=>{t.setMaxWidth(o.scrollWidth),t.setStartX(o.getBoundingClientRect().x)})});return e.observe(o),()=>e.disconnect()},[o,t]);let l=(0,E.G)();(0,a.useEffect)(()=>{if(!l)return;let e=e=>{let i=H(e);void 0!==i&&(t.moveTrimHandle(i,r),t.moveOnTrimBar(i))},i=e=>{let r=H(e);void 0!==r&&(t.releaseTrimHandle(r,n),t.releaseTrimBar())};return l.addEventListener("touchmove",e),l.addEventListener("mousemove",e),l.addEventListener("mouseup",i),l.addEventListener("touchend",i),l.addEventListener("touchcancel",i),l.addEventListener("mouseleave",i),()=>{l.removeEventListener("touchmove",e),l.removeEventListener("mousemove",e),l.removeEventListener("mouseup",i),l.removeEventListener("touchend",i),l.removeEventListener("touchcancel",i),l.removeEventListener("mouseleave",i)}},[l,t,r,n]);let d=(0,a.useCallback)(e=>{let r=H(e);void 0!==r&&t.clickTrimBar(r)},[t]);return(0,i.jsx)(R,{children:(0,i.jsxs)(O,{onMouseDown:d,children:[(0,i.jsxs)(A,{children:[(0,i.jsx)(D,{}),(0,i.jsx)(S,{background:!1,ref:s})]}),(0,i.jsx)(z,{store:t}),e.disableTrimming?null:(0,i.jsx)(M,{left:!0,store:t,snapToFullSecondOnRelease:n,style:{marginLeft:`calc(${t.leftTrimFraction} * 100%)`}}),(0,i.jsx)(S,{background:!0,style:{marginLeft:`calc(${t.leftTrimFraction} * 100%)`,width:`calc(${t.widthFraction} * 100%)`}}),e.disableTrimming?null:(0,i.jsx)(M,{left:!1,store:t,snapToFullSecondOnRelease:n,style:{marginRight:`calc(${1-(t.widthFraction+t.leftTrimFraction)} * 100%)`}})]})})}),C="20px",R=s.Z.div`
  position: relative;
  flex: 1;
  height: 30px;
  cursor: pointer;
`,O=s.Z.div`
  position: relative;
  display: flex;
  height: 100%;
  margin: 0 ${C};
`,S=s.Z.div`
  border: 2px solid ${x.O.leaf};
  height: 100%;
  background: ${x.O.white};

  ${e=>e.background?(0,j.iv)`
          position: absolute;
          border-left-width: 0;
          border-right-width: 0;
        `:(0,j.iv)`
          width: 100%;
          border-radius: 4px;
        `}
`,A=s.Z.div`
  width: 100%;
  position: absolute;
  height: 100%;
`,D=s.Z.div`
  background: ${x.O.black};
  opacity: 0.3;
  width: 100%;
  height: 100%;
  border-radius: 4px;
  position: absolute;
`,L=s.Z.div`
  background-color: ${x.O.leaf};
  position: absolute;
  align-items: center;
  display: flex;
  user-select: none;

  ${e=>e.left?(0,j.iv)`
          left: ${e.inactive?"0":`-${C}`};
          border-top-left-radius: 4px;
          border-bottom-left-radius: 4px;
          justify-content: flex-start;
          padding-left: 1px;
        `:(0,j.iv)`
          right: ${e.inactive?"0":`-${C}`};
          border-top-right-radius: 4px;
          border-bottom-right-radius: 4px;
          justify-content: flex-end;
          padding-right: 1px;
        `}

  width: ${C};
  height: 100%;
`,M=(0,b.Pi)(e=>{let{store:t,left:r,snapToFullSecondOnRelease:n}=e,o=e=>{e.stopPropagation();let i=H(e);void 0!=i&&t.grabTrimHandle(r?"left":"right",i)},s=e=>{e.stopPropagation();let r=H(e);void 0!=r&&t.releaseTrimHandle(r,n)};return(0,i.jsx)(L,{left:r,onClick:e=>{e.stopPropagation(),r?t.clickStartTrimHandle():t.clickEndTrimHandle()},onMouseDown:o,onTouchStart:o,onMouseUp:s,onTouchEnd:s,onTouchCancel:s,onDragStart:()=>!1,style:e.style,children:(0,i.jsx)(k,{size:16})})}),$=s.Z.div`
  width: 2px;
  height: 46px;
  background: ${x.O.darkLeaf};
  position: absolute;
  z-index: 100;
  top: 50%;
  transform: translate(-50%, -50%);
`,z=(0,b.Pi)(e=>{let{store:t}=e,r=t.playback.playbackFractionComplete;return(0,i.jsx)($,{style:{left:100*r+"%"}})});function H(e){if("touches"in e){if(0===e.touches.length&&0===e.changedTouches.length)return;return e.touches.length>0?e.touches[0].clientX:e.changedTouches[0].clientX}return e.clientX}let B=navigator.userAgent.includes("Mac")?"⌘":"Ctrl ",I=(0,b.Pi)(e=>{let t=(0,m.X)();return(0,a.useEffect)(()=>{let r=[o("space",()=>e.videoTrimStore.playback.playToggle(),{element:t,keydown:!0,consume:!0})];return()=>r.forEach(e=>e.unsubscribe())},[t,e.videoTrimStore]),(0,i.jsxs)(P,{children:[(0,i.jsxs)(G,{children:[(0,i.jsx)(X,{videoTrimStore:e.videoTrimStore}),(0,i.jsx)(T,{disableTrimming:e.disableTrimming,videoTrimStore:e.videoTrimStore,snapToFullSecondOnMove:e.snapToFullSecondOnMove,snapToFullSecondOnRelease:e.snapToFullSecondOnRelease})]}),(0,i.jsxs)(N,{children:[(0,i.jsx)(Z,{left:!0,children:e.isRewind?(0,i.jsx)(F,{}):e.showAudioButton&&(0,i.jsx)(Y,{store:e.videoTrimStore})}),(0,i.jsx)(Z,{children:(0,i.jsx)(V,{store:e.videoTrimStore})}),(0,i.jsx)(Z,{right:!0,children:(0,i.jsx)(W,{store:e.videoTrimStore})})]})]})}),P=s.Z.div`
  width: 100%;
  margin-top: 2px;
`,Z=s.Z.div`
  display: flex;
  flex: 1;
  justify-content: ${e=>e.left?"flex-start":e.right?"flex-end":"center"};
`,q=(0,s.Z)(g.X2)`
  flex: none;
`,F=()=>(0,i.jsxs)(q,{children:[(0,i.jsx)(l,{size:16}),(0,i.jsx)(g.Zh,{width:10}),(0,i.jsx)(f.x,{size:"bodySmall",children:"Instant Replay"})]}),G=s.Z.div`
  display: flex;
  flex-direction: row;
  gap: 6px;
`,N=s.Z.div`
  display: flex;
  flex-direction: row;
  gap: 4px;

  height: 40px;
  margin-top: 20px;

  align-items: center;
  justify-content: space-between;

  /* TODO: add bar to the top of this and the right side, invisible on mobile(?) */
`,U=(0,s.Z)(f.x)`
  align-self: center;
`,V=(0,b.Pi)(e=>{let{store:t}=e,r=t.trimmedDuration,n=w()(r,{round:!0});return(0,i.jsx)(U,{size:"heading3",font:"heading",weight:"medium",children:n})}),_=s.Z.div`
  align-self: flex-end;
  display: flex;
  flex-direction: row;
  gap: 16px;
`,W=(0,b.Pi)(e=>{let{store:t}=e,r=(0,m.X)();return(0,a.useEffect)(()=>{let e=[o("cmd+z, ctrl+z",()=>t.videoTrimHistory.undo(),{element:r,keydown:!0,consume:!0}),o("cmd+shift+z, ctrl+shift+z",()=>t.videoTrimHistory.redo(),{element:r,keydown:!0,consume:!0})];return()=>e.forEach(e=>e.unsubscribe())},[r,t]),(0,i.jsxs)(_,{children:[(0,i.jsx)(v.u,{disablePortal:!0,title:`Undo (${B}Z)`,children:(0,i.jsx)(J,{onClick:()=>t.videoTrimHistory.undo(),children:(0,i.jsx)(d.b,{style:{color:x.O[t.videoTrimHistory.canUndo?"black":"mediumGrey"]}})})}),(0,i.jsx)(v.u,{disablePortal:!0,title:`Redo (⇧${B}Z)`,children:(0,i.jsx)(J,{onClick:()=>t.videoTrimHistory.redo(),children:(0,i.jsx)(c.Y,{style:{color:x.O[t.videoTrimHistory.canRedo?"black":"mediumGrey"]}})})})]})}),X=(0,b.Pi)(e=>{let{videoTrimStore:t}=e,r=t.playback.playing;return(0,i.jsx)(K,{onClick:()=>t.playback.playToggle(!r),children:r?(0,i.jsx)(u,{}):(0,i.jsx)(h,{})})}),Y=(0,b.Pi)(e=>{let{store:t}=e;if(void 0===t.audio.rawVideoHasAudio)return null;let r=t.audio.rawVideoHasAudio,n=t.audio.removeAudio;return(0,i.jsx)(a.Fragment,{children:r?(0,i.jsx)(Q,{onClick:()=>t.audio.toggleAudioRemoval(),children:(0,i.jsx)(f.x,{color:"black",size:"heading3",font:"heading",weight:"medium",children:n?"Undo remove audio":"Remove audio"})}):(0,i.jsxs)(ee,{children:[(0,i.jsx)(p,{style:{color:x.O.darkGrey}}),(0,i.jsx)(f.x,{color:"darkGrey",size:"heading3",font:"heading",weight:"medium",children:"This video has no sound"})]})})}),J=s.Z.div`
  user-select: none;
  cursor: pointer;
  justify-content: center;
  display: flex;
  align-items: center;
`,K=(0,s.Z)(J)`
  background: ${x.O.white};
  border-radius: 6px;
  border: 1px solid ${x.O.mediumGrey};
  padding: 0 8px;
`,Q=(0,s.Z)(J)`
  border-radius: 100px;
  border: 2px solid black;
  padding-left: 16px;
  padding-right: 16px;
  padding-top: 8px;
  padding-bottom: 8px;
`,ee=s.Z.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
`},20004:function(e,t,r){r.d(t,{k:()=>o});var i=r(2784),n=r(28128);function o(e){let t=(0,n.dR)();return(0,i.useCallback)(()=>{let r=t.capture;if(r.type===e&&"draft"===r.state.name)return{start:r.state.payload.trimOptions?.trim?.start,end:r.state.payload.trimOptions?.trim?.end}},[e,t])}}};
//# sourceMappingURL=280.js.map