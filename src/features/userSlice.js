import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import db, { collection, getDoc, doc, setDoc, deleteDoc } from "../config/firebase"
import { addToCart, clearCart } from "./cartSlice";

const initialState = {
    loading: false,
    data: {
        uid: '',
        username: '',
        profileImg: '',
        email: '',
        address: {
            pincode: '',
            city: '',
            state: '',
            address_line: '',
            town: ''
        },
        wishlist: [],
        orders: [],
        current_order: []
    },
    error: ''
}

export const getUserDetails = createAsyncThunk('getUserDetails', async (payload)=>{
    const snapshot = await getDoc(doc(db, 'users', payload.uid))
    
    if(snapshot.exists()){
        return snapshot.data()
    }else{    
        await setDoc(doc(collection(db, 'users'), payload.uid ),{
                ...payload,
                orders: [],
                wishlist: [],
                address: {
                    pincode: '',
                    city: '',
                    state: '',
                    address_line: '',
                    town: ''
                }
            } )
    }   
    return {
        ...payload, 
        orders: [],
        wishlist: [],
        address: {
            pincode: '',
            city: '',
            state: '',
            address_line: '',
            town: ''
        }
    }
})

export const deleteUserAccount = createAsyncThunk('deleteUserAccount', async(payload, {getState, dispatch})=>{

    const state = getState().user.data
    
    await deleteDoc(doc(db, "users", state.uid));

    dispatch(signOutUser())
})

export const addToWishlist = createAsyncThunk('addToWishlist', async(payload, {getState})=>{

    const state = getState().user
    const found = state.data.wishlist.find((product) => product.id === payload.id)
    let newWishlist = []

    if(found === undefined){
        newWishlist = [...state.data.wishlist, payload]
    }else{
        return state.data.wishlist
    }

    await setDoc(doc(collection(db, 'users'), state.data.uid ),{
        ...state.data,
        wishlist: newWishlist
    })


    return newWishlist
})

export const removeFromWishlist = createAsyncThunk('removeFromWishlist', async(payload, {getState})=>{

    const state = getState().user
    const newWishlist = state.data.wishlist.filter((product) => product.id !== payload)

    await setDoc(doc(collection(db, 'users'), state.data.uid ),{
        ...state.data,
        wishlist: newWishlist
    })

    return newWishlist
})

export const moveToCart = createAsyncThunk('moveToCart', async(payload, {getState, dispatch})=>{

    const state = getState().user
    const newWishlist = state.data.wishlist.filter((product) => product.id !== payload.id)

    await setDoc(doc(collection(db, 'users'), state.data.uid ),{
        ...state.data,
        wishlist: newWishlist
    })

    dispatch(addToCart(payload))

    return newWishlist
})

export const updateUser = createAsyncThunk('updateUser', async(payload, {getState})=>{

    const state= getState().user

    await setDoc(doc(collection(db, 'users'), state.data.uid ),{
        ...state.data,
        ...payload
    })

    return payload
})

export const createOrder = createAsyncThunk('createOrder', async(payload, {getState, dispatch})=>{
    
    const state = getState().user

    const newOrders = [...state.data.orders, ...payload]

    await setDoc(doc(collection(db, 'users'), state.data.uid), {
        ...state.data,
        orders: newOrders
    })
    dispatch(clearCart())
    return newOrders
})

export const updateOrders = createAsyncThunk('updateOrder', async(payload, {getState})=>{

    const state = getState().user
    
    const newOrders = state.data.orders.filter((order)=>order.order_id !== payload)
    await setDoc(doc(collection(db, 'users'), state.data.uid), {
        ...state.data,
        orders: newOrders
    })

    return newOrders

})

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signOutUser: (state)=>{
            state.data = {
                uid: '',
                username: '',
                profileImg: '',
                email: '',
                address: {
                    pincode: '',
                    city: '',
                    state: '',
                    address_line: '',
                    town: ''
                },
                wishlist: [],
                orders: [],
            }
        },
        clearCurrentOrder: (state, action)=>{
            state.data.current_order = []
        },
    },
    extraReducers: (builder)=>{
        builder.addCase(getUserDetails.pending, (state)=>{
            state.loading = true
        })
        builder.addCase(getUserDetails.fulfilled, (state, action)=>{
            state.loading = false
            state.data.uid = action.payload.uid
            state.data.username = action.payload.username
            state.data.email = action.payload.email
            state.data.profileImg = action.payload.profileImg
            state.data.wishlist = action.payload.wishlist
            state.data.orders = action.payload.orders
            state.data.address = action.payload.address
        })
        builder.addCase(getUserDetails.rejected, (state, action)=>{
            state.loading = false
            state.error = action.payload
        })
        builder.addCase(addToWishlist.pending, (state)=>{
            state.loading = true
        })
        builder.addCase(addToWishlist.fulfilled, (state, action)=>{
            state.loading = false
            state.data.wishlist = action.payload
        })
        builder.addCase(addToWishlist.rejected, (state, action)=>{
            state.loading = false
            state.error = action.payload
        })
        builder.addCase(removeFromWishlist.pending, (state)=>{
            state.loading = true
        })
        builder.addCase(removeFromWishlist.fulfilled, (state, action)=>{
            state.loading = false
            state.data.wishlist = action.payload
        })
        builder.addCase(removeFromWishlist.rejected, (state, action)=>{
            state.loading = false
            state.error = action.payload
        })
        builder.addCase(moveToCart.pending, (state)=>{
            state.loading = true
        })
        builder.addCase(moveToCart.fulfilled, (state, action)=>{
            state.loading = false
            state.data.wishlist = action.payload
        })
        builder.addCase(moveToCart.rejected, (state, action)=>{
            state.loading = false
            state.error = action.payload
        })
        builder.addCase(updateUser.pending, (state) =>{
            state.loading = true
        })
        builder.addCase(updateUser.fulfilled, (state, action) =>{
            state.loading = false
            state.data = {...state.data, ...action.payload}
        })
        builder.addCase(updateUser.rejected, (state, action) =>{
            state.loading = false
            state.error = action.payload
        })
        builder.addCase(createOrder.pending, (state) =>{
            state.loading = true
        })
        builder.addCase(createOrder.fulfilled, (state, action) =>{
            state.loading = false
            state.data = {...state.data, orders: action.payload}
        })
        builder.addCase(createOrder.rejected, (state, action) =>{
            state.loading = false
            state.error = action.payload
        })
        builder.addCase(updateOrders.pending, (state) =>{
            state.loading = true
        })
        builder.addCase(updateOrders.fulfilled, (state, action) =>{
            state.loading = false
            state.data = {...state.data, orders: action.payload}
        })
        builder.addCase(updateOrders.rejected, (state, action) =>{
            state.loading = false
            state.error = action.payload
        })
    }
})


export const {setUser, signOutUser, clearCurrentOrder} = userSlice.actions

export default userSlice.reducer