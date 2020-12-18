/**
 * @param {Array} collection
 * @params {Function[]} – Функции для запроса
 * @returns {Array}
 */
function query(collection) {
    var clone = JSON.parse(JSON.stringify(collection));
    if (arguments.length === 1)
        return clone;
    if (arguments.length > 1)
    {
        var args = [...arguments];
        args.shift();
        let functions = args.sort();
        functions;
        for (var i = 0; i < functions.length; i++) {
            clone = functions[i](clone);
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

        if (args.length > 0) {
            for (var i = 0; i < collection.length; i++) {

                var obj = {};
                var collectionKeys = Object.keys(collection[i]);

                for (var j = 0; j < args.length; j++) {
                    for (var k = 0; k < collectionKeys.length; k++) {
                        if (args[j] === collectionKeys[k]) {
                            obj[args[j]] = collection[i][args[j]];
                        }
                    }
                }
                ret.push(obj);
            }
            return ret;
        }
        return collection;
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
            if (Array.isArray(values)) {
                for (var j = 0; j < values.length; j++) {
                    if (collection[i][property] === values[j]) {
                        ret.push(collection[i]);
                        break ;
                    }
                }
            } else {
                if (collection[i][property] === values) {
                    ret.push(collection[i]);
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
