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
import { SecuredInformationStoreService } from '../../services/secured-information/secured-information-store.service';

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
    securedInfos: SecuredInformationResponse[];
    UserId: string;

    constructor( 
        private themeService: ThemeConstantService,
        private translateService: TranslateService,
        private authService: AuthenticationService,
        private securedInfoService: SecuredInformationService,
        private router: Router,
        private cdr: ChangeDetectorRef,
        private securedInfoStore: SecuredInformationStoreService) {}

    async ngOnInit(): Promise<void> {

       await this.authService.currentUser.subscribe(user =>{
            if(!user?.token){
                this.router.navigate(['/login']);
            }else{
                this.UserId = user.userId;
                this.securedInfoStore.loadData();
                this.processSideMenuContent();
            }
        })
    }

    processSideMenuContent(){
        let securedInfoMenuItems: SideNavInterface[] = 
        new Array<SideNavInterface>();
        this.securedInfoStore.secureInformations$.subscribe(securedInfos =>{
            this.securedInfos = securedInfos;
            securedInfoMenuItems.splice(0, securedInfoMenuItems.length);
            securedInfos.forEach(item =>{
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
                        x.submenu = securedInfoMenuItems
    
                    }
                });
            })
        })
    }

    onSubmenuClick(subMenuItem: SideNavInterface){
        subMenuItem.isTouched = true;
        this.cdr.markForCheck();
       if(subMenuItem.isSecuredInfo){
           let selectedSecuredInfo = this.securedInfos.find(item => item.id === subMenuItem.id)
           this.securedInfoStore.selectedSecuredInfo = selectedSecuredInfo;
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
