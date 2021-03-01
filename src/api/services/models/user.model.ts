export interface User {
  login: string;
  avatar_url: string;
  gravatar_id: string;
  html_url: string;
  name: string;
  company: string;
  blog: string;
  location: string;
  email: string;
  bio: string;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
}

export interface Repository {
  id: number;
  name: string;
  full_name: string;
  owner: Owner;
  private: boolean;
  html_url: string;
  description: string;
  fork: boolean;
  url: string;
  homepage: string;
  language: null;
  forks_count: number;
  stargazers_count: number;
  watchers_count: number;
  created_at: string;
  subscribers_count: number;
  forks: number;
  selected?: boolean;
}

export interface Owner {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
}
