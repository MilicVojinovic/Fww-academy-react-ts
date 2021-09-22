import { FC, useState } from "react";
import Button from "../../../common/components/Button";
import Input from "../../../common/components/Input";

const TeacherNewCourseModal: FC<{
  courseDataForEdit: { [key: string]: any };
  setShowCourseModal: any;
  createCourse: any;
  editCourse: any;
}> = ({ courseDataForEdit, setShowCourseModal, createCourse, editCourse }) => {
  const [form, setForm] = useState({
    name: courseDataForEdit.name,
    price: courseDataForEdit.price,
    description: courseDataForEdit.description,
  });

  return (
    <div>
      <div className="teacher-new-course-modal flex w-full h-full justify-center items-center absolute left-0 top-0 z-10">
        <div className="flex flex-col md:w-4/12 bg-gray-500 rounded-xl items-center p-8">
          <div className="flex w-full text-lg mb-2 text-white  justify-end">
            <i
              className="fa fa-times bg-blue-900 py-1 px-2 rounded-md cursor-pointer hover:bg-blue-700"
              onClick={() => {
                setShowCourseModal(false);
              }}
              aria-hidden="true"
            ></i>
          </div>
          <div className="text-center text-xl mb-3 text-white">
            {Object.keys(courseDataForEdit).length === 0
              ? "Kreirajte novi kurs"
              : "Izmenite kurs"}
          </div>
          <Input
            placeholder="Ime kursa"
            classNameProp="my-4"
            value={form.name || ""}
            inputHandler={(val: any) => {
              setForm({ ...form, name: val.value });
            }}
          ></Input>
          <Input
            type={"number"}
            placeholder="Cena (rsd)"
            classNameProp="my-4"
            value={form.price || ""}
            inputHandler={(val: any) => {
              setForm({ ...form, price: val.value });
            }}
          ></Input>
          <textarea
            className={"text-black rounded-md p-2 w-9/12 mt-4 "}
            placeholder="Opis kursa"
            name="comment"
            id=""
            rows={5}
            value={form.description || ""}
            onChange={(event: any) => {
              setForm({ ...form, description: event.target.value });
            }}
          ></textarea>
          <Button
            classNameProp="bg-blue-900 text-lg px-5 py-3 mt-6"
            text={
              Object.keys(courseDataForEdit).length === 0
                ? "Sačuvaj"
                : "Sačuvaj izmenu"
            }
            click={() => {
              Object.keys(courseDataForEdit).length === 0
                ? createCourse(form)
                : editCourse(form, courseDataForEdit.id);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default TeacherNewCourseModal;
