//add script at the end
//lights go on for warnings
//tested with emulator, because i don't own a bridge

(function(){
var bridge="http://localhost:8000/api/newdeveloper"  //edit here
var path=opt.light  //URL parameter ?&light=1
if(!path) path="groups/0/action"; else path=isNaN(path)? "sensors"+path+"/state" :"lights/"+path+"/state"  //?&light=/3 sensor

var bb={}; warnlayer._marker.on('move', function(e){ var data=warnlayer._data
var bd={"bri":254,"sat":255,on:true}; 
if(data.features.length) {
var severity=["Minor","Moderate","Severe","Extreme"], max=0  //get the highest warnlevel
data.features.forEach(function(item){ item=item.properties
max=Math.max(max,severity.indexOf(item.SEVERITY))
 })

var color=[10920,5481,0,0]
bd.hue=color[max]  //={on:true}  //"bri":127

if(!isNaN(qs) && max >= qs-1) {showLights(path.match("sensors/")?{status:max+1}:bd) }  //warnlev
  } else {showLights(path.match("sensors/")?{status:0}:{on:false}); }  //bd.hue=21840;  bd
})

function showLights(bd) { 
if(JSON.stringify(bd)==JSON.stringify(bb)) return;
bb=bd
var xhr = new XMLHttpRequest();
xhr.open("PUT", bridge+"/"+path)
xhr.setRequestHeader('Content-Type', 'application/json');
xhr.onload = function() {console.log(xhr.responseText);}
xhr.onerror = function(e) {console.log(e.type)}  //
xhr.send(JSON.stringify(bd))
}

function changebri(hd){
bridge=prompt(hd+"change bridge adress", bridge)||bridge
bridge=((bridge.match(/https?:/))?'':'http://')+bridge
}

//if(opt.reset) delete localStorage.bridge  //?&reset=1
if ((localStorage||{}).bridge) bridge=localStorage.bridge; 
else {changebri("addon successfully installed\n"); }  // ?4 disable
 if(!bridge.match("/api")) bridge+="/api/dev"
 if(self.fetch) fetch(bridge+"/config",{method:"GET"}).then(function(response)  //"http://localhost:8000/api//config"
  {response.json().then(function(data){if(data.whitelist) localStorage.bridge=bridge; else {
   alert("unauthorised user\npress link button"); bridge=bridge.replace(/\/api.*/,'/api')
   fetch(bridge,{method:"POST",body:'{"devicetype":""}',headers:{'Content-Type':'application/json'}}).then(function(response)
   {response.json().then(function(data){if(data[0].success) localStorage.bridge=bridge+="/"+data[0].success.username})} ) }
  })} )
  .catch(function(err){changebri("bridge not found\n"); delete localStorage.bridge
  if(opt.nupn)  //search on portal
   fetch("https://www.meethue.com/api/nupnp").then(function(response){response.json().then(function(data){if(data[0]) bridge=data[0].internalipaddress;changebri("found\n")})})
  })
//}
console.log(bridge)
warnlayer.on('tileerror', function(e){karte.attributionControl.setPrefix("err")})  //

if(opt.bulb) warnlayer._marker.on('move', function(e){ //simulate bulb  //?&bulb=1
setTimeout(function(){ if(!(localStorage||{}).bridge) bulb(bb); else  // wo/with bridge
 fetch(bridge+"/lights/"+(opt.light*1||1)).then(function(response){response.json().then(function(data){ bulb(data.state) })})
 }, 1000)
})
function bulb(bd) {document.querySelector("input[alt=search]").style.backgroundColor=bd.on?"hsl("+(bd.hue||0)/182+","+(bd.sat||0)/2.55+"%,"+Math.min(bd.bri/2.55,78)+"%)":"hsl(0,0%,50%)"}

})();
