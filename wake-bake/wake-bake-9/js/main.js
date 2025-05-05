// ========================= БУРГЕР-МЕНЮ И МОДАЛЬНОЕ ОКНО =======================
document.addEventListener("DOMContentLoaded", function () {
    const body = document.body;
    const burgerIcon = document.querySelector(".burger-icon");
    const navLinks = document.querySelectorAll(".nav__link");
    const footer = document.querySelector(".footer__inner");
    const modal = document.querySelector(".modal");
    const openButton = document.querySelector(".about__img-button");
    const cancelButton = document.querySelector(".modal__cancel");

    // Функция для переключения меню
    function toggleMenu() {
        body.classList.toggle("body--opened-menu");
    }

    // Функция для закрытия меню
    function closeMenu() {
        body.classList.remove("body--opened-menu");
    }

    // Открытие и закрытие меню при клике на бургер-иконку
    if (burgerIcon) {
        burgerIcon.addEventListener("click", function (event) {
            event.preventDefault();
            toggleMenu();
        });
    }

    // Закрытие меню при клике на ссылку
    if (navLinks.length > 0) {
        navLinks.forEach(function (link) {
            link.addEventListener("click", closeMenu);
        });
    }

    // Наблюдение за изменениями в footer__inner
    if (footer) {
        const observer = new MutationObserver(() => {
            console.log("Grid columns:", getComputedStyle(footer).getPropertyValue("grid-template-columns"));
        });

        observer.observe(footer, { attributes: true, attributeFilter: ["style"] });
    }

    // ================== МОДАЛЬНОЕ ОКНО ==================


    if (modal && openButton && cancelButton) {
        // Открытие модального окна
        openButton.addEventListener("click", function (event) {
            event.preventDefault();
            modal.classList.add("modal--opened");
            body.classList.add("body--no-scroll"); // Отключение прокрутки
        });

        // Функция для закрытия модального окна
        function closeModal() {
            modal.classList.remove("modal--opened");
            body.classList.remove("body--no-scroll"); // Включение прокрутки
        }

        // Закрытие при клике на крестик
        cancelButton.addEventListener("click", closeModal);

        // Закрытие при клике за пределами окна
        modal.addEventListener("click", function (event) {
            if (event.target === modal) {
                closeModal();
            }
        });

        // Закрытие при нажатии Esc
        document.addEventListener("keydown", function (event) {
            if (event.key === "Escape") {
                closeModal();
            }
        });
    }
});

// ===============================ТАБЫ=====================================

const tabControls = document.querySelector('.tab-controls')
// переменная, которая ВЫБИРАЕТ .tab-controls. 
// Внутри .tab-controls у нас только 4 ссылки: Неделя 1, Неделя 2...

tabControls.addEventListener('click', toggleTab)
// Теперь яваскрипт по tabControls слушает КЛИК и вызывает toggleTab
// Ниже описываем toggleTab
function toggleTab(e) {

    const tabControl = e.target.closest('.tab-controls__link')
    // Добавляем еще переменную, которая обращается к .tab-controls__link. 
    // То есть конкнетно к ссылкам Неделя 1 и т.п.

    if (!tabControl) return // если это НЕ tabControl - вернуться
    e.preventDefault()
    //отменяем стандартные действия браузера, то есть НЕ переходим по ссылке

    if (tabControl.classList.contains('tab-controls__link--active')) return
    // выполняем проверку, содержит ли tabControl (то есть конкретная ссылка) модификатор tab-controls__link--active
    // если есть - ничего не делаем, потому что она уже активна и блок с соответств. инф уже открыт.
    const tabContentID = tabControl.getAttribute('href')
    // переменная Айди. Находит #tab - то есть блок с инф. 
    const tabContent = document.querySelector(tabContentID)
    // переменная выбирает блок с инф
    const activeControl = document.querySelector('.tab-controls__link--active')
    //выбирает активную ссылку, содержащую модификатор
    const activeContent = document.querySelector('.tab-content--show')
    // выбирает активный блок контента с соответствующим модификатором

    if (activeControl) { //если КАКАЯ_ЛИБО ссылка содержит модификатор - удаляет его
        activeControl.classList.remove('tab-controls__link--active')
    }
    if (activeContent) { //если КАКОЙ_ЛИБО блок содержит модификатор, удаляет его
        activeContent.classList.remove('tab-content--show')
        // удаляет модификаторы из класслиста
    }

    tabControl.classList.add('tab-controls__link--active') //И добавляет к активной ссылке модификатор
    tabContent.classList.add('tab-content--show') // И добавляет к активному блоку модификатор

    //Кратко:
    // Итак, в блоке .tab-controls функция ищет клики и если что выполняет функцию toggleTab
    // toggleTab обращается к блоку ссылок Неделя 1... 
    // и выбирает e.target, то есть кокретную ссылку, где произошел клик.
    // Удаляет модификаторы у всех ссылок и указанных блоков и добавляет модификатор к текущей.
    // css соответственно обрабатывает модификаторы, меняя стиль кнопок и показывая блоки с модификатором.

}

// ===============АККОРДЕОН========================

document.querySelectorAll('.accordion-list__item').forEach((detail) => {
    detail.addEventListener('click', function () {
        document.querySelectorAll('.accordion-list__item').forEach((el) => {
            if (el !== detail) {
                el.classList.remove('accordion--open'); // убираем класс при закрытии
                el.removeAttribute('open');
            }
        });
    });
});

