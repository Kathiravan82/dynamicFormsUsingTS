import { Form } from "../models/forms";

export class FormRenderer {
    private container: HTMLElement;

    constructor(containerId: string) {
        const element = document.getElementById(containerId);
        if (!element) {
            throw new Error(`Element with id "${containerId}" not found`);
        }
        this.container = element as HTMLElement;
    }

    public loadForm(formId: string): void {
        const savedForms = localStorage.getItem("forms");
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

        // Render form inside a `<form>` element
        let formHtml = `<h2 class="text-lg font-semibold">${form.name}</h2>`;
        formHtml += `<form id="dynamic-form" class="space-y-4">`;

        form.fields.forEach(field => {
            formHtml += `<div>
                <label class="block font-semibold">${field.label}</label>`;

            if (field.type === "radio" || field.type === "checkbox") {
                field.options?.forEach(option => {
                    formHtml += `
                        <input type="${field.type}" name="${field.label}" value="${option}" class="mr-2">
                        ${option}`;
                });
            } else if (field.type === "select") {
                formHtml += `<select class="border border-gray-300 p-2 rounded w-full">
                    <option value="">Select ${field.label}</option>`;
                field.options?.forEach(option => {
                    formHtml += `<option value="${option}">${option}</option>`;
                });
                formHtml += `</select>`;
            } else {
                formHtml += `<input type="${field.type}" class="border border-gray-300 p-2 rounded w-full">`;
            }

            formHtml += `</div>`;
        });

        formHtml += `
            <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded mt-2">
                Submit
            </button>
        </form>`;

        this.container.innerHTML = formHtml;

        // Attach event listener for form submission (optional)
        const formElement = document.getElementById("dynamic-form") as HTMLFormElement;
        formElement.addEventListener("submit", this.handleSubmit);
    }

    private handleSubmit(event: Event): void {
        event.preventDefault(); // Prevent actual submission
        alert("Form submitted successfully!");
    }
}
