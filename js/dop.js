function tabscostume(tab) {
	let tabs = {
		Btn: [].slice.call(document.querySelectorAll(`.${tab}__btn`)),
		BtnParent: [].slice.call(document.querySelectorAll(`.${tab}__caption`)),
		Content: [].slice.call(document.querySelectorAll(`.${tab}__content`)),
	};
	tabs.Btn.forEach((element, index) => {
		element.addEventListener('mouseover', () => {
			if (!element.classList.contains('active')) {
				let siblings = element.parentNode.querySelector(`.${tab}__btn.active`);
				let siblingsContent = tabs.Content[index].parentNode.querySelector(`.${tab}__content.active`);
				siblings.classList.remove('active');
				siblingsContent.classList.remove('active')
				element.classList.add('active');
				tabs.Content[index].classList.add('active');
			}
		});
	});
}
tabscostume('tabs');