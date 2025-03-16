export interface Message {
  id: string;
  type: "user" | "bot";
  text: string;
  createdAt?: Date;
}

export interface ChatState {
  messages: Message[];
  loading: boolean;
  error: string | null;
}

export type ChatSession = {
  id: number;
  title: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
};

export interface NewMsg {
  id: string;
  role: string;
  content: string;
  createdAt?: Date;
  updatedAt?: Date;
}
