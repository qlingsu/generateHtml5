export function getData(data) {
    var charts = [{
            name: "statistics-info-panel",
            props: {
                data: [{
                        name: "第二产业(生产制造)",
                        value: 70026,
                    },
                    {
                        name: "第三产业(服务行业)",
                        value: 219030,
                    },
                    {
                        name: "第一产业(农林牧渔)",
                        value: 13012,
                    },
                ],
            },
        },
        {
            name: "chart-model-a",
            props: {
                data: setChartData1(data["employment001_body_10"][0]),
                title: "新就业人员分布",
                clientWidth: window.clientWidth,
            },
        },
        {
            name: "chart-model-b",
            props: {
                data: setChartData(data["employment001_body_20"]),
                title: "新就业人员行业类别",
                clientWidth: window.clientWidth,
            },
        },
        {
            name: "chart-model-c",
            props: {
                data: setChartData(data["employment001_body_30"]),
                title: "每月新就业人数",
            },
        },
        {
            name: "chart-model-d",
            props: {
                data: setChartData(data["employment001_body_40"]),
                title: "新就业人数排行top10",
            },
        },
        {
            name: "chart-model-u",
            props: {
                data: setChartData(data["risk_management_details_001"]),
                title: "风险总触发率TOP10",
            },
        },
        {
            name: "chart-model-u",
            props: {
                data: setChartData(data["risk_management_details_002"]),
                title: "高风险触发率TOP10",
            },
        },
        {
            name: "chart-model-w",
            props: {
                data: setChartData(data["risk_management_details_003"]),
                title: "风险业务TOP10",
            },
        },
        {
            name: "chart-model-t",
            props: {
                data: setChartData(data["risk_management_details_004"]),
                title: "风险规则触发TOP10",
            },
        },

        // {
        //   name: "chart-model-h",
        //   props: {
        //     data: this.setChartData(data["risk_management_details_004"]),
        //     title: "热门职位招聘人数"
        //   }
        // },
        // {
        //   name: "chart-model-h",
        //   props: {
        //     data: this.setChartData(data["risk_management_details_004"]),
        //     title: "热门行业接待应聘者人数"
        //   }
        // },
    ];
    return charts;
}

function setChartData(d) {
    let data = [];
    d.forEach((res) => {
        data.push({
            name: res["AJX261"] ||
                res["AAB302"] ||
                res["AJX231"] ||
                res["AJX112"] ||
                res["RMA101"] ||
                res["ABBREVIATION"],
            count: res["AJX262_NOW"] ||
                res["AJX232"] ||
                res["AJX151"] ||
                res["RMB001"] ||
                res["RMB002_RISK"] ||
                res["RMB002"],
            value: "",
            scale: res["RMB001"],
        });
    });
    return data;
}

function setChartData1(d) {
    var chartData1 = [
        { value: d["AJX271"], name: "单位就业", scale: d["AJX271_PR"] },
        { value: d["AJX272"], name: "灵活就业", scale: d["AJX272_PR"] },
        { value: d["AJX274"], name: "其他形式就业", scale: d["AJX274_PR"] },
    ];
    return chartData1;
}