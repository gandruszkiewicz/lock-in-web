import { Routes, ROUTES } from '@angular/router';
import { MyInformationsComponent } from 'src/app/my-informations/my-informations.component';

export const CommonLayout_ROUTES: Routes = [
    {
        path: '',
        children: CommonLayout_ROUTES_Children()
    } 
];

function CommonLayout_ROUTES_Children(): Routes {
    return [
        {
            path: '',
            component: MyInformationsComponent,
            data: {
                title: 'Moje Informacje',
                headerDisplay: "none"
            }
        }
    ];
}


