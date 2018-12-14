/**
 * @author    Ionic Bucket <ionicbucket@gmail.com>
 * @copyright Copyright (c) 2018
 * @license   Fulcrumy
 * 
 * This file represents a component of category form,
 * File path - ./pages/category/category-form/category-form.component'
 */

import { Inject, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Category } from '../../../models/category';
import { Upload } from '../../../models/upload';
import { CategoryService } from '../../../services/category/category.service';
import { UploadService } from '../../../services/upload/upload.service';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {

  // Category Object
  category: Category = new Category();

  // Selected File List
  selectedFiles: FileList;

  // Upload File
  currentUpload: Upload;

  constructor(private categoryService: CategoryService,
    private uploadService: UploadService,
    public dialogRef: MatDialogRef<CategoryFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    // Get Dialog Passing Data
    if (this.data) {
      this.category = this.data.data;
    }
  }

  ngOnInit() { }

  /**
   * --------------------------------------------------------
   * Create Category
   * --------------------------------------------------------
   */
  createCategory() {
    this.categoryService.createCategory(this.category);
    this.category = new Category(); // reset item
    this.dialogRef.close();
  }

  /**
   * --------------------------------------------------------
   * Update Specific Category
   * --------------------------------------------------------
   */
  updateCategory() {
    this.categoryService.updateCategory(this.category);
    this.category = new Category(); // reset item
    this.dialogRef.close();
  }

  /**
   * --------------------------------------------------------
   * Trigger For Every File Change 
   * --------------------------------------------------------
   */
  detectFiles(event) {
    this.selectedFiles = event.target.files;
    if (this.selectedFiles) {
      this.uploadSingle();
    }
  }

  /**
   * --------------------------------------------------------
   * Upload files to Firebase Cloud Storage
   * --------------------------------------------------------
   */
  uploadSingle() {
    let file = this.selectedFiles.item(0)
    this.currentUpload = new Upload(file);
    this.uploadService.pushUpload(this.currentUpload).then((data: any) => {
      this.category.image = data;
    })
  }
}
