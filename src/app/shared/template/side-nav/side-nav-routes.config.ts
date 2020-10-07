import { SideNavInterface } from '../../interfaces/side-nav.type';
import {TranslateService} from '@ngx-translate/core'
import {SideMenuTitles} from '../../enums/side-menu-titles.enum'
export const ROUTES: SideNavInterface[] = [
    {
        path: '',
        title: SideMenuTitles.MyInformation,
        iconType: 'nzIcon',
        iconTheme: 'outline',
        icon: 'dashboard',
        isSecuredInfo: false,
        isTouched: false,
        submenu: []
    }
]