"use strict";(self.webpackChunkng_p5js_sketches=self.webpackChunkng_p5js_sketches||[]).push([[655],{5655:(y,l,s)=>{s.r(l),s.d(l,{RandomGuassianLinesModule:()=>k});var A=s(9808),a=s(1081),L=s(5961),i=s(2215),z=s(8185);const t=new a.NA("Pause"),m=new a.NA("Draw Once"),v=new a.zA("Segments",1,500,100,1),g=new a.zA("Lines",1,500,50,1),u=new a.zA("Gaus Mean",-100,100,0,.1),r=new a.zA("Gaus SD",-100,100,20,1),M={title:"Random Guassian Lines",controls:{customControls:[t,m,v,g,u,r]},func:n=>{let e=!0;function o(){n.background(i.y);for(let f=0;f<g.value;f++){let d=n.width/2,c=n.height/2;for(let G=0;G<v.value;G++){const R=n.constrain(d+n.randomGaussian(u.value,r.value),0,n.width),S=n.constrain(c+n.randomGaussian(u.value,r.value),0,n.height);n.line(d,c,R,S),d=R,c=S}}}n.setup=()=>{(0,L.$)(n),n.frameRate(15),n.background(i.y),n.stroke(z.n),m.onPress=()=>{o()},t.onPress=()=>{e=!e,t.label$.next(e?"Pause":"Run")}},n.draw=()=>{e&&o()}}};var w=s(8555),P=s(7755),j=s(2271),h=s(5e3);let k=(()=>{class n{}return n.\u0275fac=function(o){return new(o||n)},n.\u0275mod=h.oAB({type:n}),n.\u0275inj=h.cJS({imports:[[A.ez,j.m,w.Bz.forRoot([{path:"",component:P.k,data:M}])]]}),n})()}}]);