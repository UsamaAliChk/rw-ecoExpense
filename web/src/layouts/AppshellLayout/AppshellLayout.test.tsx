import { render } from '@redwoodjs/testing/web'

import AppshellLayout from './AppshellLayout'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('AppshellLayout', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AppshellLayout />)
    }).not.toThrow()
  })
})
