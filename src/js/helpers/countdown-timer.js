let countdownInterval;
let countdownGenerator;

if (!defaultCountdownTime) {
        alert('Nincs beállítva defaultCountdownTime változó!!!')
}

if (isNaN(defaultCountdownTime)) {
        alert('defaultCountdownTime változónak számnak kell lennie!!!');
}

if (remainingCountdownTime && isNaN(remainingCountdownTime)) {
        alert('remainingCountdownTime változónak számnak kell lennie!!!');
}

function format(sec) {
        var minutes = Math.floor(sec / 60);
        var seconds = Math.round(sec % 60);
        var minutesStr = minutes ? minutes + ' perc ' : '';
        return minutesStr + (seconds < 10 ? '0' + seconds : seconds) + ' másodperc';
}

function* createCountdownGenerator() {
        let remainingTime = (remainingCountdownTime || defaultCountdownTime) * 1000;
        const end = Date.now() + remainingTime;
        let now = Date.now();
        do {
                const isExpired = end <= now;
                const remainingInMs = end - now;
                const expirationTime = isExpired ? 0 : remainingInMs;
                const expirationTimeInSec = Math.round(expirationTime / 1000);
                now = Date.now();
                yield {
                        isExpired,
                        remainingInMs,
                        remaining: expirationTime,
                        remainingInSec: expirationTimeInSec,
                        remainingFormatted: format(expirationTimeInSec),
                };
        } while (end > now);
};

export function stop(callback) {
        if (countdownInterval) {
                clearInterval(countdownInterval);
                countdownGenerator = countdownInterval = void 0;
                callback && callback();
        }
}

export function start(callback) {
        if (countdownInterval) {
                return;
        }
        countdownGenerator = createCountdownGenerator();
        countdownInterval = setInterval(function () {
                const next = countdownGenerator.next();
                callback && callback(next);
                next.done && stop();
        }, 1000);
}