import type { SelectEarlyAccess } from '#shared/types/EarlyAccessRow';

export function useGetUserWaitlist() {
    const event = useRequestEvent();
    const fetcher = useRequestFetch();
    const headers = useRequestHeaders();

    const data = useAsyncData('user-waitlist', async () => {
        const res = await executeRequest<SelectEarlyAccess>('/check-register-waitlist', 'GET', {}, {}, {}, {event, headers, fetcher});
        if (!res.ok) {
            throw new Error(res.reason || 'Failed to fetch waitlist');
        }
        return res.data;
    });

    return data;
}
