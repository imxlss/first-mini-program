Component({
  data: {
    WEEKDAYS: ['日', '一', '二', '三', '四', '五', '六'],
    CURRENTDAYS: ['今天', '明天', '后天'],
    dayIndex: Number,
    weekIndex: Number
  },
  properties: {
    // 这里定义了innerText属性，属性值可以在组件使用时指定
    forecast: Object
  },
  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function () {
      this.setData({
        weekIndex: new Date(this.properties.forecast.date).getDay(),
        dayIndex: new Date(this.properties.forecast.date).getDay() - new Date().getDay()
      })
    },
    detached: function () {},
  },
});
