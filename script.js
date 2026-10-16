const $=id=>document.getElementById(id),sleep=ms=>new Promise(r=>setTimeout(r,ms));
const esc=s=>s.replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
function rnd(n){const a=new Uint32Array(1);crypto.getRandomValues(a);return a[0]%n}
function shuf(a){for(let i=a.length-1;i>0;i--){const j=rnd(i+1);[a[i],a[j]]=[a[j],a[i]]}return a}
const pct=x=>(x*100).toFixed(1)+'%',F='⚀⚁⚂⚃⚄⚅',SY=['🍒','🍋','🔔','⭐','💎','🍀'];
const SAMPLE=['Anna','Carlos','Maria','Luis','Sofia','Diego','Valeria','Andres','Camila','Juan','Laura','Pedro','Daniela','Miguel','Isabela','Jorge','Paula','Felipe','Natalia','Sergio','Lucia','Mateo','Elena','Tomas'];
const TIP={
 dice:"Best-of-two dice shifts the odds a lot, but it never guarantees a win. Probability changes chances, not certainty.",
 coin:"Each flip is independent: after 3 heads in a row the coin is still 50/50 next time (the gambler's fallacy).",
 cards:"Expected value = sum of (probability × points). Fewer traps in the deck raises the average result.",
 slots:"More symbols per reel means a triple is much rarer: 1/k². Compare 9 combos of 3 symbols vs 36 of 6.",
 monty:"Switching wins 2/3 of the time! Your first pick is right only 1/3, and the host's reveal doesn't change that."};
let names=[],scores={},played=new Set(),rot=0,spinning=false,cur=null,AC;

function beep(f=440,d=.08,t='sine'){if(!$('snd').checked)return;try{AC=AC||new(window.AudioContext||window.webkitAudioContext)();const o=AC.createOscillator(),g=AC.createGain();o.type=t;o.frequency.value=f;g.gain.value=.04;o.connect(g);g.connect(AC.destination);o.start();o.stop(AC.currentTime+d)}catch(e){}}
function confetti(n=140){const c=$('fx'),x=c.getContext('2d');c.width=innerWidth;c.height=innerHeight;
 const P=Array.from({length:n},()=>({x:innerWidth/2,y:innerHeight/3,vx:(Math.random()-.5)*15,vy:-Math.random()*13-4,s:5+Math.random()*7,h:Math.random()*360,r:0}));let f=0;
 (function a(){x.clearRect(0,0,c.width,c.height);P.forEach(p=>{p.x+=p.vx;p.y+=p.vy;p.vy+=.3;p.r+=.2;x.fillStyle=`hsl(${p.h} 90% 60%)`;x.save();x.translate(p.x,p.y);x.rotate(p.r);x.fillRect(-p.s/2,-p.s/2,p.s,p.s*.6);x.restore()});
 if(++f<120)requestAnimationFrame(a);else x.clearRect(0,0,c.width,c.height)})()}
function S(h){const s=$('stage');s.classList.remove('in');s.innerHTML=h;void s.offsetWidth;s.classList.add('in')}
const pick=sel=>new Promise(r=>document.querySelectorAll(sel).forEach(b=>b.onclick=()=>r(b.dataset.i)));

$('demo').onclick=()=>{$('names').value=SAMPLE.join('\n');upd()};$('names').oninput=upd;
const parse=()=>[...new Set($('names').value.split('\n').map(s=>s.trim()).filter(Boolean))].slice(0,24);
function upd(){$('count').textContent=parse().length+' / 24 names'}
$('go').onclick=()=>{const n=parse();if(n.length<2){alert('Enter at least 2 names.');return}
 names=n;scores={};played=new Set();names.forEach(x=>scores[x]={pts:0,rounds:0});$('setup').hidden=true;$('game').hidden=false;rot=0;draw();board()};
$('reset').onclick=()=>{$('game').hidden=true;$('setup').hidden=false;names=[]};

