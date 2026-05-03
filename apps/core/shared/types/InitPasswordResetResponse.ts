import type { CoreErrorResponse } from "./ErrorResponseFromAuthClient";

interface Success {
    ans: string
}

export type CorePasswordResetResponse = Success | CoreErrorResponse;