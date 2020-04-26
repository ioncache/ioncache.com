/**
  setTheme - sets the theme of the page and saves the name to local storage

  @param{string} name The name of the theme, eg, theme-solarized

  @returns{void}
*/
function setTheme(newTheme) {
  const currentTheme = getTheme();

  if (currentTheme) {
    document.body.classList.remove(`theme-${currentTheme}`);
  }

  if (newTheme) {
    document.body.classList.add(`theme-${newTheme}`);
  }

  if (localStorage) {
    localStorage.setItem('ioncache-theme', newTheme);
  }
}

/**
  getTheme - gets the theme of the resume from local storage

  @returns{string} Returns the name of the theme from local storage if found, or an empty string
*/
function getTheme() {
  if (localStorage) {
    return localStorage.getItem('ioncache-theme') || '';
  } else {
    return '';
  }
}

/**
  addThemePickerListener - sets up an event listener for changes on the theme-picker dropdown

  @returns{void}
*/
function addThemePickerListener() {
  const themePicker = document.querySelector('.theme-picker');

  if (themePicker) {
    themePicker.value = getTheme();

    themePicker.addEventListener('change', (e) => {
      setTheme(e.target.value);
    });
  }
}

/*
  wait until the page has finished loading before adding the listener on the theme picker dropdown
  so that the elements exist by the time the listener is added
*/
if (window.onload) {
    let currentOnloadEvent = window.onload;
    let newOnLoadEvent = function(e) {
        currentOnloadEvent(e);
        addThemePickerListener();
    };
    window.onload = newOnLoadEvent;
} else {
    window.onload = addThemePickerListener;
}
