// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

// Imports
const fs = require('fs');
const { config } = require('process');

// Constants
const addBtn = document.getElementById("addbtn");
const saveBtn = document.getElementById("savebtn");
const cardContainer = document.getElementById("cardcontainer");
const cardString = String.raw` <div class="card"> <div class="content"> <span class="left floated"> Input: &nbsp; <div class="ui dropdown inputselector"> <div class="text"></div><i class="dropdown icon"></i> </div></span> <span class="right floated"> Action: &nbsp; <div class="ui dropdown actionselector"> <div class="text"></div><i class="dropdown icon"></i> </div></span> </div></div>`;
const gestures = [
    {name: 'Five', value: 'FIVE'},
    {name: 'Four', value: 'FOUR'},
    {name: 'Three', value: 'THREE'},
    {name: 'Two', value: 'TWO'},
    {name: 'One', value: 'ONE'},
    {name: 'Yeah', value: 'YEAH'},
    {name: 'Rock', value: 'ROCK'},
    {name: 'Spiderman', value: 'SPIDERMAN'},
    {name: 'Fist', value: 'FIST'},
    {name: 'Ok', value: 'OK'},
    // TODO: Add the swipe gestures & Voice input.
];
const actions = [
    {name: 'Type Copypasta', value: 'TYPE_STARWARS'},
    {name: 'Open Task Manager', value: 'OPEN_TERMINAL'},
    // TODO: Actually add some of the real actions haha
];

// Button actions
addBtn.onclick = () => {
    // Insert the card into the container.
    const card = $(cardString).appendTo(cardContainer);
    // Now initialize the dropdown menus in the card we just added.
    card.find(".ui.dropdown.inputselector").dropdown({
        values: gestures,
        placeholder: "Select an input",
    });
    card.find(".ui.dropdown.actionselector").dropdown({
        values: actions,
        placeholder: "Select an action",
    });
    // Scroll the card into view. 
    // This array notation is used to get the HTMLelement from the Jquery object.
    card[0].scrollIntoView();
};

saveBtn.onclick = () => {
    // Traverse all of the completely filled in entires and save them to a JSON file.
    config_entries = []
    $(".card > .content").each((index, element) => {
        // Verify that both entires are filled in.
        // See here for other behaviors you can call like this:
        // https://semantic-ui.com/modules/dropdown.html#/usage
        const vals = $(element).find(".ui.dropdown").dropdown('get value');
        if (vals.every((string) => string !== "")) {
            config_entries.push({
                input_type: "GESTURE",
                input: vals[0],
                action_type: vals[1],
                // action_data: {},
            });
        }
    });
    console.log(config_entries);
    fs.writeFileSync("config.json", JSON.stringify(config_entries));
};

// --------------------------------------------------


// Load current mappings from the config file
// TODO

// Populate & Animate all input selection dropdowns.
$('.ui.dropdown.inputselector').dropdown({
    values: gestures,
    placeholder: "Select an input",
});

// Populate & Animate all action selection dropdowns.
$('.ui.dropdown.actionselector').dropdown({
    values: actions,
    placeholder: "Select an action",
});