//index.js
//获取应用实例
const app = getApp();

Page({
  data: {
    WEEKDAYS: ['日', '一', '二', '三', '四', '五', '六'],
    LIFESTYLETYPE: ['comf', 'drsg', 'flu', 'sport'],
    INDEX_TITLE: {
      comf: '舒适指数',
      drsg: '穿衣指数',
      flu: '感冒指数',
      sport: '运动指数'
    },
    weekIndex: new Date().getDay(),
    weatherInfo: {},
    nickName: 'Hello',
    dailyMSg: '',
    lifeStyle: []
  },

  onLoad: function() {
    this.getLocation();
    this.getDailyMsg();
  },

  getDailyMsg() {
    let hour = new Date().getHours();
    let msg;

    if (hour <= 6) {
      msg = '再睡会儿吧，还没到起床时间呢～';
    } else if (hour >= 7 && hour < 8) {
      msg = '早上啦，该起床了～';
    } else if (hour >= 8 && hour < 11) {
      msg = '上午好呀～';
    } else if (hour >= 11 && hour < 13) {
      msg = '中午啦，吃饭没～';
    } else if (hour >= 13 && hour < 19) {
      msg = '下午啦，起来活动活动吧～';
    } else if (hour >= 19 && hour < 20) {
      msg = '回家吃饭咯～';
    } else if (hour >= 20 && hour < 23) {
      msg = '到晚上咯，今天过的怎么样呀～';
    } else if (hour >= 23) {
      msg = '该睡觉啦～';
    }

    this.setData({
      dailyMSg: msg
    });
  },

  getLocation() {
    wx.getStorage({
      key: 'location',
      success: res => {
        this.getWeatherInfo(res.data);
      },
      fail: () => {
        wx.getLocation({
          success: res => {
            let location = `${res.longitude},${res.latitude}`;
            this.getWeatherInfo(location);
            wx.setStorageSync('location', location);
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
        if (res.statusCode === 200) {
          this.setData({
            weatherInfo: res.data.HeWeather6[0],
            lifeStyle: this.lifeStyleFor(
              res.data.HeWeather6[0].lifestyle,
              this.data.LIFESTYLETYPE
            )
          });
        }
      }
    });
  },

  lifeStyleFor(allLifeStyle, lifeStyleType) {
    let result = [];

    if (Object.prototype.toString.call(lifeStyleType) === '[object Array]') {
      result = allLifeStyle.filter(item => lifeStyleType.includes(item.type));
    }

    return result;
  }
});
