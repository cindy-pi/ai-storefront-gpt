const wandSeeds = {
  Good: [
    ['Dawnspire Alder', 95, 'Alder', 'sun opal', 'Kindles warm daylight that steadies frightened allies.'],
    ['Mercy Willow', 82, 'Willow', 'moon pearl', 'Mends small wounds and softens hostile tempers.'],
    ['Celestial Rowan', 118, 'Rowan', 'star sapphire', 'Draws a clean arc of radiant warding light.'],
    ['Hearthguard Oak', 76, 'Oak', 'ember agate', 'Raises a golden shield around a campsite.'],
    ['Seraph Birch', 104, 'Birch', 'angel feather', 'Sings when danger stalks the innocent.'],
    ['Truthsilver Hazel', 88, 'Hazel', 'silver acorn', 'Reveals glamours and half-spoken lies.'],
    ['Springtide Elm', 69, 'Elm', 'green garnet', 'Coaxes flowers, vines, and clean water from tired earth.'],
    ['Knightly Ash', 132, 'Ash', 'griffon talon', 'Bolsters courage before a desperate charge.'],
    ['Lantern Yew', 91, 'Yew', 'glowmoth wing', 'Casts a steady light no storm can snuff.'],
    ['Sanctuary Cedar', 145, 'Cedar', 'halo quartz', 'Anchors a short-lived refuge against dark magic.'],
    ['Pilgrim Maple', 63, 'Maple', 'compass seed', 'Points toward safe roads and honest shelter.'],
    ['Aurora Poplar', 109, 'Poplar', 'sky crystal', 'Paints defensive ribbons of dawn-colored frost.'],
  ],
  Neutral: [
    ['Mistvein Cypress', 73, 'Cypress', 'river glass', 'Bends fog into maps, curtains, and quiet exits.'],
    ['Clockwork Beech', 124, 'Beech', 'brass beetle', 'Measures magical intervals with perfect patience.'],
    ['Ambercoil Juniper', 97, 'Juniper', 'amber eye', 'Stores one minor spell for later release.'],
    ['Archivist Pine', 86, 'Pine', 'inkstone', 'Copies spoken words as glowing runes.'],
    ['Crossroad Sycamore', 101, 'Sycamore', 'lodestone', 'Finds the strongest choice among branching paths.'],
    ['Stormsalt Tamarisk', 116, 'Tamarisk', 'storm pearl', 'Calls a snap of rain, static, or salt wind.'],
    ['Mirror Fir', 79, 'Fir', 'polished mica', 'Reflects illusions as harmless silver shadows.'],
    ['Nomad Palm', 68, 'Palm', 'sun coin', 'Keeps its bearer comfortable in harsh climates.'],
    ['Scribevine Laurel', 92, 'Laurel', 'blue inkcap', 'Writes contracts that glow when broken.'],
    ['Equinox Walnut', 139, 'Walnut', 'split quartz', 'Balances two opposing enchantments for a minute.'],
    ['Mothwing Linden', 57, 'Linden', 'dusty chrysalis', 'Silences footsteps and softens sharp outlines.'],
    ['Riddlebone Olive', 111, 'Olive', 'sphinx whisker', 'Answers one practical question in cryptic rhyme.'],
  ],
  Evil: [
    ['Gravesmoke Blackthorn', 127, 'Blackthorn', 'onyx tooth', 'Exhales a chilling smoke that saps resolve.'],
    ['Viperthorn Acacia', 99, 'Acacia', 'serpent scale', 'Turns a whispered threat into venomous force.'],
    ['Bloodmoon Mahogany', 154, 'Mahogany', 'ruby clot', 'Burns crimson when bargains are sealed in fear.'],
    ['Nightjar Ebony', 142, 'Ebony', 'raven heart', 'Blots torchlight and carries words through darkness.'],
    ['Ironrot Mangrove', 108, 'Mangrove', 'rust nail', 'Corrodes locks, hinges, armor, and trust.'],
    ['Ashen Thorn', 84, 'Thorn', 'grave ash', 'Turns fresh footprints into cold black cinders.'],
    ['Gloamfang Holly', 96, 'Holly', 'wolf fang', 'Summons a pursuing howl only the guilty hear.'],
    ['Dreadroot Hemlock', 121, 'Hemlock', 'green venom', 'Wilts nearby plants to empower a curse.'],
    ['Chainspell Hornbeam', 135, 'Hornbeam', 'iron link', 'Binds a target with spectral shackles.'],
    ['Witchfire Elder', 147, 'Elder', 'witchfire coal', 'Throws emerald fire that hungers for enchantments.'],
    ['Ruinmark Locust', 71, 'Locust', 'cracked coin', 'Leaves a bad-luck sigil on doors and dice.'],
    ['Obsidian Ivy', 113, 'Ivy', 'obsidian thorn', 'Creeps shadowy vines over walls and windows.'],
  ],
}

const alignmentColors = {
  Good: ['#f8d97a', '#7fd7ff'],
  Neutral: ['#9bb0a4', '#d2b16f'],
  Evil: ['#8b1d3f', '#2c1238'],
}

function slugify(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

function wandImage(name, alignment, index) {
  const [primary, secondary] = alignmentColors[alignment]
  const tilt = index % 2 === 0 ? 26 : -26
  const spark = alignment === 'Evil' ? '#e95f7d' : alignment === 'Good' ? '#fff6b7' : '#f2ead0'
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 420 260" role="img" aria-label="${name}">
      <defs>
        <linearGradient id="wood" x1="0" x2="1">
          <stop offset="0" stop-color="${primary}"/>
          <stop offset="1" stop-color="${secondary}"/>
        </linearGradient>
        <filter id="glow"><feGaussianBlur stdDeviation="5" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      </defs>
      <rect width="420" height="260" rx="28" fill="#160f22"/>
      <circle cx="74" cy="66" r="36" fill="${primary}" opacity="0.16"/>
      <circle cx="340" cy="192" r="58" fill="${secondary}" opacity="0.15"/>
      <g transform="translate(210 130) rotate(${tilt})" filter="url(#glow)">
        <rect x="-148" y="-8" width="278" height="16" rx="8" fill="url(#wood)"/>
        <path d="M122 -18 L166 0 L122 18 Z" fill="${spark}"/>
        <circle cx="-132" cy="0" r="18" fill="${secondary}" stroke="${spark}" stroke-width="5"/>
      </g>
      <g fill="${spark}" opacity="0.9">
        <path d="M96 190 l7 15 15 7-15 7-7 15-7-15-15-7 15-7z"/>
        <path d="M318 50 l5 11 11 5-11 5-5 11-5-11-11-5 11-5z"/>
        <circle cx="262" cy="214" r="5"/>
      </g>
    </svg>`
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
}

export const wands = Object.entries(wandSeeds).flatMap(([alignment, seeds]) =>
  seeds.map(([name, price, wood, core, power], index) => ({
    id: slugify(name),
    name,
    alignment,
    price,
    wood,
    core,
    power,
    length: `${9 + (index % 6)} ${index % 2 === 0 ? '1/2' : '3/4'} inches`,
    temperament: ['loyal', 'curious', 'stubborn', 'dramatic'][index % 4],
    rarity: price > 130 ? 'Legendary' : price > 100 ? 'Rare' : 'Common',
    image: wandImage(name, alignment, index),
  })),
)

export const alignments = ['All', 'Good', 'Neutral', 'Evil']
