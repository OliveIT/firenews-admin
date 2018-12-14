/**
 * @author    Ionic Bucket <ionicbucket@gmail.com>
 * @copyright Copyright (c) 2018
 * @license   Fulcrumy
 * 
 * This file represents a provider of Menu Items,
 * File path - '../../services/menu-items/menu-items.service'
 */

import { Injectable } from '@angular/core';

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
}

/**
 * Side Menu List
 */
const MENUITEMS = [
  { state: 'dashboard', name: 'Dashboard', type: 'link', icon: 'dashboard' },
  { state: 'category', name: 'Category', type: 'link', icon: 'view_list' },
  { state: 'articles', name: 'Article', type: 'link', icon: 'library_books' },
  { state: 'videos', name: 'Video', type: 'link', icon: 'video_library' },
  { state: 'aboutus', name: 'About Us', type: 'link', icon: 'person_pin' },
  { state: 'contacts', name: 'Contact Us', type: 'link', icon: 'contacts' },
  { state: 'settings', name: 'Settings', type: 'link', icon: 'settings' },
];

@Injectable()

export class MenuItemsService {

  constructor() { }

  /**
   * Get Menu Items
   */
  getMenuitem(): Menu[] {
    return MENUITEMS;
  }
}
