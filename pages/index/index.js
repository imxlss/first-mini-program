//index.js
//获取应用实例
const app = getApp();

Page({
  data: {
    WEEKDAYS: ['日', '一', '二', '三', '四', '五', '六'],
    weekIndex: new Date().getDay(),
    weatherInfo: {}
  },

  onLoad: function() {
    this.getLocation();
  },

  getLocation() {
    wx.getStorage({
      key: 'location',
      success: res => {
        console.log(res);
        this.getWeatherInfo(res.data);
      },
      fail: () => {
        wx.getLocation({
          success: res => {
            let location = `${res.longitude},${res.latitude}`;
            this.getWeatherInfo(location);
            wx.setStorageSync({
              key: 'location',
              data: location
            });
          }
        });
      }
    });
  },

  getWeatherInfo(location) {
    wx.request({
      url: app.globalData.request_url.weather,
      data: {
        location,
        key: app.globalData.key
      },
      success: res => {
        console.log(res.data);
        if (res.statusCode === 200) {
          this.setData({
            weatherInfo: res.data.HeWeather6[0]
          });
        }
      }
    });
  }
});
