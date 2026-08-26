export const ids=["252"];export const modules={78213:function(e,t,r){r.d(t,{h:()=>d});var n=r(52322),a=r(7184),i=r(51749),o=r(2784);let s={primary:"solid",secondary:"soft",ghost:"soft",soft:"soft",surface:"surface"},l={primary:void 0,secondary:"gray",ghost:"gray",soft:void 0,surface:void 0},d=o.forwardRef((e,t)=>{let{variant:r="primary",color:a,...i}=e;return(0,n.jsx)(c,{ref:t,variant:s[r],color:a??l[r],"data-variant":r,...i})});d.displayName="IconButton";let c=(0,a.Z)(i.h)`
  border-radius: var(--radius-3);

  &[data-variant="primary"] {
    --jam-control-border-color: var(--accent-a6);
    --jam-control-pressed-border-color: var(--accent-a7);
    --jam-control-pressed-gradient-start: var(--accent-10);
    --jam-control-pressed-gradient-end: var(--accent-9);
  }

  &[data-variant="secondary"] {
    --jam-control-border-color: var(--accent-a4);
    --jam-control-pressed-border-color: var(--accent-a5);
    --jam-control-pressed-gradient-start: var(--accent-4);
    --jam-control-pressed-gradient-end: var(--accent-3);
  }

  &:is([data-variant="primary"], [data-variant="secondary"]):not(
      .rt-high-contrast
    ):not(:disabled):not([data-disabled]) {
    box-shadow: 0 0 0 1px var(--jam-control-border-color),
      0 1px 0 0 rgba(255, 255, 255, 0.24) inset;
  }

  &:is([data-variant="primary"], [data-variant="secondary"]):active:not(
      [data-state="open"]
    ):not(.rt-high-contrast):not(:disabled):not([data-disabled]) {
    background-image: linear-gradient(
      180deg,
      var(--jam-control-pressed-gradient-start) 0%,
      var(--jam-control-pressed-gradient-end) 100%
    );
    box-shadow: inset 0 1px 0 0 var(--black-a1),
      0 0 0 0.5px var(--jam-control-pressed-border-color);
  }

  &[data-variant="secondary"][data-accent-color="gray"]:not(:disabled):not(
      [data-disabled]
    ) {
    color: var(--gray-12);
  }

  // Ghost is "soft" under the hood, so remove its default fill.
  &[data-variant="ghost"] {
    background-color: transparent;

    &:hover:not(:disabled) {
      background-color: var(--gray-a3);
    }
  }
`},75818:function(e,t,r){r.d(t,{u:()=>a});var n=r(52322);r(2784);let a=e=>(0,n.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",width:e.size??20,height:e.size??20,fill:"none",viewBox:"0 0 24 24",strokeWidth:36/(e.size??20),...e,children:(0,n.jsx)("path",{stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",d:"M11.9998 9v4m0 4h.01M10.6151 3.8917l-8.225 14.2066c-.4561.788-.6842 1.182-.6505 1.5054.0294.282.1772.5383.4065.7051.263.1912.7182.1912 1.6288.1912h16.4497c.9106 0 1.3658 0 1.6288-.1912a1 1 0 0 0 .4065-.7051c.0337-.3234-.1944-.7174-.6506-1.5054L13.3844 3.8917c-.4545-.7852-.6818-1.1777-.9783-1.3096a1 1 0 0 0-.8126 0c-.2966.1319-.5239.5244-.9784 1.3096"})})},92622:function(e,t,r){r.d(t,{J:()=>a});var n=r(52322);r(2784);let a=e=>(0,n.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",width:e.size??20,height:e.size??20,fill:"none",viewBox:"0 0 24 24",strokeWidth:36/(e.size??20),...e,children:(0,n.jsx)("path",{stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",d:"M20 6 9 17l-5-5"})})},60351:function(e,t,r){r.d(t,{b:()=>a});var n=r(52322);r(2784);let a=e=>(0,n.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",width:e.size??20,height:e.size??20,fill:"none",viewBox:"0 0 24 24",strokeWidth:36/(e.size??20),...e,children:(0,n.jsx)("path",{stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",d:"M3 9h13.5c2.4853 0 4.5 2.0147 4.5 4.5S18.9853 18 16.5 18H12M3 9l4-4M3 9l4 4"})})},32016:function(e,t,r){r.d(t,{Y:()=>a});var n=r(52322);r(2784);let a=e=>(0,n.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",width:e.size??20,height:e.size??20,fill:"none",viewBox:"0 0 24 24",strokeWidth:36/(e.size??20),...e,children:(0,n.jsx)("path",{stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",d:"M21 9H7.5C5.0147 9 3 11.0147 3 13.5S5.0147 18 7.5 18H12m9-9-4-4m4 4-4 4"})})},29128:function(e,t,r){r.d(t,{Z:()=>rb});var n=r(52322),a=r(7184),i=r(82608),o=r(6648),s=r(63403),l=r(25171),d=r(70621),c=r(75958),u=r(2784),p=r(28316),m=r(28128),g=r(20322);let x={gracePeriodMs:2e3};var h=r(71509),f=r(80075);async function v(e,t,r){t.setTeamId(r),t.setIsLoading(!0);let n=await e.send({eventName:"GetFolders",data:{teamId:r},dest:{component:s.wA.Main,location:void 0}}).finally(()=>t.setIsLoading(!1));return n&&t.replaceFolders(n.map(e=>({id:e.id,name:e.name,teamId:e.teamId,lastChangedAt:new Date(e.lastChangedAt),quantity:e.quantity}))),t.availableFolders}function b(e,t,r){try{e()}catch(e){d.k.error(`error on ${t}`,{error:(0,h.LT)(e),...r})}}let w=(e,t=i.eq("10s"))=>new Promise((r,n)=>{if(!e.availableIntegrationsLoading){r();return}let a=setTimeout(()=>{i(),n(Error(`Timeout waiting for integrations to load after ${t}ms`))},t),i=(0,f.U5)(()=>e.availableIntegrationsLoading,e=>{e||(clearTimeout(a),i(),r())})});async function y(e,t,r){if(!t?.integrationName)return;await w(e);let n=e.getIntegration(t.integrationName,r);n&&(e.setSelectedIntegration(r,n),t.displayFieldsFilters&&Object.entries(t.displayFieldsFilters).forEach(([r,n])=>{r===t.integrationName&&e.setDisplayFieldsFilters(r,n)}),await e.fetchDisplayFieldsForSelectedIntegration(),Object.entries(t.fieldValues).forEach(([t,r])=>{e.displayFields.get(t)&&e.setFieldValue(t,r)}))}async function j(e,t,r,n){n&&((await v(e,t,r)).find(e=>e.id===n)?t.selectFolderById(n):d.k.warn("cannot resume selected folder, no avialable folder with id",{folderId:n}))}let C=()=>{let e=(0,m.Pn)(),t=(0,u.useCallback)(async()=>{e.syncSelectedTeamIntegrationDown(),await e.clearSelectedIntegrationContext(),e.syncContextDown()},[e]),r=(0,u.useCallback)(()=>{e.syncContextUp()},[e]);return(0,u.useEffect)(()=>{(async()=>{await e.syncedDataStore.fetchSyncedTeamIntegrationData(),t()})()},[e.syncedDataStore,t]),r};var S=r(33735);let k=()=>{let{teamFeatureUsage:e}=(0,m.dR)(),t=(0,m.$7)().selectedTeamId,r=e.get(t,S.AN.TeamJamQuotaLimit),n=!!(r&&r.limit>-1&&r.remaining<=5),a=!!(r&&r.limit>-1&&r.current>=r.limit);return{teamId:t,jamQuotaUsage:r,shouldShowWarning:n,hasReachedLimit:a}},I=RegExp("\\.(png|jpg|jpeg|gif|webp|heic|svg|mp4|webm|mov|mkv|avi|mp3|pdf|docx|xlsx|html|txt|csv|json|md|log|har|yaml|yml)$","i");RegExp("\\.(action|apk|app|bat|bin|cab|cmd|com|command|cpl|csh|ex_|exe|gadget|inf1|ins|inx|ipa|isu|job|jse|ksh|lnk|msc|msi|msp|mst|osx|out|paf|pif|prg|ps1|reg|rgs|run|scr|sct|shb|shs|u3p|vb|vbe|vbs|vbscript|workflow|ws|wsf)$","i");var $=r(76062),A=r(88767);async function T(e){let t=await new Promise((t,r)=>{let n=new FileReader;n.readAsDataURL(e),n.addEventListener("load",()=>{n.result&&t(n.result.toString())}),n.addEventListener("error",e=>{r(e)})});return{id:A.Z(),source:t,type:e.type,name:e.name,size:e.size}}var N=r(25016),z=r(27300),R=r(78213),L=r(87722),M=r(30199);let D=e=>(0,n.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",width:e.size??20,height:e.size??20,fill:"none",viewBox:"0 0 24 24",strokeWidth:36/(e.size??20),...e,children:(0,n.jsx)("path",{stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",d:"M20 7v-.2c0-1.6802 0-2.5202-.327-3.162a3 3 0 0 0-1.311-1.311C17.7202 2 16.8802 2 15.2 2H8.8c-1.6802 0-2.5202 0-3.162.327a3 3 0 0 0-1.311 1.311C4 4.2798 4 5.1198 4 6.8v10.4c0 1.6802 0 2.5202.327 3.162a3 3 0 0 0 1.311 1.311C6.2798 22 7.1198 22 8.8 22h3.7m5.5-4v-5.5c0-.8284.6716-1.5 1.5-1.5s1.5.6716 1.5 1.5V18c0 1.6569-1.3431 3-3 3s-3-1.3431-3-3v-4"})});var O=r(99692);function Z(e){let{attachments:t,onRemove:r,downloadable:a,optimizeImageUrl:i}=e;return 0===t.length?null:(0,n.jsx)(N.k,{gap:"2",p:"2",children:t.map(e=>{let t=e.name.slice(e.name.lastIndexOf(".")+1),o=e.type.startsWith("image/"),s=i?i(e.src,{width:168}):e.src,l=o?(0,n.jsx)(F,{children:(0,n.jsx)("img",{src:s,alt:e.name})}):(0,n.jsxs)(U,{direction:"column",align:"center",justify:"center",pt:"1",children:[(0,n.jsx)(D,{}),(0,n.jsx)(M.x,{as:"span",variant:"label-xs",children:"."+t})]});return(0,n.jsxs)(P,{children:[(0,n.jsx)(z.u,{sideOffset:10,content:e.name,children:a?(0,n.jsx)(E,{target:"_blank",href:e.src,download:e.name,children:l}):l}),r&&(0,n.jsx)(W,{size:"1",color:"gray",variant:"primary",onClick:()=>r(e.id),children:(0,n.jsx)(O.A,{size:12})})]},e.id)})})}let P=(0,a.Z)(N.k)`
  position: relative;
`,E=a.Z.a`
  cursor: pointer;
  text-decoration: none;
  color: inherit;
`,F=(0,a.Z)(N.k)`
  border-radius: var(--radius-3);
  box-shadow: var(--shadow-3);
  overflow: hidden;

  img {
    width: 56px;
    height: 56px;
    object-fit: cover;
  }
`,U=(0,a.Z)(N.k)`
  width: 56px;
  height: 56px;
  border-radius: var(--radius-3);
  background: var(--gray-a3);
  color: var(--gray-11);
`,W=(0,a.Z)(R.h)`
  position: absolute;
  top: -6px;
  right: -6px;
  background: var(--gray-12);
  box-shadow: 0 0 0 2px var(--color-background);
  border-radius: var(--radius-5);
  width: 16px;
  height: 16px;
  transform: rotate(0);
  transition: transform 300ms;

  &:hover,
  &:focus {
    background: var(--red-11);
    transform: rotate(90deg) scale(1.2);
    box-shadow: 0 0 0 2px var(--red-a5);
    outline: none;
    outline-offset: 0;
  }
`;var B=r(62563),G=r(2350);let J="file-drop-over";function H(e){let t=e.dataTransfer;return!!t&&(t.files.length>0||Array.from(t.types).includes("Files"))}var _=r(1389),V=r(70822),Y=r(34220);let q=B.hj.create({name:"titlePlaceholder",addOptions:()=>({forceFocusDelay:null}),onCreate({editor:e}){e.commands.focus(K(e));let{forceFocusDelay:t}=this.options;null!==t&&setTimeout(()=>{e.isDestroyed||e.commands.focus(K(e))},t)},addProseMirrorPlugins:()=>[new G.Sy({key:new G.H$("sendToAppPlaceholder"),props:{decorations(e){let{doc:t}=e,r=[],n=!1,a=!1;return t.forEach((e,t,r)=>{0===r&&"heading"===e.type.name&&(n=!0),r>0&&e.childCount>0&&(a=!0)}),t.forEach((e,t,i)=>{var o,s,l;if(e.childCount>0)return;let d=(o=e,s=i,l={hasHeading:n,hasBodyContent:a},0===s&&"heading"===o.type.name?"Title":"paragraph"!==o.type.name||l.hasBodyContent?null:1!==s&&(0!==s||l.hasHeading)?null:"Write a description or @ to mention");d&&r.push(V.p.node(t,t+e.nodeSize,{class:"is-empty","data-placeholder":d}))}),V.EH.create(t,r)}}})]});function K(e){return"disabled"!==(0,Y.yt)(e)?"start":e.getText().trim().length>0?"end":"start"}var Q=r(47209),X=r(25755);let ee=e=>(0,n.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",width:e.size??20,height:e.size??20,fill:"none",viewBox:"0 0 24 24",strokeWidth:36/(e.size??20),...e,children:(0,n.jsx)("path",{stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",d:"M17.5 5.2558V16.5c0 3.0376-2.4624 5.5-5.5 5.5s-5.5-2.4624-5.5-5.5V5.6667C6.5 3.6417 8.1416 2 10.1667 2c2.025 0 3.6666 1.6416 3.6666 3.6667v10.779c0 1.0126-.8208 1.8334-1.8333 1.8334s-1.8333-.8208-1.8333-1.8334V6.6512"})});var et=r(20305),er=r(50194),en=r(64410),ea=r(75818);let ei=e=>(0,n.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",width:e.size??20,height:e.size??20,fill:"none",viewBox:"0 0 24 24",strokeWidth:36/(e.size??20),...e,children:(0,n.jsx)("path",{stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",d:"M7 17 17 7m0 0H7m10 0v10"})}),eo=(0,c.Pi)(function(e){let{onUpgrade:t,limitReached:r,feature:a}=e,[i,o]=(0,u.useState)(!1);return i?null:(0,n.jsxs)(es,{color:r?"amber":"blue",variant:"soft",size:"1",children:[r?(0,n.jsx)(en.JO,{children:(0,n.jsx)(ea.u,{size:16})}):null,(0,n.jsx)(en.xv,{size:"2",weight:"medium",children:(0,n.jsxs)(N.k,{gap:"2",direction:"column",align:"start",children:[e.text,(0,n.jsxs)(L.z,{size:"1",variant:"secondary",onClick:()=>t(a),children:["Upgrade",(0,n.jsx)(ei,{size:14})]})]})}),r?null:(0,n.jsx)(el,{role:"button",tabIndex:0,onClick:()=>o(!0),children:(0,n.jsx)(O.A,{size:12})})]})}),es=(0,a.Z)(en.fC)`
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: var(--space-2);
  width: 100%;
`,el=a.Z.div`
  position: absolute;
  right: -10px;
  top: -10px;
  display: flex;
  padding: var(--space-1);
  border-radius: 100%;
  background-color: var(--gray-1);
  border: 1px solid var(--gray-a6);
  box-shadow: var(--shadow-4);
  color: var(--gray-11);
  cursor: pointer;
  transition: color 0.2s ease-in-out;

  &:hover {
    color: var(--gray-12);
  }
`,ed=e=>e.numDemoUsesRemaining??e.store.numDemoUsesRemaining(e.feature);var ec=r(7656);let eu=(0,ec.T)({BR000:"0px",BR050:"2px",BR075:"4px",BR100:"8px",BR200:"10px",BR210:"12px",BR300:"16px",BR400:"20px",BR600:"40px",BR900:"70px",BRROUND:"99999px",BROVAL:"50%"});var ep=r(32748),em=r(32760),eg=r(76556),ex=r(6663);let eh=(0,c.Pi)(function(e){let[t,r]=u.useState(!1);if(t||e.store?.hasAccess(e.feature,e.teamId??"any"))return null;let a=ed(e),i=S.ZY[e.feature];return(0,n.jsxs)(ef,{children:[(0,n.jsx)(eb,{size:"bodyMedium",color:"black",weight:"medium",children:e.text(a,i)}),(0,n.jsx)(ev,{onClick:()=>e.onUpgrade(e.feature),size:"small",variant:"solid",appearance:"light",textType:"body",rounded:!1,children:"Upgrade"}),e.dismissable&&0===a?(0,n.jsx)(ew,{role:"button",tabIndex:0,onClick:()=>r(!0),children:(0,n.jsx)(O.A,{size:16})}):null]})}),ef=a.Z.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${em.W.SP150};
  background-color: #f2ecfe;
  border-radius: ${eu.BR200};
  width: 100%;
