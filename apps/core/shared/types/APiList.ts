

export interface CleanedDataWithoutPubKey {
    ok: boolean,
    date: string,
    data: {
    tokenList: {
        id: number;
        name: string;
        created_at: string;
        expires_at: string;
        restricted_to_ip_address: string[] | null;
        last_used: string;
        usage_count: number;
        privilege_type: "demo" | "restricted" | "protected" | "full" | "custom";
    }[] | undefined;
    total: number;
    totalInvalidTokens: number;
    totalValidTokens: number;
    }
}