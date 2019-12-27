var xml; var myWords= new Array(); var myf = new Array(); var mys = new Array(); var myfw = new Array(); var myfs= new Array(); var mysw = new Array();
 var flowScenes = new Array(); var pos=0; var flowWords = new Array(); var tempArray = new Array();var fwlength=0; var revisit = false;
 var flowSceneIds = new Array(); var popper = new Array();
  var wid ;//wid is global to indicate word position in dictionary after last ops
 //all array entries below contains the index from myWords.
 //1st order f then s  then w//if(!arrayName[index])//typeof array[index] !== 'undefined'
 Array.prototype.addEntry= function(ent,o) { 
if ( typeof (this[ent]) !== 'undefined') { var  clist = this[ent]; clist=clist+ '$]'+o; this[ent]=clist;
 //alert("expanded" +ent +":"+o);
 }  
else 
{this[ent] =  o +'$]'; }
return 0;
 }
 Array.prototype.findEntry= function(ent,o) { 
if ( typeof (this[ent]) !== 'undefined') { return -1;}  
else 
{var ins  =  o +'$]';
var csvent= this[ent];
{return csvent.indexOf(ins); }
}
}


 Array.prototype.insert = function(o) {
/*var jj = this.length;
if(jj > 0) { jj= jj -1; }
jj = jj + 1;
this[jj] = o;
// ("insertred w:"+this[jj]+"supp" + o ) ;
return jj; */
//improve this -bring sorted array.
this.push(o);
wid = this.length - 1;
return wid;
}	
Array.prototype.exists = function(o) {
//alert("checking if exists");
//improve this - bring binary search
o = o.replace(/\s{2,}/g, ' ' );
for(var i = 0; i < this.length; i++) {
  //alert ("current w:"+this[i]+"supp" + o ) ;
   if(this[i] == o)   { //alert ("exists!" + i) ;
   wid = i; return i; }
							}

return -1;
}	
Array.prototype.countArray = function ( entry) {var match=0; var le = this.length;

if (le==0) {this[0]={entry:entry,count:1  } ; return 1; }
else {
for(var i=0;i<le;i++) {if (this[i].entry==entry ){
//alert ("in count l:"+ i)
this[i].count++;
match=1;
return this[i].count ;

 }
 
 } //for
 
 if (match == 0 )
 { this[le] =  {entry:entry,count:1};return 1;}
 } //start with non 0 length
 }
 //

function addWord(txt)  {txt = txt.replace(/\s{2,}/g, ' ');var c =myWords.exists(txt); if ( c >= 0) { return -1;}
		else
		return  (myWords.insert(txt)) ; }


 
