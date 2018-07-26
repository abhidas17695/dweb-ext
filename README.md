# Instructions for loading the extension in Chrome
* Download or clone this repo
* Unzip the downloaded folder
* Build the repos as instructed below 
* Go to chrome://extensions in Chrome and turn on 'Developer mode'
* Click on 'Load unpacked'
* Select the folder dist-combo to load the combo extension
* Select the fiolder dist-dweb/dist to load the dweb extension
# Instructions for loading the extension in Firefox
* Download or clone this repo
* Unzip the downloaded folder
* Build the repos as instructed below
* Go to about:debugging in Firefox and turn on 'Enable add-on debugging' 
* Click on 'Load temporary Add-on'
* Select manifest.json from the folder dist-combo to load combo extension
Select manifest.json from the folder dist-dweb/dist to load dweb extension

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

# Steps to build the two repos

* Run `npm install` to install dependencies and to download abhidas17695/dweb-ext and internetarchive/wayback-machine-chrome.
* dist-dweb is the folder containing the standalone dweb extension
* dist-combo is the folder containg the wayback-machine-chrome extension + dweb feature

# Documentation
* cpx , fs and download-git-repo are declared as dependencies
* After installation of dependencies `node download` is run
* download.js downloads abhidas17695/dweb-ext and internetarchive/wayback-machine-chrome into dist-dweb and dist-combo respectively. 
* dist-dweb/dist is the standalone dweb extension
* To build combo extension the 2 bundles and bootloader.js are copied from dist-dweb to dist-combo 
* manifest.json of dist-combo is appropriately edited by changemanifest.json

