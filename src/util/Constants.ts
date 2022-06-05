export enum OAuth2Provider {
    GOOGLE = "google",
    GITHUB = "github",
    FACEBOOK = "facebook"
}

export const OAUTH2_PROVIDER_LOCAL_STORAGE_NAME = "o2authProvider";
export const OAUTH2_USE_RECOVERY_LOCAL_STORAGE_NAME = "userRecovery";

export function O2AUTH_URL(provider: OAuth2Provider, locale: string): string {
    return `${process.env.REACT_APP_REST_API_URL}/oauth2/authorize/${provider}?redirect_uri=${process.env.REACT_APP_OAUTH2_REDIRECT_URI}&language=${locale}`
};


export function O2AUTH_URL_TWO_FACTOR(provider: OAuth2Provider, locale: string, twoFactorCode: string): string {
    return `${process.env.REACT_APP_REST_API_URL}/oauth2/authorize/${provider}?redirect_uri=${process.env.REACT_APP_OAUTH2_REDIRECT_URI}&language=${locale}&two_factor_code=${twoFactorCode}`
};

export function O2AUTH_URL_RECOVERY(provider: OAuth2Provider, locale: string, recoveryCode: string): string {
    return `${process.env.REACT_APP_REST_API_URL}/oauth2/authorize/${provider}?redirect_uri=${process.env.REACT_APP_OAUTH2_REDIRECT_URI}&language=${locale}&recovery_code=${recoveryCode}`
};


export enum Routes {
    FEED = '/feed',
    ABOUT = '/about',
    EXPLORE = '/explore',
    DIET_PLAN = '/diet-plan',
    RECIPES = '/recipes',
    MY_RECIPES = '/recipes/my-recipes',
    CREATE_RECIPE = '/recipes/create',
    FAVOURITE_RECIPES = '/recipes/favourite',
    RECIPE = '/recipes/recipe',
    LOGIN = '/login',
    SIGNUP = '/signup',
    PROFILE = '/profile',
    FORGOTTEN_PASSWORD = '/forgotten-password',
    PASSWORD_RESET = '/password-reset',
    OAUTH2_REDIRECT = '/oauth2/redirect',
    ACTIVATE_ACCOUNT = '/activate-account',
    CONFIRM_EMAIL_CHANGE = '/confirm-email-change',
}
