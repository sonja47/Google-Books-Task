import {createStore} from 'vuex'
import {booksModule} from "@/store/modules/books";

const store = createStore({
    modules: {
        booksModule
    }
})
export default store;