import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-json-form',
  templateUrl: './json-form.component.html',
  styleUrls: ['./json-form.component.css']
})
export class JsonFormComponent implements OnInit{
  isFormSubmitted:boolean=false
  myForm: FormGroup | any
  data: any[] = [
    { type: 'text', name: 'firstName', label: 'First Name', value: '', required: true, minLength: 10, maxLength: 50, unique: true },
    { type: 'text', name: 'lastName', label: 'Last Name', value: '', required: true, },
    { type: 'text', name: 'email', label: 'Email', value: '', required: true, },
    { type: 'file', name: 'picture', label: 'Picture', required: true, },
    { type: 'dropdown', name: 'country', label: 'Country', value: 'in', required: true, options: [{ key: 'in', label: 'India' }, { key: 'us', label: 'USA' }] },
    { type: 'radio', name: 'Gender', label: 'Gender', value: '', required: true, options: [{ key: 'm', label: 'Male' }, { key: 'f', label: 'Female' }] },
    { type: 'checkbox', name: 'hobby', label: 'Hobby', value: '', required: false, options: [{ key: 'f', label: 'Fishing' }, { key: 'c', label: 'Cooking' }] }
    
  ]
  
  ngOnInit() {
    let myformobj:any = {
      Hobby: new FormArray([])
    };
    this.data.forEach((i:any) => {
      let validators = [];
      if(i.required){
        validators.push(Validators.required)
      }
      if(i.minLength){
        validators.push(Validators.minLength(i.minLength))
      }
      if(i.maxLength){
        validators.push(Validators.maxLength(i.maxLength))
      }
        myformobj[i.name] = new FormControl(i.value, validators);
    })
    this.myForm = new FormGroup(myformobj)
    console.log(myformobj);
    
  }

  onCheckboxChange(e:any){
    const checkArray: FormArray = this.myForm.get('Hobby') as FormArray;
    if (e.target.checked) {
      checkArray.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      checkArray.controls.forEach((item: any) => {
        if (item.value == e.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }
  onSubmit(){
    this.isFormSubmitted=true
    if(this.myForm.valid){
      console.log(this.myForm.value);
    }
  }
}