`,ev=(0,a.Z)(eg.z)`
  margin-left: auto;
  font-weight: ${ep.v.medium};
`,eb=(0,a.Z)(ex.x)`
  padding: 0px ${em.W.SP200};
`,ew=a.Z.div`
  padding: 0px ${em.W.SP200};
  cursor: pointer;
`;var ey=r(61525),ej=r(49255),eC=r(72321),eS=r(884);function ek(e,t,r){eC._z.info("Redirecting to upgrade flow",{teamId:e,feature:t});let n=new URL("s/upgrade",eS.v.DASH_URL);n.search=new URLSearchParams({[$.t1.CAMPAIGN]:t,...r}).toString(),window.open(n.toString(),"_blank")}var eI=r(49710),e$=r(84869),eA=r.n(e$);function eT(e){if(!e)return"Unknown User";let t=e.firstName?.trim(),r=e.lastName?.trim();if(t&&r)return`${t} ${r}`;if(t)return t;if(r)return r;let n=e.name?.trim();if(n)return n;let a=e.email?.trim();if(a){let e=a.split("@")[0];if(e)return e}return"Unknown User"}var eN=r(79976),ez=r(42494);let eR=new G.H$("jamMentionSuggestion"),eL=(0,a.Z)(eN.q)`
  padding: calc(var(--space-1) / 2);
`,eM=(0,a.Z)(M.x)`
  line-height: 20px;
  height: 20px;
`;var eD=r(75514);function eO(e){if(null==e)return 0;let t=new Date(e).getTime();return Number.isFinite(t)?t:0}let eZ=(0,ec.T)({SHADOW1:"0px 8px 8px -4px rgba(64, 1, 17, 0.02), 0px 4px 4px -2px rgba(64, 1, 17, 0.02), 0px 2px 2px -1px rgba(42, 51, 69, 0.01), 0px 1px 1px -0.5px rgba(42, 51, 69, 0.01), 0px 0.5px 0.5px -0.25px rgba(42, 51, 69, 0.01), 0px 0px 0px 1px rgba(64, 1, 17, 0.01)",SHADOW2:"0px 16px 16px -8px rgba(64, 1, 17, 0.0313726), 0px 8px 8px -4px rgba(64, 1, 17, 0.0156863), 0px 4px 4px -2px rgba(42, 51, 69, 0.0156863), 0px 2px 2px -1px rgba(42, 51, 69, 0.0156863), 0px 1px 1px -0.5px rgba(42, 51, 69, 0.0156863), 0px 0px 0px 1px rgba(64, 1, 17, 0.0156863)",SHADOW3:"0px 24px 24px -12px rgba(64, 1, 17, 0.0470588), 0px 12px 12px -6px rgba(64, 1, 17, 0.0235294), 0px 6px 6px -3px rgba(42, 51, 69, 0.0235294), 0px 3px 3px -1.5px rgba(42, 51, 69, 0.0235294), 0px 1.5px 1.5px -0.75px rgba(42, 51, 69, 0.0235294), 0px 0px 0px 1px rgba(64, 1, 17, 0.0235294)",SHADOW4:"0px 32px 32px -16px rgba(64, 1, 17, 0.0627451), 0px 16px 16px -8px rgba(64, 1, 17, 0.0313726), 0px 8px 8px -4px rgba(42, 51, 69, 0.0313726), 0px 4px 4px -2px rgba(42, 51, 69, 0.0313726), 0px 2px 2px -1px rgba(42, 51, 69, 0.0313726), 0px 0px 0px 1px rgba(64, 1, 17, 0.0313726)",SHADOW5:"0px 24px 24px -12px rgba(64, 1, 17, 0.0627451), 0px 12px 12px -6px rgba(64, 1, 17, 0.0313726), 0px 6px 6px -3px rgba(42, 51, 70, 0.0313726), 0px 3px 3px -1.5px rgba(42, 51, 70, 0.0313726), 0px 1px 1px -0.5px rgba(42, 51, 69, 0.0313726), 0px 0px 0px 1px rgba(64, 1, 17, 0.0313726)",SHADOW6:"0px 32px 32px -16px rgba(64, 1, 17, 0.0627451), 0px 16px 16px -8px rgba(64, 1, 17, 0.0313726), 0px 8px 8px -4px rgba(42, 51, 69, 0.0313726), 0px 4px 4px -2px rgba(42, 51, 69, 0.0313726), 0px 2px 2px -1px rgba(42, 51, 69, 0.0313726), 0px 0px 0px 1px rgba(64, 1, 17, 0.0313726)",SHADOW7:"0px 24px 24px -12px rgba(64, 1, 17, 0.0470588), 0px 12px 12px -6px rgba(64, 1, 17, 0.0235294), 0px 6px 6px -3px rgba(42, 51, 69, 0.0235294), 0px 3px 3px -1.5px rgba(42, 51, 69, 0.0235294), 0px 1.5px 1.5px -0.75px rgba(42, 51, 69, 0.0235294), 0px 0px 0px 1px rgba(64, 1, 17, 0.0235294)",SHADOW8:"0px 16px 16px -8px rgba(64, 1, 17, 0.0313726), 0px 8px 8px -4px rgba(64, 1, 17, 0.0156863), 0px 4px 4px -2px rgba(42, 51, 69, 0.0156863), 0px 2px 2px -1px rgba(42, 51, 69, 0.0156863), 0px 1px 1px -0.5px rgba(42, 51, 69, 0.0156863), 0px 0px 0px 1px rgba(64, 1, 17, 0.0156863)",SHADOW9:"0px 8px 8px -4px rgba(64, 1, 17, 0.02), 0px 4px 4px -2px rgba(64, 1, 17, 0.02), 0px 2px 2px -1px rgba(42, 51, 69, 0.01), 0px 1px 1px -0.5px rgba(42, 51, 69, 0.01), 0px 0.5px 0.5px -0.25px rgba(42, 51, 69, 0.01), 0px 0px 0px 1px rgba(64, 1, 17, 0.01)"}),eP=a.Z.div`
  align-self: stretch;
  display: flex;
  align-items: center;
  margin-bottom: ${em.W.SP600};