/**********************************************
 Program Author : Pronob Pal. 
 //following are the document ready functions which caters for the droppable and draggable functionalities.
//two kinds of draggable: one is with id orangechunks; this is the input text area.
// the other kind of draggable is with class "entry" that is either a word or scene ;.
//these categories represented by the lvl attribute with value "w", "s",  ; 
//each entry carries an id with value nnn, nnn being the index number for the entry in the arraay myWords
//there are 6 kinds of these id, depending what kind of entry in the DOM tree it represents.
//note : each words [an  utteracnce }can be either aa single word or a phrase in the dictionary myWords occurs only once in the dictionary, but can apparear in another 6 more
//places as listed below:
//the id kinds ar:
//cid- the main entry as concept word.
//sid = entry as a scene name
//fid - entry  as a flow name, fsid -entry for a scene within a flow; swid - entry for a word in scene, fwid - entry for a word in a flow.
//an entry with either swid or the fwid can have an attribute of measure giving the value of the word in the context
//when a scene entry is created , an scrollmatic entry is made  for cid [if one does not exist already] , and that word is also included in the scene through swid; similarly when flow 
//entry made ,an entry is made to the concept word first, and an entry made od scene throgh sid and the scene is included in the flow through fsid;
//in this case fwid is not made aotomatically , that entry can be made as a seperate entry. A flow can be navigated , i.e. each of the scenes visited in sequence and 
//each scene offers a canvas to draw free hand as well as some words in the scene come up as an input field, as explained below.
//Flow words are words that belong to the flow.
// the flow words are special in the sense, when you navigate  through the flow, each flow word that is also a scene word opens up in that scene for user input ; these values are carried through 
//and the finaly the flow end is reached and the flow words and the scene appear in a collage at the end of the navigation.
//the document ready function sets up the action templates [callbacks] by which all the 3 kinds of levels of entries and as well as the 6  kinds  of ids  can be captured  in the DOM through drag and drop actions. 
 // This also brings the rule regarding droppables
// 
************************************************************/




  $(document).ready(loader());
 function loader() {
 alert ("scene is " + $('samscene').html() );
    adjustContainer();
	 
	 
//	  $(".entry").draggable({revert:true});
//	  $(function() {
    $( ".entry" ).draggable({ 
        scroll: true,
        scrollSensitivity: 30,
        revert: true,
		cursorAt: {left: 0, top: 0},
		containment: 'document',
        zIndex:1000,
		stack: 'li',
        revertDuration: 100,
        delay: 100 
    });

	  
	   $("#orangechunks").draggable({revert:true});
 //Concept  droppable==== 
    $("#droppablew").droppable({
      drop: function(event,ui) { 
	   if( ui.draggable.attr("lvl") == "words"){
	  	var txt = $('#wt').val() ;
		var  iid = addWord(txt);
		if(iid >= 0) {
		xml = "<word name=" + txt +"/>";
		$("#droppablewent ul").append('<li class="entry" lvl="w" id="wid'+ iid +'"><img src="images/drag_a.png"/>  ' + txt+ '</li >'	);	
		 $( ".entry" ).draggable({ 
        scroll: true,
		cursorAt: {left: 0, top: 0},
        scrollSensitivity: 30,
        revert: true,
		containment: 'document',
		helper: 'clone',
        start : function() {
        this.style.display="none";
        },
        stop: function() {
        this.style.display="";
        },
        zIndex:1000,
		stack: '.entry',
        revertDuration: 100,
        delay: 100 
    });
	 
        $('#ent').text("word Generated");
		$('#ent').effect("highlight", {color:"chocolate"}, 3000);
		$('#xml').text(xml);
		$('#xml').effect("highlight", {}, 4000);
		$('#wt').val("typeText!"); }
		
		else { alert("word already in the concept list") ; }
                                    }
									else { alert("Improper Level being droped") ; }
	  }
    });
//====Concept Droppable	
 
//Scene Droppable============================================================		 
	 $("#droppables").droppable({
      drop: function(event,ui) {
	   var txt;
        if( ui.draggable.attr("lvl") == "words"){
		//wordsinS
        txt = $('#wt').val() ;
		txt = txt.replace(/\s{2,}/g, ' ' )
		var  iid = addWord(txt);
		if(iid >= 0) {
		xml = "<word name=" + txt +"/>";
		$("#droppablewent ul").append('<li class="entry" lvl="w" id="wid'+ iid +'">  ' + txt+ '</li >'	);	
		// alert ('txt' + $("#droppablewent").text());
		  $( ".entry" ).draggable({ 
        scroll: true,
        scrollSensitivity: 30,
        revert: true,
		containment: 'document',
		helper: 'clone',
        start : function() {
        this.style.display="none";
        },
        stop: function() {
        this.style.display="";
        },
        zIndex:1000,
		stack: '.entry',
        revertDuration: 100,
        delay: 100 
    }); }
		 } 
		 else
		 if( ui.draggable.attr("lvl") == "w" )
		 {
		 wid=ui.draggable.attr('id');
		 txt=$(ui.draggable).text() ;
		 }
		 
		 {
		var jqid="#sid" + wid;
		if (!($(jqid).length)){
	$("#sceneHolder").append('<DIV class="sentry" id="sen' + wid +'" lvl="s"  > <cite class="entry" id="sid' + wid +'" lvl="s"  > <img src="images/drag_a.png"/>' + txt + '</cite><br/>Words: <div class="subSWord" style="max-height:100px;overflow:scroll;"  > 	<ul>    </ul> </DIV></DIV> ') ;
		//alert("sceneholder:" +$("#sceneHolder").html());
		xml = xml + "<Scene name =" +txt + "/>" ; 
		//Add entry to mysw   : 	mysw[0] 
		//$("#droppablesent ul").append('<li class="entry" lvl="s"> <img src="images/drag_a.png"/> ' + txt+ '</li >'	);	
		 $( ".entry" ).draggable({ 
        scroll: true,
        scrollSensitivity: 30,
        revert: true,
		refreshPositions: true,
		containment: 'document',
		helper: 'clone',
        start : function() {
        this.style.display="none";
        },
        stop: function() {
        this.style.display="";
        },
        zIndex:1000,
		stack: '.entry',
        revertDuration: 100,
        delay: 100 
    });
		 //dynamic sentry------------
		/* $(".sentry").droppable({
		over: function(event, ui) {
		$("this").scroll(); 
		
		};}) */
		$(".sentry").droppable({
				//alert ("before drop");
       	over: function(event, ui) {
		$("this").scroll();
//		alert("scrolled");
		
		} ,			
      drop: function(event,ui) { 
	  // alert ("in" +ui.draggable.attr("lvl")  );
	   if( ui.draggable.attr("lvl") == "w"){
	   winSubSW(ui,this);
	    			
                                         }
		else  
		if( ui.draggable.attr("lvl") == "words"){
		//alert ("invoking in S" +ui.draggable.attr("lvl")  );
	   wordsinSubSW(ui,this);
	    			
                                         }
		
	} })
		 
		 
		 //--------dynamic sentry
      $('#ent').text("Scene Created"); }
		
		$('#ent').effect("highlight", {color:"green"}, 3000);
		$('#xml').text(xml);
		$('#xml').effect("highlight", {}, 4000);
		$('#wt').val("typeText!"); }
        
	  }
	  }
    );
     //=====Scene Droppable	
	
	 //Flows Droppable============================================================		 
	 $("#droppablef").droppable({
      drop: function(event,ui) {
        if( ui.draggable.attr("lvl") == "words"  ){
        var txt = $('#wt').val() ;
		txt = txt.replace(/\s{2,}/g, ' ' )
		var  iid = addWord(txt);
		if(iid >= 0) {
		xml = "<word name=" + txt +"/>";
		$("#droppablewent ul").append('<li class="entry" lvl="w" id="wid'+ iid +'">  ' + txt+ '</li >'	);	
//alert ('txt' + $("#droppablewent ").text());
		 $( ".entry" ).draggable({ 
        scroll: true,
        scrollSensitivity: 30,
        revert: true,
		containment: 'document',
		helper: 'clone',
        start : function() {
        this.style.display="none";
        },
        stop: function() {
        this.style.display="";
        },
        zIndex:1000,
		stack: '.entry',
        revertDuration: 100,
        delay: 100 
    }); } } 
		 else
		 if( ui.draggable.attr("lvl") == "w" )
		 {
		 wid=(draggable.attr('id')).substring(3);
		 txt=$(ui.draggable).text() ;
		 }
		 else
		{ if( ui.draggable.attr("lvl") == "s" )
		 {
		 wid=(ui.draggable.attr('id')).substring(3);
		 txt=$(ui.draggable).text() ;
		 }		}
		 {
		var jqid="#fid" + wid;
		if (!($(jqid).length)){
		//<a href="#" onClick="navModal()">A Flow </a> 
	$("#flowHolder").append('<DIV class="fentry" id="fid' + wid +'" lvl="f"><a href="#" onClick="navModal('+ wid + ')"> ' + txt + '</a><br/>Scenes  <div class="subFScene" style=" max-height:120px;overflow:scroll;"  > 	<ul>    </ul></div></Div> ' ) ;
		//alert("flowholder:" +$("#flowHolder").html());
		xml = xml + "<Scene name =" +txt + "/>" ; 
		
		 //dynamic subFword-----------LVL 3
		 
		$(".subFWord").droppable({
		//alert ("before drop");	
      drop: function(event,ui) { 
	 //  alert ("in" +ui.draggable.attr("lvl")  );
	   if( ui.draggable.attr("lvl") == "w"){ 
	   
		   
	   
	   winSubFW(ui,this);	
		 }
		
		else
		if( ui.draggable.attr("lvl") == "words"){
		
		wordsinSubFW(ui,this);	
		 }
		
		else
		{ alert("Improper Level being droped") ;		}
		
		// alert("after drop word:" +$(this).html()); 
                                    }  
									
    })
	 //dynamic subFScene-----------LVL 3	 
	$(".subFScene").droppable({
		//alert ("before drop");	
      drop: function(event,ui) { 
	   //alert ("in" +ui.draggable.attr("lvl")  );
	   if( ui.draggable.attr("lvl") == "s"){
	   //alert ("in to sin"  );
	   
	   sinSubFS(ui,this);	
		 }
					
		else
		{ alert("Improper Level being droped") ;		}
		
		// alert("after drop scene:" +$(this).html()); 
                                    }  
									
    })	 
		 //--------dynamic sentry
      $('#ent').text("Scene added"); }
		else
		{ alert("Improper Level being droped for  flow") ;		}
		$('#ent').effect("highlight", {color:"green"}, 3000);
		$('#xml').text(xml);
		$('#xml').effect("highlight", {}, 4000);
		$('#wt').val("typeText!"); }
        
	  }
	  } )
//===============flow droppable	

  } 
