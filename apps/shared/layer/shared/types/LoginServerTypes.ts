import type { ErrorResponse } from "./ErrorResponseFromAuthClient";
interface Success {
    ok: true,
    redirectTo: string | URL 
}
export type ResponseFromServiceLogin = Success | ErrorResponse;