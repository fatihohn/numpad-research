const Util = {};
Util.dpr     = window.devicePixelRatio;
Util.inch    = 25.4; //1inch = 25.4 mm
Util.ppi = {
    iPad_Air_4th_2020 : 264,
    iPad_102_2020 : 264,
    iPad_Pro_11_2018 : 264,
    iPad_Pro_129_2018 : 264,
    iPad_Air_3th_2019 : 264,
    iPad_7_2019 : 264,
    iPad_Mini_5th_2019 : 326,
    iPad_6th_2018 : 264,
    iPad_5_2017 : 264,
    iPad_Pro_105_2017 : 264,
    iPad_Pro_129_2017 : 264,
    iPad_Pro_97_2016 : 264,
    iPad_Mini_4th_2015 : 326,
    iPad_Pro_129_2015 : 264,
    iPad_Air_2th_2014 : 264,
    iPad_Mini_3th_2014 : 326,
    iPad_Air_2013 : 264,
    iPad_Mini_2th_2013 : 326,
    iPad_4th_2012 : 264,
    iPad_3th_2012 : 264,
    iPad_Mini_2012 : 326,
    iPad_2th_2011 : 132,
    iPad_2010 : 132,
    macBookPro_15_2018 : 220,
    macBookPro_16_2019 : 226,
    macBookPro_13_2021 : 227,

}

Util.mmToPx = (mm, ppi=Util.ppi.iPad_Pro_11_2018) => {
    return ((mm/Util.inch)*ppi)/Util.dpr;
}




