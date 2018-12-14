import { ChangeDetectorRef, Component, NgZone, OnDestroy, ViewChild, HostListener, Directive, AfterViewInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { MenuItemsService } from '../../../services/menu-items/menu-items.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: []
})
export class AppSidebarComponent {
  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, public menuItems: MenuItemsService) {
    this.mobileQuery = media.matchMedia('(min-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

}