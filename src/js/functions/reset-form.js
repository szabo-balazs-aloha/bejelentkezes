export const resetForm = form => event => {
        const inputs = form.querySelectorAll('.field__must-be-valid');
        for (let input of Array.from(inputs)) {
                input.classList.remove('field__must-be-valid');
        }

        const timeExpirationPrompt = form.querySelector('.time-expired');

        if (timeExpirationPrompt) {
                timeExpirationPrompt.classList.remove('active')
        }
}