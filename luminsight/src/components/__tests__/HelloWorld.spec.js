import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import SkillCard from '../SkillCard';

describe('HelloWorld', () => {
  it('renders properly', () => {
    const wrapper = mount(SkillCard, { props: { stars: 5 } })
    expect(wrapper.text()).toContain('Hello Vitest')
  })
})
