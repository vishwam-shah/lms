'use client'

import { useLoadUserQuery } from '@/redux/features/api/apiSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useSession } from 'next-auth/react';
import { useSocialAuthMutation } from '@/redux/features/auth/authApi';
import { rehydrateAuth } from '@/redux/features/auth/authSlice';
import { useEffect, useRef } from 'react';

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state: any) => state.auth);
  const { data: session } = useSession();
  const [socialAuth] = useSocialAuthMutation();
  const hasRehydrated = useRef(false);
  
  // Rehydrate auth state from localStorage on mount (only once)
  useEffect(() => {
    if (!hasRehydrated.current) {
      dispatch(rehydrateAuth());
      hasRehydrated.current = true;
    }
  }, [dispatch]);
  
  // Load user data only when needed, without aggressive polling
  useLoadUserQuery({}, {
    skip: !!user, // Skip if user already exists in Redux
    refetchOnMountOrArgChange: false,
    refetchOnFocus: false,
    refetchOnReconnect: false,
  });

  useEffect(() => {
    // Sync with NextAuth session
    if (session && !user) {
      socialAuth({
        email: session.user?.email,
        name: session.user?.name,
        avatar: session.user?.image,
      });
    }
  }, [session, user, socialAuth]);

  return <>{children}</>;
}
