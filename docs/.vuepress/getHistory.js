import cmp from 'semver-compare'

import getChildren from './getChildren'


function getHistory(parent, dir) {
    const entries = getChildren(parent, dir)

    const sorted = entries.sort(cmp).reverse()

    return sorted
}

export default getHistory