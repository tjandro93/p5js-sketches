"use strict";(self.webpackChunkng_p5js_sketches=self.webpackChunkng_p5js_sketches||[]).push([[362],{2362:(R,j,l)=>{l.r(j),l.d(j,{Hito4Module:()=>U});var O=l(9808),x=l(5961),A=l(2215),P=l(8185);const v={title:"Hitomezashi Stitch Attempt 4",description:"Ported from Processing. Trying perlin noise for random function. Pretty sure this isn't working like the Processing onemptied...",width:600,height:600,func:t=>{let s,i,a,h,d,w,M,u=.05,m=.05;function k(o,e,n,c,r,f){const J=o.map(c,r,f,50,255);o.push(),o.stroke(P.n,J),o.line(e.x,e.y,n.x,n.y),o.pop()}t.setup=()=>{(0,x.$)(t,{width:v.width,height:v.height}),t.background(A.y),t.fill(P.n),t.stroke(P.n),t.strokeWeight(2),t.strokeCap(t.ROUND),function B(o,e){s=[];const n=t.width/o,c=t.height/e;for(let r=0;r<o;r++){s.push([]);for(let f=0;f<e;f++)s[r][f]=t.createVector(r*n,f*c,t.random())}i=Array.from({length:o+1},()=>t.random(0,0)),a=Array.from({length:e+1},()=>t.random(0,0)),h=Array.from({length:o+1},()=>!0),d=Array.from({length:e+1},()=>!0)}(30,30)},t.draw=()=>{t.background(A.y),u=.5,m=.5,w=.05,M=.05,function G(){for(let o=1;o<s[0].length-1;o++){const e=t.noise(o*u,a[o])<.5;for(let n=1;n<s.length-2;n++){const c=s[n][o],r=s[n+1][o];(e&&n%2==0||!e&&n%2==1)&&k(t,c,r,a[o]*u,0,0)}a[o]>=0&&(d[o]=!1),a[o]<=0&&(d[o]=!0),a[o]=d[o]?a[o]+.05:a[o]-.05}}(),function F(){for(let o=1;o<s.length-1;o++){const e=t.noise(o*m,i[o])<.5;for(let n=1;n<s[o].length-2;n++){const c=s[o][n],r=s[o][n+1];(e&&n%2==0||!e&&n%2==1)&&k(t,c,r,i[o]*m,0,0)}i[o]>=0&&(h[o]=!1),i[o]<=0&&(h[o]=!0),i[o]=h[o]?i[o]+.05:i[o]-.05}}()}}};var C=l(8555),D=l(7755),H=l(5e3);let U=(()=>{class t{}return t.\u0275fac=function(i){return new(i||t)},t.\u0275mod=H.oAB({type:t}),t.\u0275inj=H.cJS({imports:[[O.ez,C.Bz.forChild([{path:"",component:D.k,data:v}])]]}),t})()}}]);