// Импорт функционала ====================================================================================================================================================================================================================================================================================================
// Вспомогательные функции
// import { isMobile } from "../functions.js";
//==============================================================================================================================================================================================================================================================================================================================

/* 
Модуль плавной проктутки к блоку
Документация:
*/

// Подключение дополнения 
import "../../libs/smoothScroll.js";
// Функция
export let gotoBlock = (targetBlock, noHeader = false, speed = 500, offset = 0) => {
	let headerItem = '';
	//OffsetHeader
	if (noHeader) {
		headerItem = 'header.header';
	}
	let options = {
		speedAsDuration: true,
		speed: speed,
		header: headerItem,
		offset: offset,
		easing: 'easeOutQuad',
	};
	const targetBlockElement = document.querySelector(targetBlock);
	targetBlockElement ? new SmoothScroll().animateScroll(targetBlockElement, '', options) : console.log(`[gotoBlock] - Такого блока нет: ${targetBlock}`);
};