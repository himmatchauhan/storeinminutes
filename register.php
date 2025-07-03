<?php
require_once 'config.php';

if (isset($_SESSION['email'])) {
    echo "<h3>Welcome, {$_SESSION['name']}</h3>";
    echo "<p>Email: {$_SESSION['email']}</p>";
    echo "<img src='{$_SESSION['picture']}' width='100'><br><br>";
    echo "<a href='logout.php'>Logout</a>";
    exit();
}

$login_url = $client->createAuthUrl();
//echo $login_url; exit;

?>

<script>
    const googleLoginURL = <?= json_encode($login_url) ?>;
</script>

<!DOCTYPE html>
<html lang="en" >
    <head>
        
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
        <meta charset="utf-8" />

        <link rel="dns-prefetch preconnect" href="https://cdn-cms-s-8-4.f-static.net/" crossorigin="anonymous"/>
        <link rel="dns-prefetch preconnect" href="https://cdn-cms.f-static.com/" crossorigin="anonymous"/>
        <link rel="dns-prefetch preconnect" href="https://fonts.googleapis.com/" crossorigin="anonymous"/>
        <link rel="dns-prefetch preconnect" href="https://fonts.gstatic.com/" crossorigin="anonymous"/>

        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />

        <link rel="shortcut icon" href="https://cdn-cms-s-8-4.f-static.net/manager/websites/site123_website/files/logos/brand_files_2020/Icons/Png/Icon_blue.png?v=n84124382" type="image/x-icon">
        <link rel="icon" href="https://cdn-cms-s-8-4.f-static.net/manager/websites/site123_website/files/logos/brand_files_2020/Icons/Png/Icon_blue.png?v=n84124382" type="image/x-icon">

        <!-- ace scripts -->
        <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet"><link rel="stylesheet" href="https://cdn-cms-s-8-4.f-static.net/versions/2/system_mini/css/minimizeAdmin.css?v=n84124382" type="text/css" crossorigin="anonymous"><style>:root {
--primary_color: #0583F2;
--primary_light_color: #cfe2ff;
--editorTextColor: #010B40;
--primaryTextColor: #fff;
--editorEditBox: #fff;
--editorEditBoxTitleColor: #010B40;
--editorTabsBgColor: #242b2f;
--pricingPageMainColor: #f39405;
--upgrade: #02B22B;
}
#main-interface-header {
background-color: #141A1B;
}
#main-interface-header .ace-nav > li > a {
color: #ffffff;
}
.brad-arrow i {
color: #ffffff;
}
#main-interface-header #user_addnew_menu > div > button,
#main-interface-header #user_profile_menu > div > a {
background-color: #ffffff !important;
border-color: #ffffff !important;
color: #141A1B !important;
}
#main-interface-header #user_addnew_menu > div > button:hover,
#main-interface-header #user_profile_menu > div > a:hover {
background-color: #ccc !important;
}
</style>

        <style>
            .menuHeader .row {
                padding: 10px;
                display: flex;
                align-items: center;
                align-content: center;
                justify-content: center;
            }
            @media (max-width: 767px) {
                .menuHeader .logo {
                    height: 40px !important;
                }
            }

            .light-login .widget-box {
                border: 0 !important;
            }

            .menuFooter .row {
                background-color: transparent;
                padding: 10px;
                border-top: 1px solid #e6e6e6;
                display: flex;
                align-items: center;
                align-content: center;
                justify-content: center;
                margin-top: 100px;
            }
            a.facebookLogin , a.googleLogin {
                cursor: pointer;
            }
            a.facebookLogin:hover , a.googleLogin:hover {
                text-decoration: none !important;
            }
            .socialLoginBun {
                width:300px;
                white-space: nowrap;
                border:1px solid #4285f4;
                margin: 10px auto;
                border-radius:4px;
                box-shadow: 1px 2px 3px #ccc;
                display: flex;
                align-items: center;
                align-content: center;
                justify-content: center;
            }
            .socialLoginBun .left {
                background-color: #fff;
            }
            .socialLoginBun .left > div {
                display: flex;
                align-items: center;
                align-content: center;
                justify-content: center;
            }
            .socialLoginBun .right {
                padding:10px;
                background-color:#4285f4;
                color:white;
            }
            /* Facebook button */
            a.facebookLogin .socialLoginBun {
                border:1px solid #4264b2;
            }
            a.facebookLogin .socialLoginBun i {
                color:#4264b2;
            }
            a.facebookLogin .socialLoginBun .right {
                background-color:#4264b2;
            }
            
            /* Google button */
            a.googleLogin .socialLoginBun {
                border:1px solid #ea4335;
            }
            a.googleLogin .socialLoginBun i {
                color:#ea4335;
            }
            a.googleLogin .socialLoginBun .right {
                background-color:#ea4335;
            }
        </style>
    <title>Sign Up - Storeinminutes</title>
    <meta name="description" content="Sign up and create your account with us" />

    <meta http-equiv="content-language" content="en"/>

    <link rel="alternate" hreflang="en" href="https://app.site123.com/manager/login/sign_up.php?l=en"/>
    <link rel="alternate" hreflang="pt" href="https://app.site123.com/manager/login/sign_up.php?l=pt"/>
    <link rel="alternate" hreflang="fr" href="https://app.site123.com/manager/login/sign_up.php?l=fr"/>
    <link rel="alternate" hreflang="de" href="https://app.site123.com/manager/login/sign_up.php?l=de"/>
    <link rel="alternate" hreflang="it" href="https://app.site123.com/manager/login/sign_up.php?l=it"/>
    <link rel="alternate" hreflang="pl" href="https://app.site123.com/manager/login/sign_up.php?l=pl"/>
    <link rel="alternate" hreflang="es" href="https://app.site123.com/manager/login/sign_up.php?l=es"/>
    <link rel="alternate" hreflang="ja" href="https://app.site123.com/manager/login/sign_up.php?l=jp"/>
    <link rel="alternate" hreflang="ko" href="https://app.site123.com/manager/login/sign_up.php?l=ko"/>
    <link rel="alternate" hreflang="tr" href="https://app.site123.com/manager/login/sign_up.php?l=tr"/>
    <link rel="alternate" hreflang="ru" href="https://app.site123.com/manager/login/sign_up.php?l=ru"/>
    <link rel="alternate" hreflang="uk" href="https://app.site123.com/manager/login/sign_up.php?l=ua"/>
    <link rel="alternate" hreflang="hi" href="https://app.site123.com/manager/login/sign_up.php?l=hi"/>
    <link rel="alternate" hreflang="ar" href="https://app.site123.com/manager/login/sign_up.php?l=ar"/>
    <link rel="alternate" hreflang="he" href="https://app.site123.com/manager/login/sign_up.php?l=he"/>
    <link rel="alternate" hreflang="id" href="https://app.site123.com/manager/login/sign_up.php?l=id"/>
    <link rel="alternate" hreflang="x-default" href="https://app.site123.com/manager/login/sign_up.php?l=en"/>

    <link rel="canonical" href="https://app.site123.com/manager/login/sign_up.php?l=en" />

    <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">

	<META NAME="ROBOTS" CONTENT="NOINDEX">

    <link rel="stylesheet" href="https://cdn-cms-s-8-4.f-static.net/manager/login/admin/assets/js/select2/select2.min.css?v=n84124382" crossorigin="anonymous">
<style>

    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&family=Roboto:wght@400;700&display=swap');

    body {
        /*no page scroll*/
        overflow: hidden;
    }

    .login-container {
        width: auto;
        max-width: 100%;
    }

    div#MainCatList > div {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .input-icon > .ace-icon {
        display: flex;
        align-items: center;
    }

    div.wizardSteps {
        margin: auto;
        display: flex;
    }

    .site123 {
        width:auto;
        height:40px;
        position: absolute;
        right:20px;
        top:20px;
    }

    .yesButton {
        background-color: #ffffff !important;
        border-color: #ffffff !important;
        color: black !important;
    }

    .form-group + .error {
        color: red;
    }

    /* Mobile & Tablet
    ----------------------------------*/
    @media(max-width:550px) {
        .site123 {
            display: none;
        }
    }

    .actionButton {
        margin: 40px;
        padding: 15px 50px;
        border-radius: 6px;
        font-size: 20px;
        letter-spacing: 2px;
        margin-bottom: 10px;
    }
    .actionButtonSmall {
        margin:10px;
        padding:10px 25px;
        border-radius: 6px;
    }

    .templates {
        margin-top: 40px;
        margin-bottom: 40px;
    }
    h2 {
        font-size: 40px;
    }
    .templates .screenshot {
        margin-top: 40px;
    }
    .templates .screenshot a {
        display: flex;
        padding-bottom: 20px;
    }
    .templates .screenshot img {
        width:auto;
        height:180px;
        border: 1px solid #ccc;
        max-width: 95%;
    }
    .signup-error-msg a {
        margin-top:  5px;
    }
