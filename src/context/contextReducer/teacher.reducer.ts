import { teacherTypes } from "../../types";
const initStateTeacher: teacherTypes.IinitState = {
  teacherCourses: [],
};

const teacherReducer = (
  init: teacherTypes.IinitState,
  action: teacherTypes.ActionTeacher
): teacherTypes.IinitState => {
  if (action.type === teacherTypes.ActionTypesTeacher.SET_TEACHER_COURSES) {
    return {
      ...init,
      teacherCourses: action.payload,
    };
  }

  return init;
};

export { initStateTeacher, teacherReducer };
