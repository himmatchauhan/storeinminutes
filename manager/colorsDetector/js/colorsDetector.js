/**
 * Colors Handlers - The object include a set of functions that
 * we can works on colors to detect what we need.
 */
const ColorsDetector = function() {

	// set object
	const _ = {};

	 /**
	  * The function check if a color is to light/dark.
	  * Source: https://stackoverflow.com/a/12043228/469161
	  */
	_.isLightDarkColor = function ( c ) {
		// set objects 
		var c = c.substring(1);      // strip #
		var rgb = parseInt(c, 16);   // convert rrggbb to decimal
		var r = (rgb >> 16) & 0xff;  // extract red
		var g = (rgb >>  8) & 0xff;  // extract green
		var b = (rgb >>  0) & 0xff;  // extract blue
		// set luma 
		var luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709
		// return color state
		return luma > 200 ? 'light' : 'dark';
	};

	 /**
	  * The method is returning lighter color version
	  */
	_.getLighterColor = function( color ) {
		// get the bright version of the color
		var lightColor = tinycolor(color).toRgb();
		lightColor = tinycolor(lightColor).toHsl();
		lightColor.l = 0.9;
		lightColor = tinycolor(lightColor).toRgb();
		lightColor = tinycolor(lightColor).toHexString();
		// return the lighter color
		return lightColor;
	};

	 /**
	  * The method is returning darker color version
	  */
	_.getDrakerColor = function( color ) {
		// get the dark version of the color
		var darkColor = tinycolor(color).toRgb();
		darkColor = tinycolor(darkColor).toHsl();
		darkColor.l = 0.2;
		darkColor = tinycolor(darkColor).toRgb();
		darkColor = tinycolor(darkColor).toHexString();
		// return the darker color
		return darkColor;
	};

	/*
	* The method is returning color delta between two hex colors
	* https://stackoverflow.com/questions/22692134/detect-similar-colours-from-hex-values
	*/
	_.hexColorDelta = function(hex1, hex2) {
		var hex1 = hex1.substring(1); // strip #
		var hex2 = hex2.substring(1); // strip #
		// get red/green/blue int values of hex1
		var r1 = parseInt(hex1.substring(0, 2), 16);
		var g1 = parseInt(hex1.substring(2, 4), 16);
		var b1 = parseInt(hex1.substring(4, 6), 16);
		// get red/green/blue int values of hex2
		var r2 = parseInt(hex2.substring(0, 2), 16);
		var g2 = parseInt(hex2.substring(2, 4), 16);
		var b2 = parseInt(hex2.substring(4, 6), 16);
		// calculate differences between reds, greens and blues
		var r = 255 - Math.abs(r1 - r2);
		var g = 255 - Math.abs(g1 - g2);
		var b = 255 - Math.abs(b1 - b2);
		// limit differences between 0 and 1
		r /= 255;
		g /= 255;
		b /= 255;
		// 0 means opposite colors, 1 means same colors
		return (r + g + b) / 3;
	}

	/**
	 * The method is returning color delta between two hex colors
	 * Documentation: https://www.splitbrain.org/blog/2008-09/18-calculating_color_contrast_with_php
	 */
	_.getBrightnessDiff = function(hex1, hex2) {
		// get decimal value from hex
		const R1 = parseInt(hex1.substr(1, 2), 16);
		const G1 = parseInt(hex1.substr(3, 2), 16);
		const B1 = parseInt(hex1.substr(5, 2), 16);
		// get decimal value from hex
		const R2 = parseInt(hex2.substr(1, 2), 16);
		const G2 = parseInt(hex2.substr(3, 2), 16);
		const B2 = parseInt(hex2.substr(5, 2), 16);
		// compare brightness values
		const BR1 = (299 * R1 + 587 * G1 + 114 * B1) / 1000;
		const BR2 = (299 * R2 + 587 * G2 + 114 * B2) / 1000;
		// return the result
		return Math.abs(BR1 - BR2);
	}

	/**
	 * The method is returning color delta between two hex colors
	 * Documentation: https://www.splitbrain.org/blog/2008-09/18-calculating_color_contrast_with_php
	 */
	_.getColorBestBrightnessDiff = function( mainColor, colorsToCompare ) {
		/**
		 * set comparing sensitivity, for extremely dark or bright colors we want full sensitivity
		 * for other colors use almost half. According to the article in the documentation it is
		 * recommended score of more then 125 as the high sensitivity.
		 * 
		 * Documentation: https://www.splitbrain.org/blog/2008-09/18-calculating_color_contrast_with_php
		 */
		const sensitivity = ['#000000','#ffffff'].includes(mainColor) ? 125 : 50;
		// add brightness score
		colorsToCompare = colorsToCompare.map(function( colorObj,index ) {
			// add score property
			colorObj.score = _.getBrightnessDiff(mainColor,colorObj.color);
			// check if the score is good enough and if not set -1 to be the minimum
			if ( colorObj.score < sensitivity ) colorObj.score = -1;
			// return color object
			return colorObj;
		});
		// sort by desc score and priority
		colorsToCompare.sort(function(a, b) {
			if (b.score !== a.score) {
				return b.score - a.score;
			}
			return a.priority - b.priority;
		});
		// return the data object
		return {
			score: colorsToCompare[0].score,
			color: colorsToCompare[0].color,
			colorsToCompare: colorsToCompare,
			isLight: !tinycolor(colorsToCompare[0].color).isDark(),
			colorBrightnessValue: _.getColorBrightness(colorsToCompare[0].color)
		};
	}

	/**
	 * The method is returning the color  
	 */
	_.getColorBrightness = function ( color ) {
		// get the numeric values of the red, green, and blue channels of the color
		const r = parseInt(color.substr(1, 2), 16);
		const g = parseInt(color.substr(3, 2), 16);
		const b = parseInt(color.substr(5, 2), 16);
		// calculate the luminance of the color
		const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
		// return true if the luminance is above a threshold value (e.g. 128), or false otherwise
		return luminance;
	}

	// Return the object
	return _;
}();
