var previousUrl = '';

var observer = new MutationObserver(function(mutations) {
  if (location.href !== previousUrl && location.href.includes("page")) {
      previousUrl = location.href;

      var iframe = document.querySelector('iframe');
      if (iframe) {
        var iframeDocument = iframe.contentWindow.document;
        if (iframeDocument) {
          var button = iframeDocument.querySelector('button[title="Show wide layout view"][data-is-focusable="true"]');
          if (button) {
            button.click();
          }
        }
      }
    }
});

const config = {subtree: true, childList: true};
observer.observe(document, config);