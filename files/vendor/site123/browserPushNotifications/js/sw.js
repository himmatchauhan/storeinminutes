/**
 * The method is responsible for the service worker installation flow.
 * Service Worker Life Cycle Documentation: https://developers.google.com/web/fundamentals/primers/service-workers/lifecycle
 */
self.addEventListener('install', function( event ) {
	/**
	 * Make the new service worker immediately take effect
	 * More Explanation: https://bitsofco.de/what-self-skipwaiting-does-to-the-service-worker-lifecycle/
	 */
	self.skipWaiting();
});

/**
 * The method is responsible for handling the fetch requests.
 * Note: At the moment we always work with live version of the requests and without any local
 * cache but in the future if we want to add off-line app support we add here the
 * cache logic.
 * Documentation: https://developers.google.com/web/fundamentals/primers/service-workers
 */
self.addEventListener('fetch', function( event ) {
	return event.request;
});

/**
 * The method is responsible for handling the push notifications.
 */
self.addEventListener('push', function(event) {
	// set objects 
	let data = {};
	// get the data
	if (event.data) {
		data = event.data.json();
	}
	// set the options (synced with `PushNotificationByUserID()`)
	const options = {
		// set the body
		body: data.body,
		// set the icon
		icon: data.icon,
		// set the image
		image: data.image,
		// set the badge
		badge: data.badge,
		// set the text direction
		dir: data.dir,
		// set a unique tag for each notification to force a new notification even when a notification with the same tag already exists
		tag: data.tag || 'notification-' + Date.now(),
		// ensure that the notification always makes a sound
		silent: false,
		// for better visibility on mobile devices: vibrate for 200ms, pause for 100ms, then vibrate for 200ms
		vibrate: [200, 100, 200],
		// set the actions
		actions: data.actions,
		// set the data
		data: {
			// set the URL
			url: data.data ? data.data.url : '',
			// set the custom key
			customKey: data.data ? data.data.customKey : ''
		}
	};
	// show the notification
	event.waitUntil(
		self.registration.showNotification(data.title, options)
	);
});

/**
 * The method is responsible for handling the notification click event.
 */
self.addEventListener('notificationclick', function( event ) {
	// close the notification
	event.notification.close();
	// get the notification data
	const urlToOpen = new URL(event.notification.data.url, self.location.origin).href;
	// handle the click event
	event.waitUntil(
		// attempt to open the URL
		clients.openWindow(urlToOpen).catch(function( err ) {
			// create a link element and simulate a click
			const link = document.createElement('a');
			link.href = urlToOpen;
			link.target = '_blank';
			link.rel = 'noopener noreferrer';
			link.click();
		}).then(function() {
			// log success or failure
		})
	);
});
