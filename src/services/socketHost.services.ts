export const socketHost = () => {
    const env: any = process.env.NEXT_PUBLIC_ENV;
    const env_local = process.env.NEXT_PUBLIC_SOCKET_ENV

    const baseUrl = 'http://localhost:4000';

    const envHostMap: any = {
        localdevelopment: baseUrl,
        development: process.env.NEXT_PUBLIC_NODE_ENV,
        production: process.env.NEXT_PUBLIC_NODE_ENV,
    };
    return env_local === "local" ? baseUrl : envHostMap[env]
};