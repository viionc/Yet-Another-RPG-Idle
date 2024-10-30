import { EquipmentSlot } from '../consts/enums/equipment-slot.enum'
import { ItemIds } from '../consts/enums/ids/item-ids.enum'
import { PlayerStatIds } from '../consts/enums/ids/player-stat-ids'
import { ItemTier } from '../consts/enums/item-tier.enum'
import { ItemType } from '../consts/enums/item-type.enum'
import { Item } from '../consts/interfaces/item.interfaces'

const ITEM_DATA: Record<ItemIds, Item> = {
  [ItemIds.slimeResidue]: {
    tier: ItemTier.normal,
    name: 'Slime Residue',
    url: './items/slimeResidue.png',
    value: 1,
    type: ItemType.resource,
  },
  [ItemIds.crabMeat]: {
    tier: ItemTier.normal,
    name: 'Crab Meat',
    url: './items/crabMeat.png',
    value: 1,
    type: ItemType.resource,
  },
  [ItemIds.feather]: {
    tier: ItemTier.normal,
    name: 'Feather',
    url: './items/feather.png',
    value: 1,
    type: ItemType.resource,
  },
  [ItemIds.turtleShell]: {
    tier: ItemTier.normal,
    name: 'Turtle Shell',
    url: './items/turtleShell.png',
    value: 1,
    type: ItemType.resource,
  },
  [ItemIds.slimeGoldenCrown]: {
    tier: ItemTier.uncommon,
    name: 'Slime Golden Crown',
    url: './items/slimeGoldenCrown.png',
    value: 250,
    type: ItemType.equipment,
    slot: EquipmentSlot.helmet,
    stats: [
      {
        id: PlayerStatIds.goldCoinsMultiplier,
        min: 0.25,
        max: 0.5,
      },
      {
        id: PlayerStatIds.attackPower,
        min: 1,
        max: 1,
      },
    ],
  },
  [ItemIds.knife]: {
    tier: ItemTier.uncommon,
    name: 'Knife',
    url: './items/knife.png',
    value: 150,
    type: ItemType.equipment,
    slot: EquipmentSlot.weapon,
    stats: [
      {
        id: PlayerStatIds.attackPower,
        min: 2,
        max: 3,
      },
    ],
  },
  [ItemIds.turtleShellHelmet]: {
    tier: ItemTier.uncommon,
    name: 'Turtle Shell Helmet',
    url: './items/turtleShellHelmet.png',
    value: 20,
    type: ItemType.equipment,
    slot: EquipmentSlot.helmet,
    stats: [
      {
        id: PlayerStatIds.attackPower,
        min: 1,
        max: 1,
      },
    ],
  },
  [ItemIds.turtleShellChest]: {
    tier: ItemTier.uncommon,
    name: 'Turtle Shell Chest',
    url: './items/turtleShellChest.png',
    value: 50,
    type: ItemType.equipment,
    slot: EquipmentSlot.chest,
    stats: [
      {
        id: PlayerStatIds.attackPower,
        min: 1,
        max: 1,
      },
    ],
  },
  [ItemIds.turtleShellLegs]: {
    tier: ItemTier.uncommon,
    name: 'Turtle Shell Legs',
    url: './items/turtleShellLegs.png',
    value: 40,
    type: ItemType.equipment,
    slot: EquipmentSlot.legs,
    stats: [
      {
        id: PlayerStatIds.attackPower,
        min: 1,
        max: 1,
      },
    ],
  },
  [ItemIds.turtleShellBoots]: {
    tier: ItemTier.uncommon,
    name: 'Turtle Shell Boots',
    url: './items/turtleShellBoots.png',
    value: 20,
    type: ItemType.equipment,
    slot: EquipmentSlot.boots,
    stats: [
      {
        id: PlayerStatIds.attackPower,
        min: 1,
        max: 1,
      },
    ],
  },
  [ItemIds.turtleShellGloves]: {
    tier: ItemTier.uncommon,
    name: 'Turtle Shell Gloves',
    url: './items/turtleShellGloves.png',
    value: 20,
    type: ItemType.equipment,
    slot: EquipmentSlot.gloves,
    stats: [
      {
        id: PlayerStatIds.attackPower,
        min: 1,
        max: 1,
      },
    ],
  },
  [ItemIds.stick]: {
    tier: ItemTier.normal,
    name: 'Stick',
    url: './items/stick.png',
    value: 1,
    type: ItemType.resource,
  },
  [ItemIds.makeshiftClub]: {
    tier: ItemTier.normal,
    name: 'Makeshift Club',
    url: './items/makeshiftClub.png',
    value: 10,
    type: ItemType.equipment,
    slot: EquipmentSlot.weapon,
    stats: [
      {
        id: PlayerStatIds.attackPower,
        min: 1,
        max: 1,
      },
    ],
  },
  [ItemIds.joshsHeirloom]: {
    tier: ItemTier.normal,
    name: "Josh's Heirloom",
    url: './items/joshsHeirloom.png',
    value: -1,
    type: ItemType.equipment,
    slot: EquipmentSlot.ring,
    stats: [
      {
        id: PlayerStatIds.attackPower,
        min: 1,
        max: 1,
      },
      {
        id: PlayerStatIds.attackSpeed,
        min: 0.1,
        max: 0.1,
      },
      {
        id: PlayerStatIds.xpMultiplier,
        min: 0.1,
        max: 0.1,
      },
    ],
  },
  [ItemIds.ratTail]: {
    tier: ItemTier.normal,
    name: 'Rat Tail',
    url: './items/ratTail.png',
    value: 5,
    type: ItemType.resource,
  },
  [ItemIds.skillPointBook]: {
    tier: ItemTier.legendary,
    name: 'Skill Point Book',
    url: './items/skillPointBook.png',
    value: -1,
    type: ItemType.rewardsStats,
    stats: [
      {
        id: PlayerStatIds.unspentSkillPoints,
        amount: 1,
      },
    ],
  },
  [ItemIds.apple]: {
    tier: ItemTier.normal,
    name: 'Apple',
    url: './items/apple.png',
    value: 1,
    type: ItemType.resource,
  },
  [ItemIds.fishMeat]: {
    tier: ItemTier.normal,
    name: 'Fish Meat',
    url: './items/fishMeat.png',
    value: 1,
    type: ItemType.resource,
  },
  [ItemIds.captainsLetter]: {
    tier: ItemTier.normal,
    name: "Captain's letter",
    url: './items/letter.png',
    value: -1,
    type: ItemType.quest,
  },
  [ItemIds.cheese]: {
    tier: ItemTier.normal,
    name: 'Cheese',
    url: './items/cheese.png',
    value: 1,
    type: ItemType.resource,
  },
  [ItemIds.deerPelt]: {
    tier: ItemTier.normal,
    name: 'Deer Pelt',
    url: './items/deerPelt.png',
    value: 1,
    type: ItemType.resource,
  },
  [ItemIds.wolfFangs]: {
    tier: ItemTier.normal,
    name: 'Wolf Fangs',
    url: './items/wolfFangs.png',
    value: 1,
    type: ItemType.resource,
  },
  [ItemIds.vialOfWater]: {
    tier: ItemTier.normal,
    name: 'Vial of Water',
    url: './items/vialOfWater.png',
    value: 1,
    type: ItemType.resource,
  },
  [ItemIds.ratCatcher]: {
    tier: ItemTier.uncommon,
    name: 'Rat Catcher',
    url: './items/ratCatcher.png',
    value: 1000,
    type: ItemType.equipment,
    slot: EquipmentSlot.belt,
    stats: [
      {
        id: PlayerStatIds.attackPower,
        min: 1,
        max: 2,
      },
      {
        id: PlayerStatIds.critChance,
        min: 1,
        max: 2,
      },
      {
        id: PlayerStatIds.goldCoinsMultiplier,
        min: 0.15,
        max: 0.3,
      },
    ],
  },
  [ItemIds.woodenBow]: {
    tier: ItemTier.uncommon,
    name: 'Wooden Bow',
    url: './items/woodenBow.png',
    value: 500,
    type: ItemType.equipment,
    slot: EquipmentSlot.weapon,
    stats: [
      {
        id: PlayerStatIds.attackPower,
        min: 2,
        max: 3,
      },
      {
        id: PlayerStatIds.critChance,
        min: 3,
        max: 4,
      },
    ],
  },
  [ItemIds.stoneArrow]: {
    tier: ItemTier.normal,
    name: 'Stone Arrow',
    url: './items/stoneArrow.png',
    value: 4,
    type: ItemType.equipment,
    slot: EquipmentSlot.cape,
    stats: [
      {
        id: PlayerStatIds.attackPower,
        min: 2,
        max: 2,
      },
    ],
  },
  [ItemIds.trophyNecklace]: {
    tier: ItemTier.uncommon,
    name: 'Trophy Necklace',
    url: './items/trophyNecklace.png',
    value: 1500,
    type: ItemType.equipment,
    slot: EquipmentSlot.amulet,
    stats: [
      {
        id: PlayerStatIds.goldCoinsMultiplier,
        min: 0.25,
        max: 0.55,
      },
      {
        id: PlayerStatIds.xpMultiplier,
        min: 0.1,
        max: 0.25,
      },
    ],
  },
  [ItemIds.machete]: {
    tier: ItemTier.uncommon,
    name: 'Machete',
    url: './items/machete.png',
    value: 1000,
    type: ItemType.equipment,
    slot: EquipmentSlot.weapon,
    stats: [
      {
        id: PlayerStatIds.attackPower,
        min: 4,
        max: 5,
      },
      {
        id: PlayerStatIds.critChance,
        min: 2,
        max: 4,
      },
      {
        id: PlayerStatIds.critMulti,
        min: 0.05,
        max: 0.25,
      },
    ],
  },
  [ItemIds.stone]: {
    tier: ItemTier.normal,
    name: 'Stone',
    url: './items/stone.png',
    value: 1,
    type: ItemType.resource,
  },
}

export default ITEM_DATA
