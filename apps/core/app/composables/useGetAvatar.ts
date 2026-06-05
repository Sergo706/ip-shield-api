
export function useGetAvatar() {
    const event = useRequestEvent();
    const fetcher = useRequestFetch();
    const headers = useRequestHeaders();

    const data = useAsyncData('avatar', async () => {
        const res = await executeRequest<UserProfile>('/avatar', 'GET', {}, {}, {}, {event, headers, fetcher});
        if (!res.ok) {
            throw new Error(res.reason || 'Failed to fetch avatar');
        }
        return res.data;
    });

    return data;
}

