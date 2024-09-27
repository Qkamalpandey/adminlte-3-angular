import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '@services/app.service';
import { ToastrService } from 'ngx-toastr';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
@Component({
    selector: 'app-notifications',
    templateUrl: './notifications.component.html',
    styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
  private hubConnectionBuilder!: HubConnection;
  //notificationArr: any[] = [];
    totalNotification:any=0;
    notificationList:any[]=[];
    notificationTime:any;
    IsNotification:boolean=false;
    MarkRead:boolean=false;
    ModuleName:any;
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
          this.NotificationCount()
        }
    }
    async  NotificationCount() {
      this.IsNotification=false;
      this.ModuleName="";
        let url=await this.appService.getSignalRUrl();
        this.hubConnectionBuilder = new HubConnectionBuilder().withUrl(url).configureLogging(LogLevel.Information).build();
          this.hubConnectionBuilder.start().then(() => console.log('Connection started.......!')).catch(err => console.log('Error while connect with server'));
          this.hubConnectionBuilder.on('SendClassNotificationUser', (result: any) => {
            this.totalNotification = result.length;
            this.MarkRead=false;
            this.notificationList=[];
            for(var i=0;i<10;i++){
              this.IsNotification=true;
              this.ModuleName=result[i].split("@")[0];
              this.notificationList.push({className:result[i].split("@")[1],
                         timeSpan:result[i].split("@")[2],
                         affectedEvent:result[i].split("@")[3]});
                                  }
              console.log(result)
              console.log(this.notificationList)
              
            });
        }
        async MarkAsRead(is:boolean)
        {
          this.totalNotification=0;
          this.MarkRead=is;
        }
      }

