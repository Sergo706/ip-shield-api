import type { CoreErrorResponse } from "./ErrorResponseFromAuthClient";
interface Success {
    ok: true,
    redirectTo: string | URL 
}
export type CoreResponseFromServiceLogin = Success | CoreErrorResponse;