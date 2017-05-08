YAHOO.Bubbling.fire("registerAction", {
  actionName : "onActionEditOnlineLibreOffice",
  fn : function (node) {
    var encode = function (str) {
      if (YAHOO.env.ua.ie > 0) {
        // Double encode for Internet Explorer
        return encodeURIComponent(encodeURIComponent(str));
      } else {
        // Other browsers: single encode
        return encodeURIComponent(str);
      }
    };

    var tmpHostname = window.location.href;
    var hostname = null;
    
    var regExpLocal = /^https?:\/\/localhost(:\d+).*?/;
    if(regExpLocal.test(tmpHostname)) {
    	console.log('localhost');
    	hostname = regExpLocal.exec(tmpHostname)[0];
    } else {
    	console.log('domain');
	    var regExp = /[\/\/\da-z\.-]+\.[a-z\.]{2,6}/;
	    hostname = regExp.exec(tmpHostname);
    }
    
    if(hostname == null) {
    	console.error('Hostname could not be parsed oout of', tmpHostname);
    	return;
    }

    // Build the path from the WebDAV path: It already has any items with spaces or other characters url encoded
    var path = node.webdavUrl.replace("/webdav", hostname + "@SSL\/DavWWWRoot\/alfresco\/aos");
    if (YAHOO.env.ua.ie > 0) {
      // IE needs to double encode it.
      path = path.split("/").map(encodeURIComponent).join("/");
    }
    console.log(hostname, 'open', path);
    window.location.href = "libreoffice:" + path;
  }
});