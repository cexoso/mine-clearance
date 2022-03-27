var b=Object.defineProperty;var x=(o,e,t)=>e in o?b(o,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):o[e]=t;var r=(o,e,t)=>(x(o,typeof e!="symbol"?e+"":e,t),t);import{B as h}from"./vendor.b9f6432c.js";const w=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))l(n);new MutationObserver(n=>{for(const s of n)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&l(i)}).observe(document,{childList:!0,subtree:!0});function t(n){const s={};return n.integrity&&(s.integrity=n.integrity),n.referrerpolicy&&(s.referrerPolicy=n.referrerpolicy),n.crossorigin==="use-credentials"?s.credentials="include":n.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function l(n){if(n.ep)return;n.ep=!0;const s=t(n);fetch(n.href,s)}};w();const v=(o,e)=>{for(let t=0;t<o.length;t++){const l=o[t];for(let n=0;n<l.length;n++){const s=l[n];e(s,t,n)}}};class M{constructor(e){r(this,"state$",new h("idle"));r(this,"getConfig",()=>{const{row:e=10,col:t=20,mineCount:l=9}=this.opts;return{row:e,col:t,mineCount:l}});r(this,"allCellCount",0);r(this,"map$");r(this,"visibleCount",0);this.opts=e;const{row:t,col:l,mineCount:n}=this.getConfig();this.allCellCount=t*l-n,this.map$=this.createEmptyMap()}get map(){return this.map$.getValue()}setMine(e){const t=this.map;for(let l=0;l<e.length;l++){const n=e[l],s=this.createCell(-1);t[n.row][n.col].next(s),this.increaseValueAroundMine(n.row,n.col)}}increaseValueAroundMine(e,t){this.getAroundValidCell(e,t).forEach(([l,n])=>this.increaseValue(l,n))}increaseValue(e,t){const n=this.map[e];if(n===void 0)return;const s=n[t];if(s===void 0)return;const i=s.getValue();i.value!==-1&&(i.value+=1,s.next(i))}createCell(e=0){return{value:e,visible:!1,hasFlame:!1}}randomMime(){const{row:e,col:t,mineCount:l}=this.getConfig(),n=e*t;if(l>n)throw new Error("count of mine should less then map size");if(l<0)throw new Error("count of mine should greater or equeal 0");const s=[];for(let i=0;i<n;i++)s.push(i);for(let i=0;i<l;i++){const a=Math.floor(Math.random()*s.length),f=s[a];s.splice(a,1);const g=Math.floor(f/t),C=f%t;this.map[g][C].getValue().value=-1,this.increaseValueAroundMine(g,C)}}isMine(e,t){return this.map[e][t].getValue().value===-1}createEmptyMap(){const e=[],{row:t,col:l}=this.getConfig();for(let n=0;n<t;n++){const s=[];for(let i=0;i<l;i++){const a=new h(this.createCell());s.push(a)}e.push(s)}return new h(e)}reset(){v(this.map,e=>{e.next(this.createCell())})}randomMap(){this.reset(),this.randomMime(),this.state$.next("begin")}getSnapshot(){return this.map.map(e=>e.map(t=>t.getValue().value))}getVisibleSnapshot(){return this.map.map(e=>e.map(t=>t.getValue().visible))}getAroundValidCell(e,t){const{row:l,col:n}=this.getConfig();return[[e-1,t-1],[e-1,t],[e-1,t+1],[e,t-1],[e,t+1],[e+1,t-1],[e+1,t],[e+1,t+1]].filter(([i,a])=>0<=i&&i<l&&0<=a&&a<n)}cleanCell(e,t){if(this.map[e][t].getValue().visible)return;if(this.expandAroundCell(e,t)){this.checkIsSuccess();return}return this.state$.next("fail"),this.showAllCell(),!1}checkIsSuccess(){this.visibleCount===this.allCellCount&&this.state$.next("success")}showAllCell(){const e=this.map;v(e,t=>{t.value.visible=!0,t.next(t.value)})}expandAroundCell(e,t){const n=this.map[e][t],s=n.getValue();return s.value===-1?!1:(s.visible||(s.visible=!0,this.visibleCount+=1,n.next(s),s.value===0&&this.getAroundValidCell(e,t).forEach(([i,a])=>{this.expandAroundCell(i,a)})),!0)}setFlame(e,t){const l=this.map[e][t],n=l.getValue();n.hasFlame=!n.hasFlame,l.next(n)}}const c=new M({row:10,col:10,mineCount:9});c.randomMap();const u=document.querySelector("#app"),V=(o,e,t)=>{const l=document.createElement("div");return l.addEventListener("click",n=>{n.metaKey?c.setFlame(e,t):c.cleanCell(e,t)}),o.subscribe(n=>{n.visible?l.innerText=n.value===-1?"*":String(n.value):n.hasFlame?l.innerText="F":l.innerText="";const s=`cell ${n.visible?"visible":"hidden"} `;l.className=s}),l};c.map$.subscribe(o=>{const e=document.createDocumentFragment();for(let t=0;t<o.length;t++){const l=o[t],n=document.createElement("div");n.className="row";for(let s=0;s<o.length;s++){const i=l[s];n.append(V(i,t,s))}e.append(n)}u.append(e)});const d=document.createElement("div");d.className="tips";d.innerText="click the cell to check whether is a mine, hold command key and click the cell will set or unset a flame on the cell";u.append(d);const m=document.createElement("button");m.className="start_button";m.innerText="start";m.addEventListener("click",()=>{c.randomMap()});u.append(m);const p=document.createElement("div");p.className="status";c.state$.subscribe(o=>{p.innerText=o});u.append(p);
