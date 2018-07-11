# Instructions for loading the extension in Chrome
* Download or clone this repo
* Unzip the downloaded folder
* Go to chrome://extensions in Chrome and turn on 'Developer mode'
* Click on 'Load unpacked'
* Select the folder containing manifest.json

# Instructions for loading the extension in Firefox
* Download or clone this repo
* Unzip the downloaded folder
* Go to about:debugging in Firefox and turn on 'Enable add-on debugging' 
* Click on 'Load temporary Add-on'
* Select manifest.json

# Instructions for testing the extension
* Go to https://www.iskme.org/
* The page is redirected
* Messages will be logged to console of background script (Click Debug button in Firefox)

<!--
# Documentation
__manifest.json declares `bundle.js` as background script:__

* In `bootloader.js` any new URL loaded is detected on line 50. The new URL is then passed to the function `start()` 
* In `start()` , variables `searchParams` and `verbose` are initialised. If the URL is not a Chrome internal page and if the URL starts with either https://dweb or http://dweb , `main()` is called with `url` as an argument
* In `main()` the name is passed to p_bootname() -> Domain.p_resolveAndBoot which walks the Domain tree retrieving records via IPFS or HTTP.
* finally in Leaf.p_boot (line 23259 of `objects-bundle.js`) the new HTML is ready to be loaded
* The URL of the new HTML is `url.href`
* To load this URL into the tab, a javascript file `redirect.js` is injected into the web page. The tab ID of this tab is obtained by using `chrome.tabs.query()` at line 23274
* The need for this injection of `redirect.js` is that a new URL cannot be loaded into the present tab from code in a background script. A URL in a new tab can be opened but not a URL in the same tab
* Before `redirect.js` is injected, an object is initialised at line 23275 of `objects-bundle.js` containing `url.href` and `opentarget`. This object is passed to the context of `redirect.js`
* `redirect.js` is executed and the new URL is loaded into the tab on line 3
-->

