// ChatGPT was used to assist with this lab

export class Note {
    constructor(id, text = "") {
        this.id = id;
        this.text = text;
    }

    toJSON() {
        return {
            id: this.id,
            text: this.text
        };
    }
}
