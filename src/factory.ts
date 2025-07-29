import type { ConfigArray } from './configs/utils'
import type { Options } from './option'
import { config } from './configs/utils'
import { mergeDefaultOptions } from './option'

export async function defineESLintConfig(options?: Options, ...args: ConfigArray) {
  const finalOptions = await mergeDefaultOptions(options)

  return config(
    finalOptions,
    ...args,
  )
}
