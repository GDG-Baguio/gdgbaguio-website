import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from 'src/app/core/services/authentication.service';

import * as mdc from 'material-components-web';
import { MDCRipple } from '@material/ripple';
import { MDCTextField } from '@material/textfield';
import { User } from 'src/app/core/model/user.model';

@Component({
  selector: 'site-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {
  gdgbaguio_logo = '../../assets/images/gdgbaguio-logo.png';
  // showSignInbutton: boolean;
  // c: any;
  usr: User;

  constructor(public auth: AuthenticationService) { }

  ngOnInit() {
    this.auth.user$.subscribe(
      async user => {
        this.usr = user;
        await console.log('this.usr', this.usr);
        // ACCOUNT ICON BUTTON
        const accountIconButton = <HTMLButtonElement>document.querySelector('#account-button');
        console.log('ACCOUNT ICON BUTTON', accountIconButton);
        const accountMenu = <HTMLDivElement>document.querySelector('#account-mdc-menu');
        console.log('ACCOUNT DIV', accountMenu);
        // const accounMDCMenu = new mdc.menu.MDCMenu(accountMenu);
        // console.log('accounMDCMenu', accounMDCMenu);
        // accountIconButton.addEventListener('click', (event) => {
        //   accounMDCMenu.open = !accounMDCMenu.open;
        //   accounMDCMenu.setAnchorCorner(mdc.menu.Corner.BOTTOM_LEFT);
        //   accounMDCMenu.setAnchorElement(accountIconButton);
        // });
      }
    );
    this.initializeMDCcomponents();
  }

  initializeMDCcomponents() {
    window.onload = () => {
      /** Initialize MDC Web components. */
      // Instantiation
      // RIPPLE
      const selector = '.mdc-button, .mdc-list-item, .mdc-card__primary-action';
      const ripples = [].map.call(document.querySelectorAll(selector), function (el) {
        return new MDCRipple(el);
      });
      // console.log('RIPPLES', ripples);

      // Instantiate MDC Drawer
      const drawerEl = document.querySelector('#site-mdc-drawer');
      const drawer = mdc.drawer.MDCDrawer.attachTo(drawerEl);

      // Instantiate MDC Top App Bar (required)
      const topAppBarEl = document.querySelector('#site-top-bar');
      const topAppBar = mdc.topAppBar.MDCTopAppBar.attachTo(topAppBarEl);

      // topAppBar.setScrollTarget(document.querySelector('.main-content'));
      topAppBar.listen('MDCTopAppBar:nav', () => {
        drawer.open = !drawer.open;
      });

      const listEl = document.querySelector('.mdc-drawer .mdc-list');
      listEl.addEventListener('click', (event) => {
        drawer.open = false;
      });

      // SIGNIN BUTTON
      const signInbutton = <HTMLButtonElement>document.querySelector('#signin-button');
      MDCRipple.attachTo(signInbutton);
      console.log('SIGNIN', signInbutton);

      // TEXT FIELDS
      const textFields = Array.from(document.querySelectorAll('.mdc-text-field'));
      // console.log('TEXT FIELDS SELECTOR', textFields);
      for (const textField of textFields) {
        new MDCTextField(textField);
      }

      // const rootEl = document.querySelector('.root');
      const communityLink = document.querySelector('#community-menu-surface-link');
      const menuEl = document.querySelector('#community-mdc-menu');
      // const menu = new MDCMenu(menuEl);
      // communityLink.addEventListener('mouseover', (event) => {
      //   menu.open = !menu.open;
      //   menu.setAnchorCorner(mdc.menu.Corner.BOTTOM_LEFT);
      //   menu.setAnchorElement(communityLink);
      // });


      // const iconButtonRipple = new MDCRipple(document.querySelector('.mdc-icon-button'));
      // iconButtonRipple.unbounded = true;

      // const surface = document.querySelector('.my-surface');
      // const ripple = new MDCRipple(surface);

      /** Custom javascript code. */
      // const greetMessageEl = document.querySelector('.greet-message');
      // const greetButton = document.querySelector('.greet-button');
      // greetButton.addEventListener('click', () => {
      //   const firstNameInput = (<HTMLInputElement>document.querySelector('.first-name-input')).value;
      //   const lastNameInput = (<HTMLInputElement>document.querySelector('.last-name-input')).value;
      //   let name;
      //   if (firstNameInput || lastNameInput) {
      //     name = firstNameInput + ' ' + lastNameInput;
      //   } else {
      //     name = 'Anonymous';
      //   }
      //   greetMessageEl.textContent = `Hello, ${name}!`;
      // });
    }
  }

}
