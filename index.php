<?php session_start(); ?>

<!DOCTYPE html>

<html dir="ltr" lang="en" class=" home_page home_page_design s_layout1 isFreePackage in-management">

    <head>

        <meta http-equiv="X-UA-Compatible" content="IE=edge">

        <meta name="viewport" content="width=device-width, initial-scale=1">

        <meta charset="utf-8">

        <meta name="format-detection" content="telephone=no">

        <link rel="dns-prefetch preconnect" href="https://cdn-cms.f-static.com" crossorigin="anonymous"/>

        <link rel="dns-prefetch preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous"/>

        <link rel="dns-prefetch preconnect" href="https://cdn-cms.f-static.net" crossorigin="anonymous"/>

        <link rel="dns-prefetch preconnect" href="https://images.cdn-files-a.com" crossorigin="anonymous"/>

        <link rel="dns-prefetch preconnect" href="https://static.s123-cdn-network-a.com" crossorigin="anonymous"/>

        <link rel="dns-prefetch preconnect" href="https://cdn-cms-s-8-4.f-static.net" crossorigin="anonymous"/>

        <link rel="preload" href="https://files.cdn-files-a.com/ready_uploads/media/15460674/2000_684bfc55b9b9a.jpg" as="image">

        <!-- Favicon -->

        <link rel="shortcut icon" href="https://cdn-cms-s-8-4.f-static.net/manager/websites/site123_website/files/logos/brand_files_2020/Icons/Png/Icon_blue.png?aspect_ratio=1:1&width=48&format=png" type="image/x-icon">

        <link rel="icon" href="https://cdn-cms-s-8-4.f-static.net/manager/websites/site123_website/files/logos/brand_files_2020/Icons/Png/Icon_blue.png?aspect_ratio=1:1&width=48&format=png" type="image/x-icon">

        <!-- Mobile Browser Address Bar Color -->

        <meta name="theme-color" content="#4a0638">

        <!-- Regular Meta Info -->

        <title class="s123-js-pjax">DataDive - Empowering Decision Makers with Data Insights</title>

        <meta name="description" content="DataDive - Transforming complex data into strategic solutions" class="s123-js-pjax">

        <meta name="keywords" content="" class="s123-js-pjax">

        <link rel="canonical" href="https://app.site123.com/" class="s123-js-pjax"/>

        <!-- Facebook Meta Info -->

        <meta property="og:url" content="https://app.site123.com/" class="s123-js-pjax">

        <meta property="og:image" content="https://files.cdn-files-a.com/ready_uploads/media/15460674/800_684bfc55b9b9a.jpg" class="s123-js-pjax">

        <meta property="og:description" content="DataDive - Transforming complex data into strategic solutions" class="s123-js-pjax">

        <meta property="og:title" content="DataDive - Empowering Decision Makers with Data Insights" class="s123-js-pjax">

        <meta property="og:site_name" content="DataDive" class="s123-js-pjax">

        <meta property="og:see_also" content="https://app.site123.com" class="s123-js-pjax">

        <!-- Google+ Meta Info -->

        <meta itemprop="name" content="DataDive - Empowering Decision Makers with Data Insights" class="s123-js-pjax">

        <meta itemprop="description" content="DataDive - Transforming complex data into strategic solutions" class="s123-js-pjax">

        <meta itemprop="image" content="https://files.cdn-files-a.com/ready_uploads/media/15460674/800_684bfc55b9b9a.jpg" class="s123-js-pjax">

        <!-- Twitter Meta Info -->

        <meta name="twitter:card" content="summary" class="s123-js-pjax">

        <meta name="twitter:url" content="https://app.site123.com/" class="s123-js-pjax">

        <meta name="twitter:title" content="DataDive - Empowering Decision Makers with Data Insights" class="s123-js-pjax">

        <meta name="twitter:description" content="DataDive - Transforming complex data into strategic solutions" class="s123-js-pjax">

        <meta name="twitter:image" content="https://files.cdn-files-a.com/ready_uploads/media/15460674/800_684bfc55b9b9a.jpg" class="s123-js-pjax">

        <meta name="robots" content="all" class="s123-js-pjax">

        <!-- Website CSS variables -->

        <style>

            :root {

                --global_main_color: #4a0638;

                --global_main_color_btn_text_color: #fbd0f0;

                --home_text_color: #ffffff;

                --home_third_background_color: #000000;

                --home_custom_image_size: px;

                --home_custom_image_width: px;

                --home_text_size_px: 70px;

                --home_text_size_2_px: 45px;

                --slogan_text_size_px: 22px;

                --home_text_size: 70;

                --home_text_size_2: 45;

                --slogan_text_size: 22;

                --home_text_size_px_media: 70px;

                --home_text_size_2_px_media: 45px;

                --slogan_text_size_px_media: 22px;

                --layout_text_align: center;

                --layout_text_align_rtl: center;

                --layout_text_box_width: 100%;

                --layout_left_side_width: 50%;

                --layout_left_side_width_vh: 50vh;

                --homepage_layout_height: 75%;

                --homepage_layout_height_vh: 75vh;

                --homepage_layout_height_menu_space: 0px;

                --mainNavMobileHeight: 0px;

                --homepage_layout_height_opacity_space_top: 0px;

                --homepage_layout_height_opacity_space_bottom: 0px;

                --mobileMenuFontSize: 20px;

                --mobileMenuPagesSpace: 5px;

                --homepageShapeDividerList_Size: 17%;

                --layout_bottom_spacing: 0px;

                --window-height: 100vh;

                --window-width: 100vw;

                --menu_font_size: 17px;

                --menu_pages_space: 3px;

                --menu_pages_side_padding: 15px;

                --menu_pages_letter_spacing: 0.5px;

                --menu_pages_word_spacing: 0px;

                --menu_thin_border: #ffffff;

                --mobileMenuTextAlign: center;

                --menu_text_color: #5e0847;

                --menu_text_hover_color: #5e0847;

                --menu_color: #ffffff;

                --modules_color_text: #000000;

                --modules_color_text_second: #000000;

                --inside_modules_color_text: #000000;

                --sectionsPadding: 100px;

                --home_text_top_space_1: 0px;

                --home_text_bottom_space_1: 16px;

                --home_text_top_space_2: 0px;

                --home_text_bottom_space_2: 30px;

                --home_text_top_space_3: 0px;

                --home_text_bottom_space_3: 31px;

                --homepage_padding_top: px;

                --homepage_padding_bottom: px;

                --homepage_main_goal_margin_top: 0px;

                --homepage_main_goal_margin_bottom: 0px;

                --homepage_second_goal_margin_top: 0px;

                --homepage_second_goal_margin_bottom: 0px;

                --modules_color_second: #ffffff;

                --modules_color: #f9f9f9;

                --footer_back: #ffffff;

                --footer_text_hover: #4a0638;

                --footer_links_color: #4a0638;

                --footer_text: #000000;

                --home_background_color: #000000;

                --inside_modules_color_box: #f9f9f9;

                --inside_modules_color_text_box: #000000;

                --module_separate_border_color: ;

                --modules_color_box: #ffffff;

                --modules_color_second_box: #f9f9f9;

                --modules_color_text_second_box: #000000;

                --inside_modules_color: #ffffff;

                --modules_color_text_box: #000000;

                --font_logo: Caladea;

                --font_menu: Caladea;

                --global_font: Caladea;

                --font_slogan: Caladea;

                --font_slogan_2: Caladea;

                --font_second_slogan: Caladea;

                --font_modules_header: Caladea;

                --sticky_menu: 1;

                --scrollHeaderSize: 0px;

                --modules_color_section_main: #4a0638;

                --modules_color_section_btn_text: #fbd0f0;

                --modules_color_second_section_main: #4a0638;

                --modules_color_second_section_btn_text: #fbd0f0;

                --inside_modules_color_section_box_main: #4a0638;

                --inside_modules_color_section_btn_text: #fbd0f0;

                --line_height_modules_header: 1.25;

                --global_line_height: 1.25;

            }

            .btn.btn-blue {
                    background-color: #4271f4;
                    color: #fff;
                }
            .btn.btn-small {
                font-size: 16px;
                font-size: .8rem;
                padding: 16px 32px;
            }

        </style>

        <!-- Custom CSS -->

        <!-- Minimize CSS files -->

        <link rel="stylesheet" href="https://cdn-cms-s-8-4.f-static.net/versions/2/system_mini/css/minimize_all.css?v=y84124357" type="text/css" crossorigin="anonymous">

        <link rel="stylesheet" href="versions/2/css/websiteCSS.css?w=10898050&orderScreen=&websiteID=10898050&onlyContent=&tranW=&v=css_y237_57976158" class="reloadable-css" type="text/css">

        <!-- Froala Editor CSS -->

        <link rel="stylesheet" href="https://cdn-cms-s-8-4.f-static.net/versions/2/system_mini/css/minimizeFroalaAdmin.css?v=y84124357" type="text/css" crossorigin="anonymous">

        <style>

            /**

	 * Link Button >> Pages List - When a user have a long Title for one of his

	 * pages (modules items) he do not see the pages on Pages List drop-down menu.

	 */

            .fr-desktop .fr-dropdown-menu .fr-dropdown-list li a {

                max-width: 299px;

                overflow: hidden;

                text-overflow: ellipsis;

                white-space: nowrap;

            }



            /**

     * Manage Pop-ups - Froala manage pop-ups (e.g. image/table/etc. settings) have

     * a low z-index, so if the user place an image at the bottom of the editor and 

     * then click on it, the pop-up is displayed partial because its cut related to

     * the editor parent element. 

     * Reproduce: Product >> Edit >> Editor - Add image at the bottom and click on it.

     */

            .fr-popup {

                z-index: 2147483647 !important;

            }



            /* add custom seperator */

            .fr-popup [data-cmd="fr_separator"], .fr-toolbar [data-cmd="fr_separator"] {

                width: 1px;

                margin-left: 2px !important;

                margin-right: 2px !important;

                background: #ebebeb ! important;

                display: block;

                pointer-events: none;

            }

        </style>

        <script type="application/ld+json">

            {

                "@context": "https://schema.org",

                "@type": "WebSite",

                "url": "https://app.site123.com",

                "name": "DataDive",

                "potentialAction": {

                    "@type": "SearchAction",

                    "target": "https://app.site123.com/-search/{search_term_string}/",

                    "query-input": "required name=search_term_string"

                }

            }</script>

    </head>

    <body id="page-top">

        <div class="body">

            <div id="websiteHeader">

                <input type="hidden" id="websiteHeaderSettings" class="s123-js-pjax" value="{&quot;btns&quot;:{&quot;phone&quot;:{&quot;isActive&quot;:true,&quot;phoneLinkIcon&quot;:{&quot;icon&quot;:&quot;fa fa-phone&quot;},&quot;headerPhoneNumber_style&quot;:&quot;1&quot;,&quot;addDailcCode&quot;:&quot;999-7777-000&quot;},&quot;email&quot;:{&quot;isActive&quot;:true,&quot;headerEmail&quot;:&quot;example@example.com&quot;,&quot;headerEmail_style&quot;:&quot;1&quot;},&quot;address&quot;:{&quot;isActive&quot;:false},&quot;social&quot;:{&quot;isActive&quot;:false,&quot;isEmpty&quot;:true},&quot;search&quot;:{&quot;isActive&quot;:false},&quot;wishList&quot;:{&quot;isActive&quot;:false},&quot;clientZone&quot;:{&quot;isActive&quot;:false,&quot;isManageURL&quot;:&quot;&amp;w=10898050&quot;},&quot;cart&quot;:{&quot;isActive&quot;:false,&quot;showMenuActionButtons&quot;:&quot;&lt;a class=\&quot;actionButton btn-primary-action-button-4\&quot; role=\&quot;button\&quot; href=\&quot;#\&quot; onclick=\&quot;return false;\&quot;&gt;&lt;i class=\&quot;svg-m s123-icon-converter \&quot; data-icon-name=\&quot;shopping-cart\&quot; style=\&quot; mask: url(&#039;https:\/\/images.cdn-files-a.com\/ready_uploads\/svg\/shopping-cart.svg?v=2&#039;); -webkit-mask: url(&#039;https:\/\/images.cdn-files-a.com\/ready_uploads\/svg\/shopping-cart.svg?v=2&#039;);\&quot; data-ie11-classes=\&quot;\&quot; alt=\&quot;shopping-cart\&quot;&gt;&amp;nbsp;&lt;\/i&gt;&lt;span class=\&quot;count\&quot;&gt;&lt;\/span&gt;&lt;\/a&gt;&quot;,&quot;hasOnlineStore&quot;:false},&quot;actionsButtons&quot;:{&quot;isActive&quot;:false,&quot;button1&quot;:{&quot;isActive&quot;:false,&quot;showMenuActionButtons&quot;:&quot;&lt;a onclick=\&quot;ScrollToModule(&#039;&#039;,&#039;1&#039;);\&quot;&gt;&lt;button {{videoAttributes}} type=\&quot;button\&quot; id=\&quot;topAction_buttonText_1\&quot; class=\&quot;btn btn-primary btn-primary-action-button-1\&quot; style=\&quot;display:none\&quot;&gt;&lt;span class=\&quot;m-b-t\&quot;&gt;&lt;\/span&gt;&lt;\/button&gt;&lt;\/a&gt;&quot;},&quot;button2&quot;:{&quot;isActive&quot;:false,&quot;showMenuActionButtons&quot;:&quot;&lt;a onclick=\&quot;ScrollToModule(&#039;&#039;,&#039;1&#039;);\&quot;&gt;&lt;button {{videoAttributes}} type=\&quot;button\&quot; id=\&quot;topAction_buttonText_2\&quot; class=\&quot;btn btn-primary btn-primary-action-button-1\&quot; style=\&quot;display:none\&quot;&gt;&lt;span class=\&quot;m-b-t\&quot;&gt;&lt;\/span&gt;&lt;\/button&gt;&lt;\/a&gt;&quot;}}},&quot;headerCallToActionsButtons&quot;:{},&quot;headerLayout&quot;:1,&quot;languges&quot;:&quot;&quot;,&quot;multiCurrency&quot;:&quot;&quot;,&quot;layoutID&quot;:&quot;1&quot;,&quot;onepage&quot;:&quot;1&quot;,&quot;isMenuMainColor&quot;:false}" data-arranged-icons="false">

                <nav id="mainNav" class="hidden-xs navbar-default navbar-fixed-top  opacity-no">

                    <div class="site_container">

                        <div class="navbar-header">

                            <a href="#page-top" class="logo_name navbar-brand s123-w-l-s page-scroll">

                                <span class="website-name">DataDive</span>

                            </a>

                        </div>

                        <div id="top-menu">

                            <ul class="navPages nav navbar-nav">

                                <li class="moduleMenu active">

                                    <a class="page-scroll homepageMenu" href="#page-top">

                                        <span class="txt-container">Home</span>

                                    </a>

                                </li>

                                <li class="moduleMenu" data-menu-module-id="684ea5e1c736d">

                                    <a class="page-scroll" href="#section-684ea5e1c736d">

                                        <span class="txt-container">About</span>

                                    </a>

                                </li>

                                <li class="moduleMenu" data-menu-module-id="684ea5e1dd3be">

                                    <a class="page-scroll" href="#section-684ea5e1dd3be">

                                        <span class="txt-container">Services</span>

                                    </a>

                                </li>

                                <li class="moduleMenu" data-menu-module-id="684ea5e39cdf3">

                                    <a class="page-scroll" href="#section-684ea5e39cdf3">

                                        <span class="txt-container">Testimonials</span>

                                    </a>

                                </li>

                                <li class="moduleMenu" data-menu-module-id="684ea5e445b50">

                                    <a class="page-scroll" href="#section-684ea5e445b50">

                                        <span class="txt-container">Contact</span>

                                    </a>

                                </li>
                                <li>
                                    |
                                </li>

                                <?php if (isset($_SESSION['email'])): ?>

                                 <!-- If user is logged in -->
                                    <li class="user-email">
                                        <a href="#"><?php echo htmlspecialchars($_SESSION['name']); ?></a>
                                    </li>
                                    <li>
                                        <a class="btn btn-red btn-small" href="logout.php"> <span class="hidden-xs">Logout</span></a>
                                    </li>
                                <?php else: ?>

                                <li>
                                    
                                    <li class="loginMenu"><a class="menuItem" href="login.php"><i class="fal fa-sign-in visible-xs-block"></i><span class="hidden-xs">Login</span></a></li>

                                </li>
                                <li>

                                 <a class="btn btn-blue btn-small" href="register.php"><i class="fal fa-plus visible-xs-block"></i><span class="hidden-xs">START HERE</span></a>

                                </li>
                                <?php endif; ?>


                            </ul>

                            <ul class="navActions nav navbar-nav"></ul>

                        </div>

                    </div>

                </nav>

                <!-- Sticky Menu -->

                <input type="hidden" id="stickyMenu" name="stickyMenu" value="on">

            </div>

            <nav id="mainNavMobile" class="navbar-fixed-top">

                <div class="navPagesLeft">

                    <div class="header-menu-wrapper">

                        <a data-close-location="left" data-menu-color="" data-menu-type="0" data-menu-align="center" data-is-mobile="true" class="mobile-menu-btn actionButton" role="button" data-container="body" data-toggle="menuCallActionIcons">

                            <i class="svg-m s123-icon-converter " data-icon-name="bars" style=" mask: url('https://images.cdn-files-a.com/ready_uploads/svg/bars.svg?v=2'); -webkit-mask: url('https://images.cdn-files-a.com/ready_uploads/svg/bars.svg?v=2');" data-ie11-classes="" alt="bars">&nbsp;</i>

                        </a>

                    </div>

                </div>

                <div class="navbar-header">

                    <a href="#page-top" class="logo_name navbar-brand s123-w-l-s page-scroll">

                        <span class="website-name">DataDive</span>

                    </a>

                </div>

                <div class="navPagesRight">

                    <ul class="navActions nav navbar-nav"></ul>

                </div>

            </nav>

            <div id="top-menu-mobile" style="display:none;">

                <ul>

                    <!-- Website Menu Pages -->

                    <li class="moduleMenu active">

                        <a class="page-scroll homepageMenu" href="#page-top">

                            <span class="txt-container">Home</span>

                        </a>

                    </li>

                    <li class="moduleMenu" data-menu-module-id="684ea5e1c736d">

                        <a class="page-scroll" href="#section-684ea5e1c736d">

                            <span class="txt-container">About</span>

                        </a>

                    </li>

                    <li class="moduleMenu" data-menu-module-id="684ea5e1dd3be">

                        <a class="page-scroll" href="#section-684ea5e1dd3be">

                            <span class="txt-container">Services</span>

                        </a>

                    </li>

                    <li class="moduleMenu" data-menu-module-id="684ea5e39cdf3">

                        <a class="page-scroll" href="#section-684ea5e39cdf3">

                            <span class="txt-container">Testimonials</span>

                        </a>

                    </li>

                    <li class="moduleMenu" data-menu-module-id="684ea5e445b50">

                        <a class="page-scroll" href="#section-684ea5e445b50">

                            <span class="txt-container">Contact</span>

                        </a>

                    </li>

                </ul>

            </div>

            <div id="s123PjaxMainContainer">

                <div id="s123ModulesContainer" class="s123-modules-container">

                    <section id="section-169" class="s123-module s123-module-headers layout-30 bg-half-opacity headers-fix-mobile-height ie-open-on-click   headers-responsive-layout" data-parallax-images-amount="1" data-module-id="169" data-module-type-num="169" data-slider-speed="5" data-smart-text-size="fullArea" data-version="2" data-mobile-tool-style="">

                        <!-- Manage Buttons -->

                        <div class="previewManageButton">

                            <a class="p-m-b-design edit" data-module-id="169" data-module-type="169" data-item-unique-id="">

                                <span class="p-m-b-text">Edit</span>

                                <span class="p-m-b-icon">

                                    <i class="svg-m s123-icon-converter " data-icon-name="pencil" style=" mask: url('https://images.cdn-files-a.com/ready_uploads/svg/pencil.svg?v=2'); -webkit-mask: url('https://images.cdn-files-a.com/ready_uploads/svg/pencil.svg?v=2');" data-ie11-classes="" alt="pencil">&nbsp;</i>

                                </span>

                            </a>

                            <a class="p-m-b-design previewManageButtonAiText" data-module-id="169" data-module-type="169">

                                <span>

                                    <i class="svg-m s123-icon-converter " data-icon-name="magic" style=" mask: url('https://images.cdn-files-a.com/ready_uploads/svg/magic.svg?v=2'); -webkit-mask: url('https://images.cdn-files-a.com/ready_uploads/svg/magic.svg?v=2');" data-ie11-classes="" alt="magic">&nbsp;</i>

                                </span>

                            </a>

                            <a class="p-m-b-design design" data-module-id="169" data-module-type="169">

                                <span class="p-m-b-text">Layouts</span>

                                <span class="p-m-b-icon">

                                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="palette" class="svg-inline--fa-light fa-palette fa-w-12" style="width:15px;height:15px;" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">

                                        <path fill="currentColor" d="M204.3 5C104.9 24.4 24.8 104.3 5.2 203.4c-37 187 131.7 326.4 258.8 306.7 41.2-6.4 61.4-54.6 42.5-91.7-23.1-45.4 9.9-98.4 60.9-98.4h79.7c35.8 0 64.8-29.6 64.9-65.3C511.5 97.1 368.1-26.9 204.3 5zM96 320c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32zm32-128c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32zm128-64c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32zm128 64c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32z"></path>

                                    </svg>

                                </span>

                            </a>

                            <a class="p-m-b-design customizeDesign" data-module-id="169" data-module-type="169" data-item-unique-id="">

                                <i class="svg-m s123-icon-converter " data-icon-name="cog" style=" mask: url('https://images.cdn-files-a.com/ready_uploads/svg/cog.svg?v=2'); -webkit-mask: url('https://images.cdn-files-a.com/ready_uploads/svg/cog.svg?v=2');" data-ie11-classes="" alt="cog">&nbsp;</i>

                            </a>

                        </div>

                        <!-- Container -->

                        <div class="container-fluid">

                            <!-- Top Adds -->

                            <!-- Container -->

                            <div class="headers-container without-images bottom-form hpm-height-85vh">

                                <div class="headers-text-wrap container">

                                    <div class="row ">

                                        <div class="col-xs-12 headers-text-resize-container">

                                            <div class="headers-text-posiosition">

                                                <div class="headers-text-orders  ">

                                                    <!-- Header 1 -->

                                                    <div data-aos="slide-up">

                                                        <h1 class="m-h-item header1 custom-font-settings weight700   header-modules-header-font" id="mainText-169" data-cpl="mainText-169" style="--header-font-size: 48;" data-old-bold="false" data-custom-font="" data-is-italic-supported="" data-line-height="">Empowering Decision Makers with Data Insights</h1>

                                                    </div>

                                                    <div class="line headers-text-separator"></div>

                                                    <!-- Header 2 -->

                                                    <div data-aos="slide-up">

                                                        <h2 class="m-h-item header2 custom-font-settings   header-modules-header-font" id="subText-169" data-cpl="subText-169" style="--header-font-size: 19;" data-custom-font="" data-is-italic-supported="" data-line-height="">Transforming complex data into strategic solutions</h2>

                                                    </div>

                                                </div>

                                                <!-- Container -->

                                                <div class="container-fluid">

                                                    <div class="row">

                                                        <div class="col-xs-12">

                                                            <div class="header-spacer" data-text-exist="true" data-action-exist="false"></div>

                                                            <!-- Call To Action -->

                                                        </div>

                                                    </div>

                                                </div>

                                            </div>

                                        </div>

                                        <div class="col-xs-12">

                                            <div class="headers-form-wrap preview-highlighter box-primary box-text-primary header-box-shadow box-border-style-1" data-open-tool="contactBox">

                                                <form class="breakable contactUsForm " data-date-format="d/m/Y" data-click-action="">

                                                    <div>

                                                        <div class="form-group">

                                                            <input type="text" name="contact_name" placeholder="Name" class="form-control" required data-msg-required="This field is required.">

                                                        </div>

                                                        <div class="form-group">

                                                            <input type="text" name="contact_phone" placeholder="Phone" class="form-control">

                                                        </div>

                                                        <div class="form-group">

                                                            <input type="text" name="contact_email" placeholder="Email address" class="form-control s123-force-ltr" required data-msg-required="This field is required." data-rule-email="true" data-msg-email="Please enter a valid email.">

                                                        </div>

                                                        <div class="form-group">

                                                            <textarea class="form-control" name="contact_message" placeholder="Message" style="min-height: 100px;"></textarea>

                                                        </div>

                                                        <button type="submit" class="btn btn-primary btn-block">Contact Us</button>

                                                    </div>

                                                    <input type="hidden" name="w" value="10898050">

                                                    <input type="hidden" name="websiteID" value="10898050">

                                                    <input type="hidden" name="moduleID" value="169">

                                                    <input type="hidden" name="layout" value="30">

                                                    <input type="hidden" name="recaptchaToken" value="">

                                                </form>

                                            </div>

                                        </div>

                                    </div>

                                </div>

                                <!-- Images -->

                            </div>

                            <!-- Bottom Adds -->

                        </div>

                        <!-- Interface Undo Helper -->

                        <input type="hidden" class="undo-helper" value="{&quot;allSettings&quot;:{&quot;mainText&quot;:&quot;Empowering Decision Makers with Data Insights&quot;,&quot;subText&quot;:&quot;Transforming complex data into strategic solutions&quot;,&quot;image&quot;:&quot;https:\/\/files.cdn-files-a.com\/ready_uploads\/media\/15460674\/normal_684bfc55b9b9a.jpg&quot;,&quot;image1&quot;:&quot;&quot;,&quot;image2&quot;:&quot;&quot;,&quot;callToAction&quot;:&quot;{\&quot;type\&quot;:\&quot;\&quot;,\&quot;buttons\&quot;:{\&quot;size\&quot;:\&quot;1\&quot;,\&quot;items\&quot;:[{\&quot;textInput\&quot;:{\&quot;id\&quot;:\&quot;buttonText\&quot;,\&quot;value\&quot;:\&quot;Read More\&quot;},\&quot;type\&quot;:{\&quot;id\&quot;:\&quot;redirectButtonType\&quot;,\&quot;value\&quot;:\&quot;1\&quot;,\&quot;inputs\&quot;:{\&quot;scroll\&quot;:{\&quot;id\&quot;:\&quot;buttonScrollTo\&quot;,\&quot;value\&quot;:\&quot;\&quot;},\&quot;redirect\&quot;:{\&quot;id\&quot;:\&quot;buttonLink\&quot;,\&quot;value\&quot;:\&quot;\&quot;}}},\&quot;style\&quot;:{\&quot;id\&quot;:\&quot;buttonStyle\&quot;,\&quot;value\&quot;:9},\&quot;icon\&quot;:{\&quot;id\&quot;:\&quot;buttonIcon\&quot;,\&quot;value\&quot;:\&quot;\&quot;,\&quot;settings\&quot;:{\&quot;id\&quot;:\&quot;buttonIcon_settings\&quot;,\&quot;value\&quot;:\&quot;\&quot;}}},{\&quot;textInput\&quot;:{\&quot;id\&quot;:\&quot;button2Text\&quot;,\&quot;value\&quot;:\&quot;\&quot;},\&quot;type\&quot;:{\&quot;id\&quot;:\&quot;redirectButton2Type\&quot;,\&quot;value\&quot;:\&quot;\&quot;,\&quot;inputs\&quot;:{\&quot;scroll\&quot;:{\&quot;id\&quot;:\&quot;button2ScrollTo\&quot;,\&quot;value\&quot;:\&quot;\&quot;},\&quot;redirect\&quot;:{\&quot;id\&quot;:\&quot;button2Link\&quot;,\&quot;value\&quot;:\&quot;\&quot;}}},\&quot;style\&quot;:{\&quot;id\&quot;:\&quot;button2Style\&quot;,\&quot;value\&quot;:9},\&quot;icon\&quot;:{\&quot;id\&quot;:\&quot;button2Icon\&quot;,\&quot;value\&quot;:\&quot;\&quot;,\&quot;settings\&quot;:{\&quot;id\&quot;:\&quot;button2Icon_settings\&quot;,\&quot;value\&quot;:\&quot;\&quot;}}}]},\&quot;video\&quot;:{\&quot;type\&quot;:\&quot;\&quot;,\&quot;extVideoUrl\&quot;:\&quot;https:\/\/www.youtube.com\/watch?v=TalgHWd550w\&quot;,\&quot;customVideoUrl\&quot;:\&quot;https:\/\/cdn-media.f-static.net\/uploads\/90107\/normal_606eda1fc8522.mp4\&quot;}}&quot;,&quot;version&quot;:&quot;2&quot;,&quot;fontSettings&quot;:&quot;{\&quot;mainText\&quot;:{\&quot;isBold\&quot;:true,\&quot;isItalic\&quot;:false,\&quot;fontSize\&quot;:48,\&quot;font\&quot;:\&quot;\&quot;,\&quot;isItalicSupported\&quot;:\&quot;\&quot;},\&quot;subText\&quot;:{\&quot;isBold\&quot;:false,\&quot;isItalic\&quot;:false,\&quot;fontSize\&quot;:19,\&quot;font\&quot;:\&quot;\&quot;,\&quot;isItalicSupported\&quot;:\&quot;\&quot;}}&quot;,&quot;activeCustomThankYouMsg&quot;:null,&quot;sliderSpeed&quot;:5,&quot;image_settings&quot;:null,&quot;image1_settings&quot;:null,&quot;image2_settings&quot;:null,&quot;buttonClickAction&quot;:null},&quot;style&quot;:&quot;57&quot;,&quot;moduleArrID&quot;:169057}">

                    </section>

                    <section id="section-684ea5e1c736d" class="s123-module s123-module-headers layout-22 bg-primary hpm-height-85vh  headers-responsive-layout" data-module-id="684ea5e1c736d" data-module-type-num="167" data-slider-speed="5" data-smart-text-size="limitedArea" data-version="2" data-image-width="1" data-mobile-tool-style="">

                        <!-- Manage Buttons -->

                        <div class="previewManageButton">

                            <a class="p-m-b-design edit" data-module-id="684ea5e1c736d" data-module-type="167" data-item-unique-id="">

                                <span class="p-m-b-text">Edit</span>

                                <span class="p-m-b-icon">

                                    <i class="svg-m s123-icon-converter " data-icon-name="pencil" style=" mask: url('https://images.cdn-files-a.com/ready_uploads/svg/pencil.svg?v=2'); -webkit-mask: url('https://images.cdn-files-a.com/ready_uploads/svg/pencil.svg?v=2');" data-ie11-classes="" alt="pencil">&nbsp;</i>

                                </span>

                            </a>

                            <a class="p-m-b-design previewManageButtonAiText" data-module-id="684ea5e1c736d" data-module-type="167">

                                <span>

                                    <i class="svg-m s123-icon-converter " data-icon-name="magic" style=" mask: url('https://images.cdn-files-a.com/ready_uploads/svg/magic.svg?v=2'); -webkit-mask: url('https://images.cdn-files-a.com/ready_uploads/svg/magic.svg?v=2');" data-ie11-classes="" alt="magic">&nbsp;</i>

                                </span>

                            </a>

                            <a class="p-m-b-design design" data-module-id="684ea5e1c736d" data-module-type="167">

                                <span class="p-m-b-text">Layouts</span>

                                <span class="p-m-b-icon">

                                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="palette" class="svg-inline--fa-light fa-palette fa-w-12" style="width:15px;height:15px;" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">

                                        <path fill="currentColor" d="M204.3 5C104.9 24.4 24.8 104.3 5.2 203.4c-37 187 131.7 326.4 258.8 306.7 41.2-6.4 61.4-54.6 42.5-91.7-23.1-45.4 9.9-98.4 60.9-98.4h79.7c35.8 0 64.8-29.6 64.9-65.3C511.5 97.1 368.1-26.9 204.3 5zM96 320c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32zm32-128c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32zm128-64c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32zm128 64c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32z"></path>

                                    </svg>

                                </span>

                            </a>

                            <a class="p-m-b-design customizeDesign" data-module-id="684ea5e1c736d" data-module-type="167" data-item-unique-id="">

                                <i class="svg-m s123-icon-converter " data-icon-name="cog" style=" mask: url('https://images.cdn-files-a.com/ready_uploads/svg/cog.svg?v=2'); -webkit-mask: url('https://images.cdn-files-a.com/ready_uploads/svg/cog.svg?v=2');" data-ie11-classes="" alt="cog">&nbsp;</i>

                            </a>

                        </div>

                        <!-- Container -->

                        <div class="container" data-aos="fade-up">

                            <!-- Top Adds -->

                            <!-- Items Area -->

                            <div class="row">

                                <div class="col-xs-12 ">

                                    <div class="headers-container ">

                                        <div class="headers-carousel-deactivated carousel slide carousel-fade header-box-shadow ">

                                            <div class="carousel-inner">

                                                <!-- Carousel Slides / Quotes -->

                                                <div class="item active one-item">

                                                    <div class="headers-item">

                                                        <div class="headers-image " data-bg="https://images.cdn-files-a.com/ready_uploads/media/12162119/2000_64841da468984.jpg" style="background-image:url(https://images.cdn-files-a.com/ready_uploads/media/12162119/2000_64841da468984.jpg); background-position:center center;" id="image-684ea5e1c736d" data-cpl="image-684ea5e1c736d"></div>

                                                    </div>

                                                </div>

                                            </div>

                                        </div>

                                        <div class="headers-description box box-primary box-text-primary   headers-text-resize-container box-border-style-1">

                                            <div class="headers-text-orders ">

                                                <!-- Header 1 -->

                                                <div data-aos="fade-up">

                                                    <div class="m-h-item header1 header-300    header-modules-header-font" id="mainText-684ea5e1c736d" data-cpl="mainText-684ea5e1c736d" style="" data-old-bold="true" data-custom-font="" data-is-italic-supported="" data-line-height="">About Our Expertise</div>

                                                </div>

                                                <div class="line headers-text-separator"></div>

                                                <!-- Header 2 -->

                                                <div data-aos="fade-up">

                                                    <div class="m-h-item header2 text-120   header-global-font" id="subText-684ea5e1c736d" data-cpl="subText-684ea5e1c736d" style="" data-custom-font="" data-is-italic-supported="" data-line-height="">We are a premier data analytics consultancy specializing in extracting actionable insights from complex datasets. By leveraging cutting-edge machine learning algorithms and predictive modeling, we empower businesses to make informed strategic decisions. Our dedicated team of experts collaborates closely with clients, ensuring tailored solutions that drive success and foster growth in a competitive landscape.</div>

                                                </div>

                                            </div>

                                            <div class="header-spacer" data-text-exist="true" data-action-exist="false"></div>

                                            <!-- Call To Action -->

                                        </div>

                                    </div>

                                </div>

                            </div>

                            <!-- Bottom Adds -->

                        </div>

                        <!-- Interface Undo Helper -->

                        <input type="hidden" class="undo-helper" value="{&quot;allSettings&quot;:{&quot;mainText&quot;:&quot;About Our Expertise&quot;,&quot;subText&quot;:&quot;We are a premier data analytics consultancy specializing in extracting actionable insights from complex datasets. By leveraging cutting-edge machine learning algorithms and predictive modeling, we empower businesses to make informed strategic decisions. Our dedicated team of experts collaborates closely with clients, ensuring tailored solutions that drive success and foster growth in a competitive landscape.&quot;,&quot;image&quot;:&quot;https:\/\/static.s123-cdn-static-d.com\/ready_uploads\/media\/12162119\/normal_64841da468984.jpg&quot;,&quot;image1&quot;:&quot;&quot;,&quot;image2&quot;:&quot;&quot;,&quot;callToAction&quot;:&quot;{\&quot;type\&quot;:\&quot;\&quot;,\&quot;buttons\&quot;:{\&quot;size\&quot;:\&quot;1\&quot;,\&quot;items\&quot;:[{\&quot;textInput\&quot;:{\&quot;id\&quot;:\&quot;buttonText\&quot;,\&quot;value\&quot;:\&quot;Read More\&quot;},\&quot;type\&quot;:{\&quot;id\&quot;:\&quot;redirectButtonType\&quot;,\&quot;value\&quot;:\&quot;1\&quot;,\&quot;inputs\&quot;:{\&quot;scroll\&quot;:{\&quot;id\&quot;:\&quot;buttonScrollTo\&quot;,\&quot;value\&quot;:\&quot;\&quot;},\&quot;redirect\&quot;:{\&quot;id\&quot;:\&quot;buttonLink\&quot;,\&quot;value\&quot;:\&quot;\&quot;}}},\&quot;style\&quot;:{\&quot;id\&quot;:\&quot;buttonStyle\&quot;,\&quot;value\&quot;:9},\&quot;icon\&quot;:{\&quot;id\&quot;:\&quot;buttonIcon\&quot;,\&quot;value\&quot;:\&quot;\&quot;,\&quot;settings\&quot;:{\&quot;id\&quot;:\&quot;buttonIcon_settings\&quot;,\&quot;value\&quot;:\&quot;\&quot;}}},{\&quot;textInput\&quot;:{\&quot;id\&quot;:\&quot;button2Text\&quot;,\&quot;value\&quot;:\&quot;\&quot;},\&quot;type\&quot;:{\&quot;id\&quot;:\&quot;redirectButton2Type\&quot;,\&quot;value\&quot;:\&quot;\&quot;,\&quot;inputs\&quot;:{\&quot;scroll\&quot;:{\&quot;id\&quot;:\&quot;button2ScrollTo\&quot;,\&quot;value\&quot;:\&quot;\&quot;},\&quot;redirect\&quot;:{\&quot;id\&quot;:\&quot;button2Link\&quot;,\&quot;value\&quot;:\&quot;\&quot;}}},\&quot;style\&quot;:{\&quot;id\&quot;:\&quot;button2Style\&quot;,\&quot;value\&quot;:9},\&quot;icon\&quot;:{\&quot;id\&quot;:\&quot;button2Icon\&quot;,\&quot;value\&quot;:\&quot;\&quot;,\&quot;settings\&quot;:{\&quot;id\&quot;:\&quot;button2Icon_settings\&quot;,\&quot;value\&quot;:\&quot;\&quot;}}}]},\&quot;video\&quot;:{\&quot;type\&quot;:\&quot;\&quot;,\&quot;extVideoUrl\&quot;:\&quot;https:\/\/www.youtube.com\/watch?v=TalgHWd550w\&quot;,\&quot;customVideoUrl\&quot;:\&quot;https:\/\/cdn-media.f-static.net\/uploads\/90107\/normal_606eda1fc8522.mp4\&quot;}}&quot;,&quot;version&quot;:&quot;2&quot;,&quot;sliderSpeed&quot;:5,&quot;image_settings&quot;:null,&quot;image1_settings&quot;:null,&quot;image2_settings&quot;:null},&quot;style&quot;:&quot;22&quot;,&quot;moduleArrID&quot;:167022}">

                    </section>

                    <section id="section-684ea5e1d2906" class="s123-module s123-module-headers layout-29 hpm-height-85vh  headers-fix-mobile-height parallax-on headers-responsive-layout" data-parallax-images-amount="1" data-module-id="684ea5e1d2906" data-module-type-num="167" data-slider-speed="5" data-smart-text-size="limitedArea" data-menu-opacity="false" data-version="2" data-mobile-tool-style="7">

                        <!-- Manage Buttons -->

                        <div class="previewManageButton">

                            <a class="p-m-b-design edit" data-module-id="684ea5e1d2906" data-module-type="167" data-item-unique-id="">

                                <span class="p-m-b-text">Edit</span>

                                <span class="p-m-b-icon">

                                    <i class="svg-m s123-icon-converter " data-icon-name="pencil" style=" mask: url('https://images.cdn-files-a.com/ready_uploads/svg/pencil.svg?v=2'); -webkit-mask: url('https://images.cdn-files-a.com/ready_uploads/svg/pencil.svg?v=2');" data-ie11-classes="" alt="pencil">&nbsp;</i>

                                </span>

                            </a>

                            <a class="p-m-b-design previewManageButtonAiText" data-module-id="684ea5e1d2906" data-module-type="167">

                                <span>

                                    <i class="svg-m s123-icon-converter " data-icon-name="magic" style=" mask: url('https://images.cdn-files-a.com/ready_uploads/svg/magic.svg?v=2'); -webkit-mask: url('https://images.cdn-files-a.com/ready_uploads/svg/magic.svg?v=2');" data-ie11-classes="" alt="magic">&nbsp;</i>

                                </span>

                            </a>

                            <a class="p-m-b-design design" data-module-id="684ea5e1d2906" data-module-type="167">

                                <span class="p-m-b-text">Layouts</span>

                                <span class="p-m-b-icon">

                                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="palette" class="svg-inline--fa-light fa-palette fa-w-12" style="width:15px;height:15px;" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">

                                        <path fill="currentColor" d="M204.3 5C104.9 24.4 24.8 104.3 5.2 203.4c-37 187 131.7 326.4 258.8 306.7 41.2-6.4 61.4-54.6 42.5-91.7-23.1-45.4 9.9-98.4 60.9-98.4h79.7c35.8 0 64.8-29.6 64.9-65.3C511.5 97.1 368.1-26.9 204.3 5zM96 320c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32zm32-128c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32zm128-64c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32zm128 64c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32z"></path>

                                    </svg>

                                </span>

                            </a>

                            <a class="p-m-b-design customizeDesign" data-module-id="684ea5e1d2906" data-module-type="167" data-item-unique-id="">

                                <i class="svg-m s123-icon-converter " data-icon-name="cog" style=" mask: url('https://images.cdn-files-a.com/ready_uploads/svg/cog.svg?v=2'); -webkit-mask: url('https://images.cdn-files-a.com/ready_uploads/svg/cog.svg?v=2');" data-ie11-classes="" alt="cog">&nbsp;</i>

                            </a>

                        </div>

                        <!-- Container -->

                        <div class="container-fluid">

                            <div class="header-background-container" data-background-color="">

                                <!-- Top Adds -->

                                <!-- Items Area -->

                                <div class="row">

                                    <div class="headers-container " style="--header-image-opacity:0;">

                                        <div class="headers-carousel-deactivated carousel slide carousel-fade header-box-shadow ">

                                            <div class="carousel-inner">

                                                <!-- Carousel Slides / Quotes -->

                                                <div class="item active one-item">

                                                    <div class="headers-item">

                                                        <div data-idele="parallax_headers_mirror_684ea5e1d2906" data-bleed="30" data-image-src="https://files.cdn-files-a.com/ready_uploads/media/15739292/2000_684bf2f84e82b.jpg" data-position="center center" data-background-position="center center" data-parallax="scroll" data-backgroundcolor="#000000" data-opacity="1" class="headers-image parallax-window" data-bg="https://files.cdn-files-a.com/ready_uploads/media/15739292/2000_684bf2f84e82b.jpg" style="background-image:url(https://files.cdn-files-a.com/ready_uploads/media/15739292/2000_684bf2f84e82b.jpg); background-position:center center;" id="image-684ea5e1d2906" data-cpl="image-684ea5e1d2906"></div>

                                                    </div>

                                                </div>

                                            </div>

                                        </div>

                                        <div class="headers-description box header-box-shadow  box-primary box-text-primary headers-text-resize-container box-border-style-1">

                                            <div>

                                                <div class="headers-text-orders ">

                                                    <!-- Header 1 -->

                                                    <div data-aos="fade-up">

                                                        <div class="m-h-item header1 custom-font-settings    header-modules-header-font" id="mainText-684ea5e1d2906" data-cpl="mainText-684ea5e1d2906" style="--header-font-size: 48;" data-old-bold="false" data-custom-font="" data-is-italic-supported="" data-line-height="">Turn Data into Progress 88</div>

                                                    </div>

                                                    <div class="line headers-text-separator"></div>

                                                    <!-- Header 2 -->

                                                    <div data-aos="fade-up">

                                                        <div class="m-h-item header2 custom-font-settings   header-modules-header-font" id="subText-684ea5e1d2906" data-cpl="subText-684ea5e1d2906" style="--header-font-size: 19;" data-custom-font="" data-is-italic-supported="" data-line-height="">Your data-driven future starts here</div>

                                                    </div>

                                                </div>

                                                <div class="header-spacer" data-text-exist="true" data-action-exist="false"></div>

                                                <!-- Call To Action -->

                                            </div>

                                        </div>

                                    </div>

                                </div>

                                <!-- Bottom Adds -->

                            </div>

                        </div>

                        <!-- Interface Undo Helper -->

                        <input type="hidden" class="undo-helper" value="{&quot;allSettings&quot;:{&quot;mainText&quot;:&quot;Turn Data into Progress 88&quot;,&quot;subText&quot;:&quot;Your data-driven future starts here&quot;,&quot;image&quot;:&quot;https:\/\/files.cdn-files-a.com\/ready_uploads\/media\/15739292\/normal_684bf2f84e82b.jpg&quot;,&quot;image1&quot;:&quot;&quot;,&quot;image2&quot;:&quot;&quot;,&quot;callToAction&quot;:&quot;{\&quot;type\&quot;:\&quot;\&quot;,\&quot;buttons\&quot;:{\&quot;size\&quot;:\&quot;1\&quot;,\&quot;items\&quot;:[{\&quot;textInput\&quot;:{\&quot;id\&quot;:\&quot;buttonText\&quot;,\&quot;value\&quot;:\&quot;Read More\&quot;},\&quot;type\&quot;:{\&quot;id\&quot;:\&quot;redirectButtonType\&quot;,\&quot;value\&quot;:\&quot;1\&quot;,\&quot;inputs\&quot;:{\&quot;scroll\&quot;:{\&quot;id\&quot;:\&quot;buttonScrollTo\&quot;,\&quot;value\&quot;:\&quot;\&quot;},\&quot;redirect\&quot;:{\&quot;id\&quot;:\&quot;buttonLink\&quot;,\&quot;value\&quot;:\&quot;\&quot;}}},\&quot;style\&quot;:{\&quot;id\&quot;:\&quot;buttonStyle\&quot;,\&quot;value\&quot;:9},\&quot;icon\&quot;:{\&quot;id\&quot;:\&quot;buttonIcon\&quot;,\&quot;value\&quot;:\&quot;\&quot;,\&quot;settings\&quot;:{\&quot;id\&quot;:\&quot;buttonIcon_settings\&quot;,\&quot;value\&quot;:\&quot;\&quot;}}},{\&quot;textInput\&quot;:{\&quot;id\&quot;:\&quot;button2Text\&quot;,\&quot;value\&quot;:\&quot;\&quot;},\&quot;type\&quot;:{\&quot;id\&quot;:\&quot;redirectButton2Type\&quot;,\&quot;value\&quot;:\&quot;\&quot;,\&quot;inputs\&quot;:{\&quot;scroll\&quot;:{\&quot;id\&quot;:\&quot;button2ScrollTo\&quot;,\&quot;value\&quot;:\&quot;\&quot;},\&quot;redirect\&quot;:{\&quot;id\&quot;:\&quot;button2Link\&quot;,\&quot;value\&quot;:\&quot;\&quot;}}},\&quot;style\&quot;:{\&quot;id\&quot;:\&quot;button2Style\&quot;,\&quot;value\&quot;:9},\&quot;icon\&quot;:{\&quot;id\&quot;:\&quot;button2Icon\&quot;,\&quot;value\&quot;:\&quot;\&quot;,\&quot;settings\&quot;:{\&quot;id\&quot;:\&quot;button2Icon_settings\&quot;,\&quot;value\&quot;:\&quot;\&quot;}}}]},\&quot;video\&quot;:{\&quot;type\&quot;:\&quot;\&quot;,\&quot;extVideoUrl\&quot;:\&quot;https:\/\/www.youtube.com\/watch?v=TalgHWd550w\&quot;,\&quot;customVideoUrl\&quot;:\&quot;https:\/\/cdn-media.f-static.net\/uploads\/90107\/normal_606eda1fc8522.mp4\&quot;}}&quot;,&quot;version&quot;:&quot;2&quot;,&quot;fontSettings&quot;:&quot;{\&quot;mainText\&quot;:{\&quot;isBold\&quot;:false,\&quot;isItalic\&quot;:false,\&quot;fontSize\&quot;:48,\&quot;font\&quot;:\&quot;\&quot;,\&quot;isItalicSupported\&quot;:\&quot;\&quot;},\&quot;subText\&quot;:{\&quot;isBold\&quot;:false,\&quot;isItalic\&quot;:false,\&quot;fontSize\&quot;:19,\&quot;font\&quot;:\&quot;\&quot;,\&quot;isItalicSupported\&quot;:\&quot;\&quot;}}&quot;,&quot;sliderSpeed&quot;:5,&quot;image_settings&quot;:null,&quot;image1_settings&quot;:null,&quot;image2_settings&quot;:null},&quot;style&quot;:&quot;29&quot;,&quot;moduleArrID&quot;:167029}">

                    </section>

                    <section id="section-684ea5e1dd3be" class="s123-module s123-module-services layout-4 bg-primary  " data-module-id="684ea5e1dd3be" data-module-type-num="3" data-overlay-opacity="true">

                        <div data-aos="fade-up" class="container-fluid page_header_style noBackground">

                            <div class="row">

                                <div class="container moduleTitleContainer">

                                    <div class="row modulesTitle text-center">

                                        <div class="col-xs-12">

                                            <div class="page-header-wrap">

                                                <H2 id="section-684ea5e1dd3be-title" data-original-title="Services" class="s123-page-header  ">Services</H2>

                                                <hr class="small">

                                            </div>

                                            <div class="page-slogan-wrap">

                                                <h4 id="section-684ea5e1dd3be-slogan" class="s123-page-slogan"></h4>

                                            </div>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>

                        <div class="previewManageButton">

                            <a class="p-m-b-design edit" data-module-id="684ea5e1dd3be" data-module-type="3" data-item-unique-id="">

                                <span class="p-m-b-text">Edit</span>

                                <span class="p-m-b-icon">

                                    <i class="svg-m s123-icon-converter " data-icon-name="pencil" style=" mask: url('https://images.cdn-files-a.com/ready_uploads/svg/pencil.svg?v=2'); -webkit-mask: url('https://images.cdn-files-a.com/ready_uploads/svg/pencil.svg?v=2');" data-ie11-classes="" alt="pencil">&nbsp;</i>

                                </span>

                            </a>

                            <a class="p-m-b-design previewManageButtonAiText" data-module-id="684ea5e1dd3be" data-module-type="3">

                                <span>

                                    <i class="svg-m s123-icon-converter " data-icon-name="magic" style=" mask: url('https://images.cdn-files-a.com/ready_uploads/svg/magic.svg?v=2'); -webkit-mask: url('https://images.cdn-files-a.com/ready_uploads/svg/magic.svg?v=2');" data-ie11-classes="" alt="magic">&nbsp;</i>

                                </span>

                            </a>

                            <a class="p-m-b-design design" data-module-id="684ea5e1dd3be" data-module-type="3">

                                <span class="p-m-b-text">Layouts</span>

                                <span class="p-m-b-icon">

                                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="palette" class="svg-inline--fa-light fa-palette fa-w-12" style="width:15px;height:15px;" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">

                                        <path fill="currentColor" d="M204.3 5C104.9 24.4 24.8 104.3 5.2 203.4c-37 187 131.7 326.4 258.8 306.7 41.2-6.4 61.4-54.6 42.5-91.7-23.1-45.4 9.9-98.4 60.9-98.4h79.7c35.8 0 64.8-29.6 64.9-65.3C511.5 97.1 368.1-26.9 204.3 5zM96 320c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32zm32-128c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32zm128-64c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32zm128 64c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32z"></path>

                                    </svg>

                                </span>

                            </a>

                            <a class="p-m-b-design customizeDesign" data-module-id="684ea5e1dd3be" data-module-type="3" data-item-unique-id="">

                                <i class="svg-m s123-icon-converter " data-icon-name="cog" style=" mask: url('https://images.cdn-files-a.com/ready_uploads/svg/cog.svg?v=2'); -webkit-mask: url('https://images.cdn-files-a.com/ready_uploads/svg/cog.svg?v=2');" data-ie11-classes="" alt="cog">&nbsp;</i>

                            </a>

                        </div>

                        <div class="container" data-aos="fade-up">

                            <!-- Adds top --->

                            <!-- Container --->

                            <div class="text-center features-container">

                                <!-- Categories area -->

                                <div class="row" style="display:none;">

                                    <div class="s123-categories col-xs-12">

                                        <ul class="items-categories-container" data-category-layouts="true">

                                            <li data-categories-filter="all">

                                                <a href="#">All</a>

                                            </li>

                                        </ul>

                                    </div>

                                </div>

                                <!-- Items area -->

                                <div class="row text-center services-category" data-categories-filter="all">

                                    <div class="col-md-4 col-sm-6 s123-col-centered">

                                        <div class="service-item s123-box-bottom-primary-border s123-box-flying-up preview-highlighter box-primary" data-unique-id="684ea5e1e15d1">

                                            <span class="fa-stack fa-4x img-circle bgLazyload" role="img" aria-label="Strategic Decision Support" data-bg="https://files.cdn-files-a.com/ready_uploads/media/13585188/400_684b50009ffdf.jpg"></span>

                                            <h4>

                                                <strong>Strategic Decision Support</strong>

                                            </h4>

                                            <p>Providing expert insights to inform critical business strategies and initiatives.</p>

                                        </div>

                                    </div>

                                    <div class="col-md-4 col-sm-6 s123-col-centered">

                                        <div class="service-item s123-box-bottom-primary-border s123-box-flying-up preview-highlighter box-primary" data-unique-id="684ea5e1dfe8b">

                                            <span class="fa-stack fa-4x img-circle bgLazyload" role="img" aria-label="Machine Learning Applications" data-bg="https://images.cdn-files-a.com/ready_uploads/media/9232676/400_637bb2046eb61.jpg"></span>

                                            <h4>

                                                <strong>Machine Learning Applications</strong>

                                            </h4>

                                            <p>Implementing custom machine learning solutions to predict trends and identify opportunities.</p>

                                        </div>

                                    </div>

                                    <div class="col-md-4 col-sm-6 s123-col-centered">

                                        <div class="service-item s123-box-bottom-primary-border s123-box-flying-up preview-highlighter box-primary" data-unique-id="684ea5e1dea89">

                                            <span class="fa-stack fa-4x img-circle bgLazyload" role="img" aria-label="Advanced Data Analytics" data-bg="https://images.cdn-files-a.com/ready_uploads/media/4296870/400_5e70b3147ff36.jpg"></span>

                                            <h4>

                                                <strong>Advanced Data Analytics</strong>

                                            </h4>

                                            <p>Leveraging sophisticated techniques to analyze complex datasets, providing clarity and actionable outcomes.</p>

                                        </div>

                                    </div>

                                </div>

                            </div>

                            <!-- Adds bottom --->

                        </div>

                    </section>

                    <section id="section-684ea5e39cdf3" class="s123-module s123-module-testimonials layout-9  " data-module-id="684ea5e39cdf3" data-module-type-num="5" data-overlay-opacity="true">

                        <div data-aos="fade-up" class="container-fluid page_header_style noBackground">

                            <div class="row">

                                <div class="container moduleTitleContainer">

                                    <div class="row modulesTitle text-center">

                                        <div class="col-xs-12">

                                            <div class="page-header-wrap">

                                                <H2 id="section-684ea5e39cdf3-title" data-original-title="Testimonials" class="s123-page-header  ">Testimonials</H2>

                                                <hr class="small">

                                            </div>

                                            <div class="page-slogan-wrap">

                                                <h4 id="section-684ea5e39cdf3-slogan" class="s123-page-slogan"></h4>

                                            </div>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>

                        <div class="previewManageButton">

                            <a class="p-m-b-design edit" data-module-id="684ea5e39cdf3" data-module-type="5" data-item-unique-id="">

                                <span class="p-m-b-text">Edit</span>

                                <span class="p-m-b-icon">

                                    <i class="svg-m s123-icon-converter " data-icon-name="pencil" style=" mask: url('https://images.cdn-files-a.com/ready_uploads/svg/pencil.svg?v=2'); -webkit-mask: url('https://images.cdn-files-a.com/ready_uploads/svg/pencil.svg?v=2');" data-ie11-classes="" alt="pencil">&nbsp;</i>

                                </span>

                            </a>

                            <a class="p-m-b-design previewManageButtonAiText" data-module-id="684ea5e39cdf3" data-module-type="5">

                                <span>

                                    <i class="svg-m s123-icon-converter " data-icon-name="magic" style=" mask: url('https://images.cdn-files-a.com/ready_uploads/svg/magic.svg?v=2'); -webkit-mask: url('https://images.cdn-files-a.com/ready_uploads/svg/magic.svg?v=2');" data-ie11-classes="" alt="magic">&nbsp;</i>

                                </span>

                            </a>

                            <a class="p-m-b-design design" data-module-id="684ea5e39cdf3" data-module-type="5">

                                <span class="p-m-b-text">Layouts</span>

                                <span class="p-m-b-icon">

                                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="palette" class="svg-inline--fa-light fa-palette fa-w-12" style="width:15px;height:15px;" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">

                                        <path fill="currentColor" d="M204.3 5C104.9 24.4 24.8 104.3 5.2 203.4c-37 187 131.7 326.4 258.8 306.7 41.2-6.4 61.4-54.6 42.5-91.7-23.1-45.4 9.9-98.4 60.9-98.4h79.7c35.8 0 64.8-29.6 64.9-65.3C511.5 97.1 368.1-26.9 204.3 5zM96 320c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32zm32-128c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32zm128-64c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32zm128 64c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32z"></path>

                                    </svg>

                                </span>

                            </a>

                            <a class="p-m-b-design customizeDesign" data-module-id="684ea5e39cdf3" data-module-type="5" data-item-unique-id="">

                                <i class="svg-m s123-icon-converter " data-icon-name="cog" style=" mask: url('https://images.cdn-files-a.com/ready_uploads/svg/cog.svg?v=2'); -webkit-mask: url('https://images.cdn-files-a.com/ready_uploads/svg/cog.svg?v=2');" data-ie11-classes="" alt="cog">&nbsp;</i>

                            </a>

                        </div>

                        <div class="container" data-aos="fade-up">

                            <div class="text-center">

                                <!-- Categories area -->

                                <div class="row" style="display:none;">

                                    <div class="s123-categories col-xs-12">

                                        <ul class="items-categories-container" data-category-layouts="true">

                                            <li data-categories-filter="all">

                                                <a href="#">All</a>

                                            </li>

                                        </ul>

                                    </div>

                                </div>

                            </div>

                            <!-- Items Area -->

                            <div class="row">

                                <div class="col-xs-12 testimonials-category" data-categories-filter="all">

                                    <div data-ride="carousel" class="carousel slide">

                                        <!-- Carousel Slides / Quotes -->

                                        <div class="carousel-inner">

                                            <div class="item active">

                                                <blockquote>

                                                    <div class="row p-h-e-bottom-0 preview-highlighter" data-unique-id="684ea5e3a0f8c">

                                                        <div class="testimonial-image-container">

                                                            <div class="testimonial-image img-circle img-circle-bg bgLazyload" role="img" aria-label="Johnathan D." data-bg="https://images.cdn-files-a.com/ready_uploads/media/104128/400_5ce82ee54972a.jpg" style="background-position:center center;"></div>

                                                        </div>

                                                        <div class="testimonial-quote-container ">

                                                            <div class="testimonial-quote background-primary-color img-circle text-150">

                                                                <i class="svg-m s123-icon-converter " data-icon-name="quote-left" style=" mask: url('https://images.cdn-files-a.com/ready_uploads/svg/quote-left.svg?v=2'); -webkit-mask: url('https://images.cdn-files-a.com/ready_uploads/svg/quote-left.svg?v=2');" data-ie11-classes="" alt="quote-left">&nbsp;</i>

                                                            </div>

                                                        </div>

                                                        <p>Thanks to their insightful analytics, our company has achieved substantial growth. Their expertise in identifying opportunities is unmatched.</p>

                                                        <div class="rating-area text-center">

                                                            <i class="svg-m s123-icon-converter " data-icon-name="star" style=" mask: url('https://images.cdn-files-a.com/ready_uploads/svg/star.svg?v=2'); -webkit-mask: url('https://images.cdn-files-a.com/ready_uploads/svg/star.svg?v=2');" data-ie11-classes="" alt="star">&nbsp;</i>

                                                            <i class="svg-m s123-icon-converter " data-icon-name="star" style=" mask: url('https://images.cdn-files-a.com/ready_uploads/svg/star.svg?v=2'); -webkit-mask: url('https://images.cdn-files-a.com/ready_uploads/svg/star.svg?v=2');" data-ie11-classes="" alt="star">&nbsp;</i>

                                                            <i class="svg-m s123-icon-converter " data-icon-name="star" style=" mask: url('https://images.cdn-files-a.com/ready_uploads/svg/star.svg?v=2'); -webkit-mask: url('https://images.cdn-files-a.com/ready_uploads/svg/star.svg?v=2');" data-ie11-classes="" alt="star">&nbsp;</i>

                                                            <i class="svg-m s123-icon-converter " data-icon-name="star" style=" mask: url('https://images.cdn-files-a.com/ready_uploads/svg/star.svg?v=2'); -webkit-mask: url('https://images.cdn-files-a.com/ready_uploads/svg/star.svg?v=2');" data-ie11-classes="" alt="star">&nbsp;</i>

                                                            <i class="svg-m s123-icon-converter " data-icon-name="star" style=" mask: url('https://images.cdn-files-a.com/ready_uploads/svg/star.svg?v=2'); -webkit-mask: url('https://images.cdn-files-a.com/ready_uploads/svg/star.svg?v=2');" data-ie11-classes="" alt="star">&nbsp;</i>

                                                        </div>

                                                        <div class="testimonial-wrap">

                                                            <div class="testimonial-name primary-color">Johnathan D.</div>

                                                            <div class="testimonial-title">Business Growth Strategist</div>

                                                        </div>

                                                    </div>

                                                </blockquote>

                                            </div>

                                            <div class="item ">

                                                <blockquote>

                                                    <div class="row p-h-e-bottom-0 preview-highlighter" data-unique-id="684ea5e39fb7d">

                                                        <div class="testimonial-image-container">

                                                            <div class="testimonial-image img-circle img-circle-bg bgLazyload" role="img" aria-label="Samantha K." data-bg="https://files.cdn-files-a.com/ready_uploads/media/15481602/400_680afa3f2c504.jpg" style="background-position:center center;"></div>

                                                        </div>

                                                        <div class="testimonial-quote-container ">

                                                            <div class="testimonial-quote background-primary-color img-circle text-150">

                                                                <i class="svg-m s123-icon-converter " data-icon-name="quote-left" style=" mask: url('https://images.cdn-files-a.com/ready_uploads/svg/quote-left.svg?v=2'); -webkit-mask: url('https://images.cdn-files-a.com/ready_uploads/svg/quote-left.svg?v=2');" data-ie11-classes="" alt="quote-left">&nbsp;</i>

                                                            </div>

                                                        </div>

                                                        <p>Their tailored solutions have streamlined our operations and provided deep insights into our industry trends.</p>

                                                        <div class="rating-area text-center">

                                                            <i class="svg-m s123-icon-converter " data-icon-name="star" style=" mask: url('https://images.cdn-files-a.com/ready_uploads/svg/star.svg?v=2'); -webkit-mask: url('https://images.cdn-files-a.com/ready_uploads/svg/star.svg?v=2');" data-ie11-classes="" alt="star">&nbsp;</i>

                                                            <i class="svg-m s123-icon-converter " data-icon-name="star" style=" mask: url('https://images.cdn-files-a.com/ready_uploads/svg/star.svg?v=2'); -webkit-mask: url('https://images.cdn-files-a.com/ready_uploads/svg/star.svg?v=2');" data-ie11-classes="" alt="star">&nbsp;</i>

                                                            <i class="svg-m s123-icon-converter " data-icon-name="star" style=" mask: url('https://images.cdn-files-a.com/ready_uploads/svg/star.svg?v=2'); -webkit-mask: url('https://images.cdn-files-a.com/ready_uploads/svg/star.svg?v=2');" data-ie11-classes="" alt="star">&nbsp;</i>

                                                            <i class="svg-m s123-icon-converter " data-icon-name="star" style=" mask: url('https://images.cdn-files-a.com/ready_uploads/svg/star.svg?v=2'); -webkit-mask: url('https://images.cdn-files-a.com/ready_uploads/svg/star.svg?v=2');" data-ie11-classes="" alt="star">&nbsp;</i>

                                                            <i class="svg-m s123-icon-converter " data-icon-name="star" style=" mask: url('https://images.cdn-files-a.com/ready_uploads/svg/star.svg?v=2'); -webkit-mask: url('https://images.cdn-files-a.com/ready_uploads/svg/star.svg?v=2');" data-ie11-classes="" alt="star">&nbsp;</i>

                                                        </div>

                                                        <div class="testimonial-wrap">

                                                            <div class="testimonial-name primary-color">Samantha K.</div>

                                                            <div class="testimonial-title">Industry Analyst</div>

                                                        </div>

                                                    </div>

                                                </blockquote>

                                            </div>

                                        </div>

                                        <!-- Carousel Buttons Next/Prev -->

                                        <span class="carousel-control left">

                                            <div class="testimonial-chevron left">

                                                <i class="svg-m s123-icon-converter " data-icon-name="chevron-left" style=" mask: url('https://images.cdn-files-a.com/ready_uploads/svg/chevron-left.svg?v=2'); -webkit-mask: url('https://images.cdn-files-a.com/ready_uploads/svg/chevron-left.svg?v=2');" data-ie11-classes="" alt="chevron-left">&nbsp;</i>

                                            </div>

                                        </span>

                                        <span class="carousel-control right">

                                            <div class="testimonial-chevron right">

                                                <i class="svg-m s123-icon-converter " data-icon-name="chevron-right" style=" mask: url('https://images.cdn-files-a.com/ready_uploads/svg/chevron-right.svg?v=2'); -webkit-mask: url('https://images.cdn-files-a.com/ready_uploads/svg/chevron-right.svg?v=2');" data-ie11-classes="" alt="chevron-right">&nbsp;</i>

                                            </div>

                                        </span>

                                    </div>

                                </div>

                            </div>

                            <!-- layout Customize -->

                            <input type="hidden" class="layout-customize" value="{&quot;testimonialsInterval&quot;:10,&quot;hide_section_title&quot;:0}">

                        </div>

                        <!-- /.container -->

                    </section>

                    <section id="section-684ea5e445b50" class="s123-module s123-module-contact layout-9 bg-primary  " data-module-id="684ea5e445b50" data-module-type-num="7" data-overlay-opacity="true">

                        <div data-aos="fade-up" class="container-fluid page_header_style noBackground">

                            <div class="row">

                                <div class="container moduleTitleContainer">

                                    <div class="row modulesTitle text-center">

                                        <div class="col-xs-12">

                                            <div class="page-header-wrap">

                                                <H2 id="section-684ea5e445b50-title" data-original-title="Contact" class="s123-page-header  ">Contact</H2>

                                                <hr class="small">

                                            </div>

                                            <div class="page-slogan-wrap">

                                                <h4 id="section-684ea5e445b50-slogan" class="s123-page-slogan"></h4>

                                            </div>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>

                        <div class="previewManageButton">

                            <a class="p-m-b-design edit" data-module-id="684ea5e445b50" data-module-type="7" data-item-unique-id="">

                                <span class="p-m-b-text">Edit</span>

                                <span class="p-m-b-icon">

                                    <i class="svg-m s123-icon-converter " data-icon-name="pencil" style=" mask: url('https://images.cdn-files-a.com/ready_uploads/svg/pencil.svg?v=2'); -webkit-mask: url('https://images.cdn-files-a.com/ready_uploads/svg/pencil.svg?v=2');" data-ie11-classes="" alt="pencil">&nbsp;</i>

                                </span>

                            </a>

                            <a class="p-m-b-design design" data-module-id="684ea5e445b50" data-module-type="7">

                                <span class="p-m-b-text">Layouts</span>

                                <span class="p-m-b-icon">

                                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="palette" class="svg-inline--fa-light fa-palette fa-w-12" style="width:15px;height:15px;" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">

                                        <path fill="currentColor" d="M204.3 5C104.9 24.4 24.8 104.3 5.2 203.4c-37 187 131.7 326.4 258.8 306.7 41.2-6.4 61.4-54.6 42.5-91.7-23.1-45.4 9.9-98.4 60.9-98.4h79.7c35.8 0 64.8-29.6 64.9-65.3C511.5 97.1 368.1-26.9 204.3 5zM96 320c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32zm32-128c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32zm128-64c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32zm128 64c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32z"></path>

                                    </svg>

                                </span>

                            </a>

                            <a class="p-m-b-design customizeDesign" data-module-id="684ea5e445b50" data-module-type="7" data-item-unique-id="">

                                <i class="svg-m s123-icon-converter " data-icon-name="cog" style=" mask: url('https://images.cdn-files-a.com/ready_uploads/svg/cog.svg?v=2'); -webkit-mask: url('https://images.cdn-files-a.com/ready_uploads/svg/cog.svg?v=2');" data-ie11-classes="" alt="cog">&nbsp;</i>

                            </a>

                        </div>

                        <div class="container" data-aos="fade-up">

                            <div class="contact-wrapper">

                                <div class="s123-module-contact-map">

                                    <div id="contact_685538490db6f" class="map-container" data-src="https://maps-cdn.site123.com/include/globalMapDisplay.php?q=Manhattan%2C+New+York%2C+NY%2C+United+States&z=15&l=en&ilfc="></div>

                                </div>

                                <div class="row box-primary box-text-primary contact-form-container map-active">

                                    <div class="col-md-12 col-sm-12 col-xs-12">

                                        <div class="preview-highlighter contact-details">

                                            <div class="row">

                                                <div class="col-md-8 col-sm-12 col-xs-12">

                                                    <div class="contact-details-email">

                                                        <label class="contact-details-labels">Email</label>

                                                        <br>

                                                        <a href="mailto:example@example.com">

                                                            <i class="svg-m s123-icon-converter  fa-fw" data-icon-name="envelope-o" style=" mask: url('https://images.cdn-files-a.com/ready_uploads/svg/envelope-o.svg?v=2'); -webkit-mask: url('https://images.cdn-files-a.com/ready_uploads/svg/envelope-o.svg?v=2');" data-ie11-classes=" fa-fw" alt="envelope-o">&nbsp;</i>

                                                            example@example.com

                                                        </a>

                                                    </div>

                                                    <div>

                                                        <ul class="list-unstyled contact-as-details-container">

                                                            <label class="contact-details-labels">Contact Info</label>

                                                            <br>

                                                            <li>

                                                                <a href="tel:999-7777-000">

                                                                    <i class="svg-m s123-icon-converter " data-icon-name="phone" style=" mask: url('https://images.cdn-files-a.com/ready_uploads/svg/phone.svg?v=2'); -webkit-mask: url('https://images.cdn-files-a.com/ready_uploads/svg/phone.svg?v=2');" data-ie11-classes="" alt="fa fa-phone">&nbsp;</i>

                                                                    <span dir="ltr">999-7777-000</span>

                                                                </a>

                                                            </li>

                                                        </ul>

                                                    </div>

                                                </div>

                                                <div class="col-md-4 col-sm-12 col-xs-12">

                                                    <!--<div class="col-md-3 col-sm-12 col-xs-12">-->

                                                    <label class="contact-details-labels">Address</label>

                                                    <br>

                                                    <ul class="list-unstyled contact-as-details-container">

                                                        <li>Manhattan, New York, NY, United States</li>

                                                        <li class="open_hours_field">

                                                            <i class="svg-m s123-icon-converter fa-fw" data-icon-name="clock-o" style=" mask: url('https://images.cdn-files-a.com/ready_uploads/svg/clock-o.svg?v=2'); -webkit-mask: url('https://images.cdn-files-a.com/ready_uploads/svg/clock-o.svg?v=2');" data-ie11-classes="fa-fw" alt="clock-o">&nbsp;</i>

                                                            Mon-Fri - 08:00-19:00

                                                        </li>

                                                    </ul>

                                                </div>

                                            </div>

                                        </div>

                                    </div>

                                    <div class="col-md-12 col-xs-12 col-sm-12">

                                        <form class="contactUsForm  preview-highlighter" data-date-format="d/m/Y" data-click-action="">

                                            <div class="row">

                                                <div class="col-md-6 col-sm-12 col-xs-12">

                                                    <div class="form-group">

                                                        <input type="text" name="contact_name" placeholder="Name" class="form-control" required data-msg-required="This field is required.">

                                                    </div>

                                                </div>

                                                <div class="col-md-6 col-sm-12 col-xs-12">

                                                    <div class="form-group">

                                                        <input type="text" name="contact_phone" placeholder="Phone" class="form-control">

                                                    </div>

                                                </div>

                                                <div class="col-md-12 col-sm-12 col-xs-12">

                                                    <div class="form-group">

                                                        <input type="text" name="contact_email" placeholder="Email address" class="form-control s123-force-ltr" required data-msg-required="This field is required." data-rule-email="true" data-msg-email="Please enter a valid email.">

                                                    </div>

                                                </div>

                                                <div class="col-md-12 col-sm-12 col-xs-12">

                                                    <div class="form-group">

                                                        <textarea class="form-control" name="contact_message" placeholder="Message" style="min-height: 100px;"></textarea>

                                                    </div>

                                                </div>

                                                <div class="col-md-12 col-sm-12 col-xs-12">

                                                    <button type="submit" class="btn btn-primary btn-block" aria-label="Contact Us">Contact Us</button>

                                                </div>

                                            </div>

                                            <input type="hidden" name="w" value="10898050">

                                            <input type="hidden" name="websiteID" value="10898050">

                                            <input type="hidden" name="moduleID" value="684ea5e445b50">

                                            <input type="hidden" name="layout" value="9">

                                        </form>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </section>

                </div>

                <footer class="global_footer footer_1">

                    <div class="container">

                        <div class="row footer-layout-1-sides">

                            <div class="side1 col-xs-12 col-sm-6 col-md-6">

                                <div>

                                    <span class="footer_name website-name-preview-helper">DataDive</span>

                                </div>

                                <div>Copyright © 2025 All rights reserved</div>

                                <div class="clearfix upgrade-website-preview-helper">

                                    Powered By <a rel="nofollow" target="_blank" href="https://www.site123.com">SITE123</a>

                                    - <a rel="nofollow" target="_blank" href="https://www.site123.com">Free website maker</a>

                                </div>

                            </div>

                            <div class="side2 col-xs-12 col-sm-6 col-md-6">

                                <ul class="navPages nav navbar-nav">

                                    <li class="moduleMenu active">

                                        <a class="page-scroll homepageMenu" href="#page-top">

                                            <span class="txt-container">Home</span>

                                        </a>

                                    </li>

                                    <li class="moduleMenu" data-menu-module-id="684ea5e1c736d">

                                        <a class="page-scroll" href="#section-684ea5e1c736d">

                                            <span class="txt-container">About</span>

                                        </a>

                                    </li>

                                    <li class="moduleMenu" data-menu-module-id="684ea5e1dd3be">

                                        <a class="page-scroll" href="#section-684ea5e1dd3be">

                                            <span class="txt-container">Services</span>

                                        </a>

                                    </li>

                                    <li class="moduleMenu" data-menu-module-id="684ea5e39cdf3">

                                        <a class="page-scroll" href="#section-684ea5e39cdf3">

                                            <span class="txt-container">Testimonials</span>

                                        </a>

                                    </li>

                                    <li class="moduleMenu" data-menu-module-id="684ea5e445b50">

                                        <a class="page-scroll" href="#section-684ea5e445b50">

                                            <span class="txt-container">Contact</span>

                                        </a>

                                    </li>

                                </ul>

                            </div>

                        </div>

                        <div class="col-xs-12 mobile-mailing-and-social visible-xs"></div>

                    </div>

                </footer>

                <!-- Render Multi Currency Settings Field -->

            </div>

        </div>

        <div>

            <div id="header-phone-content" style="display:none;">

                <div class="popover_phone_icons">

                    <div class="global-contact-details-container text-center" data-type="phone">

                        <ul class="list-unstyled">

                            <li>

                                <a href="tel:999-7777-000">

                                    <i class="svg-m s123-icon-converter " data-icon-name="phone" style=" mask: url('https://images.cdn-files-a.com/ready_uploads/svg/phone.svg?v=2'); -webkit-mask: url('https://images.cdn-files-a.com/ready_uploads/svg/phone.svg?v=2');" data-ie11-classes="" alt="fa fa-phone">&nbsp;</i>

                                    <span dir="ltr">999-7777-000</span>

                                </a>

                            </li>

                        </ul>

                    </div>

                </div>

                <input type="hidden" id="multiPhonesSettings" value="[{&quot;number&quot;:&quot;999-7777-000&quot;,&quot;note&quot;:&quot;&quot;,&quot;type&quot;:&quot;1&quot;}]">

            </div>

            <div id="header-email-content" style="display:none;">

                <div class="popover_email_icons">

                    <div class="global-contact-details-container text-center" data-type="email">

                        <ul class="list-unstyled">

                            <li>

                                <a href="mailto:example@example.com">

                                    <i class="svg-m s123-icon-converter  fa-fw" data-icon-name="envelope" style=" mask: url('https://images.cdn-files-a.com/ready_uploads/svg/envelope.svg?v=2'); -webkit-mask: url('https://images.cdn-files-a.com/ready_uploads/svg/envelope.svg?v=2');" data-ie11-classes=" fa-fw" alt="envelope">&nbsp;</i>

                                    &nbsp;<span dir="ltr">example@example.com</span>

                                </a>

                            </li>

                        </ul>

                    </div>

                </div>

            </div>

            <input type="hidden" id="globalContactEmailSettings" value="{&quot;contact_email&quot;:&quot;example@example.com&quot;,&quot;useCustomForm&quot;:&quot;&quot;,&quot;custom_form_html&quot;:&quot;&quot;}">

        </div>

        <div id="showSmallAdOnScroll" class="upgrade-website-preview-helper style2 static">

            <a rel="nofollow" target="_blank" href="https://www.site123.com/?utm_source=user-website&utm_medium=powered-by-ad-en&utm_content=all&utm_campaign=all">

                <span class="s123-b-b-s-1">I BUILT MY SITE FOR FREE USING</span>

                <img src="https://cdn-cms-s-8-4.f-static.net/manager/websites/site123_website/files/logos/brand_files_2020/Logo/Horizontal/PNG/Horizontal_Black.png?v=y84124357" style="height:21px;width:auto;vertical-align:middle;">

                &nbsp;&nbsp;&nbsp;<span class="site123link hidden-xs">CREATE YOUR WEBSITE</span>

            </a>

            <a class="s123-ads-banner-abuse-link" rel="nofollow">

                <span class="site123link hidden-xs" style="border: 0;font-size: 9px;">Report Abuse</span>

            </a>

        </div>

        <a id="gotoTop" class="gotoTop page-scroll" style="display: none;" href="#page-top">

            <i class="svg-m s123-icon-converter " data-icon-name="angle-up" style=" mask: url('https://images.cdn-files-a.com/ready_uploads/svg/angle-up.svg?v=2'); -webkit-mask: url('https://images.cdn-files-a.com/ready_uploads/svg/angle-up.svg?v=2');" data-ie11-classes="" alt="angle-up">&nbsp;</i>

        </a>

        <input type="hidden" id="layoutNUM" name="layoutNUM" value="1">

        <input type="hidden" id="footer_layout" name="footer_layout" value="1">

        <input type="hidden" id="layoutMenuPositionTXT" name="layoutMenuPositionTXT" value="top">

        <input type="hidden" id="versionNUM" name="versionNUM" value="2">

        <input type="hidden" id="w" name="w" value="10898050">

        <input type="hidden" id="websiteID" value="10898050">

        <input type="hidden" id="website_uniqueID" value="684ea5dbe90e9-684ea5dbe90ea-684ea5dbe90eb">

        <input type="hidden" id="enable_as_theme" value="0">

        <input type="hidden" id="onepage" value="1">

        <input type="hidden" id="pjaxSupported" value="1">

        <input type="hidden" id="moduleTypeNUM" class="s123-js-pjax" name="moduleTypeNUM" value="">

        <input type="hidden" id="hasEcommerce" value="0">

        <input type="hidden" id="currentWebsiteDomain" value="app.site123.com">

        <input type="hidden" id="isWhiteLabelSubDomainBOO" value="0">

        <input type="hidden" id="pageUniqueID" class="s123-js-pjax" name="pageUniqueID" value="">

        <script>

            var menuScrollOffset = 70;

            var packageNUM = 1;

            var domain = '684ea5dc1543b.site123.me';

            var languageCode = 'en';

            var multiLanCode = '';

            var globalLanguageChildLan = '';

            var websiteLanguageCode = '';

            var websiteLanguageCountryCode = '';

            var websiteLanguageCountryFullCode = '';

            var IsManagment = '2';

            var isMinimize = 1;

            var footerCustomTextJson = {

                "mailingList": {

                    "placeHolder": "Email Address",

                    "button": "Subscribe"

                },

                "cookieConsent": {

                    "text": "This website uses cookies to ensure you get the best experience on our website",

                    "button": "Got it!"

                },

                "privacy": {

                    "title": "Privacy"

                },

                "terms": {

                    "title": "Terms"

                },

                "accessibility": {

                    "title": "Accessibility"

                }

            };

            var websiteCustomSearchPlaceHolder = "Enter your query";

            var viewModeTXT = "";

            var $GLOBALS = {

                'cdn-user-files': 'https://files.cdn-files-a.com',

                'cdn-user-videos-files': 'https://cdn-media.f-static.net',

                'maps-display-domain': 'https://maps-cdn.site123.com',

                'cdn-interface-files': 'https://static.s123-cdn-network-a.com',

                'cdn-system-files': 'https://cdn-cms-s-8-4.f-static.net',

                'cdn-images-files': 'https://images.cdn-files-a.com',

                'v-cache': 'y84124357',

                'is_local_server': false,

                'is_testing_server': false,

                't_direction': "ltr",

                'cdn-user-videos-files': "https:\/\/cdn-media.f-static.net"

            };

            var $s_whitelabel = {

                'domain': 'site123.com'

            };

            var longFreeCustomer = false;

        </script>

        <script src="https://cdn-cms-s-8-4.f-static.net/manager/translation_JS/website_jsTranslations.js?l=en&a=2&v=y84124357" crossorigin="anonymous"></script>

        <!-- CSS Minimize Bottom -->

        <link rel="stylesheet" class="defer-css" data-href="https://cdn-cms-s-8-4.f-static.net/versions/2/system_mini/css/minimize-bottom.css?v=y84124357" type="text/css" crossorigin="anonymous">

        <!-- Minimize JS files -->

        <script src="https://cdn-cms-s-8-4.f-static.net/versions/2/system_mini/js/minimize_p1.js?v=y84124357" crossorigin="anonymous"></script>

        <script src="https://cdn-cms-s-8-4.f-static.net/versions/2/system_mini/js/minimize_p2.js?v=y84124357" crossorigin="anonymous"></script>

        <script src="https://cdn-cms-s-8-4.f-static.net/versions/2/system_mini/js/minimize_p3.js?v=y84124357" crossorigin="anonymous"></script>

        <script src="https://cdn-cms-s-8-4.f-static.net/versions/2/system_mini/js/minimize_p4.js?v=y84124357" crossorigin="anonymous"></script>

        <script src="https://cdn-cms-s-8-4.f-static.net/versions/2/system_mini/js/minimize_s_modules.js?v=y84124357" crossorigin="anonymous"></script>

        <script src="https://cdn-cms-s-8-4.f-static.net/versions/2/system_mini/js/minimize_SiteEditor_preview_helpers.js?v=y84124357" crossorigin="anonymous"></script>

        <script src="https://cdn-cms-s-8-4.f-static.net/versions/2/system_mini/js/minimize_scripts.js?v=y84124357" crossorigin="anonymous"></script>

        <script src="https://cdn-cms-s-8-4.f-static.net/versions/2/system_mini/js/minimizeFroalaAdmin.js?v=y84124357" crossorigin="anonymous"></script>

        <!-- Headers / Homepage Custom Froala Button -->

        <script>

            /**

	 * Main Color - Add a clean HTML button custom button.

	 * Source: https://www.froala.com/wysiwyg-editor/docs/examples/custom-buttons

	 */

            FroalaEditor.DefineIcon('mainColor', {

                NAME: 'paint-brush',

                template: 'font_awesome'

            });

            FroalaEditor.RegisterCommand('mainColor', {

                title: "Main Color",

                focus: false,

                undo: true,

                refreshAfterCallback: true,

                callback: function(buttonName, selectedOption) {

                    /**

			 * check if the content is fully selected and if yes we need to handle it by replacing the full html

			 * because insert method is creating new line

			 */

                    const isAllContentSelected = $(`<div>${this.html.get()}</div>`).text() == this.selection.text();

                    // get selected text

                    const selectedText = this.html.getSelected();

                    // get clean text without any main color html tags

                    const cleanText = selectedText.replace(/<span class="mainWebsiteColor">([\s\S]*?)<\/span>/g, '$1');

                    // the content is fully selected so we handle it by replacing all of the html

                    if (isAllContentSelected) {

                        // wrap text with main color

                        if (!selectedText.match(/<span class="mainWebsiteColor">([\s\S]*?)<\/span>/g)) {

                            this.html.set(`<span class="mainWebsiteColor">${cleanText}</span>`);

                            // unwrap text with main color

                        } else {

                            this.html.set(cleanText);

                        }

                        // remove the selection

                        this.selection.clear();

                    } else {

                        // wrap text with main color

                        if (!selectedText.match(/<span class="mainWebsiteColor">([\s\S]*?)<\/span>/g)) {

                            this.html.insert(`<span class="mainWebsiteColor">${cleanText}</span>`, true);

                            // unwrap text with main color

                        } else {

                            this.html.insert(cleanText, true);

                        }

                    }

                },

                refresh: function($btn) {

                    // set button as active

                    if (this.html.getSelected().match(/<span class="mainWebsiteColor">([\s\S]*?)<\/span>/g)) {

                        $btn.addClass('fr-active');

                        // set button as inactive

                    } else {

                        $btn.removeClass('fr-active');

                    }

                }

            });

            /**

	 * Under Line SVG Design - Add a clean HTML button custom button.

	 * Source: https://www.froala.com/wysiwyg-editor/docs/examples/custom-buttons

	 */

            FroalaEditor.DefineIconTemplate('wave_pulse_fa', '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><!--! Font Awesome Pro 6.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M319.1 0c14.8-.4 27.9 9.3 31.8 23.6l74 271.2 17.7-35.4c10.8-21.7 33-35.4 57.2-35.4H608c17.7 0 32 14.3 32 32s-14.3 32-32 32H499.8L444.6 398.3c-5.9 11.9-18.6 18.8-31.8 17.5s-24.2-10.6-27.7-23.4L323.7 167.3 255.3 486.7c-3.1 14.4-15.5 24.8-30.2 25.3s-27.8-9.1-31.8-23.2L135.9 288H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H135.9c28.6 0 53.7 18.9 61.5 46.4L219.6 348 288.7 25.3C291.8 10.9 304.4 .4 319.1 0z"/></svg>');

            FroalaEditor.DefineIcon('underLineSVGStyle1', {

                template: 'wave_pulse_fa'/* use the custom template of the icon */

            });

            FroalaEditor.RegisterCommand('underLineSVGStyle1', {

                title: "Colored Underline",

                focus: false,

                undo: true,

                refreshAfterCallback: true,

                callback: function(buttonName, selectedOption) {

                    /**

			 * check if the content is fully selected and if yes we need to handle it by replacing the full html

			 * because insert method is creating new line

			 */

                    const isAllContentSelected = $(`<div>${this.html.get()}</div>`).text() == this.selection.text();

                    // get selected text

                    const selectedText = this.html.getSelected();

                    // get clean text without any html tags

                    const cleanText = selectedText.replace(/<span class="svg-underline" data-style=".*([0-9]+)">([\s\S]*?)<\/span>/g, '$2');

                    // the content is fully selected so we handle it by replacing all of the html

                    if (isAllContentSelected) {

                        // wrap text with under line html element

                        if (!selectedText.match(/<span class="svg-underline" data-style=".*([0-9]+)">([\s\S]*?)<\/span>/g)) {

                            this.html.set(`<span class="svg-underline" data-style="1">${cleanText}</span>`);

                            // unwrap text with under line html element

                        } else {

                            this.html.set(cleanText);

                        }

                        // remove the selection

                        this.selection.clear();

                    } else {

                        // wrap text with under line html element

                        if (!selectedText.match(/<span class="svg-underline" data-style=".*([0-9]+)">([\s\S]*?)<\/span>/g)) {

                            this.html.insert(`<span class="svg-underline" data-style="1">${cleanText}</span>`, true);

                            // unwrap text with under line html element

                        } else {

                            this.html.insert(cleanText, true);

                        }

                    }

                },

                refresh: function($btn) {

                    // set button as active

                    if (this.html.getSelected().match(/<span class="svg-underline" data-style=".*([0-9]+)">([\s\S]*?)<\/span>/g)) {

                        $btn.addClass('fr-active');

                        // set button as inactive

                    } else {

                        $btn.removeClass('fr-active');

                    }

                }

            });

        </script>

        <!-- Scripts -->

        <script>

            //Run when the page load (before images and other resource)

            jQuery(function($) {



                /**

		 * Add a cleat HTML button custom button.

		 * Source: https://www.froala.com/wysiwyg-editor/docs/examples/custom-buttons

		 */

                FroalaEditor.DefineIcon('clear', {

                    NAME: 'remove',

                    SVG_KEY: 'remove'

                });

                FroalaEditor.RegisterCommand('clear', {

                    title: 'Clear HTML',

                    focus: false,

                    undo: true,

                    refreshAfterCallback: true,

                    callback: function() {

                        this.html.set('');

                        this.events.focus();

                    }

                });



                // Define a custom separator

                FroalaEditor.DefineIcon('fr_separator', {

                    NAME: 'minus',

                    SVG_KEY: 'vertical'

                });

                FroalaEditor.RegisterCommand('fr_separator', {

                    title: 'fr_separator',

                    focus: false,

                    undo: false,

                    refreshAfterCallback: false

                });



                // Tell preview helpers inline editors that the dependence are loaded and they can convert

                $(document).trigger('froala_commands_preview_helpers.registered');

            });

        </script>

        <!-- Scripts -->

        <!-- Floating Magic Button Update Preview Helper -->

        <div>

            <div class="magic-button-container">

                <!-- Contact Magic Button Settings-->

                <input type="hidden" id="magicButtonSettings" value="{&quot;active&quot;:false,&quot;style&quot;:&quot;mainColor&quot;,&quot;items&quot;:{},&quot;greeter&quot;:{&quot;active&quot;:false,&quot;value&quot;:&quot;&quot;},&quot;mobileFullWidth&quot;:false,&quot;siteLogo&quot;:&quot;&quot;,&quot;siteName&quot;:&quot;DataDive&quot;}">

                <!-- Share Magic Button Settings -->

                <input type="hidden" id="shareMagicButtonSettings" value="{&quot;active&quot;:false,&quot;items&quot;:{&quot;faceBook&quot;:{&quot;order&quot;:1,&quot;value&quot;:&quot;&quot;}},&quot;siteLogo&quot;:&quot;&quot;,&quot;siteName&quot;:&quot;DataDive&quot;}">

                <!-- All Magic Buttons -->

                <div class="all-magic-buttons" data-is-managment="2"></div>

            </div>

        </div>

        <script src="https://cdn-cms-s-8-4.f-static.net/files/vendor/magic-button/front/js/magic-button-min.js?v=y84124357" crossorigin="anonymous" defer></script>

        <!-- Pjax Helper -->

        <div class="s123-front-last-element hidden"></div>

        <!-- product review page scripts -->

    </body>

</html>

