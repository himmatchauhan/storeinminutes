//Run when the page load (before images and other resource)
var intrface_align;
var intrface_align_reverse;

$(function() {

	// Detect only IOS iPad/iPhone/iPod devices
	if ( /(iPad|iPhone|iPod)/g.test(navigator.userAgent) ) {
		$('html').attr('data-ios-device',/(iPad|iPhone|iPod)/g.exec(navigator.userAgent)[0]);
	}

	//Check if the interface is RTL or LTR
	if ($('html[dir=rtl]').length>0) {
		intrface_align = 'right';
		intrface_align_reverse = 'left';
	} else {
		intrface_align = 'left';
		intrface_align_reverse = 'right';
	}

	/**
	 * Show Hidden Tabs - On website homepage page load sometimes we need to show or hide tabs
	 * that are in hidden mode because they are depended on the website
	 * dashbard settings
	 */
	$(document).on('reset_dynamic_tabs',function() {
		// check if the
		$('#onePageSystem_sidebar a[data-dashboard-tab]').each(function() {
			// find the iframe related button
			let $dasboardTool = $('#onePageSystemFrame').contents().find('[data-dashboard-tab="' + $(this).data('dashboard-tab') + '"]');
			// button found - show tab
			if ( $dasboardTool.length > 0 ) {
				$('#onePageSystem_sidebar a[data-dashboard-tab="' + $(this).data('dashboard-tab') + '"]').closest('li').removeClass('hidden');
			// button not found - hide tab
			} else {
				$('#onePageSystem_sidebar a[data-dashboard-tab="' + $(this).data('dashboard-tab') + '"]').closest('li').addClass('hidden');
			}
		});
	});

	// handle links that redirects the entire window
	$(document).on('onePageSystemLinksHandler', function(e) {
		// find links with the class `redirect-parent` and redirect the parent window when clicked
		var $iframe = $('#onePageSystemFrame').contents();
		console.log($iframe);
		
		// some links need to redirect this window so we search for the class `one-page-dash-link`
		$iframe.find('.one-page-dash-link').off('click').on('click', function(e) {
			// prevent default action
			e.preventDefault();
			// get link
			let href = $(this).attr('href');
			// if the href is set redirect to it
			if ( href != '' && href != '#' ) {
				window.top.location.href = href;
				getChatButton();
			}
		});
	});

	// handle sub menu dropdown toggle click
	$('#onePageSystem_sidebar li a.dropdown-toggle').on('click',function( event ) {
		// prevent default action
		event.preventDefault();
		// get objects
		let $this = $(this);
		let $li = $this.closest('li');
		// close all open sub menus
		$('#onePageSystem_sidebar li a.dropdown-toggle').each(function() {
			$(this).closest('li').find('ul.submenu').slideUp(300,function(){
				$(this).closest('li').removeClass('open');
			});
		});
		// if the sub menu is open we close it
		if ( $li.hasClass('open') ) {
			$li.find('ul.submenu').slideUp(300,function(){
				$this.closest('li').removeClass('open');
			});
		// if the sub menu is closed we open it
		} else {
			$li.find('ul.submenu').slideDown(300,function(){
				$this.closest('li').addClass('open');
			});
			// open the first tab in the sub menu
			if ( !MobileMenu.mm_isActive() ) {
				// if the controller is a group of same modules we won't open the first module but let the user choose what module to open
				if ( !$li.hasClass('sliding-menu-group') ) {
					$li.find('ul.submenu').find('.moduleHrefLink').first().trigger('click');
				}
			}
		}
	});

	// Restore website
	$(".confirm-website-restore").on('click', function() {

		var $this = $(this);

		bootbox.confirm({
			message: translations.restoreWebsiteConfirmMsg.replace('{{websiteName}}',$(this).data("website-name")),
			buttons: {
				confirm: {
					label: translations.ok,
					className: 'btn-danger btn-sm'
				},
				cancel: {
					label: translations.Cancel,
					className: 'btn-sm'
				}
			},
			callback: function(result) {
				if(result) {
					location.href = $this.data("link");
				}
			}
		});
	});

	// PC Menu - Initialize PC Menu
	PCMenu.pm_init();

	// Mobile Menu - Initialize Mobile Menu
	MobileMenu.mm_init();

	// Open inside chat from the top sidebar in one page system
	$('a.user-chat-btn').off('click').on('click',function(){
		$('#insideChat_button').trigger('click');
	});

	// Handle browser back/forward buttons
	$(window).on('popstate', function(event) {
		// get the iframe url
		let documentURL = new URL(window.location.href);
		console.log(documentURL);
		onePageSystem_RenderPreview(documentURL.pathname + documentURL.search,'historyNav');
		// close all modals
		SystemModals.sm_closeAllModals();
	});
});

