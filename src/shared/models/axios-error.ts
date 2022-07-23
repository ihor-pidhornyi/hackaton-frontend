export type AxiosError = {
    code: string
    config: object,
    message: string,
    name: 'AxiosError',
    request: XMLHttpRequest,
    response: {
        config: object,
        data: {
            error: string,
            timestamp: string
        },
        status: number,
        statusText: string,
        headers: object,
        request: XMLHttpRequest
    }
}