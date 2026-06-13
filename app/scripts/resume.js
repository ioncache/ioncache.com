'use strict';

/*
  NOTE: normally I'd minify/uglify/ all resources, but since this is partly a code
        exercise, I've left it all as is for easy reading
*/

/*
  setup expand/collapse toggle

  add a single event listener and only trigger the toggle
  if the target is one of the toggle buttons
*/

document.querySelector('.main-area').addEventListener('click', (e) => {
  let parentSection;

  if (
    e.target.classList.contains('ion-md-contract') ||
    e.target.classList.contains('ion-md-expand')
  ) {
    parentSection = e.target.parentNode.parentNode;
  } else if (e.target.classList.contains('toggle-fill-grid')) {
    parentSection = e.target.parentNode;
  }

  if (parentSection) {
    parentSection.classList.toggle('fill-grid');
    document.querySelector('.contact').classList.toggle('fill-grid');
  }
});

const pageSettings = document.querySelector('.page-settings');
const pageInfo = document.querySelector('.page-info');

/* setup page settings toggle */
pageSettings.addEventListener('click', (e) => {
  if (
    e.target.classList.contains('ion-md-settings') ||
    e.target.classList.contains('page-settings')
  ) {
    pageSettings.classList.toggle('show');
  }
});

/* setup page info toggle */
pageInfo.addEventListener('click', (e) => {
  if (
    e.target.classList.contains('ion-md-help') ||
    e.target.classList.contains('page-info')
  ) {
    pageInfo.classList.toggle('show');
  }
});

document.body.addEventListener('click', (e) => {
  /* remove the show class from page settings/info whenever clicking anywhere other than
     the page settings/info button or inside the page settings/info container
  */

  if (!e.target.closest('.panel-container')) {
    pageSettings.classList.remove('show');
    pageInfo.classList.remove('show');
  }
});
