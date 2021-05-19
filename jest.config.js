module.exports = {
  // ** 代表目录
  testMatch: ["**/__tests__/**/*.[jt]s?(x)"],
  moduleFileExtensions: [
    "js",
    "json",
    "vue", // 告诉 Jest 处理 `*.vue`文件
  ],
  transform: {
    // 用 vue-jest 处理*.vue 文件
    ".*\\.(vue)$": "vue-jest",
    // 用 babel-jest 处理js
    ".*\\.(js)$": "babel-jest",
  },
};