export type Source = {
  source?: string | null;
  chunk_id?: number | string | null;
  score?: number | null;
};

export type ApiResponse = {
  question?: string;
  answer?: string;
  sources?: Source[];
  error?: string;
};

export type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  sources?: Source[];
};


export interface FitnessSource {
  source?: string | null;
  chunk_id?: string | number | null;
  score?: number;
}

export type AnswerItem = {
  type: string;
  text: string;
  extras?: {
    signature?: string;
  };
};

export type FitnessApiResponse = {
  question: string;
  answer: string | AnswerItem[];
  error?:string;
  sources: {
    source: string | null;
    chunk_id: number;
    score: number;
  }[];
};
