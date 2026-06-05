import type { CleanedDataWithoutPubKey } from '~~/shared/types/APiList';

export function useListApiToken() {
    const event = useRequestEvent();
    const fetcher = useRequestFetch();
    const headers = useRequestHeaders();

    return useAsyncData('list-api-tokens', async () => {
        const res = await executeRequest<CleanedDataWithoutPubKey['data']>('/api/auth/api-tokens', 'GET', undefined, undefined, {}, {event, fetcher, headers});

        if (!res.ok) {
            throw new Error(res.reason || 'Failed to fetch API tokens');
        }

        return res.data;
    });
}