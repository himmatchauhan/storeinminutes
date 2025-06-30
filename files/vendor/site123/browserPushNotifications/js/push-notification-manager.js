/**
 * PushNotificationManager handles registration and subscription for push notifications.
 */
var PushNotificationManager = function() {

	// Set object
	var _ = {
		userID: null,
		swRegistrationOBJ: null,
	};

	/**
	 * Initialize the Push Notification Manager.
	 */
	_.init = function( settings ) {
		// set variables
		_.userID = settings.userID;
		_.vapidPublicKeyTXT = settings.vapidPublicKeyTXT;
		// register the Service Worker & Request Permission
		if ('serviceWorker' in navigator && 'PushManager' in window) {
			// set the service worker URL (if you change the version search for it at all the system and update every place)
			let swURL = '/files/vendor/site123/browserPushNotifications/js/sw.js?v=26';
			// load the service worker resources 
			topWindow.$.getScript(topWindow.$GLOBALS['cdn-system-files']+swURL, function () {
				/**
				 * Register Service Worker - Service workers must be registered from the same origin as the page.
				 * Do not use CDN to load the service worker as this will cause JavaScript errors.
				 * For example, avoid using `_.$GLOBALS['cdn-system-files']` to load the service worker.
				 */
				navigator.serviceWorker.register(swURL)
					// verify the service worker registration
					.then(function( swReg ) {
						// save the registration object
						_.swRegistrationOBJ = swReg;
						// some browsers like Safari require user interaction to request notification permission
						$(document).one('click', function() {
							// request notification permission
							_.requestNotificationPermission();
						});
					})
					// catch any errors
					.catch(function( error ) {
						// registration failed
						console.error('Service Worker Error',error);
					});
			});
		}
	};

	/**
	 * Request notification permission from the user.
	 */
	_.requestNotificationPermission = function() {
		Notification.requestPermission().then(function( permission ) {
			// Handle the different permission states
			if ( permission === 'granted' ) {
				// check for an existing subscription
				_.checkSubscription();
			} else if ( permission === 'denied' ) {
				// send the subscription to the server
				_.saveSubscriptionOnServer(null,2);
			} else {
				// send the subscription to the server
				_.saveSubscriptionOnServer(null,0);
			}
		}).catch(function(error) {
			console.error('Error requesting notification permission', error);
		});
	};

	/**
	 * Check for an existing subscription.
	 */
	_.checkSubscription = function() {
		// get the subscription
		_.swRegistrationOBJ.pushManager.getSubscription()
			// verify the subscription
			.then(function( subscriptionOBJ ) {
				// if no subscription exists, subscribe the user
				if ( subscriptionOBJ === null ) {
					// subscribe the user
					_.subscribeUser();
				} else {
					// send the subscription to the server
					_.saveSubscriptionOnServer(subscriptionOBJ,1);
				}
			});
	};

	/**
	 * Subscribe the user to push notifications.
	 */
	_.subscribeUser = function() {
		// convert the VAPID key to a Uint8Array
		const convertedVapidKeyTXT = urlBase64ToUint8Array(_.vapidPublicKeyTXT);
		// subscribe the user
		_.swRegistrationOBJ.pushManager.subscribe({
			userVisibleOnly: true,
			applicationServerKey: convertedVapidKeyTXT
			// handle the subscription
		}).then(function( subscriptionOBJ ) {
			// send the subscription to the server
			_.saveSubscriptionOnServer(subscriptionOBJ,1);
			// catch any errors
		}).catch(function( error ) {
			// log the error
			console.error('Failed to subscribe',error);
		});
	};

	/**
	 * Send subscription or permission status to server.
	 */
	_.saveSubscriptionOnServer = function( subscriptionOBJ, subscribedBOO ) {
		// send the subscription to the server
		$.ajax({
			type: 'POST',
			url: '/files/vendor/site123/browserPushNotifications/save-subscription.php',
			contentType: 'application/json',
			data: JSON.stringify({
				userID: _.userID,
				browserTypeNUM: _.getBrowserType(),
				operationSystemTypeNUM: _.getOperationSystemType(),
				subscribedBOO: subscribedBOO,
				subscriptionOBJ: subscriptionOBJ,
			}),
			// handle the response
			success: function( response ) {
				// parse the JSON response
				response = tryParseJSON(response);
				// if no response, return
				if (!response) return;
			},
			// handle any errors
			error: function(jqXHR, textStatus, errorThrown) {
				// log the error
				console.error('Error saving subscription:',textStatus,errorThrown);
			}
		});
	};

	/**
	 * Get the browser type.
	 */
	_.getBrowserType = function() {
		// get the user agent
		var userAgent = navigator.userAgent;
		// set the default browser type number
		var browserTypeNUM = 0;
		// check for the browser type
		if (userAgent.includes('Firefox')) {
			browserTypeNUM = 1;
		} else if (userAgent.includes('SamsungBrowser')) {
			browserTypeNUM = 2;
		} else if (userAgent.includes('Opera') || userAgent.includes('OPR')) {
			browserTypeNUM = 3;
		} else if (userAgent.includes('Trident')) {
			browserTypeNUM = 4;
		} else if (userAgent.includes('Edge') || userAgent.includes('Edg')) {
			browserTypeNUM = 5;
		} else if (userAgent.includes('Chrome')) {
			browserTypeNUM = 6;
		} else if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) {
			browserTypeNUM = 7;
		} else if (userAgent.includes('Chromium')) {
			browserTypeNUM = 8;
		} else if (userAgent.includes('Internet Explorer')) {
			browserTypeNUM = 9;
		} else if (userAgent.includes('Vivaldi')) {
			browserTypeNUM = 10;
		} else if (userAgent.includes('Yandex')) {
			browserTypeNUM = 11;
		} else if (userAgent.includes('Brave')) {
			browserTypeNUM = 12;
		} else if (userAgent.includes('UC Browser')) {
			browserTypeNUM = 13;
		} else if (userAgent.includes('QQBrowser')) {
			browserTypeNUM = 14;
		} else if (userAgent.includes('Baidu')) {
			browserTypeNUM = 15;
		}
		// return the browser type number
		return browserTypeNUM;
	}

	/**
	 * Get the operation system type.
	 */
	_.getOperationSystemType = function() {
		// get the user agent
		const userAgent = navigator.userAgent;
		// set the default operation system type number
		var operationSystemTypeNUM = 0;
		// check for the operation system type
		if (userAgent.indexOf('Win') !== -1) {
			operationSystemTypeNUM = 1;
		} else if (userAgent.indexOf('Mac') !== -1) {
			operationSystemTypeNUM = 2;
		} else if (userAgent.indexOf('X11') !== -1 || userAgent.indexOf('Linux') !== -1) {
			operationSystemTypeNUM = 3;
		} else if (/Android/.test(userAgent)) {
			operationSystemTypeNUM = 4;
		} else if (/iPhone|iPad|iPod/.test(userAgent)) {
			operationSystemTypeNUM = 5;
		} else if (userAgent.indexOf('Chromium OS') !== -1) {
			operationSystemTypeNUM = 6;
		} else if (userAgent.indexOf('Windows Phone') !== -1) {
			operationSystemTypeNUM = 7;
		} else if (userAgent.indexOf('BlackBerry') !== -1) {
			operationSystemTypeNUM = 8;
		} else if (userAgent.indexOf('Tizen') !== -1) {
			operationSystemTypeNUM = 9;
		}
		// return the operation system type number
		return operationSystemTypeNUM;
	}

	/**
	 * Convert base64 string to Uint8Array.
	 */
	function urlBase64ToUint8Array( base64String ) {
		// convert the base64 string to a Uint8Array
		const padding = '='.repeat((4 - base64String.length % 4) % 4);
		// replace characters
		const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
		// convert to Uint8Array
		const rawData = window.atob(base64);
		// create the array
		const outputArray = new Uint8Array(rawData.length);
		// loop through the array
		for (let i = 0; i < rawData.length; ++i) {
			// set the array value
			outputArray[i] = rawData.charCodeAt(i);
		}
		// return the array
		return outputArray;
	}

	/**
	 * The function trying to parse the sent JSON string, we use it to prevent
	 * JS error if the JSON is not valid from some reason. 
	 */
	function tryParseJSON( str) {
		// try parse the sent JSON
		try {
			var Obj = JSON.parse(str);
			if ( Obj && typeof Obj === 'object' ) {
				return Obj;
			}
		} catch (e) {}
		// return false instead of invalid JSON
		return false;
	}

	// Return the object
	return _;
}();
