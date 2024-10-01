export const ENDPOINTS = {
    login: '/login',
    register: '/register',
    logout: '/logout',
    courses: '/courses/all',
    filteredCourses: '/courses/filter',
    addCourse: '/courses/add',
    singleCourse: (id: string) => `/courses/${id}`,
    authors: '/authors/all',
    createAuthor: '/authors/add',
    singleAuthor: (id: string) => `/authors/${id}`,
    getUser: '/users/me',
};

export const ROUTES = {
    courses: '/courses',
    login: '/login',
    addCourse: '/courses/add',
};
