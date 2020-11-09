export interface ProjectListTaskModel {
  /**
   * 截止日期
   */
  endAt?: string;
  /**
   * 分组标识
   */
  groupKey?: string;
  /**
   * 上级标识
   */
  parentTaskId?: string;
  /**
   * 优先级标识
   */
  priority: number;
  /**
   * 所在项目标识
   */
  projectId: string;
  /**
   * 所在任务组
   */
  sectionId: string;
  /**
   * 流程状态标识
   */
  statusId: number;
  /**
   * 状态名称
   */
  statusName: string;
  /**
   * 状态阶段
   */
  statusPhase: ProjectListTask.StatusPhaseEnum;
  /**
   * 任务分类名称
   */
  taskClass: string;
  /**
   * 任务标识
   */
  taskId: string;
  /**
   * 任务分类分组
   */
  taskTypeGroup?: string;
  /**
   * 标题描述
   */
  title: string;
}

export namespace ProjectListTask {
  export enum StatusPhaseEnum {
    /**
     * `BEGIN` 状态阶段
     */
    BEGIN = <any>'BEGIN',
    /**
     * `MIDDLE` 状态阶段
     */
    MIDDLE = <any>'MIDDLE',
    /**
     * `END` 状态阶段
     */
    END = <any>'END'
  }
}
