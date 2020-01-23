import { Component } from '@angular/core';

import { ReportPage } from '../report/report';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
   userid=localStorage.getItem('email');
  tab1Root = HomePage;
  tab2Root = ReportPage;
  tab3Root = ContactPage;
  tabsEnabled: any ;

  constructor() {

  }
   ngOnInit() {
   this.enableTabs();
  }
 
  enableTabs() {
      if (this.userid === "charan.gangam9@gmail.com") {
        this.tabsEnabled = true;
       
        return this.tabsEnabled
    }
    else {
        this.tabsEnabled = false;
        
        return this.tabsEnabled
    }  
  } 
}
