import { FC, useCallback, useContext, useEffect, useState } from "react";
import Scroll from "../../common/components/Scroll";
import Table from "../../common/components/Table";
import TeacherNewCourseModal from "./components/TeacherNewCourseModal";
import Select from "react-select";
import { GlobalContext } from "../../context/ContextProvider";
import { api } from "../../api/api";
import { teacherTypes } from "../../types";

const TeacherCoursesList: FC = () => {
  const {
    stateAuth,
    changeLoaderState,
    changeNotifMessageState,
    stateTeacher,
    dispatchTeacher,
  } = useContext(GlobalContext);

  const [courseDataForEdit, setCourseDataForEdit] = useState<{}>({});

  const [showCourseModal, setShowCourseModal] = useState(false);

  const [allTeachers, setAllTeachers] = useState([]);

  const [teacher, setTeacher] = useState<{ [key: string]: any } | null>(null);
  const [course, setCourse] = useState<{ [key: string]: any } | null>(null);

  const getAllTeachers = useCallback(async () => {
    changeLoaderState(true);
    try {
      const allTeachers = await api.get(`/users?role=teacher`);
      setAllTeachers(allTeachers.data);
      changeLoaderState(false);
    } catch (error) {
      changeLoaderState(false);
      changeNotifMessageState({
        status: error,
        message: "",
      });
    }
  }, [changeLoaderState, setAllTeachers, changeNotifMessageState]);

  const getTeacherCourses = useCallback(async () => {
    changeLoaderState(true);
    try {
      const user = await api.get(`/teacher/${stateAuth.user.id}/courses`);

      dispatchTeacher({
        type: teacherTypes.ActionTypesTeacher.SET_TEACHER_COURSES,
        payload: user.data,
      });
      changeLoaderState(false);
    } catch (error) {
      changeLoaderState(false);
      changeNotifMessageState({
        status: error,
        message: "",
      });
    }
  }, [dispatchTeacher, changeLoaderState, changeNotifMessageState, stateAuth]);

  useEffect(() => {
    getTeacherCourses();
    getAllTeachers();
  }, [getTeacherCourses, getAllTeachers]);

  function onRowClick(row: any) {
    setCourseDataForEdit(row);
    setShowCourseModal(true);
  }

  async function createCourse(form: { [key: string]: any }) {
    changeLoaderState(true);
    try {
      const newCourse = await api.post(`/courses`, form);
      changeNotifMessageState({
        status: newCourse,
        message: "COURSE_CREATED",
      });
      getTeacherCourses();
      changeLoaderState(false);
      setShowCourseModal(false);
    } catch (error) {
      changeLoaderState(false);
      setShowCourseModal(false);
      changeNotifMessageState({
        status: error,
        message: "",
      });
    }
  }

  async function editCourse(form: { [key: string]: any }, courseId: number) {
    changeLoaderState(true);
    try {
      const editedCourse = await api.patch(`/courses/${courseId}`, form);
      changeNotifMessageState({
        status: editedCourse,
        message: "COURSE_UPDATED",
      });
      getTeacherCourses();
      changeLoaderState(false);
      setShowCourseModal(false);
    } catch (error) {
      changeLoaderState(false);
      setShowCourseModal(false);
      changeNotifMessageState({
        status: error,
        message: "",
      });
    }
  }

  async function onDelete(courseId: number) {
    changeLoaderState(true);
    try {
      const deletedCourse = await api.delete(`/courses/${courseId}`);
      changeNotifMessageState({
        status: deletedCourse,
        message: "COURSE_DELETED",
      });
      getTeacherCourses();
      changeLoaderState(false);
      setShowCourseModal(false);
    } catch (error) {
      changeLoaderState(false);
      setShowCourseModal(false);
      changeNotifMessageState({
        status: error,
        message: "",
      });
    }
  }

  async function addCourseToTeacher() {
    changeLoaderState(true);
    try {
      const allTeachers = await api.patch(
        `/teacher/${teacher?.id}/add_course`,
        {
          course_id: [course?.id],
        }
      );

      setAllTeachers(allTeachers.data);
      setTeacher(null);
      setCourse(null);

      changeNotifMessageState({
        status: allTeachers,
        message: "COURSE_ASSIGNED",
      });
      changeLoaderState(false);
    } catch (error) {
      setTeacher(null);
      setCourse(null);
      changeLoaderState(false);
      changeNotifMessageState({
        status: error,
        message: "",
      });
    }
  }

  return (
    <div className="teacher-courses-list flex h-full w-full flex-col bg-blue-50 p-8">
      {showCourseModal && (
        <TeacherNewCourseModal
          courseDataForEdit={courseDataForEdit}
          setShowCourseModal={setShowCourseModal}
          createCourse={createCourse}
          editCourse={editCourse}
        ></TeacherNewCourseModal>
      )}

      <div className="flex flex-col mr-5 mb-3 h-48">
        <div className="flex flex-col">
          <span className="text-left w-full pl-8 mb-4">
            Dodelite kurs ostalim profesorima
          </span>
          <div className="flex ml-8 items-center">
            <span className="">Izaberite kurs</span>
            <Select
              options={stateTeacher.teacherCourses}
              className="w-64 ml-2"
			  placeholder=""
			  id="select-course"
              isClearable={true}
              value={course}
              getOptionLabel={(option: any) => {
                return option.name;
              }}
              getOptionValue={(option) => option}
              onChange={(option) => {
                setCourse(option);
              }}
            />
            <span className="ml-8">Izaberite profesora</span>
            <Select
              options={allTeachers}
              className="w-64 ml-2"
			  id="select-teacher"
              placeholder=""
              isClearable={true}
              value={teacher}
              getOptionLabel={(option: any) => {
                return option.name + " " + option.surname;
              }}
              getOptionValue={(option) => option}
              onChange={(option) => {
                setTeacher(option);
              }}
            />
            {teacher && course && (
              <div
                onClick={() => {
                  addCourseToTeacher();
                }}
                className="bg-blue-500 ml-8 flex-shrink-0 px-2 py-1 rounded-xl flex items-center cursor-pointer"
              >
                <span className="">Pošalji</span>
                <i
                  className="fa fa-share-square text-xl text-blue-800 ml-2 "
                  aria-hidden="true"
                  onClick={() => {
                    addCourseToTeacher();
                  }}
                ></i>
              </div>
            )}
          </div>
        </div>
        <div
          className="flex w-64 mt-12 ml-8 items-center bg-blue-300 rounded-md pl-4 border border-blue-800 cursor-pointer"
          onClick={() => {
            setCourseDataForEdit({});
            setShowCourseModal(true);
          }}
        >
          Dodajte Vaš novi kurs
          <i
            className="fa fa-plus-square text-blue-600 text-3xl mx-4"
            aria-hidden="true"
          ></i>
        </div>
      </div>
      <div className="flex flex-grow relative">
        <Scroll classNameProp="flex-grow">
          <Table
            tableHead={["Naziv kursa", "Opis", "Cena (rsd)", "Prosečna ocena"]}
            tableData={stateTeacher.teacherCourses}
            tableDataFields={[
              {
                value: "name",
                className: "cursor-pointer",
              },
              {
                value: "description",
                className:
                  "w-48 overflow-ellipsis overflow-hidden cursor-pointer",
              },
              {
                value: "price",
                className: "cursor-pointer",
              },
              {
                value: "average_mark",
                className: "cursor-pointer",
              },
            ]}
            onRowClick={onRowClick}
            deleteItem={true}
            onDelete={onDelete}
          ></Table>
        </Scroll>
      </div>
    </div>
  );
};

export default TeacherCoursesList;
