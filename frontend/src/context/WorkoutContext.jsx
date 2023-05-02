import { createContext, useReducer } from "react"

export const WorkoutContext = createContext()

export const WorkoutsContextProvider = ({ children }) => {
  

  return (
    <WorkoutsContext.Provider>
      { children }
    </WorkoutsContext.Provider>
  )
}