import '../scss/style';
import { resetForm } from './functions/reset-form';
import { beforeSubmit } from './functions/before-submit';
import CountdownTimer from './classes/countdown-timer.class';
import { triggerFormReset } from './functions/trigger-form-reset';
import { toggleCountdownTimer } from './functions/countdown-timer.dom';
import { showExpirationPrompt } from './functions/show-expiration-prompt.dom';

const form = document.querySelector('.login-form');
const timeExpirationPrompt = document.querySelector('.time-expired');
const countdownTimer = new CountdownTimer(defaultCountdownTime, remainingCountdownTime);
countdownTimer.subscribe(
        toggleCountdownTimer,
        showExpirationPrompt(expirationPromptOccoursAt),
        triggerFormReset(form)
);

if (form) {
        form.addEventListener('reset', resetForm(form), true);
        form.addEventListener('click', e => beforeSubmit(form)(e), true);
        form.addEventListener('change', e => countdownTimer.start(), true);
        // Legutóljára kell lefutnia, ha nem töltődik újra az oldal
        form.addEventListener('reset', e => setTimeout(() => countdownTimer.stop()), true);
}

if (timeExpirationPrompt) {
        timeExpirationPrompt
                .querySelector('.time-expired__close')
                .addEventListener(
                        'click',
                        e => (timeExpirationPrompt.classList.remove('active'), countdownTimer.restart())
                );
}

if (remainingCountdownTime) {
        countdownTimer.start();
}
