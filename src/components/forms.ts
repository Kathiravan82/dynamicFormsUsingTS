import { Form } from "../models/forms";
export class FormRenderer {
    private container: HTMLElement;

    constructor(containerId: string) {
        this.container = document.getElementById(containerId) as HTMLElement;
    }
}