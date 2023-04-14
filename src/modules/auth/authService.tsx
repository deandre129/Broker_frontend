import authAxios from '@/modules/shared/axios/authAxios';
import { AuthToken } from '@/modules/auth/authToken';
import AuthCurrentTenant from '@/modules/auth/authCurrentTenant';
import { tenantSubdomain } from '../tenant/tenantSubdomain';

export default class AuthService {
  static async sendContact(
    name,
    email,
    subject,
    content,
    recaptcha,
  ) {
    const response = await authAxios.post(
      '/auth/send-contact',
      {
        name,
        email,
        subject,
        content,
        recaptcha,
      },
    );

    return response.data;
  }

}
