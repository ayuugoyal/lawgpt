export interface Message {
  id: string
  type: "user" | "bot"
  text: string
  createdAt?: Date
}

export interface ChatState {
  messages: Message[]
  loading: boolean
  error: string | null
}

