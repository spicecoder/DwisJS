 //modifications needed : all functions are www prototype;
 //cue space is conceptual space 
 //cue is object
 //cueprint is a string
 //every word outside metaword is a cue
 //every word has a name that belongs to metaWords
 //make properties explicit in WWW
 //draw connection between properties and functions
 //all variable declared within WWW can have function attached through prototypes and value et in the WWW name space
 //www can have an object called workspace
//AUTHOR : PRONAB PAL ; WORLD WITH WORDS, SYDNEY
//THe Licence agreement in using  this document is defined  here :https://github.com/pronabpal/WWW/blob/master/LICENSE
//WWW defined here
//WWW functions only take cue object ; cuepath  is dot seperated name
//dwisv0.js is the initial version of this document
 function WWW(root) { 
this.droot = ""; 
 if (typeof root   != 'undefined')
 { 
 // root supplied will be the default root , to create a different root, we need additional functionality like rootCue 
this.droot = root; 

 //this.CollectWord(root,"starter");

  }
  else {this.droot ="@";
   }
 
 this.droot = this.makeCue(this ,"starter","self","none",this.droot);
 this.insert(this.metaWords.words,this.droot.cuepath);
 this.metaWords.desc[this.metaWords.wid] = this.droot;
 this.sMeta = new Array();
 this.sLink = new Array();
 this.serial ="";
 
 
 
 //this.droot is starter cue, with root as self, parent as none,cutepath being blank
  
 }
 WWW.prototype.hasRoot = function(ele,rr)   {
 
 if (ele === rr ){ return false ;}
 if ( ele.indexOf(this.droot.cuepath + this.NSS) > -1) { return true;}
 else {return false; }
}  
  WWW.prototype.serializeCue = function (obj) { 
 //start from CUe object ...list all essential props, for each make an entry to metawords json string array-get the unique no,for each such no make an entry- that give rise 
 //to two dimensional array to be written as jsonarray of jsonarray]-the whole structure looks like {meta:[{ },{ }.. ],flows:[[...],[.],..] } ;store this as strong
//to read the string back, we can reconstruct original cue and metawords,metawords from meta, each entry is cue- make meta entry point to this and the word corr for arry entrypoint of flow 
//hangs from the flow
var resproperty = {droot:'',parent:'',root:'',sMeta:'',sLink:'' } 
   //if cue object get properties in cue object except the one from constructor
    
	//listw.push(cuo.cuepath); //first entry is a cupath string ,not an object
   // for (var property in cuo) { if ( !(property  in resproperty ))
// node flow== exeution flow
 
 var iw = 0;
 var isf = 0;
    for (var property in obj) {
	             
        if (obj.hasOwnProperty(property)) {
		
		   if( !(property  in resproperty )) {
            if (typeof obj[property] == "object")
                this.serializeCue(obj[property]);
				
            else       {  if  (property === "it"){if (this.sMeta.exists(obj[property] )< 0){if(obj[property] != 'starter'){ iw  = this.sMeta.insert(obj[property]);}}}
			              if  (property === "cuepath" ) {if (this.sMeta.exists(obj[property]) < 0){ isf  = this.sMeta.insert(obj[property]);
						   this.addNSEntry(this.sLink,isf,obj.cuepath); 
						  } }
			          console.log(property + "   " + obj[property]);
				   } 
				   
				    
        }
		}
    }
	
	
	
  }
 
