import type { Linter } from 'eslint'
import defu from 'defu'
import { isPackageExists } from 'local-pkg'
import { DEFAULT_IGNORE_FILES, GLOB_EXCLUDE } from './constants'

export type Options = {
  ignores?: string[]
  ignoreFiles?: string[]
  react?: 'vite' | 'next' | boolean
  tailwindCSS?: boolean | {
    order: boolean
  }
} & Pick<Linter.Config, 'linterOptions' | 'settings'>

export async function mergeDefaultOptions(options?: Options) {
  const hasVite = isPackageExists('vite')

  const hasNext = isPackageExists('next')

  const hasTailwindCSS = isPackageExists('tailwindcss')

  const defaultOptions: Required<Options> = {
    ignores: GLOB_EXCLUDE,
    ignoreFiles: DEFAULT_IGNORE_FILES,
    react: hasNext ? 'next' : hasVite ? 'vite' : false,
    tailwindCSS: hasTailwindCSS,
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
    settings: {
      ...(
        hasTailwindCSS
          ? {
              tailwindcss: {
                callees: ['classnames', 'clsx', 'ctl', 'cn'],
              },
            }
          : {}
      ),
    },
  }

  return defu<Required<Options>, Options[]>(options, defaultOptions)
}
