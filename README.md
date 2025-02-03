# Dynamic Forms - NPM Package

This project is a simple Google Forms-like application built using TypeScript, HTML, and Tailwind CSS. 
It allows users to dynamically create forms, add different field types, store form data, and submit responses.

## Features
- **Form Creation**: Add text inputs, radio buttons, checkboxes, and dropdown fields.
- **Form Management**: View, edit, and delete forms.
- **Form Storage**: Save form structures in localStorage.
- **Form Submission**: Submit responses and store them locally.
- **NPM Package Ready**: Can be installed and used in other projects.


## Running the Project Locally


npm install
npx webpack --config webpack.config.js
npx http-server public 


## Installation on other Projects
```sh```
npm install dynamicforms-kathiravan

## update it on index.ts file
import { FormBuilder, FormRenderer } from 'dynamicforms-kathiravan';

const formBuilder = new FormBuilder('form-builder-container');
const formRenderer = new FormRenderer('form-container');


## Publish your repo 
## Versioning: Make sure you update the version number in package.json before publishing. npm will not allow you to publish the same version number twice.
npx webpack --config webpack.config.js
npm login
npm publish --access public
