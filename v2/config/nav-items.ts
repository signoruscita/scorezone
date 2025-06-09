const components = [
  {
    title: "Accordion",
    url: "/docs/components/accordion",
  },
  {
    title: "Alert",
    url: "/docs/components/alert",
  },
  {
    title: "Alert Dialog",
    url: "/docs/components/alert-dialog",
  },
  {
    title: "Avatar",
    url: "/docs/components/avatar",
  },
  {
    title: "Badge",
    url: "/docs/components/badge",
  },
  {
    title: "Breadcrumb",
    url: "/docs/components/breadcrumb",
  },
  {
    title: "Button",
    url: "/docs/components/button",
  },
  {
    title: "Calendar",
    url: "/docs/components/calendar",
  },
  {
    title: "Card",
    url: "/docs/components/card",
  },
  {
    title: "Carousel",
    url: "/docs/components/carousel",
  },
  {
    title: "Chart",
    url: "/docs/components/chart",
  },
  {
    title: "Checkbox",
    url: "/docs/components/checkbox",
  },
  {
    title: "Combo Box",
    url: "/docs/components/combo-box",
  },
  {
    title: "Command",
    url: "/docs/components/command",
  },
  {
    title: "Context Menu",
    url: "/docs/components/context-menu",
  },
  {
    title: "Collapsible",
    url: "/docs/components/collapsible",
  },
  {
    title: "Date Picker",
    url: "/docs/components/date-picker",
  },
  {
    title: "Dialog",
    url: "/docs/components/dialog",
  },
  {
    title: "Drawer",
    url: "/docs/components/drawer",
  },
  {
    title: "Dropdown Menu",
    url: "/docs/components/dropdown-menu",
  },
  {
    title: "Hover Card",
    url: "/docs/components/hover-card",
  },
  {
    title: "Input",
    url: "/docs/components/input",
  },
  {
    title: "Input OTP",
    url: "/docs/components/input-otp",
  },
  {
    title: "Navigation Menu",
    url: "/docs/components/navigation-menu",
  },
  {
    title: "Scroll Area",
    url: "/docs/components/scroll-area",
  },
  {
    title: "Select",
    url: "/docs/components/select",
  },
  {
    title: "Sheet",
    url: "/docs/components/sheet",
  },
  {
    title: "Sidebar",
    url: "/docs/components/sidebar",
  },
  {
    title: "Skeleton",
    url: "/docs/components/skeleton",
  },
  {
    title: "Slider",
    url: "/docs/components/slider",
  },
  {
    title: "Label",
    url: "/docs/components/label",
  },
  {
    title: "Menubar",
    url: "/docs/components/menubar",
  },
  {
    title: "Pagination",
    url: "/docs/components/pagination",
  },
  {
    title: "Popover",
    url: "/docs/components/popover",
  },
  {
    title: "Progress",
    url: "/docs/components/progress",
  },
  {
    title: "Separator",
    url: "/docs/components/separator",
  },
  {
    title: "Radio Group",
    url: "/docs/components/radio-group",
  },
  {
    title: "Resizable",
    url: "/docs/components/resizable",
  },
  {
    title: "Switch",
    url: "/docs/components/switch",
  },
  {
    title: "Table",
    url: "/docs/components/table",
  },
  {
    title: "Tabs",
    url: "/docs/components/tabs",
  },
  {
    title: "Textarea",
    url: "/docs/components/textarea",
  },
  {
    title: "Toast",
    url: "/docs/components/toast",
  },
  {
    title: "Toggle",
    url: "/docs/components/toggle",
  },
  {
    title: "Toggle Group",
    url: "/docs/components/toggle-group",
  },
  {
    title: "Tooltip",
    url: "/docs/components/tooltip",
  },
];

export const navItems = {
  header: [
    {
      label: "Docs",
      href: "/docs",
    },
    {
      label: "Components",
      href: "/docs/components/accordion",
    },
    {
      label: "Blocks",
      href: "/blocks/authentication",
    },
    {
      label: "Themes",
      href: "/themes",
    },
    {
      label: "Scorezone",
      href: "/scorezone",
    },

  ],
  navMain: [
    {
      title: "Components",
      url: "/components/accordion",
      items: components.sort((a, b) => a.title.localeCompare(b.title)),
    },
  ],
};
