var previousUrl = '';

const BUTTON_SELECTOR = 'button[data-is-focusable="true"]';
const WIDE_TOGGLE_BUTTON_SELECTOR = `${BUTTON_SELECTOR}.ms-nav-layout-wide-toggle-button`;
const LIST_LAYOUT_CHOOSER_SELECTOR = 'div[data-control-id="ListLayoutChooser"]:not([data-is-focusable="false"])';
const LIST_OPTION_DIV_SELECTOR = 'div[data-control-id="0"]';
const LIST_VIEW_ICON_SELECTOR = 'i:not([data-is-focusable="false"]).icon-NotBrickView';

const FAST_TAB_SELECTOR = '.ms-nav-columns-caption[role="button"][aria-expanded="false"]';

const config = { subtree: true, childList: true };

const observer = new MutationObserver(mutations => {
  if (location.href !== previousUrl && location.href.includes("page")) {
    previousUrl = location.href;
    handlePageChange();
  }
});

observer.observe(document, config);

function handlePageChange() {
  const iframe = document.querySelector('iframe');
  if (iframe) {
    const iframeDocument = iframe.contentWindow.document;
    if (iframeDocument) {
      handleFastTabs(iframeDocument);
      handleWideToggleButton(iframeDocument);

      setTimeout(() => {
        handleListViewSelection(iframeDocument);
      }, 0);
    }
  }
}

function handleFastTabs(document) {
  try {
    const buttons = document.querySelectorAll(FAST_TAB_SELECTOR);
    if (buttons) {
      buttons.forEach((button, index) => {
        button.click();
      });
    }
  } catch (error) {
    console.error('Error handling FastTab click: ', error);
  }
}

function handleWideToggleButton(iframeDocument) {
  try {
    const button = iframeDocument.querySelector(WIDE_TOGGLE_BUTTON_SELECTOR);
    if (button && !button.outerHTML.includes('is-checked')) {
      button.click();
    }
  } catch (error) {
    console.error('Error handling wide toggle button:', error);
  }
}

function handleListViewSelection(iframeDocument) {
  try {
    const listViewAlreadySelected = iframeDocument.querySelector(LIST_VIEW_ICON_SELECTOR);
    if (listViewAlreadySelected) return;

    const listLayoutChooser = iframeDocument.querySelector(LIST_LAYOUT_CHOOSER_SELECTOR);
    if (listLayoutChooser) {
      const menuButton = listLayoutChooser.querySelector(BUTTON_SELECTOR);
      if (menuButton && !menuButton.outerHTML.includes('is-expanded')) {
        menuButton.click();
        selectListViewOption(iframeDocument);
      }
    }
  } catch (error) {
    console.error('Error handling list view selection:', error);
  }
}

function selectListViewOption(iframeDocument) {
  try {
    const listOptionDiv = iframeDocument.querySelector(LIST_OPTION_DIV_SELECTOR);
    if (listOptionDiv) {
      const listOptionButton = listOptionDiv.querySelector(BUTTON_SELECTOR);
      if (listOptionButton) {
        listOptionButton.click();
      }
    }
  } catch (error) {
    console.error('Error selecting list view option:', error);
  }
}