</style>
<link rel="stylesheet" href="https://cdn-cms-s-8-4.f-static.net/files/frameworks/intl-tel-input-8.5.2/build/css/intlTelInput.css?v=n84124382" crossorigin="anonymous">
<link rel="stylesheet" href="https://cdn-cms-s-8-4.f-static.net/files/vendor/site123/autocompleteInput/css/autocompleteInput.css?v=n84124382" crossorigin="anonymous">
<style>
    .intl-tel-input {
        width:100%;
    }
    .chosen-single div b:before,
    .chosen-container-single .chosen-search:after {
        font-family: 'Font Awesome 5 Light';
    }
</style>
<style>
    .landing_templateBigImage {
        opacity: 0.5;
        filter: none;
    }

    .modal.s123-modal .modal-header {
        background-color: #f3a921;
    }

    #quickOpen .modal-content {
        background-color: #fff;
        border:2px solid #ccc;
    }

    #quickOpen .modal-body {
        background-color: #fff !important;
    }

    #quickOpen .modal-body .close {
        font-size: 35px;
        opacity: 0.3;
    }

    #chooseCatBox {
        width:100%;
    }
    #chooseCatBox.blur {
        filter: blur(3px);
    }
    #chooseCatBox .closeIcon {
        display: none;
    }


    .closeIcon {
        position: absolute;
        top: 20px;
        right: 20px;
        font-size: 35px;
        color: black;
        cursor: pointer;
        width: 50px;
        height: 50px;
        z-index: 9999999999;
    }
    html[dir=rtl] .closeIcon {
        right:auto;
        left:20px;
    }
    /* Mobile & Tablet
    ----------------------------------*/
    @media(max-width:800px) {
        .closeIcon {
            top: 5px;
            right: 10px;
        }
        html[dir=rtl] .closeIcon {
            right:auto;
            left:10px;
        }
    }

    .wizardMainBackButton {
        font-size: 35px;
        color: black;
        cursor: pointer;
        width: 50px;
        height: 50px;
    }
    #site123Logo {
        position: absolute;
        left: 20px;
        top: 20px;
        z-index: 9999999999;
    }
    html[dir=rtl] #site123Logo {
        left:auto;
        right:20px;
    }
    /* Mobile & Tablet
    ----------------------------------*/
    @media(max-width:800px) {
        .wizardMainBackButton {
            top: 5px;
            right: auto;
            left: 10px;
        }
        html[dir=rtl] .wizardMainBackButton {
            left:auto;
            right:10px;
        }
        #site123Logo {
            display: none;
        }
    }

    .socialLoginBun {
        width: 200px;
        background-color: #fff;
        border-radius: 0;
    }


    .questionHeader.title {
        font-size: 45px;
        letter-spacing: 1px;
        display: flex;
        justify-content: center;
    }
    @media(max-width:500px) {
        .questionHeader.title {
            font-size: 25px;
        }
    }
    .questionHeader.sub_title {
        font-size: 25px;
        letter-spacing: 1px;
        display: flex;
        justify-content: center;
    }
    @media(max-width:500px) {
        .questionHeader.sub_title {
            font-size: 15px;
        }
    }
    .step2 div.wizardSteps {
        width: 500px;
        max-width: 100%;
    }

    .progressSteps {
        display: flex;
        align-items: center;
        align-content: center;
        justify-content: center;
        margin-bottom: 7px;
    }
    .progressSteps > div {
        padding: 6px 15px;
        border: 1px solid rgb(229, 231, 235);
        background-color: #fff;
        color:black;
    }
    .progressSteps > div.link {
        cursor: pointer;
        color: #32c886;
    }
    .progressSteps > div.active {
        background-color: var(--primary_color);
        color:white;
    }
    .progressSteps .disableStep {
        cursor: no-drop;
    }




    #smallPopupExitEntent {
        display: none;
        position: fixed;
        bottom: 20px;
        left: 20px;
        width: 300px;
        background-color: #000;
        color:white;
        border-left: 0;
        padding: 20px;
        font-size: 15px;
        text-align: center;
        z-index: 501;
        border-radius: 5px;
        box-shadow: 0 0 0 1px rgba(0,0,0,0.1);
    }
    html[dir=rtl] #smallPopupExitEntent {
        left: auto;
        right:20px;
    }


    #MainCatList {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
    }
    #MainCatList .well {
        cursor: pointer;
        display: flex;
        align-items: center;
        align-content: center;
        flex-direction: row;
        width: 100%;
        max-width: 100%;
        padding: 5px 10px;
        background-color: var(--veryLightGray);
    }
    #MainCatList .well span {
        text-align: center;
        font-size: 20px;
        padding-left: 21px;
    }
    html[dir=rtl] #MainCatList .well span {
        padding-left: 0;
        padding-right: 21px;
    }
    #MainCatList .well .fa-4x {
        font-size: 20px;
        padding: 0 20px;
    }

    /* Remove the margin-bottom of the last element */
    div#MainCatList > div:last-child .well {
        margin-bottom: 0;
    }

    .chosen-single div b:before, .chosen-container-single .chosen-search:after {
        display: none;
    }
    .widget-footer-actions {
        width: 100%;
        align-items: center;
        justify-content: space-between;
        display: flex;
    }

    /* Business Type Design Fix
    ------------------*/
    .select2-search:after {
        content: '';
    }
    .select2-container--default .select2-selection--single .select2-selection__rendered {
        line-height: inherit;
    }
    .select2-container--default .select2-selection--single .select2-selection__arrow {
        height: 100%;
        top: 0;
    }
    .select2-container .select2-selection--single {
        height: auto;
        border: none;
    }
    html[dir="rtl"] .select2-container--default .select2-results>.select2-results__options {
        margin: 0;
    }

    .boxTitle {
        font-size: 30px;
        font-weight: bold;
        text-align: center;
    }

    .card-clean {
        width:500px;
        max-width: 100%;
        margin: auto;
    }
    .imageIcon {
        width: 120px;
        height: 120px;
    }
    /* If it's mobile change to 80px */
    @media(max-width:500px) {
        .imageIcon {
            width: 80px;
            height: 80px;
        }
    }
    /*
    Fix some issues with small height of the screens:
        - if the screen height is less than 650px make smaller icons

    */
    @media(max-height:650px) {
        .card-clean .card-clean-body {
            padding:30px;
        }
        .form-group {
            margin-bottom: 8px;
        }
        .imageIcon {
            width: 80px;
            height: 80px;
        }
        .input-lg {
            font-size:16px;
        }
        input.input-lg {
            font-size: 16px;
            height: 40px;
        }
        input[type="text"] {
            padding: 9px 10px;
        }
        textarea {
            height: 100px !important;
        }
    }

    /* Show Password Icon Bug Fix Fix - The structure is different here
    so we need to manupulate a little the css
    ---------------*/
    .password-container {
        position: relative;
    }
    .password-container .show-password-toggle {
        right: 12px;
        height: 60%;
        transform: translateY(68%);
    }
    html[dir="rtl"] .show-password-toggle {
        left: 12px;
        right: auto;
    }

    .sides {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        width: 100%;
        height: 100vh;
    }
    .side1 {
        width: 30%;
        height: 100vh;
        background-color: var(--primary_color);
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }
    .side1 h1 {
        color: #fff;
        font-size: 60px;
        line-height: 1.3;
        font-weight: 700;
        text-align: center;
        max-width: 80%;
        font-family: 'Roboto', sans-serif;
    }
    /* If it's small screen width we lower the font size */
    @media(max-width:1600px) {
        .side1 h1 {
            font-size: 50px;
        }
    }
    @media(max-width:1300px) {
        .side1 h1 {
            font-size: 40px;
        }
    }
    @media(max-width:1200px) {
        .side1 h1 {
            font-size: 30px;
        }
    }
    .side2 {
        width: 70%;
        height: 100vh;
        background-color: transparent;
        padding: 20px;
        /* add scroll */
        overflow-y: auto;
    }
    .grecaptcha-badge {
        display: none;
    }
    @media(max-width:1200px) {
        .side1 {
            display: none;
        }
        .side2 {
            width: 100%;
			padding: 0;
        }
        #site123Logo {
            display: none;
        }
    }

    .wrapGrid {
        display:flex;
        gap: 50px;
        margin: auto;
    }
    /*mobile device */
    @media (max-width: 767px) {
        .wrapGrid {
            flex-direction: column;
            gap: 25px;
        }
        .wrapGrid .leftSide {
            order: 2;
        }
        .wrapGrid .rightSide {
            order: 1;
        }
    }
