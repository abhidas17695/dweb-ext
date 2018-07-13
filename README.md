# Instructions for loading the extension in Chrome
* Download or clone this repo
* Unzip the downloaded folder
* Go to chrome://extensions in Chrome and turn on 'Developer mode'
* Click on 'Load unpacked'
* Select the folder containing dist of the unzipped folder

# Instructions for loading the extension in Firefox
* Download or clone this repo
* Unzip the downloaded folder
* Go to about:debugging in Firefox and turn on 'Enable add-on debugging' 
* Click on 'Load temporary Add-on'
* Select manifest.json from the folder dist

# Instructions for testing the extension
* Go to https://www.iskme.org/
* The page is redirected
* Messages will be logged to console of background script (Click Debug button in Firefox)

# Tests we expect the extension to pass
* Go to https://www.iskme.org -> ends up on ISKme, not on dweb ! 
* Go to https://dweb.archive.org -> should redirect to Archive front page
* Go to https://dweb.archive.org/details/commute -> and it should end up on the commute page i.e. the rest of the URL makes it through
* Go to https://dweb.archive.org/details/commute?verbose=true -> and any URL parameters should also be passed through
* Go to https://dweb.blahblah.com and it should attempt to resolve, fail and end up with a standard attempt to load https://dweb.blahblah.com (which will fail)
* Go to https://dweb.me/arc/archive.org/details/commute -> and should work fine, with no interception of URL
* Reload any of these URLs and behavior is as expected - i.e. back at the same URL.

# Steps to build the extension

* Download or clone the repo 
* Go to the folder objects and run `npm install`
* Go to the folder transports and run `npm install`
* Run `npm install` on the root folder (the folder containing web.config)
* Run `npm run-script build` on the root folder
* The bundled js file is to be found in the folder dist
* Please note that the folder scripts in dist is empty currently

# Documentation
__manifest.json declares `bundle.js` as background script:__

* In `bootloader.js` any new URL loaded is detected on line 55. The new URL is then passed to the function `start()` 
* In `start()` , variables `searchParams` and `verbose` are initialised. If the URL is not a Chrome internal page and if the URL starts with either https://dweb or http://dweb , `main()` is called with `url` as an argument
* In `start()` the `require` caches are cleared. This is to prevent `Signature not verified error`.
* In `main()` the name is passed to p_bootname() -> Domain.p_resolveAndBoot which walks the Domain tree retrieving records via IPFS or HTTP.
* Finally in Leaf.p_boot (line 179 of `objects/Domain.js`) the new HTML is ready to be loaded
* The URL of the new HTML is `url.href`

