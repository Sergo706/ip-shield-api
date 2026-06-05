import { dbPool } from "./connection";
import { plans, planPrices } from "./schema/plan";

type InsertPlan = typeof plans.$inferInsert;
type InsertPlanPrice = typeof planPrices.$inferInsert;

export async function populatePlans() {
    console.log('Creating default plans...');
    try {
        const defaultPlans: InsertPlan[] = [
              {
                code: 'free',
                name: 'Free',
                billingMode: 'free',
                requestsPerMinute: 50,
                monthlyQuota: 1000,
                features: {
                    bulkLookup: false,
                    apiKeyLimit: 1,
                    supportIncluded: false,
                    freeDescription: 'Free forever',
                    customDatasets: 0,
                },
                isPublic: true,
                isActive: true,
            },
            {
                code: 'pro',
                name: 'Pro',
                billingMode: 'processor',
                requestsPerMinute: 100,
                monthlyQuota: 3000,
                features: {
                    bulkLookup: true,
                    apiKeyLimit: 3,
                    supportIncluded: true,
                    freeDescription: 'More generous limits',
                    customDatasets: 1,
                },
                isPublic: true,
                isActive: false,   
            },
            {
                code: 'custom',
                name: 'Custom',
                billingMode: 'manual', 
                requestsPerMinute: 1000,
                monthlyQuota: 3000000,
                features: {
                    bulkLookup: true,
                    apiKeyLimit: 10,
                    supportIncluded: true,
                    freeDescription: 'Best for large teams & enterprises',
                    customDatasets: 5,
                },
                isPublic: true,
                isActive: false, 
            }
        ];
        
        const existingPlans = await dbPool.select().from(plans);
        const existingCodes = new Set(existingPlans.map(p => p.code));
        const plansToInsert = defaultPlans.filter(p => !existingCodes.has(p.code));
        
        if (plansToInsert.length > 0) {
            await dbPool.insert(plans).values(plansToInsert);
            console.log(`Inserted ${plansToInsert.length.toString()} default plans.`);
        } else {
            console.log('Default plans already exist.');
        }
        console.log('Done');
        console.log('Creating default prices...');
        const allPlans = await dbPool.select().from(plans);
        const existingPrices = await dbPool.select().from(planPrices);
        const existingPricePlanIds = new Set(existingPrices.map(p => p.planId));

        const freePlan = allPlans.find(p => p.code === 'free');
        const proPlan = allPlans.find(p => p.code === 'pro');
        const customPlan = allPlans.find(p => p.code === 'custom');

        const defaultPrices: InsertPlanPrice[] = [];
        if (freePlan && !existingPricePlanIds.has(freePlan.id)) {
            defaultPrices.push({
                planId: freePlan.id,
                currency: 'USD',
                interval: 'month',
                amountCents: 0,
                provider: 'internal',
                active: true,
            });
        }
        
        if (proPlan && !existingPricePlanIds.has(proPlan.id)) {
            defaultPrices.push({
                planId: proPlan.id,
                currency: 'USD',
                interval: 'month',
                amountCents: 3000,
                provider: 'processor',
                active: true,
            });
        }
        
        if (customPlan && !existingPricePlanIds.has(customPlan.id)) {
            defaultPrices.push({
                planId: customPlan.id,
                currency: 'USD',
                interval: 'month',
                amountCents: 0,
                provider: 'manual',
                active: true,
            });
        }
        
        if (defaultPrices.length > 0) {
            await dbPool.insert(planPrices).values(defaultPrices);
            console.log(`Inserted ${defaultPrices.length.toString()} default prices.`);
        } else {
            console.log('Default prices already exist.');
        }
        console.log('Done');
        return;
    } catch (error) {
        throw error;
    }
}

await populatePlans();
process.exit(0);