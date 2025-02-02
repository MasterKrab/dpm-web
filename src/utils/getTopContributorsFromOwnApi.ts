import Contributor from '@types/contributor'

const getTopContributorsFromOwnApi = async () => {
  const response = await fetch('/contributors.json')
  const contributors: Contributor[] = await response.json()

  return contributors
}

export default getTopContributorsFromOwnApi
