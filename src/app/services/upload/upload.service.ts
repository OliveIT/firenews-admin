/**
 * @author    Ionic Bucket <ionicbucket@gmail.com>
 * @copyright Copyright (c) 2017
 * @license   Fulcrumy
 * 
 * This file represents a provider of Upload Image in Firebase Storage
 * File path - '../../services/upload/upload.service'
 * 
 * File uploading to Firebase Cloude Storage - https://firebase.google.com/docs/storage/web/upload-files
 */

import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';
import { Upload } from '../../models/upload';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UploadService {

  // Base Path of Storage Folder/Directory
  basePath = 'uploads';

  constructor(private db: AngularFireDatabase) { }

  pushUpload(upload: Upload) {
    let promise = new Promise((resolve, reject) => {

      // storage reference
      const storageRef = firebase.storage().ref();

      // Create a custom filename
      const filename = Math.floor(Date.now() / 1000);

      // Upload the file and metadata
      const uploadTask = storageRef.child(`${this.basePath}/${filename + '-' + upload.file.name}`).put(upload.file);

      // Register three observers:
      // 1. 'state_changed' observer, called any time the state changes
      // 2. Error observer, called on failure
      // 3. Completion observer, called on successful completion
      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot: firebase.storage.UploadTaskSnapshot) => {
          // upload in progress
          const snap = snapshot;
          upload.progress = (snap.bytesTransferred / snap.totalBytes) * 100
        },
        (error) => {
          // Handle unsuccessful uploads
          console.log(error);
        },
        () => {
          // Handle successful uploads on complete
          if (uploadTask.snapshot.downloadURL) {
            upload.url = uploadTask.snapshot.downloadURL;
            upload.name = upload.file.name;
            resolve(upload.url); // Resolve Image URL
          } else {
            reject('No download URL!');
            console.error('No download URL!');
          }
        },
      );
    });
    return promise;
  }
}
