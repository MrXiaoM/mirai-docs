import { viteBundler } from "@vuepress/bundler-vite";
import { defineUserConfig } from "vuepress";
import sidebar from "./sidebar.js";
import { resolve } from "path";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
    title: "数据消散Wiki",
    description: "人间工作的资料室",
    base: "/",
    lang: "zh-CN",
    locales: {
        "/": {
            lang: "zh-CN",
        },
    },
    markdown: {
        lineNumbers: true,
    },
    theme: hopeTheme({
        favicon: "/assets/images/logo.png",
        sidebar: sidebar,
        navbar: [
            {
                text: "人间工作",
                link: "https://www.mrxiaom.top/",
            },
            {
                text: "mirai",
                link: "/server",
            }
        ],
        print: false,
        pure: true,
        repo: "MrXiaoM/mirai-docs",
        docsDir: "docs",
        plugins: {
            activeHeaderLinks: true,
            nprogress: true,
        },
        lastUpdated: false,
        breadcrumb: false,
        pageInfo: false,
        nextLinks: false,
        prevLinks: false,
    }),
    plugins: [
    ],
    bundler: viteBundler({
        viteOptions: {
            resolve: {
                alias: {
                    "@": resolve(__dirname, "docs"),
                },
            },
        },
        vuePluginOptions: {},
    }),
});
