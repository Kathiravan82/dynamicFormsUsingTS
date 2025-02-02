import { Form } from "../models/forms";
export class FormRenderer {
    private container: HTMLElement;

    constructor(containerId: string) {
        this.container = document.getElementById(containerId) as HTMLElement;
    }
    public loadForm(): void {
        console.log("loadForm")
        const savedForm = localStorage.getItem("savedForm");
        if (!savedForm) {
            this.container.innerHTML = "<p>No form found.</p>";
            return;
        }
    }
}