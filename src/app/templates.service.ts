import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TemplatesService {
  private templateStructure:any[][]=[[
    {
      "type": "text",
      "label": "Name",
      "name": "name",
      "value": "",
      "validations": [
        {
          "name": "required",
          "validator": "required",
          "message": "Name is required"
        }
      ]
    },
    {
      "type": "email",
      "label": "Email",
      "name": "email",
      "value": "",
      "validations": [
        {
          "name": "required",
          "validator": "required",
          "message": "Email is required"
        },
        {
          "name": "pattern",
          "validator": "email",
          "message": "Invalid email format"
        }
      ]
    },
    {
      "type": "password",
      "label": "Password",
      "name": "password",
      "value": "",
      "validations": [
        {
          "name": "required",
          "validator": "required",
          "message": "password is required"
        }
      ]
    }
  ],
  [
 
      {
        "type": "text",
        "label": "Name",
        "name": "name",
        "value": "",
        "validations": [
          {
            "name": "required",
            "validator": "required",
            "message": "Name is required"
          }
        ]
      },
      {
        "type": "email",
        "label": "Email",
        "name": "email",
        "value": "",
        "validations": [
          {
            "name": "required",
            "validator": "required",
            "message": "Email is required"
          },
          {
            "name": "pattern",
            "validator": "email",
            "message": "Invalid email format"
          }
        ]
      }
  ],
  [
    {
      "type": "text",
      "label": "Name",
      "name": "name",
      "value": "",
      "validations": [
        {
          "name": "required",
          "validator": "required",
          "message": "Name is required"
        }
      ]
    },
    {
      "type": "email",
      "label": "Email",
      "name": "email",
      "value": "",
      "validations": [
        {
          "name": "required",
          "validator": "required",
          "message": "Email is required"
        },
        {
          "name": "pattern",
          "validator": "email",
          "message": "Invalid email format"
        }
      ]
    },
    {
      "type": "dropdown",
      "label": "Dropdown",
      "name": "phone",
      "value": "",
      "options":["option1","option2"],
      "validations": [
        {
          "name": "required",
          "validator": "required",
          "message": "Number  is required"
        }
      ]
    }
  ]



 

]
  constructor() { }

  getTemplates() {
    // Return the JSON structure defined earlier
    return this. templateStructure;
  }
  addTemplate(newField:any[]){
    this.templateStructure.push(newField);  
   }
   
  

  deleteTemplate(templateToDelete: any[]) {
    const index = this.templateStructure.findIndex(template => template === templateToDelete);
    
    if (index !== -1) {
      this.templateStructure.splice(index, 1);
    }
  }
}
