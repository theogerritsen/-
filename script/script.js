const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        console.log(entry)
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        } else {
            entry.target.classList.remove('show');
        }
    });
});

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));

let card1 = document.getElementById('card1');
let card2 = document.getElementById('card2');
let card3 = document.getElementById('card3');
let card4 = document.getElementById('card4');
let git1 = document.getElementById('git1');

card1.onclick = function() {
    $('html,body').animate({
        scrollTop: $("#proj1").offset().top},
        'slow'
    );
}
card2.onclick = function() {
    $('html,body').animate({
        scrollTop: $("#proj2").offset().top},
        'slow'
    );
}
card3.onclick = function() {
    $('html,body').animate({
        scrollTop: $("#proj3").offset().top},
        'slow'
    );
}
card4.onclick = function() {
    $('html,body').animate({
        scrollTop: $("#proj4").offset().top},
        'slow'
    );
}

function getRepo(id) {
    alert(id)
}
