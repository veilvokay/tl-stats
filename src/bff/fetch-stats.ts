
export enum EStatType { 
    STR = 'EPcStatsType::kSTR',
    INT = 'EPcStatsType::kINT',
    DEX = 'EPcStatsType::kDEX',
    PER = 'EPcStatsType::kPER',
}


export type TStatType = Record<EStatType, string>;

export type Stat = {
      AttackPowers?: {
        NoneAttackPower?: number,
        DaggerAttackPower?: number,
        SwordAttackPower?: number,
        ShieldAttackPower?: number,
        GrimoireAttackPower?: number,
        CrossbowAttackPower?: number,
        Sword2hAttackPower?: number,
        StaffAttackPower?: number,
        BowAttackPower?: number,
        WandAttackPower?: number
      },
      BonusAttackPowers?: {
        NoneAttackPower?: number,
        DaggerAttackPower?: number,
        SwordAttackPower?: number,
        ShieldAttackPower?: number,
        GrimoireAttackPower?: number,
        CrossbowAttackPower?: number,
        Sword2hAttackPower?: number,
        StaffAttackPower?: number,
        BowAttackPower?: number,
        WandAttackPower?: number
      },
      AttackSpeedModifier?: number,
      AttackSpeedMainHand?: number,
      AttackSpeedOffHand?: number,
      MeleeAccuracy?: number,
      RangeAccuracy?: number,
      MagicAccuracy?: number,
      MeleeEvasion?: number,
      RangeEvasion?: number,
      MagicEvasion?: number,
      HealthPointMax?: number,
      HealthPointRegen?: number,
      HpMax?: number,
      HpRegen?: number,
      CostMax?: number,
      CostRegen?: number,
      WeakenAccuracy?: number,
      StunAccuracy?: number,
      PetrificationAccuracy?: number,
      SleepAccuracy?: number,
      SilenceAccuracy?: number,
      BindAccuracy?: number,
      BlindAccuracy?: number,
      CollideAmplification?: number,
      CriticalAttack?: number,
      MeleeCriticalAttack?: number,
      RangeCriticalAttack?: number,
      MagicCriticalAttack?: number,
      ArmorClass?: number,
      MeleeArmor?: number,
      RangeArmor?: number,
      MagicArmor?: number,
      SkillCooldownModifier?: number,
      BuffGivenDurationModifier?: number
}

export interface IStatsData {
    Point: number,
    Stat?: Stat,
    Type: TStatType[EStatType.STR] | TStatType[EStatType.DEX] | TStatType[EStatType.INT] | TStatType[EStatType.PER],
}

export interface ISortedStats {
    STR: IStatsData[]
    DEX: IStatsData[]
    INT: IStatsData[]
    PER: IStatsData[]
}