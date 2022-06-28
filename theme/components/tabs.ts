const tabs = {
  baseStyle: {
    tabpanel: {
      px: "0",
    },
  },
  variants: {
    selectPlan: {
      tablist: {
        p: {
          w: "100%",
          bg: "gray.100",
          color: "gray.700",
          textAlign: "center",
          py: 1.5,
          fontSize: "14px",
          textTransform: "uppercase",
          borderTop: "1px",
          borderRight: "1px",
          borderLeft: "1px",
          borderColor: "gray.300",
        },
        "[aria-element=wrap]": {
          flexDirection: "column",
          w: "100%",
        },
      },
      tab: {
        position: "relative",
        fontWeight: "bold",
        border: "1px",
        borderColor: "gray.300",
        color: "gray.700",
        "&:not(:first-of-type)": {
          borderLeft: "0",
          borderColor: "gray.300",
        },

        "&:before": {
          position: "absolute",
          top: 0,
          left: 0,
          width: "400px",
          height: "200px",
          backgroundColor: "red",
        },
        _selected: {
          border: "1px",
          borderColor: "blue.500",
          color: "blue.500",
          "&:not(:first-of-type)": {
            m: "0px 0px 0px -1px",
          },
        },
      },
    },
  },
};

export default tabs;

// "tab",
// "tablist",
// "tabpanel",
// "tabpanels",
// "indicator",
