import { CurrProjectProps } from '@/types/types'
import { createSlice } from '@reduxjs/toolkit'

const initialState: CurrProjectProps = {
  id: 0,
  livestreamingId: ' ',
  avatarName: ' ',
  aiRole: ' ',
  livestreamTopic: ' ',
  mood: ' ',
  platform: ' ',
  language: ' ',
  aiKnowlagge: ' ',
  lastOpenAt: null,
  projects: [],
}

export const currProjectSlice = createSlice({
  name: 'currProject',
  initialState,
  reducers: {
    initState: (state, action) => {
      const {
        id,
        language,
        aiKnowlagge,
        aiRole,
        avatarName,
        livestreamingId,
        livestreamTopic,
        mood,
        platform,
        projects,
      } = action.payload

      state.id = id
      state.livestreamingId = livestreamingId
      state.avatarName = avatarName
      state.aiRole = aiRole
      state.livestreamTopic = livestreamTopic
      state.mood = mood
      state.platform = platform
      state.language = language
      state.aiKnowlagge = aiKnowlagge
      state.projects = projects
    },
    setId: (state, action) => {
      state.id = action.payload
    },
    setLivestreamingId: (state, action) => {
      state.livestreamingId = action.payload
    },
    setAvatarName: (state, action) => {
      state.avatarName = action.payload
    },
    setAiRole: (state, action) => {
      state.aiRole = action.payload
    },
    setLivestreamTopic: (state, action) => {
      state.livestreamTopic = action.payload
    },
    setMood: (state, action) => {
      state.mood = action.payload
    },
    setPlatform: (state, action) => {
      state.platform = action.payload
    },
    setLanguage: (state, action) => {
      state.language = action.payload
    },
    setAiKnowlagge: (state, action) => {
      state.aiKnowlagge = action.payload
    },
    setProjects: (state, action) => {
      state.projects = action.payload
    },
  },
})

export const { actions } = currProjectSlice
export const currProjectAction = actions
export const {
  initState,
  setId,
  setLivestreamingId,
  setAvatarName,
  setAiRole,
  setLivestreamTopic,
  setMood,
  setPlatform,
  setLanguage,
  setAiKnowlagge,
  setProjects,
} = actions

export default currProjectSlice.reducer
