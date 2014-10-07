function main(){
  console.log("Run");
  initBtn();
  currentRow = 1;
  rowMax = 8;
  player = window.setInterval(nextSeq,500);

  if(typeof(webkitAudioContext)!=="undefined")
    audioctx = new webkitAudioContext();
  else if(typeof(AudioContext)!=="undefined")
    audioctx = new AudioContext();
  ROOT_CONST = Math.pow(2,1/12);
  tones = [];
  gains = [] 
  freqs = [f(0),f(2),f(4),f(5),f(7),f(9),f(11),f(12)];
  for(var i = 0;i < rowMax; i++){
    tones.push( audioctx.createOscillator());
    gains.push( audioctx.createGain());
    tones[i].connect(gains[i]);
    gains[i].connect(audioctx.destination);
    tones[i].frequency.value = freqs[i];
    tones[i].start();
    gains[i].gain.value = 0;
  }
}

function f(i){
  return Math.pow(ROOT_CONST,i)*440;
}

function nextSeq(){
  var cRow = document.getElementById("noteRow"+currentRow);
  if(currentRow == 1){
    var bRow = document.getElementById("noteRow"+rowMax);
  } else {
    var bRow = document.getElementById("noteRow"+Number(currentRow-1));
  }
  bRow.classList.remove("blink");
  cRow.classList.add("blink");

  var tones = collectNotes(cRow.children);
  playTones(tones);

  if(currentRow >= rowMax)currentRow = 1;
  else currentRow++;
}

function playTones(arr) {
  for(var i in gains){
    gains[i].gain.value = 0;
  }
  for(var i in arr){
    gains[arr[i]].gain.value=10;
  }
}

function collectNotes(nodes){
  var res = [];
  for(var i=0;i<rowMax;i++){
    if(nodes[i].classList && nodes[i].classList.contains("on"))res.push(i);
  }
  return res;
}

function initBtn(){
  rows = [];
  for(var i =1; i<=8; i++){  
    rows.push(document.getElementById("noteRow"+i));
  }
  for(i in rows){
    var row = rows[i];
    row.onclick = function(e){
      var elem = e.originalTarget;
      if(elem.tagName != "TD")return;
      if(elem.classList.contains("on")){
        elem.classList.remove("on");
        elem.classList.add("off");
      } else {
        elem.classList.remove("off");
        elem.classList.add("on");
      }
    }
  }
}

function Tone(){

}
