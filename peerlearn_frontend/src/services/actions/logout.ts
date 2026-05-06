import { authKey } from '@/constants/auth.key';
import { deleteCookies } from './delete_Cookies';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

export const logoutUser = (router: AppRouterInstance) => {
   localStorage.removeItem(authKey);
   deleteCookies([authKey, 'ref_token']);
   router.push('/');
   router.refresh();
};