/**
 * The function is rendering the iframe
 */
function onePageSystem_RenderPreview( $href, actionType ) {
	// set flag that helps us detect if we need to add new history entery when the iframe is redirecting because user clicked on some link in side of it
	let isUpdateBrowserURL = false;
	// get the new iframe object
	let $onePageSystemFrame = $(`<iframe id="onePageSystemFrame" name="onePageSystemFrame" src="${$href}"></iframe>`);
	// handle the links that are inside the iframe
	$onePageSystemFrame.off('load.iframe').on('load.iframe',function() {
		// with this flag we can prevent showing the loading animation when user clicks on some link that does not redirect the iframe for example `tel:` or `mailto:`
		let isShowLoadingOnRedirect = true;
		// get the iframe url
		let documentURL = new URL(this.contentWindow.location.href);
		console.log(documentURL);
		// check if we need to add new history entery
		if ( isUpdateBrowserURL ) {
			// get the url
			let url = documentURL.pathname + documentURL.search;
			// add new history entry
			history.pushState({},null,url);
			// reset the flag
			isUpdateBrowserURL = false;
		}
		// get active tab and also the inner URL if the user accessed it
		let { $tab, innerURL } = onePageSystem_getActiveTab_FromURL($('#onePageSystem_sidebar'));
		// highlight the link in the pc menu
		PCMenu.pm_highlightLink($tab,false,actionType);
		// highlight the link in the mobile menu
		MobileMenu.mm_highlightLink($tab);
		// show hide chat button
		showHideChatButton(documentURL.pathname);
		// update browser tab title according to the page title
		document.title = $onePageSystemFrame.contents().find('.g-h-name').text();
		// close all drop down menus when user clicks inside of the iframe
		$(this.contentWindow.document).on('mousedown.collapse-menu',function( event ) {
			$('#onePageSystem_sidebar [data-toggle="dropdown"]').parent().removeClass('open');
		});
		/**
		 * Frame Loaded Handler - Here we handle some extra events we need but only if
		 * jquery is loaded in the iframe because sometimes we we kill the page
		 * and show the user a message for example free website can't add booking staff
		 * member
		 */
		if ( this.contentWindow.$ ) {
			// when modal is opened and it's full screen we need to hide the mobile menu
			this.contentWindow.$(this.contentWindow.document).on('show.bs.modal', function( event ) {
				// get the opened modal
				let $modal = $(event.target);
				// if the modal that is opened on full screen we hide the mobile menu
				if ( $modal.hasClass('system-modal') || $modal.hasClass('s123-modal') ) {
					$('#onePageSystem').addClass('frame-modal-opened');
				}
			});
			// show the mobile menu when modal is closed
			this.contentWindow.$(this.contentWindow.document).on('hide.bs.modal', function() {
				$('#onePageSystem').removeClass('frame-modal-opened');
			});
			// handle links that are inside the iframe
			this.contentWindow.$('a').on('click.validateLoadingAnimation',function(e) {
				// get link
				const href = $(this).attr('href');
				// check if the link is not redirecting the iframe
				if ( isUrlNotSupportingLoadingAnimation(href) ) {
					isShowLoadingOnRedirect = false;
				}
				/**
				 * The function is checking if the link is not redirecting the iframe
				 */
				function isUrlNotSupportingLoadingAnimation( url ) {
					// if the url is not set we return true
					if ( !url ) return true;
					// list of URI schemes that should not trigger the loader
					const ignoredSchemes = [
						'tel:', 'mailto:', 'sms:', 'geo:', 'data:', 'javascript:', 
						'file:', 'ftp:', 'about:', 'blob:', 'skype:', 'whatsapp:', 
						'intent:', 'market:', 'itms:', 'itms-apps:', '#'
					];
					// check if the url starts with one of the ignored schemess
					return ignoredSchemes.some(scheme => url.toLowerCase().startsWith(scheme));
				}
			});
		}
		// when iframe is redirecting because user clicked on some link in side of it we show loader again
		$(this.contentWindow).one('beforeunload',function( event ) {
			// update browser url
			isUpdateBrowserURL = true;
			// don't show loading animation when user clicks on some link in side of the iframe
			if ( isShowLoadingOnRedirect ) {
				loader_started();
			}
			// reset the flag
			isShowLoadingOnRedirect = true;
		});
		// handle links that are inside the iframe
		$(document).trigger('onePageSystemLinksHandler');
		// hide loader
		loader_ended();
	});
	// show loader
	loader_started();
	// set new iframe
	$('.inner_onePageSystem').empty().append(`
		<div id="loader">
			<div class="interfaceLoad-spinner-container">
				<div class="interfaceLoad-spinner-wrapper">
					<img src="${$GLOBALS['cdn-system-files']}${$GLOBALS['s_whitelabel_interfaceLogo_small']}?v=${$GLOBALS['v-cache']}&width=100" alt="Icon" class="interfaceLoad-spinner-icon">
					<div class="interfaceLoad-spinner"></div>
				</div>
			</div>
		</div>`)
	.append($onePageSystemFrame);
	// set iframe height
	/* WE DONT NEED IT, JUST SET UP 100vh FOR THE IFRAME
	$onePageSystemFrame.css('height',$(window).height()-$('#onePageSystem_mobileMenu .dashboard-menu').height());
	// update iframe height on window resize
	$(window).off('resize#onePageSystem.preview').on('resize#onePageSystem.preview',function() {
		$onePageSystemFrame.css('height',$(window).height()-$('#onePageSystem_mobileMenu .dashboard-menu').height());
	});
	*/


	/**
	 * The function is showing the loader
	 */
	function loader_started() {
		$('.inner_onePageSystem').addClass('loading');
	}

	/**
	 * The function is hiding the loader
	 */
	function loader_ended() {
		clearTimeout(window.wizardLoadingDelay);
		$('.inner_onePageSystem').removeClass('loading');
	}
}

