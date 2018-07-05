# Instructions for loading the extension in Chrome
* Download or clone this repo
* Unzip the downloaded folder
* Go to chrome://extensions in Chrome and turn on 'Developer mode'
* Click on 'Load unpacked'
* Select the folder containing manifest.json

# Instructions for testing the extension
* Go to any webpage, for example http://www.iskme.org
* Reload the extension by clicking the reload button on its panel on chrome://extensions
* Reload http://www.iskme.org

# Documentation
__manifest.json declares 3 background scripts running on the same context , executed in order of declaration : 
`scripts/transports-bundle.js`, `scripts/objects-bundle.js`, `scripts/bootloader.js`__

* In `bootloader.js` any new URL loaded is detected on line 50. The new URL is then passed to the function `start()` 
* In `start()` , variables `searchParams` and `verbose` are initialised. If the URL is not a Chrome internal page and if the URL starts with either https://dweb or http://dweb , `main()` is called with `url` as an argument
* In `main()` the name is passed to p_bootname() -> Domain.p_resolveAndBoot which walks the Domain tree retrieving records via IPFS or HTTP.
* finally in Leaf.p_boot (line 23259 of `objects-bundle.js`) the new HTML is ready to be loaded
* The URL of the new HTML is `url.href`
* To load this URL into the tab, a javascript file `redirect.js` is injected into the web page. The tab ID of this tab is obtained by using `chrome.tabs.query()` at line 23259
* The need for this injection of `redirect.js` is that a new URL cannot be loaded into the present tab from code in a background script. A URL in a new tab can be opened but not a URL in the same tab
* After `redirect.js` is injected, a message is sent to it from line 23263 of `objects-bundle.js` containing `url.href` and `opentarget`
* The message from `objects-bundle.js` is intercepted by `redirect.js` and the new URL is loaded into the tab on line 3

