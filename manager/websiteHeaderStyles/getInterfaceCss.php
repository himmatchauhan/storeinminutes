#moduleHeaderStyles .pageheaderStylesContainer {
			display: grid;
		    grid-gap: 5px;
		    grid-auto-rows: auto;
		    grid-auto-columns: 100%;
		    overflow-y: auto;
		    height: 100%;
		}
		#moduleHeaderStyles .readyHeaderStyle {
			color: var(--modules_color_text);
			color: var(--modules_color_text);
		    background: var(--modules_color);
			background: var(--modules_color);
		    padding: 5px 5px;
		    text-align: center;
		    font-size: 3rem;
		}
		#moduleHeaderStyles .readyHeaderStyle:hover {
			cursor: pointer;
		}
		#moduleHeaderStyles .readyHeaderStyle hr {
			max-width: 50px;
		    border-color: var(--modules_color_section_main);
			border-color: var(--modules_color_section_main);
		    border-width: 3px;
		    padding: 0;
		    margin-top: 10px;
		    margin-bottom: 10px;
		}
		                /* Header Style 2 - border bottom text width */    
        .modulesTitle .pageHeaderBorderBottom {
            border-bottom: 3px solid var(--global_main_color);
            padding: 0 0 10px 0;
            display: inline-block;
        }
        /* Custom section primary color */
        .home_page .s123-module.bg-primary .modulesTitle .pageHeaderBorderBottom {
            border-bottom-color: var(--section-title-color, var(--modules_color_section_main));
        }
        .home_page .s123-module .modulesTitle .pageHeaderBorderBottom {
            border-bottom-color: var(--section-title-color, var(--modules_color_second_section_main));
        }
        .inside_page .s123-module .modulesTitle .pageHeaderBorderBottom {
            border-bottom-color: var(--section-title-color, var(--inside_modules_color_section_box_main));
        }
        .modulesTitle .pageHeaderBorderBottom.extraSidePadding {
            padding: 0 20px 10px 20px;
        }
        .rich_page .r-c-f-c .mainColor .pageHeaderBorderBottom {
			border-color: var(--modules_color_second_section_btn_text) !important;
		}
        .inside_page .s123-module .mainColor .pageHeaderBorderBottom {
            border-color: var(--inside_modules_color_section_btn_text) !important;
        }
                                /* Header Style 3 - lines from each side of the text */
        .modulesTitle .s123-page-header.pageHeaderLineEachSide:before,
        .modulesTitle .s123-page-header.pageHeaderLineEachSide:after,
        .modulesTitle .s123-page-slogan.pageHeaderLineEachSide:before,
        .modulesTitle .s123-page-slogan.pageHeaderLineEachSide:after {
            margin: auto 20px;
            content: "-";
        }
                        /* Header Style 4 - thin lines from each side of the text */    
		.modulesTitle .pageHeaderThinLineEachSide:before,
		.modulesTitle .pageHeaderThinLineEachSide:after {
		    content: "";
		    height: .1em;
		    width: 0.6em;
		    margin: 0 0.1em;
		    background: var(--section-title-color, var(--modules_color_section_main));
		    vertical-align: middle;
		    display: inline-block;
		    transform: translateY(-100%);
		}
        .bg-primary .modulesTitle .pageHeaderThinLineEachSide:before,
        .bg-primary .modulesTitle .pageHeaderThinLineEachSide:after {
            background-color: var(--modules_color_text);
        }
        .inside_page .bg-primary .modulesTitle .pageHeaderThinLineEachSide:before,
        .inside_page .bg-primary .modulesTitle .pageHeaderThinLineEachSide:after {
            background-color: var(--inside_modules_color_text);
        }
		.rich_page .r-c-f-c .mainColor .pageHeaderThinLineEachSide:before,
		.rich_page .r-c-f-c .mainColor .pageHeaderThinLineEachSide:after {
			background: var(--modules_color_second_section_btn_text) !important;			
		}
		.inside_page .s123-module .mainColor .pageHeaderThinLineEachSide:before,
		.inside_page .s123-module .mainColor .pageHeaderThinLineEachSide:after {
		    background: var(--inside_modules_color_section_btn_text) !important;
		}
                        /* Header Style 6 - hr from the side */    
		.modulesTitle .pageHeaderLineLeftMainColor:before {
		    content: "";
		    height: .1em;
		    width: 0.6em;
		    margin: 0 0.1em;
		    background: var(--global_main_color);
		    vertical-align: middle;
		    display: inline-block;
		}
		.s123-module .modulesTitle .pageHeaderLineLeftMainColor:before {
			transform: translateY(-100%);
		}
		html[dir="rtl"] .s123-module .modulesTitle .pageHeaderLineLeftMainColor:before  {
		    transform: translateY(-50%);
		}

		.rich_page .r-c-f-c .mainColor .pageHeaderLineLeftMainColor:before {
			background: var(--modules_color_second_section_btn_text) !important;
		}
		.inside_page .s123-module .mainColor .pageHeaderLineLeftMainColor:before {
		    background: var(--inside_modules_color_section_btn_text) !important;
		}
        .modulesTitle .page-header-wrap {
            text-align: left;
        }
        html[dir="rtl"] .modulesTitle .page-header-wrap {
            text-align: right;
        }
                        /* Header Style 7 - three dots separator */    
		.modulesTitle .three-dots span {
		    width: 10px;
		    height: 10px;
		    border-radius: 50%;
		    background-color: var(--global_main_color);
		    display: inline-block;
		    margin: 0 3px;
		}
		.rich_page .r-c-f-c .mainColor .three-dots span {
			background-color: var(--modules_color_second_section_btn_text);
		}
		.inside_page .s123-module .mainColor .three-dots span {
		    background-color: var(--inside_modules_color_section_btn_text);
		}
        .home_page .s123-module.bg-primary .modulesTitle .three-dots span {
            background-color: var(--section-title-color, var(--modules_color_section_main));
        }
        .home_page .s123-module .modulesTitle .three-dots span {
            background-color: var(--section-title-color, var(--modules_color_second_section_main));
        }
        .inside_page .modulesTitle .three-dots span {
            background-color: var(--section-title-color, var(--inside_modules_color_section_box_main));
        }
                        /* Header Style 8 - three angle down separator */    
		.modulesTitle .three-angle-down {
		    letter-spacing: -8px;
		    color: var(--section-title-color, var(--modules_color_second_section_main));
		}
		.bg-primary .modulesTitle .three-angle-down {
		    color: var(--section-title-color, var(--modules_color_section_main));
		}
		.inside_page .modulesTitle .three-angle-down {
		    color: var(--section-title-color, var(--inside_modules_color_section_box_main));
		}
		.modulesTitle .three-angle-down i {
		    font-size: 50px;
		    font-weight: bold;
		}
		.rich_page .r-c-f-c .mainColor .three-angle-down {
			color: var(--modules_color_second_section_btn_text) !important;
		}
		.inside_page .s123-module .mainColor .three-angle-down {
		    color: var(--inside_modules_color_section_btn_text) !important;;
		}
                        /* Header Style 9 - thin line separator */    
		.modulesTitle hr.thinLineSeparator {
		    max-width: 5%;
		    border-width: 1px !important;
		}
                        /* Header Style 10 - dot with a thin line separator */
		.modulesTitle .dot-and-line {
		    display: flex;
		    align-items: center;
            justify-content: center;
		}
		.modulesTitle .dot-and-line span {
		    width: 6px;
		    height: 6px;
		    border-radius: 50%;
		    background-color: var(--global_main_color);
		    display: block;
		    margin: 0 18px 0 0;
		}
		.modulesTitle .dot-and-line hr.thinLineSeparator {
		    margin: 0;
		    width: 83px;
		    max-width: none !important;
		    border-color: var(--modules_color_text_second) !important;
		    opacity: 0.2;
		    border-width: 2.2px !important;
		}
		.bg-primary .modulesTitle .dot-and-line hr.thinLineSeparator {
			border-color: var(--modules_color_text) !important;	
		}
		.inside_page .modulesTitle .dot-and-line hr.thinLineSeparator {
		    border-color: var(--inside_modules_color_text) !important;
		}
		html[dir="rtl"] .modulesTitle .dot-and-line span {
		    margin: 0 0 0 18px;
		}
		.modulesTitle .dot-and-line span {
			background-color: var(--section-title-color, var(--modules_color_second_section_main));
		}
		.bg-primary .modulesTitle .dot-and-line span {
			background-color: var(--section-title-color, var(--modules_color_section_main));
		}
		.inside_page .modulesTitle .dot-and-line span {
		    background-color: var(--section-title-color, var(--inside_modules_color_section_box_main));
		}
		.rich_page .r-c-f-c .mainColor .dot-and-line span {
			background-color: var(--modules_color_second_section_btn_text) !important;
		}
		.inside_page .s123-module .mainColor .dot-and-line span {
		    background-color: var(--inside_modules_color_section_btn_text) !important;
		}
                        /* Header Style 11 - dot from the side */    
		.modulesTitle .pageHeaderSideDot:before {
		    content: "";
		    width: 0.4em;
		    height: 0.4em;
		    border-radius: 50%;
		    margin-right: 5px;
		    display: inline-block;
		    background-color: var(--global_main_color);
		    vertical-align: middle;
		}
		.s123-module .modulesTitle .pageHeaderSideDot:before {
			margin-bottom: 0.2em;
		}
		html[dir="rtl"] .modulesTitle .pageHeaderSideDot:before {
		    margin-bottom: 0;
		}
		.rich_page .r-c-f-c .mainColor .pageHeaderSideDot:before {
			background-color: var(--modules_color_second_section_btn_text) !important;
		}
		.inside_page .s123-module .mainColor .pageHeaderSideDot:before {
		    background-color: var(--inside_modules_color_section_btn_text) !important;
		}
                        /* Header Style 12 - dot line dot */    
		.modulesTitle .dot-line-dot {
		    display: inline-flex;
		}
		.modulesTitle .dot-line-dot hr {
		    min-width: 40px;
		    border-width: 0.5rem;
		    border-top-right-radius: 5px;
		    border-bottom-right-radius: 5px;
		    border-top-left-radius: 5px;
		    border-bottom-left-radius: 5px;
		}
		.modulesTitle .dot-line-dot span {
		    width: 0.5rem;
		    height: 0.5rem;
		    border-radius: 50%;
		    background-color: var(--section-title-color, var(--modules_color_second_section_main));
		    opacity: 0.2;
		    margin: 0 8px;
		    align-self: center;
		    display: inline-block;
		}
		.bg-primary .modulesTitle .dot-line-dot span {
			background-color: var(--section-title-color, var(--modules_color_section_main));
		}
		.inside_page .modulesTitle .dot-line-dot span {
			background-color: var(--section-title-color, var(--inside_modules_color_section_box_main));
		}
        	
		#moduleHeaderStyles .readyHeaderStyle[data-style="5"] {
			display: flex;
    		align-items: flex-end;
            padding-bottom: 10px;
		}
		#moduleHeaderStyles .readyHeaderStyle[data-style="5"] .s123-page-header {
			margin: 0 20px;
            padding-bottom: 5px;
		}
		#moduleHeaderStyles .readyHeaderStyle[data-style="8"] .pageHeaderBorderBottom {
			border-bottom-color: var(--modules_color_section_main) !important;
			border-bottom-color: var(--modules_color_section_main) !important;
		}
		#moduleHeaderStyles .readyHeaderStyle[data-style="9"],
		#moduleHeaderStyles .readyHeaderStyle[data-style="10"] {
			display: flex;
		    align-items: center;
		    justify-content: center;
		    font-size: 4rem;
		    font-weight: bold;
		}
		#moduleHeaderStyles .readyHeaderStyle[data-style="11"],
		#moduleHeaderStyles .readyHeaderStyle[data-style="13"],
		#moduleHeaderStyles .readyHeaderStyle[data-style="14"] {
			font-weight: bold;
		}
		#moduleHeaderStyles .readyHeaderStyle[data-style="14"] {
		    display: flex;
    		align-content: flex-end;
    		align-items: center;
		}
		#moduleHeaderStyles .readyHeaderStyle[data-style="14"] .s123-page-header {
			margin: 0 20px;
		}
        #moduleHeaderStyles .readyHeaderStyle[data-style="15"] .s123-page-header {
            margin-bottom: 10px;
        }
        #moduleHeaderStyles .readyHeaderStyle[data-style="15"] .three-dots {
            display: flex;
            justify-content: center;
        }
		#moduleHeaderStyles .readyHeaderStyle[data-style="15"] .three-dots span {
			background-color: var(--modules_color_section_main) !important;
			background-color: var(--modules_color_section_main) !important;
		}
		#moduleHeaderStyles .readyHeaderStyle[data-style="16"] .three-angle-down {
			color: var(--modules_color_section_main) !important;
			color: var(--modules_color_section_main) !important;
		}
		#moduleHeaderStyles .readyHeaderStyle[data-style="18"] .dot-and-line span {
			background-color: var(--modules_color_section_main) !important;
			background-color: var(--modules_color_section_main) !important;
		}
		#moduleHeaderStyles .readyHeaderStyle[data-style="18"] .dot-and-line hr.thinLineSeparator {
			border-color: var(--modules_color_text) !important;
			border-color: var(--modules_color_text) !important;
		}
		#moduleHeaderStyles .readyHeaderStyle[data-style="19"] .pageHeaderThinLineEachSide::before,
		#moduleHeaderStyles .readyHeaderStyle[data-style="19"] .pageHeaderThinLineEachSide::after {
			background-color: var(--modules_color_section_main) !important;
			background-color: var(--modules_color_section_main) !important;
		}
        #moduleHeaderStyles .readyHeaderStyle[data-style="19"],
        #moduleHeaderStyles .readyHeaderStyle[data-style="20"] {
            display: flex;
            align-items: center;
            justify-content: center;
        }
        #moduleHeaderStyles .readyHeaderStyle[data-style="16"],
        #moduleHeaderStyles .readyHeaderStyle[data-style="21"] {
            display: flex;
            flex-direction: column;
        }
        #moduleHeaderStyles .readyHeaderStyle[data-style="16"] .three-angle-down i {
            line-height: 0.5;
        }
        #moduleHeaderStyles .readyHeaderStyle[data-style="21"] .dot-line-dot {
            align-self: center;
        }
	