</style>

</head>

<body class="light-login  templatesPage" data-user-language="en" data-land="ai_landing_page">

    <div class="sides">

<div class="side1">
    <h1>Build Your Website in Three Easy Steps</h1>
</div>

<div class="side2">
    <H1 style="display:none;">Sign Up - Storeinminutes</H1>
    <div id="chooseCatBox" class="container">
        <div id="site123Logo">
                    <img class="logo" src="" style="height:50px;width:auto;max-width: 100%;" alt="Logo - Storeinminutes" />
            </div>
        <a class="closeIcon" title="Close Editor"><i class="fal fa-times"></i></a>
    <div>
        <div class="">
            <div class="login-container">
                                <div class="position-relative">
                    <div id="wizard-box">
                                                    <form method="post" action="/manager/login/sign_up.php" id="sign-up-form" target="_top">
                                                    <div class="space-6"></div>
                            <div class="step1 wizardStepsBox" >
                                <div class="mb-5 progressSteps" >
                                    <div class="active">Step 1</div>
                                    <div class="disableStep">Step 2</div>
                                    <div class="disableStep">Step 3</div>
                                </div>
                                <div class="row">
                                    <div class="col-xs-12">
                
                                        <div class="card-clean card-clean-grid">
                                            <div class="card-clean-body">
                                                <h4 class="card-clean-title">Choose website type</h4>

                                                <div id="MainCatList" class="" style="display:none;margin-top: 25px;"></div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div class="step2 wizardStepsBox row"  style="display: none;">
                                <div class="col-xs-12">
                                    <div class="progressSteps" >
                                        <div class="backToStep1 link"><i class="fal fa-check"></i> Step 1</div>
                                        <div class="active">Step 2</div>
                                        <div class="disableStep">Step 3</div>
                                    </div>
                                    <div class="wizardSteps">
                                        <div class="col-xs-12">
                    
                                            <div class="card-clean card-clean-grid">
                                                <div class="card-clean-body">
                                                    <h4 class="card-clean-title">Tell us more about your website</h4>

                                                    <div class="form-group">
                                                        <label for="businessType">Website Category</label>
                                                        <input type="text" class="input-lg form-control" id="businessType" value="" placeholder="Car Rental, Tennis club..." name="businessType">
                                                    </div>
                                                    <div class="form-group">
                                                        <label for="websiteName">Website Name</label>
                                                        <input data-hj-whitelist type="text" class="form-control input-lg" id="websiteName" name="websiteName" value="" placeholder="e.g., Jeff's Coffee, Mary's Flower Shop" maxlength="50">
                                                    </div>
                                                    <div class="form-group">
                                                        <label for="websiteDescription">Website Description (Optional)</label>
                                                        <textarea class="form-control input-lg" id="websiteDescription" name="websiteDescription" placeholder="Tell us about your business" style="height:150px;" maxlength="2000"></textarea>
                                                    </div>
                                                    <div class="form-group">
                                                        <b>Not Sure?</b>
                                                        <a id="setExample" href="#">Try some of our examples</a>
                                                        <a id="setExampleWithConfirmation" style="display: none;" href="#">Try some of our examples</a>
                                                    </div>
                                                                                                        <input type="hidden" name="agencyID" value=""/>
                                                                                                            <input type="hidden" name="expertClientWebsite" value=""/>
                                                                                                                                                                <input type="hidden" id="interfaceLanguage" name="interfaceLanguage" value="en"/>
                                                    
                                                    <div class="card-clean-footer">
                                                        <div class="widget-footer-actions">
                                                            <a class="wizardMainBackButton" title="Back to previous step" ><i class="fal fa-arrow-left"></i></a>
                                                            <div class="NextButtons text-center">
                                                                                                                                    <button type="submit" class="btn btn-primary btn-lg moveToStep3"> 
                                                                        Next Step                                                                    </button>
                                                                                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="step3 wizardStepsBox row" style="display: none;">
                                <div class="col-xs-12">
                                    <div class="progressSteps" >
                                        <div class="backToStep1 link"><i class="fal fa-check"></i> Step 1</div>
                                        <div class="backToStep2 link"><i class="fal fa-check"></i> Step 2</div>
                                        <div class="active">Step 3</div>
                                    </div>
                                    <div class="wizardSteps">
                                        <div class="col-xs-12 signup-fields" style="margin-top:30px;">
                                            <div class="row">
                                                <div class="col-xs-12">

                                                    <div class="wrapGrid">
                                                        <div class="card-clean card-clean-grid leftSide">
                                                            <div class="card-clean-body">
                                                                <h4 class="card-clean-title">Let's get started!</h4>
                                                                
                                                                <fieldset>
                                                                    <label class="block clearfix">
                                                                        <div class="form-group">
                                                                            <label for="name">Your name</label>
                                                                            <input type="text" autocomplete="off" class="form-control input-lg data-hj-whitelist" id="name" name="name" value="" placeholder="Your name" required data-msg-required="Please provide a name."/>
                                                                        </div>
                                                                    </label>
                                                                    <label class="block clearfix">
                                                                        <div class="form-group">
                                                                            <label for="name">Phone (optional)</label>
                                                                            <input type="tel" autocomplete="off" class="uiPhoneInput form-control input-lg data-hj-whitelist" id="phone_number" name="phoneNumber" value="" placeholder="Phone (optional)" data-default-country-code="IN">
                                                                        </div>
                                                                    </label>
                                                                    <label class="block clearfix">
                                                                        <div class="form-group">
                                                                            <label for="email">Email</label>
                                                                            <input type="email" autocomplete="off" class="form-control input-lg data-hj-whitelist" style="direction:ltr;" id="email" name="email" value="" placeholder="Email" required data-msg-required="Please provide an email address." data-rule-email="true" data-msg-email="Please enter a valid email address."/>
                                                                        </div>
                                                                        <div id="emailSuggestion"></div>
                                                                    </label>
                                                                    <label class="block clearfix">
                                                                        <div class="form-group password-container">
                                                                            <label for="password">Create a password</label>
                                                                            <input type="text" autocomplete="off" autocomplete="new-password" class="form-control input-lg" id="password"                                                                             name="password" placeholder="Create a password" required data-msg-required="Please provide a password." data-rule-minlength="5" data-msg-minlength="Your password must be at least 5 characters long." data-show-password="true"/>
                                                                        </div>
                                                                    </label>
                                                                    <label class="block" style="display: none !important;">
                                                                        <input type="checkbox" id="agree" name="agree" required data-msg-required="Please accept our policy" checked/>
                                                                        <span class="lbl">
                                                                            I accept the <a data-target="#termsModal" data-toggle="modal" href="#">User Agreement</a>.                                                                        </span>
                                                                        <div class="error-message alert alert-danger" role="alert" style="display:none;"></div>
                                                                    </label>
                                                                </fieldset>

                                                                <div class="card-clean-footer">
                                                                    <div class="widget-footer-actions">
                                                                        <a class="wizardMainBackButton" title="Back to previous step"><i class="fal fa-arrow-left"></i></a>
                                                                        <div class="NextButtons text-center">
                                                                            <button type="submit" class="btn btn-lg btn-primary">
                                                                                Start my website                                                                            </button>
                                                                            <input type="hidden" name="token" value="f4463a1caa86c0a049f492c865687a53"/>
                                                                            <input type="hidden" id="recaptchaToken" name="recaptchaToken" value=""/>
                                                                            <input type="hidden" name="pathRedirect" value=""/>
                                                                            <input type="hidden" id="category" name="category" value=""/>
                                                                            <input type="hidden" id="newThemeCategoryID" name="newThemeCategoryID" value=""/>
                                                                            <input type="hidden" id="l" name="l" value="en"/>
                                                                            <input type="hidden" id="pageUniqueID" name="pageUniqueID" value="6863771724bfe"/>
                                                                                                                                                                                                                                                <input type="hidden" id="themeID" name="themeID" value="11851">
                                                                                                                                                                                                                                        <input type="hidden" id="cardThemeID" name="cardThemeID" value="">
                                                                            <input type="hidden" id="s_kind" name="s_kind" value="1">
                                                                            <input type="hidden" id="fastBuilder" name="fastBuilder" value="1"/>
                                                                            <input type="hidden" id="screenResolution" name="screenResolution" value=""/>
                                                                            <input type="hidden" id="userCountry_clockType" name="userCountry_clockType" value=""/>
                                                                            <input type="hidden" id="landingPageCode" name="landingPageCode" value=""/>
                                                                            <input type="hidden" id="wizardSettingsJSON" name="wizardSettingsJSON" value="$wizardSettingsJSON"/> 
                                                                            <input type="hidden" id="isFromWebsiteTemplates" name="isFromWebsiteTemplates" value="0"/> 
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div class="card-clean rightSide" style="width:400px;">
                                                            <div class="card-clean-body">
                                                                <h4 class="card-clean-title text-center">Quick Sign-Up</h4>
                                                                <div class="socialBox">
                                                                    <div class="text-center" style="display: flex;flex-direction: column;align-items: center;">
                                                                        <a class="facebookLogin" id="facebookSignup">
                                                                            <div class="socialLoginBun row">
                                                                                <div class="left col-xs-2" style="width: 50px;">
                                                                                    <div class="text-center">
                                                                                        <i class="ace-icon fab fa-facebook-f"></i>
                                                                                    </div>
                                                                                </div>
                                                                                <div class="right col-xs-10" style="    background-color: #fff; color: #4264b2;	border-left: 1px solid #4264b2;">
                                                                                    <div class="text-center">
                                                                                        Facebook
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </a>
                                                                        <a class="googleLogin" id="googleSignup">
                                                                            <div class="socialLoginBun row">
                                                                                <div class="left col-xs-2" style="width: 50px;">
                                                                                    <div class="text-center">
                                                                                        <svg viewBox="0 0 18 18" role="presentation" aria-hidden="true" focusable="false" style="height: 18px; width: 18px;"><g fill="none" fill-rule="evenodd"><path d="M9 3.48c1.69 0 2.83.73 3.48 1.34l2.54-2.48C13.46.89 11.43 0 9 0 5.48 0 2.44 2.02.96 4.96l2.91 2.26C4.6 5.05 6.62 3.48 9 3.48z" fill="#EA4335"></path><path d="M17.64 9.2c0-.74-.06-1.28-.19-1.84H9v3.34h4.96c-.1.83-.64 2.08-1.84 2.92l2.84 2.2c1.7-1.57 2.68-3.88 2.68-6.62z" fill="#4285F4"></path><path d="M3.88 10.78A5.54 5.54 0 0 1 3.58 9c0-.62.11-1.22.29-1.78L.96 4.96A9.008 9.008 0 0 0 0 9c0 1.45.35 2.82.96 4.04l2.92-2.26z" fill="#FBBC05"></path><path d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.84-2.2c-.76.53-1.78.9-3.12.9-2.38 0-4.4-1.57-5.12-3.74L.97 13.04C2.45 15.98 5.48 18 9 18z" fill="#34A853"></path><path d="M0 0h18v18H0V0z"></path></g></svg>
                                                                                    </div>
                                                                                </div>

                                                                                <div class="right col-xs-10" style="background-color: #fff; color: #ea4335; border-left: 1px solid #ea4335;">
                                                                                    <div class="text-center">
                                                                                        Google
                                                                                    </div>
                                                                                </div>

                                                                                </div>
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-xs-12 signup-error-msg" style="margin-top:30px; display:none;">
                                            <div>
                                                <span>
                                                                                                </span>
                                            </div>
                                            <div class="space-10"></div>
                                            <div class="grid-system" style="align-items: center;">
                                                                                                <a href="javascript:void(0);" onclick="TrySignUpAgain();" class="btn btn-lg btn-success">Try Again</a>
                                                                                                <a href="/manager/login/login.php?l=en" class="btn btn-lg">Go to login</a>
                                                <a href="/manager/login/login.php?l=en&retrievePassword=1" class="btn btn-link">Reset Password</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="text-center mt-20" style="padding-top: 30px; color: #858f9691; margin: auto; width: 400px;max-width: 100%;">
                                        *By signing up, you agree to our <a data-target="#termsModal" data-toggle="modal" href="#">Terms of Use</a>.                                    </div>
                                </div>
                            </div>
                            <div class="space-6"></div>
							<input type="hidden" name="isAIOnBoarding" value="1">
                            <input type="hidden" id="address" name="address" value="" maxlength="200">
                            <input type="hidden" id="phone" name="phone" value="">
                            <input type="hidden" id="websiteType" name="websiteType" value="">
                        </form>
                    </div>
                                        <div class="toolbar center hidden" style="background-color: transparent;padding:20px;">
                        <a href="/manager/login/login.php?l=en" class="btn btn-link back-to-login-link">
                            <i class="fal fa-sign-in"></i>
                            Already have an account? Click here to log in.                        </a>
                    </div>
                                    </div>
            </div>
        </div>
    </div>
    </div>
