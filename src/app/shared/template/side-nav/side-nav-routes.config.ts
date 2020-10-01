import { SideNavInterface } from '../../interfaces/side-nav.type';
import {TranslateService} from '@ngx-translate/core'
export const ROUTES: SideNavInterface[] = [
    {
        path: '',
        title:'MY_INFORMATION',
        iconType: 'nzIcon',
        iconTheme: 'outline',
        icon: 'dashboard',
        submenu: []
    }
]