function winSubSW(ui,pthis) {  // winSubSW
	    //alert ("inif" +ui.draggable.attr("lvl")+ui.draggable.attr('id')   );
	  	var txt = ui.draggable.text() ; //ui.draggable.text()$(ui.draggable).text()
			    //alert ("iniftxt" +ui.draggable.attr("lvl")+$(ui.draggable).text()   );
		var eid = ui.draggable.attr('id');
		//get the sid of current sentry put  eid into mysw[id] list. 
		//alert($(pthis).attr('id'));
		var sid = $(pthis).attr('id');
		sid=sid.substring(3);
		var ent =eid.substring(3);
		//alert ("ent:" + ent +":" +sid );	
		mysw.addEntry(sid,ent);
		//alert("put is sid" + myswid[sid,eid]);
		
		xml = "<word name=" + txt +"/>";
		var attrstr = "[swid='"+eid+"']";
		var exstr ='$'+'("'+attrstr+'",pthis).length > 0';
		//alert ("eval"+eval(exstr));
		//attrstr ='"'+attrstr+'"';
     if ( !eval(exstr)) 
	  //  alert ("4attr"+ '"'+attrstr+'"') ;
	  // alert ("post0"+ $(attrstr, this).text());
		{
		
		//alert ("appending:" + eid );	
		
		$('ul',pthis).append('<li  lvl="sw" swid= '+ eid +'>  ' + txt+ '</li >'	); 
		//alert ("inserted"+ $("[swid='swid1']",pthis).text());
		// alert ("post"+ $('"'+attrstr+'"', this).text());
		} else
        alert ("skipped adding swid");	
		 }  
