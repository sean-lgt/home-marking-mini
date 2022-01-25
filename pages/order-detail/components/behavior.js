import orderStatus from "../../../enum/order-status";
import orderAction from "../../../enum/order-action";

const behavior = Behavior({
  behavior: [],
  properties: {
    order: Object
  },
  data: {
    orderAction,
    orderStatus
  },
  methods: {
    //点击更新订单状态
    handleUpdateOrderStatus(event) {
      const action = event.currentTarget.dataset.action;
      this.triggerEvent('update-status', { action })
    }
  }
})

export default behavior