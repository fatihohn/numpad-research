const Util = {};
const dpr     = window.devicePixelRatio;
const inch    = 25.4; //1inch = 25.4 mm
const ppi     = 264; //Ipad3 density

Util.mmToPx = (mm) => {
    return ((mm/inch)*ppi)/dpr;
}