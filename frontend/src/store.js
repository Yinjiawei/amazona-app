/********************************************
1. create a redux store
        initState
        reducer
        store
 2. Wraper root component with <Provider store={store}></Provider>
 3. Add redux thunk(or sega)
 4. (optional) Add compose : composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; (can watch in redux dev tools)
 5. Add contants for actions: export const PRODUCT_LIST_REQUEST = 'PRODUCT_LIST_REQUEST';
 6. Create actions: action is functions, can dispatch actions to reducer.(snyc process is processed in actions)
 7. Create reducers to update state, and combineReducers in store.
 8. Use in component:
    const dispatch = useDispatch();
    const productList = useSelector((state) => state.productList)
    const { loading, error, products } = productList;
    useEffect(() => {
        dispatch(listProducts())
    }, []);
*********************************************/

import { applyMiddleware, createStore, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { cartReducer } from './reducers/cartReducer';
import { orderCreateReducer, orderDetailsReducer, orderMineListReducer, orderPayReducer } from './reducers/orderReducers';
import { productDetailsReducer, productListReducer } from './reducers/productReducers';
import { userSigninReducer, userRegisterReducer } from './reducers/userReducer';

const initialState = {
    userSignin: {
        userInfo: localStorage.getItem('userInfo')
            ? JSON.parse(localStorage.getItem('userInfo'))
            : null,
    },
    cart: {
        cartItems: localStorage.getItem('cartItems')
            ? JSON.parse(localStorage.getItem('cartItems'))
            : [],
        shippingAddress: localStorage.getItem('shippingAddress')
            ? JSON.parse(localStorage.getItem('shippingAddress'))
            : {},
        paymentMethod: 'PayPal',
    },
};
const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userSignin: userSigninReducer,
    userRegister: userRegisterReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderMineList: orderMineListReducer,
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    reducer,
    initialState,
    composeEnhancer(applyMiddleware(thunk))
);

export default store;