</div>

</div>

<!-- terms Modal -->        
<div class="modal fade bs-example-modal-lg" id="termsModal" tabindex="-1" role="dialog" aria-labelledby="termsModal">
<div class="modal-dialog modal-lg" role="document">
  <div class="modal-content">
    <div class="modal-header">
      <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
      <h4 class="modal-title">Terms</h4>
    </div>
    <div class="modal-body">      
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-success" data-dismiss="modal">Close</button>
    </div>
  </div>
</div>
</div>
<!-- More then -->
<div id="smallPopupExitEntent">
<img src="https://cdn-cms-s-8-4.f-static.net/files/vendor/flag-icons-main/flags/4x3/in.svg" style="width:20px;height:13px;">
<br>
Hundreds of websites were created in India today!</div>
<!-- Sure to close the wizard -->
<div id="sureCloseWizard" style="display:none">
<div class="screen">
    <div class="box">
        <div class="title">
            <div class="text">
                Are you sure you want to exit?            </div>
            <div class="closeSubCat">
                <i class="fal fa-times"></i>
            </div>
            <div class="buttons">
                <a class="yesButton btn">Yes</a>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <a class="noButton btn btn-link" style="color:white !important;">No</a>
            </div>
        </div>
    </div>
</div>
</div>
<script src="https://cdn-cms-s-8-4.f-static.net/files/frameworks/intl-tel-input-17.0.0/build/js/intlTelInput.min.js?v=n84124382"></script>
<script src="https://cdn-cms-s-8-4.f-static.net/versions/2/system_mini/js/minimize_admin_p1.js?v=n84124382" crossorigin="anonymous"></script><script src="https://cdn-cms-s-8-4.f-static.net/versions/2/system_mini/js/minimize_admin_p2.js?v=n84124382" crossorigin="anonymous"></script><script src="https://cdn-cms-s-8-4.f-static.net/versions/2/system_mini/js/minimize_admin_p3.js?v=n84124382" crossorigin="anonymous"></script><script src="https://cdn-cms-s-8-4.f-static.net/versions/2/system_mini/js/minimize_admin_p4.js?v=n84124382" crossorigin="anonymous"></script><script src="https://cdn-cms-s-8-4.f-static.net/versions/2/system_mini/js/minimize_admin_p5.js?v=n84124382" crossorigin="anonymous"></script><script src="https://cdn-cms-s-8-4.f-static.net/files/frameworks/exitEntentJS/exitEntentJS.min.js?v=n84124382"></script>
<script src="https://cdn-cms-s-8-4.f-static.net/files/frameworks/jquery-ui-1.11.4.autocomplete/jquery-ui.min.js?v=n84124382"></script>
<script src="https://cdn-cms-s-8-4.f-static.net/files/vendor/site123/autocompleteInput/js/autocompleteInput.js?v=n84124382"></script>
<script src="https://cdn-cms-s-8-4.f-static.net/files/vendor/site123/autocompleteInput/js/jquery.ui.autocomplete.html.js?v=n84124382"></script>
<script>
//
var submitStarted = false;
var websiteNameField = 'websiteName';
var MainCatList = '';
var logInUser = '';
var signUpIsPrintErrMsg = true;

    MainCatList += '<div data-cat-id-box="' + "3" + '" class=""><div data-cat-id="' + "3" + '" data-cat-name="' + "Website" + '" data-default-theme="' + "7380163" + '" class="well boxCat moveToStep2" data-parent-name="' + "3" + '_cat_set" data-step2-text="' + "" + '" data-step2-placeholder="' + "e.g., Jeff's Coffee Shop, Mary's Flower Store" + '" data-screenshot="' + null + '" data-website-type="' + "business" + '"><img class="imageIcon" src="https:\/\/cdn-cms-s-8-4.f-static.net\/files\/images\/remote-work.png" alt="Website Prototyping Illustration"><span>' + "Website" + '</span></div></div>';
        MainCatList += '<div data-cat-id-box="' + "5" + '" class=""><div data-cat-id="' + "5" + '" data-cat-name="' + "Online Store" + '" data-default-theme="' + "7291243" + '" class="well boxCat moveToStep2" data-parent-name="' + "5" + '_cat_set" data-step2-text="' + "" + '" data-step2-placeholder="' + "e.g., Jeff's Coffee Shop, Mary's Flower Store" + '" data-screenshot="' + null + '" data-website-type="' + "eCommerce" + '"><img class="imageIcon" src="https:\/\/cdn-cms-s-8-4.f-static.net\/files\/images\/e-commerce.png" alt="Website Prototyping Illustration"><span>' + "Online Store" + '</span></div></div>';
        MainCatList += '<div data-cat-id-box="' + "6" + '" class=""><div data-cat-id="' + "6" + '" data-cat-name="' + "Blog" + '" data-default-theme="' + "7416055" + '" class="well boxCat moveToStep2" data-parent-name="' + "6" + '_cat_set" data-step2-text="' + "" + '" data-step2-placeholder="' + "e.g., Jeff's Coffee Shop, Mary's Flower Store" + '" data-screenshot="' + null + '" data-website-type="' + "blog" + '"><img class="imageIcon" src="https:\/\/cdn-cms-s-8-4.f-static.net\/files\/images\/content-writing.png" alt="Website Prototyping Illustration"><span>' + "Blog" + '</span></div></div>';
        MainCatList += '<div data-cat-id-box="' + "7" + '" class=""><div data-cat-id="' + "7" + '" data-cat-name="' + "Landing Page" + '" data-default-theme="' + "7865691" + '" class="well boxCat moveToStep2" data-parent-name="' + "7" + '_cat_set" data-step2-text="' + "" + '" data-step2-placeholder="' + "e.g., Jeff's Coffee Shop, Mary's Flower Store" + '" data-screenshot="' + null + '" data-website-type="' + "landingPage" + '"><img class="imageIcon" src="https:\/\/cdn-cms-s-8-4.f-static.net\/files\/images\/business-objectives.png" alt="Website Prototyping Illustration"><span>' + "Landing Page" + '</span></div></div>';
    
