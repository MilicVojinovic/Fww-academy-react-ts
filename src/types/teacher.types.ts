export interface IinitState {
	teacherCourses: {}[] | null;
  }
  
  export enum ActionTypesTeacher {
	SET_TEACHER_COURSES = "setTeacherCourses",
  }
  
  export type ActionTeacher =
	| { type: ActionTypesTeacher.SET_TEACHER_COURSES; payload: {}[] }