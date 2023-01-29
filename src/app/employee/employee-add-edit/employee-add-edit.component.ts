import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmployeeDataService } from '../shared/employee-data.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-employee-add-edit',
  templateUrl: './employee-add-edit.component.html',
  styleUrls: ['./employee-add-edit.component.scss']
})
export class EmployeeAddEditComponent implements OnInit {

  iconName:string="";
  err:boolean=false;

  empFormDialog: FormGroup;

  constructor(
    private _formBuilder:FormBuilder, 
    private _employeeService:EmployeeDataService,
    private _dialogRef : MatDialogRef<EmployeeAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any

    ) {
    this.empFormDialog = this._formBuilder.group(({
      fname : ['',Validators.required],
      lname : ['',Validators.required],
      dob : ['',Validators.required],
      //emailId : ['',Validators.required,Validators.email],
      emailId : ['',[Validators.required,Validators.email]],
      phone : ['9999999999',[Validators.required,Validators.maxLength(14)]],
      dept : ['',Validators.required],
      profileIcon:['',Validators.required]
    }))
   }





  ngOnInit(): void {
    this.empFormDialog.patchValue(this.data)
  }

  getFileDetails (event:any) {
    this.iconName = event.target.files[0].name; 
    if(this.iconName){
      this.err = false
    } 
}


  onEmpFormSubmit(){
    
    if(this.empFormDialog.valid){

      if(this.data){
        let dateSendingToServer:any = new DatePipe('en-US').transform(this.empFormDialog.value.dob, 'yyyy/MM/dd')
        dateSendingToServer = dateSendingToServer
        this.empFormDialog.value.dob = dateSendingToServer.split("/").join("-")
        if(this.data.profileIcon){
          this.empFormDialog.value.profileIcon = this.data.profileIcon; 
        }
        else{
          this.empFormDialog.value.profileIcon = this.iconName; 
        }
           

        this._employeeService.updateEmployee(this.data.empId, this.empFormDialog.value).subscribe({
          next:(val:any)=>{
            this._employeeService.openSnackBar('Record updated successfully!','Close')
            this._dialogRef.close(true);
            
          },
          error:(err:any)=>{
            console.error(err)
          }
        })
      }
      else{
        let dateSendingToServer:any = new DatePipe('en-US').transform(this.empFormDialog.value.dob, 'yyyy/MM/dd')
        dateSendingToServer = dateSendingToServer
        this.empFormDialog.value.dob = dateSendingToServer.split("/").join("-")
        this.empFormDialog.value.profileIcon = this.iconName;      
        this._employeeService.addEmployee(this.empFormDialog.value).subscribe({
          next:(val:any)=>{
            
            this._employeeService.openSnackBar('Record created successfully!','Close')
            this._dialogRef.close(true);
          },
          error:(err:any)=>{
            console.error(err)
          }
        })
      }

      
    }
    else{
      if(!this.iconName){
        this.err = true
      }
      
    }

  }


  
  
  

}
