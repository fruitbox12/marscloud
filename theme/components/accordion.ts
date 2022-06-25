const accordion = {
  variants: {
    sidebar: {
      container: {
        border: "none",
      },
      button: {
        div: {
          flex: "1",
          textAlign: "left",
          color: "gray.200",
          fontWeight: "bold",
          textTransform: "uppercase",
          fontSize: "12px",
        },
        svg: { color: "gray.200" },
        _hover: {
          bg: "none",
        },
      },
    },
  },
};

export default accordion;