WWW.prototype.deSerializeCue = function () {
 //var storedmeta = $("#datastoremeta").html();
 var storedmeta = this.serial;
 alert ("html storedMeta" + storedmeta );
 //initialize the this storages
var newb = new Object();
this.droot= this.makeCue(newb,"starter","self","none",this.droot.cuepath);

this.metaWords = new Object();
this.metaWords.words = new Array(); //holds word names
this.metaWords.desc  = new Array(); //holds word descriptions
this.metaWords.values  = new Array(); //holds m-constant values for words or object values for cue words
this.metaWords.wid   = 0 ;          // current word pointer
 this.NSE   = new Array() ;    // The Namespace object for an arry for each cuepath
this.Response = new Object();
this.NSS = ".";
this.NavFlow= new Object();
this.ScopeFlow = new Object();
this.insert(this.metaWords.words,this.droot.cuepath);
this.metaWords.desc[this.metaWords.wid] = this.droot;
var storeMe  = new Array();
var storeCue = new Array();
var storetemp = new Array();
var storeDesc = new Array();
var dr = "%";
storetemp =storedmeta.split(',');

for (var ii=0;ii < storetemp.length ; ii = ii + 1) { 
if (this.hasRoot(storetemp[ii],this.droot.cuepath)) { storeCue.push(storetemp[ii]) ;  }
else {if(this.droot.cuepath == storetemp[ii] ) {dr = storetemp[ii];} else {storeMe.push(storetemp[ii]);}     }

}
alert(  "META::" + storeMe );
alert("deselials:" +storeCue   );
//is.metaWords.words = storeMe;
storeCue.sort();// we sortit to make sure,the cuepath of every element, as we progress in the loop already points to an object
alert("storeCue" + storeCue) ;
//var W2 = new WWW(dr);
// add words to W2
for(var  jj= 0; jj<storeMe.length ; jj =jj+ 1 ){ 
if (storeMe[jj] != 'starter' )
  {    var se = storeMe[jj]; 
	this.placeCue(se);}
}
//storeDesc[rootposition] = W2;
//first we create the root object and assign the desc entry against @ to this address.
//after that we are ready to insert every storeCue into metaWords and associate the object entry to the desc entry.
//
for(var  jj= 0;jj<storeCue.length ; jj =jj+ 1){ 
var elems = storeCue[jj] ;
var elmarr  = elems.split(this.NSS) ;
if (elmarr.length  > 2) {   var elm = elmarr.splice(elmarr.length-1,1); var cpaath = elmarr.join(this.NSS);
this.placeCue(elm,cpaath) ;

}

}
//lreturn W2;
 }
 //   every cue has :
 //1. name
 //2. pointer to root
// 3. pointer to parent
// 4.place holder for cuepath 
// 5. cuepath is a string  .
 // makeCue is  same as making an word object
 //however Cue exposes a rich set of operation [invovinf roo,parent,child in cuepath on object properties which reflects characteristic of Cue concept
 // Cue works on names , not Cuepaths hence word names are important and it works the same accoss all Cue paths or contexts:
 //basicaly if Cue recognises that two name of object properties are same then it will work on those properties of the supplied objects
 // and it gives you the option of excluding any name you supply in an exclusion array.
 //thu Cue algebra takes one or more cue  objects creates  a single array of name valuealgebra on the convention of names in the cue objects 
 //e.g add can be op1 and op2 ....this will be formalised ...they will look like Cue.prototype.flow ,fanin,fanout,navigate  etc to be done in second iteration
 
 function Cue(obj,it,root,parent,cuepath,wval) {var ob; if (typeof obj   === 'undefined'){ob = new Object();}
                                                                         else {  ob = obj; }
                                                                    ;ob.cuepath = cuepath; // a string 
																	ob.parent = parent;     //a pointer
																	ob.root = root;         // a pointer 
																	ob.it = it;    //cue or word name
																	ob.wval =wval;
																	return ob;   }
 
 
  WWW.prototype.makeCue = function ( obj,it,root,parent,cuepath,wval) { 
                                                                       var r = new Cue( obj,it,root,parent,cuepath,wval);
																	   return r;
                                                                      }
 //WWW.prototype.cue  =  function(cp , Word) {cp input as string adds the word  to cp object - as determined by findotidObj}
// WWW is a object which represents a collection of name spaces and words in those name spaces. A namespace has a name which is a sequence of words seperated by ".";
// a namespace is a sequence of dot sperated words, a namespace gives a name to the collection of words in that belong to the  name space. WWW is the collection of all name spaces
//that is made using the words from a dictionary  which we refer to as metawords. 
//By convention all words in metaords are devoid of space -single undescore recplaces one or more consequitive spaces in the input words
//metawords is a dictionary of all words that can occur  in any name space cteated within WWW. All words ,including the words in the name  of the will belong to metawords.
 //The structures in WWW: metawords is an Object which hold two arrays ,words and desc for description of the word
 // we treat any word object as cue object ;every  cue  object starts from WWW.droot;  each such cue  name should belong to metawords
 WWW.prototype.droot= new Object();
 WWW.prototype.metaWords = new Object();
 WWW.prototype.metaWords.words = new Array(); //holds word names
 WWW.prototype.metaWords.desc  = new Array(); //holds word descriptions
 WWW.prototype.metaWords.values  = new Array(); //holds m-constant values for words or object values for cue words
 WWW.prototype.metaWords.wid   = 0 ;          // current word pointer
 WWW.prototype.NSE   = new Array() ;    // The Namespace object for an array for each word
 WWW.prototype.Response = new Object();
 WWW.prototype.NSS = ".";
 WWW.prototype.NavFlow= new Object();
 WWW.prototype.ScopeFlow = new Object();
 WWW.prototype.serial = "---";
 function addNSEntry(anArray,ent, o){if (typeof (anArray[ent]) !== 'undefined') {
         var clist = anArray[ent];
         clist = clist + o +'$]'  ;
         anArray[ent] = clist;
         //alert("expanded" +ent +":"+o);
     } else {
         anArray[ent] = o + '$]';
     }
     return 0; }
 WWW.prototype.addNSEntry = addNSEntry ; 
