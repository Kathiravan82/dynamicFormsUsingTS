export type FieldType = "text" | "radio" | "checkbox" | "select";

export interface Field {
    type: FieldType;
    label: string;
    options?: string[];
}

export interface Form {
    id: string;
    name: string;
    fields: Field[];
}
export class FormBuilder {
    private container: HTMLElement;
    private currentForm: Form = { id: "", name: "", fields: [] };
    private forms: Form[] = [];
    
    constructor(containerId: string) {
        this.container = document.getElementById(containerId) as HTMLElement;
        if (!this.container) {
            console.error(`Element with ID ${containerId} not found.`);
            return;
        }
        this.loadHTML();
        this.loadForms();
    }
    
    private loadHTML(): void {
        this.container.innerHTML = `
        <input type="text" id="form-name" placeholder="Form Name" class="border border-gray-300 p-2 rounded w-full">
        <p id="form-name-error" class="text-red-500 text-sm hidden">Form name is required.</p>

        <select id="field-type" class="border border-gray-300 p-2 rounded w-full">
            <option value="text">Text</option>
            <option value="radio">Radio</option>
            <option value="checkbox">Checkbox</option>
            <option value="select">Dropdown</option>
        </select>
        
        <input type="text" id="field-label" placeholder="Field Label" class="border border-gray-300 p-2 rounded w-full">
        <p id="field-label-error" class="text-red-500 text-sm hidden">Field label is required.</p>

        <input type="text" id="field-options" placeholder="Options (comma-separated)" class="border border-gray-300 p-2 rounded w-full hidden">
        
        <div class="flex space-x-2 mt-4">
            <button id="add-field" class="bg-blue-500 hover:bg-blue-600 text-white text-sm px-4 py-2 rounded-md shadow">
                ➕ Add Field
            </button>
            <button id="save-form" class="bg-blue-500 hover:bg-blue-600 text-white text-sm px-4 py-2 rounded-md shadow">
                💾 Save Form
            </button>
        </div>

        <div id="form-preview"></div>
        <h3 class="text-xl font-semibold mt-6">Saved Forms</h3>
        <ul id="form-list" class="list-none list-inside bg-gray-50 p-4 rounded-lg shadow-sm"></ul>
        `;
        
        document.getElementById("add-field")!.addEventListener("click", () => this.addField());
        document.getElementById("save-form")!.addEventListener("click", () => this.saveForm());
        document.getElementById("field-type")!.addEventListener("change", this.toggleOptionsInput);
    }

    private toggleOptionsInput(): void {
        const fieldType = (document.getElementById("field-type") as HTMLSelectElement).value;
        const optionsInput = document.getElementById("field-options") as HTMLInputElement;
        if (fieldType === "radio" || fieldType === "checkbox" || fieldType === "select") {
            optionsInput.classList.remove("hidden");
        } else {
            optionsInput.classList.add("hidden");
        }
    }

    private addField(): void {
        const fieldType = (document.getElementById("field-type") as HTMLSelectElement).value as FieldType;
        const labelInput = document.getElementById("field-label") as HTMLInputElement;
        const optionsInput = document.getElementById("field-options") as HTMLInputElement;
        const label = labelInput.value.trim();
        
        if (!label) {
            this.showError(labelInput, "field-label-error", true);
            return;
        }
        this.showError(labelInput, "field-label-error", false);

        let options: string[] = [];
        if (fieldType === "radio" || fieldType === "checkbox" || fieldType === "select") {
            options = optionsInput.value.split(",").map(opt => opt.trim()).filter(opt => opt);
        }
        
        this.currentForm.fields.push({ type: fieldType, label, options });
        this.renderForm();
        this.resetFieldInputs();
    }
    
    private saveForm(): void {
        const formNameInput = document.getElementById("form-name") as HTMLInputElement;
        const formName = formNameInput.value.trim();
        
        if (!formName) {
            this.showError(formNameInput, "form-name-error", true);
            return;
        }
        this.showError(formNameInput, "form-name-error", false);

        if (this.currentForm.fields.length === 0) {
            alert("Please add at least one field before saving.");
            return;
        }

        this.currentForm.id = new Date().getTime().toString();
        this.currentForm.name = formName;
        this.forms.push(this.currentForm);
        localStorage.setItem("forms", JSON.stringify(this.forms));

        this.loadForms();
        this.currentForm = { id: "", name: "", fields: [] };
        this.renderForm();
        this.resetFieldInputs();
    }
    
    private loadForms(): void {
        const savedForms = localStorage.getItem("forms");
        this.forms = savedForms ? JSON.parse(savedForms) : [];
        this.renderFormList();
    }
    
    private renderForm(): void {
        const preview = document.getElementById("form-preview")!;
        preview.innerHTML = this.currentForm.fields.map(field => `<p>${field.label} (${field.type})</p>`).join("");
    }
    
    public renderFormList(): void {
        const formList = document.getElementById("form-list")!;
        formList.innerHTML = "";

        this.forms.forEach(form => {
            const li = document.createElement("li");
            li.innerHTML = `
            <div class="inline-flex items-center space-x-3">
                <span class="text-lg">${form.name}</span>
                <span class="material-icons text-blue-500 hover:text-blue-700 cursor-pointer" onclick="window.formRenderer.loadForm('${form.id}')">
                    visibility
                </span>
                <span class="material-icons text-red-500 hover:text-red-700 cursor-pointer" onclick="deleteForm('${form.id}')">
                    delete
                </span>
            </div>
        `;
        formList.appendChild(li);
        });
    }

    public deleteForm(formId: string): void {
        this.forms = this.forms.filter((form) => form.id !== formId);
        localStorage.setItem("forms", JSON.stringify(this.forms));
        setTimeout(() => {
            this.renderFormList();
        }, 300);
    }

    private resetFieldInputs(): void {
        (document.getElementById("field-label") as HTMLInputElement).value = "";
        (document.getElementById("field-options") as HTMLInputElement).value = "";
    }

    private showError(inputElement: HTMLInputElement, errorId: string, show: boolean): void {
        const errorMsg = document.getElementById(errorId) as HTMLElement;
        if (show) {
            errorMsg.classList.remove("hidden");
            inputElement.classList.add("border-red-500", "focus:ring-red-500");
        } else {
            errorMsg.classList.add("hidden");
            inputElement.classList.remove("border-red-500", "focus:ring-red-500");
        }
    }
}