/* ---------- WHEEL ---------- */
function draw(t=0){
 const x=$('wheel').getContext('2d'),n=names.length,arc=2*Math.PI/n,R=188;x.clearRect(0,0,420,420);x.save();x.translate(210,210);
 x.beginPath();x.arc(0,0,206,0,7);x.fillStyle='#2b1b5e';x.shadowColor='#ffc233';x.shadowBlur=20;x.fill();x.shadowBlur=0;
 for(let i=0;i<24;i++){const a=i*Math.PI/12;x.beginPath();x.arc(Math.cos(a)*197,Math.sin(a)*197,4.5,0,7);x.fillStyle=(i+Math.floor(t/220))%2?'#ffd166':'#7a5c1e';x.fill()}
 x.rotate(rot);
 for(let i=0;i<n;i++){const h=(i*360/n)|0,g=x.createRadialGradient(0,0,20,0,0,R);g.addColorStop(0,`hsl(${h} 85% 66%)`);g.addColorStop(1,`hsl(${h} 70% 38%)`);
  x.globalAlpha=played.has(names[i])?.4:1;x.beginPath();x.moveTo(0,0);x.arc(0,0,R,i*arc,(i+1)*arc);x.closePath();x.fillStyle=g;x.fill();x.strokeStyle='rgba(255,255,255,.6)';x.stroke();x.globalAlpha=1;
  x.save();x.rotate(i*arc+arc/2);x.fillStyle='#fff';x.shadowColor='#000';x.shadowBlur=4;x.font=`bold ${n>16?11:14}px system-ui`;x.textAlign='right';x.fillText(names[i].slice(0,13),R-10,4);x.restore()}
 x.restore();
 const hub=x.createRadialGradient(205,205,2,210,210,26);hub.addColorStop(0,'#fff3b0');hub.addColorStop(1,'#d98b00');
 x.beginPath();x.arc(210,210,26,0,7);x.fillStyle=hub;x.fill();x.font='24px serif';x.textAlign='center';x.fillText('🎲',210,219)}
setInterval(()=>{if(!spinning&&names.length)draw(performance.now())},240);
const idxAt=()=>{const arc=2*Math.PI/names.length;return Math.floor((((-Math.PI/2-rot)%(2*Math.PI))+2*Math.PI)%(2*Math.PI)/arc)};
$('spin').onclick=()=>{
 if(spinning)return;let pool=names.map((_,i)=>i);
 if($('norep').checked){let p=pool.filter(i=>!played.has(names[i]));if(!p.length){played=new Set();p=pool}pool=p}
 const i=pool[rnd(pool.length)],arc=2*Math.PI/names.length;let end=-Math.PI/2-(i+.5)*arc-2*Math.PI*(5+rnd(3));while(end>rot)end-=2*Math.PI;
 const st=rot,t0=performance.now(),dur=5000;let last=-1;spinning=true;$('spin').disabled=true;S('<h2>3. Challenge</h2><p class="sub">The wheel is spinning… 🍀</p>');
 (function f(t){const k=Math.min(1,(t-t0)/dur);rot=st+(end-st)*(1-Math.pow(1-k,3.5));draw(t);const j=idxAt();
  if(j!=last){last=j;const p=$('ptr');p.classList.remove('tick');void p.offsetWidth;p.classList.add('tick');beep(700+(j%6)*40,.03,'square')}
  if(k<1)requestAnimationFrame(f);else{spinning=false;intro(names[i])}})(t0)};

/* ---------- FATE ---------- */
const G={dice:'🎲 Dice Duel',coin:'🪙 Coin Streak',cards:'🃏 Card Pick',slots:'🎰 Lucky Slots',monty:'🚪 Monty Hall Doors'};
const WHY={dice:['You roll 2 dice and keep the LOWEST.','You roll 1 die against the house.','You roll 2 dice and keep the HIGHEST.'],
 coin:['Your coin is rigged: 30% heads.','A fair coin: 50% heads.','Your coin is loaded: 70% heads.'],
 cards:['The deck is full of traps.','A standard deck.','The deck has fewer traps.'],
 slots:['6 symbols per reel: triples are very rare.','4 symbols per reel.','Only 3 symbols per reel: matches are easier.'],
 monty:["Fate can't change the doors. Only your strategy matters!","Fate can't change the doors. Only your strategy matters!","Fate can't change the doors. Only your strategy matters!"]};
function intro(name){
 const game=Object.keys(G)[rnd(5)],r=rnd(10),mod=game=='monty'?0:r<3?1:r<6?0:-1;cur={name,game,mod};beep(900,.25,'triangle');confetti(40);
 const mb=mod>0?'<span class="badge b-good">✨ Blessed</span>':mod<0?'<span class="badge b-bad">💀 Cursed</span>':'<span class="badge b-neu">⚖️ Neutral</span>';
 S(`<h2>3. Challenge</h2><div class="name">${esc(name)}</div><p>Fate gives you <b>${G[game]}</b> ${mb}</p><p class="sub">${WHY[game][mod+1]}</p>${oddsHTML()}<button id="play">Play! ▶</button>`);
 $('play').onclick=()=>({dice:pDice,coin:pCoin,cards:pCards,slots:pSlots,monty:pMonty})[game]()}
