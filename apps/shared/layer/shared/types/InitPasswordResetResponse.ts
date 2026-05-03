import type { ErrorResponse } from "./ErrorResponseFromAuthClient";

interface Success {
    ans: string
}

export type PasswordResetResponse = Success | ErrorResponse;