`,eE=a.Z.button`
  display: flex;
  height: 40px;
  justify-content: center;
  align-items: center;
  gap: ${em.W.SP200};
  padding: ${em.W.SP200} ${em.W.SP300};
  border-radius: ${eu.BR100};
  background: ${ej.O.white};
  box-shadow: ${eZ.SHADOW2}, 0px 0px 0px 1px rgba(0, 0, 0, 0.03);
`,eF=function(e){let{closeJam:t,resumedDraft:r}=e;return(0,n.jsx)(eP,{children:(0,n.jsxs)(eE,{onClick:function(e){e.stopPropagation(),r?t({showToast:!0,storeDraft:!0}):t()},children:[(0,n.jsx)(O.A,{color:ej.O.charcoalGrey,size:16}),r&&(0,n.jsx)(M.x,{variant:"label-s",color:"primary",children:"Save for later"})]})})};function eU(e){return(0,n.jsxs)(eW,{className:e.className,children:[(0,n.jsx)(eB,{color:e.color}),(0,n.jsx)(eB,{color:e.color}),(0,n.jsx)(eB,{color:e.color})]})}let eW=a.Z.div`
  display: flex;
  align-items: center;
`,eB=a.Z.span`
  display: inline-block;
  width: 3px;
  height: 3px;
  border-radius: 50%;
  margin-right: 2px;
  background: ${e=>ej.O[e.color]};
  animation: wave 1s ease-in-out infinite;
  animation-delay: 0.5s;

  &:nth-child(2) {
    animation-delay: -0.6s;
  }

  &:nth-child(3) {
    animation-delay: -0.7s;
  }

  @keyframes wave {
    0%,
    60%,
    100% {
      transform: initial;
      opacity: initial;
    }

    30% {
      transform: translateY(-2px);
      opacity: 0.3;
    }
  }
`;var eG=r(17029);let eJ=()=>(0,n.jsxs)(eH,{type:"button",children:[(0,n.jsx)(eV,{children:"Accept"})," ",(0,n.jsx)(e_,{children:"Tab"})]}),eH=a.Z.button`
  display: flex;
  height: 32px;
  align-items: center;
  font-size: 14px;
  background: white;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.25);
  border-radius: 9px;
  color: rgba(0, 0, 0, 1);
  gap: 8px;
  margin-top: 8px;
  padding: 0 12px;
  padding-right: 8px;

  &:hover {
    cursor: pointer;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.4);
  }
`,e_=a.Z.kbd`
  display: flex;
  height: 16px;
  line-height: 16px;
  background: rgba(0, 0, 0, 0.04);
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  font-size: 11px;
  padding: 0 4px;
`,eV=a.Z.span`
  line-height: 32px;
  font-size: 14px;
`,eY=Y.Vb.configure({renderAcceptButton:function(e){let t=document.createElement("div");return t.className="ghost-text-accept",t.addEventListener("mousedown",t=>{t.preventDefault(),e()}),(0,eG.createRoot)(t).render(u.createElement(eJ)),t},renderSpinner:function(){let e=document.createElement("div");return e.className="ghost-text-loader",(0,eG.createRoot)(e).render(u.createElement(eU,{color:"darkGrape"})),e}});var eq=r(94338);let eK=({highContrast:e=!0,...t})=>(0,n.jsx)(eq.r,{highContrast:e,...t});function eQ(e){return(0,n.jsxs)(N.k,{align:"center",gap:"2",mx:"1",children:[(0,n.jsx)(M.x,{variant:"label-s",children:"AI"}),(0,n.jsx)(z.u,{content:e.lockedReason,hidden:!e.locked,children:(0,n.jsx)("span",{style:{display:"inline-flex"},children:(0,n.jsx)(eK,{size:"1",checked:e.enabled,disabled:e.locked,onCheckedChange:e.onChange})})})]})}var eX=r(37105);let e0=(0,a.Z)(eX.ck)`
  /* Default state styling */
  &.rt-DropdownMenuItem {
    font-weight: var(--font-weight-medium);
  }

  /* Unified hover state - works for any color, defaults to gray */
  &.rt-DropdownMenuItem:hover {
    ${e=>`background-color: var(--${e.color||"gray"}-a3);`}
  }
`,e1=(0,a.Z)(eX.fF)`
  /* SubTrigger font-weight override */
  &.rt-DropdownMenuSubTrigger {
    font-weight: var(--font-weight-medium);
  }

  /* Unified hover state - works for any color, defaults to gray */
  &.rt-DropdownMenuSubTrigger:hover {
    ${e=>`background-color: var(--${e.color||"gray"}-a3);`}
  }
`,e2=(0,a.Z)(eX.tu)`
  /* SubContent items font-weight override */
  .rt-DropdownMenuItem {
    font-weight: var(--font-weight-medium);
  }
`,e6=u.forwardRef((e,t)=>{let{color:r="gray",...a}=e;return(0,n.jsx)(eX.VY,{ref:t,variant:"soft",color:r,...a})});e6.displayName="DropdownMenuContent";let e5={Root:eX.fC,Trigger:eX.xz,Content:e6,Item:e0,Separator:eX.Z0,Label:eX.__,Sub:eX.Tr,SubTrigger:e1,SubContent:e2,RadioGroup:eX.Ee,RadioItem:eX.Rk},e3=e=>(0,n.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",width:e.size??20,height:e.size??20,fill:"none",viewBox:"0 0 24 24",strokeWidth:36/(e.size??20),...e,children:(0,n.jsx)("path",{stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",d:"m13 7-1.1155-2.231c-.3211-.6422-.4816-.9633-.7211-1.1978a2 2 0 0 0-.7473-.4619C10.0992 3 9.7402 3 9.0223 3H5.2c-1.1201 0-1.6802 0-2.108.218a2 2 0 0 0-.874.874C2 4.5198 2 5.08 2 6.2V7m0 0h15.2c1.6802 0 2.5202 0 3.162.327a3 3 0 0 1 1.311 1.311C22 9.2798 22 10.1198 22 11.8v4.4c0 1.6802 0 2.5202-.327 3.162a3 3 0 0 1-1.311 1.311C19.7202 21 18.8802 21 17.2 21H6.8c-1.6802 0-2.5202 0-3.162-.327a3 3 0 0 1-1.311-1.311C2 18.7202 2 17.8802 2 16.2z"})}),e4=(0,c.Pi)(e=>{let{foldersStore:t}=e,r=t.availableFolders,a=t.selectedFolder;return 0===r.length?null:(0,n.jsxs)(e5.Root,{children:[(0,n.jsx)(z.u,{content:"Select folder",children:(0,n.jsx)(e5.Trigger,{children:a?(0,n.jsxs)(e7,{size:"1",variant:"ghost",color:"gray",children:[(0,n.jsx)(N.k,{flexShrink:"0",children:(0,n.jsx)(e3,{size:16})}),(0,n.jsx)(M.x,{truncate:!0,variant:"label-s",children:a.name})]}):(0,n.jsx)(R.h,{size:"1",variant:"ghost",color:"gray",children:(0,n.jsx)(e3,{size:16})})})}),(0,n.jsxs)(e5.Content,{children:[(0,n.jsx)(e5.Item,{onSelect:()=>t.selectFolderById(),children:"No folder"}),r.map(e=>(0,n.jsx)(e5.Item,{onSelect:()=>t.selectFolderById(e.id),children:(0,n.jsxs)(N.k,{gap:"2",align:"center",children:[(0,n.jsx)(e3,{}),(0,n.jsx)(M.x,{children:e.name})]})},e.id))]})]})});e4.displayName="DraftFolderSelect";let e7=(0,a.Z)(L.z)`
  display: flex;
  flex: 0 1 auto;
  min-width: 0;
  white-space: nowrap;
  text-overflow: ellipsis;
`;var e9=r(72986),e8=r(3311);let te=e=>(0,n.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",width:e.size??20,height:e.size??20,fill:"none",viewBox:"0 0 24 24",strokeWidth:36/(e.size??20),...e,children:(0,n.jsx)("path",{stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",d:"M9 17H7c-2.7614 0-5-2.2386-5-5s2.2386-5 5-5h2m6 10h2c2.7614 0 5-2.2386 5-5s-2.2386-5-5-5h-2m-8 5h10"})});var tt=r(22970),tr=r(28165);let tn=a.Z.div`
  ${function(e){return(0,tr.iv)`
    padding: ${e.padding};
    margin: ${e.margin};
    background: ${ej.O[e.background]};
    border-radius: ${e.borderRadius};
    border: ${e.borderColor?`1px solid ${ej.O[e.borderColor]}`:"none"};
  `}}
`;function ta(e,t){if(t)return Array.isArray(t)?t.map(t=>e[t]).join(" "):e[t]}function ti(e){let{align:t,alignSelf:r,justify:a,direction:i,gap:o,wrap:s,grow:l,shrink:d,basis:c,dir:u,inline:p,width:m,...g}=e,x={align:t,justify:a,direction:u??i,alignSelf:r,gap:o&&em.W[o],wrap:s,grow:l,shrink:d,basis:c,inline:p,width:m,className:e.className??void 0};return(0,n.jsx)(to,{...x,...g,children:e.children})}let to=(0,a.Z)(function(e){let t={padding:ta(em.W,e.padding),margin:ta(em.W,e.margin),background:e.background??"transparent",borderRadius:ta(eu,e.borderRadius),borderColor:e.borderColor};return(0,n.jsx)(tn,{...t,className:e.className,children:e.children})})`
  display: ${e=>e.inline?"inline-flex":"flex"};
  ${function(e){return(0,tr.iv)`
    align-items: ${e.align};
    align-self: ${e.alignSelf??"initial"};
    justify-content: ${e.justify};
    flex-direction: ${e.direction};
    flex-grow: ${e.grow??"initial"};
    flex-shrink: ${e.shrink??"initial"};
    flex-basis: ${e.basis??"initial"};
    gap: ${e.gap};
    flex-wrap: ${e.wrap??"initial"};
    width: ${e.width??"auto"};
  `}}
