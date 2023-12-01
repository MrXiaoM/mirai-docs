const sidebar = {
    "/mirai": [
        {
            text: "mirai",
            link: '/mirai'
        },
        {
            text: "使用篇",
            children: [
                "/mirai/1-1",
                "/mirai/1-2",
                "/mirai/1-3",
                "/mirai/1-4",
                "/mirai/login",
                "/mirai/45"
            ]
        },
        {
            text: "入门开发篇",
            children: [
                "/mirai/2-1",
                "/mirai/2-2",
                "/mirai/2-3",
                "/mirai/note"
            ]
        },
        {
            text: "疑难解答",
            link: '/mirai/troubleshoot'
        },
    ],
    "/": [
        {
            text: "向百科贡献",
            link: '/CONTRIBUTING'
        },
        {
            text: "赞助作者",
            link: '/sponsor'
        }
    ]
};

export default sidebar;
