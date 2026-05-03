
interface Success {
     ok: boolean;
    redirectTo?: string;
}

interface Error {
  ok: boolean;
  receivedAt: string;
  error: string;
}
export type SignUpResponse = Success | Error;