`;function ts(e){let{fillStroke:t="#2A3632",...r}=e;return(0,n.jsxs)(tl,{...r,viewBox:"0 0 18 20",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[(0,n.jsx)("path",{d:"M11.609 15.4909C11.018 15.25 10.4089 15 8.99986 15C7.59077 15 6.97713 15.25 6.39077 15.4909C6.22259 15.5591 6.04986 15.6273 5.86349 15.6909C5.38168 16.2682 5.15895 17.0636 5.27258 17.8364C5.33622 18.2773 5.72258 18.6091 6.17258 18.6091C6.21804 18.6091 6.26349 18.6045 6.31349 18.6C6.77258 18.5318 7.12258 18.3636 7.38622 18.1818C7.57713 18.6318 7.94077 19.1364 8.64531 19.4409C8.75895 19.4909 8.87713 19.5136 9.0044 19.5136C9.13168 19.5136 9.24986 19.4909 9.36349 19.4409C10.068 19.1409 10.4317 18.6318 10.6226 18.1818C10.8862 18.3636 11.2362 18.5273 11.6953 18.6C11.7408 18.6091 11.7862 18.6091 11.8362 18.6091C12.2862 18.6091 12.6726 18.2773 12.7362 17.8364C12.8453 17.0636 12.6271 16.2682 12.1453 15.6909C11.9499 15.6273 11.7817 15.5591 11.609 15.4909Z",fill:"#73E5BF"}),(0,n.jsx)("path",{d:"M13.5454 15.9091C12.6409 15.9091 12.1182 15.6954 11.6091 15.4909C11.0182 15.25 10.4091 15 8.99998 15C7.59089 15 6.97725 15.25 6.39089 15.4909C5.88634 15.6954 5.36361 15.9091 4.45452 15.9091C3.4227 15.9091 2.62725 15.6363 2.08634 15.0954C1.54543 14.5545 1.27271 13.7591 1.27271 12.7273C1.27271 10.0409 2.14543 6.97726 3.60907 4.54089C5.16816 1.94544 7.1318 0.454529 8.99998 0.454529C10.8682 0.454529 12.8318 1.94544 14.3909 4.54089C15.8545 6.9818 16.7273 10.0409 16.7273 12.7273C16.7273 13.7591 16.4545 14.5545 15.9136 15.0954C15.3727 15.6363 14.5772 15.9091 13.5454 15.9091Z",fill:"#FF4070"}),(0,n.jsx)("path",{d:"M6.95452 9.09089C6.72725 9.09089 6.27271 9.09089 6.27271 10.2273C6.27271 11.3636 6.72725 11.3636 6.95452 11.3636C7.1818 11.3636 7.63634 11.3636 7.63634 10.2273C7.63634 9.09089 7.1818 9.09089 6.95452 9.09089Z",fill:t}),(0,n.jsx)("path",{d:"M11.0454 9.09089C10.8182 9.09089 10.3636 9.09089 10.3636 10.2273C10.3636 11.3636 10.8182 11.3636 11.0454 11.3636C11.2727 11.3636 11.7273 11.3636 11.7273 10.2273C11.7273 9.09089 11.2727 9.09089 11.0454 9.09089Z",fill:t}),(0,n.jsx)("path",{d:"M8.99998 5.45453C8.77271 5.45453 8.31816 5.45453 8.31816 6.59089C8.31816 7.72726 8.77271 7.72726 8.99998 7.72726C9.22725 7.72726 9.6818 7.72726 9.6818 6.59089C9.6818 5.45453 9.22725 5.45453 8.99998 5.45453Z",fill:t}),(0,n.jsx)("path",{d:"M16.5228 8.32273C16.1091 6.9 15.5046 5.50909 14.7819 4.30455C14.0319 3.05455 13.1546 2.00909 12.241 1.27727C11.1773 0.431818 10.0864 0 9.00006 0C7.91369 0 6.82278 0.431818 5.76369 1.27727C4.85005 2.00909 3.97278 3.05455 3.22278 4.30455C2.50006 5.50909 1.89551 6.9 1.48187 8.32273C1.04551 9.80909 0.818237 11.3318 0.818237 12.7273C0.818237 13.8818 1.13642 14.7864 1.76824 15.4136C2.39551 16.0455 3.30006 16.3636 4.4546 16.3636C4.64551 16.3636 4.81824 16.3545 4.98187 16.3409C4.8046 16.8318 4.74551 17.3727 4.82278 17.9C4.91824 18.5636 5.50005 19.0636 6.17278 19.0636C6.24096 19.0636 6.31369 19.0591 6.38187 19.0455C6.69551 18.9955 6.97278 18.9091 7.2046 18.8045C7.5046 19.2682 7.93187 19.6273 8.46369 19.8545C8.63642 19.9273 8.81369 19.9636 9.00006 19.9636C9.18642 19.9636 9.36824 19.9273 9.53642 19.8545C10.0682 19.6273 10.4955 19.2682 10.7955 18.8045C11.0319 18.9091 11.3046 18.9955 11.6182 19.0455C11.6864 19.0545 11.7591 19.0591 11.8273 19.0591C12.5001 19.0591 13.0819 18.5591 13.1773 17.8955C13.2546 17.3682 13.1955 16.8273 13.0182 16.3364C13.1819 16.35 13.3546 16.3591 13.5455 16.3591C14.7001 16.3591 15.6046 16.0409 16.2319 15.4091C16.8637 14.7864 17.1819 13.8818 17.1819 12.7273C17.1819 11.3318 16.9546 9.80909 16.5228 8.32273ZM12.2773 17.7682C12.2455 17.9955 12.0501 18.1545 11.8273 18.1545C11.8046 18.1545 11.7819 18.1545 11.7591 18.15C10.7228 17.9909 10.3637 17.2727 10.3637 17.2727C10.3637 17.2727 10.3637 18.5136 9.17733 19.0227C9.11824 19.0455 9.05915 19.0591 9.00006 19.0591C8.94096 19.0591 8.87733 19.0455 8.82278 19.0227C7.63642 18.5136 7.63642 17.2727 7.63642 17.2727C7.63642 17.2727 7.27733 17.9909 6.24096 18.15C6.21824 18.1545 6.19551 18.1545 6.17278 18.1545C5.95005 18.1545 5.7546 17.9955 5.72278 17.7682C5.63187 17.1227 5.81824 16.5091 6.13642 16.0727C6.28642 16.0182 6.42733 15.9636 6.55915 15.9091C7.13187 15.6727 7.67733 15.4545 9.00006 15.4545C10.3228 15.4545 10.8637 15.6773 11.441 15.9091C11.5773 15.9636 11.7137 16.0227 11.8637 16.0727C12.1819 16.5091 12.3728 17.1227 12.2773 17.7682ZM13.5455 15.4545C11.7273 15.4545 11.7273 14.5455 9.00006 14.5455C6.27278 14.5455 6.27278 15.4545 4.4546 15.4545C2.63642 15.4545 1.72733 14.5455 1.72733 12.7273C1.72733 7.27273 5.36369 0.909091 9.00006 0.909091C12.6364 0.909091 16.2728 7.27273 16.2728 12.7273C16.2728 14.5455 15.3637 15.4545 13.5455 15.4545Z",fill:t})]})}let tl=a.Z.svg`
  vertical-align: middle;
`;function td(e){return(0,n.jsx)(tc,{autoMargin:e.autoMargin??!0,className:e.className,children:(0,n.jsx)(ts,{height:24,width:24})})}let tc=a.Z.div`
  padding: initial;
  ${e=>e.autoMargin&&"margin: 0 auto;"}
  text-align: center;
  width: 24px;
  animation: spin 700ms ease-in-out infinite;

  @keyframes spin {
    0% {
      transform: rotateZ(0deg);
    }
    100% {
      transform: rotateZ(360deg);
    }
  }
`;var tu=r(6757);let tp=a.Z.button`
  display: grid;
  align-items: center;
  grid-template-columns: 24px 20px;
  border-radius: ${em.W.SP200};
  padding: ${em.W.SP200} ${em.W.SP250};
  gap: ${em.W.SP200};
  background: ${ej.O.white};
  border: 1px solid ${ej.O.mediumGrey};
  box-shadow: ${eZ.SHADOW1};
`,tm=a.Z.div`
  background: ${ej.O.black};
  display: flex;
  flex-direction: column;
  max-width: 260px;
  width: 100%;
  overflow: hidden;
  padding: ${em.W.SP100};
`,tg=a.Z.button`
  width: 100%;
  background: transparent;
  padding: ${em.W.SP100} ${em.W.SP400};
  display: grid;
  align-items: center;
  border-radius: 8px;
  flex: none;
  min-height: 40px;
  height: 40px;
  grid-template-columns: 24px minmax(0, 1fr) 20px;
  gap: 12px;
  text-align: left;
  transition: none;

  &:hover {
    background: ${ej.O.nearBlack};
  }
`,tx=a.Z.div`
  height: 1px;
  background: ${ej.O.nearBlack};
  margin: ${em.W.SP200} ${em.W.SP400};
`;var th=r(40807),tf=r(59802),tv=r(17620),tb=r.n(tv),tw=r(92622),ty=r(89825);let tj=(0,c.Pi)(function(e){let{integration:t,unlocked:r=!0}=e,a=t.userConfigured&&t.teamConfigured,i=!a&&!t.allowConnecting,o=(0,n.jsxs)(tk,{disabled:!r||!t.allowConnecting&&!a,onClick:e.onClick,children:[e.icon??null,(0,n.jsx)(tC,{unlocked:r,integration:t,isConfigured:a}),e.active&&(0,n.jsx)(tw.J,{color:r?ej.O.white:ej.O.darkGrey}),i&&(0,n.jsx)(ea.u,{color:ej.O.mango})]},t.integrationName);return i?(0,n.jsx)(ty.u,{title:(0,e9.w5)(t.displayName),children:o}):o});function tC(e){let t=e.integration.integrationName,r=(0,e9._g)(t),a=e.integration.displayName,i="darkGrey";return(e.isConfigured&&(i=e.unlocked?"white":"darkGrey"),e.isConfigured)?(0,n.jsx)(tS,{color:i,children:a+" "+r}):(0,n.jsxs)(ti,{gap:"SP100",children:[(0,n.jsx)(ex.x,{as:"span",color:i,weight:"regular",size:"bodyMedium",children:"Connect"}),(0,n.jsx)(tS,{color:i,children:a})]})}let tS=(0,a.Z)(e=>(0,n.jsx)(ex.x,{as:"span",weight:"regular",size:"bodyMedium",...tb()(e,"unlocked")}))``,tk=(0,a.Z)(e=>(0,n.jsx)(tg,{...tb()(e,"$isConfigured")}))`
  grid-template-columns: 20px minmax(0, 1fr) 20px;

  svg:first-of-type {
    display: block;
    width: 20px;
  }

  &:disabled svg:first-of-type {
    filter: grayscale(1) sepia(0.8) saturate(0) brightness(0.7);
  }
`,tI={userConfigured:!0,teamConfigured:!0,allowConnecting:!0,integrationName:"link",displayName:"Link to share"},t$=(0,c.Pi)(e=>{let{excludeInternalIntegrations:t,teamEntitlements:r,integrations:a,onSelectIntegration:i,onClearSelectedIntegration:o,onConnectMoreApps:s,excludeEmailIntegration:l,excludeLinkOption:d}=e,c={teamId:e.teamId,integrations:a,onSelectIntegration:i,onClearSelectedIntegration:o,onConnectMoreApps:s,excludeInternalIntegrations:t,excludeEmailIntegration:l,excludeLinkOption:d,hasEntitlement:r.has};return(0,n.jsx)(tA,{...c})}),tA=(0,c.Pi)(e=>{let t=e.integrations.userConfiguredIntegrationsExcludingEmail(e.teamId)>=2,r=e.integrations.selectedIntegrationPerTeam.get(e.teamId);return(0,n.jsxs)(u.Fragment,{children:[e.excludeLinkOption?null:(0,n.jsx)(tj,{active:!r,unlocked:!0,integration:tI,icon:(0,n.jsx)(te,{color:"white",size:20}),onClick:e.onClearSelectedIntegration}),(0,n.jsx)(()=>{let a=e.integrations.getBy(e.teamId,{filterBy:"dataPushNotIssueTracker",sortBy:"standard"}).filter(t=>!e.excludeInternalIntegrations||!t.internal).filter(t=>!e.excludeEmailIntegration||"email"!==t.integrationName).filter(e=>"intercom"!==e.integrationName).filter(e=>!t||e.userConfigured);return(0,n.jsx)(n.Fragment,{children:a.map(t=>(0,n.jsx)(tj,{active:t.integrationName===r?.integrationName,integration:t,icon:(0,tt.fK)(t.integrationName),onClick:()=>e.onSelectIntegration(t)},t.id))})},{}),(0,n.jsx)(()=>e.integrations.getBy(e.teamId,{filterBy:"dataPushIssueTracker",sortBy:"standard"}).filter(t=>!e.excludeInternalIntegrations||!t.internal).filter(t=>!e.excludeEmailIntegration||"email"!==t.integrationName).filter(e=>"intercom"!==e.integrationName).filter(e=>!t||e.userConfigured).map(t=>(0,n.jsx)(tj,{active:t.integrationName===r?.integrationName,integration:t,icon:(0,tt.fK)(t.integrationName),onClick:()=>e.onSelectIntegration(t)},t.id)),{}),t?(0,n.jsx)(tT,{onClick:e.onConnectMoreApps,icon:(0,n.jsx)(tf.v,{}),appearance:"dark",textType:"body",children:"Connect more apps"}):null]})}),tT=(0,a.Z)(eg.z)`
  justify-content: flex-end;
  padding: 8px 16px;
  border-radius: 0;
  border: none;
  line-height: 1;
  color: ${ej.O.darkGrey};

  svg {
    color: ${ej.O.darkGrey} !important;
    margin-right: 12px;
    width: 20px;
  }

  span {
    font-size: ${th.C.bodyMedium};
    font-weight: ${ep.v.regular};
  }

  &:hover,
  &:focus {
    background: ${ej.O.nearBlack};
    border-color: ${ej.O.charcoalGrey};
    span,
    svg {
      color: ${ej.O.darkGrey} !important;
    }
  }
