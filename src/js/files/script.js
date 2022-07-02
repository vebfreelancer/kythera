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
const EntryTextArea = document.querySelector("textarea[name=textarea]");
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

/* ################################################################# UPLOAD FILES ################################################################# */

const FormNewEntry = document.getElementById('upload-new-entry-form');
const DragAndDrop = document.querySelectorAll('.drag-drop');

const ImageFiles = [];
const MediaFiles = [];

function validFileType(file, fileTypes) {
    for (let i = 0; i < fileTypes.length; i++) {

        if(file.type === fileTypes[i]) {
            return true;
        }
    }
    return false;
}

const li = `<li class="list-files__item"> 
                <div class="list-files__wrap">
                    <div class="list-files__picture">
                        <span class="list-files__marker">1</span>
                        <img src="img/icons/file-icon.svg" alt="picture">
                    </div>
                    <span class="list-files__file-name">select your photo (jpg, png, tiff)</span>
                </div>
                <div class="list-files__buttons">
                    <button type="button" class="list-files__view">View</button>
                    <button type="button" class="list-files__delete">Delete</button>
                </div>
                <div class="preview-box">
                    <div class="preview-box__wrap">
                        <div class="preview-box__window">
                            <div class="preview-box__close">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                    <g data-name="Group 229" transform="translate(-866.101 -18.101)">
                                        <rect data-name="Rectangle 91" width="29.092" height="4.849" transform="translate(869.529 18.101) rotate(45)"/>
                                        <rect data-name="Rectangle 92" width="29.092" height="4.849" transform="translate(866.101 38.672) rotate(-45)"/>
                                    </g>
                                </svg>
                            </div>
                            <div class="preview-box__file"></div>
                        </div>
                    </div>
                </div>
            </li>`;

function handleFiles(files, ThisBlock) {
    const ListFiles = ThisBlock.querySelector('.list-files');
    const ResetButton = document.querySelector('.form-buttons__reset');
    const input = ThisBlock.querySelector('.drop-files-input');
    const FileTypes = input.accept.split(', ');

    if (ListFiles.children.length > 0) {
        ListFiles.querySelectorAll('li').forEach(el => el.remove());
    }

    if (ThisBlock.dataset.files === 'image') {

        for (let i = 0; i < files.length; i++) {
            const valid = validFileType(files[i], FileTypes);
            const unique = !ImageFiles.find(item => item.name === files[i].name);

            if (valid && ImageFiles.length < 3 && unique) {
                ImageFiles.push(files[i]);
            }
        }

        for (let i = 0; i < ImageFiles.length; i++){
            ListFiles.insertAdjacentHTML('afterBegin', li);
        }
    }

    if (ThisBlock.dataset.files === 'media') {
        const maxsize = Number(input.dataset.sizeMb);

        for (let i = 0; i < files.length; i++) {
            const valid = validFileType(files[i], FileTypes);
            const unique = !MediaFiles.find(item => item.name === files[i].name);
            const size = Number((files[i].size / (1024*1024)).toFixed(2));

            if (valid && unique && size <= maxsize) {
                MediaFiles.push(files[i]);
            }
        }

        for (let i = 0; i < MediaFiles.length; i++){
            ListFiles.insertAdjacentHTML('afterBegin', li);
        }
    }

    const markers = ThisBlock.querySelectorAll('.list-files__marker');
    const filename = ThisBlock.querySelectorAll('.list-files__file-name');
    const outFiles = ThisBlock.querySelectorAll('.preview-box__file');

    let DT = new DataTransfer();

    if (ThisBlock.dataset.files === 'image') {

        for (let i = 0; i < ImageFiles.length; i++){
            let file = ImageFiles[i];
            let img = document.createElement("img");
            img.file = file;

            outFiles[i].append(img);
            markers[i].textContent = i + 1;
            filename[i].textContent = file.name;

            let reader = new FileReader();
            reader.onload = (function(aImg) {
                return function(e) {
                    aImg.src = e.target.result;
                };
            })(img);

            reader.readAsDataURL(file);
            DT.items.add(file);
        }

        files = DT.files;
        input.files = files;
    }

    if (ThisBlock.dataset.files === 'media') {

        for (let i = 0; i < MediaFiles.length; i++) {
            let file = MediaFiles[i];

            let reader = new FileReader();
            DT.items.add(file);

            if (file.type.slice(0,5) === 'video') {
                let video = document.createElement("video");
                video.setAttribute('controls', '');
                video.setAttribute('muted', '');
                video.file = file;
                outFiles[i].append(video);
                outFiles[i].classList.add('video-file');

                reader.onload = (function(aVideo) {
                    return function(e) {
                        aVideo.src = e.target.result;
                    };
                })(video);
            }

            if (file.type.slice(0,5) === 'audio') {
                let audio = document.createElement("audio");
                audio.setAttribute('controls', '');
                audio.file = file;
                outFiles[i].append(audio);
                outFiles[i].classList.add('audio-file');

                reader.onload = (function(aVideo) {
                    return function(e) {
                        aVideo.src = e.target.result;
                    };
                })(audio);
            }

            reader.readAsDataURL(file);

            markers[i].textContent = i + 1;
            filename[i].textContent = file.name;
        }

        files = DT.files;
        input.files = files;
    }

    ViewDeleteFile(ThisBlock);

    ResetButton.addEventListener('click', () => {
        if (input.value !== '') {
            document.querySelectorAll('.list-files__item').forEach(el => el.remove());
        }
    });
}

function ViewDeleteFile(ThisBlock) {
    const items = ThisBlock.querySelectorAll('.list-files__item');

    items.forEach(el => {
        el.addEventListener('click', function(event) {
            const target = event.target;
            const preview = this.querySelector('.preview-box');
            const video = this.querySelector('.preview-box__file video');
            const audio = this.querySelector('.preview-box__file audio');

            if (target.closest('.list-files__view')){
                preview.classList.add('active');
            }

            if (target.closest('.preview-box__close')){
                preview.classList.remove('active');

                if (audio) {
                    audio.pause();
                }

                if (video) {
                    video.pause();
                }
            }

            if (target.closest('.list-files__delete')){
                const FileName = this.querySelector('.list-files__file-name').textContent;
                
                if (ThisBlock.dataset.files === 'image') {
                    const IndexFile = ImageFiles.findIndex(item => item.name === FileName);
                    ImageFiles.splice(IndexFile, 1);
                    handleFiles(ImageFiles, ThisBlock);
                }

                if (ThisBlock.dataset.files === 'media') {
                    const IndexFile = MediaFiles.findIndex(item => item.name === FileName);
                    MediaFiles.splice(IndexFile, 1);
                    handleFiles(MediaFiles, ThisBlock);
                }
            }
        });
    });
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

    let targetTransfer = event.dataTransfer;
    let files = targetTransfer.files;
    handleFiles(files, this);
}

if (FormNewEntry) {
    DragAndDrop.forEach(el => {
        el.addEventListener("dragenter", dragenter, false);
        el.addEventListener("dragover", dragover, false);
        el.addEventListener("drop", drop, false);

        el.addEventListener('change', function(event) {
            const target = event.target;
            const files = this.querySelector('.drop-files-input').files;

            if (target.closest('.drop-files-input')){
                handleFiles(files, this);
            }
        });
    });
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