/**
 * App navigation types and utilities.
 * Single source of truth for application-level navigation state.
 */

export type AppView =
  | 'dashboard'
  | 'weather-map'
  | 'ai-insights'
  | 'alerts'
  | 'activity-log'
  | 'saved-places'
  | 'analytics'
  | 'settings';

/** Human-readable title for each view, used in the Header. */
export const VIEW_TITLES: Record<AppView, { title: string; subtitle: string }> = {
  'dashboard':    { title: 'Dashboard',        subtitle: 'Your personalized weather overview' },
  'weather-map':   { title: 'Weather Radar',    subtitle: 'Live radar & regional map' },
  'ai-insights':  { title: 'AI Insights',       subtitle: 'Personalized intelligence for your interests' },
  'alerts':       { title: 'Weather Alerts',    subtitle: 'Active alerts for your region' },
  'activity-log': { title: 'Activity Log',      subtitle: 'Your recent weather activity' },
  'saved-places': { title: 'Saved Places',     subtitle: 'Manage your saved locations' },
  'analytics':    { title: 'Analytics',        subtitle: 'Weather activity insights' },
  'settings':     { title: 'Settings',          subtitle: 'Preferences & profile' },
};

/** Maps a Sidebar `active` prop value to the corresponding AppView. */
export const SIDEBAR_ID_TO_VIEW: Record<string, AppView> = {
  home:     'dashboard',
  map:      'weather-map',
  insights: 'ai-insights',
  alerts:   'alerts',
  activity: 'activity-log',
  saved:    'saved-places',
  analytics:'analytics',
  settings: 'settings',
};

/** Maps an AppView back to the sidebar nav id for active highlighting. */
export const VIEW_TO_SIDEBAR_ID: Record<AppView, string> = {
  'dashboard':    'home',
  'weather-map':  'map',
  'ai-insights':  'insights',
  'alerts':       'alerts',
  'activity-log': 'activity',
  'saved-places': 'saved',
  'analytics':    'analytics',
  'settings':     'settings',
};
