import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeInfoComponent } from './employee-info/employee-info.component';
import { EmployeeAddEditComponent } from './employee-add-edit/employee-add-edit.component';
import { DatePipePipe } from './pipes/date-pipe.pipe';
import { ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { DialogConfirmationComponent } from './dialog-confirmation/dialog-confirmation.component';



@NgModule({
  declarations: [
    EmployeeInfoComponent,
    DatePipePipe,
    EmployeeAddEditComponent,
    DialogConfirmationComponent,

  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,NgbModule,HttpClientModule,ReactiveFormsModule,
    MatButtonModule,MatCardModule,MatIconModule,MatDialogModule,
    MatFormFieldModule,MatInputModule,MatDatepickerModule,MatNativeDateModule,MatSnackBarModule
  ]
})
export class EmployeeModule { }
