// Include custom styles.
import './styles.scss';

import mdcAutoInit from '@material/auto-init';
import { MDCDrawer } from '@material/drawer';
import {MDCList} from '@material/list';
import { MDCTopAppBar } from '@material/top-app-bar';
import { MDCRipple } from '@material/ripple';
import {MDCDataTable} from '@material/data-table';

document.addEventListener('DOMContentLoaded', function () {
  // List
  const listElements = document.querySelectorAll('.mdc-deprecated-list');
  for (var i = 0; i < listElements.length; i += 1) {
    const list = MDCList.attachTo(listElements[i]);
    list.listen('MDCList:action', (event) => {
      if (event.type === 'MDCList:action') {
        const target = event.target as HTMLElement;
        if (target.innerText === 'Other articles') {
          window.location.href = '/blog/toc.html';
        }
      }
    });
  }

  // Navigation Drawer
  const drawerElement = document.querySelector('.mdc-drawer');
  let drawer: MDCDrawer | null = null;
  if (drawerElement) {
    drawer = MDCDrawer.attachTo(drawerElement);
  }

  // Top App Bar & Drawer
  const topBar = document.querySelector('.mdc-top-app-bar');
  const main = document.querySelector('.main-content');
  if (topBar && main) {
    const appBar = MDCTopAppBar.attachTo(topBar);
    appBar.listen('MDCTopAppBar:nav', () => {
      if (drawer) {
        drawer.open = !drawer.open;
      }
    });
  }
  // Tables
  const tableElements = document.querySelectorAll('.mdc-data-table');
  for (var i = 0; i < tableElements.length; i += 1) {
    var element = tableElements[i];
    MDCDataTable.attachTo(element);
  }
  // Ripple
  let elements = document.querySelectorAll('.mdc-button, .mdc-icon-button, .mdc-card__primary-action');
  for (var i = 0; i < elements.length; i += 1) {
    MDCRipple.attachTo(elements[i]);
  }
  // Auto-init other parts of the page
  mdcAutoInit(document);
});
