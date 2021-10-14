export interface IinitState {
	teacherCourses: {}[] | null;
	teacherStudents: {}[] | null;
  }
  
  export enum ActionTypesTeacher {
	SET_TEACHER_COURSES = "setTeacherCourses",
	SET_TEACHER_STUDENTS = "setTeacherStudents",
  }
  
  export type ActionTeacher =
	| { type: ActionTypesTeacher.SET_TEACHER_COURSES; payload: {}[] }
	| { type: ActionTypesTeacher.SET_TEACHER_STUDENTS; payload: {}[] }