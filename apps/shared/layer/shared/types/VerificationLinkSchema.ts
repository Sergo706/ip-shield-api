export interface VerificationLinkSchema {
    visitor: string;
    token: string;
    reason: string;
    random: string;
}