import Observer from './observer.class';

class CountdownTimer extends Observer {

        format(sec) {
                var minutes = Math.floor(sec / 60);
                var seconds = Math.round(sec % 60);
                var minutesStr = minutes ? minutes + ' perc ' : '';
                return minutesStr + (seconds < 10 ? '0' + seconds : seconds) + ' másodperc';
        }

        * createCountdownGenerator() {
                let remainingTime = (this.remainingCountdownTime || this.defaultCountdownTime) * 1000;
                this.remainingCountdownTime = void 0;
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
                                remainingFormatted: this.format(expirationTimeInSec),
                        };
                } while (end > now);
        }

        constructor(defaultCountdownTime, remainingCountdownTime) {
                super();
                if (!defaultCountdownTime) {
                        alert('Nincs beállítva defaultCountdownTime változó!!!')
                }

                if (isNaN(defaultCountdownTime)) {
                        alert('defaultCountdownTime változónak számnak kell lennie!!!');
                }

                if (remainingCountdownTime && isNaN(remainingCountdownTime)) {
                        alert('remainingCountdownTime változónak számnak kell lennie!!!');
                }

                this.remainingCountdownTime = remainingCountdownTime;
                this.defaultCountdownTime = defaultCountdownTime;
                this.countdownInterval;
        }

        start() {
                if (this.countdownInterval) {
                        return;
                }
                else {
                        this.countdownGenerator = this.createCountdownGenerator();
                        this.countdownInterval = setInterval(() => {
                                const next = this.countdownGenerator.next();
                                this.notify(next);
                                next.done && stop();
                        }, 1000);
                }
        }

        stop() {
                if (this.countdownInterval) {
                        clearInterval(this.countdownInterval);
                        this.countdownGenerator = this.countdownInterval = void 0;
                        this.notify();
                }
        }

        restart() {
                this.stop();
                this.start();
        }
}

export default CountdownTimer;
