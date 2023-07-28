// usage example:
// TBD
function calculateUpgrades(upgradesData, baseStats, fromLevel, toLevel ) {
    const resultsCollection = [];

    // Initialize the sums for each element
    let sumEpic = 0;
    let sumRare = 0;
    let sumSpecial = 0;
    let sumCommon1 = 0;
    let sumCommon2 = 0;
    let sumCommon3 = 0;
    let sumGold = 0;
    let multiplierHp = 1;
    let multiplierAttack = 1;
    let runningHp = baseStats.hp;
    let runningAttack = baseStats.attack;
    let checkpointHp = 0;
    let checkpointAttack = 0;

    // Loop through each upgrade object and sum up the values within the specified range of levels
    upgradesData.forEach(upgrade => {
        // calculate runningHp and multiplierHp for each level, since we only store the base stat
        // TODO: round throws an undefiined error??
        // runningHp = round(runningHp * upgrade.multiplierHp);
        // runningAttack = round(runningAttack * upgrade.multiplierAttack);
        if (upgrade.level <= toLevel) {
            runningHp = runningHp * upgrade.multiplierHp;
            runningAttack = runningAttack * upgrade.multiplierAttack;
            if (upgrade.level > fromLevel) {
                sumEpic += upgrade.epic;
                sumRare += upgrade.rare;
                sumSpecial += upgrade.special;
                sumCommon1 += upgrade.common1;
                sumCommon2 += upgrade.common2;
                sumCommon3 += upgrade.common3;
                sumGold += upgrade.gold;
                // for multipliers we need to multiply, not add
                multiplierHp *= upgrade.multiplierHp;
                multiplierAttack *= upgrade.multiplierAttack;
            }
        }
        // checkpoint for starting level values
        if (upgrade.level == fromLevel) {
            checkpointHp = runningHp;
            checkpointAttack = runningAttack;
        }
        const levelResult = {
            level: upgrade.level,
            sumEpic: sumEpic,
            sumRare: sumRare,
            sumSpecial: sumSpecial,
            sumCommon1: sumCommon1,
            sumCommon2: sumCommon2,
            sumCommon3: sumCommon3,
            sumGold: sumGold,
            multiplierHp: multiplierHp,
            multiplierAttack: multiplierAttack,
            endHp: runningHp,
            endAttack: runningAttack,
            endDps: runningAttack / baseStats.attackSpeed,
            checkpointHp: checkpointHp,
            checkpointAttack: checkpointAttack
        };
        resultsCollection.push(levelResult);

    });

    //// Create an object to store the results
    //const result = {
    //    fromLevel: fromLevel,
    //    toLevel: toLevel,
    //    sumEpic: sumEpic,
    //    sumRare: sumRare,
    //    sumSpecial: sumSpecial,
    //    sumCommon1: sumCommon1,
    //    sumCommon2: sumCommon2,
    //    sumCommon3: sumCommon3,
    //    sumGold: sumGold,
    //    multiplierHp: multiplierHp,
    //    multiplierAttack: multiplierAttack,
    //    endHp: runningHp,
    //    endAttack: runningAttack,
    //    // stupid round...
    //    // endDps: round(runningAttack/baseStats.attackSpeed) 
    //    endDps: runningAttack / baseStats.attackSpeed,
    //    checkpointHp: checkpointHp,
    //    checkpointAttack: checkpointAttack
    //};

    return resultsCollection;
}