WWW.prototype.findNSEntry= function(anArray,ent,o) { 
if ( typeof (anArray[ent]) !== 'undefined') { return -1;}  
else 
{var ins  =  o +'$]';
var csvent= anArray[ent];
{return csvent.indexOf(ins); }
}
} 
//insert adds a word to the dictionary  without attaching any description
 WWW.prototype.insert = function (anArray,o) {
    // alert("in insert");
     anArray.push(o);
     this.metaWords.wid =  anArray.length - 1;
     this.Response.insert ="success" + o;
     return anArray;
 }
// first character
 WWW.prototype.firstChar = function (o) {
    // alert("in exists")
     o = o.replace(/\s{1,}/g, '_');
    var f =   o.charAt(0);
var rest = o.substring(1);
alert ("first char:" + f + "rest:" + rest);
	return f;
 }
 
 
 //exists check if an object exists in an array
 
 WWW.prototype.exists = function (anArray,o) {
    // alert("in exists")
     o = o.replace(/\s{1,}/g, '_');
     for (var i = 0; i < anArray.length; i++) {
        // alert("current w:" + metaWords[i] + "supp" + o);
         if (anArray[i] == o) {
             //alert("exists!" + i);
             
             return i;
         }
     }

     return -1;
 }
 //findWord finds a word in the dictionary metaWords
 WWW.prototype.findWord = function (txt) {
    // alert("in find:" + txt);
     txt = txt.replace(/\s{1,}/g, '_');
   //  txt = txt.replace(/ /g, "_");
     var c = this.exists(this.metaWords.words, txt);
	
     if (c >= 0) {
       //  alert("word exists" + c);
	    this.metaWords.wid = c;
         return  c;
     } else {
         return -1;
     }
 };

 //Collectword  adds the word to metawords ,an Object arry [i.e the object has an arry property, metaWords stores a description about the word ,reason for array is it gives an id for the word
 //in the form of index in the array,thus metawords.words and metawords.desc are two arrays keeping the words and their corresponding descriptions together,
 //cuepaths are also stored as metawrds entry,for the cuepaths the desc points to the cue object corresponding to cuepath
 
 WWW.prototype.CollectWord = function (txt, desc) {
 //donot allow the txt to be root
     alert("in collect:" + txt);
     txt = txt.replace(/\s{1,}/g, '_');
    // txt = txt.replace(/ /g, "_");
     var c = this.exists(this.metaWords.words, txt);
     if (c >= 0) {
         //alert("word exists" + c);
         return -1;
		  
     } else {
         //alert("going in");
       this.metaWords.words.push(txt);
 
     this.metaWords.wid =  this.metaWords.words.length - 1;

	   if (desc != 'undefined') {
         this.metaWords.desc[this.metaWords.wid] = desc;
     }
	 this.Response.wordcollected = txt;
	 return this.metaWords.wid ;
 }
 }
  WWW.prototype.pushWord = function (txt,desc) {
 //no checking of word exitence , txt is welformed
       this.metaWords.words.push(txt);
 
     this.metaWords.wid =  this.metaWords.words.length - 1;

	   if (desc != 'undefined') {
         this.metaWords.desc[this.metaWords.wid] = desc;
     }
	  
	 return this.metaWords.wid ;
 }
 
 
 //getword is getting the description of a word from WWW
 WWW.prototype.getWord = function (txt) {
     //alert("in get:" + txt);
     txt = txt.replace(/\s{1,}/g, '_');
 //    txt = txt.replace(/ /g, "_");
     var c = this.exists(txt);
	 var c = this.exists(this.metaWords.words, txt);
     if (c >= 0) {
         //alert("word exists" + c);
         return this.metaWords.desc[c];
		  
     } else {
        return "";
     
 } }
 //makeNameSpace takes a word that exists in the metadictionary and creates the first level name space like WWW.w 
 //looks like we need to merge placeCue and addWord , once it is placed it is the same
 WWW.prototype.placeCue = function (w,cue,wval) {
 //first find if cue supplied , if string or object
 //for w we have to make sure it exists in metaWords and that we are not duplicating cue
    
    w=w.toString() ;
	w = w.replace(/\s{1,}/g, '_');  
  alert ("exception:" +   w);
     var acue ="";
	 if (typeof (cue) === 'undefined') 
    { //when cue not supplied assume droot is the parent  cue
  	    acue = this.droot ;
	//
	}
	 else { 
	 // a old cue object suppled or cuepath supplied 
	   if (typeof (cue.cuepath) == 'undefined' )
	   {
	   // a cuepath supplied ie cue itself is the cuepath
	   // first find  word entry of cue path, locate cue object from desc
	     this.findWord(cue) ;
	   if (this.metaWords.wid  < 0 )  {  //supplied cuepath does not exist 
	   //we donot want to create a brand new cue path, because that would mean iterative object creation - poentialy can go out of bound
	   console.log("cuepath supplied does not exist");
	   return (-1) ;  //exit 1 : that the cue path does not exist as a word
	   } 
	   acue = this.metaWords.desc[this.metaWords.wid];
	   }
	   }
	 // now we are having a cue object,either way as acue
	 //we need to put nse entry for the word 
	 // which is an instance of Cue(obj,it,root,parent,cuepath) 
	 //we do the check with word supplied w
	 { var jj = this.findWord(w);
	 if (jj < 0 ) { 
	 console.log("the word for placement does not exist yet:" + w );
	   // add the word in metaWords,we put the cuepath in the description as the first context which introduced the word
       jj =  this.pushWord(w,acue.cuepath);
	   }
	    
    //else 
	{     //we now have a cue object and a word id to place with it
	     //jj = this.metaWords.wid;
		 //if the word is not already in the cue object
		 
         if (typeof (acue [w]) == 'undefined') {
		     this.addNSEntry(this.NSE,jj,acue.cuepath);
		 //make word entry of cuepath CollectWord8 this.droot.cuepath +NSS + w; the desc points to the cue objec+t
		      neww = new Object(); //makeCue will return this Object after adding some base properties
              acue[w] = this.makeCue (neww,w,this.droot,acue,acue.cuepath +this.NSS + w ,wval) 
			
			 this.pushWord(acue.cuepath+this.NSS+w,acue[w]);
            
           //   alert("ns formed" + ii + nsv[0]);
             return (acue.cuepath+this.NSS+w);
         } else {
		    console.log("the word is in cue already"+ acue.cuepath +":" + w); //nothing more required
             return "- -";
         }

     }
	
	 } 	 //word action
	 
	 }
	  
 
 
