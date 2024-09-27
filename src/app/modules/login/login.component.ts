import {
    Component,
    OnInit,
    OnDestroy,
    Renderer2,
    HostBinding
} from '@angular/core';
import {UntypedFormGroup, UntypedFormControl, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {AppService} from '@services/app.service';
import { first } from 'rxjs';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
    @HostBinding('class') class = 'login-box';
    public loginForm: UntypedFormGroup;
    public isAuthLoading = false;
    public isGoogleLoading = false;
    public isFacebookLoading = false;

    constructor(
        private renderer: Renderer2,
        private toastr: ToastrService,
        private appService: AppService,
        private router: Router
    ) {}

    ngOnInit() {
        this.renderer.addClass(
            document.querySelector('app-root'),
            'login-page'
        );
        this.loginForm = new UntypedFormGroup({
            UserName: new UntypedFormControl(null, Validators.required),
            Password: new UntypedFormControl(null, Validators.required)
        });
    }

    async loginByAuth() {
        debugger
        if (this.loginForm.valid) {
            this.isAuthLoading = true;
            (await this.appService.loginpost('api/Authentication/Auth', this.loginForm.value)).pipe(first()).subscribe(
                data => {
                  
                  if (data!=null && data!=undefined) {
                   localStorage.setItem("jwtToken", data["token"]);
                   localStorage.setItem("UserName", data["userName"]);
                   localStorage.setItem("UserType", data["userType"]);
                   localStorage.setItem("User_ID", data["user_ID"]);
                   localStorage.setItem("AppId", data["appId"]);
                   localStorage.setItem("expiration", data["expiration"]);
                   //console.log(data)
                   this.router.navigate(['/dashboard']);
                  }
                  
                },
                error => {
                  window.scroll(0, 0);
                  this.toastr.error(error.message,"Server Down!");
                }
              );
            this.isAuthLoading = false;
        } else {
            this.toastr.error('Form is not valid!',"Error:");
        }
    }

  

    ngOnDestroy() {
        this.renderer.removeClass(
            document.querySelector('app-root'),
            'login-page'
        );
    }
}
