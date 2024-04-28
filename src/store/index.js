import { createStore } from "vuex";
import storeModules from "szd-client-web/client/store/index.js"
export default createStore({
  modules:{
    // coreStore
    ...storeModules
  }
})

