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
        {
            text: "签名服务纪事",
            link: '/mirai/sign'
        },
        {
            text: "协议信息提取",
            link: '/mirai/eden'
        },
    ],
    "/overflow": [
        {
            text: "Overflow",
            link: '/overflow'
        },
        {
            text: "搭配 Gensokyo",
            children: [
                "/overflow/gensokyo"
            ]
        },
        {
            text: "搭配 LLOnebot",
            children: [
                "/overflow/llonebot"
            ]
        },
    ],
    "/": [
        {
            text: "贡献文档",
            link: '/CONTRIBUTING'
        },
        {
            text: "赞助作者",
            link: '/sponsor'
        }
    ]
};

export default sidebar;
