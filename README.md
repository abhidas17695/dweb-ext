# Instructions for loading the extension in Chrome
* Download or clone this repo
* Unzip the downloaded folder
* Go to chrome://extensions in Chrome and turn on 'Developer mode'
* Click on 'Load unpacked'
* Select the folder dist
# Instructions for loading the extension in Firefox
* Download or clone this repo
* Unzip the downloaded folder
* Go to about:debugging in Firefox and turn on 'Enable add-on debugging' 
* Click on 'Load temporary Add-on'
* Select manifest.json from the folder dist

# Instructions for testing the extension
* Go to http://dweb.archive.org
* The page is redirected
* Messages will be logged to console of background script (Click Debug button in Firefox or on Chrome: chrome://extensions > dweb-ext > "background page" > console")

# Tests we expect the extension to pass
* Go to https://www.iskme.org -> ends up on ISKme, not on dweb ! 
* Go to https://dweb.archive.org -> should redirect to Archive front page
* Go to https://dweb.archive.org/details/commute -> and it should end up on the commute page i.e. the rest of the URL makes it through
* Go to https://dweb.archive.org/details/commute?verbose=true -> and any URL parameters should also be passed through
* Go to https://dweb.blahblah.com and it should attempt to resolve, fail and end up with a standard attempt to load https://dweb.blahblah.com (which will fail)
* Go to https://dweb.me/arc/archive.org/details/commute -> and should work fine, with no interception of URL
* Reload any of these URLs and behavior is as expected - i.e. back at the same URL.

# Steps to sync the repo with the original dweb-objects and dweb-transports

* Run `npm install` to install dependencies and to download dweb-transports and dweb-objects. The bundles are automatically copied to dist/scripts.
* To just download dweb-transports and dweb-objects without installing dependencies all over again , run `npm run-script update`. This will download dweb-transports and dweb-objects and copy the bundles to dist/scripts
* If you want to edit source files of either dweb-objects or dweb-transports run `npm run-script watch` on the root folder of this repo. This will watch the bundles of both dweb-objects and dweb-transports and copy the updated files to dist/scripts

# Documentation
__manifest.json declares `dweb-transports-bundle.js`,`dweb-objects-bundle.js` and `bootloader.js` as background scripts:__
* In `bootloader.js` any new URL loaded is detected on line 55. 
* Variables `searchParams` and `verbose` are initialised. If the URL is not a Chrome internal page and if the URL starts with either https://dweb or http://dweb , `main()` is called with `url` and `tabId` as an argument
* In `main()` the name, a flag called openChrome (initialised to true) and tabId are passed to p_bootname() -> Domain.p_resolveAndBoot which walks the Domain tree retrieving records via IPFS or HTTP.
* Finally in Leaf.p_boot (line 178 of `dweb-objects/Domain.js`) the new HTML is ready to be loaded. The URL of this new web page is assigned to Domain.newURL
* The URL of the new HTML is `url.href`
* In line 178 of Domain.js, if openChrome is true, the new URL is loaded

