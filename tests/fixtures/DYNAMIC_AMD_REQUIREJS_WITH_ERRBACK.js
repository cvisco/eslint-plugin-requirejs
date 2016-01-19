requirejs(
    [someCondition ? 'path/to/a' : 'path/to/b'],
    function (mod) {
        return { foo: 'bar' };
    },
    function (err) {
        /* handle error... */
    }
);
