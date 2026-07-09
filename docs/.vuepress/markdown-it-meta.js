import yaml from 'js-yaml'

// Local drop-in replacement for the unmaintained `markdown-it-meta` package,
// which called the removed `yaml.safeLoad`. js-yaml 4 renamed that to `yaml.load`
// (safe by default), so we parse front matter here and expose it as `md.meta`.
export default function meta(md) {
  md.meta = md.meta || {}

  function get(state, line) {
    const pos = state.bMarks[line]
    const max = state.eMarks[line]
    return state.src.slice(pos, max)
  }

  function parse(state, start, end, silent) {
    if (start !== 0 || state.blkIndent !== 0) {
      return false
    }
    if (state.tShift[start] < 0) {
      return false
    }
    if (!get(state, start).match(/^---$/)) {
      return false
    }

    const data = []
    let line = start
    while (line < end) {
      line++
      const str = get(state, line)
      if (str.match(/^---$/)) {
        break
      }
      if (state.tShift[line] < 0) {
        break
      }
      data.push(str)
    }

    md.meta = yaml.load(data.join('\n'), { json: true }) || {}
    state.line = line + 1
    return true
  }

  md.block.ruler.before('code', 'meta', parse, { alt: [] })
}
