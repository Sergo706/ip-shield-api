export interface UsageStats {
    reqThisMonth: number;
    totalQuota: number;
    remainingThisMonth: number
    plan: 'free' | 'pro' | 'custom'
}