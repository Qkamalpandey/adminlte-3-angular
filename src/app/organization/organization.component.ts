import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AppService } from '@services/app.service';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs';
export interface OrganizationModel {
  itemid: string;
  itemname: string;
  createdon: string;
  action: string;
}
@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.scss']
})
export class OrganizationComponent implements OnInit {
  orgForm: any;
  ItemName: any;
  ProductTypeId: any;
  ItemId: any=0;

  displayedColumns: string[] = ['itemid', 'itemname','createdon','action'];
  orgDataSource: MatTableDataSource<OrganizationModel>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  noOfRecord: any;
  isgrid: boolean;
  rows: any;
  dllCategories: any;
  constructor(
    private route:Router,
    private toastr: ToastrService,
    private appService: AppService
    ) { }

  ngOnInit(): void {
    let token=localStorage.getItem('jwtToken');
    if(token==null || token==undefined)
    {
      this.route.navigate(['login']);
    }
    else{
    this.orgForm = new UntypedFormGroup({
      ItemName: new UntypedFormControl(this.ItemName, [Validators.required]),
      ProductTypeId: new UntypedFormControl(this.ProductTypeId, [Validators.required]),
      ItemId:new UntypedFormControl(this.ItemId)
    });
    this.OnReset();
   }
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.orgDataSource.filter = filterValue.trim().toLowerCase();

    if (this.orgDataSource.paginator) {
      this.orgDataSource.paginator.firstPage();
    }
  }

 async OnSave()
  {
    debugger
    if (this.orgForm.valid) {
      (await this.appService.post('api/Products/Add', this.orgForm.value)).pipe(first()).subscribe(
        data => {
          
          if (data!=null && data!=undefined) {
            this.toastr.success("Organization Saved Successfully..","Done!")
            this.OnReset();
          }
        },
        error => {
          window.scroll(0, 0);
          this.toastr.error(error.message,"Error!");
        }
      );
  }
  else if(this.ItemName==="" || this.ItemName===null || this.ItemName===undefined)
    {
      this.toastr.warning("please enter organization","Warning!");
    }
    else if(this.ProductTypeId==-1)
    {
      this.toastr.warning("please select categories","Warning!");
    }
  }
   async  GetCategories() {
    (await this.appService.get("api/ProductType/GetAll", null)).subscribe((data: any) => {
      
      this.noOfRecord = data.length;
       if(this.noOfRecord>0){
      this.dllCategories=data;
       }
    });
  }
  async GetOrganizations()
  {
    (await this.appService.get("api/Products/GetAll", null)).subscribe((data: any) => {
      
      this.noOfRecord = data.length;
       if(this.noOfRecord>0){
       this.isgrid=true;
       this.rows = data;
       this.orgDataSource = new MatTableDataSource(this.rows);
       this.orgDataSource.paginator = this.paginator;
       this.orgDataSource.sort = this.sort;
       }
       else
       {this.isgrid=false;}
    });
  }
  OnEdit(event:any){

    this.ItemId=event.itemId;
    this.ItemName=event.itemName;
    this.ProductTypeId=event.productTypeId;
    window.scroll(0, 0);
    }
  async OnDelete(element?:any)
  {
    (await this.appService.post('api/Products/Delete', element)).pipe(first()).subscribe(
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
        this.toastr.error(error.message,"Error!");
      }
    );
  }
  OnReset()
  {
    this.ItemId=0;
    this.ItemName="";
    this.ProductTypeId=-1;
    window.scroll(0, 0);
    this.GetCategories();
    this.GetOrganizations();
  }

}
