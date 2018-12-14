/**
 * @author    Ionic Bucket <ionicbucket@gmail.com>
 * @copyright Copyright (c) 2018
 * @license   Fulcrumy
 * 
 * This file represents a component of Article List
 * File path - ./pages/articles/article-list/article-list.component'
 */

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Rx';
import { Category } from '../../../models/category';
import { Article } from '../../../models/article';
import { ArticleService } from '../../../services/article/article.service';
import { CategoryService } from '../../../services/category/category.service';
import { ArticleDetailsComponent } from '../article-details/article-details.component';


@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent implements OnInit {

  // List of Observable Category
  categories: Observable<Category[]>;

  // List of Articles
  articles: any = [];

  // List of all Articles
  allarticles: any = [];

  // Article Details
  articleDetails: any;

  // Selected Category
  selectedCategory: any;

  // Input Search Field
  searchInput: string;

  // Keep Track of Last page
  startAt = new Subject();
  endAt = new Subject();
  startobs = this.startAt.asObservable();
  endobs = this.endAt.asObservable();

  constructor(private router: Router,
    public articleService: ArticleService,
    public dialog: MatDialog,
    public categoryService: CategoryService) { }


  /** Do any initialization */
  ngOnInit() {
    this.getCategories();
    this.getArticles();

    // Search Latest Value Continuously
    Observable.combineLatest(this.startobs, this.endobs).subscribe((value) => {
      this.firequery(value[0], value[1]).subscribe((result) => {
        this.articles = result;
      })
    })
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
   * Get Articles
   * --------------------------------------------------------
   */
  getArticles() {
    this.articleService.getArticleList().subscribe((data) => {
      this.allarticles = data;
      this.articles = this.allarticles;
    })
  }

  /**
   * --------------------------------------------------------
   * Load More Articles
   * --------------------------------------------------------
   */
  loadMore() {
    this.articleService.getMoreArticle().subscribe((data) => {
      this.articles = [...this.articles, ...data];
    })
  }

  /**
   * --------------------------------------------------------
   * Search Any Articles
   * --------------------------------------------------------
   */
  search($event) {
    let q = $event.target.value;
    if (q != '') {
      this.startAt.next(q);
      this.endAt.next(q + "\uf8ff");
    }
    else {
      this.articles = this.allarticles;
    }
  }

  /**
   * --------------------------------------------------------
   * Get Search Data
   * --------------------------------------------------------
   */
  firequery(start, end) {
    return this.articleService.searchResult(start, end);
  }

  /**
   * --------------------------------------------------------
   * Delete One Article
   * --------------------------------------------------------
   */
  delete(item: Article) {
    this.articleService.deleteArticle(item);
  }

  /**
   * --------------------------------------------------------
   * Open Edit Page For Specific Article
   * --------------------------------------------------------
   */
  edit(article: Article) {
    this.router.navigate(['/article'], { queryParams: { id: article.$key } });
  }

  /**
   * --------------------------------------------------------
   * Open Details of Article
   * --------------------------------------------------------
   */
  viewDetails(article) {

    // Get category
    this.categoryService.getCategoryByKey(article.category).then((data: any) => {

      // Open a dialog window by passing selected article data
      let dialogRef = this.dialog.open(ArticleDetailsComponent, {
        width: '80%',
        height: '80%',
        data: {
          title: article.title,
          image: article.image,
          details: article.details,
          timestamp: article.timestamp,
          category: data.name
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
      });
    }).catch((err) => {
      console.log(err);
    });
  }

  /**
   * --------------------------------------------------------
   * Get Articles Of Selected Category
   * --------------------------------------------------------
   */
  getArticleByCategory(selectedCategory) {
    if (selectedCategory) {
      this.articleService.getArticleByCategory(selectedCategory).subscribe((data) => {
        this.allarticles = data;
        this.articles = this.allarticles;
      })
    }
  }

  /**
   * --------------------------------------------------------
   * Redirect To Article Form Page
   * --------------------------------------------------------
   */
  gotoArticleFormPage(): void {
    this.router.navigateByUrl('/article');
  }
}

