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
        let levelMultiplier = 1.1 ^ (upgrade.level - 1)
        if (levelMultiplier < 1) {
            levelMultiplier = 1;
        }

        if (upgrade.level <= toLevel) {
            runningHp = baseStats.hp * levelMultiplier * upgrade.multiplierHp;
            runningAttack = baseStats.attack * levelMultiplier * upgrade.multiplierAttack;
            if (upgrade.level > fromLevel) {
                sumEpic += upgrade.epic;
                sumRare += upgrade.rare;
                sumSpecial += upgrade.special;
                sumCommon1 += upgrade.common1;
                sumCommon2 += upgrade.common2;
                sumCommon3 += upgrade.common3;
                sumGold += upgrade.gold;
                multiplierHp = levelMultiplier * upgrade.multiplierHp;
                multiplierAttack = levelMultiplier * upgrade.multiplierAttack;
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

    return resultsCollection;
}