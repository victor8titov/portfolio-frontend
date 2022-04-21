import { combineReducers } from 'redux'
import homePage from './homepage'
import alert from './alert'
import skills from './skills'
import timeStamps from './time-stamps'
import projects from './projects'
import socialMedia from './social-media'
import settings from './settings'

const rootReducer = combineReducers({
  settings,
  alert,
  homePage,
  skills,
  timeStamps,
  projects,
  socialMedia
})

export default rootReducer
