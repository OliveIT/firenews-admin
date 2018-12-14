/**
 * @author    Ionic Bucket <ionicbucket@gmail.com>
 * @copyright Copyright (c) 2018
 * @license   Fulcrumy
 * 
 * This file represents a component of article form,
 * File path - ./pages/articles/article-details/article-details.component'
 */

import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from '../../../models/article';
import { Upload } from '../../../models/upload';
import { Category } from '../../../models/category';
import { ArticleService } from '../../../services/article/article.service';
import { UploadService } from '../../../services/upload/upload.service';
import { CategoryService } from '../../../services/category/category.service';

@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.scss']
})
export class ArticleFormComponent implements OnInit {

  // Article Object
  article: Article = new Article();

  // List of Observable Category
  categories: Observable<Category[]>;

  // Selected File List
  selectedFiles: FileList;

  // Upload File
  currentUpload: Upload;

  constructor(private articleService: ArticleService,
    private categoryService: CategoryService,
    private uploadService: UploadService,
    private route: ActivatedRoute,
    private router: Router) {
    // Check Route Query Params Continuously
    // If Exist Then Call getArticle() method and
    // Article Update Form Will Be Open For Update This Specific Article.
    this.route.queryParams.subscribe(params => {
      this.article.$key = params.id;
      if (this.article.$key) {
        this.getArticle();
      }
    });
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
   * Create a Article
   * --------------------------------------------------------
   */
  create() {
    this.articleService.createArticle(this.article);
    this.article = new Article();
    this.article.details = '';
    this.router.navigateByUrl('/articles');
  }

  /**
   * --------------------------------------------------------
   * Update Specific Article
   * --------------------------------------------------------
   */
  update() {
    this.articleService.updateArticle(this.article);
    this.article = new Article();
    this.article.details = '';
    this.router.navigateByUrl('/articles');
  }

  /**
   * --------------------------------------------------------
   * Get Specific Article
   * --------------------------------------------------------
   */
  getArticle() {
    this.articleService.getArticleByKey(this.article.$key).then((data: any) => {
      this.article = Object.assign(data, { $key: this.article.$key });
    }).catch(err => {
      console.log(err);
    })
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
      this.article.image = data;
    })
  }

  /**
   * --------------------------------------------------------
   * Back to Article List Page
   * --------------------------------------------------------
   */
  back() {
    this.router.navigateByUrl('/articles');
  }
}
