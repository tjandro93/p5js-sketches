"use strict";(self.webpackChunkng_p5js_sketches=self.webpackChunkng_p5js_sketches||[]).push([[512],{512:(F,f,o)=>{o.r(f),o.d(f,{LeafModule:()=>k});var A=o(9808),C=o(2271),L=o(8555),W=o(7755),j=o(5961),z=o(2215),E=o(8185),M=o(6046),y=o(881),g=o(7430);const m={title:"Leaf",width:600,height:400,isSvg:!0,controls:{refreshButton:!0,downloadButton:!0},func:t=>{let n,s,e,r,d,l;t.setup=()=>{(0,j.$)(t,{useSvg:m.isSvg,width:m.width,height:m.height}),t.background(z.y),t.stroke(E.n),t.strokeWeight(1),t.noFill(),n={x:25,y:t.height/2},s={x:t.width-25,y:t.height/2},(0,M.j)(t,n,s),e={x:n.x+50,y:n.y},r={x:s.x,y:s.y},d={x:n.x+150,y:n.y-100},l={x:n.x+150,y:n.y+100},(0,y.W)(t,e,d,d,r),(0,y.W)(t,e,l,l,r);for(let c=1;c<10;c++){const a={x:t.map(c,0,30,e.x,r.x),y:t.map(c,0,30,e.y,r.y)},h=c/10,i=(0,g.o)(t,e,d,d,r,h),u=(0,g.o)(t,e,l,l,r,h),S={x:t.lerp(a.x,i.x,h),y:t.lerp(a.y,i.y,h)},B={x:t.lerp(a.x,u.x,h),y:t.lerp(a.y,u.y,h)};(0,y.W)(t,a,S,S,i),(0,y.W)(t,a,B,B,u)}}}};var v=o(5e3);let k=(()=>{class t{}return t.\u0275fac=function(s){return new(s||t)},t.\u0275mod=v.oAB({type:t}),t.\u0275inj=v.cJS({imports:[[A.ez,C.m,L.Bz.forRoot([{path:"",component:W.k,data:m}])]]}),t})()}}]);