import { plans } from "~~/lib/db/index";

type SelectPlan = typeof plans.$inferSelect;



export interface PublicPlans {
    plans: (SelectPlan & { price: number })[];
}