// app.js
import Token from "./models/token";
import { createStoreBindings } from "mobx-miniprogram-bindings";
import { timStore } from "./store/tim";
App({
  onLaunch() {
    const res = await Token.verifyToken();
    const storeBindings = createStoreBindings(this, {
      store: timStore,
      actions: ['login'],
    })
    if (res.valid) {
      await this.login()
    }

    storeBindings.destroyStoreBindings()
  },
  globalData: {
    userInfo: null
  }
})