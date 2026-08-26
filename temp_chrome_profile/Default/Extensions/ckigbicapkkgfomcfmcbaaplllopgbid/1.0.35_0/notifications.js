(function(){function e(e){return e==null||typeof e==`function`?{main:e}:e}var t={webapp:{ping:`orspot:ping`,pong:`orspot:pong`,token:`orspot:token`,logged:`orspot:logged`,invalidate:`orspot:invalidate`},injected:{consoleStart:`injected:c-start`,consoleStop:`injected:c-stop`,networkStart:`injected:n-start`,networkStop:`injected:n-stop`,bumpLogs:`ort:bump-logs`,bumpNetwork:`ort:bump-network`},notifications:{display:`ornotif:display`,copy:`ornotif:copy`,stop:`ornotif:stop`},controls:{triggerStop:`content:trigger-stop`}},n=e(()=>{let{notifications:e}=t;async function n(e){let t=document.createElement(`textarea`);t.value=e,t.setAttribute(`readonly`,``),t.style.position=`absolute`,t.style.left=`-9999px`,document.body.appendChild(t),t.select(),document.execCommand(`copy`),document.body.removeChild(t)}function r(){let e=document.createElement(`style`);e.textContent=`
    .or-flex{display:flex}
    .or-items-center {align-items:center}
    .or-gap-3 {gap: .25rem}
    .or-spinner {
        width: 18px;
        height: 18px;
        border: 2px solid rgba(0, 0, 0, 0.1);
        border-radius: 50%;
        border-top-color: #394dfe;
        animation: spin 0.6s linear infinite;
      }

      @keyframes spin {
        to {
          transform: rotate(360deg);
        }
      }
    `,document.head.appendChild(e)}function i(e){let t=e.data.message||`Recording has started successfully.`,n=document.createElement(`div`);n.className=`or-flex or-gap-3 or-items-center`;let r=document.createElement(`div`);r.className=`or-spinner`;let i=document.createElement(`span`);i.textContent=String(t),n.appendChild(r),n.appendChild(i);let a=document.createElement(`div`);Object.assign(a.style,{position:`fixed`,bottom:`2rem`,right:`2rem`,backgroundColor:`#E2E4F6`,color:`black`,padding:`1.5rem`,borderRadius:`0.75rem`,opacity:`0.9`,transition:`opacity 300ms`,zIndex:99999999}),a.appendChild(n),document.body.appendChild(a),a.offsetHeight,setTimeout(()=>{a.style.opacity=`0`,setTimeout(()=>{document.body.removeChild(a)},300)},4500)}function a(){function t(r){r.source===window&&(!r.data||typeof r.data!=`object`||(r.data.type===e.display&&i(r),r.data.type===e.copy&&n(r.data.url).then(()=>{i({data:{message:`Link copied to clipboard and new tab opened`}})}).catch(e=>{console.error(e)}),r.data.type===e.stop&&window.removeEventListener(`message`,t)))}return window.addEventListener(`message`,t),function(){window.removeEventListener(`message`,t)}}r(),window.__or_clear_notifications||(window.__or_clear_notifications=a())}),r={debug:(...e)=>([...e],void 0),log:(...e)=>([...e],void 0),warn:(...e)=>([...e],void 0),error:(...e)=>([...e],void 0)};return(()=>{let e;try{e=n.main(),e instanceof Promise&&(e=e.catch(e=>{throw r.error(`The unlisted script "notifications" crashed on startup!`,e),e}))}catch(e){throw r.error(`The unlisted script "notifications" crashed on startup!`,e),e}return e})()})();