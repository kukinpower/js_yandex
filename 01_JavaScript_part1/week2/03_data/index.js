/**
 * @param {String} date
 * @returns {Object}
 */
module.exports = function (date) {
    var regExpPattern = /\d+/g;
    var arrMatch = date.match(regExpPattern);
    var dateObj = new Date(Number(arrMatch[0]), Number(arrMatch[1] - 1), Number(arrMatch[2]), Number(arrMatch[3]), Number(arrMatch[4]));

    return {
        add: function (val, prop) {
            if (val < 0)
                throw new TypeError('Bad value');
            return this.setDate(val, prop);
        },
        subtract: function (val, prop) {
            if (val < 0)
                throw new TypeError('Bad value');
            return this.setDate(val * -1, prop);
        },
        setDate: function (val, prop) {
            if (prop === "years")
                dateObj.setFullYear(dateObj.getFullYear() + val);
            else if (prop === "months")
                dateObj.setMonth(dateObj.getMonth() + val);
            else if (prop === "days")
                dateObj.setDate(dateObj.getDate() + val);
            else if (prop === "hours")
                dateObj.setHours(dateObj.getHours() + val);
            else if (prop === "minutes")
                dateObj.setMinutes(dateObj.getMinutes() + val);
            else if (prop === "seconds")
                dateObj.setSeconds(dateObj.getSeconds() + val);
            else
                throw new TypeError('Bad prop');
            this.value = this.joinDate();
            return this;
        },
        joinDate: function () {
            let months = dateObj.getMonth() + 1;
            let date = dateObj.getDate();
            let hours = dateObj.getHours();
            let minutes = dateObj.getMinutes();

            if (months < 10)
                months = '0' + months;
            if (date < 10)
                date = '0' + date;
            if (hours < 10)
                hours = '0' + hours;
            if (minutes < 10)
                minutes = '0' + minutes;
            return `${dateObj.getFullYear()}-${months}-${date} ${hours}:${minutes}`;
        }
    }
};
