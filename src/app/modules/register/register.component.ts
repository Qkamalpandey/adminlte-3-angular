import {
    Component,
    OnInit,
    Renderer2,
    OnDestroy,
    HostBinding
} from '@angular/core';
import {UntypedFormGroup, UntypedFormControl, Validators} from '@angular/forms';
import {AppService} from '@services/app.service';
import {ToastrService} from 'ngx-toastr';
import { first } from 'rxjs';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {
    @HostBinding('class') class = 'register-box';

    public registerForm: UntypedFormGroup;
    public isAuthLoading = false;
    public isGoogleLoading = false;
    public isFacebookLoading = false;
    public ClientUserName:any;
    public ClientPassword:any;
    public retypePassword:any;
    IsPasswordMatched: boolean=false;
    constructor(
        private renderer: Renderer2,
        private toastr: ToastrService,
        private appService: AppService
    ) {}

    ngOnInit() {
        this.renderer.addClass(
            document.querySelector('app-root'),
            'register-page'
        );
        this.registerForm = new UntypedFormGroup({
            ClientUserName: new UntypedFormControl(this.ClientUserName, Validators.required),
            ClientPassword: new UntypedFormControl(this.ClientPassword, [Validators.required]),
            retypePassword: new UntypedFormControl(this.retypePassword, [Validators.required])
        });
    }

    async registerByAuth() {
        // if (this.registerForm.valid) {
        //     this.isAuthLoading = true;
        //     let param={
        //         ClientUserName:this.ClientUserName,
        //         ClientPassword:this.ClientPassword
        //     };
        //     await this.appService.registerpost("api/v1/Clients/Add",param);
        //     this.isAuthLoading = false;
        // } else {
        //     this.toastr.error('Form is not valid!',"Error:");
        // }
        if (this.registerForm.valid) {
            this.isAuthLoading = true;
            let param={
                        ClientUserName:this.ClientUserName,
                        ClientPassword:this.ClientPassword
                    };
            (await this.appService.registerpost('api/v1/Clients/Add', param)).pipe(first()).subscribe(
                data => {
                  
                  if (data!=null && data!=undefined) {
                   this.toastr.success(`User ${this.ClientUserName} has been registered successfuly.!`,"Success:")
                   this.ngOnReset();
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

   

    ngOnValidatePassword(){
        debugger
     if(this.ClientPassword!==undefined && this.ClientPassword!=="" && this.ClientPassword!==this.retypePassword)
     {
        this.IsPasswordMatched=false;
        this.toastr.error('Password does not matched!',"Error:");
     }
     else if(this.ClientPassword!==undefined && this.ClientPassword!=="" && this.ClientPassword===this.retypePassword)
     {
        this.IsPasswordMatched=true;
        this.toastr.success('Password matched successfully..!',"Success:");
     }
    }
    ngOnDestroy() {
        this.renderer.removeClass(
            document.querySelector('app-root'),
            'register-page'
        );
    }
    ngOnReset()
    {
        this.ClientUserName="";
        this.ClientPassword="";
        this.retypePassword="";
    }
}
