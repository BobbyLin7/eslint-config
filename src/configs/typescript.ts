import type { Linter } from 'eslint'
import typescriptEslint from 'typescript-eslint'

export function typeScriptConfigs() {
  return [
    typescriptEslint.configs.base as Linter.Config,
    [
      {
        name: 'typescript-eslint/custom',
        files: ['*.ts', '*.tsx'],
        rules: {},
      },
    ] as Linter.Config[],
  ]
}