function diceDist(m){const d=Array(7).fill(0);if(!m){for(let i=1;i<7;i++)d[i]=1/6}else for(let a=1;a<7;a++)for(let b=1;b<7;b++)d[m>0?Math.max(a,b):Math.min(a,b)]+=1/36;return d}
function diceOdds(m){const p=diceDist(m),h=diceDist(0);let w=0,t=0;for(let a=1;a<7;a++)for(let b=1;b<7;b++){if(a>b)w+=p[a]*h[b];else if(a==b)t+=p[a]*h[b]}return{w,t,l:1-w-t}}
const coinP=m=>m>0?.7:m<0?.3:.5,coinWin=m=>{const p=coinP(m);return 3*p*p*(1-p)+p**3};
const deck=m=>m>0?['J','S','S','S','T']:m<0?['J','S','T','T','T']:['J','S','S','T','T'],PTS={J:5,S:1,T:-2};
function OUT(){const{game:g,mod:m}=cur;
 if(g=='dice'){const o=diceOdds(m);return[{l:'Win (+3)',p:o.w,pts:3},{l:'Tie (0)',p:o.t,pts:0},{l:'Lose (−2)',p:o.l,pts:-2}]}
 if(g=='coin'){const w=coinWin(m);return[{l:'2+ heads (+3)',p:w,pts:3},{l:'Lose (−2)',p:1-w,pts:-2}]}
 if(g=='cards'){const d=deck(m);return[['J','💎 Jackpot (+5)'],['S','✅ Safe (+1)'],['T','💣 Trap (−2)']].map(([k,l])=>({l,p:d.filter(x=>x==k).length/5,pts:PTS[k]}))}
 if(g=='slots'){const k=m>0?3:m<0?6:4,a=1/(k*k),b=(k-1)*(k-2)/(k*k);return[{l:'🎰 Triple (+6)',p:a,pts:6},{l:'Pair (+1)',p:1-a-b,pts:1},{l:'No match (−2)',p:b,pts:-2}]}
 return[{l:'Win if you STAY',p:1/3,pts:5},{l:'Win if you SWITCH',p:2/3,pts:5}]}
function oddsHTML(){const o=OUT();let h='<div class="odds"><b>📊 The real odds</b>'+o.map(e=>`<div class="bar"><span>${e.l}</span><i style="--w:${e.p*100}%;background:${e.pts>0?'var(--good)':e.pts<0?'var(--bad)':'var(--mu)'}"></i><b>${pct(e.p)}</b></div>`).join('');
 return h+(cur.game=='monty'?'<div>Win = +5 pts, lose = −2 pts</div>':`<div>Expected value: <b>${o.reduce((s,e)=>s+e.p*e.pts,0).toFixed(2)}</b> pts per round</div>`)+'</div>'}

/* ---------- MINI-GAMES ---------- */
async function pDice(){const m=cur.mod,n=m?2:1;
 S(`<h2>${G.dice}</h2><div class="duel"><div><small>${esc(cur.name)}</small><div class="dice">${'<span>⚀</span>'.repeat(n)}</div></div><b>VS</b><div><small>House</small><div class="dice"><span>⚀</span></div></div></div><p id="info" class="sub" style="text-align:center"></p>`);
 const a=1+rnd(6),b=1+rnd(6),h=1+rnd(6),mine=m>0?Math.max(a,b):m<0?Math.min(a,b):a,ds=[...document.querySelectorAll('.dice span')];
 ds.forEach(s=>s.classList.add('roll'));const t=setInterval(()=>{ds.forEach(s=>s.textContent=F[rnd(6)]);beep(300+rnd(200),.03)},90);await sleep(1400);clearInterval(t);
 ds.forEach(s=>s.classList.remove('roll'));ds[0].textContent=F[a-1];if(n==2)ds[1].textContent=F[b-1];ds[n].textContent=F[h-1];
 if(n==2)$('info').innerHTML=`You keep the ${m>0?'highest':'lowest'}: <b>${mine}</b>`;await sleep(900);
 fin(mine>h?3:mine==h?0:-2,mine>h?'You win!':mine==h?'Tie.':'You lose.',`You: <b>${mine}</b> · House: <b>${h}</b>`)}
async function pCoin(){const p=coinP(cur.mod);
 S(`<h2>${G.coin}</h2><div class="coins">${'<div class="coin"><div class="f">H</div><div class="b">T</div></div>'.repeat(3)}</div><p class="sub" style="text-align:center">You need 2 or more heads</p>`);
 let h=0;for(const c of document.querySelectorAll('.coin')){const hd=rnd(1000)<p*1000;h+=hd;c.style.transform=`rotateY(${hd?1440:1620}deg)`;beep(600,.1,'triangle');await sleep(800)}
 await sleep(900);fin(h>=2?3:-2,h>=2?'You win!':'You lose.',`${h} heads out of 3`)}
