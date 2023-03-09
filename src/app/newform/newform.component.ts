import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { SafeCall } from '@angular/compiler';

interface Food {
    value: string;
    viewValue: string;
}

@Component({
    selector: 'app-newform',
    templateUrl: './newform.component.html',
    styleUrls: ['./newform.component.css']
})
export class NewformComponent implements OnInit {
    isFormSubmitted = false
    isFormSubmitted1 = false
    formArr: any[] = [];
    isFocused: boolean = false;
    someValue: string = "";
    toggleValue: boolean = false
    namearr: any[] = [];
    course: any[] = [];
    serviceCat: any[] = [];
    serviceType: any[] = [];
    wardType: any[] = [];
    roomType: any[] = [];
    foods: Food[] = [
        { value: 'steak-0', viewValue: 'Steak' },
        { value: 'pizza-1', viewValue: 'Pizza' },
        { value: 'tacos-2', viewValue: 'Tacos' },
    ];
    isDisabled = true;

    form1: FormGroup | any;
    form2: FormGroup | any;
    form3: FormGroup | any;
    constructor(private fb: FormBuilder, private http: HttpClient) {
        this.form1 = this.fb.group({
            field1: ['', Validators.required],
            field2: ['', Validators.required],
            field3: ['', Validators.required],
            field4: ['', Validators.required],
            field5: ['', Validators.required],
            field6: ['', Validators.required],
            // array: this.fb.array([this.addForm1Field()])
        });
        this.form2 = this.fb.group({
            field11: ['', Validators.required],
            field12: ['', Validators.required],
            field13: ['', Validators.required],
            field14: ['', Validators.required],
            field15: ['', Validators.required],
            field16: ['', Validators.required],
            field17: ['', Validators.required],
            // array: this.fb.array([this.addForm2Field()])
        })
        this.form3 = this.fb.group({
            array: this.fb.array([])
        })

        this.http.get('./assets/data.json').subscribe((data: any) => {
            this.namearr = data.nameCat.map((i: any) => {
                return i
            })
            this.course = data.degreeCat.map((i: any) => {
                return i
            })
            this.serviceCat = data.serviceCat.map((i: any) => {
                return i
            })
            this.serviceType = data.service.map((i: any) => {
                return i
            })
            this.wardType = data.wardType.map((i: any) => {
                return i
            })
            this.roomType = data.roomType.map((i: any) => {
                return i
            })
        })
    }
    ngOnInit() {
        // this.http.get('./assets/data.json').subscribe((data:any) => {
        //     data.data.forEach((i:any) => {
        //         // console.log(i);
        //         this.form.get('array').push(this.addnewField(i));    
        //     });              
        // })     
    }

    // addnewField(data:any) {
    //     return this.fb.group({
    //         field11: [data.fname],
    //         field12: [data.lname],
    //         field13: [data.email],
    //         toggleControl:[false],
    //         field14: [data.age as number],
    //     })
    // }

    change_value(inpvalue:any,index:any){
        (this.form3.get('array') as FormArray).controls[index].get('field5')?.setValue(inpvalue.value)
    }
    change_value1(inpvalue:any,index:any){
        (this.form3.get('array') as FormArray).controls[index].get('field6')?.setValue(inpvalue.value)
    }

    onSelect(inp: any) {
        this.http.get('./assets/data.json').subscribe((data: any) => {
            data.serviceCat.map((i: any) => {
                if (i.catName == inp) {
                    this.form1.controls.field4.setValue(i.Tariff)
                }

            })
        })

    }

    setTariff(j: any) {
        console.log(j);

        this.http.get('./assets/data.json').subscribe((data: any) => {
            console.log("field12 price------> ", this.form2.controls.field12);
            data.roomType.map((i: any) => {
                if (i.category == this.form2.controls.field12.value) {
                    let price = i.price
                    console.log(price);
                    this.form2.controls.field15.setValue(price * j)
                }
            })

        })
    }

    // addnewField() {
    //     return this.fb.group({
    //         field11: [],
    //         field12: [],
    //         field13: ['male'],
    //         toggleControl: [false],
    //         field14: [],
    //         desc: [],
    //         branch: []
    //     })
    // }

    // addField(index: any) {
    //     this.form.get('array').push(this.addnewField(index));
    // }
    // addField(index: any) {
    //     this.form.get('array').push(this.addnewField());
    // }

    // deleteField(index: any): any {
    //     const arrayControl = this.form.get('array') as FormArray;
    //     if (arrayControl.length > 1) {
    //         arrayControl.removeAt(index);
    //     }

    // }

