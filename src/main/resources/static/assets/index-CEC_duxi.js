(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=new WeakMap,t=t=>{if((e=>e.pattern!==void 0)(t))return t.pattern;let n=e.get(t);return n===void 0&&e.set(t,n=new URLPattern({pathname:t.path})),n},n=class{constructor(e,t,n){this.routes=[],this.o=[],this.t={},this.i=e=>{if(e.routes===this)return;let t=e.routes;this.o.push(t),t.h=this,e.stopImmediatePropagation(),e.onDisconnect=()=>{this.o?.splice(this.o.indexOf(t)>>>0,1)};let n=r(this.t);n!==void 0&&t.goto(n)},(this.l=e).addController(this),this.routes=[...t],this.fallback=n?.fallback}link(e){if(e?.startsWith(`/`))return e;if(e?.startsWith(`.`))throw Error(`Not implemented`);return e??=this.u,(this.h?.link()??``)+e}async goto(e){let n;if(this.routes.length===0&&this.fallback===void 0)n=e,this.u=``,this.t={0:n};else{let i=this.p(e);if(i===void 0)throw Error(`No route found for `+e);let a=t(i).exec({pathname:e})?.pathname.groups??{};if(n=r(a),typeof i.enter==`function`&&!1===await i.enter(a))return;this.v=i,this.t=a,this.u=n===void 0?e:e.substring(0,e.length-n.length)}if(n!==void 0)for(let e of this.o)e.goto(n);this.l.requestUpdate()}outlet(){return this.v?.render?.(this.t)}get params(){return this.t}p(e){let n=this.routes.find((n=>t(n).test({pathname:e})));return n||this.fallback===void 0?n:this.fallback?{...this.fallback,path:`/*`}:void 0}hostConnected(){this.l.addEventListener(i.eventName,this.i);let e=new i(this);this.l.dispatchEvent(e),this._=e.onDisconnect}hostDisconnected(){this._?.(),this.h=void 0}},r=e=>{let t;for(let n of Object.keys(e))/\d+/.test(n)&&(t===void 0||n>t)&&(t=n);return t&&e[t]},i=class e extends Event{constructor(t){super(e.eventName,{bubbles:!0,composed:!0,cancelable:!1}),this.routes=t}};i.eventName=`lit-routes-connected`;var a=location.origin||location.protocol+`//`+location.host,o=class extends n{constructor(){super(...arguments),this.m=e=>{let t=e.button!==0||e.metaKey||e.ctrlKey||e.shiftKey;if(e.defaultPrevented||t)return;let n=e.composedPath().find((e=>e.tagName===`A`));if(n===void 0||n.target!==``||n.hasAttribute(`download`)||n.getAttribute(`rel`)===`external`)return;let r=n.href;if(r===``||r.startsWith(`mailto:`))return;let i=window.location;n.origin===a&&(e.preventDefault(),r!==i.href&&(window.history.pushState({},``,r),this.goto(n.pathname)))},this.R=e=>{this.goto(window.location.pathname)}}hostConnected(){super.hostConnected(),window.addEventListener(`click`,this.m),window.addEventListener(`popstate`,this.R),this.goto(window.location.pathname)}hostDisconnected(){super.hostDisconnected(),window.removeEventListener(`click`,this.m),window.removeEventListener(`popstate`,this.R)}},s=globalThis,c=s.ShadowRoot&&(s.ShadyCSS===void 0||s.ShadyCSS.nativeShadow)&&`adoptedStyleSheets`in Document.prototype&&`replace`in CSSStyleSheet.prototype,l=Symbol(),u=new WeakMap,d=class{constructor(e,t,n){if(this._$cssResult$=!0,n!==l)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o,t=this.t;if(c&&e===void 0){let n=t!==void 0&&t.length===1;n&&(e=u.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),n&&u.set(t,e))}return e}toString(){return this.cssText}},f=e=>new d(typeof e==`string`?e:e+``,void 0,l),p=(e,...t)=>new d(e.length===1?e[0]:t.reduce((t,n,r)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if(typeof e==`number`)return e;throw Error(`Value passed to 'css' function must be a 'css' function result: `+e+`. Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.`)})(n)+e[r+1],e[0]),e,l),m=(e,t)=>{if(c)e.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let n of t){let t=document.createElement(`style`),r=s.litNonce;r!==void 0&&t.setAttribute(`nonce`,r),t.textContent=n.cssText,e.appendChild(t)}},h=c?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t=``;for(let n of e.cssRules)t+=n.cssText;return f(t)})(e):e,{is:g,defineProperty:_,getOwnPropertyDescriptor:v,getOwnPropertyNames:y,getOwnPropertySymbols:b,getPrototypeOf:x}=Object,S=globalThis,C=S.trustedTypes,ee=C?C.emptyScript:``,te=S.reactiveElementPolyfillSupport,w=(e,t)=>e,ne={toAttribute(e,t){switch(t){case Boolean:e=e?ee:null;break;case Object:case Array:e=e==null?e:JSON.stringify(e)}return e},fromAttribute(e,t){let n=e;switch(t){case Boolean:n=e!==null;break;case Number:n=e===null?null:Number(e);break;case Object:case Array:try{n=JSON.parse(e)}catch{n=null}}return n}},re=(e,t)=>!g(e,t),ie={attribute:!0,type:String,converter:ne,reflect:!1,useDefault:!1,hasChanged:re};Symbol.metadata??=Symbol(`metadata`),S.litPropertyMetadata??=new WeakMap;var ae=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=ie){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){let n=Symbol(),r=this.getPropertyDescriptor(e,n,t);r!==void 0&&_(this.prototype,e,r)}}static getPropertyDescriptor(e,t,n){let{get:r,set:i}=v(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:r,set(t){let a=r?.call(this);i?.call(this,t),this.requestUpdate(e,a,n)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??ie}static _$Ei(){if(this.hasOwnProperty(w(`elementProperties`)))return;let e=x(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(w(`finalized`)))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(w(`properties`))){let e=this.properties,t=[...y(e),...b(e)];for(let n of t)this.createProperty(n,e[n])}let e=this[Symbol.metadata];if(e!==null){let t=litPropertyMetadata.get(e);if(t!==void 0)for(let[e,n]of t)this.elementProperties.set(e,n)}this._$Eh=new Map;for(let[e,t]of this.elementProperties){let n=this._$Eu(e,t);n!==void 0&&this._$Eh.set(n,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let n=new Set(e.flat(1/0).reverse());for(let e of n)t.unshift(h(e))}else e!==void 0&&t.push(h(e));return t}static _$Eu(e,t){let n=t.attribute;return!1===n?void 0:typeof n==`string`?n:typeof e==`string`?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,t=this.constructor.elementProperties;for(let n of t.keys())this.hasOwnProperty(n)&&(e.set(n,this[n]),delete this[n]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return m(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,n){this._$AK(e,n)}_$ET(e,t){let n=this.constructor.elementProperties.get(e),r=this.constructor._$Eu(e,n);if(r!==void 0&&!0===n.reflect){let i=(n.converter?.toAttribute===void 0?ne:n.converter).toAttribute(t,n.type);this._$Em=e,i==null?this.removeAttribute(r):this.setAttribute(r,i),this._$Em=null}}_$AK(e,t){let n=this.constructor,r=n._$Eh.get(e);if(r!==void 0&&this._$Em!==r){let e=n.getPropertyOptions(r),i=typeof e.converter==`function`?{fromAttribute:e.converter}:e.converter?.fromAttribute===void 0?ne:e.converter;this._$Em=r;let a=i.fromAttribute(t,e.type);this[r]=a??this._$Ej?.get(r)??a,this._$Em=null}}requestUpdate(e,t,n,r=!1,i){if(e!==void 0){let a=this.constructor;if(!1===r&&(i=this[e]),n??=a.getPropertyOptions(e),!((n.hasChanged??re)(i,t)||n.useDefault&&n.reflect&&i===this._$Ej?.get(e)&&!this.hasAttribute(a._$Eu(e,n))))return;this.C(e,t,n)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:n,reflect:r,wrapped:i},a){n&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,a??t??this[e]),!0!==i||a!==void 0)||(this._$AL.has(e)||(this.hasUpdated||n||(t=void 0),this._$AL.set(e,t)),!0===r&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}let e=this.constructor.elementProperties;if(e.size>0)for(let[t,n]of e){let{wrapped:e}=n,r=this[t];!0!==e||this._$AL.has(t)||r===void 0||this.C(t,void 0,n,r)}}let e=!1,t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};ae.elementStyles=[],ae.shadowRootOptions={mode:`open`},ae[w(`elementProperties`)]=new Map,ae[w(`finalized`)]=new Map,te?.({ReactiveElement:ae}),(S.reactiveElementVersions??=[]).push(`2.1.2`);var oe=globalThis,se=e=>e,ce=oe.trustedTypes,le=ce?ce.createPolicy(`lit-html`,{createHTML:e=>e}):void 0,ue=`$lit$`,de=`lit$${Math.random().toFixed(9).slice(2)}$`,fe=`?`+de,pe=`<${fe}>`,me=document,he=()=>me.createComment(``),ge=e=>e===null||typeof e!=`object`&&typeof e!=`function`,_e=Array.isArray,ve=e=>_e(e)||typeof e?.[Symbol.iterator]==`function`,ye=`[ 	
\f\r]`,be=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,xe=/-->/g,Se=/>/g,Ce=RegExp(`>|${ye}(?:([^\\s"'>=/]+)(${ye}*=${ye}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,`g`),we=/'/g,Te=/"/g,Ee=/^(?:script|style|textarea|title)$/i,T=(e=>(t,...n)=>({_$litType$:e,strings:t,values:n}))(1),E=Symbol.for(`lit-noChange`),D=Symbol.for(`lit-nothing`),De=new WeakMap,Oe=me.createTreeWalker(me,129);function ke(e,t){if(!_e(e)||!e.hasOwnProperty(`raw`))throw Error(`invalid template strings array`);return le===void 0?t:le.createHTML(t)}var Ae=(e,t)=>{let n=e.length-1,r=[],i,a=t===2?`<svg>`:t===3?`<math>`:``,o=be;for(let t=0;t<n;t++){let n=e[t],s,c,l=-1,u=0;for(;u<n.length&&(o.lastIndex=u,c=o.exec(n),c!==null);)u=o.lastIndex,o===be?c[1]===`!--`?o=xe:c[1]===void 0?c[2]===void 0?c[3]!==void 0&&(o=Ce):(Ee.test(c[2])&&(i=RegExp(`</`+c[2],`g`)),o=Ce):o=Se:o===Ce?c[0]===`>`?(o=i??be,l=-1):c[1]===void 0?l=-2:(l=o.lastIndex-c[2].length,s=c[1],o=c[3]===void 0?Ce:c[3]===`"`?Te:we):o===Te||o===we?o=Ce:o===xe||o===Se?o=be:(o=Ce,i=void 0);let d=o===Ce&&e[t+1].startsWith(`/>`)?` `:``;a+=o===be?n+pe:l>=0?(r.push(s),n.slice(0,l)+ue+n.slice(l)+de+d):n+de+(l===-2?t:d)}return[ke(e,a+(e[n]||`<?>`)+(t===2?`</svg>`:t===3?`</math>`:``)),r]},je=class e{constructor({strings:t,_$litType$:n},r){let i;this.parts=[];let a=0,o=0,s=t.length-1,c=this.parts,[l,u]=Ae(t,n);if(this.el=e.createElement(l,r),Oe.currentNode=this.el.content,n===2||n===3){let e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;(i=Oe.nextNode())!==null&&c.length<s;){if(i.nodeType===1){if(i.hasAttributes())for(let e of i.getAttributeNames())if(e.endsWith(ue)){let t=u[o++],n=i.getAttribute(e).split(de),r=/([.?@])?(.*)/.exec(t);c.push({type:1,index:a,name:r[2],strings:n,ctor:r[1]===`.`?Ie:r[1]===`?`?Le:r[1]===`@`?Re:Fe}),i.removeAttribute(e)}else e.startsWith(de)&&(c.push({type:6,index:a}),i.removeAttribute(e));if(Ee.test(i.tagName)){let e=i.textContent.split(de),t=e.length-1;if(t>0){i.textContent=ce?ce.emptyScript:``;for(let n=0;n<t;n++)i.append(e[n],he()),Oe.nextNode(),c.push({type:2,index:++a});i.append(e[t],he())}}}else if(i.nodeType===8){if(i.data===fe)c.push({type:2,index:a});else{let e=-1;for(;(e=i.data.indexOf(de,e+1))!==-1;)c.push({type:7,index:a}),e+=de.length-1}}a++}}static createElement(e,t){let n=me.createElement(`template`);return n.innerHTML=e,n}};function Me(e,t,n=e,r){if(t===E)return t;let i=r===void 0?n._$Cl:n._$Co?.[r],a=ge(t)?void 0:t._$litDirective$;return i?.constructor!==a&&(i?._$AO?.(!1),a===void 0?i=void 0:(i=new a(e),i._$AT(e,n,r)),r===void 0?n._$Cl=i:(n._$Co??=[])[r]=i),i!==void 0&&(t=Me(e,i._$AS(e,t.values),i,r)),t}var Ne=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:n}=this._$AD,r=(e?.creationScope??me).importNode(t,!0);Oe.currentNode=r;let i=Oe.nextNode(),a=0,o=0,s=n[0];for(;s!==void 0;){if(a===s.index){let t;s.type===2?t=new Pe(i,i.nextSibling,this,e):s.type===1?t=new s.ctor(i,s.name,s.strings,this,e):s.type===6&&(t=new ze(i,this,e)),this._$AV.push(t),s=n[++o]}a!==s?.index&&(i=Oe.nextNode(),a++)}return Oe.currentNode=me,r}p(e){let t=0;for(let n of this._$AV)n!==void 0&&(n.strings===void 0?n._$AI(e[t]):(n._$AI(e,n,t),t+=n.strings.length-2)),t++}},Pe=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,n,r){this.type=2,this._$AH=D,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=n,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=Me(this,e,t),ge(e)?e===D||e==null||e===``?(this._$AH!==D&&this._$AR(),this._$AH=D):e!==this._$AH&&e!==E&&this._(e):e._$litType$===void 0?e.nodeType===void 0?ve(e)?this.k(e):this._(e):this.T(e):this.$(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==D&&ge(this._$AH)?this._$AA.nextSibling.data=e:this.T(me.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:n}=e,r=typeof n==`number`?this._$AC(e):(n.el===void 0&&(n.el=je.createElement(ke(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===r)this._$AH.p(t);else{let e=new Ne(r,this),n=e.u(this.options);e.p(t),this.T(n),this._$AH=e}}_$AC(e){let t=De.get(e.strings);return t===void 0&&De.set(e.strings,t=new je(e)),t}k(t){_e(this._$AH)||(this._$AH=[],this._$AR());let n=this._$AH,r,i=0;for(let a of t)i===n.length?n.push(r=new e(this.O(he()),this.O(he()),this,this.options)):r=n[i],r._$AI(a),i++;i<n.length&&(this._$AR(r&&r._$AB.nextSibling,i),n.length=i)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let t=se(e).nextSibling;se(e).remove(),e=t}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},Fe=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,n,r,i){this.type=1,this._$AH=D,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=i,n.length>2||n[0]!==``||n[1]!==``?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=D}_$AI(e,t=this,n,r){let i=this.strings,a=!1;if(i===void 0)e=Me(this,e,t,0),a=!ge(e)||e!==this._$AH&&e!==E,a&&(this._$AH=e);else{let r=e,o,s;for(e=i[0],o=0;o<i.length-1;o++)s=Me(this,r[n+o],t,o),s===E&&(s=this._$AH[o]),a||=!ge(s)||s!==this._$AH[o],s===D?e=D:e!==D&&(e+=(s??``)+i[o+1]),this._$AH[o]=s}a&&!r&&this.j(e)}j(e){e===D?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??``)}},Ie=class extends Fe{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===D?void 0:e}},Le=class extends Fe{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==D)}},Re=class extends Fe{constructor(e,t,n,r,i){super(e,t,n,r,i),this.type=5}_$AI(e,t=this){if((e=Me(this,e,t,0)??D)===E)return;let n=this._$AH,r=e===D&&n!==D||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,i=e!==D&&(n===D||r);r&&this.element.removeEventListener(this.name,this,n),i&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH==`function`?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},ze=class{constructor(e,t,n){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(e){Me(this,e)}},Be={M:ue,P:de,A:fe,C:1,L:Ae,R:Ne,D:ve,V:Me,I:Pe,H:Fe,N:Le,U:Re,B:Ie,F:ze},Ve=oe.litHtmlPolyfillSupport;Ve?.(je,Pe),(oe.litHtmlVersions??=[]).push(`3.3.3`);var He=(e,t,n)=>{let r=n?.renderBefore??t,i=r._$litPart$;if(i===void 0){let e=n?.renderBefore??null;r._$litPart$=i=new Pe(t.insertBefore(he(),e),e,void 0,n??{})}return i._$AI(e),i},Ue=globalThis,O=class extends ae{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=He(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return E}};O._$litElement$=!0,O.finalized=!0,Ue.litElementHydrateSupport?.({LitElement:O});var We=Ue.litElementPolyfillSupport;We?.({LitElement:O}),(Ue.litElementVersions??=[]).push(`4.2.2`);var k=e=>(t,n)=>{n===void 0?customElements.define(e,t):n.addInitializer(()=>{customElements.define(e,t)})},Ge={attribute:!0,type:String,converter:ne,reflect:!1,hasChanged:re},Ke=(e=Ge,t,n)=>{let{kind:r,metadata:i}=n,a=globalThis.litPropertyMetadata.get(i);if(a===void 0&&globalThis.litPropertyMetadata.set(i,a=new Map),r===`setter`&&((e=Object.create(e)).wrapped=!0),a.set(n.name,e),r===`accessor`){let{name:r}=n;return{set(n){let i=t.get.call(this);t.set.call(this,n),this.requestUpdate(r,i,e,!0,n)},init(t){return t!==void 0&&this.C(r,void 0,e,t),t}}}if(r===`setter`){let{name:r}=n;return function(n){let i=this[r];t.call(this,n),this.requestUpdate(r,i,e,!0,n)}}throw Error(`Unsupported decorator location: `+r)};function A(e){return(t,n)=>typeof n==`object`?Ke(e,t,n):((e,t,n)=>{let r=t.hasOwnProperty(n);return t.constructor.createProperty(n,e),r?Object.getOwnPropertyDescriptor(t,n):void 0})(e,t,n)}function j(e){return A({...e,state:!0,attribute:!1})}var qe=(e,t,n)=>(n.configurable=!0,n.enumerable=!0,Reflect.decorate&&typeof t!=`object`&&Object.defineProperty(e,t,n),n);function M(e,t){return(n,r,i)=>{let a=t=>t.renderRoot?.querySelector(e)??null;if(t){let{get:e,set:t}=typeof r==`object`?n:i??(()=>{let e=Symbol();return{get(){return this[e]},set(t){this[e]=t}}})();return qe(n,r,{get(){let n=e.call(this);return n===void 0&&(n=a(this),(n!==null||this.hasUpdated)&&t.call(this,n)),n}})}return qe(n,r,{get(){return a(this)}})}}function N(e,t,n,r){var i=arguments.length,a=i<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,n):r,o;if(typeof Reflect==`object`&&typeof Reflect.decorate==`function`)a=Reflect.decorate(e,t,n,r);else for(var s=e.length-1;s>=0;s--)(o=e[s])&&(a=(i<3?o(a):i>3?o(t,n,a):o(t,n))||a);return i>3&&a&&Object.defineProperty(t,n,a),a}var Je=class extends O{constructor(...e){super(...e),this.width=`24`,this.height=`24`}render(){return T`<svg
      class="${this.className}"
      xmlns="http://www.w3.org/2000/svg"
      width=${this.width}
      height=${this.height}
      viewBox="0 0 24 24"
    >
      <path d="M0 0h24v24H0z" fill="none" />
      <path
        fill="currentColor"
        d="M9.5 3A6.5 6.5 0 0 1 16 9.5c0 1.61-.59 3.09-1.56 4.23l.27.27h.79l5 5l-1.5 1.5l-5-5v-.79l-.27-.27A6.52 6.52 0 0 1 9.5 16A6.5 6.5 0 0 1 3 9.5A6.5 6.5 0 0 1 9.5 3m0 2C7 5 5 7 5 9.5S7 14 9.5 14S14 12 14 9.5S12 5 9.5 5"
      />
    </svg> `}};N([A({type:String})],Je.prototype,`width`,void 0),N([A({type:String})],Je.prototype,`height`,void 0),Je=N([k(`i-search`)],Je);function P(e){window.history.pushState({},``,e),window.dispatchEvent(new PopStateEvent(`popstate`))}var Ye={nombre:`Cerca`,descripcion:`Descubre qué hay a tu alrededor`,fondo:`#eaf1f8`,color:`#4a7fb5`},Xe=[{nombre:`Lima`,descripcion:`Por su exquisita gastronomía`,fondo:`#fdf1e3`,color:`#e08a1e`},{nombre:`Cusco`,descripcion:`Por sus lugares históricos`,fondo:`#fdecea`,color:`#e0523a`},{nombre:`Arequipa`,descripcion:`Por su arquitectura de sillar`,fondo:`#eaf4ec`,color:`#3a8a4f`},{nombre:`Máncora`,descripcion:`Ideal para escapadas de playa`,fondo:`#e8f1fb`,color:`#2f6fb5`},{nombre:`Barranco`,descripcion:`Por lugares emblemáticos como el Puente de los Suspiros`,fondo:`#fdecea`,color:`#e0523a`},{nombre:`Paracas`,descripcion:`Ideal para escapadas de fin de semana`,fondo:`#e8f1fb`,color:`#2f6fb5`},{nombre:`Iquitos`,descripcion:`Para vivir la Amazonía`,fondo:`#eaf4ec`,color:`#3a8a4f`}],Ze=[{key:`adultos`,label:`Adultos`,hint:`13 años o más`},{key:`ninos`,label:`Niños`,hint:`De 2 a 12 años`},{key:`bebes`,label:`Bebés`,hint:`Menos de 2 años`},{key:`mascotas`,label:`Mascotas`,hint:`Animales de servicio incluidos`}],Qe=[0,1,2,3,7,14],$e=[`Fin de semana`,`Semana`,`Mes`],et=[`L`,`Ma`,`Mi`,`J`,`V`,`S`,`D`],tt=e=>`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,`0`)}-${String(e.getDate()).padStart(2,`0`)}`,nt=()=>tt(new Date),rt=e=>{let t=new Date(`${e}T00:00:00`).toLocaleDateString(`es`,{day:`numeric`,month:`short`});return t.endsWith(`.`)?t:`${t}.`},it=e=>`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,`0`)}`,at=()=>{let e=new Date;return Array.from({length:12},(t,n)=>new Date(e.getFullYear(),e.getMonth()+n,1))},ot=e=>{let t=e.toLocaleDateString(`es`,{month:`long`});return t.charAt(0).toUpperCase()+t.slice(1)},st=e=>{let t=e.toLocaleDateString(`es`,{month:`long`,year:`numeric`});return t.charAt(0).toUpperCase()+t.slice(1)},F=class extends O{constructor(...e){super(...e),this.panel=null,this.destino=``,this.desde=``,this.hasta=``,this.modo=`fechas`,this.tolerancia=0,this.estancia=``,this.meses=new Set,this.paginaMeses=0,this.mesBase=new Date(new Date().getFullYear(),new Date().getMonth(),1),this.cantidades={adultos:0,ninos:0,bebes:0,mascotas:0},this.onOutsideClick=e=>{e.composedPath().includes(this)||(this.panel=null)},this.onKeydown=e=>{e.key===`Escape`&&(this.panel=null)},this.sincronizarConUrl=()=>{let e=window.location.pathname.startsWith(`/alojamientos`),t=new URLSearchParams(e?window.location.search:``);this.destino=t.get(`texto`)??``,this.desde=t.get(`desde`)??``,this.hasta=t.get(`hasta`)??``,this.tolerancia=Number(t.get(`margen`)??0),this.estancia=t.get(`estancia`)??``,this.meses=new Set((t.get(`meses`)??``).split(`,`).filter(Boolean)),this.modo=this.estancia||this.meses.size>0?`flexible`:`fechas`,this.cantidades={adultos:Number(t.get(`huespedes`)??0),ninos:0,bebes:0,mascotas:0}}}static{this.styles=p`
    :host {
      position: relative;
      display: block;
      color-scheme: light;
    }

    input {
      background: white;
      color: #222;
    }

    button {
      font-family: inherit;
    }

    .bar {
      display: flex;
      align-items: center;
      border: 1px solid #ddd;
      border-radius: 9999px;
      box-shadow: 0 2px 8px rgb(0 0 0 / 0.08);
      background: white;
      padding: 0.25rem 0.25rem 0.25rem 0;
    }

    .bar:has(.segment[aria-expanded="true"]) {
      background: #ebebeb;
    }

    .segment {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 0.125rem;
      padding: 0.5rem 1.5rem;
      border: none;
      border-radius: 9999px;
      background: transparent;
      font: inherit;
      text-align: left;
      color: #222;
      cursor: pointer;
      min-width: 8rem;
    }

    .bar {
      position: relative;
    }

    .seg-wrap {
      position: relative;
      z-index: 1;
      display: flex;
    }

    .segment {
      flex: 1;
      padding-right: 2.75rem;
    }

    .segment:hover:not([aria-expanded="true"]) {
      background: #dddddd;
    }

    /* Fondo blanco que se desliza entre segmentos */
    .highlight {
      position: absolute;
      z-index: 0;
      border-radius: 9999px;
      background: white;
      box-shadow: 0 2px 12px rgb(0 0 0 / 0.18);
      pointer-events: none;
      opacity: 0;
      transition:
        left 0.25s ease,
        width 0.25s ease,
        opacity 0.15s ease;
    }

    .highlight.visible {
      opacity: 1;
    }

    .clear {
      position: absolute;
      top: 50%;
      right: 0.75rem;
      transform: translateY(-50%);
      display: flex;
      align-items: center;
      justify-content: center;
      width: 1.5rem;
      height: 1.5rem;
      border: none;
      border-radius: 50%;
      background: transparent;
      font-size: 1.125rem;
      line-height: 1;
      color: #222;
      cursor: pointer;
    }

    .clear:hover {
      background: #ebebeb;
    }

    .label {
      font-size: 0.75rem;
      font-weight: 700;
    }

    .value {
      font-size: 0.875rem;
      color: #6a6a6a;
      white-space: nowrap;
    }

    .value.filled {
      color: #222;
    }

    .divider {
      width: 1px;
      height: 1.5rem;
      background: #ddd;
    }

    .bar:has(.segment:hover) .divider,
    .bar:has(.segment[aria-expanded="true"]) .divider {
      background: transparent;
    }

    .submit {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      height: 3rem;
      margin-left: auto;
      padding: 0 1rem;
      border: none;
      border-radius: 9999px;
      background: var(--color-primary, #ff385c);
      color: white;
      font-size: 0.875rem;
      font-weight: 700;
      cursor: pointer;
    }

    .submit:hover {
      background: #e00b41;
    }

    .popover {
      position: absolute;
      top: calc(100% + 0.75rem);
      z-index: 10;
      background: white;
      border-radius: 2rem;
      box-shadow: 0 8px 32px rgb(0 0 0 / 0.18);
      color: #222;
      max-width: 95vw;
      box-sizing: border-box;
    }

    .popover.destino {
      left: 0;
      width: 26rem;
      max-height: 28rem;
      overflow-y: auto;
      padding: 1.5rem 0.75rem 1rem 1.5rem;
    }

    .popover.fechas {
      left: 50%;
      transform: translateX(-50%);
      width: 52rem;
      padding: 1.75rem 2rem;
    }

    .popover.huespedes {
      right: 0;
      width: 22rem;
      padding: 1.5rem;
    }

    .popover h3 {
      margin: 0 0 1rem;
      font-size: 0.875rem;
      font-weight: 500;
    }

    /* Destinos */
    .destino-lista {
      list-style: none;
      margin: 0;
      padding: 0;
    }

    .destino-item {
      display: flex;
      align-items: center;
      gap: 1rem;
      width: 100%;
      padding: 0.625rem 0.5rem;
      border: none;
      border-radius: 0.75rem;
      background: transparent;
      text-align: left;
      color: #222;
      cursor: pointer;
    }

    .destino-item:hover {
      background: #f7f7f7;
    }

    .destino-icono {
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 3.5rem;
      height: 3.5rem;
      border-radius: 0.75rem;
    }

    .destino-nombre {
      font-weight: 600;
    }

    .destino-desc {
      font-size: 0.9375rem;
      color: #6a6a6a;
      line-height: 1.25;
    }

    /* Fechas */
    .tabs {
      display: flex;
      width: fit-content;
      margin: 0 auto 1.5rem;
      padding: 0.25rem;
      border-radius: 9999px;
      background: #ebebeb;
      border: 1px solid #ddd;
    }

    .tab {
      width: 9rem;
      padding: 0.625rem 0;
      border: 1px solid transparent;
      border-radius: 9999px;
      background: transparent;
      font-size: 0.875rem;
      font-weight: 500;
      color: #222;
      cursor: pointer;
    }

    .tab[aria-selected="true"] {
      background: white;
      border-color: #ddd;
      font-weight: 600;
    }

    .meses {
      position: relative;
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 2.5rem;
    }

    .mes-titulo {
      margin: 0 0 1rem;
      text-align: center;
      font-weight: 600;
    }

    .nav {
      position: absolute;
      top: 0;
      width: 2rem;
      height: 2rem;
      border: none;
      border-radius: 50%;
      background: transparent;
      font-size: 1.25rem;
      color: #222;
      cursor: pointer;
    }

    .nav:hover:not(:disabled) {
      background: #f0f0f0;
    }

    .nav:disabled {
      color: #ccc;
      cursor: default;
    }

    .nav.prev {
      left: 0;
    }

    .nav.next {
      right: 0;
    }

    .grid-dias {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      row-gap: 2px;
      text-align: center;
    }

    .cabecera {
      padding-bottom: 0.5rem;
      font-size: 0.75rem;
      font-weight: 600;
      color: #6a6a6a;
    }

    .dia {
      position: relative;
      height: 2.75rem;
      padding: 0;
      border: none;
      background: transparent;
      font-size: 0.9375rem;
      color: #222;
      cursor: pointer;
    }

    .dia span {
      position: relative;
      z-index: 1;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 2.75rem;
      height: 2.75rem;
      border-radius: 50%;
      border: 1px solid transparent;
    }

    .dia:hover:not(:disabled):not(.sel) span {
      border-color: #222;
    }

    .dia:disabled {
      color: #c4c4c4;
      cursor: default;
    }

    .dia.rango {
      background: #f2f2f2;
    }

    .dia.sel span {
      background: #222;
      color: white;
    }

    .dia.inicio {
      background: linear-gradient(to right, transparent 50%, #f2f2f2 50%);
    }

    .dia.fin {
      background: linear-gradient(to left, transparent 50%, #f2f2f2 50%);
    }

    .dia.inicio.fin {
      background: transparent;
    }

    .chips {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-top: 1.5rem;
    }

    .chip {
      padding: 0.5rem 1rem;
      border: 1px solid #ddd;
      border-radius: 9999px;
      background: white;
      font-size: 0.875rem;
      color: #222;
      cursor: pointer;
    }

    .chip:hover {
      border-color: #222;
    }

    .chip[aria-pressed="true"] {
      border: 2px solid #222;
      padding: calc(0.5rem - 1px) calc(1rem - 1px);
    }

    .flexible h3 {
      margin: 0 0 1rem;
      text-align: center;
      font-size: 1.125rem;
      font-weight: 500;
    }

    .flexible .chips {
      justify-content: center;
      margin: 0 0 2.5rem;
    }

    .meses-flex {
      position: relative;
      display: grid;
      grid-template-columns: repeat(6, minmax(0, 1fr));
      gap: 0.625rem;
    }

    .mes-card {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;
      padding: 1.5rem 0.5rem;
      border: 1px solid #ddd;
      border-radius: 1rem;
      background: white;
      color: #222;
      cursor: pointer;
    }

    .mes-card:hover {
      border-color: #222;
    }

    .mes-card[aria-pressed="true"] {
      border: 2px solid #222;
      background: #f7f7f7;
      padding: calc(1.5rem - 1px) calc(0.5rem - 1px);
    }

    .mes-card svg {
      color: #6a6a6a;
    }

    .mes-card .m {
      font-weight: 600;
    }

    .mes-card .a {
      font-size: 0.8125rem;
      color: #6a6a6a;
    }

    .flex-nav {
      position: absolute;
      top: 50%;
      width: 2.25rem;
      height: 2.25rem;
      transform: translateY(-50%);
      border: 1px solid #ddd;
      border-radius: 50%;
      background: white;
      font-size: 1.25rem;
      color: #222;
      cursor: pointer;
      box-shadow: 0 1px 4px rgb(0 0 0 / 0.12);
    }

    .flex-nav.next {
      right: -1rem;
    }

    .flex-nav.prev {
      left: -1rem;
    }

    /* Huéspedes */
    .fila {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1rem 0;
      border-bottom: 1px solid #ebebeb;
    }

    .fila:last-child {
      border-bottom: none;
    }

    .fila-titulo {
      font-weight: 600;
    }

    .fila-hint {
      font-size: 0.875rem;
      color: #6a6a6a;
    }

    .contador {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .contador button {
      width: 2rem;
      height: 2rem;
      border: 1px solid #b0b0b0;
      border-radius: 50%;
      background: white;
      font-size: 1.125rem;
      color: #222;
      cursor: pointer;
    }

    .contador button:disabled {
      opacity: 0.3;
      cursor: not-allowed;
    }

    .contador span {
      min-width: 1.25rem;
      text-align: center;
    }
  `}connectedCallback(){super.connectedCallback(),window.addEventListener(`click`,this.onOutsideClick),window.addEventListener(`keydown`,this.onKeydown),window.addEventListener(`popstate`,this.sincronizarConUrl),this.sincronizarConUrl()}disconnectedCallback(){window.removeEventListener(`click`,this.onOutsideClick),window.removeEventListener(`keydown`,this.onKeydown),window.removeEventListener(`popstate`,this.sincronizarConUrl),super.disconnectedCallback()}toggle(e){this.panel=this.panel===e?null:e}elegirDestino(e){this.destino=e===Ye?``:e.nombre,this.panel=`fechas`}elegirDia(e){!this.desde||this.desde&&this.hasta||e<this.desde?(this.desde=e,this.hasta=``):e>this.desde&&(this.hasta=e)}alternarMes(e){let t=new Set(this.meses);t.delete(e)||t.add(e),this.meses=t}limpiar(e){e===`destino`&&(this.destino=``),e===`fechas`&&(this.desde=``,this.hasta=``,this.estancia=``,this.meses=new Set,this.tolerancia=0),e===`huespedes`&&(this.cantidades={adultos:0,ninos:0,bebes:0,mascotas:0})}updated(e){let t=this.renderRoot.querySelector(`.highlight`);if(!t)return;let n=this.panel?this.renderRoot.querySelector(`[data-seg="${this.panel}"]`):null;if(!n){t.classList.remove(`visible`);return}let r=e.has(`panel`)&&e.get(`panel`)===null;r&&(t.style.transition=`none`),t.style.left=`${n.offsetLeft}px`,t.style.top=`${n.offsetTop}px`,t.style.width=`${n.offsetWidth}px`,t.style.height=`${n.offsetHeight}px`,t.classList.add(`visible`),r&&(t.offsetWidth,t.style.transition=``)}moverMes(e){this.mesBase=new Date(this.mesBase.getFullYear(),this.mesBase.getMonth()+e,1)}cambiar(e,t){let n={...this.cantidades};n[e]=Math.max(0,n[e]+t),e!==`adultos`&&t>0&&n.adultos===0&&(n.adultos=1),this.cantidades=n}get totalHuespedes(){return this.cantidades.adultos+this.cantidades.ninos}get textoFechas(){if(this.modo===`flexible`){let e=at().filter(e=>this.meses.has(it(e))).map(e=>ot(e).slice(0,3).toLowerCase());return[this.estancia,e.join(`, `)].filter(Boolean).join(` · `)}return this.desde&&this.hasta?`${rt(this.desde)} - ${rt(this.hasta)}`:this.desde?`Desde ${rt(this.desde)}`:``}get textoHuespedes(){let e=this.totalHuespedes;if(e===0)return``;let t=`${e} ${e===1?`huésped`:`huéspedes`}`,{bebes:n}=this.cantidades;return n>0?`${t}, ${n} ${n===1?`bebé`:`bebés`}`:t}buscar(){let e=new URLSearchParams;this.destino.trim()?e.set(`texto`,this.destino.trim()):e.set(`cerca`,`true`),this.modo===`fechas`?(this.desde&&e.set(`desde`,this.desde),this.hasta&&e.set(`hasta`,this.hasta),this.tolerancia>0&&e.set(`margen`,String(this.tolerancia))):(this.estancia&&e.set(`estancia`,this.estancia),this.meses.size>0&&e.set(`meses`,[...this.meses].sort().join(`,`))),this.totalHuespedes>0&&e.set(`huespedes`,String(this.totalHuespedes)),e.set(`pagina`,`0`),e.set(`tamanio`,`18`),this.panel=null,P(`/alojamientos?${e}`),this.dispatchEvent(new CustomEvent(`search`,{detail:Object.fromEntries(e),bubbles:!0,composed:!0}))}iconoDestino(e){let t=e===Ye;return T`<span
      class="destino-icono"
      style="background:${e.fondo};color:${e.color}"
      aria-hidden="true"
    >
      ${t?T`<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M20 4 4 10.5l6.5 2.5L13 19.5z"/></svg>`:T`<svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" stroke-linecap="round"><path d="M4 15 14 7l10 8v11H4z"/><path d="M11 26v-7h6v7"/><path d="M3 29c3-2 5 2 8 0s5 2 8 0 5 2 8 0"/><path d="M26 6v6M23 9h6"/></svg>`}
    </span>`}renderDestino(){return T`<div class="popover destino">
      <h3>Destinaciones sugeridas</h3>
      <ul class="destino-lista">
        ${[Ye,...Xe].map(e=>T`<li>
            <button class="destino-item" @click=${()=>this.elegirDestino(e)}>
              ${this.iconoDestino(e)}
              <span>
                <div class="destino-nombre">${e.nombre}</div>
                <div class="destino-desc">${e.descripcion}</div>
              </span>
            </button>
          </li>`)}
      </ul>
    </div>`}renderMes(e){let t=e.getFullYear(),n=e.getMonth(),r=new Date(t,n+1,0).getDate(),i=(new Date(t,n,1).getDay()+6)%7,a=nt(),o=[...Array.from({length:i},()=>T`<span></span>`),...Array.from({length:r},(e,r)=>{let i=tt(new Date(t,n,r+1)),o=i<a,s=i===this.desde,c=i===this.hasta,l=!!this.desde&&!!this.hasta&&i>this.desde&&i<this.hasta;return T`<button
          class=${[`dia`,s||c?`sel`:``,s&&this.hasta?`inicio`:``,c?`fin`:``,l?`rango`:``].join(` `)}
          ?disabled=${o}
          aria-label=${i}
          aria-pressed=${s||c}
          @click=${()=>this.elegirDia(i)}
        >
          <span>${r+1}</span>
        </button>`})];return T`<div>
      <h3 class="mes-titulo">${st(e)}</h3>
      <div class="grid-dias">
        ${et.map(e=>T`<span class="cabecera">${e}</span>`)}
        ${o}
      </div>
    </div>`}renderFlexible(){let e=at(),t=e.slice(this.paginaMeses*6,this.paginaMeses*6+6),n=(this.paginaMeses+1)*6<e.length;return T`<div class="flexible">
      <h3>¿Cuánto tiempo quieres quedarte?</h3>
      <div class="chips">
        ${$e.map(e=>T`<button
            class="chip"
            aria-pressed=${this.estancia===e}
            @click=${()=>this.estancia=this.estancia===e?``:e}
          >
            ${e}
          </button>`)}
      </div>
      <h3>¿Cuándo quieres ir?</h3>
      <div class="meses-flex">
        ${this.paginaMeses>0?T`<button
              class="flex-nav prev"
              aria-label="Meses anteriores"
              @click=${()=>this.paginaMeses--}
            >
              ‹
            </button>`:D}
        ${t.map(e=>T`<button
            class="mes-card"
            aria-pressed=${this.meses.has(it(e))}
            @click=${()=>this.alternarMes(it(e))}
          >
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="7" width="24" height="21" rx="4"/><path d="M4 14h24M10 4v6M22 4v6"/></svg>
            <span class="m">${ot(e)}</span>
            <span class="a">${e.getFullYear()}</span>
          </button>`)}
        ${n?T`<button
              class="flex-nav next"
              aria-label="Más meses"
              @click=${()=>this.paginaMeses++}
            >
              ›
            </button>`:D}
      </div>
    </div>`}renderFechas(){let e=new Date(this.mesBase.getFullYear(),this.mesBase.getMonth()+1,1),t=new Date,n=this.mesBase.getFullYear()===t.getFullYear()&&this.mesBase.getMonth()===t.getMonth();return T`<div class="popover fechas">
      <div class="tabs" role="tablist">
        ${[`fechas`,`flexible`].map(e=>T`<button
            class="tab"
            role="tab"
            aria-selected=${this.modo===e}
            @click=${()=>this.modo=e}
          >
            ${e===`fechas`?`Fechas`:`Flexible`}
          </button>`)}
      </div>
      ${this.modo===`fechas`?T`<div class="meses">
              <button
                class="nav prev"
                aria-label="Mes anterior"
                ?disabled=${n}
                @click=${()=>this.moverMes(-1)}
              >
                ‹
              </button>
              <button
                class="nav next"
                aria-label="Mes siguiente"
                @click=${()=>this.moverMes(1)}
              >
                ›
              </button>
              ${this.renderMes(this.mesBase)} ${this.renderMes(e)}
            </div>
            <div class="chips">
              ${Qe.map(e=>T`<button
                  class="chip"
                  aria-pressed=${this.tolerancia===e}
                  @click=${()=>this.tolerancia=e}
                >
                  ${e===0?`Fechas exactas`:`± ${e} ${e===1?`día`:`días`}`}
                </button>`)}
            </div>`:this.renderFlexible()}
    </div>`}renderHuespedes(){return T`<div class="popover huespedes">
      ${Ze.map(({key:e,label:t,hint:n})=>T`<div class="fila">
          <div>
            <div class="fila-titulo">${t}</div>
            <div class="fila-hint">${n}</div>
          </div>
          <div class="contador">
            <button
              aria-label="Disminuir ${t}"
              ?disabled=${this.cantidades[e]<=0||e===`adultos`&&this.cantidades.adultos===1&&this.cantidades.ninos+this.cantidades.bebes+this.cantidades.mascotas>0}
              @click=${()=>this.cambiar(e,-1)}
            >
              −
            </button>
            <span>${this.cantidades[e]}</span>
            <button
              aria-label="Aumentar ${t}"
              @click=${()=>this.cambiar(e,1)}
            >
              +
            </button>
          </div>
        </div>`)}
    </div>`}segmento(e,t,n,r){let i=this.panel===e;return T`<div class="seg-wrap" data-seg=${e}>
      <button
        class="segment"
        aria-expanded=${i}
        @click=${()=>this.toggle(e)}
      >
        <span class="label">${t}</span>
        <span class=${n?`value filled`:`value`}>${n||r}</span>
      </button>
      ${i&&n?T`<button
            class="clear"
            aria-label="Borrar ${t}"
            @click=${()=>this.limpiar(e)}
          >
            ×
          </button>`:D}
    </div>`}render(){let e=this.modo===`flexible`;return T`<div class="bar">
        <span class="highlight"></span>
        ${this.segmento(`destino`,`Dónde`,this.destino,`Explora destinos`)}
        <span class="divider"></span>
        ${this.segmento(`fechas`,e?`Cuándo`:`Fechas`,this.textoFechas,e?`Cualquier fecha`:`Agrega fechas`)}
        <span class="divider"></span>
        ${this.segmento(`huespedes`,`Quién`,this.textoHuespedes,`¿Cuántos?`)}
        <button class="submit" aria-label="Buscar" @click=${this.buscar}>
          <i-search width="20" height="20"></i-search>
          ${this.panel?`Buscar`:D}
        </button>
      </div>
      ${this.panel===`destino`?this.renderDestino():D}
      ${this.panel===`fechas`?this.renderFechas():D}
      ${this.panel===`huespedes`?this.renderHuespedes():D} `}};N([j()],F.prototype,`panel`,void 0),N([j()],F.prototype,`destino`,void 0),N([j()],F.prototype,`desde`,void 0),N([j()],F.prototype,`hasta`,void 0),N([j()],F.prototype,`modo`,void 0),N([j()],F.prototype,`tolerancia`,void 0),N([j()],F.prototype,`estancia`,void 0),N([j()],F.prototype,`meses`,void 0),N([j()],F.prototype,`paginaMeses`,void 0),N([j()],F.prototype,`mesBase`,void 0),N([j()],F.prototype,`cantidades`,void 0),F=N([k(`header-search`)],F);var ct=()=>({checkValidity(e){let t=e.input,n={message:``,isValid:!0,invalidKeys:[]};if(!t)return n;let r=!0;if(`checkValidity`in t&&(r=t.checkValidity()),r)return n;if(n.isValid=!1,`validationMessage`in t&&(n.message=t.validationMessage),!(`validity`in t))return n.invalidKeys.push(`customError`),n;for(let e in t.validity){if(e===`valid`)continue;let r=e;t.validity[r]&&n.invalidKeys.push(r)}return n}}),lt=class extends Event{constructor(){super(`wa-invalid`,{bubbles:!0,cancelable:!1,composed:!0})}},ut=Object.defineProperty,dt=Object.getOwnPropertyDescriptor,ft=e=>{throw TypeError(e)},I=(e,t,n,r)=>{for(var i=r>1?void 0:r?dt(t,n):t,a=e.length-1,o;a>=0;a--)(o=e[a])&&(i=(r?o(t,n,i):o(i))||i);return r&&i&&ut(t,n,i),i},pt=(e,t,n)=>t.has(e)||ft(`Cannot `+n),mt=(e,t,n)=>(pt(e,t,`read from private field`),n?n.call(e):t.get(e)),ht=(e,t,n)=>t.has(e)?ft(`Cannot add the same private member more than once`):t instanceof WeakSet?t.add(e):t.set(e,n),gt=(e,t,n,r)=>(pt(e,t,`write to private field`),r?r.call(e,n):t.set(e,n),n),_t=p`
  :host {
    box-sizing: border-box;
  }

  :host *,
  :host *::before,
  :host *::after {
    box-sizing: inherit;
  }

  [hidden],
  :host([hidden]) {
    display: none !important;
  }
`,vt=/;\s+$/;function yt(e){return e.replace(/[A-Z]/g,e=>`-${e.toLowerCase()}`)}function bt(e){let{property:t,value:n,element:r}=e;if(n){let e=r.getAttribute(`style`)||``;e&&(e.match(vt)||(e+=`;`),e+=` `);let i=`${t}: ${n}`;return e.includes(i)?void 0:`${e}${i};`}return null}var xt,L=class extends O{constructor(){super(),ht(this,xt,!1),this.initialReflectedProperties=new Map,this.didSSR=!!this.shadowRoot,this.customStates={set:(e,t)=>{if(this.internals?.states)try{t?this.internals.states.add(e):this.internals.states.delete(e)}catch(e){if(String(e).includes(`must start with '--'`))console.error(`Your browser implements an outdated version of CustomStateSet. Consider using a polyfill`);else throw e}},has:e=>{if(!this.internals?.states)return!1;try{return this.internals.states.has(e)}catch{return!1}}};try{this.internals=this.attachInternals()}catch{console.error(`Element internals are not supported in your browser. Consider using a polyfill`)}this.customStates.set(`wa-defined`,!0);let e=this.constructor;for(let[t,n]of e.elementProperties)n.default===`inherit`&&n.initial!==void 0&&typeof t==`string`&&this.customStates.set(`initial-${t}-${n.initial}`,!0)}static get styles(){return[_t,...Array.isArray(this.css)?this.css:this.css?[this.css]:[]]}connectedCallback(){super.connectedCallback(),this.didSSR||this.shadowRoot?.prepend(document.createComment(` Web Awesome: https://webawesome.com/docs/components/${this.localName.replace(`wa-`,``)} `)),this.didSSR&&this.updateComplete.then(()=>{this.shadowRoot?.prepend(document.createComment(` Web Awesome: https://webawesome.com/docs/components/${this.localName.replace(`wa-`,``)} `))})}attributeChangedCallback(e,t,n){mt(this,xt)||(this.constructor.elementProperties.forEach((e,t)=>{e.reflect&&this[t]!=null&&this.initialReflectedProperties.set(t,this[t])}),gt(this,xt,!0)),super.attributeChangedCallback(e,t,n)}willUpdate(e){super.willUpdate(e),this.initialReflectedProperties.forEach((t,n)=>{e.has(n)&&this[n]==null&&(this[n]=t)})}firstUpdated(e){super.firstUpdated(e),this.didSSR&&this.shadowRoot?.querySelectorAll(`slot`).forEach(e=>{e.dispatchEvent(new Event(`slotchange`,{bubbles:!0,composed:!1,cancelable:!1}))})}update(e){try{super.update(e)}catch(e){if(this.didSSR&&!this.hasUpdated){let t=new Event(`lit-hydration-error`,{bubbles:!0,composed:!0,cancelable:!1});t.error=e,this.dispatchEvent(t)}throw e}}setStyle(e,t){if(!this.style){let n=bt({property:yt(e),value:t,element:this});n&&this.setAttribute(`style`,n);return}this.style[e]=t}setStyleProperty(e,t){if(!this.style){let n=bt({property:e,value:t,element:this});n&&this.setAttribute(`style`,n);return}this.style.setProperty(e,t)}relayNativeEvent(e,t){e.stopImmediatePropagation(),this.dispatchEvent(new e.constructor(e.type,{...e,...t}))}};xt=new WeakMap,I([A()],L.prototype,`dir`,2),I([A()],L.prototype,`lang`,2),I([A({type:Boolean,reflect:!0,attribute:`did-ssr`})],L.prototype,`didSSR`,2);var St=()=>({observedAttributes:[`custom-error`],checkValidity(e){let t={message:``,isValid:!0,invalidKeys:[]};return e.customError&&(t.message=e.customError,t.isValid=!1,t.invalidKeys=[`customError`]),t}}),R=class extends L{constructor(){super(),this.name=null,this.disabled=!1,this.required=!1,this.assumeInteractionOn=[`input`],this.validators=[],this.valueHasChanged=!1,this.hasInteracted=!1,this.customError=null,this.emittedEvents=[],this.emitInvalid=e=>{e.target===this&&(this.hasInteracted=!0,this.dispatchEvent(new lt))},this.handleInteraction=e=>{let t=this.emittedEvents;t.includes(e.type)||t.push(e.type),t.length===this.assumeInteractionOn?.length&&(this.hasInteracted=!0)},`addEventListener`in this&&this.addEventListener(`invalid`,this.emitInvalid)}static get validators(){return[St()]}static get observedAttributes(){let e=new Set(super.observedAttributes||[]);for(let t of this.validators)if(t.observedAttributes)for(let n of t.observedAttributes)e.add(n);return[...e]}connectedCallback(){super.connectedCallback(),this.didSSR&&!this.hasUpdated?this.updateComplete.then(()=>{this.updateValidity()}):this.updateValidity(),this.assumeInteractionOn.forEach(e=>{this.addEventListener?.(e,this.handleInteraction)})}firstUpdated(...e){super.firstUpdated(...e),this.updateValidity()}willUpdate(e){if(e.has(`customError`)&&(this.customError||=null,this.setCustomValidity(this.customError||``)),e.has(`value`)||e.has(`disabled`)||e.has(`defaultValue`)){let e=this.value;this.updateFormValue(e)}e.has(`disabled`)&&(this.customStates.set(`disabled`,this.disabled),(this.hasAttribute(`disabled`)||!this.matches(`:disabled`))&&this.toggleAttribute(`disabled`,this.disabled)),super.willUpdate(e),this.didSSR&&!this.hasUpdated?this.updateComplete.then(()=>this.updateValidity()):this.updateValidity()}updateFormValue(e){if(Array.isArray(e)){if(this.name){let t=new FormData;for(let n of e)t.append(this.name,n);this.setValue(t,t)}}else this.setValue(e,e)}get labels(){return this.internals.labels}getForm(){return this.internals.form}set form(e){e?this.setAttribute(`form`,e):this.removeAttribute(`form`)}get form(){return this.internals.form}get validity(){return this.internals.validity}get willValidate(){return this.internals.willValidate}get validationMessage(){return this.internals.validationMessage}checkValidity(){return this.updateValidity(),this.internals.checkValidity()}reportValidity(){return this.updateValidity(),this.hasInteracted=!0,this.internals.reportValidity()}get validationTarget(){return this.input||void 0}setValidity(...e){let t=e[0],n=e[1],r=e[2];r||=this.validationTarget,this.internals.setValidity(t,n,r||void 0),this.requestUpdate(`validity`),this.setCustomStates()}setCustomStates(){let e=!!this.required,t=this.internals.validity.valid,n=this.hasInteracted;this.customStates.set(`required`,e),this.customStates.set(`optional`,!e),this.customStates.set(`invalid`,!t),this.customStates.set(`valid`,t),this.customStates.set(`user-invalid`,!t&&n),this.customStates.set(`user-valid`,t&&n)}setCustomValidity(e){if(!e){this.customError=null,this.setValidity({});return}this.customError=e,this.setValidity({customError:!0},e,this.validationTarget)}formResetCallback(){this.resetValidity(),this.hasInteracted=!1,this.valueHasChanged=!1,this.emittedEvents=[],this.updateValidity()}formDisabledCallback(e){this.disabled=e,this.updateValidity()}formStateRestoreCallback(e,t){this.didSSR&&!this.hasUpdated?this.updateComplete.then(()=>{this.value=e,t===`restore`&&this.resetValidity(),this.updateValidity()}):(this.value=e,t===`restore`&&this.resetValidity(),this.updateValidity())}setValue(...e){let[t,n]=e;this.internals.setFormValue(t,n)}get allValidators(){let e=this.constructor.validators||[],t=this.validators||[];return[...e,...t]}resetValidity(){this.setCustomValidity(``),this.setValidity({})}updateValidity(){if(this.disabled||this.hasAttribute(`disabled`)||!this.willValidate){this.resetValidity();return}let e=this.allValidators;if(!e?.length)return;let t={customError:!!this.customError},n=this.validationTarget||this.input||void 0,r=``;for(let n of e){let{isValid:e,message:i,invalidKeys:a}=n.checkValidity(this);e||(r||=i,a?.length>=0&&a.forEach(e=>t[e]=!0))}r||=this.validationMessage,this.setValidity(t,r,n)}};R.formAssociated=!0,I([A({reflect:!0})],R.prototype,`name`,2),I([A({type:Boolean})],R.prototype,`disabled`,2),I([A({state:!0,attribute:!1})],R.prototype,`valueHasChanged`,2),I([A({state:!0,attribute:!1})],R.prototype,`hasInteracted`,2),I([A({attribute:`custom-error`,reflect:!0})],R.prototype,`customError`,2),I([A({attribute:!1,state:!0,type:Object})],R.prototype,`validity`,1);var Ct={small:`s`,medium:`m`,large:`l`},wt=new Set;function Tt(e,t){t in Ct&&!wt.has(`${e}:${t}`)&&(wt.add(`${e}:${t}`),console.warn(`[${e}] size="${t}" is deprecated. Use size="${Ct[t]}" instead. The long-form value will be removed in the next major version.`))}var Et=class{constructor(e,...t){this.slotNames=[],this.handleSlotChange=e=>{let t=e.target;(this.slotNames.includes(`[default]`)&&!t.name||t.name&&this.slotNames.includes(t.name))&&this.host.requestUpdate()},(this.host=e).addController(this),this.slotNames=t}hasDefaultSlot(){return this.host.childNodes?[...this.host.childNodes].some(e=>{if(e.nodeType===Node.TEXT_NODE&&e.textContent.trim()!==``)return!0;if(e.nodeType===Node.ELEMENT_NODE){let t=e;if(t.tagName.toLowerCase()===`wa-visually-hidden`)return!1;if(!t.hasAttribute(`slot`))return!0}return!1}):!1}hasNamedSlot(e){return this.host.querySelector?.(`:scope > [slot="${e}"]`)!==null}test(e,t){return t&&this.host.didSSR&&!this.host.hasUpdated?!!this.host[t]:e===`[default]`?this.hasDefaultSlot():this.hasNamedSlot(e)}hostConnected(){let e=this.host.shadowRoot;e&&`addEventListener`in e&&e.addEventListener(`slotchange`,this.handleSlotChange)}hostDisconnected(){let e=this.host.shadowRoot;e&&`removeEventListener`in e&&e.removeEventListener(`slotchange`,this.handleSlotChange)}},Dt=p`
  :host([size='xs']) {
    font-size: var(--wa-font-size-xs);
  }

  :host([size='s']),
  :host([size='small']) {
    font-size: var(--wa-font-size-s);
  }

  :host([size='m']),
  :host([size='medium']) {
    font-size: var(--wa-font-size-m);
  }

  :host([size='l']),
  :host([size='large']) {
    font-size: var(--wa-font-size-l);
  }

  :host([size='xl']) {
    font-size: var(--wa-font-size-xl);
  }
`,Ot=p`
  @layer wa-component {
    :host {
      display: inline-block;

      /* Workaround because Chrome doesn't like :host(:has()) below
       * https://issues.chromium.org/issues/40062355
       * Firefox doesn't like this nested rule, so both are needed */
      &:has(wa-badge) {
        position: relative;
      }
    }

    /* Apply relative positioning only when needed to position wa-badge
     * This avoids creating a new stacking context for every button */
    :host(:has(wa-badge)) {
      position: relative;
    }
  }

  .button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    user-select: none;
    -webkit-user-select: none;
    white-space: nowrap;
    vertical-align: middle;
    transition-property: background, border, box-shadow, color, opacity, transform;
    transition-duration: var(--wa-transition-fast);
    transition-timing-function: var(--wa-transition-easing);
    transform-origin: center;
    cursor: pointer;
    padding: 0 var(--wa-form-control-padding-inline);
    font-family: inherit;
    font-size: inherit;
    font-weight: var(--wa-font-weight-action);
    height: var(--wa-form-control-height);
    width: 100%;

    background-color: var(--wa-color-fill-loud, var(--wa-color-neutral-fill-loud));

    border-color: transparent;
    color: var(--wa-color-on-loud, var(--wa-color-neutral-on-loud));
    border-start-start-radius: var(--_button-start-start-radius, var(--wa-form-control-border-radius));
    border-start-end-radius: var(--_button-start-end-radius, var(--wa-form-control-border-radius));
    border-end-start-radius: var(--_button-end-start-radius, var(--wa-form-control-border-radius));
    border-end-end-radius: var(--_button-end-end-radius, var(--wa-form-control-border-radius));
    border-style: var(--wa-form-control-border-style);
    border-width: var(--wa-form-control-border-width);
  }

  /* Hover and active transforms */
  .button:not(.disabled):not(.loading) {
    @media (hover: hover) {
      &:hover {
        transform: var(--wa-button-transform-hover);
      }
    }
    &:active {
      transform: var(--wa-button-transform-active);
    }

    @media (prefers-reduced-motion: reduce) {
      &:hover,
      &:active {
        transform: none;
      }
    }
  }

  /* Appearance modifiers */
  :host([appearance='plain']) {
    /* Indentation overrides for grouping */
    margin-inline-start: var(--_button-horizontal-indent);
    margin-block-start: var(--_button-vertical-indent);

    .button {
      color: var(--wa-color-on-quiet, var(--wa-color-neutral-on-quiet));
      background-color: transparent;
      border-color: transparent;
    }
    @media (hover: hover) {
      .button:not(.disabled):not(.loading):hover {
        color: var(--wa-color-on-quiet, var(--wa-color-neutral-on-quiet));
        background-color: var(--wa-color-fill-quiet, var(--wa-color-neutral-fill-quiet));
      }
    }
    .button:not(.disabled):not(.loading):active {
      color: var(--wa-color-on-quiet, var(--wa-color-neutral-on-quiet));
      background-color: color-mix(
        in oklab,
        var(--wa-color-fill-quiet, var(--wa-color-neutral-fill-quiet)),
        var(--wa-color-mix-active)
      );
    }
  }

  :host([appearance='outlined']) {
    /* Indentation overrides for grouping outlined */
    margin-inline-start: var(--_button-horizontal-indent-outlined);
    margin-block-start: var(--_button-vertical-indent-outlined);

    .button {
      color: var(--wa-color-on-quiet, var(--wa-color-neutral-on-quiet));
      background-color: transparent;
      border-color: var(--wa-color-border-loud, var(--wa-color-neutral-border-loud));
    }
    @media (hover: hover) {
      .button:not(.disabled):not(.loading):hover {
        color: var(--wa-color-on-quiet, var(--wa-color-neutral-on-quiet));
        background-color: var(--wa-color-fill-quiet, var(--wa-color-neutral-fill-quiet));
      }
    }
    .button:not(.disabled):not(.loading):active {
      color: var(--wa-color-on-quiet, var(--wa-color-neutral-on-quiet));
      background-color: color-mix(
        in oklab,
        var(--wa-color-fill-quiet, var(--wa-color-neutral-fill-quiet)),
        var(--wa-color-mix-active)
      );
    }
  }

  :host([appearance='filled']) {
    /* Indentation overrides for grouping */
    margin-inline-start: var(--_button-horizontal-indent);
    margin-block-start: var(--_button-vertical-indent);

    .button {
      color: var(--wa-color-on-normal, var(--wa-color-neutral-on-normal));
      background-color: var(--wa-color-fill-normal, var(--wa-color-neutral-fill-normal));
      border-color: transparent;
    }
    @media (hover: hover) {
      .button:not(.disabled):not(.loading):hover {
        color: var(--wa-color-on-normal, var(--wa-color-neutral-on-normal));
        background-color: color-mix(
          in oklab,
          var(--wa-color-fill-normal, var(--wa-color-neutral-fill-normal)),
          var(--wa-color-mix-hover)
        );
      }
    }
    .button:not(.disabled):not(.loading):active {
      color: var(--wa-color-on-normal, var(--wa-color-neutral-on-normal));
      background-color: color-mix(
        in oklab,
        var(--wa-color-fill-normal, var(--wa-color-neutral-fill-normal)),
        var(--wa-color-mix-active)
      );
    }
  }

  :host([appearance='filled-outlined']) {
    /* Indentation overrides for grouping outlined */
    margin-inline-start: var(--_button-horizontal-indent-outlined);
    margin-block-start: var(--_button-vertical-indent-outlined);

    .button {
      color: var(--wa-color-on-normal, var(--wa-color-neutral-on-normal));
      background-color: var(--wa-color-fill-normal, var(--wa-color-neutral-fill-normal));
      border-color: var(--wa-color-border-normal, var(--wa-color-neutral-border-normal));
    }
    @media (hover: hover) {
      .button:not(.disabled):not(.loading):hover {
        color: var(--wa-color-on-normal, var(--wa-color-neutral-on-normal));
        background-color: color-mix(
          in oklab,
          var(--wa-color-fill-normal, var(--wa-color-neutral-fill-normal)),
          var(--wa-color-mix-hover)
        );
      }
    }
    .button:not(.disabled):not(.loading):active {
      color: var(--wa-color-on-normal, var(--wa-color-neutral-on-normal));
      background-color: color-mix(
        in oklab,
        var(--wa-color-fill-normal, var(--wa-color-neutral-fill-normal)),
        var(--wa-color-mix-active)
      );
    }
  }

  :host([appearance='accent']) {
    /* Indentation overrides for grouping */
    margin-inline-start: var(--_button-horizontal-indent);
    margin-block-start: var(--_button-vertical-indent);

    .button {
      color: var(--wa-color-on-loud, var(--wa-color-neutral-on-loud));
      background-color: var(--wa-color-fill-loud, var(--wa-color-neutral-fill-loud));
      border-color: transparent;
    }
    @media (hover: hover) {
      .button:not(.disabled):not(.loading):hover {
        background-color: color-mix(
          in oklab,
          var(--wa-color-fill-loud, var(--wa-color-neutral-fill-loud)),
          var(--wa-color-mix-hover)
        );
      }
    }
    .button:not(.disabled):not(.loading):active {
      background-color: color-mix(
        in oklab,
        var(--wa-color-fill-loud, var(--wa-color-neutral-fill-loud)),
        var(--wa-color-mix-active)
      );
    }
  }

  /* Focus states */
  .button:focus {
    outline: none;
  }

  .button:focus-visible {
    outline: var(--wa-focus-ring);
    outline-offset: var(--wa-focus-ring-offset);
  }

  /* Disabled state */
  :host([disabled]) {
    opacity: 0.5;
    cursor: not-allowed;

    /* When disabled, prevent mouse events from bubbling up from children */
    .button {
      pointer-events: none;
    }
  }

  /* Keep it last so Safari doesn't stop parsing this block */
  .button::-moz-focus-inner {
    border: 0;
  }

  /* Icon buttons */
  .button.is-icon-button {
    outline-offset: 2px;
    width: var(--wa-form-control-height);
    aspect-ratio: 1;
  }

  /* Icon buttons with a caret need to grow to fit both the icon and the caret */
  .button.is-icon-button.caret {
    width: auto;
    aspect-ratio: auto;
    min-width: var(--wa-form-control-height);
  }

  /* Pill modifier */
  :host([pill]) .button {
    border-start-start-radius: var(--_button-start-start-radius, var(--wa-border-radius-pill));
    border-start-end-radius: var(--_button-start-end-radius, var(--wa-border-radius-pill));
    border-end-start-radius: var(--_button-end-start-radius, var(--wa-border-radius-pill));
    border-end-end-radius: var(--_button-end-end-radius, var(--wa-border-radius-pill));
  }

  /*
   * Label
   */

  .start,
  .end {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    pointer-events: none;
  }

  .label {
    display: inline-block;
  }

  .is-icon-button .label {
    display: flex;
    justify-content: center;
  }

  .label::slotted(wa-icon) {
    align-self: center;
  }

  /*
   * Caret modifier
   */

  wa-icon[part='caret'] {
    display: flex;
    align-self: center;
    align-items: center;

    &::part(svg) {
      width: 0.875em;
      height: 0.875em;
    }

    .button:has(&) .end {
      display: none;
    }
  }

  /*
   * Loading modifier
   */

  .loading {
    position: relative;
    cursor: wait;

    .start,
    .label,
    .end,
    .caret {
      /* Hidden with opacity, not visibility, so the label stays in the accessibility tree */
      opacity: 0;

      /* Unlike visibility: hidden, opacity leaves the content clickable */
      pointer-events: none;
    }

    wa-spinner {
      --indicator-color: currentColor;
      --track-color: color-mix(in oklab, currentColor, transparent 90%);

      position: absolute;
      font-size: 1em;
      height: 1em;
      width: 1em;
      top: calc(50% - 0.5em);
      left: calc(50% - 0.5em);
    }
  }

  /*
   * Badges
   */

  .button ::slotted(wa-badge) {
    border-color: var(--wa-color-surface-default);
    position: absolute;
    inset-block-start: 0;
    inset-inline-end: 0;
    translate: 50% -50%;
    pointer-events: none;
  }

  :host(:dir(rtl)) ::slotted(wa-badge) {
    translate: -50% -50%;
  }

  /*
  * Button spacing
  */

  slot[name='start']::slotted(*) {
    margin-inline-end: 0.75em;
  }

  slot[name='end']::slotted(*),
  .button:not(.visually-hidden-label) [part='caret'] {
    margin-inline-start: 0.75em;
  }
`,kt=p`
  :where(:root),
  .wa-neutral,
  :host([variant='neutral']) {
    --wa-color-fill-loud: var(--wa-color-neutral-fill-loud);
    --wa-color-fill-normal: var(--wa-color-neutral-fill-normal);
    --wa-color-fill-quiet: var(--wa-color-neutral-fill-quiet);
    --wa-color-border-loud: var(--wa-color-neutral-border-loud);
    --wa-color-border-normal: var(--wa-color-neutral-border-normal);
    --wa-color-border-quiet: var(--wa-color-neutral-border-quiet);
    --wa-color-on-loud: var(--wa-color-neutral-on-loud);
    --wa-color-on-normal: var(--wa-color-neutral-on-normal);
    --wa-color-on-quiet: var(--wa-color-neutral-on-quiet);
  }

  .wa-brand,
  :host([variant='brand']) {
    --wa-color-fill-loud: var(--wa-color-brand-fill-loud);
    --wa-color-fill-normal: var(--wa-color-brand-fill-normal);
    --wa-color-fill-quiet: var(--wa-color-brand-fill-quiet);
    --wa-color-border-loud: var(--wa-color-brand-border-loud);
    --wa-color-border-normal: var(--wa-color-brand-border-normal);
    --wa-color-border-quiet: var(--wa-color-brand-border-quiet);
    --wa-color-on-loud: var(--wa-color-brand-on-loud);
    --wa-color-on-normal: var(--wa-color-brand-on-normal);
    --wa-color-on-quiet: var(--wa-color-brand-on-quiet);
  }

  .wa-success,
  :host([variant='success']) {
    --wa-color-fill-loud: var(--wa-color-success-fill-loud);
    --wa-color-fill-normal: var(--wa-color-success-fill-normal);
    --wa-color-fill-quiet: var(--wa-color-success-fill-quiet);
    --wa-color-border-loud: var(--wa-color-success-border-loud);
    --wa-color-border-normal: var(--wa-color-success-border-normal);
    --wa-color-border-quiet: var(--wa-color-success-border-quiet);
    --wa-color-on-loud: var(--wa-color-success-on-loud);
    --wa-color-on-normal: var(--wa-color-success-on-normal);
    --wa-color-on-quiet: var(--wa-color-success-on-quiet);
  }

  .wa-warning,
  :host([variant='warning']) {
    --wa-color-fill-loud: var(--wa-color-warning-fill-loud);
    --wa-color-fill-normal: var(--wa-color-warning-fill-normal);
    --wa-color-fill-quiet: var(--wa-color-warning-fill-quiet);
    --wa-color-border-loud: var(--wa-color-warning-border-loud);
    --wa-color-border-normal: var(--wa-color-warning-border-normal);
    --wa-color-border-quiet: var(--wa-color-warning-border-quiet);
    --wa-color-on-loud: var(--wa-color-warning-on-loud);
    --wa-color-on-normal: var(--wa-color-warning-on-normal);
    --wa-color-on-quiet: var(--wa-color-warning-on-quiet);
  }

  .wa-danger,
  :host([variant='danger']) {
    --wa-color-fill-loud: var(--wa-color-danger-fill-loud);
    --wa-color-fill-normal: var(--wa-color-danger-fill-normal);
    --wa-color-fill-quiet: var(--wa-color-danger-fill-quiet);
    --wa-color-border-loud: var(--wa-color-danger-border-loud);
    --wa-color-border-normal: var(--wa-color-danger-border-normal);
    --wa-color-border-quiet: var(--wa-color-danger-border-quiet);
    --wa-color-on-loud: var(--wa-color-danger-on-loud);
    --wa-color-on-normal: var(--wa-color-danger-on-normal);
    --wa-color-on-quiet: var(--wa-color-danger-on-quiet);
  }
`;function z(e,t){let n={waitUntilFirstUpdate:!1,...t};return(t,r)=>{let{update:i}=t,a=Array.isArray(e)?e:[e];t.update=function(e){a.forEach(t=>{let i=t;if(e.has(i)){let t=e.get(i),a=this[i];t!==a&&(!n.waitUntilFirstUpdate||this.hasUpdated)&&this[r](t,a)}}),i.call(this,e)}}}var At=new Set,jt=new Map,Mt,Nt=`ltr`,Pt=`en`,Ft=typeof MutationObserver<`u`&&typeof document<`u`&&document.documentElement!==void 0;if(Ft){let e=new MutationObserver(Lt);Nt=document.documentElement.dir||`ltr`,Pt=document.documentElement.lang||navigator.language,e.observe(document.documentElement,{attributes:!0,attributeFilter:[`dir`,`lang`]})}function It(...e){e.map(e=>{let t=e.$code.toLowerCase();jt.has(t)?jt.set(t,Object.assign(Object.assign({},jt.get(t)),e)):jt.set(t,e),Mt||=e}),Lt()}function Lt(){Ft&&(Nt=document.documentElement.dir||`ltr`,Pt=document.documentElement.lang||navigator.language),[...At.keys()].map(e=>{typeof e.requestUpdate==`function`&&e.requestUpdate()})}var Rt=class{constructor(e){this.host=e,this.host.addController(this)}hostConnected(){At.add(this.host)}hostDisconnected(){At.delete(this.host)}dir(){return`${this.host.dir||Nt}`.toLowerCase()}lang(){let e=`${this.host.lang||Pt}`.toLowerCase().replace(/_/g,`-`);try{return new Intl.Locale(e),e}catch{return Mt?Mt.$code.toLowerCase():`en`}}getTranslationData(e){let t;try{t=new Intl.Locale(e.replace(/_/g,`-`))}catch{return{locale:void 0,language:``,region:``,primary:void 0,secondary:void 0}}let n=t.language.toLowerCase(),r=t.region?.toLowerCase()??``,i=jt.get(`${n}-${r}`),a=jt.get(n);return{locale:t,language:n,region:r,primary:i,secondary:a}}exists(e,t){let{primary:n,secondary:r}=this.getTranslationData(t.lang??this.lang());return t=Object.assign({includeFallback:!1},t),!!(n&&n[e]||r&&r[e]||t.includeFallback&&Mt&&Mt[e])}term(e,...t){let{primary:n,secondary:r}=this.getTranslationData(this.lang()),i;if(n&&n[e])i=n[e];else if(r&&r[e])i=r[e];else if(Mt&&Mt[e])i=Mt[e];else return console.error(`No translation found for: ${String(e)}`),String(e);return typeof i==`function`?i(...t):i}date(e,t){return e=new Date(e),new Intl.DateTimeFormat(this.lang(),t).format(e)}number(e,t){return e=Number(e),isNaN(e)?``:new Intl.NumberFormat(this.lang(),t).format(e)}relativeTime(e,t,n){return new Intl.RelativeTimeFormat(this.lang(),n).format(e,t)}},zt={$code:`en`,$name:`English`,$dir:`ltr`,am:`AM`,autosizeColumn:`Autosize column`,captions:`Captions`,carousel:`Carousel`,chooseDate:`Choose date`,chooseDecade:`Choose decade`,chooseMonth:`Choose month`,chooseTime:`Choose time`,chooseYear:`Choose year`,clearEntry:`Clear entry`,clearFilter:`Clear filter`,clearSort:`Clear sort`,close:`Close`,closeCalendar:`Close calendar`,closeTimeInput:`Close time picker`,collapseRow:`Collapse row`,columnMenu:`Column options`,columnMovedToPosition:(e,t,n)=>`${e} moved to position ${t} of ${n}`,columns:`Columns`,compactPageXOfY:(e,t)=>`${e} of ${t}`,copied:`Copied`,copy:`Copy`,createOption:e=>`Create "${e}"`,currentlyPlaying:`currently playing`,currentValue:`Current value`,date:`Date`,datePickerKeyboardHelp:`Use arrow keys to change values; press Alt+Down Arrow to open the calendar.`,day:`Day`,dayPeriod:`AM/PM`,decrement:`Decrement`,deselectAllRows:`Deselect all rows`,dropFileHere:`Drop file here or click to browse`,dropFilesHere:`Drop files here or click to browse`,empty:`Empty`,endDate:`End date`,enterFullscreen:`Enter fullscreen`,error:`Error`,exitFullscreen:`Exit fullscreen`,expandRow:`Expand row`,filterByColumn:e=>`Filter by ${e}`,filterFrom:`From`,filterMax:`Max`,filterMin:`Min`,filterTo:`To`,firstPage:`First page`,goToSlide:(e,t)=>`Go to slide ${e} of ${t}`,hideColumn:`Hide column`,hidePassword:`Hide password`,hour:`Hour`,incompleteDate:`Enter a valid date.`,increment:`Increment`,jumpBackwardX:e=>`Jump back ${e} pages`,jumpForwardX:e=>`Jump forward ${e} pages`,lastPage:`Last page`,loading:`Loading`,minute:`Minute`,month:`Month`,moreOptions:`More Options`,mute:`Mute`,nextDecade:`Next decade`,nextMonth:`Next month`,nextPage:`Next page`,nextSlide:`Next slide`,nextVideo:`Next Video`,nextYear:`Next year`,noData:`No data`,noResults:`No matching results`,now:`Now`,numCharacters:e=>e===1?`1 character`:`${e} characters`,numCharactersRemaining:e=>e===1?`1 character remaining`:`${e} characters remaining`,numOptionsSelected:e=>e===0?`No options selected`:e===1?`1 option selected`:`${e} options selected`,numRowsCopied:e=>e===1?`1 row copied`:`${e} rows copied`,numRowsSelected:e=>e===1?`1 row selected`:`${e} rows selected`,pageXOfY:(e,t)=>`Page ${e} of ${t}`,pagination:`Pagination`,pause:`Pause`,pauseAnimation:`Pause animation`,pictureInPicture:`Picture in picture`,pinLeft:`Pin left`,pinRight:`Pin right`,play:`Play`,playAnimation:`Play animation`,playbackSpeed:`Playback speed`,playlist:`Playlist`,pm:`PM`,previousDecade:`Previous decade`,previousMonth:`Previous month`,previousPage:`Previous page`,previousSlide:`Previous slide`,previousVideo:`Previous video`,previousYear:`Previous year`,progress:`Progress`,rangeTooLong:e=>e===1?`Select a range no longer than 1 day`:`Select a range no longer than ${e} days`,rangeTooShort:e=>e===1?`Select a range at least 1 day long`:`Select a range at least ${e} days long`,readonly:`Read-only`,remove:`Remove`,resetColumns:`Reset columns`,resize:`Resize`,resizeColumn:`Resize column`,rowsPerPage:`Rows per page`,scrollableRegion:`Scrollable region`,scrollToEnd:`Scroll to end`,scrollToStart:`Scroll to start`,search:`Search`,second:`Second`,seek:`Seek`,seekProgress:(e,t)=>`${e} of ${t}`,selectAColorFromTheScreen:`Select a color from the screen`,selectAllRows:`Select all rows`,selected:`Selected`,selectedDateLabel:e=>`Selected: ${e}`,selectedRangeLabel:e=>`Selected range: ${e}`,selectGroup:`Select group`,selectionCleared:`Selection cleared`,selectRow:`Select row`,showingNofMRows:(e,t)=>`Showing ${e} of ${t} rows`,showingXtoYofZ:(e,t,n)=>`${e}\u2013${t} of ${n}`,showPassword:`Show password`,slideNum:e=>`Slide ${e}`,sortAscending:`Sort ascending`,sortColumn:`Sort column`,sortDescending:`Sort descending`,startDate:`Start date`,time:`Time`,timeInputKeyboardHelp:`Use arrow keys to change values; press Alt+Down Arrow to open the time picker.`,today:`Today`,toggleColorFormat:`Toggle color format`,unmute:`Unmute`,unpin:`Unpin`,unpinColumn:`Unpin column`,videoPlayer:`Video player`,volume:`Volume`,year:`Year`,zoomIn:`Zoom in`,zoomOut:`Zoom out`};It(zt);var Bt=zt,Vt=class extends Rt{lang(){return this.host.didSSR&&!this.host.hasUpdated?this.host.lang||`en`:super.lang()}};It(Bt);var Ht={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Ut=e=>(...t)=>({_$litDirective$:e,values:t}),Wt=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,n){this._$Ct=e,this._$AM=t,this._$Ci=n}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}},Gt=Ut(class extends Wt{constructor(e){if(super(e),e.type!==Ht.ATTRIBUTE||e.name!==`class`||e.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(e){return` `+Object.keys(e).filter(t=>e[t]).join(` `)+` `}update(e,[t]){if(this.st===void 0){this.st=new Set,e.strings!==void 0&&(this.nt=new Set(e.strings.join(` `).split(/\s/).filter(e=>e!==``)));for(let e in t)t[e]&&!this.nt?.has(e)&&this.st.add(e);return this.render(t)}let n=e.element.classList;for(let e of this.st)e in t||(n.remove(e),this.st.delete(e));for(let e in t){let r=!!t[e];r===this.st.has(e)||this.nt?.has(e)||(r?(n.add(e),this.st.add(e)):(n.remove(e),this.st.delete(e)))}return E}}),B=e=>e??D,Kt=Symbol.for(``),qt=e=>{if(e?.r===Kt)return e?._$litStatic$},Jt=(e,...t)=>({_$litStatic$:t.reduce((t,n,r)=>t+(e=>{if(e._$litStatic$!==void 0)return e._$litStatic$;throw Error(`Value passed to 'literal' function must be a 'literal' result: ${e}. Use 'unsafeStatic' to pass non-literal values, but\n            take care to ensure page security.`)})(n)+e[r+1],e[0]),r:Kt}),Yt=new Map,Xt=(e=>(t,...n)=>{let r=n.length,i,a,o=[],s=[],c,l=0,u=!1;for(;l<r;){for(c=t[l];l<r&&(a=n[l],(i=qt(a))!==void 0);)c+=i+t[++l],u=!0;l!==r&&s.push(a),o.push(c),l++}if(l===r&&o.push(t[r]),u){let e=o.join(`$$lit$$`);(t=Yt.get(e))===void 0&&(o.raw=o,Yt.set(e,t=o)),n=s}return e(t,...n)})(T),V=class extends R{constructor(){super(...arguments),this.assumeInteractionOn=[`click`],this.hasSlotController=new Et(this,`[default]`,`start`,`end`),this.localize=new Vt(this),this.invalid=!1,this.isIconButton=!1,this.title=``,this.variant=`neutral`,this.appearance=`accent`,this.size=`m`,this.withCaret=!1,this.withStart=!1,this.withEnd=!1,this.disabled=!1,this.loading=!1,this.pill=!1,this.type=`button`}static get validators(){return[...super.validators,ct()]}handleSizeChange(){Tt(this.localName,this.size)}constructLightDOMButton(){let e=document.createElement(`button`);for(let t of this.attributes)t.name!==`style`&&e.setAttribute(t.name,t.value);return e.type=this.type,e.style.position=`absolute !important`,e.style.width=`0 !important`,e.style.height=`0 !important`,e.style.clipPath=`inset(50%) !important`,e.style.overflow=`hidden !important`,e.style.whiteSpace=`nowrap !important`,this.name&&(e.name=this.name),e.value=this.value||``,e}handleClick(e){if(this.disabled||this.loading){e.preventDefault(),e.stopImmediatePropagation();return}if(this.type!==`submit`&&this.type!==`reset`||!this.getForm())return;let t=this.constructLightDOMButton();this.parentElement?.append(t),t.click(),t.remove()}handleInvalid(){this.dispatchEvent(new lt)}handleLabelSlotChange(){let e=this.labelSlot.assignedNodes({flatten:!0}),t=!1,n=!1,r=!1,i=!1;[...e].forEach(e=>{if(e.nodeType===Node.ELEMENT_NODE){let r=e;r.localName===`wa-icon`?(n=!0,t||=r.label!==void 0):i=!0}else e.nodeType===Node.TEXT_NODE&&(e.textContent?.trim()||``).length>0&&(r=!0)}),this.isIconButton=n&&!r&&!i,this.customStates.set(`icon-button`,this.isIconButton),this.isIconButton&&!t&&console.warn(`Icon buttons must have a label for screen readers. Add <wa-icon label="..."> to remove this warning.`,this)}isButton(){return!this.href}isLink(){return!!this.href}handleDisabledChange(){this.customStates.set(`disabled`,this.disabled),this.updateValidity()}handleHrefChange(){this.customStates.set(`link`,this.isLink())}handleLoadingChange(){this.customStates.set(`loading`,this.loading)}setValue(...e){}click(){this.button.click()}focus(e){this.button.focus(e)}blur(){this.button.blur()}render(){let e=this.isLink(),t=e?Jt`a`:Jt`button`;return Xt`
      <${t}
        part="base button"
        class=${Gt({button:!0,caret:this.withCaret,disabled:this.disabled,loading:this.loading,rtl:this.localize.dir()===`rtl`,"has-label":this.hasSlotController.test(`[default]`),"has-start":this.hasSlotController.test(`start`,`withStart`),"has-end":this.hasSlotController.test(`end`,`withEnd`),"is-icon-button":this.isIconButton})}
        ?disabled=${B(e?void 0:this.disabled)}
        type=${B(e?void 0:this.type)}
        title=${this.title}
        name=${B(e?void 0:this.name)}
        value=${B(e?void 0:this.value)}
        href=${B(e?this.href:void 0)}
        target=${B(e?this.target:void 0)}
        download=${B(e?this.download:void 0)}
        rel=${B(e&&this.rel?this.rel:void 0)}
        role=${B(e?void 0:`button`)}
        aria-disabled=${B(e&&this.disabled?`true`:void 0)}
        aria-busy=${this.loading?`true`:`false`}
        tabindex=${this.disabled?`-1`:`0`}
        @invalid=${this.isButton()?this.handleInvalid:null}
        @click=${this.handleClick}
      >
        <slot name="start" part="start" class="start"></slot>
        <slot part="label" class="label" @slotchange=${this.handleLabelSlotChange}></slot>
        <slot name="end" part="end" class="end"></slot>
        ${this.withCaret?Xt`
                <wa-icon part="caret" class="caret" library="system" name="chevron-down" variant="solid"></wa-icon>
              `:``}
        ${this.loading?Xt`<wa-spinner part="spinner"></wa-spinner>`:``}
      </${t}>
    `}};V.shadowRootOptions={...R.shadowRootOptions,delegatesFocus:!0},V.css=[Ot,kt,Dt],I([M(`.button`)],V.prototype,`button`,2),I([M(`slot:not([name])`)],V.prototype,`labelSlot`,2),I([j()],V.prototype,`invalid`,2),I([j()],V.prototype,`isIconButton`,2),I([A()],V.prototype,`title`,2),I([A({reflect:!0})],V.prototype,`variant`,2),I([A({reflect:!0})],V.prototype,`appearance`,2),I([A({reflect:!0})],V.prototype,`size`,2),I([z(`size`)],V.prototype,`handleSizeChange`,1),I([A({attribute:`with-caret`,type:Boolean,reflect:!0})],V.prototype,`withCaret`,2),I([A({attribute:`with-start`,type:Boolean})],V.prototype,`withStart`,2),I([A({attribute:`with-end`,type:Boolean})],V.prototype,`withEnd`,2),I([A({type:Boolean})],V.prototype,`disabled`,2),I([A({type:Boolean,reflect:!0})],V.prototype,`loading`,2),I([A({type:Boolean,reflect:!0})],V.prototype,`pill`,2),I([A()],V.prototype,`type`,2),I([A({reflect:!0})],V.prototype,`name`,2),I([A({reflect:!0})],V.prototype,`value`,2),I([A({reflect:!0})],V.prototype,`href`,2),I([A()],V.prototype,`target`,2),I([A()],V.prototype,`rel`,2),I([A()],V.prototype,`download`,2),I([A({attribute:`formaction`})],V.prototype,`formAction`,2),I([A({attribute:`formenctype`})],V.prototype,`formEnctype`,2),I([A({attribute:`formmethod`})],V.prototype,`formMethod`,2),I([A({attribute:`formnovalidate`,type:Boolean})],V.prototype,`formNoValidate`,2),I([A({attribute:`formtarget`})],V.prototype,`formTarget`,2),I([z(`disabled`,{waitUntilFirstUpdate:!0})],V.prototype,`handleDisabledChange`,1),I([z(`href`)],V.prototype,`handleHrefChange`,1),I([z(`loading`,{waitUntilFirstUpdate:!0})],V.prototype,`handleLoadingChange`,1),V=I([k(`wa-button`)],V),V.disableWarning?.(`change-in-update`);var Zt=p`
  :host {
    --track-width: 2px;
    --track-color: var(--wa-color-neutral-fill-normal);
    --indicator-color: var(--wa-color-brand-fill-loud);
    --speed: 2s;
    --size: 1em;

    /*
      Resizing a spinner element using anything but font-size will break the animation because the animation uses em
      units. Therefore, if a spinner is used in a flex container without \`flex: none\` applied, the spinner can
      grow/shrink and break the animation. The use of \`flex: none\` on the host element prevents this by always having
      the spinner sized according to its actual dimensions.
    */
    flex: none;
    display: inline-flex;
    width: var(--size);
    height: var(--size);
  }

  svg {
    width: 100%;
    height: 100%;
    aspect-ratio: 1;
    animation: spin var(--speed) linear infinite;
  }

  .track,
  .indicator {
    --radius: calc(var(--size) / 2 - var(--track-width) / 2);
    --circumference: calc(var(--radius) * 2 * 3.141592654);

    cx: calc(var(--size) / 2);
    cy: calc(var(--size) / 2);
    r: var(--radius);
    fill: none;
    stroke-width: var(--track-width);
  }

  .track {
    stroke: var(--track-color);
  }

  .indicator {
    stroke: var(--indicator-color);
    stroke-linecap: round;
    stroke-dasharray: calc(0.597 * var(--circumference)), calc(0.796 * var(--circumference));
    stroke-dashoffset: calc(-0.04 * var(--circumference));
    animation: dash 1.5s ease-in-out infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes dash {
    0% {
      stroke-dasharray: calc(0.008 * var(--circumference)), calc(1.194 * var(--circumference));
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: calc(0.716 * var(--circumference)), calc(1.194 * var(--circumference));
      stroke-dashoffset: calc(-0.278 * var(--circumference));
    }
    100% {
      stroke-dasharray: calc(0.716 * var(--circumference)), calc(1.194 * var(--circumference));
      stroke-dashoffset: calc(-0.987 * var(--circumference));
    }
  }
`,Qt=class extends L{constructor(){super(...arguments),this.localize=new Vt(this)}render(){return T`
      <svg
        part="base spinner"
        role="progressbar"
        aria-label=${this.localize.term(`loading`)}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle class="track" />
        <circle class="indicator" />
      </svg>
    `}};Qt.css=Zt,Qt=I([k(`wa-spinner`)],Qt);var $t=class extends Event{constructor(){super(`wa-error`,{bubbles:!0,cancelable:!1,composed:!0})}},en=class extends Event{constructor(){super(`wa-load`,{bubbles:!0,cancelable:!1,composed:!0})}},tn=p`
  :host {
    --primary-color: currentColor;
    --primary-opacity: 1;
    --secondary-color: currentColor;
    --secondary-opacity: 0.4;
    --rotate-angle: 0deg;

    box-sizing: content-box;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    vertical-align: -0.125em;
  }

  /* #region Canvas — the box the icon is centered within (mirrors Font Awesome's icon canvas). Orthogonal to font-size. */

  /* Fixed width (default): 1.25em × 1em (20 × 16px) */
  :host(:not([canvas])),
  :host([canvas='fixed']) {
    width: 1.25em;
    height: 1em;
    min-width: 1.25em; /* <-- this is what Safari respects for intrinsic */
    min-height: 1em;
  }

  /* Auto: hug the icon's width. \`auto-width\` is the deprecated alias for canvas="auto". */
  :host([canvas='auto']),
  :host([auto-width]:not([canvas])) {
    width: auto;
    height: 1em;
  }

  /* Square: 1.25em × 1.25em (20 × 20px) */
  :host([canvas='square']) {
    width: 1.25em;
    height: 1.25em;
    min-width: 1.25em;
    min-height: 1.25em;
  }

  /* Roomy: 1.5em × 1.5em (24 × 24px) */
  :host([canvas='roomy']) {
    width: 1.5em;
    height: 1.5em;
    min-width: 1.5em;
    min-height: 1.5em;
  }

  /* #endregion */

  svg {
    /* NOTE: Avoid setting fill here. A stylesheet rule beats SVG presentation attributes, breaking stroke-based
       libraries like Lucide (fill="none" stroke="currentColor") and attribute-based mutators (issue #1733). The default
       library applies fill="currentColor" in its mutator instead. */
    height: 1em;
    overflow: visible;
    width: auto;

    /* Duotone colors with path-specific opacity fallback */
    path[data-duotone-primary] {
      color: var(--primary-color);
      opacity: var(--path-opacity, var(--primary-opacity));
    }

    path[data-duotone-secondary] {
      color: var(--secondary-color);
      opacity: var(--path-opacity, var(--secondary-opacity));
    }
  }

  /* Rotation */
  :host([rotate]) {
    transform: rotate(var(--rotate-angle, 0deg));
  }

  /* Flipping */
  :host([flip='x']) {
    transform: scaleX(-1);
  }
  :host([flip='y']) {
    transform: scaleY(-1);
  }
  :host([flip='both']) {
    transform: scale(-1, -1);
  }

  /* Rotation and Flipping combined */
  :host([rotate][flip='x']) {
    transform: rotate(var(--rotate-angle, 0deg)) scaleX(-1);
  }
  :host([rotate][flip='y']) {
    transform: rotate(var(--rotate-angle, 0deg)) scaleY(-1);
  }
  :host([rotate][flip='both']) {
    transform: rotate(var(--rotate-angle, 0deg)) scale(-1, -1);
  }

  /* #region Animations — ported from Font Awesome 7.3 (--fa-* props mapped to wa-icon's --* names) */

  :host([animation='beat']) {
    animation-name: beat;
    animation-delay: var(--animation-delay, 0s);
    animation-direction: var(--animation-direction, normal);
    animation-duration: var(--animation-duration, 1s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, ease-in-out);
  }

  :host([animation='bounce']) {
    animation-name: bounce;
    animation-delay: var(--animation-delay, 0s);
    animation-direction: var(--animation-direction, normal);
    animation-duration: var(--animation-duration, 1s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, cubic-bezier(0.28, 0.84, 0.42, 1));
  }

  :host([animation='fade']) {
    animation-name: fade;
    animation-delay: var(--animation-delay, 0s);
    animation-direction: var(--animation-direction, normal);
    animation-duration: var(--animation-duration, 1s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, ease-in-out);
  }

  :host([animation='beat-fade']) {
    animation-name: beat-fade;
    animation-delay: var(--animation-delay, 0s);
    animation-direction: var(--animation-direction, normal);
    animation-duration: var(--animation-duration, 1s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, ease-in-out);
  }

  :host([animation='flip']) {
    animation-name: flip;
    animation-delay: var(--animation-delay, 0s);
    animation-direction: var(--animation-direction, normal);
    animation-duration: var(--animation-duration, 1.5s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, ease-in-out);
  }

  :host([animation='flip-360']) {
    animation-name: flip-360;
    animation-delay: var(--animation-delay, 0s);
    animation-direction: var(--animation-direction, normal);
    animation-duration: var(--animation-duration, 1s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, ease-in-out);
  }

  :host([animation='shake']) {
    animation-name: shake;
    animation-delay: var(--animation-delay, 0s);
    animation-direction: var(--animation-direction, normal);
    animation-duration: var(--animation-duration, 0.75s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, ease-in-out);
  }

  :host([animation='spin']) {
    animation-name: spin;
    animation-delay: var(--animation-delay, 0s);
    animation-direction: var(--animation-direction, normal);
    animation-duration: var(--animation-duration, 2s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, linear);
  }

  :host([animation='spin-pulse']) {
    animation-name: spin;
    animation-delay: var(--animation-delay, 0s);
    animation-direction: var(--animation-direction, normal);
    animation-duration: var(--animation-duration, 1s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, steps(8));
  }

  /* spin-reverse is FA's reverse modifier expressed as a standalone value; reverse any spin via --animation-direction: reverse */
  :host([animation='spin-reverse']) {
    animation-name: spin;
    animation-delay: var(--animation-delay, 0s);
    animation-direction: var(--animation-direction, reverse);
    animation-duration: var(--animation-duration, 2s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, linear);
  }

  :host([animation='spin-snap']) {
    animation-name: spin-snap;
    animation-delay: var(--animation-delay, 0s);
    animation-direction: var(--animation-direction, normal);
    animation-duration: var(--animation-duration, 3s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, linear);
  }

  :host([animation='spin-snap-4']) {
    animation-name: spin-snap-4;
    animation-delay: var(--animation-delay, 0s);
    animation-direction: var(--animation-direction, normal);
    animation-duration: var(--animation-duration, 2.4s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, linear);
  }

  :host([animation='spin-snap-8']) {
    animation-name: spin-snap-8;
    animation-delay: var(--animation-delay, 0s);
    animation-direction: var(--animation-direction, normal);
    animation-duration: var(--animation-duration, 4s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, linear);
  }

  :host([animation='buzz']) {
    animation-name: buzz;
    animation-delay: var(--animation-delay, 0s);
    animation-direction: var(--animation-direction, normal);
    animation-duration: var(--animation-duration, 0.6s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, linear);
  }

  :host([animation='wag']) {
    animation-name: wag;
    animation-delay: var(--animation-delay, 0s);
    animation-direction: var(--animation-direction, normal);
    animation-duration: var(--animation-duration, 0.9s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, ease-out);
    transform-origin: bottom center;
  }

  :host([animation='float']) {
    animation-name: float;
    animation-delay: var(--animation-delay, 0s);
    animation-direction: var(--animation-direction, normal);
    animation-duration: var(--animation-duration, 3s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, ease-in-out);
    will-change: transform;
  }

  :host([animation='swing']) {
    animation-name: swing;
    animation-delay: var(--animation-delay, 0s);
    animation-direction: var(--animation-direction, normal);
    animation-duration: var(--animation-duration, 1.2s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, ease-out);
    transform-origin: top center;
  }

  :host([animation='jello']) {
    animation-name: jello;
    animation-delay: var(--animation-delay, 0s);
    animation-direction: var(--animation-direction, normal);
    animation-duration: var(--animation-duration, 0.9s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, ease-out);
  }

  @media (prefers-reduced-motion: reduce) {
    :host([animation='beat']),
    :host([animation='bounce']),
    :host([animation='fade']),
    :host([animation='beat-fade']),
    :host([animation='flip']),
    :host([animation='flip-360']),
    :host([animation='shake']),
    :host([animation='spin']),
    :host([animation='spin-pulse']),
    :host([animation='spin-reverse']),
    :host([animation='spin-snap']),
    :host([animation='spin-snap-4']),
    :host([animation='spin-snap-8']),
    :host([animation='buzz']),
    :host([animation='wag']),
    :host([animation='float']),
    :host([animation='swing']),
    :host([animation='jello']) {
      animation: none !important;
      transition: none !important;
    }
  }

  /* #endregion */

  /* #region Keyframes — ported verbatim from Font Awesome 7.3 */

  @keyframes beat {
    0% {
      transform: scale(1);
    }
    25% {
      transform: scale(calc(1.25 * var(--beat-scale, 1.25)));
    }
    45% {
      transform: scale(calc(1.22 * var(--beat-scale, 1.22)));
    }
    65% {
      transform: scale(calc(1.25 * var(--beat-scale, 1.25)));
    }
    90% {
      transform: scale(1);
    }
  }

  @keyframes bounce {
    0% {
      transform: scale(1, 1) translateY(0);
      /* No fallback by design (ported from FA 7.3): the first segment uses the user's --animation-timing or the CSS
         initial ease, while the explicit cubic-beziers on later stops drive the bounce physics. */
      animation-timing-function: var(--animation-timing);
    }
    14% {
      transform: scale(var(--bounce-start-scale-x, 1.06), var(--bounce-start-scale-y, 0.94))
        translateY(var(--bounce-anticipation, 3px));
      animation-timing-function: cubic-bezier(0.33, 0, 0.66, 0.33);
    }
    32% {
      transform: scale(var(--bounce-jump-scale-x, 0.94), var(--bounce-jump-scale-y, 1.12))
        translateY(calc(-1 * var(--bounce-height, 0.5em)));
      animation-timing-function: cubic-bezier(0.33, 0.66, 0.66, 1);
    }
    52% {
      transform: scale(1, 1) translateY(calc(-1 * var(--bounce-height, 0.5em) * 1.1));
      animation-timing-function: cubic-bezier(0.5, 0, 1, 0.5);
    }
    70% {
      transform: scale(var(--bounce-land-scale-x, 1.06), var(--bounce-land-scale-y, 0.92)) translateY(0);
      animation-timing-function: cubic-bezier(0.33, 0.33, 0.66, 1);
    }
    85% {
      transform: scale(0.98, 1.04) translateY(calc(-2px * var(--bounce-rebound, 1)));
      animation-timing-function: cubic-bezier(0.33, 0, 0.66, 1);
    }
    100% {
      transform: scale(1, 1) translateY(0);
    }
  }

  @keyframes fade {
    0% {
      opacity: 1;
      transform: scale(1);
      animation-timing-function: cubic-bezier(0.2, 0, 0.4, 1);
    }
    40% {
      opacity: var(--fade-opacity, 0.4);
      transform: scale(0.98);
      animation-timing-function: cubic-bezier(0.4, 0, 0.6, 1);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes beat-fade {
    0% {
      opacity: var(--beat-fade-opacity, 0.4);
      transform: scale(1);
      animation-timing-function: cubic-bezier(0.2, 0, 0.4, 1);
    }
    25% {
      opacity: calc(var(--beat-fade-opacity, 0.4) + 0.4);
      transform: scale(var(--beat-fade-scale, 1.28));
      animation-timing-function: cubic-bezier(0.4, 0, 0.6, 1);
    }
    45% {
      opacity: 1;
      transform: scale(var(--beat-fade-scale, 1.25));
      animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    }
    65% {
      opacity: calc(var(--beat-fade-opacity, 0.4) + 0.4);
      transform: scale(var(--beat-fade-scale, 1.28));
      animation-timing-function: cubic-bezier(0.4, 0, 0.6, 1);
    }
    100% {
      opacity: var(--beat-fade-opacity, 0.4);
      transform: scale(1);
    }
  }

  @keyframes flip {
    0% {
      transform: perspective(2em) scale(1) rotate3d(var(--flip-x, 0), var(--flip-y, 1), var(--flip-z, 0), 0deg);
      animation-timing-function: cubic-bezier(0.2, 0, 0.4, 1);
    }
    8% {
      transform: perspective(2em) scale(var(--flip-anticipation-scale, 0.95))
        rotate3d(var(--flip-x, 0), var(--flip-y, 1), var(--flip-z, 0), 0deg);
      animation-timing-function: cubic-bezier(0.33, 0, 0.66, 0.33);
    }
    35% {
      transform: perspective(2em) scale(1)
        rotate3d(var(--flip-x, 0), var(--flip-y, 1), var(--flip-z, 0), calc(var(--flip-angle, -360deg) * 0.6));
      animation-timing-function: linear;
    }
    65% {
      transform: perspective(2em) scale(1)
        rotate3d(var(--flip-x, 0), var(--flip-y, 1), var(--flip-z, 0), calc(var(--flip-angle, -360deg) * 0.5));
      animation-timing-function: cubic-bezier(0.33, 0.66, 0.66, 1);
    }
    92% {
      transform: perspective(2em) scale(1)
        rotate3d(
          var(--flip-x, 0),
          var(--flip-y, 1),
          var(--flip-z, 0),
          calc(var(--flip-angle, -360deg) * var(--flip-overshoot, 1.04))
        );
      animation-timing-function: cubic-bezier(0.33, 0, 0.66, 1);
    }
    100% {
      transform: perspective(2em) scale(1)
        rotate3d(var(--flip-x, 0), var(--flip-y, 1), var(--flip-z, 0), var(--flip-angle, -360deg));
    }
  }

  @keyframes flip-360 {
    0% {
      transform: perspective(2em) scale(1) rotate3d(var(--flip-x, 0), var(--flip-y, 1), var(--flip-z, 0), 0deg);
      animation-timing-function: cubic-bezier(0.2, 0, 0.4, 1);
    }
    8% {
      transform: perspective(2em) scale(var(--flip-anticipation-scale, 0.95))
        rotate3d(var(--flip-x, 0), var(--flip-y, 1), var(--flip-z, 0), 0deg);
      animation-timing-function: cubic-bezier(0.33, 0, 0.66, 0.33);
    }
    50% {
      transform: perspective(2em) scale(1)
        rotate3d(var(--flip-x, 0), var(--flip-y, 1), var(--flip-z, 0), calc(var(--flip-angle, -360deg) * 0.6));
      animation-timing-function: cubic-bezier(0.33, 0.66, 0.66, 1);
    }
    80% {
      transform: perspective(2em) scale(1)
        rotate3d(
          var(--flip-x, 0),
          var(--flip-y, 1),
          var(--flip-z, 0),
          calc(var(--flip-angle, -360deg) * var(--flip-overshoot, 1.04))
        );
      animation-timing-function: cubic-bezier(0.33, 0, 0.66, 1);
    }
    100% {
      transform: perspective(2em) scale(1)
        rotate3d(var(--flip-x, 0), var(--flip-y, 1), var(--flip-z, 0), var(--flip-angle, -360deg));
    }
  }

  @keyframes shake {
    0% {
      transform: rotate(0deg);
      animation-timing-function: cubic-bezier(0.2, 0, 0.8, 1);
    }
    8% {
      transform: rotate(35deg) translateX(1px);
      animation-timing-function: cubic-bezier(0.3, 0, 0.7, 1);
    }
    20% {
      transform: rotate(-22deg) translateX(-1px);
      animation-timing-function: cubic-bezier(0.3, 0, 0.7, 1);
    }
    35% {
      transform: rotate(15deg) translateX(1px);
      animation-timing-function: cubic-bezier(0.3, 0, 0.7, 1);
    }
    50% {
      transform: rotate(-9deg);
      animation-timing-function: cubic-bezier(0.4, 0, 0.6, 1);
    }
    65% {
      transform: rotate(5deg);
      animation-timing-function: cubic-bezier(0.4, 0, 0.6, 1);
    }
    78% {
      transform: rotate(-3deg);
      animation-timing-function: cubic-bezier(0.4, 0, 0.6, 1);
    }
    90% {
      transform: rotate(1deg);
      animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    }
    100% {
      transform: rotate(0deg);
    }
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes spin-snap {
    0% {
      transform: rotate(0deg);
      animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    }
    12% {
      transform: rotate(60deg);
      animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
    }
    16.67% {
      transform: rotate(60deg);
      animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    }
    28.67% {
      transform: rotate(120deg);
      animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
    }
    33.33% {
      transform: rotate(120deg);
      animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    }
    45.33% {
      transform: rotate(180deg);
      animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
    }
    50% {
      transform: rotate(180deg);
      animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    }
    62% {
      transform: rotate(240deg);
      animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
    }
    66.67% {
      transform: rotate(240deg);
      animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    }
    78.67% {
      transform: rotate(300deg);
      animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
    }
    83.33% {
      transform: rotate(300deg);
      animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    }
    95.33% {
      transform: rotate(360deg);
      animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes spin-snap-4 {
    0% {
      transform: rotate(0deg);
      animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    }
    15% {
      transform: rotate(90deg);
      animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
    }
    25% {
      transform: rotate(90deg);
      animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    }
    40% {
      transform: rotate(180deg);
      animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
    }
    50% {
      transform: rotate(180deg);
      animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    }
    65% {
      transform: rotate(270deg);
      animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
    }
    75% {
      transform: rotate(270deg);
      animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    }
    90% {
      transform: rotate(360deg);
      animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes spin-snap-8 {
    0% {
      transform: rotate(0deg);
      animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    }
    9% {
      transform: rotate(45deg);
      animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
    }
    12.5% {
      transform: rotate(45deg);
      animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    }
    21.5% {
      transform: rotate(90deg);
      animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
    }
    25% {
      transform: rotate(90deg);
      animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    }
    34% {
      transform: rotate(135deg);
      animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
    }
    37.5% {
      transform: rotate(135deg);
      animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    }
    46.5% {
      transform: rotate(180deg);
      animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
    }
    50% {
      transform: rotate(180deg);
      animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    }
    59% {
      transform: rotate(225deg);
      animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
    }
    62.5% {
      transform: rotate(225deg);
      animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    }
    71.5% {
      transform: rotate(270deg);
      animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
    }
    75% {
      transform: rotate(270deg);
      animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    }
    84% {
      transform: rotate(315deg);
      animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
    }
    87.5% {
      transform: rotate(315deg);
      animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    }
    96.5% {
      transform: rotate(360deg);
      animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes buzz {
    0% {
      transform: translateX(0) rotate(0deg);
      animation-timing-function: cubic-bezier(0.1, 0, 0.9, 1);
    }
    5% {
      transform: translateX(var(--buzz-distance, 4px)) rotate(0.5deg);
    }
    10% {
      transform: translateX(calc(-1 * var(--buzz-distance, 4px))) rotate(-0.5deg);
    }
    15% {
      transform: translateX(var(--buzz-distance, 4px)) rotate(0.3deg);
    }
    20% {
      transform: translateX(calc(-1 * var(--buzz-distance, 4px))) rotate(-0.3deg);
    }
    25% {
      transform: translateX(calc(var(--buzz-distance, 4px) * 0.7)) rotate(0.2deg);
    }
    30% {
      transform: translateX(calc(-1 * var(--buzz-distance, 4px) * 0.7)) rotate(-0.2deg);
    }
    35% {
      transform: translateX(calc(var(--buzz-distance, 4px) * 0.4)) rotate(0.1deg);
    }
    40% {
      transform: translateX(0) rotate(0deg);
    }
    100% {
      transform: translateX(0) rotate(0deg);
    }
  }

  @keyframes wag {
    0% {
      transform: rotate(0deg);
      animation-timing-function: cubic-bezier(0.2, 0, 0.6, 1);
    }
    12% {
      transform: rotate(var(--wag-angle, 12deg));
      animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    }
    24% {
      transform: rotate(2deg);
      animation-timing-function: cubic-bezier(0.2, 0, 0.6, 1);
    }
    36% {
      transform: rotate(calc(var(--wag-angle, 12deg) * 0.85));
      animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    }
    48% {
      transform: rotate(1deg);
      animation-timing-function: cubic-bezier(0.2, 0, 0.6, 1);
    }
    58% {
      transform: rotate(calc(var(--wag-angle, 12deg) * 0.6));
      animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    }
    68% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(0deg);
    }
  }

  @keyframes float {
    0% {
      transform: translateY(0) translateX(0) rotate(0deg)
        scale(var(--float-squash-x, 1.02), var(--float-squash-y, 0.98));
      animation-timing-function: cubic-bezier(0.33, 0, 0.66, 0.33);
    }
    15% {
      transform: translateY(calc(-0.4 * var(--float-height, 6px))) translateX(var(--float-drift, 1px))
        rotate(var(--float-tilt, 1deg)) scale(1, 1);
      animation-timing-function: cubic-bezier(0.33, 0.66, 0.66, 1);
    }
    35% {
      transform: translateY(calc(-1 * var(--float-height, 6px))) translateX(0) rotate(0deg)
        scale(var(--float-stretch-x, 0.98), var(--float-stretch-y, 1.03));
      animation-timing-function: cubic-bezier(0.5, 0, 0.5, 0);
    }
    50% {
      transform: translateY(calc(-0.92 * var(--float-height, 6px))) translateX(calc(-0.5 * var(--float-drift, 1px)))
        rotate(calc(-0.5 * var(--float-tilt, 1deg))) scale(0.995, 1.01);
      animation-timing-function: cubic-bezier(0.33, 0, 0.66, 0.33);
    }
    70% {
      transform: translateY(calc(-0.3 * var(--float-height, 6px))) translateX(calc(-1 * var(--float-drift, 1px)))
        rotate(calc(-1 * var(--float-tilt, 1deg))) scale(1, 1);
      animation-timing-function: cubic-bezier(0.33, 0.66, 0.66, 1);
    }
    90% {
      transform: translateY(calc(0.05 * var(--float-height, 6px))) translateX(0) rotate(0deg)
        scale(var(--float-squash-x, 1.02), var(--float-squash-y, 0.98));
      animation-timing-function: cubic-bezier(0.33, 0, 0.66, 1);
    }
    100% {
      transform: translateY(0) translateX(0) rotate(0deg)
        scale(var(--float-squash-x, 1.02), var(--float-squash-y, 0.98));
    }
  }

  @keyframes swing {
    0% {
      transform: rotate(0deg);
      animation-timing-function: cubic-bezier(0.2, 0, 0.8, 1);
    }
    8% {
      transform: rotate(var(--swing-angle, 22deg));
      animation-timing-function: cubic-bezier(0.3, 0, 0.7, 1);
    }
    18% {
      transform: rotate(calc(-1 * var(--swing-angle, 22deg) * 0.85));
      animation-timing-function: cubic-bezier(0.3, 0, 0.7, 1);
    }
    28% {
      transform: rotate(calc(var(--swing-angle, 22deg) * 0.65));
      animation-timing-function: cubic-bezier(0.35, 0, 0.65, 1);
    }
    38% {
      transform: rotate(calc(-1 * var(--swing-angle, 22deg) * 0.45));
      animation-timing-function: cubic-bezier(0.4, 0, 0.6, 1);
    }
    48% {
      transform: rotate(calc(var(--swing-angle, 22deg) * 0.25));
      animation-timing-function: cubic-bezier(0.4, 0, 0.6, 1);
    }
    56% {
      transform: rotate(calc(-1 * var(--swing-angle, 22deg) * 0.1));
      animation-timing-function: cubic-bezier(0.4, 0, 0.6, 1);
    }
    64% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(0deg);
    }
  }

  @keyframes jello {
    0% {
      transform: scale(1, 1);
      animation-timing-function: cubic-bezier(0.2, 0, 0.8, 1);
    }
    12% {
      transform: scale(var(--jello-scale-x, 1.15), calc(2 - var(--jello-scale-x, 1.15)));
      animation-timing-function: cubic-bezier(0.3, 0, 0.7, 1);
    }
    24% {
      transform: scale(calc(2 - var(--jello-scale-y, 1.12)), var(--jello-scale-y, 1.12));
      animation-timing-function: cubic-bezier(0.3, 0, 0.7, 1);
    }
    36% {
      transform: scale(
        calc(1 + (var(--jello-scale-x, 1.15) - 1) * 0.5),
        calc(2 - (1 + (var(--jello-scale-x, 1.15) - 1) * 0.5))
      );
      animation-timing-function: cubic-bezier(0.4, 0, 0.6, 1);
    }
    48% {
      transform: scale(
        calc(2 - (1 + (var(--jello-scale-y, 1.12) - 1) * 0.3)),
        calc(1 + (var(--jello-scale-y, 1.12) - 1) * 0.3)
      );
      animation-timing-function: cubic-bezier(0.4, 0, 0.6, 1);
    }
    58% {
      transform: scale(1.02, 0.98);
      animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    }
    68% {
      transform: scale(1, 1);
    }
    100% {
      transform: scale(1, 1);
    }
  }

  /* #endregion */
`,nn=``,rn=``;function an(){return nn.replace(/\/$/,``)}function on(e){rn=e}function sn(){if(!rn){let e=document.querySelector(`[data-fa-kit-code]`);e&&on(e.getAttribute(`data-fa-kit-code`)||``)}return rn}var cn=`7.3.0`;function ln(e,t,n){let r=`solid`;return t===`chisel`&&(r=`chisel-regular`),t===`etch`&&(r=`etch-solid`),t===`graphite`&&(r=`graphite-thin`),t===`jelly`&&(r=`jelly-regular`,n===`duo-regular`&&(r=`jelly-duo-regular`),n===`fill-regular`&&(r=`jelly-fill-regular`)),t===`jelly-duo`&&(r=`jelly-duo-regular`),t===`jelly-fill`&&(r=`jelly-fill-regular`),t===`notdog`&&(n===`solid`&&(r=`notdog-solid`),n===`duo-solid`&&(r=`notdog-duo-solid`)),t===`notdog-duo`&&(r=`notdog-duo-solid`),t===`slab`&&((n===`solid`||n===`regular`)&&(r=`slab-regular`),n===`press-regular`&&(r=`slab-press-regular`)),t===`slab-press`&&(r=`slab-press-regular`),t===`slab-duo`&&(r=`slab-duo-regular`),t===`slab-press-duo`&&(r=`slab-press-duo-regular`),t===`thumbprint`&&(r=`thumbprint-light`),t===`utility`&&(r=`utility-semibold`),t===`utility-duo`&&(r=`utility-duo-semibold`),t===`utility-fill`&&(r=`utility-fill-semibold`),t===`whiteboard`&&(r=`whiteboard-semibold`),t===`mosaic`&&(r=`mosaic-solid`),t===`pixel`&&(r=`pixel-regular`),t===`vellum`&&(r=`vellum-solid`),t===`classic`&&(n===`thin`&&(r=`thin`),n===`light`&&(r=`light`),n===`regular`&&(r=`regular`),n===`solid`&&(r=`solid`)),t===`duotone`&&(n===`thin`&&(r=`duotone-thin`),n===`light`&&(r=`duotone-light`),n===`regular`&&(r=`duotone-regular`),n===`solid`&&(r=`duotone`)),t===`sharp`&&(n===`thin`&&(r=`sharp-thin`),n===`light`&&(r=`sharp-light`),n===`regular`&&(r=`sharp-regular`),n===`solid`&&(r=`sharp-solid`)),t===`sharp-duotone`&&(n===`thin`&&(r=`sharp-duotone-thin`),n===`light`&&(r=`sharp-duotone-light`),n===`regular`&&(r=`sharp-duotone-regular`),n===`solid`&&(r=`sharp-duotone-solid`)),t===`brands`&&(r=`brands`),r}function un(e,t,n){let r=ln(e,t,n),i=an();if(i)return`${i}/${r}/${e}.svg`;let a=sn();return a.length>0?`https://ka-p.fontawesome.com/releases/v${cn}/svgs/${r}/${e}.svg?token=${encodeURIComponent(a)}`:`https://ka-f.fontawesome.com/releases/v${cn}/svgs/${r}/${e}.svg`}var dn={name:`default`,resolver:(e,t=`classic`,n=`solid`)=>un(e,t,n),mutator:(e,t)=>{if(e.hasAttribute(`fill`)||e.setAttribute(`fill`,`currentColor`),t?.family&&!e.hasAttribute(`data-duotone-initialized`)){let{family:n,variant:r}=t;if(n===`duotone`||n===`sharp-duotone`||n===`notdog-duo`||n===`notdog`&&r===`duo-solid`||n===`jelly-duo`||n===`jelly`&&r===`duo-regular`||n===`utility-duo`||n===`slab-duo`||n===`slab-press-duo`||n===`thumbprint`){let n=[...e.querySelectorAll(`path`)],r=n.find(e=>!e.hasAttribute(`opacity`)),i=n.find(e=>e.hasAttribute(`opacity`));if(!r||!i)return;if(r.setAttribute(`data-duotone-primary`,``),i.setAttribute(`data-duotone-secondary`,``),t.swapOpacity&&r&&i){let e=i.getAttribute(`opacity`)||`0.4`;r.style.setProperty(`--path-opacity`,e),i.style.setProperty(`--path-opacity`,`1`)}e.setAttribute(`data-duotone-initialized`,``)}}}};function fn(e){return`data:image/svg+xml,${encodeURIComponent(e)}`}var pn={solid:{backward:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M236.3 107.1C247.9 96 265 92.9 279.7 99.2C294.4 105.5 304 120 304 136L304 272.3L476.3 107.2C487.9 96 505 92.9 519.7 99.2C534.4 105.5 544 120 544 136L544 504C544 520 534.4 534.5 519.7 540.8C505 547.1 487.9 544 476.3 532.9L304 367.7L304 504C304 520 294.4 534.5 279.7 540.8C265 547.1 247.9 544 236.3 532.9L44.3 348.9C36.5 341.3 32 330.9 32 320C32 309.1 36.5 298.7 44.3 291.1L236.3 107.1z"/></svg>`,"backward-step":`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M491 100.8C478.1 93.8 462.3 94.5 450 102.6L192 272.1L192 128C192 110.3 177.7 96 160 96C142.3 96 128 110.3 128 128L128 512C128 529.7 142.3 544 160 544C177.7 544 192 529.7 192 512L192 367.9L450 537.5C462.3 545.6 478 546.3 491 539.3C504 532.3 512 518.8 512 504.1L512 136.1C512 121.4 503.9 107.9 491 100.9z"/></svg>`,"angles-left":`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path d="M77.3 256 214.7 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256zm192 0L406.7 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L269.3 256z"/></svg>`,"angles-right":`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path d="M434.7 256 297.3 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L434.7 256zm-192 0L105.3 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256z"/></svg>`,check:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path d="M434.8 70.1c14.3 10.4 17.5 30.4 7.1 44.7l-256 352c-5.5 7.6-14 12.3-23.4 13.1s-18.5-2.7-25.1-9.3l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l101.5 101.5 234-321.7c10.4-14.3 30.4-17.5 44.7-7.1z"/></svg>`,"chevron-down":`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path d="M201.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 338.7 54.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/></svg>`,"chevron-left":`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"/></svg>`,"chevron-right":`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path d="M311.1 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L243.2 256 73.9 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>`,circle:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path d="M0 256a256 256 0 1 1 512 0 256 256 0 1 1 -512 0z"/></svg>`,"closed-captioning":`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M64 192C64 156.7 92.7 128 128 128L512 128C547.3 128 576 156.7 576 192L576 448C576 483.3 547.3 512 512 512L128 512C92.7 512 64 483.3 64 448L64 192zM216 272L248 272C252.4 272 256 275.6 256 280C256 293.3 266.7 304 280 304C293.3 304 304 293.3 304 280C304 249.1 278.9 224 248 224L216 224C185.1 224 160 249.1 160 280L160 360C160 390.9 185.1 416 216 416L248 416C278.9 416 304 390.9 304 360C304 346.7 293.3 336 280 336C266.7 336 256 346.7 256 360C256 364.4 252.4 368 248 368L216 368C211.6 368 208 364.4 208 360L208 280C208 275.6 211.6 272 216 272zM384 280C384 275.6 387.6 272 392 272L424 272C428.4 272 432 275.6 432 280C432 293.3 442.7 304 456 304C469.3 304 480 293.3 480 280C480 249.1 454.9 224 424 224L392 224C361.1 224 336 249.1 336 280L336 360C336 390.9 361.1 416 392 416L424 416C454.9 416 480 390.9 480 360C480 346.7 469.3 336 456 336C442.7 336 432 346.7 432 360C432 364.4 428.4 368 424 368L392 368C387.6 368 384 364.4 384 360L384 280z"/></svg>`,"closed-captioning-slash":`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M39 39.1C48.4 29.7 63.6 29.7 72.9 39.1L161.8 128L512 128C547.3 128 576 156.7 576 192L576 448C576 473.5 561.1 495.4 539.6 505.8L601 567.1C610.4 576.5 610.4 591.7 601 601C591.6 610.3 576.4 610.4 567.1 601L39 73.1C29.7 63.7 29.7 48.5 39 39.1zM384 350.1L384 279.9C384 275.5 387.6 271.9 392 271.9L424 271.9C428.4 271.9 432 275.5 432 279.9C432 293.2 442.7 303.9 456 303.9C469.3 303.9 480 293.2 480 279.9C480 249 454.9 223.9 424 223.9L392 223.9C361.1 223.9 336 249 336 279.9L336 302.1L384 350.1zM445.5 411.6C465.7 403.2 480 383.2 480 359.9C480 346.6 469.3 335.9 456 335.9C442.7 335.9 432 346.6 432 359.9C432 364.3 428.4 367.9 424 367.9L401.8 367.9L445.5 411.6zM162.3 264.1C160.8 269.1 160 274.5 160 280L160 360C160 390.9 185.1 416 216 416L248 416C266.1 416 282.1 407.5 292.4 394.2L410.2 512L128 512C92.7 512 64 483.3 64 448L64 192C64 184.2 65.4 176.7 68 169.8L162.3 264.1zM256.1 357.9C256 358.6 256 359.3 256 360C256 364.4 252.4 368 248 368L216 368C211.6 368 208 364.4 208 360L208 309.8L256.1 357.9z"/></svg>`,compress:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M160 64c0-17.7-14.3-32-32-32S96 46.3 96 64l0 64-64 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l96 0c17.7 0 32-14.3 32-32l0-96zM32 320c-17.7 0-32 14.3-32 32s14.3 32 32 32l64 0 0 64c0 17.7 14.3 32 32 32s32-14.3 32-32l0-96c0-17.7-14.3-32-32-32l-96 0zM352 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 96c0 17.7 14.3 32 32 32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0 0-64zM320 320c-17.7 0-32 14.3-32 32l0 96c0 17.7 14.3 32 32 32s32-14.3 32-32l0-64 64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0z"/></svg>`,ellipsis:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M96 320C96 289.1 121.1 264 152 264C182.9 264 208 289.1 208 320C208 350.9 182.9 376 152 376C121.1 376 96 350.9 96 320zM264 320C264 289.1 289.1 264 320 264C350.9 264 376 289.1 376 320C376 350.9 350.9 376 320 376C289.1 376 264 350.9 264 320zM488 264C518.9 264 544 289.1 544 320C544 350.9 518.9 376 488 376C457.1 376 432 350.9 432 320C432 289.1 457.1 264 488 264z"/></svg>`,"ellipsis-vertical":`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M320 208C289.1 208 264 182.9 264 152C264 121.1 289.1 96 320 96C350.9 96 376 121.1 376 152C376 182.9 350.9 208 320 208zM320 432C350.9 432 376 457.1 376 488C376 518.9 350.9 544 320 544C289.1 544 264 518.9 264 488C264 457.1 289.1 432 320 432zM376 320C376 350.9 350.9 376 320 376C289.1 376 264 350.9 264 320C264 289.1 289.1 264 320 264C350.9 264 376 289.1 376 320z"/></svg>`,expand:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M128 96C110.3 96 96 110.3 96 128L96 224C96 241.7 110.3 256 128 256C145.7 256 160 241.7 160 224L160 160L224 160C241.7 160 256 145.7 256 128C256 110.3 241.7 96 224 96L128 96zM160 416C160 398.3 145.7 384 128 384C110.3 384 96 398.3 96 416L96 512C96 529.7 110.3 544 128 544L224 544C241.7 544 256 529.7 256 512C256 494.3 241.7 480 224 480L160 480L160 416zM416 96C398.3 96 384 110.3 384 128C384 145.7 398.3 160 416 160L480 160L480 224C480 241.7 494.3 256 512 256C529.7 256 544 241.7 544 224L544 128C544 110.3 529.7 96 512 96L416 96zM544 416C544 398.3 529.7 384 512 384C494.3 384 480 398.3 480 416L480 480L416 480C398.3 480 384 494.3 384 512C384 529.7 398.3 544 416 544L512 544C529.7 544 544 529.7 544 512L544 416z"/></svg>`,eyedropper:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path d="M341.6 29.2l-101.6 101.6-9.4-9.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-9.4-9.4 101.6-101.6c39-39 39-102.2 0-141.1s-102.2-39-141.1 0zM55.4 323.3c-15 15-23.4 35.4-23.4 56.6l0 42.4-26.6 39.9c-8.5 12.7-6.8 29.6 4 40.4s27.7 12.5 40.4 4l39.9-26.6 42.4 0c21.2 0 41.6-8.4 56.6-23.4l109.4-109.4-45.3-45.3-109.4 109.4c-3 3-7.1 4.7-11.3 4.7l-36.1 0 0-36.1c0-4.2 1.7-8.3 4.7-11.3l109.4-109.4-45.3-45.3-109.4 109.4z"/></svg>`,forward:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M403.7 107.1C392.1 96 375 92.9 360.3 99.2C345.6 105.5 336 120 336 136L336 272.3L163.7 107.2C152.1 96 135 92.9 120.3 99.2C105.6 105.5 96 120 96 136L96 504C96 520 105.6 534.5 120.3 540.8C135 547.1 152.1 544 163.7 532.9L336 367.7L336 504C336 520 345.6 534.5 360.3 540.8C375 547.1 392.1 544 403.7 532.9L595.7 348.9C603.6 341.4 608 330.9 608 320C608 309.1 603.5 298.7 595.7 291.1L403.7 107.1z"/></svg>`,file:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M192 64C156.7 64 128 92.7 128 128L128 512C128 547.3 156.7 576 192 576L448 576C483.3 576 512 547.3 512 512L512 234.5C512 217.5 505.3 201.2 493.3 189.2L386.7 82.7C374.7 70.7 358.5 64 341.5 64L192 64zM453.5 240L360 240C346.7 240 336 229.3 336 216L336 122.5L453.5 240z"/></svg>`,"file-audio":`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M128 128C128 92.7 156.7 64 192 64L341.5 64C358.5 64 374.8 70.7 386.8 82.7L493.3 189.3C505.3 201.3 512 217.6 512 234.6L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128zM336 122.5L336 216C336 229.3 346.7 240 360 240L453.5 240L336 122.5zM389.8 307.7C380.7 301.4 368.3 303.6 362 312.7C355.7 321.8 357.9 334.2 367 340.5C390.9 357.2 406.4 384.8 406.4 416C406.4 447.2 390.8 474.9 367 491.5C357.9 497.8 355.7 510.3 362 519.3C368.3 528.3 380.8 530.6 389.8 524.3C423.9 500.5 446.4 460.8 446.4 416C446.4 371.2 424 331.5 389.8 307.7zM208 376C199.2 376 192 383.2 192 392L192 440C192 448.8 199.2 456 208 456L232 456L259.2 490C262.2 493.8 266.8 496 271.7 496L272 496C280.8 496 288 488.8 288 480L288 352C288 343.2 280.8 336 272 336L271.7 336C266.8 336 262.2 338.2 259.2 342L232 376L208 376zM336 448.2C336 458.9 346.5 466.4 354.9 459.8C367.8 449.5 376 433.7 376 416C376 398.3 367.8 382.5 354.9 372.2C346.5 365.5 336 373.1 336 383.8L336 448.3z"/></svg>`,"file-code":`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M128 128C128 92.7 156.7 64 192 64L341.5 64C358.5 64 374.8 70.7 386.8 82.7L493.3 189.3C505.3 201.3 512 217.6 512 234.6L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128zM336 122.5L336 216C336 229.3 346.7 240 360 240L453.5 240L336 122.5zM282.2 359.6C290.8 349.5 289.7 334.4 279.6 325.8C269.5 317.2 254.4 318.3 245.8 328.4L197.8 384.4C190.1 393.4 190.1 406.6 197.8 415.6L245.8 471.6C254.4 481.7 269.6 482.8 279.6 474.2C289.6 465.6 290.8 450.4 282.2 440.4L247.6 400L282.2 359.6zM394.2 328.4C385.6 318.3 370.4 317.2 360.4 325.8C350.4 334.4 349.2 349.6 357.8 359.6L392.4 400L357.8 440.4C349.2 450.5 350.3 465.6 360.4 474.2C370.5 482.8 385.6 481.7 394.2 471.6L442.2 415.6C449.9 406.6 449.9 393.4 442.2 384.4L394.2 328.4z"/></svg>`,"file-excel":`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M128 128C128 92.7 156.7 64 192 64L341.5 64C358.5 64 374.8 70.7 386.8 82.7L493.3 189.3C505.3 201.3 512 217.6 512 234.6L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128zM336 122.5L336 216C336 229.3 346.7 240 360 240L453.5 240L336 122.5zM292 330.7C284.6 319.7 269.7 316.7 258.7 324C247.7 331.3 244.7 346.3 252 357.3L291.2 416L252 474.7C244.6 485.7 247.6 500.6 258.7 508C269.8 515.4 284.6 512.4 292 501.3L320 459.3L348 501.3C355.4 512.3 370.3 515.3 381.3 508C392.3 500.7 395.3 485.7 388 474.7L348.8 416L388 357.3C395.4 346.3 392.4 331.4 381.3 324C370.2 316.6 355.4 319.6 348 330.7L320 372.7L292 330.7z"/></svg>`,"file-image":`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M128 128C128 92.7 156.7 64 192 64L341.5 64C358.5 64 374.8 70.7 386.8 82.7L493.3 189.3C505.3 201.3 512 217.6 512 234.6L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128zM336 122.5L336 216C336 229.3 346.7 240 360 240L453.5 240L336 122.5zM256 320C256 302.3 241.7 288 224 288C206.3 288 192 302.3 192 320C192 337.7 206.3 352 224 352C241.7 352 256 337.7 256 320zM220.6 512L419.4 512C435.2 512 448 499.2 448 483.4C448 476.1 445.2 469 440.1 463.7L343.3 361.9C337.3 355.6 328.9 352 320.1 352L319.8 352C311 352 302.7 355.6 296.6 361.9L199.9 463.7C194.8 469 192 476.1 192 483.4C192 499.2 204.8 512 220.6 512z"/></svg>`,"file-pdf":`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M128 64C92.7 64 64 92.7 64 128L64 512C64 547.3 92.7 576 128 576L208 576L208 464C208 428.7 236.7 400 272 400L448 400L448 234.5C448 217.5 441.3 201.2 429.3 189.2L322.7 82.7C310.7 70.7 294.5 64 277.5 64L128 64zM389.5 240L296 240C282.7 240 272 229.3 272 216L272 122.5L389.5 240zM272 444C261 444 252 453 252 464L252 592C252 603 261 612 272 612C283 612 292 603 292 592L292 564L304 564C337.1 564 364 537.1 364 504C364 470.9 337.1 444 304 444L272 444zM304 524L292 524L292 484L304 484C315 484 324 493 324 504C324 515 315 524 304 524zM400 444C389 444 380 453 380 464L380 592C380 603 389 612 400 612L432 612C460.7 612 484 588.7 484 560L484 496C484 467.3 460.7 444 432 444L400 444zM420 572L420 484L432 484C438.6 484 444 489.4 444 496L444 560C444 566.6 438.6 572 432 572L420 572zM508 464L508 592C508 603 517 612 528 612C539 612 548 603 548 592L548 548L576 548C587 548 596 539 596 528C596 517 587 508 576 508L548 508L548 484L576 484C587 484 596 475 596 464C596 453 587 444 576 444L528 444C517 444 508 453 508 464z"/></svg>`,"file-powerpoint":`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M128 128C128 92.7 156.7 64 192 64L341.5 64C358.5 64 374.8 70.7 386.8 82.7L493.3 189.3C505.3 201.3 512 217.6 512 234.6L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128zM336 122.5L336 216C336 229.3 346.7 240 360 240L453.5 240L336 122.5zM280 320C266.7 320 256 330.7 256 344L256 488C256 501.3 266.7 512 280 512C293.3 512 304 501.3 304 488L304 464L328 464C367.8 464 400 431.8 400 392C400 352.2 367.8 320 328 320L280 320zM328 416L304 416L304 368L328 368C341.3 368 352 378.7 352 392C352 405.3 341.3 416 328 416z"/></svg>`,"file-video":`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M128 128C128 92.7 156.7 64 192 64L341.5 64C358.5 64 374.8 70.7 386.8 82.7L493.3 189.3C505.3 201.3 512 217.6 512 234.6L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128zM336 122.5L336 216C336 229.3 346.7 240 360 240L453.5 240L336 122.5zM208 368L208 464C208 481.7 222.3 496 240 496L336 496C353.7 496 368 481.7 368 464L368 440L403 475C406.2 478.2 410.5 480 415 480C424.4 480 432 472.4 432 463L432 368.9C432 359.5 424.4 351.9 415 351.9C410.5 351.9 406.2 353.7 403 356.9L368 391.9L368 367.9C368 350.2 353.7 335.9 336 335.9L240 335.9C222.3 335.9 208 350.2 208 367.9z"/></svg>`,"file-word":`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M128 128C128 92.7 156.7 64 192 64L341.5 64C358.5 64 374.8 70.7 386.8 82.7L493.3 189.3C505.3 201.3 512 217.6 512 234.6L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128zM336 122.5L336 216C336 229.3 346.7 240 360 240L453.5 240L336 122.5zM263.4 338.8C260.5 325.9 247.7 317.7 234.8 320.6C221.9 323.5 213.7 336.3 216.6 349.2L248.6 493.2C250.9 503.7 260 511.4 270.8 512C281.6 512.6 291.4 505.9 294.8 495.6L320 419.9L345.2 495.6C348.6 505.8 358.4 512.5 369.2 512C380 511.5 389.1 503.8 391.4 493.2L423.4 349.2C426.3 336.3 418.1 323.4 405.2 320.6C392.3 317.8 379.4 325.9 376.6 338.8L363.4 398.2L342.8 336.4C339.5 326.6 330.4 320 320 320C309.6 320 300.5 326.6 297.2 336.4L276.6 398.2L263.4 338.8z"/></svg>`,"file-zipper":`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M128 128C128 92.7 156.7 64 192 64L341.5 64C358.5 64 374.8 70.7 386.8 82.7L493.3 189.3C505.3 201.3 512 217.6 512 234.6L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128zM336 122.5L336 216C336 229.3 346.7 240 360 240L453.5 240L336 122.5zM192 136C192 149.3 202.7 160 216 160L264 160C277.3 160 288 149.3 288 136C288 122.7 277.3 112 264 112L216 112C202.7 112 192 122.7 192 136zM192 232C192 245.3 202.7 256 216 256L264 256C277.3 256 288 245.3 288 232C288 218.7 277.3 208 264 208L216 208C202.7 208 192 218.7 192 232zM256 304L224 304C206.3 304 192 318.3 192 336L192 384C192 410.5 213.5 432 240 432C266.5 432 288 410.5 288 384L288 336C288 318.3 273.7 304 256 304zM240 368C248.8 368 256 375.2 256 384C256 392.8 248.8 400 240 400C231.2 400 224 392.8 224 384C224 375.2 231.2 368 240 368z"/></svg>`,"forward-step":`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M21 36.8c12.9-7 28.7-6.3 41 1.8L320 208.1 320 64c0-17.7 14.3-32 32-32s32 14.3 32 32l0 384c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-144.1-258 169.6c-12.3 8.1-28 8.8-41 1.8S0 454.7 0 440L0 72C0 57.3 8.1 43.8 21 36.8z"/></svg>`,gauge:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M0 256a256 256 0 1 1 512 0 256 256 0 1 1 -512 0zm320 96c0-26.9-16.5-49.9-40-59.3L280 120c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 172.7c-23.5 9.5-40 32.5-40 59.3 0 35.3 28.7 64 64 64s64-28.7 64-64zM144 176a32 32 0 1 0 0-64 32 32 0 1 0 0 64zm-16 80a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm288 32a32 32 0 1 0 0-64 32 32 0 1 0 0 64zM400 144a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"/></svg>`,gear:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M259.1 73.5C262.1 58.7 275.2 48 290.4 48L350.2 48C365.4 48 378.5 58.7 381.5 73.5L396 143.5C410.1 149.5 423.3 157.2 435.3 166.3L503.1 143.8C517.5 139 533.3 145 540.9 158.2L570.8 210C578.4 223.2 575.7 239.8 564.3 249.9L511 297.3C511.9 304.7 512.3 312.3 512.3 320C512.3 327.7 511.8 335.3 511 342.7L564.4 390.2C575.8 400.3 578.4 417 570.9 430.1L541 481.9C533.4 495 517.6 501.1 503.2 496.3L435.4 473.8C423.3 482.9 410.1 490.5 396.1 496.6L381.7 566.5C378.6 581.4 365.5 592 350.4 592L290.6 592C275.4 592 262.3 581.3 259.3 566.5L244.9 496.6C230.8 490.6 217.7 482.9 205.6 473.8L137.5 496.3C123.1 501.1 107.3 495.1 99.7 481.9L69.8 430.1C62.2 416.9 64.9 400.3 76.3 390.2L129.7 342.7C128.8 335.3 128.4 327.7 128.4 320C128.4 312.3 128.9 304.7 129.7 297.3L76.3 249.8C64.9 239.7 62.3 223 69.8 209.9L99.7 158.1C107.3 144.9 123.1 138.9 137.5 143.7L205.3 166.2C217.4 157.1 230.6 149.5 244.6 143.4L259.1 73.5zM320.3 400C364.5 399.8 400.2 363.9 400 319.7C399.8 275.5 363.9 239.8 319.7 240C275.5 240.2 239.8 276.1 240 320.3C240.2 364.5 276.1 400.2 320.3 400z"/></svg>`,"grip-vertical":`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path d="M128 40c0-22.1-17.9-40-40-40L40 0C17.9 0 0 17.9 0 40L0 88c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm0 192c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zM0 424l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM320 40c0-22.1-17.9-40-40-40L232 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zM192 232l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM320 424c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48z"/></svg>`,indeterminate:`<svg part="indeterminate-icon" class="icon" viewBox="0 0 16 16"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round"><g stroke="currentColor" stroke-width="2"><g transform="translate(2.285714 6.857143)"><path d="M10.2857143,1.14285714 L1.14285714,1.14285714"/></g></g></g></svg>`,minus:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path d="M0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32z"/></svg>`,pause:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path d="M48 32C21.5 32 0 53.5 0 80L0 432c0 26.5 21.5 48 48 48l64 0c26.5 0 48-21.5 48-48l0-352c0-26.5-21.5-48-48-48L48 32zm224 0c-26.5 0-48 21.5-48 48l0 352c0 26.5 21.5 48 48 48l64 0c26.5 0 48-21.5 48-48l0-352c0-26.5-21.5-48-48-48l-64 0z"/></svg>`,"picture-in-picture":`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M448 32c35.3 0 64 28.7 64 64l0 112-64 0 0-112-384 0 0 320 144 0 0 64-144 0-6.5-.3c-30.1-3.1-54.1-27-57.1-57.1L0 416 0 96C0 62.9 25.2 35.6 57.5 32.3L64 32 448 32zm16 224c26.5 0 48 21.5 48 48l0 128c0 26.5-21.5 48-48 48l-160 0c-26.5 0-48-21.5-48-48l0-128c0-26.5 21.5-48 48-48l160 0z"/></svg>`,play:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path d="M91.2 36.9c-12.4-6.8-27.4-6.5-39.6 .7S32 57.9 32 72l0 368c0 14.1 7.5 27.2 19.6 34.4s27.2 7.5 39.6 .7l336-184c12.8-7 20.8-20.5 20.8-35.1s-8-28.1-20.8-35.1l-336-184z"/></svg>`,"play-circle":`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M0 256a256 256 0 1 1 512 0 256 256 0 1 1 -512 0zM188.3 147.1c-7.6 4.2-12.3 12.3-12.3 20.9l0 176c0 8.7 4.7 16.7 12.3 20.9s16.8 4.1 24.3-.5l144-88c7.1-4.4 11.5-12.1 11.5-20.5s-4.4-16.1-11.5-20.5l-144-88c-7.4-4.5-16.7-4.7-24.3-.5z"/></svg>`,plus:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M352 128C352 110.3 337.7 96 320 96C302.3 96 288 110.3 288 128L288 288L128 288C110.3 288 96 302.3 96 320C96 337.7 110.3 352 128 352L288 352L288 512C288 529.7 302.3 544 320 544C337.7 544 352 529.7 352 512L352 352L512 352C529.7 352 544 337.7 544 320C544 302.3 529.7 288 512 288L352 288L352 128z"/></svg>`,star:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path d="M309.5-18.9c-4.1-8-12.4-13.1-21.4-13.1s-17.3 5.1-21.4 13.1L193.1 125.3 33.2 150.7c-8.9 1.4-16.3 7.7-19.1 16.3s-.5 18 5.8 24.4l114.4 114.5-25.2 159.9c-1.4 8.9 2.3 17.9 9.6 23.2s16.9 6.1 25 2L288.1 417.6 432.4 491c8 4.1 17.7 3.3 25-2s11-14.2 9.6-23.2L441.7 305.9 556.1 191.4c6.4-6.4 8.6-15.8 5.8-24.4s-10.1-14.9-19.1-16.3L383 125.3 309.5-18.9z"/></svg>`,upload:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M352 173.3L352 384C352 401.7 337.7 416 320 416C302.3 416 288 401.7 288 384L288 173.3L246.6 214.7C234.1 227.2 213.8 227.2 201.3 214.7C188.8 202.2 188.8 181.9 201.3 169.4L297.3 73.4C309.8 60.9 330.1 60.9 342.6 73.4L438.6 169.4C451.1 181.9 451.1 202.2 438.6 214.7C426.1 227.2 405.8 227.2 393.3 214.7L352 173.3zM320 464C364.2 464 400 428.2 400 384L480 384C515.3 384 544 412.7 544 448L544 480C544 515.3 515.3 544 480 544L160 544C124.7 544 96 515.3 96 480L96 448C96 412.7 124.7 384 160 384L240 384C240 428.2 275.8 464 320 464zM464 488C477.3 488 488 477.3 488 464C488 450.7 477.3 440 464 440C450.7 440 440 450.7 440 464C440 477.3 450.7 488 464 488z"/></svg>`,user:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path d="M224 248a120 120 0 1 0 0-240 120 120 0 1 0 0 240zm-29.7 56C95.8 304 16 383.8 16 482.3 16 498.7 29.3 512 45.7 512l356.6 0c16.4 0 29.7-13.3 29.7-29.7 0-98.5-79.8-178.3-178.3-178.3l-59.4 0z"/></svg>`,volume:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M48 352l48 0 134.1 119.2c6.4 5.7 14.6 8.8 23.1 8.8 19.2 0 34.8-15.6 34.8-34.8l0-378.4c0-19.2-15.6-34.8-34.8-34.8-8.5 0-16.7 3.1-23.1 8.8L96 160 48 160c-26.5 0-48 21.5-48 48l0 96c0 26.5 21.5 48 48 48zM441.1 107c-10.3-8.4-25.4-6.8-33.8 3.5s-6.8 25.4 3.5 33.8C443.3 170.7 464 210.9 464 256s-20.7 85.3-53.2 111.8c-10.3 8.4-11.8 23.5-3.5 33.8s23.5 11.8 33.8 3.5c43.2-35.2 70.9-88.9 70.9-149s-27.7-113.8-70.9-149zm-60.5 74.5c-10.3-8.4-25.4-6.8-33.8 3.5s-6.8 25.4 3.5 33.8C361.1 227.6 368 241 368 256s-6.9 28.4-17.7 37.3c-10.3 8.4-11.8 23.5-3.5 33.8s23.5 11.8 33.8 3.5C402.1 312.9 416 286.1 416 256s-13.9-56.9-35.5-74.5z"/></svg>`,"volume-low":`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M48 352l48 0 134.1 119.2c6.4 5.7 14.6 8.8 23.1 8.8 19.2 0 34.8-15.6 34.8-34.8l0-378.4c0-19.2-15.6-34.8-34.8-34.8-8.5 0-16.7 3.1-23.1 8.8L96 160 48 160c-26.5 0-48 21.5-48 48l0 96c0 26.5 21.5 48 48 48zM380.6 181.5c-10.3-8.4-25.4-6.8-33.8 3.5s-6.8 25.4 3.5 33.8C361.1 227.6 368 241 368 256s-6.9 28.4-17.7 37.3c-10.3 8.4-11.8 23.5-3.5 33.8s23.5 11.8 33.8 3.5C402.1 312.9 416 286.1 416 256s-13.9-56.9-35.5-74.5z"/></svg>`,"volume-xmark":`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M48 352l48 0 134.1 119.2c6.4 5.7 14.6 8.8 23.1 8.8 19.2 0 34.8-15.6 34.8-34.8l0-378.4c0-19.2-15.6-34.8-34.8-34.8-8.5 0-16.7 3.1-23.1 8.8L96 160 48 160c-26.5 0-48 21.5-48 48l0 96c0 26.5 21.5 48 48 48zM367 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z"/></svg>`,xmark:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path d="M55.1 73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L147.2 256 9.9 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192.5 301.3 329.9 438.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.8 256 375.1 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192.5 210.7 55.1 73.4z"/></svg>`},regular:{calendar:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M216 64C229.3 64 240 74.7 240 88L240 128L400 128L400 88C400 74.7 410.7 64 424 64C437.3 64 448 74.7 448 88L448 128L480 128C515.3 128 544 156.7 544 192L544 480C544 515.3 515.3 544 480 544L160 544C124.7 544 96 515.3 96 480L96 192C96 156.7 124.7 128 160 128L192 128L192 88C192 74.7 202.7 64 216 64zM216 176L160 176C151.2 176 144 183.2 144 192L144 240L496 240L496 192C496 183.2 488.8 176 480 176L216 176zM144 288L144 480C144 488.8 151.2 496 160 496L480 496C488.8 496 496 488.8 496 480L496 288L144 288z"/></svg>`,"circle-question":`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path d="M464 256a208 208 0 1 0 -416 0 208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0 256 256 0 1 1 -512 0zm256-80c-17.7 0-32 14.3-32 32 0 13.3-10.7 24-24 24s-24-10.7-24-24c0-44.2 35.8-80 80-80s80 35.8 80 80c0 47.2-36 67.2-56 74.5l0 3.8c0 13.3-10.7 24-24 24s-24-10.7-24-24l0-8.1c0-20.5 14.8-35.2 30.1-40.2 6.4-2.1 13.2-5.5 18.2-10.3 4.3-4.2 7.7-10 7.7-19.6 0-17.7-14.3-32-32-32zM224 368a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"/></svg>`,"circle-xmark":`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464a256 256 0 1 0 0-512 256 256 0 1 0 0 512zM167 167c-9.4 9.4-9.4 24.6 0 33.9l55 55-55 55c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l55-55 55 55c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-55-55 55-55c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-55 55-55-55c-9.4-9.4-24.6-9.4-33.9 0z"/></svg>`,clock:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M528 320C528 434.9 434.9 528 320 528C205.1 528 112 434.9 112 320C112 205.1 205.1 112 320 112C434.9 112 528 205.1 528 320zM64 320C64 461.4 178.6 576 320 576C461.4 576 576 461.4 576 320C576 178.6 461.4 64 320 64C178.6 64 64 178.6 64 320zM296 184L296 320C296 328 300 335.5 306.7 340L402.7 404C413.7 411.4 428.6 408.4 436 397.3C443.4 386.2 440.4 371.4 429.3 364L344 307.2L344 184C344 170.7 333.3 160 320 160C306.7 160 296 170.7 296 184z"/></svg>`,copy:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path d="M384 336l-192 0c-8.8 0-16-7.2-16-16l0-256c0-8.8 7.2-16 16-16l133.5 0c4.2 0 8.3 1.7 11.3 4.7l58.5 58.5c3 3 4.7 7.1 4.7 11.3L400 320c0 8.8-7.2 16-16 16zM192 384l192 0c35.3 0 64-28.7 64-64l0-197.5c0-17-6.7-33.3-18.7-45.3L370.7 18.7C358.7 6.7 342.5 0 325.5 0L192 0c-35.3 0-64 28.7-64 64l0 256c0 35.3 28.7 64 64 64zM64 128c-35.3 0-64 28.7-64 64L0 448c0 35.3 28.7 64 64 64l192 0c35.3 0 64-28.7 64-64l0-16-48 0 0 16c0 8.8-7.2 16-16 16L64 464c-8.8 0-16-7.2-16-16l0-256c0-8.8 7.2-16 16-16l16 0 0-48-16 0z"/></svg>`,eye:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path d="M288 80C222.8 80 169.2 109.6 128.1 147.7 89.6 183.5 63 226 49.4 256 63 286 89.6 328.5 128.1 364.3 169.2 402.4 222.8 432 288 432s118.8-29.6 159.9-67.7C486.4 328.5 513 286 526.6 256 513 226 486.4 183.5 447.9 147.7 406.8 109.6 353.2 80 288 80zM95.4 112.6C142.5 68.8 207.2 32 288 32s145.5 36.8 192.6 80.6c46.8 43.5 78.1 95.4 93 131.1 3.3 7.9 3.3 16.7 0 24.6-14.9 35.7-46.2 87.7-93 131.1-47.1 43.7-111.8 80.6-192.6 80.6S142.5 443.2 95.4 399.4c-46.8-43.5-78.1-95.4-93-131.1-3.3-7.9-3.3-16.7 0-24.6 14.9-35.7 46.2-87.7 93-131.1zM288 336c44.2 0 80-35.8 80-80 0-29.6-16.1-55.5-40-69.3-1.4 59.7-49.6 107.9-109.3 109.3 13.8 23.9 39.7 40 69.3 40zm-79.6-88.4c2.5 .3 5 .4 7.6 .4 35.3 0 64-28.7 64-64 0-2.6-.2-5.1-.4-7.6-37.4 3.9-67.2 33.7-71.1 71.1zm45.6-115c10.8-3 22.2-4.5 33.9-4.5 8.8 0 17.5 .9 25.8 2.6 .3 .1 .5 .1 .8 .2 57.9 12.2 101.4 63.7 101.4 125.2 0 70.7-57.3 128-128 128-61.6 0-113-43.5-125.2-101.4-1.8-8.6-2.8-17.5-2.8-26.6 0-11 1.4-21.8 4-32 .2-.7 .3-1.3 .5-1.9 11.9-43.4 46.1-77.6 89.5-89.5z"/></svg>`,"eye-slash":`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path d="M41-24.9c-9.4-9.4-24.6-9.4-33.9 0S-2.3-.3 7 9.1l528 528c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-96.4-96.4c2.7-2.4 5.4-4.8 8-7.2 46.8-43.5 78.1-95.4 93-131.1 3.3-7.9 3.3-16.7 0-24.6-14.9-35.7-46.2-87.7-93-131.1-47.1-43.7-111.8-80.6-192.6-80.6-56.8 0-105.6 18.2-146 44.2L41-24.9zM176.9 111.1c32.1-18.9 69.2-31.1 111.1-31.1 65.2 0 118.8 29.6 159.9 67.7 38.5 35.7 65.1 78.3 78.6 108.3-13.6 30-40.2 72.5-78.6 108.3-3.1 2.8-6.2 5.6-9.4 8.4L393.8 328c14-20.5 22.2-45.3 22.2-72 0-70.7-57.3-128-128-128-26.7 0-51.5 8.2-72 22.2l-39.1-39.1zm182 182l-108-108c11.1-5.8 23.7-9.1 37.1-9.1 44.2 0 80 35.8 80 80 0 13.4-3.3 26-9.1 37.1zM103.4 173.2l-34-34c-32.6 36.8-55 75.8-66.9 104.5-3.3 7.9-3.3 16.7 0 24.6 14.9 35.7 46.2 87.7 93 131.1 47.1 43.7 111.8 80.6 192.6 80.6 37.3 0 71.2-7.9 101.5-20.6L352.2 422c-20 6.4-41.4 10-64.2 10-65.2 0-118.8-29.6-159.9-67.7-38.5-35.7-65.1-78.3-78.6-108.3 10.4-23.1 28.6-53.6 54-82.8z"/></svg>`,star:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path d="M288.1-32c9 0 17.3 5.1 21.4 13.1L383 125.3 542.9 150.7c8.9 1.4 16.3 7.7 19.1 16.3s.5 18-5.8 24.4L441.7 305.9 467 465.8c1.4 8.9-2.3 17.9-9.6 23.2s-17 6.1-25 2L288.1 417.6 143.8 491c-8 4.1-17.7 3.3-25-2s-11-14.2-9.6-23.2L134.4 305.9 20 191.4c-6.4-6.4-8.6-15.8-5.8-24.4s10.1-14.9 19.1-16.3l159.9-25.4 73.6-144.2c4.1-8 12.4-13.1 21.4-13.1zm0 76.8L230.3 158c-3.5 6.8-10 11.6-17.6 12.8l-125.5 20 89.8 89.9c5.4 5.4 7.9 13.1 6.7 20.7l-19.8 125.5 113.3-57.6c6.8-3.5 14.9-3.5 21.8 0l113.3 57.6-19.8-125.5c-1.2-7.6 1.3-15.3 6.7-20.7l89.8-89.9-125.5-20c-7.6-1.2-14.1-6-17.6-12.8L288.1 44.8z"/></svg>`}},mn={name:`system`,resolver:(e,t=`classic`,n=`solid`)=>{let r=pn[n][e]??pn.regular[e]??pn.regular[`circle-question`];return r?fn(r):``},mutator:e=>{e.hasAttribute(`fill`)||e.setAttribute(`fill`,`currentColor`)}},hn=`classic`,gn=[dn,mn],_n=new Set;function vn(e){_n.add(e)}function yn(e){_n.delete(e)}function bn(e){return gn.find(t=>t.name===e)}function xn(){return hn}var{I:Sn}=Be,Cn=(e,t)=>t===void 0?e?._$litType$!==void 0:e?._$litType$===t,wn=e=>e.strings===void 0,Tn={},En=(e,t=Tn)=>e._$AH=t,Dn=Symbol(),On=Symbol(),kn,An=new Map,H=class extends L{constructor(){super(...arguments),this.svg=null,this.autoWidth=!1,this.swapOpacity=!1,this.label=``,this.library=`default`,this.rotate=0,this.resolveIcon=async(e,t)=>{let n;if(t?.spriteSheet){this.hasUpdated||await this.updateComplete,this.svg=T`<svg part="svg">
        <use part="use" href="${e}"></use>
      </svg>`,await this.updateComplete;let n=this.shadowRoot.querySelector(`[part='svg']`);return typeof t.mutator==`function`&&t.mutator(n,this),this.svg}try{if(n=await fetch(e,{mode:`cors`}),!n.ok)return n.status===410?Dn:On}catch{return On}try{let e=document.createElement(`div`);e.innerHTML=await n.text();let t=e.firstElementChild;if(t?.tagName?.toLowerCase()!==`svg`)return Dn;kn||=new DOMParser;let r=kn.parseFromString(t.outerHTML,`text/html`).body.querySelector(`svg`);return r?(r.part.add(`svg`),document.adoptNode(r)):Dn}catch{return Dn}}}connectedCallback(){super.connectedCallback(),vn(this)}firstUpdated(e){super.firstUpdated(e),this.hasAttribute(`rotate`)&&this.style.setProperty(`--rotate-angle`,`${this.rotate}deg`),this.setIcon()}disconnectedCallback(){super.disconnectedCallback(),yn(this)}async getIconSource(){let e=bn(this.library),t=this.family||xn();if(this.name&&e){let n=this.canvas===`auto`||this.autoWidth,r;try{r=await e.resolver(this.name,t,this.variant,n)}catch{r=void 0}return{url:r,fromLibrary:!0}}return{url:this.src,fromLibrary:!1}}handleLabelChange(){typeof this.label==`string`&&this.label.length>0?(this.setAttribute(`role`,`img`),this.setAttribute(`aria-label`,this.label),this.removeAttribute(`aria-hidden`)):(this.removeAttribute(`role`),this.removeAttribute(`aria-label`),this.setAttribute(`aria-hidden`,`true`))}async setIcon(){let{url:e,fromLibrary:t}=await this.getIconSource(),n=t?bn(this.library):void 0;if(!e){this.svg=null;return}let r=An.get(e);r||(r=this.resolveIcon(e,n),An.set(e,r));let i=await r;if(i===On&&An.delete(e),e===(await this.getIconSource()).url){if(Cn(i)){this.svg=i;return}switch(i){case On:case Dn:this.svg=null,this.dispatchEvent(new $t);break;default:this.svg=i.cloneNode(!0),n?.mutator?.(this.svg,this),this.dispatchEvent(new en)}}}willUpdate(e){return this.style||this.setStyleProperty(`--rotate-angle`,`${this.rotate}deg`),super.willUpdate(e)}updated(e){super.updated(e);let t=bn(this.library);this.hasAttribute(`rotate`)&&this.style.setProperty(`--rotate-angle`,`${this.rotate}deg`);let n=this.shadowRoot?.querySelector(`svg`);n&&t?.mutator?.(n,this)}render(){return this.hasUpdated?this.svg:T`<svg part="svg" width="16" height="16" viewBox="0 0 16 16"></svg>`}};H.css=tn,I([j()],H.prototype,`svg`,2),I([A({reflect:!0})],H.prototype,`name`,2),I([A({reflect:!0})],H.prototype,`family`,2),I([A({reflect:!0})],H.prototype,`variant`,2),I([A({reflect:!0})],H.prototype,`canvas`,2),I([A({attribute:`auto-width`,type:Boolean,reflect:!0})],H.prototype,`autoWidth`,2),I([A({attribute:`swap-opacity`,type:Boolean,reflect:!0})],H.prototype,`swapOpacity`,2),I([A()],H.prototype,`src`,2),I([A()],H.prototype,`label`,2),I([A({reflect:!0})],H.prototype,`library`,2),I([A({type:Number,reflect:!0})],H.prototype,`rotate`,2),I([A({type:String,reflect:!0})],H.prototype,`flip`,2),I([A({type:String,reflect:!0})],H.prototype,`animation`,2),I([z(`label`)],H.prototype,`handleLabelChange`,1),I([z([`family`,`name`,`library`,`variant`,`src`,`autoWidth`,`canvas`,`swapOpacity`],{waitUntilFirstUpdate:!0})],H.prototype,`setIcon`,1),H=I([k(`wa-icon`)],H);var jn=class extends O{constructor(...e){super(...e),this.width=`24`,this.height=`24`}render(){return T`<svg
      class="${this.className}"
      xmlns="http://www.w3.org/2000/svg"
      width=${this.width}
      height=${this.height}
      viewBox="0 0 24 24"
    >
      <path d="M0 0h24v24H0z" fill="none" />
      <path fill="currentColor" d="M3 6h18v2H3zm0 5h18v2H3zm0 5h18v2H3z" />
    </svg> `}};N([A({type:String})],jn.prototype,`width`,void 0),N([A({type:String})],jn.prototype,`height`,void 0),jn=N([k(`i-menu`)],jn);var Mn=class extends O{constructor(...e){super(...e),this.width=`24`,this.height=`24`}render(){return T`<svg
      xmlns="http://www.w3.org/2000/svg"
      width=${this.width}
      height=${this.height}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="lucide lucide-circle-user-round preview-icon ${this.className}"
    >
      <path d="M17.925 20.056a6 6 0 0 0-11.851.001" />
      <circle cx="12" cy="11" r="4" />
      <circle cx="12" cy="12" r="10" />
    </svg>`}};N([A({type:String})],Mn.prototype,`width`,void 0),N([A({type:String})],Mn.prototype,`height`,void 0),Mn=N([k(`i-user`)],Mn);var Nn=class extends Event{constructor(e){super(`wa-select`,{bubbles:!0,cancelable:!0,composed:!0}),this.detail=e}};function*Pn(e=document.activeElement){e!=null&&(yield e,`shadowRoot`in e&&e.shadowRoot&&e.shadowRoot.mode!==`closed`&&(yield*Pn(e.shadowRoot.activeElement)))}var Fn=p`
  :host {
    --show-duration: var(--wa-transition-fast);
    --hide-duration: var(--wa-transition-fast);
    display: contents;
  }

  #menu {
    display: flex;
    flex-direction: column;
    width: max-content;
    margin: 0;
    padding: 0.25em;
    border: var(--wa-border-style) var(--wa-border-width-s) var(--wa-color-surface-border);
    border-radius: var(--wa-border-radius-m);
    background-color: var(--wa-color-surface-raised);
    box-shadow: var(--wa-shadow-m);
    color: var(--wa-color-text-normal);
    text-align: start;
    user-select: none;
    overflow: auto;
    max-width: var(--auto-size-available-width) !important;
    max-height: var(--auto-size-available-height) !important;

    &.show {
      animation: show var(--show-duration) ease;
    }

    &.hide {
      animation: show var(--hide-duration) ease reverse;
    }

    ::slotted(h1),
    ::slotted(h2),
    ::slotted(h3),
    ::slotted(h4),
    ::slotted(h5),
    ::slotted(h6) {
      display: block !important;
      margin: 0.25em 0 !important;
      padding: 0.25em 0.75em !important;
      color: var(--wa-color-text-quiet);
      font-family: var(--wa-font-family-body) !important;
      font-weight: var(--wa-font-weight-semibold) !important;
      font-size: var(--wa-font-size-smaller) !important;
    }

    ::slotted(wa-divider) {
      --spacing: 0.25em; /* Component-specific, left as-is */
    }
  }

  wa-popup[data-current-placement^='top'] #menu {
    transform-origin: bottom;
  }

  wa-popup[data-current-placement^='bottom'] #menu {
    transform-origin: top;
  }

  wa-popup[data-current-placement^='left'] #menu {
    transform-origin: right;
  }

  wa-popup[data-current-placement^='right'] #menu {
    transform-origin: left;
  }

  wa-popup[data-current-placement='left-start'] #menu {
    transform-origin: right top;
  }

  wa-popup[data-current-placement='left-end'] #menu {
    transform-origin: right bottom;
  }

  wa-popup[data-current-placement='right-start'] #menu {
    transform-origin: left top;
  }

  wa-popup[data-current-placement='right-end'] #menu {
    transform-origin: left bottom;
  }

  @keyframes show {
    from {
      scale: 0.9;
      opacity: 0;
    }
    to {
      scale: 1;
      opacity: 1;
    }
  }
`,In=class extends Event{constructor(){super(`wa-show`,{bubbles:!0,cancelable:!0,composed:!0})}},Ln=class extends Event{constructor(e){super(`wa-hide`,{bubbles:!0,cancelable:!0,composed:!0}),this.detail=e}},Rn=class extends Event{constructor(){super(`wa-after-show`,{bubbles:!0,cancelable:!1,composed:!0})}},zn=class extends Event{constructor(){super(`wa-after-hide`,{bubbles:!0,cancelable:!1,composed:!0})}},Bn=[];function Vn(e){Hn(e),Bn.push(e)}function Hn(e){for(let t=Bn.length-1;t>=0;t--)if(Bn[t]===e){Bn.splice(t,1);break}}function Un(e){return Bn.length>0&&Bn[Bn.length-1]===e}var Wn=`useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict`,Gn=(e=21)=>{let t=``,n=crypto.getRandomValues(new Uint8Array(e|=0));for(;e--;)t+=Wn[n[e]&63];return t};function Kn(e=``){return`${e}${Gn()}`}function qn(e,t){return new Promise(n=>{let r=new AbortController,{signal:i}=r;if(e.classList.contains(t))return;e.classList.add(t);let a=!1,o=()=>{a||(a=!0,e.classList.remove(t),n(),r.abort())};e.addEventListener(`animationend`,o,{once:!0,signal:i}),e.addEventListener(`animationcancel`,o,{once:!0,signal:i}),requestAnimationFrame(()=>{!a&&e.getAnimations().length===0&&o()})})}var Jn=Math.min,Yn=Math.max,Xn=Math.round,Zn=Math.floor,Qn=e=>({x:e,y:e}),$n={left:`right`,right:`left`,bottom:`top`,top:`bottom`};function er(e,t,n){return Yn(e,Jn(t,n))}function tr(e,t){return typeof e==`function`?e(t):e}function nr(e){return e.split(`-`)[0]}function rr(e){return e.split(`-`)[1]}function ir(e){return e===`x`?`y`:`x`}function ar(e){return e===`y`?`height`:`width`}function or(e){let t=e[0];return t===`t`||t===`b`?`y`:`x`}function sr(e){return ir(or(e))}function cr(e,t,n){n===void 0&&(n=!1);let r=rr(e),i=sr(e),a=ar(i),o=i===`x`?r===(n?`end`:`start`)?`right`:`left`:r===`start`?`bottom`:`top`;return t.reference[a]>t.floating[a]&&(o=_r(o)),[o,_r(o)]}function lr(e){let t=_r(e);return[ur(e),t,ur(t)]}function ur(e){return e.includes(`start`)?e.replace(`start`,`end`):e.replace(`end`,`start`)}var dr=[`left`,`right`],fr=[`right`,`left`],pr=[`top`,`bottom`],mr=[`bottom`,`top`];function hr(e,t,n){switch(e){case`top`:case`bottom`:return n?t?fr:dr:t?dr:fr;case`left`:case`right`:return t?pr:mr;default:return[]}}function gr(e,t,n,r){let i=rr(e),a=hr(nr(e),n===`start`,r);return i&&(a=a.map(e=>e+`-`+i),t&&(a=a.concat(a.map(ur)))),a}function _r(e){let t=nr(e);return $n[t]+e.slice(t.length)}function vr(e){return{top:e.top??0,right:e.right??0,bottom:e.bottom??0,left:e.left??0}}function yr(e){return typeof e==`number`?{top:e,right:e,bottom:e,left:e}:vr(e)}function br(e){let{x:t,y:n,width:r,height:i}=e;return{width:r,height:i,top:n,left:t,right:t+r,bottom:n+i,x:t,y:n}}function xr(e,t,n){let{reference:r,floating:i}=e,a=or(t),o=sr(t),s=ar(o),c=nr(t),l=a===`y`,u=r.x+r.width/2-i.width/2,d=r.y+r.height/2-i.height/2,f=r[s]/2-i[s]/2,p;switch(c){case`top`:p={x:u,y:r.y-i.height};break;case`bottom`:p={x:u,y:r.y+r.height};break;case`right`:p={x:r.x+r.width,y:d};break;case`left`:p={x:r.x-i.width,y:d};break;default:p={x:r.x,y:r.y}}let m=rr(t);return m&&(p[o]+=f*(m===`end`?1:-1)*(n&&l?-1:1)),p}async function Sr(e,t){t===void 0&&(t={});let{x:n,y:r,platform:i,rects:a,elements:o,strategy:s}=e,{boundary:c=`clippingAncestors`,rootBoundary:l=`viewport`,elementContext:u=`floating`,altBoundary:d=!1,padding:f=0}=tr(t,e),p=yr(f),m=o[d?u===`floating`?`reference`:`floating`:u],h=br(await i.getClippingRect({element:await(i.isElement==null?void 0:i.isElement(m))??!0?m:m.contextElement||await(i.getDocumentElement==null?void 0:i.getDocumentElement(o.floating)),boundary:c,rootBoundary:l,strategy:s})),g=u===`floating`?{x:n,y:r,width:a.floating.width,height:a.floating.height}:a.reference,_=await(i.getOffsetParent==null?void 0:i.getOffsetParent(o.floating)),v=await(i.isElement==null?void 0:i.isElement(_))&&await(i.getScale==null?void 0:i.getScale(_))||{x:1,y:1},y=br(i.convertOffsetParentRelativeRectToViewportRelativeRect?await i.convertOffsetParentRelativeRectToViewportRelativeRect({elements:o,rect:g,offsetParent:_,strategy:s}):g);return{top:(h.top-y.top+p.top)/v.y,bottom:(y.bottom-h.bottom+p.bottom)/v.y,left:(h.left-y.left+p.left)/v.x,right:(y.right-h.right+p.right)/v.x}}var Cr=50,wr=async(e,t,n)=>{let{placement:r=`bottom`,strategy:i=`absolute`,middleware:a=[],platform:o}=n,s=o.detectOverflow?o:{...o,detectOverflow:Sr},c=await(o.isRTL==null?void 0:o.isRTL(t)),l=await o.getElementRects({reference:e,floating:t,strategy:i}),{x:u,y:d}=xr(l,r,c),f=r,p=0,m={};for(let n=0;n<a.length;n++){let h=a[n];if(!h)continue;let{name:g,fn:_}=h,{x:v,y,data:b,reset:x}=await _({x:u,y:d,initialPlacement:r,placement:f,strategy:i,middlewareData:m,rects:l,platform:s,elements:{reference:e,floating:t}});u=v??u,d=y??d,m[g]={...m[g],...b},x&&p<Cr&&(p++,typeof x==`object`&&(x.placement&&(f=x.placement),x.rects&&(l=x.rects===!0?await o.getElementRects({reference:e,floating:t,strategy:i}):x.rects),{x:u,y:d}=xr(l,f,c)),n=-1)}return{x:u,y:d,placement:f,strategy:i,middlewareData:m}},Tr=e=>({name:`arrow`,options:e,async fn(t){let{x:n,y:r,placement:i,rects:a,platform:o,elements:s,middlewareData:c}=t,{element:l,padding:u=0}=tr(e,t)||{};if(l==null)return{};let d=yr(u),f={x:n,y:r},p=sr(i),m=ar(p),h=await o.getDimensions(l),g=p===`y`,_=g?`top`:`left`,v=g?`bottom`:`right`,y=g?`clientHeight`:`clientWidth`,b=a.reference[m]+a.reference[p]-f[p]-a.floating[m],x=f[p]-a.reference[p],S=await(o.getOffsetParent==null?void 0:o.getOffsetParent(l)),C=S?S[y]:0;(!C||!await(o.isElement==null?void 0:o.isElement(S)))&&(C=s.floating[y]||a.floating[m]);let ee=b/2-x/2,te=C/2-h[m]/2-1,w=Jn(d[_],te),ne=Jn(d[v],te),re=C-h[m]-ne,ie=C/2-h[m]/2+ee,ae=er(w,ie,re),oe=!c.arrow&&rr(i)!=null&&ie!==ae&&a.reference[m]/2-(ie<w?w:ne)-h[m]/2<0,se=oe?ie<w?ie-w:ie-re:0;return{[p]:f[p]+se,data:{[p]:ae,centerOffset:ie-ae-se,...oe&&{alignmentOffset:se}},reset:oe}}}),Er=function(e){return e===void 0&&(e={}),{name:`flip`,options:e,async fn(t){var n;let{placement:r,middlewareData:i,rects:a,initialPlacement:o,platform:s,elements:c}=t,{mainAxis:l=!0,crossAxis:u=!0,fallbackPlacements:d,fallbackStrategy:f=`bestFit`,fallbackAxisSideDirection:p=`none`,flipAlignment:m=!0,...h}=tr(e,t);if((n=i.arrow)!=null&&n.alignmentOffset)return{};let g=nr(r),_=or(o),v=nr(o)===o,y=await(s.isRTL==null?void 0:s.isRTL(c.floating)),b=d||(v||!m?[_r(o)]:lr(o)),x=p!==`none`;!d&&x&&b.push(...gr(o,m,p,y));let S=[o,...b],C=await s.detectOverflow(t,h),ee=[],te=i.flip?.overflows||[];if(l&&ee.push(C[g]),u){let e=cr(r,a,y);ee.push(C[e[0]],C[e[1]])}if(te=[...te,{placement:r,overflows:ee}],!ee.every(e=>e<=0)){let e=(i.flip?.index||0)+1,t=S[e];if(t&&(u!==`alignment`||_===or(t)||te.every(e=>or(e.placement)!==_||e.overflows[0]>0)))return{data:{index:e,overflows:te},reset:{placement:t}};let n=te.filter(e=>e.overflows[0]<=0).sort((e,t)=>e.overflows[1]-t.overflows[1])[0]?.placement;if(!n)switch(f){case`bestFit`:{let e=te.filter(e=>{if(x){let t=or(e.placement);return t===_||t===`y`}return!0}).map(e=>[e.placement,e.overflows.filter(e=>e>0).reduce((e,t)=>e+t,0)]).sort((e,t)=>e[1]-t[1])[0]?.[0];e&&(n=e);break}case`initialPlacement`:n=o}if(r!==n)return{reset:{placement:n}}}return{}}}},Dr=new Set([`left`,`top`]);async function Or(e,t){let{placement:n,platform:r,elements:i}=e,a=await(r.isRTL==null?void 0:r.isRTL(i.floating)),o=nr(n),s=rr(n),c=or(n)===`y`,l=Dr.has(o)?-1:1,u=a&&c?-1:1,d=tr(t,e),{mainAxis:f,crossAxis:p,alignmentAxis:m}=typeof d==`number`?{mainAxis:d,crossAxis:0,alignmentAxis:null}:{mainAxis:d.mainAxis||0,crossAxis:d.crossAxis||0,alignmentAxis:d.alignmentAxis};return s&&typeof m==`number`&&(p=s===`end`?m*-1:m),c?{x:p*u,y:f*l}:{x:f*l,y:p*u}}var kr=function(e){return e===void 0&&(e=0),{name:`offset`,options:e,async fn(t){var n;let{x:r,y:i,placement:a,middlewareData:o}=t,s=await Or(t,e);return a===o.offset?.placement&&(n=o.arrow)!=null&&n.alignmentOffset?{}:{x:r+s.x,y:i+s.y,data:{...s,placement:a}}}}},Ar=function(e){return e===void 0&&(e={}),{name:`shift`,options:e,async fn(t){let{x:n,y:r,placement:i,platform:a}=t,{mainAxis:o=!0,crossAxis:s=!1,limiter:c={fn:e=>{let{x:t,y:n}=e;return{x:t,y:n}}},...l}=tr(e,t),u={x:n,y:r},d=await a.detectOverflow(t,l),f=or(i),p=ir(f),m=u[p],h=u[f],g=(e,t)=>er(t+d[e===`y`?`top`:`left`],t,t-d[e===`y`?`bottom`:`right`]);o&&(m=g(p,m)),s&&(h=g(f,h));let _=c.fn({...t,[p]:m,[f]:h});return{..._,data:{x:_.x-n,y:_.y-r,enabled:{[p]:o,[f]:s}}}}}},jr=function(e){return e===void 0&&(e={}),{name:`size`,options:e,async fn(t){let{placement:n,rects:r,platform:i,elements:a}=t,{apply:o=()=>{},...s}=tr(e,t),c=await i.detectOverflow(t,s),l=nr(n),u=rr(n),d=or(n)===`y`,{width:f,height:p}=r.floating,m,h;l===`top`||l===`bottom`?(m=l,h=u===(await(i.isRTL==null?void 0:i.isRTL(a.floating))?`start`:`end`)?`left`:`right`):(h=l,m=u===`end`?`top`:`bottom`);let g=p-c.top-c.bottom,_=f-c.left-c.right,v=Jn(p-c[m],g),y=Jn(f-c[h],_),b=t.middlewareData.shift,x=!b,S=v,C=y;b!=null&&b.enabled.x&&(C=_),b!=null&&b.enabled.y&&(S=g),x&&!u&&(d?C=f-2*Yn(c.left,c.right):S=p-2*Yn(c.top,c.bottom)),await o({...t,availableWidth:C,availableHeight:S});let ee=await i.getDimensions(a.floating);return f!==ee.width||p!==ee.height?{reset:{rects:!0}}:{}}}};function Mr(){return typeof window<`u`}function Nr(e){return Fr(e)?(e.nodeName||``).toLowerCase():`#document`}function U(e){var t;return(e==null||(t=e.ownerDocument)==null?void 0:t.defaultView)||window}function Pr(e){return((Fr(e)?e.ownerDocument:e.document)||window.document)?.documentElement}function Fr(e){return Mr()?e instanceof Node||e instanceof U(e).Node:!1}function W(e){return Mr()?e instanceof Element||e instanceof U(e).Element:!1}function Ir(e){return Mr()?e instanceof HTMLElement||e instanceof U(e).HTMLElement:!1}function Lr(e){return!Mr()||typeof ShadowRoot>`u`?!1:e instanceof ShadowRoot||e instanceof U(e).ShadowRoot}function Rr(e){let{overflow:t,overflowX:n,overflowY:r,display:i}=Yr(e);return/auto|scroll|overlay|hidden|clip/.test(t+r+n)&&i!==`inline`&&i!==`contents`}function zr(e){return/^(table|td|th)$/.test(Nr(e))}function Br(e){try{if(e.matches(`:popover-open`))return!0}catch{}try{return e.matches(`:modal`)}catch{return!1}}var Vr=/transform|translate|scale|rotate|perspective|filter/,Hr=/paint|layout|strict|content/,Ur=e=>!!e&&e!==`none`,Wr;function Gr(e){let t=W(e)?Yr(e):e;return Ur(t.transform)||Ur(t.translate)||Ur(t.scale)||Ur(t.rotate)||Ur(t.perspective)||!qr()&&(Ur(t.backdropFilter)||Ur(t.filter))||Vr.test(t.willChange||``)||Hr.test(t.contain||``)}function Kr(e){let t=Zr(e);for(;Ir(t)&&!Jr(t);){if(Gr(t))return t;if(Br(t))return null;t=Zr(t)}return null}function qr(){return Wr??=typeof CSS<`u`&&CSS.supports&&CSS.supports(`-webkit-backdrop-filter`,`none`),Wr}function Jr(e){return/^(html|body|#document)$/.test(Nr(e))}function Yr(e){return U(e).getComputedStyle(e)}function Xr(e){return W(e)?{scrollLeft:e.scrollLeft,scrollTop:e.scrollTop}:{scrollLeft:e.scrollX,scrollTop:e.scrollY}}function Zr(e){if(Nr(e)===`html`)return e;let t=e.assignedSlot||e.parentNode||Lr(e)&&e.host||Pr(e);return Lr(t)?t.host:t}function Qr(e){let t=Zr(e);return Jr(t)?(e.ownerDocument||e).body:Ir(t)&&Rr(t)?t:Qr(t)}function $r(e,t,n){t===void 0&&(t=[]),n===void 0&&(n=!0);let r=Qr(e),i=r===e.ownerDocument?.body,a=U(r);if(i){let e=ei(a);return t.concat(a,a.visualViewport||[],Rr(r)?r:[],e&&n?$r(e):[])}return t.concat(r,$r(r,[],n))}function ei(e){return e.parent&&Object.getPrototypeOf(e.parent)?e.frameElement:null}function ti(e){let t=Yr(e),n=parseFloat(t.width)||0,r=parseFloat(t.height)||0,i=Ir(e),a=i?e.offsetWidth:n,o=i?e.offsetHeight:r,s=Xn(n)!==a||Xn(r)!==o;return s&&(n=a,r=o),{width:n,height:r,$:s}}function ni(e){return W(e)?e:e.contextElement}function ri(e){let t=ni(e);if(!Ir(t))return Qn(1);let n=t.getBoundingClientRect(),{width:r,height:i,$:a}=ti(t),o=(a?Xn(n.width):n.width)/r,s=(a?Xn(n.height):n.height)/i;return(!o||!Number.isFinite(o))&&(o=1),(!s||!Number.isFinite(s))&&(s=1),{x:o,y:s}}var ii=Qn(0);function ai(e){let t=U(e);return!qr()||!t.visualViewport?ii:{x:t.visualViewport.offsetLeft,y:t.visualViewport.offsetTop}}function oi(e,t,n){return t===void 0&&(t=!1),!!n&&t&&n===U(e)}function si(e,t,n,r){t===void 0&&(t=!1),n===void 0&&(n=!1);let i=e.getBoundingClientRect(),a=ni(e),o=Qn(1);t&&(r?W(r)&&(o=ri(r)):o=ri(e));let s=oi(a,n,r)?ai(a):Qn(0),c=(i.left+s.x)/o.x,l=(i.top+s.y)/o.y,u=i.width/o.x,d=i.height/o.y;if(a&&r){let e=U(a),t=W(r)?U(r):r,n=e,i=ei(n);for(;i&&t!==n;){let e=ri(i),t=i.getBoundingClientRect(),r=Yr(i),a=t.left+(i.clientLeft+parseFloat(r.paddingLeft))*e.x,o=t.top+(i.clientTop+parseFloat(r.paddingTop))*e.y;c*=e.x,l*=e.y,u*=e.x,d*=e.y,c+=a,l+=o,n=U(i),i=ei(n)}}return br({width:u,height:d,x:c,y:l})}function ci(e,t){let n=Xr(e).scrollLeft;return t?t.left+n:si(Pr(e)).left+n}function li(e,t){let n=e.getBoundingClientRect();return{x:n.left+t.scrollLeft-ci(e,n),y:n.top+t.scrollTop}}function ui(e){let{elements:t,rect:n,offsetParent:r,strategy:i}=e,a=i===`fixed`,o=Pr(r),s=t?Br(t.floating):!1;if(r===o||s&&a)return n;let c={scrollLeft:0,scrollTop:0},l=Qn(1),u=Qn(0),d=Ir(r);if((d||!a)&&((Nr(r)!==`body`||Rr(o))&&(c=Xr(r)),d)){let e=si(r);l=ri(r),u.x=e.x+r.clientLeft,u.y=e.y+r.clientTop}let f=o&&!d&&!a?li(o,c):Qn(0);return{width:n.width*l.x,height:n.height*l.y,x:n.x*l.x-c.scrollLeft*l.x+u.x+f.x,y:n.y*l.y-c.scrollTop*l.y+u.y+f.y}}function di(e){return e.getClientRects?Array.from(e.getClientRects()):[]}function fi(e){let t=Xr(e),n=e.ownerDocument.body,r=Yn(e.scrollWidth,e.clientWidth,n.scrollWidth,n.clientWidth),i=Yn(e.scrollHeight,e.clientHeight,n.scrollHeight,n.clientHeight),a=-t.scrollLeft+ci(e),o=-t.scrollTop;return Yr(n).direction===`rtl`&&(a+=Yn(e.clientWidth,n.clientWidth)-r),{width:r,height:i,x:a,y:o}}var pi=25;function mi(e,t,n){n===void 0&&(n=`viewport`);let r=n===`layoutViewport`,i=U(e),a=Pr(e),o=i.visualViewport,s=a.clientWidth,c=a.clientHeight,l=0,u=0;if(o){let e=!qr()||t===`fixed`;r?e||(l=-o.offsetLeft,u=-o.offsetTop):(s=o.width,c=o.height,e&&(l=o.offsetLeft,u=o.offsetTop))}if(ci(a)<=0){let e=a.ownerDocument,t=e.body,n=getComputedStyle(t),r=e.compatMode===`CSS1Compat`&&parseFloat(n.marginLeft)+parseFloat(n.marginRight)||0,i=Math.abs(a.clientWidth-t.clientWidth-r),o=getComputedStyle(a).scrollbarGutter===`stable both-edges`?i/2:i;o<=pi&&(s-=o)}return{width:s,height:c,x:l,y:u}}function hi(e,t){let n=si(e,!0,t===`fixed`),r=n.top+e.clientTop,i=n.left+e.clientLeft,a=ri(e);return{width:e.clientWidth*a.x,height:e.clientHeight*a.y,x:i*a.x,y:r*a.y}}function gi(e,t,n){let r;if(t===`viewport`||t===`layoutViewport`)r=mi(e,n,t);else if(t===`document`)r=fi(Pr(e));else if(W(t))r=hi(t,n);else{let n=ai(e);r={x:t.x-n.x,y:t.y-n.y,width:t.width,height:t.height}}return br(r)}function _i(e,t){let n=t.get(e);if(n)return n;let r=$r(e,[],!1).filter(e=>W(e)&&Nr(e)!==`body`),i=null,a=Yr(e).position===`fixed`,o=a?Zr(e):e;for(;W(o)&&!Jr(o);){let e=Yr(o),t=Gr(o),n=i?i.position:a?`fixed`:``;!t&&(n===`fixed`||n===`absolute`&&e.position===`static`)?r=r.filter(e=>e!==o):i=e,o=Zr(o)}return t.set(e,r),r}function vi(e){let{element:t,boundary:n,rootBoundary:r,strategy:i}=e,a=[...n===`clippingAncestors`?Br(t)?[]:_i(t,this._c):[].concat(n),r],o=gi(t,a[0],i),s=o.top,c=o.right,l=o.bottom,u=o.left;for(let e=1;e<a.length;e++){let n=gi(t,a[e],i);s=Yn(n.top,s),c=Jn(n.right,c),l=Jn(n.bottom,l),u=Yn(n.left,u)}return{width:c-u,height:l-s,x:u,y:s}}function yi(e){let{width:t,height:n}=ti(e);return{width:t,height:n}}function bi(e,t,n){let r=Ir(t),i=Pr(t),a=n===`fixed`,o=si(e,!0,a,t),s={scrollLeft:0,scrollTop:0},c=Qn(0);if((r||!a)&&((Nr(t)!==`body`||Rr(i))&&(s=Xr(t)),r)){let e=si(t,!0,a,t);c.x=e.x+t.clientLeft,c.y=e.y+t.clientTop}!r&&i&&(c.x=ci(i));let l=i&&!r&&!a?li(i,s):Qn(0);return{x:o.left+s.scrollLeft-c.x-l.x,y:o.top+s.scrollTop-c.y-l.y,width:o.width,height:o.height}}function xi(e){return Yr(e).position===`static`}function Si(e,t){if(!Ir(e)||Yr(e).position===`fixed`)return null;if(t)return t(e);let n=e.offsetParent;return Pr(e)===n&&(n=n.ownerDocument.body),n}function Ci(e,t){let n=U(e);if(Br(e))return n;if(!Ir(e)){let t=Zr(e);for(;t&&!Jr(t);){if(W(t)&&!xi(t))return t;t=Zr(t)}return n}let r=Si(e,t);for(;r&&zr(r)&&xi(r);)r=Si(r,t);return r&&Jr(r)&&xi(r)&&!Gr(r)?n:r||Kr(e)||n}var wi=async function(e){let t=this.getOffsetParent||Ci,n=this.getDimensions,r=await n(e.floating);return{reference:bi(e.reference,await t(e.floating),e.strategy),floating:{x:0,y:0,width:r.width,height:r.height}}};function Ti(e){return Yr(e).direction===`rtl`}var Ei={convertOffsetParentRelativeRectToViewportRelativeRect:ui,getDocumentElement:Pr,getClippingRect:vi,getOffsetParent:Ci,getElementRects:wi,getClientRects:di,getDimensions:yi,getScale:ri,isElement:W,isRTL:Ti};function Di(e,t){return e.x===t.x&&e.y===t.y&&e.width===t.width&&e.height===t.height}function Oi(e,t,n){let r=null,i,a=Pr(e);function o(){var e;clearTimeout(i),(e=r)==null||e.disconnect(),r=null}function s(n,c){n===void 0&&(n=!1),c===void 0&&(c=1),o();let l=e.getBoundingClientRect(),{left:u,top:d,width:f,height:p}=l;if(n||t(),!f||!p)return;let m=Zn(d),h=Zn(a.clientWidth-(u+f)),g=Zn(a.clientHeight-(d+p)),_=Zn(u),v={rootMargin:-m+`px `+-h+`px `+-g+`px `+-_+`px`,threshold:Yn(0,Jn(1,c))||1},y=!0;function b(t){let n=t[0].intersectionRatio;if(!Di(l,e.getBoundingClientRect()))return s();if(n!==c){if(!y)return s();n?s(!1,n):i=setTimeout(()=>{s(!1,1e-7)},1e3)}y=!1}try{r=new IntersectionObserver(b,{...v,root:a.ownerDocument})}catch{r=new IntersectionObserver(b,v)}r.observe(e)}let c=U(e),l=()=>s(n);return c.addEventListener(`resize`,l),s(!0),()=>{c.removeEventListener(`resize`,l),o()}}function ki(e,t,n,r){r===void 0&&(r={});let{ancestorScroll:i=!0,ancestorResize:a=!0,elementResize:o=typeof ResizeObserver==`function`,layoutShift:s=typeof IntersectionObserver==`function`,animationFrame:c=!1}=r,l=ni(e),u=i||a?[...l?$r(l):[],...t?$r(t):[]]:[];u.forEach(e=>{i&&e.addEventListener(`scroll`,n),a&&e.addEventListener(`resize`,n)});let d=l&&s?Oi(l,n,a):null,f=-1,p=null;o&&(p=new ResizeObserver(e=>{let[r]=e;r&&r.target===l&&p&&t&&(p.unobserve(t),cancelAnimationFrame(f),f=requestAnimationFrame(()=>{var e;(e=p)==null||e.observe(t)})),n()}),l&&!c&&p.observe(l),t&&p.observe(t));let m,h=c?si(e):null;c&&g();function g(){let t=si(e);h&&!Di(h,t)&&n(),h=t,m=requestAnimationFrame(g)}return n(),()=>{var e;u.forEach(e=>{i&&e.removeEventListener(`scroll`,n),a&&e.removeEventListener(`resize`,n)}),d?.(),(e=p)==null||e.disconnect(),p=null,c&&cancelAnimationFrame(m)}}var Ai=kr,ji=Ar,Mi=Er,Ni=jr,Pi=Tr,Fi=(e,t,n)=>{let r=new Map,i=n??{},a={...Ei,...i.platform,_c:r};return wr(e,t,{...i,platform:a})},Ii=new Set,G=class extends L{constructor(){super(...arguments),this.submenuCleanups=new Map,this.localize=new Vt(this),this.userTypedQuery=``,this.openSubmenuStack=[],this.open=!1,this.size=`m`,this.placement=`bottom-start`,this.distance=0,this.skidding=0,this.handleDocumentKeyDown=async e=>{let t=this.localize.dir()===`rtl`;if(e.key===`Escape`&&this.open&&Un(this)){let t=this.getTrigger();e.preventDefault(),e.stopPropagation(),this.open=!1,t?.focus({preventScroll:!0});return}let n=[...Pn()].find(e=>e.localName===`wa-dropdown-item`),r=n?.localName===`wa-dropdown-item`,i=this.getCurrentSubmenuItem(),a=!!i,o,s,c;a?(o=this.getSubmenuItems(i),s=o.find(e=>e.active||e===n),c=s?o.indexOf(s):-1):(o=this.getItems(),s=o.find(e=>e.active||e===n),c=s?o.indexOf(s):-1);let l;if(e.key===`ArrowUp`&&(e.preventDefault(),e.stopPropagation(),l=c>0?o[c-1]:o[o.length-1]),e.key===`ArrowDown`&&(e.preventDefault(),e.stopPropagation(),l=c!==-1&&c<o.length-1?o[c+1]:o[0]),e.key===(t?`ArrowLeft`:`ArrowRight`)&&r&&s&&s.hasSubmenu){e.preventDefault(),e.stopPropagation(),s.submenuOpen=!0,this.addToSubmenuStack(s),setTimeout(()=>{let e=this.getSubmenuItems(s);e.length>0&&(e.forEach((e,t)=>e.active=t===0),e[0].focus({preventScroll:!0}))},0);return}if(e.key===(t?`ArrowRight`:`ArrowLeft`)&&a){e.preventDefault(),e.stopPropagation();let t=this.removeFromSubmenuStack();t&&(t.submenuOpen=!1,setTimeout(()=>{t.focus({preventScroll:!0}),t.active=!0,(t.slot===`submenu`?this.getSubmenuItems(t.parentElement):this.getItems()).forEach(e=>{e!==t&&(e.active=!1)})},0));return}if((e.key===`Home`||e.key===`End`)&&(e.preventDefault(),e.stopPropagation(),l=e.key===`Home`?o[0]:o[o.length-1]),e.key===`Tab`&&await this.hideMenu(),e.key.length===1&&!(e.metaKey||e.ctrlKey||e.altKey)&&(e.key!==` `||this.userTypedQuery!==``)&&(clearTimeout(this.userTypedTimeout),this.userTypedTimeout=setTimeout(()=>{this.userTypedQuery=``},1e3),this.userTypedQuery+=e.key,o.some(e=>{let t=(e.textContent||``).trim().toLowerCase(),n=this.userTypedQuery.trim().toLowerCase();return t.startsWith(n)?(l=e,!0):!1})),l){e.preventDefault(),e.stopPropagation(),o.forEach(e=>e.active=e===l),l.focus({preventScroll:!0}),l.scrollIntoView({block:`nearest`});return}(e.key===`Enter`||e.key===` `&&this.userTypedQuery===``)&&r&&s&&(e.preventDefault(),e.stopPropagation(),s.hasSubmenu?(s.submenuOpen=!0,this.addToSubmenuStack(s),setTimeout(()=>{let e=this.getSubmenuItems(s);e.length>0&&(e.forEach((e,t)=>e.active=t===0),e[0].focus({preventScroll:!0}))},0)):this.makeSelection(s,e))},this.handleDocumentPointerDown=e=>{e.composedPath().some(e=>e instanceof HTMLElement?e===this||e.closest(`wa-dropdown, [part="submenu"]`):!1)||(this.open=!1)},this.handleGlobalMouseMove=e=>{let t=this.getCurrentSubmenuItem();if(!t?.submenuOpen||!t.submenuElement)return;let n=t.submenuElement.getBoundingClientRect(),r=this.localize.dir()===`rtl`,i=r?n.right:n.left,a=r?Math.max(e.clientX,i):Math.min(e.clientX,i),o=Math.max(n.top,Math.min(e.clientY,n.bottom));t.submenuElement.style.setProperty(`--safe-triangle-cursor-x`,`${a}px`),t.submenuElement.style.setProperty(`--safe-triangle-cursor-y`,`${o}px`);let s=e.composedPath(),c=t.matches(`:hover`),l=!!t.submenuElement?.matches(`:hover`),u=c||!!s.find(e=>e===t),d=l||!!s.find(e=>e instanceof HTMLElement&&e.closest(`[part="submenu"]`)===t.submenuElement);!u&&!d&&setTimeout(()=>{!c&&!l&&(t.submenuOpen=!1)},100)}}handleSizeChange(){Tt(this.localName,this.size)}disconnectedCallback(){super.disconnectedCallback(),clearInterval(this.userTypedTimeout),this.closeAllSubmenus(),this.submenuCleanups.forEach(e=>e()),this.submenuCleanups.clear(),document.removeEventListener(`mousemove`,this.handleGlobalMouseMove),document.removeEventListener(`keydown`,this.handleDocumentKeyDown),document.removeEventListener(`pointerdown`,this.handleDocumentPointerDown),Hn(this)}firstUpdated(e){super.firstUpdated(e),this.syncAriaAttributes()}async updated(e){if(e.has(`open`)){let t=e.get(`open`);if(t===this.open||t===void 0&&this.open===!1)return;this.customStates.set(`open`,this.open),this.open?await this.showMenu():(this.closeAllSubmenus(),await this.hideMenu())}e.has(`size`)&&this.syncItemSizes()}getItems(e=!1){let t=(this.defaultSlot?.assignedElements({flatten:!0})??[]).filter(e=>e.localName===`wa-dropdown-item`);return e?t:t.filter(e=>!e.disabled)}getSubmenuItems(e,t=!1){let n=e.shadowRoot?.querySelector(`slot[name="submenu"]`)||e.querySelector(`slot[name="submenu"]`);if(!n)return[];let r=n.assignedElements({flatten:!0}).filter(e=>e.localName===`wa-dropdown-item`);return t?r:r.filter(e=>!e.disabled)}syncItemSizes(){(this.defaultSlot?.assignedElements({flatten:!0})??[]).filter(e=>e.localName===`wa-dropdown-item`).forEach(e=>e.size=this.size)}addToSubmenuStack(e){let t=this.openSubmenuStack.indexOf(e);t===-1?this.openSubmenuStack.push(e):this.openSubmenuStack=this.openSubmenuStack.slice(0,t+1)}removeFromSubmenuStack(){return this.openSubmenuStack.pop()}getCurrentSubmenuItem(){return this.openSubmenuStack.length>0?this.openSubmenuStack[this.openSubmenuStack.length-1]:void 0}closeAllSubmenus(){this.getItems(!0).forEach(e=>{e.submenuOpen=!1}),this.openSubmenuStack=[]}closeSiblingSubmenus(e){let t=e.closest(`wa-dropdown-item:not([slot="submenu"])`),n;n=t?this.getSubmenuItems(t,!0):this.getItems(!0),n.forEach(t=>{t!==e&&t.submenuOpen&&(t.submenuOpen=!1)}),this.openSubmenuStack.includes(e)||this.openSubmenuStack.push(e)}getTrigger(){return this.querySelector(`[slot="trigger"]`)}async showMenu(){if(!this.getTrigger()||!this.popup||!this.menu)return;let e=new In;if(this.dispatchEvent(e),e.defaultPrevented){this.open=!1;return}if(this.popup.active)return;Ii.forEach(e=>e.open=!1),this.popup.active=!0,this.open=!0,Ii.add(this),Vn(this),this.syncAriaAttributes(),document.addEventListener(`keydown`,this.handleDocumentKeyDown),document.addEventListener(`pointerdown`,this.handleDocumentPointerDown),document.addEventListener(`mousemove`,this.handleGlobalMouseMove),this.menu.classList.remove(`hide`),await qn(this.menu,`show`);let t=this.getItems();t.length>0&&(t.forEach((e,t)=>e.active=t===0),t[0].focus({preventScroll:!0})),this.dispatchEvent(new Rn)}async hideMenu(){if(!this.popup||!this.menu)return;let e=new Ln({source:this});if(this.dispatchEvent(e),e.defaultPrevented){this.open=!0;return}this.open=!1,Ii.delete(this),Hn(this),this.syncAriaAttributes(),document.removeEventListener(`keydown`,this.handleDocumentKeyDown),document.removeEventListener(`pointerdown`,this.handleDocumentPointerDown),document.removeEventListener(`mousemove`,this.handleGlobalMouseMove),this.menu.classList.remove(`show`),await qn(this.menu,`hide`),this.popup.active=this.open,this.dispatchEvent(new zn)}handleMenuClick(e){let t=e.target.closest(`wa-dropdown-item`);if(t&&!t.disabled){if(t.hasSubmenu){t.submenuOpen||=(this.closeSiblingSubmenus(t),this.addToSubmenuStack(t),!0),e.stopPropagation();return}this.makeSelection(t,e)}}async handleMenuSlotChange(){let e=this.getItems(!0);await Promise.all(e.map(e=>e.updateComplete)),this.syncItemSizes();let t=e.some(e=>e.type===`checkbox`),n=e.some(e=>e.hasSubmenu);e.forEach((r,i)=>{r.setAttribute(`aria-posinset`,String(i+1)),r.setAttribute(`aria-setsize`,String(e.length)),r.active=i===0,r.checkboxAdjacent=t,r.submenuAdjacent=n})}handleTriggerClick(){this.open=!this.open}handleSubmenuOpening(e){let t=e.detail.item;this.closeSiblingSubmenus(t),this.addToSubmenuStack(t),this.setupSubmenuPosition(t),this.processSubmenuItems(t)}setupSubmenuPosition(e){if(!e.submenuElement)return;this.cleanupSubmenuPosition(e);let t=ki(e,e.submenuElement,()=>{this.positionSubmenu(e),this.updateSafeTriangleCoordinates(e)});this.submenuCleanups.set(e,t);let n=e.submenuElement.querySelector(`slot[name="submenu"]`);n&&(n.removeEventListener(`slotchange`,G.handleSubmenuSlotChange),n.addEventListener(`slotchange`,G.handleSubmenuSlotChange),G.handleSubmenuSlotChange({target:n}))}static handleSubmenuSlotChange(e){let t=e.target;if(!t)return;let n=t.assignedElements().filter(e=>e.localName===`wa-dropdown-item`);if(n.length===0)return;let r=n.some(e=>e.hasSubmenu),i=n.some(e=>e.type===`checkbox`);n.forEach(e=>{e.submenuAdjacent=r,e.checkboxAdjacent=i})}processSubmenuItems(e){if(!e.submenuElement)return;let t=this.getSubmenuItems(e,!0),n=t.some(e=>e.hasSubmenu);t.forEach(e=>{e.submenuAdjacent=n})}cleanupSubmenuPosition(e){let t=this.submenuCleanups.get(e);t&&(t(),this.submenuCleanups.delete(e))}positionSubmenu(e){if(!e.submenuElement)return;let t=this.localize.dir()===`rtl`?`left-start`:`right-start`;Fi(e,e.submenuElement,{placement:t,middleware:[Ai({mainAxis:0,crossAxis:-5}),Mi({fallbackStrategy:`bestFit`}),ji({padding:8,crossAxis:!0})]}).then(({x:t,y:n,placement:r})=>{e.submenuElement.setAttribute(`data-placement`,r),Object.assign(e.submenuElement.style,{left:`${t}px`,top:`${n}px`})})}updateSafeTriangleCoordinates(e){if(!e.submenuElement||!e.submenuOpen)return;if(document.activeElement?.matches(`:focus-visible`)){e.submenuElement.style.setProperty(`--safe-triangle-visible`,`none`);return}e.submenuElement.style.setProperty(`--safe-triangle-visible`,`block`);let t=e.submenuElement.getBoundingClientRect(),n=this.localize.dir()===`rtl`;e.submenuElement.style.setProperty(`--safe-triangle-submenu-start-x`,`${n?t.right:t.left}px`),e.submenuElement.style.setProperty(`--safe-triangle-submenu-start-y`,`${t.top}px`),e.submenuElement.style.setProperty(`--safe-triangle-submenu-end-x`,`${n?t.right:t.left}px`),e.submenuElement.style.setProperty(`--safe-triangle-submenu-end-y`,`${t.bottom}px`)}makeSelection(e,t){let n=this.getTrigger();if(e.disabled)return;e.type===`checkbox`&&(e.checked=!e.checked);let r=new Nn({item:e});this.dispatchEvent(r),r.defaultPrevented||(e.navigate(t),this.open=!1,n?.focus({preventScroll:!0}))}async syncAriaAttributes(){let e=this.getTrigger(),t;e&&(e.localName===`wa-button`?(await customElements.whenDefined(`wa-button`),await e.updateComplete,t=e.shadowRoot.querySelector(`[part~="base"]`)):t=e,t.hasAttribute(`id`)||t.setAttribute(`id`,Kn(`wa-dropdown-trigger-`)),t.setAttribute(`aria-haspopup`,`menu`),t.setAttribute(`aria-expanded`,this.open?`true`:`false`),this.menu?.setAttribute(`aria-expanded`,`false`))}render(){let e=this.didSSR&&!this.hasUpdated?this.open:this.popup?.active;return T`
      <wa-popup
        placement=${this.placement}
        distance=${this.distance}
        skidding=${this.skidding}
        ?active=${e}
        flip
        flip-fallback-strategy="best-fit"
        shift
        shift-padding="10"
        auto-size="vertical"
        auto-size-padding="10"
      >
        <slot
          name="trigger"
          slot="anchor"
          @click=${this.handleTriggerClick}
          @slotchange=${this.syncAriaAttributes}
        ></slot>
        <div
          id="menu"
          part="menu"
          role="menu"
          tabindex="-1"
          aria-orientation="vertical"
          @click=${this.handleMenuClick}
          @submenu-opening=${this.handleSubmenuOpening}
        >
          <slot @slotchange=${this.handleMenuSlotChange}></slot>
        </div>
      </wa-popup>
    `}};G.css=[Dt,Fn],I([M(`slot:not([name])`)],G.prototype,`defaultSlot`,2),I([M(`#menu`)],G.prototype,`menu`,2),I([M(`wa-popup`)],G.prototype,`popup`,2),I([A({type:Boolean,reflect:!0})],G.prototype,`open`,2),I([A({reflect:!0})],G.prototype,`size`,2),I([z(`size`)],G.prototype,`handleSizeChange`,1),I([A({reflect:!0})],G.prototype,`placement`,2),I([A({type:Number})],G.prototype,`distance`,2),I([A({type:Number})],G.prototype,`skidding`,2),G=I([k(`wa-dropdown`)],G);var Li=p`
  :host {
    display: flex;
    position: relative;
    align-items: center;
    padding: 0.5em 1em;
    border-radius: var(--wa-border-radius-s);
    isolation: isolate;
    color: var(--wa-color-text-normal);
    line-height: var(--wa-line-height-condensed);
    cursor: pointer;
    transition:
      var(--wa-transition-fast) background-color var(--wa-transition-easing),
      var(--wa-transition-fast) color var(--wa-transition-easing);
  }

  @media (hover: hover) {
    :host(:hover:not(:state(disabled))) {
      background-color: var(--wa-color-neutral-fill-normal);
    }
  }

  :host(:state(submenu-open)) {
    background-color: var(--wa-color-neutral-fill-normal);
  }

  :host(:focus-visible) {
    z-index: 1;
    outline: var(--wa-focus-ring);
    background-color: var(--wa-color-neutral-fill-normal);
  }

  :host(:state(disabled)),
  :host([disabled]) {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* Danger variant */
  :host([variant='danger']),
  :host([variant='danger']) #details {
    color: var(--wa-color-danger-on-quiet);
  }

  @media (hover: hover) {
    :host([variant='danger']:hover) {
      background-color: var(--wa-color-danger-fill-normal);
      color: var(--wa-color-danger-on-normal);
    }
  }

  :host([variant='danger']:state(submenu-open)),
  :host([variant='danger']:focus-visible) {
    background-color: var(--wa-color-danger-fill-normal);
    color: var(--wa-color-danger-on-normal);
  }

  :host([checkbox-adjacent]) {
    padding-inline-start: 2em;
  }

  /* Only add padding when item actually has a submenu */
  :host([submenu-adjacent]:not(:state(has-submenu))) #details {
    padding-inline-end: 0;
  }

  :host(:state(has-submenu)[submenu-adjacent]) #details {
    padding-inline-end: 1.75em;
  }

  /* The link only exists to be clicked programmatically. */
  #link {
    display: none;
  }

  #check {
    visibility: hidden;
    margin-inline-start: -1.5em;
    margin-inline-end: 0.5em;
    font-size: var(--wa-font-size-smaller);
  }

  :host(:state(checked)) #check {
    visibility: visible;
  }

  #icon ::slotted(*) {
    display: flex;
    flex: 0 0 auto;
    align-items: center;
    margin-inline-end: 0.75em !important;
    font-size: var(--wa-font-size-smaller);
  }

  #label {
    flex: 1 1 auto;
    min-width: 0;
  }

  #details {
    display: flex;
    flex: 0 0 auto;
    align-items: center;
    justify-content: end;
    color: var(--wa-color-text-quiet);
    font-size: var(--wa-font-size-smaller) !important;
  }

  #details ::slotted(*) {
    margin-inline-start: 2em !important;
  }

  /* Submenu indicator icon */
  #submenu-indicator {
    position: absolute;
    inset-inline-end: 1em;
    color: var(--wa-color-neutral-on-quiet);
    font-size: var(--wa-font-size-smaller);
  }

  /* Flip chevron icon when RTL */
  :host(:dir(rtl)) #submenu-indicator {
    transform: scaleX(-1);
  }

  /* Submenu styles */
  #submenu {
    display: flex;
    z-index: 10;
    position: absolute;
    top: 0;
    left: 0;
    flex-direction: column;
    width: max-content;
    margin: 0;
    padding: 0.25em;
    border: var(--wa-border-style) var(--wa-border-width-s) var(--wa-color-surface-border);
    border-radius: var(--wa-border-radius-m);
    background-color: var(--wa-color-surface-raised);
    box-shadow: var(--wa-shadow-m);
    color: var(--wa-color-text-normal);
    text-align: start;
    user-select: none;

    /* Override default popover styles */
    &[popover] {
      margin: 0;
      inset: auto;
      padding: 0.25em;
      overflow: visible;
      border-radius: var(--wa-border-radius-m);
    }

    &.show {
      animation: submenu-show var(--show-duration, var(--wa-transition-fast)) ease;
    }

    &.hide {
      animation: submenu-show var(--show-duration, var(--wa-transition-fast)) ease reverse;
    }

    /* Submenu placement transform origins */
    &[data-placement^='top'] {
      transform-origin: bottom;
    }

    &[data-placement^='bottom'] {
      transform-origin: top;
    }

    &[data-placement^='left'] {
      transform-origin: right;
    }

    &[data-placement^='right'] {
      transform-origin: left;
    }

    &[data-placement='left-start'] {
      transform-origin: right top;
    }

    &[data-placement='left-end'] {
      transform-origin: right bottom;
    }

    &[data-placement='right-start'] {
      transform-origin: left top;
    }

    &[data-placement='right-end'] {
      transform-origin: left bottom;
    }

    /* Safe triangle styling */
    &::before {
      display: none;
      z-index: 9;
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background-color: transparent;
      content: '';
      clip-path: polygon(
        var(--safe-triangle-cursor-x, 0) var(--safe-triangle-cursor-y, 0),
        var(--safe-triangle-submenu-start-x, 0) var(--safe-triangle-submenu-start-y, 0),
        var(--safe-triangle-submenu-end-x, 0) var(--safe-triangle-submenu-end-y, 0)
      );
      pointer-events: auto; /* Enable mouse events on the triangle */
    }

    &[data-visible]::before {
      display: block;
    }
  }

  ::slotted(wa-dropdown-item) {
    font-size: inherit;
  }

  ::slotted(wa-divider) {
    --spacing: 0.25em;
  }

  @keyframes submenu-show {
    from {
      scale: 0.9;
      opacity: 0;
    }
    to {
      scale: 1;
      opacity: 1;
    }
  }
`,K=class extends L{constructor(){super(...arguments),this.hasSlotController=new Et(this,`[default]`,`start`,`end`),this.active=!1,this.variant=`default`,this.size=`m`,this.checkboxAdjacent=!1,this.submenuAdjacent=!1,this.type=`normal`,this.checked=!1,this.disabled=!1,this.submenuOpen=!1,this.hasSubmenu=!1,this.handleSlotChange=()=>{this.hasSubmenu=this.hasSlotController.test(`submenu`),this.updateHasSubmenuState(),this.hasSubmenu?(this.setAttribute(`aria-haspopup`,`menu`),this.setAttribute(`aria-expanded`,this.submenuOpen?`true`:`false`)):(this.removeAttribute(`aria-haspopup`),this.removeAttribute(`aria-expanded`))},this.handleHostClick=e=>{this.disabled&&(e.preventDefault(),e.stopImmediatePropagation())},this.handleClick=e=>{this.disabled&&(e.preventDefault(),e.stopImmediatePropagation())},this.handlePointerEnter=e=>{e.pointerType===`mouse`&&this.hasSubmenu&&!this.disabled&&(this.notifyParentOfOpening(),this.submenuOpen=!0)}}handleSizeChange(){Tt(this.localName,this.size)}connectedCallback(){super.connectedCallback(),this.addEventListener?.(`click`,this.handleHostClick),this.addEventListener?.(`pointerenter`,this.handlePointerEnter),this.shadowRoot?.addEventListener?.(`click`,this.handleClick,{capture:!0}),this.shadowRoot?.addEventListener?.(`slotchange`,this.handleSlotChange)}disconnectedCallback(){super.disconnectedCallback(),this.closeSubmenu(),this.removeEventListener?.(`click`,this.handleHostClick),this.removeEventListener?.(`pointerenter`,this.handlePointerEnter),this.shadowRoot?.removeEventListener?.(`click`,this.handleClick,{capture:!0}),this.shadowRoot?.removeEventListener?.(`slotchange`,this.handleSlotChange)}firstUpdated(e){super.firstUpdated(e),this.setAttribute(`tabindex`,`-1`),this.hasSubmenu=this.hasSlotController.test(`submenu`),this.updateHasSubmenuState()}updated(e){e.has(`active`)&&(this.setAttribute(`tabindex`,this.active?`0`:`-1`),this.customStates.set(`active`,this.active)),e.has(`checked`)&&(this.type===`checkbox`?this.setAttribute(`aria-checked`,this.checked?`true`:`false`):this.removeAttribute(`aria-checked`),this.customStates.set(`checked`,this.checked)),e.has(`disabled`)&&(this.setAttribute(`aria-disabled`,this.disabled?`true`:`false`),this.customStates.set(`disabled`,this.disabled)),e.has(`type`)&&(this.type===`checkbox`?(this.setAttribute(`role`,`menuitemcheckbox`),this.setAttribute(`aria-checked`,this.checked?`true`:`false`)):(this.setAttribute(`role`,`menuitem`),this.removeAttribute(`aria-checked`))),(e.has(`href`)||e.has(`hasSubmenu`))&&this.customStates.set(`link`,this.isLink()),e.has(`submenuOpen`)&&(this.customStates.set(`submenu-open`,this.submenuOpen),this.submenuOpen?this.openSubmenu():this.closeSubmenu())}updateHasSubmenuState(){this.customStates.set(`has-submenu`,this.hasSubmenu)}async openSubmenu(){let e=this.submenuElement;this.hasSubmenu&&e&&this.isConnected&&(this.notifyParentOfOpening(),e.showPopover?.(),e.hidden=!1,e.setAttribute(`data-visible`,``),this.submenuOpen=!0,this.setAttribute(`aria-expanded`,`true`),await qn(e,`show`),setTimeout(()=>{let e=this.getSubmenuItems();e.length>0&&(e.forEach((e,t)=>e.active=t===0),e[0].focus({preventScroll:!0}))},0))}notifyParentOfOpening(){let e=new CustomEvent(`submenu-opening`,{bubbles:!0,composed:!0,detail:{item:this}});this.dispatchEvent(e);let t=this.parentElement;t&&[...t.children].filter(e=>e!==this&&e.localName===`wa-dropdown-item`&&e.getAttribute(`slot`)===this.getAttribute(`slot`)&&e.submenuOpen).forEach(e=>{e.submenuOpen=!1})}async closeSubmenu(){let e=this.submenuElement;this.hasSubmenu&&e&&(this.submenuOpen=!1,this.setAttribute(`aria-expanded`,`false`),e.hidden||(await qn(e,`hide`),e?.isConnected&&(e.hidden=!0,e.removeAttribute(`data-visible`),e.hidePopover?.())))}isLink(){return!!this.href&&!this.hasSubmenu}navigate(e){let t=this.linkElement;this.isLink()&&!this.disabled&&t&&t.dispatchEvent(new MouseEvent(`click`,{bubbles:!1,cancelable:!0,composed:!1,altKey:e?.altKey??!1,ctrlKey:e?.ctrlKey??!1,metaKey:e?.metaKey??!1,shiftKey:e?.shiftKey??!1}))}getSubmenuItems(){return[...this.children].filter(e=>e.localName===`wa-dropdown-item`&&e.getAttribute(`slot`)===`submenu`&&!e.hasAttribute(`disabled`))}render(){return T`
      ${this.href?T`
            <a
              id="link"
              href=${this.href}
              target=${B(this.target)}
              rel=${B(this.rel)}
              download=${B(this.download)}
              tabindex="-1"
              aria-hidden="true"
            ></a>
          `:``}
      ${this.type===`checkbox`?T`
            <wa-icon
              id="check"
              part="checkmark"
              exportparts="svg:checkmark__svg"
              library="system"
              name="check"
            ></wa-icon>
          `:``}

      <span id="icon" part="icon">
        <slot name="icon"></slot>
      </span>

      <span id="label" part="label">
        <slot></slot>
      </span>

      <span id="details" part="details">
        <slot name="details"></slot>
      </span>

      ${this.hasSubmenu?T`
            <wa-icon
              id="submenu-indicator"
              part="submenu-icon"
              exportparts="svg:submenu-icon__svg"
              library="system"
              name="chevron-right"
            ></wa-icon>
          `:``}
      ${this.hasSubmenu?T`
            <div
              id="submenu"
              part="submenu"
              popover="manual"
              role="menu"
              tabindex="-1"
              aria-orientation="vertical"
              hidden
            >
              <slot name="submenu"></slot>
            </div>
          `:``}
    `}};K.css=Li,I([M(`#submenu`)],K.prototype,`submenuElement`,2),I([M(`#link`)],K.prototype,`linkElement`,2),I([A({type:Boolean})],K.prototype,`active`,2),I([A({reflect:!0})],K.prototype,`variant`,2),I([A({reflect:!0})],K.prototype,`size`,2),I([z(`size`)],K.prototype,`handleSizeChange`,1),I([A({attribute:`checkbox-adjacent`,type:Boolean,reflect:!0})],K.prototype,`checkboxAdjacent`,2),I([A({attribute:`submenu-adjacent`,type:Boolean,reflect:!0})],K.prototype,`submenuAdjacent`,2),I([A()],K.prototype,`value`,2),I([A({reflect:!0})],K.prototype,`type`,2),I([A({type:Boolean})],K.prototype,`checked`,2),I([A({type:Boolean,reflect:!0})],K.prototype,`disabled`,2),I([A({type:Boolean,reflect:!0})],K.prototype,`submenuOpen`,2),I([A({reflect:!0})],K.prototype,`href`,2),I([A()],K.prototype,`target`,2),I([A()],K.prototype,`rel`,2),I([A()],K.prototype,`download`,2),I([j()],K.prototype,`hasSubmenu`,2),K=I([k(`wa-dropdown-item`)],K);var Ri=class extends Event{constructor(){super(`wa-reposition`,{bubbles:!0,cancelable:!1,composed:!0})}},zi=p`
  :host {
    --arrow-color: black;
    --arrow-size: var(--wa-tooltip-arrow-size);
    --popup-border-width: 0px;
    --show-duration: var(--wa-transition-fast);
    --hide-duration: var(--wa-transition-fast);

    /*
     * These properties are computed to account for the arrow's dimensions after being rotated 45º. The constant
     * 0.7071 is derived from sin(45) to calculate the length of the arrow after rotation.
     *
     * The diamond will be translated inward by --arrow-base-offset, the border thickness, to centralise it on
     * the inner edge of the popup border. This also means we need to increase the size of the arrow by the
     * same amount to compensate.
     *
     * A diamond shaped clipping mask is used to avoid overlap of popup content. This extends slightly inward so
     * the popup border is covered with no sub-pixel rounding artifacts. The diamond corners are mitred at 22.5º
     * to properly merge any arrow border with the popup border. The constant 1.4142 is derived from 1 + tan(22.5).
     *
     */
    --arrow-base-offset: var(--popup-border-width);
    --arrow-size-diagonal: calc((var(--arrow-size) + var(--arrow-base-offset)) * 0.7071);
    --arrow-padding-offset: calc(var(--arrow-size-diagonal) - var(--arrow-size));
    --arrow-size-div: calc(var(--arrow-size-diagonal) * 2);
    --arrow-clipping-corner: calc(var(--arrow-base-offset) * 1.4142);

    display: contents;
  }

  .popup {
    position: absolute;
    isolation: isolate;
    max-width: var(--auto-size-available-width, none);
    max-height: var(--auto-size-available-height, none);

    /* Clear UA styles for [popover] */
    :where(&) {
      inset: unset;
      padding: unset;
      margin: unset;
      width: unset;
      height: unset;
      color: unset;
      background: unset;
      border: unset;
      overflow: unset;
    }
  }

  .popup-fixed {
    position: fixed;
  }

  .popup:not(.popup-active) {
    display: none;
  }

  .arrow {
    position: absolute;
    width: var(--arrow-size-div);
    height: var(--arrow-size-div);
    background: var(--arrow-color);
    z-index: 3;
    clip-path: polygon(
      var(--arrow-clipping-corner) 100%,
      var(--arrow-base-offset) calc(100% - var(--arrow-base-offset)),
      calc(var(--arrow-base-offset) - 2px) calc(100% - var(--arrow-base-offset)),
      calc(100% - var(--arrow-base-offset)) calc(var(--arrow-base-offset) - 2px),
      calc(100% - var(--arrow-base-offset)) var(--arrow-base-offset),
      100% var(--arrow-clipping-corner),
      100% 100%
    );
    rotate: 45deg;
  }

  :host([data-current-placement|='left']) .arrow {
    rotate: -45deg;
  }

  :host([data-current-placement|='right']) .arrow {
    rotate: 135deg;
  }

  :host([data-current-placement|='bottom']) .arrow {
    rotate: 225deg;
  }

  /* Hover bridge */
  .popup-hover-bridge:not(.popup-hover-bridge-visible) {
    display: none;
  }

  .popup-hover-bridge {
    position: fixed;
    z-index: 899;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    clip-path: polygon(
      var(--hover-bridge-top-left-x, 0) var(--hover-bridge-top-left-y, 0),
      var(--hover-bridge-top-right-x, 0) var(--hover-bridge-top-right-y, 0),
      var(--hover-bridge-bottom-right-x, 0) var(--hover-bridge-bottom-right-y, 0),
      var(--hover-bridge-bottom-left-x, 0) var(--hover-bridge-bottom-left-y, 0)
    );
  }

  /* Built-in animations */
  .show {
    animation: show var(--show-duration) ease;
  }

  .hide {
    animation: show var(--hide-duration) ease reverse;
  }

  @keyframes show {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  .show-with-scale {
    animation: show-with-scale var(--show-duration) ease;
  }

  .hide-with-scale {
    animation: show-with-scale var(--hide-duration) ease reverse;
  }

  @keyframes show-with-scale {
    from {
      opacity: 0;
      scale: 0.8;
    }
    to {
      opacity: 1;
      scale: 1;
    }
  }
`;function Bi(e){return Hi(e)}function Vi(e){return e.assignedSlot?e.assignedSlot:e.parentNode instanceof ShadowRoot?e.parentNode.host:e.parentNode}function Hi(e){for(let t=e;t;t=Vi(t))if(t instanceof Element&&getComputedStyle(t).display===`none`)return null;for(let t=Vi(e);t;t=Vi(t)){if(!(t instanceof Element))continue;let e=getComputedStyle(t);if(e.display!==`contents`&&(e.position!==`static`||Gr(e)||t.tagName===`BODY`))return t}return null}function Ui(e){return typeof e==`object`&&!!e&&`getBoundingClientRect`in e&&(`contextElement`in e?e instanceof Element:!0)}var Wi=!!globalThis?.HTMLElement?.prototype.hasOwnProperty(`popover`),q=class extends L{constructor(){super(...arguments),this.localize=new Vt(this),this.SUPPORTS_POPOVER=!1,this.active=!1,this.placement=`top`,this.boundary=`viewport`,this.distance=0,this.skidding=0,this.arrow=!1,this.arrowPlacement=`anchor`,this.arrowPadding=10,this.flip=!1,this.flipFallbackPlacements=``,this.flipFallbackStrategy=`best-fit`,this.flipPadding=0,this.shift=!1,this.shiftPadding=0,this.autoSizePadding=0,this.hoverBridge=!1,this.updateHoverBridge=()=>{if(this.hoverBridge&&this.anchorEl&&this.popup){let e=this.anchorEl.getBoundingClientRect(),t=this.popup.getBoundingClientRect(),n=this.placement.includes(`top`)||this.placement.includes(`bottom`),r=0,i=0,a=0,o=0,s=0,c=0,l=0,u=0;n?e.top<t.top?(r=e.left,i=e.bottom,a=e.right,o=e.bottom,s=t.left,c=t.top,l=t.right,u=t.top):(r=t.left,i=t.bottom,a=t.right,o=t.bottom,s=e.left,c=e.top,l=e.right,u=e.top):e.left<t.left?(r=e.right,i=e.top,a=t.left,o=t.top,s=e.right,c=e.bottom,l=t.left,u=t.bottom):(r=t.right,i=t.top,a=e.left,o=e.top,s=t.right,c=t.bottom,l=e.left,u=e.bottom),this.style.setProperty(`--hover-bridge-top-left-x`,`${r}px`),this.style.setProperty(`--hover-bridge-top-left-y`,`${i}px`),this.style.setProperty(`--hover-bridge-top-right-x`,`${a}px`),this.style.setProperty(`--hover-bridge-top-right-y`,`${o}px`),this.style.setProperty(`--hover-bridge-bottom-left-x`,`${s}px`),this.style.setProperty(`--hover-bridge-bottom-left-y`,`${c}px`),this.style.setProperty(`--hover-bridge-bottom-right-x`,`${l}px`),this.style.setProperty(`--hover-bridge-bottom-right-y`,`${u}px`)}}}async connectedCallback(){super.connectedCallback(),await this.updateComplete,this.SUPPORTS_POPOVER=Wi,this.start()}disconnectedCallback(){super.disconnectedCallback(),this.stop()}async updated(e){super.updated(e),e.has(`active`)&&(this.active?this.start():this.stop()),e.has(`anchor`)&&this.handleAnchorChange(),this.active&&(await this.updateComplete,this.reposition())}async handleAnchorChange(){if(await this.stop(),this.anchor&&typeof this.anchor==`string`){let e=this.getRootNode();this.anchorEl=e.getElementById(this.anchor)}else this.anchorEl=this.anchor instanceof Element||Ui(this.anchor)?this.anchor:this.querySelector(`[slot="anchor"]`);this.anchorEl instanceof HTMLSlotElement&&(this.anchorEl=this.anchorEl.assignedElements({flatten:!0})[0]),this.anchorEl&&this.start()}start(){this.anchorEl&&this.active&&this.isConnected&&(this.popup?.showPopover?.(),this.cleanup=ki(this.anchorEl,this.popup,()=>{this.reposition()}))}async stop(){return new Promise(e=>{this.popup?.hidePopover?.(),this.cleanup?(this.cleanup(),this.cleanup=void 0,this.removeAttribute(`data-current-placement`),this.style.removeProperty(`--auto-size-available-width`),this.style.removeProperty(`--auto-size-available-height`),requestAnimationFrame(()=>e())):e()})}reposition(){if(!this.active||!this.anchorEl||!this.popup)return;let e=[Ai({mainAxis:this.distance,crossAxis:this.skidding})];this.sync?e.push(Ni({apply:({rects:e})=>{let t=this.sync===`width`||this.sync===`both`,n=this.sync===`height`||this.sync===`both`;this.popup.style.width=t?`${e.reference.width}px`:``,this.popup.style.height=n?`${e.reference.height}px`:``}})):(this.popup.style.width=``,this.popup.style.height=``);let t;this.SUPPORTS_POPOVER&&!Ui(this.anchor)&&this.boundary===`scroll`&&(t=$r(this.anchorEl).filter(e=>e instanceof Element)),this.flip&&e.push(Mi({boundary:this.flipBoundary||t,fallbackPlacements:this.flipFallbackPlacements,fallbackStrategy:this.flipFallbackStrategy===`best-fit`?`bestFit`:`initialPlacement`,padding:this.flipPadding})),this.shift&&e.push(ji({boundary:this.shiftBoundary||t,padding:this.shiftPadding})),this.autoSize?e.push(Ni({boundary:this.autoSizeBoundary||t,padding:this.autoSizePadding,apply:({availableWidth:e,availableHeight:t})=>{this.autoSize===`vertical`||this.autoSize===`both`?this.style.setProperty(`--auto-size-available-height`,`${t}px`):this.style.removeProperty(`--auto-size-available-height`),this.autoSize===`horizontal`||this.autoSize===`both`?this.style.setProperty(`--auto-size-available-width`,`${e}px`):this.style.removeProperty(`--auto-size-available-width`)}})):(this.style.removeProperty(`--auto-size-available-width`),this.style.removeProperty(`--auto-size-available-height`)),this.arrow&&e.push(Pi({element:this.arrowEl,padding:this.arrowPadding}));let n=this.SUPPORTS_POPOVER?e=>Ei.getOffsetParent(e,Bi):Ei.getOffsetParent;Fi(this.anchorEl,this.popup,{placement:this.placement,middleware:e,strategy:this.SUPPORTS_POPOVER?`absolute`:`fixed`,platform:{...Ei,getOffsetParent:n}}).then(({x:e,y:t,middlewareData:n,placement:r})=>{let i=this.localize.dir()===`rtl`,a={top:`bottom`,right:`left`,bottom:`top`,left:`right`}[r.split(`-`)[0]];if(this.setAttribute(`data-current-placement`,r),Object.assign(this.popup.style,{left:`${e}px`,top:`${t}px`}),this.arrow){let e=n.arrow.x,t=n.arrow.y,r=``,o=``,s=``,c=``;if(this.arrowPlacement===`start`){let n=typeof e==`number`?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:``;r=typeof t==`number`?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:``,o=i?n:``,c=i?``:n}else if(this.arrowPlacement===`end`){let n=typeof e==`number`?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:``;o=i?``:n,c=i?n:``,s=typeof t==`number`?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:``}else this.arrowPlacement===`center`?(c=typeof e==`number`?`calc(50% - var(--arrow-size-diagonal))`:``,r=typeof t==`number`?`calc(50% - var(--arrow-size-diagonal))`:``):(c=typeof e==`number`?`${e}px`:``,r=typeof t==`number`?`${t}px`:``);Object.assign(this.arrowEl.style,{top:r,right:o,bottom:s,left:c,[a]:`calc(var(--arrow-base-offset) - var(--arrow-size-diagonal))`})}}),requestAnimationFrame(()=>this.updateHoverBridge()),this.dispatchEvent(new Ri)}render(){return T`
      <slot name="anchor" @slotchange=${this.handleAnchorChange}></slot>

      <span
        part="hover-bridge"
        class=${Gt({"popup-hover-bridge":!0,"popup-hover-bridge-visible":this.hoverBridge&&this.active})}
      ></span>

      <div
        popover="manual"
        part="popup"
        class=${Gt({popup:!0,"popup-active":this.active,"popup-fixed":!this.SUPPORTS_POPOVER,"popup-has-arrow":this.arrow})}
      >
        <slot></slot>
        ${this.arrow?T`<div part="arrow" class="arrow" role="presentation"></div>`:``}
      </div>
    `}};q.css=zi,I([M(`.popup`)],q.prototype,`popup`,2),I([M(`.arrow`)],q.prototype,`arrowEl`,2),I([A({attribute:!1,type:Boolean})],q.prototype,`SUPPORTS_POPOVER`,2),I([A()],q.prototype,`anchor`,2),I([A({type:Boolean,reflect:!0})],q.prototype,`active`,2),I([A({reflect:!0})],q.prototype,`placement`,2),I([A()],q.prototype,`boundary`,2),I([A({type:Number})],q.prototype,`distance`,2),I([A({type:Number})],q.prototype,`skidding`,2),I([A({type:Boolean})],q.prototype,`arrow`,2),I([A({attribute:`arrow-placement`})],q.prototype,`arrowPlacement`,2),I([A({attribute:`arrow-padding`,type:Number})],q.prototype,`arrowPadding`,2),I([A({type:Boolean})],q.prototype,`flip`,2),I([A({attribute:`flip-fallback-placements`,converter:{fromAttribute:e=>e.split(` `).map(e=>e.trim()).filter(e=>e!==``),toAttribute:e=>e.join(` `)}})],q.prototype,`flipFallbackPlacements`,2),I([A({attribute:`flip-fallback-strategy`})],q.prototype,`flipFallbackStrategy`,2),I([A({type:Object})],q.prototype,`flipBoundary`,2),I([A({attribute:`flip-padding`,type:Number})],q.prototype,`flipPadding`,2),I([A({type:Boolean})],q.prototype,`shift`,2),I([A({type:Object})],q.prototype,`shiftBoundary`,2),I([A({attribute:`shift-padding`,type:Number})],q.prototype,`shiftPadding`,2),I([A({attribute:`auto-size`})],q.prototype,`autoSize`,2),I([A()],q.prototype,`sync`,2),I([A({type:Object})],q.prototype,`autoSizeBoundary`,2),I([A({attribute:`auto-size-padding`,type:Number})],q.prototype,`autoSizePadding`,2),I([A({attribute:`hover-bridge`,type:Boolean})],q.prototype,`hoverBridge`,2),q=I([k(`wa-popup`)],q);var Gi=class{constructor(e,t){this.element=e,this.callback=t}start(...e){this.observer??=new ResizeObserver(()=>this.check()),this.observer.observe(this.element);for(let t of e)this.observer.observe(t);this.initialCheckHandle??=requestAnimationFrame(()=>{this.initialCheckHandle=void 0,this.check()})}stop(){this.initialCheckHandle!==void 0&&(cancelAnimationFrame(this.initialCheckHandle),this.initialCheckHandle=void 0),this.observer?.disconnect()}check(){this.callback(this.element.getClientRects().length>0)}},Ki=new Set;function qi(){let e=document.documentElement.clientWidth;return Math.abs(window.innerWidth-e)}function Ji(){let e=Number(getComputedStyle(document.body).paddingRight.replace(/px/,``));return isNaN(e)||!e?0:e}function Yi(e){if(Ki.add(e),!document.documentElement.classList.contains(`wa-scroll-lock`)){let e=qi()+Ji(),t=getComputedStyle(document.documentElement).scrollbarGutter;(!t||t===`auto`)&&(t=`stable`),e<2&&(t=``),document.documentElement.style.setProperty(`--wa-scroll-lock-gutter`,t),document.documentElement.classList.add(`wa-scroll-lock`),document.documentElement.style.setProperty(`--wa-scroll-lock-size`,`${e}px`)}}function Xi(e){Ki.delete(e),Ki.size===0&&(document.documentElement.classList.remove(`wa-scroll-lock`),document.documentElement.style.removeProperty(`--wa-scroll-lock-size`))}function Zi(e){return e.split(` `).map(e=>e.trim()).filter(e=>e!==``)}var Qi=p`
  :host {
    --width: 31rem;
    --spacing: var(--wa-space-l);
    --backdrop-filter: none;
    --show-duration: var(--wa-transition-normal);
    --hide-duration: var(--wa-transition-normal);

    display: none;
  }

  :host([open]) {
    display: block;
  }

  .dialog {
    display: flex;
    flex-direction: column;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: var(--width);
    max-width: calc(100% - var(--wa-space-2xl));
    max-height: calc(100% - var(--wa-space-2xl));
    color: inherit;
    background-color: var(--wa-color-surface-raised);
    border-radius: var(--wa-panel-border-radius);
    border: none;
    box-shadow: var(--wa-shadow-l);
    padding: 0;
    margin: auto;

    &.show {
      animation: show-dialog var(--show-duration) ease;

      &::backdrop {
        animation: show-backdrop var(--show-duration, 200ms) ease;
      }
    }

    &.hide {
      animation: show-dialog var(--hide-duration) ease reverse;

      &::backdrop {
        animation: show-backdrop var(--hide-duration, 200ms) ease reverse;
      }
    }

    &.pulse {
      animation: pulse 250ms ease;
    }
  }

  .dialog:focus {
    outline: none;
  }

  /* Ensure there's enough vertical padding for phones that don't update vh when chrome appears (e.g. iPhone) */
  @media screen and (max-width: 420px) {
    .dialog {
      max-height: 80vh;
    }
  }

  .open {
    display: flex;
    opacity: 1;
  }

  .header {
    flex: 0 0 auto;
    display: flex;
    flex-wrap: nowrap;

    padding-inline-start: var(--spacing);
    padding-block-end: 0;

    /* Subtract the close button's padding so that the X is visually aligned with the edges of the dialog content */
    padding-inline-end: calc(var(--spacing) - var(--wa-form-control-padding-block));
    padding-block-start: calc(var(--spacing) - var(--wa-form-control-padding-block));
  }

  .title {
    align-self: center;
    flex: 1 1 auto;
    font-family: inherit;
    font-size: var(--wa-font-size-l);
    font-weight: var(--wa-font-weight-heading);
    line-height: var(--wa-line-height-condensed);
    margin: 0;
  }

  .header-actions {
    align-self: start;
    display: flex;
    flex-shrink: 0;
    flex-wrap: wrap;
    justify-content: end;
    gap: var(--wa-space-2xs);
    padding-inline-start: var(--spacing);
  }

  .header-actions wa-button,
  .header-actions ::slotted(wa-button) {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
  }

  .body {
    flex: 1 1 auto;
    display: block;
    padding: var(--spacing);
    overflow: auto;
    -webkit-overflow-scrolling: touch;

    &:focus {
      outline: none;
    }

    &:focus-visible {
      outline: var(--wa-focus-ring);
      outline-offset: var(--wa-focus-ring-offset);
    }
  }

  .footer {
    flex: 0 0 auto;
    display: flex;
    flex-wrap: wrap;
    gap: var(--wa-space-xs);
    justify-content: end;
    padding: var(--spacing);
    padding-block-start: 0;
  }

  .footer ::slotted(wa-button:not(:first-of-type)) {
    margin-inline-start: var(--wa-spacing-xs);
  }

  .dialog::backdrop {
    /*
      NOTE: the ::backdrop element doesn't inherit properly in Safari yet, but it will in 17.4! At that time, we can
      remove the fallback values here.
    */
    background-color: var(--wa-color-overlay-modal, rgb(0 0 0 / 0.25));
    backdrop-filter: var(--backdrop-filter);
  }

  @keyframes pulse {
    0% {
      scale: 1;
    }
    50% {
      scale: 1.02;
    }
    100% {
      scale: 1;
    }
  }

  @keyframes show-dialog {
    from {
      opacity: 0;
      scale: 0.8;
    }
    to {
      opacity: 1;
      scale: 1;
    }
  }

  @keyframes show-backdrop {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @media (forced-colors: active) {
    .dialog {
      border: solid 1px white;
    }
  }
`,$i=class extends L{constructor(){super(...arguments),this.localize=new Vt(this),this.hasSlotController=new Et(this,`footer`,`header-actions`,`label`),this.renderedWatcher=new Gi(this,e=>this.handleRenderedChange(e)),this.open=!1,this.label=``,this.withoutHeader=!1,this.lightDismiss=!1,this.withFooter=!1,this.handleDocumentKeyDown=e=>{e.key===`Escape`&&this.open&&Un(this)&&(e.preventDefault(),e.stopPropagation(),this.requestClose(this.dialog))}}firstUpdated(e){super.firstUpdated(e),this.open&&(this.addOpenListeners(),this.dialog.showModal(),Yi(this),this.renderedWatcher.start(this.dialog))}disconnectedCallback(){super.disconnectedCallback(),this.renderedWatcher.stop(),Xi(this),this.removeOpenListeners()}async requestClose(e){let t=new Ln({source:e});if(this.dispatchEvent(t),t.defaultPrevented){this.open=!0,qn(this.dialog,`pulse`);return}this.removeOpenListeners(),await qn(this.dialog,`hide`),this.open=!1,this.dialog.close(),Xi(this),this.renderedWatcher.stop();let n=this.originalTrigger;typeof n?.focus==`function`&&setTimeout(()=>n.focus()),this.dispatchEvent(new zn)}addOpenListeners(){document.addEventListener(`keydown`,this.handleDocumentKeyDown),Vn(this)}removeOpenListeners(){document.removeEventListener(`keydown`,this.handleDocumentKeyDown),Hn(this)}handleDialogCancel(e){e.preventDefault(),!this.dialog.classList.contains(`hide`)&&e.target===this.dialog&&Un(this)&&this.requestClose(this.dialog)}handleDialogClick(e){let t=e.target.closest(`[data-dialog="close"]`);t&&(e.stopPropagation(),this.requestClose(t))}async handleDialogPointerDown(e){e.target===this.dialog&&(this.lightDismiss?this.requestClose(this.dialog):await qn(this.dialog,`pulse`))}handleRenderedChange(e){if(!this.open){this.renderedWatcher.stop();return}!e&&this.dialog.open?(this.removeOpenListeners(),this.dialog.close(),Xi(this)):e&&!this.dialog.open&&(this.addOpenListeners(),this.dialog.showModal(),Yi(this))}handleOpenChange(){this.open&&!this.dialog.open?this.show():!this.open&&this.dialog.open?(this.open=!0,this.requestClose(this.dialog)):this.open||this.renderedWatcher.stop()}async show(){let e=new In;if(this.dispatchEvent(e),e.defaultPrevented){this.open=!1;return}this.addOpenListeners(),this.originalTrigger=document.activeElement,this.open=!0,this.dialog.showModal(),Yi(this),this.renderedWatcher.start(this.dialog),requestAnimationFrame(()=>{let e=this.querySelector(`[autofocus]`);e&&typeof e.focus==`function`?e.focus():this.dialog.focus()}),await qn(this.dialog,`show`),this.dispatchEvent(new Rn)}render(){let e=!this.withoutHeader,t=this.hasSlotController.test(`footer`,`withFooter`);return T`
      <dialog
        part="dialog"
        class=${Gt({dialog:!0,open:this.open})}
        @cancel=${this.handleDialogCancel}
        @click=${this.handleDialogClick}
        @pointerdown=${this.handleDialogPointerDown}
      >
        ${e?T`
              <div part="header" class="header">
                <h2 part="title" class="title" id="title">
                  <!-- If there's no label, use an invisible character to prevent the header from collapsing -->
                  <slot name="label"> ${this.label.length>0?this.label:`​`} </slot>
                </h2>
                <div part="header-actions" class="header-actions">
                  <slot name="header-actions"></slot>
                  <wa-button
                    part="close-button"
                    exportparts="base:close-button__base"
                    class="close"
                    appearance="plain"
                    @click="${e=>this.requestClose(e.target)}"
                  >
                    <wa-icon
                      name="xmark"
                      label=${this.localize.term(`close`)}
                      library="system"
                      variant="solid"
                    ></wa-icon>
                  </wa-button>
                </div>
              </div>
            `:``}

        <div part="body" class="body"><slot></slot></div>

        <!-- Use a hidden element so we still get "slotchange" events. -->
        <div part="footer" class="footer" ?hidden=${!t}>
          <slot name="footer"></slot>
        </div>
      </dialog>
    `}};$i.css=Qi,I([M(`.dialog`)],$i.prototype,`dialog`,2),I([A({type:Boolean,reflect:!0})],$i.prototype,`open`,2),I([A({reflect:!0})],$i.prototype,`label`,2),I([A({attribute:`without-header`,type:Boolean,reflect:!0})],$i.prototype,`withoutHeader`,2),I([A({attribute:`light-dismiss`,type:Boolean})],$i.prototype,`lightDismiss`,2),I([A({attribute:`with-footer`,type:Boolean})],$i.prototype,`withFooter`,2),I([z(`open`,{waitUntilFirstUpdate:!0})],$i.prototype,`handleOpenChange`,1),$i=I([k(`wa-dialog`)],$i),document.addEventListener(`click`,e=>{let t=e.target.closest(`[data-dialog]`);if(t instanceof Element){let[e,n]=Zi(t.getAttribute(`data-dialog`)||``);if(e===`open`&&n?.length){let e=t.getRootNode().getElementById(n);e?.localName===`wa-dialog`?e.open=!0:console.warn(`A dialog with an ID of "${n}" could not be found in this document.`)}}}),document.addEventListener(`pointerdown`,()=>{});var ea=class extends Event{constructor(){super(`wa-clear`,{bubbles:!0,cancelable:!1,composed:!0})}};function ta(e,t){let n=e.metaKey||e.ctrlKey||e.shiftKey||e.altKey;e.key===`Enter`&&!n&&setTimeout(()=>{!e.defaultPrevented&&!e.isComposing&&na(t)})}function na(e){let t=null;if(`form`in e&&(t=e.form),!t&&`getForm`in e&&(t=e.getForm()),!t)return;let n=[...t.elements];if(n.length===1){t.requestSubmit(null);return}let r=n.find(e=>e.type===`submit`&&!e.matches(`:disabled`));r&&([`input`,`button`].includes(r.localName)?t.requestSubmit(r):r.click())}var ra=p`
  :host {
    border-width: 0;
  }

  :host(:focus) {
    outline: none;
  }

  .text-field {
    display: flex;
    align-items: stretch;
    justify-content: start;
    position: relative;
    transition: inherit;
    height: var(--wa-form-control-height);
    border-color: var(--wa-form-control-border-color);
    border-radius: var(--wa-form-control-border-radius);
    border-style: var(--wa-form-control-border-style);
    border-width: var(--wa-form-control-border-width);
    cursor: text;
    color: var(--wa-form-control-value-color);
    font-size: var(--wa-form-control-value-font-size);
    font-family: inherit;
    font-weight: var(--wa-form-control-value-font-weight);
    line-height: var(--wa-form-control-value-line-height);
    vertical-align: middle;
    width: 100%;
    transition:
      background-color var(--wa-transition-normal),
      border-color var(--wa-transition-normal),
      outline-color var(--wa-transition-fast);
    transition-timing-function: var(--wa-transition-easing);
    background-color: var(--wa-form-control-background-color);
    box-shadow: var(--box-shadow);
    padding: 0 var(--wa-form-control-padding-inline);
    outline: var(--wa-focus-ring-style) var(--wa-focus-ring-width) transparent;
    outline-offset: var(--wa-focus-ring-offset);

    /* Only ring the field when the text input has focus, not inner buttons */
    &:has(input:focus, textarea:focus) {
      outline-color: var(--wa-color-focus);
    }

    /* Style disabled inputs */
    &:has(:disabled) {
      cursor: not-allowed;
      opacity: 0.5;
    }
  }

  /* Appearance modifiers */
  :host([appearance='outlined']) .text-field {
    background-color: var(--wa-form-control-background-color);
    border-color: var(--wa-form-control-border-color);
  }

  :host([appearance='filled']) .text-field {
    background-color: var(--wa-color-neutral-fill-quiet);
    border-color: var(--wa-color-neutral-fill-quiet);
  }

  :host([appearance='filled-outlined']) .text-field {
    background-color: var(--wa-color-neutral-fill-quiet);
    border-color: var(--wa-form-control-border-color);
  }

  :host([pill]) .text-field {
    border-radius: var(--wa-border-radius-pill) !important;
  }

  .text-field {
    /* Show autofill styles over the entire text field, not just the native <input> */
    &:has(:autofill),
    &:has(:-webkit-autofill) {
      background-color: var(--wa-color-brand-fill-quiet) !important;
    }

    input,
    textarea {
      /*
      Fixes an alignment issue with placeholders.
      https://github.com/shoelace-style/webawesome/issues/342
    */
      height: 100%;

      padding: 0;
      border: none;
      outline: none;
      box-shadow: none;
      margin: 0;
      cursor: inherit;
      -webkit-appearance: none;
      font: inherit;

      /* Turn off Safari's autofill styles */
      &:-webkit-autofill,
      &:-webkit-autofill:hover,
      &:-webkit-autofill:focus,
      &:-webkit-autofill:active {
        -webkit-background-clip: text;
        background-color: transparent;
        -webkit-text-fill-color: inherit;
      }
    }
  }

  input {
    flex: 1 1 auto;
    min-width: 0;
    height: 100%;
    transition: inherit;

    /* prettier-ignore */
    background-color: rgb(118 118 118 / 0); /* ensures proper placeholder styles in webkit's date input */
    height: calc(var(--wa-form-control-height) - var(--border-width) * 2);
    padding-block: 0;
    color: inherit;

    &:autofill {
      &,
      &:hover,
      &:focus,
      &:active {
        box-shadow: none;
        caret-color: var(--wa-form-control-value-color);
      }
    }

    &::placeholder {
      color: var(--wa-form-control-placeholder-color);
      user-select: none;
      -webkit-user-select: none;
    }

    &::-webkit-search-decoration,
    &::-webkit-search-cancel-button,
    &::-webkit-search-results-button,
    &::-webkit-search-results-decoration {
      -webkit-appearance: none;
    }

    &:focus {
      outline: none;
    }
  }

  textarea {
    &:autofill {
      &,
      &:hover,
      &:focus,
      &:active {
        box-shadow: none;
        caret-color: var(--wa-form-control-value-color);
      }
    }

    &::placeholder {
      color: var(--wa-form-control-placeholder-color);
      user-select: none;
      -webkit-user-select: none;
    }
  }

  .start,
  .end {
    display: inline-flex;
    flex: 0 0 auto;
    align-items: center;
    cursor: default;

    &::slotted(wa-icon) {
      color: var(--wa-color-neutral-on-quiet);
    }
  }

  .start::slotted(*) {
    margin-inline-end: var(--wa-form-control-padding-inline);
  }

  .end::slotted(*) {
    margin-inline-start: var(--wa-form-control-padding-inline);
  }

  /*
   * Clearable + Password Toggle
   */

  .clear,
  .password-toggle {
    position: relative;
    display: inline-flex;
    align-self: center;
    align-items: center;
    justify-content: center;
    aspect-ratio: 1;
    height: 1.5em;
    font-size: inherit;
    color: var(--wa-color-neutral-on-quiet);
    border: none;
    border-radius: var(--wa-border-radius-s);
    background: none;
    padding: 0;
    transition: var(--wa-transition-normal) color;
    cursor: pointer;
    /* The box is wider than the glyph, so overhang half of that growth on each side. Keeps the
       glyph flush with the field's trailing padding edge, like every other form control. */
    margin-inline-start: calc(var(--wa-form-control-padding-inline) - 0.125em);
    margin-inline-end: -0.125em;

    &::after {
      content: '';
      position: absolute;
      inset-inline: 0;
      height: var(--wa-form-control-height);
    }

    @media (hover: hover) {
      &:hover {
        color: color-mix(in oklab, currentColor, var(--wa-color-mix-hover));
      }
    }

    &:active {
      color: color-mix(in oklab, currentColor, var(--wa-color-mix-active));
    }

    &:focus {
      outline: none;
    }

    &:focus-visible {
      outline: var(--wa-focus-ring);
      outline-offset: var(--wa-focus-ring-offset);
    }
  }

  /* Don't show the browser's password toggle in Edge */
  ::-ms-reveal {
    display: none;
  }

  /* Hide the built-in number spinner */
  :host([without-spin-buttons]) input[type='number'] {
    -moz-appearance: textfield;

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      display: none;
    }
  }
`,ia=p`
  :host {
    display: flex;
    flex-direction: column;
  }

  /* Treat wrapped labels, inputs, and hints as direct children of the host element */
  [part~='form-control'] {
    display: contents;
  }

  /* Label */
  :is([part~='form-control-label'], [part~='label']):has(*:not(:empty)),
  :is([part~='form-control-label'], [part~='label']).has-label {
    display: inline-flex;
    color: var(--wa-form-control-label-color);
    font-weight: var(--wa-form-control-label-font-weight);
    line-height: var(--wa-form-control-label-line-height);
    margin-block-end: 0.5em;
  }

  :host([required]) :is([part~='form-control-label'], [part~='label'])::after {
    content: var(--wa-form-control-required-content);
    margin-inline-start: var(--wa-form-control-required-content-offset);
    color: var(--wa-form-control-required-content-color);
  }

  /* Help text */
  [part~='hint'] {
    display: block;
    color: var(--wa-form-control-hint-color);
    font-weight: var(--wa-form-control-hint-font-weight);
    line-height: var(--wa-form-control-hint-line-height);
    margin-block-start: 0.5em;
    font-size: var(--wa-font-size-smaller);

    &:not(.has-slotted, .has-hint, .has-count) {
      display: none;
    }
  }
`,aa=Ut(class extends Wt{constructor(e){if(super(e),e.type!==Ht.PROPERTY&&e.type!==Ht.ATTRIBUTE&&e.type!==Ht.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!wn(e))throw Error("`live` bindings can only contain a single expression")}render(e){return e}update(e,[t]){if(t===E||t===D)return t;let n=e.element,r=e.name;if(e.type===Ht.PROPERTY){if(t===n[r])return E}else if(e.type===Ht.BOOLEAN_ATTRIBUTE){if(!!t===n.hasAttribute(r))return E}else if(e.type===Ht.ATTRIBUTE&&n.getAttribute(r)===t+``)return E;return En(e),t}}),J=class extends R{constructor(){super(...arguments),this.assumeInteractionOn=[`blur`,`input`],this.hasSlotController=new Et(this,`hint`,`label`),this.localize=new Vt(this),this.title=``,this.type=`text`,this._value=null,this.defaultValue=this.getAttribute(`value`)||null,this.size=`m`,this.appearance=`outlined`,this.pill=!1,this.label=``,this.hint=``,this.withClear=!1,this.placeholder=``,this.readonly=!1,this.passwordToggle=!1,this.passwordVisible=!1,this.withoutSpinButtons=!1,this.required=!1,this.spellcheck=!0,this.withLabel=!1,this.withHint=!1}static get validators(){return[...super.validators,ct()]}get value(){return this.valueHasChanged?this._value:this._value??this.defaultValue}set value(e){this._value!==e&&(this.valueHasChanged=!0,this._value=e)}updateFormValue(e){if(e==null){this.setValue(``,null);return}super.updateFormValue(e)}handleSizeChange(){Tt(this.localName,this.size)}handleChange(e){this.value=this.input.value,this.relayNativeEvent(e,{bubbles:!0,composed:!0})}handleClearClick(e){e.preventDefault(),this.value!==``&&(this.value=``,this.updateComplete.then(()=>{this.dispatchEvent(new ea),this.dispatchEvent(new InputEvent(`input`,{bubbles:!0,composed:!0})),this.dispatchEvent(new Event(`change`,{bubbles:!0,composed:!0}))})),this.input.focus()}handleInput(){this.value=this.input.value}handleKeyDown(e){ta(e,this)}handlePasswordToggle(){this.passwordVisible=!this.passwordVisible}updated(e){super.updated(e),(e.has(`value`)||e.has(`defaultValue`)||e.has(`type`))&&(this.input&&[`number`,`date`,`time`,`datetime-local`].includes(this.type)&&this.value&&this.input.value!==this.value&&(this._value=this.input.value),this.customStates.set(`blank`,!this.value),this.updateValidity())}handleStepChange(){this.input.step=String(this.step),this.updateValidity()}focus(e){this.input.focus(e)}blur(){this.input.blur()}select(){this.input.select()}setSelectionRange(e,t,n=`none`){this.input.setSelectionRange(e,t,n)}setRangeText(e,t,n,r=`preserve`){let i=t??this.input.selectionStart,a=n??this.input.selectionEnd;this.input.setRangeText(e,i,a,r),this.value!==this.input.value&&(this.value=this.input.value)}showPicker(){`showPicker`in HTMLInputElement.prototype&&this.input.showPicker()}stepUp(){this.input.stepUp(),this.value!==this.input.value&&(this.value=this.input.value)}stepDown(){this.input.stepDown(),this.value!==this.input.value&&(this.value=this.input.value)}formResetCallback(){this.value=null,this.input&&(this.input.value=this.value),super.formResetCallback()}render(){let e=this.hasSlotController.test(`label`,`withLabel`),t=this.hasSlotController.test(`hint`,`withHint`),n=this.label?!0:!!e,r=this.hint?!0:!!t,i=this.withClear&&!this.disabled&&!this.readonly,a=(!this.didSSR||this.hasUpdated)&&i&&(typeof this.value==`number`||this.value&&this.value.length>0);return T`
      <label
        part="form-control-label label"
        class=${Gt({label:!0,"has-label":n})}
        for="input"
        aria-hidden=${n?`false`:`true`}
      >
        <slot name="label">${this.label}</slot>
      </label>

      <div part="base input-wrapper" class="text-field">
        <slot name="start" part="start" class="start"></slot>

        <input
          part="input"
          id="input"
          class="control"
          type=${this.type===`password`&&this.passwordVisible?`text`:this.type}
          title=${this.title}
          name=${B(this.name)}
          ?disabled=${this.disabled}
          ?readonly=${this.readonly}
          ?required=${this.required}
          placeholder=${B(this.placeholder)}
          minlength=${B(this.minlength)}
          maxlength=${B(this.maxlength)}
          min=${B(this.min)}
          max=${B(this.max)}
          step=${B(this.step)}
          .value=${aa(this.value??``)}
          autocapitalize=${B(this.autocapitalize)}
          autocomplete=${B(this.autocomplete)}
          autocorrect=${this.autocorrect?`on`:`off`}
          ?autofocus=${this.autofocus}
          spellcheck=${this.spellcheck}
          pattern=${B(this.pattern)}
          enterkeyhint=${B(this.enterkeyhint)}
          inputmode=${B(this.inputmode)}
          aria-describedby="hint"
          @change=${this.handleChange}
          @input=${this.handleInput}
          @keydown=${this.handleKeyDown}
        />

        ${a?T`
              <button
                part="clear-button"
                class="clear"
                type="button"
                aria-label=${this.localize.term(`clearEntry`)}
                @click=${this.handleClearClick}
                tabindex="-1"
              >
                <slot name="clear-icon">
                  <wa-icon name="circle-xmark" library="system" variant="regular"></wa-icon>
                </slot>
              </button>
            `:``}
        ${this.passwordToggle&&!this.disabled?T`
              <button
                part="password-toggle-button"
                class="password-toggle"
                type="button"
                aria-label=${this.localize.term(this.passwordVisible?`hidePassword`:`showPassword`)}
                @click=${this.handlePasswordToggle}
              >
                ${this.passwordVisible?T`
                      <slot name="hide-password-icon">
                        <wa-icon name="eye-slash" library="system" variant="regular"></wa-icon>
                      </slot>
                    `:T`
                      <slot name="show-password-icon">
                        <wa-icon name="eye" library="system" variant="regular"></wa-icon>
                      </slot>
                    `}
              </button>
            `:``}

        <slot name="end" part="end" class="end"></slot>
      </div>

      <slot
        id="hint"
        part="hint"
        name="hint"
        class=${Gt({"has-slotted":r})}
        aria-hidden=${r?`false`:`true`}
        >${this.hint}</slot
      >
    `}};J.css=[Dt,ia,ra],J.shadowRootOptions={...R.shadowRootOptions,delegatesFocus:!0},I([M(`input`)],J.prototype,`input`,2),I([A()],J.prototype,`title`,2),I([A({reflect:!0})],J.prototype,`type`,2),I([j()],J.prototype,`value`,1),I([A({attribute:`value`,reflect:!0})],J.prototype,`defaultValue`,2),I([A({reflect:!0})],J.prototype,`size`,2),I([z(`size`)],J.prototype,`handleSizeChange`,1),I([A({reflect:!0})],J.prototype,`appearance`,2),I([A({type:Boolean,reflect:!0})],J.prototype,`pill`,2),I([A()],J.prototype,`label`,2),I([A({attribute:`hint`})],J.prototype,`hint`,2),I([A({attribute:`with-clear`,type:Boolean})],J.prototype,`withClear`,2),I([A()],J.prototype,`placeholder`,2),I([A({type:Boolean,reflect:!0})],J.prototype,`readonly`,2),I([A({attribute:`password-toggle`,type:Boolean})],J.prototype,`passwordToggle`,2),I([A({attribute:`password-visible`,type:Boolean})],J.prototype,`passwordVisible`,2),I([A({attribute:`without-spin-buttons`,type:Boolean,reflect:!0})],J.prototype,`withoutSpinButtons`,2),I([A({type:Boolean,reflect:!0})],J.prototype,`required`,2),I([A()],J.prototype,`pattern`,2),I([A({type:Number})],J.prototype,`minlength`,2),I([A({type:Number})],J.prototype,`maxlength`,2),I([A()],J.prototype,`min`,2),I([A()],J.prototype,`max`,2),I([A()],J.prototype,`step`,2),I([A()],J.prototype,`autocapitalize`,2),I([A({type:Boolean,converter:{fromAttribute:e=>!(!e||e===`off`),toAttribute:e=>e?`on`:`off`}})],J.prototype,`autocorrect`,2),I([A()],J.prototype,`autocomplete`,2),I([A({type:Boolean})],J.prototype,`autofocus`,2),I([A()],J.prototype,`enterkeyhint`,2),I([A({type:Boolean,converter:{fromAttribute:e=>!(!e||e===`false`),toAttribute:e=>e?`true`:`false`}})],J.prototype,`spellcheck`,2),I([A()],J.prototype,`inputmode`,2),I([A({attribute:`with-label`,type:Boolean})],J.prototype,`withLabel`,2),I([A({attribute:`with-hint`,type:Boolean})],J.prototype,`withHint`,2),I([z(`step`,{waitUntilFirstUpdate:!0})],J.prototype,`handleStepChange`,1),J=I([k(`wa-input`)],J),J.disableWarning?.(`change-in-update`);var oa=class extends O{render(){return T`
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="2.5em"
        height="2.5em"
        viewBox="0 0 256 275"
      >
        <path d="M0 0h256v275H0z" fill="none" />
        <path
          fill="#ff385c"
          d="M252.154 194.867c-1.231-3.456-2.67-6.8-4.039-9.898c-2.107-4.766-4.314-9.541-6.449-14.157l-.169-.366c-19.04-41.23-39.475-83.026-60.738-124.222l-.903-1.75c-2.169-4.206-4.411-8.556-6.712-12.83a83.4 83.4 0 0 0-9.875-15.198a46 46 0 0 0-15.808-12.133a46.07 46.07 0 0 0-38.935.005a46 46 0 0 0-15.804 12.137a83.7 83.7 0 0 0-9.87 15.195c-2.32 4.313-4.584 8.703-6.773 12.949l-.838 1.625c-21.264 41.2-41.699 82.994-60.738 124.221l-.278.6c-2.098 4.54-4.267 9.236-6.339 13.922c-1.37 3.096-2.806 6.437-4.039 9.902a60.7 60.7 0 0 0-3.274 29.588a58.46 58.46 0 0 0 11.835 27.646a58.6 58.6 0 0 0 24.027 18.129a59.6 59.6 0 0 0 22.481 4.349c2.42 0 4.839-.142 7.243-.422a73.9 73.9 0 0 0 27.645-9.327c11.152-6.265 22.165-15.446 34.196-28.566c12.031 13.12 23.044 22.301 34.196 28.566a73.9 73.9 0 0 0 27.645 9.327a63 63 0 0 0 7.244.422a59.6 59.6 0 0 0 22.48-4.349a58.6 58.6 0 0 0 24.027-18.13a58.45 58.45 0 0 0 11.836-27.645a60.75 60.75 0 0 0-3.274-29.59M128 209.17c-14.893-18.878-24.45-36.409-27.804-51.106a45.2 45.2 0 0 1-.956-16.85a27.5 27.5 0 0 1 4.432-11.52a30.7 30.7 0 0 1 10.772-8.802a30.76 30.76 0 0 1 27.116.002a30.7 30.7 0 0 1 10.77 8.803a27.55 27.55 0 0 1 4.432 11.522a45.2 45.2 0 0 1-.96 16.856C152.444 172.77 142.89 190.296 128 209.17m110.032 12.802a40.9 40.9 0 0 1-8.275 19.33a41 41 0 0 1-16.8 12.677a42.8 42.8 0 0 1-21.088 2.758a55.7 55.7 0 0 1-21.055-7.191c-9.926-5.577-19.974-14.138-31.28-26.696c17.999-22.195 29.239-42.652 33.4-60.873a62.5 62.5 0 0 0 1.197-23.421a44.9 44.9 0 0 0-7.307-18.776a48.2 48.2 0 0 0-17.075-14.405a48.31 48.31 0 0 0-43.495-.002a48.2 48.2 0 0 0-17.075 14.403a44.9 44.9 0 0 0-7.308 18.771a62.5 62.5 0 0 0 1.19 23.412c4.16 18.229 15.4 38.69 33.406 60.892c-11.307 12.557-21.355 21.118-31.281 26.696a55.7 55.7 0 0 1-21.055 7.19a42.8 42.8 0 0 1-21.089-2.758a41 41 0 0 1-16.8-12.677a40.9 40.9 0 0 1-8.273-19.33a43.05 43.05 0 0 1 2.437-21.231c.983-2.761 2.132-5.471 3.556-8.69c2.015-4.555 4.153-9.185 6.221-13.661l.278-.602C49.394 136.792 69.716 95.23 90.864 54.255l.842-1.631c2.153-4.178 4.38-8.497 6.626-12.67a67.8 67.8 0 0 1 7.758-12.115a28.4 28.4 0 0 1 9.8-7.594a28.46 28.46 0 0 1 34.015 7.59a67.5 67.5 0 0 1 7.76 12.111c2.225 4.136 4.432 8.416 6.567 12.555l.904 1.756c21.147 40.97 41.469 82.531 60.404 123.535l.17.369c2.104 4.552 4.28 9.257 6.328 13.891c1.426 3.224 2.577 5.936 3.557 8.687a43.1 43.1 0 0 1 2.437 21.233"
        />
      </svg>
    `}};oa=N([k(`i-airbnb`)],oa);var sa=`airbnb.session`,ca=`session-changed`;function Y(){try{let e=localStorage.getItem(sa);return e?JSON.parse(e):null}catch{return null}}function la(e){let t={id:e.id,nombre:e.nombre,correo:e.correo,esAnfitrion:e.esAnfitrion,accessToken:e.accessToken,refreshToken:e.refreshToken};localStorage.setItem(sa,JSON.stringify(t)),window.dispatchEvent(new CustomEvent(ca))}function ua(){localStorage.removeItem(sa),window.dispatchEvent(new CustomEvent(ca))}var da=class extends Error{constructor(e,t){super(t),this.status=e}};async function fa(){let e=Y();if(!e)return!1;let t=await fetch(`/api/auth/refresh`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({refreshToken:e.refreshToken})});return t.ok?(la(await t.json()),!0):(ua(),!1)}async function X(e,t={},n=!1){let{method:r=`GET`,body:i,auth:a=!0}=t,o={},s=i instanceof FormData;i!==void 0&&!s&&(o[`Content-Type`]=`application/json`);let c=Y();a&&c&&(o.Authorization=`Bearer ${c.accessToken}`);let l=await fetch(`${e}`,{method:r,headers:o,body:i===void 0?void 0:s?i:JSON.stringify(i)});if(l.status===401&&a&&!n&&await fa())return X(e,t,!0);if(!l.ok)throw new da(l.status,await l.text()||l.statusText);let u=await l.text();return u?JSON.parse(u):void 0}var pa=()=>`airbnb.mis-anuncios.${Y()?.id??`anonimo`}`;function ma(){try{let e=localStorage.getItem(pa());return e?JSON.parse(e):[]}catch{return[]}}function ha(e){try{localStorage.setItem(pa(),JSON.stringify(e))}catch{}}function ga(e){ha([e,...ma().filter(t=>t.id!==e.id)])}function _a(e,t){ha(ma().map(n=>n.id===e?{...n,...t}:n))}var va=[`Lince`,`La Victoria`,`Miraflores`,`Barranco`,`San Isidro`,`Surco`,`Cusco`,`Máncora`],ya=[`Habitación`,`Departamento`,`Casa`,`Cabaña`];Array.from({length:54},(e,t)=>({id:t+1,titulo:[`Bonita habitación cerca a todo`,`Departamento compartido`,`Casa acogedora con vista`,`Cabaña tranquila`][t%4],ubicacion:va[t%va.length],tipoAlojamiento:ya[t%ya.length],precioDesde:120+t*37%400,categoria:[`Playa`,`Acampar`,`Cabañas`][t%3],categoriaId:[2,5,3][t%3],nombreAnfitrion:`Anfitrión Demo`,imagenPrincipal:`/casa-airbnb-layout.avif`,ratingPromedio:t%5==0?null:4+t%10/10,totalReviews:t%5==0?0:t*3%40,esFavoritoEntreHuespedes:t%7==0}));var Z={login(e){return X(`/api/auth/login`,{method:`POST`,body:e,auth:!1})},register(e){return X(`/api/auth/register`,{method:`POST`,body:e,auth:!1})},async logout(){await X(`/api/auth/logout`,{method:`POST`})},becomeHost(e){return X(`/api/auth/become-host`,{method:`PUT`,body:e})},me(){return X(`/api/usuarios/me`)},actualizarMe(e){return X(`/api/usuarios/me`,{method:`PUT`,body:e})},categorias(){return X(`/api/categorias`,{auth:!1})},servicios(){return X(`/api/servicios`,{auth:!1})},propiedades(e,t=0,n=18){let r=new URLSearchParams;return e.texto&&r.set(`texto`,e.texto),e.categoriaId&&r.set(`categoriaId`,String(e.categoriaId)),e.huespedes&&r.set(`huespedes`,String(e.huespedes)),e.servicioIds?.forEach(e=>r.append(`servicioIds`,String(e))),r.set(`pagina`,String(t)),r.set(`tamanio`,String(n)),X(`/api/propiedades?${r}`,{auth:!1})},favorito(e,t){return X(`/api/favoritos/${e}`,{method:t?`POST`:`DELETE`})},reservasRecibidas(){return X(`/api/reservas/recibidas`)},misPropiedades(){return Promise.resolve(ma())},crearPropiedad(e){return X(`/api/propiedades`,{method:`POST`,body:e}).then(t=>(ga({id:t.id,titulo:t.titulo??e.titulo,ubicacion:e.ubicacion,tipoAlojamiento:e.tipoAlojamiento,estado:t.estado??`BORRADOR`,imagenPrincipal:null}),t))},crearHabitacion(e,t){return X(`/api/propiedades/${e}/habitaciones`,{method:`POST`,body:t})},subirImagen(e,t){let n=new FormData;return n.append(`archivo`,t),X(`/api/propiedades/${e}/imagenes`,{method:`POST`,body:n}).then(t=>(ma().find(t=>t.id===e)?.imagenPrincipal===null&&_a(e,{imagenPrincipal:t.url.startsWith(`http`)?t.url:`${t.url}`}),t))},publicar(e){return X(`/api/propiedades/${e}/publicar`,{method:`POST`}).then(t=>(_a(e,{estado:t.estado??`PUBLICADA`}),t))}},ba=class extends O{constructor(...e){super(...e),this.open=!1,this.onClose=()=>{},this.loading=!1,this.error=``}static{this.styles=p`
    /* Oculta el asterisco de "required" (los inputs usan placeholder, sin etiqueta). */
    wa-input::part(form-control-label) {
      display: none;
    }

    .dialog-title {
      text-align: center;
      margin: 0em;
    }

    .dialog-description {
      margin-top: 0.5rem;
      font-weight: 600;
      color:#6a7282;
      line-height: 1.25;
      text-align: center;
    }

    wa-dialog::part(close-button__base) {
      height: fit-content;
      width: 2rem;
      padding: 0;
      border-radius: 9999px;
      margin-right: 1rem;
      margin-top: 0.5rem;
    }

    .dialog-error {
      margin: 0;
      color: #c10007;
      font-size: 0.875rem;
    }

    .dialog-form {
      .dialog-form-container {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        margin-bottom: 1rem;

        .dialog-form-label {
          font-weight: bold;
        }

        .dialog-form-input-name::part(base input-wrapper) {
          border-radius: 10px 10px 0 0;
          bottom: -1px;
        }
        .dialog-form-input-lastname::part(base input-wrapper) {
          border-radius: 0 0 10px 10px;
          top: -1px;
        }
      }

      .dialog-form-submit {
        width: 100%;
        margin-top: 1rem;

        &::part(base button) {
          background-color: #1b1b1b;
          color: white;
          font-size: 1rem;
          font-weight: bold;
          height: 3.25rem;
        }
      }
    }
  `}closeDialog(){this.dispatchEvent(new CustomEvent(`onClose`,{bubbles:!0,composed:!0}))}async submit(e){e.preventDefault();let t=e.currentTarget,n=e=>t.querySelector(`[name=${e}]`).value.trim(),r=`${n(`nombre`)} ${n(`apellido`)}`.trim();this.loading=!0,this.error=``;try{la(await Z.register({nombre:r,correo:n(`correo`),password:n(`password`)})),this.closeDialog()}catch(e){this.error=e.status===409?`Ese correo ya está registrado`:`No pudimos crear tu cuenta. Revisa los datos.`}finally{this.loading=!1}}render(){return T`<wa-dialog
      label=""
      class="dialog-without-header"
      ?open=${this.open}
      @wa-after-hide=${this.closeDialog}
    >
      <h2 class="dialog-title">Ahora creemos tu cuenta</h2>
      <p class="dialog-description">
        Esta informacion es obligatoria para reservar o anfitrionar
      </p>
      <form class="dialog-form" @submit=${this.submit}>
        <div class="dialog-form-container">
          <span class="dialog-form-label">Nombre legal</span>
          <div>
            <wa-input name="nombre" class="dialog-form-input-name" size="s" placeholder="Nombre" required></wa-input>
            <wa-input name="apellido" class="dialog-form-input-lastname" size="s" placeholder="Apellido" required></wa-input>
          </div>
        </div>
        <div class="dialog-form-container">
          <span class="dialog-form-label">Correo</span>
          <wa-input name="correo" type="email" size="s" placeholder="Correo electrónico" required></wa-input>
        </div>
        <div class="dialog-form-container">
          <span class="dialog-form-label">Contraseña</span>
          <wa-input name="password" type="password" class="dialog-form-input-password" size="s" placeholder="Contraseña" required></wa-input>
        </div>
        ${this.error?T`<p class="dialog-error" role="alert">${this.error}</p>`:``}
        <wa-button class="dialog-form-submit" size="xs" type="submit" ?loading=${this.loading}>Continuar</wa-button>
      </form>
    </wa-dialog> `}};N([A({type:Boolean})],ba.prototype,`open`,void 0),N([A({attribute:!1})],ba.prototype,`onClose`,void 0),N([j()],ba.prototype,`loading`,void 0),N([j()],ba.prototype,`error`,void 0),ba=N([k(`header-dialog-register`)],ba);var xa=class extends O{constructor(...e){super(...e),this.open=!1,this.onClose=()=>{},this.isOpenRegister=!1,this.loading=!1,this.error=``}static{this.styles=p`
    /* Oculta el asterisco de "required" (los inputs usan placeholder, sin etiqueta). */
    wa-input::part(form-control-label) {
      display: none;
    }

    .dialog-logo {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .dialog-title {
      text-align: center;
      margin-top: 0em;
    }

    wa-dialog::part(close-button__base) {
      height: fit-content;
      width: 2rem;
      padding: 0;
      border-radius: 9999px;
      margin-right: 1rem;
      margin-top: 0.5rem;
    }

    .dialog-form {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;

      .dialog-error {
        margin: 0;
        color: #c10007;
        font-size: 0.875rem;
      }

      .dialog-form-submit {
        width: 100%;
        margin-top: 1rem;

        &::part(button) {
          background-color: #e7000b;
          color: white;
          font-size: 1rem;
          font-weight: bold;
          height: 3.25rem;
        }
      }
    }

    .dialog-text-register {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 1rem;
      gap: 0.25rem;

      .dialog-text-register-parragraph {
        margin: 0;
      }

      .dialog-text-register-button::part(button) {
        padding: 0;
        height: fit-content;
        background-color: transparent;
        border: none;
        color: #e7000b;
        text-decoration: underline;
      }
    }
  `}closeDialog(){this.dispatchEvent(new CustomEvent(`onClose`,{bubbles:!0,composed:!0}))}openRegister(){this.closeDialog(),this.isOpenRegister=!0}closeRegister(){this.isOpenRegister=!1}async submit(e){e.preventDefault();let t=e.currentTarget,n=t.querySelector(`[name=correo]`).value,r=t.querySelector(`[name=password]`).value;this.loading=!0,this.error=``;try{la(await Z.login({correo:n,password:r})),this.closeDialog()}catch{this.error=`Correo o contraseña incorrectos`}finally{this.loading=!1}}render(){return T`<wa-dialog
        label=""
        class="dialog-without-header"
        ?open=${this.open}
        @wa-after-hide=${this.closeDialog}
      >
        <span class="dialog-logo">
          <i-airbnb></i-airbnb>
        </span>
        <h2 class="dialog-title">Inicia sesión</h2>
        <form class="dialog-form" @submit=${this.submit}>
          <wa-input
            name="correo"
            type="email"
            size="s"
            placeholder="Correo"
            required
          ></wa-input>
          <wa-input
            name="password"
            type="password"
            size="s"
            placeholder="Contraseña"
            required
          ></wa-input>
          ${this.error?T`<p class="dialog-error" role="alert">${this.error}</p>`:``}
          <wa-button
            class="dialog-form-submit"
            size="xs"
            type="submit"
            ?loading=${this.loading}
            >Continuar</wa-button
          >
        </form>
        <div class="dialog-text-register">
          <p class="dialog-text-register-parragraph">No tienes una cuenta?</p>
          <wa-button
            class="dialog-text-register-button"
            @click=${this.openRegister}
            >registrate</wa-button
          >
        </div>
      </wa-dialog>
      <header-dialog-register
        ?open=${this.isOpenRegister}
        @onClose=${this.closeRegister}
      ></header-dialog-register> `}};N([A({type:Boolean})],xa.prototype,`open`,void 0),N([A({attribute:!1})],xa.prototype,`onClose`,void 0),N([j()],xa.prototype,`isOpenRegister`,void 0),N([j()],xa.prototype,`loading`,void 0),N([j()],xa.prototype,`error`,void 0),xa=N([k(`header-dialog-login`)],xa);var Sa=class extends O{constructor(...e){super(...e),this.dialogOpen=!1,this.session=Y(),this.onSessionChange=()=>{this.session=Y()},this.menuAbierto=!1,this.cerrarMenu=e=>{e.composedPath().includes(this)||(this.menuAbierto=!1)},this.onEscape=e=>{e.key===`Escape`&&(this.menuAbierto=!1)}}static{this.styles=p`
    .header-stack {
      display: flex;
      align-items: center;
      column-gap: 0.75rem;

      .header-stack-action {
        font-size: 0.875rem;
        font-weight: bold;
        margin-right: 1rem;
        color: inherit;
        text-decoration: none;
      }

      .header-stack-initial {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 1.25rem;
        height: 1.25rem;
        font-weight: bold;
      }

      wa-button::part(button) {
        padding: 0.35rem 0.5rem;
        height: fit-content;
        border-radius: 9999px;
        /* background-color: #dcfce7; */
        background-color: #f3f4f6;
      }

      .menu-wrap {
        position: relative;
      }

      .menu {
        position: absolute;
        top: calc(100% + 0.75rem);
        right: 0;
        z-index: 20;
        width: 18.5rem;
        padding: 0.5rem 0;
        border-radius: 1rem;
        background: white;
        box-shadow: 0 8px 28px rgb(0 0 0 / 0.18);
        color: #222;
      }

      .menu-item {
        display: flex;
        align-items: center;
        gap: 1rem;
        width: 100%;
        padding: 0.875rem 1.25rem;
        border: none;
        background: transparent;
        font: inherit;
        font-size: 0.9375rem;
        text-align: left;
        color: inherit;
        cursor: pointer;
      }

      .menu-item:hover:not([aria-disabled="true"]) {
        background: #f7f7f7;
      }

      .menu-item[aria-disabled="true"] {
        opacity: 0.55;
        cursor: not-allowed;
      }

      .menu-divider {
        height: 1px;
        margin: 0.5rem 0;
        background: #ebebeb;
      }

      .menu-host {
        padding-top: 1rem;
        padding-bottom: 1rem;
      }

      .menu-host b {
        display: block;
        margin-bottom: 0.25rem;
        font-size: 0.9375rem;
      }

      .menu-host span {
        display: block;
        font-size: 0.8125rem;
        line-height: 1.3;
        color: #6a6a6a;
      }

      /* .header-stack-menu {
        padding: 0.75rem;
        border-radius: 9999px;
        background-color: #f3f4f6;

        .header-stack-menu-icon {
          display: flex;
        }
      } */
    }
  `}connectedCallback(){super.connectedCallback(),window.addEventListener(ca,this.onSessionChange),window.addEventListener(`click`,this.cerrarMenu),window.addEventListener(`keydown`,this.onEscape)}disconnectedCallback(){window.removeEventListener(ca,this.onSessionChange),window.removeEventListener(`click`,this.cerrarMenu),window.removeEventListener(`keydown`,this.onEscape),super.disconnectedCallback()}get hostHref(){return this.session?.esAnfitrion?`/hosting`:`/hosting/anuncios/nuevo`}async onSelect(e){switch(e.detail.item.value){case`perfil`:P(`/users/profile`);break;case`anfitrion`:P(this.hostHref);break;case`salir`:try{await Z.logout()}catch{}ua(),P(`/`)}}irA(e){this.menuAbierto=!1,P(e)}async cerrarSesion(){this.menuAbierto=!1;try{await Z.logout()}catch{}ua(),P(`/`)}abrirLogin(){this.menuAbierto=!1,this.dialogOpen=!0}renderMenu(){return T`<div class="menu" role="menu">
      <button class="menu-item menu-host" role="menuitem" @click=${()=>this.irA(this.hostHref)}>
        <div>
          <b>${this.session?.esAnfitrion?`Cambia al modo anfitrión`:`Conviértete en anfitrión`}</b>
          <span>Empieza a anfitrionar y genera ingresos adicionales, ¡es muy sencillo!</span>
        </div>
      </button>
      <div class="menu-divider"></div>
      ${this.session?T`<button class="menu-item" role="menuitem" @click=${()=>this.irA(`/users/profile`)}>Perfil</button>
            <button class="menu-item" role="menuitem" @click=${this.cerrarSesion}>Cerrar sesión</button>`:T`<button class="menu-item" role="menuitem" @click=${this.abrirLogin}>Iniciar sesión o registrarse</button>`}
    </div>`}openDialog(){this.dialogOpen=!0}closeDialog(){this.dialogOpen=!1}render(){return T`<div class="header-stack">
        <a class="header-stack-action" href=${this.hostHref}>Modo anfitrión</a>
        <!-- <span class="header-stack-profile">J</span> -->
        ${this.session?T`<wa-dropdown placement="bottom-end" @wa-select=${this.onSelect}>
              <wa-button
                slot="trigger"
                size="xs"
                class="header-stack-profile"
                aria-label="Menú de usuario"
              >
                <span class="header-stack-initial"
                  >${this.session.nombre.charAt(0).toUpperCase()}</span
                >
              </wa-button>
              <wa-dropdown-item value="perfil">Perfil</wa-dropdown-item>
              <wa-dropdown-item value="anfitrion">Modo anfitrión</wa-dropdown-item>
              <wa-dropdown-item value="salir">Cerrar sesión</wa-dropdown-item>
            </wa-dropdown>`:T`<wa-button
              size="xs"
              class="header-stack-profile"
              aria-label="Iniciar sesión"
              @click=${this.openDialog}
            >
              <i-user
                class="header-stack-profile-icon"
                width="20"
                height="20"
              ></i-user>
            </wa-button>`}
        <div class="menu-wrap">
          <wa-button
            class="header-stack-menu"
            aria-label="Menú principal"
            aria-haspopup="menu"
            aria-expanded=${this.menuAbierto}
            @click=${()=>this.menuAbierto=!this.menuAbierto}
          >
            <i-menu
              class="header-stack-menu-icon"
              width="20"
              height="20"
            ></i-menu>
          </wa-button>
          ${this.menuAbierto?this.renderMenu():``}
        </div>
      </div>
      <header-dialog-login
        ?open=${this.dialogOpen}
        @onClose=${this.closeDialog}
      ></header-dialog-login> `}};N([j()],Sa.prototype,`dialogOpen`,void 0),N([j()],Sa.prototype,`session`,void 0),N([j()],Sa.prototype,`menuAbierto`,void 0),Sa=N([k(`header-profile`)],Sa);var Ca=class extends O{constructor(...e){super(...e),this.ruta=window.location.pathname,this.onRuta=()=>{this.ruta=window.location.pathname}}static{this.styles=p`
    .header-nav-host {
      display: flex;
      justify-content: center;
      align-items: center;
      column-gap: 1rem;

      .header-nav-host-list {
        display: flex;
        column-gap: 2rem;
        align-items: center;
        list-style: none;

        .list-item {
          font-size: 0.875rem;
          font-weight: bold;

          a {
            color: #6a7282;
            text-decoration: none;
            cursor: pointer;
          }

          .pronto {
            opacity: 0.6;
            cursor: not-allowed;
          }

          .active {
            color: #030712;
            border-bottom: 1px solid #030712;
          }
        }
      }
    }
  `}connectedCallback(){super.connectedCallback(),window.addEventListener(`popstate`,this.onRuta)}disconnectedCallback(){window.removeEventListener(`popstate`,this.onRuta),super.disconnectedCallback()}item(e,t,n){return T`<li class="list-item">
      ${t?T`<a class=${n?`active`:``} href=${t}>${e}</a>`:T`<a
            class="pronto"
            href="#"
            aria-disabled="true"
            title="Próximamente"
            @click=${e=>e.preventDefault()}
            >${e}</a
          >`}
    </li>`}render(){let e=this.ruta;return T`<nav class="header-nav-host">
      <ul class="header-nav-host-list">
        ${this.item(`Hoy`,`/hosting`,e===`/hosting`)}
        ${this.item(`Calendario`,null,!1)}
        ${this.item(`Anuncios`,`/hosting/anuncios`,e.startsWith(`/hosting/anuncios`))}
        ${this.item(`Mensajes`,null,!1)}
      </ul>
    </nav>`}};N([j()],Ca.prototype,`ruta`,void 0),Ca=N([k(`header-nav-host`)],Ca);var wa=class extends O{constructor(...e){super(...e),this.hideProfile=!1,this.hideHost=!1}static{this.styles=p`
    header {
      padding: var(--padding-page);
      border-bottom: 1px solid #f3f4f6;

      .header-stack {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .header-title {
        /* width: 300px;
      height: 300px; */
        margin: 0;

        .header-title-image {
          width: 6.5rem;
          height: 2rem;
          object-fit: center;
          aspect-ratio: 1;
        }
      }
    }
  `}render(){return T`<header>
      <div class="header-stack">
        <a class="header-title" href="/" aria-label="Ir al inicio">
          <img
            class="header-title-image"
            src="/airbnb_logo.webp"
            alt="Airbnb logo"
          />
        </a>
        ${this.hideProfile?``:T`<header-search></header-search>`}
        ${this.hideHost?T`<header-nav-host></header-nav-host>`:``}
        <header-profile></header-profile>
      </div>
    </header>`}};N([A({type:Boolean})],wa.prototype,`hideProfile`,void 0),N([A({type:Boolean})],wa.prototype,`hideHost`,void 0),wa=N([k(`header-layout`)],wa);var Ta=e=>new Date(`${e}T00:00:00`).toLocaleDateString(`es`,{day:`numeric`,month:`short`}),Ea=class extends O{constructor(...e){super(...e),this.desde=``,this.hasta=``,this.favorito=!1}static{this.styles=p`
    :host {
      display: block;
      color: #222;
      font-size: 0.9375rem;
    }

    .foto {
      position: relative;
      aspect-ratio: 4 / 3;
      border-radius: 1.25rem;
      overflow: hidden;
      background: #ebebeb;
    }

    .foto img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }

    .corazon {
      position: absolute;
      top: 0.875rem;
      right: 0.875rem;
      display: flex;
      padding: 0;
      border: none;
      background: transparent;
      cursor: pointer;
    }

    .corazon svg {
      fill: rgb(0 0 0 / 0.5);
      stroke: white;
      stroke-width: 2;
    }

    .corazon[aria-pressed="true"] svg {
      fill: #ff385c;
    }

    .info {
      padding: 0.625rem 0.25rem 0;
      line-height: 1.4;
    }

    .fila {
      display: flex;
      justify-content: space-between;
      gap: 0.5rem;
    }

    .titulo {
      font-weight: 500;
    }

    .gris {
      color: #6a6a6a;
    }

    .precio {
      margin-top: 0.125rem;
    }

    .precio b {
      text-decoration: underline;
      font-weight: 600;
    }

    a {
      color: inherit;
      text-decoration: none;
    }
  `}connectedCallback(){super.connectedCallback(),this.favorito=!1}async alternarFavorito(e){if(e.preventDefault(),this.favorito=!this.favorito,Y())try{await Z.favorito(this.propiedad.id,this.favorito)}catch{this.favorito=!this.favorito}}get noches(){if(!this.desde||!this.hasta)return 0;let e=new Date(`${this.hasta}T00:00:00`).getTime()-new Date(`${this.desde}T00:00:00`).getTime();return Math.max(0,Math.round(e/864e5))}render(){let e=this.propiedad,t=this.noches,n=Math.round(e.precioDesde*(t||1));return T`<a href=${`/alojamientos/${e.id}`}>
      <div class="foto">
        ${e.imagenPrincipal?T`<img src=${e.imagenPrincipal} alt=${e.titulo} loading="lazy" />`:D}
        <button
          class="corazon"
          aria-label="Guardar en favoritos"
          aria-pressed=${this.favorito}
          @click=${this.alternarFavorito}
        >
          <svg width="28" height="28" viewBox="0 0 32 32" aria-hidden="true">
            <path d="M16 28C7 22 2 16 2 11a7 7 0 0 1 14-2 7 7 0 0 1 14 2c0 5-5 11-14 17z" />
          </svg>
        </button>
      </div>
      <div class="info">
        <div class="fila">
          <span class="titulo">${e.tipoAlojamiento} en ${e.ubicacion}</span>
          <span>
            ★
            ${e.totalReviews>0&&e.ratingPromedio?T`${e.ratingPromedio.toFixed(1)} (${e.totalReviews})`:`Novedad`}
          </span>
        </div>
        <div class="gris">${e.titulo}</div>
        <div class="gris">${e.categoria}</div>
        ${t>0?T`<div class="gris">
              ${Ta(this.desde)} – ${Ta(this.hasta)}
            </div>`:D}
        <div class="precio">
          <b>S/ ${n}</b>
          ${t>0?`por ${t} ${t===1?`noche`:`noches`}`:`por noche`}
        </div>
      </div>
    </a>`}};N([A({attribute:!1})],Ea.prototype,`propiedad`,void 0),N([A()],Ea.prototype,`desde`,void 0),N([A()],Ea.prototype,`hasta`,void 0),N([j()],Ea.prototype,`favorito`,void 0),Ea=N([k(`listing-card`)],Ea);var Da=class extends O{constructor(...e){super(...e),this.propiedades=null,this.error=!1}static{this.styles=p`
    main {
      padding: var(--padding-page);
      padding-top: 2rem;
    }

    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
      gap: 2rem 1.5rem;
    }

    .estado {
      padding: 4rem 0;
      text-align: center;
      color: #6a6a6a;
    }

    .ver-todos {
      display: flex;
      justify-content: center;
      margin-top: 3rem;
    }

    .ver-todos a {
      padding: 0.875rem 1.5rem;
      border-radius: 0.75rem;
      background: #222;
      color: white;
      font-weight: 600;
      text-decoration: none;
    }
  `}connectedCallback(){super.connectedCallback(),Z.propiedades({},0,18).then(e=>this.propiedades=e.contenido).catch(()=>this.error=!0)}renderContenido(){return this.error?T`<p class="estado" role="alert">
        No pudimos cargar los alojamientos. Inténtalo de nuevo más tarde.
      </p>`:this.propiedades===null?T`<p class="estado">Cargando alojamientos…</p>`:this.propiedades.length===0?T`<p class="estado">Todavía no hay alojamientos publicados.</p>`:T`<div class="grid">
        ${this.propiedades.map(e=>T`<listing-card .propiedad=${e}></listing-card>`)}
      </div>
      <div class="ver-todos">
        <a href="/alojamientos?cerca=true&pagina=0&tamanio=18"
          >Ver todos los alojamientos</a
        >
      </div>`}render(){return T`<main>${this.renderContenido()}</main>`}};N([j()],Da.prototype,`propiedades`,void 0),N([j()],Da.prototype,`error`,void 0),Da=N([k(`home-page`)],Da);var Oa=class extends O{static{this.styles=p`
    :host {
      width: 35%;
    }

    .profile-sidebar {
      padding: 1.75rem 8rem;
      height: 100%;
      border-top: 1px solid #d1d5dc;
      border-right: 1px solid #d1d5dc;

      .profile-sidebar-title {
        font-size: 2rem;
        font-weight: bold;
        margin-top: 0;
      }

      .profile-sidebar-list {
        padding: 0;

        .profile-sidebar-list-item {
          font-weight: bold;
          list-style: none;
          border-radius: 16px;  
          background-color: #f3f4f6;
          padding: 0.5rem 1.5rem;
        }
      }
    }
  `}render(){return T`<section class="profile-sidebar">
      <h2 class="profile-sidebar-title">Perfil</h2>
      <ul class="profile-sidebar-list">
        <li class="profile-sidebar-list-item">Información sobre mi</li>
      </ul>
    </section>`}};Oa=N([k(`profile-sidebar`)],Oa);var ka=p`
  :host {
    border-width: 0;
  }

  .textarea {
    display: grid;
    align-items: center;
    margin: 0;
    border: none;
    outline: none;
    cursor: inherit;
    font: inherit;
    background-color: var(--wa-form-control-background-color);
    border-color: var(--wa-form-control-border-color);
    border-radius: var(--wa-form-control-border-radius);
    border-style: var(--wa-form-control-border-style);
    border-width: var(--wa-form-control-border-width);
    -webkit-appearance: none;
    outline: var(--wa-focus-ring-style) var(--wa-focus-ring-width) transparent;
    outline-offset: var(--wa-focus-ring-offset);

    &:focus-within {
      outline-color: var(--wa-color-focus);
    }

    /* Style disabled textareas */
    &:has(:disabled) {
      cursor: not-allowed;
      opacity: 0.5;
    }
  }

  /* Appearance modifiers */
  :host([appearance='outlined']) .textarea {
    background-color: var(--wa-form-control-background-color);
    border-color: var(--wa-form-control-border-color);
  }

  :host([appearance='filled']) .textarea {
    background-color: var(--wa-color-neutral-fill-quiet);
    border-color: var(--wa-color-neutral-fill-quiet);
  }

  :host([appearance='filled-outlined']) .textarea {
    background-color: var(--wa-color-neutral-fill-quiet);
    border-color: var(--wa-form-control-border-color);
  }

  textarea {
    display: block;
    width: 100%;
    border: none;
    background: transparent;
    font: inherit;
    color: inherit;
    cursor: inherit;
    scroll-padding-block: var(--wa-form-control-padding-block);
    padding: calc(var(--wa-form-control-padding-block) - ((1lh - 1em) / 2)) var(--wa-form-control-padding-inline); /* accounts for the larger line height of textarea content */
    min-height: calc(var(--wa-form-control-height) - var(--border-width) * 2);
    box-shadow: none;
    margin: 0;

    &::placeholder {
      color: var(--wa-form-control-placeholder-color);
      user-select: none;
      -webkit-user-select: none;
    }

    &:autofill {
      &,
      &:hover,
      &:focus,
      &:active {
        box-shadow: none;
        caret-color: var(--wa-form-control-value-color);
      }
    }

    &:focus {
      outline: none;
    }
  }

  /* Shared textarea and size-adjuster positioning */
  .control,
  .size-adjuster {
    grid-area: 1 / 1 / 2 / 2;
  }

  .size-adjuster {
    visibility: hidden;
    pointer-events: none;
    opacity: 0;
    padding: 0;
  }

  textarea::-webkit-search-decoration,
  textarea::-webkit-search-cancel-button,
  textarea::-webkit-search-results-button,
  textarea::-webkit-search-results-decoration {
    -webkit-appearance: none;
  }

  /*
   * Resize types
   */

  :host([resize='none']) textarea {
    resize: none;
  }

  textarea,
  :host([resize='vertical']) textarea {
    resize: vertical;
  }

  :host([resize='horizontal']) textarea {
    resize: horizontal;
  }

  :host([resize='both']) textarea {
    resize: both;
  }

  :host([resize='auto']) textarea {
    height: auto;
    resize: none;
    overflow-y: hidden;
  }

  /*
   * Footer (hint + character count)
   */

  /*
   * This element carries the hint part, so the shared form control styles apply to it. Those styles set display:block
   * and hide the element when it has no hint, both of which have to be undone when a character count is present.
   */
  .footer.has-slotted,
  .footer.has-count {
    display: flex;
    align-items: baseline;
    gap: 1em;
  }

  /* Slots default to display:contents, which would leave the hint unable to shrink below its content */
  .footer.has-count .hint {
    display: block;
    flex: 1 1 auto;
    min-width: 0;
  }

  .count {
    flex: 0 0 auto;
    color: var(--wa-form-control-hint-color);
    font-weight: var(--wa-form-control-hint-font-weight);
    line-height: var(--wa-form-control-hint-line-height);
    margin-block-start: 0.5em;
    font-size: var(--wa-font-size-smaller);
    margin-inline-start: auto;
  }
`,Aa=p`
  .wa-visually-hidden:not(:focus-within),
  .wa-visually-hidden-force,
  .wa-visually-hidden-hint::part(hint),
  .wa-visually-hidden-label::part(label),
  .wa-visually-hidden-label::part(form-control-label) {
    position: absolute !important;
    width: 1px !important;
    height: 1px !important;
    clip: rect(0 0 0 0) !important;
    clip-path: inset(50%) !important;
    border: none !important;
    overflow: hidden !important;
    white-space: nowrap !important;
    padding: 0 !important;
  }
`,Q=class extends R{constructor(){super(...arguments),this.assumeInteractionOn=[`blur`,`input`],this.hasSlotController=new Et(this,`hint`,`label`),this.localize=new Vt(this),this.announcedCountText=``,this.title=``,this.name=null,this._value=null,this.defaultValue=this.getAttribute(`value`)??``,this.size=`m`,this.appearance=`outlined`,this.label=``,this.hint=``,this.placeholder=``,this.rows=4,this.resize=`vertical`,this.disabled=!1,this.readonly=!1,this.required=!1,this.spellcheck=!0,this.withLabel=!1,this.withHint=!1,this.withCount=!1,this.lastObservedWidth=0}static get validators(){return[...super.validators,ct()]}get value(){return this.valueHasChanged?this._value:this._value??this.defaultValue}set value(e){this._value!==e&&(this.valueHasChanged=!0,this._value=e)}handleSizeChange(){Tt(this.localName,this.size)}connectedCallback(){super.connectedCallback(),this.updateComplete.then(()=>{if(this.setTextareaDimensions(),this.updateResizeObserver(),this.didSSR&&this.input&&this.value!==this.input.value){let e=this.input.value;this.value=e}})}disconnectedCallback(){super.disconnectedCallback(),clearTimeout(this.countAnnounceTimeout),this.resizeObserver?.disconnect(),this.resizeObserver=void 0}updateFormValue(e){if(e==null){this.setValue(``,null);return}super.updateFormValue(e)}updateResizeObserver(){let e=this.resize!==`none`;this.resizeObserver&&=(this.resizeObserver.disconnect(),void 0),e&&this.input&&(this.resize===`auto`?(this.resizeObserver=new ResizeObserver(e=>{let t=e[0]?.contentRect.width??0;t!==this.lastObservedWidth&&(this.lastObservedWidth=t,requestAnimationFrame(()=>this.setTextareaDimensions()))}),this.resizeObserver.observe(this)):(this.resizeObserver=new ResizeObserver(()=>this.setTextareaDimensions()),this.resizeObserver.observe(this.input)))}handleBlur(){this.checkValidity()}handleChange(e){this.valueHasChanged=!0,this.value=this.input.value,this.setTextareaDimensions(),this.checkValidity(),this.relayNativeEvent(e,{bubbles:!0,composed:!0})}handleInput(e){this.valueHasChanged=!0,this.value=this.input.value,this.relayNativeEvent(e,{bubbles:!0,composed:!0}),this.scheduleCountAnnouncement()}scheduleCountAnnouncement(){clearTimeout(this.countAnnounceTimeout),this.countAnnounceTimeout=setTimeout(()=>{let e=(this.value??``).length;this.announcedCountText=this.maxlength==null?this.localize.term(`numCharacters`,e):this.localize.term(`numCharactersRemaining`,this.maxlength-e)},1e3)}setTextareaDimensions(){if(this.resize===`none`){this.base.style.width=``,this.base.style.height=``;return}if(this.resize===`auto`){this.sizeAdjuster.style.height=`${this.input.clientHeight}px`,this.input.style.height=`auto`;let e=this.input.scrollHeight;this.input.style.height=`${e}px`,this.sizeAdjuster.style.height=`${e}px`,this.base.style.width=``,this.base.style.height=``;return}if(this.input.style.width){let e=Number(this.input.style.width.split(/px/)[0])+2;this.base.style.width=`${e}px`}if(this.input.style.height){let e=Number(this.input.style.height.split(/px/)[0])+2;this.base.style.height=`${e}px`}}handleRowsChange(){this.setTextareaDimensions()}async handleValueChange(){await this.updateComplete,this.checkValidity(),this.setTextareaDimensions()}updated(e){e.has(`resize`)&&(this.setTextareaDimensions(),this.updateResizeObserver()),super.updated(e),e.has(`value`)&&this.customStates.set(`blank`,!this.value)}focus(e){this.input.focus(e)}blur(){this.input.blur()}select(){this.input.select()}scrollPosition(e){if(e){typeof e.top==`number`&&(this.input.scrollTop=e.top),typeof e.left==`number`&&(this.input.scrollLeft=e.left);return}return{top:this.input.scrollTop,left:this.input.scrollTop}}setSelectionRange(e,t,n=`none`){this.input.setSelectionRange(e,t,n)}setRangeText(e,t,n,r=`preserve`){let i=t??this.input.selectionStart,a=n??this.input.selectionEnd;this.input.setRangeText(e,i,a,r),this.value!==this.input.value&&(this.value=this.input.value,this.setTextareaDimensions())}formResetCallback(){this._value=null,this.input&&(this.input.value=this.value||``),super.formResetCallback()}render(){let e=this.hasSlotController.test(`label`,`withLabel`),t=this.hasSlotController.test(`hint`,`withHint`),n=this.label?!0:!!e,r=this.hint?!0:!!t,i=(this.value??``).length,a=this.maxlength==null?this.localize.term(`numCharacters`,i):this.localize.term(`numCharactersRemaining`,this.maxlength-i);return T`
      <label
        part="form-control-label label"
        class=${Gt({label:!0,"has-label":n})}
        for="input"
        aria-hidden=${n?`false`:`true`}
      >
        <slot name="label">${this.label}</slot>
      </label>

      <div part="base textarea-wrapper" class="textarea">
        <textarea
          part="textarea"
          id="input"
          class="control"
          title=${this.title}
          name=${B(this.name)}
          .value=${aa(this.value)}
          ?disabled=${this.disabled}
          ?readonly=${this.readonly}
          ?required=${this.required}
          placeholder=${B(this.placeholder)}
          rows=${B(this.rows)}
          minlength=${B(this.minlength)}
          maxlength=${B(this.maxlength)}
          autocapitalize=${B(this.autocapitalize)}
          autocorrect=${B(this.autocorrect)}
          ?autofocus=${this.autofocus}
          spellcheck=${B(this.spellcheck)}
          enterkeyhint=${B(this.enterkeyhint)}
          inputmode=${B(this.inputmode)}
          aria-describedby="hint"
          @change=${this.handleChange}
          @input=${this.handleInput}
          @blur=${this.handleBlur}
        ></textarea>

        <!-- This "adjuster" exists to prevent layout shifting. https://github.com/shoelace-style/shoelace/issues/2180 -->
        <div part="textarea-adjuster" class="size-adjuster" ?hidden=${this.resize!==`auto`}></div>
      </div>

      <div
        part="hint"
        class=${Gt({footer:!0,"has-count":this.withCount,"has-slotted":r})}
      >
        <slot id="hint" name="hint" class="hint" aria-hidden=${r?`false`:`true`}>${this.hint}</slot>

        ${this.withCount?T`
              <div part="count" class="count" aria-hidden="true">${a}</div>
              <div class="wa-visually-hidden-force" aria-live="polite">${this.announcedCountText}</div>
            `:``}
      </div>
    `}};Q.css=[ka,ia,Dt,Aa],I([j()],Q.prototype,`announcedCountText`,2),I([M(`.control`)],Q.prototype,`input`,2),I([M(`[part~="base"]`)],Q.prototype,`base`,2),I([M(`.size-adjuster`)],Q.prototype,`sizeAdjuster`,2),I([A()],Q.prototype,`title`,2),I([A({reflect:!0})],Q.prototype,`name`,2),I([j()],Q.prototype,`value`,1),I([A({attribute:`value`,reflect:!0})],Q.prototype,`defaultValue`,2),I([A({reflect:!0})],Q.prototype,`size`,2),I([z(`size`)],Q.prototype,`handleSizeChange`,1),I([A({reflect:!0})],Q.prototype,`appearance`,2),I([A()],Q.prototype,`label`,2),I([A({attribute:`hint`})],Q.prototype,`hint`,2),I([A()],Q.prototype,`placeholder`,2),I([A({type:Number})],Q.prototype,`rows`,2),I([A({reflect:!0})],Q.prototype,`resize`,2),I([A({type:Boolean})],Q.prototype,`disabled`,2),I([A({type:Boolean,reflect:!0})],Q.prototype,`readonly`,2),I([A({type:Boolean,reflect:!0})],Q.prototype,`required`,2),I([A({type:Number})],Q.prototype,`minlength`,2),I([A({type:Number})],Q.prototype,`maxlength`,2),I([A()],Q.prototype,`autocapitalize`,2),I([A({type:Boolean,converter:{fromAttribute:e=>!(!e||e===`off`),toAttribute:e=>e?`on`:`off`}})],Q.prototype,`autocorrect`,2),I([A()],Q.prototype,`autocomplete`,2),I([A({type:Boolean})],Q.prototype,`autofocus`,2),I([A()],Q.prototype,`enterkeyhint`,2),I([A({type:Boolean,converter:{fromAttribute:e=>!(!e||e===`false`),toAttribute:e=>e?`true`:`false`}})],Q.prototype,`spellcheck`,2),I([A()],Q.prototype,`inputmode`,2),I([A({attribute:`with-label`,type:Boolean})],Q.prototype,`withLabel`,2),I([A({attribute:`with-hint`,type:Boolean})],Q.prototype,`withHint`,2),I([A({attribute:`with-count`,type:Boolean,reflect:!0})],Q.prototype,`withCount`,2),I([z(`rows`,{waitUntilFirstUpdate:!0})],Q.prototype,`handleRowsChange`,1),I([z(`value`,{waitUntilFirstUpdate:!0})],Q.prototype,`handleValueChange`,1),Q=I([k(`wa-textarea`)],Q),Q.disableWarning?.(`change-in-update`);var ja=class extends O{constructor(...e){super(...e),this.usuario=null,this.editando=!1,this.guardando=!1,this.error=``}static{this.styles=p`
    .form-editar {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .error {
      margin: 0;
      color: #c10007;
      font-size: 0.875rem;
    }

    .guardar::part(base button) {
      background-color: #222;
      color: white;
      font-weight: bold;
      height: 3rem;
    }

    .container {
      padding-bottom: 1.75rem;
    }
    .profile-main-title-container {
      display: flex;
      align-items: center;
      column-gap: 1rem;
      margin-bottom: 1rem;

      .profile-main-title {
        font-size: 2rem;
        font-weight: bold;
        margin: 0;
      }

      .profile-main-button::part(base button) {
        justify-content: start;
        background-color: #f3f4f6;
        font-weight: bold;
        display: flex;
        align-items: center;
        height: 2rem;
      }
    }

    .profile-main-body {
      display: flex;
      align-items: center;
      column-gap: 3rem;

      .profile-main-card {
        width: 60%;
        height: 14rem;
        box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.1);
        border-radius: 16px;

        .profile-main-card-content {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height: 100%;

          .profile-main-card-content-icon {
            font-size: 2.2rem;
            font-weight: bold;
            margin-top: 0;
            border-radius: 9999px;
            background-color: #dcfce7;
            padding: 1.5rem 2.75rem;
            color: #5c886c;
          }

          .profile-main-card-content-name {
            font-size: 2.2rem;
            font-weight: bold;
            margin: 0;
          }

          .profile-main-card-content-mode {
            color: #6a7282;
            font-size: 0.8rem;
            margin-top: -0.5rem;
          }
        }
      }

      .profile-complete-section {
        h3 {
          margin-top: 0;
          margin-bottom: 0.5rem;
        }

        p {
          line-height: 1.25;
          color: #6a7282;
          font-size: 0.9rem;
          width: 70%;
        }

        wa-button::part(base button) {
          justify-content: start;
          background-color: var(--color-primary);
          font-weight: bold;
          font-size: 0.9rem;
          height: 3rem;
          border-radius: 1rem;
          color: white;
        }
      }
    }
  `}connectedCallback(){super.connectedCallback(),Z.me().then(e=>this.usuario=e).catch(()=>this.error=`No pudimos cargar tu perfil.`)}async guardar(e){e.preventDefault();let t=e.currentTarget,n=e=>t.querySelector(`[name=${e}]`).value.trim();if(!n(`nombre`)){this.error=`El nombre es obligatorio.`;return}this.guardando=!0,this.error=``;try{this.usuario=await Z.actualizarMe({nombre:n(`nombre`),ciudad:n(`ciudad`),biografia:n(`biografia`)});let e=Y();e&&la({...e,rol:`USUARIO`,nombre:this.usuario.nombre}),this.editando=!1}catch{this.error=`No pudimos guardar los cambios.`}finally{this.guardando=!1}}render(){let e=this.usuario;return T`<main class="container">
      <section class="profile-main-section">
        <div class="profile-main-title-container">
          <h2 class="profile-main-title">Información sobre mí</h2>
          <wa-button
            class="profile-main-button"
            size="xs"
            ?disabled=${!e}
            @click=${()=>this.editando=!0}
            >Editar</wa-button
          >
        </div>
        ${this.error&&!this.editando?T`<p role="alert">${this.error}</p>`:``}
        <div class="profile-main-body">
          <div class="profile-main-card">
            <div class="profile-main-card-content">
              <span class="profile-main-card-content-icon"
                >${e?.nombre.charAt(0).toUpperCase()??``}</span
              >
              <p class="profile-main-card-content-name">${e?.nombre??``}</p>
              <p class="profile-main-card-content-mode">
                ${e?e.esAnfitrion?`Anfitrión`:`Huésped`:``}
              </p>
            </div>
          </div>
          <div class="profile-complete-section">
            <h3>${e?.ciudad||e?.biografia?`Sobre ti`:`Completa tu perfil`}</h3>
            <p>
              ${e?.ciudad?T`<strong>${e.ciudad}</strong><br />`:``}
              ${e?.biografia||`Tu perfil en Airbnb es una parte importante de todas las reservaciones. Completa el tuyo para que los demás anfitriones y huéspedes te conozcan mejor.`}
            </p>
            <wa-button
              class="profile-complete-button"
              size="xs"
              ?disabled=${!e}
              @click=${()=>this.editando=!0}
              >Comencemos</wa-button
            >
          </div>
        </div>
      </section>
      <wa-dialog
        label="Editar perfil"
        ?open=${this.editando}
        @wa-after-hide=${()=>this.editando=!1}
      >
        <form @submit=${this.guardar} class="form-editar">
          <wa-input name="nombre" label="Nombre" .value=${e?.nombre??``}></wa-input>
          <wa-input name="ciudad" label="Ciudad" .value=${e?.ciudad??``}></wa-input>
          <wa-textarea name="biografia" label="Biografía" rows="3" .value=${e?.biografia??``}></wa-textarea>
          ${this.error?T`<p role="alert" class="error">${this.error}</p>`:``}
          <wa-button type="submit" class="guardar" size="xs" ?loading=${this.guardando}>Guardar</wa-button>
        </form>
      </wa-dialog>
    </main>`}};N([j()],ja.prototype,`usuario`,void 0),N([j()],ja.prototype,`editando`,void 0),N([j()],ja.prototype,`guardando`,void 0),N([j()],ja.prototype,`error`,void 0),ja=N([k(`about-me`)],ja);var Ma=class extends O{constructor(...e){super(...e),this.width=`24`,this.height=`24`}render(){return T` <svg
      style="${this.style}"
      xmlns="http://www.w3.org/2000/svg"
      width=${this.width}
      height=${this.height}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="lucide lucide-message-square-text preview-icon"
    >
      <path
        d="M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z"
      />
      <path d="M7 11h10" />
      <path d="M7 15h6" />
      <path d="M7 7h8" />
    </svg>`}};N([A({type:String})],Ma.prototype,`width`,void 0),N([A({type:String})],Ma.prototype,`height`,void 0),Ma=N([k(`i-messages`)],Ma);var Na=class extends O{static{this.styles=p`
    .container {
      border-top: 1px solid #d1d5dc;
      padding-top: 1.75rem;

      .button-show-reviews {
        width: 100%;
      }
      .button-show-reviews::part(base button) {
        justify-content: start;
        background-color: transparent;
        font-weight: 600;
        color: #1e2939;
        display: flex;
        align-items: center;
      }
      .button-show-reviews::part(label) {
        display: flex;
        align-items: center;
        gap: 1rem;
      }

      .button-show-reviews::part(base button):hover {
        background-color: #f3f4f6;
      }
    }
  `}render(){return T`
      <aside class="container">
        <wa-button class="button-show-reviews">
          <i-messages width="20" height="20"></i-messages>
          Mostrar resenas escritas por mi</wa-button
        >
      </aside>
    `}};Na=N([k(`my-reviews`)],Na);var Pa=class extends O{static{this.styles=p`
    .container {
      display: flex;
      height: 55rem;

      .second-content {
        width: 65%;
        border-top: 1px solid #d1d5dc;
        padding: 1.75rem 10rem 0;
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }
    }
  `}connectedCallback(){super.connectedCallback(),Y()||P(`/`)}render(){return T`
      <div class="container">
        <profile-sidebar></profile-sidebar>
        <div class="second-content">
          <about-me></about-me>
          <my-reviews></my-reviews>
        </div>
      </div>
    `}};Pa=N([k(`user-profile`)],Pa);var Fa=p`
  :host {
    --checked-icon-color: var(--wa-color-brand-on-loud);
    --checked-icon-scale: 0.8;

    display: inline-flex;
    color: var(--wa-form-control-value-color);
    font-family: inherit;
    font-weight: var(--wa-form-control-value-font-weight);
    line-height: var(--wa-form-control-value-line-height);
    user-select: none;
    -webkit-user-select: none;
  }

  [part~='control'] {
    display: inline-flex;
    flex: 0 0 auto;
    position: relative;
    align-items: center;
    justify-content: center;
    width: var(--wa-form-control-toggle-size);
    height: var(--wa-form-control-toggle-size);
    border-color: var(--wa-form-control-border-color);
    border-radius: min(
      calc(var(--wa-form-control-toggle-size) * 0.375),
      var(--wa-border-radius-s)
    ); /* min prevents entirely circular checkbox */
    border-style: var(--wa-border-style);
    border-width: var(--wa-form-control-border-width);
    background-color: var(--wa-form-control-background-color);
    transition:
      background var(--wa-transition-normal),
      border-color var(--wa-transition-fast),
      box-shadow var(--wa-transition-fast),
      color var(--wa-transition-fast);
    transition-timing-function: var(--wa-transition-easing);

    margin-inline-end: 0.5em;
  }

  [part~='base'] {
    display: flex;
    align-items: flex-start;
    position: relative;
    color: currentColor;
    vertical-align: middle;
    cursor: pointer;
  }

  [part~='label'] {
    display: inline;
  }

  /* Checked */
  [part~='control']:has(:checked, :indeterminate) {
    color: var(--checked-icon-color);
    border-color: var(--wa-form-control-activated-color);
    background-color: var(--wa-form-control-activated-color);
  }

  /* Focus */
  [part~='control']:has(> input:focus-visible:not(:disabled)) {
    outline: var(--wa-focus-ring);
    outline-offset: var(--wa-focus-ring-offset);
  }

  /* Disabled */
  :host [part~='base']:has(input:disabled) {
    opacity: 0.5;
    cursor: not-allowed;
  }

  input {
    position: absolute;
    padding: 0;
    margin: 0;
    height: 100%;
    width: 100%;
    opacity: 0;
    pointer-events: none;
  }

  [part~='icon'] {
    display: flex;
    scale: var(--checked-icon-scale);

    /* Without this, Safari renders the icon slightly to the left */
    &::part(svg) {
      translate: 0.0009765625em;
    }

    input:not(:checked, :indeterminate) + & {
      visibility: hidden;
    }
  }

  :host([required]) [part~='label']::after {
    content: var(--wa-form-control-required-content);
    color: var(--wa-form-control-required-content-color);
    margin-inline-start: var(--wa-form-control-required-content-offset);
  }
`,Ia=(e={})=>{let{validationElement:t,validationProperty:n}=e;t||typeof document<`u`&&`createElement`in document&&(t=Object.assign(document.createElement(`input`),{required:!0})),n||=`value`;let r={observedAttributes:[`required`],message:t?.validationMessage,checkValidity(e){let t={message:``,isValid:!0,invalidKeys:[]};return(e.required??e.hasAttribute(`required`))&&(e[n]||(t.message=typeof r.message==`function`?r.message(e):r.message||``,t.isValid=!1,t.invalidKeys.push(`valueMissing`))),t}};return r},$=class extends R{constructor(){super(...arguments),this.hasSlotController=new Et(this,`hint`),this.title=``,this._value=this.getAttribute(`value`)??null,this.size=`m`,this.disabled=!1,this.indeterminate=!1,this._checked=null,this.defaultChecked=this.hasAttribute(`checked`),this.required=!1,this.hint=``}static get validators(){let e=[Ia({validationProperty:`checked`,validationElement:Object.assign(document.createElement(`input`),{type:`checkbox`,required:!0})})];return[...super.validators,...e]}get value(){return this._value??`on`}set value(e){this._value=e}handleSizeChange(){Tt(this.localName,this.size)}get checked(){return this.valueHasChanged?!!this._checked:this._checked??this.defaultChecked}set checked(e){this._checked=!!e,this.valueHasChanged=!0}handleClick(){this.hasInteracted=!0,this.checked=!this.checked,this.indeterminate=!1,this.updateComplete.then(()=>{this.dispatchEvent(new Event(`change`,{bubbles:!0,composed:!0}))})}connectedCallback(){if(super.connectedCallback(),this.didSSR&&!this.hasUpdated){this.updateComplete.then(()=>{this.handleDefaultCheckedChange()});return}this.handleDefaultCheckedChange()}handleDefaultCheckedChange(){this.handleValueOrCheckedChange()}handleValueOrCheckedChange(){if(this.didSSR&&!this.hasUpdated){this.updateComplete.then(()=>{this.handleValueOrCheckedChange()});return}this.setValue(this.checked?this.value:null,this._value),this.updateValidity()}handleStateChange(){this.hasUpdated&&(this.input.checked=this.checked,this.input.indeterminate=this.indeterminate),this.customStates.set(`checked`,this.checked),this.customStates.set(`indeterminate`,this.indeterminate),this.updateValidity()}handleDisabledChange(){this.customStates.set(`disabled`,this.disabled)}willUpdate(e){super.willUpdate(e),(e.has(`value`)||e.has(`checked`)||e.has(`defaultChecked`)||e.has(`disabled`))&&this.handleValueOrCheckedChange()}formResetCallback(){this._checked=null,super.formResetCallback(),this.handleValueOrCheckedChange()}click(){this.input.click()}focus(e){this.input.focus(e)}blur(){this.input.blur()}render(){let e=this.hasSlotController.test(`hint`),t=this.hint?!0:!!e,n=!this.checked&&this.indeterminate,r=n?`indeterminate`:`check`,i=n?`indeterminate`:`checked`,a=this.didSSR&&!this.hasUpdated?this.checked:this.defaultChecked,o=this.didSSR&&!this.hasUpdated?null:aa(this.checked);return T`
      <label part="base checkbox">
        <span part="control">
          <input
            class="input"
            type="checkbox"
            title=${this.title}
            name=${B(this.name)}
            value=${B(this.value)}
            .indeterminate=${aa(this.indeterminate)}
            .checked=${B(o)}
            ?checked=${a}
            ?disabled=${this.disabled}
            ?required=${this.required}
            aria-checked=${this.indeterminate?`mixed`:this.checked?`true`:`false`}
            aria-describedby="hint"
            @click=${this.handleClick}
          />

          <wa-icon part="${i}-icon icon" library="system" name=${r}></wa-icon>
        </span>

        <slot part="label"></slot>
      </label>

      <slot
        id="hint"
        part="hint"
        name="hint"
        aria-hidden=${t?`false`:`true`}
        class="${Gt({"has-slotted":t})}"
      >
        ${this.hint}
      </slot>
    `}};$.css=[ia,Dt,Fa],$.shadowRootOptions={...R.shadowRootOptions,delegatesFocus:!0},I([M(`input[type="checkbox"]`)],$.prototype,`input`,2),I([A()],$.prototype,`title`,2),I([A({reflect:!0})],$.prototype,`value`,1),I([A({reflect:!0})],$.prototype,`size`,2),I([z(`size`)],$.prototype,`handleSizeChange`,1),I([A({type:Boolean})],$.prototype,`disabled`,2),I([A({type:Boolean,reflect:!0})],$.prototype,`indeterminate`,2),I([A({type:Boolean,attribute:!1})],$.prototype,`checked`,1),I([A({type:Boolean,reflect:!0,attribute:`checked`})],$.prototype,`defaultChecked`,2),I([A({type:Boolean,reflect:!0})],$.prototype,`required`,2),I([A()],$.prototype,`hint`,2),I([z([`checked`,`defaultChecked`])],$.prototype,`handleDefaultCheckedChange`,1),I([z([`checked`,`indeterminate`])],$.prototype,`handleStateChange`,1),I([z(`disabled`)],$.prototype,`handleDisabledChange`,1),$=I([k(`wa-checkbox`)],$),$.disableWarning?.(`change-in-update`);function La(){let e=new URLSearchParams(window.location.search),t=(t,n)=>{let r=Number(e.get(t));return e.has(t)&&Number.isFinite(r)&&r>=0?r:n},n=e.get(`texto`)??``;return{texto:n,cerca:e.get(`cerca`)===`true`||!n,categoria:t(`categoria`,0),desde:e.get(`desde`)??``,hasta:e.get(`hasta`)??``,huespedes:t(`huespedes`,0),servicios:(e.get(`servicios`)??``).split(`,`).filter(Boolean).map(Number),pagina:t(`pagina`,0),tamanio:t(`tamanio`,18)||18}}var Ra=class extends O{constructor(...e){super(...e),this.consulta=La(),this.servicios=[],this.resultado=null,this.dialogoAbierto=!1,this.borrador=[],this.cargando=!0,this.error=``,this.peticion=0,this.onPopState=()=>{this.consulta=La(),this.cargar()}}static{this.styles=p`
    :host {
      display: block;
      color: #222;
    }

    .acciones {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .boton-filtros {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.625rem 1rem;
      border: 1px solid #d1d5dc;
      border-radius: 0.75rem;
      background: white;
      font: 700 0.875rem Inter, system-ui, sans-serif;
      color: #26314f;
      cursor: pointer;
    }

    .boton-filtros:hover {
      border-color: #222;
    }

    .boton-filtros .num {
      min-width: 1.25rem;
      padding: 0 0.25rem;
      border-radius: 9999px;
      background: #222;
      color: white;
      font-size: 0.75rem;
      text-align: center;
    }

    .dialogo-lista {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      margin: 0.5rem 0 1rem;
    }

    .dialogo-pie {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .dialogo-pie .borrar {
      border: none;
      background: transparent;
      font: 600 1rem Inter, system-ui, sans-serif;
      text-decoration: underline;
      color: #222;
      cursor: pointer;
    }

    .dialogo-pie .aplicar {
      padding: 0.875rem 1.5rem;
      border: none;
      border-radius: 0.5rem;
      background: #222;
      color: white;
      font: 600 1rem Inter, system-ui, sans-serif;
      cursor: pointer;
    }

    .layout {
      display: grid;
      grid-template-columns: minmax(0, 1.05fr) minmax(0, 1fr);
      gap: 3rem;
      padding: 2rem 3rem;
    }

    .cabecera {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
    }

    h1 {
      margin: 0;
      font-size: 1.375rem;
      font-weight: 500;
    }

    .nota {
      font-size: 0.875rem;
      white-space: nowrap;
    }

    .cabecera {
      flex-wrap: wrap;
      gap: 0.75rem;
    }

    .grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 2rem 1.5rem;
    }

    .estado {
      padding: 4rem 0;
      text-align: center;
      color: #6a6a6a;
    }

    .paginas {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 0.5rem;
      margin: 3rem 0 1rem;
    }

    .paginas button {
      min-width: 2.5rem;
      height: 2.5rem;
      padding: 0 0.75rem;
      border: none;
      border-radius: 9999px;
      background: transparent;
      font: 500 0.9375rem Inter, system-ui, sans-serif;
      color: #222;
      cursor: pointer;
    }

    .paginas button:hover:not(:disabled):not([aria-current="page"]) {
      background: #f2f2f2;
    }

    .paginas button[aria-current="page"] {
      background: #222;
      color: white;
    }

    .paginas button:disabled {
      color: #c4c4c4;
      cursor: default;
    }

    .mapa {
      position: sticky;
      top: 1rem;
      align-self: start;
      height: calc(100vh - 2rem);
      border-radius: 1.5rem;
      overflow: hidden;
      background: #e8eaed;
    }

    .mapa iframe {
      width: 100%;
      height: 100%;
      border: 0;
    }

    @media (max-width: 1000px) {
      .layout {
        grid-template-columns: minmax(0, 1fr);
        padding: 1.5rem;
      }

      .mapa {
        display: none;
      }
    }

    @media (max-width: 560px) {
      .grid {
        grid-template-columns: minmax(0, 1fr);
      }
    }
  `}connectedCallback(){super.connectedCallback(),window.addEventListener(`popstate`,this.onPopState),this.normalizarUrl(),this.consulta=La(),Z.servicios().then(e=>this.servicios=e.slice(0,10)).catch(()=>{}),this.cargar()}disconnectedCallback(){window.removeEventListener(`popstate`,this.onPopState),super.disconnectedCallback()}normalizarUrl(){let e=La(),t=this.construirUrl(e);t!==window.location.pathname+window.location.search&&window.history.replaceState({},``,t)}construirUrl(e,t={}){let n={...e,...t},r=new URLSearchParams;return n.texto?r.set(`texto`,n.texto):r.set(`cerca`,`true`),n.categoria>0&&r.set(`categoria`,String(n.categoria)),n.desde&&r.set(`desde`,n.desde),n.hasta&&r.set(`hasta`,n.hasta),n.huespedes>0&&r.set(`huespedes`,String(n.huespedes)),n.servicios.length>0&&r.set(`servicios`,n.servicios.join(`,`)),r.set(`pagina`,String(n.pagina)),r.set(`tamanio`,String(n.tamanio)),`/alojamientos?${r}`}actualizar(e){P(this.construirUrl(this.consulta,e))}async cargar(){let e=++this.peticion;this.cargando=!0,this.error=``;let t=this.consulta;try{let n=await Z.propiedades({texto:t.texto||void 0,categoriaId:t.categoria||void 0,huespedes:t.huespedes||void 0,servicioIds:t.servicios},t.pagina,t.tamanio);e===this.peticion&&(this.resultado=n)}catch{e===this.peticion&&(this.resultado=null,this.error=`No pudimos cargar los alojamientos. Inténtalo de nuevo.`)}finally{e===this.peticion&&(this.cargando=!1)}}abrirFiltros(){this.borrador=[...this.consulta.servicios],this.dialogoAbierto=!0}alternarBorrador(e,t){this.borrador=t?[...this.borrador,e]:this.borrador.filter(t=>t!==e)}aplicarFiltros(){this.dialogoAbierto=!1,this.actualizar({servicios:this.borrador,pagina:0})}irAPagina(e){this.actualizar({pagina:e}),window.scrollTo({top:0})}renderPaginas(){let e=this.resultado;if(!e||e.totalPaginas<=1)return D;let t=e.pagina,n=Math.max(0,Math.min(t-2,e.totalPaginas-5)),r=Math.min(e.totalPaginas,n+5),i=Array.from({length:r-n},(e,t)=>n+t);return T`<nav class="paginas" aria-label="Paginación">
      <button
        aria-label="Página anterior"
        ?disabled=${t===0}
        @click=${()=>this.irAPagina(t-1)}
      >
        ‹
      </button>
      ${i.map(e=>T`<button
          aria-current=${e===t?`page`:`false`}
          @click=${()=>this.irAPagina(e)}
        >
          ${e+1}
        </button>`)}
      <button
        aria-label="Página siguiente"
        ?disabled=${e.esUltima}
        @click=${()=>this.irAPagina(t+1)}
      >
        ›
      </button>
    </nav>`}renderLista(){if(this.cargando&&!this.resultado)return T`<p class="estado">Cargando alojamientos…</p>`;if(this.error)return T`<p class="estado" role="alert">${this.error}</p>`;let e=this.resultado;return!e||e.contenido.length===0?T`<p class="estado">
        No encontramos alojamientos con estos filtros.
      </p>`:T`<div class="grid" style=${this.cargando?`opacity:.5`:``}>
        ${e.contenido.map(e=>T`<listing-card
            .propiedad=${e}
            desde=${this.consulta.desde}
            hasta=${this.consulta.hasta}
          ></listing-card>`)}
      </div>
      ${this.renderPaginas()}`}render(){let e=this.consulta,t=this.resultado?.total;return T`
      <div class="layout">
        <section>
          <div class="cabecera">
            <h1>${t===void 0?`Buscando alojamientos`:`${t>1e3?`Más de 1000`:t} alojamiento${t===1?``:`s`}${e.texto?` en ${e.texto}`:` cerca de ti`}`}</h1>
            <div class="acciones">
              <span class="nota">Los precios incluyen todas las tarifas</span>
              <button class="boton-filtros" @click=${this.abrirFiltros}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M2 4h7M13 4h1M2 12h1M7 12h7"/><circle cx="11" cy="4" r="1.75"/><circle cx="5" cy="12" r="1.75"/></svg>
                Filtros
                ${e.servicios.length>0?T`<span class="num">${e.servicios.length}</span>`:D}
              </button>
            </div>
          </div>
          ${this.renderLista()}
        </section>
        <div class="mapa">
          <iframe
            title="Mapa de alojamientos"
            loading="lazy"
            src="https://www.openstreetmap.org/export/embed.html?bbox=-77.15%2C-12.20%2C-76.90%2C-11.95&layer=mapnik"
          ></iframe>
        </div>
      </div>
      <wa-dialog
        label="Filtros"
        ?open=${this.dialogoAbierto}
        @wa-after-hide=${()=>this.dialogoAbierto=!1}
      >
        <div class="dialogo-lista">
          ${this.servicios.map(e=>T`<wa-checkbox
              ?checked=${this.borrador.includes(e.id)}
              @change=${t=>this.alternarBorrador(e.id,t.target.checked)}
              >${e.nombre}</wa-checkbox
            >`)}
        </div>
        <div class="dialogo-pie">
          <button class="borrar" @click=${()=>this.borrador=[]}>Borrar</button>
          <button class="aplicar" @click=${this.aplicarFiltros}>Mostrar resultados</button>
        </div>
      </wa-dialog>
    `}};N([j()],Ra.prototype,`consulta`,void 0),N([j()],Ra.prototype,`servicios`,void 0),N([j()],Ra.prototype,`resultado`,void 0),N([j()],Ra.prototype,`dialogoAbierto`,void 0),N([j()],Ra.prototype,`borrador`,void 0),N([j()],Ra.prototype,`cargando`,void 0),N([j()],Ra.prototype,`error`,void 0),Ra=N([k(`search-results`)],Ra);var za=class extends O{constructor(...e){super(...e),this.reservas=[],this.propiedades=[]}static{this.styles=p`
    .container {
      padding: var(--padding-page);
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .button-container {
      display: flex;
      justify-content: center;
      column-gap: 1rem;
      margin-bottom: 8rem;

      .button {
        &::part(base button) {
          border-radius: 2rem;
          font-size: 0.9rem;
          height: 3rem;
        }

        &.button-primary::part(base button) {
          background-color: #404040;
          color: white;
        }

        &.button-secondary::part(base button) {
          background-color: #f3f4f6;
          color: #404040;
        }
      }
    }

    .info-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;

      h2 {
        font-size: 2rem;
        width: 70%;
        text-align: center;
        line-height: 1.05;
        margin-bottom: 0;
      }

      p {
        color: var(--color-gray-light);
        font-size: 1.2rem;
        font-weight: 600;
        width: 60%;
        line-height: 1.25;
        margin-bottom: 3rem;
      }

      wa-button::part(base button) {
        justify-content: start;
        background-color: #f3f4f6;
        font-weight: bold;
        font-size: 0.9rem;
        height: 3rem;
        border-radius: 1rem;
      }
    }
  `}connectedCallback(){if(super.connectedCallback(),!Y()?.esAnfitrion){P(`/hosting/anuncios/nuevo`);return}Z.reservasRecibidas().then(e=>this.reservas=e).catch(()=>{}),Z.misPropiedades().then(e=>this.propiedades=e).catch(()=>{})}render(){let e=!this.propiedades.some(e=>e.estado===`PUBLICADA`);return T` <main class="container">
      <div>
        <div class="button-container">
          <wa-button class="button button-primary" size="xs">Hoy</wa-button>
          <wa-button class="button button-secondary" size="xs"
            >Reservaciones programadas</wa-button
          >
        </div>
        ${this.reservas.length>0?T`<ul>
              ${this.reservas.map(e=>T`<li>
                  ${e.tituloPropiedad} · ${e.nombreUsuario} ·
                  ${e.fechaInicio} → ${e.fechaFin}
                </li>`)}
            </ul>`:T`<div class="info-container">
          <img src="/book-user.avif" alt="Imagen de libro" />
          <h2>No tienes </br> ninguna reservacion</h2>
          <p>
            Para recibir reservaciones, tienes que completar tu anuncio y
            publicarlo.
          </p>
          ${e?T`<wa-button href="/hosting/anuncios/nuevo"
                >Completa tu anuncio</wa-button
              >`:``}
        </div>`}
      </div>
    </main>`}};N([j()],za.prototype,`reservas`,void 0),N([j()],za.prototype,`propiedades`,void 0),za=N([k(`user-host`)],za);var Ba=class extends O{constructor(...e){super(...e),this.propiedades=null,this.error=``,this.publicando=null}static{this.styles=p`
    .container {
      padding: var(--padding-page);
      max-width: 60rem;
      margin: 0 auto;
    }

    .cabecera {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
    }

    h1 {
      margin: 0;
      font-size: 2rem;
    }

    wa-button::part(base button) {
      background-color: #222;
      color: white;
      font-weight: bold;
      height: 2.75rem;
      border-radius: 0.75rem;
    }

    ul {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    li {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem;
      border: 1px solid #ebebeb;
      border-radius: 1rem;
    }

    .foto {
      width: 6rem;
      height: 5rem;
      border-radius: 0.75rem;
      object-fit: cover;
      background: #ebebeb;
      flex-shrink: 0;
    }

    .info {
      flex-grow: 1;
    }

    .titulo {
      font-weight: 600;
    }

    .gris {
      color: #6a6a6a;
      font-size: 0.875rem;
    }

    .estado {
      padding: 0.25rem 0.75rem;
      border-radius: 9999px;
      background: #f3f4f6;
      font-size: 0.75rem;
      font-weight: 700;
    }

    .estado.publicada {
      background: #dcfce7;
      color: #166534;
    }

    .publicar {
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 0.5rem;
      background: #222;
      color: white;
      font: 600 0.875rem Inter, system-ui, sans-serif;
      cursor: pointer;
    }

    .publicar:disabled {
      opacity: 0.6;
      cursor: wait;
    }

    .vacio {
      padding: 3rem 0;
      text-align: center;
      color: #6a6a6a;
    }
  `}async cargar(){try{this.propiedades=await Z.misPropiedades()}catch{this.error=`No pudimos cargar tus anuncios.`}}async publicar(e){this.publicando=e,this.error=``;try{await Z.publicar(e),await this.cargar()}catch{this.error=`No pudimos publicar el anuncio. Revisa que tenga habitación, fotos y datos completos.`}finally{this.publicando=null}}connectedCallback(){if(super.connectedCallback(),!Y()?.esAnfitrion){P(`/hosting/anuncios/nuevo`);return}this.cargar()}render(){let e=this.propiedades;return T`<main class="container">
      <div class="cabecera">
        <h1>Tus anuncios</h1>
        <wa-button size="xs" href="/hosting/anuncios/nuevo">Crear anuncio</wa-button>
      </div>
      ${this.error?T`<p role="alert">${this.error}</p>`:``}
      ${e&&e.length===0?T`<p class="vacio">Todavía no tienes anuncios.</p>`:T`<ul>
            ${(e??[]).map(e=>T`<li>
                ${e.imagenPrincipal?T`<img class="foto" src=${e.imagenPrincipal} alt="" />`:T`<span class="foto"></span>`}
                <div class="info">
                  <div class="titulo">${e.titulo}</div>
                  <div class="gris">${e.tipoAlojamiento} · ${e.ubicacion}</div>
                </div>
                <span class=${e.estado===`PUBLICADA`?`estado publicada`:`estado`}>
                  ${e.estado===`PUBLICADA`?`Publicado`:`Borrador`}
                </span>
                ${e.estado===`PUBLICADA`?``:T`<button
                      class="publicar"
                      ?disabled=${this.publicando===e.id}
                      @click=${()=>this.publicar(e.id)}
                    >
                      ${this.publicando===e.id?`Publicando…`:`Publicar`}
                    </button>`}
              </li>`)}
          </ul>`}
    </main>`}};N([j()],Ba.prototype,`propiedades`,void 0),N([j()],Ba.prototype,`error`,void 0),N([j()],Ba.prototype,`publicando`,void 0),Ba=N([k(`host-listings`)],Ba);var Va=`modulepreload`,Ha=function(e){return`/`+e},Ua={},Wa=function(e,t,n){let r=Promise.resolve();if(t&&t.length>0){let e=document.getElementsByTagName(`link`),i=document.querySelector(`meta[property=csp-nonce]`),a=i?.nonce||i?.getAttribute(`nonce`);function o(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}function s(e){return import.meta.resolve?import.meta.resolve(e):new URL(e,import.meta.url).href}r=o(t.map(t=>{if(t=Ha(t,n),t=s(t),t in Ua)return;Ua[t]=!0;let r=t.endsWith(`.css`);for(let n=e.length-1;n>=0;n--){let i=e[n];if(i.href===t&&(!r||i.rel===`stylesheet`))return}let i=document.createElement(`link`);if(i.rel=r?`stylesheet`:Va,r||(i.as=`script`),i.crossOrigin=``,i.href=t,a&&i.setAttribute(`nonce`,a),document.head.appendChild(i),r)return new Promise((e,n)=>{i.addEventListener(`load`,e),i.addEventListener(`error`,()=>n(Error(`Unable to preload CSS for ${t}`)))})}))}function i(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return r.then(t=>{for(let e of t||[])e.status===`rejected`&&i(e.reason);return e().catch(i)})},Ga=class extends O{constructor(...e){super(...e),this.isProfilePage=!1,this.isUserHost=!1,this.isOnboarding=!1,this.router=new o(this,[{path:`/`,enter:()=>this.setMode({}),render:()=>T`<home-page></home-page>`},{path:`/alojamientos`,enter:()=>this.setMode({}),render:()=>T`<search-results></search-results>`},{path:`/users/profile`,enter:()=>this.setMode({profile:!0}),render:()=>T`<user-profile></user-profile>`},{path:`/hosting`,enter:()=>this.setMode({profile:!0,host:!0}),render:()=>T`<user-host></user-host>`},{path:`/hosting/anuncios`,enter:()=>this.setMode({profile:!0,host:!0}),render:()=>T`<host-listings></host-listings>`},{path:`/hosting/anuncios/nuevo`,enter:async()=>(await Wa(()=>import(`./host-listing-wizard-554tD7RH.js`),[]),this.setMode({onboarding:!0})),render:()=>T`<host-listing-wizard></host-listing-wizard>`},{path:`/hosting/nuevo`,enter:async()=>(await Wa(()=>import(`./host-listing-wizard-554tD7RH.js`),[]),this.setMode({onboarding:!0})),render:()=>T`<host-listing-wizard></host-listing-wizard>`}])}setMode(e){return this.isProfilePage=e.profile??!1,this.isUserHost=e.host??!1,this.isOnboarding=e.onboarding??!1,!0}render(){return T`
      ${this.isOnboarding?``:T`<header-layout
            .hideProfile=${this.isProfilePage}
            .hideHost=${this.isUserHost}
          ></header-layout>`}
      ${this.router.outlet()}
    `}};N([j()],Ga.prototype,`isProfilePage`,void 0),N([j()],Ga.prototype,`isUserHost`,void 0),N([j()],Ga.prototype,`isOnboarding`,void 0),Ga=N([k(`app-layout`)],Ga);export{P as a,A as c,D as d,T as f,la as i,k as l,f as m,ca as n,N as o,p,Y as r,j as s,Z as t,O as u};