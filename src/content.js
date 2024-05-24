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

        setTimeout(() => {
          var listViewAlreadySelected = iframeDocument.querySelector('i:not([data-is-focusable="false"]).icon-NotBrickView');
          if (listViewAlreadySelected) {
            return;
          }

          var listLayoutChooser = iframeDocument.querySelector('div[data-control-id="ListLayoutChooser"]:not([data-is-focusable="false"])');
          if (listLayoutChooser) {
            var menuButton = listLayoutChooser.querySelector('button[data-is-focusable="true"]');
            if (menuButton) {
              if (!menuButton.outerHTML.includes('is-expanded')) {
                menuButton.click();

                var listOptionDiv = iframeDocument.querySelector('div[data-control-id="0"]');
                if (listOptionDiv) {
                  var listOptionButton = listOptionDiv.querySelector('button[data-is-focusable="true"]');
                  if (listOptionButton) {
                    listOptionButton.click();
                  }
                }
              }
            }
          }
        }, 0);
      }
    }
  }
});

const config = {subtree: true, childList: true};
observer.observe(document, config);