`,tN=e=>(0,n.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",width:e.size??20,height:e.size??20,fill:"none",viewBox:"0 0 24 24",strokeWidth:36/(e.size??20),...e,children:(0,n.jsx)("path",{stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",d:"M7.101 10H7V8c0-2.7614 2.2386-5 5-5s5 2.2386 5 5v2h-.101M12 14v2m7-1c0 3.866-3.134 7-7 7s-7-3.134-7-7 3.134-7 7-7 7 3.134 7 7"})});var tz=r(14269),tR=r(97784);function tL(e){let t=e.src??void 0;t?.includes("avatars.jam.dev")&&(t=void 0);let r=e.firstLetter.toUpperCase(),a=e.borderRadius??"6px",i=e.size??24,o=tZ[r]??"lime",s=tP(o),l=tE(o);return(0,n.jsxs)(tM,{size:i,children:[(0,n.jsx)(tD,{src:t,alt:r,radius:a}),(0,n.jsx)(tO,{radius:a,size:i,style:{backgroundColor:s,color:l},children:r})]})}let tM=(0,a.Z)(tz.fC)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
  overflow: hidden;
  user-select: none;
  width: ${e=>e.size}px;
  height: ${e=>e.size}px;
  flex-shrink: 0;
`,tD=(0,a.Z)(tz.Ee)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: ${e=>e.radius};
`,tO=(0,a.Z)(tz.NY)`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  line-height: 1;
  font-size: 14px;
  font-weight: 500;
  border-radius: ${e=>e.radius};
  text-transform: uppercase;
`,tZ={A:"blue",B:"amber",C:"lime",D:"amber",E:"crimson",F:"blue",G:"cyan",H:"blue",I:"amber",J:"lime",K:"amber",L:"crimson",M:"blue",N:"cyan",O:"blue",P:"amber",Q:"lime",R:"amber",S:"crimson",T:"blue",U:"cyan",V:"blue",W:"amber",X:"lime",Y:"amber",Z:"crimson"},tP=e=>{switch(e){case"blue":return tR.iNS.blue3;case"amber":return tR.DzF.amber3;case"lime":return tR.LRo.lime3;case"crimson":return tR.WlT.crimson3;case"cyan":return tR.sl2.cyan3}},tE=e=>{switch(e){case"blue":return tR.iNS.blue11;case"amber":return tR.DzF.amber11;case"lime":return tR.LRo.lime11;case"crimson":return tR.WlT.crimson11;case"cyan":return tR.sl2.cyan11}};var tF=r(55607);function tU(e){let t=t=>{e.onSelectTeam(t),e.onClose()},{restrictedTeamIds:r}=e,a=e.normalTeams??[],i=r?a.filter(e=>!r.has(e.id)):a,o=r?a.filter(e=>r.has(e.id)):[];return(0,n.jsxs)(tm,{children:[(0,n.jsx)(tG,{children:(0,n.jsx)(ex.x,{color:"darkGrey",as:"span",size:"bodyMedium",weight:"medium",children:"Save to"})}),(0,n.jsx)(tx,{}),i.length>0?(0,n.jsx)(tH,{children:i.map(r=>(0,n.jsx)(tW,{onClick:t,selectedTeamId:e.selectedTeam?.id??null,team:r,avatar:r.logo},r.id))}):null,o.length>0?(0,n.jsxs)(u.Fragment,{children:[o.map(e=>(0,n.jsx)(tB,{team:e,avatar:e.logo},e.id)),e.restrictedFooter]}):null]})}let tW=e=>(0,n.jsxs)(tg,{onClick:()=>e.onClick(e.team.id),children:[(0,n.jsx)(tL,{firstLetter:e.team.name.charAt(0),src:e.avatar}),(0,n.jsx)(ex.x,{color:"white",truncate:!0,as:"span",weight:"medium",size:"bodyMedium",children:e.team.name}),e.selectedTeamId===e.team.id&&(0,n.jsx)(tw.J,{color:ej.O.white})]},e.team.id),tB=e=>(0,n.jsxs)(tJ,{as:"div",children:[(0,n.jsx)(tL,{firstLetter:e.team.name.charAt(0),src:e.avatar}),(0,n.jsx)(ex.x,{color:"darkGrey",truncate:!0,as:"span",weight:"medium",size:"bodyMedium",children:e.team.name}),(0,n.jsx)(tN,{size:16,color:ej.O.darkGrey})]}),tG=a.Z.div`
  height: 32px;
  align-items: center;
  display: flex;
  padding: 8px 16px;
`,tJ=(0,a.Z)(tg)`
  cursor: default;

  &:hover {
    background: transparent;
  }
`,tH=a.Z.div`
  display: flex;
  flex-direction: column;
  max-height: 320px;
  flex-direction: column;
  overflow-y: auto;

  ${tF.zl};
`,t_=(0,c.Pi)(function(e){let[t,r]=(0,u.useState)(null),[a,i]=(0,u.useState)(!1),o=()=>{i(!1)},s=e.restrictedTeamIds?.has(e.selectedTeam.id)??!1;return(0,n.jsxs)("div",{children:[(0,n.jsx)("div",{ref:r,children:(0,n.jsxs)(tp,{onClick:()=>i(!0),children:[(0,n.jsx)(tL,{firstLetter:e.selectedTeam.name.charAt(0),src:e.selectedTeam.logo??void 0}),s?(0,n.jsx)(tN,{color:ej.O.charcoalGrey,size:16}):(0,n.jsx)(e8._,{color:ej.O.charcoalGrey})]})}),(0,n.jsx)(tu.J,{isOpen:a,anchorEl:t,onClose:o,disableAutoFocus:!0,borderRadius:12,anchorOrigin:{vertical:"bottom",horizontal:"right"},transformOrigin:{vertical:-4,horizontal:"right"},children:(0,n.jsx)(tU,{onClose:o,selectedTeam:e.selectedTeam,onSelectTeam:t=>{o(),e.onSelectTeam(t)},normalTeams:e.normalTeams,userAvatar:e.userAvatar,restrictedTeamIds:e.restrictedTeamIds,restrictedFooter:e.restrictedFooter})})]})}),tV=(0,c.Pi)(function(e){let[t,r]=(0,u.useState)(null),[a,i]=(0,u.useState)(!1),{onOpen:o,waitingForAuth:s,...l}=e,{selectedIntegration:d}=e.integrations;(0,u.useEffect)(()=>{if(e.autoSelectNextActiveIntegration&&d&&!d?.userConfigured){let t=e.integrations.sortedAvailableIntegrations(e.team.id).find(e=>e.userConfigured&&e.teamConfigured);e.integrations.selectIntegration(t)}},[e.team.id,e.autoSelectNextActiveIntegration,e.integrations,d]);let c=()=>{e.onClose?.(),i(!1)};return(0,n.jsxs)(n.Fragment,{children:[e.headless?null:(0,n.jsxs)(tK,{children:[(0,n.jsx)(t0,{size:"bodyMedium",weight:"medium",color:"newGrey",children:"Create a"}),(0,n.jsxs)(tQ,{children:[(0,n.jsx)(t1,{ref:r,children:(0,n.jsx)(tq,{integrations:e.integrations,onOpen:()=>{i(!0),o?.()}})}),(e.normalTeams??[]).length>0&&(0,n.jsx)(t_,{selectedTeam:e.team,normalTeams:e.normalTeams,onSelectTeam:e.onSelectTeam,userAvatar:e.userAvatar,restrictedTeamIds:e.restrictedTeamIds,restrictedFooter:e.restrictedFooter})]})]}),(0,n.jsx)(tu.J,{isOpen:e.headless?.open??a,anchorEl:e.headless?.anchor??t,onClose:c,disableAutoFocus:!0,container:e.headless?.anchor??t,borderRadius:12,anchorOrigin:{vertical:"bottom",horizontal:"left"},transformOrigin:{vertical:-4,horizontal:0},children:(0,n.jsx)(tm,{children:(0,n.jsx)(tY,{...l,excludeEmailIntegration:!!e.headless,excludeLinkOption:!!e.headless,onSelectIntegration:e=>{c(),l.onSelectIntegration(e)},onClearSelectedIntegration:()=>{c(),l.onClearSelectedIntegration()},isLoading:e.isLoading&&!s})})})]})}),tY=(0,c.Pi)(e=>{let{isLoading:t,...r}=e;return t?(0,n.jsx)("div",{children:(0,n.jsx)(td,{})}):(0,n.jsx)(t$,{...r})}),tq=e=>{let t=e.integrations.selectedIntegration;return(0,n.jsxs)(tX,{onClick:e.onOpen,children:[void 0===t?(0,n.jsx)(te,{}):tt.Y6(t.integrationName),(0,n.jsx)(ex.x,{as:"span",truncate:!0,size:"bodyMedium",weight:"regular",children:(()=>{if(!t)return"Link to share";let e=(0,e9._g)(t.integrationName??"");return`${t.displayName} ${e}`})()}),(0,n.jsx)(ti,{grow:1,justify:"end",children:(0,n.jsx)(e8._,{color:ej.O.charcoalGrey})})]})},tK=a.Z.div`
  display: flex;
  align-items: center;
  gap: ${em.W.SP200};
  min-width: 0;

  ${ey.w.tablet} {
    margin-bottom: 8px;
  }
`,tQ=a.Z.div`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: ${em.W.SP200};
  min-width: 0;
  flex-grow: 1;

  /* if user has only one team, let select button take full width */
  &:has(> :only-child) {
    grid-template-columns: 1fr;
  }
`,tX=a.Z.button`
  display: flex;
  align-items: center;
  border-radius: ${em.W.SP200};
  padding: ${em.W.SP200} ${em.W.SP300};
  gap: ${em.W.SP200};
  width: 100%;
  background: ${ej.O.white};
  border: 1px solid ${ej.O.mediumGrey};
  box-shadow: ${eZ.SHADOW1};

  svg {
    flex: none;
  }

  svg:first-of-type {
    width: 20px;
    height: 20px;
  }
`,t0=(0,a.Z)(ex.x)`
  white-space: nowrap;
`,t1=a.Z.div`
  display: flex;
  flex: 1;
  min-width: 0;
