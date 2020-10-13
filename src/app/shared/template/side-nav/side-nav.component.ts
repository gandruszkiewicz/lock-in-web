import { Component, OnInit, AfterViewChecked, ChangeDetectorRef, ChangeDetectionStrategy, AfterViewInit, Input } from '@angular/core';
import { ROUTES } from './side-nav-routes.config';
import { ThemeConstantService } from '../../services/theme-constant.service';
import { TranslateService } from '@ngx-translate/core';
import { SideNavInterface } from '../../interfaces/side-nav.type';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { SecuredInformationService } from '../../services/secured-information/secured-information.service';
import { SideMenuTitles } from '../../enums/side-menu-titles.enum';
import { SecuredInformationResponse } from '../../interfaces/responses/secured-information-response.type';

@Component({
    selector: 'app-sidenav',
    templateUrl: './side-nav.component.html'
})

export class SideNavComponent implements OnInit{

    public menuItems: SideNavInterface[]
    isFolded : boolean;
    isSideNavDark : boolean;
    isExpand : boolean;
    SIDE_MENU: any;
    my_information_menu_title: string;
    @Input()
    securedInfos: SecuredInformationResponse[];
    UserId: string;

    constructor( 
        private themeService: ThemeConstantService,
        private translateService: TranslateService,
        private authService: AuthenticationService,
        private securedInfoService: SecuredInformationService,
        private router: Router,
        private cdr: ChangeDetectorRef) {}

    async ngOnInit(): Promise<void> {

       await this.authService.currentUser.subscribe(user =>{
            if(!user?.token){
                this.router.navigate(['/login']);
            }else{
                this.UserId = user.userId;
                this.processSideMenuContent();
            }
        })

        let securedInfoMenuItems: SideNavInterface[] = 
        new Array<SideNavInterface>();
        this.securedInfos.forEach(item =>{
            securedInfoMenuItems.push({
                title : item.name,
                iconType: 'nzIcon',
                iconTheme: 'outline',
                icon : 'lock',
                submenu: [],
                path: `secured-info/edit`,
                isSecuredInfo: true,
                isTouched: false,
                id: item.id
            })
        });
        this.menuItems = ROUTES.filter(menuItem => menuItem);
        this.translateService.get('SIDE_MENU')
        .subscribe((translations)=> {
            this.SIDE_MENU = translations
            this.my_information_menu_title = this.SIDE_MENU.MY_INFORMATION;
            this.menuItems.forEach(x =>{
                if(x.title === SideMenuTitles.MyInformation){
                    x.title = this.my_information_menu_title;
                    x.submenu = securedInfoMenuItems;

                }
            });
        })
    }

    async processSideMenuContent(){
        let securedInfoMenuItems: SideNavInterface[] = 
        new Array<SideNavInterface>();
        await this.securedInfoService.getByUser(this.UserId).subscribe(response =>{
            this.securedInfos = response;
            response.forEach(item =>{
                securedInfoMenuItems.push({
                    title : item.name,
                    iconType: 'nzIcon',
                    iconTheme: 'outline',
                    icon : 'lock',
                    submenu: [],
                    path: `secured-info/edit`,
                    isSecuredInfo: true,
                    isTouched: false,
                    id: item.id
                })
            })
        },null,() =>{
            this.menuItems = ROUTES.filter(menuItem => menuItem);
            this.translateService.get('SIDE_MENU')
            .subscribe((translations)=> {
                this.SIDE_MENU = translations
                this.my_information_menu_title = this.SIDE_MENU.MY_INFORMATION;
                this.menuItems.forEach(x =>{
                    if(x.title === SideMenuTitles.MyInformation){
                        x.title = this.my_information_menu_title;
                        x.submenu = securedInfoMenuItems;
    
                    }
                });
            })
            this.themeService.isMenuFoldedChanges.subscribe(isFolded => this.isFolded = isFolded);
            this.themeService.isExpandChanges.subscribe(isExpand => this.isExpand = isExpand);
            this.themeService.isSideNavDarkChanges.subscribe(isDark => this.isSideNavDark = isDark);
        })
    }

    onSubmenuClick(subMenuItem: SideNavInterface){
        subMenuItem.isTouched = true;
        this.cdr.markForCheck();
       if(subMenuItem.isSecuredInfo){
           let selectedSecuredInfo = this.securedInfos.find(item => item.id === subMenuItem.id)
           this.securedInfoService.passSelectedSecuredInfo(selectedSecuredInfo);
           this.router.navigate([subMenuItem.path])
       }
    }
    

    closeMobileMenu(): void {
        if (window.innerWidth < 992) {
            this.isFolded = false;
            this.isExpand = !this.isExpand;
            this.themeService.toggleExpand(this.isExpand);
            this.themeService.toggleFold(this.isFolded);
        }
    }
}
