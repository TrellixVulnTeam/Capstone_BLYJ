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
const cardString = String.raw`<div class="card"> <div class="content"> <span class="left floated"> Input: &nbsp; <div class="ui dropdown inputselector"> <div class="text"></div><i class="dropdown icon"></i> </div></span> <span class="right floated"> Action: &nbsp; <div class="ui dropdown actionselector"> <div class="text"></div><i class="dropdown icon"></i> </div></span> </div><div class="extra content voicecontent"> <div class="ui input left icon fluid voiceinput"> <i class="microphone icon"></i> <input type="text" placeholder="Voice Recognition Text"> </div></div><div class="extra content ttscontent"> <div class="ui dropdown selection ttsspeakerselector"> <div class="text"></div><i class="dropdown icon"></i> </div>&nbsp; <b>Says:</b> &nbsp; <div class="ui input left icon ttsinput"> <i class="volume up icon"></i> <input type="text" placeholder="TTS Text"> </div></div><div class="extra content commandcontent"> <div class="ui input left icon fluid commandinput"> <i class="play icon"></i> <input type="text" placeholder="Shell Command"> </div></div><div class="extra content typecontent"> <div class="ui input left icon fluid typeinput"> <i class="edit icon"></i> <input type="text" placeholder="Text to type"> </div></div>`;
const inputs = [
    // Static Gestures
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
    {name: 'Voice', value: 'VOICE'}
];
const actions = [
    {name: 'Type Copypasta', value: 'TYPE_STARWARS'},
    {name: 'Open Terminal', value: 'OPEN_TERMINAL'},
    {name: 'Text-To-Speech', value: 'TTS'},
    {name: 'Type Text', value: 'TYPE'},
    {name: 'Shell Command', value: 'COMMAND'},
];
const voices = [
    // This is just a small sample of the highest quality voices on vo.codes
    {name: 'Arnold Schwarzenegger', value: 'arnold-schwarzenegger'},
    {name: 'Bob Barker', value: 'bob-barker'},
    {name: 'Homer Simpson', value: 'homer-simpson'},
    {name: 'Mitch McConnell', value: 'mitch-mcconnell'},
    {name: 'Sir David Attenborough', value: 'david-attenborough'},
    {name: 'SpongeBob SquarePants', value: 'spongebob-squarepants'},
]

// Button actions
addBtn.onclick = () => {
    // Insert the card into the container.
    const card = $(cardString).appendTo(cardContainer);
    // Now initialize the dropdown menus in the card we just added.
    initializeCards(card);

    // Scroll the card into view. 
    // This array notation is used to get the HTMLelement from the Jquery object.
    card[0].scrollIntoView();
};

saveBtn.onclick = () => {
    // Traverse all of the completely filled in entires and save them to a JSON file.
    config_entries = []
    // Iterate over cards
    $(".card").each((index, card) => {
        // Verify that all visible dropdowns are filled in. A primative way to validate the form.
        // See here for other behaviors you can call like this:
        // https://semantic-ui.com/modules/dropdown.html#/usage
        const visibleDropdowns = $(card).find(".ui.dropdown:visible");
        if (visibleDropdowns.dropdown('get value').every((string) => string !== "")) {
            config_entries.push({
                input: $(card).find(".inputselector").dropdown('get value'),
                action: $(card).find(".actionselector").dropdown('get value'),
                input_data: {
                    voice_input: $(card).find(".voiceinput > input").val(),
                },
                action_data: {
                    type_text: $(card).find(".typeinput > input").val(),
                    tts_text: $(card).find(".ttsinput > input").val(), 
                    tts_speaker: $(card).find(".ttsspeakerselector").dropdown('get value'),
                    shell_command: $(card).find(".commandinput > input").val(),
                },
            });
        }
    });
    console.log(config_entries);
    fs.writeFileSync("config.json", JSON.stringify(config_entries));
};

// --------------------------------------------------

// Load current mappings from the config file
const loadedData = JSON.parse(fs.readFileSync("config.json"))
if (loadedData) {
    // If we have saved data, delete the empty template currently there.
    $(".card").remove();
} else {
    // Otherwise, initialize it.
    initializeCards($(document));
}
loadedData.forEach(data => {
    console.log(data);
    let card = $(cardString).appendTo(cardContainer);
    initializeCards(card);
    // Setup the input & action dropdowns
    card.find(".inputselector").dropdown('set selected', data.input);
    card.find(".actionselector").dropdown('set selected', data.action);
    // Load the additional input data.
    card.find(".voiceinput > input").val(data.input_data.voice_input);
    // Load the additional action data.
    card.find(".typeinput > input").val(data.action_data.type_text);
    card.find(".ttsinput > input").val(data.action_data.tts_text); 
    card.find(".ttsspeakerselector").dropdown('set selected', data.action_data.tts_speaker);
    card.find(".commandinput > input").val(data.action_data.shell_command);
});

// Initializes all cards which are decendents of the given element
function initializeCards(elem) {
    // Hide the extra content by default.
    elem.find(".extra.content").hide();

    // Populate & Animate all input selection dropdowns.
    elem.find(".ui.dropdown.inputselector").dropdown({
        values: inputs,
        placeholder: "Select an input",
        action: "activate",
        onChange: function(value, text, selectedItem) {
            if (selectedItem !== undefined) {
                const card = selectedItem.closest(".card");
                updateCard(card);
            }
        },
    });
    // Populate & Animate all action selection dropdowns.
    elem.find(".ui.dropdown.actionselector").dropdown({
        values: actions,
        placeholder: "Select an action",
        action: "activate",
        onChange: function(value, text, selectedItem) {
            if (selectedItem !== undefined) {
                const card = selectedItem.closest(".card");
                updateCard(card);
            }
        },
    });
    // Populate & Animate the TTS speaker selector dropdown.
    elem.find(".ui.dropdown.ttsspeakerselector").dropdown({
        values: voices,
        placeholder: "Select a voice",
    });
}

// Determins what extra content to show based on the selected options.
function updateCard(card) {
    // Hide all the extra content in the card
    card.find(".extra.content").hide();

    // Get values for the input & action selectors
    const inputValue = card.find(".ui.dropdown.inputselector").dropdown('get value');
    const actionValue = card.find(".ui.dropdown.actionselector").dropdown('get value')

    // Show content depending on the selections for the input & actions
    if (inputValue === "VOICE") {
        // Show the voice entry textbox
        card.find(".voicecontent").show();
    }
    if (actionValue === "TTS") {
        // Show the speaker selector & the TTS input textbox
        card.find(".ttscontent").show();
    }
    if (actionValue === "COMMAND") {
        // Show input box for a shell command
        card.find(".commandcontent").show();
    }
    if (actionValue === "TYPE") {
        card.find(".typecontent").show();
    }
}