`;var t2=r(44496);function t6(e){let t=(0,n.jsx)(t4,{children:(0,n.jsxs)(ti,{dir:"column",gap:"SP250",children:[(0,n.jsxs)(ex.x,{weight:"medium",size:"bodySmall",color:"white",children:["Now that your trial for workspace"," ",(0,n.jsx)("strong",{children:e.workspaceName})," has ended, new Jams you create will be visible to anyone with the link"]}),(0,n.jsxs)(ti,{justify:"space-between",children:[(0,n.jsx)(t3,{variant:"primary",onClick:e.onUpgradePlansClick,children:"Upgrade plans"}),(0,n.jsx)(t3,{variant:"secondary",onClick:e.onClose,children:"Dismiss"})]})]})});return(0,n.jsx)(ty.u,{open:e.open,placement:"bottom-start",title:t,disablePortal:!0,interactive:!0,children:e.children})}let t5=(0,c.Pi)(function(e){let[t,r]=(0,u.useState)(!1),a=(0,m.fe)(),i=(0,m.$7)(),o=(0,m.MU)(),s=(0,t2.J)(o),l=a.filterByVariant("BusinessTrialEndedDashboard",i.selectedTeamId),d=l.length>0&&"teamId"in l[0]?l[0].teamId:"",c=i.teams?.find(e=>e.id===d)?.name??"unknown",p=(0,u.useRef)(new Set),g=(0,u.useRef)(new Set),x=(0,u.useCallback)(()=>{r(l.length>0),!(l.length>0)||l[0].deactivatedAt||p.current.has(l[0].id)||(s.viewInAppNotification({id:l[0].id}),p.current.add(l[0].id))},[s,JSON.stringify(l)]),h=(0,u.useCallback)(()=>{t&&(r(l.length>0),!(l.length>0)||l[0].deactivatedAt||g.current.has(l[0].id)||(s.deactivateInAppNotification({id:l[0].id}),g.current.add(l[0].id)))},[s,JSON.stringify(l)]);(0,u.useEffect)(()=>{x()},[x]);let f=(0,u.useCallback)(()=>{l.length>0&&(ek(d,S.AN.Unknown,{[$.t1.SOURCE]:"extension:iframe",[$.t1.CONTENT]:"business-trial-end"}),h())},[JSON.stringify(l)]);return(0,n.jsx)(t6,{workspaceName:c,open:t,onClose:h,onUpgradePlansClick:f,children:e.children})}),t3=a.Z.a`
  font-weight: ${ep.v.medium};
  font-size: ${th.C.bodySmall};

  &:hover {
    text-decoration: none;
  }

  ${e=>"primary"===e.variant?(0,tr.iv)`
        color: ${ej.O.blueberry};
        &:hover {
          color: ${ej.O.lightBlueberry};
        }
      `:(0,tr.iv)`
        color: ${ej.O.darkGrey};
        &:hover {
          color: ${ej.O.mediumGrey};
        }
      `}
`,t4=a.Z.div`
  max-width: 326px;
  text-wrap: wrap;
  padding: 5px 0;
