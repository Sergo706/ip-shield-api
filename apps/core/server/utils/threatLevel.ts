export function threatLevel(ipv4: string): number {
        const { dataSources } = useNitroApp();
        const lv1 = dataSources.fireholLvl1DataBase(ipv4);
        const lv2 = dataSources.fireholLvl2DataBase(ipv4);
        const lv3 = dataSources.fireholLvl3DataBase(ipv4);
        const lv4 = dataSources.fireholLvl4DataBase(ipv4);
        let score = 0;
        if (lv1) score += 50;
        if (lv2) score += 40;
        if (lv3) score += 30;
        if (lv4) score += 20;
        return Math.min(score, 100);
}