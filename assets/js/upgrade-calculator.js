// usage example:
// TBD
function calculateUpgrades(upgradesData, baseStats, fromLevel, toLevel ) {
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

    // Loop through each upgrade object and sum up the values within the specified range of levels
    upgradesData.forEach(upgrade => {
        // calculate runningHp and multiplierHp for each level, since we only store the base stat
        // TODO: round throws an undefiined error??
        // runningHp = round(runningHp * upgrade.multiplierHp);
        // runningAttack = round(runningAttack * upgrade.multiplierAttack);
        runningHp = runningHp * upgrade.multiplierHp;
        runningAttack = runningAttack * upgrade.multiplierAttack;
        if (upgrade.level > fromLevel && upgrade.level <= toLevel) {
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
    });

    // Create an object to store the results
    const result = {
        fromLevel: fromLevel,
        toLevel: toLevel,
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
        // stupid round...
        // endDps: round(runningAttack/baseStats.attackSpeed) 
        endDps: runningAttack / baseStats.attackSpeed 
    };

    return result;
}