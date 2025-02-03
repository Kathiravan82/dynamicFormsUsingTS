import { Form } from "../models/forms";

export class FormRenderer {
    private container: HTMLElement;
    
    constructor(containerId: string) {
       // this.container = document.getElementById(containerId) as HTMLElement;
       const element = document.getElementById(containerId);
        
        if (!element) {
            throw new Error(`Element with id "${containerId}" not found`);
        }
        
        this.container = element as HTMLElement;
    }
    
    public loadForm(formId: string): void {
        const savedForms = localStorage.getItem("forms");
        console.log(savedForms,'in')
        if (!savedForms) {
            this.container.innerHTML = "<p>No form found.</p>";
            return;
        }
        
        const forms: Form[] = JSON.parse(savedForms);
        const form = forms.find(f => f.id === formId);
        if (!form) {
            this.container.innerHTML = "<p>Form not found.</p>";
            return;
        }
        
        this.container.innerHTML = `<h2>${form.name}</h2>`;
        
        form.fields.forEach(field => {
            const fieldElement = document.createElement("div");
            fieldElement.innerHTML = `<label>${field.label}</label>`;
            
            if (field.type === "radio" || field.type === "checkbox") {
                field.options?.forEach(option => {
                    fieldElement.innerHTML += `<input type="${field.type}" name="${field.label}" value="${option}"> ${option}`;
                });
            } else if (field.type === "select") {
                const selectElement = document.createElement("select");
                field.options?.forEach(option => {
                    const opt = document.createElement("option");
                    opt.value = option;
                    opt.textContent = option;
                    selectElement.appendChild(opt);
                });
                fieldElement.appendChild(selectElement);
            } else {
                fieldElement.innerHTML += `<input type="${field.type}">`;
            }
            
            this.container.appendChild(fieldElement);
        });
    }
}