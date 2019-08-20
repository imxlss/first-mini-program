Component({
  data: {
    xAxis: 0
  },
  properties: {},
  methods: {
    start(e) {
      console.log(e);
      this.startX = e.changedTouches[0].pageX;
    },

    end(e) {
      console.log(e);
      this.endX = e.changedTouches[0].pageX;
      if (this.startX - this.endX > 1000) {
        this.setData({
          xAxis: -10
        })
      } else {
        this.setData({
          xAxis: 0
        })
      }
    },

    delete(e) {
      console.log(e);
    }
  },

});
