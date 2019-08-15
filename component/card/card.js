const globalData = getApp().globalData;

Component({
  data: {
    iconUrl: globalData.request_url.icon,
    weatherInfo: {}
  },
  properties: {
    // 这里定义了innerText属性，属性值可以在组件使用时指定
    cityName: {
      value: '北京',
      type: String
    }
  },
  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function () {
      this.getNow(this.properties.cityName);
    },
    detached: function () {},
  },
  methods: {
    getNow: function (location) {
      wx.request({
        url: globalData.request_url.now,
        data: {
          location,
          key: globalData.key
        },
        success: res => {
          if (res.statusCode === 200) {
            this.setData({
              weatherInfo: res.data.HeWeather6[0].now
            });
          }
        }
      })
    }
  },
});
