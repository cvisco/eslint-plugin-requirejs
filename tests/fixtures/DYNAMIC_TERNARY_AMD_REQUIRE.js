require(someCondition ? ['a', 'b'] : ['c', 'd'], function (a, b) {
    return { foo: 'bar' };
});
