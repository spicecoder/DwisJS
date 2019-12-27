 //modifications needed : all functions are www prototype;
 //cue space is conceptual space 
 //cue is object
 //cueprint is a string
 //every word has a cue
 //every word has a name
 //make properties explicit in WWW
 //draw connection between properties and functions
 //all variable declared within WWW can have function attached through prototypes and value et in the WWW name space
 //www can have an object called workspace

 
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
 
 } 
 //for functions we place a restriction that only  a cue object can be passed as parameter
 
 if (match == 0 )
 { this[le] =  {entry:entry,count:1};return 1;}
 } //start with non 0 length
 }
 //
//WWW defined
//WWW functions only take cue object ; cueprint  is dot seperated name
 function WWW(root) { 
var inr = root; 
 if (typeof root   != 'undefined')
 {this.root  = new Object();
 
 this.droot = this.root;
  }
  else {this.droot=this ; }
 
 this.droot = this.makeCue(this.droot,"starter","self","none",inr);
 
 alert ("root set:" + this.droot.cuename);
 //this.droot is starter cue, with root as self, parent as none,cutepath being blank
  
 }
 
 //   every cue has :
 //1. name
 //2. pointer to root
// 3. pointer to parent
// 4.place holder for cuepath
// 5. cuepath as a string  .
 // makeCue is  same as making an word object
 //however Cue exposes a rich set of operation on object properties which reflects characteristic of Cue concept
 // Cue works on names , not Cuepaths hence word names are important and it works the same accoss all Cue paths or contexts:
 //basicaly if Cue recognises that two name of object properties are same then it will work on those properties of the supplied objects
 // and it gives you the option of excluding any name you supply in an exclusion array.
 //thu Cue algebra takes one or more cue  objects creates  a single array of name valuealgebra on the convention of names in the cue objects 
 //e.g add can be op1 and op2 ....this will be formalised ...they will look like Cue.prototype.flow ,fanin,fanout,navigate  etc to be done in second iteration
 
 function Cue(obj,cuename,root,parent,cuepath) { if (typeof obj   != 'undefined'){var ob = new Object();}
                                                                         else { var ob = obj; }
                                                                    ;ob.cuepath = cuepath; // a string 
																	ob.parent = parent;     //a pointer
																	ob.root = root;         // a pointer 
																	ob.cuename = cuename;    //cue or word name
																	return ob;   }
 
 
  WWW.prototype.makeCue = function ( obj,cuename,root,parent,cuepath) { 
                                                                       var r = new Cue( obj,cuename,root,parent,cuepath);
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
 WWW.prototype.metaWords = new Object();
 WWW.prototype.metaWords.words = new Array(); //holds word names
 WWW.prototype.metaWords.desc  = new Array(); //holds word descriptions
 WWW.prototype.metaWords.wid   = 0 ;          // current word pointer
 //addEntry would create a vecor against an entry /word ; not currently used
 
 WWW.prototype.addEntry = function (anArray,ent, o) {
     if (typeof (anArray[ent]) !== 'undefined') {
         var clist = anArray[ent];
         clist = clist + '$]' + o;
         anArray[ent] = clist;
         //alert("expanded" +ent +":"+o);
     } else {
         anArray[ent] = o + '$]';
     }
     return 0;
 }
WWW.prototype.findEntry= function(anArray,ent,o) { 
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
     wid = this.anArray.length - 1;

     return wid;
 }
 //exists check if a word exists in the dictionary
 
 WWW.prototype.exists = function (anArray,o) {
    // alert("in exists")
     o = o.replace(/\s{2,}/g, '_');
     for (var i = 0; i < anArray.length; i++) {
        // alert("current w:" + metaWords[i] + "supp" + o);
         if (anArray[i] == o) {
             //alert("exists!" + i);
             wid = i;
             return i;
         }
     }

     return -1;
 }

 //addword  adds the word to metawords ,an Object arry [i.e the object has an arry property, metawords stores a description about the word ,reason for array is it gives an id for the word
 //in the form of index in the array,thus metawords.words and metawords.desc are two arrays keeping the words and their corresponding descriptions together
 
 WWW.prototype.addWord = function (txt, desc) {
     //alert("in add:" + txt);
     txt = txt.replace(/\s{2,}/g, '_');
     txt = txt.replace(/ /g, "_");
     var c = this.exists(txt);
     if (c >= 0) {
         //alert("word exists" + c);
         return -1;
     } else {
         //alert("going in");
       this.wid =  this.insert(txt);
	   if (desc != 'undefined') {
         var ds = "des" + this.wid;
     //    var du = "uid" + this.wid;
         this[ds] = desc; }
         //we add a word object with the root cue
     }
 }
 //addWordwuid will add a creator  user id against a word a;ong with the description
 WWW.prototype.addWordwuid = function (txt, desc, uid) {
     //alert("in add:" + txt);
     txt = txt.replace(/\s{2,}/g, '_');
     txt = txt.replace(/ /g, "_");
     var c = this.exists(txt);
     if (c >= 0) {
         //alert("word exists" + c);
         return -1;
     } else {
         //alert("going in");
         this.insert(txt);
         var ds = "des" + this.wid;
         var du = "uid" + this.wid;
         this[ds] = desc;
         this[du] = uid;
//alert("set" + ds + "for" + this[ds]);
     }
 }
 //findWord finds a word in the dictionary
 WWW.prototype.findWord = function (txt) {
    // alert("in find:" + txt);
     txt = txt.replace(/\s{2,}/g, '_');
     txt = txt.replace(/ /g, "_");
     var c = this.exists(txt);
     if (c >= 0) {
       //  alert("word exists" + c);
         return c;
     } else {
         return -1;
     }
 };
 //getword is getting the description of a word from WWW
 WWW.prototype.getWord = function (txt) {
     //alert("in get:" + txt);
     txt = txt.replace(/\s{2,}/g, '_');
     txt = txt.replace(/ /g, "_");
     var c = this.exists(txt);
     if (c >= 0) {
        // alert("word exists" + c);
         return this["des" + c];
     } else {
         return -1;;
     }
 }
 //makeNameSpace takes a word that exists in the metadictionary and creates the first level name space like WWW.w 
 WWW.prototype.makeNameSpace = function (w) { //first locate word in root namespace[metadictionary]; then create namespace root.w if that does not exist
 //for namespace we retain word without getting id
     //alert("in makens");
     var ii = this.findWord(w);
     if (ii >= 0) {
         if (typeof (this[this.droot ][ w]) == 'undefined') {
		     
		     this.NS[this.droot +NSS + w] = new Array();
			// this.addWord(droot+NSS+w); ;
             this[this.droot] [w] = new Object();
             this[this.droot ][ w][0] = this.droot + "." + w ;
			// var nsv = this.droot [w];
           //   alert("ns formed" + ii + nsv[0]);
             return 0;
         } else {
             return -1;
         }

     }
     return -2;
 }
 //extendNameSpace is for attaching one extra word at the end of a series of dot seperated words ,acting like name space.
 //general rule : make /extend NS : create a new object as object property; make an entry in ns list property of root
 // to add word to NS , add the wordid property to NS object - it can have its value - so we can list words in ns
 //what weare doing is bring ability in functions to addres the whole domain and compute by careful picking of which particular word to get involved
 //it is as it the wohole world is our there but we pick little things ,modify them and pit it back in their own place and life continues;
 //it is just we have the option to leave our signature when we modify
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


 //function listWords() lists words in Meta dictionary : return JSON Object with words as names and id as values;
 WWW.prototype.listWords = function () {
     return ArrayToJSONString(this.metaWords);
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
 WWW.prototype.listWordsNS = function (NS) {
     //first check if NS is created property ; before that NS need to be tranlated to dot seperated ids.
	 var dotids = this.finddotidObj(NS);
	 //alert("listwords in doted ids:" + dotids);
     if (typeof (dotids) == 'undefined') {
         alert("name space not exists" + NS);
         reeturn - 1;
     } else {
	    // alert (" in wl");
        // var wl = this[dotids];
		// alert (" in wl" + wl.length);
          for (var ww in dotids) { 
		  alert ("words:" + ww ); 
		  }
     }
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


 