export interface SideNavInterface {
    path: string;
    title: string;
    iconType: "" | "nzIcon" | "fontawesome";
    iconTheme: "" | "fab" | "far" | "fas" | "fill" | "outline" | "twotone";
    icon: string,
    isSecuredInfo: boolean,
    isTouched: boolean,
    id?: number
    submenu : SideNavInterface[];
}
