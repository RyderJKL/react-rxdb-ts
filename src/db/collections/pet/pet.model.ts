// import { HeroModel } from '../hero/hero.model'

export interface PetModel {
    /**
     * 头像地址
     */
    avatar?: string;
    /**
     * 大头像地址
     */
    avatarMax?: string;
    /**
     * 姓名
     */
    name: string;
    /**
     * 用户名
     */
    petId: string;
    /** 主人 */
    // master?: string;
}
