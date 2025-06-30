/**
 * This tool is used for attaching customers to a spesific flow. The tool
 * also can create new customers
 */
var CustomersSelection = function() {

	// Get objects
	let _ = {
		$input: null,
		$container: null,
		websiteID: null,
		translations: null,
		customersAmountToLoad: null,
		customersSelectedSaveCallback: null,
		onChangeCallback: null,
		addNewCustomerCallback: null,
		customersAjaxUrl: '/versions/2/wizard/customers/getSubsribersAjax.php',
	};

	/**
	 * Initialize the customers selection
	 */
	_.cs_init = function( settings ) {
		// set the translations
		_.translations = settings.translations;
		_.$container = settings.$container;
		_.onChangeCallback = settings.onChangeCallback;
		_.addNewCustomerCallback = settings.addNewCustomerCallback;
		_.cancelAddNewCustomerCallback = settings.cancelAddNewCustomerCallback;
		_.customersSelectedSaveCallback = settings.customersSelectedSaveCallback;
		_.customersAmountToLoad = settings.customersAmountToLoad;
		_.websiteID = settings.websiteID;
		_.$modalsParent = settings.$modalsParent;
		_.selectedCustomerData = settings.selectedCustomerData;
		_.popularCustomers = settings.popularCustomers;
		// set the input
		if ( settings.$container ) {
			// get the container where we need to inject the html
			_.$container = settings.$container;
			// create wrapper
			_.$wrapper = $(`
				<div class="flex flex-gap-10 flex-div-center customers-selection-wrapper">
					<select id="selectCustomer" data-placeholder="${_.translations.searchCustomer}" class="uiRichSelect" data-option-theme="customers" data-option-ajax-url="${_.customersAjaxUrl}" ${_.selectedCustomerData.email ? `data-selected-customer="${_.selectedCustomerData.email}"` : ''} data-website-id="${_.websiteID}" required></select>
					<button type="button" class="btn btn-primary add-new-customer" data-rel="tooltip" title="${_.translations.addNewCustomer}">
						<i class="fa fa-plus"></i>
						<span class="item-button-text">${_.translations.addNewCustomer}</span>
					</button>
				</div>
			`);
			// get the input we need to work with
			_.$input = _.$wrapper.find('#selectCustomer');
			// append the input to the container
			_.$container.append(_.$wrapper);
			// initialize tooltips
			InitializeToolTips();
			// initialize the ui rich select
			let uiRichSelect = new UiRichSelect();
			// add on change callback
			_.$input.on('change.CustomersSelection', function( event, value ) {
				// get the selected item
				let $selectedItem = $(_.$input.get(0).tomselect.getOption($(this).val()));
				// get the all settings
				let allSettings = tryParseJSON($selectedItem.find('.allSettings').val());
				// call the onChangeCallback for other systems
				if ( _.onChangeCallback ) _.onChangeCallback.call(this,{
					dataSource: allSettings
				},($selectedItem.length > 0 ? 'customerSelected' : 'customerRemoved'));
			});
			/**
			 * Add listener for adding new customer using the add new option api
			 * DOC: https://tom-select.js.org/docs/events/
			 */
			_.$input.get(0).tomselect.on('option_add', function( value, data ) {
				// after the option was added we immidaetly remove it for giving the effect of adding the new customer
				_.$input.get(0).tomselect.removeOption(value);
				// call the onAddNewCustomer callback
				openAddNewCustomer(value,addNewCustomerCallback,cancelAddNewCustomerCallback);
			});
			/**
			 * Add new customer initialize
			 */
			_.$wrapper.find('.add-new-customer').off('click').on('click',function() {
				openAddNewCustomer('',addNewCustomerCallback,cancelAddNewCustomerCallback);
			});
		// no input so render the modal
		} else {
			_.renderSelectCustomerModal({});
		}
	};

	/**
	 * The method is rendering a default modal for selecting customers when no input is provided
	 */
	_.renderSelectCustomerModal = function( selectedCustomerData ) {
		// destroy the add new customer modal so it will be created again without previus data
		SystemModals.sm_destroy('selectCustomerModal');
		/**
		 * Add New Customer Modal Initialize
		 */
		SystemModals.sm_render({
			id: 'selectCustomerModal',
			disposable: false,
			$parent: _.$modalsParent,
			offCanvasDirection: 'reverse',
			sizeClasses: 'size-s1',
			headerSettings: {
				id: 'selectCustomerModalTitle',
				title: _.translations.addNewCustomer
			},
			bodySettings: {
				id: 'selectCustomerModalBody',
				content: ''
			},
			footerSettings: {
				isActive: true,
				buttons: [{
					class: 'btn btn-success add-new-customer-save-btn',
					text: _.translations.save
				},{
					class: 'btn btn-link add-new-customer-cancel-btn',
					text: _.translations.cancel
				}]
			},
			showCallback: function ( event, modal ) {
				setCustomerSelectBody(selectedCustomerData);
			}
		});
		// show the add new customer modal
		SystemModals.sm_get('selectCustomerModal').show();
	}

	/**
	 * The function is setting the customer modal body
	 */
	function setCustomerSelectBody( selectedCustomerData ) {
		// destroy the add new customer modal so it will be created again without previus data
		let modal = SystemModals.sm_get('selectCustomerModal');
		// set body html
		modal.updateHTML('body',`
		<div class="widget-main">
			<div class="in-box-widget">
				<div class="widget-box static">
					<div class="widget-header">
						<h5 class="widget-title">${_.translations.chooseCustomer}</h5>
						<div class="widget-toolbar">
							<a><i class="ace-icon fa fa-chevron-down"></i></a>
						</div>
					</div>
					<div class="widget-body">
						<div class="widget-main">
							<div class="customer-container">
								<div class="form-group">
									<div class="flex flex-gap-10 flex-div-center customers-selection-wrapper">
										<select id="selectCustomer" data-placeholder="${_.translations.searchCustomer}" class="uiRichSelect" data-option-theme="customers" data-option-ajax-url="${_.customersAjaxUrl}" data-website-id="${_.websiteID}" required ${selectedCustomerData.email ? `data-selected-customer="${selectedCustomerData.email}"` : ''}></select>
										<a href="javascript:void(0)" class="btn btn-primary add-new-customer" data-rel="tooltip" title="${_.translations.addNewCustomer}">
											<i class="fa fa-plus"></i>
											<span class="item-button-text">${_.translations.addNewCustomer}</span>
										</a>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		`);
		// set the input
		_.$input = modal.$html.find('#selectCustomer');
		// on save button click
		modal.$html.find('.add-new-customer-save-btn').off('click').on('click',function() {
			// hide the select customer modal
			modal.hide();
			// call the customers selected save callback
			if ( _.customersSelectedSaveCallback ) _.customersSelectedSaveCallback.call(this);
		});
		// on cancel button click
		modal.$html.find('.add-new-customer-cancel-btn').off('click').on('click',function() {
			// hide the select customer modal
			modal.hide();
			// call the customers selected cancel callback
			if ( _.customersSelectedCancelCallback ) _.customersSelectedCancelCallback.call(this);
		});
		// add on change callback
		_.$input.on('change.CustomersSelection', function( event, value ) {
			// get the selected item
			let $selectedItem = $(_.$input.get(0).tomselect.getOption($(this).val()));
			// get the all settings
			let allSettings = tryParseJSON($selectedItem.find('.allSettings').val());
			// call the onChangeCallback for other systems
			if ( _.onChangeCallback ) _.onChangeCallback.call(this,{
				dataSource: allSettings
			});
		});
		// initialize tooltips
		InitializeToolTips();
		// initialize the ui rich select
		let uiRichSelect = new UiRichSelect();
		// on save button click
		modal.$html.find('.add-new-customer').off('click').on('click',function() {
			openAddNewCustomer('',function(selectedCustomerData) {
				// rebuild the select customer modal with the new customer data
				setCustomerSelectBody(selectedCustomerData);
				// now run the global callback
				addNewCustomerCallback( selectedCustomerData );
			},cancelAddNewCustomerCallback);
		});
		/**
		 * Add listener for adding new customer using the add new option api
		 * DOC: https://tom-select.js.org/docs/events/
		 */
		_.$input.get(0).tomselect.on('option_add', function( value, data ) {
			// after the option was added we immidaetly remove it for giving the effect of adding the new customer
			_.$input.get(0).tomselect.removeOption(value);
			// open the add new customer modal
			openAddNewCustomer(value,function(selectedCustomerData) {
				// rebuild the select customer modal with the new customer data
				setCustomerSelectBody(selectedCustomerData);
				// now run the global callback
				addNewCustomerCallback( selectedCustomerData );
			},cancelAddNewCustomerCallback);
		});
	}

	/**
	 * The fucntion is running the add new customer global callbacks
	 */
	function addNewCustomerCallback( selectedCustomerData ) {
		// run the add new customer callback
		if ( _.addNewCustomerCallback ) _.addNewCustomerCallback.call(this,selectedCustomerData);
		// run the onChangeCallback for other systems
		if ( _.onChangeCallback ) _.onChangeCallback.call(this,{
			dataSource: selectedCustomerData
		},'addNewCustomer');
	}

	/**
	 * The fucntion is running the cancel add new customer global callbacks
	 */
	function cancelAddNewCustomerCallback() {
		if ( _.cancelAddNewCustomerCallback ) _.cancelAddNewCustomerCallback.call(this);
	}

	/**
	 * The function is opening the new customer modal
	 */
	function openAddNewCustomer( email ,successCallback, cancelCallback ) {
		// initialize the new customer modal
		_.NewCustomerModal.nc_init({
			// add email we want to appear in the email field
			newCustomerEmail: email,
			// add the new customer data to the input
			addNewCustomerCallback: successCallback,
			// show the modal again
			cancelAddNewCustomerCallback: cancelCallback
		});
	}

	/**
	 * Add new customer externtion - This tool is handling the new customer flow
	 */
	_.NewCustomerModal = function() {

		// Get objects
		let _ = {
			$input: null,
			addNewCustomerCallback: null,
			cancelAddNewCustomerCallback: null,
			newCustomerEmail: null,
			iframeBaseURL: '/versions/2/wizard/customers/addNewCustomer.php?w={{websiteID}}&email={{newCustomerEmail}}'
		};

		/**
		 * Initialize the new customer modal
		 */
		_.nc_init = function( settings ) {
			// get objects
			_.$input = CustomersSelection.$input;
			_.addNewCustomerCallback = settings.addNewCustomerCallback;
			_.cancelAddNewCustomerCallback = settings.cancelAddNewCustomerCallback;
			_.newCustomerEmail = settings.newCustomerEmail;
			_.iframeURL = _.iframeBaseURL.replace('{{websiteID}}',CustomersSelection.websiteID);
			_.iframeURL = _.iframeURL.replace('{{newCustomerEmail}}',_.newCustomerEmail);
			// render the new customer modal
			_.render();
		};

		/**
		 * The method is rendering the new customer modal
		 */
		_.render = function() {
			// destroy the add new customer modal so it will be created again without previus data
			SystemModals.sm_destroy('addNewCustomerModal');
			/**
			 * Add New Customer Modal Initialize
			 */
			SystemModals.sm_render({
				id: 'addNewCustomerModal',
				disposable: false,
				$parent: CustomersSelection.$modalsParent,
				offCanvasDirection: 'reverse',
				sizeClasses: 'size-s1',
				headerSettings: {
					id: 'addNewCustomerModalTitle',
					title: CustomersSelection.translations.addNewCustomer
				},
				bodySettings: {
					id: 'addNewCustomerModalBody',
					content: `<iframe name="addNewCustomerModal" style="border:0;" src="${_.iframeURL}" height="533" width="100%"></iframe>`
				},
				footerSettings: {
					isActive: false,
					buttons: [],
				},
				showCallback: function ( event, modal ) {
					// initilaze event after adding new customer
					$(window.parent).one('message', function(e) {
						const data = e.originalEvent.data;
						if ( data.type === 'addNewCustomer.success' ) {
							SystemModals.sm_get('addNewCustomerModal').hide();
							if ( _.addNewCustomerCallback ) _.addNewCustomerCallback.call(this,{
								email: data.customer.email,
								phone: data.customer.phone,
								first_name: data.customer.first_name,
								last_name: data.customer.last_name,
								country: data.customer.country,
							});
						}
					});
				}
			});
			// show the add new customer modal
			SystemModals.sm_get('addNewCustomerModal').show();
		};

		// Return the object
		return _;	
	}();

	// Return the object
	return _;	
}();