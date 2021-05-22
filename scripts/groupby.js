const groupBy = function (data, key) {
    return data.reduce(function(storage,item) {
        let group = item[key];
        storage[group] = storage[group] || [];
        storage[group].push(item);
        return storage;
    }, {});
};