`,t7=e=>{let t=`${eS.v.DASH_URL}/s/${e.teamId}/settings/members`;return(0,n.jsxs)(t9,{children:[(0,n.jsx)(ex.x,{color:"white",as:"span",weight:"medium",size:"bodyMedium",children:"Request upgrade"}),(0,n.jsx)(ex.x,{color:"darkGrey",as:"span",size:"bodySmall",children:"Your account needs to be upgraded to creator by an admin."}),(0,n.jsxs)(t8,{href:t,target:"_blank",rel:"noopener noreferrer",children:["View admins",(0,n.jsx)(ei,{size:16})]})]})},t9=a.Z.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 8px 16px 12px;
`,t8=a.Z.a`
  margin-top: 8px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  background: ${ej.O.leaf};
  color: ${ej.O.black};
  font-weight: 600;
  font-size: 14px;
  border-radius: 8px;
  padding: 8px 12px;
  text-decoration: none;

  /* This renders as a button, so override the iframe's global Bootstrap-derived
     anchor styling (a:hover { text-decoration: underline; color: blue }). */
  &:hover {
    color: ${ej.O.black};
    text-decoration: none;
    filter: brightness(0.96);
  }
`,re=(0,c.Pi)(e=>{let{user:t}=(0,m.dR)(),{integrationsStore:r,authStore:a}=e,o=e.authStore.selectedTeamId,s=t?.teams.find(e=>e.id===o),d=(0,u.useRef)(!1);if((0,u.useEffect)(()=>{!r.availableIntegrationsLoading&&d.current&&((0,l.Y)().finalize("integrations_render_list","success"),d.current=!1)},[r.availableIntegrationsLoading]),(0,u.useEffect)(()=>{if(s?.roleType!==eI.GD.ViewerRestricted)return;let e=(t?.teams??[]).find(e=>e.roleType!==eI.GD.ViewerRestricted);e&&(a.setSelectedTeamId(e.id),r.setTeamId(e.id),r.setSelectedIntegration(e.id,void 0))},[s,t,a,r]),!s)return null;let c=(t?.teams??[]).filter(e=>e.roleType===eI.GD.ViewerRestricted),p=new Set(c.map(e=>e.id)),g=p.has(s.id)?s.id:c[0]?.id;async function x(e){a.setSelectedTeamId(e),r.setTeamId(e),r.setSelectedIntegration(e,void 0);let t=r.syncedDataStore?.getSelectedIntegration(e);t&&(await r.onIntegrationChange(t),r.syncContextDown())}return(0,n.jsx)(rt,{children:(0,n.jsx)(t5,{children:(0,n.jsx)(tV,{onOpen:()=>{let e=(0,l.Y)();r.availableIntegrationsLoading?(e.create("integrations_render_list",{createTimeout:i.eq("1s"),traceTimeout:i.eq("10s")}),d.current=!0):(0,l.Y)().create("integrations_render_list",{mode:"insert-finalized",state:{type:"finalized",variant:"success",createdAt:Date.now(),finalizedAt:Date.now()}})},userAvatar:a.me.data?.avatarSrc,autoSelectNextActiveIntegration:!0,normalTeams:a.normalTeams,restrictedTeamIds:p,restrictedFooter:g?(0,n.jsx)(t7,{teamId:g}):void 0,onSelectTeam:x,excludeInternalIntegrations:!1,integrations:r,teamId:s.id,team:s,teamEntitlements:e.myFeaturesStore,waitingForAuth:e.waitingForAuth,isLoading:r.availableIntegrationsLoading,onSelectIntegration:async t=>{t.userConfigured&&t.teamConfigured||e.setWaitingForAuth(t.integrationName),await r.onIntegrationChange(t.integrationName),r.syncContextDown(),r.syncSelectedTeamIntegrationUp()},onClearSelectedIntegration:()=>{r.clearSelectedIntegration(),r.syncSelectedTeamIntegrationUp()},onConnectMoreApps:()=>{window.open(`${eS.v.DASH_URL}/s/${s.id}/settings/connected-apps?${$.I4.CONNECT_MORE_APPS}=true`,"_blank")}})})})}),rt=a.Z.section`
  padding: 24px;
  border-top-right-radius: 16px;
  align-items: baseline;
  min-height: 68px;
  gap: 24px;
  overflow: visible;
`,rr={description:null,dismissed:!1,generationId:null,sessionId:null,status:"idle",title:null};async function rn(e,t,r){let n=(0,A.Z)(),a=await e.send({eventName:"GetAiSummary",dest:{component:s.wA.Main,location:void 0},data:{aiSessionId:r,localGenerationId:n,tabId:t.tabId,teamId:t.teamId,trigger:"mount"},timeout:i.eq("30s")});return a.ok?{description:a.value.description,dismissed:!1,generationId:a.value.generationId,sessionId:r,status:"ready",title:a.value.title}:{description:null,dismissed:!1,generationId:null,sessionId:r,status:"error",title:null}}function ra(e){return`${e.teamId}:${e.tabId}:${e.draftStartedAt??"none"}`}function ri(e){return{description:e.description,dismissed:e.dismissed,generationId:e.generationId,sessionId:e.sessionId,status:e.status,title:e.title}}function ro(e,t,r){let n=function(e){var t;let{state:r,hasTitle:n,ghostVisible:a,hasAcceptedContent:i}=e;if("error"===r.status)return a?{kind:"clear"}:{kind:"none"};if(r.dismissed||"idle"===r.status||i)return{kind:"none"};if("loading"===r.status)return{kind:"loading"};let o=(t=r,n&&t.title?`### ${t.title}

${t.description??""}`:t.description??null);return o?{kind:"suggest",text:o}:{kind:"none"}}({state:t,hasTitle:r,ghostVisible:"disabled"!==(0,Y.yt)(e),hasAcceptedContent:null!==rs(e)});switch(n.kind){case"clear":e.commands.clearSuggestion();break;case"loading":e.commands.setSuggestion(r?"### Add a title or wait for AI\n\nWrite a description or @ to mention":"Write a description or wait for AI",{showSpinner:!0});break;case"suggest":e.commands.setSuggestion(n.text,{showSpinner:!1})}}function rs(e){return"disabled"!==(0,Y.yt)(e)||0===e.getText().trim().length?null:e.getJSON()}function rl(e,t){return!e||e.type!==eI.Wz.None&&(e.type!==eI.Wz.Restricted||e.value.includes(t))}let rd=(0,c.Pi)(e=>{let{integrationsStore:t,inAppNotificationsStore:r,foldersStore:a,newThreadStore:o,authStore:l,globallySyncedStore:d}=e,{capture:c,teamFeatureUsage:p}=d,x=(0,u.useRef)(null),h=(0,u.useRef)(null),b=(0,m.MU)(),w=(0,m.z3)(),y=(0,g.i)();async function j(e){let r=t.getFileTypes(),{accepted:n,rejectedSizeCount:a,rejectedTypeCount:s,rejectedOverflowCount:l}=function(e,t){let{isTypeAllowed:r}=t,n=r?e.filter(e=>r(e)):e,a=e.length-n.length,i=n.filter(e=>e.size<=5e6),o=n.length-i.length,s=Math.max(0,t.maxFiles-t.currentCount),l=i.slice(0,s),d=i.length-l.length;return{accepted:l,rejectedSizeCount:o,rejectedTypeCount:a,rejectedOverflowCount:d}}(e,{currentCount:o.attachments.length,maxFiles:5,isTypeAllowed:e=>{var t;return!!(t=e.name)&&I.test(t)&&rl(r,e.type)}});l>0&&y({title:"You can attach up to 5 files",ttl:i.eq("3s"),dismissable:!0}),s>0&&y({title:`${s} unsupported ${eA()("file",s)}`,ttl:i.eq("3s"),dismissable:!0}),a>0&&y({title:`${a} ${eA()("file",a)} over the 5 MB limit`,ttl:i.eq("3s"),dismissable:!0}),0!==n.length&&o.addAttachments(await Promise.all(n.map(T)))}let C=(0,u.useRef)(j);C.current=j;let M=(0,u.useMemo)(()=>{var e;return e=e=>C.current(e),B.hj.create({name:"fileDrop",addProseMirrorPlugins(){let t=null,r=()=>{t&&(clearTimeout(t),t=null)},n=(e,t)=>{e.dom.classList.toggle("file-drop-active",t),t?e.dom.dataset.fileDropPlaceholder="Drop your files here":(delete e.dom.dataset.fileDropPlaceholder,e.dom.classList.remove(J))},a=(e,t)=>{let r=t.target;n(e,!0),e.dom.classList.toggle(J,r instanceof Node&&e.dom.contains(r))},i=e=>{r(),n(e,!1)},o=e=>{r(),t=setTimeout(()=>n(e,!1),100)};return[new G.Sy({props:{handleDOMEvents:{dragover:(e,t)=>!!H(t)&&(t.preventDefault(),!0),dragend:e=>(i(e),!1)},handleDrop:(t,r)=>{i(t);let n=Array.from(r.dataTransfer?.files??[]);return 0!==n.length&&(r.preventDefault(),e(n),!0)},handlePaste:(t,r)=>{let n=Array.from(r.clipboardData?.files??[]);return 0!==n.length&&(r.preventDefault(),e(n),!0)}},view(e){let t=e.dom.ownerDocument,n=t.defaultView,s=()=>i(e),l=t=>{H(t)&&(r(),a(e,t))},d=r=>{if(!H(r))return;let n=r.relatedTarget;!(n instanceof Node&&t.documentElement.contains(n))&&o(e)};return t.addEventListener("dragenter",l,!0),t.addEventListener("dragover",l,!0),t.addEventListener("dragleave",d,!0),t.addEventListener("drop",s,!0),t.addEventListener("dragend",s,!0),n?.addEventListener("blur",s),{destroy(){i(e),t.removeEventListener("dragenter",l,!0),t.removeEventListener("dragover",l,!0),t.removeEventListener("dragleave",d,!0),t.removeEventListener("drop",s,!0),t.removeEventListener("dragend",s,!0),n?.removeEventListener("blur",s)}}}})]}})},[]),D=l.selectedTeamId,O=l.me?.data?.id,P=!t.syncedDataStore.loaded||!t.selectedIntegration||t.displayFields.has("title"),{mentionSuggestion:E}=function(e){let t=(0,m.$7)(),r=t.data?.id,a=t.data?.teams.find(t=>t.id===e)?.members,i=a?(0,eD.vM)(a):void 0,{mentionSuggestion:o}=function(e){let{members:t,resolveMember:r}=e,a=(0,u.useRef)(t);a.current=t;let i=(0,u.useRef)(r);return i.current=r,{mentionSuggestion:(0,u.useMemo)(()=>{var e;return e={membersRef:a,resolverRef:i},{buildExtension:t=>ez.Z.configure({hasResolver:()=>null!=e.resolverRef.current,resolveMember:t=>e.resolverRef.current?.(t)??null,suggestion:{char:"@",...t,allow:({state:e,range:t})=>"heading"!==e.doc.resolve(t.from).parent.type.name,command:({editor:e,range:t,props:r})=>(function({editor:e,range:t,member:r}){e.chain().focus().insertContentAt(t,[{type:"mention",attrs:{targetType:"user",targetId:r.id,label:r.name}},{type:"text",text:" "}]).run(),window.getSelection()?.collapseToEnd()})({editor:e,range:t,member:r})}}),getItemKey:e=>e.id,getSelectedValue:e=>e,id:"jamMentionSuggestion",items:({query:t})=>(function(e,t){let r=t.toLowerCase();return(r?e.filter(e=>e.displayName.toLowerCase().includes(r)||e.name.toLowerCase().includes(r)||(e.email?.toLowerCase().includes(r)??!1)):e).slice(0,10)})(e.membersRef.current,t),pluginKey:eR,renderItem:({item:e})=>(0,n.jsxs)(u.Fragment,{children:[(0,n.jsx)(eL,{src:e.avatarSrc??void 0,fallback:e.displayName.charAt(0),size:"1",radius:"full"}),(0,n.jsx)(eM,{as:"span",truncate:!0,children:e.displayName})]})}},[])}}({members:(0,u.useMemo)(()=>{var e;return(e=function(e,t){if(!e)return e;let r=null==t?[...e]:e.filter(e=>e.id!==t);return r.sort((e,t)=>{let r=eO(e.lastActiveAt),n=eO(t.lastActiveAt);return r!==n?n-r:eT(e).localeCompare(eT(t))}),r}(i,r))?e.map(e=>({id:e.id,displayName:eT(e),name:eT(e),email:e.email,avatarSrc:e.avatarSrc})):[]},[i,r]),resolveMember:(0,u.useMemo)(()=>(function(e){if(e)return t=>{let r=e.find(e=>e.id===t);return r?{name:eT(r),email:r.email,avatarSrc:r.avatarSrc}:null}})(i),[i])});return{mentionSuggestion:o}}(D),{emojiSuggestion:F}=(0,_.I)(),U=(0,u.useMemo)(()=>{let e=[eY,q.configure({forceFocusDelay:200}),M];return P&&e.push(Q.Eq),e},[P,M]),W=(0,u.useMemo)(()=>[E,F],[E,F]),V=d.isTeamAiSummaryEnabled(D),K=d.isAiSummaryEnabled,{updateUserPreferences:en}=function(){let e=(0,m.MU)();return{updateUserPreferences:async t=>{await e.send({eventName:"UpdateUserPreferences",dest:{component:s.wA.Main},data:{preferences:t}})}}}();(function(e){let t=(0,m.MU)(),{teamId:r,globallySyncedStore:n,foldersStore:a}=e;(0,u.useEffect)(()=>{async function e(){await v(t,a,r),n.lastSelected?.folderId&&a.selectFolderById(n.lastSelected.folderId)}a.isLoading||e()},[e.teamId])})({globallySyncedStore:d,authStore:l,foldersStore:a,teamId:D}),function(e){let t=(0,m.MU)(),{userId:r,inAppNotificationsStore:n}=e;(0,u.useEffect)(()=>{async function e(){if(!r)return;n.setLoading(!0);let e=await t.send({eventName:"GetInAppNotifications",data:null,dest:{component:s.wA.Main,location:void 0}}).finally(()=>n.setLoading(!1));n.update(e)}n.loading||e()},[r,t,n])}({userId:O,inAppNotificationsStore:r});let ea=(0,m.EO)(),{hasReachedLimit:ei}=k(),eo=V&&K&&!ei,es=ei?"You've reached your Jam quota. AI is locked until your quota resets.":c.type===eI.K8.Video?null:"AI summaries only work on video Jams.",[el,ed]=function(e){let[t,r]=(0,u.useState)(null),n=e.getIntegration(t??"");return(0,u.useEffect)(()=>{if(t&&n)return(0,f.U5)(()=>n.userConfigured,t=>{t&&(e.selectIntegration(n),r(null))})},[t,e,n]),[t,r]}(t),ec=ea.screenshot.screenshotIsCaptured&&null===ea.screenshot.compositeScreenshot,eu=t.isLoadingIntegrationFields||"pre_draft"===c.state.name||"submission"===c.state.name||ec,ep=c.type===eI.K8.Video&&("pre_draft"===c.state.name||"draft"===c.state.name)?c.state.payload.toolsSummary:null,[em,eg]=(0,u.useState)(null),[ex,eh]=(0,u.useState)(!1),ef=e=>{if(o.setContentSnapshot(e),P){let r=(e.content?.[0]?.content??[]).map(e=>e.text??"").join("");t.setFieldValue("title",r)}},ev=function(e){let t=(0,u.useRef)(null);t.current||(t.current=function(){let e=new Map;return{dismiss:t=>{let r=ra(t),n=e.get(r);n&&e.set(r,{...n,dismissed:!0})},get:t=>{if(!t.enabled)return{state:rr};let r=ra(t.params),n=e.get(r);if(n)return{promise:n.promise,state:ri(n)};let a=(0,A.Z)(),i=rn(t.broker,t.params,a).then(t=>{let n=e.get(r),a=n?.dismissed?{...t,dismissed:!0}:t;return e.set(r,a),ri(a)}).catch(()=>{let t=e.get(r),n={...rr,dismissed:t?.dismissed??!1,sessionId:a,status:"error"};return e.set(r,n),ri(n)}),o={...rr,promise:i,sessionId:a,status:"loading"};return e.set(r,o),{promise:i,state:ri(o)}},getAcceptedIds:t=>{let r=ra(t),n=e.get(r);return n?.sessionId&&n?.generationId?{sessionId:n.sessionId,generationId:n.generationId}:null}}}());let r=(0,m.rC)(),{editor:n,query:a}=e,{hasTitle:i,onAcceptedContent:o}=n,{params:l}=a;return{onCreate:e=>{let n=t.current?.get(a);n&&(n.state.sessionId&&r.setSessionId(n.state.sessionId),ro(e,n.state,i),n.promise?.then(t=>{t.sessionId&&r.setSessionId(t.sessionId),e.isDestroyed||ro(e,t,i)}),e.on("transaction",({transaction:r})=>{r.getMeta("acceptSuggestion")&&(o(e.getJSON()),t.current?.dismiss(l),function(e,t,r){let n=r?.getAcceptedIds(t);n&&e.send({eventName:"NotifyAiGenerationAccepted",dest:{component:s.wA.Main,location:void 0},data:{aiSessionId:n.sessionId,aiGenerationId:n.generationId}})}(a.broker,l,t.current))}))},onUnmount:e=>{let r=null!==rs(e);((0,Y.tZ)(e)||r)&&t.current?.dismiss(l),r&&o(e.getJSON())}}}({editor:{hasTitle:P,onAcceptedContent:ef},query:{broker:b,enabled:eo&&!es,params:{tabId:w,teamId:D,draftStartedAt:c.type===eI.K8.Video&&"draft"===c.state.name?c.state.payload.startTimestamp:void 0}}}),eb=d.user?.teams.find(e=>e.id===D),ew=eb?.roleType===eI.GD.ViewerRestricted,ey=(d.user?.teams??[]).some(e=>e.roleType!==eI.GD.ViewerRestricted);if((0,u.useEffect)(()=>{if(!ew||ey)return;let e=b.send({eventName:"NewToast",dest:{component:s.wA.ContentScript,location:s.Ye.ContentScripts.JamUi,tabId:w},data:{title:"No permission to create Jams in this workspace",icon:"warning",dismissable:!0}});return()=>{e.then(e=>b.send({eventName:"RemoveToast",dest:{component:s.wA.ContentScript,location:s.Ye.ContentScripts.JamUi,tabId:w},data:{toastId:e?.toastId}}))}},[ew,ey,b,w]),!eb)return null;let ej=d.myFeatures,eC=ep?function(e,t){let r=[];switch((e?.blur.numBlurredSelectors??-1)>0&&!t.hasAccess(S.AN.CaptureScreenRecordingBlur,"any")&&0>=t.numDemoUsesRemaining(S.AN.CaptureScreenRecordingBlur)&&r.push("blur"),e?.annotations.didUseAnnotations&&!t.hasAccess(S.AN.CaptureScreenRecordingAnnotations,"any")&&0>=t.numDemoUsesRemaining(S.AN.CaptureScreenRecordingAnnotations)&&r.push("annotations"),r.length){case 0:return;case 1:return`Please upgrade to use the ${r[0]} feature`;case 2:return`Please upgrade to use the ${r.join(" and ")} features`;default:return"Please upgrade to use these features"}}(ep,ej):void 0,eS="draft"===c.state.name&&c.state.payload.resumedDraft,e$=ew||ei?"Save to drafts":"Create",eN=t.getFileTypes(),eZ=o.attachments.filter(e=>rl(eN,e.type)).map(e=>({id:e.id,name:e.name,type:e.type,src:e.source}));return(0,n.jsx)(ru,{"data-testid":"comment-modal",children:(0,n.jsxs)(rp,{ref:eg,children:[(0,n.jsxs)(rm,{children:[(0,n.jsx)(eF,{closeJam:e.closeJam,resumedDraft:eS}),e.children]}),(0,n.jsx)(rg,{children:(0,n.jsxs)(rx,{children:[(0,n.jsx)(et.v,{integrations:t}),(0,n.jsx)(re,{authStore:e.authStore,myFeaturesStore:ej,integrationsStore:t,waitingForAuth:el,setWaitingForAuth:ed}),(0,n.jsx)(rh,{children:(0,n.jsx)(X.H4,{ref:x,content:(0,Q.DE)(o.getMessageContent(),P),onChange:ef,onCreate:ev.onCreate,onUnmount:ev.onUnmount,onSubmit:e.handleCreateThread,extensions:U,suggestions:W,suggestionSide:"bottom"},`${String(P)}:${String(eo)}`)}),(0,n.jsx)(N.k,{px:"3",children:(0,n.jsx)(Z,{attachments:eZ,onRemove:o.removeAttachment})}),(0,n.jsx)(er.V,{tooltipContainer:em,integrations:t}),(0,n.jsx)(rf,{children:(0,n.jsx)(rc,{teamId:D,onUpgrade:e=>ek(D,e,{[$.t1.SOURCE]:"extension:iframe",[$.t1.CONTENT]:"draft-modal-banner"}),toolsSummary:ep,myFeatures:ej,shouldShowAiGenerationBanner:eo,teamFeatureUsage:p})}),(0,n.jsx)("input",{ref:h,type:"file",multiple:!0,hidden:!0,onChange:e=>{let t=Array.from(e.target.files??[]);t.length>0&&j(t),e.target.value=""}}),(0,n.jsxs)(N.k,{minWidth:"0",p:"4",children:[(0,n.jsxs)(N.k,{flexGrow:"1",minWidth:"0",align:"center",gap:"2",pr:"3",children:[eN?.type!==eI.Wz.None&&(0,n.jsx)(z.u,{content:"Attach files",children:(0,n.jsx)(R.h,{size:"1",variant:"ghost",color:"gray",onClick:()=>h.current?.click(),children:(0,n.jsx)(ee,{size:16})})}),(0,n.jsx)(e4,{foldersStore:a}),V&&(0,n.jsx)(eQ,{enabled:K&&!es,locked:!!es,lockedReason:es??"",onChange:e=>en({aiSummaryEnabled:e})})]}),(0,n.jsx)(z.u,{content:eC??"",hidden:!eC,children:(0,n.jsx)(L.z,{loading:ex,onClick:async()=>{if(ew||ei){e.closeJam({showToast:!0,storeDraft:!0});return}eh(!0);try{await e.handleCreateThread()}finally{eh(!1)}},disabled:ex||eu||(ew?eS:!!eC),children:e$})})]})]})})]})})}),rc=(0,c.Pi)(e=>{let{onUpgrade:t,toolsSummary:r,myFeatures:a,shouldShowAiGenerationBanner:i,teamId:o}=e,s=e.teamFeatureUsage.get(o,S.AN.TeamJamQuotaLimit);if(s&&s.limit>-1){if(!(s.remaining<=5))return;let e=s.remaining<=0,r=`You have ${s.remaining}`,a=e?(0,n.jsxs)(n.Fragment,{children:["You've reached your monthly limit.",(0,n.jsx)("br",{})," New Jams are saved as drafts."]}):`${r} ${eA()("Jam",s.limit)} left this month.`;return(0,n.jsx)(eo,{text:a,feature:S.AN.TeamJamQuotaLimit,onUpgrade:t,limitReached:e})}return(r?.blur.numBlurredSelectors??-1)>0&&!a.hasAccess(S.AN.CaptureScreenRecordingBlur,"any")&&0>=a.numDemoUsesRemaining(S.AN.CaptureScreenRecordingBlur)?(d.k.warn("Showing special-case `0 demo uses remaining` banner",{featureName:"blur"}),(0,n.jsx)(eh,{feature:S.AN.CaptureScreenRecordingBlur,store:a,onUpgrade:t,text:(e,t)=>`${e}/${t} ${eA()("video blur",t)} left`})):r?.annotations.didUseAnnotations&&!a.hasAccess(S.AN.CaptureScreenRecordingAnnotations,"any")&&0>=a.numDemoUsesRemaining(S.AN.CaptureScreenRecordingAnnotations)?(d.k.warn("Showing special-case `0 demo uses remaining` banner",{featureName:"annotations"}),(0,n.jsx)(eh,{feature:S.AN.CaptureScreenRecordingAnnotations,store:a,onUpgrade:t,text:(e,t)=>`${e}/${t} ${eA()("video annotation",t)} left`})):i?(0,n.jsx)(eh,{dismissable:!0,feature:S.AN.AiSummaryGeneration,store:a,onUpgrade:t,text:(e,t)=>`${e}/${t} ${eA()("AI summary",t)} left`}):null}),ru=a.Z.div`
  padding: 24px;
  max-width: 100%;
  max-height: 100%;
  min-height: 340px;

  width: 90%;
  height: 90%;
  ${ey.w.mobile} {
    padding: 0;
  }
`,rp=a.Z.div`
  display: flex;
  width: 100%;
  height: 100%;

  ${ey.w.tablet} {
    flex-direction: column;
  }

  box-shadow: 0px 4px 32px rgba(0, 0, 0, 0.2);
  border-radius: 16px;
`,rm=a.Z.div`
  padding: ${em.W.SP600};
  display: flex;
  flex-direction: column;
  background: ${ej.O.lightGrey};
  border-top-left-radius: 16px;
  border-bottom-left-radius: 16px;
  position: relative;
  z-index: 1;
  min-width: 0; // fix flex overflow
  flex: 1;
  justify-content: center;
  ${ey.w.tablet} {
    border-radius: 16px 16px 0 0;
  }
`,rg=a.Z.div`
  display: flex;
  position: relative;
  background: ${ej.O.white};
  width: 372px;
  border-top-right-radius: 16px;
  border-bottom-right-radius: 16px;

  ${ey.w.tablet} {
    width: auto;
    border-radius: 0 0 16px 16px;
    overflow: auto;
  }
`,rx=a.Z.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;

  ${ey.w.tablet} {
    height: max-content;
  }
