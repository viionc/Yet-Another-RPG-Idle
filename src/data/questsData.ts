import { EnemyIds } from '../consts/enums/ids/enemy-ids.enum'
import { ItemIds } from '../consts/enums/ids/item-ids.enum'
import { PlayerStatIds } from '../consts/enums/ids/player-stat-ids'
import { QuestIds } from '../consts/enums/ids/quest-ids.enum'
import { SkillIds } from '../consts/enums/ids/skill-ids.enum'
import { ZoneIds } from '../consts/enums/ids/zone-ids.enum'
import { RequirementType } from '../consts/enums/requirement-type.enum'
import { RewardType } from '../consts/enums/reward-type.enum'

export type QuestProps = {
  name: string
  rewards: Array<StatReward | ItemReward | SkillReward>
  steps: QuestStepProps[]
}

export type QuestStepProps = {
  description: string
  requirement: RequirementProps
}

export type RequirementProps =
  | ItemRequirement
  | WaveKillCountRequirement
  | EnemyKillCountRequirement
  | QuestRequirement
  | StatRequirement

export type StatRequirement = {
  type: RequirementType.stat
  id: PlayerStatIds
  amount: number
  label: string
}
export type QuestRequirement = {
  type: RequirementType.quest
  id: QuestIds
  step?: number
}

export type ItemRequirement = {
  type: RequirementType.item
  id: ItemIds
  amount: number
}

export type WaveKillCountRequirement = {
  type: RequirementType.wave
  zoneId: ZoneIds
  wave: number
  amount: number
}

export type EnemyKillCountRequirement = {
  type: RequirementType.killCount
  id: EnemyIds
  amount: number
}

type StatReward = {
  type: RewardType.stat
  id: PlayerStatIds
  amount: number
  label: string
}

type ItemReward = {
  type: RewardType.item
  id: ItemIds
  amount: number
}

type SkillReward = {
  type: RewardType.skill
  id: SkillIds
}

// {description: "", requirement: {type: "stat", key: "level", amount:1 }}, first step if no requirements needed to start the quest

const QUEST_DATA: Record<QuestIds, QuestProps> = {
  [QuestIds.meatShortage]: {
    name: 'Meat shortage',
    steps: [
      {
        description: '',
        requirement: { type: RequirementType.stat, id: PlayerStatIds.level, amount: 1, label: 'Level' },
      },
      {
        description: 'Bartender in La Harpar tavern asked me to bring her 30 crab meat.',
        requirement: { type: RequirementType.item, id: ItemIds.crabMeat, amount: 30 },
      },
    ],
    rewards: [
      { type: RewardType.stat, id: PlayerStatIds.unspentSkillPoints, amount: 1, label: 'Skill Point' },
      { type: RewardType.stat, id: PlayerStatIds.experience, amount: 1000, label: 'Experience' },
      { type: RewardType.stat, id: PlayerStatIds.goldCoins, amount: 200, label: 'Gold Coins' },
    ],
  },
  [QuestIds.clearingOutTheBeach]: {
    name: 'Clearing out the beach',
    steps: [
      {
        description: '',
        requirement: { type: RequirementType.stat, id: PlayerStatIds.level, amount: 1, label: 'Level' },
      },
      {
        description: "I'm supposed to kill 50 enemies on wave 7 on Horseshoe Beach.",
        requirement: { type: RequirementType.wave, zoneId: ZoneIds.horseshoeBeach, wave: 7, amount: 50 },
      },
    ],
    rewards: [
      { type: RewardType.stat, id: PlayerStatIds.experience, amount: 1500, label: 'Experience' },
      { type: RewardType.stat, id: PlayerStatIds.goldCoins, amount: 250, label: 'Gold Coins' },
      { type: RewardType.item, id: ItemIds.joshsHeirloom, amount: 1 },
    ],
  },
  [QuestIds.ratsWereRats]: {
    name: "Rats, we're rats",
    steps: [
      {
        description: '',
        requirement: { type: RequirementType.stat, id: PlayerStatIds.level, amount: 1, label: 'Level' },
      },
      {
        description: "La Harpar's trader asked me to get rid of pests in his basement. 50 should be enough.",
        requirement: { type: RequirementType.killCount, id: EnemyIds.rat, amount: 50 },
      },
    ],
    rewards: [
      { type: RewardType.stat, id: PlayerStatIds.unspentSkillPoints, amount: 1, label: 'Skill Point' },
      { type: RewardType.stat, id: PlayerStatIds.experience, amount: 1500, label: 'Experience' },
      { type: RewardType.stat, id: PlayerStatIds.goldCoins, amount: 300, label: 'Gold Coins' },
    ],
  },
  [QuestIds.aTaleOfACaptain]: {
    name: 'A tale of a captain',
    steps: [
      {
        description: '',
        requirement: { type: RequirementType.stat, id: PlayerStatIds.level, amount: 1, label: 'Level' },
      },
      {
        description: 'Elara is looking for her father, Captain Theron Tidecaller. I need to find some clues',
        requirement: { type: RequirementType.item, id: ItemIds.captainsLetter, amount: 1 },
      },
    ],
    rewards: [],
  },
}

export default QUEST_DATA
