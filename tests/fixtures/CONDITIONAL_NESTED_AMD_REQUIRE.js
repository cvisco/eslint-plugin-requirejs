require(['a', 'b'], function (a, b) {
    if (someCondition) {
        require(['c'], function (c) {
            return { foo: 'bar' };
        });
    }
});
