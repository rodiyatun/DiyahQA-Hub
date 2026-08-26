var vT=Object.defineProperty;var wT=(Ct,ht,pn)=>ht in Ct?vT(Ct,ht,{enumerable:!0,configurable:!0,writable:!0,value:pn}):Ct[ht]=pn;var $e=(Ct,ht,pn)=>wT(Ct,typeof ht!="symbol"?ht+"":ht,pn);(function(){"use strict";function Ct(n){return n&&n.__esModule&&Object.prototype.hasOwnProperty.call(n,"default")?n.default:n}/*! https://mths.be/cssesc v3.0.0 by @mathias */var ht={},pn=ht.hasOwnProperty,Qd=function(e,t){if(!e)return t;var r={};for(var i in t)r[i]=pn.call(e,i)?e[i]:t[i];return r},Jd=/[ -,\.\/:-@\[-\^`\{-~]/,Xd=/[ -,\.\/:-@\[\]\^`\{-~]/,Zd=/(^|\\+)?(\\[A-F0-9]{1,6})\x20(?![a-fA-F0-9\x20])/g,Cs=function n(e,t){t=Qd(t,n.options),t.quotes!="single"&&t.quotes!="double"&&(t.quotes="single");for(var r=t.quotes=="double"?'"':"'",i=t.isIdentifier,s=e.charAt(0),o="",u=0,c=e.length;u<c;){var d=e.charAt(u++),m=d.charCodeAt(),T=void 0;if(m<32||m>126){if(m>=55296&&m<=56319&&u<c){var S=e.charCodeAt(u++);(S&64512)==56320?m=((m&1023)<<10)+(S&1023)+65536:u--}T="\\"+m.toString(16).toUpperCase()+" "}else t.escapeEverything?Jd.test(d)?T="\\"+d:T="\\"+m.toString(16).toUpperCase()+" ":/[\t\n\f\r\x0B]/.test(d)?T="\\"+m.toString(16).toUpperCase()+" ":d=="\\"||!i&&(d=='"'&&r==d||d=="'"&&r==d)||i&&Xd.test(d)?T="\\"+d:T=d;o+=T}return i&&(/^-[-\d]/.test(o)?o="\\-"+o.slice(1):/\d/.test(s)&&(o="\\3"+s+" "+o.slice(1))),o=o.replace(Zd,function(R,O,x){return O&&O.length%2?R:(O||"")+x}),!i&&t.wrap?r+o+r:o};Cs.options={escapeEverything:!1,isIdentifier:!1,quotes:"single",wrap:!1},Cs.version="3.0.0";var ef=Cs;const tf=Ct(ef);//! moment.js
//! version : 2.30.1
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
//! license : MIT
//! momentjs.com
var Ko;function k(){return Ko.apply(null,arguments)}function nf(n){Ko=n}function je(n){return n instanceof Array||Object.prototype.toString.call(n)==="[object Array]"}function $t(n){return n!=null&&Object.prototype.toString.call(n)==="[object Object]"}function Q(n,e){return Object.prototype.hasOwnProperty.call(n,e)}function bs(n){if(Object.getOwnPropertyNames)return Object.getOwnPropertyNames(n).length===0;var e;for(e in n)if(Q(n,e))return!1;return!0}function Fe(n){return n===void 0}function ct(n){return typeof n=="number"||Object.prototype.toString.call(n)==="[object Number]"}function jn(n){return n instanceof Date||Object.prototype.toString.call(n)==="[object Date]"}function Qo(n,e){var t=[],r,i=n.length;for(r=0;r<i;++r)t.push(e(n[r],r));return t}function bt(n,e){for(var t in e)Q(e,t)&&(n[t]=e[t]);return Q(e,"toString")&&(n.toString=e.toString),Q(e,"valueOf")&&(n.valueOf=e.valueOf),n}function tt(n,e,t,r){return Il(n,e,t,r,!0).utc()}function rf(){return{empty:!1,unusedTokens:[],unusedInput:[],overflow:-2,charsLeftOver:0,nullInput:!1,invalidEra:null,invalidMonth:null,invalidFormat:!1,userInvalidated:!1,iso:!1,parsedDateParts:[],era:null,meridiem:null,rfc2822:!1,weekdayMismatch:!1}}function H(n){return n._pf==null&&(n._pf=rf()),n._pf}var Rs;Array.prototype.some?Rs=Array.prototype.some:Rs=function(n){var e=Object(this),t=e.length>>>0,r;for(r=0;r<t;r++)if(r in e&&n.call(this,e[r],r,e))return!0;return!1};function ks(n){var e=null,t=!1,r=n._d&&!isNaN(n._d.getTime());if(r&&(e=H(n),t=Rs.call(e.parsedDateParts,function(i){return i!=null}),r=e.overflow<0&&!e.empty&&!e.invalidEra&&!e.invalidMonth&&!e.invalidWeekday&&!e.weekdayMismatch&&!e.nullInput&&!e.invalidFormat&&!e.userInvalidated&&(!e.meridiem||e.meridiem&&t),n._strict&&(r=r&&e.charsLeftOver===0&&e.unusedTokens.length===0&&e.bigHour===void 0)),Object.isFrozen==null||!Object.isFrozen(n))n._isValid=r;else return r;return n._isValid}function Xr(n){var e=tt(NaN);return n!=null?bt(H(e),n):H(e).userInvalidated=!0,e}var Jo=k.momentProperties=[],Ps=!1;function Ds(n,e){var t,r,i,s=Jo.length;if(Fe(e._isAMomentObject)||(n._isAMomentObject=e._isAMomentObject),Fe(e._i)||(n._i=e._i),Fe(e._f)||(n._f=e._f),Fe(e._l)||(n._l=e._l),Fe(e._strict)||(n._strict=e._strict),Fe(e._tzm)||(n._tzm=e._tzm),Fe(e._isUTC)||(n._isUTC=e._isUTC),Fe(e._offset)||(n._offset=e._offset),Fe(e._pf)||(n._pf=H(e)),Fe(e._locale)||(n._locale=e._locale),s>0)for(t=0;t<s;t++)r=Jo[t],i=e[r],Fe(i)||(n[r]=i);return n}function Kn(n){Ds(this,n),this._d=new Date(n._d!=null?n._d.getTime():NaN),this.isValid()||(this._d=new Date(NaN)),Ps===!1&&(Ps=!0,k.updateOffset(this),Ps=!1)}function Ke(n){return n instanceof Kn||n!=null&&n._isAMomentObject!=null}function Xo(n){k.suppressDeprecationWarnings===!1&&typeof console<"u"&&console.warn&&console.warn("Deprecation warning: "+n)}function We(n,e){var t=!0;return bt(function(){if(k.deprecationHandler!=null&&k.deprecationHandler(null,n),t){var r=[],i,s,o,u=arguments.length;for(s=0;s<u;s++){if(i="",typeof arguments[s]=="object"){i+=`
[`+s+"] ";for(o in arguments[0])Q(arguments[0],o)&&(i+=o+": "+arguments[0][o]+", ");i=i.slice(0,-2)}else i=arguments[s];r.push(i)}Xo(n+`
Arguments: `+Array.prototype.slice.call(r).join("")+`
`+new Error().stack),t=!1}return e.apply(this,arguments)},e)}var Zo={};function el(n,e){k.deprecationHandler!=null&&k.deprecationHandler(n,e),Zo[n]||(Xo(e),Zo[n]=!0)}k.suppressDeprecationWarnings=!1,k.deprecationHandler=null;function nt(n){return typeof Function<"u"&&n instanceof Function||Object.prototype.toString.call(n)==="[object Function]"}function sf(n){var e,t;for(t in n)Q(n,t)&&(e=n[t],nt(e)?this[t]=e:this["_"+t]=e);this._config=n,this._dayOfMonthOrdinalParseLenient=new RegExp((this._dayOfMonthOrdinalParse.source||this._ordinalParse.source)+"|"+/\d{1,2}/.source)}function Ms(n,e){var t=bt({},n),r;for(r in e)Q(e,r)&&($t(n[r])&&$t(e[r])?(t[r]={},bt(t[r],n[r]),bt(t[r],e[r])):e[r]!=null?t[r]=e[r]:delete t[r]);for(r in n)Q(n,r)&&!Q(e,r)&&$t(n[r])&&(t[r]=bt({},t[r]));return t}function Ns(n){n!=null&&this.set(n)}var Os;Object.keys?Os=Object.keys:Os=function(n){var e,t=[];for(e in n)Q(n,e)&&t.push(e);return t};var af={sameDay:"[Today at] LT",nextDay:"[Tomorrow at] LT",nextWeek:"dddd [at] LT",lastDay:"[Yesterday at] LT",lastWeek:"[Last] dddd [at] LT",sameElse:"L"};function of(n,e,t){var r=this._calendar[n]||this._calendar.sameElse;return nt(r)?r.call(e,t):r}function rt(n,e,t){var r=""+Math.abs(n),i=e-r.length,s=n>=0;return(s?t?"+":"":"-")+Math.pow(10,Math.max(0,i)).toString().substr(1)+r}var Vs=/(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|N{1,5}|YYYYYY|YYYYY|YYYY|YY|y{2,4}|yo?|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g,Zr=/(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g,Ls={},gn={};function L(n,e,t,r){var i=r;typeof r=="string"&&(i=function(){return this[r]()}),n&&(gn[n]=i),e&&(gn[e[0]]=function(){return rt(i.apply(this,arguments),e[1],e[2])}),t&&(gn[t]=function(){return this.localeData().ordinal(i.apply(this,arguments),n)})}function lf(n){return n.match(/\[[\s\S]/)?n.replace(/^\[|\]$/g,""):n.replace(/\\/g,"")}function uf(n){var e=n.match(Vs),t,r;for(t=0,r=e.length;t<r;t++)gn[e[t]]?e[t]=gn[e[t]]:e[t]=lf(e[t]);return function(i){var s="",o;for(o=0;o<r;o++)s+=nt(e[o])?e[o].call(i,n):e[o];return s}}function ei(n,e){return n.isValid()?(e=tl(e,n.localeData()),Ls[e]=Ls[e]||uf(e),Ls[e](n)):n.localeData().invalidDate()}function tl(n,e){var t=5;function r(i){return e.longDateFormat(i)||i}for(Zr.lastIndex=0;t>=0&&Zr.test(n);)n=n.replace(Zr,r),Zr.lastIndex=0,t-=1;return n}var hf={LTS:"h:mm:ss A",LT:"h:mm A",L:"MM/DD/YYYY",LL:"MMMM D, YYYY",LLL:"MMMM D, YYYY h:mm A",LLLL:"dddd, MMMM D, YYYY h:mm A"};function cf(n){var e=this._longDateFormat[n],t=this._longDateFormat[n.toUpperCase()];return e||!t?e:(this._longDateFormat[n]=t.match(Vs).map(function(r){return r==="MMMM"||r==="MM"||r==="DD"||r==="dddd"?r.slice(1):r}).join(""),this._longDateFormat[n])}var df="Invalid date";function ff(){return this._invalidDate}var mf="%d",pf=/\d{1,2}/;function gf(n){return this._ordinal.replace("%d",n)}var yf={future:"in %s",past:"%s ago",s:"a few seconds",ss:"%d seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",w:"a week",ww:"%d weeks",M:"a month",MM:"%d months",y:"a year",yy:"%d years"};function _f(n,e,t,r){var i=this._relativeTime[t];return nt(i)?i(n,e,t,r):i.replace(/%d/i,n)}function vf(n,e){var t=this._relativeTime[n>0?"future":"past"];return nt(t)?t(e):t.replace(/%s/i,e)}var nl={D:"date",dates:"date",date:"date",d:"day",days:"day",day:"day",e:"weekday",weekdays:"weekday",weekday:"weekday",E:"isoWeekday",isoweekdays:"isoWeekday",isoweekday:"isoWeekday",DDD:"dayOfYear",dayofyears:"dayOfYear",dayofyear:"dayOfYear",h:"hour",hours:"hour",hour:"hour",ms:"millisecond",milliseconds:"millisecond",millisecond:"millisecond",m:"minute",minutes:"minute",minute:"minute",M:"month",months:"month",month:"month",Q:"quarter",quarters:"quarter",quarter:"quarter",s:"second",seconds:"second",second:"second",gg:"weekYear",weekyears:"weekYear",weekyear:"weekYear",GG:"isoWeekYear",isoweekyears:"isoWeekYear",isoweekyear:"isoWeekYear",w:"week",weeks:"week",week:"week",W:"isoWeek",isoweeks:"isoWeek",isoweek:"isoWeek",y:"year",years:"year",year:"year"};function Ye(n){return typeof n=="string"?nl[n]||nl[n.toLowerCase()]:void 0}function xs(n){var e={},t,r;for(r in n)Q(n,r)&&(t=Ye(r),t&&(e[t]=n[r]));return e}var wf={date:9,day:11,weekday:11,isoWeekday:11,dayOfYear:4,hour:13,millisecond:16,minute:14,month:8,quarter:7,second:15,weekYear:1,isoWeekYear:1,week:5,isoWeek:5,year:1};function Ef(n){var e=[],t;for(t in n)Q(n,t)&&e.push({unit:t,priority:wf[t]});return e.sort(function(r,i){return r.priority-i.priority}),e}var rl=/\d/,Be=/\d\d/,il=/\d{3}/,Fs=/\d{4}/,ti=/[+-]?\d{6}/,se=/\d\d?/,sl=/\d\d\d\d?/,al=/\d\d\d\d\d\d?/,ni=/\d{1,3}/,Us=/\d{1,4}/,ri=/[+-]?\d{1,6}/,yn=/\d+/,ii=/[+-]?\d+/,Tf=/Z|[+-]\d\d:?\d\d/gi,si=/Z|[+-]\d\d(?::?\d\d)?/gi,If=/[+-]?\d+(\.\d{1,3})?/,Qn=/[0-9]{0,256}['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFF07\uFF10-\uFFEF]{1,256}|[\u0600-\u06FF\/]{1,256}(\s*?[\u0600-\u06FF]{1,256}){1,2}/i,_n=/^[1-9]\d?/,Bs=/^([1-9]\d|\d)/,ai;ai={};function N(n,e,t){ai[n]=nt(e)?e:function(r,i){return r&&t?t:e}}function Af(n,e){return Q(ai,n)?ai[n](e._strict,e._locale):new RegExp(Sf(n))}function Sf(n){return dt(n.replace("\\","").replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g,function(e,t,r,i,s){return t||r||i||s}))}function dt(n){return n.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&")}function ze(n){return n<0?Math.ceil(n)||0:Math.floor(n)}function Y(n){var e=+n,t=0;return e!==0&&isFinite(e)&&(t=ze(e)),t}var Hs={};function ne(n,e){var t,r=e,i;for(typeof n=="string"&&(n=[n]),ct(e)&&(r=function(s,o){o[e]=Y(s)}),i=n.length,t=0;t<i;t++)Hs[n[t]]=r}function Jn(n,e){ne(n,function(t,r,i,s){i._w=i._w||{},e(t,i._w,i,s)})}function Cf(n,e,t){e!=null&&Q(Hs,n)&&Hs[n](e,t._a,t,n)}function oi(n){return n%4===0&&n%100!==0||n%400===0}var be=0,ft=1,it=2,ve=3,Qe=4,mt=5,jt=6,bf=7,Rf=8;L("Y",0,0,function(){var n=this.year();return n<=9999?rt(n,4):"+"+n}),L(0,["YY",2],0,function(){return this.year()%100}),L(0,["YYYY",4],0,"year"),L(0,["YYYYY",5],0,"year"),L(0,["YYYYYY",6,!0],0,"year"),N("Y",ii),N("YY",se,Be),N("YYYY",Us,Fs),N("YYYYY",ri,ti),N("YYYYYY",ri,ti),ne(["YYYYY","YYYYYY"],be),ne("YYYY",function(n,e){e[be]=n.length===2?k.parseTwoDigitYear(n):Y(n)}),ne("YY",function(n,e){e[be]=k.parseTwoDigitYear(n)}),ne("Y",function(n,e){e[be]=parseInt(n,10)});function Xn(n){return oi(n)?366:365}k.parseTwoDigitYear=function(n){return Y(n)+(Y(n)>68?1900:2e3)};var ol=vn("FullYear",!0);function kf(){return oi(this.year())}function vn(n,e){return function(t){return t!=null?(ll(this,n,t),k.updateOffset(this,e),this):Zn(this,n)}}function Zn(n,e){if(!n.isValid())return NaN;var t=n._d,r=n._isUTC;switch(e){case"Milliseconds":return r?t.getUTCMilliseconds():t.getMilliseconds();case"Seconds":return r?t.getUTCSeconds():t.getSeconds();case"Minutes":return r?t.getUTCMinutes():t.getMinutes();case"Hours":return r?t.getUTCHours():t.getHours();case"Date":return r?t.getUTCDate():t.getDate();case"Day":return r?t.getUTCDay():t.getDay();case"Month":return r?t.getUTCMonth():t.getMonth();case"FullYear":return r?t.getUTCFullYear():t.getFullYear();default:return NaN}}function ll(n,e,t){var r,i,s,o,u;if(!(!n.isValid()||isNaN(t))){switch(r=n._d,i=n._isUTC,e){case"Milliseconds":return void(i?r.setUTCMilliseconds(t):r.setMilliseconds(t));case"Seconds":return void(i?r.setUTCSeconds(t):r.setSeconds(t));case"Minutes":return void(i?r.setUTCMinutes(t):r.setMinutes(t));case"Hours":return void(i?r.setUTCHours(t):r.setHours(t));case"Date":return void(i?r.setUTCDate(t):r.setDate(t));case"FullYear":break;default:return}s=t,o=n.month(),u=n.date(),u=u===29&&o===1&&!oi(s)?28:u,i?r.setUTCFullYear(s,o,u):r.setFullYear(s,o,u)}}function Pf(n){return n=Ye(n),nt(this[n])?this[n]():this}function Df(n,e){if(typeof n=="object"){n=xs(n);var t=Ef(n),r,i=t.length;for(r=0;r<i;r++)this[t[r].unit](n[t[r].unit])}else if(n=Ye(n),nt(this[n]))return this[n](e);return this}function Mf(n,e){return(n%e+e)%e}var de;Array.prototype.indexOf?de=Array.prototype.indexOf:de=function(n){var e;for(e=0;e<this.length;++e)if(this[e]===n)return e;return-1};function Ws(n,e){if(isNaN(n)||isNaN(e))return NaN;var t=Mf(e,12);return n+=(e-t)/12,t===1?oi(n)?29:28:31-t%7%2}L("M",["MM",2],"Mo",function(){return this.month()+1}),L("MMM",0,0,function(n){return this.localeData().monthsShort(this,n)}),L("MMMM",0,0,function(n){return this.localeData().months(this,n)}),N("M",se,_n),N("MM",se,Be),N("MMM",function(n,e){return e.monthsShortRegex(n)}),N("MMMM",function(n,e){return e.monthsRegex(n)}),ne(["M","MM"],function(n,e){e[ft]=Y(n)-1}),ne(["MMM","MMMM"],function(n,e,t,r){var i=t._locale.monthsParse(n,r,t._strict);i!=null?e[ft]=i:H(t).invalidMonth=n});var Nf="January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ul="Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),hl=/D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/,Of=Qn,Vf=Qn;function Lf(n,e){return n?je(this._months)?this._months[n.month()]:this._months[(this._months.isFormat||hl).test(e)?"format":"standalone"][n.month()]:je(this._months)?this._months:this._months.standalone}function xf(n,e){return n?je(this._monthsShort)?this._monthsShort[n.month()]:this._monthsShort[hl.test(e)?"format":"standalone"][n.month()]:je(this._monthsShort)?this._monthsShort:this._monthsShort.standalone}function Ff(n,e,t){var r,i,s,o=n.toLocaleLowerCase();if(!this._monthsParse)for(this._monthsParse=[],this._longMonthsParse=[],this._shortMonthsParse=[],r=0;r<12;++r)s=tt([2e3,r]),this._shortMonthsParse[r]=this.monthsShort(s,"").toLocaleLowerCase(),this._longMonthsParse[r]=this.months(s,"").toLocaleLowerCase();return t?e==="MMM"?(i=de.call(this._shortMonthsParse,o),i!==-1?i:null):(i=de.call(this._longMonthsParse,o),i!==-1?i:null):e==="MMM"?(i=de.call(this._shortMonthsParse,o),i!==-1?i:(i=de.call(this._longMonthsParse,o),i!==-1?i:null)):(i=de.call(this._longMonthsParse,o),i!==-1?i:(i=de.call(this._shortMonthsParse,o),i!==-1?i:null))}function Uf(n,e,t){var r,i,s;if(this._monthsParseExact)return Ff.call(this,n,e,t);for(this._monthsParse||(this._monthsParse=[],this._longMonthsParse=[],this._shortMonthsParse=[]),r=0;r<12;r++){if(i=tt([2e3,r]),t&&!this._longMonthsParse[r]&&(this._longMonthsParse[r]=new RegExp("^"+this.months(i,"").replace(".","")+"$","i"),this._shortMonthsParse[r]=new RegExp("^"+this.monthsShort(i,"").replace(".","")+"$","i")),!t&&!this._monthsParse[r]&&(s="^"+this.months(i,"")+"|^"+this.monthsShort(i,""),this._monthsParse[r]=new RegExp(s.replace(".",""),"i")),t&&e==="MMMM"&&this._longMonthsParse[r].test(n))return r;if(t&&e==="MMM"&&this._shortMonthsParse[r].test(n))return r;if(!t&&this._monthsParse[r].test(n))return r}}function cl(n,e){if(!n.isValid())return n;if(typeof e=="string"){if(/^\d+$/.test(e))e=Y(e);else if(e=n.localeData().monthsParse(e),!ct(e))return n}var t=e,r=n.date();return r=r<29?r:Math.min(r,Ws(n.year(),t)),n._isUTC?n._d.setUTCMonth(t,r):n._d.setMonth(t,r),n}function dl(n){return n!=null?(cl(this,n),k.updateOffset(this,!0),this):Zn(this,"Month")}function Bf(){return Ws(this.year(),this.month())}function Hf(n){return this._monthsParseExact?(Q(this,"_monthsRegex")||fl.call(this),n?this._monthsShortStrictRegex:this._monthsShortRegex):(Q(this,"_monthsShortRegex")||(this._monthsShortRegex=Of),this._monthsShortStrictRegex&&n?this._monthsShortStrictRegex:this._monthsShortRegex)}function Wf(n){return this._monthsParseExact?(Q(this,"_monthsRegex")||fl.call(this),n?this._monthsStrictRegex:this._monthsRegex):(Q(this,"_monthsRegex")||(this._monthsRegex=Vf),this._monthsStrictRegex&&n?this._monthsStrictRegex:this._monthsRegex)}function fl(){function n(c,d){return d.length-c.length}var e=[],t=[],r=[],i,s,o,u;for(i=0;i<12;i++)s=tt([2e3,i]),o=dt(this.monthsShort(s,"")),u=dt(this.months(s,"")),e.push(o),t.push(u),r.push(u),r.push(o);e.sort(n),t.sort(n),r.sort(n),this._monthsRegex=new RegExp("^("+r.join("|")+")","i"),this._monthsShortRegex=this._monthsRegex,this._monthsStrictRegex=new RegExp("^("+t.join("|")+")","i"),this._monthsShortStrictRegex=new RegExp("^("+e.join("|")+")","i")}function Yf(n,e,t,r,i,s,o){var u;return n<100&&n>=0?(u=new Date(n+400,e,t,r,i,s,o),isFinite(u.getFullYear())&&u.setFullYear(n)):u=new Date(n,e,t,r,i,s,o),u}function er(n){var e,t;return n<100&&n>=0?(t=Array.prototype.slice.call(arguments),t[0]=n+400,e=new Date(Date.UTC.apply(null,t)),isFinite(e.getUTCFullYear())&&e.setUTCFullYear(n)):e=new Date(Date.UTC.apply(null,arguments)),e}function li(n,e,t){var r=7+e-t,i=(7+er(n,0,r).getUTCDay()-e)%7;return-i+r-1}function ml(n,e,t,r,i){var s=(7+t-r)%7,o=li(n,r,i),u=1+7*(e-1)+s+o,c,d;return u<=0?(c=n-1,d=Xn(c)+u):u>Xn(n)?(c=n+1,d=u-Xn(n)):(c=n,d=u),{year:c,dayOfYear:d}}function tr(n,e,t){var r=li(n.year(),e,t),i=Math.floor((n.dayOfYear()-r-1)/7)+1,s,o;return i<1?(o=n.year()-1,s=i+pt(o,e,t)):i>pt(n.year(),e,t)?(s=i-pt(n.year(),e,t),o=n.year()+1):(o=n.year(),s=i),{week:s,year:o}}function pt(n,e,t){var r=li(n,e,t),i=li(n+1,e,t);return(Xn(n)-r+i)/7}L("w",["ww",2],"wo","week"),L("W",["WW",2],"Wo","isoWeek"),N("w",se,_n),N("ww",se,Be),N("W",se,_n),N("WW",se,Be),Jn(["w","ww","W","WW"],function(n,e,t,r){e[r.substr(0,1)]=Y(n)});function zf(n){return tr(n,this._week.dow,this._week.doy).week}var Gf={dow:0,doy:6};function qf(){return this._week.dow}function $f(){return this._week.doy}function jf(n){var e=this.localeData().week(this);return n==null?e:this.add((n-e)*7,"d")}function Kf(n){var e=tr(this,1,4).week;return n==null?e:this.add((n-e)*7,"d")}L("d",0,"do","day"),L("dd",0,0,function(n){return this.localeData().weekdaysMin(this,n)}),L("ddd",0,0,function(n){return this.localeData().weekdaysShort(this,n)}),L("dddd",0,0,function(n){return this.localeData().weekdays(this,n)}),L("e",0,0,"weekday"),L("E",0,0,"isoWeekday"),N("d",se),N("e",se),N("E",se),N("dd",function(n,e){return e.weekdaysMinRegex(n)}),N("ddd",function(n,e){return e.weekdaysShortRegex(n)}),N("dddd",function(n,e){return e.weekdaysRegex(n)}),Jn(["dd","ddd","dddd"],function(n,e,t,r){var i=t._locale.weekdaysParse(n,r,t._strict);i!=null?e.d=i:H(t).invalidWeekday=n}),Jn(["d","e","E"],function(n,e,t,r){e[r]=Y(n)});function Qf(n,e){return typeof n!="string"?n:isNaN(n)?(n=e.weekdaysParse(n),typeof n=="number"?n:null):parseInt(n,10)}function Jf(n,e){return typeof n=="string"?e.weekdaysParse(n)%7||7:isNaN(n)?null:n}function Ys(n,e){return n.slice(e,7).concat(n.slice(0,e))}var Xf="Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),pl="Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),Zf="Su_Mo_Tu_We_Th_Fr_Sa".split("_"),em=Qn,tm=Qn,nm=Qn;function rm(n,e){var t=je(this._weekdays)?this._weekdays:this._weekdays[n&&n!==!0&&this._weekdays.isFormat.test(e)?"format":"standalone"];return n===!0?Ys(t,this._week.dow):n?t[n.day()]:t}function im(n){return n===!0?Ys(this._weekdaysShort,this._week.dow):n?this._weekdaysShort[n.day()]:this._weekdaysShort}function sm(n){return n===!0?Ys(this._weekdaysMin,this._week.dow):n?this._weekdaysMin[n.day()]:this._weekdaysMin}function am(n,e,t){var r,i,s,o=n.toLocaleLowerCase();if(!this._weekdaysParse)for(this._weekdaysParse=[],this._shortWeekdaysParse=[],this._minWeekdaysParse=[],r=0;r<7;++r)s=tt([2e3,1]).day(r),this._minWeekdaysParse[r]=this.weekdaysMin(s,"").toLocaleLowerCase(),this._shortWeekdaysParse[r]=this.weekdaysShort(s,"").toLocaleLowerCase(),this._weekdaysParse[r]=this.weekdays(s,"").toLocaleLowerCase();return t?e==="dddd"?(i=de.call(this._weekdaysParse,o),i!==-1?i:null):e==="ddd"?(i=de.call(this._shortWeekdaysParse,o),i!==-1?i:null):(i=de.call(this._minWeekdaysParse,o),i!==-1?i:null):e==="dddd"?(i=de.call(this._weekdaysParse,o),i!==-1||(i=de.call(this._shortWeekdaysParse,o),i!==-1)?i:(i=de.call(this._minWeekdaysParse,o),i!==-1?i:null)):e==="ddd"?(i=de.call(this._shortWeekdaysParse,o),i!==-1||(i=de.call(this._weekdaysParse,o),i!==-1)?i:(i=de.call(this._minWeekdaysParse,o),i!==-1?i:null)):(i=de.call(this._minWeekdaysParse,o),i!==-1||(i=de.call(this._weekdaysParse,o),i!==-1)?i:(i=de.call(this._shortWeekdaysParse,o),i!==-1?i:null))}function om(n,e,t){var r,i,s;if(this._weekdaysParseExact)return am.call(this,n,e,t);for(this._weekdaysParse||(this._weekdaysParse=[],this._minWeekdaysParse=[],this._shortWeekdaysParse=[],this._fullWeekdaysParse=[]),r=0;r<7;r++){if(i=tt([2e3,1]).day(r),t&&!this._fullWeekdaysParse[r]&&(this._fullWeekdaysParse[r]=new RegExp("^"+this.weekdays(i,"").replace(".","\\.?")+"$","i"),this._shortWeekdaysParse[r]=new RegExp("^"+this.weekdaysShort(i,"").replace(".","\\.?")+"$","i"),this._minWeekdaysParse[r]=new RegExp("^"+this.weekdaysMin(i,"").replace(".","\\.?")+"$","i")),this._weekdaysParse[r]||(s="^"+this.weekdays(i,"")+"|^"+this.weekdaysShort(i,"")+"|^"+this.weekdaysMin(i,""),this._weekdaysParse[r]=new RegExp(s.replace(".",""),"i")),t&&e==="dddd"&&this._fullWeekdaysParse[r].test(n))return r;if(t&&e==="ddd"&&this._shortWeekdaysParse[r].test(n))return r;if(t&&e==="dd"&&this._minWeekdaysParse[r].test(n))return r;if(!t&&this._weekdaysParse[r].test(n))return r}}function lm(n){if(!this.isValid())return n!=null?this:NaN;var e=Zn(this,"Day");return n!=null?(n=Qf(n,this.localeData()),this.add(n-e,"d")):e}function um(n){if(!this.isValid())return n!=null?this:NaN;var e=(this.day()+7-this.localeData()._week.dow)%7;return n==null?e:this.add(n-e,"d")}function hm(n){if(!this.isValid())return n!=null?this:NaN;if(n!=null){var e=Jf(n,this.localeData());return this.day(this.day()%7?e:e-7)}else return this.day()||7}function cm(n){return this._weekdaysParseExact?(Q(this,"_weekdaysRegex")||zs.call(this),n?this._weekdaysStrictRegex:this._weekdaysRegex):(Q(this,"_weekdaysRegex")||(this._weekdaysRegex=em),this._weekdaysStrictRegex&&n?this._weekdaysStrictRegex:this._weekdaysRegex)}function dm(n){return this._weekdaysParseExact?(Q(this,"_weekdaysRegex")||zs.call(this),n?this._weekdaysShortStrictRegex:this._weekdaysShortRegex):(Q(this,"_weekdaysShortRegex")||(this._weekdaysShortRegex=tm),this._weekdaysShortStrictRegex&&n?this._weekdaysShortStrictRegex:this._weekdaysShortRegex)}function fm(n){return this._weekdaysParseExact?(Q(this,"_weekdaysRegex")||zs.call(this),n?this._weekdaysMinStrictRegex:this._weekdaysMinRegex):(Q(this,"_weekdaysMinRegex")||(this._weekdaysMinRegex=nm),this._weekdaysMinStrictRegex&&n?this._weekdaysMinStrictRegex:this._weekdaysMinRegex)}function zs(){function n(m,T){return T.length-m.length}var e=[],t=[],r=[],i=[],s,o,u,c,d;for(s=0;s<7;s++)o=tt([2e3,1]).day(s),u=dt(this.weekdaysMin(o,"")),c=dt(this.weekdaysShort(o,"")),d=dt(this.weekdays(o,"")),e.push(u),t.push(c),r.push(d),i.push(u),i.push(c),i.push(d);e.sort(n),t.sort(n),r.sort(n),i.sort(n),this._weekdaysRegex=new RegExp("^("+i.join("|")+")","i"),this._weekdaysShortRegex=this._weekdaysRegex,this._weekdaysMinRegex=this._weekdaysRegex,this._weekdaysStrictRegex=new RegExp("^("+r.join("|")+")","i"),this._weekdaysShortStrictRegex=new RegExp("^("+t.join("|")+")","i"),this._weekdaysMinStrictRegex=new RegExp("^("+e.join("|")+")","i")}function Gs(){return this.hours()%12||12}function mm(){return this.hours()||24}L("H",["HH",2],0,"hour"),L("h",["hh",2],0,Gs),L("k",["kk",2],0,mm),L("hmm",0,0,function(){return""+Gs.apply(this)+rt(this.minutes(),2)}),L("hmmss",0,0,function(){return""+Gs.apply(this)+rt(this.minutes(),2)+rt(this.seconds(),2)}),L("Hmm",0,0,function(){return""+this.hours()+rt(this.minutes(),2)}),L("Hmmss",0,0,function(){return""+this.hours()+rt(this.minutes(),2)+rt(this.seconds(),2)});function gl(n,e){L(n,0,0,function(){return this.localeData().meridiem(this.hours(),this.minutes(),e)})}gl("a",!0),gl("A",!1);function yl(n,e){return e._meridiemParse}N("a",yl),N("A",yl),N("H",se,Bs),N("h",se,_n),N("k",se,_n),N("HH",se,Be),N("hh",se,Be),N("kk",se,Be),N("hmm",sl),N("hmmss",al),N("Hmm",sl),N("Hmmss",al),ne(["H","HH"],ve),ne(["k","kk"],function(n,e,t){var r=Y(n);e[ve]=r===24?0:r}),ne(["a","A"],function(n,e,t){t._isPm=t._locale.isPM(n),t._meridiem=n}),ne(["h","hh"],function(n,e,t){e[ve]=Y(n),H(t).bigHour=!0}),ne("hmm",function(n,e,t){var r=n.length-2;e[ve]=Y(n.substr(0,r)),e[Qe]=Y(n.substr(r)),H(t).bigHour=!0}),ne("hmmss",function(n,e,t){var r=n.length-4,i=n.length-2;e[ve]=Y(n.substr(0,r)),e[Qe]=Y(n.substr(r,2)),e[mt]=Y(n.substr(i)),H(t).bigHour=!0}),ne("Hmm",function(n,e,t){var r=n.length-2;e[ve]=Y(n.substr(0,r)),e[Qe]=Y(n.substr(r))}),ne("Hmmss",function(n,e,t){var r=n.length-4,i=n.length-2;e[ve]=Y(n.substr(0,r)),e[Qe]=Y(n.substr(r,2)),e[mt]=Y(n.substr(i))});function pm(n){return(n+"").toLowerCase().charAt(0)==="p"}var gm=/[ap]\.?m?\.?/i,ym=vn("Hours",!0);function _m(n,e,t){return n>11?t?"pm":"PM":t?"am":"AM"}var _l={calendar:af,longDateFormat:hf,invalidDate:df,ordinal:mf,dayOfMonthOrdinalParse:pf,relativeTime:yf,months:Nf,monthsShort:ul,week:Gf,weekdays:Xf,weekdaysMin:Zf,weekdaysShort:pl,meridiemParse:gm},ue={},nr={},rr;function vm(n,e){var t,r=Math.min(n.length,e.length);for(t=0;t<r;t+=1)if(n[t]!==e[t])return t;return r}function vl(n){return n&&n.toLowerCase().replace("_","-")}function wm(n){for(var e=0,t,r,i,s;e<n.length;){for(s=vl(n[e]).split("-"),t=s.length,r=vl(n[e+1]),r=r?r.split("-"):null;t>0;){if(i=ui(s.slice(0,t).join("-")),i)return i;if(r&&r.length>=t&&vm(s,r)>=t-1)break;t--}e++}return rr}function Em(n){return!!(n&&n.match("^[^/\\\\]*$"))}function ui(n){var e=null,t;if(ue[n]===void 0&&typeof module<"u"&&module&&module.exports&&Em(n))try{e=rr._abbr,t=require,t("./locale/"+n),Rt(e)}catch{ue[n]=null}return ue[n]}function Rt(n,e){var t;return n&&(Fe(e)?t=gt(n):t=qs(n,e),t?rr=t:typeof console<"u"&&console.warn&&console.warn("Locale "+n+" not found. Did you forget to load it?")),rr._abbr}function qs(n,e){if(e!==null){var t,r=_l;if(e.abbr=n,ue[n]!=null)el("defineLocaleOverride","use moment.updateLocale(localeName, config) to change an existing locale. moment.defineLocale(localeName, config) should only be used for creating a new locale See http://momentjs.com/guides/#/warnings/define-locale/ for more info."),r=ue[n]._config;else if(e.parentLocale!=null)if(ue[e.parentLocale]!=null)r=ue[e.parentLocale]._config;else if(t=ui(e.parentLocale),t!=null)r=t._config;else return nr[e.parentLocale]||(nr[e.parentLocale]=[]),nr[e.parentLocale].push({name:n,config:e}),null;return ue[n]=new Ns(Ms(r,e)),nr[n]&&nr[n].forEach(function(i){qs(i.name,i.config)}),Rt(n),ue[n]}else return delete ue[n],null}function Tm(n,e){if(e!=null){var t,r,i=_l;ue[n]!=null&&ue[n].parentLocale!=null?ue[n].set(Ms(ue[n]._config,e)):(r=ui(n),r!=null&&(i=r._config),e=Ms(i,e),r==null&&(e.abbr=n),t=new Ns(e),t.parentLocale=ue[n],ue[n]=t),Rt(n)}else ue[n]!=null&&(ue[n].parentLocale!=null?(ue[n]=ue[n].parentLocale,n===Rt()&&Rt(n)):ue[n]!=null&&delete ue[n]);return ue[n]}function gt(n){var e;if(n&&n._locale&&n._locale._abbr&&(n=n._locale._abbr),!n)return rr;if(!je(n)){if(e=ui(n),e)return e;n=[n]}return wm(n)}function Im(){return Os(ue)}function $s(n){var e,t=n._a;return t&&H(n).overflow===-2&&(e=t[ft]<0||t[ft]>11?ft:t[it]<1||t[it]>Ws(t[be],t[ft])?it:t[ve]<0||t[ve]>24||t[ve]===24&&(t[Qe]!==0||t[mt]!==0||t[jt]!==0)?ve:t[Qe]<0||t[Qe]>59?Qe:t[mt]<0||t[mt]>59?mt:t[jt]<0||t[jt]>999?jt:-1,H(n)._overflowDayOfYear&&(e<be||e>it)&&(e=it),H(n)._overflowWeeks&&e===-1&&(e=bf),H(n)._overflowWeekday&&e===-1&&(e=Rf),H(n).overflow=e),n}var Am=/^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/,Sm=/^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d|))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/,Cm=/Z|[+-]\d\d(?::?\d\d)?/,hi=[["YYYYYY-MM-DD",/[+-]\d{6}-\d\d-\d\d/],["YYYY-MM-DD",/\d{4}-\d\d-\d\d/],["GGGG-[W]WW-E",/\d{4}-W\d\d-\d/],["GGGG-[W]WW",/\d{4}-W\d\d/,!1],["YYYY-DDD",/\d{4}-\d{3}/],["YYYY-MM",/\d{4}-\d\d/,!1],["YYYYYYMMDD",/[+-]\d{10}/],["YYYYMMDD",/\d{8}/],["GGGG[W]WWE",/\d{4}W\d{3}/],["GGGG[W]WW",/\d{4}W\d{2}/,!1],["YYYYDDD",/\d{7}/],["YYYYMM",/\d{6}/,!1],["YYYY",/\d{4}/,!1]],js=[["HH:mm:ss.SSSS",/\d\d:\d\d:\d\d\.\d+/],["HH:mm:ss,SSSS",/\d\d:\d\d:\d\d,\d+/],["HH:mm:ss",/\d\d:\d\d:\d\d/],["HH:mm",/\d\d:\d\d/],["HHmmss.SSSS",/\d\d\d\d\d\d\.\d+/],["HHmmss,SSSS",/\d\d\d\d\d\d,\d+/],["HHmmss",/\d\d\d\d\d\d/],["HHmm",/\d\d\d\d/],["HH",/\d\d/]],bm=/^\/?Date\((-?\d+)/i,Rm=/^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|([+-]\d{4}))$/,km={UT:0,GMT:0,EDT:-4*60,EST:-5*60,CDT:-5*60,CST:-6*60,MDT:-6*60,MST:-7*60,PDT:-7*60,PST:-8*60};function wl(n){var e,t,r=n._i,i=Am.exec(r)||Sm.exec(r),s,o,u,c,d=hi.length,m=js.length;if(i){for(H(n).iso=!0,e=0,t=d;e<t;e++)if(hi[e][1].exec(i[1])){o=hi[e][0],s=hi[e][2]!==!1;break}if(o==null){n._isValid=!1;return}if(i[3]){for(e=0,t=m;e<t;e++)if(js[e][1].exec(i[3])){u=(i[2]||" ")+js[e][0];break}if(u==null){n._isValid=!1;return}}if(!s&&u!=null){n._isValid=!1;return}if(i[4])if(Cm.exec(i[4]))c="Z";else{n._isValid=!1;return}n._f=o+(u||"")+(c||""),Qs(n)}else n._isValid=!1}function Pm(n,e,t,r,i,s){var o=[Dm(n),ul.indexOf(e),parseInt(t,10),parseInt(r,10),parseInt(i,10)];return s&&o.push(parseInt(s,10)),o}function Dm(n){var e=parseInt(n,10);return e<=49?2e3+e:e<=999?1900+e:e}function Mm(n){return n.replace(/\([^()]*\)|[\n\t]/g," ").replace(/(\s\s+)/g," ").replace(/^\s\s*/,"").replace(/\s\s*$/,"")}function Nm(n,e,t){if(n){var r=pl.indexOf(n),i=new Date(e[0],e[1],e[2]).getDay();if(r!==i)return H(t).weekdayMismatch=!0,t._isValid=!1,!1}return!0}function Om(n,e,t){if(n)return km[n];if(e)return 0;var r=parseInt(t,10),i=r%100,s=(r-i)/100;return s*60+i}function El(n){var e=Rm.exec(Mm(n._i)),t;if(e){if(t=Pm(e[4],e[3],e[2],e[5],e[6],e[7]),!Nm(e[1],t,n))return;n._a=t,n._tzm=Om(e[8],e[9],e[10]),n._d=er.apply(null,n._a),n._d.setUTCMinutes(n._d.getUTCMinutes()-n._tzm),H(n).rfc2822=!0}else n._isValid=!1}function Vm(n){var e=bm.exec(n._i);if(e!==null){n._d=new Date(+e[1]);return}if(wl(n),n._isValid===!1)delete n._isValid;else return;if(El(n),n._isValid===!1)delete n._isValid;else return;n._strict?n._isValid=!1:k.createFromInputFallback(n)}k.createFromInputFallback=We("value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are discouraged. Please refer to http://momentjs.com/guides/#/warnings/js-date/ for more info.",function(n){n._d=new Date(n._i+(n._useUTC?" UTC":""))});function wn(n,e,t){return n??e??t}function Lm(n){var e=new Date(k.now());return n._useUTC?[e.getUTCFullYear(),e.getUTCMonth(),e.getUTCDate()]:[e.getFullYear(),e.getMonth(),e.getDate()]}function Ks(n){var e,t,r=[],i,s,o;if(!n._d){for(i=Lm(n),n._w&&n._a[it]==null&&n._a[ft]==null&&xm(n),n._dayOfYear!=null&&(o=wn(n._a[be],i[be]),(n._dayOfYear>Xn(o)||n._dayOfYear===0)&&(H(n)._overflowDayOfYear=!0),t=er(o,0,n._dayOfYear),n._a[ft]=t.getUTCMonth(),n._a[it]=t.getUTCDate()),e=0;e<3&&n._a[e]==null;++e)n._a[e]=r[e]=i[e];for(;e<7;e++)n._a[e]=r[e]=n._a[e]==null?e===2?1:0:n._a[e];n._a[ve]===24&&n._a[Qe]===0&&n._a[mt]===0&&n._a[jt]===0&&(n._nextDay=!0,n._a[ve]=0),n._d=(n._useUTC?er:Yf).apply(null,r),s=n._useUTC?n._d.getUTCDay():n._d.getDay(),n._tzm!=null&&n._d.setUTCMinutes(n._d.getUTCMinutes()-n._tzm),n._nextDay&&(n._a[ve]=24),n._w&&typeof n._w.d<"u"&&n._w.d!==s&&(H(n).weekdayMismatch=!0)}}function xm(n){var e,t,r,i,s,o,u,c,d;e=n._w,e.GG!=null||e.W!=null||e.E!=null?(s=1,o=4,t=wn(e.GG,n._a[be],tr(ae(),1,4).year),r=wn(e.W,1),i=wn(e.E,1),(i<1||i>7)&&(c=!0)):(s=n._locale._week.dow,o=n._locale._week.doy,d=tr(ae(),s,o),t=wn(e.gg,n._a[be],d.year),r=wn(e.w,d.week),e.d!=null?(i=e.d,(i<0||i>6)&&(c=!0)):e.e!=null?(i=e.e+s,(e.e<0||e.e>6)&&(c=!0)):i=s),r<1||r>pt(t,s,o)?H(n)._overflowWeeks=!0:c!=null?H(n)._overflowWeekday=!0:(u=ml(t,r,i,s,o),n._a[be]=u.year,n._dayOfYear=u.dayOfYear)}k.ISO_8601=function(){},k.RFC_2822=function(){};function Qs(n){if(n._f===k.ISO_8601){wl(n);return}if(n._f===k.RFC_2822){El(n);return}n._a=[],H(n).empty=!0;var e=""+n._i,t,r,i,s,o,u=e.length,c=0,d,m;for(i=tl(n._f,n._locale).match(Vs)||[],m=i.length,t=0;t<m;t++)s=i[t],r=(e.match(Af(s,n))||[])[0],r&&(o=e.substr(0,e.indexOf(r)),o.length>0&&H(n).unusedInput.push(o),e=e.slice(e.indexOf(r)+r.length),c+=r.length),gn[s]?(r?H(n).empty=!1:H(n).unusedTokens.push(s),Cf(s,r,n)):n._strict&&!r&&H(n).unusedTokens.push(s);H(n).charsLeftOver=u-c,e.length>0&&H(n).unusedInput.push(e),n._a[ve]<=12&&H(n).bigHour===!0&&n._a[ve]>0&&(H(n).bigHour=void 0),H(n).parsedDateParts=n._a.slice(0),H(n).meridiem=n._meridiem,n._a[ve]=Fm(n._locale,n._a[ve],n._meridiem),d=H(n).era,d!==null&&(n._a[be]=n._locale.erasConvertYear(d,n._a[be])),Ks(n),$s(n)}function Fm(n,e,t){var r;return t==null?e:n.meridiemHour!=null?n.meridiemHour(e,t):(n.isPM!=null&&(r=n.isPM(t),r&&e<12&&(e+=12),!r&&e===12&&(e=0)),e)}function Um(n){var e,t,r,i,s,o,u=!1,c=n._f.length;if(c===0){H(n).invalidFormat=!0,n._d=new Date(NaN);return}for(i=0;i<c;i++)s=0,o=!1,e=Ds({},n),n._useUTC!=null&&(e._useUTC=n._useUTC),e._f=n._f[i],Qs(e),ks(e)&&(o=!0),s+=H(e).charsLeftOver,s+=H(e).unusedTokens.length*10,H(e).score=s,u?s<r&&(r=s,t=e):(r==null||s<r||o)&&(r=s,t=e,o&&(u=!0));bt(n,t||e)}function Bm(n){if(!n._d){var e=xs(n._i),t=e.day===void 0?e.date:e.day;n._a=Qo([e.year,e.month,t,e.hour,e.minute,e.second,e.millisecond],function(r){return r&&parseInt(r,10)}),Ks(n)}}function Hm(n){var e=new Kn($s(Tl(n)));return e._nextDay&&(e.add(1,"d"),e._nextDay=void 0),e}function Tl(n){var e=n._i,t=n._f;return n._locale=n._locale||gt(n._l),e===null||t===void 0&&e===""?Xr({nullInput:!0}):(typeof e=="string"&&(n._i=e=n._locale.preparse(e)),Ke(e)?new Kn($s(e)):(jn(e)?n._d=e:je(t)?Um(n):t?Qs(n):Wm(n),ks(n)||(n._d=null),n))}function Wm(n){var e=n._i;Fe(e)?n._d=new Date(k.now()):jn(e)?n._d=new Date(e.valueOf()):typeof e=="string"?Vm(n):je(e)?(n._a=Qo(e.slice(0),function(t){return parseInt(t,10)}),Ks(n)):$t(e)?Bm(n):ct(e)?n._d=new Date(e):k.createFromInputFallback(n)}function Il(n,e,t,r,i){var s={};return(e===!0||e===!1)&&(r=e,e=void 0),(t===!0||t===!1)&&(r=t,t=void 0),($t(n)&&bs(n)||je(n)&&n.length===0)&&(n=void 0),s._isAMomentObject=!0,s._useUTC=s._isUTC=i,s._l=t,s._i=n,s._f=e,s._strict=r,Hm(s)}function ae(n,e,t,r){return Il(n,e,t,r,!1)}var Ym=We("moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/",function(){var n=ae.apply(null,arguments);return this.isValid()&&n.isValid()?n<this?this:n:Xr()}),zm=We("moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/",function(){var n=ae.apply(null,arguments);return this.isValid()&&n.isValid()?n>this?this:n:Xr()});function Al(n,e){var t,r;if(e.length===1&&je(e[0])&&(e=e[0]),!e.length)return ae();for(t=e[0],r=1;r<e.length;++r)(!e[r].isValid()||e[r][n](t))&&(t=e[r]);return t}function Gm(){var n=[].slice.call(arguments,0);return Al("isBefore",n)}function qm(){var n=[].slice.call(arguments,0);return Al("isAfter",n)}var $m=function(){return Date.now?Date.now():+new Date},ir=["year","quarter","month","week","day","hour","minute","second","millisecond"];function jm(n){var e,t=!1,r,i=ir.length;for(e in n)if(Q(n,e)&&!(de.call(ir,e)!==-1&&(n[e]==null||!isNaN(n[e]))))return!1;for(r=0;r<i;++r)if(n[ir[r]]){if(t)return!1;parseFloat(n[ir[r]])!==Y(n[ir[r]])&&(t=!0)}return!0}function Km(){return this._isValid}function Qm(){return Je(NaN)}function ci(n){var e=xs(n),t=e.year||0,r=e.quarter||0,i=e.month||0,s=e.week||e.isoWeek||0,o=e.day||0,u=e.hour||0,c=e.minute||0,d=e.second||0,m=e.millisecond||0;this._isValid=jm(e),this._milliseconds=+m+d*1e3+c*6e4+u*1e3*60*60,this._days=+o+s*7,this._months=+i+r*3+t*12,this._data={},this._locale=gt(),this._bubble()}function di(n){return n instanceof ci}function Js(n){return n<0?Math.round(-1*n)*-1:Math.round(n)}function Jm(n,e,t){var r=Math.min(n.length,e.length),i=Math.abs(n.length-e.length),s=0,o;for(o=0;o<r;o++)Y(n[o])!==Y(e[o])&&s++;return s+i}function Sl(n,e){L(n,0,0,function(){var t=this.utcOffset(),r="+";return t<0&&(t=-t,r="-"),r+rt(~~(t/60),2)+e+rt(~~t%60,2)})}Sl("Z",":"),Sl("ZZ",""),N("Z",si),N("ZZ",si),ne(["Z","ZZ"],function(n,e,t){t._useUTC=!0,t._tzm=Xs(si,n)});var Xm=/([\+\-]|\d\d)/gi;function Xs(n,e){var t=(e||"").match(n),r,i,s;return t===null?null:(r=t[t.length-1]||[],i=(r+"").match(Xm)||["-",0,0],s=+(i[1]*60)+Y(i[2]),s===0?0:i[0]==="+"?s:-s)}function Zs(n,e){var t,r;return e._isUTC?(t=e.clone(),r=(Ke(n)||jn(n)?n.valueOf():ae(n).valueOf())-t.valueOf(),t._d.setTime(t._d.valueOf()+r),k.updateOffset(t,!1),t):ae(n).local()}function ea(n){return-Math.round(n._d.getTimezoneOffset())}k.updateOffset=function(){};function Zm(n,e,t){var r=this._offset||0,i;if(!this.isValid())return n!=null?this:NaN;if(n!=null){if(typeof n=="string"){if(n=Xs(si,n),n===null)return this}else Math.abs(n)<16&&!t&&(n=n*60);return!this._isUTC&&e&&(i=ea(this)),this._offset=n,this._isUTC=!0,i!=null&&this.add(i,"m"),r!==n&&(!e||this._changeInProgress?kl(this,Je(n-r,"m"),1,!1):this._changeInProgress||(this._changeInProgress=!0,k.updateOffset(this,!0),this._changeInProgress=null)),this}else return this._isUTC?r:ea(this)}function ep(n,e){return n!=null?(typeof n!="string"&&(n=-n),this.utcOffset(n,e),this):-this.utcOffset()}function tp(n){return this.utcOffset(0,n)}function np(n){return this._isUTC&&(this.utcOffset(0,n),this._isUTC=!1,n&&this.subtract(ea(this),"m")),this}function rp(){if(this._tzm!=null)this.utcOffset(this._tzm,!1,!0);else if(typeof this._i=="string"){var n=Xs(Tf,this._i);n!=null?this.utcOffset(n):this.utcOffset(0,!0)}return this}function ip(n){return this.isValid()?(n=n?ae(n).utcOffset():0,(this.utcOffset()-n)%60===0):!1}function sp(){return this.utcOffset()>this.clone().month(0).utcOffset()||this.utcOffset()>this.clone().month(5).utcOffset()}function ap(){if(!Fe(this._isDSTShifted))return this._isDSTShifted;var n={},e;return Ds(n,this),n=Tl(n),n._a?(e=n._isUTC?tt(n._a):ae(n._a),this._isDSTShifted=this.isValid()&&Jm(n._a,e.toArray())>0):this._isDSTShifted=!1,this._isDSTShifted}function op(){return this.isValid()?!this._isUTC:!1}function lp(){return this.isValid()?this._isUTC:!1}function Cl(){return this.isValid()?this._isUTC&&this._offset===0:!1}var up=/^(-|\+)?(?:(\d*)[. ])?(\d+):(\d+)(?::(\d+)(\.\d*)?)?$/,hp=/^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;function Je(n,e){var t=n,r=null,i,s,o;return di(n)?t={ms:n._milliseconds,d:n._days,M:n._months}:ct(n)||!isNaN(+n)?(t={},e?t[e]=+n:t.milliseconds=+n):(r=up.exec(n))?(i=r[1]==="-"?-1:1,t={y:0,d:Y(r[it])*i,h:Y(r[ve])*i,m:Y(r[Qe])*i,s:Y(r[mt])*i,ms:Y(Js(r[jt]*1e3))*i}):(r=hp.exec(n))?(i=r[1]==="-"?-1:1,t={y:Kt(r[2],i),M:Kt(r[3],i),w:Kt(r[4],i),d:Kt(r[5],i),h:Kt(r[6],i),m:Kt(r[7],i),s:Kt(r[8],i)}):t==null?t={}:typeof t=="object"&&("from"in t||"to"in t)&&(o=cp(ae(t.from),ae(t.to)),t={},t.ms=o.milliseconds,t.M=o.months),s=new ci(t),di(n)&&Q(n,"_locale")&&(s._locale=n._locale),di(n)&&Q(n,"_isValid")&&(s._isValid=n._isValid),s}Je.fn=ci.prototype,Je.invalid=Qm;function Kt(n,e){var t=n&&parseFloat(n.replace(",","."));return(isNaN(t)?0:t)*e}function bl(n,e){var t={};return t.months=e.month()-n.month()+(e.year()-n.year())*12,n.clone().add(t.months,"M").isAfter(e)&&--t.months,t.milliseconds=+e-+n.clone().add(t.months,"M"),t}function cp(n,e){var t;return n.isValid()&&e.isValid()?(e=Zs(e,n),n.isBefore(e)?t=bl(n,e):(t=bl(e,n),t.milliseconds=-t.milliseconds,t.months=-t.months),t):{milliseconds:0,months:0}}function Rl(n,e){return function(t,r){var i,s;return r!==null&&!isNaN(+r)&&(el(e,"moment()."+e+"(period, number) is deprecated. Please use moment()."+e+"(number, period). See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info."),s=t,t=r,r=s),i=Je(t,r),kl(this,i,n),this}}function kl(n,e,t,r){var i=e._milliseconds,s=Js(e._days),o=Js(e._months);n.isValid()&&(r=r??!0,o&&cl(n,Zn(n,"Month")+o*t),s&&ll(n,"Date",Zn(n,"Date")+s*t),i&&n._d.setTime(n._d.valueOf()+i*t),r&&k.updateOffset(n,s||o))}var dp=Rl(1,"add"),fp=Rl(-1,"subtract");function Pl(n){return typeof n=="string"||n instanceof String}function mp(n){return Ke(n)||jn(n)||Pl(n)||ct(n)||gp(n)||pp(n)||n===null||n===void 0}function pp(n){var e=$t(n)&&!bs(n),t=!1,r=["years","year","y","months","month","M","days","day","d","dates","date","D","hours","hour","h","minutes","minute","m","seconds","second","s","milliseconds","millisecond","ms"],i,s,o=r.length;for(i=0;i<o;i+=1)s=r[i],t=t||Q(n,s);return e&&t}function gp(n){var e=je(n),t=!1;return e&&(t=n.filter(function(r){return!ct(r)&&Pl(n)}).length===0),e&&t}function yp(n){var e=$t(n)&&!bs(n),t=!1,r=["sameDay","nextDay","lastDay","nextWeek","lastWeek","sameElse"],i,s;for(i=0;i<r.length;i+=1)s=r[i],t=t||Q(n,s);return e&&t}function _p(n,e){var t=n.diff(e,"days",!0);return t<-6?"sameElse":t<-1?"lastWeek":t<0?"lastDay":t<1?"sameDay":t<2?"nextDay":t<7?"nextWeek":"sameElse"}function vp(n,e){arguments.length===1&&(arguments[0]?mp(arguments[0])?(n=arguments[0],e=void 0):yp(arguments[0])&&(e=arguments[0],n=void 0):(n=void 0,e=void 0));var t=n||ae(),r=Zs(t,this).startOf("day"),i=k.calendarFormat(this,r)||"sameElse",s=e&&(nt(e[i])?e[i].call(this,t):e[i]);return this.format(s||this.localeData().calendar(i,this,ae(t)))}function wp(){return new Kn(this)}function Ep(n,e){var t=Ke(n)?n:ae(n);return this.isValid()&&t.isValid()?(e=Ye(e)||"millisecond",e==="millisecond"?this.valueOf()>t.valueOf():t.valueOf()<this.clone().startOf(e).valueOf()):!1}function Tp(n,e){var t=Ke(n)?n:ae(n);return this.isValid()&&t.isValid()?(e=Ye(e)||"millisecond",e==="millisecond"?this.valueOf()<t.valueOf():this.clone().endOf(e).valueOf()<t.valueOf()):!1}function Ip(n,e,t,r){var i=Ke(n)?n:ae(n),s=Ke(e)?e:ae(e);return this.isValid()&&i.isValid()&&s.isValid()?(r=r||"()",(r[0]==="("?this.isAfter(i,t):!this.isBefore(i,t))&&(r[1]===")"?this.isBefore(s,t):!this.isAfter(s,t))):!1}function Ap(n,e){var t=Ke(n)?n:ae(n),r;return this.isValid()&&t.isValid()?(e=Ye(e)||"millisecond",e==="millisecond"?this.valueOf()===t.valueOf():(r=t.valueOf(),this.clone().startOf(e).valueOf()<=r&&r<=this.clone().endOf(e).valueOf())):!1}function Sp(n,e){return this.isSame(n,e)||this.isAfter(n,e)}function Cp(n,e){return this.isSame(n,e)||this.isBefore(n,e)}function bp(n,e,t){var r,i,s;if(!this.isValid())return NaN;if(r=Zs(n,this),!r.isValid())return NaN;switch(i=(r.utcOffset()-this.utcOffset())*6e4,e=Ye(e),e){case"year":s=fi(this,r)/12;break;case"month":s=fi(this,r);break;case"quarter":s=fi(this,r)/3;break;case"second":s=(this-r)/1e3;break;case"minute":s=(this-r)/6e4;break;case"hour":s=(this-r)/36e5;break;case"day":s=(this-r-i)/864e5;break;case"week":s=(this-r-i)/6048e5;break;default:s=this-r}return t?s:ze(s)}function fi(n,e){if(n.date()<e.date())return-fi(e,n);var t=(e.year()-n.year())*12+(e.month()-n.month()),r=n.clone().add(t,"months"),i,s;return e-r<0?(i=n.clone().add(t-1,"months"),s=(e-r)/(r-i)):(i=n.clone().add(t+1,"months"),s=(e-r)/(i-r)),-(t+s)||0}k.defaultFormat="YYYY-MM-DDTHH:mm:ssZ",k.defaultFormatUtc="YYYY-MM-DDTHH:mm:ss[Z]";function Rp(){return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")}function kp(n){if(!this.isValid())return null;var e=n!==!0,t=e?this.clone().utc():this;return t.year()<0||t.year()>9999?ei(t,e?"YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]":"YYYYYY-MM-DD[T]HH:mm:ss.SSSZ"):nt(Date.prototype.toISOString)?e?this.toDate().toISOString():new Date(this.valueOf()+this.utcOffset()*60*1e3).toISOString().replace("Z",ei(t,"Z")):ei(t,e?"YYYY-MM-DD[T]HH:mm:ss.SSS[Z]":"YYYY-MM-DD[T]HH:mm:ss.SSSZ")}function Pp(){if(!this.isValid())return"moment.invalid(/* "+this._i+" */)";var n="moment",e="",t,r,i,s;return this.isLocal()||(n=this.utcOffset()===0?"moment.utc":"moment.parseZone",e="Z"),t="["+n+'("]',r=0<=this.year()&&this.year()<=9999?"YYYY":"YYYYYY",i="-MM-DD[T]HH:mm:ss.SSS",s=e+'[")]',this.format(t+r+i+s)}function Dp(n){n||(n=this.isUtc()?k.defaultFormatUtc:k.defaultFormat);var e=ei(this,n);return this.localeData().postformat(e)}function Mp(n,e){return this.isValid()&&(Ke(n)&&n.isValid()||ae(n).isValid())?Je({to:this,from:n}).locale(this.locale()).humanize(!e):this.localeData().invalidDate()}function Np(n){return this.from(ae(),n)}function Op(n,e){return this.isValid()&&(Ke(n)&&n.isValid()||ae(n).isValid())?Je({from:this,to:n}).locale(this.locale()).humanize(!e):this.localeData().invalidDate()}function Vp(n){return this.to(ae(),n)}function Dl(n){var e;return n===void 0?this._locale._abbr:(e=gt(n),e!=null&&(this._locale=e),this)}var Ml=We("moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.",function(n){return n===void 0?this.localeData():this.locale(n)});function Nl(){return this._locale}var mi=1e3,En=60*mi,pi=60*En,Ol=(365*400+97)*24*pi;function Tn(n,e){return(n%e+e)%e}function Vl(n,e,t){return n<100&&n>=0?new Date(n+400,e,t)-Ol:new Date(n,e,t).valueOf()}function Ll(n,e,t){return n<100&&n>=0?Date.UTC(n+400,e,t)-Ol:Date.UTC(n,e,t)}function Lp(n){var e,t;if(n=Ye(n),n===void 0||n==="millisecond"||!this.isValid())return this;switch(t=this._isUTC?Ll:Vl,n){case"year":e=t(this.year(),0,1);break;case"quarter":e=t(this.year(),this.month()-this.month()%3,1);break;case"month":e=t(this.year(),this.month(),1);break;case"week":e=t(this.year(),this.month(),this.date()-this.weekday());break;case"isoWeek":e=t(this.year(),this.month(),this.date()-(this.isoWeekday()-1));break;case"day":case"date":e=t(this.year(),this.month(),this.date());break;case"hour":e=this._d.valueOf(),e-=Tn(e+(this._isUTC?0:this.utcOffset()*En),pi);break;case"minute":e=this._d.valueOf(),e-=Tn(e,En);break;case"second":e=this._d.valueOf(),e-=Tn(e,mi);break}return this._d.setTime(e),k.updateOffset(this,!0),this}function xp(n){var e,t;if(n=Ye(n),n===void 0||n==="millisecond"||!this.isValid())return this;switch(t=this._isUTC?Ll:Vl,n){case"year":e=t(this.year()+1,0,1)-1;break;case"quarter":e=t(this.year(),this.month()-this.month()%3+3,1)-1;break;case"month":e=t(this.year(),this.month()+1,1)-1;break;case"week":e=t(this.year(),this.month(),this.date()-this.weekday()+7)-1;break;case"isoWeek":e=t(this.year(),this.month(),this.date()-(this.isoWeekday()-1)+7)-1;break;case"day":case"date":e=t(this.year(),this.month(),this.date()+1)-1;break;case"hour":e=this._d.valueOf(),e+=pi-Tn(e+(this._isUTC?0:this.utcOffset()*En),pi)-1;break;case"minute":e=this._d.valueOf(),e+=En-Tn(e,En)-1;break;case"second":e=this._d.valueOf(),e+=mi-Tn(e,mi)-1;break}return this._d.setTime(e),k.updateOffset(this,!0),this}function Fp(){return this._d.valueOf()-(this._offset||0)*6e4}function Up(){return Math.floor(this.valueOf()/1e3)}function Bp(){return new Date(this.valueOf())}function Hp(){var n=this;return[n.year(),n.month(),n.date(),n.hour(),n.minute(),n.second(),n.millisecond()]}function Wp(){var n=this;return{years:n.year(),months:n.month(),date:n.date(),hours:n.hours(),minutes:n.minutes(),seconds:n.seconds(),milliseconds:n.milliseconds()}}function Yp(){return this.isValid()?this.toISOString():null}function zp(){return ks(this)}function Gp(){return bt({},H(this))}function qp(){return H(this).overflow}function $p(){return{input:this._i,format:this._f,locale:this._locale,isUTC:this._isUTC,strict:this._strict}}L("N",0,0,"eraAbbr"),L("NN",0,0,"eraAbbr"),L("NNN",0,0,"eraAbbr"),L("NNNN",0,0,"eraName"),L("NNNNN",0,0,"eraNarrow"),L("y",["y",1],"yo","eraYear"),L("y",["yy",2],0,"eraYear"),L("y",["yyy",3],0,"eraYear"),L("y",["yyyy",4],0,"eraYear"),N("N",ta),N("NN",ta),N("NNN",ta),N("NNNN",ig),N("NNNNN",sg),ne(["N","NN","NNN","NNNN","NNNNN"],function(n,e,t,r){var i=t._locale.erasParse(n,r,t._strict);i?H(t).era=i:H(t).invalidEra=n}),N("y",yn),N("yy",yn),N("yyy",yn),N("yyyy",yn),N("yo",ag),ne(["y","yy","yyy","yyyy"],be),ne(["yo"],function(n,e,t,r){var i;t._locale._eraYearOrdinalRegex&&(i=n.match(t._locale._eraYearOrdinalRegex)),t._locale.eraYearOrdinalParse?e[be]=t._locale.eraYearOrdinalParse(n,i):e[be]=parseInt(n,10)});function jp(n,e){var t,r,i,s=this._eras||gt("en")._eras;for(t=0,r=s.length;t<r;++t){switch(typeof s[t].since){case"string":i=k(s[t].since).startOf("day"),s[t].since=i.valueOf();break}switch(typeof s[t].until){case"undefined":s[t].until=1/0;break;case"string":i=k(s[t].until).startOf("day").valueOf(),s[t].until=i.valueOf();break}}return s}function Kp(n,e,t){var r,i,s=this.eras(),o,u,c;for(n=n.toUpperCase(),r=0,i=s.length;r<i;++r)if(o=s[r].name.toUpperCase(),u=s[r].abbr.toUpperCase(),c=s[r].narrow.toUpperCase(),t)switch(e){case"N":case"NN":case"NNN":if(u===n)return s[r];break;case"NNNN":if(o===n)return s[r];break;case"NNNNN":if(c===n)return s[r];break}else if([o,u,c].indexOf(n)>=0)return s[r]}function Qp(n,e){var t=n.since<=n.until?1:-1;return e===void 0?k(n.since).year():k(n.since).year()+(e-n.offset)*t}function Jp(){var n,e,t,r=this.localeData().eras();for(n=0,e=r.length;n<e;++n)if(t=this.clone().startOf("day").valueOf(),r[n].since<=t&&t<=r[n].until||r[n].until<=t&&t<=r[n].since)return r[n].name;return""}function Xp(){var n,e,t,r=this.localeData().eras();for(n=0,e=r.length;n<e;++n)if(t=this.clone().startOf("day").valueOf(),r[n].since<=t&&t<=r[n].until||r[n].until<=t&&t<=r[n].since)return r[n].narrow;return""}function Zp(){var n,e,t,r=this.localeData().eras();for(n=0,e=r.length;n<e;++n)if(t=this.clone().startOf("day").valueOf(),r[n].since<=t&&t<=r[n].until||r[n].until<=t&&t<=r[n].since)return r[n].abbr;return""}function eg(){var n,e,t,r,i=this.localeData().eras();for(n=0,e=i.length;n<e;++n)if(t=i[n].since<=i[n].until?1:-1,r=this.clone().startOf("day").valueOf(),i[n].since<=r&&r<=i[n].until||i[n].until<=r&&r<=i[n].since)return(this.year()-k(i[n].since).year())*t+i[n].offset;return this.year()}function tg(n){return Q(this,"_erasNameRegex")||na.call(this),n?this._erasNameRegex:this._erasRegex}function ng(n){return Q(this,"_erasAbbrRegex")||na.call(this),n?this._erasAbbrRegex:this._erasRegex}function rg(n){return Q(this,"_erasNarrowRegex")||na.call(this),n?this._erasNarrowRegex:this._erasRegex}function ta(n,e){return e.erasAbbrRegex(n)}function ig(n,e){return e.erasNameRegex(n)}function sg(n,e){return e.erasNarrowRegex(n)}function ag(n,e){return e._eraYearOrdinalRegex||yn}function na(){var n=[],e=[],t=[],r=[],i,s,o,u,c,d=this.eras();for(i=0,s=d.length;i<s;++i)o=dt(d[i].name),u=dt(d[i].abbr),c=dt(d[i].narrow),e.push(o),n.push(u),t.push(c),r.push(o),r.push(u),r.push(c);this._erasRegex=new RegExp("^("+r.join("|")+")","i"),this._erasNameRegex=new RegExp("^("+e.join("|")+")","i"),this._erasAbbrRegex=new RegExp("^("+n.join("|")+")","i"),this._erasNarrowRegex=new RegExp("^("+t.join("|")+")","i")}L(0,["gg",2],0,function(){return this.weekYear()%100}),L(0,["GG",2],0,function(){return this.isoWeekYear()%100});function gi(n,e){L(0,[n,n.length],0,e)}gi("gggg","weekYear"),gi("ggggg","weekYear"),gi("GGGG","isoWeekYear"),gi("GGGGG","isoWeekYear"),N("G",ii),N("g",ii),N("GG",se,Be),N("gg",se,Be),N("GGGG",Us,Fs),N("gggg",Us,Fs),N("GGGGG",ri,ti),N("ggggg",ri,ti),Jn(["gggg","ggggg","GGGG","GGGGG"],function(n,e,t,r){e[r.substr(0,2)]=Y(n)}),Jn(["gg","GG"],function(n,e,t,r){e[r]=k.parseTwoDigitYear(n)});function og(n){return xl.call(this,n,this.week(),this.weekday()+this.localeData()._week.dow,this.localeData()._week.dow,this.localeData()._week.doy)}function lg(n){return xl.call(this,n,this.isoWeek(),this.isoWeekday(),1,4)}function ug(){return pt(this.year(),1,4)}function hg(){return pt(this.isoWeekYear(),1,4)}function cg(){var n=this.localeData()._week;return pt(this.year(),n.dow,n.doy)}function dg(){var n=this.localeData()._week;return pt(this.weekYear(),n.dow,n.doy)}function xl(n,e,t,r,i){var s;return n==null?tr(this,r,i).year:(s=pt(n,r,i),e>s&&(e=s),fg.call(this,n,e,t,r,i))}function fg(n,e,t,r,i){var s=ml(n,e,t,r,i),o=er(s.year,0,s.dayOfYear);return this.year(o.getUTCFullYear()),this.month(o.getUTCMonth()),this.date(o.getUTCDate()),this}L("Q",0,"Qo","quarter"),N("Q",rl),ne("Q",function(n,e){e[ft]=(Y(n)-1)*3});function mg(n){return n==null?Math.ceil((this.month()+1)/3):this.month((n-1)*3+this.month()%3)}L("D",["DD",2],"Do","date"),N("D",se,_n),N("DD",se,Be),N("Do",function(n,e){return n?e._dayOfMonthOrdinalParse||e._ordinalParse:e._dayOfMonthOrdinalParseLenient}),ne(["D","DD"],it),ne("Do",function(n,e){e[it]=Y(n.match(se)[0])});var Fl=vn("Date",!0);L("DDD",["DDDD",3],"DDDo","dayOfYear"),N("DDD",ni),N("DDDD",il),ne(["DDD","DDDD"],function(n,e,t){t._dayOfYear=Y(n)});function pg(n){var e=Math.round((this.clone().startOf("day")-this.clone().startOf("year"))/864e5)+1;return n==null?e:this.add(n-e,"d")}L("m",["mm",2],0,"minute"),N("m",se,Bs),N("mm",se,Be),ne(["m","mm"],Qe);var gg=vn("Minutes",!1);L("s",["ss",2],0,"second"),N("s",se,Bs),N("ss",se,Be),ne(["s","ss"],mt);var yg=vn("Seconds",!1);L("S",0,0,function(){return~~(this.millisecond()/100)}),L(0,["SS",2],0,function(){return~~(this.millisecond()/10)}),L(0,["SSS",3],0,"millisecond"),L(0,["SSSS",4],0,function(){return this.millisecond()*10}),L(0,["SSSSS",5],0,function(){return this.millisecond()*100}),L(0,["SSSSSS",6],0,function(){return this.millisecond()*1e3}),L(0,["SSSSSSS",7],0,function(){return this.millisecond()*1e4}),L(0,["SSSSSSSS",8],0,function(){return this.millisecond()*1e5}),L(0,["SSSSSSSSS",9],0,function(){return this.millisecond()*1e6}),N("S",ni,rl),N("SS",ni,Be),N("SSS",ni,il);var kt,Ul;for(kt="SSSS";kt.length<=9;kt+="S")N(kt,yn);function _g(n,e){e[jt]=Y(("0."+n)*1e3)}for(kt="S";kt.length<=9;kt+="S")ne(kt,_g);Ul=vn("Milliseconds",!1),L("z",0,0,"zoneAbbr"),L("zz",0,0,"zoneName");function vg(){return this._isUTC?"UTC":""}function wg(){return this._isUTC?"Coordinated Universal Time":""}var b=Kn.prototype;b.add=dp,b.calendar=vp,b.clone=wp,b.diff=bp,b.endOf=xp,b.format=Dp,b.from=Mp,b.fromNow=Np,b.to=Op,b.toNow=Vp,b.get=Pf,b.invalidAt=qp,b.isAfter=Ep,b.isBefore=Tp,b.isBetween=Ip,b.isSame=Ap,b.isSameOrAfter=Sp,b.isSameOrBefore=Cp,b.isValid=zp,b.lang=Ml,b.locale=Dl,b.localeData=Nl,b.max=zm,b.min=Ym,b.parsingFlags=Gp,b.set=Df,b.startOf=Lp,b.subtract=fp,b.toArray=Hp,b.toObject=Wp,b.toDate=Bp,b.toISOString=kp,b.inspect=Pp,typeof Symbol<"u"&&Symbol.for!=null&&(b[Symbol.for("nodejs.util.inspect.custom")]=function(){return"Moment<"+this.format()+">"}),b.toJSON=Yp,b.toString=Rp,b.unix=Up,b.valueOf=Fp,b.creationData=$p,b.eraName=Jp,b.eraNarrow=Xp,b.eraAbbr=Zp,b.eraYear=eg,b.year=ol,b.isLeapYear=kf,b.weekYear=og,b.isoWeekYear=lg,b.quarter=b.quarters=mg,b.month=dl,b.daysInMonth=Bf,b.week=b.weeks=jf,b.isoWeek=b.isoWeeks=Kf,b.weeksInYear=cg,b.weeksInWeekYear=dg,b.isoWeeksInYear=ug,b.isoWeeksInISOWeekYear=hg,b.date=Fl,b.day=b.days=lm,b.weekday=um,b.isoWeekday=hm,b.dayOfYear=pg,b.hour=b.hours=ym,b.minute=b.minutes=gg,b.second=b.seconds=yg,b.millisecond=b.milliseconds=Ul,b.utcOffset=Zm,b.utc=tp,b.local=np,b.parseZone=rp,b.hasAlignedHourOffset=ip,b.isDST=sp,b.isLocal=op,b.isUtcOffset=lp,b.isUtc=Cl,b.isUTC=Cl,b.zoneAbbr=vg,b.zoneName=wg,b.dates=We("dates accessor is deprecated. Use date instead.",Fl),b.months=We("months accessor is deprecated. Use month instead",dl),b.years=We("years accessor is deprecated. Use year instead",ol),b.zone=We("moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/",ep),b.isDSTShifted=We("isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information",ap);function Eg(n){return ae(n*1e3)}function Tg(){return ae.apply(null,arguments).parseZone()}function Bl(n){return n}var J=Ns.prototype;J.calendar=of,J.longDateFormat=cf,J.invalidDate=ff,J.ordinal=gf,J.preparse=Bl,J.postformat=Bl,J.relativeTime=_f,J.pastFuture=vf,J.set=sf,J.eras=jp,J.erasParse=Kp,J.erasConvertYear=Qp,J.erasAbbrRegex=ng,J.erasNameRegex=tg,J.erasNarrowRegex=rg,J.months=Lf,J.monthsShort=xf,J.monthsParse=Uf,J.monthsRegex=Wf,J.monthsShortRegex=Hf,J.week=zf,J.firstDayOfYear=$f,J.firstDayOfWeek=qf,J.weekdays=rm,J.weekdaysMin=sm,J.weekdaysShort=im,J.weekdaysParse=om,J.weekdaysRegex=cm,J.weekdaysShortRegex=dm,J.weekdaysMinRegex=fm,J.isPM=pm,J.meridiem=_m;function yi(n,e,t,r){var i=gt(),s=tt().set(r,e);return i[t](s,n)}function Hl(n,e,t){if(ct(n)&&(e=n,n=void 0),n=n||"",e!=null)return yi(n,e,t,"month");var r,i=[];for(r=0;r<12;r++)i[r]=yi(n,r,t,"month");return i}function ra(n,e,t,r){typeof n=="boolean"?(ct(e)&&(t=e,e=void 0),e=e||""):(e=n,t=e,n=!1,ct(e)&&(t=e,e=void 0),e=e||"");var i=gt(),s=n?i._week.dow:0,o,u=[];if(t!=null)return yi(e,(t+s)%7,r,"day");for(o=0;o<7;o++)u[o]=yi(e,(o+s)%7,r,"day");return u}function Ig(n,e){return Hl(n,e,"months")}function Ag(n,e){return Hl(n,e,"monthsShort")}function Sg(n,e,t){return ra(n,e,t,"weekdays")}function Cg(n,e,t){return ra(n,e,t,"weekdaysShort")}function bg(n,e,t){return ra(n,e,t,"weekdaysMin")}Rt("en",{eras:[{since:"0001-01-01",until:1/0,offset:1,name:"Anno Domini",narrow:"AD",abbr:"AD"},{since:"0000-12-31",until:-1/0,offset:1,name:"Before Christ",narrow:"BC",abbr:"BC"}],dayOfMonthOrdinalParse:/\d{1,2}(th|st|nd|rd)/,ordinal:function(n){var e=n%10,t=Y(n%100/10)===1?"th":e===1?"st":e===2?"nd":e===3?"rd":"th";return n+t}}),k.lang=We("moment.lang is deprecated. Use moment.locale instead.",Rt),k.langData=We("moment.langData is deprecated. Use moment.localeData instead.",gt);var yt=Math.abs;function Rg(){var n=this._data;return this._milliseconds=yt(this._milliseconds),this._days=yt(this._days),this._months=yt(this._months),n.milliseconds=yt(n.milliseconds),n.seconds=yt(n.seconds),n.minutes=yt(n.minutes),n.hours=yt(n.hours),n.months=yt(n.months),n.years=yt(n.years),this}function Wl(n,e,t,r){var i=Je(e,t);return n._milliseconds+=r*i._milliseconds,n._days+=r*i._days,n._months+=r*i._months,n._bubble()}function kg(n,e){return Wl(this,n,e,1)}function Pg(n,e){return Wl(this,n,e,-1)}function Yl(n){return n<0?Math.floor(n):Math.ceil(n)}function Dg(){var n=this._milliseconds,e=this._days,t=this._months,r=this._data,i,s,o,u,c;return n>=0&&e>=0&&t>=0||n<=0&&e<=0&&t<=0||(n+=Yl(ia(t)+e)*864e5,e=0,t=0),r.milliseconds=n%1e3,i=ze(n/1e3),r.seconds=i%60,s=ze(i/60),r.minutes=s%60,o=ze(s/60),r.hours=o%24,e+=ze(o/24),c=ze(zl(e)),t+=c,e-=Yl(ia(c)),u=ze(t/12),t%=12,r.days=e,r.months=t,r.years=u,this}function zl(n){return n*4800/146097}function ia(n){return n*146097/4800}function Mg(n){if(!this.isValid())return NaN;var e,t,r=this._milliseconds;if(n=Ye(n),n==="month"||n==="quarter"||n==="year")switch(e=this._days+r/864e5,t=this._months+zl(e),n){case"month":return t;case"quarter":return t/3;case"year":return t/12}else switch(e=this._days+Math.round(ia(this._months)),n){case"week":return e/7+r/6048e5;case"day":return e+r/864e5;case"hour":return e*24+r/36e5;case"minute":return e*1440+r/6e4;case"second":return e*86400+r/1e3;case"millisecond":return Math.floor(e*864e5)+r;default:throw new Error("Unknown unit "+n)}}function _t(n){return function(){return this.as(n)}}var Gl=_t("ms"),Ng=_t("s"),Og=_t("m"),Vg=_t("h"),Lg=_t("d"),xg=_t("w"),Fg=_t("M"),Ug=_t("Q"),Bg=_t("y"),Hg=Gl;function Wg(){return Je(this)}function Yg(n){return n=Ye(n),this.isValid()?this[n+"s"]():NaN}function Qt(n){return function(){return this.isValid()?this._data[n]:NaN}}var zg=Qt("milliseconds"),Gg=Qt("seconds"),qg=Qt("minutes"),$g=Qt("hours"),jg=Qt("days"),Kg=Qt("months"),Qg=Qt("years");function Jg(){return ze(this.days()/7)}var vt=Math.round,In={ss:44,s:45,m:45,h:22,d:26,w:null,M:11};function Xg(n,e,t,r,i){return i.relativeTime(e||1,!!t,n,r)}function Zg(n,e,t,r){var i=Je(n).abs(),s=vt(i.as("s")),o=vt(i.as("m")),u=vt(i.as("h")),c=vt(i.as("d")),d=vt(i.as("M")),m=vt(i.as("w")),T=vt(i.as("y")),S=s<=t.ss&&["s",s]||s<t.s&&["ss",s]||o<=1&&["m"]||o<t.m&&["mm",o]||u<=1&&["h"]||u<t.h&&["hh",u]||c<=1&&["d"]||c<t.d&&["dd",c];return t.w!=null&&(S=S||m<=1&&["w"]||m<t.w&&["ww",m]),S=S||d<=1&&["M"]||d<t.M&&["MM",d]||T<=1&&["y"]||["yy",T],S[2]=e,S[3]=+n>0,S[4]=r,Xg.apply(null,S)}function ey(n){return n===void 0?vt:typeof n=="function"?(vt=n,!0):!1}function ty(n,e){return In[n]===void 0?!1:e===void 0?In[n]:(In[n]=e,n==="s"&&(In.ss=e-1),!0)}function ny(n,e){if(!this.isValid())return this.localeData().invalidDate();var t=!1,r=In,i,s;return typeof n=="object"&&(e=n,n=!1),typeof n=="boolean"&&(t=n),typeof e=="object"&&(r=Object.assign({},In,e),e.s!=null&&e.ss==null&&(r.ss=e.s-1)),i=this.localeData(),s=Zg(this,!t,r,i),t&&(s=i.pastFuture(+this,s)),i.postformat(s)}var sa=Math.abs;function An(n){return(n>0)-(n<0)||+n}function _i(){if(!this.isValid())return this.localeData().invalidDate();var n=sa(this._milliseconds)/1e3,e=sa(this._days),t=sa(this._months),r,i,s,o,u=this.asSeconds(),c,d,m,T;return u?(r=ze(n/60),i=ze(r/60),n%=60,r%=60,s=ze(t/12),t%=12,o=n?n.toFixed(3).replace(/\.?0+$/,""):"",c=u<0?"-":"",d=An(this._months)!==An(u)?"-":"",m=An(this._days)!==An(u)?"-":"",T=An(this._milliseconds)!==An(u)?"-":"",c+"P"+(s?d+s+"Y":"")+(t?d+t+"M":"")+(e?m+e+"D":"")+(i||r||n?"T":"")+(i?T+i+"H":"")+(r?T+r+"M":"")+(n?T+o+"S":"")):"P0D"}var G=ci.prototype;G.isValid=Km,G.abs=Rg,G.add=kg,G.subtract=Pg,G.as=Mg,G.asMilliseconds=Gl,G.asSeconds=Ng,G.asMinutes=Og,G.asHours=Vg,G.asDays=Lg,G.asWeeks=xg,G.asMonths=Fg,G.asQuarters=Ug,G.asYears=Bg,G.valueOf=Hg,G._bubble=Dg,G.clone=Wg,G.get=Yg,G.milliseconds=zg,G.seconds=Gg,G.minutes=qg,G.hours=$g,G.days=jg,G.weeks=Jg,G.months=Kg,G.years=Qg,G.humanize=ny,G.toISOString=_i,G.toString=_i,G.toJSON=_i,G.locale=Dl,G.localeData=Nl,G.toIsoString=We("toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)",_i),G.lang=Ml,L("X",0,0,"unix"),L("x",0,0,"valueOf"),N("x",ii),N("X",If),ne("X",function(n,e,t){t._d=new Date(parseFloat(n)*1e3)}),ne("x",function(n,e,t){t._d=new Date(Y(n))});//! moment.js
k.version="2.30.1",nf(ae),k.fn=b,k.min=Gm,k.max=qm,k.now=$m,k.utc=tt,k.unix=Eg,k.months=Ig,k.isDate=jn,k.locale=Rt,k.invalid=Xr,k.duration=Je,k.isMoment=Ke,k.weekdays=Sg,k.parseZone=Tg,k.localeData=gt,k.isDuration=di,k.monthsShort=Ag,k.weekdaysMin=bg,k.defineLocale=qs,k.updateLocale=Tm,k.locales=Im,k.weekdaysShort=Cg,k.normalizeUnits=Ye,k.relativeTimeRounding=ey,k.relativeTimeThreshold=ty,k.calendarFormat=_p,k.prototype=b,k.HTML5_FMT={DATETIME_LOCAL:"YYYY-MM-DDTHH:mm",DATETIME_LOCAL_SECONDS:"YYYY-MM-DDTHH:mm:ss",DATETIME_LOCAL_MS:"YYYY-MM-DDTHH:mm:ss.SSS",DATE:"YYYY-MM-DD",TIME:"HH:mm",TIME_SECONDS:"HH:mm:ss",TIME_MS:"HH:mm:ss.SSS",WEEK:"GGGG-[W]WW",MONTH:"YYYY-MM"};var aa={exports:{}},ql={},vi={ROOT:0,GROUP:1,POSITION:2,SET:3,RANGE:4,REPETITION:5,REFERENCE:6,CHAR:7},wt={};const Z=vi,oa=()=>[{type:Z.RANGE,from:48,to:57}],$l=()=>[{type:Z.CHAR,value:95},{type:Z.RANGE,from:97,to:122},{type:Z.RANGE,from:65,to:90}].concat(oa()),jl=()=>[{type:Z.CHAR,value:9},{type:Z.CHAR,value:10},{type:Z.CHAR,value:11},{type:Z.CHAR,value:12},{type:Z.CHAR,value:13},{type:Z.CHAR,value:32},{type:Z.CHAR,value:160},{type:Z.CHAR,value:5760},{type:Z.RANGE,from:8192,to:8202},{type:Z.CHAR,value:8232},{type:Z.CHAR,value:8233},{type:Z.CHAR,value:8239},{type:Z.CHAR,value:8287},{type:Z.CHAR,value:12288},{type:Z.CHAR,value:65279}],ry=()=>[{type:Z.CHAR,value:10},{type:Z.CHAR,value:13},{type:Z.CHAR,value:8232},{type:Z.CHAR,value:8233}];wt.words=()=>({type:Z.SET,set:$l(),not:!1}),wt.notWords=()=>({type:Z.SET,set:$l(),not:!0}),wt.ints=()=>({type:Z.SET,set:oa(),not:!1}),wt.notInts=()=>({type:Z.SET,set:oa(),not:!0}),wt.whitespace=()=>({type:Z.SET,set:jl(),not:!1}),wt.notWhitespace=()=>({type:Z.SET,set:jl(),not:!0}),wt.anyChar=()=>({type:Z.SET,set:ry(),not:!0}),function(n){const e=vi,t=wt,r="@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^ ?",i={0:0,t:9,n:10,v:11,f:12,r:13};n.strToChars=function(s){var o=/(\[\\b\])|(\\)?\\(?:u([A-F0-9]{4})|x([A-F0-9]{2})|(0?[0-7]{2})|c([@A-Z[\\\]^?])|([0tnvfr]))/g;return s=s.replace(o,function(u,c,d,m,T,S,R,O){if(d)return u;var x=c?8:m?parseInt(m,16):T?parseInt(T,16):S?parseInt(S,8):R?r.indexOf(R):i[O],M=String.fromCharCode(x);return/[[\]{}^$.|?*+()]/.test(M)&&(M="\\"+M),M}),s},n.tokenizeClass=(s,o)=>{for(var u=[],c=/\\(?:(w)|(d)|(s)|(W)|(D)|(S))|((?:(?:\\)(.)|([^\]\\]))-(?:\\)?([^\]]))|(\])|(?:\\)?([^])/g,d,m;(d=c.exec(s))!=null;)if(d[1])u.push(t.words());else if(d[2])u.push(t.ints());else if(d[3])u.push(t.whitespace());else if(d[4])u.push(t.notWords());else if(d[5])u.push(t.notInts());else if(d[6])u.push(t.notWhitespace());else if(d[7])u.push({type:e.RANGE,from:(d[8]||d[9]).charCodeAt(0),to:d[10].charCodeAt(0)});else if(m=d[12])u.push({type:e.CHAR,value:m.charCodeAt(0)});else return[u,c.lastIndex];n.error(o,"Unterminated character class")},n.error=(s,o)=>{throw new SyntaxError("Invalid regular expression: /"+s+"/: "+o)}}(ql);var sr={};const wi=vi;sr.wordBoundary=()=>({type:wi.POSITION,value:"b"}),sr.nonWordBoundary=()=>({type:wi.POSITION,value:"B"}),sr.begin=()=>({type:wi.POSITION,value:"^"}),sr.end=()=>({type:wi.POSITION,value:"$"});const Sn=ql,Ge=vi,Jt=wt,Ei=sr;aa.exports=n=>{var e=0,t,r,i={type:Ge.ROOT,stack:[]},s=i,o=i.stack,u=[],c=te=>{Sn.error(n,`Nothing to repeat at column ${te-1}`)},d=Sn.strToChars(n);for(t=d.length;e<t;)switch(r=d[e++],r){case"\\":switch(r=d[e++],r){case"b":o.push(Ei.wordBoundary());break;case"B":o.push(Ei.nonWordBoundary());break;case"w":o.push(Jt.words());break;case"W":o.push(Jt.notWords());break;case"d":o.push(Jt.ints());break;case"D":o.push(Jt.notInts());break;case"s":o.push(Jt.whitespace());break;case"S":o.push(Jt.notWhitespace());break;default:/\d/.test(r)?o.push({type:Ge.REFERENCE,value:parseInt(r,10)}):o.push({type:Ge.CHAR,value:r.charCodeAt(0)})}break;case"^":o.push(Ei.begin());break;case"$":o.push(Ei.end());break;case"[":var m;d[e]==="^"?(m=!0,e++):m=!1;var T=Sn.tokenizeClass(d.slice(e),n);e+=T[1],o.push({type:Ge.SET,set:T[0],not:m});break;case".":o.push(Jt.anyChar());break;case"(":var S={type:Ge.GROUP,stack:[],remember:!0};r=d[e],r==="?"&&(r=d[e+1],e+=2,r==="="?S.followedBy=!0:r==="!"?S.notFollowedBy=!0:r!==":"&&Sn.error(n,`Invalid group, character '${r}' after '?' at column ${e-1}`),S.remember=!1),o.push(S),u.push(s),s=S,o=S.stack;break;case")":u.length===0&&Sn.error(n,`Unmatched ) at column ${e-1}`),s=u.pop(),o=s.options?s.options[s.options.length-1]:s.stack;break;case"|":s.options||(s.options=[s.stack],delete s.stack);var R=[];s.options.push(R),o=R;break;case"{":var O=/^(\d+)(,(\d+)?)?\}/.exec(d.slice(e)),x,M;O!==null?(o.length===0&&c(e),x=parseInt(O[1],10),M=O[2]?O[3]?parseInt(O[3],10):1/0:x,e+=O[0].length,o.push({type:Ge.REPETITION,min:x,max:M,value:o.pop()})):o.push({type:Ge.CHAR,value:123});break;case"?":o.length===0&&c(e),o.push({type:Ge.REPETITION,min:0,max:1,value:o.pop()});break;case"+":o.length===0&&c(e),o.push({type:Ge.REPETITION,min:1,max:1/0,value:o.pop()});break;case"*":o.length===0&&c(e),o.push({type:Ge.REPETITION,min:0,max:1/0,value:o.pop()});break;default:o.push({type:Ge.CHAR,value:r.charCodeAt(0)})}return u.length!==0&&Sn.error(n,"Unterminated group"),i},aa.exports.types=Ge;var iy=aa.exports;class st{constructor(e,t){this.low=e,this.high=t,this.length=1+t-e}overlaps(e){return!(this.high<e.low||this.low>e.high)}touches(e){return!(this.high+1<e.low||this.low-1>e.high)}add(e){return new st(Math.min(this.low,e.low),Math.max(this.high,e.high))}subtract(e){return e.low<=this.low&&e.high>=this.high?[]:e.low>this.low&&e.high<this.high?[new st(this.low,e.low-1),new st(e.high+1,this.high)]:e.low<=this.low?[new st(e.high+1,this.high)]:[new st(this.low,e.low-1)]}toString(){return this.low==this.high?this.low.toString():this.low+"-"+this.high}}var sy=class Qr{constructor(e,t){this.ranges=[],this.length=0,e!=null&&this.add(e,t)}_update_length(){this.length=this.ranges.reduce((e,t)=>e+t.length,0)}add(e,t){var r=i=>{for(var s=0;s<this.ranges.length&&!i.touches(this.ranges[s]);)s++;for(var o=this.ranges.slice(0,s);s<this.ranges.length&&i.touches(this.ranges[s]);)i=i.add(this.ranges[s]),s++;o.push(i),this.ranges=o.concat(this.ranges.slice(s)),this._update_length()};return e instanceof Qr?e.ranges.forEach(r):(t==null&&(t=e),r(new st(e,t))),this}subtract(e,t){var r=i=>{for(var s=0;s<this.ranges.length&&!i.overlaps(this.ranges[s]);)s++;for(var o=this.ranges.slice(0,s);s<this.ranges.length&&i.overlaps(this.ranges[s]);)o=o.concat(this.ranges[s].subtract(i)),s++;this.ranges=o.concat(this.ranges.slice(s)),this._update_length()};return e instanceof Qr?e.ranges.forEach(r):(t==null&&(t=e),r(new st(e,t))),this}intersect(e,t){var r=[],i=s=>{for(var o=0;o<this.ranges.length&&!s.overlaps(this.ranges[o]);)o++;for(;o<this.ranges.length&&s.overlaps(this.ranges[o]);){var u=Math.max(this.ranges[o].low,s.low),c=Math.min(this.ranges[o].high,s.high);r.push(new st(u,c)),o++}};return e instanceof Qr?e.ranges.forEach(i):(t==null&&(t=e),i(new st(e,t))),this.ranges=r,this._update_length(),this}index(e){for(var t=0;t<this.ranges.length&&this.ranges[t].length<=e;)e-=this.ranges[t].length,t++;return this.ranges[t].low+e}toString(){return"[ "+this.ranges.join(", ")+" ]"}clone(){return new Qr(this)}numbers(){return this.ranges.reduce((e,t)=>{for(var r=t.low;r<=t.high;)e.push(r),r++;return e},[])}subranges(){return this.ranges.map(e=>({low:e.low,high:e.high,length:1+e.high-e.low}))}};const Ti=iy,ar=sy,Xt=Ti.types;var ay=class Jr{constructor(e,t){if(this._setDefaults(e),e instanceof RegExp)this.ignoreCase=e.ignoreCase,this.multiline=e.multiline,e=e.source;else if(typeof e=="string")this.ignoreCase=t&&t.indexOf("i")!==-1,this.multiline=t&&t.indexOf("m")!==-1;else throw new Error("Expected a regexp or string");this.tokens=Ti(e)}_setDefaults(e){this.max=e.max!=null?e.max:Jr.prototype.max!=null?Jr.prototype.max:100,this.defaultRange=e.defaultRange?e.defaultRange:this.defaultRange.clone(),e.randInt&&(this.randInt=e.randInt)}gen(){return this._gen(this.tokens,[])}_gen(e,t){var r,i,s,o,u;switch(e.type){case Xt.ROOT:case Xt.GROUP:if(e.followedBy||e.notFollowedBy)return"";for(e.remember&&e.groupNumber===void 0&&(e.groupNumber=t.push(null)-1),r=e.options?this._randSelect(e.options):e.stack,i="",o=0,u=r.length;o<u;o++)i+=this._gen(r[o],t);return e.remember&&(t[e.groupNumber]=i),i;case Xt.POSITION:return"";case Xt.SET:var c=this._expand(e);return c.length?String.fromCharCode(this._randSelect(c)):"";case Xt.REPETITION:for(s=this.randInt(e.min,e.max===1/0?e.min+this.max:e.max),i="",o=0;o<s;o++)i+=this._gen(e.value,t);return i;case Xt.REFERENCE:return t[e.value-1]||"";case Xt.CHAR:var d=this.ignoreCase&&this._randBool()?this._toOtherCase(e.value):e.value;return String.fromCharCode(d)}}_toOtherCase(e){return e+(97<=e&&e<=122?-32:65<=e&&e<=90?32:0)}_randBool(){return!this.randInt(0,1)}_randSelect(e){return e instanceof ar?e.index(this.randInt(0,e.length-1)):e[this.randInt(0,e.length-1)]}_expand(e){if(e.type===Ti.types.CHAR)return new ar(e.value);if(e.type===Ti.types.RANGE)return new ar(e.from,e.to);{let t=new ar;for(let r=0;r<e.set.length;r++){let i=this._expand(e.set[r]);if(t.add(i),this.ignoreCase)for(let s=0;s<i.length;s++){let o=i.index(s),u=this._toOtherCase(o);o!==u&&t.add(u)}}return e.not?this.defaultRange.clone().subtract(t):this.defaultRange.clone().intersect(t)}}randInt(e,t){return e+Math.floor(Math.random()*(1+t-e))}get defaultRange(){return this._range=this._range||new ar(32,126)}set defaultRange(e){this._range=e}static randexp(e,t){var r;return typeof e=="string"&&(e=new RegExp(e,t)),e._randexp===void 0?(r=new Jr(e,t),e._randexp=r):(r=e._randexp,r._setDefaults(e)),r.gen()}static sugar(){RegExp.prototype.gen=function(){return Jr.randexp(this)}}};const Kl=Ct(ay),Ql=["lorem","ipsum","dolor","sit","amet,","consectetur","adipisicing","elit,","sed","do","eiusmod","tempor","incididunt","ut","labore","et","dolore","magna","aliqua.","enim","ad","minim","veniam,","quis","nostrud","exercitation","ullamco","laboris","nisi","ut","aliquip","ex","ea","commodo","consequat.","duis","aute","irure","dolor","in","reprehenderit","in","voluptate","velit","esse","cillum","dolore","eu","fugiat","nulla","pariatur.","excepteur","sint","occaecat","cupidatat","non","proident,","sunt","in","culpa","qui","officia","deserunt","mollit","anim","id","est","laborum.","sed","ut","perspiciatis,","unde","omnis","iste","natus","error","sit","voluptatem","accusantium","doloremque","laudantium,","totam","rem","aperiam","eaque","ipsa,","quae","ab","illo","inventore","veritatis","et","quasi","architecto","beatae","vitae","dicta","sunt,","explicabo.","nemo","enim","ipsam","voluptatem,","quia","voluptas","sit,","aspernatur","aut","odit","aut","fugit,","sed","quia","consequuntur","magni","dolores","eos,","qui","ratione","voluptatem","sequi","nesciunt,","neque","porro","quisquam","est,","qui","dolorem","ipsum,","quia","dolor","sit,","amet,","consectetur,","adipisci","velit,","sed","quia","non","numquam","eius","modi","tempora","incidunt,","ut","labore","et","dolore","magnam","aliquam","quaerat","voluptatem.","ut","enim","ad","minima","veniam,","quis","nostrum","exercitationem","ullam","corporis","suscipit","laboriosam,","nisi","ut","aliquid","ex","ea","commodi","consequatur?","quis","autem","vel","eum","iure","reprehenderit,","qui","in","ea","voluptate","velit","esse,","quam","nihil","molestiae","consequatur,","vel","illum,","qui","dolorem","eum","fugiat,","quo","voluptas","nulla","pariatur?","at","vero","eos","et","accusamus","et","iusto","odio","dignissimos","ducimus,","qui","blanditiis","praesentium","voluptatum","deleniti","atque","corrupti,","quos","dolores","et","quas","molestias","excepturi","sint,","obcaecati","cupiditate","non","provident,","similique","sunt","in","culpa,","qui","officia","deserunt","mollitia","animi,","id","est","laborum","et","dolorum","fuga.","harum","quidem","rerum","facilis","est","et","expedita","distinctio.","Nam","libero","tempore,","cum","soluta","nobis","est","eligendi","optio,","cumque","nihil","impedit,","quo","minus","id,","quod","maxime","placeat,","facere","possimus,","omnis","voluptas","assumenda","est,","omnis","dolor","repellendus.","temporibus","autem","quibusdam","aut","officiis","debitis","aut","rerum","necessitatibus","saepe","eveniet,","ut","et","voluptates","repudiandae","sint","molestiae","non","recusandae.","itaque","earum","rerum","hic","tenetur","a","sapiente","delectus,","aut","reiciendis","voluptatibus","maiores","alias","consequatur","aut","perferendis","doloribus","asperiores","repellat"],Jl=["Aaron","Abbot","Abdul","Abel","Abigail","Abra","Abraham","Acton","Adam","Adara","Addison","Adele","Adena","Adria","Adrian","Adrienne","Ahmed","Aidan","Aiko","Aileen","Aimee","Ainsley","Akeem","Aladdin","Alan","Alana","Alden","Alea","Alec","Alexa","Alexander","Alexandra","Alexis","Alfonso","Alfreda","Ali","Alice","Alika","Aline","Alisa","Allegra","Allen","Allistair","Alma","Althea","Alvin","Alyssa","Amal","Amanda","Amaya","Amber","Amela","Amelia","Amena","Amery","Amethyst","Amir","Amity","Amos","Amy","Anastasia","Andrew","Angela","Angelica","Anika","Anjolie","Ann","Anne","Anthony","Aphrodite","April","Aquila","Arden","Aretha","Ariana","Ariel","Aristotle","Armand","Armando","Arsenio","Arthur","Ashely","Asher","Ashton","Aspen","Astra","Athena","Aubrey","Audra","Audrey","August","Aurelia","Aurora","Austin","Autumn","Ava","Avram","Avye","Axel","Ayanna","Azalia","Baker","Barbara","Barclay","Barrett","Barry","Basia","Basil","Baxter","Beatrice","Beau","Beck","Bell","Belle","Benedict","Benjamin","Berk","Bernard","Bert","Bertha","Bethany","Beverly","Bevis","Bianca","Blaine","Blair","Blake","Blaze","Blossom","Blythe","Bo","Boris","Bradley","Brady","Branden","Brandon","Breanna","Bree","Brenda","Brendan","Brenden","Brenna","Brennan","Brent","Brett","Brian","Brianna","Briar","Brielle","Britanney","Britanni","Brittany","Brock","Brody","Brooke","Bruce","Bruno","Bryar","Brynn","Brynne","Buckminster","Buffy","Burke","Burton","Byron","Cade","Cadman","Caesar","Cailin","Cain","Cairo","Caldwell","Caleb","Calista","Callie","Callum","Cally","Calvin","Camden","Cameran","Cameron","Cameron","Camilla","Camille","Candace","Candice","Cara","Carissa","Carl","Carla","Carlos","Carly","Carol","Carolyn","Carson","Carter","Caryn","Casey","Cassady","Cassandra","Cassidy","Castor","Catherine","Cathleen","Cecilia","Cedric","Celeste","Chadwick","Chaim","Chancellor","Chanda","Chandler","Chaney","Channing","Chantale","Charde","Charissa","Charity","Charles","Charlotte","Chase","Chastity","Chava","Chelsea","Cherokee","Cheryl","Chester","Cheyenne","Chiquita","Chloe","Christen","Christian","Christine","Christopher","Ciara","Ciaran","Claire","Clare","Clark","Clarke","Claudia","Clayton","Clementine","Cleo","Clinton","Clio","Coby","Cody","Colby","Cole","Colette","Colin","Colleen","Colorado","Colt","Colton","Conan","Connor","Constance","Cooper","Cora","Courtney","Craig","Cruz","Cullen","Curran","Cynthia","Cyrus","Dacey","Dahlia","Dai","Dakota","Dale","Dalton","Damian","Damon","Dana","Dane","Daniel","Danielle","Dante","Daphne","Daquan","Dara","Daria","Darius","Darrel","Darryl","Daryl","David","Davis","Dawn","Deacon","Dean","Deanna","Deborah","Debra","Declan","Deirdre","Delilah","Demetria","Demetrius","Denise","Dennis","Denton","Derek","Desirae","Desiree","Destiny","Devin","Dexter","Diana","Dieter","Dillon","Dolan","Dominic","Dominique","Donna","Donovan","Dora","Dorian","Doris","Dorothy","Drake","Drew","Driscoll","Duncan","Dustin","Dylan","Eagan","Eaton","Ebony","Echo","Edan","Eden","Edward","Elaine","Eleanor","Eliana","Elijah","Elizabeth","Ella","Elliott","Elmo","Elton","Elvis","Emerald","Emerson","Emery","Emi","Emily","Emma","Emmanuel","Erasmus","Eric","Erica","Erich","Erin","Ethan","Eugenia","Evan","Evangeline","Eve","Evelyn","Ezekiel","Ezra","Faith","Fallon","Farrah","Fatima","Fay","Felicia","Felix","Ferdinand","Ferris","Finn","Fiona","Fitzgerald","Flavia","Fletcher","Fleur","Florence","Flynn","Forrest","Frances","Francesca","Francis","Fredericka","Freya","Fritz","Fuller","Fulton","Gabriel","Gage","Gail","Galena","Galvin","Gannon","Gareth","Garrett","Garrison","Garth","Gary","Gavin","Gay","Gemma","Genevieve","Geoffrey","George","Georgia","Geraldine","Germaine","Germane","Giacomo","Gil","Gillian","Ginger","Gisela","Giselle","Glenna","Gloria","Grace","Grady","Graham","Graiden","Grant","Gray","Gregory","Gretchen","Griffin","Griffith","Guinevere","Guy","Gwendolyn","Hadassah","Hadley","Hakeem","Halee","Haley","Hall","Halla","Hamilton","Hamish","Hammett","Hanae","Hanna","Hannah","Harding","Harlan","Harper","Harriet","Harrison","Hasad","Hashim","Haviva","Hayden","Hayes","Hayfa","Hayley","Heather","Hector","Hedda","Hedley","Hedwig","Hedy","Heidi","Helen","Henry","Herman","Hermione","Herrod","Hilary","Hilda","Hilel","Hillary","Hiram","Hiroko","Hollee","Holly","Holmes","Honorato","Hop","Hope","Howard","Hoyt","Hu","Hunter","Hyacinth","Hyatt","Ian","Idola","Idona","Ifeoma","Ignacia","Ignatius","Igor","Ila","Iliana","Illana","Illiana","Ima","Imani","Imelda","Imogene","Ina","India","Indigo","Indira","Inez","Inga","Ingrid","Iola","Iona","Ira","Irene","Iris","Irma","Isaac","Isabella","Isabelle","Isadora","Isaiah","Ishmael","Ivan","Ivana","Ivor","Ivory","Ivy","Jack","Jackson","Jacob","Jada","Jade","Jaden","Jael","Jaime","Jakeem","Jamal","Jamalia","James","Jameson","Jana","Jane","Janna","Jaquelyn","Jared","Jarrod","Jasmine","Jason","Jasper","Jayme","Jeanette","Jelani","Jemima","Jena","Jenette","Jenna","Jennifer","Jeremy","Jermaine","Jerome","Jerry","Jescie","Jessamine","Jesse","Jessica","Jillian","Jin","Joan","Jocelyn","Joel","Joelle","John","Jolene","Jolie","Jonah","Jonas","Jordan","Jordan","Jorden","Joseph","Josephine","Joshua","Josiah","Joy","Judah","Judith","Julian","Julie","Juliet","Justin","Justina","Justine","Kadeem","Kaden","Kai","Kaitlin","Kalia","Kamal","Kameko","Kane","Kareem","Karen","Karina","Karleigh","Karly","Karyn","Kaseem","Kasimir","Kasper","Katell","Katelyn","Kathleen","Kato","Kay","Kaye","Keane","Keaton","Keefe","Keegan","Keelie","Keely","Keiko","Keith","Kellie","Kelly","Kelly","Kelsey","Kelsie","Kendall","Kennan","Kennedy","Kenneth","Kenyon","Kermit","Kerry","Kessie","Kevin","Kevyn","Kiara","Kiayada","Kibo","Kieran","Kim","Kimberley","Kimberly","Kiona","Kirby","Kirestin","Kirk","Kirsten","Kitra","Knox","Kristen","Kuame","Kyla","Kylan","Kyle","Kylee","Kylie","Kylynn","Kyra","Lacey","Lacota","Lacy","Lael","Laith","Lamar","Lana","Lance","Lane","Lani","Lara","Lareina","Larissa","Lars","Latifah","Laura","Laurel","Lavinia","Lawrence","Leah","Leandra","Lee","Lee","Leigh","Leila","Leilani","Len","Lenore","Leo","Leonard","Leroy","Lesley","Leslie","Lester","Lev","Levi","Lewis","Libby","Liberty","Lila","Lilah","Lillian","Lillith","Linda","Linus","Lionel","Lisandra","Logan","Lois","Louis","Lucas","Lucian","Lucius","Lucy","Luke","Lunea","Lydia","Lyle","Lynn","Lysandra","MacKensie","MacKenzie","Macaulay","Macey","Macon","Macy","Madaline","Madeline","Madeson","Madison","Madonna","Magee","Maggie","Maggy","Maia","Maile","Maisie","Maite","Malachi","Malcolm","Malik","Mallory","Mannix","Mara","Marah","Marcia","Margaret","Mari","Mariam","Mariko","Maris","Mark","Marny","Marsden","Marshall","Martena","Martha","Martin","Martina","Marvin","Mary","Maryam","Mason","Matthew","Maxine","Maxwell","May","Maya","McKenzie","Mechelle","Medge","Megan","Meghan","Melanie","Melinda","Melissa","Melodie","Melvin","Melyssa","Mercedes","Meredith","Merrill","Merritt","Mia","Micah","Michael","Michelle","Mikayla","Minerva","Mira","Miranda","Miriam","Moana","Mohammad","Mollie","Molly","Mona","Montana","Morgan","Moses","Mufutau","Murphy","Myles","Myra","Nadine","Naida","Naomi","Nash","Nasim","Natalie","Nathan","Nathaniel","Nayda","Nehru","Neil","Nell","Nelle","Nerea","Nero","Nevada","Neve","Neville","Nicholas","Nichole","Nicole","Nigel","Nina","Nissim","Nita","Noah","Noble","Noel","Noelani","Noelle","Nola","Nolan","Nomlanga","Nora","Norman","Nyssa","Ocean","Octavia","Octavius","Odessa","Odette","Odysseus","Oleg","Olga","Oliver","Olivia","Olympia","Omar","Oprah","Ora","Oren","Ori","Orla","Orlando","Orli","Orson","Oscar","Otto","Owen","Paki","Palmer","Paloma","Pamela","Pandora","Pascale","Patience","Patricia","Patrick","Paul","Paula","Pearl","Penelope","Perry","Peter","Petra","Phelan","Philip","Phillip","Phoebe","Phyllis","Piper","Plato","Porter","Portia","Prescott","Preston","Price","Priscilla","Quail","Quamar","Quemby","Quentin","Quin","Quincy","Quinlan","Quinn","Quinn","Quintessa","Quon","Quyn","Quynn","Rachel","Rae","Rafael","Rahim","Raja","Rajah","Ralph","Rama","Ramona","Rana","Randall","Raphael","Rashad","Raven","Ray","Raya","Raymond","Reagan","Rebecca","Rebekah","Reece","Reed","Reese","Regan","Regina","Remedios","Renee","Reuben","Rhea","Rhiannon","Rhoda","Rhona","Rhonda","Ria","Richard","Rigel","Riley","Rina","Rinah","Risa","Roanna","Roary","Robert","Robin","Rogan","Ronan","Rooney","Rosalyn","Rose","Ross","Roth","Rowan","Ruby","Rudyard","Russell","Ruth","Ryan","Ryder","Rylee","Sacha","Sade","Sage","Salvador","Samantha","Samson","Samuel","Sandra","Sara","Sarah","Sasha","Savannah","Sawyer","Scarlet","Scarlett","Scott","Sean","Sebastian","Selma","September","Serena","Serina","Seth","Shad","Shaeleigh","Shafira","Shaine","Shana","Shannon","Sharon","Shay","Shea","Sheila","Shelby","Shelley","Shellie","Shelly","Shoshana","Sierra","Signe","Sigourney","Silas","Simon","Simone","Skyler","Slade","Sloane","Solomon","Sonia","Sonya","Sophia","Sopoline","Stacey","Stacy","Steel","Stella","Stephanie","Stephen","Steven","Stewart","Stone","Stuart","Suki","Summer","Susan","Sybil","Sybill","Sydnee","Sydney","Sylvester","Sylvia","TaShya","Tad","Tallulah","Talon","Tamara","Tamekah","Tana","Tanek","Tanisha","Tanner","Tanya","Tara","Tarik","Tasha","Tashya","Tate","Tatiana","Tatum","Tatyana","Taylor","Teagan","Teegan","Thaddeus","Thane","Theodore","Thomas","Thor","Tiger","Timon","Timothy","Tobias","Todd","Travis","Trevor","Troy","Tucker","Tyler","Tyrone","Ulla","Ulric","Ulysses","Uma","Unity","Upton","Uriah","Uriel","Urielle","Ursa","Ursula","Uta","Valentine","Vance","Vanna","Vaughan","Veda","Velma","Venus","Vera","Vernon","Veronica","Victor","Victoria","Vielka","Vincent","Violet","Virginia","Vivian","Vivien","Vladimir","Wade","Walker","Wallace","Walter","Wanda","Wang","Warren","Wayne","Wendy","Wesley","Whilemina","Whitney","Whoopi","Willa","William","Willow","Wilma","Wing","Winifred","Winter","Wyatt","Wylie","Wynne","Wynter","Wyoming","Xander","Xandra","Xantha","Xanthus","Xavier","Xaviera","Xena","Xenos","Xerxes","Xyla","Yael","Yardley","Yasir","Yen","Yeo","Yetta","Yoko","Yolanda","Yoshi","Yoshio","Yuli","Yuri","Yvette","Yvonne","Zachary","Zachery","Zahir","Zane","Zelda","Zelenia","Zena","Zenaida","Zenia","Zeph","Zephania","Zephr","Zeus","Zia","Zoe","Zorita"],Xl=["Abbott","Acevedo","Acosta","Adams","Adkins","Aguilar","Aguirre","Albert","Alexander","Alford","Allen","Allison","Alston","Alvarado","Alvarez","Anderson","Andrews","Anthony","Armstrong","Arnold","Ashley","Atkins","Atkinson","Austin","Avery","Avila","Ayala","Ayers","Bailey","Baird","Baker","Baldwin","Ball","Ballard","Banks","Barber","Barker","Barlow","Barnes","Barnett","Barr","Barrera","Barrett","Barron","Barry","Bartlett","Barton","Bass","Bates","Battle","Bauer","Baxter","Beach","Bean","Beard","Beasley","Beck","Becker","Bell","Bender","Benjamin","Bennett","Benson","Bentley","Benton","Berg","Berger","Bernard","Berry","Best","Bird","Bishop","Black","Blackburn","Blackwell","Blair","Blake","Blanchard","Blankenship","Blevins","Bolton","Bond","Bonner","Booker","Boone","Booth","Bowen","Bowers","Bowman","Boyd","Boyer","Boyle","Bradford","Bradley","Bradshaw","Brady","Branch","Bray","Brennan","Brewer","Bridges","Briggs","Bright","Britt","Brock","Brooks","Brown","Browning","Bruce","Bryan","Bryant","Buchanan","Buck","Buckley","Buckner","Bullock","Burch","Burgess","Burke","Burks","Burnett","Burns","Burris","Burt","Burton","Bush","Butler","Byers","Byrd","Cabrera","Cain","Calderon","Caldwell","Calhoun","Callahan","Camacho","Cameron","Campbell","Campos","Cannon","Cantrell","Cantu","Cardenas","Carey","Carlson","Carney","Carpenter","Carr","Carrillo","Carroll","Carson","Carter","Carver","Case","Casey","Cash","Castaneda","Castillo","Castro","Cervantes","Chambers","Chan","Chandler","Chaney","Chang","Chapman","Charles","Chase","Chavez","Chen","Cherry","Christensen","Christian","Church","Clark","Clarke","Clay","Clayton","Clements","Clemons","Cleveland","Cline","Cobb","Cochran","Coffey","Cohen","Cole","Coleman","Collier","Collins","Colon","Combs","Compton","Conley","Conner","Conrad","Contreras","Conway","Cook","Cooke","Cooley","Cooper","Copeland","Cortez","Cote","Cotton","Cox","Craft","Craig","Crane","Crawford","Crosby","Cross","Cruz","Cummings","Cunningham","Curry","Curtis","Dale","Dalton","Daniel","Daniels","Daugherty","Davenport","David","Davidson","Davis","Dawson","Day","Dean","Decker","Dejesus","Delacruz","Delaney","Deleon","Delgado","Dennis","Diaz","Dickerson","Dickson","Dillard","Dillon","Dixon","Dodson","Dominguez","Donaldson","Donovan","Dorsey","Dotson","Douglas","Downs","Doyle","Drake","Dudley","Duffy","Duke","Duncan","Dunlap","Dunn","Duran","Durham","Dyer","Eaton","Edwards","Elliott","Ellis","Ellison","Emerson","England","English","Erickson","Espinoza","Estes","Estrada","Evans","Everett","Ewing","Farley","Farmer","Farrell","Faulkner","Ferguson","Fernandez","Ferrell","Fields","Figueroa","Finch","Finley","Fischer","Fisher","Fitzgerald","Fitzpatrick","Fleming","Fletcher","Flores","Flowers","Floyd","Flynn","Foley","Forbes","Ford","Foreman","Foster","Fowler","Fox","Francis","Franco","Frank","Franklin","Franks","Frazier","Frederick","Freeman","French","Frost","Fry","Frye","Fuentes","Fuller","Fulton","Gaines","Gallagher","Gallegos","Galloway","Gamble","Garcia","Gardner","Garner","Garrett","Garrison","Garza","Gates","Gay","Gentry","George","Gibbs","Gibson","Gilbert","Giles","Gill","Gillespie","Gilliam","Gilmore","Glass","Glenn","Glover","Goff","Golden","Gomez","Gonzales","Gonzalez","Good","Goodman","Goodwin","Gordon","Gould","Graham","Grant","Graves","Gray","Green","Greene","Greer","Gregory","Griffin","Griffith","Grimes","Gross","Guerra","Guerrero","Guthrie","Gutierrez","Guy","Guzman","Hahn","Hale","Haley","Hall","Hamilton","Hammond","Hampton","Hancock","Haney","Hansen","Hanson","Hardin","Harding","Hardy","Harmon","Harper","Harrell","Harrington","Harris","Harrison","Hart","Hartman","Harvey","Hatfield","Hawkins","Hayden","Hayes","Haynes","Hays","Head","Heath","Hebert","Henderson","Hendricks","Hendrix","Henry","Hensley","Henson","Herman","Hernandez","Herrera","Herring","Hess","Hester","Hewitt","Hickman","Hicks","Higgins","Hill","Hines","Hinton","Hobbs","Hodge","Hodges","Hoffman","Hogan","Holcomb","Holden","Holder","Holland","Holloway","Holman","Holmes","Holt","Hood","Hooper","Hoover","Hopkins","Hopper","Horn","Horne","Horton","House","Houston","Howard","Howe","Howell","Hubbard","Huber","Hudson","Huff","Huffman","Hughes","Hull","Humphrey","Hunt","Hunter","Hurley","Hurst","Hutchinson","Hyde","Ingram","Irwin","Jackson","Jacobs","Jacobson","James","Jarvis","Jefferson","Jenkins","Jennings","Jensen","Jimenez","Johns","Johnson","Johnston","Jones","Jordan","Joseph","Joyce","Joyner","Juarez","Justice","Kane","Kaufman","Keith","Keller","Kelley","Kelly","Kemp","Kennedy","Kent","Kerr","Key","Kidd","Kim","King","Kinney","Kirby","Kirk","Kirkland","Klein","Kline","Knapp","Knight","Knowles","Knox","Koch","Kramer","Lamb","Lambert","Lancaster","Landry","Lane","Lang","Langley","Lara","Larsen","Larson","Lawrence","Lawson","Le","Leach","Leblanc","Lee","Leon","Leonard","Lester","Levine","Levy","Lewis","Lindsay","Lindsey","Little","Livingston","Lloyd","Logan","Long","Lopez","Lott","Love","Lowe","Lowery","Lucas","Luna","Lynch","Lynn","Lyons","Macdonald","Macias","Mack","Madden","Maddox","Maldonado","Malone","Mann","Manning","Marks","Marquez","Marsh","Marshall","Martin","Martinez","Mason","Massey","Mathews","Mathis","Matthews","Maxwell","May","Mayer","Maynard","Mayo","Mays","Mcbride","Mccall","Mccarthy","Mccarty","Mcclain","Mcclure","Mcconnell","Mccormick","Mccoy","Mccray","Mccullough","Mcdaniel","Mcdonald","Mcdowell","Mcfadden","Mcfarland","Mcgee","Mcgowan","Mcguire","Mcintosh","Mcintyre","Mckay","Mckee","Mckenzie","Mckinney","Mcknight","Mclaughlin","Mclean","Mcleod","Mcmahon","Mcmillan","Mcneil","Mcpherson","Meadows","Medina","Mejia","Melendez","Melton","Mendez","Mendoza","Mercado","Mercer","Merrill","Merritt","Meyer","Meyers","Michael","Middleton","Miles","Miller","Mills","Miranda","Mitchell","Molina","Monroe","Montgomery","Montoya","Moody","Moon","Mooney","Moore","Morales","Moran","Moreno","Morgan","Morin","Morris","Morrison","Morrow","Morse","Morton","Moses","Mosley","Moss","Mueller","Mullen","Mullins","Munoz","Murphy","Murray","Myers","Nash","Navarro","Neal","Nelson","Newman","Newton","Nguyen","Nichols","Nicholson","Nielsen","Nieves","Nixon","Noble","Noel","Nolan","Norman","Norris","Norton","Nunez","Obrien","Ochoa","Oconnor","Odom","Odonnell","Oliver","Olsen","Olson","Oneal","Oneil","Oneill","Orr","Ortega","Ortiz","Osborn","Osborne","Owen","Owens","Pace","Pacheco","Padilla","Page","Palmer","Park","Parker","Parks","Parrish","Parsons","Pate","Patel","Patrick","Patterson","Patton","Paul","Payne","Pearson","Peck","Pena","Pennington","Perez","Perkins","Perry","Peters","Petersen","Peterson","Petty","Phelps","Phillips","Pickett","Pierce","Pittman","Pitts","Pollard","Poole","Pope","Porter","Potter","Potts","Powell","Powers","Pratt","Preston","Price","Prince","Pruitt","Puckett","Pugh","Quinn","Ramirez","Ramos","Ramsey","Randall","Randolph","Rasmussen","Ratliff","Ray","Raymond","Reed","Reese","Reeves","Reid","Reilly","Reyes","Reynolds","Rhodes","Rice","Rich","Richard","Richards","Richardson","Richmond","Riddle","Riggs","Riley","Rios","Rivas","Rivera","Rivers","Roach","Robbins","Roberson","Roberts","Robertson","Robinson","Robles","Rocha","Rodgers","Rodriguez","Rodriquez","Rogers","Rojas","Rollins","Roman","Romero","Rosa","Rosales","Rosario","Rose","Ross","Roth","Rowe","Rowland","Roy","Ruiz","Rush","Russell","Russo","Rutledge","Ryan","Salas","Salazar","Salinas","Sampson","Sanchez","Sanders","Sandoval","Sanford","Santana","Santiago","Santos","Sargent","Saunders","Savage","Sawyer","Schmidt","Schneider","Schroeder","Schultz","Schwartz","Scott","Sears","Sellers","Serrano","Sexton","Shaffer","Shannon","Sharp","Sharpe","Shaw","Shelton","Shepard","Shepherd","Sheppard","Sherman","Shields","Short","Silva","Simmons","Simon","Simpson","Sims","Singleton","Skinner","Slater","Sloan","Small","Smith","Snider","Snow","Snyder","Solis","Solomon","Sosa","Soto","Sparks","Spears","Spence","Spencer","Stafford","Stanley","Stanton","Stark","Steele","Stein","Stephens","Stephenson","Stevens","Stevenson","Stewart","Stokes","Stone","Stout","Strickland","Strong","Stuart","Suarez","Sullivan","Summers","Sutton","Swanson","Sweeney","Sweet","Sykes","Talley","Tanner","Tate","Taylor","Terrell","Terry","Thomas","Thompson","Thornton","Tillman","Todd","Torres","Townsend","Tran","Travis","Trevino","Trujillo","Tucker","Turner","Tyler","Tyson","Underwood","Valdez","Valencia","Valentine","Valenzuela","Vance","Vang","Vargas","Vasquez","Vaughan","Vaughn","Vazquez","Vega","Velasquez","Velazquez","Velez","Villarreal","Vincent","Vinson","Wade","Wagner","Walker","Wall","Wallace","Waller","Walls","Walsh","Walter","Walters","Walton","Ward","Ware","Warner","Warren","Washington","Waters","Watkins","Watson","Watts","Weaver","Webb","Weber","Webster","Weeks","Weiss","Welch","Wells","West","Wheeler","Whitaker","White","Whitehead","Whitfield","Whitley","Whitney","Wiggins","Wilcox","Wilder","Wiley","Wilkerson","Wilkins","Wilkinson","William","Williams","Williamson","Willis","Wilson","Winters","Wise","Witt","Wolf","Wolfe","Wong","Wood","Woodard","Woods","Woodward","Wooten","Workman","Wright","Wyatt","Wynn","Yang","Yates","York","Young","Zamora","Zimmerman"],Zl=["Inc","Plc","LLC","Traders","Associates","Trading","Co"],eu=[".com",".net",".org",".info",".biz",".co.uk",".org.uk",".me.uk",".in",".us",".me",".co",".ca",".cc",".mobi",".com.au",".org.au",".tv",".ws",".cm"],Zt=["b","c","d","f","g","h","j","k","l","m","n","p","q","r","s","t","v","w","x","z"],en=["a","e","i","o","u","y"],or=["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];for(var Te=[],la=0;la<256;++la)Te.push((la+256).toString(16).slice(1));function oy(n,e=0){return(Te[n[e+0]]+Te[n[e+1]]+Te[n[e+2]]+Te[n[e+3]]+"-"+Te[n[e+4]]+Te[n[e+5]]+"-"+Te[n[e+6]]+Te[n[e+7]]+"-"+Te[n[e+8]]+Te[n[e+9]]+"-"+Te[n[e+10]]+Te[n[e+11]]+Te[n[e+12]]+Te[n[e+13]]+Te[n[e+14]]+Te[n[e+15]]).toLowerCase()}var Ii,ly=new Uint8Array(16);function uy(){if(!Ii&&(Ii=typeof crypto<"u"&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto),!Ii))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return Ii(ly)}var hy=typeof crypto<"u"&&crypto.randomUUID&&crypto.randomUUID.bind(crypto);const tu={randomUUID:hy};function cy(n,e,t){if(tu.randomUUID&&!e&&!n)return tu.randomUUID();n=n||{};var r=n.random||(n.rng||uy)();return r[6]=r[6]&15|64,r[8]=r[8]&63|128,oy(r)}/**
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
 */const nu=function(n){const e=[];let t=0;for(let r=0;r<n.length;r++){let i=n.charCodeAt(r);i<128?e[t++]=i:i<2048?(e[t++]=i>>6|192,e[t++]=i&63|128):(i&64512)===55296&&r+1<n.length&&(n.charCodeAt(r+1)&64512)===56320?(i=65536+((i&1023)<<10)+(n.charCodeAt(++r)&1023),e[t++]=i>>18|240,e[t++]=i>>12&63|128,e[t++]=i>>6&63|128,e[t++]=i&63|128):(e[t++]=i>>12|224,e[t++]=i>>6&63|128,e[t++]=i&63|128)}return e},dy=function(n){const e=[];let t=0,r=0;for(;t<n.length;){const i=n[t++];if(i<128)e[r++]=String.fromCharCode(i);else if(i>191&&i<224){const s=n[t++];e[r++]=String.fromCharCode((i&31)<<6|s&63)}else if(i>239&&i<365){const s=n[t++],o=n[t++],u=n[t++],c=((i&7)<<18|(s&63)<<12|(o&63)<<6|u&63)-65536;e[r++]=String.fromCharCode(55296+(c>>10)),e[r++]=String.fromCharCode(56320+(c&1023))}else{const s=n[t++],o=n[t++];e[r++]=String.fromCharCode((i&15)<<12|(s&63)<<6|o&63)}}return e.join("")},ru={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let i=0;i<n.length;i+=3){const s=n[i],o=i+1<n.length,u=o?n[i+1]:0,c=i+2<n.length,d=c?n[i+2]:0,m=s>>2,T=(s&3)<<4|u>>4;let S=(u&15)<<2|d>>6,R=d&63;c||(R=64,o||(S=64)),r.push(t[m],t[T],t[S],t[R])}return r.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(nu(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):dy(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let i=0;i<n.length;){const s=t[n.charAt(i++)],u=i<n.length?t[n.charAt(i)]:0;++i;const d=i<n.length?t[n.charAt(i)]:64;++i;const T=i<n.length?t[n.charAt(i)]:64;if(++i,s==null||u==null||d==null||T==null)throw new fy;const S=s<<2|u>>4;if(r.push(S),d!==64){const R=u<<4&240|d>>2;if(r.push(R),T!==64){const O=d<<6&192|T;r.push(O)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class fy extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const my=function(n){const e=nu(n);return ru.encodeByteArray(e,!0)},Ai=function(n){return my(n).replace(/\./g,"")},iu=function(n){try{return ru.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
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
 */function py(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
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
 */const gy=()=>py().__FIREBASE_DEFAULTS__,yy=()=>{if(typeof process>"u"||typeof process.env>"u")return;const n=process.env.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},_y=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&iu(n[1]);return e&&JSON.parse(e)},ua=()=>{try{return gy()||yy()||_y()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},su=n=>{var e,t;return(t=(e=ua())===null||e===void 0?void 0:e.emulatorHosts)===null||t===void 0?void 0:t[n]},vy=n=>{const e=su(n);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const r=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),r]:[e.substring(0,t),r]},au=()=>{var n;return(n=ua())===null||n===void 0?void 0:n.config};/**
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
 */class wy{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,r)=>{t?this.reject(t):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,r))}}}/**
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
 */function Ey(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},r=e||"demo-project",i=n.iat||0,s=n.sub||n.user_id;if(!s)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o=Object.assign({iss:`https://securetoken.google.com/${r}`,aud:r,iat:i,exp:i+3600,auth_time:i,sub:s,user_id:s,firebase:{sign_in_provider:"custom",identities:{}}},n);return[Ai(JSON.stringify(t)),Ai(JSON.stringify(o)),""].join(".")}/**
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
 */function Xe(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Ty(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(Xe())}function Iy(){var n;const e=(n=ua())===null||n===void 0?void 0:n.forceEnvironment;if(e==="node")return!0;if(e==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function Ay(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function Sy(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function Cy(){return!Iy()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function by(){try{return typeof indexedDB=="object"}catch{return!1}}function Ry(){return new Promise((n,e)=>{try{let t=!0;const r="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(r);i.onsuccess=()=>{i.result.close(),t||self.indexedDB.deleteDatabase(r),n(!0)},i.onupgradeneeded=()=>{t=!1},i.onerror=()=>{var s;e(((s=i.error)===null||s===void 0?void 0:s.message)||"")}}catch(t){e(t)}})}/**
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
 */const ky="FirebaseError";class Pt extends Error{constructor(e,t,r){super(t),this.code=e,this.customData=r,this.name=ky,Object.setPrototypeOf(this,Pt.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,lr.prototype.create)}}class lr{constructor(e,t,r){this.service=e,this.serviceName=t,this.errors=r}create(e,...t){const r=t[0]||{},i=`${this.service}/${e}`,s=this.errors[e],o=s?Py(s,r):"Error",u=`${this.serviceName}: ${o} (${i}).`;return new Pt(i,u,r)}}function Py(n,e){return n.replace(Dy,(t,r)=>{const i=e[r];return i!=null?String(i):`<${r}?>`})}const Dy=/\{\$([^}]+)}/g;function Si(n,e){if(n===e)return!0;const t=Object.keys(n),r=Object.keys(e);for(const i of t){if(!r.includes(i))return!1;const s=n[i],o=e[i];if(ou(s)&&ou(o)){if(!Si(s,o))return!1}else if(s!==o)return!1}for(const i of r)if(!t.includes(i))return!1;return!0}function ou(n){return n!==null&&typeof n=="object"}/**
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
 */function lu(n){const e=[];for(const[t,r]of Object.entries(n))Array.isArray(r)?r.forEach(i=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(i))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function My(n,e){const t=new Ny(n,e);return t.subscribe.bind(t)}class Ny{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,r){let i;if(e===void 0&&t===void 0&&r===void 0)throw new Error("Missing Observer.");Oy(e,["next","error","complete"])?i=e:i={next:e,error:t,complete:r},i.next===void 0&&(i.next=ha),i.error===void 0&&(i.error=ha),i.complete===void 0&&(i.complete=ha);const s=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?i.error(this.finalError):i.complete()}catch{}}),this.observers.push(i),s}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function Oy(n,e){if(typeof n!="object"||n===null)return!1;for(const t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function ha(){}/**
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
 */function Dt(n){return n&&n._delegate?n._delegate:n}class tn{constructor(e,t,r){this.name=e,this.instanceFactory=t,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
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
 */const nn="[DEFAULT]";/**
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
 */class Vy{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const r=new wy;if(this.instancesDeferred.set(t,r),this.isInitialized(t)||this.shouldAutoInitialize())try{const i=this.getOrInitializeService({instanceIdentifier:t});i&&r.resolve(i)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){var t;const r=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),i=(t=e==null?void 0:e.optional)!==null&&t!==void 0?t:!1;if(this.isInitialized(r)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:r})}catch(s){if(i)return null;throw s}else{if(i)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(xy(e))try{this.getOrInitializeService({instanceIdentifier:nn})}catch{}for(const[t,r]of this.instancesDeferred.entries()){const i=this.normalizeInstanceIdentifier(t);try{const s=this.getOrInitializeService({instanceIdentifier:i});r.resolve(s)}catch{}}}}clearInstance(e=nn){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=nn){return this.instances.has(e)}getOptions(e=nn){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const i=this.getOrInitializeService({instanceIdentifier:r,options:t});for(const[s,o]of this.instancesDeferred.entries()){const u=this.normalizeInstanceIdentifier(s);r===u&&o.resolve(i)}return i}onInit(e,t){var r;const i=this.normalizeInstanceIdentifier(t),s=(r=this.onInitCallbacks.get(i))!==null&&r!==void 0?r:new Set;s.add(e),this.onInitCallbacks.set(i,s);const o=this.instances.get(i);return o&&e(o,i),()=>{s.delete(e)}}invokeOnInitCallbacks(e,t){const r=this.onInitCallbacks.get(t);if(r)for(const i of r)try{i(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:Ly(e),options:t}),this.instances.set(e,r),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=nn){return this.component?this.component.multipleInstances?e:nn:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function Ly(n){return n===nn?void 0:n}function xy(n){return n.instantiationMode==="EAGER"}/**
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
 */class Fy{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new Vy(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
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
 */var z;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(z||(z={}));const Uy={debug:z.DEBUG,verbose:z.VERBOSE,info:z.INFO,warn:z.WARN,error:z.ERROR,silent:z.SILENT},By=z.INFO,Hy={[z.DEBUG]:"log",[z.VERBOSE]:"log",[z.INFO]:"info",[z.WARN]:"warn",[z.ERROR]:"error"},Wy=(n,e,...t)=>{if(e<n.logLevel)return;const r=new Date().toISOString(),i=Hy[e];if(i)console[i](`[${r}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class ca{constructor(e){this.name=e,this._logLevel=By,this._logHandler=Wy,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in z))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?Uy[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,z.DEBUG,...e),this._logHandler(this,z.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,z.VERBOSE,...e),this._logHandler(this,z.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,z.INFO,...e),this._logHandler(this,z.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,z.WARN,...e),this._logHandler(this,z.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,z.ERROR,...e),this._logHandler(this,z.ERROR,...e)}}const Yy=(n,e)=>e.some(t=>n instanceof t);let uu,hu;function zy(){return uu||(uu=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Gy(){return hu||(hu=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const cu=new WeakMap,da=new WeakMap,du=new WeakMap,fa=new WeakMap,ma=new WeakMap;function qy(n){const e=new Promise((t,r)=>{const i=()=>{n.removeEventListener("success",s),n.removeEventListener("error",o)},s=()=>{t(Mt(n.result)),i()},o=()=>{r(n.error),i()};n.addEventListener("success",s),n.addEventListener("error",o)});return e.then(t=>{t instanceof IDBCursor&&cu.set(t,n)}).catch(()=>{}),ma.set(e,n),e}function $y(n){if(da.has(n))return;const e=new Promise((t,r)=>{const i=()=>{n.removeEventListener("complete",s),n.removeEventListener("error",o),n.removeEventListener("abort",o)},s=()=>{t(),i()},o=()=>{r(n.error||new DOMException("AbortError","AbortError")),i()};n.addEventListener("complete",s),n.addEventListener("error",o),n.addEventListener("abort",o)});da.set(n,e)}let pa={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return da.get(n);if(e==="objectStoreNames")return n.objectStoreNames||du.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return Mt(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function jy(n){pa=n(pa)}function Ky(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const r=n.call(ga(this),e,...t);return du.set(r,e.sort?e.sort():[e]),Mt(r)}:Gy().includes(n)?function(...e){return n.apply(ga(this),e),Mt(cu.get(this))}:function(...e){return Mt(n.apply(ga(this),e))}}function Qy(n){return typeof n=="function"?Ky(n):(n instanceof IDBTransaction&&$y(n),Yy(n,zy())?new Proxy(n,pa):n)}function Mt(n){if(n instanceof IDBRequest)return qy(n);if(fa.has(n))return fa.get(n);const e=Qy(n);return e!==n&&(fa.set(n,e),ma.set(e,n)),e}const ga=n=>ma.get(n);function Jy(n,e,{blocked:t,upgrade:r,blocking:i,terminated:s}={}){const o=indexedDB.open(n,e),u=Mt(o);return r&&o.addEventListener("upgradeneeded",c=>{r(Mt(o.result),c.oldVersion,c.newVersion,Mt(o.transaction),c)}),t&&o.addEventListener("blocked",c=>t(c.oldVersion,c.newVersion,c)),u.then(c=>{s&&c.addEventListener("close",()=>s()),i&&c.addEventListener("versionchange",d=>i(d.oldVersion,d.newVersion,d))}).catch(()=>{}),u}const Xy=["get","getKey","getAll","getAllKeys","count"],Zy=["put","add","delete","clear"],ya=new Map;function fu(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(ya.get(e))return ya.get(e);const t=e.replace(/FromIndex$/,""),r=e!==t,i=Zy.includes(t);if(!(t in(r?IDBIndex:IDBObjectStore).prototype)||!(i||Xy.includes(t)))return;const s=async function(o,...u){const c=this.transaction(o,i?"readwrite":"readonly");let d=c.store;return r&&(d=d.index(u.shift())),(await Promise.all([d[t](...u),i&&c.done]))[0]};return ya.set(e,s),s}jy(n=>({...n,get:(e,t,r)=>fu(e,t)||n.get(e,t,r),has:(e,t)=>!!fu(e,t)||n.has(e,t)}));/**
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
 */class e_{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(t_(t)){const r=t.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(t=>t).join(" ")}}function t_(n){const e=n.getComponent();return(e==null?void 0:e.type)==="VERSION"}const _a="@firebase/app",mu="0.10.8";/**
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
 */const rn=new ca("@firebase/app"),n_="@firebase/app-compat",r_="@firebase/analytics-compat",i_="@firebase/analytics",s_="@firebase/app-check-compat",a_="@firebase/app-check",o_="@firebase/auth",l_="@firebase/auth-compat",u_="@firebase/database",h_="@firebase/database-compat",c_="@firebase/functions",d_="@firebase/functions-compat",f_="@firebase/installations",m_="@firebase/installations-compat",p_="@firebase/messaging",g_="@firebase/messaging-compat",y_="@firebase/performance",__="@firebase/performance-compat",v_="@firebase/remote-config",w_="@firebase/remote-config-compat",E_="@firebase/storage",T_="@firebase/storage-compat",I_="@firebase/firestore",A_="@firebase/vertexai-preview",S_="@firebase/firestore-compat",C_="firebase",b_="10.12.5";/**
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
 */const va="[DEFAULT]",R_={[_a]:"fire-core",[n_]:"fire-core-compat",[i_]:"fire-analytics",[r_]:"fire-analytics-compat",[a_]:"fire-app-check",[s_]:"fire-app-check-compat",[o_]:"fire-auth",[l_]:"fire-auth-compat",[u_]:"fire-rtdb",[h_]:"fire-rtdb-compat",[c_]:"fire-fn",[d_]:"fire-fn-compat",[f_]:"fire-iid",[m_]:"fire-iid-compat",[p_]:"fire-fcm",[g_]:"fire-fcm-compat",[y_]:"fire-perf",[__]:"fire-perf-compat",[v_]:"fire-rc",[w_]:"fire-rc-compat",[E_]:"fire-gcs",[T_]:"fire-gcs-compat",[I_]:"fire-fst",[S_]:"fire-fst-compat",[A_]:"fire-vertex","fire-js":"fire-js",[C_]:"fire-js-all"};/**
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
 */const Ci=new Map,k_=new Map,wa=new Map;function pu(n,e){try{n.container.addComponent(e)}catch(t){rn.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function Cn(n){const e=n.name;if(wa.has(e))return rn.debug(`There were multiple attempts to register component ${e}.`),!1;wa.set(e,n);for(const t of Ci.values())pu(t,n);for(const t of k_.values())pu(t,n);return!0}function Ea(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function ur(n){return n.settings!==void 0}/**
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
 */const P_={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Nt=new lr("app","Firebase",P_);/**
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
 */class D_{constructor(e,t,r){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},t),this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new tn("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw Nt.create("app-deleted",{appName:this._name})}}/**
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
 */const bi=b_;function gu(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const r=Object.assign({name:va,automaticDataCollectionEnabled:!1},e),i=r.name;if(typeof i!="string"||!i)throw Nt.create("bad-app-name",{appName:String(i)});if(t||(t=au()),!t)throw Nt.create("no-options");const s=Ci.get(i);if(s){if(Si(t,s.options)&&Si(r,s.config))return s;throw Nt.create("duplicate-app",{appName:i})}const o=new Fy(i);for(const c of wa.values())o.addComponent(c);const u=new D_(t,r,o);return Ci.set(i,u),u}function yu(n=va){const e=Ci.get(n);if(!e&&n===va&&au())return gu();if(!e)throw Nt.create("no-app",{appName:n});return e}function Ot(n,e,t){var r;let i=(r=R_[n])!==null&&r!==void 0?r:n;t&&(i+=`-${t}`);const s=i.match(/\s|\//),o=e.match(/\s|\//);if(s||o){const u=[`Unable to register library "${i}" with version "${e}":`];s&&u.push(`library name "${i}" contains illegal characters (whitespace or "/")`),s&&o&&u.push("and"),o&&u.push(`version name "${e}" contains illegal characters (whitespace or "/")`),rn.warn(u.join(" "));return}Cn(new tn(`${i}-version`,()=>({library:i,version:e}),"VERSION"))}/**
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
 */const M_="firebase-heartbeat-database",N_=1,hr="firebase-heartbeat-store";let Ta=null;function _u(){return Ta||(Ta=Jy(M_,N_,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(hr)}catch(t){console.warn(t)}}}}).catch(n=>{throw Nt.create("idb-open",{originalErrorMessage:n.message})})),Ta}async function O_(n){try{const t=(await _u()).transaction(hr),r=await t.objectStore(hr).get(wu(n));return await t.done,r}catch(e){if(e instanceof Pt)rn.warn(e.message);else{const t=Nt.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});rn.warn(t.message)}}}async function vu(n,e){try{const r=(await _u()).transaction(hr,"readwrite");await r.objectStore(hr).put(e,wu(n)),await r.done}catch(t){if(t instanceof Pt)rn.warn(t.message);else{const r=Nt.create("idb-set",{originalErrorMessage:t==null?void 0:t.message});rn.warn(r.message)}}}function wu(n){return`${n.name}!${n.options.appId}`}/**
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
 */const V_=1024,L_=30*24*60*60*1e3;class x_{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new U_(t),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var e,t;const i=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),s=Eu();if(!(((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null))&&!(this._heartbeatsCache.lastSentHeartbeatDate===s||this._heartbeatsCache.heartbeats.some(o=>o.date===s)))return this._heartbeatsCache.heartbeats.push({date:s,agent:i}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(o=>{const u=new Date(o.date).valueOf();return Date.now()-u<=L_}),this._storage.overwrite(this._heartbeatsCache)}async getHeartbeatsHeader(){var e;if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const t=Eu(),{heartbeatsToSend:r,unsentEntries:i}=F_(this._heartbeatsCache.heartbeats),s=Ai(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=t,i.length>0?(this._heartbeatsCache.heartbeats=i,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),s}}function Eu(){return new Date().toISOString().substring(0,10)}function F_(n,e=V_){const t=[];let r=n.slice();for(const i of n){const s=t.find(o=>o.agent===i.agent);if(s){if(s.dates.push(i.date),Tu(t)>e){s.dates.pop();break}}else if(t.push({agent:i.agent,dates:[i.date]}),Tu(t)>e){t.pop();break}r=r.slice(1)}return{heartbeatsToSend:t,unsentEntries:r}}class U_{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return by()?Ry().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await O_(this.app);return t!=null&&t.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var t;if(await this._canUseIndexedDBPromise){const i=await this.read();return vu(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:i.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var t;if(await this._canUseIndexedDBPromise){const i=await this.read();return vu(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:i.lastSentHeartbeatDate,heartbeats:[...i.heartbeats,...e.heartbeats]})}else return}}function Tu(n){return Ai(JSON.stringify({version:2,heartbeats:n})).length}/**
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
 */function B_(n){Cn(new tn("platform-logger",e=>new e_(e),"PRIVATE")),Cn(new tn("heartbeat",e=>new x_(e),"PRIVATE")),Ot(_a,mu,n),Ot(_a,mu,"esm2017"),Ot("fire-js","")}B_("");var H_="firebase",W_="10.12.5";/**
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
 */Ot(H_,W_,"app");function Iu(n,e){var t={};for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&e.indexOf(r)<0&&(t[r]=n[r]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,r=Object.getOwnPropertySymbols(n);i<r.length;i++)e.indexOf(r[i])<0&&Object.prototype.propertyIsEnumerable.call(n,r[i])&&(t[r[i]]=n[r[i]]);return t}typeof SuppressedError=="function"&&SuppressedError;function Au(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const Y_=Au,Su=new lr("auth","Firebase",Au());/**
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
 */const Ri=new ca("@firebase/auth");function z_(n,...e){Ri.logLevel<=z.WARN&&Ri.warn(`Auth (${bi}): ${n}`,...e)}function ki(n,...e){Ri.logLevel<=z.ERROR&&Ri.error(`Auth (${bi}): ${n}`,...e)}/**
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
 */function Ia(n,...e){throw Aa(n,...e)}function Cu(n,...e){return Aa(n,...e)}function bu(n,e,t){const r=Object.assign(Object.assign({},Y_()),{[e]:t});return new lr("auth","Firebase",r).create(e,{appName:n.name})}function Pi(n){return bu(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function Aa(n,...e){if(typeof n!="string"){const t=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=n.name),n._errorFactory.create(t,...r)}return Su.create(n,...e)}function j(n,e,...t){if(!n)throw Aa(e,...t)}function cr(n){const e="INTERNAL ASSERTION FAILED: "+n;throw ki(e),new Error(e)}function Di(n,e){n||cr(e)}function G_(){return Ru()==="http:"||Ru()==="https:"}function Ru(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.protocol)||null}/**
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
 */function q_(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(G_()||Ay()||"connection"in navigator)?navigator.onLine:!0}function $_(){if(typeof navigator>"u")return null;const n=navigator;return n.languages&&n.languages[0]||n.language||null}/**
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
 */class j_{constructor(e,t){this.shortDelay=e,this.longDelay=t,Di(t>e,"Short delay should be less than long delay!"),this.isMobile=Ty()||Sy()}get(){return q_()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
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
 */function K_(n,e){Di(n.emulator,"Emulator should always be set here");const{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
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
 */class ku{static initialize(e,t,r){this.fetchImpl=e,t&&(this.headersImpl=t),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;cr("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;cr("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;cr("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
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
 */const Q_={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
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
 */const J_=new j_(3e4,6e4);function Pu(n,e){return n.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:n.tenantId}):e}async function Mi(n,e,t,r,i={}){return Du(n,i,async()=>{let s={},o={};r&&(e==="GET"?o=r:s={body:JSON.stringify(r)});const u=lu(Object.assign({key:n.config.apiKey},o)).slice(1),c=await n._getAdditionalHeaders();return c["Content-Type"]="application/json",n.languageCode&&(c["X-Firebase-Locale"]=n.languageCode),ku.fetch()(Mu(n,n.config.apiHost,t,u),Object.assign({method:e,headers:c,referrerPolicy:"no-referrer"},s))})}async function Du(n,e,t){n._canInitEmulator=!1;const r=Object.assign(Object.assign({},Q_),e);try{const i=new X_(n),s=await Promise.race([t(),i.promise]);i.clearNetworkTimeout();const o=await s.json();if("needConfirmation"in o)throw Ni(n,"account-exists-with-different-credential",o);if(s.ok&&!("errorMessage"in o))return o;{const u=s.ok?o.errorMessage:o.error.message,[c,d]=u.split(" : ");if(c==="FEDERATED_USER_ID_ALREADY_LINKED")throw Ni(n,"credential-already-in-use",o);if(c==="EMAIL_EXISTS")throw Ni(n,"email-already-in-use",o);if(c==="USER_DISABLED")throw Ni(n,"user-disabled",o);const m=r[c]||c.toLowerCase().replace(/[_\s]+/g,"-");if(d)throw bu(n,m,d);Ia(n,m)}}catch(i){if(i instanceof Pt)throw i;Ia(n,"network-request-failed",{message:String(i)})}}function Mu(n,e,t,r){const i=`${e}${t}?${r}`;return n.config.emulator?K_(n.config,i):`${n.config.apiScheme}://${i}`}class X_{constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,r)=>{this.timer=setTimeout(()=>r(Cu(this.auth,"network-request-failed")),J_.get())})}clearNetworkTimeout(){clearTimeout(this.timer)}}function Ni(n,e,t){const r={appName:n.name};t.email&&(r.email=t.email),t.phoneNumber&&(r.phoneNumber=t.phoneNumber);const i=Cu(n,e,r);return i.customData._tokenResponse=t,i}/**
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
 */async function Z_(n,e){return Mi(n,"POST","/v1/accounts:delete",e)}async function Nu(n,e){return Mi(n,"POST","/v1/accounts:lookup",e)}/**
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
 */function dr(n){if(n)try{const e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function ev(n,e=!1){const t=Dt(n),r=await t.getIdToken(e),i=Ou(r);j(i&&i.exp&&i.auth_time&&i.iat,t.auth,"internal-error");const s=typeof i.firebase=="object"?i.firebase:void 0,o=s==null?void 0:s.sign_in_provider;return{claims:i,token:r,authTime:dr(Sa(i.auth_time)),issuedAtTime:dr(Sa(i.iat)),expirationTime:dr(Sa(i.exp)),signInProvider:o||null,signInSecondFactor:(s==null?void 0:s.sign_in_second_factor)||null}}function Sa(n){return Number(n)*1e3}function Ou(n){const[e,t,r]=n.split(".");if(e===void 0||t===void 0||r===void 0)return ki("JWT malformed, contained fewer than 3 sections"),null;try{const i=iu(t);return i?JSON.parse(i):(ki("Failed to decode base64 JWT payload"),null)}catch(i){return ki("Caught error parsing JWT payload as JSON",i==null?void 0:i.toString()),null}}function Vu(n){const e=Ou(n);return j(e,"internal-error"),j(typeof e.exp<"u","internal-error"),j(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
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
 */async function Ca(n,e,t=!1){if(t)return e;try{return await e}catch(r){throw r instanceof Pt&&tv(r)&&n.auth.currentUser===n&&await n.auth.signOut(),r}}function tv({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}/**
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
 */class nv{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var t;if(e){const r=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),r}else{this.errorBackoff=3e4;const i=((t=this.user.stsTokenManager.expirationTime)!==null&&t!==void 0?t:0)-Date.now()-3e5;return Math.max(0,i)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
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
 */class ba{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=dr(this.lastLoginAt),this.creationTime=dr(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
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
 */async function Oi(n){var e;const t=n.auth,r=await n.getIdToken(),i=await Ca(n,Nu(t,{idToken:r}));j(i==null?void 0:i.users.length,t,"internal-error");const s=i.users[0];n._notifyReloadListener(s);const o=!((e=s.providerUserInfo)===null||e===void 0)&&e.length?Lu(s.providerUserInfo):[],u=iv(n.providerData,o),c=n.isAnonymous,d=!(n.email&&s.passwordHash)&&!(u!=null&&u.length),m=c?d:!1,T={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:u,metadata:new ba(s.createdAt,s.lastLoginAt),isAnonymous:m};Object.assign(n,T)}async function rv(n){const e=Dt(n);await Oi(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function iv(n,e){return[...n.filter(r=>!e.some(i=>i.providerId===r.providerId)),...e]}function Lu(n){return n.map(e=>{var{providerId:t}=e,r=Iu(e,["providerId"]);return{providerId:t,uid:r.rawId||"",displayName:r.displayName||null,email:r.email||null,phoneNumber:r.phoneNumber||null,photoURL:r.photoUrl||null}})}/**
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
 */async function sv(n,e){const t=await Du(n,{},async()=>{const r=lu({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:i,apiKey:s}=n.config,o=Mu(n,i,"/v1/token",`key=${s}`),u=await n._getAdditionalHeaders();return u["Content-Type"]="application/x-www-form-urlencoded",ku.fetch()(o,{method:"POST",headers:u,body:r})});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function av(n,e){return Mi(n,"POST","/v2/accounts:revokeToken",Pu(n,e))}/**
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
 */class bn{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){j(e.idToken,"internal-error"),j(typeof e.idToken<"u","internal-error"),j(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):Vu(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){j(e.length!==0,"internal-error");const t=Vu(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(j(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:r,refreshToken:i,expiresIn:s}=await sv(e,t);this.updateTokensAndExpiration(r,i,Number(s))}updateTokensAndExpiration(e,t,r){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,t){const{refreshToken:r,accessToken:i,expirationTime:s}=t,o=new bn;return r&&(j(typeof r=="string","internal-error",{appName:e}),o.refreshToken=r),i&&(j(typeof i=="string","internal-error",{appName:e}),o.accessToken=i),s&&(j(typeof s=="number","internal-error",{appName:e}),o.expirationTime=s),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new bn,this.toJSON())}_performRefresh(){return cr("not implemented")}}/**
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
 */function Vt(n,e){j(typeof n=="string"||typeof n>"u","internal-error",{appName:e})}class Lt{constructor(e){var{uid:t,auth:r,stsTokenManager:i}=e,s=Iu(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new nv(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=t,this.auth=r,this.stsTokenManager=i,this.accessToken=i.accessToken,this.displayName=s.displayName||null,this.email=s.email||null,this.emailVerified=s.emailVerified||!1,this.phoneNumber=s.phoneNumber||null,this.photoURL=s.photoURL||null,this.isAnonymous=s.isAnonymous||!1,this.tenantId=s.tenantId||null,this.providerData=s.providerData?[...s.providerData]:[],this.metadata=new ba(s.createdAt||void 0,s.lastLoginAt||void 0)}async getIdToken(e){const t=await Ca(this,this.stsTokenManager.getToken(this.auth,e));return j(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return ev(this,e)}reload(){return rv(this)}_assign(e){this!==e&&(j(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>Object.assign({},t)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new Lt(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return t.metadata._copy(this.metadata),t}_onReload(e){j(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),t&&await Oi(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(ur(this.auth.app))return Promise.reject(Pi(this.auth));const e=await this.getIdToken();return await Ca(this,Z_(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){var r,i,s,o,u,c,d,m;const T=(r=t.displayName)!==null&&r!==void 0?r:void 0,S=(i=t.email)!==null&&i!==void 0?i:void 0,R=(s=t.phoneNumber)!==null&&s!==void 0?s:void 0,O=(o=t.photoURL)!==null&&o!==void 0?o:void 0,x=(u=t.tenantId)!==null&&u!==void 0?u:void 0,M=(c=t._redirectEventId)!==null&&c!==void 0?c:void 0,te=(d=t.createdAt)!==null&&d!==void 0?d:void 0,oe=(m=t.lastLoginAt)!==null&&m!==void 0?m:void 0,{uid:ie,emailVerified:me,isAnonymous:qe,providerData:pe,stsTokenManager:v}=t;j(ie&&v,e,"internal-error");const p=bn.fromJSON(this.name,v);j(typeof ie=="string",e,"internal-error"),Vt(T,e.name),Vt(S,e.name),j(typeof me=="boolean",e,"internal-error"),j(typeof qe=="boolean",e,"internal-error"),Vt(R,e.name),Vt(O,e.name),Vt(x,e.name),Vt(M,e.name),Vt(te,e.name),Vt(oe,e.name);const y=new Lt({uid:ie,auth:e,email:S,emailVerified:me,displayName:T,isAnonymous:qe,photoURL:O,phoneNumber:R,tenantId:x,stsTokenManager:p,createdAt:te,lastLoginAt:oe});return pe&&Array.isArray(pe)&&(y.providerData=pe.map(_=>Object.assign({},_))),M&&(y._redirectEventId=M),y}static async _fromIdTokenResponse(e,t,r=!1){const i=new bn;i.updateFromServerResponse(t);const s=new Lt({uid:t.localId,auth:e,stsTokenManager:i,isAnonymous:r});return await Oi(s),s}static async _fromGetAccountInfoResponse(e,t,r){const i=t.users[0];j(i.localId!==void 0,"internal-error");const s=i.providerUserInfo!==void 0?Lu(i.providerUserInfo):[],o=!(i.email&&i.passwordHash)&&!(s!=null&&s.length),u=new bn;u.updateFromIdToken(r);const c=new Lt({uid:i.localId,auth:e,stsTokenManager:u,isAnonymous:o}),d={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:s,metadata:new ba(i.createdAt,i.lastLoginAt),isAnonymous:!(i.email&&i.passwordHash)&&!(s!=null&&s.length)};return Object.assign(c,d),c}}/**
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
 */const xu=new Map;function sn(n){Di(n instanceof Function,"Expected a class definition");let e=xu.get(n);return e?(Di(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,xu.set(n,e),e)}/**
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
 */class Fu{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}Fu.type="NONE";const Uu=Fu;/**
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
 */function Ra(n,e,t){return`firebase:${n}:${e}:${t}`}class Rn{constructor(e,t,r){this.persistence=e,this.auth=t,this.userKey=r;const{config:i,name:s}=this.auth;this.fullUserKey=Ra(this.userKey,i.apiKey,s),this.fullPersistenceKey=Ra("persistence",i.apiKey,s),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);return e?Lt._fromJSON(this.auth,e):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,r="authUser"){if(!t.length)return new Rn(sn(Uu),e,r);const i=(await Promise.all(t.map(async d=>{if(await d._isAvailable())return d}))).filter(d=>d);let s=i[0]||sn(Uu);const o=Ra(r,e.config.apiKey,e.name);let u=null;for(const d of t)try{const m=await d._get(o);if(m){const T=Lt._fromJSON(e,m);d!==s&&(u=T),s=d;break}}catch{}const c=i.filter(d=>d._shouldAllowMigration);return!s._shouldAllowMigration||!c.length?new Rn(s,e,r):(s=c[0],u&&await s._set(o,u.toJSON()),await Promise.all(t.map(async d=>{if(d!==s)try{await d._remove(o)}catch{}})),new Rn(s,e,r))}}/**
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
 */function Bu(n){const e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(hv(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(ov(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(dv(e))return"Blackberry";if(fv(e))return"Webos";if(lv(e))return"Safari";if((e.includes("chrome/")||uv(e))&&!e.includes("edge/"))return"Chrome";if(cv(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=n.match(t);if((r==null?void 0:r.length)===2)return r[1]}return"Other"}function ov(n=Xe()){return/firefox\//i.test(n)}function lv(n=Xe()){const e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function uv(n=Xe()){return/crios\//i.test(n)}function hv(n=Xe()){return/iemobile/i.test(n)}function cv(n=Xe()){return/android/i.test(n)}function dv(n=Xe()){return/blackberry/i.test(n)}function fv(n=Xe()){return/webos/i.test(n)}/**
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
 */function Hu(n,e=[]){let t;switch(n){case"Browser":t=Bu(Xe());break;case"Worker":t=`${Bu(Xe())}-${n}`;break;default:t=n}const r=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${bi}/${r}`}/**
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
 */class mv{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const r=s=>new Promise((o,u)=>{try{const c=e(s);o(c)}catch(c){u(c)}});r.onAbort=t,this.queue.push(r);const i=this.queue.length-1;return()=>{this.queue[i]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const r of this.queue)await r(e),r.onAbort&&t.push(r.onAbort)}catch(r){t.reverse();for(const i of t)try{i()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r==null?void 0:r.message})}}}/**
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
 */async function pv(n,e={}){return Mi(n,"GET","/v2/passwordPolicy",Pu(n,e))}/**
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
 */const gv=6;class yv{constructor(e){var t,r,i,s;const o=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=(t=o.minPasswordLength)!==null&&t!==void 0?t:gv,o.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=o.maxPasswordLength),o.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=o.containsLowercaseCharacter),o.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=o.containsUppercaseCharacter),o.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=o.containsNumericCharacter),o.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=o.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=(i=(r=e.allowedNonAlphanumericCharacters)===null||r===void 0?void 0:r.join(""))!==null&&i!==void 0?i:"",this.forceUpgradeOnSignin=(s=e.forceUpgradeOnSignin)!==null&&s!==void 0?s:!1,this.schemaVersion=e.schemaVersion}validatePassword(e){var t,r,i,s,o,u;const c={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,c),this.validatePasswordCharacterOptions(e,c),c.isValid&&(c.isValid=(t=c.meetsMinPasswordLength)!==null&&t!==void 0?t:!0),c.isValid&&(c.isValid=(r=c.meetsMaxPasswordLength)!==null&&r!==void 0?r:!0),c.isValid&&(c.isValid=(i=c.containsLowercaseLetter)!==null&&i!==void 0?i:!0),c.isValid&&(c.isValid=(s=c.containsUppercaseLetter)!==null&&s!==void 0?s:!0),c.isValid&&(c.isValid=(o=c.containsNumericCharacter)!==null&&o!==void 0?o:!0),c.isValid&&(c.isValid=(u=c.containsNonAlphanumericCharacter)!==null&&u!==void 0?u:!0),c}validatePasswordLengthOptions(e,t){const r=this.customStrengthOptions.minPasswordLength,i=this.customStrengthOptions.maxPasswordLength;r&&(t.meetsMinPasswordLength=e.length>=r),i&&(t.meetsMaxPasswordLength=e.length<=i)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let r;for(let i=0;i<e.length;i++)r=e.charAt(i),this.updatePasswordCharacterOptionsStatuses(t,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,t,r,i,s){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=i)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=s))}}/**
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
 */class _v{constructor(e,t,r,i){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=r,this.config=i,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Yu(this),this.idTokenSubscription=new Yu(this),this.beforeStateQueue=new mv(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Su,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=i.sdkClientVersion}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=sn(t)),this._initializationPromise=this.queue(async()=>{var r,i;if(!this._deleted&&(this.persistenceManager=await Rn.create(this,e),!this._deleted)){if(!((r=this._popupRedirectResolver)===null||r===void 0)&&r._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=((i=this.currentUser)===null||i===void 0?void 0:i.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await Nu(this,{idToken:e}),r=await Lt._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(r)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var t;if(ur(this.app)){const o=this.app.settings.authIdToken;return o?new Promise(u=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(o).then(u,u))}):this.directlySetCurrentUser(null)}const r=await this.assertedPersistence.getCurrentUser();let i=r,s=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const o=(t=this.redirectUser)===null||t===void 0?void 0:t._redirectEventId,u=i==null?void 0:i._redirectEventId,c=await this.tryRedirectSignIn(e);(!o||o===u)&&(c!=null&&c.user)&&(i=c.user,s=!0)}if(!i)return this.directlySetCurrentUser(null);if(!i._redirectEventId){if(s)try{await this.beforeStateQueue.runMiddleware(i)}catch(o){i=r,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(o))}return i?this.reloadAndSetCurrentUserOrClear(i):this.directlySetCurrentUser(null)}return j(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===i._redirectEventId?this.directlySetCurrentUser(i):this.reloadAndSetCurrentUserOrClear(i)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await Oi(e)}catch(t){if((t==null?void 0:t.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=$_()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(ur(this.app))return Promise.reject(Pi(this));const t=e?Dt(e):null;return t&&j(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&j(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return ur(this.app)?Promise.reject(Pi(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return ur(this.app)?Promise.reject(Pi(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(sn(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await pv(this),t=new yv(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(e){this._errorFactory=new lr("auth","Firebase",e())}onAuthStateChanged(e,t,r){return this.registerStateListener(this.authStateSubscription,e,t,r)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,r){return this.registerStateListener(this.idTokenSubscription,e,t,r)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(r.tenantId=this.tenantId),await av(this,r)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,t){const r=await this.getOrInitRedirectPersistenceManager(t);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&sn(e)||this._popupRedirectResolver;j(t,this,"argument-error"),this.redirectPersistenceManager=await Rn.create(this,[sn(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,r;return this._isInitialized&&await this.queue(async()=>{}),((t=this._currentUser)===null||t===void 0?void 0:t._redirectEventId)===e?this._currentUser:((r=this.redirectUser)===null||r===void 0?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const r=(t=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&t!==void 0?t:null;this.lastNotifiedUid!==r&&(this.lastNotifiedUid=r,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,r,i){if(this._deleted)return()=>{};const s=typeof t=="function"?t:t.next.bind(t);let o=!1;const u=this._isInitialized?Promise.resolve():this._initializationPromise;if(j(u,this,"internal-error"),u.then(()=>{o||s(this.currentUser)}),typeof t=="function"){const c=e.addObserver(t,r,i);return()=>{o=!0,c()}}else{const c=e.addObserver(t);return()=>{o=!0,c()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return j(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=Hu(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const t={"X-Client-Version":this.clientVersion};this.app.options.appId&&(t["X-Firebase-gmpid"]=this.app.options.appId);const r=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());r&&(t["X-Firebase-Client"]=r);const i=await this._getAppCheckToken();return i&&(t["X-Firebase-AppCheck"]=i),t}async _getAppCheckToken(){var e;const t=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return t!=null&&t.error&&z_(`Error while retrieving App Check token: ${t.error}`),t==null?void 0:t.token}}function Wu(n){return Dt(n)}class Yu{constructor(e){this.auth=e,this.observer=null,this.addObserver=My(t=>this.observer=t)}get next(){return j(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
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
 */function vv(n,e){const t=Ea(n,"auth");if(t.isInitialized()){const i=t.getImmediate(),s=t.getOptions();if(Si(s,e??{}))return i;Ia(i,"already-initialized")}return t.initialize({options:e})}function wv(n,e){const t=(e==null?void 0:e.persistence)||[],r=(Array.isArray(t)?t:[t]).map(sn);e!=null&&e.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(r,e==null?void 0:e.popupRedirectResolver)}function Ev(n,e,t){const r=Wu(n);j(r._canInitEmulator,r,"emulator-config-failed"),j(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const i=!1,s=zu(e),{host:o,port:u}=Tv(e),c=u===null?"":`:${u}`;r.config.emulator={url:`${s}//${o}${c}/`},r.settings.appVerificationDisabledForTesting=!0,r.emulatorConfig=Object.freeze({host:o,port:u,protocol:s.replace(":",""),options:Object.freeze({disableWarnings:i})}),Iv()}function zu(n){const e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function Tv(n){const e=zu(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};const r=t[2].split("@").pop()||"",i=/^(\[[^\]]+\])(:|$)/.exec(r);if(i){const s=i[1];return{host:s,port:Gu(r.substr(s.length+1))}}else{const[s,o]=r.split(":");return{host:s,port:Gu(o)}}}function Gu(n){if(!n)return null;const e=Number(n);return isNaN(e)?null:e}function Iv(){function n(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}function Av(n,e,t,r){return Dt(n).onIdTokenChanged(e,t,r)}function Sv(n,e,t,r){return Dt(n).onAuthStateChanged(e,t,r)}const qu="__sak";/**
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
 */function Cv(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
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
 */class Vi{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(i=>i.isListeningto(e));if(t)return t;const r=new Vi(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:r,eventType:i,data:s}=t.data,o=this.handlersMap[i];if(!(o!=null&&o.size))return;t.ports[0].postMessage({status:"ack",eventId:r,eventType:i});const u=Array.from(o).map(async d=>d(t.origin,s)),c=await Cv(u);t.ports[0].postMessage({status:"done",eventId:r,eventType:i,response:c})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}Vi.receivers=[];/**
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
 */function bv(n="",e=10){let t="";for(let r=0;r<e;r++)t+=Math.floor(Math.random()*10);return n+t}/**
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
 */class Rv{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,r=50){const i=typeof MessageChannel<"u"?new MessageChannel:null;if(!i)throw new Error("connection_unavailable");let s,o;return new Promise((u,c)=>{const d=bv("",20);i.port1.start();const m=setTimeout(()=>{c(new Error("unsupported_event"))},r);o={messageChannel:i,onMessage(T){const S=T;if(S.data.eventId===d)switch(S.data.status){case"ack":clearTimeout(m),s=setTimeout(()=>{c(new Error("timeout"))},3e3);break;case"done":clearTimeout(s),u(S.data.response);break;default:clearTimeout(m),clearTimeout(s),c(new Error("invalid_response"));break}}},this.handlers.add(o),i.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:d,data:t},[i.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
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
 */function $u(){return window}/**
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
 */function ju(){return typeof $u().WorkerGlobalScope<"u"&&typeof $u().importScripts=="function"}async function kv(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function Pv(){var n;return((n=navigator==null?void 0:navigator.serviceWorker)===null||n===void 0?void 0:n.controller)||null}function Dv(){return ju()?self:null}/**
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
 */const Ku="firebaseLocalStorageDb",Mv=1,Li="firebaseLocalStorage",Qu="fbase_key";class fr{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function xi(n,e){return n.transaction([Li],e?"readwrite":"readonly").objectStore(Li)}function Nv(){const n=indexedDB.deleteDatabase(Ku);return new fr(n).toPromise()}function ka(){const n=indexedDB.open(Ku,Mv);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{const r=n.result;try{r.createObjectStore(Li,{keyPath:Qu})}catch(i){t(i)}}),n.addEventListener("success",async()=>{const r=n.result;r.objectStoreNames.contains(Li)?e(r):(r.close(),await Nv(),e(await ka()))})})}async function Ju(n,e,t){const r=xi(n,!0).put({[Qu]:e,value:t});return new fr(r).toPromise()}async function Ov(n,e){const t=xi(n,!1).get(e),r=await new fr(t).toPromise();return r===void 0?null:r.value}function Xu(n,e){const t=xi(n,!0).delete(e);return new fr(t).toPromise()}const Vv=800,Lv=3;class Zu{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await ka(),this.db)}async _withRetries(e){let t=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(t++>Lv)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return ju()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Vi._getInstance(Dv()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var e,t;if(this.activeServiceWorker=await kv(),!this.activeServiceWorker)return;this.sender=new Rv(this.activeServiceWorker);const r=await this.sender._send("ping",{},800);r&&!((e=r[0])===null||e===void 0)&&e.fulfilled&&!((t=r[0])===null||t===void 0)&&t.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||Pv()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await ka();return await Ju(e,qu,"1"),await Xu(e,qu),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(r=>Ju(r,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(r=>Ov(r,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>Xu(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(i=>{const s=xi(i,!1).getAll();return new fr(s).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],r=new Set;if(e.length!==0)for(const{fbase_key:i,value:s}of e)r.add(i),JSON.stringify(this.localCache[i])!==JSON.stringify(s)&&(this.notifyListeners(i,s),t.push(i));for(const i of Object.keys(this.localCache))this.localCache[i]&&!r.has(i)&&(this.notifyListeners(i,null),t.push(i));return t}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const i of Array.from(r))i(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),Vv)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}Zu.type="LOCAL";const xv=Zu;var eh="@firebase/auth",th="1.7.6";/**
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
 */class Fv{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(r=>{e((r==null?void 0:r.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){j(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
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
 */function Uv(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function Bv(n){Cn(new tn("auth",(e,{options:t})=>{const r=e.getProvider("app").getImmediate(),i=e.getProvider("heartbeat"),s=e.getProvider("app-check-internal"),{apiKey:o,authDomain:u}=r.options;j(o&&!o.includes(":"),"invalid-api-key",{appName:r.name});const c={apiKey:o,authDomain:u,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:Hu(n)},d=new _v(r,i,s,c);return wv(d,t),d},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,r)=>{e.getProvider("auth-internal").initialize()})),Cn(new tn("auth-internal",e=>{const t=Wu(e.getProvider("auth").getImmediate());return(r=>new Fv(r))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),Ot(eh,th,Uv(n)),Ot(eh,th,"esm2017")}/**
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
 */function Hv(n=yu()){const e=Ea(n,"auth");if(e.isInitialized())return e.getImmediate();const t=vv(n,{persistence:[xv]}),r=su("auth");return r&&Ev(t,`http://${r}`),t}Bv("WebExtension");var nh=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var an,rh;(function(){var n;/** @license

	 Copyright The Closure Library Authors.
	 SPDX-License-Identifier: Apache-2.0
	*/function e(v,p){function y(){}y.prototype=p.prototype,v.D=p.prototype,v.prototype=new y,v.prototype.constructor=v,v.C=function(_,w,I){for(var g=Array(arguments.length-2),It=2;It<arguments.length;It++)g[It-2]=arguments[It];return p.prototype[w].apply(_,g)}}function t(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}e(r,t),r.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function i(v,p,y){y||(y=0);var _=Array(16);if(typeof p=="string")for(var w=0;16>w;++w)_[w]=p.charCodeAt(y++)|p.charCodeAt(y++)<<8|p.charCodeAt(y++)<<16|p.charCodeAt(y++)<<24;else for(w=0;16>w;++w)_[w]=p[y++]|p[y++]<<8|p[y++]<<16|p[y++]<<24;p=v.g[0],y=v.g[1],w=v.g[2];var I=v.g[3],g=p+(I^y&(w^I))+_[0]+3614090360&4294967295;p=y+(g<<7&4294967295|g>>>25),g=I+(w^p&(y^w))+_[1]+3905402710&4294967295,I=p+(g<<12&4294967295|g>>>20),g=w+(y^I&(p^y))+_[2]+606105819&4294967295,w=I+(g<<17&4294967295|g>>>15),g=y+(p^w&(I^p))+_[3]+3250441966&4294967295,y=w+(g<<22&4294967295|g>>>10),g=p+(I^y&(w^I))+_[4]+4118548399&4294967295,p=y+(g<<7&4294967295|g>>>25),g=I+(w^p&(y^w))+_[5]+1200080426&4294967295,I=p+(g<<12&4294967295|g>>>20),g=w+(y^I&(p^y))+_[6]+2821735955&4294967295,w=I+(g<<17&4294967295|g>>>15),g=y+(p^w&(I^p))+_[7]+4249261313&4294967295,y=w+(g<<22&4294967295|g>>>10),g=p+(I^y&(w^I))+_[8]+1770035416&4294967295,p=y+(g<<7&4294967295|g>>>25),g=I+(w^p&(y^w))+_[9]+2336552879&4294967295,I=p+(g<<12&4294967295|g>>>20),g=w+(y^I&(p^y))+_[10]+4294925233&4294967295,w=I+(g<<17&4294967295|g>>>15),g=y+(p^w&(I^p))+_[11]+2304563134&4294967295,y=w+(g<<22&4294967295|g>>>10),g=p+(I^y&(w^I))+_[12]+1804603682&4294967295,p=y+(g<<7&4294967295|g>>>25),g=I+(w^p&(y^w))+_[13]+4254626195&4294967295,I=p+(g<<12&4294967295|g>>>20),g=w+(y^I&(p^y))+_[14]+2792965006&4294967295,w=I+(g<<17&4294967295|g>>>15),g=y+(p^w&(I^p))+_[15]+1236535329&4294967295,y=w+(g<<22&4294967295|g>>>10),g=p+(w^I&(y^w))+_[1]+4129170786&4294967295,p=y+(g<<5&4294967295|g>>>27),g=I+(y^w&(p^y))+_[6]+3225465664&4294967295,I=p+(g<<9&4294967295|g>>>23),g=w+(p^y&(I^p))+_[11]+643717713&4294967295,w=I+(g<<14&4294967295|g>>>18),g=y+(I^p&(w^I))+_[0]+3921069994&4294967295,y=w+(g<<20&4294967295|g>>>12),g=p+(w^I&(y^w))+_[5]+3593408605&4294967295,p=y+(g<<5&4294967295|g>>>27),g=I+(y^w&(p^y))+_[10]+38016083&4294967295,I=p+(g<<9&4294967295|g>>>23),g=w+(p^y&(I^p))+_[15]+3634488961&4294967295,w=I+(g<<14&4294967295|g>>>18),g=y+(I^p&(w^I))+_[4]+3889429448&4294967295,y=w+(g<<20&4294967295|g>>>12),g=p+(w^I&(y^w))+_[9]+568446438&4294967295,p=y+(g<<5&4294967295|g>>>27),g=I+(y^w&(p^y))+_[14]+3275163606&4294967295,I=p+(g<<9&4294967295|g>>>23),g=w+(p^y&(I^p))+_[3]+4107603335&4294967295,w=I+(g<<14&4294967295|g>>>18),g=y+(I^p&(w^I))+_[8]+1163531501&4294967295,y=w+(g<<20&4294967295|g>>>12),g=p+(w^I&(y^w))+_[13]+2850285829&4294967295,p=y+(g<<5&4294967295|g>>>27),g=I+(y^w&(p^y))+_[2]+4243563512&4294967295,I=p+(g<<9&4294967295|g>>>23),g=w+(p^y&(I^p))+_[7]+1735328473&4294967295,w=I+(g<<14&4294967295|g>>>18),g=y+(I^p&(w^I))+_[12]+2368359562&4294967295,y=w+(g<<20&4294967295|g>>>12),g=p+(y^w^I)+_[5]+4294588738&4294967295,p=y+(g<<4&4294967295|g>>>28),g=I+(p^y^w)+_[8]+2272392833&4294967295,I=p+(g<<11&4294967295|g>>>21),g=w+(I^p^y)+_[11]+1839030562&4294967295,w=I+(g<<16&4294967295|g>>>16),g=y+(w^I^p)+_[14]+4259657740&4294967295,y=w+(g<<23&4294967295|g>>>9),g=p+(y^w^I)+_[1]+2763975236&4294967295,p=y+(g<<4&4294967295|g>>>28),g=I+(p^y^w)+_[4]+1272893353&4294967295,I=p+(g<<11&4294967295|g>>>21),g=w+(I^p^y)+_[7]+4139469664&4294967295,w=I+(g<<16&4294967295|g>>>16),g=y+(w^I^p)+_[10]+3200236656&4294967295,y=w+(g<<23&4294967295|g>>>9),g=p+(y^w^I)+_[13]+681279174&4294967295,p=y+(g<<4&4294967295|g>>>28),g=I+(p^y^w)+_[0]+3936430074&4294967295,I=p+(g<<11&4294967295|g>>>21),g=w+(I^p^y)+_[3]+3572445317&4294967295,w=I+(g<<16&4294967295|g>>>16),g=y+(w^I^p)+_[6]+76029189&4294967295,y=w+(g<<23&4294967295|g>>>9),g=p+(y^w^I)+_[9]+3654602809&4294967295,p=y+(g<<4&4294967295|g>>>28),g=I+(p^y^w)+_[12]+3873151461&4294967295,I=p+(g<<11&4294967295|g>>>21),g=w+(I^p^y)+_[15]+530742520&4294967295,w=I+(g<<16&4294967295|g>>>16),g=y+(w^I^p)+_[2]+3299628645&4294967295,y=w+(g<<23&4294967295|g>>>9),g=p+(w^(y|~I))+_[0]+4096336452&4294967295,p=y+(g<<6&4294967295|g>>>26),g=I+(y^(p|~w))+_[7]+1126891415&4294967295,I=p+(g<<10&4294967295|g>>>22),g=w+(p^(I|~y))+_[14]+2878612391&4294967295,w=I+(g<<15&4294967295|g>>>17),g=y+(I^(w|~p))+_[5]+4237533241&4294967295,y=w+(g<<21&4294967295|g>>>11),g=p+(w^(y|~I))+_[12]+1700485571&4294967295,p=y+(g<<6&4294967295|g>>>26),g=I+(y^(p|~w))+_[3]+2399980690&4294967295,I=p+(g<<10&4294967295|g>>>22),g=w+(p^(I|~y))+_[10]+4293915773&4294967295,w=I+(g<<15&4294967295|g>>>17),g=y+(I^(w|~p))+_[1]+2240044497&4294967295,y=w+(g<<21&4294967295|g>>>11),g=p+(w^(y|~I))+_[8]+1873313359&4294967295,p=y+(g<<6&4294967295|g>>>26),g=I+(y^(p|~w))+_[15]+4264355552&4294967295,I=p+(g<<10&4294967295|g>>>22),g=w+(p^(I|~y))+_[6]+2734768916&4294967295,w=I+(g<<15&4294967295|g>>>17),g=y+(I^(w|~p))+_[13]+1309151649&4294967295,y=w+(g<<21&4294967295|g>>>11),g=p+(w^(y|~I))+_[4]+4149444226&4294967295,p=y+(g<<6&4294967295|g>>>26),g=I+(y^(p|~w))+_[11]+3174756917&4294967295,I=p+(g<<10&4294967295|g>>>22),g=w+(p^(I|~y))+_[2]+718787259&4294967295,w=I+(g<<15&4294967295|g>>>17),g=y+(I^(w|~p))+_[9]+3951481745&4294967295,v.g[0]=v.g[0]+p&4294967295,v.g[1]=v.g[1]+(w+(g<<21&4294967295|g>>>11))&4294967295,v.g[2]=v.g[2]+w&4294967295,v.g[3]=v.g[3]+I&4294967295}r.prototype.u=function(v,p){p===void 0&&(p=v.length);for(var y=p-this.blockSize,_=this.B,w=this.h,I=0;I<p;){if(w==0)for(;I<=y;)i(this,v,I),I+=this.blockSize;if(typeof v=="string"){for(;I<p;)if(_[w++]=v.charCodeAt(I++),w==this.blockSize){i(this,_),w=0;break}}else for(;I<p;)if(_[w++]=v[I++],w==this.blockSize){i(this,_),w=0;break}}this.h=w,this.o+=p},r.prototype.v=function(){var v=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);v[0]=128;for(var p=1;p<v.length-8;++p)v[p]=0;var y=8*this.o;for(p=v.length-8;p<v.length;++p)v[p]=y&255,y/=256;for(this.u(v),v=Array(16),p=y=0;4>p;++p)for(var _=0;32>_;_+=8)v[y++]=this.g[p]>>>_&255;return v};function s(v,p){var y=u;return Object.prototype.hasOwnProperty.call(y,v)?y[v]:y[v]=p(v)}function o(v,p){this.h=p;for(var y=[],_=!0,w=v.length-1;0<=w;w--){var I=v[w]|0;_&&I==p||(y[w]=I,_=!1)}this.g=y}var u={};function c(v){return-128<=v&&128>v?s(v,function(p){return new o([p|0],0>p?-1:0)}):new o([v|0],0>v?-1:0)}function d(v){if(isNaN(v)||!isFinite(v))return T;if(0>v)return M(d(-v));for(var p=[],y=1,_=0;v>=y;_++)p[_]=v/y|0,y*=4294967296;return new o(p,0)}function m(v,p){if(v.length==0)throw Error("number format error: empty string");if(p=p||10,2>p||36<p)throw Error("radix out of range: "+p);if(v.charAt(0)=="-")return M(m(v.substring(1),p));if(0<=v.indexOf("-"))throw Error('number format error: interior "-" character');for(var y=d(Math.pow(p,8)),_=T,w=0;w<v.length;w+=8){var I=Math.min(8,v.length-w),g=parseInt(v.substring(w,w+I),p);8>I?(I=d(Math.pow(p,I)),_=_.j(I).add(d(g))):(_=_.j(y),_=_.add(d(g)))}return _}var T=c(0),S=c(1),R=c(16777216);n=o.prototype,n.m=function(){if(x(this))return-M(this).m();for(var v=0,p=1,y=0;y<this.g.length;y++){var _=this.i(y);v+=(0<=_?_:4294967296+_)*p,p*=4294967296}return v},n.toString=function(v){if(v=v||10,2>v||36<v)throw Error("radix out of range: "+v);if(O(this))return"0";if(x(this))return"-"+M(this).toString(v);for(var p=d(Math.pow(v,6)),y=this,_="";;){var w=me(y,p).g;y=te(y,w.j(p));var I=((0<y.g.length?y.g[0]:y.h)>>>0).toString(v);if(y=w,O(y))return I+_;for(;6>I.length;)I="0"+I;_=I+_}},n.i=function(v){return 0>v?0:v<this.g.length?this.g[v]:this.h};function O(v){if(v.h!=0)return!1;for(var p=0;p<v.g.length;p++)if(v.g[p]!=0)return!1;return!0}function x(v){return v.h==-1}n.l=function(v){return v=te(this,v),x(v)?-1:O(v)?0:1};function M(v){for(var p=v.g.length,y=[],_=0;_<p;_++)y[_]=~v.g[_];return new o(y,~v.h).add(S)}n.abs=function(){return x(this)?M(this):this},n.add=function(v){for(var p=Math.max(this.g.length,v.g.length),y=[],_=0,w=0;w<=p;w++){var I=_+(this.i(w)&65535)+(v.i(w)&65535),g=(I>>>16)+(this.i(w)>>>16)+(v.i(w)>>>16);_=g>>>16,I&=65535,g&=65535,y[w]=g<<16|I}return new o(y,y[y.length-1]&-2147483648?-1:0)};function te(v,p){return v.add(M(p))}n.j=function(v){if(O(this)||O(v))return T;if(x(this))return x(v)?M(this).j(M(v)):M(M(this).j(v));if(x(v))return M(this.j(M(v)));if(0>this.l(R)&&0>v.l(R))return d(this.m()*v.m());for(var p=this.g.length+v.g.length,y=[],_=0;_<2*p;_++)y[_]=0;for(_=0;_<this.g.length;_++)for(var w=0;w<v.g.length;w++){var I=this.i(_)>>>16,g=this.i(_)&65535,It=v.i(w)>>>16,Mr=v.i(w)&65535;y[2*_+2*w]+=g*Mr,oe(y,2*_+2*w),y[2*_+2*w+1]+=I*Mr,oe(y,2*_+2*w+1),y[2*_+2*w+1]+=g*It,oe(y,2*_+2*w+1),y[2*_+2*w+2]+=I*It,oe(y,2*_+2*w+2)}for(_=0;_<p;_++)y[_]=y[2*_+1]<<16|y[2*_];for(_=p;_<2*p;_++)y[_]=0;return new o(y,0)};function oe(v,p){for(;(v[p]&65535)!=v[p];)v[p+1]+=v[p]>>>16,v[p]&=65535,p++}function ie(v,p){this.g=v,this.h=p}function me(v,p){if(O(p))throw Error("division by zero");if(O(v))return new ie(T,T);if(x(v))return p=me(M(v),p),new ie(M(p.g),M(p.h));if(x(p))return p=me(v,M(p)),new ie(M(p.g),p.h);if(30<v.g.length){if(x(v)||x(p))throw Error("slowDivide_ only works with positive integers.");for(var y=S,_=p;0>=_.l(v);)y=qe(y),_=qe(_);var w=pe(y,1),I=pe(_,1);for(_=pe(_,2),y=pe(y,2);!O(_);){var g=I.add(_);0>=g.l(v)&&(w=w.add(y),I=g),_=pe(_,1),y=pe(y,1)}return p=te(v,w.j(p)),new ie(w,p)}for(w=T;0<=v.l(p);){for(y=Math.max(1,Math.floor(v.m()/p.m())),_=Math.ceil(Math.log(y)/Math.LN2),_=48>=_?1:Math.pow(2,_-48),I=d(y),g=I.j(p);x(g)||0<g.l(v);)y-=_,I=d(y),g=I.j(p);O(I)&&(I=S),w=w.add(I),v=te(v,g)}return new ie(w,v)}n.A=function(v){return me(this,v).h},n.and=function(v){for(var p=Math.max(this.g.length,v.g.length),y=[],_=0;_<p;_++)y[_]=this.i(_)&v.i(_);return new o(y,this.h&v.h)},n.or=function(v){for(var p=Math.max(this.g.length,v.g.length),y=[],_=0;_<p;_++)y[_]=this.i(_)|v.i(_);return new o(y,this.h|v.h)},n.xor=function(v){for(var p=Math.max(this.g.length,v.g.length),y=[],_=0;_<p;_++)y[_]=this.i(_)^v.i(_);return new o(y,this.h^v.h)};function qe(v){for(var p=v.g.length+1,y=[],_=0;_<p;_++)y[_]=v.i(_)<<1|v.i(_-1)>>>31;return new o(y,v.h)}function pe(v,p){var y=p>>5;p%=32;for(var _=v.g.length-y,w=[],I=0;I<_;I++)w[I]=0<p?v.i(I+y)>>>p|v.i(I+y+1)<<32-p:v.i(I+y);return new o(w,v.h)}r.prototype.digest=r.prototype.v,r.prototype.reset=r.prototype.s,r.prototype.update=r.prototype.u,rh=r,o.prototype.add=o.prototype.add,o.prototype.multiply=o.prototype.j,o.prototype.modulo=o.prototype.A,o.prototype.compare=o.prototype.l,o.prototype.toNumber=o.prototype.m,o.prototype.toString=o.prototype.toString,o.prototype.getBits=o.prototype.i,o.fromNumber=d,o.fromString=m,an=o}).apply(typeof nh<"u"?nh:typeof self<"u"?self:typeof window<"u"?window:{});var Fi=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var ih,sh,mr,ah,Ui,Pa,oh,lh,uh;(function(){var n,e=typeof Object.defineProperties=="function"?Object.defineProperty:function(a,l,h){return a==Array.prototype||a==Object.prototype||(a[l]=h.value),a};function t(a){a=[typeof globalThis=="object"&&globalThis,a,typeof window=="object"&&window,typeof self=="object"&&self,typeof Fi=="object"&&Fi];for(var l=0;l<a.length;++l){var h=a[l];if(h&&h.Math==Math)return h}throw Error("Cannot find global object")}var r=t(this);function i(a,l){if(l)e:{var h=r;a=a.split(".");for(var f=0;f<a.length-1;f++){var E=a[f];if(!(E in h))break e;h=h[E]}a=a[a.length-1],f=h[a],l=l(f),l!=f&&l!=null&&e(h,a,{configurable:!0,writable:!0,value:l})}}function s(a,l){a instanceof String&&(a+="");var h=0,f=!1,E={next:function(){if(!f&&h<a.length){var A=h++;return{value:l(A,a[A]),done:!1}}return f=!0,{done:!0,value:void 0}}};return E[Symbol.iterator]=function(){return E},E}i("Array.prototype.values",function(a){return a||function(){return s(this,function(l,h){return h})}});/** @license

	 Copyright The Closure Library Authors.
	 SPDX-License-Identifier: Apache-2.0
	*/var o=o||{},u=this||self;function c(a){var l=typeof a;return l=l!="object"?l:a?Array.isArray(a)?"array":l:"null",l=="array"||l=="object"&&typeof a.length=="number"}function d(a){var l=typeof a;return l=="object"&&a!=null||l=="function"}function m(a,l,h){return a.call.apply(a.bind,arguments)}function T(a,l,h){if(!a)throw Error();if(2<arguments.length){var f=Array.prototype.slice.call(arguments,2);return function(){var E=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(E,f),a.apply(l,E)}}return function(){return a.apply(l,arguments)}}function S(a,l,h){return S=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?m:T,S.apply(null,arguments)}function R(a,l){var h=Array.prototype.slice.call(arguments,1);return function(){var f=h.slice();return f.push.apply(f,arguments),a.apply(this,f)}}function O(a,l){function h(){}h.prototype=l.prototype,a.aa=l.prototype,a.prototype=new h,a.prototype.constructor=a,a.Qb=function(f,E,A){for(var P=Array(arguments.length-2),re=2;re<arguments.length;re++)P[re-2]=arguments[re];return l.prototype[E].apply(f,P)}}function x(a){const l=a.length;if(0<l){const h=Array(l);for(let f=0;f<l;f++)h[f]=a[f];return h}return[]}function M(a,l){for(let h=1;h<arguments.length;h++){const f=arguments[h];if(c(f)){const E=a.length||0,A=f.length||0;a.length=E+A;for(let P=0;P<A;P++)a[E+P]=f[P]}else a.push(f)}}class te{constructor(l,h){this.i=l,this.j=h,this.h=0,this.g=null}get(){let l;return 0<this.h?(this.h--,l=this.g,this.g=l.next,l.next=null):l=this.i(),l}}function oe(a){return/^[\s\xa0]*$/.test(a)}function ie(){var a=u.navigator;return a&&(a=a.userAgent)?a:""}function me(a){return me[" "](a),a}me[" "]=function(){};var qe=ie().indexOf("Gecko")!=-1&&!(ie().toLowerCase().indexOf("webkit")!=-1&&ie().indexOf("Edge")==-1)&&!(ie().indexOf("Trident")!=-1||ie().indexOf("MSIE")!=-1)&&ie().indexOf("Edge")==-1;function pe(a,l,h){for(const f in a)l.call(h,a[f],f,a)}function v(a,l){for(const h in a)l.call(void 0,a[h],h,a)}function p(a){const l={};for(const h in a)l[h]=a[h];return l}const y="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function _(a,l){let h,f;for(let E=1;E<arguments.length;E++){f=arguments[E];for(h in f)a[h]=f[h];for(let A=0;A<y.length;A++)h=y[A],Object.prototype.hasOwnProperty.call(f,h)&&(a[h]=f[h])}}function w(a){var l=1;a=a.split(":");const h=[];for(;0<l&&a.length;)h.push(a.shift()),l--;return a.length&&h.push(a.join(":")),h}function I(a){u.setTimeout(()=>{throw a},0)}function g(){var a=So;let l=null;return a.g&&(l=a.g,a.g=a.g.next,a.g||(a.h=null),l.next=null),l}class It{constructor(){this.h=this.g=null}add(l,h){const f=Mr.get();f.set(l,h),this.h?this.h.next=f:this.g=f,this.h=f}}var Mr=new te(()=>new F0,a=>a.reset());class F0{constructor(){this.next=this.g=this.h=null}set(l,h){this.h=l,this.g=h,this.next=null}reset(){this.next=this.g=this.h=null}}let Nr,Or=!1,So=new It,Qc=()=>{const a=u.Promise.resolve(void 0);Nr=()=>{a.then(U0)}};var U0=()=>{for(var a;a=g();){try{a.h.call(a.g)}catch(h){I(h)}var l=Mr;l.j(a),100>l.h&&(l.h++,a.next=l.g,l.g=a)}Or=!1};function Yt(){this.s=this.s,this.C=this.C}Yt.prototype.s=!1,Yt.prototype.ma=function(){this.s||(this.s=!0,this.N())},Yt.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function De(a,l){this.type=a,this.g=this.target=l,this.defaultPrevented=!1}De.prototype.h=function(){this.defaultPrevented=!0};var B0=function(){if(!u.addEventListener||!Object.defineProperty)return!1;var a=!1,l=Object.defineProperty({},"passive",{get:function(){a=!0}});try{const h=()=>{};u.addEventListener("test",h,l),u.removeEventListener("test",h,l)}catch{}return a}();function Vr(a,l){if(De.call(this,a?a.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,a){var h=this.type=a.type,f=a.changedTouches&&a.changedTouches.length?a.changedTouches[0]:null;if(this.target=a.target||a.srcElement,this.g=l,l=a.relatedTarget){if(qe){e:{try{me(l.nodeName);var E=!0;break e}catch{}E=!1}E||(l=null)}}else h=="mouseover"?l=a.fromElement:h=="mouseout"&&(l=a.toElement);this.relatedTarget=l,f?(this.clientX=f.clientX!==void 0?f.clientX:f.pageX,this.clientY=f.clientY!==void 0?f.clientY:f.pageY,this.screenX=f.screenX||0,this.screenY=f.screenY||0):(this.clientX=a.clientX!==void 0?a.clientX:a.pageX,this.clientY=a.clientY!==void 0?a.clientY:a.pageY,this.screenX=a.screenX||0,this.screenY=a.screenY||0),this.button=a.button,this.key=a.key||"",this.ctrlKey=a.ctrlKey,this.altKey=a.altKey,this.shiftKey=a.shiftKey,this.metaKey=a.metaKey,this.pointerId=a.pointerId||0,this.pointerType=typeof a.pointerType=="string"?a.pointerType:H0[a.pointerType]||"",this.state=a.state,this.i=a,a.defaultPrevented&&Vr.aa.h.call(this)}}O(Vr,De);var H0={2:"touch",3:"pen",4:"mouse"};Vr.prototype.h=function(){Vr.aa.h.call(this);var a=this.i;a.preventDefault?a.preventDefault():a.returnValue=!1};var ls="closure_listenable_"+(1e6*Math.random()|0),W0=0;function Y0(a,l,h,f,E){this.listener=a,this.proxy=null,this.src=l,this.type=h,this.capture=!!f,this.ha=E,this.key=++W0,this.da=this.fa=!1}function us(a){a.da=!0,a.listener=null,a.proxy=null,a.src=null,a.ha=null}function hs(a){this.src=a,this.g={},this.h=0}hs.prototype.add=function(a,l,h,f,E){var A=a.toString();a=this.g[A],a||(a=this.g[A]=[],this.h++);var P=bo(a,l,f,E);return-1<P?(l=a[P],h||(l.fa=!1)):(l=new Y0(l,this.src,A,!!f,E),l.fa=h,a.push(l)),l};function Co(a,l){var h=l.type;if(h in a.g){var f=a.g[h],E=Array.prototype.indexOf.call(f,l,void 0),A;(A=0<=E)&&Array.prototype.splice.call(f,E,1),A&&(us(l),a.g[h].length==0&&(delete a.g[h],a.h--))}}function bo(a,l,h,f){for(var E=0;E<a.length;++E){var A=a[E];if(!A.da&&A.listener==l&&A.capture==!!h&&A.ha==f)return E}return-1}var Ro="closure_lm_"+(1e6*Math.random()|0),ko={};function Jc(a,l,h,f,E){if(Array.isArray(l)){for(var A=0;A<l.length;A++)Jc(a,l[A],h,f,E);return null}return h=ed(h),a&&a[ls]?a.K(l,h,d(f)?!!f.capture:!!f,E):z0(a,l,h,!1,f,E)}function z0(a,l,h,f,E,A){if(!l)throw Error("Invalid event type");var P=d(E)?!!E.capture:!!E,re=Do(a);if(re||(a[Ro]=re=new hs(a)),h=re.add(l,h,f,P,A),h.proxy)return h;if(f=G0(),h.proxy=f,f.src=a,f.listener=h,a.addEventListener)B0||(E=P),E===void 0&&(E=!1),a.addEventListener(l.toString(),f,E);else if(a.attachEvent)a.attachEvent(Zc(l.toString()),f);else if(a.addListener&&a.removeListener)a.addListener(f);else throw Error("addEventListener and attachEvent are unavailable.");return h}function G0(){function a(h){return l.call(a.src,a.listener,h)}const l=q0;return a}function Xc(a,l,h,f,E){if(Array.isArray(l))for(var A=0;A<l.length;A++)Xc(a,l[A],h,f,E);else f=d(f)?!!f.capture:!!f,h=ed(h),a&&a[ls]?(a=a.i,l=String(l).toString(),l in a.g&&(A=a.g[l],h=bo(A,h,f,E),-1<h&&(us(A[h]),Array.prototype.splice.call(A,h,1),A.length==0&&(delete a.g[l],a.h--)))):a&&(a=Do(a))&&(l=a.g[l.toString()],a=-1,l&&(a=bo(l,h,f,E)),(h=-1<a?l[a]:null)&&Po(h))}function Po(a){if(typeof a!="number"&&a&&!a.da){var l=a.src;if(l&&l[ls])Co(l.i,a);else{var h=a.type,f=a.proxy;l.removeEventListener?l.removeEventListener(h,f,a.capture):l.detachEvent?l.detachEvent(Zc(h),f):l.addListener&&l.removeListener&&l.removeListener(f),(h=Do(l))?(Co(h,a),h.h==0&&(h.src=null,l[Ro]=null)):us(a)}}}function Zc(a){return a in ko?ko[a]:ko[a]="on"+a}function q0(a,l){if(a.da)a=!0;else{l=new Vr(l,this);var h=a.listener,f=a.ha||a.src;a.fa&&Po(a),a=h.call(f,l)}return a}function Do(a){return a=a[Ro],a instanceof hs?a:null}var Mo="__closure_events_fn_"+(1e9*Math.random()>>>0);function ed(a){return typeof a=="function"?a:(a[Mo]||(a[Mo]=function(l){return a.handleEvent(l)}),a[Mo])}function Me(){Yt.call(this),this.i=new hs(this),this.M=this,this.F=null}O(Me,Yt),Me.prototype[ls]=!0,Me.prototype.removeEventListener=function(a,l,h,f){Xc(this,a,l,h,f)};function Le(a,l){var h,f=a.F;if(f)for(h=[];f;f=f.F)h.push(f);if(a=a.M,f=l.type||l,typeof l=="string")l=new De(l,a);else if(l instanceof De)l.target=l.target||a;else{var E=l;l=new De(f,a),_(l,E)}if(E=!0,h)for(var A=h.length-1;0<=A;A--){var P=l.g=h[A];E=cs(P,f,!0,l)&&E}if(P=l.g=a,E=cs(P,f,!0,l)&&E,E=cs(P,f,!1,l)&&E,h)for(A=0;A<h.length;A++)P=l.g=h[A],E=cs(P,f,!1,l)&&E}Me.prototype.N=function(){if(Me.aa.N.call(this),this.i){var a=this.i,l;for(l in a.g){for(var h=a.g[l],f=0;f<h.length;f++)us(h[f]);delete a.g[l],a.h--}}this.F=null},Me.prototype.K=function(a,l,h,f){return this.i.add(String(a),l,!1,h,f)},Me.prototype.L=function(a,l,h,f){return this.i.add(String(a),l,!0,h,f)};function cs(a,l,h,f){if(l=a.i.g[String(l)],!l)return!0;l=l.concat();for(var E=!0,A=0;A<l.length;++A){var P=l[A];if(P&&!P.da&&P.capture==h){var re=P.listener,Ce=P.ha||P.src;P.fa&&Co(a.i,P),E=re.call(Ce,f)!==!1&&E}}return E&&!f.defaultPrevented}function td(a,l,h){if(typeof a=="function")h&&(a=S(a,h));else if(a&&typeof a.handleEvent=="function")a=S(a.handleEvent,a);else throw Error("Invalid listener argument");return 2147483647<Number(l)?-1:u.setTimeout(a,l||0)}function nd(a){a.g=td(()=>{a.g=null,a.i&&(a.i=!1,nd(a))},a.l);const l=a.h;a.h=null,a.m.apply(null,l)}class $0 extends Yt{constructor(l,h){super(),this.m=l,this.l=h,this.h=null,this.i=!1,this.g=null}j(l){this.h=arguments,this.g?this.i=!0:nd(this)}N(){super.N(),this.g&&(u.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function Lr(a){Yt.call(this),this.h=a,this.g={}}O(Lr,Yt);var rd=[];function id(a){pe(a.g,function(l,h){this.g.hasOwnProperty(h)&&Po(l)},a),a.g={}}Lr.prototype.N=function(){Lr.aa.N.call(this),id(this)},Lr.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var No=u.JSON.stringify,j0=u.JSON.parse,K0=class{stringify(a){return u.JSON.stringify(a,void 0)}parse(a){return u.JSON.parse(a,void 0)}};function Oo(){}Oo.prototype.h=null;function sd(a){return a.h||(a.h=a.i())}function ad(){}var xr={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function Vo(){De.call(this,"d")}O(Vo,De);function Lo(){De.call(this,"c")}O(Lo,De);var cn={},od=null;function ds(){return od=od||new Me}cn.La="serverreachability";function ld(a){De.call(this,cn.La,a)}O(ld,De);function Fr(a){const l=ds();Le(l,new ld(l))}cn.STAT_EVENT="statevent";function ud(a,l){De.call(this,cn.STAT_EVENT,a),this.stat=l}O(ud,De);function xe(a){const l=ds();Le(l,new ud(l,a))}cn.Ma="timingevent";function hd(a,l){De.call(this,cn.Ma,a),this.size=l}O(hd,De);function Ur(a,l){if(typeof a!="function")throw Error("Fn must not be null and must be a function");return u.setTimeout(function(){a()},l)}function Br(){this.g=!0}Br.prototype.xa=function(){this.g=!1};function Q0(a,l,h,f,E,A){a.info(function(){if(a.g)if(A)for(var P="",re=A.split("&"),Ce=0;Ce<re.length;Ce++){var X=re[Ce].split("=");if(1<X.length){var Ne=X[0];X=X[1];var Oe=Ne.split("_");P=2<=Oe.length&&Oe[1]=="type"?P+(Ne+"="+X+"&"):P+(Ne+"=redacted&")}}else P=null;else P=A;return"XMLHTTP REQ ("+f+") [attempt "+E+"]: "+l+`
`+h+`
`+P})}function J0(a,l,h,f,E,A,P){a.info(function(){return"XMLHTTP RESP ("+f+") [ attempt "+E+"]: "+l+`
`+h+`
`+A+" "+P})}function zn(a,l,h,f){a.info(function(){return"XMLHTTP TEXT ("+l+"): "+Z0(a,h)+(f?" "+f:"")})}function X0(a,l){a.info(function(){return"TIMEOUT: "+l})}Br.prototype.info=function(){};function Z0(a,l){if(!a.g)return l;if(!l)return null;try{var h=JSON.parse(l);if(h){for(a=0;a<h.length;a++)if(Array.isArray(h[a])){var f=h[a];if(!(2>f.length)){var E=f[1];if(Array.isArray(E)&&!(1>E.length)){var A=E[0];if(A!="noop"&&A!="stop"&&A!="close")for(var P=1;P<E.length;P++)E[P]=""}}}}return No(h)}catch{return l}}var fs={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},cd={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},xo;function ms(){}O(ms,Oo),ms.prototype.g=function(){return new XMLHttpRequest},ms.prototype.i=function(){return{}},xo=new ms;function zt(a,l,h,f){this.j=a,this.i=l,this.l=h,this.R=f||1,this.U=new Lr(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new dd}function dd(){this.i=null,this.g="",this.h=!1}var fd={},Fo={};function Uo(a,l,h){a.L=1,a.v=_s(At(l)),a.m=h,a.P=!0,md(a,null)}function md(a,l){a.F=Date.now(),ps(a),a.A=At(a.v);var h=a.A,f=a.R;Array.isArray(f)||(f=[String(f)]),Rd(h.i,"t",f),a.C=0,h=a.j.J,a.h=new dd,a.g=qd(a.j,h?l:null,!a.m),0<a.O&&(a.M=new $0(S(a.Y,a,a.g),a.O)),l=a.U,h=a.g,f=a.ca;var E="readystatechange";Array.isArray(E)||(E&&(rd[0]=E.toString()),E=rd);for(var A=0;A<E.length;A++){var P=Jc(h,E[A],f||l.handleEvent,!1,l.h||l);if(!P)break;l.g[P.key]=P}l=a.H?p(a.H):{},a.m?(a.u||(a.u="POST"),l["Content-Type"]="application/x-www-form-urlencoded",a.g.ea(a.A,a.u,a.m,l)):(a.u="GET",a.g.ea(a.A,a.u,null,l)),Fr(),Q0(a.i,a.u,a.A,a.l,a.R,a.m)}zt.prototype.ca=function(a){a=a.target;const l=this.M;l&&St(a)==3?l.j():this.Y(a)},zt.prototype.Y=function(a){try{if(a==this.g)e:{const Oe=St(this.g);var l=this.g.Ba();const $n=this.g.Z();if(!(3>Oe)&&(Oe!=3||this.g&&(this.h.h||this.g.oa()||Vd(this.g)))){this.J||Oe!=4||l==7||(l==8||0>=$n?Fr(3):Fr(2)),Bo(this);var h=this.g.Z();this.X=h;t:if(pd(this)){var f=Vd(this.g);a="";var E=f.length,A=St(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){dn(this),Hr(this);var P="";break t}this.h.i=new u.TextDecoder}for(l=0;l<E;l++)this.h.h=!0,a+=this.h.i.decode(f[l],{stream:!(A&&l==E-1)});f.length=0,this.h.g+=a,this.C=0,P=this.h.g}else P=this.g.oa();if(this.o=h==200,J0(this.i,this.u,this.A,this.l,this.R,Oe,h),this.o){if(this.T&&!this.K){t:{if(this.g){var re,Ce=this.g;if((re=Ce.g?Ce.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!oe(re)){var X=re;break t}}X=null}if(h=X)zn(this.i,this.l,h,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,Ho(this,h);else{this.o=!1,this.s=3,xe(12),dn(this),Hr(this);break e}}if(this.P){h=!0;let et;for(;!this.J&&this.C<P.length;)if(et=eT(this,P),et==Fo){Oe==4&&(this.s=4,xe(14),h=!1),zn(this.i,this.l,null,"[Incomplete Response]");break}else if(et==fd){this.s=4,xe(15),zn(this.i,this.l,P,"[Invalid Chunk]"),h=!1;break}else zn(this.i,this.l,et,null),Ho(this,et);if(pd(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),Oe!=4||P.length!=0||this.h.h||(this.s=1,xe(16),h=!1),this.o=this.o&&h,!h)zn(this.i,this.l,P,"[Invalid Chunked Response]"),dn(this),Hr(this);else if(0<P.length&&!this.W){this.W=!0;var Ne=this.j;Ne.g==this&&Ne.ba&&!Ne.M&&(Ne.j.info("Great, no buffering proxy detected. Bytes received: "+P.length),$o(Ne),Ne.M=!0,xe(11))}}else zn(this.i,this.l,P,null),Ho(this,P);Oe==4&&dn(this),this.o&&!this.J&&(Oe==4?Wd(this.j,this):(this.o=!1,ps(this)))}else yT(this.g),h==400&&0<P.indexOf("Unknown SID")?(this.s=3,xe(12)):(this.s=0,xe(13)),dn(this),Hr(this)}}}catch{}finally{}};function pd(a){return a.g?a.u=="GET"&&a.L!=2&&a.j.Ca:!1}function eT(a,l){var h=a.C,f=l.indexOf(`
`,h);return f==-1?Fo:(h=Number(l.substring(h,f)),isNaN(h)?fd:(f+=1,f+h>l.length?Fo:(l=l.slice(f,f+h),a.C=f+h,l)))}zt.prototype.cancel=function(){this.J=!0,dn(this)};function ps(a){a.S=Date.now()+a.I,gd(a,a.I)}function gd(a,l){if(a.B!=null)throw Error("WatchDog timer not null");a.B=Ur(S(a.ba,a),l)}function Bo(a){a.B&&(u.clearTimeout(a.B),a.B=null)}zt.prototype.ba=function(){this.B=null;const a=Date.now();0<=a-this.S?(X0(this.i,this.A),this.L!=2&&(Fr(),xe(17)),dn(this),this.s=2,Hr(this)):gd(this,this.S-a)};function Hr(a){a.j.G==0||a.J||Wd(a.j,a)}function dn(a){Bo(a);var l=a.M;l&&typeof l.ma=="function"&&l.ma(),a.M=null,id(a.U),a.g&&(l=a.g,a.g=null,l.abort(),l.ma())}function Ho(a,l){try{var h=a.j;if(h.G!=0&&(h.g==a||Wo(h.h,a))){if(!a.K&&Wo(h.h,a)&&h.G==3){try{var f=h.Da.g.parse(l)}catch{f=null}if(Array.isArray(f)&&f.length==3){var E=f;if(E[0]==0){e:if(!h.u){if(h.g)if(h.g.F+3e3<a.F)Is(h),Es(h);else break e;qo(h),xe(18)}}else h.za=E[1],0<h.za-h.T&&37500>E[2]&&h.F&&h.v==0&&!h.C&&(h.C=Ur(S(h.Za,h),6e3));if(1>=vd(h.h)&&h.ca){try{h.ca()}catch{}h.ca=void 0}}else mn(h,11)}else if((a.K||h.g==a)&&Is(h),!oe(l))for(E=h.Da.g.parse(l),l=0;l<E.length;l++){let X=E[l];if(h.T=X[0],X=X[1],h.G==2)if(X[0]=="c"){h.K=X[1],h.ia=X[2];const Ne=X[3];Ne!=null&&(h.la=Ne,h.j.info("VER="+h.la));const Oe=X[4];Oe!=null&&(h.Aa=Oe,h.j.info("SVER="+h.Aa));const $n=X[5];$n!=null&&typeof $n=="number"&&0<$n&&(f=1.5*$n,h.L=f,h.j.info("backChannelRequestTimeoutMs_="+f)),f=h;const et=a.g;if(et){const Ss=et.g?et.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(Ss){var A=f.h;A.g||Ss.indexOf("spdy")==-1&&Ss.indexOf("quic")==-1&&Ss.indexOf("h2")==-1||(A.j=A.l,A.g=new Set,A.h&&(Yo(A,A.h),A.h=null))}if(f.D){const jo=et.g?et.g.getResponseHeader("X-HTTP-Session-Id"):null;jo&&(f.ya=jo,le(f.I,f.D,jo))}}h.G=3,h.l&&h.l.ua(),h.ba&&(h.R=Date.now()-a.F,h.j.info("Handshake RTT: "+h.R+"ms")),f=h;var P=a;if(f.qa=Gd(f,f.J?f.ia:null,f.W),P.K){wd(f.h,P);var re=P,Ce=f.L;Ce&&(re.I=Ce),re.B&&(Bo(re),ps(re)),f.g=P}else Bd(f);0<h.i.length&&Ts(h)}else X[0]!="stop"&&X[0]!="close"||mn(h,7);else h.G==3&&(X[0]=="stop"||X[0]=="close"?X[0]=="stop"?mn(h,7):Go(h):X[0]!="noop"&&h.l&&h.l.ta(X),h.v=0)}}Fr(4)}catch{}}var tT=class{constructor(a,l){this.g=a,this.map=l}};function yd(a){this.l=a||10,u.PerformanceNavigationTiming?(a=u.performance.getEntriesByType("navigation"),a=0<a.length&&(a[0].nextHopProtocol=="hq"||a[0].nextHopProtocol=="h2")):a=!!(u.chrome&&u.chrome.loadTimes&&u.chrome.loadTimes()&&u.chrome.loadTimes().wasFetchedViaSpdy),this.j=a?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function _d(a){return a.h?!0:a.g?a.g.size>=a.j:!1}function vd(a){return a.h?1:a.g?a.g.size:0}function Wo(a,l){return a.h?a.h==l:a.g?a.g.has(l):!1}function Yo(a,l){a.g?a.g.add(l):a.h=l}function wd(a,l){a.h&&a.h==l?a.h=null:a.g&&a.g.has(l)&&a.g.delete(l)}yd.prototype.cancel=function(){if(this.i=Ed(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const a of this.g.values())a.cancel();this.g.clear()}};function Ed(a){if(a.h!=null)return a.i.concat(a.h.D);if(a.g!=null&&a.g.size!==0){let l=a.i;for(const h of a.g.values())l=l.concat(h.D);return l}return x(a.i)}function nT(a){if(a.V&&typeof a.V=="function")return a.V();if(typeof Map<"u"&&a instanceof Map||typeof Set<"u"&&a instanceof Set)return Array.from(a.values());if(typeof a=="string")return a.split("");if(c(a)){for(var l=[],h=a.length,f=0;f<h;f++)l.push(a[f]);return l}l=[],h=0;for(f in a)l[h++]=a[f];return l}function rT(a){if(a.na&&typeof a.na=="function")return a.na();if(!a.V||typeof a.V!="function"){if(typeof Map<"u"&&a instanceof Map)return Array.from(a.keys());if(!(typeof Set<"u"&&a instanceof Set)){if(c(a)||typeof a=="string"){var l=[];a=a.length;for(var h=0;h<a;h++)l.push(h);return l}l=[],h=0;for(const f in a)l[h++]=f;return l}}}function Td(a,l){if(a.forEach&&typeof a.forEach=="function")a.forEach(l,void 0);else if(c(a)||typeof a=="string")Array.prototype.forEach.call(a,l,void 0);else for(var h=rT(a),f=nT(a),E=f.length,A=0;A<E;A++)l.call(void 0,f[A],h&&h[A],a)}var Id=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function iT(a,l){if(a){a=a.split("&");for(var h=0;h<a.length;h++){var f=a[h].indexOf("="),E=null;if(0<=f){var A=a[h].substring(0,f);E=a[h].substring(f+1)}else A=a[h];l(A,E?decodeURIComponent(E.replace(/\+/g," ")):"")}}}function fn(a){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,a instanceof fn){this.h=a.h,gs(this,a.j),this.o=a.o,this.g=a.g,ys(this,a.s),this.l=a.l;var l=a.i,h=new zr;h.i=l.i,l.g&&(h.g=new Map(l.g),h.h=l.h),Ad(this,h),this.m=a.m}else a&&(l=String(a).match(Id))?(this.h=!1,gs(this,l[1]||"",!0),this.o=Wr(l[2]||""),this.g=Wr(l[3]||"",!0),ys(this,l[4]),this.l=Wr(l[5]||"",!0),Ad(this,l[6]||"",!0),this.m=Wr(l[7]||"")):(this.h=!1,this.i=new zr(null,this.h))}fn.prototype.toString=function(){var a=[],l=this.j;l&&a.push(Yr(l,Sd,!0),":");var h=this.g;return(h||l=="file")&&(a.push("//"),(l=this.o)&&a.push(Yr(l,Sd,!0),"@"),a.push(encodeURIComponent(String(h)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),h=this.s,h!=null&&a.push(":",String(h))),(h=this.l)&&(this.g&&h.charAt(0)!="/"&&a.push("/"),a.push(Yr(h,h.charAt(0)=="/"?oT:aT,!0))),(h=this.i.toString())&&a.push("?",h),(h=this.m)&&a.push("#",Yr(h,uT)),a.join("")};function At(a){return new fn(a)}function gs(a,l,h){a.j=h?Wr(l,!0):l,a.j&&(a.j=a.j.replace(/:$/,""))}function ys(a,l){if(l){if(l=Number(l),isNaN(l)||0>l)throw Error("Bad port number "+l);a.s=l}else a.s=null}function Ad(a,l,h){l instanceof zr?(a.i=l,hT(a.i,a.h)):(h||(l=Yr(l,lT)),a.i=new zr(l,a.h))}function le(a,l,h){a.i.set(l,h)}function _s(a){return le(a,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),a}function Wr(a,l){return a?l?decodeURI(a.replace(/%25/g,"%2525")):decodeURIComponent(a):""}function Yr(a,l,h){return typeof a=="string"?(a=encodeURI(a).replace(l,sT),h&&(a=a.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),a):null}function sT(a){return a=a.charCodeAt(0),"%"+(a>>4&15).toString(16)+(a&15).toString(16)}var Sd=/[#\/\?@]/g,aT=/[#\?:]/g,oT=/[#\?]/g,lT=/[#\?@]/g,uT=/#/g;function zr(a,l){this.h=this.g=null,this.i=a||null,this.j=!!l}function Gt(a){a.g||(a.g=new Map,a.h=0,a.i&&iT(a.i,function(l,h){a.add(decodeURIComponent(l.replace(/\+/g," ")),h)}))}n=zr.prototype,n.add=function(a,l){Gt(this),this.i=null,a=Gn(this,a);var h=this.g.get(a);return h||this.g.set(a,h=[]),h.push(l),this.h+=1,this};function Cd(a,l){Gt(a),l=Gn(a,l),a.g.has(l)&&(a.i=null,a.h-=a.g.get(l).length,a.g.delete(l))}function bd(a,l){return Gt(a),l=Gn(a,l),a.g.has(l)}n.forEach=function(a,l){Gt(this),this.g.forEach(function(h,f){h.forEach(function(E){a.call(l,E,f,this)},this)},this)},n.na=function(){Gt(this);const a=Array.from(this.g.values()),l=Array.from(this.g.keys()),h=[];for(let f=0;f<l.length;f++){const E=a[f];for(let A=0;A<E.length;A++)h.push(l[f])}return h},n.V=function(a){Gt(this);let l=[];if(typeof a=="string")bd(this,a)&&(l=l.concat(this.g.get(Gn(this,a))));else{a=Array.from(this.g.values());for(let h=0;h<a.length;h++)l=l.concat(a[h])}return l},n.set=function(a,l){return Gt(this),this.i=null,a=Gn(this,a),bd(this,a)&&(this.h-=this.g.get(a).length),this.g.set(a,[l]),this.h+=1,this},n.get=function(a,l){return a?(a=this.V(a),0<a.length?String(a[0]):l):l};function Rd(a,l,h){Cd(a,l),0<h.length&&(a.i=null,a.g.set(Gn(a,l),x(h)),a.h+=h.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";const a=[],l=Array.from(this.g.keys());for(var h=0;h<l.length;h++){var f=l[h];const A=encodeURIComponent(String(f)),P=this.V(f);for(f=0;f<P.length;f++){var E=A;P[f]!==""&&(E+="="+encodeURIComponent(String(P[f]))),a.push(E)}}return this.i=a.join("&")};function Gn(a,l){return l=String(l),a.j&&(l=l.toLowerCase()),l}function hT(a,l){l&&!a.j&&(Gt(a),a.i=null,a.g.forEach(function(h,f){var E=f.toLowerCase();f!=E&&(Cd(this,f),Rd(this,E,h))},a)),a.j=l}function cT(a,l){const h=new Br;if(u.Image){const f=new Image;f.onload=R(qt,h,"TestLoadImage: loaded",!0,l,f),f.onerror=R(qt,h,"TestLoadImage: error",!1,l,f),f.onabort=R(qt,h,"TestLoadImage: abort",!1,l,f),f.ontimeout=R(qt,h,"TestLoadImage: timeout",!1,l,f),u.setTimeout(function(){f.ontimeout&&f.ontimeout()},1e4),f.src=a}else l(!1)}function dT(a,l){const h=new Br,f=new AbortController,E=setTimeout(()=>{f.abort(),qt(h,"TestPingServer: timeout",!1,l)},1e4);fetch(a,{signal:f.signal}).then(A=>{clearTimeout(E),A.ok?qt(h,"TestPingServer: ok",!0,l):qt(h,"TestPingServer: server error",!1,l)}).catch(()=>{clearTimeout(E),qt(h,"TestPingServer: error",!1,l)})}function qt(a,l,h,f,E){try{E&&(E.onload=null,E.onerror=null,E.onabort=null,E.ontimeout=null),f(h)}catch{}}function fT(){this.g=new K0}function mT(a,l,h){const f=h||"";try{Td(a,function(E,A){let P=E;d(E)&&(P=No(E)),l.push(f+A+"="+encodeURIComponent(P))})}catch(E){throw l.push(f+"type="+encodeURIComponent("_badmap")),E}}function Gr(a){this.l=a.Ub||null,this.j=a.eb||!1}O(Gr,Oo),Gr.prototype.g=function(){return new vs(this.l,this.j)},Gr.prototype.i=function(a){return function(){return a}}({});function vs(a,l){Me.call(this),this.D=a,this.o=l,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}O(vs,Me),n=vs.prototype,n.open=function(a,l){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=a,this.A=l,this.readyState=1,$r(this)},n.send=function(a){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const l={headers:this.u,method:this.B,credentials:this.m,cache:void 0};a&&(l.body=a),(this.D||u).fetch(new Request(this.A,l)).then(this.Sa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,qr(this)),this.readyState=0},n.Sa=function(a){if(this.g&&(this.l=a,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=a.headers,this.readyState=2,$r(this)),this.g&&(this.readyState=3,$r(this),this.g)))if(this.responseType==="arraybuffer")a.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof u.ReadableStream<"u"&&"body"in a){if(this.j=a.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;kd(this)}else a.text().then(this.Ra.bind(this),this.ga.bind(this))};function kd(a){a.j.read().then(a.Pa.bind(a)).catch(a.ga.bind(a))}n.Pa=function(a){if(this.g){if(this.o&&a.value)this.response.push(a.value);else if(!this.o){var l=a.value?a.value:new Uint8Array(0);(l=this.v.decode(l,{stream:!a.done}))&&(this.response=this.responseText+=l)}a.done?qr(this):$r(this),this.readyState==3&&kd(this)}},n.Ra=function(a){this.g&&(this.response=this.responseText=a,qr(this))},n.Qa=function(a){this.g&&(this.response=a,qr(this))},n.ga=function(){this.g&&qr(this)};function qr(a){a.readyState=4,a.l=null,a.j=null,a.v=null,$r(a)}n.setRequestHeader=function(a,l){this.u.append(a,l)},n.getResponseHeader=function(a){return this.h&&this.h.get(a.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";const a=[],l=this.h.entries();for(var h=l.next();!h.done;)h=h.value,a.push(h[0]+": "+h[1]),h=l.next();return a.join(`\r
`)};function $r(a){a.onreadystatechange&&a.onreadystatechange.call(a)}Object.defineProperty(vs.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(a){this.m=a?"include":"same-origin"}});function Pd(a){let l="";return pe(a,function(h,f){l+=f,l+=":",l+=h,l+=`\r
`}),l}function zo(a,l,h){e:{for(f in h){var f=!1;break e}f=!0}f||(h=Pd(h),typeof a=="string"?h!=null&&encodeURIComponent(String(h)):le(a,l,h))}function ce(a){Me.call(this),this.headers=new Map,this.o=a||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}O(ce,Me);var pT=/^https?$/i,gT=["POST","PUT"];n=ce.prototype,n.Ha=function(a){this.J=a},n.ea=function(a,l,h,f){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+a);l=l?l.toUpperCase():"GET",this.D=a,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():xo.g(),this.v=this.o?sd(this.o):sd(xo),this.g.onreadystatechange=S(this.Ea,this);try{this.B=!0,this.g.open(l,String(a),!0),this.B=!1}catch(A){Dd(this,A);return}if(a=h||"",h=new Map(this.headers),f)if(Object.getPrototypeOf(f)===Object.prototype)for(var E in f)h.set(E,f[E]);else if(typeof f.keys=="function"&&typeof f.get=="function")for(const A of f.keys())h.set(A,f.get(A));else throw Error("Unknown input type for opt_headers: "+String(f));f=Array.from(h.keys()).find(A=>A.toLowerCase()=="content-type"),E=u.FormData&&a instanceof u.FormData,!(0<=Array.prototype.indexOf.call(gT,l,void 0))||f||E||h.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[A,P]of h)this.g.setRequestHeader(A,P);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{Od(this),this.u=!0,this.g.send(a),this.u=!1}catch(A){Dd(this,A)}};function Dd(a,l){a.h=!1,a.g&&(a.j=!0,a.g.abort(),a.j=!1),a.l=l,a.m=5,Md(a),ws(a)}function Md(a){a.A||(a.A=!0,Le(a,"complete"),Le(a,"error"))}n.abort=function(a){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=a||7,Le(this,"complete"),Le(this,"abort"),ws(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),ws(this,!0)),ce.aa.N.call(this)},n.Ea=function(){this.s||(this.B||this.u||this.j?Nd(this):this.bb())},n.bb=function(){Nd(this)};function Nd(a){if(a.h&&typeof o<"u"&&(!a.v[1]||St(a)!=4||a.Z()!=2)){if(a.u&&St(a)==4)td(a.Ea,0,a);else if(Le(a,"readystatechange"),St(a)==4){a.h=!1;try{const P=a.Z();e:switch(P){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var l=!0;break e;default:l=!1}var h;if(!(h=l)){var f;if(f=P===0){var E=String(a.D).match(Id)[1]||null;!E&&u.self&&u.self.location&&(E=u.self.location.protocol.slice(0,-1)),f=!pT.test(E?E.toLowerCase():"")}h=f}if(h)Le(a,"complete"),Le(a,"success");else{a.m=6;try{var A=2<St(a)?a.g.statusText:""}catch{A=""}a.l=A+" ["+a.Z()+"]",Md(a)}}finally{ws(a)}}}}function ws(a,l){if(a.g){Od(a);const h=a.g,f=a.v[0]?()=>{}:null;a.g=null,a.v=null,l||Le(a,"ready");try{h.onreadystatechange=f}catch{}}}function Od(a){a.I&&(u.clearTimeout(a.I),a.I=null)}n.isActive=function(){return!!this.g};function St(a){return a.g?a.g.readyState:0}n.Z=function(){try{return 2<St(this)?this.g.status:-1}catch{return-1}},n.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.Oa=function(a){if(this.g){var l=this.g.responseText;return a&&l.indexOf(a)==0&&(l=l.substring(a.length)),j0(l)}};function Vd(a){try{if(!a.g)return null;if("response"in a.g)return a.g.response;switch(a.H){case"":case"text":return a.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in a.g)return a.g.mozResponseArrayBuffer}return null}catch{return null}}function yT(a){const l={};a=(a.g&&2<=St(a)&&a.g.getAllResponseHeaders()||"").split(`\r
`);for(let f=0;f<a.length;f++){if(oe(a[f]))continue;var h=w(a[f]);const E=h[0];if(h=h[1],typeof h!="string")continue;h=h.trim();const A=l[E]||[];l[E]=A,A.push(h)}v(l,function(f){return f.join(", ")})}n.Ba=function(){return this.m},n.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function jr(a,l,h){return h&&h.internalChannelParams&&h.internalChannelParams[a]||l}function Ld(a){this.Aa=0,this.i=[],this.j=new Br,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=jr("failFast",!1,a),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=jr("baseRetryDelayMs",5e3,a),this.cb=jr("retryDelaySeedMs",1e4,a),this.Wa=jr("forwardChannelMaxRetries",2,a),this.wa=jr("forwardChannelRequestTimeoutMs",2e4,a),this.pa=a&&a.xmlHttpFactory||void 0,this.Xa=a&&a.Tb||void 0,this.Ca=a&&a.useFetchStreams||!1,this.L=void 0,this.J=a&&a.supportsCrossDomainXhr||!1,this.K="",this.h=new yd(a&&a.concurrentRequestLimit),this.Da=new fT,this.P=a&&a.fastHandshake||!1,this.O=a&&a.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=a&&a.Rb||!1,a&&a.xa&&this.j.xa(),a&&a.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&a&&a.detectBufferingProxy||!1,this.ja=void 0,a&&a.longPollingTimeout&&0<a.longPollingTimeout&&(this.ja=a.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}n=Ld.prototype,n.la=8,n.G=1,n.connect=function(a,l,h,f){xe(0),this.W=a,this.H=l||{},h&&f!==void 0&&(this.H.OSID=h,this.H.OAID=f),this.F=this.X,this.I=Gd(this,null,this.W),Ts(this)};function Go(a){if(xd(a),a.G==3){var l=a.U++,h=At(a.I);if(le(h,"SID",a.K),le(h,"RID",l),le(h,"TYPE","terminate"),Kr(a,h),l=new zt(a,a.j,l),l.L=2,l.v=_s(At(h)),h=!1,u.navigator&&u.navigator.sendBeacon)try{h=u.navigator.sendBeacon(l.v.toString(),"")}catch{}!h&&u.Image&&(new Image().src=l.v,h=!0),h||(l.g=qd(l.j,null),l.g.ea(l.v)),l.F=Date.now(),ps(l)}zd(a)}function Es(a){a.g&&($o(a),a.g.cancel(),a.g=null)}function xd(a){Es(a),a.u&&(u.clearTimeout(a.u),a.u=null),Is(a),a.h.cancel(),a.s&&(typeof a.s=="number"&&u.clearTimeout(a.s),a.s=null)}function Ts(a){if(!_d(a.h)&&!a.s){a.s=!0;var l=a.Ga;Nr||Qc(),Or||(Nr(),Or=!0),So.add(l,a),a.B=0}}function _T(a,l){return vd(a.h)>=a.h.j-(a.s?1:0)?!1:a.s?(a.i=l.D.concat(a.i),!0):a.G==1||a.G==2||a.B>=(a.Va?0:a.Wa)?!1:(a.s=Ur(S(a.Ga,a,l),Yd(a,a.B)),a.B++,!0)}n.Ga=function(a){if(this.s)if(this.s=null,this.G==1){if(!a){this.U=Math.floor(1e5*Math.random()),a=this.U++;const E=new zt(this,this.j,a);let A=this.o;if(this.S&&(A?(A=p(A),_(A,this.S)):A=this.S),this.m!==null||this.O||(E.H=A,A=null),this.P)e:{for(var l=0,h=0;h<this.i.length;h++){t:{var f=this.i[h];if("__data__"in f.map&&(f=f.map.__data__,typeof f=="string")){f=f.length;break t}f=void 0}if(f===void 0)break;if(l+=f,4096<l){l=h;break e}if(l===4096||h===this.i.length-1){l=h+1;break e}}l=1e3}else l=1e3;l=Ud(this,E,l),h=At(this.I),le(h,"RID",a),le(h,"CVER",22),this.D&&le(h,"X-HTTP-Session-Id",this.D),Kr(this,h),A&&(this.O?l="headers="+encodeURIComponent(String(Pd(A)))+"&"+l:this.m&&zo(h,this.m,A)),Yo(this.h,E),this.Ua&&le(h,"TYPE","init"),this.P?(le(h,"$req",l),le(h,"SID","null"),E.T=!0,Uo(E,h,null)):Uo(E,h,l),this.G=2}}else this.G==3&&(a?Fd(this,a):this.i.length==0||_d(this.h)||Fd(this))};function Fd(a,l){var h;l?h=l.l:h=a.U++;const f=At(a.I);le(f,"SID",a.K),le(f,"RID",h),le(f,"AID",a.T),Kr(a,f),a.m&&a.o&&zo(f,a.m,a.o),h=new zt(a,a.j,h,a.B+1),a.m===null&&(h.H=a.o),l&&(a.i=l.D.concat(a.i)),l=Ud(a,h,1e3),h.I=Math.round(.5*a.wa)+Math.round(.5*a.wa*Math.random()),Yo(a.h,h),Uo(h,f,l)}function Kr(a,l){a.H&&pe(a.H,function(h,f){le(l,f,h)}),a.l&&Td({},function(h,f){le(l,f,h)})}function Ud(a,l,h){h=Math.min(a.i.length,h);var f=a.l?S(a.l.Na,a.l,a):null;e:{var E=a.i;let A=-1;for(;;){const P=["count="+h];A==-1?0<h?(A=E[0].g,P.push("ofs="+A)):A=0:P.push("ofs="+A);let re=!0;for(let Ce=0;Ce<h;Ce++){let X=E[Ce].g;const Ne=E[Ce].map;if(X-=A,0>X)A=Math.max(0,E[Ce].g-100),re=!1;else try{mT(Ne,P,"req"+X+"_")}catch{f&&f(Ne)}}if(re){f=P.join("&");break e}}}return a=a.i.splice(0,h),l.D=a,f}function Bd(a){if(!a.g&&!a.u){a.Y=1;var l=a.Fa;Nr||Qc(),Or||(Nr(),Or=!0),So.add(l,a),a.v=0}}function qo(a){return a.g||a.u||3<=a.v?!1:(a.Y++,a.u=Ur(S(a.Fa,a),Yd(a,a.v)),a.v++,!0)}n.Fa=function(){if(this.u=null,Hd(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var a=2*this.R;this.j.info("BP detection timer enabled: "+a),this.A=Ur(S(this.ab,this),a)}},n.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,xe(10),Es(this),Hd(this))};function $o(a){a.A!=null&&(u.clearTimeout(a.A),a.A=null)}function Hd(a){a.g=new zt(a,a.j,"rpc",a.Y),a.m===null&&(a.g.H=a.o),a.g.O=0;var l=At(a.qa);le(l,"RID","rpc"),le(l,"SID",a.K),le(l,"AID",a.T),le(l,"CI",a.F?"0":"1"),!a.F&&a.ja&&le(l,"TO",a.ja),le(l,"TYPE","xmlhttp"),Kr(a,l),a.m&&a.o&&zo(l,a.m,a.o),a.L&&(a.g.I=a.L);var h=a.g;a=a.ia,h.L=1,h.v=_s(At(l)),h.m=null,h.P=!0,md(h,a)}n.Za=function(){this.C!=null&&(this.C=null,Es(this),qo(this),xe(19))};function Is(a){a.C!=null&&(u.clearTimeout(a.C),a.C=null)}function Wd(a,l){var h=null;if(a.g==l){Is(a),$o(a),a.g=null;var f=2}else if(Wo(a.h,l))h=l.D,wd(a.h,l),f=1;else return;if(a.G!=0){if(l.o)if(f==1){h=l.m?l.m.length:0,l=Date.now()-l.F;var E=a.B;f=ds(),Le(f,new hd(f,h)),Ts(a)}else Bd(a);else if(E=l.s,E==3||E==0&&0<l.X||!(f==1&&_T(a,l)||f==2&&qo(a)))switch(h&&0<h.length&&(l=a.h,l.i=l.i.concat(h)),E){case 1:mn(a,5);break;case 4:mn(a,10);break;case 3:mn(a,6);break;default:mn(a,2)}}}function Yd(a,l){let h=a.Ta+Math.floor(Math.random()*a.cb);return a.isActive()||(h*=2),h*l}function mn(a,l){if(a.j.info("Error code "+l),l==2){var h=S(a.fb,a),f=a.Xa;const E=!f;f=new fn(f||"//www.google.com/images/cleardot.gif"),u.location&&u.location.protocol=="http"||gs(f,"https"),_s(f),E?cT(f.toString(),h):dT(f.toString(),h)}else xe(2);a.G=0,a.l&&a.l.sa(l),zd(a),xd(a)}n.fb=function(a){a?(this.j.info("Successfully pinged google.com"),xe(2)):(this.j.info("Failed to ping google.com"),xe(1))};function zd(a){if(a.G=0,a.ka=[],a.l){const l=Ed(a.h);(l.length!=0||a.i.length!=0)&&(M(a.ka,l),M(a.ka,a.i),a.h.i.length=0,x(a.i),a.i.length=0),a.l.ra()}}function Gd(a,l,h){var f=h instanceof fn?At(h):new fn(h);if(f.g!="")l&&(f.g=l+"."+f.g),ys(f,f.s);else{var E=u.location;f=E.protocol,l=l?l+"."+E.hostname:E.hostname,E=+E.port;var A=new fn(null);f&&gs(A,f),l&&(A.g=l),E&&ys(A,E),h&&(A.l=h),f=A}return h=a.D,l=a.ya,h&&l&&le(f,h,l),le(f,"VER",a.la),Kr(a,f),f}function qd(a,l,h){if(l&&!a.J)throw Error("Can't create secondary domain capable XhrIo object.");return l=a.Ca&&!a.pa?new ce(new Gr({eb:h})):new ce(a.pa),l.Ha(a.J),l}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function $d(){}n=$d.prototype,n.ua=function(){},n.ta=function(){},n.sa=function(){},n.ra=function(){},n.isActive=function(){return!0},n.Na=function(){};function As(){}As.prototype.g=function(a,l){return new He(a,l)};function He(a,l){Me.call(this),this.g=new Ld(l),this.l=a,this.h=l&&l.messageUrlParams||null,a=l&&l.messageHeaders||null,l&&l.clientProtocolHeaderRequired&&(a?a["X-Client-Protocol"]="webchannel":a={"X-Client-Protocol":"webchannel"}),this.g.o=a,a=l&&l.initMessageHeaders||null,l&&l.messageContentType&&(a?a["X-WebChannel-Content-Type"]=l.messageContentType:a={"X-WebChannel-Content-Type":l.messageContentType}),l&&l.va&&(a?a["X-WebChannel-Client-Profile"]=l.va:a={"X-WebChannel-Client-Profile":l.va}),this.g.S=a,(a=l&&l.Sb)&&!oe(a)&&(this.g.m=a),this.v=l&&l.supportsCrossDomainXhr||!1,this.u=l&&l.sendRawJson||!1,(l=l&&l.httpSessionIdParam)&&!oe(l)&&(this.g.D=l,a=this.h,a!==null&&l in a&&(a=this.h,l in a&&delete a[l])),this.j=new qn(this)}O(He,Me),He.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},He.prototype.close=function(){Go(this.g)},He.prototype.o=function(a){var l=this.g;if(typeof a=="string"){var h={};h.__data__=a,a=h}else this.u&&(h={},h.__data__=No(a),a=h);l.i.push(new tT(l.Ya++,a)),l.G==3&&Ts(l)},He.prototype.N=function(){this.g.l=null,delete this.j,Go(this.g),delete this.g,He.aa.N.call(this)};function jd(a){Vo.call(this),a.__headers__&&(this.headers=a.__headers__,this.statusCode=a.__status__,delete a.__headers__,delete a.__status__);var l=a.__sm__;if(l){e:{for(const h in l){a=h;break e}a=void 0}(this.i=a)&&(a=this.i,l=l!==null&&a in l?l[a]:void 0),this.data=l}else this.data=a}O(jd,Vo);function Kd(){Lo.call(this),this.status=1}O(Kd,Lo);function qn(a){this.g=a}O(qn,$d),qn.prototype.ua=function(){Le(this.g,"a")},qn.prototype.ta=function(a){Le(this.g,new jd(a))},qn.prototype.sa=function(a){Le(this.g,new Kd)},qn.prototype.ra=function(){Le(this.g,"b")},As.prototype.createWebChannel=As.prototype.g,He.prototype.send=He.prototype.o,He.prototype.open=He.prototype.m,He.prototype.close=He.prototype.close,uh=function(){return new As},lh=function(){return ds()},oh=cn,Pa={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},fs.NO_ERROR=0,fs.TIMEOUT=8,fs.HTTP_ERROR=6,Ui=fs,cd.COMPLETE="complete",ah=cd,ad.EventType=xr,xr.OPEN="a",xr.CLOSE="b",xr.ERROR="c",xr.MESSAGE="d",Me.prototype.listen=Me.prototype.K,mr=ad,sh=Gr,ce.prototype.listenOnce=ce.prototype.L,ce.prototype.getLastError=ce.prototype.Ka,ce.prototype.getLastErrorCode=ce.prototype.Ba,ce.prototype.getStatus=ce.prototype.Z,ce.prototype.getResponseJson=ce.prototype.Oa,ce.prototype.getResponseText=ce.prototype.oa,ce.prototype.send=ce.prototype.ea,ce.prototype.setWithCredentials=ce.prototype.Ha,ih=ce}).apply(typeof Fi<"u"?Fi:typeof self<"u"?self:typeof window<"u"?window:{});const hh="@firebase/firestore";/**
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
 */class Re{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}Re.UNAUTHENTICATED=new Re(null),Re.GOOGLE_CREDENTIALS=new Re("google-credentials-uid"),Re.FIRST_PARTY=new Re("first-party-uid"),Re.MOCK_USER=new Re("mock-user");/**
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
 */let kn="10.12.5";/**
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
 */const xt=new ca("@firebase/firestore");function pr(){return xt.logLevel}function Wv(n){xt.setLogLevel(n)}function V(n,...e){if(xt.logLevel<=z.DEBUG){const t=e.map(Da);xt.debug(`Firestore (${kn}): ${n}`,...t)}}function Et(n,...e){if(xt.logLevel<=z.ERROR){const t=e.map(Da);xt.error(`Firestore (${kn}): ${n}`,...t)}}function Pn(n,...e){if(xt.logLevel<=z.WARN){const t=e.map(Da);xt.warn(`Firestore (${kn}): ${n}`,...t)}}function Da(n){if(typeof n=="string")return n;try{/**
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
*/return function(t){return JSON.stringify(t)}(n)}catch{return n}}/**
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
 */function W(n="Unexpected state"){const e=`FIRESTORE (${kn}) INTERNAL ASSERTION FAILED: `+n;throw Et(e),new Error(e)}function ge(n,e){n||W()}function q(n,e){return n}/**
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
 */const D={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class F extends Pt{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
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
 */class Dn{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}}/**
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
 */class ch{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class Yv{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable(()=>t(Re.UNAUTHENTICATED))}shutdown(){}}class zv{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable(()=>t(this.token.user))}shutdown(){this.changeListener=null}}class Gv{constructor(e){this.t=e,this.currentUser=Re.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){let r=this.i;const i=c=>this.i!==r?(r=this.i,t(c)):Promise.resolve();let s=new Dn;this.o=()=>{this.i++,this.currentUser=this.u(),s.resolve(),s=new Dn,e.enqueueRetryable(()=>i(this.currentUser))};const o=()=>{const c=s;e.enqueueRetryable(async()=>{await c.promise,await i(this.currentUser)})},u=c=>{V("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=c,this.auth.addAuthTokenListener(this.o),o()};this.t.onInit(c=>u(c)),setTimeout(()=>{if(!this.auth){const c=this.t.getImmediate({optional:!0});c?u(c):(V("FirebaseAuthCredentialsProvider","Auth not yet detected"),s.resolve(),s=new Dn)}},0),o()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then(r=>this.i!==e?(V("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(ge(typeof r.accessToken=="string"),new ch(r.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.auth.removeAuthTokenListener(this.o)}u(){const e=this.auth&&this.auth.getUid();return ge(e===null||typeof e=="string"),new Re(e)}}class qv{constructor(e,t,r){this.l=e,this.h=t,this.P=r,this.type="FirstParty",this.user=Re.FIRST_PARTY,this.I=new Map}T(){return this.P?this.P():null}get headers(){this.I.set("X-Goog-AuthUser",this.l);const e=this.T();return e&&this.I.set("Authorization",e),this.h&&this.I.set("X-Goog-Iam-Authorization-Token",this.h),this.I}}class $v{constructor(e,t,r){this.l=e,this.h=t,this.P=r}getToken(){return Promise.resolve(new qv(this.l,this.h,this.P))}start(e,t){e.enqueueRetryable(()=>t(Re.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class jv{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class Kv{constructor(e){this.A=e,this.forceRefresh=!1,this.appCheck=null,this.R=null}start(e,t){const r=s=>{s.error!=null&&V("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${s.error.message}`);const o=s.token!==this.R;return this.R=s.token,V("FirebaseAppCheckTokenProvider",`Received ${o?"new":"existing"} token.`),o?t(s.token):Promise.resolve()};this.o=s=>{e.enqueueRetryable(()=>r(s))};const i=s=>{V("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=s,this.appCheck.addTokenListener(this.o)};this.A.onInit(s=>i(s)),setTimeout(()=>{if(!this.appCheck){const s=this.A.getImmediate({optional:!0});s?i(s):V("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(t=>t?(ge(typeof t.token=="string"),this.R=t.token,new jv(t.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.appCheck.removeTokenListener(this.o)}}/**
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
 */function Qv(n){const e=typeof self<"u"&&(self.crypto||self.msCrypto),t=new Uint8Array(n);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let r=0;r<n;r++)t[r]=Math.floor(256*Math.random());return t}/**
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
 */class dh{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=Math.floor(256/e.length)*e.length;let r="";for(;r.length<20;){const i=Qv(40);for(let s=0;s<i.length;++s)r.length<20&&i[s]<t&&(r+=e.charAt(i[s]%e.length))}return r}}function ee(n,e){return n<e?-1:n>e?1:0}function Mn(n,e,t){return n.length===e.length&&n.every((r,i)=>t(r,e[i]))}/**
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
 */class Ue{constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new F(D.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new F(D.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<-62135596800)throw new F(D.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new F(D.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}static now(){return Ue.fromMillis(Date.now())}static fromDate(e){return Ue.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),r=Math.floor(1e6*(e-1e3*t));return new Ue(t,r)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/1e6}_compareTo(e){return this.seconds===e.seconds?ee(this.nanoseconds,e.nanoseconds):ee(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){const e=this.seconds- -62135596800;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}/**
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
 */class B{constructor(e){this.timestamp=e}static fromTimestamp(e){return new B(e)}static min(){return new B(new Ue(0,0))}static max(){return new B(new Ue(253402300799,999999999))}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
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
 */class gr{constructor(e,t,r){t===void 0?t=0:t>e.length&&W(),r===void 0?r=e.length-t:r>e.length-t&&W(),this.segments=e,this.offset=t,this.len=r}get length(){return this.len}isEqual(e){return gr.comparator(this,e)===0}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof gr?e.forEach(r=>{t.push(r)}):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,r=this.limit();t<r;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const r=Math.min(e.length,t.length);for(let i=0;i<r;i++){const s=e.get(i),o=t.get(i);if(s<o)return-1;if(s>o)return 1}return e.length<t.length?-1:e.length>t.length?1:0}}class he extends gr{construct(e,t,r){return new he(e,t,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const r of e){if(r.indexOf("//")>=0)throw new F(D.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);t.push(...r.split("/").filter(i=>i.length>0))}return new he(t)}static emptyPath(){return new he([])}}const Jv=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class Ve extends gr{construct(e,t,r){return new Ve(e,t,r)}static isValidIdentifier(e){return Jv.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),Ve.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)==="__name__"}static keyField(){return new Ve(["__name__"])}static fromServerFormat(e){const t=[];let r="",i=0;const s=()=>{if(r.length===0)throw new F(D.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(r),r=""};let o=!1;for(;i<e.length;){const u=e[i];if(u==="\\"){if(i+1===e.length)throw new F(D.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const c=e[i+1];if(c!=="\\"&&c!=="."&&c!=="`")throw new F(D.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=c,i+=2}else u==="`"?(o=!o,i++):u!=="."||o?(r+=u,i++):(s(),i++)}if(s(),o)throw new F(D.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new Ve(t)}static emptyPath(){return new Ve([])}}/**
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
 */class U{constructor(e){this.path=e}static fromPath(e){return new U(he.fromString(e))}static fromName(e){return new U(he.fromString(e).popFirst(5))}static empty(){return new U(he.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&he.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return he.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new U(new he(e.slice()))}}function Xv(n,e){const t=n.toTimestamp().seconds,r=n.toTimestamp().nanoseconds+1,i=B.fromTimestamp(r===1e9?new Ue(t+1,0):new Ue(t,r));return new Ft(i,U.empty(),e)}function Zv(n){return new Ft(n.readTime,n.key,-1)}class Ft{constructor(e,t,r){this.readTime=e,this.documentKey=t,this.largestBatchId=r}static min(){return new Ft(B.min(),U.empty(),-1)}static max(){return new Ft(B.max(),U.empty(),-1)}}function ew(n,e){let t=n.readTime.compareTo(e.readTime);return t!==0?t:(t=U.comparator(n.documentKey,e.documentKey),t!==0?t:ee(n.largestBatchId,e.largestBatchId))}/**
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
 */const tw="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class nw{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}/**
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
 */async function Ma(n){if(n.code!==D.FAILED_PRECONDITION||n.message!==tw)throw n;V("LocalStore","Unexpectedly lost primary lease")}/**
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
 */class C{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)},t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)})}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&W(),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new C((r,i)=>{this.nextCallback=s=>{this.wrapSuccess(e,s).next(r,i)},this.catchCallback=s=>{this.wrapFailure(t,s).next(r,i)}})}toPromise(){return new Promise((e,t)=>{this.next(e,t)})}wrapUserFunction(e){try{const t=e();return t instanceof C?t:C.resolve(t)}catch(t){return C.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction(()=>e(t)):C.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction(()=>e(t)):C.reject(t)}static resolve(e){return new C((t,r)=>{t(e)})}static reject(e){return new C((t,r)=>{r(e)})}static waitFor(e){return new C((t,r)=>{let i=0,s=0,o=!1;e.forEach(u=>{++i,u.next(()=>{++s,o&&s===i&&t()},c=>r(c))}),o=!0,s===i&&t()})}static or(e){let t=C.resolve(!1);for(const r of e)t=t.next(i=>i?C.resolve(i):r());return t}static forEach(e,t){const r=[];return e.forEach((i,s)=>{r.push(t.call(this,i,s))}),this.waitFor(r)}static mapArray(e,t){return new C((r,i)=>{const s=e.length,o=new Array(s);let u=0;for(let c=0;c<s;c++){const d=c;t(e[d]).next(m=>{o[d]=m,++u,u===s&&r(o)},m=>i(m))}})}static doWhile(e,t){return new C((r,i)=>{const s=()=>{e()===!0?t().next(()=>{s()},i):r()};s()})}}function rw(n){const e=n.match(/Android ([\d.]+)/i),t=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(t)}function yr(n){return n.name==="IndexedDbTransactionError"}/**
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
 */class Na{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=r=>this.ie(r),this.se=r=>t.writeSequenceNumber(r))}ie(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.se&&this.se(e),e}}Na.oe=-1;function Bi(n){return n==null}function Oa(n){return n===0&&1/n==-1/0}/**
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
 */function fh(n){let e=0;for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e++;return e}function Hi(n,e){for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e(t,n[t])}function iw(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}/**
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
 */class fe{constructor(e,t){this.comparator=e,this.root=t||Ie.EMPTY}insert(e,t){return new fe(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,Ie.BLACK,null,null))}remove(e){return new fe(this.comparator,this.root.remove(e,this.comparator).copy(null,null,Ie.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const r=this.comparator(e,t.key);if(r===0)return t.value;r<0?t=t.left:r>0&&(t=t.right)}return null}indexOf(e){let t=0,r=this.root;for(;!r.isEmpty();){const i=this.comparator(e,r.key);if(i===0)return t+r.left.size;i<0?r=r.left:(t+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((t,r)=>(e(t,r),!1))}toString(){const e=[];return this.inorderTraversal((t,r)=>(e.push(`${t}:${r}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new Wi(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new Wi(this.root,e,this.comparator,!1)}getReverseIterator(){return new Wi(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new Wi(this.root,e,this.comparator,!0)}}class Wi{constructor(e,t,r,i){this.isReverse=i,this.nodeStack=[];let s=1;for(;!e.isEmpty();)if(s=t?r(e.key,t):1,t&&i&&(s*=-1),s<0)e=this.isReverse?e.left:e.right;else{if(s===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class Ie{constructor(e,t,r,i,s){this.key=e,this.value=t,this.color=r??Ie.RED,this.left=i??Ie.EMPTY,this.right=s??Ie.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,r,i,s){return new Ie(e??this.key,t??this.value,r??this.color,i??this.left,s??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,r){let i=this;const s=r(e,i.key);return i=s<0?i.copy(null,null,null,i.left.insert(e,t,r),null):s===0?i.copy(null,t,null,null,null):i.copy(null,null,null,null,i.right.insert(e,t,r)),i.fixUp()}removeMin(){if(this.left.isEmpty())return Ie.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let r,i=this;if(t(e,i.key)<0)i.left.isEmpty()||i.left.isRed()||i.left.left.isRed()||(i=i.moveRedLeft()),i=i.copy(null,null,null,i.left.remove(e,t),null);else{if(i.left.isRed()&&(i=i.rotateRight()),i.right.isEmpty()||i.right.isRed()||i.right.left.isRed()||(i=i.moveRedRight()),t(e,i.key)===0){if(i.right.isEmpty())return Ie.EMPTY;r=i.right.min(),i=i.copy(r.key,r.value,null,null,i.right.removeMin())}i=i.copy(null,null,null,null,i.right.remove(e,t))}return i.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,Ie.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,Ie.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed()||this.right.isRed())throw W();const e=this.left.check();if(e!==this.right.check())throw W();return e+(this.isRed()?0:1)}}Ie.EMPTY=null,Ie.RED=!0,Ie.BLACK=!1,Ie.EMPTY=new class{constructor(){this.size=0}get key(){throw W()}get value(){throw W()}get color(){throw W()}get left(){throw W()}get right(){throw W()}copy(e,t,r,i,s){return this}insert(e,t,r){return new Ie(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
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
 */class Ae{constructor(e){this.comparator=e,this.data=new fe(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((t,r)=>(e(t),!1))}forEachInRange(e,t){const r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){const i=r.getNext();if(this.comparator(i.key,e[1])>=0)return;t(i.key)}}forEachWhile(e,t){let r;for(r=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new mh(this.data.getIterator())}getIteratorFrom(e){return new mh(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach(r=>{t=t.add(r)}),t}isEqual(e){if(!(e instanceof Ae)||this.size!==e.size)return!1;const t=this.data.getIterator(),r=e.data.getIterator();for(;t.hasNext();){const i=t.getNext().key,s=r.getNext().key;if(this.comparator(i,s)!==0)return!1}return!0}toArray(){const e=[];return this.forEach(t=>{e.push(t)}),e}toString(){const e=[];return this.forEach(t=>e.push(t)),"SortedSet("+e.toString()+")"}copy(e){const t=new Ae(this.comparator);return t.data=e,t}}class mh{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
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
 */class Ut{constructor(e){this.fields=e,e.sort(Ve.comparator)}static empty(){return new Ut([])}unionWith(e){let t=new Ae(Ve.comparator);for(const r of this.fields)t=t.add(r);for(const r of e)t=t.add(r);return new Ut(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return Mn(this.fields,e.fields,(t,r)=>t.isEqual(r))}}/**
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
 */class ph extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
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
 */class Se{constructor(e){this.binaryString=e}static fromBase64String(e){const t=function(i){try{return atob(i)}catch(s){throw typeof DOMException<"u"&&s instanceof DOMException?new ph("Invalid base64 string: "+s):s}}(e);return new Se(t)}static fromUint8Array(e){const t=function(i){let s="";for(let o=0;o<i.length;++o)s+=String.fromCharCode(i[o]);return s}(e);return new Se(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(t){return btoa(t)}(this.binaryString)}toUint8Array(){return function(t){const r=new Uint8Array(t.length);for(let i=0;i<t.length;i++)r[i]=t.charCodeAt(i);return r}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return ee(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}Se.EMPTY_BYTE_STRING=new Se("");const sw=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function Bt(n){if(ge(!!n),typeof n=="string"){let e=0;const t=sw.exec(n);if(ge(!!t),t[1]){let i=t[1];i=(i+"000000000").substr(0,9),e=Number(i)}const r=new Date(n);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:ye(n.seconds),nanos:ye(n.nanos)}}function ye(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function on(n){return typeof n=="string"?Se.fromBase64String(n):Se.fromUint8Array(n)}/**
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
 */function Va(n){var e,t;return((t=(((e=n==null?void 0:n.mapValue)===null||e===void 0?void 0:e.fields)||{}).__type__)===null||t===void 0?void 0:t.stringValue)==="server_timestamp"}function La(n){const e=n.mapValue.fields.__previous_value__;return Va(e)?La(e):e}function _r(n){const e=Bt(n.mapValue.fields.__local_write_time__.timestampValue);return new Ue(e.seconds,e.nanos)}/**
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
 */class aw{constructor(e,t,r,i,s,o,u,c,d){this.databaseId=e,this.appId=t,this.persistenceKey=r,this.host=i,this.ssl=s,this.forceLongPolling=o,this.autoDetectLongPolling=u,this.longPollingOptions=c,this.useFetchStreams=d}}class vr{constructor(e,t){this.projectId=e,this.database=t||"(default)"}static empty(){return new vr("","")}get isDefaultDatabase(){return this.database==="(default)"}isEqual(e){return e instanceof vr&&e.projectId===this.projectId&&e.database===this.database}}/**
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
 */const Yi={mapValue:{fields:{__type__:{stringValue:"__max__"}}}};function ln(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?Va(n)?4:ow(n)?9007199254740991:10:W()}function at(n,e){if(n===e)return!0;const t=ln(n);if(t!==ln(e))return!1;switch(t){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===e.booleanValue;case 4:return _r(n).isEqual(_r(e));case 3:return function(i,s){if(typeof i.timestampValue=="string"&&typeof s.timestampValue=="string"&&i.timestampValue.length===s.timestampValue.length)return i.timestampValue===s.timestampValue;const o=Bt(i.timestampValue),u=Bt(s.timestampValue);return o.seconds===u.seconds&&o.nanos===u.nanos}(n,e);case 5:return n.stringValue===e.stringValue;case 6:return function(i,s){return on(i.bytesValue).isEqual(on(s.bytesValue))}(n,e);case 7:return n.referenceValue===e.referenceValue;case 8:return function(i,s){return ye(i.geoPointValue.latitude)===ye(s.geoPointValue.latitude)&&ye(i.geoPointValue.longitude)===ye(s.geoPointValue.longitude)}(n,e);case 2:return function(i,s){if("integerValue"in i&&"integerValue"in s)return ye(i.integerValue)===ye(s.integerValue);if("doubleValue"in i&&"doubleValue"in s){const o=ye(i.doubleValue),u=ye(s.doubleValue);return o===u?Oa(o)===Oa(u):isNaN(o)&&isNaN(u)}return!1}(n,e);case 9:return Mn(n.arrayValue.values||[],e.arrayValue.values||[],at);case 10:return function(i,s){const o=i.mapValue.fields||{},u=s.mapValue.fields||{};if(fh(o)!==fh(u))return!1;for(const c in o)if(o.hasOwnProperty(c)&&(u[c]===void 0||!at(o[c],u[c])))return!1;return!0}(n,e);default:return W()}}function wr(n,e){return(n.values||[]).find(t=>at(t,e))!==void 0}function Nn(n,e){if(n===e)return 0;const t=ln(n),r=ln(e);if(t!==r)return ee(t,r);switch(t){case 0:case 9007199254740991:return 0;case 1:return ee(n.booleanValue,e.booleanValue);case 2:return function(s,o){const u=ye(s.integerValue||s.doubleValue),c=ye(o.integerValue||o.doubleValue);return u<c?-1:u>c?1:u===c?0:isNaN(u)?isNaN(c)?0:-1:1}(n,e);case 3:return gh(n.timestampValue,e.timestampValue);case 4:return gh(_r(n),_r(e));case 5:return ee(n.stringValue,e.stringValue);case 6:return function(s,o){const u=on(s),c=on(o);return u.compareTo(c)}(n.bytesValue,e.bytesValue);case 7:return function(s,o){const u=s.split("/"),c=o.split("/");for(let d=0;d<u.length&&d<c.length;d++){const m=ee(u[d],c[d]);if(m!==0)return m}return ee(u.length,c.length)}(n.referenceValue,e.referenceValue);case 8:return function(s,o){const u=ee(ye(s.latitude),ye(o.latitude));return u!==0?u:ee(ye(s.longitude),ye(o.longitude))}(n.geoPointValue,e.geoPointValue);case 9:return function(s,o){const u=s.values||[],c=o.values||[];for(let d=0;d<u.length&&d<c.length;++d){const m=Nn(u[d],c[d]);if(m)return m}return ee(u.length,c.length)}(n.arrayValue,e.arrayValue);case 10:return function(s,o){if(s===Yi.mapValue&&o===Yi.mapValue)return 0;if(s===Yi.mapValue)return 1;if(o===Yi.mapValue)return-1;const u=s.fields||{},c=Object.keys(u),d=o.fields||{},m=Object.keys(d);c.sort(),m.sort();for(let T=0;T<c.length&&T<m.length;++T){const S=ee(c[T],m[T]);if(S!==0)return S;const R=Nn(u[c[T]],d[m[T]]);if(R!==0)return R}return ee(c.length,m.length)}(n.mapValue,e.mapValue);default:throw W()}}function gh(n,e){if(typeof n=="string"&&typeof e=="string"&&n.length===e.length)return ee(n,e);const t=Bt(n),r=Bt(e),i=ee(t.seconds,r.seconds);return i!==0?i:ee(t.nanos,r.nanos)}function On(n){return xa(n)}function xa(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?function(t){const r=Bt(t);return`time(${r.seconds},${r.nanos})`}(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?function(t){return on(t).toBase64()}(n.bytesValue):"referenceValue"in n?function(t){return U.fromName(t).toString()}(n.referenceValue):"geoPointValue"in n?function(t){return`geo(${t.latitude},${t.longitude})`}(n.geoPointValue):"arrayValue"in n?function(t){let r="[",i=!0;for(const s of t.values||[])i?i=!1:r+=",",r+=xa(s);return r+"]"}(n.arrayValue):"mapValue"in n?function(t){const r=Object.keys(t.fields||{}).sort();let i="{",s=!0;for(const o of r)s?s=!1:i+=",",i+=`${o}:${xa(t.fields[o])}`;return i+"}"}(n.mapValue):W()}function Fa(n){return!!n&&"integerValue"in n}function Ua(n){return!!n&&"arrayValue"in n}function yh(n){return!!n&&"nullValue"in n}function _h(n){return!!n&&"doubleValue"in n&&isNaN(Number(n.doubleValue))}function Ba(n){return!!n&&"mapValue"in n}function Er(n){if(n.geoPointValue)return{geoPointValue:Object.assign({},n.geoPointValue)};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:Object.assign({},n.timestampValue)};if(n.mapValue){const e={mapValue:{fields:{}}};return Hi(n.mapValue.fields,(t,r)=>e.mapValue.fields[t]=Er(r)),e}if(n.arrayValue){const e={arrayValue:{values:[]}};for(let t=0;t<(n.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=Er(n.arrayValue.values[t]);return e}return Object.assign({},n)}function ow(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue==="__max__"}/**
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
 */class ot{constructor(e){this.value=e}static empty(){return new ot({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let r=0;r<e.length-1;++r)if(t=(t.mapValue.fields||{})[e.get(r)],!Ba(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=Er(t)}setAll(e){let t=Ve.emptyPath(),r={},i=[];e.forEach((o,u)=>{if(!t.isImmediateParentOf(u)){const c=this.getFieldsMap(t);this.applyChanges(c,r,i),r={},i=[],t=u.popLast()}o?r[u.lastSegment()]=Er(o):i.push(u.lastSegment())});const s=this.getFieldsMap(t);this.applyChanges(s,r,i)}delete(e){const t=this.field(e.popLast());Ba(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return at(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let r=0;r<e.length;++r){let i=t.mapValue.fields[e.get(r)];Ba(i)&&i.mapValue.fields||(i={mapValue:{fields:{}}},t.mapValue.fields[e.get(r)]=i),t=i}return t.mapValue.fields}applyChanges(e,t,r){Hi(t,(i,s)=>e[i]=s);for(const i of r)delete e[i]}clone(){return new ot(Er(this.value))}}/**
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
 */class ke{constructor(e,t,r,i,s,o,u){this.key=e,this.documentType=t,this.version=r,this.readTime=i,this.createTime=s,this.data=o,this.documentState=u}static newInvalidDocument(e){return new ke(e,0,B.min(),B.min(),B.min(),ot.empty(),0)}static newFoundDocument(e,t,r,i){return new ke(e,1,t,B.min(),r,i,0)}static newNoDocument(e,t){return new ke(e,2,t,B.min(),B.min(),ot.empty(),0)}static newUnknownDocument(e,t){return new ke(e,3,t,B.min(),B.min(),ot.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(B.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=ot.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=ot.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=B.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof ke&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new ke(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
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
 */class zi{constructor(e,t){this.position=e,this.inclusive=t}}function vh(n,e,t){let r=0;for(let i=0;i<n.position.length;i++){const s=e[i],o=n.position[i];if(s.field.isKeyField()?r=U.comparator(U.fromName(o.referenceValue),t.key):r=Nn(o,t.data.field(s.field)),s.dir==="desc"&&(r*=-1),r!==0)break}return r}function wh(n,e){if(n===null)return e===null;if(e===null||n.inclusive!==e.inclusive||n.position.length!==e.position.length)return!1;for(let t=0;t<n.position.length;t++)if(!at(n.position[t],e.position[t]))return!1;return!0}/**
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
 */class Gi{constructor(e,t="asc"){this.field=e,this.dir=t}}function lw(n,e){return n.dir===e.dir&&n.field.isEqual(e.field)}/**
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
 */class Eh{}class we extends Eh{constructor(e,t,r){super(),this.field=e,this.op=t,this.value=r}static create(e,t,r){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,r):new hw(e,t,r):t==="array-contains"?new fw(e,r):t==="in"?new mw(e,r):t==="not-in"?new pw(e,r):t==="array-contains-any"?new gw(e,r):new we(e,t,r)}static createKeyFieldInFilter(e,t,r){return t==="in"?new cw(e,r):new dw(e,r)}matches(e){const t=e.data.field(this.field);return this.op==="!="?t!==null&&this.matchesComparison(Nn(t,this.value)):t!==null&&ln(this.value)===ln(t)&&this.matchesComparison(Nn(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return W()}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class lt extends Eh{constructor(e,t){super(),this.filters=e,this.op=t,this.ae=null}static create(e,t){return new lt(e,t)}matches(e){return Th(this)?this.filters.find(t=>!t.matches(e))===void 0:this.filters.find(t=>t.matches(e))!==void 0}getFlattenedFilters(){return this.ae!==null||(this.ae=this.filters.reduce((e,t)=>e.concat(t.getFlattenedFilters()),[])),this.ae}getFilters(){return Object.assign([],this.filters)}}function Th(n){return n.op==="and"}function Ih(n){return uw(n)&&Th(n)}function uw(n){for(const e of n.filters)if(e instanceof lt)return!1;return!0}function Ha(n){if(n instanceof we)return n.field.canonicalString()+n.op.toString()+On(n.value);if(Ih(n))return n.filters.map(e=>Ha(e)).join(",");{const e=n.filters.map(t=>Ha(t)).join(",");return`${n.op}(${e})`}}function Ah(n,e){return n instanceof we?function(r,i){return i instanceof we&&r.op===i.op&&r.field.isEqual(i.field)&&at(r.value,i.value)}(n,e):n instanceof lt?function(r,i){return i instanceof lt&&r.op===i.op&&r.filters.length===i.filters.length?r.filters.reduce((s,o,u)=>s&&Ah(o,i.filters[u]),!0):!1}(n,e):void W()}function Sh(n){return n instanceof we?function(t){return`${t.field.canonicalString()} ${t.op} ${On(t.value)}`}(n):n instanceof lt?function(t){return t.op.toString()+" {"+t.getFilters().map(Sh).join(" ,")+"}"}(n):"Filter"}class hw extends we{constructor(e,t,r){super(e,t,r),this.key=U.fromName(r.referenceValue)}matches(e){const t=U.comparator(e.key,this.key);return this.matchesComparison(t)}}class cw extends we{constructor(e,t){super(e,"in",t),this.keys=Ch("in",t)}matches(e){return this.keys.some(t=>t.isEqual(e.key))}}class dw extends we{constructor(e,t){super(e,"not-in",t),this.keys=Ch("not-in",t)}matches(e){return!this.keys.some(t=>t.isEqual(e.key))}}function Ch(n,e){var t;return(((t=e.arrayValue)===null||t===void 0?void 0:t.values)||[]).map(r=>U.fromName(r.referenceValue))}class fw extends we{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return Ua(t)&&wr(t.arrayValue,this.value)}}class mw extends we{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return t!==null&&wr(this.value.arrayValue,t)}}class pw extends we{constructor(e,t){super(e,"not-in",t)}matches(e){if(wr(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return t!==null&&!wr(this.value.arrayValue,t)}}class gw extends we{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!Ua(t)||!t.arrayValue.values)&&t.arrayValue.values.some(r=>wr(this.value.arrayValue,r))}}/**
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
 */class yw{constructor(e,t=null,r=[],i=[],s=null,o=null,u=null){this.path=e,this.collectionGroup=t,this.orderBy=r,this.filters=i,this.limit=s,this.startAt=o,this.endAt=u,this.ue=null}}function bh(n,e=null,t=[],r=[],i=null,s=null,o=null){return new yw(n,e,t,r,i,s,o)}function Wa(n){const e=q(n);if(e.ue===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map(r=>Ha(r)).join(","),t+="|ob:",t+=e.orderBy.map(r=>function(s){return s.field.canonicalString()+s.dir}(r)).join(","),Bi(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map(r=>On(r)).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map(r=>On(r)).join(",")),e.ue=t}return e.ue}function Ya(n,e){if(n.limit!==e.limit||n.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<n.orderBy.length;t++)if(!lw(n.orderBy[t],e.orderBy[t]))return!1;if(n.filters.length!==e.filters.length)return!1;for(let t=0;t<n.filters.length;t++)if(!Ah(n.filters[t],e.filters[t]))return!1;return n.collectionGroup===e.collectionGroup&&!!n.path.isEqual(e.path)&&!!wh(n.startAt,e.startAt)&&wh(n.endAt,e.endAt)}function za(n){return U.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}/**
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
 */class qi{constructor(e,t=null,r=[],i=[],s=null,o="F",u=null,c=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=r,this.filters=i,this.limit=s,this.limitType=o,this.startAt=u,this.endAt=c,this.ce=null,this.le=null,this.he=null,this.startAt,this.endAt}}function _w(n,e,t,r,i,s,o,u){return new qi(n,e,t,r,i,s,o,u)}function Ga(n){return new qi(n)}function Rh(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function vw(n){return n.collectionGroup!==null}function Tr(n){const e=q(n);if(e.ce===null){e.ce=[];const t=new Set;for(const s of e.explicitOrderBy)e.ce.push(s),t.add(s.field.canonicalString());const r=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(o){let u=new Ae(Ve.comparator);return o.filters.forEach(c=>{c.getFlattenedFilters().forEach(d=>{d.isInequality()&&(u=u.add(d.field))})}),u})(e).forEach(s=>{t.has(s.canonicalString())||s.isKeyField()||e.ce.push(new Gi(s,r))}),t.has(Ve.keyField().canonicalString())||e.ce.push(new Gi(Ve.keyField(),r))}return e.ce}function ut(n){const e=q(n);return e.le||(e.le=ww(e,Tr(n))),e.le}function ww(n,e){if(n.limitType==="F")return bh(n.path,n.collectionGroup,e,n.filters,n.limit,n.startAt,n.endAt);{e=e.map(i=>{const s=i.dir==="desc"?"asc":"desc";return new Gi(i.field,s)});const t=n.endAt?new zi(n.endAt.position,n.endAt.inclusive):null,r=n.startAt?new zi(n.startAt.position,n.startAt.inclusive):null;return bh(n.path,n.collectionGroup,e,n.filters,n.limit,t,r)}}function qa(n,e,t){return new qi(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),e,t,n.startAt,n.endAt)}function $i(n,e){return Ya(ut(n),ut(e))&&n.limitType===e.limitType}function kh(n){return`${Wa(ut(n))}|lt:${n.limitType}`}function Vn(n){return`Query(target=${function(t){let r=t.path.canonicalString();return t.collectionGroup!==null&&(r+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(r+=`, filters: [${t.filters.map(i=>Sh(i)).join(", ")}]`),Bi(t.limit)||(r+=", limit: "+t.limit),t.orderBy.length>0&&(r+=`, orderBy: [${t.orderBy.map(i=>function(o){return`${o.field.canonicalString()} (${o.dir})`}(i)).join(", ")}]`),t.startAt&&(r+=", startAt: ",r+=t.startAt.inclusive?"b:":"a:",r+=t.startAt.position.map(i=>On(i)).join(",")),t.endAt&&(r+=", endAt: ",r+=t.endAt.inclusive?"a:":"b:",r+=t.endAt.position.map(i=>On(i)).join(",")),`Target(${r})`}(ut(n))}; limitType=${n.limitType})`}function ji(n,e){return e.isFoundDocument()&&function(r,i){const s=i.key.path;return r.collectionGroup!==null?i.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(s):U.isDocumentKey(r.path)?r.path.isEqual(s):r.path.isImmediateParentOf(s)}(n,e)&&function(r,i){for(const s of Tr(r))if(!s.field.isKeyField()&&i.data.field(s.field)===null)return!1;return!0}(n,e)&&function(r,i){for(const s of r.filters)if(!s.matches(i))return!1;return!0}(n,e)&&function(r,i){return!(r.startAt&&!function(o,u,c){const d=vh(o,u,c);return o.inclusive?d<=0:d<0}(r.startAt,Tr(r),i)||r.endAt&&!function(o,u,c){const d=vh(o,u,c);return o.inclusive?d>=0:d>0}(r.endAt,Tr(r),i))}(n,e)}function Ew(n){return n.collectionGroup||(n.path.length%2==1?n.path.lastSegment():n.path.get(n.path.length-2))}function Ph(n){return(e,t)=>{let r=!1;for(const i of Tr(n)){const s=Tw(i,e,t);if(s!==0)return s;r=r||i.field.isKeyField()}return 0}}function Tw(n,e,t){const r=n.field.isKeyField()?U.comparator(e.key,t.key):function(s,o,u){const c=o.data.field(s),d=u.data.field(s);return c!==null&&d!==null?Nn(c,d):W()}(n.field,e,t);switch(n.dir){case"asc":return r;case"desc":return-1*r;default:return W()}}/**
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
 */class Ln{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r!==void 0){for(const[i,s]of r)if(this.equalsFn(i,e))return s}}has(e){return this.get(e)!==void 0}set(e,t){const r=this.mapKeyFn(e),i=this.inner[r];if(i===void 0)return this.inner[r]=[[e,t]],void this.innerSize++;for(let s=0;s<i.length;s++)if(this.equalsFn(i[s][0],e))return void(i[s]=[e,t]);i.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r===void 0)return!1;for(let i=0;i<r.length;i++)if(this.equalsFn(r[i][0],e))return r.length===1?delete this.inner[t]:r.splice(i,1),this.innerSize--,!0;return!1}forEach(e){Hi(this.inner,(t,r)=>{for(const[i,s]of r)e(i,s)})}isEmpty(){return iw(this.inner)}size(){return this.innerSize}}/**
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
 */const Iw=new fe(U.comparator);function Ht(){return Iw}const Dh=new fe(U.comparator);function Ir(...n){let e=Dh;for(const t of n)e=e.insert(t.key,t);return e}function Aw(n){let e=Dh;return n.forEach((t,r)=>e=e.insert(t,r.overlayedDocument)),e}function un(){return Ar()}function Mh(){return Ar()}function Ar(){return new Ln(n=>n.toString(),(n,e)=>n.isEqual(e))}const Sw=new Ae(U.comparator);function K(...n){let e=Sw;for(const t of n)e=e.add(t);return e}const Cw=new Ae(ee);function bw(){return Cw}/**
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
 */function Rw(n,e){if(n.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:Oa(e)?"-0":e}}function kw(n){return{integerValue:""+n}}/**
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
 */class Ki{constructor(){this._=void 0}}function Pw(n,e,t){return n instanceof $a?function(i,s){const o={fields:{__type__:{stringValue:"server_timestamp"},__local_write_time__:{timestampValue:{seconds:i.seconds,nanos:i.nanoseconds}}}};return s&&Va(s)&&(s=La(s)),s&&(o.fields.__previous_value__=s),{mapValue:o}}(t,e):n instanceof Qi?Nh(n,e):n instanceof Ji?Oh(n,e):function(i,s){const o=Mw(i,s),u=Vh(o)+Vh(i.Pe);return Fa(o)&&Fa(i.Pe)?kw(u):Rw(i.serializer,u)}(n,e)}function Dw(n,e,t){return n instanceof Qi?Nh(n,e):n instanceof Ji?Oh(n,e):t}function Mw(n,e){return n instanceof ja?function(r){return Fa(r)||function(s){return!!s&&"doubleValue"in s}(r)}(e)?e:{integerValue:0}:null}class $a extends Ki{}class Qi extends Ki{constructor(e){super(),this.elements=e}}function Nh(n,e){const t=Lh(e);for(const r of n.elements)t.some(i=>at(i,r))||t.push(r);return{arrayValue:{values:t}}}class Ji extends Ki{constructor(e){super(),this.elements=e}}function Oh(n,e){let t=Lh(e);for(const r of n.elements)t=t.filter(i=>!at(i,r));return{arrayValue:{values:t}}}class ja extends Ki{constructor(e,t){super(),this.serializer=e,this.Pe=t}}function Vh(n){return ye(n.integerValue||n.doubleValue)}function Lh(n){return Ua(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}function Nw(n,e){return n.field.isEqual(e.field)&&function(r,i){return r instanceof Qi&&i instanceof Qi||r instanceof Ji&&i instanceof Ji?Mn(r.elements,i.elements,at):r instanceof ja&&i instanceof ja?at(r.Pe,i.Pe):r instanceof $a&&i instanceof $a}(n.transform,e.transform)}class hn{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new hn}static exists(e){return new hn(void 0,e)}static updateTime(e){return new hn(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function Xi(n,e){return n.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(n.updateTime):n.exists===void 0||n.exists===e.isFoundDocument()}class Ka{}function xh(n,e){if(!n.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return n.isNoDocument()?new Vw(n.key,hn.none()):new Qa(n.key,n.data,hn.none());{const t=n.data,r=ot.empty();let i=new Ae(Ve.comparator);for(let s of e.fields)if(!i.has(s)){let o=t.field(s);o===null&&s.length>1&&(s=s.popLast(),o=t.field(s)),o===null?r.delete(s):r.set(s,o),i=i.add(s)}return new Zi(n.key,r,new Ut(i.toArray()),hn.none())}}function Ow(n,e,t){n instanceof Qa?function(i,s,o){const u=i.value.clone(),c=Bh(i.fieldTransforms,s,o.transformResults);u.setAll(c),s.convertToFoundDocument(o.version,u).setHasCommittedMutations()}(n,e,t):n instanceof Zi?function(i,s,o){if(!Xi(i.precondition,s))return void s.convertToUnknownDocument(o.version);const u=Bh(i.fieldTransforms,s,o.transformResults),c=s.data;c.setAll(Uh(i)),c.setAll(u),s.convertToFoundDocument(o.version,c).setHasCommittedMutations()}(n,e,t):function(i,s,o){s.convertToNoDocument(o.version).setHasCommittedMutations()}(0,e,t)}function Sr(n,e,t,r){return n instanceof Qa?function(s,o,u,c){if(!Xi(s.precondition,o))return u;const d=s.value.clone(),m=Hh(s.fieldTransforms,c,o);return d.setAll(m),o.convertToFoundDocument(o.version,d).setHasLocalMutations(),null}(n,e,t,r):n instanceof Zi?function(s,o,u,c){if(!Xi(s.precondition,o))return u;const d=Hh(s.fieldTransforms,c,o),m=o.data;return m.setAll(Uh(s)),m.setAll(d),o.convertToFoundDocument(o.version,m).setHasLocalMutations(),u===null?null:u.unionWith(s.fieldMask.fields).unionWith(s.fieldTransforms.map(T=>T.field))}(n,e,t,r):function(s,o,u){return Xi(s.precondition,o)?(o.convertToNoDocument(o.version).setHasLocalMutations(),null):u}(n,e,t)}function Fh(n,e){return n.type===e.type&&!!n.key.isEqual(e.key)&&!!n.precondition.isEqual(e.precondition)&&!!function(r,i){return r===void 0&&i===void 0||!(!r||!i)&&Mn(r,i,(s,o)=>Nw(s,o))}(n.fieldTransforms,e.fieldTransforms)&&(n.type===0?n.value.isEqual(e.value):n.type!==1||n.data.isEqual(e.data)&&n.fieldMask.isEqual(e.fieldMask))}class Qa extends Ka{constructor(e,t,r,i=[]){super(),this.key=e,this.value=t,this.precondition=r,this.fieldTransforms=i,this.type=0}getFieldMask(){return null}}class Zi extends Ka{constructor(e,t,r,i,s=[]){super(),this.key=e,this.data=t,this.fieldMask=r,this.precondition=i,this.fieldTransforms=s,this.type=1}getFieldMask(){return this.fieldMask}}function Uh(n){const e=new Map;return n.fieldMask.fields.forEach(t=>{if(!t.isEmpty()){const r=n.data.field(t);e.set(t,r)}}),e}function Bh(n,e,t){const r=new Map;ge(n.length===t.length);for(let i=0;i<t.length;i++){const s=n[i],o=s.transform,u=e.data.field(s.field);r.set(s.field,Dw(o,u,t[i]))}return r}function Hh(n,e,t){const r=new Map;for(const i of n){const s=i.transform,o=t.data.field(i.field);r.set(i.field,Pw(s,o,e))}return r}class Vw extends Ka{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}/**
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
 */class Lw{constructor(e,t,r,i){this.batchId=e,this.localWriteTime=t,this.baseMutations=r,this.mutations=i}applyToRemoteDocument(e,t){const r=t.mutationResults;for(let i=0;i<this.mutations.length;i++){const s=this.mutations[i];s.key.isEqual(e.key)&&Ow(s,e,r[i])}}applyToLocalView(e,t){for(const r of this.baseMutations)r.key.isEqual(e.key)&&(t=Sr(r,e,t,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(e.key)&&(t=Sr(r,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const r=Mh();return this.mutations.forEach(i=>{const s=e.get(i.key),o=s.overlayedDocument;let u=this.applyToLocalView(o,s.mutatedFields);u=t.has(i.key)?null:u;const c=xh(o,u);c!==null&&r.set(i.key,c),o.isValidDocument()||o.convertToNoDocument(B.min())}),r}keys(){return this.mutations.reduce((e,t)=>e.add(t.key),K())}isEqual(e){return this.batchId===e.batchId&&Mn(this.mutations,e.mutations,(t,r)=>Fh(t,r))&&Mn(this.baseMutations,e.baseMutations,(t,r)=>Fh(t,r))}}/**
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
 */class xw{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
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
 */class Fw{constructor(e,t){this.count=e,this.unchangedNames=t}}/**
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
 */var _e,$;function Wh(n){if(n===void 0)return Et("GRPC error has no .code"),D.UNKNOWN;switch(n){case _e.OK:return D.OK;case _e.CANCELLED:return D.CANCELLED;case _e.UNKNOWN:return D.UNKNOWN;case _e.DEADLINE_EXCEEDED:return D.DEADLINE_EXCEEDED;case _e.RESOURCE_EXHAUSTED:return D.RESOURCE_EXHAUSTED;case _e.INTERNAL:return D.INTERNAL;case _e.UNAVAILABLE:return D.UNAVAILABLE;case _e.UNAUTHENTICATED:return D.UNAUTHENTICATED;case _e.INVALID_ARGUMENT:return D.INVALID_ARGUMENT;case _e.NOT_FOUND:return D.NOT_FOUND;case _e.ALREADY_EXISTS:return D.ALREADY_EXISTS;case _e.PERMISSION_DENIED:return D.PERMISSION_DENIED;case _e.FAILED_PRECONDITION:return D.FAILED_PRECONDITION;case _e.ABORTED:return D.ABORTED;case _e.OUT_OF_RANGE:return D.OUT_OF_RANGE;case _e.UNIMPLEMENTED:return D.UNIMPLEMENTED;case _e.DATA_LOSS:return D.DATA_LOSS;default:return W()}}($=_e||(_e={}))[$.OK=0]="OK",$[$.CANCELLED=1]="CANCELLED",$[$.UNKNOWN=2]="UNKNOWN",$[$.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",$[$.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",$[$.NOT_FOUND=5]="NOT_FOUND",$[$.ALREADY_EXISTS=6]="ALREADY_EXISTS",$[$.PERMISSION_DENIED=7]="PERMISSION_DENIED",$[$.UNAUTHENTICATED=16]="UNAUTHENTICATED",$[$.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",$[$.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",$[$.ABORTED=10]="ABORTED",$[$.OUT_OF_RANGE=11]="OUT_OF_RANGE",$[$.UNIMPLEMENTED=12]="UNIMPLEMENTED",$[$.INTERNAL=13]="INTERNAL",$[$.UNAVAILABLE=14]="UNAVAILABLE",$[$.DATA_LOSS=15]="DATA_LOSS";/**
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
 */function Uw(){return new TextEncoder}/**
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
 */const Bw=new an([4294967295,4294967295],0);function Yh(n){const e=Uw().encode(n),t=new rh;return t.update(e),new Uint8Array(t.digest())}function zh(n){const e=new DataView(n.buffer),t=e.getUint32(0,!0),r=e.getUint32(4,!0),i=e.getUint32(8,!0),s=e.getUint32(12,!0);return[new an([t,r],0),new an([i,s],0)]}class Ja{constructor(e,t,r){if(this.bitmap=e,this.padding=t,this.hashCount=r,t<0||t>=8)throw new Cr(`Invalid padding: ${t}`);if(r<0)throw new Cr(`Invalid hash count: ${r}`);if(e.length>0&&this.hashCount===0)throw new Cr(`Invalid hash count: ${r}`);if(e.length===0&&t!==0)throw new Cr(`Invalid padding when bitmap length is 0: ${t}`);this.Ie=8*e.length-t,this.Te=an.fromNumber(this.Ie)}Ee(e,t,r){let i=e.add(t.multiply(an.fromNumber(r)));return i.compare(Bw)===1&&(i=new an([i.getBits(0),i.getBits(1)],0)),i.modulo(this.Te).toNumber()}de(e){return(this.bitmap[Math.floor(e/8)]&1<<e%8)!=0}mightContain(e){if(this.Ie===0)return!1;const t=Yh(e),[r,i]=zh(t);for(let s=0;s<this.hashCount;s++){const o=this.Ee(r,i,s);if(!this.de(o))return!1}return!0}static create(e,t,r){const i=e%8==0?0:8-e%8,s=new Uint8Array(Math.ceil(e/8)),o=new Ja(s,i,t);return r.forEach(u=>o.insert(u)),o}insert(e){if(this.Ie===0)return;const t=Yh(e),[r,i]=zh(t);for(let s=0;s<this.hashCount;s++){const o=this.Ee(r,i,s);this.Ae(o)}}Ae(e){const t=Math.floor(e/8),r=e%8;this.bitmap[t]|=1<<r}}class Cr extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
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
 */class es{constructor(e,t,r,i,s){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=r,this.documentUpdates=i,this.resolvedLimboDocuments=s}static createSynthesizedRemoteEventForCurrentChange(e,t,r){const i=new Map;return i.set(e,br.createSynthesizedTargetChangeForCurrentChange(e,t,r)),new es(B.min(),i,new fe(ee),Ht(),K())}}class br{constructor(e,t,r,i,s){this.resumeToken=e,this.current=t,this.addedDocuments=r,this.modifiedDocuments=i,this.removedDocuments=s}static createSynthesizedTargetChangeForCurrentChange(e,t,r){return new br(r,t,K(),K(),K())}}/**
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
 */class ts{constructor(e,t,r,i){this.Re=e,this.removedTargetIds=t,this.key=r,this.Ve=i}}class Gh{constructor(e,t){this.targetId=e,this.me=t}}class qh{constructor(e,t,r=Se.EMPTY_BYTE_STRING,i=null){this.state=e,this.targetIds=t,this.resumeToken=r,this.cause=i}}class $h{constructor(){this.fe=0,this.ge=Kh(),this.pe=Se.EMPTY_BYTE_STRING,this.ye=!1,this.we=!0}get current(){return this.ye}get resumeToken(){return this.pe}get Se(){return this.fe!==0}get be(){return this.we}De(e){e.approximateByteSize()>0&&(this.we=!0,this.pe=e)}Ce(){let e=K(),t=K(),r=K();return this.ge.forEach((i,s)=>{switch(s){case 0:e=e.add(i);break;case 2:t=t.add(i);break;case 1:r=r.add(i);break;default:W()}}),new br(this.pe,this.ye,e,t,r)}ve(){this.we=!1,this.ge=Kh()}Fe(e,t){this.we=!0,this.ge=this.ge.insert(e,t)}Me(e){this.we=!0,this.ge=this.ge.remove(e)}xe(){this.fe+=1}Oe(){this.fe-=1,ge(this.fe>=0)}Ne(){this.we=!0,this.ye=!0}}class Hw{constructor(e){this.Le=e,this.Be=new Map,this.ke=Ht(),this.qe=jh(),this.Qe=new fe(ee)}Ke(e){for(const t of e.Re)e.Ve&&e.Ve.isFoundDocument()?this.$e(t,e.Ve):this.Ue(t,e.key,e.Ve);for(const t of e.removedTargetIds)this.Ue(t,e.key,e.Ve)}We(e){this.forEachTarget(e,t=>{const r=this.Ge(t);switch(e.state){case 0:this.ze(t)&&r.De(e.resumeToken);break;case 1:r.Oe(),r.Se||r.ve(),r.De(e.resumeToken);break;case 2:r.Oe(),r.Se||this.removeTarget(t);break;case 3:this.ze(t)&&(r.Ne(),r.De(e.resumeToken));break;case 4:this.ze(t)&&(this.je(t),r.De(e.resumeToken));break;default:W()}})}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.Be.forEach((r,i)=>{this.ze(i)&&t(i)})}He(e){const t=e.targetId,r=e.me.count,i=this.Je(t);if(i){const s=i.target;if(za(s))if(r===0){const o=new U(s.path);this.Ue(t,o,ke.newNoDocument(o,B.min()))}else ge(r===1);else{const o=this.Ye(t);if(o!==r){const u=this.Ze(e),c=u?this.Xe(u,e,o):1;if(c!==0){this.je(t);const d=c===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Qe=this.Qe.insert(t,d)}}}}}Ze(e){const t=e.me.unchangedNames;if(!t||!t.bits)return null;const{bits:{bitmap:r="",padding:i=0},hashCount:s=0}=t;let o,u;try{o=on(r).toUint8Array()}catch(c){if(c instanceof ph)return Pn("Decoding the base64 bloom filter in existence filter failed ("+c.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw c}try{u=new Ja(o,i,s)}catch(c){return Pn(c instanceof Cr?"BloomFilter error: ":"Applying bloom filter failed: ",c),null}return u.Ie===0?null:u}Xe(e,t,r){return t.me.count===r-this.nt(e,t.targetId)?0:2}nt(e,t){const r=this.Le.getRemoteKeysForTarget(t);let i=0;return r.forEach(s=>{const o=this.Le.tt(),u=`projects/${o.projectId}/databases/${o.database}/documents/${s.path.canonicalString()}`;e.mightContain(u)||(this.Ue(t,s,null),i++)}),i}rt(e){const t=new Map;this.Be.forEach((s,o)=>{const u=this.Je(o);if(u){if(s.current&&za(u.target)){const c=new U(u.target.path);this.ke.get(c)!==null||this.it(o,c)||this.Ue(o,c,ke.newNoDocument(c,e))}s.be&&(t.set(o,s.Ce()),s.ve())}});let r=K();this.qe.forEach((s,o)=>{let u=!0;o.forEachWhile(c=>{const d=this.Je(c);return!d||d.purpose==="TargetPurposeLimboResolution"||(u=!1,!1)}),u&&(r=r.add(s))}),this.ke.forEach((s,o)=>o.setReadTime(e));const i=new es(e,t,this.Qe,this.ke,r);return this.ke=Ht(),this.qe=jh(),this.Qe=new fe(ee),i}$e(e,t){if(!this.ze(e))return;const r=this.it(e,t.key)?2:0;this.Ge(e).Fe(t.key,r),this.ke=this.ke.insert(t.key,t),this.qe=this.qe.insert(t.key,this.st(t.key).add(e))}Ue(e,t,r){if(!this.ze(e))return;const i=this.Ge(e);this.it(e,t)?i.Fe(t,1):i.Me(t),this.qe=this.qe.insert(t,this.st(t).delete(e)),r&&(this.ke=this.ke.insert(t,r))}removeTarget(e){this.Be.delete(e)}Ye(e){const t=this.Ge(e).Ce();return this.Le.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}xe(e){this.Ge(e).xe()}Ge(e){let t=this.Be.get(e);return t||(t=new $h,this.Be.set(e,t)),t}st(e){let t=this.qe.get(e);return t||(t=new Ae(ee),this.qe=this.qe.insert(e,t)),t}ze(e){const t=this.Je(e)!==null;return t||V("WatchChangeAggregator","Detected inactive target",e),t}Je(e){const t=this.Be.get(e);return t&&t.Se?null:this.Le.ot(e)}je(e){this.Be.set(e,new $h),this.Le.getRemoteKeysForTarget(e).forEach(t=>{this.Ue(e,t,null)})}it(e,t){return this.Le.getRemoteKeysForTarget(e).has(t)}}function jh(){return new fe(U.comparator)}function Kh(){return new fe(U.comparator)}const Ww={asc:"ASCENDING",desc:"DESCENDING"},Yw={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},zw={and:"AND",or:"OR"};class Gw{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function Xa(n,e){return n.useProto3Json||Bi(e)?e:{value:e}}function qw(n,e){return n.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function $w(n,e){return n.useProto3Json?e.toBase64():e.toUint8Array()}function xn(n){return ge(!!n),B.fromTimestamp(function(t){const r=Bt(t);return new Ue(r.seconds,r.nanos)}(n))}function jw(n,e){return Za(n,e).canonicalString()}function Za(n,e){const t=function(i){return new he(["projects",i.projectId,"databases",i.database])}(n).child("documents");return e===void 0?t:t.child(e)}function Qh(n){const e=he.fromString(n);return ge(nc(e)),e}function eo(n,e){const t=Qh(e);if(t.get(1)!==n.databaseId.projectId)throw new F(D.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+t.get(1)+" vs "+n.databaseId.projectId);if(t.get(3)!==n.databaseId.database)throw new F(D.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+t.get(3)+" vs "+n.databaseId.database);return new U(Zh(t))}function Jh(n,e){return jw(n.databaseId,e)}function Kw(n){const e=Qh(n);return e.length===4?he.emptyPath():Zh(e)}function Xh(n){return new he(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function Zh(n){return ge(n.length>4&&n.get(4)==="documents"),n.popFirst(5)}function Qw(n,e){let t;if("targetChange"in e){e.targetChange;const r=function(d){return d==="NO_CHANGE"?0:d==="ADD"?1:d==="REMOVE"?2:d==="CURRENT"?3:d==="RESET"?4:W()}(e.targetChange.targetChangeType||"NO_CHANGE"),i=e.targetChange.targetIds||[],s=function(d,m){return d.useProto3Json?(ge(m===void 0||typeof m=="string"),Se.fromBase64String(m||"")):(ge(m===void 0||m instanceof Buffer||m instanceof Uint8Array),Se.fromUint8Array(m||new Uint8Array))}(n,e.targetChange.resumeToken),o=e.targetChange.cause,u=o&&function(d){const m=d.code===void 0?D.UNKNOWN:Wh(d.code);return new F(m,d.message||"")}(o);t=new qh(r,i,s,u||null)}else if("documentChange"in e){e.documentChange;const r=e.documentChange;r.document,r.document.name,r.document.updateTime;const i=eo(n,r.document.name),s=xn(r.document.updateTime),o=r.document.createTime?xn(r.document.createTime):B.min(),u=new ot({mapValue:{fields:r.document.fields}}),c=ke.newFoundDocument(i,s,o,u),d=r.targetIds||[],m=r.removedTargetIds||[];t=new ts(d,m,c.key,c)}else if("documentDelete"in e){e.documentDelete;const r=e.documentDelete;r.document;const i=eo(n,r.document),s=r.readTime?xn(r.readTime):B.min(),o=ke.newNoDocument(i,s),u=r.removedTargetIds||[];t=new ts([],u,o.key,o)}else if("documentRemove"in e){e.documentRemove;const r=e.documentRemove;r.document;const i=eo(n,r.document),s=r.removedTargetIds||[];t=new ts([],s,i,null)}else{if(!("filter"in e))return W();{e.filter;const r=e.filter;r.targetId;const{count:i=0,unchangedNames:s}=r,o=new Fw(i,s),u=r.targetId;t=new Gh(u,o)}}return t}function Jw(n,e){return{documents:[Jh(n,e.path)]}}function Xw(n,e){const t={structuredQuery:{}},r=e.path;let i;e.collectionGroup!==null?(i=r,t.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(i=r.popLast(),t.structuredQuery.from=[{collectionId:r.lastSegment()}]),t.parent=Jh(n,i);const s=function(d){if(d.length!==0)return tc(lt.create(d,"and"))}(e.filters);s&&(t.structuredQuery.where=s);const o=function(d){if(d.length!==0)return d.map(m=>function(S){return{field:Fn(S.field),direction:tE(S.dir)}}(m))}(e.orderBy);o&&(t.structuredQuery.orderBy=o);const u=Xa(n,e.limit);return u!==null&&(t.structuredQuery.limit=u),e.startAt&&(t.structuredQuery.startAt=function(d){return{before:d.inclusive,values:d.position}}(e.startAt)),e.endAt&&(t.structuredQuery.endAt=function(d){return{before:!d.inclusive,values:d.position}}(e.endAt)),{_t:t,parent:i}}function Zw(n){let e=Kw(n.parent);const t=n.structuredQuery,r=t.from?t.from.length:0;let i=null;if(r>0){ge(r===1);const m=t.from[0];m.allDescendants?i=m.collectionId:e=e.child(m.collectionId)}let s=[];t.where&&(s=function(T){const S=ec(T);return S instanceof lt&&Ih(S)?S.getFilters():[S]}(t.where));let o=[];t.orderBy&&(o=function(T){return T.map(S=>function(O){return new Gi(Un(O.field),function(M){switch(M){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(O.direction))}(S))}(t.orderBy));let u=null;t.limit&&(u=function(T){let S;return S=typeof T=="object"?T.value:T,Bi(S)?null:S}(t.limit));let c=null;t.startAt&&(c=function(T){const S=!!T.before,R=T.values||[];return new zi(R,S)}(t.startAt));let d=null;return t.endAt&&(d=function(T){const S=!T.before,R=T.values||[];return new zi(R,S)}(t.endAt)),_w(e,i,o,s,u,"F",c,d)}function eE(n,e){const t=function(i){switch(i){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return W()}}(e.purpose);return t==null?null:{"goog-listen-tags":t}}function ec(n){return n.unaryFilter!==void 0?function(t){switch(t.unaryFilter.op){case"IS_NAN":const r=Un(t.unaryFilter.field);return we.create(r,"==",{doubleValue:NaN});case"IS_NULL":const i=Un(t.unaryFilter.field);return we.create(i,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const s=Un(t.unaryFilter.field);return we.create(s,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const o=Un(t.unaryFilter.field);return we.create(o,"!=",{nullValue:"NULL_VALUE"});default:return W()}}(n):n.fieldFilter!==void 0?function(t){return we.create(Un(t.fieldFilter.field),function(i){switch(i){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";default:return W()}}(t.fieldFilter.op),t.fieldFilter.value)}(n):n.compositeFilter!==void 0?function(t){return lt.create(t.compositeFilter.filters.map(r=>ec(r)),function(i){switch(i){case"AND":return"and";case"OR":return"or";default:return W()}}(t.compositeFilter.op))}(n):W()}function tE(n){return Ww[n]}function nE(n){return Yw[n]}function rE(n){return zw[n]}function Fn(n){return{fieldPath:n.canonicalString()}}function Un(n){return Ve.fromServerFormat(n.fieldPath)}function tc(n){return n instanceof we?function(t){if(t.op==="=="){if(_h(t.value))return{unaryFilter:{field:Fn(t.field),op:"IS_NAN"}};if(yh(t.value))return{unaryFilter:{field:Fn(t.field),op:"IS_NULL"}}}else if(t.op==="!="){if(_h(t.value))return{unaryFilter:{field:Fn(t.field),op:"IS_NOT_NAN"}};if(yh(t.value))return{unaryFilter:{field:Fn(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:Fn(t.field),op:nE(t.op),value:t.value}}}(n):n instanceof lt?function(t){const r=t.getFilters().map(i=>tc(i));return r.length===1?r[0]:{compositeFilter:{op:rE(t.op),filters:r}}}(n):W()}function nc(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}/**
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
 */class Wt{constructor(e,t,r,i,s=B.min(),o=B.min(),u=Se.EMPTY_BYTE_STRING,c=null){this.target=e,this.targetId=t,this.purpose=r,this.sequenceNumber=i,this.snapshotVersion=s,this.lastLimboFreeSnapshotVersion=o,this.resumeToken=u,this.expectedCount=c}withSequenceNumber(e){return new Wt(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new Wt(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new Wt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new Wt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
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
 */class iE{constructor(e){this.ct=e}}function sE(n){const e=Zw({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?qa(e,e.limit,"L"):e}/**
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
 */class aE{constructor(){this.an=new oE}addToCollectionParentIndex(e,t){return this.an.add(t),C.resolve()}getCollectionParents(e,t){return C.resolve(this.an.getEntries(t))}addFieldIndex(e,t){return C.resolve()}deleteFieldIndex(e,t){return C.resolve()}deleteAllFieldIndexes(e){return C.resolve()}createTargetIndexes(e,t){return C.resolve()}getDocumentsMatchingTarget(e,t){return C.resolve(null)}getIndexType(e,t){return C.resolve(0)}getFieldIndexes(e,t){return C.resolve([])}getNextCollectionGroupToUpdate(e){return C.resolve(null)}getMinOffset(e,t){return C.resolve(Ft.min())}getMinOffsetFromCollectionGroup(e,t){return C.resolve(Ft.min())}updateCollectionGroup(e,t,r){return C.resolve()}updateIndexEntries(e,t){return C.resolve()}}class oE{constructor(){this.index={}}add(e){const t=e.lastSegment(),r=e.popLast(),i=this.index[t]||new Ae(he.comparator),s=!i.has(r);return this.index[t]=i.add(r),s}has(e){const t=e.lastSegment(),r=e.popLast(),i=this.index[t];return i&&i.has(r)}getEntries(e){return(this.index[e]||new Ae(he.comparator)).toArray()}}/**
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
 */class Bn{constructor(e){this.Nn=e}next(){return this.Nn+=2,this.Nn}static Ln(){return new Bn(0)}static Bn(){return new Bn(-1)}}/**
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
 */class lE{constructor(){this.changes=new Ln(e=>e.toString(),(e,t)=>e.isEqual(t)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,ke.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const r=this.changes.get(t);return r!==void 0?C.resolve(r):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
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
 */class uE{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}/**
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
 */class hE{constructor(e,t,r,i){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=r,this.indexManager=i}getDocument(e,t){let r=null;return this.documentOverlayCache.getOverlay(e,t).next(i=>(r=i,this.remoteDocumentCache.getEntry(e,t))).next(i=>(r!==null&&Sr(r.mutation,i,Ut.empty(),Ue.now()),i))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next(r=>this.getLocalViewOfDocuments(e,r,K()).next(()=>r))}getLocalViewOfDocuments(e,t,r=K()){const i=un();return this.populateOverlays(e,i,t).next(()=>this.computeViews(e,t,i,r).next(s=>{let o=Ir();return s.forEach((u,c)=>{o=o.insert(u,c.overlayedDocument)}),o}))}getOverlayedDocuments(e,t){const r=un();return this.populateOverlays(e,r,t).next(()=>this.computeViews(e,t,r,K()))}populateOverlays(e,t,r){const i=[];return r.forEach(s=>{t.has(s)||i.push(s)}),this.documentOverlayCache.getOverlays(e,i).next(s=>{s.forEach((o,u)=>{t.set(o,u)})})}computeViews(e,t,r,i){let s=Ht();const o=Ar(),u=function(){return Ar()}();return t.forEach((c,d)=>{const m=r.get(d.key);i.has(d.key)&&(m===void 0||m.mutation instanceof Zi)?s=s.insert(d.key,d):m!==void 0?(o.set(d.key,m.mutation.getFieldMask()),Sr(m.mutation,d,m.mutation.getFieldMask(),Ue.now())):o.set(d.key,Ut.empty())}),this.recalculateAndSaveOverlays(e,s).next(c=>(c.forEach((d,m)=>o.set(d,m)),t.forEach((d,m)=>{var T;return u.set(d,new uE(m,(T=o.get(d))!==null&&T!==void 0?T:null))}),u))}recalculateAndSaveOverlays(e,t){const r=Ar();let i=new fe((o,u)=>o-u),s=K();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next(o=>{for(const u of o)u.keys().forEach(c=>{const d=t.get(c);if(d===null)return;let m=r.get(c)||Ut.empty();m=u.applyToLocalView(d,m),r.set(c,m);const T=(i.get(u.batchId)||K()).add(c);i=i.insert(u.batchId,T)})}).next(()=>{const o=[],u=i.getReverseIterator();for(;u.hasNext();){const c=u.getNext(),d=c.key,m=c.value,T=Mh();m.forEach(S=>{if(!s.has(S)){const R=xh(t.get(S),r.get(S));R!==null&&T.set(S,R),s=s.add(S)}}),o.push(this.documentOverlayCache.saveOverlays(e,d,T))}return C.waitFor(o)}).next(()=>r)}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next(r=>this.recalculateAndSaveOverlays(e,r))}getDocumentsMatchingQuery(e,t,r,i){return function(o){return U.isDocumentKey(o.path)&&o.collectionGroup===null&&o.filters.length===0}(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):vw(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,r,i):this.getDocumentsMatchingCollectionQuery(e,t,r,i)}getNextDocuments(e,t,r,i){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,r,i).next(s=>{const o=i-s.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,r.largestBatchId,i-s.size):C.resolve(un());let u=-1,c=s;return o.next(d=>C.forEach(d,(m,T)=>(u<T.largestBatchId&&(u=T.largestBatchId),s.get(m)?C.resolve():this.remoteDocumentCache.getEntry(e,m).next(S=>{c=c.insert(m,S)}))).next(()=>this.populateOverlays(e,d,s)).next(()=>this.computeViews(e,c,d,K())).next(m=>({batchId:u,changes:Aw(m)})))})}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new U(t)).next(r=>{let i=Ir();return r.isFoundDocument()&&(i=i.insert(r.key,r)),i})}getDocumentsMatchingCollectionGroupQuery(e,t,r,i){const s=t.collectionGroup;let o=Ir();return this.indexManager.getCollectionParents(e,s).next(u=>C.forEach(u,c=>{const d=function(T,S){return new qi(S,null,T.explicitOrderBy.slice(),T.filters.slice(),T.limit,T.limitType,T.startAt,T.endAt)}(t,c.child(s));return this.getDocumentsMatchingCollectionQuery(e,d,r,i).next(m=>{m.forEach((T,S)=>{o=o.insert(T,S)})})}).next(()=>o))}getDocumentsMatchingCollectionQuery(e,t,r,i){let s;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,r.largestBatchId).next(o=>(s=o,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,r,s,i))).next(o=>{s.forEach((c,d)=>{const m=d.getKey();o.get(m)===null&&(o=o.insert(m,ke.newInvalidDocument(m)))});let u=Ir();return o.forEach((c,d)=>{const m=s.get(c);m!==void 0&&Sr(m.mutation,d,Ut.empty(),Ue.now()),ji(t,d)&&(u=u.insert(c,d))}),u})}}/**
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
 */class cE{constructor(e){this.serializer=e,this.lr=new Map,this.hr=new Map}getBundleMetadata(e,t){return C.resolve(this.lr.get(t))}saveBundleMetadata(e,t){return this.lr.set(t.id,function(i){return{id:i.id,version:i.version,createTime:xn(i.createTime)}}(t)),C.resolve()}getNamedQuery(e,t){return C.resolve(this.hr.get(t))}saveNamedQuery(e,t){return this.hr.set(t.name,function(i){return{name:i.name,query:sE(i.bundledQuery),readTime:xn(i.readTime)}}(t)),C.resolve()}}/**
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
 */class dE{constructor(){this.overlays=new fe(U.comparator),this.Pr=new Map}getOverlay(e,t){return C.resolve(this.overlays.get(t))}getOverlays(e,t){const r=un();return C.forEach(t,i=>this.getOverlay(e,i).next(s=>{s!==null&&r.set(i,s)})).next(()=>r)}saveOverlays(e,t,r){return r.forEach((i,s)=>{this.ht(e,t,s)}),C.resolve()}removeOverlaysForBatchId(e,t,r){const i=this.Pr.get(r);return i!==void 0&&(i.forEach(s=>this.overlays=this.overlays.remove(s)),this.Pr.delete(r)),C.resolve()}getOverlaysForCollection(e,t,r){const i=un(),s=t.length+1,o=new U(t.child("")),u=this.overlays.getIteratorFrom(o);for(;u.hasNext();){const c=u.getNext().value,d=c.getKey();if(!t.isPrefixOf(d.path))break;d.path.length===s&&c.largestBatchId>r&&i.set(c.getKey(),c)}return C.resolve(i)}getOverlaysForCollectionGroup(e,t,r,i){let s=new fe((d,m)=>d-m);const o=this.overlays.getIterator();for(;o.hasNext();){const d=o.getNext().value;if(d.getKey().getCollectionGroup()===t&&d.largestBatchId>r){let m=s.get(d.largestBatchId);m===null&&(m=un(),s=s.insert(d.largestBatchId,m)),m.set(d.getKey(),d)}}const u=un(),c=s.getIterator();for(;c.hasNext()&&(c.getNext().value.forEach((d,m)=>u.set(d,m)),!(u.size()>=i)););return C.resolve(u)}ht(e,t,r){const i=this.overlays.get(r.key);if(i!==null){const o=this.Pr.get(i.largestBatchId).delete(r.key);this.Pr.set(i.largestBatchId,o)}this.overlays=this.overlays.insert(r.key,new xw(t,r));let s=this.Pr.get(t);s===void 0&&(s=K(),this.Pr.set(t,s)),this.Pr.set(t,s.add(r.key))}}/**
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
 */class fE{constructor(){this.sessionToken=Se.EMPTY_BYTE_STRING}getSessionToken(e){return C.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,C.resolve()}}/**
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
 */class to{constructor(){this.Ir=new Ae(Ee.Tr),this.Er=new Ae(Ee.dr)}isEmpty(){return this.Ir.isEmpty()}addReference(e,t){const r=new Ee(e,t);this.Ir=this.Ir.add(r),this.Er=this.Er.add(r)}Ar(e,t){e.forEach(r=>this.addReference(r,t))}removeReference(e,t){this.Rr(new Ee(e,t))}Vr(e,t){e.forEach(r=>this.removeReference(r,t))}mr(e){const t=new U(new he([])),r=new Ee(t,e),i=new Ee(t,e+1),s=[];return this.Er.forEachInRange([r,i],o=>{this.Rr(o),s.push(o.key)}),s}gr(){this.Ir.forEach(e=>this.Rr(e))}Rr(e){this.Ir=this.Ir.delete(e),this.Er=this.Er.delete(e)}pr(e){const t=new U(new he([])),r=new Ee(t,e),i=new Ee(t,e+1);let s=K();return this.Er.forEachInRange([r,i],o=>{s=s.add(o.key)}),s}containsKey(e){const t=new Ee(e,0),r=this.Ir.firstAfterOrEqual(t);return r!==null&&e.isEqual(r.key)}}class Ee{constructor(e,t){this.key=e,this.yr=t}static Tr(e,t){return U.comparator(e.key,t.key)||ee(e.yr,t.yr)}static dr(e,t){return ee(e.yr,t.yr)||U.comparator(e.key,t.key)}}/**
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
 */class mE{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.wr=1,this.Sr=new Ae(Ee.Tr)}checkEmpty(e){return C.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,r,i){const s=this.wr;this.wr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const o=new Lw(s,t,r,i);this.mutationQueue.push(o);for(const u of i)this.Sr=this.Sr.add(new Ee(u.key,s)),this.indexManager.addToCollectionParentIndex(e,u.key.path.popLast());return C.resolve(o)}lookupMutationBatch(e,t){return C.resolve(this.br(t))}getNextMutationBatchAfterBatchId(e,t){const r=t+1,i=this.Dr(r),s=i<0?0:i;return C.resolve(this.mutationQueue.length>s?this.mutationQueue[s]:null)}getHighestUnacknowledgedBatchId(){return C.resolve(this.mutationQueue.length===0?-1:this.wr-1)}getAllMutationBatches(e){return C.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const r=new Ee(t,0),i=new Ee(t,Number.POSITIVE_INFINITY),s=[];return this.Sr.forEachInRange([r,i],o=>{const u=this.br(o.yr);s.push(u)}),C.resolve(s)}getAllMutationBatchesAffectingDocumentKeys(e,t){let r=new Ae(ee);return t.forEach(i=>{const s=new Ee(i,0),o=new Ee(i,Number.POSITIVE_INFINITY);this.Sr.forEachInRange([s,o],u=>{r=r.add(u.yr)})}),C.resolve(this.Cr(r))}getAllMutationBatchesAffectingQuery(e,t){const r=t.path,i=r.length+1;let s=r;U.isDocumentKey(s)||(s=s.child(""));const o=new Ee(new U(s),0);let u=new Ae(ee);return this.Sr.forEachWhile(c=>{const d=c.key.path;return!!r.isPrefixOf(d)&&(d.length===i&&(u=u.add(c.yr)),!0)},o),C.resolve(this.Cr(u))}Cr(e){const t=[];return e.forEach(r=>{const i=this.br(r);i!==null&&t.push(i)}),t}removeMutationBatch(e,t){ge(this.vr(t.batchId,"removed")===0),this.mutationQueue.shift();let r=this.Sr;return C.forEach(t.mutations,i=>{const s=new Ee(i.key,t.batchId);return r=r.delete(s),this.referenceDelegate.markPotentiallyOrphaned(e,i.key)}).next(()=>{this.Sr=r})}xn(e){}containsKey(e,t){const r=new Ee(t,0),i=this.Sr.firstAfterOrEqual(r);return C.resolve(t.isEqual(i&&i.key))}performConsistencyCheck(e){return this.mutationQueue.length,C.resolve()}vr(e,t){return this.Dr(e)}Dr(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}br(e){const t=this.Dr(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}/**
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
 */class pE{constructor(e){this.Fr=e,this.docs=function(){return new fe(U.comparator)}(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const r=t.key,i=this.docs.get(r),s=i?i.size:0,o=this.Fr(t);return this.docs=this.docs.insert(r,{document:t.mutableCopy(),size:o}),this.size+=o-s,this.indexManager.addToCollectionParentIndex(e,r.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const r=this.docs.get(t);return C.resolve(r?r.document.mutableCopy():ke.newInvalidDocument(t))}getEntries(e,t){let r=Ht();return t.forEach(i=>{const s=this.docs.get(i);r=r.insert(i,s?s.document.mutableCopy():ke.newInvalidDocument(i))}),C.resolve(r)}getDocumentsMatchingQuery(e,t,r,i){let s=Ht();const o=t.path,u=new U(o.child("")),c=this.docs.getIteratorFrom(u);for(;c.hasNext();){const{key:d,value:{document:m}}=c.getNext();if(!o.isPrefixOf(d.path))break;d.path.length>o.length+1||ew(Zv(m),r)<=0||(i.has(m.key)||ji(t,m))&&(s=s.insert(m.key,m.mutableCopy()))}return C.resolve(s)}getAllFromCollectionGroup(e,t,r,i){W()}Mr(e,t){return C.forEach(this.docs,r=>t(r))}newChangeBuffer(e){return new gE(this)}getSize(e){return C.resolve(this.size)}}class gE extends lE{constructor(e){super(),this.ur=e}applyChanges(e){const t=[];return this.changes.forEach((r,i)=>{i.isValidDocument()?t.push(this.ur.addEntry(e,i)):this.ur.removeEntry(r)}),C.waitFor(t)}getFromCache(e,t){return this.ur.getEntry(e,t)}getAllFromCache(e,t){return this.ur.getEntries(e,t)}}/**
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
 */class yE{constructor(e){this.persistence=e,this.Or=new Ln(t=>Wa(t),Ya),this.lastRemoteSnapshotVersion=B.min(),this.highestTargetId=0,this.Nr=0,this.Lr=new to,this.targetCount=0,this.Br=Bn.Ln()}forEachTarget(e,t){return this.Or.forEach((r,i)=>t(i)),C.resolve()}getLastRemoteSnapshotVersion(e){return C.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return C.resolve(this.Nr)}allocateTargetId(e){return this.highestTargetId=this.Br.next(),C.resolve(this.highestTargetId)}setTargetsMetadata(e,t,r){return r&&(this.lastRemoteSnapshotVersion=r),t>this.Nr&&(this.Nr=t),C.resolve()}Qn(e){this.Or.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this.Br=new Bn(t),this.highestTargetId=t),e.sequenceNumber>this.Nr&&(this.Nr=e.sequenceNumber)}addTargetData(e,t){return this.Qn(t),this.targetCount+=1,C.resolve()}updateTargetData(e,t){return this.Qn(t),C.resolve()}removeTargetData(e,t){return this.Or.delete(t.target),this.Lr.mr(t.targetId),this.targetCount-=1,C.resolve()}removeTargets(e,t,r){let i=0;const s=[];return this.Or.forEach((o,u)=>{u.sequenceNumber<=t&&r.get(u.targetId)===null&&(this.Or.delete(o),s.push(this.removeMatchingKeysForTargetId(e,u.targetId)),i++)}),C.waitFor(s).next(()=>i)}getTargetCount(e){return C.resolve(this.targetCount)}getTargetData(e,t){const r=this.Or.get(t)||null;return C.resolve(r)}addMatchingKeys(e,t,r){return this.Lr.Ar(t,r),C.resolve()}removeMatchingKeys(e,t,r){this.Lr.Vr(t,r);const i=this.persistence.referenceDelegate,s=[];return i&&t.forEach(o=>{s.push(i.markPotentiallyOrphaned(e,o))}),C.waitFor(s)}removeMatchingKeysForTargetId(e,t){return this.Lr.mr(t),C.resolve()}getMatchingKeysForTargetId(e,t){const r=this.Lr.pr(t);return C.resolve(r)}containsKey(e,t){return C.resolve(this.Lr.containsKey(t))}}/**
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
 */class _E{constructor(e,t){this.kr={},this.overlays={},this.qr=new Na(0),this.Qr=!1,this.Qr=!0,this.Kr=new fE,this.referenceDelegate=e(this),this.$r=new yE(this),this.indexManager=new aE,this.remoteDocumentCache=function(i){return new pE(i)}(r=>this.referenceDelegate.Ur(r)),this.serializer=new iE(t),this.Wr=new cE(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.Qr=!1,Promise.resolve()}get started(){return this.Qr}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new dE,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let r=this.kr[e.toKey()];return r||(r=new mE(t,this.referenceDelegate),this.kr[e.toKey()]=r),r}getGlobalsCache(){return this.Kr}getTargetCache(){return this.$r}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Wr}runTransaction(e,t,r){V("MemoryPersistence","Starting transaction:",e);const i=new vE(this.qr.next());return this.referenceDelegate.Gr(),r(i).next(s=>this.referenceDelegate.zr(i).next(()=>s)).toPromise().then(s=>(i.raiseOnCommittedEvent(),s))}jr(e,t){return C.or(Object.values(this.kr).map(r=>()=>r.containsKey(e,t)))}}class vE extends nw{constructor(e){super(),this.currentSequenceNumber=e}}class no{constructor(e){this.persistence=e,this.Hr=new to,this.Jr=null}static Yr(e){return new no(e)}get Zr(){if(this.Jr)return this.Jr;throw W()}addReference(e,t,r){return this.Hr.addReference(r,t),this.Zr.delete(r.toString()),C.resolve()}removeReference(e,t,r){return this.Hr.removeReference(r,t),this.Zr.add(r.toString()),C.resolve()}markPotentiallyOrphaned(e,t){return this.Zr.add(t.toString()),C.resolve()}removeTarget(e,t){this.Hr.mr(t.targetId).forEach(i=>this.Zr.add(i.toString()));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,t.targetId).next(i=>{i.forEach(s=>this.Zr.add(s.toString()))}).next(()=>r.removeTargetData(e,t))}Gr(){this.Jr=new Set}zr(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return C.forEach(this.Zr,r=>{const i=U.fromPath(r);return this.Xr(e,i).next(s=>{s||t.removeEntry(i,B.min())})}).next(()=>(this.Jr=null,t.apply(e)))}updateLimboDocument(e,t){return this.Xr(e,t).next(r=>{r?this.Zr.delete(t.toString()):this.Zr.add(t.toString())})}Ur(e){return 0}Xr(e,t){return C.or([()=>C.resolve(this.Hr.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.jr(e,t)])}}/**
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
 */class ro{constructor(e,t,r,i){this.targetId=e,this.fromCache=t,this.Ki=r,this.$i=i}static Ui(e,t){let r=K(),i=K();for(const s of t.docChanges)switch(s.type){case 0:r=r.add(s.doc.key);break;case 1:i=i.add(s.doc.key)}return new ro(e,t.fromCache,r,i)}}/**
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
 */class wE{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
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
 */class EE{constructor(){this.Wi=!1,this.Gi=!1,this.zi=100,this.ji=function(){return Cy()?8:rw(Xe())>0?6:4}()}initialize(e,t){this.Hi=e,this.indexManager=t,this.Wi=!0}getDocumentsMatchingQuery(e,t,r,i){const s={result:null};return this.Ji(e,t).next(o=>{s.result=o}).next(()=>{if(!s.result)return this.Yi(e,t,i,r).next(o=>{s.result=o})}).next(()=>{if(s.result)return;const o=new wE;return this.Zi(e,t,o).next(u=>{if(s.result=u,this.Gi)return this.Xi(e,t,o,u.size)})}).next(()=>s.result)}Xi(e,t,r,i){return r.documentReadCount<this.zi?(pr()<=z.DEBUG&&V("QueryEngine","SDK will not create cache indexes for query:",Vn(t),"since it only creates cache indexes for collection contains","more than or equal to",this.zi,"documents"),C.resolve()):(pr()<=z.DEBUG&&V("QueryEngine","Query:",Vn(t),"scans",r.documentReadCount,"local documents and returns",i,"documents as results."),r.documentReadCount>this.ji*i?(pr()<=z.DEBUG&&V("QueryEngine","The SDK decides to create cache indexes for query:",Vn(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,ut(t))):C.resolve())}Ji(e,t){if(Rh(t))return C.resolve(null);let r=ut(t);return this.indexManager.getIndexType(e,r).next(i=>i===0?null:(t.limit!==null&&i===1&&(t=qa(t,null,"F"),r=ut(t)),this.indexManager.getDocumentsMatchingTarget(e,r).next(s=>{const o=K(...s);return this.Hi.getDocuments(e,o).next(u=>this.indexManager.getMinOffset(e,r).next(c=>{const d=this.es(t,u);return this.ts(t,d,o,c.readTime)?this.Ji(e,qa(t,null,"F")):this.ns(e,d,t,c)}))})))}Yi(e,t,r,i){return Rh(t)||i.isEqual(B.min())?C.resolve(null):this.Hi.getDocuments(e,r).next(s=>{const o=this.es(t,s);return this.ts(t,o,r,i)?C.resolve(null):(pr()<=z.DEBUG&&V("QueryEngine","Re-using previous result from %s to execute query: %s",i.toString(),Vn(t)),this.ns(e,o,t,Xv(i,-1)).next(u=>u))})}es(e,t){let r=new Ae(Ph(e));return t.forEach((i,s)=>{ji(e,s)&&(r=r.add(s))}),r}ts(e,t,r,i){if(e.limit===null)return!1;if(r.size!==t.size)return!0;const s=e.limitType==="F"?t.last():t.first();return!!s&&(s.hasPendingWrites||s.version.compareTo(i)>0)}Zi(e,t,r){return pr()<=z.DEBUG&&V("QueryEngine","Using full collection scan to execute query:",Vn(t)),this.Hi.getDocumentsMatchingQuery(e,t,Ft.min(),r)}ns(e,t,r,i){return this.Hi.getDocumentsMatchingQuery(e,r,i).next(s=>(t.forEach(o=>{s=s.insert(o.key,o)}),s))}}/**
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
 */class TE{constructor(e,t,r,i){this.persistence=e,this.rs=t,this.serializer=i,this.ss=new fe(ee),this.os=new Ln(s=>Wa(s),Ya),this._s=new Map,this.us=e.getRemoteDocumentCache(),this.$r=e.getTargetCache(),this.Wr=e.getBundleCache(),this.cs(r)}cs(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new hE(this.us,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.us.setIndexManager(this.indexManager),this.rs.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",t=>e.collect(t,this.ss))}}function IE(n,e,t,r){return new TE(n,e,t,r)}async function rc(n,e){const t=q(n);return await t.persistence.runTransaction("Handle user change","readonly",r=>{let i;return t.mutationQueue.getAllMutationBatches(r).next(s=>(i=s,t.cs(e),t.mutationQueue.getAllMutationBatches(r))).next(s=>{const o=[],u=[];let c=K();for(const d of i){o.push(d.batchId);for(const m of d.mutations)c=c.add(m.key)}for(const d of s){u.push(d.batchId);for(const m of d.mutations)c=c.add(m.key)}return t.localDocuments.getDocuments(r,c).next(d=>({ls:d,removedBatchIds:o,addedBatchIds:u}))})})}function ic(n){const e=q(n);return e.persistence.runTransaction("Get last remote snapshot version","readonly",t=>e.$r.getLastRemoteSnapshotVersion(t))}function AE(n,e){const t=q(n),r=e.snapshotVersion;let i=t.ss;return t.persistence.runTransaction("Apply remote event","readwrite-primary",s=>{const o=t.us.newChangeBuffer({trackRemovals:!0});i=t.ss;const u=[];e.targetChanges.forEach((m,T)=>{const S=i.get(T);if(!S)return;u.push(t.$r.removeMatchingKeys(s,m.removedDocuments,T).next(()=>t.$r.addMatchingKeys(s,m.addedDocuments,T)));let R=S.withSequenceNumber(s.currentSequenceNumber);e.targetMismatches.get(T)!==null?R=R.withResumeToken(Se.EMPTY_BYTE_STRING,B.min()).withLastLimboFreeSnapshotVersion(B.min()):m.resumeToken.approximateByteSize()>0&&(R=R.withResumeToken(m.resumeToken,r)),i=i.insert(T,R),function(x,M,te){return x.resumeToken.approximateByteSize()===0||M.snapshotVersion.toMicroseconds()-x.snapshotVersion.toMicroseconds()>=3e8?!0:te.addedDocuments.size+te.modifiedDocuments.size+te.removedDocuments.size>0}(S,R,m)&&u.push(t.$r.updateTargetData(s,R))});let c=Ht(),d=K();if(e.documentUpdates.forEach(m=>{e.resolvedLimboDocuments.has(m)&&u.push(t.persistence.referenceDelegate.updateLimboDocument(s,m))}),u.push(SE(s,o,e.documentUpdates).next(m=>{c=m.hs,d=m.Ps})),!r.isEqual(B.min())){const m=t.$r.getLastRemoteSnapshotVersion(s).next(T=>t.$r.setTargetsMetadata(s,s.currentSequenceNumber,r));u.push(m)}return C.waitFor(u).next(()=>o.apply(s)).next(()=>t.localDocuments.getLocalViewOfDocuments(s,c,d)).next(()=>c)}).then(s=>(t.ss=i,s))}function SE(n,e,t){let r=K(),i=K();return t.forEach(s=>r=r.add(s)),e.getEntries(n,r).next(s=>{let o=Ht();return t.forEach((u,c)=>{const d=s.get(u);c.isFoundDocument()!==d.isFoundDocument()&&(i=i.add(u)),c.isNoDocument()&&c.version.isEqual(B.min())?(e.removeEntry(u,c.readTime),o=o.insert(u,c)):!d.isValidDocument()||c.version.compareTo(d.version)>0||c.version.compareTo(d.version)===0&&d.hasPendingWrites?(e.addEntry(c),o=o.insert(u,c)):V("LocalStore","Ignoring outdated watch update for ",u,". Current version:",d.version," Watch version:",c.version)}),{hs:o,Ps:i}})}function CE(n,e){const t=q(n);return t.persistence.runTransaction("Allocate target","readwrite",r=>{let i;return t.$r.getTargetData(r,e).next(s=>s?(i=s,C.resolve(i)):t.$r.allocateTargetId(r).next(o=>(i=new Wt(e,o,"TargetPurposeListen",r.currentSequenceNumber),t.$r.addTargetData(r,i).next(()=>i))))}).then(r=>{const i=t.ss.get(r.targetId);return(i===null||r.snapshotVersion.compareTo(i.snapshotVersion)>0)&&(t.ss=t.ss.insert(r.targetId,r),t.os.set(e,r.targetId)),r})}async function io(n,e,t){const r=q(n),i=r.ss.get(e),s=t?"readwrite":"readwrite-primary";try{t||await r.persistence.runTransaction("Release target",s,o=>r.persistence.referenceDelegate.removeTarget(o,i))}catch(o){if(!yr(o))throw o;V("LocalStore",`Failed to update sequence numbers for target ${e}: ${o}`)}r.ss=r.ss.remove(e),r.os.delete(i.target)}function sc(n,e,t){const r=q(n);let i=B.min(),s=K();return r.persistence.runTransaction("Execute query","readwrite",o=>function(c,d,m){const T=q(c),S=T.os.get(m);return S!==void 0?C.resolve(T.ss.get(S)):T.$r.getTargetData(d,m)}(r,o,ut(e)).next(u=>{if(u)return i=u.lastLimboFreeSnapshotVersion,r.$r.getMatchingKeysForTargetId(o,u.targetId).next(c=>{s=c})}).next(()=>r.rs.getDocumentsMatchingQuery(o,e,t?i:B.min(),t?s:K())).next(u=>(bE(r,Ew(e),u),{documents:u,Is:s})))}function bE(n,e,t){let r=n._s.get(e)||B.min();t.forEach((i,s)=>{s.readTime.compareTo(r)>0&&(r=s.readTime)}),n._s.set(e,r)}class ac{constructor(){this.activeTargetIds=bw()}Vs(e){this.activeTargetIds=this.activeTargetIds.add(e)}fs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Rs(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class RE{constructor(){this.io=new ac,this.so={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,r){}addLocalQueryTarget(e){return this.io.Vs(e),this.so[e]||"not-current"}updateQueryState(e,t,r){this.so[e]=t}removeLocalQueryTarget(e){this.io.fs(e)}isLocalQueryTarget(e){return this.io.activeTargetIds.has(e)}clearQueryState(e){delete this.so[e]}getAllActiveQueryTargets(){return this.io.activeTargetIds}isActiveQueryTarget(e){return this.io.activeTargetIds.has(e)}start(){return this.io=new ac,Promise.resolve()}handleUserChange(e,t,r){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
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
 */class kE{oo(e){}shutdown(){}}/**
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
 */class oc{constructor(){this._o=()=>this.ao(),this.uo=()=>this.co(),this.lo=[],this.ho()}oo(e){this.lo.push(e)}shutdown(){window.removeEventListener("online",this._o),window.removeEventListener("offline",this.uo)}ho(){window.addEventListener("online",this._o),window.addEventListener("offline",this.uo)}ao(){V("ConnectivityMonitor","Network connectivity changed: AVAILABLE");for(const e of this.lo)e(0)}co(){V("ConnectivityMonitor","Network connectivity changed: UNAVAILABLE");for(const e of this.lo)e(1)}static D(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
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
 */let ns=null;function so(){return ns===null?ns=function(){return 268435456+Math.round(2147483648*Math.random())}():ns++,"0x"+ns.toString(16)}/**
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
 */const PE={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};/**
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
 */class DE{constructor(e){this.Po=e.Po,this.Io=e.Io}To(e){this.Eo=e}Ao(e){this.Ro=e}Vo(e){this.mo=e}onMessage(e){this.fo=e}close(){this.Io()}send(e){this.Po(e)}po(){this.Eo()}yo(){this.Ro()}wo(e){this.mo(e)}So(e){this.fo(e)}}/**
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
 */const Pe="WebChannelConnection";class ME extends class{constructor(t){this.databaseInfo=t,this.databaseId=t.databaseId;const r=t.ssl?"https":"http",i=encodeURIComponent(this.databaseId.projectId),s=encodeURIComponent(this.databaseId.database);this.bo=r+"://"+t.host,this.Do=`projects/${i}/databases/${s}`,this.Co=this.databaseId.database==="(default)"?`project_id=${i}`:`project_id=${i}&database_id=${s}`}get vo(){return!1}Fo(t,r,i,s,o){const u=so(),c=this.Mo(t,r.toUriEncodedString());V("RestConnection",`Sending RPC '${t}' ${u}:`,c,i);const d={"google-cloud-resource-prefix":this.Do,"x-goog-request-params":this.Co};return this.xo(d,s,o),this.Oo(t,c,d,i).then(m=>(V("RestConnection",`Received RPC '${t}' ${u}: `,m),m),m=>{throw Pn("RestConnection",`RPC '${t}' ${u} failed with error: `,m,"url: ",c,"request:",i),m})}No(t,r,i,s,o,u){return this.Fo(t,r,i,s,o)}xo(t,r,i){t["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+kn}(),t["Content-Type"]="text/plain",this.databaseInfo.appId&&(t["X-Firebase-GMPID"]=this.databaseInfo.appId),r&&r.headers.forEach((s,o)=>t[o]=s),i&&i.headers.forEach((s,o)=>t[o]=s)}Mo(t,r){const i=PE[t];return`${this.bo}/v1/${r}:${i}`}terminate(){}}{constructor(e){super(e),this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}Oo(e,t,r,i){const s=so();return new Promise((o,u)=>{const c=new ih;c.setWithCredentials(!0),c.listenOnce(ah.COMPLETE,()=>{try{switch(c.getLastErrorCode()){case Ui.NO_ERROR:const m=c.getResponseJson();V(Pe,`XHR for RPC '${e}' ${s} received:`,JSON.stringify(m)),o(m);break;case Ui.TIMEOUT:V(Pe,`RPC '${e}' ${s} timed out`),u(new F(D.DEADLINE_EXCEEDED,"Request time out"));break;case Ui.HTTP_ERROR:const T=c.getStatus();if(V(Pe,`RPC '${e}' ${s} failed with status:`,T,"response text:",c.getResponseText()),T>0){let S=c.getResponseJson();Array.isArray(S)&&(S=S[0]);const R=S==null?void 0:S.error;if(R&&R.status&&R.message){const O=function(M){const te=M.toLowerCase().replace(/_/g,"-");return Object.values(D).indexOf(te)>=0?te:D.UNKNOWN}(R.status);u(new F(O,R.message))}else u(new F(D.UNKNOWN,"Server responded with status "+c.getStatus()))}else u(new F(D.UNAVAILABLE,"Connection failed."));break;default:W()}}finally{V(Pe,`RPC '${e}' ${s} completed.`)}});const d=JSON.stringify(i);V(Pe,`RPC '${e}' ${s} sending request:`,i),c.send(t,"POST",d,r,15)})}Lo(e,t,r){const i=so(),s=[this.bo,"/","google.firestore.v1.Firestore","/",e,"/channel"],o=uh(),u=lh(),c={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},d=this.longPollingOptions.timeoutSeconds;d!==void 0&&(c.longPollingTimeout=Math.round(1e3*d)),this.useFetchStreams&&(c.xmlHttpFactory=new sh({})),this.xo(c.initMessageHeaders,t,r),c.encodeInitMessageHeaders=!0;const m=s.join("");V(Pe,`Creating RPC '${e}' stream ${i}: ${m}`,c);const T=o.createWebChannel(m,c);let S=!1,R=!1;const O=new DE({Po:M=>{R?V(Pe,`Not sending because RPC '${e}' stream ${i} is closed:`,M):(S||(V(Pe,`Opening RPC '${e}' stream ${i} transport.`),T.open(),S=!0),V(Pe,`RPC '${e}' stream ${i} sending:`,M),T.send(M))},Io:()=>T.close()}),x=(M,te,oe)=>{M.listen(te,ie=>{try{oe(ie)}catch(me){setTimeout(()=>{throw me},0)}})};return x(T,mr.EventType.OPEN,()=>{R||(V(Pe,`RPC '${e}' stream ${i} transport opened.`),O.po())}),x(T,mr.EventType.CLOSE,()=>{R||(R=!0,V(Pe,`RPC '${e}' stream ${i} transport closed`),O.wo())}),x(T,mr.EventType.ERROR,M=>{R||(R=!0,Pn(Pe,`RPC '${e}' stream ${i} transport errored:`,M),O.wo(new F(D.UNAVAILABLE,"The operation could not be completed")))}),x(T,mr.EventType.MESSAGE,M=>{var te;if(!R){const oe=M.data[0];ge(!!oe);const ie=oe,me=ie.error||((te=ie[0])===null||te===void 0?void 0:te.error);if(me){V(Pe,`RPC '${e}' stream ${i} received error:`,me);const qe=me.status;let pe=function(y){const _=_e[y];if(_!==void 0)return Wh(_)}(qe),v=me.message;pe===void 0&&(pe=D.INTERNAL,v="Unknown error status: "+qe+" with message "+me.message),R=!0,O.wo(new F(pe,v)),T.close()}else V(Pe,`RPC '${e}' stream ${i} received:`,oe),O.So(oe)}}),x(u,oh.STAT_EVENT,M=>{M.stat===Pa.PROXY?V(Pe,`RPC '${e}' stream ${i} detected buffering proxy`):M.stat===Pa.NOPROXY&&V(Pe,`RPC '${e}' stream ${i} detected no buffering proxy`)}),setTimeout(()=>{O.yo()},0),O}}function ao(){return typeof document<"u"?document:null}/**
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
 */function lc(n){return new Gw(n,!0)}/**
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
 */class uc{constructor(e,t,r=1e3,i=1.5,s=6e4){this.ai=e,this.timerId=t,this.Bo=r,this.ko=i,this.qo=s,this.Qo=0,this.Ko=null,this.$o=Date.now(),this.reset()}reset(){this.Qo=0}Uo(){this.Qo=this.qo}Wo(e){this.cancel();const t=Math.floor(this.Qo+this.Go()),r=Math.max(0,Date.now()-this.$o),i=Math.max(0,t-r);i>0&&V("ExponentialBackoff",`Backing off for ${i} ms (base delay: ${this.Qo} ms, delay with jitter: ${t} ms, last attempt: ${r} ms ago)`),this.Ko=this.ai.enqueueAfterDelay(this.timerId,i,()=>(this.$o=Date.now(),e())),this.Qo*=this.ko,this.Qo<this.Bo&&(this.Qo=this.Bo),this.Qo>this.qo&&(this.Qo=this.qo)}zo(){this.Ko!==null&&(this.Ko.skipDelay(),this.Ko=null)}cancel(){this.Ko!==null&&(this.Ko.cancel(),this.Ko=null)}Go(){return(Math.random()-.5)*this.Qo}}/**
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
 */class NE{constructor(e,t,r,i,s,o,u,c){this.ai=e,this.jo=r,this.Ho=i,this.connection=s,this.authCredentialsProvider=o,this.appCheckCredentialsProvider=u,this.listener=c,this.state=0,this.Jo=0,this.Yo=null,this.Zo=null,this.stream=null,this.Xo=0,this.e_=new uc(e,t)}t_(){return this.state===1||this.state===5||this.n_()}n_(){return this.state===2||this.state===3}start(){this.Xo=0,this.state!==4?this.auth():this.r_()}async stop(){this.t_()&&await this.close(0)}i_(){this.state=0,this.e_.reset()}s_(){this.n_()&&this.Yo===null&&(this.Yo=this.ai.enqueueAfterDelay(this.jo,6e4,()=>this.o_()))}__(e){this.a_(),this.stream.send(e)}async o_(){if(this.n_())return this.close(0)}a_(){this.Yo&&(this.Yo.cancel(),this.Yo=null)}u_(){this.Zo&&(this.Zo.cancel(),this.Zo=null)}async close(e,t){this.a_(),this.u_(),this.e_.cancel(),this.Jo++,e!==4?this.e_.reset():t&&t.code===D.RESOURCE_EXHAUSTED?(Et(t.toString()),Et("Using maximum backoff delay to prevent overloading the backend."),this.e_.Uo()):t&&t.code===D.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.c_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.Vo(t)}c_(){}auth(){this.state=1;const e=this.l_(this.Jo),t=this.Jo;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([r,i])=>{this.Jo===t&&this.h_(r,i)},r=>{e(()=>{const i=new F(D.UNKNOWN,"Fetching auth token failed: "+r.message);return this.P_(i)})})}h_(e,t){const r=this.l_(this.Jo);this.stream=this.I_(e,t),this.stream.To(()=>{r(()=>this.listener.To())}),this.stream.Ao(()=>{r(()=>(this.state=2,this.Zo=this.ai.enqueueAfterDelay(this.Ho,1e4,()=>(this.n_()&&(this.state=3),Promise.resolve())),this.listener.Ao()))}),this.stream.Vo(i=>{r(()=>this.P_(i))}),this.stream.onMessage(i=>{r(()=>++this.Xo==1?this.T_(i):this.onNext(i))})}r_(){this.state=5,this.e_.Wo(async()=>{this.state=0,this.start()})}P_(e){return V("PersistentStream",`close with error: ${e}`),this.stream=null,this.close(4,e)}l_(e){return t=>{this.ai.enqueueAndForget(()=>this.Jo===e?t():(V("PersistentStream","stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class OE extends NE{constructor(e,t,r,i,s,o){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,r,i,o),this.serializer=s}I_(e,t){return this.connection.Lo("Listen",e,t)}T_(e){return this.onNext(e)}onNext(e){this.e_.reset();const t=Qw(this.serializer,e),r=function(s){if(!("targetChange"in s))return B.min();const o=s.targetChange;return o.targetIds&&o.targetIds.length?B.min():o.readTime?xn(o.readTime):B.min()}(e);return this.listener.E_(t,r)}d_(e){const t={};t.database=Xh(this.serializer),t.addTarget=function(s,o){let u;const c=o.target;if(u=za(c)?{documents:Jw(s,c)}:{query:Xw(s,c)._t},u.targetId=o.targetId,o.resumeToken.approximateByteSize()>0){u.resumeToken=$w(s,o.resumeToken);const d=Xa(s,o.expectedCount);d!==null&&(u.expectedCount=d)}else if(o.snapshotVersion.compareTo(B.min())>0){u.readTime=qw(s,o.snapshotVersion.toTimestamp());const d=Xa(s,o.expectedCount);d!==null&&(u.expectedCount=d)}return u}(this.serializer,e);const r=eE(this.serializer,e);r&&(t.labels=r),this.__(t)}A_(e){const t={};t.database=Xh(this.serializer),t.removeTarget=e,this.__(t)}}/**
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
 */class VE extends class{}{constructor(e,t,r,i){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=r,this.serializer=i,this.p_=!1}y_(){if(this.p_)throw new F(D.FAILED_PRECONDITION,"The client has already been terminated.")}Fo(e,t,r,i){return this.y_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([s,o])=>this.connection.Fo(e,Za(t,r),i,s,o)).catch(s=>{throw s.name==="FirebaseError"?(s.code===D.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),s):new F(D.UNKNOWN,s.toString())})}No(e,t,r,i,s){return this.y_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([o,u])=>this.connection.No(e,Za(t,r),i,o,u,s)).catch(o=>{throw o.name==="FirebaseError"?(o.code===D.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new F(D.UNKNOWN,o.toString())})}terminate(){this.p_=!0,this.connection.terminate()}}class LE{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.w_=0,this.S_=null,this.b_=!0}D_(){this.w_===0&&(this.C_("Unknown"),this.S_=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.S_=null,this.v_("Backend didn't respond within 10 seconds."),this.C_("Offline"),Promise.resolve())))}F_(e){this.state==="Online"?this.C_("Unknown"):(this.w_++,this.w_>=1&&(this.M_(),this.v_(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.C_("Offline")))}set(e){this.M_(),this.w_=0,e==="Online"&&(this.b_=!1),this.C_(e)}C_(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}v_(e){const t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.b_?(Et(t),this.b_=!1):V("OnlineStateTracker",t)}M_(){this.S_!==null&&(this.S_.cancel(),this.S_=null)}}/**
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
 */class xE{constructor(e,t,r,i,s){this.localStore=e,this.datastore=t,this.asyncQueue=r,this.remoteSyncer={},this.x_=[],this.O_=new Map,this.N_=new Set,this.L_=[],this.B_=s,this.B_.oo(o=>{r.enqueueAndForget(async()=>{kr(this)&&(V("RemoteStore","Restarting streams for network reachability change."),await async function(c){const d=q(c);d.N_.add(4),await Rr(d),d.k_.set("Unknown"),d.N_.delete(4),await rs(d)}(this))})}),this.k_=new LE(r,i)}}async function rs(n){if(kr(n))for(const e of n.L_)await e(!0)}async function Rr(n){for(const e of n.L_)await e(!1)}function hc(n,e){const t=q(n);t.O_.has(e.targetId)||(t.O_.set(e.targetId,e),ho(t)?uo(t):Hn(t).n_()&&lo(t,e))}function oo(n,e){const t=q(n),r=Hn(t);t.O_.delete(e),r.n_()&&cc(t,e),t.O_.size===0&&(r.n_()?r.s_():kr(t)&&t.k_.set("Unknown"))}function lo(n,e){if(n.q_.xe(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(B.min())>0){const t=n.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(t)}Hn(n).d_(e)}function cc(n,e){n.q_.xe(e),Hn(n).A_(e)}function uo(n){n.q_=new Hw({getRemoteKeysForTarget:e=>n.remoteSyncer.getRemoteKeysForTarget(e),ot:e=>n.O_.get(e)||null,tt:()=>n.datastore.serializer.databaseId}),Hn(n).start(),n.k_.D_()}function ho(n){return kr(n)&&!Hn(n).t_()&&n.O_.size>0}function kr(n){return q(n).N_.size===0}function dc(n){n.q_=void 0}async function FE(n){n.k_.set("Online")}async function UE(n){n.O_.forEach((e,t)=>{lo(n,e)})}async function BE(n,e){dc(n),ho(n)?(n.k_.F_(e),uo(n)):n.k_.set("Unknown")}async function HE(n,e,t){if(n.k_.set("Online"),e instanceof qh&&e.state===2&&e.cause)try{await async function(i,s){const o=s.cause;for(const u of s.targetIds)i.O_.has(u)&&(await i.remoteSyncer.rejectListen(u,o),i.O_.delete(u),i.q_.removeTarget(u))}(n,e)}catch(r){V("RemoteStore","Failed to remove targets %s: %s ",e.targetIds.join(","),r),await fc(n,r)}else if(e instanceof ts?n.q_.Ke(e):e instanceof Gh?n.q_.He(e):n.q_.We(e),!t.isEqual(B.min()))try{const r=await ic(n.localStore);t.compareTo(r)>=0&&await function(s,o){const u=s.q_.rt(o);return u.targetChanges.forEach((c,d)=>{if(c.resumeToken.approximateByteSize()>0){const m=s.O_.get(d);m&&s.O_.set(d,m.withResumeToken(c.resumeToken,o))}}),u.targetMismatches.forEach((c,d)=>{const m=s.O_.get(c);if(!m)return;s.O_.set(c,m.withResumeToken(Se.EMPTY_BYTE_STRING,m.snapshotVersion)),cc(s,c);const T=new Wt(m.target,c,d,m.sequenceNumber);lo(s,T)}),s.remoteSyncer.applyRemoteEvent(u)}(n,t)}catch(r){V("RemoteStore","Failed to raise snapshot:",r),await fc(n,r)}}async function fc(n,e,t){if(!yr(e))throw e;n.N_.add(1),await Rr(n),n.k_.set("Offline"),t||(t=()=>ic(n.localStore)),n.asyncQueue.enqueueRetryable(async()=>{V("RemoteStore","Retrying IndexedDB access"),await t(),n.N_.delete(1),await rs(n)})}async function mc(n,e){const t=q(n);t.asyncQueue.verifyOperationInProgress(),V("RemoteStore","RemoteStore received new credentials");const r=kr(t);t.N_.add(3),await Rr(t),r&&t.k_.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.N_.delete(3),await rs(t)}async function WE(n,e){const t=q(n);e?(t.N_.delete(2),await rs(t)):e||(t.N_.add(2),await Rr(t),t.k_.set("Unknown"))}function Hn(n){return n.Q_||(n.Q_=function(t,r,i){const s=q(t);return s.y_(),new OE(r,s.connection,s.authCredentials,s.appCheckCredentials,s.serializer,i)}(n.datastore,n.asyncQueue,{To:FE.bind(null,n),Ao:UE.bind(null,n),Vo:BE.bind(null,n),E_:HE.bind(null,n)}),n.L_.push(async e=>{e?(n.Q_.i_(),ho(n)?uo(n):n.k_.set("Unknown")):(await n.Q_.stop(),dc(n))})),n.Q_}/**
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
 */class co{constructor(e,t,r,i,s){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=r,this.op=i,this.removalCallback=s,this.deferred=new Dn,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(o=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,t,r,i,s){const o=Date.now()+r,u=new co(e,t,o,i,s);return u.start(r),u}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new F(D.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function pc(n,e){if(Et("AsyncQueue",`${e}: ${n}`),yr(n))return new F(D.UNAVAILABLE,`${e}: ${n}`);throw n}/**
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
 */class Wn{constructor(e){this.comparator=e?(t,r)=>e(t,r)||U.comparator(t.key,r.key):(t,r)=>U.comparator(t.key,r.key),this.keyedMap=Ir(),this.sortedSet=new fe(this.comparator)}static emptySet(e){return new Wn(e.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((t,r)=>(e(t),!1))}add(e){const t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){const t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof Wn)||this.size!==e.size)return!1;const t=this.sortedSet.getIterator(),r=e.sortedSet.getIterator();for(;t.hasNext();){const i=t.getNext().key,s=r.getNext().key;if(!i.isEqual(s))return!1}return!0}toString(){const e=[];return this.forEach(t=>{e.push(t.toString())}),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,t){const r=new Wn;return r.comparator=this.comparator,r.keyedMap=e,r.sortedSet=t,r}}/**
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
 */class gc{constructor(){this.U_=new fe(U.comparator)}track(e){const t=e.doc.key,r=this.U_.get(t);r?e.type!==0&&r.type===3?this.U_=this.U_.insert(t,e):e.type===3&&r.type!==1?this.U_=this.U_.insert(t,{type:r.type,doc:e.doc}):e.type===2&&r.type===2?this.U_=this.U_.insert(t,{type:2,doc:e.doc}):e.type===2&&r.type===0?this.U_=this.U_.insert(t,{type:0,doc:e.doc}):e.type===1&&r.type===0?this.U_=this.U_.remove(t):e.type===1&&r.type===2?this.U_=this.U_.insert(t,{type:1,doc:r.doc}):e.type===0&&r.type===1?this.U_=this.U_.insert(t,{type:2,doc:e.doc}):W():this.U_=this.U_.insert(t,e)}W_(){const e=[];return this.U_.inorderTraversal((t,r)=>{e.push(r)}),e}}class Yn{constructor(e,t,r,i,s,o,u,c,d){this.query=e,this.docs=t,this.oldDocs=r,this.docChanges=i,this.mutatedKeys=s,this.fromCache=o,this.syncStateChanged=u,this.excludesMetadataChanges=c,this.hasCachedResults=d}static fromInitialDocuments(e,t,r,i,s){const o=[];return t.forEach(u=>{o.push({type:0,doc:u})}),new Yn(e,t,Wn.emptySet(t),o,r,i,!0,!1,s)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&$i(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const t=this.docChanges,r=e.docChanges;if(t.length!==r.length)return!1;for(let i=0;i<t.length;i++)if(t[i].type!==r[i].type||!t[i].doc.isEqual(r[i].doc))return!1;return!0}}/**
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
 */class YE{constructor(){this.G_=void 0,this.z_=[]}j_(){return this.z_.some(e=>e.H_())}}class zE{constructor(){this.queries=yc(),this.onlineState="Unknown",this.J_=new Set}terminate(){(function(t,r){const i=q(t),s=i.queries;i.queries=yc(),s.forEach((o,u)=>{for(const c of u.z_)c.onError(r)})})(this,new F(D.ABORTED,"Firestore shutting down"))}}function yc(){return new Ln(n=>kh(n),$i)}async function GE(n,e){const t=q(n);let r=3;const i=e.query;let s=t.queries.get(i);s?!s.j_()&&e.H_()&&(r=2):(s=new YE,r=e.H_()?0:1);try{switch(r){case 0:s.G_=await t.onListen(i,!0);break;case 1:s.G_=await t.onListen(i,!1);break;case 2:await t.onFirstRemoteStoreListen(i)}}catch(o){const u=pc(o,`Initialization of query '${Vn(e.query)}' failed`);return void e.onError(u)}t.queries.set(i,s),s.z_.push(e),e.Y_(t.onlineState),s.G_&&e.Z_(s.G_)&&fo(t)}async function qE(n,e){const t=q(n),r=e.query;let i=3;const s=t.queries.get(r);if(s){const o=s.z_.indexOf(e);o>=0&&(s.z_.splice(o,1),s.z_.length===0?i=e.H_()?0:1:!s.j_()&&e.H_()&&(i=2))}switch(i){case 0:return t.queries.delete(r),t.onUnlisten(r,!0);case 1:return t.queries.delete(r),t.onUnlisten(r,!1);case 2:return t.onLastRemoteStoreUnlisten(r);default:return}}function $E(n,e){const t=q(n);let r=!1;for(const i of e){const s=i.query,o=t.queries.get(s);if(o){for(const u of o.z_)u.Z_(i)&&(r=!0);o.G_=i}}r&&fo(t)}function jE(n,e,t){const r=q(n),i=r.queries.get(e);if(i)for(const s of i.z_)s.onError(t);r.queries.delete(e)}function fo(n){n.J_.forEach(e=>{e.next()})}var mo,_c;(_c=mo||(mo={})).X_="default",_c.Cache="cache";class KE{constructor(e,t,r){this.query=e,this.ea=t,this.ta=!1,this.na=null,this.onlineState="Unknown",this.options=r||{}}Z_(e){if(!this.options.includeMetadataChanges){const r=[];for(const i of e.docChanges)i.type!==3&&r.push(i);e=new Yn(e.query,e.docs,e.oldDocs,r,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.ta?this.ra(e)&&(this.ea.next(e),t=!0):this.ia(e,this.onlineState)&&(this.sa(e),t=!0),this.na=e,t}onError(e){this.ea.error(e)}Y_(e){this.onlineState=e;let t=!1;return this.na&&!this.ta&&this.ia(this.na,e)&&(this.sa(this.na),t=!0),t}ia(e,t){if(!e.fromCache||!this.H_())return!0;const r=t!=="Offline";return(!this.options.oa||!r)&&(!e.docs.isEmpty()||e.hasCachedResults||t==="Offline")}ra(e){if(e.docChanges.length>0)return!0;const t=this.na&&this.na.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&this.options.includeMetadataChanges===!0}sa(e){e=Yn.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.ta=!0,this.ea.next(e)}H_(){return this.options.source!==mo.Cache}}/**
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
 */class vc{constructor(e){this.key=e}}class wc{constructor(e){this.key=e}}class QE{constructor(e,t){this.query=e,this.Ia=t,this.Ta=null,this.hasCachedResults=!1,this.current=!1,this.Ea=K(),this.mutatedKeys=K(),this.da=Ph(e),this.Aa=new Wn(this.da)}get Ra(){return this.Ia}Va(e,t){const r=t?t.ma:new gc,i=t?t.Aa:this.Aa;let s=t?t.mutatedKeys:this.mutatedKeys,o=i,u=!1;const c=this.query.limitType==="F"&&i.size===this.query.limit?i.last():null,d=this.query.limitType==="L"&&i.size===this.query.limit?i.first():null;if(e.inorderTraversal((m,T)=>{const S=i.get(m),R=ji(this.query,T)?T:null,O=!!S&&this.mutatedKeys.has(S.key),x=!!R&&(R.hasLocalMutations||this.mutatedKeys.has(R.key)&&R.hasCommittedMutations);let M=!1;S&&R?S.data.isEqual(R.data)?O!==x&&(r.track({type:3,doc:R}),M=!0):this.fa(S,R)||(r.track({type:2,doc:R}),M=!0,(c&&this.da(R,c)>0||d&&this.da(R,d)<0)&&(u=!0)):!S&&R?(r.track({type:0,doc:R}),M=!0):S&&!R&&(r.track({type:1,doc:S}),M=!0,(c||d)&&(u=!0)),M&&(R?(o=o.add(R),s=x?s.add(m):s.delete(m)):(o=o.delete(m),s=s.delete(m)))}),this.query.limit!==null)for(;o.size>this.query.limit;){const m=this.query.limitType==="F"?o.last():o.first();o=o.delete(m.key),s=s.delete(m.key),r.track({type:1,doc:m})}return{Aa:o,ma:r,ts:u,mutatedKeys:s}}fa(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,r,i){const s=this.Aa;this.Aa=e.Aa,this.mutatedKeys=e.mutatedKeys;const o=e.ma.W_();o.sort((m,T)=>function(R,O){const x=M=>{switch(M){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return W()}};return x(R)-x(O)}(m.type,T.type)||this.da(m.doc,T.doc)),this.ga(r),i=i!=null&&i;const u=t&&!i?this.pa():[],c=this.Ea.size===0&&this.current&&!i?1:0,d=c!==this.Ta;return this.Ta=c,o.length!==0||d?{snapshot:new Yn(this.query,e.Aa,s,o,e.mutatedKeys,c===0,d,!1,!!r&&r.resumeToken.approximateByteSize()>0),ya:u}:{ya:u}}Y_(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({Aa:this.Aa,ma:new gc,mutatedKeys:this.mutatedKeys,ts:!1},!1)):{ya:[]}}wa(e){return!this.Ia.has(e)&&!!this.Aa.has(e)&&!this.Aa.get(e).hasLocalMutations}ga(e){e&&(e.addedDocuments.forEach(t=>this.Ia=this.Ia.add(t)),e.modifiedDocuments.forEach(t=>{}),e.removedDocuments.forEach(t=>this.Ia=this.Ia.delete(t)),this.current=e.current)}pa(){if(!this.current)return[];const e=this.Ea;this.Ea=K(),this.Aa.forEach(r=>{this.wa(r.key)&&(this.Ea=this.Ea.add(r.key))});const t=[];return e.forEach(r=>{this.Ea.has(r)||t.push(new wc(r))}),this.Ea.forEach(r=>{e.has(r)||t.push(new vc(r))}),t}Sa(e){this.Ia=e.Is,this.Ea=K();const t=this.Va(e.documents);return this.applyChanges(t,!0)}ba(){return Yn.fromInitialDocuments(this.query,this.Aa,this.mutatedKeys,this.Ta===0,this.hasCachedResults)}}class JE{constructor(e,t,r){this.query=e,this.targetId=t,this.view=r}}class XE{constructor(e){this.key=e,this.Da=!1}}class ZE{constructor(e,t,r,i,s,o){this.localStore=e,this.remoteStore=t,this.eventManager=r,this.sharedClientState=i,this.currentUser=s,this.maxConcurrentLimboResolutions=o,this.Ca={},this.va=new Ln(u=>kh(u),$i),this.Fa=new Map,this.Ma=new Set,this.xa=new fe(U.comparator),this.Oa=new Map,this.Na=new to,this.La={},this.Ba=new Map,this.ka=Bn.Bn(),this.onlineState="Unknown",this.qa=void 0}get isPrimaryClient(){return this.qa===!0}}async function e0(n,e,t=!0){const r=bc(n);let i;const s=r.va.get(e);return s?(r.sharedClientState.addLocalQueryTarget(s.targetId),i=s.view.ba()):i=await Ec(r,e,t,!0),i}async function t0(n,e){const t=bc(n);await Ec(t,e,!0,!1)}async function Ec(n,e,t,r){const i=await CE(n.localStore,ut(e)),s=i.targetId,o=t?n.sharedClientState.addLocalQueryTarget(s):"not-current";let u;return r&&(u=await n0(n,e,s,o==="current",i.resumeToken)),n.isPrimaryClient&&t&&hc(n.remoteStore,i),u}async function n0(n,e,t,r,i){n.Qa=(T,S,R)=>async function(x,M,te,oe){let ie=M.view.Va(te);ie.ts&&(ie=await sc(x.localStore,M.query,!1).then(({documents:v})=>M.view.Va(v,ie)));const me=oe&&oe.targetChanges.get(M.targetId),qe=oe&&oe.targetMismatches.get(M.targetId)!=null,pe=M.view.applyChanges(ie,x.isPrimaryClient,me,qe);return Sc(x,M.targetId,pe.ya),pe.snapshot}(n,T,S,R);const s=await sc(n.localStore,e,!0),o=new QE(e,s.Is),u=o.Va(s.documents),c=br.createSynthesizedTargetChangeForCurrentChange(t,r&&n.onlineState!=="Offline",i),d=o.applyChanges(u,n.isPrimaryClient,c);Sc(n,t,d.ya);const m=new JE(e,t,o);return n.va.set(e,m),n.Fa.has(t)?n.Fa.get(t).push(e):n.Fa.set(t,[e]),d.snapshot}async function r0(n,e,t){const r=q(n),i=r.va.get(e),s=r.Fa.get(i.targetId);if(s.length>1)return r.Fa.set(i.targetId,s.filter(o=>!$i(o,e))),void r.va.delete(e);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(i.targetId),r.sharedClientState.isActiveQueryTarget(i.targetId)||await io(r.localStore,i.targetId,!1).then(()=>{r.sharedClientState.clearQueryState(i.targetId),t&&oo(r.remoteStore,i.targetId),po(r,i.targetId)}).catch(Ma)):(po(r,i.targetId),await io(r.localStore,i.targetId,!0))}async function i0(n,e){const t=q(n),r=t.va.get(e),i=t.Fa.get(r.targetId);t.isPrimaryClient&&i.length===1&&(t.sharedClientState.removeLocalQueryTarget(r.targetId),oo(t.remoteStore,r.targetId))}async function Tc(n,e){const t=q(n);try{const r=await AE(t.localStore,e);e.targetChanges.forEach((i,s)=>{const o=t.Oa.get(s);o&&(ge(i.addedDocuments.size+i.modifiedDocuments.size+i.removedDocuments.size<=1),i.addedDocuments.size>0?o.Da=!0:i.modifiedDocuments.size>0?ge(o.Da):i.removedDocuments.size>0&&(ge(o.Da),o.Da=!1))}),await Cc(t,r,e)}catch(r){await Ma(r)}}function Ic(n,e,t){const r=q(n);if(r.isPrimaryClient&&t===0||!r.isPrimaryClient&&t===1){const i=[];r.va.forEach((s,o)=>{const u=o.view.Y_(e);u.snapshot&&i.push(u.snapshot)}),function(o,u){const c=q(o);c.onlineState=u;let d=!1;c.queries.forEach((m,T)=>{for(const S of T.z_)S.Y_(u)&&(d=!0)}),d&&fo(c)}(r.eventManager,e),i.length&&r.Ca.E_(i),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function s0(n,e,t){const r=q(n);r.sharedClientState.updateQueryState(e,"rejected",t);const i=r.Oa.get(e),s=i&&i.key;if(s){let o=new fe(U.comparator);o=o.insert(s,ke.newNoDocument(s,B.min()));const u=K().add(s),c=new es(B.min(),new Map,new fe(ee),o,u);await Tc(r,c),r.xa=r.xa.remove(s),r.Oa.delete(e),go(r)}else await io(r.localStore,e,!1).then(()=>po(r,e,t)).catch(Ma)}function po(n,e,t=null){n.sharedClientState.removeLocalQueryTarget(e);for(const r of n.Fa.get(e))n.va.delete(r),t&&n.Ca.Ka(r,t);n.Fa.delete(e),n.isPrimaryClient&&n.Na.mr(e).forEach(r=>{n.Na.containsKey(r)||Ac(n,r)})}function Ac(n,e){n.Ma.delete(e.path.canonicalString());const t=n.xa.get(e);t!==null&&(oo(n.remoteStore,t),n.xa=n.xa.remove(e),n.Oa.delete(t),go(n))}function Sc(n,e,t){for(const r of t)r instanceof vc?(n.Na.addReference(r.key,e),a0(n,r)):r instanceof wc?(V("SyncEngine","Document no longer in limbo: "+r.key),n.Na.removeReference(r.key,e),n.Na.containsKey(r.key)||Ac(n,r.key)):W()}function a0(n,e){const t=e.key,r=t.path.canonicalString();n.xa.get(t)||n.Ma.has(r)||(V("SyncEngine","New document in limbo: "+t),n.Ma.add(r),go(n))}function go(n){for(;n.Ma.size>0&&n.xa.size<n.maxConcurrentLimboResolutions;){const e=n.Ma.values().next().value;n.Ma.delete(e);const t=new U(he.fromString(e)),r=n.ka.next();n.Oa.set(r,new XE(t)),n.xa=n.xa.insert(t,r),hc(n.remoteStore,new Wt(ut(Ga(t.path)),r,"TargetPurposeLimboResolution",Na.oe))}}async function Cc(n,e,t){const r=q(n),i=[],s=[],o=[];r.va.isEmpty()||(r.va.forEach((u,c)=>{o.push(r.Qa(c,e,t).then(d=>{var m;if((d||t)&&r.isPrimaryClient){const T=d?!d.fromCache:(m=t==null?void 0:t.targetChanges.get(c.targetId))===null||m===void 0?void 0:m.current;r.sharedClientState.updateQueryState(c.targetId,T?"current":"not-current")}if(d){i.push(d);const T=ro.Ui(c.targetId,d);s.push(T)}}))}),await Promise.all(o),r.Ca.E_(i),await async function(c,d){const m=q(c);try{await m.persistence.runTransaction("notifyLocalViewChanges","readwrite",T=>C.forEach(d,S=>C.forEach(S.Ki,R=>m.persistence.referenceDelegate.addReference(T,S.targetId,R)).next(()=>C.forEach(S.$i,R=>m.persistence.referenceDelegate.removeReference(T,S.targetId,R)))))}catch(T){if(!yr(T))throw T;V("LocalStore","Failed to update sequence numbers: "+T)}for(const T of d){const S=T.targetId;if(!T.fromCache){const R=m.ss.get(S),O=R.snapshotVersion,x=R.withLastLimboFreeSnapshotVersion(O);m.ss=m.ss.insert(S,x)}}}(r.localStore,s))}async function o0(n,e){const t=q(n);if(!t.currentUser.isEqual(e)){V("SyncEngine","User change. New user:",e.toKey());const r=await rc(t.localStore,e);t.currentUser=e,function(s,o){s.Ba.forEach(u=>{u.forEach(c=>{c.reject(new F(D.CANCELLED,o))})}),s.Ba.clear()}(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,r.removedBatchIds,r.addedBatchIds),await Cc(t,r.ls)}}function l0(n,e){const t=q(n),r=t.Oa.get(e);if(r&&r.Da)return K().add(r.key);{let i=K();const s=t.Fa.get(e);if(!s)return i;for(const o of s){const u=t.va.get(o);i=i.unionWith(u.view.Ra)}return i}}function bc(n){const e=q(n);return e.remoteStore.remoteSyncer.applyRemoteEvent=Tc.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=l0.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=s0.bind(null,e),e.Ca.E_=$E.bind(null,e.eventManager),e.Ca.Ka=jE.bind(null,e.eventManager),e}class Rc{constructor(){this.synchronizeTabs=!1}async initialize(e){this.serializer=lc(e.databaseInfo.databaseId),this.sharedClientState=this.createSharedClientState(e),this.persistence=this.createPersistence(e),await this.persistence.start(),this.localStore=this.createLocalStore(e),this.gcScheduler=this.createGarbageCollectionScheduler(e,this.localStore),this.indexBackfillerScheduler=this.createIndexBackfillerScheduler(e,this.localStore)}createGarbageCollectionScheduler(e,t){return null}createIndexBackfillerScheduler(e,t){return null}createLocalStore(e){return IE(this.persistence,new EE,e.initialUser,this.serializer)}createPersistence(e){return new _E(no.Yr,this.serializer)}createSharedClientState(e){return new RE}async terminate(){var e,t;(e=this.gcScheduler)===null||e===void 0||e.stop(),(t=this.indexBackfillerScheduler)===null||t===void 0||t.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}class u0{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>Ic(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=o0.bind(null,this.syncEngine),await WE(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return function(){return new zE}()}createDatastore(e){const t=lc(e.databaseInfo.databaseId),r=function(s){return new ME(s)}(e.databaseInfo);return function(s,o,u,c){return new VE(s,o,u,c)}(e.authCredentials,e.appCheckCredentials,r,t)}createRemoteStore(e){return function(r,i,s,o,u){return new xE(r,i,s,o,u)}(this.localStore,this.datastore,e.asyncQueue,t=>Ic(this.syncEngine,t,0),function(){return oc.D()?new oc:new kE}())}createSyncEngine(e,t){return function(i,s,o,u,c,d,m){const T=new ZE(i,s,o,u,c,d);return m&&(T.qa=!0),T}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){var e,t;await async function(i){const s=q(i);V("RemoteStore","RemoteStore shutting down."),s.N_.add(5),await Rr(s),s.B_.shutdown(),s.k_.set("Unknown")}(this.remoteStore),(e=this.datastore)===null||e===void 0||e.terminate(),(t=this.eventManager)===null||t===void 0||t.terminate()}}/**
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
 */class h0{constructor(e){this.observer=e,this.muted=!1}next(e){this.observer.next&&this.Wa(this.observer.next,e)}error(e){this.observer.error?this.Wa(this.observer.error,e):Et("Uncaught Error in snapshot listener:",e.toString())}Ga(){this.muted=!0}Wa(e,t){this.muted||setTimeout(()=>{this.muted||e(t)},0)}}/**
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
 */class c0{constructor(e,t,r,i){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=r,this.databaseInfo=i,this.user=Re.UNAUTHENTICATED,this.clientId=dh.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this.authCredentials.start(r,async s=>{V("FirestoreClient","Received user=",s.uid),await this.authCredentialListener(s),this.user=s}),this.appCheckCredentials.start(r,s=>(V("FirestoreClient","Received new app check token=",s),this.appCheckCredentialListener(s,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}verifyNotTerminated(){if(this.asyncQueue.isShuttingDown)throw new F(D.FAILED_PRECONDITION,"The client has already been terminated.")}terminate(){this.asyncQueue.enterRestrictedMode();const e=new Dn;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const r=pc(t,"Failed to shutdown persistence");e.reject(r)}}),e.promise}}async function yo(n,e){n.asyncQueue.verifyOperationInProgress(),V("FirestoreClient","Initializing OfflineComponentProvider");const t=n.configuration;await e.initialize(t);let r=t.initialUser;n.setCredentialChangeListener(async i=>{r.isEqual(i)||(await rc(e.localStore,i),r=i)}),e.persistence.setDatabaseDeletedListener(()=>n.terminate()),n._offlineComponents=e}async function kc(n,e){n.asyncQueue.verifyOperationInProgress();const t=await f0(n);V("FirestoreClient","Initializing OnlineComponentProvider"),await e.initialize(t,n.configuration),n.setCredentialChangeListener(r=>mc(e.remoteStore,r)),n.setAppCheckTokenChangeListener((r,i)=>mc(e.remoteStore,i)),n._onlineComponents=e}function d0(n){return n.name==="FirebaseError"?n.code===D.FAILED_PRECONDITION||n.code===D.UNIMPLEMENTED:!(typeof DOMException<"u"&&n instanceof DOMException)||n.code===22||n.code===20||n.code===11}async function f0(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){V("FirestoreClient","Using user provided OfflineComponentProvider");try{await yo(n,n._uninitializedComponentsProvider._offline)}catch(e){const t=e;if(!d0(t))throw t;Pn("Error using user provided cache. Falling back to memory cache: "+t),await yo(n,new Rc)}}else V("FirestoreClient","Using default OfflineComponentProvider"),await yo(n,new Rc);return n._offlineComponents}async function m0(n){return n._onlineComponents||(n._uninitializedComponentsProvider?(V("FirestoreClient","Using user provided OnlineComponentProvider"),await kc(n,n._uninitializedComponentsProvider._online)):(V("FirestoreClient","Using default OnlineComponentProvider"),await kc(n,new u0))),n._onlineComponents}async function Pc(n){const e=await m0(n),t=e.eventManager;return t.onListen=e0.bind(null,e.syncEngine),t.onUnlisten=r0.bind(null,e.syncEngine),t.onFirstRemoteStoreListen=t0.bind(null,e.syncEngine),t.onLastRemoteStoreUnlisten=i0.bind(null,e.syncEngine),t}/**
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
 */function Dc(n){const e={};return n.timeoutSeconds!==void 0&&(e.timeoutSeconds=n.timeoutSeconds),e}/**
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
 */const Mc=new Map;/**
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
 */function p0(n,e,t){if(!t)throw new F(D.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${e}.`)}function g0(n,e,t,r){if(e===!0&&r===!0)throw new F(D.INVALID_ARGUMENT,`${n} and ${t} cannot be used together.`)}function Nc(n){if(!U.isDocumentKey(n))throw new F(D.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function y0(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{const e=function(r){return r.constructor?r.constructor.name:null}(n);return e?`a custom ${e} object`:"an object"}}return typeof n=="function"?"a function":W()}function is(n,e){if("_delegate"in n&&(n=n._delegate),!(n instanceof e)){if(e.name===n.constructor.name)throw new F(D.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const t=y0(n);throw new F(D.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return n}/**
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
 */class Oc{constructor(e){var t,r;if(e.host===void 0){if(e.ssl!==void 0)throw new F(D.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host="firestore.googleapis.com",this.ssl=!0}else this.host=e.host,this.ssl=(t=e.ssl)===null||t===void 0||t;if(this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=41943040;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<1048576)throw new F(D.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}g0("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=Dc((r=e.experimentalLongPollingOptions)!==null&&r!==void 0?r:{}),function(s){if(s.timeoutSeconds!==void 0){if(isNaN(s.timeoutSeconds))throw new F(D.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (must not be NaN)`);if(s.timeoutSeconds<5)throw new F(D.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (minimum allowed value is 5)`);if(s.timeoutSeconds>30)throw new F(D.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(r,i){return r.timeoutSeconds===i.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class _o{constructor(e,t,r,i){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=r,this._app=i,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Oc({}),this._settingsFrozen=!1}get app(){if(!this._app)throw new F(D.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!==void 0}_setSettings(e){if(this._settingsFrozen)throw new F(D.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Oc(e),e.credentials!==void 0&&(this._authCredentials=function(r){if(!r)return new Yv;switch(r.type){case"firstParty":return new $v(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new F(D.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask||(this._terminateTask=this._terminate()),this._terminateTask}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(t){const r=Mc.get(t);r&&(V("ComponentProvider","Removing Datastore"),Mc.delete(t),r.terminate())}(this),Promise.resolve()}}function _0(n,e,t,r={}){var i;const s=(n=is(n,_o))._getSettings(),o=`${e}:${t}`;if(s.host!=="firestore.googleapis.com"&&s.host!==o&&Pn("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used."),n._setSettings(Object.assign(Object.assign({},s),{host:o,ssl:!1})),r.mockUserToken){let u,c;if(typeof r.mockUserToken=="string")u=r.mockUserToken,c=Re.MOCK_USER;else{u=Ey(r.mockUserToken,(i=n._app)===null||i===void 0?void 0:i.options.projectId);const d=r.mockUserToken.sub||r.mockUserToken.user_id;if(!d)throw new F(D.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");c=new Re(d)}n._authCredentials=new zv(new ch(u,c))}}/**
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
 */class ss{constructor(e,t,r){this.converter=t,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new ss(this.firestore,e,this._query)}}class Tt{constructor(e,t,r){this.converter=t,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new Pr(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new Tt(this.firestore,e,this._key)}}class Pr extends ss{constructor(e,t,r){super(e,t,Ga(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new Tt(this.firestore,null,new U(e))}withConverter(e){return new Pr(this.firestore,e,this._path)}}function Vc(n,e,...t){if(n=Dt(n),arguments.length===1&&(e=dh.newId()),p0("doc","path",e),n instanceof _o){const r=he.fromString(e,...t);return Nc(r),new Tt(n,null,new U(r))}{if(!(n instanceof Tt||n instanceof Pr))throw new F(D.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(he.fromString(e,...t));return Nc(r),new Tt(n.firestore,n instanceof Pr?n.converter:null,new U(r))}}/**
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
 */class v0{constructor(){this._u=Promise.resolve(),this.au=[],this.uu=!1,this.cu=[],this.lu=null,this.hu=!1,this.Pu=!1,this.Iu=[],this.e_=new uc(this,"async_queue_retry"),this.Tu=()=>{const t=ao();t&&V("AsyncQueue","Visibility state changed to "+t.visibilityState),this.e_.zo()};const e=ao();e&&typeof e.addEventListener=="function"&&e.addEventListener("visibilitychange",this.Tu)}get isShuttingDown(){return this.uu}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.Eu(),this.du(e)}enterRestrictedMode(e){if(!this.uu){this.uu=!0,this.Pu=e||!1;const t=ao();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this.Tu)}}enqueue(e){if(this.Eu(),this.uu)return new Promise(()=>{});const t=new Dn;return this.du(()=>this.uu&&this.Pu?Promise.resolve():(e().then(t.resolve,t.reject),t.promise)).then(()=>t.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.au.push(e),this.Au()))}async Au(){if(this.au.length!==0){try{await this.au[0](),this.au.shift(),this.e_.reset()}catch(e){if(!yr(e))throw e;V("AsyncQueue","Operation failed with retryable error: "+e)}this.au.length>0&&this.e_.Wo(()=>this.Au())}}du(e){const t=this._u.then(()=>(this.hu=!0,e().catch(r=>{this.lu=r,this.hu=!1;const i=function(o){let u=o.message||"";return o.stack&&(u=o.stack.includes(o.message)?o.stack:o.message+`
`+o.stack),u}(r);throw Et("INTERNAL UNHANDLED ERROR: ",i),r}).then(r=>(this.hu=!1,r))));return this._u=t,t}enqueueAfterDelay(e,t,r){this.Eu(),this.Iu.indexOf(e)>-1&&(t=0);const i=co.createAndSchedule(this,e,t,r,s=>this.Ru(s));return this.cu.push(i),i}Eu(){this.lu&&W()}verifyOperationInProgress(){}async Vu(){let e;do e=this._u,await e;while(e!==this._u)}mu(e){for(const t of this.cu)if(t.timerId===e)return!0;return!1}fu(e){return this.Vu().then(()=>{this.cu.sort((t,r)=>t.targetTimeMs-r.targetTimeMs);for(const t of this.cu)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.Vu()})}gu(e){this.Iu.push(e)}Ru(e){const t=this.cu.indexOf(e);this.cu.splice(t,1)}}function Lc(n){return function(t,r){if(typeof t!="object"||t===null)return!1;const i=t;for(const s of r)if(s in i&&typeof i[s]=="function")return!0;return!1}(n,["next","error","complete"])}class vo extends _o{constructor(e,t,r,i){super(e,t,r,i),this.type="firestore",this._queue=function(){return new v0}(),this._persistenceKey=(i==null?void 0:i.name)||"[DEFAULT]"}_terminate(){return this._firestoreClient||xc(this),this._firestoreClient.terminate()}}function w0(n,e){const t=typeof n=="object"?n:yu(),r=typeof n=="string"?n:"(default)",i=Ea(t,"firestore").getImmediate({identifier:r});if(!i._initialized){const s=vy("firestore");s&&_0(i,...s)}return i}function E0(n){return n._firestoreClient||xc(n),n._firestoreClient.verifyNotTerminated(),n._firestoreClient}function xc(n){var e,t,r;const i=n._freezeSettings(),s=function(u,c,d,m){return new aw(u,c,d,m.host,m.ssl,m.experimentalForceLongPolling,m.experimentalAutoDetectLongPolling,Dc(m.experimentalLongPollingOptions),m.useFetchStreams)}(n._databaseId,((e=n._app)===null||e===void 0?void 0:e.options.appId)||"",n._persistenceKey,i);n._firestoreClient=new c0(n._authCredentials,n._appCheckCredentials,n._queue,s),!((t=i.localCache)===null||t===void 0)&&t._offlineComponentProvider&&(!((r=i.localCache)===null||r===void 0)&&r._onlineComponentProvider)&&(n._firestoreClient._uninitializedComponentsProvider={_offlineKind:i.localCache.kind,_offline:i.localCache._offlineComponentProvider,_online:i.localCache._onlineComponentProvider})}/**
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
 */class as{constructor(e){this._byteString=e}static fromBase64String(e){try{return new as(Se.fromBase64String(e))}catch(t){throw new F(D.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new as(Se.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}}/**
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
 */class Fc{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new F(D.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new Ve(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
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
 */class T0{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new F(D.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new F(D.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(e){return ee(this._lat,e._lat)||ee(this._long,e._long)}}const I0=new RegExp("[~\\*/\\[\\]]");function A0(n,e,t){if(e.search(I0)>=0)throw Uc(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,n);try{return new Fc(...e.split("."))._internalPath}catch{throw Uc(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n)}}function Uc(n,e,t,r,i){let s=`Function ${e}() called with invalid data`;s+=". ";let o="";return new F(D.INVALID_ARGUMENT,s+n+o)}/**
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
 */class Bc{constructor(e,t,r,i,s){this._firestore=e,this._userDataWriter=t,this._key=r,this._document=i,this._converter=s}get id(){return this._key.path.lastSegment()}get ref(){return new Tt(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new S0(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){const t=this._document.data.field(Hc("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}}class S0 extends Bc{data(){return super.data()}}function Hc(n,e){return typeof e=="string"?A0(n,e):e instanceof Fc?e._internalPath:e._delegate._internalPath}/**
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
 */function C0(n){if(n.limitType==="L"&&n.explicitOrderBy.length===0)throw new F(D.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class b0{convertValue(e,t="none"){switch(ln(e)){case 0:return null;case 1:return e.booleanValue;case 2:return ye(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(on(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 10:return this.convertObject(e.mapValue,t);default:throw W()}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){const r={};return Hi(e,(i,s)=>{r[i]=this.convertValue(s,t)}),r}convertGeoPoint(e){return new T0(ye(e.latitude),ye(e.longitude))}convertArray(e,t){return(e.values||[]).map(r=>this.convertValue(r,t))}convertServerTimestamp(e,t){switch(t){case"previous":const r=La(e);return r==null?null:this.convertValue(r,t);case"estimate":return this.convertTimestamp(_r(e));default:return null}}convertTimestamp(e){const t=Bt(e);return new Ue(t.seconds,t.nanos)}convertDocumentKey(e,t){const r=he.fromString(e);ge(nc(r));const i=new vr(r.get(1),r.get(3)),s=new U(r.popFirst(5));return i.isEqual(t)||Et(`Document ${s} contains a document reference within a different database (${i.projectId}/${i.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),s}}/**
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
 */class Dr{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class Wc extends Bc{constructor(e,t,r,i,s,o){super(e,t,r,i,o),this._firestore=e,this._firestoreImpl=e,this.metadata=s}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new os(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const r=this._document.data.field(Hc("DocumentSnapshot.get",e));if(r!==null)return this._userDataWriter.convertValue(r,t.serverTimestamps)}}}class os extends Wc{data(e={}){return super.data(e)}}class R0{constructor(e,t,r,i){this._firestore=e,this._userDataWriter=t,this._snapshot=i,this.metadata=new Dr(i.hasPendingWrites,i.fromCache),this.query=r}get docs(){const e=[];return this.forEach(t=>e.push(t)),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,t){this._snapshot.docs.forEach(r=>{e.call(t,new os(this._firestore,this._userDataWriter,r.key,r,new Dr(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){const t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new F(D.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=function(i,s){if(i._snapshot.oldDocs.isEmpty()){let o=0;return i._snapshot.docChanges.map(u=>{const c=new os(i._firestore,i._userDataWriter,u.doc.key,u.doc,new Dr(i._snapshot.mutatedKeys.has(u.doc.key),i._snapshot.fromCache),i.query.converter);return u.doc,{type:"added",doc:c,oldIndex:-1,newIndex:o++}})}{let o=i._snapshot.oldDocs;return i._snapshot.docChanges.filter(u=>s||u.type!==3).map(u=>{const c=new os(i._firestore,i._userDataWriter,u.doc.key,u.doc,new Dr(i._snapshot.mutatedKeys.has(u.doc.key),i._snapshot.fromCache),i.query.converter);let d=-1,m=-1;return u.type!==0&&(d=o.indexOf(u.doc.key),o=o.delete(u.doc.key)),u.type!==1&&(o=o.add(u.doc),m=o.indexOf(u.doc.key)),{type:k0(u.type),doc:c,oldIndex:d,newIndex:m}})}}(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}}function k0(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return W()}}class Yc extends b0{constructor(e){super(),this.firestore=e}convertBytes(e){return new as(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new Tt(this.firestore,null,t)}}function zc(n,...e){var t,r,i;n=Dt(n);let s={includeMetadataChanges:!1,source:"default"},o=0;typeof e[o]!="object"||Lc(e[o])||(s=e[o],o++);const u={includeMetadataChanges:s.includeMetadataChanges,source:s.source};if(Lc(e[o])){const T=e[o];e[o]=(t=T.next)===null||t===void 0?void 0:t.bind(T),e[o+1]=(r=T.error)===null||r===void 0?void 0:r.bind(T),e[o+2]=(i=T.complete)===null||i===void 0?void 0:i.bind(T)}let c,d,m;if(n instanceof Tt)d=is(n.firestore,vo),m=Ga(n._key.path),c={next:T=>{e[o]&&e[o](P0(d,n,T))},error:e[o+1],complete:e[o+2]};else{const T=is(n,ss);d=is(T.firestore,vo),m=T._query;const S=new Yc(d);c={next:R=>{e[o]&&e[o](new R0(d,S,T,R))},error:e[o+1],complete:e[o+2]},C0(n._query)}return function(S,R,O,x){const M=new h0(x),te=new KE(R,M,O);return S.asyncQueue.enqueueAndForget(async()=>GE(await Pc(S),te)),()=>{M.Ga(),S.asyncQueue.enqueueAndForget(async()=>qE(await Pc(S),te))}}(E0(d),m,u,c)}function P0(n,e,t){const r=t.docs.get(e._key),i=new Yc(n);return new Wc(n,i,e._key,r,new Dr(t.hasPendingWrites,t.fromCache),e.converter)}(function(e,t=!0){(function(i){kn=i})(bi),Cn(new tn("firestore",(r,{instanceIdentifier:i,options:s})=>{const o=r.getProvider("app").getImmediate(),u=new vo(new Gv(r.getProvider("auth-internal")),new Kv(r.getProvider("app-check-internal")),function(d,m){if(!Object.prototype.hasOwnProperty.apply(d.options,["projectId"]))throw new F(D.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new vr(d.options.projectId,m)}(o,i),o);return s=Object.assign({useFetchStreams:t},s),u._setSettings(s),u},"PUBLIC").setMultipleInstances(!0)),Ot(hh,"4.6.5",e),Ot(hh,"4.6.5","esm2017")})();const Gc=gu({apiKey:"AIzaSyC01JhUnm-yg2G8nEc9tiKKUZqL4R99oas",authDomain:"fake-filler.firebaseapp.com",projectId:"fake-filler"}),qc=Hv(Gc),$c=w0(Gc);Wv("silent");let wo=null,Eo=null,To=null,Io=null;function jc(){To&&To(),Io&&Io()}function D0(n){const e=n.data();!n.metadata.hasPendingWrites&&e&&e.updatedAt&&e.options&&(e.updatedAt,JSON.parse(e.options))}async function M0(n){const e=n.data();wo&&e&&e.claimsUpdatedAt&&(Eo&&!e.claimsUpdatedAt.isEqual(Eo)&&await wo.getIdToken(!0),Eo=e.claimsUpdatedAt)}Sv(qc,n=>{wo=n,n?(jc(),To=zc(Vc($c,"users",n.uid),M0),Io=zc(Vc($c,"settings",n.uid),D0)):jc()}),Av(qc,async n=>{});const N0="+1 (XxX) XxX-XxxX",Ao={id:cy(),type:"email",name:"Email Address",match:["email"],emailPrefix:"",emailUsername:"random",emailUsernameList:["jack","jill"],emailUsernameRegEx:"",emailHostname:"list",emailHostnameList:["mailinator.com"]},Ze=n=>n.replace(/[^a-zA-Z0-9]+/g,"").toLowerCase();class O0{randomNumber(e,t,r=0){const i=Math.ceil(e),s=Math.floor(t);let o=Math.random()*(s-i+1)+i;return r>0?(o=Number(o.toFixed(r)),o=o>s?s:o,o):Math.floor(o)}scrambledWord(e=3,t=15){const r=this.randomNumber(e,t);let i="",s=!0;for(;i.length<r;){const o=s?Zt[Math.floor(Math.random()*Zt.length)]:en[Math.floor(Math.random()*en.length)];s=!s,i+=o}return i}words(e,t=0){let r="",i="";for(let s=0;s<e;s+=1){i=Ql[Math.floor(Math.random()*(Ql.length-1))];const o=r.length;(o===0||r.substring(o-1,o)==="."||r.substring(o-1,o)==="?")&&(i=i.substring(0,1).toUpperCase()+i.substring(1,i.length)),r+=o>0?` ${i}`:i}return t&&t>0&&(r=r.substring(0,t)),r}alphanumeric(e){const t=e.length;let r=0,i="",s="",o=!1;for(;r<t;r+=1){if(s=e[r],s==="]"){o=!1;continue}if(s==="["){o=!0;continue}o&&(s="");const u=or.length,c=Zt.length,d=en.length;switch(s){case"L":i+=or[Math.floor(Math.random()*(u-1))].toUpperCase();break;case"l":i+=or[Math.floor(Math.random()*(u-1))].toLowerCase();break;case"D":i+=Math.random()>.5?or[Math.floor(Math.random()*(u-1))].toUpperCase():or[Math.floor(Math.random()*(u-1))].toLowerCase();break;case"C":i+=Zt[Math.floor(Math.random()*(c-1))].toUpperCase();break;case"c":i+=Zt[Math.floor(Math.random()*(c-1))].toLowerCase();break;case"E":i+=Math.random()>.5?Zt[Math.floor(Math.random()*(c-1))].toUpperCase():Zt[Math.floor(Math.random()*(c-1))].toLowerCase();break;case"V":i+=en[Math.floor(Math.random()*(d-1))].toUpperCase();break;case"v":i+=en[Math.floor(Math.random()*(d-1))].toLowerCase();break;case"F":i+=Math.random()>.5?en[Math.floor(Math.random()*(d-1))].toUpperCase():en[Math.floor(Math.random()*(d-1))].toLowerCase();break;case"X":i+=this.randomNumber(1,9);break;case"x":i+=this.randomNumber(0,9);break;default:i+=e[r];break}}return i}paragraph(e,t,r){const i=this.randomNumber(e,t);return this.words(i,r).replace(/[?.!,;]?$/,".")}phrase(e){const t=this.randomNumber(5,20);return this.words(t,e).replace(/[^\w\s]|_/g,"").replace(/\s+/g," ")}website(){const e=this.scrambledWord().toLowerCase(),t=eu[this.randomNumber(0,eu.length-1)];return`https://www.${e}${t}`}phoneNumber(e=N0){let t=0,r="";for(;t<e.length;t+=1)e[t]==="X"?r+=this.randomNumber(1,9):e[t]==="x"?r+=this.randomNumber(0,9):r+=e[t];return r}date(e,t){let r,i,s;if(e&&t){const d=new Date(+e+Math.random()*(+t-+e));r=d.getFullYear(),i=d.getMonth()+1,s=d.getDate()}else r=this.randomNumber(1970,new Date().getFullYear()),i=this.randomNumber(1,12),s=this.randomNumber(1,28);const o=String(r),u=`0${i}`.slice(-2),c=`0${s}`.slice(-2);return`${o}-${u}-${c}`}time(){const e=`0${this.randomNumber(0,23)}`.slice(-2),t=`0${this.randomNumber(0,59)}`.slice(-2);return`${e}:${t}`}month(){return`0${this.randomNumber(1,12)}`.slice(-2)}year(){return String(this.randomNumber(1970,new Date().getFullYear()))}weekNumber(){return`0${this.randomNumber(1,52)}`.slice(-2)}firstName(){return Jl[this.randomNumber(0,Jl.length-1)]}lastName(){return Xl[this.randomNumber(0,Xl.length-1)]}organizationName(){const e=this.lastName(),t=Math.random()>.5?" and ":" ",r=this.lastName(),i=Zl[this.randomNumber(0,Zl.length-1)];return`${e}${t}${r} ${i}`}color(){return`#${Math.floor(Math.random()*16777215).toString(16).padStart(6,"0")}`}}class V0{constructor(e,t=-1){$e(this,"generator");$e(this,"options");$e(this,"profileIndex");$e(this,"previousValue");$e(this,"previousPassword");$e(this,"previousUsername");$e(this,"previousFirstName");$e(this,"previousLastName");this.options=e,this.profileIndex=t,this.generator=new O0,this.previousValue="",this.previousPassword="",this.previousUsername="",this.previousFirstName="",this.previousLastName=""}fireEvents(e){["input","click","change","blur"].forEach(t=>{const r=new Event(t,{bubbles:!0,cancelable:!0});e.dispatchEvent(r)})}isAnyMatch(e,t){for(let r=0,i=t.length;r<i;r+=1)if(new RegExp(t[r],"i").test(e))return!0;return!1}isElementVisible(e){return!(!e.offsetHeight&&!e.offsetWidth||window.getComputedStyle(e).visibility==="hidden")}shouldIgnoreElement(e){if(["button","submit","reset","file","hidden","image"].indexOf(e.type)>-1||this.options.ignoreHiddenFields&&!this.isElementVisible(e))return!0;const t=this.getElementName(e);if(this.isAnyMatch(t,this.options.ignoredFields))return!0;if(this.options.ignoreFieldsWithContent){if(e.type==="radio"&&document.querySelectorAll(`input[name="${e.name}"]:checked`).length>0)return!0;if(e.type!=="checkbox"&&e.type!=="radio"){const r=e.value;if(r&&r.trim().length>0)return!0}}return!1}selectRandomRadio(e,t=[]){const r=[],i=document.getElementsByName(e);for(let o=0;o<i.length;o+=1)i[o].type==="radio"&&(t.length===0||t.includes(i[o].value))&&r.push(i[o]);const s=r[Math.floor(Math.random()*r.length)];s.checked=!0,this.fireEvents(s)}findCustomFieldFromList(e,t,r=[]){const i=r.length>0;for(let s=0;s<e.length;s+=1)if(this.isAnyMatch(t,e[s].match))if(i){for(let o=0;o<r.length;o+=1)if(e[s].type===r[o])return e[s]}else return e[s]}findCustomField(e,t=[]){let r;return this.profileIndex>-1&&(r=this.findCustomFieldFromList(this.options.profiles[this.profileIndex].fields,e,t)),r||(r=this.findCustomFieldFromList(this.options.fields,e,t)),r}getElementName(e){let t="";if(this.options.fieldMatchSettings.matchName&&(t+=` ${Ze(e.name)}`),this.options.fieldMatchSettings.matchId&&(t+=` ${Ze(e.id)}`),this.options.fieldMatchSettings.matchClass&&(t+=` ${Ze(e.className)}`),this.options.fieldMatchSettings.matchPlaceholder&&(t+=` ${Ze(e.getAttribute("placeholder")||"")}`),this.options.fieldMatchSettings.matchLabel){const r=tf(e.id),i=document.querySelectorAll(`label[for='${r}']`);for(let s=0;s<i.length;s+=1)t+=` ${Ze(i[s].innerHTML)}`}if(this.options.fieldMatchSettings.matchAriaLabel&&(t+=` ${Ze(e.getAttribute("aria-label")||"")}`),this.options.fieldMatchSettings.matchAriaLabelledBy){const r=(e.getAttribute("aria-labelledby")||"").split(" ");for(let i=0;i<r.length;i+=1){const s=document.getElementById(r[i]);s&&(t+=` ${Ze(s.innerHTML||"")}`)}}return t}getElementMaxLength(e){return e&&e.maxLength&&e.maxLength>0?e.maxLength:this.options.defaultMaxLength}generateDummyDataForCustomField(e,t=void 0){if(!e)return this.generator.phrase(this.getElementMaxLength(t));switch(e.type){case"username":return this.previousUsername=this.generator.scrambledWord(5,10).toLowerCase(),this.previousUsername;case"first-name":return this.previousFirstName=this.generator.firstName(),this.previousFirstName;case"last-name":return this.previousLastName=this.generator.lastName(),this.previousLastName;case"full-name":return this.previousFirstName=this.generator.firstName(),this.previousLastName=this.generator.lastName(),`${this.previousFirstName} ${this.previousLastName}`;case"email":{let r="";switch(e.emailUsername){case"list":{const o=e.emailUsernameList||Ao.emailUsernameList;r=o[Math.floor(Math.random()*o.length)];break}case"username":{this.previousUsername.length>0&&(r=Ze(this.previousUsername));break}case"name":{this.previousFirstName.length>0&&(r=Ze(this.previousFirstName)),this.previousLastName.length>0&&(r.length>0?r+=`.${Ze(this.previousLastName)}`:r=Ze(this.previousLastName));break}case"regex":{try{if(e.emailUsernameRegEx){const o=new Kl(e.emailUsernameRegEx);o.defaultRange.add(0,65535),r=o.gen()}}catch{}break}}(!r||r.length===0)&&(r=this.generator.scrambledWord(4,10).toLowerCase());let i="";if(e.emailHostname==="list"){const o=e.emailHostnameList||Ao.emailHostnameList,u=Math.floor(Math.random()*o.length);i=o[u]}(!i||i.length===0)&&(i=`${this.generator.scrambledWord().toLowerCase()}.com`),i.indexOf("@")===-1&&(i=`@${i}`);let s="";return e.emailPrefix&&(s=e.emailPrefix),s+r+i}case"organization":return this.generator.organizationName();case"telephone":return this.generator.phoneNumber(e.template);case"number":{const r=e.min===0?0:e.min||1,i=e.max||100,s=e.decimalPlaces||0;return String(this.generator.randomNumber(r,i,s))}case"date":{let r,i;if(e.minDate?r=k(e.minDate).toDate():Number.isNaN(Number(e.min))||(r=k(new Date).add(e.min,"days").toDate()),e.maxDate?i=k(e.maxDate).toDate():Number.isNaN(Number(e.max))||(i=k(new Date).add(e.max,"days").toDate()),t&&t.type==="date"){const s=t;return s.min&&k(s.min).isValid()&&(r=k(s.min).toDate()),s.max&&k(s.max).isValid()&&(i=k(s.max).toDate()),this.generator.date(r,i)}return k(this.generator.date(r,i)).format(e.template)}case"url":return this.generator.website();case"text":{const r=e.min||10,i=e.max||30;let s=e.maxLength||this.options.defaultMaxLength;return t&&t.maxLength&&t.maxLength<s&&(s=t.maxLength),this.generator.paragraph(r,i,i)}case"alphanumeric":return this.generator.alphanumeric(e.template||"");case"regex":{const r=new Kl(e.template||"");return r.defaultRange.add(0,65535),r.gen()}case"randomized-list":return e.list&&e.list.length>0?e.list[this.generator.randomNumber(0,e.list.length-1)]:"";default:return this.generator.phrase(this.getElementMaxLength(t))}}fillInputElement(e){if(this.shouldIgnoreElement(e))return;let t=!0;switch(e.type?e.type.toLowerCase():""){case"checkbox":{this.isAnyMatch(e.name.toLowerCase(),this.options.agreeTermsFields)?e.checked=!0:e.checked=Math.random()>.5;break}case"date":{const i=this.findCustomField(this.getElementName(e),["date"]);if(i)e.value=this.generateDummyDataForCustomField(i,e);else{let s,o;e.min&&k(e.min).isValid()&&(s=k(e.min).toDate()),e.max&&k(e.max).isValid()&&(o=k(e.max).toDate()),e.value=this.generator.date(s,o)}break}case"datetime":{e.value=`${this.generator.date()}T${this.generator.time()}Z`;break}case"datetime-local":{e.value=`${this.generator.date()}T${this.generator.time()}`;break}case"time":{e.value=this.generator.time();break}case"month":{e.value=`${this.generator.year()}-${this.generator.month()}`;break}case"week":e.value=`${this.generator.year()}-W${this.generator.weekNumber()}`;break;case"email":{if(this.isAnyMatch(e.name.toLowerCase(),this.options.confirmFields))e.value=this.previousValue;else{let i=this.findCustomField(this.getElementName(e),["email"]);i||(i=Ao),this.previousValue=this.generateDummyDataForCustomField(i,e),e.value=this.previousValue}break}case"number":case"range":{let i=e.min?parseInt(e.min,10):1,s=e.max?parseInt(e.max,10):100;const o=this.findCustomField(this.getElementName(e),["number"]);o&&(i=o.min||i,s=o.max||s,e.min&&e.max&&(i=Number(e.min)>i?Number(e.min):i,s=Number(e.max)<s?Number(e.max):s)),e.value=String(this.generator.randomNumber(i,s));break}case"password":{this.isAnyMatch(e.name.toLowerCase(),this.options.confirmFields)?e.value=this.previousPassword:(this.options.passwordSettings.mode==="defined"?this.previousPassword=this.options.passwordSettings.password:(this.previousPassword=this.generator.scrambledWord(8,8).toLowerCase(),console.info(this.previousPassword)),e.value=this.previousPassword);break}case"radio":{if(e.name){const i=this.findCustomField(this.getElementName(e),["randomized-list"]),s=i!=null&&i.list?i==null?void 0:i.list:[];this.selectRandomRadio(e.name,s)}t=!1;break}case"tel":{const i=this.findCustomField(this.getElementName(e),["telephone","regex","randomized-list"]);i?e.value=this.generateDummyDataForCustomField(i,e):e.value=this.generator.phoneNumber();break}case"url":{e.value=this.generator.website();break}case"color":{e.value=this.generator.color();break}case"search":{e.value=this.generator.words(1);break}default:{if(this.isAnyMatch(e.name.toLowerCase(),this.options.confirmFields))e.value=this.previousValue;else{const i=this.findCustomField(this.getElementName(e));this.previousValue=this.generateDummyDataForCustomField(i,e),e.value=this.previousValue}break}}this.options.triggerClickEvents&&t&&this.fireEvents(e)}fillTextAreaElement(e){if(this.shouldIgnoreElement(e))return;const t=this.findCustomField(this.getElementName(e),["text","alphanumeric","regex","randomized-list"]);e.value=this.generateDummyDataForCustomField(t,e),this.options.triggerClickEvents&&this.fireEvents(e)}fillSelectElement(e){if(this.shouldIgnoreElement(e)||!e.options||e.options.length<1)return;let t=!1,r=!1;const i=this.findCustomField(this.getElementName(e));if(i){const s=this.generateDummyDataForCustomField(i);for(let o=0;o<e.options.length;o+=1)if(e.options[o].value===s){e.options[o].selected=!0,t=!0,r=!0;break}}if(!t){const s=e.options.length,o=!e.options[0].value;if(e.multiple){for(let c=0;c<s;c+=1)e.options[c].disabled||(e.options[c].selected=!1);const u=this.generator.randomNumber(1,s);for(let c=0;c<u;c+=1)e.options[c].disabled||(e.options[this.generator.randomNumber(1,s-1)].selected=!0,r=!0)}else{let u=0;for(;u<s;){const c=this.generator.randomNumber(o?1:0,s-1);if(e.options[c].disabled)u+=1;else{e.options[c].selected=!0,r=!0;break}}}}r&&this.options.triggerClickEvents&&this.fireEvents(e)}fillContentEditableElement(e){e.isContentEditable&&(e.textContent=this.generator.paragraph(5,100,this.options.defaultMaxLength))}}class L0{constructor(e,t=-1,r=!0){$e(this,"elementFiller");$e(this,"clickedElement");$e(this,"isEnabled",!1);this.elementFiller=new V0(e,t),this.isEnabled=r}fillAllElements(e){e.querySelectorAll("input:not(:disabled):not([readonly])").forEach(t=>{this.elementFiller.fillInputElement(t)}),e.querySelectorAll("textarea:not(:disabled):not([readonly])").forEach(t=>{this.elementFiller.fillTextAreaElement(t)}),e.querySelectorAll("select:not(:disabled):not([readonly])").forEach(t=>{this.elementFiller.fillSelectElement(t)}),e.querySelectorAll("[contenteditable]").forEach(t=>{this.elementFiller.fillContentEditableElement(t)})}setClickedElement(e){this.isEnabled&&(this.clickedElement=e)}fillAllInputs(){this.isEnabled&&this.fillAllElements(document)}fillThisInput(){if(!this.isEnabled)return;const e=this.clickedElement||document.activeElement;if(e){const t=e.tagName.toLowerCase();t==="input"?this.elementFiller.fillInputElement(e):t==="textarea"?this.elementFiller.fillTextAreaElement(e):t==="select"?this.elementFiller.fillSelectElement(e):e.isContentEditable&&this.elementFiller.fillContentEditableElement(e)}this.setClickedElement(void 0)}fillThisForm(){if(!this.isEnabled)return;const e=this.clickedElement||document.activeElement;if(e&&e.tagName.toLowerCase()!=="body"){const t=e.closest("form");t&&this.fillAllElements(t)}this.setClickedElement(void 0)}}function Kc(n,e){let t=-1,r=!0;const i=window.location.href;if(chrome.runtime.sendMessage({type:"clearProfileBadge"},()=>chrome.runtime.lastError),chrome.runtime.sendMessage({type:"clearIgnoreDomainBadge"},()=>chrome.runtime.lastError),e&&i&&n.profiles&&n.profiles.length>0)for(let s=0;s<n.profiles.length;s+=1){const o=n.profiles[s];if(i.match(new RegExp(o.urlMatch))){t=s,chrome.runtime.sendMessage({type:"setProfileBadge",data:o},()=>chrome.runtime.lastError);break}}for(let s=0;s<n.ignoreDomains.length;s+=1)if(i.match(new RegExp(n.ignoreDomains[s]))){r=!1,chrome.runtime.sendMessage({type:"setIgnoreDomainBadge"},()=>chrome.runtime.lastError);break}window.fakeFiller=new L0(n,t,r)}function x0(n){switch(n.type){case"receiveNewOptions":{const e=n.data.options,t=n.data.isProEdition;return Kc(e,t),!0}default:return null}}document.addEventListener("mousedown",n=>{n.button===2&&window.fakeFiller&&window.fakeFiller.setClickedElement(n.target)}),chrome.runtime.sendMessage({type:"getOptions"},n=>{const e=n.options,t=n.isProEdition;Kc(e,t)}),chrome.runtime.onMessage.addListener(x0)})();