document.querySelectorAll('.accordion-list__control').forEach(header => {
    header.addEventListener('click', () => {
        const parentItem = header.closest('.accordion-list__item');
        const content = header.nextElementSibling;

        const isOpen = content.style.maxHeight;

        // Закрываем все
        document.querySelectorAll('.accordion-list__item').forEach(item => {
            item.classList.remove('accordion--open');
            item.querySelector('.accordion-list__content').style.maxHeight = null;
        });

        // Если текущий закрыт — открываем
        if (!isOpen) {
            content.style.maxHeight = content.scrollHeight + 'px';
            parentItem.classList.add('accordion--open');
        }
    });
});



// ===============СЛАЙДЕР-ГАЛЕРЕЯ========================

const swiper = new Swiper('.gallery__slider', {
    slidesPerView: 1.5,
    spaceBetween: 15,

    pagination: {
        el: '.gallery__pagination',
        type: 'fraction',
    },

    navigation: {
        nextEl: '.gallery__next',
        prevEl: '.gallery__prev',
    },
    breakpoints: {
        451: {
            slidesPerView: 2,
            spaceBetween: 15
        },
        601: {
            slidesPerView: 3,
            spaceBetween: 15
        },
        801: {
            slidesPerView: 4,
            spaceBetween: 30
        },
        1101: {
            slidesPerView: 4
        }}
    });

// ===============СЛАЙДЕР-ОТЗЫВЫ========================

new Swiper('.testimonials__slider', {
    slidesPerView: 1,
    spaceBetween: 0,
    centeredSlides: true,

    navigation: {
        nextEl: '.testimonials__next',
        prevEl: '.testimonials__prev',
    },

    scrollbar: {
        el: '.swiper-scrollbar',
        draggable: true,
    },
    breakpoints: {
        901: {
            slidesPerView: 1.5
        },
        1201: {
            slidesPerView: 2.1
        }}

    });

const privacyModal = document.querySelector(".privacy-modal");
const privacyLink = document.querySelector(".privacy-link");
const closePrivacyModal = document.querySelector(".privacy-modal__cancel");

if (privacyModal && privacyLink) {
    privacyLink.addEventListener("click", function (event) {
        event.preventDefault();
        privacyModal.classList.add("modal--opened");
        document.body.classList.add("body--no-scroll");
    });

    function closePrivacy() {
        privacyModal.classList.remove("modal--opened");
        document.body.classList.remove("body--no-scroll");
    }

    if (closePrivacyModal) {
        closePrivacyModal.addEventListener("click", closePrivacy);
    }

    privacyModal.addEventListener("click", function (event) {
        if (!event.target.closest(".privacy-modal__content")) {
            closePrivacy();
        }
    });

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            closePrivacy();
        }
    });
}

// =============================== МАСКА ДЛЯ ТЕЛЕФОНА =======================

document.addEventListener("DOMContentLoaded", function () {
    const phoneInput = document.getElementById("phone");

    if (phoneInput) {
        phoneInput.addEventListener("focus", function () {
            if (!phoneInput.value) {
                phoneInput.value = "+7 (";
            }
        });

        phoneInput.addEventListener("input", function (event) {
            let numbers = phoneInput.value.replace(/\D/g, "");
            if (numbers.startsWith("7")) {
                numbers = numbers.substring(1);
            }

            let formattedNumber = "+7 ";
            if (numbers.length > 0) {
                formattedNumber += `(${numbers.substring(0, 3)}`;
            }
            if (numbers.length >= 4) {
                formattedNumber += `) ${numbers.substring(3, 6)}`;
            }
            if (numbers.length >= 7) {
                formattedNumber += `-${numbers.substring(6, 8)}`;
            }
            if (numbers.length >= 9) {
                formattedNumber += `-${numbers.substring(8, 10)}`;
            }
            phoneInput.value = formattedNumber;
        });

        // Ограничение на ввод только цифр
        phoneInput.addEventListener("keypress", function (event) {
            if (!/[0-9]/.test(event.key)) {
                event.preventDefault();
            }
        });

        // Запрет вставки нецифровых символов
        phoneInput.addEventListener("paste", function (event) {
            let paste = (event.clipboardData || window.clipboardData).getData("text");
            if (/\D/.test(paste)) {
                event.preventDefault();
            }
        });

        // Очистка поля при потере фокуса, если введены только +7 (
        phoneInput.addEventListener("blur", function () {
            if (phoneInput.value === "+7 (") {
                phoneInput.value = "";
            }
        });
    }
});

// ==============================бургер-иконка======================
// Показывать и скрывать бургер-иконку в зависимости от прокрутки
document.addEventListener("DOMContentLoaded", () => {
    const burgerIcon = document.querySelector(".burger-icon");
    const aboutSection = document.querySelector(".main__about");

    if (burgerIcon && aboutSection) {
        function handleBurgerVisibility() {
            const aboutTop = aboutSection.getBoundingClientRect().top;

            if (aboutTop <= 0) {
                burgerIcon.classList.add("burger-icon--hidden");
            } else {
                burgerIcon.classList.remove("burger-icon--hidden");
            }
        }

        handleBurgerVisibility(); // при загрузке
        window.addEventListener("scroll", handleBurgerVisibility); // при прокрутке
    }
});

