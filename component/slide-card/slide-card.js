Component({
  data: {
    xAxis: 0
  },
  properties: {
    key: {
      type: String,
      value: ''
    }
  },
  methods: {
    start(e) {
      console.log(e);
      this.startX = e.changedTouches[0].pageX;
    },

    end(e) {
      console.log(e);
      this.endX = e.changedTouches[0].pageX;
      if (this.startX - this.endX > 30) {
        return this.changeXAxis(-140);
      }

      return this.changeXAxis(0);
    },

    /**
     *
     * @param {number} coordinate 目的坐标
     */
    changeXAxis(coordinate) {
      this.setData({
        xAxis: coordinate
      })
    },

    delete(e) {
      console.log(e);
    }
  },

});
