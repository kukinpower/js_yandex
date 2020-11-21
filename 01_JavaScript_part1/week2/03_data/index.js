/**
 * @param {String} date
 * @returns {Object}
 */
module.exports = function (date) {
    var regExpPattern = /\d+/g;
    var arrMatch = date.match(regExpPattern);
    var dateObj = new Date(Number(arrMatch[0]), Number(arrMatch[1]), Number(arrMatch[2]), Number(arrMatch[3]), Number(arrMatch[4]));

    return {
        add: function (val, prop) {
            this.setDate(val, prop);
            this.value = this.dateToStr();
            return this;
        },
        subtract: function (val, prop) {
            this.setDate(val * -1, prop);
            this.value = this.dateToStr();
            return this;
        },
        setDate: function (val, prop) {
            if (prop === "years")
                dateObj.setDate(dateObj.getFullYear() + val);
            else if (prop === "months")
                dateObj.setDate(dateObj.getMonth() + val);
            else if (prop === "days")
                dateObj.setDate(dateObj.getDate() + val);
            else if (prop === "hours")
                dateObj.setDate(dateObj.getHours() + val);
            else if (prop === "minutes")
                dateObj.setDate(dateObj.getMinutes() + val);
            else if (prop === "seconds")
                dateObj.setDate(dateObj.getSeconds() + val);
        },
        dateToStr: function () {
            return (`${dateObj.getFullYear()}-${dateObj.getMonth()}-${dateObj.getDate()} ${dateObj.getHours()}:${dateObj.getMinutes()}`);
        }
    }
};
