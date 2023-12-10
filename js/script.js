// Модальное окно



document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('openModal').addEventListener('click', function () {
        document.getElementById('modal').style.display = 'block';
    });

    document.querySelector('.modal__close').addEventListener('click', function () {
        document.getElementById('modal').style.display = 'none';
    });

    window.addEventListener('click', function (event) {
        if (event.target === document.getElementById('modal')) {
            document.getElementById('modal').style.display = 'none';
        }
    });

    document.querySelector('.modal__content').addEventListener('click', function (event) {
        event.stopPropagation();
    });


    document.getElementById('signupForm').addEventListener('submit', function(event) {
        // Валидация имени
        let name = document.getElementById('name').value.trim();
        let nameError = document.getElementById('nameError');
        if (/[\d]/.test(name) ) {
            nameError.textContent = 'Ошибка. Цифры запрещены в имени!';
        } else if (/(\p{Script=Cyrillic})\1{2,}|[\d]/u.test(name) ) {
            nameError.textContent = 'Ошибкаю.Кириллица не более двух подряд одинаковых букв!';
        } else if (/([A-Za-z])\1+/u.test(name)){
            nameError.textContent = 'Ошибкаю.Латиница не более 1 подряд одинаковых букв!';
        }
        else {
            nameError.textContent = '';
        }
    
        // Валидация адреса электронной почты
        let email = document.getElementById('email').value.trim();
        let emailError = document.getElementById('emailError');
    
        if (!/^\S+@\S+\.\S+$/.test(email)) {
            emailError.textContent = 'Пожалуйста, введите корректный адрес электронной почты.(наличие @ обязательно)';
        } else if (!/^[^а-яё]+@[^а-яё]+\.[^а-яё]+$/.test(email)){
            emailError.textContent = 'Пожалуйста, введите корректный адрес электронной почты.(кириллица запрещена)';
        } else {
            emailError.textContent = '';
        }
    
        // Валидация телефона
        let phone = document.getElementById('phone').value.trim();
        let phoneError = document.getElementById('phoneError');
        if (!/^[\d\s+\-()]{11,14}$/.test(phone)) {
            phoneError.textContent = 'Пожалуйста, введите корректный номер телефона(длинна телефона 11 цифр или 12 символов и символы только +- ).';
        } else if(/(\d)\1{5,}/.test(phone)){
            phoneError.textContent = 'Пожалуйста, введите корректный номер телефона(не более 5 одинаковых цифр подряд).';
        } 
        else {
            phoneError.textContent = '';
        }
    
        // Валидация текста
        let message = document.getElementById('message').value.trim();
        let messageError = document.getElementById('messageError');
        if (/http|www/.test(message)) {
            messageError.textContent = 'В тексте запрещены ссылки.';
        } else if (/(\p{L})\1{2,}/u.test(message))  {
            messageError.textContent = 'Текст не должен содержать более 2х одинаковых символов подряд.';
        } else {
            messageError.textContent = '';
        }

        if (nameError.textContent || emailError.textContent || phoneError.textContent || messageError.textContent) {
            event.preventDefault(); 
        } else {
            document.getElementById('modal').style.display = 'none';
            sendMail(); 
        }
    });
});

function sendMail(){
    let params = {
        name : document.getElementById('name').value,
        phone : document.getElementById('phone').value,
        message : document.getElementById('message').value
    }
    emailjs.send("service_inrh0wh","template_qvtdfpj",params).then(function(res){
        alert("Success!" + res.status)
    })
};

// async function onSuccess() {
//     let data = {
//         name: document.getElementById("name").value,
//         phone: document.getElementById("phone").value,
//         message: document.getElementById("message").value
//     }

//     let response = await fetch("mail.php", {
//         method: "POST",
//         body: JSON.stringify(data),
//         headers: {
//             "Content-Type": "application/json; charset=UTF-8"
//         }
//     })
//     if(response.ok){
            
//     }

//     let result = await response.text()

//     alert(result)
// };




// Аккордеон  
document.querySelectorAll('.accordion__button').forEach((el) => {
    el.addEventListener('click', () => {
        let fagAccordionText = el.nextElementSibling

        if (fagAccordionText.style.maxHeight) {
            document.querySelectorAll('.accordion__text').forEach((el) => el.style.maxHeight = null)
            el.querySelector('.button-icon').classList.remove('icon-minus');
            el.querySelector('.button-icon').classList.add('icon-plus');
        } else {
            document.querySelectorAll('.accordion__text').forEach((el) => el.style.maxHeight = null)
            fagAccordionText.style.maxHeight = fagAccordionText.scrollHeight + 'px';
            el.querySelector('.button-icon').classList.remove('icon-plus');
            el.querySelector('.button-icon').classList.add('icon-minus');
        }
    });
});


// Burger Menu
document.addEventListener('DOMContentLoaded', function(){
    document.getElementById('burgerBtn').addEventListener('click', function(){
        document.querySelector('header').classList.toggle('open')
    });
});