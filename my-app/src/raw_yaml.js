const fs = require('fs');
const yaml = require('js-yaml');
const path = require('path')
const { exec } = require('child_process');
const addBtn = document.getElementById("add");

var gesture = [] //A array to save all of gesture reading from the yml file
 // A array to check if the gesture has been assigned the action
var actions = ["First Page","UP","DOWN","GO"] //An array to save all of the action we can provide to user
var check_a = new Array(14).fill(0);  //An array to check if the action has been assigned to the user 

// const Btn = document.getelementbtu
// let fileContents = fs.readFileSync("configuration.yml");
// let data = yaml.load(fileContents);
// // document.getElementById("text").innerHTML = data.toString;
// console.log(Object.getOwnPropertyNames(data));
// console.log(Object.values(data));




// txtBtn.addEventListener('click', (event) => {
//     //const modalPath = path.join('configuration.yml')
//     //console.log(process.cwd());
//     let fileContents = fs.readFileSync('configuration.yml');
//     let data = yaml.load(fileContents);
//     document.getElementById('one').textContent=Object.getOwnPropertyNames(data)[0]; 
//     console.log(Object.values(data)[0]);
//     if(Object.values(data)[0] == null){
//         document.getElementById('act_one').textContent= "Undecided";
//     }
//     else{
//         document.getElementById('act_one').textContent=(Object.values(data)[0]);
//     }
    
    
// })

console.log(check_g[1]);
let fileContents = fs.readFileSync('configuration.yml');
let data = yaml.load(fileContents);

for(var i = 0; i < Object.keys(data).length; i++){
    gesture.push(Object.getOwnPropertyNames(data)[i]);
    console.log(gesture[i]);
}
var check_g = new Array(gesture.length).fill(0); 

addBtn.addEventListener('click', (event) => {

    var x = document.createElement("SELECT");
    x.setAttribute("id", "mySelect");
    document.body.appendChild(x);

    for(var i = 0; i < gesture.length;++i){
        if(check_g[i] == 0){
            var option = document.createElement("option");
            option.text = gesture[i];
            x.add(option);
        }
        
    }

    var y = document.createElement("SELECT");
    y.setAttribute("id", "mySelect1");
    document.body.appendChild(y);

    for(var i = 0; i < actions.length;++i){
        if(check_a[i] == 0){
            var option1 = document.createElement("option");
            option1.text = actions[i];
            y.add(option1);
        }
        
    }

    var x1 = document.createElement("BUTTON");
    var t = document.createTextNode("EDIT");
    x1.setAttribute("id", "button1");
    x1.appendChild(t);
    document.body.appendChild(x1);
    const Btn1 = document.getElementById("button1");
    Btn1.addEventListener('click', (event) => {
        var e = document.getElementById("mySelect");
        var strUser = e.value;
        var e1 = document.getElementById("mySelect1");
        var strUser1 = e1.value;
        console.log(strUser);
        console.log(strUser1);
        check_g[gesture.indexOf(strUser)] = 1;
        data.ONE= null;

        let yamlStr = yaml.safeDump(data);
        fs.writeFileSync('configuration.yml', yamlStr);
    }) 
  }) 


  

// function editOne() {
    
//     var input = document.getElementById("editO").value;
//     alert(input);
//     console.log(input)
//     data.ONE= input;

//     let yamlStr = yaml.safeDump(data);
//     fs.writeFileSync('configuration.yml', yamlStr);
// }



function runFile(){
    exec('python hello.py', (error, stdout, stderr) => {
        if (error) {
          console.error(`exec error: ${error}`);
          return;
        }
        console.log(`stdout: ${stdout}`);
    });

}