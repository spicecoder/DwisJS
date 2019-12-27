<!DOCTYPE html>
 
<head>

  
    <script src="js/jquery-1.8.3.js"></script>
    <script src="js/jquery-ui.js"></script>
	<script   src="dwisV0$.1.js"> </script>
   
 <style type="text/css">
/**
 * This is a CSS stylesheet that defines three style rules that we use
 * in the body of the document to create a "window" visual effect.
 * The rules use positioning properties to set the overall size of the window
 * and the position of its components. Changing the size of the window
 * requires careful changes to positioning properties in all three rules.
 **/

div.window {  /* Specifies size and border of the window */
    position: relative;         /* The position is specified elsewhere */
	width: 90%; height: 250px;/* Window size, not including borders */
    border: 5px outset gray;    /* Note 3D "outset" border effect */
}

div.band {  /* Specifies size and border of the window */
    position: relative;         /* The position is specified elsewhere */
	width: 90%; height: 2px;/* Window size, not including borders */
    border: 3px outset gray;    /* Note 3D "outset" border effect */
	background-color: #caa; 
}
div.titlebar {  /* Specifies position, size, and style of the titlebar */
    position: relative;         /* It's a positioned element */
    top: 0px; height: 15px;     /* Titlebar is 18px + padding and borders */
    width: 90%;               /* 290 + 5px padding on left and right = 300 */
    background-color: #a00;     /* Titlebar color */
    border-bottom: groove gray 2px;  /* Titlebar has border on bottom only */
    padding: 3px 3px 2px 3px;   /* Values clockwise: top, right, bottom, left */
    font: bold 11pt sans-serif; /* Title font */
}

div.content {  /* Specifies size, position and scrolling for window content */
    position: relative;         /* It's a positioned element */
                       /* 18px title+2px border+3px+2px padding */
    height:200px;              /* 200px total - 25px titlebar - 10px padding*/
    width: 90%;               /* 300px width - 10px of padding */
    padding: 3px 3px 2px 3px;                /* Allow space on all four sides */
    overflow: scroll; 	/* Give us scrollbars if we need them */
    
   background-color: #fff;     /* White background by default */
}

div.translucent { /* this class makes a window partially transparent */
    opacity: .75;               /* Standard style for transparency */
    filter: alpha(opacity=75);  /* Transparency for IE */
}
div.plist 
{
border:2px solid #a1a1a1;
padding:10px 40px; 
background:#dddddd;
width:300px;
border-radius:25px;
}

div.glist 
{
border:2px solid #a1a1a1;
padding:10px 40px; 
background:#dddddd;
width:300px;
border-radius:25px;
}
div.olist 
{
border:2px solid #a1a1a1;
padding:10px 40px; 
background:#dddddd;
width:300px;
border-radius:25px;
} 
div.slist 
{
border:2px solid #a1a1a1;
padding:10px 40px; 
background:#dddddd;
width:300px;
border-radius:25px;
}
div.flist 
{
border:2px solid #a1a1a1;
padding:10px 40px; 
background:#dddddd;
width:300px;
border-radius:25px;
}
body
{

background:purple;

}

</style>
</head> 
  

</head>
<body style="font-size:100%;">
 
<div id ="fortable">
<h1 onClick="allWords()"> Words In My Dictionary </h1>

<div class="window" style="   z-index: 10;">
<div class="titlebar">Point Window</div>
<div class="content"style="background-color: #999966"  >
<textarea style="width: 90%; height: 65px;"   id="myWords"  > Comma Seperated W o r d s </textarea></span> 
 
<button onclick="addDict();"> ADD Words To Dictionary </button>
 
 
</div>
</div>
 
<div class="band" style="   z-index: 10;" >... </div>
<div class="window" style=" z-index: 10; ">
<div class="titlebar">Group Window</div>
<div class="content" style="background-color: #CCCC00">
<h3> Put Words In A Cue </h3>
<p>Select Word As A Cue </p>
<select id="wordascue">
</select>
<p>Select Word  for the Cue: </p>
<select id="cueword">
    
</select>

<button onclick="putinCue();"> Put Word in Cue </button>
<p>
<textarea style="width: 80%; height: 20px;"   id="cuevalue"  >Optionaly  Type in value string or number </textarea></span> 
</div>
</div>
 <div class="band" style="   z-index: 10;" >... </div>
<div class="window" style=" z-index: 10;">
<div class="titlebar">Order Window</div>
<div class="content"style="background-color: #99CC00"  >
 <p>Select  Cue </p>
 
  <select id="cuesel">
    
</select>
 
 
 <button onclick="listCue();"> Elements In   Selected Cue,alphabetical </button>  
 
 <div id ="resw"> Result, List of Elements </div>
</div>
</div>
<div class="band" style="   z-index: 10;" >... </div>
 <div class="window" style=" z-index: 10;">
