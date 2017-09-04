import * as path from 'path'
import * as tree from 'directory-tree'

const root = `${__dirname}/pages`

function files(tree, result = []) {
  result
    .push(...tree
      .map(child => {
        if (child.children) {
          result.push(...files(child.children))
          return
        }
        return child
      })
      .filter(child => child && child.extension && child.extension.endsWith('.tsx'))
      .map(tsx => {
        if (tsx.size === 0) {
          console.warn(`${tsx.path} has zero size`)
        }
        return tsx.path
          .replace(root, '')
          .replace(tsx.name, `${path.parse(tsx.name).name}`)
      })
      .filter(name => !(name.startsWith('/_') || name.startsWith('/test'))))
  return result
}

export function exportPathMap() {
  return files(tree(root).children)
    .reduce(
      (ret, file) => {
        ret[file] = {page: file}
        return ret
      },
      {'/': {page: '/index'}}
    )
}
