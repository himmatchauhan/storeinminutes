class InsideChatWindow {
	constructor() {
	}

	init(chatWidgetKind,meetingButtonBOO,designSaleBOO,languageTXT,livechatText,freeDesignText,pusherKey) {
        //Load the chat window 
		$('head').append(this.getCSS());
		$('body').append('<script src="https://js.pusher.com/8.2.0/pusher.min.js"></script>');

        //Update the counts
        $.ajax({
            type: 'POST',
            url: '/manager/support/getUserID.php',
            data: '',
            success: function(data) {
                var data = JSON.parse(data);

                var country_level = data.country_level;
                var pageURL = window.location.href;

				//Add the chat button to the page
                if (chatWidgetKind=='website') {
                    var x = '<div id="allFloatingButtons">';
                        x += '<div id="insideChat_button" class="insideChat_button_website">';
                            x += '<div>';
                                x += '<span class="hidden-xs">'+livechatText+'</span>';
                                x += '<span class="visible-xs-block">&nbsp;?&nbsp;</span>';
                            x += '</div>';
                            x += '<div class="supportTicketsNotificationsLabel">0</div>';
                        x += '</div>';
                        if (meetingButtonBOO && country_level=='level1') {
                            x += '<div id="insideChat_meeting" class="insideChat_button_website"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="width: 16px;height: 16px;color: white;fill: white;"><path d="M375.8 275.2c-16.4-7-35.4-2.4-46.7 11.4l-33.2 40.6c-46-26.7-84.4-65.1-111.1-111.1L225.3 183c13.8-11.3 18.5-30.3 11.4-46.7l-48-112C181.2 6.7 162.3-3.1 143.6 .9l-112 24C13.2 28.8 0 45.1 0 64v0C0 300.7 183.5 494.5 416 510.9c4.5 .3 9.1 .6 13.7 .8c0 0 0 0 0 0c0 0 0 0 .1 0c6.1 .2 12.1 .4 18.3 .4l0 0c18.9 0 35.2-13.2 39.1-31.6l24-112c4-18.7-5.8-37.6-23.4-45.1l-112-48zM447.7 480C218.1 479.8 32 293.7 32 64v0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0c0-3.8 2.6-7 6.3-7.8l112-24c3.7-.8 7.5 1.2 9 4.7l48 112c1.4 3.3 .5 7.1-2.3 9.3l-40.6 33.2c-12.1 9.9-15.3 27.2-7.4 40.8c29.5 50.9 71.9 93.3 122.7 122.7c13.6 7.9 30.9 4.7 40.8-7.4l33.2-40.6c2.3-2.8 6.1-3.7 9.3-2.3l112 48c3.5 1.5 5.5 5.3 4.7 9l-24 112c-.8 3.7-4.1 6.3-7.8 6.3c-.1 0-.2 0-.3 0z"/></svg></div>';
                        }
                        if (designSaleBOO && (country_level=='level1' || country_level=='level2')) {
                            x += '<div id="insideChat_freeDesign" class="insideChat_button_website free_design">';
                                x += freeDesignText;
                            x += '</div>';
                        }
                    x += '</div>';
                    $('body').append(x);
                }

                if (chatWidgetKind=='interface') {
                    var x = '<div id="allFloatingButtons">';
                        x += '<div id="insideChat_button" class="insideChat_button_interface">';
                            x += '<div>';
                            if (meetingButtonBOO && pageURL.indexOf('manager/wizard.php')>-1) {
                                x += '<span><i class="fal fa-solid fa-question"></i></span>';
                            } else {
                                x += '<span class="hidden-xs">'+livechatText+'</span>';
                                x += '<span class="visible-xs-block">&nbsp;?&nbsp;</span>';
                            }
                            x += '</div>';
                            x += '<div class="supportTicketsNotificationsLabel">0</div>';
                        x += '</div>';
                        if (meetingButtonBOO && country_level=='level1') {
                            x += '<div id="insideChat_meeting" class="insideChat_button_interface"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="width: 16px;height: 16px;color: white;fill: white;"><path d="M375.8 275.2c-16.4-7-35.4-2.4-46.7 11.4l-33.2 40.6c-46-26.7-84.4-65.1-111.1-111.1L225.3 183c13.8-11.3 18.5-30.3 11.4-46.7l-48-112C181.2 6.7 162.3-3.1 143.6 .9l-112 24C13.2 28.8 0 45.1 0 64v0C0 300.7 183.5 494.5 416 510.9c4.5 .3 9.1 .6 13.7 .8c0 0 0 0 0 0c0 0 0 0 .1 0c6.1 .2 12.1 .4 18.3 .4l0 0c18.9 0 35.2-13.2 39.1-31.6l24-112c4-18.7-5.8-37.6-23.4-45.1l-112-48zM447.7 480C218.1 479.8 32 293.7 32 64v0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0c0-3.8 2.6-7 6.3-7.8l112-24c3.7-.8 7.5 1.2 9 4.7l48 112c1.4 3.3 .5 7.1-2.3 9.3l-40.6 33.2c-12.1 9.9-15.3 27.2-7.4 40.8c29.5 50.9 71.9 93.3 122.7 122.7c13.6 7.9 30.9 4.7 40.8-7.4l33.2-40.6c2.3-2.8 6.1-3.7 9.3-2.3l112 48c3.5 1.5 5.5 5.3 4.7 9l-24 112c-.8 3.7-4.1 6.3-7.8 6.3c-.1 0-.2 0-.3 0z"/></svg></div>';
                        }
                        if (designSaleBOO && (country_level=='level1' || country_level=='level2')) {
                            x += '<div id="insideChat_freeDesign" class="insideChat_button_interface free_design">';
                                x += freeDesignText;
                            x += '</div>';
                        }
                    x += '</div>';
                    $('body').append(x);
                }


				$('#insideChat_button').click((event) => {
					event.preventDefault();
                    // Set support chat visited cookie
                    document.cookie = "support_chat_visited=1; path=/";
                    // hide the push message
                    $('#allFloatingButtons .supportTicketsPushMsg').hide();
                    insideChatWindow.ManagePopup(chatWidgetKind,languageTXT,'chat','');
				});

                // Open chat window if it's not closed before this page was loaded
                insideChatWindow.openChatIfNotClosedBefore();

                $('#insideChat_meeting').click((event) => {
					event.preventDefault();

                    insideChatWindow.ManagePopup(chatWidgetKind,languageTXT,'meeting','');
                });

                $('#insideChat_freeDesign').click((event) => {
					event.preventDefault();

                    insideChatWindow.ManagePopup(chatWidgetKind,languageTXT,'design','');
                });

				insideChatWindow.refreshSupportTicketsNotifications();

				//Active the websockets to listen to new messages (we load it after 500ml so the JS file of Pusher will be loaded first)
				setTimeout(function() {
					var pusher = new Pusher(pusherKey, {
						cluster: 'mt1'
					});
					var channel = pusher.subscribe('allChatMessages-'+data.userID+'');
					channel.bind('messageEvent', function(data) {
						//Get new messages when the channel is triggered
						insideChatWindow.refreshSupportTicketsNotifications();
					});
				}, 500);
            }
        });
	}

    ManagePopup(chatWidgetKind,languageTXT,kindTXT,requestUniqueId) {
        var existingKind = $('#supportTicketsNotificationsChatPopup').data('kind');
        
        if (existingKind==kindTXT) {
            if ($('#supportTicketsNotificationsChatPopup').length > 0 && $('#supportTicketsNotificationsChatPopup').is(':visible')) {
                $('#supportTicketsNotificationsChatPopup').hide();
                $('body').removeClass('supportTicketsNotificationsChatPopupOpen');
                return;
            }

            if ($('#supportTicketsNotificationsChatPopup').length > 0) {
                $('#supportTicketsNotificationsChatPopup').show();
                $('body').addClass('supportTicketsNotificationsChatPopupOpen');
                return;
            }
        } else {
            if ($('#supportTicketsNotificationsChatPopup').length > 0) {
                $('#supportTicketsNotificationsChatPopup').remove();
            }
        }

        const chatWindow = insideChatWindow.buildChatWindow(chatWidgetKind,languageTXT,kindTXT,requestUniqueId);
        $('body').append(chatWindow);
        $('body').addClass('supportTicketsNotificationsChatPopupOpen');

        $('#supportTicketsNotificationsChatPopup .siteChat_closeX').off('click').on('click', () => {
            // destroy the support_chat_visited cookie
            document.cookie = "support_chat_visited=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            $('#supportTicketsNotificationsChatPopup').hide();
            $('body').removeClass('supportTicketsNotificationsChatPopupOpen');
        });
    }

    //Update side bar menu with the counts
    refreshSupportTicketsNotifications() {
        //Check if the div exist, in some pages we hide the INBOX button and we don't want to run the AJAX without a reason
        if ($('#insideChat_button').length==0) {
            return;
        }
        //Update the counts
        $.ajax({
            type: 'POST',
            url: '/manager/support/refreshSupportTicketsNotifications.php',
            data: 'type=expert',
            success: function(data) {
                var data = JSON.parse(data);
                $('#insideChat_button .supportTicketsNotificationsLabel').html(data.total);
                if (data.total>0) {
                    $('#insideChat_button .supportTicketsNotificationsLabel').css('display','flex');
                } else {
                    $('#insideChat_button .supportTicketsNotificationsLabel').hide();
                }
                if ( data.pushMessage.content.length > 0 ) {
                    // genarate the push message HTML
                    var html = '<div class="supportTicketsPushMsg">';
                        html += '<div>' + data.pushMessage.content + '</div>';
                        html += '<div><button type="button" class="btn btn-sm btn-primary supportTicketsPushMsgBtn" data-request-unique-id="' + data.pushMessage.requestUniqueId + '">' + data.pushMessage.buttonText + '</button></div>';
                    html += '</div>'
                    var $html = $(html);
                    $html.find('.supportTicketsPushMsgBtn').off('click').on('click',function() {
                        // get object
                        var $this = $(this);
                        var requestUniqueId = $this.data('request-unique-id');
                        $this.closest('.supportTicketsPushMsg').hide();
                        insideChatWindow.ManagePopup('','','pushMessage',requestUniqueId);
                    });
                    $('#allFloatingButtons').prepend($html);
                    var $supportTicketsPushMsg = $('#allFloatingButtons .supportTicketsPushMsg');
                    $supportTicketsPushMsg.css('top',-1 * ($supportTicketsPushMsg.get(0).offsetHeight + 15));
                    $supportTicketsPushMsg.css('visibility','visible');
                    $supportTicketsPushMsg.css('direction',data.pushMessage.isRTL ? 'rtl' : 'ltr');
                }
            }
        });
    }

	getCSS() {
		return '<style>\n' +
			'#allFloatingButtons {\n' +
                'direction: rtl;\n' +
				'position: fixed;\n' +
				'right: 20px;\n' +
				'bottom: 20px;\n' +
                'display: grid;\n' +
                'grid-template-columns: auto auto auto;\n' +
                'grid-gap: 10px;\n' +
                'z-index: 1000;\n' +
			'}\n' +
			//Support RTL
			'html[dir="rtl"] #allFloatingButtons {\n' +
                'direction: ltr;\n' +
				'left: 20px;\n' +
				'right: auto;\n' +
			'}\n' +


			'.insideChat_button_website {\n' +
                'direction: ltr;\n' +
                'padding: 10px 20px;\n' +
                'background-color: #0d6efd;\n' +
                'color: white;\n' +
                'border-radius: 5px;\n' +
                'display: flex;\n' +
                'align-items: center;\n' +
                'justify-content: center;\n' +
                'cursor: pointer;\n' +
                'box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;\n' +
			'}\n' +
            '.insideChat_button_website:hover {\n' +
                'box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;\n' +
            '}\n' +
			//Support RTL
			'html[dir="rtl"] .insideChat_button_website {\n' +
                'direction: rtl;\n' +
                'right: auto;\n' +
            '}\n' +
			'.insideChat_button_interface {\n' +
                'direction: ltr;\n' +
                'background-color: #9E9E9E;\n' +
				'color: white;\n' +
				'border-radius: 100%;\n' +
                'width:50px;\n' +
                'height:50px;\n' +
				'display: flex;\n' +
				'align-items: center;\n' +
				'justify-content: center;\n' +
				'cursor: pointer;\n' +
                'box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;\n' +
			'}\n' +
            '.insideChat_button_interface:hover {\n' +
                'box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;\n' +
            '}\n' +
			//Support RTL
			'html[dir="rtl"] .insideChat_button_interface {\n' +
                'direction: rtl;\n' +
                'right: auto;\n' +
            '}\n' +
            '.insideChat_button_website.free_design {\n' +
                'background: linear-gradient(90deg, hsla(52, 82%, 52%, 1) 0%, hsla(1, 92%, 47%, 1) 100%) !important;\n' +
            '}\n' +
            '.insideChat_button_interface.free_design {\n' +
                'background: linear-gradient(90deg, hsla(52, 82%, 52%, 1) 0%, hsla(1, 92%, 47%, 1) 100%) !important;\n' +
                'width: auto;\n' +
                'height: auto;\n' +
                'border-radius: 5px;\n' +
                'padding: 0 20px;\n' +
            '}\n' +
            
			'@media(max-width:767px) {\n' +
				'.supportTicketsNotificationsChatPopupOpen {\n' +
					'overflow: hidden;\n' +
				'}\n' +
			'}\n' +
			'.supportTicketsNotifications {\n' +
				'position: relative;\n' +
			'}\n' +
			'.supportTicketsNotifications {\n' +
				'display: flex!important;\n' +
			'}\n' +
			'.supportTicketsNotificationsLabel {\n' +
				'position: absolute;\n' +
				'top: -8px;\n' +
				'right: -5px;\n' +
				'background-color: #ff0000;\n' +
				'color: #fff;\n' +
				'font-size: 12px;\n' +
				'font-weight: bold;\n' +
				'border-radius: 50%;\n' +
				'width: 17px;\n' +
				'height: 17px;\n' +
				'display: flex;\n' +
				'align-items: center;\n' +
				'justify-content: center;\n' +
				'display: none;\n' +
			'}\n' +
			//Support RTL
			'html[dir="rtl"] .supportTicketsNotificationsLabel {\n' +
                'right: auto;\n' +
				'left: -5px;\n' +
			'}\n' +
			'.insideChat_button_interface .supportTicketsNotificationsLabel {\n' +
				'top: -6px;\n' +
			'}\n' +
			//Support RTL
			'html[dir="rtl"] .insideChat_button_interface .supportTicketsNotificationsLabel {\n' +
                'right: auto;\n' +
                'left: -2px;\n' +
            '}\n' +
			'#supportTicketsNotificationsChatPopup {\n' +
				'display: block;\n' +
				'position: fixed;\n' +
				'bottom: 94px;\n' +
				'right: 23px;\n' +
				'width: 450px;\n' +
				'height: calc(100vh - 140px);\n' +
				'z-index: 9999999999;\n' +
				'box-shadow: rgba(0,0,0,0.16) 0px 5px 40px;\n' +
				'transition: width 200ms ease 0s, height 200ms ease 0s, max-height 200ms ease 0s, transform 300ms cubic-bezier(0,1.2,1,1) 0s, opacity 83ms ease-out 0s;\n' +
				'transform-origin: right bottom;\n' +
				'border-radius: 15px;\n' +
			'}\n' +
			//Support RTL
			'html[dir="rtl"] #supportTicketsNotificationsChatPopup {\n' +
				'right: auto;\n' +
				'left: 23px;\n' +
			'}\n' +
			'@media(max-width:767px) {\n' +
				'#supportTicketsNotificationsChatPopup {\n' +
					'display: block;\n' +
					'position: fixed;\n' +
					'width: calc(100vw);\n' +
					'height: unset;\n' +
					'top: 0!important;\n' +
					'left: 0!important;\n' +
					'bottom: 0!important;\n' +
					'right: 0!important;\n' +
					'background-image: linear-gradient(to bottom, rgb(1,11,64) 60px, white 60px);\n' +
					'-webkit-overflow-scrolling: touch;\n' +
				'}\n' +
			'}\n' +
			'#supportTicketsNotificationsChatPopup .siteChat_closeX {\n' +
				'cursor: pointer;\n' +
				'width: 50px;\n' +
				'height: 50px;\n' +
				'position: absolute;\n' +
				'top: -25px;\n' +
				'right: -17px;\n' +
				'z-index: 9999999999;\n' +
				'font-size: 27px;\n' +
				'color: black;\n' +
				'background: white;\n' +
				'border-radius: 100%;\n' +
				'display: flex;\n' +
				'align-items: center;\n' +
				'justify-content: center;\n' +
			'}\n' +
			'@media(max-width:767px) {\n' +
				'#supportTicketsNotificationsChatPopup .siteChat_closeX {\n' +
					'top: 8px;\n' +
					'right: 8px;\n' +
					'width: 40px;\n' +
					'height: 40px;\n' +
				'}\n' +
			'}\n' +
			'/* Hover */\n' +
			'#supportTicketsNotificationsChatPopup .siteChat_closeX:hover {\n' +
				'background: #fdfdfd;\n' +
			'}\n' +
			'@media(max-width:767px) {\n' +
				'#supportTicketsNotificationsChatPopupIframe {\n' +
					'border-radius: 0!important;\n' +
				'}\n' +
			'}\n' +
            '#allFloatingButtons .supportTicketsPushMsg {\n' +
				'border-radius: 4px;\n' +
				'padding: 18px;' +
				'clear: both;\n' +
				'white-space: pre-wrap;\n' +
				'background: white;\n' +
				'box-shadow: rgba(0,0,0,0.16) 0px 5px 40px;\n' +
				'position: absolute;\n' +
				'top: -25px;\n' +
				'right: 0;\n' +
				'visibility: hidden;\n' +
				'min-width: 320px;\n' +
			'}\n' +
            '#allFloatingButtons .supportTicketsPushMsg .supportTicketsPushMsgBtn {\n' +
				'width: 100%;\n' +
				'margin: 20px 0 10px;\n' +
			'}\n' +
            '#allFloatingButtons #insideChat_meeting {\n' +
                'visibility: hidden;\n' +
			'}\n' +
		'</style>';
	}

	buildChatWindow(chatWidgetKind,languageTXT,kindTXT,requestUniqueId) {
        if (kindTXT=='chat') {
            var windowURL = '/manager/support/userTickets_chat.php?languageTXT='+languageTXT+'&chatWidgetKind='+chatWidgetKind+'';
        }
        if (kindTXT=='meeting') {
            var windowURL = '/include/book_a_meeting.php?l='+languageTXT+'&chatWidgetKind='+chatWidgetKind+'';
        }
        if (kindTXT=='design') {
            var windowURL = '/include/free_design_promo.php?languageTXT='+languageTXT+'&chatWidgetKind='+chatWidgetKind+'';
        }
        if (kindTXT=='pushMessage') {
            var windowURL = '/manager/support/requestInfo_chat.php?rid='+requestUniqueId;
        }
		const chatWindow = '\n' +
			'<div id="supportTicketsNotificationsChatPopup" data-kind="'+kindTXT+'">\n' +
				'<div style="display: flex; flex-direction: row; height: 100%;">\n' +
					'<div class="siteChat_closeX">\n' +
						'<i class="fa fa-close"></i>\n' +
					'</div>\n' +
					'<iframe id="supportTicketsNotificationsChatPopupIframe" src="'+windowURL+'" style="width: 100%; height: 100%; margin: 0; padding: 0; border: none; overflow: hidden; border-radius: 15px;"></iframe>\n' +
				'</div>\n' +
			'</div>\n';

		return chatWindow;
	}

    /**
     * The function open chat window if it's not closed before this page was loaded
     */
    openChatIfNotClosedBefore() {
        // get cookies
        const getCookie = (name) => {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) return parts.pop().split(';').shift();
        }
        // check if the chat window was open before this page was loaded
        if (getCookie('support_chat_visited') === '1') {
            $('#insideChat_button').trigger('click');
        }
    }
}

// Usage:
const insideChatWindow = new InsideChatWindow();