var language                = 'en';
var local                   = '';
var themeID                 = '';

jQuery(function($) {
    // Initialize invalid email handler
    InvalidEmailHandler.ieh_init({
        $email: $('#email'),
        $emailSuggestion: $('#emailSuggestion'),
        translations: {
            emailSuggestion: "Did You Mean:"        }
    });
    //Set all sub-cat into the DIV (we use it with JS so Google SEO will not scan it because he use it as the title of the page)
    $('#MainCatList').html(MainCatList);
    //If the landing page is test number 2 we disable some of the main categories
    if ($('body').data('land')=='2') {
        $('#MainCatList > div').hide();
        $('#MainCatList').find('[data-cat-id-box="13"],[data-cat-id-box="33"],[data-cat-id-box="41"],[data-cat-id-box="58"],[data-cat-id-box="65"],[data-cat-id-box="73"],[data-cat-id-box="99"],[data-cat-id-box="131"]').show();
    }
    //Now show all cat
    $('#MainCatList').show();

    // if you want to use the 'fire' or 'disable' fn,
    // you need to save OuiBounce to an object
    // You can use ouibounce without passing an element
    if ($(window).width() >= 960 && !inIframe()) {
        var _ouibounce = ouibounce(0,{
            aggressive: true,
            sensitivity: 40,
            timer: 0,
            callback: function() {
                if (!$('#quickOpen').is(":visible")) {
                    $('#smallPopupExitEntent').fadeIn(500);
                    setTimeout(function() {
                        $('#smallPopupExitEntent').fadeOut(500);
                    },7000);
                }
            }
        });
    }

    $('.wizardMainBackButton').click(function(e) {
        e.preventDefault();

        if ($('.step2').is(":visible")) {
            $('.backToStep1').trigger('click');
        }
        if ($('.step3').is(":visible")) {
            $('.backToStep2').trigger('click');
        }
    });

    $('.closeIcon').click(function(e) {
        e.preventDefault();

        //Show different text if the user in different steps in is process                
        if ($('.step1').is(":visible")) {
            $('#sureCloseWizard .title .text').html("WOW!<br>You have only 3 steps left to finish.<br>Are you sure you want to exit?");
        }               
        if ($('.step2').is(":visible")) {
            $('#sureCloseWizard .title .text').html("WOW!<br>You have only 2 steps left to finish.<br>Are you sure you want to exit?");
        }
        if ($('.step3').is(":visible")) {
            $('#sureCloseWizard .title .text').html("WOW!<br>You have only 1 step left to finish.<br>Are you sure you want to exit?");
        }

        $('#sureCloseWizard').fadeIn(300);
        $('#chooseCatBox').addClass('blur');
    });

    $('#sureCloseWizard .yesButton').click(function(e) {
        e.preventDefault();

        // reset static steps active class
        $('.moveToSubStep').removeClass('active');

        //Close all the wizard
        $('#chooseCatBox').removeClass('open');
        $('body').css('overflow','auto');

        //Clean any # the user have in the URL
        window.location.hash = '';
    });

    // Got signup error so we display the error in new box
    if ( !signUpIsPrintErrMsg ) {
        $('.wizardStepsBox').hide();
        $('.step3 .signup-error-msg').show();
        $('.step3 .signup-fields').hide();
        $('.step3').show();
    }
});

function inIframe () {
    try {
        return window.self !== window.top;
    } catch (e) {
        return true;
    }
}
</script>
<!-- inline scripts related to this page -->
<script type="text/javascript">
/**
 * The function is returning random business description
 */
function printRandomBusinessDescription() {
    // build array of business descriptions. Each item will have category, website name, and business description
    const businessIdeas = [
        ["Fintech Startup", "CashFlow", "It is an industry-leading fintech startup specializing in creating user-friendly financial applications, primarily focusing on automated personal budgeting tools and AI-powered investment advice."],
        ["SEO Consultancy", "SERP Masters", "An expert SEO consultancy firm, providing clients with bespoke strategies to increase their online visibility, drive organic traffic, and enhance conversion rates using data-driven methodologies."],
        ["Vegan Cafe", "Green Bites", "An all-vegan cafe focusing on wholesome, farm-to-table meals. Committed to sustainability, it uses locally sourced ingredients and operates with a zero-waste philosophy."],
        ["Telehealth Services", "HealLink", "A comprehensive telehealth platform providing virtual consultations, personalized wellness plans, and continuous healthcare monitoring using advanced data analytics."],
        ["Online Art Store", "Artistic Touch", "An online retail platform is dedicated to selling unique, handcrafted art pieces sourced from local artists, promoting creativity, and supporting the local art community."],
        ["Mobile Game Studio", "FunSprint", "A mobile game development studio, crafting engaging, addictive games with a focus on user-friendly mechanics and rich storytelling, harnessing the power of AR\/VR technologies."],
        ["Vertical Farming", "HighGrow", "An innovative vertical farming initiative implementing space-efficient farming techniques to grow organic produce, aiming to revolutionize urban agriculture and promote food security."],
        ["Digital Language Tutor", "LinguaLearn", "A digital language learning platform employs AI-driven algorithms for adaptive lesson planning, supporting various languages and catering to different learning styles."],
        ["Innovation Hub", "SynergySphere", "An innovation-oriented co-working space, nurturing collaboration and creativity through networking events, mentorship programs, and access to state-of-the-art tech infrastructure."],
        ["Custom 3D Modeling", "PrintDimension", "A 3D printing service that delivers high-quality, custom 3D models for businesses and individual customers, from architectural prototypes to personalized trinkets."],
        ["Mindfulness App", "ZenPath", "A wellness-focused mobile application providing guided meditation, yoga sessions, and mindfulness training tailored to the user's lifestyle and needs, encouraging holistic wellbeing."],
        ["Cybersecurity Firm", "SecureSys", "A cybersecurity firm providing advanced threat protection and incident response services to businesses with an AI-driven, proactive approach toward security."],
        ["Online Education", "Learniverse", "An online education platform offering a vast array of courses from industry professionals and educators, supporting personalized learning pathways with interactive multimedia content."],
        ["Cruelty-Free Cosmetics", "Bloom Beauty", "A cruelty-free cosmetics brand dedicated to creating high-quality, ethically-made beauty products, championing animal rights, and promoting sustainable packaging solutions."],
        ["AI Consulting", "IntelliPros", "An AI consulting firm that helps businesses optimize their operations, decision-making processes, and customer experiences using machine learning, natural language processing, and predictive analytics."],
        ["Sustainable Fashion", "EcoThreads", "An e-commerce platform for sustainable fashion that offers ethically sourced, environmentally friendly clothing and advocates for slow fashion and textile recycling."],
        ["Smart Home Technology", "HomeGenius", "A company specializing in smart home technology that provides seamless, interconnected solutions to make homes safer, more energy-efficient, and user-friendly."],
        ["BioTech Research", "LifeSync", "A biotech research company, focusing on developing innovative medical solutions, including novel drugs, therapies, and diagnostic tools to combat various diseases."],
        ["Virtual Reality Tours", "VirtuVisit", "A business provides immersive virtual reality tours for real estate, tourism, and education sectors, enabling users to explore locations from their homes."],
        ["Social Impact Consulting", "ImpactMakers", "A social impact consulting firm, helping organizations to align their strategies with sustainable practices and create meaningful, measurable social impact."],
        ["Online Fitness Platform", "FitNow", "An online fitness platform offering live fitness classes, on-demand workouts, and personalized nutrition plans catered to individual goals and lifestyles."],
        ["SaaS Startup", "CloudManage", "A SaaS startup offering comprehensive cloud management solutions that streamline workflow, improve collaboration, and enhance data security for businesses."],
        ["Sustainable Architecture", "GreenBlueprints", "A sustainable architecture firm focusing on eco-friendly building designs that minimize environmental impact and promote energy efficiency, incorporating green technologies such as solar panels and rainwater harvesting."],
        ["Data Analytics Consultancy", "DataDive", "A data analytics consultancy providing businesses with actionable insights from complex data sets, utilizing machine learning algorithms and predictive modeling to support strategic decision-making."],
        ["Personal Development App", "BetterU", "A personal development mobile app offering courses on leadership, communication, and emotional intelligence, utilizing gamification techniques for an engaging learning experience."],
        ["AI-Powered Recruitment", "HireGenius", "An AI-powered recruitment platform, optimizing talent acquisition by automating candidate sourcing, screening, and interview scheduling, enabling companies to hire efficiently and effectively."],
    ];
    let randomIndex = Math.floor(Math.random() * businessIdeas.length);
    return businessIdeas[randomIndex];
}

