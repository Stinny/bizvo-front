export const dateTheme = {
  root: {
    base: 'relative text-xs bg-gray-50 rounded-md focus:ring-0 focus:border-gray-200 focus:outline-none',
  },
  popup: {
    root: {
      base: 'absolute bottom-0 z-50 block pt-2',
      inline: 'absolute bottom-0 z-50',
      inner: 'inline-block rounded-md bg-white p-2 shadow-lg',
    },
    header: {
      base: '',
      title:
        'px-2 py-3 text-center font-semibold text-gray-900 dark:text-white',
      selectors: {
        base: 'mb-1 flex justify-between',
        button: {
          base: 'rounded-md bg-white px-5 py-2.5 text-xs text-stone-800 border border-white hover:border-stone-800',
          prev: '',
          next: '',
          view: '',
        },
      },
    },
    view: {
      base: 'p-1',
    },
    footer: {
      base: 'invisible',
      button: {
        base: 'invisible',
        today: 'invisible',
        clear: 'invisible',
      },
    },
  },
  views: {
    days: {
      header: {
        base: 'mb-1 grid grid-cols-7',
        title: 'h-6 text-center text-xs leading-6 text-stone-800',
      },
      items: {
        base: 'grid w-64 grid-cols-7',
        item: {
          base: 'block flex-1 cursor-pointer rounded-md border-0 text-center text-xs leading-9 text-stone-800 border border-white rounded-md hover:border-stone-800',
          selected:
            'bg-white border border-stone-800 rounded-md text-stone-800',
          disabled: 'text-gray-200 cursor-default hover:border-0',
        },
      },
    },
    months: {
      items: {
        base: 'grid w-64 grid-cols-4',
        item: {
          base: 'block flex-1 cursor-pointer rounded-md text-center text-xs leading-9 text-stone-800 border border-white hover:border-stone-800',
          selected:
            'bg-white border border-stone-800 rounded-md text-stone-800',
          disabled: 'text-gray-200',
        },
      },
    },
    years: {
      items: {
        base: 'grid w-64 grid-cols-4',
        item: {
          base: 'block flex-1 cursor-pointer rounded-md text-center text-xs leading-9 text-stone-800 border border-white hover:border-stone-800',
          selected:
            'bg-white border border-stone-800 rounded-md text-stone-800',
          disabled: 'text-gray-500',
        },
      },
    },
    decades: {
      items: {
        base: 'grid w-64 grid-cols-4',
        item: {
          base: 'block flex-1 cursor-pointer rounded-md text-center text-xs leading-9 text-stone-800 border border-white hover:border-stone-800',
          selected:
            'bg-white border border-stone-800 rounded-md text-stone-800',
          disabled: 'text-gray-500',
        },
      },
    },
  },
};
