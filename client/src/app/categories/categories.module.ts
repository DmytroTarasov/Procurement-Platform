import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { CategoriesListComponent } from './categories-list/categories-list.component';
import { CreateCategoryModalComponent } from './create-category-modal/create-category-modal.component';

@NgModule({
  declarations: [
    CategoriesListComponent,
    CreateCategoryModalComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    RouterModule.forChild([
      { path: '', component: CategoriesListComponent },
    ])
  ]
})
export class CategoriesModule { }