//inCue : find all Cues the word artcipates in
WWW.prototype.listCueWithWord = function(wrd) { 
//find the word
var c = this.findWord(wrd);
if (c > 0) {
var entc = this.NSE[c];
}
if (typeof(entc) != 'undefined') {
var listc = entc.split('$]');
var bluediv="<div class='wlist'> "; 
bluediv = bluediv + "<b>" +"Listing Cues containing Word:"+ wrd + "</b>"   + "<ul>";
if (listc.length > 1) {
 
listc.sort();
for (var ii =0 ; ii  < listc.length  ; ii++ ) {bluediv = bluediv + "<li>" + listc[ii]  + "</li>"; }
bluediv=bluediv + "</ul> </div>";
console.log("bluediv:" + bluediv );}
//this.scopeCue(cue);
return bluediv;

}
}
 // function ListWords(cue) lists all words in NS by name;the first entry is the cuepath for the object that contains the list
 WWW.prototype.listWordsAsCue = function (cue) {
   //cue is string or cue object
   var cp ;var cuo;
   var listw = new Array();
   if (typeof (cue.cuepath) == 'undefined'  ) { cp = cue;
    var ii = this.exists(this.metaWords.words,cp);
   if (ii >= 0) {  cuo =  this.metaWords.desc[ii]}
   }
   else { cuo = cue;}
  var resproperty = {cuepath:'',parent:'',root:'' } 
   //if cue object get properties in cue object except the one from constructor
    
	listw.push(cuo.cuepath); //first entry is a cupath string ,not an object
    for (var property in cuo) { if ( !(property  in resproperty )) {
        if (cuo.hasOwnProperty(property)) {
            if (typeof(cuo[property] ) === "object") {
			 if (typeof(cuo[property].cuepath) != 'undefned') //we are sure now this is our kind of word 
              {  listw.push(cuo[property] );
                console.log("words in  " + cuo[property]  + "@:"+ cuo[property].cuepath);
				 
        } }
    } 
	}
	 }
  return listw;
 }
