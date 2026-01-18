// ChatGPT was used to assist with this lab

import { Note } from "./note.js";
import { MESSAGES } from "../lang/messages/en/user.js";

const STORAGE_KEY = "notes";
const container = document.getElementById("notes");
const status = document.getElementById("status");

let notes = [];

function loadNotes() {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    notes = data.map(n => new Note(n.id, n.text));
    render();

    const lastTime = localStorage.getItem("lastSavedTime");
    if (lastTime) {
        status.textContent = `${MESSAGES.STORED_AT} ${lastTime}`;
    }
}

function saveNotes() {
    const time = new Date().toLocaleTimeString();

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(notes.map(n => n.toJSON()))
    );

    localStorage.setItem("lastSavedTime", time);
    status.textContent = `${MESSAGES.STORED_AT} ${time}`;
}

function addNote(text = "") {
    const note = new Note(Date.now(), text);
    notes.push(note);
    render();
    saveNotes();
}

function removeNote(id) {
    notes = notes.filter(n => n.id !== id);
    render();
    saveNotes();
}

function render() {
    container.innerHTML = "";

    notes.forEach(note => {
        const wrapper = document.createElement("div");

        const textarea = document.createElement("textarea");
        textarea.value = note.text;
        textarea.oninput = e => {
            note.text = e.target.value;
            saveNotes();
        };

        const btn = document.createElement("button");
        btn.textContent = MESSAGES.REMOVE_BUTTON;
        btn.onclick = () => removeNote(note.id);

        wrapper.append(textarea, btn);
        container.append(wrapper);
    });
}

document.getElementById("addBtn").onclick = () => addNote();

loadNotes();
//setInterval(saveNotes, 2000);
