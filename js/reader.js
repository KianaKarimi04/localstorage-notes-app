// ChatGPT was used to assist with this lab

import { MESSAGES } from "../lang/messages/en/user.js";

const STORAGE_KEY = "notes";
const container = document.getElementById("notes");
const status = document.getElementById("status");

function loadNotes() {
    const notes = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    container.innerHTML = "";

    notes.forEach(note => {
        const box = document.createElement("div");
        box.textContent = note.text;
        container.append(box);
    });

    status.textContent = `${MESSAGES.UPDATED_AT} ${new Date().toLocaleTimeString()}`;
}

loadNotes();
setInterval(loadNotes, 2000);
