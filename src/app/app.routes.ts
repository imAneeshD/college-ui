import { Routes } from '@angular/router';

import { Layout } from './layout/layout';
import { Home } from './components/home/home';
import { RegistrationList } from './components/registration-list/registration-list';
import { StudentDetail } from './components/student-detail/student-detail';
import { CourseChart } from './components/course-chart/course-chart';
import { RegistrationForm } from './components/registration-form/registration-form';

export const routes: Routes = [
    {
        path: '',
        component: Layout,
        children: [
            { path: '', component: Home }, 
            { path: 'register', component: RegistrationForm },
            { path: 'list', component: RegistrationList },
            { path: 'student/:id', component: StudentDetail },
            { path: 'chart', component: CourseChart }
        ]
    }
];
