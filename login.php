<?php 
require_once 'config.php';
require_once 'db.php';

$login_url = $client->createAuthUrl();
//echo $login_url; exit; 

if (isset($_SESSION['email'])) {

    header("Location: index.php");  exit();
  /*  echo "<h3>Welcome, {$_SESSION['name']}</h3>";
    echo "<p>Email: {$_SESSION['email']}</p>";
    echo "<img src='{$_SESSION['picture']}' width='100'><br><br>";
    echo "<a href='logout.php'>Logout</a>";
    exit();*/
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Get email and password from form
    $email = isset($_POST['username']) ? trim($_POST['username']) : '';
    $password = isset($_POST['password']) ? $_POST['password'] : '';

    
    // Prepare statement to fetch user by email
    $stmt = $conn->prepare("SELECT id, name, password FROM user WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->store_result();

    // Check if user exists
    if ($stmt->num_rows === 1) {
        $stmt->bind_result($id, $name, $hashedPassword);
        $stmt->fetch();

        // Verify entered password with hashed password from DB
        if (password_verify($password, $hashedPassword)) {
            // Set session variables
            $_SESSION['id']    = $id;
            $_SESSION['name']  = $name;
            $_SESSION['email'] = $email;

            // Redirect to dashboard or homepage
            header("Location: index.php");
            exit();
        } else {
            // Incorrect password
            echo " Incorrect credentials.";
        }
    } else {
        // Email not found
        echo " Incorrect credentials.";
    }

    $stmt->close();
    $conn->close();
}
?>


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

        <link rel="shortcut icon" href="https://cdn-cms-s-8-4.f-static.net/manager/websites/site123_website/files/logos/brand_files_2020/Icons/Png/Icon_blue.png?v=y84124391" type="image/x-icon">
        <link rel="icon" href="https://cdn-cms-s-8-4.f-static.net/manager/websites/site123_website/files/logos/brand_files_2020/Icons/Png/Icon_blue.png?v=y84124391" type="image/x-icon">

        <!-- ace scripts -->
        <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet"><link rel="stylesheet" href="https://cdn-cms-s-8-4.f-static.net/versions/2/system_mini/css/minimizeAdmin.css?v=y84124391" type="text/css" crossorigin="anonymous"><style>:root {
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
        <title>Login - Storeinminutes</title>
        <meta name="description" content="Log in to your account to access your content" />

        <meta http-equiv="content-language" content="en"/>

        <link rel="alternate" hreflang="en" href="https://app.site123.com/manager/login/login.php?l=en"/>
        <link rel="alternate" hreflang="pt" href="https://app.site123.com/manager/login/login.php?l=pt"/>
        <link rel="alternate" hreflang="fr" href="https://app.site123.com/manager/login/login.php?l=fr"/>
        <link rel="alternate" hreflang="de" href="https://app.site123.com/manager/login/login.php?l=de"/>
        <link rel="alternate" hreflang="it" href="https://app.site123.com/manager/login/login.php?l=it"/>
        <link rel="alternate" hreflang="pl" href="https://app.site123.com/manager/login/login.php?l=pl"/>
        <link rel="alternate" hreflang="es" href="https://app.site123.com/manager/login/login.php?l=es"/>
        <link rel="alternate" hreflang="ja" href="https://app.site123.com/manager/login/login.php?l=jp"/>
        <link rel="alternate" hreflang="ko" href="https://app.site123.com/manager/login/login.php?l=ko"/>
        <link rel="alternate" hreflang="tr" href="https://app.site123.com/manager/login/login.php?l=tr"/>
        <link rel="alternate" hreflang="ru" href="https://app.site123.com/manager/login/login.php?l=ru"/>
        <link rel="alternate" hreflang="uk" href="https://app.site123.com/manager/login/login.php?l=ua"/>
        <link rel="alternate" hreflang="hi" href="https://app.site123.com/manager/login/login.php?l=hi"/>
        <link rel="alternate" hreflang="ar" href="https://app.site123.com/manager/login/login.php?l=ar"/>
        <link rel="alternate" hreflang="he" href="https://app.site123.com/manager/login/login.php?l=he"/>
        <link rel="alternate" hreflang="id" href="https://app.site123.com/manager/login/login.php?l=id"/>
        <link rel="alternate" hreflang="x-default" href="https://app.site123.com/manager/login/login.php?l=en"/>

        <link rel="canonical" href="https://app.site123.com/manager/login/login.php?l=en" />

       
       

        <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet"><link rel="stylesheet" href="https://cdn-cms-s-8-4.f-static.net/versions/2/system_mini/css/minimizeAdmin.css?v=y84124391" type="text/css" crossorigin="anonymous"><style>:root {
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
            .login-container .logo {
                margin-top: 40px;
                margin-bottom: 40px;
            }

            .passwordIcon .fa {
                min-width: 11px;
            }

            .widget-main {
                padding: 50px;
            }
            /* mobile support */
            @media (max-width: 768px) {
                .widget-main {
                    padding: 25px;
                }
            }
        </style>
    </head>

    <body class="light-login ">
        <!-- <a class="languageModalElement login-languages-btn" data-show-lan-text="true"><i class="fa-light fa-globe"></i></a> -->
        <div class="container">
            <div class="row">
                <div class="col-xs-12 col-sm-6 col-sm-offset-3">
                    <div class="space-20"></div>
                    <div class="space-20"></div>

                    
                    <div class="space-20"></div>

                    <div class="text-center">
                        <a href="#"><img class="logo" src="" style="height:60px;width:auto;max-width: 100%;" alt="" />
                            <h3> LOGO - Storeinminutes </h3>
                        </a>
                    </div>

                    <div class="space-20"></div>

                    <div class="position-relative">
                        <div id="login-box" class="signup-box widget-box">
                            <div class="widget-header h-primary">
                                <h5 class="widget-title">Login</h5>
                            </div>
                            <div class="widget-body">
                                <div class="widget-main">

                                    
                                    <form method="post" class="form normal-label" action="login.php" id="login-form">
                                    <div class="row">
                                        <div class="col-xs-12">
                                            <fieldset>

                                                <div class="form-group">
                                                    <div class="input-group">
                                                        <input type="text" id="username" name="username" class="form-control input-lg" style="direction:ltr;" placeholder="Email Address" required data-msg-required="Please provide an email address." data-rule-email="true" data-msg-email="Please enter a valid email address." />
                                                        <span class="input-group-addon"><i class="fa fa-user"></i></span>
                                                    </div>
                                                    <div id="emailSuggestion"></div>
                                                </div>

                                                <div class="form-group">
                                                    <div class="input-group">
                                                        <input type="password" id="password" name="password" class="form-control input-lg" placeholder="Password" required data-msg-required="Please provide a password." data-rule-minlength="5" data-msg-minlength="Your password must be at least 5 characters long." data-show-password="true" />
                                                        <span class="passwordIcon input-group-addon"><i class="fa fa-lock"></i></span>
                                                    </div>
                                                </div>

                                              <!--   <div class="toolbar clearfix" style="padding: 0;background: transparent;border: 0;">
                                                    <div>
                                                        <a href="#" style="font-size:12px;text-shadow: none;">
                                                            <i class="ace-icon fa fa-unlock-alt"></i>
                                                            I forgot my password                                                        </a>
                                                    </div>
                                                </div> -->

                                            </fieldset>
                                        </div>

                                        <div class="col-xs-12">
                                            <div class="clearfix text-center" style="padding:15px 0;">
                                                <div class="hidden">
                                                    <label class="inline">
                                                        <input type="checkbox" class="ace" id="remember" name="remember" />
                                                        <span class="lbl"> Remember Me</span>
                                                    </label>
                                                </div>

                                                <button type="submit" class="text-center btn btn-primary btn-lg btn-block" id="login-submit" name="login" value="1">Login</button>

                                                <input type="hidden" name="token" value="2c35f021b01bb6087e780c4b9fd677fe"/>                                               
                                                <input type="hidden" name="pathRedirect" value=""/>
                                            </div>
                                        </div>

                                        <div class="col-xs-12">
                                            <div class="social-or-login center mb-5">
                                                Or Log in Using                                            </div>

                                            <div class="text-center" style="display: flex;flex-direction: column;align-items: center;">
                                               <!--  <a id="facebookLogin" href="#" class="btn btn-lighter btn-block btn-lg facebookLogin mb-3 flex-div-center"><img src="https://static.s123-cdn-network-a.com/admin/InterfaceStatisFiles/allOther/all/facebook.svg" style="height: 20px;width:auto;">&nbsp;&nbsp;Login with Facebook</a> -->
                                                <a id="googleLogin" href="<?= htmlspecialchars($login_url) ?>" class="btn btn-lighter btn-block btn-lg googleLogin mb-3 flex-div-center"><img src="https://static.s123-cdn-network-a.com/admin/InterfaceStatisFiles/allOther/all/google.svg" style="height: 20px;width:auto;">&nbsp;&nbsp;Login with Google</a>
                                            </div>
                                        </div>
                                    </div>
                                    </form>
                                    
                                </div>
                            </div>
                        </div>
                        
                        <div id="forgot-box" class="hidden forgot-box widget-box">
                            <div class="widget-header h-primary">
                                <h5 class="widget-title">Reset Password</h5>
                            </div>
                            <div class="widget-body">
                                <div class="widget-main">

                                    <div class="space-6"></div>
                                    <p>
                                        Enter your email to receive instructions                                    </p>

                                    <form action="forgot.php" method="post" name="forgotform" id="forgotform" class="form-stacked forgotform normal-label">
                                        <fieldset>


                                            <div class="form-group">
                                                <div class="input-group">
                                                    <input type="email" class="form-control input-lg" placeholder="Email Address" id="usernamemail" name="usernamemail" required data-msg-required="Please provide an email address." data-rule-email="true" data-msg-email="Please enter a valid email address." style="direction:ltr;" />
                                                    <span class="input-group-addon"><i class="fa fa-envelope"></i></span>
                                                </div>
                                            </div>

                                            <div class="form-group">
                                                <div class="clearfix text-center">
                                                    <br>
                                                    <button type="submit" class="btn btn-primary">
                                                        <i class="ace-icon fa fa-lightbulb-o"></i>
                                                        <span class="bigger-110">Send me instructions</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </fieldset>

                                        <input type="hidden" name="l" value="en"/>
                                    </form>
                                </div><!-- /.widget-main -->

                                <div class="center">
                                    <a href="/manager/login/login.php?l=en">
                                        Back to login                                        <i class="ace-icon fa fa-arrow-right"></i>
                                    </a>
                                </div>
                            </div>
                        </div>

                       <!--  <div class="toolbar center " style="background-color: transparent;padding:20px;">
                            <a href="#" class="btn btn-link back-to-login-link" style="color:white;">
                                <i class="fa fa-sign-in"></i>
                                New user? Sign up here.                            </a>
                        </div> -->
                    </div>
                    
                </div>
            </div>
        </div>


        <script src="https://cdn-cms-s-8-4.f-static.net/versions/2/system_mini/js/minimize_admin_p1.js?v=y84124391" crossorigin="anonymous"></script><script src="https://cdn-cms-s-8-4.f-static.net/versions/2/system_mini/js/minimize_admin_p2.js?v=y84124391" crossorigin="anonymous"></script><script src="https://cdn-cms-s-8-4.f-static.net/versions/2/system_mini/js/minimize_admin_p3.js?v=y84124391" crossorigin="anonymous"></script><script src="https://cdn-cms-s-8-4.f-static.net/versions/2/system_mini/js/minimize_admin_p4.js?v=y84124391" crossorigin="anonymous"></script><script src="https://cdn-cms-s-8-4.f-static.net/versions/2/system_mini/js/minimize_admin_p5.js?v=y84124391" crossorigin="anonymous"></script>
        <script src="https://cdn-cms-s-8-4.f-static.net/include/insideChat.js?v=y84124391" crossorigin="anonymous"></script>

        <!-- inline scripts related to this page -->
        <script type="text/javascript">
                       
            
            
            //you don't need this, just used for changing background
            jQuery(function($) {
                                insideChatWindow.init('website',false,false,'en','Need Help ?','Need Design?','b62a19437cb1487cf87e');
                
                   $('#loginIntegrationMessage').click(function() {
                    switch ($(this).data('type')) {
                        case 'facebook':
                            $('#facebookLogin')[0].click(); // trigger won't work on `href`
                            break;
                        case 'google':
                            $('#googleLogin')[0].click();   // trigger won't work on `href`
                            break;
                    }
                });


                $('#btn-login-dark').on('click', function(e) {
                    $('body').attr('class', 'login-layout');
                    $('#id-text2').attr('class', 'white');
                    $('#id-company-text').attr('class', 'blue');
                    
                    e.preventDefault();
                });
                $('#btn-login-light').on('click', function(e) {
                    $('body').attr('class', 'light-login');
                    $('#id-text2').attr('class', 'grey');
                    $('#id-company-text').attr('class', 'blue');
                    
                    e.preventDefault();
                });
                $('#btn-login-blur').on('click', function(e) {
                    $('body').attr('class', 'login-layout blur-login');
                    $('#id-text2').attr('class', 'white');
                    $('#id-company-text').attr('class', 'light-blue');
                    
                    e.preventDefault();
                });

                $("#login-form").validate({
                    highlight: function(element, errorClass) {
                        $(element).css('border','1px solid red');
                    },
                    errorPlacement: function(error, element) {
                        error.appendTo( element.parent("div").parent("div") );
                    },
                    onfocusout: function (element, event) {

                        //Get Objects
                        $element = $(element);

                        //Remove whitespace
                        if ( $element.is(':input') && !$element.is(':password') ) {
                            $element.val($.trim($element.val()));
                        }
                    }
                });

                $("#forgotform").validate({
                    highlight: function(element, errorClass) {
                        $(element).css('border','1px solid red');
                    },
                    errorPlacement: function(error, element) {
                        error.appendTo( element.parent("div").parent("div") );
                    },
                    onfocusout: function (element, event) {

                        //Get Objects
                        $element = $(element);

                        //Remove whitespace
                        if ( $element.is(':input') && !$element.is(':password') ) {
                            $element.val($.trim($element.val()));
                        }
                    }
                });

                // Initialize invalid email handler
                InvalidEmailHandler.ieh_init({
                    $email: $('#username'),
                    $emailSuggestion: $('#emailSuggestion'),
                    translations: {
                        emailSuggestion: "Did You Mean:"                    }
                });
            });
        </script>

        <script src="https://cdn-cms-s-8-4.f-static.net/versions/2/system_mini/js/minimizeSITE123_tracker.js?v=y84124391" crossorigin="anonymous"></script>       
    </body>
</html>