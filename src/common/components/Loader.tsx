import {
  faGlobeAfrica,
  faUserGraduate,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Loader({}) {
  return (
    <div className="loader w-full h-full flex items-center justify-center absolute left-0 top-0 z-10 bg-gray-500 bg-opacity-75 ">
      <div className="flex items-center flex-col relative animation">
        <FontAwesomeIcon icon={faUserGraduate} className="text-5xl -mb-2" />
        <FontAwesomeIcon
          icon={faGlobeAfrica}
          className="text-7xl text-blue-400 rotateIn"
        />
        <span className="text-xl mt-1 mb-8 tracking-wider font-bold border-b-4 border-black">
          fww academy
        </span>
      </div>
    </div>
  );
}

export default Loader;