function wordsinSubSW(ui,pthis) {  
     //*****************************
	 
        var txt = $('#wt').val() ;
		txt = txt.replace(/\s{2,}/g, ' ' )
		
	  //alert ("reaching" + txt  );
		var  iid = addWord(txt);
		if(iid >= 0) {
		xml = "<word name=" + txt +"/>";
		$("#droppablewent ul").append('<li class="entry" lvl="w" id="wid'+ iid +'">  ' + txt+ '</li >'	);	
		 //alert ('txt' + $("#droppablewent").text());
		
			   // alert ("inif new word " + wid  );
		var eid =  wid;
		//ui.draggable.attr('id');
		//alert ("eid:" + eid );	
		//eid = "fwid" + eid;
		xml = "<word name=" + txt +"/>";
		var attrstr = "[swid='"+eid+"']";
		var exstr ='$'+'("'+attrstr+'",pthis).length > 0';
		//alert ("eval"+eval(exstr));
	 	//attrstr ='"'+attrstr+'"';
     if ( !eval(exstr)) 
	  //  alert ("4attr"+ '"'+attrstr+'"') ;
	  // alert ("post0"+ $(attrstr, this).text());
		{
		
		//alert ("appending:" + eid );	
		
		$('ul',pthis).append('<li  lvl="sw" swid= '+ eid +'>  ' + txt+ '</li >'	); 
		//alert ("inserted"+ $("[swid='swid1']",pthis).text());
		// alert ("post"+ $('"'+attrstr+'"', this).text());
		} else
        alert (" awakward skipped adding swid");	
		 }
}  		 
function wordsinSubFW(ui,pthis){
        var txt = $('#wt').val() ;
		txt = txt.replace(/\s{2,}/g, ' ' )
		var  iid = addWord(txt);
		if(iid >= 0) {
		xml = "<word name=" + txt +"/>";
		$("#droppablewent ul").append('<li class="entry" lvl="w" id="wid'+ iid +'">  ' + txt+ '</li >'	);	
		 //alert ('txt' + $("#droppablewent").text());
		
			   // alert ("inif new word " + wid  );
		var eid =  wid;
		//ui.draggable.attr('id');
		//alert ("eid:" + eid );	
		//eid = "fwid" + eid;
		xml = "<word name=" + txt +"/>";
		var attrstr = "[fwid='"+eid+"']";
		var exstr ='$'+'("'+attrstr+'",pthis).length > 0';
		//alert ("eval"+eval(exstr));
		//attrstr ='"'+attrstr+'"';
     if ( !eval(exstr)) 
	  //  alert ("4attr"+ '"'+attrstr+'"') ;
	  // alert ("post0"+ $(attrstr, this).text());
		{
		
		//alert ("appending n:fwid:" + eid );	
		
		$('ul',pthis).append('<li  lvl="fw" fwid= '+ eid +'>  ' + txt+ '</li >'	); 
		//alert ("inserted"+ $("[fwid='fwid1']",this).text());
		// alert ("post"+ $('"'+attrstr+'"', this).text());
		} else
        alert ("awkward;skipped adding word fwid");  
		}
		}
