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
        <input type="text" id="form-name" placeholder="Form Name">
        <select id="field-type">
            <option value="text">Text</option>
            <option value="radio">Radio</option>
            <option value="checkbox">Checkbox</option>
            <option value="select">Dropdown</option>
        </select>
        <input type="text" id="field-label" placeholder="Field Label">
        <input type="text" id="field-options" placeholder="Options (comma-separated)">
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
    }
    
    private addField(): void {
        const fieldType = (document.getElementById("field-type") as HTMLSelectElement).value as FieldType;
        const label = (document.getElementById("field-label") as HTMLInputElement).value;
        let options: string[] = [];

        if (fieldType === "radio" || fieldType === "checkbox" || fieldType === "select") {
            options = (document.getElementById("field-options") as HTMLInputElement).value.split(",").map(opt => opt.trim());
        }
        
        this.currentForm.fields.push({ type: fieldType, label, options });
        this.renderForm();
        this.resetFieldInputs();
    }
    
    private saveForm(): void {
        const formName = (document.getElementById("form-name") as HTMLInputElement).value;
        if (!formName) {
            alert("Please enter a form name");
            return;
        }
        this.currentForm.id = new Date().getTime().toString();
        this.currentForm.name = formName;
        this.forms.push(this.currentForm);
        localStorage.setItem("forms", JSON.stringify(this.forms));
        alert("Form saved!");
        // const formList = document.getElementById("formListBlock")!;
        // formList.innerHTML = "";
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
        console.log(this.forms,'renderFormList')
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
    // Function to delete a form
    public deleteForm(formId: string): void {
        this.forms = this.forms.filter((form) => form.id !== formId);
        localStorage.setItem("forms", JSON.stringify(this.forms));
        setTimeout(() => {
            this.renderFormList()

        }, 300);
        console.log(`Form with ID ${formId} deleted`);
    }

    private resetFieldInputs(): void {
        (document.getElementById("field-label") as HTMLInputElement).value = "";
        (document.getElementById("field-options") as HTMLInputElement).value = "";
    }
}