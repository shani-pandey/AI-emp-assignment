import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfirmationComponent } from '../dialog-confirmation/dialog-confirmation.component';
import { EmployeeAddEditComponent } from '../employee-add-edit/employee-add-edit.component';
import { EmployeeDataService } from '../shared/employee-data.service';

@Component({
  selector: 'app-employee-info',
  templateUrl: './employee-info.component.html',
  styleUrls: ['./employee-info.component.scss']
})
export class EmployeeInfoComponent implements OnInit {


  allEmployee:any;
  imgBasePath:string="assets/img/profile-icons/";

  constructor(private _employeeService:EmployeeDataService,private __dialog:MatDialog) { }

  ngOnInit(): void {
      this.getAllEMployeeList();
  }


 

  getAllEMployeeList(){
    this._employeeService.getAllEmployee().subscribe({
      next:(res:any)=>{
        this.allEmployee = res.data
      },
      error:(err)=>{
        console.log('Error',err)
      }
    }) 
  }

  deleteEmployee(empId:number){
    this._employeeService.deleteEmployee(empId).subscribe({
      next:(res)=>{
        this._employeeService.openSnackBar('Deleted successfully!!','Close')
        this.getAllEMployeeList();
      },
      error:(err)=>{
        console.log('Error',err)
      }
    })
  }

  openAddEditDialog(){
    const dialogRef = this.__dialog.open(EmployeeAddEditComponent,{
      width: '450px'
    });
    dialogRef.afterClosed().subscribe({
      next:(val)=>{
        if(val){
          this.getAllEMployeeList()
        }
      }
    })
    
  }

  openEditFormDialog(data:any){
    const dialogRef = this.__dialog.open(EmployeeAddEditComponent,{
      width: '450px',
      data
    });
    dialogRef.afterClosed().subscribe({
      next:(val)=>{
        if(val){
          this.getAllEMployeeList()
        }
      }
    })

   
  }

  openConfirmDialog(empId:number){
    const dialogConfirmRef = this.__dialog.open(DialogConfirmationComponent,{
      width: '500px'
    });
    dialogConfirmRef.afterClosed().subscribe({
      next:(val)=>{
        if(val){
          this.deleteEmployee(empId)
          this.getAllEMployeeList()
        }
        console.log(val)
      }
    })
  }

}