function winSubFW(ui,pthis){
	   // alert ("in f o w: " +ui.draggable.attr("lvl")+ui.draggable.attr('id')   );
	  	var txt = ui.draggable.text() ; //ui.draggable.text()$(ui.draggable).text()
			    //alert ("iniftxt: " +ui.draggable.attr("lvl")+$(ui.draggable).text()   );
		var eid = ui.draggable.attr('id');
		//alert ("eid:" + eid );	
		eid=eid.substring(3);
		xml = "<word name=" + txt +"/>";
		var attrstr = "[fwid='"+eid+"']";
		var exstr ='$'+'("'+attrstr+'",pthis).length > 0';
		eval(exstr);
		//attrstr ='"'+attrstr+'"';
     if ( !eval(exstr)) 
	  //  alert ("4attr"+ '"'+attrstr+'"') ;
	  // alert ("post0"+ $(attrstr, this).text());
		{
		
		alert ("appending o :" + eid );	
		
		$('ul',pthis).append('<li  lvl="fw" fwid= '+ eid +'>  ' + txt+ '</li >'	); 
		//alert ("inserted"+ $("[fwid='fwid1']",this).text());
		// alert ("post"+ $('"'+attrstr+'"', this).text());
		} else
        alert ("skipped adding fwid"); 
		}  
		
function sinSubFS(ui,pthis){
	    //alert ("in f s:" +ui.draggable.attr("lvl")+ui.draggable.attr('id')   );
	  	var txt = ui.draggable.text() ; //ui.draggable.text()$(ui.draggable).text()
			   // alert ("iniftxt" +ui.draggable.attr("lvl")+$(ui.draggable).text()   );
		var eid = ui.draggable.attr('id');
		//alert ("eid for s  subf: " + eid );	
		eid = eid.substring(3);
		xml = "<word name=" + txt +"/>";
		var attrstr = "[fsid='"+eid+"']";
		var exstr ='$'+'("'+attrstr+'",pthis).length > 0';
		//alert ("eval"+eval(exstr));
		//attrstr ='"'+attrstr+'"';
     if ( !eval(exstr)) 
	  //  alert ("4attr"+ '"'+attrstr+'"') ;
	  // alert ("post0"+ $(attrstr, pthis).text());
		{
		
		//alert ("appending f sid :" + eid );	
		
		$('ul',pthis).append('<li  lvl="fs" fsid= '+ eid +'>  ' + txt+ '</li >'	); 
		//alert ("inserted f s );
		// alert ("post"+ $('"'+attrstr+'"', pthis).text());
		} else
        alert ("skipped adding fsid");  } 		
 $(window).resize(function() {
adjustContainer();
}); 
function getPageHTML() {
 //var htmlStr = "<html>" + $("html").html() + "</html>";
 var htmlStr =  $("html").html() ;
 //text  = $(this).html();
//this).text(htmlStr);
//  $("#status").text(htmlStr);
  return  htmlStr;
}
function adjustContainer() {  
 // Here get your viewport values - let's say  
 // it determines the viewport is 800px, store it  
 // in var "width"  
 var wwidth= $(window).width();
var viewportHeight = $(window).height();
 //alert ( "adjustl" + wwidth);
 width=500; 
 if (wwidth > 0) { 

  if (wwidth  < 500 ) { 
 // alert ( "width small");
  width=240;
  width += 'px'; 
  document.getElementById('fortable').style.width=width; 
   document.getElementById('fortable').style.height='600px';  
 }  
 if (wwidth > 500 ) { 
 //alert ( "width large");
  width=500;
  width += 'px'; 
  document.getElementById('fortable').style.width=width;  
   document.getElementById('fortable').style.height='600px'; 
 }  
}  
}

