'use strict';

const { SphericalCoordinate3D } = require('@behaver/coordinate/3d');
const { EarthHECC } = require('@behaver/solar-planets-hecc');
const Precession = require('@behaver/precession');

/**
 * GravitationalDeflection
 *
 * GravitationalDeflection 是一个用于计算太阳引力所造成的光线偏转的组件
 * 
 * @author 董 三碗 <qianxing@yeah.net>
 * @version 1.0.0
 */
class GravitationalDeflection {

  /**
   * 构造函数
   * 
   * @param  {JDateRepository}       options.time   计算时间
   * @param  {SphericalCoordinate3D} options.sc     天体球坐标
   */
  constructor({
    time,
    sc,
  }) {
    this.sc = sc;
    this.EarthHECC = new EarthHECC(time);
    this.Precession = new Precession({
      epoch: time,
    });
  }

  /**
   * 获取 引力偏转值
   * 
   * @return {Object} 引力偏转值对象
   */
  get() {

    let earth_hecc_sc = this.EarthHECC.sc; // 地球日心黄道球坐标

    if (this.sc.r < earth_hecc_sc.r) return { a: 0, b: 0 }

    let sec_per_rad = 206264.80624709636,
        ra = this.sc.phi, // 天体赤道直角坐标
        dec = Math.PI / 2 - this.sc.theta,
        e0 = this.Precession.epsilon / sec_per_rad,
        sun_sc = new SphericalCoordinate3D(earth_hecc_sc.r, Math.PI - earth_hecc_sc.theta, earth_hecc_sc.phi + Math.PI).rotateX(e0), // 太阳地心赤道坐标
        sun_ra = sun_sc.phi,
        sun_dec = Math.PI / 2 - sun_sc.theta,
        d = ra - sun_ra,
        D = Math.sin(dec) * Math.sin(sun_dec) 
          + Math.cos(dec) * Math.cos(sun_dec) * Math.cos(d);
    
    D = 0.00407 * (1 / (1 - D) + D / 2) / sec_per_rad;
    
    return {
      a: D * (Math.cos(sun_dec) * Math.sin(d) / Math.cos(dec)),
      b: D * (Math.sin(dec) * Math.cos(sun_dec) * Math.cos(d) - Math.sin(sun_dec) * Math.cos(dec)),
    };
  }

  /**
   * 获取计算时间
   * 
   * @return {JDateRepository} 计算时间
   */
  get time() {
    return this.EarthHECC.obTime;
  }

  /**
   * 设置计算时间
   * 
   * @param  {JDateRepository} time 计算时间
   */
  set time(time) {
    this.EarthHECC.obTime = time;
    this.Precession.epoch = time;
  }
}

module.exports = GravitationalDeflection;
