export interface CoreErrorResponse {
        data: { 
            date: string,
            code: number 
        },
        status: number,
        statusText: string,
        message: string,
        error?: string,
}