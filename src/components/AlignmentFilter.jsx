import { alignments } from '../data/wands.js'

const alignmentClass = (alignment) => alignment.toLowerCase().replace('all', 'all-alignments')

export default function AlignmentFilter({ activeAlignment, counts, onChange }) {
  return (
    <div className="alignment-filter" aria-label="Filter by alignment">
      {alignments.map((alignment) => (
        <button
          className={activeAlignment === alignment ? `${alignmentClass(alignment)} active` : alignmentClass(alignment)}
          key={alignment}
          type="button"
          onClick={() => onChange(alignment)}
        >
          {alignment}
          <span>{counts[alignment]}</span>
        </button>
      ))}
    </div>
  )
}
