/**
 * PC Menu Handler
 */
let PCMenu = function() {

	// Set object
	let _ = {};

	/**
	 * Initialize the PC Menu
	 */
	_.pm_init = function() {

		$('#onePageSystem_sidebar').on('keydown', function(e) {
			if ( e.keyCode === 9 || e.which === 9 || e.key === 'Tab' ) {  // Tab key
				e.stopPropagation();
				e.preventDefault();
			}
		});
		/**
		 * Page Load - Run expanded login because it's
		 * also handling tooltips
		 */
		let collapsedState = '';
		// Check if the website ID is defined and it's a number
		if ( typeof websiteID !== 'undefined' && $.isNumeric(websiteID) ) {
			collapsedState = localStorage.getItem(`sidebarCollapsed_${websiteID}`);
		// If the website ID is not defined or it's not a number
		} else {
			collapsedState = localStorage.getItem(`sidebarCollapsed_admin`);
		}
		// If the collapsed state is collapse we need to collapse the menu
		if ( collapsedState == 'collapse' ) {
			_.pm_collapseDashMenu();
		// If the collapsed state is expand we need to expand the menu
		} else {
			_.pm_expandDashMenu();
		}
		// collapse menu controller
		$('#onePageSystem_sidebar .collapse-btn').on('click', function( event ) {
			// open the sidebar
			if ( $('#onePageSystem').hasClass('side-bar-collapsed') ) {
				_.pm_expandDashMenu();
			// close the sidebar
			} else {
				_.pm_collapseDashMenu();
			}
			// update the collapse tooltip
			_.pm_updateCollapseTooltip();
		});
		// update the collapse tooltip
		_.pm_updateCollapseTooltip();
		// switch tabs when on click
		$('#onePageSystem_sidebar .moduleHrefLink:not(.custom-click)').on('click', function( event, settings ) {
			// prevent default action
			event.preventDefault();
			// get the clicked element
			var $this = $(this);
			// set default settings objects when user clicks on link it does not exists
			if ( !settings ) {
				settings = {};
			}
			/**
			 * Unsaved Changes Detector - Show to the user a modal that warns him he forgot
			 * to save the changes
			 */
			if ( $this.data('href') != '' && $this.data('href') != '#' && $('#onePageSystemFrame').length > 0 && $('#onePageSystemFrame')[0].contentWindow.$ && $('#onePageSystemFrame')[0].contentWindow.$('html[data-unsaved-changes="true"]').length > 0 ) {
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
						if ( result ) {
							// mobile only - when user clicks on link that has sub menu we only open it without any redirections
							if ( MobileMenu.mm_isActive() && $this.closest('.sliding-menu-controller').length > 0 ) {
								mobileSubmenuHandler($this);
							// redirect to the link
							} else {
								_.pm_linkClick_Action($this,settings);
							}
						} else {
							// if the user click `cancel` it will hide the popup and he can keep working on the modal
						}
					}
				});
				// exit
				return;
			}
			// mobile only - when user clicks on link that has sub menu we only open it without any redirections
			if ( MobileMenu.mm_isActive() && $this.closest('.sliding-menu-controller').length > 0 ) {
				mobileSubmenuHandler($this);
			// redirect to the link
			} else {
				_.pm_linkClick_Action($this,settings);
			}

			/**
			 * The function is opening the sub menu of the link in mobile drevices only
			 * because we needed different flow for mobile devices
			 */
			function mobileSubmenuHandler( $link ) {
				// hide all module menus
				$('#onePageSystem_sidebar .sliding-menu-wrapper').removeClass('active');
				// add the active class to the clicked module menu
				$('#onePageSystem_sidebar').addClass('sliding-menu-open');
				// get sub menu
				let $subMenu = $('#onePageSystem_sidebar .sliding-menu-wrapper[data-module-type="'+$link.data('module-type')+'"][data-module-id="'+$link.data('module-id')+'"]');
				// add the active class to the clicked module menu
				if ( $subMenu.length > 0  ) {
					// open the sub menu
					$subMenu.addClass('active');
				}
				// scroll to the top of the menu becuase when the screen height is small the menu is not visible
				$('#onePageSystem_sidebar .menu-items-container').scrollTop(0);
			}
		});
		// get active tab and also the inner URL if the user accessed it
		let { $tab, innerURL } = onePageSystem_getActiveTab_FromURL($('#onePageSystem_sidebar'));
		// security - if there is no active tab we open the first tab
		if ( $tab.length == 0 ) {
			$tab = $('#onePageSystem_sidebar .static-list .moduleHrefLink').first();
		}
		// click on the active tab
		_.pm_linkClick_Action($tab,{
			preventIframeNavigation: false,
			saveHistory: true,
			pageLoad: true,
			customURL: innerURL
		});
		// when user clicks on the notification we need to open the related tab
		$(document).on('s123.wizard_notification_click', function( event, $link ) {
			// open the related tab
			if ( $link.data('custom-active-tab') ) {
				_.pm_linkClick_Action($('#onePageSystem_sidebar .moduleHrefLink[data-module-type="'+$link.data('module-type')+'"][data-custom-tab-id="'+$link.data('custom-active-tab')+'"]'),{});
			// if there is no custom tab open the first tab
			} else {
				_.pm_linkClick_Action($('#onePageSystem_sidebar .moduleHrefLink[data-module-type="'+$link.data('module-type')+'"]').first(),{});
			}
		});
		/**
		 * Set menu state loaded after the js thread has finished to process this
		 * init function because on page load we don't want to show the transition of
		 * the menu state when it is cpllapsed
		 */
		setTimeout(() => {
			$('#onePageSystem').addClass('menu-state-loaded');
		}, 100);
	};

	/**
	 * The function is handling the module menu links
	 */
	_.pm_linkClick_Action = function( $this, settings ) {
		// get objects
		let navigateIframe = !settings.preventIframeNavigation;
		let saveHistory = !settings.saveHistory;
		let pageLoad = settings.pageLoad;
		let $href = $this.data('href');
		let isMobile = MobileMenu.mm_isActive();
		// open tab in new window
		if ( $this.data('new-tab') == '1' ) {
			window.open($this.data('href'), '_blank');
			return;
		}
		// redirect this page
		if ( $this.data('redirect-this-page') == '1' ) {
			window.location.href = $this.data('href');
			return;
		}
		// hightlight the clicked link
		let customLink = _.pm_highlightLink($this,pageLoad,'userClick');
		// mobile + clicked link has sub menu - only open the sub menu
		if ( isMobile && customLink.$el ) {
			_.pm_highlightLink(customLink.$el,pageLoad,'userClick');
		// mobile + clicked link has no sub menu - close the menu
		} else if ( isMobile && !customLink.$el ) {
			MobileMenu.mm_collapseDashMenu();
		// if there is custom link we need to open the related module menu
		} else if ( customLink.$el ) {
			// highlight the clicked link
			_.pm_highlightLink(customLink.$el,pageLoad,'userClick');
			// set the related URL
			$href = customLink.$el.data('href');
		}
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
		}
	};

	/**
	 * The function is updating the collapsed meu tooltips
	 */
	_.pm_updateCollapseTooltip = function() {
		// destroy the old tooltip
		$('#onePageSystem_sidebar .collapse-btn').tooltip('destroy');
		/**
		 * Small Delay - There is an issue with imidiatly initalizing tooltip
		 * after it was destroyed, it doest work when doing that
		 * imidately so we need to wait a little bit
		 */
		setTimeout(() => {
			// update the tooltip of the collapsed button
			$('#onePageSystem_sidebar .collapse-btn').tooltip({
				container: 'body',
				placement: $('html[dir="rtl"]').length > 0 ? 'left' : 'right',
				title: $('#onePageSystem').hasClass('side-bar-collapsed') ? onePageSystemTranslations.expand : onePageSystemTranslations.collapse
			});
		},200);
	};

	/**
	 * The function is highlighting the clicked link and if the link
	 * is in some sub menu or module menu we need to open the module menu
	 */
	_.pm_highlightLink = function( $link, pageLoad, actionType ) {
		// set default object
		let customLink = {};
		// security - don't allow pro feature to be clicked because we show upgrade modal
		if ( $link.hasClass('pro-feature') ) return customLink;
		// set object to return that will have settings for overwriting the click action
		customLink = _.pm_highlightLink_Action($link);
		// on page load we want to place the link in the center of the container's viewport
		if ( pageLoad || actionType == 'historyNav' ) {
			// disabled the because when the link is inside of sliding menu the focus triggers before the animation ends and the container scrolls to the link and the user can see other menus
			//$link.focus();
		}
		// return the object
		return customLink;
	};

	/**
	 * The function is highlighting the clicked link and if the link
	 * is in some sub menu or module menu we need to open the module menu
	 */
	_.pm_highlightLink_Action = function( $link ) {
		// get the sidebar menu
		let $menu = $('#onePageSystem_sidebar');
		// set object to return that will have settings for overwriting the click action
		let customLink = {};
		// open module menu when user clicks on module link that has another menu
		if ( $link.closest('.sliding-menu-controller').length > 0 || ($link.closest('.sliding-menu-wrapper').length > 0 && $link.closest('.sliding-menu-back-btn').length == 0 ) ) {
			// hide all module menus
			$menu.find('.sliding-menu-wrapper').removeClass('active');
			// show the clicked module menu
			$menu.find('.sliding-menu-wrapper[data-module-type="'+$link.data('module-type')+'"][data-module-id="'+$link.data('module-id')+'"]').addClass('active');
			// add the active class to the clicked module menu
			$menu.addClass('sliding-menu-open');
			// mobile only - add the active class to the clicked module menu
			if ( $menu.get(0).id == 'mobileMenu' ) {
				// show sliding menu
				$menu.find('.more-btn-menu').addClass('sliding-menu-open');
			}
			// when user clicks on link that is related to module menu we need to open the first module menu tab
			if ( $link.closest('.sliding-menu-controller').length > 0 ) {
				// set custom link we want to open when user access the module menu
				customLink = {
					$el: $menu.find('.sliding-menu-wrapper[data-module-type="'+$link.data('module-type')+'"][data-module-id="'+$link.data('module-id')+'"] .sliding-menu .moduleHrefLink').first()
				};
			}
		// if user or system clicks on tab outside of the module menu we need to show the root menu
		} else if ( $link.closest('.sliding-menu-wrapper').length == 0 || $link.closest('.sliding-menu-back-btn').length > 0  ) {
			// hide all module menus
			$menu.find('.sliding-menu-wrapper').removeClass('active');
			// hide the sliding menu
			$menu.removeClass('sliding-menu-open');
			// mobile only - add the active class to the clicked module menu
			if ( $menu.get(0).id == 'mobileMenu' ) {
				// hide the sliding menu
				$menu.find('.more-btn-menu').removeClass('sliding-menu-open');
			}
			// if user clicks on back button of module menu we need to show the root menu
			if ( $link.closest('.sliding-menu-back-btn').length > 0 ) {
				customLink = {
					$el: $menu.find('.static-list .moduleHrefLink').first()
				};
			}
		}
		// reset all active tabs
		$menu.find('.moduleHrefLink').closest('li').removeClass('active');
		$menu.find('.active .submenu').closest('li').removeClass('active');
		// close all menu opened sub-tabs
		$menu.find('li.open .submenu.nav-show').removeClass('nav-show').addClass('nav-hide').hide();
		$menu.find('li.open').removeClass('open');
		// if the tab is in sub menu we need to open the menu
		if ( $link.closest('.submenu').length > 0 ) {
			$link.closest('.submenu').closest('li').addClass('open');
			$link.closest('.submenu').removeClass('nav-hide').addClass('nav-show').show();
		}
		// set the current tab as active
		$link.closest('li').addClass('active');
		// if it's a sub menu add active class to the closest parent li
		$link.closest('.submenu').closest('li').addClass('active');
		// return the object
		return customLink;
	};

	/**
	 * The function is opening the dashboard menu
	 */
	_.pm_expandDashMenu = function() {
		// Save collapsed state to cookie for 1 year
		if ( typeof websiteID !== 'undefined' && $.isNumeric(websiteID) ) {
			localStorage.setItem(`sidebarCollapsed_${websiteID}`,'expand');
		} else {
			localStorage.setItem('sidebarCollapsed_admin','expand');
		}
		// expand the sidebar
		$('#onePageSystem').removeClass('side-bar-collapsed');
		// intialize expanded tooltips
		expandTooltipsInit();
	}

	/**
	 * The function is collapsing the dashboard menu
	 */
	_.pm_collapseDashMenu = function() {
		// Save collapsed state to cookie for 1 year
		if ( typeof websiteID !== 'undefined' && $.isNumeric(websiteID) ) {
			localStorage.setItem(`sidebarCollapsed_${websiteID}`,'collapse');
		} else {
			localStorage.setItem(`sidebarCollapsed_admin`,'collapse');
		}
		// collapse the sidebar
		$('#onePageSystem').addClass('side-bar-collapsed');
		// intialize collapsed tooltips
		collapseTooltipsInit();
	}

	/**
	 * The function is intializing the expanded tooltips
	 */
	function expandTooltipsInit() {
		// remove the collapsed title from the sidebar links
		$('#onePageSystem #onePageSystem_sidebar a[data-collapsed-title]')
		.tooltip('destroy')
		.removeAttr('data-original-title')
		.removeAttr('title')
		.off('click.hideTooltip');
		/**
		 * Small Delay - There is an issue with imidiatly initalizing tooltip
		 * after it was destroyed, it doest work when doing that
		 * imidately so we need to wait a little bit
		 */
		setTimeout(() => {
			$('#onePageSystem #onePageSystem_sidebar a[data-expanded-title]').each(function() {
				// add title attribute
				$(this).attr('title',$(this).data('expanded-title'))
				// intialize tooltip
				.tooltip({
					template: '<div class="tooltip pc-tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
					container: 'body',
					placement: 'auto'
				});
			});
		}, 200);
	}

	/**
	 * The function is intializing the collapsed tooltips
	 */
	function collapseTooltipsInit() {
		// remove the collapsed title from the sidebar links
		$('#onePageSystem #onePageSystem_sidebar a[data-expanded-title]')
		.tooltip('destroy')
		.removeAttr('data-original-title')
		.removeAttr('title');
		/**
		 * Small Delay - There is an issue with imidiatly initalizing tooltip
		 * after it was destroyed, it doest work when doing that
		 * imidately so we need to wait a little bit
		 */
		setTimeout(() => {
			$('#onePageSystem #onePageSystem_sidebar a[data-collapsed-title]').each(function() {
				// get the title
				let $this = $(this);
				let title = $this.data('collapsed-title');
				// add title attribute
				$this.attr('title',title)
				// intialize tooltip
				.tooltip({
					template: '<div class="tooltip pc-tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
					container: 'body',
					placement: intrface_align_reverse
				}).on('click.hideTooltip', function() {
					$(this).tooltip('hide');
				});
			});
		}, 200);
	}
	
	// Return the object
	return _;
}();