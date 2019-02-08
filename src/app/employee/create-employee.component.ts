import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormGroup, FormBuilder, FormControl, Validators, AbstractControl, FormArray} from '@angular/forms';
import {CustomValidators} from '../shared/custom-validators';
import {ActivatedRoute} from '@angular/router'
import { IEmployee } from './iemployee';
import { EmployeeService } from './employee.service';
import { ISkill } from './iskill';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
  employee:IEmployee;
  employeeForm:FormGroup;
  pageTitle:string;
  validationMessages={
    'fullName':{
      'required':'Full Name is mandatory!',
      'minlength':'Full Name must be greater than 2 characters',
      'maxlength':'Full Name must be less than 20 characters'
    },
    'email':{
      'required':'Email is mandatory!',
      'emailDomain':'Email domain must be outlook.',
    },
    'confirmEmail':{
      'required':'Confirm Email is required!',
      
    },
    'emailGroup':{
      'confirmEmailCheck':'Email and Confirm Email must match!',
    },
    'phone':{
      'required':'Phone is mandatory!'
    },
    'skillName': {
      'required': 'Skill Name is required.',
    },
    'experienceInYears': {
      'required': 'Experience is required.',
    },
    'proficiency': {
      'required': 'Proficiency is required.',
    },
  };

  formErrors= {
    'fullName':'',
    'email':'',
    'confirmEmail':'',
    'emailGroup':'',
    'skillName':'',
    'experienceInYears':'',
    'proficiency':''
  }
  
  onSubmit():void{
    //console.log(this.employeeForm.value);
    this.logKeyValuePairs(this.employeeForm);
     
    //this.logErrors(this.employeeForm);
    console.log(JSON.stringify(this.formErrors));
    this.employee.fullName= this.employeeForm.value.fullName;
    this.employee.contactPreference= this.employeeForm.value.contactPreference;
    this.employee.email= this.employeeForm.value.emailGroup.email;
    this.employee.phone= this.employeeForm.value.phone;
    this.employee.skills= this.employeeForm.value.skills;
    console.log(JSON.stringify(this.employee));

    if(this.employee.id > 0)
    this.updateEmplpoyee();
    else
    this.addEmployee();
  }

  addEmployee():void{
    this.employeeService.addEmployee(this.employee).subscribe((data:IEmployee)=>{
      this.router.navigate(['/employees']),
        //this.employee.id=data.id,
        (err:any)=>{console.warn(err)}
    });
  }
  updateEmplpoyee():void{
       
    this.employeeService.updateEmployee(this.employee).subscribe(()=>{
           this.router.navigate(['/employees']),
      (err:any)=>{console.log(err);}
    });
  }
  logKeyValuePairs(group:FormGroup):void{
    Object.keys(group.controls).forEach((key:string)=>{
            const absControl = group.get(key)
            if(absControl instanceof FormGroup)
            {this.logKeyValuePairs(absControl);}
            else {console.log(" key= "+key + ' Value= '+ absControl.value);}
    });
  }

  logErrors(group:FormGroup = this.employeeForm):void{
    Object.keys(group.controls).forEach((key:string)=>{
            const absControl = group.get(key)
              this.formErrors[key] = '';
               if(absControl && !absControl.valid && (absControl.touched || absControl.dirty|| absControl.value !=''))
               {
                 const message= this.validationMessages[key];
                 for(const errorKey in absControl.errors)
                 {
                   if(errorKey)
                    this.formErrors[key]+=message[errorKey] + '';
                 }
               }

               if(absControl instanceof FormGroup){
               this.logErrors(absControl);}

               if(absControl instanceof FormArray){
                for(const control of absControl.controls){
                    if(control instanceof FormGroup){
                      this.logErrors(control);
                    }
                }
              }
             
    });
  }

  onContactChange(selectedContact:string):void{

    const control=this.employeeForm.get('phone');
    console.log('onContactChange '+ control.value);
    control.clearValidators();
    if(selectedContact==='phone'){
      control.setValidators(Validators.required);
    }
    control.updateValueAndValidity();
  }
  
   addSkillControl():FormGroup{
     return this.fb.group({
      skillName:['',[Validators.required]],
        experienceInYears:['',[Validators.required]],
        proficiency:['',[Validators.required]],
     });
   }
   addSkillControlsToForm():void{
     (<FormArray>this.employeeForm.get('skills')).push(this.addSkillControl());
     //console.log((<FormArray>this.employeeForm.get('skills')).length);
     
   }

   removeSkillButtonClick(index:number):void{
    (<FormArray>this.employeeForm.get('skills')).removeAt(index);
   }
  onLoad():void{
    // this.employeeForm.setValue({
    //   fullName:"Gautam Shanbhag",
    //   email:"shansgautam@gmail.com",
    //   skills:{
    //     skillName:"C#",
    //     experienceInYears:5,
    //     proficiency:"intermediate",

    //   }
    // });

    this.employeeForm.patchValue({
      fullName:"Gautam Shanbhag",
      email:"shansgautam@gmail.com",
      skills:{
        skillName:"C#",
        experienceInYears:5,
        proficiency:"intermediate",

      }
    });
  }

     private editEmployee(employee:IEmployee):void{

      this.employeeForm.patchValue({
        fullName:employee.fullName,
        contactPreference: employee.contactPreference,

        emailGroup: {
          email: employee.email,
          confirmEmail: employee.email
        },
        phone: employee.phone
        });

        this.employeeForm.setControl('skills',this.setSkillsInControls(employee.skills));
    }

    private setSkillsInControls(skills:ISkill[]):AbstractControl{
      const formArray = new FormArray([]);
      skills.forEach((s)=>{
        formArray.push(this.fb.group({
          skillName: s.skillName,
          experienceInYears:s.experienceInYears,
          proficiency:s.proficiency
        }
        ));
        
      })
      return formArray;

    }
  constructor(private fb:FormBuilder,private route:ActivatedRoute,private employeeService:EmployeeService,
    private router:Router) {}

  
  ngOnInit() {
    // this.employeeForm = new FormGroup({
    //   fullName:new FormControl(''),
    //   email:new FormControl(''),
    //   skills: new FormGroup({
    //     skillName:new FormControl(''),
    //     experienceInYears:new FormControl(''),
    //     proficiency:new FormControl(''),
    //   })
    // });

    this.employeeForm = this.fb.group({
      fullName:['',[Validators.required,Validators.minLength(2),Validators.maxLength(20)]],
      contactPreference:['email'],
      emailGroup:this.fb.group({
      email:['',[Validators.required,CustomValidators.emailDomain('outlook.com')]],
      confirmEmail:['',[Validators.required]],
    },{validator:CustomValidators.confirmEmailCheck}),
      phone:[''],
      skills:this.fb.array([
        this.addSkillControl()
      ]),
      });

    //this.employeeForm.valueChanges.subscribe((data)=>{console.log(JSON.stringify(data))});
    //this.employeeForm.get('fullName').valueChanges.subscribe((data)=>{console.log(data.length)});
    this.employeeForm.get('contactPreference').valueChanges.subscribe((data)=>this.onContactChange(data));
     this.employeeForm.valueChanges.subscribe(()=>this.logErrors(this.employeeForm));
     this.pageTitle='Create Employee'
     const id = +this.route.snapshot.paramMap.get('id');
     if(id>0){
       this.pageTitle='Edit Employee';
       this.employeeService.getEmployee(id).subscribe(
         (data:IEmployee)=>{
          this.employee = data;
           this.editEmployee(data)},
         (err:any)=>{console.warn(err)}
         );

      //this.employeeService.getEmployee(id).subscribe();

     }
     else
     {
       this.employee = {
         id:null,
         fullName:'',
         contactPreference:'',
         email:'',
         phone:'',
         skills:[],

       };
     }
     
     
  }
}

