/* ######################################################### IMPORT FUNCTIONALITY ######################################################### */

import { 
    menuClose, 
    _slideToggle, 
    bodyLockStatus, 
    bodyUnlock, 
    bodyLockToggle 
} from "./functions.js";

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

/* ############################################################# UPLOAD FILES ############################################################# */

const FormNewEntry = document.getElementById('upload-new-entry');
const DragAndDrop = document.querySelectorAll('.drag-drop');
const FilesArray = [];
let fileTypes;

function validFileType(file) {
    for (let i = 0; i < fileTypes.length; i++) {

        if(file.type === fileTypes[i]) {
            return true;
        }
    }
    return false;
}

const li = `<li class="list-files__item"> 
                <span class="list-files__marker">1</span>
                <svg data-name="Group 143" xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="27.942" height="24" viewBox="0 0 27.942 24">
                    <path data-name="Path 129" d="M1538.087,1471.851H1526.05a1.766,1.766,0,0,1-1.934-1.939q0-10.046,0-20.092a1.773,1.773,0,0,1,1.966-1.969h24.042a1.766,1.766,0,0,1,1.934,1.939q0,10.062,0,20.123a1.768,1.768,0,0,1-1.935,1.938Zm-11.975-5c.145-.172.237-.28.327-.389q3.7-4.473,7.4-8.946a1.407,1.407,0,0,1,2.376-.077c1.118,1.2,2.226,2.42,3.355,3.614a1.022,1.022,0,0,0,1.573.079c.372-.3.731-.617,1.1-.925a1.075,1.075,0,0,1,1.751.115q2.937,3.172,5.876,6.342c.046.049.1.093.192.182v-.271q-.007-7.905-.015-15.81c0-.625-.31-.919-.954-.919h-22.012c-.666,0-.969.305-.969.973q0,7.826,0,15.653Z" transform="translate(-1524.116 -1447.851)"/>
                    <path data-name="Path 130" d="M1817.607,1514.881a2.994,2.994,0,1,1-2.989-3A3,3,0,0,1,1817.607,1514.881Z" transform="translate(-1793.657 -1507.876)"/>
                </svg>
                <span class="list-files__file-name">select your photo (jpg, png, tiff)</span>
                <div class="list-files__buttons">
                    <button type="button" class="list-files__view">View</button>
                    <button type="button" class="list-files__delete">Delete</button>
                </div>
                <div class="preview-box">
                    <div class="preview-box__wrap">
                        <div class="preview-box__window">
                            <div class="preview-box__close">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="24" height="24" viewBox="0 0 24 24">
                                    <g data-name="Group 229" transform="translate(-866.101 -18.101)">
                                        <rect data-name="Rectangle 91" width="29.092" height="4.849" transform="translate(869.529 18.101) rotate(45)"/>
                                        <rect data-name="Rectangle 92" width="29.092" height="4.849" transform="translate(866.101 38.672) rotate(-45)"/>
                                    </g>
                                </svg>
                            </div>
                            <div class="preview-box__image"></div>
                        </div>
                    </div>
                </div>
            </li>`;

function handleFiles(files, dropblock) {
    const ListFiles = dropblock.querySelector('.list-files');

    if (ListFiles.children.length > 0) {
        ListFiles.querySelectorAll('li').forEach(el => el.remove());
    }

    for (let i = 0; i < files.length; i++){
        ListFiles.insertAdjacentHTML('afterBegin', li);
    }

    const outimage = dropblock.querySelectorAll('.preview-box__image');
    const markers = document.querySelectorAll('.list-files__marker');
    const filename = dropblock.querySelectorAll('.list-files__file-name');

    for (let i = 0; i < files.length; i++){
        let file = files[i];

        let img = document.createElement("img");
        img.file = file;
        outimage[i].append(img);
        markers[i].textContent = i + 1;
        filename[i].textContent = file.name;

        let reader = new FileReader();
        reader.onload = (function(aImg) {
            return function(e) {
                aImg.src = e.target.result;
            };
        })(img);

        reader.readAsDataURL(file);
    }
}

function dragenter(event) {
    event.stopPropagation();
    event.preventDefault();
}

function dragover(event) {
    event.stopPropagation();
    event.preventDefault();
}

function drop(event) {
    event.stopPropagation();
    event.preventDefault();

    let dropTransfer = event.dataTransfer;
    let files = dropTransfer.files;

    if (FilesArray.length === 0) {
        for (let i = 0; i < files.length; i++){
            FilesArray.push(files[i]);
        }
    } else {
        for (let i = 0; i < files.length; i++){
            if (!FilesArray.find(item => item.name === files[i].name)){
                FilesArray.push(files[i]);
            }
        }

        let DT = new DataTransfer();
        FilesArray.forEach(file => DT.items.add(file));
        files = DT.files;
    }
        
    handleFiles(files, this);

    const input = this.querySelector('.drop-files-input');
    input.files = files;
}

if (FormNewEntry) {
    DragAndDrop.forEach(el => {
        el.addEventListener("dragenter", dragenter, false);
        el.addEventListener("dragover", dragover, false);
        el.addEventListener("drop", drop, false);

        el.addEventListener('change', function(event) {
            const target = event.target;
            const files = this.querySelector('.drop-files-input').files;
            const dropbox = this.querySelector('.drag-drop__box');

            if (target.closest('.drop-files-input')){
                handleFiles(files, dropbox);
                // console.log('input.files: ', files);
            }
        });

        el.addEventListener('click', function(event) {
            const target = event.target;
            const listFiles = this.querySelector('.list-files');

            if (target.closest('.list-files__delete')){
                // listFiles.querySelectorAll('li').forEach(el => el.remove());
                // FilesArray.splice(0, 1);
                // let dt = new DataTransfer();

                // FilesArray.forEach(file => {
                //     dt.items.add(file);
                // });

                // files = dt.files;
                console.log(1);
            }
        });
    });

    /*
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
            const previewBox = this.querySelector('.preview-box');
            const previewImage = this.querySelector('.preview-box__image');

            if (target.closest('.upload-files__view') && input.value !== '') {
                previewImage.innerHTML = '';
                handleFiles(input.files, previewImage);
                previewBox.classList.toggle('active');
            }

            if (target.closest('.preview-box__close')) {
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
    */
}

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