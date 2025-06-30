
/**
 * Custom Froala Editor Settings - At some cases we like to set another default settings
 * for the editor, for example at the mailing list we like the default width to be 100%
 * instead of 300px. This object responsible for that, set it in your page about the 
 * require of `site123-js-files.php`.
 */
if ( typeof froalaCustomSettingsOBJ === 'undefined' ) {
    var froalaCustomSettingsOBJ = {
        imageDefaultWidth: 300
    };
}

/**
 * S123 Editor
 */
var s123Editor = function() {

    // Set default settings
    var _ = {
        editors: {
            froala: {},
            inline: {}
        },
        templates: {
            /*
            readyBlocks: [
                '<div class="editorBox editorBox_text"><div class="row"><div class="col-xs-6"><p>fnsdlfn f nldfn sdlk fmdsl fmlds fmkld sfmsldk mf. fdmlk fmsd lkf fsdm fklsdm fkldsm.<br>djsaldjl ask dsjak ldjsak.</p></div><div class="col-xs-6"><img src="https://cdn-cms-localhost.f-static.com/uploads/2210/2000_5f64abc435207.jpg" style="width:100%;height:auto;"></div></div></div>',
                '<div class="editorBox editorBox_text"><div class="row"><div class="col-xs-6"><img src="https://cdn-cms-localhost.f-static.com/uploads/2210/2000_5f64abc435207.jpg" style="width:100%;height:auto;"></div><div class="col-xs-6"><img src="https://cdn-cms-localhost.f-static.com/uploads/2210/2000_5f64abc435207.jpg" style="width:100%;height:auto;"></div></div></div>',
            ],
            */
            s123_image: '<div contenteditable="false" class="editorBox editorBox_img"><img src="https://cdn-cms.f-static.net/ready_uploads/media/5116338/normal_5eb796c00bde3.jpg" class="imageWidth100" alt="" data-ratio="1.5"></div>',
            h3_header: '<h3>' + escapeHtml(f_variables_tran.my_new_header) + '</h3>',
            simpleText: '<p>' + escapeHtml(f_variables_tran.example_text) + '</p>',
            customVideo: '<div contenteditable="false" class="editorBox editorBox_Video"><div class="s123-video-handler" data-video-id="zcswxAF8aZw" data-player="youtube" data-video="https://www.youtube.com/embed/zcswxAF8aZw?rel=0&showinfo=0&color=white&iv_load_policy=3&enablejsapi=1&playsinline=1"><img src="https://img.youtube.com/vi/zcswxAF8aZw/maxresdefault.jpg?site123=5f914313f2661" data-ratio="1.7"><div class="s123-video-cover"><a class="s123-video-play-icon"><i class="fa fa-play"></i></a></div></div></div>',
            customHTML: '<div contenteditable="false" class="editorBox editorBox_HTML"><iframe id="{{id}}" src="'+f_variable_system.iframe_custom_content_com+'/files/vendor/froala_editor/iframeScriptLoad_V2.php?id={{id}}&customHeight=false&content=' + encodeURIComponent('<div style="display: flex; align-items: center; justify-content: center; height: 100px; width: 100%; background-color: #ccc;">' + escapeHtml(f_variables_tran.custom_html) + '</div>') + '" data-rel="crossOriginHandler"></iframe></div>',
            hr: '<hr>',
            attachFile: '<div contenteditable="false" class="editorBox editorBox_AttachFile"><a href="https://cdn-cms.f-static.net/ready_uploads/media/5116338/normal_5eb796c00bde3.jpg" data-file-name="' + escapeHtml(f_variables_tran.download_file) + '" data-file-size="179" data-file-ext="png" target="_blank" class="a-f-container"><div class="a-f-icon"><i class="fa fa-file"></i></div><div class="a-f-info"><span class="a-f-info-name">' + escapeHtml(f_variables_tran.download_file) + '</span><span class="a-f-info-data">PNG • 179KB</span></div><div class="a-f-icon"><i class="fa fa-download"></i></div></a></div>',
            orderedList: '<ol><li></li></ol>',
            unOrderedList: '<ul><li></li></ul>',
            table: '<div class="editorBox editorBox_table"><table style="width: 100%;"><tbody><tr><td style="width: 20.0000%;"><br></td><td style="width: 20.0000%;"><br></td><td style="width: 20.0000%;"><br></td><td style="width: 20.0000%;"><br></td><td style="width: 20.0000%;"><br></td></tr><tr><td style="width: 20.0000%;"><br></td><td style="width: 20.0000%;"><br></td><td style="width: 20.0000%;"><br></td><td style="width: 20.0000%;"><br></td><td style="width: 20.0000%;"><br></td></tr></tbody></table></div>',
            codeSnippet: '<pre class="editorCodeSnippet">' + escapeHtml(f_variables_tran.example_text) + '</pre>'
        }
    };

    /**
     * Initialize Object
     */
    _.init = function( settings ) {
        // loop over each element and initialize on it the editor
        settings.$elements.each(function( index, el ) {
            initializeEditor($(this));
        });
    };

    /**
     * With this method we can manually initialize the editor on the element
     * Note: It is useful when populating the textarea after the page is load
     * for example in form widget we are editing the auto reply message in a popup
     */
    _.manuallInit = function( $el ) {
        initializeEditor($el);
    };


    /**
     * The method is initializing the editor on the element we send it
     */
    function initializeEditor( $el ) {
        // initialize by editor type
        switch ( $el.data('editor') ) {
            // froala
            case 'froala':
                // check if the editor need to be inline because it is a new item or existing that was used with the new inline editor
                var convertToInline = $el.data('convert-to-inline') && ($el.val().length == 0 || $el.val().indexOf('s123-editor') > 0);
                // inline editor - unwrap the content so the froala editor will continue working as usual
                if ( convertToInline ) {
                    $el.val(_.unWrapContent($el.val()));
                }
                // initialize the froala editor
                _.editors.froala[$el.get(0).id] = new FroalaCustomEditor({
                    $el: $el,
                    editorButtons: $el.data('froala-buttons'),
                    convertToInline: convertToInline,
                    templates: _.templates,
                    initialized: function( editor, inputEvent, moreSettings ) {
                        // inline type editor
                        if ( convertToInline ) {
                            // initialize inline extention
                            _.editors.inline[$el.get(0).id] = new Inline({
                                $el: $el,
                                templates: _.templates,
                                $editor: $(editor.el),
                                buttonsList: ['s123_image','simpleText','h3_header','orderedList','customVideo','customHTML','hr','attachFile','table','codeSnippet'],
                                moreSettings: moreSettings,
                                addCallback: function( templateID, menuType ) {
                                    // add new element
                                    _.editors.froala[$el.get(0).id].add(templateID,menuType);
                                },
                                removeCallback: function() {
                                    _.editors.froala[$el.get(0).id].refreshPlaceHolder();
                                },
                                replaceCallback: function( $oldEl, $newEl ) {
                                    // replace the old element with the  new element
                                    _.editors.froala[$el.get(0).id].replace($oldEl,$newEl);
                                },
                                clearCallback: function() {
                                    _.editors.froala[$el.get(0).id].clear();
                                },
                                deviceChangeCallback: function() {
                                    _.editors.froala[$el.get(0).id].deviceChange();
                                }
                            });
                        }
                    }
                });
                // inline editor - when saving the form we want to wrap the editor content so it will be inline next time
                if ( convertToInline ) {
                    $el.closest('form').on('submit.s123Editor', function() {
                        // update the original hidden input
                        _.editors.froala[$el.get(0).id].editorInstance.events.trigger('contentChanged');
                        // wrap the content
                        $el.val(_.wrapContent($el.val()));
                    });
                }
                break;
        }
        // listen to cross origin requests ( used for custom code )
        $(window).on('message.s123Editor', function( event ) {
            // get request data
            var data = event.originalEvent.data;
            // act according to the event
            switch( data.eventType ) {
                // resize event
                case 'resize':
                    $('#'+data.id).css({
                        height: data.height
                    });
                    // trigger custom event
                    $(document).trigger('message.s123Editor.resize');
                    break;
            }
        }); 
    }

    /**
     * Froala editor
     */
    function FroalaCustomEditor( settings ) {

        // Set object
        var _ = {
            $el: settings.$el,
            editor: FroalaEditor,
            editorButtons: settings.editorButtons,
            convertToInline: settings.convertToInline,
            templates: settings.templates,
            initialized: settings.initialized
        };

        /**
         * Initialize Editor
         */
        _.init = function() {

            /**
             * Add a clean HTML button custom button.
             * Source: https://froala.com/wysiwyg-editor/examples/custom-buttons/
             */
            _.editor.DefineIcon('clear', {
                NAME: 'remove',
                template: 'font_awesome'
            });
            _.editor.RegisterCommand('clear', {
                title: f_variables_tran.clear_html,
                focus: false,
                undo: true,
                refreshAfterCallback: true,
                callback: function () {
                    this.html.set('');
                    this.events.focus();
                }
            });

            /**
             * Add a System Library custom button.
             * Source: https://www.froala.com/wysiwyg-editor/docs/examples/custom-buttons
             */
            _.editor.DefineIcon('systemLibrary', {NAME: "Library", template: 'text'})
            _.editor.RegisterCommand('systemLibrary', {
                title: "Library",
                icon: 'systemLibrary',
                undo: true,
                focus: true,
                showOnMobile: true,
                refreshAfterCallback: true,
                callback: function () {
                    // open the system library modal
                    OpenFroalaEditorLibrary();
                    // save the editor instance on the top window to insert the uploaded image
                    window.top.systemLibraryFroalaInstance = this;
                    // set the custom froala editor settings object 
                    window.top.systemLibraryFroalaCustomSettingsOBJ = froalaCustomSettingsOBJ;
                }
            });
            

            // Define a custom separator
            _.editor.DefineIcon('fr_separator', {NAME: 'minus', SVG_KEY: 'vertical'});
            _.editor.RegisterCommand('fr_separator', {
                title: 'fr_separator',
                focus: false,
                undo: false,
                refreshAfterCallback: false
            });

            // Set emojis icon
            _.editor.DefineIcon('emoticons', {NAME: '<span><i class="fa-regular fa-face-smile" style="margin: 2px auto;"></i></span>',template: 'text'});

            // get froala editor settings
            var websiteID            = _.$el.data('websiteId');
            var height               = _.$el.data('froala-height');
            var placeholder          = _.$el.data('froala-placeholder') ? _.$el.data('froala-placeholder') : '';
            var editorDirection      = _.$el.data('froala-direction');
            var systemLibrary        = _.$el.data('system-library');
            var charCounterMax       = _.$el.data('max-chars-length') ? _.$el.data('max-chars-length') : -1;
            var toolbarInline        = false;
            var charCounterCount     = _.$el.data('froala-hide-chars-counter') ? false : true;
            var toolbarVisibleWithoutSelection = true;
            var lineBreak            = _.editor.ENTER_P;
            var pastePlain           = false;
            var useClasses           = true;
            var htmlRemoveTags       = ['script', 'style', 'base', 'form', 'input', 'textarea', 'button', 'select', 'frameset', 'embed', 'object', 'param', 'section'];
            var buttonsList = [];
            var imageEditButtons = ['imageReplace', 'imageAlign', 'imageCaption', 'imageRemove', 'fr_separator', 'imageLink', 'linkOpen', 'linkEdit', 'linkRemove', 'fr_separator', 'imageAlt', 'imageSize']; // image options
            var quickInsertButtons = ['image', 'video', 'embedly', 'table', 'ul', 'ol', 'hr']; // quick insert buttons
            var pasteDeniedTags = []; // tags need to be removed on paste
            var quickInsertEnabled = true;
            var lineBreakerTags = ['table', 'hr', 'form', 'dl', 'span.fr-video', '.fr-embedly', '.fr-img-caption'];
            var tableEditButtons = ['tableHeader', 'tableRemove', 'fr_separator', 'tableRows', 'tableColumns', 'tableStyle', '-', 'tableCells', 'tableCellBackground', 'tableCellVerticalAlign', 'tableCellHorizontalAlign', 'tableCellStyle'];
            // show advanced list options
            var listAdvancedTypes = true;
            // add 5 spaces when user uses TAB key
            var tabSpaces = 5;
            // by default always automatically convert links
            var linkConvertEmailAddress = true;
            var requestID = _.$el.data('request-id') ? _.$el.data('request-id') : '';
            var isToolbarBottom = _.$el.data('froala-toolbar-place') && _.$el.data('froala-toolbar-place') == 'bottom';
            //
            if ( typeof versionNUM !== 'undefined' ) {
                // set version 
                var versionEditorNUM = versionNUM;
                // set the editor buttons list
                buttonsList = ['clear', 'fr_separator' ,'bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', 'fr_separator', 'textColor', 'fr_separator', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', 'quote', 'insertHR', 'fr_separator', 'insertLink', 'systemLibrary', 'insertImage', 'insertVideo', 'insertFile', 'insertTable', 'undo', 'redo', 'clearFormatting', 'selectAll','fullscreen'];
                // filter buttons
                if ( systemLibrary === 'disable' ) {
                    buttonsList = jQuery.grep(buttonsList, function( button ) {
                        return button !== 'systemLibrary';
                    });
                }
            } else {
                // set version 
                var versionEditorNUM = '';
                // set the editor buttons list
                buttonsList = ['html','clear', 'fr_separator' ,'bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', 'fontSize', 'fr_separator', 'textColor', 'fr_separator', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', 'quote', 'insertHR', 'fr_separator', 'insertLink', 'systemLibrary', 'insertImage', 'insertVideo', 'insertFile', 'insertTable', 'undo', 'redo', 'clearFormatting', 'selectAll','fullscreen'];
                // filter buttons
                if ( systemLibrary === 'disable' ) {
                    buttonsList = jQuery.grep(buttonsList, function( button ) {
                        return button !== 'systemLibrary';
                    });
                }
            }
            // about type editor
            if ( _.editorButtons == 'about' ) {
                lineBreak       = _.editor.ENTER_BR;
                pastePlain      = true;
                buttonsList     = ['clear', 'fr_separator' ,'bold', 'italic', 'underline', 'strikeThrough', 'fr_separator', 'formatOL', 'formatUL', 'fr_separator', 'insertLink', 'undo', 'redo', 'clearFormatting', 'selectAll','fullscreen'];
                htmlRemoveTags  = ['script', 'style', 'base', 'form', 'input', 'textarea', 'button', 'select', 'frameset', 'embed', 'object', 'param', 'iframe', 'section'];
                quickInsertButtons = ['table', 'ul', 'ol', 'hr'];
            }
            // store brand module editor
            if ( _.editorButtons == 'brand' ) {
                lineBreak       = _.editor.ENTER_BR;
                pastePlain      = true;
                buttonsList     = ['clear', 'fr_separator' ,'bold', 'italic', 'underline', 'strikeThrough', 'fr_separator', 'formatOL', 'formatUL', 'fr_separator', 'insertLink', 'undo', 'redo', 'clearFormatting', 'selectAll','fullscreen'];
                htmlRemoveTags  = ['script', 'style', 'base', 'form', 'input', 'textarea', 'button', 'select', 'frameset', 'embed', 'object', 'param', 'iframe', 'section'];
                quickInsertButtons = ['table', 'ul', 'ol', 'hr'];
            }
            // product options guide
            if ( _.editorButtons == 'poGuides' ) {
                    lineBreak       = _.editor.ENTER_BR;
                    pastePlain      = true;
                    buttonsList = ['clear', 'fr_separator' ,'bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', 'fontSize', 'fr_separator', 'textColor', 'fr_separator', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', 'quote', 'insertHR', 'fr_separator', 'insertLink', 'systemLibrary', 'insertImage', 'insertTable', 'undo', 'redo', 'clearFormatting', 'selectAll','fullscreen'];
                    htmlRemoveTags  = ['script', 'style', 'base', 'form', 'input', 'textarea', 'button', 'select', 'frameset', 'embed', 'object', 'param', 'iframe', 'section'];
                    quickInsertButtons = ['table', 'ul', 'ol', 'hr'];
            }
            // card page type editor
            if ( _.editorButtons == 'cardPage' ) {
                lineBreak       = _.editor.ENTER_BR;
                pastePlain      = true;
                buttonsList     = ['clear', 'fr_separator' ,'bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', 'fr_separator', 'textColor', 'fr_separator', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', 'quote', 'insertHR', 'fr_separator', 'insertLink', 'systemLibrary', 'insertImage', 'insertVideo', 'insertFile', 'insertTable', 'undo', 'redo', 'clearFormatting', 'selectAll','fullscreen'];
                htmlRemoveTags  = ['script', 'style', 'base', 'form', 'input', 'textarea', 'button', 'select', 'frameset', 'embed', 'object', 'param', 'section'];
                quickInsertButtons = ['image', 'video', 'embedly', 'table', 'ul', 'ol', 'hr'];
            }
            // mailing list type editor
            if ( _.editorButtons == 'mailing' ) {
                lineBreak       = _.editor.ENTER_BR;
                pastePlain      = true;
                useClasses      = false;
                buttonsList     = ['clear', 'fr_separator' ,'bold', 'italic', 'underline', 'strikeThrough', 'fr_separator', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'insertHR', 'fr_separator', 'insertLink', 'systemLibrary', 'insertImage', 'undo', 'redo', 'clearFormatting', 'selectAll','fullscreen'];
                htmlRemoveTags  = ['script', 'style', 'base', 'form', 'input', 'textarea', 'button', 'select', 'frameset', 'embed', 'object', 'param', 'iframe', 'section'];
                quickInsertButtons = ['image', 'table', 'ul', 'ol', 'hr'];
                // filter buttons
                if ( systemLibrary === 'disable' ) {
                    buttonsList = jQuery.grep(buttonsList, function( button ) {
                        return button !== 'systemLibrary';
                    });
                }
            }
            // faq type editor
            if ( _.editorButtons == 'faq' ) {
                lineBreak       = _.editor.ENTER_BR;
                pastePlain      = true;
                buttonsList = ['clear', 'fr_separator' ,'bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', 'fontSize', 'fr_separator', 'textColor', 'fr_separator', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', 'quote', 'insertHR', 'fr_separator', 'insertLink', 'systemLibrary', 'insertImage', 'insertTable', 'undo', 'redo', 'clearFormatting', 'selectAll','fullscreen'];
                htmlRemoveTags  = ['script', 'style', 'base', 'form', 'input', 'textarea', 'button', 'select', 'frameset', 'embed', 'object', 'param', 'iframe', 'section'];
                quickInsertButtons = ['image', 'table', 'ul', 'ol', 'hr'];
                // filter buttons
                if ( systemLibrary === 'disable' ) {
                    buttonsList = jQuery.grep(buttonsList, function( button ) {
                        return button !== 'systemLibrary';
                    });
                }
            }
            // messages type editor
            if ( _.editorButtons == 'messages' ) {
                lineBreak       = _.editor.ENTER_BR;
                pastePlain      = true;
                buttonsList     = ['bold', 'italic', 'underline', 'strikeThrough', 'fr_separator', 'formatOL', 'formatUL', 'fr_separator', 'insertLink', 'undo', 'redo', 'clearFormatting'];
                htmlRemoveTags  = ['script', 'style', 'base', 'form', 'input', 'textarea', 'button', 'select', 'frameset', 'embed', 'object', 'param', 'iframe', 'section'];
                quickInsertButtons = ['table', 'ul', 'ol', 'hr'];
                quickInsertEnabled = false;
                // changes Detector - Check it the field is valid
                _.$el.on('froalaEditor.contentChanged', function (e, editor, inputEvent) {
                    _.$el.valid();
                });
            }
            // inline type editor
            if ( _.convertToInline ) {
                buttonsList = ['bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', 'fr_separator', 'textColor', 'fr_separator', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', 'quote', 'insertLink'];
                tableEditButtons = ['tableHeader', 'fr_separator', 'tableRows', 'tableColumns', 'tableStyle', 'tableCells', '-', 'tableCellBackground', 'tableCellVerticalAlign', 'tableCellHorizontalAlign', 'tableCellStyle'];
                toolbarInline        = true;
                charCounterCount     = false;
                toolbarVisibleWithoutSelection      = false;
                height               = 'auto';
                imageEditButtons     = [];
                // quick insert buttons
                quickInsertButtons = ['s123_image','simpleText','h3_header','customVideo','customHTML','hr','attachFile'];
                quickInsertEnabled = false;
                pastePlain           = false;
                /* tags need to be removed on paste, we also remove `<div>`,`<p>` because they represent
                new line and we want the content automatically y to break to new lines so we will have more control
                where to put the quick insert */
                pasteDeniedTags      = ['img','iframe','embed','p','div'];
                // set what tags will act as new line
                lineBreak       = _.editor.ENTER_P;
                lineBreakerTags      = ['p'];
            }
            // run callback on initialized
            _.$el.on('froalaEditor.initialized', function (e, editor, inputEvent) {
                if ( _.initialized ) _.initialized.call(this,editor,inputEvent,{
                    lineBreak: ['about','mailing','faq','messages','supportTicket','supportTicketForUser'].indexOf(_.editorButtons) != -1 ? '<br>' : '<p><br></p>' 
                });
                // some pages do not managed under a website so we do not need the pages list
                if ( $.isNumeric(websiteID) && $.isNumeric(versionEditorNUM) ) {
                    // load pages list for the froala links
                    if ( !window.froalaPagesList ) {
                        // get the website pages list and add it to Froala Editor link list
                        $.ajax({
                            url: '/versions/'+versionEditorNUM+'/wizard/include/pagesList.php',
                            type: "POST",
                            dataType: "json",
                            data: {
                                w: websiteID
                            },
                            success: function( pages ) {
                                // get the link list
                                var linkList = [];
                                // run on all the pages and add them to the link list according to Froala JSON standard 
                                $.each( pages, function( key, page ) {
                                    linkList.push({
                                        displayText: page.label,
                                        href: page.value
                                    });
                                });
                                // save the pages list to the global variable to prevent multiple loadings
                                window.froalaPagesList = linkList;
                                // add / edit options to Froala Editor after initialize
                                _.$el.data('froala.editor').opts.linkList = window.froalaPagesList;
                            }
                        });
                    // add / edit options to Froala Editor after initialize
                    } else {
                        _.$el.data('froala.editor').opts.linkList = window.froalaPagesList;
                    }
                /**
                 * Remove the `linklist` button from the Inset Link popup.
                 * https://www.froala.com/wysiwyg-editor/docs/options#linkInsertButtons
                 */
                } else {
                    _.$el.data('froala.editor').opts.linkInsertButtons = ['linkBack'];
                }
            });
            // set settings
            var froalaSettings = {
                charCounterMax: charCounterMax, // maximum amount of characters (-1 is unlimited)
                tabSpaces: tabSpaces,
                // set quick insert froala editor tool
                quickInsertEnabled: quickInsertEnabled,
                // remove the Powered By Froala message
                attribution: false,
                // set key
                key: 'fIE3A-9C2C1G2B4D5A3D1ud1BI1IMNBUMRWAi1AYMSTRBUZYB-16D4E3D2E3C3I2H1B10C2B1==',
                // defines the font sizes that appear under the Font Size button
                fontSize: ['8', '9', '10', '11', '12', '14', '16', '18', '20', '22', '24', '26', '28', '30', '36', '48', '60', '72', '96'],
                // defines the floating quick insert buttons
                quickInsertButtons: quickInsertButtons,
                // defines the table border options, Froala don't add no border so we add it manually
                tableStyles: {
                    'fr-no-borders': 'No Borders',
                    'fr-dashed-borders': 'Dashed Borders',
                    'fr-alternate-rows': 'Alternate Rows'
                },
                // the placeholder used when the WYSIWYG editor body is empty
                placeholderText: placeholder,
                // specifies how the dragged elements should be placed in the new position
                dragInline: false,
                imageMove: false,
                videoMove: false,
                // disable the auto-save.
                saveInterval: 0,
                // set a height for the rich text editor's editing box.
                height: height,
                // when this options is disabled the edited content will have the external CSS properties converted to inline style. 
                useClasses: useClasses,
                // set the editor direction (ltr, rtl).
                direction: (editorDirection) ? editorDirection : f_variable_system.t_direction,
                // uRL where the upload request is being made.
                imageUploadURL: '/versions/'+versionEditorNUM+'/wizard/uploadFile.php',
                // allow to upload PNG and JPG.
                imageAllowedTypes: ['jpeg','jpg','png','gif','bmp','webp'],
                // additional params that are passed in the upload request to the server.
                imageUploadParams: {
                    w: websiteID,
                    returnType: 'froalaEditor'
                },
                // url where the upload request is being made.
                videoUploadURL: '/versions/'+versionEditorNUM+'/wizard/uploadFile.php',
                // additional params that are passed in the upload request to the server.
                videoUploadParams: {
                    w: websiteID,
                    returnType: 'froalaEditor'
                },
                // uRL where the upload request is being made.
                fileUploadURL: '/versions/'+versionEditorNUM+'/wizard/uploadFile.php',
                // additional params that are passed in the upload request to the server.
                fileUploadParams: {
                    w: websiteID,
                    returnType: 'froalaEditor'
                },
                // defines what tags will not be supported by the froala editor
                htmlRemoveTags: htmlRemoveTags,
                // image size option
                imageResize: true,
                //
                imageAddNewLine: true,
                // set default image width when it is added to page
                imageDefaultWidth: froalaCustomSettingsOBJ.imageDefaultWidth,
                // on enter decide what tag will act as new line (0 - P, 1 - BR, 2 - DIV)
                enter: lineBreak,
                // clear text format when pasting the text
                pastePlain: pastePlain,
                // tags need to be removed on paste
                pasteDeniedTags: pasteDeniedTags,
                //
                toolbarSticky: false,
                //
                toolbarInline: toolbarInline,
                //
                charCounterCount: charCounterCount,
                //
                toolbarVisibleWithoutSelection: toolbarVisibleWithoutSelection,
                // defines what is the image edit options
                imageEditButtons: imageEditButtons,
                /**
                 * The list of buttons that appear in the rich text editor's toolbar
                 */
                toolbarButtonsMD: buttonsList,
                toolbarButtonsSM: buttonsList,
                toolbarButtonsXS: getMobileButtonsStructure(buttonsList),
                toolbarButtons: buttonsList,
                // defines the list of HTML tags between which the line-breaker should appear.
                lineBreakerTags: lineBreakerTags,
                tableEditButtons: tableEditButtons,
                // advanced list types
                listAdvancedTypes: listAdvancedTypes,
                linkConvertEmailAddress: linkConvertEmailAddress,
                videoEditButtons:['videoReplace','videoRemove','videoDisplay','videoAlign','videoSize'],
                events: {
                    initialized: function () {
                        _.$el.data('froala.editor',this);
                        _.$el.trigger('froalaEditor.initialized',this);
                    },
                    contentChanged: function () {
                        _.$el.trigger('froalaEditor.contentChanged',this);
                    },
                    focus: function () {
                        _.$el.trigger('froalaEditor.focus',this);
                    }
                }
            };
            // headers type editor
            if ( _.editorButtons == 'headers' ) {
                froalaSettings.enter = _.editor.ENTER_BR;
                froalaSettings.pastePlain      = true;
                buttonsList = ['mainColor', 'underLineSVGStyle1', 'bold', 'italic', 'underline', 'strikeThrough', 'fr_separator', 'formatOL', 'formatUL'];
                froalaSettings.toolbarButtonsMD     = buttonsList;
                froalaSettings.toolbarButtonsSM     = buttonsList;
                froalaSettings.toolbarButtonsXS     = buttonsList;
                froalaSettings.toolbarButtons     = buttonsList;
                // let froala to manage this setting
                delete froalaSettings.htmlRemoveTags;
                froalaSettings.quickInsertButtons = [];
                froalaSettings.listAdvancedTypes = false;
                froalaSettings.quickInsertEnabled = false;
                froalaSettings.linkConvertEmailAddress = false;
                froalaSettings.htmlAllowedTags = ['span','b','strong','i','u','strike','ul','ol','li','br','s','em','sub','sup', 'wbr'];
                // unsaved Changes Detector - Alert the user about unsaved changes 
                _.$el.on('froalaEditor.contentChanged', function ( e, editor ) {
                    _.$el.trigger('change');
                });
            }
            // messages type editor
            if ( _.editorButtons == 'supportTicket' || _.editorButtons == 'supportTicketForUser' ) {
                froalaSettings.enter       = _.editor.ENTER_BR;
                froalaSettings.pastePlain      = true;
                buttonsList     = _.editorButtons == 'supportTicketForUser' ? ['emoticons'] : ['bold', 'italic', 'underline', 'strikeThrough', 'fr_separator', 'formatOL', 'formatUL', 'fr_separator', 'insertLink', 'undo', 'redo', 'clearFormatting','emoticons'];
                froalaSettings.toolbarButtonsMD     = buttonsList;
                froalaSettings.toolbarButtonsSM     = buttonsList;
                froalaSettings.toolbarButtonsXS     = buttonsList;
                froalaSettings.toolbarButtons     = buttonsList;
                froalaSettings.htmlRemoveTags  = ['script', 'style', 'base', 'form', 'input', 'textarea', 'button', 'select', 'frameset', 'embed', 'object', 'param', 'iframe', 'section'];
                froalaSettings.quickInsertButtons = ['table', 'ul', 'ol', 'hr'];
                froalaSettings.quickInsertEnabled = false;
                // uRL where the upload request is being made.
                froalaSettings.imageUploadURL = '/manager/support/uploadFile.php';
                // additional params that are passed in the upload request to the server.
                froalaSettings.imageUploadParams = {
                    rid: requestID,
                    returnType: 'froalaEditor'
                };
                // url where the upload request is being made.
                froalaSettings.videoUploadURL = '/manager/support/uploadFile.php';
                // additional params that are passed in the upload request to the server.
                froalaSettings.videoUploadParams = {
                    rid: requestID,
                    returnType: 'froalaEditor'
                };
                // uRL where the upload request is being made.
                froalaSettings.fileUploadURL = '/manager/support/uploadFile.php';
                // additional params that are passed in the upload request to the server.
                froalaSettings.fileUploadParams = {
                    rid: requestID,
                    returnType: 'froalaEditor'
                };
                // send the message by pressing Ctrl + Enter
                _.$el.on('froalaEditor.keydown', function (e, editor, keyupEvent) {
                    // check if Ctrl and Enter keys are pressed
                    if (keyupEvent.ctrlKey && keyupEvent.keyCode === 13) {
                        if ( _.$el.data('send-btn') && _.$el.data('send-btn').length > 0 ) {
                            // send the message
                            $(_.$el.data('send-btn')).trigger('focus').trigger('click');
                        }
                    }
                });
                    // upload image event 
                    _.$el.on('froalaEditor.image.inserted', function (e, editor, inputEvent) {
                    _.$el.trigger('froalaEditor.contentChanged');
                });
            }
            // unsaved Changes Detector - Alert the user about unsaved changes 
            _.$el.on('froalaEditor.focus', function ( e, editor ) {
                if ( UnsavedChangesDetector ) {
                    UnsavedChangesDetector.unsaved_changes('true');
                }
            });
            /**
             * Security - After the upgrade from froala 2 to froala 4
             * the editor works with selectors without jquery dependecy
             * and because we didn't place in all fields ids we need to add it
             * if it doesn't exists
             */
            if ( !_.$el.get(0).id ) _.$el.attr('id',uniqid('froala-'));
            // set toolbar to bottom
            if ( isToolbarBottom ) {
                froalaSettings.toolbarBottom = true;
            }
            /**
             * Froala Editor Initialize
             * Documentation : https://www.froala.com/wysiwyg-editor/docs/options
             */
            _.editorInstance = new FroalaEditor(`#${_.$el.get(0).id}`,froalaSettings);
        };

        /**
         * The method is adding a new template
         */
        _.add = function( templateID, menuType ) {
            // security - make sure that such template exists
            if ( !_.templates[templateID] ) return;
            // alert the user that about unsaved content
            if ( UnsavedChangesDetector ) {
                UnsavedChangesDetector.unsaved_changes('true');
            }
            // get forala editor instance
            var froala = _.$el.data('froala.editor');
            var template = _.templates[templateID];
            // set id
            template = template.replace(/{{id}}/g,uniqid(new Date().getTime()));
            // get jquery object
            var $template = $(template);
            /**
             * Handle Media Size - We use this handler because we want the media to have size
             * so the overlay will be added correctly over the element
             *
             * Note: After the media is loaded by itself the size we set is removed
             */
            handleMediaSize($template.find('[data-ratio]'),$(froala.$el).width());
            // editor is empty - replace the first line with the template
            if ( froala.core.isEmpty() ) {
                // replace the new line with the template
                _.replace($(froala.$el).children().first(),$template);
                // hide the placeholder because the editor is not empty
                _.refreshPlaceHolder();
            // editor is not empty - use custom methods to add the content
            } else {
                // do action by menu type
                switch ( menuType ) {
                    // floating menu - add the new template before the new line
                    case 'floating':
                        $template.insertBefore($(window.getSelection().anchorNode));
                        break;
                    // bottom menu - just add to the bottom of the editor
                    default:
                        $(froala.$el).append($template);
                        break;
                }
            }
        };

        /**
         * The method is adding a new template
         */
        _.replace = function( $oldEl, $newEl ) {
            // alert the user that about unsaved content
            if ( UnsavedChangesDetector ) {
                UnsavedChangesDetector.unsaved_changes('true');
            }
            // replace the HTML
            $oldEl.replaceWith($newEl);
            // handle media that has ratio data
            handleMediaSize($newEl.find('[data-ratio]'),_.$el.data('froala.editor').$el.width());
        };

        /**
         * The method is clearing the editor
         */
        _.clear = function() {
            _.$el.data('froala.editor').html.set('');
        };

        /**
         * The method is changing the device type of the editor
         */
        _.deviceChange = function() {
            // get forala editor instance
            var froala = _.$el.data('froala.editor');
            // change to pc
            if ( froala.$wp.hasClass('showMobileView') ) {
                // remove css style
                froala.$wp.removeClass('showMobileView');
                // recalculate the placeholder position
                _.refreshPlaceHolder();
            // change to mobile
            } else {
                froala.$wp.addClass('showMobileView');
            }
        };

        /**
         * The method is refreshing the place holder that is showing to the user
         * where to enter a text
         */
        _.refreshPlaceHolder = function() {
            _.$el.data('froala.editor').placeholder.refresh();
        };

        /**
         * The method is destroying the froala editor instance
         */
        _.destroy = function() {
            _.$el.data('froala.editor').destroy();
        };

        // Initialize editor
        _.init();

        // Return object
        return _;
    };

    /**
     * Inline Editor Extension
     */
    function Inline( settings ) {

        // Get object
        var _ = {
            $optionsBar: null,
            $el: settings.$el,
            templates: settings.templates,
            buttonsList: settings.buttonsList,
            supportedButtons: ['s123_image','simpleText','h3_header','customVideo','customHTML','hr','attachFile','orderedList','unOrderedList','table','codeSnippet'],
            addCallback: settings.addCallback,
            replaceCallback: settings.replaceCallback,
            clearCallback: settings.clearCallback,
            deviceChangeCallback: settings.deviceChangeCallback,
            removeCallback: settings.removeCallback,
            $editor: settings.$editor,
            moreSettings: settings.moreSettings
        };

        /**
         * Initialize Inline Editor Extension
         */
        _.init = function() {
            // get options bar
            _.$optionsBar = getOptionsBar();
            // add the quick buttons to page
            _.$optionsBar.insertAfter(_.$el);
            // get inline buttons
            _.addButtons(_.$optionsBar.find('.quickInsertBottom'));
            // add overlay to the elements in the editor
            _.activeOverlay();
            // initialize the quick insert plugin
            _.quickInsert.init({
                parentObj: _
            });

            /**
             * Copy Paste Bug Fix - In order to add overlay and sorting ability we manipulated the
             * editor elements and when the was coping the content he copied the elements with the attributes
             * and when he paste the content it always created new line because the elements are not clean
             */
            _.$editor.on('copy', function ( event ) {
                // get copied element
                var $copiedElement = $(event.target);
                // remove the manually added attributes
                $copiedElement.removeAttr('data-overlay-active');
                $copiedElement.removeAttr('data-sortable-id');
                // update the clipboard
                event.originalEvent.clipboardData.setData('text/html',$copiedElement.prop('outerHTML'));
            });

            /**
             * Existing Users Support - Convert existing users from unsecured iframes to secured
             * iframes that works under different domains
             */
            _.$editor.find('.editorBox_HTML iframe[src*="iframeScriptLoad.php"]').each(function() {
                // get objects
                var $this = $(this);
                var id = uniqid(new Date().getTime());
                var src = $this.attr('src');
                var params = [];
                var iframeContent = src.split('&content=').pop();
                // add id
                $this.attr('id',id);
                // add custom height parameter
                params.push('customHeight=' + $this.attr('data-use-custom-height'));
                // remove the attribute of the custom height because it is now in parameter
                $this.removeAttr('data-use-custom-height');
                // add id to the parameters
                params.push('id=' + id);
                // add the content to the parameters
                params.push('content=' + iframeContent);
                // set the new path including the domains
                $this.attr('src',f_variable_system.iframe_custom_content_com + '/files/vendor/froala_editor/iframeScriptLoad_V2.php?' + params.join('&'));
            });
        };

        /**
         * The method is adding the buttons of the inline editor
         */
        _.addButtons = function( $quickInsertBottom, menuType ) {
            // add buttons according to their type
            for (var i = 0; i < _.buttonsList.length ; i++) {
                // check if this button is supported
                if ( _.supportedButtons.indexOf(_.buttonsList[i]) == -1 ) continue;
                // get button
                var $button = getButton(_.buttonsList[i],menuType);
                // wrap the button with `li`
                var $li = $('<li></li>');
                // wrap the button to fit it's parent design
                $li.append($button);
                // add the button to page
                $quickInsertBottom.append($li);
            }
        };

        /**
         * The method is adding a cover with manage buttons to the element that the user
         * is hovering above them 
         */
        _.activeOverlay = function() {
            // add overlay to all elements
            _.$editor.on('mouseenter.s123editor','> *', function( event ) {
                // remove the old overlay
                _.destroyOverlay();
                // build 'fake' box that will hover the image
                _.addOverlay($(this));
            });
        };

        /**
         * The method is opening the editor of the custom html
         * item
         */
        _.openCustomHTMLEditor = function ( $el ) {
            // get objects
            var $iframe = $el.find('iframe');
            var id = $iframe.get(0).id;
            var title = escapeHtml(f_variables_tran.custom_html);
            var src = $iframe.attr('src');
            var height = $iframe.attr('height') ? parseInt($iframe.attr('height')) : 250;
            // get parameters from the iframe url
            var customHeight = getParamsFromUrl(src,'customHeight') == 'true';
            var iframeContent = getParamsFromUrl(src,'content');
            var message = '';
            // examples array
            var examples = [{
                title: escapeHtml(f_variables_tran.twitter_example) + ',',
                html: '<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Have you thought about sharing your passion for pets with the world? You can start the pets blog you always wanted to write easily with SITE123. Get started today: <a href="https://t.co/LnahFyoHt7">https://t.co/LnahFyoHt7</a><a href="https://t.co/KE1IgPjrXP">https://t.co/KE1IgPjrXP</a> <a href="https://twitter.com/hashtag/CreateYourFreeWebsiteToday?src=hash&amp;ref_src=twsrc%5Etfw">#CreateYourFreeWebsiteToday</a> <a href="https://twitter.com/hashtag/SITE123?src=hash&amp;ref_src=twsrc%5Etfw">#SITE123</a> <a href="https://t.co/y9TX4A5tww">pic.twitter.com/y9TX4A5tww</a></p>&mdash; SITE123 (@site123) <a href="https://twitter.com/site123/status/1265998939439927296?ref_src=twsrc%5Etfw">May 28, 2020</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"><\/script>'
            },{
                title: escapeHtml(f_variables_tran.youtube_example) + ',',
                html: '<iframe width="100%" height="315" src="https://www.youtube.com/embed/zcswxAF8aZw" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
            },{
                title: escapeHtml(f_variables_tran.soundcloud_example),
                html: '<iframe width="100%" height="300" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/291312051&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/butch_le_butch" title="Butch le Butch" target="_blank" style="color: #cccccc; text-decoration: none;">Butch le Butch</a> · <a href="https://soundcloud.com/butch_le_butch/dua-lipa-blow-your-mind-mwah-butch-le-butch-lost-disco-version" title="Dua Lipa &#x27;Blow Your Mind (Mwah)&#x27; (Butch le Butch Lost Disco Version)" target="_blank" style="color: #cccccc; text-decoration: none;">Dua Lipa &#x27;Blow Your Mind (Mwah)&#x27; (Butch le Butch Lost Disco Version)</a></div>'
            }];
            // form
            message += '<form>';
                // custom code input
                message += '<div class="form-group">';
                    message += '<textarea maxlength="2000" id="newCustomCode" style="width:100%; height:200px;" data-rule-iframe-pattern-only="true">' + iframeContent + '</textarea>';
                        // add examples links
                        message += '<div class="add-examples">';
                            message += escapeHtml(f_variables_tran.examples);
                            for (var i = 0; i < examples.length; i++) {
                                message += '&nbsp;<a href="#" data-index="'+i+'">'+examples[i].title+'</a>';
                            }
                        message += '</div>';
                message += '</div>';
                // custom height
                message += '<div class="checkbox">';
                    message += '<label class="block">';
                        message += '<input id="customHeight" type="checkbox" class="ace input-lg" ' + (customHeight ? 'checked' : '') + '>';
                        message += '<span class="lbl fullColor">&nbsp;' + escapeHtml(f_variables_tran.custom_height) + '</span>&nbsp;';
                        message += '<a href="#" onclick="return false;" data-rel="tooltip" title="' + escapeHtml(f_variables_tran.custom_height_tooltip) + '">';
                            message += '<i class="fa fa-question-circle"></i>';
                        message += '</a>';
                    message += '</label>';
                message += '</div>';
                // custom height slider
                message += '<div class="custom-size-container" style="display: ' + (customHeight ? 'block' : 'none') + ';">';
                    message += '<div class="sliderInput" id="newCustomCodeSize" data-text="" data-value="'+height+'" data-max="500" data-min="50" data-number-kind="1" data-design="twoLines"></div>';
                message += '</div>';
            message += '</form>';
            // get objects
            var $message = $(message);
            var $customHeight = $message.find('#customHeight');
            var $newCustomCodeSizeContainer = $message.find('.custom-size-container');
            // add click event to examples container
            $message.find('.add-examples a').on('click', function( event ) {
                // prevent default link event
                event.preventDefault();
                // get object
                var $this = $(this);
                // get the current value
                var val = $message.find('#newCustomCode').val();
                /**
                 * add the example with new line only if there is content
                 * solution: https://stackoverflow.com/a/863806
                 */
                val += ( val.length > 0 ? '\r\n\r\n' : '' ) + examples[$this.data('index')].html;
                // set the new value
                $message.find('#newCustomCode').val(val);
            });
            // custom height change event
            $customHeight.on('change', function() {
                // is checked - show option to select custom height
                if ( $(this).is(':checked') ) {
                    $newCustomCodeSizeContainer.fadeIn();
                // not checked - hide the option
                } else {
                    $newCustomCodeSizeContainer.fadeOut();
                }
            });
            // show the custom code editor
            showPopup(title,$message,false,function( $dialog ) {
                // get objects
                var template = _.templates.customHTML;
                var newParams = [];
                // preserve the iframe id
                template = template.replace(/{{id}}/g,id);
                // get jquery object
                var $template = $(template);
                // get the new iframe
                $iframe = $template.find('iframe');
                // get the page path
                src = src.split('?')[0];  
                // add id to the params
                src += '?id='+id;
                // has custom height - set new data
                if ( $customHeight.is(':checked') ) {
                    src += '&customHeight=true';
                    $iframe.attr('height',$newCustomCodeSizeContainer.find('#newCustomCodeSize').val());
                // auto height - set new data
                } else {
                    src += '&customHeight=false';
                    $iframe.css('height','');
                }                    
                // set the new custom code
                src += '&content='+encodeURIComponent($dialog.find('#newCustomCode').val());
                // set the new iframe path
                $iframe.attr('src',src);
                // replace the element
                if ( _.replaceCallback ) _.replaceCallback.call(this,$el,$template);
            });

            /**
             * The function is returning all parameters from the sent url
             */
            function getParamsFromUrl( url, paramName ) {
                // get parameters array
                var paramsArray = url.split('?').pop().split('&');
                var param = '';
                // loop over the array and get the parameter value
                for (var i = 0; i < paramsArray.length; i++) {
                    // parameter found
                    if ( paramsArray[i].indexOf(paramName+'=') != -1 ) {
                        // get the parameter value
                        param = decodeURIComponent(paramsArray[i].split(paramName+'=').pop());
                        // break loop
                        break;
                    }
                }
                // return parameter
                return param;
            }
        };

        /**
         * The method is opening the editor of the custom video
         * item
         */
        _.openCustomVideoEditor = function ( $el ) {
            // get objects
            var title = escapeHtml(f_variables_tran.video);
            var message = '<form><div class="input-file-upload" id="inlineEditorVideo" data-website-id="' + f_variable_system.websiteID + '" data-mb="100" data-file-kind="2" data-value="' + $el.find('.s123-video-handler').data('video') + '" data-text="' + escapeHtml(f_variables_tran.video) + '" data-library="video" data-external-video="true" data-required="true"></div></form>';
            // handle the update after the popup is closed
            showPopup(title,message,'inlineEditorVideo',function( uploadFile, s3Obj ) {
                // user didn't upload anything so we don't need to do anything
                if ( !s3Obj ) return;
                // set the iframe url
                var $template = $(_.templates.customVideo);
                $template.find('.s123-video-handler').attr('data-video',s3Obj.n);
                $template.find('img').attr('src',s3Obj.t);
                // check if the video is external video
                if ( isExtrenalVideo(s3Obj.n) ) {
                    // get the player type
                    var player = s3Obj.n.indexOf('youtube') != -1 ? 'youtube' : 'vimeo';
                    // add attributes to detect the video
                    $template.find('.s123-video-handler').attr('data-video-id',s3Obj.id);
                    $template.find('.s123-video-handler').attr('data-player',player);
                    // because we don't get the ratio here we need to add it after the image is loaded
                    $template.find('img').one('load', function() {
                        // get object
                        var $this = $(this);
                        // add special class to get the image real size
                        $this.addClass('size-tester');
                        // calculate the ratio
                        $this.attr('data-ratio',($this.width() / $this.height()));
                        // remove the class to return the image to it's parent
                        $this.removeClass('size-tester');
                    });
                // set the video url
                } else {
                    $template.find('img').attr('data-ratio',(s3Obj.w / s3Obj.h));
                    $template.find('.s123-video-handler').attr('data-player','site123');
                }
                // replace the HTML
                if ( _.replaceCallback ) _.replaceCallback.call(this,$el,$template);
            });
        };

        /**
         * The method is opening the editor of the image
         * item
         */
        _.openImageEditor = function ( $el ) {
            // get objects
            var title = escapeHtml(f_variables_tran.image);
            var $image = $el.find('img');
            var imageLink = $image.parent().is('a') ? $image.parent().attr('href') : '';
            var newTab = $image.parent().is('a') ? $image.parent().attr('target') : '';
            var rel = $image.parent().is('a') ? $image.parent().attr('rel') : '';
            var message = '';
            message += '<form>';
                // tabs link
                message += '<ul class="list-inline add-item-tabs">';
                    message += '<li class="active">';
                        message += '<a data-toggle="tab" href="#generalTab">';
                            message += '<span>' + escapeHtml(f_variables_tran.image) + '</span>';
                        message += '</a>';
                    message += '</li>';
                    message += '<li>';
                        message += '<a data-toggle="tab" href="#linkTab">';
                            message += '<span>' + escapeHtml(f_variables_tran.link) + '</span>';
                        message += '</a>';
                    message += '</li>';
                    message += '<li>';
                        message += '<a data-toggle="tab" href="#altTab">';
                            message += '<span>' + escapeHtml(f_variables_tran.alternate_text) + '</span>';
                        message += '</a>';
                    message += '</li>';
                message += '</ul>';
                // tab content
                message += '<div class="tab-content custom-style">';
                    // general tab
                    message += '<div id="generalTab" class="tab-pane fade in active">';
                        // image
                        message += '<div class="input-file-upload" id="inlineEditorImage" data-website-id="' + f_variable_system.websiteID + '" data-mb="10" data-file-kind="1" data-value="' + $image.attr('src') + '" data-text="' + escapeHtml(f_variables_tran.image) + '" data-library="image" data-style="image-center" data-required="true"></div>';
                    message += '</div>';
                    // image link
                    message += '<div id="linkTab" class="tab-pane fade">';
                        message += '<div class="form-group">';
                            message += '<input type="text" class="form-control" id="imageLink" name="imageLink" value="' + imageLink + '" style="direction:ltr" placeholder="' + escapeHtml(f_variables_tran.example_link) + '" data-rel="links-autocomplete" data-website-id="' + f_variable_system.websiteID + '" data-version-num="2" >';
                        message += '</div>';
                        // new tab
                        message += '<div class="form-group">';
                            message += '<div class="checkbox">';
                                message += '<label class="block">';
                                    message += '<input id="newTab" type="checkbox" class="ace input-lg" ' + ( newTab == '_blank' ? 'checked' : '') + ' ' + (imageLink.length == 0 ? 'disabled' : '') + '>';
                                    message += '<span class="lbl fullColor">&nbsp;' + escapeHtml(f_variables_tran.open_in_new_window) + '</span>&nbsp;';
                                    message += '<a href="#" onclick="return false;" data-rel="tooltip" title="' + escapeHtml(f_variables_tran.open_in_new_window_tooltip) + '">';
                                        message += '<i class="fa fa-question-circle"></i>';
                                    message += '</a>';
                                message += '</label>';
                            message += '</div>';
                        message += '</div>';
                        // no follow
                        message += '<div class="form-group">';
                            message += '<div class="checkbox">';
                                message += '<label class="block">';
                                    message += '<input id="noFollow" type="checkbox" class="ace input-lg" ' + ( rel == 'nofollow' ? 'checked' : '') + ' ' + (imageLink.length == 0 ? 'disabled' : '') + '>';
                                    message += '<span class="lbl fullColor">&nbsp;' + escapeHtml(f_variables_tran.tell_the_search_engines_to_ignore_this_link_nofollow) + '</span>&nbsp;';
                                    message += '<a href="#" onclick="return false;" data-rel="tooltip" title="' + escapeHtml(f_variables_tran.if_this_option_is_selected_the_search_engines_will_ignore_this_link) + '">';
                                        message += '<i class="fa fa-question-circle"></i>';
                                    message += '</a>';
                                message += '</label>';
                            message += '</div>';
                        message += '</div>';
                    message += '</div>';
                    // image alt tab
                    message += '<div id="altTab" class="tab-pane fade">';
                        message += '<div class="form-group">';
                            message += '<input type="text" class="form-control" id="alt" name="alt" value="' + $image.attr('alt') + '" placeholder="' + escapeHtml(f_variables_tran.alt) + '">';
                        message += '</div>';
                    message += '</div>';
                message += '</div>';
            message += '</form>';
            // get jquery object
            var $message = $(message);
            // on input set the active property of the link options
            $message.find('#imageLink').on('change', function() {
                $message.find('#newTab').prop('disabled',$(this).val().length == 0);
                $message.find('#noFollow').prop('disabled',$(this).val().length == 0);
            });
            // listed to auto complete menu close event and trigger the input change event
            $(document).off('LinksAutocomplete.close.s123Editor').on('LinksAutocomplete.close.s123Editor', () => {
                $message.find('#imageLink').trigger('change');
            });
            // show the editor
            showPopup(title,$message,'inlineEditorImage',function( uploadFile, s3Obj ) {
                // get objects
                var $template = $(_.templates.s123_image);
                var $img = $template.find('img');
                var imageLink = $message.find('#imageLink').val();
                var newTab = $message.find('#newTab').is(':checked');
                var noFollow = $message.find('#noFollow').is(':checked');
                // set alt attribute
                $img.attr('alt',$message.find('#alt').val());
                // set new image path
                $img.attr('src',uploadFile.input.val());
                // preserve the old image classes because we use them for design purposes
                $img.attr('class',$image.attr('class'));
                // if the user upload image we need to recalculate the ratio
                if ( s3Obj ) {
                    $img.attr('data-ratio',(s3Obj.w / s3Obj.h));
                }
                // if the image has a link we need to wrap it with `a` tag
                if ( imageLink.length > 0 ) {
                    $img.wrap('<a href="' + imageLink + '" target="' + (newTab ? '_blank' : '') + '" ' + ( noFollow ? 'rel="nofollow"' : '' ) + '></a>');
                }
                // replace the element
                if ( _.replaceCallback ) _.replaceCallback.call(this,$el,$template);
            });
        };

        /**
         * The method is opening the editor of the file upload
         * item
         */
        _.openAttachFileEditor = function ( $el ) {
            // get objects
            var title = escapeHtml(f_variables_tran.attach_file);
            var message = '';
            var $link = $el.find('.a-f-container');
            var fileName = $link.attr('data-file-name');
            var fileSize = $link.attr('data-file-size');
            var fileExt = $link.attr('data-file-ext');
            var fileLink = $link.attr('href');
            message += '<form>';
                // title
                message += '<div class="form-group">';
                    message += '<label for="title">' + escapeHtml(f_variables_tran.title) + '&nbsp;<a href="#" onclick="return false;" data-rel="tooltip" title="' + escapeHtml(f_variables_tran.here_you_can_set_the_custom_file_s_title) + '"><i class="fa fa-question-circle"></i></a></label>';
                    message += '<input type="text" class="form-control" id="title" name="title" value="' + fileName + '" placeholder="' + escapeHtml(f_variables_tran.title) + '">';
                message += '</div>';
                // file upload
                message += '<div class="input-file-upload" id="inlineEditorFile" data-website-id="' + f_variable_system.websiteID + '" data-mb="100" data-file-kind="9" data-value="' + fileLink + '" data-text="' + escapeHtml(f_variables_tran.here_you_can_upload_the_file_you_would_like_to_share) + '" data-required="true"></div>';
            message += '</form>';
            // open editor
            var $dialog = showPopup(title,message,'inlineEditorFile',function( uploadFile, s3Obj ) {
                // get objects
                var inlineEditor_Video_code = uploadFile.input.val();
                var $template = $(_.templates.attachFile);
                var $link = $template.find('.a-f-container');
                // if the user upload a file we need to recalculate it's data
                if ( s3Obj ) {
                    fileLink = s3Obj.n;
                    fileExt = s3Obj.e;
                    fileSize = parseInt(s3Obj.s / 1000);
                }
                // add attributes
                $link.attr('href',fileLink);
                $link.attr('data-file-name',fileName);
                $link.attr('data-file-size',fileSize);
                $link.attr('data-file-ext',fileExt);
                // update the view
                $template.find('.a-f-info-name').text(fileName);
                $template.find('.a-f-info-data').text(fileExt.toUpperCase() + ' • ' + fileSize + 'KB');
                // replace the HTML
                if ( _.replaceCallback ) _.replaceCallback.call(this,$el,$template);
            });
            // add shown event because we want to update the title of the file when the upload is completed
            $dialog.on('shown.bs.modal', function() {
                // get upload file
                var uploadFile = getUploadFileObjectByID('inlineEditorFile');
                // add change event to the title input
                $dialog.find('#title').on('change', function() {
                    fileName = $(this).val();
                });
                // wait to upload finish and update the input if it's empty
                uploadFile.input.on('change.inlineEditor.UploadFile', function( event, s3Obj ) {
                    // don't change the title field if the user already entered a name
                    if ( fileName.length > 0 ) return;
                    // get the file name
                    fileName = s3Obj.n.split('/').pop();
                    // update the input
                    $dialog.find('#title').val(fileName);
                });
            });
        };

        /**
         * The method is opening the editor of the file upload
         * item
         */
        _.destroyOverlay = function () {
            // clear the delay of the destroy overlay
            clearTimeout(_.destroyOverlayTimeOut);
            // remove the css from items that the overlay is active
            _.$editor.find('[data-overlay-active="true"]').removeAttr('data-overlay-active');
            // remove tooltips
            $('.inlineEditorOverlay a').tooltip('destroy');
            // remove image overlay
            $('.inlineEditorOverlay').remove();
            // remove the temporary added id for the sorting
            _.$editor.children().removeAttr('data-sortable-id');
        };

        /**
         * Build 'fake' box that will hover the image
         */
        _.addOverlay = function ( $el ) {
            // add css to items that the overlay is active for them
            $el.attr('data-overlay-active',true);
            // get editor ID
            var html = '';
            // get element positions
            var offset = getElementPosition($el);
            var $parent = null;
            var width = $el.outerWidth();
            var height = $el.outerHeight(true);
            var left = offset.left;
            var top = offset.top;
            var overLayOptions = getoverlayOptionsArray($el);
            // get the element index in the parent because we want to know where to put it when sorting up / down
            var id = uniqid('sortable-');
            var isFirstChild = false;
            var isLastChild = false;
            // set temporary id to detect the parent we need to sort
            $el.attr('data-sortable-id',id);
            // detect if the element is a last or first child
            _.$editor.children().each(function( index, el ) {
                // get object
                var $this = $(this);
                // skip parent if the current element is not in this parent
                var skipElement = $this.find('[data-sortable-id="'+id+'"]').length == 0;
                // for new lines and or old customers the element will be the root so we make sure we are not missing it
                if ( skipElement ) skipElement = $this.attr('data-sortable-id') != id;
                // no element found so we skip it
                if ( skipElement ) return;
                // get the parent
                $parent = _.$editor.children().eq(index);
                // first child
                if ( index == 0 ) {
                    isFirstChild = true;
                }
                // last child
                if ( index == $this.siblings().length ) {
                    isLastChild = true;
                }
            });
            // check if the element is editable with overlay
            var isAdvancedOverlay = overLayOptions.indexOf('change') > 0;
            // editor box is advanced overlay
            if ( $el.hasClass('editorBox') ) {
                isAdvancedOverlay = true;
            }
            // table is simple overlay
            if ( $el.hasClass('editorBox_table') ) {
                isAdvancedOverlay = false;
            }
            // `hr` tag is also advanced overlay
            if ( $el.is('hr') ) {
                top -= parseInt($el.css('margin-top'));
                isAdvancedOverlay = true;
            }
            // get overlay with all options
            html += '<div class="inlineEditorOverlay" data-tag-name="'+$el.get(0).tagName.toLowerCase()+'" data-is-advanced="'+isAdvancedOverlay+'">';
                // change button
                html += '<div class="changeCode"></div>';
                // options button
                html += '<div class="manage"></div>';
            html += '</div>';
            // get jquery object
            var $html = $(html);
            // advanced overlay - add cover
            if ( isAdvancedOverlay ) {
                $html.append('<div class="cover_background" style="width: '+$el.width()+'px; height: '+$el.height()+'px;"></div>');
            // simple overlay - recalculate the position + size overlay and the `manage` container
            } else {
                /* move the manage buttons up because we move the overlay down and we want to keep
                the manage buttons to be in the same top position of the element
                note: the calculation is 0 - height because the default top of the manage
                is 0px */
                $html.find('.manage').css({
                    top: (0 - height)
                });
                /* when it is simple overlay we make sure that the overlay will not be
                visible to the eye but will exist under the element because some overlays have
                new line button that is placed there */
                top += height;
                height = 0;
            }
            // add position css to the overlay
            $html.css({
                width: width,
                height: height,
                left: left,
                top: top
            });
            // add the sort options
            if ( overLayOptions.indexOf('sort') != -1 ) {
                $html.find('.manage').append(getOverlayOptionBtn({
                    isFirstChild: isFirstChild,
                    isLastChild: isLastChild,
                    $parent: $parent,
                    $el: $el
                },'sort'));
            }
            // add the delete options
            if ( overLayOptions.indexOf('delete') != -1 ) {
                $html.find('.manage').append(getOverlayOptionBtn({
                    $parent: $parent,
                    $el: $el
                },'delete'));
            }
            // add change element option
            if ( overLayOptions.indexOf('change') != -1 ) {
                $html.find('.changeCode').append(getOverlayOptionBtn({
                    $el: $el
                },'change'));
            }
            // add the size options
            if ( overLayOptions.indexOf('resize') != -1 ) {
                $html.find('.changeCode .btn-group').append(getOverlayOptionBtn({
                    $el: $el
                },'resize'));
            }
            // add the size options
            if ( overLayOptions.indexOf('addNewLine') != -1 ) {
                $html.find('.changeCode').append(getOverlayOptionBtn({
                    $el: $el
                },'addNewLine'));
            }
            // remove the overlay from the element when leaving
            $el
            .add($html)
            .one('mouseleave.s123editor',function() {
                /* make sure the overlay will not be destroyed right away because
                the user may enter the sorting buttons */
                _.destroyOverlayTimeOut = setTimeout(function() {
                    // remove overlay
                    _.destroyOverlay();
                },200);
            });
            /* custom code have some times iframes so we need to refresh the overlay
            so it will cover fully the iframe */
            if ( $el.hasClass('editorBox_HTML') ) {
                $el.find('iframe').one('load', function() {
                    // refresh the overlay
                    _.destroyOverlay();
                    _.addOverlay($el);
                });
                // iframe resize - refresh the overlay
                $(document).off('message.s123Editor.resize').on('message.s123Editor.resize', function() {
                    // remove overlay because it may not fit by size because the iframe chanted the sizes
                    _.destroyOverlay();
                    // only if the user is still hovering over the element add the overlay again
                    if ( $el.attr('data-overlay-active') == "true" ) {
                        _.addOverlay($el);
                    }
                });
            }
            // if the user entered the overlay keep it visible
            $html.on('mouseenter.s123editor',function() {
                clearTimeout(_.destroyOverlayTimeOut);
            });
            // add to the body
            $('body').append($html);
            // initial Bootstrap Tooltip
            InitializeToolTips();
        };

        /**
         * The method is destroying the inline editor
         */
        _.destroy = function() {
            _.$optionsBar.remove();
            _.destroyOverlay();
            _.quickInsert.hide();
        };

        /**
         * The function is returning the overlay options 
         */
        function getoverlayOptionsArray( $el ) {
            // set default options
            var overLayOptions = ['sort','delete'];
            // editor box options
            if ( $el.hasClass('editorBox') ) {
                // table
                if ( $el.hasClass('editorBox_table') ) {
                    overLayOptions = ['sort','delete','addNewLine'];
                }
                // image
                if ( $el.hasClass('editorBox_img') ) {
                    overLayOptions = ['change','resize','sort','delete','addNewLine'];
                }
                // video
                if ( $el.hasClass('editorBox_Video') ) {
                    overLayOptions = ['change','sort','delete','addNewLine'];
                }
                // html
                if ( $el.hasClass('editorBox_HTML') ) {
                    overLayOptions = ['change','sort','delete','addNewLine'];
                }
                // upload file
                if ( $el.hasClass('editorBox_AttachFile') ) {
                    overLayOptions = ['change','sort','delete','addNewLine'];
                }
            // hr
            } else if ( $el.is('hr') ) {
                overLayOptions = ['sort','delete','addNewLine'];
            // h3
            } else if ( $el.is('h3') ) {
                overLayOptions = ['sort','delete'];
            // paragraph ( also new line)
            } else if ( $el.is('p') ) {
                overLayOptions = ['sort','delete'];
            // ordered list
            } else if ( $el.is('ol') ) {
                overLayOptions = ['sort','delete'];
            // un ordered list
            } else if ( $el.is('ul') ) {
                overLayOptions = ['sort','delete'];
            }
            // return the options
            return overLayOptions;
        }

        /**
         * The function is returning the overlay option button according to the option
         * name
         */
        function getOverlayOptionBtn( settings , optionName ) {
            // set default values
            var html = '';
            var $html = null;
            // get option button
            switch ( optionName ) {
                // change button - with this user can change the image, video, upload file, custom html
                case 'change':
                    html += '<div>';
                        html += '<div class="btn-group">';
                            html += '<a class="btn btn-primary change-item">' + escapeHtml(f_variables_tran.change) + '</a>';
                        html += '</div>';
                    html += '</div>';
                    // get jquery object
                    $html = $(html);
                    // add click to change button
                    $html.find('.change-item').on('click',function( event ) {
                        // destroy overlay
                        _.destroyOverlay();
                        // image
                        if ( settings.$el.closest('.editorBox_img').length > 0 ) {
                            _.openImageEditor(settings.$el);
                        // custom html
                        } else if ( settings.$el.closest('.editorBox_HTML').length > 0 ) {
                            _.openCustomHTMLEditor(settings.$el);
                        // video
                        } else if ( settings.$el.closest('.editorBox_Video').length > 0 ) {
                            _.openCustomVideoEditor(settings.$el);
                        // attach file
                        } else if ( settings.$el.closest('.editorBox_AttachFile').length > 0 ) {
                            _.openAttachFileEditor(settings.$el);
                        }
                    });
                    break;
                // add new line button
                case 'addNewLine':
                    html += '<a href="#" class="btn btn-primary" data-type="addNewLine" data-rel="tooltip" title="' + escapeHtml(f_variables_tran.add_new_line) + '" data-delay=\'{"show":"500", "hide":"0"}\'>';
                            html += '<i class="fa fa-level-up"></i>';
                        html += '</a>';
                    // get jquery object
                    $html = $(html);
                    // add new line button
                    $html.on('click', function( event ) {
                        // prevent default link event
                        event.preventDefault();
                        // create new line
                        var $newLine = $(_.moreSettings.lineBreak);
                        $newLine.insertAfter(settings.$el);
                        // set the caret position to the new line
                        setCaret($newLine.get(0));

                        /**
                         * The function is setting the caret position to the new added line
                         * Solution: https://stackoverflow.com/a/6249440
                         */
                        function setCaret( el ) {
                            // get objects
                            var range = document.createRange();
                            var sel = window.getSelection();
                            // set the start position of the caret
                            range.setStart(el,0);
                            range.collapse(true);
                            sel.removeAllRanges();
                            sel.addRange(range);
                        }
                    });
                    break;
                // delete button
                case 'delete':
                    html += '<a href="#" data-type="remove" data-rel="tooltip" title="' + escapeHtml(f_variables_tran.delete_item) + '" data-delay=\'{"show":"500", "hide":"0"}\'>';
                            html += '<i class="fa fa-trash"></i>';
                    html += '</a>';
                    // get jquery object
                    $html = $(html);
                    // add Remove button
                    $html.on('click', function( event ) {
                        // prevent default link event
                        event.preventDefault();
                        // hide the element we need to remove
                        settings.$parent.fadeOut(function() {
                            // single line handler - we replace the current line with new line
                            if ( settings.$parent.siblings().length == 0 ) {
                                settings.$parent.replaceWith($(_.moreSettings.lineBreak));
                            // multi lines - we just remove the current line
                            } else {
                                settings.$parent.remove();
                            }
                            // run remove callback
                            if ( _.removeCallback ) _.removeCallback.call(this);
                            // remove the cover
                            _.destroyOverlay();
                        });
                    });
                    break;
                // sort buttons
                case 'sort':
                    html += '<div class="sortable-icons">';
                        html += '<a href="#" data-type="up" data-rel="tooltip" title="' + escapeHtml(f_variables_tran.move_item_up) + '" data-delay=\'{"show":"500", "hide":"0"}\' class="'+(settings.isFirstChild ? 'disabled' : '')+'">';
                            html += '<i class="fa fa-arrow-up"></i>';
                        html += '</a>';
                        html += '<a href="#" data-type="down" data-rel="tooltip" title="' + escapeHtml(f_variables_tran.move_item_down) + '" data-delay=\'{"show":"500", "hide":"0"}\' class="'+(settings.isLastChild ? 'disabled' : '')+'">';
                            html += '<i class="fa fa-arrow-down"></i>';
                        html += '</a>';
                    html += '</div>';
                    // get jquery object
                    $html = $(html);
                    // add soring ability
                    $html.find('a').on('click', function( event ) {
                        // prevent default link event
                        event.preventDefault();
                        // if the sorting icon is disabled then skip it
                        if ( $(this).hasClass('disabled') ) return;
                        // act according to the soring type
                        switch( $(this).data('type') ) {
                            case 'up':
                                // get the previews element
                                var $prev = settings.$parent.prev();
                                // hide previews element
                                $prev.fadeOut();
                                // hide the current element
                                settings.$parent.fadeOut(function() {
                                    // replace the elements places
                                    settings.$parent.insertBefore($prev);
                                    // now show the current element
                                    settings.$parent.fadeIn();
                                    // now show the previews element
                                    $prev.fadeIn();
                                    // remove overlay
                                    _.destroyOverlay();
                                });
                                break;
                            case 'down':
                                // get the next element
                                var $next = settings.$parent.next();
                                // hide next element
                                $next.fadeOut();
                                // hide the current element
                                settings.$parent.fadeOut(function() {
                                    // replace the elements places
                                    settings.$parent.insertAfter($next);
                                    // now show the current element
                                    settings.$parent.fadeIn();
                                    // now show the next element
                                    $next.fadeIn();
                                    // remove overlay
                                    _.destroyOverlay();
                                });
                                break;
                        }
                    });
                    break;
                // resize buttons
                case 'resize':
                    var options = [{
                        value: 'imageWidth100',
                        text: '100%'
                    },{
                        value: 'imageWidth75',
                        text: '75%'
                    },{
                        value: 'imageWidth50',
                        text: '50%'
                    },{
                        value: 'imageWidth25',
                        text: '25%'
                    }];  
                    html += '<button class="btn btn-primary" data-toggle="dropdown" aria-expanded="false">';
                        html += escapeHtml(f_variables_tran.size) + '<span class="ace-icon fa fa-caret-down icon-on-right"></span>';
                    html += '</button>';
                    html += '<ul class="dropdown-menu">';
                        // build the size options
                        for (var i = 0; i < options.length; i++) {
                            html += '<li>';
                                html += '<a href="#" data-value="'+options[i].value+'">';
                                    html += options[i].text;
                                html += '</a>';
                            html += '</li>';
                        }
                    html += '</ul>';
                    // get jquery object
                    $html = $(html);
                    // add size change event
                    $html.find('a').on('click', function( event ) {
                        // prevent default link event
                        event.preventDefault();
                        // remove all classes
                        settings.$el.find('img').removeClass(options.map(function( value ) {
                            return value.value;
                        }).join(' '))
                        // add the new class
                        .addClass($(this).data('value'));
                        // when changing size we need to reset the cover so we remove it and add
                        _.destroyOverlay();
                        _.addOverlay(settings.$el);
                    });
                    break;
            }
            // return the button
            return $html;
        }

        /**
         * The function is returning jquery object that represents the editor
         * options bar 
         */
        function getOptionsBar() {
            // buttons container
            var html = '<div class="inlineEditorBottomToolbar fancy-scrollbar">';
                // quick insert bar
                html += '<div>';
                    html += '<ul class="quickInsertBottom"></ul>';
                html += '</div>';
                // static options bar
                html += '<div>';
                    // mobile view
                    html += '<a class="mobileView" title="' + escapeHtml(f_variables_tran.mobile_desktop_view) + '" data-rel="tooltip"><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="phone-laptop" class="svg-inline--fa fa-phone-laptop fa-w-20" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="currentColor" d="M604 128H420a36 36 0 0 0-36 36v312a36 36 0 0 0 36 36h184a36 36 0 0 0 36-36V164a36 36 0 0 0-36-36zm-28 320H448V192h128zM128 64h320v32h64V48a48.1 48.1 0 0 0-47.91-48H111.91A48.1 48.1 0 0 0 64 48v240H16a16 16 0 0 0-16 16v16a64.14 64.14 0 0 0 63.91 64H352v-96H128z"></path></svg></a>&nbsp;&nbsp;&nbsp;&nbsp;';
                    // clean document
                    html += '<a class="cleanHTML" title="' + escapeHtml(f_variables_tran.clean_document) + '" data-rel="tooltip"><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="trash-alt" class="svg-inline--fa fa-trash-alt fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z"></path></svg></a>';
                html += '</div>';
            html += '</div>';
            // get jquery objects
            var $html = $(html);
            // clear the editor event
            $html.find('.cleanHTML').on('click',function() {
                // hide tooltip
                $(this).tooltip('hide');
                // run callback
                if ( _.clearCallback ) _.clearCallback.call(this);
            });
            // change view to mobile / pc
            $html.find('.mobileView').on('click',function() {
                // hide tooltip
                $(this).tooltip('hide');
                // run callback
                if ( _.deviceChangeCallback ) _.deviceChangeCallback.call(this);
            });
            // return object
            return $html;
        }

        /**
         * The function is adding buttons that will manually insert the html
         * to the editor by using the following API:
         * https://froala.com/wysiwyg-editor/docs/methods/#html.insert
         */
        function getButton( buttonID, menuType ) {
            // get object
            var $button = null;
            // add button by id
            switch( buttonID ) {
                // image
                case 's123_image':
                    $button = $('<a title="' + escapeHtml(f_variables_tran.image) + '" data-rel="tooltip"<i class="fal fa-regular fa-image" aria-hidden="true"></i><span>&nbsp;' + escapeHtml(f_variables_tran.image) + '</span></a>');
                    break;
                // simple text
                case 'simpleText':
                    $button = $('<a title="' + escapeHtml(f_variables_tran.text) + '" data-rel="tooltip"><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="text" class="svg-inline--fa fa-text fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M432 32a16 16 0 0 1 16 16v96a16 16 0 0 1-16 16h-32a16 16 0 0 1-16-16v-32H264v304h40a16 16 0 0 1 16 16v32a16 16 0 0 1-16 16H144a16 16 0 0 1-16-16v-32a16 16 0 0 1 16-16h40V112H64v32a16 16 0 0 1-16 16H16a16 16 0 0 1-16-16V48a16 16 0 0 1 16-16z"></path></svg><span>&nbsp;' + escapeHtml(f_variables_tran.text) + '</span></a>');
                    break;
                // h3 header 
                case 'h3_header':
                    $button = $('<a title="' + escapeHtml(f_variables_tran.header) + '" data-rel="tooltip"><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="heading" class="svg-inline--fa fa-heading fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M448 96v320h32a16 16 0 0 1 16 16v32a16 16 0 0 1-16 16H320a16 16 0 0 1-16-16v-32a16 16 0 0 1 16-16h32V288H160v128h32a16 16 0 0 1 16 16v32a16 16 0 0 1-16 16H32a16 16 0 0 1-16-16v-32a16 16 0 0 1 16-16h32V96H32a16 16 0 0 1-16-16V48a16 16 0 0 1 16-16h160a16 16 0 0 1 16 16v32a16 16 0 0 1-16 16h-32v128h192V96h-32a16 16 0 0 1-16-16V48a16 16 0 0 1 16-16h160a16 16 0 0 1 16 16v32a16 16 0 0 1-16 16z"></path></svg><span>&nbsp;' + escapeHtml(f_variables_tran.header) + '</span></a>');
                    break;
                // custom video
                case 'customVideo':
                    $button = $('<a title="' + escapeHtml(f_variables_tran.video) + '" data-rel="tooltip"><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="video-plus" class="svg-inline--fa fa-video-plus fa-w-18" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M336.2 64H47.8C21.4 64 0 85.4 0 111.8v288.4C0 426.6 21.4 448 47.8 448h288.4c26.4 0 47.8-21.4 47.8-47.8V111.8c0-26.4-21.4-47.8-47.8-47.8zM304 264c0 8.8-7.2 16-16 16h-72v72c0 8.8-7.2 16-16 16h-16c-8.8 0-16-7.2-16-16v-72H96c-8.8 0-16-7.2-16-16v-16c0-8.8 7.2-16 16-16h72v-72c0-8.8 7.2-16 16-16h16c8.8 0 16 7.2 16 16v72h72c8.8 0 16 7.2 16 16v16zm272-136.5v256.9c0 25.5-29.1 40.4-50.4 25.8L416 334.7V177.3l109.6-75.5c21.3-14.7 50.4.3 50.4 25.7z"></path></svg><span>&nbsp;' + escapeHtml(f_variables_tran.video) + '</span></a>');
                    break;
                // custom html
                case 'customHTML':
                    $button = $('<a title="' + escapeHtml(f_variables_tran.custom_code) + '" data-rel="tooltip"><svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="code" class="svg-inline--fa fa-code fa-w-18" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M234.8 511.7L196 500.4c-4.2-1.2-6.7-5.7-5.5-9.9L331.3 5.8c1.2-4.2 5.7-6.7 9.9-5.5L380 11.6c4.2 1.2 6.7 5.7 5.5 9.9L244.7 506.2c-1.2 4.3-5.6 6.7-9.9 5.5zm-83.2-121.1l27.2-29c3.1-3.3 2.8-8.5-.5-11.5L72.2 256l106.1-94.1c3.4-3 3.6-8.2.5-11.5l-27.2-29c-3-3.2-8.1-3.4-11.3-.4L2.5 250.2c-3.4 3.2-3.4 8.5 0 11.7L140.3 391c3.2 3 8.2 2.8 11.3-.4zm284.1.4l137.7-129.1c3.4-3.2 3.4-8.5 0-11.7L435.7 121c-3.2-3-8.3-2.9-11.3.4l-27.2 29c-3.1 3.3-2.8 8.5.5 11.5L503.8 256l-106.1 94.1c-3.4 3-3.6 8.2-.5 11.5l27.2 29c3.1 3.2 8.1 3.4 11.3.4z"></path></svg><span>&nbsp;' + escapeHtml(f_variables_tran.custom_code) + '</span></a>');
                    break;
                // hr
                case 'hr':
                    $button = $('<a title="' + escapeHtml(f_variables_tran.horizontal_rule) + '" data-rel="tooltip"><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="horizontal-rule" class="svg-inline--fa fa-horizontal-rule fa-w-18" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="currentColor" d="M640 239.87v31.26A15.88 15.88 0 0 1 624.14 287H15.87A15.88 15.88 0 0 1 0 271.13v-31.26A15.88 15.88 0 0 1 15.87 224h608.27A15.88 15.88 0 0 1 640 239.87z"></path></svg><span>&nbsp;' + escapeHtml(f_variables_tran.horizontal_rule) + '</span></a>');
                    break;
                // upload file
                case 'attachFile':
                    $button = $('<a title="' + escapeHtml(f_variables_tran.attach_file) + '" data-rel="tooltip"><svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="file-upload" class="svg-inline--fa fa-file-upload fa-w-18" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M369.83 97.98L285.94 14.1c-9-9-21.2-14.1-33.89-14.1H47.99C21.5.1 0 21.6 0 48.09v415.92C0 490.5 21.5 512 47.99 512h287.94c26.5 0 48.07-21.5 48.07-47.99V131.97c0-12.69-5.17-24.99-14.17-33.99zM255.95 51.99l76.09 76.08h-76.09V51.99zM336 464.01H47.99V48.09h159.97v103.98c0 13.3 10.7 23.99 24 23.99H336v287.95zM182.98 227.79l-72.31 71.77c-7.6 7.54-2.26 20.52 8.45 20.52H168v84c0 6.63 5.37 12 12 12h24c6.63 0 12-5.37 12-12v-84h48.88c10.71 0 16.05-12.97 8.45-20.52l-72.31-71.77c-4.99-4.95-13.05-4.95-18.04 0z"></path></svg><span>&nbsp;' + escapeHtml(f_variables_tran.attach_file) + '</span></a>');
                    break;
                // upload file
                case 'orderedList':
                    $button = $('<a title="' + escapeHtml(f_variables_tran.ordered_list) + '" data-rel="tooltip"><i class="fa fa-list-ol"></i><span>&nbsp;' + escapeHtml(f_variables_tran.ordered_list) + '</span></a>');
                    break;
                // upload file
                case 'unOrderedList':
                    $button = $('<a title="' + escapeHtml(f_variables_tran.unordered_list) + '" data-rel="tooltip"><i class="fa fa-list-ul"></i><span>&nbsp;' + escapeHtml(f_variables_tran.unordered_list) + '</span></a>');
                // upload file
                case 'table':
                    $button = $('<a title="' + escapeHtml(f_variables_tran.insert_table) + '" data-rel="tooltip"><i class="fa fa-table"></i><span>&nbsp;' + escapeHtml(f_variables_tran.insert_table) + '</span></a>');
                    break;
                // code snippet
                case 'codeSnippet':
                    $button = $('<a title="' + escapeHtml(f_variables_tran.code_snippet) + '" data-rel="tooltip"><svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="terminal" class="svg-inline--fa fa-terminal fa-w-20" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="currentColor" d="M41.678 38.101l209.414 209.414c4.686 4.686 4.686 12.284 0 16.971L41.678 473.899c-4.686 4.686-12.284 4.686-16.971 0L4.908 454.101c-4.686-4.686-4.686-12.284 0-16.971L185.607 256 4.908 74.87c-4.686-4.686-4.686-12.284 0-16.971L24.707 38.1c4.686-4.686 12.284-4.686 16.971.001zM640 468v-28c0-6.627-5.373-12-12-12H300c-6.627 0-12 5.373-12 12v28c0 6.627 5.373 12 12 12h328c6.627 0 12-5.373 12-12z"></path></svg><span>&nbsp;' + escapeHtml(f_variables_tran.code_snippet) + '</span></a>');
                    break;
            }
            // add click event to the button
            $button.on('click',function( event ) {
                // when there the user is using a quick insert we must restore caret before adding content
                if ( menuType == 'floating' ) restoreCaretPosition();
                // hide tooltip
                $(this).tooltip('hide');
                // rum add callback
                if ( _.addCallback ) _.addCallback.call(this,buttonID,menuType);
            });
            // return the button
            return $button;
        }

        /**
         * The function is returning the element calculated coordinates
         * in the page
         * Solution: https://plainjs.com/javascript/styles/get-the-position-of-an-element-relative-to-the-document-24/
         */
        function getElementPosition( $el ) {
            // get element coordinates
            var rect = $el.offset();
            //  rtl - subtract the scrollbar width
            if ( $('html[dir="rtl"]').length > 0 ) rect.left -= getScrollbarWidth();
            // return calculated coordinates
            return rect;
        }

        /**
         * The function is opening a popup
         */
        function showPopup( title, message, uploadFileID , updateCallback ) {
            // get object
            var uploadFile = null;
            var s3object = null;
            /**
             * Open popup
             * Documentation: http://bootboxjs.com/examples.html
             */
            var $dialog = bootbox.dialog({
                className: 's123-modal inline-editor-modal',
                title: title,
                message: message,
                closeButton: true,
                backdrop: true,
                onEscape: function( event ) {},
                buttons: {
                    ok: {
                        label: escapeHtml(f_variables_tran.update),
                        className: 'btn btn-success update-change',
                        callback: function( event ) {
                            // prevent closing the popup when the form is not valid
                            if ( !$(this).find('form').valid() ) return false;
                            // run callback
                            if ( uploadFileID ) {
                                if ( updateCallback ) updateCallback.call(this,uploadFile,s3object);
                            // run callback
                            } else {
                                if ( updateCallback ) updateCallback.call(this,$dialog);
                            }
                        }
                    }
                }
            })
            // on popup open do some more actions
            .on('show.bs.modal', function() {
                // add form validator
                $(this).find('form').validate({
                    errorElement: 'div',
                    errorClass: 'help-block',
                    focusInvalid: true,
                    /* [contenteditable="true"]:not([name]) = we had JS errors when the user focus out the editor, to fix it
                    we ignore the editor inputs: https://stackoverflow.com/a/58092791/469161 */
                    ignore: ':hidden:not(.file-upload-input-field,[data-editor="froala"]),.fileUploadBox:hidden .file-upload-input-field,.form-tool-builder .form-control,.form-tool-builder input,[contenteditable="true"]:not([name])',
                    highlight: function (e) {
                        $(e).closest('.form-group').removeClass('has-info').addClass('has-error');
                    },
                    success: function (e) {
                        $(e).closest('.form-group').removeClass('has-error');
                        $(e).remove();
                    },
                    errorPlacement: function (error, element) {
                        if ( element.is('input[type=checkbox]') || element.is('input[type=radio]') ) {
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
                    }
                });
                // popup with upload file
                if ( uploadFileID ) {
                    // get `update` button
                    var $updateChangeBtn = $(this).find('.modal-footer .update-change');
                    // initialize upload file
                    UploadSingleFilesInitialize('');
                    // initial jQuery Colorbox Plugin
                    ColorboxInitial('[data-rel="colorbox"]');
                    // get upload file
                    uploadFile = getUploadFileObjectByID(uploadFileID);
                    // prevent updating changes while uploading
                    uploadFile.input.on('s123.uploadFile.uploadProgress', function() {
                        $updateChangeBtn.prop('disabled',true);
                    })
                    // allow updating changes on upload cancel
                    .on('s123.uploadFile.cancelUpload', function() {
                        $updateChangeBtn.prop('disabled',false);
                    })
                    // allow updating changes on upload finish
                    .on('change.inlineEditor', function( event, s3Obj ) {
                        s3object = s3Obj;
                        $updateChangeBtn.prop('disabled',false);
                    });
                }
                // initializing the system color pickers
                ColorPickerInitialize();
                // initial Bootstrap Tooltip
                InitializeToolTips();
                // initialize auto complete
                initilizeLinksAutocomplete();
            })
            // show popup
            .modal('show');
            // return the dialog because some time we need custom events
            return $dialog;
        }

        /**
         * Inline Quick Insert Extension
         */
        _.quickInsert = function() {

            // Get object
            var _ = {
                $optionsBar: null,
                unSupportedAnchors: ['h3','li','td']
            };

            /**
             * Initialize Quick Insert Extension
             */
            _.init = function( settings ) {
                // get the parent class because we want to user it's methods
                _.parentObj = settings.parentObj;
                // add mouse up and key down listener to add the quick insert
                _.parentObj.$editor.on('keyup mouseup',function( event ) {
                    // get the `caret` parent tag
                    var $anchorNode = $(window.getSelection().anchorNode);
                    // get the `caret` position related to text inside of the `$anchorNode`
                    var anchorOffset = window.getSelection().anchorOffset;
                    /**
                     * Hide Quick Insert - When the caret in in existing
                     * text node the tag name will be empty so we use this to detect
                     * if the user is in existing paragraph or not, for example if the user
                     * is writing a content and press shift + enter we don't want to show
                     * him the quick insert floating button
                     */                                         
                    if ( !$anchorNode.get(0) || !$anchorNode.get(0).tagName || anchorOffset > 0 ) {
                        _.hide();
                    // some elements doesn't support the floating btn
                    } else if ( isUnSupportedAnchor($anchorNode) ) {
                        _.hide();
                    /**
                     * Show Quick Insert - If the user is in new line we show him the quick insert that will float
                     * near the `caret`
                     */
                    } else if ( anchorOffset == 0 ) {
                        _.show($anchorNode);
                    }
                });
                /**
                 * When user is focusing on the editor we want to know when he is leaving it and
                 * hide the quick insert so we add here a special listener that will remove
                 * it self the moment that the user click's outside of the editor
                 */
                _.parentObj.$editor.on('focus', function( event ) {
                    // hide the floating bar if the user left the editor
                    $(document).off('click.quickInsert').on('click.quickInsert', function( event ) {
                        // exit if no related target
                        if ( !event.target ) return;
                        // do nothing if user has clicked inside of the editor
                        if ( $(event.target).closest('.'+_.parentObj.$editor.attr('class').split(/\s+/).join('.')).length == 1 ) return;
                        // do nothing if user has clicked inside of the floating menu
                        if ( $(event.target).closest('.s123-editor-q-i-f-c').length == 1 ) return;
                        // hide floating menu
                        _.hide();
                        // remove the event because it is unnecessary any more
                        $(document).off('click.quickInsert');
                    });
                });
            };

            /**
             * The method showing the floating button
             */
            _.show = function( $anchorNode ) {
                // if we already have the floating bar we remove it because we add new one
                if ( _.$floatingButton ) _.$floatingButton.remove();
                // add floating button
                addFloatingButton($anchorNode);
            };

            /**
             * The method hiding the floating button
             */
            _.hide = function() {
                // remove the floating menu
                if ( _.$floatingButton ) {
                    _.$floatingButton.find('[data-rel="tooltip"]').tooltip('destroy');
                    _.$floatingButton.remove();
                }
            };

            /**
             * Check if the anchor node is supported and, we use this to detect
             * if we need to add the floating `+` button
             */
            function isUnSupportedAnchor( $anchorNode ) {
                // set default flag
                var isUnSupported = false;
                // loop over the unsupported anchors and check the current one is not thier
                for (var i = 0; i < _.unSupportedAnchors.length; i++) {
                    // anchor unsupported
                    if ( $anchorNode.is(_.unSupportedAnchors[i]) ) {
                        isUnSupported = true;
                        break;
                    }
                }
                /* some times there are elements like table that we don't want to add quick insert
                but we do want to use `editorBox` for design purpose */
                if ( $anchorNode.closest('.editorBox').length > 0 ) isUnSupported = true;
                // supported anchor
                return isUnSupported;
            }

            /**
             * The function is adding a floating button
             */
            function addFloatingButton( $anchorNode ) {
                // get html
                var html = '';
                html += '<div class="s123-editor-q-i-f-c">';
                    html += '<a href="#" class="q-i-f-controller">';
                        html += '<i class="fa fa-plus"></i>';
                    html += '</a>';
                    html += '<ul class="q-i-f"></ul>';
                html += '</div>';
                // get jquery object
                _.$floatingButton = $(html);
                // add click event to the controller that is opening the options
                _.$floatingButton.find('.q-i-f-controller').on('click', function( event ) {
                    // prevent default link event
                    event.preventDefault();
                    // hide options
                    if ( $(this).parent().hasClass('show-options') ) {
                        /* after closing the menu we restore the caret position so the
                        user can continue editing */
                        restoreCaretPosition();
                        // hide the menu
                        $(this).parent().removeClass('show-options');
                        // remove the width so the css will take effect
                        _.$floatingButton.css({
                            width: ''
                        });
                    // show options
                    } else {
                        /* save the caret position because it is lost when user click on
                        open quick insert button */
                        saveCaretPosition();
                        // show the menu
                        $(this).parent().addClass('show-options');
                        // calculate the width
                        _.$floatingButton.css({
                            width: _.parentObj.$editor.width()
                        });
                    }
                });
                // add to the body the floating button
                $('body').append(_.$floatingButton);
                // get offset data of the anchor node
                var offset = getElementPosition($anchorNode);
                /* we user this to move the floating button to the side a little
                so it won't be directly near the anchor node */
                var positionOffset = {
                    y: 5,
                    x: 5
                };
                // mobile - on mobile the icons are smaller so we decrease here the offset also
                if ( $('html[data-device="mobile"]').length !== 0 ) {
                    positionOffset.y = 0;
                    positionOffset.x = 3;
                }
                // rtl handler
                if ( $('html[dir="rtl"]').length > 0 ) {
                    // calculate the right point of the element
                    offset.right = $(window).width() - (offset.left + $anchorNode.width());
                    // set the element position
                        _.$floatingButton.css({
                        top: offset.top - positionOffset.y,
                        right: offset.right - _.$floatingButton.find('.q-i-f-controller').width() - positionOffset.x
                    });
                // ltr handler
                } else {
                    _.$floatingButton.css({
                        top: offset.top - positionOffset.y,
                        left: offset.left - _.$floatingButton.find('.q-i-f-controller').width() - positionOffset.x
                    });
                }
                // now excatly the same buttons that the inline buttons has
                _.parentObj.addButtons(_.$floatingButton.find('.q-i-f'),'floating');
                // on change insert of the buttons we hide the floating button
                _.$floatingButton.find('.q-i-f a').one('click.hideFloatingButton', function() {
                    _.hide();
                });
                // initial Bootstrap Tooltip
                InitializeToolTips();
            }

            // Return object
            return _;
        }();

        // Initialize object
        _.init();

        // Return object
        return _;
    };

    /**
     * The function is adding a temporary height to the media
     * because we have overlay tool that is relating on the media size and while
     * the media is loading the user can hover above the media and the overlay will be
     * in the wrong size.
     *
     * Note: we remove the height after the media is loaded so the original height
     * will take effect
     */
    function handleMediaSize( $media, width ) {
        // get elements with ratio
        $media.each(function( index, el ) {
            // get object
            var $this = $(this);
            // set the height according to the ratio
            $this.css({
                height: ( width / $this.data('ratio') )
            });
            /* after the media is loaded we want to remove the height because sometimes 
            we have tools that manipulate the media size for example image size option */
            $this.one('load', function() {
                $(this).css({
                    height: ''
                });
            });
        });
    }

    /**
     * The function is saving the caret position
     */
    function saveCaretPosition() {
        var selection = window.getSelection();
        _.caretPosition = selection.rangeCount === 0 ? null : selection.getRangeAt(0);
    }

    /**
     * The function is restoring the caret position
     */
    function restoreCaretPosition() {
        var selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(_.caretPosition);
    }

    /**
     * The function is generating a uniqueid
     */
    function uniqid(prefix, more_entropy) {
        //  discuss at: http://phpjs.org/functions/uniqid/
        // original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
        //  revised by: Kankrelune (http://www.webfaktory.info/)
        //        note: Uses an internal counter (in php_js global) to avoid collision
        //        test: skip
        //   example 1: uniqid();
        //   returns 1: 'a30285b160c14'
        //   example 2: uniqid('foo');
        //   returns 2: 'fooa30285b1cd361'
        //   example 3: uniqid('bar', true);
        //   returns 3: 'bara20285b23dfd1.31879087'

        if (typeof prefix === 'undefined') {
        prefix = '';
        }

        var retId;
        var formatSeed = function(seed, reqWidth) {
        seed = parseInt(seed, 10)
            .toString(16); // to hex str
        if (reqWidth < seed.length) { // so long we split
            return seed.slice(seed.length - reqWidth);
        }
        if (reqWidth > seed.length) { // so short we pad
            return Array(1 + (reqWidth - seed.length))
            .join('0') + seed;
        }
        return seed;
        };

        // BEGIN REDUNDANT
        if (!this.php_js) {
        this.php_js = {};
        }
        // END REDUNDANT
        if (!this.php_js.uniqidSeed) { // init seed with big random int
        this.php_js.uniqidSeed = Math.floor(Math.random() * 0x75bcd15);
        }
        this.php_js.uniqidSeed++;

        retId = prefix; // start with prefix, add current milliseconds hex string
        retId += formatSeed(parseInt(new Date()
        .getTime() / 1000, 10), 8);
        retId += formatSeed(this.php_js.uniqidSeed, 5); // add seed hex string
        if (more_entropy) {
        // for more entropy we add a float lower to 10
        retId += (Math.random() * 10)
            .toFixed(8)
            .toString();
        }

        return retId;
    }

    /**
     * The function convert special characters to HTML entities, we use it when
     * we add strings into HTML attributes, it used to prevent the breaks in 
     * the HTML e.g. title="abc"efg".
     * 
     * Source: http://stackoverflow.com/questions/1787322/htmlspecialchars-equivalent-in-javascript
     */
    function escapeHtml(text) {
        
        if ( !text ) return text;

        var map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&apos;'
        };
        return text.toString().replace( /[&<>"']/g, function( m ) { return map[m]; } );
    }

    /**
     * The method is wrapping the content with a special s123-editor wrapper
     * and also cleaning unnecessary attributes that we don't want to be saved
     */
    _.wrapContent = function ( content ) {
        // wrap the content with `s123-editor`
        var $content = $('<div class="s123-editor">' + content + '</div>');
        // clear the content from unnecessary attributes
        $content.children().each(function() {
            // remove content editible attributes
            $(this).removeAttr('contenteditable');
            // remove sortable attribute
            $(this).removeAttr('data-sortable-id');
            // remove overlay active attribute
            $(this).removeAttr('data-overlay-active');
        });
        // return the html
        return $content.prop('outerHTML');
    }

    /**
     * The method is unwrapping the content from the s123-editor wrapper
     */
    _.unWrapContent = function ( content ) {
        // get jquery object for html manipulation
        var $content = $(content);
        // make suer the user can't edit boxes (image, upload file, video)
        $content.find('.editorBox').attr('contenteditable',false);
        // return the inner html (without `s123-editor`)
        return $(content).html();
    }

    /**
     * The function is converting the buttons to the following structure
     * so the mobile froala will work with drop downs instead of
     * spreading and creating a mess
     */
    function getMobileButtonsStructure( buttons ) {
        // set categories of the supported buttons
        let categories = {
            moreText: ['bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', 'fontSize', 'textColor', 'mainColor', 'underLineSVGStyle1'],
            moreParagraph: ['paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', 'quote', 'insertHR'],
            moreRich: ['insertLink', 'systemLibrary', 'insertImage', 'insertVideo', 'insertFile', 'insertTable', 'emoticons'],
            moreMisc: ['undo', 'redo', 'fullscreen', 'selectAll', 'html', 'clear', 'clearFormatting']
        };
        // set mobile menu structure
        let mobileMenuStructure = {
            moreText: {
                buttons: [],
                buttonsVisible: 0
            },
            moreParagraph: {
                buttons: [],
                buttonsVisible: 0
            },
            moreRich: {
                buttons: [],
                buttonsVisible: 0
            },
            moreMisc: {
                buttons: [],
                buttonsVisible: 0,
                align: 'right'
            }
        };
        // set undetected buttons object so we won't miss any buttons by mistake
        let unDetectedButtonsNames = {};
        // fill the buttons to the new structure
        $.each(buttons, function(index, button) {
            // skip custom seperator because it's not for this toolbar
            if ( button == 'fr_separator' ) return;
            // order the buttons by category
            $.each(categories, function(category, catButtons) {
                if ( catButtons.includes(button) ) {
                    // save the button the category
                    mobileMenuStructure[category].buttons.push(button);
                    // remove from the undetected buttons
                    delete unDetectedButtonsNames[button];
                    // stop searching for the button
                    return false;
                // temporary save the button to undetected
                } else {
                    unDetectedButtonsNames[button] = 1;
                }
            });
        });
        // buttons that we don't know where to place will be in `other` category
        $.each(unDetectedButtonsNames, function(button, value) {
            mobileMenuStructure.moreMisc.buttons.push(button);
        });
        // return the mobile menu
        return mobileMenuStructure;
    }

    // Return object
    return _;
}();

//Run when the page load (before images and other resource)
jQuery(function($) {
    s123EditorInit();
});

/**
 * Initialize site123 editor
 */
function s123EditorInit() {
    /* some elements we initialize later because we are populating the textarea via js and
    happens after the page is loaded */
    s123Editor.init({
        $elements: $('[data-editor=froala]:not([data-manual-init="true"])')
    });
}