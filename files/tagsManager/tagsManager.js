/**
 * Tags Manager - This class is managing the tags of the module and the relations between the tags and the module items
 * Implimentation Instructions:
 * 1. Open file history for `orders/manage/donate/include/orders-list-mobile-html.php` and `orders/manage/donate/include/orders-list-pc-html.php`
 * 2. Open file history for `ordersHeader.php`
 * 3. Open file history for `ordersFooter.php`
 * 
 * And just do the same implimentation of the js / ccs / html elements
 */
const TagsManger = function() {

	// Set object
	var _ = {
		tagList: [],
		websiteID: '',
		typeNUM: '',
		parentSettings: '',
		translations: {},
		createTagCallBack: '',
		removeTagCallBack: '',
		assignTagCallBack: '',
		unassignTagCallBack: '',
		tagChangeCallBack: '',
		$filterContainer: '',
		tagNameMaxLength: 50,
		palette: ["#baf3dc", "#f8e6a1", "#ffe2be", "#ffd2cd", "#dfd8fe","#4bce98", "#e2b204", "#faa53e", "#f87463", "#9f8ff0","#1f845b", "#946f01", "#b65c03", "#ca3522", "#6e5dc7","#cce100", "#c1f0f6", "#d3f1a8", "#fdd0ed", "#dcdfe5","#579dff", "#60c6d3", "#94c749", "#e774bc", "#8590a3","#0c66e5", "#1d7f8d", "#5b7f25", "#ae4788", "#626f87"],
		maxTags: 10,
		isLoaded: false,
	};

	/**
	 * Initialize
	 */
	_.tm_init = function( settings ) {
		// get settings
		_.websiteID = settings.websiteID;
		_.typeNUM = settings.typeNUM;
		_.parentSettings = settings.parentSettings;
		_.$container = settings.$container;
		_.$filterContainer = settings.$filterContainer;
		_.translations = settings.translations;
		// callbacks
		_.createTagCallBack = settings.createTagCallBack;
		_.removeTagCallBack = settings.removeTagCallBack;
		_.assignTagCallBack = settings.assignTagCallBack;
		_.unassignTagCallBack = settings.unassignTagCallBack;
		_.tagChangeCallBack = settings.tagChangeCallBack;
		// reset tag list
		_.tagList = [];
		// initlaize the tags
		$.each(settings.tagList, function(tagID, tagInfo) {
			// get tag object
			const tag = new Tag({
				uniqueID: tagInfo.uniqueID,
				name: tagInfo.nameTXT,
				color: tagInfo.colorTXT,
				relatedItemsIDS: tagInfo.relatedItemsIDS,
			});
			// add the tag to array
			_.tagList.push(tag);
			// add the tag to page
			addTagToPage(tag);
		});
		// initialize events of the tags
		_.$container.each(function() {
			// get the container
			const $container = $(this);
			// get container id
			let uniqueID = uniqid('tm-container-');
			// set id
			$container.attr('id',uniqueID);
			// set html
			$container.html(`
				<div class="btn-group">
					<a class="manage-tags">
						<span class="tm-text-icon"><i class="fal fa-plus"></i> ${_.translations.assignTag}</span>
						<span class="tm-only-icon" style="display:none;"><i class="fa-regular fa-tag"></i></span>
					</a>
				</div>
			`);
			// on drop down show re render the tags
			$container.off('click').on('click','.manage-tags', function(e) {
				e.stopPropagation(); 
				let $this = $(this);
				// Updated popover visibility check
				var popoverId = $this.attr('aria-describedby');
				var $popover = popoverId ? $('#' + popoverId) : $('.popover.tag-manager-popover');
				if ($popover.length && $popover.is(':visible')) {
					$this.popover('destroy');
					$(document).off('mousedown.tagManagerPopover');
					return;
				}			
				$('.tm-container a.manage-tags').popover('destroy');
				$(document).off('mousedown.tagManagerPopover');
				_.isLoaded = false;
				
				let html = `<div>
					<div class="tm-admin-container" data-id="${$container.parents('.tm-root').data(_.parentSettings.dataIDSelector)}">
						<div class="widget-box activate static tm-admin" style="margin: 0;"></div>
						<div class="tm-editor">
							<div class="widget-box activate static" style="margin: 0;">
								<div class="widget-header h-primary">
									<h5 class="widget-title"></h5>
									<a href="#" class="exit-editor">
										<i class="ace-icon fa fa-arrow-${$('html[dir="rtl"]').length > 0 ? 'right' : 'left'}"></i>
									</a>
								</div>
								<div class="widget-body">
									<div class="widget-main">
										<form class="tm-editor-form">
											<div class="form-group">
												<label for="tagName">${_.translations.tagName}</label>
												<input name="tagName" type="text" class="form-control" placeholder="${_.translations.enterName}" maxLength="${_.tagNameMaxLength}" required>
											</div>
											<div class="form-group">
												<div class="tm-editor-color-list">${getColorList()}
												</div>
											</div>
											<div class="tm-editor-buttons">
												<button type="submit" class="btn btn-primary btn-sm saveTag">
												${_.translations.save}
												<i class="loading-icon ace-icon fa fa-spinner fa-spin"></i>
												</button>
												<button type="button" class="btn btn-danger btn-sm removeTag">${_.translations.delete}</button>
											</div>
											<input name="tagID" type="hidden">
											<input name="tagColor" type="hidden">
										</form>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>`;
				let $html = $(html);
				renderAdmin($html);
				// bind all admin events
				rebindAdminEvents($html);
				// edit tag
				$html.find('.tm-editor .exit-editor').off('click').on('click', function(e) {
					// prevent default event
					e.preventDefault();
					// exit edit mode
					exitEditMode($html);
				});
				// remove tag
				$html.find('.tm-editor .removeTag').off('click').on('click', function(e) {
					// prevent default event
					e.preventDefault();
					e.stopPropagation();
					// get objects
					const $tagItem = $html.find(`.tm-admin .tagItem[data-id="${$html.find('.tm-editor-form [name="tagID"]').val()}"]`);
					// remove the tag
					removeTag($tagItem,$html);
				});
				// close popover
				$(document).on('click', '.tm-admin-dismiss', function(e) {
					const $popover = $(this).closest('.popover.tag-manager-popover');
					const uniqueID = $popover.data('id');
					const $container = $(`.tm-container`).filter(function() {
						return $(this).parents('.tm-root').data(_.parentSettings.dataIDSelector) == uniqueID;
					});
					if ($container.length) {
						$container.find('a.manage-tags').popover('destroy');
					}
					$(document).off('mousedown.tagManagerPopover');
				});
				// Determine popover placement - for mobile, use 'bottom' for first message, 'top' for others
				let popoverPlacement = tagPopupDirection;
				if ($('html[data-device="mobile"]').length > 0) {
					// Check if this is the first message in the list by checking if it's the first .tm-root element
					let $currentTmRoot = $container.parents('.tm-root');
					let $allTmRoots = $('.tm-root');
					let isFirstMessage = $allTmRoots.index($currentTmRoot) === 0;
					
					if (isFirstMessage) {
						popoverPlacement = 'bottom';
					} else {
						popoverPlacement = 'top';
					}
				}

				/**
				 * Bootstrap's Popovers Plugin Initial
				 * Documentation : http://getbootstrap.com/javascript/#popovers
				 */
				$container.find('a.manage-tags').popover({
					container: 'body',
					content: $html,
					html: true,
					trigger: 'manual',
					template: `<div class="popover tag-manager-popover" role="tooltip" data-id="${$container.parents('.tm-root').data(_.parentSettings.dataIDSelector)}"><div class="arrow"></div><div class="popover-content"></div></div>`,
					placement: popoverPlacement,
				}).on('shown.bs.popover', function () {
					// destroy the Popover when the user clicks outside it
					$(document).off('mousedown.tagManagerPopover').on('mousedown.tagManagerPopover', function (event) {
						if ($(event.target).closest('.popover.tag-manager-popover').length === 0 && 
							!$(event.target).hasClass('manage-tags') && 
							!$(event.target).closest('.manage-tags').length) {
							$('.tm-container a.manage-tags').popover('destroy');
							$(document).off('mousedown.tagManagerPopover');
						}
					});
					// update loaded flag
					_.isLoaded = true;
				}).popover('show');
				// save the popover top position half second after it's shown on the screen
				setTimeout(function() {
					var $arrow = $container.closest('body').find('.popover.tag-manager-popover .arrow');
					if ( $arrow.length > 0 ) {
						$arrow.css('top',$arrow.position().top + 'px');
					}
				},500);
				/**
				 * The function destroy the Popover and removes event handlers that were attached to it
				 */
				function destroyPopover() {
					$('.tm-container a.manage-tags').popover('destroy');
					$(document).off('mousedown.tagManagerPopover');
				}
			});
		});
	};

	/**
	 * The method is assgning / unassigning a tag to an item
	 */
	_.tagAction = function( uniqueID, relationItemUniqueIDS, actionCallbak ) {
		// get tag object
		const tag = _.tagList.find(tag => tag.uniqueID == uniqueID);
		// get action
		let action = '';
		// check if the tag is not assigned to the item
		if ( !tag.relatedItemsIDS.find(itemID => itemID == relationItemUniqueIDS[0]) ) {
			action = 'assign';
		// unassign the tag from the item
		} else {
			action = 'unassign';
		}
		// handle tag relations
		$.ajax({
			type: 'POST',
			url: '/files/tagsManager/tagRelation.php',
			data: {
				w: _.websiteID,
				websiteID: _.websiteID,
				typeNUM: _.typeNUM,
				tagUniqueID: uniqueID,
				tagName: tag.name,
				relationItemUniqueIDS: JSON.stringify(relationItemUniqueIDS),
				action: action,
			},
			success: ( data ) => {
				// get object
				data = tryParseJSON(data);
				// check if the tag was assigned / unassigned
				if ( data.sucess ) {
					// update tag object so it will not be considered as new
					tag.isNew = false;
					// handle tag relations
					switch ( action ) {
						// assign the tag to the item
						case 'assign':
							// add the item to the tag relations
							tag.relatedItemsIDS.push(relationItemUniqueIDS[0]);
							// add the tag to the page
							addTagToPage(tag);
							break;
						// unassign the tag from the item
						case 'unassign':
							// remove the item from the tag relations
							tag.relatedItemsIDS.splice(tag.relatedItemsIDS.indexOf(relationItemUniqueIDS[0]),1);
							// remove the tag from the page
							unassignTagFromItem(relationItemUniqueIDS[0],tag);
							break;
					}
				}
				// action callback
				if ( actionCallbak ) actionCallbak.call(this);
			}
		});
	};

	/**
	 * The method is returning the html of the color list
	 */
	function getColorList() {
		let html = '';
		_.palette.forEach(( color ) => {
			html += `<div class="tm-color-item" data-color="${color}" style="background-color: ${color};"></div>`;		
		});
		return html;
	}

	/**
	 * The method is rendering the admin html because
	 * we somtime need to rebuild completly after some changes
	 * such as delete and open
	 */
	function renderAdmin( $container ) {
		// render tool html
		$container.find('.tm-admin').html(`
			<div class="widget-header h-primary tm-header">
				<h5 class="widget-title">${_.translations.tags}</h5>
				<a href="javascript:void(0);" class="tm-admin-dismiss">
					<i class="fal fa-times tm-icon"></i>
				</a>
			</div>
			<div class="widget-body">
				<div class="widget-main tm-body">
					<ul class="tagList list-unstyled fancy-scrollbar">
						${rednerTags($container.find('.tm-admin-container').data('id'))}
					</ul>
					<div class="create-new-tag-container">
						<a href="#" class="create-new-tag btn btn-default btn-sm btn-block">
							<i class="fal fa-plus"></i>
							${_.translations.addTag}
						</a>
					</div>
				</div>
			</div>
		`);
		// inialize dependencies
		initDependencies($container);
		// if the user has reached the maximum amount of tags, disable the add tag button
		disableEnableAddTag($container);
	}

	/**
	 * The function is disabling or enabling the add tag button
	 * when user has reached the maximum amount of tags
	 */
	function disableEnableAddTag( $container ) {
		// disable button becase the maximum amount of tags has been reached
		if ( _.tagList.length >= _.maxTags ) {
			$container.find('.tm-admin .create-new-tag').addClass('disabled');
			$container.find('.tm-admin .create-new-tag').attr({
				'data-rel': 'tooltip',
				'title': _.translations.maxTagsReached.replace('{{maximumTagsNumber}}',_.maxTags),
			});
			InitializeToolTips();
		// enable button
		} else {
			$container.find('.tm-admin .create-new-tag').removeClass('disabled');
			$container.find('.tm-admin .create-new-tag').attr({
				'data-rel': '',
				'title': '',
			});
			$container.find('.tm-admin .create-new-tag').tooltip('destroy');
		}
	}

	/**
	 * The function is removing the tag from the page
	 */
	function removeTag( $tag, $container ) {
		// get tag object
		const tag = _.tagList.find(tag => tag.uniqueID == $tag.data('id'));
		// remove tag action
		$.ajax({
			type: 'POST',
			url: '/files/tagsManager/removeTag.php',
			data: {
				w: _.websiteID,
				websiteID: _.websiteID,
				typeNUM: _.typeNUM,
				tagUniqueID: tag.uniqueID,
				tagName: tag.name,
			},
			success: ( data ) => {
				// get object
				data = tryParseJSON(data);
				// check if the tag was removed
				if ( data.sucess ) {
					// remove tooltip
					$tag.find('.removeTag').tooltip('destroy');
					// remove tag
					$tag.remove();
					// remove tag from tag list
					_.tagList.splice(_.tagList.indexOf(tag),1);
					// notify parent window directly after removing the tag
					notifyParentWindowOfTagsChange();
					// render tool html
					renderAdmin($container);
					// remove the tag from the page
					$.each(tag.relatedItemsIDS, function( index, itemID ) {
						unassignTagFromItem(itemID,tag);;
					});
					// run remove callback
					if ( _.removeTagCallBack ) _.removeTagCallBack.call(this,tag);
					// exit edit mode
					exitEditMode($container);
				}
			}
		});
	}

	/**
	 * The function is initialzing dependencies that the tag item
	 * is using such as color picker, tooltips, etc.
	 */
    function initDependencies( $container ) {
		// editor dependencies
        $container.find('.tm-editor').each(function() {
			// get the color picker
            const $editor = $(this);
			/**
			 * Bootstrap Confirmation
			 * Documentation : https://ethaizone.github.io/Bootstrap-Confirmation/
			 */
			$editor.find('.removeTag').confirmation({
				placement: intrface_align_reverse + ' auto',
				title: _.translations.areYouSure,
				btnOkLabel: '<i class="icon-ok-sign icon-white"></i> '+_.translations.yes+'',
				btnCancelLabel: '<i class="icon-remove-sign"></i> '+_.translations.no+'',
				popout: true,
				singleton: true,
				container: 'body',
				btnOkClass: 'btn-danger btn-sm spacing-confirmation-btn',
				btnCancelClass: 'btn-default btn-sm spacing-confirmation-btn',
				onConfirm: function() { return true; }
			});
			// the confirmation has a build in backdrop and we don't need it here because this tool aslo has a backdrop
			$editor.find('.removeTag').on('show.bs.confirmation hide.bs.confirmation', function( event ) {
				$('.backdropManaul').remove();
			});
        });
		// show / hide no tags message
        $container.find('.tagList').each(function() {
			if ( _.tagList.length == 0 ) {
				$(`<span class="no-tags-msg">${_.translations.noTagsMsg}</span>`).insertBefore($(this));
			} else {
				$(this).parent().find('.no-tags-msg').remove();
			}
        });
    }

	/**
	 * The method is converting the tag name to editable element
	 */
	function enterEditMode( $container, $tagItem ) {
		// add the edit mode class to prevent other events
		$container.find('.tm-admin-container').addClass('edit-mode');
		// get objects
		let tag = null;
		let $form = $container.find('.tm-editor-form');
		let $colors = $form.find('.tm-editor-color-list .tm-color-item');
		// load tag info
		if ( $tagItem ) {
			tag = _.tagList.find(tag => tag.uniqueID == $tagItem.data('id'));
		// create tag object
		} else {
			tag = new Tag({
				name: _.translations.newTag,
				color: _.palette[Math.floor(Math.random() * _.palette.length)],
				isNew: true,
				// on save we also send ajax to assign the tag to the item
				itemToAssign: $container.find('.tm-admin-container').data('id'),
			});
		}
		// update the view
		$container.find('.tm-editor .widget-title').text(tag.name);
		// populate the form inputs
		$form.find('[name="tagName"]').val(tag.name)
		// also select the text
		.select();
		$form.find('[name="tagColor"]').val(tag.color);
		$form.find('[name="tagID"]').val(tag.uniqueID);
		// select the color
		$colors.removeClass('active');
		$colors.filter(`[data-color="${tag.color}"]`).addClass('active');
		// handle active class on user selection
		$colors.on('click', function( event ) {
			let $selectedColor = $(this);
			$colors.removeClass('active');
			$selectedColor.addClass('active');
			$form.find('[name="tagColor"]').val($selectedColor.data('color'));
		});
		// new tag only - hide the delete tag button
		if ( tag.isNew ) {
			$form.find('.removeTag').hide();
		// editing tag - show the delete tag button
		} else {
			$form.find('.removeTag').show();
		}
		/**
		 * jQuery Validation Plugin Initial
		 * Documentation : http://jqueryvalidation.org/documentation/
		 */
		$form.validate({
			errorElement: 'div',
			errorClass: 'help-block',
			focusInvalid: true,
			/* [contenteditable="true"]:not([name]) = we had JS errors when the user focus out the editor, to fix it
			we ignore the editor inputs: https://stackoverflow.com/a/58092791/469161 */
			ignore: ':hidden:not(.file-upload-input-field,[data-editor="froala"]),.fileUploadBox:hidden .file-upload-input-field,.form-tool-builder .form-control,.form-tool-builder input,[contenteditable="true"]:not([name])',
			highlight: function (e) {
				$(e).closest('.form-group').removeClass('has-info').addClass('has-error');
			},
			invalidHandler: function(form, validator) {
				
				if ( !validator.numberOfInvalids() ) return;
			},
			success: function (e) {
				$(e).closest('.form-group').removeClass('has-error');
				$(e).remove();
			},
			errorPlacement: function (error, element) {
				if( element.is('input[type=checkbox]') || element.is('input[type=radio]') ) {
					var controls = element.closest('div[class*="col-"]');
					if( controls.find(':checkbox,:radio').length > 1 ) controls.append(error);
					else error.insertAfter(element.nextAll('.lbl:eq(0)').eq(0));
				}
				else if( element.is('.select2') ) {
					error.insertAfter(element.siblings('[class*="select2-container"]:eq(0)'));
				}
				else if( element.is('.chosen-select') ) {
					error.insertAfter(element.siblings('[class*="chosen-container"]:eq(0)'));
				}
				else {
					error.appendTo(element.closest('.form-group'));
				}
			},
			submitHandler: function( form ) {
	
				//Disable the submit button to prevent multiple submit
				$(form).find('button:submit').prop('disabled', true);
	
				//Approve form submit
				return true;
			}
		});
		// add submit listener
		$form.on('submit', function( event ) {
			// prevent default
			event.preventDefault();
			// disable button to prevenet mutiple submits
			$form.find('[type="submit"]').prop('disabled',true);
			// if the form is invalid we exit
			if ( !$form.valid() ) {
				$form.find('[type="submit"]').prop('disabled',false);
				return;
			}
			// editing tag security - if the user didn't change anything we just exit the edit mode
			if ( !tag.isNew && tag.name == $form.find('[name="tagName"]').val() && tag.color == $form.find('[name="tagColor"]').val() ) {
				$form.find('[type="submit"]').prop('disabled',false);
				exitEditMode($container);
				return;
			}
			// update the tag object
			tag.name = $form.find('[name="tagName"]').val();
			tag.color = $form.find('[name="tagColor"]').val();
			// add the tag to array
			if ( tag.isNew ) {
				// add the tag to tags list
				_.tagList.push(tag);
				// add the tag to dropwdown list
				$container.find('.tm-admin').find('.tagList').append(getTagHTML(tag,''));
			}
			// if the user has reached the maximum amount of tags, disable the add tag button
			disableEnableAddTag($container);
			// save the tag
			addEditTag(tag.uniqueID,function() {
				// enable the submit button
				$form.find('[type="submit"]').prop('disabled',false);
				// exit the edit mode
				exitEditMode($container);
				// update all tags in the page
				updateTagInPage(tag);
			});
			// run callback of the create tag so other tools will react if needed
			if ( _.createTagCallBack ) _.createTagCallBack.call(this,tag);
		});
	}

	/**
	 * The method is exiting from edit mode
	 */
	function exitEditMode( $container ) {
		// reset the form
		$container.find('.tm-editor-form').get(0).reset();
		// remove submit listener
		$container.find('.tm-editor-form').off('submit');
		// exit the edit mode
		$container.find('.tm-admin-container').removeClass('edit-mode');
		// re render the drop down list
		renderAdmin($container);
		// rebind all necessary events after rendering
		rebindAdminEvents($container);
	}

	/**
	 * Rebind all necessary events after rendering the admin panel
	 */
	function rebindAdminEvents($container) {
		// assign tag to item
		$container.find('.tm-admin .tagItem').off('click').on('click', function(e) {
			// get objects
			let $this = $(this);
			let $target = $(e.target);
			let $tagItem = $this.closest('.tagItem');
			let $checkbox = $tagItem.find('.tm-assigment');
			// security - exit if the user clicks on some tag action button for example edit
			if ( $target.closest('.tag-action').length > 0 ) return;
			// toggle checkbox
			$checkbox.prop('checked',!$checkbox.prop('checked'))
		});
		// assign tag to item
		$container.find('.tm-admin .tm-assigment').off('change').on('change', function(e) {
			// get objects
			const $this = $(this);
			const $tagItem = $this.closest('.tagItem');
			// assign / unassign the tag
			_.tagAction($tagItem.data('id'),[$tagItem.parents('.tag-manager-popover').data('id')],false,$container.closest('tr').data('cart-type'));
		});
		// create tag
		$container.find('.tm-admin .create-new-tag').off('click').on('click', function(e) {
			// prevent default event
			e.preventDefault();
			// security - prevent from adding more than the maximum amount of tags
			if ( $(this).hasClass('disabled') ) return;
			// enter edit mode of the tag
			enterEditMode($container,false);
		});
		// edit tag
		$container.find('.tm-admin .editTag').off('click').on('click', function(e) {
			// prevent default event
			e.preventDefault();
			// get objects
			const $this = $(this);
			const $tagItem = $this.closest('.tagItem');
			// enter edit mode
			enterEditMode($container,$tagItem);
		});
	}

	/**
	 * Product Option Data Class for initialize a product options data object.
	 */
	function Tag( data ) {
		// Default object structure
		function Def() {
			return {
				uniqueID: uniqid('tm-'),
				name: 'Black',
				color: '#000',
				relatedItemsIDS: []
			};
		}
		// get the default object structure
		var def = new Def();
		// if needed - add missing properties to the sent object
		if (data) {
			data = objectAssign(new Def(), data); // (objectAssign overwrite objects)
		} else {
			data = def;
		}
		// return the initialized object
		return data;
	}

	/**
	 * The function is reutnring the tag list HTML
	 */
	function rednerTags( itemID ) {
		let html = '';
		for (let i = 0; i < _.tagList.length; i++) {
			html += getTagHTML(_.tagList[i],itemID);
		}
		return html;
	}

	/**
	 * The function is reutnring the tags list item HTML
	 */
	function getTagHTML( tag, itemID ) {
		return `
		<li class="tagItem" data-color="${tag.color}" data-name="${tag.name}" data-id="${tag.uniqueID}">
			<div class="tag-info">
				<label class="tm-assigment-input-container">
					<input class="tm-assigment ace input-lg" type="checkbox" ${tag.relatedItemsIDS.includes(itemID) || tag.isNew ? 'checked' : ''}/>
					<span class="tm-assigment-lbl lbl fullColor"></span>
				</label>
				<div class="tm-tagColor" style="background-color: ${tag.color};"></div>
				<span class="tag-name">${tag.name}</span>
			</div>
			<div class="tag-action">
				<a href="#" class="editTag">
					<i class="ace-icon fa fa-pencil"></i>
				</a>
			</div>
		</li>`;
	}

	/**
	 * The function is updating or creating the tag in the DB
	 */
	function addEditTag( uniqueID, callback ) {
		// get object
		const tag = _.tagList.find(tag => tag.uniqueID == uniqueID);
		// add edit action
		$.ajax({
			type: 'POST',
			url: '/files/tagsManager/addEditTag.php',
			data: {
				w: _.websiteID,
				websiteID: _.websiteID,
				typeNUM: _.typeNUM,
				tag: JSON.stringify(tag),
			},
			success: ( data ) => {
				// get object
				data = tryParseJSON(data);
				// tag was successfully created
				if ( data.sucess ) {
					// new item only - When we create a new tag we also want to assign it
					if ( tag.isNew && tag.itemToAssign ) {
						// assign the tag to the item
						_.tagAction(tag.uniqueID,[tag.itemToAssign],callback);
						// update state
						tag.isNew = false;
						// remove the item uniqueID
						delete tag.itemToAssign;
					// exit the edit mode
					} else {
						callback.call(this);
					}
				}
			}
		});
	}

	/**
	 * The function is adding the tags to the related items in the page
	 */
	function addTagToPage( tag ) {
		// add the tag to the related items
		$.each(tag.relatedItemsIDS, function(index, itemID) {
			if ( _.assignTagCallBack ) _.assignTagCallBack.call(this,{
				uniqueID: tag.uniqueID,
				html: `<span data-id="${tag.uniqueID}" class="tm-tag label label-sm" style="background-color:${tag.color};" data-is-color-brightness="${ColorsDetector.isLightDarkColor(tag.color)}">${tag.name}</span>`
			},itemID);
		});
		// notify parent window if we're in an iframe
		notifyParentWindowOfTagsChange();
	}

	/**
	 * The function is updating the tags html in the related items
	 */
	function updateTagInPage( tag ) {
		// update the tag in the related items
		if ( _.tagChangeCallBack ) _.tagChangeCallBack.call(this,tag,`<span data-id="${tag.uniqueID}" class="tm-tag label label-sm" style="background-color:${tag.color};" data-is-color-brightness="${ColorsDetector.isLightDarkColor(tag.color)}">${tag.name}</span>`);
		// notify parent window if we're in an iframe
		notifyParentWindowOfTagsChange();
	}

	/**
	 * The function is removing the tags from the related items in the page
	 */
	function unassignTagFromItem( itemID, tag ) {
		// remove the tag from the related items
		if ( _.unassignTagCallBack ) _.unassignTagCallBack.call(this,tag.uniqueID,itemID);
		// notify parent window if we're in an iframe
		notifyParentWindowOfTagsChange();
	}
	
	/**
	 * The function notifies the parent window of tag changes if we're in an iframe
	 */
	function notifyParentWindowOfTagsChange() {
		// check if we're in an iframe
		if (window !== window.parent) {
			try {
				// create a serializable version of the tag list
				const serializableTagList = {};
				_.tagList.forEach(tag => {
					serializableTagList[tag.uniqueID] = {
						uniqueID: tag.uniqueID,
						nameTXT: tag.name,
						colorTXT: tag.color,
						relatedItemsIDS: tag.relatedItemsIDS
					};
				});
				// send a message to the parent window with the updated tag list
				window.parent.postMessage({
					action: 'tagsUpdated',
					tagList: serializableTagList,
					websiteID: _.websiteID,
					typeNUM: _.typeNUM
				}, '*');
			} catch (e) {
				// silent error handling to avoid console errors
			}
		}
	}

	// Return the object
	return _;
}();

