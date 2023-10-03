export interface PayRequest {
  amount: number
  accountId: string
  transactionId: string | number
}

export interface GraphQLResponse {
  code: number
  success: boolean
  message: string
  id?: string
}

export type CreateRequestResponse = {createRequest: GraphQLResponse}