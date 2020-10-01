import { Component } from '@angular/core';
import { ROUTES } from './side-nav-routes.config';
import { ThemeConstantService } from '../../services/theme-constant.service';
import { TranslateService } from '@ngx-translate/core';
import { SideNavInterface } from '../../interfaces/side-nav.type';

@Component({
    selector: 'app-sidenav',
    templateUrl: './side-nav.component.html'
})

export class SideNavComponent{

    public menuItems: SideNavInterface[]
    isFolded : boolean;
    isSideNavDark : boolean;
    isExpand : boolean;
    my_information_menu_title: string;

    constructor( 
        private themeService: ThemeConstantService,
        private translateService: TranslateService) {}

    ngOnInit(): void {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
        this.translateService.get('SIDE_MENU.MY_INFORMATION')
        .subscribe((text: string)=> {
            this.my_information_menu_title = text;
            this.menuItems.forEach(x =>{
                if(x.title === 'MY_INFORMATION'){
                    x.title = this.my_information_menu_title;

                }
            });
        })
        this.themeService.isMenuFoldedChanges.subscribe(isFolded => this.isFolded = isFolded);
        this.themeService.isExpandChanges.subscribe(isExpand => this.isExpand = isExpand);
        this.themeService.isSideNavDarkChanges.subscribe(isDark => this.isSideNavDark = isDark);
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
