const expiredPrompt = document.querySelector('.time-expired');

export const showExpirationPrompt = sec => tick => {
        if (tick && !tick.done && tick.value.remainingInSec <= sec) {
                expiredPrompt.classList.add('active');
        }
};
