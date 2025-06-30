/**
 * Mobile Menu Handler
 */
let MobileMenu = function() {

	// Set object
	let _ = {};

	/**
	 * Initialize the Mobile Menu
	 */
	_.mm_init = function() {
		// collapse menu controller
		$('#onePageSystem_mobileMenu #moreButton').on('click', function( event ) {
			// open menu
			if ( $('#onePageSystem').hasClass('mobile-menu-open') ) {
				_.mm_collapseDashMenu();
			// close menu
			} else {
				_.mm_expandDashMenu();
			}
		});
		// switch tabs when on click
		$('#onePageSystem_mobileMenu .moduleHrefLink:not(.custom-click)').on('click', function( event, settings ) {
			// prevent default action
			event.preventDefault();
			// get the clicked element
			var $this = $(this);
			// set default settings objects when user clicks on link it does not exists
			if ( !settings ) {
				settings = {};
			}
			// open tab in new window
			if ( $this.data('new-tab') == '1' ) {
				window.open($this.data('mobile-href'), '_blank');
				return;
			}
			// redirect this page
			if ( $this.data('redirect-this-page') == '1' ) {
				window.location.href = $this.data('mobile-href');
				return;
			}
			/**
			 * Unsaved Changes Detector - Show to the user a modal that warns him he forgot
			 * to save the changes
			 */
			if ( $this.data('mobile-href') != '' && $this.data('mobile-href') != '#' && $('#onePageSystemFrame').length > 0 && $('#onePageSystemFrame')[0].contentWindow.$ && $('#onePageSystemFrame')[0].contentWindow.$('html[data-unsaved-changes="true"]').length > 0 ) {
				bootbox.confirm({
					title: translations.AreSureCloseWin,
					message: translations.PleaseMakeSaveChangeBefore,
					buttons: {
						confirm: {
							label: translations.DiscardChanges,
							className: 'btn-danger'
						},
						cancel: {
							label: translations.KeepEditThePage,
							className: 'btn-default'
						}
					},
					callback: function( result ) {
						// if the user click close we continue the same flow
						if (result) {
							// redirect to the link
							_.mm_linkClick_Action($this, settings);
						} else {
							// if the user click `cancel` it will hide the popup and he can keep working on the modal
						}
					}
				});
				// exit
				return;
			}
			// redirect to the link
			_.mm_linkClick_Action($this, settings);
		});
		// get active tab and also the inner URL if the user accessed it
		let { $tab, innerURL } = onePageSystem_getActiveTab_FromURL($('#onePageSystem_sidebar'));
		// security - if there is no active tab we open the first tab
		if ( $tab.length == 0 ) {
			$tab = $('#onePageSystem_mobileMenu .static-list .moduleHrefLink').first();
		}
		// click on the active tab
		_.mm_linkClick_Action($tab, {
			preventIframeNavigation: false,
			saveHistory: true,
			customURL: innerURL,
			pageLoad: true
		});
		// when user clicks on the notification we need to open the related tab
		$(document).on('s123.wizard_notification_click', function( event, $link ) {
			if ( $link.data('custom-active-tab') ) {
				_.mm_linkClick_Action($('#onePageSystem_mobileMenu .moduleHrefLink[data-module-type="'+$link.data('module-type')+'"][data-custom-tab-id="'+$link.data('custom-active-tab')+'"]'), {});
			// if there is no custom tab open the first tab
			} else {
				_.mm_linkClick_Action($('#onePageSystem_mobileMenu .moduleHrefLink[data-module-type="'+$link.data('module-type')+'"]').first(), {});
			}
		});
	};

	/**
	 * The function is handling the module menu links
	 */
	_.mm_linkClick_Action = function( $this, settings ) {
		// security - check if the mobile menu is open and if not we exit
		if ( !_.mm_isActive() ) return;
		// get objects
		var navigateIframe = !settings.preventIframeNavigation;
		var saveHistory = !settings.saveHistory;
		var pageLoad = settings.pageLoad;
		var $href = $this.data('mobile-href');
		// open tab in new window
		if ( $this.data('new-tab') == '1' ) {
			window.open($this.data('mobile-href'), '_blank');
			return;
		}
		// redirect this page
		if ( $this.data('redirect-this-page') == '1' ) {
			window.location.href = $this.data('mobile-href');
			return;
		}
		// hightlight the clicked link
		_.mm_highlightLink($this);
		// set the related URL
		if ( navigateIframe && $href && $href != '#' ) {
			// if there is custom url we need to open the iframe to the custom url
			if ( settings.customURL ) {
				$href = settings.customURL;
			}
			// re render the iframe
			onePageSystem_RenderPreview($href,'userClick');
			// add new history entry
			if ( !pageLoad ) {
				history.pushState({},null,$href);
			}
			// collapse the mobile more button menu
			_.mm_collapseDashMenu();
		}
	};

	/**
	 * The function is opening the dashboard menu
	 */
	_.mm_expandDashMenu = function() {
		// add class to open the side menu
		$('#onePageSystem').addClass('mobile-menu-open');
		// add backdrop
		let $backdrop = $('<div class="backdropManaul mobile-menu"></div>');
		// add click event to close the menu
		$backdrop.on('click', function() {
			_.mm_collapseDashMenu();
		});
		// append the backdrop
		$('body').append($backdrop);
	};

	/**
	 * The function is collapsing the dashboard menu
	 */
	_.mm_collapseDashMenu = function() {
		$('#onePageSystem').removeClass('mobile-menu-open');
		$('.backdropManaul.mobile-menu').remove();
	};

	/**
	 * The function is highlighting the clicked link and if the link
	 * is in some sub menu or module menu we need to open the module menu
	 */
	_.mm_highlightLink = function( $link ) {
		// security - don't allow pro feature to be clicked because we show upgrade modal
		if ( $link.hasClass('pro-feature') ) return;
		// reset the active class of all menu items
		$('#onePageSystem_mobileMenu .active').removeClass('active');
		// if the button is related to the mobile menu then we need to highlight the related link
		if ( $link.data('mobile-href') ) {
			$('#onePageSystem_mobileMenu').find(`a.moduleHrefLink[data-mobile-href="${$link.data('mobile-href')}"]`).parent().addClass('active');
		}
		// if the link is some other link we only highlight the more button
		if ( $('#onePageSystem_mobileMenu .active').length == 0 ) {
			$('#onePageSystem_mobileMenu #moreButton').parent().addClass('active');
		}
	};

	/**
	 * The function is checking if the mobile menu is open
	 */
	_.mm_isActive = function() {
		return $('#onePageSystem_mobileMenu').is(':visible');
	};

	// Return the object
	return _;
}();