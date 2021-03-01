import { AxiosInstance, AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { Repository, User } from './models';

export class UserService {
  constructor(private httpClient: AxiosInstance) {
    this.httpClient = httpClient;
  }

  public async get(username: string): Promise<User | undefined> {
    try {
      const response = await this.httpClient.get<User>(
        `/users/${username}`,
        {}
      );

      if (response && response.data) {
        return response.data;
      }
    } catch (error) {
      const { response } = error as AxiosError;
      if (response && response.data) {
        const { message } = response.data;
        if (message) {
          toast(message, {
            position: 'top-right',
            type: 'error',
            pauseOnHover: false,
          });
        } else {
          toast('Opss...', {
            position: 'top-right',
            type: 'error',
            pauseOnHover: false,
          });
        }
      }
      throw error;
    }

    return undefined;
  }

  public async getStarredRepos(
    username: string
  ): Promise<Repository[] | undefined> {
    try {
      const response = await this.httpClient.get<Repository[]>(
        `/users/${username}/starred`,
        {}
      );

      if (response && response.data) {
        return response.data;
      }
    } catch (error) {
      const { response } = error as AxiosError;
      if (response && response.data) {
        const { message } = response.data;
        if (message) {
          toast(message, {
            position: 'top-right',
            type: 'error',
            pauseOnHover: false,
          });
        } else {
          toast('Opss...', {
            position: 'top-right',
            type: 'error',
            pauseOnHover: false,
          });
        }
      }
      throw error;
    }

    return undefined;
  }
}
