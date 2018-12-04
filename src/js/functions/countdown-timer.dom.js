
const countdownTimer = document.querySelector('.countdown__timer');

export const toggleCountdownTimer = (tick) => {
        if (!tick || tick.done) {
                countdownTimer.parentElement.classList.remove('active');
                countdownTimer.innerHTML = '';
        }
        else {
                countdownTimer.parentElement.classList.add('active');
                countdownTimer.innerHTML = tick.value.remainingFormatted || '';
        }
};
