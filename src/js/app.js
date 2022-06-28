// Connecting the main styles file
import "../scss/style.scss";

// Plugins ============================================================================================================================================================================================================================================================================================================

// Dynamic adaptive 
import "./libs/dynamic_adapt.js";

// Hystmodal popup
import "./libs/hystmodal.min.js";

// Castle scroll 
import './libs/OverlayScrollbars.min.js';

// The main modules ========================================================================================================================================================================================================================================================
import * as flsFunctions from "./files/functions.js";

/* Webp support checking, adding Webp or No-WebP class for html */
/* (i) is necessary for the correct display of Webp from CSS  */
flsFunctions.isWebp();
/* Adding a Touch class for html if a mobile browser */
flsFunctions.addTouchClass();
/* Adding Loaded for HTML after full loading of the page */
flsFunctions.addLoadedClass();
/* Module for working with menu (burger) */
flsFunctions.menuOpen();
/* Accounting for a floating panel on mobile devices at 100VH */
// flsFunctions.fullVHfix();

/*
Module for working with spoilers
Documentation:
SNIPPET (HTML): Spollers
*/
flsFunctions.spollers();

// Work with forms ========================================================================================================================================================================================================================================================
import * as flsForms from "./files/forms/forms.js";

/* Work with form fields.Adding classes, working with PLACEHOLDER */
flsForms.formFieldsInit();

// Work with a slider (Swiper) ========================================================================================================================================================================================================================================================
/*
Settling the Swiler slider connection and new sliders are performed in the JS/Files/Sliders.js file
Documentation for work in the template:
Pligin documentation: https://swiperjs.com/
SNIPPET (HTML): Swiper
*/

import "./files/sliders.js";

// Other ========================================================================================================================================================================================================================================================
/* We connect a file with your code */
import "./files/script.js";
//============================================================================================================================================================================================================================================