/* ######################################################### IMPORT FUNCTIONALITY ######################################################### */

import { menuClose, _slideToggle } from "./functions.js";
import { bodyLockStatus } from "./functions.js";
import { bodyUnlock } from "./functions.js";
import { bodyLockToggle } from "./functions.js";

/* ####################################################### INITIALIZATION OF PLUGINS ####################################################### */

// Initialization hystmodal
new HystModal({
	linkAttributeName: "data-popup",
	// other settings (not necessarily), see API
});

// Initialization OverlayScrollbars
const EntryTextArea = document.getElementById("caption");
let ScrollBarTextarea;

if (EntryTextArea) {
    document.addEventListener("DOMContentLoaded", function() {
        ScrollBarTextarea = OverlayScrollbars(EntryTextArea, {
            className : "os-theme-light",
        });
    });
}

/* ############################################################## LANG SELECT ############################################################## */

const LangMenu = document.querySelectorAll('.lang-menu');

LangMenu.forEach(el => {
    el.addEventListener('click', function(event){
        const target = event.target;
        const childs = Array.from(this.children);

        childs.forEach(el => {
            if (target === el && !target.classList.contains('active')) {
                childs.forEach(el => {
                    el.classList.remove('active');
                });
                target.classList.add('active');
            }
        });
    });
});

/* ########################################################### MOBILE MENU SEARCH ########################################################### */

const headerMobActions = document.querySelector('.header-mob');
const MobSearch = document.querySelector('.mob-search');

headerMobActions.addEventListener('click', function(event){
    const target = event.target;

    if (target.closest('#open-search')){
        MobSearch.classList.toggle('active');
        if (!document.documentElement.classList.contains("menu-open")){
            if (bodyLockStatus) {
                bodyLockToggle();
            }
        } else {
            menuClose();
        }
    }

    if (target.closest('#open-menu') && MobSearch.classList.contains('active')){
        MobSearch.classList.remove('active');
    }
});

/* ################################################################ MENU SORT ################################################################ */

const SortMenuSelect = document.querySelector('.sort-menu-inner__select');
const SortMenuList = document.querySelector('.sort-menu-inner__list');
const SortMenuField = document.querySelector('.sort-menu-inner__enter-field');

if (SortMenuSelect) {
    SortMenuSelect.addEventListener('click', function(event){
        const target = event.target;
    
        if (target.closest('.sort-menu-inner__enter-field')){
            SortMenuField.classList.toggle('open');
            SortMenuList.classList.toggle('open');
        }
    
        if (target.closest('.sort-menu-inner__item')){
            this.querySelector('input').value = target.textContent;
            SortMenuField.classList.remove('open');
            SortMenuList.classList.remove('open');
        }
    });
}

/* ################################################################ BUTTON UP ################################################################ */

const UpBtn = document.querySelector('.scroll-up-btn');

if (UpBtn) {
    function backToTop(){
        if (window.pageYOffset > 0){
            window.scrollBy(0, -80);
            setTimeout(backToTop, 10);
        }
    }
    
    UpBtn.addEventListener('click', () => {
        backToTop();
    });

    let scrolled = window.pageYOffset;

    if (scrolled >= 2000) {
        UpBtn.classList.add('show');
    }

    function ShowUpBtn(){
        scrolled = window.pageYOffset;
    
        if (scrolled >= 2000 && !UpBtn.classList.contains('show')) {
            UpBtn.classList.add('show');
        }
    
        if (scrolled < 2000 && UpBtn.classList.contains('show')) {
            UpBtn.classList.remove('show');
        }
    }

    window.addEventListener('scroll', ShowUpBtn);
}

/* ############################################################### FORM SELECT ############################################################### */

const selects = document.querySelectorAll('.select-form');
let isOpenSelectMenu = false;

if (selects) {
    selects.forEach(el => {
        el.addEventListener('click', function(event){
            const target = event.target;

            let CheckOpenMenus = document.querySelectorAll('.select-form.open');

            if (CheckOpenMenus.length > 0) {
                CheckOpenMenus.forEach(item => {
                    if (item !== this) {
                        item.classList.remove('open');
                        item.querySelector('.select-form__field').classList.remove('open');
                    }
                });
            }
    
            if (target.closest('.select-form__field')){
                this.classList.toggle('open');
                this.querySelector('.select-form__field').classList.toggle('open');
            }
    
            if (target.closest('.select-form__option')){
                this.querySelector('input').value = target.textContent;
                this.classList.remove('open');
                this.querySelector('.select-form__field').classList.remove('open');
            }

            // const opened = [...selects].find(item => item.classList.contains('open'));
            CheckOpenMenus = document.querySelectorAll('.select-form.open');

            if (CheckOpenMenus) {
                isOpenSelectMenu = true;
            } else {
                isOpenSelectMenu = false;
            }
        });
    });
}

/* ############################################################# CLOSE MENU OPENED ############################################################# */

document.addEventListener('click', function(event){
    const target = event.target;

    if (isOpenSelectMenu && !target.closest('.select-form')){
        selects.forEach(el => {
            el.classList.remove('open');
            el.querySelector('.select-form__field').classList.remove('open');
        });
    }
});

