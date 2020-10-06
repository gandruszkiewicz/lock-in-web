import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { ROUTES } from './side-nav-routes.config';
import { ThemeConstantService } from '../../services/theme-constant.service';
import { TranslateService } from '@ngx-translate/core';
import { SideNavInterface } from '../../interfaces/side-nav.type';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';

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

    constructor( 
        private themeService: ThemeConstantService,
        private translateService: TranslateService,
        private authService: AuthenticationService,
        private router: Router) {}

    ngOnInit(): void {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
        this.translateService.get('SIDE_MENU')
        .subscribe((translations)=> {
            this.SIDE_MENU = translations
            this.my_information_menu_title = this.SIDE_MENU.MY_INFORMATION;
            this.menuItems.forEach(x =>{
                if(x.title === 'MY_INFORMATION'){
                    x.title = this.my_information_menu_title;

                }
            });
        })
        this.themeService.isMenuFoldedChanges.subscribe(isFolded => this.isFolded = isFolded);
        this.themeService.isExpandChanges.subscribe(isExpand => this.isExpand = isExpand);
        this.themeService.isSideNavDarkChanges.subscribe(isDark => this.isSideNavDark = isDark);

        this.authService.currentUser.subscribe(user =>{
            if(!user?.token){
                this.router.navigate(['/login']);
            }
        })
    }
    
    logoutClick(): void{
        localStorage.clear();
        this.router.navigate(['/login'])

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
