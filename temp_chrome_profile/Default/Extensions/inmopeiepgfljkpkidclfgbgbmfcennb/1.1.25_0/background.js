"use strict";(()=>{var Qr=Object.create;var Pt=Object.defineProperty;var ea=Object.getOwnPropertyDescriptor;var ta=Object.getOwnPropertyNames;var ra=Object.getPrototypeOf,aa=Object.prototype.hasOwnProperty;var be=(t,e)=>()=>(e||t((e={exports:{}}).exports,e),e.exports);var na=(t,e,r,a)=>{if(e&&typeof e=="object"||typeof e=="function")for(let n of ta(e))!aa.call(t,n)&&n!==r&&Pt(t,n,{get:()=>e[n],enumerable:!(a=ea(e,n))||a.enumerable});return t};var Ot=(t,e,r)=>(r=t!=null?Qr(ra(t)):{},na(e||!t||!t.__esModule?Pt(r,"default",{value:t,enumerable:!0}):r,t));var Vt=be(Ie=>{"use strict";Ie.byteLength=sa;Ie.toByteArray=ua;Ie.fromByteArray=pa;var D=[],R=[],ia=typeof Uint8Array<"u"?Uint8Array:Array,He="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";for(X=0,Bt=He.length;X<Bt;++X)D[X]=He[X],R[He.charCodeAt(X)]=X;var X,Bt;R[45]=62;R[95]=63;function qt(t){var e=t.length;if(e%4>0)throw new Error("Invalid string. Length must be a multiple of 4");var r=t.indexOf("=");r===-1&&(r=e);var a=r===e?0:4-r%4;return[r,a]}function sa(t){var e=qt(t),r=e[0],a=e[1];return(r+a)*3/4-a}function la(t,e,r){return(e+r)*3/4-r}function ua(t){var e,r=qt(t),a=r[0],n=r[1],o=new ia(la(t,a,n)),i=0,s=n>0?a-4:a,c;for(c=0;c<s;c+=4)e=R[t.charCodeAt(c)]<<18|R[t.charCodeAt(c+1)]<<12|R[t.charCodeAt(c+2)]<<6|R[t.charCodeAt(c+3)],o[i++]=e>>16&255,o[i++]=e>>8&255,o[i++]=e&255;return n===2&&(e=R[t.charCodeAt(c)]<<2|R[t.charCodeAt(c+1)]>>4,o[i++]=e&255),n===1&&(e=R[t.charCodeAt(c)]<<10|R[t.charCodeAt(c+1)]<<4|R[t.charCodeAt(c+2)]>>2,o[i++]=e>>8&255,o[i++]=e&255),o}function ca(t){return D[t>>18&63]+D[t>>12&63]+D[t>>6&63]+D[t&63]}function da(t,e,r){for(var a,n=[],o=e;o<r;o+=3)a=(t[o]<<16&16711680)+(t[o+1]<<8&65280)+(t[o+2]&255),n.push(ca(a));return n.join("")}function pa(t){for(var e,r=t.length,a=r%3,n=[],o=16383,i=0,s=r-a;i<s;i+=o)n.push(da(t,i,i+o>s?s:i+o));return a===1?(e=t[r-1],n.push(D[e>>2]+D[e<<4&63]+"==")):a===2&&(e=(t[r-2]<<8)+t[r-1],n.push(D[e>>10]+D[e>>4&63]+D[e<<2&63]+"=")),n.join("")}});var Wt=be(Ke=>{Ke.read=function(t,e,r,a,n){var o,i,s=n*8-a-1,c=(1<<s)-1,l=c>>1,u=-7,p=r?n-1:0,h=r?-1:1,f=t[e+p];for(p+=h,o=f&(1<<-u)-1,f>>=-u,u+=s;u>0;o=o*256+t[e+p],p+=h,u-=8);for(i=o&(1<<-u)-1,o>>=-u,u+=a;u>0;i=i*256+t[e+p],p+=h,u-=8);if(o===0)o=1-l;else{if(o===c)return i?NaN:(f?-1:1)*(1/0);i=i+Math.pow(2,a),o=o-l}return(f?-1:1)*i*Math.pow(2,o-a)};Ke.write=function(t,e,r,a,n,o){var i,s,c,l=o*8-n-1,u=(1<<l)-1,p=u>>1,h=n===23?Math.pow(2,-24)-Math.pow(2,-77):0,f=a?0:o-1,m=a?1:-1,g=e<0||e===0&&1/e<0?1:0;for(e=Math.abs(e),isNaN(e)||e===1/0?(s=isNaN(e)?1:0,i=u):(i=Math.floor(Math.log(e)/Math.LN2),e*(c=Math.pow(2,-i))<1&&(i--,c*=2),i+p>=1?e+=h/c:e+=h*Math.pow(2,1-p),e*c>=2&&(i++,c/=2),i+p>=u?(s=0,i=u):i+p>=1?(s=(e*c-1)*Math.pow(2,n),i=i+p):(s=e*Math.pow(2,p-1)*Math.pow(2,n),i=0));n>=8;t[r+f]=s&255,f+=m,s/=256,n-=8);for(i=i<<n|s,l+=n;l>0;t[r+f]=i&255,f+=m,i/=256,l-=8);t[r+f-m]|=g*128}});var ir=be(ne=>{"use strict";var Ye=Vt(),re=Wt(),Gt=typeof Symbol=="function"&&typeof Symbol.for=="function"?Symbol.for("nodejs.util.inspect.custom"):null;ne.Buffer=d;ne.SlowBuffer=_a;ne.INSPECT_MAX_BYTES=50;var Te=2147483647;ne.kMaxLength=Te;d.TYPED_ARRAY_SUPPORT=ha();!d.TYPED_ARRAY_SUPPORT&&typeof console<"u"&&typeof console.error=="function"&&console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support.");function ha(){try{let t=new Uint8Array(1),e={foo:function(){return 42}};return Object.setPrototypeOf(e,Uint8Array.prototype),Object.setPrototypeOf(t,e),t.foo()===42}catch{return!1}}Object.defineProperty(d.prototype,"parent",{enumerable:!0,get:function(){if(d.isBuffer(this))return this.buffer}});Object.defineProperty(d.prototype,"offset",{enumerable:!0,get:function(){if(d.isBuffer(this))return this.byteOffset}});function V(t){if(t>Te)throw new RangeError('The value "'+t+'" is invalid for option "size"');let e=new Uint8Array(t);return Object.setPrototypeOf(e,d.prototype),e}function d(t,e,r){if(typeof t=="number"){if(typeof e=="string")throw new TypeError('The "string" argument must be of type string. Received type number');return Ze(t)}return Yt(t,e,r)}d.poolSize=8192;function Yt(t,e,r){if(typeof t=="string")return ma(t,e);if(ArrayBuffer.isView(t))return ga(t);if(t==null)throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type "+typeof t);if(F(t,ArrayBuffer)||t&&F(t.buffer,ArrayBuffer)||typeof SharedArrayBuffer<"u"&&(F(t,SharedArrayBuffer)||t&&F(t.buffer,SharedArrayBuffer)))return Xe(t,e,r);if(typeof t=="number")throw new TypeError('The "value" argument must not be of type number. Received type number');let a=t.valueOf&&t.valueOf();if(a!=null&&a!==t)return d.from(a,e,r);let n=ya(t);if(n)return n;if(typeof Symbol<"u"&&Symbol.toPrimitive!=null&&typeof t[Symbol.toPrimitive]=="function")return d.from(t[Symbol.toPrimitive]("string"),e,r);throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type "+typeof t)}d.from=function(t,e,r){return Yt(t,e,r)};Object.setPrototypeOf(d.prototype,Uint8Array.prototype);Object.setPrototypeOf(d,Uint8Array);function Jt(t){if(typeof t!="number")throw new TypeError('"size" argument must be of type number');if(t<0)throw new RangeError('The value "'+t+'" is invalid for option "size"')}function fa(t,e,r){return Jt(t),t<=0?V(t):e!==void 0?typeof r=="string"?V(t).fill(e,r):V(t).fill(e):V(t)}d.alloc=function(t,e,r){return fa(t,e,r)};function Ze(t){return Jt(t),V(t<0?0:Qe(t)|0)}d.allocUnsafe=function(t){return Ze(t)};d.allocUnsafeSlow=function(t){return Ze(t)};function ma(t,e){if((typeof e!="string"||e==="")&&(e="utf8"),!d.isEncoding(e))throw new TypeError("Unknown encoding: "+e);let r=Xt(t,e)|0,a=V(r),n=a.write(t,e);return n!==r&&(a=a.slice(0,n)),a}function Je(t){let e=t.length<0?0:Qe(t.length)|0,r=V(e);for(let a=0;a<e;a+=1)r[a]=t[a]&255;return r}function ga(t){if(F(t,Uint8Array)){let e=new Uint8Array(t);return Xe(e.buffer,e.byteOffset,e.byteLength)}return Je(t)}function Xe(t,e,r){if(e<0||t.byteLength<e)throw new RangeError('"offset" is outside of buffer bounds');if(t.byteLength<e+(r||0))throw new RangeError('"length" is outside of buffer bounds');let a;return e===void 0&&r===void 0?a=new Uint8Array(t):r===void 0?a=new Uint8Array(t,e):a=new Uint8Array(t,e,r),Object.setPrototypeOf(a,d.prototype),a}function ya(t){if(d.isBuffer(t)){let e=Qe(t.length)|0,r=V(e);return r.length===0||t.copy(r,0,0,e),r}if(t.length!==void 0)return typeof t.length!="number"||tt(t.length)?V(0):Je(t);if(t.type==="Buffer"&&Array.isArray(t.data))return Je(t.data)}function Qe(t){if(t>=Te)throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x"+Te.toString(16)+" bytes");return t|0}function _a(t){return+t!=t&&(t=0),d.alloc(+t)}d.isBuffer=function(e){return e!=null&&e._isBuffer===!0&&e!==d.prototype};d.compare=function(e,r){if(F(e,Uint8Array)&&(e=d.from(e,e.offset,e.byteLength)),F(r,Uint8Array)&&(r=d.from(r,r.offset,r.byteLength)),!d.isBuffer(e)||!d.isBuffer(r))throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');if(e===r)return 0;let a=e.length,n=r.length;for(let o=0,i=Math.min(a,n);o<i;++o)if(e[o]!==r[o]){a=e[o],n=r[o];break}return a<n?-1:n<a?1:0};d.isEncoding=function(e){switch(String(e).toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"latin1":case"binary":case"base64":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return!0;default:return!1}};d.concat=function(e,r){if(!Array.isArray(e))throw new TypeError('"list" argument must be an Array of Buffers');if(e.length===0)return d.alloc(0);let a;if(r===void 0)for(r=0,a=0;a<e.length;++a)r+=e[a].length;let n=d.allocUnsafe(r),o=0;for(a=0;a<e.length;++a){let i=e[a];if(F(i,Uint8Array))o+i.length>n.length?(d.isBuffer(i)||(i=d.from(i)),i.copy(n,o)):Uint8Array.prototype.set.call(n,i,o);else if(d.isBuffer(i))i.copy(n,o);else throw new TypeError('"list" argument must be an Array of Buffers');o+=i.length}return n};function Xt(t,e){if(d.isBuffer(t))return t.length;if(ArrayBuffer.isView(t)||F(t,ArrayBuffer))return t.byteLength;if(typeof t!="string")throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type '+typeof t);let r=t.length,a=arguments.length>2&&arguments[2]===!0;if(!a&&r===0)return 0;let n=!1;for(;;)switch(e){case"ascii":case"latin1":case"binary":return r;case"utf8":case"utf-8":return $e(t).length;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return r*2;case"hex":return r>>>1;case"base64":return or(t).length;default:if(n)return a?-1:$e(t).length;e=(""+e).toLowerCase(),n=!0}}d.byteLength=Xt;function ba(t,e,r){let a=!1;if((e===void 0||e<0)&&(e=0),e>this.length||((r===void 0||r>this.length)&&(r=this.length),r<=0)||(r>>>=0,e>>>=0,r<=e))return"";for(t||(t="utf8");;)switch(t){case"hex":return Ra(this,e,r);case"utf8":case"utf-8":return Zt(this,e,r);case"ascii":return Ta(this,e,r);case"latin1":case"binary":return ja(this,e,r);case"base64":return wa(this,e,r);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return ka(this,e,r);default:if(a)throw new TypeError("Unknown encoding: "+t);t=(t+"").toLowerCase(),a=!0}}d.prototype._isBuffer=!0;function $(t,e,r){let a=t[e];t[e]=t[r],t[r]=a}d.prototype.swap16=function(){let e=this.length;if(e%2!==0)throw new RangeError("Buffer size must be a multiple of 16-bits");for(let r=0;r<e;r+=2)$(this,r,r+1);return this};d.prototype.swap32=function(){let e=this.length;if(e%4!==0)throw new RangeError("Buffer size must be a multiple of 32-bits");for(let r=0;r<e;r+=4)$(this,r,r+3),$(this,r+1,r+2);return this};d.prototype.swap64=function(){let e=this.length;if(e%8!==0)throw new RangeError("Buffer size must be a multiple of 64-bits");for(let r=0;r<e;r+=8)$(this,r,r+7),$(this,r+1,r+6),$(this,r+2,r+5),$(this,r+3,r+4);return this};d.prototype.toString=function(){let e=this.length;return e===0?"":arguments.length===0?Zt(this,0,e):ba.apply(this,arguments)};d.prototype.toLocaleString=d.prototype.toString;d.prototype.equals=function(e){if(!d.isBuffer(e))throw new TypeError("Argument must be a Buffer");return this===e?!0:d.compare(this,e)===0};d.prototype.inspect=function(){let e="",r=ne.INSPECT_MAX_BYTES;return e=this.toString("hex",0,r).replace(/(.{2})/g,"$1 ").trim(),this.length>r&&(e+=" ... "),"<Buffer "+e+">"};Gt&&(d.prototype[Gt]=d.prototype.inspect);d.prototype.compare=function(e,r,a,n,o){if(F(e,Uint8Array)&&(e=d.from(e,e.offset,e.byteLength)),!d.isBuffer(e))throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type '+typeof e);if(r===void 0&&(r=0),a===void 0&&(a=e?e.length:0),n===void 0&&(n=0),o===void 0&&(o=this.length),r<0||a>e.length||n<0||o>this.length)throw new RangeError("out of range index");if(n>=o&&r>=a)return 0;if(n>=o)return-1;if(r>=a)return 1;if(r>>>=0,a>>>=0,n>>>=0,o>>>=0,this===e)return 0;let i=o-n,s=a-r,c=Math.min(i,s),l=this.slice(n,o),u=e.slice(r,a);for(let p=0;p<c;++p)if(l[p]!==u[p]){i=l[p],s=u[p];break}return i<s?-1:s<i?1:0};function $t(t,e,r,a,n){if(t.length===0)return-1;if(typeof r=="string"?(a=r,r=0):r>2147483647?r=2147483647:r<-2147483648&&(r=-2147483648),r=+r,tt(r)&&(r=n?0:t.length-1),r<0&&(r=t.length+r),r>=t.length){if(n)return-1;r=t.length-1}else if(r<0)if(n)r=0;else return-1;if(typeof e=="string"&&(e=d.from(e,a)),d.isBuffer(e))return e.length===0?-1:zt(t,e,r,a,n);if(typeof e=="number")return e=e&255,typeof Uint8Array.prototype.indexOf=="function"?n?Uint8Array.prototype.indexOf.call(t,e,r):Uint8Array.prototype.lastIndexOf.call(t,e,r):zt(t,[e],r,a,n);throw new TypeError("val must be string, number or Buffer")}function zt(t,e,r,a,n){let o=1,i=t.length,s=e.length;if(a!==void 0&&(a=String(a).toLowerCase(),a==="ucs2"||a==="ucs-2"||a==="utf16le"||a==="utf-16le")){if(t.length<2||e.length<2)return-1;o=2,i/=2,s/=2,r/=2}function c(u,p){return o===1?u[p]:u.readUInt16BE(p*o)}let l;if(n){let u=-1;for(l=r;l<i;l++)if(c(t,l)===c(e,u===-1?0:l-u)){if(u===-1&&(u=l),l-u+1===s)return u*o}else u!==-1&&(l-=l-u),u=-1}else for(r+s>i&&(r=i-s),l=r;l>=0;l--){let u=!0;for(let p=0;p<s;p++)if(c(t,l+p)!==c(e,p)){u=!1;break}if(u)return l}return-1}d.prototype.includes=function(e,r,a){return this.indexOf(e,r,a)!==-1};d.prototype.indexOf=function(e,r,a){return $t(this,e,r,a,!0)};d.prototype.lastIndexOf=function(e,r,a){return $t(this,e,r,a,!1)};function va(t,e,r,a){r=Number(r)||0;let n=t.length-r;a?(a=Number(a),a>n&&(a=n)):a=n;let o=e.length;a>o/2&&(a=o/2);let i;for(i=0;i<a;++i){let s=parseInt(e.substr(i*2,2),16);if(tt(s))return i;t[r+i]=s}return i}function xa(t,e,r,a){return je($e(e,t.length-r),t,r,a)}function Aa(t,e,r,a){return je(La(e),t,r,a)}function Sa(t,e,r,a){return je(or(e),t,r,a)}function Ea(t,e,r,a){return je(Ma(e,t.length-r),t,r,a)}d.prototype.write=function(e,r,a,n){if(r===void 0)n="utf8",a=this.length,r=0;else if(a===void 0&&typeof r=="string")n=r,a=this.length,r=0;else if(isFinite(r))r=r>>>0,isFinite(a)?(a=a>>>0,n===void 0&&(n="utf8")):(n=a,a=void 0);else throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");let o=this.length-r;if((a===void 0||a>o)&&(a=o),e.length>0&&(a<0||r<0)||r>this.length)throw new RangeError("Attempt to write outside buffer bounds");n||(n="utf8");let i=!1;for(;;)switch(n){case"hex":return va(this,e,r,a);case"utf8":case"utf-8":return xa(this,e,r,a);case"ascii":case"latin1":case"binary":return Aa(this,e,r,a);case"base64":return Sa(this,e,r,a);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return Ea(this,e,r,a);default:if(i)throw new TypeError("Unknown encoding: "+n);n=(""+n).toLowerCase(),i=!0}};d.prototype.toJSON=function(){return{type:"Buffer",data:Array.prototype.slice.call(this._arr||this,0)}};function wa(t,e,r){return e===0&&r===t.length?Ye.fromByteArray(t):Ye.fromByteArray(t.slice(e,r))}function Zt(t,e,r){r=Math.min(t.length,r);let a=[],n=e;for(;n<r;){let o=t[n],i=null,s=o>239?4:o>223?3:o>191?2:1;if(n+s<=r){let c,l,u,p;switch(s){case 1:o<128&&(i=o);break;case 2:c=t[n+1],(c&192)===128&&(p=(o&31)<<6|c&63,p>127&&(i=p));break;case 3:c=t[n+1],l=t[n+2],(c&192)===128&&(l&192)===128&&(p=(o&15)<<12|(c&63)<<6|l&63,p>2047&&(p<55296||p>57343)&&(i=p));break;case 4:c=t[n+1],l=t[n+2],u=t[n+3],(c&192)===128&&(l&192)===128&&(u&192)===128&&(p=(o&15)<<18|(c&63)<<12|(l&63)<<6|u&63,p>65535&&p<1114112&&(i=p))}}i===null?(i=65533,s=1):i>65535&&(i-=65536,a.push(i>>>10&1023|55296),i=56320|i&1023),a.push(i),n+=s}return Ia(a)}var Ht=4096;function Ia(t){let e=t.length;if(e<=Ht)return String.fromCharCode.apply(String,t);let r="",a=0;for(;a<e;)r+=String.fromCharCode.apply(String,t.slice(a,a+=Ht));return r}function Ta(t,e,r){let a="";r=Math.min(t.length,r);for(let n=e;n<r;++n)a+=String.fromCharCode(t[n]&127);return a}function ja(t,e,r){let a="";r=Math.min(t.length,r);for(let n=e;n<r;++n)a+=String.fromCharCode(t[n]);return a}function Ra(t,e,r){let a=t.length;(!e||e<0)&&(e=0),(!r||r<0||r>a)&&(r=a);let n="";for(let o=e;o<r;++o)n+=Na[t[o]];return n}function ka(t,e,r){let a=t.slice(e,r),n="";for(let o=0;o<a.length-1;o+=2)n+=String.fromCharCode(a[o]+a[o+1]*256);return n}d.prototype.slice=function(e,r){let a=this.length;e=~~e,r=r===void 0?a:~~r,e<0?(e+=a,e<0&&(e=0)):e>a&&(e=a),r<0?(r+=a,r<0&&(r=0)):r>a&&(r=a),r<e&&(r=e);let n=this.subarray(e,r);return Object.setPrototypeOf(n,d.prototype),n};function E(t,e,r){if(t%1!==0||t<0)throw new RangeError("offset is not uint");if(t+e>r)throw new RangeError("Trying to access beyond buffer length")}d.prototype.readUintLE=d.prototype.readUIntLE=function(e,r,a){e=e>>>0,r=r>>>0,a||E(e,r,this.length);let n=this[e],o=1,i=0;for(;++i<r&&(o*=256);)n+=this[e+i]*o;return n};d.prototype.readUintBE=d.prototype.readUIntBE=function(e,r,a){e=e>>>0,r=r>>>0,a||E(e,r,this.length);let n=this[e+--r],o=1;for(;r>0&&(o*=256);)n+=this[e+--r]*o;return n};d.prototype.readUint8=d.prototype.readUInt8=function(e,r){return e=e>>>0,r||E(e,1,this.length),this[e]};d.prototype.readUint16LE=d.prototype.readUInt16LE=function(e,r){return e=e>>>0,r||E(e,2,this.length),this[e]|this[e+1]<<8};d.prototype.readUint16BE=d.prototype.readUInt16BE=function(e,r){return e=e>>>0,r||E(e,2,this.length),this[e]<<8|this[e+1]};d.prototype.readUint32LE=d.prototype.readUInt32LE=function(e,r){return e=e>>>0,r||E(e,4,this.length),(this[e]|this[e+1]<<8|this[e+2]<<16)+this[e+3]*16777216};d.prototype.readUint32BE=d.prototype.readUInt32BE=function(e,r){return e=e>>>0,r||E(e,4,this.length),this[e]*16777216+(this[e+1]<<16|this[e+2]<<8|this[e+3])};d.prototype.readBigUInt64LE=z(function(e){e=e>>>0,ae(e,"offset");let r=this[e],a=this[e+7];(r===void 0||a===void 0)&&he(e,this.length-8);let n=r+this[++e]*2**8+this[++e]*2**16+this[++e]*2**24,o=this[++e]+this[++e]*2**8+this[++e]*2**16+a*2**24;return BigInt(n)+(BigInt(o)<<BigInt(32))});d.prototype.readBigUInt64BE=z(function(e){e=e>>>0,ae(e,"offset");let r=this[e],a=this[e+7];(r===void 0||a===void 0)&&he(e,this.length-8);let n=r*2**24+this[++e]*2**16+this[++e]*2**8+this[++e],o=this[++e]*2**24+this[++e]*2**16+this[++e]*2**8+a;return(BigInt(n)<<BigInt(32))+BigInt(o)});d.prototype.readIntLE=function(e,r,a){e=e>>>0,r=r>>>0,a||E(e,r,this.length);let n=this[e],o=1,i=0;for(;++i<r&&(o*=256);)n+=this[e+i]*o;return o*=128,n>=o&&(n-=Math.pow(2,8*r)),n};d.prototype.readIntBE=function(e,r,a){e=e>>>0,r=r>>>0,a||E(e,r,this.length);let n=r,o=1,i=this[e+--n];for(;n>0&&(o*=256);)i+=this[e+--n]*o;return o*=128,i>=o&&(i-=Math.pow(2,8*r)),i};d.prototype.readInt8=function(e,r){return e=e>>>0,r||E(e,1,this.length),this[e]&128?(255-this[e]+1)*-1:this[e]};d.prototype.readInt16LE=function(e,r){e=e>>>0,r||E(e,2,this.length);let a=this[e]|this[e+1]<<8;return a&32768?a|4294901760:a};d.prototype.readInt16BE=function(e,r){e=e>>>0,r||E(e,2,this.length);let a=this[e+1]|this[e]<<8;return a&32768?a|4294901760:a};d.prototype.readInt32LE=function(e,r){return e=e>>>0,r||E(e,4,this.length),this[e]|this[e+1]<<8|this[e+2]<<16|this[e+3]<<24};d.prototype.readInt32BE=function(e,r){return e=e>>>0,r||E(e,4,this.length),this[e]<<24|this[e+1]<<16|this[e+2]<<8|this[e+3]};d.prototype.readBigInt64LE=z(function(e){e=e>>>0,ae(e,"offset");let r=this[e],a=this[e+7];(r===void 0||a===void 0)&&he(e,this.length-8);let n=this[e+4]+this[e+5]*2**8+this[e+6]*2**16+(a<<24);return(BigInt(n)<<BigInt(32))+BigInt(r+this[++e]*2**8+this[++e]*2**16+this[++e]*2**24)});d.prototype.readBigInt64BE=z(function(e){e=e>>>0,ae(e,"offset");let r=this[e],a=this[e+7];(r===void 0||a===void 0)&&he(e,this.length-8);let n=(r<<24)+this[++e]*2**16+this[++e]*2**8+this[++e];return(BigInt(n)<<BigInt(32))+BigInt(this[++e]*2**24+this[++e]*2**16+this[++e]*2**8+a)});d.prototype.readFloatLE=function(e,r){return e=e>>>0,r||E(e,4,this.length),re.read(this,e,!0,23,4)};d.prototype.readFloatBE=function(e,r){return e=e>>>0,r||E(e,4,this.length),re.read(this,e,!1,23,4)};d.prototype.readDoubleLE=function(e,r){return e=e>>>0,r||E(e,8,this.length),re.read(this,e,!0,52,8)};d.prototype.readDoubleBE=function(e,r){return e=e>>>0,r||E(e,8,this.length),re.read(this,e,!1,52,8)};function T(t,e,r,a,n,o){if(!d.isBuffer(t))throw new TypeError('"buffer" argument must be a Buffer instance');if(e>n||e<o)throw new RangeError('"value" argument is out of bounds');if(r+a>t.length)throw new RangeError("Index out of range")}d.prototype.writeUintLE=d.prototype.writeUIntLE=function(e,r,a,n){if(e=+e,r=r>>>0,a=a>>>0,!n){let s=Math.pow(2,8*a)-1;T(this,e,r,a,s,0)}let o=1,i=0;for(this[r]=e&255;++i<a&&(o*=256);)this[r+i]=e/o&255;return r+a};d.prototype.writeUintBE=d.prototype.writeUIntBE=function(e,r,a,n){if(e=+e,r=r>>>0,a=a>>>0,!n){let s=Math.pow(2,8*a)-1;T(this,e,r,a,s,0)}let o=a-1,i=1;for(this[r+o]=e&255;--o>=0&&(i*=256);)this[r+o]=e/i&255;return r+a};d.prototype.writeUint8=d.prototype.writeUInt8=function(e,r,a){return e=+e,r=r>>>0,a||T(this,e,r,1,255,0),this[r]=e&255,r+1};d.prototype.writeUint16LE=d.prototype.writeUInt16LE=function(e,r,a){return e=+e,r=r>>>0,a||T(this,e,r,2,65535,0),this[r]=e&255,this[r+1]=e>>>8,r+2};d.prototype.writeUint16BE=d.prototype.writeUInt16BE=function(e,r,a){return e=+e,r=r>>>0,a||T(this,e,r,2,65535,0),this[r]=e>>>8,this[r+1]=e&255,r+2};d.prototype.writeUint32LE=d.prototype.writeUInt32LE=function(e,r,a){return e=+e,r=r>>>0,a||T(this,e,r,4,4294967295,0),this[r+3]=e>>>24,this[r+2]=e>>>16,this[r+1]=e>>>8,this[r]=e&255,r+4};d.prototype.writeUint32BE=d.prototype.writeUInt32BE=function(e,r,a){return e=+e,r=r>>>0,a||T(this,e,r,4,4294967295,0),this[r]=e>>>24,this[r+1]=e>>>16,this[r+2]=e>>>8,this[r+3]=e&255,r+4};function Qt(t,e,r,a,n){nr(e,a,n,t,r,7);let o=Number(e&BigInt(4294967295));t[r++]=o,o=o>>8,t[r++]=o,o=o>>8,t[r++]=o,o=o>>8,t[r++]=o;let i=Number(e>>BigInt(32)&BigInt(4294967295));return t[r++]=i,i=i>>8,t[r++]=i,i=i>>8,t[r++]=i,i=i>>8,t[r++]=i,r}function er(t,e,r,a,n){nr(e,a,n,t,r,7);let o=Number(e&BigInt(4294967295));t[r+7]=o,o=o>>8,t[r+6]=o,o=o>>8,t[r+5]=o,o=o>>8,t[r+4]=o;let i=Number(e>>BigInt(32)&BigInt(4294967295));return t[r+3]=i,i=i>>8,t[r+2]=i,i=i>>8,t[r+1]=i,i=i>>8,t[r]=i,r+8}d.prototype.writeBigUInt64LE=z(function(e,r=0){return Qt(this,e,r,BigInt(0),BigInt("0xffffffffffffffff"))});d.prototype.writeBigUInt64BE=z(function(e,r=0){return er(this,e,r,BigInt(0),BigInt("0xffffffffffffffff"))});d.prototype.writeIntLE=function(e,r,a,n){if(e=+e,r=r>>>0,!n){let c=Math.pow(2,8*a-1);T(this,e,r,a,c-1,-c)}let o=0,i=1,s=0;for(this[r]=e&255;++o<a&&(i*=256);)e<0&&s===0&&this[r+o-1]!==0&&(s=1),this[r+o]=(e/i>>0)-s&255;return r+a};d.prototype.writeIntBE=function(e,r,a,n){if(e=+e,r=r>>>0,!n){let c=Math.pow(2,8*a-1);T(this,e,r,a,c-1,-c)}let o=a-1,i=1,s=0;for(this[r+o]=e&255;--o>=0&&(i*=256);)e<0&&s===0&&this[r+o+1]!==0&&(s=1),this[r+o]=(e/i>>0)-s&255;return r+a};d.prototype.writeInt8=function(e,r,a){return e=+e,r=r>>>0,a||T(this,e,r,1,127,-128),e<0&&(e=255+e+1),this[r]=e&255,r+1};d.prototype.writeInt16LE=function(e,r,a){return e=+e,r=r>>>0,a||T(this,e,r,2,32767,-32768),this[r]=e&255,this[r+1]=e>>>8,r+2};d.prototype.writeInt16BE=function(e,r,a){return e=+e,r=r>>>0,a||T(this,e,r,2,32767,-32768),this[r]=e>>>8,this[r+1]=e&255,r+2};d.prototype.writeInt32LE=function(e,r,a){return e=+e,r=r>>>0,a||T(this,e,r,4,2147483647,-2147483648),this[r]=e&255,this[r+1]=e>>>8,this[r+2]=e>>>16,this[r+3]=e>>>24,r+4};d.prototype.writeInt32BE=function(e,r,a){return e=+e,r=r>>>0,a||T(this,e,r,4,2147483647,-2147483648),e<0&&(e=4294967295+e+1),this[r]=e>>>24,this[r+1]=e>>>16,this[r+2]=e>>>8,this[r+3]=e&255,r+4};d.prototype.writeBigInt64LE=z(function(e,r=0){return Qt(this,e,r,-BigInt("0x8000000000000000"),BigInt("0x7fffffffffffffff"))});d.prototype.writeBigInt64BE=z(function(e,r=0){return er(this,e,r,-BigInt("0x8000000000000000"),BigInt("0x7fffffffffffffff"))});function tr(t,e,r,a,n,o){if(r+a>t.length)throw new RangeError("Index out of range");if(r<0)throw new RangeError("Index out of range")}function rr(t,e,r,a,n){return e=+e,r=r>>>0,n||tr(t,e,r,4,34028234663852886e22,-34028234663852886e22),re.write(t,e,r,a,23,4),r+4}d.prototype.writeFloatLE=function(e,r,a){return rr(this,e,r,!0,a)};d.prototype.writeFloatBE=function(e,r,a){return rr(this,e,r,!1,a)};function ar(t,e,r,a,n){return e=+e,r=r>>>0,n||tr(t,e,r,8,17976931348623157e292,-17976931348623157e292),re.write(t,e,r,a,52,8),r+8}d.prototype.writeDoubleLE=function(e,r,a){return ar(this,e,r,!0,a)};d.prototype.writeDoubleBE=function(e,r,a){return ar(this,e,r,!1,a)};d.prototype.copy=function(e,r,a,n){if(!d.isBuffer(e))throw new TypeError("argument should be a Buffer");if(a||(a=0),!n&&n!==0&&(n=this.length),r>=e.length&&(r=e.length),r||(r=0),n>0&&n<a&&(n=a),n===a||e.length===0||this.length===0)return 0;if(r<0)throw new RangeError("targetStart out of bounds");if(a<0||a>=this.length)throw new RangeError("Index out of range");if(n<0)throw new RangeError("sourceEnd out of bounds");n>this.length&&(n=this.length),e.length-r<n-a&&(n=e.length-r+a);let o=n-a;return this===e&&typeof Uint8Array.prototype.copyWithin=="function"?this.copyWithin(r,a,n):Uint8Array.prototype.set.call(e,this.subarray(a,n),r),o};d.prototype.fill=function(e,r,a,n){if(typeof e=="string"){if(typeof r=="string"?(n=r,r=0,a=this.length):typeof a=="string"&&(n=a,a=this.length),n!==void 0&&typeof n!="string")throw new TypeError("encoding must be a string");if(typeof n=="string"&&!d.isEncoding(n))throw new TypeError("Unknown encoding: "+n);if(e.length===1){let i=e.charCodeAt(0);(n==="utf8"&&i<128||n==="latin1")&&(e=i)}}else typeof e=="number"?e=e&255:typeof e=="boolean"&&(e=Number(e));if(r<0||this.length<r||this.length<a)throw new RangeError("Out of range index");if(a<=r)return this;r=r>>>0,a=a===void 0?this.length:a>>>0,e||(e=0);let o;if(typeof e=="number")for(o=r;o<a;++o)this[o]=e;else{let i=d.isBuffer(e)?e:d.from(e,n),s=i.length;if(s===0)throw new TypeError('The value "'+e+'" is invalid for argument "value"');for(o=0;o<a-r;++o)this[o+r]=i[o%s]}return this};var te={};function et(t,e,r){te[t]=class extends r{constructor(){super(),Object.defineProperty(this,"message",{value:e.apply(this,arguments),writable:!0,configurable:!0}),this.name=`${this.name} [${t}]`,this.stack,delete this.name}get code(){return t}set code(n){Object.defineProperty(this,"code",{configurable:!0,enumerable:!0,value:n,writable:!0})}toString(){return`${this.name} [${t}]: ${this.message}`}}}et("ERR_BUFFER_OUT_OF_BOUNDS",function(t){return t?`${t} is outside of buffer bounds`:"Attempt to access memory outside buffer bounds"},RangeError);et("ERR_INVALID_ARG_TYPE",function(t,e){return`The "${t}" argument must be of type number. Received type ${typeof e}`},TypeError);et("ERR_OUT_OF_RANGE",function(t,e,r){let a=`The value of "${t}" is out of range.`,n=r;return Number.isInteger(r)&&Math.abs(r)>2**32?n=Kt(String(r)):typeof r=="bigint"&&(n=String(r),(r>BigInt(2)**BigInt(32)||r<-(BigInt(2)**BigInt(32)))&&(n=Kt(n)),n+="n"),a+=` It must be ${e}. Received ${n}`,a},RangeError);function Kt(t){let e="",r=t.length,a=t[0]==="-"?1:0;for(;r>=a+4;r-=3)e=`_${t.slice(r-3,r)}${e}`;return`${t.slice(0,r)}${e}`}function Pa(t,e,r){ae(e,"offset"),(t[e]===void 0||t[e+r]===void 0)&&he(e,t.length-(r+1))}function nr(t,e,r,a,n,o){if(t>r||t<e){let i=typeof e=="bigint"?"n":"",s;throw o>3?e===0||e===BigInt(0)?s=`>= 0${i} and < 2${i} ** ${(o+1)*8}${i}`:s=`>= -(2${i} ** ${(o+1)*8-1}${i}) and < 2 ** ${(o+1)*8-1}${i}`:s=`>= ${e}${i} and <= ${r}${i}`,new te.ERR_OUT_OF_RANGE("value",s,t)}Pa(a,n,o)}function ae(t,e){if(typeof t!="number")throw new te.ERR_INVALID_ARG_TYPE(e,"number",t)}function he(t,e,r){throw Math.floor(t)!==t?(ae(t,r),new te.ERR_OUT_OF_RANGE(r||"offset","an integer",t)):e<0?new te.ERR_BUFFER_OUT_OF_BOUNDS:new te.ERR_OUT_OF_RANGE(r||"offset",`>= ${r?1:0} and <= ${e}`,t)}var Oa=/[^+/0-9A-Za-z-_]/g;function Ca(t){if(t=t.split("=")[0],t=t.trim().replace(Oa,""),t.length<2)return"";for(;t.length%4!==0;)t=t+"=";return t}function $e(t,e){e=e||1/0;let r,a=t.length,n=null,o=[];for(let i=0;i<a;++i){if(r=t.charCodeAt(i),r>55295&&r<57344){if(!n){if(r>56319){(e-=3)>-1&&o.push(239,191,189);continue}else if(i+1===a){(e-=3)>-1&&o.push(239,191,189);continue}n=r;continue}if(r<56320){(e-=3)>-1&&o.push(239,191,189),n=r;continue}r=(n-55296<<10|r-56320)+65536}else n&&(e-=3)>-1&&o.push(239,191,189);if(n=null,r<128){if((e-=1)<0)break;o.push(r)}else if(r<2048){if((e-=2)<0)break;o.push(r>>6|192,r&63|128)}else if(r<65536){if((e-=3)<0)break;o.push(r>>12|224,r>>6&63|128,r&63|128)}else if(r<1114112){if((e-=4)<0)break;o.push(r>>18|240,r>>12&63|128,r>>6&63|128,r&63|128)}else throw new Error("Invalid code point")}return o}function La(t){let e=[];for(let r=0;r<t.length;++r)e.push(t.charCodeAt(r)&255);return e}function Ma(t,e){let r,a,n,o=[];for(let i=0;i<t.length&&!((e-=2)<0);++i)r=t.charCodeAt(i),a=r>>8,n=r%256,o.push(n),o.push(a);return o}function or(t){return Ye.toByteArray(Ca(t))}function je(t,e,r,a){let n;for(n=0;n<a&&!(n+r>=e.length||n>=t.length);++n)e[n+r]=t[n];return n}function F(t,e){return t instanceof e||t!=null&&t.constructor!=null&&t.constructor.name!=null&&t.constructor.name===e.name}function tt(t){return t!==t}var Na=function(){let t="0123456789abcdef",e=new Array(256);for(let r=0;r<16;++r){let a=r*16;for(let n=0;n<16;++n)e[a+n]=t[r]+t[n]}return e}();function z(t){return typeof BigInt>"u"?Da:t}function Da(){throw new Error("BigInt not supported")}});var yr=be((Ko,Le)=>{"use strict";var mr=(t,e,r)=>{let a=r<0?t.length+r:r,n=t.splice(e,1)[0];t.splice(a,0,n)},gr=(t,e,r)=>(t=t.slice(),mr(t,e,r),t);Le.exports=gr;Le.exports.default=gr;Le.exports.mutate=mr});var oa={storage:{local:{get:t=>new Promise(e=>{chrome.storage.local.get(t,r=>{e(r[t])})}),set:t=>new Promise(e=>chrome.storage.local.set(t,e)),remove:t=>new Promise(e=>{chrome.storage.local.remove(t,e)})}},runtime:{sendMessage:(t,e)=>chrome.runtime.sendMessage(t,e),getURL:t=>chrome.runtime.getURL(t),onMessage:{addListener:t=>chrome.runtime.onMessage.addListener(t)}}},Ct=oa;var Lt;Lt=Ct;var Y=Lt;var We=t=>String(t).startsWith("chrome://")||String(t).startsWith("chrome-extension://");var ve=t=>{let e;return t.indexOf("//")>-1?e=t.split("/")[2]:e=t.split("/")[0],e=e.split(":")[0],e=e.split("?")[0],e};var ce=class{constructor(){this.actions=[]}handle(){this.actions.forEach(e=>e.handle())}dispose(){this.actions.forEach(e=>e.dispose()),this.actions=[]}add(e){this.actions.push(e)}getActionOfType(e){return this.actions.find(r=>e.name===r.constructor.name)}},xe=class extends ce{handle(){return Promise.all(this.actions.map(e=>e.handle()))}dispose(){return Promise.all(this.actions.map(e=>e.dispose()))}};var Ae=class{constructor(e){this.hostname="";this.screens=new Map;this.actions=new ce;this.blockingActions=new xe;this.isReady=!1;this.listening=!1;this.aborted=!1;this.plugins=[];this.data={};this.tab=e,this.hostname=ve(e.url)}start({reload:e=!0}={}){return this.blockingActions.handle().then(()=>{this.actions.handle(),this.listening=!0,e&&this.reloadApp()}).catch(r=>{throw this.dispose(),r})}reloadApp(){chrome.scripting.executeScript({target:{tabId:this.tab.id},func:async()=>{try{let e=await navigator.serviceWorker.getRegistrations();await Promise.all(e.map(r=>r.unregister()))}catch(e){console.error("an error occurred",e)}finally{window.location.reload()}}}).catch(()=>{this.dispose()})}dispose(){this.listening=!1,this.blockingActions.dispose().then(()=>this.actions.dispose())}toJson(){return this.tab}};var Mt="@RESPONSIVE-VIEWER";var N="https://responsiveviewer.org",Qn=`${N}/user/extension`,Nt=`${N}/user/session`,Dt=`${N}/user/uploads`,eo=`${N}/user/state`,Ft=`${N}/api/feedback`,Ge=`${N}/uninstall`,Ut=`${N}/api/install`;var to=`${N}/login`,ro=`${N}/dashboard`,ao=`${N}/plugins`;var ze="rgba(59, 130, 246, 1)";var J=[{id:"1",header:"x-frame-options",operation:"remove",target:"response",enabled:!0},{id:"2",header:"content-security-policy",operation:"remove",target:"response",enabled:!0},{id:"3",header:"frame-options",operation:"remove",target:"response",enabled:!0},{id:"4",header:"cross-origin-opener-policy",operation:"remove",target:"response",enabled:!0},{id:"5",header:"cross-origin-embedder-policy",operation:"remove",target:"response",enabled:!0},{id:"6",header:"cross-origin-resource-policy",operation:"remove",target:"response",enabled:!0}];var L=class{constructor(e,r){this.screenRules=new Map;this.tab=e,this.contentTypeRuleId=r.generate(),this.frameHeaderRuleId=r.generate()}static resetAll(){return chrome.declarativeNetRequest.getSessionRules().then(e=>chrome.declarativeNetRequest.updateSessionRules({removeRuleIds:e.map(r=>r.id)}))}removeInitialResponseRules(){chrome.declarativeNetRequest.updateSessionRules({removeRuleIds:[this.contentTypeRuleId]})}async handle(){let e=await chrome.storage.local.get("APP_STATE");e.APP_STATE&&(this.tab.state=e.APP_STATE);let r=[...this.getInitialResponseRules(),...this.getFrameRules()];return chrome.declarativeNetRequest.updateSessionRules({removeRuleIds:r.map(a=>a.id),addRules:r})}updateFrameRules(){let e=this.getFrameRules();return chrome.declarativeNetRequest.updateSessionRules({removeRuleIds:[this.frameHeaderRuleId],addRules:e})}clearInitialRequesRequest(){chrome.declarativeNetRequest.updateSessionRules({removeRuleIds:[this.contentTypeRuleId]})}dispose(){return chrome.declarativeNetRequest.updateSessionRules({removeRuleIds:[this.contentTypeRuleId,this.frameHeaderRuleId]})}getInitialResponseRules(){return[{id:this.contentTypeRuleId,priority:1,action:{type:chrome.declarativeNetRequest.RuleActionType.MODIFY_HEADERS,responseHeaders:[{header:"content-type",operation:chrome.declarativeNetRequest.HeaderOperation.SET,value:"image/png"}]},condition:{tabIds:[this.tab.tab.id],resourceTypes:[chrome.declarativeNetRequest.ResourceType.MAIN_FRAME]}}]}getFrameRules(){let r=(this.tab.state?.headerRules??J).filter(i=>i.enabled&&i.header);if(r.length===0)return[];let a=i=>i==="set"?chrome.declarativeNetRequest.HeaderOperation.SET:chrome.declarativeNetRequest.HeaderOperation.REMOVE,n=r.filter(i=>i.target==="request").map(i=>({header:i.header,operation:a(i.operation),...i.operation==="set"&&i.value?{value:i.value}:{}})),o=r.filter(i=>i.target==="response").map(i=>({header:i.header,operation:a(i.operation),...i.operation==="set"&&i.value?{value:i.value}:{}}));return n.length===0&&o.length===0?[]:[{id:this.frameHeaderRuleId,priority:1,action:{type:chrome.declarativeNetRequest.RuleActionType.MODIFY_HEADERS,...o.length>0?{responseHeaders:o}:{},...n.length>0?{requestHeaders:n}:{}},condition:{tabIds:[this.tab.tab.id],resourceTypes:[chrome.declarativeNetRequest.ResourceType.MAIN_FRAME,chrome.declarativeNetRequest.ResourceType.SUB_FRAME]}}]}};var _=(t="",e="")=>{let r=`${Mt}${e?"-"+e:""}`;return t.startsWith(r)?t:`${r}/${t}`};var Se=class{constructor(e){this.tab=e,this.onBeforeNavigate=this.onBeforeNavigate.bind(this)}handle(){chrome.webNavigation.onCommitted.addListener(this.onBeforeNavigate)}dispose(){chrome.webNavigation.onCommitted.removeListener(this.onBeforeNavigate)}onBeforeNavigate(e){e.tabId===this.tab.tab.id&&(this.frameConnected(e)||(this.frameRefreshed(e.frameId),this.appRefreshed(e.frameId)))}appRefreshed(e){e===0&&(this.tab.isReady||this.tab.blockingActions.getActionOfType(L)?.clearInitialRequesRequest())}frameConnected(e){let{frameId:r,url:a}=e;if(r===0)return;if(!a.startsWith("about:blank?screenId="))return!1;let n=new URL(a).searchParams.get("screenId");return this.tab.screens.set(r,n),chrome.tabs.sendMessage(this.tab.tab.id,{message:_("FRAME_CONNECTED"),frameId:r,screenId:n}),!0}frameRefreshed(e){if(e===0)return;let r=this.tab.screens.get(e);r&&chrome.tabs.sendMessage(this.tab.tab.id,{message:_("FRAME_REFRESHED"),screenId:r})}};var Ee=class{constructor(e,r){this.tab=e,this.context=r,this.onBeforeRequest=this.onBeforeRequest.bind(this)}handle(){chrome.webRequest.onBeforeRequest.addListener(this.onBeforeRequest,{urls:["<all_urls>"],types:["main_frame"],tabId:this.tab.tab.id})}dispose(){chrome.webRequest.onBeforeRequest.removeListener(this.onBeforeRequest)}onBeforeRequest(e){this.tab.isReady&&this.context.removeTab(this.tab.tab.id)}};var we=class{constructor(e,r){this.tab=e,this.context=r,this.onErrorOccurred=this.onErrorOccurred.bind(this)}handle(){chrome.webNavigation.onErrorOccurred.addListener(this.onErrorOccurred)}dispose(){chrome.webNavigation.onErrorOccurred.removeListener(this.onErrorOccurred)}onErrorOccurred(e){e.tabId!==this.tab.tab.id||e.frameId!==0||this.context.removeTab(this.tab.tab.id)}};var de={},pe=class{constructor(e,r){this.tab=e,this.plugin=r}handle(){if(!this.plugin.background)return;let e=Y.runtime.getURL(this.plugin.background);de[e]?this.execute(de[e]):fetch(e).then(r=>r.text()).then(r=>{de[e]=r,this.execute(de[e])})}execute(e){chrome.tabs.sendMessage(this.tab.tab.id,{message:_("PLUGIN_SCRIPT_INSTALL"),script:e,plugin:this.plugin})}dispose(){if(this.plugin.background){let e=Y.runtime.getURL(this.plugin.background);delete de[e]}}};var cr=Ot(ir());var sr=()=>()=>{};var ke=class{constructor(e){this.tab=e,this.onMessage=this.onMessage.bind(this)}handle(){chrome.runtime.onMessage.addListener(this.onMessage)}dispose(){chrome.runtime.onMessage.removeListener(this.onMessage)}onMessage(e,r,a){return!r.tab||!this.tab.tab.id||r.tab.id!==this.tab.tab.id?!1:(Ua(e,r,a,this.tab),!0)}},Fa=sr(),Ua=async(t,e,r,a)=>{switch(t.message){case _("GET_TAB_URL"):r({tabUrl:a.tab.url});break;case _("SUBMIT_FEEDBACK"):fetch(Ft,{method:"POST",body:JSON.stringify(t.data)}).catch(h=>{console.error("Failed to submit feedback:",h)}),r({});break;case _("UPLOAD_SCREENSHOT"):let{user:n}=await chrome.storage.local.get("user");if(!n){r({error:"User not authenticated"});return}let o=t.screenshots.map(h=>{let f=h.image.split(",");f.shift();let m=f.join(""),g=cr.Buffer.from(m,"base64"),x=new Uint8Array(g.length);for(let y=0;y<g.length;y++)x[y]=g[y];return new File([x],h.filename,{type:"image/png"})}),i=new FormData;o.forEach((h,f)=>{i.append("file",h)}),fetch(Dt,{method:"POST",body:i,headers:{Authorization:n.accessToken}}).then(h=>h.json()).then(h=>{r(h)}).catch(h=>{r({error:h.message})});break;case _("CAPTURE_SCREEN"):let s=await chrome.tabs.captureVisibleTab(a.tab.windowId,{format:"png",quality:1});r({image:s});break;case _("WAIT"):setTimeout(()=>{r({})},t.time);break;case _("LOAD_PLUGINS"):a.plugins=t.plugins,r({});break;case _("PLUGIN_INSTALL"):if(a.plugins.push(t.plugin),t.plugin.background){let h=new pe(a,t.plugin);a.actions.add(h),h.handle()}break;case _("PLUGIN_UNINSTALL"):let c=a.plugins.findIndex(h=>h.name===t.plugin.name),l=a.actions.actions.findIndex(h=>h instanceof pe&&h.plugin.name===t.plugin.name);l!==-1&&(a.actions.actions[l].dispose(),a.actions.actions.splice(l,1)),c!==-1&&a.plugins.splice(c,1);break;case _("CHECK_USER"):ur(a,!0);break;case _("LOAD_STATE"):a.state=t.state,a.blockingActions.actions.find(h=>h instanceof L)?.updateFrameRules();let{user:p}=await chrome.storage.local.get("user");setTimeout(()=>{dr(p?.accessToken,a)},200),r({extensionURL:chrome.runtime.getURL("").replace(/\/$/,""),user:p});break;case _("PING"):ur(a,!1),r({pong:!0});break;case _("UPDATE_USER"):await chrome.storage.local.set({user:t.user}),r({ok:!0});break;case _("GET_SCREEN_ID"):r({screenId:a.screens.get(e.frameId),ok:!0});break;case _("SAVE_STATE"):Fa(t.state),r({});break;default:chrome.tabs.sendMessage(a.tab.id,t,()=>{}),r({});break}},rt=0,Re=0,Ba=60*24*2,qa=5,lr=t=>(Date.now()-t)/(60*1e3),dr=async(t,e,r=!1,a)=>{if(!r&&(rt!==0&&lr(rt)<Ba||Re!==0&&lr(Re)<qa))return;let n={isAuthorized:!1,isPremium:!1,accessToken:"",name:"",plan:"Free"};if(t){try{let o=await fetch(Nt,{headers:{Authorization:t}});if(o.status!==200)throw new Error(`Received status ${o.status} `);n=await o.json()}catch(o){Re=Date.now(),console.warn("Unable to verify the session, keeping the known user",o);return}rt=Date.now(),Re=0}chrome.tabs.sendMessage(e.tab.id,{message:_(a||"UPDATE_USER"),user:n})},at=!1;async function ur(t,e){try{if(at)return;at=!0;let{user:r}=await chrome.storage.local.get("user");await dr(r?.accessToken,t,e,"USER_CHECKED")}catch{}finally{at=!1}}var pr="__@RESONSIVE_VIEWER_DONT_USE_SCREEN_ID@__";var hr=`"use strict";
var script = (() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // node_modules/lodash/lodash.js
  var require_lodash = __commonJS({
    "node_modules/lodash/lodash.js"(exports, module) {
      ;
      (function() {
        var undefined2;
        var VERSION = "4.17.21";
        var LARGE_ARRAY_SIZE = 200;
        var CORE_ERROR_TEXT = "Unsupported core-js use. Try https://npms.io/search?q=ponyfill.", FUNC_ERROR_TEXT = "Expected a function", INVALID_TEMPL_VAR_ERROR_TEXT = "Invalid \`variable\` option passed into \`_.template\`";
        var HASH_UNDEFINED = "__lodash_hash_undefined__";
        var MAX_MEMOIZE_SIZE = 500;
        var PLACEHOLDER = "__lodash_placeholder__";
        var CLONE_DEEP_FLAG = 1, CLONE_FLAT_FLAG = 2, CLONE_SYMBOLS_FLAG = 4;
        var COMPARE_PARTIAL_FLAG = 1, COMPARE_UNORDERED_FLAG = 2;
        var WRAP_BIND_FLAG = 1, WRAP_BIND_KEY_FLAG = 2, WRAP_CURRY_BOUND_FLAG = 4, WRAP_CURRY_FLAG = 8, WRAP_CURRY_RIGHT_FLAG = 16, WRAP_PARTIAL_FLAG = 32, WRAP_PARTIAL_RIGHT_FLAG = 64, WRAP_ARY_FLAG = 128, WRAP_REARG_FLAG = 256, WRAP_FLIP_FLAG = 512;
        var DEFAULT_TRUNC_LENGTH = 30, DEFAULT_TRUNC_OMISSION = "...";
        var HOT_COUNT = 800, HOT_SPAN = 16;
        var LAZY_FILTER_FLAG = 1, LAZY_MAP_FLAG = 2, LAZY_WHILE_FLAG = 3;
        var INFINITY = 1 / 0, MAX_SAFE_INTEGER = 9007199254740991, MAX_INTEGER = 17976931348623157e292, NAN = 0 / 0;
        var MAX_ARRAY_LENGTH = 4294967295, MAX_ARRAY_INDEX = MAX_ARRAY_LENGTH - 1, HALF_MAX_ARRAY_LENGTH = MAX_ARRAY_LENGTH >>> 1;
        var wrapFlags = [
          ["ary", WRAP_ARY_FLAG],
          ["bind", WRAP_BIND_FLAG],
          ["bindKey", WRAP_BIND_KEY_FLAG],
          ["curry", WRAP_CURRY_FLAG],
          ["curryRight", WRAP_CURRY_RIGHT_FLAG],
          ["flip", WRAP_FLIP_FLAG],
          ["partial", WRAP_PARTIAL_FLAG],
          ["partialRight", WRAP_PARTIAL_RIGHT_FLAG],
          ["rearg", WRAP_REARG_FLAG]
        ];
        var argsTag = "[object Arguments]", arrayTag = "[object Array]", asyncTag = "[object AsyncFunction]", boolTag = "[object Boolean]", dateTag = "[object Date]", domExcTag = "[object DOMException]", errorTag = "[object Error]", funcTag = "[object Function]", genTag = "[object GeneratorFunction]", mapTag = "[object Map]", numberTag = "[object Number]", nullTag = "[object Null]", objectTag = "[object Object]", promiseTag = "[object Promise]", proxyTag = "[object Proxy]", regexpTag = "[object RegExp]", setTag = "[object Set]", stringTag = "[object String]", symbolTag = "[object Symbol]", undefinedTag = "[object Undefined]", weakMapTag = "[object WeakMap]", weakSetTag = "[object WeakSet]";
        var arrayBufferTag = "[object ArrayBuffer]", dataViewTag = "[object DataView]", float32Tag = "[object Float32Array]", float64Tag = "[object Float64Array]", int8Tag = "[object Int8Array]", int16Tag = "[object Int16Array]", int32Tag = "[object Int32Array]", uint8Tag = "[object Uint8Array]", uint8ClampedTag = "[object Uint8ClampedArray]", uint16Tag = "[object Uint16Array]", uint32Tag = "[object Uint32Array]";
        var reEmptyStringLeading = /\\b__p \\+= '';/g, reEmptyStringMiddle = /\\b(__p \\+=) '' \\+/g, reEmptyStringTrailing = /(__e\\(.*?\\)|\\b__t\\)) \\+\\n'';/g;
        var reEscapedHtml = /&(?:amp|lt|gt|quot|#39);/g, reUnescapedHtml = /[&<>"']/g, reHasEscapedHtml = RegExp(reEscapedHtml.source), reHasUnescapedHtml = RegExp(reUnescapedHtml.source);
        var reEscape = /<%-([\\s\\S]+?)%>/g, reEvaluate = /<%([\\s\\S]+?)%>/g, reInterpolate = /<%=([\\s\\S]+?)%>/g;
        var reIsDeepProp = /\\.|\\[(?:[^[\\]]*|(["'])(?:(?!\\1)[^\\\\]|\\\\.)*?\\1)\\]/, reIsPlainProp = /^\\w*$/, rePropName = /[^.[\\]]+|\\[(?:(-?\\d+(?:\\.\\d+)?)|(["'])((?:(?!\\2)[^\\\\]|\\\\.)*?)\\2)\\]|(?=(?:\\.|\\[\\])(?:\\.|\\[\\]|$))/g;
        var reRegExpChar = /[\\\\^$.*+?()[\\]{}|]/g, reHasRegExpChar = RegExp(reRegExpChar.source);
        var reTrimStart = /^\\s+/;
        var reWhitespace = /\\s/;
        var reWrapComment = /\\{(?:\\n\\/\\* \\[wrapped with .+\\] \\*\\/)?\\n?/, reWrapDetails = /\\{\\n\\/\\* \\[wrapped with (.+)\\] \\*/, reSplitDetails = /,? & /;
        var reAsciiWord = /[^\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\x7f]+/g;
        var reForbiddenIdentifierChars = /[()=,{}\\[\\]\\/\\s]/;
        var reEscapeChar = /\\\\(\\\\)?/g;
        var reEsTemplate = /\\$\\{([^\\\\}]*(?:\\\\.[^\\\\}]*)*)\\}/g;
        var reFlags = /\\w*$/;
        var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
        var reIsBinary = /^0b[01]+$/i;
        var reIsHostCtor = /^\\[object .+?Constructor\\]$/;
        var reIsOctal = /^0o[0-7]+$/i;
        var reIsUint = /^(?:0|[1-9]\\d*)$/;
        var reLatin = /[\\xc0-\\xd6\\xd8-\\xf6\\xf8-\\xff\\u0100-\\u017f]/g;
        var reNoMatch = /($^)/;
        var reUnescapedString = /['\\n\\r\\u2028\\u2029\\\\]/g;
        var rsAstralRange = "\\\\ud800-\\\\udfff", rsComboMarksRange = "\\\\u0300-\\\\u036f", reComboHalfMarksRange = "\\\\ufe20-\\\\ufe2f", rsComboSymbolsRange = "\\\\u20d0-\\\\u20ff", rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange, rsDingbatRange = "\\\\u2700-\\\\u27bf", rsLowerRange = "a-z\\\\xdf-\\\\xf6\\\\xf8-\\\\xff", rsMathOpRange = "\\\\xac\\\\xb1\\\\xd7\\\\xf7", rsNonCharRange = "\\\\x00-\\\\x2f\\\\x3a-\\\\x40\\\\x5b-\\\\x60\\\\x7b-\\\\xbf", rsPunctuationRange = "\\\\u2000-\\\\u206f", rsSpaceRange = " \\\\t\\\\x0b\\\\f\\\\xa0\\\\ufeff\\\\n\\\\r\\\\u2028\\\\u2029\\\\u1680\\\\u180e\\\\u2000\\\\u2001\\\\u2002\\\\u2003\\\\u2004\\\\u2005\\\\u2006\\\\u2007\\\\u2008\\\\u2009\\\\u200a\\\\u202f\\\\u205f\\\\u3000", rsUpperRange = "A-Z\\\\xc0-\\\\xd6\\\\xd8-\\\\xde", rsVarRange = "\\\\ufe0e\\\\ufe0f", rsBreakRange = rsMathOpRange + rsNonCharRange + rsPunctuationRange + rsSpaceRange;
        var rsApos = "['\\u2019]", rsAstral = "[" + rsAstralRange + "]", rsBreak = "[" + rsBreakRange + "]", rsCombo = "[" + rsComboRange + "]", rsDigits = "\\\\d+", rsDingbat = "[" + rsDingbatRange + "]", rsLower = "[" + rsLowerRange + "]", rsMisc = "[^" + rsAstralRange + rsBreakRange + rsDigits + rsDingbatRange + rsLowerRange + rsUpperRange + "]", rsFitz = "\\\\ud83c[\\\\udffb-\\\\udfff]", rsModifier = "(?:" + rsCombo + "|" + rsFitz + ")", rsNonAstral = "[^" + rsAstralRange + "]", rsRegional = "(?:\\\\ud83c[\\\\udde6-\\\\uddff]){2}", rsSurrPair = "[\\\\ud800-\\\\udbff][\\\\udc00-\\\\udfff]", rsUpper = "[" + rsUpperRange + "]", rsZWJ = "\\\\u200d";
        var rsMiscLower = "(?:" + rsLower + "|" + rsMisc + ")", rsMiscUpper = "(?:" + rsUpper + "|" + rsMisc + ")", rsOptContrLower = "(?:" + rsApos + "(?:d|ll|m|re|s|t|ve))?", rsOptContrUpper = "(?:" + rsApos + "(?:D|LL|M|RE|S|T|VE))?", reOptMod = rsModifier + "?", rsOptVar = "[" + rsVarRange + "]?", rsOptJoin = "(?:" + rsZWJ + "(?:" + [rsNonAstral, rsRegional, rsSurrPair].join("|") + ")" + rsOptVar + reOptMod + ")*", rsOrdLower = "\\\\d*(?:1st|2nd|3rd|(?![123])\\\\dth)(?=\\\\b|[A-Z_])", rsOrdUpper = "\\\\d*(?:1ST|2ND|3RD|(?![123])\\\\dTH)(?=\\\\b|[a-z_])", rsSeq = rsOptVar + reOptMod + rsOptJoin, rsEmoji = "(?:" + [rsDingbat, rsRegional, rsSurrPair].join("|") + ")" + rsSeq, rsSymbol = "(?:" + [rsNonAstral + rsCombo + "?", rsCombo, rsRegional, rsSurrPair, rsAstral].join("|") + ")";
        var reApos = RegExp(rsApos, "g");
        var reComboMark = RegExp(rsCombo, "g");
        var reUnicode = RegExp(rsFitz + "(?=" + rsFitz + ")|" + rsSymbol + rsSeq, "g");
        var reUnicodeWord = RegExp([
          rsUpper + "?" + rsLower + "+" + rsOptContrLower + "(?=" + [rsBreak, rsUpper, "$"].join("|") + ")",
          rsMiscUpper + "+" + rsOptContrUpper + "(?=" + [rsBreak, rsUpper + rsMiscLower, "$"].join("|") + ")",
          rsUpper + "?" + rsMiscLower + "+" + rsOptContrLower,
          rsUpper + "+" + rsOptContrUpper,
          rsOrdUpper,
          rsOrdLower,
          rsDigits,
          rsEmoji
        ].join("|"), "g");
        var reHasUnicode = RegExp("[" + rsZWJ + rsAstralRange + rsComboRange + rsVarRange + "]");
        var reHasUnicodeWord = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;
        var contextProps = [
          "Array",
          "Buffer",
          "DataView",
          "Date",
          "Error",
          "Float32Array",
          "Float64Array",
          "Function",
          "Int8Array",
          "Int16Array",
          "Int32Array",
          "Map",
          "Math",
          "Object",
          "Promise",
          "RegExp",
          "Set",
          "String",
          "Symbol",
          "TypeError",
          "Uint8Array",
          "Uint8ClampedArray",
          "Uint16Array",
          "Uint32Array",
          "WeakMap",
          "_",
          "clearTimeout",
          "isFinite",
          "parseInt",
          "setTimeout"
        ];
        var templateCounter = -1;
        var typedArrayTags = {};
        typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
        typedArrayTags[argsTag] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;
        var cloneableTags = {};
        cloneableTags[argsTag] = cloneableTags[arrayTag] = cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] = cloneableTags[boolTag] = cloneableTags[dateTag] = cloneableTags[float32Tag] = cloneableTags[float64Tag] = cloneableTags[int8Tag] = cloneableTags[int16Tag] = cloneableTags[int32Tag] = cloneableTags[mapTag] = cloneableTags[numberTag] = cloneableTags[objectTag] = cloneableTags[regexpTag] = cloneableTags[setTag] = cloneableTags[stringTag] = cloneableTags[symbolTag] = cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] = cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
        cloneableTags[errorTag] = cloneableTags[funcTag] = cloneableTags[weakMapTag] = false;
        var deburredLetters = {
          // Latin-1 Supplement block.
          "\\xC0": "A",
          "\\xC1": "A",
          "\\xC2": "A",
          "\\xC3": "A",
          "\\xC4": "A",
          "\\xC5": "A",
          "\\xE0": "a",
          "\\xE1": "a",
          "\\xE2": "a",
          "\\xE3": "a",
          "\\xE4": "a",
          "\\xE5": "a",
          "\\xC7": "C",
          "\\xE7": "c",
          "\\xD0": "D",
          "\\xF0": "d",
          "\\xC8": "E",
          "\\xC9": "E",
          "\\xCA": "E",
          "\\xCB": "E",
          "\\xE8": "e",
          "\\xE9": "e",
          "\\xEA": "e",
          "\\xEB": "e",
          "\\xCC": "I",
          "\\xCD": "I",
          "\\xCE": "I",
          "\\xCF": "I",
          "\\xEC": "i",
          "\\xED": "i",
          "\\xEE": "i",
          "\\xEF": "i",
          "\\xD1": "N",
          "\\xF1": "n",
          "\\xD2": "O",
          "\\xD3": "O",
          "\\xD4": "O",
          "\\xD5": "O",
          "\\xD6": "O",
          "\\xD8": "O",
          "\\xF2": "o",
          "\\xF3": "o",
          "\\xF4": "o",
          "\\xF5": "o",
          "\\xF6": "o",
          "\\xF8": "o",
          "\\xD9": "U",
          "\\xDA": "U",
          "\\xDB": "U",
          "\\xDC": "U",
          "\\xF9": "u",
          "\\xFA": "u",
          "\\xFB": "u",
          "\\xFC": "u",
          "\\xDD": "Y",
          "\\xFD": "y",
          "\\xFF": "y",
          "\\xC6": "Ae",
          "\\xE6": "ae",
          "\\xDE": "Th",
          "\\xFE": "th",
          "\\xDF": "ss",
          // Latin Extended-A block.
          "\\u0100": "A",
          "\\u0102": "A",
          "\\u0104": "A",
          "\\u0101": "a",
          "\\u0103": "a",
          "\\u0105": "a",
          "\\u0106": "C",
          "\\u0108": "C",
          "\\u010A": "C",
          "\\u010C": "C",
          "\\u0107": "c",
          "\\u0109": "c",
          "\\u010B": "c",
          "\\u010D": "c",
          "\\u010E": "D",
          "\\u0110": "D",
          "\\u010F": "d",
          "\\u0111": "d",
          "\\u0112": "E",
          "\\u0114": "E",
          "\\u0116": "E",
          "\\u0118": "E",
          "\\u011A": "E",
          "\\u0113": "e",
          "\\u0115": "e",
          "\\u0117": "e",
          "\\u0119": "e",
          "\\u011B": "e",
          "\\u011C": "G",
          "\\u011E": "G",
          "\\u0120": "G",
          "\\u0122": "G",
          "\\u011D": "g",
          "\\u011F": "g",
          "\\u0121": "g",
          "\\u0123": "g",
          "\\u0124": "H",
          "\\u0126": "H",
          "\\u0125": "h",
          "\\u0127": "h",
          "\\u0128": "I",
          "\\u012A": "I",
          "\\u012C": "I",
          "\\u012E": "I",
          "\\u0130": "I",
          "\\u0129": "i",
          "\\u012B": "i",
          "\\u012D": "i",
          "\\u012F": "i",
          "\\u0131": "i",
          "\\u0134": "J",
          "\\u0135": "j",
          "\\u0136": "K",
          "\\u0137": "k",
          "\\u0138": "k",
          "\\u0139": "L",
          "\\u013B": "L",
          "\\u013D": "L",
          "\\u013F": "L",
          "\\u0141": "L",
          "\\u013A": "l",
          "\\u013C": "l",
          "\\u013E": "l",
          "\\u0140": "l",
          "\\u0142": "l",
          "\\u0143": "N",
          "\\u0145": "N",
          "\\u0147": "N",
          "\\u014A": "N",
          "\\u0144": "n",
          "\\u0146": "n",
          "\\u0148": "n",
          "\\u014B": "n",
          "\\u014C": "O",
          "\\u014E": "O",
          "\\u0150": "O",
          "\\u014D": "o",
          "\\u014F": "o",
          "\\u0151": "o",
          "\\u0154": "R",
          "\\u0156": "R",
          "\\u0158": "R",
          "\\u0155": "r",
          "\\u0157": "r",
          "\\u0159": "r",
          "\\u015A": "S",
          "\\u015C": "S",
          "\\u015E": "S",
          "\\u0160": "S",
          "\\u015B": "s",
          "\\u015D": "s",
          "\\u015F": "s",
          "\\u0161": "s",
          "\\u0162": "T",
          "\\u0164": "T",
          "\\u0166": "T",
          "\\u0163": "t",
          "\\u0165": "t",
          "\\u0167": "t",
          "\\u0168": "U",
          "\\u016A": "U",
          "\\u016C": "U",
          "\\u016E": "U",
          "\\u0170": "U",
          "\\u0172": "U",
          "\\u0169": "u",
          "\\u016B": "u",
          "\\u016D": "u",
          "\\u016F": "u",
          "\\u0171": "u",
          "\\u0173": "u",
          "\\u0174": "W",
          "\\u0175": "w",
          "\\u0176": "Y",
          "\\u0177": "y",
          "\\u0178": "Y",
          "\\u0179": "Z",
          "\\u017B": "Z",
          "\\u017D": "Z",
          "\\u017A": "z",
          "\\u017C": "z",
          "\\u017E": "z",
          "\\u0132": "IJ",
          "\\u0133": "ij",
          "\\u0152": "Oe",
          "\\u0153": "oe",
          "\\u0149": "'n",
          "\\u017F": "s"
        };
        var htmlEscapes = {
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;"
        };
        var htmlUnescapes = {
          "&amp;": "&",
          "&lt;": "<",
          "&gt;": ">",
          "&quot;": '"',
          "&#39;": "'"
        };
        var stringEscapes = {
          "\\\\": "\\\\",
          "'": "'",
          "\\n": "n",
          "\\r": "r",
          "\\u2028": "u2028",
          "\\u2029": "u2029"
        };
        var freeParseFloat = parseFloat, freeParseInt = parseInt;
        var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
        var freeSelf = typeof self == "object" && self && self.Object === Object && self;
        var root = freeGlobal || freeSelf || Function("return this")();
        var freeExports = typeof exports == "object" && exports && !exports.nodeType && exports;
        var freeModule = freeExports && typeof module == "object" && module && !module.nodeType && module;
        var moduleExports = freeModule && freeModule.exports === freeExports;
        var freeProcess = moduleExports && freeGlobal.process;
        var nodeUtil = function() {
          try {
            var types = freeModule && freeModule.require && freeModule.require("util").types;
            if (types) {
              return types;
            }
            return freeProcess && freeProcess.binding && freeProcess.binding("util");
          } catch (e3) {
          }
        }();
        var nodeIsArrayBuffer = nodeUtil && nodeUtil.isArrayBuffer, nodeIsDate = nodeUtil && nodeUtil.isDate, nodeIsMap = nodeUtil && nodeUtil.isMap, nodeIsRegExp = nodeUtil && nodeUtil.isRegExp, nodeIsSet = nodeUtil && nodeUtil.isSet, nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;
        function apply(func, thisArg, args) {
          switch (args.length) {
            case 0:
              return func.call(thisArg);
            case 1:
              return func.call(thisArg, args[0]);
            case 2:
              return func.call(thisArg, args[0], args[1]);
            case 3:
              return func.call(thisArg, args[0], args[1], args[2]);
          }
          return func.apply(thisArg, args);
        }
        __name(apply, "apply");
        function arrayAggregator(array, setter, iteratee, accumulator) {
          var index = -1, length = array == null ? 0 : array.length;
          while (++index < length) {
            var value = array[index];
            setter(accumulator, value, iteratee(value), array);
          }
          return accumulator;
        }
        __name(arrayAggregator, "arrayAggregator");
        function arrayEach(array, iteratee) {
          var index = -1, length = array == null ? 0 : array.length;
          while (++index < length) {
            if (iteratee(array[index], index, array) === false) {
              break;
            }
          }
          return array;
        }
        __name(arrayEach, "arrayEach");
        function arrayEachRight(array, iteratee) {
          var length = array == null ? 0 : array.length;
          while (length--) {
            if (iteratee(array[length], length, array) === false) {
              break;
            }
          }
          return array;
        }
        __name(arrayEachRight, "arrayEachRight");
        function arrayEvery(array, predicate) {
          var index = -1, length = array == null ? 0 : array.length;
          while (++index < length) {
            if (!predicate(array[index], index, array)) {
              return false;
            }
          }
          return true;
        }
        __name(arrayEvery, "arrayEvery");
        function arrayFilter(array, predicate) {
          var index = -1, length = array == null ? 0 : array.length, resIndex = 0, result = [];
          while (++index < length) {
            var value = array[index];
            if (predicate(value, index, array)) {
              result[resIndex++] = value;
            }
          }
          return result;
        }
        __name(arrayFilter, "arrayFilter");
        function arrayIncludes(array, value) {
          var length = array == null ? 0 : array.length;
          return !!length && baseIndexOf(array, value, 0) > -1;
        }
        __name(arrayIncludes, "arrayIncludes");
        function arrayIncludesWith(array, value, comparator) {
          var index = -1, length = array == null ? 0 : array.length;
          while (++index < length) {
            if (comparator(value, array[index])) {
              return true;
            }
          }
          return false;
        }
        __name(arrayIncludesWith, "arrayIncludesWith");
        function arrayMap(array, iteratee) {
          var index = -1, length = array == null ? 0 : array.length, result = Array(length);
          while (++index < length) {
            result[index] = iteratee(array[index], index, array);
          }
          return result;
        }
        __name(arrayMap, "arrayMap");
        function arrayPush(array, values) {
          var index = -1, length = values.length, offset = array.length;
          while (++index < length) {
            array[offset + index] = values[index];
          }
          return array;
        }
        __name(arrayPush, "arrayPush");
        function arrayReduce(array, iteratee, accumulator, initAccum) {
          var index = -1, length = array == null ? 0 : array.length;
          if (initAccum && length) {
            accumulator = array[++index];
          }
          while (++index < length) {
            accumulator = iteratee(accumulator, array[index], index, array);
          }
          return accumulator;
        }
        __name(arrayReduce, "arrayReduce");
        function arrayReduceRight(array, iteratee, accumulator, initAccum) {
          var length = array == null ? 0 : array.length;
          if (initAccum && length) {
            accumulator = array[--length];
          }
          while (length--) {
            accumulator = iteratee(accumulator, array[length], length, array);
          }
          return accumulator;
        }
        __name(arrayReduceRight, "arrayReduceRight");
        function arraySome(array, predicate) {
          var index = -1, length = array == null ? 0 : array.length;
          while (++index < length) {
            if (predicate(array[index], index, array)) {
              return true;
            }
          }
          return false;
        }
        __name(arraySome, "arraySome");
        var asciiSize = baseProperty("length");
        function asciiToArray(string) {
          return string.split("");
        }
        __name(asciiToArray, "asciiToArray");
        function asciiWords(string) {
          return string.match(reAsciiWord) || [];
        }
        __name(asciiWords, "asciiWords");
        function baseFindKey(collection, predicate, eachFunc) {
          var result;
          eachFunc(collection, function(value, key, collection2) {
            if (predicate(value, key, collection2)) {
              result = key;
              return false;
            }
          });
          return result;
        }
        __name(baseFindKey, "baseFindKey");
        function baseFindIndex(array, predicate, fromIndex, fromRight) {
          var length = array.length, index = fromIndex + (fromRight ? 1 : -1);
          while (fromRight ? index-- : ++index < length) {
            if (predicate(array[index], index, array)) {
              return index;
            }
          }
          return -1;
        }
        __name(baseFindIndex, "baseFindIndex");
        function baseIndexOf(array, value, fromIndex) {
          return value === value ? strictIndexOf(array, value, fromIndex) : baseFindIndex(array, baseIsNaN, fromIndex);
        }
        __name(baseIndexOf, "baseIndexOf");
        function baseIndexOfWith(array, value, fromIndex, comparator) {
          var index = fromIndex - 1, length = array.length;
          while (++index < length) {
            if (comparator(array[index], value)) {
              return index;
            }
          }
          return -1;
        }
        __name(baseIndexOfWith, "baseIndexOfWith");
        function baseIsNaN(value) {
          return value !== value;
        }
        __name(baseIsNaN, "baseIsNaN");
        function baseMean(array, iteratee) {
          var length = array == null ? 0 : array.length;
          return length ? baseSum(array, iteratee) / length : NAN;
        }
        __name(baseMean, "baseMean");
        function baseProperty(key) {
          return function(object) {
            return object == null ? undefined2 : object[key];
          };
        }
        __name(baseProperty, "baseProperty");
        function basePropertyOf(object) {
          return function(key) {
            return object == null ? undefined2 : object[key];
          };
        }
        __name(basePropertyOf, "basePropertyOf");
        function baseReduce(collection, iteratee, accumulator, initAccum, eachFunc) {
          eachFunc(collection, function(value, index, collection2) {
            accumulator = initAccum ? (initAccum = false, value) : iteratee(accumulator, value, index, collection2);
          });
          return accumulator;
        }
        __name(baseReduce, "baseReduce");
        function baseSortBy(array, comparer) {
          var length = array.length;
          array.sort(comparer);
          while (length--) {
            array[length] = array[length].value;
          }
          return array;
        }
        __name(baseSortBy, "baseSortBy");
        function baseSum(array, iteratee) {
          var result, index = -1, length = array.length;
          while (++index < length) {
            var current = iteratee(array[index]);
            if (current !== undefined2) {
              result = result === undefined2 ? current : result + current;
            }
          }
          return result;
        }
        __name(baseSum, "baseSum");
        function baseTimes(n2, iteratee) {
          var index = -1, result = Array(n2);
          while (++index < n2) {
            result[index] = iteratee(index);
          }
          return result;
        }
        __name(baseTimes, "baseTimes");
        function baseToPairs(object, props) {
          return arrayMap(props, function(key) {
            return [key, object[key]];
          });
        }
        __name(baseToPairs, "baseToPairs");
        function baseTrim(string) {
          return string ? string.slice(0, trimmedEndIndex(string) + 1).replace(reTrimStart, "") : string;
        }
        __name(baseTrim, "baseTrim");
        function baseUnary(func) {
          return function(value) {
            return func(value);
          };
        }
        __name(baseUnary, "baseUnary");
        function baseValues(object, props) {
          return arrayMap(props, function(key) {
            return object[key];
          });
        }
        __name(baseValues, "baseValues");
        function cacheHas(cache4, key) {
          return cache4.has(key);
        }
        __name(cacheHas, "cacheHas");
        function charsStartIndex(strSymbols, chrSymbols) {
          var index = -1, length = strSymbols.length;
          while (++index < length && baseIndexOf(chrSymbols, strSymbols[index], 0) > -1) {
          }
          return index;
        }
        __name(charsStartIndex, "charsStartIndex");
        function charsEndIndex(strSymbols, chrSymbols) {
          var index = strSymbols.length;
          while (index-- && baseIndexOf(chrSymbols, strSymbols[index], 0) > -1) {
          }
          return index;
        }
        __name(charsEndIndex, "charsEndIndex");
        function countHolders(array, placeholder) {
          var length = array.length, result = 0;
          while (length--) {
            if (array[length] === placeholder) {
              ++result;
            }
          }
          return result;
        }
        __name(countHolders, "countHolders");
        var deburrLetter = basePropertyOf(deburredLetters);
        var escapeHtmlChar = basePropertyOf(htmlEscapes);
        function escapeStringChar(chr) {
          return "\\\\" + stringEscapes[chr];
        }
        __name(escapeStringChar, "escapeStringChar");
        function getValue(object, key) {
          return object == null ? undefined2 : object[key];
        }
        __name(getValue, "getValue");
        function hasUnicode(string) {
          return reHasUnicode.test(string);
        }
        __name(hasUnicode, "hasUnicode");
        function hasUnicodeWord(string) {
          return reHasUnicodeWord.test(string);
        }
        __name(hasUnicodeWord, "hasUnicodeWord");
        function iteratorToArray(iterator) {
          var data, result = [];
          while (!(data = iterator.next()).done) {
            result.push(data.value);
          }
          return result;
        }
        __name(iteratorToArray, "iteratorToArray");
        function mapToArray(map) {
          var index = -1, result = Array(map.size);
          map.forEach(function(value, key) {
            result[++index] = [key, value];
          });
          return result;
        }
        __name(mapToArray, "mapToArray");
        function overArg(func, transform) {
          return function(arg) {
            return func(transform(arg));
          };
        }
        __name(overArg, "overArg");
        function replaceHolders(array, placeholder) {
          var index = -1, length = array.length, resIndex = 0, result = [];
          while (++index < length) {
            var value = array[index];
            if (value === placeholder || value === PLACEHOLDER) {
              array[index] = PLACEHOLDER;
              result[resIndex++] = index;
            }
          }
          return result;
        }
        __name(replaceHolders, "replaceHolders");
        function setToArray(set) {
          var index = -1, result = Array(set.size);
          set.forEach(function(value) {
            result[++index] = value;
          });
          return result;
        }
        __name(setToArray, "setToArray");
        function setToPairs(set) {
          var index = -1, result = Array(set.size);
          set.forEach(function(value) {
            result[++index] = [value, value];
          });
          return result;
        }
        __name(setToPairs, "setToPairs");
        function strictIndexOf(array, value, fromIndex) {
          var index = fromIndex - 1, length = array.length;
          while (++index < length) {
            if (array[index] === value) {
              return index;
            }
          }
          return -1;
        }
        __name(strictIndexOf, "strictIndexOf");
        function strictLastIndexOf(array, value, fromIndex) {
          var index = fromIndex + 1;
          while (index--) {
            if (array[index] === value) {
              return index;
            }
          }
          return index;
        }
        __name(strictLastIndexOf, "strictLastIndexOf");
        function stringSize(string) {
          return hasUnicode(string) ? unicodeSize(string) : asciiSize(string);
        }
        __name(stringSize, "stringSize");
        function stringToArray(string) {
          return hasUnicode(string) ? unicodeToArray(string) : asciiToArray(string);
        }
        __name(stringToArray, "stringToArray");
        function trimmedEndIndex(string) {
          var index = string.length;
          while (index-- && reWhitespace.test(string.charAt(index))) {
          }
          return index;
        }
        __name(trimmedEndIndex, "trimmedEndIndex");
        var unescapeHtmlChar = basePropertyOf(htmlUnescapes);
        function unicodeSize(string) {
          var result = reUnicode.lastIndex = 0;
          while (reUnicode.test(string)) {
            ++result;
          }
          return result;
        }
        __name(unicodeSize, "unicodeSize");
        function unicodeToArray(string) {
          return string.match(reUnicode) || [];
        }
        __name(unicodeToArray, "unicodeToArray");
        function unicodeWords(string) {
          return string.match(reUnicodeWord) || [];
        }
        __name(unicodeWords, "unicodeWords");
        var runInContext = /* @__PURE__ */ __name(function runInContext2(context) {
          context = context == null ? root : _.defaults(root.Object(), context, _.pick(root, contextProps));
          var Array2 = context.Array, Date2 = context.Date, Error2 = context.Error, Function2 = context.Function, Math2 = context.Math, Object2 = context.Object, RegExp2 = context.RegExp, String2 = context.String, TypeError2 = context.TypeError;
          var arrayProto = Array2.prototype, funcProto = Function2.prototype, objectProto = Object2.prototype;
          var coreJsData = context["__core-js_shared__"];
          var funcToString = funcProto.toString;
          var hasOwnProperty = objectProto.hasOwnProperty;
          var idCounter = 0;
          var maskSrcKey = function() {
            var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || "");
            return uid ? "Symbol(src)_1." + uid : "";
          }();
          var nativeObjectToString = objectProto.toString;
          var objectCtorString = funcToString.call(Object2);
          var oldDash = root._;
          var reIsNative = RegExp2(
            "^" + funcToString.call(hasOwnProperty).replace(reRegExpChar, "\\\\$&").replace(/hasOwnProperty|(function).*?(?=\\\\\\()| for .+?(?=\\\\\\])/g, "$1.*?") + "$"
          );
          var Buffer2 = moduleExports ? context.Buffer : undefined2, Symbol2 = context.Symbol, Uint8Array2 = context.Uint8Array, allocUnsafe = Buffer2 ? Buffer2.allocUnsafe : undefined2, getPrototype = overArg(Object2.getPrototypeOf, Object2), objectCreate = Object2.create, propertyIsEnumerable = objectProto.propertyIsEnumerable, splice = arrayProto.splice, spreadableSymbol = Symbol2 ? Symbol2.isConcatSpreadable : undefined2, symIterator = Symbol2 ? Symbol2.iterator : undefined2, symToStringTag = Symbol2 ? Symbol2.toStringTag : undefined2;
          var defineProperty = function() {
            try {
              var func = getNative(Object2, "defineProperty");
              func({}, "", {});
              return func;
            } catch (e3) {
            }
          }();
          var ctxClearTimeout = context.clearTimeout !== root.clearTimeout && context.clearTimeout, ctxNow = Date2 && Date2.now !== root.Date.now && Date2.now, ctxSetTimeout = context.setTimeout !== root.setTimeout && context.setTimeout;
          var nativeCeil = Math2.ceil, nativeFloor = Math2.floor, nativeGetSymbols = Object2.getOwnPropertySymbols, nativeIsBuffer = Buffer2 ? Buffer2.isBuffer : undefined2, nativeIsFinite = context.isFinite, nativeJoin = arrayProto.join, nativeKeys = overArg(Object2.keys, Object2), nativeMax = Math2.max, nativeMin = Math2.min, nativeNow = Date2.now, nativeParseInt = context.parseInt, nativeRandom = Math2.random, nativeReverse = arrayProto.reverse;
          var DataView = getNative(context, "DataView"), Map2 = getNative(context, "Map"), Promise2 = getNative(context, "Promise"), Set2 = getNative(context, "Set"), WeakMap2 = getNative(context, "WeakMap"), nativeCreate = getNative(Object2, "create");
          var metaMap = WeakMap2 && new WeakMap2();
          var realNames = {};
          var dataViewCtorString = toSource(DataView), mapCtorString = toSource(Map2), promiseCtorString = toSource(Promise2), setCtorString = toSource(Set2), weakMapCtorString = toSource(WeakMap2);
          var symbolProto = Symbol2 ? Symbol2.prototype : undefined2, symbolValueOf = symbolProto ? symbolProto.valueOf : undefined2, symbolToString = symbolProto ? symbolProto.toString : undefined2;
          function lodash(value) {
            if (isObjectLike(value) && !isArray(value) && !(value instanceof LazyWrapper)) {
              if (value instanceof LodashWrapper) {
                return value;
              }
              if (hasOwnProperty.call(value, "__wrapped__")) {
                return wrapperClone(value);
              }
            }
            return new LodashWrapper(value);
          }
          __name(lodash, "lodash");
          var baseCreate = /* @__PURE__ */ function() {
            function object() {
            }
            __name(object, "object");
            return function(proto) {
              if (!isObject(proto)) {
                return {};
              }
              if (objectCreate) {
                return objectCreate(proto);
              }
              object.prototype = proto;
              var result2 = new object();
              object.prototype = undefined2;
              return result2;
            };
          }();
          function baseLodash() {
          }
          __name(baseLodash, "baseLodash");
          function LodashWrapper(value, chainAll) {
            this.__wrapped__ = value;
            this.__actions__ = [];
            this.__chain__ = !!chainAll;
            this.__index__ = 0;
            this.__values__ = undefined2;
          }
          __name(LodashWrapper, "LodashWrapper");
          lodash.templateSettings = {
            /**
             * Used to detect \`data\` property values to be HTML-escaped.
             *
             * @memberOf _.templateSettings
             * @type {RegExp}
             */
            "escape": reEscape,
            /**
             * Used to detect code to be evaluated.
             *
             * @memberOf _.templateSettings
             * @type {RegExp}
             */
            "evaluate": reEvaluate,
            /**
             * Used to detect \`data\` property values to inject.
             *
             * @memberOf _.templateSettings
             * @type {RegExp}
             */
            "interpolate": reInterpolate,
            /**
             * Used to reference the data object in the template text.
             *
             * @memberOf _.templateSettings
             * @type {string}
             */
            "variable": "",
            /**
             * Used to import variables into the compiled template.
             *
             * @memberOf _.templateSettings
             * @type {Object}
             */
            "imports": {
              /**
               * A reference to the \`lodash\` function.
               *
               * @memberOf _.templateSettings.imports
               * @type {Function}
               */
              "_": lodash
            }
          };
          lodash.prototype = baseLodash.prototype;
          lodash.prototype.constructor = lodash;
          LodashWrapper.prototype = baseCreate(baseLodash.prototype);
          LodashWrapper.prototype.constructor = LodashWrapper;
          function LazyWrapper(value) {
            this.__wrapped__ = value;
            this.__actions__ = [];
            this.__dir__ = 1;
            this.__filtered__ = false;
            this.__iteratees__ = [];
            this.__takeCount__ = MAX_ARRAY_LENGTH;
            this.__views__ = [];
          }
          __name(LazyWrapper, "LazyWrapper");
          function lazyClone() {
            var result2 = new LazyWrapper(this.__wrapped__);
            result2.__actions__ = copyArray(this.__actions__);
            result2.__dir__ = this.__dir__;
            result2.__filtered__ = this.__filtered__;
            result2.__iteratees__ = copyArray(this.__iteratees__);
            result2.__takeCount__ = this.__takeCount__;
            result2.__views__ = copyArray(this.__views__);
            return result2;
          }
          __name(lazyClone, "lazyClone");
          function lazyReverse() {
            if (this.__filtered__) {
              var result2 = new LazyWrapper(this);
              result2.__dir__ = -1;
              result2.__filtered__ = true;
            } else {
              result2 = this.clone();
              result2.__dir__ *= -1;
            }
            return result2;
          }
          __name(lazyReverse, "lazyReverse");
          function lazyValue() {
            var array = this.__wrapped__.value(), dir = this.__dir__, isArr = isArray(array), isRight = dir < 0, arrLength = isArr ? array.length : 0, view = getView(0, arrLength, this.__views__), start = view.start, end = view.end, length = end - start, index = isRight ? end : start - 1, iteratees = this.__iteratees__, iterLength = iteratees.length, resIndex = 0, takeCount = nativeMin(length, this.__takeCount__);
            if (!isArr || !isRight && arrLength == length && takeCount == length) {
              return baseWrapperValue(array, this.__actions__);
            }
            var result2 = [];
            outer:
              while (length-- && resIndex < takeCount) {
                index += dir;
                var iterIndex = -1, value = array[index];
                while (++iterIndex < iterLength) {
                  var data = iteratees[iterIndex], iteratee2 = data.iteratee, type = data.type, computed = iteratee2(value);
                  if (type == LAZY_MAP_FLAG) {
                    value = computed;
                  } else if (!computed) {
                    if (type == LAZY_FILTER_FLAG) {
                      continue outer;
                    } else {
                      break outer;
                    }
                  }
                }
                result2[resIndex++] = value;
              }
            return result2;
          }
          __name(lazyValue, "lazyValue");
          LazyWrapper.prototype = baseCreate(baseLodash.prototype);
          LazyWrapper.prototype.constructor = LazyWrapper;
          function Hash(entries) {
            var index = -1, length = entries == null ? 0 : entries.length;
            this.clear();
            while (++index < length) {
              var entry = entries[index];
              this.set(entry[0], entry[1]);
            }
          }
          __name(Hash, "Hash");
          function hashClear() {
            this.__data__ = nativeCreate ? nativeCreate(null) : {};
            this.size = 0;
          }
          __name(hashClear, "hashClear");
          function hashDelete(key) {
            var result2 = this.has(key) && delete this.__data__[key];
            this.size -= result2 ? 1 : 0;
            return result2;
          }
          __name(hashDelete, "hashDelete");
          function hashGet(key) {
            var data = this.__data__;
            if (nativeCreate) {
              var result2 = data[key];
              return result2 === HASH_UNDEFINED ? undefined2 : result2;
            }
            return hasOwnProperty.call(data, key) ? data[key] : undefined2;
          }
          __name(hashGet, "hashGet");
          function hashHas(key) {
            var data = this.__data__;
            return nativeCreate ? data[key] !== undefined2 : hasOwnProperty.call(data, key);
          }
          __name(hashHas, "hashHas");
          function hashSet(key, value) {
            var data = this.__data__;
            this.size += this.has(key) ? 0 : 1;
            data[key] = nativeCreate && value === undefined2 ? HASH_UNDEFINED : value;
            return this;
          }
          __name(hashSet, "hashSet");
          Hash.prototype.clear = hashClear;
          Hash.prototype["delete"] = hashDelete;
          Hash.prototype.get = hashGet;
          Hash.prototype.has = hashHas;
          Hash.prototype.set = hashSet;
          function ListCache(entries) {
            var index = -1, length = entries == null ? 0 : entries.length;
            this.clear();
            while (++index < length) {
              var entry = entries[index];
              this.set(entry[0], entry[1]);
            }
          }
          __name(ListCache, "ListCache");
          function listCacheClear() {
            this.__data__ = [];
            this.size = 0;
          }
          __name(listCacheClear, "listCacheClear");
          function listCacheDelete(key) {
            var data = this.__data__, index = assocIndexOf(data, key);
            if (index < 0) {
              return false;
            }
            var lastIndex = data.length - 1;
            if (index == lastIndex) {
              data.pop();
            } else {
              splice.call(data, index, 1);
            }
            --this.size;
            return true;
          }
          __name(listCacheDelete, "listCacheDelete");
          function listCacheGet(key) {
            var data = this.__data__, index = assocIndexOf(data, key);
            return index < 0 ? undefined2 : data[index][1];
          }
          __name(listCacheGet, "listCacheGet");
          function listCacheHas(key) {
            return assocIndexOf(this.__data__, key) > -1;
          }
          __name(listCacheHas, "listCacheHas");
          function listCacheSet(key, value) {
            var data = this.__data__, index = assocIndexOf(data, key);
            if (index < 0) {
              ++this.size;
              data.push([key, value]);
            } else {
              data[index][1] = value;
            }
            return this;
          }
          __name(listCacheSet, "listCacheSet");
          ListCache.prototype.clear = listCacheClear;
          ListCache.prototype["delete"] = listCacheDelete;
          ListCache.prototype.get = listCacheGet;
          ListCache.prototype.has = listCacheHas;
          ListCache.prototype.set = listCacheSet;
          function MapCache(entries) {
            var index = -1, length = entries == null ? 0 : entries.length;
            this.clear();
            while (++index < length) {
              var entry = entries[index];
              this.set(entry[0], entry[1]);
            }
          }
          __name(MapCache, "MapCache");
          function mapCacheClear() {
            this.size = 0;
            this.__data__ = {
              "hash": new Hash(),
              "map": new (Map2 || ListCache)(),
              "string": new Hash()
            };
          }
          __name(mapCacheClear, "mapCacheClear");
          function mapCacheDelete(key) {
            var result2 = getMapData(this, key)["delete"](key);
            this.size -= result2 ? 1 : 0;
            return result2;
          }
          __name(mapCacheDelete, "mapCacheDelete");
          function mapCacheGet(key) {
            return getMapData(this, key).get(key);
          }
          __name(mapCacheGet, "mapCacheGet");
          function mapCacheHas(key) {
            return getMapData(this, key).has(key);
          }
          __name(mapCacheHas, "mapCacheHas");
          function mapCacheSet(key, value) {
            var data = getMapData(this, key), size2 = data.size;
            data.set(key, value);
            this.size += data.size == size2 ? 0 : 1;
            return this;
          }
          __name(mapCacheSet, "mapCacheSet");
          MapCache.prototype.clear = mapCacheClear;
          MapCache.prototype["delete"] = mapCacheDelete;
          MapCache.prototype.get = mapCacheGet;
          MapCache.prototype.has = mapCacheHas;
          MapCache.prototype.set = mapCacheSet;
          function SetCache(values2) {
            var index = -1, length = values2 == null ? 0 : values2.length;
            this.__data__ = new MapCache();
            while (++index < length) {
              this.add(values2[index]);
            }
          }
          __name(SetCache, "SetCache");
          function setCacheAdd(value) {
            this.__data__.set(value, HASH_UNDEFINED);
            return this;
          }
          __name(setCacheAdd, "setCacheAdd");
          function setCacheHas(value) {
            return this.__data__.has(value);
          }
          __name(setCacheHas, "setCacheHas");
          SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
          SetCache.prototype.has = setCacheHas;
          function Stack(entries) {
            var data = this.__data__ = new ListCache(entries);
            this.size = data.size;
          }
          __name(Stack, "Stack");
          function stackClear() {
            this.__data__ = new ListCache();
            this.size = 0;
          }
          __name(stackClear, "stackClear");
          function stackDelete(key) {
            var data = this.__data__, result2 = data["delete"](key);
            this.size = data.size;
            return result2;
          }
          __name(stackDelete, "stackDelete");
          function stackGet(key) {
            return this.__data__.get(key);
          }
          __name(stackGet, "stackGet");
          function stackHas(key) {
            return this.__data__.has(key);
          }
          __name(stackHas, "stackHas");
          function stackSet(key, value) {
            var data = this.__data__;
            if (data instanceof ListCache) {
              var pairs = data.__data__;
              if (!Map2 || pairs.length < LARGE_ARRAY_SIZE - 1) {
                pairs.push([key, value]);
                this.size = ++data.size;
                return this;
              }
              data = this.__data__ = new MapCache(pairs);
            }
            data.set(key, value);
            this.size = data.size;
            return this;
          }
          __name(stackSet, "stackSet");
          Stack.prototype.clear = stackClear;
          Stack.prototype["delete"] = stackDelete;
          Stack.prototype.get = stackGet;
          Stack.prototype.has = stackHas;
          Stack.prototype.set = stackSet;
          function arrayLikeKeys(value, inherited) {
            var isArr = isArray(value), isArg = !isArr && isArguments(value), isBuff = !isArr && !isArg && isBuffer(value), isType = !isArr && !isArg && !isBuff && isTypedArray(value), skipIndexes = isArr || isArg || isBuff || isType, result2 = skipIndexes ? baseTimes(value.length, String2) : [], length = result2.length;
            for (var key in value) {
              if ((inherited || hasOwnProperty.call(value, key)) && !(skipIndexes && // Safari 9 has enumerable \`arguments.length\` in strict mode.
              (key == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
              isBuff && (key == "offset" || key == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
              isType && (key == "buffer" || key == "byteLength" || key == "byteOffset") || // Skip index properties.
              isIndex(key, length)))) {
                result2.push(key);
              }
            }
            return result2;
          }
          __name(arrayLikeKeys, "arrayLikeKeys");
          function arraySample(array) {
            var length = array.length;
            return length ? array[baseRandom(0, length - 1)] : undefined2;
          }
          __name(arraySample, "arraySample");
          function arraySampleSize(array, n2) {
            return shuffleSelf(copyArray(array), baseClamp(n2, 0, array.length));
          }
          __name(arraySampleSize, "arraySampleSize");
          function arrayShuffle(array) {
            return shuffleSelf(copyArray(array));
          }
          __name(arrayShuffle, "arrayShuffle");
          function assignMergeValue(object, key, value) {
            if (value !== undefined2 && !eq(object[key], value) || value === undefined2 && !(key in object)) {
              baseAssignValue(object, key, value);
            }
          }
          __name(assignMergeValue, "assignMergeValue");
          function assignValue(object, key, value) {
            var objValue = object[key];
            if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) || value === undefined2 && !(key in object)) {
              baseAssignValue(object, key, value);
            }
          }
          __name(assignValue, "assignValue");
          function assocIndexOf(array, key) {
            var length = array.length;
            while (length--) {
              if (eq(array[length][0], key)) {
                return length;
              }
            }
            return -1;
          }
          __name(assocIndexOf, "assocIndexOf");
          function baseAggregator(collection, setter, iteratee2, accumulator) {
            baseEach(collection, function(value, key, collection2) {
              setter(accumulator, value, iteratee2(value), collection2);
            });
            return accumulator;
          }
          __name(baseAggregator, "baseAggregator");
          function baseAssign(object, source) {
            return object && copyObject(source, keys(source), object);
          }
          __name(baseAssign, "baseAssign");
          function baseAssignIn(object, source) {
            return object && copyObject(source, keysIn(source), object);
          }
          __name(baseAssignIn, "baseAssignIn");
          function baseAssignValue(object, key, value) {
            if (key == "__proto__" && defineProperty) {
              defineProperty(object, key, {
                "configurable": true,
                "enumerable": true,
                "value": value,
                "writable": true
              });
            } else {
              object[key] = value;
            }
          }
          __name(baseAssignValue, "baseAssignValue");
          function baseAt(object, paths) {
            var index = -1, length = paths.length, result2 = Array2(length), skip = object == null;
            while (++index < length) {
              result2[index] = skip ? undefined2 : get(object, paths[index]);
            }
            return result2;
          }
          __name(baseAt, "baseAt");
          function baseClamp(number, lower, upper) {
            if (number === number) {
              if (upper !== undefined2) {
                number = number <= upper ? number : upper;
              }
              if (lower !== undefined2) {
                number = number >= lower ? number : lower;
              }
            }
            return number;
          }
          __name(baseClamp, "baseClamp");
          function baseClone(value, bitmask, customizer, key, object, stack) {
            var result2, isDeep = bitmask & CLONE_DEEP_FLAG, isFlat = bitmask & CLONE_FLAT_FLAG, isFull = bitmask & CLONE_SYMBOLS_FLAG;
            if (customizer) {
              result2 = object ? customizer(value, key, object, stack) : customizer(value);
            }
            if (result2 !== undefined2) {
              return result2;
            }
            if (!isObject(value)) {
              return value;
            }
            var isArr = isArray(value);
            if (isArr) {
              result2 = initCloneArray(value);
              if (!isDeep) {
                return copyArray(value, result2);
              }
            } else {
              var tag = getTag(value), isFunc = tag == funcTag || tag == genTag;
              if (isBuffer(value)) {
                return cloneBuffer(value, isDeep);
              }
              if (tag == objectTag || tag == argsTag || isFunc && !object) {
                result2 = isFlat || isFunc ? {} : initCloneObject(value);
                if (!isDeep) {
                  return isFlat ? copySymbolsIn(value, baseAssignIn(result2, value)) : copySymbols(value, baseAssign(result2, value));
                }
              } else {
                if (!cloneableTags[tag]) {
                  return object ? value : {};
                }
                result2 = initCloneByTag(value, tag, isDeep);
              }
            }
            stack || (stack = new Stack());
            var stacked = stack.get(value);
            if (stacked) {
              return stacked;
            }
            stack.set(value, result2);
            if (isSet(value)) {
              value.forEach(function(subValue) {
                result2.add(baseClone(subValue, bitmask, customizer, subValue, value, stack));
              });
            } else if (isMap(value)) {
              value.forEach(function(subValue, key2) {
                result2.set(key2, baseClone(subValue, bitmask, customizer, key2, value, stack));
              });
            }
            var keysFunc = isFull ? isFlat ? getAllKeysIn : getAllKeys : isFlat ? keysIn : keys;
            var props = isArr ? undefined2 : keysFunc(value);
            arrayEach(props || value, function(subValue, key2) {
              if (props) {
                key2 = subValue;
                subValue = value[key2];
              }
              assignValue(result2, key2, baseClone(subValue, bitmask, customizer, key2, value, stack));
            });
            return result2;
          }
          __name(baseClone, "baseClone");
          function baseConforms(source) {
            var props = keys(source);
            return function(object) {
              return baseConformsTo(object, source, props);
            };
          }
          __name(baseConforms, "baseConforms");
          function baseConformsTo(object, source, props) {
            var length = props.length;
            if (object == null) {
              return !length;
            }
            object = Object2(object);
            while (length--) {
              var key = props[length], predicate = source[key], value = object[key];
              if (value === undefined2 && !(key in object) || !predicate(value)) {
                return false;
              }
            }
            return true;
          }
          __name(baseConformsTo, "baseConformsTo");
          function baseDelay(func, wait, args) {
            if (typeof func != "function") {
              throw new TypeError2(FUNC_ERROR_TEXT);
            }
            return setTimeout2(function() {
              func.apply(undefined2, args);
            }, wait);
          }
          __name(baseDelay, "baseDelay");
          function baseDifference(array, values2, iteratee2, comparator) {
            var index = -1, includes2 = arrayIncludes, isCommon = true, length = array.length, result2 = [], valuesLength = values2.length;
            if (!length) {
              return result2;
            }
            if (iteratee2) {
              values2 = arrayMap(values2, baseUnary(iteratee2));
            }
            if (comparator) {
              includes2 = arrayIncludesWith;
              isCommon = false;
            } else if (values2.length >= LARGE_ARRAY_SIZE) {
              includes2 = cacheHas;
              isCommon = false;
              values2 = new SetCache(values2);
            }
            outer:
              while (++index < length) {
                var value = array[index], computed = iteratee2 == null ? value : iteratee2(value);
                value = comparator || value !== 0 ? value : 0;
                if (isCommon && computed === computed) {
                  var valuesIndex = valuesLength;
                  while (valuesIndex--) {
                    if (values2[valuesIndex] === computed) {
                      continue outer;
                    }
                  }
                  result2.push(value);
                } else if (!includes2(values2, computed, comparator)) {
                  result2.push(value);
                }
              }
            return result2;
          }
          __name(baseDifference, "baseDifference");
          var baseEach = createBaseEach(baseForOwn);
          var baseEachRight = createBaseEach(baseForOwnRight, true);
          function baseEvery(collection, predicate) {
            var result2 = true;
            baseEach(collection, function(value, index, collection2) {
              result2 = !!predicate(value, index, collection2);
              return result2;
            });
            return result2;
          }
          __name(baseEvery, "baseEvery");
          function baseExtremum(array, iteratee2, comparator) {
            var index = -1, length = array.length;
            while (++index < length) {
              var value = array[index], current = iteratee2(value);
              if (current != null && (computed === undefined2 ? current === current && !isSymbol(current) : comparator(current, computed))) {
                var computed = current, result2 = value;
              }
            }
            return result2;
          }
          __name(baseExtremum, "baseExtremum");
          function baseFill(array, value, start, end) {
            var length = array.length;
            start = toInteger(start);
            if (start < 0) {
              start = -start > length ? 0 : length + start;
            }
            end = end === undefined2 || end > length ? length : toInteger(end);
            if (end < 0) {
              end += length;
            }
            end = start > end ? 0 : toLength(end);
            while (start < end) {
              array[start++] = value;
            }
            return array;
          }
          __name(baseFill, "baseFill");
          function baseFilter(collection, predicate) {
            var result2 = [];
            baseEach(collection, function(value, index, collection2) {
              if (predicate(value, index, collection2)) {
                result2.push(value);
              }
            });
            return result2;
          }
          __name(baseFilter, "baseFilter");
          function baseFlatten(array, depth, predicate, isStrict, result2) {
            var index = -1, length = array.length;
            predicate || (predicate = isFlattenable);
            result2 || (result2 = []);
            while (++index < length) {
              var value = array[index];
              if (depth > 0 && predicate(value)) {
                if (depth > 1) {
                  baseFlatten(value, depth - 1, predicate, isStrict, result2);
                } else {
                  arrayPush(result2, value);
                }
              } else if (!isStrict) {
                result2[result2.length] = value;
              }
            }
            return result2;
          }
          __name(baseFlatten, "baseFlatten");
          var baseFor = createBaseFor();
          var baseForRight = createBaseFor(true);
          function baseForOwn(object, iteratee2) {
            return object && baseFor(object, iteratee2, keys);
          }
          __name(baseForOwn, "baseForOwn");
          function baseForOwnRight(object, iteratee2) {
            return object && baseForRight(object, iteratee2, keys);
          }
          __name(baseForOwnRight, "baseForOwnRight");
          function baseFunctions(object, props) {
            return arrayFilter(props, function(key) {
              return isFunction(object[key]);
            });
          }
          __name(baseFunctions, "baseFunctions");
          function baseGet(object, path) {
            path = castPath(path, object);
            var index = 0, length = path.length;
            while (object != null && index < length) {
              object = object[toKey(path[index++])];
            }
            return index && index == length ? object : undefined2;
          }
          __name(baseGet, "baseGet");
          function baseGetAllKeys(object, keysFunc, symbolsFunc) {
            var result2 = keysFunc(object);
            return isArray(object) ? result2 : arrayPush(result2, symbolsFunc(object));
          }
          __name(baseGetAllKeys, "baseGetAllKeys");
          function baseGetTag(value) {
            if (value == null) {
              return value === undefined2 ? undefinedTag : nullTag;
            }
            return symToStringTag && symToStringTag in Object2(value) ? getRawTag(value) : objectToString(value);
          }
          __name(baseGetTag, "baseGetTag");
          function baseGt(value, other) {
            return value > other;
          }
          __name(baseGt, "baseGt");
          function baseHas(object, key) {
            return object != null && hasOwnProperty.call(object, key);
          }
          __name(baseHas, "baseHas");
          function baseHasIn(object, key) {
            return object != null && key in Object2(object);
          }
          __name(baseHasIn, "baseHasIn");
          function baseInRange(number, start, end) {
            return number >= nativeMin(start, end) && number < nativeMax(start, end);
          }
          __name(baseInRange, "baseInRange");
          function baseIntersection(arrays, iteratee2, comparator) {
            var includes2 = comparator ? arrayIncludesWith : arrayIncludes, length = arrays[0].length, othLength = arrays.length, othIndex = othLength, caches = Array2(othLength), maxLength = Infinity, result2 = [];
            while (othIndex--) {
              var array = arrays[othIndex];
              if (othIndex && iteratee2) {
                array = arrayMap(array, baseUnary(iteratee2));
              }
              maxLength = nativeMin(array.length, maxLength);
              caches[othIndex] = !comparator && (iteratee2 || length >= 120 && array.length >= 120) ? new SetCache(othIndex && array) : undefined2;
            }
            array = arrays[0];
            var index = -1, seen = caches[0];
            outer:
              while (++index < length && result2.length < maxLength) {
                var value = array[index], computed = iteratee2 ? iteratee2(value) : value;
                value = comparator || value !== 0 ? value : 0;
                if (!(seen ? cacheHas(seen, computed) : includes2(result2, computed, comparator))) {
                  othIndex = othLength;
                  while (--othIndex) {
                    var cache4 = caches[othIndex];
                    if (!(cache4 ? cacheHas(cache4, computed) : includes2(arrays[othIndex], computed, comparator))) {
                      continue outer;
                    }
                  }
                  if (seen) {
                    seen.push(computed);
                  }
                  result2.push(value);
                }
              }
            return result2;
          }
          __name(baseIntersection, "baseIntersection");
          function baseInverter(object, setter, iteratee2, accumulator) {
            baseForOwn(object, function(value, key, object2) {
              setter(accumulator, iteratee2(value), key, object2);
            });
            return accumulator;
          }
          __name(baseInverter, "baseInverter");
          function baseInvoke(object, path, args) {
            path = castPath(path, object);
            object = parent(object, path);
            var func = object == null ? object : object[toKey(last(path))];
            return func == null ? undefined2 : apply(func, object, args);
          }
          __name(baseInvoke, "baseInvoke");
          function baseIsArguments(value) {
            return isObjectLike(value) && baseGetTag(value) == argsTag;
          }
          __name(baseIsArguments, "baseIsArguments");
          function baseIsArrayBuffer(value) {
            return isObjectLike(value) && baseGetTag(value) == arrayBufferTag;
          }
          __name(baseIsArrayBuffer, "baseIsArrayBuffer");
          function baseIsDate(value) {
            return isObjectLike(value) && baseGetTag(value) == dateTag;
          }
          __name(baseIsDate, "baseIsDate");
          function baseIsEqual(value, other, bitmask, customizer, stack) {
            if (value === other) {
              return true;
            }
            if (value == null || other == null || !isObjectLike(value) && !isObjectLike(other)) {
              return value !== value && other !== other;
            }
            return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
          }
          __name(baseIsEqual, "baseIsEqual");
          function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
            var objIsArr = isArray(object), othIsArr = isArray(other), objTag = objIsArr ? arrayTag : getTag(object), othTag = othIsArr ? arrayTag : getTag(other);
            objTag = objTag == argsTag ? objectTag : objTag;
            othTag = othTag == argsTag ? objectTag : othTag;
            var objIsObj = objTag == objectTag, othIsObj = othTag == objectTag, isSameTag = objTag == othTag;
            if (isSameTag && isBuffer(object)) {
              if (!isBuffer(other)) {
                return false;
              }
              objIsArr = true;
              objIsObj = false;
            }
            if (isSameTag && !objIsObj) {
              stack || (stack = new Stack());
              return objIsArr || isTypedArray(object) ? equalArrays(object, other, bitmask, customizer, equalFunc, stack) : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
            }
            if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
              var objIsWrapped = objIsObj && hasOwnProperty.call(object, "__wrapped__"), othIsWrapped = othIsObj && hasOwnProperty.call(other, "__wrapped__");
              if (objIsWrapped || othIsWrapped) {
                var objUnwrapped = objIsWrapped ? object.value() : object, othUnwrapped = othIsWrapped ? other.value() : other;
                stack || (stack = new Stack());
                return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
              }
            }
            if (!isSameTag) {
              return false;
            }
            stack || (stack = new Stack());
            return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
          }
          __name(baseIsEqualDeep, "baseIsEqualDeep");
          function baseIsMap(value) {
            return isObjectLike(value) && getTag(value) == mapTag;
          }
          __name(baseIsMap, "baseIsMap");
          function baseIsMatch(object, source, matchData, customizer) {
            var index = matchData.length, length = index, noCustomizer = !customizer;
            if (object == null) {
              return !length;
            }
            object = Object2(object);
            while (index--) {
              var data = matchData[index];
              if (noCustomizer && data[2] ? data[1] !== object[data[0]] : !(data[0] in object)) {
                return false;
              }
            }
            while (++index < length) {
              data = matchData[index];
              var key = data[0], objValue = object[key], srcValue = data[1];
              if (noCustomizer && data[2]) {
                if (objValue === undefined2 && !(key in object)) {
                  return false;
                }
              } else {
                var stack = new Stack();
                if (customizer) {
                  var result2 = customizer(objValue, srcValue, key, object, source, stack);
                }
                if (!(result2 === undefined2 ? baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG, customizer, stack) : result2)) {
                  return false;
                }
              }
            }
            return true;
          }
          __name(baseIsMatch, "baseIsMatch");
          function baseIsNative(value) {
            if (!isObject(value) || isMasked(value)) {
              return false;
            }
            var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
            return pattern.test(toSource(value));
          }
          __name(baseIsNative, "baseIsNative");
          function baseIsRegExp(value) {
            return isObjectLike(value) && baseGetTag(value) == regexpTag;
          }
          __name(baseIsRegExp, "baseIsRegExp");
          function baseIsSet(value) {
            return isObjectLike(value) && getTag(value) == setTag;
          }
          __name(baseIsSet, "baseIsSet");
          function baseIsTypedArray(value) {
            return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
          }
          __name(baseIsTypedArray, "baseIsTypedArray");
          function baseIteratee(value) {
            if (typeof value == "function") {
              return value;
            }
            if (value == null) {
              return identity;
            }
            if (typeof value == "object") {
              return isArray(value) ? baseMatchesProperty(value[0], value[1]) : baseMatches(value);
            }
            return property(value);
          }
          __name(baseIteratee, "baseIteratee");
          function baseKeys(object) {
            if (!isPrototype(object)) {
              return nativeKeys(object);
            }
            var result2 = [];
            for (var key in Object2(object)) {
              if (hasOwnProperty.call(object, key) && key != "constructor") {
                result2.push(key);
              }
            }
            return result2;
          }
          __name(baseKeys, "baseKeys");
          function baseKeysIn(object) {
            if (!isObject(object)) {
              return nativeKeysIn(object);
            }
            var isProto = isPrototype(object), result2 = [];
            for (var key in object) {
              if (!(key == "constructor" && (isProto || !hasOwnProperty.call(object, key)))) {
                result2.push(key);
              }
            }
            return result2;
          }
          __name(baseKeysIn, "baseKeysIn");
          function baseLt(value, other) {
            return value < other;
          }
          __name(baseLt, "baseLt");
          function baseMap(collection, iteratee2) {
            var index = -1, result2 = isArrayLike(collection) ? Array2(collection.length) : [];
            baseEach(collection, function(value, key, collection2) {
              result2[++index] = iteratee2(value, key, collection2);
            });
            return result2;
          }
          __name(baseMap, "baseMap");
          function baseMatches(source) {
            var matchData = getMatchData(source);
            if (matchData.length == 1 && matchData[0][2]) {
              return matchesStrictComparable(matchData[0][0], matchData[0][1]);
            }
            return function(object) {
              return object === source || baseIsMatch(object, source, matchData);
            };
          }
          __name(baseMatches, "baseMatches");
          function baseMatchesProperty(path, srcValue) {
            if (isKey(path) && isStrictComparable(srcValue)) {
              return matchesStrictComparable(toKey(path), srcValue);
            }
            return function(object) {
              var objValue = get(object, path);
              return objValue === undefined2 && objValue === srcValue ? hasIn(object, path) : baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG);
            };
          }
          __name(baseMatchesProperty, "baseMatchesProperty");
          function baseMerge(object, source, srcIndex, customizer, stack) {
            if (object === source) {
              return;
            }
            baseFor(source, function(srcValue, key) {
              stack || (stack = new Stack());
              if (isObject(srcValue)) {
                baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack);
              } else {
                var newValue = customizer ? customizer(safeGet(object, key), srcValue, key + "", object, source, stack) : undefined2;
                if (newValue === undefined2) {
                  newValue = srcValue;
                }
                assignMergeValue(object, key, newValue);
              }
            }, keysIn);
          }
          __name(baseMerge, "baseMerge");
          function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
            var objValue = safeGet(object, key), srcValue = safeGet(source, key), stacked = stack.get(srcValue);
            if (stacked) {
              assignMergeValue(object, key, stacked);
              return;
            }
            var newValue = customizer ? customizer(objValue, srcValue, key + "", object, source, stack) : undefined2;
            var isCommon = newValue === undefined2;
            if (isCommon) {
              var isArr = isArray(srcValue), isBuff = !isArr && isBuffer(srcValue), isTyped = !isArr && !isBuff && isTypedArray(srcValue);
              newValue = srcValue;
              if (isArr || isBuff || isTyped) {
                if (isArray(objValue)) {
                  newValue = objValue;
                } else if (isArrayLikeObject(objValue)) {
                  newValue = copyArray(objValue);
                } else if (isBuff) {
                  isCommon = false;
                  newValue = cloneBuffer(srcValue, true);
                } else if (isTyped) {
                  isCommon = false;
                  newValue = cloneTypedArray(srcValue, true);
                } else {
                  newValue = [];
                }
              } else if (isPlainObject(srcValue) || isArguments(srcValue)) {
                newValue = objValue;
                if (isArguments(objValue)) {
                  newValue = toPlainObject(objValue);
                } else if (!isObject(objValue) || isFunction(objValue)) {
                  newValue = initCloneObject(srcValue);
                }
              } else {
                isCommon = false;
              }
            }
            if (isCommon) {
              stack.set(srcValue, newValue);
              mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
              stack["delete"](srcValue);
            }
            assignMergeValue(object, key, newValue);
          }
          __name(baseMergeDeep, "baseMergeDeep");
          function baseNth(array, n2) {
            var length = array.length;
            if (!length) {
              return;
            }
            n2 += n2 < 0 ? length : 0;
            return isIndex(n2, length) ? array[n2] : undefined2;
          }
          __name(baseNth, "baseNth");
          function baseOrderBy(collection, iteratees, orders) {
            if (iteratees.length) {
              iteratees = arrayMap(iteratees, function(iteratee2) {
                if (isArray(iteratee2)) {
                  return function(value) {
                    return baseGet(value, iteratee2.length === 1 ? iteratee2[0] : iteratee2);
                  };
                }
                return iteratee2;
              });
            } else {
              iteratees = [identity];
            }
            var index = -1;
            iteratees = arrayMap(iteratees, baseUnary(getIteratee()));
            var result2 = baseMap(collection, function(value, key, collection2) {
              var criteria = arrayMap(iteratees, function(iteratee2) {
                return iteratee2(value);
              });
              return { "criteria": criteria, "index": ++index, "value": value };
            });
            return baseSortBy(result2, function(object, other) {
              return compareMultiple(object, other, orders);
            });
          }
          __name(baseOrderBy, "baseOrderBy");
          function basePick(object, paths) {
            return basePickBy(object, paths, function(value, path) {
              return hasIn(object, path);
            });
          }
          __name(basePick, "basePick");
          function basePickBy(object, paths, predicate) {
            var index = -1, length = paths.length, result2 = {};
            while (++index < length) {
              var path = paths[index], value = baseGet(object, path);
              if (predicate(value, path)) {
                baseSet(result2, castPath(path, object), value);
              }
            }
            return result2;
          }
          __name(basePickBy, "basePickBy");
          function basePropertyDeep(path) {
            return function(object) {
              return baseGet(object, path);
            };
          }
          __name(basePropertyDeep, "basePropertyDeep");
          function basePullAll(array, values2, iteratee2, comparator) {
            var indexOf2 = comparator ? baseIndexOfWith : baseIndexOf, index = -1, length = values2.length, seen = array;
            if (array === values2) {
              values2 = copyArray(values2);
            }
            if (iteratee2) {
              seen = arrayMap(array, baseUnary(iteratee2));
            }
            while (++index < length) {
              var fromIndex = 0, value = values2[index], computed = iteratee2 ? iteratee2(value) : value;
              while ((fromIndex = indexOf2(seen, computed, fromIndex, comparator)) > -1) {
                if (seen !== array) {
                  splice.call(seen, fromIndex, 1);
                }
                splice.call(array, fromIndex, 1);
              }
            }
            return array;
          }
          __name(basePullAll, "basePullAll");
          function basePullAt(array, indexes) {
            var length = array ? indexes.length : 0, lastIndex = length - 1;
            while (length--) {
              var index = indexes[length];
              if (length == lastIndex || index !== previous) {
                var previous = index;
                if (isIndex(index)) {
                  splice.call(array, index, 1);
                } else {
                  baseUnset(array, index);
                }
              }
            }
            return array;
          }
          __name(basePullAt, "basePullAt");
          function baseRandom(lower, upper) {
            return lower + nativeFloor(nativeRandom() * (upper - lower + 1));
          }
          __name(baseRandom, "baseRandom");
          function baseRange(start, end, step, fromRight) {
            var index = -1, length = nativeMax(nativeCeil((end - start) / (step || 1)), 0), result2 = Array2(length);
            while (length--) {
              result2[fromRight ? length : ++index] = start;
              start += step;
            }
            return result2;
          }
          __name(baseRange, "baseRange");
          function baseRepeat(string, n2) {
            var result2 = "";
            if (!string || n2 < 1 || n2 > MAX_SAFE_INTEGER) {
              return result2;
            }
            do {
              if (n2 % 2) {
                result2 += string;
              }
              n2 = nativeFloor(n2 / 2);
              if (n2) {
                string += string;
              }
            } while (n2);
            return result2;
          }
          __name(baseRepeat, "baseRepeat");
          function baseRest(func, start) {
            return setToString(overRest(func, start, identity), func + "");
          }
          __name(baseRest, "baseRest");
          function baseSample(collection) {
            return arraySample(values(collection));
          }
          __name(baseSample, "baseSample");
          function baseSampleSize(collection, n2) {
            var array = values(collection);
            return shuffleSelf(array, baseClamp(n2, 0, array.length));
          }
          __name(baseSampleSize, "baseSampleSize");
          function baseSet(object, path, value, customizer) {
            if (!isObject(object)) {
              return object;
            }
            path = castPath(path, object);
            var index = -1, length = path.length, lastIndex = length - 1, nested = object;
            while (nested != null && ++index < length) {
              var key = toKey(path[index]), newValue = value;
              if (key === "__proto__" || key === "constructor" || key === "prototype") {
                return object;
              }
              if (index != lastIndex) {
                var objValue = nested[key];
                newValue = customizer ? customizer(objValue, key, nested) : undefined2;
                if (newValue === undefined2) {
                  newValue = isObject(objValue) ? objValue : isIndex(path[index + 1]) ? [] : {};
                }
              }
              assignValue(nested, key, newValue);
              nested = nested[key];
            }
            return object;
          }
          __name(baseSet, "baseSet");
          var baseSetData = !metaMap ? identity : function(func, data) {
            metaMap.set(func, data);
            return func;
          };
          var baseSetToString = !defineProperty ? identity : function(func, string) {
            return defineProperty(func, "toString", {
              "configurable": true,
              "enumerable": false,
              "value": constant(string),
              "writable": true
            });
          };
          function baseShuffle(collection) {
            return shuffleSelf(values(collection));
          }
          __name(baseShuffle, "baseShuffle");
          function baseSlice(array, start, end) {
            var index = -1, length = array.length;
            if (start < 0) {
              start = -start > length ? 0 : length + start;
            }
            end = end > length ? length : end;
            if (end < 0) {
              end += length;
            }
            length = start > end ? 0 : end - start >>> 0;
            start >>>= 0;
            var result2 = Array2(length);
            while (++index < length) {
              result2[index] = array[index + start];
            }
            return result2;
          }
          __name(baseSlice, "baseSlice");
          function baseSome(collection, predicate) {
            var result2;
            baseEach(collection, function(value, index, collection2) {
              result2 = predicate(value, index, collection2);
              return !result2;
            });
            return !!result2;
          }
          __name(baseSome, "baseSome");
          function baseSortedIndex(array, value, retHighest) {
            var low = 0, high = array == null ? low : array.length;
            if (typeof value == "number" && value === value && high <= HALF_MAX_ARRAY_LENGTH) {
              while (low < high) {
                var mid = low + high >>> 1, computed = array[mid];
                if (computed !== null && !isSymbol(computed) && (retHighest ? computed <= value : computed < value)) {
                  low = mid + 1;
                } else {
                  high = mid;
                }
              }
              return high;
            }
            return baseSortedIndexBy(array, value, identity, retHighest);
          }
          __name(baseSortedIndex, "baseSortedIndex");
          function baseSortedIndexBy(array, value, iteratee2, retHighest) {
            var low = 0, high = array == null ? 0 : array.length;
            if (high === 0) {
              return 0;
            }
            value = iteratee2(value);
            var valIsNaN = value !== value, valIsNull = value === null, valIsSymbol = isSymbol(value), valIsUndefined = value === undefined2;
            while (low < high) {
              var mid = nativeFloor((low + high) / 2), computed = iteratee2(array[mid]), othIsDefined = computed !== undefined2, othIsNull = computed === null, othIsReflexive = computed === computed, othIsSymbol = isSymbol(computed);
              if (valIsNaN) {
                var setLow = retHighest || othIsReflexive;
              } else if (valIsUndefined) {
                setLow = othIsReflexive && (retHighest || othIsDefined);
              } else if (valIsNull) {
                setLow = othIsReflexive && othIsDefined && (retHighest || !othIsNull);
              } else if (valIsSymbol) {
                setLow = othIsReflexive && othIsDefined && !othIsNull && (retHighest || !othIsSymbol);
              } else if (othIsNull || othIsSymbol) {
                setLow = false;
              } else {
                setLow = retHighest ? computed <= value : computed < value;
              }
              if (setLow) {
                low = mid + 1;
              } else {
                high = mid;
              }
            }
            return nativeMin(high, MAX_ARRAY_INDEX);
          }
          __name(baseSortedIndexBy, "baseSortedIndexBy");
          function baseSortedUniq(array, iteratee2) {
            var index = -1, length = array.length, resIndex = 0, result2 = [];
            while (++index < length) {
              var value = array[index], computed = iteratee2 ? iteratee2(value) : value;
              if (!index || !eq(computed, seen)) {
                var seen = computed;
                result2[resIndex++] = value === 0 ? 0 : value;
              }
            }
            return result2;
          }
          __name(baseSortedUniq, "baseSortedUniq");
          function baseToNumber(value) {
            if (typeof value == "number") {
              return value;
            }
            if (isSymbol(value)) {
              return NAN;
            }
            return +value;
          }
          __name(baseToNumber, "baseToNumber");
          function baseToString(value) {
            if (typeof value == "string") {
              return value;
            }
            if (isArray(value)) {
              return arrayMap(value, baseToString) + "";
            }
            if (isSymbol(value)) {
              return symbolToString ? symbolToString.call(value) : "";
            }
            var result2 = value + "";
            return result2 == "0" && 1 / value == -INFINITY ? "-0" : result2;
          }
          __name(baseToString, "baseToString");
          function baseUniq(array, iteratee2, comparator) {
            var index = -1, includes2 = arrayIncludes, length = array.length, isCommon = true, result2 = [], seen = result2;
            if (comparator) {
              isCommon = false;
              includes2 = arrayIncludesWith;
            } else if (length >= LARGE_ARRAY_SIZE) {
              var set2 = iteratee2 ? null : createSet(array);
              if (set2) {
                return setToArray(set2);
              }
              isCommon = false;
              includes2 = cacheHas;
              seen = new SetCache();
            } else {
              seen = iteratee2 ? [] : result2;
            }
            outer:
              while (++index < length) {
                var value = array[index], computed = iteratee2 ? iteratee2(value) : value;
                value = comparator || value !== 0 ? value : 0;
                if (isCommon && computed === computed) {
                  var seenIndex = seen.length;
                  while (seenIndex--) {
                    if (seen[seenIndex] === computed) {
                      continue outer;
                    }
                  }
                  if (iteratee2) {
                    seen.push(computed);
                  }
                  result2.push(value);
                } else if (!includes2(seen, computed, comparator)) {
                  if (seen !== result2) {
                    seen.push(computed);
                  }
                  result2.push(value);
                }
              }
            return result2;
          }
          __name(baseUniq, "baseUniq");
          function baseUnset(object, path) {
            path = castPath(path, object);
            object = parent(object, path);
            return object == null || delete object[toKey(last(path))];
          }
          __name(baseUnset, "baseUnset");
          function baseUpdate(object, path, updater, customizer) {
            return baseSet(object, path, updater(baseGet(object, path)), customizer);
          }
          __name(baseUpdate, "baseUpdate");
          function baseWhile(array, predicate, isDrop, fromRight) {
            var length = array.length, index = fromRight ? length : -1;
            while ((fromRight ? index-- : ++index < length) && predicate(array[index], index, array)) {
            }
            return isDrop ? baseSlice(array, fromRight ? 0 : index, fromRight ? index + 1 : length) : baseSlice(array, fromRight ? index + 1 : 0, fromRight ? length : index);
          }
          __name(baseWhile, "baseWhile");
          function baseWrapperValue(value, actions) {
            var result2 = value;
            if (result2 instanceof LazyWrapper) {
              result2 = result2.value();
            }
            return arrayReduce(actions, function(result3, action) {
              return action.func.apply(action.thisArg, arrayPush([result3], action.args));
            }, result2);
          }
          __name(baseWrapperValue, "baseWrapperValue");
          function baseXor(arrays, iteratee2, comparator) {
            var length = arrays.length;
            if (length < 2) {
              return length ? baseUniq(arrays[0]) : [];
            }
            var index = -1, result2 = Array2(length);
            while (++index < length) {
              var array = arrays[index], othIndex = -1;
              while (++othIndex < length) {
                if (othIndex != index) {
                  result2[index] = baseDifference(result2[index] || array, arrays[othIndex], iteratee2, comparator);
                }
              }
            }
            return baseUniq(baseFlatten(result2, 1), iteratee2, comparator);
          }
          __name(baseXor, "baseXor");
          function baseZipObject(props, values2, assignFunc) {
            var index = -1, length = props.length, valsLength = values2.length, result2 = {};
            while (++index < length) {
              var value = index < valsLength ? values2[index] : undefined2;
              assignFunc(result2, props[index], value);
            }
            return result2;
          }
          __name(baseZipObject, "baseZipObject");
          function castArrayLikeObject(value) {
            return isArrayLikeObject(value) ? value : [];
          }
          __name(castArrayLikeObject, "castArrayLikeObject");
          function castFunction(value) {
            return typeof value == "function" ? value : identity;
          }
          __name(castFunction, "castFunction");
          function castPath(value, object) {
            if (isArray(value)) {
              return value;
            }
            return isKey(value, object) ? [value] : stringToPath(toString(value));
          }
          __name(castPath, "castPath");
          var castRest = baseRest;
          function castSlice(array, start, end) {
            var length = array.length;
            end = end === undefined2 ? length : end;
            return !start && end >= length ? array : baseSlice(array, start, end);
          }
          __name(castSlice, "castSlice");
          var clearTimeout2 = ctxClearTimeout || function(id) {
            return root.clearTimeout(id);
          };
          function cloneBuffer(buffer, isDeep) {
            if (isDeep) {
              return buffer.slice();
            }
            var length = buffer.length, result2 = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);
            buffer.copy(result2);
            return result2;
          }
          __name(cloneBuffer, "cloneBuffer");
          function cloneArrayBuffer(arrayBuffer) {
            var result2 = new arrayBuffer.constructor(arrayBuffer.byteLength);
            new Uint8Array2(result2).set(new Uint8Array2(arrayBuffer));
            return result2;
          }
          __name(cloneArrayBuffer, "cloneArrayBuffer");
          function cloneDataView(dataView, isDeep) {
            var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
            return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
          }
          __name(cloneDataView, "cloneDataView");
          function cloneRegExp(regexp) {
            var result2 = new regexp.constructor(regexp.source, reFlags.exec(regexp));
            result2.lastIndex = regexp.lastIndex;
            return result2;
          }
          __name(cloneRegExp, "cloneRegExp");
          function cloneSymbol(symbol) {
            return symbolValueOf ? Object2(symbolValueOf.call(symbol)) : {};
          }
          __name(cloneSymbol, "cloneSymbol");
          function cloneTypedArray(typedArray, isDeep) {
            var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
            return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
          }
          __name(cloneTypedArray, "cloneTypedArray");
          function compareAscending(value, other) {
            if (value !== other) {
              var valIsDefined = value !== undefined2, valIsNull = value === null, valIsReflexive = value === value, valIsSymbol = isSymbol(value);
              var othIsDefined = other !== undefined2, othIsNull = other === null, othIsReflexive = other === other, othIsSymbol = isSymbol(other);
              if (!othIsNull && !othIsSymbol && !valIsSymbol && value > other || valIsSymbol && othIsDefined && othIsReflexive && !othIsNull && !othIsSymbol || valIsNull && othIsDefined && othIsReflexive || !valIsDefined && othIsReflexive || !valIsReflexive) {
                return 1;
              }
              if (!valIsNull && !valIsSymbol && !othIsSymbol && value < other || othIsSymbol && valIsDefined && valIsReflexive && !valIsNull && !valIsSymbol || othIsNull && valIsDefined && valIsReflexive || !othIsDefined && valIsReflexive || !othIsReflexive) {
                return -1;
              }
            }
            return 0;
          }
          __name(compareAscending, "compareAscending");
          function compareMultiple(object, other, orders) {
            var index = -1, objCriteria = object.criteria, othCriteria = other.criteria, length = objCriteria.length, ordersLength = orders.length;
            while (++index < length) {
              var result2 = compareAscending(objCriteria[index], othCriteria[index]);
              if (result2) {
                if (index >= ordersLength) {
                  return result2;
                }
                var order = orders[index];
                return result2 * (order == "desc" ? -1 : 1);
              }
            }
            return object.index - other.index;
          }
          __name(compareMultiple, "compareMultiple");
          function composeArgs(args, partials, holders, isCurried) {
            var argsIndex = -1, argsLength = args.length, holdersLength = holders.length, leftIndex = -1, leftLength = partials.length, rangeLength = nativeMax(argsLength - holdersLength, 0), result2 = Array2(leftLength + rangeLength), isUncurried = !isCurried;
            while (++leftIndex < leftLength) {
              result2[leftIndex] = partials[leftIndex];
            }
            while (++argsIndex < holdersLength) {
              if (isUncurried || argsIndex < argsLength) {
                result2[holders[argsIndex]] = args[argsIndex];
              }
            }
            while (rangeLength--) {
              result2[leftIndex++] = args[argsIndex++];
            }
            return result2;
          }
          __name(composeArgs, "composeArgs");
          function composeArgsRight(args, partials, holders, isCurried) {
            var argsIndex = -1, argsLength = args.length, holdersIndex = -1, holdersLength = holders.length, rightIndex = -1, rightLength = partials.length, rangeLength = nativeMax(argsLength - holdersLength, 0), result2 = Array2(rangeLength + rightLength), isUncurried = !isCurried;
            while (++argsIndex < rangeLength) {
              result2[argsIndex] = args[argsIndex];
            }
            var offset = argsIndex;
            while (++rightIndex < rightLength) {
              result2[offset + rightIndex] = partials[rightIndex];
            }
            while (++holdersIndex < holdersLength) {
              if (isUncurried || argsIndex < argsLength) {
                result2[offset + holders[holdersIndex]] = args[argsIndex++];
              }
            }
            return result2;
          }
          __name(composeArgsRight, "composeArgsRight");
          function copyArray(source, array) {
            var index = -1, length = source.length;
            array || (array = Array2(length));
            while (++index < length) {
              array[index] = source[index];
            }
            return array;
          }
          __name(copyArray, "copyArray");
          function copyObject(source, props, object, customizer) {
            var isNew = !object;
            object || (object = {});
            var index = -1, length = props.length;
            while (++index < length) {
              var key = props[index];
              var newValue = customizer ? customizer(object[key], source[key], key, object, source) : undefined2;
              if (newValue === undefined2) {
                newValue = source[key];
              }
              if (isNew) {
                baseAssignValue(object, key, newValue);
              } else {
                assignValue(object, key, newValue);
              }
            }
            return object;
          }
          __name(copyObject, "copyObject");
          function copySymbols(source, object) {
            return copyObject(source, getSymbols(source), object);
          }
          __name(copySymbols, "copySymbols");
          function copySymbolsIn(source, object) {
            return copyObject(source, getSymbolsIn(source), object);
          }
          __name(copySymbolsIn, "copySymbolsIn");
          function createAggregator(setter, initializer) {
            return function(collection, iteratee2) {
              var func = isArray(collection) ? arrayAggregator : baseAggregator, accumulator = initializer ? initializer() : {};
              return func(collection, setter, getIteratee(iteratee2, 2), accumulator);
            };
          }
          __name(createAggregator, "createAggregator");
          function createAssigner(assigner) {
            return baseRest(function(object, sources) {
              var index = -1, length = sources.length, customizer = length > 1 ? sources[length - 1] : undefined2, guard = length > 2 ? sources[2] : undefined2;
              customizer = assigner.length > 3 && typeof customizer == "function" ? (length--, customizer) : undefined2;
              if (guard && isIterateeCall(sources[0], sources[1], guard)) {
                customizer = length < 3 ? undefined2 : customizer;
                length = 1;
              }
              object = Object2(object);
              while (++index < length) {
                var source = sources[index];
                if (source) {
                  assigner(object, source, index, customizer);
                }
              }
              return object;
            });
          }
          __name(createAssigner, "createAssigner");
          function createBaseEach(eachFunc, fromRight) {
            return function(collection, iteratee2) {
              if (collection == null) {
                return collection;
              }
              if (!isArrayLike(collection)) {
                return eachFunc(collection, iteratee2);
              }
              var length = collection.length, index = fromRight ? length : -1, iterable = Object2(collection);
              while (fromRight ? index-- : ++index < length) {
                if (iteratee2(iterable[index], index, iterable) === false) {
                  break;
                }
              }
              return collection;
            };
          }
          __name(createBaseEach, "createBaseEach");
          function createBaseFor(fromRight) {
            return function(object, iteratee2, keysFunc) {
              var index = -1, iterable = Object2(object), props = keysFunc(object), length = props.length;
              while (length--) {
                var key = props[fromRight ? length : ++index];
                if (iteratee2(iterable[key], key, iterable) === false) {
                  break;
                }
              }
              return object;
            };
          }
          __name(createBaseFor, "createBaseFor");
          function createBind(func, bitmask, thisArg) {
            var isBind = bitmask & WRAP_BIND_FLAG, Ctor = createCtor(func);
            function wrapper() {
              var fn = this && this !== root && this instanceof wrapper ? Ctor : func;
              return fn.apply(isBind ? thisArg : this, arguments);
            }
            __name(wrapper, "wrapper");
            return wrapper;
          }
          __name(createBind, "createBind");
          function createCaseFirst(methodName) {
            return function(string) {
              string = toString(string);
              var strSymbols = hasUnicode(string) ? stringToArray(string) : undefined2;
              var chr = strSymbols ? strSymbols[0] : string.charAt(0);
              var trailing = strSymbols ? castSlice(strSymbols, 1).join("") : string.slice(1);
              return chr[methodName]() + trailing;
            };
          }
          __name(createCaseFirst, "createCaseFirst");
          function createCompounder(callback) {
            return function(string) {
              return arrayReduce(words(deburr(string).replace(reApos, "")), callback, "");
            };
          }
          __name(createCompounder, "createCompounder");
          function createCtor(Ctor) {
            return function() {
              var args = arguments;
              switch (args.length) {
                case 0:
                  return new Ctor();
                case 1:
                  return new Ctor(args[0]);
                case 2:
                  return new Ctor(args[0], args[1]);
                case 3:
                  return new Ctor(args[0], args[1], args[2]);
                case 4:
                  return new Ctor(args[0], args[1], args[2], args[3]);
                case 5:
                  return new Ctor(args[0], args[1], args[2], args[3], args[4]);
                case 6:
                  return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5]);
                case 7:
                  return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5], args[6]);
              }
              var thisBinding = baseCreate(Ctor.prototype), result2 = Ctor.apply(thisBinding, args);
              return isObject(result2) ? result2 : thisBinding;
            };
          }
          __name(createCtor, "createCtor");
          function createCurry(func, bitmask, arity) {
            var Ctor = createCtor(func);
            function wrapper() {
              var length = arguments.length, args = Array2(length), index = length, placeholder = getHolder(wrapper);
              while (index--) {
                args[index] = arguments[index];
              }
              var holders = length < 3 && args[0] !== placeholder && args[length - 1] !== placeholder ? [] : replaceHolders(args, placeholder);
              length -= holders.length;
              if (length < arity) {
                return createRecurry(
                  func,
                  bitmask,
                  createHybrid,
                  wrapper.placeholder,
                  undefined2,
                  args,
                  holders,
                  undefined2,
                  undefined2,
                  arity - length
                );
              }
              var fn = this && this !== root && this instanceof wrapper ? Ctor : func;
              return apply(fn, this, args);
            }
            __name(wrapper, "wrapper");
            return wrapper;
          }
          __name(createCurry, "createCurry");
          function createFind(findIndexFunc) {
            return function(collection, predicate, fromIndex) {
              var iterable = Object2(collection);
              if (!isArrayLike(collection)) {
                var iteratee2 = getIteratee(predicate, 3);
                collection = keys(collection);
                predicate = /* @__PURE__ */ __name(function(key) {
                  return iteratee2(iterable[key], key, iterable);
                }, "predicate");
              }
              var index = findIndexFunc(collection, predicate, fromIndex);
              return index > -1 ? iterable[iteratee2 ? collection[index] : index] : undefined2;
            };
          }
          __name(createFind, "createFind");
          function createFlow(fromRight) {
            return flatRest(function(funcs) {
              var length = funcs.length, index = length, prereq = LodashWrapper.prototype.thru;
              if (fromRight) {
                funcs.reverse();
              }
              while (index--) {
                var func = funcs[index];
                if (typeof func != "function") {
                  throw new TypeError2(FUNC_ERROR_TEXT);
                }
                if (prereq && !wrapper && getFuncName(func) == "wrapper") {
                  var wrapper = new LodashWrapper([], true);
                }
              }
              index = wrapper ? index : length;
              while (++index < length) {
                func = funcs[index];
                var funcName = getFuncName(func), data = funcName == "wrapper" ? getData(func) : undefined2;
                if (data && isLaziable(data[0]) && data[1] == (WRAP_ARY_FLAG | WRAP_CURRY_FLAG | WRAP_PARTIAL_FLAG | WRAP_REARG_FLAG) && !data[4].length && data[9] == 1) {
                  wrapper = wrapper[getFuncName(data[0])].apply(wrapper, data[3]);
                } else {
                  wrapper = func.length == 1 && isLaziable(func) ? wrapper[funcName]() : wrapper.thru(func);
                }
              }
              return function() {
                var args = arguments, value = args[0];
                if (wrapper && args.length == 1 && isArray(value)) {
                  return wrapper.plant(value).value();
                }
                var index2 = 0, result2 = length ? funcs[index2].apply(this, args) : value;
                while (++index2 < length) {
                  result2 = funcs[index2].call(this, result2);
                }
                return result2;
              };
            });
          }
          __name(createFlow, "createFlow");
          function createHybrid(func, bitmask, thisArg, partials, holders, partialsRight, holdersRight, argPos, ary2, arity) {
            var isAry = bitmask & WRAP_ARY_FLAG, isBind = bitmask & WRAP_BIND_FLAG, isBindKey = bitmask & WRAP_BIND_KEY_FLAG, isCurried = bitmask & (WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG), isFlip = bitmask & WRAP_FLIP_FLAG, Ctor = isBindKey ? undefined2 : createCtor(func);
            function wrapper() {
              var length = arguments.length, args = Array2(length), index = length;
              while (index--) {
                args[index] = arguments[index];
              }
              if (isCurried) {
                var placeholder = getHolder(wrapper), holdersCount = countHolders(args, placeholder);
              }
              if (partials) {
                args = composeArgs(args, partials, holders, isCurried);
              }
              if (partialsRight) {
                args = composeArgsRight(args, partialsRight, holdersRight, isCurried);
              }
              length -= holdersCount;
              if (isCurried && length < arity) {
                var newHolders = replaceHolders(args, placeholder);
                return createRecurry(
                  func,
                  bitmask,
                  createHybrid,
                  wrapper.placeholder,
                  thisArg,
                  args,
                  newHolders,
                  argPos,
                  ary2,
                  arity - length
                );
              }
              var thisBinding = isBind ? thisArg : this, fn = isBindKey ? thisBinding[func] : func;
              length = args.length;
              if (argPos) {
                args = reorder(args, argPos);
              } else if (isFlip && length > 1) {
                args.reverse();
              }
              if (isAry && ary2 < length) {
                args.length = ary2;
              }
              if (this && this !== root && this instanceof wrapper) {
                fn = Ctor || createCtor(fn);
              }
              return fn.apply(thisBinding, args);
            }
            __name(wrapper, "wrapper");
            return wrapper;
          }
          __name(createHybrid, "createHybrid");
          function createInverter(setter, toIteratee) {
            return function(object, iteratee2) {
              return baseInverter(object, setter, toIteratee(iteratee2), {});
            };
          }
          __name(createInverter, "createInverter");
          function createMathOperation(operator, defaultValue) {
            return function(value, other) {
              var result2;
              if (value === undefined2 && other === undefined2) {
                return defaultValue;
              }
              if (value !== undefined2) {
                result2 = value;
              }
              if (other !== undefined2) {
                if (result2 === undefined2) {
                  return other;
                }
                if (typeof value == "string" || typeof other == "string") {
                  value = baseToString(value);
                  other = baseToString(other);
                } else {
                  value = baseToNumber(value);
                  other = baseToNumber(other);
                }
                result2 = operator(value, other);
              }
              return result2;
            };
          }
          __name(createMathOperation, "createMathOperation");
          function createOver(arrayFunc) {
            return flatRest(function(iteratees) {
              iteratees = arrayMap(iteratees, baseUnary(getIteratee()));
              return baseRest(function(args) {
                var thisArg = this;
                return arrayFunc(iteratees, function(iteratee2) {
                  return apply(iteratee2, thisArg, args);
                });
              });
            });
          }
          __name(createOver, "createOver");
          function createPadding(length, chars) {
            chars = chars === undefined2 ? " " : baseToString(chars);
            var charsLength = chars.length;
            if (charsLength < 2) {
              return charsLength ? baseRepeat(chars, length) : chars;
            }
            var result2 = baseRepeat(chars, nativeCeil(length / stringSize(chars)));
            return hasUnicode(chars) ? castSlice(stringToArray(result2), 0, length).join("") : result2.slice(0, length);
          }
          __name(createPadding, "createPadding");
          function createPartial(func, bitmask, thisArg, partials) {
            var isBind = bitmask & WRAP_BIND_FLAG, Ctor = createCtor(func);
            function wrapper() {
              var argsIndex = -1, argsLength = arguments.length, leftIndex = -1, leftLength = partials.length, args = Array2(leftLength + argsLength), fn = this && this !== root && this instanceof wrapper ? Ctor : func;
              while (++leftIndex < leftLength) {
                args[leftIndex] = partials[leftIndex];
              }
              while (argsLength--) {
                args[leftIndex++] = arguments[++argsIndex];
              }
              return apply(fn, isBind ? thisArg : this, args);
            }
            __name(wrapper, "wrapper");
            return wrapper;
          }
          __name(createPartial, "createPartial");
          function createRange(fromRight) {
            return function(start, end, step) {
              if (step && typeof step != "number" && isIterateeCall(start, end, step)) {
                end = step = undefined2;
              }
              start = toFinite(start);
              if (end === undefined2) {
                end = start;
                start = 0;
              } else {
                end = toFinite(end);
              }
              step = step === undefined2 ? start < end ? 1 : -1 : toFinite(step);
              return baseRange(start, end, step, fromRight);
            };
          }
          __name(createRange, "createRange");
          function createRelationalOperation(operator) {
            return function(value, other) {
              if (!(typeof value == "string" && typeof other == "string")) {
                value = toNumber(value);
                other = toNumber(other);
              }
              return operator(value, other);
            };
          }
          __name(createRelationalOperation, "createRelationalOperation");
          function createRecurry(func, bitmask, wrapFunc, placeholder, thisArg, partials, holders, argPos, ary2, arity) {
            var isCurry = bitmask & WRAP_CURRY_FLAG, newHolders = isCurry ? holders : undefined2, newHoldersRight = isCurry ? undefined2 : holders, newPartials = isCurry ? partials : undefined2, newPartialsRight = isCurry ? undefined2 : partials;
            bitmask |= isCurry ? WRAP_PARTIAL_FLAG : WRAP_PARTIAL_RIGHT_FLAG;
            bitmask &= ~(isCurry ? WRAP_PARTIAL_RIGHT_FLAG : WRAP_PARTIAL_FLAG);
            if (!(bitmask & WRAP_CURRY_BOUND_FLAG)) {
              bitmask &= ~(WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG);
            }
            var newData = [
              func,
              bitmask,
              thisArg,
              newPartials,
              newHolders,
              newPartialsRight,
              newHoldersRight,
              argPos,
              ary2,
              arity
            ];
            var result2 = wrapFunc.apply(undefined2, newData);
            if (isLaziable(func)) {
              setData(result2, newData);
            }
            result2.placeholder = placeholder;
            return setWrapToString(result2, func, bitmask);
          }
          __name(createRecurry, "createRecurry");
          function createRound(methodName) {
            var func = Math2[methodName];
            return function(number, precision) {
              number = toNumber(number);
              precision = precision == null ? 0 : nativeMin(toInteger(precision), 292);
              if (precision && nativeIsFinite(number)) {
                var pair = (toString(number) + "e").split("e"), value = func(pair[0] + "e" + (+pair[1] + precision));
                pair = (toString(value) + "e").split("e");
                return +(pair[0] + "e" + (+pair[1] - precision));
              }
              return func(number);
            };
          }
          __name(createRound, "createRound");
          var createSet = !(Set2 && 1 / setToArray(new Set2([, -0]))[1] == INFINITY) ? noop : function(values2) {
            return new Set2(values2);
          };
          function createToPairs(keysFunc) {
            return function(object) {
              var tag = getTag(object);
              if (tag == mapTag) {
                return mapToArray(object);
              }
              if (tag == setTag) {
                return setToPairs(object);
              }
              return baseToPairs(object, keysFunc(object));
            };
          }
          __name(createToPairs, "createToPairs");
          function createWrap(func, bitmask, thisArg, partials, holders, argPos, ary2, arity) {
            var isBindKey = bitmask & WRAP_BIND_KEY_FLAG;
            if (!isBindKey && typeof func != "function") {
              throw new TypeError2(FUNC_ERROR_TEXT);
            }
            var length = partials ? partials.length : 0;
            if (!length) {
              bitmask &= ~(WRAP_PARTIAL_FLAG | WRAP_PARTIAL_RIGHT_FLAG);
              partials = holders = undefined2;
            }
            ary2 = ary2 === undefined2 ? ary2 : nativeMax(toInteger(ary2), 0);
            arity = arity === undefined2 ? arity : toInteger(arity);
            length -= holders ? holders.length : 0;
            if (bitmask & WRAP_PARTIAL_RIGHT_FLAG) {
              var partialsRight = partials, holdersRight = holders;
              partials = holders = undefined2;
            }
            var data = isBindKey ? undefined2 : getData(func);
            var newData = [
              func,
              bitmask,
              thisArg,
              partials,
              holders,
              partialsRight,
              holdersRight,
              argPos,
              ary2,
              arity
            ];
            if (data) {
              mergeData(newData, data);
            }
            func = newData[0];
            bitmask = newData[1];
            thisArg = newData[2];
            partials = newData[3];
            holders = newData[4];
            arity = newData[9] = newData[9] === undefined2 ? isBindKey ? 0 : func.length : nativeMax(newData[9] - length, 0);
            if (!arity && bitmask & (WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG)) {
              bitmask &= ~(WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG);
            }
            if (!bitmask || bitmask == WRAP_BIND_FLAG) {
              var result2 = createBind(func, bitmask, thisArg);
            } else if (bitmask == WRAP_CURRY_FLAG || bitmask == WRAP_CURRY_RIGHT_FLAG) {
              result2 = createCurry(func, bitmask, arity);
            } else if ((bitmask == WRAP_PARTIAL_FLAG || bitmask == (WRAP_BIND_FLAG | WRAP_PARTIAL_FLAG)) && !holders.length) {
              result2 = createPartial(func, bitmask, thisArg, partials);
            } else {
              result2 = createHybrid.apply(undefined2, newData);
            }
            var setter = data ? baseSetData : setData;
            return setWrapToString(setter(result2, newData), func, bitmask);
          }
          __name(createWrap, "createWrap");
          function customDefaultsAssignIn(objValue, srcValue, key, object) {
            if (objValue === undefined2 || eq(objValue, objectProto[key]) && !hasOwnProperty.call(object, key)) {
              return srcValue;
            }
            return objValue;
          }
          __name(customDefaultsAssignIn, "customDefaultsAssignIn");
          function customDefaultsMerge(objValue, srcValue, key, object, source, stack) {
            if (isObject(objValue) && isObject(srcValue)) {
              stack.set(srcValue, objValue);
              baseMerge(objValue, srcValue, undefined2, customDefaultsMerge, stack);
              stack["delete"](srcValue);
            }
            return objValue;
          }
          __name(customDefaultsMerge, "customDefaultsMerge");
          function customOmitClone(value) {
            return isPlainObject(value) ? undefined2 : value;
          }
          __name(customOmitClone, "customOmitClone");
          function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
            var isPartial = bitmask & COMPARE_PARTIAL_FLAG, arrLength = array.length, othLength = other.length;
            if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
              return false;
            }
            var arrStacked = stack.get(array);
            var othStacked = stack.get(other);
            if (arrStacked && othStacked) {
              return arrStacked == other && othStacked == array;
            }
            var index = -1, result2 = true, seen = bitmask & COMPARE_UNORDERED_FLAG ? new SetCache() : undefined2;
            stack.set(array, other);
            stack.set(other, array);
            while (++index < arrLength) {
              var arrValue = array[index], othValue = other[index];
              if (customizer) {
                var compared = isPartial ? customizer(othValue, arrValue, index, other, array, stack) : customizer(arrValue, othValue, index, array, other, stack);
              }
              if (compared !== undefined2) {
                if (compared) {
                  continue;
                }
                result2 = false;
                break;
              }
              if (seen) {
                if (!arraySome(other, function(othValue2, othIndex) {
                  if (!cacheHas(seen, othIndex) && (arrValue === othValue2 || equalFunc(arrValue, othValue2, bitmask, customizer, stack))) {
                    return seen.push(othIndex);
                  }
                })) {
                  result2 = false;
                  break;
                }
              } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
                result2 = false;
                break;
              }
            }
            stack["delete"](array);
            stack["delete"](other);
            return result2;
          }
          __name(equalArrays, "equalArrays");
          function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
            switch (tag) {
              case dataViewTag:
                if (object.byteLength != other.byteLength || object.byteOffset != other.byteOffset) {
                  return false;
                }
                object = object.buffer;
                other = other.buffer;
              case arrayBufferTag:
                if (object.byteLength != other.byteLength || !equalFunc(new Uint8Array2(object), new Uint8Array2(other))) {
                  return false;
                }
                return true;
              case boolTag:
              case dateTag:
              case numberTag:
                return eq(+object, +other);
              case errorTag:
                return object.name == other.name && object.message == other.message;
              case regexpTag:
              case stringTag:
                return object == other + "";
              case mapTag:
                var convert = mapToArray;
              case setTag:
                var isPartial = bitmask & COMPARE_PARTIAL_FLAG;
                convert || (convert = setToArray);
                if (object.size != other.size && !isPartial) {
                  return false;
                }
                var stacked = stack.get(object);
                if (stacked) {
                  return stacked == other;
                }
                bitmask |= COMPARE_UNORDERED_FLAG;
                stack.set(object, other);
                var result2 = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
                stack["delete"](object);
                return result2;
              case symbolTag:
                if (symbolValueOf) {
                  return symbolValueOf.call(object) == symbolValueOf.call(other);
                }
            }
            return false;
          }
          __name(equalByTag, "equalByTag");
          function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
            var isPartial = bitmask & COMPARE_PARTIAL_FLAG, objProps = getAllKeys(object), objLength = objProps.length, othProps = getAllKeys(other), othLength = othProps.length;
            if (objLength != othLength && !isPartial) {
              return false;
            }
            var index = objLength;
            while (index--) {
              var key = objProps[index];
              if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
                return false;
              }
            }
            var objStacked = stack.get(object);
            var othStacked = stack.get(other);
            if (objStacked && othStacked) {
              return objStacked == other && othStacked == object;
            }
            var result2 = true;
            stack.set(object, other);
            stack.set(other, object);
            var skipCtor = isPartial;
            while (++index < objLength) {
              key = objProps[index];
              var objValue = object[key], othValue = other[key];
              if (customizer) {
                var compared = isPartial ? customizer(othValue, objValue, key, other, object, stack) : customizer(objValue, othValue, key, object, other, stack);
              }
              if (!(compared === undefined2 ? objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack) : compared)) {
                result2 = false;
                break;
              }
              skipCtor || (skipCtor = key == "constructor");
            }
            if (result2 && !skipCtor) {
              var objCtor = object.constructor, othCtor = other.constructor;
              if (objCtor != othCtor && ("constructor" in object && "constructor" in other) && !(typeof objCtor == "function" && objCtor instanceof objCtor && typeof othCtor == "function" && othCtor instanceof othCtor)) {
                result2 = false;
              }
            }
            stack["delete"](object);
            stack["delete"](other);
            return result2;
          }
          __name(equalObjects, "equalObjects");
          function flatRest(func) {
            return setToString(overRest(func, undefined2, flatten), func + "");
          }
          __name(flatRest, "flatRest");
          function getAllKeys(object) {
            return baseGetAllKeys(object, keys, getSymbols);
          }
          __name(getAllKeys, "getAllKeys");
          function getAllKeysIn(object) {
            return baseGetAllKeys(object, keysIn, getSymbolsIn);
          }
          __name(getAllKeysIn, "getAllKeysIn");
          var getData = !metaMap ? noop : function(func) {
            return metaMap.get(func);
          };
          function getFuncName(func) {
            var result2 = func.name + "", array = realNames[result2], length = hasOwnProperty.call(realNames, result2) ? array.length : 0;
            while (length--) {
              var data = array[length], otherFunc = data.func;
              if (otherFunc == null || otherFunc == func) {
                return data.name;
              }
            }
            return result2;
          }
          __name(getFuncName, "getFuncName");
          function getHolder(func) {
            var object = hasOwnProperty.call(lodash, "placeholder") ? lodash : func;
            return object.placeholder;
          }
          __name(getHolder, "getHolder");
          function getIteratee() {
            var result2 = lodash.iteratee || iteratee;
            result2 = result2 === iteratee ? baseIteratee : result2;
            return arguments.length ? result2(arguments[0], arguments[1]) : result2;
          }
          __name(getIteratee, "getIteratee");
          function getMapData(map2, key) {
            var data = map2.__data__;
            return isKeyable(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
          }
          __name(getMapData, "getMapData");
          function getMatchData(object) {
            var result2 = keys(object), length = result2.length;
            while (length--) {
              var key = result2[length], value = object[key];
              result2[length] = [key, value, isStrictComparable(value)];
            }
            return result2;
          }
          __name(getMatchData, "getMatchData");
          function getNative(object, key) {
            var value = getValue(object, key);
            return baseIsNative(value) ? value : undefined2;
          }
          __name(getNative, "getNative");
          function getRawTag(value) {
            var isOwn = hasOwnProperty.call(value, symToStringTag), tag = value[symToStringTag];
            try {
              value[symToStringTag] = undefined2;
              var unmasked = true;
            } catch (e3) {
            }
            var result2 = nativeObjectToString.call(value);
            if (unmasked) {
              if (isOwn) {
                value[symToStringTag] = tag;
              } else {
                delete value[symToStringTag];
              }
            }
            return result2;
          }
          __name(getRawTag, "getRawTag");
          var getSymbols = !nativeGetSymbols ? stubArray : function(object) {
            if (object == null) {
              return [];
            }
            object = Object2(object);
            return arrayFilter(nativeGetSymbols(object), function(symbol) {
              return propertyIsEnumerable.call(object, symbol);
            });
          };
          var getSymbolsIn = !nativeGetSymbols ? stubArray : function(object) {
            var result2 = [];
            while (object) {
              arrayPush(result2, getSymbols(object));
              object = getPrototype(object);
            }
            return result2;
          };
          var getTag = baseGetTag;
          if (DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag || Map2 && getTag(new Map2()) != mapTag || Promise2 && getTag(Promise2.resolve()) != promiseTag || Set2 && getTag(new Set2()) != setTag || WeakMap2 && getTag(new WeakMap2()) != weakMapTag) {
            getTag = /* @__PURE__ */ __name(function(value) {
              var result2 = baseGetTag(value), Ctor = result2 == objectTag ? value.constructor : undefined2, ctorString = Ctor ? toSource(Ctor) : "";
              if (ctorString) {
                switch (ctorString) {
                  case dataViewCtorString:
                    return dataViewTag;
                  case mapCtorString:
                    return mapTag;
                  case promiseCtorString:
                    return promiseTag;
                  case setCtorString:
                    return setTag;
                  case weakMapCtorString:
                    return weakMapTag;
                }
              }
              return result2;
            }, "getTag");
          }
          function getView(start, end, transforms) {
            var index = -1, length = transforms.length;
            while (++index < length) {
              var data = transforms[index], size2 = data.size;
              switch (data.type) {
                case "drop":
                  start += size2;
                  break;
                case "dropRight":
                  end -= size2;
                  break;
                case "take":
                  end = nativeMin(end, start + size2);
                  break;
                case "takeRight":
                  start = nativeMax(start, end - size2);
                  break;
              }
            }
            return { "start": start, "end": end };
          }
          __name(getView, "getView");
          function getWrapDetails(source) {
            var match = source.match(reWrapDetails);
            return match ? match[1].split(reSplitDetails) : [];
          }
          __name(getWrapDetails, "getWrapDetails");
          function hasPath(object, path, hasFunc) {
            path = castPath(path, object);
            var index = -1, length = path.length, result2 = false;
            while (++index < length) {
              var key = toKey(path[index]);
              if (!(result2 = object != null && hasFunc(object, key))) {
                break;
              }
              object = object[key];
            }
            if (result2 || ++index != length) {
              return result2;
            }
            length = object == null ? 0 : object.length;
            return !!length && isLength(length) && isIndex(key, length) && (isArray(object) || isArguments(object));
          }
          __name(hasPath, "hasPath");
          function initCloneArray(array) {
            var length = array.length, result2 = new array.constructor(length);
            if (length && typeof array[0] == "string" && hasOwnProperty.call(array, "index")) {
              result2.index = array.index;
              result2.input = array.input;
            }
            return result2;
          }
          __name(initCloneArray, "initCloneArray");
          function initCloneObject(object) {
            return typeof object.constructor == "function" && !isPrototype(object) ? baseCreate(getPrototype(object)) : {};
          }
          __name(initCloneObject, "initCloneObject");
          function initCloneByTag(object, tag, isDeep) {
            var Ctor = object.constructor;
            switch (tag) {
              case arrayBufferTag:
                return cloneArrayBuffer(object);
              case boolTag:
              case dateTag:
                return new Ctor(+object);
              case dataViewTag:
                return cloneDataView(object, isDeep);
              case float32Tag:
              case float64Tag:
              case int8Tag:
              case int16Tag:
              case int32Tag:
              case uint8Tag:
              case uint8ClampedTag:
              case uint16Tag:
              case uint32Tag:
                return cloneTypedArray(object, isDeep);
              case mapTag:
                return new Ctor();
              case numberTag:
              case stringTag:
                return new Ctor(object);
              case regexpTag:
                return cloneRegExp(object);
              case setTag:
                return new Ctor();
              case symbolTag:
                return cloneSymbol(object);
            }
          }
          __name(initCloneByTag, "initCloneByTag");
          function insertWrapDetails(source, details) {
            var length = details.length;
            if (!length) {
              return source;
            }
            var lastIndex = length - 1;
            details[lastIndex] = (length > 1 ? "& " : "") + details[lastIndex];
            details = details.join(length > 2 ? ", " : " ");
            return source.replace(reWrapComment, "{\\n/* [wrapped with " + details + "] */\\n");
          }
          __name(insertWrapDetails, "insertWrapDetails");
          function isFlattenable(value) {
            return isArray(value) || isArguments(value) || !!(spreadableSymbol && value && value[spreadableSymbol]);
          }
          __name(isFlattenable, "isFlattenable");
          function isIndex(value, length) {
            var type = typeof value;
            length = length == null ? MAX_SAFE_INTEGER : length;
            return !!length && (type == "number" || type != "symbol" && reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length);
          }
          __name(isIndex, "isIndex");
          function isIterateeCall(value, index, object) {
            if (!isObject(object)) {
              return false;
            }
            var type = typeof index;
            if (type == "number" ? isArrayLike(object) && isIndex(index, object.length) : type == "string" && index in object) {
              return eq(object[index], value);
            }
            return false;
          }
          __name(isIterateeCall, "isIterateeCall");
          function isKey(value, object) {
            if (isArray(value)) {
              return false;
            }
            var type = typeof value;
            if (type == "number" || type == "symbol" || type == "boolean" || value == null || isSymbol(value)) {
              return true;
            }
            return reIsPlainProp.test(value) || !reIsDeepProp.test(value) || object != null && value in Object2(object);
          }
          __name(isKey, "isKey");
          function isKeyable(value) {
            var type = typeof value;
            return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
          }
          __name(isKeyable, "isKeyable");
          function isLaziable(func) {
            var funcName = getFuncName(func), other = lodash[funcName];
            if (typeof other != "function" || !(funcName in LazyWrapper.prototype)) {
              return false;
            }
            if (func === other) {
              return true;
            }
            var data = getData(other);
            return !!data && func === data[0];
          }
          __name(isLaziable, "isLaziable");
          function isMasked(func) {
            return !!maskSrcKey && maskSrcKey in func;
          }
          __name(isMasked, "isMasked");
          var isMaskable = coreJsData ? isFunction : stubFalse;
          function isPrototype(value) {
            var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto;
            return value === proto;
          }
          __name(isPrototype, "isPrototype");
          function isStrictComparable(value) {
            return value === value && !isObject(value);
          }
          __name(isStrictComparable, "isStrictComparable");
          function matchesStrictComparable(key, srcValue) {
            return function(object) {
              if (object == null) {
                return false;
              }
              return object[key] === srcValue && (srcValue !== undefined2 || key in Object2(object));
            };
          }
          __name(matchesStrictComparable, "matchesStrictComparable");
          function memoizeCapped(func) {
            var result2 = memoize(func, function(key) {
              if (cache4.size === MAX_MEMOIZE_SIZE) {
                cache4.clear();
              }
              return key;
            });
            var cache4 = result2.cache;
            return result2;
          }
          __name(memoizeCapped, "memoizeCapped");
          function mergeData(data, source) {
            var bitmask = data[1], srcBitmask = source[1], newBitmask = bitmask | srcBitmask, isCommon = newBitmask < (WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG | WRAP_ARY_FLAG);
            var isCombo = srcBitmask == WRAP_ARY_FLAG && bitmask == WRAP_CURRY_FLAG || srcBitmask == WRAP_ARY_FLAG && bitmask == WRAP_REARG_FLAG && data[7].length <= source[8] || srcBitmask == (WRAP_ARY_FLAG | WRAP_REARG_FLAG) && source[7].length <= source[8] && bitmask == WRAP_CURRY_FLAG;
            if (!(isCommon || isCombo)) {
              return data;
            }
            if (srcBitmask & WRAP_BIND_FLAG) {
              data[2] = source[2];
              newBitmask |= bitmask & WRAP_BIND_FLAG ? 0 : WRAP_CURRY_BOUND_FLAG;
            }
            var value = source[3];
            if (value) {
              var partials = data[3];
              data[3] = partials ? composeArgs(partials, value, source[4]) : value;
              data[4] = partials ? replaceHolders(data[3], PLACEHOLDER) : source[4];
            }
            value = source[5];
            if (value) {
              partials = data[5];
              data[5] = partials ? composeArgsRight(partials, value, source[6]) : value;
              data[6] = partials ? replaceHolders(data[5], PLACEHOLDER) : source[6];
            }
            value = source[7];
            if (value) {
              data[7] = value;
            }
            if (srcBitmask & WRAP_ARY_FLAG) {
              data[8] = data[8] == null ? source[8] : nativeMin(data[8], source[8]);
            }
            if (data[9] == null) {
              data[9] = source[9];
            }
            data[0] = source[0];
            data[1] = newBitmask;
            return data;
          }
          __name(mergeData, "mergeData");
          function nativeKeysIn(object) {
            var result2 = [];
            if (object != null) {
              for (var key in Object2(object)) {
                result2.push(key);
              }
            }
            return result2;
          }
          __name(nativeKeysIn, "nativeKeysIn");
          function objectToString(value) {
            return nativeObjectToString.call(value);
          }
          __name(objectToString, "objectToString");
          function overRest(func, start, transform2) {
            start = nativeMax(start === undefined2 ? func.length - 1 : start, 0);
            return function() {
              var args = arguments, index = -1, length = nativeMax(args.length - start, 0), array = Array2(length);
              while (++index < length) {
                array[index] = args[start + index];
              }
              index = -1;
              var otherArgs = Array2(start + 1);
              while (++index < start) {
                otherArgs[index] = args[index];
              }
              otherArgs[start] = transform2(array);
              return apply(func, this, otherArgs);
            };
          }
          __name(overRest, "overRest");
          function parent(object, path) {
            return path.length < 2 ? object : baseGet(object, baseSlice(path, 0, -1));
          }
          __name(parent, "parent");
          function reorder(array, indexes) {
            var arrLength = array.length, length = nativeMin(indexes.length, arrLength), oldArray = copyArray(array);
            while (length--) {
              var index = indexes[length];
              array[length] = isIndex(index, arrLength) ? oldArray[index] : undefined2;
            }
            return array;
          }
          __name(reorder, "reorder");
          function safeGet(object, key) {
            if (key === "constructor" && typeof object[key] === "function") {
              return;
            }
            if (key == "__proto__") {
              return;
            }
            return object[key];
          }
          __name(safeGet, "safeGet");
          var setData = shortOut(baseSetData);
          var setTimeout2 = ctxSetTimeout || function(func, wait) {
            return root.setTimeout(func, wait);
          };
          var setToString = shortOut(baseSetToString);
          function setWrapToString(wrapper, reference, bitmask) {
            var source = reference + "";
            return setToString(wrapper, insertWrapDetails(source, updateWrapDetails(getWrapDetails(source), bitmask)));
          }
          __name(setWrapToString, "setWrapToString");
          function shortOut(func) {
            var count = 0, lastCalled = 0;
            return function() {
              var stamp = nativeNow(), remaining = HOT_SPAN - (stamp - lastCalled);
              lastCalled = stamp;
              if (remaining > 0) {
                if (++count >= HOT_COUNT) {
                  return arguments[0];
                }
              } else {
                count = 0;
              }
              return func.apply(undefined2, arguments);
            };
          }
          __name(shortOut, "shortOut");
          function shuffleSelf(array, size2) {
            var index = -1, length = array.length, lastIndex = length - 1;
            size2 = size2 === undefined2 ? length : size2;
            while (++index < size2) {
              var rand = baseRandom(index, lastIndex), value = array[rand];
              array[rand] = array[index];
              array[index] = value;
            }
            array.length = size2;
            return array;
          }
          __name(shuffleSelf, "shuffleSelf");
          var stringToPath = memoizeCapped(function(string) {
            var result2 = [];
            if (string.charCodeAt(0) === 46) {
              result2.push("");
            }
            string.replace(rePropName, function(match, number, quote, subString) {
              result2.push(quote ? subString.replace(reEscapeChar, "$1") : number || match);
            });
            return result2;
          });
          function toKey(value) {
            if (typeof value == "string" || isSymbol(value)) {
              return value;
            }
            var result2 = value + "";
            return result2 == "0" && 1 / value == -INFINITY ? "-0" : result2;
          }
          __name(toKey, "toKey");
          function toSource(func) {
            if (func != null) {
              try {
                return funcToString.call(func);
              } catch (e3) {
              }
              try {
                return func + "";
              } catch (e3) {
              }
            }
            return "";
          }
          __name(toSource, "toSource");
          function updateWrapDetails(details, bitmask) {
            arrayEach(wrapFlags, function(pair) {
              var value = "_." + pair[0];
              if (bitmask & pair[1] && !arrayIncludes(details, value)) {
                details.push(value);
              }
            });
            return details.sort();
          }
          __name(updateWrapDetails, "updateWrapDetails");
          function wrapperClone(wrapper) {
            if (wrapper instanceof LazyWrapper) {
              return wrapper.clone();
            }
            var result2 = new LodashWrapper(wrapper.__wrapped__, wrapper.__chain__);
            result2.__actions__ = copyArray(wrapper.__actions__);
            result2.__index__ = wrapper.__index__;
            result2.__values__ = wrapper.__values__;
            return result2;
          }
          __name(wrapperClone, "wrapperClone");
          function chunk(array, size2, guard) {
            if (guard ? isIterateeCall(array, size2, guard) : size2 === undefined2) {
              size2 = 1;
            } else {
              size2 = nativeMax(toInteger(size2), 0);
            }
            var length = array == null ? 0 : array.length;
            if (!length || size2 < 1) {
              return [];
            }
            var index = 0, resIndex = 0, result2 = Array2(nativeCeil(length / size2));
            while (index < length) {
              result2[resIndex++] = baseSlice(array, index, index += size2);
            }
            return result2;
          }
          __name(chunk, "chunk");
          function compact(array) {
            var index = -1, length = array == null ? 0 : array.length, resIndex = 0, result2 = [];
            while (++index < length) {
              var value = array[index];
              if (value) {
                result2[resIndex++] = value;
              }
            }
            return result2;
          }
          __name(compact, "compact");
          function concat() {
            var length = arguments.length;
            if (!length) {
              return [];
            }
            var args = Array2(length - 1), array = arguments[0], index = length;
            while (index--) {
              args[index - 1] = arguments[index];
            }
            return arrayPush(isArray(array) ? copyArray(array) : [array], baseFlatten(args, 1));
          }
          __name(concat, "concat");
          var difference = baseRest(function(array, values2) {
            return isArrayLikeObject(array) ? baseDifference(array, baseFlatten(values2, 1, isArrayLikeObject, true)) : [];
          });
          var differenceBy = baseRest(function(array, values2) {
            var iteratee2 = last(values2);
            if (isArrayLikeObject(iteratee2)) {
              iteratee2 = undefined2;
            }
            return isArrayLikeObject(array) ? baseDifference(array, baseFlatten(values2, 1, isArrayLikeObject, true), getIteratee(iteratee2, 2)) : [];
          });
          var differenceWith = baseRest(function(array, values2) {
            var comparator = last(values2);
            if (isArrayLikeObject(comparator)) {
              comparator = undefined2;
            }
            return isArrayLikeObject(array) ? baseDifference(array, baseFlatten(values2, 1, isArrayLikeObject, true), undefined2, comparator) : [];
          });
          function drop(array, n2, guard) {
            var length = array == null ? 0 : array.length;
            if (!length) {
              return [];
            }
            n2 = guard || n2 === undefined2 ? 1 : toInteger(n2);
            return baseSlice(array, n2 < 0 ? 0 : n2, length);
          }
          __name(drop, "drop");
          function dropRight(array, n2, guard) {
            var length = array == null ? 0 : array.length;
            if (!length) {
              return [];
            }
            n2 = guard || n2 === undefined2 ? 1 : toInteger(n2);
            n2 = length - n2;
            return baseSlice(array, 0, n2 < 0 ? 0 : n2);
          }
          __name(dropRight, "dropRight");
          function dropRightWhile(array, predicate) {
            return array && array.length ? baseWhile(array, getIteratee(predicate, 3), true, true) : [];
          }
          __name(dropRightWhile, "dropRightWhile");
          function dropWhile(array, predicate) {
            return array && array.length ? baseWhile(array, getIteratee(predicate, 3), true) : [];
          }
          __name(dropWhile, "dropWhile");
          function fill(array, value, start, end) {
            var length = array == null ? 0 : array.length;
            if (!length) {
              return [];
            }
            if (start && typeof start != "number" && isIterateeCall(array, value, start)) {
              start = 0;
              end = length;
            }
            return baseFill(array, value, start, end);
          }
          __name(fill, "fill");
          function findIndex(array, predicate, fromIndex) {
            var length = array == null ? 0 : array.length;
            if (!length) {
              return -1;
            }
            var index = fromIndex == null ? 0 : toInteger(fromIndex);
            if (index < 0) {
              index = nativeMax(length + index, 0);
            }
            return baseFindIndex(array, getIteratee(predicate, 3), index);
          }
          __name(findIndex, "findIndex");
          function findLastIndex(array, predicate, fromIndex) {
            var length = array == null ? 0 : array.length;
            if (!length) {
              return -1;
            }
            var index = length - 1;
            if (fromIndex !== undefined2) {
              index = toInteger(fromIndex);
              index = fromIndex < 0 ? nativeMax(length + index, 0) : nativeMin(index, length - 1);
            }
            return baseFindIndex(array, getIteratee(predicate, 3), index, true);
          }
          __name(findLastIndex, "findLastIndex");
          function flatten(array) {
            var length = array == null ? 0 : array.length;
            return length ? baseFlatten(array, 1) : [];
          }
          __name(flatten, "flatten");
          function flattenDeep(array) {
            var length = array == null ? 0 : array.length;
            return length ? baseFlatten(array, INFINITY) : [];
          }
          __name(flattenDeep, "flattenDeep");
          function flattenDepth(array, depth) {
            var length = array == null ? 0 : array.length;
            if (!length) {
              return [];
            }
            depth = depth === undefined2 ? 1 : toInteger(depth);
            return baseFlatten(array, depth);
          }
          __name(flattenDepth, "flattenDepth");
          function fromPairs(pairs) {
            var index = -1, length = pairs == null ? 0 : pairs.length, result2 = {};
            while (++index < length) {
              var pair = pairs[index];
              result2[pair[0]] = pair[1];
            }
            return result2;
          }
          __name(fromPairs, "fromPairs");
          function head(array) {
            return array && array.length ? array[0] : undefined2;
          }
          __name(head, "head");
          function indexOf(array, value, fromIndex) {
            var length = array == null ? 0 : array.length;
            if (!length) {
              return -1;
            }
            var index = fromIndex == null ? 0 : toInteger(fromIndex);
            if (index < 0) {
              index = nativeMax(length + index, 0);
            }
            return baseIndexOf(array, value, index);
          }
          __name(indexOf, "indexOf");
          function initial(array) {
            var length = array == null ? 0 : array.length;
            return length ? baseSlice(array, 0, -1) : [];
          }
          __name(initial, "initial");
          var intersection = baseRest(function(arrays) {
            var mapped = arrayMap(arrays, castArrayLikeObject);
            return mapped.length && mapped[0] === arrays[0] ? baseIntersection(mapped) : [];
          });
          var intersectionBy = baseRest(function(arrays) {
            var iteratee2 = last(arrays), mapped = arrayMap(arrays, castArrayLikeObject);
            if (iteratee2 === last(mapped)) {
              iteratee2 = undefined2;
            } else {
              mapped.pop();
            }
            return mapped.length && mapped[0] === arrays[0] ? baseIntersection(mapped, getIteratee(iteratee2, 2)) : [];
          });
          var intersectionWith = baseRest(function(arrays) {
            var comparator = last(arrays), mapped = arrayMap(arrays, castArrayLikeObject);
            comparator = typeof comparator == "function" ? comparator : undefined2;
            if (comparator) {
              mapped.pop();
            }
            return mapped.length && mapped[0] === arrays[0] ? baseIntersection(mapped, undefined2, comparator) : [];
          });
          function join(array, separator) {
            return array == null ? "" : nativeJoin.call(array, separator);
          }
          __name(join, "join");
          function last(array) {
            var length = array == null ? 0 : array.length;
            return length ? array[length - 1] : undefined2;
          }
          __name(last, "last");
          function lastIndexOf(array, value, fromIndex) {
            var length = array == null ? 0 : array.length;
            if (!length) {
              return -1;
            }
            var index = length;
            if (fromIndex !== undefined2) {
              index = toInteger(fromIndex);
              index = index < 0 ? nativeMax(length + index, 0) : nativeMin(index, length - 1);
            }
            return value === value ? strictLastIndexOf(array, value, index) : baseFindIndex(array, baseIsNaN, index, true);
          }
          __name(lastIndexOf, "lastIndexOf");
          function nth(array, n2) {
            return array && array.length ? baseNth(array, toInteger(n2)) : undefined2;
          }
          __name(nth, "nth");
          var pull = baseRest(pullAll);
          function pullAll(array, values2) {
            return array && array.length && values2 && values2.length ? basePullAll(array, values2) : array;
          }
          __name(pullAll, "pullAll");
          function pullAllBy(array, values2, iteratee2) {
            return array && array.length && values2 && values2.length ? basePullAll(array, values2, getIteratee(iteratee2, 2)) : array;
          }
          __name(pullAllBy, "pullAllBy");
          function pullAllWith(array, values2, comparator) {
            return array && array.length && values2 && values2.length ? basePullAll(array, values2, undefined2, comparator) : array;
          }
          __name(pullAllWith, "pullAllWith");
          var pullAt = flatRest(function(array, indexes) {
            var length = array == null ? 0 : array.length, result2 = baseAt(array, indexes);
            basePullAt(array, arrayMap(indexes, function(index) {
              return isIndex(index, length) ? +index : index;
            }).sort(compareAscending));
            return result2;
          });
          function remove(array, predicate) {
            var result2 = [];
            if (!(array && array.length)) {
              return result2;
            }
            var index = -1, indexes = [], length = array.length;
            predicate = getIteratee(predicate, 3);
            while (++index < length) {
              var value = array[index];
              if (predicate(value, index, array)) {
                result2.push(value);
                indexes.push(index);
              }
            }
            basePullAt(array, indexes);
            return result2;
          }
          __name(remove, "remove");
          function reverse(array) {
            return array == null ? array : nativeReverse.call(array);
          }
          __name(reverse, "reverse");
          function slice(array, start, end) {
            var length = array == null ? 0 : array.length;
            if (!length) {
              return [];
            }
            if (end && typeof end != "number" && isIterateeCall(array, start, end)) {
              start = 0;
              end = length;
            } else {
              start = start == null ? 0 : toInteger(start);
              end = end === undefined2 ? length : toInteger(end);
            }
            return baseSlice(array, start, end);
          }
          __name(slice, "slice");
          function sortedIndex(array, value) {
            return baseSortedIndex(array, value);
          }
          __name(sortedIndex, "sortedIndex");
          function sortedIndexBy(array, value, iteratee2) {
            return baseSortedIndexBy(array, value, getIteratee(iteratee2, 2));
          }
          __name(sortedIndexBy, "sortedIndexBy");
          function sortedIndexOf(array, value) {
            var length = array == null ? 0 : array.length;
            if (length) {
              var index = baseSortedIndex(array, value);
              if (index < length && eq(array[index], value)) {
                return index;
              }
            }
            return -1;
          }
          __name(sortedIndexOf, "sortedIndexOf");
          function sortedLastIndex(array, value) {
            return baseSortedIndex(array, value, true);
          }
          __name(sortedLastIndex, "sortedLastIndex");
          function sortedLastIndexBy(array, value, iteratee2) {
            return baseSortedIndexBy(array, value, getIteratee(iteratee2, 2), true);
          }
          __name(sortedLastIndexBy, "sortedLastIndexBy");
          function sortedLastIndexOf(array, value) {
            var length = array == null ? 0 : array.length;
            if (length) {
              var index = baseSortedIndex(array, value, true) - 1;
              if (eq(array[index], value)) {
                return index;
              }
            }
            return -1;
          }
          __name(sortedLastIndexOf, "sortedLastIndexOf");
          function sortedUniq(array) {
            return array && array.length ? baseSortedUniq(array) : [];
          }
          __name(sortedUniq, "sortedUniq");
          function sortedUniqBy(array, iteratee2) {
            return array && array.length ? baseSortedUniq(array, getIteratee(iteratee2, 2)) : [];
          }
          __name(sortedUniqBy, "sortedUniqBy");
          function tail(array) {
            var length = array == null ? 0 : array.length;
            return length ? baseSlice(array, 1, length) : [];
          }
          __name(tail, "tail");
          function take(array, n2, guard) {
            if (!(array && array.length)) {
              return [];
            }
            n2 = guard || n2 === undefined2 ? 1 : toInteger(n2);
            return baseSlice(array, 0, n2 < 0 ? 0 : n2);
          }
          __name(take, "take");
          function takeRight(array, n2, guard) {
            var length = array == null ? 0 : array.length;
            if (!length) {
              return [];
            }
            n2 = guard || n2 === undefined2 ? 1 : toInteger(n2);
            n2 = length - n2;
            return baseSlice(array, n2 < 0 ? 0 : n2, length);
          }
          __name(takeRight, "takeRight");
          function takeRightWhile(array, predicate) {
            return array && array.length ? baseWhile(array, getIteratee(predicate, 3), false, true) : [];
          }
          __name(takeRightWhile, "takeRightWhile");
          function takeWhile(array, predicate) {
            return array && array.length ? baseWhile(array, getIteratee(predicate, 3)) : [];
          }
          __name(takeWhile, "takeWhile");
          var union = baseRest(function(arrays) {
            return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true));
          });
          var unionBy = baseRest(function(arrays) {
            var iteratee2 = last(arrays);
            if (isArrayLikeObject(iteratee2)) {
              iteratee2 = undefined2;
            }
            return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true), getIteratee(iteratee2, 2));
          });
          var unionWith = baseRest(function(arrays) {
            var comparator = last(arrays);
            comparator = typeof comparator == "function" ? comparator : undefined2;
            return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true), undefined2, comparator);
          });
          function uniq(array) {
            return array && array.length ? baseUniq(array) : [];
          }
          __name(uniq, "uniq");
          function uniqBy(array, iteratee2) {
            return array && array.length ? baseUniq(array, getIteratee(iteratee2, 2)) : [];
          }
          __name(uniqBy, "uniqBy");
          function uniqWith(array, comparator) {
            comparator = typeof comparator == "function" ? comparator : undefined2;
            return array && array.length ? baseUniq(array, undefined2, comparator) : [];
          }
          __name(uniqWith, "uniqWith");
          function unzip(array) {
            if (!(array && array.length)) {
              return [];
            }
            var length = 0;
            array = arrayFilter(array, function(group) {
              if (isArrayLikeObject(group)) {
                length = nativeMax(group.length, length);
                return true;
              }
            });
            return baseTimes(length, function(index) {
              return arrayMap(array, baseProperty(index));
            });
          }
          __name(unzip, "unzip");
          function unzipWith(array, iteratee2) {
            if (!(array && array.length)) {
              return [];
            }
            var result2 = unzip(array);
            if (iteratee2 == null) {
              return result2;
            }
            return arrayMap(result2, function(group) {
              return apply(iteratee2, undefined2, group);
            });
          }
          __name(unzipWith, "unzipWith");
          var without = baseRest(function(array, values2) {
            return isArrayLikeObject(array) ? baseDifference(array, values2) : [];
          });
          var xor = baseRest(function(arrays) {
            return baseXor(arrayFilter(arrays, isArrayLikeObject));
          });
          var xorBy = baseRest(function(arrays) {
            var iteratee2 = last(arrays);
            if (isArrayLikeObject(iteratee2)) {
              iteratee2 = undefined2;
            }
            return baseXor(arrayFilter(arrays, isArrayLikeObject), getIteratee(iteratee2, 2));
          });
          var xorWith = baseRest(function(arrays) {
            var comparator = last(arrays);
            comparator = typeof comparator == "function" ? comparator : undefined2;
            return baseXor(arrayFilter(arrays, isArrayLikeObject), undefined2, comparator);
          });
          var zip = baseRest(unzip);
          function zipObject(props, values2) {
            return baseZipObject(props || [], values2 || [], assignValue);
          }
          __name(zipObject, "zipObject");
          function zipObjectDeep(props, values2) {
            return baseZipObject(props || [], values2 || [], baseSet);
          }
          __name(zipObjectDeep, "zipObjectDeep");
          var zipWith = baseRest(function(arrays) {
            var length = arrays.length, iteratee2 = length > 1 ? arrays[length - 1] : undefined2;
            iteratee2 = typeof iteratee2 == "function" ? (arrays.pop(), iteratee2) : undefined2;
            return unzipWith(arrays, iteratee2);
          });
          function chain(value) {
            var result2 = lodash(value);
            result2.__chain__ = true;
            return result2;
          }
          __name(chain, "chain");
          function tap(value, interceptor) {
            interceptor(value);
            return value;
          }
          __name(tap, "tap");
          function thru(value, interceptor) {
            return interceptor(value);
          }
          __name(thru, "thru");
          var wrapperAt = flatRest(function(paths) {
            var length = paths.length, start = length ? paths[0] : 0, value = this.__wrapped__, interceptor = /* @__PURE__ */ __name(function(object) {
              return baseAt(object, paths);
            }, "interceptor");
            if (length > 1 || this.__actions__.length || !(value instanceof LazyWrapper) || !isIndex(start)) {
              return this.thru(interceptor);
            }
            value = value.slice(start, +start + (length ? 1 : 0));
            value.__actions__.push({
              "func": thru,
              "args": [interceptor],
              "thisArg": undefined2
            });
            return new LodashWrapper(value, this.__chain__).thru(function(array) {
              if (length && !array.length) {
                array.push(undefined2);
              }
              return array;
            });
          });
          function wrapperChain() {
            return chain(this);
          }
          __name(wrapperChain, "wrapperChain");
          function wrapperCommit() {
            return new LodashWrapper(this.value(), this.__chain__);
          }
          __name(wrapperCommit, "wrapperCommit");
          function wrapperNext() {
            if (this.__values__ === undefined2) {
              this.__values__ = toArray(this.value());
            }
            var done = this.__index__ >= this.__values__.length, value = done ? undefined2 : this.__values__[this.__index__++];
            return { "done": done, "value": value };
          }
          __name(wrapperNext, "wrapperNext");
          function wrapperToIterator() {
            return this;
          }
          __name(wrapperToIterator, "wrapperToIterator");
          function wrapperPlant(value) {
            var result2, parent2 = this;
            while (parent2 instanceof baseLodash) {
              var clone2 = wrapperClone(parent2);
              clone2.__index__ = 0;
              clone2.__values__ = undefined2;
              if (result2) {
                previous.__wrapped__ = clone2;
              } else {
                result2 = clone2;
              }
              var previous = clone2;
              parent2 = parent2.__wrapped__;
            }
            previous.__wrapped__ = value;
            return result2;
          }
          __name(wrapperPlant, "wrapperPlant");
          function wrapperReverse() {
            var value = this.__wrapped__;
            if (value instanceof LazyWrapper) {
              var wrapped = value;
              if (this.__actions__.length) {
                wrapped = new LazyWrapper(this);
              }
              wrapped = wrapped.reverse();
              wrapped.__actions__.push({
                "func": thru,
                "args": [reverse],
                "thisArg": undefined2
              });
              return new LodashWrapper(wrapped, this.__chain__);
            }
            return this.thru(reverse);
          }
          __name(wrapperReverse, "wrapperReverse");
          function wrapperValue() {
            return baseWrapperValue(this.__wrapped__, this.__actions__);
          }
          __name(wrapperValue, "wrapperValue");
          var countBy = createAggregator(function(result2, value, key) {
            if (hasOwnProperty.call(result2, key)) {
              ++result2[key];
            } else {
              baseAssignValue(result2, key, 1);
            }
          });
          function every(collection, predicate, guard) {
            var func = isArray(collection) ? arrayEvery : baseEvery;
            if (guard && isIterateeCall(collection, predicate, guard)) {
              predicate = undefined2;
            }
            return func(collection, getIteratee(predicate, 3));
          }
          __name(every, "every");
          function filter(collection, predicate) {
            var func = isArray(collection) ? arrayFilter : baseFilter;
            return func(collection, getIteratee(predicate, 3));
          }
          __name(filter, "filter");
          var find = createFind(findIndex);
          var findLast = createFind(findLastIndex);
          function flatMap(collection, iteratee2) {
            return baseFlatten(map(collection, iteratee2), 1);
          }
          __name(flatMap, "flatMap");
          function flatMapDeep(collection, iteratee2) {
            return baseFlatten(map(collection, iteratee2), INFINITY);
          }
          __name(flatMapDeep, "flatMapDeep");
          function flatMapDepth(collection, iteratee2, depth) {
            depth = depth === undefined2 ? 1 : toInteger(depth);
            return baseFlatten(map(collection, iteratee2), depth);
          }
          __name(flatMapDepth, "flatMapDepth");
          function forEach(collection, iteratee2) {
            var func = isArray(collection) ? arrayEach : baseEach;
            return func(collection, getIteratee(iteratee2, 3));
          }
          __name(forEach, "forEach");
          function forEachRight(collection, iteratee2) {
            var func = isArray(collection) ? arrayEachRight : baseEachRight;
            return func(collection, getIteratee(iteratee2, 3));
          }
          __name(forEachRight, "forEachRight");
          var groupBy = createAggregator(function(result2, value, key) {
            if (hasOwnProperty.call(result2, key)) {
              result2[key].push(value);
            } else {
              baseAssignValue(result2, key, [value]);
            }
          });
          function includes(collection, value, fromIndex, guard) {
            collection = isArrayLike(collection) ? collection : values(collection);
            fromIndex = fromIndex && !guard ? toInteger(fromIndex) : 0;
            var length = collection.length;
            if (fromIndex < 0) {
              fromIndex = nativeMax(length + fromIndex, 0);
            }
            return isString(collection) ? fromIndex <= length && collection.indexOf(value, fromIndex) > -1 : !!length && baseIndexOf(collection, value, fromIndex) > -1;
          }
          __name(includes, "includes");
          var invokeMap = baseRest(function(collection, path, args) {
            var index = -1, isFunc = typeof path == "function", result2 = isArrayLike(collection) ? Array2(collection.length) : [];
            baseEach(collection, function(value) {
              result2[++index] = isFunc ? apply(path, value, args) : baseInvoke(value, path, args);
            });
            return result2;
          });
          var keyBy = createAggregator(function(result2, value, key) {
            baseAssignValue(result2, key, value);
          });
          function map(collection, iteratee2) {
            var func = isArray(collection) ? arrayMap : baseMap;
            return func(collection, getIteratee(iteratee2, 3));
          }
          __name(map, "map");
          function orderBy(collection, iteratees, orders, guard) {
            if (collection == null) {
              return [];
            }
            if (!isArray(iteratees)) {
              iteratees = iteratees == null ? [] : [iteratees];
            }
            orders = guard ? undefined2 : orders;
            if (!isArray(orders)) {
              orders = orders == null ? [] : [orders];
            }
            return baseOrderBy(collection, iteratees, orders);
          }
          __name(orderBy, "orderBy");
          var partition = createAggregator(function(result2, value, key) {
            result2[key ? 0 : 1].push(value);
          }, function() {
            return [[], []];
          });
          function reduce(collection, iteratee2, accumulator) {
            var func = isArray(collection) ? arrayReduce : baseReduce, initAccum = arguments.length < 3;
            return func(collection, getIteratee(iteratee2, 4), accumulator, initAccum, baseEach);
          }
          __name(reduce, "reduce");
          function reduceRight(collection, iteratee2, accumulator) {
            var func = isArray(collection) ? arrayReduceRight : baseReduce, initAccum = arguments.length < 3;
            return func(collection, getIteratee(iteratee2, 4), accumulator, initAccum, baseEachRight);
          }
          __name(reduceRight, "reduceRight");
          function reject(collection, predicate) {
            var func = isArray(collection) ? arrayFilter : baseFilter;
            return func(collection, negate(getIteratee(predicate, 3)));
          }
          __name(reject, "reject");
          function sample(collection) {
            var func = isArray(collection) ? arraySample : baseSample;
            return func(collection);
          }
          __name(sample, "sample");
          function sampleSize(collection, n2, guard) {
            if (guard ? isIterateeCall(collection, n2, guard) : n2 === undefined2) {
              n2 = 1;
            } else {
              n2 = toInteger(n2);
            }
            var func = isArray(collection) ? arraySampleSize : baseSampleSize;
            return func(collection, n2);
          }
          __name(sampleSize, "sampleSize");
          function shuffle(collection) {
            var func = isArray(collection) ? arrayShuffle : baseShuffle;
            return func(collection);
          }
          __name(shuffle, "shuffle");
          function size(collection) {
            if (collection == null) {
              return 0;
            }
            if (isArrayLike(collection)) {
              return isString(collection) ? stringSize(collection) : collection.length;
            }
            var tag = getTag(collection);
            if (tag == mapTag || tag == setTag) {
              return collection.size;
            }
            return baseKeys(collection).length;
          }
          __name(size, "size");
          function some(collection, predicate, guard) {
            var func = isArray(collection) ? arraySome : baseSome;
            if (guard && isIterateeCall(collection, predicate, guard)) {
              predicate = undefined2;
            }
            return func(collection, getIteratee(predicate, 3));
          }
          __name(some, "some");
          var sortBy = baseRest(function(collection, iteratees) {
            if (collection == null) {
              return [];
            }
            var length = iteratees.length;
            if (length > 1 && isIterateeCall(collection, iteratees[0], iteratees[1])) {
              iteratees = [];
            } else if (length > 2 && isIterateeCall(iteratees[0], iteratees[1], iteratees[2])) {
              iteratees = [iteratees[0]];
            }
            return baseOrderBy(collection, baseFlatten(iteratees, 1), []);
          });
          var now = ctxNow || function() {
            return root.Date.now();
          };
          function after(n2, func) {
            if (typeof func != "function") {
              throw new TypeError2(FUNC_ERROR_TEXT);
            }
            n2 = toInteger(n2);
            return function() {
              if (--n2 < 1) {
                return func.apply(this, arguments);
              }
            };
          }
          __name(after, "after");
          function ary(func, n2, guard) {
            n2 = guard ? undefined2 : n2;
            n2 = func && n2 == null ? func.length : n2;
            return createWrap(func, WRAP_ARY_FLAG, undefined2, undefined2, undefined2, undefined2, n2);
          }
          __name(ary, "ary");
          function before(n2, func) {
            var result2;
            if (typeof func != "function") {
              throw new TypeError2(FUNC_ERROR_TEXT);
            }
            n2 = toInteger(n2);
            return function() {
              if (--n2 > 0) {
                result2 = func.apply(this, arguments);
              }
              if (n2 <= 1) {
                func = undefined2;
              }
              return result2;
            };
          }
          __name(before, "before");
          var bind = baseRest(function(func, thisArg, partials) {
            var bitmask = WRAP_BIND_FLAG;
            if (partials.length) {
              var holders = replaceHolders(partials, getHolder(bind));
              bitmask |= WRAP_PARTIAL_FLAG;
            }
            return createWrap(func, bitmask, thisArg, partials, holders);
          });
          var bindKey = baseRest(function(object, key, partials) {
            var bitmask = WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG;
            if (partials.length) {
              var holders = replaceHolders(partials, getHolder(bindKey));
              bitmask |= WRAP_PARTIAL_FLAG;
            }
            return createWrap(key, bitmask, object, partials, holders);
          });
          function curry(func, arity, guard) {
            arity = guard ? undefined2 : arity;
            var result2 = createWrap(func, WRAP_CURRY_FLAG, undefined2, undefined2, undefined2, undefined2, undefined2, arity);
            result2.placeholder = curry.placeholder;
            return result2;
          }
          __name(curry, "curry");
          function curryRight(func, arity, guard) {
            arity = guard ? undefined2 : arity;
            var result2 = createWrap(func, WRAP_CURRY_RIGHT_FLAG, undefined2, undefined2, undefined2, undefined2, undefined2, arity);
            result2.placeholder = curryRight.placeholder;
            return result2;
          }
          __name(curryRight, "curryRight");
          function debounce(func, wait, options) {
            var lastArgs, lastThis, maxWait, result2, timerId, lastCallTime, lastInvokeTime = 0, leading = false, maxing = false, trailing = true;
            if (typeof func != "function") {
              throw new TypeError2(FUNC_ERROR_TEXT);
            }
            wait = toNumber(wait) || 0;
            if (isObject(options)) {
              leading = !!options.leading;
              maxing = "maxWait" in options;
              maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
              trailing = "trailing" in options ? !!options.trailing : trailing;
            }
            function invokeFunc(time) {
              var args = lastArgs, thisArg = lastThis;
              lastArgs = lastThis = undefined2;
              lastInvokeTime = time;
              result2 = func.apply(thisArg, args);
              return result2;
            }
            __name(invokeFunc, "invokeFunc");
            function leadingEdge(time) {
              lastInvokeTime = time;
              timerId = setTimeout2(timerExpired, wait);
              return leading ? invokeFunc(time) : result2;
            }
            __name(leadingEdge, "leadingEdge");
            function remainingWait(time) {
              var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime, timeWaiting = wait - timeSinceLastCall;
              return maxing ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke) : timeWaiting;
            }
            __name(remainingWait, "remainingWait");
            function shouldInvoke(time) {
              var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime;
              return lastCallTime === undefined2 || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
            }
            __name(shouldInvoke, "shouldInvoke");
            function timerExpired() {
              var time = now();
              if (shouldInvoke(time)) {
                return trailingEdge(time);
              }
              timerId = setTimeout2(timerExpired, remainingWait(time));
            }
            __name(timerExpired, "timerExpired");
            function trailingEdge(time) {
              timerId = undefined2;
              if (trailing && lastArgs) {
                return invokeFunc(time);
              }
              lastArgs = lastThis = undefined2;
              return result2;
            }
            __name(trailingEdge, "trailingEdge");
            function cancel() {
              if (timerId !== undefined2) {
                clearTimeout2(timerId);
              }
              lastInvokeTime = 0;
              lastArgs = lastCallTime = lastThis = timerId = undefined2;
            }
            __name(cancel, "cancel");
            function flush() {
              return timerId === undefined2 ? result2 : trailingEdge(now());
            }
            __name(flush, "flush");
            function debounced() {
              var time = now(), isInvoking = shouldInvoke(time);
              lastArgs = arguments;
              lastThis = this;
              lastCallTime = time;
              if (isInvoking) {
                if (timerId === undefined2) {
                  return leadingEdge(lastCallTime);
                }
                if (maxing) {
                  clearTimeout2(timerId);
                  timerId = setTimeout2(timerExpired, wait);
                  return invokeFunc(lastCallTime);
                }
              }
              if (timerId === undefined2) {
                timerId = setTimeout2(timerExpired, wait);
              }
              return result2;
            }
            __name(debounced, "debounced");
            debounced.cancel = cancel;
            debounced.flush = flush;
            return debounced;
          }
          __name(debounce, "debounce");
          var defer = baseRest(function(func, args) {
            return baseDelay(func, 1, args);
          });
          var delay = baseRest(function(func, wait, args) {
            return baseDelay(func, toNumber(wait) || 0, args);
          });
          function flip(func) {
            return createWrap(func, WRAP_FLIP_FLAG);
          }
          __name(flip, "flip");
          function memoize(func, resolver) {
            if (typeof func != "function" || resolver != null && typeof resolver != "function") {
              throw new TypeError2(FUNC_ERROR_TEXT);
            }
            var memoized = /* @__PURE__ */ __name(function() {
              var args = arguments, key = resolver ? resolver.apply(this, args) : args[0], cache4 = memoized.cache;
              if (cache4.has(key)) {
                return cache4.get(key);
              }
              var result2 = func.apply(this, args);
              memoized.cache = cache4.set(key, result2) || cache4;
              return result2;
            }, "memoized");
            memoized.cache = new (memoize.Cache || MapCache)();
            return memoized;
          }
          __name(memoize, "memoize");
          memoize.Cache = MapCache;
          function negate(predicate) {
            if (typeof predicate != "function") {
              throw new TypeError2(FUNC_ERROR_TEXT);
            }
            return function() {
              var args = arguments;
              switch (args.length) {
                case 0:
                  return !predicate.call(this);
                case 1:
                  return !predicate.call(this, args[0]);
                case 2:
                  return !predicate.call(this, args[0], args[1]);
                case 3:
                  return !predicate.call(this, args[0], args[1], args[2]);
              }
              return !predicate.apply(this, args);
            };
          }
          __name(negate, "negate");
          function once(func) {
            return before(2, func);
          }
          __name(once, "once");
          var overArgs = castRest(function(func, transforms) {
            transforms = transforms.length == 1 && isArray(transforms[0]) ? arrayMap(transforms[0], baseUnary(getIteratee())) : arrayMap(baseFlatten(transforms, 1), baseUnary(getIteratee()));
            var funcsLength = transforms.length;
            return baseRest(function(args) {
              var index = -1, length = nativeMin(args.length, funcsLength);
              while (++index < length) {
                args[index] = transforms[index].call(this, args[index]);
              }
              return apply(func, this, args);
            });
          });
          var partial = baseRest(function(func, partials) {
            var holders = replaceHolders(partials, getHolder(partial));
            return createWrap(func, WRAP_PARTIAL_FLAG, undefined2, partials, holders);
          });
          var partialRight = baseRest(function(func, partials) {
            var holders = replaceHolders(partials, getHolder(partialRight));
            return createWrap(func, WRAP_PARTIAL_RIGHT_FLAG, undefined2, partials, holders);
          });
          var rearg = flatRest(function(func, indexes) {
            return createWrap(func, WRAP_REARG_FLAG, undefined2, undefined2, undefined2, indexes);
          });
          function rest(func, start) {
            if (typeof func != "function") {
              throw new TypeError2(FUNC_ERROR_TEXT);
            }
            start = start === undefined2 ? start : toInteger(start);
            return baseRest(func, start);
          }
          __name(rest, "rest");
          function spread(func, start) {
            if (typeof func != "function") {
              throw new TypeError2(FUNC_ERROR_TEXT);
            }
            start = start == null ? 0 : nativeMax(toInteger(start), 0);
            return baseRest(function(args) {
              var array = args[start], otherArgs = castSlice(args, 0, start);
              if (array) {
                arrayPush(otherArgs, array);
              }
              return apply(func, this, otherArgs);
            });
          }
          __name(spread, "spread");
          function throttle3(func, wait, options) {
            var leading = true, trailing = true;
            if (typeof func != "function") {
              throw new TypeError2(FUNC_ERROR_TEXT);
            }
            if (isObject(options)) {
              leading = "leading" in options ? !!options.leading : leading;
              trailing = "trailing" in options ? !!options.trailing : trailing;
            }
            return debounce(func, wait, {
              "leading": leading,
              "maxWait": wait,
              "trailing": trailing
            });
          }
          __name(throttle3, "throttle");
          function unary(func) {
            return ary(func, 1);
          }
          __name(unary, "unary");
          function wrap(value, wrapper) {
            return partial(castFunction(wrapper), value);
          }
          __name(wrap, "wrap");
          function castArray() {
            if (!arguments.length) {
              return [];
            }
            var value = arguments[0];
            return isArray(value) ? value : [value];
          }
          __name(castArray, "castArray");
          function clone(value) {
            return baseClone(value, CLONE_SYMBOLS_FLAG);
          }
          __name(clone, "clone");
          function cloneWith(value, customizer) {
            customizer = typeof customizer == "function" ? customizer : undefined2;
            return baseClone(value, CLONE_SYMBOLS_FLAG, customizer);
          }
          __name(cloneWith, "cloneWith");
          function cloneDeep(value) {
            return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG);
          }
          __name(cloneDeep, "cloneDeep");
          function cloneDeepWith(value, customizer) {
            customizer = typeof customizer == "function" ? customizer : undefined2;
            return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG, customizer);
          }
          __name(cloneDeepWith, "cloneDeepWith");
          function conformsTo(object, source) {
            return source == null || baseConformsTo(object, source, keys(source));
          }
          __name(conformsTo, "conformsTo");
          function eq(value, other) {
            return value === other || value !== value && other !== other;
          }
          __name(eq, "eq");
          var gt = createRelationalOperation(baseGt);
          var gte = createRelationalOperation(function(value, other) {
            return value >= other;
          });
          var isArguments = baseIsArguments(/* @__PURE__ */ function() {
            return arguments;
          }()) ? baseIsArguments : function(value) {
            return isObjectLike(value) && hasOwnProperty.call(value, "callee") && !propertyIsEnumerable.call(value, "callee");
          };
          var isArray = Array2.isArray;
          var isArrayBuffer = nodeIsArrayBuffer ? baseUnary(nodeIsArrayBuffer) : baseIsArrayBuffer;
          function isArrayLike(value) {
            return value != null && isLength(value.length) && !isFunction(value);
          }
          __name(isArrayLike, "isArrayLike");
          function isArrayLikeObject(value) {
            return isObjectLike(value) && isArrayLike(value);
          }
          __name(isArrayLikeObject, "isArrayLikeObject");
          function isBoolean(value) {
            return value === true || value === false || isObjectLike(value) && baseGetTag(value) == boolTag;
          }
          __name(isBoolean, "isBoolean");
          var isBuffer = nativeIsBuffer || stubFalse;
          var isDate = nodeIsDate ? baseUnary(nodeIsDate) : baseIsDate;
          function isElement(value) {
            return isObjectLike(value) && value.nodeType === 1 && !isPlainObject(value);
          }
          __name(isElement, "isElement");
          function isEmpty(value) {
            if (value == null) {
              return true;
            }
            if (isArrayLike(value) && (isArray(value) || typeof value == "string" || typeof value.splice == "function" || isBuffer(value) || isTypedArray(value) || isArguments(value))) {
              return !value.length;
            }
            var tag = getTag(value);
            if (tag == mapTag || tag == setTag) {
              return !value.size;
            }
            if (isPrototype(value)) {
              return !baseKeys(value).length;
            }
            for (var key in value) {
              if (hasOwnProperty.call(value, key)) {
                return false;
              }
            }
            return true;
          }
          __name(isEmpty, "isEmpty");
          function isEqual(value, other) {
            return baseIsEqual(value, other);
          }
          __name(isEqual, "isEqual");
          function isEqualWith(value, other, customizer) {
            customizer = typeof customizer == "function" ? customizer : undefined2;
            var result2 = customizer ? customizer(value, other) : undefined2;
            return result2 === undefined2 ? baseIsEqual(value, other, undefined2, customizer) : !!result2;
          }
          __name(isEqualWith, "isEqualWith");
          function isError(value) {
            if (!isObjectLike(value)) {
              return false;
            }
            var tag = baseGetTag(value);
            return tag == errorTag || tag == domExcTag || typeof value.message == "string" && typeof value.name == "string" && !isPlainObject(value);
          }
          __name(isError, "isError");
          function isFinite2(value) {
            return typeof value == "number" && nativeIsFinite(value);
          }
          __name(isFinite2, "isFinite");
          function isFunction(value) {
            if (!isObject(value)) {
              return false;
            }
            var tag = baseGetTag(value);
            return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
          }
          __name(isFunction, "isFunction");
          function isInteger(value) {
            return typeof value == "number" && value == toInteger(value);
          }
          __name(isInteger, "isInteger");
          function isLength(value) {
            return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
          }
          __name(isLength, "isLength");
          function isObject(value) {
            var type = typeof value;
            return value != null && (type == "object" || type == "function");
          }
          __name(isObject, "isObject");
          function isObjectLike(value) {
            return value != null && typeof value == "object";
          }
          __name(isObjectLike, "isObjectLike");
          var isMap = nodeIsMap ? baseUnary(nodeIsMap) : baseIsMap;
          function isMatch(object, source) {
            return object === source || baseIsMatch(object, source, getMatchData(source));
          }
          __name(isMatch, "isMatch");
          function isMatchWith(object, source, customizer) {
            customizer = typeof customizer == "function" ? customizer : undefined2;
            return baseIsMatch(object, source, getMatchData(source), customizer);
          }
          __name(isMatchWith, "isMatchWith");
          function isNaN2(value) {
            return isNumber(value) && value != +value;
          }
          __name(isNaN2, "isNaN");
          function isNative(value) {
            if (isMaskable(value)) {
              throw new Error2(CORE_ERROR_TEXT);
            }
            return baseIsNative(value);
          }
          __name(isNative, "isNative");
          function isNull2(value) {
            return value === null;
          }
          __name(isNull2, "isNull");
          function isNil(value) {
            return value == null;
          }
          __name(isNil, "isNil");
          function isNumber(value) {
            return typeof value == "number" || isObjectLike(value) && baseGetTag(value) == numberTag;
          }
          __name(isNumber, "isNumber");
          function isPlainObject(value) {
            if (!isObjectLike(value) || baseGetTag(value) != objectTag) {
              return false;
            }
            var proto = getPrototype(value);
            if (proto === null) {
              return true;
            }
            var Ctor = hasOwnProperty.call(proto, "constructor") && proto.constructor;
            return typeof Ctor == "function" && Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString;
          }
          __name(isPlainObject, "isPlainObject");
          var isRegExp = nodeIsRegExp ? baseUnary(nodeIsRegExp) : baseIsRegExp;
          function isSafeInteger(value) {
            return isInteger(value) && value >= -MAX_SAFE_INTEGER && value <= MAX_SAFE_INTEGER;
          }
          __name(isSafeInteger, "isSafeInteger");
          var isSet = nodeIsSet ? baseUnary(nodeIsSet) : baseIsSet;
          function isString(value) {
            return typeof value == "string" || !isArray(value) && isObjectLike(value) && baseGetTag(value) == stringTag;
          }
          __name(isString, "isString");
          function isSymbol(value) {
            return typeof value == "symbol" || isObjectLike(value) && baseGetTag(value) == symbolTag;
          }
          __name(isSymbol, "isSymbol");
          var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
          function isUndefined(value) {
            return value === undefined2;
          }
          __name(isUndefined, "isUndefined");
          function isWeakMap(value) {
            return isObjectLike(value) && getTag(value) == weakMapTag;
          }
          __name(isWeakMap, "isWeakMap");
          function isWeakSet(value) {
            return isObjectLike(value) && baseGetTag(value) == weakSetTag;
          }
          __name(isWeakSet, "isWeakSet");
          var lt = createRelationalOperation(baseLt);
          var lte = createRelationalOperation(function(value, other) {
            return value <= other;
          });
          function toArray(value) {
            if (!value) {
              return [];
            }
            if (isArrayLike(value)) {
              return isString(value) ? stringToArray(value) : copyArray(value);
            }
            if (symIterator && value[symIterator]) {
              return iteratorToArray(value[symIterator]());
            }
            var tag = getTag(value), func = tag == mapTag ? mapToArray : tag == setTag ? setToArray : values;
            return func(value);
          }
          __name(toArray, "toArray");
          function toFinite(value) {
            if (!value) {
              return value === 0 ? value : 0;
            }
            value = toNumber(value);
            if (value === INFINITY || value === -INFINITY) {
              var sign = value < 0 ? -1 : 1;
              return sign * MAX_INTEGER;
            }
            return value === value ? value : 0;
          }
          __name(toFinite, "toFinite");
          function toInteger(value) {
            var result2 = toFinite(value), remainder = result2 % 1;
            return result2 === result2 ? remainder ? result2 - remainder : result2 : 0;
          }
          __name(toInteger, "toInteger");
          function toLength(value) {
            return value ? baseClamp(toInteger(value), 0, MAX_ARRAY_LENGTH) : 0;
          }
          __name(toLength, "toLength");
          function toNumber(value) {
            if (typeof value == "number") {
              return value;
            }
            if (isSymbol(value)) {
              return NAN;
            }
            if (isObject(value)) {
              var other = typeof value.valueOf == "function" ? value.valueOf() : value;
              value = isObject(other) ? other + "" : other;
            }
            if (typeof value != "string") {
              return value === 0 ? value : +value;
            }
            value = baseTrim(value);
            var isBinary = reIsBinary.test(value);
            return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
          }
          __name(toNumber, "toNumber");
          function toPlainObject(value) {
            return copyObject(value, keysIn(value));
          }
          __name(toPlainObject, "toPlainObject");
          function toSafeInteger(value) {
            return value ? baseClamp(toInteger(value), -MAX_SAFE_INTEGER, MAX_SAFE_INTEGER) : value === 0 ? value : 0;
          }
          __name(toSafeInteger, "toSafeInteger");
          function toString(value) {
            return value == null ? "" : baseToString(value);
          }
          __name(toString, "toString");
          var assign = createAssigner(function(object, source) {
            if (isPrototype(source) || isArrayLike(source)) {
              copyObject(source, keys(source), object);
              return;
            }
            for (var key in source) {
              if (hasOwnProperty.call(source, key)) {
                assignValue(object, key, source[key]);
              }
            }
          });
          var assignIn = createAssigner(function(object, source) {
            copyObject(source, keysIn(source), object);
          });
          var assignInWith = createAssigner(function(object, source, srcIndex, customizer) {
            copyObject(source, keysIn(source), object, customizer);
          });
          var assignWith = createAssigner(function(object, source, srcIndex, customizer) {
            copyObject(source, keys(source), object, customizer);
          });
          var at = flatRest(baseAt);
          function create(prototype, properties) {
            var result2 = baseCreate(prototype);
            return properties == null ? result2 : baseAssign(result2, properties);
          }
          __name(create, "create");
          var defaults = baseRest(function(object, sources) {
            object = Object2(object);
            var index = -1;
            var length = sources.length;
            var guard = length > 2 ? sources[2] : undefined2;
            if (guard && isIterateeCall(sources[0], sources[1], guard)) {
              length = 1;
            }
            while (++index < length) {
              var source = sources[index];
              var props = keysIn(source);
              var propsIndex = -1;
              var propsLength = props.length;
              while (++propsIndex < propsLength) {
                var key = props[propsIndex];
                var value = object[key];
                if (value === undefined2 || eq(value, objectProto[key]) && !hasOwnProperty.call(object, key)) {
                  object[key] = source[key];
                }
              }
            }
            return object;
          });
          var defaultsDeep = baseRest(function(args) {
            args.push(undefined2, customDefaultsMerge);
            return apply(mergeWith, undefined2, args);
          });
          function findKey(object, predicate) {
            return baseFindKey(object, getIteratee(predicate, 3), baseForOwn);
          }
          __name(findKey, "findKey");
          function findLastKey(object, predicate) {
            return baseFindKey(object, getIteratee(predicate, 3), baseForOwnRight);
          }
          __name(findLastKey, "findLastKey");
          function forIn(object, iteratee2) {
            return object == null ? object : baseFor(object, getIteratee(iteratee2, 3), keysIn);
          }
          __name(forIn, "forIn");
          function forInRight(object, iteratee2) {
            return object == null ? object : baseForRight(object, getIteratee(iteratee2, 3), keysIn);
          }
          __name(forInRight, "forInRight");
          function forOwn(object, iteratee2) {
            return object && baseForOwn(object, getIteratee(iteratee2, 3));
          }
          __name(forOwn, "forOwn");
          function forOwnRight(object, iteratee2) {
            return object && baseForOwnRight(object, getIteratee(iteratee2, 3));
          }
          __name(forOwnRight, "forOwnRight");
          function functions(object) {
            return object == null ? [] : baseFunctions(object, keys(object));
          }
          __name(functions, "functions");
          function functionsIn(object) {
            return object == null ? [] : baseFunctions(object, keysIn(object));
          }
          __name(functionsIn, "functionsIn");
          function get(object, path, defaultValue) {
            var result2 = object == null ? undefined2 : baseGet(object, path);
            return result2 === undefined2 ? defaultValue : result2;
          }
          __name(get, "get");
          function has(object, path) {
            return object != null && hasPath(object, path, baseHas);
          }
          __name(has, "has");
          function hasIn(object, path) {
            return object != null && hasPath(object, path, baseHasIn);
          }
          __name(hasIn, "hasIn");
          var invert = createInverter(function(result2, value, key) {
            if (value != null && typeof value.toString != "function") {
              value = nativeObjectToString.call(value);
            }
            result2[value] = key;
          }, constant(identity));
          var invertBy = createInverter(function(result2, value, key) {
            if (value != null && typeof value.toString != "function") {
              value = nativeObjectToString.call(value);
            }
            if (hasOwnProperty.call(result2, value)) {
              result2[value].push(key);
            } else {
              result2[value] = [key];
            }
          }, getIteratee);
          var invoke = baseRest(baseInvoke);
          function keys(object) {
            return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
          }
          __name(keys, "keys");
          function keysIn(object) {
            return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
          }
          __name(keysIn, "keysIn");
          function mapKeys(object, iteratee2) {
            var result2 = {};
            iteratee2 = getIteratee(iteratee2, 3);
            baseForOwn(object, function(value, key, object2) {
              baseAssignValue(result2, iteratee2(value, key, object2), value);
            });
            return result2;
          }
          __name(mapKeys, "mapKeys");
          function mapValues(object, iteratee2) {
            var result2 = {};
            iteratee2 = getIteratee(iteratee2, 3);
            baseForOwn(object, function(value, key, object2) {
              baseAssignValue(result2, key, iteratee2(value, key, object2));
            });
            return result2;
          }
          __name(mapValues, "mapValues");
          var merge = createAssigner(function(object, source, srcIndex) {
            baseMerge(object, source, srcIndex);
          });
          var mergeWith = createAssigner(function(object, source, srcIndex, customizer) {
            baseMerge(object, source, srcIndex, customizer);
          });
          var omit5 = flatRest(function(object, paths) {
            var result2 = {};
            if (object == null) {
              return result2;
            }
            var isDeep = false;
            paths = arrayMap(paths, function(path) {
              path = castPath(path, object);
              isDeep || (isDeep = path.length > 1);
              return path;
            });
            copyObject(object, getAllKeysIn(object), result2);
            if (isDeep) {
              result2 = baseClone(result2, CLONE_DEEP_FLAG | CLONE_FLAT_FLAG | CLONE_SYMBOLS_FLAG, customOmitClone);
            }
            var length = paths.length;
            while (length--) {
              baseUnset(result2, paths[length]);
            }
            return result2;
          });
          function omitBy(object, predicate) {
            return pickBy(object, negate(getIteratee(predicate)));
          }
          __name(omitBy, "omitBy");
          var pick = flatRest(function(object, paths) {
            return object == null ? {} : basePick(object, paths);
          });
          function pickBy(object, predicate) {
            if (object == null) {
              return {};
            }
            var props = arrayMap(getAllKeysIn(object), function(prop) {
              return [prop];
            });
            predicate = getIteratee(predicate);
            return basePickBy(object, props, function(value, path) {
              return predicate(value, path[0]);
            });
          }
          __name(pickBy, "pickBy");
          function result(object, path, defaultValue) {
            path = castPath(path, object);
            var index = -1, length = path.length;
            if (!length) {
              length = 1;
              object = undefined2;
            }
            while (++index < length) {
              var value = object == null ? undefined2 : object[toKey(path[index])];
              if (value === undefined2) {
                index = length;
                value = defaultValue;
              }
              object = isFunction(value) ? value.call(object) : value;
            }
            return object;
          }
          __name(result, "result");
          function set(object, path, value) {
            return object == null ? object : baseSet(object, path, value);
          }
          __name(set, "set");
          function setWith(object, path, value, customizer) {
            customizer = typeof customizer == "function" ? customizer : undefined2;
            return object == null ? object : baseSet(object, path, value, customizer);
          }
          __name(setWith, "setWith");
          var toPairs = createToPairs(keys);
          var toPairsIn = createToPairs(keysIn);
          function transform(object, iteratee2, accumulator) {
            var isArr = isArray(object), isArrLike = isArr || isBuffer(object) || isTypedArray(object);
            iteratee2 = getIteratee(iteratee2, 4);
            if (accumulator == null) {
              var Ctor = object && object.constructor;
              if (isArrLike) {
                accumulator = isArr ? new Ctor() : [];
              } else if (isObject(object)) {
                accumulator = isFunction(Ctor) ? baseCreate(getPrototype(object)) : {};
              } else {
                accumulator = {};
              }
            }
            (isArrLike ? arrayEach : baseForOwn)(object, function(value, index, object2) {
              return iteratee2(accumulator, value, index, object2);
            });
            return accumulator;
          }
          __name(transform, "transform");
          function unset(object, path) {
            return object == null ? true : baseUnset(object, path);
          }
          __name(unset, "unset");
          function update(object, path, updater) {
            return object == null ? object : baseUpdate(object, path, castFunction(updater));
          }
          __name(update, "update");
          function updateWith(object, path, updater, customizer) {
            customizer = typeof customizer == "function" ? customizer : undefined2;
            return object == null ? object : baseUpdate(object, path, castFunction(updater), customizer);
          }
          __name(updateWith, "updateWith");
          function values(object) {
            return object == null ? [] : baseValues(object, keys(object));
          }
          __name(values, "values");
          function valuesIn(object) {
            return object == null ? [] : baseValues(object, keysIn(object));
          }
          __name(valuesIn, "valuesIn");
          function clamp2(number, lower, upper) {
            if (upper === undefined2) {
              upper = lower;
              lower = undefined2;
            }
            if (upper !== undefined2) {
              upper = toNumber(upper);
              upper = upper === upper ? upper : 0;
            }
            if (lower !== undefined2) {
              lower = toNumber(lower);
              lower = lower === lower ? lower : 0;
            }
            return baseClamp(toNumber(number), lower, upper);
          }
          __name(clamp2, "clamp");
          function inRange(number, start, end) {
            start = toFinite(start);
            if (end === undefined2) {
              end = start;
              start = 0;
            } else {
              end = toFinite(end);
            }
            number = toNumber(number);
            return baseInRange(number, start, end);
          }
          __name(inRange, "inRange");
          function random(lower, upper, floating) {
            if (floating && typeof floating != "boolean" && isIterateeCall(lower, upper, floating)) {
              upper = floating = undefined2;
            }
            if (floating === undefined2) {
              if (typeof upper == "boolean") {
                floating = upper;
                upper = undefined2;
              } else if (typeof lower == "boolean") {
                floating = lower;
                lower = undefined2;
              }
            }
            if (lower === undefined2 && upper === undefined2) {
              lower = 0;
              upper = 1;
            } else {
              lower = toFinite(lower);
              if (upper === undefined2) {
                upper = lower;
                lower = 0;
              } else {
                upper = toFinite(upper);
              }
            }
            if (lower > upper) {
              var temp = lower;
              lower = upper;
              upper = temp;
            }
            if (floating || lower % 1 || upper % 1) {
              var rand = nativeRandom();
              return nativeMin(lower + rand * (upper - lower + freeParseFloat("1e-" + ((rand + "").length - 1))), upper);
            }
            return baseRandom(lower, upper);
          }
          __name(random, "random");
          var camelCase = createCompounder(function(result2, word, index) {
            word = word.toLowerCase();
            return result2 + (index ? capitalize(word) : word);
          });
          function capitalize(string) {
            return upperFirst(toString(string).toLowerCase());
          }
          __name(capitalize, "capitalize");
          function deburr(string) {
            string = toString(string);
            return string && string.replace(reLatin, deburrLetter).replace(reComboMark, "");
          }
          __name(deburr, "deburr");
          function endsWith(string, target, position) {
            string = toString(string);
            target = baseToString(target);
            var length = string.length;
            position = position === undefined2 ? length : baseClamp(toInteger(position), 0, length);
            var end = position;
            position -= target.length;
            return position >= 0 && string.slice(position, end) == target;
          }
          __name(endsWith, "endsWith");
          function escape(string) {
            string = toString(string);
            return string && reHasUnescapedHtml.test(string) ? string.replace(reUnescapedHtml, escapeHtmlChar) : string;
          }
          __name(escape, "escape");
          function escapeRegExp(string) {
            string = toString(string);
            return string && reHasRegExpChar.test(string) ? string.replace(reRegExpChar, "\\\\$&") : string;
          }
          __name(escapeRegExp, "escapeRegExp");
          var kebabCase = createCompounder(function(result2, word, index) {
            return result2 + (index ? "-" : "") + word.toLowerCase();
          });
          var lowerCase = createCompounder(function(result2, word, index) {
            return result2 + (index ? " " : "") + word.toLowerCase();
          });
          var lowerFirst = createCaseFirst("toLowerCase");
          function pad(string, length, chars) {
            string = toString(string);
            length = toInteger(length);
            var strLength = length ? stringSize(string) : 0;
            if (!length || strLength >= length) {
              return string;
            }
            var mid = (length - strLength) / 2;
            return createPadding(nativeFloor(mid), chars) + string + createPadding(nativeCeil(mid), chars);
          }
          __name(pad, "pad");
          function padEnd(string, length, chars) {
            string = toString(string);
            length = toInteger(length);
            var strLength = length ? stringSize(string) : 0;
            return length && strLength < length ? string + createPadding(length - strLength, chars) : string;
          }
          __name(padEnd, "padEnd");
          function padStart(string, length, chars) {
            string = toString(string);
            length = toInteger(length);
            var strLength = length ? stringSize(string) : 0;
            return length && strLength < length ? createPadding(length - strLength, chars) + string : string;
          }
          __name(padStart, "padStart");
          function parseInt2(string, radix, guard) {
            if (guard || radix == null) {
              radix = 0;
            } else if (radix) {
              radix = +radix;
            }
            return nativeParseInt(toString(string).replace(reTrimStart, ""), radix || 0);
          }
          __name(parseInt2, "parseInt");
          function repeat(string, n2, guard) {
            if (guard ? isIterateeCall(string, n2, guard) : n2 === undefined2) {
              n2 = 1;
            } else {
              n2 = toInteger(n2);
            }
            return baseRepeat(toString(string), n2);
          }
          __name(repeat, "repeat");
          function replace() {
            var args = arguments, string = toString(args[0]);
            return args.length < 3 ? string : string.replace(args[1], args[2]);
          }
          __name(replace, "replace");
          var snakeCase = createCompounder(function(result2, word, index) {
            return result2 + (index ? "_" : "") + word.toLowerCase();
          });
          function split(string, separator, limit) {
            if (limit && typeof limit != "number" && isIterateeCall(string, separator, limit)) {
              separator = limit = undefined2;
            }
            limit = limit === undefined2 ? MAX_ARRAY_LENGTH : limit >>> 0;
            if (!limit) {
              return [];
            }
            string = toString(string);
            if (string && (typeof separator == "string" || separator != null && !isRegExp(separator))) {
              separator = baseToString(separator);
              if (!separator && hasUnicode(string)) {
                return castSlice(stringToArray(string), 0, limit);
              }
            }
            return string.split(separator, limit);
          }
          __name(split, "split");
          var startCase = createCompounder(function(result2, word, index) {
            return result2 + (index ? " " : "") + upperFirst(word);
          });
          function startsWith(string, target, position) {
            string = toString(string);
            position = position == null ? 0 : baseClamp(toInteger(position), 0, string.length);
            target = baseToString(target);
            return string.slice(position, position + target.length) == target;
          }
          __name(startsWith, "startsWith");
          function template(string, options, guard) {
            var settings = lodash.templateSettings;
            if (guard && isIterateeCall(string, options, guard)) {
              options = undefined2;
            }
            string = toString(string);
            options = assignInWith({}, options, settings, customDefaultsAssignIn);
            var imports = assignInWith({}, options.imports, settings.imports, customDefaultsAssignIn), importsKeys = keys(imports), importsValues = baseValues(imports, importsKeys);
            var isEscaping, isEvaluating, index = 0, interpolate = options.interpolate || reNoMatch, source = "__p += '";
            var reDelimiters = RegExp2(
              (options.escape || reNoMatch).source + "|" + interpolate.source + "|" + (interpolate === reInterpolate ? reEsTemplate : reNoMatch).source + "|" + (options.evaluate || reNoMatch).source + "|$",
              "g"
            );
            var sourceURL = "//# sourceURL=" + (hasOwnProperty.call(options, "sourceURL") ? (options.sourceURL + "").replace(/\\s/g, " ") : "lodash.templateSources[" + ++templateCounter + "]") + "\\n";
            string.replace(reDelimiters, function(match, escapeValue, interpolateValue, esTemplateValue, evaluateValue, offset) {
              interpolateValue || (interpolateValue = esTemplateValue);
              source += string.slice(index, offset).replace(reUnescapedString, escapeStringChar);
              if (escapeValue) {
                isEscaping = true;
                source += "' +\\n__e(" + escapeValue + ") +\\n'";
              }
              if (evaluateValue) {
                isEvaluating = true;
                source += "';\\n" + evaluateValue + ";\\n__p += '";
              }
              if (interpolateValue) {
                source += "' +\\n((__t = (" + interpolateValue + ")) == null ? '' : __t) +\\n'";
              }
              index = offset + match.length;
              return match;
            });
            source += "';\\n";
            var variable = hasOwnProperty.call(options, "variable") && options.variable;
            if (!variable) {
              source = "with (obj) {\\n" + source + "\\n}\\n";
            } else if (reForbiddenIdentifierChars.test(variable)) {
              throw new Error2(INVALID_TEMPL_VAR_ERROR_TEXT);
            }
            source = (isEvaluating ? source.replace(reEmptyStringLeading, "") : source).replace(reEmptyStringMiddle, "$1").replace(reEmptyStringTrailing, "$1;");
            source = "function(" + (variable || "obj") + ") {\\n" + (variable ? "" : "obj || (obj = {});\\n") + "var __t, __p = ''" + (isEscaping ? ", __e = _.escape" : "") + (isEvaluating ? ", __j = Array.prototype.join;\\nfunction print() { __p += __j.call(arguments, '') }\\n" : ";\\n") + source + "return __p\\n}";
            var result2 = attempt(function() {
              return Function2(importsKeys, sourceURL + "return " + source).apply(undefined2, importsValues);
            });
            result2.source = source;
            if (isError(result2)) {
              throw result2;
            }
            return result2;
          }
          __name(template, "template");
          function toLower(value) {
            return toString(value).toLowerCase();
          }
          __name(toLower, "toLower");
          function toUpper(value) {
            return toString(value).toUpperCase();
          }
          __name(toUpper, "toUpper");
          function trim(string, chars, guard) {
            string = toString(string);
            if (string && (guard || chars === undefined2)) {
              return baseTrim(string);
            }
            if (!string || !(chars = baseToString(chars))) {
              return string;
            }
            var strSymbols = stringToArray(string), chrSymbols = stringToArray(chars), start = charsStartIndex(strSymbols, chrSymbols), end = charsEndIndex(strSymbols, chrSymbols) + 1;
            return castSlice(strSymbols, start, end).join("");
          }
          __name(trim, "trim");
          function trimEnd(string, chars, guard) {
            string = toString(string);
            if (string && (guard || chars === undefined2)) {
              return string.slice(0, trimmedEndIndex(string) + 1);
            }
            if (!string || !(chars = baseToString(chars))) {
              return string;
            }
            var strSymbols = stringToArray(string), end = charsEndIndex(strSymbols, stringToArray(chars)) + 1;
            return castSlice(strSymbols, 0, end).join("");
          }
          __name(trimEnd, "trimEnd");
          function trimStart(string, chars, guard) {
            string = toString(string);
            if (string && (guard || chars === undefined2)) {
              return string.replace(reTrimStart, "");
            }
            if (!string || !(chars = baseToString(chars))) {
              return string;
            }
            var strSymbols = stringToArray(string), start = charsStartIndex(strSymbols, stringToArray(chars));
            return castSlice(strSymbols, start).join("");
          }
          __name(trimStart, "trimStart");
          function truncate(string, options) {
            var length = DEFAULT_TRUNC_LENGTH, omission = DEFAULT_TRUNC_OMISSION;
            if (isObject(options)) {
              var separator = "separator" in options ? options.separator : separator;
              length = "length" in options ? toInteger(options.length) : length;
              omission = "omission" in options ? baseToString(options.omission) : omission;
            }
            string = toString(string);
            var strLength = string.length;
            if (hasUnicode(string)) {
              var strSymbols = stringToArray(string);
              strLength = strSymbols.length;
            }
            if (length >= strLength) {
              return string;
            }
            var end = length - stringSize(omission);
            if (end < 1) {
              return omission;
            }
            var result2 = strSymbols ? castSlice(strSymbols, 0, end).join("") : string.slice(0, end);
            if (separator === undefined2) {
              return result2 + omission;
            }
            if (strSymbols) {
              end += result2.length - end;
            }
            if (isRegExp(separator)) {
              if (string.slice(end).search(separator)) {
                var match, substring = result2;
                if (!separator.global) {
                  separator = RegExp2(separator.source, toString(reFlags.exec(separator)) + "g");
                }
                separator.lastIndex = 0;
                while (match = separator.exec(substring)) {
                  var newEnd = match.index;
                }
                result2 = result2.slice(0, newEnd === undefined2 ? end : newEnd);
              }
            } else if (string.indexOf(baseToString(separator), end) != end) {
              var index = result2.lastIndexOf(separator);
              if (index > -1) {
                result2 = result2.slice(0, index);
              }
            }
            return result2 + omission;
          }
          __name(truncate, "truncate");
          function unescape(string) {
            string = toString(string);
            return string && reHasEscapedHtml.test(string) ? string.replace(reEscapedHtml, unescapeHtmlChar) : string;
          }
          __name(unescape, "unescape");
          var upperCase = createCompounder(function(result2, word, index) {
            return result2 + (index ? " " : "") + word.toUpperCase();
          });
          var upperFirst = createCaseFirst("toUpperCase");
          function words(string, pattern, guard) {
            string = toString(string);
            pattern = guard ? undefined2 : pattern;
            if (pattern === undefined2) {
              return hasUnicodeWord(string) ? unicodeWords(string) : asciiWords(string);
            }
            return string.match(pattern) || [];
          }
          __name(words, "words");
          var attempt = baseRest(function(func, args) {
            try {
              return apply(func, undefined2, args);
            } catch (e3) {
              return isError(e3) ? e3 : new Error2(e3);
            }
          });
          var bindAll = flatRest(function(object, methodNames) {
            arrayEach(methodNames, function(key) {
              key = toKey(key);
              baseAssignValue(object, key, bind(object[key], object));
            });
            return object;
          });
          function cond(pairs) {
            var length = pairs == null ? 0 : pairs.length, toIteratee = getIteratee();
            pairs = !length ? [] : arrayMap(pairs, function(pair) {
              if (typeof pair[1] != "function") {
                throw new TypeError2(FUNC_ERROR_TEXT);
              }
              return [toIteratee(pair[0]), pair[1]];
            });
            return baseRest(function(args) {
              var index = -1;
              while (++index < length) {
                var pair = pairs[index];
                if (apply(pair[0], this, args)) {
                  return apply(pair[1], this, args);
                }
              }
            });
          }
          __name(cond, "cond");
          function conforms(source) {
            return baseConforms(baseClone(source, CLONE_DEEP_FLAG));
          }
          __name(conforms, "conforms");
          function constant(value) {
            return function() {
              return value;
            };
          }
          __name(constant, "constant");
          function defaultTo(value, defaultValue) {
            return value == null || value !== value ? defaultValue : value;
          }
          __name(defaultTo, "defaultTo");
          var flow = createFlow();
          var flowRight = createFlow(true);
          function identity(value) {
            return value;
          }
          __name(identity, "identity");
          function iteratee(func) {
            return baseIteratee(typeof func == "function" ? func : baseClone(func, CLONE_DEEP_FLAG));
          }
          __name(iteratee, "iteratee");
          function matches(source) {
            return baseMatches(baseClone(source, CLONE_DEEP_FLAG));
          }
          __name(matches, "matches");
          function matchesProperty(path, srcValue) {
            return baseMatchesProperty(path, baseClone(srcValue, CLONE_DEEP_FLAG));
          }
          __name(matchesProperty, "matchesProperty");
          var method = baseRest(function(path, args) {
            return function(object) {
              return baseInvoke(object, path, args);
            };
          });
          var methodOf = baseRest(function(object, args) {
            return function(path) {
              return baseInvoke(object, path, args);
            };
          });
          function mixin(object, source, options) {
            var props = keys(source), methodNames = baseFunctions(source, props);
            if (options == null && !(isObject(source) && (methodNames.length || !props.length))) {
              options = source;
              source = object;
              object = this;
              methodNames = baseFunctions(source, keys(source));
            }
            var chain2 = !(isObject(options) && "chain" in options) || !!options.chain, isFunc = isFunction(object);
            arrayEach(methodNames, function(methodName) {
              var func = source[methodName];
              object[methodName] = func;
              if (isFunc) {
                object.prototype[methodName] = function() {
                  var chainAll = this.__chain__;
                  if (chain2 || chainAll) {
                    var result2 = object(this.__wrapped__), actions = result2.__actions__ = copyArray(this.__actions__);
                    actions.push({ "func": func, "args": arguments, "thisArg": object });
                    result2.__chain__ = chainAll;
                    return result2;
                  }
                  return func.apply(object, arrayPush([this.value()], arguments));
                };
              }
            });
            return object;
          }
          __name(mixin, "mixin");
          function noConflict() {
            if (root._ === this) {
              root._ = oldDash;
            }
            return this;
          }
          __name(noConflict, "noConflict");
          function noop() {
          }
          __name(noop, "noop");
          function nthArg(n2) {
            n2 = toInteger(n2);
            return baseRest(function(args) {
              return baseNth(args, n2);
            });
          }
          __name(nthArg, "nthArg");
          var over = createOver(arrayMap);
          var overEvery = createOver(arrayEvery);
          var overSome = createOver(arraySome);
          function property(path) {
            return isKey(path) ? baseProperty(toKey(path)) : basePropertyDeep(path);
          }
          __name(property, "property");
          function propertyOf(object) {
            return function(path) {
              return object == null ? undefined2 : baseGet(object, path);
            };
          }
          __name(propertyOf, "propertyOf");
          var range = createRange();
          var rangeRight = createRange(true);
          function stubArray() {
            return [];
          }
          __name(stubArray, "stubArray");
          function stubFalse() {
            return false;
          }
          __name(stubFalse, "stubFalse");
          function stubObject() {
            return {};
          }
          __name(stubObject, "stubObject");
          function stubString() {
            return "";
          }
          __name(stubString, "stubString");
          function stubTrue() {
            return true;
          }
          __name(stubTrue, "stubTrue");
          function times(n2, iteratee2) {
            n2 = toInteger(n2);
            if (n2 < 1 || n2 > MAX_SAFE_INTEGER) {
              return [];
            }
            var index = MAX_ARRAY_LENGTH, length = nativeMin(n2, MAX_ARRAY_LENGTH);
            iteratee2 = getIteratee(iteratee2);
            n2 -= MAX_ARRAY_LENGTH;
            var result2 = baseTimes(length, iteratee2);
            while (++index < n2) {
              iteratee2(index);
            }
            return result2;
          }
          __name(times, "times");
          function toPath(value) {
            if (isArray(value)) {
              return arrayMap(value, toKey);
            }
            return isSymbol(value) ? [value] : copyArray(stringToPath(toString(value)));
          }
          __name(toPath, "toPath");
          function uniqueId2(prefix) {
            var id = ++idCounter;
            return toString(prefix) + id;
          }
          __name(uniqueId2, "uniqueId");
          var add = createMathOperation(function(augend, addend) {
            return augend + addend;
          }, 0);
          var ceil = createRound("ceil");
          var divide = createMathOperation(function(dividend, divisor) {
            return dividend / divisor;
          }, 1);
          var floor = createRound("floor");
          function max(array) {
            return array && array.length ? baseExtremum(array, identity, baseGt) : undefined2;
          }
          __name(max, "max");
          function maxBy(array, iteratee2) {
            return array && array.length ? baseExtremum(array, getIteratee(iteratee2, 2), baseGt) : undefined2;
          }
          __name(maxBy, "maxBy");
          function mean(array) {
            return baseMean(array, identity);
          }
          __name(mean, "mean");
          function meanBy(array, iteratee2) {
            return baseMean(array, getIteratee(iteratee2, 2));
          }
          __name(meanBy, "meanBy");
          function min(array) {
            return array && array.length ? baseExtremum(array, identity, baseLt) : undefined2;
          }
          __name(min, "min");
          function minBy(array, iteratee2) {
            return array && array.length ? baseExtremum(array, getIteratee(iteratee2, 2), baseLt) : undefined2;
          }
          __name(minBy, "minBy");
          var multiply = createMathOperation(function(multiplier, multiplicand) {
            return multiplier * multiplicand;
          }, 1);
          var round = createRound("round");
          var subtract = createMathOperation(function(minuend, subtrahend) {
            return minuend - subtrahend;
          }, 0);
          function sum(array) {
            return array && array.length ? baseSum(array, identity) : 0;
          }
          __name(sum, "sum");
          function sumBy(array, iteratee2) {
            return array && array.length ? baseSum(array, getIteratee(iteratee2, 2)) : 0;
          }
          __name(sumBy, "sumBy");
          lodash.after = after;
          lodash.ary = ary;
          lodash.assign = assign;
          lodash.assignIn = assignIn;
          lodash.assignInWith = assignInWith;
          lodash.assignWith = assignWith;
          lodash.at = at;
          lodash.before = before;
          lodash.bind = bind;
          lodash.bindAll = bindAll;
          lodash.bindKey = bindKey;
          lodash.castArray = castArray;
          lodash.chain = chain;
          lodash.chunk = chunk;
          lodash.compact = compact;
          lodash.concat = concat;
          lodash.cond = cond;
          lodash.conforms = conforms;
          lodash.constant = constant;
          lodash.countBy = countBy;
          lodash.create = create;
          lodash.curry = curry;
          lodash.curryRight = curryRight;
          lodash.debounce = debounce;
          lodash.defaults = defaults;
          lodash.defaultsDeep = defaultsDeep;
          lodash.defer = defer;
          lodash.delay = delay;
          lodash.difference = difference;
          lodash.differenceBy = differenceBy;
          lodash.differenceWith = differenceWith;
          lodash.drop = drop;
          lodash.dropRight = dropRight;
          lodash.dropRightWhile = dropRightWhile;
          lodash.dropWhile = dropWhile;
          lodash.fill = fill;
          lodash.filter = filter;
          lodash.flatMap = flatMap;
          lodash.flatMapDeep = flatMapDeep;
          lodash.flatMapDepth = flatMapDepth;
          lodash.flatten = flatten;
          lodash.flattenDeep = flattenDeep;
          lodash.flattenDepth = flattenDepth;
          lodash.flip = flip;
          lodash.flow = flow;
          lodash.flowRight = flowRight;
          lodash.fromPairs = fromPairs;
          lodash.functions = functions;
          lodash.functionsIn = functionsIn;
          lodash.groupBy = groupBy;
          lodash.initial = initial;
          lodash.intersection = intersection;
          lodash.intersectionBy = intersectionBy;
          lodash.intersectionWith = intersectionWith;
          lodash.invert = invert;
          lodash.invertBy = invertBy;
          lodash.invokeMap = invokeMap;
          lodash.iteratee = iteratee;
          lodash.keyBy = keyBy;
          lodash.keys = keys;
          lodash.keysIn = keysIn;
          lodash.map = map;
          lodash.mapKeys = mapKeys;
          lodash.mapValues = mapValues;
          lodash.matches = matches;
          lodash.matchesProperty = matchesProperty;
          lodash.memoize = memoize;
          lodash.merge = merge;
          lodash.mergeWith = mergeWith;
          lodash.method = method;
          lodash.methodOf = methodOf;
          lodash.mixin = mixin;
          lodash.negate = negate;
          lodash.nthArg = nthArg;
          lodash.omit = omit5;
          lodash.omitBy = omitBy;
          lodash.once = once;
          lodash.orderBy = orderBy;
          lodash.over = over;
          lodash.overArgs = overArgs;
          lodash.overEvery = overEvery;
          lodash.overSome = overSome;
          lodash.partial = partial;
          lodash.partialRight = partialRight;
          lodash.partition = partition;
          lodash.pick = pick;
          lodash.pickBy = pickBy;
          lodash.property = property;
          lodash.propertyOf = propertyOf;
          lodash.pull = pull;
          lodash.pullAll = pullAll;
          lodash.pullAllBy = pullAllBy;
          lodash.pullAllWith = pullAllWith;
          lodash.pullAt = pullAt;
          lodash.range = range;
          lodash.rangeRight = rangeRight;
          lodash.rearg = rearg;
          lodash.reject = reject;
          lodash.remove = remove;
          lodash.rest = rest;
          lodash.reverse = reverse;
          lodash.sampleSize = sampleSize;
          lodash.set = set;
          lodash.setWith = setWith;
          lodash.shuffle = shuffle;
          lodash.slice = slice;
          lodash.sortBy = sortBy;
          lodash.sortedUniq = sortedUniq;
          lodash.sortedUniqBy = sortedUniqBy;
          lodash.split = split;
          lodash.spread = spread;
          lodash.tail = tail;
          lodash.take = take;
          lodash.takeRight = takeRight;
          lodash.takeRightWhile = takeRightWhile;
          lodash.takeWhile = takeWhile;
          lodash.tap = tap;
          lodash.throttle = throttle3;
          lodash.thru = thru;
          lodash.toArray = toArray;
          lodash.toPairs = toPairs;
          lodash.toPairsIn = toPairsIn;
          lodash.toPath = toPath;
          lodash.toPlainObject = toPlainObject;
          lodash.transform = transform;
          lodash.unary = unary;
          lodash.union = union;
          lodash.unionBy = unionBy;
          lodash.unionWith = unionWith;
          lodash.uniq = uniq;
          lodash.uniqBy = uniqBy;
          lodash.uniqWith = uniqWith;
          lodash.unset = unset;
          lodash.unzip = unzip;
          lodash.unzipWith = unzipWith;
          lodash.update = update;
          lodash.updateWith = updateWith;
          lodash.values = values;
          lodash.valuesIn = valuesIn;
          lodash.without = without;
          lodash.words = words;
          lodash.wrap = wrap;
          lodash.xor = xor;
          lodash.xorBy = xorBy;
          lodash.xorWith = xorWith;
          lodash.zip = zip;
          lodash.zipObject = zipObject;
          lodash.zipObjectDeep = zipObjectDeep;
          lodash.zipWith = zipWith;
          lodash.entries = toPairs;
          lodash.entriesIn = toPairsIn;
          lodash.extend = assignIn;
          lodash.extendWith = assignInWith;
          mixin(lodash, lodash);
          lodash.add = add;
          lodash.attempt = attempt;
          lodash.camelCase = camelCase;
          lodash.capitalize = capitalize;
          lodash.ceil = ceil;
          lodash.clamp = clamp2;
          lodash.clone = clone;
          lodash.cloneDeep = cloneDeep;
          lodash.cloneDeepWith = cloneDeepWith;
          lodash.cloneWith = cloneWith;
          lodash.conformsTo = conformsTo;
          lodash.deburr = deburr;
          lodash.defaultTo = defaultTo;
          lodash.divide = divide;
          lodash.endsWith = endsWith;
          lodash.eq = eq;
          lodash.escape = escape;
          lodash.escapeRegExp = escapeRegExp;
          lodash.every = every;
          lodash.find = find;
          lodash.findIndex = findIndex;
          lodash.findKey = findKey;
          lodash.findLast = findLast;
          lodash.findLastIndex = findLastIndex;
          lodash.findLastKey = findLastKey;
          lodash.floor = floor;
          lodash.forEach = forEach;
          lodash.forEachRight = forEachRight;
          lodash.forIn = forIn;
          lodash.forInRight = forInRight;
          lodash.forOwn = forOwn;
          lodash.forOwnRight = forOwnRight;
          lodash.get = get;
          lodash.gt = gt;
          lodash.gte = gte;
          lodash.has = has;
          lodash.hasIn = hasIn;
          lodash.head = head;
          lodash.identity = identity;
          lodash.includes = includes;
          lodash.indexOf = indexOf;
          lodash.inRange = inRange;
          lodash.invoke = invoke;
          lodash.isArguments = isArguments;
          lodash.isArray = isArray;
          lodash.isArrayBuffer = isArrayBuffer;
          lodash.isArrayLike = isArrayLike;
          lodash.isArrayLikeObject = isArrayLikeObject;
          lodash.isBoolean = isBoolean;
          lodash.isBuffer = isBuffer;
          lodash.isDate = isDate;
          lodash.isElement = isElement;
          lodash.isEmpty = isEmpty;
          lodash.isEqual = isEqual;
          lodash.isEqualWith = isEqualWith;
          lodash.isError = isError;
          lodash.isFinite = isFinite2;
          lodash.isFunction = isFunction;
          lodash.isInteger = isInteger;
          lodash.isLength = isLength;
          lodash.isMap = isMap;
          lodash.isMatch = isMatch;
          lodash.isMatchWith = isMatchWith;
          lodash.isNaN = isNaN2;
          lodash.isNative = isNative;
          lodash.isNil = isNil;
          lodash.isNull = isNull2;
          lodash.isNumber = isNumber;
          lodash.isObject = isObject;
          lodash.isObjectLike = isObjectLike;
          lodash.isPlainObject = isPlainObject;
          lodash.isRegExp = isRegExp;
          lodash.isSafeInteger = isSafeInteger;
          lodash.isSet = isSet;
          lodash.isString = isString;
          lodash.isSymbol = isSymbol;
          lodash.isTypedArray = isTypedArray;
          lodash.isUndefined = isUndefined;
          lodash.isWeakMap = isWeakMap;
          lodash.isWeakSet = isWeakSet;
          lodash.join = join;
          lodash.kebabCase = kebabCase;
          lodash.last = last;
          lodash.lastIndexOf = lastIndexOf;
          lodash.lowerCase = lowerCase;
          lodash.lowerFirst = lowerFirst;
          lodash.lt = lt;
          lodash.lte = lte;
          lodash.max = max;
          lodash.maxBy = maxBy;
          lodash.mean = mean;
          lodash.meanBy = meanBy;
          lodash.min = min;
          lodash.minBy = minBy;
          lodash.stubArray = stubArray;
          lodash.stubFalse = stubFalse;
          lodash.stubObject = stubObject;
          lodash.stubString = stubString;
          lodash.stubTrue = stubTrue;
          lodash.multiply = multiply;
          lodash.nth = nth;
          lodash.noConflict = noConflict;
          lodash.noop = noop;
          lodash.now = now;
          lodash.pad = pad;
          lodash.padEnd = padEnd;
          lodash.padStart = padStart;
          lodash.parseInt = parseInt2;
          lodash.random = random;
          lodash.reduce = reduce;
          lodash.reduceRight = reduceRight;
          lodash.repeat = repeat;
          lodash.replace = replace;
          lodash.result = result;
          lodash.round = round;
          lodash.runInContext = runInContext2;
          lodash.sample = sample;
          lodash.size = size;
          lodash.snakeCase = snakeCase;
          lodash.some = some;
          lodash.sortedIndex = sortedIndex;
          lodash.sortedIndexBy = sortedIndexBy;
          lodash.sortedIndexOf = sortedIndexOf;
          lodash.sortedLastIndex = sortedLastIndex;
          lodash.sortedLastIndexBy = sortedLastIndexBy;
          lodash.sortedLastIndexOf = sortedLastIndexOf;
          lodash.startCase = startCase;
          lodash.startsWith = startsWith;
          lodash.subtract = subtract;
          lodash.sum = sum;
          lodash.sumBy = sumBy;
          lodash.template = template;
          lodash.times = times;
          lodash.toFinite = toFinite;
          lodash.toInteger = toInteger;
          lodash.toLength = toLength;
          lodash.toLower = toLower;
          lodash.toNumber = toNumber;
          lodash.toSafeInteger = toSafeInteger;
          lodash.toString = toString;
          lodash.toUpper = toUpper;
          lodash.trim = trim;
          lodash.trimEnd = trimEnd;
          lodash.trimStart = trimStart;
          lodash.truncate = truncate;
          lodash.unescape = unescape;
          lodash.uniqueId = uniqueId2;
          lodash.upperCase = upperCase;
          lodash.upperFirst = upperFirst;
          lodash.each = forEach;
          lodash.eachRight = forEachRight;
          lodash.first = head;
          mixin(lodash, function() {
            var source = {};
            baseForOwn(lodash, function(func, methodName) {
              if (!hasOwnProperty.call(lodash.prototype, methodName)) {
                source[methodName] = func;
              }
            });
            return source;
          }(), { "chain": false });
          lodash.VERSION = VERSION;
          arrayEach(["bind", "bindKey", "curry", "curryRight", "partial", "partialRight"], function(methodName) {
            lodash[methodName].placeholder = lodash;
          });
          arrayEach(["drop", "take"], function(methodName, index) {
            LazyWrapper.prototype[methodName] = function(n2) {
              n2 = n2 === undefined2 ? 1 : nativeMax(toInteger(n2), 0);
              var result2 = this.__filtered__ && !index ? new LazyWrapper(this) : this.clone();
              if (result2.__filtered__) {
                result2.__takeCount__ = nativeMin(n2, result2.__takeCount__);
              } else {
                result2.__views__.push({
                  "size": nativeMin(n2, MAX_ARRAY_LENGTH),
                  "type": methodName + (result2.__dir__ < 0 ? "Right" : "")
                });
              }
              return result2;
            };
            LazyWrapper.prototype[methodName + "Right"] = function(n2) {
              return this.reverse()[methodName](n2).reverse();
            };
          });
          arrayEach(["filter", "map", "takeWhile"], function(methodName, index) {
            var type = index + 1, isFilter = type == LAZY_FILTER_FLAG || type == LAZY_WHILE_FLAG;
            LazyWrapper.prototype[methodName] = function(iteratee2) {
              var result2 = this.clone();
              result2.__iteratees__.push({
                "iteratee": getIteratee(iteratee2, 3),
                "type": type
              });
              result2.__filtered__ = result2.__filtered__ || isFilter;
              return result2;
            };
          });
          arrayEach(["head", "last"], function(methodName, index) {
            var takeName = "take" + (index ? "Right" : "");
            LazyWrapper.prototype[methodName] = function() {
              return this[takeName](1).value()[0];
            };
          });
          arrayEach(["initial", "tail"], function(methodName, index) {
            var dropName = "drop" + (index ? "" : "Right");
            LazyWrapper.prototype[methodName] = function() {
              return this.__filtered__ ? new LazyWrapper(this) : this[dropName](1);
            };
          });
          LazyWrapper.prototype.compact = function() {
            return this.filter(identity);
          };
          LazyWrapper.prototype.find = function(predicate) {
            return this.filter(predicate).head();
          };
          LazyWrapper.prototype.findLast = function(predicate) {
            return this.reverse().find(predicate);
          };
          LazyWrapper.prototype.invokeMap = baseRest(function(path, args) {
            if (typeof path == "function") {
              return new LazyWrapper(this);
            }
            return this.map(function(value) {
              return baseInvoke(value, path, args);
            });
          });
          LazyWrapper.prototype.reject = function(predicate) {
            return this.filter(negate(getIteratee(predicate)));
          };
          LazyWrapper.prototype.slice = function(start, end) {
            start = toInteger(start);
            var result2 = this;
            if (result2.__filtered__ && (start > 0 || end < 0)) {
              return new LazyWrapper(result2);
            }
            if (start < 0) {
              result2 = result2.takeRight(-start);
            } else if (start) {
              result2 = result2.drop(start);
            }
            if (end !== undefined2) {
              end = toInteger(end);
              result2 = end < 0 ? result2.dropRight(-end) : result2.take(end - start);
            }
            return result2;
          };
          LazyWrapper.prototype.takeRightWhile = function(predicate) {
            return this.reverse().takeWhile(predicate).reverse();
          };
          LazyWrapper.prototype.toArray = function() {
            return this.take(MAX_ARRAY_LENGTH);
          };
          baseForOwn(LazyWrapper.prototype, function(func, methodName) {
            var checkIteratee = /^(?:filter|find|map|reject)|While$/.test(methodName), isTaker = /^(?:head|last)$/.test(methodName), lodashFunc = lodash[isTaker ? "take" + (methodName == "last" ? "Right" : "") : methodName], retUnwrapped = isTaker || /^find/.test(methodName);
            if (!lodashFunc) {
              return;
            }
            lodash.prototype[methodName] = function() {
              var value = this.__wrapped__, args = isTaker ? [1] : arguments, isLazy = value instanceof LazyWrapper, iteratee2 = args[0], useLazy = isLazy || isArray(value);
              var interceptor = /* @__PURE__ */ __name(function(value2) {
                var result3 = lodashFunc.apply(lodash, arrayPush([value2], args));
                return isTaker && chainAll ? result3[0] : result3;
              }, "interceptor");
              if (useLazy && checkIteratee && typeof iteratee2 == "function" && iteratee2.length != 1) {
                isLazy = useLazy = false;
              }
              var chainAll = this.__chain__, isHybrid = !!this.__actions__.length, isUnwrapped = retUnwrapped && !chainAll, onlyLazy = isLazy && !isHybrid;
              if (!retUnwrapped && useLazy) {
                value = onlyLazy ? value : new LazyWrapper(this);
                var result2 = func.apply(value, args);
                result2.__actions__.push({ "func": thru, "args": [interceptor], "thisArg": undefined2 });
                return new LodashWrapper(result2, chainAll);
              }
              if (isUnwrapped && onlyLazy) {
                return func.apply(this, args);
              }
              result2 = this.thru(interceptor);
              return isUnwrapped ? isTaker ? result2.value()[0] : result2.value() : result2;
            };
          });
          arrayEach(["pop", "push", "shift", "sort", "splice", "unshift"], function(methodName) {
            var func = arrayProto[methodName], chainName = /^(?:push|sort|unshift)$/.test(methodName) ? "tap" : "thru", retUnwrapped = /^(?:pop|shift)$/.test(methodName);
            lodash.prototype[methodName] = function() {
              var args = arguments;
              if (retUnwrapped && !this.__chain__) {
                var value = this.value();
                return func.apply(isArray(value) ? value : [], args);
              }
              return this[chainName](function(value2) {
                return func.apply(isArray(value2) ? value2 : [], args);
              });
            };
          });
          baseForOwn(LazyWrapper.prototype, function(func, methodName) {
            var lodashFunc = lodash[methodName];
            if (lodashFunc) {
              var key = lodashFunc.name + "";
              if (!hasOwnProperty.call(realNames, key)) {
                realNames[key] = [];
              }
              realNames[key].push({ "name": methodName, "func": lodashFunc });
            }
          });
          realNames[createHybrid(undefined2, WRAP_BIND_KEY_FLAG).name] = [{
            "name": "wrapper",
            "func": undefined2
          }];
          LazyWrapper.prototype.clone = lazyClone;
          LazyWrapper.prototype.reverse = lazyReverse;
          LazyWrapper.prototype.value = lazyValue;
          lodash.prototype.at = wrapperAt;
          lodash.prototype.chain = wrapperChain;
          lodash.prototype.commit = wrapperCommit;
          lodash.prototype.next = wrapperNext;
          lodash.prototype.plant = wrapperPlant;
          lodash.prototype.reverse = wrapperReverse;
          lodash.prototype.toJSON = lodash.prototype.valueOf = lodash.prototype.value = wrapperValue;
          lodash.prototype.first = lodash.prototype.head;
          if (symIterator) {
            lodash.prototype[symIterator] = wrapperToIterator;
          }
          return lodash;
        }, "runInContext");
        var _ = runInContext();
        if (typeof define == "function" && typeof define.amd == "object" && define.amd) {
          root._ = _;
          define(function() {
            return _;
          });
        } else if (freeModule) {
          (freeModule.exports = _)._ = _;
          freeExports._ = _;
        } else {
          root._ = _;
        }
      }).call(exports);
    }
  });

  // node_modules/lodash/isObject.js
  var require_isObject = __commonJS({
    "node_modules/lodash/isObject.js"(exports, module) {
      function isObject(value) {
        var type = typeof value;
        return value != null && (type == "object" || type == "function");
      }
      __name(isObject, "isObject");
      module.exports = isObject;
    }
  });

  // node_modules/lodash/_freeGlobal.js
  var require_freeGlobal = __commonJS({
    "node_modules/lodash/_freeGlobal.js"(exports, module) {
      var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
      module.exports = freeGlobal;
    }
  });

  // node_modules/lodash/_root.js
  var require_root = __commonJS({
    "node_modules/lodash/_root.js"(exports, module) {
      var freeGlobal = require_freeGlobal();
      var freeSelf = typeof self == "object" && self && self.Object === Object && self;
      var root = freeGlobal || freeSelf || Function("return this")();
      module.exports = root;
    }
  });

  // node_modules/lodash/now.js
  var require_now = __commonJS({
    "node_modules/lodash/now.js"(exports, module) {
      var root = require_root();
      var now = /* @__PURE__ */ __name(function() {
        return root.Date.now();
      }, "now");
      module.exports = now;
    }
  });

  // node_modules/lodash/_trimmedEndIndex.js
  var require_trimmedEndIndex = __commonJS({
    "node_modules/lodash/_trimmedEndIndex.js"(exports, module) {
      var reWhitespace = /\\s/;
      function trimmedEndIndex(string) {
        var index = string.length;
        while (index-- && reWhitespace.test(string.charAt(index))) {
        }
        return index;
      }
      __name(trimmedEndIndex, "trimmedEndIndex");
      module.exports = trimmedEndIndex;
    }
  });

  // node_modules/lodash/_baseTrim.js
  var require_baseTrim = __commonJS({
    "node_modules/lodash/_baseTrim.js"(exports, module) {
      var trimmedEndIndex = require_trimmedEndIndex();
      var reTrimStart = /^\\s+/;
      function baseTrim(string) {
        return string ? string.slice(0, trimmedEndIndex(string) + 1).replace(reTrimStart, "") : string;
      }
      __name(baseTrim, "baseTrim");
      module.exports = baseTrim;
    }
  });

  // node_modules/lodash/_Symbol.js
  var require_Symbol = __commonJS({
    "node_modules/lodash/_Symbol.js"(exports, module) {
      var root = require_root();
      var Symbol2 = root.Symbol;
      module.exports = Symbol2;
    }
  });

  // node_modules/lodash/_getRawTag.js
  var require_getRawTag = __commonJS({
    "node_modules/lodash/_getRawTag.js"(exports, module) {
      var Symbol2 = require_Symbol();
      var objectProto = Object.prototype;
      var hasOwnProperty = objectProto.hasOwnProperty;
      var nativeObjectToString = objectProto.toString;
      var symToStringTag = Symbol2 ? Symbol2.toStringTag : void 0;
      function getRawTag(value) {
        var isOwn = hasOwnProperty.call(value, symToStringTag), tag = value[symToStringTag];
        try {
          value[symToStringTag] = void 0;
          var unmasked = true;
        } catch (e3) {
        }
        var result = nativeObjectToString.call(value);
        if (unmasked) {
          if (isOwn) {
            value[symToStringTag] = tag;
          } else {
            delete value[symToStringTag];
          }
        }
        return result;
      }
      __name(getRawTag, "getRawTag");
      module.exports = getRawTag;
    }
  });

  // node_modules/lodash/_objectToString.js
  var require_objectToString = __commonJS({
    "node_modules/lodash/_objectToString.js"(exports, module) {
      var objectProto = Object.prototype;
      var nativeObjectToString = objectProto.toString;
      function objectToString(value) {
        return nativeObjectToString.call(value);
      }
      __name(objectToString, "objectToString");
      module.exports = objectToString;
    }
  });

  // node_modules/lodash/_baseGetTag.js
  var require_baseGetTag = __commonJS({
    "node_modules/lodash/_baseGetTag.js"(exports, module) {
      var Symbol2 = require_Symbol(), getRawTag = require_getRawTag(), objectToString = require_objectToString();
      var nullTag = "[object Null]", undefinedTag = "[object Undefined]";
      var symToStringTag = Symbol2 ? Symbol2.toStringTag : void 0;
      function baseGetTag(value) {
        if (value == null) {
          return value === void 0 ? undefinedTag : nullTag;
        }
        return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
      }
      __name(baseGetTag, "baseGetTag");
      module.exports = baseGetTag;
    }
  });

  // node_modules/lodash/isObjectLike.js
  var require_isObjectLike = __commonJS({
    "node_modules/lodash/isObjectLike.js"(exports, module) {
      function isObjectLike(value) {
        return value != null && typeof value == "object";
      }
      __name(isObjectLike, "isObjectLike");
      module.exports = isObjectLike;
    }
  });

  // node_modules/lodash/isSymbol.js
  var require_isSymbol = __commonJS({
    "node_modules/lodash/isSymbol.js"(exports, module) {
      var baseGetTag = require_baseGetTag(), isObjectLike = require_isObjectLike();
      var symbolTag = "[object Symbol]";
      function isSymbol(value) {
        return typeof value == "symbol" || isObjectLike(value) && baseGetTag(value) == symbolTag;
      }
      __name(isSymbol, "isSymbol");
      module.exports = isSymbol;
    }
  });

  // node_modules/lodash/toNumber.js
  var require_toNumber = __commonJS({
    "node_modules/lodash/toNumber.js"(exports, module) {
      var baseTrim = require_baseTrim(), isObject = require_isObject(), isSymbol = require_isSymbol();
      var NAN = 0 / 0;
      var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
      var reIsBinary = /^0b[01]+$/i;
      var reIsOctal = /^0o[0-7]+$/i;
      var freeParseInt = parseInt;
      function toNumber(value) {
        if (typeof value == "number") {
          return value;
        }
        if (isSymbol(value)) {
          return NAN;
        }
        if (isObject(value)) {
          var other = typeof value.valueOf == "function" ? value.valueOf() : value;
          value = isObject(other) ? other + "" : other;
        }
        if (typeof value != "string") {
          return value === 0 ? value : +value;
        }
        value = baseTrim(value);
        var isBinary = reIsBinary.test(value);
        return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
      }
      __name(toNumber, "toNumber");
      module.exports = toNumber;
    }
  });

  // node_modules/lodash/debounce.js
  var require_debounce = __commonJS({
    "node_modules/lodash/debounce.js"(exports, module) {
      var isObject = require_isObject(), now = require_now(), toNumber = require_toNumber();
      var FUNC_ERROR_TEXT = "Expected a function";
      var nativeMax = Math.max, nativeMin = Math.min;
      function debounce(func, wait, options) {
        var lastArgs, lastThis, maxWait, result, timerId, lastCallTime, lastInvokeTime = 0, leading = false, maxing = false, trailing = true;
        if (typeof func != "function") {
          throw new TypeError(FUNC_ERROR_TEXT);
        }
        wait = toNumber(wait) || 0;
        if (isObject(options)) {
          leading = !!options.leading;
          maxing = "maxWait" in options;
          maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
          trailing = "trailing" in options ? !!options.trailing : trailing;
        }
        function invokeFunc(time) {
          var args = lastArgs, thisArg = lastThis;
          lastArgs = lastThis = void 0;
          lastInvokeTime = time;
          result = func.apply(thisArg, args);
          return result;
        }
        __name(invokeFunc, "invokeFunc");
        function leadingEdge(time) {
          lastInvokeTime = time;
          timerId = setTimeout(timerExpired, wait);
          return leading ? invokeFunc(time) : result;
        }
        __name(leadingEdge, "leadingEdge");
        function remainingWait(time) {
          var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime, timeWaiting = wait - timeSinceLastCall;
          return maxing ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke) : timeWaiting;
        }
        __name(remainingWait, "remainingWait");
        function shouldInvoke(time) {
          var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime;
          return lastCallTime === void 0 || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
        }
        __name(shouldInvoke, "shouldInvoke");
        function timerExpired() {
          var time = now();
          if (shouldInvoke(time)) {
            return trailingEdge(time);
          }
          timerId = setTimeout(timerExpired, remainingWait(time));
        }
        __name(timerExpired, "timerExpired");
        function trailingEdge(time) {
          timerId = void 0;
          if (trailing && lastArgs) {
            return invokeFunc(time);
          }
          lastArgs = lastThis = void 0;
          return result;
        }
        __name(trailingEdge, "trailingEdge");
        function cancel() {
          if (timerId !== void 0) {
            clearTimeout(timerId);
          }
          lastInvokeTime = 0;
          lastArgs = lastCallTime = lastThis = timerId = void 0;
        }
        __name(cancel, "cancel");
        function flush() {
          return timerId === void 0 ? result : trailingEdge(now());
        }
        __name(flush, "flush");
        function debounced() {
          var time = now(), isInvoking = shouldInvoke(time);
          lastArgs = arguments;
          lastThis = this;
          lastCallTime = time;
          if (isInvoking) {
            if (timerId === void 0) {
              return leadingEdge(lastCallTime);
            }
            if (maxing) {
              clearTimeout(timerId);
              timerId = setTimeout(timerExpired, wait);
              return invokeFunc(lastCallTime);
            }
          }
          if (timerId === void 0) {
            timerId = setTimeout(timerExpired, wait);
          }
          return result;
        }
        __name(debounced, "debounced");
        debounced.cancel = cancel;
        debounced.flush = flush;
        return debounced;
      }
      __name(debounce, "debounce");
      module.exports = debounce;
    }
  });

  // node_modules/lodash/throttle.js
  var require_throttle = __commonJS({
    "node_modules/lodash/throttle.js"(exports, module) {
      var debounce = require_debounce(), isObject = require_isObject();
      var FUNC_ERROR_TEXT = "Expected a function";
      function throttle3(func, wait, options) {
        var leading = true, trailing = true;
        if (typeof func != "function") {
          throw new TypeError(FUNC_ERROR_TEXT);
        }
        if (isObject(options)) {
          leading = "leading" in options ? !!options.leading : leading;
          trailing = "trailing" in options ? !!options.trailing : trailing;
        }
        return debounce(func, wait, {
          "leading": leading,
          "maxWait": wait,
          "trailing": trailing
        });
      }
      __name(throttle3, "throttle");
      module.exports = throttle3;
    }
  });

  // node_modules/lodash/_arrayMap.js
  var require_arrayMap = __commonJS({
    "node_modules/lodash/_arrayMap.js"(exports, module) {
      function arrayMap(array, iteratee) {
        var index = -1, length = array == null ? 0 : array.length, result = Array(length);
        while (++index < length) {
          result[index] = iteratee(array[index], index, array);
        }
        return result;
      }
      __name(arrayMap, "arrayMap");
      module.exports = arrayMap;
    }
  });

  // node_modules/lodash/_listCacheClear.js
  var require_listCacheClear = __commonJS({
    "node_modules/lodash/_listCacheClear.js"(exports, module) {
      function listCacheClear() {
        this.__data__ = [];
        this.size = 0;
      }
      __name(listCacheClear, "listCacheClear");
      module.exports = listCacheClear;
    }
  });

  // node_modules/lodash/eq.js
  var require_eq = __commonJS({
    "node_modules/lodash/eq.js"(exports, module) {
      function eq(value, other) {
        return value === other || value !== value && other !== other;
      }
      __name(eq, "eq");
      module.exports = eq;
    }
  });

  // node_modules/lodash/_assocIndexOf.js
  var require_assocIndexOf = __commonJS({
    "node_modules/lodash/_assocIndexOf.js"(exports, module) {
      var eq = require_eq();
      function assocIndexOf(array, key) {
        var length = array.length;
        while (length--) {
          if (eq(array[length][0], key)) {
            return length;
          }
        }
        return -1;
      }
      __name(assocIndexOf, "assocIndexOf");
      module.exports = assocIndexOf;
    }
  });

  // node_modules/lodash/_listCacheDelete.js
  var require_listCacheDelete = __commonJS({
    "node_modules/lodash/_listCacheDelete.js"(exports, module) {
      var assocIndexOf = require_assocIndexOf();
      var arrayProto = Array.prototype;
      var splice = arrayProto.splice;
      function listCacheDelete(key) {
        var data = this.__data__, index = assocIndexOf(data, key);
        if (index < 0) {
          return false;
        }
        var lastIndex = data.length - 1;
        if (index == lastIndex) {
          data.pop();
        } else {
          splice.call(data, index, 1);
        }
        --this.size;
        return true;
      }
      __name(listCacheDelete, "listCacheDelete");
      module.exports = listCacheDelete;
    }
  });

  // node_modules/lodash/_listCacheGet.js
  var require_listCacheGet = __commonJS({
    "node_modules/lodash/_listCacheGet.js"(exports, module) {
      var assocIndexOf = require_assocIndexOf();
      function listCacheGet(key) {
        var data = this.__data__, index = assocIndexOf(data, key);
        return index < 0 ? void 0 : data[index][1];
      }
      __name(listCacheGet, "listCacheGet");
      module.exports = listCacheGet;
    }
  });

  // node_modules/lodash/_listCacheHas.js
  var require_listCacheHas = __commonJS({
    "node_modules/lodash/_listCacheHas.js"(exports, module) {
      var assocIndexOf = require_assocIndexOf();
      function listCacheHas(key) {
        return assocIndexOf(this.__data__, key) > -1;
      }
      __name(listCacheHas, "listCacheHas");
      module.exports = listCacheHas;
    }
  });

  // node_modules/lodash/_listCacheSet.js
  var require_listCacheSet = __commonJS({
    "node_modules/lodash/_listCacheSet.js"(exports, module) {
      var assocIndexOf = require_assocIndexOf();
      function listCacheSet(key, value) {
        var data = this.__data__, index = assocIndexOf(data, key);
        if (index < 0) {
          ++this.size;
          data.push([key, value]);
        } else {
          data[index][1] = value;
        }
        return this;
      }
      __name(listCacheSet, "listCacheSet");
      module.exports = listCacheSet;
    }
  });

  // node_modules/lodash/_ListCache.js
  var require_ListCache = __commonJS({
    "node_modules/lodash/_ListCache.js"(exports, module) {
      var listCacheClear = require_listCacheClear(), listCacheDelete = require_listCacheDelete(), listCacheGet = require_listCacheGet(), listCacheHas = require_listCacheHas(), listCacheSet = require_listCacheSet();
      function ListCache(entries) {
        var index = -1, length = entries == null ? 0 : entries.length;
        this.clear();
        while (++index < length) {
          var entry = entries[index];
          this.set(entry[0], entry[1]);
        }
      }
      __name(ListCache, "ListCache");
      ListCache.prototype.clear = listCacheClear;
      ListCache.prototype["delete"] = listCacheDelete;
      ListCache.prototype.get = listCacheGet;
      ListCache.prototype.has = listCacheHas;
      ListCache.prototype.set = listCacheSet;
      module.exports = ListCache;
    }
  });

  // node_modules/lodash/_stackClear.js
  var require_stackClear = __commonJS({
    "node_modules/lodash/_stackClear.js"(exports, module) {
      var ListCache = require_ListCache();
      function stackClear() {
        this.__data__ = new ListCache();
        this.size = 0;
      }
      __name(stackClear, "stackClear");
      module.exports = stackClear;
    }
  });

  // node_modules/lodash/_stackDelete.js
  var require_stackDelete = __commonJS({
    "node_modules/lodash/_stackDelete.js"(exports, module) {
      function stackDelete(key) {
        var data = this.__data__, result = data["delete"](key);
        this.size = data.size;
        return result;
      }
      __name(stackDelete, "stackDelete");
      module.exports = stackDelete;
    }
  });

  // node_modules/lodash/_stackGet.js
  var require_stackGet = __commonJS({
    "node_modules/lodash/_stackGet.js"(exports, module) {
      function stackGet(key) {
        return this.__data__.get(key);
      }
      __name(stackGet, "stackGet");
      module.exports = stackGet;
    }
  });

  // node_modules/lodash/_stackHas.js
  var require_stackHas = __commonJS({
    "node_modules/lodash/_stackHas.js"(exports, module) {
      function stackHas(key) {
        return this.__data__.has(key);
      }
      __name(stackHas, "stackHas");
      module.exports = stackHas;
    }
  });

  // node_modules/lodash/isFunction.js
  var require_isFunction = __commonJS({
    "node_modules/lodash/isFunction.js"(exports, module) {
      var baseGetTag = require_baseGetTag(), isObject = require_isObject();
      var asyncTag = "[object AsyncFunction]", funcTag = "[object Function]", genTag = "[object GeneratorFunction]", proxyTag = "[object Proxy]";
      function isFunction(value) {
        if (!isObject(value)) {
          return false;
        }
        var tag = baseGetTag(value);
        return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
      }
      __name(isFunction, "isFunction");
      module.exports = isFunction;
    }
  });

  // node_modules/lodash/_coreJsData.js
  var require_coreJsData = __commonJS({
    "node_modules/lodash/_coreJsData.js"(exports, module) {
      var root = require_root();
      var coreJsData = root["__core-js_shared__"];
      module.exports = coreJsData;
    }
  });

  // node_modules/lodash/_isMasked.js
  var require_isMasked = __commonJS({
    "node_modules/lodash/_isMasked.js"(exports, module) {
      var coreJsData = require_coreJsData();
      var maskSrcKey = function() {
        var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || "");
        return uid ? "Symbol(src)_1." + uid : "";
      }();
      function isMasked(func) {
        return !!maskSrcKey && maskSrcKey in func;
      }
      __name(isMasked, "isMasked");
      module.exports = isMasked;
    }
  });

  // node_modules/lodash/_toSource.js
  var require_toSource = __commonJS({
    "node_modules/lodash/_toSource.js"(exports, module) {
      var funcProto = Function.prototype;
      var funcToString = funcProto.toString;
      function toSource(func) {
        if (func != null) {
          try {
            return funcToString.call(func);
          } catch (e3) {
          }
          try {
            return func + "";
          } catch (e3) {
          }
        }
        return "";
      }
      __name(toSource, "toSource");
      module.exports = toSource;
    }
  });

  // node_modules/lodash/_baseIsNative.js
  var require_baseIsNative = __commonJS({
    "node_modules/lodash/_baseIsNative.js"(exports, module) {
      var isFunction = require_isFunction(), isMasked = require_isMasked(), isObject = require_isObject(), toSource = require_toSource();
      var reRegExpChar = /[\\\\^$.*+?()[\\]{}|]/g;
      var reIsHostCtor = /^\\[object .+?Constructor\\]$/;
      var funcProto = Function.prototype, objectProto = Object.prototype;
      var funcToString = funcProto.toString;
      var hasOwnProperty = objectProto.hasOwnProperty;
      var reIsNative = RegExp(
        "^" + funcToString.call(hasOwnProperty).replace(reRegExpChar, "\\\\$&").replace(/hasOwnProperty|(function).*?(?=\\\\\\()| for .+?(?=\\\\\\])/g, "$1.*?") + "$"
      );
      function baseIsNative(value) {
        if (!isObject(value) || isMasked(value)) {
          return false;
        }
        var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
        return pattern.test(toSource(value));
      }
      __name(baseIsNative, "baseIsNative");
      module.exports = baseIsNative;
    }
  });

  // node_modules/lodash/_getValue.js
  var require_getValue = __commonJS({
    "node_modules/lodash/_getValue.js"(exports, module) {
      function getValue(object, key) {
        return object == null ? void 0 : object[key];
      }
      __name(getValue, "getValue");
      module.exports = getValue;
    }
  });

  // node_modules/lodash/_getNative.js
  var require_getNative = __commonJS({
    "node_modules/lodash/_getNative.js"(exports, module) {
      var baseIsNative = require_baseIsNative(), getValue = require_getValue();
      function getNative(object, key) {
        var value = getValue(object, key);
        return baseIsNative(value) ? value : void 0;
      }
      __name(getNative, "getNative");
      module.exports = getNative;
    }
  });

  // node_modules/lodash/_Map.js
  var require_Map = __commonJS({
    "node_modules/lodash/_Map.js"(exports, module) {
      var getNative = require_getNative(), root = require_root();
      var Map2 = getNative(root, "Map");
      module.exports = Map2;
    }
  });

  // node_modules/lodash/_nativeCreate.js
  var require_nativeCreate = __commonJS({
    "node_modules/lodash/_nativeCreate.js"(exports, module) {
      var getNative = require_getNative();
      var nativeCreate = getNative(Object, "create");
      module.exports = nativeCreate;
    }
  });

  // node_modules/lodash/_hashClear.js
  var require_hashClear = __commonJS({
    "node_modules/lodash/_hashClear.js"(exports, module) {
      var nativeCreate = require_nativeCreate();
      function hashClear() {
        this.__data__ = nativeCreate ? nativeCreate(null) : {};
        this.size = 0;
      }
      __name(hashClear, "hashClear");
      module.exports = hashClear;
    }
  });

  // node_modules/lodash/_hashDelete.js
  var require_hashDelete = __commonJS({
    "node_modules/lodash/_hashDelete.js"(exports, module) {
      function hashDelete(key) {
        var result = this.has(key) && delete this.__data__[key];
        this.size -= result ? 1 : 0;
        return result;
      }
      __name(hashDelete, "hashDelete");
      module.exports = hashDelete;
    }
  });

  // node_modules/lodash/_hashGet.js
  var require_hashGet = __commonJS({
    "node_modules/lodash/_hashGet.js"(exports, module) {
      var nativeCreate = require_nativeCreate();
      var HASH_UNDEFINED = "__lodash_hash_undefined__";
      var objectProto = Object.prototype;
      var hasOwnProperty = objectProto.hasOwnProperty;
      function hashGet(key) {
        var data = this.__data__;
        if (nativeCreate) {
          var result = data[key];
          return result === HASH_UNDEFINED ? void 0 : result;
        }
        return hasOwnProperty.call(data, key) ? data[key] : void 0;
      }
      __name(hashGet, "hashGet");
      module.exports = hashGet;
    }
  });

  // node_modules/lodash/_hashHas.js
  var require_hashHas = __commonJS({
    "node_modules/lodash/_hashHas.js"(exports, module) {
      var nativeCreate = require_nativeCreate();
      var objectProto = Object.prototype;
      var hasOwnProperty = objectProto.hasOwnProperty;
      function hashHas(key) {
        var data = this.__data__;
        return nativeCreate ? data[key] !== void 0 : hasOwnProperty.call(data, key);
      }
      __name(hashHas, "hashHas");
      module.exports = hashHas;
    }
  });

  // node_modules/lodash/_hashSet.js
  var require_hashSet = __commonJS({
    "node_modules/lodash/_hashSet.js"(exports, module) {
      var nativeCreate = require_nativeCreate();
      var HASH_UNDEFINED = "__lodash_hash_undefined__";
      function hashSet(key, value) {
        var data = this.__data__;
        this.size += this.has(key) ? 0 : 1;
        data[key] = nativeCreate && value === void 0 ? HASH_UNDEFINED : value;
        return this;
      }
      __name(hashSet, "hashSet");
      module.exports = hashSet;
    }
  });

  // node_modules/lodash/_Hash.js
  var require_Hash = __commonJS({
    "node_modules/lodash/_Hash.js"(exports, module) {
      var hashClear = require_hashClear(), hashDelete = require_hashDelete(), hashGet = require_hashGet(), hashHas = require_hashHas(), hashSet = require_hashSet();
      function Hash(entries) {
        var index = -1, length = entries == null ? 0 : entries.length;
        this.clear();
        while (++index < length) {
          var entry = entries[index];
          this.set(entry[0], entry[1]);
        }
      }
      __name(Hash, "Hash");
      Hash.prototype.clear = hashClear;
      Hash.prototype["delete"] = hashDelete;
      Hash.prototype.get = hashGet;
      Hash.prototype.has = hashHas;
      Hash.prototype.set = hashSet;
      module.exports = Hash;
    }
  });

  // node_modules/lodash/_mapCacheClear.js
  var require_mapCacheClear = __commonJS({
    "node_modules/lodash/_mapCacheClear.js"(exports, module) {
      var Hash = require_Hash(), ListCache = require_ListCache(), Map2 = require_Map();
      function mapCacheClear() {
        this.size = 0;
        this.__data__ = {
          "hash": new Hash(),
          "map": new (Map2 || ListCache)(),
          "string": new Hash()
        };
      }
      __name(mapCacheClear, "mapCacheClear");
      module.exports = mapCacheClear;
    }
  });

  // node_modules/lodash/_isKeyable.js
  var require_isKeyable = __commonJS({
    "node_modules/lodash/_isKeyable.js"(exports, module) {
      function isKeyable(value) {
        var type = typeof value;
        return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
      }
      __name(isKeyable, "isKeyable");
      module.exports = isKeyable;
    }
  });

  // node_modules/lodash/_getMapData.js
  var require_getMapData = __commonJS({
    "node_modules/lodash/_getMapData.js"(exports, module) {
      var isKeyable = require_isKeyable();
      function getMapData(map, key) {
        var data = map.__data__;
        return isKeyable(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
      }
      __name(getMapData, "getMapData");
      module.exports = getMapData;
    }
  });

  // node_modules/lodash/_mapCacheDelete.js
  var require_mapCacheDelete = __commonJS({
    "node_modules/lodash/_mapCacheDelete.js"(exports, module) {
      var getMapData = require_getMapData();
      function mapCacheDelete(key) {
        var result = getMapData(this, key)["delete"](key);
        this.size -= result ? 1 : 0;
        return result;
      }
      __name(mapCacheDelete, "mapCacheDelete");
      module.exports = mapCacheDelete;
    }
  });

  // node_modules/lodash/_mapCacheGet.js
  var require_mapCacheGet = __commonJS({
    "node_modules/lodash/_mapCacheGet.js"(exports, module) {
      var getMapData = require_getMapData();
      function mapCacheGet(key) {
        return getMapData(this, key).get(key);
      }
      __name(mapCacheGet, "mapCacheGet");
      module.exports = mapCacheGet;
    }
  });

  // node_modules/lodash/_mapCacheHas.js
  var require_mapCacheHas = __commonJS({
    "node_modules/lodash/_mapCacheHas.js"(exports, module) {
      var getMapData = require_getMapData();
      function mapCacheHas(key) {
        return getMapData(this, key).has(key);
      }
      __name(mapCacheHas, "mapCacheHas");
      module.exports = mapCacheHas;
    }
  });

  // node_modules/lodash/_mapCacheSet.js
  var require_mapCacheSet = __commonJS({
    "node_modules/lodash/_mapCacheSet.js"(exports, module) {
      var getMapData = require_getMapData();
      function mapCacheSet(key, value) {
        var data = getMapData(this, key), size = data.size;
        data.set(key, value);
        this.size += data.size == size ? 0 : 1;
        return this;
      }
      __name(mapCacheSet, "mapCacheSet");
      module.exports = mapCacheSet;
    }
  });

  // node_modules/lodash/_MapCache.js
  var require_MapCache = __commonJS({
    "node_modules/lodash/_MapCache.js"(exports, module) {
      var mapCacheClear = require_mapCacheClear(), mapCacheDelete = require_mapCacheDelete(), mapCacheGet = require_mapCacheGet(), mapCacheHas = require_mapCacheHas(), mapCacheSet = require_mapCacheSet();
      function MapCache(entries) {
        var index = -1, length = entries == null ? 0 : entries.length;
        this.clear();
        while (++index < length) {
          var entry = entries[index];
          this.set(entry[0], entry[1]);
        }
      }
      __name(MapCache, "MapCache");
      MapCache.prototype.clear = mapCacheClear;
      MapCache.prototype["delete"] = mapCacheDelete;
      MapCache.prototype.get = mapCacheGet;
      MapCache.prototype.has = mapCacheHas;
      MapCache.prototype.set = mapCacheSet;
      module.exports = MapCache;
    }
  });

  // node_modules/lodash/_stackSet.js
  var require_stackSet = __commonJS({
    "node_modules/lodash/_stackSet.js"(exports, module) {
      var ListCache = require_ListCache(), Map2 = require_Map(), MapCache = require_MapCache();
      var LARGE_ARRAY_SIZE = 200;
      function stackSet(key, value) {
        var data = this.__data__;
        if (data instanceof ListCache) {
          var pairs = data.__data__;
          if (!Map2 || pairs.length < LARGE_ARRAY_SIZE - 1) {
            pairs.push([key, value]);
            this.size = ++data.size;
            return this;
          }
          data = this.__data__ = new MapCache(pairs);
        }
        data.set(key, value);
        this.size = data.size;
        return this;
      }
      __name(stackSet, "stackSet");
      module.exports = stackSet;
    }
  });

  // node_modules/lodash/_Stack.js
  var require_Stack = __commonJS({
    "node_modules/lodash/_Stack.js"(exports, module) {
      var ListCache = require_ListCache(), stackClear = require_stackClear(), stackDelete = require_stackDelete(), stackGet = require_stackGet(), stackHas = require_stackHas(), stackSet = require_stackSet();
      function Stack(entries) {
        var data = this.__data__ = new ListCache(entries);
        this.size = data.size;
      }
      __name(Stack, "Stack");
      Stack.prototype.clear = stackClear;
      Stack.prototype["delete"] = stackDelete;
      Stack.prototype.get = stackGet;
      Stack.prototype.has = stackHas;
      Stack.prototype.set = stackSet;
      module.exports = Stack;
    }
  });

  // node_modules/lodash/_arrayEach.js
  var require_arrayEach = __commonJS({
    "node_modules/lodash/_arrayEach.js"(exports, module) {
      function arrayEach(array, iteratee) {
        var index = -1, length = array == null ? 0 : array.length;
        while (++index < length) {
          if (iteratee(array[index], index, array) === false) {
            break;
          }
        }
        return array;
      }
      __name(arrayEach, "arrayEach");
      module.exports = arrayEach;
    }
  });

  // node_modules/lodash/_defineProperty.js
  var require_defineProperty = __commonJS({
    "node_modules/lodash/_defineProperty.js"(exports, module) {
      var getNative = require_getNative();
      var defineProperty = function() {
        try {
          var func = getNative(Object, "defineProperty");
          func({}, "", {});
          return func;
        } catch (e3) {
        }
      }();
      module.exports = defineProperty;
    }
  });

  // node_modules/lodash/_baseAssignValue.js
  var require_baseAssignValue = __commonJS({
    "node_modules/lodash/_baseAssignValue.js"(exports, module) {
      var defineProperty = require_defineProperty();
      function baseAssignValue(object, key, value) {
        if (key == "__proto__" && defineProperty) {
          defineProperty(object, key, {
            "configurable": true,
            "enumerable": true,
            "value": value,
            "writable": true
          });
        } else {
          object[key] = value;
        }
      }
      __name(baseAssignValue, "baseAssignValue");
      module.exports = baseAssignValue;
    }
  });

  // node_modules/lodash/_assignValue.js
  var require_assignValue = __commonJS({
    "node_modules/lodash/_assignValue.js"(exports, module) {
      var baseAssignValue = require_baseAssignValue(), eq = require_eq();
      var objectProto = Object.prototype;
      var hasOwnProperty = objectProto.hasOwnProperty;
      function assignValue(object, key, value) {
        var objValue = object[key];
        if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) || value === void 0 && !(key in object)) {
          baseAssignValue(object, key, value);
        }
      }
      __name(assignValue, "assignValue");
      module.exports = assignValue;
    }
  });

  // node_modules/lodash/_copyObject.js
  var require_copyObject = __commonJS({
    "node_modules/lodash/_copyObject.js"(exports, module) {
      var assignValue = require_assignValue(), baseAssignValue = require_baseAssignValue();
      function copyObject(source, props, object, customizer) {
        var isNew = !object;
        object || (object = {});
        var index = -1, length = props.length;
        while (++index < length) {
          var key = props[index];
          var newValue = customizer ? customizer(object[key], source[key], key, object, source) : void 0;
          if (newValue === void 0) {
            newValue = source[key];
          }
          if (isNew) {
            baseAssignValue(object, key, newValue);
          } else {
            assignValue(object, key, newValue);
          }
        }
        return object;
      }
      __name(copyObject, "copyObject");
      module.exports = copyObject;
    }
  });

  // node_modules/lodash/_baseTimes.js
  var require_baseTimes = __commonJS({
    "node_modules/lodash/_baseTimes.js"(exports, module) {
      function baseTimes(n2, iteratee) {
        var index = -1, result = Array(n2);
        while (++index < n2) {
          result[index] = iteratee(index);
        }
        return result;
      }
      __name(baseTimes, "baseTimes");
      module.exports = baseTimes;
    }
  });

  // node_modules/lodash/_baseIsArguments.js
  var require_baseIsArguments = __commonJS({
    "node_modules/lodash/_baseIsArguments.js"(exports, module) {
      var baseGetTag = require_baseGetTag(), isObjectLike = require_isObjectLike();
      var argsTag = "[object Arguments]";
      function baseIsArguments(value) {
        return isObjectLike(value) && baseGetTag(value) == argsTag;
      }
      __name(baseIsArguments, "baseIsArguments");
      module.exports = baseIsArguments;
    }
  });

  // node_modules/lodash/isArguments.js
  var require_isArguments = __commonJS({
    "node_modules/lodash/isArguments.js"(exports, module) {
      var baseIsArguments = require_baseIsArguments(), isObjectLike = require_isObjectLike();
      var objectProto = Object.prototype;
      var hasOwnProperty = objectProto.hasOwnProperty;
      var propertyIsEnumerable = objectProto.propertyIsEnumerable;
      var isArguments = baseIsArguments(/* @__PURE__ */ function() {
        return arguments;
      }()) ? baseIsArguments : function(value) {
        return isObjectLike(value) && hasOwnProperty.call(value, "callee") && !propertyIsEnumerable.call(value, "callee");
      };
      module.exports = isArguments;
    }
  });

  // node_modules/lodash/isArray.js
  var require_isArray = __commonJS({
    "node_modules/lodash/isArray.js"(exports, module) {
      var isArray = Array.isArray;
      module.exports = isArray;
    }
  });

  // node_modules/lodash/stubFalse.js
  var require_stubFalse = __commonJS({
    "node_modules/lodash/stubFalse.js"(exports, module) {
      function stubFalse() {
        return false;
      }
      __name(stubFalse, "stubFalse");
      module.exports = stubFalse;
    }
  });

  // node_modules/lodash/isBuffer.js
  var require_isBuffer = __commonJS({
    "node_modules/lodash/isBuffer.js"(exports, module) {
      var root = require_root(), stubFalse = require_stubFalse();
      var freeExports = typeof exports == "object" && exports && !exports.nodeType && exports;
      var freeModule = freeExports && typeof module == "object" && module && !module.nodeType && module;
      var moduleExports = freeModule && freeModule.exports === freeExports;
      var Buffer2 = moduleExports ? root.Buffer : void 0;
      var nativeIsBuffer = Buffer2 ? Buffer2.isBuffer : void 0;
      var isBuffer = nativeIsBuffer || stubFalse;
      module.exports = isBuffer;
    }
  });

  // node_modules/lodash/_isIndex.js
  var require_isIndex = __commonJS({
    "node_modules/lodash/_isIndex.js"(exports, module) {
      var MAX_SAFE_INTEGER = 9007199254740991;
      var reIsUint = /^(?:0|[1-9]\\d*)$/;
      function isIndex(value, length) {
        var type = typeof value;
        length = length == null ? MAX_SAFE_INTEGER : length;
        return !!length && (type == "number" || type != "symbol" && reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length);
      }
      __name(isIndex, "isIndex");
      module.exports = isIndex;
    }
  });

  // node_modules/lodash/isLength.js
  var require_isLength = __commonJS({
    "node_modules/lodash/isLength.js"(exports, module) {
      var MAX_SAFE_INTEGER = 9007199254740991;
      function isLength(value) {
        return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
      }
      __name(isLength, "isLength");
      module.exports = isLength;
    }
  });

  // node_modules/lodash/_baseIsTypedArray.js
  var require_baseIsTypedArray = __commonJS({
    "node_modules/lodash/_baseIsTypedArray.js"(exports, module) {
      var baseGetTag = require_baseGetTag(), isLength = require_isLength(), isObjectLike = require_isObjectLike();
      var argsTag = "[object Arguments]", arrayTag = "[object Array]", boolTag = "[object Boolean]", dateTag = "[object Date]", errorTag = "[object Error]", funcTag = "[object Function]", mapTag = "[object Map]", numberTag = "[object Number]", objectTag = "[object Object]", regexpTag = "[object RegExp]", setTag = "[object Set]", stringTag = "[object String]", weakMapTag = "[object WeakMap]";
      var arrayBufferTag = "[object ArrayBuffer]", dataViewTag = "[object DataView]", float32Tag = "[object Float32Array]", float64Tag = "[object Float64Array]", int8Tag = "[object Int8Array]", int16Tag = "[object Int16Array]", int32Tag = "[object Int32Array]", uint8Tag = "[object Uint8Array]", uint8ClampedTag = "[object Uint8ClampedArray]", uint16Tag = "[object Uint16Array]", uint32Tag = "[object Uint32Array]";
      var typedArrayTags = {};
      typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
      typedArrayTags[argsTag] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;
      function baseIsTypedArray(value) {
        return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
      }
      __name(baseIsTypedArray, "baseIsTypedArray");
      module.exports = baseIsTypedArray;
    }
  });

  // node_modules/lodash/_baseUnary.js
  var require_baseUnary = __commonJS({
    "node_modules/lodash/_baseUnary.js"(exports, module) {
      function baseUnary(func) {
        return function(value) {
          return func(value);
        };
      }
      __name(baseUnary, "baseUnary");
      module.exports = baseUnary;
    }
  });

  // node_modules/lodash/_nodeUtil.js
  var require_nodeUtil = __commonJS({
    "node_modules/lodash/_nodeUtil.js"(exports, module) {
      var freeGlobal = require_freeGlobal();
      var freeExports = typeof exports == "object" && exports && !exports.nodeType && exports;
      var freeModule = freeExports && typeof module == "object" && module && !module.nodeType && module;
      var moduleExports = freeModule && freeModule.exports === freeExports;
      var freeProcess = moduleExports && freeGlobal.process;
      var nodeUtil = function() {
        try {
          var types = freeModule && freeModule.require && freeModule.require("util").types;
          if (types) {
            return types;
          }
          return freeProcess && freeProcess.binding && freeProcess.binding("util");
        } catch (e3) {
        }
      }();
      module.exports = nodeUtil;
    }
  });

  // node_modules/lodash/isTypedArray.js
  var require_isTypedArray = __commonJS({
    "node_modules/lodash/isTypedArray.js"(exports, module) {
      var baseIsTypedArray = require_baseIsTypedArray(), baseUnary = require_baseUnary(), nodeUtil = require_nodeUtil();
      var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;
      var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
      module.exports = isTypedArray;
    }
  });

  // node_modules/lodash/_arrayLikeKeys.js
  var require_arrayLikeKeys = __commonJS({
    "node_modules/lodash/_arrayLikeKeys.js"(exports, module) {
      var baseTimes = require_baseTimes(), isArguments = require_isArguments(), isArray = require_isArray(), isBuffer = require_isBuffer(), isIndex = require_isIndex(), isTypedArray = require_isTypedArray();
      var objectProto = Object.prototype;
      var hasOwnProperty = objectProto.hasOwnProperty;
      function arrayLikeKeys(value, inherited) {
        var isArr = isArray(value), isArg = !isArr && isArguments(value), isBuff = !isArr && !isArg && isBuffer(value), isType = !isArr && !isArg && !isBuff && isTypedArray(value), skipIndexes = isArr || isArg || isBuff || isType, result = skipIndexes ? baseTimes(value.length, String) : [], length = result.length;
        for (var key in value) {
          if ((inherited || hasOwnProperty.call(value, key)) && !(skipIndexes && // Safari 9 has enumerable \`arguments.length\` in strict mode.
          (key == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
          isBuff && (key == "offset" || key == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
          isType && (key == "buffer" || key == "byteLength" || key == "byteOffset") || // Skip index properties.
          isIndex(key, length)))) {
            result.push(key);
          }
        }
        return result;
      }
      __name(arrayLikeKeys, "arrayLikeKeys");
      module.exports = arrayLikeKeys;
    }
  });

  // node_modules/lodash/_isPrototype.js
  var require_isPrototype = __commonJS({
    "node_modules/lodash/_isPrototype.js"(exports, module) {
      var objectProto = Object.prototype;
      function isPrototype(value) {
        var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto;
        return value === proto;
      }
      __name(isPrototype, "isPrototype");
      module.exports = isPrototype;
    }
  });

  // node_modules/lodash/_overArg.js
  var require_overArg = __commonJS({
    "node_modules/lodash/_overArg.js"(exports, module) {
      function overArg(func, transform) {
        return function(arg) {
          return func(transform(arg));
        };
      }
      __name(overArg, "overArg");
      module.exports = overArg;
    }
  });

  // node_modules/lodash/_nativeKeys.js
  var require_nativeKeys = __commonJS({
    "node_modules/lodash/_nativeKeys.js"(exports, module) {
      var overArg = require_overArg();
      var nativeKeys = overArg(Object.keys, Object);
      module.exports = nativeKeys;
    }
  });

  // node_modules/lodash/_baseKeys.js
  var require_baseKeys = __commonJS({
    "node_modules/lodash/_baseKeys.js"(exports, module) {
      var isPrototype = require_isPrototype(), nativeKeys = require_nativeKeys();
      var objectProto = Object.prototype;
      var hasOwnProperty = objectProto.hasOwnProperty;
      function baseKeys(object) {
        if (!isPrototype(object)) {
          return nativeKeys(object);
        }
        var result = [];
        for (var key in Object(object)) {
          if (hasOwnProperty.call(object, key) && key != "constructor") {
            result.push(key);
          }
        }
        return result;
      }
      __name(baseKeys, "baseKeys");
      module.exports = baseKeys;
    }
  });

  // node_modules/lodash/isArrayLike.js
  var require_isArrayLike = __commonJS({
    "node_modules/lodash/isArrayLike.js"(exports, module) {
      var isFunction = require_isFunction(), isLength = require_isLength();
      function isArrayLike(value) {
        return value != null && isLength(value.length) && !isFunction(value);
      }
      __name(isArrayLike, "isArrayLike");
      module.exports = isArrayLike;
    }
  });

  // node_modules/lodash/keys.js
  var require_keys = __commonJS({
    "node_modules/lodash/keys.js"(exports, module) {
      var arrayLikeKeys = require_arrayLikeKeys(), baseKeys = require_baseKeys(), isArrayLike = require_isArrayLike();
      function keys(object) {
        return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
      }
      __name(keys, "keys");
      module.exports = keys;
    }
  });

  // node_modules/lodash/_baseAssign.js
  var require_baseAssign = __commonJS({
    "node_modules/lodash/_baseAssign.js"(exports, module) {
      var copyObject = require_copyObject(), keys = require_keys();
      function baseAssign(object, source) {
        return object && copyObject(source, keys(source), object);
      }
      __name(baseAssign, "baseAssign");
      module.exports = baseAssign;
    }
  });

  // node_modules/lodash/_nativeKeysIn.js
  var require_nativeKeysIn = __commonJS({
    "node_modules/lodash/_nativeKeysIn.js"(exports, module) {
      function nativeKeysIn(object) {
        var result = [];
        if (object != null) {
          for (var key in Object(object)) {
            result.push(key);
          }
        }
        return result;
      }
      __name(nativeKeysIn, "nativeKeysIn");
      module.exports = nativeKeysIn;
    }
  });

  // node_modules/lodash/_baseKeysIn.js
  var require_baseKeysIn = __commonJS({
    "node_modules/lodash/_baseKeysIn.js"(exports, module) {
      var isObject = require_isObject(), isPrototype = require_isPrototype(), nativeKeysIn = require_nativeKeysIn();
      var objectProto = Object.prototype;
      var hasOwnProperty = objectProto.hasOwnProperty;
      function baseKeysIn(object) {
        if (!isObject(object)) {
          return nativeKeysIn(object);
        }
        var isProto = isPrototype(object), result = [];
        for (var key in object) {
          if (!(key == "constructor" && (isProto || !hasOwnProperty.call(object, key)))) {
            result.push(key);
          }
        }
        return result;
      }
      __name(baseKeysIn, "baseKeysIn");
      module.exports = baseKeysIn;
    }
  });

  // node_modules/lodash/keysIn.js
  var require_keysIn = __commonJS({
    "node_modules/lodash/keysIn.js"(exports, module) {
      var arrayLikeKeys = require_arrayLikeKeys(), baseKeysIn = require_baseKeysIn(), isArrayLike = require_isArrayLike();
      function keysIn(object) {
        return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
      }
      __name(keysIn, "keysIn");
      module.exports = keysIn;
    }
  });

  // node_modules/lodash/_baseAssignIn.js
  var require_baseAssignIn = __commonJS({
    "node_modules/lodash/_baseAssignIn.js"(exports, module) {
      var copyObject = require_copyObject(), keysIn = require_keysIn();
      function baseAssignIn(object, source) {
        return object && copyObject(source, keysIn(source), object);
      }
      __name(baseAssignIn, "baseAssignIn");
      module.exports = baseAssignIn;
    }
  });

  // node_modules/lodash/_cloneBuffer.js
  var require_cloneBuffer = __commonJS({
    "node_modules/lodash/_cloneBuffer.js"(exports, module) {
      var root = require_root();
      var freeExports = typeof exports == "object" && exports && !exports.nodeType && exports;
      var freeModule = freeExports && typeof module == "object" && module && !module.nodeType && module;
      var moduleExports = freeModule && freeModule.exports === freeExports;
      var Buffer2 = moduleExports ? root.Buffer : void 0, allocUnsafe = Buffer2 ? Buffer2.allocUnsafe : void 0;
      function cloneBuffer(buffer, isDeep) {
        if (isDeep) {
          return buffer.slice();
        }
        var length = buffer.length, result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);
        buffer.copy(result);
        return result;
      }
      __name(cloneBuffer, "cloneBuffer");
      module.exports = cloneBuffer;
    }
  });

  // node_modules/lodash/_copyArray.js
  var require_copyArray = __commonJS({
    "node_modules/lodash/_copyArray.js"(exports, module) {
      function copyArray(source, array) {
        var index = -1, length = source.length;
        array || (array = Array(length));
        while (++index < length) {
          array[index] = source[index];
        }
        return array;
      }
      __name(copyArray, "copyArray");
      module.exports = copyArray;
    }
  });

  // node_modules/lodash/_arrayFilter.js
  var require_arrayFilter = __commonJS({
    "node_modules/lodash/_arrayFilter.js"(exports, module) {
      function arrayFilter(array, predicate) {
        var index = -1, length = array == null ? 0 : array.length, resIndex = 0, result = [];
        while (++index < length) {
          var value = array[index];
          if (predicate(value, index, array)) {
            result[resIndex++] = value;
          }
        }
        return result;
      }
      __name(arrayFilter, "arrayFilter");
      module.exports = arrayFilter;
    }
  });

  // node_modules/lodash/stubArray.js
  var require_stubArray = __commonJS({
    "node_modules/lodash/stubArray.js"(exports, module) {
      function stubArray() {
        return [];
      }
      __name(stubArray, "stubArray");
      module.exports = stubArray;
    }
  });

  // node_modules/lodash/_getSymbols.js
  var require_getSymbols = __commonJS({
    "node_modules/lodash/_getSymbols.js"(exports, module) {
      var arrayFilter = require_arrayFilter(), stubArray = require_stubArray();
      var objectProto = Object.prototype;
      var propertyIsEnumerable = objectProto.propertyIsEnumerable;
      var nativeGetSymbols = Object.getOwnPropertySymbols;
      var getSymbols = !nativeGetSymbols ? stubArray : function(object) {
        if (object == null) {
          return [];
        }
        object = Object(object);
        return arrayFilter(nativeGetSymbols(object), function(symbol) {
          return propertyIsEnumerable.call(object, symbol);
        });
      };
      module.exports = getSymbols;
    }
  });

  // node_modules/lodash/_copySymbols.js
  var require_copySymbols = __commonJS({
    "node_modules/lodash/_copySymbols.js"(exports, module) {
      var copyObject = require_copyObject(), getSymbols = require_getSymbols();
      function copySymbols(source, object) {
        return copyObject(source, getSymbols(source), object);
      }
      __name(copySymbols, "copySymbols");
      module.exports = copySymbols;
    }
  });

  // node_modules/lodash/_arrayPush.js
  var require_arrayPush = __commonJS({
    "node_modules/lodash/_arrayPush.js"(exports, module) {
      function arrayPush(array, values) {
        var index = -1, length = values.length, offset = array.length;
        while (++index < length) {
          array[offset + index] = values[index];
        }
        return array;
      }
      __name(arrayPush, "arrayPush");
      module.exports = arrayPush;
    }
  });

  // node_modules/lodash/_getPrototype.js
  var require_getPrototype = __commonJS({
    "node_modules/lodash/_getPrototype.js"(exports, module) {
      var overArg = require_overArg();
      var getPrototype = overArg(Object.getPrototypeOf, Object);
      module.exports = getPrototype;
    }
  });

  // node_modules/lodash/_getSymbolsIn.js
  var require_getSymbolsIn = __commonJS({
    "node_modules/lodash/_getSymbolsIn.js"(exports, module) {
      var arrayPush = require_arrayPush(), getPrototype = require_getPrototype(), getSymbols = require_getSymbols(), stubArray = require_stubArray();
      var nativeGetSymbols = Object.getOwnPropertySymbols;
      var getSymbolsIn = !nativeGetSymbols ? stubArray : function(object) {
        var result = [];
        while (object) {
          arrayPush(result, getSymbols(object));
          object = getPrototype(object);
        }
        return result;
      };
      module.exports = getSymbolsIn;
    }
  });

  // node_modules/lodash/_copySymbolsIn.js
  var require_copySymbolsIn = __commonJS({
    "node_modules/lodash/_copySymbolsIn.js"(exports, module) {
      var copyObject = require_copyObject(), getSymbolsIn = require_getSymbolsIn();
      function copySymbolsIn(source, object) {
        return copyObject(source, getSymbolsIn(source), object);
      }
      __name(copySymbolsIn, "copySymbolsIn");
      module.exports = copySymbolsIn;
    }
  });

  // node_modules/lodash/_baseGetAllKeys.js
  var require_baseGetAllKeys = __commonJS({
    "node_modules/lodash/_baseGetAllKeys.js"(exports, module) {
      var arrayPush = require_arrayPush(), isArray = require_isArray();
      function baseGetAllKeys(object, keysFunc, symbolsFunc) {
        var result = keysFunc(object);
        return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
      }
      __name(baseGetAllKeys, "baseGetAllKeys");
      module.exports = baseGetAllKeys;
    }
  });

  // node_modules/lodash/_getAllKeys.js
  var require_getAllKeys = __commonJS({
    "node_modules/lodash/_getAllKeys.js"(exports, module) {
      var baseGetAllKeys = require_baseGetAllKeys(), getSymbols = require_getSymbols(), keys = require_keys();
      function getAllKeys(object) {
        return baseGetAllKeys(object, keys, getSymbols);
      }
      __name(getAllKeys, "getAllKeys");
      module.exports = getAllKeys;
    }
  });

  // node_modules/lodash/_getAllKeysIn.js
  var require_getAllKeysIn = __commonJS({
    "node_modules/lodash/_getAllKeysIn.js"(exports, module) {
      var baseGetAllKeys = require_baseGetAllKeys(), getSymbolsIn = require_getSymbolsIn(), keysIn = require_keysIn();
      function getAllKeysIn(object) {
        return baseGetAllKeys(object, keysIn, getSymbolsIn);
      }
      __name(getAllKeysIn, "getAllKeysIn");
      module.exports = getAllKeysIn;
    }
  });

  // node_modules/lodash/_DataView.js
  var require_DataView = __commonJS({
    "node_modules/lodash/_DataView.js"(exports, module) {
      var getNative = require_getNative(), root = require_root();
      var DataView = getNative(root, "DataView");
      module.exports = DataView;
    }
  });

  // node_modules/lodash/_Promise.js
  var require_Promise = __commonJS({
    "node_modules/lodash/_Promise.js"(exports, module) {
      var getNative = require_getNative(), root = require_root();
      var Promise2 = getNative(root, "Promise");
      module.exports = Promise2;
    }
  });

  // node_modules/lodash/_Set.js
  var require_Set = __commonJS({
    "node_modules/lodash/_Set.js"(exports, module) {
      var getNative = require_getNative(), root = require_root();
      var Set2 = getNative(root, "Set");
      module.exports = Set2;
    }
  });

  // node_modules/lodash/_WeakMap.js
  var require_WeakMap = __commonJS({
    "node_modules/lodash/_WeakMap.js"(exports, module) {
      var getNative = require_getNative(), root = require_root();
      var WeakMap2 = getNative(root, "WeakMap");
      module.exports = WeakMap2;
    }
  });

  // node_modules/lodash/_getTag.js
  var require_getTag = __commonJS({
    "node_modules/lodash/_getTag.js"(exports, module) {
      var DataView = require_DataView(), Map2 = require_Map(), Promise2 = require_Promise(), Set2 = require_Set(), WeakMap2 = require_WeakMap(), baseGetTag = require_baseGetTag(), toSource = require_toSource();
      var mapTag = "[object Map]", objectTag = "[object Object]", promiseTag = "[object Promise]", setTag = "[object Set]", weakMapTag = "[object WeakMap]";
      var dataViewTag = "[object DataView]";
      var dataViewCtorString = toSource(DataView), mapCtorString = toSource(Map2), promiseCtorString = toSource(Promise2), setCtorString = toSource(Set2), weakMapCtorString = toSource(WeakMap2);
      var getTag = baseGetTag;
      if (DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag || Map2 && getTag(new Map2()) != mapTag || Promise2 && getTag(Promise2.resolve()) != promiseTag || Set2 && getTag(new Set2()) != setTag || WeakMap2 && getTag(new WeakMap2()) != weakMapTag) {
        getTag = /* @__PURE__ */ __name(function(value) {
          var result = baseGetTag(value), Ctor = result == objectTag ? value.constructor : void 0, ctorString = Ctor ? toSource(Ctor) : "";
          if (ctorString) {
            switch (ctorString) {
              case dataViewCtorString:
                return dataViewTag;
              case mapCtorString:
                return mapTag;
              case promiseCtorString:
                return promiseTag;
              case setCtorString:
                return setTag;
              case weakMapCtorString:
                return weakMapTag;
            }
          }
          return result;
        }, "getTag");
      }
      module.exports = getTag;
    }
  });

  // node_modules/lodash/_initCloneArray.js
  var require_initCloneArray = __commonJS({
    "node_modules/lodash/_initCloneArray.js"(exports, module) {
      var objectProto = Object.prototype;
      var hasOwnProperty = objectProto.hasOwnProperty;
      function initCloneArray(array) {
        var length = array.length, result = new array.constructor(length);
        if (length && typeof array[0] == "string" && hasOwnProperty.call(array, "index")) {
          result.index = array.index;
          result.input = array.input;
        }
        return result;
      }
      __name(initCloneArray, "initCloneArray");
      module.exports = initCloneArray;
    }
  });

  // node_modules/lodash/_Uint8Array.js
  var require_Uint8Array = __commonJS({
    "node_modules/lodash/_Uint8Array.js"(exports, module) {
      var root = require_root();
      var Uint8Array2 = root.Uint8Array;
      module.exports = Uint8Array2;
    }
  });

  // node_modules/lodash/_cloneArrayBuffer.js
  var require_cloneArrayBuffer = __commonJS({
    "node_modules/lodash/_cloneArrayBuffer.js"(exports, module) {
      var Uint8Array2 = require_Uint8Array();
      function cloneArrayBuffer(arrayBuffer) {
        var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
        new Uint8Array2(result).set(new Uint8Array2(arrayBuffer));
        return result;
      }
      __name(cloneArrayBuffer, "cloneArrayBuffer");
      module.exports = cloneArrayBuffer;
    }
  });

  // node_modules/lodash/_cloneDataView.js
  var require_cloneDataView = __commonJS({
    "node_modules/lodash/_cloneDataView.js"(exports, module) {
      var cloneArrayBuffer = require_cloneArrayBuffer();
      function cloneDataView(dataView, isDeep) {
        var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
        return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
      }
      __name(cloneDataView, "cloneDataView");
      module.exports = cloneDataView;
    }
  });

  // node_modules/lodash/_cloneRegExp.js
  var require_cloneRegExp = __commonJS({
    "node_modules/lodash/_cloneRegExp.js"(exports, module) {
      var reFlags = /\\w*$/;
      function cloneRegExp(regexp) {
        var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
        result.lastIndex = regexp.lastIndex;
        return result;
      }
      __name(cloneRegExp, "cloneRegExp");
      module.exports = cloneRegExp;
    }
  });

  // node_modules/lodash/_cloneSymbol.js
  var require_cloneSymbol = __commonJS({
    "node_modules/lodash/_cloneSymbol.js"(exports, module) {
      var Symbol2 = require_Symbol();
      var symbolProto = Symbol2 ? Symbol2.prototype : void 0, symbolValueOf = symbolProto ? symbolProto.valueOf : void 0;
      function cloneSymbol(symbol) {
        return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
      }
      __name(cloneSymbol, "cloneSymbol");
      module.exports = cloneSymbol;
    }
  });

  // node_modules/lodash/_cloneTypedArray.js
  var require_cloneTypedArray = __commonJS({
    "node_modules/lodash/_cloneTypedArray.js"(exports, module) {
      var cloneArrayBuffer = require_cloneArrayBuffer();
      function cloneTypedArray(typedArray, isDeep) {
        var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
        return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
      }
      __name(cloneTypedArray, "cloneTypedArray");
      module.exports = cloneTypedArray;
    }
  });

  // node_modules/lodash/_initCloneByTag.js
  var require_initCloneByTag = __commonJS({
    "node_modules/lodash/_initCloneByTag.js"(exports, module) {
      var cloneArrayBuffer = require_cloneArrayBuffer(), cloneDataView = require_cloneDataView(), cloneRegExp = require_cloneRegExp(), cloneSymbol = require_cloneSymbol(), cloneTypedArray = require_cloneTypedArray();
      var boolTag = "[object Boolean]", dateTag = "[object Date]", mapTag = "[object Map]", numberTag = "[object Number]", regexpTag = "[object RegExp]", setTag = "[object Set]", stringTag = "[object String]", symbolTag = "[object Symbol]";
      var arrayBufferTag = "[object ArrayBuffer]", dataViewTag = "[object DataView]", float32Tag = "[object Float32Array]", float64Tag = "[object Float64Array]", int8Tag = "[object Int8Array]", int16Tag = "[object Int16Array]", int32Tag = "[object Int32Array]", uint8Tag = "[object Uint8Array]", uint8ClampedTag = "[object Uint8ClampedArray]", uint16Tag = "[object Uint16Array]", uint32Tag = "[object Uint32Array]";
      function initCloneByTag(object, tag, isDeep) {
        var Ctor = object.constructor;
        switch (tag) {
          case arrayBufferTag:
            return cloneArrayBuffer(object);
          case boolTag:
          case dateTag:
            return new Ctor(+object);
          case dataViewTag:
            return cloneDataView(object, isDeep);
          case float32Tag:
          case float64Tag:
          case int8Tag:
          case int16Tag:
          case int32Tag:
          case uint8Tag:
          case uint8ClampedTag:
          case uint16Tag:
          case uint32Tag:
            return cloneTypedArray(object, isDeep);
          case mapTag:
            return new Ctor();
          case numberTag:
          case stringTag:
            return new Ctor(object);
          case regexpTag:
            return cloneRegExp(object);
          case setTag:
            return new Ctor();
          case symbolTag:
            return cloneSymbol(object);
        }
      }
      __name(initCloneByTag, "initCloneByTag");
      module.exports = initCloneByTag;
    }
  });

  // node_modules/lodash/_baseCreate.js
  var require_baseCreate = __commonJS({
    "node_modules/lodash/_baseCreate.js"(exports, module) {
      var isObject = require_isObject();
      var objectCreate = Object.create;
      var baseCreate = /* @__PURE__ */ function() {
        function object() {
        }
        __name(object, "object");
        return function(proto) {
          if (!isObject(proto)) {
            return {};
          }
          if (objectCreate) {
            return objectCreate(proto);
          }
          object.prototype = proto;
          var result = new object();
          object.prototype = void 0;
          return result;
        };
      }();
      module.exports = baseCreate;
    }
  });

  // node_modules/lodash/_initCloneObject.js
  var require_initCloneObject = __commonJS({
    "node_modules/lodash/_initCloneObject.js"(exports, module) {
      var baseCreate = require_baseCreate(), getPrototype = require_getPrototype(), isPrototype = require_isPrototype();
      function initCloneObject(object) {
        return typeof object.constructor == "function" && !isPrototype(object) ? baseCreate(getPrototype(object)) : {};
      }
      __name(initCloneObject, "initCloneObject");
      module.exports = initCloneObject;
    }
  });

  // node_modules/lodash/_baseIsMap.js
  var require_baseIsMap = __commonJS({
    "node_modules/lodash/_baseIsMap.js"(exports, module) {
      var getTag = require_getTag(), isObjectLike = require_isObjectLike();
      var mapTag = "[object Map]";
      function baseIsMap(value) {
        return isObjectLike(value) && getTag(value) == mapTag;
      }
      __name(baseIsMap, "baseIsMap");
      module.exports = baseIsMap;
    }
  });

  // node_modules/lodash/isMap.js
  var require_isMap = __commonJS({
    "node_modules/lodash/isMap.js"(exports, module) {
      var baseIsMap = require_baseIsMap(), baseUnary = require_baseUnary(), nodeUtil = require_nodeUtil();
      var nodeIsMap = nodeUtil && nodeUtil.isMap;
      var isMap = nodeIsMap ? baseUnary(nodeIsMap) : baseIsMap;
      module.exports = isMap;
    }
  });

  // node_modules/lodash/_baseIsSet.js
  var require_baseIsSet = __commonJS({
    "node_modules/lodash/_baseIsSet.js"(exports, module) {
      var getTag = require_getTag(), isObjectLike = require_isObjectLike();
      var setTag = "[object Set]";
      function baseIsSet(value) {
        return isObjectLike(value) && getTag(value) == setTag;
      }
      __name(baseIsSet, "baseIsSet");
      module.exports = baseIsSet;
    }
  });

  // node_modules/lodash/isSet.js
  var require_isSet = __commonJS({
    "node_modules/lodash/isSet.js"(exports, module) {
      var baseIsSet = require_baseIsSet(), baseUnary = require_baseUnary(), nodeUtil = require_nodeUtil();
      var nodeIsSet = nodeUtil && nodeUtil.isSet;
      var isSet = nodeIsSet ? baseUnary(nodeIsSet) : baseIsSet;
      module.exports = isSet;
    }
  });

  // node_modules/lodash/_baseClone.js
  var require_baseClone = __commonJS({
    "node_modules/lodash/_baseClone.js"(exports, module) {
      var Stack = require_Stack(), arrayEach = require_arrayEach(), assignValue = require_assignValue(), baseAssign = require_baseAssign(), baseAssignIn = require_baseAssignIn(), cloneBuffer = require_cloneBuffer(), copyArray = require_copyArray(), copySymbols = require_copySymbols(), copySymbolsIn = require_copySymbolsIn(), getAllKeys = require_getAllKeys(), getAllKeysIn = require_getAllKeysIn(), getTag = require_getTag(), initCloneArray = require_initCloneArray(), initCloneByTag = require_initCloneByTag(), initCloneObject = require_initCloneObject(), isArray = require_isArray(), isBuffer = require_isBuffer(), isMap = require_isMap(), isObject = require_isObject(), isSet = require_isSet(), keys = require_keys(), keysIn = require_keysIn();
      var CLONE_DEEP_FLAG = 1, CLONE_FLAT_FLAG = 2, CLONE_SYMBOLS_FLAG = 4;
      var argsTag = "[object Arguments]", arrayTag = "[object Array]", boolTag = "[object Boolean]", dateTag = "[object Date]", errorTag = "[object Error]", funcTag = "[object Function]", genTag = "[object GeneratorFunction]", mapTag = "[object Map]", numberTag = "[object Number]", objectTag = "[object Object]", regexpTag = "[object RegExp]", setTag = "[object Set]", stringTag = "[object String]", symbolTag = "[object Symbol]", weakMapTag = "[object WeakMap]";
      var arrayBufferTag = "[object ArrayBuffer]", dataViewTag = "[object DataView]", float32Tag = "[object Float32Array]", float64Tag = "[object Float64Array]", int8Tag = "[object Int8Array]", int16Tag = "[object Int16Array]", int32Tag = "[object Int32Array]", uint8Tag = "[object Uint8Array]", uint8ClampedTag = "[object Uint8ClampedArray]", uint16Tag = "[object Uint16Array]", uint32Tag = "[object Uint32Array]";
      var cloneableTags = {};
      cloneableTags[argsTag] = cloneableTags[arrayTag] = cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] = cloneableTags[boolTag] = cloneableTags[dateTag] = cloneableTags[float32Tag] = cloneableTags[float64Tag] = cloneableTags[int8Tag] = cloneableTags[int16Tag] = cloneableTags[int32Tag] = cloneableTags[mapTag] = cloneableTags[numberTag] = cloneableTags[objectTag] = cloneableTags[regexpTag] = cloneableTags[setTag] = cloneableTags[stringTag] = cloneableTags[symbolTag] = cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] = cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
      cloneableTags[errorTag] = cloneableTags[funcTag] = cloneableTags[weakMapTag] = false;
      function baseClone(value, bitmask, customizer, key, object, stack) {
        var result, isDeep = bitmask & CLONE_DEEP_FLAG, isFlat = bitmask & CLONE_FLAT_FLAG, isFull = bitmask & CLONE_SYMBOLS_FLAG;
        if (customizer) {
          result = object ? customizer(value, key, object, stack) : customizer(value);
        }
        if (result !== void 0) {
          return result;
        }
        if (!isObject(value)) {
          return value;
        }
        var isArr = isArray(value);
        if (isArr) {
          result = initCloneArray(value);
          if (!isDeep) {
            return copyArray(value, result);
          }
        } else {
          var tag = getTag(value), isFunc = tag == funcTag || tag == genTag;
          if (isBuffer(value)) {
            return cloneBuffer(value, isDeep);
          }
          if (tag == objectTag || tag == argsTag || isFunc && !object) {
            result = isFlat || isFunc ? {} : initCloneObject(value);
            if (!isDeep) {
              return isFlat ? copySymbolsIn(value, baseAssignIn(result, value)) : copySymbols(value, baseAssign(result, value));
            }
          } else {
            if (!cloneableTags[tag]) {
              return object ? value : {};
            }
            result = initCloneByTag(value, tag, isDeep);
          }
        }
        stack || (stack = new Stack());
        var stacked = stack.get(value);
        if (stacked) {
          return stacked;
        }
        stack.set(value, result);
        if (isSet(value)) {
          value.forEach(function(subValue) {
            result.add(baseClone(subValue, bitmask, customizer, subValue, value, stack));
          });
        } else if (isMap(value)) {
          value.forEach(function(subValue, key2) {
            result.set(key2, baseClone(subValue, bitmask, customizer, key2, value, stack));
          });
        }
        var keysFunc = isFull ? isFlat ? getAllKeysIn : getAllKeys : isFlat ? keysIn : keys;
        var props = isArr ? void 0 : keysFunc(value);
        arrayEach(props || value, function(subValue, key2) {
          if (props) {
            key2 = subValue;
            subValue = value[key2];
          }
          assignValue(result, key2, baseClone(subValue, bitmask, customizer, key2, value, stack));
        });
        return result;
      }
      __name(baseClone, "baseClone");
      module.exports = baseClone;
    }
  });

  // node_modules/lodash/_isKey.js
  var require_isKey = __commonJS({
    "node_modules/lodash/_isKey.js"(exports, module) {
      var isArray = require_isArray(), isSymbol = require_isSymbol();
      var reIsDeepProp = /\\.|\\[(?:[^[\\]]*|(["'])(?:(?!\\1)[^\\\\]|\\\\.)*?\\1)\\]/, reIsPlainProp = /^\\w*$/;
      function isKey(value, object) {
        if (isArray(value)) {
          return false;
        }
        var type = typeof value;
        if (type == "number" || type == "symbol" || type == "boolean" || value == null || isSymbol(value)) {
          return true;
        }
        return reIsPlainProp.test(value) || !reIsDeepProp.test(value) || object != null && value in Object(object);
      }
      __name(isKey, "isKey");
      module.exports = isKey;
    }
  });

  // node_modules/lodash/memoize.js
  var require_memoize = __commonJS({
    "node_modules/lodash/memoize.js"(exports, module) {
      var MapCache = require_MapCache();
      var FUNC_ERROR_TEXT = "Expected a function";
      function memoize(func, resolver) {
        if (typeof func != "function" || resolver != null && typeof resolver != "function") {
          throw new TypeError(FUNC_ERROR_TEXT);
        }
        var memoized = /* @__PURE__ */ __name(function() {
          var args = arguments, key = resolver ? resolver.apply(this, args) : args[0], cache4 = memoized.cache;
          if (cache4.has(key)) {
            return cache4.get(key);
          }
          var result = func.apply(this, args);
          memoized.cache = cache4.set(key, result) || cache4;
          return result;
        }, "memoized");
        memoized.cache = new (memoize.Cache || MapCache)();
        return memoized;
      }
      __name(memoize, "memoize");
      memoize.Cache = MapCache;
      module.exports = memoize;
    }
  });

  // node_modules/lodash/_memoizeCapped.js
  var require_memoizeCapped = __commonJS({
    "node_modules/lodash/_memoizeCapped.js"(exports, module) {
      var memoize = require_memoize();
      var MAX_MEMOIZE_SIZE = 500;
      function memoizeCapped(func) {
        var result = memoize(func, function(key) {
          if (cache4.size === MAX_MEMOIZE_SIZE) {
            cache4.clear();
          }
          return key;
        });
        var cache4 = result.cache;
        return result;
      }
      __name(memoizeCapped, "memoizeCapped");
      module.exports = memoizeCapped;
    }
  });

  // node_modules/lodash/_stringToPath.js
  var require_stringToPath = __commonJS({
    "node_modules/lodash/_stringToPath.js"(exports, module) {
      var memoizeCapped = require_memoizeCapped();
      var rePropName = /[^.[\\]]+|\\[(?:(-?\\d+(?:\\.\\d+)?)|(["'])((?:(?!\\2)[^\\\\]|\\\\.)*?)\\2)\\]|(?=(?:\\.|\\[\\])(?:\\.|\\[\\]|$))/g;
      var reEscapeChar = /\\\\(\\\\)?/g;
      var stringToPath = memoizeCapped(function(string) {
        var result = [];
        if (string.charCodeAt(0) === 46) {
          result.push("");
        }
        string.replace(rePropName, function(match, number, quote, subString) {
          result.push(quote ? subString.replace(reEscapeChar, "$1") : number || match);
        });
        return result;
      });
      module.exports = stringToPath;
    }
  });

  // node_modules/lodash/_baseToString.js
  var require_baseToString = __commonJS({
    "node_modules/lodash/_baseToString.js"(exports, module) {
      var Symbol2 = require_Symbol(), arrayMap = require_arrayMap(), isArray = require_isArray(), isSymbol = require_isSymbol();
      var INFINITY = 1 / 0;
      var symbolProto = Symbol2 ? Symbol2.prototype : void 0, symbolToString = symbolProto ? symbolProto.toString : void 0;
      function baseToString(value) {
        if (typeof value == "string") {
          return value;
        }
        if (isArray(value)) {
          return arrayMap(value, baseToString) + "";
        }
        if (isSymbol(value)) {
          return symbolToString ? symbolToString.call(value) : "";
        }
        var result = value + "";
        return result == "0" && 1 / value == -INFINITY ? "-0" : result;
      }
      __name(baseToString, "baseToString");
      module.exports = baseToString;
    }
  });

  // node_modules/lodash/toString.js
  var require_toString = __commonJS({
    "node_modules/lodash/toString.js"(exports, module) {
      var baseToString = require_baseToString();
      function toString(value) {
        return value == null ? "" : baseToString(value);
      }
      __name(toString, "toString");
      module.exports = toString;
    }
  });

  // node_modules/lodash/_castPath.js
  var require_castPath = __commonJS({
    "node_modules/lodash/_castPath.js"(exports, module) {
      var isArray = require_isArray(), isKey = require_isKey(), stringToPath = require_stringToPath(), toString = require_toString();
      function castPath(value, object) {
        if (isArray(value)) {
          return value;
        }
        return isKey(value, object) ? [value] : stringToPath(toString(value));
      }
      __name(castPath, "castPath");
      module.exports = castPath;
    }
  });

  // node_modules/lodash/last.js
  var require_last = __commonJS({
    "node_modules/lodash/last.js"(exports, module) {
      function last(array) {
        var length = array == null ? 0 : array.length;
        return length ? array[length - 1] : void 0;
      }
      __name(last, "last");
      module.exports = last;
    }
  });

  // node_modules/lodash/_toKey.js
  var require_toKey = __commonJS({
    "node_modules/lodash/_toKey.js"(exports, module) {
      var isSymbol = require_isSymbol();
      var INFINITY = 1 / 0;
      function toKey(value) {
        if (typeof value == "string" || isSymbol(value)) {
          return value;
        }
        var result = value + "";
        return result == "0" && 1 / value == -INFINITY ? "-0" : result;
      }
      __name(toKey, "toKey");
      module.exports = toKey;
    }
  });

  // node_modules/lodash/_baseGet.js
  var require_baseGet = __commonJS({
    "node_modules/lodash/_baseGet.js"(exports, module) {
      var castPath = require_castPath(), toKey = require_toKey();
      function baseGet(object, path) {
        path = castPath(path, object);
        var index = 0, length = path.length;
        while (object != null && index < length) {
          object = object[toKey(path[index++])];
        }
        return index && index == length ? object : void 0;
      }
      __name(baseGet, "baseGet");
      module.exports = baseGet;
    }
  });

  // node_modules/lodash/_baseSlice.js
  var require_baseSlice = __commonJS({
    "node_modules/lodash/_baseSlice.js"(exports, module) {
      function baseSlice(array, start, end) {
        var index = -1, length = array.length;
        if (start < 0) {
          start = -start > length ? 0 : length + start;
        }
        end = end > length ? length : end;
        if (end < 0) {
          end += length;
        }
        length = start > end ? 0 : end - start >>> 0;
        start >>>= 0;
        var result = Array(length);
        while (++index < length) {
          result[index] = array[index + start];
        }
        return result;
      }
      __name(baseSlice, "baseSlice");
      module.exports = baseSlice;
    }
  });

  // node_modules/lodash/_parent.js
  var require_parent = __commonJS({
    "node_modules/lodash/_parent.js"(exports, module) {
      var baseGet = require_baseGet(), baseSlice = require_baseSlice();
      function parent(object, path) {
        return path.length < 2 ? object : baseGet(object, baseSlice(path, 0, -1));
      }
      __name(parent, "parent");
      module.exports = parent;
    }
  });

  // node_modules/lodash/_baseUnset.js
  var require_baseUnset = __commonJS({
    "node_modules/lodash/_baseUnset.js"(exports, module) {
      var castPath = require_castPath(), last = require_last(), parent = require_parent(), toKey = require_toKey();
      function baseUnset(object, path) {
        path = castPath(path, object);
        object = parent(object, path);
        return object == null || delete object[toKey(last(path))];
      }
      __name(baseUnset, "baseUnset");
      module.exports = baseUnset;
    }
  });

  // node_modules/lodash/isPlainObject.js
  var require_isPlainObject = __commonJS({
    "node_modules/lodash/isPlainObject.js"(exports, module) {
      var baseGetTag = require_baseGetTag(), getPrototype = require_getPrototype(), isObjectLike = require_isObjectLike();
      var objectTag = "[object Object]";
      var funcProto = Function.prototype, objectProto = Object.prototype;
      var funcToString = funcProto.toString;
      var hasOwnProperty = objectProto.hasOwnProperty;
      var objectCtorString = funcToString.call(Object);
      function isPlainObject(value) {
        if (!isObjectLike(value) || baseGetTag(value) != objectTag) {
          return false;
        }
        var proto = getPrototype(value);
        if (proto === null) {
          return true;
        }
        var Ctor = hasOwnProperty.call(proto, "constructor") && proto.constructor;
        return typeof Ctor == "function" && Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString;
      }
      __name(isPlainObject, "isPlainObject");
      module.exports = isPlainObject;
    }
  });

  // node_modules/lodash/_customOmitClone.js
  var require_customOmitClone = __commonJS({
    "node_modules/lodash/_customOmitClone.js"(exports, module) {
      var isPlainObject = require_isPlainObject();
      function customOmitClone(value) {
        return isPlainObject(value) ? void 0 : value;
      }
      __name(customOmitClone, "customOmitClone");
      module.exports = customOmitClone;
    }
  });

  // node_modules/lodash/_isFlattenable.js
  var require_isFlattenable = __commonJS({
    "node_modules/lodash/_isFlattenable.js"(exports, module) {
      var Symbol2 = require_Symbol(), isArguments = require_isArguments(), isArray = require_isArray();
      var spreadableSymbol = Symbol2 ? Symbol2.isConcatSpreadable : void 0;
      function isFlattenable(value) {
        return isArray(value) || isArguments(value) || !!(spreadableSymbol && value && value[spreadableSymbol]);
      }
      __name(isFlattenable, "isFlattenable");
      module.exports = isFlattenable;
    }
  });

  // node_modules/lodash/_baseFlatten.js
  var require_baseFlatten = __commonJS({
    "node_modules/lodash/_baseFlatten.js"(exports, module) {
      var arrayPush = require_arrayPush(), isFlattenable = require_isFlattenable();
      function baseFlatten(array, depth, predicate, isStrict, result) {
        var index = -1, length = array.length;
        predicate || (predicate = isFlattenable);
        result || (result = []);
        while (++index < length) {
          var value = array[index];
          if (depth > 0 && predicate(value)) {
            if (depth > 1) {
              baseFlatten(value, depth - 1, predicate, isStrict, result);
            } else {
              arrayPush(result, value);
            }
          } else if (!isStrict) {
            result[result.length] = value;
          }
        }
        return result;
      }
      __name(baseFlatten, "baseFlatten");
      module.exports = baseFlatten;
    }
  });

  // node_modules/lodash/flatten.js
  var require_flatten = __commonJS({
    "node_modules/lodash/flatten.js"(exports, module) {
      var baseFlatten = require_baseFlatten();
      function flatten(array) {
        var length = array == null ? 0 : array.length;
        return length ? baseFlatten(array, 1) : [];
      }
      __name(flatten, "flatten");
      module.exports = flatten;
    }
  });

  // node_modules/lodash/_apply.js
  var require_apply = __commonJS({
    "node_modules/lodash/_apply.js"(exports, module) {
      function apply(func, thisArg, args) {
        switch (args.length) {
          case 0:
            return func.call(thisArg);
          case 1:
            return func.call(thisArg, args[0]);
          case 2:
            return func.call(thisArg, args[0], args[1]);
          case 3:
            return func.call(thisArg, args[0], args[1], args[2]);
        }
        return func.apply(thisArg, args);
      }
      __name(apply, "apply");
      module.exports = apply;
    }
  });

  // node_modules/lodash/_overRest.js
  var require_overRest = __commonJS({
    "node_modules/lodash/_overRest.js"(exports, module) {
      var apply = require_apply();
      var nativeMax = Math.max;
      function overRest(func, start, transform) {
        start = nativeMax(start === void 0 ? func.length - 1 : start, 0);
        return function() {
          var args = arguments, index = -1, length = nativeMax(args.length - start, 0), array = Array(length);
          while (++index < length) {
            array[index] = args[start + index];
          }
          index = -1;
          var otherArgs = Array(start + 1);
          while (++index < start) {
            otherArgs[index] = args[index];
          }
          otherArgs[start] = transform(array);
          return apply(func, this, otherArgs);
        };
      }
      __name(overRest, "overRest");
      module.exports = overRest;
    }
  });

  // node_modules/lodash/constant.js
  var require_constant = __commonJS({
    "node_modules/lodash/constant.js"(exports, module) {
      function constant(value) {
        return function() {
          return value;
        };
      }
      __name(constant, "constant");
      module.exports = constant;
    }
  });

  // node_modules/lodash/identity.js
  var require_identity = __commonJS({
    "node_modules/lodash/identity.js"(exports, module) {
      function identity(value) {
        return value;
      }
      __name(identity, "identity");
      module.exports = identity;
    }
  });

  // node_modules/lodash/_baseSetToString.js
  var require_baseSetToString = __commonJS({
    "node_modules/lodash/_baseSetToString.js"(exports, module) {
      var constant = require_constant(), defineProperty = require_defineProperty(), identity = require_identity();
      var baseSetToString = !defineProperty ? identity : function(func, string) {
        return defineProperty(func, "toString", {
          "configurable": true,
          "enumerable": false,
          "value": constant(string),
          "writable": true
        });
      };
      module.exports = baseSetToString;
    }
  });

  // node_modules/lodash/_shortOut.js
  var require_shortOut = __commonJS({
    "node_modules/lodash/_shortOut.js"(exports, module) {
      var HOT_COUNT = 800, HOT_SPAN = 16;
      var nativeNow = Date.now;
      function shortOut(func) {
        var count = 0, lastCalled = 0;
        return function() {
          var stamp = nativeNow(), remaining = HOT_SPAN - (stamp - lastCalled);
          lastCalled = stamp;
          if (remaining > 0) {
            if (++count >= HOT_COUNT) {
              return arguments[0];
            }
          } else {
            count = 0;
          }
          return func.apply(void 0, arguments);
        };
      }
      __name(shortOut, "shortOut");
      module.exports = shortOut;
    }
  });

  // node_modules/lodash/_setToString.js
  var require_setToString = __commonJS({
    "node_modules/lodash/_setToString.js"(exports, module) {
      var baseSetToString = require_baseSetToString(), shortOut = require_shortOut();
      var setToString = shortOut(baseSetToString);
      module.exports = setToString;
    }
  });

  // node_modules/lodash/_flatRest.js
  var require_flatRest = __commonJS({
    "node_modules/lodash/_flatRest.js"(exports, module) {
      var flatten = require_flatten(), overRest = require_overRest(), setToString = require_setToString();
      function flatRest(func) {
        return setToString(overRest(func, void 0, flatten), func + "");
      }
      __name(flatRest, "flatRest");
      module.exports = flatRest;
    }
  });

  // node_modules/lodash/omit.js
  var require_omit = __commonJS({
    "node_modules/lodash/omit.js"(exports, module) {
      var arrayMap = require_arrayMap(), baseClone = require_baseClone(), baseUnset = require_baseUnset(), castPath = require_castPath(), copyObject = require_copyObject(), customOmitClone = require_customOmitClone(), flatRest = require_flatRest(), getAllKeysIn = require_getAllKeysIn();
      var CLONE_DEEP_FLAG = 1, CLONE_FLAT_FLAG = 2, CLONE_SYMBOLS_FLAG = 4;
      var omit5 = flatRest(function(object, paths) {
        var result = {};
        if (object == null) {
          return result;
        }
        var isDeep = false;
        paths = arrayMap(paths, function(path) {
          path = castPath(path, object);
          isDeep || (isDeep = path.length > 1);
          return path;
        });
        copyObject(object, getAllKeysIn(object), result);
        if (isDeep) {
          result = baseClone(result, CLONE_DEEP_FLAG | CLONE_FLAT_FLAG | CLONE_SYMBOLS_FLAG, customOmitClone);
        }
        var length = paths.length;
        while (length--) {
          baseUnset(result, paths[length]);
        }
        return result;
      });
      module.exports = omit5;
    }
  });

  // src/plugins/constants.ts
  var RESPONSIVE_VIEWER_WINDOW_KEY = "__@RESONSIVE_VIEWER_DONT_USE@__";
  var RESPONSIVE_VIEWER_WINDOW_KEY_SCREEN_ID = "__@RESONSIVE_VIEWER_DONT_USE_SCREEN_ID@__";
  var RESPONSIVE_VIEWER_BACKGROUND_WINDOW_KEY = "__@RESONSIVE_VIEWER_BACKGROUND_DONT_USE@__";

  // src/constants.ts
  var WORKSPACE_PADDING = 40;
  var SCREEN_MARGIN = 40;
  var WORKSPACE_ZOOM_PAN_ANIMATION_DURATION = 400;
  var WORKSPACE_ZOOM_PAN_ANIMATION_EASING = "cubic-bezier(.10, .10, .25, .90)";
  var APP_RENDER_TARGET_ID = "RESPONSIVE-VIEWER-ROOT";
  var MESSAGE_PREFIX = "@RESPONSIVE-VIEWER";
  var MAX_VISIBLE_SCREENS_WITH_ADBLOCKER = 10;
  var MAX_MOCKUPS_WITH_FREE_PLAN = 2;
  var SERVER_URL = "https://responsiveviewer.org";
  var SERVER_IFRAME = \`\${SERVER_URL}/user/extension\`;
  var SESSION_API = \`\${SERVER_URL}/user/session\`;
  var UPLOAD_API = \`\${SERVER_URL}/user/uploads\`;
  var SAVE_STATE_API = \`\${SERVER_URL}/user/state\`;
  var FEEDBACK_API = \`\${SERVER_URL}/api/feedback\`;
  var UNINSTALL_URL = \`\${SERVER_URL}/uninstall\`;
  var INSTALL_URL = \`\${SERVER_URL}/api/install\`;
  var ADVERTISEMENT_URL = "https://preview.responsiveviewer.org/";
  var USER_UPGRADE_URL = \`\${SERVER_URL}/login\`;
  var USER_ACCOUNT_URL = \`\${SERVER_URL}/dashboard\`;
  var REQUEST_PLUGIN_URL = \`\${SERVER_URL}/plugins\`;
  var ENABLE_UPGRADE = true;
  var EDIT_TEMPLATE_DEVICE_MOCKUP = false;
  var DEFAULT_COLOR_FOR_TOOLS = "rgba(59, 130, 246, 1)";
  var HIGHLIGHT_COLOR_FOR_TOOLS = "#a855f7";
  var MAX_INSPECTION_LABEL_ELEMENT_LENGTH = 100;
  var DEFAULT_HEADER_RULES = [
    {
      id: "1",
      header: "x-frame-options",
      operation: "remove",
      target: "response",
      enabled: true
    },
    {
      id: "2",
      header: "content-security-policy",
      operation: "remove",
      target: "response",
      enabled: true
    },
    {
      id: "3",
      header: "frame-options",
      operation: "remove",
      target: "response",
      enabled: true
    },
    {
      id: "4",
      header: "cross-origin-opener-policy",
      operation: "remove",
      target: "response",
      enabled: true
    },
    {
      id: "5",
      header: "cross-origin-embedder-policy",
      operation: "remove",
      target: "response",
      enabled: true
    },
    {
      id: "6",
      header: "cross-origin-resource-policy",
      operation: "remove",
      target: "response",
      enabled: true
    }
  ];

  // src/utils/getPrefixedMessage.ts
  var getPrefixedMessage = /* @__PURE__ */ __name((message = "", additionalPrefix = "") => {
    const prefix = \`\${MESSAGE_PREFIX}\${additionalPrefix ? "-" + additionalPrefix : ""}\`;
    if (message.startsWith(prefix)) {
      return message;
    }
    return \`\${prefix}/\${message}\`;
  }, "getPrefixedMessage");

  // src/utils/onMessage.ts
  var onMessage = /* @__PURE__ */ __name((callback, screenId2 = window[RESPONSIVE_VIEWER_WINDOW_KEY_SCREEN_ID], additionalPrefix) => {
    const onMessage2 = /* @__PURE__ */ __name((event) => {
      if (!event.data || !String(event.data.message).startsWith(
        getPrefixedMessage("", additionalPrefix)
      )) {
        return;
      }
      if (event.data.screenId === screenId2) {
        return;
      }
      callback(event.data);
    }, "onMessage");
    window.addEventListener("message", onMessage2);
    return () => {
      window.removeEventListener("message", onMessage2);
    };
  }, "onMessage");
  var onMessageFromScreen = /* @__PURE__ */ __name((callback, screenId2 = window[RESPONSIVE_VIEWER_WINDOW_KEY_SCREEN_ID], additionalPrefix) => {
    const onMessage2 = /* @__PURE__ */ __name((event) => {
      if (!event.data || !String(event.data.message).startsWith(
        getPrefixedMessage("", additionalPrefix)
      )) {
        return;
      }
      if (event.data.screenId === screenId2) {
        return;
      }
      callback(event.data);
    }, "onMessage");
    window.addEventListener("message", onMessage2);
    return () => {
      window.removeEventListener("message", onMessage2);
    };
  }, "onMessageFromScreen");
  var screenFilter = /* @__PURE__ */ __name((state5, event) => {
    return state5.screens.includes(event.data.screenId);
  }, "screenFilter");
  var messageFilter = /* @__PURE__ */ __name((state5, event) => {
    return String(event.data.message).startsWith(
      getPrefixedMessage(state5.message, state5.prefix)
    );
  }, "messageFilter");
  function createMessageListener() {
    const state5 = {
      screens: [],
      prefix: "",
      message: ""
    };
    const filters = /* @__PURE__ */ new Set();
    const response = {
      screen: (screenId2) => {
        state5.screens.push(screenId2);
        filters.add(screenFilter);
        return response;
      },
      message: (message) => {
        filters.add(messageFilter);
        state5.message = message;
        return response;
      },
      screens: (screenIds) => {
        state5.screens.push(...screenIds);
        filters.add(screenFilter);
        return response;
      },
      prefix: (prefix) => {
        state5.prefix = prefix;
        filters.add(messageFilter);
        return response;
      },
      listen: (callback) => {
        const onMessage2 = /* @__PURE__ */ __name((event) => {
          for (let filter of filters) {
            if (!filter(state5, event)) {
              return;
            }
          }
          callback(event.data);
        }, "onMessage");
        window.addEventListener("message", onMessage2);
        return () => {
          window.removeEventListener("message", onMessage2);
        };
      }
    };
    return response;
  }
  __name(createMessageListener, "createMessageListener");

  // src/utils/sendMessage.ts
  var sendMessage = /* @__PURE__ */ __name((message, data = {}, screenId2, additionalPrefix = "", target = window.top) => {
    try {
      if (!target) {
        return;
      }
      target.postMessage(
        {
          ...data,
          message: getPrefixedMessage(message, additionalPrefix),
          screenId: screenId2 || window[RESPONSIVE_VIEWER_WINDOW_KEY_SCREEN_ID]
        },
        "*"
      );
    } catch (error) {
      console.error("an error occured during sending message", error);
    }
  }, "sendMessage");

  // src/utils/observer.ts
  function stayConnected(element, onDisconnect) {
    if (!element.parentElement) {
      onDisconnect();
      return;
    }
    const observer = new MutationObserver(() => {
      if (element.parentElement) {
        return;
      }
      onDisconnect();
      observer.disconnect();
      stayConnected(element, onDisconnect);
    });
    observer.observe(element.parentElement, {
      childList: true
    });
  }
  __name(stayConnected, "stayConnected");
  function observerIntersection(element, onIntersection) {
    const observer = new IntersectionObserver(
      (entries) => {
        onIntersection(entries);
      },
      {
        root: element.parentElement ?? void 0
      }
    );
    observer.observe(element);
    return observer;
  }
  __name(observerIntersection, "observerIntersection");

  // src/utils/uniqueId.ts
  var uniqueId = /* @__PURE__ */ __name(() => Math.random().toString(36).slice(2), "uniqueId");

  // src/plugins/plugins/commons/attrs.ts
  var SALT = Math.random().toString(36).substring(2, 15);
  var DATA_PREFIX = \`data-rvp\${SALT}\`;
  var BASE_APP_ATTR = DATA_PREFIX;
  var BASE_APP_ATTR_PARENT = \`\${DATA_PREFIX}p\`;
  var ISOLATION_MODE_OPACITY_CSS_VAR = \`iso\${SALT}\`;

  // src/plugins/plugins/commons/canvas.ts
  var timer;
  var Canvas = class {
    constructor() {
      this.commands = /* @__PURE__ */ new Map();
    }
    static {
      __name(this, "Canvas");
    }
    boot() {
      if (this.canvas) {
        return;
      }
      const createCanvas = /* @__PURE__ */ __name(() => {
        const canvas = document.createElement("canvas");
        canvas.setAttribute(BASE_APP_ATTR, "true");
        canvas.width = window.innerWidth * window.devicePixelRatio;
        canvas.height = window.innerHeight * window.devicePixelRatio;
        canvas.style.position = "fixed";
        canvas.style.top = "0";
        canvas.style.left = "0";
        canvas.style.width = "100%";
        canvas.style.height = "100%";
        canvas.style.direction = "ltr";
        canvas.style.zIndex = "999999";
        canvas.style.pointerEvents = "none";
        document.body.appendChild(canvas);
        stayConnected(canvas, () => {
          document.body.appendChild(canvas);
          this.render();
        });
        this.canvas = canvas;
        canvas.getContext("2d")?.scale(window.devicePixelRatio, window.devicePixelRatio);
        window.addEventListener("resize", () => {
          window.clearTimeout(timer);
          canvas.width = window.innerWidth * window.devicePixelRatio;
          canvas.height = window.innerHeight * window.devicePixelRatio;
          canvas.getContext("2d")?.scale(window.devicePixelRatio, window.devicePixelRatio);
          timer = window.setTimeout(() => {
            this.render();
          }, 50);
        });
        window.addEventListener("scroll", () => {
          this.render();
        });
      }, "createCanvas");
      createCanvas();
    }
    addDraw(callback, name) {
      name = name || uniqueId();
      this.commands.set(name, callback);
    }
    removeDraw(callback, rerender) {
      if (typeof callback === "string") {
        this.commands.delete(callback);
      } else {
        this.commands.forEach((c, name) => {
          if (c === callback) {
            this.commands.delete(name);
          }
        });
      }
      if (rerender) {
        this.render();
      }
    }
    render() {
      this.boot();
      if (!this.canvas) {
        return;
      }
      const ctx = this.canvas?.getContext("2d");
      if (!ctx) {
        return;
      }
      ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      for (let [name, command] of this.commands) {
        command(ctx);
      }
    }
  };

  // src/plugins/plugins-manager.ts
  var PluginsManager = class {
    constructor() {
      this.#listeners = /* @__PURE__ */ new Map();
      this.screenId = "";
      this.#started = false;
      this.#memory = {};
      this.canvas = new Canvas();
      this.id = Math.random().toString(36).substring(2, 15);
    }
    static {
      __name(this, "PluginsManager");
    }
    #listeners;
    #started;
    #memory;
    onReady(callback) {
      if (document.body) {
        callback();
      } else {
        window.addEventListener("DOMContentLoaded", () => {
          callback();
        });
      }
    }
    memory(key, value) {
      if (value === void 0) {
        return this.#memory[key];
      }
      this.#memory[key] = value;
      return value;
    }
    start(screenId2) {
      if (this.#started) {
        console.warn("[Plugin Manager]: already started");
        return;
      }
      this.#started = true;
      this.screenId = screenId2;
      onMessage(({ message, ...data }) => {
        this.runListeners(message, data);
      }, this.screenId);
    }
    runListeners(name, data = {}) {
      const listeners = this.#listeners.get(name);
      if (listeners) {
        listeners.forEach((listener) => listener(data));
      }
    }
    inform(message, data) {
      sendMessage(message, data, this.screenId, "INFORM");
    }
    broadcast(message, data = {}) {
      sendMessage(message, data, this.screenId);
    }
    broadcastWithSelf(message, data = {}) {
      sendMessage(message, data, this.screenId);
      this.runListeners(getPrefixedMessage(message), data);
    }
    addMessage(name, callback) {
      if (!this.#listeners.has(name)) {
        this.#listeners.set(name, []);
      }
      this.#listeners.get(name)?.push(callback);
      return () => {
        const listeners = this.#listeners.get(name);
        if (listeners) {
          this.#listeners.set(
            name,
            listeners.filter((c) => c !== callback)
          );
        }
      };
    }
    listen(name, callback) {
      return this.addMessage(getPrefixedMessage(name), callback);
    }
    onPluginLoaded(name, callback) {
      this.listen("PLUGINS_LOADED", (d) => {
        for (let plugin of d.plugins) {
          if (plugin.name === name) {
            callback(plugin);
          }
        }
      });
    }
    onPluginActivate(pluginName, callback) {
      return this.listen("PLUGIN/ACTIVATE", (data) => {
        if (data.plugin !== pluginName) {
          return;
        }
        callback();
      });
    }
    onPluginDeActivate(pluginName, callback) {
      return this.listen("PLUGIN/DEACTIVATE", (data) => {
        if (data.plugin !== pluginName) {
          return;
        }
        callback();
      });
    }
  };
  var manager = new PluginsManager();
  window[RESPONSIVE_VIEWER_WINDOW_KEY] = manager;
  manager.start(window[RESPONSIVE_VIEWER_WINDOW_KEY_SCREEN_ID]);
  var plugins_manager_default = manager;

  // src/utils/scroll-size.ts
  var import_lodash = __toESM(require_lodash());
  var getScrollHeight = /* @__PURE__ */ __name((document2) => {
    return fallback(
      Math.max(
        document2.body?.scrollHeight,
        document2.documentElement?.scrollHeight,
        document2.body?.offsetHeight,
        document2.documentElement?.offsetHeight,
        document2.body?.clientHeight,
        document2.documentElement?.clientHeight
      ),
      0
    );
  }, "getScrollHeight");
  var getScrollWidth = /* @__PURE__ */ __name((document2) => {
    return fallback(
      Math.max(
        document2.body?.scrollWidth,
        document2.documentElement?.scrollWidth,
        document2.body?.offsetWidth,
        document2.documentElement?.offsetWidth,
        document2.body?.clientWidth,
        document2.documentElement?.clientWidth
      ),
      0
    );
  }, "getScrollWidth");
  function fallback(value, fallback2) {
    if (isNaN(value) || !isFinite(value) || (0, import_lodash.isNull)(value)) {
      return fallback2;
    }
    return value;
  }
  __name(fallback, "fallback");

  // src/plugins/app.ts
  var responsiveViewer = window[RESPONSIVE_VIEWER_WINDOW_KEY];
  var screenId = window[RESPONSIVE_VIEWER_WINDOW_KEY_SCREEN_ID];

  // node_modules/compute-scroll-into-view/dist/index.js
  var t = /* @__PURE__ */ __name((t2) => "object" == typeof t2 && null != t2 && 1 === t2.nodeType, "t"), e = /* @__PURE__ */ __name((t2, e3) => (!e3 || "hidden" !== t2) && ("visible" !== t2 && "clip" !== t2), "e"), n = /* @__PURE__ */ __name((t2, n2) => {
    if (t2.clientHeight < t2.scrollHeight || t2.clientWidth < t2.scrollWidth) {
      const o3 = getComputedStyle(t2, null);
      return e(o3.overflowY, n2) || e(o3.overflowX, n2) || ((t3) => {
        const e3 = ((t4) => {
          if (!t4.ownerDocument || !t4.ownerDocument.defaultView)
            return null;
          try {
            return t4.ownerDocument.defaultView.frameElement;
          } catch (t5) {
            return null;
          }
        })(t3);
        return !!e3 && (e3.clientHeight < t3.scrollHeight || e3.clientWidth < t3.scrollWidth);
      })(t2);
    }
    return false;
  }, "n"), o = /* @__PURE__ */ __name((t2, e3, n2, o3, l2, r2, i, s) => r2 < t2 && i > e3 || r2 > t2 && i < e3 ? 0 : r2 <= t2 && s <= n2 || i >= e3 && s >= n2 ? r2 - t2 - o3 : i > e3 && s < n2 || r2 < t2 && s > n2 ? i - e3 + l2 : 0, "o"), l = /* @__PURE__ */ __name((t2) => {
    const e3 = t2.parentElement;
    return null == e3 ? t2.getRootNode().host || null : e3;
  }, "l"), r = /* @__PURE__ */ __name((e3, r2) => {
    var i, s, d, h;
    if ("undefined" == typeof document)
      return [];
    const { scrollMode: c, block: f, inline: u, boundary: a, skipOverflowHiddenElements: g } = r2, p = "function" == typeof a ? a : (t2) => t2 !== a;
    if (!t(e3))
      throw new TypeError("Invalid target");
    const m = document.scrollingElement || document.documentElement, w = [];
    let W = e3;
    for (; t(W) && p(W); ) {
      if (W = l(W), W === m) {
        w.push(W);
        break;
      }
      null != W && W === document.body && n(W) && !n(document.documentElement) || null != W && n(W, g) && w.push(W);
    }
    const b = null != (s = null == (i = window.visualViewport) ? void 0 : i.width) ? s : innerWidth, H = null != (h = null == (d = window.visualViewport) ? void 0 : d.height) ? h : innerHeight, { scrollX: y, scrollY: M } = window, { height: v, width: E, top: x, right: C, bottom: I, left: R } = e3.getBoundingClientRect(), { top: T, right: B, bottom: F, left: V } = ((t2) => {
      const e4 = window.getComputedStyle(t2);
      return { top: parseFloat(e4.scrollMarginTop) || 0, right: parseFloat(e4.scrollMarginRight) || 0, bottom: parseFloat(e4.scrollMarginBottom) || 0, left: parseFloat(e4.scrollMarginLeft) || 0 };
    })(e3);
    let k = "start" === f || "nearest" === f ? x - T : "end" === f ? I + F : x + v / 2 - T + F, D = "center" === u ? R + E / 2 - V + B : "end" === u ? C + B : R - V;
    const L = [];
    for (let t2 = 0; t2 < w.length; t2++) {
      const e4 = w[t2], { height: n2, width: l2, top: r3, right: i2, bottom: s2, left: d2 } = e4.getBoundingClientRect();
      if ("if-needed" === c && x >= 0 && R >= 0 && I <= H && C <= b && x >= r3 && I <= s2 && R >= d2 && C <= i2)
        return L;
      const h2 = getComputedStyle(e4), a2 = parseInt(h2.borderLeftWidth, 10), g2 = parseInt(h2.borderTopWidth, 10), p2 = parseInt(h2.borderRightWidth, 10), W2 = parseInt(h2.borderBottomWidth, 10);
      let T2 = 0, B2 = 0;
      const F2 = "offsetWidth" in e4 ? e4.offsetWidth - e4.clientWidth - a2 - p2 : 0, V2 = "offsetHeight" in e4 ? e4.offsetHeight - e4.clientHeight - g2 - W2 : 0, S = "offsetWidth" in e4 ? 0 === e4.offsetWidth ? 0 : l2 / e4.offsetWidth : 0, X = "offsetHeight" in e4 ? 0 === e4.offsetHeight ? 0 : n2 / e4.offsetHeight : 0;
      if (m === e4)
        T2 = "start" === f ? k : "end" === f ? k - H : "nearest" === f ? o(M, M + H, H, g2, W2, M + k, M + k + v, v) : k - H / 2, B2 = "start" === u ? D : "center" === u ? D - b / 2 : "end" === u ? D - b : o(y, y + b, b, a2, p2, y + D, y + D + E, E), T2 = Math.max(0, T2 + M), B2 = Math.max(0, B2 + y);
      else {
        T2 = "start" === f ? k - r3 - g2 : "end" === f ? k - s2 + W2 + V2 : "nearest" === f ? o(r3, s2, n2, g2, W2 + V2, k, k + v, v) : k - (r3 + n2 / 2) + V2 / 2, B2 = "start" === u ? D - d2 - a2 : "center" === u ? D - (d2 + l2 / 2) + F2 / 2 : "end" === u ? D - i2 + p2 + F2 : o(d2, i2, l2, a2, p2 + F2, D, D + E, E);
        const { scrollLeft: t3, scrollTop: h3 } = e4;
        T2 = 0 === X ? 0 : Math.max(0, Math.min(h3 + T2 / X, e4.scrollHeight - n2 / X + V2)), B2 = 0 === S ? 0 : Math.max(0, Math.min(t3 + B2 / S, e4.scrollWidth - l2 / S + F2)), k += h3 - T2, D += t3 - B2;
      }
      L.push({ el: e4, top: T2, left: B2 });
    }
    return L;
  }, "r");

  // node_modules/scroll-into-view-if-needed/dist/index.js
  var o2 = /* @__PURE__ */ __name((t2) => false === t2 ? { block: "end", inline: "nearest" } : ((t3) => t3 === Object(t3) && 0 !== Object.keys(t3).length)(t2) ? t2 : { block: "start", inline: "nearest" }, "o");
  function e2(e3, r2) {
    if (!e3.isConnected || !((t2) => {
      let o3 = t2;
      for (; o3 && o3.parentNode; ) {
        if (o3.parentNode === document)
          return true;
        o3 = o3.parentNode instanceof ShadowRoot ? o3.parentNode.host : o3.parentNode;
      }
      return false;
    })(e3))
      return;
    const n2 = ((t2) => {
      const o3 = window.getComputedStyle(t2);
      return { top: parseFloat(o3.scrollMarginTop) || 0, right: parseFloat(o3.scrollMarginRight) || 0, bottom: parseFloat(o3.scrollMarginBottom) || 0, left: parseFloat(o3.scrollMarginLeft) || 0 };
    })(e3);
    if (((t2) => "object" == typeof t2 && "function" == typeof t2.behavior)(r2))
      return r2.behavior(r(e3, r2));
    const l2 = "boolean" == typeof r2 || null == r2 ? void 0 : r2.behavior;
    for (const { el: a, top: i, left: s } of r(e3, o2(r2))) {
      const t2 = i - n2.top + n2.bottom, o3 = s - n2.left + n2.right;
      a.scroll({ top: t2, left: o3, behavior: l2 });
    }
  }
  __name(e2, "e");

  // src/plugins/plugins/commons/scroll-into-view.ts
  Element.prototype.scrollIntoView = function(options) {
    e2(this, options);
  };
  if (window.location.hash) {
    let loaded = false;
    let count = 500;
    const inform = /* @__PURE__ */ __name(() => {
      count--;
      if (loaded || count <= 0) {
        return;
      }
      responsiveViewer.inform("UNTRUSTED_SCROLL");
      requestAnimationFrame(inform);
    }, "inform");
    inform();
    window.addEventListener("DOMContentLoaded", () => {
      loaded = true;
    });
  }
  if ("navigation" in window) {
    ;
    window.navigation.addEventListener("navigate", (e3) => {
      if (e3.destination.url.includes("#")) {
        e3.preventDefault();
      }
    });
  }
  responsiveViewer.listen("SCROLL_TO_ELEMENT", (data) => {
    const element = document.querySelector(data.selector);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
    }
  });

  // src/plugins/plugins/commons/dimensions.ts
  function requestDimensions(data = {}) {
    responsiveViewer.listen("DIMENSIONS", () => {
      responsiveViewer.inform("DIMENSIONS", {
        ...data,
        height: getScrollHeight(document),
        width: getScrollWidth(document)
      });
    });
  }
  __name(requestDimensions, "requestDimensions");

  // src/plugins/plugins/commons/disable-scrollbars.ts
  var scrollbars;
  var toggleScrollbars = /* @__PURE__ */ __name((show) => {
    if (!scrollbars && !show) {
      scrollbars = document.createElement("style");
      scrollbars.innerText = \`
  ::-webkit-scrollbar {
      background: transparent;
      width: 0 !important;
      height: 0 !important;
  }    
  \`;
    }
    if (!show) {
      document.head.appendChild(scrollbars);
    } else if (scrollbars) {
      scrollbars.remove();
    }
  }, "toggleScrollbars");
  responsiveViewer.listen("SELECT_APP", (data) => {
    toggleScrollbars(data.app.scrollbars);
  });
  responsiveViewer.listen("TOGGLE_SCROLLBARS", (data) => {
    toggleScrollbars(data.scrollbars);
  });

  // src/plugins/plugins/commons/highlight-borders.ts
  var highlightBorders;
  var timer2;
  var toggleHighlightBorders = /* @__PURE__ */ __name((settings) => {
    if (settings?.active && !highlightBorders) {
      highlightBorders = document.createElement("style");
    }
    if (settings.active && !highlightBorders.parentElement) {
      document.head.appendChild(highlightBorders);
    } else if (!settings.active && highlightBorders?.parentElement) {
      highlightBorders.remove();
    }
    if (settings.active) {
      window.clearTimeout(timer2);
      timer2 = window.setTimeout(() => {
        const selectors = settings.selectors || "*";
        highlightBorders.innerText = \` \${selectors} {
        outline: 1px solid \${settings.color}  !important; 
        }   \`;
      }, 100);
    }
  }, "toggleHighlightBorders");
  responsiveViewer.listen("SELECT_APP", (data) => {
    if (!data.user.isPremium) {
      return;
    }
    toggleHighlightBorders(data.app.highlightBorders);
  });
  responsiveViewer.listen("TOGGLE_HIGHLIGHT_BORDERS", (data) => {
    toggleHighlightBorders(data.highlightBorders);
  });

  // src/utils/domPath.ts
  function validateHtmlId(id) {
    const idRegex = /^[a-zA-Z][\\w-]*$/;
    return !!id.match(idRegex);
  }
  __name(validateHtmlId, "validateHtmlId");
  function getDomPath(el, standard = false) {
    const stack = [];
    const eq = standard ? "nth-of-type" : "eq";
    while (el.parentElement != null) {
      let sibCount = 0;
      let sibIndex = 0;
      for (let i = 0; i < el.parentElement.childNodes.length; i++) {
        let sib = el.parentElement.childNodes[i];
        if (sib.nodeName === el.nodeName) {
          if (sib === el) {
            sibIndex = sibCount;
          }
          sibCount++;
        }
      }
      if (el.hasAttribute("id") && el.id !== "" && validateHtmlId(el.id)) {
        stack.unshift(el.nodeName.toLowerCase() + "#" + el.id);
      } else if (sibCount > 1) {
        stack.unshift(
          el.nodeName.toLowerCase() + \`:\${eq}(\${standard ? sibIndex + 1 : sibIndex})\`
        );
      } else {
        stack.unshift(el.nodeName.toLowerCase());
      }
      el = el.parentElement;
    }
    return stack;
  }
  __name(getDomPath, "getDomPath");
  function domPath(element, standard = false) {
    return getDomPath(element, standard).join(" > ");
  }
  __name(domPath, "domPath");

  // src/utils/findElement.ts
  var findWrappingSvg = /* @__PURE__ */ __name((element) => {
    if (!element) {
      return null;
    }
    if (element.tagName === "svg") {
      return element;
    }
    if (element !== document.body && element.parentElement) {
      return findWrappingSvg(element.parentElement);
    }
    return null;
  }, "findWrappingSvg");
  var isHtmlElement = /* @__PURE__ */ __name((element) => {
    return !!element && element instanceof HTMLElement && element.tagName.toLowerCase() !== "html";
  }, "isHtmlElement");
  function ensureHtmlElement(element) {
    const wrappingSvg = findWrappingSvg(element);
    if (wrappingSvg) {
      return wrappingSvg.parentElement || wrappingSvg;
    }
    return element;
  }
  __name(ensureHtmlElement, "ensureHtmlElement");
  var splitPath = /* @__PURE__ */ __name((path) => {
    const splitByDotRegexUsingEq = /(:eq\\(.*?\\))/gi;
    return path.trim().split(splitByDotRegexUsingEq).map((r2) => {
      if (r2.startsWith(":eq")) {
        const match = r2.match(/([0-9])/g);
        if (!match) {
          return 0;
        }
        return parseInt(match.join(""));
      }
      r2 = r2.trim();
      if (r2.startsWith(">")) {
        r2 = \`:scope \${r2}\`;
      }
      return r2;
    }).filter((r2) => r2 !== "");
  }, "splitPath");
  function findElement(path) {
    const paths = splitPath(path);
    let element = document.documentElement;
    while (paths.length > 0) {
      const path2 = paths.shift();
      let index = 0;
      if (typeof paths[0] === "number") {
        index = paths.shift();
      }
      if (typeof path2 === "string") {
        if (index > 0) {
          const found = element.querySelectorAll(path2);
          element = found[index];
        } else {
          element = element.querySelector(path2);
        }
      }
      if (!element) {
        return null;
      }
    }
    if (!element) {
      return;
    }
    return ensureHtmlElement(element);
  }
  __name(findElement, "findElement");

  // src/plugins/plugins/commons/inspection.ts
  var withUnit = /* @__PURE__ */ __name((value, unit = "px") => \`\${value}\${unit}\`, "withUnit");
  var currentElement;
  var watcher = null;
  var currentObservedElement = null;
  var watch = /* @__PURE__ */ __name((element) => {
    if (element === currentObservedElement) {
      return watcher;
    } else {
      watcher?.();
    }
    currentObservedElement = element;
    const observer = new MutationObserver((mutations) => {
      inspection.reRender();
    });
    observer.observe(currentElement, {
      attributes: true,
      childList: true,
      subtree: true,
      characterData: true
    });
    watcher = /* @__PURE__ */ __name(() => {
      observer.disconnect();
      watcher = null;
    }, "watcher");
  }, "watch");
  var attach = /* @__PURE__ */ __name((target, elementToAttach, rect) => {
    const targetRect = rect || target.getBoundingClientRect();
    const top = targetRect.top + window.scrollY;
    const left = targetRect.left + window.scrollX;
    elementToAttach.style.position = "absolute";
    elementToAttach.style.top = \`\${top}px\`;
    elementToAttach.style.left = \`\${left}px\`;
    elementToAttach.style.width = withUnit(targetRect.width);
    elementToAttach.style.height = withUnit(targetRect.height);
  }, "attach");
  var highlightElement = null;
  var highlightElementLabel;
  var renderHighlight = /* @__PURE__ */ __name((element, options) => {
    const rect = element.getBoundingClientRect();
    if (!highlightElement) {
      const created = createHighlightElement();
      highlightElement = created.highlightElement;
      highlightElementLabel = created.highlightElementLabel;
    }
    highlightElement.style.outline = options.highlight ? "1.5px dashed #FFC400" : "none";
    highlightElementLabel.style.display = options.showLabel ? "block" : "none";
    highlightElementLabel.setAttribute(BASE_APP_ATTR, "true");
    highlightElement.setAttribute(BASE_APP_ATTR, "true");
    attach(element, highlightElement, rect);
    highlightElementLabel.innerText = domPath(element, true);
    if (!highlightElement.parentElement) {
      document.body.appendChild(highlightElement);
    }
    watch(element);
  }, "renderHighlight");
  var clearInspector = /* @__PURE__ */ __name(() => {
    if (!highlightElement) {
      return;
    }
    highlightElement.parentElement?.removeChild(highlightElement);
  }, "clearInspector");
  var render = /* @__PURE__ */ __name((e3) => {
    const element = e3.element ?? findElement(e3.selector);
    if (!element) {
      return;
    }
    currentElement = element;
    renderHighlight(element, e3);
  }, "render");
  function createHighlightElement() {
    const highlightElement2 = document.createElement("div");
    highlightElement2.style.background = "rgba(255, 196, 0,0.1)";
    highlightElement2.style.position = "fixed";
    highlightElement2.style.zIndex = "999999";
    highlightElement2.contentEditable = "false";
    const highlightElementLabel2 = document.createElement("label");
    highlightElement2.appendChild(highlightElementLabel2);
    highlightElementLabel2.style.position = "absolute";
    highlightElementLabel2.style.fontSize = "10px";
    highlightElementLabel2.style.width = "fit-content";
    highlightElementLabel2.style.maxWidth = "min(180%, calc(100vw - 2rem))";
    highlightElementLabel2.style.whiteSpace = "nowrap";
    highlightElementLabel2.style.overflow = "hidden";
    highlightElementLabel2.style.textOverflow = "ellipsis";
    highlightElementLabel2.style.marginTop = "-16px";
    highlightElementLabel2.style.background = "#f59e0b";
    highlightElementLabel2.style.color = "#fefce8";
    highlightElementLabel2.style.padding = "2px 2px";
    highlightElementLabel2.style.left = "-2px";
    highlightElementLabel2.style.borderRadius = "2px";
    highlightElementLabel2.style.direction = "rtl";
    highlightElementLabel2.style.pointerEvents = "none";
    highlightElement2.addEventListener("pointerdown", (e3) => {
      e3.preventDefault();
      e3.stopPropagation();
    });
    highlightElement2.addEventListener("mousedown", (e3) => {
      e3.preventDefault();
      e3.stopPropagation();
    });
    highlightElement2.addEventListener("click", (e3) => {
      e3.preventDefault();
      e3.stopPropagation();
      eventListeners.get("click")?.forEach((value) => {
        value.listener.call(document, e3);
      });
    });
    highlightElementLabel2.contentEditable = "false";
    return { highlightElement: highlightElement2, highlightElementLabel: highlightElementLabel2 };
  }
  __name(createHighlightElement, "createHighlightElement");
  responsiveViewer.listen("HIGHLIGHT_ELEMENT", render);
  responsiveViewer.listen("HIGHLIGHT_ELEMENT_FOCUS", (e3) => {
    if (highlightElement) {
      const box = highlightElement.getBoundingClientRect();
      if (box.bottom > window.innerHeight || box.top < 0) {
        highlightElement.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "center"
        });
      }
    }
  });
  responsiveViewer.listen("CLEAR_HIGHLIGHT_ELEMENT", clearInspector);
  var eventListeners = /* @__PURE__ */ new Map();
  var inspection = {
    clear: clearInspector,
    render,
    reRender() {
      if (currentElement && highlightElement) {
        const targetHighlightElement = highlightElement;
        attach(currentElement, targetHighlightElement);
      }
    },
    get highlightElement() {
      return highlightElement;
    },
    addEventListener(type, listener, options) {
      if (!eventListeners.has(type)) {
        eventListeners.set(type, []);
      }
      eventListeners.get(type)?.push({
        listener,
        options
      });
    },
    removeEventListener(type, listener, options) {
      if (eventListeners.has(type)) {
        eventListeners.set(
          type,
          eventListeners.get(type)?.filter((value) => value.listener !== listener) ?? []
        );
      }
    }
  };

  // src/plugins/plugins/commons/utils.ts
  var returnSelf = /* @__PURE__ */ __name((element, _event) => element, "returnSelf");
  function getMouseElement(e3, {
    verifier = returnSelf,
    parent
  } = {}) {
    for (const element of document.elementsFromPoint(e3.clientX, e3.clientY)) {
      if (element.hasAttribute(BASE_APP_ATTR)) {
        continue;
      }
      if (parent && (parent.contains(element) || parent.isSameNode(element))) {
        continue;
      }
      if (!isVisible(element)) {
        continue;
      }
      const found = findWrappingSvg(element) ?? element;
      const el = verifier(found, e3);
      if (el) {
        return el;
      }
    }
    return null;
  }
  __name(getMouseElement, "getMouseElement");
  function isVisible(element) {
    const box = element.getBoundingClientRect();
    return box.width > 1 && box.height > 1;
  }
  __name(isVisible, "isVisible");

  // src/plugins/plugins/commons/inspect-element.ts
  var import_throttle = __toESM(require_throttle());
  var import_omit = __toESM(require_omit());
  var enableMouseInspector = /* @__PURE__ */ __name((onClick, options = {
    showLabel: true,
    highlight: true,
    getElement: (element) => element,
    onClear: () => {
    },
    broadcast: false
  }) => {
    let currentInspected = null;
    options = {
      getElement: (element) => element,
      onClear: () => {
      },
      broadcast: false,
      ...options
    };
    const onMouseLeave = /* @__PURE__ */ __name(() => {
      responsiveViewer.memory("SYNC_MOUSE", true);
      currentInspected = null;
      inspection.clear();
      options.onClear?.();
      options.onMouseLeave?.();
      if (options.broadcast) {
        responsiveViewer.broadcast("CLEAR_HIGHLIGHT_ELEMENT");
      }
    }, "onMouseLeave");
    const inspectByMouseMove = (0, import_throttle.default)((e3) => {
      const getElement = options.getElement ?? ((element2, _e) => element2);
      const element = getMouseElement(e3, {
        verifier: getElement,
        parent: inspection.highlightElement
      });
      if (!element) {
        onMouseLeave();
        return;
      }
      responsiveViewer.memory("SYNC_MOUSE", false);
      currentInspected = getInspectionObject(element);
      inspection.render({
        ...options,
        ...currentInspected
      });
      if (options.broadcast) {
        responsiveViewer.broadcast("HIGHLIGHT_ELEMENT", {
          ...(0, import_omit.default)(currentInspected, "element"),
          showLabel: false,
          highlight: false
        });
      }
      options.onMouseMove?.(currentInspected, e3);
    }, 50);
    const clickCallback = /* @__PURE__ */ __name((e3) => {
      if (!currentInspected) {
        return;
      }
      e3.preventDefault();
      e3.stopPropagation();
      e3.stopImmediatePropagation();
      if (options.broadcast) {
        responsiveViewer.broadcast("HIGHLIGHT_ELEMENT_FOCUS");
      }
      onClick(
        currentInspected,
        {
          append: e3.altKey
        },
        e3
      );
    }, "clickCallback");
    const onScroll = /* @__PURE__ */ __name(() => {
      inspection.reRender();
    }, "onScroll");
    inspection.addEventListener("click", clickCallback);
    document.addEventListener("scroll", onScroll);
    document.addEventListener("mousemove", inspectByMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);
    return () => {
      inspection.clear();
      options.onClear?.();
      document.removeEventListener("mousemove", inspectByMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      inspection.removeEventListener("click", clickCallback);
      document.removeEventListener("scroll", onScroll);
      responsiveViewer.memory("SYNC_MOUSE", true);
    };
  }, "enableMouseInspector");
  function getInspectionObject(element) {
    let label = "";
    if (element.tagName === "INPUT") {
      label = element.getAttribute("placeholder") || element.getAttribute("value") || "";
    } else if (element.tagName === "IMG") {
      label = element.getAttribute("alt") || "";
    } else if (element.tagName === "A") {
      label = element.title;
    }
    if (!label) {
      label = element.innerText;
    }
    return {
      selector: domPath(element, true),
      label: (label || "").slice(0, MAX_INSPECTION_LABEL_ELEMENT_LENGTH),
      element
    };
  }
  __name(getInspectionObject, "getInspectionObject");

  // src/utils/apply-styles-with-cache.ts
  var cache = /* @__PURE__ */ new WeakMap();
  var applyStylesWithCache = /* @__PURE__ */ __name((element, style2) => {
    const keys = Object.keys(style2);
    const cacheObject = {};
    for (let key of keys) {
      cacheObject[key] = element.style[key];
    }
    for (let key of keys) {
      element.style[key] = style2[key];
    }
    cache.set(element, cacheObject);
  }, "applyStylesWithCache");
  var applyStylesFromCache = /* @__PURE__ */ __name((el) => {
    const fromCache = cache.get(el);
    if (fromCache) {
      for (const [name, value] of Object.entries(fromCache)) {
        el.style[name] = value;
      }
    }
  }, "applyStylesFromCache");

  // src/plugins/plugins/commons/isolation-mode.ts
  var import_omit2 = __toESM(require_omit());
  function isElementInViewport(element, options = { partial: false }) {
    if (!element) {
      throw new Error("Element is required");
    }
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    const windowWidth = window.innerWidth || document.documentElement.clientWidth;
    if (options.partial) {
      return rect.top < windowHeight && rect.left < windowWidth && rect.bottom > 0 && rect.right > 0;
    } else {
      return rect.top >= 0 && rect.left >= 0 && rect.bottom <= windowHeight && rect.right <= windowWidth;
    }
  }
  __name(isElementInViewport, "isElementInViewport");
  var style;
  var justSelecting = false;
  var cleanup = /* @__PURE__ */ __name(() => {
    document.querySelectorAll(\`[\${BASE_APP_ATTR}],[\${BASE_APP_ATTR_PARENT}]\`).forEach((element) => {
      const el = element;
      element.removeAttribute(BASE_APP_ATTR);
      element.removeAttribute(BASE_APP_ATTR_PARENT);
      applyStylesFromCache(el);
    });
    applyStylesFromCache(document.body);
    if (style) {
      style.remove();
    }
  }, "cleanup");
  var updateIsolationMode = /* @__PURE__ */ __name((isolationMode) => {
    if (justSelecting) {
      return;
    }
    if (!isolationMode.enabled || !isolationMode?.selector?.trim?.()) {
      cleanup();
      return;
    }
    cleanup();
    const elements = tryFind(isolationMode.selector);
    if (style && style.parentElement) {
      style.remove();
    }
    if (!style) {
      style = document.createElement("style");
      style.innerText = \`     
      [\${BASE_APP_ATTR_PARENT}='true'] > :not([\${BASE_APP_ATTR}='true']):not([\${BASE_APP_ATTR_PARENT}='true']){
        opacity: var(--\${ISOLATION_MODE_OPACITY_CSS_VAR}) !important; 
      }
  \`;
    }
    document.documentElement.style.setProperty(
      \`--\${ISOLATION_MODE_OPACITY_CSS_VAR}\`,
      ((isolationMode.opacity ?? 0) / 100).toString()
    );
    elements.forEach((element) => {
      element.setAttribute(BASE_APP_ATTR, "true");
      let parent = element.parentElement;
      while (parent) {
        parent.setAttribute(BASE_APP_ATTR_PARENT, "true");
        parent = parent.parentElement;
      }
    });
    if (elements[0]) {
      if (!isElementInViewport(elements[0])) {
        elements[0].scrollIntoView();
      }
    }
    if (!style.parentElement) {
      document.head.appendChild(style);
    }
  }, "updateIsolationMode");
  var mouseInspector = null;
  responsiveViewer.listen("UPDATE_RUNTIME_ISOLATION_MODE", (state1) => {
    if (mouseInspector) {
      mouseInspector();
      mouseInspector = null;
    } else if (state1.isolationMode.inspectorEnabled) {
      mouseInspector = enableMouseInspector(
        (inspection2, _, event) => {
          event.preventDefault();
          event.stopImmediatePropagation();
          responsiveViewer.inform(
            "SELECTED_FOR_ISOLATION",
            (0, import_omit2.default)(inspection2, "element")
          );
          mouseInspector?.();
          mouseInspector = null;
        },
        {
          broadcast: true
        }
      );
    }
  });
  responsiveViewer.listen("SELECT_APP", (data) => {
    if (!data.user.isPremium) {
      return;
    }
    setTimeout(() => {
      updateIsolationMode(data.app.isolationMode);
    }, 150);
  });
  responsiveViewer.listen("UPDATE_ISOLATION_MODE", (data) => {
    updateIsolationMode(data.isolationMode);
  });
  function tryFind(selector) {
    try {
      return document.querySelectorAll(selector);
    } catch (error) {
      return [];
    }
  }
  __name(tryFind, "tryFind");

  // src/utils/onRefresh.ts
  var onRefresh = /* @__PURE__ */ __name((callback) => {
    const onRefresh2 = /* @__PURE__ */ __name((e3) => {
      let isF5 = false;
      let isR = false;
      const code = e3.code;
      if (code === "F5") {
        isF5 = true;
      }
      if (code === "KeyR") {
        isR = true;
      }
      if (isF5 || (e3.ctrlKey || e3.metaKey) && isR) {
        e3.preventDefault();
        callback();
      }
    }, "onRefresh");
    window.addEventListener("keydown", onRefresh2);
    return () => {
      window.removeEventListener("keydown", onRefresh2);
    };
  }, "onRefresh");

  // src/plugins/plugins/commons/refresh.ts
  var requestRefresh = /* @__PURE__ */ __name(() => {
    onRefresh(() => {
      responsiveViewer.broadcast("REFRESH");
      window.location.reload();
    });
    responsiveViewer.listen("REFRESH", () => {
      window.location.reload();
    });
  }, "requestRefresh");

  // src/utils/find-meta-tag.ts
  var findMetaTag = /* @__PURE__ */ __name((key, keyValue, keyToReturn = key) => {
    const allMeta = document.getElementsByTagName("meta");
    for (let i = 0; i < allMeta.length; i++) {
      if (allMeta[i].getAttribute(key) === keyValue) {
        return allMeta[i].getAttribute(keyToReturn);
      }
    }
  }, "findMetaTag");

  // src/plugins/plugins/commons/update-header-color.ts
  var updateHeaderColor = /* @__PURE__ */ __name(() => {
    responsiveViewer.inform("READY", {
      themeColor: findMetaTag("name", "theme-color", "content"),
      title: document.title
    });
  }, "updateHeaderColor");

  // src/plugins/plugins/commons/zoom.ts
  function onZoom() {
    window.addEventListener(
      "keydown",
      (e3) => {
        if (e3.shiftKey) {
          responsiveViewer.inform("READY_TO_SCROLL", {
            ready: true
          });
        }
      },
      {
        capture: true
      }
    );
    window.addEventListener(
      "keyup",
      (e3) => {
        if (e3.code === "ShiftLeft") {
          responsiveViewer.inform("READY_TO_SCROLL", {
            ready: false
          });
        }
      },
      {
        capture: true
      }
    );
  }
  __name(onZoom, "onZoom");

  // src/plugins/plugins/commons/dimensions/get-anchors.ts
  function closest(num, nums) {
    let closestPoint = null;
    let minDistance = Infinity;
    for (let point of nums) {
      const distance = Math.abs(point - num);
      if (distance < minDistance) {
        minDistance = distance;
        closestPoint = point;
      }
    }
    return closestPoint || 0;
  }
  __name(closest, "closest");
  var getXAnchors = /* @__PURE__ */ __name((box1, box) => {
    let anchorSourceY = box1.top + box1.height / 2;
    let anchorDestinationY = box.top + box.height / 2;
    if (anchorSourceY > box.top && anchorSourceY < box.bottom) {
      anchorDestinationY = anchorSourceY;
    }
    return {
      anchorSourceY,
      anchorDestinationY
    };
  }, "getXAnchors");
  var getYAnchors = /* @__PURE__ */ __name((box1, box2) => {
    let anchorSourceX = box1.left + box1.width / 2;
    let anchorDestinationX = closest(anchorSourceX, [
      box2.left,
      box2.left + box2.width / 2,
      box2.left + box2.width
    ]);
    if (anchorSourceX > box2.left && anchorSourceX < box2.right) {
      anchorDestinationX = anchorSourceX;
    }
    return {
      anchorSourceX,
      anchorDestinationX
    };
  }, "getYAnchors");

  // src/plugins/plugins/commons/dimensions/closest-side-distances.ts
  function closestSideDistances(square1, square2, dimensions) {
    const left1 = square1.x;
    const right1 = square1.x + square1.width;
    const top1 = square1.y;
    const bottom1 = square1.y + square1.height;
    const left2 = square2.x;
    const right2 = square2.x + square2.width;
    const top2 = square2.y;
    const bottom2 = square2.y + square2.height;
    let distances = [
      {
        sides: "left-left",
        distance: Math.abs(left1 - left2)
      },
      {
        sides: "left-right",
        distance: Math.abs(left1 - right2)
      },
      {
        sides: "right-left",
        distance: Math.abs(right1 - left2)
      },
      {
        sides: "right-right",
        distance: Math.abs(right1 - right2)
      },
      {
        sides: "top-top",
        distance: Math.abs(top1 - top2)
      },
      {
        sides: "top-bottom",
        distance: Math.abs(top1 - bottom2)
      },
      {
        sides: "bottom-top",
        distance: Math.abs(bottom1 - top2)
      },
      {
        sides: "bottom-bottom",
        distance: Math.abs(bottom1 - bottom2)
      }
    ];
    function isPointInsideRect(point, rect) {
      return point.x >= rect.left && point.x <= rect.right && point.y >= rect.top && point.y <= rect.bottom;
    }
    __name(isPointInsideRect, "isPointInsideRect");
    const isRectInsideRect = /* @__PURE__ */ __name((rect1, rect2) => {
      return isPointInsideRect({ x: rect1.x, y: rect1.y }, rect2) || isPointInsideRect({ x: rect1.x, y: rect1.y + rect1.height }, rect2) || isPointInsideRect({ x: rect1.x + rect1.width, y: rect1.y }, rect2) || isPointInsideRect(
        { x: rect1.x + rect1.width, y: rect1.y + rect1.height },
        rect2
      );
    }, "isRectInsideRect");
    const isWithin = dimensions.selectors.length !== 1 && isRectInsideRect(square1, square2) || isRectInsideRect(square1, square2);
    let isAuto = dimensions.guides.includes("auto");
    let allowed = dimensions.guides;
    if (dimensions.selectors.length === 1 || isWithin) {
      if (isAuto) {
        isAuto = false;
        allowed = ["left-left", "right-right", "top-top", "bottom-bottom"];
      }
    }
    if (!isAuto) {
      distances = distances.filter((d) => allowed.includes(d.sides));
    }
    distances.sort((a, b) => a.distance - b.distance);
    let result = distances.reduce((acc, point) => {
      switch (point.sides) {
        case "left-left":
          {
            const centerY2 = top1 + square1.height / 2;
            if (isAuto && centerY2 > top2 && centerY2 < bottom2) {
              return acc;
            }
          }
          const { anchorSourceY, anchorDestinationY } = getXAnchors(
            square1,
            square2
          );
          if (left1 < left2) {
            acc.push({
              ...point,
              lines: [
                {
                  from: { x: left1, y: anchorDestinationY },
                  to: { x: left2, y: anchorDestinationY },
                  type: "line"
                },
                {
                  from: { x: left1, y: anchorSourceY },
                  to: { x: left1, y: anchorDestinationY },
                  type: "edge"
                }
              ]
            });
          } else {
            acc.push({
              ...point,
              lines: [
                {
                  from: { x: left1, y: anchorSourceY },
                  to: { x: left2, y: anchorSourceY },
                  type: "line"
                },
                {
                  from: { x: left2, y: anchorDestinationY },
                  to: { x: left2, y: anchorSourceY },
                  type: "edge"
                }
              ]
            });
          }
          break;
        case "left-right":
          if (isAuto && left1 < right2) {
            return acc;
          }
          if (left1 < right2) {
            const { anchorSourceY: anchorSourceY2, anchorDestinationY: anchorDestinationY2 } = getXAnchors(
              square1,
              square2
            );
            acc.push({
              ...point,
              lines: [
                {
                  from: { x: left1, y: anchorSourceY2 },
                  to: { x: right2, y: anchorSourceY2 },
                  type: "line"
                },
                {
                  from: { x: right2, y: anchorSourceY2 },
                  to: { x: right2, y: anchorDestinationY2 },
                  type: "edge"
                }
              ]
            });
          } else {
            const { anchorSourceY: anchorSourceY2, anchorDestinationY: anchorDestinationY2 } = getXAnchors(
              square2,
              square1
            );
            acc.push({
              ...point,
              lines: [
                {
                  from: { x: left1, y: anchorDestinationY2 },
                  to: { x: right2, y: anchorDestinationY2 },
                  type: "line"
                },
                {
                  from: { x: right2, y: anchorSourceY2 },
                  to: { x: right2, y: anchorDestinationY2 },
                  type: "edge"
                }
              ]
            });
          }
          break;
        case "right-left":
          if (isAuto && right1 > left2) {
            return acc;
          }
          if (left1 < right2) {
            const { anchorSourceY: anchorSourceY2, anchorDestinationY: anchorDestinationY2 } = getXAnchors(
              square1,
              square2
            );
            acc.push({
              ...point,
              lines: [
                {
                  from: { x: right1, y: anchorSourceY2 },
                  to: { x: left2, y: anchorSourceY2 },
                  type: "line"
                },
                {
                  from: { x: left2, y: anchorSourceY2 },
                  to: { x: left2, y: anchorDestinationY2 },
                  type: "edge"
                }
              ]
            });
          } else {
            const { anchorSourceY: anchorSourceY2, anchorDestinationY: anchorDestinationY2 } = getXAnchors(
              square1,
              square2
            );
            acc.push({
              ...point,
              lines: [
                {
                  from: { x: left1, y: anchorSourceY2 },
                  to: { x: right2, y: anchorSourceY2 },
                  type: "line"
                },
                {
                  from: { x: right2, y: anchorSourceY2 },
                  to: { x: right2, y: anchorDestinationY2 },
                  type: "edge"
                }
              ]
            });
          }
          break;
        case "right-right":
          const centerY = top1 + square1.height / 2;
          if (isAuto && centerY > top2 && centerY < bottom2) {
            return acc;
          }
          if (right1 < right2) {
            const { anchorSourceY: anchorSourceY2, anchorDestinationY: anchorDestinationY2 } = getXAnchors(
              square1,
              square2
            );
            acc.push({
              ...point,
              lines: [
                {
                  from: { x: right1, y: anchorSourceY2 },
                  to: { x: right2, y: anchorSourceY2 },
                  type: "line"
                },
                {
                  from: { x: right2, y: anchorSourceY2 },
                  to: { x: right2, y: anchorDestinationY2 },
                  type: "edge"
                }
              ]
            });
          } else {
            const { anchorSourceY: anchorSourceY2, anchorDestinationY: anchorDestinationY2 } = getXAnchors(
              square2,
              square1
            );
            acc.push({
              ...point,
              lines: [
                {
                  from: { x: right1, y: anchorSourceY2 },
                  to: { x: right2, y: anchorSourceY2 },
                  type: "line"
                },
                {
                  from: { x: right1, y: anchorSourceY2 },
                  to: { x: right1, y: anchorDestinationY2 },
                  type: "edge"
                }
              ]
            });
          }
          break;
        case "top-top":
          const centerX = left1 + square1.width / 2;
          if (isAuto && centerX > left2 && centerX < right2) {
            return acc;
          }
          if (top1 < top2) {
            const { anchorSourceX, anchorDestinationX } = getYAnchors(
              square2,
              square1
            );
            acc.push({
              ...point,
              lines: [
                {
                  from: { x: anchorSourceX, y: top2 },
                  to: { x: anchorSourceX, y: top1 },
                  type: "line"
                },
                {
                  from: { x: anchorSourceX, y: top1 },
                  to: { x: anchorDestinationX, y: top1 },
                  type: "edge"
                }
              ]
            });
          } else {
            const { anchorSourceX, anchorDestinationX } = getYAnchors(
              square1,
              square2
            );
            acc.push({
              ...point,
              lines: [
                {
                  from: { x: anchorSourceX, y: top1 },
                  to: { x: anchorSourceX, y: top2 },
                  type: "line"
                },
                {
                  from: { x: anchorSourceX, y: top2 },
                  to: { x: anchorDestinationX, y: top2 },
                  type: "edge"
                }
              ]
            });
          }
          break;
        case "top-bottom":
          {
            if (isAuto && bottom2 > top1) {
              return acc;
            }
            const { anchorSourceX, anchorDestinationX } = getYAnchors(
              square1,
              square2
            );
            acc.push({
              ...point,
              lines: [
                {
                  from: { x: anchorSourceX, y: top1 },
                  to: { x: anchorSourceX, y: bottom2 },
                  type: "line"
                },
                {
                  from: { x: anchorSourceX, y: bottom2 },
                  to: { x: anchorDestinationX, y: bottom2 },
                  type: "edge"
                }
              ]
            });
          }
          break;
        case "bottom-top":
          {
            if (isAuto && bottom1 > top2) {
              return acc;
            }
            const { anchorSourceX, anchorDestinationX } = getYAnchors(
              square1,
              square2
            );
            acc.push({
              ...point,
              lines: [
                {
                  from: { x: anchorSourceX, y: bottom1 },
                  to: { x: anchorSourceX, y: top2 },
                  type: "line"
                },
                {
                  from: { x: anchorSourceX, y: top2 },
                  to: { x: anchorDestinationX, y: top2 },
                  type: "edge"
                }
              ]
            });
          }
          break;
        case "bottom-bottom":
          {
            const centerX2 = left1 + square1.width / 2;
            if (isAuto && centerX2 > left2 && centerX2 < right2) {
              return acc;
            }
            if (bottom1 > bottom2) {
              const { anchorSourceX, anchorDestinationX } = getYAnchors(
                square1,
                square2
              );
              acc.push({
                ...point,
                lines: [
                  {
                    from: { x: anchorDestinationX, y: bottom1 },
                    to: { x: anchorDestinationX, y: bottom2 },
                    type: "line"
                  },
                  {
                    from: { x: anchorDestinationX, y: bottom1 },
                    to: { x: anchorSourceX, y: bottom1 },
                    type: "edge"
                  }
                ]
              });
            } else {
              const { anchorSourceX, anchorDestinationX } = getYAnchors(
                square1,
                square2
              );
              acc.push({
                ...point,
                lines: [
                  {
                    from: { x: anchorSourceX, y: bottom1 },
                    to: { x: anchorSourceX, y: bottom2 },
                    type: "line"
                  },
                  {
                    from: { x: anchorSourceX, y: bottom2 },
                    to: { x: anchorDestinationX, y: bottom2 },
                    type: "edge"
                  }
                ]
              });
            }
          }
          break;
      }
      return acc;
    }, []);
    if (isAuto) {
      return result.filter((distance) => {
        if (distance.sides === "top-top" || distance.sides === "bottom-bottom") {
          if (square2.bottom <= square1.y || square1.bottom <= square2.y) {
            return false;
          }
        } else if (distance.sides === "left-left" || distance.sides === "right-right") {
          if (square1.right <= square2.x || square2.right <= square1.x) {
            return false;
          }
        }
        return true;
      });
    }
    return result;
  }
  __name(closestSideDistances, "closestSideDistances");

  // src/utils/clamp.ts
  var clamp = /* @__PURE__ */ __name((num, min, max) => Math.min(Math.max(num, min), max), "clamp");

  // src/lib/draw-text.ts
  var drawText = /* @__PURE__ */ __name((ctx, text, {
    side = { x: 0, y: 0 },
    left,
    top,
    paddingX = 5,
    paddingY = 3,
    fontSize = 12,
    fontFamily = "Arial",
    color = "white",
    background = HIGHLIGHT_COLOR_FOR_TOOLS,
    marginTop = 0,
    marginLeft = 0,
    scrollable = false,
    clamp: clamp2 = false
  }) => {
    ctx.save();
    ctx.font = \`\${fontSize}px \${fontFamily}\`;
    text = String(text);
    const textMetrics = ctx.measureText(text);
    const textWidth = textMetrics.width;
    const textHeight = (textMetrics.fontBoundingBoxAscent || textMetrics.actualBoundingBoxAscent) + (textMetrics.fontBoundingBoxDescent || textMetrics.actualBoundingBoxDescent);
    const boxWidth = textWidth + paddingX * 2;
    const boxHeight = textHeight + paddingY * 2;
    ctx.translate(boxWidth * side.x, boxHeight * side.y);
    const scrollX = scrollable ? window.scrollX : 0;
    const scrollY = scrollable ? window.scrollY : 0;
    const pos = {
      x: left + marginLeft + scrollX,
      y: top + marginTop + scrollY
    };
    if (clamp2) {
      pos.x = clamp(
        pos.x,
        boxWidth + paddingX,
        getScrollWidth(document) - boxWidth - paddingX
      ) - scrollX;
      pos.y = clamp(pos.y, boxHeight + paddingY, getScrollHeight(document)) - scrollY;
    }
    ctx.fillStyle = background;
    ctx.beginPath();
    ctx.roundRect(pos.x, pos.y, boxWidth, boxHeight, 4);
    ctx.fill();
    ctx.fillStyle = color;
    ctx.textBaseline = "middle";
    ctx.fillText(text, pos.x + paddingX, pos.y + boxHeight * 0.54);
    ctx.restore();
  }, "drawText");

  // src/plugins/plugins/commons/dimensions/draw-guides.ts
  var isHorizontal = /* @__PURE__ */ __name((side) => {
    return ["left-left", "left-right", "right-left", "right-right"].includes(side);
  }, "isHorizontal");
  var drawGuides = /* @__PURE__ */ __name((ctx, elements, dimensions) => {
    const boxes = elements.filter((element) => element?.parentElement).map((element) => element.getBoundingClientRect());
    const toBody = boxes.length === 1;
    const lines = [];
    const mark = /* @__PURE__ */ __name((x, y) => {
      ctx.save();
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, 2 * Math.PI, false);
      ctx.fillStyle = "red";
      ctx.fill();
      ctx.restore();
    }, "mark");
    for (let i = 0; i < boxes.length; i++) {
      const box = boxes[i];
      const next = toBody ? document.body.getBoundingClientRect() : boxes[i + 1];
      ctx.beginPath();
      ctx.strokeStyle = DEFAULT_COLOR_FOR_TOOLS;
      ctx.strokeRect(box.x, box.y, box.width, box.height);
      if (next) {
        const points = closestSideDistances(box, next, dimensions);
        for (let point of points) {
          for (let line of point.lines) {
            if (line.type === "line") {
              lines.push({
                ...line,
                sides: point.sides,
                square: box
              });
            }
            ctx.save();
            ctx.beginPath();
            ctx.strokeStyle = line.color || HIGHLIGHT_COLOR_FOR_TOOLS;
            if (line.type === "edge") {
              ctx.setLineDash([3]);
            }
            ctx.moveTo(line.from.x, line.from.y);
            ctx.lineTo(line.to.x, line.to.y);
            ctx.stroke();
            ctx.restore();
          }
        }
      }
      drawText(
        ctx,
        \`\${Number(box.width.toFixed(2))} x \${Number(box.height.toFixed(2))}\`,
        {
          left: box.right,
          top: box.top,
          side: {
            x: -1,
            y: -1
          },
          marginTop: -5
        }
      );
    }
    for (let line of lines) {
      if (line.type === "line") {
        let toBody2 = true;
        const margin = 20;
        if (isHorizontal(line.sides)) {
          const space = line.from.x - line.to.x;
          const sign = Math.sign(
            line.square.x + line.square.width / 2 - line.to.x
          );
          drawText(ctx, Number(Math.abs(space).toFixed(2)) + "px", {
            left: line.from.x - (toBody2 ? margin * sign : space / 2),
            top: line.from.y,
            background: line.color,
            side: {
              x: toBody2 ? (1 + sign) / -2 : -0.5,
              y: -0.5
            },
            clamp: true
          });
        } else {
          const space = line.from.y - line.to.y;
          const sign = Math.sign(
            line.square.y + line.square.height / 2 - line.to.y
          );
          drawText(ctx, Number(Math.abs(space).toFixed(2)) + "px", {
            left: line.from.x,
            top: line.from.y - (toBody2 ? margin * sign : space / 2),
            background: line.color,
            side: {
              x: -0.5,
              y: toBody2 ? (1 + sign) / -2 : -0.5
            },
            clamp: true
          });
        }
      }
    }
  }, "drawGuides");

  // src/utils/find-element.ts
  function findElement2(selector, first) {
    try {
      if (first) {
        return document.querySelector(selector);
      } else {
        return Array.from(document.querySelectorAll(selector));
      }
    } catch (error) {
      if (process.env.APP_PLATFORM === "LOCAL") {
        console.warn("findElement: invalid selector", selector, error);
      }
      return [];
    }
  }
  __name(findElement2, "findElement");

  // src/plugins/plugins/commons/dimensions-2.ts
  var import_omit3 = __toESM(require_omit());
  var DRAW_COMMAND = "DIMENSIONS";
  var justSelecting2 = false;
  var state;
  var observers = [];
  var onCancel = /* @__PURE__ */ __name((e3) => {
    if (e3.key === "Escape") {
      responsiveViewer.inform("DIMENSIONS_CANCEL");
    }
  }, "onCancel");
  var updateDimensions = /* @__PURE__ */ __name((dimensions) => {
    if (justSelecting2) {
      return;
    }
    observers.forEach((observer) => observer.disconnect());
    observers = [];
    window.removeEventListener("keydown", onCancel);
    responsiveViewer.canvas.removeDraw(DRAW_COMMAND, true);
    if (!dimensions.enabled) {
      return;
    }
    const elements = dimensions.selectors.map((selector) => findElement2(selector.selector, true)).filter(Boolean);
    const drawFn = /* @__PURE__ */ __name((ctx) => drawGuides(ctx, elements, dimensions), "drawFn");
    responsiveViewer.canvas.addDraw(drawFn, DRAW_COMMAND);
    responsiveViewer.canvas.render();
    for (let element of elements) {
      const observer = new MutationObserver(() => {
        responsiveViewer.canvas.render();
      });
      observer.observe(element, {
        attributes: true,
        subtree: true
      });
      observers.push(observer);
    }
    window.addEventListener("keyup", onCancel);
  }, "updateDimensions");
  var mouseInspector2 = null;
  responsiveViewer.listen(
    "UPDATE_RUNTIME_DIMENSIONS",
    ({ dimensions }) => {
      if (mouseInspector2) {
        mouseInspector2();
        mouseInspector2 = null;
        responsiveViewer.memory("SYNC_MOUSE", true);
        updateDimensions(state);
      }
      if (dimensions.enabled) {
        responsiveViewer.memory("SYNC_MOUSE", false);
        mouseInspector2 = enableMouseInspector(
          (inspection2, options) => {
            responsiveViewer.memory("SYNC_MOUSE", true);
            responsiveViewer.inform("SELECTED_FOR_DIMENSIONS", {
              inspector: {
                mode: dimensions.reselect ? "update" : options.append ? "append" : "add",
                ...(0, import_omit3.default)(inspection2, "element"),
                id: dimensions.reselect ? dimensions.reselect.id : uniqueId()
              }
            });
            if (!options.append) {
              mouseInspector2?.();
              mouseInspector2 = null;
            }
          },
          {
            showLabel: false,
            highlight: false,
            broadcast: true,
            onMouseMove: (inspection2) => {
              if (dimensions.reselect?.id) {
                updateDimensions({
                  ...state,
                  selectors: state.selectors.map((selector) => {
                    if (selector.id === dimensions.reselect?.id) {
                      return {
                        ...selector,
                        ...(0, import_omit3.default)(inspection2, "element")
                      };
                    }
                    return selector;
                  })
                });
              } else {
                updateDimensions({
                  ...state,
                  selectors: [
                    ...state.selectors,
                    {
                      selector: inspection2.selector,
                      id: uniqueId(),
                      label: inspection2.label
                    }
                  ]
                });
              }
            },
            onMouseLeave: () => {
            }
          }
        );
      }
    }
  );
  responsiveViewer.listen("SELECT_APP", (data) => {
    if (!data.user.isPremium) {
      return;
    }
    responsiveViewer.onReady(() => {
      state = data.app.dimensions;
      updateDimensions(data.app.dimensions);
    });
  });
  responsiveViewer.listen("UPDATE_DIMENSIONS", (data) => {
    state = data.dimensions;
    updateDimensions(data.dimensions);
  });

  // src/plugins/plugins/commons/hover.ts
  responsiveViewer.listen(
    "ELEMENTS_HOVER",
    ({
      selectors,
      scrollIntoView = true
    }) => {
      responsiveViewer.canvas.removeDraw("ELEMENTS_HOVER");
      const elements = findElement2(selectors.join(","));
      responsiveViewer.canvas.addDraw((ctx) => {
        const boxes = elements.map((element) => element.getBoundingClientRect());
        for (let box of boxes) {
          ctx.save();
          ctx.beginPath();
          ctx.rect(box.x, box.y, box.width, box.height);
          ctx.strokeStyle = HIGHLIGHT_COLOR_FOR_TOOLS;
          ctx.stroke();
          ctx.restore();
        }
      }, "ELEMENTS_HOVER");
      responsiveViewer.canvas.render();
    }
  );

  // src/plugins/plugins/commons/script.ts
  requestDimensions();
  requestRefresh();
  onZoom();
  updateHeaderColor();
  responsiveViewer.inform("SELECT_APP");

  // src/plugins/plugins/editing-mode/utils.ts
  function findTextNodeAtPosition(textNodes, x, y) {
    for (const textNode of textNodes) {
      const range = document.createRange();
      const text = textNode.textContent || "";
      for (let i = 0; i <= text.length; i++) {
        try {
          range.setStart(textNode, i);
          range.setEnd(textNode, i);
          const rect = range.getBoundingClientRect();
          if (rect.width <= 1 && rect.height <= 1)
            continue;
          const padding = 8;
          if (isWithinBox(x, y, rect, padding)) {
            return {
              node: textNode,
              offset: i
            };
          }
        } catch (e3) {
          continue;
        }
      }
    }
    return null;
  }
  __name(findTextNodeAtPosition, "findTextNodeAtPosition");
  function getTextNodesInElement(element) {
    const textNodes = [];
    let noneTextNodes = false;
    function walker(node, depth) {
      if (node.nodeType === Node.TEXT_NODE) {
        textNodes.push(node);
      } else {
        if (depth > 10) {
          noneTextNodes = true;
          return;
        }
        for (let i = 0; i < node.childNodes.length; i++) {
          walker(node.childNodes[i], depth + 1);
        }
      }
    }
    __name(walker, "walker");
    walker(element, 0);
    if (noneTextNodes) {
      return [];
    }
    return textNodes;
  }
  __name(getTextNodesInElement, "getTextNodesInElement");
  function getTextNodeAtElement(element, x, y) {
    const textNodes = getTextNodesInElement(element);
    if (textNodes.length > 0) {
      const closestTextNode = findTextNodeAtPosition(textNodes, x, y);
      return closestTextNode;
    }
    return null;
  }
  __name(getTextNodeAtElement, "getTextNodeAtElement");
  function isWithinBox(x, y, rect, padding = 0) {
    return x >= rect.left - padding && x <= rect.right + padding && y >= rect.top - padding && y <= rect.bottom + padding;
  }
  __name(isWithinBox, "isWithinBox");
  function placeCursorAtTextNode(textNode, offset) {
    const range = document.createRange();
    range.setStart(textNode, offset);
    range.setEnd(textNode, offset);
    const selection = window.getSelection();
    selection?.removeAllRanges();
    selection?.addRange(range);
  }
  __name(placeCursorAtTextNode, "placeCursorAtTextNode");

  // src/plugins/plugins/editing-mode/script.ts
  var import_omit4 = __toESM(require_omit());
  var PLUGIN_NAME = "editing-mode";
  var state2 = {
    active: false
  };
  var disableEventsCleanup;
  var editingStyle = null;
  function addEditingModeStyles() {
    if (!editingStyle) {
      editingStyle = document.createElement("style");
      editingStyle.textContent = \`
    /* Cursor styling for editing mode */
    * {
      caret-color: #ff6b6b !important;
      cursor: text !important;
    }  
    *:focus {
      outline: none !important;
    }
    /* Selection styling */
    ::selection {
      background-color: rgba(255, 107, 107, 0.3) !important;
      color: inherit !important;
    }
    
    /* Text selection highlight */
    ::-moz-selection {
      background-color: rgba(255, 107, 107, 0.3) !important;
      color: inherit !important;
    }
  \`;
    }
    if (!editingStyle.parentElement) {
      document.head.appendChild(editingStyle);
    }
    return () => {
      editingStyle?.remove();
    };
  }
  __name(addEditingModeStyles, "addEditingModeStyles");
  function clearPreviosState(state5) {
    if (!state5.element) {
      return;
    }
    if (state5.previousContentEditable) {
      state5.element.contentEditable = state5.previousContentEditable;
    } else {
      state5.element.removeAttribute("contenteditable");
    }
  }
  __name(clearPreviosState, "clearPreviosState");
  var onActivate = /* @__PURE__ */ __name(() => {
    addEditingModeStyles();
    const state5 = {
      node: null,
      element: null,
      previousContentEditable: null
    };
    let previosState = { ...state5 };
    const inspector = enableMouseInspector(
      (inspection2, __, event) => {
        if (previosState.element !== state5.element) {
          clearPreviosState(previosState);
        }
        const selection = state5.node;
        const element = state5.element;
        if (!selection || !element) {
          return;
        }
        if (element.hasAttribute("contenteditable")) {
          state5.previousContentEditable = element.contentEditable;
        } else {
          state5.previousContentEditable = null;
        }
        if (previosState.element !== element) {
          previosState = {
            ...state5
          };
        }
        if (selection && selection.node.nodeType === Node.TEXT_NODE) {
          element.contentEditable = "true";
          placeCursorAtTextNode(selection.node, selection.offset);
          disableEventsCleanup = disableEvents(["keydown", "keypress"], element);
          element.focus();
          element.addEventListener("input", (e3) => {
            responsiveViewer.broadcast("TEXT_CHANGED", {
              text: element.innerHTML,
              ...(0, import_omit4.default)(inspection2, "element")
            });
          });
        }
      },
      {
        showLabel: true,
        highlight: true,
        getElement: (element, event) => {
          const node = getTextNodeAtElement(element, event.clientX, event.clientY);
          state5.node = node;
          state5.element = node?.node?.parentElement ?? null;
          return state5.element;
        },
        onClear: () => {
          responsiveViewer.broadcast("CLEAR_HIGHLIGHT_ELEMENT");
        },
        broadcast: true
      }
    );
    return () => {
      clearPreviosState(previosState);
      editingStyle?.remove();
      inspector();
      disableEventsCleanup?.();
    };
  }, "onActivate");
  var onDeActivate = /* @__PURE__ */ __name(() => {
  }, "onDeActivate");
  responsiveViewer.onPluginActivate(PLUGIN_NAME, () => {
    state2.active = true;
    toggleActivation(state2);
  });
  responsiveViewer.onPluginDeActivate(PLUGIN_NAME, () => {
    state2.active = false;
    toggleActivation(state2);
  });
  responsiveViewer.onPluginLoaded(PLUGIN_NAME, (plugin) => {
    state2.active = plugin.active || false;
    toggleActivation(state2);
  });
  function toggleActivation(state5) {
    onDeActivate?.();
    if (state5.active) {
      onDeActivate = onActivate();
    } else {
      onDeActivate = /* @__PURE__ */ __name(() => {
      }, "onDeActivate");
    }
  }
  __name(toggleActivation, "toggleActivation");
  function disableEvents(events, element) {
    const listener = /* @__PURE__ */ __name((e3) => {
      e3.stopPropagation();
    }, "listener");
    events.forEach((event) => {
      element.addEventListener(event, listener);
    });
    return () => {
      events.forEach((event) => {
        element.removeEventListener(event, listener);
      });
    };
  }
  __name(disableEvents, "disableEvents");
  responsiveViewer.listen("TEXT_CHANGED", (inspection2) => {
    const element = findElement(inspection2.selector);
    if (element) {
      element.innerHTML = inspection2.text;
    }
  });

  // src/plugins/utils/get-dom-path.ts
  function validateHtmlId2(id) {
    const idRegex = /^[a-zA-Z][\\w-]*$/;
    return !!id.match(idRegex);
  }
  __name(validateHtmlId2, "validateHtmlId");
  function getDomPathStack(el) {
    const stack = [];
    while (el.parentElement != null) {
      let sibCount = 0;
      let sibIndex = 0;
      for (let i = 0; i < el.parentElement.childNodes.length; i++) {
        let sib = el.parentElement.childNodes[i];
        if (sib.nodeName === el.nodeName) {
          if (sib === el) {
            sibIndex = sibCount;
          }
          sibCount++;
        }
      }
      if (sibCount > 1) {
        stack.unshift(el.nodeName.toLowerCase() + ":eq(" + sibIndex + ")");
      } else {
        stack.unshift(el.nodeName.toLowerCase());
      }
      el = el.parentElement;
    }
    return stack;
  }
  __name(getDomPathStack, "getDomPathStack");
  function getDomPath2(element) {
    return getDomPathStack(element).join(" > ");
  }
  __name(getDomPath2, "getDomPath");

  // src/plugins/utils/serialize-event.ts
  var serializeEvent = /* @__PURE__ */ __name((event) => {
    if (!event) {
      return {};
    }
    const result = {};
    const getEventProperties = /* @__PURE__ */ __name((obj) => {
      const props = [];
      let current = obj;
      while (current && current !== Object.prototype) {
        props.push(...Object.getOwnPropertyNames(current));
        current = Object.getPrototypeOf(current);
      }
      return [...new Set(props)];
    }, "getEventProperties");
    const properties = getEventProperties(event);
    const essentialProperties = [
      "type",
      "bubbles",
      "cancelable",
      "defaultPrevented",
      "eventPhase",
      "isTrusted",
      "timeStamp",
      "target",
      "currentTarget"
    ];
    const mouseProperties = [
      "button",
      "buttons",
      "clientX",
      "clientY",
      "screenX",
      "screenY",
      "pageX",
      "pageY",
      "offsetX",
      "offsetY",
      "movementX",
      "movementY",
      "ctrlKey",
      "shiftKey",
      "altKey",
      "metaKey",
      "relatedTarget"
    ];
    const keyboardProperties = [
      "key",
      "code",
      "keyCode",
      "charCode",
      "which",
      "location",
      "repeat",
      "ctrlKey",
      "shiftKey",
      "altKey",
      "metaKey"
    ];
    const inputProperties = ["data", "inputType", "isComposing"];
    const allImportantProperties = [
      ...essentialProperties,
      ...mouseProperties,
      ...keyboardProperties,
      ...inputProperties
    ];
    for (const prop of properties) {
      try {
        const value = event[prop];
        const valueType = typeof value;
        if (["boolean", "string", "number"].includes(valueType)) {
          result[prop] = value;
        } else if (value === null || value === void 0) {
          result[prop] = value;
        } else if (allImportantProperties.includes(prop)) {
          if (valueType === "object" && value !== null) {
            if (value instanceof Node) {
              continue;
            }
            const objProps = Object.getOwnPropertyNames(value);
            const serializableProps = {};
            let hasSerializableProps = false;
            for (const objProp of objProps) {
              const objValue = value[objProp];
              if (["boolean", "string", "number"].includes(typeof objValue)) {
                serializableProps[objProp] = objValue;
                hasSerializableProps = true;
              }
            }
            if (hasSerializableProps) {
              result[prop] = serializableProps;
            }
          }
        }
      } catch (error) {
        continue;
      }
    }
    if (!result.type)
      result.type = event.type;
    if (result.bubbles === void 0)
      result.bubbles = event.bubbles;
    if (result.cancelable === void 0)
      result.cancelable = event.cancelable;
    if (result.isTrusted === void 0)
      result.isTrusted = event.isTrusted;
    if (result.timeStamp === void 0)
      result.timeStamp = event.timeStamp;
    return result;
  }, "serializeEvent");

  // src/plugins/plugins/sync-click/input-events.ts
  var syncInputEvents = /* @__PURE__ */ __name((state5) => {
    const events = ["change", "keydown", "keypress", "keyup", "input"];
    events.forEach((eventName) => {
      document.addEventListener(
        eventName,
        (event) => {
          responsiveViewer.inform("UNTRUSTED_SCROLL");
          if (!state5.active) {
            return;
          }
          if (!event.isTrusted) {
            return;
          }
          const target = event.target;
          if (!target) {
            return;
          }
          const path = getDomPath2(target);
          responsiveViewer.inform("UNTRUSTED_SCROLL");
          responsiveViewer.broadcast("INPUT_EVENT", {
            path,
            value: getTargetValue(target),
            eventName,
            event: serializeEvent(event)
          });
        },
        {
          capture: true
        }
      );
    });
  }, "syncInputEvents");
  function getTargetValue(target) {
    if (target.tagName.toLowerCase() === "select") {
      const selectedOptions = target.selectedOptions;
      const values = [];
      for (const option of selectedOptions) {
        values.push(option.value);
      }
      return values;
    }
    if (target.tagName.toLowerCase() === "textarea") {
      return target.value;
    }
    return target.value;
  }
  __name(getTargetValue, "getTargetValue");

  // src/plugins/plugins/sync-click/mouse-events.ts
  var import_lodash2 = __toESM(require_lodash());
  var onMouseEvent = /* @__PURE__ */ __name((e3) => {
    if (!e3.isTrusted) {
      return;
    }
    if (e3.type === "focus") {
      return;
    }
    const element = ensureHtmlElement(e3.target);
    if (!isHtmlElement(element)) {
      return;
    }
    const path = getDomPath2(element);
    const bounding = element.getBoundingClientRect();
    responsiveViewer.broadcast("MOUSE_EVENT", {
      type: e3.type,
      path,
      position: {
        x: e3.clientX - bounding.x,
        y: e3.clientY - bounding.y
      },
      serialized: serializeEvent(e3)
    });
  }, "onMouseEvent");
  function syncMouseEvents(state5) {
    listenToMouseEvents(state5, [
      "click",
      "pointerdown",
      // 'mousemove',
      "mousedown",
      "mouseup",
      "pointerup",
      "focus"
    ]);
    listenToMouseEvents(state5, ["mousemove", "mouseenter", "mouseleave"], 100);
  }
  __name(syncMouseEvents, "syncMouseEvents");
  function listenToMouseEvents(state5, events, timeout = 0) {
    let callback = /* @__PURE__ */ __name((e3) => {
      if (responsiveViewer.memory("SYNC_MOUSE") === false) {
        return;
      }
      responsiveViewer.inform("UNTRUSTED_SCROLL");
      if (!state5.active) {
        return;
      }
      onMouseEvent(e3);
    }, "callback");
    if (timeout > 0) {
      callback = (0, import_lodash2.throttle)(callback, timeout);
    }
    events.forEach(
      (event) => document.addEventListener(event, callback, { capture: true })
    );
  }
  __name(listenToMouseEvents, "listenToMouseEvents");

  // src/plugins/plugins/sync-click/trigger-mouse-events.ts
  var triggerMouseEvent = /* @__PURE__ */ __name(({
    type,
    path,
    position,
    ...rest
  }) => {
    let element = findElement(path);
    if (!element) {
      return;
    }
    if (type === "click" && element.tagName.toLowerCase() === "input" && !["checkbox", "radio"].includes(
      element.type.toLowerCase()
    )) {
      const evt2 = new MouseEvent("focus", {
        view: window,
        bubbles: true,
        cancelable: true
      });
      element.dispatchEvent(evt2);
      return;
    }
    const evt = new MouseEvent(type, {
      //@ts-ignore
      ...rest.serialized,
      bubbles: true,
      cancelable: false,
      view: window
    });
    element.dispatchEvent(evt);
    if (isDialog(element) && element.open) {
      element.close();
    }
  }, "triggerMouseEvent");
  function isDialog(element) {
    return element.tagName.toLowerCase() === "dialog";
  }
  __name(isDialog, "isDialog");

  // src/plugins/plugins/sync-click/trigger-input-events.ts
  var setUntrackedValue = {
    input: Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")?.set,
    textarea: Object.getOwnPropertyDescriptor(
      HTMLTextAreaElement.prototype,
      "value"
    )?.set,
    select: Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype, "value")?.set,
    option: Object.getOwnPropertyDescriptor(HTMLOptionElement.prototype, "value")?.set
  };
  var triggerInputEvent = /* @__PURE__ */ __name(({
    path,
    value,
    eventName,
    event
  }) => {
    const element = findElement(path);
    if (!element) {
      return;
    }
    const setter = setUntrackedValue[element.tagName.toLowerCase()];
    if (setter) {
      setter.call(element, Array.isArray(value) ? value.join(",") : value);
      if (element.tagName.toLowerCase() === "select") {
        const selectedOptions = element.options;
        for (const option of selectedOptions) {
          option.selected = value.includes(option.value);
        }
      }
    }
    if (eventName === "change" || eventName === "input") {
      const evt = new Event(eventName, {
        ...event ?? {},
        bubbles: true,
        cancelable: true
      });
      element.dispatchEvent(evt);
    } else {
      const evt = new KeyboardEvent(eventName, {
        ...event ?? {},
        bubbles: true,
        view: window
      });
      element.dispatchEvent(evt);
    }
  }, "triggerInputEvent");

  // src/plugins/plugins/sync-click/sync-incoming-events.ts
  var syncIncomingEvents = /* @__PURE__ */ __name((state5) => {
    responsiveViewer.listen("MOUSE_EVENT", (event) => {
      responsiveViewer.inform("UNTRUSTED_SCROLL");
      if (!state5.active) {
        return;
      }
      triggerMouseEvent(event);
    });
    responsiveViewer.listen("INPUT_EVENT", (event) => {
      responsiveViewer.inform("UNTRUSTED_SCROLL");
      if (!state5.active) {
        return;
      }
      triggerInputEvent(event);
    });
  }, "syncIncomingEvents");

  // src/plugins/plugins/sync-click/focus-blur-events.ts
  var syncBlurEvents = /* @__PURE__ */ __name((state5) => {
  }, "syncBlurEvents");

  // src/plugins/plugins/sync-click/script.ts
  var PLUGIN_NAME2 = "sync click";
  var state3 = {
    active: false
  };
  responsiveViewer.onPluginActivate(PLUGIN_NAME2, () => {
    state3.active = true;
  });
  responsiveViewer.onPluginDeActivate(PLUGIN_NAME2, () => {
    state3.active = false;
  });
  responsiveViewer.onPluginLoaded(PLUGIN_NAME2, (plugin) => {
    state3.active = plugin.active || false;
  });
  syncMouseEvents(state3);
  syncInputEvents(state3);
  syncIncomingEvents(state3);
  syncBlurEvents(state3);

  // src/plugins/plugins/sync-scroll/user-scroll-key.ts
  var USER_SCROLL_KEY = \`__\${MESSAGE_PREFIX}/USER_SRCOLL__\`;
  var setUserScrollKey = /* @__PURE__ */ __name((value) => window[USER_SCROLL_KEY] = value, "setUserScrollKey");
  var getUserScrollKey = /* @__PURE__ */ __name(() => window[USER_SCROLL_KEY], "getUserScrollKey");

  // src/plugins/plugins/sync-scroll/scroll-event.ts
  var syncScroll = /* @__PURE__ */ __name((state5) => {
    setUserScrollKey(false);
    function mouseEvent() {
      if (!state5.active) {
        return;
      }
      setUserScrollKey(true);
    }
    __name(mouseEvent, "mouseEvent");
    function disableScrollEvent() {
      if (!state5.active) {
        return;
      }
      setUserScrollKey(false);
    }
    __name(disableScrollEvent, "disableScrollEvent");
    window.addEventListener("keydown", (e3) => {
      if (!state5.active) {
        return;
      }
      const scrollKeys = ["Space", "PageUp", "PageDown", "ArrowUp", "ArrowDown"];
      const withCtrlScrollKeys = ["Home", "End"];
      if (scrollKeys.includes(e3.code) || e3.ctrlKey && withCtrlScrollKeys.includes(e3.code)) {
        setUserScrollKey(true);
      }
    });
    window.addEventListener("wheel", mouseEvent, {
      passive: false,
      capture: true
    });
    window.addEventListener("click", disableScrollEvent, {
      capture: true
    });
    window.addEventListener(
      "scroll",
      (e3) => {
        if (getUserScrollKey() === false) {
          responsiveViewer.inform("FRAME_SCROLL_UNTRUSTED");
          return;
        }
        if (!state5.active) {
          return;
        }
        if (!e3.target) {
          return;
        }
        broadcastScroll(e3.target);
      },
      {
        capture: true,
        passive: true
      }
    );
  }, "syncScroll");
  var broadcastScroll = /* @__PURE__ */ __name((element) => {
    const target = getScrollableTarget(element);
    if (target) {
      responsiveViewer.broadcast("FRAME_SCROLL", {
        scrollTop: target.scrollTop,
        scrollLeft: target.scrollLeft,
        path: getDomPath2(target)
      });
    } else {
      responsiveViewer.broadcast("FRAME_SCROLL", {
        scrollTop: document.documentElement.scrollTop,
        scrollLeft: document.documentElement.scrollLeft,
        path: ""
      });
    }
  }, "broadcastScroll");
  var isScrollable = /* @__PURE__ */ __name((el) => el.scrollWidth > el.clientWidth || el.scrollHeight > el.clientHeight, "isScrollable");
  var cache2 = /* @__PURE__ */ new WeakMap();
  var cacheTime = /* @__PURE__ */ new WeakMap();
  var getScrollableTarget = /* @__PURE__ */ __name((originalTarget) => {
    let target = originalTarget;
    let now = Date.now();
    let time = cacheTime.get(originalTarget) ?? 0;
    if (now - time < 3e3) {
      target = cache2.get(originalTarget);
      if (target) {
        return target;
      }
    }
    target = originalTarget;
    while (target && !isScrollable(target)) {
      if (!target.parentElement) {
        return null;
      }
      target = target.parentElement;
    }
    cache2.set(originalTarget, target);
    return target;
  }, "getScrollableTarget");

  // src/plugins/plugins/sync-scroll/trigger-scroll-events.ts
  var cache3 = {};
  function triggerScrollEvent(data) {
    setUserScrollKey(false);
    let element = cache3[data.path] ?? (data.path && findElement(data.path));
    if (!element) {
      element = document.documentElement;
    }
    cache3[data.path] = element;
    element.scrollTo({
      top: data.scrollTop,
      left: data.scrollLeft,
      behavior: "instant"
    });
  }
  __name(triggerScrollEvent, "triggerScrollEvent");

  // src/plugins/plugins/sync-scroll/sync-incoming-events.ts
  var syncIncomingEvents2 = /* @__PURE__ */ __name(() => {
    responsiveViewer.listen("FRAME_SCROLL", (event) => {
      triggerScrollEvent(event);
    });
  }, "syncIncomingEvents");

  // src/plugins/plugins/sync-scroll/script.ts
  var PLUGIN_NAME3 = "sync scroll";
  var state4 = {
    active: false
  };
  responsiveViewer.onPluginActivate(PLUGIN_NAME3, () => {
    state4.active = true;
  });
  responsiveViewer.onPluginDeActivate(PLUGIN_NAME3, () => {
    state4.active = false;
  });
  responsiveViewer.onPluginLoaded(PLUGIN_NAME3, (plugin) => {
    state4.active = plugin.active || false;
  });
  syncScroll(state4);
  syncIncomingEvents2();

  // src/plugins/plugins/core.ts
  responsiveViewer.listen("scroll", (data) => {
    responsiveViewer.inform("SCROLL_RESPONSE", {
      scrollTop: window?.scrollY,
      scrollLeft: window?.scrollX,
      bodyWidth: getScrollWidth(document),
      bodyHeight: getScrollHeight(document)
    });
  });
})();
/*! Bundled license information:

lodash/lodash.js:
  (**
   * @license
   * Lodash <https://lodash.com/>
   * Copyright OpenJS Foundation and other contributors <https://openjsf.org/>
   * Released under MIT license <https://lodash.com/license>
   * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
   * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
   *)
*/
`;var Wa=t=>{t.id&&(chrome.scripting.executeScript({target:{tabId:t.id},files:["/init.js"]}),chrome.scripting.executeScript({target:{tabId:t.id},files:["/main.js"]}))},Pe=class{constructor(e){this.injected=!1;this.tab=e,this.onWebNavigationComplete=this.onWebNavigationComplete.bind(this)}handle(){chrome.webNavigation.onCommitted.addListener(this.onWebNavigationComplete)}dispose(){chrome.webNavigation.onCommitted.removeListener(this.onWebNavigationComplete)}onWebNavigationComplete(e){if(!this.isValidTab(e.tabId,e.url)||!this.verifyHostname(e.url)||this.inject(e.frameId)||!this.tab.screens.get(e.frameId))return;let r=this.tab.screens.get(e.frameId);chrome.scripting.executeScript({target:{tabId:this.tab.tab.id,frameIds:[e.frameId]},func:(a,n,o)=>{window[o]=n,new Function(a)()},args:[hr,r,pr],injectImmediately:!0,world:"MAIN"}),chrome.tabs.sendMessage(this.tab.tab.id,{message:_("FRAME_CONNECTED"),frameId:e.frameId,screenId:r})}inject(e){return e!==0||this.injected?!1:(this.injected=!0,Wa(this.tab.tab),this.tab.isReady=!0,this.tab.blockingActions.actions.find(a=>a instanceof L)?.removeInitialResponseRules(),!0)}isValidTab(e,r){return this.tab.tab.id===e&&r!=="about:blank"}verifyHostname(e){return ve(e)===this.tab.hostname}};var Oe=class{constructor(){this.lastId=0}generate(){return this.lastId++,this.lastId}};var Ce,Ga=new Uint8Array(16);function nt(){if(!Ce&&(Ce=typeof crypto<"u"&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto),!Ce))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return Ce(Ga)}var w=[];for(let t=0;t<256;++t)w.push((t+256).toString(16).slice(1));function fr(t,e=0){return(w[t[e+0]]+w[t[e+1]]+w[t[e+2]]+w[t[e+3]]+"-"+w[t[e+4]]+w[t[e+5]]+"-"+w[t[e+6]]+w[t[e+7]]+"-"+w[t[e+8]]+w[t[e+9]]+"-"+w[t[e+10]]+w[t[e+11]]+w[t[e+12]]+w[t[e+13]]+w[t[e+14]]+w[t[e+15]]).toLowerCase()}var za=typeof crypto<"u"&&crypto.randomUUID&&crypto.randomUUID.bind(crypto),ot={randomUUID:za};function Ha(t,e,r){if(ot.randomUUID&&!e&&!t)return ot.randomUUID();t=t||{};let a=t.random||(t.rng||nt)();if(a[6]=a[6]&15|64,a[8]=a[8]&63|128,e){r=r||0;for(let n=0;n<16;++n)e[r+n]=a[n];return e}return fr(a)}var it=Ha;var Hr=Ot(yr());var _r=[{id:"e5bc7457-bea7-4559-97ea-0dfb33e3c8cb",name:"iPhone 14 Pro",width:393,height:852,visible:!1,userAgent:"iPhone",category:"apple",device:"iPhone 14 Pro"},{id:"3de4da42-6780-4f4c-b6bc-a0766cde5e8e",name:"iPhone 14 Pro Max",width:430,height:932,visible:!1,userAgent:"iPhone",category:"apple",device:"iPhone 14 Pro Max"},{id:"7f675ae3-1f91-4a5e-810f-addaf92df7c0",name:"iPhone 14",width:390,height:844,visible:!1,userAgent:"iPhone",category:"apple"},{id:"9ed1a48c-e04a-4130-a24a-8f5bec761ec5",name:"iPhone 13 Pro",width:390,height:844,visible:!1,userAgent:"iPhone",category:"apple"},{id:"e2dc992b-a8a9-4e7e-9c5a-2750665db5e1",name:"iPhone 13 Pro Max",width:428,height:926,visible:!1,userAgent:"iPhone",category:"apple"},{id:"ca4e7ffa-83ee-4a30-86a0-1ebd732c20e5",name:"iPhone 13",width:390,height:844,visible:!1,userAgent:"iPhone",category:"apple"},{id:"e3588f7d-a5cd-4a2d-8d9d-499088106acd",name:"iPhone 13 mini",width:360,height:780,visible:!1,userAgent:"iPhone",category:"apple"},{id:"212199ef-92c2-4207-b1d4-377d37e08a84",name:"iPad Air 5",width:820,height:1180,visible:!1,userAgent:"iPhone",category:"apple",device:"iPad Air 5"},{id:"248b9926-2e38-4221-b05f-4db0c2ecb8ea",name:"iPad mini",width:608,height:926,visible:!1,userAgent:"iPhone",category:"apple"},{id:"6a76e4fd-a049-4bb5-84cd-dbd8d7763dbc",name:"iPad",width:575,height:767,visible:!1,userAgent:"iPhone",category:"apple"},{id:"f1d47bfc-bc0f-4ca5-a86b-02593b68255e",name:"iPad Pro 11",width:581,height:832,visible:!1,userAgent:"iPhone",category:"apple"},{id:"437ccb33-186e-4f9b-834c-84fb662809b9",name:"iPad Air 4",width:573,height:824,visible:!1,userAgent:"iPhone",category:"apple"},{id:"eaa69f3d-0ae0-4538-9b03-eab04e91e662",name:"iPhone SE",width:375,height:667,visible:!1,userAgent:"iPhone",category:"apple"},{id:"161ad690-4013-45a0-893d-fc542158fe20",name:"iPhone 11 Pro",width:375,height:812,visible:!1,userAgent:"iPhone",category:"apple"},{id:"1df4d7e2-4bd5-41a4-b7d5-57d196d1bbc8",name:"iPhone 12 Mini",width:379,height:820,visible:!1,userAgent:"iPhone",category:"apple"},{id:"0a9ea90b-47f4-447e-9e9c-c7bfa107bfdf",name:"iPhone 12 Pro Max",width:379,height:820,visible:!1,userAgent:"iPhone",category:"apple"},{id:"79b72b41-b6c8-4571-a70f-e37bb8b11b2f",name:"Macbook Air",width:1559,height:975,visible:!1,device:"Macbook Air"},{id:"dd30b0db-ff70-40d2-9a04-1c6a26f9f7c6",name:"Macbook Pro 16",width:1728,height:1117,visible:!1,userAgent:"iPhone",category:"apple",device:"Macbook Pro 16"},{id:"9399e534-a92f-43c4-a7e3-ae8cd42b4256",name:"Studio Display",width:1280,height:720,visible:!1,userAgent:"iPhone",category:"apple"},{id:"0f5d7a08-3b9c-433f-937c-32542706e0ac",name:"Pro Display XDR",width:1504,height:846,visible:!1,userAgent:"iPhone",category:"apple"},{id:"6ccd37ad-fd03-422e-a841-ec61f88b47e2",name:"iMac 24",width:1120,height:630,visible:!1,userAgent:"iPhone",category:"apple"},{id:"8659bad2-5f2e-4e02-9104-a671a1687156",name:"Pixel 7 Pro",width:480,height:1040,visible:!1,userAgent:"iPhone",category:"google",device:"Pixel 7 Pro"},{id:"249c6ab7-bac8-47e9-a7ea-5462a58b99cf",name:"Pixel 7a",width:427,height:950,visible:!1,userAgent:"iPhone",category:"google"},{id:"c23119f7-39b2-4daa-a1d9-39761df76826",name:"Pixel 6 Pro",width:480,height:1040,visible:!1,userAgent:"iPhone",category:"google"},{id:"c742c7e0-1d74-4100-8a17-c93daece74dc",name:"Pixel Tablet",width:1575,height:984,visible:!1,userAgent:"iPhone",category:"google"},{id:"4df41013-c561-497c-b12f-c1e0fb30cdcc",name:"Pixel 2 XL",width:375,height:750,visible:!1,userAgent:"iPhone",category:"google"},{id:"48cd41a9-7332-460e-905b-8473004320b0",name:"Pixel 2",width:375,height:667,visible:!1,userAgent:"iPhone",category:"google"},{id:"33f3fc26-a95e-4201-98e1-eb94a8b0758f",name:"Pixel 4",width:370,height:781,visible:!1,userAgent:"iPhone",category:"google"},{id:"dd4a92d4-e5e5-45b3-ab80-71c951fbd236",name:"Pixel 4a",width:372,height:805,visible:!1,userAgent:"iPhone",category:"google"},{id:"a4e2c0dc-1348-4c61-b907-86f1518318e2",name:"Pixel 5",width:376,height:815,visible:!1,userAgent:"iPhone",category:"google"},{id:"7efbbbeb-09db-4bd6-a949-98ddedb89ac9",name:"Galaxy A50",width:372,height:800,visible:!1,userAgent:"iPhone",category:"samsung"},{id:"b5f10705-3237-452d-b909-46634ea627ac",name:"Galaxy S20",width:370,height:822,visible:!1,userAgent:"iPhone",category:"samsung"},{id:"5be5a470-6822-43cc-89be-16718dd91013",name:"Galaxy Note20",width:371,height:824,visible:!1,userAgent:"iPhone",category:"samsung"},{id:"fb64ba02-c599-4db7-97e0-8017dd807980",name:"Galaxy Note20 Ultra",width:390,height:830,visible:!1,userAgent:"iPhone",category:"samsung"},{id:"a7efec79-e0dc-47c1-af54-da89c55ce5cd",name:"Pixel Slate",width:542,height:813,visible:!1,userAgent:"iPhone",category:"google"},{id:"8f518dcb-4a34-4255-979f-8a1cb091ff84",name:"Galaxy Tab S7",width:526,height:842,visible:!1,userAgent:"iPhone",category:"samsung"},{id:"7285da04-3796-451f-a86a-2f3f952a70fc",name:"Fire HD 10",width:468,height:749,visible:!1,userAgent:"iPhone",category:"amazon"},{id:"5fda07a4-362d-48f0-92d5-49cd932fe6c1",name:"Surface Pro X",width:575,height:862,visible:!1,userAgent:"iPhone",category:"microsoft"},{id:"49b25578-e429-49bf-8555-0477f2e3b7ef",name:"Macbook Air",width:1559,height:975,visible:!1,userAgent:"iPhone",category:"apple"},{id:"6b77a665-34c3-4bfe-8fb8-6004d60c7450",name:"Pixelbook Go",width:1643,height:924,visible:!1,userAgent:"iPhone",category:"google"}];var Ya=_r,br=Ya;function k(t){for(var e=arguments.length,r=Array(e>1?e-1:0),a=1;a<e;a++)r[a-1]=arguments[a];if(0)var n,o;throw Error("[Immer] minified error nr: "+t+(r.length?" "+r.map(function(i){return"'"+i+"'"}).join(","):"")+". Find the full error at: https://bit.ly/3cXEKWf")}function W(t){return!!t&&!!t[v]}function M(t){var e;return!!t&&(function(r){if(!r||typeof r!="object")return!1;var a=Object.getPrototypeOf(r);if(a===null)return!0;var n=Object.hasOwnProperty.call(a,"constructor")&&a.constructor;return n===Object||typeof n=="function"&&Function.toString.call(n)===rn}(t)||Array.isArray(t)||!!t[Ir]||!!(!((e=t.constructor)===null||e===void 0)&&e[Ir])||mt(t)||gt(t))}function Z(t,e,r){r===void 0&&(r=!1),se(t)===0?(r?Object.keys:ie)(t).forEach(function(a){r&&typeof a=="symbol"||e(a,t[a],t)}):t.forEach(function(a,n){return e(n,a,t)})}function se(t){var e=t[v];return e?e.i>3?e.i-4:e.i:Array.isArray(t)?1:mt(t)?2:gt(t)?3:0}function oe(t,e){return se(t)===2?t.has(e):Object.prototype.hasOwnProperty.call(t,e)}function Ja(t,e){return se(t)===2?t.get(e):t[e]}function Tr(t,e,r){var a=se(t);a===2?t.set(e,r):a===3?t.add(r):t[e]=r}function jr(t,e){return t===e?t!==0||1/t==1/e:t!=t&&e!=e}function mt(t){return en&&t instanceof Map}function gt(t){return tn&&t instanceof Set}function H(t){return t.o||t.t}function yt(t){if(Array.isArray(t))return Array.prototype.slice.call(t);var e=Pr(t);delete e[v];for(var r=ie(e),a=0;a<r.length;a++){var n=r[a],o=e[n];o.writable===!1&&(o.writable=!0,o.configurable=!0),(o.get||o.set)&&(e[n]={configurable:!0,writable:!0,enumerable:o.enumerable,value:t[n]})}return Object.create(Object.getPrototypeOf(t),e)}function _t(t,e){return e===void 0&&(e=!1),bt(t)||W(t)||!M(t)||(se(t)>1&&(t.set=t.add=t.clear=t.delete=Xa),Object.freeze(t),e&&Z(t,function(r,a){return _t(a,!0)},!0)),t}function Xa(){k(2)}function bt(t){return t==null||typeof t!="object"||Object.isFrozen(t)}function U(t){var e=ft[t];return e||k(18,t),e}function $a(t,e){ft[t]||(ft[t]=e)}function dt(){return me}function st(t,e){e&&(U("Patches"),t.u=[],t.s=[],t.v=e)}function Me(t){pt(t),t.p.forEach(Za),t.p=null}function pt(t){t===me&&(me=t.l)}function vr(t){return me={p:[],l:me,h:t,m:!0,_:0}}function Za(t){var e=t[v];e.i===0||e.i===1?e.j():e.g=!0}function lt(t,e){e._=e.p.length;var r=e.p[0],a=t!==void 0&&t!==r;return e.h.O||U("ES5").S(e,t,a),a?(r[v].P&&(Me(e),k(4)),M(t)&&(t=Ne(e,t),e.l||De(e,t)),e.u&&U("Patches").M(r[v].t,t,e.u,e.s)):t=Ne(e,r,[]),Me(e),e.u&&e.v(e.u,e.s),t!==kr?t:void 0}function Ne(t,e,r){if(bt(e))return e;var a=e[v];if(!a)return Z(e,function(s,c){return xr(t,a,e,s,c,r)},!0),e;if(a.A!==t)return e;if(!a.P)return De(t,a.t,!0),a.t;if(!a.I){a.I=!0,a.A._--;var n=a.i===4||a.i===5?a.o=yt(a.k):a.o,o=n,i=!1;a.i===3&&(o=new Set(n),n.clear(),i=!0),Z(o,function(s,c){return xr(t,a,n,s,c,r,i)}),De(t,n,!1),r&&t.u&&U("Patches").N(a,r,t.u,t.s)}return a.o}function xr(t,e,r,a,n,o,i){if(W(n)){var s=Ne(t,n,o&&e&&e.i!==3&&!oe(e.R,a)?o.concat(a):void 0);if(Tr(r,a,s),!W(s))return;t.m=!1}else i&&r.add(n);if(M(n)&&!bt(n)){if(!t.h.D&&t._<1)return;Ne(t,n),e&&e.A.l||De(t,n)}}function De(t,e,r){r===void 0&&(r=!1),!t.l&&t.h.D&&t.m&&_t(e,r)}function ut(t,e){var r=t[v];return(r?H(r):t)[e]}function Ar(t,e){if(e in t)for(var r=Object.getPrototypeOf(t);r;){var a=Object.getOwnPropertyDescriptor(r,e);if(a)return a;r=Object.getPrototypeOf(r)}}function K(t){t.P||(t.P=!0,t.l&&K(t.l))}function ct(t){t.o||(t.o=yt(t.t))}function ht(t,e,r){var a=mt(e)?U("MapSet").F(e,r):gt(e)?U("MapSet").T(e,r):t.O?function(n,o){var i=Array.isArray(n),s={i:i?1:0,A:o?o.A:dt(),P:!1,I:!1,R:{},l:o,t:n,k:null,o:null,j:null,C:!1},c=s,l=ge;i&&(c=[s],l=fe);var u=Proxy.revocable(c,l),p=u.revoke,h=u.proxy;return s.k=h,s.j=p,h}(e,r):U("ES5").J(e,r);return(r?r.A:dt()).p.push(a),a}function Qa(t){return W(t)||k(22,t),function e(r){if(!M(r))return r;var a,n=r[v],o=se(r);if(n){if(!n.P&&(n.i<4||!U("ES5").K(n)))return n.t;n.I=!0,a=Sr(r,o),n.I=!1}else a=Sr(r,o);return Z(a,function(i,s){n&&Ja(n.t,i)===s||Tr(a,i,e(s))}),o===3?new Set(a):a}(t)}function Sr(t,e){switch(e){case 2:return new Map(t);case 3:return Array.from(t)}return yt(t)}function Rr(){function t(i,s){var c=o[i];return c?c.enumerable=s:o[i]=c={configurable:!0,enumerable:s,get:function(){var l=this[v];return ge.get(l,i)},set:function(l){var u=this[v];ge.set(u,i,l)}},c}function e(i){for(var s=i.length-1;s>=0;s--){var c=i[s][v];if(!c.P)switch(c.i){case 5:a(c)&&K(c);break;case 4:r(c)&&K(c)}}}function r(i){for(var s=i.t,c=i.k,l=ie(c),u=l.length-1;u>=0;u--){var p=l[u];if(p!==v){var h=s[p];if(h===void 0&&!oe(s,p))return!0;var f=c[p],m=f&&f[v];if(m?m.t!==h:!jr(f,h))return!0}}var g=!!s[v];return l.length!==ie(s).length+(g?0:1)}function a(i){var s=i.k;if(s.length!==i.t.length)return!0;var c=Object.getOwnPropertyDescriptor(s,s.length-1);if(c&&!c.get)return!0;for(var l=0;l<s.length;l++)if(!s.hasOwnProperty(l))return!0;return!1}function n(i){i.g&&k(3,JSON.stringify(H(i)))}var o={};$a("ES5",{J:function(i,s){var c=Array.isArray(i),l=function(p,h){if(p){for(var f=Array(h.length),m=0;m<h.length;m++)Object.defineProperty(f,""+m,t(m,!0));return f}var g=Pr(h);delete g[v];for(var x=ie(g),y=0;y<x.length;y++){var A=x[y];g[A]=t(A,p||!!g[A].enumerable)}return Object.create(Object.getPrototypeOf(h),g)}(c,i),u={i:c?5:4,A:s?s.A:dt(),P:!1,I:!1,R:{},l:s,t:i,k:l,o:null,g:!1,C:!1};return Object.defineProperty(l,v,{value:u,writable:!0}),l},S:function(i,s,c){c?W(s)&&s[v].A===i&&e(i.p):(i.u&&function l(u){if(u&&typeof u=="object"){var p=u[v];if(p){var h=p.t,f=p.k,m=p.R,g=p.i;if(g===4)Z(f,function(b){b!==v&&(h[b]!==void 0||oe(h,b)?m[b]||l(f[b]):(m[b]=!0,K(p)))}),Z(h,function(b){f[b]!==void 0||oe(f,b)||(m[b]=!1,K(p))});else if(g===5){if(a(p)&&(K(p),m.length=!0),f.length<h.length)for(var x=f.length;x<h.length;x++)m[x]=!1;else for(var y=h.length;y<f.length;y++)m[y]=!0;for(var A=Math.min(f.length,h.length),S=0;S<A;S++)f.hasOwnProperty(S)||(m[S]=!0),m[S]===void 0&&l(f[S])}}}}(i.p[0]),e(i.p))},K:function(i){return i.i===4?r(i):a(i)}})}var Er,me,vt=typeof Symbol<"u"&&typeof Symbol("x")=="symbol",en=typeof Map<"u",tn=typeof Set<"u",wr=typeof Proxy<"u"&&Proxy.revocable!==void 0&&typeof Reflect<"u",kr=vt?Symbol.for("immer-nothing"):((Er={})["immer-nothing"]=!0,Er),Ir=vt?Symbol.for("immer-draftable"):"__$immer_draftable",v=vt?Symbol.for("immer-state"):"__$immer_state";var rn=""+Object.prototype.constructor,ie=typeof Reflect<"u"&&Reflect.ownKeys?Reflect.ownKeys:Object.getOwnPropertySymbols!==void 0?function(t){return Object.getOwnPropertyNames(t).concat(Object.getOwnPropertySymbols(t))}:Object.getOwnPropertyNames,Pr=Object.getOwnPropertyDescriptors||function(t){var e={};return ie(t).forEach(function(r){e[r]=Object.getOwnPropertyDescriptor(t,r)}),e},ft={},ge={get:function(t,e){if(e===v)return t;var r=H(t);if(!oe(r,e))return function(n,o,i){var s,c=Ar(o,i);return c?"value"in c?c.value:(s=c.get)===null||s===void 0?void 0:s.call(n.k):void 0}(t,r,e);var a=r[e];return t.I||!M(a)?a:a===ut(t.t,e)?(ct(t),t.o[e]=ht(t.A.h,a,t)):a},has:function(t,e){return e in H(t)},ownKeys:function(t){return Reflect.ownKeys(H(t))},set:function(t,e,r){var a=Ar(H(t),e);if(a?.set)return a.set.call(t.k,r),!0;if(!t.P){var n=ut(H(t),e),o=n?.[v];if(o&&o.t===r)return t.o[e]=r,t.R[e]=!1,!0;if(jr(r,n)&&(r!==void 0||oe(t.t,e)))return!0;ct(t),K(t)}return t.o[e]===r&&(r!==void 0||e in t.o)||Number.isNaN(r)&&Number.isNaN(t.o[e])||(t.o[e]=r,t.R[e]=!0),!0},deleteProperty:function(t,e){return ut(t.t,e)!==void 0||e in t.t?(t.R[e]=!1,ct(t),K(t)):delete t.R[e],t.o&&delete t.o[e],!0},getOwnPropertyDescriptor:function(t,e){var r=H(t),a=Reflect.getOwnPropertyDescriptor(r,e);return a&&{writable:!0,configurable:t.i!==1||e!=="length",enumerable:a.enumerable,value:r[e]}},defineProperty:function(){k(11)},getPrototypeOf:function(t){return Object.getPrototypeOf(t.t)},setPrototypeOf:function(){k(12)}},fe={};Z(ge,function(t,e){fe[t]=function(){return arguments[0]=arguments[0][0],e.apply(this,arguments)}}),fe.deleteProperty=function(t,e){return fe.set.call(this,t,e,void 0)},fe.set=function(t,e,r){return ge.set.call(this,t[0],e,r,t[0])};var an=function(){function t(r){var a=this;this.O=wr,this.D=!0,this.produce=function(n,o,i){if(typeof n=="function"&&typeof o!="function"){var s=o;o=n;var c=a;return function(g){var x=this;g===void 0&&(g=s);for(var y=arguments.length,A=Array(y>1?y-1:0),S=1;S<y;S++)A[S-1]=arguments[S];return c.produce(g,function(b){var P;return(P=o).call.apply(P,[x,b].concat(A))})}}var l;if(typeof o!="function"&&k(6),i!==void 0&&typeof i!="function"&&k(7),M(n)){var u=vr(a),p=ht(a,n,void 0),h=!0;try{l=o(p),h=!1}finally{h?Me(u):pt(u)}return typeof Promise<"u"&&l instanceof Promise?l.then(function(g){return st(u,i),lt(g,u)},function(g){throw Me(u),g}):(st(u,i),lt(l,u))}if(!n||typeof n!="object"){if((l=o(n))===void 0&&(l=n),l===kr&&(l=void 0),a.D&&_t(l,!0),i){var f=[],m=[];U("Patches").M(n,l,f,m),i(f,m)}return l}k(21,n)},this.produceWithPatches=function(n,o){if(typeof n=="function")return function(l){for(var u=arguments.length,p=Array(u>1?u-1:0),h=1;h<u;h++)p[h-1]=arguments[h];return a.produceWithPatches(l,function(f){return n.apply(void 0,[f].concat(p))})};var i,s,c=a.produce(n,o,function(l,u){i=l,s=u});return typeof Promise<"u"&&c instanceof Promise?c.then(function(l){return[l,i,s]}):[c,i,s]},typeof r?.useProxies=="boolean"&&this.setUseProxies(r.useProxies),typeof r?.autoFreeze=="boolean"&&this.setAutoFreeze(r.autoFreeze)}var e=t.prototype;return e.createDraft=function(r){M(r)||k(8),W(r)&&(r=Qa(r));var a=vr(this),n=ht(this,r,void 0);return n[v].C=!0,pt(a),n},e.finishDraft=function(r,a){var n=r&&r[v],o=n.A;return st(o,a),lt(void 0,o)},e.setAutoFreeze=function(r){this.D=r},e.setUseProxies=function(r){r&&!wr&&k(20),this.O=r},e.applyPatches=function(r,a){var n;for(n=a.length-1;n>=0;n--){var o=a[n];if(o.path.length===0&&o.op==="replace"){r=o.value;break}}n>-1&&(a=a.slice(n+1));var i=U("Patches").$;return W(r)?i(r,a):this.produce(r,function(s){return i(s,a)})},t}(),j=new an,nn=j.produce,$o=j.produceWithPatches.bind(j),Zo=j.setAutoFreeze.bind(j),Qo=j.setUseProxies.bind(j),ei=j.applyPatches.bind(j),ti=j.createDraft.bind(j),ri=j.finishDraft.bind(j),Fe=nn;var bi=function(){return typeof Symbol=="function"&&Symbol.observable||"@@observable"}(),xt=function(){return Math.random().toString(36).substring(7).split("").join(".")},vi={INIT:"@@redux/INIT"+xt(),REPLACE:"@@redux/REPLACE"+xt(),PROBE_UNKNOWN_ACTION:function(){return"@@redux/PROBE_UNKNOWN_ACTION"+xt()}};function At(){for(var t=arguments.length,e=new Array(t),r=0;r<t;r++)e[r]=arguments[r];return e.length===0?function(a){return a}:e.length===1?e[0]:e.reduce(function(a,n){return function(){return a(n.apply(void 0,arguments))}})}var Ue="NOT_FOUND";function sn(t){var e;return{get:function(a){return e&&t(e.key,a)?e.value:Ue},put:function(a,n){e={key:a,value:n}},getEntries:function(){return e?[e]:[]},clear:function(){e=void 0}}}function ln(t,e){var r=[];function a(s){var c=r.findIndex(function(u){return e(s,u.key)});if(c>-1){var l=r[c];return c>0&&(r.splice(c,1),r.unshift(l)),l.value}return Ue}function n(s,c){a(s)===Ue&&(r.unshift({key:s,value:c}),r.length>t&&r.pop())}function o(){return r}function i(){r=[]}return{get:a,put:n,getEntries:o,clear:i}}var Or=function(e,r){return e===r};function un(t){return function(r,a){if(r===null||a===null||r.length!==a.length)return!1;for(var n=r.length,o=0;o<n;o++)if(!t(r[o],a[o]))return!1;return!0}}function Cr(t,e){var r=typeof e=="object"?e:{equalityCheck:e},a=r.equalityCheck,n=a===void 0?Or:a,o=r.maxSize,i=o===void 0?1:o,s=r.resultEqualityCheck,c=un(n),l=i===1?sn(c):ln(i,c);function u(){var p=l.get(arguments);if(p===Ue){if(p=t.apply(null,arguments),s){var h=l.getEntries(),f=h.find(function(m){return s(m.value,p)});f&&(p=f.value)}l.put(arguments,p)}return p}return u.clearCache=function(){return l.clear()},u}function cn(t){var e=Array.isArray(t[0])?t[0]:t;if(!e.every(function(a){return typeof a=="function"})){var r=e.map(function(a){return typeof a=="function"?"function "+(a.name||"unnamed")+"()":typeof a}).join(", ");throw new Error("createSelector expects all input-selectors to be functions, but received the following types: ["+r+"]")}return e}function dn(t){for(var e=arguments.length,r=new Array(e>1?e-1:0),a=1;a<e;a++)r[a-1]=arguments[a];var n=function(){for(var i=arguments.length,s=new Array(i),c=0;c<i;c++)s[c]=arguments[c];var l=0,u,p={memoizeOptions:void 0},h=s.pop();if(typeof h=="object"&&(p=h,h=s.pop()),typeof h!="function")throw new Error("createSelector expects an output function after the inputs, but received: ["+typeof h+"]");var f=p,m=f.memoizeOptions,g=m===void 0?r:m,x=Array.isArray(g)?g:[g],y=cn(s),A=t.apply(void 0,[function(){return l++,h.apply(null,arguments)}].concat(x)),S=t(function(){for(var P=[],O=y.length,q=0;q<O;q++)P.push(y[q].apply(null,arguments));return u=A.apply(null,P),u});return Object.assign(S,{resultFunc:h,memoizedResultFunc:A,dependencies:y,lastResult:function(){return u},recomputations:function(){return l},resetRecomputations:function(){return l=0}}),S};return n}var B=dn(Cr);var Fr=function(){var t=function(e,r){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(a,n){a.__proto__=n}||function(a,n){for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(a[o]=n[o])},t(e,r)};return function(e,r){if(typeof r!="function"&&r!==null)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");t(e,r);function a(){this.constructor=e}e.prototype=r===null?Object.create(r):(a.prototype=r.prototype,new a)}}(),pn=function(t,e){var r={label:0,sent:function(){if(o[0]&1)throw o[1];return o[1]},trys:[],ops:[]},a,n,o,i;return i={next:s(0),throw:s(1),return:s(2)},typeof Symbol=="function"&&(i[Symbol.iterator]=function(){return this}),i;function s(l){return function(u){return c([l,u])}}function c(l){if(a)throw new TypeError("Generator is already executing.");for(;r;)try{if(a=1,n&&(o=l[0]&2?n.return:l[0]?n.throw||((o=n.return)&&o.call(n),0):n.next)&&!(o=o.call(n,l[1])).done)return o;switch(n=0,o&&(l=[l[0]&2,o.value]),l[0]){case 0:case 1:o=l;break;case 4:return r.label++,{value:l[1],done:!1};case 5:r.label++,n=l[1],l=[0];continue;case 7:l=r.ops.pop(),r.trys.pop();continue;default:if(o=r.trys,!(o=o.length>0&&o[o.length-1])&&(l[0]===6||l[0]===2)){r=0;continue}if(l[0]===3&&(!o||l[1]>o[0]&&l[1]<o[3])){r.label=l[1];break}if(l[0]===6&&r.label<o[1]){r.label=o[1],o=l;break}if(o&&r.label<o[2]){r.label=o[2],r.ops.push(l);break}o[2]&&r.ops.pop(),r.trys.pop();continue}l=e.call(t,r)}catch(u){l=[6,u],n=0}finally{a=o=0}if(l[0]&5)throw l[1];return{value:l[0]?l[1]:void 0,done:!0}}},ye=function(t,e){for(var r=0,a=e.length,n=t.length;r<a;r++,n++)t[n]=e[r];return t},hn=Object.defineProperty,fn=Object.defineProperties,mn=Object.getOwnPropertyDescriptors,Lr=Object.getOwnPropertySymbols,gn=Object.prototype.hasOwnProperty,yn=Object.prototype.propertyIsEnumerable,Mr=function(t,e,r){return e in t?hn(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r},Q=function(t,e){for(var r in e||(e={}))gn.call(e,r)&&Mr(t,r,e[r]);if(Lr)for(var a=0,n=Lr(e);a<n.length;a++){var r=n[a];yn.call(e,r)&&Mr(t,r,e[r])}return t},St=function(t,e){return fn(t,mn(e))},_n=function(t,e,r){return new Promise(function(a,n){var o=function(c){try{s(r.next(c))}catch(l){n(l)}},i=function(c){try{s(r.throw(c))}catch(l){n(l)}},s=function(c){return c.done?a(c.value):Promise.resolve(c.value).then(o,i)};s((r=r.apply(t,e)).next())})};var ji=typeof window<"u"&&window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__:function(){if(arguments.length!==0)return typeof arguments[0]=="object"?At:At.apply(null,arguments)},Ri=typeof window<"u"&&window.__REDUX_DEVTOOLS_EXTENSION__?window.__REDUX_DEVTOOLS_EXTENSION__:function(){return function(t){return t}};function I(t,e){function r(){for(var a=[],n=0;n<arguments.length;n++)a[n]=arguments[n];if(e){var o=e.apply(void 0,a);if(!o)throw new Error("prepareAction did not return an object");return Q(Q({type:t,payload:o.payload},"meta"in o&&{meta:o.meta}),"error"in o&&{error:o.error})}return{type:t,payload:a[0]}}return r.toString=function(){return""+t},r.type=t,r.match=function(a){return a.type===t},r}var Pi=function(t){Fr(e,t);function e(){for(var r=[],a=0;a<arguments.length;a++)r[a]=arguments[a];var n=t.apply(this,r)||this;return Object.setPrototypeOf(n,e.prototype),n}return Object.defineProperty(e,Symbol.species,{get:function(){return e},enumerable:!1,configurable:!0}),e.prototype.concat=function(){for(var r=[],a=0;a<arguments.length;a++)r[a]=arguments[a];return t.prototype.concat.apply(this,r)},e.prototype.prepend=function(){for(var r=[],a=0;a<arguments.length;a++)r[a]=arguments[a];return r.length===1&&Array.isArray(r[0])?new(e.bind.apply(e,ye([void 0],r[0].concat(this)))):new(e.bind.apply(e,ye([void 0],r.concat(this))))},e}(Array),Oi=function(t){Fr(e,t);function e(){for(var r=[],a=0;a<arguments.length;a++)r[a]=arguments[a];var n=t.apply(this,r)||this;return Object.setPrototypeOf(n,e.prototype),n}return Object.defineProperty(e,Symbol.species,{get:function(){return e},enumerable:!1,configurable:!0}),e.prototype.concat=function(){for(var r=[],a=0;a<arguments.length;a++)r[a]=arguments[a];return t.prototype.concat.apply(this,r)},e.prototype.prepend=function(){for(var r=[],a=0;a<arguments.length;a++)r[a]=arguments[a];return r.length===1&&Array.isArray(r[0])?new(e.bind.apply(e,ye([void 0],r[0].concat(this)))):new(e.bind.apply(e,ye([void 0],r.concat(this))))},e}(Array);function wt(t){return M(t)?Fe(t,function(){}):t}function Ur(t){var e={},r=[],a,n={addCase:function(o,i){var s=typeof o=="string"?o:o.type;if(!s)throw new Error("`builder.addCase` cannot be called with an empty action type");if(s in e)throw new Error("`builder.addCase` cannot be called with two reducers for the same action type");return e[s]=i,n},addMatcher:function(o,i){return r.push({matcher:o,reducer:i}),n},addDefaultCase:function(o){return a=o,n}};return t(n),[e,r,a]}function bn(t){return typeof t=="function"}function vn(t,e,r,a){r===void 0&&(r=[]);var n=typeof e=="function"?Ur(e):[e,r,a],o=n[0],i=n[1],s=n[2],c;if(bn(t))c=function(){return wt(t())};else{var l=wt(t);c=function(){return l}}function u(p,h){p===void 0&&(p=c());var f=ye([o[h.type]],i.filter(function(m){var g=m.matcher;return g(h)}).map(function(m){var g=m.reducer;return g}));return f.filter(function(m){return!!m}).length===0&&(f=[s]),f.reduce(function(m,g){if(g)if(W(m)){var x=m,y=g(x,h);return y===void 0?m:y}else{if(M(m))return Fe(m,function(A){return g(A,h)});var y=g(m,h);if(y===void 0){if(m===null)return m;throw Error("A case reducer on a non-draftable value must not return undefined")}return y}return m},p)}return u.getInitialState=c,u}function xn(t,e){return t+"/"+e}function Be(t){var e=t.name;if(!e)throw new Error("`name` is a required option for createSlice");typeof process<"u";var r=typeof t.initialState=="function"?t.initialState:wt(t.initialState),a=t.reducers||{},n=Object.keys(a),o={},i={},s={};n.forEach(function(u){var p=a[u],h=xn(e,u),f,m;"reducer"in p?(f=p.reducer,m=p.prepare):f=p,o[u]=f,i[h]=f,s[u]=m?I(h,m):I(h)});function c(){var u=typeof t.extraReducers=="function"?Ur(t.extraReducers):[t.extraReducers],p=u[0],h=p===void 0?{}:p,f=u[1],m=f===void 0?[]:f,g=u[2],x=g===void 0?void 0:g,y=Q(Q({},h),i);return vn(r,function(A){for(var S in y)A.addCase(S,y[S]);for(var b=0,P=m;b<P.length;b++){var O=P[b];A.addMatcher(O.matcher,O.reducer)}x&&A.addDefaultCase(x)})}var l;return{name:e,reducer:function(u,p){return l||(l=c()),l(u,p)},actions:s,caseReducers:o,getInitialState:function(){return l||(l=c()),l.getInitialState()}}}var An="ModuleSymbhasOwnPr-0123456789ABCDEFGHNRVfgctiUvz_KqYTJkLxpZXIjQW",Sn=function(t){t===void 0&&(t=21);for(var e="",r=t;r--;)e+=An[Math.random()*64|0];return e},En=["name","message","stack","code"],Et=function(){function t(e,r){this.payload=e,this.meta=r}return t}(),Nr=function(){function t(e,r){this.payload=e,this.meta=r}return t}(),wn=function(t){if(typeof t=="object"&&t!==null){for(var e={},r=0,a=En;r<a.length;r++){var n=a[r];typeof t[n]=="string"&&(e[n]=t[n])}return e}return{message:String(t)}},Li=function(){function t(e,r,a){var n=I(e+"/fulfilled",function(u,p,h,f){return{payload:u,meta:St(Q({},f||{}),{arg:h,requestId:p,requestStatus:"fulfilled"})}}),o=I(e+"/pending",function(u,p,h){return{payload:void 0,meta:St(Q({},h||{}),{arg:p,requestId:u,requestStatus:"pending"})}}),i=I(e+"/rejected",function(u,p,h,f,m){return{payload:f,error:(a&&a.serializeError||wn)(u||"Rejected"),meta:St(Q({},m||{}),{arg:h,requestId:p,rejectedWithValue:!!f,requestStatus:"rejected",aborted:u?.name==="AbortError",condition:u?.name==="ConditionError"})}}),s=!1,c=typeof AbortController<"u"?AbortController:function(){function u(){this.signal={aborted:!1,addEventListener:function(){},dispatchEvent:function(){return!1},onabort:function(){},removeEventListener:function(){},reason:void 0,throwIfAborted:function(){}}}return u.prototype.abort=function(){},u}();function l(u){return function(p,h,f){var m=a?.idGenerator?a.idGenerator(u):Sn(),g=new c,x,y=!1;function A(b){x=b,g.abort()}var S=function(){return _n(this,null,function(){var b,P,O,q,Rt,le,kt;return pn(this,function(ee){switch(ee.label){case 0:return ee.trys.push([0,4,,5]),q=(b=a?.condition)==null?void 0:b.call(a,u,{getState:h,extra:f}),Tn(q)?[4,q]:[3,2];case 1:q=ee.sent(),ee.label=2;case 2:if(q===!1||g.signal.aborted)throw{name:"ConditionError",message:"Aborted due to condition callback returning false."};return y=!0,Rt=new Promise(function(C,ue){return g.signal.addEventListener("abort",function(){return ue({name:"AbortError",message:x||"Aborted"})})}),p(o(m,u,(P=a?.getPendingMeta)==null?void 0:P.call(a,{requestId:m,arg:u},{getState:h,extra:f}))),[4,Promise.race([Rt,Promise.resolve(r(u,{dispatch:p,getState:h,extra:f,requestId:m,signal:g.signal,abort:A,rejectWithValue:function(C,ue){return new Et(C,ue)},fulfillWithValue:function(C,ue){return new Nr(C,ue)}})).then(function(C){if(C instanceof Et)throw C;return C instanceof Nr?n(C.payload,m,u,C.meta):n(C,m,u)})])];case 3:return O=ee.sent(),[3,5];case 4:return le=ee.sent(),O=le instanceof Et?i(null,m,u,le.payload,le.meta):i(le,m,u),[3,5];case 5:return kt=a&&!a.dispatchConditionRejection&&i.match(O)&&O.meta.condition,kt||p(O),[2,O]}})})}();return Object.assign(S,{abort:A,requestId:m,arg:u,unwrap:function(){return S.then(In)}})}}return Object.assign(l,{pending:o,rejected:i,fulfilled:n,typePrefix:e})}return t.withTypes=function(){return t},t}();function In(t){if(t.meta&&t.meta.rejectedWithValue)throw t.payload;if(t.error)throw t.error;return t.payload}function Tn(t){return t!==null&&typeof t=="object"&&typeof t.then=="function"}var Br="listener",qr="completed",Vr="cancelled",Mi="task-"+Vr,Ni="task-"+qr,Di=Br+"-"+Vr,Fi=Br+"-"+qr;var It="listenerMiddleware";var Ui=I(It+"/add"),Bi=I(It+"/removeAll"),qi=I(It+"/remove");var Dr,Vi=typeof queueMicrotask=="function"?queueMicrotask.bind(typeof window<"u"?window:typeof global<"u"?global:globalThis):function(t){return(Dr||(Dr=Promise.resolve())).then(t).catch(function(e){return setTimeout(function(){throw e},0)})},jn=function(t){return function(e){setTimeout(e,t)}},Wi=typeof window<"u"&&window.requestAnimationFrame?window.requestAnimationFrame:jn(10);Rr();var Wr=()=>[{name:"default",screens:["e5bc7457-bea7-4559-97ea-0dfb33e3c8cb","8659bad2-5f2e-4e02-9104-a671a1687156","3de4da42-6780-4f4c-b6bc-a0766cde5e8e","212199ef-92c2-4207-b1d4-377d37e08a84","79b72b41-b6c8-4571-a70f-e37bb8b11b2f"]},{name:"mobile",screens:["e5bc7457-bea7-4559-97ea-0dfb33e3c8cb","8659bad2-5f2e-4e02-9104-a671a1687156"]},{name:"tablet",screens:[]},{name:"desktop",screens:[]}];var Tt=t=>{let e=1/0,r=1/0,a=-1/0,n=-1/0;for(let o of t)e=Math.min(e,o.x),r=Math.min(r,o.y),a=Math.max(a,o.x+o.width),n=Math.max(n,o.y+o.height);return{x:e,y:r,width:a-e,height:n-r,scale:1}};function Gr(t){return t!=null}var _e=(t,e)=>({left:{operator:">=",value:t},right:{operator:"<=",value:e}});var zr={headers:[],workspaceMode:"multi",screenZoom:1,miniMap:!0,zenMode:!1,grid:[],gridBounds:Tt([]),theme:"dark",screenFit:null,screens:br,userAgents:[],url:"",pan:{x:0,y:0},viewMode:"horizontal",zoom:1,screenDirection:"portrait",tab:"default",tabs:Wr(),singleView:!0,showMockups:!1,showOS:!1,selectedScreenIndex:0,layoutDirection:"standard",scrollbars:!1,sandbox:[],headerRules:[...J],highlightBorders:{active:!1,color:ze},isolationMode:{enabled:!1,selector:"",opacity:0},ruler:{active:!1,color:ze},rulerLines:[],imageOverlay:{enabled:!1,activeIndex:0,presets:[{id:"0",images:[{visible:!0,id:"0",image:"",opacity:.7,condition:{left:{operator:">=",value:0},right:{operator:"<=",value:767}}}]}]},screenGrids:{enabled:!1,active:0,presets:[{id:"0",name:"default",grids:[{id:"1",type:"columns",condition:_e(0,767),visible:!0,count:8,color:"rgba(212,0, 255,.2)",align:"stretch",size:32,spacing:16,offset:16},{id:"2",type:"columns",condition:_e(767,1024),visible:!0,count:8,color:"rgba(212,0, 255,.2)",align:"stretch",size:25,spacing:24,offset:16},{id:"3",type:"columns",condition:_e(1025,1280),visible:!0,count:12,color:"rgba(212,0, 255,.2)",align:"stretch",size:32,spacing:32,offset:32,gridSize:1280},{id:"4",type:"columns",condition:_e(1280,0),visible:!0,count:12,color:"rgba(212,0, 255,.2)",align:"center",size:32,spacing:32,offset:32,gridSize:1440}]}]},dimensions:{enabled:!1,selectors:[],guides:["auto"]}},Kr=Be({name:"app",initialState:zr,reducers:{initialize(){},updateTheme(t,e){t.theme=e.payload},initialized(t,e){return{...t,...e.payload}},updateUrl(t,e){t.url=e.payload},bulkScreensSave(t,e){t.screens.push(...e.payload);let r=t.tabs.find(a=>a.name===t.tab);r&&r.screens.push(...e.payload.map(a=>a.id))},saveScreen(t,e){let r=t.screens.find(a=>a.id===e.payload.id);if(r){let a=t.screens.findIndex(n=>n.id===r.id);t.screens[a]={...t.screens[a],...e.payload,highlighted:!1}}else{t.screens.push(e.payload);let a=t.tabs.find(n=>n.name===t.tab);a&&a.screens.push(e.payload.id)}},updateSelectedScreenIndex(t,e){t.selectedScreenIndex=e.payload},toggleScrollbars(t){t.scrollbars=!t.scrollbars},toggleHighlightBorders(t){t.highlightBorders={...t.highlightBorders,active:!t.highlightBorders.active}},updateIsolationMode(t,e){t.isolationMode={...t.isolationMode,...e.payload}},updateHighlightBorders(t,e){t.highlightBorders={...t.highlightBorders,...e.payload}},toggleRuler(t){t.ruler={...t.ruler,active:!t.ruler.active}},updateRuler(t,e){t.ruler={...t.ruler,...e.payload}},clearRulerLines(t){t.rulerLines=[]},updateRulerLine(t,e){t.rulerLines=t.rulerLines.map(r=>r.id!==e.payload.id?r:{...r,...e.payload})},removeRulerLine(t,e){t.rulerLines=t.rulerLines.filter(r=>r.id!==e.payload)},insertRulerLine(t,e){t.rulerLines.push(e.payload)},toggleScreenDirection(t,e){t.screens=t.screens.map(r=>r.id===e.payload?{...r,direction:r.direction==="portrait"||!r.direction?"landscape":"portrait"}:r)},sortScreens(t,e){t.tabs=t.tabs.map(r=>r.name===e.payload.tab?{...r,screens:(0,Hr.default)(r.screens,e.payload.from,e.payload.to)}:r)},updateZoom(t,e){t.zoom=e.payload},updatePan(t,e){t.pan=e.payload},switchViewMode(t,e){t.viewMode=e.payload},switchScreenDirection(t,e){t.screenDirection=e.payload,t.screens=t.screens.map(r=>r.direction===e.payload&&r.direction!==void 0?{...r,direction:void 0}:r)},highlightScreen(t,e){let r=t.screens.find(a=>a.id===e.payload);r&&(r.highlighted=!0)},unhighlightScreen(t,e){let r=t.screens.find(a=>a.id===e.payload);r&&(r.highlighted=!1)},toggleZenMode(t){t.zenMode=!t.zenMode},toggleMiniMap(t,e){e.payload===void 0?t.miniMap=!t.miniMap:t.miniMap=e.payload},toggleTab(t,e){t.tabs=t.tabs.map(r=>{if(r.name===e.payload.tabId){let a=[...r.screens];return a.includes(e.payload.screenId)?a=a.filter(n=>n!==e.payload.screenId):a=[...a,e.payload.screenId],{...r,screens:a}}return r})},setScreenFit(t,e){t.screenFit=e.payload},saveUserAgent(t,e){t.userAgents.push(e.payload)},deleteScreen(t,e){t.selectedScreenIndex=0,t.tabs=t.tabs.map(r=>({...r,screens:r.screens.filter(a=>a!==e.payload)})),t.screens=t.screens.filter(r=>r.id!==e.payload)},appReset(t){return{...zr,url:t.url}},setTabByIndex(t,e){t.tab=t.tabs[e.payload].name,t.selectedScreenIndex=0},updateWorkspaceMode(t,e){t.workspaceMode=e.payload},updateTab(t,e){t.tabs=t.tabs.map(r=>r.name===e.payload.name?{...r,...e.payload.tab}:r),t.tab===e.payload.name&&e.payload.tab.name&&(t.tab=e.payload.tab.name)},updateGrid(t,e){t.grid=e.payload,t.gridBounds=Tt(t.grid)},addTab(t,e){t.tabs.push({screens:[],...e.payload})},deleteTab(t,e){t.tabs=t.tabs.filter(r=>r.name!==e.payload),t.tab===e.payload&&(t.tab="default")},setLayoutDirection(t,e){t.layoutDirection=e.payload},updateShowMockups(t,e){t.showMockups=e.payload},updateShowOS(t,e){t.showOS=e.payload},updateScreenGrids(t,e){t.screenGrids.presets[0].grids=e.payload},updateDimensions(t,e){t.dimensions={...t.dimensions,...e.payload}},appendDimensionsSelector(t,e){t.dimensions.selectors.push(e.payload)},updateDimensionsSelector(t,e){t.dimensions.selectors=t.dimensions.selectors.map(r=>r.id===e.payload.id?{...r,...e.payload}:r)},toggleScreenGrids(t){t.screenGrids.enabled=!t.screenGrids.enabled},updateImageOverlays(t,e){t.imageOverlay.presets[0].images=e.payload},toggleImageOverLays(t){t.imageOverlay.enabled=!t.imageOverlay.enabled},updateScreenZoom(t,e){t.screenZoom=e.payload},toggleTabScreen(t,e){let r=!1;t.tabs=t.tabs.map(a=>{if(a.name===e.payload.tabId){let n=[...a.screens];return n.includes(e.payload.screenId)?(n=n.filter(o=>o!==e.payload.screenId),r=!0):n=[...n,e.payload.screenId],{...a,screens:n}}return a}),r&&(t.selectedScreenIndex=0)},updateHeaders(t,e){t.headers.find(a=>a.domain===e.payload.domain)?t.headers=t.headers.map(a=>a.domain===e.payload.domain?{...a,...e.payload}:a):t.headers.push({...jt(e.payload.domain),...e.payload})},addHeaderRule(t,e){t.headerRules.push(e.payload)},updateHeaderRule(t,e){let r=t.headerRules.findIndex(a=>a.id===e.payload.id);r!==-1&&(t.headerRules[r]={...t.headerRules[r],...e.payload})},removeHeaderRule(t,e){t.headerRules=t.headerRules.filter(r=>r.id!==e.payload)},resetHeaderRules(t){let e=new Set(J.map(a=>`${a.header}:${a.target}`)),r=t.headerRules.filter(a=>!e.has(`${a.header}:${a.target}`));t.headerRules=[...J,...r]},toggleSandboxOption(t,e){let r=t.sandbox.indexOf(e.payload);r===-1?t.sandbox.push(e.payload):t.sandbox.splice(r,1)}}}),{initialize:Ss,initialized:Es,updateUrl:ws,toggleZenMode:Is,toggleMiniMap:Ts,toggleTabScreen:js,sortScreens:Rs,appReset:ks,addTab:Ps,updateTab:Os,deleteTab:Cs,saveScreen:Ls,deleteScreen:Ms,saveUserAgent:Ns,switchScreenDirection:Ds,switchViewMode:Fs,updateZoom:Us,updatePan:Bs,setTabByIndex:qs,setScreenFit:Vs,updateTheme:Ws,updateGrid:Gs,updateShowMockups:zs,updateShowOS:Hs,updateWorkspaceMode:Ks,updateSelectedScreenIndex:Ys,setLayoutDirection:Js,bulkScreensSave:Xs,toggleScrollbars:$s,toggleHighlightBorders:Zs,updateHighlightBorders:Qs,toggleRuler:el,updateRuler:tl,removeRulerLine:rl,updateRulerLine:al,insertRulerLine:nl,clearRulerLines:ol,toggleScreenDirection:il,updateScreenGrids:sl,toggleScreenGrids:ll,updateImageOverlays:ul,toggleImageOverLays:cl,updateIsolationMode:dl,updateDimensions:pl,appendDimensionsSelector:hl,updateDimensionsSelector:fl,updateScreenZoom:ml,updateHeaders:gl,toggleSandboxOption:yl,addHeaderRule:_l,updateHeaderRule:bl,removeHeaderRule:vl,resetHeaderRules:xl}=Kr.actions,Al=I("app/saved"),Sl=I("app/save"),El=I("app/export"),wl=I("app/import"),G=t=>t.app,Yr=t=>G(t).screens,Rn=t=>G(t).tab,Jr=t=>G(t).tabs,Il=B([Jr,Rn],(t,e)=>t.findIndex(r=>r.name===e));var kn=(t,e)=>Jr(t).find(r=>r.name===e),Tl=B([Yr,(t,e)=>kn(t,e)],(t,e)=>{if(!e)return[];let r=t.reduce((a,n)=>(a[n.id]=n,a),{});return e.screens.map(a=>r[a]).filter(Boolean)});var jl=B([Yr,(t,e)=>e],(t,e)=>{let r=new Map(t.map(a=>[a.id,a]));return e.map(a=>r.get(a)).filter(Gr)});var Pn=t=>G(t).url;var On=t=>G(t).sandbox,Cn=t=>G(t).headerRules,Rl=B([Cn],t=>J.every(e=>t.some(r=>r.header===e.header&&r.operation===e.operation&&r.target===e.target&&r.enabled===e.enabled))),kl=B([On],t=>t.length>0?t.join(" "):void 0);var Pl=B([t=>G(t)],t=>t.imageOverlay.enabled?t.imageOverlay.presets[0].images:[]);var jt=t=>({domain:t,enabled:!0,headers:[],autoreload:!0}),Xr=B(t=>[Pn(t),G(t).headers],([t,e])=>{try{let r=new URL(t).hostname;return e.find(a=>a.domain===r)??jt(r)}catch{return jt("")}}),Ol=B(t=>G(t).headers,t=>t.filter(e=>e.headers.length>0)),Cl=Kr.reducer;var Ln={screens:{},scroll:{top:0,left:0},networkStatus:0,error:void 0},$r=Be({name:"runtime",initialState:Ln,reducers:{setNetworkStatus(t,e){t.networkStatus=e.payload},updateScroll(t,e){t.scroll={top:e.payload.top===void 0?t.scroll.top:e.payload.top,left:e.payload.left===void 0?t.scroll.left:e.payload.left}},setError(t,e){t.error=e.payload},clearError(t){t.error=void 0},screenConnected(t,e){let r=t.screens[e.payload.screenId]||{};t.screens[e.payload.screenId]={...r,frameId:e.payload.frameId,frameStatus:1}},resetScreen(t,e){let r=a=>{let n=t.screens[a]||{};t.screens[a]={...n,isLoading:!1,frameStatus:0}};Array.isArray(e.payload)?e.payload.forEach(r):r(e.payload)},screenIsLoading(t,e){if(!t.screens[e.payload])return t;t.screens[e.payload].isLoading=!0},replaceScreensRuntime(t,e){t.screens=e.payload},screenIsLoaded(t,e){if(!e.payload.screenId||!t.screens[e.payload.screenId])return t;t.screens[e.payload.screenId].isLoading=!1,t.screens[e.payload.screenId].themeColor=e.payload.themeColor,t.screens[e.payload.screenId].title=e.payload.title||"",t.screens[e.payload.screenId].frameStatus=3}}}),{screenConnected:Ul,screenIsLoading:Bl,screenIsLoaded:ql,replaceScreensRuntime:Vl,updateScroll:Wl,resetScreen:Gl,setNetworkStatus:zl,setError:Hl,clearError:Kl}=$r.actions,Yl=I("runtime/iframeLoaded");var Jl=$r.reducer;var qe=class{constructor(e,r){this.ids=[];this.tab=e,this.idGenerator=r,this.onMessage=this.onMessage.bind(this)}onMessage(e,r,a){if(!r.tab||!this.tab.tab.id||r.tab.id!==this.tab.tab.id||e.message!==_("LOAD_STATE")&&e.message!==_("UPDATE_HEADERS"))return!1;let n=e.state??this.tab.state;if(!n)return;this.dispose(!1);let o=Xr({app:n});if(o.enabled&&o.headers.find(i=>i.enabled&&Zr(i.key))){let i=this.idGenerator.generate(),s=this.idGenerator.generate();this.ids.push(i),this.ids.push(s);let c=o.headers.filter(u=>u.enabled&&Zr(u.key)).map(u=>({header:u.key,operation:u.value?chrome.declarativeNetRequest.HeaderOperation.SET:chrome.declarativeNetRequest.HeaderOperation.REMOVE,value:u.value?u.value:void 0})),l=[{id:i,priority:1,action:{type:chrome.declarativeNetRequest.RuleActionType.MODIFY_HEADERS,responseHeaders:c,requestHeaders:c},condition:{tabIds:[this.tab.tab.id],resourceTypes:[chrome.declarativeNetRequest.ResourceType.SUB_FRAME]}}];chrome.declarativeNetRequest.updateSessionRules({addRules:l}).then(()=>{setTimeout(()=>{chrome.tabs.sendMessage(this.tab.tab.id,{message:_("UPDATE_NETWORK_STATUS"),status:1})},50)}).catch(u=>{console.error("Failed to update session rules:",u),setTimeout(()=>{chrome.tabs.sendMessage(this.tab.tab.id,{message:_("UPDATE_NETWORK_STATUS"),status:1})},50)})}else setTimeout(()=>{chrome.tabs.sendMessage(this.tab.tab.id,{message:_("UPDATE_NETWORK_STATUS"),status:1})},50)}handle(){chrome.runtime.onMessage.addListener(this.onMessage)}dispose(e=!0){this.ids.length>0&&chrome.declarativeNetRequest.updateSessionRules({removeRuleIds:[...this.ids]}).catch(r=>{console.error("Failed to remove session rules:",r)}),this.ids=[],e&&chrome.runtime.onMessage.removeListener(this.onMessage)}};function Zr(t){return t&&String(t).trim()!==""}var Mn=t=>!!(t.id&&t.url&&!We(t.url)),Ve=class{constructor(){this.tabs=new Map;this.idGenerator=new Oe;this.ready=Promise.resolve();this.#e()}reset(){let e=L.resetAll();return this.tabs.forEach(r=>{r.dispose(),chrome.scripting.executeScript({target:{tabId:r.tab.id},func:async()=>{window.location.reload()}})}),this.tabs.clear(),e}startTab(e){if(!Mn(e)){console.error("tab is not a chrome tab",e);return}this.removeTab(e.id),this.createTab(e)}async#e(){this.ready=this.reset().catch(()=>{}),chrome.runtime.onMessage.addListener((e,r,a)=>{if(!r.tab?.id||!r.tab.url)return!1;let n=this.tabs.get(r.tab.id);if(n?.listening||We(r.tab.url))return!1;if(n)return a({pong:!0,starting:!0}),!0;let o=r.tab;return this.createTab(o,{reload:!1}),a({pong:!0,reconnected:!0}),!0}),chrome.action.onClicked.addListener(e=>{this.startTab(e)}),chrome.runtime.onInstalled.addListener(()=>{this.reset()}),chrome.tabs.onRemoved.addListener(e=>{this.removeTab(e)}),chrome.runtime.onInstalled.addListener(function(e){chrome.storage.local.get(["SESSION_ID","SESSION_ID_2"]).then(({SESSION_ID:r,SESSION_ID_2:a})=>{r||(r=it(),Y.storage.local.set({SESSION_ID:r})),chrome.runtime.setUninstallURL(`${Ge}?source=${r}&source2=${a}&version=${chrome.runtime.getManifest().version}`),e.reason==="install"&&fetch(Ut,{method:"POST",body:JSON.stringify({sessionId:r,version:chrome.runtime.getManifest().version})}).then(n=>n.json()).then(n=>{Y.storage.local.set({SESSION_ID_2:n.id}),chrome.runtime.setUninstallURL(`${Ge}?source=${r}&source2=${n.id}&version=${chrome.runtime.getManifest().version}`)}).catch(n=>{console.error("Failed to track install:",n)})})})}removeTab(e){this.tabs.has(e)&&(this.tabs.get(e)?.dispose(),this.tabs.delete(e))}createTab(e,r={}){let a=new Ae(e);a.blockingActions.add(new L(a,this.idGenerator));for(let n of Nn)a.actions.add(new n(a,this));a.actions.add(new qe(a,this.idGenerator)),this.tabs.set(e.id,a),chrome.tabs.update(e.id,{autoDiscardable:!1}),this.ready.then(()=>a.start(r)).catch(()=>{this.removeTab(e.id)})}},Nn=[Pe,ke,Se,Ee,we];globalThis.__BACKGROUND__=new Ve;})();
/*! Bundled license information:

ieee754/index.js:
  (*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> *)

buffer/index.js:
  (*!
   * The buffer module from node.js, for the browser.
   *
   * @author   Feross Aboukhadijeh <https://feross.org>
   * @license  MIT
   *)
*/
