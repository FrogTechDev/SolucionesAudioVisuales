import {Component, ViewChild, AfterViewInit} from '@angular/core';
import {AppComponent} from './app.component';
import {ScrollPanel} from 'primeng/primeng';

@Component({
    selector: 'app-rightpanel',
    template: `
        <div class="layout-rightpanel" [ngClass]="{'layout-rightpanel-active': app.rightPanelActive}" (click)="app.onRightPanelClick()">
            <p-scrollPanel #scrollRightPanel [style]="{height: '100%'}">
              <div class="layout-rightpanel-wrapper">
                <!--<div class="layout-rightpanel-header">
                    <div class="weather-day">Header</div>
                </div>-->

                <div class="layout-rightpanel-content">
                    <h1>Content</h1>
                </div>
              </div>
            </p-scrollPanel>
        </div>
    `
})
export class AppRightpanelComponent implements AfterViewInit {

    @ViewChild('scrollRightPanel') rightPanelMenuScrollerViewChild: ScrollPanel;

    constructor(public app: AppComponent) {}

    ngAfterViewInit() {
      setTimeout(() => {this.rightPanelMenuScrollerViewChild.moveBar(); }, 100);
    }
}
