class Observer {

        constructor() {
                this.observers = [];
        }

        subscribe(...fn) {
                if (fn) {
                        this.observers.push(...fn);
                }
        }

        unsubscribe(fn) {
                this.observers = this.observers.filter(subscriber => subscriber !== fn);
        }

        notify(data=void 0) {
                this.observers.forEach(observer => observer(data));
        }
}

export default Observer;