//navigation scripts
var count = 0;

function navModal(fid) {

//alert("finder"+"#fid"+fid + " .subFScene [lvl='fs']");
//alert("no of scenes"+$("#fid"+fid + " .subFScene [lvl='fs']").length);
//$("#fid"+fid + " .subFScene [lvl='fs']").each(function( index ) {
//alert( index + ": " + $(this).text() );
//});
navi(fid);
//alert("before");
$("#dialog-modal").dialog({
height: 400,
width:500,
modal: true
});
}
function navic(){
 
pos = pos +1;
if (pos == (flowScenes.length )) { revisit = true; pos = 0 } 
/*$("#ds").text( ' <h1> Scene: '+ flowScenes[pos] +'</h1>') ;
var attrstr = "#sen"+ pos + " [lvl='sw']";
//create word list for the scene
var exstr ='$("'+attrstr+'").each(function(index) {$("#ds").append("<div>" + $(this).text() + "</div>"); } ) ';
var j1 = eval(exstr);
//(j1).each(function(index) {alert("words" + index + ":"+ $(this).text()); } ) 
*/
if (revisit) {$("#ds").html(popper[pos]) ;$(".fstate").click(function () {
if($(this).text()=="True" ){ $(this).text('False')} 
else {$(this).text('True') } 
popper[pos]=$("#ds").html();
//alert("writing now");
//saveQData($("html").contents());
//var ns=(getPageHTML());
//.replace(/"/g,"%%"); 
// ns=(ns).replace(/&/g,"%@"); 
 // ns=(ns).replace(/\+/g,"%!"); 
/*var ll= ns.length;
var sl = 1000; var sta =-1000; var el=-1;var seg;
for(var i =0 ; i*1000 < ll; i++)
{
sta = sta + sl ;

el = el + sl;
seg = ns.substring(sta,el);


//alert("saved:"+sta+":"+ seg); 
saveQData(seg);
 } */
//seg = ns.substring(el+1);
// saveQData(ns);
//alert ("onr pos:" + pos+popper[pos]);
return false;
}); }
else{
popScene(pos); }
//alert ("pos:" + pos );



 }
 /*
$(".fstate").click(function () { alert("in state");
if($(this).text()=="True" ){ $(this).text('False')} 
else {$(this).text('True') } 

popper[pos]=$("#ds").html();
alert ("on pos:" + pos+popper[pos]);
return false;
});  */
 
 function popScene(pos){ 
$("#ds").html( ' <h1> Scene: '+ flowScenes[pos] +'</h1>') ;
 var sno = flowSceneIds[pos];
var attrstr = "#sen"+ sno+ " [lvl='sw']";
//create word list for the scene
$("#ds").append("<h2> Word List In scene </h2>");
$("#ds").append("<ul>");
var expst= ' <a class="fstate" href="#">True</a> </li>';
// to add:$("#ds").append("<li> "+ $(this).text() + expst + ');
var exstr ='$("'+attrstr+'").each(function(index) {$("#ds").append("<li> " +  $(this).text() + expst);  } ) ';
$("#ds").append("</ul>");
//alert ("popscene:"+exstr);
//alert("x:"+expst);
var j1 = eval(exstr);
$(".fstate").click(function () { 
if($(this).text()=="True" ){ $(this).text('False')} 
else {$(this).text('True') } 
popper[pos]=$("#ds").html();
//alert ("on pos:" + pos+popper[pos]);
return false;
}); 
popper[pos]=$("#ds").html();  
 }
 function gatherWord(sid) {
 var scid = "#sid"+sid;
 $(scid [lvl="sw"]).each (function(index){var wid =$(this).attr('swid'); if(tempArray.contArray(wid) > 1) { flowwords[wid] ='Y'}; })
 }
 
 
