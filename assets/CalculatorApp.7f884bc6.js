import{_ as m}from"./index.f7e29782.js";import{o as u,c as r,p as h,f as p,a as s,r as o,y as f,b as M,u as H,F as g,e as y,h as C}from"./vendor.098df5e6.js";const V={},k=n=>(h("data-v-18ed8c48"),n=n(),p(),n),w={xmlns:"http://www.w3.org/2000/svg",width:"18",height:"22",fill:"currentColor"},x=k(()=>s("path",{d:"M11.447 8.894a1 1 0 1 0-.894-1.789l.894 1.789zm-2.894-.789a1 1 0 1 0 .894 1.789l-.894-1.789zm0 1.789a1 1 0 1 0 .894-1.789l-.894 1.789zM7.447 7.106a1 1 0 1 0-.894 1.789l.894-1.789zM10 9a1 1 0 1 0-2 0h2zm-2 2.5a1 1 0 1 0 2 0H8zm9.447-5.606a1 1 0 1 0-.894-1.789l.894 1.789zm-2.894-.789a1 1 0 1 0 .894 1.789l-.894-1.789zm2 .789a1 1 0 1 0 .894-1.789l-.894 1.789zm-1.106-2.789a1 1 0 1 0-.894 1.789l.894-1.789zM18 5a1 1 0 1 0-2 0h2zm-2 2.5a1 1 0 1 0 2 0h-2zm-5.447-4.606a1 1 0 1 0 .894-1.789l-.894 1.789zM9 1l.447-.894a1 1 0 0 0-.894 0L9 1zm-2.447.106a1 1 0 1 0 .894 1.789l-.894-1.789zm-6 3a1 1 0 1 0 .894 1.789L.553 4.106zm2.894.789a1 1 0 1 0-.894-1.789l.894 1.789zm-2-.789a1 1 0 1 0-.894 1.789l.894-1.789zm1.106 2.789a1 1 0 1 0 .894-1.789l-.894 1.789zM2 5a1 1 0 1 0-2 0h2zM0 7.5a1 1 0 1 0 2 0H0zm8.553 12.394a1 1 0 1 0 .894-1.789l-.894 1.789zm-1.106-2.789a1 1 0 1 0-.894 1.789l.894-1.789zm1.106 1a1 1 0 1 0 .894 1.789l-.894-1.789zm2.894.789a1 1 0 1 0-.894-1.789l.894 1.789zM8 19a1 1 0 1 0 2 0H8zm2-2.5a1 1 0 1 0-2 0h2zm-7.447.394a1 1 0 1 0 .894-1.789l-.894 1.789zM1 15H0a1 1 0 0 0 .553.894L1 15zm1-2.5a1 1 0 1 0-2 0h2zm12.553 2.606a1 1 0 1 0 .894 1.789l-.894-1.789zM17 15l.447.894A1 1 0 0 0 18 15h-1zm1-2.5a1 1 0 1 0-2 0h2zm-7.447-5.394l-2 1 .894 1.789 2-1-.894-1.789zm-1.106 1l-2-1-.894 1.789 2 1 .894-1.789zM8 9v2.5h2V9H8zm8.553-4.894l-2 1 .894 1.789 2-1-.894-1.789zm.894 0l-2-1-.894 1.789 2 1 .894-1.789zM16 5v2.5h2V5h-2zm-4.553-3.894l-2-1-.894 1.789 2 1 .894-1.789zm-2.894-1l-2 1 .894 1.789 2-1L8.553.106zM1.447 5.894l2-1-.894-1.789-2 1 .894 1.789zm-.894 0l2 1 .894-1.789-2-1-.894 1.789zM0 5v2.5h2V5H0zm9.447 13.106l-2-1-.894 1.789 2 1 .894-1.789zm0 1.789l2-1-.894-1.789-2 1 .894 1.789zM10 19v-2.5H8V19h2zm-6.553-3.894l-2-1-.894 1.789 2 1 .894-1.789zM2 15v-2.5H0V15h2zm13.447 1.894l2-1-.894-1.789-2 1 .894 1.789zM18 15v-2.5h-2V15h2z"},null,-1)),I=[x];function L(n,e){return u(),r("svg",w,I)}var $=m(V,[["render",L],["__scopeId","data-v-18ed8c48"]]);const S=C(" Calculator "),T=["innerHTML"],A={id:"calculator-grid"},F=["innerHTML","onClick"],N={setup(n){const e=o(["",""]),t=o(null),z=o([1,2,3,"&divide;",4,5,6,"&times;",7,8,9,"&minus;",0,".","&equals;","&plus;"]),_=f(()=>t.value===null?e.value[0]:e.value[0]+` ${t.value} `+e.value[1]),v=a=>{if(typeof a=="number")e.value[t.value===null?0:1]+=String(a);else if(a==="&equals;"){if(!e.value[1])return;let l=d();l?(e.value=[l,""],t.value=null):i()}else if(a==="."){let l=String(e.value[t.value===null?0:1]);l.charAt(l.length-1)||(e.value[t.value===null?0:1]+="0"),e.value[t.value===null?0:1]+="."}else e.value[1]===""&&(t.value=a)},d=()=>{let a=parseFloat(e.value[0]),l=parseFloat(e.value[1]);switch(t.value){case"&divide;":return a/l;case"&times;":return a*l;case"&minus;":return a-l;case"&plus;":return a+l;default:alert("No Operation Selected");return}},i=()=>{e.value=["",""],t.value=null};return(a,l)=>(u(),r("section",null,[s("h1",null,[M($),S]),s("div",null,[s("p",{id:"calculator-value",innerHTML:H(_)},null,8,T)]),s("section",A,[(u(!0),r(g,null,y(z.value,c=>(u(),r("button",{class:"calculator-button",key:c,innerHTML:c,onClick:q=>v(c)},null,8,F))),128)),s("button",{class:"calculator-button",onClick:l[0]||(l[0]=c=>i())},"C")])]))}};var O=m(N,[["__scopeId","data-v-3ce6ab37"]]);export{O as default};
