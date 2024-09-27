import { Component, OnInit,Renderer2,ViewChild } from '@angular/core';
import { UntypedFormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { AppService } from '@services/app.service';
import { first } from 'rxjs';

export interface CategoriesModel {
  id: string;
  type: string;
  description: string;
  action: string;
}

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})

export class CategoriesComponent implements OnInit {
 Type:any;
 ProductTypeDescription:any;
 ID:any=0;
form: any;

  displayedColumns: string[] = ['id', 'type', 'description','createdon','action'];
  catdataSource: MatTableDataSource<CategoriesModel>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  noOfRecord: any;
  isgrid: boolean;
  rows: any;
  constructor(
            private route:Router,
            private toastr: ToastrService,
            private appService: AppService,
    ) { }

  ngOnInit(): void {
    
    let token=localStorage.getItem('jwtToken');
    if(token==null || token==undefined)
    {
      this.route.navigate(['login']);
    }
    else{
    this.form = new FormGroup({
      Type: new UntypedFormControl(this.Type, [Validators.required]),
      ProductTypeDescription: new UntypedFormControl(this.ProductTypeDescription, [Validators.required]),
      ID:new UntypedFormControl(this.ID)
    });
    //https://stackblitz.com/run?file=src/app/table-overview-example.ts
    this.OnReset();
  }
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.catdataSource.filter = filterValue.trim().toLowerCase();

    if (this.catdataSource.paginator) {
      this.catdataSource.paginator.firstPage();
    }
  }

 async OnSave()
  {
    debugger
    if (this.form.valid) {
      (await this.appService.post('api/ProductType/AddProductType', this.form.value)).pipe(first()).subscribe(
        data => {
          
          if (data!=null && data!=undefined) {
            this.toastr.success("Product type Saved Successfully..","Done!")
            this.OnReset();
          }
        },
        error => {
          window.scroll(0, 0);
          this.toastr.error(error.message,"");
        }
      );
  }
  else if(this.Type==="" || this.Type===null || this.Type===undefined)
    {
      this.toastr.error("please enter categories","Warning!");
    }
    else if(this.ProductTypeDescription==="" || this.ProductTypeDescription===null || this.ProductTypeDescription===undefined)
    {
      this.toastr.error("please enter description","Warning!");
    }
  }
   async  GetCategories() {
    (await this.appService.get("api/ProductType/GetAll", null)).subscribe((data: any) => {
      
      this.noOfRecord = data.length;
       if(this.noOfRecord>0){
       this.isgrid=true;
       this.rows = data;
       this.catdataSource = new MatTableDataSource(this.rows);
       this.catdataSource.paginator = this.paginator;
       this.catdataSource.sort = this.sort;
       }
       else
       {this.isgrid=false;}
    });
  }
  OnEdit(event:any){

    this.ID=event.id;
    this.Type=event.type;
    this.ProductTypeDescription=event.productTypeDescription;
    window.scroll(0, 0);
    }
  async OnDelete(element?:any)
  {
    (await this.appService.post('api/ProductType/Delete', element)).pipe(first()).subscribe(
      data => {
        debugger
        if (data!=null && data!=undefined) {
          this.toastr.success("Categories Deleted Successfully..","Done!");
          this.OnReset();
          
          
        //alert("");
        }
      },
      error => {
        window.scroll(0, 0);
        this.toastr.error(error.message,"Error:");
      }
    );
  }
  OnReset()
  {
    this.ID=0;
    this.Type="";
    this.ProductTypeDescription="";
    this.GetCategories();
  }
}
