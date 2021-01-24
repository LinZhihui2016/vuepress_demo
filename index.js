const AV = require("leancloud-storage");
const fs = require("fs");
const path = require("path");
const resolve = (v) => {
  return path.resolve(__dirname, v);
};
// const { Query, User } = AV;
AV.init({
  appId: "wX7Sy3veyiBh9DiJYdHfvCV3-9Nh9j0Va",
  appKey: "m5ofXgDBEHxA9Xw3hgTmUnvk",
  serverURL: "https://wx7sy3ve.lc-cn-e1-shared.com",
});
const fetch = (className, pageNum, pageSize) => {
  const query = new AV.Query(className);
  query.descending("createdAt");
  if (pageSize) {
    const skip = (pageNum - 1) * pageSize;
    query.skip(skip);
    query.limit(pageSize);
  }
  return query;
};

try {
  fs.rmdirSync(resolve("blog"));
} catch (error) {}

try {
  fs.mkdirSync(resolve("blog"));
} catch (error) {}

fetch("blog")
  .find()
  .then((res) => {
    res.forEach((item) => {
      const { title, tag, content, intro } = item.attributes;
      const data = "> " + `${intro}\n\n` + content;
      try {
        fs.mkdirSync(resolve("blog/" + tag));
      } catch (error) {}
      fs.writeFileSync(resolve(["blog", tag, title].join("/") + ".md"), data);
    });
  });
