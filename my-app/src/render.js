const {BrowserWindow} = require('electron').remote
const fs = require("fs"); 
const { type } = require('os');
var tableID = 0;
var gestures = ["ONE","TWO", "THREE", "FOUR","FIST","OK","YEAH","ROCK","SPIDERMAN","Slide_left","Slide_right","Scrolling_up","Scrolling_down","Voice"]
var action_type = ["Open Terminal","Text to speech","Switch desktop"]

window.onload = function(){
    $('.message .close')
    .on('click', function() {
        $(this).closest('.message').transition('fade');
    });
    $('.ui.dropdown').dropdown();
    let add_button = document.getElementById("add");
    let save_button = document.getElementById("save");
    add_button.addEventListener('click',event=>{
      tableID += 1;
      create_table_entry();
      document.getElementById("actionChoice"+tableID.toString()).onchange = (event)=>{
        if($("#actionChoice" + tableID.toString()).val() == "Switch desktop" || $("#actionChoice" + tableID.toString()).val() == "Text to speech"){
          if(document.getElementById("textresponse" + tableID.toString()) != null){
            document.getElementById("container"+tableID.toString()).removeChild(document.getElementById("textresponse" + tableID.toString()))
          }
        let  formNode = addElement(document.getElementById("container"+tableID.toString()),"div","ui disabled form","textresponse" + tableID.toString(),null,null,null,null)
        let childNode = addElement(formNode,"div","field",null,null,null,null,null);
        if($("#actionChoice" + tableID.toString()).val() == "Text to speech"){
          addElement(childNode,"label",null,null,"Text to speech command",null,null,null);
        }
        else{
          addElement(childNode,"label",null,null,"Desktop number to switch to",null,null,null);
        }
          addElement(childNode,"input",null,null,null,null,null,"text")
        }
        else{ 
          if(document.getElementById("textresponse" + tableID.toString()) != null){
            document.getElementById("container"+tableID.toString()).removeChild(document.getElementById("textresponse" + tableID.toString()))
          }
        }
      };
    });
    save_button.addEventListener('click',(event)=>{
      build_json()
    });
}


function create_table_entry(){
   let current_node = document.body;
   current_node = addElement(current_node,"div","ui container","container" + tableID.toString(),null,null,null,null);
   let childNode = addElement(current_node,"div","ui floating labeled icon dropdown button","action" + tableID.toString(), null,null,null,null); 
    addElement(childNode,"i","add user icon",null,null,null,null,null);
    addElement(childNode,"span","text",null,"Add action",null,null,null);
    childNode = addElement(childNode,"div","menu","actionMenu" + tableID.toString(),null,null,null,null);
    addElement(childNode,"div","header",null,"Gesture or Voice Command selection",null,null,null);
    let i = 0
    for(i; i < gestures.length;i++){
        addElement(addElement(childNode,"div","item",i,gestures[i],gestures[i],null,null),"img","ui image",gestures[i],null,null,"One.jpg",null)
    }
    let formNode = addElement(current_node,"div","ui disabled form","command" + tableID.toString(),null,null,null,null);
    childNode = addElement(formNode,"div","field",null,null,null,null,null);
    addElement(childNode,"label",null,null,"Voice Command Keyword(s)",null,null,null);
    addElement(childNode,"input",null,null,null,null,null,"text")
    childNode = addElement(current_node,"select","ui dropdown",id="actionChoice" + tableID.toString(),null,null,null,null)
    for(let i=0; i<action_type.length;i++){
        addElement(childNode,"option",null,i,action_type[i],action_type[i], null,null);
    }
    $('.ui.dropdown').dropdown();
}
function addElement(current_node,tag_type,className=null,id=null,innerHTML=null,
                    nodeValue=null,src=null,nodeType=null){
    let newNode = document.createElement(tag_type);
    if(id != null){
        newNode.id = id;
    }
    if(className != null){
        newNode.className = className;
    }
    if(innerHTML != null){
        newNode.innerHTML = innerHTML;
    }
    if(nodeValue != null){
        newNode.nodeValue = nodeValue;
    }
    if(src !=null){
        newNode.src = src;
    }
    if(nodeType != null){
        newNode.nodeType = nodeType;
    }
    current_node.appendChild(newNode)
    return newNode
}
function build_json(){
  let i = 1;
  let input_type;
  let metadata = "";
  
  for(i;i<=tableID;i++){//console.log((document.querySelector('.item.active.selected').childNodes[1].id))
      //console.log(gestures[1].toString())
      let gesture = document.querySelector('.item.active.selected').childNodes[1].id
    if(gestures.includes( gestures) && gesture != "Voice"){
      input_type = "GESTURE"
      input = document.querySelector('.item.active.selected').childNodes[1].id
    }
    else{
      input_type = "VOICE"
      console.log(document.querySelector("#command"+i).input)
      input = document.querySelector("#command"+i).nodeValue
    }
    possibleActions = $("#actionChoice"+i).val()
    if(possibleActions == action_type[2] || possibleActions == action_type[1]){
      metadata = $("#textresponse"+i).val()
    }
      let data = {
        input_type: input_type,
        input: input,
        action_type: possibleActions
      }
      if(metadata != ""){
        data.action_data = metadata;
      }
      fs.open("test.json",'w', err => { 
     
        // Checking for errors 
        if (err) throw err;  
       
        console.log("Done openning"); // Success 
    });
      fs.writeFile("test.json", JSON.stringify(data), err => { 
     
        // Checking for errors 
        if (err) throw err;  
       
        console.log("Done writing"); // Success 
    });
  }
}