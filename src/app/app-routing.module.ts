import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MainComponent} from '@modules/main/main.component';
import {BlankComponent} from '@pages/blank/blank.component';
import {LoginComponent} from '@modules/login/login.component';
import {ProfileComponent} from '@pages/profile/profile.component';
import {RegisterComponent} from '@modules/register/register.component';
import {DashboardComponent} from '@pages/dashboard/dashboard.component';
import {AuthGuard} from '@guards/auth.guard';
import {NonAuthGuard} from '@guards/non-auth.guard';
import {ForgotPasswordComponent} from '@modules/forgot-password/forgot-password.component';
import {RecoverPasswordComponent} from '@modules/recover-password/recover-password.component';
import {SubMenuComponent} from '@pages/main-menu/sub-menu/sub-menu.component';
import { CategoriesComponent } from './categories/categories.component';
import { OrganizationComponent } from './organization/organization.component';
// import { SettingsComponent } from './settings/settings.component';
// import { RolesComponent } from './roles/roles.component';

// const routes: Routes = [
//     {
//         path: '',
//         component: MainComponent,
//         canActivate: [AuthGuard],
//         canActivateChild: [AuthGuard],
//         children: [
//             {
//                 path: 'profile',
//                 component: ProfileComponent
//             },
//             {
//                 path: 'blank',
//                 component: BlankComponent
//             },
//             {
//                 path: 'sub-menu-1',
//                 component: SubMenuComponent
//             },
//             {
//                 path: 'sub-menu-2',
//                 component: BlankComponent
//             },
//             {
//                 path: '',
//                 component: DashboardComponent
//             }
//         ]
//     },
//     {
//         path: 'login',
//         component: LoginComponent,
//         canActivate: [NonAuthGuard]
//     },
//     {
//         path: 'register',
//         component: RegisterComponent,
//         canActivate: [NonAuthGuard]
//     },
//     {
//         path: 'forgot-password',
//         component: ForgotPasswordComponent,
//         canActivate: [NonAuthGuard]
//     },
//     {
//         path: 'recover-password',
//         component: RecoverPasswordComponent,
//         canActivate: [NonAuthGuard]
//     },
//     {path: '**', redirectTo: ''}
// ];
const routes: Routes = [
    {
        path: '',
        component: MainComponent,
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        children: [
            {
                path: 'profile',
                component: ProfileComponent
            },
            {
                path: 'blank',
                component: BlankComponent
            },
            {
                path: 'sub-menu-1',
                component: SubMenuComponent
            },
            {
                path: 'sub-menu-2',
                component: BlankComponent
            },
            {
                path: '',
                component: DashboardComponent
            },
            {
                path:'categories',
                component:CategoriesComponent
            },
            {
                path:'organization',
                component:OrganizationComponent
            },
            // {
            //     path:'settings',
            //     component:SettingsComponent
            // },
            // {
            //     path:'roles',
            //     component:RolesComponent
            // },
            // {
            //     path:'permissions',
            //     component:PermissionsComponent
            // },
            // {
            //     path:'yearmaster',
            //     component:YearmasterComponent
            // },
            // {
            //     path:'session',
            //     component:SessionComponent
            // },
            // {
            //     path:'languages',
            //     component:ERPLanguageComponent
            // },
            // {
            //     path:'define-character',
            //     component:DefineCharacterComponent
            // },
            // {
            //     path:'extra-activities',
            //     component:ExtraActivityComponent
            // },
            // {
            //     path:'promotion',
            //     component:PromotionMasterComponent
            // },
            // {
            //     path:'last-result',
            //     component:LastResultComponent
            // },
            // {
            //     path:'mother-tongue',
            //     component:MotherTongueComponent
            // },
            // {
            //     path:'students-master',
            //     component:StudentsMasterComponent
            // },
            // {
            //     path:'chat-room',
            //     component:ChatRoomComponent
            // },
            // {
            //     path:'chat-home',
            //     component:ChatHomeComponent
            // },
            // {
            //     path:'text-bot',
            //     component:TextBotComponent
            // },
            // {
            //     path:'wings',
            //     component:WingsComponent
            // },
            // {
            //     path:'classes',
            //     component:ClassesComponent
            // },
            // {
            //     path:'section',
            //     component:SectionComponent
            // },
            // {
            //     path:'stationary-details',
            //     component:StationaryDetailsComponent
            // },
            // {
            //     path:'relate-class',
            //     component:RelateClassComponent
            // },
            // {
            //     path:'receipt-certificate',
            //     component:ReceiptCertificateComponent
            // },
            // {
            //     path:'receipt-certification-settings',
            //     component:ReceiptCertificationSettingsComponent
            // },
            // {
            //     path:'student-class-promotion',
            //     component:StudentClassPromotionComponent
            // },
            // {
            //     path:'gantt-chart',
            //     component:GanttChartComponent
            // },
            // {
            //     path:'frequency-reader',
            //     component:FrequencyReaderComponent
            // },
            // {
            //     path:'appointment',
            //     component:AppointmentComponent
            // },
            // {
            //     path:'enquiry',
            //     component:EnquiryComponent
            // },
            // {
            //     path:'prospectus-entry',
            //     component:ProspectusEntryComponent
            // }
        ]
    },
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [NonAuthGuard]
    },
    {
        path: 'register',
        component: RegisterComponent,
        canActivate: [NonAuthGuard]
    },
    {
        path: 'forgot-password',
        component: ForgotPasswordComponent,
        canActivate: [NonAuthGuard]
    },
    {
        path: 'recover-password',
        component: RecoverPasswordComponent,
        canActivate: [NonAuthGuard]
    },
    {path: '**', redirectTo: ''}
];
@NgModule({
    imports: [RouterModule.forRoot(routes, {})],
    exports: [RouterModule]
})
export class AppRoutingModule {}
