import { FormRenderer } from "./components/forms";
import { FormBuilder } from "./models/forms";

// Extend the global Window interface
declare global {
    interface Window {
        formBuilder: FormBuilder;
        formRenderer: FormRenderer;
    }
}

// Initialize Form Builder and Renderer
const formBuilder = new FormBuilder("form-builder-container");
const formRenderer = new FormRenderer("form-container");

// Expose to global scope with proper typing
window.formBuilder = formBuilder;
window.formRenderer = formRenderer;
