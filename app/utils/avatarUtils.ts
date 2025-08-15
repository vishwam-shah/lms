import avatarDefault from "../../public/assets/3551739.jpg";
import { StaticImageData } from "next/image";

/**
 * Get the appropriate avatar URL with fallback logic
 * @param user - User object from Redux store
 * @param sessionAvatar - Avatar from session data
 * @returns string | StaticImageData - Avatar URL or default avatar
 */
export const getAvatarUrl = (user: any, sessionAvatar?: string): string | StaticImageData => {
  // Priority: user.avatar.url > sessionAvatar > default avatar
  if (user?.avatar?.url) {
    return user.avatar.url;
  }
  
  if (sessionAvatar) {
    return sessionAvatar;
  }
  
  return avatarDefault;
};

/**
 * Get avatar URL as string specifically for MUI components
 * @param user - User object from Redux store
 * @param sessionAvatar - Avatar from session data
 * @returns string - Avatar URL as string
 */
export const getAvatarUrlString = (user: any, sessionAvatar?: string): string => {
  // Priority: user.avatar.url > sessionAvatar > default avatar as src
  if (user?.avatar?.url) {
    return user.avatar.url;
  }
  
  if (sessionAvatar) {
    return sessionAvatar;
  }
  
  // Convert StaticImageData to string for MUI components
  return avatarDefault.src || avatarDefault.toString();
};

/**
 * Check if user has a custom avatar (not using default)
 * @param user - User object from Redux store
 * @param sessionAvatar - Avatar from session data
 * @returns boolean
 */
export const hasCustomAvatar = (user: any, sessionAvatar?: string): boolean => {
  return !!(user?.avatar?.url || sessionAvatar);
};
