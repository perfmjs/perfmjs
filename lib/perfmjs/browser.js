/**
 * Browser detect: http://www.quirksmode.org/js/detect.html
 * A useful but often overrated JavaScript function is the browser detect. 
 * Sometimes you want to give specific instructions or load a new page in case the viewer uses, for instance, Safari.
 * import utils.js
 */
perfmjs.plugin('browser', function($$) {
	$$.browser = {
		init: function() {
			this.browser = this._searchString(this._dataBrowser) || "An unknown browser";
			this.version = this._searchVersion(navigator.userAgent) || this._searchVersion(navigator.appVersion) || "an unknown version";
			this.os = this._searchString(this._dataOS) || "an unknown OS";
			this.ok = true;
		},
		info: function() {
			if (this.ok === undefined) this.init();
			return this.browser + " " + this.version + " " + this.os; 
		},
		msie: function() {
			if (this.ok === undefined) this.init();
			return (this.browser === 'Explorer');
		},
		_searchString: function(data) {
			for (var i=0;i<data.length;i++)	{
				var dataString = data[i].string;
				var dataProp = data[i].prop;
				this.version_searchString = data[i].versionSearch || data[i].identity;
				if (dataString) {
					if (dataString.indexOf(data[i].subString) != -1) {
						return data[i].identity;
					}
				} else if (dataProp) {
					return data[i].identity;
				}
			}
		},
		_searchVersion: function(dataString) {
			var index = dataString.indexOf(this.version_searchString);
			if (index == -1) return;
			return parseFloat(dataString.substring(index+this.version_searchString.length+1));
		},
		_dataBrowser: [{
				string: navigator.userAgent,
				subString: "Chrome",
				identity: "Chrome"
			},{
				string: navigator.userAgent,
				subString: "OmniWeb",
				versionSearch: "OmniWeb/",
				identity: "OmniWeb"
			},{
				string: navigator.vendor,
				subString: "Apple",
				identity: "Safari",
				versionSearch: "Version"
			},{
				prop: window.opera,
				identity: "Opera",
				versionSearch: "Version"
			},{
				string: navigator.vendor,
				subString: "iCab",
				identity: "iCab"
			},{
				string: navigator.vendor,
				subString: "KDE",
				identity: "Konqueror"
			},{
				string: navigator.userAgent,
				subString: "Firefox",
				identity: "Firefox"
			},{
				string: navigator.vendor,
				subString: "Camino",
				identity: "Camino"
			},{		
				// for newer Netscapes (6+)
				string: navigator.userAgent,
				subString: "Netscape",
				identity: "Netscape"
			},{
				string: navigator.userAgent,
				subString: "MSIE",
				identity: "Explorer",
				versionSearch: "MSIE"
			},{
				string: navigator.userAgent,
				subString: "Gecko",
				identity: "Mozilla",
				versionSearch: "rv"
			},{ 		
				// for older Netscapes (4-)
				string: navigator.userAgent,
				subString: "Mozilla",
				identity: "Netscape",
				versionSearch: "Mozilla"
			}
		],
		_dataOS: [{
				string: navigator.platform,
				subString: "Win",
				identity: "Windows"
			},{
				string: navigator.platform,
				subString: "Mac",
				identity: "Mac"
			},{
				   string: navigator.userAgent,
				   subString: "iPhone",
				   identity: "iPhone/iPod"
		    },{
				string: navigator.platform,
				subString: "Linux",
				identity: "Linux"
			}]
	};
});