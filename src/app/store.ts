import { configureStore } from '@reduxjs/toolkit'
import roomSlices from 'app/features/room/roomSlices'
import uiSlices from 'app/features/ui/uiSlices'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import accountSlices from './features/account/accountSlices'

export const store = configureStore({
  reducer: {
    account: accountSlices,
    room: roomSlices,
    ui: uiSlices,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
