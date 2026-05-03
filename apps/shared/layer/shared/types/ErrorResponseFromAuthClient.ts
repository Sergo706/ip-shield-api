export interface ErrorResponse {
        data: { 
            date: string,
            code: number 
        },
        status: number,
        statusText: string,
        message: string,
        error?: string,
}