# GravitationalDeflection

[![GitHub license](https://img.shields.io/badge/license-MIT-brightgreen.svg)](#) [![npm version](https://img.shields.io/npm/v/react.svg?style=flat)](https://www.npmjs.com/package/@behaver/gravitational-deflection) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](#)

## 简介

GravitationalDeflection 是一个用于计算由太阳引力造成的星体坐标偏转的天文学组件。

## 安装

通过 npm 安装，在你的 node 项目目录下执行：

`npm i --save @behaver/gravitational-deflection`

安装完成后，调用即可：

`const GravitationalDeflection = require('@behaver/gravitational-deflection');`

## 用例

```js
const GravitationalDeflection = require('@behaver/gravitational-deflection');
const { JDateRepository } = require("@behaver/jdate");
const { SphericalCoordinate3D } = require('@behaver/coordinate');

let GD = new GravitationalDeflection({
  time: new JDateRepository(18, 'j2000'),
  sc: new SphericalCoordinate3D(230043, 1.123, 1.55),
});

let res = GD.get();
```

## API

`constructor(options)`

构造函数:

* options.time   计算时间
* options.sc     天体球坐标 (距离单位：AU)

`get()`

获取 引力偏转修正值对象

`get time()`

获取计算时间

`set time(time)`

设置计算时间

## 许可证书

The MIT license.