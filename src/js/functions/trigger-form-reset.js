export const triggerFormReset = form => tick => {
        if (tick && tick.done) {
                const reset = new Event('reset');
                form.dispatchEvent(reset);
        }
}