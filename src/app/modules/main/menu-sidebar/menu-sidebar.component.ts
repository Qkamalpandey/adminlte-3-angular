import {AppState} from '@/store/state';
import {UiState} from '@/store/ui/state';
import {Component, HostBinding, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppService} from '@services/app.service';
import {Observable} from 'rxjs';

const BASE_CLASSES = 'main-sidebar elevation-4';
@Component({
    selector: 'app-menu-sidebar',
    templateUrl: './menu-sidebar.component.html',
    styleUrls: ['./menu-sidebar.component.scss']
})
export class MenuSidebarComponent implements OnInit {
    @HostBinding('class') classes: string = BASE_CLASSES;
    public ui: Observable<UiState>;
    public user;
    public menu = MENU;

    constructor(
        public appService: AppService,
        private store: Store<AppState>
    ) {}

    ngOnInit() {
        this.ui = this.store.select('ui');
        this.ui.subscribe((state: UiState) => {
            this.classes = `${BASE_CLASSES} ${state.sidebarSkin}`;
        });
        this.user = localStorage.getItem('UserName');
    }
}

export const MENU = [
    {
        name: 'Dashboard',
        iconClasses: 'fas fa-tachometer-alt',
        path: ['/']
    },
    {
        name: 'Masters',
        iconClasses: 'fas fa-desktop',        
        children: [
            {
                name: 'Categories',
                iconClasses: 'far fa-building',
                path: ['/categories']
            },
            {
                name: 'Organization',
                iconClasses: 'fa fa-university',
                path: ['/organization']
            },
            {
                name: 'App Settings',
                iconClasses: 'fa fa-cogs',
                path: ['/settings']
            },
            {
                name: 'Roles',
                iconClasses: 'fa fa-address-book',
                path: ['/roles']
            },
            {
                name: 'Permissions',
                iconClasses: 'fa fa-lock',
                path: ['/permissions']
            },
            {
                name: 'Formates',
                iconClasses: 'fa fa-fas fa-file-alt',
                path: ['/receipt-certificate']
            }
            // {https://fontawesome.com/v4/icons/
            //     name: 'Sub Menu',
            //     iconClasses: 'far fa-address-book',
            //     path: ['/sub-menu-1']
            // },
            // {
            //     name: 'Blank',
            //     iconClasses: 'fas fa-file',
            //     path: ['/sub-menu-2']
            // }
        ]
    },
    {
        name: 'Online Classes',
        iconClasses: 'fas fa-chalkboard-teacher',
        children:[
            {
                name: 'Chat Home',
                iconClasses: 'fas fa-video',
                path: ['/chat-home']
            },
             {
                 name: 'Chat Room',
                 iconClasses: 'fas fa-braille',
                 path: ['/chat-room']
             },
             {
                name: 'Text Bot',
                iconClasses: 'fas fa-comment-dots',
                path: ['/text-bot'],
                // data: {
                //     externalUrl: "http://localhost:4201/welcome"
                //   }
            },
            {
                name: 'Meetings',
                iconClasses: 'fas fa-video-slash',
                path: ['/appointment'],
               
            },
        ]
        },
        {
        name: 'Admission Master',
        iconClasses: 'fa fa-id-card',
        children:[
           
            {
                name: 'Year Master',
                iconClasses: 'far fa-calendar-alt',
                path: ['/yearmaster']
            },
            {
                name: 'Session Master',
                iconClasses: 'fa fa-bookmark',
                path: ['/session']
            },
            {
                name: 'Stationary Details',
                iconClasses: 'fa fa-paperclip',
                path: ['/stationary-details']
            },
            {
                name: 'Students/Staff',
                iconClasses: 'fa fa-user',
                path: ['/students-master']
            },
            {
                name: 'Enquiry',
                iconClasses: 'fa fa-question',
                path: ['/enquiry']
            },
            {
                name: 'Prospectus Entry',
                iconClasses: 'fa fa-file-pdf',
                path: ['/prospectus-entry']
            },
        ]
        
    },
    {
        name: ' Class Details',
        iconClasses: 'fas fa-microscope',
        children:[
          
            {
                name: 'Define Wing',
                iconClasses: 'fa fa-cube',
                path: ['/wings']
            },
            {
                name: 'Define Class',
                iconClasses: 'fas fa-book-reader',
                path: ['/classes']
            },
            {
                name: 'Define Section',
                iconClasses: 'fas fa-atom',
                path: ['/section']
            },
            {
                name: 'Relate Class/Section',
                iconClasses: '	fas fa-theater-masks',
                path: ['/relate-class']
            },
        ]
        
    },
    {
        name: ' TC Details Master',
        iconClasses: 'fa fa-graduation-cap',
        children:[
          
            {
                name: 'Languages',
                iconClasses: 'fa fa-language',
                path: ['/languages']
            },
            {
                name: 'Extra Activities',
                iconClasses: 'fa fa-futbol',
                path: ['/extra-activities']
            },
            {
                name: 'Define Character',
                iconClasses: 'fa fa-gavel',
                path: ['/define-character']
            },
            {
                name: 'Promotion Master',
                iconClasses: 'fa fa-bullhorn',
                path: ['/promotion']
            },
            {
                name: 'Last Result',
                iconClasses: 'fa fa-trophy',
                path: ['/last-result']
            },
            {
                name: 'Mother Tongue',
                iconClasses: 'fa fa-paw',
                path: ['/mother-tongue']
            },
           
        ]
        
    },
    {
        name: 'Admission Settings',
        iconClasses: 'fa fa-folder-open',
        children:[
          
            {
                name: 'Receipt Settings',
                iconClasses: 'fa fa-coffee',
                path: ['/receipt-certification-settings']
            },
            {
                name: 'Students Class Promotion',
                iconClasses: 'fas fa-graduation-cap',
                path: ['/student-class-promotion']
            },
            {
                name: 'Task Management',
                iconClasses: 'fas fa-code-branch',
                path: ['/gantt-chart']
            },
           
        ]
        
    },
];