// Check if we need to set the height of the parent that call this page
$(window).on("load", function() {
    SetIframeHeight();
});

var slideSpeed = 500;
var isRecaptchaResourcesLoaded = false;

function SetFastWizardButtons() {
    $('.moveToStep2').click(function( event, isSaveToHistory ) {

        //Load Google recaptcha JS script
        loadRecaptchaResources();

        //Make the script
        var $this           = $(this);
        var defaultTheme    = $this.data('default-theme');
        var newThemeCategoryID      = $this.data('cat-id');
        var parentName      = $this.data('parent-name');
        var catName         = $this.data('cat-name');
        var sunParentName   = $this.data('parent');;
        var step2Text       = $this.data('step2-text');
        var step2Placeholder    = $this.data('step2-placeholder');
        var screenshot      = $this.data('screenshot');
        var cardThemeID     = $this.data('card-theme');
        var websiteType     = $this.data('website-type');

        //If the sun category is empty we use is parent data
        if (defaultTheme=='' || typeof defaultTheme == "undefined") {
            defaultTheme        = $('#MainCatList').find('[data-parent-name="'+sunParentName+'"]').data('default-theme');
            newThemeCategoryID  = $('#MainCatList').find('[data-parent-name="'+sunParentName+'"]').data('cat-id');
        }
        if (step2Text=='' || typeof step2Text === "undefined") {
            step2Text    = $('#MainCatList').find('[data-parent-name="'+sunParentName+'"]').data('step2-text');
        }
        if (step2Placeholder=='' || typeof step2Placeholder === "undefined") {
            step2Placeholder    = $('#MainCatList').find('[data-parent-name="'+sunParentName+'"]').data('step2-placeholder');
        }
        if (screenshot=='' || typeof screenshot === "undefined") {
            screenshot    = $('#MainCatList').find('[data-parent-name="'+sunParentName+'"]').data('screenshot');
        }

        //Save category (https://www.site123.com/templates/preview/xxxxxx)
        if (defaultTheme!='' && typeof defaultTheme !== "undefined") {
            $('#newThemeCategoryID').val(newThemeCategoryID);
            $('#category').val('');
            $('#themeID').val(defaultTheme);
        } else {
            $('#newThemeCategoryID').val('');
            $('#category').val('38');
            $('#themeID').val('11851'); //Default theme
        }
        //If the user is in local we set a default themeID so we could work on local
        if (local=='1') {
            $('#newThemeCategoryID').val('');
            $('#category').val('');
            $('#themeID').val('2562');
        }

        // Save the website type so we would know what modules to add
        $('#websiteType').val(websiteType);

        //If the user choose a card theme we handle it here
        if (cardThemeID!='' && typeof cardThemeID !== "undefined") {
            $('#cardThemeID').val(cardThemeID);
            if (local=='1') {
                $('#category').val();
                $('#themeID').val('2562');
            } else {
                $('#category').val('38');
                $('#themeID').val('11851');
            }
        }

        //Change the texts on step 2 to fit the user category
        if ( step2Text != '' && typeof step2Text !== "undefined" ) {
            $('.step2 .questionHeader').html(step2Text);
        } else {
            $('.step2 .questionHeader').html("Add your website name");
        }
        if (step2Placeholder!='' && typeof step2Placeholder !== "undefined") {
            $('.step2 #'+websiteNameField+'').attr('placeholder',step2Placeholder);
        } else {
            $('.step2 #'+websiteNameField+'').attr('placeholder',"e.g., Jeff's Coffee, Mary's Flower Shop");
        }
		
		// By default we want to save the step to browser history
		if ( typeof isSaveToHistory === "undefined" ) isSaveToHistory = true;

        //Set the theme the user choose
        //$('#themeID').val($(this).data('default-theme'));
        //Move next
        showStep('step2',isSaveToHistory);
    });

    $('.backToStep1').click(function() {
        showStep('step1',true);
    });
    $('.backToStep2').click(function() {
        showStep('step2',true);
    });
}

/**
 * Load Google recaptcha JS resources
 */
function loadRecaptchaResources( callback = null ) {
    // load Google recaptcha JS script
    $.getScript('https://www.google.com/recaptcha/api.js?render=6Le1IIAUAAAAAKBiCooaV8s3TzL0JtmR8SJU0st8', function() {
        // update flag status
        isRecaptchaResourcesLoaded = true;
        // run callback when Google recaptcha resources was loaded
        if ( callback ) callback.call(this);
    });
}

/**
 * Initialize Google recaptcha
 */
function initializeGoogleRecaptcha() {
    /**
     * We use timeout for submit because we want MIXPANEL will fire before the page move.
     * We don't use MIXPANEL complete option because we don't want to wait to him if he fail
     */
    setTimeout(function() {
        try {
            grecaptcha.ready(function() {
                grecaptcha.execute('6Le1IIAUAAAAAKBiCooaV8s3TzL0JtmR8SJU0st8', {action: 'website_sign_up_open_website'})
                .then(function(token) {
                    // Verify the token on the server
                    GoogleRecaptchaSubmit(token);
                });
            });
        }
        catch(err) {
            //No Google - send empty token
            GoogleRecaptchaSubmit('');
        }
    }, 50);
}

