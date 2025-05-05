// 👉 Заголовок — анимация по буквам
const headingText = "Фронтенд-разработчик с предпринимательским мышлением";
const headingElement = document.getElementById('typed-heading');
let headingIndex = 0;

function typeHeading() {
    if (headingIndex < headingText.length) {
        headingElement.innerHTML += headingText.charAt(headingIndex);
        headingIndex++;
        setTimeout(typeHeading, 20); // 🕒 скорость появления заголовка (мс на символ)
    } else {
        setTimeout(typeDescription, 1500); // 🕒 пауза перед началом подзаголовка
    }
}

setTimeout(typeHeading, 100); // 🕒 задержка перед стартом заголовка

// 👉 Подзаголовок — печатается после заголовка
const descText = "Создаю адаптивные сайты с нуля, интегрирую в WordPress и другие CMS.\nМоя задача — не только верстка и функционал, а вызов доверия к вашему продукту.";
const descElement = document.getElementById('typed-description');
let descIndex = 0;

function typeDescription() {
    if (descIndex < descText.length) {
        const char = descText.charAt(descIndex);
        descElement.innerHTML += char === '\n' ? '<br>' : char;
        descIndex++;
        setTimeout(typeDescription, 20); // 🕒 скорость подзаголовка
    }
}

// 👉 Эффект мигающего курсора перед печатью кода
const typingCodeBlock = document.querySelector('.typing-code');
if (typingCodeBlock) {
    typingCodeBlock.classList.add('blinking-only');
    typingCodeBlock.style.setProperty('--cursor-visible', 'visible');

    // 🕒 Задержка перед началом печати кода
    setTimeout(() => {
        typingCodeBlock.classList.remove('blinking-only');
        document.querySelector('.typing-code::after')?.style?.setProperty?.('visibility', 'hidden');
        typeCode();
    }, 8000);
}

// 👉 Сам код, который печатается
const typingElement = document.getElementById('typing-code');
const codeToType = `// Animation loop example\nfunction fadeIn(element) {\n  let opacity = 0;\n  const step = () => {\n    opacity += 0.05;\n    element.style.opacity = opacity;\n    if (opacity < 1) requestAnimationFrame(step);\n  };\n  step();\n}\n\nconst heading = document.querySelector('h1');\nfadeIn(heading);`;

let charIndex = 0;
let codeCycle = 0;

function typeCode() {
    if (charIndex < codeToType.length) {
        typingElement.textContent += codeToType.charAt(charIndex);
        charIndex++;
        setTimeout(typeCode, 15); // 🕒 скорость печати кода (мс на символ)
    } else {
        // 🕒 Пауза после завершения печати
        setTimeout(() => {
            const btn = document.getElementById('portfolio-btn');
            const contactBtn = document.getElementById('contact-btn');
            codeCycle++;

            // Кнопки появляются поочерёдно после каждого цикла кода
            if (codeCycle === 1) {
                btn.style.display = 'inline-block';
                setTimeout(() => btn.style.opacity = '1', 50);
            }
            if (codeCycle === 1) {
                contactBtn.style.display = 'inline-block';
                setTimeout(() => contactBtn.style.opacity = '1', 50);
            }

            // Эффект исчезновения и повторная печать
            typingElement.classList.add('scroll-up');
            setTimeout(() => {
                typingElement.classList.remove('scroll-up');
                typingElement.textContent = '';
                charIndex = 0;
                setTimeout(typeCode, 4000); // 🕒 Пауза перед следующим циклом печати кода
            }, 1500); // 🕒 Длительность анимации scroll-up
        }, 2500); // 🕒 Пауза после завершения кода перед scroll-up
    }
}

// 👉 Переключатель светлой/тёмной темы
const toggleBtn = document.getElementById('theme-toggle');
if (toggleBtn) {
    const body = document.body;
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light-theme') {
        body.classList.add('light-theme');
    }

    toggleBtn.addEventListener('click', () => {
        body.classList.toggle('light-theme');
        const currentTheme = body.classList.contains('light-theme') ? 'light-theme' : 'default';
        localStorage.setItem('theme', currentTheme);
    });
}

// 👉 Плавное появление секций при прокрутке
const fadeSections = document.querySelectorAll('.fade-section');
const hiddenSections = document.querySelectorAll('.hidden-section');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

fadeSections.forEach(section => {
    observer.observe(section);
    section.classList.remove('hidden-section');
});
