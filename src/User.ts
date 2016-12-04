//@Cache
class User{

    gold = 0;

    undealGold = 0;

    currentExp = 0;

    level = 0;

    //User与Hero为聚合关系的表现
    heroes : Hero[] = [];

    constructor(){

        this.gold = 0;
        this.undealGold = 0;
        this.currentExp = 0;
        this.level = 0;

    }

    //基础数值写法
    //heroesInTeam : Hero[] = [];

    //高阶数值写法
    get heroesInTeam(){

        return this.heroes.filter(hero => hero.isInteam);
    }

    get fightPower(){

        var result = 0;
        
        //forEach : 将数组中每个元素都执行
        this.heroesInTeam.forEach(hero => result += hero.fightPower);
        return result;
    }

    public addHero(hero : Hero){

        this.heroes.push(hero);

    }

    public show(){

        console.log("User:");
        console.log("level:" + this.level);
        console.log("currentExp：" + this.currentExp);
        console.log("undealGold:" + this.undealGold);
        console.log("gold:" + this.gold);
        console.log("fightPower:" + this.fightPower)
    }

}

class Hero{

    isInteam : boolean = false;

    baseHp = 0;

    baseAttack = 0;

    level = 0;

    value = 0;

    equipments : Equipment[] = [];

    constructor(baseHp : number, baseAttack : number, value : number){

        this.level = 1;
        this.isInteam = true;
        this.baseAttack = baseAttack;
        this.baseHp = baseHp;
        this.value = value;

    }


    get hp(){

        var result = 0;
        this.equipments.forEach(e => result += e.hpBoost);
        return result + this.baseHp + (1 + 0.2 * this.value) * this.level;
    }

    get attack(){

        var result = 0;

        //将所有装备的攻击力累加
        this.equipments.forEach(e => result += e.attackBoost);
        return result + this.baseAttack + (1 + 0.3 * this.value) * this.level;
    }

    get fightPower(){

        var result = 0;
        this.equipments.forEach(e => result += e.fightPower);
        return result + (this.hp * 300 + this.attack * 500) * 0.5;

    }

    public addEquipment(equipment : Equipment){

        this.equipments.push(equipment);
    }

    public show(){

        console.log("Hero:");
        console.log("level:" + this.level);
        console.log("value:" + this.value);
        console.log("attack:" + this.attack);
        console.log("hp:" + this.hp);
        console.log("fightPower:" + this.fightPower);
    }

}


class Equipment{

    private jewels : Jewel[] = [];

    private quality : equipmentQuality;

    private baseAttack = 0;

    private baseHp = 0;

    constructor(quality : equipmentQuality, baseAttack : number, baseHp : number){

        this.quality = quality;
        this.baseAttack = baseAttack;
        this.baseHp = baseHp;
    }

    get attackBoost(){

        var result = 0;
        this.jewels.forEach(e => result += e.attackBoost);
        return result + (this.quality * 20) + this.baseAttack;
    }

    get hpBoost(){

        var result = 0;
        this.jewels.forEach(e => result += e.hpBoost);
        return result + (this.quality * 10) + this.baseHp;
    }

    get fightPower(){

        var result = 0;
        this.jewels.forEach(e => result += e.fightPower);
        return result + (this.hpBoost * 300 + this.attackBoost * 500) * 0.8;

    }

    public addJewel(jewel : Jewel){

        this.jewels.push(jewel);
    }

    public show(){

        console.log("Equipment:");
        console.log("level:" + this.quality);
        console.log("hpBoost:" + this.hpBoost);
        console.log("attackBoost:" + this.attackBoost);
        console.log("fightPower:" + this.fightPower);
    }

}


class Jewel{
  
    private level : jewelLevel;

    private hpBoostCoefficient = 0;

    private attackBoostCoefficient = 0;

    constructor(level : jewelLevel, hpBoostCoefficient : number, attackBoostCoefficient : number){

        this.level = level;
        this.hpBoostCoefficient = hpBoostCoefficient;
        this.attackBoostCoefficient = attackBoostCoefficient;

    }

    get hpBoost(){

        return this.hpBoostCoefficient * this.level;
    }

    get attackBoost(){

        return this.attackBoostCoefficient * this.level;
    }

    
    get fightPower(){

        return this.hpBoost * 300 + this.attackBoost * 500;
    }

    public show(){

        console.log("Jewel:");
        console.log("level:" + this.level);
        console.log("hpBoost:" + this.hpBoost);
        console.log("attackBoost:" + this.attackBoost);
        console.log("fightPower:" + this.fightPower);
    }
}

//一级，二级，三级宝石
enum jewelLevel{

    one = 1,
    two = 2,
    three = 3
}

//装备品质分为绿装，蓝装，紫装，金装
enum equipmentQuality{

    green = 1,
    blue = 2,
    purple = 3,
    gold = 4
}

//英雄稀有度
enum heroValue{

    r = 1,
    sr = 2,
    ssr = 3
}