/**
 * The function is returning the active tab and the inner url that we want to open the iframe to
 */
function onePageSystem_getActiveTab_FromURL( $menu ) {
	// get the document url
	let documentURL = window.location.href;
	// get url object
	let urlObject = new URL(documentURL);
	// this array will store the matched links that we need to highlight	
	let matchedLinks = [];
	/**
	 * Find the link in the side bar by the page pathname
	 */
	$menu.find('a.moduleHrefLink[data-href]:not(.hidden)').each(function() {
		// get objects
		let $link = $(this);
		// check if the link is not redirecting to the same page
		if ( $link.data('href') != '#' && $link.data('href').length > 0 ) {
			// get url object
			let url = new URL(`${window.location.protocol}//${window.location.hostname}${$link.data('href')}`);
			// if the link and the iframe url are the same urls we save this link
			if ( url.pathname == urlObject.pathname ) {
				matchedLinks.push($link);
			// else check if the url is not related link to the same page inside the sidebar
			} else if ( $link.data('related-links') && $link.data('related-links').length > 0 ) {
				// get related link url object
				let url = new URL(`${window.location.protocol}//${window.location.hostname}${$link.data('related-links')}`);
				// if the link and the iframe url are the same urls we save this link
				if ( url.pathname == urlObject.pathname ) {
					matchedLinks.push($link);
				}
			}
		}
	});
	/**
	 * More Then 1 Page Found - Sometimes the url is the same and only with different search params
	 * so we need to find the specific link that has the same search params
	 */
	if ( matchedLinks.length > 1 ) {
		// if we have multiple matches, find the one with matching search params
		let bestMatch = matchedLinks.find($link => {
			return areUrlsEqual(`${window.location.protocol}//${window.location.hostname}${$link.data('href')}`,documentURL);
		});
		// if we found an exact match, use only that one
		if ( bestMatch ) {
			matchedLinks = [bestMatch];
		}
	}
	/**
	 * Detect By Folder Path - Sometimes the urls does not appear in the sidebar menu
	 * so in order to highlight the correct menu item we check by folder path to understand
	 * if the link is in the same folder as the current url
	 */
	if ( matchedLinks.length == 0 ) {
		// find the link by folder path
		let $link = $menu.find('a.moduleHrefLink[data-href]:not(.hidden)').filter(function() {
			// get the folder path
			const folderPath = urlObject.pathname.split('/').slice(0,-1).join('/')+'/';
			// get the link folder path
			const linkFolderPath = $(this).data('href').split('/').slice(0,-1).join('/')+'/';
			// compare the folder paths
			return linkFolderPath == folderPath;
		})
		// return only the first link that we found because we only need to add active calss to mark the menu item
		.first();
		// if there is a link we return it
		if ( $link.length > 0 ) {
			matchedLinks = [$link];
		}
		/**
		 * Detect By Parent Folder Path - If no matches in the same folder, check if there's a shared parent folder
		 * This supports cases where files are in different subfolders of a common parent folder, for example:
		 * 	`/versions/2/wizard/userLogs/activityLog/index.php` and
		 * 	`/versions/2/wizard/userLogs/transactionsLog/payments-transactions.php`
		 * are in the same parent folder `/versions/2/wizard/userLogs/`
		 */
		if ( matchedLinks.length == 0 ) {
			// get the parent folder path (one level up) for the current URL
			const parentFolderPath = urlObject.pathname.split('/').slice(0,-2).join('/')+'/';
			// find the link by parent folder path
			$link = $menu.find('a.moduleHrefLink[data-href]:not(.hidden)').filter(function() {
				// get the link parent folder path (one level up)
				const linkParentFolderPath = $(this).data('href').split('/').slice(0,-2).join('/')+'/';
				// compare the parent folder paths
				return linkParentFolderPath == parentFolderPath && parentFolderPath.split('/').length > 2; // Ensure it's a valid parent path
			})
			// return only the first link that we found
			.first();
			// if there is a link we return it
			if ( $link.length > 0 ) {
				matchedLinks = [$link];
			}
		}
	}
	// return the data that we want to redirect the iframe to
	return {
		$tab: matchedLinks.length > 0 ? matchedLinks[0] : $menu.find('a.moduleHrefLink[data-href]:not(.hidden)').first(),
		innerURL: urlObject.pathname + urlObject.search
	};
	
	/**
	 * The function is checking if the two urls are the same
	 * path no metter the search params order
	 */
	function areUrlsEqual( url1, url2 ) {
		// create URL objects to parse the URLs
		const parsedUrl1 = new URL(url1);
		const parsedUrl2 = new URL(url2);
		// first compare the base parts (protocol, hostname, pathname)
		if ( parsedUrl1.origin !== parsedUrl2.origin || parsedUrl1.pathname !== parsedUrl2.pathname ) {
			return false;
		}
		// get search params and convert to objects
		const params1 = Object.fromEntries(parsedUrl1.searchParams);
		const params2 = Object.fromEntries(parsedUrl2.searchParams);
		// compare the number of parameters
		if ( Object.keys(params1).length !== Object.keys(params2).length ) {
			return false;
		}
		// compare each parameter value
		for ( const [key, value] of Object.entries(params1) ) {
			if ( params2[key] !== value ) {
				return false;
			}
		}
		// return true if the urls are the same
		return true;
	}
}

/**
 * The function trying to parse the sent JSON string, we use it to prevent
 * JS error if the JSON is not valid from some reason. 
 * 
 * @param {string} str - JSON string.
 * @param {function} faildCallback - Callback function to execute on failed parse (optional).
 * @return {object} Obj - Valid Object or False if the sent JSON string is invalid.
 */
function tryParseJSON( str, faildCallback ) {
	// try parse the sent JSON
	try {
		var Obj = JSON.parse(str);
		if ( Obj && typeof Obj === "object" ) {
			return Obj;
		}
	} catch (e) {}
	// executing the callback function (if needed)
	if ( faildCallback ) faildCallback.call(this);
	// return false instead of invalid JSON
	return false;
}
