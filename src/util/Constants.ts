export function GOOGLE_AUTH_URL(locale: string): string {
    return process.env.REACT_APP_REST_API_URL + '/oauth2/authorize/google?redirect_uri=' + process.env.REACT_APP_OAUTH2_REDIRECT_URI + '&language=' + locale
};

export function FACEBOOK_AUTH_URL(locale: string): string {
    return process.env.REACT_APP_REST_API_URL + '/oauth2/authorize/facebook?redirect_uri=' + process.env.REACT_APP_OAUTH2_REDIRECT_URI + '&language=' + locale
};

export function GITHUB_AUTH_URL(locale: string): string {
    return process.env.REACT_APP_REST_API_URL + '/oauth2/authorize/github?redirect_uri=' + process.env.REACT_APP_OAUTH2_REDIRECT_URI + '&language=' + locale
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
    ACCOUNT = '/account',
    LOGIN = '/login',
    SIGNUP = '/signup',
    PROFILE = '/profile',
    FORGOTTEN_PASSWORD = '/forgotten-password',
    PASSWORD_RESET = '/password-reset',
    OAUTH2_REDIRECT = '/oauth2/redirect',
    ACTIVATE_ACCOUNT = '/activate-account',
    CONFIRM_EMAIL_CHANGE = '/confirm-email-change',
}
