const fs = require("fs");
const path = require("path");
const resolve = (v) => {
  return path.resolve(__dirname, "..", v);
};
const blogs = fs.readdirSync(resolve("blog"));

const sidebar = blogs.map((title) => {
  const children = fs.readdirSync(resolve("blog/" + title)).map((i) => {
    const name = i.split(".")[0];
    return ["/blog/" + title + "/" + name, name];
  });
  return {
    title,
    children,
  };
});
const nav = sidebar.map(({ title, children }) => {
  return {
    text: title,
    items: children.map(([link, text]) => ({
      text,
      link,
    })),
  };
});

module.exports = {
  title: "林志辉",
  description: "无情的代码机器",
  themeConfig: {
    sidebarDepth: 2,
    nav,
    sidebar,
  },
  markdown: {
    lineNumbers: true,
  },
};
