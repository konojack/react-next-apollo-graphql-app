import { integer, select, text } from '@keystone-next/fields';
import { list } from '@keystone-next/keystone/schema';

export const Product = list({
  fields: {
    name: text({ isRequired: true }),
    description: text({
      ui: {
        displayMode: 'textarea',
      },
    }),
    status: select({
      options: [
        {
          value: 'DRAFT',
          label: 'Draft',
        },
        {
          value: 'AVAILABLE',
          label: 'Available',
        },
        {
          value: 'UNAVAILABLE',
          label: 'Unavailable',
        },
      ],
      defaultValue: 'DRAFT',
      ui: {
        displayMode: 'segmented-control',
        createView: { fieldMode: 'hidden' },
      },
    }),
    price: integer(),
    // TODO: photos
  },
});
