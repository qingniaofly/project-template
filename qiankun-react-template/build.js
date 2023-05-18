const fs = require("fs-extra");
const cp = require("child_process");
const path = require("path");
const os = require("os");

const paths = {
  build: "build",
  main: "main",
  subapp: "subapp",
};

const subappDir = paths.build + "/" + paths.subapp;

build(() => {
  clone();
});

function getSubappFolder(subappDir) {
  fs.ensureDirSync(subappDir);
  const subappPaths = fs.readdirSync(paths.subapp);
  return subappPaths;
}

function build(callback) {
  updatepkg();
  console.log("<-----------build start----------->");
  const c = cp.exec("npm run build", (err, stdout, stderr) => {
    // console.log("main:result:", stdout);
    console.log("<-----------build end----------->");
    callback();
  });
  c.stdout.on("data", (e) => {
    console.log(e);
  });
  c.stderr.on("data", (e) => {
    console.log(e);
  });
}

function updatepkg() {
  const subappPaths = getSubappFolder(subappDir);
  const appPackage = require("./package.json");
  const scripts = appPackage.scripts;
  scripts[`install:${paths.main}`] = `cd ${paths.main} && npm install`;
  scripts[`start:${paths.main}`] = `cd ${paths.main} && npm run start`;
  scripts[`build:${paths.main}`] = `cd ${paths.main} && npm run build`;
  subappPaths.forEach((name) => {
    let pkg;
    try {
      pkg = require(`./${paths.subapp}/${name}/package.json`);
    } catch (e) {}

    if (!pkg?.scripts?.build) {
      return;
    }

    scripts[`install:${name}`] = `cd ${paths.subapp}/${name} && npm install`;
    scripts[`start:${name}`] = `cd ${paths.subapp}/${name} && npm run start`;
    scripts[`build:${name}`] = `cd ${paths.subapp}/${name} && npm run build`;
    // "install:main": "cd main && npm install",
    // "start:main": "cd main && npm run start",
    // "build:main": "cd main && npm run build",
  });
  fs.writeFileSync(
    "./package.json",
    JSON.stringify(appPackage, null, 2) + os.EOL
  );
}

function clone() {
  console.log("<-----------clone start----------->");
  // 确保目录是空的。如果目录非空删除目录内容。如果目录不存在,就创建一个。目录本身并不是删除
  fs.emptyDirSync(paths.build);

  // 拷贝mian的build目录
  copyFolder(paths.main + "/" + paths.build, paths.build + "/" + paths.main);

  // 拷贝 subapp下的子应用 build目录
  copySubappFolder(subappDir);
  console.log("<-----------clone end----------->");
}

// 拷贝子应用目录
function copySubappFolder(subappDir) {
  const subappPaths = getSubappFolder(subappDir);
  subappPaths.forEach((name) => {
    const from = paths.subapp + "/" + name + "/" + paths.build;
    const to = subappDir + "/" + name;

    if (fs.existsSync(from)) {
      copyFolder(from, to);
    }
  });
}

// 拷贝目录
function copyFolder(from, to) {
  fs.copySync(from, to, {
    dereference: true,
  });
}