// function ListWords(cue) lists all words in NS by name;the first entry is the cuepath for the object that contains the list
 WWW.prototype.listWords = function (cue) {
   //cue is string or cue object
   var cp ;var cuo;
   var listw = new Array();
   if (typeof (cue.cuepath) == 'undefined'  ) { cp = cue;
    var ii = this.exists(this.metaWords.words,cp);
   if (ii >= 0) {  cuo =  this.metaWords.desc[ii]}
   }
   else { cuo = cue;}
  var resproperty = {cuepath:'',parent:'',root:'' } 
   //if cue object get properties in cue object except the one from constructor
    
	listw.push(cuo.cuepath);
    for (var property in cuo) { if ( !(property  in resproperty )) {
        if (cuo.hasOwnProperty(property)) {
            if (typeof(cuo[property] ) === "object") {
			 if (typeof(cuo[property].cuepath) != 'undefned') //we are sure now this is our kind of word 
              {  listw.push(property );
                console.log("word is  " + property  + "@:"+ cuo[property].cuepath);
				 
        } }
    } 
	}
	//this.scopeCue(cuo);
	
  }
  return listw;
 }
 
 //scopeCue is expecting the cuepath
 WWW.prototype.scopeCue = function (cue,cindex)  {
 var  scue;
 var reddiv="<div class='slist'> ";
 reddiv = reddiv + "<b>" + "Scoping Through ;"+ cue + "</b>";  + "<ul>";

 //var bluediv="<div class='glist'> "; 
  var cpath  = (cue).split(".");
 if (typeof(cindex) ==='undefined'){ 
 
   
 //if(typeof cue.cuepath  == 'undefined') 

 
 //  else {  cpath = (cue.cuepath).split("."); scue = cue.cpath;}
 //alert ("array path:" + cpath );
 // if cindex not defined
var listp = new Array();


listp[0] = cpath[0];
if (cpath.length > 1 ) {

listp[0] = listp[0] + "." + cpath[1]; //the listp contains the first element after root dot seperated
//purpose of scope is to list progressively consecutive nodes in the cuepath starting from the first
for (var jj = 1;jj < cpath.length -1 ;  jj = jj + 1) {
listp[jj] = listp[jj -1] + "." + cpath[jj+1];  }
 
}
this.ScopeFlow.listp = listp;
this.ScopeFlow.currindex = -1;
}
W.ScopeFlow.currindex = W.ScopeFlow.currindex + 1;
if ((this.ScopeFlow.listp.length - 1) < this.ScopeFlow.currindex ) { this.ScopeFlow.currindex = 0 }
  {
reddiv = reddiv + this.flowforwardCuepath(this.ScopeFlow.currindex,this.ScopeFlow.listp );
//else the index supplied  ;this.ScopeFlow.listc = listc ;
//this.ScopeFlow.currindex = 1;
 }
   
  
   
   reddiv = reddiv + "</div>";
 
 return reddiv;
 }
