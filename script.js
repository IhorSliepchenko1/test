$(document).ready(function () {
    $('.header__burger').click(function (event) {
        $('.header__burger,.burger-menu').toggleClass('_active');
        $('body').toggleClass('lock');
    });
});

document.addEventListener('DOMContentLoaded', function () {
    var swiper = new Swiper('.swiper', {
        pagination: {
            el: '.swiper-progressbar',
            type: 'progressbar',
        },
        scrollbar: {
            el: '.swiper-scrollbar',
            hide: false,
        },
    });
});

function validateForm() {
    let phoneLabel = document.getElementById('lbl-phone');
    let phoneInput = document.getElementById('phone');

    if (phoneInput.value.trim() === '') {
        phoneInput.classList.toggle('empty-phone');
        phoneLabel.classList.toggle('empty-label');

    }
}

function openModal() {
    var modal = document.getElementById("myModal");
    modal.classList.add("active");

}

function closeModal() {
    var modal = document.getElementById("myModal");
    modal.classList.remove("active");
}


