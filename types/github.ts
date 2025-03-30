export interface Commit {
  author: string;
  email: string;
  commit_message: string;
  avatar: string;
  id: string;
  modified_files: string[];
  date: string;
  commit_url: string;
  branch: string;
}
