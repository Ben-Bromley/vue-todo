import{o as u,c as d,a as r,b as i,w as p,u as c,R as _,d as L,F as y,e as f,r as V,f as k,t as h,p as A,g as E,h as x,i as O,j as $}from"./vendor.3be8b063.js";const I=function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const n of o.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&t(n)}).observe(document,{childList:!0,subtree:!0});function l(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerpolicy&&(o.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?o.credentials="include":e.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function t(e){if(e.ep)return;e.ep=!0;const o=l(e);fetch(e.href,o)}};I();var P="/assets/logo.da9b9095.svg";const R=r("img",{alt:"Vue logo",class:"logo",src:P,width:"30",height:"30"},null,-1),S=f("Todo"),N=f("Calculator"),B={setup(a){return(s,l)=>(u(),d(y,null,[r("header",null,[r("nav",null,[i(c(_),{to:"/"},{default:p(()=>[R]),_:1}),r("div",null,[i(c(_),{to:"/todo"},{default:p(()=>[S]),_:1}),i(c(_),{to:"/calculator"},{default:p(()=>[N]),_:1})])])]),i(c(L))],64))}},C="modulepreload",m={},T="/",v=function(s,l){return!l||l.length===0?s():Promise.all(l.map(t=>{if(t=`${T}${t}`,t in m)return;m[t]=!0;const e=t.endsWith(".css"),o=e?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${t}"]${o}`))return;const n=document.createElement("link");if(n.rel=e?"stylesheet":C,e||(n.as="script",n.crossOrigin=""),n.href=t,document.head.appendChild(n),e)return new Promise((b,w)=>{n.addEventListener("load",b),n.addEventListener("error",w)})})).then(()=>s())};var D=(a,s)=>{const l=a.__vccOpts||a;for(const[t,e]of s)l[t]=e;return l};const F=a=>(A("data-v-2b80c81a"),a=a(),E(),a),H=F(()=>r("section",{class:"landing"},[r("div",null,[r("h1",null,"Welcome to Vuetilities"),r("p",null,[f(" Vuetilities is a collection of web-based utility apps, designed and built by "),r("a",{class:"link",href:"https://www.github.com/ben-bromley"},"Ben Bromley")])])],-1)),W={class:"card-container"},q=["href"],j={setup(a){const s=V([{title:"Todo App",path:"todo",description:"A simple todo application"},{title:"Calculator App",path:"calculator",description:"A simple calculator application"}]);return(l,t)=>(u(),d("main",null,[H,r("section",W,[(u(!0),d(y,null,k(s.value,e=>(u(),d("a",{href:"/"+e.path,class:"card",key:e.title},[r("div",null,[r("h2",null,h(e.title),1),r("p",null,h(e.description),1)])],8,q))),128))])]))}};var K=D(j,[["__scopeId","data-v-2b80c81a"]]);const z=x({history:O("/"),routes:[{path:"/",name:"home",component:K},{path:"/todo",name:"todo app",component:()=>v(()=>import("./TodoApp.e030077b.js"),["assets/TodoApp.e030077b.js","assets/TodoApp.82727c0c.css","assets/vendor.3be8b063.js"])},{path:"/calculator",name:"calculator app",component:()=>v(()=>import("./CalculatorApp.83797540.js"),["assets/CalculatorApp.83797540.js","assets/vendor.3be8b063.js"])}]}),g=$(B);g.use(z);g.mount("#app");export{D as _};