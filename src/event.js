// https://gist.github.com/learncodeacademy/777349747d8382bfb722
export default class Event {
    constructor(){
        this.events = new Map();
    }

    on (eventName, fn) {
        if (!this.events.has(eventName)) this.events.set(eventName, new Set());
        this.events.get(eventName).add(fn);
    }

    off (eventName, fn) {
        if (this.events.has(eventName)) {
            const set = this.events.get(eventName)
            if (set.has(fn)) set.delete(fn);
        }
    }

    emit (eventName, data) {
        if (this.events.has(eventName)) {
            this.events.get(eventName).forEach(fn => {
                fn(data);
            });
        }
    }
}
