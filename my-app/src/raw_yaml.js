const OneBtn = document.getElementById('editOne')
const fs = require('fs');
const yaml = require('js-yaml');
const path = require('path')
const { exec } = require('child_process');
const TwoBtn = document.getElementById('editTwo')
const ThreeBtn = document.getElementById('editThree')
const FourBtn = document.getElementById('bt4')
const FistBtn = document.getElementById('bt5')
const OkBtn = document.getElementById('bt6')
const YeahBtn = document.getElementById('bt7')
const RockBtn = document.getElementById('bt8')
const ManBtn = document.getElementById('bt9')
const LeftBtn = document.getElementById('bt10')
const RightBtn = document.getElementById('bt11')
const UpBtn = document.getElementById('bt12')
const DownBtn = document.getElementById('bt13')
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

let fileContents = fs.readFileSync('configuration.yml');
let data = yaml.load(fileContents);
document.getElementById('one').textContent=Object.getOwnPropertyNames(data)[0]; 
console.log(Object.values(data)[0]);
if(Object.values(data)[0] == null){
    document.getElementById('act_one').textContent= "Undecided";
}
else{
    document.getElementById('act_one').textContent=(Object.values(data)[0]);
}

document.getElementById('two').textContent=Object.getOwnPropertyNames(data)[1]; 
if(Object.values(data)[1] == null){
    document.getElementById('act_two').textContent= "Undecided";
}
else{
    document.getElementById('act_two').textContent=(Object.values(data)[1]);
}

document.getElementById('three').textContent=Object.getOwnPropertyNames(data)[2]; 
if(Object.values(data)[2] == null){
    document.getElementById('act_three').textContent= "Undecided";
}
else{
    document.getElementById('act_three').textContent=(Object.values(data)[2]);
}

document.getElementById('four').textContent=Object.getOwnPropertyNames(data)[3]; 
if(Object.values(data)[3] == null){
    document.getElementById('act_four').textContent= "Undecided";
}
else{
    document.getElementById('act_four').textContent=(Object.values(data)[3]);
}

document.getElementById('fist').textContent=Object.getOwnPropertyNames(data)[4]; 
if(Object.values(data)[4] == null){
    document.getElementById('act_fist').textContent= "Undecided";
}
else{
    document.getElementById('act_fist').textContent=(Object.values(data)[4]);
}

document.getElementById('ok').textContent=Object.getOwnPropertyNames(data)[5]; 
if(Object.values(data)[5] == null){
    document.getElementById('act_ok').textContent= "Undecided";
}
else{
    document.getElementById('act_ok').textContent=(Object.values(data)[5]);
}

document.getElementById('yeah').textContent=Object.getOwnPropertyNames(data)[6]; 
if(Object.values(data)[6] == null){
    document.getElementById('act_yeah').textContent= "Undecided";
}
else{
    document.getElementById('act_yeah').textContent=(Object.values(data)[6]);
}

document.getElementById('rock').textContent=Object.getOwnPropertyNames(data)[7]; 
if(Object.values(data)[7] == null){
    document.getElementById('act_rock').textContent= "Undecided";
}
else{
    document.getElementById('act_rock').textContent=(Object.values(data)[7]);
}


document.getElementById('man').textContent=Object.getOwnPropertyNames(data)[8]; 
if(Object.values(data)[8] == null){
    document.getElementById('act_man').textContent= "Undecided";
}
else{
    document.getElementById('act_man').textContent=(Object.values(data)[8]);
}

document.getElementById('left').textContent=Object.getOwnPropertyNames(data)[9]; 
if(Object.values(data)[9] == null){
    document.getElementById('act_left').textContent= "Undecided";
}
else{
    document.getElementById('act_left').textContent=(Object.values(data)[9]);
}

document.getElementById('right').textContent=Object.getOwnPropertyNames(data)[10]; 
if(Object.values(data)[10] == null){
    document.getElementById('act_right').textContent= "Undecided";
}
else{
    document.getElementById('act_right').textContent=(Object.values(data)[10]);
}

document.getElementById('up').textContent=Object.getOwnPropertyNames(data)[11]; 
if(Object.values(data)[11] == null){
    document.getElementById('act_up').textContent= "Undecided";
}
else{
    document.getElementById('act_up').textContent=(Object.values(data)[11]);
}