//flowforwardCuepath takes each entry in listw currentindex , flowforwardCuePath takes each entry as cuepahs,if not it does not list the content
 WWW.prototype.flowforwardCuepath = function(curindex,listw){ 
 //
var reddiv =""; 
var ss ="";
var orngdiv="" ; 
if (curindex <= listw.length -1 ) { 
   reddiv = reddiv + "<b>" + "Current Cue:"+listw[curindex] + "</b>"; 
 var sistw = this.listWordsAsCue(listw[curindex]);
 
//orngdiv = orngdiv + "<h2>" + sistw[0] + "</h2>";  + "<ul>";  we donot need to display cuepath again
for (var ii =1 ; ii  < sistw.length ; ii++ ) {orngdiv = orngdiv + "<li>" + sistw[ii].it + "</li>"; }
orngdiv=orngdiv + "</ul>";
orngdiv = orngdiv + "<button id='scopeflow'> NEXT </button>" ;  
 var scr = '<script>$("#scopeflow").click(function() { scopeCueNext() ;})</script>';
orngdiv = orngdiv + scr; 
          
console.log("orngdiv:" + orngdiv );
console.log("reddiv:" + reddiv );
reddiv = reddiv + "<p>" + orngdiv;
return  reddiv;
 

 } 
 }
 

//function listCue(cue) produces a div where all words in the cue  are listed

 WWW.prototype.listCue = function (cue) {
var listw = this.listWords(cue);

var bluediv="<div class='glist'> "; 
bluediv = bluediv + "<b>" +"Listing Words in Cue:"+ listw[0] + "</b>"   + "<ul>";
if (listw.length > 1) {
listw = listw.slice(1);
listw.sort();
for (var ii =0 ; ii  < listw.length  ; ii++ ) {bluediv = bluediv + "<li>" + listw[ii]  + "</li>"; }
bluediv=bluediv + "</ul> </div>";
console.log("bluediv:" + bluediv );}
//this.scopeCue(cue);
return bluediv;

 }
 //flowforwardCue takes each entry in listw currentindex , flowforward checks  each entry in listw to be objects,if not it does not list the content
 WWW.prototype.flowforwardCue = function(curindex,listw){ 
 //
var reddiv =""; 
var ss ="";
var orngdiv="" ; 
if (curindex <= listw.length -1 ) { 
   reddiv = reddiv + "<p><b>" +"In:"+ listw[curindex].it + "</b></p>"; 
 var sistw = this.listWords(listw[curindex]);
  
//orngdiv = orngdiv + "<u> " + sistw[0] + "</u>";  + "<ul>";
for (var ii =1 ; ii  < sistw.length ; ii++ ) {orngdiv = orngdiv + "<li>" + sistw[ii] + "</li>"; }
orngdiv=orngdiv + "</ul>";
orngdiv = orngdiv + "<button id='navflow'> NEXT </button>" ;  

console.log("orngdiv:" + orngdiv );
console.log("reddiv:" + reddiv );
reddiv = reddiv + "<p>" + orngdiv;
var scr = '<script>$("#navflow").click(function() { flowCueNext() ;})</script>';
reddiv = reddiv + scr;
return  reddiv;
 

 } 
 }
 
 
 WWW.prototype.flowCue = function (cue,indx) {
 var reddiv="" ; 
 if (typeof(indx) ==='undefined'){
var listc = this.listWordsAsCue(cue);

//reddiv = reddiv + "<b>" +"Navigating :" + listc[0] + "</b>";  + "<ul>";
if (listc.length  > 1 ) {
this.NavFlow.listc = listc ;
this.NavFlow.currindex = 1;
//reddiv = reddiv + this.flowforwardCue(1,listc);

 }
}
else   {this.NavFlow.currindex = this.NavFlow.currindex + 1 }
//
if(this.NavFlow.listc.length > this.NavFlow.currindex) { 
 reddiv = reddiv + "<b>" +"Navigating :" + this.NavFlow.listc[0] + "</b>";  + "<ul>";
 reddiv = reddiv + this.flowforwardCue(this.NavFlow.currindex,this.NavFlow.listc);

 }
 
else{ 
this.NavFlow.currindex = 1;
reddiv = reddiv + "<b>" +"Navigating :" + this.NavFlow.listc[0] + "</b>";  + "<ul>";
reddiv = reddiv + this.flowforwardCue(this.NavFlow.currindex,this.NavFlow.listc);

}

return  (reddiv  );

 }
 
 
 //finddotids is a function to produce a dot seperated integers for each word in the name space  
 WWW.prototype.finddotidObj = function (NS)  { 
 //first split NS : 
         var parts = NS.split(".");
         if (parts[0] != this.droot) {
             alert("NS should start with " + this.droot);
             return -1;
         }
         var pt = this[this.droot];
         for (var jj = 1; jj < parts.length; jj++) {
             var ii = this.findWord(parts[jj]);
             if (ii < 0) {
                 alert("word not found in meta dictionary" + parts[jj]);
             }

           pt = pt[parts[jj]]

         }  return pt ;
 
 
 }
 
 // function ListWordsNS(NS) lists all words in NS;
 WWW.prototype.getparentNS = function (ns) {
 if (this.NS[ns] != 'undefined' )   
 {
   //first split NS : 
         var parts = NS.split(".");
         if (parts[0] != this.droot) {
             alert("NS should start with " + this.droot);
             return -1;
         }
         var pt = this[this.droot];
         for (var jj = 1; jj < (parts.length-1); jj++) {
             var ii = this.findWord(parts[jj]);
             if (ii < 0) {
                 alert("word not found in meta dictionary" + parts[jj]);
             }

           pt = pt[parts[jj]]

         }  
		 
		 return pt ;
		 
		 }
 }
 
 
 
 //extendNameSpace is for attaching one extra word at the end of a series of dot seperated words ,acting like name space.
 //general rule : make /extend NS : create a new object as object property; make an entry in ns list property of root
 // to add word to NS , add the wordid property to NS object - it can have its value - so we can list words in ns
 //what weare doing is bring ability in functions to addres the whole domain and compute by careful picking of which particular word to get involved
 //it is as it the wohole world is our there but we pick little things ,modify them and pit it back in their own place and life continues;
 //it is just we have the option to leave our signature when we modify

 //array to json converts all array entries into json name strings and gives a value equivant to the array index for that entry
 function ArrayToJSONString(ax) {
     //var ax = ["apple", "banana", "mango"];
     var js = "{";
     for (ii = 0; ii < (ax.length - 1); ii++) {
         js = js + '"' + ax[ii] + '":"' + ii + '",';
     }
     js = js + '"' + ax[ax.length - 1] + '":"' + ii + '"}';

     return (js);
 }


 //function listWord0s() lists words in Meta dictionary : return JSON Object with words as names and id as values;
 WWW.prototype.listWordsA = function () {
     return ArrayToJSONString(this.metaWords);
 }
