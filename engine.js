/* Dream Atlas engine — pure, deterministic, no DOM, no network.
   Loaded by index.html as a classic script (offline-safe) and unit-tested in node. */
(function (root) {
  "use strict";

  /* 12 universal dream archetypes (documented recurrent themes). */
  const ARCHETYPES = [
    {key:"falling", name:"The Falling", glyph:"☄", verb:"also fell through the dark",
     reading:"A loosening of the grip. You hang between what you held and what you've let go — the oldest dreamers called it the body remembering it is not the one in control.",
     base:2847, kw:["fall","falling","fell","drop","plummet","cliff","edge","slip","slipp","abyss","gravity","tumbl","off the"]},
    {key:"chased", name:"The Chase", glyph:"☍", verb:"also ran from something",
     reading:"Something you will not turn to face keeps pace behind you. In the old readings the pursuer always wears a borrowed face.",
     base:3120, kw:["chase","chased","chasing","run","running","ran","pursu","escap","flee","fled","hunt","follow","predator","monster","after me","catch me"]},
    {key:"teeth", name:"The Loosening", glyph:"◈", verb:"also lost a tooth",
     reading:"Teeth come loose in the night — of speech, of vanity, of the parts of us we show the world and quietly feel slipping. A dream of thresholds.",
     base:1290, kw:["teeth","tooth","mouth","crumbl","dentist","gums","bite","chew","jaw"]},
    {key:"flying", name:"The Flight", glyph:"✶", verb:"also flew",
     reading:"You rose, and the ground forgot to argue. Flight is the dream of permission — the rare night the self believes its own lightness.",
     base:1980, kw:["fly","flying","flew","float","floating","soar","wings","levitat","hover","above the","in the sky","weightless"]},
    {key:"exposed", name:"The Exposed", glyph:"◉", verb:"also stood exposed",
     reading:"Seen before you were ready. The naked dream is the soul's rehearsal of being known without the costume.",
     base:1110, kw:["naked","nude","undress","exposed","embarrass","underwear","no clothes","forgot clothes","bathroom","everyone look"]},
    {key:"unprepared", name:"The Unready", glyph:"⌛", verb:"also faced the test unready",
     reading:"The unread exam, the unlearned lines. A dream of the gap between who you are asked to be and who you had time to become.",
     base:2210, kw:["exam","test","late","unprepar","deadline","forgot","missed","miss the","train","flight","stage","lines","fail","school","class","homework","interview"]},
    {key:"water", name:"The Water", glyph:"≈", verb:"also met the water",
     reading:"Water came — as tide, as flood, as the deep. The dreamers of every century read water as feeling that has outgrown its banks.",
     base:1640, kw:["water","ocean","sea","flood","wave","tsunami","drown","river","rain","swim","tide","deep","underwater","sink"]},
    {key:"death", name:"The Threshold", glyph:"☥", verb:"also passed through a death",
     reading:"A death in the dream is rarely an ending. The old keepers read it as a door — something in you finishing so something else can begin.",
     base:760, kw:["death","die","died","dying","dead","funeral","grave","born","reborn","rebirth","coffin","afterlife"]},
    {key:"lost", name:"The Labyrinth", glyph:"✲", verb:"also wandered lost",
     reading:"Corridors that fold, a place you know that will not stay still. The lost dream is the mind redrawing a map it no longer trusts.",
     base:2390, kw:["lost","maze","labyrinth","can't find","cant find","searching","wander","corridor","endless","hallway","turned around","no way out","keep changing"]},
    {key:"reunion", name:"The Returned", glyph:"◍", verb:"also saw someone they've lost",
     reading:"Someone returned to you in the night who is gone, or far. The reunion dream is grief and love speaking in the only tense they share.",
     base:980, kw:["ex","mother","father","grandmother","grandfather","reunion","reunite","passed away","see again","hug","old friend","childhood","missed them"]},
    {key:"otherworld", name:"The Otherworld", glyph:"✺", verb:"also crossed into the otherworld",
     reading:"A place that obeys no atlas — a city, a planet, a logic of its own. The unclassifiable dream, where the mind goes to invent.",
     base:1450, kw:["alien","space","planet","strange place","unknown","surreal","portal","another world","dimension","glowing","impossible","floating city"]},
    {key:"mundane", name:"The Ordinary", glyph:"▦", verb:"also dreamed the ordinary",
     reading:"The dream wore the clothes of an ordinary day. Even the plainest night is the mind filing the hours — and hiding small doors in the routine.",
     base:3300, kw:["work","office","email","commute","chores","ordinary","normal","meeting","cooking","cleaning","shopping","phone"]}
  ];

  function hash(str){let h=2166136261>>>0;for(let i=0;i<str.length;i++){h^=str.charCodeAt(i);h=Math.imul(h,16777619)>>>0;}return h>>>0;}

  /* deterministic, order-independent: weighted keyword scoring */
  function classify(text){
    const t=(" "+String(text).toLowerCase()+" ").replace(/[^a-z\s']/g," ");
    let best=null,bestScore=0;
    for(const a of ARCHETYPES){
      let s=0;
      for(const k of a.kw){ if(t.includes(k)) s += (k.length>4?2:1); }
      if(s>bestScore){bestScore=s;best=a;}
    }
    if(!best||bestScore===0) best=ARCHETYPES.find(a=>a.key==="otherworld");
    return best;
  }

  function daySeed(date){const d=date||new Date();return hash(""+d.getFullYear()+d.getMonth()+d.getDate());}
  function tonightCount(a,date){return a.base + (hash(a.key+daySeed(date))%900);}

  /* safety guard: dreams touching self-harm/abuse stay private (never added to the public
     atlas) and trigger a support prompt. Keeps the collective corpus ethical + low-moderation. */
  const SENSITIVE=["suicide","kill myself","killing myself","end my life","self harm","self-harm",
    "cutting myself","overdose","abuse","abused","raped","rape","molest","assault"];
  function isSensitive(text){const t=" "+String(text).toLowerCase()+" ";return SENSITIVE.some(k=>t.includes(k));}

  const api={ARCHETYPES,hash,classify,daySeed,tonightCount,isSensitive};
  if(typeof module!=="undefined"&&module.exports){module.exports=api;}
  root.DreamEngine=api;
})(typeof window!=="undefined"?window:globalThis);
