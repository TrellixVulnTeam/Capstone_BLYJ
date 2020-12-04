const fs = require("fs"); 
const { type } = require('os');
var tableID = 0;
var gestures = ["ONE","TWO", "THREE", "FOUR","FIST","OK","YEAH","ROCK","SPIDERMAN","Slide_left","Slide_right","Scrolling_up","Scrolling_down","Voice"]
var action_type = ["Email","OPEN_TERMINAL", "Text to speech","Switch desktop","Type","HOTKEY"]
var voice_actors = ["Arnold Schwarzenegger","Bob Barker","Tucker Carlson"]
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
         let action_choice = $("#actionChoice" + tableID.toString()).val()
          for(let i = 0;i<action_type.length;i++){
      //      console.log(document.getElementById(action_type[i] + tableID.toString()))
            if(document.getElementById(action_type[i] + "Form" + tableID.toString()) !=null){
              document.getElementById("container"+tableID.toString()).removeChild(document.getElementById(action_type[i] + "Form" + tableID.toString()))
            }
            if(document.getElementById("dropDown" + action_type[2] + tableID.toString()) !=null){
              document.getElementById("container"+tableID.toString()).removeChild(document.getElementById("dropDown"+action_type[2] + tableID.toString()))

            }
          }
          if(action_choice == action_type[2]){
            let  formNode = addElement(document.getElementById("container"+tableID.toString()),"div","ui form",action_choice + "Form" + tableID.toString(),null,null,null,null)
            let childNode = addElement(formNode,"div","field",null,null,null,null,null);
            addElement(childNode,"label",null,null,action_choice,null,null,null);
            addElement(childNode,"input",null,action_choice + tableID.toString(),null,null,null,"text")
            let dropdownNode = addElement(document.getElementById("container"+tableID.toString()),"select","ui dropdown","dropDown" + action_choice + tableID.toString(),null,null,null,null)
            for(let i=0; i<voice_actors.length;i++){
              addElement(dropdownNode,"option",null,i,voice_actors[i],voice_actors[i],null,null)
            }
          }
          else if(action_type.includes(action_choice,3)  ){

          let  formNode = addElement(document.getElementById("container"+tableID.toString()),"div","ui form",action_choice + "Form" + tableID.toString(),null,null,null,null)
          let childNode = addElement(formNode,"div","field",null,null,null,null,null);
          console.log(tableID)
          addElement(childNode,"label",null,null,action_choice,null,null,null);
          addElement(childNode,"input",null,action_choice + tableID.toString(),null,null,null,"text")
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
    let formNode = addElement(current_node,"div","ui  form",null,null,null,null,null);
    childNode = addElement(formNode,"div","field",null,null,null,null,null);
    addElement(childNode,"label",null,null,"Voice Command Keyword(s)",null,null,null);
    addElement(childNode,"input",null,"command" + tableID.toString(), null,null,null,"text")
    childNode = addElement(current_node,"select","ui dropdown",id="actionChoice" + tableID.toString(),null,null,null,null)
    for(let i=0; i<action_type.length;i++){
        addElement(childNode,"option",null,i,action_type[i],action_type[i], null,null);
    }
    $('.ui.dropdown').dropdown();
    //Change: Creating Remove button  
    let butNode = addElement(current_node,"BUTTON","ui icon red button",tableID.toString(),null,null,null,null);
    childNode = addElement(butNode,"i","minus circle icon",null,null,null,null,null);
    
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
        newNode.type = nodeType;
    }

    //Change: Remove button function
    if(tag_type=="BUTTON"){
      newNode.addEventListener('click',(event)=>{
        var node = document.getElementById("container"+id);
        node.remove()
      });
    }
    current_node.appendChild(newNode)
    return newNode
}
function build_json(){
  let i = 1;
  let input_type;
  let metadata = "";
  let data = []
  for(i;i<=tableID;i++){//console.log((document.querySelector('.item.active.selected').childNodes[1].id))
      //console.log(gestures[1].toString())
      let input = document.querySelector('.item.active.selected').childNodes[1].id
      let voice_data = null;
      if(input == "Voice"){
        voice_data = document.querySelector("#command"+i).value
      }
      let input_data = {Voice_input: voice_data}

  
    possibleActions = $("#actionChoice"+i).val()
    let type_text = null;
    let tts_speaker = null;
    let tts_text = null 
    if(possibleActions == action_type[2]){
      tts_text = document.getElementById(possibleActions+i).value
      let speakers = document.getElementById("dropDown" + action_type[2] + i)
      tts_speaker =  speakers.options[speakers.selectedIndex].text
      console.log( )
    }
    else if(action_type.includes(possibleActions,3)){
      type_text = document.getElementById(possibleActions+i).value
    }
      let query = {
        input: input,
        input_data: input_data,
        action: possibleActions,
        action_data: {
          type_text: type_text,
          tts_speaker: tts_speaker,
          tts_text: tts_text
        }
      }
      data.push(query);

  }
  fs.open("test.json",'w', err => { 
     
    // Checking for errors 
    if (err) throw err;  
   
    console.log("Done opening"); // Success 
});
  fs.writeFile("config.json", JSON.stringify(data), err => { 
 
    // Checking for errors 
    if (err) throw err;  
   
    console.log("Done writing"); // Success 
});
}
