export default interface UserMe {
    successful: boolean;
    result: {
        name: string;
        email: string;
        password: string;
        role: string;
        id: string;
    };
}
