import { Component } from '@angular/core';
import { ThemeConstantService } from '../../services/theme-constant.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-quick-view',
    templateUrl: './quick-view.component.html'
})



export class QuickViewComponent {
  
    selectedHeaderColor: string;
    isSideNavDark : boolean;
    isFolded : boolean;
    QUICK_VIEW: any;

    constructor( private themeService: ThemeConstantService,  private router: Router,
        private translateService: TranslateService) {}

    ngOnInit(): void {
        this.translateService.get('QUICK_VIEW').subscribe(translations =>{
            this.QUICK_VIEW = translations;
        })
        this.themeService.isMenuFoldedChanges.subscribe(isFolded => this.isFolded = isFolded);
        this.themeService.isSideNavDarkChanges.subscribe(isDark => this.isSideNavDark = isDark);
        this.themeService.selectedHeaderColor.subscribe(color => this.selectedHeaderColor = color);
    }

    changeHeaderColor() {
        this.themeService.changeHeaderColor(this.selectedHeaderColor)
    }

    toggleSideNavDark() {
        this.themeService.toogleSideNavDark(this.isSideNavDark);
    }

    toggleFold() {
        this.themeService.toggleFold(this.isFolded);
    }

    logoutClick(): void{
        localStorage.clear();
        this.router.navigate(['/login'])

    }

}

