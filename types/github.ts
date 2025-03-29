export interface Commit {
  id: string
  commit: {
    message: string
    author: {
      date: string
    }
  }
  author: {
    login: string
    avatar_url: string
  }
  branch?: string
  isNew?: boolean
}

