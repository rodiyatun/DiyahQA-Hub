(function(){"use strict";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fs=function(n){const t=[];let e=0;for(let r=0;r<n.length;r++){let i=n.charCodeAt(r);i<128?t[e++]=i:i<2048?(t[e++]=i>>6|192,t[e++]=i&63|128):(i&64512)===55296&&r+1<n.length&&(n.charCodeAt(r+1)&64512)===56320?(i=65536+((i&1023)<<10)+(n.charCodeAt(++r)&1023),t[e++]=i>>18|240,t[e++]=i>>12&63|128,t[e++]=i>>6&63|128,t[e++]=i&63|128):(t[e++]=i>>12|224,t[e++]=i>>6&63|128,t[e++]=i&63|128)}return t},Yu=function(n){const t=[];let e=0,r=0;for(;e<n.length;){const i=n[e++];if(i<128)t[r++]=String.fromCharCode(i);else if(i>191&&i<224){const o=n[e++];t[r++]=String.fromCharCode((i&31)<<6|o&63)}else if(i>239&&i<365){const o=n[e++],a=n[e++],u=n[e++],h=((i&7)<<18|(o&63)<<12|(a&63)<<6|u&63)-65536;t[r++]=String.fromCharCode(55296+(h>>10)),t[r++]=String.fromCharCode(56320+(h&1023))}else{const o=n[e++],a=n[e++];t[r++]=String.fromCharCode((i&15)<<12|(o&63)<<6|a&63)}}return t.join("")},Us={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,t){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const e=t?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let i=0;i<n.length;i+=3){const o=n[i],a=i+1<n.length,u=a?n[i+1]:0,h=i+2<n.length,f=h?n[i+2]:0,m=o>>2,I=(o&3)<<4|u>>4;let R=(u&15)<<2|f>>6,P=f&63;h||(P=64,a||(R=64)),r.push(e[m],e[I],e[R],e[P])}return r.join("")},encodeString(n,t){return this.HAS_NATIVE_SUPPORT&&!t?btoa(n):this.encodeByteArray(Fs(n),t)},decodeString(n,t){return this.HAS_NATIVE_SUPPORT&&!t?atob(n):Yu(this.decodeStringToByteArray(n,t))},decodeStringToByteArray(n,t){this.init_();const e=t?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let i=0;i<n.length;){const o=e[n.charAt(i++)],u=i<n.length?e[n.charAt(i)]:0;++i;const f=i<n.length?e[n.charAt(i)]:64;++i;const I=i<n.length?e[n.charAt(i)]:64;if(++i,o==null||u==null||f==null||I==null)throw new Ju;const R=o<<2|u>>4;if(r.push(R),f!==64){const P=u<<4&240|f>>2;if(r.push(P),I!==64){const k=f<<6&192|I;r.push(k)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class Ju extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const Zu=function(n){const t=Fs(n);return Us.encodeByteArray(t,!0)},Un=function(n){return Zu(n).replace(/\./g,"")},Bs=function(n){try{return Us.decodeString(n,!0)}catch(t){console.error("base64Decode failed: ",t)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tl(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const el=()=>tl().__FIREBASE_DEFAULTS__,nl=()=>{if(typeof process>"u"||typeof process.env>"u")return;const n=process.env.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},rl=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const t=n&&Bs(n[1]);return t&&JSON.parse(t)},Wr=()=>{try{return el()||nl()||rl()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},js=n=>{var t,e;return(e=(t=Wr())===null||t===void 0?void 0:t.emulatorHosts)===null||e===void 0?void 0:e[n]},il=n=>{const t=js(n);if(!t)return;const e=t.lastIndexOf(":");if(e<=0||e+1===t.length)throw new Error(`Invalid host ${t} with no separate hostname and port!`);const r=parseInt(t.substring(e+1),10);return t[0]==="["?[t.substring(1,e-1),r]:[t.substring(0,e),r]},qs=()=>{var n;return(n=Wr())===null||n===void 0?void 0:n.config};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sl{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((t,e)=>{this.resolve=t,this.reject=e})}wrapCallback(t){return(e,r)=>{e?this.reject(e):this.resolve(r),typeof t=="function"&&(this.promise.catch(()=>{}),t.length===1?t(e):t(e,r))}}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ol(n,t){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const e={alg:"none",type:"JWT"},r=t||"demo-project",i=n.iat||0,o=n.sub||n.user_id;if(!o)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const a=Object.assign({iss:`https://securetoken.google.com/${r}`,aud:r,iat:i,exp:i+3600,auth_time:i,sub:o,user_id:o,firebase:{sign_in_provider:"custom",identities:{}}},n);return[Un(JSON.stringify(e)),Un(JSON.stringify(a)),""].join(".")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function bt(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function al(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(bt())}function cl(){var n;const t=(n=Wr())===null||n===void 0?void 0:n.forceEnvironment;if(t==="node")return!0;if(t==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function ul(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function ll(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function hl(){return!cl()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function dl(){try{return typeof indexedDB=="object"}catch{return!1}}function fl(){return new Promise((n,t)=>{try{let e=!0;const r="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(r);i.onsuccess=()=>{i.result.close(),e||self.indexedDB.deleteDatabase(r),n(!0)},i.onupgradeneeded=()=>{e=!1},i.onerror=()=>{var o;t(((o=i.error)===null||o===void 0?void 0:o.message)||"")}}catch(e){t(e)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pl="FirebaseError";class jt extends Error{constructor(t,e,r){super(e),this.code=t,this.customData=r,this.name=pl,Object.setPrototypeOf(this,jt.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,qe.prototype.create)}}class qe{constructor(t,e,r){this.service=t,this.serviceName=e,this.errors=r}create(t,...e){const r=e[0]||{},i=`${this.service}/${t}`,o=this.errors[t],a=o?ml(o,r):"Error",u=`${this.serviceName}: ${a} (${i}).`;return new jt(i,u,r)}}function ml(n,t){return n.replace(gl,(e,r)=>{const i=t[r];return i!=null?String(i):`<${r}?>`})}const gl=/\{\$([^}]+)}/g;function Bn(n,t){if(n===t)return!0;const e=Object.keys(n),r=Object.keys(t);for(const i of e){if(!r.includes(i))return!1;const o=n[i],a=t[i];if($s(o)&&$s(a)){if(!Bn(o,a))return!1}else if(o!==a)return!1}for(const i of r)if(!e.includes(i))return!1;return!0}function $s(n){return n!==null&&typeof n=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function zs(n){const t=[];for(const[e,r]of Object.entries(n))Array.isArray(r)?r.forEach(i=>{t.push(encodeURIComponent(e)+"="+encodeURIComponent(i))}):t.push(encodeURIComponent(e)+"="+encodeURIComponent(r));return t.length?"&"+t.join("&"):""}function _l(n,t){const e=new yl(n,t);return e.subscribe.bind(e)}class yl{constructor(t,e){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=e,this.task.then(()=>{t(this)}).catch(r=>{this.error(r)})}next(t){this.forEachObserver(e=>{e.next(t)})}error(t){this.forEachObserver(e=>{e.error(t)}),this.close(t)}complete(){this.forEachObserver(t=>{t.complete()}),this.close()}subscribe(t,e,r){let i;if(t===void 0&&e===void 0&&r===void 0)throw new Error("Missing Observer.");vl(t,["next","error","complete"])?i=t:i={next:t,error:e,complete:r},i.next===void 0&&(i.next=Gr),i.error===void 0&&(i.error=Gr),i.complete===void 0&&(i.complete=Gr);const o=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?i.error(this.finalError):i.complete()}catch{}}),this.observers.push(i),o}unsubscribeOne(t){this.observers===void 0||this.observers[t]===void 0||(delete this.observers[t],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(t){if(!this.finalized)for(let e=0;e<this.observers.length;e++)this.sendOne(e,t)}sendOne(t,e){this.task.then(()=>{if(this.observers!==void 0&&this.observers[t]!==void 0)try{e(this.observers[t])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(t){this.finalized||(this.finalized=!0,t!==void 0&&(this.finalError=t),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function vl(n,t){if(typeof n!="object"||n===null)return!1;for(const e of t)if(e in n&&typeof n[e]=="function")return!0;return!1}function Gr(){}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Pt(n){return n&&n._delegate?n._delegate:n}class ne{constructor(t,e,r){this.name=t,this.instanceFactory=e,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(t){return this.instantiationMode=t,this}setMultipleInstances(t){return this.multipleInstances=t,this}setServiceProps(t){return this.serviceProps=t,this}setInstanceCreatedCallback(t){return this.onInstanceCreated=t,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const re="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class El{constructor(t,e){this.name=t,this.container=e,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(t){const e=this.normalizeInstanceIdentifier(t);if(!this.instancesDeferred.has(e)){const r=new sl;if(this.instancesDeferred.set(e,r),this.isInitialized(e)||this.shouldAutoInitialize())try{const i=this.getOrInitializeService({instanceIdentifier:e});i&&r.resolve(i)}catch{}}return this.instancesDeferred.get(e).promise}getImmediate(t){var e;const r=this.normalizeInstanceIdentifier(t==null?void 0:t.identifier),i=(e=t==null?void 0:t.optional)!==null&&e!==void 0?e:!1;if(this.isInitialized(r)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:r})}catch(o){if(i)return null;throw o}else{if(i)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(t){if(t.name!==this.name)throw Error(`Mismatching Component ${t.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=t,!!this.shouldAutoInitialize()){if(Il(t))try{this.getOrInitializeService({instanceIdentifier:re})}catch{}for(const[e,r]of this.instancesDeferred.entries()){const i=this.normalizeInstanceIdentifier(e);try{const o=this.getOrInitializeService({instanceIdentifier:i});r.resolve(o)}catch{}}}}clearInstance(t=re){this.instancesDeferred.delete(t),this.instancesOptions.delete(t),this.instances.delete(t)}async delete(){const t=Array.from(this.instances.values());await Promise.all([...t.filter(e=>"INTERNAL"in e).map(e=>e.INTERNAL.delete()),...t.filter(e=>"_delete"in e).map(e=>e._delete())])}isComponentSet(){return this.component!=null}isInitialized(t=re){return this.instances.has(t)}getOptions(t=re){return this.instancesOptions.get(t)||{}}initialize(t={}){const{options:e={}}=t,r=this.normalizeInstanceIdentifier(t.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const i=this.getOrInitializeService({instanceIdentifier:r,options:e});for(const[o,a]of this.instancesDeferred.entries()){const u=this.normalizeInstanceIdentifier(o);r===u&&a.resolve(i)}return i}onInit(t,e){var r;const i=this.normalizeInstanceIdentifier(e),o=(r=this.onInitCallbacks.get(i))!==null&&r!==void 0?r:new Set;o.add(t),this.onInitCallbacks.set(i,o);const a=this.instances.get(i);return a&&t(a,i),()=>{o.delete(t)}}invokeOnInitCallbacks(t,e){const r=this.onInitCallbacks.get(e);if(r)for(const i of r)try{i(t,e)}catch{}}getOrInitializeService({instanceIdentifier:t,options:e={}}){let r=this.instances.get(t);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:Tl(t),options:e}),this.instances.set(t,r),this.instancesOptions.set(t,e),this.invokeOnInitCallbacks(r,t),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,t,r)}catch{}return r||null}normalizeInstanceIdentifier(t=re){return this.component?this.component.multipleInstances?t:re:t}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function Tl(n){return n===re?void 0:n}function Il(n){return n.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wl{constructor(t){this.name=t,this.providers=new Map}addComponent(t){const e=this.getProvider(t.name);if(e.isComponentSet())throw new Error(`Component ${t.name} has already been registered with ${this.name}`);e.setComponent(t)}addOrOverwriteComponent(t){this.getProvider(t.name).isComponentSet()&&this.providers.delete(t.name),this.addComponent(t)}getProvider(t){if(this.providers.has(t))return this.providers.get(t);const e=new El(t,this);return this.providers.set(t,e),e}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var B;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(B||(B={}));const Al={debug:B.DEBUG,verbose:B.VERBOSE,info:B.INFO,warn:B.WARN,error:B.ERROR,silent:B.SILENT},Rl=B.INFO,Sl={[B.DEBUG]:"log",[B.VERBOSE]:"log",[B.INFO]:"info",[B.WARN]:"warn",[B.ERROR]:"error"},bl=(n,t,...e)=>{if(t<n.logLevel)return;const r=new Date().toISOString(),i=Sl[t];if(i)console[i](`[${r}]  ${n.name}:`,...e);else throw new Error(`Attempted to log a message with an invalid logType (value: ${t})`)};class Qr{constructor(t){this.name=t,this._logLevel=Rl,this._logHandler=bl,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(t){if(!(t in B))throw new TypeError(`Invalid value "${t}" assigned to \`logLevel\``);this._logLevel=t}setLogLevel(t){this._logLevel=typeof t=="string"?Al[t]:t}get logHandler(){return this._logHandler}set logHandler(t){if(typeof t!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=t}get userLogHandler(){return this._userLogHandler}set userLogHandler(t){this._userLogHandler=t}debug(...t){this._userLogHandler&&this._userLogHandler(this,B.DEBUG,...t),this._logHandler(this,B.DEBUG,...t)}log(...t){this._userLogHandler&&this._userLogHandler(this,B.VERBOSE,...t),this._logHandler(this,B.VERBOSE,...t)}info(...t){this._userLogHandler&&this._userLogHandler(this,B.INFO,...t),this._logHandler(this,B.INFO,...t)}warn(...t){this._userLogHandler&&this._userLogHandler(this,B.WARN,...t),this._logHandler(this,B.WARN,...t)}error(...t){this._userLogHandler&&this._userLogHandler(this,B.ERROR,...t),this._logHandler(this,B.ERROR,...t)}}const Pl=(n,t)=>t.some(e=>n instanceof e);let Hs,Ks;function Cl(){return Hs||(Hs=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Vl(){return Ks||(Ks=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Ws=new WeakMap,Xr=new WeakMap,Gs=new WeakMap,Yr=new WeakMap,Jr=new WeakMap;function kl(n){const t=new Promise((e,r)=>{const i=()=>{n.removeEventListener("success",o),n.removeEventListener("error",a)},o=()=>{e(qt(n.result)),i()},a=()=>{r(n.error),i()};n.addEventListener("success",o),n.addEventListener("error",a)});return t.then(e=>{e instanceof IDBCursor&&Ws.set(e,n)}).catch(()=>{}),Jr.set(t,n),t}function Dl(n){if(Xr.has(n))return;const t=new Promise((e,r)=>{const i=()=>{n.removeEventListener("complete",o),n.removeEventListener("error",a),n.removeEventListener("abort",a)},o=()=>{e(),i()},a=()=>{r(n.error||new DOMException("AbortError","AbortError")),i()};n.addEventListener("complete",o),n.addEventListener("error",a),n.addEventListener("abort",a)});Xr.set(n,t)}let Zr={get(n,t,e){if(n instanceof IDBTransaction){if(t==="done")return Xr.get(n);if(t==="objectStoreNames")return n.objectStoreNames||Gs.get(n);if(t==="store")return e.objectStoreNames[1]?void 0:e.objectStore(e.objectStoreNames[0])}return qt(n[t])},set(n,t,e){return n[t]=e,!0},has(n,t){return n instanceof IDBTransaction&&(t==="done"||t==="store")?!0:t in n}};function Nl(n){Zr=n(Zr)}function Ol(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(t,...e){const r=n.call(ti(this),t,...e);return Gs.set(r,t.sort?t.sort():[t]),qt(r)}:Vl().includes(n)?function(...t){return n.apply(ti(this),t),qt(Ws.get(this))}:function(...t){return qt(n.apply(ti(this),t))}}function Ml(n){return typeof n=="function"?Ol(n):(n instanceof IDBTransaction&&Dl(n),Pl(n,Cl())?new Proxy(n,Zr):n)}function qt(n){if(n instanceof IDBRequest)return kl(n);if(Yr.has(n))return Yr.get(n);const t=Ml(n);return t!==n&&(Yr.set(n,t),Jr.set(t,n)),t}const ti=n=>Jr.get(n);function xl(n,t,{blocked:e,upgrade:r,blocking:i,terminated:o}={}){const a=indexedDB.open(n,t),u=qt(a);return r&&a.addEventListener("upgradeneeded",h=>{r(qt(a.result),h.oldVersion,h.newVersion,qt(a.transaction),h)}),e&&a.addEventListener("blocked",h=>e(h.oldVersion,h.newVersion,h)),u.then(h=>{o&&h.addEventListener("close",()=>o()),i&&h.addEventListener("versionchange",f=>i(f.oldVersion,f.newVersion,f))}).catch(()=>{}),u}const Ll=["get","getKey","getAll","getAllKeys","count"],Fl=["put","add","delete","clear"],ei=new Map;function Qs(n,t){if(!(n instanceof IDBDatabase&&!(t in n)&&typeof t=="string"))return;if(ei.get(t))return ei.get(t);const e=t.replace(/FromIndex$/,""),r=t!==e,i=Fl.includes(e);if(!(e in(r?IDBIndex:IDBObjectStore).prototype)||!(i||Ll.includes(e)))return;const o=async function(a,...u){const h=this.transaction(a,i?"readwrite":"readonly");let f=h.store;return r&&(f=f.index(u.shift())),(await Promise.all([f[e](...u),i&&h.done]))[0]};return ei.set(t,o),o}Nl(n=>({...n,get:(t,e,r)=>Qs(t,e)||n.get(t,e,r),has:(t,e)=>!!Qs(t,e)||n.has(t,e)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ul{constructor(t){this.container=t}getPlatformInfoString(){return this.container.getProviders().map(e=>{if(Bl(e)){const r=e.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(e=>e).join(" ")}}function Bl(n){const t=n.getComponent();return(t==null?void 0:t.type)==="VERSION"}const ni="@firebase/app",Xs="0.10.8";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ie=new Qr("@firebase/app"),jl="@firebase/app-compat",ql="@firebase/analytics-compat",$l="@firebase/analytics",zl="@firebase/app-check-compat",Hl="@firebase/app-check",Kl="@firebase/auth",Wl="@firebase/auth-compat",Gl="@firebase/database",Ql="@firebase/database-compat",Xl="@firebase/functions",Yl="@firebase/functions-compat",Jl="@firebase/installations",Zl="@firebase/installations-compat",th="@firebase/messaging",eh="@firebase/messaging-compat",nh="@firebase/performance",rh="@firebase/performance-compat",ih="@firebase/remote-config",sh="@firebase/remote-config-compat",oh="@firebase/storage",ah="@firebase/storage-compat",ch="@firebase/firestore",uh="@firebase/vertexai-preview",lh="@firebase/firestore-compat",hh="firebase",dh="10.12.5";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ri="[DEFAULT]",fh={[ni]:"fire-core",[jl]:"fire-core-compat",[$l]:"fire-analytics",[ql]:"fire-analytics-compat",[Hl]:"fire-app-check",[zl]:"fire-app-check-compat",[Kl]:"fire-auth",[Wl]:"fire-auth-compat",[Gl]:"fire-rtdb",[Ql]:"fire-rtdb-compat",[Xl]:"fire-fn",[Yl]:"fire-fn-compat",[Jl]:"fire-iid",[Zl]:"fire-iid-compat",[th]:"fire-fcm",[eh]:"fire-fcm-compat",[nh]:"fire-perf",[rh]:"fire-perf-compat",[ih]:"fire-rc",[sh]:"fire-rc-compat",[oh]:"fire-gcs",[ah]:"fire-gcs-compat",[ch]:"fire-fst",[lh]:"fire-fst-compat",[uh]:"fire-vertex","fire-js":"fire-js",[hh]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jn=new Map,ph=new Map,ii=new Map;function Ys(n,t){try{n.container.addComponent(t)}catch(e){ie.debug(`Component ${t.name} failed to register with FirebaseApp ${n.name}`,e)}}function ye(n){const t=n.name;if(ii.has(t))return ie.debug(`There were multiple attempts to register component ${t}.`),!1;ii.set(t,n);for(const e of jn.values())Ys(e,n);for(const e of ph.values())Ys(e,n);return!0}function si(n,t){const e=n.container.getProvider("heartbeat").getImmediate({optional:!0});return e&&e.triggerHeartbeat(),n.container.getProvider(t)}function $e(n){return n.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mh={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},$t=new qe("app","Firebase",mh);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gh{constructor(t,e,r){this._isDeleted=!1,this._options=Object.assign({},t),this._config=Object.assign({},e),this._name=e.name,this._automaticDataCollectionEnabled=e.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new ne("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(t){this.checkDestroyed(),this._automaticDataCollectionEnabled=t}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(t){this._isDeleted=t}checkDestroyed(){if(this.isDeleted)throw $t.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qn=dh;function Js(n,t={}){let e=n;typeof t!="object"&&(t={name:t});const r=Object.assign({name:ri,automaticDataCollectionEnabled:!1},t),i=r.name;if(typeof i!="string"||!i)throw $t.create("bad-app-name",{appName:String(i)});if(e||(e=qs()),!e)throw $t.create("no-options");const o=jn.get(i);if(o){if(Bn(e,o.options)&&Bn(r,o.config))return o;throw $t.create("duplicate-app",{appName:i})}const a=new wl(i);for(const h of ii.values())a.addComponent(h);const u=new gh(e,r,a);return jn.set(i,u),u}function Zs(n=ri){const t=jn.get(n);if(!t&&n===ri&&qs())return Js();if(!t)throw $t.create("no-app",{appName:n});return t}function zt(n,t,e){var r;let i=(r=fh[n])!==null&&r!==void 0?r:n;e&&(i+=`-${e}`);const o=i.match(/\s|\//),a=t.match(/\s|\//);if(o||a){const u=[`Unable to register library "${i}" with version "${t}":`];o&&u.push(`library name "${i}" contains illegal characters (whitespace or "/")`),o&&a&&u.push("and"),a&&u.push(`version name "${t}" contains illegal characters (whitespace or "/")`),ie.warn(u.join(" "));return}ye(new ne(`${i}-version`,()=>({library:i,version:t}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _h="firebase-heartbeat-database",yh=1,ze="firebase-heartbeat-store";let oi=null;function to(){return oi||(oi=xl(_h,yh,{upgrade:(n,t)=>{switch(t){case 0:try{n.createObjectStore(ze)}catch(e){console.warn(e)}}}}).catch(n=>{throw $t.create("idb-open",{originalErrorMessage:n.message})})),oi}async function vh(n){try{const e=(await to()).transaction(ze),r=await e.objectStore(ze).get(no(n));return await e.done,r}catch(t){if(t instanceof jt)ie.warn(t.message);else{const e=$t.create("idb-get",{originalErrorMessage:t==null?void 0:t.message});ie.warn(e.message)}}}async function eo(n,t){try{const r=(await to()).transaction(ze,"readwrite");await r.objectStore(ze).put(t,no(n)),await r.done}catch(e){if(e instanceof jt)ie.warn(e.message);else{const r=$t.create("idb-set",{originalErrorMessage:e==null?void 0:e.message});ie.warn(r.message)}}}function no(n){return`${n.name}!${n.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Eh=1024,Th=30*24*60*60*1e3;class Ih{constructor(t){this.container=t,this._heartbeatsCache=null;const e=this.container.getProvider("app").getImmediate();this._storage=new Ah(e),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var t,e;const i=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),o=ro();if(!(((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null))&&!(this._heartbeatsCache.lastSentHeartbeatDate===o||this._heartbeatsCache.heartbeats.some(a=>a.date===o)))return this._heartbeatsCache.heartbeats.push({date:o,agent:i}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(a=>{const u=new Date(a.date).valueOf();return Date.now()-u<=Th}),this._storage.overwrite(this._heartbeatsCache)}async getHeartbeatsHeader(){var t;if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const e=ro(),{heartbeatsToSend:r,unsentEntries:i}=wh(this._heartbeatsCache.heartbeats),o=Un(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=e,i.length>0?(this._heartbeatsCache.heartbeats=i,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),o}}function ro(){return new Date().toISOString().substring(0,10)}function wh(n,t=Eh){const e=[];let r=n.slice();for(const i of n){const o=e.find(a=>a.agent===i.agent);if(o){if(o.dates.push(i.date),io(e)>t){o.dates.pop();break}}else if(e.push({agent:i.agent,dates:[i.date]}),io(e)>t){e.pop();break}r=r.slice(1)}return{heartbeatsToSend:e,unsentEntries:r}}class Ah{constructor(t){this.app=t,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return dl()?fl().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const e=await vh(this.app);return e!=null&&e.heartbeats?e:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(t){var e;if(await this._canUseIndexedDBPromise){const i=await this.read();return eo(this.app,{lastSentHeartbeatDate:(e=t.lastSentHeartbeatDate)!==null&&e!==void 0?e:i.lastSentHeartbeatDate,heartbeats:t.heartbeats})}else return}async add(t){var e;if(await this._canUseIndexedDBPromise){const i=await this.read();return eo(this.app,{lastSentHeartbeatDate:(e=t.lastSentHeartbeatDate)!==null&&e!==void 0?e:i.lastSentHeartbeatDate,heartbeats:[...i.heartbeats,...t.heartbeats]})}else return}}function io(n){return Un(JSON.stringify({version:2,heartbeats:n})).length}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Rh(n){ye(new ne("platform-logger",t=>new Ul(t),"PRIVATE")),ye(new ne("heartbeat",t=>new Ih(t),"PRIVATE")),zt(ni,Xs,n),zt(ni,Xs,"esm2017"),zt("fire-js","")}Rh("");var Sh="firebase",bh="10.12.5";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */zt(Sh,bh,"app");function so(n,t){var e={};for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&t.indexOf(r)<0&&(e[r]=n[r]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,r=Object.getOwnPropertySymbols(n);i<r.length;i++)t.indexOf(r[i])<0&&Object.prototype.propertyIsEnumerable.call(n,r[i])&&(e[r[i]]=n[r[i]]);return e}typeof SuppressedError=="function"&&SuppressedError;function oo(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const Ph=oo,ao=new qe("auth","Firebase",oo());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $n=new Qr("@firebase/auth");function Ch(n,...t){$n.logLevel<=B.WARN&&$n.warn(`Auth (${qn}): ${n}`,...t)}function zn(n,...t){$n.logLevel<=B.ERROR&&$n.error(`Auth (${qn}): ${n}`,...t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ai(n,...t){throw ci(n,...t)}function co(n,...t){return ci(n,...t)}function uo(n,t,e){const r=Object.assign(Object.assign({},Ph()),{[t]:e});return new qe("auth","Firebase",r).create(t,{appName:n.name})}function Hn(n){return uo(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function ci(n,...t){if(typeof n!="string"){const e=t[0],r=[...t.slice(1)];return r[0]&&(r[0].appName=n.name),n._errorFactory.create(e,...r)}return ao.create(n,...t)}function $(n,t,...e){if(!n)throw ci(t,...e)}function He(n){const t="INTERNAL ASSERTION FAILED: "+n;throw zn(t),new Error(t)}function Kn(n,t){n||He(t)}function Vh(){return lo()==="http:"||lo()==="https:"}function lo(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function kh(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(Vh()||ul()||"connection"in navigator)?navigator.onLine:!0}function Dh(){if(typeof navigator>"u")return null;const n=navigator;return n.languages&&n.languages[0]||n.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nh{constructor(t,e){this.shortDelay=t,this.longDelay=e,Kn(e>t,"Short delay should be less than long delay!"),this.isMobile=al()||ll()}get(){return kh()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Oh(n,t){Kn(n.emulator,"Emulator should always be set here");const{url:e}=n.emulator;return t?`${e}${t.startsWith("/")?t.slice(1):t}`:e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ho{static initialize(t,e,r){this.fetchImpl=t,e&&(this.headersImpl=e),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;He("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;He("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;He("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Mh={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xh=new Nh(3e4,6e4);function fo(n,t){return n.tenantId&&!t.tenantId?Object.assign(Object.assign({},t),{tenantId:n.tenantId}):t}async function Wn(n,t,e,r,i={}){return po(n,i,async()=>{let o={},a={};r&&(t==="GET"?a=r:o={body:JSON.stringify(r)});const u=zs(Object.assign({key:n.config.apiKey},a)).slice(1),h=await n._getAdditionalHeaders();return h["Content-Type"]="application/json",n.languageCode&&(h["X-Firebase-Locale"]=n.languageCode),ho.fetch()(mo(n,n.config.apiHost,e,u),Object.assign({method:t,headers:h,referrerPolicy:"no-referrer"},o))})}async function po(n,t,e){n._canInitEmulator=!1;const r=Object.assign(Object.assign({},Mh),t);try{const i=new Lh(n),o=await Promise.race([e(),i.promise]);i.clearNetworkTimeout();const a=await o.json();if("needConfirmation"in a)throw Gn(n,"account-exists-with-different-credential",a);if(o.ok&&!("errorMessage"in a))return a;{const u=o.ok?a.errorMessage:a.error.message,[h,f]=u.split(" : ");if(h==="FEDERATED_USER_ID_ALREADY_LINKED")throw Gn(n,"credential-already-in-use",a);if(h==="EMAIL_EXISTS")throw Gn(n,"email-already-in-use",a);if(h==="USER_DISABLED")throw Gn(n,"user-disabled",a);const m=r[h]||h.toLowerCase().replace(/[_\s]+/g,"-");if(f)throw uo(n,m,f);ai(n,m)}}catch(i){if(i instanceof jt)throw i;ai(n,"network-request-failed",{message:String(i)})}}function mo(n,t,e,r){const i=`${t}${e}?${r}`;return n.config.emulator?Oh(n.config,i):`${n.config.apiScheme}://${i}`}class Lh{constructor(t){this.auth=t,this.timer=null,this.promise=new Promise((e,r)=>{this.timer=setTimeout(()=>r(co(this.auth,"network-request-failed")),xh.get())})}clearNetworkTimeout(){clearTimeout(this.timer)}}function Gn(n,t,e){const r={appName:n.name};e.email&&(r.email=e.email),e.phoneNumber&&(r.phoneNumber=e.phoneNumber);const i=co(n,t,r);return i.customData._tokenResponse=e,i}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Fh(n,t){return Wn(n,"POST","/v1/accounts:delete",t)}async function go(n,t){return Wn(n,"POST","/v1/accounts:lookup",t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ke(n){if(n)try{const t=new Date(Number(n));if(!isNaN(t.getTime()))return t.toUTCString()}catch{}}async function Uh(n,t=!1){const e=Pt(n),r=await e.getIdToken(t),i=_o(r);$(i&&i.exp&&i.auth_time&&i.iat,e.auth,"internal-error");const o=typeof i.firebase=="object"?i.firebase:void 0,a=o==null?void 0:o.sign_in_provider;return{claims:i,token:r,authTime:Ke(ui(i.auth_time)),issuedAtTime:Ke(ui(i.iat)),expirationTime:Ke(ui(i.exp)),signInProvider:a||null,signInSecondFactor:(o==null?void 0:o.sign_in_second_factor)||null}}function ui(n){return Number(n)*1e3}function _o(n){const[t,e,r]=n.split(".");if(t===void 0||e===void 0||r===void 0)return zn("JWT malformed, contained fewer than 3 sections"),null;try{const i=Bs(e);return i?JSON.parse(i):(zn("Failed to decode base64 JWT payload"),null)}catch(i){return zn("Caught error parsing JWT payload as JSON",i==null?void 0:i.toString()),null}}function yo(n){const t=_o(n);return $(t,"internal-error"),$(typeof t.exp<"u","internal-error"),$(typeof t.iat<"u","internal-error"),Number(t.exp)-Number(t.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function li(n,t,e=!1){if(e)return t;try{return await t}catch(r){throw r instanceof jt&&Bh(r)&&n.auth.currentUser===n&&await n.auth.signOut(),r}}function Bh({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jh{constructor(t){this.user=t,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(t){var e;if(t){const r=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),r}else{this.errorBackoff=3e4;const i=((e=this.user.stsTokenManager.expirationTime)!==null&&e!==void 0?e:0)-Date.now()-3e5;return Math.max(0,i)}}schedule(t=!1){if(!this.isRunning)return;const e=this.getInterval(t);this.timerId=setTimeout(async()=>{await this.iteration()},e)}async iteration(){try{await this.user.getIdToken(!0)}catch(t){(t==null?void 0:t.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hi{constructor(t,e){this.createdAt=t,this.lastLoginAt=e,this._initializeTime()}_initializeTime(){this.lastSignInTime=Ke(this.lastLoginAt),this.creationTime=Ke(this.createdAt)}_copy(t){this.createdAt=t.createdAt,this.lastLoginAt=t.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Qn(n){var t;const e=n.auth,r=await n.getIdToken(),i=await li(n,go(e,{idToken:r}));$(i==null?void 0:i.users.length,e,"internal-error");const o=i.users[0];n._notifyReloadListener(o);const a=!((t=o.providerUserInfo)===null||t===void 0)&&t.length?vo(o.providerUserInfo):[],u=$h(n.providerData,a),h=n.isAnonymous,f=!(n.email&&o.passwordHash)&&!(u!=null&&u.length),m=h?f:!1,I={uid:o.localId,displayName:o.displayName||null,photoURL:o.photoUrl||null,email:o.email||null,emailVerified:o.emailVerified||!1,phoneNumber:o.phoneNumber||null,tenantId:o.tenantId||null,providerData:u,metadata:new hi(o.createdAt,o.lastLoginAt),isAnonymous:m};Object.assign(n,I)}async function qh(n){const t=Pt(n);await Qn(t),await t.auth._persistUserIfCurrent(t),t.auth._notifyListenersIfCurrent(t)}function $h(n,t){return[...n.filter(r=>!t.some(i=>i.providerId===r.providerId)),...t]}function vo(n){return n.map(t=>{var{providerId:e}=t,r=so(t,["providerId"]);return{providerId:e,uid:r.rawId||"",displayName:r.displayName||null,email:r.email||null,phoneNumber:r.phoneNumber||null,photoURL:r.photoUrl||null}})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function zh(n,t){const e=await po(n,{},async()=>{const r=zs({grant_type:"refresh_token",refresh_token:t}).slice(1),{tokenApiHost:i,apiKey:o}=n.config,a=mo(n,i,"/v1/token",`key=${o}`),u=await n._getAdditionalHeaders();return u["Content-Type"]="application/x-www-form-urlencoded",ho.fetch()(a,{method:"POST",headers:u,body:r})});return{accessToken:e.access_token,expiresIn:e.expires_in,refreshToken:e.refresh_token}}async function Hh(n,t){return Wn(n,"POST","/v2/accounts:revokeToken",fo(n,t))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ve{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(t){$(t.idToken,"internal-error"),$(typeof t.idToken<"u","internal-error"),$(typeof t.refreshToken<"u","internal-error");const e="expiresIn"in t&&typeof t.expiresIn<"u"?Number(t.expiresIn):yo(t.idToken);this.updateTokensAndExpiration(t.idToken,t.refreshToken,e)}updateFromIdToken(t){$(t.length!==0,"internal-error");const e=yo(t);this.updateTokensAndExpiration(t,null,e)}async getToken(t,e=!1){return!e&&this.accessToken&&!this.isExpired?this.accessToken:($(this.refreshToken,t,"user-token-expired"),this.refreshToken?(await this.refresh(t,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(t,e){const{accessToken:r,refreshToken:i,expiresIn:o}=await zh(t,e);this.updateTokensAndExpiration(r,i,Number(o))}updateTokensAndExpiration(t,e,r){this.refreshToken=e||null,this.accessToken=t||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(t,e){const{refreshToken:r,accessToken:i,expirationTime:o}=e,a=new ve;return r&&($(typeof r=="string","internal-error",{appName:t}),a.refreshToken=r),i&&($(typeof i=="string","internal-error",{appName:t}),a.accessToken=i),o&&($(typeof o=="number","internal-error",{appName:t}),a.expirationTime=o),a}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(t){this.accessToken=t.accessToken,this.refreshToken=t.refreshToken,this.expirationTime=t.expirationTime}_clone(){return Object.assign(new ve,this.toJSON())}_performRefresh(){return He("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ht(n,t){$(typeof n=="string"||typeof n>"u","internal-error",{appName:t})}class Kt{constructor(t){var{uid:e,auth:r,stsTokenManager:i}=t,o=so(t,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new jh(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=r,this.stsTokenManager=i,this.accessToken=i.accessToken,this.displayName=o.displayName||null,this.email=o.email||null,this.emailVerified=o.emailVerified||!1,this.phoneNumber=o.phoneNumber||null,this.photoURL=o.photoURL||null,this.isAnonymous=o.isAnonymous||!1,this.tenantId=o.tenantId||null,this.providerData=o.providerData?[...o.providerData]:[],this.metadata=new hi(o.createdAt||void 0,o.lastLoginAt||void 0)}async getIdToken(t){const e=await li(this,this.stsTokenManager.getToken(this.auth,t));return $(e,this.auth,"internal-error"),this.accessToken!==e&&(this.accessToken=e,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),e}getIdTokenResult(t){return Uh(this,t)}reload(){return qh(this)}_assign(t){this!==t&&($(this.uid===t.uid,this.auth,"internal-error"),this.displayName=t.displayName,this.photoURL=t.photoURL,this.email=t.email,this.emailVerified=t.emailVerified,this.phoneNumber=t.phoneNumber,this.isAnonymous=t.isAnonymous,this.tenantId=t.tenantId,this.providerData=t.providerData.map(e=>Object.assign({},e)),this.metadata._copy(t.metadata),this.stsTokenManager._assign(t.stsTokenManager))}_clone(t){const e=new Kt(Object.assign(Object.assign({},this),{auth:t,stsTokenManager:this.stsTokenManager._clone()}));return e.metadata._copy(this.metadata),e}_onReload(t){$(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=t,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(t){this.reloadListener?this.reloadListener(t):this.reloadUserInfo=t}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(t,e=!1){let r=!1;t.idToken&&t.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(t),r=!0),e&&await Qn(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if($e(this.auth.app))return Promise.reject(Hn(this.auth));const t=await this.getIdToken();return await li(this,Fh(this.auth,{idToken:t})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(t=>Object.assign({},t)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(t,e){var r,i,o,a,u,h,f,m;const I=(r=e.displayName)!==null&&r!==void 0?r:void 0,R=(i=e.email)!==null&&i!==void 0?i:void 0,P=(o=e.phoneNumber)!==null&&o!==void 0?o:void 0,k=(a=e.photoURL)!==null&&a!==void 0?a:void 0,N=(u=e.tenantId)!==null&&u!==void 0?u:void 0,V=(h=e._redirectEventId)!==null&&h!==void 0?h:void 0,q=(f=e.createdAt)!==null&&f!==void 0?f:void 0,K=(m=e.lastLoginAt)!==null&&m!==void 0?m:void 0,{uid:W,emailVerified:tt,isAnonymous:St,providerData:et,stsTokenManager:v}=e;$(W&&v,t,"internal-error");const p=ve.fromJSON(this.name,v);$(typeof W=="string",t,"internal-error"),Ht(I,t.name),Ht(R,t.name),$(typeof tt=="boolean",t,"internal-error"),$(typeof St=="boolean",t,"internal-error"),Ht(P,t.name),Ht(k,t.name),Ht(N,t.name),Ht(V,t.name),Ht(q,t.name),Ht(K,t.name);const _=new Kt({uid:W,auth:t,email:R,emailVerified:tt,displayName:I,isAnonymous:St,photoURL:k,phoneNumber:P,tenantId:N,stsTokenManager:p,createdAt:q,lastLoginAt:K});return et&&Array.isArray(et)&&(_.providerData=et.map(y=>Object.assign({},y))),V&&(_._redirectEventId=V),_}static async _fromIdTokenResponse(t,e,r=!1){const i=new ve;i.updateFromServerResponse(e);const o=new Kt({uid:e.localId,auth:t,stsTokenManager:i,isAnonymous:r});return await Qn(o),o}static async _fromGetAccountInfoResponse(t,e,r){const i=e.users[0];$(i.localId!==void 0,"internal-error");const o=i.providerUserInfo!==void 0?vo(i.providerUserInfo):[],a=!(i.email&&i.passwordHash)&&!(o!=null&&o.length),u=new ve;u.updateFromIdToken(r);const h=new Kt({uid:i.localId,auth:t,stsTokenManager:u,isAnonymous:a}),f={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:o,metadata:new hi(i.createdAt,i.lastLoginAt),isAnonymous:!(i.email&&i.passwordHash)&&!(o!=null&&o.length)};return Object.assign(h,f),h}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Eo=new Map;function se(n){Kn(n instanceof Function,"Expected a class definition");let t=Eo.get(n);return t?(Kn(t instanceof n,"Instance stored in cache mismatched with class"),t):(t=new n,Eo.set(n,t),t)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class To{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(t,e){this.storage[t]=e}async _get(t){const e=this.storage[t];return e===void 0?null:e}async _remove(t){delete this.storage[t]}_addListener(t,e){}_removeListener(t,e){}}To.type="NONE";const Io=To;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function di(n,t,e){return`firebase:${n}:${t}:${e}`}class Ee{constructor(t,e,r){this.persistence=t,this.auth=e,this.userKey=r;const{config:i,name:o}=this.auth;this.fullUserKey=di(this.userKey,i.apiKey,o),this.fullPersistenceKey=di("persistence",i.apiKey,o),this.boundEventHandler=e._onStorageEvent.bind(e),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(t){return this.persistence._set(this.fullUserKey,t.toJSON())}async getCurrentUser(){const t=await this.persistence._get(this.fullUserKey);return t?Kt._fromJSON(this.auth,t):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(t){if(this.persistence===t)return;const e=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=t,e)return this.setCurrentUser(e)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(t,e,r="authUser"){if(!e.length)return new Ee(se(Io),t,r);const i=(await Promise.all(e.map(async f=>{if(await f._isAvailable())return f}))).filter(f=>f);let o=i[0]||se(Io);const a=di(r,t.config.apiKey,t.name);let u=null;for(const f of e)try{const m=await f._get(a);if(m){const I=Kt._fromJSON(t,m);f!==o&&(u=I),o=f;break}}catch{}const h=i.filter(f=>f._shouldAllowMigration);return!o._shouldAllowMigration||!h.length?new Ee(o,t,r):(o=h[0],u&&await o._set(a,u.toJSON()),await Promise.all(e.map(async f=>{if(f!==o)try{await f._remove(a)}catch{}})),new Ee(o,t,r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function wo(n){const t=n.toLowerCase();if(t.includes("opera/")||t.includes("opr/")||t.includes("opios/"))return"Opera";if(Qh(t))return"IEMobile";if(t.includes("msie")||t.includes("trident/"))return"IE";if(t.includes("edge/"))return"Edge";if(Kh(t))return"Firefox";if(t.includes("silk/"))return"Silk";if(Yh(t))return"Blackberry";if(Jh(t))return"Webos";if(Wh(t))return"Safari";if((t.includes("chrome/")||Gh(t))&&!t.includes("edge/"))return"Chrome";if(Xh(t))return"Android";{const e=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=n.match(e);if((r==null?void 0:r.length)===2)return r[1]}return"Other"}function Kh(n=bt()){return/firefox\//i.test(n)}function Wh(n=bt()){const t=n.toLowerCase();return t.includes("safari/")&&!t.includes("chrome/")&&!t.includes("crios/")&&!t.includes("android")}function Gh(n=bt()){return/crios\//i.test(n)}function Qh(n=bt()){return/iemobile/i.test(n)}function Xh(n=bt()){return/android/i.test(n)}function Yh(n=bt()){return/blackberry/i.test(n)}function Jh(n=bt()){return/webos/i.test(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ao(n,t=[]){let e;switch(n){case"Browser":e=wo(bt());break;case"Worker":e=`${wo(bt())}-${n}`;break;default:e=n}const r=t.length?t.join(","):"FirebaseCore-web";return`${e}/JsCore/${qn}/${r}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zh{constructor(t){this.auth=t,this.queue=[]}pushCallback(t,e){const r=o=>new Promise((a,u)=>{try{const h=t(o);a(h)}catch(h){u(h)}});r.onAbort=e,this.queue.push(r);const i=this.queue.length-1;return()=>{this.queue[i]=()=>Promise.resolve()}}async runMiddleware(t){if(this.auth.currentUser===t)return;const e=[];try{for(const r of this.queue)await r(t),r.onAbort&&e.push(r.onAbort)}catch(r){e.reverse();for(const i of e)try{i()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r==null?void 0:r.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function td(n,t={}){return Wn(n,"GET","/v2/passwordPolicy",fo(n,t))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ed=6;class nd{constructor(t){var e,r,i,o;const a=t.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=(e=a.minPasswordLength)!==null&&e!==void 0?e:ed,a.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=a.maxPasswordLength),a.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=a.containsLowercaseCharacter),a.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=a.containsUppercaseCharacter),a.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=a.containsNumericCharacter),a.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=a.containsNonAlphanumericCharacter),this.enforcementState=t.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=(i=(r=t.allowedNonAlphanumericCharacters)===null||r===void 0?void 0:r.join(""))!==null&&i!==void 0?i:"",this.forceUpgradeOnSignin=(o=t.forceUpgradeOnSignin)!==null&&o!==void 0?o:!1,this.schemaVersion=t.schemaVersion}validatePassword(t){var e,r,i,o,a,u;const h={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(t,h),this.validatePasswordCharacterOptions(t,h),h.isValid&&(h.isValid=(e=h.meetsMinPasswordLength)!==null&&e!==void 0?e:!0),h.isValid&&(h.isValid=(r=h.meetsMaxPasswordLength)!==null&&r!==void 0?r:!0),h.isValid&&(h.isValid=(i=h.containsLowercaseLetter)!==null&&i!==void 0?i:!0),h.isValid&&(h.isValid=(o=h.containsUppercaseLetter)!==null&&o!==void 0?o:!0),h.isValid&&(h.isValid=(a=h.containsNumericCharacter)!==null&&a!==void 0?a:!0),h.isValid&&(h.isValid=(u=h.containsNonAlphanumericCharacter)!==null&&u!==void 0?u:!0),h}validatePasswordLengthOptions(t,e){const r=this.customStrengthOptions.minPasswordLength,i=this.customStrengthOptions.maxPasswordLength;r&&(e.meetsMinPasswordLength=t.length>=r),i&&(e.meetsMaxPasswordLength=t.length<=i)}validatePasswordCharacterOptions(t,e){this.updatePasswordCharacterOptionsStatuses(e,!1,!1,!1,!1);let r;for(let i=0;i<t.length;i++)r=t.charAt(i),this.updatePasswordCharacterOptionsStatuses(e,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(t,e,r,i,o){this.customStrengthOptions.containsLowercaseLetter&&(t.containsLowercaseLetter||(t.containsLowercaseLetter=e)),this.customStrengthOptions.containsUppercaseLetter&&(t.containsUppercaseLetter||(t.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(t.containsNumericCharacter||(t.containsNumericCharacter=i)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(t.containsNonAlphanumericCharacter||(t.containsNonAlphanumericCharacter=o))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rd{constructor(t,e,r,i){this.app=t,this.heartbeatServiceProvider=e,this.appCheckServiceProvider=r,this.config=i,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new So(this),this.idTokenSubscription=new So(this),this.beforeStateQueue=new Zh(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=ao,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=t.name,this.clientVersion=i.sdkClientVersion}_initializeWithPersistence(t,e){return e&&(this._popupRedirectResolver=se(e)),this._initializationPromise=this.queue(async()=>{var r,i;if(!this._deleted&&(this.persistenceManager=await Ee.create(this,t),!this._deleted)){if(!((r=this._popupRedirectResolver)===null||r===void 0)&&r._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(e),this.lastNotifiedUid=((i=this.currentUser)===null||i===void 0?void 0:i.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const t=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!t)){if(this.currentUser&&t&&this.currentUser.uid===t.uid){this._currentUser._assign(t),await this.currentUser.getIdToken();return}await this._updateCurrentUser(t,!0)}}async initializeCurrentUserFromIdToken(t){try{const e=await go(this,{idToken:t}),r=await Kt._fromGetAccountInfoResponse(this,e,t);await this.directlySetCurrentUser(r)}catch(e){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",e),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(t){var e;if($e(this.app)){const a=this.app.settings.authIdToken;return a?new Promise(u=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(a).then(u,u))}):this.directlySetCurrentUser(null)}const r=await this.assertedPersistence.getCurrentUser();let i=r,o=!1;if(t&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const a=(e=this.redirectUser)===null||e===void 0?void 0:e._redirectEventId,u=i==null?void 0:i._redirectEventId,h=await this.tryRedirectSignIn(t);(!a||a===u)&&(h!=null&&h.user)&&(i=h.user,o=!0)}if(!i)return this.directlySetCurrentUser(null);if(!i._redirectEventId){if(o)try{await this.beforeStateQueue.runMiddleware(i)}catch(a){i=r,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(a))}return i?this.reloadAndSetCurrentUserOrClear(i):this.directlySetCurrentUser(null)}return $(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===i._redirectEventId?this.directlySetCurrentUser(i):this.reloadAndSetCurrentUserOrClear(i)}async tryRedirectSignIn(t){let e=null;try{e=await this._popupRedirectResolver._completeRedirectFn(this,t,!0)}catch{await this._setRedirectUser(null)}return e}async reloadAndSetCurrentUserOrClear(t){try{await Qn(t)}catch(e){if((e==null?void 0:e.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(t)}useDeviceLanguage(){this.languageCode=Dh()}async _delete(){this._deleted=!0}async updateCurrentUser(t){if($e(this.app))return Promise.reject(Hn(this));const e=t?Pt(t):null;return e&&$(e.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(e&&e._clone(this))}async _updateCurrentUser(t,e=!1){if(!this._deleted)return t&&$(this.tenantId===t.tenantId,this,"tenant-id-mismatch"),e||await this.beforeStateQueue.runMiddleware(t),this.queue(async()=>{await this.directlySetCurrentUser(t),this.notifyAuthListeners()})}async signOut(){return $e(this.app)?Promise.reject(Hn(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(t){return $e(this.app)?Promise.reject(Hn(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(se(t))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(t){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const e=this._getPasswordPolicyInternal();return e.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):e.validatePassword(t)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const t=await td(this),e=new nd(t);this.tenantId===null?this._projectPasswordPolicy=e:this._tenantPasswordPolicies[this.tenantId]=e}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(t){this._errorFactory=new qe("auth","Firebase",t())}onAuthStateChanged(t,e,r){return this.registerStateListener(this.authStateSubscription,t,e,r)}beforeAuthStateChanged(t,e){return this.beforeStateQueue.pushCallback(t,e)}onIdTokenChanged(t,e,r){return this.registerStateListener(this.idTokenSubscription,t,e,r)}authStateReady(){return new Promise((t,e)=>{if(this.currentUser)t();else{const r=this.onAuthStateChanged(()=>{r(),t()},e)}})}async revokeAccessToken(t){if(this.currentUser){const e=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:t,idToken:e};this.tenantId!=null&&(r.tenantId=this.tenantId),await Hh(this,r)}}toJSON(){var t;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(t=this._currentUser)===null||t===void 0?void 0:t.toJSON()}}async _setRedirectUser(t,e){const r=await this.getOrInitRedirectPersistenceManager(e);return t===null?r.removeCurrentUser():r.setCurrentUser(t)}async getOrInitRedirectPersistenceManager(t){if(!this.redirectPersistenceManager){const e=t&&se(t)||this._popupRedirectResolver;$(e,this,"argument-error"),this.redirectPersistenceManager=await Ee.create(this,[se(e._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(t){var e,r;return this._isInitialized&&await this.queue(async()=>{}),((e=this._currentUser)===null||e===void 0?void 0:e._redirectEventId)===t?this._currentUser:((r=this.redirectUser)===null||r===void 0?void 0:r._redirectEventId)===t?this.redirectUser:null}async _persistUserIfCurrent(t){if(t===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(t))}_notifyListenersIfCurrent(t){t===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var t,e;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const r=(e=(t=this.currentUser)===null||t===void 0?void 0:t.uid)!==null&&e!==void 0?e:null;this.lastNotifiedUid!==r&&(this.lastNotifiedUid=r,this.authStateSubscription.next(this.currentUser))}registerStateListener(t,e,r,i){if(this._deleted)return()=>{};const o=typeof e=="function"?e:e.next.bind(e);let a=!1;const u=this._isInitialized?Promise.resolve():this._initializationPromise;if($(u,this,"internal-error"),u.then(()=>{a||o(this.currentUser)}),typeof e=="function"){const h=t.addObserver(e,r,i);return()=>{a=!0,h()}}else{const h=t.addObserver(e);return()=>{a=!0,h()}}}async directlySetCurrentUser(t){this.currentUser&&this.currentUser!==t&&this._currentUser._stopProactiveRefresh(),t&&this.isProactiveRefreshEnabled&&t._startProactiveRefresh(),this.currentUser=t,t?await this.assertedPersistence.setCurrentUser(t):await this.assertedPersistence.removeCurrentUser()}queue(t){return this.operations=this.operations.then(t,t),this.operations}get assertedPersistence(){return $(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(t){!t||this.frameworks.includes(t)||(this.frameworks.push(t),this.frameworks.sort(),this.clientVersion=Ao(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var t;const e={"X-Client-Version":this.clientVersion};this.app.options.appId&&(e["X-Firebase-gmpid"]=this.app.options.appId);const r=await((t=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||t===void 0?void 0:t.getHeartbeatsHeader());r&&(e["X-Firebase-Client"]=r);const i=await this._getAppCheckToken();return i&&(e["X-Firebase-AppCheck"]=i),e}async _getAppCheckToken(){var t;const e=await((t=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||t===void 0?void 0:t.getToken());return e!=null&&e.error&&Ch(`Error while retrieving App Check token: ${e.error}`),e==null?void 0:e.token}}function Ro(n){return Pt(n)}class So{constructor(t){this.auth=t,this.observer=null,this.addObserver=_l(e=>this.observer=e)}get next(){return $(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function id(n,t){const e=si(n,"auth");if(e.isInitialized()){const i=e.getImmediate(),o=e.getOptions();if(Bn(o,t??{}))return i;ai(i,"already-initialized")}return e.initialize({options:t})}function sd(n,t){const e=(t==null?void 0:t.persistence)||[],r=(Array.isArray(e)?e:[e]).map(se);t!=null&&t.errorMap&&n._updateErrorMap(t.errorMap),n._initializeWithPersistence(r,t==null?void 0:t.popupRedirectResolver)}function od(n,t,e){const r=Ro(n);$(r._canInitEmulator,r,"emulator-config-failed"),$(/^https?:\/\//.test(t),r,"invalid-emulator-scheme");const i=!1,o=bo(t),{host:a,port:u}=ad(t),h=u===null?"":`:${u}`;r.config.emulator={url:`${o}//${a}${h}/`},r.settings.appVerificationDisabledForTesting=!0,r.emulatorConfig=Object.freeze({host:a,port:u,protocol:o.replace(":",""),options:Object.freeze({disableWarnings:i})}),cd()}function bo(n){const t=n.indexOf(":");return t<0?"":n.substr(0,t+1)}function ad(n){const t=bo(n),e=/(\/\/)?([^?#/]+)/.exec(n.substr(t.length));if(!e)return{host:"",port:null};const r=e[2].split("@").pop()||"",i=/^(\[[^\]]+\])(:|$)/.exec(r);if(i){const o=i[1];return{host:o,port:Po(r.substr(o.length+1))}}else{const[o,a]=r.split(":");return{host:o,port:Po(a)}}}function Po(n){if(!n)return null;const t=Number(n);return isNaN(t)?null:t}function cd(){function n(){const t=document.createElement("p"),e=t.style;t.innerText="Running in emulator mode. Do not use with production credentials.",e.position="fixed",e.width="100%",e.backgroundColor="#ffffff",e.border=".1em solid #000000",e.color="#b50000",e.bottom="0px",e.left="0px",e.margin="0px",e.zIndex="10000",e.textAlign="center",t.classList.add("firebase-emulator-warning"),document.body.appendChild(t)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}function ud(n,t,e,r){return Pt(n).onIdTokenChanged(t,e,r)}function ld(n,t,e,r){return Pt(n).onAuthStateChanged(t,e,r)}const Co="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function hd(n){return Promise.all(n.map(async t=>{try{return{fulfilled:!0,value:await t}}catch(e){return{fulfilled:!1,reason:e}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xn{constructor(t){this.eventTarget=t,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(t){const e=this.receivers.find(i=>i.isListeningto(t));if(e)return e;const r=new Xn(t);return this.receivers.push(r),r}isListeningto(t){return this.eventTarget===t}async handleEvent(t){const e=t,{eventId:r,eventType:i,data:o}=e.data,a=this.handlersMap[i];if(!(a!=null&&a.size))return;e.ports[0].postMessage({status:"ack",eventId:r,eventType:i});const u=Array.from(a).map(async f=>f(e.origin,o)),h=await hd(u);e.ports[0].postMessage({status:"done",eventId:r,eventType:i,response:h})}_subscribe(t,e){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[t]||(this.handlersMap[t]=new Set),this.handlersMap[t].add(e)}_unsubscribe(t,e){this.handlersMap[t]&&e&&this.handlersMap[t].delete(e),(!e||this.handlersMap[t].size===0)&&delete this.handlersMap[t],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}Xn.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function dd(n="",t=10){let e="";for(let r=0;r<t;r++)e+=Math.floor(Math.random()*10);return n+e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fd{constructor(t){this.target=t,this.handlers=new Set}removeMessageHandler(t){t.messageChannel&&(t.messageChannel.port1.removeEventListener("message",t.onMessage),t.messageChannel.port1.close()),this.handlers.delete(t)}async _send(t,e,r=50){const i=typeof MessageChannel<"u"?new MessageChannel:null;if(!i)throw new Error("connection_unavailable");let o,a;return new Promise((u,h)=>{const f=dd("",20);i.port1.start();const m=setTimeout(()=>{h(new Error("unsupported_event"))},r);a={messageChannel:i,onMessage(I){const R=I;if(R.data.eventId===f)switch(R.data.status){case"ack":clearTimeout(m),o=setTimeout(()=>{h(new Error("timeout"))},3e3);break;case"done":clearTimeout(o),u(R.data.response);break;default:clearTimeout(m),clearTimeout(o),h(new Error("invalid_response"));break}}},this.handlers.add(a),i.port1.addEventListener("message",a.onMessage),this.target.postMessage({eventType:t,eventId:f,data:e},[i.port2])}).finally(()=>{a&&this.removeMessageHandler(a)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Vo(){return window}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ko(){return typeof Vo().WorkerGlobalScope<"u"&&typeof Vo().importScripts=="function"}async function pd(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function md(){var n;return((n=navigator==null?void 0:navigator.serviceWorker)===null||n===void 0?void 0:n.controller)||null}function gd(){return ko()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Do="firebaseLocalStorageDb",_d=1,Yn="firebaseLocalStorage",No="fbase_key";class We{constructor(t){this.request=t}toPromise(){return new Promise((t,e)=>{this.request.addEventListener("success",()=>{t(this.request.result)}),this.request.addEventListener("error",()=>{e(this.request.error)})})}}function Jn(n,t){return n.transaction([Yn],t?"readwrite":"readonly").objectStore(Yn)}function yd(){const n=indexedDB.deleteDatabase(Do);return new We(n).toPromise()}function fi(){const n=indexedDB.open(Do,_d);return new Promise((t,e)=>{n.addEventListener("error",()=>{e(n.error)}),n.addEventListener("upgradeneeded",()=>{const r=n.result;try{r.createObjectStore(Yn,{keyPath:No})}catch(i){e(i)}}),n.addEventListener("success",async()=>{const r=n.result;r.objectStoreNames.contains(Yn)?t(r):(r.close(),await yd(),t(await fi()))})})}async function Oo(n,t,e){const r=Jn(n,!0).put({[No]:t,value:e});return new We(r).toPromise()}async function vd(n,t){const e=Jn(n,!1).get(t),r=await new We(e).toPromise();return r===void 0?null:r.value}function Mo(n,t){const e=Jn(n,!0).delete(t);return new We(e).toPromise()}const Ed=800,Td=3;class xo{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await fi(),this.db)}async _withRetries(t){let e=0;for(;;)try{const r=await this._openDb();return await t(r)}catch(r){if(e++>Td)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return ko()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Xn._getInstance(gd()),this.receiver._subscribe("keyChanged",async(t,e)=>({keyProcessed:(await this._poll()).includes(e.key)})),this.receiver._subscribe("ping",async(t,e)=>["keyChanged"])}async initializeSender(){var t,e;if(this.activeServiceWorker=await pd(),!this.activeServiceWorker)return;this.sender=new fd(this.activeServiceWorker);const r=await this.sender._send("ping",{},800);r&&!((t=r[0])===null||t===void 0)&&t.fulfilled&&!((e=r[0])===null||e===void 0)&&e.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(t){if(!(!this.sender||!this.activeServiceWorker||md()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:t},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const t=await fi();return await Oo(t,Co,"1"),await Mo(t,Co),!0}catch{}return!1}async _withPendingWrite(t){this.pendingWrites++;try{await t()}finally{this.pendingWrites--}}async _set(t,e){return this._withPendingWrite(async()=>(await this._withRetries(r=>Oo(r,t,e)),this.localCache[t]=e,this.notifyServiceWorker(t)))}async _get(t){const e=await this._withRetries(r=>vd(r,t));return this.localCache[t]=e,e}async _remove(t){return this._withPendingWrite(async()=>(await this._withRetries(e=>Mo(e,t)),delete this.localCache[t],this.notifyServiceWorker(t)))}async _poll(){const t=await this._withRetries(i=>{const o=Jn(i,!1).getAll();return new We(o).toPromise()});if(!t)return[];if(this.pendingWrites!==0)return[];const e=[],r=new Set;if(t.length!==0)for(const{fbase_key:i,value:o}of t)r.add(i),JSON.stringify(this.localCache[i])!==JSON.stringify(o)&&(this.notifyListeners(i,o),e.push(i));for(const i of Object.keys(this.localCache))this.localCache[i]&&!r.has(i)&&(this.notifyListeners(i,null),e.push(i));return e}notifyListeners(t,e){this.localCache[t]=e;const r=this.listeners[t];if(r)for(const i of Array.from(r))i(e)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),Ed)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(t,e){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[t]||(this.listeners[t]=new Set,this._get(t)),this.listeners[t].add(e)}_removeListener(t,e){this.listeners[t]&&(this.listeners[t].delete(e),this.listeners[t].size===0&&delete this.listeners[t]),Object.keys(this.listeners).length===0&&this.stopPolling()}}xo.type="LOCAL";const Id=xo;var Lo="@firebase/auth",Fo="1.7.6";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wd{constructor(t){this.auth=t,this.internalListeners=new Map}getUid(){var t;return this.assertAuthConfigured(),((t=this.auth.currentUser)===null||t===void 0?void 0:t.uid)||null}async getToken(t){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(t)}:null}addAuthTokenListener(t){if(this.assertAuthConfigured(),this.internalListeners.has(t))return;const e=this.auth.onIdTokenChanged(r=>{t((r==null?void 0:r.stsTokenManager.accessToken)||null)});this.internalListeners.set(t,e),this.updateProactiveRefresh()}removeAuthTokenListener(t){this.assertAuthConfigured();const e=this.internalListeners.get(t);e&&(this.internalListeners.delete(t),e(),this.updateProactiveRefresh())}assertAuthConfigured(){$(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ad(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function Rd(n){ye(new ne("auth",(t,{options:e})=>{const r=t.getProvider("app").getImmediate(),i=t.getProvider("heartbeat"),o=t.getProvider("app-check-internal"),{apiKey:a,authDomain:u}=r.options;$(a&&!a.includes(":"),"invalid-api-key",{appName:r.name});const h={apiKey:a,authDomain:u,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:Ao(n)},f=new rd(r,i,o,h);return sd(f,e),f},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((t,e,r)=>{t.getProvider("auth-internal").initialize()})),ye(new ne("auth-internal",t=>{const e=Ro(t.getProvider("auth").getImmediate());return(r=>new wd(r))(e)},"PRIVATE").setInstantiationMode("EXPLICIT")),zt(Lo,Fo,Ad(n)),zt(Lo,Fo,"esm2017")}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Sd(n=Zs()){const t=si(n,"auth");if(t.isInitialized())return t.getImmediate();const e=id(n,{persistence:[Id]}),r=js("auth");return r&&od(e,`http://${r}`),e}Rd("WebExtension");var Uo=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var oe,Bo;(function(){var n;/** @license

     Copyright The Closure Library Authors.
     SPDX-License-Identifier: Apache-2.0
    */function t(v,p){function _(){}_.prototype=p.prototype,v.D=p.prototype,v.prototype=new _,v.prototype.constructor=v,v.C=function(y,E,w){for(var g=Array(arguments.length-2),Ft=2;Ft<arguments.length;Ft++)g[Ft-2]=arguments[Ft];return p.prototype[E].apply(y,g)}}function e(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}t(r,e),r.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function i(v,p,_){_||(_=0);var y=Array(16);if(typeof p=="string")for(var E=0;16>E;++E)y[E]=p.charCodeAt(_++)|p.charCodeAt(_++)<<8|p.charCodeAt(_++)<<16|p.charCodeAt(_++)<<24;else for(E=0;16>E;++E)y[E]=p[_++]|p[_++]<<8|p[_++]<<16|p[_++]<<24;p=v.g[0],_=v.g[1],E=v.g[2];var w=v.g[3],g=p+(w^_&(E^w))+y[0]+3614090360&4294967295;p=_+(g<<7&4294967295|g>>>25),g=w+(E^p&(_^E))+y[1]+3905402710&4294967295,w=p+(g<<12&4294967295|g>>>20),g=E+(_^w&(p^_))+y[2]+606105819&4294967295,E=w+(g<<17&4294967295|g>>>15),g=_+(p^E&(w^p))+y[3]+3250441966&4294967295,_=E+(g<<22&4294967295|g>>>10),g=p+(w^_&(E^w))+y[4]+4118548399&4294967295,p=_+(g<<7&4294967295|g>>>25),g=w+(E^p&(_^E))+y[5]+1200080426&4294967295,w=p+(g<<12&4294967295|g>>>20),g=E+(_^w&(p^_))+y[6]+2821735955&4294967295,E=w+(g<<17&4294967295|g>>>15),g=_+(p^E&(w^p))+y[7]+4249261313&4294967295,_=E+(g<<22&4294967295|g>>>10),g=p+(w^_&(E^w))+y[8]+1770035416&4294967295,p=_+(g<<7&4294967295|g>>>25),g=w+(E^p&(_^E))+y[9]+2336552879&4294967295,w=p+(g<<12&4294967295|g>>>20),g=E+(_^w&(p^_))+y[10]+4294925233&4294967295,E=w+(g<<17&4294967295|g>>>15),g=_+(p^E&(w^p))+y[11]+2304563134&4294967295,_=E+(g<<22&4294967295|g>>>10),g=p+(w^_&(E^w))+y[12]+1804603682&4294967295,p=_+(g<<7&4294967295|g>>>25),g=w+(E^p&(_^E))+y[13]+4254626195&4294967295,w=p+(g<<12&4294967295|g>>>20),g=E+(_^w&(p^_))+y[14]+2792965006&4294967295,E=w+(g<<17&4294967295|g>>>15),g=_+(p^E&(w^p))+y[15]+1236535329&4294967295,_=E+(g<<22&4294967295|g>>>10),g=p+(E^w&(_^E))+y[1]+4129170786&4294967295,p=_+(g<<5&4294967295|g>>>27),g=w+(_^E&(p^_))+y[6]+3225465664&4294967295,w=p+(g<<9&4294967295|g>>>23),g=E+(p^_&(w^p))+y[11]+643717713&4294967295,E=w+(g<<14&4294967295|g>>>18),g=_+(w^p&(E^w))+y[0]+3921069994&4294967295,_=E+(g<<20&4294967295|g>>>12),g=p+(E^w&(_^E))+y[5]+3593408605&4294967295,p=_+(g<<5&4294967295|g>>>27),g=w+(_^E&(p^_))+y[10]+38016083&4294967295,w=p+(g<<9&4294967295|g>>>23),g=E+(p^_&(w^p))+y[15]+3634488961&4294967295,E=w+(g<<14&4294967295|g>>>18),g=_+(w^p&(E^w))+y[4]+3889429448&4294967295,_=E+(g<<20&4294967295|g>>>12),g=p+(E^w&(_^E))+y[9]+568446438&4294967295,p=_+(g<<5&4294967295|g>>>27),g=w+(_^E&(p^_))+y[14]+3275163606&4294967295,w=p+(g<<9&4294967295|g>>>23),g=E+(p^_&(w^p))+y[3]+4107603335&4294967295,E=w+(g<<14&4294967295|g>>>18),g=_+(w^p&(E^w))+y[8]+1163531501&4294967295,_=E+(g<<20&4294967295|g>>>12),g=p+(E^w&(_^E))+y[13]+2850285829&4294967295,p=_+(g<<5&4294967295|g>>>27),g=w+(_^E&(p^_))+y[2]+4243563512&4294967295,w=p+(g<<9&4294967295|g>>>23),g=E+(p^_&(w^p))+y[7]+1735328473&4294967295,E=w+(g<<14&4294967295|g>>>18),g=_+(w^p&(E^w))+y[12]+2368359562&4294967295,_=E+(g<<20&4294967295|g>>>12),g=p+(_^E^w)+y[5]+4294588738&4294967295,p=_+(g<<4&4294967295|g>>>28),g=w+(p^_^E)+y[8]+2272392833&4294967295,w=p+(g<<11&4294967295|g>>>21),g=E+(w^p^_)+y[11]+1839030562&4294967295,E=w+(g<<16&4294967295|g>>>16),g=_+(E^w^p)+y[14]+4259657740&4294967295,_=E+(g<<23&4294967295|g>>>9),g=p+(_^E^w)+y[1]+2763975236&4294967295,p=_+(g<<4&4294967295|g>>>28),g=w+(p^_^E)+y[4]+1272893353&4294967295,w=p+(g<<11&4294967295|g>>>21),g=E+(w^p^_)+y[7]+4139469664&4294967295,E=w+(g<<16&4294967295|g>>>16),g=_+(E^w^p)+y[10]+3200236656&4294967295,_=E+(g<<23&4294967295|g>>>9),g=p+(_^E^w)+y[13]+681279174&4294967295,p=_+(g<<4&4294967295|g>>>28),g=w+(p^_^E)+y[0]+3936430074&4294967295,w=p+(g<<11&4294967295|g>>>21),g=E+(w^p^_)+y[3]+3572445317&4294967295,E=w+(g<<16&4294967295|g>>>16),g=_+(E^w^p)+y[6]+76029189&4294967295,_=E+(g<<23&4294967295|g>>>9),g=p+(_^E^w)+y[9]+3654602809&4294967295,p=_+(g<<4&4294967295|g>>>28),g=w+(p^_^E)+y[12]+3873151461&4294967295,w=p+(g<<11&4294967295|g>>>21),g=E+(w^p^_)+y[15]+530742520&4294967295,E=w+(g<<16&4294967295|g>>>16),g=_+(E^w^p)+y[2]+3299628645&4294967295,_=E+(g<<23&4294967295|g>>>9),g=p+(E^(_|~w))+y[0]+4096336452&4294967295,p=_+(g<<6&4294967295|g>>>26),g=w+(_^(p|~E))+y[7]+1126891415&4294967295,w=p+(g<<10&4294967295|g>>>22),g=E+(p^(w|~_))+y[14]+2878612391&4294967295,E=w+(g<<15&4294967295|g>>>17),g=_+(w^(E|~p))+y[5]+4237533241&4294967295,_=E+(g<<21&4294967295|g>>>11),g=p+(E^(_|~w))+y[12]+1700485571&4294967295,p=_+(g<<6&4294967295|g>>>26),g=w+(_^(p|~E))+y[3]+2399980690&4294967295,w=p+(g<<10&4294967295|g>>>22),g=E+(p^(w|~_))+y[10]+4293915773&4294967295,E=w+(g<<15&4294967295|g>>>17),g=_+(w^(E|~p))+y[1]+2240044497&4294967295,_=E+(g<<21&4294967295|g>>>11),g=p+(E^(_|~w))+y[8]+1873313359&4294967295,p=_+(g<<6&4294967295|g>>>26),g=w+(_^(p|~E))+y[15]+4264355552&4294967295,w=p+(g<<10&4294967295|g>>>22),g=E+(p^(w|~_))+y[6]+2734768916&4294967295,E=w+(g<<15&4294967295|g>>>17),g=_+(w^(E|~p))+y[13]+1309151649&4294967295,_=E+(g<<21&4294967295|g>>>11),g=p+(E^(_|~w))+y[4]+4149444226&4294967295,p=_+(g<<6&4294967295|g>>>26),g=w+(_^(p|~E))+y[11]+3174756917&4294967295,w=p+(g<<10&4294967295|g>>>22),g=E+(p^(w|~_))+y[2]+718787259&4294967295,E=w+(g<<15&4294967295|g>>>17),g=_+(w^(E|~p))+y[9]+3951481745&4294967295,v.g[0]=v.g[0]+p&4294967295,v.g[1]=v.g[1]+(E+(g<<21&4294967295|g>>>11))&4294967295,v.g[2]=v.g[2]+E&4294967295,v.g[3]=v.g[3]+w&4294967295}r.prototype.u=function(v,p){p===void 0&&(p=v.length);for(var _=p-this.blockSize,y=this.B,E=this.h,w=0;w<p;){if(E==0)for(;w<=_;)i(this,v,w),w+=this.blockSize;if(typeof v=="string"){for(;w<p;)if(y[E++]=v.charCodeAt(w++),E==this.blockSize){i(this,y),E=0;break}}else for(;w<p;)if(y[E++]=v[w++],E==this.blockSize){i(this,y),E=0;break}}this.h=E,this.o+=p},r.prototype.v=function(){var v=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);v[0]=128;for(var p=1;p<v.length-8;++p)v[p]=0;var _=8*this.o;for(p=v.length-8;p<v.length;++p)v[p]=_&255,_/=256;for(this.u(v),v=Array(16),p=_=0;4>p;++p)for(var y=0;32>y;y+=8)v[_++]=this.g[p]>>>y&255;return v};function o(v,p){var _=u;return Object.prototype.hasOwnProperty.call(_,v)?_[v]:_[v]=p(v)}function a(v,p){this.h=p;for(var _=[],y=!0,E=v.length-1;0<=E;E--){var w=v[E]|0;y&&w==p||(_[E]=w,y=!1)}this.g=_}var u={};function h(v){return-128<=v&&128>v?o(v,function(p){return new a([p|0],0>p?-1:0)}):new a([v|0],0>v?-1:0)}function f(v){if(isNaN(v)||!isFinite(v))return I;if(0>v)return V(f(-v));for(var p=[],_=1,y=0;v>=_;y++)p[y]=v/_|0,_*=4294967296;return new a(p,0)}function m(v,p){if(v.length==0)throw Error("number format error: empty string");if(p=p||10,2>p||36<p)throw Error("radix out of range: "+p);if(v.charAt(0)=="-")return V(m(v.substring(1),p));if(0<=v.indexOf("-"))throw Error('number format error: interior "-" character');for(var _=f(Math.pow(p,8)),y=I,E=0;E<v.length;E+=8){var w=Math.min(8,v.length-E),g=parseInt(v.substring(E,E+w),p);8>w?(w=f(Math.pow(p,w)),y=y.j(w).add(f(g))):(y=y.j(_),y=y.add(f(g)))}return y}var I=h(0),R=h(1),P=h(16777216);n=a.prototype,n.m=function(){if(N(this))return-V(this).m();for(var v=0,p=1,_=0;_<this.g.length;_++){var y=this.i(_);v+=(0<=y?y:4294967296+y)*p,p*=4294967296}return v},n.toString=function(v){if(v=v||10,2>v||36<v)throw Error("radix out of range: "+v);if(k(this))return"0";if(N(this))return"-"+V(this).toString(v);for(var p=f(Math.pow(v,6)),_=this,y="";;){var E=tt(_,p).g;_=q(_,E.j(p));var w=((0<_.g.length?_.g[0]:_.h)>>>0).toString(v);if(_=E,k(_))return w+y;for(;6>w.length;)w="0"+w;y=w+y}},n.i=function(v){return 0>v?0:v<this.g.length?this.g[v]:this.h};function k(v){if(v.h!=0)return!1;for(var p=0;p<v.g.length;p++)if(v.g[p]!=0)return!1;return!0}function N(v){return v.h==-1}n.l=function(v){return v=q(this,v),N(v)?-1:k(v)?0:1};function V(v){for(var p=v.g.length,_=[],y=0;y<p;y++)_[y]=~v.g[y];return new a(_,~v.h).add(R)}n.abs=function(){return N(this)?V(this):this},n.add=function(v){for(var p=Math.max(this.g.length,v.g.length),_=[],y=0,E=0;E<=p;E++){var w=y+(this.i(E)&65535)+(v.i(E)&65535),g=(w>>>16)+(this.i(E)>>>16)+(v.i(E)>>>16);y=g>>>16,w&=65535,g&=65535,_[E]=g<<16|w}return new a(_,_[_.length-1]&-2147483648?-1:0)};function q(v,p){return v.add(V(p))}n.j=function(v){if(k(this)||k(v))return I;if(N(this))return N(v)?V(this).j(V(v)):V(V(this).j(v));if(N(v))return V(this.j(V(v)));if(0>this.l(P)&&0>v.l(P))return f(this.m()*v.m());for(var p=this.g.length+v.g.length,_=[],y=0;y<2*p;y++)_[y]=0;for(y=0;y<this.g.length;y++)for(var E=0;E<v.g.length;E++){var w=this.i(y)>>>16,g=this.i(y)&65535,Ft=v.i(E)>>>16,Tn=v.i(E)&65535;_[2*y+2*E]+=g*Tn,K(_,2*y+2*E),_[2*y+2*E+1]+=w*Tn,K(_,2*y+2*E+1),_[2*y+2*E+1]+=g*Ft,K(_,2*y+2*E+1),_[2*y+2*E+2]+=w*Ft,K(_,2*y+2*E+2)}for(y=0;y<p;y++)_[y]=_[2*y+1]<<16|_[2*y];for(y=p;y<2*p;y++)_[y]=0;return new a(_,0)};function K(v,p){for(;(v[p]&65535)!=v[p];)v[p+1]+=v[p]>>>16,v[p]&=65535,p++}function W(v,p){this.g=v,this.h=p}function tt(v,p){if(k(p))throw Error("division by zero");if(k(v))return new W(I,I);if(N(v))return p=tt(V(v),p),new W(V(p.g),V(p.h));if(N(p))return p=tt(v,V(p)),new W(V(p.g),p.h);if(30<v.g.length){if(N(v)||N(p))throw Error("slowDivide_ only works with positive integers.");for(var _=R,y=p;0>=y.l(v);)_=St(_),y=St(y);var E=et(_,1),w=et(y,1);for(y=et(y,2),_=et(_,2);!k(y);){var g=w.add(y);0>=g.l(v)&&(E=E.add(_),w=g),y=et(y,1),_=et(_,1)}return p=q(v,E.j(p)),new W(E,p)}for(E=I;0<=v.l(p);){for(_=Math.max(1,Math.floor(v.m()/p.m())),y=Math.ceil(Math.log(_)/Math.LN2),y=48>=y?1:Math.pow(2,y-48),w=f(_),g=w.j(p);N(g)||0<g.l(v);)_-=y,w=f(_),g=w.j(p);k(w)&&(w=R),E=E.add(w),v=q(v,g)}return new W(E,v)}n.A=function(v){return tt(this,v).h},n.and=function(v){for(var p=Math.max(this.g.length,v.g.length),_=[],y=0;y<p;y++)_[y]=this.i(y)&v.i(y);return new a(_,this.h&v.h)},n.or=function(v){for(var p=Math.max(this.g.length,v.g.length),_=[],y=0;y<p;y++)_[y]=this.i(y)|v.i(y);return new a(_,this.h|v.h)},n.xor=function(v){for(var p=Math.max(this.g.length,v.g.length),_=[],y=0;y<p;y++)_[y]=this.i(y)^v.i(y);return new a(_,this.h^v.h)};function St(v){for(var p=v.g.length+1,_=[],y=0;y<p;y++)_[y]=v.i(y)<<1|v.i(y-1)>>>31;return new a(_,v.h)}function et(v,p){var _=p>>5;p%=32;for(var y=v.g.length-_,E=[],w=0;w<y;w++)E[w]=0<p?v.i(w+_)>>>p|v.i(w+_+1)<<32-p:v.i(w+_);return new a(E,v.h)}r.prototype.digest=r.prototype.v,r.prototype.reset=r.prototype.s,r.prototype.update=r.prototype.u,Bo=r,a.prototype.add=a.prototype.add,a.prototype.multiply=a.prototype.j,a.prototype.modulo=a.prototype.A,a.prototype.compare=a.prototype.l,a.prototype.toNumber=a.prototype.m,a.prototype.toString=a.prototype.toString,a.prototype.getBits=a.prototype.i,a.fromNumber=f,a.fromString=m,oe=a}).apply(typeof Uo<"u"?Uo:typeof self<"u"?self:typeof window<"u"?window:{});var Zn=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var jo,qo,Ge,$o,tr,pi,zo,Ho,Ko;(function(){var n,t=typeof Object.defineProperties=="function"?Object.defineProperty:function(s,c,l){return s==Array.prototype||s==Object.prototype||(s[c]=l.value),s};function e(s){s=[typeof globalThis=="object"&&globalThis,s,typeof window=="object"&&window,typeof self=="object"&&self,typeof Zn=="object"&&Zn];for(var c=0;c<s.length;++c){var l=s[c];if(l&&l.Math==Math)return l}throw Error("Cannot find global object")}var r=e(this);function i(s,c){if(c)t:{var l=r;s=s.split(".");for(var d=0;d<s.length-1;d++){var T=s[d];if(!(T in l))break t;l=l[T]}s=s[s.length-1],d=l[s],c=c(d),c!=d&&c!=null&&t(l,s,{configurable:!0,writable:!0,value:c})}}function o(s,c){s instanceof String&&(s+="");var l=0,d=!1,T={next:function(){if(!d&&l<s.length){var A=l++;return{value:c(A,s[A]),done:!1}}return d=!0,{done:!0,value:void 0}}};return T[Symbol.iterator]=function(){return T},T}i("Array.prototype.values",function(s){return s||function(){return o(this,function(c,l){return l})}});/** @license

     Copyright The Closure Library Authors.
     SPDX-License-Identifier: Apache-2.0
    */var a=a||{},u=this||self;function h(s){var c=typeof s;return c=c!="object"?c:s?Array.isArray(s)?"array":c:"null",c=="array"||c=="object"&&typeof s.length=="number"}function f(s){var c=typeof s;return c=="object"&&s!=null||c=="function"}function m(s,c,l){return s.call.apply(s.bind,arguments)}function I(s,c,l){if(!s)throw Error();if(2<arguments.length){var d=Array.prototype.slice.call(arguments,2);return function(){var T=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(T,d),s.apply(c,T)}}return function(){return s.apply(c,arguments)}}function R(s,c,l){return R=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?m:I,R.apply(null,arguments)}function P(s,c){var l=Array.prototype.slice.call(arguments,1);return function(){var d=l.slice();return d.push.apply(d,arguments),s.apply(this,d)}}function k(s,c){function l(){}l.prototype=c.prototype,s.aa=c.prototype,s.prototype=new l,s.prototype.constructor=s,s.Qb=function(d,T,A){for(var C=Array(arguments.length-2),Q=2;Q<arguments.length;Q++)C[Q-2]=arguments[Q];return c.prototype[T].apply(d,C)}}function N(s){const c=s.length;if(0<c){const l=Array(c);for(let d=0;d<c;d++)l[d]=s[d];return l}return[]}function V(s,c){for(let l=1;l<arguments.length;l++){const d=arguments[l];if(h(d)){const T=s.length||0,A=d.length||0;s.length=T+A;for(let C=0;C<A;C++)s[T+C]=d[C]}else s.push(d)}}class q{constructor(c,l){this.i=c,this.j=l,this.h=0,this.g=null}get(){let c;return 0<this.h?(this.h--,c=this.g,this.g=c.next,c.next=null):c=this.i(),c}}function K(s){return/^[\s\xa0]*$/.test(s)}function W(){var s=u.navigator;return s&&(s=s.userAgent)?s:""}function tt(s){return tt[" "](s),s}tt[" "]=function(){};var St=W().indexOf("Gecko")!=-1&&!(W().toLowerCase().indexOf("webkit")!=-1&&W().indexOf("Edge")==-1)&&!(W().indexOf("Trident")!=-1||W().indexOf("MSIE")!=-1)&&W().indexOf("Edge")==-1;function et(s,c,l){for(const d in s)c.call(l,s[d],d,s)}function v(s,c){for(const l in s)c.call(void 0,s[l],l,s)}function p(s){const c={};for(const l in s)c[l]=s[l];return c}const _="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function y(s,c){let l,d;for(let T=1;T<arguments.length;T++){d=arguments[T];for(l in d)s[l]=d[l];for(let A=0;A<_.length;A++)l=_[A],Object.prototype.hasOwnProperty.call(d,l)&&(s[l]=d[l])}}function E(s){var c=1;s=s.split(":");const l=[];for(;0<c&&s.length;)l.push(s.shift()),c--;return s.length&&l.push(s.join(":")),l}function w(s){u.setTimeout(()=>{throw s},0)}function g(){var s=ps;let c=null;return s.g&&(c=s.g,s.g=s.g.next,s.g||(s.h=null),c.next=null),c}class Ft{constructor(){this.h=this.g=null}add(c,l){const d=Tn.get();d.set(c,l),this.h?this.h.next=d:this.g=d,this.h=d}}var Tn=new q(()=>new Zm,s=>s.reset());class Zm{constructor(){this.next=this.g=this.h=null}set(c,l){this.h=c,this.g=l,this.next=null}reset(){this.next=this.g=this.h=null}}let In,wn=!1,ps=new Ft,Yc=()=>{const s=u.Promise.resolve(void 0);In=()=>{s.then(tg)}};var tg=()=>{for(var s;s=g();){try{s.h.call(s.g)}catch(l){w(l)}var c=Tn;c.j(s),100>c.h&&(c.h++,s.next=c.g,c.g=s)}wn=!1};function Jt(){this.s=this.s,this.C=this.C}Jt.prototype.s=!1,Jt.prototype.ma=function(){this.s||(this.s=!0,this.N())},Jt.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function _t(s,c){this.type=s,this.g=this.target=c,this.defaultPrevented=!1}_t.prototype.h=function(){this.defaultPrevented=!0};var eg=function(){if(!u.addEventListener||!Object.defineProperty)return!1;var s=!1,c=Object.defineProperty({},"passive",{get:function(){s=!0}});try{const l=()=>{};u.addEventListener("test",l,c),u.removeEventListener("test",l,c)}catch{}return s}();function An(s,c){if(_t.call(this,s?s.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,s){var l=this.type=s.type,d=s.changedTouches&&s.changedTouches.length?s.changedTouches[0]:null;if(this.target=s.target||s.srcElement,this.g=c,c=s.relatedTarget){if(St){t:{try{tt(c.nodeName);var T=!0;break t}catch{}T=!1}T||(c=null)}}else l=="mouseover"?c=s.fromElement:l=="mouseout"&&(c=s.toElement);this.relatedTarget=c,d?(this.clientX=d.clientX!==void 0?d.clientX:d.pageX,this.clientY=d.clientY!==void 0?d.clientY:d.pageY,this.screenX=d.screenX||0,this.screenY=d.screenY||0):(this.clientX=s.clientX!==void 0?s.clientX:s.pageX,this.clientY=s.clientY!==void 0?s.clientY:s.pageY,this.screenX=s.screenX||0,this.screenY=s.screenY||0),this.button=s.button,this.key=s.key||"",this.ctrlKey=s.ctrlKey,this.altKey=s.altKey,this.shiftKey=s.shiftKey,this.metaKey=s.metaKey,this.pointerId=s.pointerId||0,this.pointerType=typeof s.pointerType=="string"?s.pointerType:ng[s.pointerType]||"",this.state=s.state,this.i=s,s.defaultPrevented&&An.aa.h.call(this)}}k(An,_t);var ng={2:"touch",3:"pen",4:"mouse"};An.prototype.h=function(){An.aa.h.call(this);var s=this.i;s.preventDefault?s.preventDefault():s.returnValue=!1};var Cr="closure_listenable_"+(1e6*Math.random()|0),rg=0;function ig(s,c,l,d,T){this.listener=s,this.proxy=null,this.src=c,this.type=l,this.capture=!!d,this.ha=T,this.key=++rg,this.da=this.fa=!1}function Vr(s){s.da=!0,s.listener=null,s.proxy=null,s.src=null,s.ha=null}function kr(s){this.src=s,this.g={},this.h=0}kr.prototype.add=function(s,c,l,d,T){var A=s.toString();s=this.g[A],s||(s=this.g[A]=[],this.h++);var C=gs(s,c,d,T);return-1<C?(c=s[C],l||(c.fa=!1)):(c=new ig(c,this.src,A,!!d,T),c.fa=l,s.push(c)),c};function ms(s,c){var l=c.type;if(l in s.g){var d=s.g[l],T=Array.prototype.indexOf.call(d,c,void 0),A;(A=0<=T)&&Array.prototype.splice.call(d,T,1),A&&(Vr(c),s.g[l].length==0&&(delete s.g[l],s.h--))}}function gs(s,c,l,d){for(var T=0;T<s.length;++T){var A=s[T];if(!A.da&&A.listener==c&&A.capture==!!l&&A.ha==d)return T}return-1}var _s="closure_lm_"+(1e6*Math.random()|0),ys={};function Jc(s,c,l,d,T){if(Array.isArray(c)){for(var A=0;A<c.length;A++)Jc(s,c[A],l,d,T);return null}return l=eu(l),s&&s[Cr]?s.K(c,l,f(d)?!!d.capture:!!d,T):sg(s,c,l,!1,d,T)}function sg(s,c,l,d,T,A){if(!c)throw Error("Invalid event type");var C=f(T)?!!T.capture:!!T,Q=Es(s);if(Q||(s[_s]=Q=new kr(s)),l=Q.add(c,l,d,C,A),l.proxy)return l;if(d=og(),l.proxy=d,d.src=s,d.listener=l,s.addEventListener)eg||(T=C),T===void 0&&(T=!1),s.addEventListener(c.toString(),d,T);else if(s.attachEvent)s.attachEvent(tu(c.toString()),d);else if(s.addListener&&s.removeListener)s.addListener(d);else throw Error("addEventListener and attachEvent are unavailable.");return l}function og(){function s(l){return c.call(s.src,s.listener,l)}const c=ag;return s}function Zc(s,c,l,d,T){if(Array.isArray(c))for(var A=0;A<c.length;A++)Zc(s,c[A],l,d,T);else d=f(d)?!!d.capture:!!d,l=eu(l),s&&s[Cr]?(s=s.i,c=String(c).toString(),c in s.g&&(A=s.g[c],l=gs(A,l,d,T),-1<l&&(Vr(A[l]),Array.prototype.splice.call(A,l,1),A.length==0&&(delete s.g[c],s.h--)))):s&&(s=Es(s))&&(c=s.g[c.toString()],s=-1,c&&(s=gs(c,l,d,T)),(l=-1<s?c[s]:null)&&vs(l))}function vs(s){if(typeof s!="number"&&s&&!s.da){var c=s.src;if(c&&c[Cr])ms(c.i,s);else{var l=s.type,d=s.proxy;c.removeEventListener?c.removeEventListener(l,d,s.capture):c.detachEvent?c.detachEvent(tu(l),d):c.addListener&&c.removeListener&&c.removeListener(d),(l=Es(c))?(ms(l,s),l.h==0&&(l.src=null,c[_s]=null)):Vr(s)}}}function tu(s){return s in ys?ys[s]:ys[s]="on"+s}function ag(s,c){if(s.da)s=!0;else{c=new An(c,this);var l=s.listener,d=s.ha||s.src;s.fa&&vs(s),s=l.call(d,c)}return s}function Es(s){return s=s[_s],s instanceof kr?s:null}var Ts="__closure_events_fn_"+(1e9*Math.random()>>>0);function eu(s){return typeof s=="function"?s:(s[Ts]||(s[Ts]=function(c){return s.handleEvent(c)}),s[Ts])}function yt(){Jt.call(this),this.i=new kr(this),this.M=this,this.F=null}k(yt,Jt),yt.prototype[Cr]=!0,yt.prototype.removeEventListener=function(s,c,l,d){Zc(this,s,c,l,d)};function Tt(s,c){var l,d=s.F;if(d)for(l=[];d;d=d.F)l.push(d);if(s=s.M,d=c.type||c,typeof c=="string")c=new _t(c,s);else if(c instanceof _t)c.target=c.target||s;else{var T=c;c=new _t(d,s),y(c,T)}if(T=!0,l)for(var A=l.length-1;0<=A;A--){var C=c.g=l[A];T=Dr(C,d,!0,c)&&T}if(C=c.g=s,T=Dr(C,d,!0,c)&&T,T=Dr(C,d,!1,c)&&T,l)for(A=0;A<l.length;A++)C=c.g=l[A],T=Dr(C,d,!1,c)&&T}yt.prototype.N=function(){if(yt.aa.N.call(this),this.i){var s=this.i,c;for(c in s.g){for(var l=s.g[c],d=0;d<l.length;d++)Vr(l[d]);delete s.g[c],s.h--}}this.F=null},yt.prototype.K=function(s,c,l,d){return this.i.add(String(s),c,!1,l,d)},yt.prototype.L=function(s,c,l,d){return this.i.add(String(s),c,!0,l,d)};function Dr(s,c,l,d){if(c=s.i.g[String(c)],!c)return!0;c=c.concat();for(var T=!0,A=0;A<c.length;++A){var C=c[A];if(C&&!C.da&&C.capture==l){var Q=C.listener,dt=C.ha||C.src;C.fa&&ms(s.i,C),T=Q.call(dt,d)!==!1&&T}}return T&&!d.defaultPrevented}function nu(s,c,l){if(typeof s=="function")l&&(s=R(s,l));else if(s&&typeof s.handleEvent=="function")s=R(s.handleEvent,s);else throw Error("Invalid listener argument");return 2147483647<Number(c)?-1:u.setTimeout(s,c||0)}function ru(s){s.g=nu(()=>{s.g=null,s.i&&(s.i=!1,ru(s))},s.l);const c=s.h;s.h=null,s.m.apply(null,c)}class cg extends Jt{constructor(c,l){super(),this.m=c,this.l=l,this.h=null,this.i=!1,this.g=null}j(c){this.h=arguments,this.g?this.i=!0:ru(this)}N(){super.N(),this.g&&(u.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function Rn(s){Jt.call(this),this.h=s,this.g={}}k(Rn,Jt);var iu=[];function su(s){et(s.g,function(c,l){this.g.hasOwnProperty(l)&&vs(c)},s),s.g={}}Rn.prototype.N=function(){Rn.aa.N.call(this),su(this)},Rn.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var Is=u.JSON.stringify,ug=u.JSON.parse,lg=class{stringify(s){return u.JSON.stringify(s,void 0)}parse(s){return u.JSON.parse(s,void 0)}};function ws(){}ws.prototype.h=null;function ou(s){return s.h||(s.h=s.i())}function au(){}var Sn={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function As(){_t.call(this,"d")}k(As,_t);function Rs(){_t.call(this,"c")}k(Rs,_t);var pe={},cu=null;function Nr(){return cu=cu||new yt}pe.La="serverreachability";function uu(s){_t.call(this,pe.La,s)}k(uu,_t);function bn(s){const c=Nr();Tt(c,new uu(c))}pe.STAT_EVENT="statevent";function lu(s,c){_t.call(this,pe.STAT_EVENT,s),this.stat=c}k(lu,_t);function It(s){const c=Nr();Tt(c,new lu(c,s))}pe.Ma="timingevent";function hu(s,c){_t.call(this,pe.Ma,s),this.size=c}k(hu,_t);function Pn(s,c){if(typeof s!="function")throw Error("Fn must not be null and must be a function");return u.setTimeout(function(){s()},c)}function Cn(){this.g=!0}Cn.prototype.xa=function(){this.g=!1};function hg(s,c,l,d,T,A){s.info(function(){if(s.g)if(A)for(var C="",Q=A.split("&"),dt=0;dt<Q.length;dt++){var z=Q[dt].split("=");if(1<z.length){var vt=z[0];z=z[1];var Et=vt.split("_");C=2<=Et.length&&Et[1]=="type"?C+(vt+"="+z+"&"):C+(vt+"=redacted&")}}else C=null;else C=A;return"XMLHTTP REQ ("+d+") [attempt "+T+"]: "+c+`
`+l+`
`+C})}function dg(s,c,l,d,T,A,C){s.info(function(){return"XMLHTTP RESP ("+d+") [ attempt "+T+"]: "+c+`
`+l+`
`+A+" "+C})}function Fe(s,c,l,d){s.info(function(){return"XMLHTTP TEXT ("+c+"): "+pg(s,l)+(d?" "+d:"")})}function fg(s,c){s.info(function(){return"TIMEOUT: "+c})}Cn.prototype.info=function(){};function pg(s,c){if(!s.g)return c;if(!c)return null;try{var l=JSON.parse(c);if(l){for(s=0;s<l.length;s++)if(Array.isArray(l[s])){var d=l[s];if(!(2>d.length)){var T=d[1];if(Array.isArray(T)&&!(1>T.length)){var A=T[0];if(A!="noop"&&A!="stop"&&A!="close")for(var C=1;C<T.length;C++)T[C]=""}}}}return Is(l)}catch{return c}}var Or={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},du={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},Ss;function Mr(){}k(Mr,ws),Mr.prototype.g=function(){return new XMLHttpRequest},Mr.prototype.i=function(){return{}},Ss=new Mr;function Zt(s,c,l,d){this.j=s,this.i=c,this.l=l,this.R=d||1,this.U=new Rn(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new fu}function fu(){this.i=null,this.g="",this.h=!1}var pu={},bs={};function Ps(s,c,l){s.L=1,s.v=Ur(Ut(c)),s.m=l,s.P=!0,mu(s,null)}function mu(s,c){s.F=Date.now(),xr(s),s.A=Ut(s.v);var l=s.A,d=s.R;Array.isArray(d)||(d=[String(d)]),Cu(l.i,"t",d),s.C=0,l=s.j.J,s.h=new fu,s.g=Wu(s.j,l?c:null,!s.m),0<s.O&&(s.M=new cg(R(s.Y,s,s.g),s.O)),c=s.U,l=s.g,d=s.ca;var T="readystatechange";Array.isArray(T)||(T&&(iu[0]=T.toString()),T=iu);for(var A=0;A<T.length;A++){var C=Jc(l,T[A],d||c.handleEvent,!1,c.h||c);if(!C)break;c.g[C.key]=C}c=s.H?p(s.H):{},s.m?(s.u||(s.u="POST"),c["Content-Type"]="application/x-www-form-urlencoded",s.g.ea(s.A,s.u,s.m,c)):(s.u="GET",s.g.ea(s.A,s.u,null,c)),bn(),hg(s.i,s.u,s.A,s.l,s.R,s.m)}Zt.prototype.ca=function(s){s=s.target;const c=this.M;c&&Bt(s)==3?c.j():this.Y(s)},Zt.prototype.Y=function(s){try{if(s==this.g)t:{const Et=Bt(this.g);var c=this.g.Ba();const je=this.g.Z();if(!(3>Et)&&(Et!=3||this.g&&(this.h.h||this.g.oa()||xu(this.g)))){this.J||Et!=4||c==7||(c==8||0>=je?bn(3):bn(2)),Cs(this);var l=this.g.Z();this.X=l;e:if(gu(this)){var d=xu(this.g);s="";var T=d.length,A=Bt(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){me(this),Vn(this);var C="";break e}this.h.i=new u.TextDecoder}for(c=0;c<T;c++)this.h.h=!0,s+=this.h.i.decode(d[c],{stream:!(A&&c==T-1)});d.length=0,this.h.g+=s,this.C=0,C=this.h.g}else C=this.g.oa();if(this.o=l==200,dg(this.i,this.u,this.A,this.l,this.R,Et,l),this.o){if(this.T&&!this.K){e:{if(this.g){var Q,dt=this.g;if((Q=dt.g?dt.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!K(Q)){var z=Q;break e}}z=null}if(l=z)Fe(this.i,this.l,l,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,Vs(this,l);else{this.o=!1,this.s=3,It(12),me(this),Vn(this);break t}}if(this.P){l=!0;let Vt;for(;!this.J&&this.C<C.length;)if(Vt=mg(this,C),Vt==bs){Et==4&&(this.s=4,It(14),l=!1),Fe(this.i,this.l,null,"[Incomplete Response]");break}else if(Vt==pu){this.s=4,It(15),Fe(this.i,this.l,C,"[Invalid Chunk]"),l=!1;break}else Fe(this.i,this.l,Vt,null),Vs(this,Vt);if(gu(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),Et!=4||C.length!=0||this.h.h||(this.s=1,It(16),l=!1),this.o=this.o&&l,!l)Fe(this.i,this.l,C,"[Invalid Chunked Response]"),me(this),Vn(this);else if(0<C.length&&!this.W){this.W=!0;var vt=this.j;vt.g==this&&vt.ba&&!vt.M&&(vt.j.info("Great, no buffering proxy detected. Bytes received: "+C.length),xs(vt),vt.M=!0,It(11))}}else Fe(this.i,this.l,C,null),Vs(this,C);Et==4&&me(this),this.o&&!this.J&&(Et==4?$u(this.j,this):(this.o=!1,xr(this)))}else Dg(this.g),l==400&&0<C.indexOf("Unknown SID")?(this.s=3,It(12)):(this.s=0,It(13)),me(this),Vn(this)}}}catch{}finally{}};function gu(s){return s.g?s.u=="GET"&&s.L!=2&&s.j.Ca:!1}function mg(s,c){var l=s.C,d=c.indexOf(`
`,l);return d==-1?bs:(l=Number(c.substring(l,d)),isNaN(l)?pu:(d+=1,d+l>c.length?bs:(c=c.slice(d,d+l),s.C=d+l,c)))}Zt.prototype.cancel=function(){this.J=!0,me(this)};function xr(s){s.S=Date.now()+s.I,_u(s,s.I)}function _u(s,c){if(s.B!=null)throw Error("WatchDog timer not null");s.B=Pn(R(s.ba,s),c)}function Cs(s){s.B&&(u.clearTimeout(s.B),s.B=null)}Zt.prototype.ba=function(){this.B=null;const s=Date.now();0<=s-this.S?(fg(this.i,this.A),this.L!=2&&(bn(),It(17)),me(this),this.s=2,Vn(this)):_u(this,this.S-s)};function Vn(s){s.j.G==0||s.J||$u(s.j,s)}function me(s){Cs(s);var c=s.M;c&&typeof c.ma=="function"&&c.ma(),s.M=null,su(s.U),s.g&&(c=s.g,s.g=null,c.abort(),c.ma())}function Vs(s,c){try{var l=s.j;if(l.G!=0&&(l.g==s||ks(l.h,s))){if(!s.K&&ks(l.h,s)&&l.G==3){try{var d=l.Da.g.parse(c)}catch{d=null}if(Array.isArray(d)&&d.length==3){var T=d;if(T[0]==0){t:if(!l.u){if(l.g)if(l.g.F+3e3<s.F)zr(l),qr(l);else break t;Ms(l),It(18)}}else l.za=T[1],0<l.za-l.T&&37500>T[2]&&l.F&&l.v==0&&!l.C&&(l.C=Pn(R(l.Za,l),6e3));if(1>=Eu(l.h)&&l.ca){try{l.ca()}catch{}l.ca=void 0}}else _e(l,11)}else if((s.K||l.g==s)&&zr(l),!K(c))for(T=l.Da.g.parse(c),c=0;c<T.length;c++){let z=T[c];if(l.T=z[0],z=z[1],l.G==2)if(z[0]=="c"){l.K=z[1],l.ia=z[2];const vt=z[3];vt!=null&&(l.la=vt,l.j.info("VER="+l.la));const Et=z[4];Et!=null&&(l.Aa=Et,l.j.info("SVER="+l.Aa));const je=z[5];je!=null&&typeof je=="number"&&0<je&&(d=1.5*je,l.L=d,l.j.info("backChannelRequestTimeoutMs_="+d)),d=l;const Vt=s.g;if(Vt){const Kr=Vt.g?Vt.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(Kr){var A=d.h;A.g||Kr.indexOf("spdy")==-1&&Kr.indexOf("quic")==-1&&Kr.indexOf("h2")==-1||(A.j=A.l,A.g=new Set,A.h&&(Ds(A,A.h),A.h=null))}if(d.D){const Ls=Vt.g?Vt.g.getResponseHeader("X-HTTP-Session-Id"):null;Ls&&(d.ya=Ls,X(d.I,d.D,Ls))}}l.G=3,l.l&&l.l.ua(),l.ba&&(l.R=Date.now()-s.F,l.j.info("Handshake RTT: "+l.R+"ms")),d=l;var C=s;if(d.qa=Ku(d,d.J?d.ia:null,d.W),C.K){Tu(d.h,C);var Q=C,dt=d.L;dt&&(Q.I=dt),Q.B&&(Cs(Q),xr(Q)),d.g=C}else ju(d);0<l.i.length&&$r(l)}else z[0]!="stop"&&z[0]!="close"||_e(l,7);else l.G==3&&(z[0]=="stop"||z[0]=="close"?z[0]=="stop"?_e(l,7):Os(l):z[0]!="noop"&&l.l&&l.l.ta(z),l.v=0)}}bn(4)}catch{}}var gg=class{constructor(s,c){this.g=s,this.map=c}};function yu(s){this.l=s||10,u.PerformanceNavigationTiming?(s=u.performance.getEntriesByType("navigation"),s=0<s.length&&(s[0].nextHopProtocol=="hq"||s[0].nextHopProtocol=="h2")):s=!!(u.chrome&&u.chrome.loadTimes&&u.chrome.loadTimes()&&u.chrome.loadTimes().wasFetchedViaSpdy),this.j=s?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function vu(s){return s.h?!0:s.g?s.g.size>=s.j:!1}function Eu(s){return s.h?1:s.g?s.g.size:0}function ks(s,c){return s.h?s.h==c:s.g?s.g.has(c):!1}function Ds(s,c){s.g?s.g.add(c):s.h=c}function Tu(s,c){s.h&&s.h==c?s.h=null:s.g&&s.g.has(c)&&s.g.delete(c)}yu.prototype.cancel=function(){if(this.i=Iu(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const s of this.g.values())s.cancel();this.g.clear()}};function Iu(s){if(s.h!=null)return s.i.concat(s.h.D);if(s.g!=null&&s.g.size!==0){let c=s.i;for(const l of s.g.values())c=c.concat(l.D);return c}return N(s.i)}function _g(s){if(s.V&&typeof s.V=="function")return s.V();if(typeof Map<"u"&&s instanceof Map||typeof Set<"u"&&s instanceof Set)return Array.from(s.values());if(typeof s=="string")return s.split("");if(h(s)){for(var c=[],l=s.length,d=0;d<l;d++)c.push(s[d]);return c}c=[],l=0;for(d in s)c[l++]=s[d];return c}function yg(s){if(s.na&&typeof s.na=="function")return s.na();if(!s.V||typeof s.V!="function"){if(typeof Map<"u"&&s instanceof Map)return Array.from(s.keys());if(!(typeof Set<"u"&&s instanceof Set)){if(h(s)||typeof s=="string"){var c=[];s=s.length;for(var l=0;l<s;l++)c.push(l);return c}c=[],l=0;for(const d in s)c[l++]=d;return c}}}function wu(s,c){if(s.forEach&&typeof s.forEach=="function")s.forEach(c,void 0);else if(h(s)||typeof s=="string")Array.prototype.forEach.call(s,c,void 0);else for(var l=yg(s),d=_g(s),T=d.length,A=0;A<T;A++)c.call(void 0,d[A],l&&l[A],s)}var Au=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function vg(s,c){if(s){s=s.split("&");for(var l=0;l<s.length;l++){var d=s[l].indexOf("="),T=null;if(0<=d){var A=s[l].substring(0,d);T=s[l].substring(d+1)}else A=s[l];c(A,T?decodeURIComponent(T.replace(/\+/g," ")):"")}}}function ge(s){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,s instanceof ge){this.h=s.h,Lr(this,s.j),this.o=s.o,this.g=s.g,Fr(this,s.s),this.l=s.l;var c=s.i,l=new Nn;l.i=c.i,c.g&&(l.g=new Map(c.g),l.h=c.h),Ru(this,l),this.m=s.m}else s&&(c=String(s).match(Au))?(this.h=!1,Lr(this,c[1]||"",!0),this.o=kn(c[2]||""),this.g=kn(c[3]||"",!0),Fr(this,c[4]),this.l=kn(c[5]||"",!0),Ru(this,c[6]||"",!0),this.m=kn(c[7]||"")):(this.h=!1,this.i=new Nn(null,this.h))}ge.prototype.toString=function(){var s=[],c=this.j;c&&s.push(Dn(c,Su,!0),":");var l=this.g;return(l||c=="file")&&(s.push("//"),(c=this.o)&&s.push(Dn(c,Su,!0),"@"),s.push(encodeURIComponent(String(l)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),l=this.s,l!=null&&s.push(":",String(l))),(l=this.l)&&(this.g&&l.charAt(0)!="/"&&s.push("/"),s.push(Dn(l,l.charAt(0)=="/"?Ig:Tg,!0))),(l=this.i.toString())&&s.push("?",l),(l=this.m)&&s.push("#",Dn(l,Ag)),s.join("")};function Ut(s){return new ge(s)}function Lr(s,c,l){s.j=l?kn(c,!0):c,s.j&&(s.j=s.j.replace(/:$/,""))}function Fr(s,c){if(c){if(c=Number(c),isNaN(c)||0>c)throw Error("Bad port number "+c);s.s=c}else s.s=null}function Ru(s,c,l){c instanceof Nn?(s.i=c,Rg(s.i,s.h)):(l||(c=Dn(c,wg)),s.i=new Nn(c,s.h))}function X(s,c,l){s.i.set(c,l)}function Ur(s){return X(s,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),s}function kn(s,c){return s?c?decodeURI(s.replace(/%25/g,"%2525")):decodeURIComponent(s):""}function Dn(s,c,l){return typeof s=="string"?(s=encodeURI(s).replace(c,Eg),l&&(s=s.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),s):null}function Eg(s){return s=s.charCodeAt(0),"%"+(s>>4&15).toString(16)+(s&15).toString(16)}var Su=/[#\/\?@]/g,Tg=/[#\?:]/g,Ig=/[#\?]/g,wg=/[#\?@]/g,Ag=/#/g;function Nn(s,c){this.h=this.g=null,this.i=s||null,this.j=!!c}function te(s){s.g||(s.g=new Map,s.h=0,s.i&&vg(s.i,function(c,l){s.add(decodeURIComponent(c.replace(/\+/g," ")),l)}))}n=Nn.prototype,n.add=function(s,c){te(this),this.i=null,s=Ue(this,s);var l=this.g.get(s);return l||this.g.set(s,l=[]),l.push(c),this.h+=1,this};function bu(s,c){te(s),c=Ue(s,c),s.g.has(c)&&(s.i=null,s.h-=s.g.get(c).length,s.g.delete(c))}function Pu(s,c){return te(s),c=Ue(s,c),s.g.has(c)}n.forEach=function(s,c){te(this),this.g.forEach(function(l,d){l.forEach(function(T){s.call(c,T,d,this)},this)},this)},n.na=function(){te(this);const s=Array.from(this.g.values()),c=Array.from(this.g.keys()),l=[];for(let d=0;d<c.length;d++){const T=s[d];for(let A=0;A<T.length;A++)l.push(c[d])}return l},n.V=function(s){te(this);let c=[];if(typeof s=="string")Pu(this,s)&&(c=c.concat(this.g.get(Ue(this,s))));else{s=Array.from(this.g.values());for(let l=0;l<s.length;l++)c=c.concat(s[l])}return c},n.set=function(s,c){return te(this),this.i=null,s=Ue(this,s),Pu(this,s)&&(this.h-=this.g.get(s).length),this.g.set(s,[c]),this.h+=1,this},n.get=function(s,c){return s?(s=this.V(s),0<s.length?String(s[0]):c):c};function Cu(s,c,l){bu(s,c),0<l.length&&(s.i=null,s.g.set(Ue(s,c),N(l)),s.h+=l.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";const s=[],c=Array.from(this.g.keys());for(var l=0;l<c.length;l++){var d=c[l];const A=encodeURIComponent(String(d)),C=this.V(d);for(d=0;d<C.length;d++){var T=A;C[d]!==""&&(T+="="+encodeURIComponent(String(C[d]))),s.push(T)}}return this.i=s.join("&")};function Ue(s,c){return c=String(c),s.j&&(c=c.toLowerCase()),c}function Rg(s,c){c&&!s.j&&(te(s),s.i=null,s.g.forEach(function(l,d){var T=d.toLowerCase();d!=T&&(bu(this,d),Cu(this,T,l))},s)),s.j=c}function Sg(s,c){const l=new Cn;if(u.Image){const d=new Image;d.onload=P(ee,l,"TestLoadImage: loaded",!0,c,d),d.onerror=P(ee,l,"TestLoadImage: error",!1,c,d),d.onabort=P(ee,l,"TestLoadImage: abort",!1,c,d),d.ontimeout=P(ee,l,"TestLoadImage: timeout",!1,c,d),u.setTimeout(function(){d.ontimeout&&d.ontimeout()},1e4),d.src=s}else c(!1)}function bg(s,c){const l=new Cn,d=new AbortController,T=setTimeout(()=>{d.abort(),ee(l,"TestPingServer: timeout",!1,c)},1e4);fetch(s,{signal:d.signal}).then(A=>{clearTimeout(T),A.ok?ee(l,"TestPingServer: ok",!0,c):ee(l,"TestPingServer: server error",!1,c)}).catch(()=>{clearTimeout(T),ee(l,"TestPingServer: error",!1,c)})}function ee(s,c,l,d,T){try{T&&(T.onload=null,T.onerror=null,T.onabort=null,T.ontimeout=null),d(l)}catch{}}function Pg(){this.g=new lg}function Cg(s,c,l){const d=l||"";try{wu(s,function(T,A){let C=T;f(T)&&(C=Is(T)),c.push(d+A+"="+encodeURIComponent(C))})}catch(T){throw c.push(d+"type="+encodeURIComponent("_badmap")),T}}function On(s){this.l=s.Ub||null,this.j=s.eb||!1}k(On,ws),On.prototype.g=function(){return new Br(this.l,this.j)},On.prototype.i=function(s){return function(){return s}}({});function Br(s,c){yt.call(this),this.D=s,this.o=c,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}k(Br,yt),n=Br.prototype,n.open=function(s,c){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=s,this.A=c,this.readyState=1,xn(this)},n.send=function(s){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const c={headers:this.u,method:this.B,credentials:this.m,cache:void 0};s&&(c.body=s),(this.D||u).fetch(new Request(this.A,c)).then(this.Sa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,Mn(this)),this.readyState=0},n.Sa=function(s){if(this.g&&(this.l=s,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=s.headers,this.readyState=2,xn(this)),this.g&&(this.readyState=3,xn(this),this.g)))if(this.responseType==="arraybuffer")s.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof u.ReadableStream<"u"&&"body"in s){if(this.j=s.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;Vu(this)}else s.text().then(this.Ra.bind(this),this.ga.bind(this))};function Vu(s){s.j.read().then(s.Pa.bind(s)).catch(s.ga.bind(s))}n.Pa=function(s){if(this.g){if(this.o&&s.value)this.response.push(s.value);else if(!this.o){var c=s.value?s.value:new Uint8Array(0);(c=this.v.decode(c,{stream:!s.done}))&&(this.response=this.responseText+=c)}s.done?Mn(this):xn(this),this.readyState==3&&Vu(this)}},n.Ra=function(s){this.g&&(this.response=this.responseText=s,Mn(this))},n.Qa=function(s){this.g&&(this.response=s,Mn(this))},n.ga=function(){this.g&&Mn(this)};function Mn(s){s.readyState=4,s.l=null,s.j=null,s.v=null,xn(s)}n.setRequestHeader=function(s,c){this.u.append(s,c)},n.getResponseHeader=function(s){return this.h&&this.h.get(s.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";const s=[],c=this.h.entries();for(var l=c.next();!l.done;)l=l.value,s.push(l[0]+": "+l[1]),l=c.next();return s.join(`\r
`)};function xn(s){s.onreadystatechange&&s.onreadystatechange.call(s)}Object.defineProperty(Br.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(s){this.m=s?"include":"same-origin"}});function ku(s){let c="";return et(s,function(l,d){c+=d,c+=":",c+=l,c+=`\r
`}),c}function Ns(s,c,l){t:{for(d in l){var d=!1;break t}d=!0}d||(l=ku(l),typeof s=="string"?l!=null&&encodeURIComponent(String(l)):X(s,c,l))}function Z(s){yt.call(this),this.headers=new Map,this.o=s||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}k(Z,yt);var Vg=/^https?$/i,kg=["POST","PUT"];n=Z.prototype,n.Ha=function(s){this.J=s},n.ea=function(s,c,l,d){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+s);c=c?c.toUpperCase():"GET",this.D=s,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():Ss.g(),this.v=this.o?ou(this.o):ou(Ss),this.g.onreadystatechange=R(this.Ea,this);try{this.B=!0,this.g.open(c,String(s),!0),this.B=!1}catch(A){Du(this,A);return}if(s=l||"",l=new Map(this.headers),d)if(Object.getPrototypeOf(d)===Object.prototype)for(var T in d)l.set(T,d[T]);else if(typeof d.keys=="function"&&typeof d.get=="function")for(const A of d.keys())l.set(A,d.get(A));else throw Error("Unknown input type for opt_headers: "+String(d));d=Array.from(l.keys()).find(A=>A.toLowerCase()=="content-type"),T=u.FormData&&s instanceof u.FormData,!(0<=Array.prototype.indexOf.call(kg,c,void 0))||d||T||l.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[A,C]of l)this.g.setRequestHeader(A,C);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{Mu(this),this.u=!0,this.g.send(s),this.u=!1}catch(A){Du(this,A)}};function Du(s,c){s.h=!1,s.g&&(s.j=!0,s.g.abort(),s.j=!1),s.l=c,s.m=5,Nu(s),jr(s)}function Nu(s){s.A||(s.A=!0,Tt(s,"complete"),Tt(s,"error"))}n.abort=function(s){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=s||7,Tt(this,"complete"),Tt(this,"abort"),jr(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),jr(this,!0)),Z.aa.N.call(this)},n.Ea=function(){this.s||(this.B||this.u||this.j?Ou(this):this.bb())},n.bb=function(){Ou(this)};function Ou(s){if(s.h&&typeof a<"u"&&(!s.v[1]||Bt(s)!=4||s.Z()!=2)){if(s.u&&Bt(s)==4)nu(s.Ea,0,s);else if(Tt(s,"readystatechange"),Bt(s)==4){s.h=!1;try{const C=s.Z();t:switch(C){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var c=!0;break t;default:c=!1}var l;if(!(l=c)){var d;if(d=C===0){var T=String(s.D).match(Au)[1]||null;!T&&u.self&&u.self.location&&(T=u.self.location.protocol.slice(0,-1)),d=!Vg.test(T?T.toLowerCase():"")}l=d}if(l)Tt(s,"complete"),Tt(s,"success");else{s.m=6;try{var A=2<Bt(s)?s.g.statusText:""}catch{A=""}s.l=A+" ["+s.Z()+"]",Nu(s)}}finally{jr(s)}}}}function jr(s,c){if(s.g){Mu(s);const l=s.g,d=s.v[0]?()=>{}:null;s.g=null,s.v=null,c||Tt(s,"ready");try{l.onreadystatechange=d}catch{}}}function Mu(s){s.I&&(u.clearTimeout(s.I),s.I=null)}n.isActive=function(){return!!this.g};function Bt(s){return s.g?s.g.readyState:0}n.Z=function(){try{return 2<Bt(this)?this.g.status:-1}catch{return-1}},n.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.Oa=function(s){if(this.g){var c=this.g.responseText;return s&&c.indexOf(s)==0&&(c=c.substring(s.length)),ug(c)}};function xu(s){try{if(!s.g)return null;if("response"in s.g)return s.g.response;switch(s.H){case"":case"text":return s.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in s.g)return s.g.mozResponseArrayBuffer}return null}catch{return null}}function Dg(s){const c={};s=(s.g&&2<=Bt(s)&&s.g.getAllResponseHeaders()||"").split(`\r
`);for(let d=0;d<s.length;d++){if(K(s[d]))continue;var l=E(s[d]);const T=l[0];if(l=l[1],typeof l!="string")continue;l=l.trim();const A=c[T]||[];c[T]=A,A.push(l)}v(c,function(d){return d.join(", ")})}n.Ba=function(){return this.m},n.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function Ln(s,c,l){return l&&l.internalChannelParams&&l.internalChannelParams[s]||c}function Lu(s){this.Aa=0,this.i=[],this.j=new Cn,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=Ln("failFast",!1,s),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=Ln("baseRetryDelayMs",5e3,s),this.cb=Ln("retryDelaySeedMs",1e4,s),this.Wa=Ln("forwardChannelMaxRetries",2,s),this.wa=Ln("forwardChannelRequestTimeoutMs",2e4,s),this.pa=s&&s.xmlHttpFactory||void 0,this.Xa=s&&s.Tb||void 0,this.Ca=s&&s.useFetchStreams||!1,this.L=void 0,this.J=s&&s.supportsCrossDomainXhr||!1,this.K="",this.h=new yu(s&&s.concurrentRequestLimit),this.Da=new Pg,this.P=s&&s.fastHandshake||!1,this.O=s&&s.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=s&&s.Rb||!1,s&&s.xa&&this.j.xa(),s&&s.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&s&&s.detectBufferingProxy||!1,this.ja=void 0,s&&s.longPollingTimeout&&0<s.longPollingTimeout&&(this.ja=s.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}n=Lu.prototype,n.la=8,n.G=1,n.connect=function(s,c,l,d){It(0),this.W=s,this.H=c||{},l&&d!==void 0&&(this.H.OSID=l,this.H.OAID=d),this.F=this.X,this.I=Ku(this,null,this.W),$r(this)};function Os(s){if(Fu(s),s.G==3){var c=s.U++,l=Ut(s.I);if(X(l,"SID",s.K),X(l,"RID",c),X(l,"TYPE","terminate"),Fn(s,l),c=new Zt(s,s.j,c),c.L=2,c.v=Ur(Ut(l)),l=!1,u.navigator&&u.navigator.sendBeacon)try{l=u.navigator.sendBeacon(c.v.toString(),"")}catch{}!l&&u.Image&&(new Image().src=c.v,l=!0),l||(c.g=Wu(c.j,null),c.g.ea(c.v)),c.F=Date.now(),xr(c)}Hu(s)}function qr(s){s.g&&(xs(s),s.g.cancel(),s.g=null)}function Fu(s){qr(s),s.u&&(u.clearTimeout(s.u),s.u=null),zr(s),s.h.cancel(),s.s&&(typeof s.s=="number"&&u.clearTimeout(s.s),s.s=null)}function $r(s){if(!vu(s.h)&&!s.s){s.s=!0;var c=s.Ga;In||Yc(),wn||(In(),wn=!0),ps.add(c,s),s.B=0}}function Ng(s,c){return Eu(s.h)>=s.h.j-(s.s?1:0)?!1:s.s?(s.i=c.D.concat(s.i),!0):s.G==1||s.G==2||s.B>=(s.Va?0:s.Wa)?!1:(s.s=Pn(R(s.Ga,s,c),zu(s,s.B)),s.B++,!0)}n.Ga=function(s){if(this.s)if(this.s=null,this.G==1){if(!s){this.U=Math.floor(1e5*Math.random()),s=this.U++;const T=new Zt(this,this.j,s);let A=this.o;if(this.S&&(A?(A=p(A),y(A,this.S)):A=this.S),this.m!==null||this.O||(T.H=A,A=null),this.P)t:{for(var c=0,l=0;l<this.i.length;l++){e:{var d=this.i[l];if("__data__"in d.map&&(d=d.map.__data__,typeof d=="string")){d=d.length;break e}d=void 0}if(d===void 0)break;if(c+=d,4096<c){c=l;break t}if(c===4096||l===this.i.length-1){c=l+1;break t}}c=1e3}else c=1e3;c=Bu(this,T,c),l=Ut(this.I),X(l,"RID",s),X(l,"CVER",22),this.D&&X(l,"X-HTTP-Session-Id",this.D),Fn(this,l),A&&(this.O?c="headers="+encodeURIComponent(String(ku(A)))+"&"+c:this.m&&Ns(l,this.m,A)),Ds(this.h,T),this.Ua&&X(l,"TYPE","init"),this.P?(X(l,"$req",c),X(l,"SID","null"),T.T=!0,Ps(T,l,null)):Ps(T,l,c),this.G=2}}else this.G==3&&(s?Uu(this,s):this.i.length==0||vu(this.h)||Uu(this))};function Uu(s,c){var l;c?l=c.l:l=s.U++;const d=Ut(s.I);X(d,"SID",s.K),X(d,"RID",l),X(d,"AID",s.T),Fn(s,d),s.m&&s.o&&Ns(d,s.m,s.o),l=new Zt(s,s.j,l,s.B+1),s.m===null&&(l.H=s.o),c&&(s.i=c.D.concat(s.i)),c=Bu(s,l,1e3),l.I=Math.round(.5*s.wa)+Math.round(.5*s.wa*Math.random()),Ds(s.h,l),Ps(l,d,c)}function Fn(s,c){s.H&&et(s.H,function(l,d){X(c,d,l)}),s.l&&wu({},function(l,d){X(c,d,l)})}function Bu(s,c,l){l=Math.min(s.i.length,l);var d=s.l?R(s.l.Na,s.l,s):null;t:{var T=s.i;let A=-1;for(;;){const C=["count="+l];A==-1?0<l?(A=T[0].g,C.push("ofs="+A)):A=0:C.push("ofs="+A);let Q=!0;for(let dt=0;dt<l;dt++){let z=T[dt].g;const vt=T[dt].map;if(z-=A,0>z)A=Math.max(0,T[dt].g-100),Q=!1;else try{Cg(vt,C,"req"+z+"_")}catch{d&&d(vt)}}if(Q){d=C.join("&");break t}}}return s=s.i.splice(0,l),c.D=s,d}function ju(s){if(!s.g&&!s.u){s.Y=1;var c=s.Fa;In||Yc(),wn||(In(),wn=!0),ps.add(c,s),s.v=0}}function Ms(s){return s.g||s.u||3<=s.v?!1:(s.Y++,s.u=Pn(R(s.Fa,s),zu(s,s.v)),s.v++,!0)}n.Fa=function(){if(this.u=null,qu(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var s=2*this.R;this.j.info("BP detection timer enabled: "+s),this.A=Pn(R(this.ab,this),s)}},n.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,It(10),qr(this),qu(this))};function xs(s){s.A!=null&&(u.clearTimeout(s.A),s.A=null)}function qu(s){s.g=new Zt(s,s.j,"rpc",s.Y),s.m===null&&(s.g.H=s.o),s.g.O=0;var c=Ut(s.qa);X(c,"RID","rpc"),X(c,"SID",s.K),X(c,"AID",s.T),X(c,"CI",s.F?"0":"1"),!s.F&&s.ja&&X(c,"TO",s.ja),X(c,"TYPE","xmlhttp"),Fn(s,c),s.m&&s.o&&Ns(c,s.m,s.o),s.L&&(s.g.I=s.L);var l=s.g;s=s.ia,l.L=1,l.v=Ur(Ut(c)),l.m=null,l.P=!0,mu(l,s)}n.Za=function(){this.C!=null&&(this.C=null,qr(this),Ms(this),It(19))};function zr(s){s.C!=null&&(u.clearTimeout(s.C),s.C=null)}function $u(s,c){var l=null;if(s.g==c){zr(s),xs(s),s.g=null;var d=2}else if(ks(s.h,c))l=c.D,Tu(s.h,c),d=1;else return;if(s.G!=0){if(c.o)if(d==1){l=c.m?c.m.length:0,c=Date.now()-c.F;var T=s.B;d=Nr(),Tt(d,new hu(d,l)),$r(s)}else ju(s);else if(T=c.s,T==3||T==0&&0<c.X||!(d==1&&Ng(s,c)||d==2&&Ms(s)))switch(l&&0<l.length&&(c=s.h,c.i=c.i.concat(l)),T){case 1:_e(s,5);break;case 4:_e(s,10);break;case 3:_e(s,6);break;default:_e(s,2)}}}function zu(s,c){let l=s.Ta+Math.floor(Math.random()*s.cb);return s.isActive()||(l*=2),l*c}function _e(s,c){if(s.j.info("Error code "+c),c==2){var l=R(s.fb,s),d=s.Xa;const T=!d;d=new ge(d||"//www.google.com/images/cleardot.gif"),u.location&&u.location.protocol=="http"||Lr(d,"https"),Ur(d),T?Sg(d.toString(),l):bg(d.toString(),l)}else It(2);s.G=0,s.l&&s.l.sa(c),Hu(s),Fu(s)}n.fb=function(s){s?(this.j.info("Successfully pinged google.com"),It(2)):(this.j.info("Failed to ping google.com"),It(1))};function Hu(s){if(s.G=0,s.ka=[],s.l){const c=Iu(s.h);(c.length!=0||s.i.length!=0)&&(V(s.ka,c),V(s.ka,s.i),s.h.i.length=0,N(s.i),s.i.length=0),s.l.ra()}}function Ku(s,c,l){var d=l instanceof ge?Ut(l):new ge(l);if(d.g!="")c&&(d.g=c+"."+d.g),Fr(d,d.s);else{var T=u.location;d=T.protocol,c=c?c+"."+T.hostname:T.hostname,T=+T.port;var A=new ge(null);d&&Lr(A,d),c&&(A.g=c),T&&Fr(A,T),l&&(A.l=l),d=A}return l=s.D,c=s.ya,l&&c&&X(d,l,c),X(d,"VER",s.la),Fn(s,d),d}function Wu(s,c,l){if(c&&!s.J)throw Error("Can't create secondary domain capable XhrIo object.");return c=s.Ca&&!s.pa?new Z(new On({eb:l})):new Z(s.pa),c.Ha(s.J),c}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function Gu(){}n=Gu.prototype,n.ua=function(){},n.ta=function(){},n.sa=function(){},n.ra=function(){},n.isActive=function(){return!0},n.Na=function(){};function Hr(){}Hr.prototype.g=function(s,c){return new wt(s,c)};function wt(s,c){yt.call(this),this.g=new Lu(c),this.l=s,this.h=c&&c.messageUrlParams||null,s=c&&c.messageHeaders||null,c&&c.clientProtocolHeaderRequired&&(s?s["X-Client-Protocol"]="webchannel":s={"X-Client-Protocol":"webchannel"}),this.g.o=s,s=c&&c.initMessageHeaders||null,c&&c.messageContentType&&(s?s["X-WebChannel-Content-Type"]=c.messageContentType:s={"X-WebChannel-Content-Type":c.messageContentType}),c&&c.va&&(s?s["X-WebChannel-Client-Profile"]=c.va:s={"X-WebChannel-Client-Profile":c.va}),this.g.S=s,(s=c&&c.Sb)&&!K(s)&&(this.g.m=s),this.v=c&&c.supportsCrossDomainXhr||!1,this.u=c&&c.sendRawJson||!1,(c=c&&c.httpSessionIdParam)&&!K(c)&&(this.g.D=c,s=this.h,s!==null&&c in s&&(s=this.h,c in s&&delete s[c])),this.j=new Be(this)}k(wt,yt),wt.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},wt.prototype.close=function(){Os(this.g)},wt.prototype.o=function(s){var c=this.g;if(typeof s=="string"){var l={};l.__data__=s,s=l}else this.u&&(l={},l.__data__=Is(s),s=l);c.i.push(new gg(c.Ya++,s)),c.G==3&&$r(c)},wt.prototype.N=function(){this.g.l=null,delete this.j,Os(this.g),delete this.g,wt.aa.N.call(this)};function Qu(s){As.call(this),s.__headers__&&(this.headers=s.__headers__,this.statusCode=s.__status__,delete s.__headers__,delete s.__status__);var c=s.__sm__;if(c){t:{for(const l in c){s=l;break t}s=void 0}(this.i=s)&&(s=this.i,c=c!==null&&s in c?c[s]:void 0),this.data=c}else this.data=s}k(Qu,As);function Xu(){Rs.call(this),this.status=1}k(Xu,Rs);function Be(s){this.g=s}k(Be,Gu),Be.prototype.ua=function(){Tt(this.g,"a")},Be.prototype.ta=function(s){Tt(this.g,new Qu(s))},Be.prototype.sa=function(s){Tt(this.g,new Xu)},Be.prototype.ra=function(){Tt(this.g,"b")},Hr.prototype.createWebChannel=Hr.prototype.g,wt.prototype.send=wt.prototype.o,wt.prototype.open=wt.prototype.m,wt.prototype.close=wt.prototype.close,Ko=function(){return new Hr},Ho=function(){return Nr()},zo=pe,pi={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},Or.NO_ERROR=0,Or.TIMEOUT=8,Or.HTTP_ERROR=6,tr=Or,du.COMPLETE="complete",$o=du,au.EventType=Sn,Sn.OPEN="a",Sn.CLOSE="b",Sn.ERROR="c",Sn.MESSAGE="d",yt.prototype.listen=yt.prototype.K,Ge=au,qo=On,Z.prototype.listenOnce=Z.prototype.L,Z.prototype.getLastError=Z.prototype.Ka,Z.prototype.getLastErrorCode=Z.prototype.Ba,Z.prototype.getStatus=Z.prototype.Z,Z.prototype.getResponseJson=Z.prototype.Oa,Z.prototype.getResponseText=Z.prototype.oa,Z.prototype.send=Z.prototype.ea,Z.prototype.setWithCredentials=Z.prototype.Ha,jo=Z}).apply(typeof Zn<"u"?Zn:typeof self<"u"?self:typeof window<"u"?window:{});const Wo="@firebase/firestore";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ft{constructor(t){this.uid=t}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(t){return t.uid===this.uid}}ft.UNAUTHENTICATED=new ft(null),ft.GOOGLE_CREDENTIALS=new ft("google-credentials-uid"),ft.FIRST_PARTY=new ft("first-party-uid"),ft.MOCK_USER=new ft("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Te="10.12.5";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Wt=new Qr("@firebase/firestore");function Qe(){return Wt.logLevel}function bd(n){Wt.setLogLevel(n)}function D(n,...t){if(Wt.logLevel<=B.DEBUG){const e=t.map(mi);Wt.debug(`Firestore (${Te}): ${n}`,...e)}}function Mt(n,...t){if(Wt.logLevel<=B.ERROR){const e=t.map(mi);Wt.error(`Firestore (${Te}): ${n}`,...e)}}function Ie(n,...t){if(Wt.logLevel<=B.WARN){const e=t.map(mi);Wt.warn(`Firestore (${Te}): ${n}`,...e)}}function mi(n){if(typeof n=="string")return n;try{/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/return function(e){return JSON.stringify(e)}(n)}catch{return n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function x(n="Unexpected state"){const t=`FIRESTORE (${Te}) INTERNAL ASSERTION FAILED: `+n;throw Mt(t),new Error(t)}function G(n,t){n||x()}function L(n,t){return n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const b={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class O extends jt{constructor(t,e){super(t,e),this.code=t,this.message=e,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ae{constructor(){this.promise=new Promise((t,e)=>{this.resolve=t,this.reject=e})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Go{constructor(t,e){this.user=e,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${t}`)}}class Pd{getToken(){return Promise.resolve(null)}invalidateToken(){}start(t,e){t.enqueueRetryable(()=>e(ft.UNAUTHENTICATED))}shutdown(){}}class Cd{constructor(t){this.token=t,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(t,e){this.changeListener=e,t.enqueueRetryable(()=>e(this.token.user))}shutdown(){this.changeListener=null}}class Vd{constructor(t){this.t=t,this.currentUser=ft.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(t,e){let r=this.i;const i=h=>this.i!==r?(r=this.i,e(h)):Promise.resolve();let o=new ae;this.o=()=>{this.i++,this.currentUser=this.u(),o.resolve(),o=new ae,t.enqueueRetryable(()=>i(this.currentUser))};const a=()=>{const h=o;t.enqueueRetryable(async()=>{await h.promise,await i(this.currentUser)})},u=h=>{D("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=h,this.auth.addAuthTokenListener(this.o),a()};this.t.onInit(h=>u(h)),setTimeout(()=>{if(!this.auth){const h=this.t.getImmediate({optional:!0});h?u(h):(D("FirebaseAuthCredentialsProvider","Auth not yet detected"),o.resolve(),o=new ae)}},0),a()}getToken(){const t=this.i,e=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(e).then(r=>this.i!==t?(D("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(G(typeof r.accessToken=="string"),new Go(r.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.auth.removeAuthTokenListener(this.o)}u(){const t=this.auth&&this.auth.getUid();return G(t===null||typeof t=="string"),new ft(t)}}class kd{constructor(t,e,r){this.l=t,this.h=e,this.P=r,this.type="FirstParty",this.user=ft.FIRST_PARTY,this.I=new Map}T(){return this.P?this.P():null}get headers(){this.I.set("X-Goog-AuthUser",this.l);const t=this.T();return t&&this.I.set("Authorization",t),this.h&&this.I.set("X-Goog-Iam-Authorization-Token",this.h),this.I}}class Dd{constructor(t,e,r){this.l=t,this.h=e,this.P=r}getToken(){return Promise.resolve(new kd(this.l,this.h,this.P))}start(t,e){t.enqueueRetryable(()=>e(ft.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class Nd{constructor(t){this.value=t,this.type="AppCheck",this.headers=new Map,t&&t.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class Od{constructor(t){this.A=t,this.forceRefresh=!1,this.appCheck=null,this.R=null}start(t,e){const r=o=>{o.error!=null&&D("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${o.error.message}`);const a=o.token!==this.R;return this.R=o.token,D("FirebaseAppCheckTokenProvider",`Received ${a?"new":"existing"} token.`),a?e(o.token):Promise.resolve()};this.o=o=>{t.enqueueRetryable(()=>r(o))};const i=o=>{D("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=o,this.appCheck.addTokenListener(this.o)};this.A.onInit(o=>i(o)),setTimeout(()=>{if(!this.appCheck){const o=this.A.getImmediate({optional:!0});o?i(o):D("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){const t=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(t).then(e=>e?(G(typeof e.token=="string"),this.R=e.token,new Nd(e.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.appCheck.removeTokenListener(this.o)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Md(n){const t=typeof self<"u"&&(self.crypto||self.msCrypto),e=new Uint8Array(n);if(t&&typeof t.getRandomValues=="function")t.getRandomValues(e);else for(let r=0;r<n;r++)e[r]=Math.floor(256*Math.random());return e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qo{static newId(){const t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",e=Math.floor(256/t.length)*t.length;let r="";for(;r.length<20;){const i=Md(40);for(let o=0;o<i.length;++o)r.length<20&&i[o]<e&&(r+=t.charAt(i[o]%t.length))}return r}}function H(n,t){return n<t?-1:n>t?1:0}function we(n,t,e){return n.length===t.length&&n.every((r,i)=>e(r,t[i]))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class it{constructor(t,e){if(this.seconds=t,this.nanoseconds=e,e<0)throw new O(b.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+e);if(e>=1e9)throw new O(b.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+e);if(t<-62135596800)throw new O(b.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t);if(t>=253402300800)throw new O(b.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t)}static now(){return it.fromMillis(Date.now())}static fromDate(t){return it.fromMillis(t.getTime())}static fromMillis(t){const e=Math.floor(t/1e3),r=Math.floor(1e6*(t-1e3*e));return new it(e,r)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/1e6}_compareTo(t){return this.seconds===t.seconds?H(this.nanoseconds,t.nanoseconds):H(this.seconds,t.seconds)}isEqual(t){return t.seconds===this.seconds&&t.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){const t=this.seconds- -62135596800;return String(t).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class F{constructor(t){this.timestamp=t}static fromTimestamp(t){return new F(t)}static min(){return new F(new it(0,0))}static max(){return new F(new it(253402300799,999999999))}compareTo(t){return this.timestamp._compareTo(t.timestamp)}isEqual(t){return this.timestamp.isEqual(t.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xe{constructor(t,e,r){e===void 0?e=0:e>t.length&&x(),r===void 0?r=t.length-e:r>t.length-e&&x(),this.segments=t,this.offset=e,this.len=r}get length(){return this.len}isEqual(t){return Xe.comparator(this,t)===0}child(t){const e=this.segments.slice(this.offset,this.limit());return t instanceof Xe?t.forEach(r=>{e.push(r)}):e.push(t),this.construct(e)}limit(){return this.offset+this.length}popFirst(t){return t=t===void 0?1:t,this.construct(this.segments,this.offset+t,this.length-t)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(t){return this.segments[this.offset+t]}isEmpty(){return this.length===0}isPrefixOf(t){if(t.length<this.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}isImmediateParentOf(t){if(this.length+1!==t.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}forEach(t){for(let e=this.offset,r=this.limit();e<r;e++)t(this.segments[e])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(t,e){const r=Math.min(t.length,e.length);for(let i=0;i<r;i++){const o=t.get(i),a=e.get(i);if(o<a)return-1;if(o>a)return 1}return t.length<e.length?-1:t.length>e.length?1:0}}class J extends Xe{construct(t,e,r){return new J(t,e,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...t){const e=[];for(const r of t){if(r.indexOf("//")>=0)throw new O(b.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);e.push(...r.split("/").filter(i=>i.length>0))}return new J(e)}static emptyPath(){return new J([])}}const xd=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class at extends Xe{construct(t,e,r){return new at(t,e,r)}static isValidIdentifier(t){return xd.test(t)}canonicalString(){return this.toArray().map(t=>(t=t.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),at.isValidIdentifier(t)||(t="`"+t+"`"),t)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)==="__name__"}static keyField(){return new at(["__name__"])}static fromServerFormat(t){const e=[];let r="",i=0;const o=()=>{if(r.length===0)throw new O(b.INVALID_ARGUMENT,`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);e.push(r),r=""};let a=!1;for(;i<t.length;){const u=t[i];if(u==="\\"){if(i+1===t.length)throw new O(b.INVALID_ARGUMENT,"Path has trailing escape character: "+t);const h=t[i+1];if(h!=="\\"&&h!=="."&&h!=="`")throw new O(b.INVALID_ARGUMENT,"Path has invalid escape sequence: "+t);r+=h,i+=2}else u==="`"?(a=!a,i++):u!=="."||a?(r+=u,i++):(o(),i++)}if(o(),a)throw new O(b.INVALID_ARGUMENT,"Unterminated ` in path: "+t);return new at(e)}static emptyPath(){return new at([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class M{constructor(t){this.path=t}static fromPath(t){return new M(J.fromString(t))}static fromName(t){return new M(J.fromString(t).popFirst(5))}static empty(){return new M(J.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(t){return this.path.length>=2&&this.path.get(this.path.length-2)===t}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(t){return t!==null&&J.comparator(this.path,t.path)===0}toString(){return this.path.toString()}static comparator(t,e){return J.comparator(t.path,e.path)}static isDocumentKey(t){return t.length%2==0}static fromSegments(t){return new M(new J(t.slice()))}}function Ld(n,t){const e=n.toTimestamp().seconds,r=n.toTimestamp().nanoseconds+1,i=F.fromTimestamp(r===1e9?new it(e+1,0):new it(e,r));return new Gt(i,M.empty(),t)}function Fd(n){return new Gt(n.readTime,n.key,-1)}class Gt{constructor(t,e,r){this.readTime=t,this.documentKey=e,this.largestBatchId=r}static min(){return new Gt(F.min(),M.empty(),-1)}static max(){return new Gt(F.max(),M.empty(),-1)}}function Ud(n,t){let e=n.readTime.compareTo(t.readTime);return e!==0?e:(e=M.comparator(n.documentKey,t.documentKey),e!==0?e:H(n.largestBatchId,t.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Bd="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class jd{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(t){this.onCommittedListeners.push(t)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(t=>t())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ye(n){if(n.code!==b.FAILED_PRECONDITION||n.message!==Bd)throw n;D("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class S{constructor(t){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,t(e=>{this.isDone=!0,this.result=e,this.nextCallback&&this.nextCallback(e)},e=>{this.isDone=!0,this.error=e,this.catchCallback&&this.catchCallback(e)})}catch(t){return this.next(void 0,t)}next(t,e){return this.callbackAttached&&x(),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(e,this.error):this.wrapSuccess(t,this.result):new S((r,i)=>{this.nextCallback=o=>{this.wrapSuccess(t,o).next(r,i)},this.catchCallback=o=>{this.wrapFailure(e,o).next(r,i)}})}toPromise(){return new Promise((t,e)=>{this.next(t,e)})}wrapUserFunction(t){try{const e=t();return e instanceof S?e:S.resolve(e)}catch(e){return S.reject(e)}}wrapSuccess(t,e){return t?this.wrapUserFunction(()=>t(e)):S.resolve(e)}wrapFailure(t,e){return t?this.wrapUserFunction(()=>t(e)):S.reject(e)}static resolve(t){return new S((e,r)=>{e(t)})}static reject(t){return new S((e,r)=>{r(t)})}static waitFor(t){return new S((e,r)=>{let i=0,o=0,a=!1;t.forEach(u=>{++i,u.next(()=>{++o,a&&o===i&&e()},h=>r(h))}),a=!0,o===i&&e()})}static or(t){let e=S.resolve(!1);for(const r of t)e=e.next(i=>i?S.resolve(i):r());return e}static forEach(t,e){const r=[];return t.forEach((i,o)=>{r.push(e.call(this,i,o))}),this.waitFor(r)}static mapArray(t,e){return new S((r,i)=>{const o=t.length,a=new Array(o);let u=0;for(let h=0;h<o;h++){const f=h;e(t[f]).next(m=>{a[f]=m,++u,u===o&&r(a)},m=>i(m))}})}static doWhile(t,e){return new S((r,i)=>{const o=()=>{t()===!0?e().next(()=>{o()},i):r()};o()})}}function qd(n){const t=n.match(/Android ([\d.]+)/i),e=t?t[1].split(".").slice(0,2).join("."):"-1";return Number(e)}function Je(n){return n.name==="IndexedDbTransactionError"}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gi{constructor(t,e){this.previousValue=t,e&&(e.sequenceNumberHandler=r=>this.ie(r),this.se=r=>e.writeSequenceNumber(r))}ie(t){return this.previousValue=Math.max(t,this.previousValue),this.previousValue}next(){const t=++this.previousValue;return this.se&&this.se(t),t}}gi.oe=-1;function er(n){return n==null}function nr(n){return n===0&&1/n==-1/0}function $d(n){return typeof n=="number"&&Number.isInteger(n)&&!nr(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Xo(n){let t=0;for(const e in n)Object.prototype.hasOwnProperty.call(n,e)&&t++;return t}function Ae(n,t){for(const e in n)Object.prototype.hasOwnProperty.call(n,e)&&t(e,n[e])}function Yo(n){for(const t in n)if(Object.prototype.hasOwnProperty.call(n,t))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Y{constructor(t,e){this.comparator=t,this.root=e||ct.EMPTY}insert(t,e){return new Y(this.comparator,this.root.insert(t,e,this.comparator).copy(null,null,ct.BLACK,null,null))}remove(t){return new Y(this.comparator,this.root.remove(t,this.comparator).copy(null,null,ct.BLACK,null,null))}get(t){let e=this.root;for(;!e.isEmpty();){const r=this.comparator(t,e.key);if(r===0)return e.value;r<0?e=e.left:r>0&&(e=e.right)}return null}indexOf(t){let e=0,r=this.root;for(;!r.isEmpty();){const i=this.comparator(t,r.key);if(i===0)return e+r.left.size;i<0?r=r.left:(e+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(t){return this.root.inorderTraversal(t)}forEach(t){this.inorderTraversal((e,r)=>(t(e,r),!1))}toString(){const t=[];return this.inorderTraversal((e,r)=>(t.push(`${e}:${r}`),!1)),`{${t.join(", ")}}`}reverseTraversal(t){return this.root.reverseTraversal(t)}getIterator(){return new rr(this.root,null,this.comparator,!1)}getIteratorFrom(t){return new rr(this.root,t,this.comparator,!1)}getReverseIterator(){return new rr(this.root,null,this.comparator,!0)}getReverseIteratorFrom(t){return new rr(this.root,t,this.comparator,!0)}}class rr{constructor(t,e,r,i){this.isReverse=i,this.nodeStack=[];let o=1;for(;!t.isEmpty();)if(o=e?r(t.key,e):1,e&&i&&(o*=-1),o<0)t=this.isReverse?t.left:t.right;else{if(o===0){this.nodeStack.push(t);break}this.nodeStack.push(t),t=this.isReverse?t.right:t.left}}getNext(){let t=this.nodeStack.pop();const e={key:t.key,value:t.value};if(this.isReverse)for(t=t.left;!t.isEmpty();)this.nodeStack.push(t),t=t.right;else for(t=t.right;!t.isEmpty();)this.nodeStack.push(t),t=t.left;return e}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const t=this.nodeStack[this.nodeStack.length-1];return{key:t.key,value:t.value}}}class ct{constructor(t,e,r,i,o){this.key=t,this.value=e,this.color=r??ct.RED,this.left=i??ct.EMPTY,this.right=o??ct.EMPTY,this.size=this.left.size+1+this.right.size}copy(t,e,r,i,o){return new ct(t??this.key,e??this.value,r??this.color,i??this.left,o??this.right)}isEmpty(){return!1}inorderTraversal(t){return this.left.inorderTraversal(t)||t(this.key,this.value)||this.right.inorderTraversal(t)}reverseTraversal(t){return this.right.reverseTraversal(t)||t(this.key,this.value)||this.left.reverseTraversal(t)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(t,e,r){let i=this;const o=r(t,i.key);return i=o<0?i.copy(null,null,null,i.left.insert(t,e,r),null):o===0?i.copy(null,e,null,null,null):i.copy(null,null,null,null,i.right.insert(t,e,r)),i.fixUp()}removeMin(){if(this.left.isEmpty())return ct.EMPTY;let t=this;return t.left.isRed()||t.left.left.isRed()||(t=t.moveRedLeft()),t=t.copy(null,null,null,t.left.removeMin(),null),t.fixUp()}remove(t,e){let r,i=this;if(e(t,i.key)<0)i.left.isEmpty()||i.left.isRed()||i.left.left.isRed()||(i=i.moveRedLeft()),i=i.copy(null,null,null,i.left.remove(t,e),null);else{if(i.left.isRed()&&(i=i.rotateRight()),i.right.isEmpty()||i.right.isRed()||i.right.left.isRed()||(i=i.moveRedRight()),e(t,i.key)===0){if(i.right.isEmpty())return ct.EMPTY;r=i.right.min(),i=i.copy(r.key,r.value,null,null,i.right.removeMin())}i=i.copy(null,null,null,null,i.right.remove(t,e))}return i.fixUp()}isRed(){return this.color}fixUp(){let t=this;return t.right.isRed()&&!t.left.isRed()&&(t=t.rotateLeft()),t.left.isRed()&&t.left.left.isRed()&&(t=t.rotateRight()),t.left.isRed()&&t.right.isRed()&&(t=t.colorFlip()),t}moveRedLeft(){let t=this.colorFlip();return t.right.left.isRed()&&(t=t.copy(null,null,null,null,t.right.rotateRight()),t=t.rotateLeft(),t=t.colorFlip()),t}moveRedRight(){let t=this.colorFlip();return t.left.left.isRed()&&(t=t.rotateRight(),t=t.colorFlip()),t}rotateLeft(){const t=this.copy(null,null,ct.RED,null,this.right.left);return this.right.copy(null,null,this.color,t,null)}rotateRight(){const t=this.copy(null,null,ct.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,t)}colorFlip(){const t=this.left.copy(null,null,!this.left.color,null,null),e=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,t,e)}checkMaxDepth(){const t=this.check();return Math.pow(2,t)<=this.size+1}check(){if(this.isRed()&&this.left.isRed()||this.right.isRed())throw x();const t=this.left.check();if(t!==this.right.check())throw x();return t+(this.isRed()?0:1)}}ct.EMPTY=null,ct.RED=!0,ct.BLACK=!1,ct.EMPTY=new class{constructor(){this.size=0}get key(){throw x()}get value(){throw x()}get color(){throw x()}get left(){throw x()}get right(){throw x()}copy(t,e,r,i,o){return this}insert(t,e,r){return new ct(t,e)}remove(t,e){return this}isEmpty(){return!0}inorderTraversal(t){return!1}reverseTraversal(t){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ut{constructor(t){this.comparator=t,this.data=new Y(this.comparator)}has(t){return this.data.get(t)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(t){return this.data.indexOf(t)}forEach(t){this.data.inorderTraversal((e,r)=>(t(e),!1))}forEachInRange(t,e){const r=this.data.getIteratorFrom(t[0]);for(;r.hasNext();){const i=r.getNext();if(this.comparator(i.key,t[1])>=0)return;e(i.key)}}forEachWhile(t,e){let r;for(r=e!==void 0?this.data.getIteratorFrom(e):this.data.getIterator();r.hasNext();)if(!t(r.getNext().key))return}firstAfterOrEqual(t){const e=this.data.getIteratorFrom(t);return e.hasNext()?e.getNext().key:null}getIterator(){return new Jo(this.data.getIterator())}getIteratorFrom(t){return new Jo(this.data.getIteratorFrom(t))}add(t){return this.copy(this.data.remove(t).insert(t,!0))}delete(t){return this.has(t)?this.copy(this.data.remove(t)):this}isEmpty(){return this.data.isEmpty()}unionWith(t){let e=this;return e.size<t.size&&(e=t,t=this),t.forEach(r=>{e=e.add(r)}),e}isEqual(t){if(!(t instanceof ut)||this.size!==t.size)return!1;const e=this.data.getIterator(),r=t.data.getIterator();for(;e.hasNext();){const i=e.getNext().key,o=r.getNext().key;if(this.comparator(i,o)!==0)return!1}return!0}toArray(){const t=[];return this.forEach(e=>{t.push(e)}),t}toString(){const t=[];return this.forEach(e=>t.push(e)),"SortedSet("+t.toString()+")"}copy(t){const e=new ut(this.comparator);return e.data=t,e}}class Jo{constructor(t){this.iter=t}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ct{constructor(t){this.fields=t,t.sort(at.comparator)}static empty(){return new Ct([])}unionWith(t){let e=new ut(at.comparator);for(const r of this.fields)e=e.add(r);for(const r of t)e=e.add(r);return new Ct(e.toArray())}covers(t){for(const e of this.fields)if(e.isPrefixOf(t))return!0;return!1}isEqual(t){return we(this.fields,t.fields,(e,r)=>e.isEqual(r))}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zo extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lt{constructor(t){this.binaryString=t}static fromBase64String(t){const e=function(i){try{return atob(i)}catch(o){throw typeof DOMException<"u"&&o instanceof DOMException?new Zo("Invalid base64 string: "+o):o}}(t);return new lt(e)}static fromUint8Array(t){const e=function(i){let o="";for(let a=0;a<i.length;++a)o+=String.fromCharCode(i[a]);return o}(t);return new lt(e)}[Symbol.iterator](){let t=0;return{next:()=>t<this.binaryString.length?{value:this.binaryString.charCodeAt(t++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(e){return btoa(e)}(this.binaryString)}toUint8Array(){return function(e){const r=new Uint8Array(e.length);for(let i=0;i<e.length;i++)r[i]=e.charCodeAt(i);return r}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(t){return H(this.binaryString,t.binaryString)}isEqual(t){return this.binaryString===t.binaryString}}lt.EMPTY_BYTE_STRING=new lt("");const zd=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function Qt(n){if(G(!!n),typeof n=="string"){let t=0;const e=zd.exec(n);if(G(!!e),e[1]){let i=e[1];i=(i+"000000000").substr(0,9),t=Number(i)}const r=new Date(n);return{seconds:Math.floor(r.getTime()/1e3),nanos:t}}return{seconds:nt(n.seconds),nanos:nt(n.nanos)}}function nt(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function ce(n){return typeof n=="string"?lt.fromBase64String(n):lt.fromUint8Array(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _i(n){var t,e;return((e=(((t=n==null?void 0:n.mapValue)===null||t===void 0?void 0:t.fields)||{}).__type__)===null||e===void 0?void 0:e.stringValue)==="server_timestamp"}function yi(n){const t=n.mapValue.fields.__previous_value__;return _i(t)?yi(t):t}function Ze(n){const t=Qt(n.mapValue.fields.__local_write_time__.timestampValue);return new it(t.seconds,t.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hd{constructor(t,e,r,i,o,a,u,h,f){this.databaseId=t,this.appId=e,this.persistenceKey=r,this.host=i,this.ssl=o,this.forceLongPolling=a,this.autoDetectLongPolling=u,this.longPollingOptions=h,this.useFetchStreams=f}}class tn{constructor(t,e){this.projectId=t,this.database=e||"(default)"}static empty(){return new tn("","")}get isDefaultDatabase(){return this.database==="(default)"}isEqual(t){return t instanceof tn&&t.projectId===this.projectId&&t.database===this.database}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ir={mapValue:{fields:{__type__:{stringValue:"__max__"}}}};function ue(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?_i(n)?4:Kd(n)?9007199254740991:10:x()}function kt(n,t){if(n===t)return!0;const e=ue(n);if(e!==ue(t))return!1;switch(e){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===t.booleanValue;case 4:return Ze(n).isEqual(Ze(t));case 3:return function(i,o){if(typeof i.timestampValue=="string"&&typeof o.timestampValue=="string"&&i.timestampValue.length===o.timestampValue.length)return i.timestampValue===o.timestampValue;const a=Qt(i.timestampValue),u=Qt(o.timestampValue);return a.seconds===u.seconds&&a.nanos===u.nanos}(n,t);case 5:return n.stringValue===t.stringValue;case 6:return function(i,o){return ce(i.bytesValue).isEqual(ce(o.bytesValue))}(n,t);case 7:return n.referenceValue===t.referenceValue;case 8:return function(i,o){return nt(i.geoPointValue.latitude)===nt(o.geoPointValue.latitude)&&nt(i.geoPointValue.longitude)===nt(o.geoPointValue.longitude)}(n,t);case 2:return function(i,o){if("integerValue"in i&&"integerValue"in o)return nt(i.integerValue)===nt(o.integerValue);if("doubleValue"in i&&"doubleValue"in o){const a=nt(i.doubleValue),u=nt(o.doubleValue);return a===u?nr(a)===nr(u):isNaN(a)&&isNaN(u)}return!1}(n,t);case 9:return we(n.arrayValue.values||[],t.arrayValue.values||[],kt);case 10:return function(i,o){const a=i.mapValue.fields||{},u=o.mapValue.fields||{};if(Xo(a)!==Xo(u))return!1;for(const h in a)if(a.hasOwnProperty(h)&&(u[h]===void 0||!kt(a[h],u[h])))return!1;return!0}(n,t);default:return x()}}function en(n,t){return(n.values||[]).find(e=>kt(e,t))!==void 0}function Re(n,t){if(n===t)return 0;const e=ue(n),r=ue(t);if(e!==r)return H(e,r);switch(e){case 0:case 9007199254740991:return 0;case 1:return H(n.booleanValue,t.booleanValue);case 2:return function(o,a){const u=nt(o.integerValue||o.doubleValue),h=nt(a.integerValue||a.doubleValue);return u<h?-1:u>h?1:u===h?0:isNaN(u)?isNaN(h)?0:-1:1}(n,t);case 3:return ta(n.timestampValue,t.timestampValue);case 4:return ta(Ze(n),Ze(t));case 5:return H(n.stringValue,t.stringValue);case 6:return function(o,a){const u=ce(o),h=ce(a);return u.compareTo(h)}(n.bytesValue,t.bytesValue);case 7:return function(o,a){const u=o.split("/"),h=a.split("/");for(let f=0;f<u.length&&f<h.length;f++){const m=H(u[f],h[f]);if(m!==0)return m}return H(u.length,h.length)}(n.referenceValue,t.referenceValue);case 8:return function(o,a){const u=H(nt(o.latitude),nt(a.latitude));return u!==0?u:H(nt(o.longitude),nt(a.longitude))}(n.geoPointValue,t.geoPointValue);case 9:return function(o,a){const u=o.values||[],h=a.values||[];for(let f=0;f<u.length&&f<h.length;++f){const m=Re(u[f],h[f]);if(m)return m}return H(u.length,h.length)}(n.arrayValue,t.arrayValue);case 10:return function(o,a){if(o===ir.mapValue&&a===ir.mapValue)return 0;if(o===ir.mapValue)return 1;if(a===ir.mapValue)return-1;const u=o.fields||{},h=Object.keys(u),f=a.fields||{},m=Object.keys(f);h.sort(),m.sort();for(let I=0;I<h.length&&I<m.length;++I){const R=H(h[I],m[I]);if(R!==0)return R;const P=Re(u[h[I]],f[m[I]]);if(P!==0)return P}return H(h.length,m.length)}(n.mapValue,t.mapValue);default:throw x()}}function ta(n,t){if(typeof n=="string"&&typeof t=="string"&&n.length===t.length)return H(n,t);const e=Qt(n),r=Qt(t),i=H(e.seconds,r.seconds);return i!==0?i:H(e.nanos,r.nanos)}function Se(n){return vi(n)}function vi(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?function(e){const r=Qt(e);return`time(${r.seconds},${r.nanos})`}(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?function(e){return ce(e).toBase64()}(n.bytesValue):"referenceValue"in n?function(e){return M.fromName(e).toString()}(n.referenceValue):"geoPointValue"in n?function(e){return`geo(${e.latitude},${e.longitude})`}(n.geoPointValue):"arrayValue"in n?function(e){let r="[",i=!0;for(const o of e.values||[])i?i=!1:r+=",",r+=vi(o);return r+"]"}(n.arrayValue):"mapValue"in n?function(e){const r=Object.keys(e.fields||{}).sort();let i="{",o=!0;for(const a of r)o?o=!1:i+=",",i+=`${a}:${vi(e.fields[a])}`;return i+"}"}(n.mapValue):x()}function Ei(n){return!!n&&"integerValue"in n}function Ti(n){return!!n&&"arrayValue"in n}function ea(n){return!!n&&"nullValue"in n}function na(n){return!!n&&"doubleValue"in n&&isNaN(Number(n.doubleValue))}function sr(n){return!!n&&"mapValue"in n}function nn(n){if(n.geoPointValue)return{geoPointValue:Object.assign({},n.geoPointValue)};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:Object.assign({},n.timestampValue)};if(n.mapValue){const t={mapValue:{fields:{}}};return Ae(n.mapValue.fields,(e,r)=>t.mapValue.fields[e]=nn(r)),t}if(n.arrayValue){const t={arrayValue:{values:[]}};for(let e=0;e<(n.arrayValue.values||[]).length;++e)t.arrayValue.values[e]=nn(n.arrayValue.values[e]);return t}return Object.assign({},n)}function Kd(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue==="__max__"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class At{constructor(t){this.value=t}static empty(){return new At({mapValue:{}})}field(t){if(t.isEmpty())return this.value;{let e=this.value;for(let r=0;r<t.length-1;++r)if(e=(e.mapValue.fields||{})[t.get(r)],!sr(e))return null;return e=(e.mapValue.fields||{})[t.lastSegment()],e||null}}set(t,e){this.getFieldsMap(t.popLast())[t.lastSegment()]=nn(e)}setAll(t){let e=at.emptyPath(),r={},i=[];t.forEach((a,u)=>{if(!e.isImmediateParentOf(u)){const h=this.getFieldsMap(e);this.applyChanges(h,r,i),r={},i=[],e=u.popLast()}a?r[u.lastSegment()]=nn(a):i.push(u.lastSegment())});const o=this.getFieldsMap(e);this.applyChanges(o,r,i)}delete(t){const e=this.field(t.popLast());sr(e)&&e.mapValue.fields&&delete e.mapValue.fields[t.lastSegment()]}isEqual(t){return kt(this.value,t.value)}getFieldsMap(t){let e=this.value;e.mapValue.fields||(e.mapValue={fields:{}});for(let r=0;r<t.length;++r){let i=e.mapValue.fields[t.get(r)];sr(i)&&i.mapValue.fields||(i={mapValue:{fields:{}}},e.mapValue.fields[t.get(r)]=i),e=i}return e.mapValue.fields}applyChanges(t,e,r){Ae(e,(i,o)=>t[i]=o);for(const i of r)delete t[i]}clone(){return new At(nn(this.value))}}function ra(n){const t=[];return Ae(n.fields,(e,r)=>{const i=new at([e]);if(sr(r)){const o=ra(r.mapValue).fields;if(o.length===0)t.push(i);else for(const a of o)t.push(i.child(a))}else t.push(i)}),new Ct(t)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pt{constructor(t,e,r,i,o,a,u){this.key=t,this.documentType=e,this.version=r,this.readTime=i,this.createTime=o,this.data=a,this.documentState=u}static newInvalidDocument(t){return new pt(t,0,F.min(),F.min(),F.min(),At.empty(),0)}static newFoundDocument(t,e,r,i){return new pt(t,1,e,F.min(),r,i,0)}static newNoDocument(t,e){return new pt(t,2,e,F.min(),F.min(),At.empty(),0)}static newUnknownDocument(t,e){return new pt(t,3,e,F.min(),F.min(),At.empty(),2)}convertToFoundDocument(t,e){return!this.createTime.isEqual(F.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=t),this.version=t,this.documentType=1,this.data=e,this.documentState=0,this}convertToNoDocument(t){return this.version=t,this.documentType=2,this.data=At.empty(),this.documentState=0,this}convertToUnknownDocument(t){return this.version=t,this.documentType=3,this.data=At.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=F.min(),this}setReadTime(t){return this.readTime=t,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(t){return t instanceof pt&&this.key.isEqual(t.key)&&this.version.isEqual(t.version)&&this.documentType===t.documentType&&this.documentState===t.documentState&&this.data.isEqual(t.data)}mutableCopy(){return new pt(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class or{constructor(t,e){this.position=t,this.inclusive=e}}function ia(n,t,e){let r=0;for(let i=0;i<n.position.length;i++){const o=t[i],a=n.position[i];if(o.field.isKeyField()?r=M.comparator(M.fromName(a.referenceValue),e.key):r=Re(a,e.data.field(o.field)),o.dir==="desc"&&(r*=-1),r!==0)break}return r}function sa(n,t){if(n===null)return t===null;if(t===null||n.inclusive!==t.inclusive||n.position.length!==t.position.length)return!1;for(let e=0;e<n.position.length;e++)if(!kt(n.position[e],t.position[e]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ar{constructor(t,e="asc"){this.field=t,this.dir=e}}function Wd(n,t){return n.dir===t.dir&&n.field.isEqual(t.field)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oa{}class st extends oa{constructor(t,e,r){super(),this.field=t,this.op=e,this.value=r}static create(t,e,r){return t.isKeyField()?e==="in"||e==="not-in"?this.createKeyFieldInFilter(t,e,r):new Qd(t,e,r):e==="array-contains"?new Jd(t,r):e==="in"?new Zd(t,r):e==="not-in"?new tf(t,r):e==="array-contains-any"?new ef(t,r):new st(t,e,r)}static createKeyFieldInFilter(t,e,r){return e==="in"?new Xd(t,r):new Yd(t,r)}matches(t){const e=t.data.field(this.field);return this.op==="!="?e!==null&&this.matchesComparison(Re(e,this.value)):e!==null&&ue(this.value)===ue(e)&&this.matchesComparison(Re(e,this.value))}matchesComparison(t){switch(this.op){case"<":return t<0;case"<=":return t<=0;case"==":return t===0;case"!=":return t!==0;case">":return t>0;case">=":return t>=0;default:return x()}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class Dt extends oa{constructor(t,e){super(),this.filters=t,this.op=e,this.ae=null}static create(t,e){return new Dt(t,e)}matches(t){return aa(this)?this.filters.find(e=>!e.matches(t))===void 0:this.filters.find(e=>e.matches(t))!==void 0}getFlattenedFilters(){return this.ae!==null||(this.ae=this.filters.reduce((t,e)=>t.concat(e.getFlattenedFilters()),[])),this.ae}getFilters(){return Object.assign([],this.filters)}}function aa(n){return n.op==="and"}function ca(n){return Gd(n)&&aa(n)}function Gd(n){for(const t of n.filters)if(t instanceof Dt)return!1;return!0}function Ii(n){if(n instanceof st)return n.field.canonicalString()+n.op.toString()+Se(n.value);if(ca(n))return n.filters.map(t=>Ii(t)).join(",");{const t=n.filters.map(e=>Ii(e)).join(",");return`${n.op}(${t})`}}function ua(n,t){return n instanceof st?function(r,i){return i instanceof st&&r.op===i.op&&r.field.isEqual(i.field)&&kt(r.value,i.value)}(n,t):n instanceof Dt?function(r,i){return i instanceof Dt&&r.op===i.op&&r.filters.length===i.filters.length?r.filters.reduce((o,a,u)=>o&&ua(a,i.filters[u]),!0):!1}(n,t):void x()}function la(n){return n instanceof st?function(e){return`${e.field.canonicalString()} ${e.op} ${Se(e.value)}`}(n):n instanceof Dt?function(e){return e.op.toString()+" {"+e.getFilters().map(la).join(" ,")+"}"}(n):"Filter"}class Qd extends st{constructor(t,e,r){super(t,e,r),this.key=M.fromName(r.referenceValue)}matches(t){const e=M.comparator(t.key,this.key);return this.matchesComparison(e)}}class Xd extends st{constructor(t,e){super(t,"in",e),this.keys=ha("in",e)}matches(t){return this.keys.some(e=>e.isEqual(t.key))}}class Yd extends st{constructor(t,e){super(t,"not-in",e),this.keys=ha("not-in",e)}matches(t){return!this.keys.some(e=>e.isEqual(t.key))}}function ha(n,t){var e;return(((e=t.arrayValue)===null||e===void 0?void 0:e.values)||[]).map(r=>M.fromName(r.referenceValue))}class Jd extends st{constructor(t,e){super(t,"array-contains",e)}matches(t){const e=t.data.field(this.field);return Ti(e)&&en(e.arrayValue,this.value)}}class Zd extends st{constructor(t,e){super(t,"in",e)}matches(t){const e=t.data.field(this.field);return e!==null&&en(this.value.arrayValue,e)}}class tf extends st{constructor(t,e){super(t,"not-in",e)}matches(t){if(en(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const e=t.data.field(this.field);return e!==null&&!en(this.value.arrayValue,e)}}class ef extends st{constructor(t,e){super(t,"array-contains-any",e)}matches(t){const e=t.data.field(this.field);return!(!Ti(e)||!e.arrayValue.values)&&e.arrayValue.values.some(r=>en(this.value.arrayValue,r))}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nf{constructor(t,e=null,r=[],i=[],o=null,a=null,u=null){this.path=t,this.collectionGroup=e,this.orderBy=r,this.filters=i,this.limit=o,this.startAt=a,this.endAt=u,this.ue=null}}function da(n,t=null,e=[],r=[],i=null,o=null,a=null){return new nf(n,t,e,r,i,o,a)}function wi(n){const t=L(n);if(t.ue===null){let e=t.path.canonicalString();t.collectionGroup!==null&&(e+="|cg:"+t.collectionGroup),e+="|f:",e+=t.filters.map(r=>Ii(r)).join(","),e+="|ob:",e+=t.orderBy.map(r=>function(o){return o.field.canonicalString()+o.dir}(r)).join(","),er(t.limit)||(e+="|l:",e+=t.limit),t.startAt&&(e+="|lb:",e+=t.startAt.inclusive?"b:":"a:",e+=t.startAt.position.map(r=>Se(r)).join(",")),t.endAt&&(e+="|ub:",e+=t.endAt.inclusive?"a:":"b:",e+=t.endAt.position.map(r=>Se(r)).join(",")),t.ue=e}return t.ue}function Ai(n,t){if(n.limit!==t.limit||n.orderBy.length!==t.orderBy.length)return!1;for(let e=0;e<n.orderBy.length;e++)if(!Wd(n.orderBy[e],t.orderBy[e]))return!1;if(n.filters.length!==t.filters.length)return!1;for(let e=0;e<n.filters.length;e++)if(!ua(n.filters[e],t.filters[e]))return!1;return n.collectionGroup===t.collectionGroup&&!!n.path.isEqual(t.path)&&!!sa(n.startAt,t.startAt)&&sa(n.endAt,t.endAt)}function Ri(n){return M.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cr{constructor(t,e=null,r=[],i=[],o=null,a="F",u=null,h=null){this.path=t,this.collectionGroup=e,this.explicitOrderBy=r,this.filters=i,this.limit=o,this.limitType=a,this.startAt=u,this.endAt=h,this.ce=null,this.le=null,this.he=null,this.startAt,this.endAt}}function rf(n,t,e,r,i,o,a,u){return new cr(n,t,e,r,i,o,a,u)}function Si(n){return new cr(n)}function fa(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function sf(n){return n.collectionGroup!==null}function rn(n){const t=L(n);if(t.ce===null){t.ce=[];const e=new Set;for(const o of t.explicitOrderBy)t.ce.push(o),e.add(o.field.canonicalString());const r=t.explicitOrderBy.length>0?t.explicitOrderBy[t.explicitOrderBy.length-1].dir:"asc";(function(a){let u=new ut(at.comparator);return a.filters.forEach(h=>{h.getFlattenedFilters().forEach(f=>{f.isInequality()&&(u=u.add(f.field))})}),u})(t).forEach(o=>{e.has(o.canonicalString())||o.isKeyField()||t.ce.push(new ar(o,r))}),e.has(at.keyField().canonicalString())||t.ce.push(new ar(at.keyField(),r))}return t.ce}function Nt(n){const t=L(n);return t.le||(t.le=of(t,rn(n))),t.le}function of(n,t){if(n.limitType==="F")return da(n.path,n.collectionGroup,t,n.filters,n.limit,n.startAt,n.endAt);{t=t.map(i=>{const o=i.dir==="desc"?"asc":"desc";return new ar(i.field,o)});const e=n.endAt?new or(n.endAt.position,n.endAt.inclusive):null,r=n.startAt?new or(n.startAt.position,n.startAt.inclusive):null;return da(n.path,n.collectionGroup,t,n.filters,n.limit,e,r)}}function bi(n,t,e){return new cr(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),t,e,n.startAt,n.endAt)}function ur(n,t){return Ai(Nt(n),Nt(t))&&n.limitType===t.limitType}function pa(n){return`${wi(Nt(n))}|lt:${n.limitType}`}function be(n){return`Query(target=${function(e){let r=e.path.canonicalString();return e.collectionGroup!==null&&(r+=" collectionGroup="+e.collectionGroup),e.filters.length>0&&(r+=`, filters: [${e.filters.map(i=>la(i)).join(", ")}]`),er(e.limit)||(r+=", limit: "+e.limit),e.orderBy.length>0&&(r+=`, orderBy: [${e.orderBy.map(i=>function(a){return`${a.field.canonicalString()} (${a.dir})`}(i)).join(", ")}]`),e.startAt&&(r+=", startAt: ",r+=e.startAt.inclusive?"b:":"a:",r+=e.startAt.position.map(i=>Se(i)).join(",")),e.endAt&&(r+=", endAt: ",r+=e.endAt.inclusive?"a:":"b:",r+=e.endAt.position.map(i=>Se(i)).join(",")),`Target(${r})`}(Nt(n))}; limitType=${n.limitType})`}function lr(n,t){return t.isFoundDocument()&&function(r,i){const o=i.key.path;return r.collectionGroup!==null?i.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(o):M.isDocumentKey(r.path)?r.path.isEqual(o):r.path.isImmediateParentOf(o)}(n,t)&&function(r,i){for(const o of rn(r))if(!o.field.isKeyField()&&i.data.field(o.field)===null)return!1;return!0}(n,t)&&function(r,i){for(const o of r.filters)if(!o.matches(i))return!1;return!0}(n,t)&&function(r,i){return!(r.startAt&&!function(a,u,h){const f=ia(a,u,h);return a.inclusive?f<=0:f<0}(r.startAt,rn(r),i)||r.endAt&&!function(a,u,h){const f=ia(a,u,h);return a.inclusive?f>=0:f>0}(r.endAt,rn(r),i))}(n,t)}function af(n){return n.collectionGroup||(n.path.length%2==1?n.path.lastSegment():n.path.get(n.path.length-2))}function ma(n){return(t,e)=>{let r=!1;for(const i of rn(n)){const o=cf(i,t,e);if(o!==0)return o;r=r||i.field.isKeyField()}return 0}}function cf(n,t,e){const r=n.field.isKeyField()?M.comparator(t.key,e.key):function(o,a,u){const h=a.data.field(o),f=u.data.field(o);return h!==null&&f!==null?Re(h,f):x()}(n.field,t,e);switch(n.dir){case"asc":return r;case"desc":return-1*r;default:return x()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pe{constructor(t,e){this.mapKeyFn=t,this.equalsFn=e,this.inner={},this.innerSize=0}get(t){const e=this.mapKeyFn(t),r=this.inner[e];if(r!==void 0){for(const[i,o]of r)if(this.equalsFn(i,t))return o}}has(t){return this.get(t)!==void 0}set(t,e){const r=this.mapKeyFn(t),i=this.inner[r];if(i===void 0)return this.inner[r]=[[t,e]],void this.innerSize++;for(let o=0;o<i.length;o++)if(this.equalsFn(i[o][0],t))return void(i[o]=[t,e]);i.push([t,e]),this.innerSize++}delete(t){const e=this.mapKeyFn(t),r=this.inner[e];if(r===void 0)return!1;for(let i=0;i<r.length;i++)if(this.equalsFn(r[i][0],t))return r.length===1?delete this.inner[e]:r.splice(i,1),this.innerSize--,!0;return!1}forEach(t){Ae(this.inner,(e,r)=>{for(const[i,o]of r)t(i,o)})}isEmpty(){return Yo(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const uf=new Y(M.comparator);function xt(){return uf}const ga=new Y(M.comparator);function sn(...n){let t=ga;for(const e of n)t=t.insert(e.key,e);return t}function _a(n){let t=ga;return n.forEach((e,r)=>t=t.insert(e,r.overlayedDocument)),t}function le(){return on()}function ya(){return on()}function on(){return new Pe(n=>n.toString(),(n,t)=>n.isEqual(t))}const lf=new Y(M.comparator),hf=new ut(M.comparator);function U(...n){let t=hf;for(const e of n)t=t.add(e);return t}const df=new ut(H);function ff(){return df}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function va(n,t){if(n.useProto3Json){if(isNaN(t))return{doubleValue:"NaN"};if(t===1/0)return{doubleValue:"Infinity"};if(t===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:nr(t)?"-0":t}}function Ea(n){return{integerValue:""+n}}function pf(n,t){return $d(t)?Ea(t):va(n,t)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hr{constructor(){this._=void 0}}function mf(n,t,e){return n instanceof an?function(i,o){const a={fields:{__type__:{stringValue:"server_timestamp"},__local_write_time__:{timestampValue:{seconds:i.seconds,nanos:i.nanoseconds}}}};return o&&_i(o)&&(o=yi(o)),o&&(a.fields.__previous_value__=o),{mapValue:a}}(e,t):n instanceof cn?Ia(n,t):n instanceof un?wa(n,t):function(i,o){const a=Ta(i,o),u=Aa(a)+Aa(i.Pe);return Ei(a)&&Ei(i.Pe)?Ea(u):va(i.serializer,u)}(n,t)}function gf(n,t,e){return n instanceof cn?Ia(n,t):n instanceof un?wa(n,t):e}function Ta(n,t){return n instanceof dr?function(r){return Ei(r)||function(o){return!!o&&"doubleValue"in o}(r)}(t)?t:{integerValue:0}:null}class an extends hr{}class cn extends hr{constructor(t){super(),this.elements=t}}function Ia(n,t){const e=Ra(t);for(const r of n.elements)e.some(i=>kt(i,r))||e.push(r);return{arrayValue:{values:e}}}class un extends hr{constructor(t){super(),this.elements=t}}function wa(n,t){let e=Ra(t);for(const r of n.elements)e=e.filter(i=>!kt(i,r));return{arrayValue:{values:e}}}class dr extends hr{constructor(t,e){super(),this.serializer=t,this.Pe=e}}function Aa(n){return nt(n.integerValue||n.doubleValue)}function Ra(n){return Ti(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _f{constructor(t,e){this.field=t,this.transform=e}}function yf(n,t){return n.field.isEqual(t.field)&&function(r,i){return r instanceof cn&&i instanceof cn||r instanceof un&&i instanceof un?we(r.elements,i.elements,kt):r instanceof dr&&i instanceof dr?kt(r.Pe,i.Pe):r instanceof an&&i instanceof an}(n.transform,t.transform)}class vf{constructor(t,e){this.version=t,this.transformResults=e}}class Lt{constructor(t,e){this.updateTime=t,this.exists=e}static none(){return new Lt}static exists(t){return new Lt(void 0,t)}static updateTime(t){return new Lt(t)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(t){return this.exists===t.exists&&(this.updateTime?!!t.updateTime&&this.updateTime.isEqual(t.updateTime):!t.updateTime)}}function fr(n,t){return n.updateTime!==void 0?t.isFoundDocument()&&t.version.isEqual(n.updateTime):n.exists===void 0||n.exists===t.isFoundDocument()}class pr{}function Sa(n,t){if(!n.hasLocalMutations||t&&t.fields.length===0)return null;if(t===null)return n.isNoDocument()?new ka(n.key,Lt.none()):new hn(n.key,n.data,Lt.none());{const e=n.data,r=At.empty();let i=new ut(at.comparator);for(let o of t.fields)if(!i.has(o)){let a=e.field(o);a===null&&o.length>1&&(o=o.popLast(),a=e.field(o)),a===null?r.delete(o):r.set(o,a),i=i.add(o)}return new he(n.key,r,new Ct(i.toArray()),Lt.none())}}function Ef(n,t,e){n instanceof hn?function(i,o,a){const u=i.value.clone(),h=Ca(i.fieldTransforms,o,a.transformResults);u.setAll(h),o.convertToFoundDocument(a.version,u).setHasCommittedMutations()}(n,t,e):n instanceof he?function(i,o,a){if(!fr(i.precondition,o))return void o.convertToUnknownDocument(a.version);const u=Ca(i.fieldTransforms,o,a.transformResults),h=o.data;h.setAll(Pa(i)),h.setAll(u),o.convertToFoundDocument(a.version,h).setHasCommittedMutations()}(n,t,e):function(i,o,a){o.convertToNoDocument(a.version).setHasCommittedMutations()}(0,t,e)}function ln(n,t,e,r){return n instanceof hn?function(o,a,u,h){if(!fr(o.precondition,a))return u;const f=o.value.clone(),m=Va(o.fieldTransforms,h,a);return f.setAll(m),a.convertToFoundDocument(a.version,f).setHasLocalMutations(),null}(n,t,e,r):n instanceof he?function(o,a,u,h){if(!fr(o.precondition,a))return u;const f=Va(o.fieldTransforms,h,a),m=a.data;return m.setAll(Pa(o)),m.setAll(f),a.convertToFoundDocument(a.version,m).setHasLocalMutations(),u===null?null:u.unionWith(o.fieldMask.fields).unionWith(o.fieldTransforms.map(I=>I.field))}(n,t,e,r):function(o,a,u){return fr(o.precondition,a)?(a.convertToNoDocument(a.version).setHasLocalMutations(),null):u}(n,t,e)}function Tf(n,t){let e=null;for(const r of n.fieldTransforms){const i=t.data.field(r.field),o=Ta(r.transform,i||null);o!=null&&(e===null&&(e=At.empty()),e.set(r.field,o))}return e||null}function ba(n,t){return n.type===t.type&&!!n.key.isEqual(t.key)&&!!n.precondition.isEqual(t.precondition)&&!!function(r,i){return r===void 0&&i===void 0||!(!r||!i)&&we(r,i,(o,a)=>yf(o,a))}(n.fieldTransforms,t.fieldTransforms)&&(n.type===0?n.value.isEqual(t.value):n.type!==1||n.data.isEqual(t.data)&&n.fieldMask.isEqual(t.fieldMask))}class hn extends pr{constructor(t,e,r,i=[]){super(),this.key=t,this.value=e,this.precondition=r,this.fieldTransforms=i,this.type=0}getFieldMask(){return null}}class he extends pr{constructor(t,e,r,i,o=[]){super(),this.key=t,this.data=e,this.fieldMask=r,this.precondition=i,this.fieldTransforms=o,this.type=1}getFieldMask(){return this.fieldMask}}function Pa(n){const t=new Map;return n.fieldMask.fields.forEach(e=>{if(!e.isEmpty()){const r=n.data.field(e);t.set(e,r)}}),t}function Ca(n,t,e){const r=new Map;G(n.length===e.length);for(let i=0;i<e.length;i++){const o=n[i],a=o.transform,u=t.data.field(o.field);r.set(o.field,gf(a,u,e[i]))}return r}function Va(n,t,e){const r=new Map;for(const i of n){const o=i.transform,a=e.data.field(i.field);r.set(i.field,mf(o,a,t))}return r}class ka extends pr{constructor(t,e){super(),this.key=t,this.precondition=e,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class If extends pr{constructor(t,e){super(),this.key=t,this.precondition=e,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wf{constructor(t,e,r,i){this.batchId=t,this.localWriteTime=e,this.baseMutations=r,this.mutations=i}applyToRemoteDocument(t,e){const r=e.mutationResults;for(let i=0;i<this.mutations.length;i++){const o=this.mutations[i];o.key.isEqual(t.key)&&Ef(o,t,r[i])}}applyToLocalView(t,e){for(const r of this.baseMutations)r.key.isEqual(t.key)&&(e=ln(r,t,e,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(t.key)&&(e=ln(r,t,e,this.localWriteTime));return e}applyToLocalDocumentSet(t,e){const r=ya();return this.mutations.forEach(i=>{const o=t.get(i.key),a=o.overlayedDocument;let u=this.applyToLocalView(a,o.mutatedFields);u=e.has(i.key)?null:u;const h=Sa(a,u);h!==null&&r.set(i.key,h),a.isValidDocument()||a.convertToNoDocument(F.min())}),r}keys(){return this.mutations.reduce((t,e)=>t.add(e.key),U())}isEqual(t){return this.batchId===t.batchId&&we(this.mutations,t.mutations,(e,r)=>ba(e,r))&&we(this.baseMutations,t.baseMutations,(e,r)=>ba(e,r))}}class Pi{constructor(t,e,r,i){this.batch=t,this.commitVersion=e,this.mutationResults=r,this.docVersions=i}static from(t,e,r){G(t.mutations.length===r.length);let i=function(){return lf}();const o=t.mutations;for(let a=0;a<o.length;a++)i=i.insert(o[a].key,r[a].version);return new Pi(t,e,r,i)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Af{constructor(t,e){this.largestBatchId=t,this.mutation=e}getKey(){return this.mutation.key}isEqual(t){return t!==null&&this.mutation===t.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rf{constructor(t,e){this.count=t,this.unchangedNames=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var rt,j;function Sf(n){switch(n){default:return x();case b.CANCELLED:case b.UNKNOWN:case b.DEADLINE_EXCEEDED:case b.RESOURCE_EXHAUSTED:case b.INTERNAL:case b.UNAVAILABLE:case b.UNAUTHENTICATED:return!1;case b.INVALID_ARGUMENT:case b.NOT_FOUND:case b.ALREADY_EXISTS:case b.PERMISSION_DENIED:case b.FAILED_PRECONDITION:case b.ABORTED:case b.OUT_OF_RANGE:case b.UNIMPLEMENTED:case b.DATA_LOSS:return!0}}function Da(n){if(n===void 0)return Mt("GRPC error has no .code"),b.UNKNOWN;switch(n){case rt.OK:return b.OK;case rt.CANCELLED:return b.CANCELLED;case rt.UNKNOWN:return b.UNKNOWN;case rt.DEADLINE_EXCEEDED:return b.DEADLINE_EXCEEDED;case rt.RESOURCE_EXHAUSTED:return b.RESOURCE_EXHAUSTED;case rt.INTERNAL:return b.INTERNAL;case rt.UNAVAILABLE:return b.UNAVAILABLE;case rt.UNAUTHENTICATED:return b.UNAUTHENTICATED;case rt.INVALID_ARGUMENT:return b.INVALID_ARGUMENT;case rt.NOT_FOUND:return b.NOT_FOUND;case rt.ALREADY_EXISTS:return b.ALREADY_EXISTS;case rt.PERMISSION_DENIED:return b.PERMISSION_DENIED;case rt.FAILED_PRECONDITION:return b.FAILED_PRECONDITION;case rt.ABORTED:return b.ABORTED;case rt.OUT_OF_RANGE:return b.OUT_OF_RANGE;case rt.UNIMPLEMENTED:return b.UNIMPLEMENTED;case rt.DATA_LOSS:return b.DATA_LOSS;default:return x()}}(j=rt||(rt={}))[j.OK=0]="OK",j[j.CANCELLED=1]="CANCELLED",j[j.UNKNOWN=2]="UNKNOWN",j[j.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",j[j.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",j[j.NOT_FOUND=5]="NOT_FOUND",j[j.ALREADY_EXISTS=6]="ALREADY_EXISTS",j[j.PERMISSION_DENIED=7]="PERMISSION_DENIED",j[j.UNAUTHENTICATED=16]="UNAUTHENTICATED",j[j.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",j[j.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",j[j.ABORTED=10]="ABORTED",j[j.OUT_OF_RANGE=11]="OUT_OF_RANGE",j[j.UNIMPLEMENTED=12]="UNIMPLEMENTED",j[j.INTERNAL=13]="INTERNAL",j[j.UNAVAILABLE=14]="UNAVAILABLE",j[j.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function bf(){return new TextEncoder}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Pf=new oe([4294967295,4294967295],0);function Na(n){const t=bf().encode(n),e=new Bo;return e.update(t),new Uint8Array(e.digest())}function Oa(n){const t=new DataView(n.buffer),e=t.getUint32(0,!0),r=t.getUint32(4,!0),i=t.getUint32(8,!0),o=t.getUint32(12,!0);return[new oe([e,r],0),new oe([i,o],0)]}class Ci{constructor(t,e,r){if(this.bitmap=t,this.padding=e,this.hashCount=r,e<0||e>=8)throw new dn(`Invalid padding: ${e}`);if(r<0)throw new dn(`Invalid hash count: ${r}`);if(t.length>0&&this.hashCount===0)throw new dn(`Invalid hash count: ${r}`);if(t.length===0&&e!==0)throw new dn(`Invalid padding when bitmap length is 0: ${e}`);this.Ie=8*t.length-e,this.Te=oe.fromNumber(this.Ie)}Ee(t,e,r){let i=t.add(e.multiply(oe.fromNumber(r)));return i.compare(Pf)===1&&(i=new oe([i.getBits(0),i.getBits(1)],0)),i.modulo(this.Te).toNumber()}de(t){return(this.bitmap[Math.floor(t/8)]&1<<t%8)!=0}mightContain(t){if(this.Ie===0)return!1;const e=Na(t),[r,i]=Oa(e);for(let o=0;o<this.hashCount;o++){const a=this.Ee(r,i,o);if(!this.de(a))return!1}return!0}static create(t,e,r){const i=t%8==0?0:8-t%8,o=new Uint8Array(Math.ceil(t/8)),a=new Ci(o,i,e);return r.forEach(u=>a.insert(u)),a}insert(t){if(this.Ie===0)return;const e=Na(t),[r,i]=Oa(e);for(let o=0;o<this.hashCount;o++){const a=this.Ee(r,i,o);this.Ae(a)}}Ae(t){const e=Math.floor(t/8),r=t%8;this.bitmap[e]|=1<<r}}class dn extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mr{constructor(t,e,r,i,o){this.snapshotVersion=t,this.targetChanges=e,this.targetMismatches=r,this.documentUpdates=i,this.resolvedLimboDocuments=o}static createSynthesizedRemoteEventForCurrentChange(t,e,r){const i=new Map;return i.set(t,fn.createSynthesizedTargetChangeForCurrentChange(t,e,r)),new mr(F.min(),i,new Y(H),xt(),U())}}class fn{constructor(t,e,r,i,o){this.resumeToken=t,this.current=e,this.addedDocuments=r,this.modifiedDocuments=i,this.removedDocuments=o}static createSynthesizedTargetChangeForCurrentChange(t,e,r){return new fn(r,e,U(),U(),U())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gr{constructor(t,e,r,i){this.Re=t,this.removedTargetIds=e,this.key=r,this.Ve=i}}class Ma{constructor(t,e){this.targetId=t,this.me=e}}class xa{constructor(t,e,r=lt.EMPTY_BYTE_STRING,i=null){this.state=t,this.targetIds=e,this.resumeToken=r,this.cause=i}}class La{constructor(){this.fe=0,this.ge=Ua(),this.pe=lt.EMPTY_BYTE_STRING,this.ye=!1,this.we=!0}get current(){return this.ye}get resumeToken(){return this.pe}get Se(){return this.fe!==0}get be(){return this.we}De(t){t.approximateByteSize()>0&&(this.we=!0,this.pe=t)}Ce(){let t=U(),e=U(),r=U();return this.ge.forEach((i,o)=>{switch(o){case 0:t=t.add(i);break;case 2:e=e.add(i);break;case 1:r=r.add(i);break;default:x()}}),new fn(this.pe,this.ye,t,e,r)}ve(){this.we=!1,this.ge=Ua()}Fe(t,e){this.we=!0,this.ge=this.ge.insert(t,e)}Me(t){this.we=!0,this.ge=this.ge.remove(t)}xe(){this.fe+=1}Oe(){this.fe-=1,G(this.fe>=0)}Ne(){this.we=!0,this.ye=!0}}class Cf{constructor(t){this.Le=t,this.Be=new Map,this.ke=xt(),this.qe=Fa(),this.Qe=new Y(H)}Ke(t){for(const e of t.Re)t.Ve&&t.Ve.isFoundDocument()?this.$e(e,t.Ve):this.Ue(e,t.key,t.Ve);for(const e of t.removedTargetIds)this.Ue(e,t.key,t.Ve)}We(t){this.forEachTarget(t,e=>{const r=this.Ge(e);switch(t.state){case 0:this.ze(e)&&r.De(t.resumeToken);break;case 1:r.Oe(),r.Se||r.ve(),r.De(t.resumeToken);break;case 2:r.Oe(),r.Se||this.removeTarget(e);break;case 3:this.ze(e)&&(r.Ne(),r.De(t.resumeToken));break;case 4:this.ze(e)&&(this.je(e),r.De(t.resumeToken));break;default:x()}})}forEachTarget(t,e){t.targetIds.length>0?t.targetIds.forEach(e):this.Be.forEach((r,i)=>{this.ze(i)&&e(i)})}He(t){const e=t.targetId,r=t.me.count,i=this.Je(e);if(i){const o=i.target;if(Ri(o))if(r===0){const a=new M(o.path);this.Ue(e,a,pt.newNoDocument(a,F.min()))}else G(r===1);else{const a=this.Ye(e);if(a!==r){const u=this.Ze(t),h=u?this.Xe(u,t,a):1;if(h!==0){this.je(e);const f=h===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Qe=this.Qe.insert(e,f)}}}}}Ze(t){const e=t.me.unchangedNames;if(!e||!e.bits)return null;const{bits:{bitmap:r="",padding:i=0},hashCount:o=0}=e;let a,u;try{a=ce(r).toUint8Array()}catch(h){if(h instanceof Zo)return Ie("Decoding the base64 bloom filter in existence filter failed ("+h.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw h}try{u=new Ci(a,i,o)}catch(h){return Ie(h instanceof dn?"BloomFilter error: ":"Applying bloom filter failed: ",h),null}return u.Ie===0?null:u}Xe(t,e,r){return e.me.count===r-this.nt(t,e.targetId)?0:2}nt(t,e){const r=this.Le.getRemoteKeysForTarget(e);let i=0;return r.forEach(o=>{const a=this.Le.tt(),u=`projects/${a.projectId}/databases/${a.database}/documents/${o.path.canonicalString()}`;t.mightContain(u)||(this.Ue(e,o,null),i++)}),i}rt(t){const e=new Map;this.Be.forEach((o,a)=>{const u=this.Je(a);if(u){if(o.current&&Ri(u.target)){const h=new M(u.target.path);this.ke.get(h)!==null||this.it(a,h)||this.Ue(a,h,pt.newNoDocument(h,t))}o.be&&(e.set(a,o.Ce()),o.ve())}});let r=U();this.qe.forEach((o,a)=>{let u=!0;a.forEachWhile(h=>{const f=this.Je(h);return!f||f.purpose==="TargetPurposeLimboResolution"||(u=!1,!1)}),u&&(r=r.add(o))}),this.ke.forEach((o,a)=>a.setReadTime(t));const i=new mr(t,e,this.Qe,this.ke,r);return this.ke=xt(),this.qe=Fa(),this.Qe=new Y(H),i}$e(t,e){if(!this.ze(t))return;const r=this.it(t,e.key)?2:0;this.Ge(t).Fe(e.key,r),this.ke=this.ke.insert(e.key,e),this.qe=this.qe.insert(e.key,this.st(e.key).add(t))}Ue(t,e,r){if(!this.ze(t))return;const i=this.Ge(t);this.it(t,e)?i.Fe(e,1):i.Me(e),this.qe=this.qe.insert(e,this.st(e).delete(t)),r&&(this.ke=this.ke.insert(e,r))}removeTarget(t){this.Be.delete(t)}Ye(t){const e=this.Ge(t).Ce();return this.Le.getRemoteKeysForTarget(t).size+e.addedDocuments.size-e.removedDocuments.size}xe(t){this.Ge(t).xe()}Ge(t){let e=this.Be.get(t);return e||(e=new La,this.Be.set(t,e)),e}st(t){let e=this.qe.get(t);return e||(e=new ut(H),this.qe=this.qe.insert(t,e)),e}ze(t){const e=this.Je(t)!==null;return e||D("WatchChangeAggregator","Detected inactive target",t),e}Je(t){const e=this.Be.get(t);return e&&e.Se?null:this.Le.ot(t)}je(t){this.Be.set(t,new La),this.Le.getRemoteKeysForTarget(t).forEach(e=>{this.Ue(t,e,null)})}it(t,e){return this.Le.getRemoteKeysForTarget(t).has(e)}}function Fa(){return new Y(M.comparator)}function Ua(){return new Y(M.comparator)}const Vf={asc:"ASCENDING",desc:"DESCENDING"},kf={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},Df={and:"AND",or:"OR"};class Nf{constructor(t,e){this.databaseId=t,this.useProto3Json=e}}function Vi(n,t){return n.useProto3Json||er(t)?t:{value:t}}function _r(n,t){return n.useProto3Json?`${new Date(1e3*t.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+t.nanoseconds).slice(-9)}Z`:{seconds:""+t.seconds,nanos:t.nanoseconds}}function Ba(n,t){return n.useProto3Json?t.toBase64():t.toUint8Array()}function Of(n,t){return _r(n,t.toTimestamp())}function Ot(n){return G(!!n),F.fromTimestamp(function(e){const r=Qt(e);return new it(r.seconds,r.nanos)}(n))}function ki(n,t){return Di(n,t).canonicalString()}function Di(n,t){const e=function(i){return new J(["projects",i.projectId,"databases",i.database])}(n).child("documents");return t===void 0?e:e.child(t)}function ja(n){const t=J.fromString(n);return G(Wa(t)),t}function Ni(n,t){return ki(n.databaseId,t.path)}function Oi(n,t){const e=ja(t);if(e.get(1)!==n.databaseId.projectId)throw new O(b.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+e.get(1)+" vs "+n.databaseId.projectId);if(e.get(3)!==n.databaseId.database)throw new O(b.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+e.get(3)+" vs "+n.databaseId.database);return new M($a(e))}function qa(n,t){return ki(n.databaseId,t)}function Mf(n){const t=ja(n);return t.length===4?J.emptyPath():$a(t)}function Mi(n){return new J(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function $a(n){return G(n.length>4&&n.get(4)==="documents"),n.popFirst(5)}function za(n,t,e){return{name:Ni(n,t),fields:e.value.mapValue.fields}}function xf(n,t){let e;if("targetChange"in t){t.targetChange;const r=function(f){return f==="NO_CHANGE"?0:f==="ADD"?1:f==="REMOVE"?2:f==="CURRENT"?3:f==="RESET"?4:x()}(t.targetChange.targetChangeType||"NO_CHANGE"),i=t.targetChange.targetIds||[],o=function(f,m){return f.useProto3Json?(G(m===void 0||typeof m=="string"),lt.fromBase64String(m||"")):(G(m===void 0||m instanceof Buffer||m instanceof Uint8Array),lt.fromUint8Array(m||new Uint8Array))}(n,t.targetChange.resumeToken),a=t.targetChange.cause,u=a&&function(f){const m=f.code===void 0?b.UNKNOWN:Da(f.code);return new O(m,f.message||"")}(a);e=new xa(r,i,o,u||null)}else if("documentChange"in t){t.documentChange;const r=t.documentChange;r.document,r.document.name,r.document.updateTime;const i=Oi(n,r.document.name),o=Ot(r.document.updateTime),a=r.document.createTime?Ot(r.document.createTime):F.min(),u=new At({mapValue:{fields:r.document.fields}}),h=pt.newFoundDocument(i,o,a,u),f=r.targetIds||[],m=r.removedTargetIds||[];e=new gr(f,m,h.key,h)}else if("documentDelete"in t){t.documentDelete;const r=t.documentDelete;r.document;const i=Oi(n,r.document),o=r.readTime?Ot(r.readTime):F.min(),a=pt.newNoDocument(i,o),u=r.removedTargetIds||[];e=new gr([],u,a.key,a)}else if("documentRemove"in t){t.documentRemove;const r=t.documentRemove;r.document;const i=Oi(n,r.document),o=r.removedTargetIds||[];e=new gr([],o,i,null)}else{if(!("filter"in t))return x();{t.filter;const r=t.filter;r.targetId;const{count:i=0,unchangedNames:o}=r,a=new Rf(i,o),u=r.targetId;e=new Ma(u,a)}}return e}function Lf(n,t){let e;if(t instanceof hn)e={update:za(n,t.key,t.value)};else if(t instanceof ka)e={delete:Ni(n,t.key)};else if(t instanceof he)e={update:za(n,t.key,t.data),updateMask:Kf(t.fieldMask)};else{if(!(t instanceof If))return x();e={verify:Ni(n,t.key)}}return t.fieldTransforms.length>0&&(e.updateTransforms=t.fieldTransforms.map(r=>function(o,a){const u=a.transform;if(u instanceof an)return{fieldPath:a.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(u instanceof cn)return{fieldPath:a.field.canonicalString(),appendMissingElements:{values:u.elements}};if(u instanceof un)return{fieldPath:a.field.canonicalString(),removeAllFromArray:{values:u.elements}};if(u instanceof dr)return{fieldPath:a.field.canonicalString(),increment:u.Pe};throw x()}(0,r))),t.precondition.isNone||(e.currentDocument=function(i,o){return o.updateTime!==void 0?{updateTime:Of(i,o.updateTime)}:o.exists!==void 0?{exists:o.exists}:x()}(n,t.precondition)),e}function Ff(n,t){return n&&n.length>0?(G(t!==void 0),n.map(e=>function(i,o){let a=i.updateTime?Ot(i.updateTime):Ot(o);return a.isEqual(F.min())&&(a=Ot(o)),new vf(a,i.transformResults||[])}(e,t))):[]}function Uf(n,t){return{documents:[qa(n,t.path)]}}function Bf(n,t){const e={structuredQuery:{}},r=t.path;let i;t.collectionGroup!==null?(i=r,e.structuredQuery.from=[{collectionId:t.collectionGroup,allDescendants:!0}]):(i=r.popLast(),e.structuredQuery.from=[{collectionId:r.lastSegment()}]),e.parent=qa(n,i);const o=function(f){if(f.length!==0)return Ka(Dt.create(f,"and"))}(t.filters);o&&(e.structuredQuery.where=o);const a=function(f){if(f.length!==0)return f.map(m=>function(R){return{field:Ce(R.field),direction:$f(R.dir)}}(m))}(t.orderBy);a&&(e.structuredQuery.orderBy=a);const u=Vi(n,t.limit);return u!==null&&(e.structuredQuery.limit=u),t.startAt&&(e.structuredQuery.startAt=function(f){return{before:f.inclusive,values:f.position}}(t.startAt)),t.endAt&&(e.structuredQuery.endAt=function(f){return{before:!f.inclusive,values:f.position}}(t.endAt)),{_t:e,parent:i}}function jf(n){let t=Mf(n.parent);const e=n.structuredQuery,r=e.from?e.from.length:0;let i=null;if(r>0){G(r===1);const m=e.from[0];m.allDescendants?i=m.collectionId:t=t.child(m.collectionId)}let o=[];e.where&&(o=function(I){const R=Ha(I);return R instanceof Dt&&ca(R)?R.getFilters():[R]}(e.where));let a=[];e.orderBy&&(a=function(I){return I.map(R=>function(k){return new ar(Ve(k.field),function(V){switch(V){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(k.direction))}(R))}(e.orderBy));let u=null;e.limit&&(u=function(I){let R;return R=typeof I=="object"?I.value:I,er(R)?null:R}(e.limit));let h=null;e.startAt&&(h=function(I){const R=!!I.before,P=I.values||[];return new or(P,R)}(e.startAt));let f=null;return e.endAt&&(f=function(I){const R=!I.before,P=I.values||[];return new or(P,R)}(e.endAt)),rf(t,i,a,o,u,"F",h,f)}function qf(n,t){const e=function(i){switch(i){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return x()}}(t.purpose);return e==null?null:{"goog-listen-tags":e}}function Ha(n){return n.unaryFilter!==void 0?function(e){switch(e.unaryFilter.op){case"IS_NAN":const r=Ve(e.unaryFilter.field);return st.create(r,"==",{doubleValue:NaN});case"IS_NULL":const i=Ve(e.unaryFilter.field);return st.create(i,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const o=Ve(e.unaryFilter.field);return st.create(o,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const a=Ve(e.unaryFilter.field);return st.create(a,"!=",{nullValue:"NULL_VALUE"});default:return x()}}(n):n.fieldFilter!==void 0?function(e){return st.create(Ve(e.fieldFilter.field),function(i){switch(i){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";default:return x()}}(e.fieldFilter.op),e.fieldFilter.value)}(n):n.compositeFilter!==void 0?function(e){return Dt.create(e.compositeFilter.filters.map(r=>Ha(r)),function(i){switch(i){case"AND":return"and";case"OR":return"or";default:return x()}}(e.compositeFilter.op))}(n):x()}function $f(n){return Vf[n]}function zf(n){return kf[n]}function Hf(n){return Df[n]}function Ce(n){return{fieldPath:n.canonicalString()}}function Ve(n){return at.fromServerFormat(n.fieldPath)}function Ka(n){return n instanceof st?function(e){if(e.op==="=="){if(na(e.value))return{unaryFilter:{field:Ce(e.field),op:"IS_NAN"}};if(ea(e.value))return{unaryFilter:{field:Ce(e.field),op:"IS_NULL"}}}else if(e.op==="!="){if(na(e.value))return{unaryFilter:{field:Ce(e.field),op:"IS_NOT_NAN"}};if(ea(e.value))return{unaryFilter:{field:Ce(e.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:Ce(e.field),op:zf(e.op),value:e.value}}}(n):n instanceof Dt?function(e){const r=e.getFilters().map(i=>Ka(i));return r.length===1?r[0]:{compositeFilter:{op:Hf(e.op),filters:r}}}(n):x()}function Kf(n){const t=[];return n.fields.forEach(e=>t.push(e.canonicalString())),{fieldPaths:t}}function Wa(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xt{constructor(t,e,r,i,o=F.min(),a=F.min(),u=lt.EMPTY_BYTE_STRING,h=null){this.target=t,this.targetId=e,this.purpose=r,this.sequenceNumber=i,this.snapshotVersion=o,this.lastLimboFreeSnapshotVersion=a,this.resumeToken=u,this.expectedCount=h}withSequenceNumber(t){return new Xt(this.target,this.targetId,this.purpose,t,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(t,e){return new Xt(this.target,this.targetId,this.purpose,this.sequenceNumber,e,this.lastLimboFreeSnapshotVersion,t,null)}withExpectedCount(t){return new Xt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,t)}withLastLimboFreeSnapshotVersion(t){return new Xt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,t,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wf{constructor(t){this.ct=t}}function Gf(n){const t=jf({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?bi(t,t.limit,"L"):t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qf{constructor(){this.an=new Xf}addToCollectionParentIndex(t,e){return this.an.add(e),S.resolve()}getCollectionParents(t,e){return S.resolve(this.an.getEntries(e))}addFieldIndex(t,e){return S.resolve()}deleteFieldIndex(t,e){return S.resolve()}deleteAllFieldIndexes(t){return S.resolve()}createTargetIndexes(t,e){return S.resolve()}getDocumentsMatchingTarget(t,e){return S.resolve(null)}getIndexType(t,e){return S.resolve(0)}getFieldIndexes(t,e){return S.resolve([])}getNextCollectionGroupToUpdate(t){return S.resolve(null)}getMinOffset(t,e){return S.resolve(Gt.min())}getMinOffsetFromCollectionGroup(t,e){return S.resolve(Gt.min())}updateCollectionGroup(t,e,r){return S.resolve()}updateIndexEntries(t,e){return S.resolve()}}class Xf{constructor(){this.index={}}add(t){const e=t.lastSegment(),r=t.popLast(),i=this.index[e]||new ut(J.comparator),o=!i.has(r);return this.index[e]=i.add(r),o}has(t){const e=t.lastSegment(),r=t.popLast(),i=this.index[e];return i&&i.has(r)}getEntries(t){return(this.index[t]||new ut(J.comparator)).toArray()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ke{constructor(t){this.Nn=t}next(){return this.Nn+=2,this.Nn}static Ln(){return new ke(0)}static Bn(){return new ke(-1)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yf{constructor(){this.changes=new Pe(t=>t.toString(),(t,e)=>t.isEqual(e)),this.changesApplied=!1}addEntry(t){this.assertNotApplied(),this.changes.set(t.key,t)}removeEntry(t,e){this.assertNotApplied(),this.changes.set(t,pt.newInvalidDocument(t).setReadTime(e))}getEntry(t,e){this.assertNotApplied();const r=this.changes.get(e);return r!==void 0?S.resolve(r):this.getFromCache(t,e)}getEntries(t,e){return this.getAllFromCache(t,e)}apply(t){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(t)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jf{constructor(t,e){this.overlayedDocument=t,this.mutatedFields=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zf{constructor(t,e,r,i){this.remoteDocumentCache=t,this.mutationQueue=e,this.documentOverlayCache=r,this.indexManager=i}getDocument(t,e){let r=null;return this.documentOverlayCache.getOverlay(t,e).next(i=>(r=i,this.remoteDocumentCache.getEntry(t,e))).next(i=>(r!==null&&ln(r.mutation,i,Ct.empty(),it.now()),i))}getDocuments(t,e){return this.remoteDocumentCache.getEntries(t,e).next(r=>this.getLocalViewOfDocuments(t,r,U()).next(()=>r))}getLocalViewOfDocuments(t,e,r=U()){const i=le();return this.populateOverlays(t,i,e).next(()=>this.computeViews(t,e,i,r).next(o=>{let a=sn();return o.forEach((u,h)=>{a=a.insert(u,h.overlayedDocument)}),a}))}getOverlayedDocuments(t,e){const r=le();return this.populateOverlays(t,r,e).next(()=>this.computeViews(t,e,r,U()))}populateOverlays(t,e,r){const i=[];return r.forEach(o=>{e.has(o)||i.push(o)}),this.documentOverlayCache.getOverlays(t,i).next(o=>{o.forEach((a,u)=>{e.set(a,u)})})}computeViews(t,e,r,i){let o=xt();const a=on(),u=function(){return on()}();return e.forEach((h,f)=>{const m=r.get(f.key);i.has(f.key)&&(m===void 0||m.mutation instanceof he)?o=o.insert(f.key,f):m!==void 0?(a.set(f.key,m.mutation.getFieldMask()),ln(m.mutation,f,m.mutation.getFieldMask(),it.now())):a.set(f.key,Ct.empty())}),this.recalculateAndSaveOverlays(t,o).next(h=>(h.forEach((f,m)=>a.set(f,m)),e.forEach((f,m)=>{var I;return u.set(f,new Jf(m,(I=a.get(f))!==null&&I!==void 0?I:null))}),u))}recalculateAndSaveOverlays(t,e){const r=on();let i=new Y((a,u)=>a-u),o=U();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(t,e).next(a=>{for(const u of a)u.keys().forEach(h=>{const f=e.get(h);if(f===null)return;let m=r.get(h)||Ct.empty();m=u.applyToLocalView(f,m),r.set(h,m);const I=(i.get(u.batchId)||U()).add(h);i=i.insert(u.batchId,I)})}).next(()=>{const a=[],u=i.getReverseIterator();for(;u.hasNext();){const h=u.getNext(),f=h.key,m=h.value,I=ya();m.forEach(R=>{if(!o.has(R)){const P=Sa(e.get(R),r.get(R));P!==null&&I.set(R,P),o=o.add(R)}}),a.push(this.documentOverlayCache.saveOverlays(t,f,I))}return S.waitFor(a)}).next(()=>r)}recalculateAndSaveOverlaysForDocumentKeys(t,e){return this.remoteDocumentCache.getEntries(t,e).next(r=>this.recalculateAndSaveOverlays(t,r))}getDocumentsMatchingQuery(t,e,r,i){return function(a){return M.isDocumentKey(a.path)&&a.collectionGroup===null&&a.filters.length===0}(e)?this.getDocumentsMatchingDocumentQuery(t,e.path):sf(e)?this.getDocumentsMatchingCollectionGroupQuery(t,e,r,i):this.getDocumentsMatchingCollectionQuery(t,e,r,i)}getNextDocuments(t,e,r,i){return this.remoteDocumentCache.getAllFromCollectionGroup(t,e,r,i).next(o=>{const a=i-o.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(t,e,r.largestBatchId,i-o.size):S.resolve(le());let u=-1,h=o;return a.next(f=>S.forEach(f,(m,I)=>(u<I.largestBatchId&&(u=I.largestBatchId),o.get(m)?S.resolve():this.remoteDocumentCache.getEntry(t,m).next(R=>{h=h.insert(m,R)}))).next(()=>this.populateOverlays(t,f,o)).next(()=>this.computeViews(t,h,f,U())).next(m=>({batchId:u,changes:_a(m)})))})}getDocumentsMatchingDocumentQuery(t,e){return this.getDocument(t,new M(e)).next(r=>{let i=sn();return r.isFoundDocument()&&(i=i.insert(r.key,r)),i})}getDocumentsMatchingCollectionGroupQuery(t,e,r,i){const o=e.collectionGroup;let a=sn();return this.indexManager.getCollectionParents(t,o).next(u=>S.forEach(u,h=>{const f=function(I,R){return new cr(R,null,I.explicitOrderBy.slice(),I.filters.slice(),I.limit,I.limitType,I.startAt,I.endAt)}(e,h.child(o));return this.getDocumentsMatchingCollectionQuery(t,f,r,i).next(m=>{m.forEach((I,R)=>{a=a.insert(I,R)})})}).next(()=>a))}getDocumentsMatchingCollectionQuery(t,e,r,i){let o;return this.documentOverlayCache.getOverlaysForCollection(t,e.path,r.largestBatchId).next(a=>(o=a,this.remoteDocumentCache.getDocumentsMatchingQuery(t,e,r,o,i))).next(a=>{o.forEach((h,f)=>{const m=f.getKey();a.get(m)===null&&(a=a.insert(m,pt.newInvalidDocument(m)))});let u=sn();return a.forEach((h,f)=>{const m=o.get(h);m!==void 0&&ln(m.mutation,f,Ct.empty(),it.now()),lr(e,f)&&(u=u.insert(h,f))}),u})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tp{constructor(t){this.serializer=t,this.lr=new Map,this.hr=new Map}getBundleMetadata(t,e){return S.resolve(this.lr.get(e))}saveBundleMetadata(t,e){return this.lr.set(e.id,function(i){return{id:i.id,version:i.version,createTime:Ot(i.createTime)}}(e)),S.resolve()}getNamedQuery(t,e){return S.resolve(this.hr.get(e))}saveNamedQuery(t,e){return this.hr.set(e.name,function(i){return{name:i.name,query:Gf(i.bundledQuery),readTime:Ot(i.readTime)}}(e)),S.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ep{constructor(){this.overlays=new Y(M.comparator),this.Pr=new Map}getOverlay(t,e){return S.resolve(this.overlays.get(e))}getOverlays(t,e){const r=le();return S.forEach(e,i=>this.getOverlay(t,i).next(o=>{o!==null&&r.set(i,o)})).next(()=>r)}saveOverlays(t,e,r){return r.forEach((i,o)=>{this.ht(t,e,o)}),S.resolve()}removeOverlaysForBatchId(t,e,r){const i=this.Pr.get(r);return i!==void 0&&(i.forEach(o=>this.overlays=this.overlays.remove(o)),this.Pr.delete(r)),S.resolve()}getOverlaysForCollection(t,e,r){const i=le(),o=e.length+1,a=new M(e.child("")),u=this.overlays.getIteratorFrom(a);for(;u.hasNext();){const h=u.getNext().value,f=h.getKey();if(!e.isPrefixOf(f.path))break;f.path.length===o&&h.largestBatchId>r&&i.set(h.getKey(),h)}return S.resolve(i)}getOverlaysForCollectionGroup(t,e,r,i){let o=new Y((f,m)=>f-m);const a=this.overlays.getIterator();for(;a.hasNext();){const f=a.getNext().value;if(f.getKey().getCollectionGroup()===e&&f.largestBatchId>r){let m=o.get(f.largestBatchId);m===null&&(m=le(),o=o.insert(f.largestBatchId,m)),m.set(f.getKey(),f)}}const u=le(),h=o.getIterator();for(;h.hasNext()&&(h.getNext().value.forEach((f,m)=>u.set(f,m)),!(u.size()>=i)););return S.resolve(u)}ht(t,e,r){const i=this.overlays.get(r.key);if(i!==null){const a=this.Pr.get(i.largestBatchId).delete(r.key);this.Pr.set(i.largestBatchId,a)}this.overlays=this.overlays.insert(r.key,new Af(e,r));let o=this.Pr.get(e);o===void 0&&(o=U(),this.Pr.set(e,o)),this.Pr.set(e,o.add(r.key))}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class np{constructor(){this.sessionToken=lt.EMPTY_BYTE_STRING}getSessionToken(t){return S.resolve(this.sessionToken)}setSessionToken(t,e){return this.sessionToken=e,S.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xi{constructor(){this.Ir=new ut(ot.Tr),this.Er=new ut(ot.dr)}isEmpty(){return this.Ir.isEmpty()}addReference(t,e){const r=new ot(t,e);this.Ir=this.Ir.add(r),this.Er=this.Er.add(r)}Ar(t,e){t.forEach(r=>this.addReference(r,e))}removeReference(t,e){this.Rr(new ot(t,e))}Vr(t,e){t.forEach(r=>this.removeReference(r,e))}mr(t){const e=new M(new J([])),r=new ot(e,t),i=new ot(e,t+1),o=[];return this.Er.forEachInRange([r,i],a=>{this.Rr(a),o.push(a.key)}),o}gr(){this.Ir.forEach(t=>this.Rr(t))}Rr(t){this.Ir=this.Ir.delete(t),this.Er=this.Er.delete(t)}pr(t){const e=new M(new J([])),r=new ot(e,t),i=new ot(e,t+1);let o=U();return this.Er.forEachInRange([r,i],a=>{o=o.add(a.key)}),o}containsKey(t){const e=new ot(t,0),r=this.Ir.firstAfterOrEqual(e);return r!==null&&t.isEqual(r.key)}}class ot{constructor(t,e){this.key=t,this.yr=e}static Tr(t,e){return M.comparator(t.key,e.key)||H(t.yr,e.yr)}static dr(t,e){return H(t.yr,e.yr)||M.comparator(t.key,e.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rp{constructor(t,e){this.indexManager=t,this.referenceDelegate=e,this.mutationQueue=[],this.wr=1,this.Sr=new ut(ot.Tr)}checkEmpty(t){return S.resolve(this.mutationQueue.length===0)}addMutationBatch(t,e,r,i){const o=this.wr;this.wr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const a=new wf(o,e,r,i);this.mutationQueue.push(a);for(const u of i)this.Sr=this.Sr.add(new ot(u.key,o)),this.indexManager.addToCollectionParentIndex(t,u.key.path.popLast());return S.resolve(a)}lookupMutationBatch(t,e){return S.resolve(this.br(e))}getNextMutationBatchAfterBatchId(t,e){const r=e+1,i=this.Dr(r),o=i<0?0:i;return S.resolve(this.mutationQueue.length>o?this.mutationQueue[o]:null)}getHighestUnacknowledgedBatchId(){return S.resolve(this.mutationQueue.length===0?-1:this.wr-1)}getAllMutationBatches(t){return S.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(t,e){const r=new ot(e,0),i=new ot(e,Number.POSITIVE_INFINITY),o=[];return this.Sr.forEachInRange([r,i],a=>{const u=this.br(a.yr);o.push(u)}),S.resolve(o)}getAllMutationBatchesAffectingDocumentKeys(t,e){let r=new ut(H);return e.forEach(i=>{const o=new ot(i,0),a=new ot(i,Number.POSITIVE_INFINITY);this.Sr.forEachInRange([o,a],u=>{r=r.add(u.yr)})}),S.resolve(this.Cr(r))}getAllMutationBatchesAffectingQuery(t,e){const r=e.path,i=r.length+1;let o=r;M.isDocumentKey(o)||(o=o.child(""));const a=new ot(new M(o),0);let u=new ut(H);return this.Sr.forEachWhile(h=>{const f=h.key.path;return!!r.isPrefixOf(f)&&(f.length===i&&(u=u.add(h.yr)),!0)},a),S.resolve(this.Cr(u))}Cr(t){const e=[];return t.forEach(r=>{const i=this.br(r);i!==null&&e.push(i)}),e}removeMutationBatch(t,e){G(this.vr(e.batchId,"removed")===0),this.mutationQueue.shift();let r=this.Sr;return S.forEach(e.mutations,i=>{const o=new ot(i.key,e.batchId);return r=r.delete(o),this.referenceDelegate.markPotentiallyOrphaned(t,i.key)}).next(()=>{this.Sr=r})}xn(t){}containsKey(t,e){const r=new ot(e,0),i=this.Sr.firstAfterOrEqual(r);return S.resolve(e.isEqual(i&&i.key))}performConsistencyCheck(t){return this.mutationQueue.length,S.resolve()}vr(t,e){return this.Dr(t)}Dr(t){return this.mutationQueue.length===0?0:t-this.mutationQueue[0].batchId}br(t){const e=this.Dr(t);return e<0||e>=this.mutationQueue.length?null:this.mutationQueue[e]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ip{constructor(t){this.Fr=t,this.docs=function(){return new Y(M.comparator)}(),this.size=0}setIndexManager(t){this.indexManager=t}addEntry(t,e){const r=e.key,i=this.docs.get(r),o=i?i.size:0,a=this.Fr(e);return this.docs=this.docs.insert(r,{document:e.mutableCopy(),size:a}),this.size+=a-o,this.indexManager.addToCollectionParentIndex(t,r.path.popLast())}removeEntry(t){const e=this.docs.get(t);e&&(this.docs=this.docs.remove(t),this.size-=e.size)}getEntry(t,e){const r=this.docs.get(e);return S.resolve(r?r.document.mutableCopy():pt.newInvalidDocument(e))}getEntries(t,e){let r=xt();return e.forEach(i=>{const o=this.docs.get(i);r=r.insert(i,o?o.document.mutableCopy():pt.newInvalidDocument(i))}),S.resolve(r)}getDocumentsMatchingQuery(t,e,r,i){let o=xt();const a=e.path,u=new M(a.child("")),h=this.docs.getIteratorFrom(u);for(;h.hasNext();){const{key:f,value:{document:m}}=h.getNext();if(!a.isPrefixOf(f.path))break;f.path.length>a.length+1||Ud(Fd(m),r)<=0||(i.has(m.key)||lr(e,m))&&(o=o.insert(m.key,m.mutableCopy()))}return S.resolve(o)}getAllFromCollectionGroup(t,e,r,i){x()}Mr(t,e){return S.forEach(this.docs,r=>e(r))}newChangeBuffer(t){return new sp(this)}getSize(t){return S.resolve(this.size)}}class sp extends Yf{constructor(t){super(),this.ur=t}applyChanges(t){const e=[];return this.changes.forEach((r,i)=>{i.isValidDocument()?e.push(this.ur.addEntry(t,i)):this.ur.removeEntry(r)}),S.waitFor(e)}getFromCache(t,e){return this.ur.getEntry(t,e)}getAllFromCache(t,e){return this.ur.getEntries(t,e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class op{constructor(t){this.persistence=t,this.Or=new Pe(e=>wi(e),Ai),this.lastRemoteSnapshotVersion=F.min(),this.highestTargetId=0,this.Nr=0,this.Lr=new xi,this.targetCount=0,this.Br=ke.Ln()}forEachTarget(t,e){return this.Or.forEach((r,i)=>e(i)),S.resolve()}getLastRemoteSnapshotVersion(t){return S.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(t){return S.resolve(this.Nr)}allocateTargetId(t){return this.highestTargetId=this.Br.next(),S.resolve(this.highestTargetId)}setTargetsMetadata(t,e,r){return r&&(this.lastRemoteSnapshotVersion=r),e>this.Nr&&(this.Nr=e),S.resolve()}Qn(t){this.Or.set(t.target,t);const e=t.targetId;e>this.highestTargetId&&(this.Br=new ke(e),this.highestTargetId=e),t.sequenceNumber>this.Nr&&(this.Nr=t.sequenceNumber)}addTargetData(t,e){return this.Qn(e),this.targetCount+=1,S.resolve()}updateTargetData(t,e){return this.Qn(e),S.resolve()}removeTargetData(t,e){return this.Or.delete(e.target),this.Lr.mr(e.targetId),this.targetCount-=1,S.resolve()}removeTargets(t,e,r){let i=0;const o=[];return this.Or.forEach((a,u)=>{u.sequenceNumber<=e&&r.get(u.targetId)===null&&(this.Or.delete(a),o.push(this.removeMatchingKeysForTargetId(t,u.targetId)),i++)}),S.waitFor(o).next(()=>i)}getTargetCount(t){return S.resolve(this.targetCount)}getTargetData(t,e){const r=this.Or.get(e)||null;return S.resolve(r)}addMatchingKeys(t,e,r){return this.Lr.Ar(e,r),S.resolve()}removeMatchingKeys(t,e,r){this.Lr.Vr(e,r);const i=this.persistence.referenceDelegate,o=[];return i&&e.forEach(a=>{o.push(i.markPotentiallyOrphaned(t,a))}),S.waitFor(o)}removeMatchingKeysForTargetId(t,e){return this.Lr.mr(e),S.resolve()}getMatchingKeysForTargetId(t,e){const r=this.Lr.pr(e);return S.resolve(r)}containsKey(t,e){return S.resolve(this.Lr.containsKey(e))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ap{constructor(t,e){this.kr={},this.overlays={},this.qr=new gi(0),this.Qr=!1,this.Qr=!0,this.Kr=new np,this.referenceDelegate=t(this),this.$r=new op(this),this.indexManager=new Qf,this.remoteDocumentCache=function(i){return new ip(i)}(r=>this.referenceDelegate.Ur(r)),this.serializer=new Wf(e),this.Wr=new tp(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.Qr=!1,Promise.resolve()}get started(){return this.Qr}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(t){return this.indexManager}getDocumentOverlayCache(t){let e=this.overlays[t.toKey()];return e||(e=new ep,this.overlays[t.toKey()]=e),e}getMutationQueue(t,e){let r=this.kr[t.toKey()];return r||(r=new rp(e,this.referenceDelegate),this.kr[t.toKey()]=r),r}getGlobalsCache(){return this.Kr}getTargetCache(){return this.$r}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Wr}runTransaction(t,e,r){D("MemoryPersistence","Starting transaction:",t);const i=new cp(this.qr.next());return this.referenceDelegate.Gr(),r(i).next(o=>this.referenceDelegate.zr(i).next(()=>o)).toPromise().then(o=>(i.raiseOnCommittedEvent(),o))}jr(t,e){return S.or(Object.values(this.kr).map(r=>()=>r.containsKey(t,e)))}}class cp extends jd{constructor(t){super(),this.currentSequenceNumber=t}}class Li{constructor(t){this.persistence=t,this.Hr=new xi,this.Jr=null}static Yr(t){return new Li(t)}get Zr(){if(this.Jr)return this.Jr;throw x()}addReference(t,e,r){return this.Hr.addReference(r,e),this.Zr.delete(r.toString()),S.resolve()}removeReference(t,e,r){return this.Hr.removeReference(r,e),this.Zr.add(r.toString()),S.resolve()}markPotentiallyOrphaned(t,e){return this.Zr.add(e.toString()),S.resolve()}removeTarget(t,e){this.Hr.mr(e.targetId).forEach(i=>this.Zr.add(i.toString()));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(t,e.targetId).next(i=>{i.forEach(o=>this.Zr.add(o.toString()))}).next(()=>r.removeTargetData(t,e))}Gr(){this.Jr=new Set}zr(t){const e=this.persistence.getRemoteDocumentCache().newChangeBuffer();return S.forEach(this.Zr,r=>{const i=M.fromPath(r);return this.Xr(t,i).next(o=>{o||e.removeEntry(i,F.min())})}).next(()=>(this.Jr=null,e.apply(t)))}updateLimboDocument(t,e){return this.Xr(t,e).next(r=>{r?this.Zr.delete(e.toString()):this.Zr.add(e.toString())})}Ur(t){return 0}Xr(t,e){return S.or([()=>S.resolve(this.Hr.containsKey(e)),()=>this.persistence.getTargetCache().containsKey(t,e),()=>this.persistence.jr(t,e)])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fi{constructor(t,e,r,i){this.targetId=t,this.fromCache=e,this.Ki=r,this.$i=i}static Ui(t,e){let r=U(),i=U();for(const o of e.docChanges)switch(o.type){case 0:r=r.add(o.doc.key);break;case 1:i=i.add(o.doc.key)}return new Fi(t,e.fromCache,r,i)}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class up{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(t){this._documentReadCount+=t}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lp{constructor(){this.Wi=!1,this.Gi=!1,this.zi=100,this.ji=function(){return hl()?8:qd(bt())>0?6:4}()}initialize(t,e){this.Hi=t,this.indexManager=e,this.Wi=!0}getDocumentsMatchingQuery(t,e,r,i){const o={result:null};return this.Ji(t,e).next(a=>{o.result=a}).next(()=>{if(!o.result)return this.Yi(t,e,i,r).next(a=>{o.result=a})}).next(()=>{if(o.result)return;const a=new up;return this.Zi(t,e,a).next(u=>{if(o.result=u,this.Gi)return this.Xi(t,e,a,u.size)})}).next(()=>o.result)}Xi(t,e,r,i){return r.documentReadCount<this.zi?(Qe()<=B.DEBUG&&D("QueryEngine","SDK will not create cache indexes for query:",be(e),"since it only creates cache indexes for collection contains","more than or equal to",this.zi,"documents"),S.resolve()):(Qe()<=B.DEBUG&&D("QueryEngine","Query:",be(e),"scans",r.documentReadCount,"local documents and returns",i,"documents as results."),r.documentReadCount>this.ji*i?(Qe()<=B.DEBUG&&D("QueryEngine","The SDK decides to create cache indexes for query:",be(e),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(t,Nt(e))):S.resolve())}Ji(t,e){if(fa(e))return S.resolve(null);let r=Nt(e);return this.indexManager.getIndexType(t,r).next(i=>i===0?null:(e.limit!==null&&i===1&&(e=bi(e,null,"F"),r=Nt(e)),this.indexManager.getDocumentsMatchingTarget(t,r).next(o=>{const a=U(...o);return this.Hi.getDocuments(t,a).next(u=>this.indexManager.getMinOffset(t,r).next(h=>{const f=this.es(e,u);return this.ts(e,f,a,h.readTime)?this.Ji(t,bi(e,null,"F")):this.ns(t,f,e,h)}))})))}Yi(t,e,r,i){return fa(e)||i.isEqual(F.min())?S.resolve(null):this.Hi.getDocuments(t,r).next(o=>{const a=this.es(e,o);return this.ts(e,a,r,i)?S.resolve(null):(Qe()<=B.DEBUG&&D("QueryEngine","Re-using previous result from %s to execute query: %s",i.toString(),be(e)),this.ns(t,a,e,Ld(i,-1)).next(u=>u))})}es(t,e){let r=new ut(ma(t));return e.forEach((i,o)=>{lr(t,o)&&(r=r.add(o))}),r}ts(t,e,r,i){if(t.limit===null)return!1;if(r.size!==e.size)return!0;const o=t.limitType==="F"?e.last():e.first();return!!o&&(o.hasPendingWrites||o.version.compareTo(i)>0)}Zi(t,e,r){return Qe()<=B.DEBUG&&D("QueryEngine","Using full collection scan to execute query:",be(e)),this.Hi.getDocumentsMatchingQuery(t,e,Gt.min(),r)}ns(t,e,r,i){return this.Hi.getDocumentsMatchingQuery(t,r,i).next(o=>(e.forEach(a=>{o=o.insert(a.key,a)}),o))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hp{constructor(t,e,r,i){this.persistence=t,this.rs=e,this.serializer=i,this.ss=new Y(H),this.os=new Pe(o=>wi(o),Ai),this._s=new Map,this.us=t.getRemoteDocumentCache(),this.$r=t.getTargetCache(),this.Wr=t.getBundleCache(),this.cs(r)}cs(t){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(t),this.indexManager=this.persistence.getIndexManager(t),this.mutationQueue=this.persistence.getMutationQueue(t,this.indexManager),this.localDocuments=new Zf(this.us,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.us.setIndexManager(this.indexManager),this.rs.initialize(this.localDocuments,this.indexManager)}collectGarbage(t){return this.persistence.runTransaction("Collect garbage","readwrite-primary",e=>t.collect(e,this.ss))}}function dp(n,t,e,r){return new hp(n,t,e,r)}async function Ga(n,t){const e=L(n);return await e.persistence.runTransaction("Handle user change","readonly",r=>{let i;return e.mutationQueue.getAllMutationBatches(r).next(o=>(i=o,e.cs(t),e.mutationQueue.getAllMutationBatches(r))).next(o=>{const a=[],u=[];let h=U();for(const f of i){a.push(f.batchId);for(const m of f.mutations)h=h.add(m.key)}for(const f of o){u.push(f.batchId);for(const m of f.mutations)h=h.add(m.key)}return e.localDocuments.getDocuments(r,h).next(f=>({ls:f,removedBatchIds:a,addedBatchIds:u}))})})}function fp(n,t){const e=L(n);return e.persistence.runTransaction("Acknowledge batch","readwrite-primary",r=>{const i=t.batch.keys(),o=e.us.newChangeBuffer({trackRemovals:!0});return function(u,h,f,m){const I=f.batch,R=I.keys();let P=S.resolve();return R.forEach(k=>{P=P.next(()=>m.getEntry(h,k)).next(N=>{const V=f.docVersions.get(k);G(V!==null),N.version.compareTo(V)<0&&(I.applyToRemoteDocument(N,f),N.isValidDocument()&&(N.setReadTime(f.commitVersion),m.addEntry(N)))})}),P.next(()=>u.mutationQueue.removeMutationBatch(h,I))}(e,r,t,o).next(()=>o.apply(r)).next(()=>e.mutationQueue.performConsistencyCheck(r)).next(()=>e.documentOverlayCache.removeOverlaysForBatchId(r,i,t.batch.batchId)).next(()=>e.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,function(u){let h=U();for(let f=0;f<u.mutationResults.length;++f)u.mutationResults[f].transformResults.length>0&&(h=h.add(u.batch.mutations[f].key));return h}(t))).next(()=>e.localDocuments.getDocuments(r,i))})}function Qa(n){const t=L(n);return t.persistence.runTransaction("Get last remote snapshot version","readonly",e=>t.$r.getLastRemoteSnapshotVersion(e))}function pp(n,t){const e=L(n),r=t.snapshotVersion;let i=e.ss;return e.persistence.runTransaction("Apply remote event","readwrite-primary",o=>{const a=e.us.newChangeBuffer({trackRemovals:!0});i=e.ss;const u=[];t.targetChanges.forEach((m,I)=>{const R=i.get(I);if(!R)return;u.push(e.$r.removeMatchingKeys(o,m.removedDocuments,I).next(()=>e.$r.addMatchingKeys(o,m.addedDocuments,I)));let P=R.withSequenceNumber(o.currentSequenceNumber);t.targetMismatches.get(I)!==null?P=P.withResumeToken(lt.EMPTY_BYTE_STRING,F.min()).withLastLimboFreeSnapshotVersion(F.min()):m.resumeToken.approximateByteSize()>0&&(P=P.withResumeToken(m.resumeToken,r)),i=i.insert(I,P),function(N,V,q){return N.resumeToken.approximateByteSize()===0||V.snapshotVersion.toMicroseconds()-N.snapshotVersion.toMicroseconds()>=3e8?!0:q.addedDocuments.size+q.modifiedDocuments.size+q.removedDocuments.size>0}(R,P,m)&&u.push(e.$r.updateTargetData(o,P))});let h=xt(),f=U();if(t.documentUpdates.forEach(m=>{t.resolvedLimboDocuments.has(m)&&u.push(e.persistence.referenceDelegate.updateLimboDocument(o,m))}),u.push(mp(o,a,t.documentUpdates).next(m=>{h=m.hs,f=m.Ps})),!r.isEqual(F.min())){const m=e.$r.getLastRemoteSnapshotVersion(o).next(I=>e.$r.setTargetsMetadata(o,o.currentSequenceNumber,r));u.push(m)}return S.waitFor(u).next(()=>a.apply(o)).next(()=>e.localDocuments.getLocalViewOfDocuments(o,h,f)).next(()=>h)}).then(o=>(e.ss=i,o))}function mp(n,t,e){let r=U(),i=U();return e.forEach(o=>r=r.add(o)),t.getEntries(n,r).next(o=>{let a=xt();return e.forEach((u,h)=>{const f=o.get(u);h.isFoundDocument()!==f.isFoundDocument()&&(i=i.add(u)),h.isNoDocument()&&h.version.isEqual(F.min())?(t.removeEntry(u,h.readTime),a=a.insert(u,h)):!f.isValidDocument()||h.version.compareTo(f.version)>0||h.version.compareTo(f.version)===0&&f.hasPendingWrites?(t.addEntry(h),a=a.insert(u,h)):D("LocalStore","Ignoring outdated watch update for ",u,". Current version:",f.version," Watch version:",h.version)}),{hs:a,Ps:i}})}function gp(n,t){const e=L(n);return e.persistence.runTransaction("Get next mutation batch","readonly",r=>(t===void 0&&(t=-1),e.mutationQueue.getNextMutationBatchAfterBatchId(r,t)))}function _p(n,t){const e=L(n);return e.persistence.runTransaction("Allocate target","readwrite",r=>{let i;return e.$r.getTargetData(r,t).next(o=>o?(i=o,S.resolve(i)):e.$r.allocateTargetId(r).next(a=>(i=new Xt(t,a,"TargetPurposeListen",r.currentSequenceNumber),e.$r.addTargetData(r,i).next(()=>i))))}).then(r=>{const i=e.ss.get(r.targetId);return(i===null||r.snapshotVersion.compareTo(i.snapshotVersion)>0)&&(e.ss=e.ss.insert(r.targetId,r),e.os.set(t,r.targetId)),r})}async function Ui(n,t,e){const r=L(n),i=r.ss.get(t),o=e?"readwrite":"readwrite-primary";try{e||await r.persistence.runTransaction("Release target",o,a=>r.persistence.referenceDelegate.removeTarget(a,i))}catch(a){if(!Je(a))throw a;D("LocalStore",`Failed to update sequence numbers for target ${t}: ${a}`)}r.ss=r.ss.remove(t),r.os.delete(i.target)}function Xa(n,t,e){const r=L(n);let i=F.min(),o=U();return r.persistence.runTransaction("Execute query","readwrite",a=>function(h,f,m){const I=L(h),R=I.os.get(m);return R!==void 0?S.resolve(I.ss.get(R)):I.$r.getTargetData(f,m)}(r,a,Nt(t)).next(u=>{if(u)return i=u.lastLimboFreeSnapshotVersion,r.$r.getMatchingKeysForTargetId(a,u.targetId).next(h=>{o=h})}).next(()=>r.rs.getDocumentsMatchingQuery(a,t,e?i:F.min(),e?o:U())).next(u=>(yp(r,af(t),u),{documents:u,Is:o})))}function yp(n,t,e){let r=n._s.get(t)||F.min();e.forEach((i,o)=>{o.readTime.compareTo(r)>0&&(r=o.readTime)}),n._s.set(t,r)}class Ya{constructor(){this.activeTargetIds=ff()}Vs(t){this.activeTargetIds=this.activeTargetIds.add(t)}fs(t){this.activeTargetIds=this.activeTargetIds.delete(t)}Rs(){const t={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(t)}}class vp{constructor(){this.io=new Ya,this.so={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(t){}updateMutationState(t,e,r){}addLocalQueryTarget(t){return this.io.Vs(t),this.so[t]||"not-current"}updateQueryState(t,e,r){this.so[t]=e}removeLocalQueryTarget(t){this.io.fs(t)}isLocalQueryTarget(t){return this.io.activeTargetIds.has(t)}clearQueryState(t){delete this.so[t]}getAllActiveQueryTargets(){return this.io.activeTargetIds}isActiveQueryTarget(t){return this.io.activeTargetIds.has(t)}start(){return this.io=new Ya,Promise.resolve()}handleUserChange(t,e,r){}setOnlineState(t){}shutdown(){}writeSequenceNumber(t){}notifyBundleLoaded(t){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ep{oo(t){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ja{constructor(){this._o=()=>this.ao(),this.uo=()=>this.co(),this.lo=[],this.ho()}oo(t){this.lo.push(t)}shutdown(){window.removeEventListener("online",this._o),window.removeEventListener("offline",this.uo)}ho(){window.addEventListener("online",this._o),window.addEventListener("offline",this.uo)}ao(){D("ConnectivityMonitor","Network connectivity changed: AVAILABLE");for(const t of this.lo)t(0)}co(){D("ConnectivityMonitor","Network connectivity changed: UNAVAILABLE");for(const t of this.lo)t(1)}static D(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let yr=null;function Bi(){return yr===null?yr=function(){return 268435456+Math.round(2147483648*Math.random())}():yr++,"0x"+yr.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Tp={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ip{constructor(t){this.Po=t.Po,this.Io=t.Io}To(t){this.Eo=t}Ao(t){this.Ro=t}Vo(t){this.mo=t}onMessage(t){this.fo=t}close(){this.Io()}send(t){this.Po(t)}po(){this.Eo()}yo(){this.Ro()}wo(t){this.mo(t)}So(t){this.fo(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mt="WebChannelConnection";class wp extends class{constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const r=e.ssl?"https":"http",i=encodeURIComponent(this.databaseId.projectId),o=encodeURIComponent(this.databaseId.database);this.bo=r+"://"+e.host,this.Do=`projects/${i}/databases/${o}`,this.Co=this.databaseId.database==="(default)"?`project_id=${i}`:`project_id=${i}&database_id=${o}`}get vo(){return!1}Fo(e,r,i,o,a){const u=Bi(),h=this.Mo(e,r.toUriEncodedString());D("RestConnection",`Sending RPC '${e}' ${u}:`,h,i);const f={"google-cloud-resource-prefix":this.Do,"x-goog-request-params":this.Co};return this.xo(f,o,a),this.Oo(e,h,f,i).then(m=>(D("RestConnection",`Received RPC '${e}' ${u}: `,m),m),m=>{throw Ie("RestConnection",`RPC '${e}' ${u} failed with error: `,m,"url: ",h,"request:",i),m})}No(e,r,i,o,a,u){return this.Fo(e,r,i,o,a)}xo(e,r,i){e["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+Te}(),e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),r&&r.headers.forEach((o,a)=>e[a]=o),i&&i.headers.forEach((o,a)=>e[a]=o)}Mo(e,r){const i=Tp[e];return`${this.bo}/v1/${r}:${i}`}terminate(){}}{constructor(t){super(t),this.forceLongPolling=t.forceLongPolling,this.autoDetectLongPolling=t.autoDetectLongPolling,this.useFetchStreams=t.useFetchStreams,this.longPollingOptions=t.longPollingOptions}Oo(t,e,r,i){const o=Bi();return new Promise((a,u)=>{const h=new jo;h.setWithCredentials(!0),h.listenOnce($o.COMPLETE,()=>{try{switch(h.getLastErrorCode()){case tr.NO_ERROR:const m=h.getResponseJson();D(mt,`XHR for RPC '${t}' ${o} received:`,JSON.stringify(m)),a(m);break;case tr.TIMEOUT:D(mt,`RPC '${t}' ${o} timed out`),u(new O(b.DEADLINE_EXCEEDED,"Request time out"));break;case tr.HTTP_ERROR:const I=h.getStatus();if(D(mt,`RPC '${t}' ${o} failed with status:`,I,"response text:",h.getResponseText()),I>0){let R=h.getResponseJson();Array.isArray(R)&&(R=R[0]);const P=R==null?void 0:R.error;if(P&&P.status&&P.message){const k=function(V){const q=V.toLowerCase().replace(/_/g,"-");return Object.values(b).indexOf(q)>=0?q:b.UNKNOWN}(P.status);u(new O(k,P.message))}else u(new O(b.UNKNOWN,"Server responded with status "+h.getStatus()))}else u(new O(b.UNAVAILABLE,"Connection failed."));break;default:x()}}finally{D(mt,`RPC '${t}' ${o} completed.`)}});const f=JSON.stringify(i);D(mt,`RPC '${t}' ${o} sending request:`,i),h.send(e,"POST",f,r,15)})}Lo(t,e,r){const i=Bi(),o=[this.bo,"/","google.firestore.v1.Firestore","/",t,"/channel"],a=Ko(),u=Ho(),h={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},f=this.longPollingOptions.timeoutSeconds;f!==void 0&&(h.longPollingTimeout=Math.round(1e3*f)),this.useFetchStreams&&(h.xmlHttpFactory=new qo({})),this.xo(h.initMessageHeaders,e,r),h.encodeInitMessageHeaders=!0;const m=o.join("");D(mt,`Creating RPC '${t}' stream ${i}: ${m}`,h);const I=a.createWebChannel(m,h);let R=!1,P=!1;const k=new Ip({Po:V=>{P?D(mt,`Not sending because RPC '${t}' stream ${i} is closed:`,V):(R||(D(mt,`Opening RPC '${t}' stream ${i} transport.`),I.open(),R=!0),D(mt,`RPC '${t}' stream ${i} sending:`,V),I.send(V))},Io:()=>I.close()}),N=(V,q,K)=>{V.listen(q,W=>{try{K(W)}catch(tt){setTimeout(()=>{throw tt},0)}})};return N(I,Ge.EventType.OPEN,()=>{P||(D(mt,`RPC '${t}' stream ${i} transport opened.`),k.po())}),N(I,Ge.EventType.CLOSE,()=>{P||(P=!0,D(mt,`RPC '${t}' stream ${i} transport closed`),k.wo())}),N(I,Ge.EventType.ERROR,V=>{P||(P=!0,Ie(mt,`RPC '${t}' stream ${i} transport errored:`,V),k.wo(new O(b.UNAVAILABLE,"The operation could not be completed")))}),N(I,Ge.EventType.MESSAGE,V=>{var q;if(!P){const K=V.data[0];G(!!K);const W=K,tt=W.error||((q=W[0])===null||q===void 0?void 0:q.error);if(tt){D(mt,`RPC '${t}' stream ${i} received error:`,tt);const St=tt.status;let et=function(_){const y=rt[_];if(y!==void 0)return Da(y)}(St),v=tt.message;et===void 0&&(et=b.INTERNAL,v="Unknown error status: "+St+" with message "+tt.message),P=!0,k.wo(new O(et,v)),I.close()}else D(mt,`RPC '${t}' stream ${i} received:`,K),k.So(K)}}),N(u,zo.STAT_EVENT,V=>{V.stat===pi.PROXY?D(mt,`RPC '${t}' stream ${i} detected buffering proxy`):V.stat===pi.NOPROXY&&D(mt,`RPC '${t}' stream ${i} detected no buffering proxy`)}),setTimeout(()=>{k.yo()},0),k}}function ji(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function vr(n){return new Nf(n,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Za{constructor(t,e,r=1e3,i=1.5,o=6e4){this.ai=t,this.timerId=e,this.Bo=r,this.ko=i,this.qo=o,this.Qo=0,this.Ko=null,this.$o=Date.now(),this.reset()}reset(){this.Qo=0}Uo(){this.Qo=this.qo}Wo(t){this.cancel();const e=Math.floor(this.Qo+this.Go()),r=Math.max(0,Date.now()-this.$o),i=Math.max(0,e-r);i>0&&D("ExponentialBackoff",`Backing off for ${i} ms (base delay: ${this.Qo} ms, delay with jitter: ${e} ms, last attempt: ${r} ms ago)`),this.Ko=this.ai.enqueueAfterDelay(this.timerId,i,()=>(this.$o=Date.now(),t())),this.Qo*=this.ko,this.Qo<this.Bo&&(this.Qo=this.Bo),this.Qo>this.qo&&(this.Qo=this.qo)}zo(){this.Ko!==null&&(this.Ko.skipDelay(),this.Ko=null)}cancel(){this.Ko!==null&&(this.Ko.cancel(),this.Ko=null)}Go(){return(Math.random()-.5)*this.Qo}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tc{constructor(t,e,r,i,o,a,u,h){this.ai=t,this.jo=r,this.Ho=i,this.connection=o,this.authCredentialsProvider=a,this.appCheckCredentialsProvider=u,this.listener=h,this.state=0,this.Jo=0,this.Yo=null,this.Zo=null,this.stream=null,this.Xo=0,this.e_=new Za(t,e)}t_(){return this.state===1||this.state===5||this.n_()}n_(){return this.state===2||this.state===3}start(){this.Xo=0,this.state!==4?this.auth():this.r_()}async stop(){this.t_()&&await this.close(0)}i_(){this.state=0,this.e_.reset()}s_(){this.n_()&&this.Yo===null&&(this.Yo=this.ai.enqueueAfterDelay(this.jo,6e4,()=>this.o_()))}__(t){this.a_(),this.stream.send(t)}async o_(){if(this.n_())return this.close(0)}a_(){this.Yo&&(this.Yo.cancel(),this.Yo=null)}u_(){this.Zo&&(this.Zo.cancel(),this.Zo=null)}async close(t,e){this.a_(),this.u_(),this.e_.cancel(),this.Jo++,t!==4?this.e_.reset():e&&e.code===b.RESOURCE_EXHAUSTED?(Mt(e.toString()),Mt("Using maximum backoff delay to prevent overloading the backend."),this.e_.Uo()):e&&e.code===b.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.c_(),this.stream.close(),this.stream=null),this.state=t,await this.listener.Vo(e)}c_(){}auth(){this.state=1;const t=this.l_(this.Jo),e=this.Jo;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([r,i])=>{this.Jo===e&&this.h_(r,i)},r=>{t(()=>{const i=new O(b.UNKNOWN,"Fetching auth token failed: "+r.message);return this.P_(i)})})}h_(t,e){const r=this.l_(this.Jo);this.stream=this.I_(t,e),this.stream.To(()=>{r(()=>this.listener.To())}),this.stream.Ao(()=>{r(()=>(this.state=2,this.Zo=this.ai.enqueueAfterDelay(this.Ho,1e4,()=>(this.n_()&&(this.state=3),Promise.resolve())),this.listener.Ao()))}),this.stream.Vo(i=>{r(()=>this.P_(i))}),this.stream.onMessage(i=>{r(()=>++this.Xo==1?this.T_(i):this.onNext(i))})}r_(){this.state=5,this.e_.Wo(async()=>{this.state=0,this.start()})}P_(t){return D("PersistentStream",`close with error: ${t}`),this.stream=null,this.close(4,t)}l_(t){return e=>{this.ai.enqueueAndForget(()=>this.Jo===t?e():(D("PersistentStream","stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class Ap extends tc{constructor(t,e,r,i,o,a){super(t,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",e,r,i,a),this.serializer=o}I_(t,e){return this.connection.Lo("Listen",t,e)}T_(t){return this.onNext(t)}onNext(t){this.e_.reset();const e=xf(this.serializer,t),r=function(o){if(!("targetChange"in o))return F.min();const a=o.targetChange;return a.targetIds&&a.targetIds.length?F.min():a.readTime?Ot(a.readTime):F.min()}(t);return this.listener.E_(e,r)}d_(t){const e={};e.database=Mi(this.serializer),e.addTarget=function(o,a){let u;const h=a.target;if(u=Ri(h)?{documents:Uf(o,h)}:{query:Bf(o,h)._t},u.targetId=a.targetId,a.resumeToken.approximateByteSize()>0){u.resumeToken=Ba(o,a.resumeToken);const f=Vi(o,a.expectedCount);f!==null&&(u.expectedCount=f)}else if(a.snapshotVersion.compareTo(F.min())>0){u.readTime=_r(o,a.snapshotVersion.toTimestamp());const f=Vi(o,a.expectedCount);f!==null&&(u.expectedCount=f)}return u}(this.serializer,t);const r=qf(this.serializer,t);r&&(e.labels=r),this.__(e)}A_(t){const e={};e.database=Mi(this.serializer),e.removeTarget=t,this.__(e)}}class Rp extends tc{constructor(t,e,r,i,o,a){super(t,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",e,r,i,a),this.serializer=o}get R_(){return this.Xo>0}start(){this.lastStreamToken=void 0,super.start()}c_(){this.R_&&this.V_([])}I_(t,e){return this.connection.Lo("Write",t,e)}T_(t){return G(!!t.streamToken),this.lastStreamToken=t.streamToken,G(!t.writeResults||t.writeResults.length===0),this.listener.m_()}onNext(t){G(!!t.streamToken),this.lastStreamToken=t.streamToken,this.e_.reset();const e=Ff(t.writeResults,t.commitTime),r=Ot(t.commitTime);return this.listener.f_(r,e)}g_(){const t={};t.database=Mi(this.serializer),this.__(t)}V_(t){const e={streamToken:this.lastStreamToken,writes:t.map(r=>Lf(this.serializer,r))};this.__(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sp extends class{}{constructor(t,e,r,i){super(),this.authCredentials=t,this.appCheckCredentials=e,this.connection=r,this.serializer=i,this.p_=!1}y_(){if(this.p_)throw new O(b.FAILED_PRECONDITION,"The client has already been terminated.")}Fo(t,e,r,i){return this.y_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([o,a])=>this.connection.Fo(t,Di(e,r),i,o,a)).catch(o=>{throw o.name==="FirebaseError"?(o.code===b.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new O(b.UNKNOWN,o.toString())})}No(t,e,r,i,o){return this.y_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([a,u])=>this.connection.No(t,Di(e,r),i,a,u,o)).catch(a=>{throw a.name==="FirebaseError"?(a.code===b.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),a):new O(b.UNKNOWN,a.toString())})}terminate(){this.p_=!0,this.connection.terminate()}}class bp{constructor(t,e){this.asyncQueue=t,this.onlineStateHandler=e,this.state="Unknown",this.w_=0,this.S_=null,this.b_=!0}D_(){this.w_===0&&(this.C_("Unknown"),this.S_=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.S_=null,this.v_("Backend didn't respond within 10 seconds."),this.C_("Offline"),Promise.resolve())))}F_(t){this.state==="Online"?this.C_("Unknown"):(this.w_++,this.w_>=1&&(this.M_(),this.v_(`Connection failed 1 times. Most recent error: ${t.toString()}`),this.C_("Offline")))}set(t){this.M_(),this.w_=0,t==="Online"&&(this.b_=!1),this.C_(t)}C_(t){t!==this.state&&(this.state=t,this.onlineStateHandler(t))}v_(t){const e=`Could not reach Cloud Firestore backend. ${t}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.b_?(Mt(e),this.b_=!1):D("OnlineStateTracker",e)}M_(){this.S_!==null&&(this.S_.cancel(),this.S_=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pp{constructor(t,e,r,i,o){this.localStore=t,this.datastore=e,this.asyncQueue=r,this.remoteSyncer={},this.x_=[],this.O_=new Map,this.N_=new Set,this.L_=[],this.B_=o,this.B_.oo(a=>{r.enqueueAndForget(async()=>{de(this)&&(D("RemoteStore","Restarting streams for network reachability change."),await async function(h){const f=L(h);f.N_.add(4),await pn(f),f.k_.set("Unknown"),f.N_.delete(4),await Er(f)}(this))})}),this.k_=new bp(r,i)}}async function Er(n){if(de(n))for(const t of n.L_)await t(!0)}async function pn(n){for(const t of n.L_)await t(!1)}function ec(n,t){const e=L(n);e.O_.has(t.targetId)||(e.O_.set(t.targetId,t),Hi(e)?zi(e):De(e).n_()&&$i(e,t))}function qi(n,t){const e=L(n),r=De(e);e.O_.delete(t),r.n_()&&nc(e,t),e.O_.size===0&&(r.n_()?r.s_():de(e)&&e.k_.set("Unknown"))}function $i(n,t){if(n.q_.xe(t.targetId),t.resumeToken.approximateByteSize()>0||t.snapshotVersion.compareTo(F.min())>0){const e=n.remoteSyncer.getRemoteKeysForTarget(t.targetId).size;t=t.withExpectedCount(e)}De(n).d_(t)}function nc(n,t){n.q_.xe(t),De(n).A_(t)}function zi(n){n.q_=new Cf({getRemoteKeysForTarget:t=>n.remoteSyncer.getRemoteKeysForTarget(t),ot:t=>n.O_.get(t)||null,tt:()=>n.datastore.serializer.databaseId}),De(n).start(),n.k_.D_()}function Hi(n){return de(n)&&!De(n).t_()&&n.O_.size>0}function de(n){return L(n).N_.size===0}function rc(n){n.q_=void 0}async function Cp(n){n.k_.set("Online")}async function Vp(n){n.O_.forEach((t,e)=>{$i(n,t)})}async function kp(n,t){rc(n),Hi(n)?(n.k_.F_(t),zi(n)):n.k_.set("Unknown")}async function Dp(n,t,e){if(n.k_.set("Online"),t instanceof xa&&t.state===2&&t.cause)try{await async function(i,o){const a=o.cause;for(const u of o.targetIds)i.O_.has(u)&&(await i.remoteSyncer.rejectListen(u,a),i.O_.delete(u),i.q_.removeTarget(u))}(n,t)}catch(r){D("RemoteStore","Failed to remove targets %s: %s ",t.targetIds.join(","),r),await Tr(n,r)}else if(t instanceof gr?n.q_.Ke(t):t instanceof Ma?n.q_.He(t):n.q_.We(t),!e.isEqual(F.min()))try{const r=await Qa(n.localStore);e.compareTo(r)>=0&&await function(o,a){const u=o.q_.rt(a);return u.targetChanges.forEach((h,f)=>{if(h.resumeToken.approximateByteSize()>0){const m=o.O_.get(f);m&&o.O_.set(f,m.withResumeToken(h.resumeToken,a))}}),u.targetMismatches.forEach((h,f)=>{const m=o.O_.get(h);if(!m)return;o.O_.set(h,m.withResumeToken(lt.EMPTY_BYTE_STRING,m.snapshotVersion)),nc(o,h);const I=new Xt(m.target,h,f,m.sequenceNumber);$i(o,I)}),o.remoteSyncer.applyRemoteEvent(u)}(n,e)}catch(r){D("RemoteStore","Failed to raise snapshot:",r),await Tr(n,r)}}async function Tr(n,t,e){if(!Je(t))throw t;n.N_.add(1),await pn(n),n.k_.set("Offline"),e||(e=()=>Qa(n.localStore)),n.asyncQueue.enqueueRetryable(async()=>{D("RemoteStore","Retrying IndexedDB access"),await e(),n.N_.delete(1),await Er(n)})}function ic(n,t){return t().catch(e=>Tr(n,e,t))}async function Ir(n){const t=L(n),e=Yt(t);let r=t.x_.length>0?t.x_[t.x_.length-1].batchId:-1;for(;Np(t);)try{const i=await gp(t.localStore,r);if(i===null){t.x_.length===0&&e.s_();break}r=i.batchId,Op(t,i)}catch(i){await Tr(t,i)}sc(t)&&oc(t)}function Np(n){return de(n)&&n.x_.length<10}function Op(n,t){n.x_.push(t);const e=Yt(n);e.n_()&&e.R_&&e.V_(t.mutations)}function sc(n){return de(n)&&!Yt(n).t_()&&n.x_.length>0}function oc(n){Yt(n).start()}async function Mp(n){Yt(n).g_()}async function xp(n){const t=Yt(n);for(const e of n.x_)t.V_(e.mutations)}async function Lp(n,t,e){const r=n.x_.shift(),i=Pi.from(r,t,e);await ic(n,()=>n.remoteSyncer.applySuccessfulWrite(i)),await Ir(n)}async function Fp(n,t){t&&Yt(n).R_&&await async function(r,i){if(function(a){return Sf(a)&&a!==b.ABORTED}(i.code)){const o=r.x_.shift();Yt(r).i_(),await ic(r,()=>r.remoteSyncer.rejectFailedWrite(o.batchId,i)),await Ir(r)}}(n,t),sc(n)&&oc(n)}async function ac(n,t){const e=L(n);e.asyncQueue.verifyOperationInProgress(),D("RemoteStore","RemoteStore received new credentials");const r=de(e);e.N_.add(3),await pn(e),r&&e.k_.set("Unknown"),await e.remoteSyncer.handleCredentialChange(t),e.N_.delete(3),await Er(e)}async function Up(n,t){const e=L(n);t?(e.N_.delete(2),await Er(e)):t||(e.N_.add(2),await pn(e),e.k_.set("Unknown"))}function De(n){return n.Q_||(n.Q_=function(e,r,i){const o=L(e);return o.y_(),new Ap(r,o.connection,o.authCredentials,o.appCheckCredentials,o.serializer,i)}(n.datastore,n.asyncQueue,{To:Cp.bind(null,n),Ao:Vp.bind(null,n),Vo:kp.bind(null,n),E_:Dp.bind(null,n)}),n.L_.push(async t=>{t?(n.Q_.i_(),Hi(n)?zi(n):n.k_.set("Unknown")):(await n.Q_.stop(),rc(n))})),n.Q_}function Yt(n){return n.K_||(n.K_=function(e,r,i){const o=L(e);return o.y_(),new Rp(r,o.connection,o.authCredentials,o.appCheckCredentials,o.serializer,i)}(n.datastore,n.asyncQueue,{To:()=>Promise.resolve(),Ao:Mp.bind(null,n),Vo:Fp.bind(null,n),m_:xp.bind(null,n),f_:Lp.bind(null,n)}),n.L_.push(async t=>{t?(n.K_.i_(),await Ir(n)):(await n.K_.stop(),n.x_.length>0&&(D("RemoteStore",`Stopping write stream with ${n.x_.length} pending writes`),n.x_=[]))})),n.K_}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ki{constructor(t,e,r,i,o){this.asyncQueue=t,this.timerId=e,this.targetTimeMs=r,this.op=i,this.removalCallback=o,this.deferred=new ae,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(a=>{})}get promise(){return this.deferred.promise}static createAndSchedule(t,e,r,i,o){const a=Date.now()+r,u=new Ki(t,e,a,i,o);return u.start(r),u}start(t){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),t)}skipDelay(){return this.handleDelayElapsed()}cancel(t){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new O(b.CANCELLED,"Operation cancelled"+(t?": "+t:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(t=>this.deferred.resolve(t))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function Wi(n,t){if(Mt("AsyncQueue",`${t}: ${n}`),Je(n))return new O(b.UNAVAILABLE,`${t}: ${n}`);throw n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ne{constructor(t){this.comparator=t?(e,r)=>t(e,r)||M.comparator(e.key,r.key):(e,r)=>M.comparator(e.key,r.key),this.keyedMap=sn(),this.sortedSet=new Y(this.comparator)}static emptySet(t){return new Ne(t.comparator)}has(t){return this.keyedMap.get(t)!=null}get(t){return this.keyedMap.get(t)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(t){const e=this.keyedMap.get(t);return e?this.sortedSet.indexOf(e):-1}get size(){return this.sortedSet.size}forEach(t){this.sortedSet.inorderTraversal((e,r)=>(t(e),!1))}add(t){const e=this.delete(t.key);return e.copy(e.keyedMap.insert(t.key,t),e.sortedSet.insert(t,null))}delete(t){const e=this.get(t);return e?this.copy(this.keyedMap.remove(t),this.sortedSet.remove(e)):this}isEqual(t){if(!(t instanceof Ne)||this.size!==t.size)return!1;const e=this.sortedSet.getIterator(),r=t.sortedSet.getIterator();for(;e.hasNext();){const i=e.getNext().key,o=r.getNext().key;if(!i.isEqual(o))return!1}return!0}toString(){const t=[];return this.forEach(e=>{t.push(e.toString())}),t.length===0?"DocumentSet ()":`DocumentSet (
  `+t.join(`  
`)+`
)`}copy(t,e){const r=new Ne;return r.comparator=this.comparator,r.keyedMap=t,r.sortedSet=e,r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cc{constructor(){this.U_=new Y(M.comparator)}track(t){const e=t.doc.key,r=this.U_.get(e);r?t.type!==0&&r.type===3?this.U_=this.U_.insert(e,t):t.type===3&&r.type!==1?this.U_=this.U_.insert(e,{type:r.type,doc:t.doc}):t.type===2&&r.type===2?this.U_=this.U_.insert(e,{type:2,doc:t.doc}):t.type===2&&r.type===0?this.U_=this.U_.insert(e,{type:0,doc:t.doc}):t.type===1&&r.type===0?this.U_=this.U_.remove(e):t.type===1&&r.type===2?this.U_=this.U_.insert(e,{type:1,doc:r.doc}):t.type===0&&r.type===1?this.U_=this.U_.insert(e,{type:2,doc:t.doc}):x():this.U_=this.U_.insert(e,t)}W_(){const t=[];return this.U_.inorderTraversal((e,r)=>{t.push(r)}),t}}class Oe{constructor(t,e,r,i,o,a,u,h,f){this.query=t,this.docs=e,this.oldDocs=r,this.docChanges=i,this.mutatedKeys=o,this.fromCache=a,this.syncStateChanged=u,this.excludesMetadataChanges=h,this.hasCachedResults=f}static fromInitialDocuments(t,e,r,i,o){const a=[];return e.forEach(u=>{a.push({type:0,doc:u})}),new Oe(t,e,Ne.emptySet(e),a,r,i,!0,!1,o)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(t){if(!(this.fromCache===t.fromCache&&this.hasCachedResults===t.hasCachedResults&&this.syncStateChanged===t.syncStateChanged&&this.mutatedKeys.isEqual(t.mutatedKeys)&&ur(this.query,t.query)&&this.docs.isEqual(t.docs)&&this.oldDocs.isEqual(t.oldDocs)))return!1;const e=this.docChanges,r=t.docChanges;if(e.length!==r.length)return!1;for(let i=0;i<e.length;i++)if(e[i].type!==r[i].type||!e[i].doc.isEqual(r[i].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bp{constructor(){this.G_=void 0,this.z_=[]}j_(){return this.z_.some(t=>t.H_())}}class jp{constructor(){this.queries=uc(),this.onlineState="Unknown",this.J_=new Set}terminate(){(function(e,r){const i=L(e),o=i.queries;i.queries=uc(),o.forEach((a,u)=>{for(const h of u.z_)h.onError(r)})})(this,new O(b.ABORTED,"Firestore shutting down"))}}function uc(){return new Pe(n=>pa(n),ur)}async function qp(n,t){const e=L(n);let r=3;const i=t.query;let o=e.queries.get(i);o?!o.j_()&&t.H_()&&(r=2):(o=new Bp,r=t.H_()?0:1);try{switch(r){case 0:o.G_=await e.onListen(i,!0);break;case 1:o.G_=await e.onListen(i,!1);break;case 2:await e.onFirstRemoteStoreListen(i)}}catch(a){const u=Wi(a,`Initialization of query '${be(t.query)}' failed`);return void t.onError(u)}e.queries.set(i,o),o.z_.push(t),t.Y_(e.onlineState),o.G_&&t.Z_(o.G_)&&Gi(e)}async function $p(n,t){const e=L(n),r=t.query;let i=3;const o=e.queries.get(r);if(o){const a=o.z_.indexOf(t);a>=0&&(o.z_.splice(a,1),o.z_.length===0?i=t.H_()?0:1:!o.j_()&&t.H_()&&(i=2))}switch(i){case 0:return e.queries.delete(r),e.onUnlisten(r,!0);case 1:return e.queries.delete(r),e.onUnlisten(r,!1);case 2:return e.onLastRemoteStoreUnlisten(r);default:return}}function zp(n,t){const e=L(n);let r=!1;for(const i of t){const o=i.query,a=e.queries.get(o);if(a){for(const u of a.z_)u.Z_(i)&&(r=!0);a.G_=i}}r&&Gi(e)}function Hp(n,t,e){const r=L(n),i=r.queries.get(t);if(i)for(const o of i.z_)o.onError(e);r.queries.delete(t)}function Gi(n){n.J_.forEach(t=>{t.next()})}var Qi,lc;(lc=Qi||(Qi={})).X_="default",lc.Cache="cache";class Kp{constructor(t,e,r){this.query=t,this.ea=e,this.ta=!1,this.na=null,this.onlineState="Unknown",this.options=r||{}}Z_(t){if(!this.options.includeMetadataChanges){const r=[];for(const i of t.docChanges)i.type!==3&&r.push(i);t=new Oe(t.query,t.docs,t.oldDocs,r,t.mutatedKeys,t.fromCache,t.syncStateChanged,!0,t.hasCachedResults)}let e=!1;return this.ta?this.ra(t)&&(this.ea.next(t),e=!0):this.ia(t,this.onlineState)&&(this.sa(t),e=!0),this.na=t,e}onError(t){this.ea.error(t)}Y_(t){this.onlineState=t;let e=!1;return this.na&&!this.ta&&this.ia(this.na,t)&&(this.sa(this.na),e=!0),e}ia(t,e){if(!t.fromCache||!this.H_())return!0;const r=e!=="Offline";return(!this.options.oa||!r)&&(!t.docs.isEmpty()||t.hasCachedResults||e==="Offline")}ra(t){if(t.docChanges.length>0)return!0;const e=this.na&&this.na.hasPendingWrites!==t.hasPendingWrites;return!(!t.syncStateChanged&&!e)&&this.options.includeMetadataChanges===!0}sa(t){t=Oe.fromInitialDocuments(t.query,t.docs,t.mutatedKeys,t.fromCache,t.hasCachedResults),this.ta=!0,this.ea.next(t)}H_(){return this.options.source!==Qi.Cache}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hc{constructor(t){this.key=t}}class dc{constructor(t){this.key=t}}class Wp{constructor(t,e){this.query=t,this.Ia=e,this.Ta=null,this.hasCachedResults=!1,this.current=!1,this.Ea=U(),this.mutatedKeys=U(),this.da=ma(t),this.Aa=new Ne(this.da)}get Ra(){return this.Ia}Va(t,e){const r=e?e.ma:new cc,i=e?e.Aa:this.Aa;let o=e?e.mutatedKeys:this.mutatedKeys,a=i,u=!1;const h=this.query.limitType==="F"&&i.size===this.query.limit?i.last():null,f=this.query.limitType==="L"&&i.size===this.query.limit?i.first():null;if(t.inorderTraversal((m,I)=>{const R=i.get(m),P=lr(this.query,I)?I:null,k=!!R&&this.mutatedKeys.has(R.key),N=!!P&&(P.hasLocalMutations||this.mutatedKeys.has(P.key)&&P.hasCommittedMutations);let V=!1;R&&P?R.data.isEqual(P.data)?k!==N&&(r.track({type:3,doc:P}),V=!0):this.fa(R,P)||(r.track({type:2,doc:P}),V=!0,(h&&this.da(P,h)>0||f&&this.da(P,f)<0)&&(u=!0)):!R&&P?(r.track({type:0,doc:P}),V=!0):R&&!P&&(r.track({type:1,doc:R}),V=!0,(h||f)&&(u=!0)),V&&(P?(a=a.add(P),o=N?o.add(m):o.delete(m)):(a=a.delete(m),o=o.delete(m)))}),this.query.limit!==null)for(;a.size>this.query.limit;){const m=this.query.limitType==="F"?a.last():a.first();a=a.delete(m.key),o=o.delete(m.key),r.track({type:1,doc:m})}return{Aa:a,ma:r,ts:u,mutatedKeys:o}}fa(t,e){return t.hasLocalMutations&&e.hasCommittedMutations&&!e.hasLocalMutations}applyChanges(t,e,r,i){const o=this.Aa;this.Aa=t.Aa,this.mutatedKeys=t.mutatedKeys;const a=t.ma.W_();a.sort((m,I)=>function(P,k){const N=V=>{switch(V){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return x()}};return N(P)-N(k)}(m.type,I.type)||this.da(m.doc,I.doc)),this.ga(r),i=i!=null&&i;const u=e&&!i?this.pa():[],h=this.Ea.size===0&&this.current&&!i?1:0,f=h!==this.Ta;return this.Ta=h,a.length!==0||f?{snapshot:new Oe(this.query,t.Aa,o,a,t.mutatedKeys,h===0,f,!1,!!r&&r.resumeToken.approximateByteSize()>0),ya:u}:{ya:u}}Y_(t){return this.current&&t==="Offline"?(this.current=!1,this.applyChanges({Aa:this.Aa,ma:new cc,mutatedKeys:this.mutatedKeys,ts:!1},!1)):{ya:[]}}wa(t){return!this.Ia.has(t)&&!!this.Aa.has(t)&&!this.Aa.get(t).hasLocalMutations}ga(t){t&&(t.addedDocuments.forEach(e=>this.Ia=this.Ia.add(e)),t.modifiedDocuments.forEach(e=>{}),t.removedDocuments.forEach(e=>this.Ia=this.Ia.delete(e)),this.current=t.current)}pa(){if(!this.current)return[];const t=this.Ea;this.Ea=U(),this.Aa.forEach(r=>{this.wa(r.key)&&(this.Ea=this.Ea.add(r.key))});const e=[];return t.forEach(r=>{this.Ea.has(r)||e.push(new dc(r))}),this.Ea.forEach(r=>{t.has(r)||e.push(new hc(r))}),e}Sa(t){this.Ia=t.Is,this.Ea=U();const e=this.Va(t.documents);return this.applyChanges(e,!0)}ba(){return Oe.fromInitialDocuments(this.query,this.Aa,this.mutatedKeys,this.Ta===0,this.hasCachedResults)}}class Gp{constructor(t,e,r){this.query=t,this.targetId=e,this.view=r}}class Qp{constructor(t){this.key=t,this.Da=!1}}class Xp{constructor(t,e,r,i,o,a){this.localStore=t,this.remoteStore=e,this.eventManager=r,this.sharedClientState=i,this.currentUser=o,this.maxConcurrentLimboResolutions=a,this.Ca={},this.va=new Pe(u=>pa(u),ur),this.Fa=new Map,this.Ma=new Set,this.xa=new Y(M.comparator),this.Oa=new Map,this.Na=new xi,this.La={},this.Ba=new Map,this.ka=ke.Bn(),this.onlineState="Unknown",this.qa=void 0}get isPrimaryClient(){return this.qa===!0}}async function Yp(n,t,e=!0){const r=Ec(n);let i;const o=r.va.get(t);return o?(r.sharedClientState.addLocalQueryTarget(o.targetId),i=o.view.ba()):i=await fc(r,t,e,!0),i}async function Jp(n,t){const e=Ec(n);await fc(e,t,!0,!1)}async function fc(n,t,e,r){const i=await _p(n.localStore,Nt(t)),o=i.targetId,a=e?n.sharedClientState.addLocalQueryTarget(o):"not-current";let u;return r&&(u=await Zp(n,t,o,a==="current",i.resumeToken)),n.isPrimaryClient&&e&&ec(n.remoteStore,i),u}async function Zp(n,t,e,r,i){n.Qa=(I,R,P)=>async function(N,V,q,K){let W=V.view.Va(q);W.ts&&(W=await Xa(N.localStore,V.query,!1).then(({documents:v})=>V.view.Va(v,W)));const tt=K&&K.targetChanges.get(V.targetId),St=K&&K.targetMismatches.get(V.targetId)!=null,et=V.view.applyChanges(W,N.isPrimaryClient,tt,St);return vc(N,V.targetId,et.ya),et.snapshot}(n,I,R,P);const o=await Xa(n.localStore,t,!0),a=new Wp(t,o.Is),u=a.Va(o.documents),h=fn.createSynthesizedTargetChangeForCurrentChange(e,r&&n.onlineState!=="Offline",i),f=a.applyChanges(u,n.isPrimaryClient,h);vc(n,e,f.ya);const m=new Gp(t,e,a);return n.va.set(t,m),n.Fa.has(e)?n.Fa.get(e).push(t):n.Fa.set(e,[t]),f.snapshot}async function tm(n,t,e){const r=L(n),i=r.va.get(t),o=r.Fa.get(i.targetId);if(o.length>1)return r.Fa.set(i.targetId,o.filter(a=>!ur(a,t))),void r.va.delete(t);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(i.targetId),r.sharedClientState.isActiveQueryTarget(i.targetId)||await Ui(r.localStore,i.targetId,!1).then(()=>{r.sharedClientState.clearQueryState(i.targetId),e&&qi(r.remoteStore,i.targetId),Xi(r,i.targetId)}).catch(Ye)):(Xi(r,i.targetId),await Ui(r.localStore,i.targetId,!0))}async function em(n,t){const e=L(n),r=e.va.get(t),i=e.Fa.get(r.targetId);e.isPrimaryClient&&i.length===1&&(e.sharedClientState.removeLocalQueryTarget(r.targetId),qi(e.remoteStore,r.targetId))}async function nm(n,t,e){const r=um(n);try{const i=await function(a,u){const h=L(a),f=it.now(),m=u.reduce((P,k)=>P.add(k.key),U());let I,R;return h.persistence.runTransaction("Locally write mutations","readwrite",P=>{let k=xt(),N=U();return h.us.getEntries(P,m).next(V=>{k=V,k.forEach((q,K)=>{K.isValidDocument()||(N=N.add(q))})}).next(()=>h.localDocuments.getOverlayedDocuments(P,k)).next(V=>{I=V;const q=[];for(const K of u){const W=Tf(K,I.get(K.key).overlayedDocument);W!=null&&q.push(new he(K.key,W,ra(W.value.mapValue),Lt.exists(!0)))}return h.mutationQueue.addMutationBatch(P,f,q,u)}).next(V=>{R=V;const q=V.applyToLocalDocumentSet(I,N);return h.documentOverlayCache.saveOverlays(P,V.batchId,q)})}).then(()=>({batchId:R.batchId,changes:_a(I)}))}(r.localStore,t);r.sharedClientState.addPendingMutation(i.batchId),function(a,u,h){let f=a.La[a.currentUser.toKey()];f||(f=new Y(H)),f=f.insert(u,h),a.La[a.currentUser.toKey()]=f}(r,i.batchId,e),await mn(r,i.changes),await Ir(r.remoteStore)}catch(i){const o=Wi(i,"Failed to persist write");e.reject(o)}}async function pc(n,t){const e=L(n);try{const r=await pp(e.localStore,t);t.targetChanges.forEach((i,o)=>{const a=e.Oa.get(o);a&&(G(i.addedDocuments.size+i.modifiedDocuments.size+i.removedDocuments.size<=1),i.addedDocuments.size>0?a.Da=!0:i.modifiedDocuments.size>0?G(a.Da):i.removedDocuments.size>0&&(G(a.Da),a.Da=!1))}),await mn(e,r,t)}catch(r){await Ye(r)}}function mc(n,t,e){const r=L(n);if(r.isPrimaryClient&&e===0||!r.isPrimaryClient&&e===1){const i=[];r.va.forEach((o,a)=>{const u=a.view.Y_(t);u.snapshot&&i.push(u.snapshot)}),function(a,u){const h=L(a);h.onlineState=u;let f=!1;h.queries.forEach((m,I)=>{for(const R of I.z_)R.Y_(u)&&(f=!0)}),f&&Gi(h)}(r.eventManager,t),i.length&&r.Ca.E_(i),r.onlineState=t,r.isPrimaryClient&&r.sharedClientState.setOnlineState(t)}}async function rm(n,t,e){const r=L(n);r.sharedClientState.updateQueryState(t,"rejected",e);const i=r.Oa.get(t),o=i&&i.key;if(o){let a=new Y(M.comparator);a=a.insert(o,pt.newNoDocument(o,F.min()));const u=U().add(o),h=new mr(F.min(),new Map,new Y(H),a,u);await pc(r,h),r.xa=r.xa.remove(o),r.Oa.delete(t),Yi(r)}else await Ui(r.localStore,t,!1).then(()=>Xi(r,t,e)).catch(Ye)}async function im(n,t){const e=L(n),r=t.batch.batchId;try{const i=await fp(e.localStore,t);_c(e,r,null),gc(e,r),e.sharedClientState.updateMutationState(r,"acknowledged"),await mn(e,i)}catch(i){await Ye(i)}}async function sm(n,t,e){const r=L(n);try{const i=await function(a,u){const h=L(a);return h.persistence.runTransaction("Reject batch","readwrite-primary",f=>{let m;return h.mutationQueue.lookupMutationBatch(f,u).next(I=>(G(I!==null),m=I.keys(),h.mutationQueue.removeMutationBatch(f,I))).next(()=>h.mutationQueue.performConsistencyCheck(f)).next(()=>h.documentOverlayCache.removeOverlaysForBatchId(f,m,u)).next(()=>h.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(f,m)).next(()=>h.localDocuments.getDocuments(f,m))})}(r.localStore,t);_c(r,t,e),gc(r,t),r.sharedClientState.updateMutationState(t,"rejected",e),await mn(r,i)}catch(i){await Ye(i)}}function gc(n,t){(n.Ba.get(t)||[]).forEach(e=>{e.resolve()}),n.Ba.delete(t)}function _c(n,t,e){const r=L(n);let i=r.La[r.currentUser.toKey()];if(i){const o=i.get(t);o&&(e?o.reject(e):o.resolve(),i=i.remove(t)),r.La[r.currentUser.toKey()]=i}}function Xi(n,t,e=null){n.sharedClientState.removeLocalQueryTarget(t);for(const r of n.Fa.get(t))n.va.delete(r),e&&n.Ca.Ka(r,e);n.Fa.delete(t),n.isPrimaryClient&&n.Na.mr(t).forEach(r=>{n.Na.containsKey(r)||yc(n,r)})}function yc(n,t){n.Ma.delete(t.path.canonicalString());const e=n.xa.get(t);e!==null&&(qi(n.remoteStore,e),n.xa=n.xa.remove(t),n.Oa.delete(e),Yi(n))}function vc(n,t,e){for(const r of e)r instanceof hc?(n.Na.addReference(r.key,t),om(n,r)):r instanceof dc?(D("SyncEngine","Document no longer in limbo: "+r.key),n.Na.removeReference(r.key,t),n.Na.containsKey(r.key)||yc(n,r.key)):x()}function om(n,t){const e=t.key,r=e.path.canonicalString();n.xa.get(e)||n.Ma.has(r)||(D("SyncEngine","New document in limbo: "+e),n.Ma.add(r),Yi(n))}function Yi(n){for(;n.Ma.size>0&&n.xa.size<n.maxConcurrentLimboResolutions;){const t=n.Ma.values().next().value;n.Ma.delete(t);const e=new M(J.fromString(t)),r=n.ka.next();n.Oa.set(r,new Qp(e)),n.xa=n.xa.insert(e,r),ec(n.remoteStore,new Xt(Nt(Si(e.path)),r,"TargetPurposeLimboResolution",gi.oe))}}async function mn(n,t,e){const r=L(n),i=[],o=[],a=[];r.va.isEmpty()||(r.va.forEach((u,h)=>{a.push(r.Qa(h,t,e).then(f=>{var m;if((f||e)&&r.isPrimaryClient){const I=f?!f.fromCache:(m=e==null?void 0:e.targetChanges.get(h.targetId))===null||m===void 0?void 0:m.current;r.sharedClientState.updateQueryState(h.targetId,I?"current":"not-current")}if(f){i.push(f);const I=Fi.Ui(h.targetId,f);o.push(I)}}))}),await Promise.all(a),r.Ca.E_(i),await async function(h,f){const m=L(h);try{await m.persistence.runTransaction("notifyLocalViewChanges","readwrite",I=>S.forEach(f,R=>S.forEach(R.Ki,P=>m.persistence.referenceDelegate.addReference(I,R.targetId,P)).next(()=>S.forEach(R.$i,P=>m.persistence.referenceDelegate.removeReference(I,R.targetId,P)))))}catch(I){if(!Je(I))throw I;D("LocalStore","Failed to update sequence numbers: "+I)}for(const I of f){const R=I.targetId;if(!I.fromCache){const P=m.ss.get(R),k=P.snapshotVersion,N=P.withLastLimboFreeSnapshotVersion(k);m.ss=m.ss.insert(R,N)}}}(r.localStore,o))}async function am(n,t){const e=L(n);if(!e.currentUser.isEqual(t)){D("SyncEngine","User change. New user:",t.toKey());const r=await Ga(e.localStore,t);e.currentUser=t,function(o,a){o.Ba.forEach(u=>{u.forEach(h=>{h.reject(new O(b.CANCELLED,a))})}),o.Ba.clear()}(e,"'waitForPendingWrites' promise is rejected due to a user change."),e.sharedClientState.handleUserChange(t,r.removedBatchIds,r.addedBatchIds),await mn(e,r.ls)}}function cm(n,t){const e=L(n),r=e.Oa.get(t);if(r&&r.Da)return U().add(r.key);{let i=U();const o=e.Fa.get(t);if(!o)return i;for(const a of o){const u=e.va.get(a);i=i.unionWith(u.view.Ra)}return i}}function Ec(n){const t=L(n);return t.remoteStore.remoteSyncer.applyRemoteEvent=pc.bind(null,t),t.remoteStore.remoteSyncer.getRemoteKeysForTarget=cm.bind(null,t),t.remoteStore.remoteSyncer.rejectListen=rm.bind(null,t),t.Ca.E_=zp.bind(null,t.eventManager),t.Ca.Ka=Hp.bind(null,t.eventManager),t}function um(n){const t=L(n);return t.remoteStore.remoteSyncer.applySuccessfulWrite=im.bind(null,t),t.remoteStore.remoteSyncer.rejectFailedWrite=sm.bind(null,t),t}class Tc{constructor(){this.synchronizeTabs=!1}async initialize(t){this.serializer=vr(t.databaseInfo.databaseId),this.sharedClientState=this.createSharedClientState(t),this.persistence=this.createPersistence(t),await this.persistence.start(),this.localStore=this.createLocalStore(t),this.gcScheduler=this.createGarbageCollectionScheduler(t,this.localStore),this.indexBackfillerScheduler=this.createIndexBackfillerScheduler(t,this.localStore)}createGarbageCollectionScheduler(t,e){return null}createIndexBackfillerScheduler(t,e){return null}createLocalStore(t){return dp(this.persistence,new lp,t.initialUser,this.serializer)}createPersistence(t){return new ap(Li.Yr,this.serializer)}createSharedClientState(t){return new vp}async terminate(){var t,e;(t=this.gcScheduler)===null||t===void 0||t.stop(),(e=this.indexBackfillerScheduler)===null||e===void 0||e.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}class lm{async initialize(t,e){this.localStore||(this.localStore=t.localStore,this.sharedClientState=t.sharedClientState,this.datastore=this.createDatastore(e),this.remoteStore=this.createRemoteStore(e),this.eventManager=this.createEventManager(e),this.syncEngine=this.createSyncEngine(e,!t.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>mc(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=am.bind(null,this.syncEngine),await Up(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(t){return function(){return new jp}()}createDatastore(t){const e=vr(t.databaseInfo.databaseId),r=function(o){return new wp(o)}(t.databaseInfo);return function(o,a,u,h){return new Sp(o,a,u,h)}(t.authCredentials,t.appCheckCredentials,r,e)}createRemoteStore(t){return function(r,i,o,a,u){return new Pp(r,i,o,a,u)}(this.localStore,this.datastore,t.asyncQueue,e=>mc(this.syncEngine,e,0),function(){return Ja.D()?new Ja:new Ep}())}createSyncEngine(t,e){return function(i,o,a,u,h,f,m){const I=new Xp(i,o,a,u,h,f);return m&&(I.qa=!0),I}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,t.initialUser,t.maxConcurrentLimboResolutions,e)}async terminate(){var t,e;await async function(i){const o=L(i);D("RemoteStore","RemoteStore shutting down."),o.N_.add(5),await pn(o),o.B_.shutdown(),o.k_.set("Unknown")}(this.remoteStore),(t=this.datastore)===null||t===void 0||t.terminate(),(e=this.eventManager)===null||e===void 0||e.terminate()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hm{constructor(t){this.observer=t,this.muted=!1}next(t){this.observer.next&&this.Wa(this.observer.next,t)}error(t){this.observer.error?this.Wa(this.observer.error,t):Mt("Uncaught Error in snapshot listener:",t.toString())}Ga(){this.muted=!0}Wa(t,e){this.muted||setTimeout(()=>{this.muted||t(e)},0)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dm{constructor(t,e,r,i){this.authCredentials=t,this.appCheckCredentials=e,this.asyncQueue=r,this.databaseInfo=i,this.user=ft.UNAUTHENTICATED,this.clientId=Qo.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this.authCredentials.start(r,async o=>{D("FirestoreClient","Received user=",o.uid),await this.authCredentialListener(o),this.user=o}),this.appCheckCredentials.start(r,o=>(D("FirestoreClient","Received new app check token=",o),this.appCheckCredentialListener(o,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(t){this.authCredentialListener=t}setAppCheckTokenChangeListener(t){this.appCheckCredentialListener=t}verifyNotTerminated(){if(this.asyncQueue.isShuttingDown)throw new O(b.FAILED_PRECONDITION,"The client has already been terminated.")}terminate(){this.asyncQueue.enterRestrictedMode();const t=new ae;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),t.resolve()}catch(e){const r=Wi(e,"Failed to shutdown persistence");t.reject(r)}}),t.promise}}async function Ji(n,t){n.asyncQueue.verifyOperationInProgress(),D("FirestoreClient","Initializing OfflineComponentProvider");const e=n.configuration;await t.initialize(e);let r=e.initialUser;n.setCredentialChangeListener(async i=>{r.isEqual(i)||(await Ga(t.localStore,i),r=i)}),t.persistence.setDatabaseDeletedListener(()=>n.terminate()),n._offlineComponents=t}async function Ic(n,t){n.asyncQueue.verifyOperationInProgress();const e=await pm(n);D("FirestoreClient","Initializing OnlineComponentProvider"),await t.initialize(e,n.configuration),n.setCredentialChangeListener(r=>ac(t.remoteStore,r)),n.setAppCheckTokenChangeListener((r,i)=>ac(t.remoteStore,i)),n._onlineComponents=t}function fm(n){return n.name==="FirebaseError"?n.code===b.FAILED_PRECONDITION||n.code===b.UNIMPLEMENTED:!(typeof DOMException<"u"&&n instanceof DOMException)||n.code===22||n.code===20||n.code===11}async function pm(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){D("FirestoreClient","Using user provided OfflineComponentProvider");try{await Ji(n,n._uninitializedComponentsProvider._offline)}catch(t){const e=t;if(!fm(e))throw e;Ie("Error using user provided cache. Falling back to memory cache: "+e),await Ji(n,new Tc)}}else D("FirestoreClient","Using default OfflineComponentProvider"),await Ji(n,new Tc);return n._offlineComponents}async function wc(n){return n._onlineComponents||(n._uninitializedComponentsProvider?(D("FirestoreClient","Using user provided OnlineComponentProvider"),await Ic(n,n._uninitializedComponentsProvider._online)):(D("FirestoreClient","Using default OnlineComponentProvider"),await Ic(n,new lm))),n._onlineComponents}function mm(n){return wc(n).then(t=>t.syncEngine)}async function Ac(n){const t=await wc(n),e=t.eventManager;return e.onListen=Yp.bind(null,t.syncEngine),e.onUnlisten=tm.bind(null,t.syncEngine),e.onFirstRemoteStoreListen=Jp.bind(null,t.syncEngine),e.onLastRemoteStoreUnlisten=em.bind(null,t.syncEngine),e}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Rc(n){const t={};return n.timeoutSeconds!==void 0&&(t.timeoutSeconds=n.timeoutSeconds),t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Sc=new Map;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function gm(n,t,e){if(!e)throw new O(b.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${t}.`)}function _m(n,t,e,r){if(t===!0&&r===!0)throw new O(b.INVALID_ARGUMENT,`${n} and ${e} cannot be used together.`)}function bc(n){if(!M.isDocumentKey(n))throw new O(b.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function Zi(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{const t=function(r){return r.constructor?r.constructor.name:null}(n);return t?`a custom ${t} object`:"an object"}}return typeof n=="function"?"a function":x()}function Me(n,t){if("_delegate"in n&&(n=n._delegate),!(n instanceof t)){if(t.name===n.constructor.name)throw new O(b.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const e=Zi(n);throw new O(b.INVALID_ARGUMENT,`Expected type '${t.name}', but it was: ${e}`)}}return n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pc{constructor(t){var e,r;if(t.host===void 0){if(t.ssl!==void 0)throw new O(b.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host="firestore.googleapis.com",this.ssl=!0}else this.host=t.host,this.ssl=(e=t.ssl)===null||e===void 0||e;if(this.credentials=t.credentials,this.ignoreUndefinedProperties=!!t.ignoreUndefinedProperties,this.localCache=t.localCache,t.cacheSizeBytes===void 0)this.cacheSizeBytes=41943040;else{if(t.cacheSizeBytes!==-1&&t.cacheSizeBytes<1048576)throw new O(b.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=t.cacheSizeBytes}_m("experimentalForceLongPolling",t.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",t.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!t.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:t.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!t.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=Rc((r=t.experimentalLongPollingOptions)!==null&&r!==void 0?r:{}),function(o){if(o.timeoutSeconds!==void 0){if(isNaN(o.timeoutSeconds))throw new O(b.INVALID_ARGUMENT,`invalid long polling timeout: ${o.timeoutSeconds} (must not be NaN)`);if(o.timeoutSeconds<5)throw new O(b.INVALID_ARGUMENT,`invalid long polling timeout: ${o.timeoutSeconds} (minimum allowed value is 5)`);if(o.timeoutSeconds>30)throw new O(b.INVALID_ARGUMENT,`invalid long polling timeout: ${o.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!t.useFetchStreams}isEqual(t){return this.host===t.host&&this.ssl===t.ssl&&this.credentials===t.credentials&&this.cacheSizeBytes===t.cacheSizeBytes&&this.experimentalForceLongPolling===t.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===t.experimentalAutoDetectLongPolling&&function(r,i){return r.timeoutSeconds===i.timeoutSeconds}(this.experimentalLongPollingOptions,t.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===t.ignoreUndefinedProperties&&this.useFetchStreams===t.useFetchStreams}}class ts{constructor(t,e,r,i){this._authCredentials=t,this._appCheckCredentials=e,this._databaseId=r,this._app=i,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Pc({}),this._settingsFrozen=!1}get app(){if(!this._app)throw new O(b.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!==void 0}_setSettings(t){if(this._settingsFrozen)throw new O(b.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Pc(t),t.credentials!==void 0&&(this._authCredentials=function(r){if(!r)return new Pd;switch(r.type){case"firstParty":return new Dd(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new O(b.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(t.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask||(this._terminateTask=this._terminate()),this._terminateTask}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(e){const r=Sc.get(e);r&&(D("ComponentProvider","Removing Datastore"),Sc.delete(e),r.terminate())}(this),Promise.resolve()}}function ym(n,t,e,r={}){var i;const o=(n=Me(n,ts))._getSettings(),a=`${t}:${e}`;if(o.host!=="firestore.googleapis.com"&&o.host!==a&&Ie("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used."),n._setSettings(Object.assign(Object.assign({},o),{host:a,ssl:!1})),r.mockUserToken){let u,h;if(typeof r.mockUserToken=="string")u=r.mockUserToken,h=ft.MOCK_USER;else{u=ol(r.mockUserToken,(i=n._app)===null||i===void 0?void 0:i.options.projectId);const f=r.mockUserToken.sub||r.mockUserToken.user_id;if(!f)throw new O(b.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");h=new ft(f)}n._authCredentials=new Cd(new Go(u,h))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wr{constructor(t,e,r){this.converter=e,this._query=r,this.type="query",this.firestore=t}withConverter(t){return new wr(this.firestore,t,this._query)}}class Rt{constructor(t,e,r){this.converter=e,this._key=r,this.type="document",this.firestore=t}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new gn(this.firestore,this.converter,this._key.path.popLast())}withConverter(t){return new Rt(this.firestore,t,this._key)}}class gn extends wr{constructor(t,e,r){super(t,e,Si(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const t=this._path.popLast();return t.isEmpty()?null:new Rt(this.firestore,null,new M(t))}withConverter(t){return new gn(this.firestore,t,this._path)}}function es(n,t,...e){if(n=Pt(n),arguments.length===1&&(t=Qo.newId()),gm("doc","path",t),n instanceof ts){const r=J.fromString(t,...e);return bc(r),new Rt(n,null,new M(r))}{if(!(n instanceof Rt||n instanceof gn))throw new O(b.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(J.fromString(t,...e));return bc(r),new Rt(n.firestore,n instanceof gn?n.converter:null,new M(r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vm{constructor(){this._u=Promise.resolve(),this.au=[],this.uu=!1,this.cu=[],this.lu=null,this.hu=!1,this.Pu=!1,this.Iu=[],this.e_=new Za(this,"async_queue_retry"),this.Tu=()=>{const e=ji();e&&D("AsyncQueue","Visibility state changed to "+e.visibilityState),this.e_.zo()};const t=ji();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this.Tu)}get isShuttingDown(){return this.uu}enqueueAndForget(t){this.enqueue(t)}enqueueAndForgetEvenWhileRestricted(t){this.Eu(),this.du(t)}enterRestrictedMode(t){if(!this.uu){this.uu=!0,this.Pu=t||!1;const e=ji();e&&typeof e.removeEventListener=="function"&&e.removeEventListener("visibilitychange",this.Tu)}}enqueue(t){if(this.Eu(),this.uu)return new Promise(()=>{});const e=new ae;return this.du(()=>this.uu&&this.Pu?Promise.resolve():(t().then(e.resolve,e.reject),e.promise)).then(()=>e.promise)}enqueueRetryable(t){this.enqueueAndForget(()=>(this.au.push(t),this.Au()))}async Au(){if(this.au.length!==0){try{await this.au[0](),this.au.shift(),this.e_.reset()}catch(t){if(!Je(t))throw t;D("AsyncQueue","Operation failed with retryable error: "+t)}this.au.length>0&&this.e_.Wo(()=>this.Au())}}du(t){const e=this._u.then(()=>(this.hu=!0,t().catch(r=>{this.lu=r,this.hu=!1;const i=function(a){let u=a.message||"";return a.stack&&(u=a.stack.includes(a.message)?a.stack:a.message+`
`+a.stack),u}(r);throw Mt("INTERNAL UNHANDLED ERROR: ",i),r}).then(r=>(this.hu=!1,r))));return this._u=e,e}enqueueAfterDelay(t,e,r){this.Eu(),this.Iu.indexOf(t)>-1&&(e=0);const i=Ki.createAndSchedule(this,t,e,r,o=>this.Ru(o));return this.cu.push(i),i}Eu(){this.lu&&x()}verifyOperationInProgress(){}async Vu(){let t;do t=this._u,await t;while(t!==this._u)}mu(t){for(const e of this.cu)if(e.timerId===t)return!0;return!1}fu(t){return this.Vu().then(()=>{this.cu.sort((e,r)=>e.targetTimeMs-r.targetTimeMs);for(const e of this.cu)if(e.skipDelay(),t!=="all"&&e.timerId===t)break;return this.Vu()})}gu(t){this.Iu.push(t)}Ru(t){const e=this.cu.indexOf(t);this.cu.splice(e,1)}}function Cc(n){return function(e,r){if(typeof e!="object"||e===null)return!1;const i=e;for(const o of r)if(o in i&&typeof i[o]=="function")return!0;return!1}(n,["next","error","complete"])}class Ar extends ts{constructor(t,e,r,i){super(t,e,r,i),this.type="firestore",this._queue=function(){return new vm}(),this._persistenceKey=(i==null?void 0:i.name)||"[DEFAULT]"}_terminate(){return this._firestoreClient||kc(this),this._firestoreClient.terminate()}}function Em(n,t){const e=typeof n=="object"?n:Zs(),r=typeof n=="string"?n:"(default)",i=si(e,"firestore").getImmediate({identifier:r});if(!i._initialized){const o=il("firestore");o&&ym(i,...o)}return i}function Vc(n){return n._firestoreClient||kc(n),n._firestoreClient.verifyNotTerminated(),n._firestoreClient}function kc(n){var t,e,r;const i=n._freezeSettings(),o=function(u,h,f,m){return new Hd(u,h,f,m.host,m.ssl,m.experimentalForceLongPolling,m.experimentalAutoDetectLongPolling,Rc(m.experimentalLongPollingOptions),m.useFetchStreams)}(n._databaseId,((t=n._app)===null||t===void 0?void 0:t.options.appId)||"",n._persistenceKey,i);n._firestoreClient=new dm(n._authCredentials,n._appCheckCredentials,n._queue,o),!((e=i.localCache)===null||e===void 0)&&e._offlineComponentProvider&&(!((r=i.localCache)===null||r===void 0)&&r._onlineComponentProvider)&&(n._firestoreClient._uninitializedComponentsProvider={_offlineKind:i.localCache.kind,_offline:i.localCache._offlineComponentProvider,_online:i.localCache._onlineComponentProvider})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xe{constructor(t){this._byteString=t}static fromBase64String(t){try{return new xe(lt.fromBase64String(t))}catch(e){throw new O(b.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+e)}}static fromUint8Array(t){return new xe(lt.fromUint8Array(t))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(t){return this._byteString.isEqual(t._byteString)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ns{constructor(...t){for(let e=0;e<t.length;++e)if(t[e].length===0)throw new O(b.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new at(t)}isEqual(t){return this._internalPath.isEqual(t._internalPath)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rs{constructor(t){this._methodName=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class is{constructor(t,e){if(!isFinite(t)||t<-90||t>90)throw new O(b.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+t);if(!isFinite(e)||e<-180||e>180)throw new O(b.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+e);this._lat=t,this._long=e}get latitude(){return this._lat}get longitude(){return this._long}isEqual(t){return this._lat===t._lat&&this._long===t._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(t){return H(this._lat,t._lat)||H(this._long,t._long)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Tm=/^__.*__$/;class Im{constructor(t,e,r){this.data=t,this.fieldMask=e,this.fieldTransforms=r}toMutation(t,e){return this.fieldMask!==null?new he(t,this.data,this.fieldMask,e,this.fieldTransforms):new hn(t,this.data,e,this.fieldTransforms)}}function Dc(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw x()}}class ss{constructor(t,e,r,i,o,a){this.settings=t,this.databaseId=e,this.serializer=r,this.ignoreUndefinedProperties=i,o===void 0&&this.pu(),this.fieldTransforms=o||[],this.fieldMask=a||[]}get path(){return this.settings.path}get yu(){return this.settings.yu}wu(t){return new ss(Object.assign(Object.assign({},this.settings),t),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}Su(t){var e;const r=(e=this.path)===null||e===void 0?void 0:e.child(t),i=this.wu({path:r,bu:!1});return i.Du(t),i}Cu(t){var e;const r=(e=this.path)===null||e===void 0?void 0:e.child(t),i=this.wu({path:r,bu:!1});return i.pu(),i}vu(t){return this.wu({path:void 0,bu:!0})}Fu(t){return Rr(t,this.settings.methodName,this.settings.Mu||!1,this.path,this.settings.xu)}contains(t){return this.fieldMask.find(e=>t.isPrefixOf(e))!==void 0||this.fieldTransforms.find(e=>t.isPrefixOf(e.field))!==void 0}pu(){if(this.path)for(let t=0;t<this.path.length;t++)this.Du(this.path.get(t))}Du(t){if(t.length===0)throw this.Fu("Document fields must not be empty");if(Dc(this.yu)&&Tm.test(t))throw this.Fu('Document fields cannot begin and end with "__"')}}class wm{constructor(t,e,r){this.databaseId=t,this.ignoreUndefinedProperties=e,this.serializer=r||vr(t)}Ou(t,e,r,i=!1){return new ss({yu:t,methodName:e,xu:r,path:at.emptyPath(),bu:!1,Mu:i},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function Am(n){const t=n._freezeSettings(),e=vr(n._databaseId);return new wm(n._databaseId,!!t.ignoreUndefinedProperties,e)}function Rm(n,t,e,r,i,o={}){const a=n.Ou(o.merge||o.mergeFields?2:0,t,e,i);xc("Data must be an object, but it was:",a,r);const u=Oc(r,a);let h,f;if(o.merge)h=new Ct(a.fieldMask),f=a.fieldTransforms;else if(o.mergeFields){const m=[];for(const I of o.mergeFields){const R=Sm(t,I,e);if(!a.contains(R))throw new O(b.INVALID_ARGUMENT,`Field '${R}' is specified in your field mask but missing from your input data.`);Pm(m,R)||m.push(R)}h=new Ct(m),f=a.fieldTransforms.filter(I=>h.covers(I.field))}else h=null,f=a.fieldTransforms;return new Im(new At(u),h,f)}class os extends rs{_toFieldTransform(t){return new _f(t.path,new an)}isEqual(t){return t instanceof os}}function Nc(n,t){if(Mc(n=Pt(n)))return xc("Unsupported field value:",t,n),Oc(n,t);if(n instanceof rs)return function(r,i){if(!Dc(i.yu))throw i.Fu(`${r._methodName}() can only be used with update() and set()`);if(!i.path)throw i.Fu(`${r._methodName}() is not currently supported inside arrays`);const o=r._toFieldTransform(i);o&&i.fieldTransforms.push(o)}(n,t),null;if(n===void 0&&t.ignoreUndefinedProperties)return null;if(t.path&&t.fieldMask.push(t.path),n instanceof Array){if(t.settings.bu&&t.yu!==4)throw t.Fu("Nested arrays are not supported");return function(r,i){const o=[];let a=0;for(const u of r){let h=Nc(u,i.vu(a));h==null&&(h={nullValue:"NULL_VALUE"}),o.push(h),a++}return{arrayValue:{values:o}}}(n,t)}return function(r,i){if((r=Pt(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return pf(i.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){const o=it.fromDate(r);return{timestampValue:_r(i.serializer,o)}}if(r instanceof it){const o=new it(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:_r(i.serializer,o)}}if(r instanceof is)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof xe)return{bytesValue:Ba(i.serializer,r._byteString)};if(r instanceof Rt){const o=i.databaseId,a=r.firestore._databaseId;if(!a.isEqual(o))throw i.Fu(`Document reference is for database ${a.projectId}/${a.database} but should be for database ${o.projectId}/${o.database}`);return{referenceValue:ki(r.firestore._databaseId||i.databaseId,r._key.path)}}throw i.Fu(`Unsupported field value: ${Zi(r)}`)}(n,t)}function Oc(n,t){const e={};return Yo(n)?t.path&&t.path.length>0&&t.fieldMask.push(t.path):Ae(n,(r,i)=>{const o=Nc(i,t.Su(r));o!=null&&(e[r]=o)}),{mapValue:{fields:e}}}function Mc(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof it||n instanceof is||n instanceof xe||n instanceof Rt||n instanceof rs)}function xc(n,t,e){if(!Mc(e)||!function(i){return typeof i=="object"&&i!==null&&(Object.getPrototypeOf(i)===Object.prototype||Object.getPrototypeOf(i)===null)}(e)){const r=Zi(e);throw r==="an object"?t.Fu(n+" a custom object"):t.Fu(n+" "+r)}}function Sm(n,t,e){if((t=Pt(t))instanceof ns)return t._internalPath;if(typeof t=="string")return Lc(n,t);throw Rr("Field path arguments must be of type string or ",n,!1,void 0,e)}const bm=new RegExp("[~\\*/\\[\\]]");function Lc(n,t,e){if(t.search(bm)>=0)throw Rr(`Invalid field path (${t}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,e);try{return new ns(...t.split("."))._internalPath}catch{throw Rr(`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,e)}}function Rr(n,t,e,r,i){const o=r&&!r.isEmpty(),a=i!==void 0;let u=`Function ${t}() called with invalid data`;e&&(u+=" (via `toFirestore()`)"),u+=". ";let h="";return(o||a)&&(h+=" (found",o&&(h+=` in field ${r}`),a&&(h+=` in document ${i}`),h+=")"),new O(b.INVALID_ARGUMENT,u+n+h)}function Pm(n,t){return n.some(e=>e.isEqual(t))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fc{constructor(t,e,r,i,o){this._firestore=t,this._userDataWriter=e,this._key=r,this._document=i,this._converter=o}get id(){return this._key.path.lastSegment()}get ref(){return new Rt(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const t=new Cm(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(t)}return this._userDataWriter.convertValue(this._document.data.value)}}get(t){if(this._document){const e=this._document.data.field(Uc("DocumentSnapshot.get",t));if(e!==null)return this._userDataWriter.convertValue(e)}}}class Cm extends Fc{data(){return super.data()}}function Uc(n,t){return typeof t=="string"?Lc(n,t):t instanceof ns?t._internalPath:t._delegate._internalPath}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Vm(n){if(n.limitType==="L"&&n.explicitOrderBy.length===0)throw new O(b.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class km{convertValue(t,e="none"){switch(ue(t)){case 0:return null;case 1:return t.booleanValue;case 2:return nt(t.integerValue||t.doubleValue);case 3:return this.convertTimestamp(t.timestampValue);case 4:return this.convertServerTimestamp(t,e);case 5:return t.stringValue;case 6:return this.convertBytes(ce(t.bytesValue));case 7:return this.convertReference(t.referenceValue);case 8:return this.convertGeoPoint(t.geoPointValue);case 9:return this.convertArray(t.arrayValue,e);case 10:return this.convertObject(t.mapValue,e);default:throw x()}}convertObject(t,e){return this.convertObjectMap(t.fields,e)}convertObjectMap(t,e="none"){const r={};return Ae(t,(i,o)=>{r[i]=this.convertValue(o,e)}),r}convertGeoPoint(t){return new is(nt(t.latitude),nt(t.longitude))}convertArray(t,e){return(t.values||[]).map(r=>this.convertValue(r,e))}convertServerTimestamp(t,e){switch(e){case"previous":const r=yi(t);return r==null?null:this.convertValue(r,e);case"estimate":return this.convertTimestamp(Ze(t));default:return null}}convertTimestamp(t){const e=Qt(t);return new it(e.seconds,e.nanos)}convertDocumentKey(t,e){const r=J.fromString(t);G(Wa(r));const i=new tn(r.get(1),r.get(3)),o=new M(r.popFirst(5));return i.isEqual(e)||Mt(`Document ${o} contains a document reference within a different database (${i.projectId}/${i.database}) which is not supported. It will be treated as a reference in the current database (${e.projectId}/${e.database}) instead.`),o}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Dm(n,t,e){let r;return r=n?e&&(e.merge||e.mergeFields)?n.toFirestore(t,e):n.toFirestore(t):t,r}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _n{constructor(t,e){this.hasPendingWrites=t,this.fromCache=e}isEqual(t){return this.hasPendingWrites===t.hasPendingWrites&&this.fromCache===t.fromCache}}class Bc extends Fc{constructor(t,e,r,i,o,a){super(t,e,r,i,a),this._firestore=t,this._firestoreImpl=t,this.metadata=o}exists(){return super.exists()}data(t={}){if(this._document){if(this._converter){const e=new Sr(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(e,t)}return this._userDataWriter.convertValue(this._document.data.value,t.serverTimestamps)}}get(t,e={}){if(this._document){const r=this._document.data.field(Uc("DocumentSnapshot.get",t));if(r!==null)return this._userDataWriter.convertValue(r,e.serverTimestamps)}}}class Sr extends Bc{data(t={}){return super.data(t)}}class Nm{constructor(t,e,r,i){this._firestore=t,this._userDataWriter=e,this._snapshot=i,this.metadata=new _n(i.hasPendingWrites,i.fromCache),this.query=r}get docs(){const t=[];return this.forEach(e=>t.push(e)),t}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(t,e){this._snapshot.docs.forEach(r=>{t.call(e,new Sr(this._firestore,this._userDataWriter,r.key,r,new _n(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))})}docChanges(t={}){const e=!!t.includeMetadataChanges;if(e&&this._snapshot.excludesMetadataChanges)throw new O(b.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===e||(this._cachedChanges=function(i,o){if(i._snapshot.oldDocs.isEmpty()){let a=0;return i._snapshot.docChanges.map(u=>{const h=new Sr(i._firestore,i._userDataWriter,u.doc.key,u.doc,new _n(i._snapshot.mutatedKeys.has(u.doc.key),i._snapshot.fromCache),i.query.converter);return u.doc,{type:"added",doc:h,oldIndex:-1,newIndex:a++}})}{let a=i._snapshot.oldDocs;return i._snapshot.docChanges.filter(u=>o||u.type!==3).map(u=>{const h=new Sr(i._firestore,i._userDataWriter,u.doc.key,u.doc,new _n(i._snapshot.mutatedKeys.has(u.doc.key),i._snapshot.fromCache),i.query.converter);let f=-1,m=-1;return u.type!==0&&(f=a.indexOf(u.doc.key),a=a.delete(u.doc.key)),u.type!==1&&(a=a.add(u.doc),m=a.indexOf(u.doc.key)),{type:Om(u.type),doc:h,oldIndex:f,newIndex:m}})}}(this,e),this._cachedChangesIncludeMetadataChanges=e),this._cachedChanges}}function Om(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return x()}}class jc extends km{constructor(t){super(),this.firestore=t}convertBytes(t){return new xe(t)}convertReference(t){const e=this.convertDocumentKey(t,this.firestore._databaseId);return new Rt(this.firestore,null,e)}}function Mm(n,t,e){n=Me(n,Rt);const r=Me(n.firestore,Ar),i=Dm(n.converter,t,e);return xm(r,[Rm(Am(r),"setDoc",n._key,i,n.converter!==null,e).toMutation(n._key,Lt.none())])}function qc(n,...t){var e,r,i;n=Pt(n);let o={includeMetadataChanges:!1,source:"default"},a=0;typeof t[a]!="object"||Cc(t[a])||(o=t[a],a++);const u={includeMetadataChanges:o.includeMetadataChanges,source:o.source};if(Cc(t[a])){const I=t[a];t[a]=(e=I.next)===null||e===void 0?void 0:e.bind(I),t[a+1]=(r=I.error)===null||r===void 0?void 0:r.bind(I),t[a+2]=(i=I.complete)===null||i===void 0?void 0:i.bind(I)}let h,f,m;if(n instanceof Rt)f=Me(n.firestore,Ar),m=Si(n._key.path),h={next:I=>{t[a]&&t[a](Lm(f,n,I))},error:t[a+1],complete:t[a+2]};else{const I=Me(n,wr);f=Me(I.firestore,Ar),m=I._query;const R=new jc(f);h={next:P=>{t[a]&&t[a](new Nm(f,R,I,P))},error:t[a+1],complete:t[a+2]},Vm(n._query)}return function(R,P,k,N){const V=new hm(N),q=new Kp(P,V,k);return R.asyncQueue.enqueueAndForget(async()=>qp(await Ac(R),q)),()=>{V.Ga(),R.asyncQueue.enqueueAndForget(async()=>$p(await Ac(R),q))}}(Vc(f),m,u,h)}function xm(n,t){return function(r,i){const o=new ae;return r.asyncQueue.enqueueAndForget(async()=>nm(await mm(r),i,o)),o.promise}(Vc(n),t)}function Lm(n,t,e){const r=e.docs.get(t._key),i=new jc(n);return new Bc(n,i,t._key,r,new _n(e.hasPendingWrites,e.fromCache),t.converter)}function Fm(){return new os("serverTimestamp")}(function(t,e=!0){(function(i){Te=i})(qn),ye(new ne("firestore",(r,{instanceIdentifier:i,options:o})=>{const a=r.getProvider("app").getImmediate(),u=new Ar(new Vd(r.getProvider("auth-internal")),new Od(r.getProvider("app-check-internal")),function(f,m){if(!Object.prototype.hasOwnProperty.apply(f.options,["projectId"]))throw new O(b.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new tn(f.options.projectId,m)}(a,i),a);return o=Object.assign({useFetchStreams:e},o),u._setSettings(o),u},"PUBLIC").setMultipleInstances(!0)),zt(Wo,"4.6.5",t),zt(Wo,"4.6.5","esm2017")})();const $c=Js({apiKey:"AIzaSyC01JhUnm-yg2G8nEc9tiKKUZqL4R99oas",authDomain:"fake-filler.firebaseapp.com",projectId:"fake-filler"}),zc=Sd($c),as=Em($c);bd("silent");let yn=null,br=null,cs=null,us=null,Le=null,ls=null;function Hc(){us&&us(),ls&&ls()}function Um(n){const t=n.data();!n.metadata.hasPendingWrites&&t&&t.updatedAt&&t.options&&(t.updatedAt,JSON.parse(t.options))}async function Bm(n){const t=n.data();yn&&t&&t.claimsUpdatedAt&&(cs&&!t.claimsUpdatedAt.isEqual(cs)&&await yn.getIdToken(!0),cs=t.claimsUpdatedAt)}ld(zc,n=>{yn=n,n?(Hc(),us=qc(es(as,"users",n.uid),Bm),ls=qc(es(as,"settings",n.uid),Um)):(Hc(),Le&&Le(null,null))}),ud(zc,async n=>{Le&&(n?(br=(await n.getIdTokenResult(!1)).claims,Le(n,br)):Le(null,null))});function jm(n){Le=n}async function qm(n){if(yn&&br&&br.subscribed){const t=Fm();return await Mm(es(as,"settings",yn.uid),{options:JSON.stringify(n),updatedAt:t},{merge:!0}),t}return null}for(var ht=[],hs=0;hs<256;++hs)ht.push((hs+256).toString(16).slice(1));function $m(n,t=0){return(ht[n[t+0]]+ht[n[t+1]]+ht[n[t+2]]+ht[n[t+3]]+"-"+ht[n[t+4]]+ht[n[t+5]]+"-"+ht[n[t+6]]+ht[n[t+7]]+"-"+ht[n[t+8]]+ht[n[t+9]]+"-"+ht[n[t+10]]+ht[n[t+11]]+ht[n[t+12]]+ht[n[t+13]]+ht[n[t+14]]+ht[n[t+15]]).toLowerCase()}var Pr,zm=new Uint8Array(16);function Hm(){if(!Pr&&(Pr=typeof crypto<"u"&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto),!Pr))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return Pr(zm)}var Km=typeof crypto<"u"&&crypto.randomUUID&&crypto.randomUUID.bind(crypto);const Kc={randomUUID:Km};function gt(n,t,e){if(Kc.randomUUID&&!t&&!n)return Kc.randomUUID();n=n||{};var r=n.random||(n.rng||Hm)();return r[6]=r[6]&15|64,r[8]=r[8]&63|128,$m(r)}const Wm=1,Gm={id:gt(),type:"email",name:"Email Address",match:["email"],emailPrefix:"",emailUsername:"random",emailUsernameList:["jack","jill"],emailUsernameRegEx:"",emailHostname:"list",emailHostnameList:["mailinator.com"]},Qm=()=>{const n={version:Wm,agreeTermsFields:["agree","terms","conditions"],confirmFields:["confirm","reenter","retype","repeat","secondary"],defaultMaxLength:20,enableContextMenu:!0,fieldMatchSettings:{matchLabel:!0,matchAriaLabel:!0,matchAriaLabelledBy:!0,matchId:!0,matchName:!0,matchClass:!1,matchPlaceholder:!1},fields:[],ignoredFields:["captcha","hipinputtext"],ignoreFieldsWithContent:!1,ignoreHiddenFields:!0,passwordSettings:{mode:"defined",password:"Pa$$w0rd!"},ignoreDomains:[],profiles:[],triggerClickEvents:!0};return n.fields.push({id:gt(),type:"username",name:"Username",match:["userid","username"]}),n.fields.push({id:gt(),type:"first-name",name:"First Name",match:["firstname"]}),n.fields.push({id:gt(),type:"last-name",name:"Last Name",match:["lastname","surname","secondname"]}),n.fields.push(Gm),n.fields.push({id:gt(),type:"organization",name:"Organization or Company Name",match:["organization","organisation","company"]}),n.fields.push({id:gt(),type:"full-name",name:"Full Name",match:["fullname","name"]}),n.fields.push({id:gt(),type:"telephone",name:"Telephone Number",match:["phone","fax"],template:"+1 (XxX) XxX-XxxX"}),n.fields.push({id:gt(),type:"number",name:"A Random Number between 1 and 1000",match:["integer","number","numeric","income","price","qty","quantity"],min:1,max:1e3,decimalPlaces:0}),n.fields.push({id:gt(),type:"number",name:"Zip Code",match:["zip"],min:1e4,max:99999,decimalPlaces:0}),n.fields.push({id:gt(),type:"number",name:"Day",match:["day"],min:1,max:28,decimalPlaces:0}),n.fields.push({id:gt(),type:"number",name:"Month",match:["month"],min:1,max:12,decimalPlaces:0}),n.fields.push({id:gt(),type:"number",name:"Year",match:["year"],min:1970,max:2019,decimalPlaces:0}),n.fields.push({id:gt(),type:"date",name:"Date",match:["date"],minDate:"1970-01-01",max:0,template:"DD-MMM-YYYY"}),n.fields.push({id:gt(),type:"url",name:"Website Address",match:["website"]}),n.fields.push({id:gt(),type:"regex",name:"Address Line 1",match:["address1","addressline1"],template:"([1-9][0-9][0-9]?) (North |East |West |South |||||)(Green |White |Rocky ||||||||)(Nobel|Fabien|Hague|Oak|Second|First|Cowley|Clarendon|New|Old|Milton) (Avenue|Boulevard|Court|Drive|Extension|Freeway|Lane|Parkway|Road|Street)"}),n.fields.push({id:gt(),type:"regex",name:"P.O. Box",match:["pobox","postbox"],template:"((P\\.O\\.)|(PO)) Box [1-9][0-9]{0,4}"}),n},vn=()=>new Promise(t=>{chrome.storage.local.get("options",e=>{let r;e&&Object.keys(e).length>0?r=e.options:r=Qm(),t(r)})}),Wc=n=>{chrome.contextMenus.removeAll(),n&&(chrome.contextMenus.create({id:"fake-filler-all",title:"Fill all inputs",contexts:["page","editable"]}),chrome.contextMenus.create({id:"fake-filler-form",title:"Fill this form",contexts:["editable"]}),chrome.contextMenus.create({id:"fake-filler-input",title:"Fill this input",contexts:["editable"]}))},Xm=n=>{qm(n).then(t=>{chrome.storage.local.set({updatedAt:t})}),chrome.storage.local.set({options:n}),chrome.runtime.sendMessage({type:"optionsUpdated",data:n},()=>chrome.runtime.lastError),Wc(n.enableContextMenu)},En=(n,t)=>chrome.i18n.getMessage(n,t);let ds=!1;function Ym(n,t){ds=t?t.subscribed:!1,vn().then(e=>{Gc(e)})}jm(Ym);async function fe(){const n={active:!0,lastFocusedWindow:!0},[t]=await chrome.tabs.query(n);return(t==null?void 0:t.id)??-1}function Gc(n){chrome.tabs.query({},t=>{t.forEach(e=>{e&&e.id&&e.id!==chrome.tabs.TAB_ID_NONE&&chrome.tabs.sendMessage(e.id,{type:"receiveNewOptions",data:{options:n,isProEdition:ds}},()=>chrome.runtime.lastError)})})}function Jm(n,t,e){var r,i,o,a,u,h,f,m;switch(n.type){case"getOptions":return vn().then(I=>{e({options:I,isProEdition:ds})}),!0;case"setIgnoreDomainBadge":return chrome.action.setBadgeText({text:"x",tabId:(r=t.tab)==null?void 0:r.id}),chrome.action.setBadgeBackgroundColor({color:"#7b2b2b",tabId:(i=t.tab)==null?void 0:i.id}),chrome.action.setTitle({title:`${En("actionTitle")}
${En("domainIsIgnored")}`,tabId:(o=t.tab)==null?void 0:o.id}),!0;case"clearIgnoreDomainBadge":return chrome.action.setBadgeText({text:"",tabId:(a=t.tab)==null?void 0:a.id}),!0;case"setProfileBadge":{const I=n.data;return chrome.action.setBadgeText({text:"★",tabId:(u=t.tab)==null?void 0:u.id}),chrome.action.setBadgeBackgroundColor({color:"#757575",tabId:(h=t.tab)==null?void 0:h.id}),chrome.action.setTitle({title:`${En("actionTitle")}
${En("matchedProfile")}: ${I.name}`,tabId:(f=t.tab)==null?void 0:f.id}),!0}case"clearProfileBadge":return chrome.action.setBadgeText({text:"",tabId:(m=t.tab)==null?void 0:m.id}),!0;case"optionsUpdated":return vn().then(I=>{Gc(I)}),!0;default:return null}}chrome.runtime.onInstalled&&chrome.runtime.onInstalled.addListener(n=>{if(n.reason==="update")try{n.previousVersion&&vn().then(t=>{t.ignoreDomains||(t.ignoreDomains=[],Xm(t))})}catch(t){window.alert(En("bgPage_errorMigratingOptions",[t.message]))}}),chrome.runtime.onMessage.addListener(Jm);function fs(){window.fakeFiller&&window.fakeFiller.fillAllInputs()}function Qc(){window.fakeFiller.fillThisForm()}function Xc(){window.fakeFiller.fillThisInput()}vn().then(n=>{Wc(n.enableContextMenu)}),chrome.action.onClicked.addListener(async()=>{await chrome.scripting.executeScript({func:fs,target:{allFrames:!0,tabId:await fe()}})}),chrome.contextMenus.onClicked.addListener(async n=>{n.menuItemId==="fake-filler-all"&&await chrome.scripting.executeScript({func:fs,target:{allFrames:!0,tabId:await fe()}}),n.menuItemId==="fake-filler-form"&&await chrome.scripting.executeScript({func:Qc,target:{allFrames:!0,tabId:await fe()}}),n.menuItemId==="fake-filler-input"&&await chrome.scripting.executeScript({func:Xc,target:{allFrames:!0,tabId:await fe()}})}),chrome.commands.onCommand.addListener(async n=>{n==="fill_all_inputs"&&await chrome.scripting.executeScript({func:fs,target:{allFrames:!0,tabId:await fe()}}),n==="fill_this_form"&&await chrome.scripting.executeScript({func:Qc,target:{allFrames:!0,tabId:await fe()}}),n==="fill_this_input"&&await chrome.scripting.executeScript({func:Xc,target:{allFrames:!0,tabId:await fe()}})})})();
