export const beforeSubmit = form => event => {
        if (event.target.classList.contains('controls__submit')) {
                const inputs = Array.from(form.querySelectorAll("input[required]"));
                for (let input of inputs) {
                        input.classList.add('field__must-be-valid');
                }
        }
}