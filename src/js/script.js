import '../scss/style';

const form = document.querySelector('.login-form');

if (form) {
        let isChanged = false;
        form.addEventListener('change', e => isChanged = true, true);
        form.addEventListener('reset', e => isChanged = false, true);
}
