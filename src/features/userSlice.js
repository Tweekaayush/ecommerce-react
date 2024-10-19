import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import db, { getDocs, collection } from "../config/firebase"

const initialState = {
    loading: false,
    uid: '',
    username: '',
    profileImg: '',
    email: '',
    wishlist: [],
    error: ''
}

const fetchWishlist = createAsyncThunk('fetchWishlist', async()=>{

    const wishlist = []
    const snapshot = await getDocs(collection(db, 'wishlist'))   

    snapshot.forEach((doc)=>{
        wishlist = [...wishlist, doc.data()]
    })

    return wishlist
})

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action)=>{
            state.uid = action.payload.uid
            state.username = action.payload.username
            state.email = action.payload.email
            state.profileImg = action.payload.profileImg
        },
        signOutUser: (state)=>{
            state.uid = ''
            state.username = ''
            state.email = ''
            state.profileImg = ''
            state.wishlist = []
        }
    },
    extraReducers: (builder)=>{
        builder.addCase(fetchWishlist.pending, (state)=>{
            state.loading = true
        })
        builder.addCase(fetchWishlist.fulfilled, (state, action)=>{
            state.loading = false
            state.wishlist = action.payload
        })
        builder.addCase(fetchWishlist.rejected, (state, action)=>{
            state.loading = false
            state.error = action.payload
        })
    }
})


export const {setUser, signOutUser} = userSlice.actions

export default userSlice.reducer