//you don't need this, just used for changing background
jQuery(function($) {
	/**
	 * When there is info filled by the user in the fields we want to show him
	 * alert when he is pressing on examples button so he won't change his info
	 * by mistake
	 */
	$('#businessType, #websiteName, #websiteDescription').on('change input', function() {
		// hide both buttons
		$('#setExample').hide();
		$('#setExampleWithConfirmation').hide();
		// user filled info - show button with confirmation
		if ( $('#businessType').val() != '' || $('#websiteName').val() != '' || $('#websiteDescription').val() != '' ) {
			$('#setExampleWithConfirmation').show();
		// fields are empty - show the button to apply examples
		} else {
			$('#setExample').show();
		}
	});

	/**
	 * Bootstrap Confirmation Plugin Initial
	 * Documentation: https://ethaizone.github.io/Bootstrap-Confirmation/
	 */
	$('#setExampleWithConfirmation').confirmation({
		placement: function() {
			// mobile - open from top
			if ( jQuery.browser.mobile ) return 'top';
			// desktop - open from the right if RTL otherwise from the left
			return "right";
		},		title: '<div>Confirming this will overwrite your current website details. Are you sure you want to continue?</div>',
		btnOkLabel: '<i class="icon-ok-sign icon-white"></i> '+"Yes",
		btnCancelLabel: '<i class="icon-remove-sign"></i> '+"No",
		popout: true,
		singleton: true,
		container: 'body',
		btnOkClass: 'btn-danger btn-sm spacing-confirmation-btn',
		btnCancelClass: 'btn-default btn-sm spacing-confirmation-btn',
		onConfirm: function() { return true; }
	});
	/**
	 * Bug Fix - The buttons of the confirmation has href="#" and when
	 * user clicks on it it triggeres the history engine because it's adding
	 * hastag to the url so we manually handle it
	 */
	$('#setExampleWithConfirmation').on('shown.bs.confirmation', function() {
		$('.popover.confirmation a').on('click', function( event ) {
			event.preventDefault();
		});
	})
	// show backdrop
	.on('show.bs.confirmation', function() {
		$('<div class="confirmation-backdrop" style="position: absolute; left: 0; top: 0; width: 100%; height: 100%; z-index: 100; background-color: #000; opacity: 0.4;"></div>').appendTo('body');
	})
	// remove backdrop
	.on('hide.bs.confirmation', function() {
		$('.confirmation-backdrop').remove();
	});

    // Randomize buisness description
    $('#setExample, #setExampleWithConfirmation').on('click', function( event ) {
        // prevent default link event
        event.preventDefault();
        event.stopPropagation();
		// apply the examples
		applyExample();
    });

	/**
	 * The function is applying the example to the form
	 */
	function applyExample() {
		let randomExample = printRandomBusinessDescription();
		$('#businessType').val(randomExample[0]).trigger('change');
		$('#websiteName').val(randomExample[1]).trigger('change');
		$('#websiteDescription').val(randomExample[2]).trigger('change');
	}

    // Check if we need to set the height of the parent that call this page
    SetIframeHeight();

    //Check that the user is not browsing using his mobile
    if (jQuery.browser.mobile==false) {
        
        /**
         * jQuery Chosen Initialize
         * Documentation : https://harvesthq.github.io/chosen/
         */
        $('.chosen-select').chosen();

        //http://stackoverflow.com/questions/25983906/width-of-chosen-dropdowns-near-zero-when-starting-in-collapsed-bootstrap-accordi
        $('.chosen-container.chosen-container-single').width('100%');

        // Add placeholder to the chosen select search input
        $('.chosen-container input').attr('placeholder',"Search");
    }

    // Initialize the category input
    initializeCategoryInput();

    SetFastWizardButtons();

    // Listen to browser back / forward events
    browserHistoryHandler();

    $('#sureCloseWizard .closeSubCat').click(function() {
        //hide sub-category
        $('#sureCloseWizard').fadeOut(300);
        $('#chooseCatBox').removeClass('blur');
    });
    $('#sureCloseWizard .screen').click(function() {
        //hide sub-category
        $('#sureCloseWizard').fadeOut(300);
        $('#chooseCatBox').removeClass('blur');
    });

    $('#facebookSignup').click(function() {
        return false;
        var actionURL = $('#sign-up-form').attr('action')+'?login=facebook&l='+$('#l').val();
        $('#sign-up-form').attr('action',actionURL);

        //If the user didn't enter website name we set it here
        if ($('#'+websiteNameField+'').val()=='') {
            $('#'+websiteNameField+'').val("Website Name");
        }

        //Disable the validator so we don't ask the user to enter email or pass
        $("form").validate().settings.ignore = "*";
        //Send the form
        $('#sign-up-form').submit();
    });

    
        // Validation setup
        $("#sign-up-form").validate({
            onsubmit: false,
            highlight: function(element, errorClass) {
                $(element).css('border','1px solid red');
            },
            errorPlacement: function(error, element) {
                if (element.is('input[type=checkbox]') || element.is('input[type=radio]')) {
                    var controls = element.closest('div[class*="col-"]');
                    if (controls.find(':checkbox,:radio').length > 1) controls.append(error);
                    else error.insertAfter(element.nextAll('.lbl:eq(0)').eq(0));
                } else if (element.is('.select2')) {
                    error.insertAfter(element.siblings('[class*="select2-container"]:eq(0)'));
                } else if (element.is('.chosen-select')) {
                    error.insertAfter(element.siblings('[class*="chosen-container"]:eq(0)'));
                } else {
                    error.insertAfter(element.parent());
                }
            },
           
        });

        // Google signup click handler
        $('#googleSignup').click(function(e) {
            e.preventDefault(); // Prevent default anchor behavior

            const websiteNameField = 'websiteName'; // <-- update this to actual ID

            // Set website name if not filled
            if ($('#' + websiteNameField).val().trim() === '') {
                $('#' + websiteNameField).val('Website Name');
            }

            // Manually trigger validation
            if ($("#sign-up-form").valid()) {
                // Redirect to Google login
                window.location.href = googleLoginURL;
            }
        });
    


   
    $('#termsModal').on('show.bs.modal', function (event) {

        //Get the Button that triggered the modal
        var button = $(event.relatedTarget);

        //Get objects
        var modal = $(this);

        //Set the items iframe
        modal.find('.modal-body').html('<iframe id="termsWinIframe" name="termsWinIframe" src="/manager/login/sign_up_terms.php" style="width:100%;height:500px;margin:0;padding:0;border:none;"></iframe>');
    });

	/**
	 * Validator Errors Remove - When user types something in the inputs drop
	 * the error messages because it's not empty now
	 */
	$('#'+websiteNameField+', #businessType').on('input change', function(event) {
		if ( $(this).get(0).id == websiteNameField ) {
			$('#websiteNameAlert').remove();
		} else if ( $(this).get(0).id == 'businessType' ) {
			$('#businessTypeAlert').remove();
		}
	});

    // Form submit
    $('#sign-up-form').submit(function(e, isSaveToHistory) {
        // prevent form submit
        e.preventDefault();
        /**
         * Logged In User Only - If the user click on the SUBMIT with force class we need to submit the form right away!
         */
        if ( $('.step2').is(":visible") && $('.step2').find('button.forceSubmit').length > 0 ) {
            if ( $('#sign-up-form').valid() ) {
                // set custom validation flag
                var isInvalid = false;
                // prevent user from submitting website with empty name
                if ( $('#'+websiteNameField+'').val() == '' ) {
                    $('#websiteNameAlert').remove();
                    $('<div id="websiteNameAlert" style="color:red;">Please enter the website name</div>').insertAfter('#'+websiteNameField+'');
                    $('#'+websiteNameField+'').focus();
                    isInvalid = true;
                } else {
                    $('#websiteNameAlert').remove();
                }
                // prevent user from submitting website with empty category
                if ( $('#businessType').val() == '' ) {
                    $('#businessTypeAlert').remove();
                    $('<div id="businessTypeAlert" style="display: table-row; color:red;">Please choose a website category</div>').appendTo($('#businessType').parent());
                    isInvalid = true;
                } else {
                    $('#businessTypeAlert').remove();
                }

                // exit if the form is invalid
                if ( isInvalid ) return;
                // change the button to loading image
                $('.NextButtons').hide();
                // google recaptcha resources was loaded
                if ( isRecaptchaResourcesLoaded ) {
                    // initialize Google recaptcha
                    initializeGoogleRecaptcha();
                // reload Google recaptcha resources again
                } else {
                    loadRecaptchaResources(initializeGoogleRecaptcha);
                }
                // exit
                return;
            }
        }

        /**
         * New User Only
         */
        if ( $('.step2').is(":visible") ) {
            // set custom validation flag
            var isInvalid = false;
            // prevent user from submitting website with empty name
            if ( $('#'+websiteNameField+'').val() == '' ) {
                $('#websiteNameAlert').remove();
                $('<div id="websiteNameAlert" style="color:red;">Please enter a website name.</div>').insertAfter('#'+websiteNameField+'');
                $('#'+websiteNameField+'').focus();
                isInvalid = true;
            } else {
                $('#websiteNameAlert').remove();
            }
            // prevent user from submitting website with empty category
            if ( $('#businessType').val() == '' ) {
                $('#businessTypeAlert').remove();
                $('<div id="businessTypeAlert" style="display: table-row; color:red;">Please choose a website category</div>').appendTo($('#businessType').parent());
                isInvalid = true;
            } else {
                $('#businessTypeAlert').remove();
            }
            // exit if the form is invalid
            if ( isInvalid ) return;
            /**
             * When user submits the form manually this flag is undefined
             * but when the user uses the back / forward button this flag is set
             */
            if ( typeof isSaveToHistory == 'undefined' ) isSaveToHistory = true;
            // show step 3
            showStep('step3',isSaveToHistory);
            // exit
            return false;
        }
        if ( $('.step3').is(":visible") ) {
            if ( $('#sign-up-form').valid() ) {
                //Setup the right phone number of the user
                if ( $('#phone_number').isValidPhoneNumber() ) {
                    $('#phone').val($('#phone_number').getPhoneNumber());
                } else {
                    $('#phone').val('');
                }

                //Change the button to loading image
                $('.NextButtons').hide();

                // Google recaptcha resources was loaded
                if ( isRecaptchaResourcesLoaded ) {
                    // initialize Google recaptcha
                    initializeGoogleRecaptcha();
                // reload Google recaptcha resources again
                } else {
                    loadRecaptchaResources(initializeGoogleRecaptcha);
                }
            }
        }
    });

    //Set user screen resolution
    $('#screenResolution').val(screen.width+'X'+screen.height);

    // Set the user machine clock type (12 or 24 hour)
    $('#userCountry_clockType').val(detactUserMachineClock("en"));
});
/**
 * check if username is available and submit the form
 */