<div class="titlebar">Scope Scene Window </div>
<div class="content"style="background-color: #CC9900" >
 <p>Select  Cue </p>
 
 <span> <select id="cuesels"> </select> Value in Cue :<div id=scueval></div> </span>
 <button onclick="scopeCue();"> Narrowing The scope </button> 
 <div id ="ress"> Scoping  </div>
 </div>
</div>
<div class="band" style="   z-index: 10;" >... </div>
 <div class="window" style=" z-index: 10;">
<div class="titlebar">Flow Scene Window</div>
<div class="content" style="background-color: #FF9900" >
<p>Select  Cue </p>
 
  <select id="cueself"> </select>
<button onclick="flowCue();"> Flow with  Selected Cue </button>  
 <div id ="resf"> Result Flow </div>
</div>
</div>
<div id="datastoremeta"> </div>
<div id="datastorelink"> </div>
<span><button onclick="reload();"> reload dictionary </button>  </span>

 </div>
 

 <script type='text/javascript'>
 /**************************DOCUMENT READY  *****************************************************************/
 
 function reload() {
   alert ("desriserializing");
  //W = new WWW();
  var  root = "@";
   W.deSerializeCue();
 var scue = "" ;
 var sword = "";
//WW.prototype.hasRoot = function(ele,rr)   {
 for (var jk = 0; jk < W.metaWords.words.length ; jk = jk + 1){
 if (W.hasRoot(W.metaWords.words[jk],root)){
 
 scue = scue + '<option value="'+W.metaWords.words[jk]+'">'+W.metaWords.words[jk]+'</option>'; }
 else {
 
 if (W.metaWords.words[jk] != root)
 {sword = sword + '<option value="'+W.metaWords.words[jk]+'">'+W.metaWords.words[jk]+'</option>'; }
 
 
 }
  
 }
  alert ("switch1 : W2" + W.metaWords.words);
   alert ("selectacue: W2" + scue);
      alert ("selectaword: W2" + sword);
 $("#wordascue").html(scue);
 $("#cuesel").html(scue);
 $("#cueword").html(sword);
 $("#wrdsel").html(sword);
 $("#cuesels").html(scue);
 $("#cueself").html(scue);
// W = W2;
 alert ("switched");
 

 } 
 function store() {
alert ("serializing");
 W.serializeCue(W) ;
 alert ("meta:" + W.sMeta.join(','));
 alert ("link:" + W.sLink.join(','));
localStoreWWW(W.sMeta,W.sLink)
 

 }
 
 function localStoreWWW(meta,link) {
if (typeof window.localStorage != "undefined") {
 
    localStorage.removeItem("WWWmeta");
	localStorage.removeItem("WWWlink");
    // store
    localStorage.setItem("WWWmeta",meta);
	localStorage.setItem("WWWlink",link);
 }
 else { alert("not supported") ; }
 }
 function readLocalStoreWWW(  ) {
 var vv = "-=-";
if (typeof window.localStorage != "undefined") {
 
    // store
  W.sMeta =   localStorage.getItem("WWWmeta");
  W.sLink =   localStorage.getItem("WWWlink");
   
  
 } return vv;
 }
    // retrieve
 //   console.log(localStorage.getItem("hello"));
 
    
 


 
 function adjustContainer() {  
 // Here get your viewport values - let's say  
 // it determines the viewport is 800px, store it  
 // in var "wwidth"  
 var wwidth= $(window).width();
var viewportHeight = $(window).height();
  
 width=500; 
 if (wwidth > 0) { 

  if (wwidth  < 500 ) { 
  
  width=240;
  width += 'px'; 
  document.getElementById('fortable').style.width=width; 
 //  document.getElementById('fortable').style.height='600px';  
 }  
 else if (wwidth > 500 && wwidth <700 ) { 
  
  width=500;
  width += 'px'; 
  document.getElementById('fortable').style.width=width;  
  // document.getElementById('fortable').style.height='600px'; 
   
}  
else   { 
 // alert ( "width large");
  width=700;
  width += 'px'; 
  document.getElementById('fortable').style.width=width;  
  // document.getElementById('fortable').style.height='600px'; 
   
}  
}
}
 
  var W =".";
  
  
 function addDict() { 
 var selectaword = "";
  var selectacue = "";
 if (W === '.' )
 { W = new WWW(); }
 //get words ,comma sperated into array; add each to dictionary
 var txtv = $('#myWords').val() ;
 var temp = new Array();
 temp = txtv.split(",");
 
 for (var jj = 0 ; jj < temp.length ; jj ++ ) {  
 var rw = W.placeCue(temp[jj])  ; 
 if(rw != "- -" ) {
  selectacue = selectacue + '<option value="'+rw+'">'+rw+'</option>';
  selectaword = selectaword + '<option value="'+temp[jj]+'">'+temp[jj]+'</option>'; }
  
 }
 //alert (W.metaWords.words);
 $("#wordascue").append(selectacue);
 $("#cuesel").append(selectacue);
 $("#cueword").append(selectaword);
 $("#wrdsel").append(selectaword);
 $("#cuesels").append(selectacue);
 $("#cueself").append(selectacue);
 } 
 function putinCue() {
var selc = $("#wordascue option:selected").text();
var selw = $("#cueword option:selected").text();

var wval = $('#cueval').val();
var rr = W.placeCue(selw,selc,wval);
var aw = selc +"." +  selw;
if (rr != "- -") {  
console.log("return placecue" + rr);
var sela =  '<option value="'+rr +'">'+rr+'</option>';
$("#wordascue").append(sela);
 $("#cuesel").append(sela);
 $("#cuesels").append(sela);
 $("#cueself").append(sela); 
 }
 }
 function LoadputinCue(selw,selc) {
 
var rr = W.placeCue(selw,selc);
var aw = selc +"." +  selw;
if (rr != "- -") {  
console.log("return placecue" + rr);
var sela =  '<option value="'+rr +'">'+rr+'</option>';
$("#wordascue").append(sela);
 $("#cuesel").append(sela);
 $("#cuesels").append(sela);
 $("#cueself").append(sela); 
 }
 }
 function listCue() { 
 //scope flow== design flow
 var cuex = $("#cuesel option:selected").text();
 var bdv = W.listCue(cuex);
 
 //W.scopeCue(cuex);
 $("#resw").html(bdv);
 
 }
 function flowCue() { 
 //scope flow== design flow
 var cuex = $("#cueself option:selected").text();
 var bdf = W.flowCue(cuex);
  
 //serializeCue(W);

 //W.scopeCue(cuex);
 $("#resf").html(bdf);
 
 }
 function flowCueNext() { 
 //scope flow== design flow
 var cuex = $("#cueself option:selected").text();
 //W.NavFlow.currindex = W.NavFlow.currindex + 1;
 var bdf = W.flowCue(cuex,W.NavFlow.currindex );
 
 //serializeCue(W);

 //W.scopeCue(cuex);
 $("#resf").html(bdf);

 
 }
 
 function scopeCue() { 
 //scope flow== design flow
 var cuex = $("#cuesels option:selected").text();
 var bds = W.scopeCue(cuex); 
 
  
 $("#ress").html(bds);
  
 }
 function scopeCueNext() { 
 //scope flow== design flow
 var cuex = $("#cuesels option:selected").text();
 
 var bds = W.scopeCue(cuex,W.ScopeFlow.currindex); 
 
  
 $("#ress").html(bds);

 }
 // node flow== exeution flow
  function iterateO(obj) {
    for (var property in obj) {
        if (obj.hasOwnProperty(property)) {
            if (typeof obj[property] == "object")
                iterateO(obj[property]);
            else       { alert(property + " :  " + obj[property]);
			          console.log(property + "   " + obj[property]);
				   } 
        }
    }
  }
  function noCueProperties(acue) {
  var  exproperty  = new Object();
  exproperty.cueName = "cuName";
    for (var property in acue) {
	 
        // if (exproperty.hasOwnProperty(property)) {
            if  (property in  exproperty){ alert ("property   in cue :" + property) ;   }
                
   // }
  } }
  $(document).ready(function() {adjustContainer();
  
//$("textarea").focus(function() {
   
 //       $(this).val("");
 
//});
 //the dict input
 //var indict=['Southern Hemisphere','Australia','NSW','Wollongong','Sydney','Victoria','SA','Adelaide','MtGambier','Melbourne','Mildura','WorldCup','TravelPlan','Breakfast','Lunch','Dinner','Breakfast Again'];
 var indict=['Southern Hemisphere','Australia'];
 $("#myWords").val(indict);
 addDict();
 LoadputinCue('Australia','@.Southern_Hemisphere');   // e.g android activity manifest file ,class for istener;background service;
 /*LoadputinCue('NSW','@.Southern_Hemisphere.Australia');
 LoadputinCue('Sydney','@.Southern_Hemisphere.Australia.NSW');
 LoadputinCue('Victoria','@.Southern_Hemisphere.Australia');
 LoadputinCue('SA','@.Southern_Hemisphere.Australia');
 LoadputinCue('Adelaide','@.Southern_Hemisphere.Australia.SA');
 LoadputinCue('MtGambier','@.Southern_Hemisphere.Australia.SA');
 LoadputinCue('Melbourne','@.Southern_Hemisphere.Australia.Victoria');
 LoadputinCue('Mildura','@.Southern_Hemisphere.Australia.Victoria');
 LoadputinCue('TravelPlan','@.WorldCup');
 LoadputinCue('Sydney','@.WorldCup.TravelPlan');
 LoadputinCue('Breakfast','@.WorldCup.TravelPlan.Sydney');
 LoadputinCue('Mildura','@.WorldCup.TravelPlan');
 LoadputinCue('Dinner','@.WorldCup.TravelPlan.Mildura');
 LoadputinCue('Adelaide','@.WorldCup.TravelPlan'); 
 LoadputinCue('Breakfast_Again','@.WorldCup.TravelPlan.Adelaide');  */
 

$(window).resize(function() {adjustContainer();})

} );
</script>

 
 

</body>

</html>