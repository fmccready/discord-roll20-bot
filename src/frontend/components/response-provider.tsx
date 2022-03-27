import * as React from 'react'

interface ResponseContextInterface {
  responses: any[]
  setResponses: React.Dispatch<any>
}

const ResponseContext: React.Context<{
  responses: any[]
  setResponses: React.Dispatch<any>
}> = React.createContext({
  responses: [],
  // tslint:disable-next-line: no-empty
  setResponses: () => {
    /* istanbul ignore next */
    console.error('This is never supposed to happen!')
  },
} as ResponseContextInterface)

export const ResponseProvider: React.FC<{ value?: any[] }> = ({
  children,
  value,
}) => {
  const reducer = (
    currentResponses: string[],
    action: { type: 'add' | 'clear'; response?: string }
  ) => {
    switch (action.type) {
      case 'add':
        return [...currentResponses, action.response]
      case 'clear':
        return []
      default:
        return currentResponses
    }
  }

  const [responses, setResponses] = React.useReducer(reducer, value || [])

  return (
    <ResponseContext.Provider value={{ responses, setResponses }}>
      {children}
    </ResponseContext.Provider>
  )
}

export const ResponseConsumer = ResponseContext.Consumer

export const useResponse = () => React.useContext(ResponseContext)