WWW.prototype.extendNameSpace = function (NS,w) { //first locate word in www namespace; then create namespace www.wid if that does not exist
     //alert("in makens");
     var ii = this.findWord(w);
     if (ii >= 0) {
	     m
	 
	      var xn = this.finddotidObj(NS) ;
         if (typeof  xn[w] == 'undefined') {
             xn[w] = new Object();
             this.NS[NS +NSS + w] = new Array();
			 xn[w][0] = NS + "." + w;
             //alert("ns formed" + ii + this["WWW" + NSS + ii][0]);
             return 0;
         } else {
             return -1;
         }

     }
     return -2;
 }
 //function addWord(NS,W) adds a word to existing namespace NS, W has to be in metadictionary;
 WWW.prototype.addWordToNS = function (ns, W) {
     //first check if NS is created property 
     //normalise NS;should start with droot; 
     //if ( typeof (this[NS])  == 'undefined')  { alert ( "name space not exists" + NS) ;reeturn -1;}  
     //else 
     try { 
     var ki = this.findWord(W);
     if (ki >= 0) {
	 //first we put the word in NS ns entry
	 (this.NS[ns]).push(ki);
	 var xn = this.finddotidObj(ns) ;
	 xn[W] = new Object();
	 xn[W].name= W;
	 xn[W].cue=ns;
	 //also we need to update entry  aginst w for ns it belongs to
	 
 
      } }
	 catch(err) { 
     alert("word adding to " + NS + ":" + W + "failed"+ err.message);
	 return -2;
	 }
     return 0; }
	 

 
WWW.prototype.toLi = function() {
//alert("checking if exists");
//improve this - bring binary search
var listr="";
for(var i = 0; i < this.length; i++) {
  listr = listr + "<li>" + this[i] + "</li>"
   
							}

return listr;
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
o = o.replace(/\s{1,}/g, '_' );
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
 
 } 
 //for functions we place a restriction that only  a cue object can be passed as parameter
 
 if (match == 0 )
 { this[le] =  {entry:entry,count:1};return 1;}
 } //start with non 0 length
 }
 //


 


 