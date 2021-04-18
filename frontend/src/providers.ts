import axios from 'axios';

export async function registerUser(userInfo: any): Promise<void> {
  const res = await axios.post('http://localhost:3005/register', {
    withCredentials: true,
    ...userInfo,
  });

  console.log(res);
}
