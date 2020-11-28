import { variablesWithPrefix } from '../src/core/variablesWithPrefix'
import { Prop } from '../src/index.h'

const props: Prop[] = [
  {
    name: 'var-1',
    value: 'value-1',
    comment: 'comment-1',
    original: { value: 'value-1' },
    attributes: {},
    path: [],
  },
  {
    name: 'var-2',
    value: 'value-2',
    comment: 'comment-2',
    original: { value: 'value-2' },
    attributes: {},
    path: [],
  },
]

describe('variablesWithPrefix', () => {
  test('should return variables', () => {
    const p = props.map((prop) => ({ ...prop, comment: undefined }))
    expect(variablesWithPrefix('--', p)).toMatchInlineSnapshot(`
      "--var-1: value-1;
      --var-2: value-2;"
    `)
  })

  test('should return variables with long comments', () => {
    expect(variablesWithPrefix('--', props)).toMatchInlineSnapshot(`
      "--var-1: value-1; /* comment-1 */
      --var-2: value-2; /* comment-2 */"
    `)
  })
})
