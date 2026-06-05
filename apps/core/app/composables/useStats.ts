export function useStats() {
    const event = useRequestEvent();
    const fetcher = useRequestFetch();
    const headers = useRequestHeaders();

    const data = useAsyncData('stats', async () => {
        const res = await executeRequest<UsageStats>('/stats', 'GET', {}, {}, {}, {event, headers, fetcher});
        if (!res.ok) {
            throw new Error(res.reason || 'Failed to fetch API tokens');
        }
        return res.data;
    });
    return data;
}