/**
 * The function is init tags manager
 */
function initTagsManger() {
	// set types
	let types = {
		orders: 1,
		messages: 2,
		customers: 3,
	};
	// get the data attribute where we store the unique id of the item
	let dataIDSelector = (tagsType == 'messages' || tagsType == 'customers' ? 'id' : 'orderid');
	/**
	 * Initialize the tags manager
	 */
	TagsManger.tm_init({
		websiteID: websiteID,
		typeNUM: types[tagsType],
		tagList: tagList,
		$container: $('.tm-container'),
		$filterContainer: $('.tm-filter-container'),
		disabledReload:  $('.tm-filter-container').attr('data-disabledreload') === 'true',
		parentSettings: {
			dataIDSelector: dataIDSelector,
			tagsPlacmentSelector: `.tm-related-tags`,
		},
		translations: translations.tagsManager,
		createTagCallBack: function ( tag ) {
			// render the tags filter
			renderTagsFilter();
			// open tags list on click
			openTagsListOnClick();
		},
		removeTagCallBack: function ( tag ) {
			// render the tags filter
			renderTagsFilter();
			// open tags list on click
			openTagsListOnClick();
		},
		tagChangeCallBack: function ( tag, newHTML ) {
			// update the tag html in the page
			$(`.tm-root .tm-related-tags > [data-id="${tag.uniqueID}"]`).replaceWith(newHTML);
			// render the tags filter
			renderTagsFilter();
			// open tags list on click
			openTagsListOnClick();
		},
		assignTagCallBack: function ( tag, orderID ) {
			// security - check if the tag is already in the list
			if ( $(`.tm-root[data-${dataIDSelector}="${orderID}"] .tm-related-tags > [data-id="${tag.uniqueID}"]`).length == 0 ) {
				$(`.tm-root[data-${dataIDSelector}="${orderID}"] .tm-related-tags`).append(tag.html);
			}
			// open tags list on click
			openTagsListOnClick();
		},
		unassignTagCallBack: function ( tagID, orderID ) {
			$(`.tm-root[data-${dataIDSelector}="${orderID}"] .tm-related-tags > [data-id="${tagID}"]`).remove();
		}
	});

	// Render the tags filter on page load
	renderTagsFilter();

	/**
	 * The function is rendering the tags filter
	 */
	function renderTagsFilter() {
		// remove the previous instance
		$('.tm-filter-container').empty().hide();
		// get tags filter
		const $tagsFilter = $(`<select class="form-control tags-filter uiMultipleSelect" multiple="multiple" ${TagsManger.tagList.length === 0 ? 'disabled' : ''}></select>`);
		// add a placeholder option if there are no tags
		if (TagsManger.tagList.length == 0) {
			$tagsFilter.append(`<option value="no-tags" disabled>${translations.tagsManager.noTagsMsg || 'No tags available'}</option>`);
		}
		// add the filter to page
		$('.tm-filter-container').append($tagsFilter).show();
		
		// Get currently selected tags from global state
		const currentSelectedTags = window.currentFilterTags || filterByTags || [];
		
		// fill the filter in the page with the tags
		TagsManger.tagList.forEach((tag) => {
			$tagsFilter.append(`<option value="${tag.uniqueID}" ${currentSelectedTags.includes(tag.uniqueID) ? 'selected' : ''}>${escapeHtml(`<span class="tm-tagColor" style="background-color: ${tag.color};">&nbsp;</span>`)} ${tag.name}</option>`);
		});
		// we need to add the multiselect container class to get our system UI design
		$('.tm-filter-container').addClass('uiMultipleSelectContainer')
		/**
		 * Using multi-select plugin to let the user select multiple tags
		 *
		 * Davidstutz Bootstrap Multiselect Plugin Initial
		 * Documentation : https://github.com/davidstutz/bootstrap-multiselect
		 */
		$('.tags-filter').multiselect({
			numberDisplayed: 1,
			enableFiltering: true,
			inheritClass: true,
			enableCaseInsensitiveFiltering: true,
			allSelectedText: false,
			nonSelectedText: TagsManger.tagList.length === 0 ? 
				translations.tagsManager.noTagsMsg : 
				translations.tagsManager.selectTags,
			filterPlaceholder: translations.tagsManager.searchTags,
			enableHTML: true,
			templates: uiMultipleSelectOBJ.getTemplates('tags-filter-multiselect'),
			buttonTitle: function() {
				return '';
			},
			onChange: function() {
				// Get the selected options
				var selectedOptions = this.$select.val() || [];
				var filterByTags = [];
				
				// Convert selected options to tag IDs
				selectedOptions.forEach(function(option) {
					filterByTags.push(option);
				});

				// Check if reload is disabled via data attribute
				var disabledReload = this.$select.closest('.tm-filter-container').attr('data-disabledreload') === 'true';
				
				if (disabledReload) {
					// Trigger a custom event instead of reloading
					this.$select.closest('.tm-filter-container').trigger('tagsManager.change', [filterByTags]);
					return;
				}
				
				// Original reload behavior
				if (!filterByTags.length) {
					delete $.QueryString.filterByTags;
				//set/edit query string parameters
				} else {
					$.QueryString.filterByTags = JSON.stringify(filterByTags);
				}
				// reset pagination - the user can browse to page X and then filter then he can get no results
				$.QueryString.page = 1;
				// reload the page with the new parameters
				window.location = location.href.split('?')[0] + '?' + $.param($.QueryString);
			}
		});
	}

	/**
	 * The function is opening the tags list on tag click
	 */
	function openTagsListOnClick() {
		$(`.tm-root .tm-tag`).off('click').on('click',function( e ) {
			// prevent opening order info
			e.stopPropagation();
			// find the admin controller and click on it
			$(this).parents('.tm-root').find('.manage-tags').trigger('click');
		});
	}
};

// Add init tags manager event
$(document).on('S123.init.TagsManger', function( e ) {
	initTagsManger();
});

// Listen for tag updates from iframes
window.addEventListener('message', function(event) {
	// check if the message is a tag update
	if (event.data && event.data.action === 'tagsUpdated') {
		// define types here to match the same structure in initTagsManger
		const types = {
			orders: 1,
			messages: 2,
			customers: 3,
		};
		// update the global tagList with the new data
		if (event.data.websiteID == websiteID && event.data.typeNUM == types[tagsType]) {
			// update the global tagList with the received data
			tagList = event.data.tagList;
			// clear all existing tags from the UI
			$('.tm-related-tags').empty();
			// re-initialize the tags manager with the updated tag list
			initTagsManger();
			// if we're in the parent window and have a table object, refresh the table data immediately
			if (window === window.parent && typeof table !== 'undefined' && typeof table.replaceData === 'function') {
				table.replaceData();
			}
		}
	}
}, false);

// Initialize tags manager
initTagsManger();