/* ########################################################### CONDENSE ALL COMMENTS ########################################################### */

const navComments = document.querySelector('.entry-comments__top');

if (navComments) {
    navComments.addEventListener('click', function(event){
        const target = event.target;
        const comments = this.nextElementSibling;
    
        if (target.closest('.entry-comments__show-all')){
            navComments.classList.toggle('active');
            _slideToggle(comments, 500);
        }
    });
}

/* ############################################################## ITEM CURRENT PAGE ############################################################## */

const ItemCurrentPage = () => {
    const items = document.querySelectorAll('.item-current-page a');
    const url = document.location.href;

    if (items) {
        for (let i = 0; i < items.length; i++){
            if (url === items[i].href && items[i].getAttribute('href') !== '' && items[i].getAttribute('href') !== '#'){
                items[i].classList.add('current');
            }
        }
    }
};
ItemCurrentPage();

/* ############################################################# UPLOAD FILES VIA INPUT ############################################################# */

const UploadImageItems = document.querySelectorAll('.upload-files__item');

function handleFiles(inputFile, preview) {
    preview.innerHTML = '';

    let file = inputFile.files[0];

    let img = document.createElement("img");
    img.file = file;
    preview.append(img);

    let reader = new FileReader();
    reader.onload = (function(aImg) {
        return function(e) {
            aImg.src = e.target.result;
        };
    })(img);

    reader.readAsDataURL(file);
}

if (UploadImageItems) {
    let fileTypes;

    function validFileType(file) {
        for (let i = 0; i < fileTypes.length; i++) {

            if(file.type === fileTypes[i]) {
                return true;
            }
        }
        return false;
    }

    UploadImageItems.forEach(el => {
        el.addEventListener('change', function(event){
            const target = event.target;

            if (target.closest('input[type="file"]')){
                const input = this.querySelector('input[type="file"]');
                const label = this.querySelector('.upload-files__file-name');
                let CurrentFile = input.files[0];
                fileTypes = input.accept.split(', ');

                if (!label.hasAttribute('data-placeholder')) {
                    label.setAttribute('data-placeholder', label.textContent);
                }

                if (validFileType(CurrentFile)) {
                    label.classList.remove('invalid');
                    label.innerHTML = CurrentFile.name;
                } else {
                    label.classList.add('invalid');
                    label.innerHTML = CurrentFile.name + ' Invalid file type.';
                    input.value = '';
                }
            }
        });

        el.addEventListener('click', function(event){
            const target = event.target;
            const input = this.querySelector('input[type="file"]');
            const label = this.querySelector('.upload-files__file-name');
            const previewBox = this.querySelector('.preview-photo');
            const previewImage = this.querySelector('.preview-photo__image');

            if (target.closest('.upload-files__view') && input.value !== '') {
                handleFiles(input, previewImage);
                previewBox.classList.toggle('active');
            }

            if (target.closest('.preview-photo__close')) {
                previewBox.classList.remove('active');
            }

            if (target.closest('.upload-files__delete')) {
                label.classList.remove('invalid');

                input.value = '';
                if (previewImage.querySelector('img')) {
                    previewImage.querySelector('img').remove();
                }
                
                if (label.hasAttribute('data-placeholder')) {
                    label.innerHTML = label.dataset.placeholder;
                }
            }
        });
    });
}

/* ############################################################### STICKY BLOCK ############################################################### */

/*
const aside = document.getElementById('aside');
const AsideNav = document.getElementById('aside-nav');
const footer = document.querySelector('.footer');

if (AsideNav) {
    const stickyBlock = () => {
        let scrollPage = window.scrollY;
        let AsideRect = aside.getBoundingClientRect();
        let AsideNavRect = AsideNav.getBoundingClientRect();
    
        window.addEventListener('scroll', function(){
            scrollPage = window.scrollY;
            if (scrollPage + AsideNavRect.height > AsideNavRect.height) {
                AsideNav.classList.add('sticky');
                // AsideNav.style.position = 'fixed';
                AsideNav.style.width = AsideRect.width + 'px';
                // AsideNav.style.left = aside.clientLeft + 'px';
            } else {
                AsideNav.style.width = '';
                AsideNav.classList.remove('sticky');
            }

            // console.log(footer.offsetTop);
    
            if (scrollPage + AsideNavRect.height >= footer.offsetTop) {
                // AsideNav.classList.remove('sticky');
                // aside.classList.add('flex');
            } else {
                // aside.classList.remove('flex');
            }
        });
    };

    window.addEventListener('load', () => {
        stickyBlock();
    });
}
*/

/* ############################################################### CHECK RESIZE ############################################################### */

const isResize = () => {
	if (window.innerWidth > 991 && document.documentElement.classList.contains("menu-open")) {
		if (bodyLockStatus) {
            bodyUnlock();
            menuClose();
        }
	}

    if (window.innerWidth > 767 && MobSearch.classList.contains("active")) {
        if (bodyLockStatus){
            bodyUnlock();
            MobSearch.classList.remove("active");
        }
	}

    if (EntryTextArea) {
        ScrollBarTextarea.update();
    }
};

window.addEventListener('resize', () => {
    isResize();
});