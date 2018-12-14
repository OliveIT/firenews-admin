/**
 * @author    Ionic Bucket <ionicbucket@gmail.com>
 * @copyright Copyright (c) 2018
 * @license   Fulcrumy
 * 
 * This file represents a component list of Video
 * File path - ./pages/videos/video-list/video-list.component'
 */

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { ArticleService } from '../../../services/article/article.service';
import { CategoryService } from '../../../services/category/category.service';
import { Category } from '../../../models/category';
import { Video } from '../../../models/video';
import { VideoService } from '../../../services/video/video.service';
import { VideoDetailsComponent } from '../video-details/video-details.component';

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.scss']
})
export class VideoListComponent implements OnInit {

  // List of Observable Category
  categories: Observable<Category[]>;

  // List of Videos
  videoList: any = [];

  // List of All Videos
  allvideoList: any = [];

  // Video Details
  videoDetails: any;

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
    public dialog: MatDialog,
    public categoryService: CategoryService,
    public videoService: VideoService) {
  }

  /** Do any initialization */
  ngOnInit() {
    this.getCategories();
    this.getVideoArticles();

    // Search Latest Value Continuously
    Observable.combineLatest(this.startobs, this.endobs).subscribe((value) => {
      this.firequery(value[0], value[1]).subscribe((result) => {
        this.videoList = result;
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
   * Get Video Articles
   * --------------------------------------------------------
   */
  getVideoArticles() {
    this.videoService.getArticleList().subscribe((data) => {
      this.allvideoList = data;
      this.videoList = this.allvideoList;
    })
  }

  /**
   * --------------------------------------------------------
   * Load More Video Articles
   * --------------------------------------------------------
   */
  loadMore() {
    this.videoService.getMoreVideo().subscribe((data) => {
      this.videoList = [...this.videoList, ...data];
    })
  }

  /**
   * --------------------------------------------------------
   * Search Any Video Articles
   * --------------------------------------------------------
   */
  search($event) {
    let q = $event.target.value;
    if (q != '') {
      this.startAt.next(q);
      this.endAt.next(q + "\uf8ff");
    }
    else {
      this.videoList = this.allvideoList;
    }
  }

  /**
   * --------------------------------------------------------
   * Get Search Data
   * --------------------------------------------------------
   */
  firequery(start, end) {
    return this.videoService.searchResult(start, end);
  }

  /**
   * --------------------------------------------------------
   * Delete One Video
   * --------------------------------------------------------
   */
  delete(item: Video) {
    this.videoService.deleteArticle(item);
  }

  /**
   * --------------------------------------------------------
   * Open Edit Page For Specific Video Article
   * --------------------------------------------------------
   */
  edit(video: Video) {
    this.router.navigate(['/video'], { queryParams: { id: video.$key } });
  }

  /**
   * --------------------------------------------------------
   * Open Details of Video
   * --------------------------------------------------------
   */
  viewDetails(video) {

    // Get category
    this.categoryService.getCategoryByKey(video.category).then((data: any) => {

      // Open a dialog window by passing selected video data
      let dialogRef = this.dialog.open(VideoDetailsComponent, {
        width: '80%',
        height: '80%',
        data: {
          title: video.title,
          image: video.image,
          details: video.details,
          timestamp: video.timestamp,
          youtubeLink: video.youtubeLink,
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
   * Get Video Articles Of Selected Category
   * --------------------------------------------------------
   */
  getArticleByCategory(selectedCategory) {
    if (selectedCategory) {
      this.videoService.getArticleByCategory(selectedCategory).subscribe((data) => {
        this.allvideoList = data;
        this.videoList = this.allvideoList;
      })
    }
  }

  /**
   * --------------------------------------------------------
   * Redirect To Video Form Page
   * --------------------------------------------------------
   */
  gotoVideoFormPage(): void {
    this.router.navigateByUrl('/video');
  }
}
