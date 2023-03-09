import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
 
interface Food {
    value: string;
    viewValue: string;
}

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    isFocused: boolean = false;
    someValue: string="";
    toggleValue:boolean=false
    namearr:any[] = [];
    course:any[] = [];
    foods: Food[] = [
        { value: 'steak-0', viewValue: 'Steak' },
        { value: 'pizza-1', viewValue: 'Pizza' },
        { value: 'tacos-2', viewValue: 'Tacos' },
    ];

    form: FormGroup | any;
    constructor(private fb: FormBuilder, private http: HttpClient) {
        this.form = this.fb.group({
            field1: [''],
            field2: [''],
            field3: [''],
            field4: [''],
            field5: [''],
            field6: [''],
            field7: [''],
            array: this.fb.array([this.addnewField()])
        });

        this.http.get('./assets/data.json').subscribe((data:any) => {
            this.namearr = data.nameCat.map((i:any) => {
                return i
            })   
            this.course = data.degreeCat.map((i:any) => {
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

    addnewField() {
        return this.fb.group({
            field11: [],
            field12: [],
            field13: ['male'],
            toggleControl:[false],
            field14:[],
            desc:[],
            branch:[]
        })
    }

    // addField(index: any) {
    //     this.form.get('array').push(this.addnewField(index));
    // }
    addField(index: any) {
        this.form.get('array').push(this.addnewField());
    }

    deleteField(index: any): any {
        const arrayControl = this.form.get('array') as FormArray;
        if (arrayControl.length > 1) {
            arrayControl.removeAt(index);
        }
       
    }

    onselect(inp:any, index:any){
        // console.log(inp);
        this.http.get('./assets/data.json').subscribe((data:any) => {
            data.nameCat.map((i:any) => {
                if(i.name == inp)
                {
                    this.form.get("array").controls[index].get('field14').setValue(i.status);
                    this.form.get("array").controls[index].get('desc').setValue(i.description);
                }
                
            })            
        })
    }

    onDegreeselect(inp:any, index:any){
        this.http.get('./assets/data.json').subscribe((data:any) => {
            data.degreeCat.map((i:any) => {
                if(i.courseName == inp)
                {
                    this.form.get("array").controls[index].get('branch').setValue(i.Branch)
                }
                
            })            
        })
    }

    SaveForm() {
        let fields = this.form.controls.array.controls.map((i:any) => {
            return ({
                'name': i.value.field11,
                'degree': i.value.field12,
                'gender': i.value.field13,
                'switch': i.value.toggleControl,
                'status': i.value.field14,
                'desc': i.value.desc,
                'branch': i.value.branch,
            })
            
        })
        const payload = {
          header: {
            'department': this.form.get('field1').value,
            'serviceCategory': this.form.get('field2').value,
            'Service': this.form.get('field3').value,
            'ServiceCode': this.form.get('field4').value,
            'CostingMethod': this.form.get('field5').value,
            'ServiceTariff': this.form.get('field6').value,
            'Status': this.form.get('field7').value,
          },
          details: fields

        }

        console.log("payload: ", payload);
        // localStorage.setItem("payload", JSON.stringify(payload))
    }

    clearForm(){
        this.form.reset();
    }

}



// "data": [
//     {
//         "id": 1,
//         "fname": "nakul",
//         "lname": "verma",
//         "email": "abc@gmail.com",
//         "age": 22
//     },
//     {
//         "id": 2,
//         "fname": "akshay",
//         "lname": "shah",
//         "email": "ak.shah@gmail.com",
//         "age": 21
//     },
//     {
//         "id": 3,
//         "fname": "avi",
//         "lname": "moliya",
//         "email": "avimoliya@gmail.com",
//         "age": 20
//     }
// ],