function IsUsernameExist() {
    $.ajax({
        type: 'POST',
        url: '/manager/login/checkUser.php',
        data: {
            email: $('#email').val()
        },
        success: function(data) {
            // email address has already
            if ( data == 'false' ) {
                $('.step3 .signup-fields').hide();
                $('.signup-error-msg span').html("This email address has already been taken<BR>({{email}})".replace('{{email}}',$('#email').val()));
                $('.step3 .signup-error-msg').show(250);
            // submit form
            } else {
                SubmitForm();
            }
        }
    });
}

/**
 * The function is intializign the category input auto complete
 */
function initializeCategoryInput() {
    // get the inout
    let $input = $('#businessType');
    /**
     * Initialzie the cagtegory input
     */
    let categoriesInput = new AutocompleteInput({
        $input: $input,
        html: true,
        containerTemplate: `
        <div class="input-group">
            <span class="input-group-btn">
                <button type="button" class="btn btn-sm btn-primary input-lg" style="line-height:1.4" title="Website pages">
                <i class="ace-icon fa-light fa-file"></i>
                </button>
            </span>
        </div>
        `, 
        intrface_align_reverse: topWindow.intrface_align_reverse,
        pageLoadAjax: function( callback ) {
            loadBusinessTypes({},callback);
        }, 
        autoCompleteSource: function ( callback ) {
            loadBusinessTypes({
                q: $input.val(),
                language: "en"            },callback);
        }
    });
    // fix the design to fit the tool
    $input.addClass('autocomplete-input');
    /**
     * The function is loading the business types
     */
    function loadBusinessTypes( data, callback ) {
        // set new structure
        let newStructure = [];
        /* if there is no query we don't want to fire ajax but return empty array
        so the auto complete list will not appear */
        if ( !data.q ) {
            callback.call(this,newStructure);
            return;
        }
        $.ajax({
            url: '/manager/login/getBusinessTypeAjax.php',
            type: "POST",
            data: data,
            success: function( data ) {
                // decode data to access the pages
                var data = tryParseJSON(data);
                // create data structure that fits the jquery ui autocomplete
                $.each(data, function( index, value ) {
                    newStructure.push({
                        label: value.categoryHTML,
                        value: value.categoryTXT,
                        json: JSON.stringify(value)
                    });
                });
                // return the data
                callback.call(this,newStructure);
            }
        });
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

function GoogleRecaptchaSubmit(token) {

    $('#recaptchaToken').val(token);

    //Send the form
    if (submitStarted==false) {
        // get form action URL
        var url = $('#sign-up-form').attr('action');
        // on open new item for new user will be via AJAX only if it's not using social networks 
        if ( $('.step3').is(":visible") && !url.includes('?login=facebook') && !url.includes('?login=google') ) {
            // check if username available and submit the form
            IsUsernameExist();
        // submit form
        } else {
            SubmitForm();
        }
    }
    submitStarted = true;
}
/**
 * submit form
 */
function SubmitForm() {
   $('#sign-up-form').off().submit();
}
function TrySignUpAgain() {
    $('.step3 .signup-error-msg').hide();
    $('.step3 .signup-fields').show(250);
    $('.NextButtons').show();
    submitStarted = false;
    $('.signup-error-msg span').html('');
    $('#email').val('');
}
function ChangeLanguage(e) {
    location.href = '/manager/login/sign_up.php?l='+$(e).val()+'';
}

function ChangeTemplateCat(e) {
    location.href = '/templates/'+$(e).val()+'';
}

function ScrollWidgetTop() {
    var container = $('.main-container');
    var scrollTo = $('.widget-body');

    container.animate({
        scrollTop: scrollTo.offset().top - container.offset().top + container.scrollTop()
    });
}

/**
 * The function check if the user machine clock type is 12 or 24 hour.
 * Source: https://stackoverflow.com/a/27648032/469161
 * 
 * @param {string} languageCode - Language code to check related to it.
 */
function detactUserMachineClock( languageCode ) {
    // set default machine clock
    var machineClockType = '12';
    // some browsers know how to detect the clock even without language (prevent null)
    if ( !languageCode ) languageCode = '';
    // sometimes our system send "en_US" instead of en-US so we fix it
    if ( languageCode.indexOf('_') !== -1 ) languageCode = languageCode.replace('_','-');
    // get the user machine date string
    try {
        var dateString = new Date().toLocaleTimeString(languageCode);
    } catch (e) {
        return machineClockType;
    }
    // check if the machine date is 12 or 24 hour clock
    if ( !dateString.match(/am|pm/i) ) machineClockType = '24';
    // return the machine clock type
    return machineClockType;
}

/**
 * The function is handling the browser back and forward buttons
 * and showing the form step according to the URL hash
 */
function browserHistoryHandler() {
    //Clean any # the user have in the URL
    window.location.hash = '';
    // exit if the browser doesn't support history handler
    if ( !window.history || !window.history.pushState ) return;
    // handle the browser history
    $(window).on('popstate', function() {
        // remove the hash from the URL
        let stepNum = window.location.hash.replace('#','');
        // security - if the user tries to access final step from step 2 we need to run the form validtor
        if ( stepNum == 'step3' && $('.step2').is(":visible") ) {
            $('#sign-up-form').trigger('submit',false);
        // show the step
        } else {
            showStep(stepNum,false);
        }
    });
}

/***
 * The function is saving the step number to history
 */
function SaveStepToHistory(step) {
    if ( !window.history || !window.history.pushState ) return;
    window.history.pushState('forward', null, '#'+step);
}

/**
 * The function is showing the form step according to the sent step number
 */
function showStep( stepNum, isSaveToHistory ) {
	/**
	 * Security - if the user tries to navigate back and his browser hsitory don't have step id
	 * we always showed the step 1 but when opening with AI + from templates
	 * the user don't need to see step 1 anymore so we always will show
	 * step 2 instead
	 */
	if ( !stepNum && $.isNumeric(themeID) ) {
		stepNum = 'step2';
	}
    // check what step we need to show
    switch ( stepNum ) {
        // step 2
        case 'step2':
			// change back the type password to the type text so the browser will not open password suggestion on other inputs
			$('.password-container [name="password"]').attr('type','text');
            // show step 2
            $('.step2').slideDown(slideSpeed, function() {
                // scroll to top
                $('#chooseCatBox').scrollTop(0);
                // focus on the business type
                $('#businessType').focus();
                // save to history if needed
                if ( isSaveToHistory ) {
                    SaveStepToHistory('step2');
                }
            });
            // hide all other steps
            $('.wizardStepsBox:not(.step2)').slideUp(slideSpeed);
            break;
        // step 3
        case 'step3':
			/**
			 * Bug Fix - If the field is loaded with type
			 * password the chrome browser was showing the password suggestions on websiteName so we fixed it by changing the type text to type password when opening step 3 only
			 */
			$('.password-container [name="password"]').attr('type','password');
            // show step 3
            $('.step3').slideDown(slideSpeed, function() {
                // focus on the name field
                $('#name').focus();
                // save to history if needed
                if ( isSaveToHistory ) {
                    SaveStepToHistory('step3');
                }
            });
            // hide all other steps
            $('.wizardStepsBox:not(.step3)').slideUp(slideSpeed);
            break;
        // step 1
        default:
			// change back the type password to the type text so the browser will not open password suggestion on other inputs
			$('.password-container [name="password"]').attr('type','text');
            // show step 1
            $('.step1').slideDown(slideSpeed, function() {
                // save to history if needed
                if ( isSaveToHistory ) {
                    SaveStepToHistory('step1');
                }
            });
            // hide all other steps
            $('.wizardStepsBox:not(.step1)').slideUp(slideSpeed);
            break;
    }
}

/**
 * The function set the IFrame tag height related to its content.
 */
function SetIframeHeight() {
    if ( window.name ) {
        if ( parent.$ ) {
            parent.$('#'+window.name+'').height($('body').height()+25);
        }
    }
}
</script>

<script src="https://cdn-cms-s-8-4.f-static.net/versions/2/system_mini/js/minimizeSITE123_tracker.js?v=n84124382" crossorigin="anonymous"></script>
<script>
    /**
     * jQuery.browser.mobile (http://detectmobilebrowser.com/)
     *
     * jQuery.browser.mobile will be true if the browser is a mobile device
     *
     **/
    (function(a){(jQuery.browser=jQuery.browser||{}).mobile=/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))})(navigator.userAgent||navigator.vendor||window.opera);
</script>


</body>
</html>