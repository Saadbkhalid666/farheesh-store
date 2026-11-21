import {useState,useEffect} from 'react'
const D=new Date(),S=D.getSeconds(),M=D.getMinutes()*60+S,H=(D.getHours()%12)*3600+M;

export function Digi(){const [t,setT]=useState(new Date());useEffect(()=>{const i=setInterval(()=>setT(new Date()),1000);return()=>clearInterval(i)},[]);
 const p=n=>String(n).padStart(2,"0");return <><text x="50" y="56" textAnchor="middle" fontSize="19" fontFamily="monospace" fill="#1c2010" fontWeight="700">{p(t.getHours())}:{p(t.getMinutes())}</text><text x="50" y="65" textAnchor="middle" fontSize="6" fontFamily="monospace" fill="#1c2010">{p(t.getSeconds())}s</text></>}

export function Dial({w}){
 const m=w.mark,sub=(x,y,r)=><circle cx={x} cy={y} r={r} fill="#00000044" stroke={m} strokeOpacity=".5" strokeWidth=".6"/>;
 const dg=w.style==="digital";
 return <svg viewBox="0 0 100 100" className="w-full h-full">
  {w.style==="skel"&&<><circle cx="38" cy="46" r="17" fill="none" stroke={w.accent} strokeWidth="5" strokeDasharray="3 2.2" className="gear"/><circle cx="64" cy="58" r="11" fill="none" stroke={w.accent} strokeWidth="4" strokeDasharray="2.6 2" className="gear" style={{animationDirection:"reverse"}}/><circle cx="38" cy="46" r="5" fill={w.accent}/></>}
  {[...Array(60)].map((_,i)=>{const a=i*6*Math.PI/180,b=i%5===0;return <line key={i} x1={50+Math.sin(a)*(b?39:43)} y1={50-Math.cos(a)*(b?39:43)} x2={50+Math.sin(a)*46} y2={50-Math.cos(a)*46} stroke={m} strokeWidth={b?1.6:.4} strokeOpacity={b?1:.6}/>})}
  {w.style==="arabic"&&[[12,50,24],[3,76,53],[6,50,82],[9,24,53]].map(([n,x,y])=><text key={n} x={x} y={y} textAnchor="middle" fontSize="12" fontFamily="Georgia,serif" fill={m}>{n}</text>)}
  {w.style==="chrono"&&<>{sub(50,30,9)}{sub(28,52,9)}{sub(72,52,9)}<rect x="45" y="68" width="10" height="6" rx="1" fill="#eee"/><text x="50" y="72.6" textAnchor="middle" fontSize="4.6" fill="#111">{D.getDate()}</text></>}
  {w.style==="moon"&&<>{sub(30,46,8)}{sub(70,46,8)}<g>{sub(50,72,11)}<circle cx="50" cy="72" r="6" fill="#dfe6ee"/><circle cx="53" cy="70" r="5.4" fill="#0f1117"/></g></>}
  {(w.style==="date"||w.style==="arabic")&&<><rect x="68" y="46.5" width="10" height="7" fill="#f4f1ea"/><text x="73" y="52" textAnchor="middle" fontSize="5" fill="#111">{D.getDate()}</text></>}
  {dg&&<><rect x="19" y="32" width="62" height="40" rx="4" fill="#b9c28b" stroke="#000" strokeOpacity=".5"/><Digi/></>}
  <text x="50" y={w.style==="chrono"?22:w.style==="moon"?30:dg?27:36} textAnchor="middle" fontSize="5.6" letterSpacing="1.2" fill={m} fontFamily="Georgia,serif">{w.brand}</text>
  {!dg&&<><line className="hand" style={{animationDuration:"43200s",animationDelay:-H+"s"}} x1="50" y1="56" x2="50" y2="29" stroke={m} strokeWidth="3.4" strokeLinecap="round"/>
  <line className="hand" style={{animationDuration:"3600s",animationDelay:-M+"s"}} x1="50" y1="56" x2="50" y2="14" stroke={m} strokeWidth="2.2" strokeLinecap="round"/>
  <g className="hand" style={{animationDuration:"60s",animationDelay:-S+"s"}}><line x1="50" y1="62" x2="50" y2="10" stroke={w.accent} strokeWidth=".9"/></g>
  <circle cx="50" cy="50" r="2.6" fill={w.accent}/></>}
 </svg>}

/* Real 3D watch: stacked case layers, strap, crown, dial, hands and glass in CSS 3D */
export function Watch({w,s=150}){
 const th=s*.13,n=8,mt=`conic-gradient(from 25deg,${w.metal[0]},${w.metal[1]},${w.metal[0]},${w.metal[1]},${w.metal[0]})`,sw=s*.46;
 const strapBg=w.st==="bracelet"?`linear-gradient(90deg,#0007,transparent 28%,transparent 72%,#0007),repeating-linear-gradient(180deg,${w.metal[0]} 0 ${s*.055}px,${w.metal[1]} ${s*.055}px ${s*.07}px)`:`linear-gradient(90deg,#0008,transparent 25%,transparent 75%,#0008),${w.strap}`;
 const strap=(top)=><div style={{left:"50%",marginLeft:-sw/2,width:sw,height:s*.72,[top?"bottom":"top"]:s*.78,background:strapBg,clipPath:top?"polygon(12% 0,88% 0,100% 100%,0 100%)":"polygon(0 0,100% 0,88% 100%,12% 100%)",transform:`translateZ(${-th*.5}px)`,boxShadow:"inset 0 0 0 2px #0003"}}>
  {w.st!=="bracelet"&&<div style={{position:"absolute",inset:s*.03,border:"1px dashed #ffffff44",borderRadius:4}}/>}
  {w.st==="rubber"&&[0,1,2,3,4].map(i=><div key={i} style={{position:"absolute",left:0,right:0,top:`${15+i*18}%`,height:2,background:"#0006"}}/>)}</div>;
 return <div className="w3d" style={{width:s,height:s}}>
  {strap(true)}{strap(false)}
  <div style={{left:"100%",top:"50%",width:s*.08,height:s*.14,marginTop:-s*.07,marginLeft:-s*.02,background:`linear-gradient(90deg,${w.metal[1]},${w.metal[0]})`,borderRadius:3,transform:`translateZ(${-th*.5}px)`}}/>
  {[...Array(n)].map((_,i)=><div key={i} style={{inset:0,borderRadius:"50%",background:mt,transform:`translateZ(${-i*th/n}px)`,filter:`brightness(${.55+i*.02})`}}/>)}
  <div style={{inset:0,borderRadius:"50%",background:mt,transform:"translateZ(2px)",boxShadow:"0 0 0 1px #0006"}}/>
  <div style={{inset:s*.075,borderRadius:"50%",background:w.dial,transform:"translateZ(3px)",boxShadow:"inset 0 0 18px #000c"}}/>
  <div style={{inset:s*.075,transform:"translateZ(5px)"}}><Dial w={w}/></div>
  <div style={{inset:s*.075,borderRadius:"50%",transform:"translateZ(10px)",background:"linear-gradient(135deg,#ffffff4d,transparent 38%,transparent 66%,#ffffff1f)",boxShadow:"inset 0 0 0 1px #ffffff22"}}/>
 </div>}

