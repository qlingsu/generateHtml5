var elements = [{
        name: "a-months",
    },
    {
        name: "a-input",
    },
    {
        name: "a-button",
        attrs: {
            round: true
        },
        props: {},
        slot: "测试按钮",
    },
    {
        name: "a-bars",
        props: {
            bars: [{
                id: "0",
                label: "名称0",
                number: 12
            }, {
                id: "1",
                label: "名称1",
                number: 10
            }, {
                id: "2",
                label: "名称2",
                number: 15
            }, {
                id: "3",
                label: "名称3",
                number: 4
            }]
        },
    },
];

export default elements;