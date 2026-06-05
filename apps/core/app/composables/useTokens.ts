import type { ApiTokenRotationSuccess, CreationSuccess, IpRestrictionUpdateInput, NewApiTokenInput, Revoke } from "~~/shared/types/apiTokens";

type ActionResultRef<T> = Ref<T | undefined>;
interface IpUpdateSuccess {
    msg: string;
}

export function useApiTokens() {
    const event = useRequestEvent();
    const fetcher = useRequestFetch();
    const headers = useRequestHeaders();
    const isLoading = ref(false);
    const error = ref<string>();

    const createdToken = ref<CreationSuccess>();
    const revokedToken = ref<Revoke>();
    const rotatedToken = ref<ApiTokenRotationSuccess>();
    const ipUpdateResult = ref<IpUpdateSuccess>();

    const createToken = async (body: NewApiTokenInput): Promise<ActionResultRef<CreationSuccess> | null> => {
        isLoading.value = true;
        error.value = undefined;

        const res = await executeRequest<CreationSuccess>('/api-tokens/new-token', 'POST', body, {}, {}, {event, fetcher, headers});
        
        if (!res.ok) {
            error.value = res.reason;
            isLoading.value = false;
            return null;
        }

        isLoading.value = false;
    
        createdToken.value = res.data;
        return createdToken;
    };

    const revoke = async (tokenId?: number): Promise<ActionResultRef<Revoke> | null> => {
        if(!tokenId) return null;

        isLoading.value = true;
        error.value = undefined;

        const res = await executeRequest<Revoke>('/api-tokens/revoke', 'POST', { tokenId }, {}, {}, {event, fetcher, headers});
        if (!res.ok) {
            error.value = res.reason;
            isLoading.value = false;
            return null;
        }
        isLoading.value = false;
        
        revokedToken.value = res.data;
        return revokedToken;
    };

    const rotate = async (tokenId?: number): Promise<ActionResultRef<ApiTokenRotationSuccess> | null> => {
        if(!tokenId) return null;
        isLoading.value = true;
        error.value = undefined;   

        const res = await executeRequest<ApiTokenRotationSuccess>('/api-tokens/rotate', 'POST', { tokenId }, {}, {}, {event, fetcher, headers});

        if (!res.ok) {
            error.value = res.reason;
            isLoading.value = false;
            return null;
        }

        isLoading.value = false;
        
        rotatedToken.value = res.data;
        return rotatedToken;
    };

    const updateIp = async (ipv4: string[] | undefined, tokenId?: number): Promise<ActionResultRef<IpUpdateSuccess> | null> => {
        if(!tokenId) return null;

        isLoading.value = true;
        error.value = undefined;   
        const dataToSend: IpRestrictionUpdateInput = {
            tokenId,
            ipv4
        };

    const res = await executeRequest<IpUpdateSuccess>('/api-tokens/ip-restriction-update', 'POST', { ...dataToSend }, {}, {}, {event, fetcher, headers});

      if (!res.ok) {
            error.value = res.reason;
            isLoading.value = false;
            return null;
        }

        isLoading.value = false;
        
        ipUpdateResult.value = res.data;
        return ipUpdateResult;
    };

    return {
        createToken,
        revoke,
        rotate, 
        updateIp,
        createdToken,
        revokedToken,
        rotatedToken,
        ipUpdateResult,
        error,
        isLoading
    };
}