var tableID = 0;

window.onload = function(){
    $('.message .close')
    .on('click', function() {
        $(this).closest('.message').transition('fade');
    });
    $('.ui.dropdown').dropdown();

    let add_button = document.getElementById("add");
    let save_button = document.getElementById("save");
    add_button.addEventListener('click',event=>{
        create_table_entry();
    });
}
function create_table_entry(){
    let current_node = document.body;
    tableID += 1;
    current_node = addElement(current_node,"div","ui container","container" + tableID.toString(),null,null,null,null);
  //  let newNode = document.createElement("div");
   // newNode.className = "ui container"
   // newNode.id = tableID.toString();
   // current_node.append(newNode);
   // current_node = newNode;
   let childNode = addElement(current_node,"div","ui floating labeled icon dropdown button","action" + tableID.toString(), null,null,null,null); 
  //let container = current_node;
   // newNode = document.createElement("div");
    //newNode.className = "ui floating labeled icon dropdown button";
    //newNode.id = "action" + tableID.toString();
    //current_node.appendChild(newNode);
    addElement(childNode,"i","add user icon",null,null,null,null,null);
  //  let sub_node = document.createElement("i");
   // sub_node.className = "add user icon"
   // newNode.appendChild(sub_node);
    addElement(childNode,"span","text",null,"Add action",null,null,null);
    childNode = addElement(childNode,"div","menu","actionMenu" + tableID.toString(),null,null,null,null);
    addElement(childNode,"div","header",null,"Gesture or Voice Command selection",null,null,null);
    
   // sub_node = document.createElement("span");
   // sub_node.className = "text";
   // sub_node.innerHTML = "Add action"
   // newNode.appendChild(sub_node);
   // current_node = newNode;
   // newNode = document.createElement("div");
   // newNode.className = "menu";
   // current_node.appendChild(newNode);
   // sub_node = document.createElement("div");
    //sub_node.className = "header";
    //sub_node.innerHTML = "Gesture or Voice Command selection"
    //newNode.appendChild(sub_node);
    let i = 0
    let A = ["dummy choice 1","dummy choice 2", "dummy choice 3"]
    for(i; i < A.length;i++){
        addElement(addElement(childNode,"div","item",i,A[i],A[i],null,null),"img","ui image","One.jpg",null,null,"One.jpg",null)
        // sub_node = document.createElement("div")
       // sub_node.className = "item";
       // sub_node.id = i
       // sub_node.nodeValue = A[i]
       // sub_node.innerHTML = A[i]
       // newNode.appendChild(sub_node)
        //let option = document.createElement("img");
       // option.className = "ui image";
       // option.src = "One.jpg"
       // sub_node.appendChild(option)
    }
    let formNode = addElement(current_node,"div","ui disabled form","command" + tableID.toString(),null,null,null,null);
    childNode = addElement(formNode,"div","field",null,null,null,null,null);
    addElement(childNode,"label",null,null,"Voice Command Keyword(s)",null,null,null);
    addElement(childNode,"input",null,null,null,null,null,"text")
    childNode = addElement(current_node,"select","ui dropdown",id="actionChoice" + tableID.toString(),null,null,null,null)
    A = ["option1","option2","option3"]
    for(let i=0; i<A.length;i++){
        addElement(childNode,"option",null,i,A[i],A[i], null,null);
    }
    $('#actionChoice1 > option').each(function(){
        if($(this).val() == "dede") {console.log("we did it")};//$(this).parent('select').val($(this).val())
      })
    //Now create the form();
    //let formNode = document.createElement('div')
    //formNode.className = "ui disabled form"
   // formNode.id = "command" + tableID.toString();
    //container.appendChild(formNode);
    //sub_node = document.createElement('div');
    //sub_node.className = 'field';
    //formNode.appendChild(sub_node);
    //newNode = document.createElement('label');
    //newNode.innerHTML = "Voice Command Keyword(s)";
    //sub_node.appendChild(newNode);
   // newNode = document.createElement('input');
   // newNode.nodeType = "Text";
   // sub_node.appendChild(newNode)
      console.log("hello")
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
$('#actionChoice1 > option').each(function(){
    if($(this).val()== A[0]) console.log("we did it");//$(this).parent('select').val($(this).val())
  })