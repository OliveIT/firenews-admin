/**
 * @author    Ionic Bucket <ionicbucket@gmail.com>
 * @copyright Copyright (c) 2018
 * @license   Fulcrumy
 * 
 * This file represents a component list of category
 * File path - ./pages/category/category-list/category-list.component'
 */

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { Category } from '../../../models/category';
import { CategoryService } from '../../../services/category/category.service';
import { CategoryFormComponent } from '../../../pages/category/category-form/category-form.component';


@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {

  // List of Observable Category
  categories: Observable<Category[]>;

  constructor(public categoryService: CategoryService,
    public dialog: MatDialog) {
  }

  /** Do any initialization */
  ngOnInit() {
    this.getCategories();
  }

  /**
   * --------------------------------------------------------
   * Get All Categories
   * --------------------------------------------------------
   */
  getCategories() {
    this.categories = this.categoryService.getCategoriesList();
  }

  /**
   * --------------------------------------------------------
   * Delete One Category
   * --------------------------------------------------------
   */
  deleteCategory(item: Category) {
    this.categoryService.deleteCategory(item);
  }

  /**
   * --------------------------------------------------------
   * Open Dialog Box for Edit Category
   * --------------------------------------------------------
   */
  editCategory(item: Category) {
    let dialogRef = this.dialog.open(CategoryFormComponent, {
      width: '400px',
      data: { data: item }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  /**
   * --------------------------------------------------------
   * Open Dialog Box for Add New Category
   * --------------------------------------------------------
   */
  openDialog(): void {
    let dialogRef = this.dialog.open(CategoryFormComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
