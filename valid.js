function validateForm () {
    var password1 = document.getElementById('password1');
    var email = document.getElementById('email');
    var email_regexp = /[0-9a-zа-я_A-ZА-Я]+@[0-9a-zа-я_A-ZА-Я^.]+\.[a-zа-яА-ЯA-Z]{2,4}/i;
    if (!email_regexp.test(email.value)) {
        alert('Проверьте почту');
        return false;
    }
}
