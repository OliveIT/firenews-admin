/**
 * @author    Ionic Bucket <ionicbucket@gmail.com>
 * @copyright Copyright (c) 2018
 * @license   Fulcrumy
 * 
 * This file represents a component of video form,
 * File path - ./pages/videos/video-form/video-form.component'
 */

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Upload } from '../../../models/upload';
import { Category } from '../../../models/category';
import { Video } from '../../../models/video';
import { VideoService } from '../../../services/video/video.service';
import { CategoryService } from '../../../services/category/category.service';
import { UploadService } from '../../../services/upload/upload.service';

@Component({
  selector: 'app-video-form',
  templateUrl: './video-form.component.html',
  styleUrls: ['./video-form.component.scss']
})
export class VideoFormComponent implements OnInit {

  // Video Object
  video: Video = new Video();

  // List of Observable Category
  categories: Observable<Category[]>;

  // Selected File List
  selectedFiles: FileList;

  // Upload File
  currentUpload: Upload;

  constructor(private videoService: VideoService,
    private categoryService: CategoryService,
    private uploadService: UploadService,
    private route: ActivatedRoute,
    private router: Router) {

    // Check Route Query Params Continuously
    // If Exist Then Call getVideoArticle() method and
    // Video Update Form Will Be Open For Update This Specific Video.
    this.route.queryParams.subscribe(params => {
      this.video.$key = params.id;
      if (this.video.$key) {
        this.getVideoArticle();
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
   * Create a Video Article
   * --------------------------------------------------------
   */
  create() {
    this.videoService.createVideoArticle(this.video);
    this.video = new Video();
    this.video.details = '';
    this.router.navigateByUrl('/videos');
  }

  /**
   * --------------------------------------------------------
   * Update Specific Video Article
   * --------------------------------------------------------
   */
  update() {
    this.videoService.updateArticle(this.video);
    this.video = new Video();
    this.video.details = '';
    this.router.navigateByUrl('/videos');
  }

  /**
   * --------------------------------------------------------
   * Get Specific Video Article
   * --------------------------------------------------------
   */
  getVideoArticle() {
    this.videoService.getArticleByKey(this.video.$key).then((data: any) => {
      this.video = Object.assign(data, { $key: this.video.$key });
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
      this.video.image = data;
    })
  }

  /**
   * --------------------------------------------------------
   * Back to Videos List Page
   * --------------------------------------------------------
   */
  back() {
    this.router.navigateByUrl('/videos');
  }
}
