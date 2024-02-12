import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormServiceService {

  private formStructure:any[]=[]
  private formStructureD:any[]=[]
  private isConfirmed:boolean=false;
  private isediting:boolean=false;
  constructor() { }
 ​
   getFormStructure() {
     // Return the JSON structure defined earlier
    
      return this.formStructure;
    
    
   }
   addFormField(newField:any){
    this.formStructure.push(newField);  
   }
   deleteFormField(fieldName: string) {
    const index = this.formStructure.findIndex(field => field.name === fieldName);

    if (index !== -1) {
      this.formStructure.splice(index, 1);
    }
  }

  setData(datafield:any){
    this.formStructure=datafield;
    this.formStructureD=datafield;
  }
  emptyStructure(){
    this.formStructure=[];
  }
  getStructureToDelete(){
    return this.formStructureD;
  }

  editing(){
  this.isediting=true;
  }

  confirming(){
    
    this.isConfirmed=true;
  }
}