function navi(fid) {
//flowWords = null; tempArray=null; fwlength=0; flowScenes=null;flowSceneIds=null;
revisit=false;
$("#dialog-modal").empty();
$("#dialog-modal").css('background-color','green');
$("#dialog-modal").css('border','1px solid black');
$("#dialog-modal").append('<DIV id="ds" > SCENE :   </DIV>  ');
$("#dialog-modal").append('<DIV id="scenecontent" > flow:' + fid + '</DIV>  ');
//as we find flow scenes ,the words in flow scene should be map reduced to get words in more than one scene in the flow
$("#fid"+fid + " .subFScene [lvl='fs']").each(function( index ) {

flowScenes[index] = $(this).text();
flowSceneIds[index] =$(this).attr('fsid');
//gatherWord($(this).attr('fsid'));
//alert("pop index" + index + ":"+ flowScenes[index]);
//loop through swids and create wordflow   array, then populate fwids  and fwsn for posterity. 
//
});
 pos=0;
$("#ds").text(flowScenes[0]) ;
popScene(pos);
//alert("ready to click");
$("#dialog-modal").append('<p> <button onclick= "navic()"  >Navigate</button>  </p> '); 



 } 
 function writeDoc() { 
 $("#writebox").append(' <div> '+ $("#fortable").html()+ ' </div>' );
 
 } 
$(function() {
	 $( "#accordion" ).accordion();
	  
    });
function saveQDataDialog() {var rep = saveQData();$(rep).dialog({
height: 400,
width:500,
modal: true
}); }	
function saveQData() {
var data = getPageHTML();
  //var uid=  document.getElementById("uid").value;
 //  var pwd=  document.getElementById("pwd").value;
 //   var data=  document.getElementById("savedata").value;
//	var app = document.getElementById("app").value;
  var file = "quadroo.data";
    // Create our XMLHttpRequest object
    var hr = new XMLHttpRequest();
    // Create some variables we need to send to our PHP file
    var url = "SaveQDataP.php";
alert ("data before"+ data); 	
  data = encodeURIComponent(data); 
//var vars = "data="+ data +"&app="+"a"+"&uid="+"u"+ "&pwd="+""; ;
alert ("data after"+ data); 
var vars = "data="+data ;
//alert("in save ready for="+vars );
    hr.open("POST", url, true);
    // Set content type header information for sending url encoded variables in the request
  //hr.setRequestHeader("Content-type", "text/html; charset=UTF-8");
	 hr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
//	"application/x-www-form-urlencoded"
    // Access the onreadystatechange event for the XMLHttpRequest object
    hr.onreadystatechange = function() {
	    if(hr.readyState == 4 && hr.status == 200) {
		    var return_data = hr.responseText;
			return  return_data;
		//	document.getElementById("status").innerHTML = "data saved:"+ data;
	    }
    }
    // Send the data to PHP now... and wait for response to update the status div
	//alert("vars sent" + vars.length+ ":"+vars);
    hr.send(vars); // Actually execute the request
    document.getElementById("status").innerHTML = "processing...";
}	
function readDoc()  {
if (window.XMLHttpRequest)
  {
  xhttp=new XMLHttpRequest();
  }
else
  {
  xhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
xhttp.open("GET","Qudroo.data",false);
xhttp.send();
var docr = xhttp.responseText;
alert("in qread before"+docr);
//var docrd = decodeURIComponent(docr);
//alert("in qread"+docrd);
/*
docr =  docr.replace(/%%/g,'"');
docr = docr.replace(/%@/g,"&");
docr = docr.replace(/%!/g,"+"); */
//alert("in qread html:"+docr );

 
  $("html").html(docr);
} 


 