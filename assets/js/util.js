const Util = {};
Util.dpr     = window.devicePixelRatio;
Util.inch    = 25.4; //1inch = 25.4 mm
Util.ipadPro = {
    ppi: 264
}
Util.iphone13 = {
    ppi: 460
}
Util.iphoneXs = {
    ppi: 458
}

Util.device = Util.ipadPro;
Util.mmToPx = (mm) => {
    return ((mm/Util.inch)*Util.device.ppi)/Util.dpr;
}