    // onselect(inp:any, index:any){
    //     // console.log(inp);
    //     this.http.get('./assets/data.json').subscribe((data:any) => {
    //         data.nameCat.map((i:any) => {
    //             if(i.name == inp)
    //             {
    //                 this.form1.get("array").controls[index].get('field14').setValue(i.status);
    //                 this.form1.get("array").controls[index].get('desc').setValue(i.description);
    //             }

    //         })            
    //     })


    // onDegreeselect(inp:any, index:any){
    //     this.http.get('./assets/data.json').subscribe((data:any) => {
    //         data.degreeCat.map((i:any) => {
    //             if(i.courseName == inp)
    //             {
    //                 this.form.get("array").controls[index].get('branch').setValue(i.Branch)
    //             }

    //         })            
    //     })
    // }

    saveForm() {
        this.isFormSubmitted = true
        if (this.form1.valid) {
            const newFormGroup = this.fb.group({
                field1: [this.form1.get('field1').value],
                field2: [this.form1.get('field2').value],
                field3: [this.form1.get('field3').value],
                field4: [this.form1.get('field4').value],
                field5: [this.form1.get('field5').value],
                field6: [this.form1.get('field6').value],
            });
            (this.form3.get('array') as FormArray).push(newFormGroup);
            // console.log(this.form1);
            this.isFormSubmitted = false
            this.form1.reset();
            this.form1.controls['field2'].setValue('');
            this.form1.controls['field3'].setValue('');
            this.form1.controls['field4'].setValue('');
            this.form1.controls['field5'].setValue('');
            this.form1.controls['field6'].setValue('');
        }
    }
    saveForm1() {
        this.isFormSubmitted1 = true
        if (this.form2.valid) {
            const newFormGroup1 = this.fb.group({
                field1: [this.form2.get('field11').value],
                field2: [this.form2.get('field12').value],
                field3: [this.form2.get('field13').value],
                field4: [this.form2.get('field15').value],
                field5: [this.form2.get('field16').value],
                field6: [this.form2.get('field17').value],
                field7: [this.form2.get('field14').value],
            });
            (this.form3.get('array') as FormArray).push(newFormGroup1);
            this.isFormSubmitted1 = false
            this.form2.reset();
            this.form2.controls['field11'].setValue('');
            this.form2.controls['field12'].setValue('');
            this.form2.controls['field13'].setValue('');
            this.form2.controls['field14'].setValue('');
            this.form2.controls['field15'].setValue('');
            this.form2.controls['field16'].setValue('');
            this.form2.controls['field17'].setValue('');
        }
    }
    // SaveForm() {
    //     let fields = this.form1.controls.array.controls.map((i:any) => {
    //         return ({
    //             'name': i.value.field11,
    //             'degree': i.value.field12,
    //             'gender': i.value.field13,
    //             'switch': i.value.toggleControl,
    //             'status': i.value.field14,
    //             'desc': i.value.desc,
    //             'branch': i.value.branch,
    //         })

    //     })
    //     const payload = {
    //       header: {
    //         // 'department': this.form.get('field1').value,
    //         // 'serviceCategory': this.form.get('field2').value,
    //         // 'Service': this.form.get('field3').value,
    //         // 'ServiceCode': this.form.get('field4').value,
    //         // 'CostingMethod': this.form.get('field5').value,
    //         // 'ServiceTariff': this.form.get('field6').value,
    //         // 'Status': this.form.get('field7').value,
    //       },
    //       details: fields

    //     }

    //     console.log("payload: ", payload);
    //     // localStorage.setItem("payload", JSON.stringify(payload))
    // }

    // clearForm(){
    //     this.form1.reset();
    // }
    clearForm() {
        this.isFormSubmitted = false
        this.form1.reset();
        this.form1.controls['field2'].setValue('');
        this.form1.controls['field3'].setValue('');
        this.form1.controls['field4'].setValue('');
        this.form1.controls['field5'].setValue('');
        this.form1.controls['field6'].setValue('');
    }
    clearForm1() {
        this.isFormSubmitted1 = false
        this.form2.reset();
        this.form2.controls['field11'].setValue('');
        this.form2.controls['field12'].setValue('');
        this.form2.controls['field13'].setValue('');
        this.form2.controls['field14'].setValue('');
        this.form2.controls['field15'].setValue('');
        this.form2.controls['field16'].setValue('');
        this.form2.controls['field17'].setValue('');
    }

    deleteField(index: any): any {
        const arrayControl = this.form3.get('array') as FormArray;
        arrayControl.removeAt(index);
    }

    submitForm() {
        console.log("form submitted------>", this.form3.value);
    }   

    edit(i: any, index:any) {
        i.editable = !i.editable;
        // this.form3.controls.array.value[index].field5.setValue(this.form3.controls.array.value[index].get('field5'))
        console.log(this.form3.controls.array.value[index]);
    }


   
}

