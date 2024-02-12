import { Component, OnInit } from '@angular/core';
 import { FormGroup, FormBuilder,FormArray,ReactiveFormsModule ,FormControl,Validators, AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';
 import { FormServiceService } from '../form-service.service';
 import { TemplatesService } from '../templates.service';
@Component({
  selector: 'app-demo-f',
  templateUrl: './demo-f.component.html',
  styleUrls: ['./demo-f.component.css']
})
export class DemoFComponent implements OnInit {
     isValid:boolean=false;
     DropOptions:any[]=[];
  ​   dropdown:string="dropdown";
 ​   dynamicForm=new FormGroup({});
    newFieldForm:FormGroup;
    optionsForm:FormGroup;
    isdropdown:boolean=false;
    showNewFieldForm:boolean=false;
    typeOptions: string[] = ['text', 'email', 'password', 'checkbox','dropdown','radio','number'];
    showExtraField:boolean=false;
   constructor(private formBuilder: FormBuilder,private formService: FormServiceService,private tempService:TemplatesService) {
    this.newFieldForm = this.formBuilder.group({
      type: ['', Validators.required],
      label: ['', Validators.required],
      name: ['', Validators.required],
      validations: this.formBuilder.array([]) // You might want to add validators for the new field
    });
    this.optionsForm=this.formBuilder.group({
      option1:[],
      option2:[],
      option3:[],
      option4:[],
    })
    }
   formStructure:any=this.formService.getFormStructure();
   ngOnInit() {
  
    this.buildForm();
    this.buildNewFieldForm
    
   }
   submitOptions(){
    this.DropOptions=Object.values(this.optionsForm.value);
    this.isdropdown=false;
   }
   buildForm(){
    const formStructure = this.formService.getFormStructure();
    
    const formGroup:{[key:string]:any}= {};
   

    formStructure.forEach(fieldData => {

     let controlValidators:ValidatorFn[] = [];
     ​
         if (fieldData.validations) {
           fieldData.validations.forEach((validation: { validator: string; }) => {
             if (validation.validator === 'required') controlValidators.push(Validators.required);
             if (validation.validator === 'email') controlValidators.push(Validators.email);
             
           });
         }
         
         const validators=Validators.compose(controlValidators);
      formGroup[fieldData.name] = [(fieldData.value || ''),validators];
      
    });
  ​
  this.dynamicForm  = this.formBuilder.group(formGroup);
   }
   buildNewFieldForm() {
    this.newFieldForm = this.formBuilder.group({
      type: ['', Validators.required],
      label: ['', [Validators.required,this.labelValidator]],
      name: ['', Validators.required],
      
      validations: this.formBuilder.array([]) // You might want to add validators for the new field
    });
    
  }

  isDropdown(){
    if(this.newFieldForm.value.type==this.dropdown){
      console.log("drop");
      this.isdropdown= true;
    }else{
      this.isdropdown =false;
    }
  }
  
  labelValidator(control: AbstractControl): { [key: string]: any } | null {
    const validPattern = /^[a-zA-Z]+([ _]?[a-zA-Z]+)*$/;

    if (!validPattern.test(control.value)) {
      return { invalidName: true };
    }

    return null;
  }
  toggleNewFieldForm() {
    this.showNewFieldForm = !this.showNewFieldForm;
    // if (!this.showNewFieldForm) {
    //   this.resetNewFieldForm();
    // }
  }

  toCamelCase(input: string): string {
    input=input.toLowerCase();
    
    
    input= input.replace(/\s(.)/g, ($1) => $1.toUpperCase())
                .replace(/\s/g, '')
                .replace(/^(.)/, ($1) => $1.toLowerCase());
             
             
                input=input.replace(/[\s_]+(.)/g, (_, chr) => chr.toUpperCase());
  
  
                  // Use a regular expression to convert to camel case
                  // return input.replace(/[\s_]+(.?)/g, (_, chr) => chr.toUpperCase());
                 input=  input.replace(/[^a-zA-Z]+(.)/g, (_, chr) => chr.toUpperCase()); 
                 
                //  input[0].toLowerCase();
                //   input.replace(/[\s_]+(.?)/g, (_, chr) => chr ? chr.toLowerCase() : '');
  
  
                   return input;     
  }

  addField() {
    if(this.newFieldForm.valid){
      this.isValid=true;
    }
    this.newFieldForm.addControl('options', this.formBuilder.array(this.DropOptions));
  
    const newField = this.newFieldForm.value;
    
    newField.name= this.toCamelCase(newField.label)
    // newField.options=(this.DropOptions);
    console.log(newField,"new");
    console.log(this.DropOptions,"drop")
    
    this.formService.addFormField(newField);
    this.buildForm(); // Rebuild the form after adding a new field
    this.resetNewFieldForm();
    this.isdropdown=false;
  }

  resetNewFieldForm() {
    this.newFieldForm.reset();
    this.showNewFieldForm=false;

  }
   // ...

deleteField(fieldName: string) {
  // Implement logic to delete the field data from your service or JSON data
  // For example, you might update the formStructure array or service data
  this.formService.deleteFormField(fieldName);

  // Rebuild the form after deleting the field
  this.buildForm();
}



   onSubmit() {
    console.log(this.dynamicForm.value,"formdata");
    console.log(this.formStructure,"formstructure");
    
    this.tempService.deleteTemplate(this.formService.getStructureToDelete())
    this.tempService.addTemplate(this.formStructure);
    this.formService.emptyStructure();
  }

  

}
