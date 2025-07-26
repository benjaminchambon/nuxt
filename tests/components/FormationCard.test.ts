import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import FormationCard from '~/components/FormationCard.vue';
import type { Formation } from '~/types/formation';

describe('FormationCard', () => {
  const mockFormation: Formation = {
    id: '1',
    school: 'École Polytechnique',
    city: 'Paris',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  };

  it('renders formation data correctly', () => {
    const wrapper = mount(FormationCard, {
      props: { formation: mockFormation },
    });

    expect(wrapper.text()).toContain('École Polytechnique');
    expect(wrapper.text()).toContain('Paris');
  });

  it('emits click event with formation id when clicked', async () => {
    const wrapper = mount(FormationCard, {
      props: { formation: mockFormation },
    });

    await wrapper.trigger('click');

    expect(wrapper.emitted('click')).toBeTruthy();
    expect(wrapper.emitted('click')?.[0]).toEqual(['1']);
  });

  it('handles accessibility requirements', () => {
    const wrapper = mount(FormationCard, {
      props: { formation: mockFormation },
    });

    expect(wrapper.attributes('role')).toBe('button');
    expect(wrapper.attributes('tabindex')).toBe('0');
  });
});
