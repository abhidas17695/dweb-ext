function statusupdate(args) {
        console.log(...arguments);
        //statusdiv = document.getElementById("statusdiv");
        //statusdiv.appendChild(DwebObjects.utils.createElement("span", {}, ...arguments));
    }
    async function main(url,id) {
        let orighref = searchparams.get("url") || url;
        if (!orighref.startsWith("file:///")) {
            statusupdate("Loading URL: ", orighref);
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
                statusupdate("Unable to bootstrap ", orighref, " unrecognized pattern");
            }
            const search_supplied = url.search.slice(1); // Skip initial ?
            await p_bootname(name, id,{search_supplied});
            

        }
    }
    async function p_bootname(name, id,{search_supplied=undefined}={}) {
        //document.getElementById("urlorname").value = name;
        statusupdate("Resolving name: ",name,);   // Appears after loading
        try {
            await DwebObjects.Domain.p_resolveAndBoot(name, {search_supplied, openChromeTab: id, verbose})
        } catch(err) {  // If cant resolve to leaf, or boot fails
            console.error("Got error",err);
            statusupdate(err.message);
        }
    }

    async function p_bootfromfield(field) {
        let nameandsearch = document.getElementById(field).value.split('?')
        return await p_bootname(nameandsearch, {});
    }
    function changeURL(id,url){
        chrome.tabs.update(id,{url:url}, function(){});
    }
    // Next few lines need explaining!  If passed an extra parameter url= then it will use that as the URL instead of ...bootloader.html
    // This is only useful until we have the server returning this file for anything under dweb.archive.org
    var searchparams = null;
    var verbose = null;
    const startTransportsAtLoad = false;
    var transportsLoaded=false;
    chrome.webRequest.onBeforeRequest.addListener(function(details) {
        var url=details.url;
        //var url="https://dweb.archive.org";
        if((typeof details.url)!='undefined' && (details.url.indexOf("dweb.me")<0) && !(url.indexOf("dweb.me")>=0)&& url.startsWith("http") && details.url.startsWith("http") && (url.indexOf("dweb.")>=0) && !(details.url.startsWith("chrome"))){
            searchparams = new URL(url).searchParams;
            verbose = searchparams.get("verbose");
            statusupdate("URL intercepted is "+url);
            if(!transportsLoaded){
                transportsLoaded=true;
                DwebTransports.p_connect({ }).then(function(resolve){
                    main(url,details.tabId);
                }); 
            }else{
                main(url,details.tabId);
            }
            
        }
    }, {urls: ["<all_urls>"], types: ["main_frame"]},['blocking']);

    if(startTransportsAtLoad){
        transportsLoaded=true;
        DwebTransports.p_connect({ }); // Asynchronous
     }