async function pCards(){const d=shuf(deck(cur.mod)),lab={J:'💎<br>+5',S:'✅<br>+1',T:'💣<br>−2'};
 S(`<h2>${G.cards}</h2><p>Pick ONE card</p><div class="cards">${d.map((k,i)=>`<button class="cd" data-i="${i}"><div class="in"><div class="f">?</div><div class="b ${k}">${lab[k]}</div></div></button>`).join('')}</div>`);
 const i=+await pick('.cd'),cs=[...document.querySelectorAll('.cd')];cs.forEach(c=>c.disabled=true);cs[i].classList.add('flip');beep(500,.1);await sleep(900);
 cs.forEach((c,j)=>{if(j!=i)c.classList.add('flip','dim')});await sleep(1000);const k=d[i];
 fin(PTS[k],k=='T'?'Ouch, a trap!':k=='J'?'JACKPOT!':'Safe.',`You chose card #${i+1}`)}
async function pSlots(){const m=cur.mod,k=m>0?3:m<0?6:4,E=SY.slice(0,k),r=[0,0,0].map(()=>rnd(k));
 S(`<h2>${G.slots}</h2><p class="sub">${k} symbols per reel</p><div class="reels">${'<div class="reel">❔</div>'.repeat(3)}</div>`);
 const rs=[...document.querySelectorAll('.reel')],t=setInterval(()=>rs.forEach(e=>{if(!e.dataset.s)e.textContent=E[rnd(k)]}),70);
 for(let i=0;i<3;i++){await sleep(900);rs[i].textContent=E[r[i]];rs[i].dataset.s=1;rs[i].classList.add('stop');beep(300+i*150,.12,'square')}
 clearInterval(t);await sleep(700);const u=new Set(r).size;fin(u==1?6:u==2?1:-2,u==1?'TRIPLE!':u==2?'A pair!':'No match.',`${r.map(x=>E[x]).join(' ')}`)}
async function pMonty(){const car=rnd(3);
 S(`<h2>${G.monty}</h2><p>A car is behind ONE door, goats behind the others. Pick a door:</p><div class="doors">${[0,1,2].map(i=>`<button class="door" data-i="${i}">🚪<small>#${i+1}</small></button>`).join('')}</div><div id="msg" style="margin-top:10px"></div>`);
 const p=+await pick('.door'),dr=[...document.querySelectorAll('.door')],op=(b,e)=>{b.firstChild.textContent=e;b.classList.add('open')};
 dr[p].classList.add('sel');dr.forEach(b=>b.disabled=true);const o=[0,1,2].filter(i=>i!=p&&i!=car),h=o[rnd(o.length)];await sleep(600);op(dr[h],'🐐');beep(200,.25,'sawtooth');
 $('msg').innerHTML=`The host opens door #${h+1}: a goat! Stay or switch?<div class="row" style="margin-top:8px"><button class="sw" data-i="0">Stay #${p+1}</button><button class="sw" data-i="1">Switch</button></div>`;
 const sw=+await pick('.sw'),fin_=sw?[0,1,2].find(i=>i!=p&&i!=h):p;document.querySelectorAll('.sw').forEach(b=>b.disabled=true);
 dr[p].classList.remove('sel');dr[fin_].classList.add('sel');await sleep(500);dr.forEach((b,i)=>{if(i!=h)op(b,i==car?'🚗':'🐐')});await sleep(1200);
 fin(fin_==car?5:-2,fin_==car?'You got the car!':'A goat…',`You ${sw?'switched':'stayed'} → door #${fin_+1}`)}

function fin(pts,msg,detail){const s=scores[cur.name];s.pts+=pts;s.rounds++;played.add(cur.name);
 $('stage').insertAdjacentHTML('beforeend',`<div class="res ${pts>0?'win':pts<0?'lose':''}"><div class="big ${pts>=0?'pos':'neg'}">${pts>0?'+':''}${pts} pts</div><b>${msg}</b><p>${detail}</p><p>${esc(cur.name)} now has <b>${s.pts}</b> pts</p><div class="tip">💡 ${TIP[cur.game]}</div></div>`);
 if(pts>=3)confetti();beep(pts>0?880:180,.3,pts>0?'triangle':'sawtooth');$('spin').disabled=false;draw();board(cur.name)}
function board(hl){const rows=names.map(n=>[n,scores[n]]).sort((a,b)=>b[1].pts-a[1].pts);
 $('board').innerHTML='<tr><th>#</th><th>Name</th><th>Rounds</th><th>Points</th></tr>'+rows.map((r,i)=>`<tr class="${r[0]==hl?'flash':''}"><td>${['🥇','🥈','🥉'][i]||i+1}</td><td>${esc(r[0])}</td><td>${r[1].rounds}</td><td class="${r[1].pts>0?'pos':r[1].pts<0?'neg':''}">${r[1].pts}</td></tr>`).join('');
 const n=names.filter(x=>played.has(x)).length;$('pg').style.width=n/names.length*100+'%';$('pt').textContent=`${n} / ${names.length} played this cycle`}
upd();
