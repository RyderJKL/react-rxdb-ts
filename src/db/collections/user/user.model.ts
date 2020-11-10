export interface UserModel {
    /**
     * 头像地址
     */
    avatar?: string;
    /**
     * 大头像地址
     */
    avatarMax?: string;
    /**
     * 通道
     */
    channel?: string;
    /**
     * 通道id
     */
    channelId?: string;
    /**
     * 邮箱
     */
    email?: string;
    /**
     * 员工性质
     */
    employeeNatureCode?: string;
    /**
     * 族
     */
    family?: string;
    /**
     * 族id
     */
    familyId?: string;
    /**
     * 职位
     */
    job?: string;
    /**
     * 直属上级
     */
    manager?: string;
    /**
     * 姓名
     */
    name: string;
    /**
     * 在职状态码
     */
    statusCode?: string;
    /**
     * 在职状态名
     */
    statusName?: string;
    /**
     * 用户名
     */
    userId: string;
    /**
     * 是否在职
     */
    active?: boolean;
}
