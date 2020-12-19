module.exports = {

    subscribers: [],
    /**
     * @param {String} event
     * @param {Object} subscriber
     * @param {Function} handler
     */
    on: function (event, subscriber, handler) {
        this.subscribers.push({
            event: event,
            subscriber: subscriber,
            handler: handler
        });

        return this; // chaining
    },

    /**
     * @param {String} event
     * @param {Object} subscriber
     */
    off: function (event, subscriber) {
        var filterArr = function (el) {
            return el.event != event || el.subscriber != subscriber;
        }
        this.subscribers = this.subscribers.filter(filterArr);

        return this; // chaining
    },

    /**
     * @param {String} event
     */
    emit: function (event) {
        for (var i = 0; i < this.subscribers.length; i++) {
            if (this.subscribers[i].event === event) {
                this.subscribers[i].handler.call(this.subscribers[i].subscriber);
            }
        }

        return this; // chaining
    }
};
