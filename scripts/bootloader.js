function statusupdate(args) {
        console.log(...arguments);
        statusdiv = document.getElementById("statusdiv");
        statusdiv.appendChild(DwebObjects.utils.createElement("span", {}, ...arguments));
    }
    async function main(url) {
        await DwebTransports.p_connect({
            statuselement: document.getElementById("statuselement"),
            transports: searchparams.getAll("transport")
        });
        let orighref = searchparams.get("url") || url ;
        if (!orighref.startsWith("file:///")) {
            //statusupdate("Loading URL: ", orighref);
            let url = new URL(orighref);
            let name;
            let pathname = (url.pathname === "/") ? "" : url.pathname; // Remove extraneous / if added by browser
            url.pathname = "";  // Leave empty as intended, will resolve to Domain or Leaf of the domain name
            if (url.hostname === "dweb.me") {                                   // e.g. https://dweb.me/arc/archive.org/foo
                name = pathname.substring(1);                                   // should be arc/ or ipfs/ or something like that
            } else if (url.hostname.startsWith("dweb.")) {                      // e.g. https://dweb.archive.org/details/commute
                name = ["arc/", url.hostname.substring(5), pathname].join("");  // arc/archive.org/details/commute
            } else if (pathname.startsWith("/archive.org")) {                  // e.g. https://localhost:4244/archive.org/detais/commu
                name = ["arc", pathname].join("");                              // arc/archive.org/details/commute
            } else {
                //statusupdate("Unable to bootstrap ", orighref, " unrecognized pattern");
                return;
            }
            const search_supplied = url.search.slice(1); // Skip initial ?
            await p_bootname(name, {search_supplied});
        }
    }
    async function p_bootname(name, {search_supplied=undefined}={}) {
        //document.getElementById("urlorname").value = name;
        //statusupdate("Resolving name: ",name,);   // Appears after loading
        try {
            await DwebObjects.Domain.p_resolveAndBoot(name, {search_supplied, verbose})
        } catch(err) {  // If cant resolve to leaf, or boot fails
            console.error("Got error",err);
            //statusupdate(err.message);
        }
    }

    async function p_bootfromfield(field) {
        let nameandsearch = document.getElementById(field).value.split('?')
        return await p_bootname(nameandsearch, {});
    }

    // Next few lines need explaining!  If passed an extra parameter url= then it will use that as the URL instead of ...bootloader.html
    // This is only useful until we have the server returning this file for anything under dweb.archive.org   
    chrome.webRequest.onCompleted.addListener(function(details) {
        var url=details.url;
        //var url="https://dweb.archive.org";
        start(url);
    }, {urls: ["<all_urls>"], types: ["main_frame"]});
    var searchparams = null;
    var verbose = null;
    function start(url){
        searchparams = new URL(url).searchParams;
        verbose = searchparams.get("verbose");
        if(!url.startsWith("chrome") && (url.startsWith("http://dweb.") || url.startsWith("https://dweb."))){
            main(url);
        }
    }
        
    
    