`,rh=a.Z.div`
  padding: 0 12px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow: auto;

  .editor-root,
  .editor-content {
    display: flex;
    flex-direction: column;
    flex-grow: 1;

    .tiptap {
      flex-grow: 1;
    }
  }

  .ghost-text-loader {
    display: inline-flex;
    padding-left: 4px;
  }

  .ghost-text-content {
    color: rgba(0, 0, 0, 0.32);
  }

  h3.ghost-text-content .ghost-text-loader {
    transform: translateY(-5px);
  }

  p.ghost-text-content .ghost-text-loader {
    transform: translateY(-3px);
  }

  .ghost-text-accept {
    display: block;
  }
`,rf=a.Z.div`
  padding: 0 16px;

  &:empty {
    display: none;
  }
`;async function rv(e){let{broker:t,integrationsStore:r,globallySyncedStore:n}=e,a=n.currentTab.id,o=function(e){if(e.hasSelectedIntegration()){let t=e.invalidFieldValues,r=e.selectedIntegration?.displayName;if(t)return{title:`Some ${r} values are invalid.`,description:t.map(e=>e.message).join(", "),icon:"warning",ttl:i.eq("3s")};if(e.displayFieldsLoading)return{title:`${r} fields are currently loading, please wait.`,icon:"warning",ttl:i.eq("2s")}}}(r);if(o){(0,g.G)(t,a,o);return}r.storeRecentlyUsedFields();let s=r.hasSelectedIntegration()?r.onSubmitUserMessage:"Creating a link for you, on its way shortly!",{toastId:l}=await (0,g.G)(t,a,{title:s,ttl:i.eq("2m"),icon:"loading"});return{toastId:l}}let rb=(0,c.Pi)(function(e){let[t,r]=(0,u.useState)("idle"),a=(0,m.dR)(),c=(0,m.$7)(),f=(0,m.b3)(),v=(0,m.Pn)(),w=(0,m.fe)(),S=(0,m.__)(),k=(0,m.MU)(),I=function(e=x){let[t,r]=(0,u.useState)(void 0),n=(0,m.MU)(),[a,i]=(0,u.useState)(0),[o,l]=(0,u.useState)(),d=(0,m.dR)().currentTab.id,c=(0,g.i)();async function p(){l((await c({title:"Press esc again to close Jam",icon:"info"})).toastId)}return(0,u.useEffect)(()=>()=>{o&&n.send({eventName:"RemoveToast",dest:{component:s.wA.ContentScript,location:s.Ye.ContentScripts.JamUi,tabId:d},data:{toastId:o}}),window.clearTimeout(t)},[t,o,n,d]),async function(){if(void 0===o&&await p(),Date.now()-a<e.gracePeriodMs){await n.send({eventName:"RemoveToast",dest:{component:s.wA.ContentScript,location:s.Ye.ContentScripts.JamUi,tabId:d},data:{toastId:o}}),l(void 0),await n.send({eventName:"Dismiss",dest:{component:s.wA.Main,location:void 0},data:{}});return}i(Date.now()),r(window.setTimeout(()=>{n.send({eventName:"RemoveToast",dest:{component:s.wA.ContentScript,location:s.Ye.ContentScripts.JamUi,tabId:d},data:{toastId:o}}),l(void 0)},e.gracePeriodMs))}}(),$=C();!function(e){let[t,r]=(0,u.useState)(!1),n=(0,m.MU)(),a=(0,m.rC)(),i=(0,m.b3)(),o=(0,m.__)(),l=(0,m.Pn)(),c=(0,m.$7)().selectedTeamId;(0,u.useEffect)(()=>{(async function(){if("draft"===e.state.name&&e.state.payload?.resumedDraft&&!t)try{d.k.info(`resuming ${e.type} draft`);let t=await n.send({eventName:"GetDraftResumableState",dest:{component:s.wA.Main,location:void 0},data:null});if(t.ok){let{message:r,aiSessionState:s,folderId:u,integrationState:p,attachments:m}=t.value;d.k.info(`resuming ${e.type} draft with data`,{message:!!r,aiSessionState:!!s,folderId:!!u,integrationState:!!p,attachments:!!m}),s?.sessionId&&b(()=>a.resumeSessionState(s),"restoring aiSessionState",{aiSessionState:s}),r&&b(()=>i.setInitialContentFromJSON(r),"restoring message",{message:r}),m&&b(()=>i.addAttachments(m),"restoring attachments",{teamId:c,attachmentCount:m?.length}),await Promise.all([j(n,o,c,u).catch(e=>{d.k.error("error on restoring folder",{error:(0,h.LT)(e),folderId:u,teamId:c})}),y(l,p,c).catch(e=>{d.k.error("error on restoring integration state",{error:(0,h.LT)(e),teamId:c,integrationName:p?.integrationName})})])}d.k.info(`resumed ${e.type} draft successfully`)}catch(e){d.k.error("failed to or resume part of the draft state",{error:(0,h.LT)(e),teamId:c})}finally{r(!0)}})()},[e,t,c,n,a,i,o,l])}(a.capture),(0,u.useEffect)(()=>()=>{k.send({eventName:"FreezeClickEvents",dest:{component:s.wA.HostScript,location:s.Ye.HostScripts.AdditionalHooks,tabId:a.currentTab.id},data:!1})},[k,a.currentTab.id]);let A=(0,u.useRef)(null);return"complete"===t?null:(0,n.jsx)(rw,{ref:A,submitState:t,children:(0,n.jsx)(o.V,{fullScreen:!0,open:!0,onClose:I,disablePortal:!0,borderRadius:32,backgroundColor:"transparent",children:(0,n.jsx)(rd,{globallySyncedStore:a,newThreadStore:f,integrationsStore:v,inAppNotificationsStore:w,foldersStore:S,authStore:c,handleCreateThread:async()=>{try{let e=await (0,l.Y)().create("jam_create",{createTimeout:i.eq("1s"),traceTimeout:i.eq("1m")});d.k.debug("jam_create trace result",{traceResult:e})}catch(e){d.k.error("jam_create trace error",{error:e})}try{$()}catch(e){d.k.warn("jam_create syncContextUp error",{error:e})}let t=await rv({broker:k,integrationsStore:v,globallySyncedStore:a});t&&(e.onBeforeSubmit&&((0,p.flushSync)(()=>{r("in-progress")}),await e.onBeforeSubmit()),await e.onSubmit(t),r("complete"))},closeJam:async(e={})=>{await k.send({eventName:"Dismiss",dest:{component:s.wA.Main,location:void 0},data:e})},children:e.children})})})}),rw=a.Z.div`
  position: relative;
  pointer-events: auto;
  padding: 32px;

  opacity: ${e=>"in-progress"===e.submitState||"complete"===e.submitState?0:1};
  transition: opacity 0.1s;
`},16140:function(e,t,r){r.d(t,{Z:()=>i});var n=r(63403),a=r(49710);async function i(e){let t=e.captureType===a.K8.Screenshot?"CreateJamScreenshot":e.captureType===a.K8.Video?"CreateJamVideo":"CreateJamReplay";return e.broker.send({eventName:t,dest:{component:n.wA.Main,location:void 0},data:e.data})}}};
//# sourceMappingURL=252.js.map