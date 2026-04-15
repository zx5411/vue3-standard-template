import { mount } from '@vue/test-utils'
import Pagination from '@/components/Pagination/index.vue'
import i18n from '@/i18n'

describe('Pagination', () => {
  it('renders total text and emits page changes', async () => {
    const wrapper = mount(Pagination, {
      global: {
        plugins: [i18n],
      },
      props: {
        total: 25,
        modelValue: 1,
      },
    })

    expect(wrapper.text()).toContain('共 25 条')

    await wrapper.get('button:last-of-type').trigger('click')

    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([2])
  })
})
