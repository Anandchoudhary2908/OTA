export const AUTH_SCREENS = {
  LOGIN: 'Login',
  FORGOT_PASSWORD: 'ForgotPassword',
};

export const APP_SCREENS = {
  ROOT: 'Root',
  HOME: 'Home',
  MAIN_TABS: 'MainTabs',
  CHATS: 'Chats',
  CHAT_DETAILS: 'ChatDetails',
  PROFILE: 'Profile',
  NOTIFICATION: 'Notification',
};

/**
 * Screens that live inside the tab navigator (MainTabs).
 * Use navigateTo(navigation, APP_SCREENS.X) from anywhere; add X here when it's a tab screen.
 */
export const TAB_NAVIGATOR_SCREENS = [
  APP_SCREENS.PROFILE,
  APP_SCREENS.HOME,
];

/**
 * Navigate to any screen from anywhere. Use this instead of navigation.navigate()
 * when the target might be inside a nested navigator (e.g. tabs).
 * Example: navigateTo(navigation, APP_SCREENS.PROFILE) or navigateTo(navigation, APP_SCREENS.CHATS, { id: '1' })
 */
export function navigateTo(navigation, screenName, params = {}) {
  if (TAB_NAVIGATOR_SCREENS.includes(screenName)) {
    navigation.navigate(APP_SCREENS.ROOT, { screen: screenName, params });
  } else {
    navigation.navigate(screenName, params);
  }
}
