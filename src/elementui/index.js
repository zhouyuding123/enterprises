import {
    Button,
    Message,
    Form,
    Input,
    FormItem,
    Icon,
    Container,
    Header,
    Aside,
    Main,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Row,
    Menu,
    Submenu,
    MenuItemGroup,
    MenuItem,
    Col,
    BreadcrumbItem,
    Breadcrumb,
    Image,
    Upload,
    Pagination,
    MessageBox,
    Dialog,
    Progress,
    Switch,
    RadioGroup,
    Radio,
    Select,
    Option,
    TimePicker,
    TimeSelect,
    DatePicker,
    CheckboxGroup,
    Checkbox,
    CheckboxButton,
    Descriptions,
    DescriptionsItem,
    Table,
    TableColumn,
    ButtonGroup,
    Tag,
    Carousel,
    CarouselItem,
    RadioButton,
    Tabs,
    TabPane,
    Drawer,
    Timeline,
    TimelineItem,
    Rate,
    cascader,
} from 'element-ui'
export default {
    install(Vue) {
        Vue.use(cascader)
        Vue.use(Rate)
        Vue.use(Timeline)
        Vue.use(TimelineItem)
        Vue.use(Drawer)
        Vue.use(Tabs)
        Vue.use(TabPane)
        Vue.use(RadioButton)
        Vue.use(CarouselItem)
        Vue.use(Carousel)
        Vue.use(Tag)
        Vue.use(ButtonGroup)
        Vue.use(Table)
        Vue.use(TableColumn)
        Vue.use(Descriptions)
        Vue.use(DescriptionsItem)
        Vue.use(CheckboxButton)
        Vue.use(Checkbox)
        Vue.use(CheckboxGroup)
        Vue.use(DatePicker)
        Vue.use(TimeSelect)
        Vue.use(TimePicker)
        Vue.use(Select)
        Vue.use(Option)
        Vue.use(Radio)
        Vue.use(RadioGroup)
        Vue.use(Switch)
        Vue.use(Progress)
        Vue.use(Dialog)
        Vue.use(Pagination)
        Vue.use(Upload)
        Vue.use(Image)
        Vue.use(BreadcrumbItem)
        Vue.use(Breadcrumb)
        Vue.use(Button)
        Vue.use(Form)
        Vue.use(Input)
        Vue.use(FormItem)
        Vue.use(Icon)
        Vue.use(Container)
        Vue.use(Header)
        Vue.use(Aside)
        Vue.use(Main)
        Vue.use(Dropdown)
        Vue.use(DropdownMenu)
        Vue.use(Row)
        Vue.use(Menu)
        Vue.use(Submenu)
        Vue.use(MenuItemGroup)
        Vue.use(MenuItem)
        Vue.use(DropdownItem)
        Vue.use(Col)
        //可使用this.$message
        Vue.prototype.$message = Message
        Vue.prototype.$confirm = MessageBox.confirm
    }
}