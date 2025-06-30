/**
 * Library.
 */
var Library = function() {
	
	// Set object
	var L = {};

	/**
	 * Library Initialize
	 */
	L.init = function( settings ) {

		// Translations initialize
		Translation.init(settings.translations);

		// DOM initialize
		L.$body = $('body');
		L.customClass = settings.customClass ? settings.customClass : '';

  		/**
		 * Image Library - Render library modal
		 */
		SystemModals.sm_render({
			id: 'imageLibrary',
			disposable: false,
			$parent: L.$body,
			sizeClasses: `size-l3 ${L.customClass}`,
			headerSettings: {
				id: 'imageLibraryTitle',
				title: L.translate.imageLibrary
			},
			bodySettings: { // body settings
				content: '&nbsp;'
			},
			footerSettings: { // footer settings
				isActive: false,
				buttons: []
			},
			showCallback: function ( event, modal ) {
				// get objects
				var liveUpdate = modal.$html.data('liveUpdate');
				var minlibraryWidth = modal.$html.data('minlibraryWidth');
				var reload = true;
				/* if there is no upload file object at a page, that object is not exist and then
				we get a JS error, we fix it by just creating the main object to be exist. 
				reproduce: Dashboard >> eCommerce >> Settings >> Configuration >> Terms >> Library */
				if ( !topWindow.uploadFiles ) topWindow.uploadFiles = {};
				var uploadFile = topWindow.uploadFiles[modal.$html.data('uploadFileInputId')];
				// check if the user upload a file using our upload object (when uploading from Froala we don't use it)
				if ( uploadFile ) {
					// we add this property latter so we set a default value for it
					if ( !uploadFile.imagesType ) uploadFile.imagesType = 'images';
					// prevent reloading the IFrame in case its already loaded and showing the same images types
					if ( modal.$html.data('lastImagesType') === uploadFile.imagesType ) reload = false; 
					// fix the case of not reloading the iFrame when we moving between the liveUpdate=1 and liveUpdate=0 
					if ( !modal.$html.find('#flickrLibraryModal').hasClass('imageLibrary_live_'+liveUpdate) ) reload = true;
					// some times we have same library just with different orientation so we need to reload the iframe in this case
					if ( modal.$html.data('lastLibraryOrientation') != uploadFile.libraryOrientation ) reload = true;
					// Need Note
					if ( modal.$html.data('lastLibraryQuery') != modal.$html.data('def-query') ) reload = true;
					// save the last images types
					modal.$html.data('lastImagesType',uploadFile.imagesType);
					// save the last images orientation
					modal.$html.data('lastLibraryOrientation',uploadFile.libraryOrientation);
					// Need Note
					modal.$html.data('lastLibraryQuery',modal.$html.data('def-query'));
				// reset the last images type when the user arrive from Froala Editor
				} else {
					modal.$html.data('lastImagesType',null);
				}
				// set the IFrame URL
				var src = '/versions/2/wizard/imagesLibrary/pixabayV_beta_V4.php?w='+websiteID+'&liveUpdate='+liveUpdate;
				if ( minlibraryWidth == '1200' ) {
					src += '&orientation=horizontal&min_width=1600&min_height=800';
				}
				// load the library page (only if its not already loaded)
				if ( reload ) {
					modal.updateHTML('body','<iframe id="flickrLibraryModal" class="libraryIframe imageLibrary_live_'+liveUpdate+'" src="' + src + '" style="width:100%;height:500px;margin:0;padding:0;border:none;"></iframe>');
				}
			}
		});
	};

	/**
	 * The function is used to copy the values of all enumerable own 
	 * properties from one or more source objects to a target object. 
	 * It will return the target object.
	 */
	function objectAssign(target, sources) {
		// IE11 do not support `assign`
		if ( Object.assign ) {
			sources = Object.assign(target, sources);
		} else {
			for ( var prop in target ) if ( !sources.hasOwnProperty(prop) ) sources[prop] = target[prop];
		}
		return sources;
	}

	/**
	 * The function convert special characters to HTML entities, we use it when
	 * we add strings into HTML attributes, it used to prevent the breaks in 
	 * the HTML e.g. title="abc"efg".
	 * 
	 * Source: http://stackoverflow.com/questions/1787322/htmlspecialchars-equivalent-in-javascript
	 */
	function escapeHtml( text ) {
		if ( !text ) return text;
		var map = {
			'&': '&amp;',
			'<': '&lt;',
			'>': '&gt;',
			'"': '&quot;',
			"'": '&#039;'
		};
		return text.toString().replace( /[&<>"']/g, function( m ) { return map[m]; } );
	}

	/**
	 * Translation Object - Handle the plugin translations variables.
	 */
	var Translation = {
		// set the default translate variables 
		def : {
			imageLibrary: 'Image Library',
			close: 'Close'
		},
		// initialize the translations object
		init : function( translations ) {
			// if needed - assign the translations object to overwrite the plugin translation
			var t = translations ? objectAssign(this.def,translations) : this.def;
			// escape all the variables to prevent HTML breaks
			$.each(t, function( key, value ) {
				t[key] = escapeHtml(value);
			});
			// set a global translations object
			L.translate = t;
		}
	};

	// Return the object
	return L;
}();
