var y=Object.defineProperty;var E=(i,t,e)=>t in i?y(i,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):i[t]=e;var d=(i,t,e)=>(E(i,typeof t!="symbol"?t+"":t,e),e);import{B as v}from"./vendor.b9f6432c.js";const V=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))o(n);new MutationObserver(n=>{for(const s of n)if(s.type==="childList")for(const l of s.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&o(l)}).observe(document,{childList:!0,subtree:!0});function e(n){const s={};return n.integrity&&(s.integrity=n.integrity),n.referrerpolicy&&(s.referrerPolicy=n.referrerpolicy),n.crossorigin==="use-credentials"?s.credentials="include":n.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(n){if(n.ep)return;n.ep=!0;const s=e(n);fetch(n.href,s)}};V();const x=(i,t)=>{for(let e=0;e<i.length;e++){const o=i[e];for(let n=0;n<o.length;n++){const s=o[n];t(s,e,n)}}};class A{constructor(t){d(this,"state$",new v("idle"));d(this,"getConfig",()=>{const{row:t=10,col:e=20,mineCount:o=9}=this.opts;return{row:t,col:e,mineCount:o}});d(this,"allCellCount",0);d(this,"map$");d(this,"visibleCount",0);this.opts=t;const{row:e,col:o,mineCount:n}=this.getConfig();this.allCellCount=e*o-n,this.map$=this.createEmptyMap()}get map(){return this.map$.getValue()}setMine(t){const e=this.map;for(let o=0;o<t.length;o++){const n=t[o],s=this.createCell(-1);e[n.row][n.col].next(s),this.increaseValueAroundMine(n.row,n.col)}}increaseValueAroundMine(t,e){this.getAroundValidCell(t,e).forEach(([o,n])=>this.increaseValue(o,n))}increaseValue(t,e){const n=this.map[t];if(n===void 0)return;const s=n[e];if(s===void 0)return;const l=s.getValue();l.value!==-1&&(l.value+=1,s.next(l))}createCell(t=0){return{value:t,visible:!1,hasFlag:!1}}randomMime(){const{row:t,col:e,mineCount:o}=this.getConfig(),n=t*e;if(o>n)throw new Error("count of mine should less then map size");if(o<0)throw new Error("count of mine should greater or equeal 0");const s=[];for(let l=0;l<n;l++)s.push(l);for(let l=0;l<o;l++){const a=Math.floor(Math.random()*s.length),r=s[a];s.splice(a,1);const u=Math.floor(r/e),h=r%e;this.map[u][h].getValue().value=-1,this.increaseValueAroundMine(u,h)}}isMine(t,e){return this.map[t][e].getValue().value===-1}createEmptyMap(){const t=[],{row:e,col:o}=this.getConfig();for(let n=0;n<e;n++){const s=[];for(let l=0;l<o;l++){const a=new v(this.createCell());s.push(a)}t.push(s)}return new v(t)}reset(){x(this.map,t=>{t.next(this.createCell())})}randomMap(){this.reset(),this.randomMime(),this.state$.next("begin")}getSnapshot(){return this.map.map(t=>t.map(e=>e.getValue().value))}getVisibleSnapshot(){return this.map.map(t=>t.map(e=>e.getValue().visible))}getAroundValidCell(t,e){const{row:o,col:n}=this.getConfig();return[[t-1,e-1],[t-1,e],[t-1,e+1],[t,e-1],[t,e+1],[t+1,e-1],[t+1,e],[t+1,e+1]].filter(([l,a])=>0<=l&&l<o&&0<=a&&a<n)}cleanCell(t,e){if(this.map[t][e].getValue().visible)return;if(this.expandAroundCell(t,e)){this.checkIsSuccess();return}return this.state$.next("fail"),this.showAllCell(),!1}checkIsSuccess(){this.visibleCount===this.allCellCount&&this.state$.next("success")}showAllCell(){const t=this.map;x(t,e=>{e.value.visible=!0,e.next(e.value)})}expandAroundCell(t,e){const n=this.map[t][e],s=n.getValue();return s.value===-1?!1:(s.visible||(s.visible=!0,this.visibleCount+=1,n.next(s),s.value===0&&this.getAroundValidCell(t,e).forEach(([l,a])=>{this.expandAroundCell(l,a)})),!0)}setFlag(t,e){const o=this.map[t][e],n=o.getValue();n.hasFlag=!n.hasFlag,o.next(n)}}const c=window.devicePixelRatio||1;console.log(c);const w=16*c,N=i=>{const t=document.createElement("canvas");t.className="canvas",t.width=520*c,t.height=520*c;const e=t.getContext("2d");e.fillStyle="#605a22";const o=(n,s,l)=>{const a=(52*l+1)*c,r=(52*s+1)*c;e.font=`${w}px Avenir, Helvetica, Arial, sans-serif`,n.subscribe(u=>{e.fillRect(a,r,50*c,50*c);const h=M=>{e.save(),e.fillStyle="#a2a8db",e.textAlign="center",e.fillText(M,a+25*c,r+25*c+w/2),e.restore()};u.visible?h(u.value===-1?"*":String(u.value)):u.hasFlag&&h("F")})};return t.addEventListener("click",n=>{const s=Math.floor(n.offsetX/52),l=Math.floor(n.offsetY/52);n.metaKey?i.setFlag(l,s):i.cleanCell(l,s)}),i.map$.subscribe(n=>{for(let s=0;s<n.length;s++){const l=n[s];for(let a=0;a<n.length;a++){const r=l[a];o(r,s,a)}}}),t},S=i=>{const t=(o,n,s)=>{const l=document.createElement("div");return l.addEventListener("click",a=>{a.metaKey?i.setFlag(n,s):i.cleanCell(n,s)}),o.subscribe(a=>{a.visible?l.innerText=a.value===-1?"*":String(a.value):a.hasFlag?l.innerText="F":l.innerText="";const r=`cell ${a.visible?"visible":"hidden"} `;l.className=r}),l},e=document.createElement("div");return e.className="dom",i.map$.subscribe(o=>{for(let n=0;n<o.length;n++){const s=o[n],l=document.createElement("div");l.className="row";for(let a=0;a<o.length;a++){const r=s[a];l.append(t(r,n,a))}e.append(l)}}),e},m=new A({row:10,col:10,mineCount:9});m.randomMap();const f=document.querySelector("#app"),p=document.createElement("div");p.className="container";p.append(N(m));p.append(S(m));f.append(p);const C=document.createElement("div");C.className="tips";C.innerText="click the cell to check whether is a mine, hold command key and click the cell will set or unset a flame on the cell";f.append(C);const g=document.createElement("button");g.className="start_button";g.innerText="start";g.addEventListener("click",()=>{m.randomMap()});f.append(g);const b=document.createElement("div");b.className="status";m.state$.subscribe(i=>{b.innerText=i});f.append(b);
