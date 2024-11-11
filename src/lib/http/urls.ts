class URLS {
    static readonly LOGIN = '/public/google/login';
    static readonly LOGOUT = '/public/google/logout';
    static readonly PROFILE = '/public/user/me';
    static readonly GENDER = '/public/gender';
    static readonly EVENTS = '/public/event'
    static readonly EVENT = '/public/event/{id}'
    static readonly EVENT_REGISTER = '/public/event/{id}/register'
    static readonly PAGES = '/pages/{id}'
    static readonly FILE = '/public/files/{id}'
    static readonly PROFESSION = '/public/profession'
    static readonly LOCATION = '/public/location'
    static readonly PROGRAMMING_LANGUAGE = '/public/programminglanguage'
    static readonly SOCIAL_NETWORK = '/public/socialnetwork'
    static readonly ACTIVITIES = '/public/event/{id}/activity'
    static readonly ACTIVITIES_REGISTER = '/public/event/{id}/activity/register'
    static readonly ACTIVITY_REGISTER = '/public/activity/{id}/register'
}
export { URLS };