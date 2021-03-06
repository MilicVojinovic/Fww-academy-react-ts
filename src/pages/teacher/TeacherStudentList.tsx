import { FC, useCallback, useContext, useEffect, useState } from "react";
import Select from "react-select";
import Scroll from "../../common/components/Scroll";
import Table from "../../common/components/Table";
import { GlobalContext } from "../../context/ContextProvider";
import { teacherTypes } from "../../types";
import DatePicker from "react-datepicker";
import { DateTime } from "luxon";
import fetchData from "../../services/fetchData";
import { api } from "../../api/api";

const completedOptions = [
  {
    title: "pohadjaju kurs.",
    value: false,
  },
  {
    title: "su položili kurs.",
    value: true,
  },
];

interface CourseCompletedInterface {
  title: string;
  value: boolean;
}

interface Filters {
  course_id: number | null;
  complete: boolean;
  start_date: string | null;
}

const TeacherStudentList: FC = () => {
  const {
    stateAuth,
    changeLoaderState,
    changeNotifMessageState,
    stateTeacher,
    dispatchTeacher,
  } = useContext(GlobalContext);

  const [course, setCourse] = useState<{ [key: string]: any }>();

  const [startDate, setStartDate] = useState<Date | null>(null);

  const [courseCompleted, setCourseCompleted] =
    useState<CourseCompletedInterface>(completedOptions[0]);

  const [filters, setFilters] = useState<Filters>({
    course_id: null,
    complete: courseCompleted.value,
    start_date: null,
  });

  const isSelectOption = (
    selected: any
  ): selected is CourseCompletedInterface => {
    if ((selected as CourseCompletedInterface).value !== undefined)
      return selected;
    return false;
  };

  const setFiltersManualy = useCallback((prop: any, value: any) => {
    let changedFilter = {
      [prop]: value,
    };
    setFilters((prevValue) => ({
      ...prevValue,
      ...changedFilter,
    }));
  }, []);


  // on mount
  useEffect(() => {
    let fetchDataOnMount = async () => {
      changeLoaderState(true);
      try {
        const res = await api.get(`/teacher/${stateAuth.user.id}/courses`);
        dispatchTeacher({
          type: teacherTypes.ActionTypesTeacher.SET_TEACHER_COURSES,
          payload: res.data,
        });
        changeLoaderState(false);
        return res;
      } catch (error) {
        changeLoaderState(false);
        changeNotifMessageState({
          status: error,
          message: "",
        });
        return error;
      }
    };
    fetchDataOnMount()
      .then((res: any) => {
        setFiltersManualy("course_id", res.data[0].id);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [
    changeLoaderState,
    changeNotifMessageState,
    dispatchTeacher,
    stateAuth,
    setFiltersManualy,
  ]);

  // useFiltersChangeHook
  useEffect(() => {
	//   useEffect runs on every mount, ask if (filters.course_id) to prevent fetchData to execute without course_id
    if (filters.course_id) {
      fetchData(
        filters,
        changeLoaderState,
        dispatchTeacher,
        teacherTypes.ActionTypesTeacher.SET_TEACHER_STUDENTS,
        changeNotifMessageState,
        `/students?`
      );
    }
  }, [filters, changeLoaderState, dispatchTeacher, changeNotifMessageState]);

  return (
    <div className="teacher-student-list flex h-full  w-full flex-col bg-blue-50 p-8">
      <div className="flex w-full px-8 mb-8 justify-between">
        <div className="flex items-center">
          <span className="mr-2">Izaberite kurs</span>
          <Select
            options={stateTeacher.teacherCourses}
            className="w-64"
            placeholder=""
            value={course || stateTeacher.teacherCourses[0]}
            isClearable={false}
            getOptionValue={(option) => option.id}
            getOptionLabel={(option: any) => {
              return option.name;
            }}
            onChange={(option) => {
              setCourse(option);
              setFiltersManualy("course_id", option.id);
            }}
          />
        </div>
        <div className="flex items-center ">
          <span className="mr-2">Lista studenata koji </span>
          <Select
            options={completedOptions}
            className="w-48"
            placeholder=""
            value={courseCompleted}
            getOptionLabel={(option: CourseCompletedInterface) => {
              return option.title;
            }}
            onChange={(option) => {
              if (isSelectOption(option)) {
                setCourseCompleted(option);
                setFiltersManualy("complete", option.value);
              }
            }}
          />
        </div>

        <div className="flex items-center">
          <span className="mr-2 flex-shrink-0">Izaberite datum upisa</span>
          <DatePicker
            className="w-36 border rounded py-2 border-gray-300 text-center"
            selected={startDate}
            dateFormat="dd.MM.yyyy"
            isClearable
            onChange={(date: Date) => {
              setStartDate(date);
              setFiltersManualy(
                "start_date",
                date ? DateTime.fromJSDate(date).toFormat("yyyy-LL-dd") : null
              );
            }}
          />
        </div>
      </div>
      <div className="flex flex-grow relative">
        <Scroll classNameProp="flex-grow">
          <Table
            tableHead={[
              "Ime i prezime studenta",
              "Datum upisa na kurs",
              filters.complete ? null : "Označite da je student je prošao kurs",
            ]}
            tableData={stateTeacher.teacherStudents}
            tableDataFields={
              filters.complete
                ? [
                    {
                      value: "user",
                      className: "",
                    },
                    {
                      value: "course_start_date",
                      parser: (data: string | number | Date) => {
                        return DateTime.fromJSDate(new Date(data)).toFormat(
                          "dd.LL.yyyy"
                        );
                      },
                      className: "",
                    },
                  ]
                : [
                    {
                      value: "user",
                      className: "",
                    },
                    {
                      value: "course_start_date",
                      parser: (data: string | number | Date) => {
                        return DateTime.fromJSDate(new Date(data)).toFormat(
                          "dd.LL.yyyy"
                        );
                      },
                      className: "",
                    },
                    {
                      value: "",
                      className: " w-8/12 flex justify-center",
                      iconClass:
                        "fas fa-check text-green-600 cursor-pointer transition duration-500 ease-in-out hover:text-green-800 transform hover:scale-125",
                    },
                  ]
            }
          />
        </Scroll>
      </div>
    </div>
  );
};

export default TeacherStudentList;
