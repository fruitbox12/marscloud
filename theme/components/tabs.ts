export default {
  baseStyle: {
    tabpanel: {
      px: '0',
    },
  },
  variants: {
    selectPlan: {
      tablist: {
        p: {
          w: '100%',
          bg: 'gray.100',
          color: 'gray.700',
          textAlign: 'center',
          py: 1.5,
          fontSize: '14px',
          textTransform: 'uppercase',
          borderTop: '1px',
          borderRight: '1px',
          borderLeft: '1px',
          borderColor: 'gray.300',
        },
      },
      tabpanel: {
        marginTop: '32px',
        borderTop: '2px solid #dfdfdf',
      },
      tab: {
        position: 'relative',
        bg: 'white',
        fontWeight: 'bold',
        border: '1px',
        borderColor: 'gray.300',
        color: 'gray.700',
        '&:not(:first-of-type)': {
          borderLeft: '0',
          borderColor: 'gray.300',
        },

        _selected: {
          border: '1px',
          borderColor: 'blue.500',
          color: 'blue.500',
          '&:not(:first-of-type)': {
            m: '0px 0px 0px -1px',
          },
          '&:before': {
            content: "''",
            display: 'block',
            position: 'absolute',
            width: '16px',
            height: '16px',
            backgroundColor: 'gray.50',
            border: '2px solid #dfdfdf',
            transform: 'rotate(45deg) translateX(-50%)',
            left: '50%',
            bottom: '-47px',
            borderRight: 'none',
            borderBottom: 'none',
          },
        },
      },
    },
  },
}
