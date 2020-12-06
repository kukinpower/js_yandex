/**
 * @param {Array} collection
 * @params {Function[]} – Функции для запроса
 * @returns {Array}
 */
function query(collection) {
    var clone = JSON.parse(JSON.stringify(collection));
    console.log(clone);
    if (arguments.length === 1)
        return clone;
    if (arguments.length > 1)
    {
        for (var i = arguments.length - 1; i > 0; i--) {
            clone = arguments[i](clone);
        }
        return clone;
    }
    return [];
}

/**
 * @params {String[]}
 */
function select() {
    var args = [].slice.call(arguments);

    return function select(collection) {
        var ret = [];

        for (var i = 0; i < collection.length; i++) {
            var obj = {};
            for (var j = 0; j < args.length; j++) {
                obj[args[j]] = collection[i][args[j]];
            }
            ret.push(obj);
        }
        return ret;
    }
}

/**
 * @param {String} property – Свойство для фильтрации
 * @param {Array} values – Массив разрешённых значений
 */
function filterIn(property, values) {
    return function filterIn(collection) {
        var ret = [];

        for (var i = 0; i < collection.length; i++) {
            for (var j = 0; j < values.length; j++) {
                if (collection[i][property] === values[j]) {
                    ret.push(collection[i]);
                    break ;
                }
            }
        }
        return ret;
    }
}

module.exports = {
    query: query,
    select: select,
    filterIn: filterIn
};
