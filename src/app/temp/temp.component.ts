import { Component, OnInit } from '@angular/core';
import { TemplatesService } from '../templates.service';
import { FormGroup,FormBuilder,Validators,ValidatorFn } from '@angular/forms';
import { FormServiceService } from '../form-service.service';
@Component({
  selector: 'app-temp',
  templateUrl: './temp.component.html',
  styleUrls: ['./temp.component.css']
})
export class TempComponent  implements OnInit {
  chosenTemplate:any;
  dynamicForms:FormGroup[]=[];
  dynamicForm=new FormGroup({});
  formStructure:any;
  templatesStructure!:any[];
  dropdown:string="dropdown";
  constructor(private formBuilder: FormBuilder,private tempService:TemplatesService,private formService:FormServiceService){

  }
  ngOnInit(): void {
    this.templatesStructure=this.tempService.getTemplates();
    console.log(this.templatesStructure);
    this.templatesStructure.forEach((formstructure:any[])=>{
        this.buildForm(formstructure);
        this.dynamicForms.push(this.dynamicForm);
    })
console.log(this.dynamicForms);
  }
  buildForm( formStructure :any[]){
    this.formStructure=formStructure;
    
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

   useTemplate(control:any){
      this.chosenTemplate=control;
      console.log(this.chosenTemplate);
      this.formService.setData(control);
      
      
      
   }

   newForm(){
    this.formService.emptyStructure();
   }
}
