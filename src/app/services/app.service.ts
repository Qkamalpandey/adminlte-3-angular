import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
//import {Gatekeeper} from 'gatekeeper-client-sdk';
import { HttpClient, HttpParams } from '@angular/common/http';
import moment from 'moment';
@Injectable({
    providedIn: 'root'
})
export class AppService {
    getProfile() {
        throw new Error('Method not implemented.');
    }
    url: string = '';
    user: any;
    requestParam: any;
    constructor(private router: Router, private toastr: ToastrService,private http: HttpClient) {
        console.log('-----' + window.location.hostname);
        if (window.location.hostname != 'localhost') {
          this.url = 'https://localhost:44337';//put live url here
        }
        else {
          this.url = 'https://localhost:44337';
        }
    }
  async  post(endpoint: string, body: any, reqOpts?: any) {
    debugger
    const token = localStorage.getItem('jwtToken');    
       this.requestParam = {
         headers: {
           'Access-Control-Allow-Origin': '*',
           'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
           'Content-Type': 'application/json',
           'Authorization': 'Bearer ' + token
         }
       };
   
       return  this.http.post(this.url + '/' + endpoint, body, this.requestParam);
     }
   async  loginpost(endpoint: string, body: any, reqOpts?: any) {
        this.requestParam = {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
            'Content-Type': 'application/json',
          }
        };
        return await this.http.post(this.url + '/' + endpoint, body, this.requestParam);; 
      }
      async  registerpost(endpoint: string, body: any, reqOpts?: any) {
        this.requestParam = {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
            'Content-Type': 'application/json',
          }
        };
        return await this.http.post(this.url + '/' + endpoint, body, this.requestParam);; 
      }
     async delete(endpoint: string, params?: any) {
         
        const token = localStorage.getItem('jwtToken'); 
        this.requestParam = {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          }
        };
        return  this.http.delete(this.url + '/' + endpoint + '/' + params);
      }
    async  get(endpoint: string, params?: any, reqOpts?: any) {
       
        const token = localStorage.getItem('jwtToken');
        this.requestParam = {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          }
        };
    
    
        if (!reqOpts) {
          reqOpts = {
            params: new HttpParams()
          };
        }
    
        // Support easy query params for GET requests
        if (params) {
          reqOpts.params = new HttpParams();
          for (let k in params) {
            reqOpts.params.set(k, params[k]);
          }
        }
    
        return await this.http.get(this.url + '/' + endpoint, this.requestParam);
      }


   

  

   

    // async getProfile() {
    //     try {
    //         this.user = await Gatekeeper.getProfile();
    //     } catch (error) {
    //         this.logout();
    //         throw error;
    //     }
    // }
async getSignalRUrl()
{
  return 'https://localhost:44337/signalR';
}
async ConvertDateMMDDYYY(date,dateFormat)
  {
    return moment(date).format(dateFormat);
  }
    logout() {
        localStorage.removeItem('jwtToken');
        localStorage.removeItem("UserName");
        localStorage.removeItem("AppId");
        localStorage.removeItem("UserType");
        localStorage.removeItem("User_ID");
        localStorage.removeItem("expiration");
        this.user = null;
        this.router.navigate(['/login']);
    }
}