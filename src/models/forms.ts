
export interface Field {
    type: "text" | "radio" | "checkbox" | "select";
    label: string;
    options?: string[];
}

export interface Form {
    name: string;
    fields: Field[];
}

export class FormBuilder {
    private container: HTMLElement;
    private currentForm: Form = { name: "", fields: [] };
    constructor(containerId: string) {
        this.container = document.getElementById(containerId) as HTMLElement;
        this.loadHTML();
    }
    private loadHTML(): void {
        this.container.innerHTML = `
            <div>Form Data will come here...</div>
        `;
    }
}