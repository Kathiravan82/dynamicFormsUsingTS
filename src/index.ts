import { FormRenderer } from "./components/forms";
import { FormBuilder } from "./models/forms";
import "../public/styles.css"; 
// Extend the global Window interface
declare global {
    interface Window {
        formBuilder: FormBuilder;
        formRenderer: FormRenderer;
        deleteForm: (formId: string) => void;
    }
}

// Initialize Form Builder and Renderer
const formBuilder = new FormBuilder("form-builder-container");
const formRenderer = new FormRenderer("form-container");

// Expose to global scope with proper typing
window.formBuilder = formBuilder;
window.formRenderer = formRenderer;

// Define deleteForm globally
window.deleteForm = function (formId: string) {
    formBuilder.deleteForm(formId);
};
console.log(window.formBuilder,'fB')
