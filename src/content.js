var previousUrl = '';

var observer = new MutationObserver(function(mutations) {
  if (location.href !== previousUrl && location.href.includes("page")) {
      previousUrl = location.href;

      var iframe = document.querySelector('iframe');
      if (iframe) {
        var iframeDocument = iframe.contentWindow.document;
        if (iframeDocument) {
          var button = iframeDocument.querySelector('button[data-is-focusable="true"].ms-nav-layout-wide-toggle-button');
          if (button) {
            if (!button.outerHTML.includes('is-checked')) {
              button.click();
            }
          }
        }
      }
    }
});

const config = {subtree: true, childList: true};
observer.observe(document, config);