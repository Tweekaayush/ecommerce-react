import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import db, { getDocs, collection, getDoc, doc, setDoc } from "../config/firebase"

const initialState = {
    loading: false,
    uid: '',
    username: '',
    profileImg: '',
    email: '',
    wishlist: [],
    orders: [],
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
                wishlist: []
            } )
    }   
    return {
        ...payload, 
        orders: [],
        wishlist: []
    }
})

export const addToWishlist = createAsyncThunk('addToWishlist', async(payload, {getState})=>{

    const state = getState().user
    const found = state.wishlist.find((product) => product.id === payload.id)
    let newWishlist = []


    if(found != undefined){
        newWishlist = state.wishlist.filter((product) => product.id !== payload.id)
    }else{
        newWishlist = [...state.wishlist, payload]
    }

    await setDoc(doc(collection(db, 'users'), state.uid ),{
        ...state,
        wishlist: newWishlist
    })

    return newWishlist
})

export const removeFromWishlist = createAsyncThunk('removeFromWishlist', async(payload, {getState})=>{
    const state = getState().user
    const newWishlist = state.wishlist.filter((product) => product.id !== payload)

    await setDoc(doc(collection(db, 'users'), state.uid ),{
        ...state,
        wishlist: newWishlist
    })

    return newWishlist
})

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signOutUser: (state)=>{
            state.uid = ''
            state.username = ''
            state.email = ''
            state.profileImg = ''
            state.wishlist = []
        },
    },
    extraReducers: (builder)=>{
        builder.addCase(getUserDetails.pending, (state)=>{
            state.loading = true
        })
        builder.addCase(getUserDetails.fulfilled, (state, action)=>{
            state.loading = false
            state.uid = action.payload.uid
            state.username = action.payload.username
            state.email = action.payload.email
            state.profileImg = action.payload.profileImg
            state.wishlist = action.payload.wishlist
            state.orders = action.payload.orders
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
            state.wishlist = action.payload
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
            state.wishlist = action.payload
        })
        builder.addCase(removeFromWishlist.rejected, (state, action)=>{
            state.loading = false
            state.error = action.payload
        })
    }
})


export const {setUser, signOutUser} = userSlice.actions

export default userSlice.reducer