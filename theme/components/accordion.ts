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
      panel: {
        display: "flex",
        flexDirection: "column",
        p: 0,
      },
    },
  },
}

export default accordion