document.getElementById('down').textContent=Object.getOwnPropertyNames(data)[12]; 
if(Object.values(data)[12] == null){
    document.getElementById('act_down').textContent= "Undecided";
}
else{
    document.getElementById('act_down').textContent=(Object.values(data)[12]);
}





OneBtn.addEventListener('click', (event) => {
    var input = document.getElementById("editO").value;
    alert(input);
    console.log(input)
    data.ONE= input;

    let yamlStr = yaml.safeDump(data);
    fs.writeFileSync('configuration.yml', yamlStr);
  })
  

// function editOne() {
    
//     var input = document.getElementById("editO").value;
//     alert(input);
//     console.log(input)
//     data.ONE= input;

//     let yamlStr = yaml.safeDump(data);
//     fs.writeFileSync('configuration.yml', yamlStr);
// }


TwoBtn.addEventListener('click', (event) => {
    var input = document.getElementById("edit2").value;
    alert(input);
    console.log(input)
    data.TWO= input;
    let yamlStr = yaml.safeDump(data);
    fs.writeFileSync('configuration.yml', yamlStr);
  })


ThreeBtn.addEventListener('click', (event) => {
    var input = document.getElementById("edit3").value;
    alert(input);
    console.log(input)
    data.THREE= input;

    let yamlStr = yaml.safeDump(data);
    fs.writeFileSync('configuration.yml', yamlStr);
  }) 

FourBtn.addEventListener('click', (event) => {
    var input = document.getElementById("edit4").value;
    alert(input);
    console.log(input)
    data.FOUR= input;

    let yamlStr = yaml.safeDump(data);
    fs.writeFileSync('configuration.yml', yamlStr);
  }) 

FistBtn.addEventListener('click', (event) => {
    var input = document.getElementById("edit5").value;
    alert(input);
    console.log(input)
    data.FIST= input;

    let yamlStr = yaml.safeDump(data);
    fs.writeFileSync('configuration.yml', yamlStr);
  })  


OkBtn.addEventListener('click', (event) => {
    var input = document.getElementById("edit6").value;
    alert(input);
    console.log(input)
    data.OK= input;

    let yamlStr = yaml.safeDump(data);
    fs.writeFileSync('configuration.yml', yamlStr);
  })  

YeahBtn.addEventListener('click', (event) => {
    var input = document.getElementById("edit7").value;
    alert(input);
    console.log(input)
    data.YEAH= input;

    let yamlStr = yaml.safeDump(data);
    fs.writeFileSync('configuration.yml', yamlStr);
  })  


RockBtn.addEventListener('click', (event) => {
    var input = document.getElementById("edit8").value;
    alert(input);
    console.log(input)
    data.ROCK= input;

    let yamlStr = yaml.safeDump(data);
    fs.writeFileSync('configuration.yml', yamlStr);
  })  

ManBtn.addEventListener('click', (event) => {
    var input = document.getElementById("edit9").value;
    alert(input);
    console.log(input)
    data.SPIDERMAN= input;

    let yamlStr = yaml.safeDump(data);
    fs.writeFileSync('configuration.yml', yamlStr);
  })  

LeftBtn.addEventListener('click', (event) => {
    var input = document.getElementById("edit10").value;
    alert(input);
    console.log(input)
    data.Slide_left= input;

    let yamlStr = yaml.safeDump(data);
    fs.writeFileSync('configuration.yml', yamlStr);
  })  

RightBtn.addEventListener('click', (event) => {
    var input = document.getElementById("edit11").value;
    alert(input);
    console.log(input)
    data.Slide_right= input;

    let yamlStr = yaml.safeDump(data);
    fs.writeFileSync('configuration.yml', yamlStr);
  })  

UpBtn.addEventListener('click', (event) => {
    var input = document.getElementById("edit12").value;
    alert(input);
    console.log(input)
    data.Scrolling_up= input;

    let yamlStr = yaml.safeDump(data);
    fs.writeFileSync('configuration.yml', yamlStr);
  })  

DownBtn.addEventListener('click', (event) => {
    var input = document.getElementById("edit13").value;
    alert(input);
    console.log(input)
    data.Scrolling_down= input;

    let yamlStr = yaml.safeDump(data);
    fs.writeFileSync('configuration.yml', yamlStr);
  })  

function runFile(){
    exec('python hello.py', (error, stdout, stderr) => {
        if (error) {
          console.error(`exec error: ${error}`);
          return;
        }
        console.log(`stdout: ${stdout}`);
    });

}